// backend/src/services/engagementMailerService.ts

import { prisma } from "../lib/prisma";
import { transporter } from "../config/mailer.config";
import {
  emailPreferenceService,
  EmailCategory,
} from "./emailPreferenceService";
import {
  streakReminderTemplate,
  streakMilestoneTemplate,
  weeklySummaryTemplate,
  WeeklySummaryData,
  reengagementTemplate,
  firstDayActivationTemplate,
  freeLimitHitTemplate,
  levelUnlockTemplate,
  examCountdownTemplate,
  essayReminderTemplate,
  monthlyReportTemplate,
  MonthlyReportData,
  farewellTemplate,
  gentleReengagementTemplate,
  globalMaturaCountdownTemplate,
} from "./engagementEmailTemplates";

const FROM = `${process.env.EMAIL_FROM_NAME || "MaturaPolski.pl"} <${process.env.EMAIL_FROM || "noreply@maturapolski.pl"}>`;

// Ile dni max wstecz sprawdzamy EmailLog (żeby nie wysłać 2x)
const COOLDOWNS: Record<string, number> = {
  STREAK_REMINDER: 1, // max 1x dziennie
  STREAK_MILESTONE_3: 999, // jednorazowo
  STREAK_MILESTONE_7: 999,
  STREAK_MILESTONE_14: 999,
  STREAK_MILESTONE_30: 999,
  WEEKLY_SUMMARY: 6, // max 1x na 7 dni
  REENGAGEMENT_7D: 7, // max 1x na 7 dni
  REENGAGEMENT_14D: 14,
  REENGAGEMENT_30D: 30,
  REENGAGEMENT_60D: 60,
  REENGAGEMENT_90D: 90,
  REENGAGEMENT_FAREWELL: 999,
  MATURA_GLOBAL_30D: 999,
  MATURA_GLOBAL_14D: 999,
  MATURA_GLOBAL_FINAL: 999,
  FIRST_DAY_ACTIVATION: 999, // jednorazowo
  FREE_LIMIT_HIT: 3, // max 1x na 3 dni
  LEVEL_UNLOCK: 1, // max 1x dziennie (dla różnych level)
  EXAM_COUNTDOWN_90: 999,
  EXAM_COUNTDOWN_60: 999,
  EXAM_COUNTDOWN_30: 999,
  EXAM_COUNTDOWN_14: 999,
  EXAM_COUNTDOWN_7: 999,
  EXAM_COUNTDOWN_3: 999,
  EXAM_COUNTDOWN_1: 999,
  ESSAY_REMINDER: 14, // max 1x na 14 dni
  MONTHLY_REPORT: 28, // max 1x na 28 dni
};

class EngagementMailerService {
  // ================================================================
  // HELPER: Sprawdź cooldown i wyślij
  // ================================================================
  private async canSend(
    userId: string,
    emailType: string,
    category: EmailCategory,
  ): Promise<boolean> {
    // 1. Sprawdź preferencje
    const wantsEmail = await emailPreferenceService.canSendEmail(
      userId,
      category,
    );
    if (!wantsEmail) {
      return false;
    }

    // 2. Sprawdź cooldown
    const cooldownDays = COOLDOWNS[emailType] || 1;
    const cutoffDate = new Date(
      Date.now() - cooldownDays * 24 * 60 * 60 * 1000,
    );

    const recentSend = await prisma.emailLog.findFirst({
      where: {
        userId,
        type: emailType,
        sentAt: { gte: cutoffDate },
      },
    });

    return !recentSend;
  }

  private async sendAndLog(
    userId: string,
    email: string,
    subject: string,
    html: string,
    emailType: string,
    metadata?: any,
  ): Promise<boolean> {
    try {
      const suppressed = await prisma.emailSuppression.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (suppressed) {
        console.log(
          `⛔ [MAIL] ${email} suppressed (${suppressed.reason}), skipping`,
        );
        return false;
      }

      await transporter.sendMail({
        from: FROM,
        to: email,
        subject,
        html,
      });

      await prisma.emailLog.create({
        data: {
          userId,
          type: emailType,
          metadata: metadata || {},
          subject,
          html,
        },
      });

      console.log(`✅ [MAIL] ${emailType} sent to ${email}`);
      return true;
    } catch (error) {
      console.error(
        `❌ [MAIL] Failed to send ${emailType} to ${email}:`,
        error,
      );
      return false;
    }
  }

