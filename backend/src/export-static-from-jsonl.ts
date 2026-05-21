// backend/src/export-static-from-jsonl.ts
// Konwerter produkcyjnych dumpów JSONL → struktura plików dla Astro SSG.
// Wejście:  D:\maturapolski\tmp-export\{hubs,pages,tests}.jsonl
// Wyjście:  D:\maturapolski-static\src\content\
//
// Uruchamianie:  cd backend && npx tsx src/export-static-from-jsonl.ts

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const INPUT_DIR =
  process.env.STATIC_INPUT || "D:\\maturapolski\\tmp-export";
const OUTPUT_ROOT =
  process.env.STATIC_OUT || "D:\\maturapolski-static\\src\\content";

// ---------------------------------------------------------------------------
// EPOCH_DATA — z backend/src/services/epochLandingService.ts
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
    keyAuthors: ["Dante Alighieri", "św. Tomasz z Akwinu", "Gall Anonim", "Jan Długosz"],
  },
  RENAISSANCE: {
    name: "Renesans",
    slug: "renesans",
    period: "ok. 1450 – ok. 1600",
    shortDescription: "Odrodzenie antyku, humanizm i rozkwit polskiej literatury.",
    description:
      "Renesans to epoka ponownego odkrycia starożytności i afirmacji człowieka. Humanizm postawił w centrum zainteresowań godność i możliwości jednostki. W Polsce rozkwitła literatura w języku narodowym — Jan Kochanowski stworzył dzieła na miarę europejską (Treny, Pieśni, Odprawa posłów greckich).",
    keyFeatures: [
      "Humanizm i antropocentryzm",
      "Nawiązania do antyku",
      "Afirmacja życia i natury",
      "Rozwój języka narodowego",
      "Reformacja",
    ],
    keyAuthors: ["Jan Kochanowski", "Mikołaj Rej", "Andrzej Frycz Modrzewski", "William Szekspir"],
  },
  BAROQUE: {
    name: "Barok",
    slug: "barok",
    period: "ok. 1600 – ok. 1764",
    shortDescription: "Epoka kontrastów, przepychu, sarmatyzmu i niepokoju egzystencjalnego.",
    description:
      "Barok to epoka kontrastów i napięć: między sacrum a profanum, życiem a śmiercią, ciałem a duchem. W Polsce dominował sarmatyzm — ideologia szlachecka łącząca waleczność z pobożnością. Pamiętniki Paska to najważniejszy dokument sarmackiej mentalności. Literatura barokowa cechuje się przepychem stylistycznym i konceptyzmem.",
    keyFeatures: [
      "Sarmatyzm",
      "Konceptyzm i marinizm",
      "Vanitas — motyw marności",
      "Napięcie sacrum–profanum",
      "Pamiętnikarstwo szlacheckie",
    ],
    keyAuthors: ["Jan Chryzostom Pasek", "Daniel Naborowski", "Jan Andrzej Morsztyn", "Wacław Potocki"],
  },
  ENLIGHTENMENT: {
    name: "Oświecenie",
    slug: "oswiecenie",
    period: "ok. 1764 – ok. 1822",
    shortDescription: "Wiek rozumu, krytyki społecznej i odrodzenia narodowego.",
    description:
      "Oświecenie to epoka rozumu, postępu i wiary w naukę. Literatura miała charakter dydaktyczny i społecznie zaangażowany. W Polsce — czasy reform stanisławowskich, Komisji Edukacji Narodowej i upadku państwa. Twórczość Ignacego Krasickiego (bajki, satyry) ośmieszała wady społeczeństwa szlacheckiego.",
    keyFeatures: [
      "Racjonalizm i empiryzm",
      "Dydaktyzm",
      "Krytyka społeczna",
      "Klasycyzm",
      "Idee patriotyczne",
    ],
    keyAuthors: ["Ignacy Krasicki", "Stanisław Trembecki", "Franciszek Karpiński", "Wolter", "Jean-Jacques Rousseau"],
  },
  ROMANTICISM: {
    name: "Romantyzm",
    slug: "romantyzm",
    period: "ok. 1822 – ok. 1864",
    shortDescription: "Epoka uczucia, indywidualizmu i walki o niepodległość.",
    description:
      "Romantyzm to epoka buntu przeciwko rozumowi i konwencjom. W centrum stoi jednostka — uczuciowa, wrażliwa, niezrozumiana. W Polsce romantyzm jest nierozerwalnie związany z walką o niepodległość. Trzej wieszczowie — Mickiewicz, Słowacki, Krasiński — stworzyli mit polskiego mesjanizmu.",
    keyFeatures: [
      "Indywidualizm i uczuciowość",
      "Mesjanizm i mistycyzm",
      "Bunt i bohater romantyczny",
      "Ludowość i orientalizm",
      "Walka o niepodległość",
    ],
    keyAuthors: ["Adam Mickiewicz", "Juliusz Słowacki", "Zygmunt Krasiński", "Cyprian Kamil Norwid"],
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
    keyAuthors: ["Bolesław Prus", "Eliza Orzeszkowa", "Henryk Sienkiewicz", "Maria Konopnicka"],
  },
  YOUNG_POLAND: {
    name: "Młoda Polska",
    slug: "mloda-polska",
    period: "ok. 1890 – 1918",
    shortDescription: "Modernizm, dekadentyzm i bunt artystów przeciw mieszczańskiemu światu.",
    description:
      "Młoda Polska to polski modernizm — bunt artystów przeciw filisterstwu i pozytywistycznej prozie życia. Charakterystyczne: dekadentyzm, symbolizm, impresjonizm, ekspresjonizm. Wesele Wyspiańskiego stało się symbolicznym podsumowaniem polskich kompleksów.",
    keyFeatures: [
      "Dekadentyzm i pesymizm",
      "Symbolizm i impresjonizm",
      "Bunt przeciw filisterstwu",
      "Ludomania",
      "Synestezja w sztuce",
    ],
    keyAuthors: ["Stanisław Wyspiański", "Jan Kasprowicz", "Kazimierz Przerwa-Tetmajer", "Stanisław Przybyszewski", "Stefan Żeromski"],
  },
  INTERWAR: {
    name: "Dwudziestolecie międzywojenne",
    slug: "dwudziestolecie-miedzywojenne",
    period: "1918 – 1939",
    shortDescription: "Eksperyment formalny, awangarda i fascynacja nowoczesnością.",
    description:
      "Dwudziestolecie międzywojenne to okres odzyskania niepodległości i rozkwitu literatury w wolnej Polsce. Awangardowe ugrupowania (Skamander, Awangarda Krakowska, futuryści) eksperymentowały z formą. Powstały dzieła Witkacego, Schulza, Gombrowicza — pisarzy światowego formatu.",
    keyFeatures: [
      "Awangardowość i eksperyment",
      "Fascynacja cywilizacją techniczną",
      "Katastrofizm",
      "Psychologizm",
      "Groteska",
    ],
    keyAuthors: ["Julian Tuwim", "Bruno Schulz", "Witold Gombrowicz", "Stanisław Ignacy Witkiewicz", "Zofia Nałkowska"],
  },
  CONTEMPORARY: {
    name: "Współczesność",
    slug: "wspolczesnosc",
    period: "1939 – dziś",
    shortDescription: "Doświadczenie wojny, totalitaryzmu i poszukiwanie nowej tożsamości.",
    description:
      "Literatura współczesna to przede wszystkim rozliczenie z doświadczeniem II wojny światowej, Holocaustu i totalitaryzmu. Powstały świadectwa obozowe (Borowski, Nałkowska, Herling-Grudziński). Poezja Miłosza, Szymborskiej, Herberta — nobilitacja polskiej liryki. Po 1989 nowa wolność i poszukiwanie tożsamości.",
    keyFeatures: [
      "Literatura obozowa",
      "Rozliczenie z totalitaryzmem",
      "Egzystencjalizm",
      "Postmodernizm",
      "Literatura kobiet i mniejszości",
    ],
    keyAuthors: ["Czesław Miłosz", "Wisława Szymborska", "Zbigniew Herbert", "Tadeusz Borowski", "Gustaw Herling-Grudziński", "Olga Tokarczuk"],
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
  return (blocks || []).filter((b) => b.type !== "page_break");
}

