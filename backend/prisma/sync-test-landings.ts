/**
 * sync-test-landings.ts
 *
 * Tworzy brakujące TestLanding TYLKO dla lektur z >= 50 pytań.
 *
 * Uruchomienie:
 *   cd /var/www/maturapolski/backend
 *   npx tsx scripts/sync-test-landings.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MIN_EXERCISES = 50;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (match) => {
      const map: Record<string, string> = {
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
      return map[match] || match;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  console.log(`=== SYNC TEST LANDINGS (min ${MIN_EXERCISES} pytań) ===\n`);

  const exerciseWorks = await prisma.exercise.groupBy({
    by: ["work"],
    where: { work: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  console.log(
    `Znaleziono ${exerciseWorks.length} unikalnych lektur w Exercise.\n`,
  );

  const existingLandings = await prisma.testLanding.findMany({
    select: { work: true, slug: true },
  });
  const existingWorksSet = new Set(existingLandings.map((l) => l.work));
  const existingSlugsSet = new Set(existingLandings.map((l) => l.slug));

  console.log(`Istniejące TestLanding: ${existingLandings.length}\n`);

  const contentHubs = await prisma.contentHub.findMany({
    where: { type: "LITERARY_WORK", isPublished: true },
    select: {
      title: true,
      author: true,
      epoch: true,
      isRequired: true,
      description: true,
      imageUrl: true,
    },
  });
  const hubMap = new Map(contentHubs.map((h) => [h.title, h]));

  let created = 0;
  let skipped = 0;

  for (const entry of exerciseWorks) {
    const work = entry.work as string;
    const count = entry._count.id;

    if (!work || work.trim() === "") continue;

    if (count < MIN_EXERCISES) {
      console.log(
        `  ⊘ [POMINIĘTO] ${work} (${count} pytań < ${MIN_EXERCISES})`,
      );
      skipped++;
      continue;
    }

    if (existingWorksSet.has(work)) {
      console.log(`  ✓ [ISTNIEJE] ${work} (${count} pytań)`);
      continue;
    }

    let slug = generateSlug(work);
    let slugSuffix = 1;
    while (existingSlugsSet.has(slug)) {
      slug = `${generateSlug(work)}-${slugSuffix}`;
      slugSuffix++;
    }

    const hub = hubMap.get(work);

    await prisma.testLanding.create({
      data: {
        slug,
        work,
        title: work,
        author: hub?.author || null,
        epoch: hub?.epoch || null,
        isRequired: hub?.isRequired || false,
        description: hub?.description || null,
        imageUrl: hub?.imageUrl || null,
        metaTitle: `Test z lektury: ${work} | MaturaPolski.pl`,
        metaDescription: `Sprawdź swoją wiedzę z "${work}" - ${count} pytań testowych. Przygotuj się do matury z polskiego!`,
      },
    });

    existingSlugsSet.add(slug);
    existingWorksSet.add(work);

    const hubInfo = hub
      ? `(${hub.author || "?"}, ${hub.epoch || "?"})`
      : "(brak ContentHub)";
    console.log(
      `  ✚ [UTWORZONO] ${work} → /test/${slug} (${count} pytań) ${hubInfo}`,
    );
    created++;
  }

  const finalCount = await prisma.testLanding.count();
  console.log(`\n=== PODSUMOWANIE ===`);
  console.log(`Utworzono nowych: ${created}`);
  console.log(`Pominięto (< ${MIN_EXERCISES} pytań): ${skipped}`);
  console.log(`Łącznie TestLanding: ${finalCount}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("FATAL:", e);
  prisma.$disconnect();
  process.exit(1);
});
