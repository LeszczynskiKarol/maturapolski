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

    // Jeśli nie udało się utworzyć/pobrać subskrypcji, zwróć false
    if (!subscription) {
      return false;
    }

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
    tokensUsed: { input: number; output: number },
  ): Promise<void> {
    const subscription = await this.getOrCreateSubscription(userId);

    if (!subscription) {
      throw new Error("SUBSCRIPTION_NOT_FOUND");
    }

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

  // ✅ POPRAWIONE: Pobierz lub utwórz subskrypcję (FREE domyślnie)
  async getOrCreateSubscription(userId: string) {
    try {
      // ✅ Najpierw sprawdź czy user istnieje
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });

      if (!userExists) {
        console.error(
          `❌ User ${userId} does not exist, cannot create subscription`,
        );
        return null;
      }

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
        console.log(`✅ Created new subscription for user ${userId}`);
      }

      return subscription;
    } catch (error) {
      console.error(
        `❌ Error in getOrCreateSubscription for user ${userId}:`,
        error,
      );
      return null;
    }
  }

  // Reset miesięcznych punktów
  async resetMonthlyPoints(userId: string): Promise<void> {
    const subscription = await this.getOrCreateSubscription(userId);

    if (!subscription) {
      console.error(`Cannot reset points - no subscription for user ${userId}`);
      return;
    }

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
    console.log("🛒 Creating checkout session for user:", userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) throw new Error("User not found");

    // ✅ Upewnij się że subskrypcja istnieje
    let subscription = user.subscription;
    if (!subscription) {
      subscription = await this.getOrCreateSubscription(userId);
      if (!subscription) {
        throw new Error("Failed to create subscription");
      }
    }

    let customerId = subscription?.stripeCustomerId;

    if (!customerId) {
      console.log("📝 Creating new Stripe customer...");
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;
      console.log("✅ Customer created:", customerId);

      await prisma.subscription.update({
        where: { userId },
        data: { stripeCustomerId: customerId },
      });
    }

    console.log("🎫 Creating checkout session with metadata:", {
      userId: user.id,
      email: user.email,
      customerId,
    });

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/subscription?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription`,
      metadata: {
        userId: user.id, // ⚠️ KLUCZOWE!
      },
    });

    console.log("✅ Checkout session created:", {
      id: session.id,
      url: session.url,
      metadata: session.metadata,
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

  async handleStripeWebhook(event: Stripe.Event): Promise<void> {
    console.log("🔔 Webhook received:", event.type, "ID:", event.id);

    // Sprawdź czy już przetworzono
    const existing = await prisma.stripeEvent.findUnique({
      where: { stripeEventId: event.id },
    });

    if (existing?.processed) {
      console.log("⚠️ Event already processed:", event.id);
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

    console.log("📝 Event saved to database:", event.id);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "payment") {
          const userId = session.metadata?.userId;
          const purchaseType = session.metadata?.purchaseType;

          if (!userId) break;

          // ✅ Upewnij się że subskrypcja istnieje
          await this.getOrCreateSubscription(userId);

          if (purchaseType === "MONTHLY_ACCESS") {
            const hasCancelledSub =
              session.metadata?.hasCancelledSub === "true";
            const newStartDate = session.metadata?.newStartDate
              ? new Date(session.metadata.newStartDate)
              : new Date();
            const newEndDate = session.metadata?.newEndDate
              ? new Date(session.metadata.newEndDate)
              : (() => {
                  const date = new Date();
                  date.setDate(date.getDate() + 30);
                  return date;
                })();

            const currentSub = await prisma.subscription.findUnique({
              where: { userId },
            });

            if (hasCancelledSub && currentSub?.cancelAt) {
              const existingMetadata =
                (currentSub.metadata as Record<string, any>) || {};

              await prisma.subscription.update({
                where: { userId },
                data: {
                  metadata: {
                    ...existingMetadata,
                    pendingOneTimeAccess: {
                      startDate: newStartDate.toISOString(),
                      endDate: newEndDate.toISOString(),
                      purchasedAt: new Date().toISOString(),
                      sessionId: session.id,
                    },
                  },
                },
              });

              console.log(
                `✅ Saved pending one-time access for user ${userId} starting ${newStartDate.toISOString()}`,
              );
            } else {
              await prisma.subscription.update({
                where: { userId },
                data: {
                  plan: "PREMIUM",
                  status: "ACTIVE",
                  isRecurring: false,
                  aiPointsLimit: 200,
                  startDate: newStartDate,
                  endDate: newEndDate,
                  metadata: {
                    lastPurchaseType: "MONTHLY_ACCESS",
                    purchasedAt: new Date().toISOString(),
                  },
                },
              });

              console.log(
                `✅ Activated 30-day access for user ${userId} until ${newEndDate.toISOString()}`,
              );
            }
          } else if (session.metadata?.pointsPackage) {
            const pointsAmount = parseInt(session.metadata.pointsAmount || "0");

            if (pointsAmount > 0) {
              const subscription = await prisma.subscription.findUnique({
                where: { userId },
              });

              if (subscription) {
                await prisma.subscription.update({
                  where: { id: subscription.id },
                  data: {
                    aiPointsLimit: { increment: pointsAmount },
                  },
                });

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
                  `✅ Added ${pointsAmount} points to user ${userId}`,
                );
              }
            }
          }
        } else if (session.mode === "subscription") {
          const userId = session.metadata?.userId;
          const subscriptionId = session.subscription as string;

          if (!userId || !subscriptionId) {
            console.error("❌ Missing userId or subscriptionId in session");
            break;
          }

          // ✅ Upewnij się że subskrypcja istnieje
          await this.getOrCreateSubscription(userId);

          const stripeSubscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          const upgradedFromOneTime =
            (stripeSubscription.metadata as any)?.upgradedFromOneTime ===
            "true";

          if (upgradedFromOneTime) {
            console.log(
              `🔄 User upgraded from one-time package, subscription has trial period`,
            );
            console.log(
              `Trial ends at: ${new Date(
                (stripeSubscription as any).trial_end * 1000,
              )}`,
            );

            await prisma.subscription.update({
              where: { userId },
              data: {
                stripeSubscriptionId: subscriptionId,
                metadata: {
                  pendingSubscription: {
                    stripeSubscriptionId: subscriptionId,
                    willActivateAt: new Date(
                      (stripeSubscription as any).trial_end * 1000,
                    ).toISOString(),
                    createdAt: new Date().toISOString(),
                  },
                },
              },
            });

            console.log(
              `✅ Pending subscription saved, will activate after trial period ends`,
            );
          } else {
            await prisma.subscription.update({
              where: { userId },
              data: {
                stripeSubscriptionId: subscriptionId,
                status: "ACTIVE",
                plan: "PREMIUM",
                isRecurring: true,
                aiPointsLimit: 200,
                aiPointsUsed: 0,
                aiPointsReset: new Date(),
                startDate: new Date(),
                endDate: null,
                metadata: {
                  lastPurchaseType: "SUBSCRIPTION",
                  purchasedAt: new Date().toISOString(),
                },
              },
            });

            console.log(
              `✅ Subscription activated immediately for user ${userId}: ${subscriptionId}`,
            );
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        console.log("❌ Processing subscription deletion...");
        await this.handleSubscriptionDeleted(subscription);

        const userId = subscription.metadata?.userId;
        if (userId) {
          const dbSub = await prisma.subscription.findUnique({
            where: { userId },
          });

          const metadata = dbSub?.metadata as any;
          const pendingAccess = metadata?.pendingOneTimeAccess;

          if (pendingAccess) {
            console.log(
              `🔄 Activating pending one-time access for user ${userId}`,
            );

            await prisma.subscription.update({
              where: { userId },
              data: {
                plan: "PREMIUM",
                status: "ACTIVE",
                isRecurring: false,
                aiPointsLimit: 200,
                aiPointsUsed: 0,
                aiPointsReset: new Date(),
                startDate: new Date(pendingAccess.startDate),
                endDate: new Date(pendingAccess.endDate),
                stripeSubscriptionId: null,
                cancelAt: null,
                canceledAt: null,
                metadata: {
                  lastPurchaseType: "MONTHLY_ACCESS",
                  activatedAt: new Date().toISOString(),
                  previouslyPendingAccess: pendingAccess,
                },
              },
            });

            console.log(
              `✅ Activated pending one-time access for user ${userId}`,
            );
          }
        }
        break;
      }

      case "customer.subscription.trial_will_end": {
        console.log("⏰ Trial period ending soon");
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const dbSubscription = await prisma.subscription.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (!dbSubscription) break;

        const metadata = dbSubscription.metadata as any;
        const hasPendingSubscription = metadata?.pendingSubscription;

        if (hasPendingSubscription) {
          console.log("🎉 Trial ended, activating subscription!");

          await prisma.subscription.update({
            where: { id: dbSubscription.id },
            data: {
              status: "ACTIVE",
              plan: "PREMIUM",
              isRecurring: true,
              aiPointsUsed: 0,
              aiPointsReset: new Date(),
              startDate: new Date(),
              endDate: null,
              metadata: {
                lastPurchaseType: "SUBSCRIPTION",
                activatedAt: new Date().toISOString(),
                previousPackage: metadata.pendingSubscription,
              },
            },
          });
        } else {
          await prisma.subscription.update({
            where: { id: dbSubscription.id },
            data: {
              aiPointsUsed: 0,
              aiPointsReset: new Date(),
              status: "ACTIVE",
            },
          });
        }

        console.log(
          `Payment succeeded, points reset for user ${dbSubscription.userId}`,
        );
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.created":
        console.log("🔄 Processing subscription update/create...");
        await this.handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "invoice.payment_failed":
        console.log("⚠️ Processing payment failure...");
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log("⏭️ Unhandled event type:", event.type);
    }

    // Oznacz jako przetworzone
    await prisma.stripeEvent.update({
      where: { stripeEventId: event.id },
      data: { processed: true },
    });

    console.log("✅ Event processed successfully:", event.id);
  }

  async handleSubscriptionUpdated(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    try {
      const userId = subscription.metadata?.userId;
      const customerId = subscription.customer as string;
      const { current_period_start, current_period_end } = subscription as any;

      if (!userId) {
        console.error("❌ No userId in subscription metadata");
        return;
      }

      console.log(`🔄 Updating subscription for user ${userId}`);
      console.log(`📝 Customer ID from Stripe: ${customerId}`);

      // ✅ Upewnij się że subskrypcja istnieje
      const existingSubscription = await this.getOrCreateSubscription(userId);
      if (!existingSubscription) {
        console.error(`❌ Could not create subscription for user ${userId}`);
        return;
      }

      const updateData: any = {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customerId,
        status: subscription.status === "active" ? "ACTIVE" : "INACTIVE",
        plan:
          subscription.status === "active"
            ? "PREMIUM"
            : existingSubscription.plan,
        isRecurring: true,
        aiPointsLimit: 200,
        startDate: current_period_start
          ? new Date(current_period_start * 1000)
          : new Date(),
        endDate: null,
        stripeCurrentPeriodEnd: current_period_end
          ? new Date(current_period_end * 1000)
          : null,
      };

      if (
        subscription.status === "active" &&
        existingSubscription.status !== "ACTIVE"
      ) {
        updateData.aiPointsUsed = 0;
        updateData.aiPointsReset = new Date();
      }

      await prisma.subscription.update({
        where: { userId },
        data: updateData,
      });

      console.log(
        `✅ Subscription updated for user ${userId} with customer ${customerId}`,
      );
    } catch (error) {
      console.error("❌ Error in handleSubscriptionUpdated:", error);
      throw error;
    }
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

    if (!subscription) {
      return {
        subscription: {
          plan: "FREE",
          status: "INACTIVE",
          aiPointsUsed: 0,
          aiPointsLimit: 20,
          percentUsed: 0,
          resetDate: new Date(),
        },
        usage: {
          totalCalls: 0,
          totalPoints: 0,
          byType: {
            SHORT_ANSWER: 0,
            SYNTHESIS_NOTE: 0,
            ESSAY: 0,
          },
        },
        recentUsage: [],
      };
    }

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
          (subscription.aiPointsUsed / subscription.aiPointsLimit) * 100,
        ),
        resetDate: subscription.aiPointsReset,
      },
      usage: stats,
      recentUsage: usage.slice(0, 10),
    };
  }
}

export const subscriptionService = new SubscriptionService();
