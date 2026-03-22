// backend/src/services/levelProgressService.ts

import { prisma } from "../lib/prisma";
import { engagementMailer } from "./engagementMailerService";

export class LevelProgressService {
  // Sprawdź czy użytkownik ma odblokowany poziom
  async canAccessDifficulty(
    userId: string,
    difficulty: number,
  ): Promise<boolean> {
    const progress = await this.getOrCreateProgress(userId);
    return difficulty <= progress.unlockedDifficulty;
  }

  // Pobierz lub utwórz postęp użytkownika
  async getOrCreateProgress(userId: string) {
    const progress = await prisma.userLevelProgress.upsert({
      where: { userId },
      update: {}, // Nic nie zmieniaj jeśli istnieje
      create: {
        userId,
        unlockedDifficulty: 2,
        difficulty1Points: 0,
        difficulty2Points: 0,
        difficulty3Points: 0,
        difficulty4Points: 0,
        difficulty5Points: 0,
      },
    });

    return progress;
  }

  // Zaktualizuj punkty po ukończeniu ćwiczenia
  async updateProgressAfterExercise(
    userId: string,
    difficulty: number,
    pointsEarned: number,
    wasCorrect: boolean,
  ) {
    // DEBUGOWANIE
    console.log("=== LEVEL PROGRESS UPDATE ===");
    console.log(`User: ${userId}`);
    console.log(`Exercise difficulty: ${difficulty}`);
    console.log(`Points earned: ${pointsEarned}`);
    console.log(`Was correct: ${wasCorrect}`);

    const progress = await this.getOrCreateProgress(userId);

    console.log(`Current max difficulty: ${progress.unlockedDifficulty}`);
    console.log(`Points before update:`, {
      level1: progress.difficulty1Points,
      level2: progress.difficulty2Points,
      level3: progress.difficulty3Points,
      level4: progress.difficulty4Points,
      level5: progress.difficulty5Points,
    });

    if (!wasCorrect) {
      console.log("Answer incorrect - no points added");
      return progress;
    }

    // Zaktualizuj punkty
    const updateData: any = {};
    updateData[`difficulty${difficulty}Points`] = {
      increment: pointsEarned,
    };

    const updatedProgress = await prisma.userLevelProgress.update({
      where: { userId },
      data: updateData,
    });

    console.log(`Points after update:`, {
      level1: updatedProgress.difficulty1Points,
      level2: updatedProgress.difficulty2Points,
      level3: updatedProgress.difficulty3Points,
      level4: updatedProgress.difficulty4Points,
      level5: updatedProgress.difficulty5Points,
    });

    // Sprawdź odblokowanie
    const unlockResult = await this.checkForUnlock(userId, updatedProgress);

    if (unlockResult.unlocked) {
      console.log(`🎉 UNLOCKED LEVEL ${unlockResult.newLevel}!`);
    } else {
      console.log(
        `No unlock. Progress to next level: ${this.calculateProgressToNext(
          updatedProgress,
        )}%`,
      );
    }

    return updatedProgress;
  }

  private calculateProgressToNext(progress: any): number {
    if (progress.unlockedDifficulty === 2) {
      const current = progress.difficulty1Points + progress.difficulty2Points;
      return Math.round((current / progress.pointsToUnlock3) * 100);
    } else if (progress.unlockedDifficulty === 3) {
      return Math.round(
        (progress.difficulty3Points / progress.pointsToUnlock4) * 100,
      );
    } else if (progress.unlockedDifficulty === 4) {
      return Math.round(
        (progress.difficulty4Points / progress.pointsToUnlock5) * 100,
      );
    }
    return 100;
  }

