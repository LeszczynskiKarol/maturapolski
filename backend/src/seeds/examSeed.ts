// backend/src/seeds/examSeed.ts

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Rozpoczynam seed dla systemu egzaminacyjnego...");

  // 1. TWORZENIE STRUKTUR EGZAMINACYJNYCH (bez konkretnych pytań!)
  console.log("📝 Tworzę struktury egzaminów...");

  const examPodstawowy = await prisma.mockExam.create({
    data: {
      title: "Egzamin Maturalny 2025 - Poziom Podstawowy (Dynamiczny)",
      year: 2025,
      type: "PODSTAWOWY",
      duration: 240,
      isActive: true,
      sections: {
        create: [
          {
            order: 1,
            title: "Arkusz 1 - Część 1: Język polski w użyciu",
            instruction:
              "Przeczytaj uważnie teksty, a następnie wykonaj zadania.",
            timeLimit: 45,
            // NIE dodajemy questions - system dobierze je dynamicznie!
          },
          {
            order: 2,
            title: "Arkusz 1 - Część 2: Test historycznoliteracki",
            instruction: "Wykonaj zadania. Odpowiadaj tylko własnymi słowami.",
            timeLimit: 45,
          },
          {
            order: 3,
            title: "Arkusz 2 - Wypracowanie",
            instruction: "Wybierz jeden z tematów i napisz wypracowanie.",
            timeLimit: 150,
          },
        ],
      },
    },
  });

  const examRozszerzony = await prisma.mockExam.create({
    data: {
      title: "Egzamin Maturalny 2025 - Poziom Rozszerzony (Dynamiczny)",
      year: 2025,
      type: "ROZSZERZONY",
      duration: 300,
      isActive: true,
      sections: {
        create: [
          {
            order: 1,
            title: "Arkusz 1 - Część 1: Język polski w użyciu",
            instruction: "Zaawansowane zadania językowe.",
            timeLimit: 60,
          },
          {
            order: 2,
            title: "Arkusz 1 - Część 2: Test historycznoliteracki",
            instruction: "Pogłębiona wiedza o literaturze.",
            timeLimit: 60,
          },
          {
            order: 3,
            title: "Arkusz 2 - Wypracowanie",
            instruction: "Zaawansowany temat wymagający głębokiej analizy.",
            timeLimit: 180,
          },
        ],
      },
    },
  });

  console.log("✅ Struktury egzaminów utworzone!");

  // 2. TWORZENIE PULI PYTAŃ EGZAMINACYJNYCH
  console.log("🎯 Tworzę pulę pytań egzaminacyjnych...");

  // PYTANIA - JĘZYK W UŻYCIU (poziom podstawowy)
  const jezykPytaniaPodstawowe = [
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      question:
        "Wyjaśnij znaczenie frazeologizmu 'mieć muchy w nosie' i podaj przykład jego użycia.",
      correctAnswer: null, // Oceniane przez AI
      tags: ["frazeologia", "język", "znaczenie"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      question:
        "Przekształć zdanie pojedyncze w złożone: 'Uczniowie czytający książki rozwijają wyobraźnię.'",
      correctAnswer: null,
      tags: ["składnia", "zdania", "przekształcenia"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      question:
        "Wyjaśnij różnicę między metaforą a porównaniem. Podaj po jednym przykładzie.",
      correctAnswer: null,
      tags: ["środki stylistyczne", "metafora", "porównanie"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      question:
        "Na podstawie podanego fragmentu napisz notatkę syntetyzującą główne cechy stylu autora (60-90 słów).",
      correctAnswer: null,
      tags: ["notatka", "styl", "synteza"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      question:
        "Które z podanych wyrazów są zapożyczeniami z języka angielskiego?",
      content: {
        options: [
          "komputer",
          "marketing",
          "telefon",
          "weekend",
          "kawiarnia",
          "biznes",
        ],
        correctAnswer: [0, 1, 3, 5], // komputer, marketing, weekend, biznes
      },
      tags: ["zapożyczenia", "słownictwo"],
      metadata: { isExamQuestion: true },
    },
  ];

  // PYTANIA - HISTORYCZNOLITERACKIE (poziom podstawowy)
  const historycznoPytaniaPodstawowe = [
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      question: "W której epoce powstały 'Dziady' Adama Mickiewicza?",
      content: {
        options: ["Oświecenie", "Romantyzm", "Pozytywizm", "Młoda Polska"],
        correctAnswer: 1, // Romantyzm
      },
      tags: ["epoki", "romantyzm", "Mickiewicz"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      question: "Kto jest autorem 'Lalki'?",
      content: {
        options: [
          "Henryk Sienkiewicz",
          "Bolesław Prus",
          "Władysław Reymont",
          "Stefan Żeromski",
        ],
        correctAnswer: 1, // Bolesław Prus
      },
      tags: ["pozytywizm", "powieść", "Prus"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      question: "Wyjaśnij symbolikę tytułu 'Wesela' Stanisława Wyspiańskiego.",
      correctAnswer: null, // Oceniane przez AI
      tags: ["Młoda Polska", "Wyspiański", "symbolizm"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      question: "Opisz motyw wielkiej emigracji w literaturze romantycznej.",
      correctAnswer: null,
      tags: ["romantyzm", "emigracja", "motywy"],
      metadata: { isExamQuestion: true },
    },
  ];

  // PYTANIA - WYPRACOWANIA (różne poziomy)
  const wypracowania = [
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 3,
      question:
        "Temat 1: Rola przyjaźni w życiu człowieka. W pracy odwołaj się do wybranej lektury obowiązkowej oraz innych tekstów kultury.",
      correctAnswer: null, // Oceniane przez AI
      tags: ["wypracowanie", "przyjaźń", "lektura"],
      metadata: { isExamQuestion: true, minWords: 400 },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      question:
        "Temat 2: Konflikt między jednostką a społeczeństwem w literaturze. Omów problem na przykładzie wybranych utworów.",
      correctAnswer: null,
      tags: ["wypracowanie", "konflikt", "społeczeństwo"],
      metadata: { isExamQuestion: true, minWords: 400 },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      question:
        "Temat 3: Czy literatura może zmieniać rzeczywistość? Rozważ problem w kontekście wybranych utworów z różnych epok.",
      correctAnswer: null,
      tags: ["wypracowanie", "literatura zaangażowana", "epoki"],
      metadata: { isExamQuestion: true, minWords: 500 },
    },
  ];

  // PYTANIA DLA POZIOMU ROZSZERZONEGO
  const jezykPytaniaRozszerzone = [
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 4,
      question:
        "Przeanalizuj funkcje stylistyczne anafor w podanym fragmencie poetyckim.",
      correctAnswer: null,
      tags: ["stylistyka", "anafora", "poezja"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      question:
        "Wyjaśnij zjawisko neosemantyzacji na przykładzie współczesnego języka polskiego.",
      correctAnswer: null,
      tags: ["językoznawstwo", "neosemantyzacja", "współczesność"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      question:
        "Porównaj style wypowiedzi w dwóch podanych fragmentach publicystycznych (80-120 słów).",
      correctAnswer: null,
      tags: ["publicystyka", "styl", "porównanie"],
      metadata: { isExamQuestion: true },
    },
  ];

  const historycznoPytaniaRozszerzone = [
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      question: "Omów recepcję 'Dziadów' w różnych epokach literackich.",
      correctAnswer: null,
      tags: ["Dziady", "recepcja", "epoki"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      question:
        "Porównaj koncepcję tragizmu w dramatach antycznych i romantycznych.",
      correctAnswer: null,
      tags: ["tragizm", "dramat", "komparatystyka"],
      metadata: { isExamQuestion: true },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      question:
        "Które z podanych cech charakteryzują poetykę awangardy Krakowskiej?",
      content: {
        options: [
          "Eksperyment formalny",
          "Nawiązanie do tradycji",
          "Metaforyka",
          "Antyestetyzm",
          "Klasycyzm",
          "Urbanizm",
        ],
        correctAnswer: [0, 2, 3, 5], // Eksperyment, Metaforyka, Antyestetyzm, Urbanizm
      },
      tags: ["awangarda", "dwudziestolecie", "poezja"],
      metadata: { isExamQuestion: true },
    },
  ];

  // Dodaj wszystkie pytania do bazy
  const wszystkiePytania = [
    ...jezykPytaniaPodstawowe,
    ...historycznoPytaniaPodstawowe,
    ...wypracowania,
    ...jezykPytaniaRozszerzone,
    ...historycznoPytaniaRozszerzone,
  ];

  for (const pytanie of wszystkiePytania) {
    await prisma.exercise.create({
      data: {
        ...pytanie,
        content: pytanie.content || {},
        correctAnswer: pytanie.correctAnswer,
      },
    });
  }

  console.log(`✅ Utworzono ${wszystkiePytania.length} pytań egzaminacyjnych!`);

  // 3. UTWÓRZ PRZYKŁADOWEGO UŻYTKOWNIKA (opcjonalne)
  console.log("👤 Tworzę użytkownika testowego...");

  const hashedPassword = await hash("test123", 10);

  const testUser = await prisma.user.create({
    data: {
      email: "student@test.pl",
      password: hashedPassword,
      firstName: "Jan",
      lastName: "Testowy",
      role: "STUDENT",
      profile: {
        create: {
          level: 3,
          totalPoints: 0,
          streakDays: 0,
          averageScore: 0,
        },
      },
    },
  });

  console.log(
    "✅ Użytkownik testowy utworzony (email: student@test.pl, hasło: test123)"
  );

  console.log("\n🎉 Seed zakończony pomyślnie!");
  console.log("📊 Statystyki:");
  console.log(`   - Struktury egzaminów: 2`);
  console.log(`   - Pytania egzaminacyjne: ${wszystkiePytania.length}`);
  console.log(`   - Użytkownicy testowi: 1`);
}

main()
  .catch((e) => {
    console.error("❌ Błąd podczas seedowania:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
