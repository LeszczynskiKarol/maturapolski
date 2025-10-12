// backend/src/middleware/checkPremiumAccess.ts
import { prisma } from "../lib/prisma";

export async function checkPremiumAccess(userId: string): Promise<boolean> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) return false;

  // Sprawdź status
  if (subscription.status !== "ACTIVE") return false;
  if (subscription.plan !== "PREMIUM") return false;

  // ✅ DODAJ: Sprawdź datę wygaśnięcia dla jednorazowych płatności
  if (!subscription.isRecurring && subscription.endDate) {
    const now = new Date();
    if (subscription.endDate < now) {
      // Wygasło - automatycznie dezaktywuj
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: "INACTIVE",
          plan: "FREE",
          aiPointsLimit: 20,
        },
      });
      return false;
    }
  }

  return true;
}
