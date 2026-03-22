// backend/src/routes/admin-email-analytics.routes.ts
// Dodaj do istniejącego admin-email.routes.ts lub jako osobny plik

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function adminEmailAnalyticsRoutes(fastify: FastifyInstance) {
  // Auth middleware — admin only
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

  // ================================================================
  // GET /api/admin/email/analytics/overview
  // Główny dashboard — wszystkie metryki
  // ================================================================
  fastify.get("/analytics/overview", async (request, reply) => {
    const { days = 30 } = request.query as { days?: number };
    const since = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);

    // Równoległe zapytania
    const [
      // EmailLog stats
      totalSent,
      sentByType,

      // EmailEvent stats
      totalDeliveries,
      totalBounces,
      totalComplaints,
      totalOpens,
      totalClicks,

      // Bounce breakdown
      hardBounces,
      softBounces,

      // Suppression list
      suppressionCount,
      suppressionByReason,

      // Preferencje
      totalPrefs,
      optedOutAll,
      optOutByCategory,

      // Daily trend (ostatnie N dni)
      dailySentRaw,
      dailyEventsRaw,
    ] = await Promise.all([
      // --- Wysyłki ---
      prisma.emailLog.count({ where: { sentAt: { gte: since } } }),

      prisma.emailLog.groupBy({
        by: ["type"],
        _count: { id: true },
        where: { sentAt: { gte: since } },
        orderBy: { _count: { id: "desc" } },
      }),

      // --- Eventy ---
      prisma.emailEvent.count({
        where: { eventType: "DELIVERY", createdAt: { gte: since } },
      }),
      prisma.emailEvent.count({
        where: { eventType: "BOUNCE", createdAt: { gte: since } },
      }),
      prisma.emailEvent.count({
        where: { eventType: "COMPLAINT", createdAt: { gte: since } },
      }),
      prisma.emailEvent.count({
        where: { eventType: "OPEN", createdAt: { gte: since } },
      }),
      prisma.emailEvent.count({
        where: { eventType: "CLICK", createdAt: { gte: since } },
      }),

      // --- Bounce types ---
      prisma.emailEvent.count({
        where: {
          eventType: "BOUNCE",
          bounceType: "Permanent",
          createdAt: { gte: since },
        },
      }),
      prisma.emailEvent.count({
        where: {
          eventType: "BOUNCE",
          bounceType: "Transient",
          createdAt: { gte: since },
        },
      }),

      // --- Suppression ---
      prisma.emailSuppression.count(),
      prisma.emailSuppression.groupBy({
        by: ["reason"],
        _count: { id: true },
      }),

      // --- Preferencje ---
      prisma.emailPreference.count(),
      prisma.emailPreference.count({ where: { allEmails: false } }),

      // Opt-out per category
      Promise.all([
        prisma.emailPreference.count({
          where: { streakReminders: false, allEmails: true },
        }),
        prisma.emailPreference.count({
          where: { weeklySummary: false, allEmails: true },
        }),
        prisma.emailPreference.count({
          where: { reengagement: false, allEmails: true },
        }),
        prisma.emailPreference.count({
          where: { promotions: false, allEmails: true },
        }),
        prisma.emailPreference.count({
          where: { achievements: false, allEmails: true },
        }),
        prisma.emailPreference.count({
          where: { examCountdown: false, allEmails: true },
        }),
        prisma.emailPreference.count({
          where: { newContent: false, allEmails: true },
        }),
      ]),

      // --- Daily trends ---
      prisma.$queryRaw<{ date: string; count: number }[]>`
        SELECT DATE("sentAt") as date, COUNT(*)::int as count
        FROM "EmailLog"
        WHERE "sentAt" >= ${since}
        GROUP BY DATE("sentAt")
        ORDER BY date ASC
      `,

      prisma.$queryRaw<{ date: string; event_type: string; count: number }[]>`
        SELECT DATE("createdAt") as date, "eventType"::text as event_type, COUNT(*)::int as count
        FROM "EmailEvent"
        WHERE "createdAt" >= ${since}
        GROUP BY DATE("createdAt"), "eventType"
        ORDER BY date ASC
      `,
    ]);

    // Oblicz wskaźniki
    const deliveryRate =
      totalSent > 0
        ? Math.round((totalDeliveries / totalSent) * 10000) / 100
        : 0;
    const bounceRate =
      totalSent > 0 ? Math.round((totalBounces / totalSent) * 10000) / 100 : 0;
    const complaintRate =
      totalSent > 0
        ? Math.round((totalComplaints / totalSent) * 10000) / 100
        : 0;
    const openRate =
      totalDeliveries > 0
        ? Math.round((totalOpens / totalDeliveries) * 10000) / 100
        : 0;
    const clickRate =
      totalOpens > 0 ? Math.round((totalClicks / totalOpens) * 10000) / 100 : 0;

    // SES limity bezpieczeństwa
    const bounceWarning = bounceRate > 2; // ostrzegaj powyżej 2%
    const bounceDanger = bounceRate > 5; // SES blokuje powyżej 5%
    const complaintWarning = complaintRate > 0.05;
    const complaintDanger = complaintRate > 0.1; // SES blokuje powyżej 0.1%

    // Daily trend — merge sent + events
    const dailySent = (dailySentRaw as any[]).map((d) => ({
      date: new Date(d.date).toISOString().split("T")[0],
      sent: Number(d.count),
    }));

    const dailyEvents: Record<string, Record<string, number>> = {};
    (dailyEventsRaw as any[]).forEach((d) => {
      const date = new Date(d.date).toISOString().split("T")[0];
      if (!dailyEvents[date]) dailyEvents[date] = {};
      dailyEvents[date][d.event_type] = Number(d.count);
    });

    // Merge
    const dailyTrend = dailySent.map((d) => ({
      date: d.date,
      sent: d.sent,
      delivered: dailyEvents[d.date]?.DELIVERY || 0,
      bounced: dailyEvents[d.date]?.BOUNCE || 0,
      complained: dailyEvents[d.date]?.COMPLAINT || 0,
      opened: dailyEvents[d.date]?.OPEN || 0,
      clicked: dailyEvents[d.date]?.CLICK || 0,
    }));

    const categoryOptOuts: Record<string, number> = {};
    const categories = [
      "streakReminders",
      "weeklySummary",
      "reengagement",
      "promotions",
      "achievements",
      "examCountdown",
      "newContent",
    ];
    const optOutCounts = optOutByCategory as number[];
    categories.forEach((cat, i) => {
      categoryOptOuts[cat] = optOutCounts[i] || 0;
    });

    return reply.send({
      period: { days: Number(days), since: since.toISOString() },

      // Główne metryki
      overview: {
        totalSent,
        totalDelivered: totalDeliveries,
        totalBounced: totalBounces,
        totalComplaints,
        totalOpened: totalOpens,
        totalClicked: totalClicks,
      },

      // Wskaźniki procentowe
      rates: {
        deliveryRate,
        bounceRate,
        complaintRate,
        openRate,
        clickRate,
      },

      // Alerty zdrowia SES
      health: {
        bounceStatus: bounceDanger
          ? "DANGER"
          : bounceWarning
            ? "WARNING"
            : "OK",
        bounceRate,
        bounceLimit: 5,
        complaintStatus: complaintDanger
          ? "DANGER"
          : complaintWarning
            ? "WARNING"
            : "OK",
        complaintRate,
        complaintLimit: 0.1,
        message: bounceDanger
          ? "🚨 KRYTYCZNE: Bounce rate przekracza 5%! SES może zablokować konto!"
          : complaintDanger
            ? "🚨 KRYTYCZNE: Complaint rate przekracza 0.1%! SES może zablokować konto!"
            : bounceWarning
              ? "⚠️ Bounce rate rośnie — sprawdź suppression list"
              : complaintWarning
                ? "⚠️ Complaint rate rośnie — sprawdź treść emaili"
                : "✅ Wszystko w normie",
      },

      // Bounce breakdown
      bounces: {
        hard: hardBounces,
        soft: softBounces,
        total: totalBounces,
      },

      // Suppression list
      suppression: {
        total: suppressionCount,
        byReason: suppressionByReason.map((s) => ({
          reason: s.reason,
          count: s._count.id,
        })),
      },

      // Preferencje email
      preferences: {
        totalUsers: totalPrefs,
        optedOutAll: optedOutAll,
        optInRate:
          totalPrefs > 0
            ? Math.round(((totalPrefs - optedOutAll) / totalPrefs) * 100)
            : 100,
        categoryOptOuts,
      },

      // Wysyłki wg typu kampanii
      campaignBreakdown: sentByType.map((t) => ({
        type: t.type,
        count: t._count.id,
      })),

      // Trend dzienny
      dailyTrend,
    });
  });

  // ================================================================
  // GET /api/admin/email/analytics/suppression
  // Lista zablokowanych adresów
  // ================================================================
  fastify.get("/analytics/suppression", async (request, reply) => {
    const { limit = 100, offset = 0 } = request.query as any;

    const [list, total] = await Promise.all([
      prisma.emailSuppression.findMany({
        orderBy: { lastEventAt: "desc" },
        take: Number(limit),
        skip: Number(offset),
      }),
      prisma.emailSuppression.count(),
    ]);

    return reply.send({
      list,
      total,
      hasMore: Number(offset) + Number(limit) < total,
    });
  });

  // ================================================================
  // DELETE /api/admin/email/analytics/suppression/:email
  // Usuń adres z suppression list (np. po naprawieniu problemu)
  // ================================================================
  fastify.delete("/analytics/suppression/:email", async (request, reply) => {
    const { email } = request.params as { email: string };

    try {
      await prisma.emailSuppression.delete({
        where: { email: email.toLowerCase() },
      });

      // Przywróć emaile dla usera
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true },
      });

      if (user?.id) {
        await prisma.emailPreference.updateMany({
          where: { userId: user.id },
          data: { allEmails: true },
        });
      }

      return reply.send({
        success: true,
        message: `Usunięto ${email} z suppression list`,
      });
    } catch (error) {
      return reply
        .code(404)
        .send({ error: "Email not found in suppression list" });
    }
  });

  // ================================================================
  // GET /api/admin/email/analytics/events
  // Historia eventów (bounce, complaint, delivery...)
  // ================================================================
  fastify.get("/analytics/events", async (request, reply) => {
    const {
      limit = 50,
      offset = 0,
      type,
      email,
    } = request.query as {
      limit?: number;
      offset?: number;
      type?: string;
      email?: string;
    };

    const where: any = {};
    if (type) where.eventType = type;
    if (email) where.recipientEmail = { contains: email, mode: "insensitive" };

    const [events, total] = await Promise.all([
      prisma.emailEvent.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: Number(limit),
        skip: Number(offset),
        select: {
          id: true,
          recipientEmail: true,
          userId: true,
          eventType: true,
          bounceType: true,
          bounceSubType: true,
          complaintType: true,
          sesMessageId: true,
          createdAt: true,
          // NIE zwracaj rawData — może być duże
        },
      }),
      prisma.emailEvent.count({ where }),
    ]);

    return reply.send({
      events,
      total,
      hasMore: Number(offset) + Number(limit) < total,
    });
  });

  // ================================================================
  // GET /api/admin/email/analytics/campaign/:type
  // Szczegóły konkretnej kampanii (np. WEEKLY_SUMMARY)
  // ================================================================
  fastify.get("/analytics/campaign/:type", async (request, reply) => {
    const { type } = request.params as { type: string };
    const { days = 30 } = request.query as { days?: number };
    const since = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);

    // Ile wysłano
    const sent = await prisma.emailLog.count({
      where: { type, sentAt: { gte: since } },
    });

    // Trend dzienny
    const dailyRaw = await prisma.$queryRaw<{ date: string; count: number }[]>`
      SELECT DATE("sentAt") as date, COUNT(*)::int as count
      FROM "EmailLog"
      WHERE "type" = ${type} AND "sentAt" >= ${since}
      GROUP BY DATE("sentAt")
      ORDER BY date ASC
    `;

    const daily = (dailyRaw as any[]).map((d) => ({
      date: new Date(d.date).toISOString().split("T")[0],
      count: Number(d.count),
    }));

    // Ostatnie 20 wysyłek
    const recent = await prisma.emailLog.findMany({
      where: { type, sentAt: { gte: since } },
      orderBy: { sentAt: "desc" },
      take: 20,
      select: {
        id: true,
        userId: true,
        sentAt: true,
        metadata: true,
      },
    });

    return reply.send({
      type,
      totalSent: sent,
      daily,
      recent,
    });
  });
}

// ============================================================
// REJESTRACJA:
// W index.ts dodaj:
//
// import { adminEmailAnalyticsRoutes } from "./routes/admin-email-analytics.routes";
// fastify.register(adminEmailAnalyticsRoutes, { prefix: "/api/admin/email" });
// ============================================================
