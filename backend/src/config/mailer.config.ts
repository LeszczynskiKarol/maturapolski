// backend/src/config/mailer.config.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "email-smtp.eu-north-1.amazonaws.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASSWORD!,
  },
});

// Override — dodaje Configuration Set header do KAŻDEGO emaila
const originalSendMail = transporter.sendMail.bind(transporter);
transporter.sendMail = function (mailOptions: any) {
  if (!mailOptions.headers) mailOptions.headers = {};
  mailOptions.headers["X-SES-CONFIGURATION-SET"] = "maturapolski-tracking";
  return originalSendMail(mailOptions);
};
