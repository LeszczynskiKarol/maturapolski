// backend/src/services/googleAuthService.ts

import { OAuth2Client } from "google-auth-library";

export class GoogleAuthService {
  private client: OAuth2Client;
  private clientId: string;

  constructor() {
    this.clientId = process.env.GOOGLE_CLIENT_ID || "";
    this.client = new OAuth2Client(this.clientId);
  }

  /**
   * Weryfikuje Google ID Token i zwraca dane użytkownika
   */
  async verifyIdToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.clientId,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error("INVALID_TOKEN");
      }

      // Walidacja dodatkowa
      if (!payload.email_verified) {
        throw new Error("EMAIL_NOT_VERIFIED_BY_GOOGLE");
      }

      return {
        googleId: payload.sub, // Unique Google ID
        email: payload.email!,
        name: payload.name,
        givenName: payload.given_name,
        familyName: payload.family_name,
        picture: payload.picture,
        emailVerified: payload.email_verified,
      };
    } catch (error: any) {
      console.error("Google token verification failed:", error);
      throw new Error("GOOGLE_AUTH_FAILED");
    }
  }
}
