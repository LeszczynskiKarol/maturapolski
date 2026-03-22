// backend/src/services/engagementEmailTemplates.ts

const FRONTEND_URL = process.env.FRONTEND_URL || "https://maturapolski.pl";

// ============================================================
// HELPER: Wspólny footer z linkiem do wypisania
// ============================================================
function emailFooter(unsubscribeToken: string, category: string): string {
  const unsubscribeUrl = `${FRONTEND_URL}/wypisz-sie?token=${unsubscribeToken}&category=${category}`;
  const manageUrl = `${FRONTEND_URL}/wypisz-sie?token=${unsubscribeToken}&manage=true`;

  return `
    <div style="background: #2d3436; color: #b2bec3; padding: 30px; text-align: center; font-size: 13px;">
      <p style="margin: 0 0 10px 0;">© 2025 MaturaPolski.pl. Wszystkie prawa zastrzeżone.</p>
      <p style="margin: 0 0 5px 0;">
        <a href="${unsubscribeUrl}" style="color: #b2bec3; text-decoration: underline;">Wypisz się z tych powiadomień</a>
        &nbsp;|&nbsp;
        <a href="${manageUrl}" style="color: #b2bec3; text-decoration: underline;">Zarządzaj preferencjami email</a>
      </p>
      <p style="margin: 10px 0 0 0; color: #636e72; font-size: 11px;">
        Otrzymujesz ten email, ponieważ masz konto w MaturaPolski.pl
      </p>
    </div>
  `;
}

