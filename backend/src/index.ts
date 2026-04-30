// backend/src/index.ts

import dotenv from "dotenv";

dotenv.config();

console.log("=== ENV DEBUG ===");
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME);
console.log(
  "AWS_ACCESS_KEY_ID:",
  process.env.AWS_ACCESS_KEY_ID ? "✅ SET" : "❌ MISSING",
);
console.log(
  "AWS_SECRET_ACCESS_KEY:",
  process.env.AWS_SECRET_ACCESS_KEY ? "✅ SET" : "❌ MISSING",
);
console.log(
  "GOOGLE_SEARCH_API_KEY:",
  process.env.GOOGLE_SEARCH_API_KEY ? "✅ SET" : "❌ MISSING",
);
console.log(
  "GOOGLE_SEARCH_ENGINE_ID:",
  process.env.GOOGLE_SEARCH_ENGINE_ID ? "✅ SET" : "❌ MISSING",
);
console.log("=================");
import cors from "@fastify/cors";
import { testLandingRoutes } from "./routes/testLanding.routes";
import formbody from "@fastify/formbody";
import cron from "node-cron";
import multipart from "@fastify/multipart";
import { uploadRoutes } from "./routes/upload.routes";
import jwt from "@fastify/jwt";
import { registerActivityTracker } from "./middleware/activityTracker";
import Fastify from "fastify";
import { initializeAI } from "./ai/aiService";
import voiceRoutes from "./routes/voice.js";
import { resetStaleStreaks } from "./jobs/resetStaleStreaks";
import { adminRoutes } from "./routes/admin.routes";
import { checkExpiredAccess } from "./jobs/checkExpiredAccess";
import { adminSubscriptionRoutes } from "./routes/adminSubscription.routes";
import { sitemapRoutes } from "./routes/sitemap.routes";
import { adminEmailAnalyticsRoutes } from "./routes/admin-email-analytics.routes";
import { emailWebhookRoutes } from "./routes/emailWebhook.routes";
import { examStructureRoutes } from "./routes/examStructure.routes";
import { unsubscribeRoutes } from "./routes/unsubscribe.routes";
import { adminEmailRoutes } from "./routes/admin-email.routes";
import {
  runMorningEmailJobs,
  runEveningEmailJobs,
  runWeeklyEmailJobs,
  runMonthlyEmailJobs,
} from "./jobs/engagementMailerJob";
import { subscriptionRoutes } from "./routes/subscription.routes";
import { authRoutes } from "./routes/auth.routes";
import { exerciseRoutes } from "./routes/exercise.routes";
import { learningRoutes } from "./routes/learning.routes";
import { examRoutes } from "./routes/exam.routes";
import { epochLandingRoutes } from "./routes/epochLanding.routes";
import { materialsRoutes } from "./routes/materials.routes";
import { studentRoutes } from "./routes/student.routes";
import { contentRoutes } from "./routes/content.routes";
import { studyPlanRoutes } from "./routes/studyPlan.routes";
import { startSubscriptionExpirationJob } from "./jobs/subscriptionExpirationJob";

// Uruchamiaj codziennie o 00:00
cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running daily job: check expired access");
  try {
    await checkExpiredAccess();
  } catch (error) {
    console.error("Error in expired access check:", error);
  }
});

cron.schedule("0 10 * * *", async () => {
  try {
    await runMorningEmailJobs();
  } catch (e) {
    console.error(e);
  }
});
cron.schedule("0 19 * * *", async () => {
  try {
    await runEveningEmailJobs();
  } catch (e) {
    console.error(e);
  }
});
cron.schedule("0 8 * * 1", async () => {
  try {
    await runWeeklyEmailJobs();
  } catch (e) {
    console.error(e);
  }
});
cron.schedule("0 9 1 * *", async () => {
  try {
    await runMonthlyEmailJobs();
  } catch (e) {
    console.error(e);
  }
});
cron.schedule("5 0 * * *", async () => {
  console.log("⏰ Running daily job: reset stale streaks");
  try {
    await resetStaleStreaks();
  } catch (error) {
    console.error("Error in stale streak reset:", error);
  }
});

const fastify = Fastify({
  //  logger: {
  //  level: "info",
  //},
});

// Initialize services
console.log("Initializing AI service...");
initializeAI();

fastify.addContentTypeParser(
  "application/json",
  { parseAs: "buffer" },
  function (req, body, done) {
    if (req.url === "/api/subscription/webhook") {
      // Upewnij się, że body jest Buffer
      req.rawBody = Buffer.isBuffer(body) ? body : Buffer.from(body);
    }
    try {
      const json = JSON.parse(body.toString());
      done(null, json);
    } catch (err: any) {
      err.statusCode = 400;
      done(err, undefined);
    }
  },
);

