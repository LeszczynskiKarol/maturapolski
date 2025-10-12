// backend/src/jobs/subscriptionExpirationJob.ts

import { prisma } from "../lib/prisma";
import { EmailService } from "../services/emailService";
import cron from "node-cron";

const emailService = new EmailService();

export function startSubscriptionExpirationJob() {
  // Uruchamiaj codziennie o 10:00
  cron.schedule("0 10 * * *", async () => {
    console.log("🔍 Checking for expiring subscriptions...");

    try {
      const now = new Date();

      // Znajdź subskrypcje jednorazowe
      const subscriptions = await prisma.subscription.findMany({
        where: {
          plan: "PREMIUM",
          isRecurring: false,
          endDate: {
            not: null,
          },
          status: "ACTIVE",
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });

      let sent7Day = 0;
      let sent1Day = 0;
      let sentExpired = 0;

      for (const subscription of subscriptions) {
        if (!subscription.endDate) continue;

        const endDate = new Date(subscription.endDate);
        const daysUntilExpiration = Math.ceil(
          (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        const metadata = (subscription.metadata as any) || {};

        // 7 dni przed wygaśnięciem
        if (daysUntilExpiration === 7 && !metadata.sent7DayWarning) {
          await emailService.sendExpirationWarning7Days(
            subscription.user.email,
            subscription.user.username,
            endDate
          );

          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              metadata: {
                ...metadata,
                sent7DayWarning: true,
                sent7DayWarningAt: new Date().toISOString(),
              },
            },
          });

          sent7Day++;
          console.log(`📧 Sent 7-day warning to ${subscription.user.email}`);
        }

        // 1 dzień przed wygaśnięciem
        if (daysUntilExpiration === 1 && !metadata.sent1DayWarning) {
          await emailService.sendExpirationWarning1Day(
            subscription.user.email,
            subscription.user.username,
            endDate
          );

          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              metadata: {
                ...metadata,
                sent1DayWarning: true,
                sent1DayWarningAt: new Date().toISOString(),
              },
            },
          });

          sent1Day++;
          console.log(`📧 Sent 1-day warning to ${subscription.user.email}`);
        }

        // Wygasło dzisiaj
        if (daysUntilExpiration <= 0 && !metadata.sentExpirationNotice) {
          // Przełącz na FREE
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              plan: "FREE",
              status: "INACTIVE",
              aiPointsLimit: 20,
              aiPointsUsed: 0, // ✅ DODAJ - zresetuj punkty
              metadata: {
                ...metadata,
                sentExpirationNotice: true,
                expiredAt: new Date().toISOString(),
              },
            },
          });

          await emailService.sendExpirationNotice(
            subscription.user.email,
            subscription.user.username
          );

          // Sprawdź czy była zaplanowana subskrypcja
          if (metadata.pendingSubscription) {
            console.log(
              `⏰ User ${subscription.userId} has pending subscription scheduled`
            );
            // Tutaj możesz dodać powiadomienie dla admina lub użytkownika
            // że mają zaplanowaną subskrypcję do ręcznej aktywacji
          }

          sentExpired++;
          console.log(
            `📧 Sent expiration notice to ${subscription.user.email}`
          );
        }
      }

      console.log(
        `✅ Expiration check complete: ${sent7Day} 7-day warnings, ${sent1Day} 1-day warnings, ${sentExpired} expiration notices`
      );
    } catch (error) {
      console.error("❌ Error in subscription expiration job:", error);
    }
  });

  console.log("✅ Subscription expiration job scheduled (daily at 10:00)");
}
