// backend/src/types/fastify.d.ts

import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      userId: string;
      email: string;
      role: "ADMIN" | "STUDENT";
    };
  }
}

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: string;
      email: string;
      role: "ADMIN" | "STUDENT";
    };
  }
}
