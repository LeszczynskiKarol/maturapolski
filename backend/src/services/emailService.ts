// backend/src/services/emailService.ts

import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Konfiguracja AWS SES
    const ses = new aws.SES({
      region: process.env.AWS_REGION || "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // Utworz transporter z aws-sdk
    this.transporter = nodemailer.createTransport({
      SES: { ses, aws },
    } as any);
  }

  async sendWelcomeEmail(to: string, firstName: string) {
    const html = this.getWelcomeEmailTemplate(firstName);

    return this.sendEmail({
      to,
      subject: "Witaj w Matura Polski! 🎓",
      html,
    });
  }

  async sendPasswordReset(to: string, resetToken: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const html = this.getPasswordResetTemplate(resetUrl);

    return this.sendEmail({
      to,
      subject: "Reset hasła - Matura Polski",
      html,
    });
  }

  private async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }) {
    try {
      const result = await this.transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      console.log("Email sent:", result.messageId);
      return result;
    } catch (error) {
      console.error("Email send error:", error);
      // Nie rzucaj błędu, żeby nie blokować rejestracji
      return null;
    }
  }

  private getWelcomeEmailTemplate(firstName: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
            .features {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .feature {
              padding: 10px 0;
              border-bottom: 1px solid #e9ecef;
            }
            .feature:last-child {
              border-bottom: none;
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
              <h1>🎓 Witaj w Matura Polski!</h1>
            </div>
            <div class="content">
              <h2>Cześć ${firstName}!</h2>
              <p>Gratulacje! Właśnie dołączyłeś do tysięcy maturzystów, którzy przygotowują się do egzaminu z nami.</p>
              
              <div class="features">
                <div class="feature">
                  <strong>🎯 15,000+ zadań</strong> - największa baza zadań maturalnych
                </div>
                <div class="feature">
                  <strong>🤖 AI ocenia wypracowania</strong> - natychmiastowy feedback
                </div>
                <div class="feature">
                  <strong>📊 Szczegółowe statystyki</strong> - śledź swoje postępy
                </div>
                <div class="feature">
                  <strong>🏆 System motywacji</strong> - zdobywaj punkty i odznaki
                </div>
              </div>
              
              <p>Zacznij od krótkiego testu diagnostycznego, który pomoże nam dostosować zadania do Twojego poziomu.</p>
              
              <center>
                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">
                  Rozpocznij naukę →
                </a>
              </center>
              
              <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
                <strong>Wskazówka:</strong> Ustaw cel nauki na minimum 30 minut dziennie dla najlepszych rezultatów!
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0 0 10px 0;">© 2024 Matura Polski. Wszystkie prawa zastrzeżone.</p>
              <p style="margin: 0;">
                <a href="${process.env.FRONTEND_URL}/unsubscribe">Wypisz się</a> | 
                <a href="${process.env.FRONTEND_URL}/privacy">Polityka prywatności</a>
              </p>
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
            /* Podobne style jak wyżej */
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔒 Reset hasła</h1>
            </div>
            <div class="content">
              <h2>Zapomniałeś hasła?</h2>
              <p>Nie martw się! Otrzymaliśmy prośbę o reset hasła dla Twojego konta.</p>
              <p>Kliknij poniższy przycisk, aby ustawić nowe hasło:</p>
              
              <center>
                <a href="${resetUrl}" class="button">
                  Ustaw nowe hasło →
                </a>
              </center>
              
              <p style="color: #6c757d; font-size: 14px;">
                Link wygaśnie za 1 godzinę ze względów bezpieczeństwa.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
              
              <p style="color: #6c757d; font-size: 13px;">
                Jeśli nie prosiłeś o reset hasła, zignoruj ten email. Twoje hasło pozostanie niezmienione.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
