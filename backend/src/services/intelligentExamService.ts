// backend/src/services/intelligentExamService.ts

import { prisma } from "../lib/prisma";
import { differenceInDays } from "date-fns";

interface ScoringFactors {
  recencyWeight: number;
  performanceWeight: number;
  difficultyWeight: number;
  diversityWeight: number;
}

export class IntelligentExamService {
  private readonly DEFAULT_SCORING_FACTORS: ScoringFactors = {
    recencyWeight: 0.4,
    performanceWeight: 0.3,
    difficultyWeight: 0.2,
    diversityWeight: 0.1,
  };

  // Definicje struktury egzaminów
  private readonly EXAM_STRUCTURES = {
    PODSTAWOWY: {
      arkusz1_czesc1: {
        requirements: [
          {
            type: "SHORT_ANSWER",
            category: "LANGUAGE_USE",
            count: 3,
            difficulty: { min: 1, max: 3 },
            points: 1,
          },
          {
            type: "SYNTHESIS_NOTE",
            category: "LANGUAGE_USE",
            count: 1,
            difficulty: { min: 2, max: 4 },
            points: 4,
          },
          {
            type: "CLOSED_MULTIPLE",
            category: "LANGUAGE_USE",
            count: 1,
            difficulty: { min: 2, max: 3 },
            points: 1,
          },
        ],
      },
      arkusz1_czesc2: {
        requirements: [
          {
            type: "CLOSED_SINGLE",
            category: "HISTORICAL_LITERARY",
            count: 10,
            difficulty: { min: 1, max: 3 },
            points: 1,
          },
          {
            type: "CLOSED_MULTIPLE",
            category: "HISTORICAL_LITERARY",
            count: 3,
            difficulty: { min: 2, max: 4 },
            points: 1,
          },
          {
            type: "SHORT_ANSWER",
            category: "HISTORICAL_LITERARY",
            count: 2,
            difficulty: { min: 2, max: 4 },
            points: 1,
          },
        ],
      },
      arkusz2: {
        requirements: [
          {
            type: "ESSAY",
            category: "WRITING",
            count: 1,
            difficulty: { min: 3, max: 5 },
            points: 35,
          },
        ],
      },
    },
    ROZSZERZONY: {
      arkusz1_czesc1: {
        requirements: [
          {
            type: "SHORT_ANSWER",
            category: "LANGUAGE_USE",
            count: 4,
            difficulty: { min: 3, max: 5 },
            points: 2,
          },
          {
            type: "SYNTHESIS_NOTE",
            category: "LANGUAGE_USE",
            count: 2,
            difficulty: { min: 4, max: 5 },
            points: 5,
          },
        ],
      },
      arkusz1_czesc2: {
        requirements: [
          {
            type: "CLOSED_SINGLE",
            category: "HISTORICAL_LITERARY",
            count: 8,
            difficulty: { min: 3, max: 5 },
            points: 1,
          },
          {
            type: "CLOSED_MULTIPLE",
            category: "HISTORICAL_LITERARY",
            count: 4,
            difficulty: { min: 3, max: 5 },
            points: 2,
          },
          {
            type: "SHORT_ANSWER",
            category: "HISTORICAL_LITERARY",
            count: 5,
            difficulty: { min: 4, max: 5 },
            points: 2,
          },
        ],
      },
      arkusz2: {
        requirements: [
          {
            type: "ESSAY",
            category: "WRITING",
            count: 1,
            difficulty: { min: 4, max: 5 },
            points: 40,
          },
        ],
      },
    },
  };

  /**
   * Główna metoda dobierająca pytania do egzaminu
   */
  async selectQuestionsForExam(
    userId: string,
    examType: "PODSTAWOWY" | "ROZSZERZONY"
  ): Promise<Map<string, any[]>> {
    const structure = this.EXAM_STRUCTURES[examType];
    const selectedQuestions = new Map<string, any[]>();

    for (const [sectionKey, section] of Object.entries(structure)) {
      const sectionQuestions = [];

      for (const requirement of section.requirements) {
        const questions = await this.selectQuestionsForRequirement(
          userId,
          requirement,
          examType,
          sectionQuestions.map((q) => q.id)
        );
        sectionQuestions.push(...questions);
      }

      selectedQuestions.set(sectionKey, sectionQuestions);
    }

    return selectedQuestions;
  }

