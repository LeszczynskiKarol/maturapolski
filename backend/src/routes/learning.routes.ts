// backend/src/routes/learning.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { LevelProgressService } from "../services/levelProgressService";
import { SpacedRepetitionService } from "../services/spacedRepetitionService";

const levelProgress = new LevelProgressService();
const spacedRepetition = new SpacedRepetitionService();

// ZACHOWANE MAPY W PAMIĘCI
const sessionSkippedExercises = new Map<string, Set<string>>();
const userSessionFilters = new Map<string, any>();
const userRecentExercises = new Map<string, string[]>();

const sessionExerciseCache = new Map<
  string,
  {
    shown: Set<string>;
    skipped: Set<string>;
    completed: Set<string>;
    currentSession: Set<string>; // WSPÓLNE dla wszystkich sesji!
    lastExerciseId: string | null;
    normalSessionCycle: number; // Osobny cykl dla normalnej sesji
    studyPlanCycle: number; // Osobny cykl dla StudyPlan
    lastRequestTime: number;
  }
>();

interface SessionState {
  completed: number;
  correct: number;
  streak: number;
  maxStreak: number;
  points: number;
  timeSpent: number;
  completedExercises: any[];
  skippedExercises: string[];
  filters: any;
}

export async function learningRoutes(fastify: FastifyInstance) {
  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  fastify.get("/debug/history", async (request, reply) => {
    const userId = (request.user as any).userId;

    const usage = await prisma.exerciseUsage.findMany({
      where: { userId },
      orderBy: { lastUsedAt: "desc" },
      take: 20,
      include: {
        exercise: {
          select: {
            question: true,
          },
        },
      },
    });

    const cache = getUserSessionCache(userId);

    return reply.send({
      cacheSize: cache.shown.size,
      dbRecords: usage.length,
      recentUsage: usage.map((u) => ({
        id: u.exerciseId,
        question: u.exercise.question.substring(0, 50),
        lastUsed: u.lastUsedAt,
        count: u.usageCount,
      })),
    });
  });

  // Start or resume session
  fastify.post("/session/start", async (request, reply) => {
    const userId = (request.user as any).userId;
    const cache = getUserSessionCache(userId);

    // Czyść tylko dane specyficzne dla zakończonej sesji
    cache.completed.clear();
    cache.skipped.clear();

    console.log(
      `Starting session with ${cache.currentSession.size} exercises already shown today`
    );

    if (cache.shown.size === 0) {
      await loadUserExerciseHistory(userId);
    }

    // Sprawdź aktywną sesję
    const activeSession = await prisma.learningSession.findFirst({
      where: {
        userId,
        status: { in: ["IN_PROGRESS", "PAUSED"] },
      },
      orderBy: { lastActiveAt: "desc" },
    });

    if (activeSession) {
      // Przywróć dane z aktywnej sesji
      if (activeSession.filters) {
        userSessionFilters.set(userId, activeSession.filters);
      }

      if (activeSession.skippedExercises) {
        const skipped = activeSession.skippedExercises as string[];
        skipped.forEach((id) => {
          cache.skipped.add(id);
          cache.shown.add(id);
        });
      }

      if (activeSession.completedExercises) {
        const completed = (activeSession.completedExercises as any[]) || [];
        completed.forEach((ex: any) => {
          if (ex.id) {
            cache.completed.add(ex.id);
            cache.shown.add(ex.id);
          }
        });
      }

      return reply.send({
        sessionId: activeSession.id,
        isResumed: true,
        state: {
          completed: activeSession.completed,
          correct: activeSession.correct,
          streak: activeSession.streak,
          maxStreak: activeSession.maxStreak,
          points: activeSession.points,
          timeSpent: activeSession.timeSpent,
          completedExercises: activeSession.completedExercises || [],
          skippedExercises: activeSession.skippedExercises || [],
          filters: activeSession.filters || {},
        },
      });
    }

    // Nowa sesja
    const newSession = await prisma.learningSession.create({
      data: {
        userId,
        status: "IN_PROGRESS",
      },
    });

    // Wyczyść TYLKO dane bieżącej sesji, NIE historię!
    cache.completed.clear();
    cache.skipped.clear();
    // NIE CZYŚĆ cache.shown - to jest historia!

    return reply.send({
      sessionId: newSession.id,
      isResumed: false,
      state: {
        completed: 0,
        correct: 0,
        streak: 0,
        maxStreak: 0,
        points: 0,
        timeSpent: 0,
        completedExercises: [],
        skippedExercises: [],
        filters: {},
      },
    });
  });

  // Set session filters
  fastify.post("/session/filters", async (request, reply) => {
    const userId = (request.user as any).userId;
    const filters = request.body as {
      type?: string;
      category?: string;
      epoch?: string;
      difficulty?: number[];
      points?: { min: number; max: number };
    };

    // Zapisz w pamięci
    userSessionFilters.set(userId, filters);

    // Zapisz też w bazie dla trwałości
    const activeSession = await prisma.learningSession.findFirst({
      where: {
        userId,
        status: "IN_PROGRESS",
      },
      orderBy: { lastActiveAt: "desc" },
    });

    if (activeSession) {
      await prisma.learningSession.update({
        where: { id: activeSession.id },
        data: {
          filters,
          lastActiveAt: new Date(),
        },
      });
    }

    console.log(`Set filters for user ${userId}:`, filters);
    return reply.send({ success: true, filters });
  });

  // Get current filters
  fastify.get("/session/filters", async (request, reply) => {
    const userId = (request.user as any).userId;
    const filters = userSessionFilters.get(userId) || {};
    return reply.send(filters);
  });

  fastify.get("/debug/session-state", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Pobierz aktywną sesję
    const session = await prisma.learningSession.findFirst({
      where: { userId, status: "IN_PROGRESS" },
      orderBy: { lastActiveAt: "desc" },
    });

    // Pobierz ostatnie 10 użyć
    const recentUsage = await prisma.exerciseUsage.findMany({
      where: { userId },
      orderBy: { lastUsedAt: "desc" },
      take: 10,
      include: { exercise: { select: { question: true, type: true } } },
    });

    // Pobierz ostatnie 10 submissions
    const recentSubmissions = await prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { exercise: { select: { question: true } } },
    });

    const sessionExercises = (session?.completedExercises as any[]) || [];
    const completedIds = sessionExercises.map((ex) => ex.id);

    return reply.send({
      sessionId: session?.id,
      completedInSession: completedIds,
      completedCount: completedIds.length,
      sessionStats: {
        completed: session?.completed,
        correct: session?.correct,
      },
      recentUsage: recentUsage.map((u) => ({
        id: u.exerciseId,
        question: u.exercise.question.substring(0, 50),
        lastUsed: u.lastUsedAt,
        count: u.usageCount,
      })),
      recentSubmissions: recentSubmissions.map((s) => ({
        id: s.exerciseId,
        question: s.exercise.question.substring(0, 50),
        time: s.createdAt,
        score: s.score,
      })),
      // Sprawdź duplikaty
      duplicatesInSession: completedIds.filter(
        (id, index) => completedIds.indexOf(id) !== index
      ),
    });
  });

  fastify.get("/exercises/browse", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Sprawdź czy to admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (user?.email !== "kontakt@ecopywriting.pl") {
      return reply.code(403).send({ error: "Admin only" });
    }

    const {
      sortBy = "question",
      sortOrder = "asc",
      type,
      category,
      epoch,
      difficulty,
      search,
      page = 1,
      limit = 50,
    } = request.query as any;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // WHERE clause
    const where: any = {};
    if (type) where.type = type;
    if (category) where.category = category;
    if (epoch) where.epoch = epoch;
    if (difficulty) where.difficulty = parseInt(difficulty);
    if (search) {
      where.question = { contains: search, mode: "insensitive" };
    }

    // ORDER BY
    const orderBy: any = {};
    if (sortBy === "question") orderBy.question = sortOrder;
    if (sortBy === "createdAt") orderBy.createdAt = sortOrder;
    if (sortBy === "difficulty") orderBy.difficulty = sortOrder;
    if (sortBy === "type") orderBy.type = sortOrder;

    const [exercises, total] = await Promise.all([
      prisma.exercise.findMany({
        where,
        orderBy,
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          question: true,
          type: true,
          category: true,
          epoch: true,
          difficulty: true,
          points: true,
          createdAt: true,
          tags: true,
          content: true,
          correctAnswer: true,
        },
      }),
      prisma.exercise.count({ where }),
    ]);

    return reply.send({
      exercises,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  });

  fastify.get("/next", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      const queryParams = request.query as {
        excludeId?: string;
        sequentialMode?: string; // z query string zawsze string
      };

      const excludeId = queryParams.excludeId;
      const sequentialMode = queryParams.sequentialMode === "true";

      console.log("\n=== NEXT EXERCISE REQUEST ===");
      console.log("Sequential Mode:", sequentialMode);

      // ===== NOWY TRYB SEKWENCYJNY =====
      if (sequentialMode) {
        console.log("🔄 SEQUENTIAL MODE ACTIVE - showing exercises A→Z");

        const cache = getUserSessionCache(userId);

        // Zbierz wszystkie ID do wykluczenia
        const sessionCompletedIds: string[] = [];
        const currentSession = await prisma.learningSession.findFirst({
          where: { userId, status: "IN_PROGRESS" },
          select: { completedExercises: true },
        });

        if (currentSession?.completedExercises) {
          const exercises = currentSession.completedExercises as any[];
          exercises.forEach((ex) => {
            if (ex.id) sessionCompletedIds.push(ex.id);
          });
        }

        const toExclude = [
          ...sessionCompletedIds,
          ...Array.from(cache.currentSession),
          ...(excludeId ? [excludeId] : []),
        ];

        // Pobierz pytania od najstarszego (createdAt ASC)
        const nextExercise = await prisma.exercise.findFirst({
          where: {
            id: { notIn: toExclude },
          },
          orderBy: {
            createdAt: "asc", // Najstarsze pierwsze (chronologicznie)
          },
        });

        if (!nextExercise) {
          return reply.send({
            error: "NO_EXERCISES",
            message: "Przeszedłeś wszystkie pytania w trybie sekwencyjnym!",
          });
        }

        // Zapisz użycie
        await prisma.exerciseUsage.upsert({
          where: {
            userId_exerciseId: { userId, exerciseId: nextExercise.id },
          },
          update: {
            lastUsedAt: new Date(),
            usageCount: { increment: 1 },
          },
          create: {
            userId,
            exerciseId: nextExercise.id,
            context: "LEARNING",
            usageCount: 1,
          },
        });

        cache.currentSession.add(nextExercise.id);

        console.log(
          `✅ Sequential: ${nextExercise.id} | ${nextExercise.type} | Created: ${nextExercise.createdAt}`
        );
        console.log(
          `   Question: ${nextExercise.question.substring(0, 60)}...`
        );

        return reply.send(nextExercise);
      }

      console.log("\n=== NEXT EXERCISE REQUEST ===");

      // NOWE: Pobierz maksymalny dostępny poziom trudności
      const userProgress = await levelProgress.getOrCreateProgress(userId);
      const maxAllowedDifficulty = userProgress.unlockedDifficulty;

      console.log(`User max allowed difficulty: ${maxAllowedDifficulty}`);

      // Pobierz dane równolegle
      const [
        userProfile,
        recentSubmissions,
        currentSession, // TO ZOSTAJE TAK JAK BYŁO
        usageHistory,
        lastExercises,
      ] = await Promise.all([
        prisma.userProfile.findUnique({
          where: { userId },
          select: { averageScore: true, level: true, totalPoints: true },
        }),
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
                id: true,
                type: true,
                category: true,
                difficulty: true,
                epoch: true,
                points: true,
                tags: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 20,
        }),
        prisma.learningSession.findFirst({
          where: { userId, status: "IN_PROGRESS" },
          select: {
            completed: true,
            correct: true,
            streak: true,
            filters: true,
            completedExercises: true,
          },
        }),
        prisma.exerciseUsage.findMany({
          where: { userId },
          select: {
            exerciseId: true,
            lastUsedAt: true,
            usageCount: true,
            context: true,
          },
        }),
        prisma.exerciseUsage.findMany({
          where: {
            userId,
            lastUsedAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
          },
          orderBy: { lastUsedAt: "desc" },
          take: 5,
          include: {
            exercise: {
              select: {
                type: true,
                category: true,
                difficulty: true,
                epoch: true,
                tags: true,
              },
            },
          },
        }),
      ]);

      // DODAJ DEBUGOWANIE - wyciągnij ID z completedExercises
      const sessionCompletedIds: string[] = [];
      if (currentSession?.completedExercises) {
        const exercises = currentSession.completedExercises as any[];
        exercises.forEach((ex) => {
          if (ex.id) {
            sessionCompletedIds.push(ex.id);
          }
        });
        console.log(
          `Session has ${sessionCompletedIds.length} completed exercises`
        );
        console.log(`Completed IDs:`, sessionCompletedIds);
      }

      // Statystyki sesji
      const currentAccuracy =
        currentSession && currentSession.completed > 0
          ? currentSession.correct / currentSession.completed
          : userProfile?.averageScore
          ? userProfile.averageScore / 100
          : 0.5;

      const currentStreak = currentSession?.streak || 0;
      const userLevel = userProfile?.level || 1;
      const sessionExercises =
        (currentSession?.completedExercises as any[]) || [];

      // ULEPSZONA ANALIZA: Historia typów i kategorii
      const recentTypeCount = new Map<string, number>();
      const recentCategoryCount = new Map<string, number>();
      const recentEpochCount = new Map<string, number>();
      const recentTagsSet = new Set<string>();

      lastExercises.forEach((usage) => {
        if (usage.exercise) {
          recentTypeCount.set(
            usage.exercise.type,
            (recentTypeCount.get(usage.exercise.type) || 0) + 1
          );
          recentCategoryCount.set(
            usage.exercise.category,
            (recentCategoryCount.get(usage.exercise.category) || 0) + 1
          );
          if (usage.exercise.epoch) {
            recentEpochCount.set(
              usage.exercise.epoch,
              (recentEpochCount.get(usage.exercise.epoch) || 0) + 1
            );
          }
          usage.exercise.tags?.forEach((tag) => recentTagsSet.add(tag));
        }
      });

      // Znajdź problematyczne ćwiczenia (do powtórki)
      const failedExercises = recentSubmissions
        .filter((s) => (s.score || 0) === 0)
        .map((s) => ({
          id: s.exerciseId,
          hoursSince:
            (Date.now() - new Date(s.createdAt).getTime()) / (1000 * 60 * 60),
        }));

      // Filtry sesji
      const filters = userSessionFilters.get(userId) || {};
      const isStudyPlanSession = !!filters.weekNumber;

      console.log(`\n=== INTELLIGENT SELECTION v3 ===`);
      console.log(
        `User: Level ${userLevel}, Max Difficulty: ${maxAllowedDifficulty}, Accuracy: ${(
          currentAccuracy * 100
        ).toFixed(0)}%, Streak: ${currentStreak}`
      );
      console.log(
        `Type: ${
          isStudyPlanSession ? "STUDY_PLAN Week " + filters.weekNumber : "FREE"
        }`
      );
      console.log(`Recent types:`, Object.fromEntries(recentTypeCount));

      // BUDUJ ZAPYTANIE - TYLKO JEDNO baseWhere!
      const baseWhere: any = {};

      // KLUCZOWE: Wyklucz pytania z sesji ZANIM dodasz inne filtry!
      const toExclude = [...sessionCompletedIds];
      if (excludeId) toExclude.push(excludeId);

      if (toExclude.length > 0) {
        baseWhere.id = { notIn: toExclude };
        console.log(
          `EXCLUDING ${toExclude.length} exercises from current session`
        );
      }

      if (isStudyPlanSession) {
        // StudyPlan - respektuj filtry tygodnia ALE ogranicz do odblokowanych
        if (filters.type) baseWhere.type = filters.type;
        if (filters.category) baseWhere.category = filters.category;
        if (filters.epoch) baseWhere.epoch = filters.epoch;

        if (filters.difficulty?.length > 0) {
          // NOWE: Filtruj tylko dostępne poziomy
          const allowedDifficulties = filters.difficulty.filter(
            (d: number) => d <= maxAllowedDifficulty
          );

          if (allowedDifficulties.length === 0) {
            // Jeśli wszystkie poziomy z planu są zablokowane
            return reply.send({
              error: "DIFFICULTY_LOCKED",
              message: `Ten tydzień wymaga poziomu trudności ${Math.min(
                ...filters.difficulty
              )}, ale masz odblokowany tylko poziom ${maxAllowedDifficulty}. Zdobądź więcej punktów, aby odblokować wyższe poziomy!`,
              requiredLevel: Math.min(...filters.difficulty),
              currentMaxLevel: maxAllowedDifficulty,
              pointsNeeded:
                userProgress.pointsToUnlock3 -
                (userProgress.difficulty1Points +
                  userProgress.difficulty2Points),
            });
          }

          baseWhere.difficulty = { in: allowedDifficulties };
          console.log(
            `StudyPlan difficulties filtered: ${filters.difficulty} -> ${allowedDifficulties}`
          );
        }
      } else {
        // FREE LEARNING - inteligentna adaptacja Z OGRANICZENIEM
        if (filters.category) baseWhere.category = filters.category;

        // DODAJ TO: Respektuj również epoch w FREE LEARNING!
        if (filters.epoch) {
          baseWhere.epoch = filters.epoch;
          console.log(`FREE LEARNING with epoch filter: ${filters.epoch}`);
        }

        let targetDifficulty: number[];

        // PRIORYTET: Jeśli user RĘCZNIE wybrał poziomy, użyj ich!
        if (filters.difficulty && filters.difficulty.length > 0) {
          console.log(
            `User manually selected difficulties: ${filters.difficulty}`
          );

          // Filtruj tylko odblokowane poziomy
          targetDifficulty = filters.difficulty.filter(
            (d: number) => d <= maxAllowedDifficulty
          );

          if (targetDifficulty.length === 0) {
            return reply.send({
              error: "DIFFICULTY_LOCKED",
              message: `Wybrane poziomy są zablokowane. Maksymalny dostępny poziom: ${maxAllowedDifficulty}`,
              currentMaxLevel: maxAllowedDifficulty,
            });
          }

          console.log(`After filtering locked levels: ${targetDifficulty}`);
        }
        // Jeśli NIE wybrał ręcznie, użyj inteligentnej logiki
        else {
          console.log(`Using intelligent difficulty selection`);

          // Chcemy trudniejsze zadania, ale tylko do odblokowanego poziomu
          if (currentStreak >= 5 && currentAccuracy > 0.8) {
            targetDifficulty = [
              Math.min(3, maxAllowedDifficulty),
              Math.min(4, maxAllowedDifficulty),
              Math.min(5, maxAllowedDifficulty),
            ].filter((d) => d >= 1 && d <= maxAllowedDifficulty);
          }
          // Słabo idzie - łatwiejsze zadania
          else if (currentAccuracy < 0.4) {
            targetDifficulty = [1, 2, 3].filter(
              (d) => d <= maxAllowedDifficulty
            );
          }
          // Normalny zakres
          else {
            const base = Math.min(
              maxAllowedDifficulty,
              Math.max(1, Math.round(userLevel / 2))
            );
            targetDifficulty = [
              Math.max(1, base - 1),
              base,
              Math.min(maxAllowedDifficulty, base + 1),
            ].filter((d) => d >= 1 && d <= maxAllowedDifficulty);
          }
        }

        // Usuń duplikaty i posortuj
        targetDifficulty = [...new Set(targetDifficulty)].sort();

        console.log(
          `Final difficulties: ${targetDifficulty} (max allowed: ${maxAllowedDifficulty}, user selected: ${!!filters.difficulty})`
        );
        baseWhere.difficulty = { in: targetDifficulty };
      }

      console.log("Final WHERE clause:", JSON.stringify(baseWhere, null, 2));

      // Pobierz kandydatów
      const allCandidates = await prisma.exercise.findMany({
        where: baseWhere,
        include: {
          submissions: {
            where: { userId },
            select: { score: true, createdAt: true },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });

      console.log(
        `Found ${allCandidates.length} candidates after all exclusions`
      );

      // Wyklucz używane
      const usedIds = new Set(usageHistory.map((u) => u.exerciseId));
      if (excludeId) usedIds.add(excludeId);

      // ULEPSZONE SCOROWANIE (bez zmian)
      const scoredExercises = allCandidates.map((exercise) => {
        let score = 1000;
        let bonuses: string[] = [];
        let penalties: string[] = [];

        // 1. NIEUŻYWANE - największy bonus
        if (!usedIds.has(exercise.id)) {
          score += 500;
          bonuses.push("+500 NEW");
        } else {
          const usage = usageHistory.find((u) => u.exerciseId === exercise.id);
          if (usage) {
            const daysSince =
              (Date.now() - usage.lastUsedAt.getTime()) / 86400000;
            if (daysSince > 7) {
              const weekBonus = Math.min(500, Math.floor((daysSince - 7) * 50));
              score += weekBonus;
              bonuses.push(`+${weekBonus} LONG_UNUSED`);
            }
          }
        }

        // SPECJALNY BONUS dla StudyPlan
        if (isStudyPlanSession && !usedIds.has(exercise.id)) {
          score += 300;
          bonuses.push("+300 WEEK_FRESH");
        }

        // KARA ZA ZBYT CZĘSTE ESSAY/SYNTHESIS
        if (
          ["ESSAY", "SYNTHESIS_NOTE"].includes(exercise.type) &&
          sessionExercises.length < 10
        ) {
          score -= 200;
          penalties.push("-200 TOO_EARLY_HARD");
        }

        // 2. ANTY-MONOTONIA TYPÓW
        const typeCount = recentTypeCount.get(exercise.type) || 0;
        if (typeCount > 0) {
          const typePenalty = typeCount * 200;
          score -= typePenalty;
          penalties.push(`-${typePenalty} TYPE_REPEAT`);
        } else {
          score += 150;
          bonuses.push("+150 NEW_TYPE");
        }

        // 3. RÓŻNORODNOŚĆ KATEGORII
        const catCount = recentCategoryCount.get(exercise.category) || 0;
        if (catCount > 2) {
          const catPenalty = catCount * 50;
          score -= catPenalty;
          penalties.push(`-${catPenalty} CAT_REPEAT`);
        } else if (catCount === 0) {
          score += 100;
          bonuses.push("+100 NEW_CAT");
        }

        // 4. RÓŻNORODNOŚĆ EPOK
        if (exercise.epoch) {
          const epochCount = recentEpochCount.get(exercise.epoch) || 0;
          if (epochCount > 1) {
            const epochPenalty = epochCount * 80;
            score -= epochPenalty;
            penalties.push(`-${epochPenalty} EPOCH_REPEAT`);
          } else if (epochCount === 0) {
            score += 120;
            bonuses.push("+120 NEW_EPOCH");
          }
        }

        // 5. PROGRESJA TRUDNOŚCI
        const lastDiff = lastExercises[0]?.exercise?.difficulty;
        if (lastDiff) {
          const diffChange = Math.abs(exercise.difficulty - lastDiff);
          if (currentAccuracy > 0.7 && exercise.difficulty > lastDiff) {
            score += 80;
            bonuses.push("+80 DIFFICULTY_UP");
          } else if (currentAccuracy < 0.5 && exercise.difficulty < lastDiff) {
            score += 60;
            bonuses.push("+60 DIFFICULTY_DOWN");
          } else if (diffChange > 2) {
            score -= 100;
            penalties.push("-100 DIFF_JUMP");
          }
        }

        // 6. SPACED REPETITION dla błędów
        const failedEntry = failedExercises.find((f) => f.id === exercise.id);
        if (failedEntry) {
          if (failedEntry.hoursSince > 1 && failedEntry.hoursSince < 24) {
            const retryBonus = Math.floor(
              300 * (1 - Math.exp(-failedEntry.hoursSince / 6))
            );
            score += retryBonus;
            bonuses.push(`+${retryBonus} RETRY`);
          }
        }

        // 7. RÓŻNORODNOŚĆ TAGÓW
        const commonTags =
          exercise.tags?.filter((tag) => recentTagsSet.has(tag)).length || 0;
        if (commonTags > 2) {
          const tagPenalty = commonTags * 30;
          score -= tagPenalty;
          penalties.push(`-${tagPenalty} TAG_OVERLAP`);
        }

        // 8. BONUS ZA RZADKIE TYPY
        const rareTypes = ["SYNTHESIS_NOTE", "ESSAY"];
        if (rareTypes.includes(exercise.type) && sessionExercises.length > 5) {
          score += 100;
          bonuses.push("+100 RARE_TYPE");
        }

        // 9. LOSOWOŚĆ
        const randomFactor = Math.floor(Math.random() * 100) - 50;
        score += randomFactor;
        if (randomFactor > 25) bonuses.push(`+${randomFactor} RND`);
        if (randomFactor < -25) penalties.push(`${randomFactor} RND`);

        return {
          exercise,
          score,
          debug: {
            id: exercise.id,
            type: exercise.type,
            category: exercise.category,
            difficulty: exercise.difficulty,
            epoch: exercise.epoch,
            isNew: !usedIds.has(exercise.id),
            bonuses: bonuses.join(", "),
            penalties: penalties.join(", "),
            finalScore: score,
          },
        };
      });

      // Sortuj i wyświetl debug
      scoredExercises.sort((a, b) => b.score - a.score);

      console.log("\nTop 5 scored exercises:");
      scoredExercises.slice(0, 5).forEach((item, i) => {
        console.log(
          `  ${i + 1}. [${item.score}] ${item.debug.type}/${
            item.debug.difficulty
          }`
        );
        console.log(`     + ${item.debug.bonuses || "none"}`);
        console.log(`     - ${item.debug.penalties || "none"}`);
      });

      // Wybieranie z top grupy
      const topGroup = scoredExercises.slice(
        0,
        Math.min(5, scoredExercises.length)
      );

      if (topGroup.length === 0) {
        return reply.send({
          error: "NO_EXERCISES",
          message:
            "Brak dostępnych ćwiczeń na Twoim poziomie. Sprawdź czy masz odblokowane odpowiednie poziomy trudności.",
          currentMaxLevel: maxAllowedDifficulty,
        });
      }

      // Ważone losowanie
      const weights = [0.35, 0.25, 0.2, 0.12, 0.08];
      const random = Math.random();
      let cumulative = 0;
      let selectedIndex = 0;

      for (let i = 0; i < Math.min(weights.length, topGroup.length); i++) {
        cumulative += weights[i];
        if (random < cumulative) {
          selectedIndex = i;
          break;
        }
      }

      const selected = topGroup[selectedIndex];
      const finalExercise = selected.exercise;

      // Zapisz użycie
      await prisma.exerciseUsage.upsert({
        where: {
          userId_exerciseId: { userId, exerciseId: finalExercise.id },
        },
        update: {
          lastUsedAt: new Date(),
          usageCount: { increment: 1 },
        },
        create: {
          userId,
          exerciseId: finalExercise.id,
          context: isStudyPlanSession ? "STUDY_PLAN" : "LEARNING",
          usageCount: 1,
        },
      });

      console.log(
        `\n✓ SELECTED: ${finalExercise.type}/${finalExercise.category}/Lv${finalExercise.difficulty}`
      );
      console.log(
        `  Score: ${selected.score}, Position: #${selectedIndex + 1}`
      );

      return reply.send(finalExercise);
    } catch (error) {
      console.error("Error in exercise selection:", error);
      return reply.code(500).send({ error: "Failed to get next exercise" });
    }
  });

  fastify.get("/difficulty-progress", async (request, reply) => {
    const userId = (request.user as any).userId;
    const progress = await levelProgress.getDetailedProgress(userId);
    return reply.send(progress);
  });

  // backend/src/routes/learning.routes.ts
  fastify.get("/debug-progress/:userId", async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const progress = await prisma.userLevelProgress.findUnique({
      where: { userId },
    });

    return reply.send({
      raw: progress,
      calculated: await levelProgress.getDetailedProgress(userId),
    });
  });

  fastify.post("/session/reset-daily-cache", async (request, reply) => {
    const userId = (request.user as any).userId;
    const cache = getUserSessionCache(userId);

    cache.currentSession.clear();
    cache.normalSessionCycle = 0;
    cache.studyPlanCycle = 0;

    console.log(`Reset daily cache for user ${userId}`);
    return reply.send({ success: true, message: "Cache zresetowany" });
  });

  // Save session state - ZACHOWANE BEZ ZMIAN
  fastify.post("/session/save-state", async (request, reply) => {
    const { sessionId, state } = request.body as {
      sessionId: string;
      state: SessionState;
    };

    await prisma.learningSession.update({
      where: { id: sessionId },
      data: {
        completed: state.completed,
        correct: state.correct,
        streak: state.streak,
        maxStreak: state.maxStreak,
        points: state.points,
        timeSpent: state.timeSpent,
        completedExercises: state.completedExercises,
        skippedExercises: state.skippedExercises,
        filters: state.filters,
        lastActiveAt: new Date(),
      },
    });

    return reply.send({ success: true });
  });

  // Complete session - DODAJ CZYSZCZENIE PAMIĘCI
  fastify.post("/session/complete", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { sessionId, stats, completedExercises = [] } = request.body as any;

      console.log("=== SESSION COMPLETE ===");
      console.log(`Session ID: ${sessionId}`);
      console.log(`Completed: ${stats?.completed || 0} exercises`);
      console.log(`User ID: ${userId}`);

      // Wyczyść cache
      const cache = getUserSessionCache(userId);
      cache.completed.clear();
      cache.skipped.clear();

      // WALIDACJA - sprawdź czy sessionId istnieje
      if (!sessionId) {
        console.log("No sessionId provided, skipping save");
        return reply.send({
          success: true,
          message: "No active session to complete",
        });
      }

      // Sprawdź czy sesja istnieje w bazie
      const existingSession = await prisma.learningSession.findUnique({
        where: { id: sessionId },
      });

      if (!existingSession) {
        console.log(`Session ${sessionId} not found in database`);
        return reply.send({
          success: true,
          message: "Session not found",
        });
      }

      // Zapisz ukończone do ExerciseUsage (tylko jeśli są jakieś)
      if (completedExercises && completedExercises.length > 0) {
        console.log(
          `Saving ${completedExercises.length} exercises to usage history`
        );

        for (const ex of completedExercises) {
          if (ex.id) {
            try {
              await prisma.exerciseUsage.upsert({
                where: {
                  userId_exerciseId: {
                    userId,
                    exerciseId: ex.id,
                  },
                },
                update: {
                  lastUsedAt: new Date(),
                  usageCount: { increment: 1 },
                },
                create: {
                  userId,
                  exerciseId: ex.id,
                  context: "LEARNING",
                  usageCount: 1,
                },
              });
            } catch (error) {
              console.error(
                `Failed to save usage for exercise ${ex.id}:`,
                error
              );
              // Kontynuuj mimo błędu
            }
          }
        }
      }

      // Aktualizuj sesję - ZAWSZE, nawet jeśli completed = 0
      console.log("Updating session status to COMPLETED");
      await prisma.learningSession.update({
        where: { id: sessionId },
        data: {
          status: "COMPLETED",
          finishedAt: new Date(),
          completed: stats?.completed || 0,
          correct: stats?.correct || 0,
          maxStreak: stats?.maxStreak || 0,
          points: stats?.points || 0,
          timeSpent: stats?.timeSpent || 0,
        },
      });

      // Jeśli completed = 0, zakończ tutaj - nie ma sensu aktualizować profilu
      if (!stats || stats.completed === 0) {
        console.log(
          "No exercises completed, skipping profile/progress updates"
        );
        return reply.send({
          success: true,
          message: "Session closed without exercises",
        });
      }

      // Oblicz średni wynik dla tej sesji
      const sessionAverageScore =
        stats.completed > 0
          ? Math.round((stats.correct / stats.completed) * 100)
          : 0;

      console.log(`Session average score: ${sessionAverageScore}%`);

      // Pobierz aktualny profil
      const currentProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!currentProfile) {
        console.log("Creating new user profile");
        await prisma.userProfile.create({
          data: {
            userId,
            studyStreak: 1,
            totalPoints: stats.points || 0,
            averageScore: sessionAverageScore,
            level: 1,
          },
        });
      } else {
        // Oblicz nową średnią ważoną
        const oldAverage = currentProfile.averageScore || 0;
        const totalExercises = currentProfile.totalPoints
          ? Math.floor(currentProfile.totalPoints / 2)
          : 0;

        const newTotalExercises = totalExercises + stats.completed;
        const newAverage =
          newTotalExercises > 0
            ? Math.round(
                (oldAverage * totalExercises +
                  sessionAverageScore * stats.completed) /
                  newTotalExercises
              )
            : sessionAverageScore;

        console.log(
          `Updating profile: new average ${newAverage}%, +${stats.points} points`
        );

        // Update user profile
        await prisma.userProfile.update({
          where: { userId },
          data: {
            totalPoints: { increment: stats.points || 0 },
            studyStreak:
              stats.completed >= 5 && sessionAverageScore >= 50
                ? { increment: 1 }
                : undefined,
            averageScore: newAverage,
            level: {
              set:
                Math.floor(
                  (currentProfile.totalPoints + (stats.points || 0)) / 1000
                ) + 1,
            },
          },
        });
      }

      // Zapisz do DailyProgress
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const existingProgress = await prisma.dailyProgress.findUnique({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
      });

      if (existingProgress) {
        console.log("Updating existing daily progress");
        await prisma.dailyProgress.update({
          where: {
            userId_date: {
              userId,
              date: today,
            },
          },
          data: {
            exercisesCount: { increment: stats.completed },
            studyTime: { increment: Math.round(stats.timeSpent / 60) },
            averageScore: Math.round(
              ((existingProgress.averageScore || 0) *
                existingProgress.exercisesCount +
                sessionAverageScore * stats.completed) /
                (existingProgress.exercisesCount + stats.completed)
            ),
          },
        });
      } else {
        console.log("Creating new daily progress entry");
        await prisma.dailyProgress.create({
          data: {
            userId,
            date: today,
            exercisesCount: stats.completed,
            studyTime: Math.round(stats.timeSpent / 60),
            averageScore: sessionAverageScore,
          },
        });
      }

      // Update spaced repetition - tylko dla zadań z score
      if (completedExercises && Array.isArray(completedExercises)) {
        for (const exerciseData of completedExercises) {
          if (exerciseData.id && exerciseData.score !== undefined) {
            try {
              await spacedRepetition.updateRepetitionData(
                userId,
                exerciseData.id,
                exerciseData.score
              );
            } catch (error) {
              console.error(
                `Failed to update spaced repetition for ${exerciseData.id}:`,
                error
              );
              // Kontynuuj mimo błędu
            }
          }
        }
      }

      // Pobierz finalny profil
      const finalProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      console.log("Session completed successfully");

      return reply.send({
        success: true,
        profile: finalProfile,
        userStats: {
          totalPoints: finalProfile?.totalPoints || 0,
          level: Math.floor((finalProfile?.totalPoints || 0) / 1000) + 1,
          averageScore: finalProfile?.averageScore || 0,
          studyStreak: finalProfile?.studyStreak || 0,
        },
      });
    } catch (error) {
      console.error("Error completing session:", error);

      // Loguj szczegóły błędu
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }

      return reply.code(500).send({
        error: "Failed to complete session",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  fastify.get("/active-sessions", async (request, reply) => {
    const userId = (request.user as any).userId;

    const activeSessions = await prisma.learningSession.findMany({
      where: {
        userId,
        status: "IN_PROGRESS",
        lastActiveAt: {
          gte: new Date(Date.now() - 48 * 60 * 60 * 1000), // ostatnie 48h
        },
      },
      orderBy: { lastActiveAt: "desc" },
      take: 3,
    });

    return reply.send(
      activeSessions.map((s) => ({
        id: s.id,
        startedAt: s.startedAt,
        completed: s.completed,
        correct: s.correct,
        points: s.points,
      }))
    );
  });

  fastify.post("/session/update-completed", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { sessionId, exerciseId, score } = request.body as any;

    console.log(`=== UPDATING SESSION ${sessionId} ===`);
    console.log(`Adding exercise: ${exerciseId} with score: ${score}`);

    // Pobierz aktualną sesję
    const session = await prisma.learningSession.findFirst({
      where: {
        id: sessionId,
        userId,
        status: "IN_PROGRESS",
      },
    });

    if (!session) {
      return reply.code(404).send({ error: "Session not found" });
    }

    // Pobierz obecne completedExercises
    const currentCompleted = (session.completedExercises as any[]) || [];

    // Sprawdź czy już nie ma
    if (currentCompleted.some((ex) => ex.id === exerciseId)) {
      console.error(`DUPLICATE! Exercise ${exerciseId} already in session!`);
      return reply.send({ success: false, error: "Already completed" });
    }

    // Dodaj nowe
    currentCompleted.push({ id: exerciseId, score });

    // Zapisz do bazy
    await prisma.learningSession.update({
      where: { id: sessionId },
      data: {
        completedExercises: currentCompleted,
        completed: { increment: 1 },
        correct: score > 0 ? { increment: 1 } : undefined,
        points: { increment: score || 0 },
        lastActiveAt: new Date(),
      },
    });

    console.log(
      `Session now has ${currentCompleted.length} completed exercises`
    );

    return reply.send({
      success: true,
      completedCount: currentCompleted.length,
    });
  });

  // Get learning stats
  fastify.get("/stats", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayProgress = await prisma.dailyProgress.findUnique({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
      });

      const todayExercises = todayProgress?.exercisesCount || 0;

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const recentProgress = await prisma.dailyProgress.findMany({
        where: {
          userId,
          date: {
            gte: sevenDaysAgo,
            lte: today,
          },
        },
        orderBy: { date: "desc" },
        take: 7,
      });

      const recentSessions = recentProgress
        .filter((progress) => progress.exercisesCount > 0)
        .map((progress) => {
          const correctCount = Math.round(
            (progress.exercisesCount * (progress.averageScore || 0)) / 100
          );
          const estimatedPoints = correctCount * 2;

          return {
            date: progress.date.toISOString().split("T")[0],
            completed: progress.exercisesCount,
            correctRate: Math.round(progress.averageScore || 0),
            points: estimatedPoints,
            duration: progress.studyTime || 0,
          };
        });

      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      const activeSessions = await prisma.learningSession.findMany({
        where: {
          userId,
          status: "IN_PROGRESS",
          lastActiveAt: {
            gte: new Date(Date.now() - 48 * 60 * 60 * 1000),
          },
        },
        orderBy: { lastActiveAt: "desc" },
        take: 3,
      });

      return reply.send({
        todayExercises,
        streak: profile?.studyStreak || 0,
        level: profile?.level || 1,
        averageScore: Math.round(profile?.averageScore || 0),
        totalPoints: profile?.totalPoints || 0,
        recentSessions,
        activeSessions,
      });
    } catch (error) {
      console.error("Error getting learning stats:", error);
      return reply.code(500).send({ error: "Failed to get learning stats" });
    }
  });

  // Count available exercises
  fastify.post("/count-available", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const filters = request.body as any;

      const where: any = {};

      if (filters.type) where.type = filters.type;
      if (filters.category) where.category = filters.category;
      if (filters.category === "HISTORICAL_LITERARY" && filters.epoch) {
        where.epoch = filters.epoch;
      }
      if (filters.difficulty && filters.difficulty.length > 0) {
        where.difficulty = { in: filters.difficulty };
      }

      const skippedInSession = sessionSkippedExercises.get(userId) || new Set();
      const recentExercises = userRecentExercises.get(userId) || [];

      const recentUsage = await prisma.exerciseUsage.findMany({
        where: {
          userId,
          lastUsedAt: {
            gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          },
        },
        select: { exerciseId: true },
      });

      const excludedFromRecent = recentUsage.map((u) => u.exerciseId);

      const allExcluded = [
        ...Array.from(skippedInSession),
        ...recentExercises,
        ...excludedFromRecent,
      ];

      if (allExcluded.length > 0) {
        where.id = { notIn: allExcluded };
      }

      const count = await prisma.exercise.count({ where });

      console.log(
        `User ${userId} has ${count} available exercises with filters:`,
        filters
      );

      return reply.send({ count });
    } catch (error) {
      console.error("Error counting available exercises:", error);
      return reply.code(500).send({ error: "Failed to count exercises" });
    }
  });

  fastify.post("/session/clear-skipped", async (request, reply) => {
    const userId = (request.user as any).userId;
    if (sessionSkippedExercises.has(userId)) {
      sessionSkippedExercises.get(userId)!.clear();
    }
    console.log(`Cleared skipped exercises for user ${userId}`);
    return reply.send({ success: true });
  });

  // Get user progress
  fastify.get("/progress", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      // Category progress
      const categoryProgressRaw = await prisma.$queryRaw<any[]>`
        SELECT 
          e.category,
          COUNT(DISTINCT e.id)::int as total_exercises,
          COUNT(DISTINCT s."exerciseId")::int as completed_exercises,
          AVG(COALESCE(s.score, 0))::float as avg_score,
          MAX(s."createdAt") as last_attempt
        FROM "Exercise" e
        LEFT JOIN "Submission" s ON e.id = s."exerciseId" AND s."userId" = ${userId}
        GROUP BY e.category
        ORDER BY e.category
      `;

      const categoryProgress = categoryProgressRaw.map((cat) => ({
        category: cat.category,
        total_exercises: Number(cat.total_exercises),
        completed_exercises: Number(cat.completed_exercises),
        avg_score: Math.round(Number(cat.avg_score || 0)),
        last_attempt: cat.last_attempt,
      }));

      // Recent activity (last 30 days)
      const recentActivityRaw = await prisma.$queryRaw<any[]>`
        SELECT 
          DATE(s."createdAt") as date,
          COUNT(*)::int as exercises_completed,
          AVG(COALESCE(s.score, 0))::float as avg_score
        FROM "Submission" s
        WHERE s."userId" = ${userId}
          AND s."createdAt" >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(s."createdAt")
        ORDER BY date DESC
      `;

      const recentActivity = recentActivityRaw.map((activity) => ({
        date: new Date(activity.date).toISOString().split("T")[0],
        exercises_completed: Number(activity.exercises_completed),
        avg_score: Math.round(Number(activity.avg_score || 0)),
      }));

      return reply.send({
        categoryProgress,
        recentActivity,
      });
    } catch (error) {
      console.error("Error getting progress:", error);
      return reply.code(500).send({ error: "Failed to get progress" });
    }
  });

  fastify.get("/sessions/history", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { limit = 50, offset = 0 } = request.query as {
        limit?: number;
        offset?: number;
      };

      console.log("=== FETCHING SESSION HISTORY ===");
      console.log("UserId:", userId);
      console.log("Limit:", limit, "Offset:", offset);

      const sessions = await prisma.dailyProgress.findMany({
        where: {
          userId,
          exercisesCount: { gt: 0 },
        },
        orderBy: { date: "desc" },
        take: Number(limit), // ⚠️ Konwertuj na liczbę!
        skip: Number(offset), // ⚠️ Konwertuj na liczbę!
      });

      console.log("Found sessions:", sessions.length);
      console.log("Sessions data:", sessions);

      // Policz całkowitą liczbę sesji
      const total = await prisma.dailyProgress.count({
        where: {
          userId,
          exercisesCount: { gt: 0 },
        },
      });

      console.log("Total sessions count:", total);

      // Formatuj dane
      const formattedSessions = sessions.map((session) => ({
        id: session.id,
        date: session.date.toISOString().split("T")[0],
        exercisesCount: session.exercisesCount,
        studyTime: session.studyTime || 0,
        averageScore: Math.round(session.averageScore || 0),
        points: Math.round(
          (session.exercisesCount * (session.averageScore || 0)) / 50
        ),
      }));

      console.log("Formatted sessions:", formattedSessions);

      return reply.send({
        sessions: formattedSessions,
        total,
        hasMore: Number(offset) + Number(limit) < total,
      });
    } catch (error) {
      console.error("Error getting session history:", error);
      return reply.code(500).send({ error: "Failed to get session history" });
    }
  });

  // Dodaj też endpoint dla wszystkich sesji z typem
  fastify.get("/sessions/all", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Pobierz aktywne sesje
    const activeSessions = await prisma.learningSession.findMany({
      where: {
        userId,
        status: "IN_PROGRESS",
      },
      orderBy: { lastActiveAt: "desc" },
    });

    // Pobierz ukończone sesje z DailyProgress
    const completedSessions = await prisma.dailyProgress.findMany({
      where: {
        userId,
        exercisesCount: { gt: 0 },
      },
      orderBy: { date: "desc" },
      take: 50,
    });

    // Dla każdej sesji sprawdź czy to StudyPlan
    const sessionsWithType = await Promise.all(
      completedSessions.map(async (session) => {
        // Utwórz kopię daty aby nie mutować oryginału
        const dateStart = new Date(session.date);
        dateStart.setHours(0, 0, 0, 0);
        const dateEnd = new Date(session.date);
        dateEnd.setHours(23, 59, 59, 999);

        const learningSession = await prisma.learningSession.findFirst({
          where: {
            userId,
            startedAt: {
              // Używamy startedAt!
              gte: dateStart,
              lt: dateEnd,
            },
          },
          select: {
            filters: true,
          },
        });

        const filters = learningSession?.filters as any;
        return {
          id: session.id,
          date: session.date,
          exercisesCount: session.exercisesCount,
          studyTime: session.studyTime || 0,
          averageScore: session.averageScore || 0,
          sessionType: filters?.weekNumber ? "STUDY_PLAN" : "LEARNING",
          weekNumber: filters?.weekNumber || null,
        };
      })
    );

    // Formatuj dane dla aktywnych sesji
    const formattedActive = activeSessions.map((s) => {
      const filters = s.filters as any;
      return {
        id: s.id,
        type: "active",
        sessionType: filters?.weekNumber ? "STUDY_PLAN" : "LEARNING",
        weekNumber: filters?.weekNumber || null,
        date: s.startedAt,
        completed: s.completed,
        correct: s.correct,
        points: s.points,
        timeSpent: Math.round(s.timeSpent / 60),
        status: "IN_PROGRESS",
      };
    });

    // Formatuj dane dla ukończonych sesji
    const formattedCompleted = sessionsWithType.map((s) => ({
      id: s.id,
      type: "completed",
      sessionType: s.sessionType,
      weekNumber: s.weekNumber,
      date: s.date,
      exercisesCount: s.exercisesCount,
      studyTime: s.studyTime,
      averageScore: Math.round(s.averageScore),
      points: Math.round((s.exercisesCount * s.averageScore) / 50),
      status: "COMPLETED",
    }));

    return reply.send({
      active: formattedActive,
      completed: formattedCompleted,
    });
  });

  fastify.get("/session/:id/details", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { id } = request.params as { id: string };

      // Najpierw pobierz DailyProgress
      const dailyProgressRecord = await prisma.dailyProgress.findUnique({
        where: { id },
      });

      if (!dailyProgressRecord || dailyProgressRecord.userId !== userId) {
        return reply.code(404).send({ error: "Session not found" });
      }

      // Teraz pobierz submissions dla tego dnia
      const submissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: {
            gte: new Date(dailyProgressRecord.date.setHours(0, 0, 0, 0)),
            lt: new Date(dailyProgressRecord.date.setHours(23, 59, 59, 999)),
          },
        },
        include: {
          exercise: {
            select: {
              question: true,
              type: true,
              category: true,
              difficulty: true,
              content: true,
              correctAnswer: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });

      // Sprawdź czy to była sesja StudyPlan
      const learningSession = await prisma.learningSession.findFirst({
        where: {
          userId,
          startedAt: {
            // Używamy startedAt zamiast createdAt!
            gte: new Date(
              new Date(dailyProgressRecord.date).setHours(0, 0, 0, 0)
            ),
            lt: new Date(
              new Date(dailyProgressRecord.date).setHours(23, 59, 59, 999)
            ),
          },
        },
        select: {
          filters: true,
        },
      });

      const isStudyPlanSession = !!(learningSession?.filters as any)
        ?.weekNumber;
      const weekNumber = (learningSession?.filters as any)?.weekNumber || null;

      const formattedSubmissions = submissions.map((sub) => ({
        id: sub.id,
        question: sub.exercise.question,
        type: sub.exercise.type,
        category: sub.exercise.category,
        difficulty: sub.exercise.difficulty,
        score: sub.score || 0,
        maxPoints: 2, // domyślnie 2 punkty
        userAnswer: sub.answer,
        correctAnswer: sub.exercise.correctAnswer,
        exerciseContent: sub.exercise.content,
        feedback: sub.feedback,
      }));

      return reply.send({
        sessionType: isStudyPlanSession ? "STUDY_PLAN" : "LEARNING",
        weekNumber,
        submissions: formattedSubmissions,
      });
    } catch (error) {
      console.error("Error getting session details:", error);
      return reply.code(500).send({ error: "Failed to get session details" });
    }
  });

  fastify.get("/user/check-admin", async (request, reply) => {
    const userId = (request.user as any).userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    return reply.send({
      isAdmin: user?.email === "kontakt@ecopywriting.pl",
    });
  });

  // Statystyki dla epok (dla modułu powtórek)
  fastify.get("/epoch-stats", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      const epochs = [
        "ANTIQUITY",
        "MIDDLE_AGES",
        "RENAISSANCE",
        "BAROQUE",
        "ENLIGHTENMENT",
        "ROMANTICISM",
        "POSITIVISM",
        "YOUNG_POLAND",
        "INTERWAR",
        "CONTEMPORARY",
      ];

      const stats: Record<string, any> = {};

      for (const epoch of epochs) {
        // Policz wszystkie zadania z epoki
        const totalExercises = await prisma.exercise.count({
          where: {
            category: "HISTORICAL_LITERARY",
            epoch: epoch as any,
          },
        });

        // Policz ukończone zadania (unique exercises)
        const completedSubmissions = await prisma.submission.findMany({
          where: {
            userId,
            exercise: {
              category: "HISTORICAL_LITERARY",
              epoch: epoch as any,
            },
          },
          select: {
            exerciseId: true,
            score: true,
            exercise: {
              select: {
                points: true,
              },
            },
          },
          distinct: ["exerciseId"],
        });

        const completed = completedSubmissions.length;
        const avgScore =
          completed > 0
            ? completedSubmissions.reduce((sum, sub) => {
                const percentage =
                  ((sub.score || 0) / sub.exercise.points) * 100;
                return sum + percentage;
              }, 0) / completed
            : 0;

        stats[epoch] = {
          total: totalExercises,
          completed,
          avgScore: Math.round(avgScore),
        };
      }

      return reply.send(stats);
    } catch (error) {
      console.error("Error getting epoch stats:", error);
      return reply.code(500).send({ error: "Failed to get epoch stats" });
    }
  });
}

