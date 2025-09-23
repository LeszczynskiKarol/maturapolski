// backend/src/services/exerciseSelectionService.ts

import { prisma } from "../lib/prisma";

export class ExerciseSelectionService {
  async getExercisesForExam(
    userId: string,
    category: string,
    type: string,
    count: number,
    difficulty?: { min: number; max: number }
  ) {
    const EXCLUDE_RECENT_COUNT = 30;

    // Pobierz ostatnio używane ćwiczenia
    const recentSubmissions = await prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: EXCLUDE_RECENT_COUNT,
      select: { exerciseId: true },
    });

    const recentIds = recentSubmissions.map((s) => s.exerciseId);

    // Buduj zapytanie bazowe
    const baseWhere: any = {
      category,
      type,
      ...(difficulty && {
        difficulty: {
          gte: difficulty.min,
          lte: difficulty.max,
        },
      }),
    };

    // PRIORYTET 1: Nigdy nierozwiązane przez tego użytkownika
    const neverUsed = await prisma.exercise.findMany({
      where: {
        ...baseWhere,
        id: { notIn: recentIds },
        NOT: {
          submissions: {
            some: { userId },
          },
        },
      },
      take: count,
    });

    if (neverUsed.length >= count) {
      return this.randomSelection(neverUsed, count);
    }

    // PRIORYTET 2: Najdawniej rozwiązane (poza ostatnimi)
    const oldestUsed = await prisma.exercise.findMany({
      where: {
        ...baseWhere,
        id: { notIn: recentIds },
        submissions: {
          some: { userId },
        },
      },
      include: {
        submissions: {
          where: { userId },
          orderBy: { createdAt: "asc" },
          take: 1,
        },
      },
      take: count * 2,
    });

    // Sortuj po dacie użycia
    oldestUsed.sort((a, b) => {
      const aDate = a.submissions[0]?.createdAt || new Date(0);
      const bDate = b.submissions[0]?.createdAt || new Date(0);
      return aDate.getTime() - bDate.getTime();
    });

    const combined = [
      ...neverUsed,
      ...oldestUsed.slice(0, count - neverUsed.length),
    ];

    if (combined.length >= count) {
      return this.randomSelection(combined, count);
    }

    // PRIORYTET 3: Jakiekolwiek dostępne
    const lastResort = await prisma.exercise.findMany({
      where: {
        ...baseWhere,
        id: { notIn: recentIds.slice(0, 10) },
      },
      take: count,
    });

    return this.randomSelection(lastResort, count);
  }

  async recordExerciseUsage(
    userId: string,
    exerciseId: string,
    context: "LEARNING" | "EXAM" | "STUDY_PLAN"
  ) {
    // Na razie zapisujemy jako submission marker
    // W przyszłości można dodać dedykowaną tabelę
    console.log(
      `Recording usage: ${context} for exercise ${exerciseId} by user ${userId}`
    );
  }

  private randomSelection(exercises: any[], count: number) {
    if (exercises.length <= count) return exercises;

    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}
