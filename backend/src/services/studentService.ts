// backend/src/services/studentService.ts

import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";
import { startOfWeek, endOfWeek, subDays } from "date-fns";

interface WeekPlan {
  week: number;
  focus: string;
  goals: string[];
  exercises: any[];
  estimatedTime: number;
}

export class StudentService {
  async getDashboardData(userId: string) {
    const [stats, recentActivity, upcomingDeadlines, weakPoints] =
      await Promise.all([
        this.getStats(userId),
        this.getRecentActivity(userId),
        this.getUpcomingDeadlines(userId),
        this.getWeakPointsAnalysis(userId),
      ]);

    return {
      stats,
      recentActivity,
      upcomingDeadlines,
      weakPoints,
    };
  }

  async getStats(userId: string) {
    const cacheKey = `student:stats:${userId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const [
      totalExercises,
      completedExercises,
      averageScore,
      weeklyProgress,
      profile,
    ] = await Promise.all([
      prisma.exercise.count(),
      prisma.submission.count({ where: { userId } }),
      prisma.assessment.aggregate({
        where: { userId },
        _avg: { totalScore: true },
      }),
      this.getWeeklyProgress(userId),
      prisma.userProfile.findUnique({ where: { userId } }),
    ]);

    const stats = {
      totalExercises,
      completedExercises,
      averageScore: averageScore._avg.totalScore || 0,
      completionRate: (completedExercises / totalExercises) * 100,
      weeklyProgress,
      studyStreak: profile?.studyStreak || 0,
      examDate: profile?.examDate,
      daysToExam: profile?.examDate
        ? Math.ceil(
            (profile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )
        : null,
    };

    await redis.setex(cacheKey, 300, JSON.stringify(stats));
    return stats;
  }

  async getProgress(userId: string) {
    const submissions = await prisma.submission.findMany({
      where: { userId },
      include: {
        exercise: true,
        assessment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const byCategory = submissions.reduce(
      (acc: Record<string, any>, sub: any) => {
        const category = sub.exercise.category;
        if (!acc[category]) {
          acc[category] = {
            total: 0,
            completed: 0,
            averageScore: 0,
            scores: [],
          };
        }

        acc[category].total++;
        if (sub.assessment) {
          acc[category].completed++;
          acc[category].scores.push(sub.assessment.totalScore);
        }

        return acc;
      },
      {}
    );

    Object.values(byCategory).forEach((cat: any) => {
      if (cat.scores.length > 0) {
        cat.averageScore =
          cat.scores.reduce((a: number, b: number) => a + b, 0) /
          cat.scores.length;
      }
      delete cat.scores;
    });

    const last30Days = await this.getProgressOverTime(userId, 30);

    return {
      byCategory,
      overTime: last30Days,
      totalProgress: (submissions.length / 500) * 100,
    };
  }

  async getWeakPointsAnalysis(userId: string) {
    const assessments = await prisma.assessment.findMany({
      where: { userId },
      include: {
        submission: {
          include: {
            exercise: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const analysis: Record<string, any> = {};

    assessments.forEach((assessment: any) => {
      const category = assessment.submission.exercise.category;

      if (!analysis[category]) {
        analysis[category] = {
          category,
          averageScore: 0,
          scores: [],
          weakAreas: [],
          recommendations: [],
        };
      }

      analysis[category].scores.push(assessment.totalScore);

      if (assessment.formalScore && assessment.formalScore < 50) {
        analysis[category].weakAreas.push("Wymogi formalne");
      }
      if (assessment.literaryScore && assessment.literaryScore < 50) {
        analysis[category].weakAreas.push("Kompetencje literackie");
      }
      if (assessment.compositionScore && assessment.compositionScore < 50) {
        analysis[category].weakAreas.push("Kompozycja");
      }
      if (assessment.languageScore && assessment.languageScore < 50) {
        analysis[category].weakAreas.push("Język");
      }
    });

    Object.values(analysis).forEach((cat: any) => {
      cat.averageScore =
        cat.scores.reduce((a: number, b: number) => a + b, 0) /
        cat.scores.length;

      if (cat.averageScore < 40) {
        cat.recommendations.push("Zalecane intensywne powtórki podstaw");
      }
      if (cat.weakAreas.includes("Język")) {
        cat.recommendations.push("Ćwicz poprawność językową i stylistyczną");
      }
      if (cat.weakAreas.includes("Kompozycja")) {
        cat.recommendations.push("Pracuj nad strukturą wypowiedzi");
      }

      delete cat.scores;
    });

    return Object.values(analysis);
  }

  async getStudyPlan(userId: string) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile?.examDate) {
      return null;
    }

    const daysLeft = Math.ceil(
      (profile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    const weakPoints = await this.getWeakPointsAnalysis(userId);

    // Generate adaptive study plan
    const plan = this.generateStudyPlan(daysLeft, weakPoints, profile);

    return plan;
  }

  private generateStudyPlan(daysLeft: number, weakPoints: any[], profile: any) {
    const weeksLeft = Math.ceil(daysLeft / 7);
    const plan: WeekPlan[] = [];

    const priorities = weakPoints
      .sort((a, b) => a.averageScore - b.averageScore)
      .slice(0, 3);

    for (let week = 1; week <= weeksLeft; week++) {
      const weekPlan: WeekPlan = {
        week,
        focus:
          priorities[week % priorities.length]?.category || "Powtórka ogólna",
        goals: [],
        exercises: [],
        estimatedTime: 0,
      };

      if (week <= 4) {
        weekPlan.goals = [
          "Opanowanie podstaw",
          "Minimum 5 zadań dziennie",
          "Jedno wypracowanie tygodniowo",
        ];
        weekPlan.estimatedTime = 10;
      } else if (week <= weeksLeft - 2) {
        weekPlan.goals = [
          "Utrwalanie wiedzy",
          "Symulacje egzaminów",
          "Praca nad słabymi punktami",
        ];
        weekPlan.estimatedTime = 8;
      } else {
        weekPlan.goals = [
          "Powtórka materiału",
          "Symulacje w warunkach egzaminacyjnych",
          "Odpoczynek przed egzaminem",
        ];
        weekPlan.estimatedTime = 5;
      }

      plan.push(weekPlan);
    }

    return {
      totalWeeks: weeksLeft,
      currentWeek: 1,
      plan,
    };
  }

  private async getWeeklyProgress(userId: string) {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

    const submissions = await prisma.submission.count({
      where: {
        userId,
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    return submissions;
  }

  private async getProgressOverTime(userId: string, days: number) {
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      const count = await prisma.submission.count({
        where: {
          userId,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      data.push({
        date: startOfDay.toISOString().split("T")[0],
        exercises: count,
      });
    }

    return data;
  }

  private async getRecentActivity(userId: string) {
    return prisma.submission.findMany({
      where: { userId },
      include: {
        exercise: {
          select: {
            id: true,
            question: true,
            category: true,
            points: true,
          },
        },
        assessment: {
          select: {
            totalScore: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  }

  private async getUpcomingDeadlines(userId: string) {
    // This could be assignments, scheduled tests, etc.
    return [];
  }

  async updatePreferences(userId: string, preferences: any) {
    return prisma.userProfile.update({
      where: { userId },
      data: {
        preferredTopics: preferences.topics,
        examDate: preferences.examDate,
      },
    });
  }
}
