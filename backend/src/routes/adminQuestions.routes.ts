// backend/src/routes/adminQuestions.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function adminQuestionsRoutes(fastify: FastifyInstance) {
  // Middleware - tylko admin
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = await prisma.user.findUnique({
        where: { id: (request.user as any).userId },
      });
      if (user?.role !== "ADMIN") {
        reply.code(403).send({ error: "Forbidden - Admin only" });
      }
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Pobierz wszystkie pytania z filtrami
  fastify.get("/", async (request, reply) => {
    const { type, category, difficulty, search } = request.query as any;

    const where: any = {};

    if (type) where.type = type;
    if (category) where.category = category;
    if (difficulty) where.difficulty = parseInt(difficulty);
    if (search) {
      where.OR = [
        { question: { contains: search, mode: "insensitive" } },
        { tags: { hasSome: [search] } },
      ];
    }

    const questions = await prisma.exercise.findMany({
      where,
      include: {
        _count: {
          select: {
            submissions: true,
            usageHistory: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return reply.send(questions);
  });

  // Statystyki pytań
  fastify.get("/stats", async (request, reply) => {
    const [total, closed, shortAnswer, essays, recentlyUsed] =
      await Promise.all([
        prisma.exercise.count(),
        prisma.exercise.count({
          where: {
            OR: [{ type: "CLOSED_SINGLE" }, { type: "CLOSED_MULTIPLE" }],
          },
        }),
        prisma.exercise.count({ where: { type: "SHORT_ANSWER" } }),
        prisma.exercise.count({ where: { type: "ESSAY" } }),
        prisma.exerciseUsage.count({
          where: {
            lastUsedAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Ostatnie 7 dni
            },
          },
        }),
      ]);

    return reply.send({
      total,
      closed,
      shortAnswer,
      essays,
      recentlyUsed,
    });
  });

  // Pobierz pojedyncze pytanie
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const question = await prisma.exercise.findUnique({
      where: { id },
      include: {
        submissions: {
          select: {
            score: true,
            createdAt: true,
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!question) {
      return reply.code(404).send({ error: "Pytanie nie znalezione" });
    }

    return reply.send(question);
  });

  // Dodaj nowe pytanie
  fastify.post("/", async (request, reply) => {
    const data = request.body as any;

    const question = await prisma.exercise.create({
      data: {
        type: data.type,
        category: data.category,
        epoch: data.epoch || null,
        difficulty: data.difficulty,
        points: data.points,
        question: data.question,
        content: data.content || {},
        correctAnswer: data.correctAnswer || null,
        rubric: data.rubric || null,
        tags: data.tags || [],
        metadata: data.metadata || {},
      },
    });

    return reply.send(question);
  });

  // Edytuj pytanie
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as any;

    const question = await prisma.exercise.update({
      where: { id },
      data: {
        type: data.type,
        category: data.category,
        epoch: data.epoch || null,
        difficulty: data.difficulty,
        points: data.points,
        question: data.question,
        content: data.content || {},
        correctAnswer: data.correctAnswer || null,
        rubric: data.rubric || null,
        tags: data.tags || [],
        metadata: data.metadata || {},
      },
    });

    return reply.send(question);
  });

  // Usuń pytanie
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    // NAJPIERW usuń powiązane rekordy

    // 1. Usuń odpowiedzi
    await prisma.examAnswer.deleteMany({
      where: {
        session: {
          examId: id,
        },
      },
    });

    // 2. Usuń sesje
    await prisma.examSession.deleteMany({
      where: { examId: id },
    });

    // 3. Usuń pytania
    const sections = await prisma.examSection.findMany({
      where: { examId: id },
    });

    for (const section of sections) {
      await prisma.examQuestion.deleteMany({
        where: { sectionId: section.id },
      });
    }

    // 4. Usuń sekcje
    await prisma.examSection.deleteMany({
      where: { examId: id },
    });

    // 5. Usuń teksty źródłowe
    await prisma.textSource.deleteMany({
      where: { examId: id },
    });

    // 6. TERAZ możesz usunąć egzamin
    await prisma.mockExam.delete({
      where: { id },
    });

    return reply.send({ success: true });
  });

  // Importuj pytania z CSV/JSON
  fastify.post("/import", async (request, reply) => {
    const { questions } = request.body as { questions: any[] };

    if (!questions || !Array.isArray(questions)) {
      return reply.code(400).send({ error: "Nieprawidłowe dane" });
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const q of questions) {
      try {
        await prisma.exercise.create({
          data: {
            type: q.type || "SHORT_ANSWER",
            category: q.category || "HISTORICAL_LITERARY",
            difficulty: q.difficulty || 3,
            points: q.points || 1,
            question: q.question,
            content: q.content || {},
            correctAnswer: q.correctAnswer || null,
            tags: q.tags || [],
            epoch: q.epoch || null,
            metadata: { imported: true, importDate: new Date() },
          },
        });
        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(
          `Pytanie "${q.question?.substring(0, 50)}...": ${error.message}`
        );
      }
    }

    return reply.send(results);
  });

  // Eksportuj pytania
  fastify.get("/export/:format", async (request, reply) => {
    const { format } = request.params as { format: "json" | "csv" };

    const questions = await prisma.exercise.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (format === "json") {
      return reply.send(questions);
    } else if (format === "csv") {
      // Prosty CSV export
      const csv = [
        "id,type,category,difficulty,points,question,tags",
        ...questions.map(
          (q) =>
            `"${q.id}","${q.type}","${q.category}",${q.difficulty},${
              q.points
            },"${q.question}","${q.tags.join(",")}"`
        ),
      ].join("\n");

      return reply
        .header("Content-Type", "text/csv")
        .header("Content-Disposition", 'attachment; filename="questions.csv"')
        .send(csv);
    }

    return reply.code(400).send({ error: "Nieobsługiwany format" });
  });

  // Analiza wykorzystania pytań
  fastify.get("/usage-analysis", async (request, reply) => {
    const analysis = await prisma.$queryRaw`
      SELECT 
        e.id,
        e.question,
        e.type,
        e.difficulty,
        COUNT(DISTINCT eu.userId) as unique_users,
        COUNT(eu.id) as total_uses,
        MAX(eu.lastUsedAt) as last_used,
        AVG(s.score) as avg_score
      FROM "Exercise" e
      LEFT JOIN "ExerciseUsage" eu ON e.id = eu."exerciseId"
      LEFT JOIN "Submission" s ON e.id = s."exerciseId"
      GROUP BY e.id
      ORDER BY total_uses DESC
      LIMIT 50
    `;

    return reply.send(analysis);
  });

  // Rekomendacje dla nowych pytań
  fastify.get("/recommendations", async (request, reply) => {
    // Analiza luk w bazie pytań
    const gaps = await prisma.$queryRaw`
      SELECT 
        type,
        category,
        difficulty,
        COUNT(*) as count
      FROM "Exercise"
      GROUP BY type, category, difficulty
      ORDER BY count ASC
      LIMIT 20
    `;

    // Tematy z małą ilością pytań
    const underrepresentedTags = await prisma.$queryRaw`
      SELECT 
        tag,
        COUNT(*) as count
      FROM (
        SELECT unnest(tags) as tag
        FROM "Exercise"
      ) t
      GROUP BY tag
      HAVING COUNT(*) < 5
      ORDER BY count ASC
    `;

    return reply.send({
      gaps,
      underrepresentedTags,
      recommendations: [
        "Dodaj więcej pytań ESSAY dla poziomu rozszerzonego",
        "Brakuje pytań o trudności 4-5 dla kategorii LANGUAGE_USE",
        "Rozważ dodanie pytań o epoce CONTEMPORARY",
      ],
    });
  });
}
