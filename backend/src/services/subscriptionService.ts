// backend/src/services/subscriptionService.ts

import { prisma } from "../lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export class SubscriptionService {
  // Sprawdź czy user ma dostępne punkty AI
  async hasAiPoints(userId: string, pointsNeeded: number): Promise<boolean> {
    const subscription = await this.getOrCreateSubscription(userId);

    // Sprawdź czy subskrypcja aktywna
    if (subscription.status !== "ACTIVE") {
      return (
        subscription.aiPointsUsed + pointsNeeded <= subscription.aiPointsLimit
      );
    }

    // Sprawdź czy nie minął miesiąc (auto-reset)
    const now = new Date();
    const resetDate = new Date(subscription.aiPointsReset);
    const monthPassed =
      now.getTime() - resetDate.getTime() > 30 * 24 * 60 * 60 * 1000;

    if (monthPassed && subscription.status === "ACTIVE") {
      await this.resetMonthlyPoints(userId);
      return true; // Po resecie zawsze mają pełen limit
    }

    return (
      subscription.aiPointsUsed + pointsNeeded <= subscription.aiPointsLimit
    );
  }

  // Użyj punkty AI
  async useAiPoints(
    userId: string,
    exerciseId: string,
    exerciseType: string,
    pointsCost: number,
    tokensUsed: { input: number; output: number }
  ): Promise<void> {
    const subscription = await this.getOrCreateSubscription(userId);

    // Sprawdź limit
    if (subscription.aiPointsUsed + pointsCost > subscription.aiPointsLimit) {
      throw new Error("AI_POINTS_EXCEEDED");
    }

    // Zapisz użycie
    await prisma.$transaction([
      prisma.aiUsage.create({
        data: {
          userId,
          subscriptionId: subscription.id,
          exerciseId,
          exerciseType: exerciseType as any,
          pointsCost,
          tokensUsed,
          success: true,
        },
      }),
      prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          aiPointsUsed: { increment: pointsCost },
        },
      }),
    ]);
  }

  // Pobierz lub utwórz subskrypcję (FREE domyślnie)
  async getOrCreateSubscription(userId: string) {
    let subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      subscription = await prisma.subscription.create({
        data: {
          userId,
          status: "INACTIVE",
          plan: "FREE",
          aiPointsLimit: 20,
          aiPointsUsed: 0,
          aiPointsReset: new Date(),
        },
      });
    }

    return subscription;
  }

  // Reset miesięcznych punktów
  async resetMonthlyPoints(userId: string): Promise<void> {
    const subscription = await this.getOrCreateSubscription(userId);

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        aiPointsUsed: 0,
        aiPointsReset: new Date(),
      },
    });

    console.log(`Reset AI points for user ${userId}`);
  }

  // Utwórz Stripe Checkout Session
  async createCheckoutSession(userId: string, priceId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) throw new Error("User not found");

    // Utwórz lub pobierz Stripe Customer
    let customerId = user.subscription?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      // Zapisz w bazie
      await prisma.subscription.update({
        where: { userId },
        data: { stripeCustomerId: customerId },
      });
    }

    // Utwórz Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"], // ⚠️ TYLKO KARTY dla subskrypcji!
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription`,
      metadata: {
        userId: user.id,
      },
    });

    return { sessionId: session.id, url: session.url };
  }

  // Anuluj subskrypcję
  async cancelSubscription(userId: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription?.stripeSubscriptionId) {
      throw new Error("No active subscription");
    }

    // Anuluj w Stripe (na koniec okresu)
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Zapisz w bazie
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAt: subscription.stripeCurrentPeriodEnd || new Date(),
      },
    });
  }

  // Wznów subskrypcję
  async resumeSubscription(userId: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription?.stripeSubscriptionId) {
      throw new Error("No subscription to resume");
    }

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAt: null,
      },
    });
  }

  // Webhook handler - aktualizuj status po płatności
  async handleStripeWebhook(event: Stripe.Event): Promise<void> {
    // Sprawdź czy już przetworzono
    const existing = await prisma.stripeEvent.findUnique({
      where: { stripeEventId: event.id },
    });

    if (existing?.processed) {
      console.log("Event already processed:", event.id);
      return;
    }

    // Zapisz event
    await prisma.stripeEvent.upsert({
      where: { stripeEventId: event.id },
      create: {
        stripeEventId: event.id,
        type: event.type,
        data: event.data as any,
        processed: false,
      },
      update: {},
    });

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        // Sprawdź czy to zakup subskrypcji czy punktów
        if (session.mode === "payment") {
          await this.handlePointsPurchaseCompleted(session);
        } else if (session.mode === "subscription") {
          await this.handleCheckoutCompleted(session);
        }
        break;

      case "customer.subscription.updated":
      case "customer.subscription.created":
        await this.handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;

      case "customer.subscription.deleted":
        await this.handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;

      case "invoice.payment_succeeded":
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }

    // Oznacz jako przetworzone
    await prisma.stripeEvent.update({
      where: { stripeEventId: event.id },
      data: { processed: true },
    });
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    if (!userId) return;

    const subscriptionId = session.subscription as string;

    await prisma.subscription.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        status: "ACTIVE",
        plan: "PREMIUM",
        aiPointsLimit: 300,
        aiPointsUsed: 0,
        aiPointsReset: new Date(),
        startDate: new Date(),
      },
    });

    console.log(`Subscription activated for user ${userId}`);
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;

    const dbSubscription = await prisma.subscription.findUnique({
      where: { stripeCustomerId: customerId },
    });

    if (!dbSubscription) return;

    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        status: subscription.status === "active" ? "ACTIVE" : "INACTIVE",
        stripeCurrentPeriodEnd: (subscription as any).current_period_end
          ? new Date((subscription as any).current_period_end * 1000)
          : null,
        cancelAt: (subscription as any).cancel_at
          ? new Date((subscription as any).cancel_at * 1000)
          : null,
      },
    });
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;

    const dbSubscription = await prisma.subscription.findUnique({
      where: { stripeCustomerId: customerId },
    });

    if (!dbSubscription) return;

    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        status: "CANCELED",
        plan: "FREE",
        aiPointsLimit: 20,
        aiPointsUsed: 0,
        canceledAt: new Date(),
        endDate: new Date(),
      },
    });
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    const customerId = invoice.customer as string;

    const dbSubscription = await prisma.subscription.findUnique({
      where: { stripeCustomerId: customerId },
    });

    if (!dbSubscription) return;

    // Reset punktów na nowy miesiąc
    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        aiPointsUsed: 0,
        aiPointsReset: new Date(),
        status: "ACTIVE",
      },
    });

    console.log(
      `Payment succeeded, points reset for user ${dbSubscription.userId}`
    );
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const customerId = invoice.customer as string;

    const dbSubscription = await prisma.subscription.findUnique({
      where: { stripeCustomerId: customerId },
    });

    if (!dbSubscription) return;

    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        status: "PAST_DUE",
      },
    });
  }

  // Statystyki użycia AI
  async getAiUsageStats(userId: string) {
    const subscription = await this.getOrCreateSubscription(userId);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const usage = await prisma.aiUsage.findMany({
      where: {
        userId,
        createdAt: { gte: thisMonth },
      },
      orderBy: { createdAt: "desc" },
    });

    const stats = {
      totalCalls: usage.length,
      totalPoints: usage.reduce((sum, u) => sum + u.pointsCost, 0),
      byType: {
        SHORT_ANSWER: usage.filter((u) => u.exerciseType === "SHORT_ANSWER")
          .length,
        SYNTHESIS_NOTE: usage.filter((u) => u.exerciseType === "SYNTHESIS_NOTE")
          .length,
        ESSAY: usage.filter((u) => u.exerciseType === "ESSAY").length,
      },
    };

    return {
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        aiPointsUsed: subscription.aiPointsUsed,
        aiPointsLimit: subscription.aiPointsLimit,
        percentUsed: Math.round(
          (subscription.aiPointsUsed / subscription.aiPointsLimit) * 100
        ),
        resetDate: subscription.aiPointsReset,
      },
      usage: stats,
      recentUsage: usage.slice(0, 10),
    };
  }
  private async handlePointsPurchaseCompleted(
    session: Stripe.Checkout.Session
  ) {
    const userId = session.metadata?.userId;
    const pointsAmount = parseInt(session.metadata?.pointsAmount || "0");

    if (!userId || !pointsAmount) {
      console.error("Missing userId or pointsAmount in session metadata");
      return;
    }

    // Pobierz subskrypcję
    const subscription = await this.getOrCreateSubscription(userId);

    // DODAJ punkty do limitu (nie resetuj używanych!)
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        aiPointsLimit: { increment: pointsAmount },
      },
    });

    // Opcjonalnie: zapisz historię zakupu
    await prisma.pointsPurchase.create({
      data: {
        userId,
        subscriptionId: subscription.id,
        pointsAmount,
        stripeSessionId: session.id,
        amountPaid: session.amount_total || 0,
      },
    });

    console.log(
      `Added ${pointsAmount} AI points to user ${userId}. New limit: ${
        subscription.aiPointsLimit + pointsAmount
      }`
    );
  }
}

export const subscriptionService = new SubscriptionService();
