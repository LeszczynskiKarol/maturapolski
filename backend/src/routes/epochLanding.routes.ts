// backend/src/routes/epochLanding.routes.ts

import { FastifyInstance } from "fastify";
import { EpochLandingService } from "../services/epochLandingService";

const epochLandingService = new EpochLandingService();

export async function epochLandingRoutes(fastify: FastifyInstance) {
  // PUBLIC: Lista epok ze statystykami
  // GET /api/epochs
  fastify.get("/", async (_request, reply) => {
    try {
      const epochs = await epochLandingService.getEpochLandings();
      return reply.send(epochs);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });

  // PUBLIC: Pojedyncza epoka
  // GET /api/epochs/:slug
  fastify.get("/:slug", async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string };
      const epoch = await epochLandingService.getEpochLanding(slug);
      return reply.send(epoch);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  });
}
