// backend/prisma/seed-exercises.ts
import {
  PrismaClient,
  ExerciseType,
  Category,
  LiteraryEpoch,
} from "@prisma/client";

const prisma = new PrismaClient();

// Zdefiniuj typ dla exercise seed data
type ExerciseSeedData = {
  type: ExerciseType;
  category: Category;
  difficulty: number;
  points: number;
  question: string;
  content: any;
  correctAnswer?: any;
  rubric?: any;
  metadata?: any;
  epoch?: LiteraryEpoch;
  work?: string;
  tags?: string[];
};

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  // Usuń w odpowiedniej kolejności (od najbardziej zależnych)
  console.log("🗑️  Usuwanie powiązanych danych...");

  await prisma.assessment.deleteMany({});
  console.log("✅ Usunięto assessments");

  await prisma.submission.deleteMany({});
  console.log("✅ Usunięto submissions");

  await prisma.spacedRepetition.deleteMany({});
  console.log("✅ Usunięto spacedRepetitions");

  await prisma.exerciseUsage.deleteMany({});
  console.log("✅ Usunięto exerciseUsage");

  await prisma.examQuestion.deleteMany({});
  console.log("✅ Usunięto examQuestions");

  await prisma.aiUsage.deleteMany({});
  console.log("✅ Usunięto aiUsage");

  await prisma.exercise.deleteMany({});
  console.log("✅ Usunięto exercises");

  const exercises: ExerciseSeedData[] = [
    // ========== LANGUAGE_USE - CLOSED_SINGLE (20 pytań) ==========
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym zdaniu jest błąd?",
      content: {
        options: [
          "Czytam książkę od godziny.",
          "Idę do lekarza.",
          "Spotkałem się z problemem.",
          "Piszę list do babci.",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Błąd: 'spotkałem się z problemem' - poprawnie: 'napotkałem problem'",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      question: "Który motyw NIE jest typowy dla baroku?",
      content: {
        options: [
          "vanitas - przemijanie",
          "carpe diem - chwytaj dzień",
          "praca organiczna",
          "theatrum mundi - świat jako teatr",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Praca organiczna to hasło pozytywizmu, nie baroku",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które słowo jest NIEPOPRAWNE ortograficznie?",
      content: {
        options: ["rzeczpospolita", "Rzeszów", "rzeka", "rzeźba"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Wyraz 'Rzeczpospolita' jako nazwa państwa polskiego musi być pisany wielką literą. Jest to nazwa własna, podobnie jak 'Polska' czy 'Niemcy'. Małą literą piszemy tylko gdy mówimy o rzeczpospolitej jako formie ustroju (np. 'rzeczpospolita rzymska').",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest antonim?",
      content: {
        contextLinks: [
          {
            trigger: "antonim",
            title: "Antonim - relacja znaczeniowa",
            type: "text",
            content:
              "Antonim to wyraz o znaczeniu przeciwnym do innego wyrazu. Antonimy tworzą pary przeciwstawne: biały - czarny, dobry - zły, wysoki - niski, gorący - zimny. Rozróżniamy antonimy gradacyjne (dopuszczające stopniowanie: ciepły - zimny), komplementarne (wykluczające się: żywy - martwy) oraz konwersywne (relacyjne: kupić - sprzedać, dawać - brać).",
            moreInfoLink: "",
          },
        ],
        options: [
          "słowo obce",
          "słowo podobne brzmieniem",
          "słowo o przeciwnym znaczeniu",
          "słowo wieloznaczne",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Antonim to słowo o przeciwnym znaczeniu (np. dobry - zły, gorący - zimny). Słowo obce to zapożyczenie z innego języka, słowa podobne brzmieniem to paronimy (np. efekt - afekt), a słowo wieloznaczne to polisem (np. zamek - budowla lub urządzenie).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      question: "Który utwór NIE jest dramatem?",
      content: {
        contextLinks: [
          {
            trigger: "dramatem",
            title: "Dramat jako rodzaj literacki",
            type: "text",
            content:
              "Dramat to utwór literacki przeznaczony do wystawienia na scenie teatralnej. Charakteryzuje się dialogiem postaci, podziałem na akty i sceny, didaskaliami (wskazówkami scenicznymi) oraz brakiem narratora. W romantyzmie popularne były dramaty romantyczne (np. 'Dziady', 'Kordian'), łączące elementy realizmu z fantastyką i symboliką. Dramat różni się od epiki (opowiadanie, powieść) i liryki (wiersz).",
            moreInfoLink: "",
          },
        ],
        options: ["Dziady", "Pan Tadeusz", "Kordian", "Nie-Boska komedia"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pan Tadeusz to epopeja (gatunek epicki), nie dramat. Utwór Mickiewicza ma formę poematu narracyjnego z narratorem opowiadającym historię. Pozostałe utwory (Dziady, Kordian, Nie-Boska komedia) to dramaty - utwory dialogowe przeznaczone do wystawienia na scenie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Który środek stylistyczny dominuje?",
      content: {
        contextLinks: [
          {
            trigger: "środek stylistyczny",
            title: "Środki stylistyczne w języku",
            type: "text",
            content:
              "Środki stylistyczne to zabiegi językowe służące upiększeniu wypowiedzi i wzmocnieniu jej wyrazu. Należą do nich m.in.: metafora (przenośnia bez słowa porównującego: 'czas to pieniądz'), porównanie (zestawienie z użyciem 'jak', 'jakby': 'biały jak śnieg'), personifikacja (nadanie cech ludzkich: 'wiatr szeptał'), epitet (określenie barwne: 'srebrny księżyc'). Środki te wzbogacają tekst i nadają mu artystyczny charakter.",
            moreInfoLink: "",
          },
        ],
        text: "Życie to podróż bez mapy, gdzie każdy krok to zagadka.",
        options: [
          "personifikacja",
          "metafora rozbudowana",
          "porównanie",
          "epitet",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To metafora rozbudowana - życie zostało porównane do podróży bez użycia słowa 'jak' czy 'jakby'. Metafora jest rozwinięta przez kolejne obrazy (brak mapy, kroki jako zagadki). Nie ma tu personifikacji (brak cech ludzkich nadanych rzeczom), porównania (brak 'jak') ani epitetu (brak przymiotnika określającego).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      question: "Który gatunek był popularny w oświeceniu?",
      content: {
        options: ["ballada", "hymn", "bajka alegoryczna", "powieść gotycka"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile samogłosek nosowych występuje w języku polskim?",
      content: {
        options: ["1", "2", "3", "4"],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "ą i ę",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Który symbol pojawia się w Weselu Wyspiańskiego?",
      content: {
        options: ["biały orzeł", "róża", "złoty róg", "krzyż"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Które zdanie jest poprawne składniowo?",
      content: {
        options: [
          "Spotkałem się z przyjacielem do kina.",
          "Idę do fryzjera na obcięcie włosów.",
          "Byłem u lekarza w sprawie badań.",
          "Poszedłem z kolegą po zakupach.",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Jaka figura retoryczna?",
      content: {
        text: "Przyszedł, zobaczył, zwyciężył.",
        options: ["metafora", "anafora", "asyndeton", "epifora"],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Asyndeton - brak spójników między członami",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Który poeta NIE był romantykiem?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Juliusz Słowacki",
          "Jan Kochanowski",
          "Cyprian Norwid",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Kochanowski to renesans",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co oznacza „mieć węża w kieszeni”?",
      content: {
        options: [
          "nosić zwierzę",
          "być niebezpiecznym",
          "być skąpym",
          "być podstępnym",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      question: "Który nurt dwudziestolecia był awangardowy?",
      content: {
        options: [
          "Skamander",
          "Cyganeria",
          "Awangarda Krakowska",
          "Naturalizm",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz ma inny rdzeń?",
      content: {
        options: ["pisać", "pismo", "pisarz", "piasek"],
      },
      correctAnswer: 3,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Określ funkcję składniową: „Mama dała *córce* prezent.”",
      content: {
        options: [
          "dopełnienie bliższe",
          "dopełnienie dalsze",
          "okolicznik",
          "przydawka",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      question: "Czym zajmował się Jan Kochanowski PRZED literaturą?",
      content: {
        options: [
          "był żołnierzem",
          "studiował we Włoszech",
          "był kupcem",
          "był nauczycielem",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym przypadku występuje wyraz „domem”?",
      content: {
        options: ["mianownik", "dopełniacz", "narzędnik", "miejscownik"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      question: "Która cecha NIE charakteryzuje postmodernizmu?",
      content: {
        options: [
          "intertekstualność",
          "realizm i obiektywizm",
          "ironia i pastisz",
          "fragmentaryczność",
        ],
      },
      correctAnswer: 1,
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Jaki typ zdania złożonego?",
      content: {
        sentence: "Pada i wieje, więc zostanę w domu.",
        options: [
          "tylko współrzędne",
          "tylko podrzędne",
          "współrzędne i podrzędne",
          "pojedyncze",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Która powieść NIE jest pozytywistyczna?",
      content: {
        options: ["Lalka", "Nad Niemnem", "Wesele", "Chłopi"],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Wesele to Młoda Polska",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest oksymoron?",
      content: {
        options: [
          "powtórzenie wyrazu",
          "połączenie sprzeczności",
          "wyolbrzymienie",
          "porównanie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Np. „żywy trup”, „głośna cisza”",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Ile wersów ma sonet?",
      content: {
        options: ["12", "14", "16", "18"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Który przykład to synekdocha?",
      content: {
        options: [
          "biały jak śnieg",
          "Polska wygrała mecz (=reprezentacja)",
          "czas płynie",
          "serce z kamienia",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który spójnik łączy przyczynę i skutek?",
      content: {
        options: ["i", "ale", "więc", "lub"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Dziady cz. III",
      question: "Gdzie rozgrywa się akcja Dziadów cz. III?",
      content: {
        options: ["w Wilnie", "w Warszawie", "w Paryżu", "w Petersburgu"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Które zdanie ma błąd logiczny?",
      content: {
        options: [
          "Wziąłem parasol, bo pada.",
          "Pada, więc wziąłem parasol.",
          "Wziąłem parasol, więc pada.",
          "Pada, ale wziąłem parasol.",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      question: "Który poeta barokowy był marinistą?",
      content: {
        options: [
          "Jan Andrzej Morsztyn",
          "Wacław Potocki",
          "Daniel Naborowski",
          "Sebastian Klonowic",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Jaki błąd składniowy?",
      content: {
        sentence: "Ten film jest lepszy jak tamten.",
        options: [
          "brak błędu",
          "błędny spójnik - powinno być „niż”",
          "błędny czas",
          "błędna liczba",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Która litera to głoska dźwięczna?",
      content: {
        options: ["p", "t", "k", "d"],
      },
      correctAnswer: 3,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      question: "Kto NIE był oświeceniowcem?",
      content: {
        options: [
          "Ignacy Krasicki",
          "Adam Naruszewicz",
          "Stanisław Trembecki",
          "Mikołaj Rej",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation: "Rej to renesans",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest homonim?",
      content: {
        options: [
          "słowo podobne brzmieniem",
          "słowa jednakowe, ale różne znaczeniem",
          "słowo obce",
          "słowo wieloznaczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Np. 'zamek' (budowla) i 'zamek' (w drzwiach)",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      question: "Jaki prąd filozoficzny wpłynął na Młodą Polskę?",
      content: {
        options: ["pozytywizm", "racjonalizm", "nietzscheanizm", "scholastyka"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Określ typ błędu: „Mama i tata jest w domu.”",
      content: {
        options: [
          "błąd ortograficzny",
          "niezgodność liczby orzeczenia z podmiotem",
          "błąd interpunkcyjny",
          "brak błędu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Powinno być: „są w domu”",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      question: "Który dramat to teatr absurdu?",
      content: {
        options: ["Wesele", "Tango", "Kordian", "Wyzwolenie"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Które zdania zawierają BŁĘDY składniowe?",
      content: {
        options: [
          "Czytam książkę od godziny.",
          "Spotkałem się z problemem.",
          "Idę do fryzjera na obcięcie.",
          "Piszę list do babci.",
          "Wracam z pracy.",
        ],
      },
      correctAnswer: [1, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Dziady, Kordian",
      question: "Dopasuj bohatera do jego dylematu.",
      content: {
        matchingType: "character_dilemma",
        leftColumn: [
          { id: "A", text: "Konrad" },
          { id: "B", text: "Kordian" },
          { id: "C", text: "Gustaw" },
        ],
        rightColumn: [
          { id: 1, text: "niezdecydowanie i wahanie" },
          { id: 2, text: "bunt przeciw Bogu" },
          { id: 3, text: "nieszczęśliwa miłość" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są NIEPOPRAWNE ortograficznie?",
      content: {
        options: ["rzeka", "morsze", "może", "rzerzucha", "żaba"],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Uzupełnij zaawansowaną analizę zdania.",
      content: {
        textWithGaps:
          "Pomimo że [1] intensywnie, nie [2] rezultatów, bo metoda była [3].",
        gaps: [
          {
            id: 1,
            options: ["pracował", "pracowałem", "pracowali", "pracując"],
          },
          {
            id: 2,
            options: ["osiągnął", "osiągnąłem", "osiągnęli", "osiągnę"],
          },
          {
            id: 3,
            options: [
              "niewłaściwa",
              "niewłaściwe",
              "niewłaściwi",
              "niewłaściwy",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 0],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Które motywy NIE występują w romantyzmie?",
      content: {
        options: [
          "mesjanizm",
          "praca organiczna",
          "egzotyka",
          "pozytywizm naukowy",
          "historia",
        ],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "W których fragmentach występuje personifikacja?",
      content: {
        options: [
          "Wiatr szeptał tajemnice",
          "Był biały jak śnieg",
          "Drzewa kłaniały się nisko",
          "Księżyc świeci jasno",
          "Morze śpiewało kołysankę",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 5,
      question: "Dopasuj epokę do jej GŁÓWNEJ cechy.",
      content: {
        matchingType: "epoch_main_feature",
        leftColumn: [
          { id: "A", text: "Barok" },
          { id: "B", text: "Oświecenie" },
          { id: "C", text: "Młoda Polska" },
        ],
        rightColumn: [
          { id: 1, text: "rozum i nauka" },
          { id: 2, text: "sztuka dla sztuki" },
          { id: 3, text: "przemijanie i śmierć" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są w czasie PRZYSZŁYM?",
      content: {
        options: [
          "Wczoraj byłem w kinie.",
          "Jutro pójdę do szkoły.",
          "Teraz czytam książkę.",
          "Za tydzień pojadę na wakacje.",
          "Kiedyś będę lekarzem.",
        ],
      },
      correctAnswer: [1, 3, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Uzupełnij tekst odpowiednimi formami czasowników.",
      content: {
        textWithGaps: "Gdybym [1] wcześniej, [2] na pociąg, ale niestety [3].",
        gaps: [
          {
            id: 1,
            options: ["wyjdę", "wyszedł", "wyszedłbym", "wychodzę"],
          },
          {
            id: 2,
            options: ["zdążę", "zdążyłbym", "zdążyłem", "zdążając"],
          },
          {
            id: 3,
            options: [
              "spóźnię się",
              "spóźniłem się",
              "spóźniłbym się",
              "spóźniając",
            ],
          },
        ],
      },
      correctAnswer: [2, 1, 1],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "W których wyrazach występuje 'ó' wymawiane jako [u]?",
      content: {
        options: ["góra", "koło", "wóz", "grono", "stół"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Które zdania zawierają elipsę (opuszczenie)?",
      content: {
        options: [
          "Anna czyta, a Piotr pisze.",
          "Ja wolę kawę, ty - herbatę.",
          "Dzieci bawią się w ogrodzie.",
          "Mama w kuchni, tata - w salonie.",
          "Wszyscy są szczęśliwi.",
        ],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Które dzieła napisał Jan Kochanowski?",
      content: {
        options: [
          "Treny",
          "Pan Tadeusz",
          "Odprawa posłów greckich",
          "Lalka",
          "Pieśni",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij zdania odpowiednimi przyimkami.",
      content: {
        textWithGaps:
          "Idę [1] lekarza [2] sprawie badań, a potem wrócę [3] szkoły.",
        gaps: [
          {
            id: 1,
            options: ["do", "od", "z", "na"],
          },
          {
            id: 2,
            options: ["z", "w", "na", "po"],
          },
          {
            id: 3,
            options: ["do", "z", "w", "od"],
          },
        ],
      },
      correctAnswer: [0, 1, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "BAROQUE",
      question: "Dopasuj motyw barokowy do przykładu.",
      content: {
        matchingType: "motif_example",
        leftColumn: [
          { id: "A", text: "vanitas" },
          { id: "B", text: "carpe diem" },
          { id: "C", text: "theatrum mundi" },
        ],
        rightColumn: [
          { id: 1, text: "korzystaj z chwili" },
          { id: 2, text: "świat jako teatr" },
          { id: 3, text: "wszystko przemija" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są przymiotnikami w stopniu NAJWYŻSZYM?",
      content: {
        options: [
          "wysoki",
          "wyższy",
          "najwyższy",
          "mądrzejszy",
          "najmądrzejszy",
        ],
      },
      correctAnswer: [2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "W których zdaniach występuje inwersja (zmieniony szyk)?",
      content: {
        options: [
          "Dzieci bawią się w ogrodzie.",
          "Bawią się dzieci w ogrodzie.",
          "Anna czyta książkę.",
          "Księżyc świeci jasno.",
          "Świeci księżyc jasno.",
        ],
      },
      correctAnswer: [1, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ENLIGHTENMENT",
      question: "Dopasuj gatunek do jego funkcji w oświeceniu.",
      content: {
        matchingType: "genre_function",
        leftColumn: [
          { id: "A", text: "bajka" },
          { id: "B", text: "komedia" },
          { id: "C", text: "satyra" },
        ],
        rightColumn: [
          { id: 1, text: "krytyka śmiesznych wad" },
          { id: 2, text: "pouczenie przez alegorię" },
          { id: 3, text: "ostra krytyka społeczna" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które frazeologizmy oznaczają 'uciec'?",
      content: {
        options: [
          "wziąć nogi za pas",
          "mieć muchy w nosie",
          "drapnąć w długą",
          "grać komuś na nosie",
          "puścić się pędem",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 5,
      question: "Uzupełnij charakterystykę epok.",
      content: {
        textWithGaps:
          "W romantyzmie dominował [1], w pozytywizmie [2], a w Młodej Polsce [3].",
        gaps: [
          {
            id: 1,
            options: ["rozum", "uczucie", "realizm", "nauka"],
          },
          {
            id: 2,
            options: ["uczucie", "nauka", "sztuka", "wiara"],
          },
          {
            id: 3,
            options: ["praca", "sztuka dla sztuki", "rozum", "patriotyzm"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są PYTAJĄCE?",
      content: {
        options: [
          "Jak się masz?",
          "Idę do sklepu.",
          "Czy lubisz czytać?",
          "To jest dom.",
          "Kiedy przyjdziesz?",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Dopasuj przykład do typu zdania złożonego.",
      content: {
        matchingType: "sentence_complex_types",
        leftColumn: [
          { id: "A", text: "Pada i wieje." },
          { id: "B", text: "Kiedy pada, zostaję w domu." },
          { id: "C", text: "Pada, ale wyjdę." },
        ],
        rightColumn: [
          { id: 1, text: "podrzędne okolicznikowe" },
          { id: 2, text: "współrzędne łączne" },
          { id: 3, text: "współrzędne przeciwstawne" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Które utwory są DRAMATAMI?",
      content: {
        options: [
          "Wesele",
          "Lalka",
          "Kordian",
          "Pan Tadeusz",
          "Nie-Boska komedia",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "W których zdaniach podmiot jest UKRYTY?",
      content: {
        options: [
          "Idę do szkoły.",
          "Kot śpi.",
          "Czytamy książki.",
          "Pada deszcz.",
          "Lubię muzykę.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "YOUNG_POLAND",
      question: "Dopasuj twórcę Młodej Polski do jego dziedziny.",
      content: {
        matchingType: "artist_field",
        leftColumn: [
          { id: "A", text: "Wyspiański" },
          { id: "B", text: "Tetmajer" },
          { id: "C", text: "Żeromski" },
        ],
        rightColumn: [
          { id: 1, text: "proza społeczna" },
          { id: 2, text: "dramat symboliczny" },
          { id: 3, text: "liryka impresjonistyczna" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które znaki to znaki interpunkcyjne?",
      content: {
        options: [".", "a", "?", "5", ","],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Uzupełnij analizę środków stylistycznych.",
      content: {
        textWithGaps:
          "Zdanie 'Czas płynie jak rzeka' zawiera [1] oraz [2], gdzie czasowi przypisano cechę [3].",
        gaps: [
          {
            id: 1,
            options: ["metaforę", "porównanie", "epitet", "personifikację"],
          },
          {
            id: 2,
            options: ["metaforę", "porównanie", "symbol", "hiperbola"],
          },
          {
            id: 3,
            options: ["ludzką", "abstrakcyjną", "wodną", "fizyczną"],
          },
        ],
      },
      correctAnswer: [1, 0, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Które gatunki należą do LIRYKI?",
      content: {
        options: ["wiersz", "powieść", "sonet", "dramat", "oda"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "W których zdaniach występuje METAFORA?",
      content: {
        options: [
          "Jego serce było z lodu.",
          "Jest biały jak śnieg.",
          "Morze wspomnień zalewa mnie.",
          "Pada deszcz.",
          "Czas płynie nieubłaganie.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 5,
      epoch: "INTERWAR",
      question: "Dopasuj poetę dwudziestolecia do nurtu.",
      content: {
        matchingType: "poet_movement_interwar",
        leftColumn: [
          { id: "A", text: "Tuwim" },
          { id: "B", text: "Przyboś" },
          { id: "C", text: "Czechowicz" },
        ],
        rightColumn: [
          { id: 1, text: "Katastrofizm" },
          { id: 2, text: "Skamander" },
          { id: 3, text: "Awangarda Krakowska" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są CZASOWNIKAMI?",
      content: {
        options: ["biegać", "szybki", "pisać", "piękno", "czytać"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "W których przykładach jest SYNEKDOCHA?",
      content: {
        options: [
          "Polska wygrała (=reprezentacja)",
          "biały jak śnieg",
          "dach nad głową (=dom)",
          "czas płynie",
          "głodne usta (=ludzie)",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      question: "Dopasuj autora pozytywistycznego do jego dzieła.",
      content: {
        matchingType: "positivist_works",
        leftColumn: [
          { id: "A", text: "Prus" },
          { id: "B", text: "Orzeszkowa" },
          { id: "C", text: "Reymont" },
        ],
        rightColumn: [
          { id: 1, text: "Chłopi" },
          { id: 2, text: "Lalka" },
          { id: 3, text: "Nad Niemnem" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które zdania są POPRAWNE składniowo?",
      content: {
        options: [
          "Czytam książkę od godziny.",
          "Spotkałem się z problemem.",
          "Byłem u lekarza w sprawie badań.",
          "Idę do fryzjera na obcięcie.",
          "Wracam z pracy.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "CONTEMPORARY",
      question: "Które cechy charakteryzują literaturę absurdu?",
      content: {
        options: [
          "brak logiki i przyczynowości",
          "realizm i prawdopodobieństwo",
          "niemożność komunikacji",
          "optymizm i wiara w postęp",
          "świat pozbawiony sensu",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które słowa są napisane POPRAWNIE?",
      content: {
        options: ["rzeka", "może", "morsze", "żaba", "rzerba"],
      },
      correctAnswer: [0, 1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Uzupełnij złożoną analizę składniową.",
      content: {
        textWithGaps:
          "W zdaniu 'Anna, która lubi czytać, poszła do biblioteki' występuje zdanie [1] wtrącone, podmiot [2], a całość jest zdaniem [3].",
        gaps: [
          {
            id: 1,
            options: [
              "współrzędne",
              "podrzędne",
              "pojedyncze",
              "wielokrotnie złożone",
            ],
          },
          {
            id: 2,
            options: ["Anna", "która", "biblioteki", "poszła"],
          },
          {
            id: 3,
            options: [
              "pojedynczym",
              "współrzędnie złożonym",
              "podrzędnie złożonym",
              "równoważnikiem",
            ],
          },
        ],
      },
      correctAnswer: [1, 0, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Którzy autorzy NALEŻĄ do kanonu lektur?",
      content: {
        options: [
          "Adam Mickiewicz",
          "J.K. Rowling",
          "Bolesław Prus",
          "Stephen King",
          "Henryk Sienkiewicz",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są rzeczownikami?",
      content: {
        options: ["pies", "biegać", "dom", "szybko", "książka"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są poprawne?",
      content: {
        options: [
          "Ania poszła do szkoły.",
          "Ania poszedł do szkoły.",
          "Dzieci bawią się.",
          "Dzieci bawi się.",
          "Kot śpi na dywanie.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ROMANTICISM",
      question: "Którzy poeci byli romantykami?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Bolesław Prus",
          "Juliusz Słowacki",
          "Jan Kochanowski",
          "Cyprian Norwid",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij luki w tekście.",
      content: {
        textWithGaps:
          "Wczoraj [1] do parku i [2] się z przyjaciółmi. Pogoda była [3].",
        gaps: [
          {
            id: 1,
            options: ["poszedłem", "idę", "pójdę", "chodzę"],
          },
          {
            id: 2,
            options: ["spotykam", "spotkałem", "spotkam", "spotykać"],
          },
          {
            id: 3,
            options: ["piękny", "piękna", "piękne", "piękni"],
          },
        ],
      },
      correctAnswer: [0, 1, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które litery to spółgłoski?",
      content: {
        options: ["a", "b", "e", "k", "m"],
      },
      correctAnswer: [1, 3, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które zdania zawierają metaforę?",
      content: {
        options: [
          "Jej serce było z lodu",
          "Pada deszcz",
          "Czas płynie",
          "Czytam książkę",
          "Jest zimno jak w lodówce",
        ],
      },
      correctAnswer: [0, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      question: "Dopasuj autora do dzieła.",
      content: {
        matchingType: "author_to_work",
        leftColumn: [
          { id: "A", text: "Adam Mickiewicz" },
          { id: "B", text: "Bolesław Prus" },
          { id: "C", text: "Jan Kochanowski" },
        ],
        rightColumn: [
          { id: 1, text: "Pan Tadeusz" },
          { id: 2, text: "Lalka" },
          { id: 3, text: "Treny" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Uzupełnij zdania odpowiednimi spójnikami.",
      content: {
        textWithGaps:
          "Chciałem wyjść, [1] padało. Zostałem w domu [2] poczytałem książkę. Nie żałuję, [3] książka była ciekawa.",
        gaps: [
          {
            id: 1,
            options: ["ale", "i", "więc", "lub"],
          },
          {
            id: 2,
            options: ["ale", "i", "więc", "albo"],
          },
          {
            id: 3,
            options: ["i", "ale", "bo", "więc"],
          },
        ],
      },
      correctAnswer: [0, 1, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Które gatunki literackie należą do epiki?",
      content: {
        options: ["powieść", "wiersz", "opowiadanie", "sonet", "nowela"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "W których wyrazach jest 'rz'?",
      content: {
        options: ["morze", "może", "rzeka", "żaba", "przez"],
      },
      correctAnswer: [2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Dopasuj funkcję języka do przykładu.",
      content: {
        matchingType: "language_functions",
        leftColumn: [
          { id: "A", text: "Jak się masz?" },
          { id: "B", text: "Jestem szczęśliwy!" },
          { id: "C", text: "Ziemia krąży wokół Słońca." },
        ],
        rightColumn: [
          { id: 1, text: "funkcja fatyczna (kontaktowa)" },
          { id: 2, text: "funkcja emotywna (ekspresywna)" },
          { id: 3, text: "funkcja poznawcza (referencyjna)" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      question: "Które cechy charakteryzują renesans?",
      content: {
        options: [
          "humanizm",
          "pesymizm",
          "zainteresowanie antykiem",
          "mistycyzm",
          "harmonia i proporcje",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które zdania są pytaniami?",
      content: {
        options: [
          "Jak się masz?",
          "Idę do szkoły.",
          "Gdzie mieszkasz?",
          "To jest kot.",
          "Czy lubisz czekoladę?",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij tekst odpowiednimi końcówkami.",
      content: {
        textWithGaps:
          "Moja siostra [1] do szkoły. Tam [2] z koleżankami i [3] lekcje.",
        gaps: [
          {
            id: 1,
            options: ["chodzi", "chodził", "chodzą", "chodzić"],
          },
          {
            id: 2,
            options: ["spotyka się", "spotykają", "spotkać", "spotkali"],
          },
          {
            id: 3,
            options: ["ma", "mają", "mieć", "miał"],
          },
        ],
      },
      correctAnswer: [0, 0, 0],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      question: "Które motywy są typowe dla romantyzmu?",
      content: {
        options: [
          "bunt przeciw konwencjom",
          "praca organiczna",
          "indywidualizm bohatera",
          "rozum i nauka",
          "egzotyka i historia",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są czasownikami?",
      content: {
        options: ["czytać", "książka", "pisać", "szybki", "biegać"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "W których zdaniach jest podmiot domyślny?",
      content: {
        options: [
          "Czytam książkę.",
          "Kot śpi.",
          "Idziemy do kina.",
          "Pada deszcz.",
          "Lubię muzykę.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "POSITIVISM",
      question: "Dopasuj ideę pozytywizmu do jej znaczenia.",
      content: {
        matchingType: "ideas_meanings",
        leftColumn: [
          { id: "A", text: "praca organiczna" },
          { id: "B", text: "pozytywizm" },
          { id: "C", text: "praca u podstaw" },
        ],
        rightColumn: [
          { id: 1, text: "małe, codzienne działania" },
          { id: 2, text: "filozofia oparta na nauce" },
          { id: 3, text: "edukacja ludu" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Które zdania są złożone podrzędnie?",
      content: {
        options: [
          "Kiedy pada, zostaję w domu.",
          "Pada i wieje.",
          "Wiem, że przyjdziesz.",
          "Czytam lub piszę.",
          "Ponieważ jestem zmęczony, pójdę spać.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy oznaczają kolory?",
      content: {
        options: ["czerwony", "szybko", "niebieski", "dom", "zielony"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Które utwory są dramatami?",
      content: {
        options: ["Wesele", "Pan Tadeusz", "Dziady", "Lalka", "Kordian"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy mają przedrostek?",
      content: {
        options: ["napisać", "pisać", "przepisać", "pisarz", "wypisać"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Uzupełnij analizę zdania.",
      content: {
        textWithGaps:
          "W zdaniu 'Dzieci bawią się w ogrodzie' słowo 'dzieci' to [1], 'bawią się' to [2], a 'w ogrodzie' to [3].",
        gaps: [
          {
            id: 1,
            options: ["podmiot", "orzeczenie", "dopełnienie", "okolicznik"],
          },
          {
            id: 2,
            options: ["podmiot", "orzeczenie", "dopełnienie", "okolicznik"],
          },
          {
            id: 3,
            options: [
              "podmiot",
              "orzeczenie",
              "dopełnienie",
              "okolicznik miejsca",
            ],
          },
        ],
      },
      correctAnswer: [0, 1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ENLIGHTENMENT",
      question: "Które wartości były ważne w oświeceniu?",
      content: {
        options: [
          "rozum i nauka",
          "uczucia i intuicja",
          "edukacja",
          "mistycyzm",
          "tolerancja",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są poprawne ortograficznie?",
      content: {
        options: [
          "Wziąłem książkę.",
          "Wziąwem książkę.",
          "Poszedłem do domu.",
          "Poszłem do domu.",
          "Czytałem gazetę.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są przysłówkami?",
      content: {
        options: ["szybko", "szybki", "wczoraj", "dom", "głośno"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "BAROQUE",
      question: "Dopasuj motyw barokowy do jego znaczenia.",
      content: {
        matchingType: "motifs_baroque",
        leftColumn: [
          { id: "A", text: "vanitas" },
          { id: "B", text: "carpe diem" },
          { id: "C", text: "memento mori" },
        ],
        rightColumn: [
          { id: 1, text: "marność życia" },
          { id: 2, text: "korzystaj z dnia" },
          { id: 3, text: "pamiętaj o śmierci" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "W których zdaniach występuje elipsa (opuszczenie)?",
      content: {
        options: [
          "Anna czyta książkę, a Piotr - gazetę.",
          "Wszyscy siedzą w klasie.",
          "Mama w kuchni, tata w salonie.",
          "Dzieci biegają po placu.",
          "Ja wolę kawę, a ty - herbatę.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są przymiotnikami?",
      content: {
        options: ["piękny", "biegać", "wysoki", "szybko", "mądry"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Które gatunki należą do liryki?",
      content: {
        options: ["wiersz", "powieść", "oda", "opowiadanie", "sonet"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij zdania odpowiednimi przyimkami.",
      content: {
        textWithGaps: "Idę [1] szkoły. Spotkam się [2] przyjacielem [3] parku.",
        gaps: [
          {
            id: 1,
            options: ["do", "od", "z", "w"],
          },
          {
            id: 2,
            options: ["do", "z", "od", "na"],
          },
          {
            id: 3,
            options: ["do", "z", "w", "na"],
          },
        ],
      },
      correctAnswer: [0, 1, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Które zdania zawierają błędy składniowe?",
      content: {
        options: [
          "Poszedłem z kolegą do kina.",
          "Spotkałem się z tym problemem.",
          "Idę do fryzjera na obcięcie.",
          "Czytam ciekawą książkę.",
          "Jestem zadowolony z wyniku.",
        ],
      },
      correctAnswer: [1, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "YOUNG_POLAND",
      question: "Które cechy charakteryzują Młodą Polskę?",
      content: {
        options: [
          "sztuka dla sztuki",
          "praca organiczna",
          "symbolizm",
          "realizm",
          "pesymizm i dekadentyzm",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które znaki to znaki interpunkcyjne?",
      content: {
        options: [".", "a", "?", "5", "!"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "W których wyrazach jest 'ó' wymawiane jako 'u'?",
      content: {
        options: ["król", "koło", "góra", "grono", "wóz"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "INTERWAR",
      question: "Dopasuj poetę do nurtu dwudziestolecia.",
      content: {
        matchingType: "poets_interwar",
        leftColumn: [
          { id: "A", text: "Julian Tuwim" },
          { id: "B", text: "Tadeusz Peiper" },
          { id: "C", text: "Józef Czechowicz" },
        ],
        rightColumn: [
          { id: 1, text: "Skamander" },
          { id: 2, text: "Awangarda Krakowska" },
          { id: 3, text: "Katastrofizm" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Uzupełnij analizę środków stylistycznych.",
      content: {
        textWithGaps:
          "W zdaniu 'Morze wspomnień zalewa mnie' występuje [1], gdzie 'morze' to [2] wspomnień, a całość wyraża [3].",
        gaps: [
          {
            id: 1,
            options: ["porównanie", "metafora", "personifikacja", "epitet"],
          },
          {
            id: 2,
            options: ["mnóstwo", "mało", "trochę", "parę"],
          },
          {
            id: 3,
            options: ["radość", "przytłoczenie", "nudę", "obojętność"],
          },
        ],
      },
      correctAnswer: [1, 0, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są w czasie przeszłym?",
      content: {
        options: [
          "Wczoraj byłem w kinie.",
          "Dziś idę do szkoły.",
          "Przeczytałem książkę.",
          "Jutro pójdę na spacer.",
          "Bawiłem się z kolegą.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Które utwory napisał Adam Mickiewicz?",
      content: {
        options: ["Pan Tadeusz", "Lalka", "Dziady", "Treny", "Grażyna"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które frazeologizmy oznaczają 'być zmęczonym'?",
      content: {
        options: [
          "paść z nóg",
          "rzucać słowa na wiatr",
          "nie móc się ruszyć",
          "grać komuś na nosie",
          "być u kresu sił",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "W których zdaniach występuje inwersja (zmieniony szyk)?",
      content: {
        options: [
          "Księżyc świeci jasno.",
          "Świeci jasno księżyc.",
          "Anna czyta książkę.",
          "Czyta Anna książkę.",
          "Dzieci bawią się.",
        ],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      question: "Które cechy są typowe dla literatury absurdu?",
      content: {
        options: [
          "brak logicznej fabuły",
          "realizm i prawdopodobieństwo",
          "niemożność komunikacji",
          "szczęśliwe zakończenie",
          "świat pozbawiony sensu",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są w liczbie mnogiej?",
      content: {
        options: ["kot", "koty", "pies", "dzieci", "dziecko"],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij zdania odpowiednimi zaimkami.",
      content: {
        textWithGaps:
          "[1] poszedłem do kina. Spotkałem tam [2] przyjaciela. Razem obejrzeliśmy [3] ulubiony film.",
        gaps: [
          {
            id: 1,
            options: ["Ja", "Ty", "On", "My"],
          },
          {
            id: 2,
            options: ["mój", "twój", "jego", "nasz"],
          },
          {
            id: 3,
            options: ["mój", "twój", "jego", "nasz"],
          },
        ],
      },
      correctAnswer: [0, 0, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Które dzieła należą do kanonu lektur szkolnych?",
      content: {
        options: [
          "Pan Tadeusz",
          "Harry Potter",
          "Lalka",
          "Gra o tron",
          "Wesele",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Dopasuj przykład do typu zdania.",
      content: {
        matchingType: "sentence_types",
        leftColumn: [
          { id: "A", text: "Pada deszcz i wieje wiatr." },
          { id: "B", text: "Kiedy pada, zostaję w domu." },
          { id: "C", text: "Czytam książkę." },
        ],
        rightColumn: [
          { id: 1, text: "współrzędnie złożone" },
          { id: 2, text: "podrzędnie złożone" },
          { id: 3, text: "pojedyncze" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są rozkazujące?",
      content: {
        options: [
          "Czy idziesz do sklepu?",
          "Idź do sklepu!",
          "Będę czytać.",
          "Czytaj uważnie!",
          "Pisz ładnie!",
        ],
      },
      correctAnswer: [1, 3, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Którzy autorzy tworzyli w pozytywizmie?",
      content: {
        options: [
          "Bolesław Prus",
          "Adam Mickiewicz",
          "Henryk Sienkiewicz",
          "Jan Kochanowski",
          "Eliza Orzeszkowa",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są synonimami (mają podobne znaczenie)?",
      content: {
        word: "piękny",
        options: ["brzydki", "ładny", "szybki", "wspaniały", "mały"],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "W których zdaniach występuje podmiot ukryty?",
      content: {
        options: [
          "Idę do szkoły.",
          "Pies biega.",
          "Czytamy książki.",
          "Pada śnieg.",
          "Lubię muzykę.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      question: "Dopasuj cechy do epoki literackiej.",
      content: {
        matchingType: "epoch_characteristics",
        leftColumn: [
          { id: "A", text: "Romantyzm" },
          { id: "B", text: "Pozytywizm" },
          { id: "C", text: "Młoda Polska" },
        ],
        rightColumn: [
          { id: 1, text: "uczucia, indywidualizm, bunt" },
          { id: 2, text: "praca, nauka, edukacja" },
          { id: 3, text: "sztuka dla sztuki, symbolizm" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które słowa są napisane poprawnie?",
      content: {
        options: ["rzeka", "żeka", "może", "morze", "mosze"],
      },
      correctAnswer: [0, 2, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które zdania zawierają porównanie?",
      content: {
        options: [
          "Jest biały jak śnieg.",
          "Jego serce jest z kamienia.",
          "Biega szybko jak wiatr.",
          "Czas płynie.",
          "Jest silny jak lew.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      question: "Dopasuj gatunek do rodzaju literackiego.",
      content: {
        matchingType: "genre_type",
        leftColumn: [
          { id: "A", text: "powieść" },
          { id: "B", text: "sonet" },
          { id: "C", text: "komedia" },
        ],
        rightColumn: [
          { id: 1, text: "epika" },
          { id: 2, text: "liryka" },
          { id: 3, text: "dramat" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Uzupełnij analizę składniową.",
      content: {
        textWithGaps:
          "W zdaniu 'Mama kupiła córce nową książkę' słowo 'córce' jest w [1] przypadku i pełni funkcję [2], a 'książkę' jest w [3] przypadku.",
        gaps: [
          {
            id: 1,
            options: ["mianowniku", "dopełniaczu", "celowniku", "bierniku"],
          },
          {
            id: 2,
            options: [
              "podmiotu",
              "dopełnienia dalszego",
              "dopełnienia bliższego",
              "okolicznika",
            ],
          },
          {
            id: 3,
            options: ["mianowniku", "dopełniaczu", "celowniku", "bierniku"],
          },
        ],
      },
      correctAnswer: [2, 1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ROMANTICISM",
      question: "Dopasuj cechy do odpowiednich bohaterów romantycznych.",
      content: {
        matchingType: "character_traits",
        leftColumn: [
          { id: "A", text: "Konrad z 'Dziadów' cz. III" },
          { id: "B", text: "Kordian z dramatu Słowackiego" },
          { id: "C", text: "Anhelli z poematu Słowackiego" },
        ],
        rightColumn: [
          { id: 1, text: "bunt prometejski przeciw Bogu" },
          { id: 2, text: "wahanie i niezdecydowanie" },
          { id: 3, text: "cierpienie i ofiara za naród" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question: "Uzupełnij lukę odpowiednią formą - zaawansowana składnia.",
      content: {
        textWithGaps:
          "Gdyby nie [1] pewnych okoliczności, które [2] w nieoczekiwanym momencie, nigdy nie [3] poznać prawdy o wydarzeniach sprzed lat.",
        gaps: [
          {
            id: 1,
            options: ["zbieg", "zbiegu", "zbiegiem", "zbiegowi"],
          },
          {
            id: 2,
            options: [
              "zaistniały",
              "zaistniałyby",
              "zaistnieją",
              "zaistniałaby",
            ],
          },
          {
            id: 3,
            options: ["zdołałbym", "zdołam", "zdołałem", "zdołać"],
          },
        ],
      },
      correctAnswer: [1, 0, 0],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      question: "Które fragmenty zawierają motywy vanitas (przemijania)?",
      content: {
        options: [
          "Człowiek - jako kwiat na polu - ścięty bywa",
          "Raduj się młodzieńcze, póki czas",
          "Słońce wschodzi i zachodzi",
          "Wesele taniec, śpiew - a potem cmentarz, grób",
          "Wiosna budzi przyrodę do życia",
        ],
      },
      correctAnswer: [0, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question:
        "Dopasuj cytaty filozoficzne do ich interpretacji językoznawczych.",
      content: {
        matchingType: "quotes_to_interpretations",
        leftColumn: [
          { id: "A", text: "Granice mego języka są granicami mego świata" },
          { id: "B", text: "Świat jest wszystkim, co ma miejsce" },
          { id: "C", text: "O czym nie można mówić, o tym trzeba milczeć" },
        ],
        rightColumn: [
          { id: 1, text: "relatywizm językowy - język kształtuje poznanie" },
          { id: 2, text: "realizm językowy - fakty niezależne od języka" },
          { id: 3, text: "granice ekspresji językowej" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "YOUNG_POLAND",
      question: "Dopasuj symbole młodopolskie do ich znaczeń.",
      content: {
        matchingType: "symbols_meanings",
        leftColumn: [
          { id: "A", text: "złoty róg (Staff)" },
          { id: "B", text: "Chochoł (Wyspiański)" },
          { id: "C", text: "harfa (Tetmajer)" },
        ],
        rightColumn: [
          { id: 1, text: "afirmacja życia mimo cierpienia" },
          { id: 2, text: "paraliż narodowy i niemoc" },
          { id: 3, text: "poezja jako wyraz bólu duszy" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 3,
      question:
        "Które zdania zawierają błędy składniowe typowe dla polszczyzny potocznej?",
      content: {
        options: [
          "Czekam na ciebie od godziny",
          "Idę do fryzjera na obcięcie włosów",
          "Spotkałem się z tym problemem",
          "Książka, którą czytałem była ciekawa",
          "Poszedłem do lekarza po receptę",
        ],
      },
      correctAnswer: [1, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      question: "Uzupełnij analizę literacką odpowiednimi terminami.",
      content: {
        textWithGaps:
          "W 'Weselu' Wyspiańskiego dominuje [1] konstrukcja dramatyczna, gdzie akcja rozwija się poprzez [2] sceny, a kluczową rolę pełni [3] symbolika postaci.",
        gaps: [
          {
            id: 1,
            options: [
              "symultaniczna",
              "retrospektywna",
              "liniowa",
              "cykliczna",
            ],
          },
          {
            id: 2,
            options: ["równoległe", "następujące", "kontrastowe", "paralelne"],
          },
          {
            id: 3,
            options: [
              "realistyczna",
              "alegoryczna",
              "dokumentalna",
              "biograficzna",
            ],
          },
        ],
      },
      correctAnswer: [0, 3, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question:
        "Które konstrukcje są przykładami hipotaksy (zdań podrzędnych)?",
      content: {
        options: [
          "Kiedy pada deszcz, zostaję w domu i czytam książki.",
          "Pada deszcz, więc zostałem w domu.",
          "Ponieważ pada, choć słońce świeci, wziąłem parasol.",
          "Pada i wieje.",
          "Chociaż pada, poszedłem na spacer, który był bardzo przyjemny.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "POSITIVISM",
      question:
        "Dopasuj postacie z 'Lalki' do reprezentowanych przez nie postaw.",
      content: {
        matchingType: "characters_attitudes",
        leftColumn: [
          { id: "A", text: "Stanisław Wokulski" },
          { id: "B", text: "Ignacy Rzecki" },
          { id: "C", text: "Julian Ochocki" },
        ],
        rightColumn: [
          { id: 1, text: "romantic idealizm vs pozytywistyczna praca" },
          { id: 2, text: "wierność tradycji i honor kupiecka" },
          { id: 3, text: "nauka i wynalazczość" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question:
        "Uzupełnij tekst naukowy odpowiednimi terminami lingwistycznymi.",
      content: {
        textWithGaps:
          "Według teorii Chomsky'ego, [1] kompetencja językowa to wiedza, którą posiadamy, podczas gdy [2] to rzeczywiste użycie języka. [3] głęboka reprezentuje znaczenie, a powierzchniowa - formę.",
        gaps: [
          {
            id: 1,
            options: ["wrodzona", "nabyta", "społeczna", "kulturowa"],
          },
          {
            id: 2,
            options: ["performancja", "gramatyka", "składnia", "semantyka"],
          },
          {
            id: 3,
            options: ["Fonologia", "Morfologia", "Struktura", "Pragmatyka"],
          },
        ],
      },
      correctAnswer: [0, 0, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      question: "Które fragmenty zawierają ironię romantyczną?",
      content: {
        options: [
          "Sam sobie przyglądał się z boku, jakby był kimś innym",
          "Śmiech przez łzy - to paradoks ludzkiego losu",
          "Autor wkracza w tekst: 'Nie wiem, co dalej z nim będzie...'",
          "Życie jest piękne i straszne zarazem",
          "Bohater umiera, ale narrator żyje dalej",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 3,
      question: "Które wyrażenia są przykładami eufemizmów (łagodzenia)?",
      content: {
        options: [
          "odejść na wieczny spoczynek (umrzeć)",
          "osoba w podeszłym wieku (starzec)",
          "dać w twarz (uderzyć)",
          "być w ciąży (być brzuchatą)",
          "wyzionąć ducha (umrzeć)",
        ],
      },
      correctAnswer: [0, 1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "CONTEMPORARY",
      question: "Dopasuj techniki narracyjne postmodernistyczne do przykładów.",
      content: {
        matchingType: "techniques_examples",
        leftColumn: [
          { id: "A", text: "metafikcja" },
          { id: "B", text: "intertekstualność" },
          { id: "C", text: "pastisz" },
        ],
        rightColumn: [
          { id: 1, text: "narrator komentuje proces pisania książki" },
          { id: 2, text: "cytaty i aluzje do innych dzieł" },
          { id: 3, text: "naśladowanie stylu różnych epok" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question: "Uzupełnij analizę składniową złożonego zdania.",
      content: {
        textWithGaps:
          "W zdaniu 'To, co powiedział, było tym, czego się obawiałem' występują [1] zdania podrzędne, gdzie pierwsze pełni funkcję [2], a drugie [3].",
        gaps: [
          {
            id: 1,
            options: ["dwa", "trzy", "cztery", "pięć"],
          },
          {
            id: 2,
            options: ["dopełnienia", "podmiotu", "orzecznika", "przydawki"],
          },
          {
            id: 3,
            options: ["dopełnienia", "orzecznika", "podmiotu", "okolicznika"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      question:
        "Które motywy są wspólne dla egzystencjalizmu i literatury absurdu?",
      content: {
        options: [
          "bezsens istnienia i absurdalność świata",
          "samotność jednostki wobec wszechświata",
          "wiara w postęp i rozum",
          "niemożność komunikacji międzyludzkiej",
          "optymizm i nadzieja na lepsze jutro",
        ],
      },
      correctAnswer: [0, 1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question:
        "Które zdania zawierają hiperbaton (przestawienie naturalnego szyku)?",
      content: {
        options: [
          "Ciemne są lasy - nikt w nich nie zamieszka",
          "Lasy są ciemne i puste",
          "Tam sięgnąć, gdzie wzrok nie sięga",
          "Wzrok nie sięga tam",
          "Miłości! Ty jesteś potęga",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "INTERWAR",
      question: "Dopasuj poetów do nurtów dwudziestolecia międzywojennego.",
      content: {
        matchingType: "poets_movements",
        leftColumn: [
          { id: "A", text: "Julian Tuwim" },
          { id: "B", text: "Julian Przyboś" },
          { id: "C", text: "Józef Czechowicz" },
        ],
        rightColumn: [
          { id: 1, text: "Skamander - liryka tradycyjna" },
          { id: 2, text: "Awangarda Krakowska - metafora" },
          { id: 3, text: "katastrofizm - wizje zagłady" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question: "Uzupełnij analizę aktu mowy według teorii Searle'a.",
      content: {
        textWithGaps:
          "Wypowiedź 'Otwieram obrady' jest przykładem [1] aktu mowy, ponieważ [2] stan rzeczy poprzez samo wypowiedzenie, pod warunkiem że mówiący posiada odpowiednie [3].",
        gaps: [
          {
            id: 1,
            options: [
              "deklaratywnego",
              "komisywnego",
              "asertywnego",
              "ekspresywnego",
            ],
          },
          {
            id: 2,
            options: ["opisuje", "zmienia", "obiecuje", "wyraża"],
          },
          {
            id: 3,
            options: ["emocje", "uprawnienia", "intencje", "kompetencje"],
          },
        ],
      },
      correctAnswer: [0, 1, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      question: "Które fragmenty zawierają paradoks (pozorną sprzeczność)?",
      content: {
        options: [
          "Im więcej wiem, tym więcej wiem, że nic nie wiem",
          "Milczenie mówi więcej niż słowa",
          "Życie jest krótkie",
          "Najmądrzejszy jest ten, kto wie, że jest głupi",
          "Deszcz pada",
        ],
      },
      correctAnswer: [0, 1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 3,
      question: "Które konstrukcje są przykładami metonimii?",
      content: {
        options: [
          "czytać Mickiewicza (czytać dzieła Mickiewicza)",
          "biały jak śnieg (porównanie)",
          "korona (władza królewska)",
          "słońce zachodzi (personifikacja)",
          "wypić kieliszek (wypić zawartość kieliszka)",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "BAROQUE",
      question: "Dopasuj motywy barokowe do ich funkcji w utworach.",
      content: {
        matchingType: "motifs_functions",
        leftColumn: [
          { id: "A", text: "vanitas (marność)" },
          { id: "B", text: "theatrum mundi (świat-teatr)" },
          { id: "C", text: "carpe diem (chwytaj dzień)" },
        ],
        rightColumn: [
          { id: 1, text: "uświadomienie przemijania życia" },
          { id: 2, text: "życie jako iluzja i gra pozorów" },
          { id: 3, text: "wezwanie do korzystania z chwili" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question: "Uzupełnij analizę semantyczną wieloznaczności.",
      content: {
        textWithGaps:
          "W zdaniu 'Widziałem go z lornetką' występuje [1] strukturalna, którą można rozwiązać poprzez [2] lub zmianę [3].",
        gaps: [
          {
            id: 1,
            options: [
              "synonimia",
              "antonimia",
              "ambiwalencja",
              "wieloznaczność",
            ],
          },
          {
            id: 2,
            options: ["parafrazę", "tłumaczenie", "skrócenie", "wzmocnienie"],
          },
          {
            id: 3,
            options: ["znaczenia", "szyk", "liczby", "czasu"],
          },
        ],
      },
      correctAnswer: [3, 0, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      question: "Które cechy charakteryzują dramat absurdu?",
      content: {
        options: [
          "brak logicznej fabuły i przyczynowości",
          "postacie bez psychologii i rozwoju",
          "realizm i wierność rzeczywistości",
          "dialogi bez sensu i komunikacji",
          "optymistyczne zakończenie",
        ],
      },
      correctAnswer: [0, 1, 3],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są rzeczownikami?",
      content: {
        options: ["kot", "biegać", "dom", "szybko", "stół"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które litery są samogłoskami?",
      content: {
        options: ["a", "b", "e", "k", "i"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Wybierz wyrazy oznaczające kolory.",
      content: {
        options: ["czerwony", "szybki", "zielony", "głośny", "niebieski"],
      },
      correctAnswer: [0, 2, 4],
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są pytaniami?",
      content: {
        options: [
          "Jak masz na imię?",
          "Idę do szkoły.",
          "Gdzie mieszkasz?",
          "To jest dom.",
          "Czy lubisz lody?",
        ],
      },
      correctAnswer: [0, 2, 4],
    },

    // POZIOM 2 - z uzupełnianiem luk
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij luki w zdaniach.",
      content: {
        textWithGaps: "Jan [1] do szkoły. Tam [2] się z kolegami i [3] lekcje.",
        gaps: [
          {
            id: 1,
            options: ["chodzi", "chodzą", "chodzić", "chodził"],
          },
          {
            id: 2,
            options: ["spotyka", "spotkają", "spotkać", "spotkali"],
          },
          {
            id: 3,
            options: ["odrabiać", "odrabia", "odrabiają", "odrobił"],
          },
        ],
      },
      correctAnswer: [0, 0, 1],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są przysłówkami?",
      content: {
        options: ["szybko", "szybki", "wczoraj", "dom", "głośno"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Które utwory napisał Adam Mickiewicz?",
      content: {
        options: [
          "Pan Tadeusz",
          "Lalka",
          "Dziady",
          "Quo Vadis",
          "Ballady i romanse",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Dopasuj rodzaj do rzeczownika.",
      content: {
        matchingType: "gender_matching",
        leftColumn: [
          { id: "A", text: "stół" },
          { id: "B", text: "książka" },
          { id: "C", text: "okno" },
        ],
        rightColumn: [
          { id: 1, text: "rodzaj męski" },
          { id: 2, text: "rodzaj żeński" },
          { id: 3, text: "rodzaj nijaki" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "W których wyrazach występuje 'ó'?",
      content: {
        options: ["król", "suma", "góra", "kura", "róża"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij tekst odpowiednimi formami.",
      content: {
        textWithGaps: "Wczoraj [1] do kina z [2]. Film był [3].",
        gaps: [
          {
            id: 1,
            options: ["poszedłem", "pójdę", "idę", "szedłem"],
          },
          {
            id: 2,
            options: [
              "przyjaciele",
              "przyjaciółmi",
              "przyjaciel",
              "przyjaciół",
            ],
          },
          {
            id: 3,
            options: ["ciekawy", "ciekawa", "ciekawe", "ciekawi"],
          },
        ],
      },
      correctAnswer: [0, 1, 0],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które zdania są złożone?",
      content: {
        options: [
          "Pada deszcz i wieje wiatr.",
          "Mama gotuje.",
          "Kiedy świeci słońce, jest ciepło.",
          "Dzieci się bawią.",
          "Czytam książkę, która jest ciekawa.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy zawierają przedrostek?",
      content: {
        options: ["napisać", "pisać", "przepisać", "pisarz", "dopisać"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      question: "Dopasuj autora do utworu.",
      content: {
        matchingType: "author_to_work",
        leftColumn: [
          { id: "A", text: "Henryk Sienkiewicz" },
          { id: "B", text: "Bolesław Prus" },
          { id: "C", text: "Władysław Reymont" },
        ],
        rightColumn: [
          { id: 1, text: "Quo Vadis" },
          { id: 2, text: "Lalka" },
          { id: 3, text: "Chłopi" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są czasownikami?",
      content: {
        options: ["czytać", "książka", "biegać", "szybki", "pisać"],
      },
      correctAnswer: [0, 2, 4],
    },

    // POZIOM 3 - bardziej złożone
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Uzupełnij luki w tekście literackim.",
      content: {
        textWithGaps:
          "Romantyzm był epoką, która [1] rozum, a wywyższała [2]. Poeci romantyczni wierzyli w [3] narodu.",
        gaps: [
          {
            id: 1,
            options: ["gloryfikowała", "odrzucała", "analizowała", "badała"],
          },
          {
            id: 2,
            options: ["naukę", "uczucia", "pieniądze", "władzę"],
          },
          {
            id: 3,
            options: ["bogactwo", "siłę", "mesjanizm", "racjonalizm"],
          },
        ],
      },
      correctAnswer: [1, 1, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Które środki stylistyczne są tropami?",
      content: {
        options: ["metafora", "anafora", "metonimia", "epifora", "synekdocha"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      question: "Dopasuj epokę do jej cech charakterystycznych.",
      content: {
        matchingType: "epoch_features",
        leftColumn: [
          { id: "A", text: "Romantyzm" },
          { id: "B", text: "Pozytywizm" },
          { id: "C", text: "Młoda Polska" },
        ],
        rightColumn: [
          { id: 1, text: "uczucia, indywidualizm" },
          { id: 2, text: "praca organiczna" },
          { id: 3, text: "sztuka dla sztuki" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
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
          "On jest wysoki.",
        ],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Przyporządkuj funkcje języka do przykładów.",
      content: {
        matchingType: "language_functions",
        leftColumn: [
          { id: "A", text: "Halo? Słyszysz mnie?" },
          { id: "B", text: "Jestem bardzo szczęśliwy!" },
          { id: "C", text: "Woda wrze w 100°C" },
        ],
        rightColumn: [
          { id: 1, text: "funkcja fatyczna" },
          { id: 2, text: "funkcja emotywna" },
          { id: 3, text: "funkcja poznawcza" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Które zdania zawierają podmiot domyślny?",
      content: {
        options: [
          "Czytam książkę.",
          "Pada deszcz.",
          "Idziemy do kina.",
          "Jest zimno.",
          "Lubię czekoladę.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question: "Które motywy są wspólne dla romantyzmu i Młodej Polski?",
      content: {
        options: [
          "indywidualizm",
          "praca organiczna",
          "mistycyzm",
          "realizm",
          "pesymizm",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Uzupełnij analizę stylistyczną.",
      content: {
        textWithGaps:
          "W zdaniu 'Złote liście spadały z drzew' epitet [1] określa rzeczownik [2] i pełni funkcję [3].",
        gaps: [
          {
            id: 1,
            options: ["'spadały'", "'złote'", "'drzew'", "'z'"],
          },
          {
            id: 2,
            options: ["'złote'", "'spadały'", "'liście'", "'drzew'"],
          },
          {
            id: 3,
            options: ["podmiotu", "orzeczenia", "przydawki", "dopełnienia"],
          },
        ],
      },
      correctAnswer: [1, 2, 2],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "W których zdaniach występuje apostrofa?",
      content: {
        options: [
          "O Muzo! Wspomóż mnie!",
          "Pada deszcz.",
          "Litwo! Ojczyzno moja!",
          "Czytam książkę.",
          "Boże, pomóż nam!",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Które wyrażenia są frazeologizmami?",
      content: {
        options: [
          "rzucać słowa na wiatr",
          "iść do domu",
          "mieć muchy w nosie",
          "czytać książkę",
          "robić z igły widły",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Przeczytaj fragment i odpowiedz na pytanie.",
      content: {
        sourceText: {
          author: "Czesław Miłosz",
          title: "Który skrzywdziłeś",
          text: `Który skrzywdziłeś człowieka prostego
Śmiechem nad krzywdą jego wybuchając,
Gromadę błaznów koło siebie mając
Na pomieszanie dobrego i złego...`,
        },
        question: "Jaki środek stylistyczny dominuje w tym fragmencie?",
        options: ["apostrofa", "metafora", "porównanie", "symbol"],
      },
      correctAnswer: 0,
      metadata: {
        explanation: "Apostrofa - zwrot do osoby 'który skrzywdziłeś'",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Przeczytaj fragment i określ dominujący środek stylistyczny.",
      content: {
        sourceText: {
          author: "Wisława Szymborska",
          title: "Nic dwa razy",
          text: `Nic dwa razy się nie zdarza
i nie zdarzy. Z tej przyczyny
zrodziliśmy się bez wprawy
i pomrzemy bez rutyny.`,
        },
        question: "Jaki środek stylistyczny dominuje w tym fragmencie?",
        options: ["paradoks", "metafora", "porównanie", "hiperbola"],
      },
      correctAnswer: 0,
      metadata: {
        explanation: "Paradoks - sprzeczność pozorna: 'bez wprawy/bez rutyny'",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      question: "Przeczytaj fragment i określ epokę literacką.",
      content: {
        sourceText: {
          author: "nieznany",
          text: `Biada temu, kto żyw będąc, śmierci wzywa,
Bo tego śmierć nie słucha, kto jej wzywać śmie.`,
        },
        question: "Z której epoki pochodzi ten fragment?",
        options: ["renesans", "barok", "oświecenie", "romantyzm"],
      },
      correctAnswer: 1,
      metadata: { explanation: "Barok - motyw vanitas, śmierci" },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Określ typ zdania.",
      content: {
        sentence: "Gdyby nie padało, poszlibyśmy na spacer.",
        question: "Jakie to zdanie?",
        options: [
          "pojedyncze rozwinięte",
          "złożone współrzędnie",
          "złożone podrzędnie",
          "wielokrotnie złożone",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Zdanie złożone podrzędnie okolicznikowe warunku",
      },
    },

    // INTERPRETACJA SYMBOLI (50 pytań)
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 1,
      question: "Zinterpretuj symbol w kontekście.",
      content: {
        context: "W 'Lalce' Prusa motyw lalki pojawia się wielokrotnie.",
        question: "Co symbolizuje lalka w powieści?",
        options: [
          "dzieciństwo bohatera",
          "sztuczność relacji społecznych",
          "zabawkę",
          "przemysł",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Lalka symbolizuje sztuczność i pustkę relacji społecznych",
      },
    },
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

    // ========== MEGA PACK: HISTORICAL_LITERARY - CLOSED_SINGLE (50 pytań) ==========

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
      work: "Faraon",
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
      work: "Odprawa posłów greckich",
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
      work: "Myszeidos",
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
      work: "Nie-Boska komedia",
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
      work: "Ferdydurke",
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
      work: "Tango",
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
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      question:
        "Przeczytaj fragment i określ jego funkcję w strukturze utworu.",
      content: {
        sourceText: {
          author: "Adam Mickiewicz",
          title: "Dziady cz. III",
          text: "Ty mi dajesz odwagę, siłę, zapał do boju,\nTy mi każesz wytrwać na posterunku,\nBo wiem: dla mojej ziemi, dla mego narodu\nŻyję, walczę i cierpię.",
        },
        question: "Jaka jest funkcja tego monologu w strukturze dramatu?",
        options: [
          "eksponuje konflikt wewnętrzny bohatera",
          "ukazuje dojrzewanie do misji mesjańskiej",
          "przedstawia zwątpienie w sens walki",
          "zapowiada klęskę powstania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fragment pokazuje proces duchowego dojrzewania Konrada do przyjęcia misji narodowej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Przeanalizuj środki stylistyczne w kontekście znaczeniowym.",
      content: {
        text: "Ciemność widzę, ciemność nieprzebytą,\nJako gęsty, jaki straszny las.",
        question: "Który środek stylistyczny dominuje i jaką pełni funkcję?",
        options: [
          "metafora - wizualizacja lęku egzystencjalnego",
          "porównanie - intensyfikacja uczucia zagubienia",
          "symbol - reprezentacja niewiedzy",
          "personifikacja - ożywienie abstrakcji",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Porównanie 'jako... las' służy wzmocnieniu wrażenia bezradności wobec nieznanego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "POSITIVISM",
      question: "Interpretacja symboliczna w kontekście ideologii epoki.",
      content: {
        context:
          "W 'Lalce' Wokulski chce wznieść się balonem i obserwować Warszawę z góry.",
        question:
          "Co symbolizuje ta scena w kontekście pozytywistycznego programu?",
        options: [
          "ucieczkę od rzeczywistości społecznej",
          "próbę obiektywnego spojrzenia na mechanizmy społeczne",
          "romantyczny idealizm i oderwanie od realności",
          "triumf nauki nad przesądami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Balon symbolizuje pozytywistyczną potrzebę dystansu i naukowej obserwacji społeczeństwa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Określ funkcję interpunkcji w kontekście semantycznym.",
      content: {
        sentence:
          "Milczenie - to kamień węgielny mądrości; słowo - to jej ruina.",
        question: "Jaka jest funkcja myślnika w tym zdaniu?",
        options: [
          "wprowadza wyjaśnienie i podkreśla kontrast",
          "sygnalizuje przerwę w mówieniu",
          "zastępuje opuszczone słowa",
          "oddziela człony wyliczenia",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Myślnik wprowadza definicję i wzmacnia antytezę milczenie-słowo.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      question: "Analiza intertekstualna - rozpoznaj nawiązanie.",
      content: {
        text: "Postać Chochoła w 'Weselu' wypowiada kwestie nawiązujące do wcześniejszych dzieł.",
        question: "Do jakiej tradycji literackiej nawiązuje figura Chochoła?",
        options: [
          "romantyczny demonizm i 'Dziadów' Mickiewicza",
          "ludowa bajka o strachu na wróble",
          "realistyczna obserwacja wsi polskiej",
          "symbolika chrześcijańska",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Chochoł jest alegoriąparaliżu narodowego, nawiązuje do 'Dziadów' i romantycznego mesjanizmu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Rozpoznaj figurę retoryczną i jej pragmatyczną funkcję.",
      content: {
        text: "Czyż nie widzisz, że milczy? Czyż nie słyszysz tej ciszy? Czyż nie czujesz tego braku?",
        question: "Jaka figura retoryczna dominuje i co wyraża?",
        options: [
          "pytanie retoryczne - wzbudzanie emocji odbiorcy",
          "anafora - rytmizacja wypowiedzi",
          "gradacja pytań retorycznych - nasilanie dramatyzmu",
          "polipton - gra słowna",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Połączenie anafory ('Czyż') z gradacją tworzy nasilający się dramatyzm.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Interpretacja motywu w kontekście filozofii absurdu.",
      content: {
        motif: "Powtarzające się pytanie Artura: 'Gdzie są formy?'",
        question: "Co symbolizuje obsesja Artura na punkcie 'form'?",
        options: [
          "nostalgię za Belle Époque",
          "próbę nadania sensu chaotycznej rzeczywistości",
          "krytykę mieszczańskich konwenansów",
          "tęsknotę za autorytetem ojca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Formy reprezentują porządek i sens, których Artur desperacko szuka w absurdalnym świecie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Określ typ i funkcję zdania złożonego.",
      content: {
        sentence:
          "Ponieważ deszcz padał bez przerwy, a wiatr łamał gałęzie, postanowiliśmy zostać w domu, choć wcześniej planowaliśmy wycieczkę.",
        question: "Jaki typ zdania i jakie relacje logiczne łączą człony?",
        options: [
          "wielokrotnie złożone: przyczyna → skutek → przeciwstawienie",
          "współrzędnie złożone z łącznikiem 'a'",
          "podrzędnie złożone okolicznikowe",
          "równoważniki zdań",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Zdanie zawiera przyczynę (ponieważ), łącznik (a) i przeciwstawienie (choć).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "INTERWAR",
      question: "Rozpoznaj poetykę i jej filozoficzne podstawy.",
      content: {
        text: "Nic w przyrodzie nie ginie,\nPył się z pyłem zrównuje -\nJeno cienka struna\nW ludzkim sercu tli.",
        author: "Leopold Staff",
        question: "Jaka idea filozoficzna dominuje w tym fragmencie?",
        options: [
          "nihilizm - brak trwałych wartości",
          "witalizm - afirmacja życia mimo przemijania",
          "pesymizm - świadomość nieuchronności śmierci",
          "panteizm - jedność z naturą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Staff podkreśla 'cienką strunę' w sercu - symbol niezniszczalnego ludzkiego ducha.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Analiza semantyczna neologizmu w kontekście.",
      content: {
        text: "Witkacy pisał o 'niezaspokojeniu metafizycznym' jako źródle sztuki.",
        question: "Co oznacza neologizm 'niezaspokojenie metafizyczne'?",
        options: [
          "frustrację materialistyczną",
          "egzystencjalną pustę i pytanie o sens bytu",
          "konflikt między ciałem a duchem",
          "krytykę religii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Termin Witkacego opisuje fundamentalny niepokój egzystencjalny człowieka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      question: "Interpretacja motywu vanitas w kontekście barokowej estetyki.",
      content: {
        text: "Czego chcesz od nas, Panie, za Twe hojne dary?\nCzegóż - jeno abyśmy żyli nie marnie.",
        question: "Jaka idea barokowa dominuje w tym fragmencie?",
        options: [
          "carpe diem - chwytaj dzień",
          "vanitas - marność życia",
          "memento mori - pamiętaj o śmierci",
          "ubi sunt - gdzie są dawni?",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fragment wyraża świadomość przemijania i marności doczesności.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Określ funkcję enjambement w kontekście znaczeniowym.",
      content: {
        text: "Wiatr od strony morza\nwieje, a w nim zapach\nsoli i wodorostów.",
        question: "Jaka jest funkcja przerzutni w tym fragmencie?",
        options: [
          "imitacja naturalnego rytmu oddechu",
          "podkreślenie napięcia semantycznego",
          "wizualizacja ruchu wiatru i fal",
          "zakłócenie regularności wersyfikacyjnej",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Przerzutnia naśladuje falowy ruch wiatru morskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Odprawa posłów greckich",
      question: "Rozpoznaj koncepcję filozoficzną w utworze renesansowym.",
      content: {
        context: "Ksantypa wygłasza mowę o godności człowieka.",
        question: "Jaka idea filozoficzna leży u podstaw tej mowy?",
        options: [
          "antropocentryzm i humanizm renesansowy",
          "teocentryzm średniowieczny",
          "determinizm barokowy",
          "racjonalizm oświeceniowy",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation: "Renesans stawiał człowieka w centrum - homo mensura.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question:
        "Analiza składniowa - rozpoznaj funkcję konstrukcji bezokolicznikowej.",
      content: {
        sentence: "Milczeć znaczy godzić się na zło.",
        question: "Jaka jest funkcja składniowa bezokoliczników w tym zdaniu?",
        options: [
          "oba są podmiotami",
          "'milczeć' - podmiot, 'godzić się' - orzecznik",
          "oba są orzeczeniami",
          "'milczeć' - dopełnienie, 'godzić się' - okolicznik",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Bezokolicznik podmiotowy + orzeczenie 'znaczy' + bezokolicznik w funkcji orzecznika.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Monachomachia",
      question: "Interpretacja satyry w kontekście programu oświecenia.",
      content: {
        question:
          "Jaki aspekt rzeczywistości krytykuje Krasicki w 'Mona chomachia'?",
        options: [
          "wszelką religijność jako przesąd",
          "hipokryzję i wyzyskiwanie ludzi przez zepsuty kler",
          "instytucję monastycyzmu jako taką",
          "niewykształcenie duchowieństwa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Krasicki krytykuje nadużycia, nie samą wiarę - typowo oświeceniowo.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Rozróżnienie między homonimami a polisemią.",
      content: {
        examples: [
          "zamek (budowla) / zamek (w drzwiach)",
          "góra (wzniesienie) / góra (kierunek)",
        ],
        question: "Które przykłady reprezentują homonimię, a które polisemię?",
        options: [
          "oba to homonimia",
          "pierwszy - homonimia, drugi - polisemia",
          "pierwszy - polisemia, drugi - homonimia",
          "oba to polisemia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zamki to różne słowa (homonimia), góra to jedno słowo z różnymi znaczeniami (polisemia).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      question: "Interpretacja strategii narracyjnej postmodernistycznej.",
      content: {
        author: "Olga Tokarczuk",
        technique:
          "Narrator w 'Biegunach' łamie konwencje narracyjne, miesza gatunki, prezentuje fragmentaryczność.",
        question: "Jaka filozofia stoi za tą strategią narracyjną?",
        options: [
          "strukturalizm - szukanie głębokich struktur",
          "postmodernizm - krytyka wielkich narracji",
          "realizm - wierność rzeczywistości",
          "symbolizm - ukryte znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fragmentaryczność i mieszanie gatunków to typowe strategie postmodernistyczne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Analiza pragmatyczna wypowiedzi - rozpoznaj akt mowy.",
      content: {
        sentence: "Obiecuję, że przyjdę jutro o dziesiątej.",
        question:
          "Jaki typ aktu mowy reprezentuje ta wypowiedź według teorii Austina?",
        options: [
          "asertyw - stwierdzenie faktu",
          "komisyw - zobowiązanie do działania",
          "ekspresyw - wyrażenie emocji",
          "deklaratyw - zmiana stanu rzeczy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Obietnica to komisyw - mówiący zobowiązuje się do przyszłego działania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      question: "Interpretacja symbolu narodowego w kontekście mesjanizmu.",
      content: {
        text: "Polska jest Chrystusem narodów - cierpi za grzechy innych.",
        question: "Jaka idea romantyczna jest wyrażona w tym stwierdzeniu?",
        options: [
          "mesjanizm polski - misja zbawcza narodu",
          "patriotyzm - miłość do ojczyzny",
          "nacjonalizm - wyższość własnego narodu",
          "internacjonalizm - solidarność narodów",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Mesjanizm - wiara w zbawczą misję Polski wobec innych narodów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Rozpoznaj typ błędu językowego i jego przyczynę.",
      content: {
        sentence: "Spotkałem się z kolegą do kina.",
        question: "Jaki błąd występuje w tym zdaniu?",
        options: [
          "kontaminacja - 'spotkać się z kimś' + 'pójść do kina'",
          "pleonazm - nadmiarowość",
          "tautologia - powtórzenie",
          "paralelizm składniowy - błędna analogia",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Kontaminacja dwóch konstrukcji: 'spotkałem się z kolegą' i 'poszedłem z kolegą do kina'.",
      },
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
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 6,
      epoch: "ROMANTICISM",
      question: "Napisz notatkę porównawczą o bohaterach romantycznych.",
      content: {
        topic:
          "Porównaj postawę Konrada z 'Dziadów' i Kordiana z dramatu Słowackiego",
        requirements: [
          "cechy Konrada (3 punkty)",
          "cechy Kordiana (3 punkty)",
          "główna różnica między nimi",
          "150-200 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 5,
      question: "Wyjaśnij zasady ortograficzne.",
      content: {
        topic: "Kiedy piszemy „rz” a kiedy „ż”?",
        requirements: [
          "zasada podstawowa",
          "5 przykładów z „rz”",
          "5 przykładów z „ż”",
          "wyjątki od reguły",
          "100-150 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 6,
      epoch: "POSITIVISM",
      question: "Opisz program pozytywizmu.",
      content: {
        topic: "Jakie były główne założenia pozytywizmu polskiego?",
        requirements: [
          "praca organiczna - wyjaśnienie",
          "praca u podstaw - przykłady",
          "rola nauki i edukacji",
          "odrzucenie romantyzmu",
          "200-250 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 5,
      question: "Wyjaśnij różnice między rodzajami zdań.",
      content: {
        topic: "Czym różni się zdanie pojedyncze od złożonego?",
        requirements: [
          "definicja zdania pojedynczego + przykład",
          "definicja zdania współrzędnie złożonego + przykład",
          "definicja zdania podrzędnie złożonego + przykład",
          "120-150 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 6,
      epoch: "RENAISSANCE",
      question: "Scharakteryzuj epokę renesansu.",
      content: {
        topic: "Jakie były główne cechy renesansu w Polsce?",
        requirements: [
          "humanizm - co to znaczy",
          "zainteresowanie antykiem",
          "najważniejsi twórcy (3 osoby)",
          "przykładowe dzieła",
          "180-220 słów",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 8,
      question: "Napisz notatkę syntetyzującą - porównanie koncepcji.",
      content: {
        topic:
          "Porównaj koncepcje bohatera literackiego w romantyzmie i pozytywizmie",
        requirements: [
          "cechy bohatera romantycznego (3 punkty)",
          "cechy bohatera pozytywistycznego (3 punkty)",
          "kluczowe różnice (kontekst ideowy epok)",
          "przykłady: Konrad vs Wokulski",
          "250-300 słów",
          "struktura: wprowadzenie, porównanie, wnioski",
        ],
      },
      metadata: {
        expectedConcepts: [
          "romantyzm: indywidualizm, bunt, wyjątkowość",
          "pozytywizm: praca organiczna, realizm, użyteczność",
          "różnice ideologiczne",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 8,
      question: "Analiza i synteza - ewolucja pojęcia w historii języka.",
      content: {
        topic:
          "Opisz ewolucję funkcji metafory w literaturze polskiej od baroku do współczesności",
        requirements: [
          "funkcja metafory w baroku (vanitas, emblematyka)",
          "metafora romantyczna (symbol, wieloznaczność)",
          "metafora awangardowa (innowacja, zaskoczenie)",
          "metafora postmodernistyczna (gra znaczeń)",
          "300-350 słów",
          "przykłady dla każdej epoki",
        ],
      },
      metadata: {
        expectedConcepts: [
          "metafora barokowa - dydaktyka",
          "metafora romantyczna - emocja",
          "metafora awangardowa - eksperyment",
          "metafora postmodernistyczna - dekonstrukcja",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question: "Porównaj dwa fragmenty pod względem stylu i przesłania.",
      content: {
        text1: {
          author: "Mickiewicz",
          fragment: "Ojczyzno moja! Ty jesteś jak zdrowie...",
        },
        text2: {
          author: "Norwid",
          fragment: "Ojczyzna to wielki zbiorowy obowiązek...",
        },
        requirements: [
          "porównanie stylu",
          "różnice w pojmowaniu ojczyzny",
          "kontekst epok",
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
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      question: "Dopasuj pierwsze wersy do tytułów utworów.",
      content: {
        matchingType: "first_lines_to_titles",
        leftColumn: [
          { id: "A", text: "Litwo! Ojczyzno moja!" },
          { id: "B", text: "Nam strzelać nie kazano" },
          { id: "C", text: "Wlazł kotek na płotek" },
          { id: "D", text: "Bogurodzica dziewica" },
        ],
        rightColumn: [
          { id: 1, text: "Pan Tadeusz" },
          { id: 2, text: "Reduta Ordona" },
          { id: 3, text: "Bajki i przypowieści" },
          { id: 4, text: "Bogurodzica" },
        ],
        instruction: "Wybierz poprawne pary (np. A-1, B-2)",
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
    },

    // UZUPEŁNIANIE LUK GRAMATYCZNYCH (25 pytań)
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij luki poprawnymi formami wyrazów.",
      content: {
        textWithGaps:
          "Mickiewicz [1] największym poetą polskiego [2]. Jego utwory [3] do dziś.",
        gaps: [
          { id: 1, options: ["był", "jest", "będzie", "bywa"] },
          {
            id: 2,
            options: ["romantyzm", "romantyzmu", "romantyzmie", "romantyzmem"],
          },
          { id: 3, options: ["czytane są", "czyta się", "czytają", "czytano"] },
        ],
      },
      correctAnswer: [1, 1, 0],
      metadata: {
        explanation:
          "jest (czas teraźniejszy), romantyzmu (dopełniacz), czytane są (strona bierna)",
      },
    },

    // TABELE DO UZUPEŁNIENIA (25 pytań)
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 5,
      question: "Uzupełnij tabelę - przyporządkuj cechy do epok.",
      content: {
        tableType: "epochs_characteristics",
        headers: ["Epoka", "Hasło", "Gatunek", "Przedstawiciel"],
        rows: [
          { epoch: "Renesans", gaps: [1, 2, 3] },
          { epoch: "Romantyzm", gaps: [4, 5, 6] },
          { epoch: "Pozytywizm", gaps: [7, 8, 9] },
        ],
        options: {
          slogans: ["humanizm", "mesjanizm", "praca organiczna"],
          genres: ["sonet", "ballada", "nowela"],
          authors: ["Kochanowski", "Mickiewicz", "Prus"],
        },
      },
      correctAnswer: [0, 0, 0, 1, 1, 1, 2, 2, 2],
    },

    // PRZYPORZĄDKOWANIE POSTACI DO UTWORÓW (25 pytań)
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 4,
      question: "Dopasuj postacie do utworów, w których występują.",
      content: {
        options: [
          "Wokulski - Lalka",
          "Konrad - Dziady",
          "Judym - Ludzie bezdomni",
          "Kmicic - Potop",
          "Wokulski - Dziady",
          "Konrad - Potop",
          "Judym - Lalka",
          "Kmicic - Ludzie bezdomni",
        ],
      },
      correctAnswer: [0, 1, 2, 3], // Poprawne dopasowania
      metadata: {
        explanation:
          "Wokulski to bohater 'Lalki', Konrad - 'Dziadów', Judym - 'Ludzi bezdomnych', Kmicic - 'Potopu'",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Uzupełnij luki w tekście odpowiednimi formami wyrazów.",
      content: {
        textWithGaps:
          "Jan Kochanowski był [1] poetą polskiego [2]. Jego [3] to arcydzieło literatury.",
        gaps: [
          {
            id: 1,
            options: [
              "najważniejszy",
              "najważniejszym",
              "najważniejszego",
              "najważniejszemu",
            ],
          },
          {
            id: 2,
            options: ["renesansu", "renesansie", "renesansem", "renesansowi"],
          },
          { id: 3, options: ["Trenów", "Trenami", "Treny", "Trenom"] },
        ],
      },
      correctAnswer: [1, 0, 2], // indeksy poprawnych odpowiedzi dla każdej luki
      metadata: {
        explanation:
          "Poprawne formy: najważniejszym (narzędnik), renesansu (dopełniacz), Treny (mianownik)",
      },
    },
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
      difficulty: 1,
      points: 2,
      question: "Wyjaśnij różnicę między dwoma wyrazami.",
      content: {
        words: ["'rz' i 'ż'"],
        instruction:
          "Podaj przykłady wyrazów z „rz” i wyjaśnij, kiedy piszemy „rz” a kiedy 'ż'.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Przepisz zdanie, poprawiając błędy.",
      content: {
        originalSentence:
          "Wczoraj poszłem z mamą do kina i obejżeliśmy ciekawy film o zwieżętach.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Opisz głównego bohatera.",
      content: {
        instruction: "Kim jest Tadeusz Soplica? Opisz go w 2-3 zdaniach.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Przekształć zdanie zachowując sens.",
      content: {
        originalSentence: "Kiedy pada deszcz, zostaję w domu.",
        transformation:
          "Zmień zdanie podrzędne na współrzędne (użyj spójnika 'więc' lub 'dlatego').",
        hints: [
          "zamień 'kiedy' na inny spójnik",
          "zachowaj relację przyczyna-skutek",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Wyjaśnij znaczenie frazeologizmu.",
      content: {
        phrase: "wziąć nogi za pas",
        instruction: "Co oznacza to wyrażenie? Podaj przykład użycia w zdaniu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "POSITIVISM",
      question: "Wyjaśnij hasło epoki.",
      content: {
        slogan: "praca organiczna",
        instruction:
          "Co oznaczało hasło „praca organiczna” w pozytywizmie? Odpowiedz w 3-4 zdaniach.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Podaj przykłady części mowy.",
      content: {
        instruction:
          "Wymień 3 rzeczowniki, 3 czasowniki i 3 przymiotniki związane z tematem 'szkoła'.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Analiza środków stylistycznych.",
      content: {
        text: "Wiatr szeptał tajemnice, drzewa kłaniały się, a niebo płakało deszczem.",
        instruction:
          "Wskaż środki stylistyczne w tym zdaniu i wyjaśnij ich funkcję.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      question: "Porównaj dwa utwory.",
      content: {
        works: ["'Ballady i romanse' Mickiewicza", "'Balladyna' Słowackiego"],
        instruction:
          "Wskaż dwie różnice między tymi utworami (forma, temat, bohaterowie).",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Określ funkcję interpunkcji.",
      content: {
        sentence: "Anna, która jest moją siostrą, studiuje medycynę.",
        instruction: "Wyjaśnij, do czego służą przecinki w tym zdaniu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Ułóż jedno poprawne zdanie, używając wszystkich tych wyrazów.",
      content: {
        words: ["książka", "czytać", "ciekawy"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Bajki",
      question: "Wyjaśnij cel utworu.",
      content: {
        instruction:
          "Jaki cel miały bajki Krasickiego? Co chciał osiągnąć autor?",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Przeprowadź analizę zdania - zadanie wieloetapowe.",
      content: {
        text: "Mała ojczyzna to azyl, to miejsce, z którego patrzy się na świat.",
        steps: [
          {
            id: 1,
            instruction: "Określ typ zdania",
            expectedAnswer: "złożone współrzędnie",
          },
          {
            id: 2,
            instruction: "Wskaż środki stylistyczne",
            expectedAnswer: "metafora, powtórzenie",
          },
          {
            id: 3,
            instruction: "Określ funkcję 'to'",
            expectedAnswer: "orzecznik",
          },
          {
            id: 4,
            instruction: "Wyjaśnij znaczenie metafory",
            expectedAnswer: "bezpieczne miejsce",
          },
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Wyjaśnij różnicę znaczeniową.",
      content: {
        sentences: ["Pada deszcz.", "Pada śnieg."],
        instruction:
          "Czy oba zdania mają tę samą budowę? Co się zmienia? Odpowiedz w 2-3 zdaniach.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Opisz epokę w 3 słowach kluczowych.",
      content: {
        epoch: "Romantyzm",
        instruction:
          "Podaj 3 słowa, które najlepiej charakteryzują romantyzm i krótko wyjaśnij każde.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question: "Wykonaj analizę językową fragmentu - zadanie wieloetapowe.",
      content: {
        text: "Nie dość na tem: wszak Rzym, co świat posiadał, \nPrzeminął; Trzej Monarchowie, których wielka władza \nJak morze sie rozlewała, przeminęli...",
        steps: [
          {
            id: 1,
            instruction: "Określ rodzaj zdania pod względem składniowym",
            expectedAnswer: "złożone współrzędnie z elementami podrzędności",
          },
          {
            id: 2,
            instruction: "Wskaż dominujące środki stylistyczne i ich funkcję",
            expectedAnswer:
              "metafora (władza jak morze), symbol (Rzym, Monarchowie), anafora (przeminął)",
          },
          {
            id: 3,
            instruction: "Określ funkcję interpunkcji (dwukropek, średnik)",
            expectedAnswer:
              "dwukropek - zapowiedź argumentacji/wyjaśnienia, średnik - oddziela równorzędne człony wyliczenia",
          },
          {
            id: 4,
            instruction:
              "Zinterpretuj przesłanie ideowe fragmentu w kontekście epoki barokowej",
            expectedAnswer:
              "motyw vanitas - przemijanie potęg i marność ziemskiej chwały",
          },
        ],
      },
      metadata: {
        expectedConcepts: [
          "składnia złożona",
          "metafora",
          "vanitas",
          "interpunkcja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "CONTEMPORARY",
      question: "Analiza porównawcza - wyjaśnij różnicę między pojęciami.",
      content: {
        concepts: ["ironia romantyczna", "ironia postmodernistyczna"],
        instruction:
          "Wyjaśnij, czym różnią się te dwa typy ironii. Podaj przykład literacki dla każdej z nich.",
        requirements: [
          "definicja obu pojęć",
          "wskazanie różnic",
          "przykłady z literatury",
          "150-200 słów",
        ],
      },
      metadata: {
        expectedConcepts: [
          "ironia romantyczna - dystans autora",
          "ironia postmodernistyczna - podważanie prawdy",
          "przykłady: Słowacki vs Tokarczuk",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question: "Przekształć zdanie zachowując sens, ale zmieniając strukturę.",
      content: {
        originalSentence:
          "Mimo że padało, wyszedłem, ponieważ musiałem kupić chleb, którego brakowało w domu.",
        transformation:
          "Przekształć to zdanie na trzy krótsze zdania pojedyncze, zachowując wszystkie informacje.",
        hints: [
          "użyj połączenia współrzędnego",
          "zamień zdania podrzędne na główne",
          "zachowaj relacje logiczne",
        ],
      },
      metadata: {
        expectedAnswer:
          "Padało. Wyszedłem jednak. Musiałem kupić chleb, bo w domu go brakowało.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Interpretacja symbolu w kontekście całości utworu.",
      content: {
        symbol: "złoty róg",
        context:
          "Poeta rozdaje go gościom weselnym, ale nikt nie potrafi zagrać.",
        instruction:
          "Zinterpretuj symbolikę złotego rogu w kontekście: \n1) sytuacji Polski pod zaborami\n2) postaci Poety w dramacie\n3) tytułowego wesela jako metafory narodu",
        requirements: [
          "interpretacja wielowarstwowa",
          "odniesienie do kontekstu historycznego",
          "200-250 słów",
        ],
      },
      metadata: {
        expectedConcepts: [
          "róg - symbol wezwania do czynu",
          "niemoc narodu",
          "odpowiedzialność inteligencji",
          "paraliż narodowy",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Podaj przeciwieństwo wyrazu 'duży'.",
      content: {
        expectedAnswer: "mały",
        acceptableAnswers: ["mały", "malutki", "niewielki"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Jak nazywał się smok z Wawelu?",
      content: {
        expectedAnswer: "Smok Wawelski",
        acceptableAnswers: ["Smok Wawelski", "smok wawelski", "wawelski"],
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Jaki znak interpunkcyjny stawiamy na końcu pytania?",
      content: {
        expectedAnswer: "pytajnik",
        acceptableAnswers: ["pytajnik", "znak zapytania", "?"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Podaj liczbę mnogą wyrazu 'kot'.",
      content: {
        expectedAnswer: "koty",
        acceptableAnswers: ["koty"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      work: "Lokomotywa",
      question: "Kto napisał 'Lokomotywę'? (podaj nazwisko)",
      content: {
        expectedAnswer: "Tuwim",
        acceptableAnswers: ["Tuwim", "Julian Tuwim"],
      },
    },

    // POZIOM 2 - Łatwe
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Wyjaśnij znaczenie frazeologizmu 'mieć węża w kieszeni'.",
      content: {
        requirements: ["znaczenie", "skąpstwo"],
        expectedElements: ["skąpy", "nie wydawać pieniędzy", "oszczędny"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Przekształć zdanie na stronę bierną: 'Jan czyta książkę.'",
      content: {
        originalSentence: "Jan czyta książkę.",
        expectedAnswer: "Książka jest czytana przez Jana.",
        acceptableAnswers: [
          "Książka jest czytana przez Jana",
          "Książka jest czytana",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      question: "Wymień trzy gatunki epickie.",
      content: {
        requirements: ["3 gatunki", "epika"],
        expectedElements: [
          "powieść",
          "nowela",
          "opowiadanie",
          "bajka",
          "baśń",
          "legenda",
          "mit",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Co to jest synonim? Podaj przykład.",
      content: {
        requirements: ["definicja", "przykład"],
        expectedElements: ["podobne znaczenie", "bliskoznaczny"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Rozwiń skrót 'np.' i użyj go w zdaniu.",
      content: {
        requirements: ["rozwinięcie skrótu", "zdanie"],
        expectedElements: ["na przykład"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Podaj trzy części mowy.",
      content: {
        requirements: ["3 części mowy"],
        expectedElements: [
          "rzeczownik",
          "czasownik",
          "przymiotnik",
          "przysłówek",
          "liczebnik",
          "zaimek",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      question: "W której epoce tworzył Adam Mickiewicz?",
      content: {
        expectedAnswer: "romantyzm",
        acceptableAnswers: ["romantyzm", "Romantyzm", "w romantyzmie"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Wyjaśnij różnicę między zdaniem pojedynczym a złożonym.",
      content: {
        requirements: ["różnica", "orzeczenia"],
        expectedElements: [
          "jedno orzeczenie",
          "więcej orzeczeń",
          "kilka orzeczeń",
        ],
      },
    },

    // POZIOM 3 - Średnie
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Przekształć mowę niezależną na zależną.",
      content: {
        originalSentence: "Anna powiedziała: 'Idę do kina.'",
        transformation: "Zamień na mowę zależną.",
        expectedAnswer: "Anna powiedziała, że idzie do kina.",
        acceptableAnswers: [
          "Anna powiedziała, że idzie do kina",
          "Anna powiedziała, iż idzie do kina",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Analizuj budowę słowotwórczą wyrazu 'nauczycielka'.",
      content: {
        requirements: ["rdzeń", "przyrostki", "przedrostek"],
        expectedElements: ["na-", "ucz", "-yciel", "-ka"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question: "Wyjaśnij pojęcie 'katharsis' w kontekście teatru.",
      content: {
        requirements: ["oczyszczenie", "emocje", "tragedia"],
        expectedElements: [
          "oczyszczenie",
          "uczucia",
          "współczucie",
          "tragedia",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Podaj i wyjaśnij trzy funkcje języka według Jakobsona.",
      content: {
        requirements: ["3 funkcje", "wyjaśnienie"],
        expectedElements: [
          "emotywna",
          "poznawcza",
          "fatyczna",
          "poetycka",
          "metajęzykowa",
          "konatywna",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Czym różni się metafora od porównania? Podaj przykłady.",
      content: {
        requirements: ["różnica", "przykłady"],
        expectedElements: ["jak", "przenośnia", "bezpośrednie"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      question: "Wymień i krótko scharakteryzuj trzy cechy romantyzmu.",
      content: {
        requirements: ["3 cechy", "charakterystyka"],
        expectedElements: [
          "uczucia",
          "indywidualizm",
          "ludowość",
          "mistycyzm",
          "natura",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Przekształć zdanie złożone na pojedyncze.",
      content: {
        originalSentence: "Kiedy przyszedłem do domu, zobaczyłem gości.",
        transformation: "Przekształć na zdanie pojedyncze z imiesłowem.",
        expectedAnswer: "Przyszedłszy do domu, zobaczyłem gości.",
        hints: ["użyj imiesłowu przysłówkowego"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Oceń poprawność zdania i uzasadnij.",
      content: {
        statement: "Włosy mi się jeżą na głowie.",
        requiresJustification: true,
        expectedElements: ["poprawne", "frazeologizm", "przenośnia"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      question: "Wyjaśnij symbolikę lalki w 'Lalce' B. Prusa.",
      content: {
        requirements: ["symbol", "znaczenie", "interpretacja"],
        expectedElements: ["sztuczność", "pozory", "społeczeństwo", "relacje"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "Podaj przykład zdania z orzeczeniem imiennym i wyjaśnij jego budowę.",
      content: {
        requirements: ["przykład", "wyjaśnienie"],
        expectedElements: ["być", "orzecznik", "łącznik"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question:
        "Wyjaśnij zjawisko alternacji w języku polskim. Podaj przykłady.",
      content: {
        requirements: ["definicja", "przykłady"],
        expectedElements: ["wymiana", "głoski", "odmiana"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      question: "Porównaj bohatera romantycznego i pozytywistycznego.",
      content: {
        requirements: ["cechy romantyka", "cechy pozytywisty", "różnice"],
        expectedElements: [
          "indywidualista",
          "społecznik",
          "uczucia",
          "rozum",
          "praca",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Co to jest elipsa składniowa? Podaj przykład.",
      content: {
        requirements: ["definicja", "przykład"],
        expectedElements: ["wyrzutnia", "pominięcie", "domyślny"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question:
        "Wyjaśnij różnicę między stylem oficjalnym a potocznym. Podaj przykłady.",
      content: {
        requirements: ["różnice", "przykłady"],
        expectedElements: ["formalny", "nieformalny", "słownictwo", "składnia"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Przekształć zdania według polecenia.",
      content: {
        sentences: [
          {
            original: "Kiedy przyszedłem, oni już wyszli.",
            instruction: "Zamień na imiesłowowy równoważnik zdania",
            expected: "Przyszedłszy, zastałem ich nieobecność.",
          },
          {
            original: "Książka, którą czytam, jest ciekawa.",
            instruction: "Zamień na zdanie z imiesłowem przymiotnikowym",
            expected: "Czytana przeze mnie książka jest ciekawa.",
          },
        ],
      },
    },

    // PRAWDA/FAŁSZ Z UZASADNIENIEM (25 pytań)
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      question: "Oceń prawdziwość stwierdzeń i uzasadnij.",
      content: {
        statements: [
          "Pozytywizm był reakcją na klęskę powstania styczniowego.",
          "Jan Kochanowski napisał pierwszą polską tragedię.",
          "Lalka Prusa to powieść naturalistyczna.",
        ],
        instruction:
          "Dla każdego zdania napisz P (prawda) lub F (fałsz) i krótko uzasadnij",
      },
    },

    // ANALIZA WIELOETAPOWA (25 pytań)
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question:
        "Przeprowadź analizę językową fragmentu - zadanie wieloetapowe.",
      content: {
        text: "Mała ojczyzna to azyl, to miejsce, z którego patrzy się na świat.",
        steps: [
          { task: "Określ typ zdania", expected: "złożone współrzędnie" },
          {
            task: "Wskaż środki stylistyczne",
            expected: "metafora, powtórzenie",
          },
          { task: "Określ funkcję 'to'", expected: "orzecznik" },
          {
            task: "Wyjaśnij znaczenie metafory",
            expected: "bezpieczne miejsce",
          },
        ],
      },
    },

    // INTERPRETACJA PLAKATU/GRAFIKI (20 pytań)
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "Zinterpretuj elementy plakatu społecznego.",
      content: {
        description:
          "Plakat przedstawia drzewo, którego korzenie tworzą litery alfabetu, a korona składa się z książek.",
        questions: [
          "Co symbolizują korzenie?",
          "Jakie jest przesłanie plakatu?",
          "Do jakiego odbiorcy jest skierowany?",
        ],
        expectedElements: [
          "podstawa wiedzy",
          "rozwój przez czytanie",
          "młodzież/uczniowie",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      question: "Wykonaj analizę językową fragmentu - zadanie wieloetapowe.",
      content: {
        text: "Nie dość na tem: wszak Rzym, co świat posiadał...",
        steps: [
          {
            id: 1,
            instruction: "Określ rodzaj zdania",
            expectedAnswer: "złożone współrzędnie",
          },
          {
            id: 2,
            instruction: "Wskaż środki stylistyczne",
            expectedAnswer: "metafora, symbol",
          },
          {
            id: 3,
            instruction: "Określ funkcję dwukropka",
            expectedAnswer: "zapowiedź wyjaśnienia",
          },
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      question: "Oceń prawdziwość zdania i uzasadnij swoją odpowiedź.",
      content: {
        statement:
          "Romantyzm w Polsce rozpoczął się wraz z publikacją 'Ballad i romansów' Mickiewicza.",
        requiresJustification: true,
        expectedElements: ["prawda", "1822", "manifest romantyzmu"],
      },
    },
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
      difficulty: 4,
      points: 5,
      question: "Porównaj style dwóch fragmentów.",
      content: {
        text1: {
          author: "Prus",
          fragment:
            "Wokulski siedział nieruchomo, wpatrzony w jedną bryłę węgla.",
        },
        text2: {
          author: "Żeromski",
          fragment: "Dusza jego rwała się ku wyżynom, ku ideałom!",
        },
        requirements: [
          "różnice stylistyczne",
          "realizm vs modernizm",
          "środki wyrazu",
          "80-100 słów",
        ],
      },
    },

    // SYNTEZA INFORMACJI Z KILKU ŹRÓDEŁ (25 pytań)
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 5,
      question: "Na podstawie fragmentów napisz notatkę o motywie.",
      content: {
        sources: [
          { work: "Lalka", fragment: "Wokulski marzył o lataniu..." },
          { work: "Ikarus", fragment: "Wzniósł się ponad chmury..." },
          { work: "Lot", fragment: "Pragnienie wzniesienia się..." },
        ],
        topic: "Motyw lotu w literaturze",
        requirements: ["symbolika", "różne ujęcia", "90-110 słów"],
      },
    },

    // STRESZCZENIE Z ELEMENTAMI ANALIZY (25 pytań)
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 5,
      question: "Streść artykuł i dodaj własny komentarz.",
      content: {
        article: {
          title: "Język w dobie internetu",
          main_points: [
            "skrótowość komunikacji",
            "emotikony jako nowy język",
            "zanik interpunkcji",
          ],
        },
        requirements: [
          "streszczenie głównych tez",
          "własna ocena",
          "przykłady",
          "100-120 słów",
        ],
      },
    },
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
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest czasownikiem?",
      content: {
        options: ["piękny", "pięknie", "pięknieć", "piękność"],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Czasownik to część mowy oznaczająca czynność - pięknieć",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile zdań jest w tym tekście?",
      content: {
        text: "Pada deszcz. Dzieci bawią się w domu. Mama czyta książkę.",
        options: ["1", "2", "3", "4"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kto napisał Pana Tadeusza?",
      content: {
        options: [
          "Juliusz Słowacki",
          "Adam Mickiewicz",
          "Cyprian Norwid",
          "Zygmunt Krasiński",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które zdanie jest poprawne?",
      content: {
        options: [
          "Wczoraj poszłem do kino",
          "Wczoraj poszedłem do kina",
          "Wczoraj poszłem do kinem",
          "Wczoraj poszedł do kina",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym zdaniu jest metafora?",
      content: {
        options: [
          "Słońce świeci jasno",
          "Jego serce jest z kamienia",
          "Dzieci biegają po placu",
          "Kot śpi na kanapie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Metafora to przenośnia - serce nie jest dosłownie z kamienia",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Która powieść jest dziełem Bolesława Prusa?",
      content: {
        options: ["Lalka", "Quo Vadis", "Chłopi", "Nad Niemnem"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Jaki to rodzaj zdania?",
      content: {
        sentence: "Czy jutro będzie padać?",
        options: ["oznajmujące", "pytające", "rozkazujące", "wykrzyknikowe"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które słowo jest napisane poprawnie?",
      content: {
        options: ["żurnal", "dziennik", "dzurnal", "żiennik"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      question: "Który poeta pisał pieśni?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Jan Kochanowski",
          "Juliusz Słowacki",
          "Bolesław Prus",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co oznacza frazeologizm 'wziąć się w garść'?",
      content: {
        options: [
          "złapać coś ręką",
          "zmobilizować się",
          "być silnym",
          "trzymać coś mocno",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Przeczytaj fragment i określ dominujący środek stylistyczny.",
      content: {
        text: "Wiatr szeptał tajemnice, drzewa kłaniały się nisko, a chmury płakały deszczem.",
        options: ["metafora", "porównanie", "personifikacja", "hiperbola"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Personifikacja - przypisanie cech ludzkich (szeptać, kłaniać się, płakać) elementom przyrody",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Dziady",
      question: "Przeczytaj fragment i określ jego charakter.",
      content: {
        text: "Jestem młody, zdrów, łatwo wnoszę w górę ciężary, a ręce mam pełne sił.",
        author: "Adam Mickiewicz",
        question: "Jaki typ bohatera reprezentuje narrator?",
        options: [
          "romantyczny buntownik",
          "pozytywistyczny pracownik",
          "oświeceniowy rozumny człowiek",
          "barokowy grzesznik",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który znak interpunkcyjny kończy pytanie?",
      content: {
        options: [".", "!", "?", ","],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym zdaniu występuje porównanie?",
      content: {
        options: [
          "Śnieg pokrył ziemię",
          "Była biała jak śnieg",
          "Śnieg pada",
          "Zimą jest śnieg",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Kto napisał 'Wesele'?",
      content: {
        options: [
          "Stefan Żeromski",
          "Stanisław Wyspiański",
          "Władysław Reymont",
          "Henryk Sienkiewicz",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Jaki typ zdania złożonego?",
      content: {
        sentence: "Kiedy pada deszcz, zostaję w domu.",
        options: [
          "współrzędnie złożone",
          "podrzędnie złożone",
          "pojedyncze",
          "równoważnik zdania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Zdanie podrzędne okolicznikowe czasu (kiedy?)",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile samogłosek jest w polskim alfabecie?",
      content: {
        options: ["6", "8", "9", "10"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Która epoka była pierwsza chronologicznie?",
      content: {
        options: ["renesans", "średniowiecze", "barok", "romantyzm"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest rym?",
      content: {
        options: [
          "powtórzenie słowa",
          "podobne brzmienie końcówek wersów",
          "środek stylistyczny",
          "długość wiersza",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Określ funkcję przecinka w zdaniu.",
      content: {
        sentence: "Anna, która lubi czytać, poszła do biblioteki.",
        question: "Po co służą przecinki?",
        options: [
          "oddzielają człony wyliczenia",
          "wyodrębniają zdanie wtrącone",
          "oddzielają podmiot od orzeczenia",
          "nie są potrzebne",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      question: "Jaki był główny program pozytywizmu?",
      content: {
        options: [
          "walka zbrojna o niepodległość",
          "praca organiczna i edukacja",
          "sztuka dla sztuki",
          "bunt przeciw konwencjom",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest przymiotnikiem?",
      content: {
        options: ["biegać", "szybko", "szybki", "szybkość"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Jaka to część mowy?",
      content: {
        word: "bardzo",
        options: ["przysłówek", "przymiotnik", "czasownik", "rzeczownik"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      question: "Który motyw jest typowy dla romantyzmu?",
      content: {
        options: [
          "praca organiczna",
          "rozum i nauka",
          "uczucia i indywidualizm",
          "realizm społeczny",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Przeczytaj zdanie i określ błąd.",
      content: {
        sentence: "Poszedłem z kolegą do kina i obejrzeliśmy go.",
        question: "Jaki błąd występuje?",
        options: [
          "błąd ortograficzny",
          "błąd interpunkcyjny",
          "niejasne odniesienie zaimka 'go'",
          "brak błędu",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Nie wiadomo czy 'go' odnosi się do kolegi czy filmu",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Która litera jest wielka?",
      content: {
        sentence: "Adam mieszka w Warszawie.",
        question: "Które słowa piszemy wielką literą?",
        options: [
          "wszystkie",
          "Adam i Warszawie",
          "tylko Adam",
          "tylko Warszawie",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      question: "Który poeta był przedstawicielem oświecenia?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Ignacy Krasicki",
          "Bolesław Prus",
          "Stefan Żeromski",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Jaki to stopień przymiotnika?",
      content: {
        word: "najmądrzejszy",
        options: ["równy", "wyższy", "najwyższy", "to nie jest przymiotnik"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Zinterpretuj przenośnię.",
      content: {
        sentence: "Złote serce ma ta kobieta.",
        question: "Co to oznacza?",
        options: [
          "ma złotą biżuterię",
          "jest bardzo dobra",
          "jest bogata",
          "ma piękne serce",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      question: "Jaki motyw dominował w baroku?",
      content: {
        options: [
          "radość życia",
          "przemijanie i śmierć (vanitas)",
          "optymizm",
          "wiara w postęp",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile jest przypadków w języku polskim?",
      content: {
        options: ["5", "6", "7", "8"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Który przykład to antonim (przeciwieństwo)?",
      content: {
        word: "gorący",
        options: ["ciepły", "zimny", "letni", "słoneczny"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Ferdydurke",
      question: "Kto napisał 'Ferdydurke'?",
      content: {
        options: [
          "Witold Gombrowicz",
          "Sławomir Mrożek",
          "Tadeusz Różewicz",
          "Czesław Miłosz",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Określ funkcję składniową podkreślonego wyrazu.",
      content: {
        sentence: "Anna czyta *książkę*.",
        question: "Jaką funkcję pełni słowo 'książkę'?",
        options: ["podmiot", "orzeczenie", "dopełnienie", "okolicznik"],
      },
      correctAnswer: 2,
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Co to jest liryka?",
      content: {
        options: [
          "rodzaj literacki wyrażający uczucia",
          "sztuka teatralna",
          "opowiadanie historii",
          "opis przyrody",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest synonim?",
      content: {
        options: [
          "słowo o przeciwnym znaczeniu",
          "słowo o podobnym znaczeniu",
          "słowo obce",
          "słowo długie",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Przeczytaj i określ relację logiczną.",
      content: {
        sentence: "Pada deszcz, więc wezmę parasol.",
        question: "Jaka relacja łączy człony?",
        options: [
          "przyczyna-skutek",
          "przeciwstawienie",
          "wyliczenie",
          "wyjaśnienie",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      question:
        "Który nurt literacki rozwijał się w dwudziestoleciu międzywojennym?",
      content: {
        options: ["romantyzm", "Skamander", "pozytywizm", "oświecenie"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które słowo jest poprawne?",
      content: {
        options: ["pszykład", "przykład", "pszikład", "psikład"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "W którym czasie jest to zdanie?",
      content: {
        sentence: "Jutro pójdę do kina.",
        options: ["przeszły", "teraźniejszy", "przyszły", "zaprzeszły"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      question: "Co charakteryzowało renesans?",
      content: {
        options: [
          "pesymizm i śmierć",
          "humanizm i antyk",
          "mistycyzm",
          "realizm",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Określ typ błędu.",
      content: {
        sentence: "Mama i tata poszedł do pracy.",
        question: "Jaki błąd?",
        options: [
          "ortografia",
          "interpunkcja",
          "niezgodność podmiotu z orzeczeniem",
          "brak błędu",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Co oznacza 'ó' w wyrazie 'król'?",
      content: {
        options: ["'u'", "'o'", "'ą'", "'ę'"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Co to jest epika?",
      content: {
        options: ["poezja", "opowiadanie historii", "dramat", "esej"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Jaka to liczba?",
      content: {
        word: "koty",
        options: ["pojedyncza", "mnoga", "podwójna", "zero"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Co to za figura stylistyczna?",
      content: {
        text: "Biały, biały śnieg pada...",
        question: "Jakie powtórzenie?",
        options: ["anafora", "epifora", "powtórzenie zwykłe", "metafora"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      question: "Jaka idea dominowała w Młodej Polsce?",
      content: {
        options: [
          "praca organiczna",
          "sztuka dla sztuki",
          "rozum i nauka",
          "realizm",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które słowo to rzeczownik?",
      content: {
        options: ["biegać", "szybki", "szybko", "bieg"],
      },
      correctAnswer: 3,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest zdanie pojedyncze?",
      content: {
        options: [
          "ma jeden podmiot i jedno orzeczenie",
          "ma dwa podmioty",
          "jest krótkie",
          "ma wiele przecinków",
        ],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Chłopi",
      question: "Kto napisał 'Chłopi'?",
      content: {
        options: [
          "Bolesław Prus",
          "Henryk Sienkiewicz",
          "Władysław Reymont",
          "Eliza Orzeszkowa",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Określ styl funkcjonalny.",
      content: {
        text: "Na podstawie przeprowadzonych badań stwierdzono, iż...",
        question: "Jaki to styl?",
        options: ["potoczny", "naukowy", "artystyczny", "urzędowy"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Która samogłoska jest nosowa?",
      content: {
        options: ["a", "e", "ę", "o"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Co to jest dramat?",
      content: {
        options: [
          "utwór do czytania",
          "utwór do wystawienia na scenie",
          "wiersz",
          "opowiadanie",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Jaki to rodzaj?",
      content: {
        word: "stół",
        options: ["męski", "żeński", "nijaki", "mnogi"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Co łączy te wyrazy pod względem budowy?",
      content: {
        words: ["przedpokój", "nadbrzeże", "podziemie"],
        question: "Co mają wspólnego?",
        options: [
          "wszystkie są długie",
          "wszystkie mają przedrostek",
          "wszystkie są rzeczownikami",
          "wszystkie są trudne",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Dziady",
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
      work: "Ferdydurke",
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
      points: 4,
      question: "Dopasuj cytaty do utworów.",
      content: {
        matchingType: "quotes_to_works",
        leftColumn: [
          { id: "A", text: "Litwo! Ojczyzno moja!" },
          { id: "B", text: "Kochanowski czarnolas" },
          { id: "C", text: "Bądź zdrów, ojcze mój!" },
          { id: "D", text: "Szatan z wielkim hukiem" },
        ],
        rightColumn: [
          { id: 1, text: "Pan Tadeusz" },
          { id: 2, text: "Treny" },
          { id: 3, text: "Bogurodzica" },
          { id: 4, text: "Tren XI" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 3],
        [2, 1],
        [3, 2],
      ], // pary [lewy_index, prawy_index]
    },

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
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Przekształć zdanie zgodnie z poleceniem.",
      content: {
        originalSentence: "Mama upiekła ciasto, które było pyszne.",
        transformation:
          "Przekształć na zdanie pojedyncze z imiesłowem przymiotnikowym.",
        expectedAnswer: "Mama upiekła pyszne ciasto.",
        hints: ["imiesłów przymiotnikowy", "zdanie pojedyncze"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      question:
        "Wyjaśnij pojęcie „koncepcji mesjanistycznej” w romantyzmie polskim.",
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
      difficulty: 4,
      points: 35,
      question: "Napisz rozprawkę rozważającą problem z dwóch perspektyw.",
      content: {
        thesis: "Sztuczna inteligencja w edukacji - szansa czy zagrożenie?",
        structure: {
          introduction: "Przedstawienie problemu",
          arguments_for: [
            "indywidualizacja nauczania",
            "dostępność 24/7",
            "obiektywna ocena",
          ],
          arguments_against: [
            "brak empatii",
            "uzależnienie od technologii",
            "zanik relacji uczeń-nauczyciel",
          ],
          conclusion: "Własne stanowisko",
        },
        requirements: ["450-500 słów", "przykłady", "cytaty"],
      },
      metadata: { wordLimit: { min: 450, max: 500 } },
    },

    // ESEJE INTERPRETACYJNE (25 pytań)
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 40,
      question: "Zinterpretuj sentencję w kontekście literackim.",
      content: {
        quote:
          "Granice mojego języka oznaczają granice mojego świata - Wittgenstein",
        requirements: [
          "interpretacja filozoficzna",
          "2 przykłady z literatury",
          "własna refleksja",
          "500-600 słów",
        ],
        suggestedWorks: ["1984 Orwella", "Ferdydurke"],
      },
      metadata: { wordLimit: { min: 500, max: 600 } },
    },

    // ROZPRAWKI PORÓWNAWCZE (25 pytań)
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 35,
      question: "Porównaj ujęcie tematu w różnych epokach.",
      content: {
        topic: "Motyw miłości nieszczęśliwej",
        epochs: ["romantyzm", "pozytywizm", "współczesność"],
        requirements: [
          "charakterystyka w każdej epoce",
          "przykłady utworów",
          "ewolucja motywu",
          "400-500 słów",
        ],
      },
      metadata: { wordLimit: { min: 400, max: 500 } },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 35,
      question: "Napisz rozprawkę typu 'za i przeciw'.",
      content: {
        thesis:
          "Technologia cyfrowa pomaga czy szkodzi w nauce języka polskiego?",
        structure: {
          introduction: "Przedstaw problem",
          arguments_for: "Minimum 2 argumenty ZA",
          arguments_against: "Minimum 2 argumenty PRZECIW",
          conclusion: "Własne stanowisko",
        },
        requirements: [
          "400-500 słów",
          "argumentacja",
          "przykłady",
          "własna opinia",
        ],
      },
      metadata: {
        wordLimit: { min: 400, max: 500 },
      },
    },
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

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Które zdanie zawiera BŁĄD składniowy?",
      content: {
        options: [
          "Czekam na ciebie przy bramie.",
          "Wracam ze szkoły o trzeciej.",
          "Interesuje się tym tematem.",
          "Piszę list do przyjaciela.",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Poprawnie: interesuję się tym tematem (nie 'interesuje')",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      question: "Przeczytaj fragment i określ jego funkcję kompozycyjną.",
      content: {
        sourceText: {
          author: "Juliusz Słowacki",
          title: "Kordian",
          text: "Na szczycie Mont Blanc bohater staje wobec decyzji o zamachu.",
        },
        question: "Jaka jest funkcja sceny na Mont Blanc?",
        options: [
          "komiczna przerywnik",
          "kulminacja wewnętrznego konfliktu",
          "ekspozycja postaci",
          "rozwiązanie akcji",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Dopasuj typ błędu do przykładu.",
      content: {
        matchingType: "error_types",
        leftColumn: [
          { id: "A", text: "Spotkałem się z problemem" },
          { id: "B", text: "Wziąłem parasol, więc pada" },
          { id: "C", text: "Idę do fryzjera na obcięcie" },
        ],
        rightColumn: [
          { id: 1, text: "błąd logiczny" },
          { id: 2, text: "kalka językowa" },
          { id: 3, text: "kontaminacja" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Określ relację semantyczną między zdaniami.",
      content: {
        sentence1: "Wszyscy studenci zdali egzamin.",
        sentence2: "Jan zdał egzamin.",
        question: "Jaka relacja?",
        options: [
          "implikacja (1→2)",
          "sprzeczność",
          "równoważność",
          "niezależność",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation: "Jeśli wszyscy zdali, to Jan też zdał (implikacja)",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "POSITIVISM",
      question: "Uzupełnij charakterystykę programu pozytywizmu.",
      content: {
        textWithGaps:
          "Pozytywiści odrzucili [1] na rzecz [2], promowali [3] jako drogę do rozwoju.",
        gaps: [
          {
            id: 1,
            options: ["naukę", "walkę zbrojną", "poezję", "sztukę"],
          },
          {
            id: 2,
            options: [
              "rewolucji",
              "pracy organicznej",
              "romantyzmu",
              "mistyki",
            ],
          },
          {
            id: 3,
            options: ["sztukę", "wojnę", "edukację", "religię"],
          },
        ],
      },
      correctAnswer: [1, 1, 2],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które słowo jest BŁĘDNIE napisane?",
      content: {
        options: ["przyjaciel", "najlepszy", "czwartek", "wszysko"],
      },
      correctAnswer: 3,
      metadata: {
        explanation: "Poprawnie: wszystko",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question: "W których fragmentach występuje PARADOKS?",
      content: {
        options: [
          "Im więcej wiem, tym bardziej wiem, że nic nie wiem.",
          "Słońce świeci jasno.",
          "Milczenie krzyczy głośniej niż słowa.",
          "Pada deszcz i świeci słońce.",
          "Żywy trup leżał na ziemi.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      question: "Który motyw NIE jest typowy dla baroku?",
      content: {
        contextLinks: [
          {
            trigger: "baroku",
            title: "Barok - epoka XVII wieku",
            type: "text",
            content:
              "Barok to epoka literacka i artystyczna XVII wieku, charakteryzująca się kontrastami, bogactwem form i pesymistyczną wizją świata. Główne motywy barokowe to vanitas (przemijanie), carpe diem (korzystaj z chwili), theatrum mundi (świat jako teatr) oraz memento mori (pamiętaj o śmierci). Barok przeciwstawia ziemskie i niebiańskie, piękno i brzydotę, życie i śmierć.",
            moreInfoLink: "",
          },
        ],
        options: [
          "vanitas - przemijanie",
          "carpe diem - chwytaj dzień",
          "praca organiczna",
          "theatrum mundi - świat jako teatr",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Praca organiczna to hasło pozytywizmu (XIX w.), nie baroku (XVII w.). Pozytywistyczne hasło 'pracy organicznej' oznaczało stopniową, systematyczną pracę u podstaw społeczeństwa - rozwój gospodarczy, edukację i samoorganizację. Pozostałe trzy motywy (vanitas, carpe diem, theatrum mundi) są kluczowymi ideami barokowymi, wyrażającymi przemijanie, zmysłowość i teatralność życia.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Przeprowadź wieloetapową analizę zdania.",
      content: {
        text: "Cisza nocna, głęboka, nieprzebyta otulała śpiące miasto.",
        steps: [
          {
            id: 1,
            instruction: "Wskaż wszystkie epitety",
            expectedAnswer: "nocna, głęboka, nieprzebyta, śpiące",
          },
          {
            id: 2,
            instruction: "Określ funkcję składniową 'miasto'",
            expectedAnswer: "dopełnienie",
          },
          {
            id: 3,
            instruction: "Jaki nastrój budują epitety?",
            expectedAnswer: "tajemniczy, spokojny, niesamowity",
          },
        ],
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "YOUNG_POLAND",
      question: "Dopasuj symbol młodopolski do interpretacji.",
      content: {
        matchingType: "symbol_interpretation",
        leftColumn: [
          { id: "A", text: "Chochoł w 'Weselu'" },
          { id: "B", text: "Złoty róg" },
          { id: "C", text: "Wernyhora" },
        ],
        rightColumn: [
          { id: 1, text: "wezwanie do czynu narodowego" },
          { id: 2, text: "mit mesjanistyczny, przepowiednia" },
          { id: 3, text: "paraliż, strach, niemoc" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest kontaminacja?",
      content: {
        options: [
          "zanieczyszczenie środowiska",
          "połączenie dwóch wyrażeń w jedno błędne",
          "zapożyczenie obce",
          "skrót wyrazowy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Np. 'pójść z kolegą do kina' (pójść do kina + iść z kolegą)",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 5,
      question: "Uzupełnij zaawansowaną analizę stylistyczną.",
      content: {
        textWithGaps:
          "W zdaniu 'Ręce miał jak szpadle, serce jak kamień' występuje [1] podwójna, gdzie obie części używają [2], tworząc [3] obraz postaci.",
        gaps: [
          {
            id: 1,
            options: ["metafora", "porównanie", "symbol", "alegoria"],
          },
          {
            id: 2,
            options: [
              "hiperbolę",
              "kontrast",
              "paralelizm składniowy",
              "elipsę",
            ],
          },
          {
            id: 3,
            options: ["pozytywny", "negatywny", "neutralny", "ambiwalentny"],
          },
        ],
      },
      correctAnswer: [1, 2, 1],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      question: "Ile trenuów napisał Kochanowski?",
      content: {
        options: ["15", "19", "20", "25"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które zdania są w czasie PRZESZŁYM?",
      content: {
        options: [
          "Wczoraj byłem w kinie.",
          "Jutro pójdę do szkoły.",
          "Przeczytałem książkę.",
          "Będę pisał list.",
          "Spotkałem przyjaciela.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Jaki typ aktu mowy według Austina?",
      content: {
        sentence: "Przepraszam za spóźnienie.",
        options: ["asertyw", "ekspresyw", "komisyw", "dyrektyw"],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Ekspresyw - wyrażenie stanu psychicznego",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      question: "Dopasuj utwór do typu bohatera romantycznego.",
      content: {
        matchingType: "work_hero_type",
        leftColumn: [
          { id: "A", text: "Dziady cz. III" },
          { id: "B", text: "Kordian" },
          { id: "C", text: "Anhelli" },
        ],
        rightColumn: [
          { id: 1, text: "bohater-ofiara cierpiąca" },
          { id: 2, text: "bohater prometejski buntownik" },
          { id: 3, text: "bohater niezdecydowany" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 5,
      epoch: "POSITIVISM",
      question: "Porównaj dwie postacie z punktu widzenia ideologii.",
      content: {
        characters: ["Wokulski z 'Lalki'", "Konrad z 'Dziadów'"],
        instruction:
          "Porównaj postawę życiową obu bohaterów. Co reprezentują? W czym są przeciwni? (150-200 słów)",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Który środek stylistyczny dominuje?",
      content: {
        text: "Nie jestem nieinteligentny.",
        options: ["litota", "hiperbola", "ironia", "metafora"],
      },
      correctAnswer: 0,
      metadata: {
        explanation: "Litota - podwójne przeczenie dla złagodzenia/wzmocnienia",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      question: "Która technika NIE jest typowa dla postmodernizmu?",
      content: {
        options: [
          "intertekstualność",
          "pastisz i parodia",
          "realizm fotograficzny",
          "metafikcja",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 5,
      question: "Uzupełnij charakterystykę nurtów dwudziestolecia.",
      content: {
        textWithGaps:
          "Skamander skupiał się na [1], Awangarda na [2], a katastrof iści na [3].",
        gaps: [
          {
            id: 1,
            options: [
              "eksperymencie",
              "tradycji i prostocie",
              "pesymizmie",
              "futuryzmie",
            ],
          },
          {
            id: 2,
            options: [
              "tradycji",
              "innowacji językowej",
              "realizmie",
              "romantyzmie",
            ],
          },
          {
            id: 3,
            options: ["optymizmie", "wizjach zagłady", "humorze", "naturze"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile samogłosek jest w alfabecie polskim?",
      content: {
        options: ["6", "8", "9", "10"],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "a, ą, e, ę, i, o, ó, u, y",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question: "Które zdania zawierają INWERSJĘ (zmieniony szyk)?",
      content: {
        options: [
          "Księżyc świeci jasno.",
          "Świeci jasno księżyc.",
          "Anna czyta książkę.",
          "Czyta Anna ciekawą książkę.",
          "Pada śnieg.",
        ],
      },
      correctAnswer: [1, 3],
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 10,
      epoch: "ROMANTICISM",
      question: "Syntetyzuj koncepcję mesjanizmu polskiego.",
      content: {
        topic:
          "Mesjanizm polski w romantyzmie - idea, kontekst, realizacja literacka",
        requirements: [
          "definicja mesjanizmu (co to?)",
          "kontekst historyczny (dlaczego powstał?)",
          "przykłady z literatury (gdzie występuje?)",
          "krytyka i interpretacje",
          "400-500 słów",
          "struktura: wprowadzenie, rozwój, wnioski",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co oznacza 'robić z igły widły'?",
      content: {
        options: [
          "być precyzyjnym",
          "wyolbrzymiać problem",
          "być pracowitem",
          "naprawiać rzeczy",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ENLIGHTENMENT",
      question: "Dopasuj gatunek oświeceniowy do jego funkcji.",
      content: {
        matchingType: "genre_enlightenment",
        leftColumn: [
          { id: "A", text: "bajka" },
          { id: "B", text: "satyra" },
          { id: "C", text: "komedia" },
        ],
        rightColumn: [
          { id: 1, text: "śmieszenie i pouczanie" },
          { id: 2, text: "alegoryczne pouczenie" },
          { id: 3, text: "ostra krytyka" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Określ relację pragmatyczną.",
      content: {
        sentence: "Czy mógłbyś zamknąć okno?",
        question: "Jaka to rzeczywista funkcja wypowiedzi?",
        options: [
          "pytanie o możliwość",
          "grzeczna prośba/polecenie",
          "wyrażenie wątpliwości",
          "konstatacja faktu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Pozornie pytanie, ale pragmatycznie - grzeczne polecenie",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "W których zdaniach występuje ELIPSA?",
      content: {
        options: [
          "Anna czyta książkę, Piotr - gazetę.",
          "Wszyscy są szczęśliwi.",
          "Ja wolę kawę, ty - herbatę.",
          "Pada deszcz.",
          "Mama w kuchni, tata - w salonie.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      question: "Który poeta reprezentował katastrofizm?",
      content: {
        options: [
          "Julian Tuwim",
          "Tadeusz Peiper",
          "Józef Czechowicz",
          "Julian Przyboś",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Wyjaśnij różnicę między pojęciami.",
      content: {
        concepts: ["homonimia", "polisemia"],
        instruction:
          "Wyjaśnij różnicę i podaj przykład każdego zjawiska. (80-100 słów)",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "BAROQUE",
      question: "Dopasuj poetę barokowego do stylu.",
      content: {
        matchingType: "baroque_poets_style",
        leftColumn: [
          { id: "A", text: "Jan Andrzej Morsztyn" },
          { id: "B", text: "Wacław Potocki" },
          { id: "C", text: "Daniel Naborowski" },
        ],
        rightColumn: [
          { id: 1, text: "poezja metafizyczna, vanitas" },
          { id: 2, text: "marinizm, erotyka" },
          { id: 3, text: "epika historyczna, sarmatyzm" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest w celowniku?",
      content: {
        sentence: "Dałem *bratu* książkę.",
        options: ["mianownik", "dopełniacz", "celownik", "biernik"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question: "Uzupełnij analizę złożonej składni.",
      content: {
        textWithGaps:
          "Zdanie 'Wiem, że kiedy będziesz gotowy, zadzwonisz' jest [1] z [2] poziomami podrzędności, gdzie pierwsze podrzędne to [3].",
        gaps: [
          {
            id: 1,
            options: [
              "pojedyncze",
              "współrzędne",
              "wielokrotnie złożone",
              "równoważnik",
            ],
          },
          {
            id: 2,
            options: ["jednym", "dwoma", "trzema", "czterema"],
          },
          {
            id: 3,
            options: [
              "dopełnieniowe",
              "podmiotowe",
              "przydawkowe",
              "okolicznikowe",
            ],
          },
        ],
      },
      correctAnswer: [2, 1, 0],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      question: "Jaki prąd filozoficzny wpłynął najmocniej na Wyspiańskiego?",
      content: {
        options: [
          "pozytywizm Comte'a",
          "nietzscheanizm",
          "tomizm",
          "egzystencjalizm",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które frazeologizmy oznaczają „być bardzo biednym”?",
      content: {
        options: [
          "nie mieć grosza przy duszy",
          "mieć muchy w nosie",
          "żyć od pierwszego do pierwszego",
          "grać pierwsze skrzypce",
          "ledwo wiązać koniec z końcem",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Jaki typ zdania złożonego?",
      content: {
        sentence: "Pada i wieje, więc zostanę w domu.",
        options: [
          "tylko współrzędne",
          "tylko podrzędne",
          "współrzędne i podrzędne (mieszane)",
          "pojedyncze",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 6,
      question: "Syntetyzuj zasady interpunkcji w zdaniach złożonych.",
      content: {
        topic: "Przecinek w zdaniach złożonych - kiedy stawiamy, a kiedy nie?",
        requirements: [
          "przecinek w zdaniach współrzędnych (3 przypadki)",
          "przecinek w zdaniach podrzędnych (2 przypadki)",
          "wyjątki od reguł",
          "przykłady dla każdej zasady",
          "200-250 słów",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Która powieść Prusa porusza problem antysemityzmu?",
      content: {
        options: ["Lalka", "Placówka", "Faraon", "Anielka"],
      },
      correctAnswer: 0,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      question: "Dopasuj cechy stylu do epoki.",
      content: {
        matchingType: "style_epoch",
        leftColumn: [
          { id: "A", text: "kontrast, antyteza, bogactwo" },
          { id: "B", text: "prostota, harmonia, miara" },
          { id: "C", text: "ekspresja, metafora, symbol" },
        ],
        rightColumn: [
          { id: 1, text: "Młoda Polska" },
          { id: 2, text: "Renesans" },
          { id: 3, text: "Barok" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Określ typ presupozycji.",
      content: {
        sentence: "Jan przestał palić.",
        question: "Jaka presupozycja (założenie)?",
        options: [
          "Jan nigdy nie palił",
          "Jan wcześniej palił",
          "Jan zamierza palić",
          "ktoś inny pali",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Czasownik 'przestać' zakłada wcześniejsze wykonywanie czynności",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy to RZECZOWNIKI?",
      content: {
        options: ["dom", "szybko", "kot", "biegać", "książka"],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      question: "Ile wersów ma sonet?",
      content: {
        options: ["12", "14", "16", "18"],
      },
      correctAnswer: 1,
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 6,
      epoch: "CONTEMPORARY",
      work: "Bieguni",
      question: "Interpretacja postmodernistycznej strategii narracyjnej.",
      content: {
        technique: "fragmentaryczność, montaż, brak linearności",
        instruction:
          "Wyjaśnij, jak ta strategia narracyjna służy wyrażeniu głównych idei powieści. Odnieś się do koncepcji podróży i tożsamości. (250-300 słów)",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "W których przykładach występuje SYNEKDOCHA?",
      content: {
        options: [
          "Polska wygrała mecz (=reprezentacja)",
          "biały jak śnieg",
          "dach nad głową (=dom)",
          "serce z kamienia",
          "setka głów bydła (=sztuk)",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Który typ błędu?",
      content: {
        sentence: "Ten film jest lepszy jak tamten.",
        options: [
          "błąd ortograficzny",
          "błędny spójnik (powinno być 'niż')",
          "błąd interpunkcyjny",
          "brak błędu",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      question: "Uzupełnij charakterystykę bohaterów romantycznych.",
      content: {
        textWithGaps:
          "Konrad reprezentuje typ [1], Kordian to [2], a Gustaw uosabia [3].",
        gaps: [
          {
            id: 1,
            options: [
              "kochanka",
              "buntownika prometejskiego",
              "realisty",
              "pozytywisty",
            ],
          },
          {
            id: 2,
            options: [
              "wojownika",
              "niezdecydowanego idealistę",
              "kupca",
              "chłopa",
            ],
          },
          {
            id: 3,
            options: [
              "szczęście",
              "nieszczęśliwą miłość",
              "bogactwo",
              "mądrość",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest pleonazm?",
      content: {
        options: [
          "skrót",
          "nadmiarowość znaczeniowa",
          "zapożyczenie",
          "błąd ortograficzny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Np. 'dziś dzisiaj', 'wejść do środka'",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 5,
      question: "Dopasuj przykład do figury retorycznej.",
      content: {
        matchingType: "rhetoric_figures_advanced",
        leftColumn: [
          { id: "A", text: "Nie jestem niezadowolony" },
          { id: "B", text: "Przyszedł, zobaczył, zwyciężył" },
          { id: "C", text: "Żywy trup" },
        ],
        rightColumn: [
          { id: 1, text: "oksymoron" },
          { id: 2, text: "litota" },
          { id: 3, text: "asyndeton" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ENLIGHTENMENT",
      question: "Który utwór Krasickiego krytykuje zabobon i przesądy?",
      content: {
        options: [
          "Myszeida",
          "Monachomachia",
          "Hymn do miłości ojczyzny",
          "Myszeis",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które zdania są POPRAWNE składniowo?",
      content: {
        options: [
          "Czekam na ciebie.",
          "Interesuję się sportem.",
          "Spotkałem się z problemem.",
          "Byłem u lekarza.",
          "Idę do fryzjera na obcięcie.",
        ],
      },
      correctAnswer: [0, 1, 3],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Która głoska jest DŹWIĘCZNA?",
      content: {
        options: ["p", "t", "g", "k"],
      },
      correctAnswer: 2,
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 8,
      epoch: "POSITIVISM",
      question: "Porównaj ideologie dwóch epok.",
      content: {
        topic: "Romantyzm vs Pozytywizm - główne różnice ideologiczne",
        requirements: [
          "postawę wobec działania (walka vs praca)",
          "rolę uczuć vs rozumu",
          "stosunek do tradycji",
          "wizję bohatera literackiego",
          "przykłady utworów",
          "300-350 słów",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      question: "Które hasło było najważniejsze dla Przybyszewskiego?",
      content: {
        options: [
          "praca organiczna",
          "sztuka dla sztuki",
          "realizm",
          "patriotyzm",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question: "Które zdania zawierają BŁĘDY logiczne?",
      content: {
        options: [
          "Wziąłem parasol, bo pada.",
          "Pada, więc wziąłem parasol.",
          "Wziąłem parasol, więc pada.",
          "Pada, ale wziąłem parasol.",
          "Wziąłem parasol, choć nie pada.",
        ],
      },
      correctAnswer: [2],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Jaki środek stylistyczny?",
      content: {
        text: "Słońce wstawało powoli, leniwie, jakby niechętnie.",
        options: [
          "metafora",
          "gradacja",
          "personifikacja z gradacją",
          "porównanie",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      question: "Dopasuj dzieło do konwencji literackiej.",
      content: {
        matchingType: "work_convention",
        leftColumn: [
          { id: "A", text: "Balladyna" },
          { id: "B", text: "Ferdydurke" },
          { id: "C", text: "Tango" },
        ],
        rightColumn: [
          { id: 1, text: "dramat absurdu" },
          { id: 2, text: "dramat romantyczny" },
          { id: 3, text: "groteska modernistyczna" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 5,
      question: "Analiza wielopoziomowa wypowiedzi.",
      content: {
        text: "Minister oświadczył, że sytuacja jest pod kontrolą, choć wszyscy wiedzieli, że to nieprawda.",
        steps: [
          {
            id: 1,
            instruction: "Określ typ zdania głównego",
            expectedAnswer: "pojedyncze z dopełnieniem zdaniowym",
          },
          {
            id: 2,
            instruction: "Wskaż konstrukcję podrzędną",
            expectedAnswer: "że sytuacja jest...",
          },
          {
            id: 3,
            instruction: "Jaka relacja między częściami (choć...)?",
            expectedAnswer: "przeciwstawna, koncesywna",
          },
          {
            id: 4,
            instruction: "Jaki efekt pragmatyczny całości?",
            expectedAnswer: "ironia, krytyka, ujawnienie fałszu",
          },
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co oznacza 'bić piankę'?",
      content: {
        options: ["gotować", "mówić dużo o niczym", "sprzątać", "tańczyć"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      question: "Dopasuj gatunek do rodzaju literackiego.",
      content: {
        matchingType: "genre_literary_kind",
        leftColumn: [
          { id: "A", text: "ballada" },
          { id: "B", text: "nowela" },
          { id: "C", text: "tragedia" },
        ],
        rightColumn: [
          { id: 1, text: "dramat" },
          { id: 2, text: "liryka" },
          { id: 3, text: "epika" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Określ typ implikatury konwersacyjnej.",
      content: {
        dialog: "- Idziesz na imprezę? - Mam jutro egzamin.",
        question: "Co implikuje druga osoba?",
        options: [
          "Tak, idę",
          "Nie, nie idę (bo uczę się)",
          "Nie wiem",
          "Może pójdę później",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Odpowiedź pośrednia - wskazanie przyczyny odmowy",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 3,
      question: "W których zdaniach występuje PODMIOT ukryty?",
      content: {
        options: [
          "Idę do szkoły.",
          "Pies biega.",
          "Czytamy książki.",
          "Pada śnieg.",
          "Lubię czekoladę.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "INTERWAR",
      question: "Która grupa futurystów działała w Polsce?",
      content: {
        options: ["Skamander", "formizm", "Czartak", "Żagary"],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które zdanie jest PYTAJĄCE?",
      content: {
        options: [
          "Pada deszcz.",
          "Czy pada deszcz?",
          "Pada deszcz!",
          "Niech pada.",
        ],
      },
      correctAnswer: 1,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 5,
      epoch: "CONTEMPORARY",
      question: "Uzupełnij charakterystykę technik narracyjnych.",
      content: {
        textWithGaps:
          "W postmodernizmie dominuje [1], literatura często stosuje [2], a narracja bywa [3].",
        gaps: [
          {
            id: 1,
            options: [
              "realizm",
              "intertekstualność",
              "naturalizm",
              "symbolizm",
            ],
          },
          {
            id: 2,
            options: ["mimezę", "metafikcję", "opis", "dialog"],
          },
          {
            id: 3,
            options: [
              "linearna",
              "fragmentaryczna",
              "obiektywna",
              "wszechwiedzą ca",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 4,
      question: "Przekształć zdanie złożone na proste.",
      content: {
        originalSentence:
          "Kiedy pada, zostaję w domu, ponieważ nie lubię mokrej pogody.",
        transformation:
          "Przekształć na 2-3 zdania pojedyncze, zachowując wszystkie informacje i relacje logiczne.",
        hints: [
          "użyj spójników współrzędnych",
          "zachowaj relację przyczyny i skutku",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Jaki to stopień przymiotnika?",
      content: {
        word: "najmądrzejszy",
        options: ["równy", "wyższy", "najwyższy", "nie jest przymiotnikiem"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 4,
      question: "Które konstrukcje są przykładami HIPOTAKSY (podrzędności)?",
      content: {
        options: [
          "Kiedy pada, zostaję w domu.",
          "Pada i wieje.",
          "Wiem, że przyjdziesz.",
          "Czytam lub piszę.",
          "Książka, którą czytam, jest ciekawa.",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      question: "Który motyw jest CENTRALNY dla poezji barokowej?",
      content: {
        options: [
          "radość życia",
          "optymizm i wiara w postęp",
          "vanitas - marność i przemijanie",
          "harmonia i równowaga",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 10,
      question: "Syntetyczna analiza ewolucji środków stylistycznych.",
      content: {
        topic:
          "Ewolucja metafory w literaturze polskiej od baroku do współczesności",
        requirements: [
          "funkcja metafory w baroku (dydaktyka, vanitas)",
          "metafora romantyczna (wieloznaczność, symbol)",
          "metafora młodopolska (impresja, sugestia)",
          "metafora awangardowa (eksperyment, nowość)",
          "metafora postmodernistyczna (gra, ironia)",
          "przykłady dla każdej epoki",
          "450-500 słów",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      question: "Jaki typ aktu mowy?",
      content: {
        sentence: "Niniejszym oświadczam konkurencję otwartą.",
        options: ["asertyw", "komisyw", "deklaratyw", "ekspresyw"],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Deklaratyw - wypowiedź zmienia stan rzeczy",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      question: "Dopasuj teoretyka/filozofa do koncepcji.",
      content: {
        matchingType: "theorist_concept",
        leftColumn: [
          { id: "A", text: "Nietzsche" },
          { id: "B", text: "Freud" },
          { id: "C", text: "Schopenhauer" },
        ],
        rightColumn: [
          { id: 1, text: "pesymizm, świat jako wola" },
          { id: 2, text: "nadczłowiek, wola mocy" },
          { id: 3, text: "podświadomość, popędy" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile przypadków ma język polski?",
      content: {
        options: ["5", "6", "7", "8"],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 2,
      question: "Które wyrazy są SYNONIMAMI słowa 'piękny'?",
      content: {
        options: ["brzydki", "ładny", "wspaniały", "mały", "przepiękny"],
      },
      correctAnswer: [1, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Komu Jan Kochanowski poświęcił 'Treny'?",
      content: {
        options: ["żonie", "córce Urszulce", "synowi", "ojcu"],
      },
      correctAnswer: 1,
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ENLIGHTENMENT",
      question: "Wyjaśnij rolę satyry w oświeceniu.",
      content: {
        instruction:
          "Dlaczego satyra była tak ważna w oświeceniu? Jaki miała cel? Podaj przykład utworu satyrycznego i wyjaśnij co krytykował. (120-150 słów)",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Co to jest chiazm?",
      content: {
        options: [
          "powtórzenie na początku",
          "odwrócenie szyku w symetrii",
          "brak spójników",
          "nadmiar spójników",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Np. 'Trzeba jeść, aby żyć, nie żyć, aby jeść'",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      question: "Które cechy są wspólne dla romantyzmu i Młodej Polski?",
      content: {
        options: [
          "indywidualizm artysty",
          "praca organiczna",
          "mistycyzm i symbolika",
          "realizm",
          "pesymizm i melancholia",
        ],
      },
      correctAnswer: [0, 2, 4],
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      question: "Określ typ modalności.",
      content: {
        sentence: "Jan musi być w domu (wniosek logiczny, nie nakaz).",
        question: "Jaka modalność?",
        options: ["deontyczna", "epistemiczna", "abulitywna", "aksjologiczna"],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Epistemiczna - wniosek o prawdopodobieństwie",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Które wyrazy są CZASOWNIKAMI?",
      content: {
        options: ["czytać", "szybki", "biegać", "dom", "pisać"],
      },
      correctAnswer: [0, 2, 4],
    },

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
        "Czy opis stworzenia Adama w Księdze Rodzaju jest taki sam jak na fresku Michała Anioła „Stworzenie Adama”? Uzasadnij.",
      content: {
        // Definicje linków kontekstowych
        contextLinks: [
          {
            trigger: "opis stworzenia Adama w Księdze Rodzaju",
            title: "Księga Rodzaju - Stworzenie człowieka",
            type: "text",
            content:
              'W ten sposób zostały ukończone niebo i ziemia oraz wszystkie jej zastępy [stworzeń]. **2**A gdy Bóg ukończył w dniu szóstym swe dzieło, nad którym pracował, odpoczął dnia siódmego po całym swym trudzie, jaki podjął. **3**Wtedy Bóg pobłogosławił ów siódmy dzień i uczynił go świętym; w tym bowiem dniu odpoczął po całej swej pracy, którą wykonał stwarzając. **4**Oto są dzieje początków po stworzeniu nieba i ziemi.\n\n###Drugi opis stworzenia człowieka\n\nGdy Pan Bóg uczynił ziemię i niebo, **5**nie było jeszcze żadnego krzewu polnego na ziemi, ani żadna trawa polna jeszcze nie wzeszła - bo Pan Bóg nie zsyłał deszczu na ziemię i nie było człowieka, który by uprawiał ziemię **6**i rów kopał w ziemi, aby w ten sposób nawadniać całą powierzchnię gleby - **7**wtedy to Pan Bóg ulepił człowieka z prochu ziemi i tchnął w jego nozdrza tchnienie życia, wskutek czego stał się człowiek istotą żywą.\n\n###Pierwotny stan szczęścia\n\n**8**A zasadziwszy ogród w Eden na wschodzie, Pan Bóg umieścił tam człowieka, którego ulepił. **9**Na rozkaz Pana Boga wyrosły z gleby wszelkie drzewa miłe z wyglądu i smaczny owoc rodzące oraz drzewo życia w środku tego ogrodu i drzewo poznania dobra i zła. **10**Z Edenu zaś wypływała rzeka, aby nawadniać ów ogród, i stamtąd się rozdzielała, dając początek czterem rzekom. **11**Nazwa pierwszej - Piszon; jest to ta, która okrąża cały kraj Chawila, gdzie się znajduje złoto. **12**A złoto owej krainy jest znakomite; tam jest także wonna żywica i kamień czerwony. **13**Nazwa drugiej rzeki - Gichon; okrąża ona cały kraj - Kusz. **14**Nazwa rzeki trzeciej - Chiddekel; płynie ona na wschód od Aszszuru. Rzeka czwarta - to Perat. **15**Pan Bóg wziął zatem człowieka i umieścił go w ogrodzie Eden, aby uprawiał go i doglądał. **16**A przy tym Pan Bóg dał człowiekowi taki rozkaz: «Z wszelkiego drzewa tego ogrodu możesz spożywać według upodobania; **17**ale z drzewa poznania dobra i zła nie wolno ci jeść, bo gdy z niego spożyjesz, niechybnie umrzesz». **18**Potem Pan Bóg rzekł: «Nie jest dobrze, żeby mężczyzna był sam, uczynię mu zatem odpowiednią dla niego pomoc». **19**Ulepiwszy z gleby wszelkie zwierzęta lądowe i wszelkie ptaki powietrzne, Pan Bóg przyprowadził je do mężczyzny, aby przekonać się, jaką on da im nazwę. Każde jednak zwierzę, które określił mężczyzna, otrzymało nazwę "istota żywa". **20**I tak mężczyzna dał nazwy wszelkiemu bydłu, ptakom powietrznym i wszelkiemu zwierzęciu polnemu, ale nie znalazła się pomoc odpowiednia dla mężczyzny. **21**Wtedy to Pan sprawił, że mężczyzna pogrążył się w głębokim śnie, i gdy spał wyjął jedno z jego żeber, a miejsce to zapełnił ciałem. **22**Po czym Pan Bóg z żebra, które wyjął z mężczyzny, zbudował niewiastę. A gdy ją przyprowadził do mężczyzny, **23**mężczyzna powiedział: «Ta dopiero jest kością z moich kości i ciałem z mego ciała! Ta będzie się zwała niewiastą, bo ta z mężczyzny została wzięta». **24**Dlatego to mężczyzna opuszcza ojca swego i matkę swoją i łączy się ze swą żoną tak ściśle, że stają się jednym ciałem. **25**Chociaż mężczyzna i jego żona byli nadzy, nie odczuwali wobec siebie wstydu.',
          },
          {
            trigger: "na fresku Michała Anioła „Stworzenie Adama”",
            title: "Michał Anioł - Stworzenie Adama",
            type: "image",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1200px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
          },
        ],
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
        "Jaką funkcję języka pełni fragment „Posłuchajcie, bracia miła” z Lamentu świętokrzyskiego?",
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
      work: "Treny",
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
      work: "Pan Tadeusz",
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
      work: "Wesele",
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
      work: "Wesele",
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
      work: "Ferdydurke",
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
    // =========== POCZĄTEK PYTAŃ LALKA ===============//

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Która postać z 'Lalki' reprezentuje typ 'organic pracownika'?",
      content: {
        options: ["Wokulski", "Rzecki", "Ochocki", "Szuman"],
      },
      correctAnswer: 3,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Która postać z Lalki reprezentuje arystokrację?",
      content: {
        contextLinks: [
          {
            trigger: "arystokrację",
            title: "Arystokracja w 'Lalce' Prusa",
            type: "text",
            content:
              "Arystokracja to warstwa społeczna najwyższego stanu, zazwyczaj szlachta rodowa posiadająca tytuły (hrabiów, baronów) i znaczny majątek. W 'Lalce' Bolesława Prusa arystokracja reprezentowana przez rodzinę Łęckich symbolizuje stare, konserwatywne elity, które w epoce kapitalizmu tracą znaczenie ekonomiczne, ale zachowują prestiż społeczny. Izabela Łęcka to córka arystokratycznej rodziny, w której zakochuje się kupiec Wokulski.",
            moreInfoLink: "",
          },
        ],
        options: [
          "Stanisław Wokulski",
          "Ignacy Rzecki",
          "Izabela Łęcka",
          "Julian Ochocki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Izabela Łęcka jest córką arystokratycznej rodziny, reprezentującą stare elity szlacheckie. Wokulski to przedsiębiorca i kupiec (burżuazja), Rzecki to wierny subiekt (drobnomieszczanin), a Ochocki to dziennikarz. Konflikt między mieszczańskim Wokulskim a arystokratyczną Izabelą jest jednym z głównych wątków powieści.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj postać z Lalki do jej roli społecznej.",
      content: {
        matchingType: "character_role",
        leftColumn: [
          { id: "A", text: "Wokulski" },
          { id: "B", text: "Szlangbaum" },
          { id: "C", text: "Baronowa" },
        ],
        rightColumn: [
          { id: 1, text: "arystokratka" },
          { id: 2, text: "kupiec-idealista" },
          { id: 3, text: "bogaty finansista" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
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
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Kto jest autorem powieści Lalka?",
      content: {
        options: [
          "Henryk Sienkiewicz",
          "Bolesław Prus",
          "Eliza Orzeszkowa",
          "Maria Konopnicka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Autorem Lalki jest Bolesław Prus (właściwie Aleksander Głowacki).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jak nazywa się główny bohater Lalki?",
      content: {
        options: [
          "Ignacy Rzecki",
          "Stanisław Wokulski",
          "Julian Ochocki",
          "Tomasz Łęcki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Głównym bohaterem jest Stanisław Wokulski - warszawski kupiec zakochany w Izabeli Łęckiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "W kim zakochał się Stanisław Wokulski?",
      content: {
        options: [
          "w Helenie Stawskiej",
          "w baronowej Krzeszowskiej",
          "w Izabeli Łęckiej",
          "w pani Wąsowskiej",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski zakochał się bez pamięci w pięknej arystokratce Izabeli Łęckiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jaki zawód wykonuje Stanisław Wokulski?",
      content: {
        options: ["lekarz", "nauczyciel", "kupiec", "bankier"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski jest właścicielem sklepu galanteryjnego w Warszawie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Gdzie Wokulski zarobił swój majątek?",
      content: {
        options: [
          "w Paryżu jako naukowiec",
          "w Warszawie w handlu",
          "na wojnie turecko-rosyjskiej dostarczając broń",
          "w Moskwie jako kupiec",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski wyjechał do Bułgarii podczas wojny turecko-rosyjskiej i zarobił majątek na dostawach broni dla wojska.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Kto jest narratorem w Pamiętniku starego subiekta?",
      content: {
        options: [
          "Stanisław Wokulski",
          "Ignacy Rzecki",
          "Julian Ochocki",
          "doktor Szuman",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fragmenty Pamiętnika starego subiekta są pisane z perspektywy Ignacego Rzeckiego - przyjaciela Wokulskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jakiego przywódcy politycznego uwielbiał Ignacy Rzecki?",
      content: {
        options: [
          "Napoleona Bonaparte",
          "Józefa Piłsudskiego",
          "Tadeusza Kościuszkę",
          "Kazimierza Wielkiego",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Rzecki był zagorzałym bonapartystą - uwielbiał Napoleona Bonaparte i wierzył w bonapartyzm.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jaki pierwotny tytuł miała mieć Lalka?",
      content: {
        options: [
          "Idealiści",
          "Trzy pokolenia",
          "Warszawiacy",
          "Kupiec warszawski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pierwotnie Prus chciał nadać powieści tytuł Trzy pokolenia, nawiązujący do trzech generacji idealistów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "W którym mieście głównie toczy się akcja Lalki?",
      content: {
        options: ["Krakowie", "Poznaniu", "Warszawie", "Lwowie"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Akcja głównie toczy się w Warszawie lat 1878-1879, choć pojawiają się także sceny z Paryża i Zasławka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jaka technika narracyjna charakteryzuje Lalkę?",
      content: {
        options: [
          "monolog wewnętrzny",
          "narracja pierwszoosobowa",
          "dwugłos: narrator trzecioosobowy + pamiętnik Rzeckiego",
          "narracja strumienia świadomości",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Prus zastosował dwugłos narracyjny: narrator trzecioosobowy przeplatany jest fragmentami pamiętnika Rzeckiego (narracja pierwszoosobowa).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Co symbolizuje lalka w tytule powieści?",
      content: {
        options: [
          "tylko zabawkę w procesie sądowym",
          "sztuczność relacji społecznych i pustą arystokrację",
          "dzieciństwo bohaterów",
          "przemysł zabawkarski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Lalka symbolizuje sztuczność i pustkę emocjonalną (jak Izabela), a także topos theatrum mundi - ludzie jako marionetki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Kogo reprezentuje postać Juliana Ochockiego w powieści?",
      content: {
        options: [
          "romantycznych idealistów politycznych",
          "nowych pozytywistycznych idealistów naukowych",
          "cyniczną arystokrację",
          "mieszczaństwo handlowe",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ochocki reprezentuje młode pokolenie pozytywistycznych idealistów oddanych nauce i postępowi naukowemu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "W jakim kierunku Prus krytykuje społeczeństwo w Lalce?",
      content: {
        options: [
          "krytykuje tylko arystokrację",
          "krytykuje tylko mieszczaństwo",
          "krytykuje wszystkie warstwy społeczne",
          "nie krytykuje żadnej warstwy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Lalka to realizm krytyczny - Prus krytykuje wszystkie warstwy społeczne: arystokrację, mieszczaństwo i inteligencję.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jak charakteryzuje się postać Izabeli Łęckiej?",
      content: {
        options: [
          "pracowita i zaradna kobieta",
          "inteligentna i wykształcona arystokratka",
          "pusta emocjonalnie i intelektualnie salonowa lalka",
          "oddana i zakochana w Wokulskim",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Izabela to salonowa lalka - piękna zewnętrznie, ale pusta wewnętrznie, wychowana w luksusie i oderwana od rzeczywistości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Jaki kontrast przedstawia Prus w postaciach Izabeli Łęckiej i Heleny Stawskiej?",
      content: {
        options: [
          "bogata vs biedna",
          "młoda vs stara",
          "pusta i egoistyczna vs życzliwa i zaradna",
          "piękna vs brzydka",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Prus kontrastuje Izabelę (emocjonalnie niedostępna, egoistyczna) z Heleną (życzliwa, zaradna, troskliwa o rodzinę).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jak zakończył się prawdopodobnie los Wokulskiego?",
      content: {
        options: [
          "ożenił się z Izabelą",
          "wyjechał na stałe do Paryża",
          "prawdopodobnie popełnił samobójstwo wysadzając zamek w Zasławiu",
          "został naukowcem u Geista",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zakończenie jest otwarte, ale sugeruje samobójstwo - Węgiełek pisze o wybuchu na zamku i umieszcza krzyż z napisem Non omnis moriar.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Co symbolizuje porównanie Warszawy i Paryża w powieści?",
      content: {
        options: [
          "obie są równie piękne",
          "Paryż ma plan i logikę, Warszawa jest chaotyczna i zaniedbana",
          "Warszawa jest lepsza od Paryża",
          "obie są równie chaotyczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Paryż przedstawiony jest jako uporządkowane miasto z planem urbanistycznym, podczas gdy Warszawa (zwłaszcza Powiśle) jest chaotyczna i zaniedbana.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "POSITIVISM",
      question:
        "Jaki topos literacki Prus wykorzystuje w symbolice lalki i scenie z nakręcanymi zabawkami?",
      content: {
        options: ["locus amoenus", "carpe diem", "theatrum mundi", "vanitas"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Prus wykorzystuje topos theatrum mundi - świat jako teatr, a ludzie jako marionetki kierowane przez los i konwenanse społeczne.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      question:
        "Które cechy charakteryzują Stanisława Wokulskiego? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "zakochany idealista",
          "cyniczny kapitalista",
          "były uczestnik powstania styczniowego",
          "zainteresowany nauką i postępem",
          "arystokrata z urodzenia",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Wokulski to zakochany idealista, uczestnik powstania styczniowego i człowiek zainteresowany nauką. Nie jest cynikiem ani arystokratą.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      question:
        "Które motywy literackie pojawiają się w Lalce? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "motyw miłości romantycznej",
          "motyw miasta",
          "motyw nauki i postępu",
          "motyw przyrody",
          "motyw lalki/marionetki",
          "motyw biedy społecznej",
        ],
      },
      correctAnswer: [0, 1, 2, 4, 5],
      metadata: {
        explanation:
          "W Lalce pojawiają się motywy: miłości, miasta (Warszawa vs Paryż), nauki, lalki/marionetki i biedy. Motyw przyrody nie jest istotny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      question: "Dopasuj postaci do ich charakterystyki.",
      content: {
        matchingType: "character_traits",
        leftColumn: [
          { id: "A", text: "Stanisław Wokulski" },
          { id: "B", text: "Ignacy Rzecki" },
          { id: "C", text: "Julian Ochocki" },
        ],
        rightColumn: [
          { id: 1, text: "romantyczny bonapartysta, samotnik" },
          { id: 2, text: "idealista naukowy, młody wynalazca" },
          { id: 3, text: "kupiec zakochany w arystokratce" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      metadata: {
        explanation:
          "Wokulski - kupiec zakochany w Izabeli, Rzecki - bonapartysta i samotnik, Ochocki - młody naukowiec.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      question: "Uzupełnij analizę symboliki w Lalce.",
      content: {
        textWithGaps:
          "W powieści Lalka tytuł ma wielowymiarowe znaczenie. Lalka symbolizuje [1], co odnosi się do postaci Izabeli. Ponadto motyw lalki/marionetki wiąże się z toposem [2], co pokazuje scena z [3].",
        gaps: [
          {
            id: 1,
            options: [
              "sztuczność i pustkę emocjonalną",
              "piękno",
              "bogactwo",
              "mądrość",
            ],
          },
          {
            id: 2,
            options: [
              "locus amoenus",
              "carpe diem",
              "theatrum mundi",
              "vanitas",
            ],
          },
          {
            id: 3,
            options: [
              "pojedynkiem",
              "nakręcanymi zabawkami u Rzeckiego",
              "balem",
              "procesem",
            ],
          },
        ],
      },
      correctAnswer: [0, 2, 1],
      metadata: {
        explanation:
          "Lalka symbolizuje sztuczność (jak Izabela), wiąże się z toposem theatrum mundi, ilustrowanym sceną z zabawkami.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "POSITIVISM",
      question:
        "Dopasuj działania Wokulskiego do motywacji, która za nimi stała.",
      content: {
        matchingType: "actions_motivations",
        leftColumn: [
          { id: "A", text: "Kupno kamienicy Łęckich za wygórowaną cenę" },
          { id: "B", text: "Nauka języka angielskiego" },
          { id: "C", text: "Organizacja aplauzu dla Rossiego" },
          { id: "D", text: "Wyjazd do Bułgarii na wojnę" },
        ],
        rightColumn: [
          {
            id: 1,
            text: "aby spodobać się Izabeli, która mówiła po angielsku",
          },
          { id: 2, text: "aby spełnić prośbę Izabeli i ją zadowolić" },
          { id: 3, text: "aby pomóc finansowo rodzinie Łęckich" },
          { id: 4, text: "aby zarobić majątek potrzebny do zdobycia Izabeli" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 1],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Wszystkie działania Wokulskiego podporządkowane były miłości do Izabeli: pomoc finansowa, nauka angielskiego, spełnianie próśb, zarabianie majątku.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      question:
        "Które zdania dotyczące Lalki są prawdziwe? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Akcja toczy się w latach 1878-1879",
          "Prus zastosował technikę dwugłosu narracyjnego",
          "Wokulski jest arystokratą",
          "Izabela jest przedstawiona jako ideał kobiety",
          "Powieść krytykuje wszystkie warstwy społeczne",
        ],
      },
      correctAnswer: [0, 1, 4],
      metadata: {
        explanation:
          "Prawdziwe: akcja w latach 1878-79, dwugłos narracyjny, krytyka wszystkich warstw. Fałszywe: Wokulski to kupiec, Izabela to krytykowana lalka.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "POSITIVISM",
      question:
        "Dopasuj fragmenty tekstu do ich funkcji w kompozycji powieści.",
      content: {
        matchingType: "text_function",
        leftColumn: [
          { id: "A", text: "Pamiętnik starego subiekta" },
          { id: "B", text: "Opis Powiśla" },
          { id: "C", text: "Scena nakręcania zabawek przez Rzeckiego" },
          { id: "D", text: "Wizyta Wokulskiego u Geista w Paryżu" },
        ],
        rightColumn: [
          {
            id: 1,
            text: "ilustracja toposu theatrum mundi i kompozycja klamrowa",
          },
          { id: 2, text: "subiektywny głos narratora-bohatera" },
          { id: 3, text: "motyw nauki i idealizmu pozytywistycznego" },
          {
            id: 4,
            text: "naturalistyczny obraz biedy i nierówności społecznych",
          },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      metadata: {
        explanation:
          "Pamiętnik = subiektywny głos, Powiśle = bieda, zabawki = theatrum mundi (klamra kompozycyjna), Geist = motyw nauki.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Wyjaśnij, dlaczego Stanisław Wokulski wyjechał do Bułgarii.",
      content: {
        instruction:
          "Podaj powód wyjazdu Wokulskiego do Bułgarii i wyjaśnij, co chciał osiągnąć. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie, że wyjechał zarobić majątek (1 pkt)",
          "wyjaśnienie, że chciał zdobyć Izabelę Łęcką (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wokulski wyjechał do Bułgarii podczas wojny turecko-rosyjskiej, aby zarobić majątek na dostawach broni. Wszystko robił, żeby zdobyć środki potrzebne do zdobycia serca Izabeli Łęckiej, w której był zakochany bez pamięci.",
        keyWords: ["majątek", "wojna", "Izabela", "zakochany"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Wyjaśnij znaczenie tytułu Lalka.",
      content: {
        instruction:
          "Przedstaw co najmniej dwa znaczenia tytułu powieści. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "odniesienie do Izabeli jako lalki salonowej (1 pkt)",
          "wspomnienie procesu o lalkę między Stawską a Krzeszowską (1 pkt)",
          "topos theatrum mundi - ludzie jako marionetki (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Tytuł ma wielowymiarowe znaczenie: po pierwsze odnosi się do Izabeli Łęckiej jako lalki salonowej - pięknej, ale pustej emocjonalnie. Po drugie nawiązuje do procesu sądowego o lalkę między panią Stawską a baronową. Po trzecie symbolizuje topos theatrum mundi - ludzi jako marionetki kierowane przez społeczeństwo i los.",
        keyWords: [
          "Izabela",
          "proces",
          "theatrum mundi",
          "marionetka",
          "sztuczność",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Scharakteryzuj postać Ignacego Rzeckiego.",
      content: {
        instruction:
          "Opisz osobowość i poglądy Ignacego Rzeckiego w 3-5 zdaniach. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wskazanie, że to subiekt i przyjaciel Wokulskiego (1 pkt)",
          "określenie jako bonapartysta, idealista romantyczny (1 pkt)",
          "opis jako samotnik prowadzący pamiętnik (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Ignacy Rzecki to stary subiekt, najbliższy przyjaciel Wokulskiego. Jest zagorzałym bonapartystą i romantycznym idealistą, który uwielbia Napoleona. Prowadzi samotnicze życie, mieszka w ciemnym pokoju i pisze pamiętnik, w którym wyraża swoje emocje. Reprezentuje starsze pokolenie romantyków.",
        keyWords: [
          "subiekt",
          "bonapartysta",
          "Napoleon",
          "samotnik",
          "pamiętnik",
          "romantyk",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Porównaj postawy Stanisława Wokulskiego i Juliana Ochockiego wobec nauki.",
      content: {
        instruction:
          "Opisz, jak obaj bohaterowie podchodzą do nauki i postępu. Wskaż różnice. (80-120 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "opis zainteresowań naukowych Wokulskiego (1 pkt)",
          "opis pasji Ochockiego do wynalazków (1 pkt)",
          "wskazanie, że Wokulski zrezygnował z nauki dla Izabeli (1 pkt)",
          "kontrast: Ochocki całkowicie oddany nauce (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wokulski w młodości studiował na Szkole Głównej i interesował się mechaniką. Później jednak zrezygnował z kariery naukowej dla miłości do Izabeli. Ochocki natomiast reprezentuje młode pokolenie pozytywistów - całkowicie poświęcił się nauce i wynalazkom. Marzył o maszynie latającej i dla nauki odmówił małżeństwa. Wokulski zapisał mu część majątku na badania.",
        keyWords: [
          "Wokulski",
          "Ochocki",
          "nauka",
          "rezygnacja",
          "Izabela",
          "wynalazki",
          "idealizm",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Wyjaśnij, jak Prus przedstawia kontrast między Warszawą a Paryżem.",
      content: {
        instruction:
          "Opisz różnice między oboma miastami w powieści i wyjaśnij, co one symbolizują. (100-150 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "opis Warszawy jako chaotycznej i zaniedbanej (1 pkt)",
          "opis Paryża jako uporządkowanego i logicznego (1 pkt)",
          "wspomnienie o Powiślu jako symbolu biedy (1 pkt)",
          "interpretacja symboliczna (Polska vs Europa) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Prus przedstawia ostry kontrast: Warszawa jest chaotyczna, brudna i pozbawiona planu urbanistycznego. Szczególnie Powiśle symbolizuje biedę i zaniedbanie. Paryż natomiast ma logiczny plan, jest uporządkowany, daje możliwości rozwoju. Wokulski zauważa, że Paryż to miasto pracy, nauki i postępu. Kontrast symbolizuje różnicę między zacofaną Polską a rozwiniętą Europą Zachodnią, co wpisuje się w pozytywistyczną krytykę polskiej rzeczywistości.",
        keyWords: [
          "Warszawa",
          "Paryż",
          "chaos",
          "porządek",
          "Powiśle",
          "plan",
          "kontrast",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Rozwiń wypowiedź na temat otwartego zakończenia Lalki.",
      content: {
        instruction:
          "Wyjaśnij, na czym polega otwarte zakończenie powieści i jakie są możliwe interpretacje losu Wokulskiego. (120-150 słów)",
        hints: ["Non omnis moriar", "wybuch w zamku", "Węgiełek"],
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "wskazanie, że zakończenie jest niejednoznaczne (1 pkt)",
          "interpretacja sugerująca samobójstwo (wybuch) (1 pkt)",
          "wskazanie innych możliwości (ucieczka, nowe życie) (1 pkt)",
          "odniesienie do cytatu Non omnis moriar (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Zakończenie Lalki jest otwarte i niejednoznaczne. List Węgiełka sugeruje, że Wokulski prawdopodobnie popełnił samobójstwo, wysadzając zamek w Zasławiu. Świadczy o tym krzyż z napisem Non omnis moriar (nie wszystek umrę). Jednak brak zwłok pozwala na inne interpretacje - może uciekł i zaczął nowe życie. Prus celowo nie stawia kropki nad i, dając czytelnikowi przestrzeń do własnej interpretacji i refleksji nad losem idealistów w społeczeństwie.",
        keyWords: [
          "otwarte",
          "samobójstwo",
          "Zasławie",
          "Non omnis moriar",
          "interpretacja",
          "idealiści",
        ],
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 6,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Napisz notatkę syntetyzującą o głównych motywach w Lalce.",
      content: {
        topic: "Najważniejsze motywy literackie w Lalce Bolesława Prusa",
        requirements: [
          "motyw miłości (romantycznej)",
          "motyw lalki/marionetki",
          "motyw miasta",
          "motyw nauki i postępu",
          "krótka charakterystyka każdego motywu",
          "150-200 słów",
        ],
      },
      rubric: {
        maxScore: 6,
        criteria: [
          "wymienienie i omówienie motywu miłości (1,5 pkt)",
          "wymienienie i omówienie motywu lalki (1,5 pkt)",
          "wymienienie i omówienie motywu miasta (1,5 pkt)",
          "wymienienie i omówienie motywu nauki (1,5 pkt)",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 7,
      epoch: "POSITIVISM",
      work: "Lalka",

      question: "Porównaj dwie kobiece postacie w Lalce.",
      content: {
        topic: "Kontrast między Izabelą Łęcką a Heleną Stawską w Lalce",
        requirements: [
          "charakterystyka Izabeli (cechy, postawa)",
          "charakterystyka Heleny (cechy, postawa)",
          "wskazanie głównych różnic",
          "interpretacja: co symbolizuje ten kontrast",
          "200-250 słów",
        ],
      },
      rubric: {
        maxScore: 7,
        criteria: [
          "charakterystyka Izabeli (2 pkt)",
          "charakterystyka Heleny (2 pkt)",
          "wskazanie różnic (2 pkt)",
          "interpretacja symboliczna (1 pkt)",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 7,
      work: "Lalka",

      epoch: "POSITIVISM",
      question: "Omów technikę narracyjną w Lalce.",
      content: {
        topic: "Dwugłos narracyjny w Lalce Bolesława Prusa",
        requirements: [
          "narrator trzecioosobowy - charakterystyka",
          "pamiętnik Rzeckiego - charakterystyka",
          "funkcja każdego typu narracji",
          "efekt artystyczny dwugłosu",
          "180-220 słów",
        ],
      },
      rubric: {
        maxScore: 7,
        criteria: [
          "omówienie narratora trzecioosobowego (2 pkt)",
          "omówienie pamiętnika Rzeckiego (2 pkt)",
          "funkcje obu typów narracji (2 pkt)",
          "efekt artystyczny (1 pkt)",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 8,
      work: "Lalka",

      epoch: "POSITIVISM",
      question: "Scharakteryzuj Lalkę jako powieść pozytywistyczną.",
      content: {
        topic: "Cechy pozytywizmu w Lalce Bolesława Prusa",
        requirements: [
          "realizm krytyczny - przykłady",
          "scjentyzm (kult nauki) - postacie",
          "krytyka społeczna - które warstwy",
          "praca organiczna - czy jest realizowana",
          "idealiści a społeczny rozkład",
          "250-300 słów",
        ],
      },
      rubric: {
        maxScore: 8,
        criteria: [
          "realizm krytyczny (2 pkt)",
          "scjentyzm (2 pkt)",
          "krytyka społeczna (2 pkt)",
          "idealiści vs rzeczywistość (2 pkt)",
        ],
      },
    },

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 15,
      epoch: "POSITIVISM",
      work: "Lalka",

      question:
        "Napisz rozprawkę na temat: Miłość – siła motywująca czy destrukcyjna? Omów zagadnienie na podstawie Lalki Bolesława Prusa.",
      content: {
        thesis:
          "Miłość – siła motywująca czy destrukcyjna? Omów na podstawie Lalki",
        structure: {
          introduction: "Wprowadzenie z tezą i zapowiedzią argumentów",
          arguments_for:
            "Argumenty za tym, że miłość motywuje Wokulskiego (zarabianie majątku, pomoc innym, rozwój)",
          arguments_against:
            "Argumenty za tym, że miłość destruuje Wokulskiego (zaślepienie, rezygnacja z nauki, samobójstwo)",
          conclusion: "Podsumowanie i synteza - miłość jako siła ambiwalentna",
        },
        requirements: [
          "struktura: wstęp - rozwinięcie - zakończenie",
          "argumenty z Lalki",
          "odniesienie do losów Wokulskiego",
          "kontekst pozytywistyczny",
          "300-400 słów",
        ],
        wordLimit: {
          min: 300,
          max: 400,
        },
      },
      rubric: {
        maxScore: 15,
        formalScore: 1,
        literaryScore: 8,
        compositionScore: 3,
        languageScore: 3,
        criteria: {
          formal: "Zachowanie wymogów formalnych (objętość, struktura)",
          literary: "Znajomość lektury, trafność argumentów, kontekst epoki",
          composition: "Logika wywodu, spójność kompozycyjna, teza",
          language: "Poprawność językowa, styl, precyzja wypowiedzi",
        },
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 15,
      epoch: "POSITIVISM",
      work: "Lalka",

      question:
        "Napisz rozprawkę: Czy idealiści mogą być szczęśliwi w świecie przedstawionym Lalki?",
      content: {
        thesis:
          "Czy idealiści mogą być szczęśliwi w świecie przedstawionym Lalki?",
        structure: {
          introduction: "Wprowadzenie - kim są idealiści w Lalce",
          arguments_for:
            "Argumenty: Wokulski (miłość vs realizm), Rzecki (bonapartyzm vs rzeczywistość), Ochocki (nauka vs emigracja)",
          arguments_against:
            "Klęska idealistów - Prus pokazuje, że społeczeństwo ich odtrąca",
          conclusion:
            "Wnioski: w świecie Lalki idealiści są skazani na porażkę",
        },
        requirements: [
          "analiza losów trzech idealistów",
          "odniesienie do tytułu (idealiści na tle rozkładu)",
          "kontekst pozytywizmu",
          "350-450 słów",
        ],
        wordLimit: {
          min: 350,
          max: 450,
        },
      },
      rubric: {
        maxScore: 15,
        formalScore: 1,
        literaryScore: 8,
        compositionScore: 3,
        languageScore: 3,
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      work: "Lalka",

      epoch: "POSITIVISM",
      question:
        "Kto zapisał Wokulskiemu znaczną część swojego majątku na badania naukowe?",
      content: {
        options: [
          "Ignacy Rzecki",
          "Julian Ochocki",
          "doktor Szuman",
          "Wokulski sam sobie zapisał",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To właśnie Wokulski zapisał Ochockiemu dużą część majątku, aby mógł kontynuować badania naukowe nad maszyną latającą.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      work: "Lalka",

      points: 2,
      epoch: "POSITIVISM",
      question:
        "Jaki proces sądowy miał inspirację w rzeczywistej historii przeczytanej przez Prusa?",
      content: {
        options: [
          "proces o kamienicę",
          "proces o lalkę między Stawską a Krzeszowską",
          "proces o sklep",
          "proces o dziedzictwo",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Prus przeczytał w gazecie o procesie za kradzież lalki, co zainspirowało go do zmiany tytułu z Trzy pokolenia na Lalka i wprowadzenia tego wątku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      work: "Lalka",

      epoch: "POSITIVISM",
      question: "Za co został zesłany na Syberię Stanisław Wokulski?",
      content: {
        options: [
          "za kradzież",
          "za udział w powstaniu styczniowym",
          "za handel bronią",
          "za działalność naukową",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski został zesłany na Syberię do Irkucka za wzięcie udziału w powstaniu styczniowym.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      work: "Lalka",

      points: 2,
      epoch: "POSITIVISM",
      question: "Czym charakteryzuje się dzielnica Powiśle w Lalce?",
      content: {
        options: [
          "luksusowymi rezydencjami arystokracji",
          "dobrze zagospodarowanymi bulwarami",
          "biedą, brudem i chaosem urbanistycznym",
          "rozwiniętym przemysłem",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Powiśle przedstawione jest jako symbol biedy, zaniedbania i braku planu urbanistycznego - naturalistyczny obraz nędzy warszawskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      work: "Lalka",

      epoch: "POSITIVISM",
      question:
        "Z kim Wokulski spotyka się w Paryżu i kto reprezentuje ideał naukowca-wynalazcy?",
      content: {
        options: [
          "z Suzinem - rosyjskim kupcem",
          "z profesorem Geistem - genialnym chemikiem",
          "z Rossim - włoskim aktorem",
          "z Ochockim - polskim wynalazcą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Profesor Geist to genialny chemik pracujący nad metalem lżejszym od powietrza, uznawany przez otoczenie za dziwaka, reprezentuje ideał naukowca oddanego ludzkości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      work: "Lalka",

      points: 2,
      epoch: "POSITIVISM",
      question:
        "Dlaczego Wokulski organizuje aplauz dla włoskiego tragika Rossiego?",
      content: {
        options: [
          "bo sam uwielbia teatr włoski",
          "aby spełnić prośbę Izabeli i ją zadowolić",
          "bo jest przyjacielem Rossiego",
          "aby zarobić na przedsięwzięciu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Izabela zachwycała się Rossim i Wokulski zorganizował owacje, aby jej sprawić przyjemność - wszystkie jego działania podporządkowane były zdobyciu jej serca.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      work: "Lalka",

      epoch: "POSITIVISM",
      question:
        "Co oznacza łaciński napis Non omnis moriar umieszczony przez Węgiełka na krzyżu?",
      content: {
        options: [
          "tutaj spoczywam",
          "nie wszystek umrę",
          "pamiętaj o śmierci",
          "zawsze wierny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Non omnis moriar to cytat z Horacego oznaczający nie wszystek umrę - symbol nieśmiertelności duchowej, nawet jeśli ciało ginie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      work: "Lalka",

      difficulty: 5,
      points: 3,
      epoch: "POSITIVISM",
      question:
        "Jaką rolę pełni scena, w której Rzecki nakręca mechaniczne zabawki w sklepie?",
      content: {
        options: [
          "ilustruje jego pracę jako subiekta",
          "wprowadza wątek zabaw dziecięcych",
          "symbolizuje topos theatrum mundi i tworzy klamrę kompozycyjną",
          "pokazuje nowoczesną technologię",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Scena z zabawkami otwiera i kończy powieść (klamra), symbolizując topos theatrum mundi - ludzie jako marionetki kierowane przez los.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      work: "Lalka",

      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      question:
        "Dlaczego Wokulski nie mógł zostać uczonym po powrocie z Syberii?",
      content: {
        options: [
          "nie miał zdolności",
          "wolał być kupcem",
          "naukowcy widzieli w nim byłego subiekta, a kupcy - naukowca",
          "zabroniono mu uprawiania nauki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski nie został zaakceptowany ani przez świat nauki (widzieli w nim kupca), ani przez świat handlu (widzieli w nim naukowca) - symbolizuje to jego pozycję pomiędzy i niezrozumienie idealistów.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      work: "Lalka",

      epoch: "POSITIVISM",
      question:
        "Dopasuj cytaty do postaci, które je wypowiadają lub których dotyczą.",
      content: {
        matchingType: "quotes_characters",
        leftColumn: [
          { id: "A", text: "Świat to teatr, a ludzie to marionetki" },
          { id: "B", text: "„Lalka bezmyślna, irytująca, budząca zazdrość" },
          { id: "C", text: "Non omnis moriar" },
        ],
        rightColumn: [
          { id: 1, text: "refleksje Rzeckiego o istocie życia" },
          { id: 2, text: "cytat na krzyżu dla Wokulskiego" },
          { id: 3, text: "opinia o Izabeli Łęckiej" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 2],
        [2, 1],
      ],
      metadata: {
        explanation:
          "Rzecki mówi o theatrum mundi, Izabela opisywana jako lalka, krzyż z cytatem Horacego dla Wokulskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      work: "Lalka",

      epoch: "POSITIVISM",
      question: "Jak nazywa się najbliższy przyjaciel Stanisława Wokulskiego?",
      content: {
        options: [
          "Julian Ochocki",
          "Ignacy Rzecki",
          "doktor Szuman",
          "Tomasz Łęcki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ignacy Rzecki to najbliższy przyjaciel Wokulskiego, stary subiekt prowadzący sklep i pamiętnik.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      work: "Lalka",

      epoch: "POSITIVISM",
      question: "Jak długo Ignacy Rzecki mieszkał w pokoju przy sklepie?",
      content: {
        options: ["10 lat", "25 lat", "5 lat", "50 lat"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rzecki od 25 lat mieszkał w ciemnym pokoju przy sklepie, który był jego całym światem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Z kim Wokulski wziął ślub dla pieniędzy?",
      content: {
        options: [
          "z Izabelą Łęcką",
          "z Heleną Stawską",
          "z Małgorzatą Minclową",
          "z panią Wąsowską",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski poślubił wdowę po Janie Minclu - Małgorzatę, dziedzicząc po niej sklep i trzydzieści tysięcy rubli.",
      },
    },
    {
      work: "Lalka",
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      question: "Jak nazywa się ojciec Izabeli Łęckiej?",
      content: {
        options: [
          "Julian Łęcki",
          "Stanisław Łęcki",
          "Tomasz Łęcki",
          "Kazimierz Łęcki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tomasz Łęcki to ojciec Izabeli, zubożały arystokrata, który stracił majątek.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Gdzie Wokulski uczęszczał na wykłady jako wolny słuchacz?",
      content: {
        options: [
          "na Uniwersytecie Jagiellońskim",
          "w Szkole Głównej",
          "na Uniwersytecie Warszawskim",
          "w Akademii Medycznej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Po rzuceniu pracy u Hopfera, Wokulski uczęszczał na wykłady w Szkole Głównej jako wolny słuchacz.",
      },
    },
    {
      work: "Lalka",
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Kto uratował życie Wokulskiego podczas próby samobójstwa?",
      content: {
        options: [
          "Ignacy Rzecki",
          "Julian Ochocki",
          "brat Wysockiego - dróżnik",
          "Tomasz Łęcki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W Skierniewicach życie Wokulskiego uratował dróżnik - brat Wysockiego, któremu Stanisław wcześniej pomógł.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 1,
      epoch: "POSITIVISM",
      question: "Jak nazywa się warszawska dzielnica biedy opisana w powieści?",
      content: {
        options: ["Praga", "Powiśle", "Wola", "Mokotów"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Powiśle to dzielnica nad Wisłą, symbol biedy, brudu i zaniedbania w ówczesnej Warszawie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Kto prowadził pamiętnik w powieści?",
      content: {
        options: [
          "Stanisław Wokulski",
          "Ignacy Rzecki",
          "Izabela Łęcka",
          "doktor Szuman",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ignacy Rzecki prowadził \u201ePamiętnik starego subiekta\u201d, w którym zapisywał swoje myśli i emocje.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      work: "Lalka",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Kim był Suzin w życiu Wokulskiego?",
      content: {
        options: [
          "jego wrogiem",
          "rosyjskim kupcem i wspólnikiem",
          "przyjacielem z dzieciństwa",
          "nauczycielem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Suzin to rosyjski kupiec, wspólnik Wokulskiego, który pomógł mu zarobić majątek na wojnie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      work: "Lalka",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Co Wokulski kupił dla rodziny Łęckich za wygórowaną cenę?",
      content: {
        options: ["powóz", "kamienicę", "sklep", "pałac"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski kupił kamienicę Łęckich za 90 tysięcy rubli, choć była warta 70 tysięcy, aby pomóc finansowo rodzinie Izabeli.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Z jakiej rodziny pochodził Stanisław Wokulski?",
      content: {
        options: [
          "z bogatej rodziny kupieckiej",
          "ze zubożałej rodziny szlacheckiej",
          "z rodziny chłopskiej",
          "z rodziny arystokratycznej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski pochodził ze zubożałej rodziny szlacheckiej, a jego ojciec ciągle procesował się o majątek.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 1,
      epoch: "POSITIVISM",
      question: "Kim była Helena Stawska w powieści?",
      content: {
        options: [
          "arystokratką",
          "biedną wdową pracującą jako nauczycielka",
          "prostytutką",
          "służącą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Helena Stawska to biedna wdowa, która utrzymywała się z korepetycji i nauczania gry na fortepianie oraz angielskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      work: "Lalka",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Kim był Maruszewicz w powieści?",
      content: {
        options: [
          "uczciwym kupcem",
          "zdeklasowanym szlachcicem i oszustem",
          "lekarzem",
          "naukowcem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Maruszewicz to zdeklasowany szlachcic i oszust, który wyłudzał pieniądze od różnych osób, w tym od Wokulskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      work: "Lalka",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      question: "W jakich latach toczy się akcja główna \u201eLalki\u201d?",
      content: {
        options: ["1870-1871", "1878-1879", "1880-1881", "1863-1864"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja główna powieści toczy się w latach 1878-1879 w Warszawie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Gdzie Wokulski spotkał profesora Geista?",
      content: {
        options: ["w Warszawie", "w Paryżu", "w Berlinie", "w Moskwie"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski poznał profesora Geista - genialnego chemika - podczas pobytu w Paryżu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Co łączyło Rzeckiego z Wokulskim?",
      content: {
        options: [
          "byli braćmi",
          "głęboka przyjaźń",
          "rywalizacja",
          "tylko relacja pracownik-pracodawca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rzeckiego i Wokulskiego łączyła głęboka przyjaźń - Rzecki był najbliższym przyjacielem Stanisława.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      work: "Lalka",
      points: 1,
      epoch: "POSITIVISM",
      question: "Jaki interes prowadził Wokulski?",
      content: {
        options: [
          "sklep z bronią",
          "sklep galanteryjny",
          "fabrykę",
          "jadłodajnię",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski prowadził sklep galanteryjny odziedziczony po Minclowej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 1,
      epoch: "POSITIVISM",
      question: "Kto był żydowskim przyjacielem i lekarzem Wokulskiego?",
      content: {
        options: ["Szlangbaum", "doktor Szuman", "Suzin", "Geist"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Doktor Szuman to żydowski lekarz i naukowiec, przyjaciel Wokulskiego, który traktował biednych za darmo.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Kto kupił sklep Wokulskiego?",
      content: {
        options: ["Rzecki", "młody Szlangbaum", "baron Krzeszowski", "Ochocki"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sklep Wokulskiego kupił młody Szlangbaum - syn starego Szlangbauma.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Gdzie Wokulski poznał Izabelę Łęcką?",
      content: {
        options: ["w swoim sklepie", "w teatrze", "w kościele", "na balu"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski po raz pierwszy zobaczył Izabelę w teatrze podczas spektaklu \u201eVioletta\u201d i zakochał się w niej od pierwszego wejrzenia.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj postaci do ich głównych cech charakteru.",
      content: {
        matchingType: "character_traits",
        leftColumn: [
          { id: "A", text: "Tomasz Łęcki" },
          { id: "B", text: "Helena Stawska" },
          { id: "C", text: "Maruszewicz" },
          { id: "D", text: "doktor Szuman" },
        ],
        rightColumn: [
          { id: 1, text: "życzliwa, zaradna wdowa" },
          { id: 2, text: "zdeklasowany szlachcic i oszust" },
          { id: 3, text: "żydowski lekarz i naukowiec" },
          { id: 4, text: "zubożały arystokrata" },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 0],
        [2, 1],
        [3, 2],
      ],
      metadata: {
        explanation:
          "Tomasz Łęcki - zubożały arystokrata, Helena - życzliwa wdowa, Maruszewicz - oszust, Szuman - lekarz.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      work: "Lalka",
      epoch: "POSITIVISM",
      question:
        "Które cechy charakteryzują Ignacego Rzeckiego? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "bonapartysta",
          "samotnik",
          "prowadzi pamiętnik",
          "bogaty arystokrata",
          "subiekt w sklepie",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "Rzecki to bonapartysta, samotnik prowadzący pamiętnik i pracujący jako stary subiekt. Nie jest arystokratą.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Uzupełnij informacje o życiu Wokulskiego.",
      content: {
        textWithGaps:
          "Stanisław Wokulski pochodził ze [1] rodziny szlacheckiej. W młodości uczęszczał do [2], ale został wyrzucony za udział w [3]. Za to zesłano go na Syberię do [4].",
        gaps: [
          {
            id: 1,
            options: ["bogatej", "zubożałej", "arystokratycznej", "chłopskiej"],
          },
          {
            id: 2,
            options: ["Uniwersytetu", "Szkoły Głównej", "Akademii", "liceum"],
          },
          {
            id: 3,
            options: [
              "powstaniu styczniowym",
              "powstaniu listopadowym",
              "wojnie",
              "zamachu",
            ],
          },
          {
            id: 4,
            options: ["Moskwy", "Petersburga", "Irkucka", "Omska"],
          },
        ],
      },
      correctAnswer: [1, 1, 0, 2],
      metadata: {
        explanation:
          "Wokulski pochodził ze zubożałej szlachty, uczęszczał do Szkoły Głównej, brał udział w powstaniu styczniowym i został zesłany do Irkucka.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Dopasuj miejsca do wydarzeń, które się w nich rozegrały.",
      content: {
        matchingType: "places_events",
        leftColumn: [
          { id: "A", text: "Powiśle" },
          { id: "B", text: "Paryż" },
          { id: "C", text: "Skierniewice" },
          { id: "D", text: "Zasławek" },
        ],
        rightColumn: [
          { id: 1, text: "próba samobójstwa Wokulskiego" },
          { id: 2, text: "spotkanie z profesorem Geistem" },
          { id: 3, text: "obraz warszawskiej biedy" },
          { id: 4, text: "posiadłość prezesowej Zasławskiej" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 1],
        [2, 0],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Powiśle - bieda, Paryż - Geist, Skierniewice - próba samobójstwa, Zasławek - posiadłość prezesowej.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 2,
      epoch: "POSITIVISM",
      question:
        "Które zdania dotyczące Izabeli Łęckiej są prawdziwe? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "jest córką zubożałego arystokraty",
          "wychowała się w biedzie",
          "jest inteligentna i wykształcona",
          "traktuje Wokulskiego instrumentalnie",
          "pochodzi z rodziny kupieckiej",
        ],
      },
      correctAnswer: [0, 3],
      metadata: {
        explanation:
          "Prawdziwe: Izabela jest córką zubożałego arystokraty Tomasza Łęckiego i traktuje Wokulskiego instrumentalnie. Fałszywe: wychowała się w luksusie, nie jest szczególnie inteligentna, nie pochodzi z rodziny kupieckiej.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      work: "Lalka",
      points: 2,
      epoch: "POSITIVISM",
      question: "Dopasuj postaci do ich zawodów lub zajęć.",
      content: {
        matchingType: "characters_professions",
        leftColumn: [
          { id: "A", text: "Stanisław Wokulski" },
          { id: "B", text: "Ignacy Rzecki" },
          { id: "C", text: "Julian Ochocki" },
          { id: "D", text: "Helena Stawska" },
        ],
        rightColumn: [
          { id: 1, text: "nauczycielka, korepetytorka" },
          { id: 2, text: "subiekt w sklepie" },
          { id: 3, text: "właściciel sklepu galanteryjnego" },
          { id: 4, text: "wynalazca, naukowiec" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 1],
        [2, 3],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Wokulski - właściciel sklepu, Rzecki - subiekt, Ochocki - wynalazca, Helena - nauczycielka.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 2,
      epoch: "POSITIVISM",
      question:
        "Kim był Ignacy Rzecki i jaka była jego rola w życiu Wokulskiego?",
      content: {
        work: "Lalka",
        instruction:
          "Opisz Rzeckiego i jego relację z Wokulskim w 2-3 zdaniach. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "określenie Rzeckiego jako starego subiekta (1 pkt)",
          "wskazanie, że był najbliższym przyjacielem Wokulskiego (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Ignacy Rzecki to stary subiekt prowadzący sklep Wokulskiego, jego najbliższy przyjaciel. Był bonapartystą i samotnikiem prowadzącym pamiętnik, w którym zapisywał swoje myśli o życiu i polityce.",
        keyWords: ["subiekt", "przyjaciel", "bonapartysta", "pamiętnik"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      question: "Dlaczego Wokulski poślubił Małgorzatę Minclową?",
      content: {
        work: "Lalka",
        instruction:
          "Wyjaśnij powód małżeństwa Wokulskiego z Minclową. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie małżeństwa dla majątku (1 pkt)",
          "wymienienie, co odziedziczył (sklep, pieniądze) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wokulski poślubił wdowę po Janie Minclu - Małgorzatę - dla pieniędzy. Po jej śmierci odziedziczył sklep galanteryjny i trzydzieści tysięcy rubli, co pozwoliło mu na dalszy rozwój biznesu.",
        keyWords: ["majątek", "sklep", "pieniądze", "odziedziczył"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 2,
      epoch: "POSITIVISM",
      question: "Kim była Helena Stawska i czym różniła się od Izabeli?",
      content: {
        work: "Lalka",
        instruction:
          "Scharakteryzuj Helenę Stawską i wskaż główną różnicę między nią a Izabelą. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "opis Heleny jako biednej wdowy (1 pkt)",
          "kontrast: Helena życzliwa vs Izabela egoistyczna (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Helena Stawska to biedna wdowa utrzymująca się z korepetycji i nauczania. W przeciwieństwie do Izabeli była życzliwa, zaradna i opiekuńcza wobec rodziny. Stanowiła pozytywny kontrast dla pustej emocjonalnie Łęckiej.",
        keyWords: ["wdowa", "biedna", "życzliwa", "kontrast", "Izabela"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      question:
        "Wyjaśnij, dlaczego Wokulski kupił kamienicę Łęckich za wygórowaną cenę.",
      content: {
        work: "Lalka",
        instruction:
          "Podaj powód zakupu kamienicy i cenę, którą zapłacił. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie, że chciał pomóc rodzinie Izabeli (1 pkt)",
          "podanie, że zapłacił 90 tys. zamiast 70 tys. rubli (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wokulski kupił kamienicę Łęckich za 90 tysięcy rubli, choć była warta tylko 70 tysięcy. Zrobił to, aby pomóc finansowo rodzinie Izabeli, w której był zakochany, i zbliżyć się do niej.",
        keyWords: ["90 tysięcy", "pomoc", "Izabela", "wygórowana cena"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 2,
      epoch: "POSITIVISM",
      question: "Opisz dzielnicę Powiśle w \u201eLalce\u201d.",
      content: {
        work: "Lalka",
        instruction:
          "Wyjaśnij, jak Prus przedstawił Powiśle i co symbolizuje ta dzielnica. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "opis Powiśla jako biednej dzielnicy (1 pkt)",
          "wskazanie symboliki biedy i zaniedbania (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Powiśle to dzielnica nad Wisłą pełna biedy, brudu i zaniedbania. Prus przedstawił ją w sposób naturalistyczny jako symbol warszawskiej nędzy i chaosu urbanistycznego. Dla Wokulskiego był to obraz polskiego społeczeństwa.",
        keyWords: ["bieda", "brud", "zaniedbanie", "Wisła", "naturalizm"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      work: "Lalka",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      question: "Kim był profesor Geist i gdzie go spotkał Wokulski?",
      content: {
        work: "Lalka",
        instruction:
          "Opisz postać Geista i jego znaczenie dla Wokulskiego. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "określenie Geista jako naukowca-chemika (1 pkt)",
          "wskazanie spotkania w Paryżu i szansy naukowej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Profesor Geist to genialny chemik mieszkający w Paryżu, pracujący nad metalem lżejszym od powietrza. Wokulski spotkał go podczas pobytu w Paryżu i miał szansę zostać jego pomocnikiem naukowym, ale wybrał powrót do Polski dla Izabeli.",
        keyWords: ["chemik", "Paryż", "naukowiec", "metal", "szansa"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "POSITIVISM",
      question: "Z jakiej rodziny pochodził Stanisław Wokulski?",
      content: {
        work: "Lalka",
        instruction: "Opisz pochodzenie społeczne Wokulskiego. (20-40 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie pochodzenia ze zubożałej szlachty (1 pkt)",
          "wzmianka o ojcu procesującym się o majątek (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wokulski pochodził ze zubożałej rodziny szlacheckiej. Jego ojciec ciągle procesował się o majątek po dziadku i zabierał synowi pieniądze przeznaczone na książki.",
        keyWords: ["zubożała szlachta", "ojciec", "proces", "majątek"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Kim był Maruszewicz w powieści?",
      content: {
        work: "Lalka",
        instruction:
          "Scharakteryzuj postać Maruszewicza w 2-3 zdaniach. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "określenie jako zdeklasowany szlachcic (1 pkt)",
          "wskazanie, że był oszustem (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Maruszewicz to zdeklasowany szlachcic i oszust. Wyłudzał pieniądze od różnych osób, w tym od Wokulskiego i barona Krzeszowskiego. Ostatecznie Wokulski okazał mu łaskę i zniszczył dowody jego oszustw.",
        keyWords: ["zdeklasowany", "oszust", "wyłudzał", "szlachcic"],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      work: "Lalka",
      points: 1,
      epoch: "POSITIVISM",
      question: "Ile pieniędzy Wokulski przywiózł z wojny w Bułgarii?",
      content: {
        options: [
          "30 tysięcy rubli",
          "100 tysięcy rubli",
          "250 tysięcy rubli",
          "500 tysięcy rubli",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski przywiózł z Bułgarii 250 tysięcy rubli i dużo złota, podczas gdy wyjechał z 30 tysiącami - pomnożył majątek dziesięciokrotnie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Kto był pierwszym pracodawcą młodego Wokulskiego?",
      content: {
        options: ["Mincel", "Hopfer", "Rzecki", "Suzin"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski jako młody człowiek pracował jako subiekt u Hopfera w winiarni, zanim rozpoczął studia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Gdzie Rzecki walczył po śmierci ojca?",
      content: {
        options: [
          "w powstaniu styczniowym",
          "w powstaniu węgierskim",
          "w powstaniu listopadowym",
          "nigdzie nie walczył",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Po śmierci ojca Rzecki wraz z Augustem Katzem wyjechał walczyć w powstaniu węgierskim.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      work: "Lalka",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      question: "Ile lat miał Wokulski na początku akcji powieści?",
      content: {
        options: ["36 lat", "46 lat", "56 lat", "26 lat"],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Na początku powieści Stanisław Wokulski miał 46 lat.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      work: "Lalka",
      points: 1,
      epoch: "POSITIVISM",
      question: "Kto to była Florentyna w powieści?",
      content: {
        options: [
          "służąca Łęckich",
          "kuzynka i opiekunka Izabeli",
          "przyjaciółka Wokulskiego",
          "żona Tomasza Łęckiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Panna Florentyna to kuzynka Izabeli, która mieszkała z Łęckimi i pełniła rolę jej opiekunki.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      work: "Lalka",
      epoch: "POSITIVISM",
      question: "Uzupełnij informacje o sklepie Wokulskiego.",
      content: {
        textWithGaps:
          "Sklep należał wcześniej do [1], którego żona nazywała się [2]. Po jego śmierci Wokulski ożenił się z wdową i odziedziczył [3] tysięcy rubli oraz [4].",
        gaps: [
          {
            id: 1,
            options: ["Hopfera", "Jana Mincla", "Rzeckiego", "Suzina"],
          },
          {
            id: 2,
            options: ["Izabela", "Helena", "Małgorzata", "Florentyna"],
          },
          {
            id: 3,
            options: ["dziesięć", "trzydzieści", "pięćdziesiąt", "sto"],
          },
          {
            id: 4,
            options: ["kamienicę", "fabrykę", "sklep galanteryjny", "powóz"],
          },
        ],
      },
      correctAnswer: [1, 2, 1, 2],
      metadata: {
        explanation:
          "Sklep należał do Jana Mincla, którego żona Małgorzata po śmierci męża wyszła za Wokulskiego. Odziedziczył 30 tysięcy rubli i sklep galanteryjny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      work: "Lalka",
      points: 2,
      epoch: "POSITIVISM",
      question:
        "Które wydarzenia miały miejsce w życiu Wokulskiego? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "studiował w Szkole Głównej",
          "brał udział w powstaniu styczniowym",
          "był zesłany na Syberię",
          "był profesorem uniwersytetu",
          "zarabiał na wojnie turecko-rosyjskiej",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "Prawdziwe: Wokulski studiował, brał udział w powstaniu, był zesłany i zarabiał na wojnie. Fałszywe: nie był profesorem.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      work: "Lalka",
      epoch: "POSITIVISM",
      question:
        "Wyjaśnij, czym jest język ezopowy i jak Prus go stosuje w Lalce.",
      content: {
        work: "Lalka",
        instruction:
          "Zdefiniuj język ezopowy i podaj przykład jego zastosowania w powieści. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "definicja języka ezopowego (1 pkt)",
          "wskazanie kontekstu cenzury (1 pkt)",
          "przykład z powieści (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Język ezopowy to technika używania niedomówień, metafor i metonimii, zrozumiałych dla czytelnika, ale nie dla cenzora. Prus stosował go przy opisywaniu kwestii historycznych i politycznych (powstanie styczniowe, sytuacja Polski). Pozwalało to ominąć cenzurę i przekazać czytelnikom ukryte treści narodowe.",
        keyWords: [
          "język ezopowy",
          "cenzura",
          "niedomówienia",
          "metafory",
          "polityka",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "POSITIVISM",
      question:
        "Wyjaśnij, dlaczego Wokulski rezygnuje z kariery naukowej u Geista w Paryżu.",
      content: {
        work: "Lalka",
        instruction:
          "Opisz dylematy Wokulskiego między nauką a miłością. Co ostatecznie zadecydowało o jego wyborze? (100-150 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "opis szansy naukowej u Geista (1 pkt)",
          "opis miłości do Izabeli jako przeciwwagi (1 pkt)",
          "wskazanie decydującego czynnika (list od prezesowej) (1 pkt)",
          "interpretacja tragizmu wyboru (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "W Paryżu Wokulski miał szansę zrealizować młodzieńcze marzenia o karierze naukowej u boku geniusza - profesora Geista. Był już prawie zdecydowany zostać, gdy otrzymał list od prezesowej Zasławskiej wzmiankujący o Izabeli. To zdecydowało - miłość do Łęckiej okazała się silniejsza niż pasja naukowa. Wybór ten pokazuje tragizm postaci Wokulskiego - romantycy nie potrafią wybrać rozumu zamiast serca.",
        keyWords: [
          "Geist",
          "Paryż",
          "nauka",
          "Izabela",
          "list",
          "wybór",
          "tragizm",
        ],
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Kto był wspólnikiem Wokulskiego podczas zarabiania majątku na wojnie?",
      content: {
        options: ["doktor Szuman", "Suzin", "stary Szlangbaum", "Geist"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Suzin to rosyjski kupiec, wspólnik Wokulskiego, który pomógł mu zarobić majątek podczas wojny turecko-rosyjskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Ile lat Rzecki mieszkał w swoim ciemnym pokoju przy sklepie?",
      content: {
        options: ["15 lat", "25 lat", "30 lat", "20 lat"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rzecki mieszkał w ciemnym pokoju przy sklepie przez 25 lat, co podkreśla jego przywiązanie do miejsca i monotonię życia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Dlaczego Wokulski nie mógł zostać naukowcem po powrocie z Syberii?",
      content: {
        options: [
          "nie miał odpowiedniego wykształcenia",
          "naukowcy widzieli w nim byłego subiekta, kupcy - naukowca",
          "został mu zabroniony dostęp do uniwersytetu",
          "wolał zajmować się handlem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski nie został zaakceptowany ani przez świat nauki (widzieli w nim kupca), ani przez świat handlu (widzieli w nim naukowca) - symbolizuje to jego pozycję \u0084pomiędzy\u0094 i społeczne niezrozumienie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Gdzie Wokulski spotkał Izabelę po raz pierwszy?",
      content: {
        options: [
          "w swoim sklepie",
          "w teatrze podczas spektaklu",
          "na balu u księcia",
          "w Łazienkach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski po raz pierwszy zobaczył Izabelę w teatrze podczas spektaklu i zakochał się w niej od pierwszego wejrzenia. To spotkanie całkowicie zmieniło jego życie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Co symbolizuje porównanie Warszawy do \u0084gąsienicy\u0094 przez Wokulskiego w Paryżu?",
      content: {
        options: [
          "piękno polskiej stolicy",
          "chaos i brak planu urbanistycznego Warszawy",
          "dynamiczny rozwój miasta",
          "bogactwo warszawskiej architektury",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski porównuje chaotyczną Warszawę do gąsienicy, kontrastując ją z logicznie zaplanowanym Paryżem. To symbol krytyki polskiej rzeczywistości przez pozytywistów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Kto uratował życie Wokulskiego podczas próby samobójstwa w Skierniewicach?",
      content: {
        options: ["Rzecki", "Szuman", "brat Wysockiego - dróżnik", "Ochocki"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Życie Wokulskiego uratował dróżnik - brat Wysockiego, któremu Stanisław wcześniej pomógł, załatwiając mu pracę na kolei. To pokazuje, jak dobro wraca.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Jaką cenę zapłacił Wokulski za kamienicę Łęckich?",
      content: {
        options: [
          "70 tysięcy rubli (wartość rynkowa)",
          "80 tysięcy rubli",
          "90 tysięcy rubli (20 tys. ponad wartość)",
          "100 tysięcy rubli",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski kupił kamienicę za 90 tysięcy rubli, choć była warta tylko 70 tysięcy, aby pomóc finansowo rodzinie Izabeli i zbliżyć się do niej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Dlaczego Wokulski zrezygnował z pracy u profesora Geista w Paryżu?",
      content: {
        options: [
          "nie był zainteresowany nauką",
          "otrzymał list od prezesowej wspominający o Izabeli",
          "nie miał wystarczających kwalifikacji",
          "musiał wracać do sklepu w Warszawie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski był już prawie zdecydowany zostać w Paryżu i poświęcić się nauce, gdy otrzymał list od prezesowej Zasławskiej wspominający o Izabeli. Miłość okazała się silniejsza niż pasja naukowa.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj wydarzenia do miejsc, w których się rozegrały.",
      content: {
        matchingType: "events_places",
        leftColumn: [
          { id: "A", text: "Wyścig konny i pojedynek z baronem" },
          { id: "B", text: "Spotkanie z profesorem Geistem" },
          { id: "C", text: "Proces o lalkę" },
          { id: "D", text: "Spacery z Izabelą po ruinach zamku" },
        ],
        rightColumn: [
          { id: 1, text: "Zasławek - posiadłość prezesowej" },
          { id: 2, text: "Paryż" },
          { id: 3, text: "tor wyścigowy w Warszawie" },
          { id: 4, text: "sąd warszawski" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 1],
        [2, 3],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Wyścig i pojedynek - tor w Warszawie, Geist - Paryż, proces - sąd warszawski, spacery z Izabelą - Zasławek.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Uzupełnij informacje o panu Tomaszu Łęckim.",
      content: {
        textWithGaps:
          "Tomasz Łęcki to [1] arystokrata, który utracił majątek z powodu [2] i własnej rozrzutności. Ma córkę o imieniu [3], która jest obiektem miłości [4].",
        gaps: [
          {
            id: 1,
            options: ["bogaty", "zubożały", "młody", "starożytny"],
          },
          {
            id: 2,
            options: ["wojny", "hazardu", "wydarzeń politycznych", "pożaru"],
          },
          {
            id: 3,
            options: ["Helena", "Izabela", "Florentyna", "Ewelina"],
          },
          {
            id: 4,
            options: ["Rzeckiego", "Wokulskiego", "Ochockiego", "Szumana"],
          },
        ],
      },
      correctAnswer: [1, 2, 1, 1],
      metadata: {
        explanation:
          "Tomasz Łęcki to zubożały arystokrata, który stracił majątek z powodu wydarzeń politycznych i rozrzutności. Ma córkę Izabelę, w której zakochany jest Wokulski.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Które zdania o Wokulskim są prawdziwe? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Wyjechał na Syberię za udział w powstaniu styczniowym",
          "Pochodził z bogatej rodziny kupieckiej",
          "Odziedziczył sklep po Minclowej",
          "Był profesorem chemii na uniwersytecie",
          "Zarabiał pieniądze na dostawach broni podczas wojny",
        ],
      },
      correctAnswer: [0, 2, 4],
      metadata: {
        explanation:
          "Prawdziwe: Wokulski był na Syberii za powstanie styczniowe, odziedziczył sklep po Minclowej i zarabiał na broni podczas wojny. Fałszywe: pochodził ze zubożałej szlachty i nie był profesorem.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj postaci do ich kluczowych decyzji życiowych.",
      content: {
        matchingType: "characters_decisions",
        leftColumn: [
          { id: "A", text: "Wokulski" },
          { id: "B", text: "Ochocki" },
          { id: "C", text: "Izabela" },
          { id: "D", text: "Rzecki" },
        ],
        rightColumn: [
          { id: 1, text: "Rezygnacja z małżeństwa dla nauki" },
          { id: 2, text: "Oddanie życia sklepowi i pamięci o Napoleonie" },
          { id: 3, text: "Wstąpienie do klasztoru po śmierci ojca" },
          { id: 4, text: "Wybór miłości zamiast kariery naukowej w Paryżu" },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 0],
        [2, 2],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Wokulski wybrał miłość zamiast nauki, Ochocki zrezygnował z małżeństwa dla wynalazków, Izabela wstąpiła do klasztoru, Rzecki poświęcił życie sklepowi i bonapartyzmowi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Kto prowadził \u0084Pamiętnik starego subiekta\u0094?",
      content: {
        options: ["Wokulski", "Rzecki", "Szuman", "Ochocki"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pamiętnik starego subiekta to dziennik Ignacego Rzeckiego, w którym zapisywał swoje myśli, emocje i obserwacje życia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Co było przyczyną wyjazdu Wokulskiego z pociągu w Skierniewicach?",
      content: {
        options: [
          "pilna sprawa biznesowa",
          "nagła choroba",
          "podsłuchana rozmowa Izabeli ze Starskim po angielsku",
          "spóźnienie pociągu",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski podsłuchał rozmowę Izabeli ze Starskim po angielsku, w której flirtowali i obmawiały go. To złamało mu serce i skłoniło do opuszczenia pociągu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Ile pieniędzy Wokulski ofiarował podczas kwesty w kościele?",
      content: {
        options: ["10 rubli", "25 półimperiałów", "100 rubli", "5 rubli"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Podczas kwesty Wokulski hojnie ofiarował 25 półimperiałów, aby zrobić wrażenie na Izabeli i hrabinie Karolowej.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Uzupełnij informacje o finale powieści.",
      content: {
        textWithGaps:
          "Po zerwaniu z Izabelą Wokulski najprawdopodobniej popełnił [1], wysadzając w powietrze [2]. Świadczy o tym [3] z napisem Non omnis moriar. Rzecki [4], układając towary w sklepie Szlangbauma.",
        gaps: [
          {
            id: 1,
            options: [
              "ucieczkę zagranicę",
              "samobójstwo",
              "morderstwo",
              "podpalenie",
            ],
          },
          {
            id: 2,
            options: [
              "sklep",
              "pałac księcia",
              "zamek w Zasławiu",
              "kamienicę",
            ],
          },
          {
            id: 3,
            options: ["list", "krzyż", "grób", "pomnik"],
          },
          {
            id: 4,
            options: ["uciekł", "umarł", "wyemigrował", "ożenił się"],
          },
        ],
      },
      correctAnswer: [1, 2, 1, 1],
      metadata: {
        explanation:
          "Wokulski prawdopodobnie popełnił samobójstwo, wysadzając zamek w Zasławiu. Węgiełek postawił krzyż z napisem Non omnis moriar. Rzecki umarł w sklepie.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj symbole do ich znaczenia w powieści.",
      content: {
        matchingType: "symbols_meanings",
        leftColumn: [
          { id: "A", text: "Lalka" },
          { id: "B", text: "Paryż" },
          { id: "C", text: "Powiśle" },
          { id: "D", text: "Sklep galanteryjny" },
        ],
        rightColumn: [
          { id: 1, text: "Miejsce uwięzienia i przyziemnej egzystencji" },
          { id: 2, text: "Pustka emocjonalna i sztuczność" },
          { id: 3, text: "Bieda i zaniedbanie polskiego społeczeństwa" },
          { id: 4, text: "Cywilizacja, postęp i racjonalna organizacja" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Lalka symbolizuje pustkę (jak Izabela), Paryż - postęp i cywilizację, Powiśle - polską biedę, sklep - uwięzienie w przyziemności.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Wyjaśnij, dlaczego Wokulski zorganizował aplauz dla Rossiego.",
      content: {
        work: "Lalka",
        instruction:
          "Podaj powód zorganizowania oklasków i wyjaśnij cel tej akcji. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie, że Izabela zachwycała się Rossim (1 pkt)",
          "wyjaśnienie, że Wokulski chciał sprawić jej przyjemność (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Izabela zachwycała się włoskim tragikiem Rossim i krytykowała warszawską publiczność za brak entuzjazmu. Wokulski zorganizował owacje, aby sprawić jej przyjemność - wszystkie jego działania były podporządkowane zdobyciu serca Izabeli.",
        keyWords: ["Rossi", "Izabela", "aplauz", "przyjemność", "miłość"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Scharakteryzuj relację między Wokulskim a Rzeckim.",
      content: {
        work: "Lalka",
        instruction:
          "Opisz, jak się poznali i jaka była ich przyjaźń w 3-4 zdaniach. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wskazanie, że poznali się w latach 50. XIX w. (1 pkt)",
          "opis głębokiej przyjaźni i lojalności (1 pkt)",
          "wspomnienie, że Rzecki wspierał Wokulskiego (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Rzecki i Wokulski poznali się w latach 1857-1858, gdy młody Stanisław pracował u Hopfera. Ignacy od razu dostrzegł w nim potencjał i wspierał jego naukowe ambicje. Ich przyjaźń była głęboka i lojalna - Rzecki pomagał Wokulskiemu w trudnych chwilach, a Stanisław dbał o przyjaciela finansowo. To była najbliższa relacja w życiu obu mężczyzn.",
        keyWords: ["przyjaźń", "Hopfer", "wsparcie", "lojalność", "lata 50."],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Wyjaśnij, czym zajmował się doktor Szuman.",
      content: {
        work: "Lalka",
        instruction:
          "Opisz zawód i główne zajęcia doktora Szumana. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie, że był lekarzem i naukowcem (1 pkt)",
          "wspomnienie, że leczył biednych za darmo (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Doktor Szuman był żydowskim lekarzem i naukowcem. Mimo posiadania majątku leczył biednych za darmo, traktując pacjentów jako materiał do badań. Badał włosy Polaków i prowadził obserwacje naukowe.",
        keyWords: ["lekarz", "naukowiec", "za darmo", "badania", "Żyd"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Opisz proces sądowy o lalkę między Heleną Stawską a baronową Krzeszowską.",
      content: {
        work: "Lalka",
        instruction:
          "Wyjaśnij, o co toczyła się sprawa i jak się zakończyła. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wskazanie oskarżenia o kradzież lalki (1 pkt)",
          "wyjaśnienie, że lalka była kupiona w sklepie Wokulskiego (1 pkt)",
          "informacja o uniewinnieniu Stawskiej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Baronowa Krzeszowska oskarżyła Helenę Stawską o kradzież lalki, którą podglądając zauważyła u niej w mieszkaniu. W rzeczywistości Helena kupiła identyczną lalkę w sklepie Wokulskiego za 3 ruble. Podczas rozprawy służąca baronowej przyznała się, że oryginalna lalka się stłukła. Sąd uniewinnił panią Stawską.",
        keyWords: ["baronowa", "kradzież", "lalka", "sklep", "uniewinniona"],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Kto kupił sklep Wokulskiego?",
      content: {
        options: ["Rzecki", "młody Szlangbaum", "Suzin", "Ochocki"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sklep Wokulskiego kupił młody Szlangbaum, syn starego Szlangbauma. Po przejęciu sklepu zaczął zwalniać pracowników i zachowywać się arogancko.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Co Wokulski planował zbudować na Powiślu?",
      content: {
        options: ["nową kamienicę", "fabrykę", "bulwary nad Wisłą", "teatr"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski planował wybudować na Powiślu bulwary, aby pomóc okolicznym nędzarzom i upiększyć zaniedbane nadwiślańskie tereny. To pokazuje jego pragnienie organicznej pracy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Jaki prezent Wokulski kupił Mariannie (byłej prostytutce) na ślub?",
      content: {
        options: [
          "maszynę do szycia",
          "nowe mieszkanie",
          "500 rubli i wyprawkę",
          "sklep",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wokulski dał Węgiełkowi 500 rubli na ślub, a Mariannie zapewnił wyprawkę. Pokazuje to jego dobroć i chęć pomagania potrzebującym.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Dopasuj miejsca w Paryżu do ich symbolicznego znaczenia dla Wokulskiego.",
      content: {
        matchingType: "paris_places",
        leftColumn: [
          { id: "A", text: "Laboratorium profesora Geista" },
          { id: "B", text: "Paryskie bulwary" },
          { id: "C", text: "Hotel Wokulskiego" },
          { id: "D", text: "Sesje z kontrahentami Suzina" },
        ],
        rightColumn: [
          { id: 1, text: "Miejsce samotności i tęsknoty za Izabelą" },
          { id: 2, text: "Symbol porządku i cywilizacji" },
          { id: 3, text: "Możliwość kariery naukowej" },
          { id: 4, text: "Świat interesów i pieniądza" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 1],
        [2, 0],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Laboratorium Geista - szansa naukowa, bulwary - porządek Paryża, hotel - samotność, sesje - świat interesów.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Które działania Wokulskiego były motywowane miłością do Izabeli? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Wyjazd do Bułgarii na wojnę",
          "Nauka języka angielskiego",
          "Badania naukowe z Geistem",
          "Kupno kamienicy Łęckich",
          "Organizacja aplauzu dla Rossiego",
        ],
      },
      correctAnswer: [0, 1, 3, 4],
      metadata: {
        explanation:
          "Wokulski wyjechał na wojnę, żeby zarobić na Izabelę, uczył się angielskiego, bo ona mówiła po angielsku, kupił kamienicę Łęckich i zorganizował aplauz - wszystko dla niej. Badania z Geistem to była alternatywa dla miłości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Kto był ojcem chrzestnym dziecka Wysockiego?",
      content: {
        options: ["Rzecki", "Wokulski", "Szuman", "Ochocki"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski został ojcem chrzestnym dziecka Wysockiego, którego wcześniej uratował z biedy, dając mu pracę i pieniądze na konia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Ile tysięcy rubli długów miał Kazimierz Starski?",
      content: {
        options: [
          "50 tysięcy rubli",
          "75 tysięcy rubli",
          "100 tysięcy rubli",
          "150 tysięcy rubli",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Starski miał 100 tysięcy rubli długów i uciekł zagranicę przed wierzycielami. Był utracjuszem i bawidamkiem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Kto wygłosił przemówienie o małżeństwie jako związku rozumnym, a nie miłosnym?",
      content: {
        options: ["Wokulski", "Ochocki", "Starski", "baron Dalski"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Starski wygłosił wykład w altanie u prezesowej, twierdząc, że małżeństwo należy zawierać rozumnie, kierując się interesami, a nie miłością.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Jaki metal Geist chciał stworzyć jako swoje największe odkrycie?",
      content: {
        options: [
          "metal cięższy od platyny",
          "metal lżejszy od powietrza",
          "szkło cięższe od żelaza",
          "stal lekka jak piórko",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Największym, choć niedokończonym odkryciem Geista miał być materiał lżejszy od powietrza. Obawiał się jednak, że ludzkość użyje go w niewłaściwy sposób.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Ile pieniędzy Wokulski zapisał Ochockiemu w testamencie?",
      content: {
        options: [
          "100 tysięcy rubli",
          "120 tysięcy rubli",
          "140 tysięcy rubli",
          "160 tysięcy rubli",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W testamencie Wokulski zapisał Ochockiemu 140 tysięcy rubli na badania naukowe, Rzeckiemu 25 tysięcy, a Helenie Stawskiej 20 tysięcy rubli.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Kto powiedział, że Wokulski to \u0084polski romantyk\u0094 i \u0084półgłówek\u0094?",
      content: {
        options: ["Rzecki", "Szuman", "Suzin", "książę"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Doktor Szuman nazwał Wokulskiego \u0084polskim romantykiem\u0094 i \u0084półgłówkiem\u0094, krytykując jego ślepą miłość do Izabeli i nierealistyczne oczekiwania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Gdzie mieszkał Ludwik Stawski - zaginiony mąż Heleny?",
      content: {
        options: ["w Paryżu", "w Algierze", "w Moskwie", "w Wiedniu"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mąż Heleny Stawskiej żył i mieszkał w Algierze pod zmienionym nazwiskiem. Później dotarła wiadomość o jego śmierci.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj postacie do ich marzeń i aspiracji.",
      content: {
        matchingType: "characters_dreams",
        leftColumn: [
          { id: "A", text: "Wokulski" },
          { id: "B", text: "Rzecki" },
          { id: "C", text: "Ochocki" },
          { id: "D", text: "Izabela" },
        ],
        rightColumn: [
          { id: 1, text: "Napoleończyk Bonaparte i wolna Polska" },
          { id: 2, text: "Idealny arystokrata jako mąż" },
          { id: 3, text: "Maszyna latająca i kariera naukowa" },
          { id: 4, text: "Miłość Izabeli i szczęście rodzinne" },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 0],
        [2, 2],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Wokulski marzył o Izabeli, Rzecki o Napoleonie i wolnej Polsce, Ochocki o wynalazkach naukowych, Izabela o idealnym arystokratycznym mężu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Uzupełnij informacje o młodości Wokulskiego.",
      content: {
        textWithGaps:
          "W młodości Wokulski pracował jako subiekt u [1], jednocześnie uczęszczając na wykłady w [2]. Za udział w [3] został zesłany na Syberię do [4], gdzie spędził kilka lat ucząc się i pracując.",
        gaps: [
          {
            id: 1,
            options: ["Mincla", "Hopfera", "Szlangbauma", "Suzina"],
          },
          {
            id: 2,
            options: [
              "Uniwersytecie Warszawskim",
              "Akademii",
              "Szkole Głównej",
              "Liceum",
            ],
          },
          {
            id: 3,
            options: [
              "powstaniu listopadowym",
              "powstaniu styczniowym",
              "manifestacjach",
              "strajku",
            ],
          },
          {
            id: 4,
            options: ["Moskwy", "Petersburga", "Irkucka", "Władywostoku"],
          },
        ],
      },
      correctAnswer: [1, 2, 1, 2],
      metadata: {
        explanation:
          "Wokulski pracował u Hopfera, uczył się w Szkole Głównej, został zesłany za powstanie styczniowe do Irkucka.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Które cechy charakteryzują prezesową Zasławską? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Szczodra i hojna wobec potrzebujących",
          "Krytyczna wobec pustych arystokratek",
          "Zakochana niegdyś w stryju Wokulskiego",
          "Przekazała majątek Starskiemu",
          "Prowadziła przytułek dla starców",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "Prezesowa była szczodra, krytyczna wobec \u0084lalek\u0094 jak Izabela, kochała stryja Wokulskiego i prowadziła przytułek. Majątek przekazała na cele charytatywne, nie Starskiemu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj osoby do ich zawodów lub zajęć w powieści.",
      content: {
        matchingType: "people_professions",
        leftColumn: [
          { id: "A", text: "Jumar" },
          { id: "B", text: "Węgiełek" },
          { id: "C", text: "Pani Meliton" },
          { id: "D", text: "Geist" },
        ],
        rightColumn: [
          { id: 1, text: "Kowal i stolarz z Zasławia" },
          { id: 2, text: "Swatka i informatórka" },
          { id: 3, text: "Profesor chemii i wynalazca" },
          { id: 4, text: "Doktor filozofii służący w hotelu" },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 0],
        [2, 1],
        [3, 2],
      ],
      metadata: {
        explanation:
          "Jumar to doktor filozofii pracujący jako służący, Węgiełek - kowal, pani Meliton - swatka, Geist - profesor chemii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Co Wokulski zobaczył w konfesjonale w kościele?",
      content: {
        options: [
          "Izabelę i Starskiego",
          "Izabelę z młodym mężczyzną (Ochockim)",
          "księdza",
          "biedną kobietę z córką",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski ukrył się w konfesjonale i zobaczył Izabelę z młodym mężczyzną, który sprawił jej radość - był to Julian Ochocki, kuzyn Łęckich.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Ile Wokulski zapłacił za klacz wyścigową od Maruszewicza?",
      content: {
        options: ["600 rubli", "800 rubli", "1000 rubli", "1200 rubli"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski kupił klacz za 800 rubli, choć baronowa oczekiwała za nią tylko 600 rubli. Pozostałe 200 rubli bezprawnie przejął Maruszewicz.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Ile wynosił zysk ze spółki handlującej z cesarstwem?",
      content: {
        options: ["10%", "15%", "18%", "20%"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Spółka przyniosła zysk 18%, podczas gdy optymistyczne założenia mówiły o 15%. To pokazało skuteczność zarządzania Wokulskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Kto odziedziczył 60 tysięcy rubli od ciotki Hortensji?",
      content: {
        options: ["Izabela", "Starski", "Ochocki", "Wokulski"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Izabela otrzymała w spadku od ciotki Hortensji 60 tysięcy rubli, co poprawiło jej sytuację finansową.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Uzupełnij informacje o Henryku Szlangbaumie.",
      content: {
        textWithGaps:
          "Henryk Szlangbaum próbował się zasymilować - przyjął [1] i zmienił nazwisko na [2]. Mimo ciężkiej pracy u Polaków nie znalazł [3], więc ostatecznie zrezygnował z [4] i wrócił do żydowskiej tożsamości.",
        gaps: [
          {
            id: 1,
            options: ["judaizm", "katolicyzm", "prawosławie", "luteranizm"],
          },
          {
            id: 2,
            options: ["Szlangowski", "Kowalski", "Nowak", "Henrykowski"],
          },
          {
            id: 3,
            options: ["pieniędzy", "pracy", "akceptacji", "mieszkania"],
          },
          {
            id: 4,
            options: ["religii", "pracy", "polonizacji", "nauki"],
          },
        ],
      },
      correctAnswer: [1, 0, 2, 2],
      metadata: {
        explanation:
          "Szlangbaum przyjął katolicyzm, zmienił nazwisko na Szlangowski, ale nie znalazł akceptacji wśród Polaków i zrezygnował z polonizacji.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Dopasuj cytaty do postaci, które je wypowiedziały lub ich dotyczą.",
      content: {
        matchingType: "quotes_people",
        leftColumn: [
          { id: "A", text: "\u0084Farewell, miss Iza, farewell\u0094" },
          { id: "B", text: "\u0084Non omnis moriar\u0094" },
          {
            id: "C",
            text: "\u0084Świat to teatr, ludzie to marionetki\u0094",
          },
          { id: "D", text: "\u0084Polski romantyk i półgłówek\u0094" },
        ],
        rightColumn: [
          { id: 1, text: "Słowa na krzyżu Węgiełka" },
          { id: 2, text: "Pożegnanie Wokulskiego z Izabelą" },
          { id: 3, text: "Opinia Szumana o Wokulskim" },
          { id: 4, text: "Refleksja Rzeckiego o życiu" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 3],
        [3, 2],
      ],
      metadata: {
        explanation:
          "Wokulski powiedział 'Farewell' Izabeli, Non omnis moriar to napis na krzyżu, refleksja o teatrze to Rzecki, opinia o Wokulskim to Szuman.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Wyjaśnij, kim była pani Wąsowska i jaką rolę odegrała w życiu Wokulskiego.",
      content: {
        work: "Lalka",
        instruction:
          "Opisz postać pani Wąsowskiej i jej relacje z Wokulskim. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "określenie jako młoda wdowa (1 pkt)",
          "wskazanie, że próbowała pomóc Wokulskiemu w zapomnieniu Izabeli (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Pani Wąsowska to młoda, inteligentna wdowa, która przebywała u prezesowej Zasławskiej. Próbowała pomóc Wokulskiemu zapomnieć o Izabeli, flirtowała z nim i dawała mu rady dotyczące kobiet. Rozumiała jego problemy i starała się go wesprzeć.",
        keyWords: ["wdowa", "Zasławek", "pomoc", "Izabela", "rady"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Opisz, jak Wokulski pomagał ludziom w potrzebie.",
      content: {
        work: "Lalka",
        instruction:
          "Podaj co najmniej trzy przykłady pomocy Wokulskiego innym osobom. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "pomoc Wysockiemu (pieniądze, koń, praca) (1 pkt)",
          "pomoc Marii/prostytutce (pieniądze, maszyna do szycia, praca) (1 pkt)",
          "pomoc innym (Helenie Stawskiej, Węgiełkowi, Obermanowi) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wokulski pomagał wielu osobom: dał Wysockiemu 10 rubli, kupił mu konia i zatrudnił w sklepie; pomógł Marii (byłej prostytutce), kupując jej maszynę do szycia i zapewniając pracę; zatrudnił Helenę Stawską jako kasjerkę; dał Węgiełkowi 500 rubli na ślub; oddał Obermanowi zgubione 400 rubli. Pokazuje to jego szlachetność i pozytywistyczną postawę organicznego pracownika.",
        keyWords: [
          "Wysocki",
          "Maria",
          "Helena",
          "Węgiełek",
          "Oberman",
          "pomoc",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Wyjaśnij, dlaczego baron Dalski wyzwał Starskiego na pojedynek.",
      content: {
        work: "Lalka",
        instruction: "Opisz powód pojedynku i jego konsekwencje. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie zdrady żony barona ze Starskim (1 pkt)",
          "informacja o rozwodzie lub rozstaniu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Baron Dalski wyzwał Starskiego na pojedynek, gdy Węgiełek powiedział mu, że jego żona Ewelina zdradza go ze Starskim w ruinach zamku w Zasławiu. Po tym zdarzeniu baron postanowił rozwieść się z żoną.",
        keyWords: ["zdrada", "Ewelina", "Starski", "Zasławie", "rozwód"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Scharakteryzuj postać Maruszewicza.",
      content: {
        work: "Lalka",
        instruction:
          "Opisz Maruszewicza i jego działania w powieści w 3-4 zdaniach. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "określenie jako zdeklasowany szlachcic (1 pkt)",
          "wskazanie, że był oszustem (1 pkt)",
          "wspomnienie o łasce Wokulskiego (zniszczenie dowodów) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Maruszewicz to zdeklasowany szlachcic i oszust. Wyłudzał pieniądze od różnych osób, w tym od Wokulskiego i barona Krzeszowskiego. Sfałszował podpisy i oszukiwał przy transakcjach, jak przy sprzedaży klacz. Mimo że Wokulski odkrył jego oszustwa, okazał mu łaskę i zniszczył wszystkie dowody, aby nie trafił do więzienia.",
        keyWords: ["zdeklasowany", "oszust", "wyłudzał", "łaska", "dowody"],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Ile pieniędzy Wokulski ofiarował pierwszej napotkanej prostytutce?",
      content: {
        options: [
          "wystarczająco, żeby spłacić dług i zacząć nowe życie",
          "100 rubli",
          "50 rubli",
          "tylko radę i wsparcie moralne",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Wokulski obiecał Marii, że spłaci jej dług, załatwi pobyt u sióstr magdalenek i pomoże nauczyć się szyć, dając jej szansę na nowe życie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Za co Wokulski wypłacił premię dżokejowi po wyścigu?",
      content: {
        options: ["50 rubli", "100 rubli", "150 rubli", "200 rubli"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wokulski obiecał dżokejowi 100 rubli dodatkowo (oprócz podstawowego wynagrodzenia) za wygraną w wyścigu z klaczą baronowej.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Które zdania o finale powieści są prawdziwe? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Wokulski prawdopodobnie popełnił samobójstwo",
          "Rzecki umarł w swoim ciemnym pokoju",
          "Izabela wstąpiła do klasztoru",
          "Ochocki został naukowcem w Polsce",
          "Szlangbaum przejął wszystkie interesy Wokulskiego",
        ],
      },
      correctAnswer: [0, 2, 4],
      metadata: {
        explanation:
          "Prawdziwe: Wokulski prawdopodobnie popełnił samobójstwo, Izabela wstąpiła do klasztoru, Szlangbaum przejął interesy. Fałszywe: Rzecki umarł w sklepie (nie w swoim pokoju), Ochocki wyjechał zagranicę.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Lalka",
      question: "Dopasuj wątki poboczne do ich funkcji w strukturze powieści.",
      content: {
        matchingType: "subplots_functions",
        leftColumn: [
          { id: "A", text: "Proces o lalkę" },
          { id: "B", text: "Historia Szlangbauma" },
          { id: "C", text: "Losy Heleny Stawskiej" },
          { id: "D", text: "Pojedynek z baronem" },
        ],
        rightColumn: [
          { id: 1, text: "Krytyka antysemityzmu w społeczeństwie" },
          { id: 2, text: "Kontrast z pustą Izabelą - ideał kobiety" },
          { id: 3, text: "Symbol sądowej sprawiedliwości i zemsty" },
          { id: 4, text: "Honor i kodeks szlachecki vs miłość" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 1],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Proces o lalkę - sprawiedliwość, Szlangbaum - antysemityzm, Helena - kontrast z Izabelą, pojedynek - honor szlachecki.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "POSITIVISM",
      work: "Lalka",
      question:
        "Porównaj postawy Wokulskiego i Ochockiego wobec kobiet i małżeństwa.",
      content: {
        work: "Lalka",
        instruction:
          "Opisz różnice w podejściu obu bohaterów do miłości i życia rodzinnego. (80-120 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "opis Wokulskiego jako romantyka oddanego miłości (1 pkt)",
          "opis Ochockiego jako idealisty naukowego (1 pkt)",
          "kontrast: Wokulski poświęcił naukę dla miłości (1 pkt)",
          "kontrast: Ochocki odrzucił małżeństwo dla nauki (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wokulski i Ochocki reprezentują dwa różne podejścia do życia. Wokulski to romantyk, który całe życie podporządkował miłości do Izabeli - zrezygnował z kariery naukowej u Geista, zarabiał majątek tylko po to, aby ją zdobyć. Ochocki natomiast całkowicie poświęcił się nauce i wynalazkom - odmówił małżeństwa z Izabelą, bo jego pasją była maszyna latająca. Wokulski wybrał miłość zamiast nauki i był nieszczęśliwy, Ochocki wybrał naukę i spełnił się w niej.",
        keyWords: [
          "Wokulski",
          "Ochocki",
          "miłość",
          "nauka",
          "Izabela",
          "wybór",
        ],
      },
    },

    // ======================== KONIEC PYTAŃ LALKA ===================== //

    // ======================== POCZĄTEK PYTAŃ PAN TADEUSZ ================= //

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kto jest autorem 'Pana Tadeusza'?",
      content: {
        options: [
          "Juliusz Słowacki",
          "Adam Mickiewicz",
          "Zygmunt Krasiński",
          "Cyprian Kamil Norwid",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "'Pan Tadeusz' został napisany przez Adama Mickiewicza w latach 1832-1834 w Paryżu, podczas emigracji po upadku powstania listopadowego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jaki jest pełny tytuł epopei Mickiewicza?",
      content: {
        options: [
          "Pan Tadeusz",
          "Pan Tadeusz czyli Ostatni zajazd na Litwie",
          "Pan Tadeusz - historia szlachecka",
          "Pan Tadeusz i Zosia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pełny tytuł brzmi: 'Pan Tadeusz czyli Ostatni zajazd na Litwie. Historia szlachecka z roku 1811 i 1812 we dwunastu księgach wierszem'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "W jakich latach toczy się akcja 'Pana Tadeusza'?",
      content: {
        options: ["1795-1796", "1811-1812", "1830-1831", "1863-1864"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja toczy się w latach 1811-1812, tuż przed wyprawą Napoleona na Moskwę, która dawała Polakom nadzieję na odzyskanie niepodległości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Gdzie głównie toczy się akcja 'Pana Tadeusza'?",
      content: {
        options: [
          "W Warszawie",
          "W Krakowie",
          "W Soplicowie na Litwie",
          "W Wilnie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Akcja toczy się głównie w Soplicowie - majątku rodziny Sopliców na Litwie, oraz w pobliskim zamku Horeszków.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jak ma na imię główny bohater epopei?",
      content: {
        options: ["Stanisław", "Jacek", "Tadeusz", "Gerwazy"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Główny bohater to Tadeusz Soplica, młody szlachcic powracający z Wilna do rodzinnego Soplicowa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kim jest Zosia?",
      content: {
        options: [
          "Córką Sędziego",
          "Córką Telimeny",
          "Wychowanicą Sędziego, wnuczką Stolnika Horeszki",
          "Służącą w Soplicowie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zosia jest wychowanicą Sędziego, a w rzeczywistości wnuczką zamordowanego Stolnika Horeszki. Jej rodzice zginęli na Syberii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kto jest ojcem Tadeusza?",
      content: {
        options: ["Sędzia Soplica", "Jacek Soplica", "Hrabia", "Gerwazy"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ojcem Tadeusza jest Jacek Soplica, ukrywający się jako ksiądz Robak. Sędzia jest stryjem Tadeusza.",
      },
    },

    // POSTACIE - POZIOM 1-2
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kto ukrywa się pod postacią księdza Robaka?",
      content: {
        options: ["Gerwazy", "Jacek Soplica", "Hrabia", "Jankiel"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pod postacią bernardyna księdza Robaka ukrywa się Jacek Soplica, zabójca Stolnika Horeszki, ojciec Tadeusza, który w ten sposób pokutuje za swój czyn.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Który z chartów wygrał zakład według orzeczenia Wojskiego?",
      content: {
        options: ["Sokół", "Kusy", "Oba wygrały równo", "Żaden nie wygrał"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wojski orzekł remis - oba charty jednocześnie dopadły zająca, więc oba wygrały. 'Godzien jest pałac Paca, godzien Pac pałaca'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jak nazywa się słynna szabla Gerwazego?",
      content: {
        options: ["Szczerbiec", "Scyzoryk", "Rózeczka", "Kropidło"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Gerwazy władał słynnym mieczem zwanym Scyzorykiem - ogromnym rapierem, który na końcu utworu podarował generałowi Kniaziewiczowi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Za kogo Tadeusz wziął Telimenę przy pierwszym spotkaniu?",
      content: {
        options: [
          "Za służącą",
          "Za matkę Zosi",
          "Za białą postać na tle drzew - wziął ją za dziewczynę z portretu",
          "Za Hrabinę",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tadeusz zobaczył Telimenę w ogrodzie na tle brzóz i wziął ją za młodą dziewczynę z portretu, który wcześniej podziwiał w Soplicowie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kto zabił niedźwiedzia podczas polowania?",
      content: {
        options: [
          "Hrabia",
          "Tadeusz i ksiądz Robak - obaj strzelili jednocześnie",
          "Asesor",
          "Rejent",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Niedźwiedzia zabili wspólnie Tadeusz i ksiądz Robak, strzelając jednocześnie. To wywołało spór o to, kto powinien otrzymać skórę.",
      },
    },

    // FABUŁA - POZIOM 1-2
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Co było przyczyną zajazdu na Soplicowo?",
      content: {
        options: [
          "Chęć rabunku majątku",
          "Zemsta polityczna",
          "Spór o własność zamku i gniew Dobrzyńskich na Sopliców",
          "Rozkaz Napoleona",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zajazd wywołał spór prawny o zamek Horeszków oraz urazy osobiste szlachty zaściankowej, zwłaszcza Dobrzyńskich, do Soplicy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kto dowodził obroną Soplicowa podczas zajazdu?",
      content: {
        options: ["Sędzia", "Tadeusz", "Ksiądz Robak", "Maciej Rózeczka"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Ksiądz Robak (Jacek Soplica) dowodził obroną, choć jako ksiądz nie walczył sam, tylko dawał rady i organizował obronę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "W jakiej porze roku rozpoczyna się akcja 'Pana Tadeusza'?",
      content: {
        options: ["Wiosną", "Latem", "Jesienią", "Zimą"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja rozpoczyna się latem - w inwokacji czytamy o 'pagórkach zielonych' i 'łąkach zielonych, szeroko nad błękitnym Niemnem rozciągnionych'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Jak nazywał się ostatni żyjący niedźwiedź w okolicach Soplicowa?",
      content: {
        options: ["Kusy", "Dobrzyński", "Bestia", "Matecznik"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Niedźwiedź nazywał się 'Dobrzyński' od Macieja Dobrzyńskiego, który kiedyś próbował go zabić, ale tylko postrzał w ucho.",
      },
    },

    // MOTYWY I SYMBOLE - POZIOM 2
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Co symbolizuje zegar w dworze Sopliców z kurantem grającym Mazurka Dąbrowskiego?",
      content: {
        options: [
          "Bogactwo rodziny",
          "Nowoczesność dworu",
          "Pamięć o tradycji i nadzieję na niepodległość",
          "Umiłowanie muzyki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zegar z kurantem grającym Mazurka Dąbrowskiego symbolizuje pamięć o polskiej tradycji i nadzieję na odzyskanie niepodległości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Co oznacza tytuł 'Ostatni zajazd na Litwie'?",
      content: {
        options: [
          "Ostatnie polowanie",
          "Ostatni pojedynek",
          "Koniec tradycji szlacheckich najazdów zbrojnych na sąsiadów",
          "Ostatnia bitwa z Rosjanami",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zajazd na Soplicowo to ostatni tradycyjny szlachecki najazd zbrojny w sporze sąsiedzkim - symbol odchodzącego świata staropolskich obyczajów.",
      },
    },

    // PYTANIA WIELOKROTNEGO WYBORU
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Które postacie zakochane były w Zosi? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Tadeusz Soplica",
          "Hrabia",
          "Sak Dobrzyński",
          "Ksiądz Robak",
          "Asesor",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "W Zosi zakochani byli Tadeusz (którego ona też pokochała) oraz Sak Dobrzyński (syn Macieja Chrzciciela). Hrabia był zainteresowany Telimeną.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Które zwierzęta odgrywają ważną rolę w fabule? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Charty Kusy i Sokół",
          "Niedźwiedź",
          "Koń Hrabiego",
          "Zając podczas polowania",
          "Kogut w Soplicowie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Ważne role odgrywają: charty (spór o lepszego), niedźwiedź (polowanie), zając (rozstrzygnięcie sporu o charty). Koń i kogut nie mają istotnego znaczenia.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Jakie warstwy społeczne są przedstawione w 'Panu Tadeuszu'? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Szlachta zamożna (Sędzia, Telimena)",
          "Szlachta zaściankowa (Dobrzyńscy)",
          "Arystokracja (Hrabia)",
          "Chłopi",
          "Mieszczaństwo",
          "Żydzi (Jankiel)",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 5],
      metadata: {
        explanation:
          "W utworze przedstawiona jest szlachta zamożna i zaściankowa, arystokracja, chłopi oraz Żydzi. Brak jest mieszczaństwa - akcja toczy się na wsi.",
      },
    },

    // DOPASOWYWANIE
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Dopasuj postać do jej charakterystycznego przedmiotu lub atrybutu.",
      content: {
        matchingType: "character_attribute",
        leftColumn: [
          { id: "A", text: "Gerwazy" },
          { id: "B", text: "Wojski" },
          { id: "C", text: "Telimena" },
          { id: "D", text: "Maciej Dobrzyński" },
        ],
        rightColumn: [
          { id: 1, text: "Rózeczka (szabla)" },
          { id: 2, text: "tabakiera" },
          { id: 3, text: "Scyzoryk" },
          { id: 4, text: "modne stroje paryskie" },
        ],
      },
      correctAnswer: [
        [0, 2], // Gerwazy - Scyzoryk
        [1, 1], // Wojski - tabakiera
        [2, 3], // Telimena - modne stroje
        [3, 0], // Maciej - Rózeczka
      ],
      metadata: {
        explanation:
          "Gerwazy władał Scyzorykiem, Wojski słynął z tabakiery, Telimena nosiła modne stroje z Petersburga, a Maciej Rózeczka miał słynną szablę Rózeczkę.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Dopasuj zdarzenie do księgi, w której miało miejsce.",
      content: {
        matchingType: "event_book",
        leftColumn: [
          { id: "A", text: "Powrót Tadeusza do Soplicowa" },
          { id: "B", text: "Polowanie na niedźwiedzia" },
          { id: "C", text: "Zajazd na Soplicowo" },
        ],
        rightColumn: [
          { id: 1, text: "Księga I" },
          { id: 2, text: "Księga IV" },
          { id: 3, text: "Księga VIII" },
        ],
      },
      correctAnswer: [
        [0, 0], // Powrót - Księga I
        [1, 1], // Polowanie - Księga IV
        [2, 2], // Zajazd - Księga VIII
      ],
      metadata: {
        explanation:
          "Powrót Tadeusza to Księga I ('Gospodarstwo'), polowanie to Księga IV ('Dyplomatyka i łowy'), zajazd to Księga VIII ('Zajazd').",
      },
    },

    // CYTATY - POZIOM 2
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Kto wypowiada słowa: 'Kochajmy się!'?",
      content: {
        options: [
          "Tadeusz do Zosi",
          "To tytuł ostatniej księgi",
          "Sędzia podczas uczty",
          "Ksiądz Robak przed śmiercią",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "'Kochajmy się' to tytuł XII (ostatniej) księgi Pana Tadeusza, będący zarazem przesłaniem całego utworu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Uzupełnij cytat z inwokacji: 'Litwo! Ojczyzno moja! ty jesteś jak...'",
      content: {
        options: ["słońce", "matka", "zdrowie", "raj"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pełny cytat: 'Litwo! Ojczyzno moja! ty jesteś jak zdrowie. Ile cię trzeba cenić, ten tylko się dowie, kto cię stracił.'",
      },
    },

    // WYDARZENIA HISTORYCZNE
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jakie wydarzenie historyczne kończy akcję 'Pana Tadeusza'?",
      content: {
        options: [
          "Bitwa pod Grunwaldem",
          "Powstanie listopadowe",
          "Wkroczenie wojsk Napoleona na Litwę w 1812",
          "Trzeci rozbiór Polski",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Akcja kończy się wkroczeniem wojsk napoleońskich na Litwę w 1812 roku podczas wyprawy na Moskwę. To daje nadzieję na odzyskanie niepodległości.",
      },
    },

    // GATUNEK I KOMPOZYCJA
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Ile ksiąg liczy 'Pan Tadeusz'?",
      content: {
        options: ["10", "12", "14", "24"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "'Pan Tadeusz' składa się z 12 ksiąg pisanych wierszem (13-zgłoskowcem). Jest to nawiązanie do tradycji epopei antycznych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jakim wierszem napisany jest 'Pan Tadeusz'?",
      content: {
        options: [
          "8-zgłoskowcem",
          "11-zgłoskowcem",
          "13-zgłoskowcem",
          "Wierszem białym",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "'Pan Tadeusz' napisany jest polskim 13-zgłoskowcem (7+6) z rymami parzystymi (aabbcc...). To tradycyjny polski wers epicki.",
      },
    },

    // PYTANIA O SZCZEGÓŁY FABULARNE
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Co Zosia dała Tadeuszowi przed jego wyjazdem?",
      content: {
        options: ["Pierścionek", "List", "Obrazek i relikwiarz", "Chusteczkę"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zosia dała Tadeuszowi obrazek ze świętą Genowefą i relikwiarz z suknią świętego Józefa, mówiąc 'niech pamięta o Zosi'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Na jakim instrumencie grał Jankiel podczas ostatniej uczty?",
      content: {
        options: [
          "Na skrzypcach",
          "Na fortepianie",
          "Na cymbałach",
          "Na flecie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Jankiel grał na cymbałach. Jego koncert był punktem kulminacyjnym uczty - zagrał poloneza Trzeciego Maja i 'Jeszcze Polska nie zginęła'.",
      },
    },

    // TRADYCJE I OBYCZAJE
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Jakie polskie obyczaje szlacheckie przedstawione są w utworze? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Polowanie",
          "Zajazd",
          "Polonez",
          "Uczta",
          "Sejmik",
          "Zaręczyny",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 4, 5],
      metadata: {
        explanation:
          "Wszystkie wymienione to tradycyjne obyczaje szlacheckie przedstawione w 'Panu Tadeuszu' - polowania, zajazdy, tańce, uczty, sejmiki i zaręczyny.",
      },
    },

    // PYTANIA INTERPRETACYJNE - POZIOM 2
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Dlaczego Jacek Soplica zabił Stolnika Horeszkę?",
      content: {
        options: [
          "Z zemsty politycznej",
          "Dla pieniędzy",
          "Z zazdrości miłosnej - kochał córkę Stolnika",
          "Z rozkazu Rosjan",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Jacek zabił Stolnika w afekcie z zazdrości - kochał jego córkę Ewę, ale Stolnik wydał ją za wojewodę. Jacek strzelił w przypływie rozpaczy i gniewu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Co symbolizuje koncert Jankiela w ostatniej księdze?",
      content: {
        options: [
          "Tylko rozrywkę podczas uczty",
          "Historię Polski i nadzieję na niepodległość",
          "Talent muzyczny Żydów",
          "Bogactwo Sopliców",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Koncert Jankiela to muzyczna historia Polski - od radości (Trzeci Maj), przez upadek (Targowica), rzeź Pragi, tułaczkę, po nadzieję (Mazurek Dąbrowskiego).",
      },
    },

    // PROSTA ANALIZA LITERACKA
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jaki typ narracji dominuje w 'Panu Tadeuszu'?",
      content: {
        options: [
          "Pierwszoosobowa",
          "Trzecioosobowa wszechwiedzący narrator",
          "Drugoosobowa",
          "Strumień świadomości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W 'Panu Tadeuszu' dominuje narracja trzecioosobowa z narratorem wszechwiedzącym, choć miejscami ujawnia się 'ja' narratora (np. w inwokacji i epilogu).",
      },
    },

    // PYTANIA OTWARTE - PISEMNE (20-30% wszystkich)
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Wymień trzy główne rody szlacheckie występujące w 'Panu Tadeuszu'.",
      content: {
        expectedKeywords: ["Soplicowie", "Horeszkowie", "Dobrzyńscy"],
        maxWords: 10,
      },
      metadata: {
        explanation:
          "Główne rody to: Soplicowie (Sędzia, Tadeusz), Horeszkowie (dawni właściciele zamku), Dobrzyńscy (szlachta zaściankowa).",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Krótko wyjaśnij, dlaczego 'Pan Tadeusz' nazywany jest 'epopeją narodową'.",
      content: {
        expectedKeywords: [
          "historia",
          "tradycja",
          "obyczaje",
          "Polska",
          "naród",
        ],
        maxWords: 50,
      },
      metadata: {
        explanation:
          "'Pan Tadeusz' to epopeja narodowa, bo przedstawia historię i obyczaje polskiej szlachty, stanowi obraz ginącego świata Rzeczpospolitej i wyraża tęsknotę za ojczyzną.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Opisz krótko, jak zmieniają się uczucia Tadeusza - od Telimeny do Zosi.",
      content: {
        expectedKeywords: [
          "zauroczenie",
          "rozczarowanie",
          "miłość",
          "dojrzewanie",
        ],
        maxWords: 60,
      },
      metadata: {
        explanation:
          "Tadeusz najpierw ulega zauroczeniu dojrzałą Telimeną, ale szybko się rozczarowuje jej próżnością. Stopniowo odkrywa prawdziwe uczucie do młodej, skromnej Zosi.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Podaj tytuły trzech dowolnych ksiąg 'Pana Tadeusza'.",
      content: {
        expectedKeywords: [
          "Gospodarstwo",
          "Zamek",
          "Umizgi",
          "Dyplomatyka",
          "Kłótnia",
          "Zaścianek",
          "Rada",
          "Zajazd",
          "Bitwa",
          "Emigracja",
          "Rok 1812",
          "Kochajmy się",
        ],
        maxWords: 15,
      },
      metadata: {
        explanation:
          "Przykładowe tytuły: 'Gospodarstwo', 'Zamek', 'Umizgi', 'Dyplomatyka i łowy', 'Kłótnia', 'Zaścianek', 'Rada', 'Zajazd', 'Bitwa', 'Emigracja. Jacek', 'Rok 1812', 'Kochajmy się'.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Wyjaśnij symbolikę tytułu ostatniej księgi - 'Kochajmy się'.",
      content: {
        expectedKeywords: ["pojednanie", "zgoda", "miłość", "jedność", "naród"],
        maxWords: 70,
      },
      metadata: {
        explanation:
          "'Kochajmy się' to wezwanie do narodowej zgody i jedności. Po wszystkich sporach i walkach następuje pojednanie - osobiste (małżeństwa) i narodowe (nadzieja na niepodległość).",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Opisz krótko postać Gerwazego - kim był i jaką rolę odgrywał.",
      content: {
        expectedKeywords: [
          "Klucznik",
          "Horeszków",
          "wierny",
          "zemsta",
          "Scyzoryk",
        ],
        maxWords: 60,
      },
      metadata: {
        explanation:
          "Gerwazy to Klucznik rodu Horeszków, wierny sługa pragnący zemsty za śmierć swojego pana. Posługuje się słynnym mieczem Scyzorykiem i organizuje zajazd na Soplicowo.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Która postać reprezentuje typ romantycznego indywidualisty w 'Panu Tadeuszu'?",
      content: {
        options: ["Tadeusz", "Hrabia", "Sędzia", "Gerwazy"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hrabia to jedyna postać o cechach romantycznego indywidualisty - melancholik, esteta, człowiek tajemniczy, marzyciel oderwany od rzeczywistości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Jak można interpretować postać Telimeny w kontekście społecznym?",
      content: {
        options: [
          "Przedstawicielka tradycyjnej szlachty",
          "Symbol nowych, kosmopolitycznych wpływów kultury miejskiej",
          "Typowa matka polska",
          "Wzór cnót niewieścich",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Telimena reprezentuje nowe wpływy - mieszkała w Petersburgu, nosi modne stroje, jest kokieteryjną damą salonową, obcą tradycyjnemu światu szlacheckiemu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Dlaczego postać Jacka Soplicy/Robaka można uznać za tragiczną?",
      content: {
        options: [
          "Bo był biedny",
          "Bo popełnił zbrodnię z miłości i całe życie pokutował",
          "Bo był księdzem",
          "Bo umarł młodo",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Jacek to postać tragiczna - zabił z miłości, stracił wszystko (miłość, honor, ojczyznę), całe życie pokutował jako Robak, by odkupić winę.",
      },
    },

    // SYMBOLIKA I MOTYWY - POZIOM 3
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Co symbolizuje spór o zamek między Hrabią a Soplicami?",
      content: {
        options: [
          "Tylko chciwość szlachty",
          "Konflikt między starą arystokracją a nową szlachtą",
          "Spór rodzinny",
          "Walkę o kobietę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Spór o zamek symbolizuje konflikt między odchodzącą arystokracją (Horeszkowie/Hrabia) a wzmacniającą się szlachtą średnią (Soplicowie).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jaka jest funkcja motywu polowania w strukturze utworu?",
      content: {
        options: [
          "Tylko rozrywka dla czytelnika",
          "Pokazanie obyczajów myśliwskich",
          "Metafora sporów społecznych i walki o dominację",
          "Wypełnienie fabuły",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Polowanie to metafora - spory o charty i niedźwiedzia odzwierciedlają konflikty społeczne, rywalizację między postaciami i walkę o pozycję.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Co symbolizuje ogród w Soplicowie?",
      content: {
        options: [
          "Bogactwo rodziny",
          "Arkadyjską sielankę i utracony raj dzieciństwa",
          "Nowoczesne gospodarstwo",
          "Tylko tło wydarzeń",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ogród to symbol arkadii, utraconego raju dzieciństwa i harmonii. To przestrzeń idealizowana, związana z niewinnością i szczęściem.",
      },
    },

    // KONTEKST HISTORYCZNY - POZIOM 2-3
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Dlaczego Mickiewicz umieścił akcję w latach 1811-1812?",
      content: {
        options: [
          "Bo wtedy się urodził",
          "To czas nadziei na odzyskanie niepodległości dzięki Napoleonowi",
          "Przypadkowy wybór",
          "Bo wtedy pisał utwór",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Lata 1811-1812 to czas wielkiej nadziei - Napoleon szedł na Moskwę, Polacy wierzyli że pomoże odbudować Rzeczpospolitą.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Jakie pokolenia idealistów reprezentują główne postacie według koncepcji 'trzech pokoleń'?",
      content: {
        options: [
          "Wszyscy to jedno pokolenie",
          "Rzecki (bonapartysta), Jacek (powstaniec), młodzież (nauka)",
          "Maciej Dobrzyński (konfederaci barscy), Jacek (powstaniec), Tadeusz (nowe czasy)",
          "Nie ma takiego podziału",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Trzy pokolenia idealistów: konfederaci barscy (Maciej), powstańcy (Jacek/Robak), młode pokolenie czekające na Napoleona (Tadeusz).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jak Mickiewicz przedstawia stosunek do Napoleona?",
      content: {
        options: [
          "Jednoznacznie pozytywny - Napoleon jako zbawca",
          "Całkowicie negatywny",
          "Ambiwalentny - nadzieja połączona z wątpliwościami (postać Macieja)",
          "Nie porusza tego tematu",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Stosunek jest ambiwalentny - większość wierzy w Napoleona, ale Maciej Dobrzyński wyraża wątpliwości ('idzie do Moskwy bez Boga').",
      },
    },

    // KOMPOZYCJA I NARRACJA - POZIOM 3
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jaka jest funkcja retrospekcji w 'Panu Tadeuszu'?",
      content: {
        options: [
          "Tylko wydłużenie fabuły",
          "Wyjaśnienie tajemnic przeszłości kluczowych dla zrozumienia teraźniejszości",
          "Urozmaicenie narracji",
          "Pokazanie historii Polski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Retrospekcje (np. historia Jacka i Stolnika) wyjaśniają motywy działań postaci i źródła konfliktów, są kluczowe dla zrozumienia fabuły.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Dlaczego 'Pan Tadeusz' określany jest mianem 'epopei odmienionej'?",
      content: {
        options: [
          "Bo jest krótszy niż klasyczne epopeje",
          "Bo łączy cechy eposu z sielanką, nie ma wielkiego bohatera epickiego",
          "Bo jest napisany prozą",
          "Bo nie ma bóstw",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "'Pan Tadeusz' to epopeja odmieniona - łączy epos z sielanką, zamiast heroicznych czynów opisuje codzienne życie szlachty.",
      },
    },

    // JĘZYK I STYL - POZIOM 3
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jaki zabieg stylistyczny dominuje w opisach przyrody?",
      content: {
        options: [
          "Naturalizm",
          "Animizacja i antropomorfizacja",
          "Abstrakcja",
          "Minimalizm",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mickiewicz stosuje animizację i antropomorfizację - przyroda jest ożywiona, uczestniczy w wydarzeniach (np. drzewa 'patrzą', stawy 'rozmawiają').",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jaka jest funkcja języka gawędowego w 'Panu Tadeuszu'?",
      content: {
        options: [
          "Tylko ozdoba stylistyczna",
          "Stworzenie atmosfery autentyczności i swojskości",
          "Utrudnienie lektury",
          "Pokazanie niewykształcenia szlachty",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Język gawędowy (dygresje, anegdoty, bezpośrednie zwroty) tworzy atmosferę swojskości, autentyczności i szlacheckiej gawędy.",
      },
    },

    // INTERPRETACJA ZAKOŃCZENIA - POZIOM 3
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jak interpretować scenę koncertu Jankiela?",
      content: {
        options: [
          "Rozrywka podczas uczty",
          "Muzyczna synteza historii Polski i pojednania narodowego",
          "Pokaz umiejętności muzycznych",
          "Element folklorystyczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Koncert Jankiela to muzyczna synteza - historia Polski od triumfu przez upadek po nadzieję, symbol pojednania wszystkich warstw narodu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Co oznacza gest uwolnienia chłopów przez Tadeusza?",
      content: {
        options: [
          "Tylko hojność",
          "Symbol nowego porządku społecznego i idei demokratycznych",
          "Naśladowanie Napoleona",
          "Chęć zubożenia Hrabiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Uwolnienie chłopów to symbol nowych idei demokratycznych, zapowiedź przemian społecznych i końca feudalizmu.",
      },
    },

    // WIELOKROTNY WYBÓR - POZIOM 2-3
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Które elementy świadczą o nostalgicznym charakterze utworu? (wybierz wszystkie)",
      content: {
        options: [
          "Idealizacja przeszłości",
          "Inwokacja do ojczyzny",
          "Epilog napisany na emigracji",
          "Szczegółowe opisy obyczajów",
          "Wątek miłosny",
          "Motyw 'kraju lat dziecinnych'",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 5],
      metadata: {
        explanation:
          "O nostalgii świadczą: idealizacja przeszłości, tęsknota w inwokacji, epilog emigracyjny, dokumentowanie ginących obyczajów, motyw dzieciństwa. Wątek miłosny nie jest nostalgiczny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Które konflikty społeczne przedstawia Mickiewicz? (wybierz wszystkie)",
      content: {
        options: [
          "Arystokracja vs szlachta średnia",
          "Szlachta zaściankowa vs szlachta zamożna",
          "Starzy (tradycja) vs młodzi (nowoczesność)",
          "Patrioci vs zdrajcy",
          "Polacy vs Rosjanie",
          "Idealiści vs realiści",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 4],
      metadata: {
        explanation:
          "Mickiewicz przedstawia konflikty: między warstwami szlachty, pokoleniami, patriotami i kolaborantami, Polakami i zaborcami. Konflikt idealistów z realistami jest marginalny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Które elementy kultury sarmackiej przedstawione są w utworze? (wybierz wszystkie)",
      content: {
        options: [
          "Kontusz i żupan",
          "Zajazd",
          "Gościnność",
          "Kult przodków",
          "Wolność szlachecka",
          "Religijność",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 4, 5],
      metadata: {
        explanation:
          "Wszystkie wymienione to elementy kultury sarmackiej: strój, obyczaje (zajazd, gościnność), wartości (kult przodków, wolność), religijność.",
      },
    },

    // DOPASOWANIA - POZIOM 3
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Dopasuj postać do jej funkcji symbolicznej w utworze.",
      content: {
        matchingType: "character_symbol",
        leftColumn: [
          { id: "A", text: "Jacek/Robak" },
          { id: "B", text: "Hrabia" },
          { id: "C", text: "Jankiel" },
          { id: "D", text: "Maciej Dobrzyński" },
        ],
        rightColumn: [
          { id: 1, text: "Romantyczny indywidualista" },
          { id: 2, text: "Pokuta i odkupienie" },
          { id: 3, text: "Tradycja i konserwatyzm" },
          { id: 4, text: "Integracja społeczna różnych grup" },
        ],
      },
      correctAnswer: [
        [0, 1], // Jacek - Pokuta
        [1, 0], // Hrabia - Romantyk
        [2, 3], // Jankiel - Integracja
        [3, 2], // Maciej - Tradycja
      ],
      metadata: {
        explanation:
          "Jacek symbolizuje pokutę i odkupienie win, Hrabia - romantyzm, Jankiel - harmonijne współżycie różnych grup, Maciej - przywiązanie do tradycji.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Dopasuj motyw literacki do jego znaczenia w 'Panu Tadeuszu'.",
      content: {
        matchingType: "motif_meaning",
        leftColumn: [
          { id: "A", text: "Motyw ogrodu" },
          { id: "B", text: "Motyw polowania" },
          { id: "C", text: "Motyw uczty" },
          { id: "D", text: "Motyw domu" },
        ],
        rightColumn: [
          { id: 1, text: "Pojednanie i wspólnota" },
          { id: 2, text: "Arkadia i utracony raj" },
          { id: 3, text: "Konflikty i rywalizacja" },
          { id: 4, text: "Tradycja i ciągłość" },
        ],
      },
      correctAnswer: [
        [0, 1], // Ogród - Arkadia
        [1, 2], // Polowanie - Konflikty
        [2, 0], // Uczta - Pojednanie
        [3, 3], // Dom - Tradycja
      ],
      metadata: {
        explanation:
          "Ogród = arkadyjski raj, polowanie = metafora konfliktów społecznych, uczta = moment pojednania, dom = symbol tradycji i ciągłości.",
      },
    },

    // ANALIZA PORÓWNAWCZA - POZIOM 3
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Czym różni się 'Pan Tadeusz' od typowej epopei romantycznej?",
      content: {
        options: [
          "Jest dłuższy",
          "Ma więcej bohaterów",
          "Opisuje codzienność zamiast czynów heroicznych",
          "Jest napisany prozą",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "'Pan Tadeusz' różni się od romantycznych epopei skupieniem na codzienności, zwyczajnych ludziach i obyczajach, a nie na heroicznych czynach.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jak Mickiewicz godzi elementy klasyczne z romantycznymi?",
      content: {
        options: [
          "Nie godzi - są tylko elementy romantyczne",
          "Klasyczna forma epopei z romantyczną nostalgią i uczuciowością",
          "Są tylko elementy klasyczne",
          "Przypadkowe połączenie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mickiewicz łączy klasyczną formę epopei (12 ksiąg, wers epicki) z romantyczną treścią (nostalgia, uczucia, indywidualizm Hrabiego).",
      },
    },

    // PYTANIA KONTEKSTOWE - POZIOM 2-3
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Dlaczego Mickiewicz napisał 'Pana Tadeusza' na emigracji?",
      content: {
        options: [
          "Dla zarobku",
          "Z tęsknoty za ojczyzną po upadku powstania listopadowego",
          "Na zamówienie wydawcy",
          "Dla rozrywki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mickiewicz pisał 'Pana Tadeusza' w Paryżu z tęsknoty za utraconą ojczyzną po klęsce powstania listopadowego (1831).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jak epilog zmienia perspektywę interpretacji całego utworu?",
      content: {
        options: [
          "Nie zmienia",
          "Ujawnia osobisty, nostalgiczny charakter i genezę utworu",
          "Zaprzecza wcześniejszej treści",
          "Jest tylko dodatkiem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Epilog ujawnia osobistą perspektywę - utwór powstał z tęsknoty emigranta, jako próba ocalenia w literaturze ginącego świata.",
      },
    },

    // PYTANIA OTWARTE - 20-30%
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Wyjaśnij, na czym polega tragizm postaci Jacka Soplicy.",
      content: {
        expectedKeywords: [
          "miłość",
          "zabójstwo",
          "pokuta",
          "honor",
          "wygnanie",
          "odkupienie",
        ],
        maxWords: 80,
      },
      metadata: {
        explanation:
          "Jacek to bohater tragiczny - z miłości do Ewy zabił jej ojca, stracił honor, ojczyznę, ukochana zmarła. Całe życie pokutował jako Robak, walcząc za Polskę.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Opisz rolę przyrody w 'Panu Tadeuszu' - podaj 2-3 funkcje.",
      content: {
        expectedKeywords: [
          "tło",
          "uczestnik",
          "symbol",
          "arkadia",
          "ojczyzna",
          "harmonia",
        ],
        maxWords: 70,
      },
      metadata: {
        explanation:
          "Przyroda: 1) tło wydarzeń i element sielanki, 2) uczestnik akcji (antropomorfizacja), 3) symbol ojczyzny i utraconego raju, 4) element harmonii świata.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Porównaj postacie Telimeny i Zosi - wskaż główne różnice.",
      content: {
        expectedKeywords: [
          "wiek",
          "doświadczenie",
          "prostota",
          "kokieteria",
          "miasto",
          "wieś",
          "tradycja",
          "nowoczesność",
        ],
        maxWords: 80,
      },
      metadata: {
        explanation:
          "Telimena: dojrzała, kokieteryjna, miejska, nowoczesna, wyrachowana. Zosia: młoda, niewinna, wiejska, tradycyjna, naturalna. Reprezentują dwa modele kobiecości.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Wyjaśnij symbolikę zajazdu jako 'ostatniego zajazdu na Litwie'.",
      content: {
        expectedKeywords: [
          "tradycja",
          "koniec",
          "epoka",
          "szlachta",
          "obyczaje",
          "przemiana",
        ],
        maxWords: 70,
      },
      metadata: {
        explanation:
          "Ostatni zajazd symbolizuje koniec epoki - staropolskich obyczajów, tradycyjnych sporów szlacheckich rozwiązywanych siłą. Zapowiada nowe czasy i nowy porządek.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Jak Mickiewicz przedstawia relacje polsko-żydowskie na przykładzie Jankiela?",
      content: {
        expectedKeywords: [
          "harmonia",
          "szacunek",
          "patriotyzm",
          "wspólnota",
          "tolerancja",
          "integracja",
        ],
        maxWords: 60,
      },
      metadata: {
        explanation:
          "Jankiel to przykład harmonijnego współżycia - szanowany przez szlachtę, patriota polski ('Żyd poczciwy Ojczyznę jako Polak kochał'), symbol tolerancji i integracji.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 5,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question:
        "Zinterpretuj znaczenie słów 'Kochajmy się' jako przesłania utworu.",
      content: {
        expectedKeywords: [
          "pojednanie",
          "zgoda",
          "jedność",
          "naród",
          "przebaczenie",
          "wspólnota",
          "miłość",
        ],
        maxWords: 90,
      },
      metadata: {
        explanation:
          "'Kochajmy się' to wezwanie do narodowej zgody, przebaczenia win, pojednania po sporach. To przesłanie jedności wobec nadziei na niepodległość, uniwersalne przesłanie miłości.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Wyjaśnij, dlaczego 'Pan Tadeusz' jest utworem nostalgicznym.",
      content: {
        expectedKeywords: [
          "emigracja",
          "tęsknota",
          "przeszłość",
          "idealizacja",
          "utrata",
          "pamięć",
          "dzieciństwo",
        ],
        maxWords: 80,
      },
      metadata: {
        explanation:
          "Nostalgia wynika z: sytuacji autora (emigracja), idealizacji przeszłości, tęsknoty za utraconą ojczyzną, chęci ocalenia ginącego świata w pamięci, motywu 'kraju lat dziecinnych'.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Jakie cechy epopei zachowuje 'Pan Tadeusz'? Wymień 3-4.",
      content: {
        expectedKeywords: [
          "inwokacja",
          "księgi",
          "narrator",
          "wers",
          "katalog",
          "porównania",
          "epitety",
        ],
        maxWords: 60,
      },
      metadata: {
        explanation:
          "Cechy epopei: inwokacja, podział na 12 ksiąg, narrator wszechwiedzący, wers epicki (13-zgłoskowiec), rozbudowana fabuła, katalogi postaci, porównania homeryckie, stały epitet.",
      },
    },
    // ======================= KONIEC PYTAŃ PAN TADEUSZ ===================//

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

  const exercisesWithTags = exercises.map((exercise) => ({
    ...exercise,
    tags: [
      exercise.category.toLowerCase(),
      exercise.type.toLowerCase(),
      `difficulty-${exercise.difficulty}`,
      exercise.epoch ? exercise.epoch.toLowerCase() : null,
      `batch-2025-01`,
      ...(exercise.tags || []), // Dodaj istniejące tagi jeśli są
    ].filter((tag): tag is string => tag !== null),
  }));

  // Wstaw do bazy
  for (const exercise of exercisesWithTags) {
    try {
      await prisma.exercise.create({
        data: exercise,
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
