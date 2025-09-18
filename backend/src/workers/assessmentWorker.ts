// backend/src/workers/assessmentWorker.ts

import { Worker } from "bullmq";
import { AssessmentService } from "../services/assessmentService";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
};

const assessmentService = new AssessmentService();

export const assessmentWorker = new Worker(
  "assessment",
  async (job) => {
    const { userId, content, topic, requirements, submissionId } = job.data;

    console.log(`Processing assessment job ${job.id}`);

    try {
      const result = await assessmentService.processAssessment(
        userId,
        content,
        topic,
        requirements,
        submissionId
      );

      return result;
    } catch (error) {
      console.error("Assessment processing failed:", error);
      throw error;
    }
  },
  { connection }
);

assessmentWorker.on("completed", (job) => {
  console.log(`Assessment ${job.id} completed successfully`);
});

assessmentWorker.on("failed", (job, err) => {
  console.error(`Assessment ${job?.id} failed:`, err);
});
