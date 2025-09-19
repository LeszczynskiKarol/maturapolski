// backend/src/routes/learning.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { SpacedRepetitionService } from "../services/spacedRepetitionService";

const sessionSkippedExercises = new Map<string, Set<string>>();
const spacedRepetition = new SpacedRepetitionService();

// Przechowuj ostatnie pokazane zadania dla każdego użytkownika
const userRecentExercises = new Map<string, string[]>();
const MAX_RECENT_MEMORY = 20; // Pamiętaj ostatnie 20 zadań

export async function learningRoutes(fastify: FastifyInstance) {
  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  fastify.get("/next", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { excludeId } = request.query as { excludeId?: string };

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

      // KROK 1: Pobierz różne okresy dla lepszej randomizacji
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

      // Pobierz ostatnie odpowiedzi z różnych okresów
      const recentSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: {
            gte: threeDaysAgo, // Tylko z ostatnich 3 dni dla krótkiego okresu
          },
        },
        select: {
          exerciseId: true,
          createdAt: true,
          score: true,
        },
      });

      // Lista zadań do wykluczenia (ostatnie 3 dni + pominięte + ostatnie 20 pokazanych)
      const excludedExerciseIds = new Set([
        ...recentSubmissions.map((s) => s.exerciseId),
        ...Array.from(skippedInSession),
        ...recentExercises, // Dodaj ostatnie pokazane
      ]);

      console.log(
        `Excluding ${excludedExerciseIds.size} exercises for user ${userId}`
      );

      // KROK 2: Strategia wyboru z randomizacją
      const random = Math.random();
      let selectedExercise = null;

      // 30% szans - Zadania do powtórki (spaced repetition)
      if (random < 0.3) {
        const dueForReview = await prisma.spacedRepetition.findMany({
          where: {
            userId,
            nextReview: { lte: new Date() },
            exerciseId: { notIn: Array.from(excludedExerciseIds) },
          },
          orderBy: { nextReview: "asc" },
          take: 5, // Pobierz 5 kandydatów
        });

        if (dueForReview.length > 0) {
          // Wybierz losowo z top 5 zadań do powtórki
          const randomIndex = Math.floor(Math.random() * dueForReview.length);
          selectedExercise = await prisma.exercise.findUnique({
            where: { id: dueForReview[randomIndex].exerciseId },
          });
        }
      }

      // 40% szans - Nowe zadania (nigdy nie rozwiązane)
      if (!selectedExercise && random < 0.7) {
        // Pobierz wszystkie nierozwiązane zadania
        const neverDoneExercises = await prisma.exercise.findMany({
          where: {
            id: { notIn: Array.from(excludedExerciseIds) },
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
            createdAt: true,
          },
        });

        if (neverDoneExercises.length > 0) {
          // Grupuj po poziomie trudności
          const byDifficulty: Record<number, string[]> = {};
          neverDoneExercises.forEach((ex) => {
            if (!byDifficulty[ex.difficulty]) {
              byDifficulty[ex.difficulty] = [];
            }
            byDifficulty[ex.difficulty].push(ex.id);
          });

          // Wybierz poziom trudności (preferuj niższe)
          const difficulties = Object.keys(byDifficulty).map(Number).sort();
          let targetDifficulty = difficulties[0];

          // 70% szans na łatwe, 20% średnie, 10% trudne
          const diffRandom = Math.random();
          if (diffRandom < 0.7 && difficulties[0]) {
            targetDifficulty = difficulties[0];
          } else if (diffRandom < 0.9 && difficulties[1]) {
            targetDifficulty = difficulties[1];
          } else if (difficulties[2]) {
            targetDifficulty = difficulties[2];
          }

          // Wybierz losowe zadanie z tego poziomu
          const candidateIds = byDifficulty[targetDifficulty];
          const randomId =
            candidateIds[Math.floor(Math.random() * candidateIds.length)];

          selectedExercise = await prisma.exercise.findUnique({
            where: { id: randomId },
          });
        }
      }

      // 30% szans - Zadania ze słabych kategorii
      if (!selectedExercise) {
        // Analiza słabych kategorii użytkownika
        const weakCategoriesRaw = await prisma.$queryRaw<any[]>`
          SELECT 
            e.category,
            AVG(CAST(s.score AS FLOAT)) as avg_score,
            COUNT(*)::int as attempts
          FROM "Submission" s
          JOIN "Exercise" e ON s."exerciseId" = e.id
          WHERE s."userId" = ${userId} 
            AND s.score IS NOT NULL
            AND s."createdAt" > ${fourteenDaysAgo}
          GROUP BY e.category
          HAVING AVG(CAST(s.score AS FLOAT)) < 70
          ORDER BY AVG(CAST(s.score AS FLOAT)) ASC
        `;

        if (weakCategoriesRaw.length > 0) {
          // Wybierz losową słabą kategorię
          const randomCategory =
            weakCategoriesRaw[
              Math.floor(Math.random() * Math.min(3, weakCategoriesRaw.length))
            ];

          const weakExercises = await prisma.exercise.findMany({
            where: {
              category: randomCategory.category,
              id: { notIn: Array.from(excludedExerciseIds) },
            },
            take: 10, // Pobierz 10 kandydatów
          });

          if (weakExercises.length > 0) {
            // Wybierz losowe zadanie
            selectedExercise =
              weakExercises[Math.floor(Math.random() * weakExercises.length)];
          }
        }
      }

      // KROK 3: Fallback - stare zadania (sprzed 7 dni)
      if (!selectedExercise) {
        const oldSubmissions = await prisma.submission.findMany({
          where: {
            userId,
            createdAt: { lt: sevenDaysAgo },
            score: { lt: 100 }, // Tylko te które nie były perfekcyjne
          },
          select: {
            exerciseId: true,
            score: true,
          },
          orderBy: { score: "asc" }, // Najpierw najsłabsze
          take: 20,
        });

        if (oldSubmissions.length > 0) {
          // Shuffle i wybierz
          const shuffled = oldSubmissions
            .filter((s) => !excludedExerciseIds.has(s.exerciseId))
            .sort(() => Math.random() - 0.5);

          if (shuffled.length > 0) {
            selectedExercise = await prisma.exercise.findUnique({
              where: { id: shuffled[0].exerciseId },
            });
          }
        }
      }

      // KROK 4: Ostateczny fallback - losowe zadanie
      if (!selectedExercise) {
        // Pobierz wszystkie dostępne zadania
        const allAvailable = await prisma.exercise.findMany({
          where: {
            id: { notIn: Array.from(excludedExerciseIds) },
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
            "No exercises available - clearing memory and restarting"
          );
          skippedInSession.clear();
          recentExercises.length = 0;

          // Wybierz całkowicie losowe zadanie
          const count = await prisma.exercise.count();
          const skip = Math.floor(Math.random() * count);
          selectedExercise = await prisma.exercise.findFirst({
            skip,
            take: 1,
          });
        }
      }

      // Zapisz pokazane zadanie w pamięci
      if (selectedExercise) {
        recentExercises.push(selectedExercise.id);
        // Ogranicz pamięć do ostatnich MAX_RECENT_MEMORY zadań
        if (recentExercises.length > MAX_RECENT_MEMORY) {
          recentExercises.shift();
        }

        console.log(
          `Selected exercise ${
            selectedExercise.id
          } for user ${userId} (strategy: random=${random.toFixed(2)})`
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

  // Get learning stats - NAPRAWIONY BigInt problem
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

      // Recent sessions - NAPRAWIONE: Konwersja BigInt na Number
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

      // Convert BigInt to Number and format data
      const recentSessions = recentSessionsRaw.map((session) => ({
        date: new Date(session.date).toISOString().split("T")[0],
        completed: Number(session.completed),
        correctRate: Math.round(Number(session.correctRate || 0)),
        points: Number(session.points),
        duration: Math.round(Number(session.duration_seconds || 0) / 60), // Convert to minutes
      }));

      // User profile
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

  // Get user progress - NAPRAWIONE BigInt problem
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

      // Convert BigInt to Number
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

      // Convert BigInt to Number
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
