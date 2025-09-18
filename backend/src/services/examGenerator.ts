// backend/src/services/examGenerator.ts

import { prisma } from "../lib/prisma";

interface ExamConfig {
  totalQuestions: number;
  distribution: {
    LANGUAGE_USE: number;
    HISTORICAL_LITERARY: number;
    WRITING: number;
  };
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
}

const DEFAULT_CONFIG: ExamConfig = {
  totalQuestions: 40,
  distribution: {
    LANGUAGE_USE: 15,
    HISTORICAL_LITERARY: 20,
    WRITING: 5,
  },
  difficulty: {
    easy: 10,
    medium: 20,
    hard: 10,
  },
};

export async function generateExam(
  userId: string,
  config: ExamConfig = DEFAULT_CONFIG
) {
  const questions = [];

  // Get exercises by category and difficulty
  for (const [category, count] of Object.entries(config.distribution)) {
    const categoryExercises = await prisma.exercise.findMany({
      where: {
        category: category as any,
        NOT: {
          submissions: {
            some: {
              userId,
              score: { gte: 80 },
            },
          },
        },
      },
      orderBy: [{ difficulty: "asc" }, { createdAt: "desc" }],
      take: count,
    });

    questions.push(...categoryExercises);
  }

  // Shuffle questions
  const shuffled = questions.sort(() => Math.random() - 0.5);

  return {
    id: `exam-${Date.now()}`,
    userId,
    title: "Egzamin próbny - Matura z języka polskiego",
    duration: 180, // minutes
    totalPoints: shuffled.reduce((sum, q) => sum + q.points, 0),
    questions: shuffled.map((q, index) => ({
      id: q.id,
      number: index + 1,
      type: q.type,
      category: q.category,
      difficulty: q.difficulty,
      points: q.points,
      question: q.question,
      content: q.content,
      metadata: q.metadata,
    })),
    createdAt: new Date(),
  };
}

export async function generateAdaptiveExam(userId: string) {
  // Get user's performance data
  const userStats = await prisma.submission.groupBy({
    by: ["exerciseId"],
    where: { userId },
    _avg: { score: true },
  });

  const weakAreas = userStats
    .filter((stat) => (stat._avg.score || 0) < 60)
    .map((stat) => stat.exerciseId);

  // Generate exam focusing on weak areas
  const weakExercises = await prisma.exercise.findMany({
    where: {
      id: { in: weakAreas },
    },
    take: 20,
  });

  const additionalExercises = await prisma.exercise.findMany({
    where: {
      id: { notIn: weakAreas },
      NOT: {
        submissions: {
          some: { userId },
        },
      },
    },
    take: 20,
  });

  return {
    id: `adaptive-exam-${Date.now()}`,
    userId,
    title: "Egzamin adaptacyjny - Dopasowany do Twoich potrzeb",
    type: "ADAPTIVE",
    duration: 180,
    questions: [...weakExercises, ...additionalExercises],
    focusAreas: Array.from(new Set(weakExercises.map((e) => e.category))),
    createdAt: new Date(),
  };
}
