// backend/prisma/seed-materials.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedMaterials() {
  try {
    console.log("Starting materials seed...");

    // 1. Epoki
    const romanticism = await prisma.epochInfo.create({
      data: {
        epoch: "ROMANTICISM",
        name: "Romanticism",
        namePolish: "Romantyzm",
        period: "1795-1863",
        characteristics: [
          "Indywidualizm",
          "Uczuciowość",
          "Irracjonalizm",
          "Mistycyzm",
          "Ludowość",
        ],
        philosophy:
          "Filozofia romantyzmu opierała się na idealizmie niemieckim, przeciwstawiając się racjonalizmowi oświecenia.",
        artStyle:
          "Sztuka romantyczna charakteryzowała się ekspresją uczuć, fascynacją naturą i tajemnicą.",
        mainGenres: ["ballada", "dramat romantyczny", "powieść poetycka"],
        keyAuthors: ["Adam Mickiewicz", "Juliusz Słowacki", "Cyprian Norwid"],
        keyWorks: ["Dziady", "Pan Tadeusz", "Kordian"],
        historicalContext:
          "Okres rozbiorów Polski, powstania narodowe, emigracja.",
        timeline: {
          events: [
            { year: 1795, event: "III rozbiór Polski" },
            { year: 1830, event: "Powstanie listopadowe" },
            { year: 1834, event: "Publikacja Pana Tadeusza" },
          ],
        },
      },
    });

    // 2. Lektury
    const panTadeusz = await prisma.literaryWork.create({
      data: {
        title: "Pan Tadeusz",
        author: "Adam Mickiewicz",
        epoch: "ROMANTICISM",
        genre: "epopeja",
        year: 1834,
        isRequired: true,
        summary:
          "Epopeja narodowa przedstawiająca życie szlachty na Litwie w latach 1811-1812.",
        themes: ["patriotyzm", "miłość", "tradycja", "natura", "honor"],
      },
    });

    // 3. Rozdziały
    await prisma.chapter.createMany({
      data: [
        {
          workId: panTadeusz.id,
          number: 1,
          title: "Gospodarstwo",
          summary: "Powrót Tadeusza do rodzinnego domu w Soplicowie.",
          keyEvents: ["Przyjazd Tadeusza", "Spotkanie z Zosią", "Opis dworu"],
        },
        {
          workId: panTadeusz.id,
          number: 2,
          title: "Zamek",
          summary:
            "Wyprawa na ruiny zamku i spór o zamek między Sędzią a Hrabią.",
          keyEvents: ["Wizyta w zamku", "Spór prawny", "Historia zamku"],
        },
      ],
    });

    // 4. Postacie
    await prisma.character.createMany({
      data: [
        {
          workId: panTadeusz.id,
          name: "Tadeusz Soplica",
          description:
            "Główny bohater, młody szlachcic powracający z nauk w mieście.",
          role: "główny",
          traits: ["romantyczny", "patriotyczny", "honorowy"],
          quotes: ["Litwo! Ojczyzno moja!"],
        },
        {
          workId: panTadeusz.id,
          name: "Zosia",
          description: "Wychowanka Telimeny, przedmiot westchnień Tadeusza.",
          role: "główny",
          traits: ["piękna", "naturalna", "skromna"],
          quotes: [],
        },
      ],
    });

    // 5. Cytaty
    await prisma.quote.create({
      data: {
        workId: panTadeusz.id,
        text: "Litwo! Ojczyzno moja! ty jesteś jak zdrowie. Ile cię trzeba cenić, ten tylko się dowie, kto cię stracił.",
        context: "Inwokacja - początek utworu",
        significance:
          "Wyraz tęsknoty za ojczyzną, kluczowy motyw patriotyczny.",
        tags: ["patriotyzm", "tęsknota", "ojczyzna"],
      },
    });

    // 6. Materiały edukacyjne
    const material1 = await prisma.material.create({
      data: {
        title: "Pan Tadeusz - Kompleksowe opracowanie",
        slug: "pan-tadeusz-opracowanie",
        type: "WORK_ANALYSIS",
        category: "LITERATURE",
        content: {
          blocks: [
            {
              type: "heading",
              content: "Wprowadzenie do epopei narodowej",
            },
            {
              type: "paragraph",
              content:
                "Pan Tadeusz to najważniejsze dzieło polskiego romantyzmu, napisane przez Adama Mickiewicza podczas emigracji w Paryżu.",
            },
            {
              type: "heading",
              content: "Geneza utworu",
            },
            {
              type: "paragraph",
              content:
                "Mickiewicz napisał Pana Tadeusza w latach 1832-1834, tęskniąc za ojczyzną.",
            },
          ],
        },
        summary: "Szczegółowa analiza epopei narodowej Adama Mickiewicza.",
        epoch: "ROMANTICISM",
        workId: panTadeusz.id,
        tags: ["Mickiewicz", "epopeja", "lektura obowiązkowa", "romantyzm"],
        difficulty: 2,
        readingTime: 45,
        isPremium: false,
        isPublished: true,
        views: 0,
        publishedAt: new Date(),
      },
    });

    // 7. Terminy literackie
    await prisma.literaryTerm.createMany({
      data: [
        {
          term: "Epopeja",
          category: "gatunki",
          definition:
            "Rozległy utwór epicki opisujący ważne wydarzenia z życia narodu lub bohatera.",
          examples: ["Pan Tadeusz", "Iliada", "Odyseja"],
          relatedTerms: ["epos", "poemat epicki"],
        },
        {
          term: "Inwokacja",
          category: "środki stylistyczne",
          definition:
            "Uroczyste wezwanie do bóstwa, muzy lub ojczyzny na początku utworu.",
          examples: ["Litwo! Ojczyzno moja!"],
          relatedTerms: ["apostrofa", "wezwanie"],
        },
      ],
    });

    console.log("✅ Materials seeded successfully!");
    console.log(`Created:
      - 1 epoch info
      - 1 literary work
      - 2 chapters
      - 2 characters
      - 1 quote
      - 1 material
      - 2 literary terms`);
  } catch (error) {
    console.error("❌ Error seeding materials:", error);
    throw error;
  }
}

// Uruchom seed
seedMaterials()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
