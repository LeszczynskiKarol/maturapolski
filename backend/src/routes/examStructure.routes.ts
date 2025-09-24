import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function examStructureRoutes(fastify: FastifyInstance) {
  // Auth middleware
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as any;
      if (user.role !== "ADMIN") {
        return reply.code(403).send({ error: "Admin access required" });
      }
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // GET wszystkie struktury egzaminów
  fastify.get("/", async (request, reply) => {
    const exams = await prisma.mockExam.findMany({
      include: {
        sections: {
          include: {
            questions: {
              select: {
                id: true,
                type: true,
                points: true,
                order: true,
              },
            },
          },
          orderBy: { order: "asc" },
        },
        _count: {
          select: { sessions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return reply.send(exams);
  });

  // POST nowa struktura egzaminu
  fastify.post("/", async (request, reply) => {
    const { title, type, duration, sections } = request.body as any;

    const exam = await prisma.mockExam.create({
      data: {
        title,
        type,
        duration,
        isActive: true,
        sections: {
          create: sections.map((section: any, index: number) => ({
            order: index + 1,
            title: section.title,
            instruction: section.instruction || "",
            questions: {
              create: section.questions.map((q: any, qIndex: number) => ({
                order: qIndex + 1,
                type: q.type,
                points: q.points,
                question: q.question || `Zadanie ${qIndex + 1}`,
                content: q.content || Prisma.JsonNull,
              })),
            },
          })),
        },
      },
      include: {
        sections: {
          include: { questions: true },
        },
      },
    });

    return reply.send(exam);
  });

  // PUT aktualizuj strukturę
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, type, duration, isActive } = request.body as any;

    const exam = await prisma.mockExam.update({
      where: { id },
      data: {
        title,
        type,
        duration,
        isActive,
      },
      include: {
        sections: {
          include: { questions: true },
        },
      },
    });

    return reply.send(exam);
  });

  // DELETE struktura
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

  // POST duplikuj strukturę
  fastify.post("/:id/duplicate", async (request, reply) => {
    const { id } = request.params as { id: string };

    const original = await prisma.mockExam.findUnique({
      where: { id },
      include: {
        sections: {
          include: { questions: true },
        },
      },
    });

    if (!original) {
      return reply.code(404).send({ error: "Struktura nie istnieje" });
    }

    const newExam = await prisma.mockExam.create({
      data: {
        title: `${original.title} (kopia)`,
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
                points: q.points,
                question: q.question,
                content:
                  q.content === null
                    ? Prisma.JsonNull
                    : q.content || Prisma.JsonNull,
              })),
            },
          })),
        },
      },
      include: {
        sections: {
          include: { questions: true },
        },
      },
    });

    return reply.send(newExam);
  });
}
