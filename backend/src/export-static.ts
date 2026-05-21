// backend/src/export-static.ts
// Jednorazowy skrypt eksportu treści z DB do plików JSON dla nowego Astro SSG.
// Uruchamianie:  cd backend && npx tsx src/export-static.ts
//
// Struktura wyjścia mirruje URL-e (slugi 1:1 zachowane):
//   src/content/
//     baza-wiedzy/{hubSlug}/_hub.json
//     baza-wiedzy/{hubSlug}/{pageSlug}.json    ← LITERARY_WORK + THEME
//     poradnik/{pageSlug}.json                  ← GUIDE (flat URL)
//     arkusze/{hubSlug}.json                    ← EXAM_SHEET (hub+page merged)
//     epoki/{slug}.json                         ← EPOCH_DATA + related works/themes
//     test/{slug}.json                          ← TestLanding meta

import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const OUTPUT_ROOT =
  process.env.STATIC_OUT || "D:\\maturapolski-static\\src\\content";

// ---------------------------------------------------------------------------
// EPOCH_DATA — skopiowane z backend/src/services/epochLandingService.ts
// (Trzymane statycznie w kodzie — eksport robi z tego pliki.)
// ---------------------------------------------------------------------------
const EPOCH_DATA: Record<
  string,
  {
    name: string;
    slug: string;
    period: string;
    shortDescription: string;
    description: string;
    keyFeatures: string[];
    keyAuthors: string[];
  }