// SNS wysyła JSON ale z Content-Type: text/plain
fastify.addContentTypeParser(
  "text/plain",
  { parseAs: "string" },
  function (_req, body, done) {
    try {
      const json = JSON.parse(body as string);
      done(null, json);
    } catch (err) {
      done(null, body);
    }
  },
);

// Register plugins
if (process.env.ENABLE_CORS !== "false") {
  fastify.register(cors, {
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://app-reactapp.ngrok.app",
      "https://server-reactapp.ngrok.app",
      "https://maturapolski.pl",
      "https://api.maturapolski.pl",
      "https://www.maturapolski.pl",
    ],
    credentials: true,
  });
}

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "your-jwt-secret-change-in-production",
});

registerActivityTracker(fastify);

// Health check
fastify.get("/health", async () => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    services: {
      ai: !!process.env.ANTHROPIC_API_KEY,
      database: true,
    },
  };
});

// Register API routes
console.log("Registering routes...");
fastify.register(formbody);

fastify.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10,
  },
});

// AUTH ROUTES - MUSZĄ BYĆ PIERWSZE!
fastify.register(authRoutes, { prefix: "/api/auth" });
console.log("✓ Auth routes registered at /api/auth/*");

// admin routes
fastify.register(adminRoutes, { prefix: "/api/admin" });
console.log("✓ Admin routes registered at /api/admin/*");

fastify.register(adminSubscriptionRoutes, { prefix: "/api/admin" });
console.log("✓ Admin Subscription Routes registered at /api/admin/*");

fastify.register(adminEmailRoutes, { prefix: "/api/admin/email" });
fastify.register(adminEmailAnalyticsRoutes, {
  prefix: "/api/admin/email-analytics",
});

// upload routes
fastify.register(uploadRoutes, { prefix: "/api/upload" });
console.log("✓ Upload routes registered at /api/upload/*");

// Student routes
fastify.register(studentRoutes, { prefix: "/api/student" });
console.log("✓ Student routes registered at /api/student/*");

fastify.register(epochLandingRoutes, { prefix: "/api/epochs" });
console.log("✓ Epoch routes registered at /api/student/*");

// Study Plan routes
fastify.register(studyPlanRoutes, { prefix: "/api/study" });
console.log("✓ Study Plan routes registered at /api/study/*");

// Exam routes
fastify.register(examRoutes, { prefix: "/api/exams" });
console.log("✓ Exam routes registered at /api/exams/*");

fastify.register(subscriptionRoutes, { prefix: "/api/subscription" });
console.log("✓ SubscriptionRoutes routes registered at /api/subscription/*");

// Exam Structure routes (dla admina)
fastify.register(examStructureRoutes, { prefix: "/api/admin/exam-structures" });
console.log(
  "✓ Exam Structure routes registered at /api/admin/exam-structures/*",
);

// Exercise routes
fastify.register(exerciseRoutes, { prefix: "/api/exercises" });
console.log("✓ Exercise routes registered at /api/exercises/*");

// Learning routes
fastify.register(learningRoutes, { prefix: "/api/learning" });
console.log("✓ Learning routes registered at /api/learning/*");

// Trasy publiczne
fastify.register(materialsRoutes, { prefix: "/api/materials" });
console.log("✓ Materials routes registered at /api/materials/*");

fastify.register(unsubscribeRoutes, { prefix: "/api/email" });

fastify.register(sitemapRoutes);

fastify.register(voiceRoutes);

fastify.register(emailWebhookRoutes, { prefix: "/api/email" });

fastify.register(contentRoutes, { prefix: "/api/content" });
console.log("✓ Content routes registered at /api/content/*");

fastify.register(testLandingRoutes, { prefix: "/api/tests" });
console.log("✓ Test landing routes registered at /api/tests/*");

// Error handler
fastify.setErrorHandler(async (error) => {
  console.error("Server Error:", error);
});

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: "Not Found",
    message: `Route ${request.method}:${request.url} not found`,
    hint: "Check /health for available endpoints",
  });
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "4000");
    const host = process.env.HOST || "0.0.0.0";
    startSubscriptionExpirationJob();

    await fastify.listen({ port, host });

    if (process.send) process.send("ready");

    console.log(`🚀 Server running on http://${host}:${port}`);

    console.log(`📊 Health: http://${host}:${port}/health`);
    console.log(`🔐 Login: http://${host}:${port}/api/auth/login`);
    console.log(`📚 Study Plan: http://${host}:${port}/api/study/*`);
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

start();
