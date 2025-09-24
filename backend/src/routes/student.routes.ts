// backend/src/routes/student.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

// Helper function to convert BigInt to Number safely
function convertBigIntToNumber(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return Number(obj);
  if (Array.isArray(obj)) return obj.map(convertBigIntToNumber);
  if (typeof obj === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertBigIntToNumber(value);
    }
    return result;
  }
  return obj;
}

export async function studentRoutes(fastify: FastifyInstance) {
  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Get student stats
  fastify.get("/stats", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      // Today's stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [todaySubmissions, totalSubmissions, userProfile] =
        await Promise.all([
          prisma.submission.findMany({
            where: {
              userId,
              createdAt: { gte: today },
            },
          }),

          prisma.submission.count({
            where: { userId },
          }),

          prisma.userProfile.findUnique({
            where: { userId },
          }),
        ]);

      const todayExercises = todaySubmissions.length;
      const todayCorrect = todaySubmissions.filter(
        (s) => (s.score || 0) > 0
      ).length;

      // Calculate average score
      const avgScoreResult = await prisma.submission.aggregate({
        where: {
          userId,
          score: { not: null },
        },
        _avg: { score: true },
        _count: { score: true },
      });

      const stats = {
        todayExercises,
        todayCorrect,
        totalSubmissions: Number(totalSubmissions), // Convert BigInt
        streak: userProfile?.studyStreak || 0,
        level: userProfile?.level || 1,
        totalPoints: userProfile?.totalPoints || 0,
        averageScore: avgScoreResult._avg.score || 0,
        completedExercises: avgScoreResult._count.score || 0,
      };

      return reply.send(stats);
    } catch (error) {
      console.error("Error getting student stats:", error);
      return reply.code(500).send({ error: "Failed to get student stats" });
    }
  });

  // Get student progress
  fastify.get("/progress", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      // Pobierz profil użytkownika
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      // 1. STATYSTYKI OGÓLNE
      const [
        totalExercises,
        completedExercises,
        examSessions,
        learningSessions,
      ] = await Promise.all([
        prisma.exercise.count(),
        prisma.submission.count({ where: { userId } }),
        prisma.examSession.count({
          where: { userId, status: "COMPLETED" },
        }),
        prisma.learningSession.count({
          where: { userId, status: "COMPLETED" },
        }),
      ]);

      // 2. DANE DO WYKRESU POSTĘPU W CZASIE (ostatnie 30 dni)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const dailyProgress = await prisma.dailyProgress.findMany({
        where: {
          userId,
          date: { gte: thirtyDaysAgo },
        },
        orderBy: { date: "asc" },
      });

      const progressData = dailyProgress.map((day) => ({
        date: day.date.toISOString().split("T")[0],
        score: Math.round(day.averageScore || 0),
        exercises: day.exercisesCount,
      }));

      // 3. WYDAJNOŚĆ WG KATEGORII (dla wykresu radarowego)
      const categories = ["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"];
      const categoryPerformance = await Promise.all(
        categories.map(async (category) => {
          const submissions = await prisma.submission.findMany({
            where: {
              userId,
              exercise: { category: category as any },
            },
            select: { score: true },
          });

          const avgScore =
            submissions.length > 0
              ? submissions.reduce((sum, s) => sum + (s.score || 0), 0) /
                submissions.length
              : 0;

          // Pobierz średnią globalną dla porównania
          const globalAvg = await prisma.submission.aggregate({
            where: {
              exercise: { category: category as any },
            },
            _avg: { score: true },
          });

          return {
            category:
              category === "LANGUAGE_USE"
                ? "Język w użyciu"
                : category === "HISTORICAL_LITERARY"
                ? "Test historycznoliteracki"
                : "Pisanie",
            score: Math.round(avgScore * 20), // Przekształć na skalę 0-100
            average: Math.round((globalAvg._avg.score || 0) * 20),
          };
        })
      );

      // 4. STATYSTYKI TRUDNOŚCI
      const difficultyStats = await Promise.all(
        [1, 2, 3, 4, 5].map(async (difficulty) => {
          const submissions = await prisma.submission.findMany({
            where: {
              userId,
              exercise: { difficulty },
            },
          });

          const completed = submissions.filter(
            (s) => (s.score || 0) > 0
          ).length;
          const failed = submissions.filter((s) => s.score === 0).length;

          return {
            difficulty: `Poziom ${difficulty}`,
            completed,
            failed,
          };
        })
      );

      // 5. ROZKŁAD CZASU NA KATEGORIE
      const timeByCategory = await Promise.all(
        categories.map(async (category) => {
          const submissions = await prisma.submission.findMany({
            where: {
              userId,
              exercise: { category: category as any },
            },
            select: { timeSpent: true },
          });

          const totalTime = submissions.reduce(
            (sum, s) => sum + (s.timeSpent || 0),
            0
          );

          return {
            name:
              category === "LANGUAGE_USE"
                ? "Język w użyciu"
                : category === "HISTORICAL_LITERARY"
                ? "Test historycznoliteracki"
                : "Pisanie",
            value: Math.round(totalTime / 60), // minuty
          };
        })
      );

      // 6. HISTORIA OSTATNICH AKTYWNOŚCI
      const recentSubmissions = await prisma.submission.findMany({
        where: { userId },
        include: {
          exercise: {
            select: {
              question: true,
              category: true,
              points: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      });

      const history = recentSubmissions.map((sub) => ({
        id: sub.id,
        exerciseName: sub.exercise.question.substring(0, 50) + "...",
        category: sub.exercise.category,
        score: Math.round(((sub.score || 0) / sub.exercise.points) * 100),
        timeAgo: getTimeAgo(sub.createdAt),
      }));

      // 7. OBLICZ ŚREDNI WYNIK
      const allScores = await prisma.submission.findMany({
        where: {
          userId,
          score: { not: null },
        },
        select: { score: true },
        orderBy: { createdAt: "desc" },
        take: 100,
      });

      const averageScore =
        allScores.length > 0
          ? Math.round(
              allScores.reduce((sum, s) => sum + (s.score || 0), 0) /
                allScores.length
            )
          : 0;

      // Sprawdź zmianę wyniku
      const lastWeekScores = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          score: { not: null },
        },
        select: { score: true },
      });

      const lastWeekAvg =
        lastWeekScores.length > 0
          ? lastWeekScores.reduce((sum, s) => sum + (s.score || 0), 0) /
            lastWeekScores.length
          : 0;

      const scoreChange = averageScore - lastWeekAvg;

      // 8. OBLICZ CAŁKOWITY CZAS NAUKI (w tym miesiącu)
      const thisMonth = new Date();
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      const monthlyTime = await prisma.dailyProgress.aggregate({
        where: {
          userId,
          date: { gte: thisMonth },
        },
        _sum: { studyTime: true },
      });

      return reply.send({
        // Podstawowe statystyki
        averageScore,
        scoreChange: Math.round(scoreChange),
        totalPoints: userProfile?.totalPoints || 0,
        level: userProfile?.level || 1,
        completedExercises,
        totalExercises,
        totalTime: monthlyTime._sum.studyTime || 0,

        // Dane do wykresów
        progressData,
        categoryPerformance,
        difficultyStats,
        timeDistribution: timeByCategory,

        // Historia
        history,
      });
    } catch (error) {
      console.error("Error getting progress:", error);
      return reply.code(500).send({ error: "Failed to get progress data" });
    }
  });

  // Get recent notifications
  fastify.get("/notifications", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { limit = 10 } = request.query as { limit?: number };

      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
      });

      return reply.send(notifications);
    } catch (error) {
      console.error("Error getting notifications:", error);
      return reply.code(500).send({ error: "Failed to get notifications" });
    }
  });

  // Mark notification as read
  fastify.put("/notifications/:id/read", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const userId = (request.user as any).userId;

      const notification = await prisma.notification.update({
        where: {
          id,
          userId, // Ensure user owns the notification
        },
        data: { read: true },
      });

      return reply.send(notification);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      return reply.code(500).send({ error: "Failed to update notification" });
    }
  });

  // Get detailed history
  fastify.get("/history", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { limit = 50, offset = 0 } = request.query as any;

    const [submissions, exams, sessions] = await Promise.all([
      // Submissions z exercises
      prisma.submission.findMany({
        where: { userId },
        include: {
          exercise: {
            select: {
              question: true,
              category: true,
              type: true,
              difficulty: true,
              points: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),

      // Egzaminy
      prisma.examSession.findMany({
        where: { userId, status: "COMPLETED" },
        include: {
          exam: {
            select: { title: true, type: true },
          },
        },
        orderBy: { finishedAt: "desc" },
        take: 10,
      }),

      // Sesje nauki
      prisma.learningSession.findMany({
        where: { userId, status: "COMPLETED" },
        orderBy: { finishedAt: "desc" },
        take: 10,
      }),
    ]);

    return reply.send({
      exercises: submissions.map((s) => ({
        id: s.id,
        date: s.createdAt,
        question: s.exercise.question,
        category: s.exercise.category,
        type: s.exercise.type,
        difficulty: s.exercise.difficulty,
        score: s.score,
        maxPoints: s.exercise.points,
        percentage: s.score
          ? Math.round((s.score / s.exercise.points) * 100)
          : 0,
      })),
      exams: exams.map((e) => ({
        id: e.id,
        date: e.finishedAt,
        title: e.exam.title,
        type: e.exam.type,
        score: e.percentScore,
        totalPoints: e.totalScore,
      })),
      learningSessions: sessions.map((s) => ({
        id: s.id,
        date: s.finishedAt,
        completed: s.completed,
        correct: s.correct,
        points: s.points,
        timeSpent: Math.round(s.timeSpent / 60),
      })),
    });
  });
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "przed chwilą";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min temu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} godz. temu`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} dni temu`;
  return date.toLocaleDateString("pl-PL");
}
