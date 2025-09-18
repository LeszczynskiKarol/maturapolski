// backend/src/routes/learning.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { SpacedRepetitionService } from "../services/spacedRepetitionService";

const sessionSkippedExercises = new Map<string, Set<string>>();
const spacedRepetition = new SpacedRepetitionService();

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

      // Inicjalizuj set pominiętych zadań dla użytkownika jeśli nie istnieje
      if (!sessionSkippedExercises.has(userId)) {
        sessionSkippedExercises.set(userId, new Set());
      }

      const skippedInSession = sessionSkippedExercises.get(userId)!;

      // Jeśli przekazano ID do wykluczenia (pominięte zadanie), dodaj do setu
      if (excludeId) {
        skippedInSession.add(excludeId);
        console.log(
          `User ${userId} skipped exercise ${excludeId}. Total skipped: ${skippedInSession.size}`
        );
      }

      // KROK 1: Pobierz zadania z ostatnich 7 dni + pominięte w tej sesji
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const recentSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
        select: {
          exerciseId: true,
          createdAt: true,
          score: true,
        },
      });

      // Lista ID zadań do wykluczenia (z ostatnich 7 dni + pominięte w sesji)
      const excludedExerciseIds = [
        ...recentSubmissions.map((s) => s.exerciseId),
        ...Array.from(skippedInSession), // Dodaj pominięte w tej sesji
      ];

      console.log(
        `Excluding ${excludedExerciseIds.length} exercises (${recentSubmissions.length} from last 7 days, ${skippedInSession.size} skipped in session)`
      );

      // KROK 2: Znajdź zadania których użytkownik NIGDY nie robił i nie pominął
      const neverDoneExercise = await prisma.exercise.findFirst({
        where: {
          id: {
            notIn: excludedExerciseIds, // Wyklucz także pominięte
          },
          NOT: {
            submissions: {
              some: { userId },
            },
          },
        },
        orderBy: [{ difficulty: "asc" }, { createdAt: "desc" }],
      });

      if (neverDoneExercise) {
        console.log(`Found new exercise: ${neverDoneExercise.id}`);
        return reply.send(neverDoneExercise);
      }

      // KROK 3: Znajdź stare zadania (spoza 7 dni i niepominięte)
      const anyOldExercise = await prisma.exercise.findFirst({
        where: {
          id: {
            notIn: excludedExerciseIds,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (anyOldExercise) {
        console.log(`Found old exercise: ${anyOldExercise.id}`);
        return reply.send(anyOldExercise);
      }

      // KROK 4: Jeśli wszystko pominięte/zrobione, wyczyść listę pominiętych i zacznij od nowa
      console.log("All exercises done or skipped - clearing skip list");
      skippedInSession.clear();

      // Spróbuj znaleźć jakiekolwiek zadanie
      const anyExercise = await prisma.exercise.findFirst({
        where: {
          id: {
            notIn: recentSubmissions.map((s) => s.exerciseId), // Wyklucz tylko te z ostatnich 7 dni
          },
        },
        orderBy: { createdAt: "desc" },
      });

      if (anyExercise) {
        return reply.send(anyExercise);
      }

      // Ostateczność - losowe
      const count = await prisma.exercise.count();
      const skip = Math.floor(Math.random() * count);
      const randomExercise = await prisma.exercise.findFirst({
        skip,
        take: 1,
      });

      console.log(`Last resort - random exercise: ${randomExercise?.id}`);
      return reply.send(randomExercise);
    } catch (error) {
      console.error("Error getting next exercise:", error);
      return reply.code(500).send({ error: "Failed to get next exercise" });
    }
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
      console.log(`Cleared skipped exercises for user ${userId}`);
    }
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
