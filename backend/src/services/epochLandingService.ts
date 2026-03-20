// backend/src/services/epochLandingService.ts

import { LiteraryEpoch } from "@prisma/client";
import { prisma } from "../lib/prisma";

// Statyczne dane epok
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
    period: "ok. 1764 – 1822",
    shortDescription: "Wiek rozumu, satyry i walki o reformy Rzeczypospolitej.",
    description:
      "Oświecenie to epoka kultu rozumu, nauki i postępu. W Polsce wiązało się z próbami reform ustrojowych (Konstytucja 3 Maja) i krytyką sarmackich wad (satyry Krasickiego). Literatura pełniła funkcję dydaktyczną — miała uczyć i naprawiać obyczaje. Bajki, satyry i komedie to główne gatunki epoki.",
    keyFeatures: [
      "Racjonalizm i empiryzm",
      "Krytyka sarmatyzmu",
      "Dydaktyzm i utylitaryzm",
      "Klasycyzm",
      "Walka o reformy",
    ],
    keyAuthors: [
      "Ignacy Krasicki",
      "Adam Naruszewicz",
      "Julian Ursyn Niemcewicz",
      "Stanisław Staszic",
    ],
  },
  ROMANTICISM: {
    name: "Romantyzm",
    slug: "romantyzm",
    period: "1822 – 1863",
    shortDescription:
      "Bunt, uczucie, walka o wolność i wielkie dzieła polskiej literatury.",
    description:
      "Romantyzm to epoka dominacji uczucia nad rozumem, buntu jednostki i walki o wolność narodową. W Polsce, pod zaborami, literatura stała się „sumieniem narodu”. Mickiewicz, Słowacki i Krasiński stworzyli największe dzieła polskiej literatury. Mesjanizm, ludowość i indywidualizm to kluczowe idee epoki.",
    keyFeatures: [
      "Prymat uczucia nad rozumem",
      "Mesjanizm i prometeizm",
      "Ludowość i folkloryzm",
      "Walka narodowowyzwoleńcza",
      "Indywidualizm i bunt",
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
    period: "1863 – ok. 1890",
    shortDescription:
      "Praca u podstaw, realizm i wielkie powieści polskiej literatury.",
    description:
      "Pozytywizm to epoka pracy organicznej, nauki i realizmu. Po klęsce powstania styczniowego odrzucono romantyczny bunt na rzecz budowania społeczeństwa „od dołu”. Powieść realistyczna (Lalka Prusa, Nad Niemnem Orzeszkowej) stała się głównym gatunkiem. Literatura ukazywała problemy społeczne: biedę, emancypację kobiet, asymilację.",
    keyFeatures: [
      "Praca u podstaw i praca organiczna",
      "Realizm i naturalizm",
      "Scjentyzm i utylitaryzm",
      "Powieść tendencyjna i realistyczna",
      "Problematyka społeczna",
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
      "Dekadentyzm, symbolizm i poszukiwanie nowych form artystycznych.",
    description:
      "Młoda Polska to epoka buntu przeciw pozytywistycznemu utylitaryzmowi. Artyści głosili hasło „sztuka dla sztuki” i poszukiwali nowych środków wyrazu. Symbolizm, impresjonizm i dekadentyzm zdominowały literaturę. Wesele Wyspiańskiego to rozrachunek z polskim społeczeństwem. Żeromski ukazywał konflikty moralne epoki.",
    keyFeatures: [
      "Dekadentyzm i pesymizm",
      "Symbolizm i impresjonizm",
      "Sztuka dla sztuki",
      "Fascynacja podświadomością",
      "Rozrachunek narodowy",
    ],
    keyAuthors: [
      "Stanisław Wyspiański",
      "Stefan Żeromski",
      "Kazimierz Przerwa-Tetmajer",
      "Leopold Staff",
    ],
  },
  INTERWAR: {
    name: "Dwudziestolecie międzywojenne",
    slug: "dwudziestolecie-miedzywojenne",
    period: "1918 – 1939",
    shortDescription:
      "Awangarda, groteska i niepodległa Polska szukająca tożsamości.",
    description:
      "Dwudziestolecie międzywojenne to czas wolności artystycznej i eksperymentów formalnych. Odzyskanie niepodległości otworzyło nowe możliwości. Awangarda (futuryzm, ekspresjonizm) zrywała z tradycją. Gombrowicz kwestionował formę, Schulz tworzył poetycki świat wyobraźni, Witkacy ostrzegał przed katastrofą cywilizacji.",
    keyFeatures: [
      "Awangarda i eksperyment formalny",
      "Katastrofizm",
      "Groteska i absurd",
      "Poszukiwanie nowej formy",
      "Dwudziestowieczna filozofia",
    ],
    keyAuthors: [
      "Witold Gombrowicz",
      "Bruno Schulz",
      "Stanisław Ignacy Witkiewicz",
      "Julian Tuwim",
    ],
  },
  CONTEMPORARY: {
    name: "Współczesność",
    slug: "wspolczesnosc",
    period: "1945 – dziś",
    shortDescription:
      "Literatura wobec totalitaryzmu, wolności i pytań o tożsamość.",
    description:
      "Współczesność to epoka wielości nurtów i światopoglądów. Literatura mierzy się z doświadczeniem wojny i totalitaryzmu (Borowski, Herbert, Miłosz), poszukuje nowych form wyrazu (Różewicz) i stawia pytania o sens istnienia. Po 1989 roku polska literatura otworzyła się na nowe tematy — tożsamość, pamięć, globalizację.",
    keyFeatures: [
      "Rozrachunek z wojną i totalitaryzmem",
      "Egzystencjalizm",
      "Postmodernizm",
      "Wielość nurtów i stylów",
      "Literatura faktu i reportaż",
    ],
    keyAuthors: [
      "Czesław Miłosz",
      "Zbigniew Herbert",
      "Wisława Szymborska",
      "Tadeusz Borowski",
      "Sławomir Mrożek",
    ],
  },
};

const EPOCH_ORDER: LiteraryEpoch[] = [
  "ANTIQUITY",
  "MIDDLE_AGES",
  "RENAISSANCE",
  "BAROQUE",
  "ENLIGHTENMENT",
  "ROMANTICISM",
  "POSITIVISM",
  "YOUNG_POLAND",
  "INTERWAR",
  "CONTEMPORARY",
];

export class EpochLandingService {
  /**
   * Buduje mapę epoka → lista work (na podstawie TestLanding + Exercise.epoch)
   * To jest SOURCE OF TRUTH: łączy oba źródła informacji o przynależności.
   */
  private async buildEpochWorksMap(): Promise<Map<string, Set<string>>> {
    const epochWorks = new Map<string, Set<string>>();

    // 1. Z TestLanding (mają epoch i work)
    const testLandings = await prisma.testLanding.findMany({
      where: { isPublished: true, epoch: { not: null } },
      select: { epoch: true, work: true },
    });

    testLandings.forEach((tl) => {
      if (tl.epoch && tl.work) {
        if (!epochWorks.has(tl.epoch)) epochWorks.set(tl.epoch, new Set());
        epochWorks.get(tl.epoch)!.add(tl.work);
      }
    });

    // 2. Z Exercise (mają epoch i work) — łapie lektury bez TestLanding
    const exerciseWorks = await prisma.exercise.groupBy({
      by: ["epoch", "work"],
      where: { epoch: { not: null }, work: { not: null } },
    });

    exerciseWorks.forEach((ew) => {
      if (ew.epoch && ew.work) {
        if (!epochWorks.has(ew.epoch)) epochWorks.set(ew.epoch, new Set());
        epochWorks.get(ew.epoch)!.add(ew.work);
      }
    });

    return epochWorks;
  }

  /**
   * Lista wszystkich epok ze statystykami
   * GET /api/epochs
   */
  async getEpochLandings() {
    const epochWorksMap = await this.buildEpochWorksMap();

    // Zbierz WSZYSTKIE unikalne work per epoka i policz ćwiczenia
    const results = [];

    for (const epoch of EPOCH_ORDER) {
      const data = EPOCH_DATA[epoch];
      if (!data) continue;

      const works = epochWorksMap.get(epoch);
      if (!works || works.size === 0) {
        // Sprawdź czy są jakieś ćwiczenia bezpośrednio z tą epoką
        const directCount = await prisma.exercise.count({ where: { epoch } });
        if (directCount === 0) continue;

        results.push({
          epoch,
          slug: data.slug,
          name: data.name,
          period: data.period,
          shortDescription: data.shortDescription,
          exerciseCount: directCount,
          workCount: 0,
          keyAuthors: data.keyAuthors,
        });
        continue;
      }

      const worksArray = Array.from(works);

      // Policz ćwiczenia: te z epoch LUB te z work należącym do tej epoki
      const exerciseCount = await prisma.exercise.count({
        where: {
          OR: [{ epoch }, { work: { in: worksArray } }],
        },
      });

      results.push({
        epoch,
        slug: data.slug,
        name: data.name,
        period: data.period,
        shortDescription: data.shortDescription,
        exerciseCount,
        workCount: worksArray.length,
        keyAuthors: data.keyAuthors,
      });
    }

    return results;
  }

  /**
   * Pojedyncza epoka z pełnymi statystykami
   * GET /api/epochs/:slug
   */
  async getEpochLanding(slug: string) {
    const epochEntry = Object.entries(EPOCH_DATA).find(
      ([_, data]) => data.slug === slug,
    );
    if (!epochEntry) throw new Error("Epoch not found");

    const [epochKey, epochData] = epochEntry;
    const epoch = epochKey as LiteraryEpoch;

    // Zbuduj listę works dla tej epoki
    const epochWorksMap = await this.buildEpochWorksMap();
    const worksSet = epochWorksMap.get(epoch) || new Set<string>();
    const worksArray = Array.from(worksSet);

    // Warunek: ćwiczenia z tej epoki LUB z lektur tej epoki
    const exerciseWhere =
      worksArray.length > 0
        ? { OR: [{ epoch }, { work: { in: worksArray } }] }
        : { epoch };

    const [exerciseCount, difficultyBreakdown, typeBreakdown] =
      await Promise.all([
        prisma.exercise.count({ where: exerciseWhere }),
        prisma.exercise.groupBy({
          by: ["difficulty"],
          where: exerciseWhere,
          _count: { id: true },
          orderBy: { difficulty: "asc" },
        }),
        prisma.exercise.groupBy({
          by: ["type"],
          where: exerciseWhere,
          _count: { id: true },
        }),
      ]);

    if (exerciseCount === 0) throw new Error("No exercises for this epoch");

    // Work breakdown — policz ćwiczenia per work
    // Uwzględnij WSZYSTKIE works z tej epoki (z TestLanding + Exercise.epoch)
    const workBreakdown: { work: string; count: number }[] = [];

    if (worksArray.length > 0) {
      const workCounts = await prisma.exercise.groupBy({
        by: ["work"],
        where: { work: { in: worksArray } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      });

      workCounts.forEach((wc) => {
        if (wc.work) {
          workBreakdown.push({ work: wc.work, count: wc._count.id });
        }
      });
    }

    // Dodaj ćwiczenia z epoch ustawionym ale bez work (np. pytania ogólne o epoce)
    const noWorkCount = await prisma.exercise.count({
      where: { epoch, work: null },
    });
    if (noWorkCount > 0) {
      workBreakdown.push({
        work: "Pytania ogólne o epoce",
        count: noWorkCount,
      });
    }

    // Powiązane TestLandings
    const relatedTestLandings = await prisma.testLanding.findMany({
      where: {
        isPublished: true,
        OR: [{ epoch }, { work: { in: worksArray } }],
      },
      orderBy: [{ isRequired: "desc" }, { title: "asc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        author: true,
        isRequired: true,
      },
    });

    // Powiązany ContentHub
    const relatedHub = await prisma.contentHub.findFirst({
      where: { type: "EPOCH", epoch, isPublished: true },
      select: { slug: true, title: true },
    });

    return {
      epoch,
      slug: epochData.slug,
      name: epochData.name,
      period: epochData.period,
      description: epochData.description,
      shortDescription: epochData.shortDescription,
      keyFeatures: epochData.keyFeatures,
      keyAuthors: epochData.keyAuthors,
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
        workBreakdown,
      },
      relatedTestLandings,
      relatedKnowledgeBase: relatedHub
        ? { slug: relatedHub.slug, title: relatedHub.title }
        : null,
      metaTitle: `Testy z epoki: ${epochData.name} | MaturaPolski.pl`,
      metaDescription: `Sprawdź wiedzę z epoki ${epochData.name} (${epochData.period}) — ${exerciseCount} pytań testowych z ${workBreakdown.length} lektur. ${epochData.shortDescription}`,
    };
  }
}
