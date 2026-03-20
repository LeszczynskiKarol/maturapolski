// backend/src/services/testLandingService.ts

import { prisma } from "../lib/prisma";

export class TestLandingService {
  // Lista wszystkich testów (footer + strona /test)
  async getTestLandings({ limit = 100 }: { limit?: number } = {}) {
    const landings = await prisma.testLanding.findMany({
      where: { isPublished: true },
      orderBy: [{ isRequired: "desc" }, { title: "asc" }],
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        work: true,
        author: true,
        isRequired: true,
      },
    });

    // Dodaj liczbę pytań dla każdego
    const works = landings.map((l) => l.work);
    const counts = await prisma.exercise.groupBy({
      by: ["work"],
      where: { work: { in: works } },
      _count: { id: true },
    });

    const countMap = new Map(counts.map((c) => [c.work, c._count.id]));

    return landings.map((l) => ({
      ...l,
      exerciseCount: countMap.get(l.work) || 0,
    }));
  }

  async ensureLandingExists(work: string): Promise<void> {
    if (!work || work.trim() === "") return;

    const existing = await prisma.testLanding.findFirst({ where: { work } });
    if (existing) return;

    const exerciseCount = await prisma.exercise.count({ where: { work } });
    if (exerciseCount < 50) return; // ← PRÓG 50 PYTAŃ

    // Wzbogać danymi z ContentHub jeśli dostępne
    const hub = await prisma.contentHub.findFirst({
      where: { title: work, type: "LITERARY_WORK", isPublished: true },
      select: {
        author: true,
        epoch: true,
        isRequired: true,
        description: true,
        imageUrl: true,
      },
    });

    const slug = this.generateSlug(work);

    // Sprawdź unikalność sluga
    const slugExists = await prisma.testLanding.findUnique({
      where: { slug },
    });

    const finalSlug = slugExists ? `${slug}-test` : slug;

    try {
      await prisma.testLanding.create({
        data: {
          slug: finalSlug,
          work,
          title: work,
          author: hub?.author || null,
          epoch: hub?.epoch || null,
          isRequired: hub?.isRequired || false,
          description: hub?.description || null,
          imageUrl: hub?.imageUrl || null,
          metaTitle: `Test z lektury: ${work} | MaturaPolski.pl`,
          metaDescription: `Sprawdź swoją wiedzę z "${work}" - ${exerciseCount} pytań testowych. Przygotuj się do matury z polskiego!`,
        },
      });
      console.log(
        `✅ Auto-created TestLanding for "${work}" → /test/${finalSlug}`,
      );
    } catch (err: any) {
      // Unique constraint violation = ktoś inny zdążył pierwszy (race condition)
      if (err.code === "P2002") {
        console.log(
          `TestLanding for "${work}" already exists (race condition)`,
        );
        return;
      }
      console.error(
        `❌ Failed to auto-create TestLanding for "${work}":`,
        err.message,
      );
    }
  }

  // Pojedynczy test landing page
  async getTestLanding(slug: string) {
    const landing = await prisma.testLanding.findUnique({
      where: { slug, isPublished: true },
    });

    if (!landing) throw new Error("Test not found");

    // Zwiększ views
    await prisma.testLanding.update({
      where: { id: landing.id },
      data: { views: { increment: 1 } },
    });

    // Liczba pytań
    const exerciseCount = await prisma.exercise.count({
      where: { work: landing.work },
    });

    // Rozkład trudności
    const difficultyBreakdown = await prisma.exercise.groupBy({
      by: ["difficulty"],
      where: { work: landing.work },
      _count: { id: true },
      orderBy: { difficulty: "asc" },
    });

    // Rozkład typów
    const typeBreakdown = await prisma.exercise.groupBy({
      by: ["type"],
      where: { work: landing.work },
      _count: { id: true },
    });

    // Opcjonalnie: powiązany ContentHub (baza wiedzy) — jeśli istnieje
    const relatedHub = await prisma.contentHub.findFirst({
      where: {
        title: landing.work,
        type: "LITERARY_WORK",
        isPublished: true,
      },
      select: { slug: true, title: true },
    });

    return {
      ...landing,
      stats: {
        exerciseCount,
        difficultyBreakdown: difficultyBreakdown.map((d) => ({
          difficulty: d.difficulty,
          count: d._count.id,
        })),
        typeBreakdown: typeBreakdown.map((t) => ({
          type: t.type,
          count: t._count.id,
        })),
      },
      relatedKnowledgeBase: relatedHub
        ? { slug: relatedHub.slug, title: relatedHub.title }
        : null,
    };
  }

  // ADMIN — CRUD
  async createTestLanding(data: any) {
    const slug = data.slug || this.generateSlug(data.title);

    // Sprawdź czy work istnieje w Exercise
    const exerciseCount = await prisma.exercise.count({
      where: { work: data.work },
    });

    if (exerciseCount === 0) {
      throw new Error(
        `Brak ćwiczeń dla lektury "${data.work}". Dodaj najpierw pytania.`,
      );
    }

    return prisma.testLanding.create({
      data: {
        slug,
        work: data.work,
        title: data.title,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        author: data.author || null,
        epoch: data.epoch || null,
        isRequired: data.isRequired || false,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
      },
    });
  }

  async updateTestLanding(id: string, data: any) {
    const sanitized = { ...data };
    [
      "description",
      "imageUrl",
      "author",
      "epoch",
      "metaTitle",
      "metaDescription",
    ].forEach((f) => {
      if (sanitized[f] === "") sanitized[f] = null;
    });

    return prisma.testLanding.update({
      where: { id },
      data: sanitized,
    });
  }

  async deleteTestLanding(id: string) {
    return prisma.testLanding.delete({ where: { id } });
  }

  // Lista unikalnych lektur z Exercise (do selecta w adminie)
  async getAvailableWorks() {
    const works = await prisma.exercise.groupBy({
      by: ["work"],
      where: { work: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    // Odfiltruj te, które już mają TestLanding
    const existingLandings = await prisma.testLanding.findMany({
      select: { work: true },
    });
    const existingWorks = new Set(existingLandings.map((l) => l.work));

    return works
      .filter((w) => w.work)
      .map((w) => ({
        work: w.work as string,
        exerciseCount: w._count.id,
        hasLanding: existingWorks.has(w.work as string),
      }));
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
