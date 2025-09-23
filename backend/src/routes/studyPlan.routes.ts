// backend/src/routes/studyPlan.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { differenceInDays } from "date-fns";

export async function studyPlanRoutes(fastify: FastifyInstance) {
  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Get adaptive personalized study plan
  fastify.get("/plan", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile?.examDate) {
        return reply.code(404).send({
          error: "No study plan available",
          message:
            "Ustaw datę matury w ustawieniach, aby wygenerować spersonalizowany plan nauki",
        });
      }

      const now = new Date();
      const daysUntilExam = differenceInDays(profile.examDate, now);

      if (daysUntilExam < 0) {
        return reply.code(400).send({
          error: "Invalid exam date",
          message: "Data egzaminu już minęła",
        });
      }

      const weeksUntilExam = Math.ceil(daysUntilExam / 7);
      const currentWeek = Math.max(
        1,
        Math.min(
          weeksUntilExam,
          Math.ceil(
            (daysUntilExam - differenceInDays(profile.examDate, now)) / 7
          ) + 1
        )
      );

      // Generuj plan tygodniowy
      const plan = await generateWeeklyPlan(
        userId,
        weeksUntilExam,
        daysUntilExam,
        currentWeek
      );

      return reply.send({
        totalWeeks: weeksUntilExam,
        currentWeek,
        plan,
        examDate: profile.examDate.toISOString(),
        daysUntilExam,
      });
    } catch (error) {
      console.error("Error generating study plan:", error);
      return reply.code(500).send({ error: "Failed to generate study plan" });
    }
  });

  // Get detailed weekly tasks with REAL exercises
  fastify.get("/weekly-tasks", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.query as { week?: number };

      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile?.examDate) {
        return reply.code(404).send({ error: "No exam date set" });
      }

      const now = new Date();
      const daysUntilExam = differenceInDays(profile.examDate, now);
      const weeksUntilExam = Math.ceil(daysUntilExam / 7);
      const currentWeek =
        week ||
        Math.max(
          1,
          Math.min(
            weeksUntilExam,
            Math.ceil(
              (daysUntilExam - differenceInDays(profile.examDate, now)) / 7
            ) + 1
          )
        );

      // Określ fazę i intensywność dla tego tygodnia
      const phase = determinePhaseForWeek(
        currentWeek,
        weeksUntilExam,
        daysUntilExam
      );
      const focus = selectFocusForWeek(currentWeek, weeksUntilExam, phase);
      const intensity = getIntensityForPhase(phase);

      // POBIERZ RZECZYWISTE ĆWICZENIA Z BAZY
      const exercises = await getWeekExercises(
        userId,
        focus,
        intensity,
        currentWeek
      );

      // Pobierz postęp użytkownika
      const exerciseIds = exercises.map((e) => e.id);
      const submissions = await prisma.submission.findMany({
        where: {
          userId,
          exerciseId: { in: exerciseIds },
        },
        orderBy: { createdAt: "desc" },
      });

      // Mapuj z postępem
      const exercisesWithProgress = exercises.map((exercise) => {
        const userSubmissions = submissions.filter(
          (s) => s.exerciseId === exercise.id
        );
        const bestSubmission = userSubmissions.reduce((best, current) => {
          if (!best) return current;
          return (current.score || 0) > (best.score || 0) ? current : best;
        }, null as any);

        return {
          ...exercise,
          completed: userSubmissions.length > 0,
          attempts: userSubmissions.length,
          bestScore: bestSubmission?.score || null,
          lastAttempt: userSubmissions[0]?.createdAt || null,
        };
      });

      // Statystyki
      const completedExercises = exercisesWithProgress.filter(
        (e) => e.completed
      ).length;
      const averageScore =
        exercisesWithProgress
          .filter((e) => e.bestScore !== null)
          .reduce((acc, e) => acc + (e.bestScore / e.points) * 100, 0) /
        (completedExercises || 1);

      const goals = getWeeklyGoals(focus, phase, currentWeek, weeksUntilExam);
      const estimatedTime = getEstimatedHours(intensity);

      return reply.send({
        week: currentWeek,
        phase,
        intensity,
        focus: getCategoryDisplayName(focus),
        goals,
        estimatedTime,
        exercises: exercisesWithProgress,
        statistics: {
          totalExercises: exercises.length,
          completedExercises,
          completionRate:
            exercises.length > 0
              ? (completedExercises / exercises.length) * 100
              : 0,
          averageScore: Math.round(averageScore * 10) / 10,
        },
      });
    } catch (error) {
      console.error("Error getting weekly tasks:", error);
      return reply.code(500).send({ error: "Failed to get weekly tasks" });
    }
  });

  // Update exam date and regenerate plan
  fastify.put("/exam-date", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { examDate } = request.body as { examDate: string };

      const parsedDate = new Date(examDate);

      // Walidacja daty
      if (parsedDate <= new Date()) {
        return reply.code(400).send({
          error: "Invalid exam date",
          message: "Data matury musi być w przyszłości",
        });
      }

      // Update user profile with exam date
      await prisma.userProfile.upsert({
        where: { userId },
        update: { examDate: parsedDate },
        create: {
          userId,
          examDate: parsedDate,
          level: 1,
          totalPoints: 0,
          studyStreak: 0,
        },
      });

      // Generate new plan with updated date
      const daysUntilExam = differenceInDays(parsedDate, new Date());
      const weeksUntilExam = Math.ceil(daysUntilExam / 7);
      const currentWeek = 1; // Reset to week 1 after changing date

      const plan = await generateWeeklyPlan(
        userId,
        weeksUntilExam,
        daysUntilExam,
        currentWeek
      );

      return reply.send({
        success: true,
        message: "Data matury zaktualizowana pomyślnie",
        plan: {
          totalWeeks: weeksUntilExam,
          currentWeek,
          plan,
          examDate: parsedDate.toISOString(),
          daysUntilExam,
        },
      });
    } catch (error) {
      console.error("Error updating exam date:", error);
      return reply.code(500).send({ error: "Failed to update exam date" });
    }
  });

  // Mark week as completed
  fastify.post("/complete-week", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.body as { week: number };

      await prisma.weeklyProgress.upsert({
        where: {
          userId_week: { userId, week },
        },
        create: {
          userId,
          week,
          completed: true,
          completedAt: new Date(),
        },
        update: {
          completed: true,
          completedAt: new Date(),
        },
      });

      return reply.send({
        success: true,
        message: `Tydzień ${week} oznaczony jako ukończony`,
      });
    } catch (error) {
      console.error("Error marking week as completed:", error);
      return reply
        .code(500)
        .send({ error: "Failed to mark week as completed" });
    }
  });

  // Start learning session with week's exercises
  fastify.post("/start-week-session", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.body as { week: number };

      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile?.examDate) {
        return reply.code(404).send({ error: "No exam date set" });
      }

      const daysUntilExam = differenceInDays(profile.examDate, new Date());
      const weeksUntilExam = Math.ceil(daysUntilExam / 7);

      // Określ parametry tygodnia
      const phase = determinePhaseForWeek(week, weeksUntilExam, daysUntilExam);
      const focus = selectFocusForWeek(week, weeksUntilExam, phase);
      const intensity = getIntensityForPhase(phase);

      // Ustaw filtry sesji dla tego tygodnia
      const filters = getFiltersForWeek(focus);

      // Zapisz filtry w sesji użytkownika (używane przez learning routes)
      return reply.send({
        success: true,
        week,
        focus: getCategoryDisplayName(focus),
        filters,
        message: "Sesja nauki rozpoczęta z filtrami tygodnia",
      });
    } catch (error) {
      console.error("Error starting week session:", error);
      return reply.code(500).send({ error: "Failed to start week session" });
    }
  });
}

