// backend/src/routes/exercise.routes.ts

import { FastifyInstance } from "fastify";
import { ExerciseService } from "../services/exerciseService";

const exerciseService = new ExerciseService();

export async function exerciseRoutes(fastify: FastifyInstance) {
  // Middleware - verify JWT
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // DODAJ TEN ENDPOINT NA POCZĄTKU (przed /:id)
  fastify.get("/with-status", async (request, reply) => {
    try {
      const userId = (request.user as any).userId;
      const query = request.query as any;

      console.log(
        "Getting exercises with status for user:",
        userId,
        "query:",
        query
      );

      const exercises = await exerciseService.getExercisesWithStatus(
        userId,
        query
      );

      console.log("Found exercises:", exercises.length);

      return reply.send(exercises);
    } catch (error) {
      console.error("Error getting exercises with status:", error);
      return reply.code(500).send({ message: "Internal server error" });
    }
  });

  // Get adaptive exercise for user
  fastify.get("/adaptive", async (request, reply) => {
    const userId = (request.user as any).userId;
    const exercise = await exerciseService.getAdaptiveExercise(userId);
    return reply.send(exercise);
  });

  // Get exercises by category
  fastify.get("/category/:category", async (request, reply) => {
    const { category } = request.params as { category: string };
    const { limit = 10 } = request.query as { limit?: number };
    const exercises = await exerciseService.getExercisesByCategory(
      category,
      limit
    );
    return reply.send(exercises);
  });

  // Get exercise by ID
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const exercise = await exerciseService.getExerciseById(id);
    if (!exercise) {
      return reply.code(404).send({ error: "Exercise not found" });
    }
    return reply.send(exercise);
  });

  // Submit answer
  fastify.post("/:id/submit", async (request, reply) => {
    const { id } = request.params as { id: string };
    const userId = (request.user as any).userId;
    const { answer } = request.body as { answer: any };

    const result = await exerciseService.submitAnswer(userId, id, answer);
    return reply.send(result);
  });

  // Get user's exercise history
  fastify.get("/history", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { limit = 20, offset = 0 } = request.query as {
      limit?: number;
      offset?: number;
    };

    const history = await exerciseService.getUserHistory(userId, limit, offset);
    return reply.send(history);
  });
}
