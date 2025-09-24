// backend/src/routes/learning.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { SpacedRepetitionService } from "../services/spacedRepetitionService";

const sessionSkippedExercises = new Map<string, Set<string>>();
const spacedRepetition = new SpacedRepetitionService();

// Przechowuj ostatnie pokazane zadania dla każdego użytkownika
const userRecentExercises = new Map<string, string[]>();
const MAX_RECENT_MEMORY = 20;

// Przechowuj filtry sesji dla każdego użytkownika
const userSessionFilters = new Map<string, any>();

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
        status: "IN_PROGRESS",
      },
      orderBy: { lastActiveAt: "desc" },
    });

    if (activeSession) {
      // Zwróć istniejącą sesję
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

  // Save session state
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

  // Pause session
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

  // Get active sessions
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

    return reply.send(sessions);
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

    userSessionFilters.set(userId, filters);
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

      // Pobierz filtry użytkownika
      const filters = userSessionFilters.get(userId) || {};

      // Inicjalizuj struktury dla użytkownika
      if (!sessionSkippedExercises.has(userId)) {
        sessionSkippedExercises.set(userId, new Set());
      }

      const skippedInSession = sessionSkippedExercises.get(userId)!;

      // Jeśli przekazano ID do wykluczenia (pominięte zadanie)
      if (excludeId) {
        skippedInSession.add(excludeId);
      }

      // WAŻNE: Pobierz WSZYSTKIE ostatnie rozwiązania z bazy (nie tylko 3 dni)
      // To zapewni, że nie będą się powtarzać przy kolejnych logowaniach
      const recentSubmissions = await prisma.submission.findMany({
        where: { userId },
        select: {
          exerciseId: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 1000, // Weź ostatnie 100 rozwiązań
      });

      // Sortuj po dacie - najnowsze na końcu kolejki
      const sortedByDate = recentSubmissions
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((s) => s.exerciseId);

      // Zbuduj listę wykluczonych - ostatnie 50 zadań
      const recentlyShownIds = sortedByDate.slice(0, 50);

      // Zbuduj WHERE z wykluczeniami
      const baseWhere: any = {
        id: {
          notIn: [
            ...Array.from(skippedInSession),
            ...recentlyShownIds, // Użyj z bazy, nie z RAM
          ],
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
        `User ${userId}: excluded ${recentlyShownIds.length} recent exercises`
      );

      // PRIORYTET 1: Zadania NIGDY nierozwiązane
      const neverDoneExercises = await prisma.exercise.findMany({
        where: {
          ...baseWhere,
          NOT: {
            submissions: {
              some: { userId },
            },
          },
        },
        take: 20,
      });

      if (neverDoneExercises.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * neverDoneExercises.length
        );
        return reply.send(neverDoneExercises[randomIndex]);
      }

      // PRIORYTET 2: Najdawniej rozwiązane (ale nie z ostatnich 50)
      const oldestSolved = await prisma.submission.findMany({
        where: {
          userId,
          exerciseId: {
            notIn: [...Array.from(skippedInSession), ...recentlyShownIds],
          },
          exercise: {
            ...(filters.type && { type: filters.type }),
            ...(filters.category && { category: filters.category }),
            ...(filters.epoch && { epoch: filters.epoch }),
          },
        },
        select: {
          exerciseId: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" }, // Najstarsze najpierw!
        take: 10,
      });

      if (oldestSolved.length > 0) {
        const exerciseId = oldestSolved[0].exerciseId;
        const exercise = await prisma.exercise.findUnique({
          where: { id: exerciseId },
        });
        if (exercise) {
          console.log(
            `Selected oldest exercise from ${oldestSolved[0].createdAt}`
          );
          return reply.send(exercise);
        }
      }

      // PRIORYTET 3: Jeśli nie ma nic - weź dowolne (ale poza ostatnimi 20)
      const lastResort = await prisma.exercise.findFirst({
        where: {
          ...baseWhere,
          id: { notIn: sortedByDate.slice(0, 20) }, // Wyklucz tylko ostatnie 20
        },
      });

      if (lastResort) {
        return reply.send(lastResort);
      }

      // Absolutnie ostatnia opcja - zwróć cokolwiek
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

  // Get learning stats
  fastify.get("/stats", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      // Today's stats - pobierz z DailyProgress
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

      // Pobierz ostatnie 7 dni z DailyProgress
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

      // Formatuj dane sesji
      const recentSessions = recentProgress
        .filter((progress) => progress.exercisesCount > 0)
        .map((progress) => {
          // Oblicz przybliżoną liczbę poprawnych na podstawie średniej
          const correctCount = Math.round(
            (progress.exercisesCount * (progress.averageScore || 0)) / 100
          );

          // Przybliżone punkty (2 pkt na poprawne zadanie średnio)
          const estimatedPoints = correctCount * 2;

          return {
            date: progress.date.toISOString().split("T")[0],
            completed: progress.exercisesCount,
            correctRate: Math.round(progress.averageScore || 0),
            points: estimatedPoints,
            duration: progress.studyTime || 0, // już w minutach
          };
        });

      // Pobierz profil użytkownika
      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      // Sprawdź streak - czy użytkownik ćwiczył wczoraj
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

      // Jeśli nie ćwiczył wczoraj, zresetuj streak
      let currentStreak = profile?.studyStreak || 0;
      if (!yesterdayProgress || yesterdayProgress.exercisesCount === 0) {
        // Jeśli dzisiaj już ćwiczył, streak = 1, jeśli nie to 0
        currentStreak = todayExercises > 0 ? 1 : 0;

        // Zaktualizuj streak w profilu jeśli się zmienił
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
          lastActiveAt: {
            gte: new Date(Date.now() - 48 * 60 * 60 * 1000), // ostatnie 48h
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

  // Pobierz szczegóły konkretnej sesji
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

      // ⚠️ ROZSZERZ ZAKRES DAT - szukaj też dzień później (problem z UTC)
      const startOfDay = new Date(session.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfNextDay = new Date(session.date);
      endOfNextDay.setDate(endOfNextDay.getDate() + 2); // Dodaj 2 dni dla pewności
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

      // Jeśli za dużo submissions, filtruj do limitu sesji
      const sessionDate = new Date(session.date);
      const relevantSubmissions = submissions
        .filter((sub) => {
          const subDate = new Date(sub.createdAt);
          const diffInHours =
            Math.abs(subDate.getTime() - sessionDate.getTime()) /
            (1000 * 60 * 60);
          return diffInHours <= 48; // W ciągu 48 godzin od daty sesji
        })
        .slice(0, session.exercisesCount); // Weź tylko tyle ile było w sesji

      console.log("Relevant submissions:", relevantSubmissions.length);

      // Formatuj dane
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

  // Save session results
  fastify.post("/session/complete", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      console.log("=== SESSION COMPLETE REQUEST ===");
      console.log("Body:", JSON.stringify(request.body, null, 2));

      const { stats, completedExercises = [] } = request.body as any;

      console.log("Parsed stats:", stats);
      console.log("Parsed completedExercises:", completedExercises);

      if (!stats || stats.completed === 0) {
        console.log("NO DATA TO SAVE - returning early!");
        return reply.send({ success: true, message: "No data to save" });
      }

      // Clear session filters
      userSessionFilters.delete(userId);

      // Clear skipped exercises for this user
      if (sessionSkippedExercises.has(userId)) {
        sessionSkippedExercises.get(userId)!.clear();
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
        // Utwórz profil jeśli nie istnieje
        await prisma.userProfile.create({
          data: {
            userId,
            studyStreak: 1,
            totalPoints: stats.points || 0,
            averageScore: sessionAverageScore,
            level: 1,
          },
        });
      }

      // Oblicz nową średnią ważoną
      const oldAverage = currentProfile?.averageScore || 0;
      const totalExercises = currentProfile?.totalPoints
        ? Math.floor(currentProfile.totalPoints / 2)
        : 0; // przybliżona liczba wszystkich zadań

      // Nowa średnia ważona
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
      const updatedProfile = await prisma.userProfile.update({
        where: { userId },
        data: {
          totalPoints: { increment: stats.points || 0 },
          // Streak - zwiększ tylko jeśli zrobiono minimum 5 zadań z dobrym wynikiem
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

      // WAŻNE: Zapisz sesję jako OSOBNY wpis w DailyProgress
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Sprawdź czy jest już wpis na dzisiaj
      const existingProgress = await prisma.dailyProgress.findUnique({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
      });

      if (existingProgress) {
        // AKTUALIZUJ istniejący wpis - DODAJ do istniejących wartości
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
            // Oblicz nową średnią dla całego dnia
            averageScore: Math.round(
              ((existingProgress.averageScore || 0) *
                existingProgress.exercisesCount +
                sessionAverageScore * stats.completed) /
                (existingProgress.exercisesCount + stats.completed)
            ),
          },
        });
      } else {
        // Stwórz nowy wpis dla dzisiejszego dnia
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

      // Update spaced repetition data jeśli są dane o ukończonych zadaniach
      if (
        completedExercises &&
        Array.isArray(completedExercises) &&
        completedExercises.length > 0
      ) {
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

      // Create achievement notifications for milestones
      if (stats.maxStreak >= 10) {
        await createNotification(
          userId,
          "achievement",
          "🔥 Niesamowita seria!",
          `Odpowiedziałeś poprawnie na ${stats.maxStreak} pytań z rzędu!`
        );
      }

      if (stats.completed === 20 && sessionAverageScore >= 80) {
        await createNotification(
          userId,
          "achievement",
          "⭐ Perfekcyjna sesja!",
          `Ukończyłeś pełną sesję z wynikiem ${sessionAverageScore}%!`
        );
      }

      // Check for level up
      const newLevel = Math.floor(updatedProfile.totalPoints / 1000) + 1;
      const oldLevel =
        Math.floor((currentProfile?.totalPoints || 0) / 1000) + 1;

      if (newLevel > oldLevel) {
        await createNotification(
          userId,
          "level_up",
          "🎉 Awans!",
          `Gratulacje! Osiągnąłeś poziom ${newLevel}!`
        );
      }

      // Pobierz zaktualizowane statystyki do zwrócenia
      const finalProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      return reply.send({
        success: true,
        profile: finalProfile,
        sessionStats: {
          completed: stats.completed,
          correct: stats.correct,
          points: stats.points,
          averageScore: sessionAverageScore,
          timeMinutes: Math.round(stats.timeSpent / 60),
        },
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

  // Funkcja pomocnicza do obliczania nowej średniej ważonej
  async function calculateNewAverage(
    userId: string,
    newScore: number,
    weight: number
  ): Promise<number> {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: { averageScore: true },
    });

    const oldAverage = profile?.averageScore || 0;

    // Użyj ważonej średniej: stara średnia ma wagę 70%, nowa 30%
    // ale waga nowej sesji rośnie z liczbą zadań
    const normalizedWeight = Math.min(weight / 20, 1); // max waga przy 20 zadaniach
    const newWeight = 0.3 * normalizedWeight;
    const oldWeight = 1 - newWeight;

    return Math.round(oldAverage * oldWeight + newScore * newWeight);
  }

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
  fastify.post("/count-available", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const filters = request.body as {
        type?: string;
        category?: string;
        epoch?: string;
        difficulty?: number[];
        points?: { min: number; max: number };
      };

      // Buduj warunki WHERE na podstawie filtrów
      const where: any = {};

      if (filters.type) {
        where.type = filters.type;
      }

      if (filters.category) {
        where.category = filters.category;

        if (filters.category === "HISTORICAL_LITERARY" && filters.epoch) {
          where.epoch = filters.epoch;
        }
      }

      if (filters.difficulty && filters.difficulty.length > 0) {
        where.difficulty = { in: filters.difficulty };
      }

      if (filters.points) {
        where.points = {
          gte: filters.points.min,
          lte: filters.points.max,
        };
      }

      // Pobierz pominięte w tej sesji (jeśli są)
      const skippedInSession = sessionSkippedExercises.get(userId) || new Set();
      const recentExercises = userRecentExercises.get(userId) || [];

      // Pobierz ostatnie odpowiedzi z ostatnich 3 dni
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      const recentSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: {
            gte: threeDaysAgo,
          },
        },
        select: {
          exerciseId: true,
        },
      });

      const excludedFromRecent = recentSubmissions.map((s) => s.exerciseId);

      // Dodaj wykluczenia
      const allExcluded = [
        ...Array.from(skippedInSession),
        ...recentExercises,
        ...excludedFromRecent,
      ];

      if (allExcluded.length > 0) {
        where.id = { notIn: allExcluded };
      }

      // Policz dostępne ćwiczenia
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
