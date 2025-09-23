// backend/src/services/studyPlannerService.ts

import { prisma } from "../lib/prisma";
import { differenceInDays } from "date-fns";

interface WeekPlan {
  week: number;
  focus: string;
  goals: string[];
  exercises?: any[];
  estimatedTime: number;
  completed?: boolean;
  completionRate?: number;
}

interface StudyPlanData {
  totalWeeks: number;
  currentWeek: number;
  plan: WeekPlan[];
  examDate?: string;
  daysUntilExam?: number;
  phases?: any[];
  weakPoints?: any[];
}

export class StudyPlannerService {
  // Mapowanie kategorii na czytelne nazwy
  private getCategoryDisplayName(category: string): string {
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

  // Główna metoda generująca plan
  async generateAdaptiveStudyPlan(
    userId: string
  ): Promise<StudyPlanData | null> {
    try {
      const profile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!profile?.examDate) {
        return null;
      }

      const now = new Date();
      const daysUntilExam = differenceInDays(profile.examDate, now);

      if (daysUntilExam < 0) {
        throw new Error("Data egzaminu już minęła");
      }

      const weeksUntilExam = Math.ceil(daysUntilExam / 7);
      const currentWeek = this.calculateCurrentWeek(
        profile.examDate,
        weeksUntilExam
      );

      // Pobierz słabe punkty użytkownika
      const weakPoints = await this.analyzeWeakPoints(userId);

      // Generuj plan tygodniowy
      const weeklyPlans = await this.generateWeeklyPlans(
        weeksUntilExam,
        daysUntilExam,
        weakPoints,
        userId,
        currentWeek
      );

      // Uzupełnij dane o ukończone tygodnie
      const completedWeeks = await prisma.weeklyProgress.findMany({
        where: { userId, completed: true },
      });

      weeklyPlans.forEach((week) => {
        const isCompleted = completedWeeks.some((w) => w.week === week.week);
        if (isCompleted) {
          week.completed = true;
        }
      });

      // Oblicz completion rate dla obecnego tygodnia
      const currentWeekPlan = weeklyPlans.find((w) => w.week === currentWeek);
      if (currentWeekPlan && currentWeekPlan.exercises) {
        const completedExercises = await prisma.submission.count({
          where: {
            userId,
            exerciseId: { in: currentWeekPlan.exercises.map((e: any) => e.id) },
          },
        });
        currentWeekPlan.completionRate =
          (completedExercises / currentWeekPlan.exercises.length) * 100;
      }

      return {
        totalWeeks: weeksUntilExam,
        currentWeek,
        plan: weeklyPlans,
        examDate: profile.examDate.toISOString(),
        daysUntilExam,
        phases: this.getPhases(daysUntilExam, weeksUntilExam),
        weakPoints,
      };
    } catch (error) {
      console.error("Error generating study plan:", error);
      throw error;
    }
  }

  // Generowanie planów tygodniowych
  private async generateWeeklyPlans(
    totalWeeks: number,
    daysUntilExam: number,
    weakPoints: any[],
    userId: string,
    currentWeek: number
  ): Promise<WeekPlan[]> {
    const plans: WeekPlan[] = [];

    for (let week = 1; week <= totalWeeks; week++) {
      const phase = this.determinePhaseForWeek(week, totalWeeks, daysUntilExam);
      const focus = this.selectFocusForWeek(
        week,
        totalWeeks,
        phase,
        weakPoints
      );
      const intensity = this.getIntensityForPhase(phase);

      // Pobierz ćwiczenia tylko dla obecnego i przyszłych tygodni
      let exercises: any[] = [];
      if (week >= currentWeek) {
        exercises = await this.selectExercisesForWeek(
          focus,
          intensity,
          userId,
          week,
          totalWeeks
        );
      }

      plans.push({
        week,
        focus: this.getCategoryDisplayName(focus),
        goals: this.getWeeklyGoals(focus, phase, week, totalWeeks),
        exercises,
        estimatedTime: this.getEstimatedHours(intensity),
        completed: false,
        completionRate: 0,
      });
    }

    return plans;
  }

  // Określenie fazy dla konkretnego tygodnia
  private determinePhaseForWeek(
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

    // Długoterminowy plan
    if (weekPercentage <= 25) return "FOUNDATION";
    if (weekPercentage <= 60) return "DEVELOPMENT";
    if (weekPercentage <= 85) return "INTENSIFICATION";
    return "FINAL_REVIEW";
  }

