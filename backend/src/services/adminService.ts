// backend/src/services/adminService.ts

import { prisma } from "../lib/prisma";

export class AdminService {
  async createExercise(data: any) {
    const exercise = await prisma.exercise.create({
      data,
    });

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
      exercises.map((exercise) => prisma.exercise.create({ data: exercise }))
    );

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
