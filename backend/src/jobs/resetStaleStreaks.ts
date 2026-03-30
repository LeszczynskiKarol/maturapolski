// backend/src/jobs/resetStaleStreaks.ts
// Uruchamiany codziennie o 00:05 — resetuje passę użytkowników,
// którzy nie ćwiczyli wczoraj (ani dziś).

import { prisma } from "../lib/prisma";

export async function resetStaleStreaks(): Promise<number> {
  console.log("\n========================================");
  console.log("🔄 RESET STALE STREAKS — " + new Date().toISOString());
  console.log("========================================");

  // Znajdź userów z passą > 0
  const usersWithStreak = await prisma.userProfile.findMany({
    where: { studyStreak: { gt: 0 } },
    select: { userId: true, studyStreak: true },
  });

  if (usersWithStreak.length === 0) {
    console.log("  No users with active streaks");
    return 0;
  }

  console.log(`  Found ${usersWithStreak.length} users with active streaks`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let resetCount = 0;

  for (const profile of usersWithStreak) {
    // Sprawdź czy user ćwiczył DZIŚ lub WCZORAJ
    const recentActivity = await prisma.dailyProgress.findFirst({
      where: {
        userId: profile.userId,
        date: { gte: yesterday },
        exercisesCount: { gt: 0 },
      },
    });

    if (!recentActivity) {
      // Brak aktywności wczoraj ani dziś → resetuj passę
      await prisma.userProfile.update({
        where: { userId: profile.userId },
        data: { studyStreak: 0 },
      });

      console.log(
        `  ❌ Reset streak for user ${profile.userId}: ${profile.studyStreak} → 0`,
      );
      resetCount++;
    }
  }

  console.log(
    `\n✅ Reset ${resetCount} stale streaks out of ${usersWithStreak.length}`,
  );
  return resetCount;
}
