// backend/src/routes/exam.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { generateExam } from "../services/examGenerator";

export async function examRoutes(fastify: FastifyInstance) {
  // Generate new exam
  fastify.get("/generate", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Get exercises for exam
    const exercises = await prisma.exercise.findMany({
      where: {
        NOT: {
          submissions: {
            some: {
              userId,
              score: { gte: 80 },
            },
          },
        },
      },
      take: 40,
    });

    const exam = {
      id: `exam-${Date.now()}`,
      title: "Egzamin próbny",
      duration: 180,
      questions: exercises.map((e) => ({
        id: e.id,
        text: e.question,
        type: e.type,
        category: e.category,
        points: e.points,
        content: e.content,
        options: (e.content as any).options,
      })),
    };

    return exam;
  });

  // Submit exam
  fastify.post("/submit", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { examId, answers, timeSpent } = request.body as any;

    // Calculate scores
    let totalScore = 0;
    const results = [];

    for (const [questionId, answer] of Object.entries(answers)) {
      const exercise = await prisma.exercise.findUnique({
        where: { id: questionId },
      });

      if (!exercise) continue;

      let score = 0;
      if (
        exercise.type === "CLOSED_SINGLE" ||
        exercise.type === "CLOSED_MULTIPLE"
      ) {
        const isCorrect =
          JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer);
        score = isCorrect ? exercise.points : 0;
      }

      const submission = await prisma.submission.create({
        data: {
          userId,
          exerciseId: questionId,
          answer: answer as any,
          score,
          assessedBy: "SYSTEM",
        },
      });

      results.push({
        questionId,
        score,
        maxScore: exercise.points,
      });

      totalScore += score;
    }

    // Update user stats
    await prisma.userProfile.update({
      where: { userId },
      data: {
        totalPoints: { increment: totalScore },
      },
    });

    return {
      id: examId,
      totalScore,
      results,
      timeSpent,
    };
  });

  // Get exam results
  fastify.get("/results/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const userId = (request.user as any).userId;

    // Mock data - implement real storage
    return {
      id,
      date: new Date(),
      totalScore: 78,
      maxScore: 100,
      timeSpent: 8547,
      categories: [
        { name: "Język w użyciu", score: 85, maxScore: 100 },
        { name: "Test historycznoliteracki", score: 72, maxScore: 100 },
        { name: "Pisanie", score: 78, maxScore: 100 },
      ],
    };
  });
}
