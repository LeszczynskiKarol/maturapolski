// backend/src/routes/upload.routes.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { uploadService } from "../services/uploadService";

export async function uploadRoutes(fastify: FastifyInstance) {
  // Middleware sprawdzający autoryzację (tylko admin może uploadować)
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

  // Upload pojedynczego obrazu
  // POST /api/upload/image
  fastify.post(
    "/image",
    {
      preHandler: adminPreHandler,
    },
    async (request, reply) => {
      try {
        const data = await request.file();

        if (!data) {
          return reply.status(400).send({ error: "No file provided" });
        }

        // Pobierz folder z query lub użyj domyślnego
        const { folder = "content" } = request.query as { folder?: string };

        // Konwertuj stream na buffer
        const buffer = await data.toBuffer();

        // Upload do S3
        const imageUrl = await uploadService.uploadImage(
          buffer,
          data.filename,
          folder
        );

        return reply.send({
          url: imageUrl,
          filename: data.filename,
        });
      } catch (error: any) {
        console.error("Upload error:", error);
        return reply.status(500).send({ error: error.message });
      }
    }
  );

  // Upload wielu obrazów naraz
  // POST /api/upload/images
  fastify.post(
    "/images",
    {
      preHandler: adminPreHandler,
    },
    async (request, reply) => {
      try {
        const parts = request.parts();
        const files: Array<{ buffer: Buffer; originalName: string }> = [];

        for await (const part of parts) {
          if (part.type === "file") {
            const buffer = await part.toBuffer();
            files.push({
              buffer,
              originalName: part.filename,
            });
          }
        }

        if (files.length === 0) {
          return reply.status(400).send({ error: "No files provided" });
        }

        const { folder = "content" } = request.query as { folder?: string };

        // Upload wszystkich plików
        const urls = await uploadService.uploadMultipleImages(files, folder);

        return reply.send({
          urls,
          count: urls.length,
        });
      } catch (error: any) {
        console.error("Upload error:", error);
        return reply.status(500).send({ error: error.message });
      }
    }
  );

  // Usuwanie obrazu
  // DELETE /api/upload/image
  fastify.delete(
    "/image",
    {
      preHandler: adminPreHandler,
    },
    async (request, reply) => {
      try {
        const { url } = request.body as { url: string };

        if (!url) {
          return reply.status(400).send({ error: "No URL provided" });
        }

        await uploadService.deleteImage(url);

        return reply.send({ success: true });
      } catch (error: any) {
        console.error("Delete error:", error);
        return reply.status(500).send({ error: error.message });
      }
    }
  );
}
