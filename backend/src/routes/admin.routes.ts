// backend/src/routes/admin.routes.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const ExerciseSchema = z.object({
  type: z.enum([
    "CLOSED_SINGLE",
    "CLOSED_MULTIPLE",
    "SHORT_ANSWER",
    "SYNTHESIS_NOTE",
    "ESSAY",
  ]),
  category: z.enum(["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"]),
  epoch: z
    .union([
      z.enum([
        "ANTIQUITY",
        "MIDDLE_AGES",
        "RENAISSANCE",
        "BAROQUE",
        "ENLIGHTENMENT",
        "ROMANTICISM",
        "POSITIVISM",
        "YOUNG_POLAND",
        "INTERWAR",
        "CONTEMPORARY",
      ]),
      z.literal(""), // DODAJ to - akceptuj pusty string
      z.undefined(),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // Transformuj pusty string na undefined

  difficulty: z.number().min(1).max(5),
  points: z.number().min(1).max(35),
  question: z.string().min(10),
  content: z.object({
    options: z.array(z.string()).optional(),
    text: z.string().optional(),
    fragments: z
      .array(
        z.object({
          author: z.string(),
          title: z.string(),
          content: z.string(),
        })
      )
      .optional(),
  }),
  correctAnswer: z
    .union([z.number(), z.array(z.number()), z.undefined()])
    .optional(),
  tags: z.array(z.string()).default([]),
  metadata: z
    .object({
      explanation: z.string().optional(),
      wordLimit: z
        .object({
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
      requiredReadings: z.array(z.string()).optional(),
      expectedConcepts: z.array(z.string()).optional(),
      sampleAnswer: z.string().optional(),
    })
    .optional(),
});

type ExerciseInput = z.infer<typeof ExerciseSchema>;

interface QueryParams {
  type?: string;
  category?: string;
  epoch?: string;
  difficulty?: string;
  search?: string;
  page?: string;
  limit?: string;
}

interface UserPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}

export async function adminRoutes(fastify: FastifyInstance): Promise<void> {
  // Middleware - weryfikacja admina
  fastify.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        const user = request.user as UserPayload;
        if (user.role !== "ADMIN") {
          return reply.code(403).send({ error: "Forbidden" });
        }
      } catch {
        return reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // GET wszystkie zadania z filtrowaniem i paginacją
  fastify.get<{ Querystring: QueryParams }>(
    "/exercises",
    async (request, reply) => {
      try {
        const query = request.query;
        const where: any = {};

        // Filtrowanie
        if (query.type) where.type = query.type;
        if (query.category) where.category = query.category;
        if (query.epoch) where.epoch = query.epoch;
        if (query.difficulty) where.difficulty = parseInt(query.difficulty);

        // Wyszukiwanie
        if (query.search) {
          where.OR = [
            { question: { contains: query.search, mode: "insensitive" } },
            { tags: { has: query.search } },
          ];
        }

        // Paginacja
        const page = parseInt(query.page || "1");
        const limit = parseInt(query.limit || "20");

        const [exercises, total] = await prisma.$transaction([
          prisma.exercise.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
              _count: {
                select: { submissions: true },
              },
            },
          }),
          prisma.exercise.count({ where }),
        ]);

        return reply.send({
          exercises: exercises.map((ex) => ({
            ...ex,
            submissions: ex._count.submissions,
          })),
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        console.error("Database error:", error);
        return reply.code(500).send({ error: "Database connection failed" });
      }
    }
  );

  // GET statystyki
  fastify.get("/exercises/stats", async (_request, reply) => {
    try {
      const [closedCount, openCount, essayCount, avgDifficulty] =
        await prisma.$transaction([
          prisma.exercise.count({
            where: { type: { in: ["CLOSED_SINGLE", "CLOSED_MULTIPLE"] } },
          }),
          prisma.exercise.count({
            where: { type: { in: ["SHORT_ANSWER", "SYNTHESIS_NOTE"] } },
          }),
          prisma.exercise.count({ where: { type: "ESSAY" } }),
          prisma.exercise.aggregate({
            _avg: { difficulty: true },
          }),
        ]);

      return reply.send({
        closed: closedCount,
        open: openCount,
        essays: essayCount,
        avgDifficulty: avgDifficulty._avg.difficulty || 0,
      });
    } catch (error) {
      console.error("Stats error:", error);
      return reply.code(500).send({ error: "Failed to fetch stats" });
    }
  });

  // POST nowe zadanie
  fastify.post<{ Body: ExerciseInput }>(
    "/exercises",
    async (request, reply) => {
      try {
        const data = ExerciseSchema.parse(request.body);

        const exercise = await prisma.exercise.create({
          data: {
            ...data,
            content: data.content || {},
            metadata: data.metadata || {},
          } as any,
        });

        return reply.send(exercise);
      } catch (error: any) {
        console.error("Create exercise error:", error);

        if (error.name === "ZodError") {
          return reply.code(400).send({
            error: "Invalid data format",
            details: error.errors,
          });
        }

        return reply.code(500).send({
          error: "Failed to create exercise",
          details: error.message,
        });
      }
    }
  );

  fastify.get("/users/detailed-sessions", async (_request, reply) => {
    try {
      // Pobierz wszystkich użytkowników z sesjami
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          learningSessions: {
            orderBy: { startedAt: "desc" },
            select: {
              id: true,
              startedAt: true,
              finishedAt: true,
              status: true,
              completed: true,
              correct: true,
              points: true,
              timeSpent: true,
              completedExercises: true,
              skippedExercises: true,
            },
          },
          exerciseUsage: {
            orderBy: { lastUsedAt: "desc" },
            select: {
              exerciseId: true,
              lastUsedAt: true,
              usageCount: true,
              exercise: {
                select: {
                  id: true,
                  question: true,
                  type: true,
                  category: true,
                  difficulty: true,
                  points: true,
                },
              },
            },
          },
        },
      });

      // Dla każdej sesji rozpakuj pytania
      const detailedUsers = await Promise.all(
        users.map(async (user) => {
          const sessionsWithDetails = await Promise.all(
            user.learningSessions.map(async (session) => {
              const completedExercises =
                (session.completedExercises as any[]) || [];

              // Pobierz szczegóły każdego pytania
              const exerciseDetails = await Promise.all(
                completedExercises.map(async (ex) => {
                  if (!ex.id) return null;

                  const exercise = await prisma.exercise.findUnique({
                    where: { id: ex.id },
                    select: {
                      id: true,
                      question: true,
                      type: true,
                      category: true,
                      difficulty: true,
                      points: true,
                    },
                  });

                  return {
                    ...exercise,
                    userAnswer: ex.answer,
                    score: ex.score,
                    timestamp: ex.timestamp,
                  };
                })
              );

              return {
                ...session,
                exerciseDetails: exerciseDetails.filter(Boolean),
              };
            })
          );

          return {
            ...user,
            learningSessions: sessionsWithDetails,
          };
        })
      );

      return reply.send(detailedUsers);
    } catch (error) {
      console.error("Error:", error);
      return reply
        .code(500)
        .send({ error: "Failed to fetch detailed sessions" });
    }
  });

  // PUT aktualizuj zadanie
  fastify.put<{
    Params: { id: string };
    Body: Partial<ExerciseInput>;
  }>("/exercises/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const data = ExerciseSchema.partial().parse(request.body);

      const exercise = await prisma.exercise.update({
        where: { id },
        data: {
          ...data,
          content: data.content || {},
          metadata: data.metadata || {},
        } as any,
      });

      return reply.send(exercise);
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.code === "P2025") {
        return reply.code(404).send({ error: "Exercise not found" });
      }
      return reply.code(500).send({
        error: "Failed to update exercise",
        details: error.message,
      });
    }
  });

  // DELETE zadanie
  fastify.delete<{ Params: { id: string } }>(
    "/exercises/:id",
    async (request, reply) => {
      try {
        const { id } = request.params;

        await prisma.$transaction([
          prisma.submission.deleteMany({ where: { exerciseId: id } }),
          prisma.spacedRepetition.deleteMany({ where: { exerciseId: id } }),
          prisma.exercise.delete({ where: { id } }),
        ]);

        return reply.send({ success: true });
      } catch (error: any) {
        console.error("Delete error:", error);
        if (error.code === "P2025") {
          return reply.code(404).send({ error: "Exercise not found" });
        }
        return reply.code(500).send({
          error: "Failed to delete exercise",
          details: error.message,
        });
      }
    }
  );

  // POST import wielu zadań
  fastify.post<{ Body: ExerciseInput[] }>(
    "/exercises/bulk",
    async (request, reply) => {
      try {
        const exercises = z.array(ExerciseSchema).parse(request.body);

        const created = await prisma.$transaction(
          exercises.map((exercise) =>
            prisma.exercise.create({
              data: {
                ...exercise,
                content: exercise.content || {},
                metadata: exercise.metadata || {},
              } as any,
            })
          )
        );

        return reply.send({
          success: true,
          count: created.length,
          exercises: created,
        });
      } catch (error: any) {
        console.error("Bulk import error:", error);

        if (error.name === "ZodError") {
          return reply.code(400).send({
            error: "Invalid data format",
            details: error.errors,
          });
        }

        return reply.code(500).send({
          error: "Failed to import exercises",
          details: error.message,
        });
      }
    }
  );

  // GET wszystkich użytkowników z pełnymi danymi
  fastify.get<{
    Querystring: {
      search?: string;
      role?: string;
      page?: string;
      limit?: string;
      sortBy?: string;
      sortOrder?: string;
    };
  }>("/users", async (request, reply) => {
    try {
      const {
        search,
        role,
        page = "1",
        limit = "20",
        sortBy = "createdAt",
        sortOrder = "desc",
      } = request.query;

      const sortByField = sortBy === "userName" ? "username" : sortBy;

      const where: any = {};

      // Filtrowanie po roli
      if (role && role !== "all") {
        where.role = role;
      }

      // Wyszukiwanie
      if (search) {
        where.OR = [
          { email: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
        ];
      }

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
          where,
          skip: (pageNum - 1) * limitNum,
          take: limitNum,
          orderBy: { [sortByField]: sortOrder },
          include: {
            profile: true,
            levelProgress: true,
            subscription: true,
            submissions: {
              take: 5,
              orderBy: { createdAt: "desc" },
              include: {
                exercise: {
                  select: {
                    type: true,
                    category: true,
                    difficulty: true,
                    points: true,
                  },
                },
                assessment: {
                  select: {
                    totalScore: true,
                  },
                },
              },
            },
            _count: {
              select: {
                submissions: true,
                learningSessions: true,
                examSessions: true,
              },
            },
            learningSessions: {
              take: 1,
              orderBy: { lastActiveAt: "desc" },
              select: {
                lastActiveAt: true,
              },
            },
            dailyProgress: {
              take: 7,
              orderBy: { date: "desc" },
              select: {
                date: true,
                exercisesCount: true,
                studyTime: true,
                averageScore: true,
              },
            },
          },
        }),
        prisma.user.count({ where }),
      ]);

      // Oblicz dodatkowe statystyki dla każdego użytkownika
      const enrichedUsers = users.map((user) => {
        const recentActivity =
          user.learningSessions[0]?.lastActiveAt || user.lastLogin;
        const totalSubmissions = user._count.submissions;
        const avgScore =
          user.submissions.length > 0
            ? user.submissions.reduce(
                (acc, sub) => acc + (sub.assessment?.totalScore || 0),
                0
              ) / user.submissions.length
            : 0;

        const weeklyActivity = user.dailyProgress.reduce(
          (acc, day) => ({
            exercises: acc.exercises + day.exercisesCount,
            time: acc.time + day.studyTime,
          }),
          { exercises: 0, time: 0 }
        );

        return {
          ...user,
          stats: {
            totalSubmissions,
            totalSessions: user._count.learningSessions,
            totalExams: user._count.examSessions,
            averageScore: Math.round(avgScore * 10) / 10,
            lastActive: recentActivity,
            weeklyExercises: weeklyActivity.exercises,
            weeklyStudyTime: weeklyActivity.time,
          },
        };
      });

      return reply.send({
        users: enrichedUsers,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return reply.code(500).send({ error: "Failed to fetch users" });
    }
  });

  // GET szczegóły pojedynczego użytkownika
  fastify.get<{ Params: { userId: string } }>(
    "/users/:userId",
    async (request, reply) => {
      try {
        const { userId } = request.params;

        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            profile: true,
            levelProgress: true,
            submissions: {
              orderBy: { createdAt: "desc" },
              take: 20,
              include: {
                exercise: true,
                assessment: true,
              },
            },
            learningSessions: {
              orderBy: { startedAt: "desc" },
              take: 10,
            },
            examSessions: {
              orderBy: { startedAt: "desc" },
              take: 5,
              include: {
                exam: {
                  select: {
                    title: true,
                    type: true,
                  },
                },
              },
            },
            dailyProgress: {
              orderBy: { date: "desc" },
              take: 30,
            },
            studyGoals: {
              orderBy: { targetDate: "asc" },
            },
            weeklyProgress: {
              orderBy: { week: "desc" },
              take: 12,
            },
            materialProgress: {
              include: {
                material: {
                  select: {
                    title: true,
                    type: true,
                    category: true,
                  },
                },
              },
            },
          },
        });

        if (!user) {
          return reply.code(404).send({ error: "User not found" });
        }

        // Oblicz szczegółowe statystyki
        const stats = await prisma.$transaction([
          // Statystyki ogólne
          prisma.submission.aggregate({
            where: { userId },
            _avg: { score: true },
            _count: true,
          }),
          // Statystyki po kategoriach
          prisma.submission.groupBy({
            by: ["exerciseId"],
            where: { userId },
            _avg: { score: true },
            _count: true,
            orderBy: { exerciseId: "asc" },
          }),
          // Postępy w epokach
          prisma.exercise.findMany({
            where: {
              submissions: {
                some: { userId },
              },
            },
            select: {
              epoch: true,
              difficulty: true,
              points: true,
              submissions: {
                where: { userId },
                select: { score: true },
              },
            },
          }),
        ]);

        // Analiza postępów w epokach
        const epochProgress = stats[2].reduce((acc, exercise) => {
          if (exercise.epoch) {
            if (!acc[exercise.epoch]) {
              acc[exercise.epoch] = {
                completed: 0,
                totalPoints: 0,
                averageScore: 0,
                scores: [],
              };
            }
            acc[exercise.epoch].completed += 1;
            acc[exercise.epoch].totalPoints += exercise.points;
            const score = exercise.submissions[0]?.score || 0;
            acc[exercise.epoch].scores.push(score);
          }
          return acc;
        }, {} as Record<string, any>);

        // Oblicz średnie dla każdej epoki
        Object.keys(epochProgress).forEach((epoch) => {
          const scores = epochProgress[epoch].scores;
          epochProgress[epoch].averageScore =
            scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
          delete epochProgress[epoch].scores;
        });

        return reply.send({
          ...user,
          analytics: {
            overall: stats[0],
            epochProgress,
            recentTrend: calculateTrend(user.dailyProgress),
          },
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        return reply.code(500).send({ error: "Failed to fetch user details" });
      }
    }
  );

  // PUT - Aktualizacja poziomu i punktów użytkownika
  fastify.put<{
    Params: { userId: string };
    Body: {
      level?: number;
      totalPoints?: number;
      unlockedDifficulty?: number;
      difficultyPoints?: {
        difficulty1Points?: number;
        difficulty2Points?: number;
        difficulty3Points?: number;
        difficulty4Points?: number;
        difficulty5Points?: number;
      };
    };
  }>("/users/:userId/progress", async (request, reply) => {
    try {
      const { userId } = request.params;
      const { level, totalPoints, unlockedDifficulty, difficultyPoints } =
        request.body;

      // Rozpocznij transakcję
      const updates = await prisma.$transaction(async (tx) => {
        const results: any = {};

        // Aktualizuj profil użytkownika (poziom i punkty)
        if (level !== undefined || totalPoints !== undefined) {
          const profileUpdate: any = {};
          if (level !== undefined) profileUpdate.level = level;
          if (totalPoints !== undefined)
            profileUpdate.totalPoints = totalPoints;

          results.profile = await tx.userProfile.update({
            where: { userId },
            data: profileUpdate,
          });
        }

        // Aktualizuj postęp poziomów
        if (unlockedDifficulty !== undefined || difficultyPoints) {
          const levelProgressUpdate: any = {};
          if (unlockedDifficulty !== undefined) {
            levelProgressUpdate.unlockedDifficulty = unlockedDifficulty;
          }
          if (difficultyPoints) {
            Object.assign(levelProgressUpdate, difficultyPoints);
          }

          results.levelProgress = await tx.userLevelProgress.update({
            where: { userId },
            data: levelProgressUpdate,
          });
        }

        return results;
      });

      return reply.send({
        success: true,
        updated: updates,
      });
    } catch (error) {
      console.error("Error updating user progress:", error);
      return reply.code(500).send({ error: "Failed to update user progress" });
    }
  });

  // PUT - Aktualizacja roli użytkownika
  fastify.put<{
    Params: { userId: string };
    Body: { role: "ADMIN" | "STUDENT" };
  }>("/users/:userId/role", async (request, reply) => {
    try {
      const { userId } = request.params;
      const { role } = request.body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: { role },
      });

      return reply.send({ success: true, user });
    } catch (error) {
      console.error("Error updating user role:", error);
      return reply.code(500).send({ error: "Failed to update user role" });
    }
  });

  // POST - Resetuj postępy użytkownika
  fastify.post<{ Params: { userId: string } }>(
    "/users/:userId/reset-progress",
    async (request, reply) => {
      try {
        const { userId } = request.params;

        await prisma.$transaction([
          // Resetuj profil
          prisma.userProfile.update({
            where: { userId },
            data: {
              studyStreak: 0,
              totalPoints: 0,
              level: 1,
              averageScore: 0,
            },
          }),
          // Resetuj postępy poziomów
          prisma.userLevelProgress.update({
            where: { userId },
            data: {
              unlockedDifficulty: 2,
              difficulty1Points: 0,
              difficulty2Points: 0,
              difficulty3Points: 0,
              difficulty4Points: 0,
              difficulty5Points: 0,
            },
          }),
          // Usuń postępy dzienny
          prisma.dailyProgress.deleteMany({ where: { userId } }),
          // Usuń postępy tygodniowe
          prisma.weeklyProgress.deleteMany({ where: { userId } }),
        ]);

        return reply.send({ success: true });
      } catch (error) {
        console.error("Error resetting user progress:", error);
        return reply.code(500).send({ error: "Failed to reset user progress" });
      }
    }
  );

  // DELETE - Usuń użytkownika
  fastify.delete<{ Params: { userId: string } }>(
    "/users/:userId",
    async (request, reply) => {
      try {
        const { userId } = request.params;

        await prisma.$transaction([
          prisma.submission.deleteMany({ where: { userId } }),
          prisma.assessment.deleteMany({ where: { userId } }),
          prisma.notification.deleteMany({ where: { userId } }),
          prisma.weeklyProgress.deleteMany({ where: { userId } }),
          prisma.studyGoal.deleteMany({ where: { userId } }),
          prisma.dailyProgress.deleteMany({ where: { userId } }),
          prisma.userMaterialProgress.deleteMany({ where: { userId } }),
          prisma.examSession.deleteMany({ where: { userId } }),
          prisma.exerciseUsage.deleteMany({ where: { userId } }),
          prisma.learningSession.deleteMany({ where: { userId } }),
          // DODAJ TO:
          prisma.subscription.deleteMany({ where: { userId } }),
          prisma.aiUsage.deleteMany({ where: { userId } }),
          // Następnie usuń relacje jeden-do-jeden:
          prisma.userLevelProgress.deleteMany({ where: { userId } }),
          prisma.userProfile.deleteMany({ where: { userId } }),
          // Na końcu usuń użytkownika:
          prisma.user.delete({ where: { id: userId } }),
        ]);

        return reply.send({ success: true });
      } catch (error) {
        console.error("Error deleting user:", error);
        return reply.code(500).send({ error: "Failed to delete user" });
      }
    }
  );

  // GET statystyki wszystkich użytkowników
  fastify.get("/users/statistics", async (_request, reply) => {
    try {
      const [
        totalUsers,
        activeToday,
        activeThisWeek,
        activeThisMonth,
        avgLevel,
        avgPoints,
        avgScore,
        topUsers,
        inactiveUsers,
        levelDistribution,
      ] = await prisma.$transaction([
        // Total users
        prisma.user.count(),

        // Active today
        prisma.user.count({
          where: {
            learningSessions: {
              some: {
                lastActiveAt: {
                  gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
              },
            },
          },
        }),

        // Active this week
        prisma.user.count({
          where: {
            learningSessions: {
              some: {
                lastActiveAt: {
                  gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
              },
            },
          },
        }),

        // Active this month
        prisma.user.count({
          where: {
            learningSessions: {
              some: {
                lastActiveAt: {
                  gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              },
            },
          },
        }),

        // Average level
        prisma.userProfile.aggregate({
          _avg: { level: true },
        }),

        // Average points
        prisma.userProfile.aggregate({
          _avg: { totalPoints: true },
        }),

        // Average score
        prisma.userProfile.aggregate({
          _avg: { averageScore: true },
        }),

        // Top users
        prisma.user.findMany({
          take: 5,
          orderBy: {
            profile: {
              totalPoints: "desc",
            },
          },
          include: {
            profile: {
              select: {
                level: true,
                totalPoints: true,
                averageScore: true,
              },
            },
          },
        }),

        // Inactive users (30+ days)
        prisma.user.count({
          where: {
            AND: [
              {
                lastLogin: {
                  lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              },
              {
                learningSessions: {
                  none: {
                    lastActiveAt: {
                      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    },
                  },
                },
              },
            ],
          },
        }),

        // Level distribution
        prisma.userProfile.groupBy({
          by: ["level"],
          _count: true,
          orderBy: {
            level: "asc",
          },
        }),
      ]);

      // Process level distribution - FIXED TYPE ISSUE
      const levelDistributionMap: Record<number, number> = {};
      levelDistribution.forEach((item) => {
        // Poprawna obsługa _count
        let count = 0;
        if (typeof item._count === "number") {
          count = item._count;
        } else if (item._count && typeof item._count === "object") {
          count = "_all" in item._count ? item._count._all || 0 : 0;
        }
        levelDistributionMap[item.level] = count;
      });

      return reply.send({
        overview: {
          totalUsers,
          activeToday,
          activeThisWeek,
          activeThisMonth,
          inactiveUsers,
        },
        averages: {
          level: avgLevel._avg.level || 0,
          points: avgPoints._avg.totalPoints || 0,
          score: avgScore._avg.averageScore || 0,
        },
        topUsers,
        levelDistribution: levelDistributionMap,
      });
    } catch (error) {
      console.error("Error fetching user statistics:", error);
      return reply.code(500).send({ error: "Failed to fetch statistics" });
    }
  });

  // POST batch update users - FIXED NESTED TRANSACTION ISSUE
  fastify.post<{
    Body: {
      userIds: string[];
      updates: {
        level?: number;
        totalPoints?: number;
        unlockedDifficulty?: number;
        role?: "ADMIN" | "STUDENT";
      };
    };
  }>("/users/batch-update", async (request, reply) => {
    try {
      const { userIds, updates } = request.body;

      // Process each user update individually
      const results = [];

      for (const userId of userIds) {
        try {
          const result = await prisma.$transaction(async (tx) => {
            const updatePromises = [];

            // Update role if provided
            if (updates.role) {
              updatePromises.push(
                tx.user.update({
                  where: { id: userId },
                  data: { role: updates.role },
                })
              );
            }

            // Update profile if level or points provided
            if (
              updates.level !== undefined ||
              updates.totalPoints !== undefined
            ) {
              // First ensure profile exists
              const profile = await tx.userProfile.findUnique({
                where: { userId },
              });

              if (profile) {
                const profileData: any = {};
                if (updates.level !== undefined)
                  profileData.level = updates.level;
                if (updates.totalPoints !== undefined)
                  profileData.totalPoints = updates.totalPoints;

                updatePromises.push(
                  tx.userProfile.update({
                    where: { userId },
                    data: profileData,
                  })
                );
              } else {
                // Create profile if doesn't exist
                updatePromises.push(
                  tx.userProfile.create({
                    data: {
                      userId,
                      level: updates.level || 1,
                      totalPoints: updates.totalPoints || 0,
                      studyStreak: 0,
                      averageScore: 0,
                    },
                  })
                );
              }
            }

            // Update level progress if provided
            if (updates.unlockedDifficulty !== undefined) {
              // First ensure levelProgress exists
              const levelProgress = await tx.userLevelProgress.findUnique({
                where: { userId },
              });

              if (levelProgress) {
                updatePromises.push(
                  tx.userLevelProgress.update({
                    where: { userId },
                    data: { unlockedDifficulty: updates.unlockedDifficulty },
                  })
                );
              } else {
                // Create level progress if doesn't exist
                updatePromises.push(
                  tx.userLevelProgress.create({
                    data: {
                      userId,
                      unlockedDifficulty: updates.unlockedDifficulty,
                      difficulty1Points: 0,
                      difficulty2Points: 0,
                      difficulty3Points: 0,
                      difficulty4Points: 0,
                      difficulty5Points: 0,
                      pointsToUnlock3: 100,
                      pointsToUnlock4: 200,
                      pointsToUnlock5: 300,
                    },
                  })
                );
              }
            }

            await Promise.all(updatePromises);
            return { userId, success: true };
          });

          results.push(result);
        } catch (error) {
          console.error(`Error updating user ${userId}:`, error);
          results.push({
            userId,
            success: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      return reply.send({
        success: true,
        updated: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
        results,
      });
    } catch (error) {
      console.error("Error in batch update:", error);
      return reply.code(500).send({ error: "Failed to batch update users" });
    }
  });

  // GET user activity timeline
  fastify.get<{ Params: { userId: string } }>(
    "/users/:userId/timeline",
    async (request, reply) => {
      try {
        const { userId } = request.params;
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const [submissions, sessions, materials] = await prisma.$transaction([
          // Recent submissions
          prisma.submission.findMany({
            where: {
              userId,
              createdAt: { gte: thirtyDaysAgo },
            },
            orderBy: { createdAt: "desc" },
            take: 50,
            include: {
              exercise: {
                select: {
                  type: true,
                  category: true,
                  difficulty: true,
                  points: true,
                  question: true,
                },
              },
              assessment: {
                select: {
                  totalScore: true,
                },
              },
            },
          }),

          // Recent sessions
          prisma.learningSession.findMany({
            where: {
              userId,
              startedAt: { gte: thirtyDaysAgo },
            },
            orderBy: { startedAt: "desc" },
            take: 20,
          }),

          // Recent material progress
          prisma.userMaterialProgress.findMany({
            where: {
              userId,
              lastAccessed: { gte: thirtyDaysAgo },
            },
            orderBy: { lastAccessed: "desc" },
            take: 30,
            include: {
              material: {
                select: {
                  title: true,
                  type: true,
                  category: true,
                },
              },
            },
          }),
        ]);

        // Combine and sort timeline events
        const timeline = [
          ...submissions.map((s) => ({
            type: "submission" as const,
            timestamp: s.createdAt,
            data: s,
          })),
          ...sessions.map((s) => ({
            type: "session" as const,
            timestamp: s.startedAt,
            data: s,
          })),
          ...materials.map((m) => ({
            type: "material" as const,
            timestamp: m.lastAccessed,
            data: m,
          })),
        ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        return reply.send({ timeline });
      } catch (error) {
        console.error("Error fetching timeline:", error);
        return reply.code(500).send({ error: "Failed to fetch timeline" });
      }
    }
  );

  // POST grant achievement
  fastify.post<{
    Params: { userId: string };
    Body: {
      achievementId: string;
      reason?: string;
    };
  }>("/users/:userId/grant-achievement", async (request, reply) => {
    try {
      const { userId } = request.params;
      const { achievementId, reason } = request.body;

      const achievement = await prisma.userAchievement.create({
        data: {
          userId,
          achievementId,
        },
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId,
          type: "ACHIEVEMENT_GRANTED",
          title: "Nowe osiągnięcie!",
          message:
            reason ||
            "Otrzymałeś nowe osiągnięcie przyznane przez administratora.",
        },
      });

      return reply.send({ success: true, achievement });
    } catch (error: any) {
      if (error.code === "P2002") {
        return reply
          .code(400)
          .send({ error: "User already has this achievement" });
      }
      console.error("Error granting achievement:", error);
      return reply.code(500).send({ error: "Failed to grant achievement" });
    }
  });

  // POST send notification to user
  fastify.post<{
    Params: { userId: string };
    Body: {
      title: string;
      message: string;
      type?: string;
      actionUrl?: string;
    };
  }>("/users/:userId/notify", async (request, reply) => {
    try {
      const { userId } = request.params;
      const {
        title,
        message,
        type = "ADMIN_MESSAGE",
        actionUrl,
      } = request.body;

      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          actionUrl,
        },
      });

      return reply.send({ success: true, notification });
    } catch (error) {
      console.error("Error sending notification:", error);
      return reply.code(500).send({ error: "Failed to send notification" });
    }
  });

  // GET export user data
  fastify.get<{ Params: { userId: string } }>(
    "/users/:userId/export",
    async (request, reply) => {
      try {
        const { userId } = request.params;

        const userData = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            profile: true,
            levelProgress: true,
            submissions: {
              include: {
                exercise: true,
                assessment: true,
              },
            },
            assessments: true,
            notifications: true,
            weeklyProgress: true,
            studyGoals: true,
            dailyProgress: true,
            materialProgress: {
              include: {
                material: true,
              },
            },
            examSessions: {
              include: {
                exam: true,
                answers: true,
              },
            },
            exerciseUsage: {
              include: {
                exercise: true,
              },
            },
            learningSessions: true,
          },
        });

        if (!userData) {
          return reply.code(404).send({ error: "User not found" });
        }

        // Remove sensitive data
        const { password, refreshToken, ...exportData } = userData;

        return reply
          .header("Content-Type", "application/json")
          .header(
            "Content-Disposition",
            `attachment; filename="user-${userId}-export.json"`
          )
          .send(exportData);
      } catch (error) {
        console.error("Error exporting user data:", error);
        return reply.code(500).send({ error: "Failed to export user data" });
      }
    }
  );

  // Helper function
  function calculateTrend(dailyProgress: any[]) {
    if (dailyProgress.length < 2) return { direction: "stable", percentage: 0 };

    const recent = dailyProgress.slice(0, 7);
    const older = dailyProgress.slice(7, 14);

    if (older.length === 0) return { direction: "stable", percentage: 0 };

    const recentAvg =
      recent.reduce((acc, day) => acc + (day.averageScore || 0), 0) /
      recent.length;

    const olderAvg =
      older.reduce((acc, day) => acc + (day.averageScore || 0), 0) /
      older.length;

    if (olderAvg === 0) return { direction: "stable", percentage: 0 };

    const change = ((recentAvg - olderAvg) / olderAvg) * 100;

    return {
      direction: change > 5 ? "up" : change < -5 ? "down" : "stable",
      percentage: Math.round(Math.abs(change)),
    };
  }
  // GET subscription details for user
  fastify.get<{ Params: { userId: string } }>(
    "/users/:userId/subscription",
    async (request, reply) => {
      try {
        const { userId } = request.params;

        const subscription = await prisma.subscription.findUnique({
          where: { userId },
          include: {
            _count: {
              select: {
                aiUsage: true,
              },
            },
          },
        });

        if (!subscription) {
          return reply.send({
            userId,
            plan: "FREE",
            status: "INACTIVE",
            isRecurring: true,
            aiPointsUsed: 0,
            aiPointsLimit: 20,
            aiPointsReset: new Date(),
            totalAiCalls: 0,
            endDate: null,
          });
        }

        return reply.send({
          ...subscription,
          totalAiCalls: subscription._count.aiUsage,
        });
      } catch (error) {
        console.error("Error fetching subscription:", error);
        return reply.code(500).send({ error: "Failed to fetch subscription" });
      }
    }
  );

  // PUT update subscription for user
  fastify.put<{
    Params: { userId: string };
    Body: {
      plan?: "FREE" | "PREMIUM";
      status?: "ACTIVE" | "INACTIVE" | "CANCELED" | "PAST_DUE";
      aiPointsLimit?: number;
      aiPointsUsed?: number;
      resetPoints?: boolean;
      isRecurring?: boolean;
    };
  }>("/users/:userId/subscription", async (request, reply) => {
    try {
      const { userId } = request.params;
      const {
        plan,
        status,
        aiPointsLimit,
        aiPointsUsed,
        resetPoints,
        isRecurring,
      } = request.body;

      let subscription = await prisma.subscription.findUnique({
        where: { userId },
      });

      if (!subscription) {
        subscription = await prisma.subscription.create({
          data: {
            userId,
            status: status || "INACTIVE",
            plan: plan || "FREE",
            aiPointsLimit: aiPointsLimit || 20,
            aiPointsUsed: 0,
            aiPointsReset: new Date(),
            isRecurring: isRecurring !== undefined ? isRecurring : false,
          },
        });
      } else {
        const updateData: any = {};

        if (plan !== undefined) {
          updateData.plan = plan;
          if (plan === "FREE") {
            updateData.aiPointsLimit = 20;
            updateData.status = "INACTIVE";
          } else if (plan === "PREMIUM") {
            updateData.aiPointsLimit = 200;
            updateData.status = "ACTIVE";
          }
        }

        if (status !== undefined) updateData.status = status;
        if (aiPointsLimit !== undefined)
          updateData.aiPointsLimit = aiPointsLimit;
        if (aiPointsUsed !== undefined) updateData.aiPointsUsed = aiPointsUsed;

        // ✅ OBSŁUGA ZMIANY TYPU SUBSKRYPCJI
        if (isRecurring !== undefined) {
          // ✅ Zmiana z CYKLICZNEJ na JEDNORAZOWĄ
          if (
            subscription.isRecurring &&
            !isRecurring &&
            subscription.stripeSubscriptionId
          ) {
            try {
              const stripeSubscription = await stripe.subscriptions.retrieve(
                subscription.stripeSubscriptionId
              );

              if (
                stripeSubscription.status === "active" ||
                stripeSubscription.status === "trialing"
              ) {
                console.log(
                  `🔄 Admin is converting recurring subscription to one-time for user ${userId}`
                );

                // ✅ 1. Anuluj subskrypcję w Stripe (na koniec okresu)
                await stripe.subscriptions.update(
                  subscription.stripeSubscriptionId,
                  {
                    cancel_at_period_end: true,
                  }
                );

                // ✅ LEPSZE ROZWIĄZANIE: użyj już zapisanego stripeCurrentPeriodEnd
                let endDate: Date;

                if (subscription.stripeCurrentPeriodEnd) {
                  // Mamy już zapisane w bazie
                  endDate = subscription.stripeCurrentPeriodEnd;
                } else {
                  // Fallback - pobierz ze Stripe
                  const { current_period_end } = stripeSubscription as any;
                  endDate = new Date(current_period_end * 1000);
                }

                console.log(
                  `✅ Stripe subscription cancelled, will end at: ${endDate}`
                );

                // ✅ 2. Ustaw jednorazowy pakiet który zacznie się po wygaśnięciu
                const newEndDate = new Date(endDate);
                newEndDate.setDate(newEndDate.getDate() + 30);

                const existingMetadata =
                  (subscription.metadata as Record<string, any>) || {};

                updateData.isRecurring = false;
                updateData.cancelAt = endDate;
                updateData.metadata = {
                  ...existingMetadata,
                  pendingOneTimeAccess: {
                    startDate: endDate.toISOString(),
                    endDate: newEndDate.toISOString(),
                    convertedByAdmin: true,
                    convertedAt: new Date().toISOString(),
                    adminId: (request.user as any).userId,
                  },
                };

                console.log(
                  `✅ One-time access scheduled from ${endDate} to ${newEndDate}`
                );
              }
            } catch (stripeError) {
              console.error(
                "Error cancelling Stripe subscription:",
                stripeError
              );
              return reply.code(500).send({
                error: "Failed to cancel Stripe subscription",
                details: stripeError,
              });
            }
          }
          // ✅ Zmiana z JEDNORAZOWEJ na CYKLICZNĄ
          else if (!subscription.isRecurring && isRecurring) {
            updateData.isRecurring = true;
            updateData.endDate = null;
            updateData.cancelAt = null;

            // ✅ Usuń pending one-time access
            const existingMetadata =
              (subscription.metadata as Record<string, any>) || {};
            delete existingMetadata.pendingOneTimeAccess;
            updateData.metadata = existingMetadata;

            console.log(
              `✅ Converted one-time to recurring for user ${userId}`
            );
          }
          // ✅ Standardowa zmiana bez aktywnej subskrypcji Stripe
          else {
            updateData.isRecurring = isRecurring;

            if (!isRecurring && !subscription.endDate) {
              const endDate = new Date();
              endDate.setDate(endDate.getDate() + 30);
              updateData.endDate = endDate;
            }

            if (isRecurring) {
              updateData.endDate = null;
            }
          }
        }

        if (resetPoints) {
          updateData.aiPointsUsed = 0;
          updateData.aiPointsReset = new Date();
        }

        subscription = await prisma.subscription.update({
          where: { id: subscription.id },
          data: updateData,
        });
      }

      return reply.send({
        success: true,
        subscription,
      });
    } catch (error) {
      console.error("Error updating subscription:", error);
      return reply.code(500).send({ error: "Failed to update subscription" });
    }
  });

  // POST add AI points to user
  fastify.post<{
    Params: { userId: string };
    Body: {
      pointsToAdd: number;
      reason?: string;
    };
  }>("/users/:userId/add-points", async (request, reply) => {
    try {
      const { userId } = request.params;
      const { pointsToAdd, reason } = request.body;

      if (!pointsToAdd || pointsToAdd < 0) {
        return reply.code(400).send({ error: "Invalid points amount" });
      }

      const subscription = await prisma.subscription.findUnique({
        where: { userId },
      });

      if (!subscription) {
        return reply.code(404).send({ error: "Subscription not found" });
      }

      // Add points to limit
      const updated = await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          aiPointsLimit: { increment: pointsToAdd },
        },
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId,
          type: "ADMIN_MESSAGE",
          title: "Dodano punkty AI",
          message:
            reason ||
            `Administrator dodał ${pointsToAdd} punktów AI do Twojego konta.`,
        },
      });

      return reply.send({
        success: true,
        subscription: updated,
        pointsAdded: pointsToAdd,
      });
    } catch (error) {
      console.error("Error adding points:", error);
      return reply.code(500).send({ error: "Failed to add points" });
    }
  });

  // GET AI usage history for user
  fastify.get<{ Params: { userId: string } }>(
    "/users/:userId/ai-usage",
    async (request, reply) => {
      try {
        const { userId } = request.params;

        const usage = await prisma.aiUsage.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 50,
          include: {
            exercise: {
              select: {
                question: true,
                type: true,
                difficulty: true,
              },
            },
          },
        });

        return reply.send(usage);
      } catch (error) {
        console.error("Error fetching AI usage:", error);
        return reply.code(500).send({ error: "Failed to fetch AI usage" });
      }
    }
  );
}
