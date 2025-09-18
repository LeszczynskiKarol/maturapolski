// backend/src/routes/admin.routes.ts

import { FastifyInstance } from "fastify";
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
  difficulty: z.number().min(1).max(5),
  points: z.number(),
  question: z.string(),
  content: z.any(),
  correctAnswer: z.any().optional(),
  tags: z.array(z.string()).optional(),
});

export async function adminRoutes(fastify: FastifyInstance) {
  // GET wszystkie zadania
  fastify.get("/exercises", async (request, reply) => {
    try {
      const exercises = await prisma.exercise.findMany({
        orderBy: { createdAt: "desc" },
      });
      return exercises;
    } catch (error) {
      console.error("Database error:", error);
      return reply.code(500).send({ error: "Database connection failed" });
    }
  });

  // POST nowe zadanie
  fastify.post("/exercises", async (request, reply) => {
    try {
      const data = ExerciseSchema.parse(request.body);

      // UPEWNIJ SIĘ ŻE content ZAWSZE JEST OBIEKTEM
      const exerciseData = {
        type: data.type,
        category: data.category,
        difficulty: data.difficulty,
        points: data.points,
        question: data.question,
        content: data.content || {}, // ZAWSZE podaj content
        correctAnswer: data.correctAnswer || null,
        tags: data.tags || [],
      };

      const exercise = await prisma.exercise.create({
        data: exerciseData,
      });

      return exercise;
    } catch (error: any) {
      console.error("Create exercise error:", error);

      if (error.code === "P2002") {
        return reply.code(400).send({ error: "Exercise already exists" });
      }

      if (error.name === "ZodError") {
        return reply
          .code(400)
          .send({ error: "Invalid data format", details: error.errors });
      }

      return reply.code(500).send({
        error: "Failed to create exercise",
        details: error.message,
      });
    }
  });

  // DELETE zadanie
  fastify.delete("/exercises/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      await prisma.exercise.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      return reply.code(404).send({ error: "Exercise not found" });
    }
  });

  // PUT aktualizuj zadanie
  fastify.put("/exercises/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const data = ExerciseSchema.partial().parse(request.body);

      const updateData: any = {};
      if (data.type !== undefined) updateData.type = data.type;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.difficulty !== undefined)
        updateData.difficulty = data.difficulty;
      if (data.points !== undefined) updateData.points = data.points;
      if (data.question !== undefined) updateData.question = data.question;
      if (data.content !== undefined) updateData.content = data.content;
      if (data.correctAnswer !== undefined)
        updateData.correctAnswer = data.correctAnswer;
      if (data.tags !== undefined) updateData.tags = data.tags;

      const exercise = await prisma.exercise.update({
        where: { id },
        data: updateData,
      });

      return exercise;
    } catch (error) {
      console.error("Update error:", error);
      return reply.code(404).send({ error: "Exercise not found" });
    }
  });
}
