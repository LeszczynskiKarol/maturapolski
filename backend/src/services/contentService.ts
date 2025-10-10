// backend/src/services/contentService.ts

import { prisma } from "../lib/prisma";
import { HubType, LiteraryEpoch } from "@prisma/client";

export class ContentService {
  // ==========================================
  // HUBY - Główne encje
  // ==========================================

  async getHubs({
    type,
    epoch,
    search,
    page = 1,
    limit = 20,
  }: {
    type?: HubType;
    epoch?: LiteraryEpoch;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = { isPublished: true };

    if (type) where.type = type;
    if (epoch) where.epoch = epoch;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ];
    }

    const [hubs, total] = await Promise.all([
      prisma.contentHub.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { title: "asc" },
        include: {
          _count: { select: { pages: true } },
        },
      }),
      prisma.contentHub.count({ where }),
    ]);

    return {
      hubs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getHub(slug: string) {
    const hub = await prisma.contentHub.findUnique({
      where: { slug, isPublished: true },
      include: {
        pages: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!hub) throw new Error("Hub not found");

    // Zwiększ views
    await prisma.contentHub.update({
      where: { id: hub.id },
      data: { views: { increment: 1 } },
    });

    return hub;
  }

  // ==========================================
  // STRONY - Podstrony HUB-ów
  // ==========================================

  async getPage(hubSlug: string, pageSlug: string) {
    // Najpierw znajdź hub
    const hub = await prisma.contentHub.findUnique({
      where: { slug: hubSlug, isPublished: true },
      select: {
        id: true,
        title: true,
        type: true,
        slug: true,
        author: true,
        description: true,
      },
    });

    if (!hub) throw new Error("Hub not found");

    // Potem znajdź stronę
    const page = await prisma.contentPage.findUnique({
      where: {
        hubId_slug: {
          hubId: hub.id,
          slug: pageSlug,
        },
        isPublished: true,
      },
      include: {
        hub: {
          select: {
            title: true,
            slug: true,
            type: true,
            author: true,
            epoch: true,
            description: true,
          },
        },
      },
    });

    if (!page) throw new Error("Page not found");

    // Zwiększ views
    await prisma.contentPage.update({
      where: { id: page.id },
      data: { views: { increment: 1 } },
    });

    return page;
  }

  // Wszystkie strony danego HUB-a
  async getHubPages(hubSlug: string) {
    const hub = await prisma.contentHub.findUnique({
      where: { slug: hubSlug, isPublished: true },
      select: { id: true },
    });

    if (!hub) throw new Error("Hub not found");

    return prisma.contentPage.findMany({
      where: {
        hubId: hub.id,
        isPublished: true,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        order: true,
        readingTime: true,
      },
    });
  }

  // ==========================================
  // OCENY (RATINGS)
  // ==========================================

  async submitRating(
    pageId: string,
    rating: number,
    ipAddress: string,
    userId?: string
  ) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    // Sprawdź czy strona istnieje
    const page = await prisma.contentPage.findUnique({
      where: { id: pageId },
    });

    if (!page) throw new Error("Page not found");

    // POPRAWIONA LOGIKA - rozdziel zalogowanych od niezalogowanych
    let existingRating;

    if (userId) {
      // Użytkownik zalogowany - sprawdź tylko userId
      existingRating = await prisma.pageRating.findFirst({
        where: {
          pageId,
          userId: userId,
        },
      });
    } else {
      // Użytkownik niezalogowany - sprawdź tylko IP
      existingRating = await prisma.pageRating.findFirst({
        where: {
          pageId,
          userId: null, // WAŻNE: tylko oceny anonimowe
          ipAddress: ipAddress,
        },
      });
    }

    if (existingRating) {
      // Aktualizuj istniejącą ocenę
      await prisma.pageRating.update({
        where: { id: existingRating.id },
        data: { rating },
      });
    } else {
      // Dodaj nową ocenę
      await prisma.pageRating.create({
        data: {
          pageId,
          rating,
          userId: userId || null,
          ipAddress,
        },
      });
    }

    // Przelicz średnią
    await this.recalculatePageRating(pageId);

    return { success: true };
  }

  async recalculatePageRating(pageId: string) {
    const ratings = await prisma.pageRating.findMany({
      where: { pageId },
      select: { rating: true },
    });

    const count = ratings.length;
    const average =
      count > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / count : 0;

    await prisma.contentPage.update({
      where: { id: pageId },
      data: {
        averageRating: average,
        ratingsCount: count,
      },
    });

    return { average, count };
  }

  async getPageRating(pageId: string) {
    const page = await prisma.contentPage.findUnique({
      where: { id: pageId },
      select: {
        averageRating: true,
        ratingsCount: true,
      },
    });

    return page || { averageRating: 0, ratingsCount: 0 };
  }

  // ==========================================
  // ADMIN - Tworzenie i edycja
  // ==========================================

  async createHub(data: any) {
    const slug = this.generateSlug(data.title);

    return prisma.contentHub.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async updateHub(id: string, data: any) {
    return prisma.contentHub.update({
      where: { id },
      data,
    });
  }

  async deleteHub(id: string) {
    // Usunie też wszystkie powiązane strony (Cascade)
    return prisma.contentHub.delete({
      where: { id },
    });
  }

  async createPage(hubId: string, data: any) {
    const slug = this.generateSlug(data.title);

    // Sprawdź czy hub istnieje
    const hub = await prisma.contentHub.findUnique({
      where: { id: hubId },
    });

    if (!hub) throw new Error("Hub not found");

    return prisma.contentPage.create({
      data: {
        ...data,
        hubId,
        slug,
      },
    });
  }

  async updatePage(id: string, data: any) {
    return prisma.contentPage.update({
      where: { id },
      data,
    });
  }

  async deletePage(id: string) {
    return prisma.contentPage.delete({
      where: { id },
    });
  }

  async reorderPages(hubId: string, pageIds: string[]) {
    // Sprawdź czy hub istnieje
    const hub = await prisma.contentHub.findUnique({
      where: { id: hubId },
    });

    if (!hub) throw new Error("Hub not found");

    // Sprawdź czy wszystkie strony należą do tego huba
    const pages = await prisma.contentPage.findMany({
      where: {
        id: { in: pageIds },
        hubId: hubId,
      },
    });

    if (pages.length !== pageIds.length) {
      throw new Error("Some pages do not belong to this hub");
    }

    // Aktualizuj kolejność
    const updates = pageIds.map((pageId, index) =>
      prisma.contentPage.update({
        where: { id: pageId },
        data: { order: index },
      })
    );

    await Promise.all(updates);
  }

  // ==========================================
  // HELPERS
  // ==========================================

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, (match) => {
        const map: any = {
          ą: "a",
          ć: "c",
          ę: "e",
          ł: "l",
          ń: "n",
          ó: "o",
          ś: "s",
          ź: "z",
          ż: "z",
        };
        return map[match];
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  // ==========================================
  // ADMIN - Zarządzanie ocenami
  // ==========================================

  async getPageRatingsDetailed(pageId: string) {
    const page = await prisma.contentPage.findUnique({
      where: { id: pageId },
      select: {
        id: true,
        title: true,
        averageRating: true,
        ratingsCount: true,
      },
    });

    if (!page) throw new Error("Page not found");

    // Pobierz wszystkie ratings
    const ratings = await prisma.pageRating.findMany({
      where: { pageId },
      orderBy: { createdAt: "desc" },
    });

    // Zbierz unikalne userId (pomijając null)
    const userIds = [
      ...new Set(
        ratings.map((r) => r.userId).filter((id): id is string => id !== null)
      ),
    ];

    // Pobierz wszystkich userów jednym zapytaniem
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // Stwórz mapę userId -> user
    const userMap = new Map(users.map((u) => [u.id, u]));

    // Połącz dane
    const ratingsWithUser = ratings.map((rating) => ({
      id: rating.id,
      rating: rating.rating,
      userId: rating.userId,
      ipAddress: rating.ipAddress,
      createdAt: rating.createdAt,
      user: rating.userId ? userMap.get(rating.userId) || null : null,
    }));

    return {
      page,
      ratings: ratingsWithUser,
    };
  }

  async deleteRating(ratingId: string) {
    const rating = await prisma.pageRating.findUnique({
      where: { id: ratingId },
    });

    if (!rating) throw new Error("Rating not found");

    await prisma.pageRating.delete({
      where: { id: ratingId },
    });

    // Przelicz średnią po usunięciu
    await this.recalculatePageRating(rating.pageId);

    return { success: true };
  }
}