  // Wybór obszaru tematycznego dla tygodnia
  private selectFocusForWeek(
    week: number,
    totalWeeks: number,
    phase: string,
    weakPoints: any[]
  ): string {
    // Ostatnie 2 tygodnie - powtórki
    if (week >= totalWeeks - 1) {
      return "REVISION";
    }

    // Ostatnie 4 tygodnie - focus na słabe punkty
    if (week >= totalWeeks - 4 && weakPoints.length > 0) {
      return "WEAK_POINTS";
    }

    // Rotacja tematów w zależności od fazy
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

  // Pobieranie ćwiczeń dla tygodnia
  private async selectExercisesForWeek(
    focus: string,
    intensity: string,
    userId: string,
    week: number,
    totalWeeks: number
  ): Promise<any[]> {
    const categories = this.mapFocusToCategories(focus);
    const difficulty = this.getDifficultyForIntensity(intensity);
    const exercisesPerWeek = this.getExercisesCountForIntensity(intensity);

    // Pobierz ćwiczenia, które użytkownik jeszcze nie robił
    let exercises = await prisma.exercise.findMany({
      where: {
        category: { in: categories },
        difficulty: {
          gte: difficulty.min,
          lte: difficulty.max,
        },
        NOT: {
          submissions: {
            some: {
              userId,
              createdAt: {
                gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
              },
            },
          },
        },
      },
      take: exercisesPerWeek,
      orderBy: [{ difficulty: "asc" }, { createdAt: "desc" }],
    });

    // Jeśli nie ma wystarczająco nowych ćwiczeń, dodaj stare do powtórki
    if (exercises.length < exercisesPerWeek) {
      const additionalExercises = await prisma.exercise.findMany({
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
            },
          },
        },
        take: exercisesPerWeek - exercises.length,
        orderBy: { difficulty: "asc" },
      });