> = {
  ANTIQUITY: {
    name: "Starożytność",
    slug: "starozytnosc",
    period: "ok. 4000 p.n.e. – 476 n.e.",
    shortDescription:
      "Kolebka europejskiej kultury — mitologia, filozofia i początki dramatu.",
    description:
      "Starożytność to fundament europejskiej cywilizacji. W tej epoce powstały kluczowe gatunki literackie: epos, tragedia, komedia i liryka. Myśl filozoficzna Sokratesa, Platona i Arystotelesa ukształtowała zachodni sposób myślenia. Mitologia grecka i rzymska dostarcza archetypów obecnych w literaturze do dziś.",
    keyFeatures: [
      "Mitologia i religia politeistyczna",
      "Narodziny filozofii",
      "Tragedia i komedia grecka",
      "Epos homerycki",
      "Ideał kalokagathii",
    ],
    keyAuthors: ["Homer", "Sofokles", "Eurypides", "Horacy", "Wergiliusz"],
  },
  MIDDLE_AGES: {
    name: "Średniowiecze",
    slug: "sredniowiecze",
    period: "476 – ok. 1450",
    shortDescription:
      "Epoka teocentryzmu, rycerstwa i alegorycznych wizji zaświatów.",
    description:
      "Średniowiecze to epoka zdominowana przez chrześcijaństwo i teocentryzm. Literatura służyła celom religijnym i dydaktycznym. Powstały wielkie dzieła alegoryczne (Boska komedia Dantego), pieśni rycerskie i hagiografie. W Polsce rozwijała się literatura w języku łacińskim i polskim (Bogurodzica).",
    keyFeatures: [
      "Teocentryzm",
      "Alegoria i symbolika",
      "Wzorce osobowe: rycerz, asceta, władca",
      "Hagiografia i kroniki",
      "Danse macabre",
    ],
    keyAuthors: [
      "Dante Alighieri",
      "św. Tomasz z Akwinu",
      "Gall Anonim",
      "Jan Długosz",
    ],
  },
  RENAISSANCE: {
    name: "Renesans",
    slug: "renesans",
    period: "ok. 1450 – ok. 1600",
    shortDescription:
      "Odrodzenie antyku, humanizm i rozkwit polskiej literatury.",
    description:
      "Renesans to epoka ponownego odkrycia starożytności i afirmacji człowieka. Humanizm postawił w centrum zainteresowań godność i możliwości jednostki. W Polsce rozkwitła literatura w języku narodowym — Jan Kochanowski stworzył dzieła na miarę europejską (Treny, Pieśni, Odprawa posłów greckich).",
    keyFeatures: [
      "Humanizm i antropocentryzm",
      "Nawiązania do antyku",
      "Afirmacja życia i natury",
      "Rozwój języka narodowego",
      "Reformacja",
    ],
    keyAuthors: [
      "Jan Kochanowski",
      "Mikołaj Rej",
      "Andrzej Frycz Modrzewski",
      "William Szekspir",
    ],
  },
  BAROQUE: {
    name: "Barok",
    slug: "barok",
    period: "ok. 1600 – ok. 1764",
    shortDescription:
      "Epoka kontrastów, przepychu, sarmatyzmu i niepokoju egzystencjalnego.",
    description:
      "Barok to epoka kontrastów i napięć: między sacrum a profanum, życiem a śmiercią, ciałem a duchem. W Polsce dominował sarmatyzm — ideologia szlachecka łącząca waleczność z pobożnością. Pamiętniki Paska to najważniejszy dokument sarmackiej mentalności. Literatura barokowa cechuje się przepychem stylistycznym i konceptyzmem.",
    keyFeatures: [
      "Sarmatyzm",
      "Konceptyzm i marinizm",
      "Vanitas — motyw marności",
      "Napięcie sacrum–profanum",
      "Pamiętnikarstwo szlacheckie",
    ],
    keyAuthors: [
      "Jan Chryzostom Pasek",
      "Daniel Naborowski",
      "Jan Andrzej Morsztyn",
      "Wacław Potocki",
    ],
  },
  ENLIGHTENMENT: {
    name: "Oświecenie",
    slug: "oswiecenie",
    period: "ok. 1764 – ok. 1822",
    shortDescription:
      "Wiek rozumu, krytyki społecznej i odrodzenia narodowego.",
    description:
      "Oświecenie to epoka rozumu, postępu i wiary w naukę. Literatura miała charakter dydaktyczny i społecznie zaangażowany. W Polsce — czasy reform stanisławowskich, Komisji Edukacji Narodowej i upadku państwa. Twórczość Ignacego Krasickiego (bajki, satyry) ośmieszała wady społeczeństwa szlacheckiego.",
    keyFeatures: [
      "Racjonalizm i empiryzm",
      "Dydaktyzm",
      "Krytyka społeczna",
      "Klasycyzm",
      "Idee patriotyczne",
    ],
    keyAuthors: [
      "Ignacy Krasicki",
      "Stanisław Trembecki",
      "Franciszek Karpiński",
      "Wolter",
      "Jean-Jacques Rousseau",
    ],
  },
  ROMANTICISM: {
    name: "Romantyzm",
    slug: "romantyzm",
    period: "ok. 1822 – ok. 1864",
    shortDescription:
      "Epoka uczucia, indywidualizmu i walki o niepodległość.",
    description:
      "Romantyzm to epoka buntu przeciwko rozumowi i konwencjom. W centrum stoi jednostka — uczuciowa, wrażliwa, niezrozumiana. W Polsce romantyzm jest nierozerwalnie związany z walką o niepodległość. Trzej wieszczowie — Mickiewicz, Słowacki, Krasiński — stworzyli mit polskiego mesjanizmu.",
    keyFeatures: [
      "Indywidualizm i uczuciowość",
      "Mesjanizm i mistycyzm",
      "Bunt i bohater romantyczny",
      "Ludowość i orientalizm",
      "Walka o niepodległość",
    ],
    keyAuthors: [
      "Adam Mickiewicz",
      "Juliusz Słowacki",
      "Zygmunt Krasiński",
      "Cyprian Kamil Norwid",
    ],
  },
  POSITIVISM: {
    name: "Pozytywizm",
    slug: "pozytywizm",
    period: "ok. 1864 – ok. 1890",
    shortDescription: "Praca u podstaw, scjentyzm i realistyczna powieść.",
    description:
      "Pozytywizm to reakcja na romantyczne porywy — rozczarowanie powstaniem styczniowym pchnęło Polaków do organicznej pracy. Hasła: praca u podstaw, praca organiczna, emancypacja kobiet, asymilacja Żydów. W literaturze dominuje realistyczna powieść (Lalka, Nad Niemnem) i nowelistyka (Sienkiewicz, Prus).",
    keyFeatures: [
      "Scjentyzm i utylitaryzm",
      "Praca u podstaw i organiczna",
      "Realizm w literaturze",
      "Powieść tendencyjna",
      "Emancypacja kobiet",
    ],
    keyAuthors: [
      "Bolesław Prus",
      "Eliza Orzeszkowa",
      "Henryk Sienkiewicz",
      "Maria Konopnicka",
    ],
  },
  YOUNG_POLAND: {
    name: "Młoda Polska",
    slug: "mloda-polska",
    period: "ok. 1890 – 1918",
    shortDescription:
      "Modernizm, dekadentyzm i bunt artystów przeciw mieszczańskiemu światu.",
    description:
      "Młoda Polska to polski modernizm — bunt artystów przeciw filisterstwu i pozytywistycznej prozie życia. Charakterystyczne: dekadentyzm, symbolizm, impresjonizm, ekspresjonizm. Wesele Wyspiańskiego stało się symbolicznym podsumowaniem polskich kompleksów.",
    keyFeatures: [
      "Dekadentyzm i pesymizm",
      "Symbolizm i impresjonizm",
      "Bunt przeciw filisterstwu",
      "Ludomania",
      "Synestezja w sztuce",
    ],
    keyAuthors: [
      "Stanisław Wyspiański",
      "Jan Kasprowicz",
      "Kazimierz Przerwa-Tetmajer",
      "Stanisław Przybyszewski",
      "Stefan Żeromski",
    ],
  },
  INTERWAR: {
    name: "Dwudziestolecie międzywojenne",
    slug: "dwudziestolecie-miedzywojenne",
    period: "1918 – 1939",
    shortDescription:
      "Eksperyment formalny, awangarda i fascynacja nowoczesnością.",
    description:
      "Dwudziestolecie międzywojenne to okres odzyskania niepodległości i rozkwitu literatury w wolnej Polsce. Awangardowe ugrupowania (Skamander, Awangarda Krakowska, futuryści) eksperymentowały z formą. Powstały dzieła Witkacego, Schulza, Gombrowicza — pisarzy światowego formatu.",
    keyFeatures: [
      "Awangardowość i eksperyment",
      "Fascynacja cywilizacją techniczną",
      "Katastrofizm",
      "Psychologizm",
      "Groteska",
    ],
    keyAuthors: [
      "Julian Tuwim",
      "Bruno Schulz",
      "Witold Gombrowicz",
      "Stanisław Ignacy Witkiewicz",
      "Zofia Nałkowska",
    ],
  },
  CONTEMPORARY: {
    name: "Współczesność",
    slug: "wspolczesnosc",
    period: "1939 – dziś",
    shortDescription:
      "Doświadczenie wojny, totalitaryzmu i poszukiwanie nowej tożsamości.",
    description:
      "Literatura współczesna to przede wszystkim rozliczenie z doświadczeniem II wojny światowej, Holocaustu i totalitaryzmu. Powstały świadectwa obozowe (Borowski, Nałkowska, Herling-Grudziński). Poezja Miłosza, Szymborskiej, Herberta — nobilitacja polskiej liryki. Po 1989 nowa wolność i poszukiwanie tożsamości.",
    keyFeatures: [
      "Literatura obozowa",
      "Rozliczenie z totalitaryzmem",
      "Egzystencjalizm",
      "Postmodernizm",
      "Literatura kobiet i mniejszości",
    ],
    keyAuthors: [
      "Czesław Miłosz",
      "Wisława Szymborska",
      "Zbigniew Herbert",
      "Tadeusz Borowski",
      "Gustaw Herling-Grudziński",
      "Olga Tokarczuk",
    ],
  },
};

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath: string, data: unknown) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function stripPageBreaks(blocks: any[]): any[] {
  // Jedna długa strona — najlepsze SEO.
  return blocks.filter((b) => b.type !== "page_break");
}

