// backend/src/routes/admin.routes.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const ExerciseSchema = z.object({
  type: z.enum([
    "CLOSED_SINGLE",
    "CLOSED_MULTIPLE",
    "SHORT_ANSWER",
    "SYNTHESIS_NOTE",
    "ESSAY",
  ]),
  category: z.enum(["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"]),
  epoch: z
    .union([
      z.enum([
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
      ]),
      z.literal(""), // DODAJ to - akceptuj pusty string
      z.undefined(),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // Transformuj pusty string na undefined

  difficulty: z.number().min(1).max(5),
  points: z.number().min(1).max(35),
  question: z.string().min(10),
  content: z.object({
    options: z.array(z.string()).optional(),
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
  }),
  correctAnswer: z
    .union([z.number(), z.array(z.number()), z.undefined()])
    .optional(),
  tags: z.array(z.string()).default([]),
  metadata: z
    .object({
      wordLimit: z
        .object({
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
      requiredReadings: z.array(z.string()).optional(),
      expectedConcepts: z.array(z.string()).optional(),
      sampleAnswer: z.string().optional(),
    })
    .optional(),
});

type ExerciseInput = z.infer<typeof ExerciseSchema>;

interface QueryParams {
  type?: string;
  category?: string;
  epoch?: string;
  difficulty?: string;
  search?: string;
  page?: string;
  limit?: string;
}

interface UserPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}

export async function adminRoutes(fastify: FastifyInstance): Promise<void> {
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
    }
  );

  // GET wszystkie zadania z filtrowaniem i paginacją
  fastify.get<{ Querystring: QueryParams }>(
    "/exercises",
    async (request, reply) => {
      try {
        const query = request.query;
        const where: any = {};

        // Filtrowanie
        if (query.type) where.type = query.type;
        if (query.category) where.category = query.category;
        if (query.epoch) where.epoch = query.epoch;
        if (query.difficulty) where.difficulty = parseInt(query.difficulty);

        // Wyszukiwanie
        if (query.search) {
          where.OR = [
            { question: { contains: query.search, mode: "insensitive" } },
            { tags: { has: query.search } },
          ];
        }

        // Paginacja
        const page = parseInt(query.page || "1");
        const limit = parseInt(query.limit || "20");

        const [exercises, total] = await prisma.$transaction([
          prisma.exercise.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
              _count: {
                select: { submissions: true },
              },
            },
          }),
          prisma.exercise.count({ where }),
        ]);

        return reply.send({
          exercises: exercises.map((ex) => ({
            ...ex,
            submissions: ex._count.submissions,
          })),
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        console.error("Database error:", error);
        return reply.code(500).send({ error: "Database connection failed" });
      }
    }
  );

  // GET statystyki
  fastify.get("/exercises/stats", async (_request, reply) => {
    try {
      const [closedCount, openCount, essayCount, avgDifficulty] =
        await prisma.$transaction([
          prisma.exercise.count({
            where: { type: { in: ["CLOSED_SINGLE", "CLOSED_MULTIPLE"] } },
          }),
          prisma.exercise.count({
            where: { type: { in: ["SHORT_ANSWER", "SYNTHESIS_NOTE"] } },
          }),
          prisma.exercise.count({ where: { type: "ESSAY" } }),
          prisma.exercise.aggregate({
            _avg: { difficulty: true },
          }),
        ]);

      return reply.send({
        closed: closedCount,
        open: openCount,
        essays: essayCount,
        avgDifficulty: avgDifficulty._avg.difficulty || 0,
      });
    } catch (error) {
      console.error("Stats error:", error);
      return reply.code(500).send({ error: "Failed to fetch stats" });
    }
  });

  // POST nowe zadanie
  fastify.post<{ Body: ExerciseInput }>(
    "/exercises",
    async (request, reply) => {
      try {
        const data = ExerciseSchema.parse(request.body);

        const exercise = await prisma.exercise.create({
          data: {
            ...data,
            content: data.content || {},
            metadata: data.metadata || {},
          } as any,
        });

        return reply.send(exercise);
      } catch (error: any) {
        console.error("Create exercise error:", error);

        if (error.name === "ZodError") {
          return reply.code(400).send({
            error: "Invalid data format",
            details: error.errors,
          });
        }

        return reply.code(500).send({
          error: "Failed to create exercise",
          details: error.message,
        });
      }
    }
  );

  // PUT aktualizuj zadanie
  fastify.put<{
    Params: { id: string };
    Body: Partial<ExerciseInput>;
  }>("/exercises/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const data = ExerciseSchema.partial().parse(request.body);

      const exercise = await prisma.exercise.update({
        where: { id },
        data: {
          ...data,
          content: data.content || {},
          metadata: data.metadata || {},
        } as any,
      });

      return reply.send(exercise);
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.code === "P2025") {
        return reply.code(404).send({ error: "Exercise not found" });
      }
      return reply.code(500).send({
        error: "Failed to update exercise",
        details: error.message,
      });
    }
  });

  // DELETE zadanie
  fastify.delete<{ Params: { id: string } }>(
    "/exercises/:id",
    async (request, reply) => {
      try {
        const { id } = request.params;

        await prisma.$transaction([
          prisma.submission.deleteMany({ where: { exerciseId: id } }),
          prisma.spacedRepetition.deleteMany({ where: { exerciseId: id } }),
          prisma.exercise.delete({ where: { id } }),
        ]);

        return reply.send({ success: true });
      } catch (error: any) {
        console.error("Delete error:", error);
        if (error.code === "P2025") {
          return reply.code(404).send({ error: "Exercise not found" });
        }
        return reply.code(500).send({
          error: "Failed to delete exercise",
          details: error.message,
        });
      }
    }
  );

  // POST import wielu zadań
  fastify.post<{ Body: ExerciseInput[] }>(
    "/exercises/bulk",
    async (request, reply) => {
      try {
        const exercises = z.array(ExerciseSchema).parse(request.body);

        const created = await prisma.$transaction(
          exercises.map((exercise) =>
            prisma.exercise.create({
              data: {
                ...exercise,
                content: exercise.content || {},
                metadata: exercise.metadata || {},
              } as any,
            })
          )
        );

        return reply.send({
          success: true,
          count: created.length,
          exercises: created,
        });
      } catch (error: any) {
        console.error("Bulk import error:", error);

        if (error.name === "ZodError") {
          return reply.code(400).send({
            error: "Invalid data format",
            details: error.errors,
          });
        }

        return reply.code(500).send({
          error: "Failed to import exercises",
          details: error.message,
        });
      }
    }
  );
}