function emailWrapper(
  headerBg: string,
  headerContent: string,
  bodyContent: string,
  footerHtml: string,
): string {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <div style="background: ${headerBg}; color: white; padding: 40px 30px; text-align: center;">
          ${headerContent}
        </div>
        <div style="background: white; padding: 40px 30px;">
          ${bodyContent}
        </div>
        ${footerHtml}
      </div>
    </body>
  </html>`;
}

// ============================================================
// 1. STREAK REMINDER — "Twoja passa zagrożona!"
// ============================================================
export function streakReminderTemplate(
  username: string,
  streakDays: number,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return emailWrapper(
    "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    `<h1 style="margin: 0; font-size: 28px;">🔥 Nie strać passy ${streakDays} dni!</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Hej, ${displayName}!</h2>
      
      <div style="background: #fff7ed; border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center;">
        <p style="font-size: 48px; margin: 0 0 5px 0;">🔥</p>
        <p style="font-size: 36px; font-weight: bold; color: #ea580c; margin: 0 0 5px 0;">${streakDays} dni z rzędu</p>
        <p style="margin: 0; color: #92400e;">Twoja passa wygaśnie dzisiaj o północy!</p>
      </div>
      
      <p style="font-size: 16px;">Wystarczy <strong>5 minut</strong> i kilka zadań, żeby utrzymać passę. Nie pozwól, żeby przepadła!</p>
      
      <center>
        <a href="${FRONTEND_URL}/dashboard" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Rozwiąż szybkie zadanie →
        </a>
      </center>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
        💡 <strong>Wskazówka:</strong> Zadania zamknięte zajmują średnio 30 sekund. Nawet w autobusie!
      </p>
    `,
    emailFooter(unsubscribeToken, "streakReminders"),
  );
}

// ============================================================
// 2. STREAK MILESTONE — "Świetnie Ci idzie!"
// ============================================================
export function streakMilestoneTemplate(
  username: string,
  streakDays: number,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const milestoneEmoji =
    streakDays >= 30
      ? "🏆"
      : streakDays >= 14
        ? "⭐"
        : streakDays >= 7
          ? "🔥"
          : "✨";
  const milestoneText =
    streakDays >= 30
      ? "Jesteś legendą!"
      : streakDays >= 14
        ? "Imponujące!"
        : streakDays >= 7
          ? "Świetna passa!"
          : "Dobry start!";

  return emailWrapper(
    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    `<h1 style="margin: 0; font-size: 28px;">${milestoneEmoji} ${milestoneText} ${streakDays} dni!</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Gratulacje, ${displayName}!</h2>
      
      <div style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center;">
        <p style="font-size: 64px; margin: 0 0 10px 0;">${milestoneEmoji}</p>
        <p style="font-size: 28px; font-weight: bold; color: #059669; margin: 0 0 5px 0;">${streakDays} dni nauki z rzędu!</p>
        <p style="margin: 0; color: #047857;">Tak trzymaj — konsekwencja to klucz do sukcesu na maturze.</p>
      </div>
      
      <p style="font-size: 16px;">
        ${
          streakDays >= 14
            ? "Twoja systematyczność stawia Cię w czołówce użytkowników. Utrzymaj tempo!"
            : "Widzisz? Każdy dzień się liczy. Kontynuuj naukę i obserwuj jak rosną Twoje wyniki."
        }
      </p>
      
      <center>
        <a href="${FRONTEND_URL}/dashboard" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Kontynuuj naukę →
        </a>
      </center>
    `,
    emailFooter(unsubscribeToken, "achievements"),
  );
}

// ============================================================
// 3. WEEKLY SUMMARY — poniedziałkowe podsumowanie
// ============================================================
export interface WeeklySummaryData {
  exercisesThisWeek: number;
  exercisesLastWeek: number;
  avgScoreThisWeek: number;
  avgScoreLastWeek: number;
  studyTimeMinutes: number;
  currentStreak: number;
  weakestCategory: string | null;
  strongestCategory: string | null;
  isPremium: boolean;
}

export function weeklySummaryTemplate(
  username: string,
  data: WeeklySummaryData,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const exerciseChange = data.exercisesThisWeek - data.exercisesLastWeek;
  const scoreChange = data.avgScoreThisWeek - data.avgScoreLastWeek;
  const exerciseTrend =
    exerciseChange > 0 ? "📈" : exerciseChange < 0 ? "📉" : "➡️";
  const scoreTrend = scoreChange > 0 ? "📈" : scoreChange < 0 ? "📉" : "➡️";

  const categoryNames: Record<string, string> = {
    LANGUAGE_USE: "Język w użyciu",
    HISTORICAL_LITERARY: "Test historycznoliteracki",
    WRITING: "Pisanie",
  };

  const weakName = data.weakestCategory
    ? categoryNames[data.weakestCategory] || data.weakestCategory
    : null;
  const strongName = data.strongestCategory
    ? categoryNames[data.strongestCategory] || data.strongestCategory
    : null;

  const motivationBlock =
    data.exercisesThisWeek === 0
      ? `
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px 20px; margin: 20px 0;">
          <p style="margin: 0; color: #991b1b;">
            <strong>🚫 Ani jednego zadania w tym tygodniu.</strong> Nawet 5 minut dziennie robi różnicę! Wróć do nauki.
          </p>
        </div>`
      : data.exercisesThisWeek > data.exercisesLastWeek
        ? `
        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px 20px; margin: 20px 0;">
          <p style="margin: 0; color: #065f46;">
            <strong>🎉 Lepiej niż w zeszłym tygodniu!</strong> +${exerciseChange} zadań. Utrzymaj tempo!
          </p>
        </div>`
        : "";

  const premiumCTA = !data.isPremium
    ? `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 16px;">🎯 Chcesz szybszych postępów?</p>
        <p style="margin: 0 0 15px 0; font-size: 14px;">Z Premium możesz ćwiczyć konkretne epoki, pisać wypracowania z AI i mieć nieograniczone pytania.</p>
        <a href="${FRONTEND_URL}/subscription" style="display: inline-block; padding: 10px 30px; background: white; color: #667eea; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Sprawdź Premium — 39 zł/mies
        </a>
      </div>`
    : "";

  return emailWrapper(
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    `<h1 style="margin: 0; font-size: 28px;">📊 Twój tydzień w liczbach</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
      <p>Oto Twoje podsumowanie za ostatni tydzień:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0;">
        <div style="background: #f0f4ff; border-radius: 10px; padding: 20px; text-align: center;">
          <p style="margin: 0 0 5px 0; font-size: 32px; font-weight: bold; color: #667eea;">${data.exercisesThisWeek}</p>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Zadań rozwiązanych ${exerciseTrend}</p>
        </div>
        <div style="background: #f0fdf4; border-radius: 10px; padding: 20px; text-align: center;">
          <p style="margin: 0 0 5px 0; font-size: 32px; font-weight: bold; color: #059669;">${data.avgScoreThisWeek}%</p>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Średni wynik ${scoreTrend}</p>
        </div>
        <div style="background: #fef3c7; border-radius: 10px; padding: 20px; text-align: center;">
          <p style="margin: 0 0 5px 0; font-size: 32px; font-weight: bold; color: #d97706;">${data.studyTimeMinutes}</p>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Minut nauki</p>
        </div>
        <div style="background: #fce4ec; border-radius: 10px; padding: 20px; text-align: center;">
          <p style="margin: 0 0 5px 0; font-size: 32px; font-weight: bold; color: #ea580c;">🔥 ${data.currentStreak}</p>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Dni passy</p>
        </div>
      </div>
      
      ${motivationBlock}
      
      ${
        weakName
          ? `<p style="font-size: 14px; color: #6b7280;">
              💪 <strong>Mocna strona:</strong> ${strongName || "—"} &nbsp;|&nbsp;
              📚 <strong>Do poprawy:</strong> ${weakName}
            </p>`
          : ""
      }
      
      ${premiumCTA}
      
      <center>
        <a href="${FRONTEND_URL}/dashboard" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Kontynuuj naukę →
        </a>
      </center>
    `,
    emailFooter(unsubscribeToken, "weeklySummary"),
  );
}

// ============================================================
// 4. RE-ENGAGEMENT — "Dawno Cię nie było!"
// ============================================================
export function reengagementTemplate(
  username: string,
  daysInactive: number,
  isPremium: boolean,
  unsubscribeToken: string,
  lastEpoch?: string | null,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const epochNames: Record<string, string> = {
    ANTIQUITY: "starożytności",
    MIDDLE_AGES: "średniowiecza",
    RENAISSANCE: "renesansu",
    BAROQUE: "baroku",
    ENLIGHTENMENT: "oświecenia",
    ROMANTICISM: "romantyzmu",
    POSITIVISM: "pozytywizmu",
    YOUNG_POLAND: "Młodej Polski",
    INTERWAR: "dwudziestolecia międzywojennego",
    CONTEMPORARY: "współczesności",
  };

  const lastEpochText =
    lastEpoch && epochNames[lastEpoch]
      ? `Ostatnio ćwiczyłeś pytania z <strong>${epochNames[lastEpoch]}</strong>. Wróć i kontynuuj!`
      : "Mamy nowe zadania czekające na Ciebie.";

  const urgencyLevel =
    daysInactive >= 30
      ? { emoji: "😢", title: "Tęsknimy za Tobą!", color: "#dc2626" }
      : daysInactive >= 14
        ? { emoji: "⏰", title: "Matura nie czeka!", color: "#ea580c" }
        : { emoji: "👋", title: "Hej, dawno Cię nie było!", color: "#f59e0b" };

  const premiumCTA = !isPremium
    ? `
      <div style="background: #f0f4ff; border: 2px dashed #667eea; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #667eea;">🎁 Specjalna oferta na powrót</p>
        <p style="margin: 0 0 15px 0; font-size: 14px; color: #6b7280;">Odblokuj pełny dostęp do platformy — powtórki z epok, AI oceniające wypracowania i nieograniczone pytania.</p>
        <a href="${FRONTEND_URL}/subscription" style="display: inline-block; padding: 10px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Premium za 39 zł/mies →
        </a>
      </div>`
    : "";

  return emailWrapper(
    `linear-gradient(135deg, ${urgencyLevel.color} 0%, #991b1b 100%)`,
    `<h1 style="margin: 0; font-size: 28px;">${urgencyLevel.emoji} ${urgencyLevel.title}</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
      
      <p style="font-size: 16px;">Nie widzieliśmy Cię od <strong>${daysInactive} dni</strong>. ${lastEpochText}</p>
      
      <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="margin: 0 0 15px 0; font-weight: bold;">Co słychać na platformie:</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <span style="background: #e0e7ff; color: #3730a3; padding: 6px 14px; border-radius: 20px; font-size: 13px;">📚 Nowe zadania</span>
          <span style="background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 20px; font-size: 13px;">🎯 Ulepszony algorytm</span>
          <span style="background: #fef3c7; color: #92400e; padding: 6px 14px; border-radius: 20px; font-size: 13px;">⚡ Szybsze AI</span>
        </div>
      </div>
      
      ${premiumCTA}
      
      <center>
        <a href="${FRONTEND_URL}/dashboard" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Wróć do nauki →
        </a>
      </center>
      
      <p style="color: #9ca3af; font-size: 13px; margin-top: 20px;">
        Twoje postępy i konto są bezpiecznie zapisane. Wszystko czeka na Ciebie!
      </p>
    `,
    emailFooter(unsubscribeToken, "reengagement"),
  );
}

