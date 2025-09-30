import "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    rawBody?: Buffer;
    user?: {
      userId: string;
      email: string;
      role: "ADMIN" | "STUDENT";
    };
  }

  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      userId: string;
      email: string;
      role: "ADMIN" | "STUDENT";
    };
  }
}
