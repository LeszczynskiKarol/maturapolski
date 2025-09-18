// backend/src/services/gamificationService.ts

import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  condition: (stats: UserStats) => boolean;
  progress?: number;
  unlockedAt?: Date;
}

interface UserStats {
  exercisesCompleted: number;
  streak: number;
  totalPoints: number;
  perfectScores: number;
  essaysWritten: number;
  averageScore: number;
}

export class GamificationService {
  private achievements: Achievement[] = [
    {
      id: "first_step",
      name: "Pierwszy krok",
      description: "Ukończ swoje pierwsze zadanie",
      icon: "🎯",
      points: 10,
      condition: (stats) => stats.exercisesCompleted >= 1,
    },
    {
      id: "week_warrior",
      name: "Wojownik tygodnia",
      description: "Utrzymaj 7-dniową serię nauki",
      icon: "🔥",
      points: 50,
      condition: (stats) => stats.streak >= 7,
    },
    {
      id: "essay_master",
      name: "Mistrz wypracowań",
      description: "Napisz 10 wypracowań",
      icon: "✍️",
      points: 100,
      condition: (stats) => stats.essaysWritten >= 10,
    },
    {
      id: "perfect_ten",
      name: "Perfekcyjna dziesiątka",
      description: "Uzyskaj maksymalną punktację w 10 zadaniach",
      icon: "💯",
      points: 150,
      condition: (stats) => stats.perfectScores >= 10,
    },
    {
      id: "century",
      name: "Setka",
      description: "Ukończ 100 zadań",
      icon: "💪",
      points: 200,
      condition: (stats) => stats.exercisesCompleted >= 100,
    },
    {
      id: "month_streak",
      name: "Miesiąc systematyczności",
      description: "Utrzymaj 30-dniową serię nauki",
      icon: "🏆",
      points: 300,
      condition: (stats) => stats.streak >= 30,
    },
  ];

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    const stats = await this.getUserStats(userId);
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
    });

    const unlockedIds = userAchievements.map((ua: any) => ua.achievementId);

    return this.achievements.map((achievement) => {
      const isUnlocked = unlockedIds.includes(achievement.id);
      const progress = this.calculateProgress(achievement, stats);

      return {
        ...achievement,
        progress: isUnlocked ? 100 : progress,
        unlockedAt: isUnlocked
          ? userAchievements.find(
              (ua: any) => ua.achievementId === achievement.id
            )?.unlockedAt
          : undefined,
      };
    });
  }

  private calculateProgress(
    achievement: Achievement,
    stats: UserStats
  ): number {
    switch (achievement.id) {
      case "first_step":
        return Math.min(100, stats.exercisesCompleted * 100);
      case "week_warrior":
        return Math.min(100, (stats.streak / 7) * 100);
      case "essay_master":
        return Math.min(100, (stats.essaysWritten / 10) * 100);
      case "perfect_ten":
        return Math.min(100, (stats.perfectScores / 10) * 100);
      case "century":
        return Math.min(100, (stats.exercisesCompleted / 100) * 100);
      case "month_streak":
        return Math.min(100, (stats.streak / 30) * 100);
      default:
        return 0;
    }
  }

  async checkAchievements(userId: string): Promise<Achievement[]> {
    const stats = await this.getUserStats(userId);
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
    });

    const unlockedIds = userAchievements.map((ua: any) => ua.achievementId);
    const newAchievements: Achievement[] = [];

    for (const achievement of this.achievements) {
      if (
        !unlockedIds.includes(achievement.id) &&
        achievement.condition(stats)
      ) {
        await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id,
            unlockedAt: new Date(),
          },
        });

        await this.addPoints(userId, achievement.points);
        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const cacheKey = `user-stats:${userId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const [profile, submissions, essays] = await Promise.all([
      prisma.userProfile.findUnique({ where: { userId } }),
      prisma.submission.count({ where: { userId } }),
      prisma.essay.count({ where: { userId } }),
    ]);

    const perfectScores = await prisma.submission.count({
      where: {
        userId,
        score: { gte: 100 },
      },
    });

    const stats: UserStats = {
      exercisesCompleted: submissions,
      streak: profile?.studyStreak || 0,
      totalPoints: profile?.totalPoints || 0,
      perfectScores,
      essaysWritten: essays,
      averageScore: profile?.averageScore || 0,
    };

    await redis.setex(cacheKey, 300, JSON.stringify(stats));
    return stats;
  }

  async addPoints(userId: string, points: number) {
    await prisma.userProfile.update({
      where: { userId },
      data: {
        totalPoints: { increment: points },
        level: { increment: Math.floor(points / 100) },
      },
    });

    await this.updateLeaderboard(userId, points);
  }

  async updateLeaderboard(userId: string, points: number) {
    const key = "leaderboard:global";
    await redis.zincrby(key, points, userId);

    const weekKey = `leaderboard:week:${this.getCurrentWeek()}`;
    await redis.zincrby(weekKey, points, userId);
    await redis.expire(weekKey, 7 * 24 * 60 * 60);
  }

  async getLeaderboard(type: "global" | "weekly" = "global", limit = 10) {
    const key =
      type === "global"
        ? "leaderboard:global"
        : `leaderboard:week:${this.getCurrentWeek()}`;

    const scores = await redis.zrevrange(key, 0, limit - 1, "WITHSCORES");
    const leaderboard = [];

    for (let i = 0; i < scores.length; i += 2) {
      const user = await prisma.user.findUnique({
        where: { id: scores[i] },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profile: {
            select: {
              level: true,
            },
          },
        },
      });

      leaderboard.push({
        rank: Math.floor(i / 2) + 1,
        user,
        points: parseInt(scores[i + 1]),
      });
    }

    return leaderboard;
  }

  private getCurrentWeek() {
    const date = new Date();
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
    return `${date.getFullYear()}-W${weekNumber}`;
  }
}