  // Sprawdź czy można odblokować nowy poziom
  private async checkForUnlock(userId: string, progress: any) {
    let shouldUnlock = false;
    let newDifficulty = progress.unlockedDifficulty;
    let notification = null;

    // Sprawdź odblokowanie poziomu 3
    if (progress.unlockedDifficulty === 2) {
      const totalBasicPoints =
        progress.difficulty1Points + progress.difficulty2Points;
      if (totalBasicPoints >= progress.pointsToUnlock3) {
        shouldUnlock = true;
        newDifficulty = 3;
        notification = {
          title: "🎉 Nowy poziom odblokowany!",
          message: "Gratulacje! Odblokowałeś poziom trudności 3 (średni)",
          type: "LEVEL_UNLOCK",
        };
      }
    }

    // Sprawdź odblokowanie poziomu 4
    else if (progress.unlockedDifficulty === 3) {
      if (progress.difficulty3Points >= progress.pointsToUnlock4) {
        shouldUnlock = true;
        newDifficulty = 4;
        notification = {
          title: "🚀 Poziom ekspert odblokowany!",
          message: "Świetnie! Odblokowałeś poziom trudności 4 (trudny)",
          type: "LEVEL_UNLOCK",
        };
      }
    }

    // Sprawdź odblokowanie poziomu 5
    else if (progress.unlockedDifficulty === 4) {
      if (progress.difficulty4Points >= progress.pointsToUnlock5) {
        shouldUnlock = true;
        newDifficulty = 5;
        notification = {
          title: "🏆 Mistrzostwo odblokowane!",
          message: "Niesamowite! Odblokowałeś najwyższy poziom trudności!",
          type: "LEVEL_UNLOCK",
        };
      }
    }

    // Jeśli odblokowano nowy poziom
    if (shouldUnlock) {
      await prisma.userLevelProgress.update({
        where: { userId },
        data: { unlockedDifficulty: newDifficulty },
      });

      // Stwórz notyfikację
      if (notification) {
        await prisma.notification.create({
          data: {
            userId,
            ...notification,
            actionUrl: "/exercises",
          },
        });
      }

      engagementMailer
        .sendLevelUnlockEmail(userId, newDifficulty)
        .catch(console.error);

      return { unlocked: true, newLevel: newDifficulty };
    }

    return { unlocked: false };
  }

  // Pobierz szczegółowy postęp
  async getDetailedProgress(userId: string) {
    const progress = await this.getOrCreateProgress(userId);

    // Oblicz procent do następnego poziomu
    let nextLevelProgress = 0;
    let nextLevelRequired = 0;
    let nextLevel = null;

    if (progress.unlockedDifficulty === 2) {
      const current = progress.difficulty1Points + progress.difficulty2Points;
      nextLevelProgress = (current / progress.pointsToUnlock3) * 100;
      nextLevelRequired = progress.pointsToUnlock3 - current;
      nextLevel = 3;
    } else if (progress.unlockedDifficulty === 3) {
      nextLevelProgress =
        (progress.difficulty3Points / progress.pointsToUnlock4) * 100;
      nextLevelRequired = progress.pointsToUnlock4 - progress.difficulty3Points;
      nextLevel = 4;
    } else if (progress.unlockedDifficulty === 4) {
      nextLevelProgress =
        (progress.difficulty4Points / progress.pointsToUnlock5) * 100;
      nextLevelRequired = progress.pointsToUnlock5 - progress.difficulty4Points;
      nextLevel = 5;
    }

    return {
      currentMaxDifficulty: progress.unlockedDifficulty,
      nextLevel,
      nextLevelProgress: Math.min(100, Math.round(nextLevelProgress)),
      pointsNeeded: Math.max(0, nextLevelRequired),
      levels: [
        {
          level: 1,
          name: "Bardzo łatwy",
          unlocked: true,
          points: progress.difficulty1Points,
          color: "green",
        },
        {
          level: 2,
          name: "Łatwy",
          unlocked: true,
          points: progress.difficulty2Points,
          color: "blue",
        },
        {
          level: 3,
          name: "Średni",
          unlocked: progress.unlockedDifficulty >= 3,
          points: progress.difficulty3Points,
          required: progress.pointsToUnlock3,
          color: "yellow",
        },
        {
          level: 4,
          name: "Trudny",
          unlocked: progress.unlockedDifficulty >= 4,
          points: progress.difficulty4Points,
          required: progress.pointsToUnlock4,
          color: "orange",
        },
        {
          level: 5,
          name: "Mistrzowski",
          unlocked: progress.unlockedDifficulty >= 5,
          points: progress.difficulty5Points,
          required: progress.pointsToUnlock5,
          color: "red",
        },
      ],
    };
  }
}
