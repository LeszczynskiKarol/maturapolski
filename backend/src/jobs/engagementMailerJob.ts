// backend/src/jobs/engagementMailerJob.ts

import { engagementMailer } from "../services/engagementMailerService";

/**
 * Uruchamiany codziennie o 10:00
 * Wysyła: aktywacje, re-engagement, milestony, countdown, monthly report
 */
export async function runMorningEmailJobs(): Promise<void> {
  console.log("\n========================================");
  console.log("⏰ MORNING EMAIL JOBS — " + new Date().toISOString());
  console.log("========================================");

  try {
    // 1. Aktywacja nowych użytkowników (24h po rejestracji)
    const activations = await engagementMailer.sendFirstDayActivations();
    console.log(`  ✓ First day activations: ${activations}`);

    // 2. Re-engagement PROGRESYWNY (7d → 14d → 30d → 60d → 90d → farewell)
    const reengagement = await engagementMailer.sendReengagementEmails();
    console.log(`  ✓ Re-engagement emails (progressive): ${reengagement}`);

    // 3. Streak milestones (3, 7, 14, 30 dni)
    const milestones = await engagementMailer.sendStreakMilestones();
    console.log(`  ✓ Streak milestones: ${milestones}`);

    // 4. Exam countdown (indywidualny — na podstawie examDate usera)
    const countdowns = await engagementMailer.sendExamCountdowns();
    console.log(`  ✓ Individual exam countdowns: ${countdowns}`);

    // 5. GLOBALNY matura countdown (5 kwi, 20 kwi, 4 maja)
    const maturaGlobal = await engagementMailer.sendGlobalMaturaCountdown();
    console.log(`  ✓ Global matura countdown: ${maturaGlobal}`);

    // 6. Essay reminders (Premium, co 14 dni)
    const essays = await engagementMailer.sendEssayReminders();
    console.log(`  ✓ Essay reminders: ${essays}`);

    const total =
      activations +
      reengagement +
      milestones +
      countdowns +
      maturaGlobal +
      essays;
    console.log(`\n✅ Morning jobs complete. Total sent: ${total}`);
  } catch (error) {
    console.error("❌ Error in morning email jobs:", error);
  }
}

/**
 * Uruchamiany codziennie o 19:00
 * Wysyła: streak reminders
 */
export async function runEveningEmailJobs(): Promise<void> {
  console.log("\n========================================");
  console.log("🌙 EVENING EMAIL JOBS — " + new Date().toISOString());
  console.log("========================================");

  try {
    const streakReminders = await engagementMailer.sendStreakReminders();
    console.log(`  ✓ Streak reminders: ${streakReminders}`);
    console.log(`\n✅ Evening jobs complete.`);
  } catch (error) {
    console.error("❌ Error in evening email jobs:", error);
  }
}

/**
 * Uruchamiany w poniedziałki o 8:00
 * Wysyła: tygodniowe podsumowania
 */
export async function runWeeklyEmailJobs(): Promise<void> {
  console.log("\n========================================");
  console.log("📊 WEEKLY EMAIL JOBS — " + new Date().toISOString());
  console.log("========================================");

  try {
    const summaries = await engagementMailer.sendWeeklySummaries();
    console.log(`  ✓ Weekly summaries: ${summaries}`);
    console.log(`\n✅ Weekly jobs complete.`);
  } catch (error) {
    console.error("❌ Error in weekly email jobs:", error);
  }
}

/**
 * Uruchamiany 1. dnia miesiąca o 9:00
 * Wysyła: miesięczne raporty
 */
export async function runMonthlyEmailJobs(): Promise<void> {
  console.log("\n========================================");
  console.log("📊 MONTHLY EMAIL JOBS — " + new Date().toISOString());
  console.log("========================================");

  try {
    const reports = await engagementMailer.sendMonthlyReports();
    console.log(`  ✓ Monthly reports: ${reports}`);
    console.log(`\n✅ Monthly jobs complete.`);
  } catch (error) {
    console.error("❌ Error in monthly email jobs:", error);
  }
}
