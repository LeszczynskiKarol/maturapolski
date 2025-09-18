// backend/src/services/materialService.ts

import { prisma } from "../lib/prisma";
import { MaterialType, MaterialCategory, LiteraryEpoch } from "@prisma/client";

export class MaterialService {
  // Publiczne metody - dostępne dla wszystkich
  async getMaterials({
    category,
    epoch,
    workId,
    type,
    isPremium = false,
    search,
    page = 1,
    limit = 20,
  }: {
    category?: MaterialCategory;
    epoch?: LiteraryEpoch;
    workId?: string;
    type?: MaterialType;
    isPremium?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {
      isPublished: true,
    };

    if (category) where.category = category;
    if (epoch) where.epoch = epoch;
    if (workId) where.workId = workId;
    if (type) where.type = type;
    if (!isPremium) where.isPremium = false;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    const [materials, total] = await Promise.all([
      prisma.material.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { views: "desc" },
        include: {
          work: {
            select: { title: true, author: true },
          },
        },
      }),
      prisma.material.count({ where }),
    ]);

    return {
      materials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getMaterialBySlug(slug: string, userId?: string) {
    const material = await prisma.material.findUnique({
      where: { slug, isPublished: true },
      include: {
        work: {
          include: {
            chapters: true,
            characters: { take: 5 },
            quotes: { take: 10 },
          },
        },
      },
    });

    if (!material) {
      throw new Error("Material not found");
    }

    // Zwiększ licznik wyświetleń
    await prisma.material.update({
      where: { id: material.id },
      data: { views: { increment: 1 } },
    });

    // Jeśli użytkownik zalogowany, zapisz postęp
    if (userId) {
      await prisma.userMaterialProgress.upsert({
        where: {
          userId_materialId: {
            userId,
            materialId: material.id,
          },
        },
        update: { lastAccessed: new Date() },
        create: {
          userId,
          materialId: material.id,
        },
      });
    }

    return material;
  }

  // Lektury
  async getLiteraryWorks({
    epoch,
    isRequired,
    search,
  }: {
    epoch?: LiteraryEpoch;
    isRequired?: boolean;
    search?: string;
  }) {
    const where: any = {};

    if (epoch) where.epoch = epoch;
    if (isRequired !== undefined) where.isRequired = isRequired;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.literaryWork.findMany({
      where,
      include: {
        _count: {
          select: {
            chapters: true,
            characters: true,
            quotes: true,
            analyses: true,
          },
        },
      },
      orderBy: { title: "asc" },
    });
  }

  async getLiteraryWork(id: string) {
    return prisma.literaryWork.findUnique({
      where: { id },
      include: {
        chapters: { orderBy: { number: "asc" } },
        characters: { orderBy: { role: "asc" } },
        quotes: true,
        analyses: true,
        materials: {
          where: { isPublished: true },
        },
      },
    });
  }

  // Epoki
  async getEpochs() {
    return prisma.epochInfo.findMany({
      orderBy: { period: "asc" },
    });
  }

  async getEpoch(epoch: LiteraryEpoch) {
    const epochInfo = await prisma.epochInfo.findUnique({
      where: { epoch },
    });

    const works = await prisma.literaryWork.findMany({
      where: { epoch },
      select: {
        id: true,
        title: true,
        author: true,
        year: true,
        isRequired: true,
      },
    });

    const materials = await prisma.material.findMany({
      where: {
        epoch,
        isPublished: true,
        isPremium: false,
      },
      take: 10,
    });

    return {
      ...epochInfo,
      works,
      materials,
    };
  }

  // Terminy literackie
  async getTerms(category?: string) {
    return prisma.literaryTerm.findMany({
      where: category ? { category } : undefined,
      orderBy: { term: "asc" },
    });
  }

  // Cytaty
  async getQuotes({
    workId,
    tags,
    search,
    random = false,
    limit = 20,
  }: {
    workId?: string;
    tags?: string[];
    search?: string;
    random?: boolean;
    limit?: number;
  }) {
    const where: any = {};

    if (workId) where.workId = workId;
    if (tags && tags.length) {
      where.tags = { hasSome: tags };
    }
    if (search) {
      where.text = { contains: search, mode: "insensitive" };
    }

    const quotes = await prisma.quote.findMany({
      where,
      take: limit,
      include: {
        work: {
          select: { title: true, author: true },
        },
      },
      orderBy: random ? { createdAt: "desc" } : undefined,
    });

    // Jeśli random, przemieszaj wyniki
    if (random) {
      return quotes.sort(() => Math.random() - 0.5);
    }

    return quotes;
  }

  // Progress tracking dla zalogowanych
  async getUserProgress(userId: string) {
    const progress = await prisma.userMaterialProgress.findMany({
      where: { userId },
      include: {
        material: {
          select: {
            title: true,
            category: true,
            epoch: true,
          },
        },
      },
      orderBy: { lastAccessed: "desc" },
      take: 20,
    });

    const stats = await prisma.userMaterialProgress.aggregate({
      where: { userId },
      _count: { _all: true },
      _avg: { progress: true },
    });

    return { progress, stats };
  }

  // Admin methods
  async createMaterial(data: any) {
    const slug = this.generateSlug(data.title);

    // Upewnij się że wszystkie pola są przekazywane
    const materialData = {
      title: data.title,
      slug,
      type: data.type,
      category: data.category,
      content: data.content,
      summary: data.summary || "",
      epoch: data.epoch || null,
      workId: data.workId || null,
      tags: data.tags || [],
      difficulty: data.difficulty || 1,
      readingTime: data.readingTime || null,
      isPremium: data.isPremium || false,
      isPublished: data.isPublished || false,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      publishedAt: data.isPublished ? new Date() : null,
    };

    return prisma.material.create({
      data: materialData,
    });
  }

  async updateMaterial(id: string, data: any) {
    return prisma.material.update({
      where: { id },
      data: {
        ...data,
        publishedAt:
          data.isPublished && !data.publishedAt ? new Date() : data.publishedAt,
      },
    });
  }

  async deleteMaterial(id: string) {
    return prisma.material.delete({
      where: { id },
    });
  }

  async createLiteraryWork(data: any) {
    return prisma.literaryWork.create({
      data,
    });
  }

  async updateLiteraryWork(id: string, data: any) {
    return prisma.literaryWork.update({
      where: { id },
      data,
    });
  }

  async createChapter(workId: string, data: any) {
    return prisma.chapter.create({
      data: {
        ...data,
        workId,
      },
    });
  }

  async createCharacter(workId: string, data: any) {
    return prisma.character.create({
      data: {
        ...data,
        workId,
      },
    });
  }

  async createQuote(workId: string, data: any) {
    return prisma.quote.create({
      data: {
        ...data,
        workId,
      },
    });
  }

  async bulkImportMaterials(materials: any[]) {
    const results = [];

    for (const material of materials) {
      try {
        const slug = this.generateSlug(material.title);
        const created = await prisma.material.create({
          data: {
            ...material,
            slug,
            publishedAt: material.isPublished ? new Date() : null,
          },
        });
        results.push({ success: true, id: created.id });
      } catch (error) {
        // Poprawka - rzutowanie error na Error
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        results.push({ success: false, error: errorMessage });
      }
    }

    return results;
  }

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
