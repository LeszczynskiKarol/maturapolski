// backend/src/services/spacedRepetitionService.ts

import { prisma } from "../lib/prisma";

interface RepetitionData {
  exerciseId: string;
  lastSeen: Date;
  score: number | null;
  attempts: number;
  nextReview: Date;
  difficulty: number;
}

export class SpacedRepetitionService {
  // Algorytm SuperMemo-2 simplified
  private calculateNextReview(
    score: number, // 0-100%
    previousInterval: number = 1,
    easeFactor: number = 2.5
  ): { interval: number; easeFactor: number } {
    // Konwertuj score na quality (0-5)
    const quality = Math.floor((score / 100) * 5);

    let newEaseFactor = easeFactor;
    let newInterval = previousInterval;

    if (quality >= 3) {
      // Poprawna odpowiedź - zwiększ interwał
      if (previousInterval === 1) {
        newInterval = 1;
      } else if (previousInterval === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.round(previousInterval * easeFactor);
      }

      // Dostosuj ease factor
      newEaseFactor =
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
      // Niepoprawna odpowiedź - reset
      newInterval = 1;
      newEaseFactor = Math.max(1.3, easeFactor - 0.2);
    }

    // Ograniczenia
    newEaseFactor = Math.max(1.3, Math.min(2.5, newEaseFactor));
    newInterval = Math.min(365, newInterval); // Max 1 rok

    return { interval: newInterval, easeFactor: newEaseFactor };
  }

