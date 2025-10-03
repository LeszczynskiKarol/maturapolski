// backend/src/routes/materials.routes.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { MaterialService } from "../services/materialService";
import { z } from "zod";

const materialService = new MaterialService();

// Schemat walidacji
const getMaterialsSchema = z.object({
  category: z
    .enum([
      "EPOCHS",
      "LITERATURE",
      "THEORY",
      "WRITING",
      "EXAM_PREP",
      "QUICK_REVIEW",
    ])
    .optional(),
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
  type: z
    .enum([
      "EPOCH_OVERVIEW",
      "WORK_ANALYSIS",
      "CHARACTER_ANALYSIS",
      "THEME_ANALYSIS",
      "WRITING_GUIDE",
      "THEORY",
      "SUMMARY",
      "INTERPRETATION",
      "CONTEXT",
      "BIOGRAPHY",
    ])
    .optional(),
  workId: z.string().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(20),
});

export async function materialsRoutes(fastify: FastifyInstance) {
  // =========================
  // PUBLIC ROUTES - BEZ AUTORYZACJI
  // =========================

  // Lista materiałów
  fastify.get("/", async (request, reply) => {
    try {
      const query = getMaterialsSchema.parse(request.query);
      const materials = await materialService.getMaterials({
        ...query,
        isPremium: false,
      });

      return reply.send(materials);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Pojedynczy materiał po slug
  fastify.get(
    "/:slug",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { slug } = request.params as { slug: string };

        // Opcjonalna autoryzacja - sprawdź czy user jest zalogowany
        let userId: string | undefined;
        if (request.headers.authorization) {
          try {
            await request.jwtVerify();
            userId = request.user?.userId;
          } catch {
            // Ignoruj błędy - użytkownik niezalogowany
          }
        }

        const material = await materialService.getMaterialBySlug(slug, userId);

        // Sprawdź czy materiał premium i użytkownik niezalogowany
        if (material.isPremium && !userId) {
          return reply.status(403).send({
            error: "Premium content",
            message: "This material requires login",
          });
        }

        return reply.send(material);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(404).send({ error: errorMessage });
      }
    }
  );

  // Lista lektur
  fastify.get("/works", async (request, reply) => {
    try {
      const { epoch, isRequired, search } = request.query as any;
      const works = await materialService.getLiteraryWorks({
        epoch,
        isRequired:
          isRequired === "true"
            ? true
            : isRequired === "false"
            ? false
            : undefined,
        search,
      });

      return reply.send(works);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Szczegóły lektury
  fastify.get("/works/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const work = await materialService.getLiteraryWork(id);

      if (!work) {
        return reply.status(404).send({ error: "Work not found" });
      }

      return reply.send(work);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Lista epok
  fastify.get("/epochs", async (_request, reply) => {
    try {
      const epochs = await materialService.getEpochs();
      return reply.send(epochs);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Szczegóły epoki
  fastify.get("/epochs/:epoch", async (request, reply) => {
    try {
      const { epoch } = request.params as any;
      const epochData = await materialService.getEpoch(epoch);

      if (!epochData) {
        return reply.status(404).send({ error: "Epoch not found" });
      }

      return reply.send(epochData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Terminy literackie
  fastify.get("/terms", async (request, reply) => {
    try {
      const { category } = request.query as { category?: string };
      const terms = await materialService.getTerms(category);
      return reply.send(terms);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Cytaty
  fastify.get("/quotes", async (request, reply) => {
    try {
      const { workId, tags, search, random, limit } = request.query as any;
      const quotes = await materialService.getQuotes({
        workId,
        tags: tags ? tags.split(",") : undefined,
        search,
        random: random === "true",
        limit: limit ? parseInt(limit) : 20,
      });

      return reply.send(quotes);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // =========================
  // PROTECTED ROUTES - WYMAGAJĄ LOGOWANIA
  // =========================

  // Materiały premium dla zalogowanych
  fastify.get(
    "/premium",
    {
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          return reply.status(401).send({ error: "Unauthorized" });
        }
      },
    },
    async (request, reply) => {
      try {
        const query = getMaterialsSchema.parse(request.query);
        const materials = await materialService.getMaterials({
          ...query,
          isPremium: true,
        });

        return reply.send(materials);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // Progress użytkownika
  fastify.get(
    "/progress",
    {
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          return reply.status(401).send({ error: "Unauthorized" });
        }
      },
    },
    async (request: FastifyRequest, reply) => {
      try {
        const userId = request.user!.userId;
        const progress = await materialService.getUserProgress(userId);
        return reply.send(progress);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // =========================
  // ADMIN ROUTES - TYLKO DLA ADMINÓW
  // =========================

  // Middleware dla admina
  const adminPreHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      await request.jwtVerify();
      if (request.user?.role !== "ADMIN") {
        return reply.status(403).send({ error: "Forbidden - Admin only" });
      }
    } catch (err) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  };

  // Tworzenie materiału
  fastify.post("/", { preHandler: adminPreHandler }, async (request, reply) => {
    try {
      const material = await materialService.createMaterial(request.body);
      return reply.status(201).send(material);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Aktualizacja materiału
  fastify.put(
    "/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const material = await materialService.updateMaterial(id, request.body);
        return reply.send(material);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // Usuwanie materiału
  fastify.delete(
    "/:id",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        await materialService.deleteMaterial(id);
        return reply.status(204).send();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // Tworzenie lektury
  fastify.post(
    "/works",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const work = await materialService.createLiteraryWork(request.body);
        return reply.status(201).send(work);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // Bulk import
  fastify.post(
    "/bulk-import",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { materials } = request.body as { materials: any[] };
        const results = await materialService.bulkImportMaterials(materials);
        return reply.send(results);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // Dodawanie rozdziału
  fastify.post(
    "/works/:workId/chapters",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { workId } = request.params as { workId: string };
        const chapter = await materialService.createChapter(
          workId,
          request.body
        );
        return reply.status(201).send(chapter);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // Dodawanie postaci
  fastify.post(
    "/works/:workId/characters",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { workId } = request.params as { workId: string };
        const character = await materialService.createCharacter(
          workId,
          request.body
        );
        return reply.status(201).send(character);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );

  // Dodawanie cytatu
  fastify.post(
    "/works/:workId/quotes",
    { preHandler: adminPreHandler },
    async (request, reply) => {
      try {
        const { workId } = request.params as { workId: string };
        const quote = await materialService.createQuote(workId, request.body);
        return reply.status(201).send(quote);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return reply.status(400).send({ error: errorMessage });
      }
    }
  );
}
