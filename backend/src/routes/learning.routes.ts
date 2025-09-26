// backend/src/routes/learning.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { SpacedRepetitionService } from "../services/spacedRepetitionService";

const spacedRepetition = new SpacedRepetitionService();

// ZACHOWANE MAPY W PAMIĘCI
const sessionSkippedExercises = new Map<string, Set<string>>();
const userSessionFilters = new Map<string, any>();
const userRecentExercises = new Map<string, string[]>();
const MAX_RECENT_MEMORY = 20;

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

  // Start or resume session
  fastify.post("/session/start", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Sprawdź czy jest aktywna sesja
    const activeSession = await prisma.learningSession.findFirst({
      where: {
        userId,
        status: { in: ["IN_PROGRESS", "PAUSED"] },
      },
      orderBy: { lastActiveAt: "desc" },
    });

    if (activeSession) {
      // Przywróć filtry do pamięci
      if (activeSession.filters) {
        userSessionFilters.set(userId, activeSession.filters);
      }

      // Przywróć pominięte do pamięci
      if (activeSession.skippedExercises) {
        sessionSkippedExercises.set(
          userId,
          new Set(activeSession.skippedExercises as string[])
        );
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

    // Utwórz nową sesję
    const newSession = await prisma.learningSession.create({
      data: {
        userId,
        status: "IN_PROGRESS",
      },
    });

    // Wyczyść dane w pamięci
    sessionSkippedExercises.delete(userId);
    userRecentExercises.delete(userId);
    userSessionFilters.delete(userId);

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

  fastify.get("/next", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { excludeId } = request.query as { excludeId?: string };

      // Pobierz filtry z pamięci
      const filters = userSessionFilters.get(userId) || {};

      // Inicjalizuj struktury dla użytkownika
      if (!sessionSkippedExercises.has(userId)) {
        sessionSkippedExercises.set(userId, new Set());
      }
      if (!userRecentExercises.has(userId)) {
        userRecentExercises.set(userId, []);
      }

      const skippedInSession = sessionSkippedExercises.get(userId)!;
      const recentInMemory = userRecentExercises.get(userId)!;

      // Jeśli przekazano ID do wykluczenia (pominięte zadanie)
      if (excludeId) {
        skippedInSession.add(excludeId);

        // Zapisz też w bazie
        const activeSession = await prisma.learningSession.findFirst({
          where: {
            userId,
            status: "IN_PROGRESS",
          },
        });

        if (activeSession) {
          const currentSkipped =
            (activeSession.skippedExercises as string[]) || [];
          await prisma.learningSession.update({
            where: { id: activeSession.id },
            data: {
              skippedExercises: [...new Set([...currentSkipped, excludeId])],
            },
          });
        }
      }

      // UŻYJ TABELI ExerciseUsage zamiast submissions
      const recentUsage = await prisma.exerciseUsage.findMany({
        where: {
          userId,
          lastUsedAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // ostatnie 7 dni
          },
        },
        orderBy: { lastUsedAt: "desc" },
        take: 100,
        select: { exerciseId: true, lastUsedAt: true },
      });

      const recentlyUsedIds = recentUsage.map((u) => u.exerciseId);

      // Pobierz też zadania ukończone w tej sesji
      const activeSession = await prisma.learningSession.findFirst({
        where: {
          userId,
          status: "IN_PROGRESS",
        },
      });

      const completedInSession = activeSession?.completedExercises
        ? ((activeSession.completedExercises as any[]) || [])
            .map((e) => e.id)
            .filter(Boolean)
        : [];

      // Zbuduj listę wszystkich wykluczonych
      const allExcludedIds = [
        ...Array.from(skippedInSession),
        ...completedInSession,
        ...recentInMemory,
        ...recentlyUsedIds,
      ];

      // Usuń duplikaty
      const uniqueExcluded = [...new Set(allExcludedIds)];

      // Zbuduj WHERE z wykluczeniami
      const baseWhere: any = {
        id: {
          notIn: uniqueExcluded,
        },
      };

      // Dodaj filtry
      if (filters.type) baseWhere.type = filters.type;
      if (filters.category) baseWhere.category = filters.category;
      if (filters.category === "HISTORICAL_LITERARY" && filters.epoch) {
        baseWhere.epoch = filters.epoch;
      }
      if (filters.difficulty && filters.difficulty.length > 0) {
        baseWhere.difficulty = { in: filters.difficulty };
      }

      console.log(
        `User ${userId}: excluded ${uniqueExcluded.length} exercises`
      );

      // PRIORYTET 1: Zadania NIGDY nierozwiązane i nieużywane
      const neverUsed = await prisma.exercise.findMany({
        where: {
          ...baseWhere,
          NOT: {
            OR: [
              { submissions: { some: { userId } } },
              { usageHistory: { some: { userId } } },
            ],
          },
        },
        take: 20,
      });

      if (neverUsed.length > 0) {
        const selected =
          neverUsed[Math.floor(Math.random() * neverUsed.length)];

        // Dodaj do recent w pamięci
        recentInMemory.push(selected.id);
        if (recentInMemory.length > MAX_RECENT_MEMORY) {
          recentInMemory.shift();
        }

        // Zapisz w ExerciseUsage
        await prisma.exerciseUsage.upsert({
          where: {
            userId_exerciseId: {
              userId,
              exerciseId: selected.id,
            },
          },
          update: {
            lastUsedAt: new Date(),
            usageCount: { increment: 1 },
          },
          create: {
            userId,
            exerciseId: selected.id,
            context: "LEARNING",
            usageCount: 1,
          },
        });

        return reply.send(selected);
      }

      // PRIORYTET 2: Najdawniej używane (poza ostatnimi 50)
      const oldestUsed = await prisma.exerciseUsage.findMany({
        where: {
          userId,
          exerciseId: {
            notIn: uniqueExcluded.slice(0, 50), // Wyklucz tylko ostatnie 50
          },
          exercise: {
            ...(filters.type && { type: filters.type }),
            ...(filters.category && { category: filters.category }),
            ...(filters.epoch && { epoch: filters.epoch }),
          },
        },
        include: {
          exercise: true,
        },
        orderBy: { lastUsedAt: "asc" },
        take: 10,
      });

      if (oldestUsed.length > 0) {
        const selected = oldestUsed[0].exercise;
        console.log(
          `Selected oldest exercise from ${oldestUsed[0].lastUsedAt}`
        );

        // Aktualizuj recent
        recentInMemory.push(selected.id);
        if (recentInMemory.length > MAX_RECENT_MEMORY) {
          recentInMemory.shift();
        }

        // Aktualizuj ExerciseUsage
        await prisma.exerciseUsage.update({
          where: {
            userId_exerciseId: {
              userId,
              exerciseId: selected.id,
            },
          },
          data: {
            lastUsedAt: new Date(),
            usageCount: { increment: 1 },
          },
        });

        return reply.send(selected);
      }

      // PRIORYTET 3: Rozluźnij kryteria - wyklucz tylko z tej sesji
      const sessionOnlyExcluded = [
        ...Array.from(skippedInSession),
        ...completedInSession,
        ...recentInMemory.slice(0, 10), // Tylko ostatnie 10 z pamięci
      ];

      const lastResort = await prisma.exercise.findFirst({
        where: {
          ...baseWhere,
          id: { notIn: sessionOnlyExcluded },
        },
      });

      if (lastResort) {
        return reply.send(lastResort);
      }

      // Absolutnie ostatnia opcja
      const anyExercise = await prisma.exercise.findFirst({
        where: {
          ...(filters.type && { type: filters.type }),
          ...(filters.category && { category: filters.category }),
        },
      });

      return reply.send(anyExercise);
    } catch (error) {
      console.error("Error getting next exercise:", error);
      return reply.code(500).send({ error: "Failed to get next exercise" });
    }
  });

  // Save session state - ZACHOWANE BEZ ZMIAN
  fastify.post("/session/save-state", async (request, reply) => {
    const userId = (request.user as any).userId;
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

      console.log("=== SESSION COMPLETE REQUEST ===");
      console.log("Body:", JSON.stringify(request.body, null, 2));

      if (!stats || stats.completed === 0) {
        console.log("NO DATA TO SAVE - returning early!");
        return reply.send({ success: true, message: "No data to save" });
      }

      // Wyczyść dane w pamięci
      userSessionFilters.delete(userId);
      if (sessionSkippedExercises.has(userId)) {
        sessionSkippedExercises.get(userId)!.clear();
      }
      userRecentExercises.delete(userId);

      // Zakończ sesję w bazie
      if (sessionId) {
        await prisma.learningSession.update({
          where: { id: sessionId },
          data: {
            status: "COMPLETED",
            finishedAt: new Date(),
            completed: stats.completed,
            correct: stats.correct,
            maxStreak: stats.maxStreak,
            points: stats.points,
            timeSpent: stats.timeSpent,
          },
        });
      }

      // Oblicz średni wynik dla tej sesji
      const sessionAverageScore =
        stats.completed > 0
          ? Math.round((stats.correct / stats.completed) * 100)
          : 0;

      // Pobierz aktualny profil
      const currentProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!currentProfile) {
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

      // Update spaced repetition
      if (completedExercises && Array.isArray(completedExercises)) {
        for (const exerciseData of completedExercises) {
          if (exerciseData.id && exerciseData.score !== undefined) {
            await spacedRepetition.updateRepetitionData(
              userId,
              exerciseData.id,
              exerciseData.score
            );
          }
        }
      }

      const finalProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

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
      return reply.code(500).send({ error: "Failed to complete session" });
    }
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

  // Get all sessions including active ones
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

    // Formatuj dane
    const formattedActive = activeSessions.map((s) => ({
      id: s.id,
      type: "active",
      date: s.startedAt,
      completed: s.completed,
      correct: s.correct,
      points: s.points,
      timeSpent: Math.round(s.timeSpent / 60),
      status: "IN_PROGRESS",
    }));

    const formattedCompleted = completedSessions.map((s) => ({
      id: s.id,
      type: "completed",
      date: s.date,
      exercisesCount: s.exercisesCount,
      studyTime: s.studyTime || 0,
      averageScore: Math.round(s.averageScore || 0),
      points: Math.round((s.exercisesCount * (s.averageScore || 0)) / 50),
      status: "COMPLETED",
    }));

    return reply.send({
      active: formattedActive,
      completed: formattedCompleted,
    });
  });
}

async function createNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  actionUrl?: string
) {
  try {
    return await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        actionUrl,
        read: false,
      },
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}
