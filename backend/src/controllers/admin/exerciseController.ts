// backend/src/controllers/admin/exerciseController.ts
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

const CreateExerciseSchema = z.object({
  type: z.enum([
    "CLOSED_SINGLE",
    "CLOSED_MULTIPLE",
    "SHORT_ANSWER",
    "SYNTHESIS_NOTE",
    "ESSAY",
  ]),
  category: z.enum(["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"]),
  epoch: z
    .enum([
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
    ])
    .optional(),
  difficulty: z.number().min(1).max(5),
  points: z.number().min(1).max(35),
  question: z.string().min(10),
  content: z.object({
    text: z.string().optional(),
    fragments: z
      .array(
        z.object({
          author: z.string(),
          title: z.string(),
          content: z.string(),
        })
      )
      .optional(),
    image: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  }),
  correctAnswer: z.any().optional(),
  rubric: z
    .object({
      criteria: z.array(
        z.object({
          name: z.string(),
          maxPoints: z.number(),
          description: z.string(),
        })
      ),
    })
    .optional(),
  tags: z.array(z.string()),
  metadata: z
    .object({
      explanation: z.string().optional(),
      requiredReadings: z.array(z.string()).optional(),
      contexts: z.array(z.string()).optional(),
      timeLimit: z.number().optional(),
      wordLimit: z
        .object({
          min: z.number(),
          max: z.number(),
        })
        .optional(),
    })
    .optional(),
});

export async function exerciseRoutes(fastify: FastifyInstance) {
  // Middleware - tylko admin
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as any;
      if (user.role !== "ADMIN") {
        reply.code(403).send({ error: "Forbidden" });
      }
    } catch {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // GET all exercises
  fastify.get("/exercises", async (request) => {
    const query = request.query as any;
    const where: any = {};

    if (query.type) where.type = query.type;
    if (query.category) where.category = query.category;
    if (query.epoch) where.epoch = query.epoch;
    if (query.difficulty) where.difficulty = parseInt(query.difficulty);
    if (query.search) {
      where.OR = [
        { question: { contains: query.search, mode: "insensitive" } },
        { tags: { has: query.search } },
      ];
    }

    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "20");

    const exercises = await prisma.exercise.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.exercise.count({ where });

    return {
      exercises,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  });

  // CREATE exercise
  fastify.post("/exercises", async (request) => {
    const body = CreateExerciseSchema.parse(request.body);
    const exercise = await prisma.exercise.create({
      data: body as any,
    });
    return exercise;
  });

  // UPDATE exercise
  fastify.put("/exercises/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = CreateExerciseSchema.partial().parse(request.body);

    const exercise = await prisma.exercise.update({
      where: { id },
      data: body as any,
    });

    return exercise;
  });

  // DELETE exercise
  fastify.delete("/exercises/:id", async (request) => {
    const { id } = request.params as { id: string };

    await prisma.exercise.delete({
      where: { id },
    });

    return { success: true };
  });
}
