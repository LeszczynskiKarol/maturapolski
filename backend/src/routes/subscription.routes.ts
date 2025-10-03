// backend/src/routes/subscription.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
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
      console.log("🎯 Webhook endpoint hit!");
      console.log("Headers:", request.headers);

      const sig = request.headers["stripe-signature"];

      if (!sig || typeof sig !== "string") {
        console.error("❌ Missing stripe signature");
        return reply.code(400).send({ error: "Missing stripe signature" });
      }

      console.log("✅ Stripe signature found:", sig.substring(0, 20) + "...");

      let event: Stripe.Event;

      try {
        console.log("🔐 Verifying webhook signature...");
        event = stripe.webhooks.constructEvent(
          request.rawBody as Buffer,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET!
        );
        console.log("✅ Signature verified!");
      } catch (err: any) {
        console.error("❌ Webhook signature verification failed:", err.message);
        return reply.code(400).send({ error: `Webhook Error: ${err.message}` });
      }

      console.log("✅ Stripe webhook received:", event.type);

      try {
        await subscriptionService.handleStripeWebhook(event);
        console.log("✅ Webhook processed successfully");
        return reply.send({ received: true });
      } catch (error) {
        console.error("❌ Error processing webhook:", error);
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

    protectedRoutes.get(
      "/verify-session/:sessionId",
      async (request, reply) => {
        const { sessionId } = request.params as { sessionId: string };
        const userId = (request.user as any).userId;

        try {
          const session = await stripe.checkout.sessions.retrieve(sessionId);

          if (session.metadata?.userId !== userId) {
            return reply.code(403).send({ error: "Unauthorized" });
          }

          // Jeśli sesja zakończona pomyślnie, odśwież subskrypcję
          if (session.payment_status === "paid") {
            const subscription =
              await subscriptionService.getOrCreateSubscription(userId);
            return reply.send({
              success: true,
              subscription: {
                plan: subscription.plan,
                status: subscription.status,
                aiPointsLimit: subscription.aiPointsLimit,
              },
            });
          }

          return reply.send({
            success: false,
            message: "Payment not completed",
          });
        } catch (error: any) {
          return reply.code(500).send({ error: error.message });
        }
      }
    );

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

    // Kup pakiet punktów AI (jednorazowo)
    protectedRoutes.post("/buy-points", async (request, reply) => {
      try {
        const { pointsPackage } = request.body as {
          pointsPackage: "SMALL" | "MEDIUM" | "LARGE";
        };

        const userId = (request.user as any).userId;

        // Cennik pakietów punktów
        const packages = {
          SMALL: {
            points: 50,
            price: process.env.STRIPE_PRICE_ID_SMALL!,

            priceAmount: 1900, // 19 zł
          },
          MEDIUM: {
            points: 150,
            price: process.env.STRIPE_PRICE_ID_MEDIUM!,

            priceAmount: 4900, // 49 zł (oszczędność!)
          },
          LARGE: {
            points: 300,
            price: process.env.STRIPE_PRICE_ID_LARGE!,

            priceAmount: 7900, // 79 zł (największa oszczędność!)
          },
        };

        const selectedPackage = packages[pointsPackage];
        if (!selectedPackage) {
          return reply.code(400).send({ error: "Invalid package" });
        }

        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { subscription: true },
        });

        if (!user) {
          return reply.code(404).send({ error: "User not found" });
        }

        // Utwórz lub pobierz Stripe Customer
        let customerId = user.subscription?.stripeCustomerId;

        if (!customerId) {
          const customer = await stripe.customers.create({
            email: user.email,
            metadata: { userId: user.id },
          });
          customerId = customer.id;

          await prisma.subscription.update({
            where: { userId },
            data: { stripeCustomerId: customerId },
          });
        }

        // Utwórz Checkout Session dla jednorazowej płatności
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          mode: "payment", // PAYMENT zamiast SUBSCRIPTION!
          payment_method_types: ["card", "blik", "p24"],
          line_items: [
            {
              price: selectedPackage.price,
              quantity: 1,
            },
          ],
          success_url: `${process.env.FRONTEND_URL}/subscription?points_added=true`,
          cancel_url: `${process.env.FRONTEND_URL}/subscription`,
          metadata: {
            userId: user.id,
            pointsPackage: pointsPackage,
            pointsAmount: selectedPackage.points.toString(),
          },
        });

        return reply.send({
          sessionId: session.id,
          url: session.url,
        });
      } catch (error: any) {
        console.error("Error creating points purchase:", error);
        return reply.code(500).send({
          error: "Failed to create checkout session",
          details: error.message,
        });
      }
    });

    // Endpoint do sprawdzenia dostępnych pakietów
    protectedRoutes.get("/points-packages", async (_request, reply) => {
      const packages = [
        {
          id: "SMALL",
          name: "Pakiet Starter",
          points: 50,
          price: 19,
          pricePerPoint: 0.38,
          description: "Idealny do spróbowania",
        },
        {
          id: "MEDIUM",
          name: "Pakiet Standard",
          points: 150,
          price: 49,
          pricePerPoint: 0.33,
          description: "Najpopularniejszy wybór",
          badge: "Polecany",
        },
        {
          id: "LARGE",
          name: "Pakiet Premium",
          points: 300,
          price: 79,
          pricePerPoint: 0.26,
          description: "Najlepsza wartość",
          badge: "Najlepsza oferta",
        },
      ];

      return reply.send(packages);
    });
  });
}
