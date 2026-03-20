// backend/src/services/adminService.ts

import { prisma } from "../lib/prisma";
import { TestLandingService } from "./testLandingService";

const testLandingService = new TestLandingService();

export class AdminService {
  async createExercise(data: any) {
    const exercise = await prisma.exercise.create({
      data,
    });
    if (data.work) {
      testLandingService.ensureLandingExists(data.work).catch(() => {});
    }

    return exercise;
  }

  async updateExercise(id: string, data: any) {
    const exercise = await prisma.exercise.update({
      where: { id },
      data,
    });

    return exercise;
  }

  async deleteExercise(id: string) {
    await prisma.exercise.delete({
      where: { id },
    });
  }

  async bulkCreateExercises(exercises: any[]) {
    const created = await prisma.$transaction(
      exercises.map((exercise) => prisma.exercise.create({ data: exercise })),
    );
    const uniqueWorks = [
      ...new Set(exercises.map((e: any) => e.work).filter(Boolean)),
    ] as string[];
    for (const work of uniqueWorks) {
      testLandingService.ensureLandingExists(work).catch(() => {});
    }

    return created;
  }

  async getAnalytics() {
    const [
      totalUsers,
      activeUsers,
      totalExercises,
      totalSubmissions,
      averageScore,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          submissions: {
            some: {
              createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              },
            },
          },
        },
      }),
      prisma.exercise.count(),
      prisma.submission.count(),
      prisma.assessment.aggregate({
        _avg: { totalScore: true },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
      },
      exercises: {
        total: totalExercises,
        submissions: totalSubmissions,
      },
      performance: {
        averageScore: averageScore._avg.totalScore || 0,
      },
    };
  }
}