// ---------------------------------------------------------------------------
// EXPORT 1: ContentHub + ContentPage
// ---------------------------------------------------------------------------
async function exportHubs() {
  console.log("\n=== EXPORT: ContentHub + ContentPage ===");
  const hubs = await prisma.contentHub.findMany({
    where: { isPublished: true },
    include: {
      pages: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
      },
    },
  });

  let hubCount = 0;
  let pageCount = 0;

  for (const hub of hubs) {
    const hubMeta = {
      slug: hub.slug,
      type: hub.type,
      title: hub.title,
      description: hub.description,
      imageUrl: hub.imageUrl,
      imageAlignment: hub.imageAlignment,
      imageWidth: hub.imageWidth,
      author: hub.author,
      year: hub.year,
      genre: hub.genre,
      epoch: hub.epoch,
      isRequired: hub.isRequired,
      birthYear: hub.birthYear,
      deathYear: hub.deathYear,
      period: hub.period,
      metaTitle: hub.metaTitle,
      metaDescription: hub.metaDescription,
      views: hub.views,
      pageCount: hub.pages.length,
      pages: hub.pages.map((p) => ({
        slug: p.slug,
        title: p.title,
        order: p.order,
        readingTime: p.readingTime,
      })),
    };

    // Mapowanie hub.type → katalog
    let baseDir: string;
    let writeHubMeta = true;
    if (hub.type === "LITERARY_WORK" || hub.type === "AUTHOR" || hub.type === "THEME" || hub.type === "GENRE" || hub.type === "EPOCH") {
      baseDir = path.join(OUTPUT_ROOT, "baza-wiedzy", hub.slug);
    } else if (hub.type === "GUIDE") {
      // GUIDE — flat URL (/poradnik/:articleSlug), hub jest pusty/wirtualny
      baseDir = path.join(OUTPUT_ROOT, "poradnik");
      writeHubMeta = false; // GUIDE nie ma własnej strony huba
    } else if (hub.type === "EXAM_SHEET") {
      baseDir = path.join(OUTPUT_ROOT, "arkusze");
      writeHubMeta = false; // EXAM_SHEET: hub+page mergujemy w 1 plik
    } else {
      console.warn(`  ! Nieznany hub.type: ${hub.type}, pomijam ${hub.slug}`);
      continue;
    }

    if (writeHubMeta) {
      writeJson(path.join(baseDir, "_hub.json"), hubMeta);
      hubCount++;
      console.log(`  ✓ HUB ${hub.type} ${hub.slug} (${hub.pages.length} podstron)`);
    }

    // Strony
    for (const page of hub.pages) {
      const blocks = stripPageBreaks((page.content as any).blocks || []);
      const pageData = {
        slug: page.slug,
        hubSlug: hub.slug,
        hubType: hub.type,
        hubTitle: hub.title,
        title: page.title,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        order: page.order,
        readingTime: page.readingTime,
        views: page.views,
        averageRating: page.averageRating,
        ratingsCount: page.ratingsCount,
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString(),
        blocks,
      };

      let fileName: string;
      if (hub.type === "EXAM_SHEET") {
        // Arkusze: hub+page w 1 pliku — slug = hub.slug
        fileName = path.join(baseDir, `${hub.slug}.json`);
        // Dodaj meta huba do struktury
        (pageData as any).hubMeta = hubMeta;
      } else if (hub.type === "GUIDE") {
        fileName = path.join(baseDir, `${page.slug}.json`);
      } else {
        fileName = path.join(baseDir, `${page.slug}.json`);
      }
      writeJson(fileName, pageData);
      pageCount++;
    }
  }

  console.log(`\n  → Zapisano ${hubCount} hubów + ${pageCount} stron`);
}

