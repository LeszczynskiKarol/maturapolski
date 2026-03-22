// backend/src/services/emailPreferenceService.ts

import { prisma } from "../lib/prisma";
import crypto from "crypto";

export type EmailCategory =
  | "streakReminders"
  | "weeklySummary"
  | "reengagement"
  | "promotions"
  | "achievements"
  | "examCountdown"
  | "newContent";

export const EMAIL_CATEGORY_LABELS: Record<EmailCategory, string> = {
  streakReminders: "Przypomnienia o passie",
  weeklySummary: "Tygodniowe podsumowanie",
  reengagement: "Przypomnienia o nauce",
  promotions: "Oferty i promocje",
  achievements: "Osiągnięcia i poziomy",
  examCountdown: "Odliczanie do matury",
  newContent: "Nowe zadania w bazie",
};

export class EmailPreferenceService {
  /**
   * Pobierz lub utwórz preferencje email dla użytkownika
   */
  async getOrCreatePreference(userId: string) {
    const existing = await prisma.emailPreference.findUnique({
      where: { userId },
    });

    if (existing) return existing;

    return prisma.emailPreference.create({
      data: {
        userId,
        unsubscribeToken: crypto.randomBytes(32).toString("hex"),
      },
    });
  }

  /**
   * Sprawdź czy użytkownik chce otrzymywać dany typ maila
   */
  async canSendEmail(
    userId: string,
    category: EmailCategory,
  ): Promise<boolean> {
    const prefs = await this.getOrCreatePreference(userId);

    // Globalny opt-out
    if (!prefs.allEmails) return false;

    // Sprawdź konkretną kategorię
    return prefs[category] === true;
  }

  /**
   * Pobierz token do wypisania się dla danego usera
   */
  async getUnsubscribeToken(userId: string): Promise<string> {
    const prefs = await this.getOrCreatePreference(userId);
    return prefs.unsubscribeToken;
  }

  /**
   * Wypisz się z kategorii po tokenie (BEZ LOGOWANIA)
   */
  async unsubscribeByToken(
    token: string,
    category: EmailCategory | "all",
  ): Promise<{ success: boolean; message: string }> {
    const prefs = await prisma.emailPreference.findUnique({
      where: { unsubscribeToken: token },
      include: { user: { select: { email: true, username: true } } },
    });

    if (!prefs) {
      return { success: false, message: "Nieprawidłowy link do wypisania." };
    }

    if (category === "all") {
      await prisma.emailPreference.update({
        where: { unsubscribeToken: token },
        data: { allEmails: false },
      });
      return {
        success: true,
        message: `Wypisano z wszystkich emaili. Nie będziesz już otrzymywać wiadomości od MaturaPolski.pl.`,
      };
    }

    await prisma.emailPreference.update({
      where: { unsubscribeToken: token },
      data: { [category]: false },
    });

    return {
      success: true,
      message: `Wypisano z kategorii: ${EMAIL_CATEGORY_LABELS[category]}.`,
    };
  }

  /**
   * Przywróć subskrypcję po tokenie (BEZ LOGOWANIA)
   */
  async resubscribeByToken(
    token: string,
    category: EmailCategory | "all",
  ): Promise<{ success: boolean; message: string }> {
    const prefs = await prisma.emailPreference.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!prefs) {
      return { success: false, message: "Nieprawidłowy link." };
    }

    if (category === "all") {
      await prisma.emailPreference.update({
        where: { unsubscribeToken: token },
        data: {
          allEmails: true,
          streakReminders: true,
          weeklySummary: true,
          reengagement: true,
          promotions: true,
          achievements: true,
          examCountdown: true,
          newContent: true,
        },
      });
      return { success: true, message: "Przywrócono wszystkie powiadomienia email." };
    }

    await prisma.emailPreference.update({
      where: { unsubscribeToken: token },
      data: { [category]: true, allEmails: true },
    });

    return {
      success: true,
      message: `Przywrócono: ${EMAIL_CATEGORY_LABELS[category]}.`,
    };
  }

  /**
   * Pobierz preferencje po tokenie (do wyświetlenia strony zarządzania)
   */
  async getPreferencesByToken(token: string) {
    return prisma.emailPreference.findUnique({
      where: { unsubscribeToken: token },
      include: {
        user: { select: { email: true, username: true } },
      },
    });
  }

  /**
   * Zapisz zmiany preferencji po tokenie (formularz na stronie)
   */
  async updatePreferencesByToken(
    token: string,
    updates: Partial<Record<EmailCategory | "allEmails", boolean>>,
  ) {
    return prisma.emailPreference.update({
      where: { unsubscribeToken: token },
      data: updates,
    });
  }
}

export const emailPreferenceService = new EmailPreferenceService();
