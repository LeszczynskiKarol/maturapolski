// backend/src/services/intelligentExamService.ts

import { prisma } from "../lib/prisma";
import { differenceInDays } from "date-fns";

export class IntelligentExamService {
  private currentUserId: string = "";
  private examCycle: number = 0;

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
    this.currentUserId = userId;
    this.examCycle = 0;
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
    const candidates = await this.getCandidateQuestions(
      requirement,
      excludeIds
    );

    if (candidates.length === 0) {
      console.warn(
        `No questions available for ${requirement.type}/${requirement.category}`
      );
      return [];
    }

    const scoredCandidates = await this.scoreQuestions(
      candidates,
      userId,
      examType
    );
    scoredCandidates.sort((a, b) => b.score - a.score);

    // WYBIERAJ Z TOP 20, NIE TOP 5!
    const topGroup = scoredCandidates.slice(
      0,
      Math.min(20, scoredCandidates.length)
    );

    // LOSUJ KOMPLETNIE RANDOMOWO Z TOP GRUPY!
    const selected: any[] = [];
    const usedIndices = new Set<number>();

    while (
      selected.length < requirement.count &&
      usedIndices.size < topGroup.length
    ) {
      const randomIndex = Math.floor(Math.random() * topGroup.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selected.push(topGroup[randomIndex]);
      }
    }

