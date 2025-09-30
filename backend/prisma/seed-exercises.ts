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
      question: "Który wyraz jest liczebnikiem?",
      content: { options: ["piąty", "piątka", "piątkowy", "piątkować"] },
      correctAnswer: 0,
      metadata: { explanation: "Liczebnik porządkowy - piąty" },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym zdaniu występuje okolicznik miejsca?",
      content: {
        options: [
          "Śpiewał głośno",
          "Przyszedł wczoraj",
          "Stał tam",
          "Czytał wolno",
        ],
      },
      correctAnswer: 2,
      metadata: { explanation: "Tam - okolicznik miejsca (gdzie?)" },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które słowo jest spójnikiem?",
      content: { options: ["bardzo", "oraz", "tutaj", "szybko"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest apostrofa?",
      content: {
        options: [
          "Zwrot do nieobecnej osoby",
          "Powtórzenie",
          "Porównanie",
          "Przemilczenie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz zawiera przedrostek?",
      content: { options: ["domek", "nadejść", "pisarz", "czerwony"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest hiperbola?",
      content: {
        options: [
          "Wyolbrzymienie",
          "Pomniejszenie",
          "Porównanie",
          "Przeciwstawienie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest partykułą?",
      content: { options: ["niech", "może", "czy", "ale"] },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "W którym wyrażeniu występuje peryfraza?",
      content: {
        options: [
          "czarne złoto",
          "biały śnieg",
          "wysoki dom",
          "szybki samochód",
        ],
      },
      correctAnswer: 0,
      metadata: { explanation: "Czarne złoto = węgiel (peryfraza)" },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Które zdanie jest rozkazujące?",
      content: {
        options: [
          "Czy przyjdziesz?",
          "Przyjdź tutaj!",
          "On przyszedł",
          "Może przyjdzie",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Jaki przypadek odpowiada na pytanie 'kogo? czego?'",
      content: { options: ["mianownik", "dopełniacz", "celownik", "biernik"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest synestezja?",
      content: {
        options: [
          "Łączenie wrażeń zmysłowych",
          "Powtórzenie",
          "Przeciwstawienie",
          "Wyliczenie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który frazeologizm oznacza 'udawać'?",
      content: {
        options: [
          "grać komuś na nosie",
          "stroić miny",
          "mieć muchy w nosie",
          "siedzieć cicho",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest chiazm?",
      content: {
        options: [
          "Odwrócenie szyku w symetrii",
          "Powtórzenie",
          "Porównanie",
          "Wyliczenie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Która samogłoska jest nosowa?",
      content: { options: ["a", "ą", "e", "o"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co oznacza skrót 'tzn.'?",
      content: {
        options: ["tak zwany", "to znaczy", "tym bardziej", "tak zwykle"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Który wyraz jest neologizmem?",
      content: { options: ["komputer", "stół", "dom", "drzewo"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile rodzajów gramatycznych ma język polski?",
      content: { options: ["2", "3", "4", "5"] },
      correctAnswer: 1,
      metadata: { explanation: "Męski, żeński, nijaki" },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest kalka językowa?",
      content: {
        options: [
          "Dosłowne tłumaczenie",
          "Błąd językowy",
          "Rodzaj metafory",
          "Archaizm",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest litota?",
      content: {
        options: [
          "Podwójne zaprzeczenie",
          "Wyolbrzymienie",
          "Porównanie",
          "Wyliczenie",
        ],
      },
      correctAnswer: 0,
      metadata: { explanation: "Np. 'niemały' = duży" },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który znak interpunkcyjny kończy zdanie pytające?",
      content: { options: [".", "!", "?", ";"] },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest onomatopeja?",
      content: {
        options: [
          "Wyraz dźwiękonaśladowczy",
          "Powtórzenie",
          "Przeciwstawienie",
          "Porównanie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest rusycyzmem?",
      content: { options: ["komputer", "czekolada", "łajba", "telefon"] },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Jaka litera nigdy nie występuje na początku polskiego wyrazu?",
      content: { options: ["ą", "a", "z", "w"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest apokopa?",
      content: {
        options: [
          "Ucięcie końca wyrazu",
          "Dodanie przedrostka",
          "Zmiana znaczenia",
          "Powtórzenie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest germanizmem?",
      content: { options: ["szlafrok", "komputer", "telefon", "telewizja"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest antonomazja?",
      content: {
        options: [
          "Zastąpienie imienia opisem",
          "Powtórzenie",
          "Porównanie",
          "Wyliczenie",
        ],
      },
      correctAnswer: 0,
      metadata: { explanation: "Np. Wieszcz = Mickiewicz" },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest czasownikiem w trybie rozkazującym?",
      content: { options: ["czytam", "czytaj", "czytałem", "czytać"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest barbaryzm?",
      content: {
        options: ["Błąd językowy", "Zapożyczenie", "Neologizm", "Archaizm"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest tmeza?",
      content: {
        options: [
          "Rozcięcie wyrazu",
          "Połączenie wyrazów",
          "Skrócenie",
          "Wydłużenie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który stopień przymiotnika wyraża najwyższą cechę?",
      content: { options: ["równy", "wyższy", "najwyższy", "wysoki"] },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest zeugma?",
      content: {
        options: [
          "Wspólne orzeczenie dla wielu podmiotów",
          "Powtórzenie",
          "Przeciwstawienie",
          "Porównanie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest anglicyzmem?",
      content: { options: ["weekend", "szlafrok", "czekolada", "kartofel"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Co oznacza 'nie' napisane razem z czasownikiem?",
      content: {
        options: ["zaprzeczenie", "potwierdzenie", "pytanie", "rozkaz"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest paronomazja?",
      content: {
        options: [
          "Gra słów podobnie brzmiących",
          "Powtórzenie",
          "Przeciwstawienie",
          "Porównanie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest internacjonalizmem?",
      content: { options: ["telefon", "szlafrok", "czekolada", "kartofel"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest kakofonia?",
      content: {
        options: [
          "Nieprzyjemne brzmienie",
          "Piękne brzmienie",
          "Cisza",
          "Hałas",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz ma tylko jedną sylabę?",
      content: { options: ["kot", "kotek", "koteczek", "kociak"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest enumeracja?",
      content: {
        options: [
          "Wyliczenie",
          "Powtórzenie",
          "Przeciwstawienie",
          "Porównanie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest polisyndeton?",
      content: {
        options: [
          "Nagromadzenie spójników",
          "Brak spójników",
          "Jedno zdanie",
          "Krótkie zdania",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest w liczbie mnogiej?",
      content: { options: ["kot", "pies", "koty", "kotem"] },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest tautologia?",
      content: {
        options: [
          "Powtórzenie tej samej myśli",
          "Przeciwstawienie",
          "Porównanie",
          "Wyliczenie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest bohemizmem?",
      content: { options: ["hańba", "telefon", "komputer", "telewizor"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Co oznacza wielka litera na początku zdania?",
      content: {
        options: [
          "początek zdania",
          "koniec zdania",
          "środek zdania",
          "pytanie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest asyndeton?",
      content: {
        options: [
          "Brak spójników",
          "Nadmiar spójników",
          "Jedno zdanie",
          "Długie zdania",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest galicyzmem?",
      content: { options: ["biuro", "szlafrok", "kartofel", "telefon"] },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest epifora?",
      content: {
        options: [
          "Powtórzenie na końcu",
          "Powtórzenie na początku",
          "Brak powtórzeń",
          "Jedno powtórzenie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest zdrobnieniem?",
      content: { options: ["dom", "domek", "domowy", "domownik"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest kolokwializm?",
      content: {
        options: [
          "Wyrażenie potoczne",
          "Wyrażenie książkowe",
          "Błąd językowy",
          "Neologizm",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest paralelizm składniowy?",
      content: {
        options: [
          "Powtórzenie struktury zdania",
          "Różne struktury",
          "Jedno zdanie",
          "Krótkie zdania",
        ],
      },
      correctAnswer: 0,
    },
  ];

  // ========== MEGA PACK: HISTORICAL_LITERARY - CLOSED_SINGLE (50 pytań) ==========
  const closedSingleHistorical = [
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      question: "W którym roku ukazały się 'Ballady i romanse'?",
      content: { options: ["1820", "1822", "1824", "1826"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Kto jest autorem 'Faraona'?",
      content: { options: ["Sienkiewicz", "Prus", "Orzeszkowa", "Konopnicka"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "YOUNG_POLAND",
      question:
        "Który dramat Wyspiańskiego nawiązuje do powstania krakowskiego?",
      content: {
        options: ["Wesele", "Wyzwolenie", "Warszawianka", "Noc listopadowa"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      question: "Kto napisał 'Odprawa posłów greckich'?",
      content: { options: ["Rej", "Kochanowski", "Modrzewski", "Górnicki"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      question: "Kto jest autorem 'Rokoszu Gliniańskiego'?",
      content: { options: ["Morsztyn", "Twardowski", "Potocki", "Zimorowic"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      question: "Kto napisał 'Myszeidos'?",
      content: {
        options: ["Krasicki", "Naruszewicz", "Trembecki", "Karpiński"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ROMANTICISM",
      question: "Jak nazywa się główny bohater 'Nie-Boskiej komedii'?",
      content: { options: ["Gustaw", "Konrad", "Henryk", "Kordian"] },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      question: "Kto napisał 'Ferdydurke'?",
      content: { options: ["Witkacy", "Gombrowicz", "Schulz", "Mrożek"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      question: "Który poeta należał do Skamandra?",
      content: { options: ["Przyboś", "Tuwim", "Czechowicz", "Peiper"] },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Kto jest autorem 'Kroniki polskiej'?",
      content: {
        options: [
          "Gall Anonim",
          "Wincenty Kadłubek",
          "Jan Długosz",
          "Marcin Kromer",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      question: "Który bohater romantyczny stał się symbolem poety-wieszcza?",
      content: {
        options: ["Gustaw", "Konrad", "Kordian", "Anhelli"],
      },
      correctAnswer: 1, // B - Konrad
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "POSITIVISM",
      question: "Która postać z 'Lalki' reprezentuje idealistę-romantyka?",
      content: {
        options: ["Rzecki", "Wokulski", "Ochocki", "Szlangbaum"],
      },
      correctAnswer: 1, // B - Wokulski
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      question: "Jak nazywał się największy polski poeta renesansu?",
      content: {
        options: [
          "Mikołaj Rej",
          "Jan Kochanowski",
          "Łukasz Górnicki",
          "Klemens Janicki",
        ],
      },
      correctAnswer: 1, // B - Jan Kochanowski
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      question: "Kto jest autorem 'Tanga'?",
      content: {
        options: ["Mrożek", "Różewicz", "Herbert", "Gombrowicz"],
      },
      correctAnswer: 0, // A - Mrożek
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      question: "Który artysta był twórcą hasła 'sztuka dla sztuki'?",
      content: {
        options: ["Przybyszewski", "Wyspiański", "Żeromski", "Reymont"],
      },
      correctAnswer: 0, // A - Przybyszewski
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest przysłówkiem?",
      content: {
        options: ["zielony", "zieleń", "zielono", "zielenieć"],
      },
      correctAnswer: 2, // C - zielono
      metadata: {
        explanation: "Przysłówek odpowiada na pytanie 'jak?' - zielono.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "W którym zdaniu występuje orzeczenie złożone?",
      content: {
        options: [
          "Anna czyta.",
          "Piotr będzie czytał.",
          "Dzieci śpią.",
          "Mama gotuje.",
        ],
      },
      correctAnswer: 1, // B - będzie czytał
      metadata: {
        explanation:
          "Orzeczenie złożone składa się z czasownika posiłkowego i głównego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Która część mowy odmienia się przez przypadki?",
      content: {
        options: ["czasownik", "rzeczownik", "przysłówek", "wykrzyknik"],
      },
      correctAnswer: 1, // B - rzeczownik
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Co to jest anakolut?",
      content: {
        options: [
          "Powtórzenie wyrazu",
          "Niedokończone zdanie",
          "Niezgodność składniowa",
          "Pytanie retoryczne",
        ],
      },
      correctAnswer: 2, // C - niezgodność składniowa
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który wyraz jest złożeniem?",
      content: {
        options: ["pisać", "napisać", "czasopismo", "pisarz"],
      },
      correctAnswer: 2, // C - czasopismo
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "W którym zdaniu występuje dopełnienie?",
      content: {
        options: [
          "Pada deszcz.",
          "Jan czyta książkę.",
          "Dzieci śpią.",
          "Jest zimno.",
        ],
      },
      correctAnswer: 1, // B - książkę (dopełnienie)
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest pleonazm?",
      content: {
        options: [
          "Skrót myślowy",
          "Nadmiar słów",
          "Brak wyrazu",
          "Zmiana szyku",
        ],
      },
      correctAnswer: 1, // B - nadmiar słów
      metadata: {
        explanation:
          "Pleonazm to użycie zbędnych, powtarzających się znaczeniowo wyrazów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "W którym wyrażeniu występuje oksymoron?",
      content: {
        options: ["głucha cisza", "biały śnieg", "gorąca kawa", "zimna woda"],
      },
      correctAnswer: 0, // A - głucha cisza
      metadata: { explanation: "Oksymoron to zestawienie sprzecznych pojęć." },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Która litera jest spółgłoską?",
      content: {
        options: ["a", "e", "k", "y"],
      },
      correctAnswer: 2, // C - k
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Co to jest eufonia?",
      content: {
        options: [
          "Błąd językowy",
          "Dźwięczność wypowiedzi",
          "Rodzaj metafory",
          "Typ zdania",
        ],
      },
      correctAnswer: 1, // B - dźwięczność
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question:
        "Napisz notatkę syntetyzującą: Rodzaje zdań złożonych w języku polskim (70-90 słów).",
      content: {
        requirements: [
          "zdania współrzędnie złożone",
          "zdania podrzędnie złożone",
          "przykłady",
          "70-90 słów",
        ],
      },
      metadata: {
        explanation:
          "Notka powinna zawierać: podział na współrzędne (łączne, przeciwstawne, rozłączne) i podrzędne (podmiotowe, przydawkowe, dopełnieniowe, okolicznikowe)",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Sporządź notatkę: Funkcje języka według Romana Jakobsona (80-100 słów).",
      content: {
        requirements: [
          "6 funkcji języka",
          "krótka charakterystyka każdej",
          "80-100 słów",
        ],
      },
      metadata: {
        explanation:
          "Funkcje: emotywna, konatywna, fatyczna, metajęzykowa, poetycka, poznawcza",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question:
        "Napisz notatkę: Zapożyczenia językowe w polszczyźnie (60-80 słów).",
      content: {
        requirements: [
          "typy zapożyczeń",
          "przykłady z różnych języków",
          "60-80 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Sporządź syntezę: Odmiany stylistyczne języka polskiego (90-110 słów).",
      content: {
        requirements: [
          "style funkcjonalne",
          "cechy charakterystyczne",
          "90-110 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 5,
      question:
        "Napisz notatkę: Ewolucja języka polskiego od średniowiecza do dziś (100-120 słów).",
      content: {
        requirements: [
          "główne etapy rozwoju",
          "najważniejsze zmiany",
          "100-120 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question: "Sporządź syntezę: Części mowy w języku polskim (70-90 słów).",
      content: {
        requirements: [
          "podział na odmienne i nieodmienne",
          "przykłady",
          "70-90 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question: "Napisz notatkę: Błędy językowe i ich rodzaje (80-100 słów).",
      content: {
        requirements: ["klasyfikacja błędów", "przykłady", "80-100 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question:
        "Sporządź syntezę: Środki poetyckie w literaturze (60-80 słów).",
      content: {
        requirements: ["główne środki", "funkcje", "60-80 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Napisz notatkę: Regionalizmy i dialekty polskie (90-110 słów).",
      content: {
        requirements: [
          "główne dialekty",
          "cechy charakterystyczne",
          "90-110 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 5,
      question:
        "Sporządź syntezę: Neologizmy we współczesnej polszczyźnie (100-120 słów).",
      content: {
        requirements: [
          "źródła neologizmów",
          "przykłady",
          "wpływ na język",
          "100-120 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question: "Napisz notatkę: Interpunkcja w języku polskim (70-90 słów).",
      content: {
        requirements: ["główne znaki", "zasady użycia", "70-90 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Sporządź syntezę: Związki frazeologiczne i ich typy (80-100 słów).",
      content: {
        requirements: ["klasyfikacja", "przykłady", "funkcje", "80-100 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question:
        "Napisz notatkę: Akty mowy i komunikacja językowa (60-80 słów).",
      content: {
        requirements: ["typy aktów mowy", "przykłady", "60-80 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 5,
      question:
        "Sporządź syntezę: Socjolekt młodzieżowy i jego ewolucja (100-120 słów).",
      content: {
        requirements: ["cechy", "przykłady", "zmiany w czasie", "100-120 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Napisz notatkę: Archaizmy i ich funkcja w tekstach (80-100 słów).",
      content: {
        requirements: [
          "typy archaizmów",
          "funkcje stylistyczne",
          "80-100 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question:
        "Sporządź syntezę: Etykieta językowa w komunikacji (70-90 słów).",
      content: {
        requirements: ["formy grzecznościowe", "zasady", "70-90 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Napisz notatkę: Język Internetu i jego specyfika (90-110 słów).",
      content: {
        requirements: [
          "cechy charakterystyczne",
          "przykłady",
          "wpływ na język",
          "90-110 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question: "Sporządź syntezę: Metafora i metonimia w języku (60-80 słów).",
      content: {
        requirements: ["definicje", "różnice", "przykłady", "60-80 słów"],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 5,
      question:
        "Napisz notatkę: Manipulacja językowa w mediach (100-120 słów).",
      content: {
        requirements: [
          "techniki manipulacji",
          "przykłady",
          "rozpoznawanie",
          "100-120 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Sporządź syntezę: Eufemizmy i ich rola w komunikacji (80-100 słów).",
      content: {
        requirements: [
          "funkcje eufemizmów",
          "przykłady",
          "konteksty użycia",
          "80-100 słów",
        ],
      },
    },
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
      question: "Które wyrazy są nieodmienne?",
      content: { options: ["wczoraj", "dom", "szybko", "ale"] },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Wczoraj (przysłówek), szybko (przysłówek), ale (spójnik) są nieodmienne",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których wyrazach występuje alternacja?",
      content: {
        options: ["ptak-ptaka", "rok-roku", "człowiek-człowieka", "dzień-dnia"],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation: "Alternacja: ptak/ptak, człowiek/człowiek, dzień/dni",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które środki stylistyczne są tropami?",
      content: { options: ["metafora", "anafora", "metonimia", "apostrofa"] },
      correctAnswer: [0, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Które zjawiska należą do fonetyki?",
      content: {
        options: ["asymilacja", "deklinacja", "upodobnienia", "palatalizacja"],
      },
      correctAnswer: [0, 2, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      question: "Które motywy są charakterystyczne dla romantyzmu?",
      content: {
        options: ["natura", "rozum", "uczucia", "mistycyzm"],
      },
      correctAnswer: [0, 2, 3], // A, C, D (nie rozum)
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Które epoki literackie przypadały na XIX wiek?",
      content: {
        options: ["romantyzm", "pozytywizm", "renesans", "Młoda Polska"],
      },
      correctAnswer: [0, 1, 3], // A, B, D
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      question: "Którzy poeci tworzyli poezję lingwistyczną?",
      content: {
        options: ["Białoszewski", "Karpowicz", "Herbert", "Szymborska"],
      },
      correctAnswer: [0, 1], // A, B
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są przysłówkami?",
      content: {
        options: ["szybko", "szybki", "wczoraj", "biec"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Przysłówki to: szybko (sposób) i wczoraj (czas). 'Szybki' to przymiotnik, 'biec' to czasownik.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których zdaniach występuje porównanie?",
      content: {
        options: [
          "Był silny jak dąb.",
          "Miał stalowe nerwy.",
          "Płakał jak dziecko.",
          "Jego serce było z kamienia.",
        ],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Porównania używają słów 'jak', 'jakby', 'niby'. Opcje B i D to metafory.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Które wyrazy pochodzą z języka łacińskiego?",
      content: {
        options: ["konstytucja", "komputer", "uniwersytet", "telefon"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Konstytucja i uniwersytet to zapożyczenia z łaciny. Komputer to anglicyzm, telefon - z greki.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "W których zdaniach występuje elipsa (wyrzutnia)?",
      content: {
        options: [
          "Ja do kina, ty do teatru.",
          "Czytam książkę.",
          "On lubi jabłka, ona - gruszki.",
          "Idę spać.",
        ],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Elipsa to pominięcie wyrazu domyślnego. W A brak 'idę', w C brak 'lubi'.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są rzeczownikami abstrakcyjnymi?",
      content: {
        options: ["miłość", "stół", "piękno", "dom"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Rzeczowniki abstrakcyjne to nazwy pojęć, uczuć, cech: miłość, piękno.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których wyrazach występuje przyrostek?",
      content: {
        options: ["pisarz", "napisać", "pisemny", "pismo"],
      },
      correctAnswer: [0, 2, 3], // A, C, D
      metadata: {
        explanation:
          "Przyrostki: -arz (pisarz), -emny (pisemny), -mo (pismo). 'Napisać' ma przedrostek.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Które zdania są bezosobowe?",
      content: {
        options: ["Było zimno.", "Pada deszcz.", "Mówiono o tym.", "Jan śpi."],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Zdania bezosobowe nie mają podmiotu: 'było zimno', 'mówiono'. 'Pada deszcz' ma podmiot (deszcz).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są homonimami?",
      content: {
        options: [
          "zamek (budowla) / zamek (do drzwi)",
          "duży / mały",
          "bal (zabawa) / bal (drewno)",
          "iść / chodzić",
        ],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Homonimy to wyrazy o tym samym brzmieniu, ale różnych znaczeniach.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których zdaniach występuje inwersja (szyk przestawny)?",
      content: {
        options: [
          "Piękna była ta noc.",
          "Anna czyta książkę.",
          "Przyszedł wczoraj Jan.",
          "Dzieci bawią się.",
        ],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Inwersja to nietypowy szyk wyrazów. Normalnie: 'Ta noc była piękna', 'Jan przyszedł wczoraj'.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Które środki stylistyczne należą do figur słów?",
      content: {
        options: ["metafora", "pytanie retoryczne", "epitet", "apostrofa"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Figury słów: metafora, epitet. Pytanie retoryczne i apostrofa to figury myśli.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są zaimkami?",
      content: {
        options: ["on", "bardzo", "nikt", "szybko"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Zaimki: on (osobowy), nikt (nieokreślony). 'Bardzo' i 'szybko' to przysłówki.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których wyrazach 'u' piszemy przez 'ó'?",
      content: {
        options: ["krol", "gura", "woda", "roza"],
      },
      correctAnswer: [0, 1, 3], // A, B, D
      metadata: {
        explanation: "Przez 'ó' piszemy: król, góra, róża. 'Woda' przez 'o'.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Które zdania zawierają równoważnik zdania?",
      content: {
        options: ["Cisza nocna.", "Jan śpi.", "Proszę wejść.", "Pada deszcz."],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Równoważniki zdania nie mają podmiotu i orzeczenia: 'Cisza nocna', 'Proszę wejść'.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są przymiotnikami?",
      content: {
        options: ["piękny", "pięknie", "czerwony", "czerwień"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Przymiotniki: piękny, czerwony. 'Pięknie' to przysłówek, 'czerwień' to rzeczownik.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których zdaniach występuje podmiot szeregowy?",
      content: {
        options: [
          "Jan i Maria przyszli.",
          "On śpiewa.",
          "Pies, kot i chomik bawią się.",
          "Dzieci grają.",
        ],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Podmiot szeregowy składa się z kilku członów: 'Jan i Maria', 'Pies, kot i chomik'.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Które figury należą do tropów?",
      content: {
        options: ["metonimia", "anafora", "synekdocha", "paralelizm"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Tropy (przenośnie): metonimia, synekdocha. Anafora i paralelizm to figury składniowe.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są wykrzyknikami?",
      content: {
        options: ["ach", "bardzo", "ojej", "szybko"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Wykrzykniki wyrażają emocje: ach, ojej. 'Bardzo' i 'szybko' to przysłówki.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których zdaniach występuje przerzutnia?",
      content: {
        options: [
          "I nagle / Cisza.",
          "Jan czyta książkę.",
          "Widziałem go tam, gdzie / Nikt nie chodzi.",
          "Pada deszcz.",
        ],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Przerzutnia to przeniesienie części zdania do następnego wersu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Które zdania są złożone współrzędnie?",
      content: {
        options: [
          "Przyszedł i usiadł.",
          "Myślę, że masz rację.",
          "Pada deszcz, lecz jest ciepło.",
          "Kiedy świeci słońce, jest wesoło.",
        ],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation:
          "Zdania współrzędnie łączą równorzędne części: 'i usiadł', 'lecz jest ciepło'.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Które wyrazy zawierają dyftongi?",
      content: {
        options: ["auto", "kot", "Europa", "dom"],
      },
      correctAnswer: [0, 2], // A i C
      metadata: {
        explanation: "Dyftongi to połączenia samogłosek: au-to, Eu-ropa.",
      },
    },
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
        "Wyjaśnij różnicę między językiem oficjalnym a potocznym. Podaj po 2 przykłady.",
      content: {
        requirements: ["różnice stylistyczne", "przykłady", "kontekst użycia"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question:
        "Opisz funkcję środków stylistycznych w reklamie. Podaj 3 przykłady.",
      content: {
        requirements: ["funkcja perswazyjna", "przykłady", "analiza"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij pojęcie 'literatura zaangażowana'. Podaj przykład z XX wieku.",
      content: {
        requirements: ["definicja", "kontekst historyczny", "przykład"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question:
        "Wyjaśnij różnicę między homonimami a paronimami. Podaj przykłady.",
      content: {
        requirements: ["definicje", "przykłady", "różnice"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Opisz funkcję wykrzyknień w tekście literackim.",
      content: {
        requirements: ["funkcja ekspresywna", "przykłady użycia"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 3,
      question:
        "Na czym polega zjawisko kontaminacji językowej? Podaj 2 przykłady.",
      content: {
        requirements: ["definicja", "2 przykłady", "przyczyny"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Wymień i krótko scharakteryzuj 3 typy wypowiedzeń.",
      content: {
        requirements: ["oznajmujące", "pytające", "rozkazujące"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Czym jest aliteracja i jaka jest jej funkcja w poezji?",
      content: {
        requirements: ["definicja", "funkcja", "przykład"],
      },
    },
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
      points: 5,
      question: "Napisz notatkę: Rozwój polszczyzny w XXI wieku (80-100 słów).",
      content: {
        requirements: [
          "wpływ technologii",
          "anglicyzmy",
          "zmiany",
          "80-100 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Sporządź syntezę: Media społecznościowe a język młodzieży (90-110 słów).",
      content: {
        requirements: ["nowe formy", "skróty", "emotikony", "90-110 słów"],
      },
    },
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
      question:
        "Samotność bohatera literackiego - przekleństwo czy błogosławieństwo?",
      content: {
        requirements: ["min. 400 słów", "2 utwory", "argumentacja"],
        topics: ["samotność", "alienacja", "indywidualizm"],
      },
      metadata: { wordLimit: { min: 400, max: 600 } },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 35,
      question: "Czy patriotyzm w XXI wieku ma jeszcze sens? Rozważ problem.",
      content: {
        requirements: ["min. 450 słów", "przykłady", "własna opinia"],
        topics: ["patriotyzm", "globalizacja", "tożsamość"],
      },
      metadata: { wordLimit: { min: 450, max: 650 } },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 40,
      question: "Literatura wobec zła - czy istnieją tematy zakazane?",
      content: {
        requirements: ["min. 500 słów", "etyka", "przykłady"],
        topics: ["zło", "tabu", "granice sztuki"],
      },
      metadata: { wordLimit: { min: 500, max: 700 } },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 3,
      points: 35,
      question: "Rola kobiety w literaturze różnych epok. Porównaj i oceń.",
      content: {
        requirements: ["min. 400 słów", "3 epoki", "przykłady postaci"],
        topics: ["feminizm", "emancypacja", "stereotypy"],
      },
      metadata: {
        wordLimit: { min: 400, max: 600 },
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 35,
      question:
        "Motyw buntu w literaturze młodzieżowej i dorosłej - analiza porównawcza.",
      content: {
        requirements: ["min. 450 słów", "przykłady", "wnioski"],
        topics: ["bunt", "młodość", "nonkonformizm"],
      },
      metadata: {
        wordLimit: { min: 450, max: 650 },
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 40,
      question:
        "Czy literatura może zmieniać świat? Rozważ problem odwołując się do wybranych utworów.",
      content: {
        requirements: [
          "min. 500 słów",
          "argumentacja",
          "przykłady historyczne",
        ],
        topics: ["zaangażowanie", "wpływ literatury", "zmiany społeczne"],
      },
      metadata: {
        wordLimit: { min: 500, max: 700 },
      },
    },
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