      exercises = [...exercises, ...additionalExercises];
    }

    return exercises;
  }

  // Mapowanie focus na kategorie
  private mapFocusToCategories(focus: string): any[] {
    const originalFocus = this.reverseMapCategory(focus);

    const mapping: Record<string, string[]> = {
      LANGUAGE_USE: ["LANGUAGE_USE"],
      HISTORICAL_LITERARY: ["HISTORICAL_LITERARY"],
      WRITING: ["WRITING"],
      WEAK_POINTS: ["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"],
      REVISION: ["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"],
      MOCK_EXAMS: ["WRITING", "HISTORICAL_LITERARY"],
      LITERARY_EPOCHS: ["HISTORICAL_LITERARY"],
    };

    return mapping[originalFocus] || ["LANGUAGE_USE"];
  }

  // Odwrócone mapowanie nazw
  private reverseMapCategory(displayName: string): string {
    const reverseMap: Record<string, string> = {
      "Język Polski": "LANGUAGE_USE",
      "Historia i Literatura": "HISTORICAL_LITERARY",
      "Pisanie Wypracowań": "WRITING",
      "Słabe Punkty": "WEAK_POINTS",
      "Powtórka Materiału": "REVISION",
      "Egzaminy Próbne": "MOCK_EXAMS",
      "Epoki Literackie": "LITERARY_EPOCHS",
    };

    return reverseMap[displayName] || displayName;
  }

  // Generowanie celów tygodniowych
  private getWeeklyGoals(
    focus: string,
    phase: string,
    week: number,
    totalWeeks: number
  ): string[] {
    const originalFocus = this.reverseMapCategory(focus);

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

    let selectedGoals = goals[originalFocus] || ["Realizuj plan tygodniowy"];

    // Dodaj specjalny cel dla ostatniego tygodnia
    if (week === totalWeeks) {
      selectedGoals = [
        ...selectedGoals.slice(0, 2),
        "Odpocznij dzień przed egzaminem",
      ];
    }

    return selectedGoals;
  }

  // Pomocnicze metody
  private getIntensityForPhase(phase: string): string {
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

  private getDifficultyForIntensity(intensity: string): {
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

  private getExercisesCountForIntensity(intensity: string): number {
    const countMap: Record<string, number> = {
      LOW: 21, // 3 dziennie * 7 dni
      MEDIUM: 35, // 5 dziennie * 7 dni
      HIGH: 49, // 7 dziennie * 7 dni
      CRITICAL: 70, // 10 dziennie * 7 dni
    };

    return countMap[intensity] || 35;
  }

  private getEstimatedHours(intensity: string): number {
    const hoursMap: Record<string, number> = {
      LOW: 10.5, // 1.5h dziennie * 7 dni
      MEDIUM: 14, // 2h dziennie * 7 dni
      HIGH: 21, // 3h dziennie * 7 dni
      CRITICAL: 28, // 4h dziennie * 7 dni
    };

    return hoursMap[intensity] || 14;
  }

  private calculateCurrentWeek(examDate: Date, totalWeeks: number): number {
    const now = new Date();
    const daysUntilExam = differenceInDays(examDate, now);
    const weeksUntilExam = Math.ceil(daysUntilExam / 7);

    return Math.max(1, totalWeeks - weeksUntilExam + 1);
  }

  private getPhases(daysUntilExam: number, weeksUntilExam: number): any[] {
    if (daysUntilExam <= 7) {
      return [
        {
          name: "Sprint Maturalny",
          weeks: 1,
          intensity: "CRITICAL",
        },
      ];
    }

    if (daysUntilExam <= 30) {
      return [
        {
          name: "Intensywne Powtórki",
          weeks: Math.ceil(weeksUntilExam * 0.7),
          intensity: "HIGH",
        },
        {
          name: "Sprint Końcowy",
          weeks: Math.floor(weeksUntilExam * 0.3),
          intensity: "CRITICAL",
        },
      ];
    }

    if (daysUntilExam <= 90) {
      return [
        {
          name: "Uzupełnianie Braków",
          weeks: Math.ceil(weeksUntilExam * 0.4),
          intensity: "MEDIUM",
        },
        {
          name: "Praktyka Pisania",
          weeks: Math.ceil(weeksUntilExam * 0.4),
          intensity: "HIGH",
        },
        {
          name: "Powtórki Przedmaturalne",
          weeks: Math.floor(weeksUntilExam * 0.2),
          intensity: "CRITICAL",
        },
      ];
    }

    return [
      {
        name: "Budowanie Podstaw",
        weeks: Math.ceil(weeksUntilExam * 0.25),
        intensity: "LOW",
      },
      {
        name: "Rozwijanie Kompetencji",
        weeks: Math.ceil(weeksUntilExam * 0.35),
        intensity: "MEDIUM",
      },
      {
        name: "Intensyfikacja",
        weeks: Math.ceil(weeksUntilExam * 0.25),
        intensity: "HIGH",
      },
      {
        name: "Powtórki Końcowe",
        weeks: Math.floor(weeksUntilExam * 0.15),
        intensity: "CRITICAL",
      },
    ];
  }

  // Analiza słabych punktów
  private async analyzeWeakPoints(userId: string): Promise<any[]> {
    const submissions = await prisma.submission.findMany({
      where: { userId },
      include: {
        exercise: true,
        assessment: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const categoryStats: Record<string, any> = {};

    submissions.forEach((submission) => {
      const category = submission.exercise.category;
      if (!categoryStats[category]) {
        categoryStats[category] = {
          category: this.getCategoryDisplayName(category),
          totalAttempts: 0,
          totalScore: 0,
          maxPossibleScore: 0,
          weakAreas: [],
        };
      }

      const stats = categoryStats[category];
      stats.totalAttempts++;

      if (submission.score !== null) {
        stats.totalScore += submission.score;
        stats.maxPossibleScore += submission.exercise.points;
      }

      // Identyfikuj słabe obszary na podstawie ocen
      if (submission.assessment) {
        if (
          submission.assessment.formalScore &&
          submission.assessment.formalScore < 50
        ) {
          if (!stats.weakAreas.includes("wymogi formalne")) {
            stats.weakAreas.push("wymogi formalne");
          }
        }
        if (
          submission.assessment.literaryScore &&
          submission.assessment.literaryScore < 50
        ) {
          if (!stats.weakAreas.includes("kompetencje literackie")) {
            stats.weakAreas.push("kompetencje literackie");
          }
        }
        if (
          submission.assessment.compositionScore &&
          submission.assessment.compositionScore < 50
        ) {
          if (!stats.weakAreas.includes("kompozycja")) {
            stats.weakAreas.push("kompozycja");
          }
        }
        if (
          submission.assessment.languageScore &&
          submission.assessment.languageScore < 50
        ) {
          if (!stats.weakAreas.includes("język")) {
            stats.weakAreas.push("język");
          }
        }
      }
    });

    return Object.values(categoryStats)
      .map((stats) => ({
        category: stats.category,
        averageScore:
          stats.maxPossibleScore > 0
            ? Math.round((stats.totalScore / stats.maxPossibleScore) * 100)
            : 0,
        weakAreas: stats.weakAreas,
      }))
      .sort((a, b) => a.averageScore - b.averageScore)
      .slice(0, 3);
  }

  // Aktualizacja postępu tygodniowego
  async updateWeeklyProgress(
    userId: string,
    week: number,
    exerciseId: string,
    score: number
  ): Promise<void> {
    await prisma.weeklyProgress.upsert({
      where: {
        userId_week: { userId, week },
      },
      create: {
        userId,
        week,
        completed: false,
      },
      update: {
        updatedAt: new Date(),
      },
    });

    // Sprawdź czy tydzień powinien być oznaczony jako ukończony
    await this.checkWeekCompletion(userId, week);
  }

  private async checkWeekCompletion(
    userId: string,
    week: number
  ): Promise<void> {
    const plan = await this.generateAdaptiveStudyPlan(userId);

    if (!plan) return;

    const weekPlan = plan.plan.find((w) => w.week === week);

    if (!weekPlan || !weekPlan.exercises) return;

    const completedExercises = await prisma.submission.count({
      where: {
        userId,
        exerciseId: { in: weekPlan.exercises.map((e) => e.id) },
      },
    });

    const completionRate = completedExercises / weekPlan.exercises.length;

    // Automatyczne oznaczanie jako ukończony przy 80% wykonania
    if (completionRate >= 0.8) {
      await prisma.weeklyProgress.update({
        where: {
          userId_week: { userId, week },
        },
        data: {
          completed: true,
          completedAt: new Date(),
        },
      });
    }
  }
}
