// backend/src/routes/studyPlan.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { differenceInDays } from "date-fns";

const EXERCISES_PER_SESSION = 20;
const SESSIONS_PER_WEEK = 4; // 70 zadań / 20 = ~3.5, zaokrąglamy do 4
const EXERCISES_PER_WEEK = EXERCISES_PER_SESSION * SESSIONS_PER_WEEK; // 80 zadań max

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

      // Oblicz aktualny tydzień
      const startDate = new Date(profile.examDate);
      startDate.setDate(startDate.getDate() - weeksUntilExam * 7);
      const daysSinceStart = differenceInDays(now, startDate);
      const currentWeek = Math.max(
        1,
        Math.min(weeksUntilExam, Math.ceil(daysSinceStart / 7) + 1)
      );

      // Generuj plan tygodniowy
      const plan = await generateWeeklyPlan(
        userId,
        weeksUntilExam,
        daysUntilExam,
        currentWeek
      );

      // Dodaj informacje o postępie dla każdego tygodnia
      for (const weekPlan of plan) {
        const weekProgress = await prisma.weeklyProgress.findUnique({
          where: {
            userId_week: { userId, week: weekPlan.week },
          },
        });

        if (weekProgress) {
          weekPlan.sessionsCompleted = weekProgress.sessionsCompleted;
          weekPlan.completedExercises = weekProgress.completedExercises;
          weekPlan.completed = weekProgress.completed;
          weekPlan.completionRate = Math.round(
            (weekProgress.completedExercises / weekProgress.targetExercises) *
              100
          );
        } else {
          // Utwórz wpis progress dla tego tygodnia jeśli nie istnieje
          await prisma.weeklyProgress.create({
            data: {
              userId,
              week: weekPlan.week,
              targetExercises: weekPlan.totalExercises,
              sessionsRequired: weekPlan.sessionsRequired,
            },
          });
        }
      }

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

  // Get week progress details
  fastify.get("/week/:week/progress", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.params as { week: string };
      const weekNumber = parseInt(week);

      const progress = await prisma.weeklyProgress.findUnique({
        where: {
          userId_week: { userId, week: weekNumber },
        },
      });

      if (!progress) {
        return reply.send({
          week: weekNumber,
          completedExercises: 0,
          targetExercises: EXERCISES_PER_WEEK,
          sessionsCompleted: 0,
          sessionsRequired: SESSIONS_PER_WEEK,
          completionRate: 0,
        });
      }

      // Pobierz sesje związane z tym tygodniem
      const sessions = await prisma.learningSession.findMany({
        where: {
          userId,
          weekNumber,
          status: "COMPLETED",
        },
        select: {
          id: true,
          completed: true,
          correct: true,
          points: true,
          finishedAt: true,
        },
      });

      return reply.send({
        ...progress,
        completionRate: Math.round(
          (progress.completedExercises / progress.targetExercises) * 100
        ),
        sessions,
      });
    } catch (error) {
      console.error("Error getting week progress:", error);
      return reply.code(500).send({ error: "Failed to get week progress" });
    }
  });

  // Start week session - KLUCZOWA ZMIANA
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

      // Sprawdź postęp tygodnia
      const weekProgress = await prisma.weeklyProgress.findUnique({
        where: {
          userId_week: { userId, week },
        },
      });

      if (weekProgress && weekProgress.completed) {
        return reply.code(400).send({
          error: "Week already completed",
          message: "Ten tydzień został już ukończony",
        });
      }

      // Określ parametry tygodnia
      const phase = determinePhaseForWeek(week, weeksUntilExam, daysUntilExam);
      const focus = selectFocusForWeek(week, weeksUntilExam, phase);
      const filters = getFiltersForWeek(focus, week);

      // Zapisz filtry w formacie zgodnym z LearningSession
      const sessionFilters = {
        ...filters,
        weekNumber: week,
        isWeekPlan: true,
      };

      return reply.send({
        success: true,
        week,
        focus: getCategoryDisplayName(focus),
        filters: sessionFilters,
        sessionsCompleted: weekProgress?.sessionsCompleted || 0,
        sessionsRequired: SESSIONS_PER_WEEK,
        message: `Rozpocznij sesję ${
          (weekProgress?.sessionsCompleted || 0) + 1
        } z ${SESSIONS_PER_WEEK} w tym tygodniu`,
      });
    } catch (error) {
      console.error("Error starting week session:", error);
      return reply.code(500).send({ error: "Failed to start week session" });
    }
  });

  // Update week progress - wywoływane po zakończeniu sesji
  fastify.post("/week/:week/update-progress", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.params as { week: string };
      const { exercisesCompleted, sessionId } = request.body as {
        exercisesCompleted: number;
        sessionId: string;
      };

      const weekNumber = parseInt(week);

      const progress = await prisma.weeklyProgress.upsert({
        where: {
          userId_week: { userId, week: weekNumber },
        },
        create: {
          userId,
          week: weekNumber,
          completedExercises: exercisesCompleted,
          sessionsCompleted: 1,
          targetExercises: EXERCISES_PER_WEEK,
          sessionsRequired: SESSIONS_PER_WEEK,
        },
        update: {
          completedExercises: {
            increment: exercisesCompleted,
          },
          sessionsCompleted: {
            increment: 1,
          },
        },
      });

      // Sprawdź czy tydzień jest ukończony
      const isWeekComplete =
        progress.completedExercises >= progress.targetExercises * 0.8 || // 80% zadań
        progress.sessionsCompleted >= progress.sessionsRequired; // Wszystkie sesje

      if (isWeekComplete && !progress.completed) {
        await prisma.weeklyProgress.update({
          where: {
            userId_week: { userId, week: weekNumber },
          },
          data: {
            completed: true,
            completedAt: new Date(),
          },
        });
      }

      return reply.send({
        success: true,
        weekProgress: {
          ...progress,
          isComplete: isWeekComplete,
        },
      });
    } catch (error) {
      console.error("Error updating week progress:", error);
      return reply.code(500).send({ error: "Failed to update week progress" });
    }
  });

  // Get weekly tasks with sessions info
  fastify.get("/weekly-tasks", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { week } = request.query as { week?: string };

      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile?.examDate) {
        return reply.code(404).send({ error: "No exam date set" });
      }

      const now = new Date();
      const daysUntilExam = differenceInDays(profile.examDate, now);
      const weeksUntilExam = Math.ceil(daysUntilExam / 7);
      const currentWeek = week
        ? parseInt(String(week))
        : calculateCurrentWeek(profile.examDate, weeksUntilExam);

      // Określ fazę i intensywność dla tego tygodnia
      const phase = determinePhaseForWeek(
        currentWeek,
        weeksUntilExam,
        daysUntilExam
      );
      const focus = selectFocusForWeek(currentWeek, weeksUntilExam, phase);
      const intensity = getIntensityForPhase(phase);

      // Pobierz postęp tygodnia
      const weekProgress = await prisma.weeklyProgress.findUnique({
        where: {
          userId_week: { userId, week: currentWeek },
        },
      });

      // Pobierz sesje związane z tym tygodniem
      const weekSessions = await prisma.learningSession.findMany({
        where: {
          userId,
          weekNumber: currentWeek,
        },
        orderBy: { startedAt: "desc" },
      });

      const goals = getWeeklyGoals(focus, phase, currentWeek, weeksUntilExam);
      const estimatedTime = getEstimatedHours(intensity);

      return reply.send({
        week: currentWeek,
        phase,
        intensity,
        focus: getCategoryDisplayName(focus),
        goals,
        estimatedTime,
        totalExercises: EXERCISES_PER_WEEK,
        sessionsRequired: SESSIONS_PER_WEEK,
        exercisesPerSession: EXERCISES_PER_SESSION,
        progress: {
          completedExercises: weekProgress?.completedExercises || 0,
          sessionsCompleted: weekProgress?.sessionsCompleted || 0,
          completionRate: weekProgress
            ? Math.round(
                (weekProgress.completedExercises /
                  weekProgress.targetExercises) *
                  100
              )
            : 0,
          isComplete: weekProgress?.completed || false,
        },
        sessions: weekSessions.map((s) => ({
          id: s.id,
          status: s.status,
          completed: s.completed,
          correct: s.correct,
          points: s.points,
          startedAt: s.startedAt,
          finishedAt: s.finishedAt,
        })),
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

      // Usuń stary postęp tygodniowy
      await prisma.weeklyProgress.deleteMany({
        where: { userId },
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

    plans.push({
      week,
      focus: getCategoryDisplayName(focus),
      goals: getWeeklyGoals(focus, phase, week, totalWeeks),
      totalExercises: EXERCISES_PER_WEEK,
      sessionsRequired: SESSIONS_PER_WEEK,
      exercisesPerSession: EXERCISES_PER_SESSION,
      estimatedTime: getEstimatedHours(intensity),
      completed: false,
      completionRate: 0,
      sessionsCompleted: 0,
      completedExercises: 0,
    });
  }

  // Uzupełnij o ukończone tygodnie
  const completedWeeks = await prisma.weeklyProgress.findMany({
    where: { userId },
  });

  plans.forEach((week) => {
    const progress = completedWeeks.find((w) => w.week === week.week);
    if (progress) {
      week.completed = progress.completed;
      week.sessionsCompleted = progress.sessionsCompleted;
      week.completedExercises = progress.completedExercises;
      week.completionRate = Math.round(
        (progress.completedExercises / progress.targetExercises) * 100
      );
    }
  });

  return plans;
}

function calculateCurrentWeek(examDate: Date, totalWeeks: number): number {
  const now = new Date();
  const daysUntilExam = differenceInDays(examDate, now);
  const weeksUntilExam = Math.ceil(daysUntilExam / 7);
  return Math.max(1, totalWeeks - weeksUntilExam + 1);
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
      "Ukończ 4 sesje nauki (20 zadań każda)",
    ],
    HISTORICAL_LITERARY: [
      "Powtórz epoki literackie",
      "Przeanalizuj kluczowe teksty",
      "Ukończ minimum 70 zadań w 4 sesjach",
    ],
    WRITING: [
      "Napisz 2 wypracowania",
      "Ćwicz interpretację tekstu",
      "Pracuj nad kompozycją w 4 sesjach",
    ],
    WEAK_POINTS: [
      "Skup się na najsłabszych obszarach",
      "Powtórz błędnie rozwiązane zadania",
      "Ukończ 4 sesje intensywnej nauki",
    ],
    REVISION: [
      "Powtórz cały materiał",
      "Rozwiąż arkusze maturalne",
      "Sprawdź poziom przygotowania w 4 sesjach",
    ],
    MOCK_EXAMS: [
      "Rozwiąż pełny arkusz maturalny",
      "Pracuj w warunkach egzaminacyjnych",
      "Przeanalizuj błędy w 4 sesjach",
    ],
    LITERARY_EPOCHS: [
      "Powtórz charakterystykę epok",
      "Naucz się kluczowych dat",
      "Zapamiętaj głównych przedstawicieli",
    ],
  };

  let selectedGoals = goals[focus] || [
    "Realizuj plan tygodniowy - 4 sesje po 20 zadań",
  ];

  if (week === totalWeeks) {
    selectedGoals = [
      ...selectedGoals.slice(0, 2),
      "Odpocznij dzień przed egzaminem",
    ];
  }

  return selectedGoals;
}

function getFiltersForWeek(focus: string, week: number): any {
  const filters: any = {
    weekNumber: week,
  };

  // Mapowanie fokusa na kategorie
  const categoryMap: Record<string, string> = {
    LANGUAGE_USE: "LANGUAGE_USE",
    HISTORICAL_LITERARY: "HISTORICAL_LITERARY",
    WRITING: "WRITING",
    WEAK_POINTS: "", // Wszystkie kategorie
    REVISION: "", // Wszystkie kategorie
    MOCK_EXAMS: "WRITING",
    LITERARY_EPOCHS: "HISTORICAL_LITERARY",
  };

  if (categoryMap[focus]) {
    filters.category = categoryMap[focus];
  }

  // Poziomy trudności progresywnie
  const baseDifficulty = Math.min(5, Math.ceil(week / 4));
  filters.difficulty = [];
  for (
    let i = Math.max(1, baseDifficulty - 1);
    i <= Math.min(5, baseDifficulty + 1);
    i++
  ) {
    filters.difficulty.push(i);
  }

  return filters;
}
