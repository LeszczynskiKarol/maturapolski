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

      // Category progress - using regular Prisma queries instead of raw SQL
      const categories = ["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"];
      const categoryProgress = await Promise.all(
        categories.map(async (category) => {
          const [totalCount, submissionData] = await Promise.all([
            prisma.exercise.count({
              where: { category: category as any },
            }),

            prisma.submission.findMany({
              where: {
                userId,
                exercise: { category: category as any },
              },
              include: { exercise: true },
            }),
          ]);

          const completedExercises = new Set(
            submissionData.map((s) => s.exerciseId)
          ).size;
          const avgScore =
            submissionData.length > 0
              ? submissionData.reduce((sum, s) => sum + (s.score || 0), 0) /
                submissionData.length
              : 0;
          const lastAttempt =
            submissionData.length > 0
              ? submissionData.sort(
                  (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                )[0].createdAt
              : null;

          return {
            category,
            total_exercises: totalCount,
            completed_exercises: completedExercises,
            avg_score: Math.round(avgScore * 100) / 100,
            last_attempt: lastAttempt,
          };
        })
      );

      // Recent activity (last 30 days) - simplified
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: { gte: thirtyDaysAgo },
        },
        orderBy: { createdAt: "desc" },
      });

      // Group by date
      const activityByDate = new Map();
      recentSubmissions.forEach((submission) => {
        const date = submission.createdAt.toISOString().split("T")[0];
        if (!activityByDate.has(date)) {
          activityByDate.set(date, { exercises_completed: 0, scores: [] });
        }
        const dayData = activityByDate.get(date);
        dayData.exercises_completed++;
        if (submission.score !== null) {
          dayData.scores.push(submission.score);
        }
      });

      const recentActivity = Array.from(activityByDate.entries())
        .map(([date, data]) => ({
          date,
          exercises_completed: data.exercises_completed,
          avg_score:
            data.scores.length > 0
              ? Math.round(
                  (data.scores.reduce(
                    (sum: number, score: number) => sum + score,
                    0
                  ) /
                    data.scores.length) *
                    100
                ) / 100
              : 0,
        }))
        .sort((a, b) => b.date.localeCompare(a.date));

      const response = {
        categoryProgress: convertBigIntToNumber(categoryProgress),
        recentActivity: convertBigIntToNumber(recentActivity),
      };

      return reply.send(response);
    } catch (error) {
      console.error("Error getting student progress:", error);
      return reply.code(500).send({ error: "Failed to get student progress" });
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
}
