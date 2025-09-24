// backend/src/seeds/examSeed.ts

import {
  PrismaClient,
  ExerciseType,
  Category,
  LiteraryEpoch,
} from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Rozpoczynam seed dla systemu egzaminacyjnego...");

  // 1. TWORZENIE STRUKTUR EGZAMINACYJNYCH (bez konkretnych pytań!)
  console.log("📝 Tworzę struktury egzaminów...");

  await prisma.mockExam.create({
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

  await prisma.mockExam.create({
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
      type: ExerciseType.SHORT_ANSWER,
      category: Category.LANGUAGE_USE,
      difficulty: 2,
      question:
        "Wyjaśnij znaczenie frazeologizmu 'mieć muchy w nosie' i podaj przykład jego użycia.",
      tags: ["frazeologia", "język", "znaczenie"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.LANGUAGE_USE,
      difficulty: 2,
      question:
        "Przekształć zdanie pojedyncze w złożone: 'Uczniowie czytający książki rozwijają wyobraźnię.'",
      tags: ["składnia", "zdania", "przekształcenia"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.LANGUAGE_USE,
      difficulty: 3,
      question:
        "Wyjaśnij różnicę między metaforą a porównaniem. Podaj po jednym przykładzie.",
      tags: ["środki stylistyczne", "metafora", "porównanie"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.SYNTHESIS_NOTE,
      category: Category.LANGUAGE_USE,
      difficulty: 3,
      question:
        "Na podstawie podanego fragmentu napisz notatkę syntetyzującą główne cechy stylu autora (60-90 słów).",
      tags: ["notatka", "styl", "synteza"],
      metadata: { isExamQuestion: true },
    },
  ];

  // PYTANIA ZAMKNIĘTE z content
  const pytaniaZamkniete = [
    {
      type: ExerciseType.CLOSED_MULTIPLE,
      category: Category.LANGUAGE_USE,
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
      },
      correctAnswer: [0, 1, 3, 5],
      tags: ["zapożyczenia", "słownictwo"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.CLOSED_SINGLE,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 2,
      question: "W której epoce powstały 'Dziady' Adama Mickiewicza?",
      content: {
        options: ["Oświecenie", "Romantyzm", "Pozytywizm", "Młoda Polska"],
      },
      correctAnswer: 1,
      tags: ["epoki", "romantyzm", "Mickiewicz"],
      metadata: { isExamQuestion: true },
      epoch: LiteraryEpoch.ROMANTICISM,
    },
    {
      type: ExerciseType.CLOSED_SINGLE,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 2,
      question: "Kto jest autorem 'Lalki'?",
      content: {
        options: [
          "Henryk Sienkiewicz",
          "Bolesław Prus",
          "Władysław Reymont",
          "Stefan Żeromski",
        ],
      },
      correctAnswer: 1,
      tags: ["pozytywizm", "powieść", "Prus"],
      metadata: { isExamQuestion: true },
      epoch: LiteraryEpoch.POSITIVISM,
    },
    {
      type: ExerciseType.CLOSED_MULTIPLE,
      category: Category.HISTORICAL_LITERARY,
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
      },
      correctAnswer: [0, 2, 3, 5],
      tags: ["awangarda", "dwudziestolecie", "poezja"],
      metadata: { isExamQuestion: true },
      epoch: LiteraryEpoch.INTERWAR,
    },
  ];

  // PYTANIA HISTORYCZNOLITERACKIE (poziom podstawowy)
  const historycznoPytaniaPodstawowe = [
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 3,
      question: "Wyjaśnij symbolikę tytułu 'Wesela' Stanisława Wyspiańskiego.",
      tags: ["Młoda Polska", "Wyspiański", "symbolizm"],
      metadata: { isExamQuestion: true },
      epoch: LiteraryEpoch.YOUNG_POLAND,
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 3,
      question: "Opisz motyw wielkiej emigracji w literaturze romantycznej.",
      tags: ["romantyzm", "emigracja", "motywy"],
      metadata: { isExamQuestion: true },
      epoch: LiteraryEpoch.ROMANTICISM,
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 2,
      question: "Wymień trzy cechy gatunkowe ballady romantycznej.",
      tags: ["gatunki", "ballada", "romantyzm"],
      metadata: { isExamQuestion: true },
      epoch: LiteraryEpoch.ROMANTICISM,
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 3,
      question: "Porównaj kreację bohatera romantycznego i pozytywistycznego.",
      tags: ["bohater", "romantyzm", "pozytywizm"],
      metadata: { isExamQuestion: true },
    },
  ];

  // WYPRACOWANIA
  const wypracowania = [
    {
      type: ExerciseType.ESSAY,
      category: Category.WRITING,
      difficulty: 3,
      question:
        "Temat 1: Rola przyjaźni w życiu człowieka. W pracy odwołaj się do wybranej lektury obowiązkowej oraz innych tekstów kultury.",
      tags: ["wypracowanie", "przyjaźń", "lektura"],
      metadata: { isExamQuestion: true, minWords: 400 },
    },
    {
      type: ExerciseType.ESSAY,
      category: Category.WRITING,
      difficulty: 4,
      question:
        "Temat 2: Konflikt między jednostką a społeczeństwem w literaturze. Omów problem na przykładzie wybranych utworów.",
      tags: ["wypracowanie", "konflikt", "społeczeństwo"],
      metadata: { isExamQuestion: true, minWords: 400 },
    },
    {
      type: ExerciseType.ESSAY,
      category: Category.WRITING,
      difficulty: 5,
      question:
        "Temat 3: Czy literatura może zmieniać rzeczywistość? Rozważ problem w kontekście wybranych utworów z różnych epok.",
      tags: ["wypracowanie", "literatura zaangażowana", "epoki"],
      metadata: { isExamQuestion: true, minWords: 500 },
    },
    {
      type: ExerciseType.ESSAY,
      category: Category.WRITING,
      difficulty: 3,
      question:
        "Temat 4: Miłość jako źródło cierpienia i szczęścia. Omów zagadnienie na podstawie wybranych tekstów.",
      tags: ["wypracowanie", "miłość", "uczucia"],
      metadata: { isExamQuestion: true, minWords: 400 },
    },
    {
      type: ExerciseType.ESSAY,
      category: Category.WRITING,
      difficulty: 4,
      question:
        "Temat 5: Motyw wędrówki w literaturze. Przedstaw różne jej znaczenia i funkcje.",
      tags: ["wypracowanie", "wędrówka", "motyw"],
      metadata: { isExamQuestion: true, minWords: 400 },
    },
  ];

  // PYTANIA ROZSZERZONE
  const pytaniaRozszerzone = [
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.LANGUAGE_USE,
      difficulty: 4,
      question:
        "Przeanalizuj funkcje stylistyczne anafor w podanym fragmencie poetyckim.",
      tags: ["stylistyka", "anafora", "poezja"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.LANGUAGE_USE,
      difficulty: 5,
      question:
        "Wyjaśnij zjawisko neosemantyzacji na przykładzie współczesnego języka polskiego.",
      tags: ["językoznawstwo", "neosemantyzacja", "współczesność"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.SYNTHESIS_NOTE,
      category: Category.LANGUAGE_USE,
      difficulty: 4,
      question:
        "Porównaj style wypowiedzi w dwóch podanych fragmentach publicystycznych (80-120 słów).",
      tags: ["publicystyka", "styl", "porównanie"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 4,
      question: "Omów recepcję 'Dziadów' w różnych epokach literackich.",
      tags: ["Dziady", "recepcja", "epoki"],
      metadata: { isExamQuestion: true },
    },
    {
      type: ExerciseType.SHORT_ANSWER,
      category: Category.HISTORICAL_LITERARY,
      difficulty: 5,
      question:
        "Porównaj koncepcję tragizmu w dramatach antycznych i romantycznych.",
      tags: ["tragizm", "dramat", "komparatystyka"],
      metadata: { isExamQuestion: true },
    },
  ];

  // Dodaj pytania - tylko otwarte (bez epoch)
  for (const pytanie of jezykPytaniaPodstawowe) {
    await prisma.exercise.create({
      data: {
        type: pytanie.type,
        category: pytanie.category,
        difficulty: pytanie.difficulty,
        question: pytanie.question,
        tags: pytanie.tags,
        metadata: pytanie.metadata,
        content: {},
        points:
          pytanie.type === ExerciseType.SYNTHESIS_NOTE
            ? 4
            : pytanie.type === ExerciseType.SHORT_ANSWER
            ? 2
            : 1,
      },
    });
  }

  // Dodaj pytania historycznoliterackie z epoch
  for (const pytanie of historycznoPytaniaPodstawowe) {
    await prisma.exercise.create({
      data: {
        type: pytanie.type,
        category: pytanie.category,
        difficulty: pytanie.difficulty,
        question: pytanie.question,
        tags: pytanie.tags,
        metadata: pytanie.metadata,
        content: {},
        points: 2,
        epoch: pytanie.epoch || null,
      },
    });
  }

  // Dodaj pytania zamknięte
  for (const pytanie of pytaniaZamkniete) {
    await prisma.exercise.create({
      data: {
        type: pytanie.type,
        category: pytanie.category,
        difficulty: pytanie.difficulty,
        question: pytanie.question,
        tags: pytanie.tags,
        metadata: pytanie.metadata,
        content: pytanie.content,
        correctAnswer: pytanie.correctAnswer,
        points: pytanie.type === ExerciseType.CLOSED_MULTIPLE ? 2 : 1,
        epoch: pytanie.epoch || null,
      },
    });
  }

  // Dodaj wypracowania
  for (const wypracowanie of wypracowania) {
    await prisma.exercise.create({
      data: {
        type: wypracowanie.type,
        category: wypracowanie.category,
        difficulty: wypracowanie.difficulty,
        question: wypracowanie.question,
        tags: wypracowanie.tags,
        metadata: wypracowanie.metadata,
        content: {},
        points:
          wypracowanie.difficulty === 3
            ? 35
            : wypracowanie.difficulty === 4
            ? 38
            : 40,
      },
    });
  }

  // Dodaj pytania rozszerzone
  for (const pytanie of pytaniaRozszerzone) {
    await prisma.exercise.create({
      data: {
        type: pytanie.type,
        category: pytanie.category,
        difficulty: pytanie.difficulty,
        question: pytanie.question,
        tags: pytanie.tags,
        metadata: pytanie.metadata,
        content: {},
        points: pytanie.type === ExerciseType.SYNTHESIS_NOTE ? 5 : 3,
      },
    });
  }

  const totalQuestions =
    jezykPytaniaPodstawowe.length +
    pytaniaZamkniete.length +
    historycznoPytaniaPodstawowe.length +
    wypracowania.length +
    pytaniaRozszerzone.length;

  console.log(`✅ Utworzono ${totalQuestions} pytań egzaminacyjnych!`);

  // 3. UTWÓRZ PRZYKŁADOWEGO UŻYTKOWNIKA
  console.log("👤 Sprawdzam użytkownika testowego...");

  const existingUser = await prisma.user.findUnique({
    where: { email: "student@test.pl" },
  });

  if (!existingUser) {
    const hashedPassword = await hash("test123", 10);

    await prisma.user.create({
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
            averageScore: 0,
          },
        },
      },
    });

    console.log(
      "✅ Użytkownik testowy utworzony (email: student@test.pl, hasło: test123)"
    );
  } else {
    console.log("ℹ️ Użytkownik testowy już istnieje");
  }

  console.log("\n🎉 Seed zakończony pomyślnie!");
  console.log("📊 Statystyki:");
  console.log(`   - Struktury egzaminów: 2`);
  console.log(`   - Pytania egzaminacyjne: ${totalQuestions}`);
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
