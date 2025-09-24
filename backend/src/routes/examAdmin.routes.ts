// backend/src/routes/examAdmin.routes.ts
// ========================================

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

  // ZMIENIONE - Pokazuj tylko struktury dynamiczne
  fastify.get("/", async (request, reply) => {
    const exams = await prisma.mockExam.findMany({
      include: {
        sections: {
          select: {
            id: true,
            title: true,
            order: true,
            _count: {
              select: { questions: true },
            },
          },
        },
        _count: {
          select: { sessions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Podziel na dynamiczne i stałe
    const categorizedExams = exams.map((exam) => {
      const isDynamic = exam.sections.every((s) => s._count.questions === 0);
      const totalQuestions = exam.sections.reduce(
        (sum, s) => sum + s._count.questions,
        0
      );

      return {
        ...exam,
        isDynamic,
        totalQuestions,
        examType: isDynamic ? "DYNAMICZNY" : "STATYCZNY",
      };
    });

    return reply.send(categorizedExams);
  });

  // NOWY ENDPOINT - Utwórz strukturę dynamiczną
  fastify.post("/structure", async (request, reply) => {
    const data = request.body as any;

    const exam = await prisma.mockExam.create({
      data: {
        title: data.title,
        year: data.year,
        type: data.type,
        duration: data.duration,
        isActive: data.isActive ?? false,
        // Tworzymy sekcje BEZ pytań
        sections: {
          create: data.sections?.map((section: any, index: number) => ({
            order: index + 1,
            title: section.title,
            instruction: section.instruction,
            // Bez questions!
          })),
        },
      },
    });

    return reply.send({
      success: true,
      examId: exam.id,
      message: "Struktura dynamiczna utworzona",
    });
  });

  // STARY ENDPOINT - dla kompatybilności (egzaminy ze stałymi pytaniami)
  fastify.post("/", async (request, reply) => {
    const data = request.body as any;

    // Ten endpoint może nadal tworzyć egzaminy ze stałymi pytaniami
    // ale powinien być oznaczony jako deprecated

    return reply.code(400).send({
      error:
        "Użyj /structure dla nowych egzaminów dynamicznych lub /admin/questions dla zarządzania pytaniami",
      deprecated: true,
    });
  });
}
