// backend/src/middleware/activityTracker.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

const lastUpdateCache = new Map<string, number>();
const UPDATE_INTERVAL_MS = 60_000; // Max raz na minutę per user

export function registerActivityTracker(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request) => {
    try {
      await request.jwtVerify();
      const user = request.user as { userId: string };
      if (!user?.userId) return;

      const now = Date.now();
      const lastUpdate = lastUpdateCache.get(user.userId) || 0;

      if (now - lastUpdate < UPDATE_INTERVAL_MS) return;

      lastUpdateCache.set(user.userId, now);

      // Fire and forget
      prisma.user
        .update({
          where: { id: user.userId },
          data: { lastActiveAt: new Date() },
        })
        .catch(() => {});
    } catch {
      // Niezalogowany — ignoruj
    }
  });
}