    return selected.map((sc) => ({
      ...sc.question,
      points: requirement.points,
    }));
  }

  /**
   * Pobiera pytania-kandydatów spełniające wymagania
   */
  // backend/src/services/intelligentExamService.ts

  private async getCandidateQuestions(
    requirement: any,
    excludeIds: string[]
  ): Promise<any[]> {
    const includeClause = {
      submissions: {
        select: { score: true, userId: true, createdAt: true },
        orderBy: { createdAt: "desc" } as const,
        take: 50,
      },
      usageHistory: {
        where: { userId: this.currentUserId },
        select: {
          userId: true,
          lastUsedAt: true,
          usageCount: true,
          context: true,
        },
      },
    };

    // POBIERZ CAŁĄ HISTORIĘ JAK W SESJACH!
    const usageHistory = await prisma.exerciseUsage.findMany({
      where: { userId: this.currentUserId },
      select: {
        exerciseId: true,
        lastUsedAt: true,
        usageCount: true,
        context: true,
      },
    });

    const usedIds = new Set(usageHistory.map((u) => u.exerciseId));
    console.log(`User has ${usedIds.size} exercises in total history`);

    // BUDUJ WHERE
    let where: any = {
      type: requirement.type,
      id: { notIn: excludeIds }, // tylko bieżąca sesja egzaminu
    };

    if (requirement.category) where.category = requirement.category;
    if (requirement.difficulty) {
      where.difficulty = {
        gte: requirement.difficulty.min,
        lte: requirement.difficulty.max,
      };
    }

    // CYKL 0 - TYLKO NIEUŻYWANE
    if (this.examCycle === 0) {
      const neverUsedCandidates = await prisma.exercise.findMany({
        where: {
          ...where,
          id: {
            notIn: [...excludeIds, ...Array.from(usedIds)], // WYKLUCZ WSZYSTKIE UŻYTE KIEDYKOLWIEK
          },
        },
        include: includeClause,
      });

      console.log(
        `Cycle 0: Found ${neverUsedCandidates.length} NEVER used exercises`
      );

      if (neverUsedCandidates.length >= requirement.count) {
        return neverUsedCandidates;
      }
    }

    // CYKL 1 - UŻYTE DAWNO TEMU (>30 dni)
    if (this.examCycle <= 1) {
      const oldUsageIds = usageHistory
        .filter((u) => {
          const daysSince =
            (Date.now() - u.lastUsedAt.getTime()) / (24 * 60 * 60 * 1000);
          return daysSince > 30;
        })
        .map((u) => u.exerciseId);

      const oldCandidates = await prisma.exercise.findMany({
        where: {
          ...where,
          id: {
            in: oldUsageIds.length > 0 ? oldUsageIds : undefined,
            notIn: excludeIds,
          },
        },
        include: includeClause,
      });

      console.log(
        `Cycle 1: Found ${oldCandidates.length} exercises not used in 30+ days`
      );

      if (oldCandidates.length >= requirement.count) {
        return oldCandidates;
      }
    }

    // CYKL 2 - UŻYTE TYDZIEŃ TEMU (>7 dni)
    if (this.examCycle <= 2) {
      const weekOldIds = usageHistory
        .filter((u) => {
          const daysSince =
            (Date.now() - u.lastUsedAt.getTime()) / (24 * 60 * 60 * 1000);
          return daysSince > 7;
        })
        .map((u) => u.exerciseId);

      const weekCandidates = await prisma.exercise.findMany({
        where: {
          ...where,
          id: {
            in: weekOldIds.length > 0 ? weekOldIds : undefined,
            notIn: excludeIds,
          },
        },
        include: includeClause,
      });

      console.log(
        `Cycle 2: Found ${weekCandidates.length} exercises not used in 7+ days`
      );

      if (weekCandidates.length >= requirement.count) {
        return weekCandidates;
      }
    }

    // CYKL 3+ - WSZYSTKIE (ale sortowane po dacie użycia)
    console.log(
      `Cycle ${this.examCycle}: Using ALL exercises, sorted by last use`
    );

    const allCandidates = await prisma.exercise.findMany({
      where: {
        ...where,
        id: { notIn: excludeIds }, // tylko wyklucz z bieżącego egzaminu
      },
      include: includeClause,
    });

    // Posortuj po dacie użycia (najstarsze najpierw)
    allCandidates.sort((a, b) => {
      const aUsage = usageHistory.find((u) => u.exerciseId === a.id);
      const bUsage = usageHistory.find((u) => u.exerciseId === b.id);

      if (!aUsage && !bUsage) return 0;
      if (!aUsage) return -1; // a nigdy nie użyte - na początek
      if (!bUsage) return 1; // b nigdy nie użyte - na początek

      return aUsage.lastUsedAt.getTime() - bUsage.lastUsedAt.getTime();
    });

    console.log(`Final: ${allCandidates.length} total candidates`);

    // Jeśli dalej za mało - zwiększ cykl
    if (allCandidates.length < requirement.count && this.examCycle < 3) {
      this.examCycle++;
      return this.getCandidateQuestions(requirement, excludeIds);
    }

    return allCandidates;
  }

  /**
   * Oblicza score dla każdego pytania
   */
  // backend/src/services/intelligentExamService.ts

  private async scoreQuestions(
    candidates: any[],
    userId: string,
    examType: string
  ) {
    // Pobierz dane użytkownika i historię
    const [userProfile, recentSubmissions, recentUsage] = await Promise.all([
      prisma.userProfile.findUnique({
        where: { userId },
        select: { averageScore: true, level: true },
      }),
      // Ostatnie 20 odpowiedzi z ostatnich 24h
      prisma.submission.findMany({
        where: {
          userId,
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
        select: {
          exerciseId: true,
          score: true,
          createdAt: true,
          exercise: {
            select: {
              type: true,
              category: true,
              epoch: true,
              tags: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      // Ostatnio używane w ostatniej godzinie
      prisma.exerciseUsage.findMany({
        where: {
          userId,
          lastUsedAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
        },
        select: { exerciseId: true },
      }),
    ]);

    // Analiza ostatnich typów/kategorii/epok (JAK W SESJACH)
    const recentTypeCount = new Map<string, number>();
    const recentCategoryCount = new Map<string, number>();
    const recentEpochCount = new Map<string, number>();
    const recentTagsSet = new Set<string>();
    const veryRecentIds = new Set(recentUsage.map((u) => u.exerciseId));

    recentSubmissions.forEach((s) => {
      if (s.exercise) {
        // Zlicz typy
        const type = s.exercise.type;
        recentTypeCount.set(type, (recentTypeCount.get(type) || 0) + 1);

        // Zlicz kategorie
        const category = s.exercise.category;
        recentCategoryCount.set(
          category,
          (recentCategoryCount.get(category) || 0) + 1
        );

        // Zlicz epoki
        if (s.exercise.epoch) {
          recentEpochCount.set(
            s.exercise.epoch,
            (recentEpochCount.get(s.exercise.epoch) || 0) + 1
          );
        }

        // Zbierz tagi
        s.exercise.tags?.forEach((tag) => recentTagsSet.add(tag));
      }
    });

    // OCENIAJ KAŻDE PYTANIE
    return candidates.map((question) => {
      let score = 1000; // Bazowy score (wyższy niż wcześniej)
      const bonuses: string[] = [];
      const penalties: string[] = [];

      // 1. WYKLUCZ BARDZO OSTATNIE (ostatnia godzina)
      if (veryRecentIds.has(question.id)) {
        score -= 500;
        penalties.push("-500 VERY_RECENT");
      }

      // 2. RECENCY SCORE - mocniejsze kary
      const userUsage = question.usageHistory.find(
        (u: any) => u.userId === userId
      );
      if (userUsage) {
        const daysSinceUse = differenceInDays(new Date(), userUsage.lastUsedAt);

        let recencyPenalty = 0;
        if (daysSinceUse < 3) {
          recencyPenalty = 300; // Mocniejsza kara
        } else if (daysSinceUse < 7) {
          recencyPenalty = 200;
        } else if (daysSinceUse < 14) {
          recencyPenalty = 100;
        } else if (daysSinceUse < 30) {
          recencyPenalty = 50;
        } else if (daysSinceUse < 60) {
          recencyPenalty = 20;
        }

        // Kara za częstotliwość użycia
        if (userUsage.usageCount > 5) {
          recencyPenalty += 100;
          penalties.push("-100 OVERUSED");
        } else if (userUsage.usageCount > 3) {
          recencyPenalty += 50;
          penalties.push("-50 FREQUENTLY_USED");
        }

        // Kara za użycie w egzaminie
        if (userUsage.context === "EXAM") {
          recencyPenalty += 50;
          penalties.push("-50 EXAM_REPEAT");
        }

        score -= recencyPenalty;
        if (recencyPenalty > 0) {
          penalties.push(`-${recencyPenalty} RECENCY`);
        }
      } else {
        // BONUS za całkowicie nowe pytanie
        score += 300;
        bonuses.push("+300 BRAND_NEW");
      }

      // 3. ANTY-MONOTONIA TYPÓW (jak w sesjach)
      const typeCount = recentTypeCount.get(question.type) || 0;
      if (typeCount > 3) {
        const typePenalty = typeCount * 150;
        score -= typePenalty;
        penalties.push(`-${typePenalty} TYPE_OVERUSED`);
      } else if (typeCount > 1) {
        const typePenalty = typeCount * 80;
        score -= typePenalty;
        penalties.push(`-${typePenalty} TYPE_REPEAT`);
      } else if (typeCount === 0) {
        score += 150;
        bonuses.push("+150 NEW_TYPE");
      }

      // 4. RÓŻNORODNOŚĆ KATEGORII
      const catCount = recentCategoryCount.get(question.category) || 0;
      if (catCount > 4) {
        const catPenalty = catCount * 60;
        score -= catPenalty;
        penalties.push(`-${catPenalty} CAT_OVERUSED`);
      } else if (catCount === 0) {
        score += 100;
        bonuses.push("+100 NEW_CATEGORY");
      }

      // 5. RÓŻNORODNOŚĆ EPOK
      if (question.epoch) {
        const epochCount = recentEpochCount.get(question.epoch) || 0;
        if (epochCount > 2) {
          const epochPenalty = epochCount * 70;
          score -= epochPenalty;
          penalties.push(`-${epochPenalty} EPOCH_REPEAT`);
        } else if (epochCount === 0) {
          score += 120;
          bonuses.push("+120 NEW_EPOCH");
        }
      }

      // 6. BONUS ZA RZADKIE TYPY (jak w sesjach)
      if (["SYNTHESIS_NOTE", "ESSAY"].includes(question.type)) {
        // Ale tylko jeśli użytkownik nie miał ich za dużo ostatnio
        if (typeCount < 2) {
          score += 200;
          bonuses.push("+200 RARE_TYPE");
        }
      }

      // 7. PERFORMANCE MATCHING - preferuj optymalne wyzwanie
      const userSubmissions = question.submissions.filter(
        (s: any) => s.userId === userId
      );
      if (userSubmissions.length > 0) {
        const avgScore =
          userSubmissions.reduce(
            (sum: number, s: any) => sum + (s.score || 0),
            0
          ) / userSubmissions.length;

        // Egzamin powinien być wyzwaniem - preferuj pytania gdzie użytkownik osiąga 50-70%
        if (avgScore >= 0.5 && avgScore <= 0.7) {
          score += 150;
          bonuses.push("+150 OPTIMAL_CHALLENGE");
        } else if (avgScore >= 0.7 && avgScore <= 0.85) {
          score += 80;
          bonuses.push("+80 GOOD_CHALLENGE");
        } else if (avgScore > 0.9) {
          score -= 100;
          penalties.push("-100 TOO_EASY");
        } else if (avgScore < 0.3) {
          score -= 80;
          penalties.push("-80 TOO_HARD");
        }
      }

      // 8. DIFFICULTY MATCHING - dopasuj do poziomu i typu egzaminu
      if (userProfile) {
        const targetDifficulty =
          examType === "PODSTAWOWY"
            ? Math.min(3, Math.max(2, Math.round(userProfile.level || 2)))
            : Math.min(
                5,
                Math.max(3, Math.round((userProfile.level || 2) + 1))
              );

        const difficultyDiff = Math.abs(question.difficulty - targetDifficulty);

        if (difficultyDiff === 0) {
          score += 100;
          bonuses.push("+100 PERFECT_DIFFICULTY");
        } else if (difficultyDiff === 1) {
          score += 30;
          bonuses.push("+30 GOOD_DIFFICULTY");
        } else if (difficultyDiff > 2) {
          const penalty = difficultyDiff * 50;
          score -= penalty;
          penalties.push(`-${penalty} WRONG_DIFFICULTY`);
        }
      }

      // 9. RÓŻNORODNOŚĆ TAGÓW
      if (question.tags && question.tags.length > 0) {
        const commonTags = question.tags.filter((tag: string) =>
          recentTagsSet.has(tag)
        ).length;
        if (commonTags > 3) {
          const tagPenalty = commonTags * 30;
          score -= tagPenalty;
          penalties.push(`-${tagPenalty} TAG_OVERLAP`);
        } else if (commonTags === 0) {
          score += 80;
          bonuses.push("+80 FRESH_TAGS");
        }
      }

      // 10. DODATKOWY LOSOWY ELEMENT (mniejszy niż w sesjach)
      const randomFactor = Math.floor(Math.random() * 800) - 400; // -400 do +400
      score += randomFactor;

      return {
        question,
        score: Math.max(0, score),
      };
    });
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
