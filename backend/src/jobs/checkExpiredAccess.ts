// backend/src/jobs/checkExpiredAccess.ts

import { prisma } from "../lib/prisma";

export async function checkExpiredAccess() {
  console.log("🔍 Checking for expired monthly access...");

  const now = new Date();

  // Znajdź wszystkie wygasłe jednorazowe płatności
  const expiredSubscriptions = await prisma.subscription.findMany({
    where: {
      status: "ACTIVE",
      plan: "PREMIUM",
      isRecurring: false, // Tylko jednorazowe płatności
      endDate: {
        lt: now, // endDate < teraz
      },
    },
  });

  console.log(`Found ${expiredSubscriptions.length} expired subscriptions`);

  // Dezaktywuj je
  for (const sub of expiredSubscriptions) {
    await prisma.subscription.update({
      where: { id: sub.id },
      data: {
        status: "INACTIVE",
        plan: "FREE",
        aiPointsLimit: 20,
        aiPointsUsed: 0,
      },
    });

    console.log(`✅ Deactivated subscription for user ${sub.userId}`);

    // Opcjonalnie: wyślij powiadomienie
    await prisma.notification.create({
      data: {
        userId: sub.userId,
        type: "SUBSCRIPTION_EXPIRED",
        title: "Twój dostęp Premium wygasł",
        message:
          "Twój 30-dniowy dostęp Premium dobiegł końca. Wykup kolejny miesiąc lub przejdź na subskrypcję.",
        actionUrl: "/subscription",
      },
    });
  }

  return expiredSubscriptions.length;
}
