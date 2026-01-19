// backend/src/services/levelProgressService.ts

import { prisma } from "../lib/prisma";

export class LevelProgressService {
  // Punkty wymagane do odblokowania każdego poziomu
  private readonly UNLOCK_REQUIREMENTS = {
    3: 100, // 100 punktów z poziomów 1-2
    4: 200, // 200 punktów z poziomu 3
    5: 300, // 300 punktów z poziomu 4
  };

  // ✅ POPRAWIONE: Pobierz lub utwórz postęp użytkownika
  async getOrCreateProgress(userId: string) {
    try {
      // ✅ Najpierw sprawdź czy user istnieje
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });

      if (!userExists) {
        console.error(
          `❌ User ${userId} does not exist, cannot create level progress`,
        );
        // Zwróć domyślny obiekt zamiast null
        return {
          id: null,
          userId,
          unlockedDifficulty: 2,
          difficulty1Points: 0,
          difficulty2Points: 0,
          difficulty3Points: 0,
          difficulty4Points: 0,
          difficulty5Points: 0,
          pointsToUnlock3: 100,
          pointsToUnlock4: 200,
          pointsToUnlock5: 300,
        };
      }

      const progress = await prisma.userLevelProgress.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          unlockedDifficulty: 2,
        },
      });

      return progress;
    } catch (error) {
      console.error(
        `❌ Error in getOrCreateProgress for user ${userId}:`,
        error,
      );

      // Zwróć domyślny obiekt w przypadku błędu
      return {
        id: null,
        userId,
        unlockedDifficulty: 2,
        difficulty1Points: 0,
        difficulty2Points: 0,
        difficulty3Points: 0,
        difficulty4Points: 0,
        difficulty5Points: 0,
        pointsToUnlock3: 100,
        pointsToUnlock4: 200,
        pointsToUnlock5: 300,
      };
    }
  }

  // Dodaj punkty po ukończeniu zadania
  async addPoints(
    userId: string,
    difficulty: number,
    points: number,
    wasCorrect: boolean,
  ) {
    try {
      // Sprawdź czy user istnieje
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });

      if (!userExists) {
        console.error(`❌ User ${userId} does not exist, cannot add points`);
        return {
          levelUp: false,
          newUnlockedLevel: null,
          progress: null,
        };
      }

      const progress = await this.getOrCreateProgress(userId);

      // Jeśli nie udało się utworzyć progress (brak id)
      if (!progress.id) {
        return {
          levelUp: false,
          newUnlockedLevel: null,
          progress,
        };
      }

      // Punkty tylko za poprawne odpowiedzi
      if (!wasCorrect) {
        return {
          levelUp: false,
          newUnlockedLevel: null,
          progress,
        };
      }

      // Określ które pole aktualizować
      const fieldMap: Record<number, string> = {
        1: "difficulty1Points",
        2: "difficulty2Points",
        3: "difficulty3Points",
        4: "difficulty4Points",
        5: "difficulty5Points",
      };

      const field = fieldMap[difficulty];
      if (!field) {
        return {
          levelUp: false,
          newUnlockedLevel: null,
          progress,
        };
      }

      // Aktualizuj punkty
      const updatedProgress = await prisma.userLevelProgress.update({
        where: { userId },
        data: {
          [field]: { increment: points },
        },
      });

      // Sprawdź czy odblokowano nowy poziom
      const unlockResult = await this.checkAndUnlockNextLevel(userId);

      return {
        levelUp: unlockResult.levelUp,
        newUnlockedLevel: unlockResult.newLevel,
        progress: updatedProgress,
      };
    } catch (error) {
      console.error(`❌ Error adding points for user ${userId}:`, error);
      return {
        levelUp: false,
        newUnlockedLevel: null,
        progress: null,
      };
    }
  }

  // Sprawdź i odblokuj następny poziom
  async checkAndUnlockNextLevel(userId: string) {
    try {
      const progress = await this.getOrCreateProgress(userId);

      if (!progress.id) {
        return { levelUp: false, newLevel: null };
      }

      const currentUnlocked = progress.unlockedDifficulty;

      // Już wszystko odblokowane
      if (currentUnlocked >= 5) {
        return { levelUp: false, newLevel: null };
      }

      const nextLevel = currentUnlocked + 1;
      const requirement =
        this.UNLOCK_REQUIREMENTS[
          nextLevel as keyof typeof this.UNLOCK_REQUIREMENTS
        ];

      // Oblicz sumę punktów z wymaganych poziomów
      let earnedPoints = 0;

      if (nextLevel === 3) {
        // Do odblokowania poziomu 3: suma punktów z poziomów 1 i 2
        earnedPoints = progress.difficulty1Points + progress.difficulty2Points;
      } else if (nextLevel === 4) {
        // Do odblokowania poziomu 4: punkty z poziomu 3
        earnedPoints = progress.difficulty3Points;
      } else if (nextLevel === 5) {
        // Do odblokowania poziomu 5: punkty z poziomu 4
        earnedPoints = progress.difficulty4Points;
      }

      // Sprawdź czy spełniono wymagania
      if (earnedPoints >= requirement) {
        await prisma.userLevelProgress.update({
          where: { userId },
          data: {
            unlockedDifficulty: nextLevel,
          },
        });

        console.log(
          `🎉 User ${userId} unlocked difficulty level ${nextLevel}!`,
        );

        return { levelUp: true, newLevel: nextLevel };
      }

      return { levelUp: false, newLevel: null };
    } catch (error) {
      console.error(
        `❌ Error checking level unlock for user ${userId}:`,
        error,
      );
      return { levelUp: false, newLevel: null };
    }
  }

  // Pobierz szczegółowy postęp
  async getDetailedProgress(userId: string) {
    try {
      const progress = await this.getOrCreateProgress(userId);

      // Oblicz postęp do następnego poziomu
      const currentUnlocked = progress.unlockedDifficulty;
      let progressToNext = null;

      if (currentUnlocked < 5) {
        const nextLevel = currentUnlocked + 1;
        const requirement =
          this.UNLOCK_REQUIREMENTS[
            nextLevel as keyof typeof this.UNLOCK_REQUIREMENTS
          ];

        let earnedPoints = 0;

        if (nextLevel === 3) {
          earnedPoints =
            progress.difficulty1Points + progress.difficulty2Points;
        } else if (nextLevel === 4) {
          earnedPoints = progress.difficulty3Points;
        } else if (nextLevel === 5) {
          earnedPoints = progress.difficulty4Points;
        }

        progressToNext = {
          nextLevel,
          current: earnedPoints,
          required: requirement,
          percentage: Math.min(
            100,
            Math.round((earnedPoints / requirement) * 100),
          ),
        };
      }

      return {
        unlockedDifficulty: progress.unlockedDifficulty,
        pointsByDifficulty: {
          1: progress.difficulty1Points,
          2: progress.difficulty2Points,
          3: progress.difficulty3Points,
          4: progress.difficulty4Points,
          5: progress.difficulty5Points,
        },
        progressToNext,
        allUnlocked: currentUnlocked >= 5,
      };
    } catch (error) {
      console.error(
        `❌ Error getting detailed progress for user ${userId}:`,
        error,
      );

      // Zwróć domyślny obiekt w przypadku błędu
      return {
        unlockedDifficulty: 2,
        pointsByDifficulty: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        progressToNext: {
          nextLevel: 3,
          current: 0,
          required: 100,
          percentage: 0,
        },
        allUnlocked: false,
      };
    }
  }
}
