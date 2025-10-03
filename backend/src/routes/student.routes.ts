// backend/src/routes/student.routes.ts - POPRAWIONA WERSJA

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function studentRoutes(fastify: FastifyInstance) {
  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Get student stats
  fastify.get("/stats", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      // Today's stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [todaySubmissions, totalSubmissions, userProfile] =
        await Promise.all([
          prisma.submission.findMany({
            where: {
              userId,
              createdAt: { gte: today },
            },
            include: {
              exercise: {
                select: { points: true },
              },
            },
          }),

          prisma.submission.count({
            where: { userId },
          }),

          prisma.userProfile.findUnique({
            where: { userId },
          }),
        ]);

      const todayExercises = todaySubmissions.length;

      // Poprawione obliczenie dzisiejszych poprawnych (procent)
      const todayCorrect = todaySubmissions.filter((s) => {
        const percentage = ((s.score || 0) / s.exercise.points) * 100;
        return percentage >= 50; // Uznajemy 50%+ za poprawne
      }).length;

      // ✅ POPRAWIONE: Oblicz średni wynik jako PROCENT
      const allSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          score: { not: null },
        },
        include: {
          exercise: {
            select: { points: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });

      const averageScore =
        allSubmissions.length > 0
          ? Math.round(
              allSubmissions.reduce((sum, s) => {
                return sum + ((s.score || 0) / s.exercise.points) * 100;
              }, 0) / allSubmissions.length
            )
          : 0;

      const stats = {
        todayExercises,
        todayCorrect,
        totalSubmissions: Number(totalSubmissions),
        streak: userProfile?.studyStreak || 0,
        level: userProfile?.level || 1,
        totalPoints: userProfile?.totalPoints || 0,
        averageScore, // Teraz to jest procent!
        completedExercises: allSubmissions.length,
      };

      return reply.send(stats);
    } catch (error) {
      console.error("Error getting student stats:", error);
      return reply.code(500).send({ error: "Failed to get student stats" });
    }
  });

  // Get student progress - ZUPEŁNIE PRZEPISANE
  fastify.get("/progress", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      const userProfile = await prisma.userProfile.findUnique({
        where: { userId },
      });

      // 1. PODSTAWOWE STATYSTYKI
      const totalExercises = await prisma.exercise.count();

      // Policz unikalne ukończone zadania
      const uniqueExercises = await prisma.submission.groupBy({
        by: ["exerciseId"],
        where: { userId },
      });
      const completedExercises = uniqueExercises.length;

      // 2. DANE DO WYKRESU POSTĘPU W CZASIE (ostatnie 30 dni)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const dailyProgress = await prisma.dailyProgress.findMany({
        where: {
          userId,
          date: { gte: thirtyDaysAgo },
        },
        orderBy: { date: "asc" },
      });

      const progressData = dailyProgress.map((day) => ({
        date: day.date.toISOString().split("T")[0],
        score: Math.round(day.averageScore || 0),
        exercises: day.exercisesCount,
      }));

      // 3. WYDAJNOŚĆ WG KATEGORII (dla wykresu radarowego)
      const categories = ["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"];
      const categoryPerformance = await Promise.all(
        categories.map(async (category) => {
          const submissions = await prisma.submission.findMany({
            where: {
              userId,
              exercise: { category: category as any },
            },
            include: {
              exercise: {
                select: { points: true },
              },
            },
          });

          // ✅ POPRAWIONE: Oblicz jako procent
          const avgScore =
            submissions.length > 0
              ? submissions.reduce((sum, s) => {
                  return sum + ((s.score || 0) / s.exercise.points) * 100;
                }, 0) / submissions.length
              : 0;

          // Pobierz średnią globalną dla porównania
          const globalSubmissions = await prisma.submission.findMany({
            where: {
              exercise: { category: category as any },
            },
            include: {
              exercise: {
                select: { points: true },
              },
            },
            take: 1000, // Sample
          });

          const globalAvg =
            globalSubmissions.length > 0
              ? globalSubmissions.reduce((sum, s) => {
                  return sum + ((s.score || 0) / s.exercise.points) * 100;
                }, 0) / globalSubmissions.length
              : 0;

          return {
            category:
              category === "LANGUAGE_USE"
                ? "Język w użyciu"
                : category === "HISTORICAL_LITERARY"
                ? "Test historycznoliteracki"
                : "Pisanie",
            score: Math.round(avgScore),
            average: Math.round(globalAvg),
          };
        })
      );

      // 4. STATYSTYKI TRUDNOŚCI
      const difficultyStats = await Promise.all(
        [1, 2, 3, 4, 5].map(async (difficulty) => {
          const submissions = await prisma.submission.findMany({
            where: {
              userId,
              exercise: { difficulty },
            },
            include: {
              exercise: {
                select: { points: true },
              },
            },
          });

          const completed = submissions.filter((s) => {
            const percentage = ((s.score || 0) / s.exercise.points) * 100;
            return percentage >= 50;
          }).length;

          const failed = submissions.filter((s) => {
            const percentage = ((s.score || 0) / s.exercise.points) * 100;
            return percentage < 50;
          }).length;

          return {
            difficulty: `Poziom ${difficulty}`,
            completed,
            failed,
          };
        })
      );

      // 5. ✅ POPRAWIONY ROZKŁAD CZASU - używam DailyProgress zamiast submissions
      const dailyProgressByCategory = await Promise.all(
        categories.map(async (category) => {
          // Oblicz czas z sesji nauki
          const sessions = await prisma.learningSession.findMany({
            where: {
              userId,
              status: "COMPLETED",
            },
          });

          // Przybliżona kalkulacja - dzielimy czas proporcjonalnie do liczby zadań w kategorii
          const categorySubmissions = await prisma.submission.count({
            where: {
              userId,
              exercise: { category: category as any },
            },
          });

          const totalSubmissions = await prisma.submission.count({
            where: { userId },
          });

          const totalTime = sessions.reduce((sum, s) => sum + s.timeSpent, 0);
          const categoryTime =
            totalSubmissions > 0
              ? (totalTime * categorySubmissions) / totalSubmissions
              : 0;

          return {
            name:
              category === "LANGUAGE_USE"
                ? "Język w użyciu"
                : category === "HISTORICAL_LITERARY"
                ? "Test historycznoliteracki"
                : "Pisanie",
            value: Math.round(categoryTime / 60), // minuty
          };
        })
      );

      // 6. HISTORIA OSTATNICH AKTYWNOŚCI
      const recentSubmissions = await prisma.submission.findMany({
        where: { userId },
        include: {
          exercise: {
            select: {
              question: true,
              category: true,
              points: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      });

      const history = recentSubmissions.map((sub) => ({
        id: sub.id,
        exerciseName: sub.exercise.question.substring(0, 50) + "...",
        category: sub.exercise.category,
        question: sub.exercise.question,
        score: sub.score || 0,
        maxPoints: sub.exercise.points,
        percentage: Math.round(((sub.score || 0) / sub.exercise.points) * 100),
        date: sub.createdAt,
        timeAgo: getTimeAgo(sub.createdAt),
      }));

      // 7. ✅ POPRAWIONE OBLICZENIE ŚREDNIEGO WYNIKU
      const allScores = await prisma.submission.findMany({
        where: {
          userId,
          score: { not: null },
        },
        include: {
          exercise: {
            select: { points: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });

      const averageScore =
        allScores.length > 0
          ? Math.round(
              allScores.reduce((sum, s) => {
                return sum + ((s.score || 0) / s.exercise.points) * 100;
              }, 0) / allScores.length
            )
          : 0;

      // Sprawdź zmianę wyniku (ostatnie 7 dni vs wcześniejsze)
      const lastWeekScores = await prisma.submission.findMany({
        where: {
          userId,
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          score: { not: null },
        },
        include: {
          exercise: {
            select: { points: true },
          },
        },
      });

      const lastWeekAvg =
        lastWeekScores.length > 0
          ? lastWeekScores.reduce((sum, s) => {
              return sum + ((s.score || 0) / s.exercise.points) * 100;
            }, 0) / lastWeekScores.length
          : 0;

      const scoreChange = Math.round(averageScore - lastWeekAvg);

      // 8. OBLICZ CAŁKOWITY CZAS NAUKI (w tym miesiącu)
      const thisMonth = new Date();
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      const monthlyTime = await prisma.dailyProgress.aggregate({
        where: {
          userId,
          date: { gte: thisMonth },
        },
        _sum: { studyTime: true },
      });

      // 9. ✅ NOWE: STATYSTYKI EPOK
      const epochStats = await getEpochDetailedStats(userId);

      return reply.send({
        // Podstawowe statystyki
        averageScore,
        scoreChange,
        totalPoints: userProfile?.totalPoints || 0,
        level: userProfile?.level || 1,
        completedExercises,
        totalExercises,
        totalTime: monthlyTime._sum.studyTime || 0,

        // Dane do wykresów
        progressData,
        categoryPerformance,
        difficultyStats,
        timeDistribution: dailyProgressByCategory, // Poprawione

        // Historia
        history,

        // Nowe: Szczegółowe statystyki epok
        epochStats,
      });
    } catch (error) {
      console.error("Error getting progress:", error);
      return reply.code(500).send({ error: "Failed to get progress data" });
    }
  });

  // ✅ NOWY ENDPOINT: Szczegółowe statystyki
  fastify.get("/detailed-stats", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;

      const [profile, submissions, sessions] = await Promise.all([
        prisma.userProfile.findUnique({ where: { userId } }),
        prisma.submission.findMany({
          where: { userId },
          include: {
            exercise: {
              select: {
                points: true,
                difficulty: true,
                type: true,
                category: true,
              },
            },
          },
        }),
        prisma.learningSession.findMany({
          where: { userId, status: "COMPLETED" },
        }),
      ]);

      // Oblicz statystyki
      const totalSessions = sessions.length;
      const totalTime = sessions.reduce((sum, s) => sum + s.timeSpent, 0);
      const avgSessionLength =
        totalSessions > 0 ? totalTime / totalSessions : 0;

      // Średni wynik jako procent
      const averageScore =
        submissions.length > 0
          ? Math.round(
              submissions.reduce((sum, s) => {
                return sum + ((s.score || 0) / s.exercise.points) * 100;
              }, 0) / submissions.length
            )
          : 0;

      // Najlepsze kategorie
      const categoryScores = {
        LANGUAGE_USE: [] as number[],
        HISTORICAL_LITERARY: [] as number[],
        WRITING: [] as number[],
      };

      submissions.forEach((s) => {
        const percentage = ((s.score || 0) / s.exercise.points) * 100;
        if (s.exercise.category in categoryScores) {
          categoryScores[
            s.exercise.category as keyof typeof categoryScores
          ].push(percentage);
        }
      });

      const categoryAverages = Object.entries(categoryScores)
        .map(([cat, scores]) => ({
          category: cat,
          average:
            scores.length > 0
              ? scores.reduce((a, b) => a + b, 0) / scores.length
              : 0,
          count: scores.length,
        }))
        .sort((a, b) => b.average - a.average);

      // Najlepsze poziomy trudności
      const difficultyScores: Record<number, number[]> = {};
      submissions.forEach((s) => {
        const percentage = ((s.score || 0) / s.exercise.points) * 100;
        if (!difficultyScores[s.exercise.difficulty]) {
          difficultyScores[s.exercise.difficulty] = [];
        }
        difficultyScores[s.exercise.difficulty].push(percentage);
      });

      const bestDifficulty = Object.entries(difficultyScores)
        .map(([diff, scores]) => ({
          difficulty: parseInt(diff),
          average: scores.reduce((a, b) => a + b, 0) / scores.length,
          count: scores.length,
        }))
        .sort((a, b) => b.average - a.average)[0];

      // Streak stats
      const last7Days = await prisma.dailyProgress.findMany({
        where: {
          userId,
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { date: "desc" },
      });

      const activeDays = last7Days.filter((d) => d.exercisesCount > 0).length;

      return reply.send({
        profile: {
          level: profile?.level || 1,
          totalPoints: profile?.totalPoints || 0,
          streak: profile?.studyStreak || 0,
          averageScore,
        },
        sessions: {
          total: totalSessions,
          avgLength: Math.round(avgSessionLength / 60), // minuty
          totalTime: Math.round(totalTime / 3600), // godziny
        },
        performance: {
          totalSubmissions: submissions.length,
          uniqueExercises: new Set(submissions.map((s) => s.exerciseId)).size,
          bestCategory: categoryAverages[0],
          categoryRanking: categoryAverages,
          bestDifficulty,
        },
        activity: {
          activeDaysLast7: activeDays,
          consistency: Math.round((activeDays / 7) * 100),
        },
      });
    } catch (error) {
      console.error("Error getting detailed stats:", error);
      return reply.code(500).send({ error: "Failed to get detailed stats" });
    }
  });

  // Get recent notifications
  fastify.get("/notifications", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const { limit = 10 } = request.query as { limit?: number };

      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
      });

      return reply.send(notifications);
    } catch (error) {
      console.error("Error getting notifications:", error);
      return reply.code(500).send({ error: "Failed to get notifications" });
    }
  });

  // Mark notification as read
  fastify.put("/notifications/:id/read", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const userId = (request.user as any).userId;

      const notification = await prisma.notification.update({
        where: {
          id,
          userId,
        },
        data: { read: true },
      });

      return reply.send(notification);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      return reply.code(500).send({ error: "Failed to update notification" });
    }
  });

  // Get detailed history
  fastify.get("/history", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { limit = 50, offset = 0 } = request.query as any;

    const [submissions, exams, sessions] = await Promise.all([
      prisma.submission.findMany({
        where: { userId },
        include: {
          exercise: {
            select: {
              question: true,
              category: true,
              type: true,
              difficulty: true,
              points: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),

      prisma.examSession.findMany({
        where: { userId, status: "COMPLETED" },
        include: {
          exam: {
            select: { title: true, type: true },
          },
        },
        orderBy: { finishedAt: "desc" },
        take: 10,
      }),

      prisma.learningSession.findMany({
        where: { userId, status: "COMPLETED" },
        orderBy: { finishedAt: "desc" },
        take: 10,
      }),
    ]);

    return reply.send({
      exercises: submissions.map((s) => ({
        id: s.id,
        date: s.createdAt,
        question: s.exercise.question,
        category: s.exercise.category,
        type: s.exercise.type,
        difficulty: s.exercise.difficulty,
        score: s.score,
        maxPoints: s.exercise.points,
        percentage: s.score
          ? Math.round((s.score / s.exercise.points) * 100)
          : 0,
      })),
      exams: exams.map((e) => ({
        id: e.id,
        date: e.finishedAt,
        title: e.exam.title,
        type: e.exam.type,
        score: e.percentScore,
        totalPoints: e.totalScore,
      })),
      learningSessions: sessions.map((s) => ({
        id: s.id,
        date: s.finishedAt,
        completed: s.completed,
        correct: s.correct,
        points: s.points,
        timeSpent: Math.round(s.timeSpent / 60),
      })),
    });
  });
}

// ✅ NOWA FUNKCJA: Szczegółowe statystyki epok
async function getEpochDetailedStats(userId: string) {
  const epochs = [
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
  ];

  const stats = await Promise.all(
    epochs.map(async (epoch) => {
      const submissions = await prisma.submission.findMany({
        where: {
          userId,
          exercise: {
            category: "HISTORICAL_LITERARY",
            epoch: epoch as any,
          },
        },
        include: {
          exercise: {
            select: { points: true, id: true },
          },
        },
      });

      const totalExercises = await prisma.exercise.count({
        where: {
          category: "HISTORICAL_LITERARY",
          epoch: epoch as any,
        },
      });

      const uniqueCompleted = new Set(submissions.map((s) => s.exercise.id))
        .size;

      const avgScore =
        submissions.length > 0
          ? Math.round(
              submissions.reduce((sum, s) => {
                return sum + ((s.score || 0) / s.exercise.points) * 100;
              }, 0) / submissions.length
            )
          : 0;

      return {
        epoch,
        total: totalExercises,
        completed: uniqueCompleted,
        attempts: submissions.length,
        avgScore,
        progress:
          totalExercises > 0
            ? Math.round((uniqueCompleted / totalExercises) * 100)
            : 0,
      };
    })
  );

  return stats.sort((a, b) => b.progress - a.progress);
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "przed chwilą";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min temu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} godz. temu`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} dni temu`;
  return date.toLocaleDateString("pl-PL");
}
