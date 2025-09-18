// backend/src/services/assessmentService.ts

import { prisma } from "../lib/prisma";
import { assessEssayWithAI } from "../ai/aiService";
import { assessmentQueue } from "./queueService";

export class AssessmentService {
  async assessEssay(
    userId: string,
    content: string,
    topic: string,
    requirements: any
  ) {
    // Dodaj do kolejki bezpośrednio
    const job = await assessmentQueue.add(
      "assess",
      {
        userId,
        content,
        topic,
        requirements,
        submissionId: null,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      }
    );

    return {
      jobId: job.id,
      status: "processing",
      message: "Twoje wypracowanie jest oceniane...",
    };
  }

  async processAssessment(
    userId: string,
    content: string,
    topic: string,
    requirements: any,
    submissionId?: string
  ) {
    try {
      const aiResult = await assessEssayWithAI(content, topic, requirements);

      const assessment = await prisma.assessment.create({
        data: {
          userId,
          submissionId: submissionId || "",
          formalScore: aiResult.formalScore,
          literaryScore: aiResult.literaryScore,
          compositionScore: aiResult.compositionScore,
          languageScore: aiResult.languageScore,
          totalScore: aiResult.totalScore,
          detailedFeedback: aiResult.detailedFeedback,
          improvements: aiResult.improvements,
        },
      });

      return assessment;
    } catch (error) {
      console.error("Assessment processing error:", error);
      throw error;
    }
  }

  async getAssessment(id: string) {
    return prisma.assessment.findUnique({
      where: { id },
      include: {
        submission: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  async getUserAssessments(userId: string) {
    return prisma.assessment.findMany({
      where: { userId },
      include: {
        submission: {
          include: {
            exercise: {
              select: {
                id: true,
                question: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