// ============================================================
// 5. FIRST DAY ACTIVATION — "Zacznij swoją pierwszą sesję!"
// ============================================================
export function firstDayActivationTemplate(
  username: string,
  _isPremium: boolean,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return emailWrapper(
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    `<h1 style="margin: 0; font-size: 28px;">🚀 Czas na pierwszą sesję!</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
      
      <p style="font-size: 16px;">Założyłeś konto, ale jeszcze nie rozwiązałeś żadnego zadania. Pierwszy krok jest najważniejszy!</p>
      
      <div style="background: #f0f4ff; border-radius: 12px; padding: 25px; margin: 20px 0;">
        <h3 style="margin: 0 0 15px 0; color: #667eea;">3 kroki na start:</h3>
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; background: #667eea; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
          <span>Wejdź do panelu nauki</span>
        </div>
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; background: #667eea; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
          <span>Rozwiąż pierwsze zadanie testowe</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; background: #667eea; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
          <span>Sprawdź wynik i czytaj wyjaśnienia</span>
        </div>
      </div>
      
      <p style="font-size: 14px; color: #6b7280;">Pierwsza sesja zajmuje średnio <strong>5-10 minut</strong>. Możesz zacząć od dowolnego poziomu trudności.</p>
      
      <center>
        <a href="${FRONTEND_URL}/exercises" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Rozwiąż pierwsze zadanie →
        </a>
      </center>
    `,
    emailFooter(unsubscribeToken, "reengagement"),
  );
}

