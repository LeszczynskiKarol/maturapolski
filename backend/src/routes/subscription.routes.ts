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
          process.env.STRIPE_WEBHOOK_SECRET!,
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
    },
  );

  // CHRONIONE ENDPOINTY - wymagają JWT
  fastify.register(async (protectedRoutes) => {
    // ✅ DODAJ onRequest hook NA SAMYM POCZĄTKU
    protectedRoutes.addHook("onRequest", async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    });

    // ✅ JEDEN create-checkout endpoint z pełną logiką
    protectedRoutes.post("/create-checkout", async (request, reply) => {
      const userId = (request.user as any).userId;
      const { priceId } = request.body as { priceId: string };

      if (!priceId) {
        return reply.code(400).send({ error: "Price ID required" });
      }

      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { subscription: true },
        });

        if (!user) {
          return reply.code(404).send({ error: "User not found" });
        }

        // ✅ Sprawdź czy ma aktywny pakiet jednorazowy
        let trialEnd: number | undefined = undefined;

        if (
          user.subscription &&
          user.subscription.plan === "PREMIUM" &&
          !user.subscription.isRecurring &&
          user.subscription.endDate &&
          new Date(user.subscription.endDate) > new Date()
        ) {
          // ✅ Ustaw trial_end na datę wygaśnięcia pakietu
          trialEnd = Math.floor(
            new Date(user.subscription.endDate).getTime() / 1000,
          );

          const daysLeft = Math.ceil(
            (new Date(user.subscription.endDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          );

          console.log(
            `🔄 User has active one-time package until ${user.subscription.endDate}`,
          );
          console.log(`Setting trial_end to: ${new Date(trialEnd * 1000)}`);

          // ✅ Utwórz sesję z trial period
          const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: "subscription",
            subscription_data: {
              trial_end: trialEnd, // ✅ Subskrypcja zacznie się dopiero po tym czasie
              metadata: {
                userId: user.id,
                upgradedFromOneTime: "true",
                originalEndDate: user.subscription.endDate.toISOString(),
              },
            },
            success_url: `${process.env.FRONTEND_URL}/subscription?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/subscription?canceled=true`,
            metadata: { userId: user.id },
          });

          // Zwróć ostrzeżenie + URL
          return reply.send({
            warning: true,
            type: "subscription",
            message: `Masz aktywny pakiet na 30 dni (pozostało ${daysLeft} dni). Subskrypcja zostanie aktywowana automatycznie po jego wygaśnięciu (${new Date(
              user.subscription.endDate,
            ).toLocaleDateString("pl-PL")}).`,
            currentEndDate: user.subscription.endDate,
            daysLeft,
            url: session.url,
            sessionId: session.id,
          });
        }

        // ✅ Standardowa subskrypcja bez trial
        const session = await stripe.checkout.sessions.create({
          customer_email: user.email,
          line_items: [{ price: priceId, quantity: 1 }],
          mode: "subscription",
          success_url: `${process.env.FRONTEND_URL}/subscription?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.FRONTEND_URL}/subscription?canceled=true`,
          metadata: { userId },
        });

        return reply.send({ url: session.url });
      } catch (error: any) {
        console.error("Error creating checkout:", error);
        return reply.code(500).send({ error: error.message });
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

            // ✅ FIX: Dodaj null-check dla subscription
            if (!subscription) {
              return reply
                .code(500)
                .send({ error: "Failed to get subscription" });
            }

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
      },
    );

    // Pobierz status subskrypcji
    protectedRoutes.get("/status", async (request, reply) => {
      const userId = (request.user as any).userId;
      const subscription =
        await subscriptionService.getOrCreateSubscription(userId);

      // ✅ FIX: Dodaj null-check dla subscription
      if (!subscription) {
        return reply
          .code(500)
          .send({ error: "Failed to get subscription status" });
      }

      return reply.send({
        plan: subscription.plan,
        status: subscription.status,
        isRecurring: subscription.isRecurring,
        aiPointsUsed: subscription.aiPointsUsed,
        aiPointsLimit: subscription.aiPointsLimit,
        percentUsed: Math.round(
          (subscription.aiPointsUsed / subscription.aiPointsLimit) * 100,
        ),
        resetDate: subscription.aiPointsReset,
        cancelAt: subscription.cancelAt,
        endDate: subscription.endDate,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
        metadata: subscription.metadata,
      });
    });

    protectedRoutes.post("/cancel-pending", async (request, reply) => {
      const userId = (request.user as any).userId;

      try {
        const subscription = await prisma.subscription.findUnique({
          where: { userId },
          include: { user: true },
        });

        if (!subscription) {
          return reply.code(404).send({ error: "Subscription not found" });
        }

        const metadata = subscription.metadata as any;
        const pendingSubscription = metadata?.pendingSubscription;

        if (!pendingSubscription?.stripeSubscriptionId) {
          return reply
            .code(400)
            .send({ error: "No pending subscription found" });
        }

        // Anuluj subskrypcję w Stripe
        try {
          await stripe.subscriptions.cancel(
            pendingSubscription.stripeSubscriptionId,
          );
          console.log(
            `✅ Cancelled pending subscription: ${pendingSubscription.stripeSubscriptionId}`,
          );
        } catch (stripeError: any) {
          console.error("Error cancelling Stripe subscription:", stripeError);
          // Kontynuuj nawet jeśli Stripe zwróci błąd (może już była anulowana)
        }

        // Usuń informację o pending subscription z metadata
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            stripeSubscriptionId: null, // Usuń link do subskrypcji
            metadata: {
              ...(metadata || {}),
              pendingSubscription: null, // Usuń pending info
              cancelledPendingAt: new Date().toISOString(),
            },
          },
        });

        return reply.send({
          success: true,
          message: "Pending subscription cancelled",
        });
      } catch (error: any) {
        console.error("Error cancelling pending subscription:", error);
        return reply.code(500).send({
          error: "Failed to cancel pending subscription",
          details: error.message,
        });
      }
    });

    protectedRoutes.get("/payment-history", async (request, reply) => {
      const userId = (request.user as any).userId;

      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { subscription: true },
        });

        console.log(`🔍 Payment history request for user ${userId}`);
        console.log(`📊 User subscription:`, user?.subscription);

        let customerId = user?.subscription?.stripeCustomerId;

        // ✅ FALLBACK: jeśli nie ma customerId, pobierz z Stripe
        if (!customerId && user?.subscription?.stripeSubscriptionId) {
          console.log(
            `⚠️ No stripeCustomerId, fetching from Stripe subscription...`,
          );

          try {
            const stripeSubscription = await stripe.subscriptions.retrieve(
              user.subscription.stripeSubscriptionId,
            );
            customerId = stripeSubscription.customer as string;

            // Zapisz w bazie na przyszłość
            await prisma.subscription.update({
              where: { id: user.subscription.id },
              data: { stripeCustomerId: customerId },
            });

            console.log(`✅ Retrieved and saved customerId: ${customerId}`);
          } catch (err) {
            console.error(`❌ Error fetching subscription from Stripe:`, err);
          }
        }

        if (!customerId) {
          console.log(`⚠️ No stripeCustomerId found for user ${userId}`);
          return reply.send({ payments: [] });
        }

        console.log(`🔍 Fetching payments for customer: ${customerId}`);

        try {
          // ✅ POBIERZ FAKTURY (invoices)
          const invoices = await stripe.invoices.list({
            customer: customerId,
            limit: 50,
          });

          console.log(`📄 Found ${invoices.data.length} invoices`);

          // ✅ POBIERZ checkout sessions
          const sessions = await stripe.checkout.sessions.list({
            customer: customerId,
            limit: 50,
          });

          console.log(`🛒 Found ${sessions.data.length} checkout sessions`);

          const payments: any[] = [];

          // ✅ Mapuj faktury (subscription payments)
          for (const invoice of invoices.data) {
            if (invoice.status === "paid" && invoice.amount_paid > 0) {
              let description = "";
              let type = "SUBSCRIPTION";

              if (invoice.billing_reason === "subscription_create") {
                description = "Subskrypcja Premium - pierwsza płatność";
              } else if (invoice.billing_reason === "subscription_cycle") {
                description = "Subskrypcja Premium - odnowienie";
              } else {
                description = "Płatność subskrypcji Premium";
              }

              payments.push({
                id: invoice.id,
                date: new Date(invoice.created * 1000).toISOString(),
                type,
                description,
                amount: invoice.amount_paid / 100,
                currency: invoice.currency?.toUpperCase() || "PLN",
                status: "PAID",
                receiptUrl: invoice.hosted_invoice_url || null,
              });
            }
          }

          // ✅ Mapuj checkout sessions (jednorazowe płatności)
          for (const session of sessions.data) {
            if (
              session.payment_status === "paid" &&
              session.mode === "payment"
            ) {
              const metadata = session.metadata || {};
              let type = "UNKNOWN";
              let description = "";

              if (metadata.purchaseType === "MONTHLY_ACCESS") {
                type = "MONTHLY_ACCESS";
                description = "Dostęp Premium na 30 dni";
              } else if (metadata.pointsPackage) {
                type = "POINTS_PURCHASE";
                const packageName =
                  metadata.pointsPackage === "SMALL"
                    ? "Pakiet Starter (50 pkt)"
                    : metadata.pointsPackage === "MEDIUM"
                      ? "Pakiet Standard (150 pkt)"
                      : "Pakiet Premium (300 pkt)";
                description = `Doładowanie: ${packageName}`;
              } else {
                description = "Płatność";
              }

              payments.push({
                id: session.id,
                date: new Date(session.created * 1000).toISOString(),
                type,
                description,
                amount: (session.amount_total || 0) / 100,
                currency: session.currency?.toUpperCase() || "PLN",
                status: "PAID",
                receiptUrl: null,
              });
            }
          }

          payments.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

          console.log(
            `✅ Found ${payments.length} payments for user ${userId}`,
          );

          return reply.send({ payments });
        } catch (stripeError: any) {
          // ✅ Klient usunięty ze Stripe (np. wyczyszczone dane testowe)
          if (stripeError.code === "resource_missing") {
            console.warn(
              `⚠️ Stripe customer ${customerId} not found - clearing from DB`,
            );

            // Wyczyść nieaktualny customerId z bazy
            await prisma.subscription.updateMany({
              where: { stripeCustomerId: customerId },
              data: { stripeCustomerId: null },
            });

            return reply.send({ payments: [], stripeCustomerCleared: true });
          }
          throw stripeError;
        }
      } catch (error: any) {
        console.error("Error fetching payment history:", error);
        return reply.code(500).send({
          error: "Failed to fetch payment history",
          details: error.message,
        });
      }
    });

    protectedRoutes.post("/buy-monthly-access", async (request, reply) => {
      try {
        const userId = (request.user as any).userId;

        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { subscription: true },
        });

        if (!user) {
          return reply.code(404).send({ error: "User not found" });
        }

        const existingSub = user.subscription;

        // ✅ Sprawdź czy ma aktywną subskrypcję (zwykłą LUB anulowaną)
        const hasActiveSubscription =
          existingSub?.stripeSubscriptionId &&
          existingSub.status === "ACTIVE" &&
          existingSub.isRecurring;

        const hasActiveOneTime =
          existingSub?.status === "ACTIVE" &&
          !existingSub.isRecurring &&
          existingSub.endDate &&
          new Date(existingSub.endDate) > new Date();

        // ✅ NOWA LOGIKA: określ datę początkową
        let newStartDate = new Date();
        let newEndDate = new Date();

        if (hasActiveSubscription && existingSub?.cancelAt) {
          // ✅ Ma anulowaną subskrypcję - pakiet zacznie się po jej wygaśnięciu
          newStartDate = new Date(existingSub.cancelAt);
          newEndDate = new Date(existingSub.cancelAt);
          newEndDate.setDate(newEndDate.getDate() + 30);
        } else if (hasActiveOneTime && existingSub?.endDate) {
          // ✅ Ma aktywny pakiet jednorazowy - przedłuż od końca
          newStartDate = new Date(existingSub.endDate);
          newEndDate = new Date(existingSub.endDate);
          newEndDate.setDate(newEndDate.getDate() + 30);
        } else {
          // ✅ Brak aktywnego dostępu - zacznij od teraz
          newEndDate.setDate(newEndDate.getDate() + 30);
        }

        // Utwórz lub pobierz Stripe Customer
        let customerId = user.subscription?.stripeCustomerId;

        if (!customerId) {
          const customer = await stripe.customers.create({
            email: user.email,
            metadata: { userId: user.id },
          });
          customerId = customer.id;

          await prisma.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: customerId,
              status: "INACTIVE",
              plan: "FREE",
              aiPointsLimit: 20,
              aiPointsUsed: 0,
              aiPointsReset: new Date(),
              isRecurring: false,
            },
            update: {
              stripeCustomerId: customerId,
            },
          });
        }

        // ✅ ZAWSZE utwórz Checkout Session
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          mode: "payment",
          payment_method_types: ["card", "blik"],
          line_items: [
            {
              price: process.env.STRIPE_PRICE_ID_MONTHLY!,
              quantity: 1,
            },
          ],
          success_url: `${process.env.FRONTEND_URL}/subscription?monthly_activated=true`,
          cancel_url: `${process.env.FRONTEND_URL}/subscription`,
          metadata: {
            userId: user.id,
            purchaseType: "MONTHLY_ACCESS",
            newStartDate: newStartDate.toISOString(),
            newEndDate: newEndDate.toISOString(),
            hasActiveSub: hasActiveSubscription ? "true" : "false",
            hasCancelledSub:
              hasActiveSubscription && existingSub?.cancelAt ? "true" : "false",
          },
        });

        // ✅ Sprawdź czy trzeba pokazać ostrzeżenie
        if (hasActiveSubscription && existingSub?.cancelAt) {
          const daysLeft = Math.ceil(
            (new Date(existingSub.cancelAt).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          );

          return reply.send({
            warning: true,
            type: "extend",
            currentEndDate: existingSub.cancelAt,
            newEndDate: newEndDate.toISOString(),
            daysLeft,
            message: `Masz aktywną subskrypcję ważną do ${new Date(
              existingSub.cancelAt,
            ).toLocaleDateString(
              "pl-PL",
            )}. Pakiet 30-dniowy zostanie aktywowany automatycznie po wygaśnięciu subskrypcji i będzie ważny do ${newEndDate.toLocaleDateString(
              "pl-PL",
            )}.`,
            url: session.url,
            sessionId: session.id,
          });
        } else if (hasActiveOneTime && existingSub?.endDate) {
          const daysLeft = Math.ceil(
            (new Date(existingSub.endDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          );

          return reply.send({
            warning: true,
            type: "extend",
            currentEndDate: existingSub.endDate,
            newEndDate: newEndDate.toISOString(),
            daysLeft,
            message: `Masz aktywny dostęp ważny do ${new Date(
              existingSub.endDate,
            ).toLocaleDateString(
              "pl-PL",
            )}. Wykupienie kolejnego pakietu przedłuży dostęp do ${newEndDate.toLocaleDateString(
              "pl-PL",
            )}.`,
            url: session.url,
            sessionId: session.id,
          });
        }

        // Standardowa odpowiedź bez ostrzeżenia
        return reply.send({
          sessionId: session.id,
          url: session.url,
        });
      } catch (error: any) {
        console.error("Error creating monthly access checkout:", error);
        return reply.code(500).send({
          error: "Failed to create checkout session",
          details: error.message,
        });
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

      const subscription =
        await subscriptionService.getOrCreateSubscription(userId);

      // ✅ FIX: Dodaj null-check dla subscription
      if (!subscription) {
        return reply.code(500).send({ error: "Failed to get subscription" });
      }

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
            priceAmount: 1900,
          },
          MEDIUM: {
            points: 150,
            price: process.env.STRIPE_PRICE_ID_MEDIUM!,
            priceAmount: 4900,
          },
          LARGE: {
            points: 300,
            price: process.env.STRIPE_PRICE_ID_LARGE!,
            priceAmount: 7900,
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
          mode: "payment",
          payment_method_types: ["card", "blik"],
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
