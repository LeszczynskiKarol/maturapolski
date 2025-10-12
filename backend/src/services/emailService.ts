// backend/src/services/emailService.ts
import { transporter } from "../config/mailer.config";

export class EmailService {
  async sendVerificationEmail(to: string, code: string, username: string) {
    const html = this.getVerificationEmailTemplate(code, username);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "Kod weryfikacyjny - MaturaPolski.pl",
        html,
      });
      console.log("✅ Email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("❌ Email error:", error);
      return null;
    }
  }

  async sendWelcomeEmail(to: string, userName: string) {
    const html = this.getWelcomeEmailTemplate(userName);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "Witaj w MaturaPolski.pl! 🎓",
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
        subject: "Reset hasła - MaturaPolski.pl",
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
    verificationCode: string, // zmień nazwę parametru
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
          .code-container {
            text-align: center;
            margin: 30px 0;
          }
          .verification-code {
            display: inline-block;
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #667eea;
            background: #f0f4ff;
            padding: 20px 40px;
            border-radius: 10px;
            border: 2px dashed #667eea;
            user-select: all;
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Potwierdź swój email</h1>
          </div>
          <div class="content">
            <h2>Cześć, ${displayName}!</h2>
            <p>Dziękujemy za rejestrację w MaturaPolski.pl! Jeszcze jeden krok do rozpoczęcia nauki.</p>
            
            <p>Skopiuj poniższy kod i wklej go na stronie weryfikacji:</p>
            
            <div class="code-container">
              <div class="verification-code">${verificationCode}</div>
            </div>
            
            <div class="alert">
              <strong>⏱️ Uwaga:</strong> Kod weryfikacyjny wygaśnie za 24 godziny.
            </div>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #6c757d; font-size: 13px;">
              Jeśli nie zakładałeś konta w MaturaPolski.pl, zignoruj ten email.
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0 0 10px 0;">© 2025 MaturaPolski.pl. Wszystkie prawa zastrzeżone.</p>
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
              <h1>🎓 Witaj w MaturaPolski.pl!</h1>
            </div>
            <div class="content">
              <h2>Cześć, ${displayName}!</h2>
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

  async sendExpirationWarning7Days(
    to: string,
    username: string,
    endDate: Date
  ) {
    const html = this.getExpirationWarning7DaysTemplate(username, endDate);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "⏰ Twój dostęp Premium wygasa za 7 dni - MaturaPolski.pl",
        html,
      });
      console.log("✅ 7-day warning email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("❌ 7-day warning email error:", error);
      return null;
    }
  }

  async sendExpirationWarning1Day(to: string, username: string, endDate: Date) {
    const html = this.getExpirationWarning1DayTemplate(username, endDate);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "🚨 Twój dostęp Premium wygasa jutro! - MaturaPolski.pl",
        html,
      });
      console.log("✅ 1-day warning email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("❌ 1-day warning email error:", error);
      return null;
    }
  }

  async sendExpirationNotice(to: string, username: string) {
    const html = this.getExpirationNoticeTemplate(username);

    try {
      const result = await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject: "❌ Twój dostęp Premium wygasł - MaturaPolski.pl",
        html,
      });
      console.log("✅ Expiration notice email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("❌ Expiration notice email error:", error);
      return null;
    }
  }

  // DODAJ TE TEMPLATE METODY NA KOŃCU KLASY (jako private):

  private getExpirationWarning7DaysTemplate(
    username: string,
    endDate: Date
  ): string {
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);
    const formattedDate = endDate.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const renewUrl = `${process.env.FRONTEND_URL}/subscription`;

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
            background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); 
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
          }
          .warning-box {
            background: #fff7ed;
            border: 2px solid #f59e0b;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
          }
          .date-box {
            font-size: 24px;
            font-weight: bold;
            color: #ea580c;
            margin: 15px 0;
          }
          .button { 
            display: inline-block; 
            padding: 15px 40px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            text-decoration: none; 
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
          .benefits {
            background: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
          }
          .footer { 
            background: #2d3436; 
            color: #b2bec3;
            padding: 30px; 
            text-align: center; 
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Przypomnienie o wygaśnięciu</h1>
          </div>
          <div class="content">
            <h2>Cześć, ${displayName}!</h2>
            
            <div class="warning-box">
              <p style="margin: 0 0 10px 0; font-size: 18px;">
                Twój dostęp Premium wygasa za <strong>7 dni</strong>
              </p>
              <div class="date-box">${formattedDate}</div>
            </div>
            
            <p>Aby nie stracić dostępu do funkcji Premium, przedłuż swoją subskrypcję już teraz!</p>
            
            <div class="benefits">
              <h3 style="margin-top: 0;">Co stracisz po wygaśnięciu:</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>200 punktów AI miesięcznie</li>
                <li>Szczegółowy feedback AI dla zadań pisemnych</li>
                <li>Nieograniczone zadania zamknięte</li>
                <li>Priorytetowe wsparcie</li>
              </ul>
            </div>
            
            <center>
              <a href="${renewUrl}" class="button">
                Przedłuż Premium →
              </a>
            </center>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #6c757d; font-size: 14px;">
              <strong>Masz pytania?</strong> Skontaktuj się z nami odpowiadając na tego maila.
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0 0 10px 0;">© 2025 MaturaPolski.pl. Wszystkie prawa zastrzeżone.</p>
            <p style="margin: 0;">
              <a href="${renewUrl}" style="color: #b2bec3;">Zarządzaj subskrypcją</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
  }

  private getExpirationWarning1DayTemplate(
    username: string,
    endDate: Date
  ): string {
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);
    const formattedDate = endDate.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const renewUrl = `${process.env.FRONTEND_URL}/subscription`;

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
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); 
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
          }
          .urgent-box {
            background: #fef2f2;
            border: 3px solid #dc2626;
            border-radius: 10px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
          }
          .countdown {
            font-size: 48px;
            font-weight: bold;
            color: #dc2626;
            margin: 15px 0;
          }
          .button { 
            display: inline-block; 
            padding: 18px 50px; 
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white; 
            text-decoration: none; 
            border-radius: 8px;
            font-weight: bold;
            font-size: 18px;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
          }
          .footer { 
            background: #2d3436; 
            color: #b2bec3;
            padding: 30px; 
            text-align: center; 
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 PILNE: Ostatni dzień!</h1>
          </div>
          <div class="content">
            <h2>Cześć, ${displayName}!</h2>
            
            <div class="urgent-box">
              <p style="margin: 0 0 10px 0; font-size: 20px; font-weight: bold;">
                Twój dostęp Premium wygasa już JUTRO!
              </p>
              <div class="countdown">⏰ 24h</div>
              <p style="margin: 10px 0 0 0; color: #dc2626;">
                ${formattedDate}
              </p>
            </div>
            
            <p style="font-size: 16px;">
              <strong>To Twoja ostatnia szansa</strong>, aby przedłużyć Premium i zachować dostęp do:
            </p>
            
            <ul style="font-size: 16px; line-height: 1.8;">
              <li>✨ 200 punktów AI miesięcznie</li>
              <li>🎯 Szczegółowego feedbacku AI</li>
              <li>📚 Nieograniczonych zadań zamkniętych</li>
              <li>🚀 Priorytetowego wsparcia</li>
            </ul>
            
            <center>
              <a href="${renewUrl}" class="button">
                ⚡ Przedłuż teraz - 5 minut
              </a>
            </center>
            
            <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>💡 Wskazówka:</strong> Wybierając subskrypcję za 39 zł/mies zaoszczędzisz 10 zł w porównaniu do jednorazowej płatności!
              </p>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0 0 10px 0;">© 2025 MaturaPolski.pl</p>
          </div>
        </div>
      </body>
    </html>
  `;
  }

  private getExpirationNoticeTemplate(username: string): string {
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);
    const renewUrl = `${process.env.FRONTEND_URL}/subscription`;

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
            background: linear-gradient(135deg, #6b7280 0%, #374151 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center;
          }
          .content { 
            background: white; 
            padding: 40px 30px;
          }
          .expired-box {
            background: #f3f4f6;
            border: 2px solid #9ca3af;
            border-radius: 10px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
          }
          .button { 
            display: inline-block; 
            padding: 15px 40px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            text-decoration: none; 
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
          .comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 25px 0;
          }
          .plan-card {
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
          }
          .plan-card.premium {
            border-color: #667eea;
            background: #f0f4ff;
          }
          .footer { 
            background: #2d3436; 
            color: #b2bec3;
            padding: 30px; 
            text-align: center; 
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❌ Dostęp Premium wygasł</h1>
          </div>
          <div class="content">
            <h2>Cześć, ${displayName}</h2>
            
            <div class="expired-box">
              <p style="margin: 0; font-size: 18px;">
                Twój dostęp Premium został dezaktywowany
              </p>
            </div>
            
            <p>Twoje konto zostało przełączone na plan <strong>Free</strong>.</p>
            
            <div class="comparison">
              <div class="plan-card">
                <h3 style="margin-top: 0;">Plan Free</h3>
                <p style="font-size: 24px; font-weight: bold; color: #6b7280; margin: 10px 0;">0 zł</p>
                <ul style="text-align: left; padding-left: 20px; font-size: 14px; color: #6b7280;">
                  <li>20 punktów AI/mies</li>
                  <li>Podstawowe zadania</li>
                  <li>Standardowe wsparcie</li>
                </ul>
                <p style="font-size: 12px; color: #9ca3af; margin: 15px 0 0 0;">
                  ⬅️ Jesteś tutaj
                </p>
              </div>
              
              <div class="plan-card premium">
                <h3 style="margin-top: 0; color: #667eea;">Plan Premium</h3>
                <p style="font-size: 24px; font-weight: bold; color: #667eea; margin: 10px 0;">39 zł/mies</p>
                <ul style="text-align: left; padding-left: 20px; font-size: 14px;">
                  <li><strong>200</strong> punktów AI/mies</li>
                  <li>Wszystkie zadania</li>
                  <li>Feedback AI</li>
                  <li>Priorytetowe wsparcie</li>
                </ul>
              </div>
            </div>
            
            <center>
              <a href="${renewUrl}" class="button">
                Odzyskaj Premium →
              </a>
            </center>
            
            <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
              Dziękujemy za korzystanie z MaturaPolski.pl Premium! Mamy nadzieję, że niedługo do nas wrócisz. 💙
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0;">© 2025 MaturaPolski.pl</p>
          </div>
        </div>
      </body>
    </html>
  `;
  }
}
