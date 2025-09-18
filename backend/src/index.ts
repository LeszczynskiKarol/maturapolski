// backend/src/index.ts

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { initializeAI } from "./ai/aiService";
import { adminRoutes } from "./routes/admin.routes";
import { initializeQueue } from "./services/queueService";
import { authRoutes } from "./routes/auth.routes";
import { exerciseRoutes } from "./routes/exercise.routes";
import { studentRoutes } from "./routes/student.routes";
import { learningRoutes } from "./routes/learning.routes";
import { studyPlanRoutes } from "./routes/studyPlan.routes";

const fastify = Fastify({
  logger: {
    level: "info",
  },
});

// Initialize services
console.log("Initializing AI service...");
initializeAI();

console.log("Initializing queue system...");
initializeQueue();

// Register plugins
fastify.register(cors, {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "your-jwt-secret-change-in-production",
});

// Health check
fastify.get("/health", async (request, reply) => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    services: {
      ai: !!process.env.ANTHROPIC_API_KEY,
      database: true,
      redis: true,
    },
  };
});

// USUŃ MOCK ENDPOINT - TO BLOKUJE PRAWDZIWE LOGOWANIE!
// NIE MA JUŻ /auth/login MOCK!

// Register API routes
console.log("Registering routes...");

// AUTH ROUTES - MUSZĄ BYĆ PIERWSZE!
fastify.register(authRoutes, { prefix: "/api/auth" });
console.log("✓ Auth routes registered at /api/auth/*");

// admin routes
fastify.register(adminRoutes, { prefix: "/api/admin" });
console.log("✓ Admin routes registered at /api/admin/*");

// Student routes
fastify.register(studentRoutes, { prefix: "/api/student" });
console.log("✓ Student routes registered at /api/student/*");

// Study Plan routes
fastify.register(studyPlanRoutes, { prefix: "/api/study" });
console.log("✓ Study Plan routes registered at /api/study/*");

// Exercise routes
fastify.register(exerciseRoutes, { prefix: "/api/exercises" });
console.log("✓ Exercise routes registered at /api/exercises/*");

// Learning routes
fastify.register(learningRoutes, { prefix: "/api/learning" });
console.log("✓ Learning routes registered at /api/learning/*");

// Error handler
fastify.setErrorHandler(async (error, request, reply) => {
  console.error("Server Error:", error);

  if (error.statusCode) {
    reply.status(error.statusCode).send({
      error: error.message,
      statusCode: error.statusCode,
    });
  } else {
    reply.status(500).send({
      error: "Internal Server Error",
      message: error.message,
    });
  }
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

    await fastify.listen({ port, host });

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
