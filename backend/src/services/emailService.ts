// backend/src/services/emailService.ts
import { transporter } from "../config/mailer.config";

export class EmailService {
  async sendVerificationEmail(to: string, token: string, username: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const html = this.getVerificationEmailTemplate(verificationUrl, username);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "Potwierdź swój adres email - Matura Polski",
        html,
      });
      console.log("✅ Email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("❌ Email error:", error);
      return null;
    }
  }

  async sendWelcomeEmail(to: string, firstName: string) {
    const html = this.getWelcomeEmailTemplate(firstName);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "Witaj w Matura Polski! 🎓",
        html,
      });
      console.log("✅ Welcome email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("❌ Welcome email error:", error);
      return null;
    }
  }

  async sendPasswordReset(to: string, resetToken: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const html = this.getPasswordResetTemplate(resetUrl);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "Reset hasła - Matura Polski",
        html,
      });
      console.log("✅ Password reset email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("❌ Password reset email error:", error);
      return null;
    }
  }

  private getVerificationEmailTemplate(
    verificationUrl: string,
    username: string
  ): string {
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #f8f9fa;
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content { 
              background: white; 
              padding: 40px 30px;
              border-radius: 0 0 10px 10px;
            }
            .button { 
              display: inline-block; 
              padding: 14px 32px; 
              background: #667eea; 
              color: white; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 25px 0;
              font-weight: 600;
            }
            .alert {
              background: #fff3cd;
              border: 1px solid #ffc107;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              font-size: 14px;
            }
            .footer { 
              background: #2d3436; 
              color: #b2bec3;
              padding: 30px; 
              text-align: center; 
              font-size: 13px;
            }
            .footer a {
              color: #74b9ff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Potwierdź swój email</h1>
            </div>
            <div class="content">
                  <h2>Cześć, ${displayName}!</h2>
              <p>Dziękujemy za rejestrację w Matura Polski! Jeszcze jeden krok do rozpoczęcia nauki.</p>
              
              <p>Kliknij poniższy przycisk, aby potwierdzić swój adres email:</p>
              
              <center>
                <a href="${verificationUrl}" class="button">
                  Potwierdź adres email →
                </a>
              </center>
              
              <div class="alert">
                <strong>⏱️ Uwaga:</strong> Link weryfikacyjny wygaśnie za 24 godziny.
              </div>
              
              <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
                Jeśli przycisk nie działa, skopiuj link:<br>
                <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
              </p>
              
              <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
              
              <p style="color: #6c757d; font-size: 13px;">
                Jeśli nie zakładałeś konta w Matura Polski, zignoruj ten email.
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0 0 10px 0;">© 2025 Matura Polski. Wszystkie prawa zastrzeżone.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getWelcomeEmailTemplate(username: string): string {
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #667eea; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background: #667eea; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Witaj w Matura Polski!</h1>
            </div>
            <div class="content">
              <h2>Cześć ${displayName}!</h2>
              <p>Gratulacje! Twoje konto zostało zweryfikowane.</p>
              <p>Możesz teraz korzystać ze wszystkich funkcji platformy.</p>
              <center>
                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">
                  Rozpocznij naukę →
                </a>
              </center>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getPasswordResetTemplate(resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background: #667eea; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔒 Reset hasła</h1>
            <p>Kliknij przycisk aby zresetować hasło:</p>
            <p><a href="${resetUrl}" class="button">Zresetuj hasło</a></p>
            <p>Link wygaśnie za 1 godzinę.</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Jeśli nie prosiłeś o reset hasła, zignoruj ten email.
            </p>
          </div>
        </body>
      </html>
    `;
  }
}