  /**
   * Dobiera pytania dla konkretnego wymagania
   */
  private async selectQuestionsForRequirement(
    userId: string,
    requirement: any,
    examType: string,
    excludeIds: string[] = []
  ) {
    // Pobierz kandydatów
    const candidates = await this.getCandidateQuestions(
      requirement,
      excludeIds
    );

    // Jeśli brak kandydatów, zwróć pustą tablicę
    if (candidates.length === 0) {
      console.warn(
        `Brak pytań dla wymagania: ${requirement.type} / ${requirement.category}`
      );
      return [];
    }

    // Oblicz score dla każdego pytania
    const scoredCandidates = await this.scoreQuestions(
      candidates,
      userId,
      examType
    );

    // Sortuj według score (malejąco)
    scoredCandidates.sort((a, b) => b.score - a.score);

    // Wybierz top N pytań
    return scoredCandidates.slice(0, requirement.count).map((sc) => ({
      ...sc.question,
      points: requirement.points,
    }));
  }

  /**
   * Pobiera pytania-kandydatów spełniające wymagania
   */
  private async getCandidateQuestions(requirement: any, excludeIds: string[]) {
    const where: any = {
      type: requirement.type,
      id: { notIn: excludeIds },
    };

    if (requirement.category) {
      where.category = requirement.category;
    }

    if (requirement.difficulty) {
      where.difficulty = {
        gte: requirement.difficulty.min,
        lte: requirement.difficulty.max,
      };
    }

    if (requirement.specificTags && requirement.specificTags.length > 0) {
      where.tags = {
        hasSome: requirement.specificTags,
      };
    }

    return await prisma.exercise.findMany({
      where,
      include: {
        submissions: {
          select: {
            score: true,
            userId: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        usageHistory: {
          select: {
            userId: true,
            lastUsedAt: true,
            usageCount: true,
            context: true,
          },
        },
      },
    });
  }

  /**
   * Oblicza score dla każdego pytania
   */
  private async scoreQuestions(
    candidates: any[],
    userId: string,
    examType: string
  ) {
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      select: { averageScore: true, level: true },
    });

    return candidates.map((question) => {
      let score = 100; // Bazowy score
      let daysSinceUse = null; // Deklarujemy zmienną tutaj

      // 1. RECENCY SCORE - penalizuj ostatnio używane
      const userUsage = question.usageHistory.find(
        (u: any) => u.userId === userId
      );
      if (userUsage) {
        daysSinceUse = differenceInDays(new Date(), userUsage.lastUsedAt); // Przypisujemy wartość

        // Skalowanie penalizacji
        let recencyPenalty = 0;
        if (daysSinceUse < 7) {
          recencyPenalty = 80;
        } else if (daysSinceUse < 14) {
          recencyPenalty = 60;
        } else if (daysSinceUse < 30) {
          recencyPenalty = 40;
        } else if (daysSinceUse < 60) {
          recencyPenalty = 20;
        } else if (daysSinceUse < 90) {
          recencyPenalty = 10;
        }

        // Dodatkowa penalizacja za częste użycie
        if (userUsage.usageCount > 5) {
          recencyPenalty += 20;
        } else if (userUsage.usageCount > 3) {
          recencyPenalty += 10;
        }

        // Penalizacja za użycie w kontekście egzaminu
        if (userUsage.context === "EXAM") {
          recencyPenalty += 10;
        }

        score -= recencyPenalty * this.DEFAULT_SCORING_FACTORS.recencyWeight;
      }

      // 2. PERFORMANCE SCORE - preferuj pytania o średniej trudności dla użytkownika
      const userSubmissions = question.submissions.filter(
        (s: any) => s.userId === userId
      );
      let avgUserScore = null;

      if (userSubmissions.length > 0) {
        avgUserScore =
          userSubmissions.reduce(
            (sum: number, s: any) => sum + (s.score || 0),
            0
          ) / userSubmissions.length;

        // Preferuj pytania, gdzie użytkownik osiąga 60-80% (optymalne wyzwanie)
        let performanceBonus = 0;
        if (avgUserScore >= 0.6 && avgUserScore <= 0.8) {
          performanceBonus = 30;
        } else if (avgUserScore >= 0.5 && avgUserScore < 0.6) {
          performanceBonus = 20;
        } else if (avgUserScore >= 0.8 && avgUserScore <= 0.9) {
          performanceBonus = 15;
        } else if (avgUserScore < 0.5) {
          performanceBonus = -10;
        } else if (avgUserScore > 0.9) {
          performanceBonus = -20;
        }

        score +=
          performanceBonus * this.DEFAULT_SCORING_FACTORS.performanceWeight;
      }

      // 3. DIFFICULTY MATCHING - dopasuj trudność do poziomu użytkownika i typu egzaminu
      if (userProfile) {
        const targetDifficulty =
          examType === "PODSTAWOWY"
            ? Math.min(3, userProfile.level || 1)
            : Math.min(5, (userProfile.level || 1) + 1);

        const difficultyDiff = Math.abs(question.difficulty - targetDifficulty);
        const difficultyPenalty = difficultyDiff * 10;

        score -=
          difficultyPenalty * this.DEFAULT_SCORING_FACTORS.difficultyWeight;
      }

      // 4. DIVERSITY BONUS - premiuj różnorodność tematyczną
      if (question.tags && question.tags.length > 0) {
        const diversityBonus = Math.random() * 20;
        score += diversityBonus * this.DEFAULT_SCORING_FACTORS.diversityWeight;
      }

      // 5. POPULARITY PENALTY - penalizuj bardzo popularne pytania
      const totalSubmissions = question.submissions.length;
      if (totalSubmissions > 100) {
        score -= 10;
      } else if (totalSubmissions > 50) {
        score -= 5;
      }

      return {
        question,
        score: Math.max(0, score),
        factors: {
          recency: daysSinceUse, // Używamy zmiennej
          usageCount: userUsage?.usageCount || 0,
          avgUserScore,
        },
      };
    });
  }