function getUserSessionCache(userId: string) {
  if (!sessionExerciseCache.has(userId)) {
    sessionExerciseCache.set(userId, {
      shown: new Set(),
      skipped: new Set(),
      completed: new Set(),
      currentSession: new Set(),
      normalSessionCycle: 0,
      studyPlanCycle: 0,
      lastExerciseId: null,
      lastRequestTime: 0,
    });
  }
  return sessionExerciseCache.get(userId)!;
}

async function loadUserExerciseHistory(userId: string) {
  const cache = getUserSessionCache(userId);

  console.log(`\n=== LOADING HISTORY FOR USER ${userId} ===`);
  console.log(`Cache before loading: ${cache.shown.size} items`);

  // Pobierz WSZYSTKIE użycia
  const allUsage = await prisma.exerciseUsage.findMany({
    where: { userId },
    select: {
      exerciseId: true,
      lastUsedAt: true,
      usageCount: true,
    },
  });

  console.log(`Found ${allUsage.length} ExerciseUsage records in DB`);

  // Wypisz pierwsze 10
  allUsage.slice(0, 10).forEach((u) => {
    console.log(
      `  - ${u.exerciseId}: used ${u.usageCount} times, last: ${u.lastUsedAt}`
    );
  });

  // Dodaj do cache
  allUsage.forEach((usage) => {
    cache.shown.add(usage.exerciseId);
  });

  console.log(`Cache after loading: ${cache.shown.size} items`);
  console.log(
    `Sample cached IDs: ${Array.from(cache.shown).slice(0, 5).join(", ")}`
  );

  // Sprawdź czy te konkretne ID są w cache
  const testIds = [
    "cmf19uf4o0007mh4z1098dtyu",
    "cmf19uf4l0004mh4zurr4dptq",
    "cmf19uf4p0008mh4z0yvl8ttj",
  ];

  testIds.forEach((id) => {
    console.log(`  ${id} in cache? ${cache.shown.has(id)}`);
  });

  return cache;
}