// ---------------------------------------------------------------------------
// EXPORT 2: TestLanding
// ---------------------------------------------------------------------------
async function exportTestLandings() {
  console.log("\n=== EXPORT: TestLanding ===");
  const tests = await prisma.testLanding.findMany({
    where: { isPublished: true },
    orderBy: { slug: "asc" },
  });

  for (const t of tests) {
    writeJson(path.join(OUTPUT_ROOT, "test", `${t.slug}.json`), {
      slug: t.slug,
      work: t.work,
      title: t.title,
      description: t.description,
      imageUrl: t.imageUrl,
      author: t.author,
      epoch: t.epoch,
      isRequired: t.isRequired,
      metaTitle: t.metaTitle,
      metaDescription: t.metaDescription,
      views: t.views,
    });
  }
  console.log(`  → Zapisano ${tests.length} TestLanding`);
}

// ---------------------------------------------------------------------------
// EXPORT 3: Epoki (EPOCH_DATA + agregaty z DB)
// ---------------------------------------------------------------------------
async function exportEpochs() {
  console.log("\n=== EXPORT: Epoki ===");

  // Powiązane LITERARY_WORK huby per epoka (mają epoch w schemacie)
  const literaryHubs = await prisma.contentHub.findMany({
    where: { type: "LITERARY_WORK", isPublished: true, epoch: { not: null } },
    select: { slug: true, title: true, author: true, epoch: true, isRequired: true },
  });

  // Powiązane TestLanding per epoka
  const tests = await prisma.testLanding.findMany({
    where: { isPublished: true, epoch: { not: null } },
    select: { slug: true, title: true, author: true, epoch: true, isRequired: true },
  });

  let count = 0;
  for (const [epochKey, data] of Object.entries(EPOCH_DATA)) {
    const relatedHubs = literaryHubs.filter((h) => h.epoch === epochKey);
    const relatedTests = tests.filter((t) => t.epoch === epochKey);

    writeJson(path.join(OUTPUT_ROOT, "epoki", `${data.slug}.json`), {
      epoch: epochKey,
      slug: data.slug,
      name: data.name,
      period: data.period,
      shortDescription: data.shortDescription,
      description: data.description,
      keyFeatures: data.keyFeatures,
      keyAuthors: data.keyAuthors,
      relatedHubs: relatedHubs.map((h) => ({
        slug: h.slug,
        title: h.title,
        author: h.author,
        isRequired: h.isRequired,
      })),
      relatedTests: relatedTests.map((t) => ({
        slug: t.slug,
        title: t.title,
        author: t.author,
        isRequired: t.isRequired,
      })),
      metaTitle: `${data.name} — epoka literacka | MaturaPolski.pl`,
      metaDescription: data.shortDescription,
    });
    count++;
  }
  console.log(`  → Zapisano ${count} epok`);
}

