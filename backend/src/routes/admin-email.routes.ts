// backend/src/routes/admin-email.routes.ts
// Endpointy do testowania systemu mailingowego (tylko admin)

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { engagementMailer } from "../services/engagementMailerService";
import {
  runMorningEmailJobs,
  runEveningEmailJobs,
  runWeeklyEmailJobs,
  runMonthlyEmailJobs,
} from "../jobs/engagementMailerJob";

export async function adminEmailRoutes(fastify: FastifyInstance) {
  // Auth middleware
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as any;
      if (user.role !== "ADMIN") {
        return reply.code(403).send({ error: "Admin only" });
      }
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Ręcznie uruchom morning jobs
  fastify.post("/trigger/morning", async (_request, reply) => {
    await runMorningEmailJobs();
    return reply.send({ success: true, message: "Morning jobs executed" });
  });

  // Ręcznie uruchom evening jobs
  fastify.post("/trigger/evening", async (_request, reply) => {
    await runEveningEmailJobs();
    return reply.send({ success: true, message: "Evening jobs executed" });
  });

  // Ręcznie uruchom weekly jobs
  fastify.post("/trigger/weekly", async (_request, reply) => {
    await runWeeklyEmailJobs();
    return reply.send({ success: true, message: "Weekly jobs executed" });
  });

  // Ręcznie uruchom monthly jobs
  fastify.post("/trigger/monthly", async (_request, reply) => {
    await runMonthlyEmailJobs();
    return reply.send({ success: true, message: "Monthly jobs executed" });
  });

  // Wyślij testowy email do siebie
  fastify.post("/test-send", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { type } = request.body as { type: string };

    switch (type) {
      case "streak_reminder":
        await engagementMailer.sendStreakReminders();
        break;
      case "free_limit":
        await engagementMailer.sendFreeLimitHitEmail(userId);
        break;
      case "level_unlock":
        await engagementMailer.sendLevelUnlockEmail(userId, 3);
        break;
      default:
        return reply.code(400).send({ error: `Unknown type: ${type}` });
    }

    return reply.send({ success: true, message: `Test email '${type}' sent` });
  });

  // Statystyki wysyłki
  fastify.get("/stats", async (_request, reply) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayCount, weekCount, totalCount, byType] = await Promise.all([
      prisma.emailLog.count({ where: { sentAt: { gte: today } } }),
      prisma.emailLog.count({
        where: {
          sentAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.emailLog.count(),
      prisma.emailLog.groupBy({
        by: ["type"],
        _count: { id: true },
        where: {
          sentAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
        orderBy: { _count: { id: "desc" } },
      }),
    ]);

    // Preferencje stats
    const [totalPrefs, optedOut] = await Promise.all([
      prisma.emailPreference.count(),
      prisma.emailPreference.count({ where: { allEmails: false } }),
    ]);

    return reply.send({
      emails: {
        today: todayCount,
        thisWeek: weekCount,
        total: totalCount,
        byType: byType.map((t) => ({ type: t.type, count: t._count.id })),
      },
      preferences: {
        total: totalPrefs,
        optedOutAll: optedOut,
        optInRate:
          totalPrefs > 0
            ? Math.round(((totalPrefs - optedOut) / totalPrefs) * 100)
            : 100,
      },
    });
  });

  // Lista ostatnich wysyłek
  fastify.get("/recent", async (request, reply) => {
    const { limit = 50 } = request.query as { limit?: number };

    const logs = await prisma.emailLog.findMany({
      orderBy: { sentAt: "desc" },
      take: Number(limit),
      select: {
        id: true,
        userId: true,
        type: true,
        subject: true,
        metadata: true,
        sentAt: true,
        // NIE zwracaj html w liście — za duże
      },
    });

    // Dociągnij emaile userów
    const userIds = [...new Set(logs.map((l) => l.userId))];
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, email: true, username: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    return reply.send(
      logs.map((log) => ({
        ...log,
        userEmail: userMap.get(log.userId)?.email || "—",
        userName: userMap.get(log.userId)?.username || "—",
      })),
    );
  });

  // NOWY: Podgląd treści konkretnego maila
  fastify.get("/preview/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const log = await prisma.emailLog.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        type: true,
        subject: true,
        html: true,
        metadata: true,
        sentAt: true,
      },
    });

    if (!log) {
      return reply.code(404).send({ error: "Email not found" });
    }

    const user = await prisma.user.findUnique({
      where: { id: log.userId },
      select: { email: true, username: true },
    });

    return reply.send({
      ...log,
      userEmail: user?.email || "—",
      userName: user?.username || "—",
    });
  });
}
