// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ========== LANGUAGE_USE - CLOSED_SINGLE (20 pytań) ==========
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest rzeczownikiem?",
      content: {
        options: ["szybko", "szybkość", "szybki", "przyspieszać"],
      },
      correctAnswer: 1, // B - szybkość
      metadata: {
        explanation:
          "Rzeczownik to część mowy oznaczająca osobę, rzecz, zjawisko.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym zdaniu występuje przydawka?",
      content: {
        options: [
          "Chłopiec biegnie.",
          "Szybko idź!",
          "Czerwony samochód jedzie.",
          "Ona śpiewa.",
        ],
      },
      correctAnswer: 2, // C - Czerwony samochód
      metadata: {
        explanation:
          "Przydawka określa rzeczownik (czerwony określa samochód).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który frazeologizm oznacza 'mówić nieprawdę'?",
      content: {
        options: [
          "mydlić komuś oczy",
          "brać nogi za pas",
          "mieć węża w kieszeni",
          "siedzieć jak na szpilkach",
        ],
      },
      correctAnswer: 0, // A - mydlić komuś oczy
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "W którym wyrażeniu występuje metafora?",
      content: {
        options: [
          "głośny jak dzwon",
          "morze łez",
          "iść szybko",
          "bardzo wesoły",
        ],
      },
      correctAnswer: 1, // B - morze łez
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które zdanie jest pojedyncze?",
      content: {
        options: [
          "Przyszedł i usiadł.",
          "Maria czyta książkę.",
          "Gdy świeci słońce, jest ciepło.",
          "Pada deszcz, więc zostanę w domu.",
        ],
      },
      correctAnswer: 1, // B - Maria czyta książkę
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest epitet?",
      content: {
        options: [
          "Porównanie dwóch zjawisk",
          "Określenie podkreślające cechę",
          "Powtórzenie wyrazu",
          "Pytanie retoryczne",
        ],
      },
      correctAnswer: 1, // B
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "W którym zdaniu występuje podmiot domyślny?",
      content: {
        options: [
          "Pada deszcz.",
          "Czytam książkę.",
          "On śpiewa.",
          "Było zimno.",
        ],
      },
      correctAnswer: 1, // B - (ja) czytam
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest antonimem słowa 'radość'?",
      content: {
        options: ["wesołość", "szczęście", "smutek", "euforia"],
      },
      correctAnswer: 2, // C - smutek
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile sylab ma wyraz 'matematyka'?",
      content: {
        options: ["3", "4", "5", "6"],
      },
      correctAnswer: 2, // C - 5 (ma-te-ma-ty-ka)
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "W którym zdaniu występuje orzeczenie imienne?",
      content: {
        options: [
          "Piotr śpiewa piosenkę.",
          "Anna jest lekarzem.",
          "Dzieci bawią się w parku.",
          "Mama gotuje obiad.",
        ],
      },
      correctAnswer: 1, // B - jest lekarzem
    },

    // ========== LANGUAGE_USE - CLOSED_MULTIPLE (15 pytań) ==========
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są czasownikami?",
      content: {
        options: ["biegać", "bieg", "biegnący", "pobiec"],
      },
      correctAnswer: [0, 3], // A i D
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których zdaniach występuje metafora?",
      content: {
        options: [
          "Czas płynie jak rzeka.",
          "Jego serce jest z kamienia.",
          "Słońce zachodzi.",
          "Morze wspomnień zalewa mnie.",
        ],
      },
      correctAnswer: [1, 3], // B i D
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są synonimami?",
      content: {
        options: ["dom", "mieszkanie", "budynek", "chata"],
      },
      correctAnswer: [0, 1, 3], // A, B, D
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których wyrazach występuje przedrostek?",
      content: {
        options: ["napisać", "pisać", "podpisać", "spisać"],
      },
      correctAnswer: [0, 2, 3], // A, C, D
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Które zdania zawierają zdanie podrzędne?",
      content: {
        options: [
          "Myślę, więc jestem.",
          "Gdy świeci słońce, jest ciepło.",
          "Przyszedł i usiadł.",
          "Wiem, że masz rację.",
        ],
      },
      correctAnswer: [1, 3], // B i D
    },

    // ========== LANGUAGE_USE - SHORT_ANSWER (15 pytań) ==========
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question:
        "Wyjaśnij różnicę znaczeniową między wyrazami 'bezdomny' a 'bezdomowy'.",
      content: {
        requirements: ["różnica znaczeniowa", "przykłady użycia"],
      },
      rubric: {
        criteria: [
          { name: "bezdomny - człowiek", points: 1 },
          { name: "bezdomowy - zwierzę", points: 1 },
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Podaj trzy cechy stylu publicystycznego.",
      content: {
        requirements: ["3 cechy", "styl publicystyczny"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question:
        "Czym różni się mowa zależna od mowy niezależnej? Podaj przykład.",
      content: {
        requirements: ["różnica", "przykład"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 3,
      question: "Wyjaśnij funkcję anafor w tekście poetyckim.",
      content: {
        requirements: ["definicja anafory", "funkcja w poezji"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Na czym polega ironia? Podaj przykład z literatury.",
      content: {
        requirements: ["definicja ironii", "przykład literacki"],
      },
    },

    // ========== LANGUAGE_USE - SYNTHESIS_NOTE (10 pytań) ==========
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question:
        "Napisz notatkę syntetyzującą na temat: Środki stylistyczne w poezji (60-90 słów).",
      content: {
        requirements: [
          "definicja środków stylistycznych",
          "przykłady (min. 3)",
          "funkcja w poezji",
          "60-90 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question:
        "Sporządź notatkę: Różnice między językiem mówionym a pisanym (80-100 słów).",
      content: {
        requirements: [
          "cechy języka mówionego",
          "cechy języka pisanego",
          "główne różnice",
          "80-100 słów",
        ],
      },
    },

    // ========== HISTORICAL_LITERARY - CLOSED_SINGLE (20 pytań) ==========
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      question: "Kto napisał 'Dziady'?",
      content: {
        options: [
          "Juliusz Słowacki",
          "Adam Mickiewicz",
          "Cyprian Norwid",
          "Zygmunt Krasiński",
        ],
      },
      correctAnswer: 1, // B - Mickiewicz
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Która powieść należy do twórczości Bolesława Prusa?",
      content: {
        options: ["Quo Vadis", "Chłopi", "Lalka", "Przedwiośnie"],
      },
      correctAnswer: 2, // C - Lalka
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      question: "W którym wieku przypadało Oświecenie w Polsce?",
      content: {
        options: ["XVI", "XVII", "XVIII", "XIX"],
      },
      correctAnswer: 2, // C - XVIII
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "YOUNG_POLAND",
      question: "Który utwór jest manifestem Młodej Polski?",
      content: {
        options: [
          "Confiteor",
          "Manifest Futurystów",
          "Manifest Komunistyczny",
          "Romantyczność",
        ],
      },
      correctAnswer: 0, // A - Confiteor
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      question: "Kto był autorem 'Trenów'?",
      content: {
        options: [
          "Mikołaj Rej",
          "Jan Kochanowski",
          "Łukasz Górnicki",
          "Andrzej Frycz Modrzewski",
        ],
      },
      correctAnswer: 1, // B - Kochanowski
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      question: "Który poeta barokowy pisał o 'vanitas'?",
      content: {
        options: [
          "Jan Andrzej Morsztyn",
          "Daniel Naborowski",
          "Mikołaj Sęp-Szarzyński",
          "Wszyscy wymienieni",
        ],
      },
      correctAnswer: 3, // D - wszyscy
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      question: "Kto napisał 'Ferdydurke'?",
      content: {
        options: [
          "Stanisław Ignacy Witkiewicz",
          "Witold Gombrowicz",
          "Bruno Schulz",
          "Czesław Miłosz",
        ],
      },
      correctAnswer: 1, // B - Gombrowicz
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jak nazywa się najstarszy zachowany polski zabytek literacki?",
      content: {
        options: [
          "Bogurodzica",
          "Kazania świętokrzyskie",
          "Psałterz floriański",
          "Kronika Galla Anonima",
        ],
      },
      correctAnswer: 0, // A - Bogurodzica
    },

    // ========== HISTORICAL_LITERARY - CLOSED_MULTIPLE (15 pytań) ==========
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      question:
        "Które utwory należą do wielkiej emigracyjnej literatury romantycznej?",
      content: {
        options: ["Pan Tadeusz", "Kordian", "Nie-Boska komedia", "Balladyna"],
      },
      correctAnswer: [0, 1, 2], // A, B, C
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      question: "Którzy pisarze otrzymali literacką Nagrodę Nobla?",
      content: {
        options: [
          "Czesław Miłosz",
          "Zbigniew Herbert",
          "Wisława Szymborska",
          "Tadeusz Różewicz",
        ],
      },
      correctAnswer: [0, 2], // A i C
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      question: "Które hasła były charakterystyczne dla pozytywizmu?",
      content: {
        options: [
          "praca organiczna",
          "praca u podstaw",
          "sztuka dla sztuki",
          "asymilacja Żydów",
        ],
      },
      correctAnswer: [0, 1, 3], // A, B, D
    },

    // ========== HISTORICAL_LITERARY - SHORT_ANSWER (15 pytań) ==========
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      question:
        "Wyjaśnij pojęcie 'koncepcji mesjanistycznej' w romantyzmie polskim.",
      content: {
        requirements: ["definicja mesjanizmu", "kontekst polski", "przykład"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      question: "Na czym polegał klasycyzm w literaturze oświecenia?",
      content: {
        requirements: [
          "cechy klasycyzmu",
          "wzorce antyczne",
          "przykład utworu",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      question: "Wyjaśnij symbolikę w poezji młodopolskiej.",
      content: {
        requirements: ["definicja symbolizmu", "przykłady symboli", "funkcja"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      question: "Czym był humanizm renesansowy?",
      content: {
        requirements: ["definicja", "główne założenia", "wpływ na literaturę"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      question: "Jakie są cechy poezji lingwistycznej?",
      content: {
        requirements: ["definicja", "przedstawiciele", "przykłady"],
      },
    },

    // ========== WRITING - ESSAY (20 pytań) ==========
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 3,
      points: 35,
      epoch: "ROMANTICISM",
      question:
        "Motyw miłości tragicznej w literaturze romantycznej. Omów na przykładzie wybranych utworów.",
      content: {
        requirements: ["min. 400 słów", "2 utwory", "cytaty"],
        topics: ["miłość", "tragizm", "romantyzm"],
      },
      metadata: {
        wordLimit: { min: 400, max: 600 },
        requiredReadings: ["Dziady cz. IV", "Kordian"],
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 35,
      epoch: "POSITIVISM",
      question:
        "Konflikty społeczne w powieści pozytywistycznej. Przedstaw problem na podstawie 'Lalki' B. Prusa.",
      content: {
        requirements: [
          "min. 400 słów",
          "analiza konfliktów",
          "kontekst historyczny",
        ],
        topics: ["społeczeństwo", "klasy społeczne", "pozytywizm"],
      },
      metadata: {
        wordLimit: { min: 400, max: 600 },
        requiredReadings: ["Lalka"],
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 40,
      epoch: "CONTEMPORARY",
      question:
        "Człowiek wobec historii w literaturze XX wieku. Omów zagadnienie, odwołując się do wybranych tekstów.",
      content: {
        requirements: ["min. 500 słów", "3 utwory", "różne perspektywy"],
        topics: ["historia", "wojna", "pamięć"],
      },
      metadata: {
        wordLimit: { min: 500, max: 700 },
        requiredReadings: ["Zdążyć przed Panem Bogiem", "Medaliony"],
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 35,
      question:
        "Motyw wędrówki jako metafora życia. Przedstaw na przykładach z różnych epok.",
      content: {
        requirements: ["min. 400 słów", "2 epoki", "porównanie"],
        topics: ["wędrówka", "życie", "rozwój"],
      },
      metadata: {
        wordLimit: { min: 400, max: 600 },
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 3,
      points: 35,
      epoch: "ENLIGHTENMENT",
      question:
        "Wzorzec obywatela w literaturze oświecenia. Omów na wybranych przykładach.",
      content: {
        requirements: ["min. 400 słów", "cechy obywatela", "przykłady"],
        topics: ["obywatelskość", "patriotyzm", "oświecenie"],
      },
      metadata: {
        wordLimit: { min: 400, max: 600 },
      },
    },
  ];

  // Dodaj tagi do wszystkich pytań
  const exercisesWithTags = exercises.map((exercise) => ({
    ...exercise,
    tags: [
      exercise.category.toLowerCase(),
      exercise.type.toLowerCase(),
      `difficulty-${exercise.difficulty}`,
      exercise.epoch ? exercise.epoch.toLowerCase() : null,
      `batch-2025-01`,
    ].filter(Boolean),
  }));

  // Wstaw do bazy
  for (const exercise of exercisesWithTags) {
    try {
      await prisma.exercise.create({
        data: exercise as any,
      });
      console.log(`✅ Created: ${exercise.question.substring(0, 50)}...`);
    } catch (error) {
      console.error(
        `❌ Failed: ${exercise.question.substring(0, 50)}...`,
        error
      );
    }
  }

  console.log(
    `\n✨ Seeding completed! Added ${exercisesWithTags.length} exercises.`
  );
}

// Uruchom seed
seedExercises()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