// ---------------------------------------------------------------------------
// EXPORT 4: index.json (manifest do listingów)
// ---------------------------------------------------------------------------
async function exportIndexes() {
  console.log("\n=== EXPORT: Indexy (do list /baza-wiedzy, /poradnik, ...) ===");

  const hubs = await prisma.contentHub.findMany({
    where: { isPublished: true },
    include: {
      pages: { where: { isPublished: true }, select: { slug: true, title: true, order: true } },
    },
    orderBy: { title: "asc" },
  });

  // /baza-wiedzy — lektura + autor + temat + gatunek (bez GUIDE i EXAM_SHEET)
  const bazaWiedzyHubs = hubs
    .filter((h) => ["LITERARY_WORK", "AUTHOR", "THEME", "GENRE", "EPOCH"].includes(h.type))
    .map((h) => ({
      slug: h.slug,
      type: h.type,
      title: h.title,
      description: h.description,
      imageUrl: h.imageUrl,
      author: h.author,
      epoch: h.epoch,
      isRequired: h.isRequired,
      pageCount: h.pages.length,
    }));

  writeJson(path.join(OUTPUT_ROOT, "_index", "baza-wiedzy.json"), bazaWiedzyHubs);

  // /poradnik — pages flatten z GUIDE hubów
  const guideHubs = hubs.filter((h) => h.type === "GUIDE");
  const guidePages = guideHubs.flatMap((h) =>
    h.pages.map((p) => ({ slug: p.slug, title: p.title, order: p.order })),
  );
  writeJson(path.join(OUTPUT_ROOT, "_index", "poradnik.json"), guidePages);

  // /arkusze — listing
  const examSheets = hubs
    .filter((h) => h.type === "EXAM_SHEET")
    .map((h) => ({
      slug: h.slug,
      title: h.title,
      description: h.description,
      year: h.year,
      imageUrl: h.imageUrl,
    }));
  writeJson(path.join(OUTPUT_ROOT, "_index", "arkusze.json"), examSheets);

  // /test — listing
  const tests = await prisma.testLanding.findMany({
    where: { isPublished: true },
    orderBy: [{ isRequired: "desc" }, { title: "asc" }],
    select: {
      slug: true,
      title: true,
      author: true,
      epoch: true,
      isRequired: true,
      imageUrl: true,
      description: true,
    },
  });
  writeJson(path.join(OUTPUT_ROOT, "_index", "test.json"), tests);

  // /epoki — listing
  const epochList = Object.entries(EPOCH_DATA).map(([key, d]) => ({
    epoch: key,
    slug: d.slug,
    name: d.name,
    period: d.period,
    shortDescription: d.shortDescription,
    keyAuthors: d.keyAuthors,
  }));
  writeJson(path.join(OUTPUT_ROOT, "_index", "epoki.json"), epochList);

  console.log(`  → Zapisano 5 plików indeksu w _index/`);
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n📦 Eksport treści → ${OUTPUT_ROOT}\n`);
  ensureDir(OUTPUT_ROOT);

  await exportHubs();
  await exportTestLandings();
  await exportEpochs();
  await exportIndexes();

  console.log("\n✅ Eksport zakończony.\n");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("❌ Błąd eksportu:", e);
  await prisma.$disconnect();
  process.exit(1);
});
