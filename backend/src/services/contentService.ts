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
      select: { id: true, title: true, type: true },
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
    });
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

  // Zmiana kolejności stron
  async reorderPages(hubId: string, pageIds: string[]) {
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
}