// PostgreSQL COPY TEXT format escapes backslashes and a handful of control chars.
// `row_to_json` produces JSON; COPY then double-escapes \" -> \\" and so on.
// We must reverse the COPY layer before handing the line to JSON.parse.
function unescapeCopyText(s: string): string {
  return s.replace(/\\(.)/g, (_, c) => {
    switch (c) {
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "n":
        return "\n";
      case "r":
        return "\r";
      case "t":
        return "\t";
      case "v":
        return "\v";
      case "\\":
        return "\\";
      default:
        return "\\" + c;
    }
  });
}

async function readJsonl<T = any>(file: string): Promise<T[]> {
  const rows: T[] = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(file, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });
  let lineNo = 0;
  for await (const line of rl) {
    lineNo++;
    if (!line.trim()) continue;
    const unescaped = unescapeCopyText(line);
    try {
      rows.push(JSON.parse(unescaped));
    } catch (e: any) {
      throw new Error(`Failed to parse line ${lineNo} of ${path.basename(file)}: ${e.message}`);
    }
  }
  return rows;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
type Hub = {
  id: string;
  slug: string;
  type: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  imageAlignment: string | null;
  imageWidth: string | null;
  author: string | null;
  year: number | null;
  genre: string | null;
  epoch: string | null;
  isRequired: boolean;
  birthYear: number | null;
  deathYear: number | null;
  period: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  views: number;
};

