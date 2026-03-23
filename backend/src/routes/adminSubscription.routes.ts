// backend/src/routes/adminSubscription.routes.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

interface UserPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}

export async function adminSubscriptionRoutes(
  fastify: FastifyInstance,
): Promise<void> {
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
    },
  );

  // ============================================================
  // GET /api/admin/subscriptions — lista subskrypcji + statystyki
  // ============================================================
  fastify.get<{
    Querystring: {
      search?: string;
      plan?: string;
      status?: string;
      type?: string; // "recurring" | "onetime" | "all"
      page?: string;
      limit?: string;
      sortBy?: string;
      sortOrder?: string;
      expiringDays?: string; // pokaż wygasające w N dni
    };
  }>("/subscriptions", async (request, reply) => {
    try {
      const {
        search,
        plan,
        status,
        type,
        page = "1",
        limit = "20",
        sortBy = "updatedAt",
        sortOrder = "desc",
        expiringDays,
      } = request.query;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      // ---- WHERE ----
      const where: any = {};

      if (plan && plan !== "all") {
        where.plan = plan;
      }

      if (status && status !== "all") {
        where.status = status;
      }

      if (type === "recurring") {
        where.isRecurring = true;
      } else if (type === "onetime") {
        where.isRecurring = false;
      }

      if (expiringDays) {
        const days = parseInt(expiringDays);
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        where.endDate = {
          not: null,
          lte: futureDate,
          gte: new Date(),
        };
        where.isRecurring = false;
        where.status = "ACTIVE";
      }

      if (search) {
        where.user = {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { username: { contains: search, mode: "insensitive" } },
          ],
        };
      }

      // ---- ORDER BY ----
      let orderBy: any;

      const userSortFields = ["username", "email"];
      if (userSortFields.includes(sortBy)) {
        orderBy = { user: { [sortBy]: sortOrder } };
      } else if (sortBy === "aiPointsUsed") {
        orderBy = { aiPointsUsed: sortOrder };
      } else if (sortBy === "endDate") {
        orderBy = { endDate: sortOrder };
      } else if (sortBy === "plan") {
        orderBy = { plan: sortOrder };
      } else if (sortBy === "status") {
        orderBy = { status: sortOrder };
      } else {
        orderBy = { updatedAt: sortOrder };
      }

      // ---- QUERY ----
      const [subscriptions, total] = await prisma.$transaction([
        prisma.subscription.findMany({
          where,
          skip: (pageNum - 1) * limitNum,
          take: limitNum,
          orderBy,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                lastActiveAt: true,
                lastLogin: true,
                profile: {
                  select: {
                    level: true,
                    totalPoints: true,
                    studyStreak: true,
                  },
                },
              },
            },
            _count: {
              select: {
                aiUsage: true,
                pointsPurchases: true,
              },
            },
          },
        }),
        prisma.subscription.count({ where }),
      ]);

      // ---- STATS (aggregate) ----
      const [
        totalSubs,
        premiumCount,
        freeCount,
        recurringCount,
        onetimeCount,
        activeCount,
        canceledCount,
        expiringIn7d,
        totalRevenuePurchases,
        avgPointsUsed,
      ] = await prisma.$transaction([
        prisma.subscription.count(),
        prisma.subscription.count({ where: { plan: "PREMIUM" } }),
        prisma.subscription.count({ where: { plan: "FREE" } }),
        prisma.subscription.count({
          where: { plan: "PREMIUM", isRecurring: true, status: "ACTIVE" },
        }),
        prisma.subscription.count({
          where: { plan: "PREMIUM", isRecurring: false, status: "ACTIVE" },
        }),
        prisma.subscription.count({ where: { status: "ACTIVE" } }),
        prisma.subscription.count({ where: { status: "CANCELED" } }),
        prisma.subscription.count({
          where: {
            isRecurring: false,
            status: "ACTIVE",
            endDate: {
              not: null,
              lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              gte: new Date(),
            },
          },
        }),
        prisma.pointsPurchase.aggregate({ _sum: { amountPaid: true } }),
        prisma.subscription.aggregate({
          where: { plan: "PREMIUM", status: "ACTIVE" },
          _avg: { aiPointsUsed: true },
        }),
      ]);

      // Enrich subscriptions with computed fields
      const enriched = subscriptions.map((sub) => {
        const daysLeft =
          sub.endDate && !sub.isRecurring
            ? Math.max(
                0,
                Math.ceil(
                  (new Date(sub.endDate).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24),
                ),
              )
            : null;

        const percentUsed =
          sub.aiPointsLimit > 0
            ? Math.round((sub.aiPointsUsed / sub.aiPointsLimit) * 100)
            : 0;

        const metadata = sub.metadata as any;

        return {
          ...sub,
          daysLeft,
          percentUsed,
          hasPendingSubscription: !!metadata?.pendingSubscription,
          totalAiCalls: sub._count.aiUsage,
          totalPointsPurchases: sub._count.pointsPurchases,
        };
      });

      return reply.send({
        subscriptions: enriched,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
        stats: {
          total: totalSubs,
          premium: premiumCount,
          free: freeCount,
          recurring: recurringCount,
          onetime: onetimeCount,
          active: activeCount,
          canceled: canceledCount,
          expiringIn7d,
          totalRevenue: (totalRevenuePurchases._sum.amountPaid || 0) / 100,
          avgPointsUsed: Math.round(avgPointsUsed._avg?.aiPointsUsed || 0),
        },
      });
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      return reply.code(500).send({ error: "Failed to fetch subscriptions" });
    }
  });

  // ============================================================
  // POST /api/admin/subscriptions/:userId/extend — przedłuż pakiet
  // ============================================================
  fastify.post<{
    Params: { userId: string };
    Body: { days: number };
  }>("/subscriptions/:userId/extend", async (request, reply) => {
    try {
      const { userId } = request.params;
      const { days } = request.body;

      if (!days || days < 1 || days > 365) {
        return reply
          .code(400)
          .send({ error: "Days must be between 1 and 365" });
      }

      const subscription = await prisma.subscription.findUnique({
        where: { userId },
      });

      if (!subscription) {
        return reply.code(404).send({ error: "Subscription not found" });
      }

      // Oblicz nową datę końcową
      const currentEnd = subscription.endDate
        ? new Date(subscription.endDate)
        : new Date();
      const baseDate = currentEnd > new Date() ? currentEnd : new Date();
      const newEnd = new Date(baseDate);
      newEnd.setDate(newEnd.getDate() + days);

      const existingMetadata =
        (subscription.metadata as Record<string, any>) || {};

      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          plan: "PREMIUM",
          status: "ACTIVE",
          endDate: newEnd,
          isRecurring: false,
          aiPointsLimit: Math.max(subscription.aiPointsLimit, 200),
          metadata: {
            ...existingMetadata,
            extendedByAdmin: true,
            extendedAt: new Date().toISOString(),
            extendedDays: days,
            adminId: (request.user as UserPayload).userId,
          },
        },
      });

      return reply.send({
        success: true,
        newEndDate: newEnd,
        daysAdded: days,
      });
    } catch (error) {
      console.error("Error extending subscription:", error);
      return reply.code(500).send({ error: "Failed to extend subscription" });
    }
  });

  // ============================================================
  // POST /api/admin/subscriptions/:userId/convert — zmień typ
  // ============================================================
  fastify.post<{
    Params: { userId: string };
    Body: { toRecurring: boolean };
  }>("/subscriptions/:userId/convert", async (request, reply) => {
    try {
      const { userId } = request.params;
      const { toRecurring } = request.body;

      const subscription = await prisma.subscription.findUnique({
        where: { userId },
      });

      if (!subscription) {
        return reply.code(404).send({ error: "Subscription not found" });
      }

      const updateData: any = {
        isRecurring: toRecurring,
      };

      if (toRecurring) {
        // Cykliczna — usuń endDate
        updateData.endDate = null;
        updateData.cancelAt = null;
      } else {
        // Jednorazowa — ustaw endDate na +30 dni od teraz
        if (!subscription.endDate) {
          const end = new Date();
          end.setDate(end.getDate() + 30);
          updateData.endDate = end;
        }
      }

      const updated = await prisma.subscription.update({
        where: { id: subscription.id },
        data: updateData,
      });

      return reply.send({ success: true, subscription: updated });
    } catch (error) {
      console.error("Error converting subscription:", error);
      return reply.code(500).send({ error: "Failed to convert subscription" });
    }
  });

  // ============================================================
  // POST /api/admin/subscriptions/:userId/activate — aktywuj PREMIUM
  // ============================================================
  fastify.post<{
    Params: { userId: string };
    Body: { days?: number; isRecurring?: boolean };
  }>("/subscriptions/:userId/activate", async (request, reply) => {
    try {
      const { userId } = request.params;
      const { days = 30, isRecurring = false } = request.body;

      let subscription = await prisma.subscription.findUnique({
        where: { userId },
      });

      const endDate = isRecurring
        ? null
        : (() => {
            const d = new Date();
            d.setDate(d.getDate() + days);
            return d;
          })();

      const data: any = {
        plan: "PREMIUM",
        status: "ACTIVE",
        isRecurring,
        aiPointsLimit: 200,
        aiPointsUsed: 0,
        aiPointsReset: new Date(),
        startDate: new Date(),
        endDate,
        metadata: {
          activatedByAdmin: true,
          activatedAt: new Date().toISOString(),
          adminId: (request.user as UserPayload).userId,
        },
      };

      if (!subscription) {
        subscription = await prisma.subscription.create({
          data: { userId, ...data },
        });
      } else {
        subscription = await prisma.subscription.update({
          where: { id: subscription.id },
          data,
        });
      }

      return reply.send({ success: true, subscription });
    } catch (error) {
      console.error("Error activating subscription:", error);
      return reply.code(500).send({ error: "Failed to activate subscription" });
    }
  });

  // ============================================================
  // POST /api/admin/subscriptions/:userId/deactivate — zdegraduj do FREE
  // ============================================================
  fastify.post<{
    Params: { userId: string };
  }>("/subscriptions/:userId/deactivate", async (request, reply) => {
    try {
      const { userId } = request.params;

      const subscription = await prisma.subscription.findUnique({
        where: { userId },
      });

      if (!subscription) {
        return reply.code(404).send({ error: "Subscription not found" });
      }

      // Jeśli jest aktywna subskrypcja Stripe — anuluj ją
      if (subscription.stripeSubscriptionId) {
        try {
          await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
        } catch (err) {
          console.error("Error cancelling Stripe subscription:", err);
        }
      }

      const existingMetadata =
        (subscription.metadata as Record<string, any>) || {};

      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          plan: "FREE",
          status: "INACTIVE",
          isRecurring: false,
          aiPointsLimit: 20,
          aiPointsUsed: 0,
          endDate: null,
          cancelAt: null,
          stripeSubscriptionId: null,
          metadata: {
            ...existingMetadata,
            deactivatedByAdmin: true,
            deactivatedAt: new Date().toISOString(),
            adminId: (request.user as UserPayload).userId,
          },
        },
      });

      return reply.send({ success: true });
    } catch (error) {
      console.error("Error deactivating subscription:", error);
      return reply
        .code(500)
        .send({ error: "Failed to deactivate subscription" });
    }
  });
}
