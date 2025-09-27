// backend/src/routes/learning.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { SpacedRepetitionService } from "../services/spacedRepetitionService";

const spacedRepetition = new SpacedRepetitionService();

const EXERCISES_PER_SESSION = 20;

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

  // Start or resume session - ZAKTUALIZOWANY
  fastify.post("/session/start", async (request, reply) => {
    const userId = (request.user as any).userId;

    try {
      // Sprawdź czy jest aktywna sesja
      const activeSession = await prisma.learningSession.findFirst({
        where: {
          userId,
          status: { in: ["IN_PROGRESS", "PAUSED"] },
        },
        orderBy: { lastActiveAt: "desc" },
      });

      if (activeSession) {
        // Sprawdź czy sesja ma jakiekolwiek odpowiedzi
        const answeredCount = await prisma.exerciseView.count({
          where: {
            userId,
            sessionId: activeSession.id,
            answered: true,
          },
        });

        // Jeśli zero odpowiedzi - usuń starą sesję i stwórz nową
        if (answeredCount === 0) {
          // Usuń widoki jeśli istnieją
          await prisma.exerciseView
            .deleteMany({
              where: { sessionId: activeSession.id },
            })
            .catch(() => {});

          // Spróbuj usunąć sesję
          try {
            await prisma.learningSession.delete({
              where: { id: activeSession.id },
            });
          } catch (deleteError: any) {
            if (deleteError?.code !== "P2025") {
              throw deleteError;
            }
          }
        } else {
          // Przywróć sesję z odpowiedziami
          if (activeSession.filters) {
            userSessionFilters.set(userId, activeSession.filters);
          }
          if (activeSession.skippedExercises) {
            sessionSkippedExercises.set(
              userId,
              new Set(activeSession.skippedExercises as string[])
            );
          }

          return reply.send({
            sessionId: activeSession.id,
            isResumed: true,
            weekNumber: activeSession.weekNumber,
            isWeekPlan: activeSession.isWeekPlan,
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
      }

      // Sprawdź czy są filtry z planu tygodniowego
      const filters = userSessionFilters.get(userId);
      const weekNumber = filters?.weekNumber;
      const isWeekPlan = filters?.isWeekPlan || false;

      // Utwórz nową sesję
      const newSession = await prisma.learningSession.create({
        data: {
          userId,
          status: "IN_PROGRESS",
          weekNumber,
          isWeekPlan,
          filters,
        },
      });

      // Jeśli to sesja planu, sprawdź postęp tygodnia
      if (isWeekPlan && weekNumber) {
        const weekProgress = await prisma.weeklyProgress.findUnique({
          where: {
            userId_week: { userId, week: weekNumber },
          },
        });

        if (weekProgress && weekProgress.completed) {
          return reply.code(400).send({
            error: "Week already completed",
            message: "Ten tydzień został już ukończony",
          });
        }
      }

      // Wyczyść dane w pamięci
      sessionSkippedExercises.delete(userId);
      userRecentExercises.delete(userId);
      // NIE czyść filtrów jeśli to sesja planu
      if (!isWeekPlan) {
        userSessionFilters.delete(userId);
      }

      return reply.send({
        sessionId: newSession.id,
        isResumed: false,
        weekNumber,
        isWeekPlan,
        state: {
          completed: 0,
          correct: 0,
          streak: 0,
          maxStreak: 0,
          points: 0,
          timeSpent: 0,
          completedExercises: [],
          skippedExercises: [],
          filters: filters || {},
        },
      });
    } catch (error) {
      console.error("Error in /session/start:", error);
      return reply.code(500).send({
        error: "Failed to start session",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Dodaj nowy endpoint do sprawdzania aktywnej sesji
  fastify.get("/session/check-active", async (request, reply) => {
    const userId = (request.user as any).userId;

    const activeSession = await prisma.learningSession.findFirst({
      where: {
        userId,
        status: "IN_PROGRESS",
      },
    });

    if (!activeSession) {
      return reply.send({ hasActiveSession: false });
    }

    const answeredCount = await prisma.exerciseView.count({
      where: {
        userId,
        sessionId: activeSession.id,
        answered: true,
      },
    });

    return reply.send({
      hasActiveSession: answeredCount > 0,
      sessionId: activeSession.id,
      answeredCount,
      completed: activeSession.completed,
      total: 20, // SESSION_LIMIT
    });
  });

  // Set session filters - PRZYWRÓCONY!
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

  // Get current filters - PRZYWRÓCONY!
  fastify.get("/session/filters", async (request, reply) => {
    const userId = (request.user as any).userId;
    const filters = userSessionFilters.get(userId) || {};
    return reply.send(filters);
  });

  // Pause session - PRZYWRÓCONY!
  fastify.post("/session/pause", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { sessionId, state } = request.body as any;

    await prisma.learningSession.update({
      where: { id: sessionId },
      data: {
        status: "PAUSED",
        ...state,
        lastActiveAt: new Date(),
      },
    });

    return reply.send({ success: true });
  });

  // Save session state - PRZYWRÓCONY!
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

  // Get active sessions - PRZYWRÓCONY!
  fastify.get("/active-sessions", async (request, reply) => {
    const userId = (request.user as any).userId;

    const sessions = await prisma.learningSession.findMany({
      where: {
        userId,
        status: "IN_PROGRESS",
        lastActiveAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // ostatnie 24h
        },
      },
      orderBy: { lastActiveAt: "desc" },
    });

    // Filtruj sesje które mają 0 ukończonych i były nieaktywne dłużej niż godzinę
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const filteredSessions = sessions.filter((s) => {
      if (s.completed === 0 && s.lastActiveAt < oneHourAgo) {
        prisma.learningSession
          .delete({ where: { id: s.id } })
          .catch(console.error);
        return false;
      }
      return true;
    });

    return reply.send(filteredSessions);
  });

  // Get next exercise - ZAKTUALIZOWANY z ExerciseView
  fastify.get("/next", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { excludeId } = request.query as { excludeId?: string };

      // Pobierz aktywną sesję
      const activeSession = await prisma.learningSession.findFirst({
        where: {
          userId,
          status: "IN_PROGRESS",
        },
        orderBy: { lastActiveAt: "desc" },
      });

      if (!activeSession) {
        return reply.code(404).send({ error: "No active session" });
      }

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
      }

      // Pobierz widziane w tej sesji (bez odpowiedzi)
      const viewedInSession = await prisma.exerciseView.findMany({
        where: {
          userId,
          sessionId: activeSession.id,
          answered: false,
        },
        select: { exerciseId: true },
      });
      const viewedIds = viewedInSession.map((v) => v.exerciseId);

      // Pobierz ukończone w tej sesji
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
        ...viewedIds, // Widziane idą na koniec
      ];

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

      // PRIORYTET 1: Zadania NIGDY nierozwiązane
      const neverUsed = await prisma.exercise.findMany({
        where: {
          ...baseWhere,
          NOT: {
            OR: [
              { submissions: { some: { userId } } },
              { views: { some: { userId } } },
            ],
          },
        },
        take: 20,
      });

      if (neverUsed.length > 0) {
        const selected =
          neverUsed[Math.floor(Math.random() * neverUsed.length)];

        // Zapisz jako widziane
        await prisma.exerciseView.create({
          data: {
            userId,
            exerciseId: selected.id,
            sessionId: activeSession.id,
            context: "LEARNING",
            answered: false,
          },
        });

        recentInMemory.push(selected.id);
        if (recentInMemory.length > MAX_RECENT_MEMORY) {
          recentInMemory.shift();
        }

        return reply.send(selected);
      }

      // PRIORYTET 2: Rozluźnij kryteria
      const lastResort = await prisma.exercise.findFirst({
        where: {
          ...baseWhere,
          id: { notIn: completedInSession },
        },
      });

      if (lastResort) {
        await prisma.exerciseView.upsert({
          where: {
            userId_exerciseId_sessionId: {
              userId,
              exerciseId: lastResort.id,
              sessionId: activeSession.id,
            },
          },
          update: {
            viewedAt: new Date(),
          },
          create: {
            userId,
            exerciseId: lastResort.id,
            sessionId: activeSession.id,
            context: "LEARNING",
            answered: false,
          },
        });

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

  // Mark exercise as answered - NOWY!
  fastify.post("/exercise/:exerciseId/answered", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { exerciseId } = request.params as { exerciseId: string };
    const { sessionId } = request.body as { sessionId: string };

    await prisma.exerciseView.updateMany({
      where: {
        userId,
        exerciseId,
        sessionId,
      },
      data: {
        answered: true,
      },
    });

    return reply.send({ success: true });
  });

  // Complete session - ZAKTUALIZOWANY
  fastify.post("/session/complete", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { sessionId, stats, completedExercises = [] } = request.body as any;

      console.log("=== SESSION COMPLETE REQUEST ===");
      console.log("SessionId:", sessionId);
      console.log("Stats:", stats);

      // Pobierz informacje o sesji
      const session = sessionId
        ? await prisma.learningSession.findUnique({
            where: { id: sessionId },
          })
        : null;

      const weekNumber = session?.weekNumber;
      const isWeekPlan = session?.isWeekPlan || false;

      // DODAJ LOGOWANIE:
      console.log("=== SESSION COMPLETE DEBUG ===");
      console.log("Session ID:", sessionId);
      console.log("Session data:", session);
      console.log("Week Number:", weekNumber);
      console.log("Is Week Plan:", isWeekPlan);
      console.log("Stats:", stats);

      // Wyczyść dane w pamięci ZAWSZE
      userSessionFilters.delete(userId);
      if (sessionSkippedExercises.has(userId)) {
        sessionSkippedExercises.get(userId)!.clear();
      }
      userRecentExercises.delete(userId);

      // Sprawdź ile pytań ma odpowiedzi
      const answeredCount = sessionId
        ? await prisma.exerciseView.count({
            where: {
              userId,
              sessionId,
              answered: true,
            },
          })
        : 0;

      // Jeśli ZERO odpowiedzi - usuń jako nierozpoczętą
      if (answeredCount === 0 || !stats || stats.completed === 0) {
        console.log("NO EXERCISES COMPLETED - deleting empty session!");

        if (sessionId) {
          await prisma.exerciseView.deleteMany({
            where: { sessionId },
          });

          await prisma.learningSession.delete({
            where: { id: sessionId },
          });
          console.log(`Deleted empty session ${sessionId}`);
        }

        return reply.send({
          success: true,
          message: "Empty session removed",
        });
      }

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

      // JEŚLI TO SESJA PLANU TYGODNIOWEGO - AKTUALIZUJ POSTĘP
      if (isWeekPlan && weekNumber) {
        console.log(`=== UPDATING WEEK ${weekNumber} PROGRESS ===`);

        const weekProgress = await prisma.weeklyProgress.upsert({
          where: {
            userId_week: { userId, week: weekNumber },
          },
          create: {
            userId,
            week: weekNumber,
            completedExercises: stats.completed || 0,
            sessionsCompleted: 1,
            targetExercises: 80,
            sessionsRequired: 4,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          update: {
            completedExercises: {
              increment: stats.completed || 0,
            },
            sessionsCompleted: {
              increment: 1,
            },
            updatedAt: new Date(),
          },
        });

        console.log("WEEK PROGRESS UPDATED:", weekProgress);
      }

      // Aktualizuj profil użytkownika
      const sessionAverageScore =
        stats.completed > 0
          ? Math.round((stats.correct / stats.completed) * 100)
          : 0;

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
        await prisma.userProfile.update({
          where: { userId },
          data: {
            totalPoints: { increment: stats.points || 0 },
            averageScore: sessionAverageScore,
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
            averageScore: sessionAverageScore,
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

      // Zwróć informacje o postępie tygodnia jeśli to sesja planu
      let weekProgressInfo = null;
      if (isWeekPlan && weekNumber) {
        const updatedWeekProgress = await prisma.weeklyProgress.findUnique({
          where: {
            userId_week: { userId, week: weekNumber },
          },
        });

        weekProgressInfo = {
          week: weekNumber,
          completedExercises: updatedWeekProgress?.completedExercises || 0,
          targetExercises: updatedWeekProgress?.targetExercises || 80,
          sessionsCompleted: updatedWeekProgress?.sessionsCompleted || 0,
          sessionsRequired: updatedWeekProgress?.sessionsRequired || 4,
          isComplete: updatedWeekProgress?.completed || false,
          completionRate: updatedWeekProgress
            ? Math.round(
                (updatedWeekProgress.completedExercises /
                  updatedWeekProgress.targetExercises) *
                  100
              )
            : 0,
        };
      }

      return reply.send({
        success: true,
        profile: finalProfile,
        weekProgress: weekProgressInfo,
      });
    } catch (error) {
      console.error("Error completing session:", error);
      return reply.code(500).send({ error: "Failed to complete session" });
    }
  });

  // Get incomplete sessions - NOWY!
  fastify.get("/sessions/incomplete", async (request, reply) => {
    const userId = (request.user as any).userId;

    const sessions = await prisma.learningSession.findMany({
      where: {
        userId,
        status: "IN_PROGRESS",
      },
      orderBy: { lastActiveAt: "desc" },
    });

    const validSessions = [];
    for (const session of sessions) {
      const answeredCount = await prisma.exerciseView.count({
        where: {
          userId,
          sessionId: session.id,
          answered: true,
        },
      });

      if (answeredCount > 0) {
        validSessions.push({
          ...session,
          answeredCount,
        });
      }
    }

    return reply.send(validSessions);
  });

  fastify.get("/week-progress/:week", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { week } = request.params as { week: string };
    const weekNumber = parseInt(week);

    const progress = await prisma.weeklyProgress.findUnique({
      where: {
        userId_week: { userId, week: weekNumber },
      },
    });

    if (!progress) {
      return reply.send({
        week: weekNumber,
        completedExercises: 0,
        targetExercises: EXERCISES_PER_SESSION * 4,
        sessionsCompleted: 0,
        sessionsRequired: 4,
        completed: false,
        completionRate: 0,
      });
    }

    return reply.send({
      ...progress,
      completionRate: Math.round(
        (progress.completedExercises / progress.targetExercises) * 100
      ),
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
      const todayCorrect = todayProgress
        ? Math.round(
            (todayProgress.exercisesCount * (todayProgress.averageScore || 0)) /
              100
          )
        : 0;

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

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const yesterdayProgress = await prisma.dailyProgress.findUnique({
        where: {
          userId_date: {
            userId,
            date: yesterday,
          },
        },
      });

      let currentStreak = profile?.studyStreak || 0;
      if (!yesterdayProgress || yesterdayProgress.exercisesCount === 0) {
        currentStreak = todayExercises > 0 ? 1 : 0;

        if (profile && profile.studyStreak !== currentStreak) {
          await prisma.userProfile.update({
            where: { userId },
            data: { studyStreak: currentStreak },
          });
        }
      }

      const activeSessions = await prisma.learningSession.findMany({
        where: {
          userId,
          status: "IN_PROGRESS",
          completed: { gt: 0 },
          lastActiveAt: {
            gte: new Date(Date.now() - 48 * 60 * 60 * 1000),
          },
        },
        orderBy: { lastActiveAt: "desc" },
        take: 3,
      });

      return reply.send({
        todayExercises,
        todayCorrect,
        streak: currentStreak,
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

  // Pobierz szczegóły konkretnej sesji - BRAKUJĄCY ENDPOINT
  fastify.get("/session/:sessionId/details", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { sessionId } = request.params as { sessionId: string };

      console.log("=== FETCHING SESSION DETAILS ===");
      console.log("SessionId:", sessionId);
      console.log("UserId:", userId);

      const session = await prisma.dailyProgress.findFirst({
        where: {
          id: sessionId,
          userId,
        },
      });

      if (!session) {
        return reply.code(404).send({ error: "Session not found" });
      }

      console.log("Found session:", session);

      const startOfDay = new Date(session.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfNextDay = new Date(session.date);
      endOfNextDay.setDate(endOfNextDay.getDate() + 2);
      endOfNextDay.setHours(23, 59, 59, 999);

      console.log("Extended date range:", startOfDay, "to", endOfNextDay);

      const submissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfDay,
            lte: endOfNextDay,
          },
        },
        include: {
          exercise: true,
        },
        orderBy: { createdAt: "asc" },
      });

      console.log("Found submissions:", submissions.length);

      const sessionDate = new Date(session.date);
      const relevantSubmissions = submissions
        .filter((sub) => {
          const subDate = new Date(sub.createdAt);
          const diffInHours =
            Math.abs(subDate.getTime() - sessionDate.getTime()) /
            (1000 * 60 * 60);
          return diffInHours <= 48;
        })
        .slice(0, session.exercisesCount);

      console.log("Relevant submissions:", relevantSubmissions.length);

      const formattedSubmissions = relevantSubmissions.map((sub) => ({
        id: sub.id,
        exerciseId: sub.exerciseId,
        question: sub.exercise.question,
        type: sub.exercise.type,
        category: sub.exercise.category,
        difficulty: sub.exercise.difficulty,
        maxPoints: sub.exercise.points,
        userAnswer: sub.answer,
        correctAnswer: sub.exercise.correctAnswer,
        score: sub.score || 0,
        feedback: sub.feedback,
        createdAt: sub.createdAt,
        exerciseContent: sub.exercise.content,
      }));

      return reply.send({
        session: {
          id: session.id,
          date: session.date.toISOString().split("T")[0],
          exercisesCount: session.exercisesCount,
          studyTime: session.studyTime,
          averageScore: Math.round(session.averageScore || 0),
        },
        submissions: formattedSubmissions,
      });
    } catch (error) {
      console.error("Error getting session details:", error);
      return reply.code(500).send({ error: "Failed to get session details" });
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

  // Clear skipped exercises
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

  // Get session history
  fastify.get("/sessions/history", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { limit = 50, offset = 0 } = request.query as {
        limit?: number;
        offset?: number;
      };

      const sessions = await prisma.dailyProgress.findMany({
        where: {
          userId,
          exercisesCount: { gt: 0 },
        },
        orderBy: { date: "desc" },
        take: Number(limit),
        skip: Number(offset),
      });

      const total = await prisma.dailyProgress.count({
        where: {
          userId,
          exercisesCount: { gt: 0 },
        },
      });

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

  // Get all sessions including active ones - WAŻNY ENDPOINT!
  fastify.get("/sessions/all", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Pobierz aktywne sesje ALE TYLKO Z CO NAJMNIEJ 1 UKOŃCZONYM ZADANIEM
    const activeSessions = await prisma.learningSession.findMany({
      where: {
        userId,
        status: "IN_PROGRESS",
        completed: { gt: 0 }, // TYLKO sesje z jakimiś zadaniami!
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
      total: formattedActive.length + formattedCompleted.length,
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
