// backend/src/services/recaptchaService.ts

import axios from "axios";

export class RecaptchaService {
  private readonly SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;
  private readonly VERIFY_URL =
    "https://www.google.com/recaptcha/api/siteverify";

  async verify(token: string, action: string = "register"): Promise<boolean> {
    if (!this.SECRET_KEY) {
      console.warn(
        "⚠️ RECAPTCHA_SECRET_KEY not configured - skipping verification"
      );
      return true; // W środowisku dev można pominąć
    }

    try {
      const response = await axios.post(this.VERIFY_URL, null, {
        params: {
          secret: this.SECRET_KEY,
          response: token,
        },
      });

      const { success, score, action: responseAction } = response.data;

      // Sprawdź czy token jest ważny
      if (!success) {
        console.error("❌ reCAPTCHA verification failed:", response.data);
        return false;
      }

      // Sprawdź akcję
      if (responseAction !== action) {
        console.error(
          `❌ reCAPTCHA action mismatch: expected ${action}, got ${responseAction}`
        );
        return false;
      }

      // Sprawdź score (v3 zwraca score 0.0 - 1.0)
      // 0.0 = bot, 1.0 = human
      const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE || "0.5");

      if (score < minScore) {
        console.warn(`⚠️ reCAPTCHA score too low: ${score} (min: ${minScore})`);
        return false;
      }

      console.log(`✅ reCAPTCHA verified - score: ${score}`);
      return true;
    } catch (error) {
      console.error("❌ reCAPTCHA verification error:", error);
      return false;
    }
  }

  async verifyV2(token: string): Promise<boolean> {
    if (!this.SECRET_KEY) {
      console.warn(
        "⚠️ RECAPTCHA_SECRET_KEY not configured - skipping verification"
      );
      return true;
    }

    try {
      const response = await axios.post(this.VERIFY_URL, null, {
        params: {
          secret: this.SECRET_KEY,
          response: token,
        },
      });

      const { success } = response.data;

      if (!success) {
        console.error("❌ reCAPTCHA v2 verification failed:", response.data);
        return false;
      }

      console.log("✅ reCAPTCHA v2 verified");
      return true;
    } catch (error) {
      console.error("❌ reCAPTCHA v2 verification error:", error);
      return false;
    }
  }
}
