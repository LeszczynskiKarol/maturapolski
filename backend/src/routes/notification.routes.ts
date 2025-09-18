// backend/src/routes/notification.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function notificationRoutes(fastify: FastifyInstance) {
  // Get user notifications
  fastify.get("/", async (request, reply) => {
    const userId = (request.user as any).userId;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return notifications;
  });

  // Mark as read
  fastify.patch("/:id/read", async (request, reply) => {
    const { id } = request.params as { id: string };
    const userId = (request.user as any).userId;

    await prisma.notification.update({
      where: {
        id,
        userId,
      },
      data: { read: true },
    });

    return { success: true };
  });

  // Mark all as read
  fastify.patch("/read-all", async (request, reply) => {
    const userId = (request.user as any).userId;

    await prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: { read: true },
    });

    return { success: true };
  });
}

// Helper function to create notifications
export async function createNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  actionUrl?: string
) {
  const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      actionUrl,
      read: false,
    },
  });

  // Send via WebSocket if user is online
  const io = (global as any).io;
  if (io) {
    io.to(`user:${userId}`).emit("notification", notification);
  }

  return notification;
}
