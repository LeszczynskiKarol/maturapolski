import { Queue, Worker } from "bullmq";
import { redis } from "../lib/redis";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
};

export const assessmentQueue = new Queue("assessment", { connection });
export const emailQueue = new Queue("email", { connection });

// NIE IMPORTUJ AssessmentService tutaj!
// Zamiast tego przekazuj handler jako parametr

export function initializeQueue() {
  // Worker dla assessment processing
  const assessmentWorker = new Worker(
    "assessment",
    async (job) => {
      const { userId, content, topic, requirements, submissionId } = job.data;

      console.log(`Processing assessment for submission ${submissionId}`);

      // Tutaj tylko logujemy - faktyczna logika będzie w assessment.routes.ts
      // lub w osobnym pliku worker
      return { processed: true };
    },
    { connection }
  );

  assessmentWorker.on("completed", (job) => {
    console.log(`Assessment ${job.id} completed`);
  });

  assessmentWorker.on("failed", (job, err) => {
    console.error(`Assessment ${job?.id} failed:`, err);
  });

  // Email worker
  const emailWorker = new Worker(
    "email",
    async (job) => {
      const { to, subject, html } = job.data;
      console.log(`Sending email to ${to}: ${subject}`);
      return { sent: true };
    },
    { connection }
  );

  console.log("Queue workers initialized");
}

export async function addAssessmentJob(data: any) {
  return assessmentQueue.add("assess", data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  });
}
