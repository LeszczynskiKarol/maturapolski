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

export async function learningRoutes(fastify: FastifyInstance) {
  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
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
      if (!userRecentExercises.has(userId)) {
        userRecentExercises.set(userId, []);
      }

      const skippedInSession = sessionSkippedExercises.get(userId)!;
      const recentExercises = userRecentExercises.get(userId)!;

      // Jeśli przekazano ID do wykluczenia (pominięte zadanie), dodaj do setu
      if (excludeId) {
        skippedInSession.add(excludeId);
        console.log(
          `User ${userId} skipped exercise ${excludeId}. Total skipped: ${skippedInSession.size}`
        );
      }

      // KROK 1: Zbuduj warunki WHERE na podstawie filtrów
      const baseWhere: any = {
        id: { notIn: [...Array.from(skippedInSession), ...recentExercises] },
      };

      // Dodaj filtry
      if (filters.type) {
        baseWhere.type = filters.type;
      }

      if (filters.category) {
        baseWhere.category = filters.category;

        // Jeśli wybrano HISTORICAL_LITERARY i epokę, dodaj filtr epoki
        if (filters.category === "HISTORICAL_LITERARY" && filters.epoch) {
          baseWhere.epoch = filters.epoch;
        }
      }

      if (filters.difficulty && filters.difficulty.length > 0) {
        baseWhere.difficulty = { in: filters.difficulty };
      }

      if (filters.points) {
        baseWhere.points = {
          gte: filters.points.min,
          lte: filters.points.max,
        };
      }

      console.log(`Filters for user ${userId}:`, baseWhere);

      // KROK 2: Pobierz różne okresy dla lepszej randomizacji
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

      // Pobierz ostatnie odpowiedzi z różnych okresów
      const recentSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: {
            gte: threeDaysAgo,
          },
        },
        select: {
          exerciseId: true,
          createdAt: true,
          score: true,
        },
      });

      // Dodaj ostatnie rozwiązania do wykluczonych
      const excludedFromRecent = recentSubmissions.map((s) => s.exerciseId);
      baseWhere.id.notIn = [...baseWhere.id.notIn, ...excludedFromRecent];

      // KROK 3: Strategia wyboru z randomizacją
      const random = Math.random();
      let selectedExercise = null;

      // 30% szans - Zadania do powtórki (spaced repetition)
      if (random < 0.3) {
        const dueForReview = await prisma.spacedRepetition.findMany({
          where: {
            userId,
            nextReview: { lte: new Date() },
            exerciseId: { notIn: baseWhere.id.notIn },
            exercise: baseWhere.category
              ? { category: baseWhere.category }
              : {},
          },
          orderBy: { nextReview: "asc" },
          take: 5,
          include: { exercise: true },
        });

        if (dueForReview.length > 0) {
          // Sprawdź czy spełniają filtry
          const filtered = dueForReview.filter((rep) => {
            const ex = rep.exercise;
            if (filters.type && ex.type !== filters.type) return false;
            if (
              filters.difficulty &&
              !filters.difficulty.includes(ex.difficulty)
            )
              return false;
            if (
              filters.points &&
              (ex.points < filters.points.min || ex.points > filters.points.max)
            )
              return false;
            if (filters.epoch && ex.epoch !== filters.epoch) return false;
            return true;
          });

          if (filtered.length > 0) {
            const randomIndex = Math.floor(Math.random() * filtered.length);
            selectedExercise = filtered[randomIndex].exercise;
          }
        }
      }

      // 40% szans - Nowe zadania (nigdy nie rozwiązane)
      if (!selectedExercise && random < 0.7) {
        const neverDoneExercises = await prisma.exercise.findMany({
          where: {
            ...baseWhere,
            NOT: {
              submissions: {
                some: { userId },
              },
            },
          },
          select: {
            id: true,
            difficulty: true,
            category: true,
            epoch: true,
            type: true,
            points: true,
            question: true,
            content: true,
            correctAnswer: true,
            tags: true,
            metadata: true,
            createdAt: true,
          },
        });

        if (neverDoneExercises.length > 0) {
          // Jeśli nie ma filtra trudności, preferuj łatwiejsze
          if (!filters.difficulty || filters.difficulty.length === 0) {
            // Grupuj po poziomie trudności
            const byDifficulty: Record<number, any[]> = {};
            neverDoneExercises.forEach((ex) => {
              if (!byDifficulty[ex.difficulty]) {
                byDifficulty[ex.difficulty] = [];
              }
              byDifficulty[ex.difficulty].push(ex);
            });

            // Wybierz poziom trudności (preferuj niższe)
            const difficulties = Object.keys(byDifficulty).map(Number).sort();
            let targetDifficulty = difficulties[0];

            const diffRandom = Math.random();
            if (diffRandom < 0.7 && difficulties[0]) {
              targetDifficulty = difficulties[0];
            } else if (diffRandom < 0.9 && difficulties[1]) {
              targetDifficulty = difficulties[1];
            } else if (difficulties[2]) {
              targetDifficulty = difficulties[2];
            }

            // Wybierz losowe zadanie z tego poziomu
            const candidates =
              byDifficulty[targetDifficulty] || neverDoneExercises;
            selectedExercise =
              candidates[Math.floor(Math.random() * candidates.length)];
          } else {
            // Jeśli są filtry, wybierz losowo z przefiltrowanych
            selectedExercise =
              neverDoneExercises[
                Math.floor(Math.random() * neverDoneExercises.length)
              ];
          }
        }
      }

      // 30% szans - Zadania ze słabych kategorii (z uwzględnieniem filtrów)
      if (!selectedExercise) {
        // Analiza słabych kategorii użytkownika
        const weakWhere = filters.category
          ? `AND e.category = '${filters.category}'`
          : "";
        const epochWhere = filters.epoch
          ? `AND e.epoch = '${filters.epoch}'`
          : "";

        const weakCategoriesRaw = await prisma.$queryRawUnsafe<any[]>(
          `
          SELECT 
            e.category,
            ${filters.epoch ? "e.epoch," : ""}
            AVG(CAST(s.score AS FLOAT)) as avg_score,
            COUNT(*)::int as attempts
          FROM "Submission" s
          JOIN "Exercise" e ON s."exerciseId" = e.id
          WHERE s."userId" = $1
            AND s.score IS NOT NULL
            AND s."createdAt" > $2
            ${weakWhere}
            ${epochWhere}
          GROUP BY e.category ${filters.epoch ? ", e.epoch" : ""}
          HAVING AVG(CAST(s.score AS FLOAT)) < 70
          ORDER BY AVG(CAST(s.score AS FLOAT)) ASC
          LIMIT 3
        `,
          userId,
          fourteenDaysAgo
        );

        if (weakCategoriesRaw.length > 0) {
          // Wybierz losową słabą kategorię
          const randomCategory =
            weakCategoriesRaw[
              Math.floor(Math.random() * weakCategoriesRaw.length)
            ];

          const weakExercises = await prisma.exercise.findMany({
            where: {
              ...baseWhere,
              category: randomCategory.category,
              ...(randomCategory.epoch && { epoch: randomCategory.epoch }),
            },
            take: 10,
          });

          if (weakExercises.length > 0) {
            selectedExercise =
              weakExercises[Math.floor(Math.random() * weakExercises.length)];
          }
        }
      }

      // KROK 4: Fallback - stare zadania (sprzed 7 dni) z filtrami
      if (!selectedExercise) {
        const oldSubmissions = await prisma.submission.findMany({
          where: {
            userId,
            createdAt: { lt: sevenDaysAgo },
            score: { lt: 100 },
            exercise: {
              ...(filters.type && { type: filters.type }),
              ...(filters.category && { category: filters.category }),
              ...(filters.epoch && { epoch: filters.epoch }),
              ...(filters.difficulty && {
                difficulty: { in: filters.difficulty },
              }),
              ...(filters.points && {
                points: {
                  gte: filters.points.min,
                  lte: filters.points.max,
                },
              }),
            },
          },
          select: {
            exerciseId: true,
            score: true,
          },
          orderBy: { score: "asc" },
          take: 20,
        });

        if (oldSubmissions.length > 0) {
          const shuffled = oldSubmissions
            .filter((s) => !baseWhere.id.notIn.includes(s.exerciseId))
            .sort(() => Math.random() - 0.5);

          if (shuffled.length > 0) {
            selectedExercise = await prisma.exercise.findUnique({
              where: { id: shuffled[0].exerciseId },
            });
          }
        }
      }

      // KROK 5: Ostateczny fallback - dowolne zadanie z filtrami
      if (!selectedExercise) {
        // Pobierz wszystkie dostępne zadania z filtrami
        const allAvailable = await prisma.exercise.findMany({
          where: {
            ...(filters.type && { type: filters.type }),
            ...(filters.category && { category: filters.category }),
            ...(filters.epoch && { epoch: filters.epoch }),
            ...(filters.difficulty && {
              difficulty: { in: filters.difficulty },
            }),
            ...(filters.points && {
              points: {
                gte: filters.points.min,
                lte: filters.points.max,
              },
            }),
            id: { notIn: baseWhere.id.notIn },
          },
          select: { id: true },
        });

        if (allAvailable.length > 0) {
          const randomIndex = Math.floor(Math.random() * allAvailable.length);
          selectedExercise = await prisma.exercise.findUnique({
            where: { id: allAvailable[randomIndex].id },
          });
        } else {
          // Absolutnie ostatnia opcja - wyczyść pamięć i zacznij od nowa
          console.log(
            "No exercises available with current filters - clearing memory"
          );
          skippedInSession.clear();
          recentExercises.length = 0;

          // Spróbuj jeszcze raz bez wykluczeń
          const anyExercise = await prisma.exercise.findFirst({
            where: {
              ...(filters.type && { type: filters.type }),
              ...(filters.category && { category: filters.category }),
              ...(filters.epoch && { epoch: filters.epoch }),
              ...(filters.difficulty && {
                difficulty: { in: filters.difficulty },
              }),
              ...(filters.points && {
                points: {
                  gte: filters.points.min,
                  lte: filters.points.max,
                },
              }),
            },
          });

          if (anyExercise) {
            selectedExercise = anyExercise;
          }
        }
      }

      // Zapisz pokazane zadanie w pamięci
      if (selectedExercise) {
        recentExercises.push(selectedExercise.id);
        if (recentExercises.length > MAX_RECENT_MEMORY) {
          recentExercises.shift();
        }

        console.log(
          `Selected exercise ${selectedExercise.id} for user ${userId} with filters`
        );
      } else {
        console.log(
          `No exercise found for user ${userId} with current filters`
        );
      }

      return reply.send(selectedExercise);
    } catch (error) {
      console.error("Error getting next exercise:", error);
      return reply.code(500).send({ error: "Failed to get next exercise" });
    }
  });

  // Clear session data (wywoływane przy rozpoczęciu nowej sesji)
  fastify.post("/session/start", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Wyczyść pominięte zadania
    if (sessionSkippedExercises.has(userId)) {
      sessionSkippedExercises.get(userId)!.clear();
    }

    // NIE czyść pamięci ostatnich zadań - zachowaj ciągłość między sesjami

    console.log(`Started new learning session for user ${userId}`);
    return reply.send({ success: true });
  });

  // Get learning stats
  fastify.get("/stats", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      // Today's stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todaySubmissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: { gte: today },
        },
      });

      const todayExercises = todaySubmissions.length;
      const todayCorrect = todaySubmissions.filter(
        (s) => (s.score || 0) > 0
      ).length;

      // Recent sessions
      const recentSessionsRaw = await prisma.$queryRaw<any[]>`
        SELECT 
          DATE(s."createdAt") as date,
          COUNT(*)::int as completed,
          AVG(CASE WHEN s.score > 0 THEN 100 ELSE 0 END)::float as "correctRate",
          SUM(COALESCE(s.score, 0))::int as points,
          EXTRACT(EPOCH FROM (MAX(s."createdAt") - MIN(s."createdAt")))::int as duration_seconds
        FROM "Submission" s
        WHERE s."userId" = ${userId}
          AND s."createdAt" >= NOW() - INTERVAL '7 days'
        GROUP BY DATE(s."createdAt")
        ORDER BY date DESC
        LIMIT 7
      `;

      const recentSessions = recentSessionsRaw.map((session) => ({
        date: new Date(session.date).toISOString().split("T")[0],
        completed: Number(session.completed),
        correctRate: Math.round(Number(session.correctRate || 0)),
        points: Number(session.points),
        duration: Math.round(Number(session.duration_seconds || 0) / 60),
      }));

      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      return reply.send({
        todayExercises,
        todayCorrect,
        streak: profile?.studyStreak || 0,
        level: profile?.level || 1,
        averageScore: profile?.averageScore || 0,
        totalPoints: profile?.totalPoints || 0,
        recentSessions,
      });
    } catch (error) {
      console.error("Error getting learning stats:", error);
      return reply.code(500).send({ error: "Failed to get learning stats" });
    }
  });

  // Save session results
  fastify.post("/session/complete", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { stats } = request.body as any;

      // Clear session filters
      userSessionFilters.delete(userId);

      // Update user profile
      const updatedProfile = await prisma.userProfile.update({
        where: { userId },
        data: {
          totalPoints: { increment: stats.points || 0 },
          studyStreak: { increment: 1 },
        },
      });

      // Update spaced repetition data for completed exercises
      if (stats.completedExercises) {
        for (const exerciseData of stats.completedExercises) {
          await spacedRepetition.updateRepetitionData(
            userId,
            exerciseData.id,
            exerciseData.score
          );
        }
      }

      // Create achievement if milestone reached
      if (stats.streak >= 10) {
        await createNotification(
          userId,
          "achievement",
          "🔥 Niesamowita seria!",
          `Odpowiedziałeś poprawnie na ${stats.streak} pytań z rzędu!`
        );
      }

      // Check for level up
      const newLevel = Math.floor(updatedProfile.totalPoints / 1000) + 1;
      if (newLevel > updatedProfile.level) {
        await prisma.userProfile.update({
          where: { userId },
          data: { level: newLevel },
        });

        await createNotification(
          userId,
          "level_up",
          "🎉 Awans!",
          `Gratulacje! Osiągnąłeś poziom ${newLevel}!`
        );
      }

      return reply.send({ success: true, profile: updatedProfile });
    } catch (error) {
      console.error("Error completing session:", error);
      return reply.code(500).send({ error: "Failed to complete session" });
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
