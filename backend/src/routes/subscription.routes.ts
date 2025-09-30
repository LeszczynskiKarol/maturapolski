// backend/src/routes/subscription.routes.ts

import { FastifyInstance } from "fastify";
import { subscriptionService } from "../services/subscriptionService";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function subscriptionRoutes(fastify: FastifyInstance) {
  // Webhook Stripe (BEZ JWT - Stripe musi mieć dostęp)
  fastify.post(
    "/webhook",
    {
      config: {
        rawBody: true,
      },
    },
    async (request, reply) => {
      const sig = request.headers["stripe-signature"];

      if (!sig || typeof sig !== "string") {
        return reply.code(400).send({ error: "Missing stripe signature" });
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          request.rawBody as Buffer,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET!
        );
      } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        return reply.code(400).send({ error: `Webhook Error: ${err.message}` });
      }

      console.log("✅ Stripe webhook received:", event.type);

      try {
        await subscriptionService.handleStripeWebhook(event);
        return reply.send({ received: true });
      } catch (error) {
        console.error("Error processing webhook:", error);
        return reply.code(500).send({ error: "Webhook processing failed" });
      }
    }
  );

  // CHRONIONE ENDPOINTY - wymagają JWT
  fastify.register(async (protectedRoutes) => {
    protectedRoutes.addHook("onRequest", async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    });

    // Pobierz status subskrypcji
    protectedRoutes.get("/status", async (request, reply) => {
      const userId = (request.user as any).userId;
      const subscription = await subscriptionService.getOrCreateSubscription(
        userId
      );

      return reply.send({
        plan: subscription.plan,
        status: subscription.status,
        aiPointsUsed: subscription.aiPointsUsed,
        aiPointsLimit: subscription.aiPointsLimit,
        percentUsed: Math.round(
          (subscription.aiPointsUsed / subscription.aiPointsLimit) * 100
        ),
        resetDate: subscription.aiPointsReset,
        cancelAt: subscription.cancelAt,
        endDate: subscription.endDate,
      });
    });

    // Utwórz Checkout Session
    protectedRoutes.post("/create-checkout", async (request, reply) => {
      const userId = (request.user as any).userId;
      const { priceId } = request.body as { priceId: string };

      if (!priceId) {
        return reply.code(400).send({ error: "Price ID required" });
      }

      try {
        const { sessionId, url } =
          await subscriptionService.createCheckoutSession(userId, priceId);

        return reply.send({ sessionId, url });
      } catch (error: any) {
        console.error("Error creating checkout session:", error);
        return reply.code(500).send({ error: error.message });
      }
    });

    // Anuluj subskrypcję
    protectedRoutes.post("/cancel", async (request, reply) => {
      const userId = (request.user as any).userId;

      try {
        await subscriptionService.cancelSubscription(userId);
        return reply.send({
          success: true,
          message: "Subscription will be canceled at period end",
        });
      } catch (error: any) {
        return reply.code(400).send({ error: error.message });
      }
    });

    // Wznów subskrypcję
    protectedRoutes.post("/resume", async (request, reply) => {
      const userId = (request.user as any).userId;

      try {
        await subscriptionService.resumeSubscription(userId);
        return reply.send({ success: true, message: "Subscription resumed" });
      } catch (error: any) {
        return reply.code(400).send({ error: error.message });
      }
    });

    // Statystyki użycia AI
    protectedRoutes.get("/ai-usage", async (request, reply) => {
      const userId = (request.user as any).userId;
      const stats = await subscriptionService.getAiUsageStats(userId);
      return reply.send(stats);
    });

    // Portal zarządzania Stripe (zmiana karty, faktury)
    protectedRoutes.post("/create-portal-session", async (request, reply) => {
      const userId = (request.user as any).userId;

      const subscription = await subscriptionService.getOrCreateSubscription(
        userId
      );

      if (!subscription.stripeCustomerId) {
        return reply.code(400).send({ error: "No Stripe customer found" });
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: `${process.env.FRONTEND_URL}/subscription`,
      });

      return reply.send({ url: session.url });
    });
  });
}
