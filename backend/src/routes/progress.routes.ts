// backend/src/routes/progress.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function progressRoutes(fastify: FastifyInstance) {
  // Get user progress stats
  fastify.get("/progress", async (request) => {
    const userId = (request.user as any).userId;

    const stats = await prisma.userProfile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            submissions: {
              include: {
                exercise: true,
              },
            },
          },
        },
      },
    });

    const submissions = stats?.user.submissions || [];

    // Calculate statistics
    const totalExercises = await prisma.exercise.count();
    const completedExercises = submissions.length;
    const averageScore =
      submissions.length > 0
        ? submissions.reduce((acc, s) => acc + (s.score || 0), 0) /
          submissions.length
        : 0;

    // Category performance
    const categoryStats = await prisma.$queryRaw`
      SELECT 
        e.category,
        COUNT(DISTINCT s.id) as attempts,
        AVG(s.score) as average_score
      FROM "Exercise" e
      LEFT JOIN "Submission" s ON e.id = s."exerciseId"
      WHERE s."userId" = ${userId}
      GROUP BY e.category
    `;

    // Progress over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const progressData = await prisma.$queryRaw`
      SELECT 
        DATE(s."createdAt") as date,
        COUNT(*) as exercises,
        AVG(s.score) as score
      FROM "Submission" s
      WHERE s."userId" = ${userId}
        AND s."createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE(s."createdAt")
      ORDER BY date
    `;

    return {
      averageScore: Math.round(averageScore),
      totalPoints: stats?.totalPoints || 0,
      level: stats?.level || 1,
      completedExercises,
      totalExercises,
      studyStreak: stats?.studyStreak || 0,
      categoryPerformance: categoryStats,
      progressData,
      scoreChange: 5.2, // Mock - calculate real change
      totalTime: 4320, // Mock - track real time
    };
  });

  // Get exercise history
  fastify.get("/history", async (request) => {
    const userId = (request.user as any).userId;
    const { limit = 20, offset = 0 } = request.query as any;

    const history = await prisma.submission.findMany({
      where: { userId },
      include: {
        exercise: true,
        assessment: true,
      },
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    return history.map((item) => ({
      id: item.id,
      exerciseName: item.exercise.question,
      category: item.exercise.category,
      score: item.score || 0,
      timeAgo: getTimeAgo(item.createdAt),
      date: item.createdAt,
    }));
  });

  // Update study streak
  fastify.post("/update-streak", async (request, reply) => {
    const userId = (request.user as any).userId;

    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return reply.code(404).send({ error: "Profile not found" });
    }

    const lastActivity = profile.updatedAt;
    const now = new Date();
    const hoursSinceLastActivity =
      (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);

    let newStreak = profile.studyStreak;
    if (hoursSinceLastActivity < 48) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    await prisma.userProfile.update({
      where: { userId },
      data: { studyStreak: newStreak },
    });

    return { streak: newStreak };
  });
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "przed chwilą";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min temu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} godz. temu`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} dni temu`;

  return date.toLocaleDateString("pl-PL");
}