  async getNextExercise(userId: string): Promise<any> {
    // 1. Pobierz historię użytkownika
    const userHistory = await prisma.submission.findMany({
      where: { userId },
      select: {
        exerciseId: true,
        score: true,
        createdAt: true,
        exercise: {
          select: {
            id: true,
            difficulty: true,
            category: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 200, // Ostatnie 200 odpowiedzi
    });

    // 2. Zbuduj mapę ostatnich prób
    const exerciseMap = new Map<string, RepetitionData>();
    const recentExercises = new Set<string>(); // Zadania z ostatnich 3 dni
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    userHistory.forEach((submission) => {
      if (submission.createdAt > threeDaysAgo) {
        recentExercises.add(submission.exerciseId);
      }

      if (!exerciseMap.has(submission.exerciseId)) {
        exerciseMap.set(submission.exerciseId, {
          exerciseId: submission.exerciseId,
          lastSeen: submission.createdAt,
          score: submission.score,
          attempts: 1,
          nextReview: new Date(),
          difficulty: submission.exercise.difficulty,
        });
      } else {
        const data = exerciseMap.get(submission.exerciseId)!;
        data.attempts++;
        if (submission.createdAt > data.lastSeen) {
          data.lastSeen = submission.createdAt;
          data.score = submission.score;
        }
      }
    });

    // 3. Znajdź zadania do powtórki (spaced repetition)
    const now = new Date();

    // Pobierz dane spaced repetition z bazy
    const repetitionData = await prisma.spacedRepetition.findMany({
      where: {
        userId,
        nextReview: { lte: now },
      },
      orderBy: { nextReview: "asc" },
      take: 10,
    });

    // 4. Strategia wyboru zadania:
    // 40% - zadania do powtórki (jeśli są)
    // 40% - nowe zadania
    // 20% - zadania ze słabych kategorii

    const random = Math.random();
    let exercise = null;

    // Spróbuj znaleźć zadanie do powtórki (ale nie z ostatnich 3 dni)
    if (random < 0.4 && repetitionData.length > 0) {
      for (const rep of repetitionData) {
        if (!recentExercises.has(rep.exerciseId)) {
          exercise = await prisma.exercise.findUnique({
            where: { id: rep.exerciseId },
          });
          if (exercise) break;
        }
      }
    }

    // Jeśli nie znaleziono, szukaj nowego zadania
    if (!exercise && random < 0.8) {
      // Znajdź zadania których użytkownik jeszcze nie robił
      const completedIds = Array.from(exerciseMap.keys());

      exercise = await prisma.exercise.findFirst({
        where: {
          id: { notIn: completedIds },
        },
        orderBy: [{ difficulty: "asc" }, { createdAt: "desc" }],
      });
    }

    // Jeśli nadal nie ma, znajdź zadanie ze słabej kategorii
    if (!exercise) {
      // Analiza słabych kategorii
      const weakCategories = await prisma.$queryRaw<any[]>`
        SELECT 
          e.category,
          AVG(CAST(s.score AS FLOAT)) as avg_score
        FROM "Submission" s
        JOIN "Exercise" e ON s."exerciseId" = e.id
        WHERE s."userId" = ${userId} 
          AND s.score IS NOT NULL
          AND s."createdAt" > NOW() - INTERVAL '30 days'
        GROUP BY e.category
        HAVING AVG(CAST(s.score AS FLOAT)) < 70
        ORDER BY AVG(CAST(s.score AS FLOAT)) ASC
        LIMIT 3
      `;

      if (weakCategories.length > 0) {
        const weakCategory = weakCategories[0].category;

        exercise = await prisma.exercise.findFirst({
          where: {
            category: weakCategory,
            id: { notIn: Array.from(recentExercises) },
          },
          orderBy: { createdAt: "desc" },
        });
      }
    }

    // Ostatnia deska ratunku - jakiekolwiek zadanie spoza ostatnich 3 dni
    if (!exercise) {
      exercise = await prisma.exercise.findFirst({
        where: {
          id: { notIn: Array.from(recentExercises) },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    // Absolutnie ostatnia opcja - losowe zadanie
    if (!exercise) {
      const count = await prisma.exercise.count();
      const skip = Math.floor(Math.random() * count);
      exercise = await prisma.exercise.findFirst({
        skip,
        take: 1,
      });
    }

    return exercise;
  }

  async updateRepetitionData(
    userId: string,
    exerciseId: string,
    score: number
  ): Promise<void> {
    // Znajdź lub stwórz dane powtórek
    const existing = await prisma.spacedRepetition.findUnique({
      where: {
        userId_exerciseId: {
          userId,
          exerciseId,
        },
      },
    });

    if (existing) {
      // Oblicz nowy interwał
      const { interval, easeFactor } = this.calculateNextReview(
        score,
        existing.interval,
        existing.easeFactor
      );

      const nextReview = new Date();
      nextReview.setDate(nextReview.getDate() + interval);

      await prisma.spacedRepetition.update({
        where: {
          userId_exerciseId: {
            userId,
            exerciseId,
          },
        },
        data: {
          interval,
          easeFactor,
          repetitions: existing.repetitions + 1,
          nextReview,
        },
      });
    } else {
      // Pierwsze podejście
      const { interval, easeFactor } = this.calculateNextReview(score);
      const nextReview = new Date();
      nextReview.setDate(nextReview.getDate() + interval);

      await prisma.spacedRepetition.create({
        data: {
          userId,
          exerciseId,
          interval,
          easeFactor,
          repetitions: 1,
          nextReview,
        },
      });
    }
  }

  async getRepetitionStats(userId: string) {
    const stats = await prisma.spacedRepetition.aggregate({
      where: { userId },
      _count: true,
      _avg: {
        easeFactor: true,
        repetitions: true,
      },
    });

    const dueToday = await prisma.spacedRepetition.count({
      where: {
        userId,
        nextReview: {
          lte: new Date(),
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    const mastered = await prisma.spacedRepetition.count({
      where: {
        userId,
        interval: { gte: 30 }, // Zadania z interwałem 30+ dni uznajemy za opanowane
      },
    });

    return {
      totalCards: stats._count,
      averageDifficulty: stats._avg.easeFactor || 2.5,
      averageRepetitions: stats._avg.repetitions || 0,
      dueToday,
      mastered,
    };
  }
}