  // ================================================================
  // 1. STREAK REMINDERS — codziennie o 19:00
  // ================================================================
  async sendStreakReminders(): Promise<number> {
    console.log("\n=== 🔥 STREAK REMINDERS ===");
    let sent = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Znajdź użytkowników z passą > 3 dni, którzy DZIŚ jeszcze nie ćwiczyli
    const usersWithStreak = await prisma.userProfile.findMany({
      where: {
        studyStreak: { gte: 3 },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            emailVerified: true,
          },
        },
      },
    });

    for (const profile of usersWithStreak) {
      if (!profile.user.emailVerified) continue;

      //  Sprawdź czy passa jest AKTUALNA (user ćwiczył wczoraj)
      const yesterday = new Date();
      yesterday.setHours(0, 0, 0, 0);
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayActivity = await prisma.dailyProgress.findFirst({
        where: {
          userId: profile.userId,
          date: { gte: yesterday, lt: today },
          exercisesCount: { gt: 0 },
        },
      });

      if (!yesterdayActivity) {
        // User nie ćwiczył wczoraj — passa jest nieaktualna, resetuj ją
        console.log(
          `  ⚠️ Skipping ${profile.user.email}: streak=${profile.studyStreak} but no activity yesterday — resetting`,
        );
        await prisma.userProfile.update({
          where: { userId: profile.userId },
          data: { studyStreak: 0 },
        });
        continue;
      }

      // Sprawdź czy dziś już ćwiczył
      const todayProgress = await prisma.dailyProgress.findUnique({
        where: {
          userId_date: { userId: profile.userId, date: today },
        },
      });

      if (todayProgress && todayProgress.exercisesCount > 0) continue;

      // Nie ćwiczył — wyślij reminder
      if (
        await this.canSend(profile.userId, "STREAK_REMINDER", "streakReminders")
      ) {
        const token = await emailPreferenceService.getUnsubscribeToken(
          profile.userId,
        );
        const html = streakReminderTemplate(
          profile.user.username,
          profile.studyStreak,
          token,
        );

        const success = await this.sendAndLog(
          profile.userId,
          profile.user.email,
          `🔥 Nie strać passy ${profile.studyStreak} dni! — MaturaPolski.pl`,
          html,
          "STREAK_REMINDER",
          { streak: profile.studyStreak },
        );

        if (success) sent++;
      }
    }

    console.log(`Sent ${sent} streak reminders`);
    return sent;
  }

  // ================================================================
  // 2. STREAK MILESTONES — codziennie o 10:00
  // ================================================================
  async sendStreakMilestones(): Promise<number> {
    console.log("\n=== ⭐ STREAK MILESTONES ===");
    let sent = 0;

    const milestones = [3, 7, 14, 30];

    for (const milestone of milestones) {
      const users = await prisma.userProfile.findMany({
        where: { studyStreak: milestone },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              emailVerified: true,
            },
          },
        },
      });

      for (const profile of users) {
        if (!profile.user.emailVerified) continue;

        const emailType = `STREAK_MILESTONE_${milestone}`;
        if (await this.canSend(profile.userId, emailType, "achievements")) {
          const token = await emailPreferenceService.getUnsubscribeToken(
            profile.userId,
          );
          const html = streakMilestoneTemplate(
            profile.user.username,
            milestone,
            token,
          );

          const success = await this.sendAndLog(
            profile.userId,
            profile.user.email,
            `🎉 ${milestone} dni nauki z rzędu! — MaturaPolski.pl`,
            html,
            emailType,
            { milestone },
          );

          if (success) sent++;
        }
      }
    }

    console.log(`Sent ${sent} streak milestone emails`);
    return sent;
  }

  // ================================================================
  // 3. WEEKLY SUMMARY — poniedziałek o 8:00
  // ================================================================
  async sendWeeklySummaries(): Promise<number> {
    console.log("\n=== 📊 WEEKLY SUMMARIES ===");
    let sent = 0;

    const allUsers = await prisma.user.findMany({
      where: { emailVerified: true },
      select: {
        id: true,
        email: true,
        username: true,
        profile: { select: { studyStreak: true, averageScore: true } },
        subscription: { select: { status: true, plan: true } },
      },
    });

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    for (const user of allUsers) {
      if (!(await this.canSend(user.id, "WEEKLY_SUMMARY", "weeklySummary")))
        continue;

      // Dane z tego tygodnia
      const thisWeekProgress = await prisma.dailyProgress.findMany({
        where: { userId: user.id, date: { gte: weekAgo } },
      });

      // Dane z poprzedniego tygodnia
      const lastWeekProgress = await prisma.dailyProgress.findMany({
        where: { userId: user.id, date: { gte: twoWeeksAgo, lt: weekAgo } },
      });

      const exercisesThisWeek = thisWeekProgress.reduce(
        (sum, d) => sum + d.exercisesCount,
        0,
      );
      const exercisesLastWeek = lastWeekProgress.reduce(
        (sum, d) => sum + d.exercisesCount,
        0,
      );

      // Pomiń użytkowników nieaktywnych oba tygodnie
      if (exercisesThisWeek === 0 && exercisesLastWeek === 0) continue;

      const avgScoreThisWeek =
        thisWeekProgress.length > 0
          ? Math.round(
              thisWeekProgress.reduce(
                (sum, d) => sum + (d.averageScore || 0),
                0,
              ) / thisWeekProgress.filter((d) => d.exercisesCount > 0).length ||
                1,
            )
          : 0;

      const avgScoreLastWeek =
        lastWeekProgress.length > 0
          ? Math.round(
              lastWeekProgress.reduce(
                (sum, d) => sum + (d.averageScore || 0),
                0,
              ) / lastWeekProgress.filter((d) => d.exercisesCount > 0).length ||
                1,
            )
          : 0;

      const studyTime = thisWeekProgress.reduce(
        (sum, d) => sum + (d.studyTime || 0),
        0,
      );

      // Najlepsza/najsłabsza kategoria
      const categoryStats = await this.getUserCategoryStats(user.id);
      const sorted = Object.entries(categoryStats).sort(
        ([, a], [, b]) => b - a,
      );

      const isPremium =
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan === "PREMIUM";

      const data: WeeklySummaryData = {
        exercisesThisWeek,
        exercisesLastWeek,
        avgScoreThisWeek,
        avgScoreLastWeek,
        studyTimeMinutes: studyTime,
        currentStreak: user.profile?.studyStreak || 0,
        weakestCategory:
          sorted.length > 0 ? sorted[sorted.length - 1][0] : null,
        strongestCategory: sorted.length > 0 ? sorted[0][0] : null,
        isPremium,
      };

      const token = await emailPreferenceService.getUnsubscribeToken(user.id);
      const html = weeklySummaryTemplate(user.username, data, token);

      const success = await this.sendAndLog(
        user.id,
        user.email,
        `📊 Twój tydzień: ${exercisesThisWeek} zadań, ${avgScoreThisWeek}% — MaturaPolski.pl`,
        html,
        "WEEKLY_SUMMARY",
        data,
      );

      if (success) sent++;
    }

    console.log(`Sent ${sent} weekly summaries`);
    return sent;
  }

  // ================================================================
  // 4. RE-ENGAGEMENT — codziennie o 10:00
  // ================================================================
  async sendReengagementEmails(): Promise<number> {
    console.log("\n=== 👋 RE-ENGAGEMENT (progressive) ===");
    let sent = 0;

    // Progi — im dłuższa nieaktywność, tym rzadziej piszemy
    // Po 90 dniach — pożegnalny mail i KONIEC
    const thresholds = [
      { days: 7, type: "REENGAGEMENT_7D", category: "reengagement" as const },
      { days: 14, type: "REENGAGEMENT_14D", category: "reengagement" as const },
      { days: 30, type: "REENGAGEMENT_30D", category: "reengagement" as const },
      { days: 60, type: "REENGAGEMENT_60D", category: "reengagement" as const },
      { days: 90, type: "REENGAGEMENT_90D", category: "reengagement" as const },
    ];

    for (const threshold of thresholds) {
      const cutoff = new Date(
        Date.now() - threshold.days * 24 * 60 * 60 * 1000,
      );
      const cutoffUpper = new Date(
        Date.now() - (threshold.days - 1) * 24 * 60 * 60 * 1000,
      );

      const inactiveUsers = await prisma.user.findMany({
        where: {
          emailVerified: true,
          lastActiveAt: {
            gte: cutoff,
            lt: cutoffUpper,
          },
        },
        select: {
          id: true,
          email: true,
          username: true,
          subscription: { select: { status: true, plan: true } },
        },
      });

      for (const user of inactiveUsers) {
        if (!(await this.canSend(user.id, threshold.type, threshold.category)))
          continue;

        // SPRAWDŹ: czy poprzednie re-engagement maile zostały zignorowane
        // Jeśli wysłaliśmy 7D i 14D, a user nadal nie wrócił — to 30D jest zasadne
        // Ale jeśli mamy 60D i user nie wrócił po 30D — wyślij rzadszy wariant
        const wasRecentlyActive = await this.userLoggedInAfterEmail(
          user.id,
          threshold.days,
        );
        if (wasRecentlyActive) continue; // Wrócił i znów odpadł — obsłuży go niższy próg

        const lastSubmission = await prisma.submission.findFirst({
          where: { userId: user.id },
          include: { exercise: { select: { epoch: true } } },
          orderBy: { createdAt: "desc" },
        });

        const isPremium =
          user.subscription?.status === "ACTIVE" &&
          user.subscription?.plan === "PREMIUM";

        const token = await emailPreferenceService.getUnsubscribeToken(user.id);

        // Różne szablony w zależności od poziomu disengagement
        let html: string;
        let subject: string;

        if (threshold.days >= 90) {
          // POŻEGNALNY — ostatnia wiadomość
          html = farewellTemplate(
            user.username,
            threshold.days,
            isPremium,
            token,
          );
          subject = "Żegnamy się (na razie) 💙 — MaturaPolski.pl";
        } else if (threshold.days >= 60) {
          // ŁAGODNY — mniej nachalny
          html = gentleReengagementTemplate(
            user.username,
            threshold.days,
            isPremium,
            token,
            lastSubmission?.exercise?.epoch || null,
          );
          subject = `📚 Twoje konto nadal czeka — MaturaPolski.pl`;
        } else {
          // STANDARDOWY (7, 14, 30 dni)
          html = reengagementTemplate(
            user.username,
            threshold.days,
            isPremium,
            token,
            lastSubmission?.exercise?.epoch || null,
          );
          subject =
            threshold.days >= 30
              ? `😢 Tęsknimy za Tobą! — MaturaPolski.pl`
              : threshold.days >= 14
                ? `⏰ Matura nie czeka! Nie widzieliśmy Cię ${threshold.days} dni`
                : `👋 Hej, dawno Cię nie było! — MaturaPolski.pl`;
        }

        const success = await this.sendAndLog(
          user.id,
          user.email,
          subject,
          html,
          threshold.type,
          { daysInactive: threshold.days },
        );

        if (success) sent++;
      }
    }

    // POŻEGNANIE — 180 dni nieaktywności, ostatni mail ever
    sent += await this.sendFarewellEmails();

    console.log(`Sent ${sent} re-engagement emails (progressive)`);
    return sent;
  }

  // Osobna metoda dla farewell (180 dni)
  private async sendFarewellEmails(): Promise<number> {
    let sent = 0;

    const cutoff = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);
    const cutoffUpper = new Date(Date.now() - 179 * 24 * 60 * 60 * 1000);

    const inactiveUsers = await prisma.user.findMany({
      where: {
        emailVerified: true,
        lastActiveAt: {
          gte: cutoff,
          lt: cutoffUpper,
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        subscription: { select: { status: true, plan: true } },
      },
    });

    for (const user of inactiveUsers) {
      if (
        !(await this.canSend(user.id, "REENGAGEMENT_FAREWELL", "reengagement"))
      )
        continue;

      const isPremium =
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan === "PREMIUM";

      const token = await emailPreferenceService.getUnsubscribeToken(user.id);
      const html = farewellTemplate(user.username, 180, isPremium, token);

      const success = await this.sendAndLog(
        user.id,
        user.email,
        "Żegnamy się (na razie) 💙 — MaturaPolski.pl",
        html,
        "REENGAGEMENT_FAREWELL",
        { daysInactive: 180 },
      );

      if (success) {
        sent++;
        // Po farewell — wyłącz re-engagement maile (żeby nie spamować)
        await prisma.emailPreference.updateMany({
          where: { userId: user.id },
          data: { reengagement: false },
        });
        console.log(
          `  📪 Disabled re-engagement for ${user.email} after farewell`,
        );
      }
    }

    return sent;
  }

  // Helper: czy user się zalogował po wysłanym mailu X dni temu?
  private async userLoggedInAfterEmail(
    userId: string,
    daysThreshold: number,
  ): Promise<boolean> {
    // Sprawdź czy user miał jakąkolwiek aktywność pomiędzy
    // poprzednim progiem a obecnym
    const previousThreshold =
      daysThreshold === 14
        ? 7
        : daysThreshold === 30
          ? 14
          : daysThreshold === 60
            ? 30
            : daysThreshold === 90
              ? 60
              : null;

    if (!previousThreshold) return false;

    // Sprawdź czy między tymi datami user się logował
    const from = new Date(Date.now() - daysThreshold * 24 * 60 * 60 * 1000);
    const to = new Date(Date.now() - previousThreshold * 24 * 60 * 60 * 1000);

    const activity = await prisma.dailyProgress.findFirst({
      where: {
        userId,
        date: { gte: from, lte: to },
        exercisesCount: { gt: 0 },
      },
    });

    return !!activity;
  }

  // ================================================================
  // 5. FIRST DAY ACTIVATION — 24h po rejestracji, 0 zadań
  // ================================================================
  async sendFirstDayActivations(): Promise<number> {
    console.log("\n=== 🚀 FIRST DAY ACTIVATION ===");
    let sent = 0;

    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const dayBeforeYesterday = new Date(Date.now() - 48 * 60 * 60 * 1000);

    // Użytkownicy zarejestrowani 24-48h temu
    const newUsers = await prisma.user.findMany({
      where: {
        emailVerified: true,
        createdAt: {
          gte: dayBeforeYesterday,
          lt: yesterday,
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        subscription: { select: { status: true, plan: true } },
      },
    });

    for (const user of newUsers) {
      // Sprawdź czy miał jakiekolwiek submissions
      const submissionCount = await prisma.submission.count({
        where: { userId: user.id },
      });

      if (submissionCount > 0) continue; // Już aktywny

      if (
        !(await this.canSend(user.id, "FIRST_DAY_ACTIVATION", "reengagement"))
      )
        continue;

      const isPremium =
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan === "PREMIUM";

      const token = await emailPreferenceService.getUnsubscribeToken(user.id);
      const html = firstDayActivationTemplate(user.username, isPremium, token);

      const success = await this.sendAndLog(
        user.id,
        user.email,
        "🚀 Czas na pierwszą sesję! — MaturaPolski.pl",
        html,
        "FIRST_DAY_ACTIVATION",
      );

      if (success) sent++;
    }

    console.log(`Sent ${sent} first day activations`);
    return sent;
  }

  // ================================================================
  // 6. EXAM COUNTDOWN — sprawdza daty egzaminu
  // ================================================================
  async sendExamCountdowns(): Promise<number> {
    console.log("\n=== 📅 EXAM COUNTDOWN ===");
    let sent = 0;

    const countdowns = [90, 60, 30, 14, 7, 3, 1];

    const profiles = await prisma.userProfile.findMany({
      where: {
        examDate: { not: null, gt: new Date() },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            emailVerified: true,
            subscription: { select: { status: true, plan: true } },
          },
        },
      },
    });

    for (const profile of profiles) {
      if (!profile.user.emailVerified || !profile.examDate) continue;

      const daysLeft = Math.ceil(
        (profile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      );

      // Sprawdź czy pasuje do któregoś progu
      const matchingCountdown = countdowns.find((c) => daysLeft === c);
      if (!matchingCountdown) continue;

      const emailType = `EXAM_COUNTDOWN_${matchingCountdown}`;
      if (!(await this.canSend(profile.userId, emailType, "examCountdown")))
        continue;

      // Zbierz statystyki
      const submissionCount = await prisma.submission.count({
        where: { userId: profile.userId },
      });

      const isPremium =
        profile.user.subscription?.status === "ACTIVE" &&
        profile.user.subscription?.plan === "PREMIUM";

      const token = await emailPreferenceService.getUnsubscribeToken(
        profile.userId,
      );
      const html = examCountdownTemplate(
        profile.user.username,
        daysLeft,
        isPremium,
        {
          exercisesTotal: submissionCount,
          avgScore: Math.round(profile.averageScore || 0),
        },
        token,
      );

      const success = await this.sendAndLog(
        profile.userId,
        profile.user.email,
        `📅 Do matury zostało ${daysLeft} ${daysLeft === 1 ? "dzień" : "dni"}! — MaturaPolski.pl`,
        html,
        emailType,
        { daysLeft },
      );

      if (success) sent++;
    }

    console.log(`Sent ${sent} exam countdowns`);
    return sent;
  }

  // ================================================================
  // 7. ESSAY REMINDER — co 14 dni dla Premium
  // ================================================================
  async sendEssayReminders(): Promise<number> {
    console.log("\n=== ✍️ ESSAY REMINDERS ===");
    let sent = 0;

    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    // Znajdź Premium userów
    const premiumUsers = await prisma.subscription.findMany({
      where: { status: "ACTIVE", plan: "PREMIUM" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            emailVerified: true,
          },
        },
      },
    });

    for (const sub of premiumUsers) {
      if (!sub.user.emailVerified) continue;

      // Sprawdź ostatnie wypracowanie
      const lastEssay = await prisma.submission.findFirst({
        where: {
          userId: sub.userId,
          exercise: { type: "ESSAY" },
        },
        orderBy: { createdAt: "desc" },
      });

      if (!lastEssay) continue; // Nigdy nie pisał — to inny flow
      if (lastEssay.createdAt > fourteenDaysAgo) continue; // Pisał niedawno

      const daysSince = Math.floor(
        (Date.now() - lastEssay.createdAt.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (
        !(await this.canSend(sub.userId, "ESSAY_REMINDER", "streakReminders"))
      )
        continue;

      const token = await emailPreferenceService.getUnsubscribeToken(
        sub.userId,
      );
      const html = essayReminderTemplate(sub.user.username, daysSince, token);

      const success = await this.sendAndLog(
        sub.userId,
        sub.user.email,
        `✍️ Czas na wypracowanie! Ostatnie pisałeś ${daysSince} dni temu`,
        html,
        "ESSAY_REMINDER",
        { daysSince },
      );

      if (success) sent++;
    }

    console.log(`Sent ${sent} essay reminders`);
    return sent;
  }

  // ================================================================
  // 8. MONTHLY REPORT — 1. dzień miesiąca
  // ================================================================
  async sendMonthlyReports(): Promise<number> {
    console.log("\n=== 📊 MONTHLY REPORTS ===");
    let sent = 0;

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const prevMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      0,
      23,
      59,
      59,
    );

    const monthNames = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    const monthName = `${monthNames[monthStart.getMonth()]} ${monthStart.getFullYear()}`;

    const activeUsers = await prisma.user.findMany({
      where: {
        emailVerified: true,
        submissions: {
          some: {
            createdAt: { gte: monthStart, lte: monthEnd },
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile: true,
      },
    });

    for (const user of activeUsers) {
      if (!(await this.canSend(user.id, "MONTHLY_REPORT", "weeklySummary")))
        continue;

      // Dane z tego miesiąca
      const thisMonthProgress = await prisma.dailyProgress.findMany({
        where: { userId: user.id, date: { gte: monthStart, lte: monthEnd } },
      });

      const exercisesCount = thisMonthProgress.reduce(
        (s, d) => s + d.exercisesCount,
        0,
      );
      const studyTime = thisMonthProgress.reduce(
        (s, d) => s + (d.studyTime || 0),
        0,
      );
      const avgScore =
        thisMonthProgress.filter((d) => d.exercisesCount > 0).length > 0
          ? Math.round(
              thisMonthProgress
                .filter((d) => d.exercisesCount > 0)
                .reduce((s, d) => s + (d.averageScore || 0), 0) /
                thisMonthProgress.filter((d) => d.exercisesCount > 0).length,
            )
          : 0;

      // Poprzedni miesiąc do porównania
      const prevMonthProgress = await prisma.dailyProgress.findMany({
        where: {
          userId: user.id,
          date: { gte: prevMonthStart, lte: prevMonthEnd },
        },
      });
      const prevAvgScore =
        prevMonthProgress.filter((d) => d.exercisesCount > 0).length > 0
          ? Math.round(
              prevMonthProgress
                .filter((d) => d.exercisesCount > 0)
                .reduce((s, d) => s + (d.averageScore || 0), 0) /
                prevMonthProgress.filter((d) => d.exercisesCount > 0).length,
            )
          : 0;

      // Epoki
      const epochStats = await this.getUserEpochStats(
        user.id,
        monthStart,
        monthEnd,
      );
      const sortedEpochs = Object.entries(epochStats).sort(
        ([, a], [, b]) => b - a,
      );

      const data: MonthlyReportData = {
        month: monthName,
        exercisesCount,
        avgScore,
        avgScoreChange: avgScore - prevAvgScore,
        studyTimeHours: Math.round(studyTime / 60),
        bestEpoch: sortedEpochs.length > 0 ? sortedEpochs[0][0] : null,
        worstEpoch:
          sortedEpochs.length > 1
            ? sortedEpochs[sortedEpochs.length - 1][0]
            : null,
        currentLevel: user.profile?.level || 1,
        totalPoints: user.profile?.totalPoints || 0,
        streakRecord: user.profile?.studyStreak || 0,
      };

      const token = await emailPreferenceService.getUnsubscribeToken(user.id);
      const html = monthlyReportTemplate(user.username, data, token);

      const success = await this.sendAndLog(
        user.id,
        user.email,
        `📊 Twój raport za ${monthName} — MaturaPolski.pl`,
        html,
        "MONTHLY_REPORT",
        data,
      );

      if (success) sent++;
    }

    console.log(`Sent ${sent} monthly reports`);
    return sent;
  }

  // ================================================================
  // EVENT-DRIVEN: Free limit hit (wywoływane z freeLimitService)
  // ================================================================
  async sendFreeLimitHitEmail(userId: string): Promise<void> {
    if (!(await this.canSend(userId, "FREE_LIMIT_HIT", "promotions"))) return;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, username: true, emailVerified: true },
    });

    if (!user || !user.emailVerified) return;

    const token = await emailPreferenceService.getUnsubscribeToken(userId);
    const html = freeLimitHitTemplate(user.username, token);

    await this.sendAndLog(
      userId,
      user.email,
      "🔒 Dzienny limit wyczerpany — odblokuj Premium! — MaturaPolski.pl",
      html,
      "FREE_LIMIT_HIT",
    );
  }

  // ================================================================
  // EVENT-DRIVEN: Level unlock (wywoływane z levelProgressService)
  // ================================================================
  async sendLevelUnlockEmail(userId: string, newLevel: number): Promise<void> {
    if (!(await this.canSend(userId, "LEVEL_UNLOCK", "achievements"))) return;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, username: true, emailVerified: true },
    });

    if (!user || !user.emailVerified) return;

    const token = await emailPreferenceService.getUnsubscribeToken(userId);
    const html = levelUnlockTemplate(user.username, newLevel, token);

    await this.sendAndLog(
      userId,
      user.email,
      `🎉 Poziom ${newLevel} odblokowany! — MaturaPolski.pl`,
      html,
      "LEVEL_UNLOCK",
      { newLevel },
    );
  }

  // ================================================================
  // HELPERS
  // ================================================================
  private async getUserCategoryStats(
    userId: string,
  ): Promise<Record<string, number>> {
    const submissions = await prisma.submission.findMany({
      where: {
        userId,
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      include: { exercise: { select: { category: true, points: true } } },
    });

    const stats: Record<string, number[]> = {};
    submissions.forEach((s) => {
      const cat = s.exercise.category;
      if (!stats[cat]) stats[cat] = [];
      stats[cat].push(((s.score || 0) / s.exercise.points) * 100);
    });

    const result: Record<string, number> = {};
    Object.entries(stats).forEach(([cat, scores]) => {
      result[cat] = Math.round(
        scores.reduce((a, b) => a + b, 0) / scores.length,
      );
    });

    return result;
  }

  private async getUserEpochStats(
    userId: string,
    from: Date,
    to: Date,
  ): Promise<Record<string, number>> {
    const submissions = await prisma.submission.findMany({
      where: {
        userId,
        createdAt: { gte: from, lte: to },
        exercise: { epoch: { not: null } },
      },
      include: { exercise: { select: { epoch: true, points: true } } },
    });

    const stats: Record<string, number[]> = {};
    submissions.forEach((s) => {
      const epoch = s.exercise.epoch!;
      if (!stats[epoch]) stats[epoch] = [];
      stats[epoch].push(((s.score || 0) / s.exercise.points) * 100);
    });

    const result: Record<string, number> = {};
    Object.entries(stats).forEach(([epoch, scores]) => {
      result[epoch] = Math.round(
        scores.reduce((a, b) => a + b, 0) / scores.length,
      );
    });

    return result;
  }

  // ========================================
  // NOWA METODA: sendGlobalMaturaCountdown()
  // Wysyła do WSZYSTKICH userów na stałe daty kalendarza
  // ========================================

  async sendGlobalMaturaCountdown(): Promise<number> {
    console.log("\n=== 🎓 GLOBAL MATURA COUNTDOWN ===");
    let sent = 0;

    const today = new Date();
    const month = today.getMonth() + 1; // 1-12
    const day = today.getDate();

    // Sprawdź czy dziś jest jeden z triggowanych dni
    // Nie podajemy KONKRETNYCH dat matury — tylko przybliżone "za miesiąc", "za 2 tygodnie"
    let emailType: string | null = null;
    let variant: "month" | "twoWeeks" | "final" | null = null;

    if (month === 4 && day === 5) {
      emailType = "MATURA_GLOBAL_30D";
      variant = "month";
    } else if (month === 4 && day === 20) {
      emailType = "MATURA_GLOBAL_14D";
      variant = "twoWeeks";
    } else if (month === 5 && day === 4) {
      emailType = "MATURA_GLOBAL_FINAL";
      variant = "final";
    }

    if (!emailType || !variant) {
      console.log("  Not a matura countdown day, skipping");
      return 0;
    }

    console.log(`  📅 Today is matura countdown day: ${variant}`);

    // Wyślij do WSZYSTKICH zweryfikowanych userów
    const allUsers = await prisma.user.findMany({
      where: { emailVerified: true },
      select: {
        id: true,
        email: true,
        username: true,
        profile: { select: { averageScore: true, totalPoints: true } },
        subscription: { select: { status: true, plan: true } },
      },
    });

    for (const user of allUsers) {
      if (!(await this.canSend(user.id, emailType, "examCountdown"))) continue;

      // Ile zadań rozwiązał łącznie
      const totalSubmissions = await prisma.submission.count({
        where: { userId: user.id },
      });

      const isPremium =
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan === "PREMIUM";

      const token = await emailPreferenceService.getUnsubscribeToken(user.id);

      const html = globalMaturaCountdownTemplate(
        user.username,
        variant,
        isPremium,
        {
          exercisesTotal: totalSubmissions,
          avgScore: Math.round(user.profile?.averageScore || 0),
        },
        token,
      );

      const subjects: Record<string, string> = {
        month: "🎓 Matura z polskiego już za miesiąc! — MaturaPolski.pl",
        twoWeeks: "⏰ Matura z polskiego za 2 tygodnie! — MaturaPolski.pl",
        final: "🔥 Matura tuż, tuż! Ostatni sprint! — MaturaPolski.pl",
      };

      const success = await this.sendAndLog(
        user.id,
        user.email,
        subjects[variant],
        html,
        emailType,
        { variant },
      );

      if (success) sent++;
    }

    console.log(`Sent ${sent} global matura countdown emails (${variant})`);
    return sent;
  }
}

export const engagementMailer = new EngagementMailerService();