// ============================================================
// 6. FREE LIMIT HIT — "Twój dzienny limit się skończył"
// ============================================================
export function freeLimitHitTemplate(
  username: string,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return emailWrapper(
    "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    `<h1 style="margin: 0; font-size: 28px;">🔒 Limit dzienny wyczerpany</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">${displayName}, chciałeś się jeszcze uczyć!</h2>
      
      <p style="font-size: 16px;">To świetnie, że chcesz więcej! Niestety, dzienny limit 5 darmowych pytań się wyczerpał.</p>
      
      <div style="background: #f5f3ff; border: 2px solid #8b5cf6; border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center;">
        <p style="font-size: 18px; font-weight: bold; color: #6d28d9; margin: 0 0 15px 0;">Z Premium nie ma limitów!</p>
        <table style="width: 100%; font-size: 14px; margin-bottom: 15px;">
          <tr>
            <td style="padding: 8px; text-align: left; color: #6b7280;">Free:</td>
            <td style="padding: 8px; text-align: right;">5 pytań/dzień, tylko zamknięte</td>
          </tr>
          <tr>
            <td style="padding: 8px; text-align: left; color: #6b7280;">Premium:</td>
            <td style="padding: 8px; text-align: right; font-weight: bold; color: #6d28d9;">∞ pytań, wszystkie typy + AI</td>
          </tr>
        </table>
        <a href="${FRONTEND_URL}/subscription" style="display: inline-block; padding: 12px 35px; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Odblokuj Premium — 39 zł/mies
        </a>
      </div>
      
      <p style="color: #6b7280; font-size: 14px;">
        Jutro limit zostanie odnowiony — możesz wrócić i rozwiązać kolejne 5 pytań za darmo.
      </p>
    `,
    emailFooter(unsubscribeToken, "promotions"),
  );
}

// ============================================================
// 7. LEVEL UNLOCK — "Nowy poziom odblokowany!"
// ============================================================
export function levelUnlockTemplate(
  username: string,
  newLevel: number,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const levelNames: Record<number, string> = {
    3: "Średni",
    4: "Trudny",
    5: "Mistrzowski",
  };
  const levelEmojis: Record<number, string> = {
    3: "🎯",
    4: "🚀",
    5: "🏆",
  };

  return emailWrapper(
    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    `<h1 style="margin: 0; font-size: 28px;">${levelEmojis[newLevel] || "🎉"} Poziom ${newLevel} odblokowany!</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Gratulacje, ${displayName}!</h2>
      
      <div style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center;">
        <p style="font-size: 64px; margin: 0 0 10px 0;">${levelEmojis[newLevel] || "🎉"}</p>
        <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0 0 5px 0;">Poziom ${newLevel}: ${levelNames[newLevel] || "Nowy"}</p>
        <p style="margin: 0; color: #047857;">Czekają na Ciebie trudniejsze i bardziej wymagające zadania.</p>
      </div>
      
      <p style="font-size: 16px;">Twoja ciężka praca się opłaciła! Nowy poziom oznacza nowe wyzwania — zadania, które naprawdę przygotują Cię na maturę.</p>
      
      <center>
        <a href="${FRONTEND_URL}/exercises" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Spróbuj nowych zadań →
        </a>
      </center>
    `,
    emailFooter(unsubscribeToken, "achievements"),
  );
}

// ============================================================
// 8. EXAM COUNTDOWN — "Do matury zostało X dni!"
// ============================================================
export function examCountdownTemplate(
  username: string,
  daysLeft: number,
  isPremium: boolean,
  stats: { exercisesTotal: number; avgScore: number },
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const urgency =
    daysLeft <= 7
      ? { bg: "#dc2626", label: "OSTATNI TYDZIEŃ!" }
      : daysLeft <= 14
        ? { bg: "#ea580c", label: "Ostatnie 2 tygodnie!" }
        : daysLeft <= 30
          ? { bg: "#f59e0b", label: "Zostało 30 dni" }
          : { bg: "#667eea", label: `${daysLeft} dni do matury` };

  const premiumCTA = !isPremium
    ? `
      <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px 20px; margin: 20px 0;">
        <p style="margin: 0; color: #991b1b;">
          <strong>⚠️ Matura za ${daysLeft} dni, a Ty jeszcze na planie Free?</strong> 
          Z Premium zdążysz przećwiczyć setki zadań z AI feedbackiem.
          <a href="${FRONTEND_URL}/subscription" style="color: #667eea; font-weight: bold;">Aktywuj teraz →</a>
        </p>
      </div>`
    : "";

  return emailWrapper(
    `linear-gradient(135deg, ${urgency.bg} 0%, #991b1b 100%)`,
    `<h1 style="margin: 0; font-size: 28px;">📅 ${urgency.label}</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
      
      <div style="background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center;">
        <p style="font-size: 64px; font-weight: bold; color: ${urgency.bg}; margin: 0;">${daysLeft}</p>
        <p style="font-size: 18px; color: #6b7280; margin: 5px 0 0 0;">dni do egzaminu</p>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0;">
        <div style="background: #f0f4ff; border-radius: 8px; padding: 15px; text-align: center;">
          <p style="font-size: 24px; font-weight: bold; color: #667eea; margin: 0;">${stats.exercisesTotal}</p>
          <p style="font-size: 13px; color: #6b7280; margin: 5px 0 0 0;">Zadań rozwiązanych</p>
        </div>
        <div style="background: #f0fdf4; border-radius: 8px; padding: 15px; text-align: center;">
          <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">${stats.avgScore}%</p>
          <p style="font-size: 13px; color: #6b7280; margin: 5px 0 0 0;">Średni wynik</p>
        </div>
      </div>
      
      ${premiumCTA}
      
      <center>
        <a href="${FRONTEND_URL}/exercises" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Ćwicz teraz →
        </a>
      </center>
    `,
    emailFooter(unsubscribeToken, "examCountdown"),
  );
}

// ============================================================
// 9. MONTHLY REPORT — Miesięczne podsumowanie (Premium)
// ============================================================
export interface MonthlyReportData {
  month: string; // np. "Marzec 2026"
  exercisesCount: number;
  avgScore: number;
  avgScoreChange: number;
  studyTimeHours: number;
  bestEpoch: string | null;
  worstEpoch: string | null;
  currentLevel: number;
  totalPoints: number;
  streakRecord: number;
}

export function monthlyReportTemplate(
  username: string,
  data: MonthlyReportData,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const epochNames: Record<string, string> = {
    ANTIQUITY: "Starożytność",
    MIDDLE_AGES: "Średniowiecze",
    RENAISSANCE: "Renesans",
    BAROQUE: "Barok",
    ENLIGHTENMENT: "Oświecenie",
    ROMANTICISM: "Romantyzm",
    POSITIVISM: "Pozytywizm",
    YOUNG_POLAND: "Młoda Polska",
    INTERWAR: "Dwudziestolecie",
    CONTEMPORARY: "Współczesność",
  };

  return emailWrapper(
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    `<h1 style="margin: 0; font-size: 28px;">📊 Raport za ${data.month}</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
      <p>Oto Twoje osiągnięcia z ostatniego miesiąca:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0;">
        <div style="background: #f0f4ff; border-radius: 10px; padding: 18px; text-align: center;">
          <p style="font-size: 28px; font-weight: bold; color: #667eea; margin: 0;">${data.exercisesCount}</p>
          <p style="font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">Zadań rozwiązanych</p>
        </div>
        <div style="background: #f0fdf4; border-radius: 10px; padding: 18px; text-align: center;">
          <p style="font-size: 28px; font-weight: bold; color: #059669; margin: 0;">${data.avgScore}%</p>
          <p style="font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">Średni wynik ${data.avgScoreChange > 0 ? `(+${data.avgScoreChange}%)` : data.avgScoreChange < 0 ? `(${data.avgScoreChange}%)` : ""}</p>
        </div>
        <div style="background: #fef3c7; border-radius: 10px; padding: 18px; text-align: center;">
          <p style="font-size: 28px; font-weight: bold; color: #d97706; margin: 0;">${data.studyTimeHours}h</p>
          <p style="font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">Czas nauki</p>
        </div>
        <div style="background: #fce4ec; border-radius: 10px; padding: 18px; text-align: center;">
          <p style="font-size: 28px; font-weight: bold; color: #ea580c; margin: 0;">Lv.${data.currentLevel}</p>
          <p style="font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">${data.totalPoints} pkt</p>
        </div>
      </div>
      
      ${
        data.bestEpoch
          ? `
      <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin: 15px 0;">
        <p style="margin: 0; font-size: 14px;">
          💪 <strong>Najlepsza epoka:</strong> ${epochNames[data.bestEpoch] || data.bestEpoch}
          ${data.worstEpoch ? ` &nbsp;|&nbsp; 📚 <strong>Do poprawy:</strong> ${epochNames[data.worstEpoch] || data.worstEpoch}` : ""}
        </p>
      </div>`
          : ""
      }
      
      <center>
        <a href="${FRONTEND_URL}/dashboard" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Zobacz pełne statystyki →
        </a>
      </center>
    `,
    emailFooter(unsubscribeToken, "weeklySummary"),
  );
}

// ============================================================
// 10. ESSAY REMINDER — "Dawno nie pisałeś wypracowania"
// ============================================================
export function essayReminderTemplate(
  username: string,
  daysSinceLastEssay: number,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return emailWrapper(
    "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    `<h1 style="margin: 0; font-size: 28px;">✍️ Czas na wypracowanie!</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
      
      <p style="font-size: 16px;">Ostatnie wypracowanie pisałeś <strong>${daysSinceLastEssay} dni temu</strong>. Pisanie to kluczowa umiejętność na maturze — ćwicz regularnie!</p>
      
      <div style="background: #f5f3ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #6d28d9;">Dlaczego warto pisać regularnie?</p>
        <ul style="margin: 0; padding-left: 20px; color: #6b7280; line-height: 1.8;">
          <li>AI oceni Twoje wypracowanie w 30 sekund</li>
          <li>Dostaniesz feedback wg kryteriów CKE</li>
          <li>Każde kolejne wypracowanie jest lepsze</li>
        </ul>
      </div>
      
      <center>
        <a href="${FRONTEND_URL}/exercises" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
          Napisz wypracowanie →
        </a>
      </center>
    `,
    emailFooter(unsubscribeToken, "streakReminders"),
  );
}

// ============================================================
// 11. GENTLE RE-ENGAGEMENT — 60 dni, łagodniejszy ton
// ============================================================
export function gentleReengagementTemplate(
  username: string,
  _daysInactive: number,
  isPremium: boolean,
  unsubscribeToken: string,
  lastEpoch?: string | null,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const epochNames: Record<string, string> = {
    ANTIQUITY: "starożytności",
    MIDDLE_AGES: "średniowiecza",
    RENAISSANCE: "renesansu",
    BAROQUE: "baroku",
    ENLIGHTENMENT: "oświecenia",
    ROMANTICISM: "romantyzmu",
    POSITIVISM: "pozytywizmu",
    YOUNG_POLAND: "Młodej Polski",
    INTERWAR: "dwudziestolecia międzywojennego",
    CONTEMPORARY: "współczesności",
  };

  const epochText =
    lastEpoch && epochNames[lastEpoch]
      ? `Ostatnio pracowałeś nad zagadnieniami z ${epochNames[lastEpoch]}.`
      : "";

  const premiumCTA = !isPremium
    ? `
      <div style="background: #f0f4ff; border-radius: 10px; padding: 18px; margin: 20px 0; text-align: center;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #667eea; font-weight: bold;">Pełny dostęp za 39 zł/mies</p>
        <a href="${FRONTEND_URL}/subscription" style="color: #667eea; font-size: 14px; text-decoration: underline;">Sprawdź Premium →</a>
      </div>`
    : "";

  return emailWrapper(
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    `<h1 style="margin: 0; font-size: 24px;">📚 Twoje konto nadal czeka</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}</h2>
      
      <p style="font-size: 16px; color: #4b5563;">
        Nie chcemy Ci przeszkadzać — wiemy, że życie bywa zajęte. 
        Chcieliśmy tylko przypomnieć, że Twoje konto i wszystkie postępy 
        nadal na Ciebie czekają.
      </p>
      
      ${epochText ? `<p style="font-size: 14px; color: #6b7280;">${epochText}</p>` : ""}
      
      <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">
          Wystarczy 5 minut żeby wrócić do nauki. Bez presji, w swoim tempie.
        </p>
      </div>
      
      ${premiumCTA}
      
      <center>
        <a href="${FRONTEND_URL}/dashboard" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; margin: 15px 0;">
          Wróć do nauki →
        </a>
      </center>
      
      <p style="color: #9ca3af; font-size: 13px; margin-top: 25px; text-align: center;">
        Jeśli nie planujesz wracać, nic się nie stanie — nie będziemy już pisać tak często.
      </p>
    `,
    emailFooter(unsubscribeToken, "reengagement"),
  );
}

// ============================================================
// 12. FAREWELL — 90-180 dni, pożegnanie
// Ostatni mail. Po nim wyłączamy re-engagement dla tego usera.
// ============================================================
export function farewellTemplate(
  username: string,
  _daysInactive: number,
  isPremium: boolean,
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return emailWrapper(
    "linear-gradient(135deg, #64748b 0%, #475569 100%)",
    `<h1 style="margin: 0; font-size: 24px;">💙 Żegnamy się (na razie)</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}</h2>
      
      <p style="font-size: 16px; color: #4b5563;">
        Dawno Cię nie widzieliśmy i nie chcemy zaśmiecać Ci skrzynki. 
        To ostatnia wiadomość od nas — nie będziemy już wysyłać przypomnień.
      </p>
      
      <div style="background: #f1f5f9; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
        <p style="font-size: 40px; margin: 0 0 10px 0;">💙</p>
        <p style="font-size: 16px; color: #475569; margin: 0 0 10px 0; font-weight: bold;">
          Twoje konto i postępy są bezpiecznie zapisane
        </p>
        <p style="font-size: 14px; color: #64748b; margin: 0;">
          Jeśli kiedykolwiek zechcesz wrócić — wystarczy się zalogować.
          Wszystko będzie dokładnie tak, jak zostawiłeś.
        </p>
      </div>
      
      ${
        !isPremium
          ? `
      <div style="background: #eff6ff; border-radius: 10px; padding: 18px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #3b82f6;">
          💡 Gdybyś wrócił z Premium (39 zł/mies), masz dostęp do AI oceniającego 
          wypracowania, powtórek z epok i nieograniczonych pytań.
        </p>
      </div>`
          : ""
      }
      
      <center>
        <a href="${FRONTEND_URL}/dashboard" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; margin: 15px 0;">
          Wróć kiedy chcesz →
        </a>
      </center>
      
      <p style="color: #9ca3af; font-size: 13px; margin-top: 25px; text-align: center;">
        Nie będziemy już wysyłać przypomnień. Jeśli zmienisz zdanie, 
        <a href="${FRONTEND_URL}/wypisz-sie?token=${unsubscribeToken}&manage=true" style="color: #9ca3af;">możesz włączyć je ponownie</a>.
      </p>
      
      <p style="color: #9ca3af; font-size: 13px; text-align: center;">
        Dziękujemy, że byłeś z nami. Powodzenia na maturze! 🎓
      </p>
    `,
    emailFooter(unsubscribeToken, "reengagement"),
  );
}

// ============================================================
// 13. GLOBAL MATURA COUNTDOWN — stałe daty kalendarza
// Warianty: month (5 kwi), twoWeeks (20 kwi), final (4 maja)
// NIE podajemy konkretnych dat egzaminu!
// ============================================================
export function globalMaturaCountdownTemplate(
  username: string,
  variant: "month" | "twoWeeks" | "final",
  isPremium: boolean,
  stats: { exercisesTotal: number; avgScore: number },
  unsubscribeToken: string,
): string {
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  // ---- Wariant: za miesiąc ----
  if (variant === "month") {
    return emailWrapper(
      "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
      `<h1 style="margin: 0; font-size: 28px;">🎓 Matura z polskiego już za miesiąc!</h1>`,
      `
        <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
        
        <p style="font-size: 16px;">
          Zostało niewiele czasu. Miesiąc to wciąż sporo — wystarczy, 
          żeby solidnie powtórzyć materiał i poczuć się pewnie na egzaminie.
        </p>
        
        <div style="background: #fff7ed; border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
          <p style="font-size: 48px; margin: 0 0 5px 0;">📅</p>
          <p style="font-size: 28px; font-weight: bold; color: #ea580c; margin: 0 0 5px 0;">Około miesiąca</p>
          <p style="margin: 0; color: #92400e; font-size: 14px;">do egzaminu maturalnego z języka polskiego</p>
        </div>
        
        ${
          stats.exercisesTotal > 0
            ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0;">
          <div style="background: #f0f4ff; border-radius: 8px; padding: 15px; text-align: center;">
            <p style="font-size: 24px; font-weight: bold; color: #667eea; margin: 0;">${stats.exercisesTotal}</p>
            <p style="font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">Zadań za Tobą</p>
          </div>
          <div style="background: #f0fdf4; border-radius: 8px; padding: 15px; text-align: center;">
            <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">${stats.avgScore}%</p>
            <p style="font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">Średni wynik</p>
          </div>
        </div>`
            : `
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px 20px; margin: 20px 0;">
          <p style="margin: 0; color: #991b1b; font-size: 15px;">
            <strong>Jeszcze nie zacząłeś!</strong> Miesiąc to wciąż dużo czasu — zacznij dziś.
          </p>
        </div>`
        }
        
        <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 12px 0; font-weight: bold;">📋 Plan na ostatni miesiąc:</p>
          <p style="margin: 0 0 8px 0; color: #4b5563;">🔹 Tydzień 1-2: Powtórz najsłabsze epoki i lektury</p>
          <p style="margin: 0 0 8px 0; color: #4b5563;">🔹 Tydzień 3: Rozwiązuj pełne arkusze maturalne</p>
          <p style="margin: 0; color: #4b5563;">🔹 Tydzień 4: Napisz 2-3 wypracowania z AI feedbackiem</p>
        </div>
        
        ${
          !isPremium
            ? `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="margin: 0 0 10px 0; font-weight: bold;">🚀 Ostatnia szansa na Premium przed maturą!</p>
          <p style="margin: 0 0 15px 0; font-size: 14px;">Nieograniczone pytania + AI ocena wypracowań + powtórki z epok</p>
          <a href="${FRONTEND_URL}/subscription" style="display: inline-block; padding: 10px 30px; background: white; color: #667eea; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Aktywuj Premium — 39 zł
          </a>
        </div>`
            : ""
        }
        
        <center>
          <a href="${FRONTEND_URL}/exercises" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 15px 0;">
            Zacznij powtórki →
          </a>
        </center>
      `,
      emailFooter(unsubscribeToken, "examCountdown"),
    );
  }

  // ---- Wariant: za 2 tygodnie ----
  if (variant === "twoWeeks") {
    return emailWrapper(
      "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
      `<h1 style="margin: 0; font-size: 28px;">⏰ Matura z polskiego za 2 tygodnie!</h1>`,
      `
        <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
        
        <p style="font-size: 16px;">
          Dwa tygodnie — to wystarczająco dużo, żeby jeszcze zrobić różnicę. 
          Skup się na swoich słabszych stronach i przećwicz format egzaminu.
        </p>
        
        <div style="background: #fef2f2; border: 2px solid #dc2626; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
          <p style="font-size: 48px; margin: 0 0 5px 0;">⏰</p>
          <p style="font-size: 28px; font-weight: bold; color: #dc2626; margin: 0 0 5px 0;">~2 tygodnie</p>
          <p style="margin: 0; color: #991b1b; font-size: 14px;">do egzaminu maturalnego z języka polskiego</p>
        </div>
        
        <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 12px 0; font-weight: bold;">🎯 Na co się skupić:</p>
          <p style="margin: 0 0 8px 0; color: #4b5563;">🔹 Przećwicz format — rozwiąż minimum 2 pełne arkusze</p>
          <p style="margin: 0 0 8px 0; color: #4b5563;">🔹 Powtórz lektury obowiązkowe — bohaterowie, motywy, cytaty</p>
          <p style="margin: 0; color: #4b5563;">🔹 Napisz jedno wypracowanie i przeczytaj feedback AI</p>
        </div>
        
        ${
          stats.exercisesTotal > 0
            ? `
        <p style="font-size: 14px; color: #6b7280; text-align: center;">
          Do tej pory rozwiązałeś <strong>${stats.exercisesTotal} zadań</strong> ze średnim wynikiem <strong>${stats.avgScore}%</strong>. 
          ${stats.avgScore >= 70 ? "Świetnie — utrzymaj tempo!" : "Każde kolejne pytanie Cię przybliża do celu!"}
        </p>`
            : ""
        }
        
        ${
          !isPremium
            ? `
        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px 20px; margin: 20px 0;">
          <p style="margin: 0; color: #991b1b; font-size: 14px;">
            <strong>⚠️ 2 tygodnie do matury, a jeszcze na planie Free?</strong> 
            Z Premium piszesz wypracowania z AI feedbackiem i ćwiczysz konkretne epoki.
            <a href="${FRONTEND_URL}/subscription" style="color: #667eea; font-weight: bold;">Aktywuj teraz →</a>
          </p>
        </div>`
            : ""
        }
        
        <center>
          <a href="${FRONTEND_URL}/exercises" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 15px 0;">
            Ćwicz teraz →
          </a>
        </center>
      `,
      emailFooter(unsubscribeToken, "examCountdown"),
    );
  }

  // ---- Wariant: tuż, tuż (4 maja) ----
  return emailWrapper(
    "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    `<h1 style="margin: 0; font-size: 28px;">🔥 Matura tuż, tuż!</h1>`,
    `
      <h2 style="margin: 0 0 20px 0;">Cześć, ${displayName}!</h2>
      
      <p style="font-size: 16px;">
        To już! Za kilka dni siadasz do arkusza maturalnego z polskiego. 
        Dasz radę — przygotowałeś się, ile mogłeś.
      </p>
      
      <div style="background: #fef2f2; border: 3px solid #dc2626; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
        <p style="font-size: 48px; margin: 0 0 10px 0;">🔥</p>
        <p style="font-size: 22px; font-weight: bold; color: #dc2626; margin: 0 0 8px 0;">Ostatni sprint!</p>
        <p style="margin: 0; color: #991b1b; font-size: 14px;">Egzamin maturalny z polskiego jest tuż za rogiem</p>
      </div>
      
      <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin: 20px 0;">
        <p style="margin: 0 0 12px 0; font-weight: bold;">💡 Porady na ostatnie dni:</p>
        <p style="margin: 0 0 8px 0; color: #4b5563;">✅ Nie ucz się nowego materiału — powtarzaj to, co znasz</p>
        <p style="margin: 0 0 8px 0; color: #4b5563;">✅ Przejrzyj lektury obowiązkowe — streszczenia i bohaterowie</p>
        <p style="margin: 0 0 8px 0; color: #4b5563;">✅ Rozwiąż kilka zadań na rozgrzewkę — nie na noc przed</p>
        <p style="margin: 0 0 8px 0; color: #4b5563;">✅ Wyśpij się — zmęczony mózg nie pisze dobrych wypracowań</p>
        <p style="margin: 0; color: #4b5563;">✅ Zaufaj sobie — umiesz więcej, niż Ci się wydaje</p>
      </div>
      
      ${
        stats.exercisesTotal > 0
          ? `
      <div style="background: #f0fdf4; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="margin: 0 0 5px 0; font-size: 14px; color: #065f46;">Do tej pory rozwiązałeś</p>
        <p style="margin: 0; font-size: 32px; font-weight: bold; color: #059669;">${stats.exercisesTotal} zadań</p>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #065f46;">To imponujące! Ta praca się opłaci.</p>
      </div>`
          : ""
      }
      
      <center>
        <a href="${FRONTEND_URL}/exercises" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 15px 0;">
          Ostatnia rozgrzewka →
        </a>
      </center>
      
      <p style="text-align: center; font-size: 16px; margin-top: 20px;">
        Trzymamy kciuki! 🤞 Dasz radę! 🎓
      </p>
    `,
    emailFooter(unsubscribeToken, "examCountdown"),
  );
}