// FUNKCJE POMOCNICZE

async function generateWeeklyPlan(
  userId: string,
  totalWeeks: number,
  daysUntilExam: number,
  currentWeek: number
) {
  const plans = [];

  for (let week = 1; week <= totalWeeks; week++) {
    const phase = determinePhaseForWeek(week, totalWeeks, daysUntilExam);
    const focus = selectFocusForWeek(week, totalWeeks, phase);
    const intensity = getIntensityForPhase(phase);

    // Pobierz liczbę ćwiczeń dla tego tygodnia (nie same ćwiczenia - to zrobimy w weekly-tasks)
    const exerciseCount = await countWeekExercises(userId, focus, intensity);

    plans.push({
      week,
      focus: getCategoryDisplayName(focus),
      goals: getWeeklyGoals(focus, phase, week, totalWeeks),
      exercises: Array(exerciseCount).fill({}), // Placeholder dla liczby
      estimatedTime: getEstimatedHours(intensity),
      completed: false,
      completionRate: 0,
    });
  }

  // Uzupełnij o ukończone tygodnie
  const completedWeeks = await prisma.weeklyProgress.findMany({
    where: { userId, completed: true },
  });

  plans.forEach((week) => {
    const isCompleted = completedWeeks.some((w) => w.week === week.week);
    if (isCompleted) {
      week.completed = true;
    }
  });

  return plans;
}

