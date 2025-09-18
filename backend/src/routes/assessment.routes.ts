// backend/src/routes/assessment.routes.ts

import { FastifyInstance } from "fastify";
import { AssessmentService } from "../services/assessmentService";

const assessmentService = new AssessmentService();

export async function assessmentRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Assess essay
  fastify.post("/essay", async (request, reply) => {
    const userId = (request.user as any).userId;
    const { content, topic, requirements } = request.body as {
      content: string;
      topic: string;
      requirements: any;
    };

    const assessment = await assessmentService.assessEssay(
      userId,
      content,
      topic,
      requirements
    );

    return reply.send(assessment);
  });

  // Get assessment by ID
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const assessment = await assessmentService.getAssessment(id);

    if (!assessment) {
      return reply.code(404).send({ error: "Assessment not found" });
    }

    return reply.send(assessment);
  });

  // Get user's assessments
  fastify.get("/user/all", async (request, reply) => {
    const userId = (request.user as any).userId;
    const assessments = await assessmentService.getUserAssessments(userId);
    return reply.send(assessments);
  });
}
