// backend/src/routes/studyPlan.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { StudentService } from "../services/studentService";

export async function studyPlanRoutes(fastify: FastifyInstance) {
  const studentService = new StudentService();

  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Get personalized study plan
  fastify.get("/plan", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      const plan = await studentService.getStudyPlan(userId);

      if (!plan) {
        return reply.code(404).send({
          error: "No study plan available",
          message:
            "Please set your exam date in settings to generate a personalized study plan",
        });
      }

      return reply.send(plan);
    } catch (error) {
      console.error("Error getting study plan:", error);
      return reply.code(500).send({ error: "Failed to get study plan" });
    }
  });

  // Update exam date and regenerate plan
  fastify.put("/exam-date", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { examDate } = request.body as { examDate: string };

      // Update user profile with exam date
      await prisma.userProfile.upsert({
        where: { userId },
        update: { examDate: new Date(examDate) },
        create: {
          userId,
          examDate: new Date(examDate),
          level: 1,
          totalPoints: 0,
          studyStreak: 0,
        },
      });

      // Generate new study plan
      const plan = await studentService.getStudyPlan(userId);

      return reply.send({
        success: true,
        message: "Exam date updated successfully",
        plan,
      });
    } catch (error) {
      console.error("Error updating exam date:", error);
      return reply.code(500).send({ error: "Failed to update exam date" });
    }
  });

  // Get weekly tasks
  fastify.get("/weekly-tasks", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.query as { week?: number };

      const plan = await studentService.getStudyPlan(userId);

      if (!plan) {
        return reply.code(404).send({ error: "No study plan available" });
      }

      const currentWeek = week || plan.currentWeek;
      const weekPlan = plan.plan.find((w) => w.week === currentWeek);

      if (!weekPlan) {
        return reply.code(404).send({ error: "Week not found in plan" });
      }

      // Get exercises for this week's focus area
      const exercises = await prisma.exercise.findMany({
        where: {
          category: weekPlan.focus as any,
        },
        take: 20,
        orderBy: { difficulty: "asc" },
      });

      // Get user's progress on these exercises
      const submissions = await prisma.submission.findMany({
        where: {
          userId,
          exerciseId: { in: exercises.map((e) => e.id) },
        },
      });

      const exercisesWithProgress = exercises.map((exercise) => {
        const submission = submissions.find(
          (s) => s.exerciseId === exercise.id
        );
        return {
          ...exercise,
          completed: !!submission,
          score: submission?.score || null,
          lastAttempt: submission?.createdAt || null,
        };
      });

      return reply.send({
        week: currentWeek,
        focus: weekPlan.focus,
        goals: weekPlan.goals,
        estimatedTime: weekPlan.estimatedTime,
        exercises: exercisesWithProgress,
        completionRate: (submissions.length / exercises.length) * 100,
      });
    } catch (error) {
      console.error("Error getting weekly tasks:", error);
      return reply.code(500).send({ error: "Failed to get weekly tasks" });
    }
  });

  // Mark week as completed
  fastify.post("/complete-week", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.body as { week: number };

      // Save week completion to database
      await prisma.weeklyProgress.create({
        data: {
          userId,
          week,
          completed: true,
          completedAt: new Date(),
        },
      });

      return reply.send({
        success: true,
        message: `Week ${week} marked as completed`,
      });
    } catch (error) {
      console.error("Error marking week as completed:", error);
      return reply
        .code(500)
        .send({ error: "Failed to mark week as completed" });
    }
  });
}