async function getWeekExercises(
  userId: string,
  focus: string,
  intensity: string,
  week: number
) {
  const categories = mapFocusToCategories(focus);
  const difficulty = getDifficultyForIntensity(intensity);
  const exercisesPerWeek = getExercisesCountForIntensity(intensity);

  console.log(`Getting exercises for week ${week}:`, {
    focus,
    categories,
    difficulty,
    count: exercisesPerWeek,
  });

  // Pobierz historię użytkownika
  const recentSubmissions = await prisma.submission.findMany({
    where: { userId },
    select: { exerciseId: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const recentIds = recentSubmissions.map((s) => s.exerciseId);

  // PRIORYTET 1: Nierobione zadania
  let exercises = await prisma.exercise.findMany({
    where: {
      category: { in: categories },
      difficulty: {
        gte: difficulty.min,
        lte: difficulty.max,
      },
      id: { notIn: recentIds },
    },
    take: Math.ceil(exercisesPerWeek * 0.7), // 70% nowych
    orderBy: [{ difficulty: "asc" }, { createdAt: "desc" }],
  });

  // PRIORYTET 2: Zadania do powtórki (słabe wyniki)
  if (exercises.length < exercisesPerWeek) {
    const repetitionExercises = await prisma.exercise.findMany({
      where: {
        category: { in: categories },
        difficulty: {
          gte: difficulty.min,
          lte: difficulty.max,
        },
        submissions: {
          some: {
            userId,
            score: { lt: 70 },
            createdAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
      },
      take: exercisesPerWeek - exercises.length,
      orderBy: { difficulty: "asc" },
    });

    exercises = [...exercises, ...repetitionExercises];
  }

  // PRIORYTET 3: Jakiekolwiek z kategorii
  if (exercises.length < exercisesPerWeek) {
    const anyExercises = await prisma.exercise.findMany({
      where: {
        category: { in: categories },
        id: { notIn: exercises.map((e) => e.id) },
      },
      take: exercisesPerWeek - exercises.length,
    });

    exercises = [...exercises, ...anyExercises];
  }

  console.log(`Found ${exercises.length} exercises for week ${week}`);
  return exercises;
}

async function countWeekExercises(
  userId: string,
  focus: string,
  intensity: string
) {
  const categories = mapFocusToCategories(focus);
  const difficulty = getDifficultyForIntensity(intensity);

  const count = await prisma.exercise.count({
    where: {
      category: { in: categories },
      difficulty: {
        gte: difficulty.min,
        lte: difficulty.max,
      },
    },
  });

  const target = getExercisesCountForIntensity(intensity);
  return Math.min(count, target);
}

function determinePhaseForWeek(
  week: number,
  totalWeeks: number,
  daysUntilExam: number
): string {
  const weekPercentage = (week / totalWeeks) * 100;

  if (daysUntilExam <= 7) {
    return "SPRINT";
  }

  if (daysUntilExam <= 30) {
    if (weekPercentage <= 70) return "INTENSIVE_REVIEW";
    return "FINAL_SPRINT";
  }

  if (daysUntilExam <= 90) {
    if (weekPercentage <= 40) return "GAP_FILLING";
    if (weekPercentage <= 80) return "WRITING_PRACTICE";
    return "PRE_EXAM_REVIEW";
  }

  if (weekPercentage <= 25) return "FOUNDATION";
  if (weekPercentage <= 60) return "DEVELOPMENT";
  if (weekPercentage <= 85) return "INTENSIFICATION";
  return "FINAL_REVIEW";
}

function selectFocusForWeek(
  week: number,
  totalWeeks: number,
  phase: string
): string {
  if (week >= totalWeeks - 1) return "REVISION";
  if (week >= totalWeeks - 4) return "WEAK_POINTS";

  const phaseTopics: Record<string, string[]> = {
    FOUNDATION: ["LANGUAGE_USE", "LITERARY_EPOCHS", "HISTORICAL_LITERARY"],
    DEVELOPMENT: ["HISTORICAL_LITERARY", "WRITING", "LANGUAGE_USE"],
    INTENSIFICATION: ["WRITING", "WEAK_POINTS", "HISTORICAL_LITERARY"],
    FINAL_REVIEW: ["REVISION", "MOCK_EXAMS", "WEAK_POINTS"],
    GAP_FILLING: ["WEAK_POINTS", "HISTORICAL_LITERARY", "LANGUAGE_USE"],
    WRITING_PRACTICE: ["WRITING", "LANGUAGE_USE", "HISTORICAL_LITERARY"],
    PRE_EXAM_REVIEW: ["REVISION", "MOCK_EXAMS"],
    INTENSIVE_REVIEW: ["WRITING", "WEAK_POINTS"],
    FINAL_SPRINT: ["MOCK_EXAMS", "REVISION"],
    SPRINT: ["REVISION", "MOCK_EXAMS", "WEAK_POINTS"],
  };

  const topics = phaseTopics[phase] || [
    "LANGUAGE_USE",
    "HISTORICAL_LITERARY",
    "WRITING",
  ];
  return topics[week % topics.length];
}

function mapFocusToCategories(focus: string): any[] {
  const mapping: Record<string, any[]> = {
    LANGUAGE_USE: ["LANGUAGE_USE" as any],
    HISTORICAL_LITERARY: ["HISTORICAL_LITERARY" as any],
    WRITING: ["WRITING" as any],
    WEAK_POINTS: [
      "LANGUAGE_USE" as any,
      "HISTORICAL_LITERARY" as any,
      "WRITING" as any,
    ],
    REVISION: [
      "LANGUAGE_USE" as any,
      "HISTORICAL_LITERARY" as any,
      "WRITING" as any,
    ],
    MOCK_EXAMS: ["WRITING" as any, "HISTORICAL_LITERARY" as any],
    LITERARY_EPOCHS: ["HISTORICAL_LITERARY" as any],
  };

  return mapping[focus] || ["LANGUAGE_USE" as any];
}

function getIntensityForPhase(phase: string): string {
  const intensityMap: Record<string, string> = {
    FOUNDATION: "LOW",
    DEVELOPMENT: "MEDIUM",
    INTENSIFICATION: "HIGH",
    FINAL_REVIEW: "CRITICAL",
    GAP_FILLING: "MEDIUM",
    WRITING_PRACTICE: "HIGH",
    PRE_EXAM_REVIEW: "CRITICAL",
    INTENSIVE_REVIEW: "HIGH",
    FINAL_SPRINT: "CRITICAL",
    SPRINT: "CRITICAL",
  };

  return intensityMap[phase] || "MEDIUM";
}

function getDifficultyForIntensity(intensity: string): {
  min: number;
  max: number;
} {
  const difficultyMap: Record<string, { min: number; max: number }> = {
    LOW: { min: 1, max: 2 },
    MEDIUM: { min: 2, max: 3 },
    HIGH: { min: 3, max: 4 },
    CRITICAL: { min: 3, max: 5 },
  };

  return difficultyMap[intensity] || { min: 1, max: 5 };
}

function getExercisesCountForIntensity(intensity: string): number {
  const countMap: Record<string, number> = {
    LOW: 21, // 3 dziennie * 7 dni
    MEDIUM: 35, // 5 dziennie * 7 dni
    HIGH: 49, // 7 dziennie * 7 dni
    CRITICAL: 70, // 10 dziennie * 7 dni
  };

  return countMap[intensity] || 35;
}

function getEstimatedHours(intensity: string): number {
  const hoursMap: Record<string, number> = {
    LOW: 10.5,
    MEDIUM: 14,
    HIGH: 21,
    CRITICAL: 28,
  };

  return hoursMap[intensity] || 14;
}

function getCategoryDisplayName(category: string): string {
  const names: Record<string, string> = {
    LANGUAGE_USE: "Język Polski",
    HISTORICAL_LITERARY: "Historia i Literatura",
    WRITING: "Pisanie Wypracowań",
    WEAK_POINTS: "Słabe Punkty",
    REVISION: "Powtórka Materiału",
    MOCK_EXAMS: "Egzaminy Próbne",
    LITERARY_EPOCHS: "Epoki Literackie",
  };
  return names[category] || category;
}

function getWeeklyGoals(
  focus: string,
  phase: string,
  week: number,
  totalWeeks: number
): string[] {
  const goals: Record<string, string[]> = {
    LANGUAGE_USE: [
      "Opanuj środki stylistyczne",
      "Ćwicz analizę językową tekstów",
      "Rozwiąż minimum 5 zadań dziennie",
    ],
    HISTORICAL_LITERARY: [
      "Powtórz epoki literackie",
      "Przeanalizuj kluczowe teksty",
      "Naucz się ważnych cytatów",
    ],
    WRITING: [
      "Napisz 2 wypracowania",
      "Ćwicz interpretację tekstu",
      "Pracuj nad kompozycją",
    ],
    WEAK_POINTS: [
      "Skup się na najsłabszych obszarach",
      "Powtórz błędnie rozwiązane zadania",
      "Zrób dodatkowe ćwiczenia",
    ],
    REVISION: [
      "Powtórz cały materiał",
      "Rozwiąż arkusze maturalne",
      "Sprawdź poziom przygotowania",
    ],
    MOCK_EXAMS: [
      "Rozwiąż pełny arkusz maturalny",
      "Pracuj w warunkach egzaminacyjnych",
      "Przeanalizuj błędy",
    ],
    LITERARY_EPOCHS: [
      "Powtórz charakterystykę epok",
      "Naucz się kluczowych dat",
      "Zapamiętaj głównych przedstawicieli",
    ],
  };

  let selectedGoals = goals[focus] || ["Realizuj plan tygodniowy"];

  if (week === totalWeeks) {
    selectedGoals = [
      ...selectedGoals.slice(0, 2),
      "Odpocznij dzień przed egzaminem",
    ];
  }

  return selectedGoals;
}

function getFiltersForWeek(focus: string): any {
  const categories = mapFocusToCategories(focus);

  // Jeśli tylko jedna kategoria - zwróć jako string
  // Jeśli wiele - możesz zwrócić tablicę lub pierwszą
  if (categories.length === 1) {
    return { category: categories[0] };
  } else if (categories.length > 1) {
    // Dla WEAK_POINTS, REVISION itp. - wybierz losową kategorię
    // lub zwróć wszystkie
    return {
      category: categories[0], // Lub Math.random() do losowania
    };
  }

  return { category: "LANGUAGE_USE" }; // Fallback
}
