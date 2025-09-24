// backend/src/routes/examAdmin.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function examAdminRoutes(fastify: FastifyInstance) {
  // Middleware - tylko admin
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = await prisma.user.findUnique({
        where: { id: (request.user as any).userId },
      });
      if (user?.role !== "ADMIN") {
        reply.code(403).send({ error: "Forbidden" });
      }
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Lista wszystkich egzaminów
  fastify.get("/", async (request, reply) => {
    const exams = await prisma.mockExam.findMany({
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
        _count: {
          select: { sessions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return reply.send(exams);
  });

  // Szczegóły egzaminu
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const exam = await prisma.mockExam.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            questions: true,
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!exam) {
      return reply.code(404).send({ error: "Egzamin nie znaleziony" });
    }

    return reply.send(exam);
  });

  // Utwórz nowy egzamin
  fastify.post("/", async (request, reply) => {
    const data = request.body as any;

    const exam = await prisma.mockExam.create({
      data: {
        title: data.title,
        year: data.year,
        type: data.type,
        duration: data.duration,
        isActive: data.isActive ?? true,
        sections: {
          create: data.sections?.map((section: any, index: number) => ({
            order: index + 1,
            title: section.title,
            instruction: section.instruction,
            questions: {
              create: section.questions?.map((q: any, qIndex: number) => ({
                order: qIndex + 1,
                type: q.type,
                question: q.question,
                points: q.points,
                content: q.content || {},
              })),
            },
          })),
        },
      },
    });

    return reply.send(exam);
  });

  // Edytuj egzamin
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as any;

    // Najpierw usuń stare sekcje
    await prisma.examSection.deleteMany({
      where: { examId: id },
    });

    // Zaktualizuj egzamin z nowymi sekcjami
    const exam = await prisma.mockExam.update({
      where: { id },
      data: {
        title: data.title,
        year: data.year,
        type: data.type,
        duration: data.duration,
        isActive: data.isActive,
        sections: {
          create: data.sections?.map((section: any, index: number) => ({
            order: index + 1,
            title: section.title,
            instruction: section.instruction,
            questions: {
              create: section.questions?.map((q: any, qIndex: number) => ({
                order: qIndex + 1,
                type: q.type,
                question: q.question,
                points: q.points,
                content: q.content || {},
              })),
            },
          })),
        },
      },
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
      },
    });

    return reply.send(exam);
  });

  // Usuń egzamin
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    // Sprawdź czy nie ma aktywnych sesji
    const activeSessions = await prisma.examSession.count({
      where: {
        examId: id,
        status: "IN_PROGRESS",
      },
    });

    if (activeSessions > 0) {
      return reply.code(400).send({
        error: "Nie można usunąć egzaminu z aktywnymi sesjami",
      });
    }

    await prisma.mockExam.delete({
      where: { id },
    });

    return reply.send({ success: true });
  });

  // Duplikuj egzamin
  fastify.post("/:id/duplicate", async (request, reply) => {
    const { id } = request.params as { id: string };

    const original = await prisma.mockExam.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!original) {
      return reply.code(404).send({ error: "Egzamin nie znaleziony" });
    }

    const duplicate = await prisma.mockExam.create({
      data: {
        title: `${original.title} (kopia)`,
        year: original.year,
        type: original.type,
        duration: original.duration,
        isActive: false,
        sections: {
          create: original.sections.map((section) => ({
            order: section.order,
            title: section.title,
            instruction: section.instruction,
            questions: {
              create: section.questions.map((q) => ({
                order: q.order,
                type: q.type,
                question: q.question,
                points: q.points,
                content: q.content,
              })),
            },
          })),
        },
      },
    });

    return reply.send(duplicate);
  });

  // Aktywuj/dezaktywuj egzamin
  fastify.patch("/:id/toggle", async (request, reply) => {
    const { id } = request.params as { id: string };

    const exam = await prisma.mockExam.findUnique({
      where: { id },
    });

    if (!exam) {
      return reply.code(404).send({ error: "Egzamin nie znaleziony" });
    }

    const updated = await prisma.mockExam.update({
      where: { id },
      data: {
        isActive: !exam.isActive,
      },
    });

    return reply.send(updated);
  });
}