  /**
   * Zapisuje użycie pytań w kontekście egzaminu
   */
  async recordExamUsage(
    userId: string,
    _sessionId: string, // Prefix _ oznacza, że parametr jest intencjonalnie nieużywany
    questionIds: string[]
  ) {
    const usageRecords = questionIds.map((exerciseId) => ({
      userId,
      exerciseId,
      context: "EXAM" as const,
      lastUsedAt: new Date(),
    }));

    // Użyj upsert dla każdego rekordu
    for (const record of usageRecords) {
      await prisma.exerciseUsage.upsert({
        where: {
          userId_exerciseId: {
            userId: record.userId,
            exerciseId: record.exerciseId,
          },
        },
        create: record,
        update: {
          lastUsedAt: record.lastUsedAt,
          usageCount: { increment: 1 },
          context: record.context,
        },
      });
    }
  }

  /**
   * Pobiera statystyki użycia pytań dla użytkownika
   */
  async getUserExerciseStats(userId: string) {
    const stats = await prisma.exerciseUsage.findMany({
      where: { userId },
      include: {
        exercise: {
          select: {
            id: true,
            type: true,
            category: true,
            difficulty: true,
            tags: true,
          },
        },
      },
      orderBy: { lastUsedAt: "desc" },
    });

    return {
      totalUsed: stats.length,
      recentlyUsed: stats.filter(
        (s) => differenceInDays(new Date(), s.lastUsedAt) < 7
      ).length,
      frequentlyUsed: stats.filter((s) => s.usageCount > 3).length,
      byCategory: this.groupByCategory(stats),
      byType: this.groupByType(stats),
    };
  }

  private groupByCategory(stats: any[]) {
    const grouped = stats.reduce((acc, stat) => {
      const category = stat.exercise.category;
      if (!acc[category]) acc[category] = 0;
      acc[category]++;
      return acc;
    }, {});
    return grouped;
  }

  private groupByType(stats: any[]) {
    const grouped = stats.reduce((acc, stat) => {
      const type = stat.exercise.type;
      if (!acc[type]) acc[type] = 0;
      acc[type]++;
      return acc;
    }, {});
    return grouped;
  }
}
