// backend/prisma/seed.ts

import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Rozpoczynam seed bazy danych dla matura-polski.pl...");

  // =====================
  // 1. UŻYTKOWNICY
  // =====================
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const studentPassword = await bcrypt.hash("Student123!", 10);
  const teacherPassword = await bcrypt.hash("Teacher123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@matura-polski.pl" },
    update: {},
    create: {
      email: "admin@matura-polski.pl",
      password: adminPassword,
      firstName: "Admin",
      lastName: "Systemu",
      role: "ADMIN",
      profile: {
        create: {
          studyStreak: 0,
          totalPoints: 0,
          averageScore: 0,
        },
      },
    },
  });

  const student1 = await prisma.user.upsert({
    where: { email: "jan.kowalski@example.com" },
    update: {},
    create: {
      email: "jan.kowalski@example.com",
      password: studentPassword,
      firstName: "Jan",
      lastName: "Kowalski",
      role: "STUDENT",
      profile: {
        create: {
          examDate: new Date("2025-05-06"),
          preferredTopics: ["romantyzm", "pozytywizm", "składnia"],
          studyStreak: 15,
          totalPoints: 2450,
          averageScore: 82.5,
          level: 5,
        },
      },
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: "anna.nowak@example.com" },
    update: {},
    create: {
      email: "anna.nowak@example.com",
      password: studentPassword,
      firstName: "Anna",
      lastName: "Nowak",
      role: "STUDENT",
      profile: {
        create: {
          examDate: new Date("2025-05-06"),
          preferredTopics: ["młoda polska", "środki stylistyczne"],
          studyStreak: 7,
          totalPoints: 1120,
          averageScore: 75.0,
          level: 3,
        },
      },
    },
  });

  console.log("✅ Utworzono użytkowników");

  // =====================
  // 2. ZADANIA - CZĘŚĆ 1: JĘZYK POLSKI W UŻYCIU
  // =====================

  const languageExercises = [
    // Zadania na podstawie tekstów o sztucznej inteligencji (z informatora)
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question:
        "W którym szeregu wszystkie wyrazy są niepodzielne słowotwórczo?",
      content: {
        options: [
          "dom, stół, nos",
          "domek, stolik, nosek",
          "pisarz, malarz, lekarz",
          "pisać, malować, leczyć",
        ],
      },
      correctAnswer: 0,
      tags: ["słowotwórstwo", "morfologia"],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Które wyrazy zawierają przyrostek zdrabniający?",
      content: {
        options: ["kotek", "piesek", "młotek", "kwiatek", "statek", "domek"],
      },
      correctAnswer: [0, 1, 3, 5],
      tags: ["słowotwórstwo", "zdrobnienia"],
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij różnicę znaczeniową między wyrazami 'bezdomny' a 'bezdomowy'. Podaj przykłady użycia.",
      content: {
        requirements: ["Wyjaśnienie różnicy", "Przykład dla każdego wyrazu"],
      },
      tags: ["znaczenie", "słowotwórstwo"],
    },

    // Interpunkcja
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym zdaniu poprawnie zastosowano przecinki?",
      content: {
        options: [
          "Jan, który przyszedł wczoraj jest moim bratem.",
          "Jan który przyszedł wczoraj, jest moim bratem.",
          "Jan, który przyszedł wczoraj, jest moim bratem.",
          "Jan który, przyszedł wczoraj jest moim bratem.",
        ],
      },
      correctAnswer: 2,
      tags: ["interpunkcja", "przecinek"],
    },

    // Ortografia
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "W których wyrazach piszemy 'rz' po spółgłosce?",
      content: {
        options: ["p_edmiot", "k_esło", "t_eba", "b_uch", "d_ewo", "g_ywa"],
      },
      correctAnswer: [0, 2, 3],
      tags: ["ortografia", "rz"],
    },

    // Stylistyka
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 3,
      question:
        "Przeredaguj poniższe zdanie, eliminując pleonazm i tautologię: 'W dniu dzisiejszym cofnęliśmy się do tyłu, aby ponownie jeszcze raz przeanalizować całość wszystkich dokumentów.'",
      content: {
        requirements: [
          "Zachowanie sensu",
          "Eliminacja nadmiaru",
          "Poprawność stylistyczna",
        ],
      },
      tags: ["stylistyka", "pleonazm", "tautologia"],
    },

    // Składnia
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Które zdanie zawiera równoważnik zdania?",
      content: {
        options: [
          "Czytając książkę, zasnąłem.",
          "Cisza.",
          "Wstać! Siadać!",
          "Kiedy czytałem, zasnąłem.",
        ],
      },
      correctAnswer: 2,
      tags: ["składnia", "równoważnik"],
    },

    // Zapożyczenia
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są zapożyczeniami z języka francuskiego?",
      content: {
        options: ["abażur", "komputer", "menu", "żakiet", "weekend", "bulion"],
      },
      correctAnswer: [0, 2, 3, 5],
      tags: ["zapożyczenia", "galicyzmy"],
    },

    // Frazeologia - zadanie rozszerzone
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question:
        "Napisz notatkę na temat: 'Frazeologizmy biblijne w języku polskim - źródła i znaczenia' (80-100 słów).",
      content: {
        requirements: [
          "Minimum 3 przykłady frazeologizmów",
          "Wyjaśnienie pochodzenia",
          "Współczesne znaczenie",
          "Zachowanie limitu słów",
        ],
      },
      rubric: {
        criteria: [
          { name: "Przykłady frazeologizmów", points: 1 },
          { name: "Wyjaśnienie pochodzenia", points: 1 },
          { name: "Znaczenie współczesne", points: 1 },
          { name: "Forma i spójność", points: 1 },
        ],
      },
      tags: ["frazeologia", "Biblia", "notatka"],
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "Jakie znaczenie dla rozumienia tekstów ma użycie słownictwa wartościującego w tytułach 'Niebezpieczna sztuczna inteligencja' i 'Sztuczna przeciętność'?",
      content: {
        context:
          "Przeanalizuj tytuły dwóch artykułów o sztucznej inteligencji.",
        requirements: [
          "Wyjaśnij funkcję słownictwa wartościującego",
          "Odnieś się do obu tytułów",
        ],
      },
      rubric: {
        criteria: [
          { name: "Identyfikacja słownictwa wartościującego", points: 1 },
          { name: "Wyjaśnienie funkcji", points: 1 },
        ],
      },
      tags: ["słownictwo wartościujące", "tytuł", "funkcja"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question:
        "Który środek stylistyczny dominuje w zdaniu: 'Cisza krzyczała mu do ucha'?",
      content: {
        options: ["oksymoron", "porównanie", "epitet", "metonimia"],
      },
      correctAnswer: 0,
      tags: ["środki stylistyczne", "oksymoron"],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "Które ze środków retorycznych występują we fragmencie: 'Piszmy więc o sztucznej inteligencji, debatujmy i twórzmy jej wizje – póki jeszcze możemy...'?",
      content: {
        options: [
          "wyliczenie",
          "gradacja",
          "wielokropek (aposiopeza)",
          "pytanie retoryczne",
          "apostrofa",
        ],
      },
      correctAnswer: [0, 2],
      tags: ["retoryka", "środki stylistyczne"],
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question:
        "Na podstawie dwóch tekstów o sztucznej inteligencji napisz notatkę syntetyzującą na temat: 'Współczesny człowiek wobec sztucznej inteligencji'.",
      content: {
        requirements: [
          "60-90 wyrazów",
          "Przedstawienie stanowisk obu autorów",
          "Wskazanie podobieństw i różnic",
          "Zachowanie spójności",
        ],
        texts: [
          "Tekst 1: Aleksandra Stanisławska - 'Niebezpieczna sztuczna inteligencja'",
          "Tekst 2: Łukasz Lamża - 'Sztuczna przeciętność'",
        ],
      },
      rubric: {
        criteria: [
          { name: "Przedstawienie stanowisk", points: 1 },
          { name: "Zestawienie stanowisk", points: 1 },
          { name: "Spójność", points: 1 },
          { name: "Poprawność językowa", points: 1 },
        ],
      },
      tags: ["notatka syntetyzująca", "AI", "synteza"],
    },

    // Zadania o architekturze (z informatora)
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question:
        "Jaka funkcja języka dominuje w zdaniu: 'Architektura, sztuka związana z precyzyjnym rysunkiem i ścisłym planowaniem'?",
      content: {
        options: ["informatywna", "ekspresywna", "impresywna", "poetycka"],
      },
      correctAnswer: 0,
      tags: ["funkcje języka"],
    },

    // Zadania o epoce lodowcowej (z informatora)
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij, na czym polega ironia w sformułowaniu 'Słowo śnieżka nie w pełni oddaje mordercze warunki'.",
      content: {
        requirements: ["Identyfikacja kontrastu", "Wyjaśnienie efektu"],
      },
      tags: ["ironia", "środki stylistyczne"],
    },

    // Więcej zadań językowych
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question:
        "Wskaż zdanie, w którym poprawnie użyto imiesłowu przysłówkowego:",
      content: {
        options: [
          "Czytając książkę, zadzwonił telefon.",
          "Czytając książkę, usłyszałem dzwonek.",
          "Czytając książkę, mama zawołała na obiad.",
          "Czytając książkę, przyszedł listonosz.",
        ],
      },
      correctAnswer: 1,
      tags: ["imiesłów", "składnia"],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których wyrazach występuje upodobnienie wsteczne?",
      content: {
        options: ["prośba", "krzesło", "wszyscy", "jakże", "babka"],
      },
      correctAnswer: [0, 3, 4],
      tags: ["fonetyka", "upodobnienia"],
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question:
        "Przekształć zdanie złożone współrzędnie w pojedyncze: 'Nadeszła wiosna i ptaki powróciły z ciepłych krajów.'",
      content: {
        hint: "Użyj konstrukcji z okolicznikiem czasu",
      },
      tags: ["składnia", "przekształcenia"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który frazeologizm oznacza 'mówić w sposób niezrozumiały'?",
      content: {
        options: [
          "mówić trzy po trzy",
          "mówić prosto z mostu",
          "mówić między wierszami",
          "mówić jak do ściany",
        ],
      },
      correctAnswer: 0,
      tags: ["frazeologia"],
    },
  ];

  // =====================
  // 3. ZADANIA - CZĘŚĆ 2: TEST HISTORYCZNOLITERACKI
  // =====================

  const literaryExercises = [
    // BIBLIA I ANTYK
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ANTIQUITY",
      difficulty: 4,
      points: 3,
      question:
        "Porównaj koncepcję fatum w 'Królu Edypie' Sofoklesa z ideą przeznaczenia w 'Makbecie' Szekspira. Wskaż podobieństwa i różnice.",
      content: {
        requirements: [
          "Definicja fatum",
          "Rola przeznaczenia w obu utworach",
          "Minimum dwa podobieństwa",
          "Minimum dwie różnice",
        ],
      },
      tags: ["tragedia antyczna", "Sofokles", "Szekspir", "fatum"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ANTIQUITY",
      difficulty: 2,
      points: 1,
      question:
        "Która z cech NIE jest charakterystyczna dla eposu homeryckiego?",
      content: {
        options: [
          "inwokacja",
          "epitety stałe",
          "porównania homeryckie",
          "jedność czasu, miejsca i akcji",
        ],
      },
      correctAnswer: 3,
      tags: ["epos", "Homer", "cechy gatunku"],
    },

    // RENESANS - nowe ujęcia
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "RENAISSANCE",
      difficulty: 3,
      points: 2,
      question:
        "Na przykładzie fraszki 'Na lipę' Jana Kochanowskiego wyjaśnij, czym jest locus amoenus i jak poeta wykorzystuje ten topos.",
      content: {
        requirements: [
          "Definicja toposu",
          "Cytaty z fraszki",
          "Funkcja w utworze",
        ],
      },
      tags: ["Kochanowski", "topos", "fraszki", "locus amoenus"],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "RENAISSANCE",
      difficulty: 3,
      points: 2,
      question:
        "Które elementy filozofii renesansowej znajdują odbicie w 'Trenach' Kochanowskiego?",
      content: {
        options: [
          "antropocentryzm",
          "teocentryzm",
          "humanizm chrześcijański",
          "epikureizm",
          "stoicyzm",
          "ascetyzm",
        ],
      },
      correctAnswer: [0, 2, 4],
      tags: ["Treny", "filozofia", "renesans"],
    },

    // ROMANTYZM - zadania analityczne
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 4,
      question:
        "Napisz syntezę na temat: 'Mesjanizm w III części Dziadów - wymiar narodowy i uniwersalny' (100-120 słów).",
      content: {
        requirements: [
          "Definicja mesjanizmu",
          "Polska jako Chrystus narodów",
          "Wymiar uniwersalny cierpienia",
          "Cytaty z tekstu",
        ],
        text: "Fragment Dziadów cz. III - Widzenie ks. Piotra",
      },
      rubric: {
        criteria: [
          { name: "Rozumienie mesjanizmu", points: 1 },
          { name: "Analiza wymiaru narodowego", points: 1 },
          { name: "Analiza wymiaru uniwersalnego", points: 1 },
          { name: "Spójność i język", points: 1 },
        ],
      },
      tags: ["Dziady", "mesjanizm", "romantyzm narodowy"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      question:
        "Który z romantyków jest autorem koncepcji 'poezji w czyn wcielonej'?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Juliusz Słowacki",
          "Cyprian Kamil Norwid",
          "Zygmunt Krasiński",
        ],
      },
      correctAnswer: 2,
      tags: ["Norwid", "koncepcje poetyckie"],
    },

    // POZYTYWIZM - zadania problemowe
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "POSITIVISM",
      difficulty: 4,
      points: 3,
      question:
        "Analizując postać Izabeli Łęckiej z 'Lalki', wykaż, że jest ona postacią bardziej złożoną niż typowa 'lalka salonowa'. Odwołaj się do trzech różnych scen.",
      content: {
        requirements: [
          "Teza o złożoności postaci",
          "Trzy przykłady z różnych scen",
          "Interpretacja zachowań",
        ],
      },
      tags: ["Lalka", "Izabela Łęcka", "analiza postaci"],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "POSITIVISM",
      difficulty: 3,
      points: 2,
      question: "Które problemy społeczne porusza Prus w noweli 'Kamizelka'?",
      content: {
        options: [
          "bieda miejska",
          "emancypacja kobiet",
          "asymilacja Żydów",
          "degradacja inteligencji",
          "alkoholizm",
          "wyzysk robotników",
        ],
      },
      correctAnswer: [0, 3],
      tags: ["Prus", "nowela", "problematyka społeczna"],
    },

    // MŁODA POLSKA - symbolizm
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij symboliczne znaczenie 'błękitnej róży' w poezji młodopolskiej. Odwołaj się do wiersza Leopolda Staffa.",
      content: {
        hint: "Symbol nieosiągalnego ideału",
        requirements: [
          "Znaczenie symbolu",
          "Kontekst młodopolski",
          "Przykład z poezji",
        ],
      },
      tags: ["symbolizm", "Staff", "błękitna róża"],
    },

    // DWUDZIESTOLECIE - awangarda
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 3,
      points: 1,
      question:
        "Która grupa poetycka dwudziestolecia międzywojennego głosiła hasło 'Miasto, masa, maszyna'?",
      content: {
        options: ["Awangarda Krakowska", "Skamander", "Kwadryga", "Żagary"],
      },
      correctAnswer: 0,
      tags: ["awangarda", "grupy poetyckie", "futuryzm"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 4,
      points: 3,
      question:
        "Jak Witkacy w dramacie 'Szewcy' realizuje swoją teorię Czystej Formy? Podaj trzy przykłady.",
      content: {
        requirements: [
          "Wyjaśnienie teorii",
          "Trzy przykłady realizacji",
          "Efekt artystyczny",
        ],
      },
      tags: ["Witkacy", "Czysta Forma", "Szewcy"],
    },

    // WSPÓŁCZESNOŚĆ - poezja wojenna
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 4,
      question:
        "Porównaj sposób przedstawienia doświadczenia wojny w poezji Krzysztofa Kamila Baczyńskiego i Tadeusza Różewicza. Napisz notatkę syntetyzującą (90-110 słów).",
      content: {
        requirements: [
          "Pokolenie Kolumbów vs ocaleni",
          "Różnice w poetyce",
          "Stosunek do heroizmu",
          "Cytaty z wierszy",
        ],
      },
      rubric: {
        criteria: [
          { name: "Charakterystyka poetów", points: 1 },
          { name: "Analiza różnic", points: 1 },
          { name: "Przykłady z tekstów", points: 1 },
          { name: "Synteza i spójność", points: 1 },
        ],
      },
      tags: ["Baczyński", "Różewicz", "wojna", "poezja"],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      question: "Które cechy charakteryzują poetykę Wisławy Szymborskiej?",
      content: {
        options: [
          "ironia",
          "patos",
          "prostota języka",
          "hermetyczność",
          "paradoks",
          "monumentalizm",
        ],
      },
      correctAnswer: [0, 2, 4],
      tags: ["Szymborska", "poetyka", "cechy"],
    },

    // Motywy międzyepokowe
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      question:
        "Prześledź ewolucję motywu theatrum mundi od baroku (Calderón) przez romantyzm (Słowacki 'Kordian') po współczesność (Mrożek 'Tango').",
      content: {
        requirements: [
          "Definicja motywu",
          "Realizacja w każdej epoce",
          "Wnioski o ewolucji",
        ],
      },
      tags: ["theatrum mundi", "motywy", "komparatystyka"],
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ANTIQUITY",
      difficulty: 2,
      points: 1,
      question:
        "Czy obraz stworzenia Adama w Księdze Rodzaju jest taki sam jak na fresku Michała Anioła 'Stworzenie Adama'? Uzasadnij.",
      content: {
        image: "michelangelo_creation.jpg",
        requirements: ["Porównanie tekstów kultury", "Uzasadnienie"],
      },
      tags: ["Biblia", "malarstwo", "Księga Rodzaju"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ANTIQUITY",
      difficulty: 1,
      points: 1,
      question: "Co oznacza frazeologizm 'hiobowe wieści'?",
      content: {
        options: [
          "Złe, tragiczne wiadomości",
          "Dobre nowiny",
          "Plotki i pogłoski",
          "Wieści z daleka",
        ],
      },
      correctAnswer: 0,
      tags: ["Biblia", "frazeologia", "Księga Hioba"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ANTIQUITY",
      difficulty: 3,
      points: 2,
      question:
        "Wymień dwa środki językowe charakterystyczne dla stylu biblijnego i zilustruj je przykładami z Psalmu 57.",
      content: {
        text: "Fragment Psalmu 57: 'Zbudź się, duszo moja, zbudź, harfo i cytro!'",
        requirements: ["Nazwy środków", "Przykłady z tekstu"],
      },
      tags: ["styl biblijny", "psalmy", "środki stylistyczne"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ANTIQUITY",
      difficulty: 2,
      points: 1,
      question: "Która postać mitologiczna jest zwiastunką nieszczęść?",
      content: {
        options: ["Kasandra", "Penelopa", "Niobe", "Pandora"],
      },
      correctAnswer: 0,
      tags: ["mitologia", "postacie"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ANTIQUITY",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij, na czym polega reinterpretacja mitu o Minotaurze w utworze Zbigniewa Herberta 'Historia Minotaura'.",
      content: {
        hint: "Porównaj z mitologicznym pierwowzorem",
      },
      tags: ["Herbert", "mitologia", "reinterpretacja"],
    },

    // ŚREDNIOWIECZE
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "MIDDLE_AGES",
      difficulty: 2,
      points: 2,
      question: "Które utwory należą do literatury średniowiecznej?",
      content: {
        options: [
          "Bogurodzica",
          "Treny",
          "Rozmowa Mistrza Polikarpa ze Śmiercią",
          "Legenda o św. Aleksym",
          "Odprawa posłów greckich",
        ],
      },
      correctAnswer: [0, 2, 3],
      tags: ["średniowiecze", "utwory"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "MIDDLE_AGES",
      difficulty: 2,
      points: 1,
      question:
        "Jaką funkcję języka pełni fragment 'Posłuchajcie, bracia miła' z Lamentu świętokrzyskiego?",
      content: {
        options: ["ekspresywna", "impresywna", "informatywna"],
        hint: "Podmiot wyraża swoje uczucia",
      },
      tags: ["Lament świętokrzyski", "funkcje języka"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "MIDDLE_AGES",
      difficulty: 2,
      points: 1,
      question: "Motyw ars moriendi oznacza:",
      content: {
        options: [
          "sztukę umierania",
          "sztukę życia",
          "sztukę walki",
          "sztukę miłości",
        ],
      },
      correctAnswer: 0,
      tags: ["motywy", "łacina", "średniowiecze"],
    },

    // RENESANS
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "RENAISSANCE",
      difficulty: 1,
      points: 1,
      question: "Kto jest autorem cyklu 'Trenów'?",
      content: {
        options: [
          "Jan Kochanowski",
          "Mikołaj Rej",
          "Łukasz Górnicki",
          "Andrzej Frycz Modrzewski",
        ],
      },
      correctAnswer: 0,
      tags: ["renesans", "Kochanowski", "Treny"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "RENAISSANCE",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij, na czym polega zachwianie postawy stoickiej w Trenie IX Kochanowskiego. Zacytuj odpowiedni fragment.",
      content: {
        hint: "Szukaj fragmentu o mądrości filozoficznej",
      },
      tags: ["Treny", "stoicyzm", "Kochanowski"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "RENAISSANCE",
      difficulty: 2,
      points: 1,
      question:
        "Jaki motyw antyczny wykorzystał Kochanowski w Pieśni IX (Księgi wtóre)?",
      content: {
        options: [
          "koło Fortuny",
          "Dedal i Ikar",
          "puszka Pandory",
          "nić Ariadny",
        ],
      },
      correctAnswer: 0,
      tags: ["motywy antyczne", "Kochanowski", "pieśni"],
    },

    // BAROK
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "BAROQUE",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij, na czym polega koncept w wierszu Jana Andrzeja Morsztyna 'Do galerników'.",
      content: {
        hint: "Porównanie cierpienia miłosnego do cierpienia galerników",
      },
      tags: ["barok", "koncept", "Morsztyn"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "BAROQUE",
      difficulty: 2,
      points: 1,
      question:
        "Jaki motyw łączy wiersz Daniela Naborowskiego 'Na toż' z malarstwem wanitatywnym?",
      content: {
        options: ["memento mori", "carpe diem", "ubi sunt", "locus amoenus"],
      },
      correctAnswer: 0,
      tags: ["barok", "vanitas", "Naborowski"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "BAROQUE",
      difficulty: 2,
      points: 2,
      question:
        "Określ dwie cechy postawy sarmackiej obecne w Pamiętnikach Jana Chryzostoma Paska.",
      content: {
        requirements: ["Nazwy cech", "Przykłady z tekstu"],
      },
      tags: ["sarmatyzm", "Pasek", "barok"],
    },

    // OŚWIECENIE
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ENLIGHTENMENT",
      difficulty: 1,
      points: 1,
      question: "Kto jest autorem bajek 'Szczur i kot', 'Jagnię i wilcy'?",
      content: {
        options: [
          "Ignacy Krasicki",
          "Stanisław Trembecki",
          "Franciszek Karpiński",
          "Julian Ursyn Niemcewicz",
        ],
      },
      correctAnswer: 0,
      tags: ["oświecenie", "bajki", "Krasicki"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ENLIGHTENMENT",
      difficulty: 2,
      points: 1,
      question: "Wyjaśnij alegoryczny sens bajki Krasickiego 'Szczur i kot'.",
      content: {
        hint: "Pycha i upadek",
      },
      tags: ["bajka", "alegoria", "Krasicki"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ENLIGHTENMENT",
      difficulty: 2,
      points: 1,
      question: "Jakie cele wyznaczył Krasicki satyrze?",
      content: {
        options: [
          "Mówienie prawdy i napiętnowanie wad",
          "Zabawa i rozrywka",
          "Wychwalanie władców",
          "Opisywanie przyrody",
        ],
      },
      correctAnswer: 0,
      tags: ["satyra", "Krasicki", "oświecenie"],
    },

    // ROMANTYZM
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 2,
      question: "Które motywy są charakterystyczne dla romantyzmu?",
      content: {
        options: [
          "miłość nieszczęśliwa",
          "patriotyzm",
          "praca organiczna",
          "mistycyzm",
          "natura",
          "pozytywizm naukowy",
        ],
      },
      correctAnswer: [0, 1, 3, 4],
      tags: ["romantyzm", "motywy"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      question: "Który utwór rozpoczyna się słowami 'Litwo! Ojczyzno moja!'?",
      content: {
        options: [
          "Pan Tadeusz",
          "Dziady cz. III",
          "Konrad Wallenrod",
          "Grażyna",
        ],
      },
      correctAnswer: 0,
      tags: ["Pan Tadeusz", "incipit", "Mickiewicz"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 3,
      question:
        "Scharakteryzuj bohatera romantycznego na przykładzie Gustawa-Konrada z Dziadów.",
      content: {
        requirements: ["Indywidualizm", "Bunt", "Cierpienie", "Przemiana"],
      },
      tags: ["Dziady", "bohater romantyczny", "Gustaw-Konrad"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      question: "Jaki gatunek literacki reprezentuje 'Pan Tadeusz'?",
      content: {
        options: ["powieść", "epopeja", "poemat", "dramat"],
      },
      correctAnswer: 1,
      tags: ["gatunki", "Pan Tadeusz"],
    },

    // POZYTYWIZM
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "POSITIVISM",
      difficulty: 1,
      points: 1,
      question: "Bohaterem której powieści jest Stanisław Wokulski?",
      content: {
        options: ["Lalka", "Quo Vadis", "Nad Niemnem", "Faraon"],
      },
      correctAnswer: 0,
      tags: ["Lalka", "bohaterowie", "Prus"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "POSITIVISM",
      difficulty: 3,
      points: 2,
      question:
        "Wyjaśnij, jak w opowiadaniu 'Gloria victis' Orzeszkowa przedstawia postawę powstańców styczniowych.",
      content: {
        hint: "Heroizm mimo klęski",
      },
      tags: ["Gloria victis", "powstanie styczniowe", "Orzeszkowa"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "POSITIVISM",
      difficulty: 2,
      points: 1,
      question:
        "Która z idei pozytywistycznych jest realizowana przez Judyma w 'Ludziach bezdomnych'?",
      content: {
        options: [
          "praca u podstaw",
          "praca organiczna",
          "asymilacja Żydów",
          "emancypacja kobiet",
        ],
      },
      correctAnswer: 0,
      tags: ["pozytywizm", "Żeromski", "idee"],
    },

    // MŁODA POLSKA
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      question: "Kto jest autorem dramatu 'Wesele'?",
      content: {
        options: [
          "Stanisław Wyspiański",
          "Stanisław Przybyszewski",
          "Kazimierz Przerwa-Tetmajer",
          "Leopold Staff",
        ],
      },
      correctAnswer: 0,
      tags: ["Młoda Polska", "Wesele", "Wyspiański"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 3,
      points: 2,
      question: "Wyjaśnij symbolikę chochoła w finale 'Wesela' Wyspiańskiego.",
      content: {
        hint: "Marazm, bezwładność społeczeństwa",
      },
      tags: ["Wesele", "symbolika", "chochoł"],
    },

    // DWUDZIESTOLECIE
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 2,
      points: 1,
      question:
        "Do jakiego nurtu literackiego należy twórczość Brunona Schulza?",
      content: {
        options: [
          "realizm magiczny",
          "realizm socjalistyczny",
          "naturalizm",
          "klasycyzm",
        ],
      },
      correctAnswer: 0,
      tags: ["Schulz", "dwudziestolecie", "prądy"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 3,
      points: 2,
      question: "Jak w 'Ferdydurke' Gombrowicz przedstawia problem formy?",
      content: {
        requirements: ["Definicja formy", "Przykłady z tekstu"],
      },
      tags: ["Gombrowicz", "Ferdydurke", "forma"],
    },

    // WSPÓŁCZESNOŚĆ
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      question:
        "Motyw apokalipsy w poezji K.K. Baczyńskiego 'Pokolenie' odnosi się do:",
      content: {
        options: [
          "II wojny światowej",
          "I wojny światowej",
          "powstania styczniowego",
          "zaborów",
        ],
      },
      correctAnswer: 0,
      tags: ["Baczyński", "wojna", "apokalipsa"],
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 3,
      question:
        "Porównaj wizję Sądu Ostatecznego w wierszu Herberta 'U wrót doliny' z tradycją biblijną.",
      content: {
        requirements: ["Podobieństwa", "Różnice", "Interpretacja"],
      },
      tags: ["Herbert", "Biblia", "Sąd Ostateczny"],
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      question: "W 'Tango' Mrożka główny konflikt dotyczy:",
      content: {
        options: [
          "starcia tradycji z anarchią",
          "walki klasowej",
          "konfliktu pokoleń",
          "sporu religijnego",
        ],
      },
      correctAnswer: 0,
      tags: ["Mrożek", "Tango", "konflikt"],
    },
  ];

  // =====================
  // 4. ZADANIA - CZĘŚĆ 3: WYPRACOWANIA
  // =====================

  const essayExercises = [
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      question:
        "Samotność jako doświadczenie egzystencjalne w literaturze XX wieku. Omów problem, analizując wybrane utwory.",
      content: {
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do co najmniej dwóch lektur obowiązkowych",
          "Kontekst filozoficzny (egzystencjalizm)",
          "Własna teza interpretacyjna",
          "Struktura: wstęp, rozwinięcie, zakończenie",
        ],
        suggestedWorks: [
          "Dżuma - Albert Camus",
          "Tango - Sławomir Mrożek",
          "Inny świat - Gustaw Herling-Grudziński",
        ],
      },
      rubric: {
        criteria: [
          { name: "Spełnienie formalnych warunków", points: 1 },
          { name: "Kompetencje literackie i kulturowe", points: 16 },
          { name: "Kompozycja wypowiedzi", points: 7 },
          { name: "Język wypowiedzi", points: 11 },
        ],
      },
      tags: ["rozprawka", "samotność", "egzystencjalizm", "XX wiek"],
    },

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      question:
        "Czy sztuka może ocalić człowieka? Rozważ problem w kontekście literatury obozowej i wojennej.",
      content: {
        requirements: [
          "Minimum 400 słów",
          "Przykłady ocalenia przez sztukę",
          "Przykłady, gdy sztuka nie wystarcza",
          "Odwołanie do świadectw historycznych",
          "Własne stanowisko",
        ],
        suggestedWorks: [
          "Medaliony - Zofia Nałkowska",
          "Pożegnanie z Marią - Tadeusz Borowski",
          "Pianista - Władysław Szpilman",
        ],
      },
      tags: ["sztuka", "wojna", "ocalenie", "literatura obozowa"],
    },

    {
      type: "SHORT_ANSWER",
      category: "WRITING",
      difficulty: 4,
      points: 6,
      question:
        "Napisz recenzję spektaklu teatralnego 'Wesele' w reżyserii współczesnej, zwracając uwagę na aktualizację przesłania Wyspiańskiego (250-300 słów).",
      content: {
        requirements: [
          "Ocena inscenizacji",
          "Współczesne odczytanie",
          "Elementy scenografii i reżyserii",
          "Rekomendacja",
        ],
      },
      tags: ["recenzja", "teatr", "Wesele", "aktualizacja"],
    },

    {
      type: "SHORT_ANSWER",
      category: "WRITING",
      difficulty: 3,
      points: 4,
      question:
        "Napisz przemówienie z okazji Narodowego Czytania 'Lalki' Bolesława Prusa, zachęcające młodzież do lektury (200-250 słów).",
      content: {
        requirements: [
          "Apostrofa do młodzieży",
          "Argumenty za czytaniem klasyki",
          "Aktualność 'Lalki'",
          "Elementy retoryczne",
        ],
      },
      tags: ["przemówienie", "retoryka", "Lalka", "promocja czytelnictwa"],
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      question:
        "Kreacja bohatera romantycznego w literaturze polskiej i europejskiej. Omów zagadnienie, odwołując się do wybranych utworów.",
      content: {
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do lektury obowiązkowej",
          "Odwołanie do innego utworu literackiego",
          "Dwa konteksty (np. historyczny, filozoficzny)",
          "Wypowiedź argumentacyjna",
        ],
        suggestedWorks: [
          "Dziady cz. III - Adam Mickiewicz",
          "Kordian - Juliusz Słowacki",
          "Cierpienia młodego Wertera - J.W. Goethe",
          "Konrad Wallenrod - Adam Mickiewicz",
        ],
      },
      rubric: {
        criteria: [
          { name: "Spełnienie formalnych warunków", points: 1 },
          { name: "Kompetencje literackie i kulturowe", points: 16 },
          { name: "Kompozycja wypowiedzi", points: 7 },
          { name: "Język wypowiedzi", points: 11 },
        ],
      },
      tags: ["rozprawka", "romantyzm", "bohater"],
    },

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      question:
        "Motyw buntu w literaturze różnych epok. Porównaj realizację tego motywu w wybranych utworach.",
      content: {
        requirements: [
          "Minimum 400 słów",
          "Co najmniej dwa utwory z różnych epok",
          "Analiza porównawcza",
          "Kontekst historyczny i filozoficzny",
        ],
      },
      tags: ["motyw buntu", "porównanie", "epoki"],
    },

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      question:
        "Czy literatura może zmieniać rzeczywistość? Rozważ problem, odwołując się do wybranych przykładów.",
      content: {
        requirements: [
          "Minimum 400 słów",
          "Przykłady z różnych epok",
          "Własne stanowisko z uzasadnieniem",
        ],
      },
      tags: ["funkcje literatury", "społeczeństwo"],
    },

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      question:
        "Różne oblicza patriotyzmu w literaturze polskiej. Omów zagadnienie na wybranych przykładach.",
      content: {
        requirements: [
          "Minimum 400 słów",
          "Przykłady z co najmniej trzech epok",
          "Ewolucja pojęcia patriotyzmu",
        ],
      },
      tags: ["patriotyzm", "literatura polska"],
    },

    {
      type: "SHORT_ANSWER",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      question:
        "Napisz charakterystykę porównawczą Wokulskiego i Judyma jako bohaterów pozytywistycznych (200-250 słów).",
      content: {
        requirements: [
          "Podobieństwa postaw",
          "Różnice w realizacji ideałów",
          "Ocena postaci",
        ],
      },
      tags: ["charakterystyka", "pozytywizm", "porównanie"],
    },

    {
      type: "SHORT_ANSWER",
      category: "WRITING",
      difficulty: 3,
      points: 4,
      question:
        "Zinterpretuj tytuł 'Wesela' Wyspiańskiego w kontekście problematyki utworu (150-200 słów).",
      content: {
        hint: "Rozważ znaczenie dosłowne i symboliczne",
      },
      tags: ["interpretacja", "tytuł", "Wesele"],
    },
  ];

  // =====================
  // 5. DODATKOWE ZADANIA MIESZANE
  // =====================

  const additionalExercises = [
    // Zadania o symbolice
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question:
        "Na podstawie dwóch fragmentów felietonów - Joanny Szczepkowskiej i Krzysztofa Vargi - określ cechy stylu felietonowego i różnice w sposobie argumentacji (100-120 słów).",
      content: {
        requirements: [
          "Cechy gatunku",
          "Porównanie stylów",
          "Przykłady środków językowych",
          "Wnioski",
        ],
        texts: [
          "Fragment 1: Felieton o social mediach",
          "Fragment 2: Felieton o współczesnej kulturze",
        ],
      },
      tags: ["felieton", "styl", "analiza porównawcza"],
    },

    // Interpretacja tekstu poetyckiego
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      question:
        "Dokonaj analizy i interpretacji wiersza Juliana Tuwima 'Do krytyków'. Zwróć uwagę na ironię i środki stylistyczne.",
      content: {
        text: "[Tu będzie pełny tekst wiersza]",
        requirements: [
          "Określenie tematu",
          "Analiza środków stylistycznych",
          "Interpretacja ironii",
          "Kontekst biograficzny",
        ],
      },
      tags: ["Tuwim", "interpretacja", "ironia", "Skamander"],
    },

    // Zadanie z elementami kreatywnego pisania
    {
      type: "SHORT_ANSWER",
      category: "WRITING",
      difficulty: 3,
      points: 3,
      question:
        "Napisz pastisz bajki Ignacego Krasickiego, poruszając współczesny problem społeczny (100-150 słów). Zachowaj charakterystyczne cechy stylu.",
      content: {
        requirements: [
          "Morał",
          "Alegoria",
          "Naśladowanie stylu Krasickiego",
          "Współczesna problematyka",
        ],
      },
      tags: ["pastisz", "bajka", "Krasicki", "pisanie kreatywne"],
    },

    // Analiza językoznawcza
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "W tekście współczesnego rapu odnajdujemy następujące środki stylistyczne:",
      content: {
        text: "Fragment tekstu rapowego z aluzjami literackimi",
        options: [
          "aliteracja",
          "asonans",
          "anafora",
          "elipsa",
          "neologizm",
          "archaizm",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      tags: ["rap", "środki stylistyczne", "współczesność"],
    },

    // Zadanie interdyscyplinarne
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      question:
        "Jak obraz 'Melancholia I' Albrechta Dürera koresponduje z poezją barokową? Wskaż trzy wspólne motywy.",
      content: {
        image: "durer_melancholia.jpg",
        requirements: [
          "Analiza obrazu",
          "Przykłady z poezji barokowej",
          "Wspólne motywy (vanitas, melancholia, kontemplacja)",
        ],
      },
      tags: ["malarstwo", "barok", "komparatystyka", "Dürer"],
    },

    // Zadanie z frazeologii
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question:
        "Wyjaśnij pochodzenie i znaczenie frazeologizmu 'pyrrusowe zwycięstwo'. Podaj przykład współczesnego użycia.",
      content: {
        hint: "Związek z historią starożytną",
        requirements: [
          "Pochodzenie historyczne",
          "Znaczenie współczesne",
          "Przykład użycia",
        ],
      },
      tags: ["frazeologia", "antyk", "historia"],
    },

    // Zadanie o motywach biblijnych
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      question: "Motyw 'trzydziestu srebrników' w literaturze symbolizuje:",
      content: {
        options: [
          "zdradę za pieniądze",
          "bogactwo",
          "nagrodę za wierność",
          "jałmużnę",
        ],
      },
      correctAnswer: 0,
      tags: ["Biblia", "motywy", "Judasz"],
    },

    // Analiza dramatu
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      question:
        "Wyjaśnij funkcję didaskaliów w 'Ślubach panieńskich' Aleksandra Fredry. Jak wpływają na komizm sytuacyjny?",
      content: {
        requirements: [
          "Definicja didaskaliów",
          "Przykłady z tekstu",
          "Związek z komizmem",
        ],
      },
      tags: ["Fredro", "dramat", "komedia", "didaskalia"],
    },

    // Zadanie o ewolucji języka
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "Które zjawiska świadczą o demokratyzacji języka polskiego w XX wieku?",
      content: {
        options: [
          "zanik form grzecznościowych",
          "upowszechnienie kolokwializmów",
          "zwiększenie liczby zapożyczeń",
          "uproszczenie fleksji",
          "rozwój socjolektów",
          "standaryzacja wymowy",
        ],
      },
      correctAnswer: [1, 2, 4],
      tags: ["historia języka", "demokratyzacja", "XX wiek"],
    },

    // Interpretacja symbolu
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question:
        "Porównaj symbolikę ogrodu w 'Panu Tadeuszu' Mickiewicza i 'Innym świecie' Herlinga-Grudzińskiego.",
      content: {
        requirements: [
          "Ogród jako arkadia vs ogród jako więzienie",
          "Cytaty z tekstów",
        ],
      },
      tags: ["symbol", "ogród", "komparatystyka"],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      question: "Co symbolizuje złoty róg w 'Weselu' Wyspiańskiego?",
      content: {
        options: ["Wezwanie do powstania", "Bogactwo", "Władzę", "Sztukę"],
      },
      correctAnswer: 0,
      tags: ["Wesele", "symbolika"],
    },

    // Zadania o gatunkach
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Które z poniższych to gatunki epickie?",
      content: {
        options: ["nowela", "sonet", "powieść", "oda", "epopeja", "hymn"],
      },
      correctAnswer: [0, 2, 4],
      tags: ["gatunki literackie", "epika"],
    },

    // Zadania o środkach stylistycznych
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Podaj trzy przykłady metafory i wyjaśnij ich znaczenie.",
      content: {
        requirements: ["Przykłady", "Wyjaśnienia"],
      },
      tags: ["metafora", "środki stylistyczne"],
    },

    // Zadania o składni
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Wskaż zdanie złożone współrzędnie przeciwstawne:",
      content: {
        options: [
          "Przyszedł i usiadł.",
          "Chciał przyjść, ale nie mógł.",
          "Albo przyjdziesz, albo zostaniesz.",
          "Gdy przyszedł, wszyscy wstali.",
        ],
      },
      correctAnswer: 1,
      tags: ["składnia", "zdania złożone"],
    },

    // Zadania o topice
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      question: "Topos 'locus amoenus' oznacza:",
      content: {
        options: [
          "miejsce przyjemne, rajski ogród",
          "miejsce straszne",
          "miejsce święte",
          "miejsce puste",
        ],
      },
      correctAnswer: 0,
      tags: ["toposy", "teoria literatury"],
    },

    // Zadania o wersyfikacji
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question:
        "Czym jest trzynastozgłoskowiec i w jakim utworze został użyty?",
      content: {
        hint: "Polski wers narodowy",
      },
      tags: ["wersyfikacja", "Pan Tadeusz"],
    },

    // Zadania o prądach literackich
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question: "Które cechy są charakterystyczne dla naturalizmu?",
      content: {
        options: [
          "determinizm",
          "idealizacja rzeczywistości",
          "biologizm",
          "spirytualizm",
          "przedstawianie brzydoty",
          "eskapizm",
        ],
      },
      correctAnswer: [0, 2, 4],
      tags: ["naturalizm", "prądy literackie"],
    },

    // Zadania interpretacyjne
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      question:
        "Zinterpretuj symbolikę kamieni w 'Kamiennym świecie' Tadeusza Borowskiego.",
      content: {
        requirements: ["Kontekst obozowy", "Dehumanizacja", "Symbolika"],
      },
      tags: ["Borowski", "symbolika", "wojna"],
    },

    // Zadania o kontekstach
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question: "Wyjaśnij kontekst biograficzny 'Trenów' Jana Kochanowskiego.",
      content: {
        hint: "Śmierć córki Urszulki",
      },
      tags: ["Treny", "kontekst biograficzny"],
    },

    // Zadania o filozofii
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      question: "Która filozofia wpłynęła na twórczość Jana Kochanowskiego?",
      content: {
        options: ["stoicyzm", "epikureizm", "platonizm", "egzystencjalizm"],
      },
      correctAnswer: 0,
      tags: ["filozofia", "renesans", "Kochanowski"],
    },

    // Zadania o intertekstualności
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      question:
        "Wskaż i omów nawiązania do 'Hamleta' w 'Fortepianie Szopena' C.K. Norwida.",
      content: {
        requirements: ["Cytaty", "Interpretacja", "Funkcja nawiązań"],
      },
      tags: ["intertekstualność", "Norwid", "Shakespeare"],
    },

    // Zadania o epoce współczesnej
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      question:
        "Jak Czesław Miłosz w wierszu 'Piosenka' nawiązuje do Księgi Koheleta?",
      content: {
        hint: "Motyw przemijania i marności",
      },
      tags: ["Miłosz", "Kohelet", "przemijanie"],
    },

    // Zadania o stylu
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które cechy charakteryzują styl nominalny?",
      content: {
        options: [
          "Przewaga rzeczowników",
          "Dużo czasowników",
          "Konstrukcje bezosobowe",
          "Zdania pojedyncze",
          "Rozbudowane zdania złożone",
          "Abstrakcyjność",
        ],
      },
      correctAnswer: [0, 2, 5],
      tags: ["style", "język"],
    },
  ];

  // =====================
  // 6. ZAPISYWANIE DO BAZY
  // =====================

  const allExercises = [
    ...languageExercises,
    ...literaryExercises,
    ...essayExercises,
    ...additionalExercises,
  ];

  console.log(`📝 Zapisuję ${allExercises.length} zadań...`);

  for (const [index, exercise] of allExercises.entries()) {
    try {
      await prisma.exercise.create({
        data: exercise as any,
      });

      if ((index + 1) % 10 === 0) {
        console.log(`   Zapisano ${index + 1} zadań...`);
      }
    } catch (error) {
      console.error(`❌ Błąd przy zadaniu ${index + 1}:`, error);
    }
  }

  console.log(`✅ Utworzono ${allExercises.length} zadań!`);

  // =====================
  // 7. PRZYKŁADOWE ZGŁOSZENIA I OCENY
  // =====================

  // Przykładowe zgłoszenia studenta
  const submission1 = await prisma.submission.create({
    data: {
      userId: student1.id,
      exerciseId: (await prisma.exercise.findFirst())!.id,
      answer: { text: "Oksymoron to zestawienie sprzecznych pojęć" },
      score: 85,
      assessedBy: "AI",
      timeSpent: 180,
    },
  });

  const submission2 = await prisma.submission.create({
    data: {
      userId: student1.id,
      exerciseId: (await prisma.exercise.findFirst({
        where: { type: "ESSAY" },
      }))!.id,
      answer: {
        text: "Bohater romantyczny to postać charakteryzująca się...",
      },
      assessedBy: "AI",
      timeSpent: 2400,
    },
  });

  // Przykładowa ocena AI
  await prisma.assessment.create({
    data: {
      submissionId: submission2.id,
      userId: student1.id,
      formalScore: 1,
      literaryScore: 12,
      compositionScore: 5,
      languageScore: 8,
      totalScore: 26,
      detailedFeedback: {
        strengths: [
          "Poprawne odwołania do lektur",
          "Dobra struktura wypowiedzi",
        ],
        weaknesses: [
          "Brak pogłębionej analizy",
          "Powierzchowne wykorzystanie kontekstów",
        ],
        suggestions: [
          "Rozwiń analizę motywów romantycznych",
          "Dodaj więcej cytatów",
        ],
      },
      improvements: ["Pogłębienie analizy", "Więcej kontekstów"],
    },
  });

  // =====================
  // 8. POWIADOMIENIA
  // =====================

  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "ACHIEVEMENT",
      title: "Nowe osiągnięcie!",
      message: "Zdobyłeś odznakę 'Mistrz Romantyzmu'!",
      actionUrl: "/achievements",
    },
  });

  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "REMINDER",
      title: "Czas na powtórkę!",
      message: "Masz 5 zadań do przeglądu w systemie powtórek",
      actionUrl: "/review",
    },
  });

  // =====================
  // 9. CELE NAUKI
  // =====================

  await prisma.studyGoal.create({
    data: {
      userId: student1.id,
      title: "Opanować wszystkie epoki literackie",
      description: "Przerobić po 20 zadań z każdej epoki",
      targetDate: new Date("2025-04-01"),
    },
  });

  await prisma.studyGoal.create({
    data: {
      userId: student1.id,
      title: "Napisać 10 wypracowań",
      description: "Przygotowanie do matury - różne tematy",
      targetDate: new Date("2025-04-30"),
    },
  });

  // =====================
  // 10. POSTĘP DZIENNY
  // =====================

  const today = new Date();
  await prisma.dailyProgress.create({
    data: {
      userId: student1.id,
      date: today,
      exercisesCount: 15,
      studyTime: 120,
      averageScore: 82.5,
      notes: "Dobry dzień, skupienie na romantyzmie",
    },
  });

  console.log("\n🎉 Seed zakończony pomyślnie!");
  console.log("\n📚 Statystyki:");
  console.log(`   - Zadania: ${allExercises.length}`);
  console.log(`   - Użytkownicy: 3`);
  console.log(`   - Zgłoszenia: 2`);
  console.log(`   - Oceny: 1`);

  console.log("\n🔑 Dane logowania:");
  console.log("   Admin: admin@matura-polski.pl / Admin123!");
  console.log("   Student 1: jan.kowalski@example.com / Student123!");
  console.log("   Student 2: anna.nowak@example.com / Student123!");
}

seed()
  .catch((e) => {
    console.error("❌ Błąd podczas seedowania:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
