// backend/src/routes/auth.routes.ts

import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { AuthService } from "../services/authService";
import { RecaptchaService } from "../services/recaptchaService";

const authService = new AuthService();
const recaptchaService = new RecaptchaService();
const GoogleLoginSchema = z.object({
  credential: z.string().min(1, "Google credential jest wymagany"),
});

const RegisterSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  username: z
    .string()
    .min(3, "Minimum 3 znaki")
    .max(20, "Maksimum 20 znaków")
    .regex(/^[a-zA-Z0-9_-]+$/, "Tylko litery, cyfry, _ i -"),
  password: z.string().min(8, "Hasło musi mieć minimum 8 znaków"),
  recaptchaToken: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

const VerifyEmailSchema = z.object({
  token: z.string().min(1, "Token weryfikacyjny jest wymagany"),
});

const ResendVerificationSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
});

const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Token jest wymagany"),
  password: z.string().min(8, "Hasło musi mieć minimum 8 znaków"),
});

export async function authRoutes(fastify: FastifyInstance) {
  // REJESTRACJA
  fastify.post("/register", async (request, reply) => {
    try {
      const data = RegisterSchema.parse(request.body);

      // ✅ Weryfikuj tylko jeśli token istnieje
      if (data.recaptchaToken && data.recaptchaToken !== "MOBILE_DEV") {
        const isHuman = await recaptchaService.verify(
          data.recaptchaToken,
          "register"
        );
        if (!isHuman) {
          return reply.code(400).send({
            error: "RECAPTCHA_FAILED",
            message: "Weryfikacja reCAPTCHA nie powiodła się.",
          });
        }
      }

      const result = await authService.register(data);
      return reply.code(201).send(result);
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "VALIDATION_ERROR",
          message: error.errors[0].message,
          errors: error.errors,
        });
      }

      // Obsługa błędów biznesowych
      const errorMessages: Record<string, string> = {
        USER_EXISTS: "Użytkownik z tym adresem email już istnieje",
        PASSWORD_TOO_SHORT: "Hasło musi mieć minimum 8 znaków",
        PASSWORD_NO_NUMBER: "Hasło musi zawierać przynajmniej jedną cyfrę",
        PASSWORD_NO_UPPERCASE:
          "Hasło musi zawierać przynajmniej jedną dużą literę",
        PASSWORD_NO_LOWERCASE:
          "Hasło musi zawierać przynajmniej jedną małą literę",
      };

      const message =
        errorMessages[error.message] || "Rejestracja nie powiodła się";

      return reply.code(400).send({
        error: error.message || "REGISTRATION_FAILED",
        message,
      });
    }
  });

  // WERYFIKACJA EMAIL
  fastify.post("/verify-email", async (request, reply) => {
    try {
      const { token } = VerifyEmailSchema.parse(request.body);
      const result = await authService.verifyEmail(token);
      return reply.send(result);
    } catch (error: any) {
      console.error("Email verification error:", error);

      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "VALIDATION_ERROR",
          message: error.errors[0].message,
        });
      }

      const errorMessages: Record<string, string> = {
        INVALID_TOKEN: "Link weryfikacyjny jest nieprawidłowy lub wygasł",
      };

      return reply.code(400).send({
        error: error.message || "VERIFICATION_FAILED",
        message: errorMessages[error.message] || "Weryfikacja nie powiodła się",
      });
    }
  });

  // PONOWNE WYSŁANIE EMAILA WERYFIKACYJNEGO
  fastify.post("/resend-verification", async (request, reply) => {
    try {
      const { email } = ResendVerificationSchema.parse(request.body);
      const result = await authService.resendVerificationEmail(email);
      return reply.send(result);
    } catch (error: any) {
      console.error("Resend verification error:", error);

      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "VALIDATION_ERROR",
          message: error.errors[0].message,
        });
      }

      // ✅ Obsłuż rate limit
      if (error.message.startsWith("RATE_LIMIT:")) {
        const waitTime = error.message.split(":")[1];
        return reply.code(429).send({
          error: "RATE_LIMIT",
          message: `Poczekaj ${waitTime} sekund przed ponowną wysyłką.`,
        });
      }

      const errorMessages: Record<string, string> = {
        USER_NOT_FOUND: "Użytkownik nie został znaleziony",
        ALREADY_VERIFIED: "Email jest już zweryfikowany",
      };

      return reply.code(400).send({
        error: error.message || "RESEND_FAILED",
        message: errorMessages[error.message] || "Nie udało się wysłać emaila",
      });
    }
  });

  // LOGOWANIE
  fastify.post("/login", async (request, reply) => {
    try {
      const { email, password } = LoginSchema.parse(request.body);
      const result = await authService.login(email, password);
      return reply.send(result);
    } catch (error: any) {
      console.error("Login error:", error);

      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "VALIDATION_ERROR",
          message: error.errors[0].message,
        });
      }

      // ✅ DODAJ obsługę nowego błędu
      if (error.message === "EMAIL_NOT_VERIFIED") {
        return reply.code(403).send({
          error: "EMAIL_NOT_VERIFIED",
          message:
            "Musisz potwierdzić swój email przed zalogowaniem. Sprawdź swoją skrzynkę.",
        });
      }

      return reply.code(401).send({
        error: "INVALID_CREDENTIALS",
        message: "Nieprawidłowy email lub hasło",
      });
    }
  });

  // REFRESH TOKEN
  fastify.post("/refresh", async (request, reply) => {
    try {
      const { refreshToken } = request.body as { refreshToken: string };

      if (!refreshToken) {
        return reply.code(401).send({
          error: "REFRESH_TOKEN_REQUIRED",
          message: "Refresh token jest wymagany",
        });
      }

      const tokens = await authService.refreshToken(refreshToken);
      return reply.send(tokens);
    } catch (error: any) {
      console.error("Token refresh error:", error);
      return reply.code(401).send({
        error: "INVALID_REFRESH_TOKEN",
        message: "Nieprawidłowy refresh token",
      });
    }
  });

  // WYLOGOWANIE
  fastify.post("/logout", async (request, reply) => {
    try {
      await request.jwtVerify();
      const userId = (request.user as any).userId;
      await authService.logout(userId);
      return reply.send({ success: true, message: "Wylogowano pomyślnie" });
    } catch (error) {
      return reply.code(401).send({
        error: "UNAUTHORIZED",
        message: "Nieautoryzowany",
      });
    }
  });

  // ŻĄDANIE RESETU HASŁA
  fastify.post("/request-password-reset", async (request, reply) => {
    try {
      const { email, recaptchaToken } = request.body as {
        email: string;
        recaptchaToken?: string;
      };

      // ✅ Weryfikacja reCAPTCHA tylko dla web (nie mobile)
      if (recaptchaToken && recaptchaToken !== "MOBILE_DEV") {
        const isHuman = await recaptchaService.verify(
          recaptchaToken,
          "password_reset"
        );

        if (!isHuman) {
          return reply.code(400).send({
            error: "RECAPTCHA_FAILED",
            message: "Weryfikacja reCAPTCHA nie powiodła się",
          });
        }
      }

      const result = await authService.requestPasswordReset(email);
      return reply.send(result);
    } catch (error: any) {
      console.error("Password reset request error:", error);

      // Zawsze zwracaj sukces, żeby nie ujawniać czy email istnieje
      return reply.send({
        success: true,
        message: "Jeśli konto istnieje, email został wysłany.",
      });
    }
  });

  // RESET HASŁA
  fastify.post("/reset-password", async (request, reply) => {
    try {
      const { token, password } = ResetPasswordSchema.parse(request.body);
      const result = await authService.resetPassword(token, password);
      return reply.send(result);
    } catch (error: any) {
      console.error("Password reset error:", error);

      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "VALIDATION_ERROR",
          message: error.errors[0].message,
        });
      }

      const errorMessages: Record<string, string> = {
        INVALID_TOKEN: "Link resetowania hasła jest nieprawidłowy lub wygasł",
        PASSWORD_TOO_SHORT: "Hasło musi mieć minimum 8 znaków",
        PASSWORD_NO_NUMBER: "Hasło musi zawierać przynajmniej jedną cyfrę",
        PASSWORD_NO_UPPERCASE:
          "Hasło musi zawierać przynajmniej jedną dużą literę",
        PASSWORD_NO_LOWERCASE:
          "Hasło musi zawierać przynajmniej jedną małą literę",
      };

      return reply.code(400).send({
        error: error.message || "RESET_FAILED",
        message: errorMessages[error.message] || "Reset hasła nie powiódł się",
      });
    }
  });

  // SPRAWDŹ STATUS WERYFIKACJI (opcjonalny endpoint)
  fastify.get("/verification-status", async (request, reply) => {
    try {
      await request.jwtVerify();
      const userId = (request.user as any).userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { emailVerified: true },
      });

      return reply.send({
        emailVerified: user?.emailVerified || false,
      });
    } catch (error) {
      return reply.code(401).send({
        error: "UNAUTHORIZED",
        message: "Nieautoryzowany",
      });
    }
  });
  // LOGOWANIE PRZEZ GOOGLE
  fastify.post("/google", async (request, reply) => {
    try {
      const { credential } = GoogleLoginSchema.parse(request.body);

      const result = await authService.loginWithGoogle(credential);

      return reply.send(result);
    } catch (error: any) {
      console.error("Google login error:", error);

      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: "VALIDATION_ERROR",
          message: error.errors[0].message,
        });
      }

      const errorMessages: Record<string, string> = {
        GOOGLE_AUTH_FAILED: "Nie udało się zweryfikować konta Google",
        EMAIL_NOT_VERIFIED_BY_GOOGLE:
          "Email nie jest zweryfikowany przez Google",
      };

      return reply.code(400).send({
        error: error.message || "GOOGLE_LOGIN_FAILED",
        message:
          errorMessages[error.message] ||
          "Logowanie przez Google nie powiodło się",
      });
    }
  });
}