type Page = {
  id: string;
  hubId: string;
  slug: string;
  title: string;
  content: { blocks: any[] };
  order: number;
  metaTitle: string | null;
  metaDescription: string | null;
  readingTime: number | null;
  views: number;
  averageRating: number | null;
  ratingsCount: number;
  createdAt: string;
  updatedAt: string;
};

type Test = {
  slug: string;
  work: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  author: string | null;
  epoch: string | null;
  isRequired: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  views: number;
};

async function main() {
  console.log(`\n📦 Wejście:  ${INPUT_DIR}`);
  console.log(`📦 Wyjście:  ${OUTPUT_ROOT}\n`);

  const hubs = await readJsonl<Hub>(path.join(INPUT_DIR, "hubs.jsonl"));
  const pages = await readJsonl<Page>(path.join(INPUT_DIR, "pages.jsonl"));
  const tests = await readJsonl<Test>(path.join(INPUT_DIR, "tests.jsonl"));

  console.log(`Wczytano: ${hubs.length} hubów, ${pages.length} stron, ${tests.length} testów\n`);

  const hubById = new Map<string, Hub>(hubs.map((h) => [h.id, h]));
  const pagesByHub = new Map<string, Page[]>();
  for (const p of pages) {
    const arr = pagesByHub.get(p.hubId) ?? [];
    arr.push(p);
    pagesByHub.set(p.hubId, arr);
  }
  for (const arr of pagesByHub.values()) arr.sort((a, b) => a.order - b.order);

  // -------------------------------------------------------------------------
  // ContentHub + ContentPage
  // -------------------------------------------------------------------------
  console.log("=== ContentHub + ContentPage ===");
  let hubCount = 0;
  let pageCount = 0;
  const skippedHubs: string[] = [];

  for (const hub of hubs) {
    const hubPages = pagesByHub.get(hub.id) ?? [];

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
      pageCount: hubPages.length,
      pages: hubPages.map((p) => ({
        slug: p.slug,
        title: p.title,
        order: p.order,
        readingTime: p.readingTime,
      })),
    };

    let baseDir: string;
    let writeHubMeta = true;
    let pageFileFn: (p: Page) => string;

    if (
      hub.type === "LITERARY_WORK" ||
      hub.type === "AUTHOR" ||
      hub.type === "THEME" ||
      hub.type === "GENRE" ||
      hub.type === "EPOCH"
    ) {
      if (!hub.slug) {
        skippedHubs.push(`(brak slug) ${hub.type}/${hub.id}`);
        continue;
      }
      baseDir = path.join(OUTPUT_ROOT, "baza-wiedzy", hub.slug);
      pageFileFn = (p) => path.join(baseDir, `${p.slug}.json`);
    } else if (hub.type === "GUIDE") {
      baseDir = path.join(OUTPUT_ROOT, "poradnik");
      writeHubMeta = false;
      pageFileFn = (p) => path.join(baseDir, `${p.slug}.json`);
    } else if (hub.type === "EXAM_SHEET") {
      baseDir = path.join(OUTPUT_ROOT, "arkusze");
      writeHubMeta = false;
      pageFileFn = () => path.join(baseDir, `${hub.slug}.json`);
    } else {
      skippedHubs.push(`(typ?) ${hub.type}/${hub.slug}`);
      continue;
    }

    if (writeHubMeta) {
      writeJson(path.join(baseDir, "_hub.json"), hubMeta);
      hubCount++;
    }

    for (const page of hubPages) {
      const blocks = stripPageBreaks(page.content?.blocks ?? []);
      const pageData: any = {
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
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
        blocks,
      };
      if (hub.type === "EXAM_SHEET") {
        pageData.hubMeta = hubMeta;
      }
      writeJson(pageFileFn(page), pageData);
      pageCount++;
    }

    console.log(
      `  ✓ ${hub.type.padEnd(14)} ${(hub.slug || "(empty)").padEnd(55)} (${hubPages.length} podstron)`,
    );
  }
  console.log(`\n  → Hubów: ${hubCount}, stron: ${pageCount}`);
  if (skippedHubs.length) console.log(`  ⚠ pominięte: ${skippedHubs.join(", ")}`);

  // -------------------------------------------------------------------------
  // TestLanding
  // -------------------------------------------------------------------------
  console.log("\n=== TestLanding ===");
  for (const t of tests) {
    writeJson(path.join(OUTPUT_ROOT, "test", `${t.slug}.json`), t);
  }
  console.log(`  → Zapisano ${tests.length} TestLanding`);

  // -------------------------------------------------------------------------
  // Epoki — EPOCH_DATA + powiązania
  // -------------------------------------------------------------------------
  console.log("\n=== Epoki ===");
  const literaryHubs = hubs.filter((h) => h.type === "LITERARY_WORK" && h.epoch);
  let epochCount = 0;
  for (const [epochKey, data] of Object.entries(EPOCH_DATA)) {
    const relatedHubs = literaryHubs
      .filter((h) => h.epoch === epochKey)
      .map((h) => ({
        slug: h.slug,
        title: h.title,
        author: h.author,
        isRequired: h.isRequired,
      }));
    const relatedTests = tests
      .filter((t) => t.epoch === epochKey)
      .map((t) => ({
        slug: t.slug,
        title: t.title,
        author: t.author,
        isRequired: t.isRequired,
      }));

    writeJson(path.join(OUTPUT_ROOT, "epoki", `${data.slug}.json`), {
      epoch: epochKey,
      slug: data.slug,
      name: data.name,
      period: data.period,
      shortDescription: data.shortDescription,
      description: data.description,
      keyFeatures: data.keyFeatures,
      keyAuthors: data.keyAuthors,
      relatedHubs,
      relatedTests,
      metaTitle: `${data.name} — epoka literacka | MaturaPolski.pl`,
      metaDescription: data.shortDescription,
    });
    epochCount++;
  }
  console.log(`  → Zapisano ${epochCount} epok`);

  // -------------------------------------------------------------------------
  // Indeksy do listingów
  // -------------------------------------------------------------------------
  console.log("\n=== Indeksy ===");

  const bazaWiedzyIndex = hubs
    .filter((h) => ["LITERARY_WORK", "AUTHOR", "THEME", "GENRE", "EPOCH"].includes(h.type) && h.slug)
    .map((h) => ({
      slug: h.slug,
      type: h.type,
      title: h.title,
      description: h.description,
      imageUrl: h.imageUrl,
      author: h.author,
      epoch: h.epoch,
      isRequired: h.isRequired,
      pageCount: (pagesByHub.get(h.id) ?? []).length,
    }));
  writeJson(path.join(OUTPUT_ROOT, "_index", "baza-wiedzy.json"), bazaWiedzyIndex);

  const guidePages = hubs
    .filter((h) => h.type === "GUIDE")
    .flatMap((h) =>
      (pagesByHub.get(h.id) ?? []).map((p) => ({
        slug: p.slug,
        title: p.title,
        order: p.order,
        readingTime: p.readingTime,
        metaDescription: p.metaDescription,
      })),
    );
  writeJson(path.join(OUTPUT_ROOT, "_index", "poradnik.json"), guidePages);

  const arkuszeIndex = hubs
    .filter((h) => h.type === "EXAM_SHEET")
    .map((h) => ({
      slug: h.slug,
      title: h.title,
      description: h.description,
      year: h.year,
      imageUrl: h.imageUrl,
    }));
  writeJson(path.join(OUTPUT_ROOT, "_index", "arkusze.json"), arkuszeIndex);

  writeJson(
    path.join(OUTPUT_ROOT, "_index", "test.json"),
    tests
      .slice()
      .sort((a, b) =>
        Number(b.isRequired) - Number(a.isRequired) || a.title.localeCompare(b.title, "pl"),
      ),
  );

  writeJson(
    path.join(OUTPUT_ROOT, "_index", "epoki.json"),
    Object.entries(EPOCH_DATA).map(([key, d]) => ({
      epoch: key,
      slug: d.slug,
      name: d.name,
      period: d.period,
      shortDescription: d.shortDescription,
      keyAuthors: d.keyAuthors,
    })),
  );

  console.log("  → 5 plików w _index/");
  console.log("\n✅ Eksport zakończony.\n");
}

main().catch((e) => {
  console.error("❌ Błąd:", e);
  process.exit(1);
});
