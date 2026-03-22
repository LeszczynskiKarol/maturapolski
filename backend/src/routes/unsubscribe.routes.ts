// backend/src/routes/unsubscribe.routes.ts
// PUBLICZNE ENDPOINTY — BEZ AUTORYZACJI!

import { FastifyInstance } from "fastify";
import {
  emailPreferenceService,
  EMAIL_CATEGORY_LABELS,
  EmailCategory,
} from "../services/emailPreferenceService";

export async function unsubscribeRoutes(fastify: FastifyInstance) {
  // ================================================================
  // GET /api/email/unsubscribe?token=xxx&category=all
  // Jednym kliknięciem z emaila — wypisanie się
  // ================================================================
  fastify.get("/unsubscribe", async (request, reply) => {
    const { token, category } = request.query as {
      token?: string;
      category?: string;
    };

    if (!token) {
      return reply.code(400).type("text/html").send(errorPage("Brak tokenu wypisania."));
    }

    const validCategories = [...Object.keys(EMAIL_CATEGORY_LABELS), "all"];
    const cat = (category || "all") as EmailCategory | "all";

    if (!validCategories.includes(cat)) {
      return reply.code(400).type("text/html").send(errorPage("Nieprawidłowa kategoria."));
    }

    const result = await emailPreferenceService.unsubscribeByToken(token, cat);

    if (!result.success) {
      return reply.code(400).type("text/html").send(errorPage(result.message));
    }

    // Zwróć stronę HTML z potwierdzeniem
    return reply.type("text/html").send(
      unsubscribeSuccessPage(token, cat, result.message),
    );
  });

  // ================================================================
  // GET /api/email/resubscribe?token=xxx&category=all
  // Przywrócenie subskrypcji
  // ================================================================
  fastify.get("/resubscribe", async (request, reply) => {
    const { token, category } = request.query as {
      token?: string;
      category?: string;
    };

    if (!token) {
      return reply.code(400).type("text/html").send(errorPage("Brak tokenu."));
    }

    const cat = (category || "all") as EmailCategory | "all";
    const result = await emailPreferenceService.resubscribeByToken(token, cat);

    if (!result.success) {
      return reply.code(400).type("text/html").send(errorPage(result.message));
    }

    return reply.type("text/html").send(resubscribeSuccessPage(result.message));
  });

  // ================================================================
  // GET /api/email/preferences?token=xxx
  // Strona zarządzania preferencjami (BEZ LOGOWANIA)
  // ================================================================
  fastify.get("/preferences", async (request, reply) => {
    const { token } = request.query as { token?: string };

    if (!token) {
      return reply.code(400).type("text/html").send(errorPage("Brak tokenu."));
    }

    const prefs = await emailPreferenceService.getPreferencesByToken(token);

    if (!prefs) {
      return reply.code(400).type("text/html").send(errorPage("Nieprawidłowy link."));
    }

    return reply.type("text/html").send(preferencesPage(token, prefs));
  });

  // ================================================================
  // POST /api/email/preferences
  // Zapisanie zmian preferencji (formularz z HTML strony)
  // ================================================================
  fastify.post("/preferences", async (request, reply) => {
    const body = request.body as {
      token: string;
      allEmails?: string;
      streakReminders?: string;
      weeklySummary?: string;
      reengagement?: string;
      promotions?: string;
      achievements?: string;
      examCountdown?: string;
      newContent?: string;
    };

    if (!body.token) {
      return reply.code(400).type("text/html").send(errorPage("Brak tokenu."));
    }

    const updates: Record<string, boolean> = {
      allEmails: body.allEmails === "on",
      streakReminders: body.streakReminders === "on",
      weeklySummary: body.weeklySummary === "on",
      reengagement: body.reengagement === "on",
      promotions: body.promotions === "on",
      achievements: body.achievements === "on",
      examCountdown: body.examCountdown === "on",
      newContent: body.newContent === "on",
    };

    try {
      await emailPreferenceService.updatePreferencesByToken(body.token, updates);
      return reply.type("text/html").send(preferencesSavedPage(body.token));
    } catch (error) {
      return reply.code(400).type("text/html").send(errorPage("Nie udało się zapisać preferencji."));
    }
  });
}

// ================================================================
// HTML PAGES
// ================================================================

function pageWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preferencje email — MaturaPolski.pl</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      color: #333;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
      max-width: 520px;
      width: 100%;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 { font-size: 22px; margin: 0; }
    .content { padding: 30px; }
    .success-icon { font-size: 48px; text-align: center; margin-bottom: 15px; }
    .message { font-size: 16px; text-align: center; margin-bottom: 20px; }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      border: none;
      text-align: center;
    }
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }
    .btn-block { display: block; width: 100%; }
    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    .toggle-row:last-child { border-bottom: none; }
    .toggle-label { font-size: 14px; }
    .toggle-desc { font-size: 12px; color: #6b7280; }
    .switch {
      position: relative;
      width: 44px;
      height: 24px;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: #d1d5db;
      border-radius: 24px;
      transition: .3s;
    }
    .slider:before {
      content: "";
      position: absolute;
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: .3s;
    }
    input:checked + .slider { background: #667eea; }
    input:checked + .slider:before { transform: translateX(20px); }
    .footer-note {
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid #f3f4f6;
    }
    .center { text-align: center; }
    .mt-3 { margin-top: 15px; }
    .mt-4 { margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    ${content}
  </div>
</body>
</html>`;
}

function unsubscribeSuccessPage(token: string, category: string, message: string): string {
  const resubscribeUrl = `/api/email/resubscribe?token=${token}&category=${category}`;
  const manageUrl = `/api/email/preferences?token=${token}`;

  return pageWrapper(`
    <div class="header">
      <h1>📧 Preferencje email</h1>
    </div>
    <div class="content">
      <div class="success-icon">✅</div>
      <p class="message">${message}</p>
      
      <div class="center mt-3">
        <a href="${resubscribeUrl}" class="btn btn-secondary">↩️ Cofnij — chcę dalej otrzymywać</a>
      </div>
      
      <div class="center mt-3">
        <a href="${manageUrl}" class="btn btn-primary btn-block">Zarządzaj preferencjami email</a>
      </div>
      
      <p class="footer-note">
        Możesz zmienić swoje preferencje w dowolnym momencie.
      </p>
    </div>
  `);
}

function resubscribeSuccessPage(message: string): string {
  return pageWrapper(`
    <div class="header">
      <h1>📧 Preferencje email</h1>
    </div>
    <div class="content">
      <div class="success-icon">📬</div>
      <p class="message">${message}</p>
      <p class="footer-note">Będziesz ponownie otrzymywać powiadomienia email.</p>
    </div>
  `);
}

function errorPage(message: string): string {
  return pageWrapper(`
    <div class="header">
      <h1>📧 Preferencje email</h1>
    </div>
    <div class="content">
      <div class="success-icon">❌</div>
      <p class="message">${message}</p>
      <p class="footer-note">Jeśli problem się powtarza, skontaktuj się z nami: kontakt@maturapolski.pl</p>
    </div>
  `);
}

function preferencesPage(token: string, prefs: any): string {
  const categories = [
    { key: "allEmails", label: "Wszystkie emaile", desc: "Globalny przełącznik — wyłączenie blokuje wszystkie emaile" },
    { key: "streakReminders", label: "Przypomnienia o passie", desc: "\"Twoja passa zagrożona!\", \"Nie strać passy\"" },
    { key: "weeklySummary", label: "Tygodniowe podsumowanie", desc: "Poniedziałkowy raport z postępami" },
    { key: "reengagement", label: "Przypomnienia o nauce", desc: "\"Dawno Cię nie było\", aktywacja konta" },
    { key: "promotions", label: "Oferty i promocje", desc: "Informacje o Premium, specjalne oferty" },
    { key: "achievements", label: "Osiągnięcia i poziomy", desc: "Nowy poziom odblokowany, milestone passy" },
    { key: "examCountdown", label: "Odliczanie do matury", desc: "\"Do matury zostało X dni\"" },
    { key: "newContent", label: "Nowe zadania", desc: "Powiadomienia o nowych zadaniach w bazie" },
  ];

  const toggleRows = categories
    .map(
      (cat) => `
      <div class="toggle-row">
        <div>
          <div class="toggle-label">${cat.label}</div>
          <div class="toggle-desc">${cat.desc}</div>
        </div>
        <label class="switch">
          <input type="checkbox" name="${cat.key}" ${prefs[cat.key] ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>`,
    )
    .join("");

  const email = prefs.user?.email
    ? prefs.user.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : "";

  return pageWrapper(`
    <div class="header">
      <h1>📧 Preferencje email</h1>
      ${email ? `<p style="margin-top: 8px; font-size: 14px; opacity: 0.8;">${email}</p>` : ""}
    </div>
    <div class="content">
      <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
        Wybierz, które emaile chcesz otrzymywać od MaturaPolski.pl:
      </p>
      
      <form method="POST" action="/api/email/preferences">
        <input type="hidden" name="token" value="${token}">
        ${toggleRows}
        
        <div class="mt-4">
          <button type="submit" class="btn btn-primary btn-block">💾 Zapisz preferencje</button>
        </div>
      </form>
      
      <p class="footer-note">
        Zmiany zostaną zastosowane natychmiast. Emaile transakcyjne (reset hasła, potwierdzenie zakupu) będą wysyłane zawsze.
      </p>
    </div>
  `);
}

function preferencesSavedPage(token: string): string {
  const manageUrl = `/api/email/preferences?token=${token}`;

  return pageWrapper(`
    <div class="header">
      <h1>📧 Preferencje email</h1>
    </div>
    <div class="content">
      <div class="success-icon">✅</div>
      <p class="message">Preferencje zostały zapisane!</p>
      
      <div class="center mt-3">
        <a href="${manageUrl}" class="btn btn-secondary">← Wróć do preferencji</a>
      </div>
      
      <p class="footer-note">
        Zmiany zostały zastosowane natychmiast.
      </p>
    </div>
  `);
}
