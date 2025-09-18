// backend/src/routes/auth.routes.ts

import { FastifyInstance } from "fastify";
import { z } from "zod";
import { AuthService } from "../services/authService";

const authService = new AuthService();

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", async (request, reply) => {
    try {
      const data = RegisterSchema.parse(request.body);
      const result = await authService.register(data);
      return reply.code(201).send(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({ errors: error.errors });
      }
      return reply.code(500).send({ error: "Registration failed" });
    }
  });

  fastify.post("/login", async (request, reply) => {
    try {
      const { email, password } = LoginSchema.parse(request.body);
      const result = await authService.login(email, password);
      return reply.send(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({ errors: error.errors });
      }
      return reply.code(401).send({ error: "Invalid credentials" });
    }
  });

  fastify.post("/refresh", async (request, reply) => {
    try {
      const { refreshToken } = request.body as { refreshToken: string };

      if (!refreshToken) {
        return reply.code(401).send({ error: "Refresh token required" });
      }

      const tokens = await authService.refreshToken(refreshToken);
      return reply.send(tokens);
    } catch (error) {
      return reply.code(401).send({ error: "Invalid refresh token" });
    }
  });

  fastify.post("/logout", async (request, reply) => {
    try {
      await request.jwtVerify();
      const userId = (request.user as any).userId;
      await authService.logout(userId);
      return reply.send({ success: true });
    } catch (error) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
  });
}
