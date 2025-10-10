// backend/src/routes/content.routes.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ContentService } from "../services/contentService";

const contentService = new ContentService();

export async function contentRoutes(fastify: FastifyInstance) {
  // ==========================================
  // PUBLIC ROUTES
  // ==========================================

  // Lista HUB-ów (np. wszystkie lektury)
  // GET /api/content/hubs?type=LITERARY_WORK
  fastify.get("/hubs", async (request, reply) => {
    try {
      const { type, epoch, search, page, limit } = request.query as any;

      const result = await contentService.getHubs({
        type,
        epoch,
        search,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
      });

      return reply.send(result);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });

  // Pojedynczy HUB z listą jego stron
  // GET /api/content/lalka
  fastify.get("/:hubSlug", async (request, reply) => {
    try {
      const { hubSlug } = request.params as { hubSlug: string };
      const hub = await contentService.getHub(hubSlug);
      return reply.send(hub);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  });

  // Pojedyncza strona HUB-a
  // GET /api/content/lalka/streszczenie-szczegolowe
  fastify.get("/:hubSlug/:pageSlug", async (request, reply) => {
    try {
      const { hubSlug, pageSlug } = request.params as {
        hubSlug: string;
        pageSlug: string;
      };

      const page = await contentService.getPage(hubSlug, pageSlug);
      return reply.send(page);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  });

  // Lista stron danego HUB-a (menu)
  // GET /api/content/lalka/pages
  fastify.get("/:hubSlug/pages", async (request, reply) => {
    try {
      const { hubSlug } = request.params as { hubSlug: string };
      const pages = await contentService.getHubPages(hubSlug);
      return reply.send(pages);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  });

  // ==========================================
  // RATINGS - Oceny stron
  // ==========================================

  // Dodaj/aktualizuj ocenę
  // POST /api/content/pages/:pageId/rate
  fastify.post("/pages/:pageId/rate", async (request, reply) => {
    try {
      const { pageId } = request.params as { pageId: string };
      const { rating } = request.body as { rating: number };

      // Pobierz IP użytkownika
      const ipAddress = request.ip;

      // Jeśli użytkownik jest zalogowany, użyj jego ID
      let userId: string | undefined;
      try {
        await request.jwtVerify();
        userId = request.user?.userId;
      } catch {
        // Użytkownik niezalogowany - użyj tylko IP
      }

      const result = await contentService.submitRating(
        pageId,
        rating,
        ipAddress,
        userId
      );

      return reply.send(result);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });

  // Pobierz statystyki ocen dla strony
  // GET /api/content/pages/:pageId/rating
  fastify.get("/pages/:pageId/rating", async (request, reply) => {
    try {
      const { pageId } = request.params as { pageId: string };
      const rating = await contentService.getPageRating(pageId);
      return reply.send(rating);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });

  // ==========================================
  // ADMIN ROUTES - Wymagają autoryzacji
  // ==========================================

  const adminPreHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      await request.jwtVerify();
      if (request.user?.role !== "ADMIN") {
        return reply.status(403).send({ error: "Admin only" });
      }
    } catch (err) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  };

  // Tworzenie HUB-a
  fastify.post(
    "/hubs",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const hub = await contentService.createHub(request.body);
        return reply.status(201).send(hub);
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Aktualizacja HUB-a
  fastify.put(
    "/hubs/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const hub = await contentService.updateHub(id, request.body);
        return reply.send(hub);
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Usuwanie HUB-a
  fastify.delete(
    "/hubs/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        await contentService.deleteHub(id);
        return reply.status(204).send();
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Tworzenie strony dla HUB-a
  fastify.post(
    "/hubs/:hubId/pages",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { hubId } = request.params as { hubId: string };
        const page = await contentService.createPage(hubId, request.body);
        return reply.status(201).send(page);
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Aktualizacja strony
  fastify.put(
    "/pages/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const page = await contentService.updatePage(id, request.body);
        return reply.send(page);
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Usuwanie strony
  fastify.delete(
    "/pages/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        await contentService.deletePage(id);
        return reply.status(204).send();
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Zmiana kolejności stron
  fastify.put(
    "/hubs/:hubId/pages/reorder",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { hubId } = request.params as { hubId: string };
        const { pageIds } = request.body as { pageIds: string[] };

        await contentService.reorderPages(hubId, pageIds);
        return reply.send({ success: true });
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Pobierz wszystkie oceny dla strony (z userami/IP)
  fastify.get(
    "/pages/:pageId/ratings/all",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { pageId } = request.params as { pageId: string };
        const ratings = await contentService.getPageRatingsDetailed(pageId);
        return reply.send(ratings);
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Usuń pojedynczą ocenę
  fastify.delete(
    "/ratings/:ratingId",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { ratingId } = request.params as { ratingId: string };
        await contentService.deleteRating(ratingId);
        return reply.status(204).send();
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );
}
