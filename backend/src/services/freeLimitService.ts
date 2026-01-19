// backend/src/services/freeLimitService.ts

import { prisma } from "../lib/prisma";

const FREE_DAILY_LIMIT = 5;
const ALLOWED_FREE_TYPES = ["CLOSED_SINGLE", "CLOSED_MULTIPLE"];

// Duża liczba zamiast Infinity (JSON nie obsługuje Infinity)
const UNLIMITED = 999999;

export class FreeLimitService {
  /**
   * Pobiera pełny status limitu dla użytkownika
   * Używane w learning.routes.ts
   */
  async getFullStatus(userId: string): Promise<{
    isPremium: boolean;
    canSolve: boolean;
    used: number;
    remaining: number;
    limit: number;
    allowedTypes: string[];
    resetAt: string; // ISO string zamiast Date
    message?: string;
  }> {
    try {
      // Sprawdź subskrypcję
      const subscription = await prisma.subscription.findUnique({
        where: { userId },
      });

      let isPremium =
        subscription?.status === "ACTIVE" && subscription?.plan === "PREMIUM";

      // Dla jednorazowych płatności sprawdź datę wygaśnięcia
      if (isPremium && !subscription?.isRecurring && subscription?.endDate) {
        const now = new Date();
        if (subscription.endDate < now) {
          isPremium = false; // Wygasło
        }
      }

      // Oblicz czas resetu (północ następnego dnia)
      const resetAt = new Date();
      resetAt.setHours(24, 0, 0, 0);
      const resetAtString = resetAt.toISOString();

      // Premium = brak limitów
      if (isPremium) {
        return {
          isPremium: true,
          canSolve: true,
          used: 0,
          remaining: UNLIMITED,
          limit: UNLIMITED,
          allowedTypes: [
            "CLOSED_SINGLE",
            "CLOSED_MULTIPLE",
            "SHORT_ANSWER",
            "SYNTHESIS_NOTE",
            "ESSAY",
          ],
          resetAt: resetAtString,
        };
      }

      // FREE user - policz dzisiejsze użycie
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Liczymy submissions z dzisiaj
      const todayCount = await prisma.submission.count({
        where: {
          userId,
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      const used = todayCount;
      const remaining = Math.max(0, FREE_DAILY_LIMIT - used);
      const canSolve = remaining > 0;

      return {
        isPremium: false,
        canSolve,
        used,
        remaining,
        limit: FREE_DAILY_LIMIT,
        allowedTypes: ALLOWED_FREE_TYPES,
        resetAt: resetAtString,
        message: canSolve
          ? `Pozostało ${remaining} z ${FREE_DAILY_LIMIT} darmowych pytań na dziś`
          : `Wykorzystałeś dzienny limit ${FREE_DAILY_LIMIT} pytań. Wykup Premium aby kontynuować!`,
      };
    } catch (error) {
      console.error("Error in getFullStatus:", error);

      // Zwróć domyślny status w razie błędu (pozwól kontynuować)
      const resetAt = new Date();
      resetAt.setHours(24, 0, 0, 0);

      return {
        isPremium: false,
        canSolve: true,
        used: 0,
        remaining: FREE_DAILY_LIMIT,
        limit: FREE_DAILY_LIMIT,
        allowedTypes: ALLOWED_FREE_TYPES,
        resetAt: resetAt.toISOString(),
        message: "Nie udało się pobrać statusu limitu",
      };
    }
  }

  /**
   * Sprawdza czy dany typ jest dozwolony dla FREE
   */
  isTypeAllowedForFree(exerciseType: string): boolean {
    return ALLOWED_FREE_TYPES.includes(exerciseType);
  }

  /**
   * Zwraca dozwolone typy dla FREE
   */
  getAllowedTypes(): string[] {
    return ALLOWED_FREE_TYPES;
  }

  /**
   * Zwraca dzienny limit
   */
  getDailyLimit(): number {
    return FREE_DAILY_LIMIT;
  }
}

export const freeLimitService = new FreeLimitService();
