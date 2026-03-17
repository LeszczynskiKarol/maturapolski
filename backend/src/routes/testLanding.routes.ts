// backend/src/routes/testLanding.routes.ts

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TestLandingService } from "../services/testLandingService";

const testLandingService = new TestLandingService();

export async function testLandingRoutes(fastify: FastifyInstance) {
  // PUBLIC: Lista testów
  fastify.get("/", async (request, reply) => {
    try {
      const { limit } = request.query as { limit?: string };
      const landings = await testLandingService.getTestLandings({
        limit: limit ? parseInt(limit) : 100,
      });
      return reply.send(landings);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });

  // PUBLIC: Lista dostępnych lektur (do użytku w adminie i info)
  fastify.get("/available-works", async (_request, reply) => {
    try {
      const works = await testLandingService.getAvailableWorks();
      return reply.send(works);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });

  // PUBLIC: Pojedynczy test landing
  fastify.get("/:slug", async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string };
      const landing = await testLandingService.getTestLanding(slug);
      return reply.send(landing);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  });

  // ADMIN
  const adminPreHandler = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      await request.jwtVerify();
      if (request.user?.role !== "ADMIN") {
        return reply.status(403).send({ error: "Admin only" });
      }
    } catch {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  };

  fastify.post("/", { preHandler: adminPreHandler }, async (request, reply) => {
    try {
      const landing = await testLandingService.createTestLanding(request.body);
      return reply.status(201).send(landing);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });

  fastify.put(
    "/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const landing = await testLandingService.updateTestLanding(
          id,
          request.body,
        );
        return reply.send(landing);
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    },
  );

  fastify.delete(
    "/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        await testLandingService.deleteTestLanding(id);
        return reply.status(204).send();
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    },
  );
}
