// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  const exercises = [
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Odyseja",
      question: "Jak nazywał się syn Odyseusza?",
      content: {
        options: ["Telemach", "Parys", "Hektor", "Patrokles"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Telemach był synem Odyseusza i Penelopy. W Odysei opisane są także jego przygody.",
      },
    },
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
          "Przeczytałem książkę.",
          "Dziś idę do szkoły.",
          "Bawiłem się z kolegą.",
          "Jutro pójdę na spacer.",
        ],
      },
      correctAnswer: [0, 1, 3],
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
          "Przymiotniki: piękny, czerwony. „Pięknie” to przysłówek, „czerwień” to rzeczownik.",
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
          "Wykrzykniki wyrażają emocje: ach, ojej. „Bardzo” i „szybko” to przysłówki.",
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
      question: "Podaj przeciwieństwo wyrazu „duży”.",
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
      question: "Wyjaśnij znaczenie frazeologizmu „mieć węża w kieszeni”.",
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
      question: "Przekształć zdanie na stronę bierną: „Jan czyta książkę.”",
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
      question: "Rozwiń skrót „np.” i użyj go w zdaniu.",
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
      question: "Kto napisał „Ferdydurke”?",
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
      question: "Kto jest autorem cyklu „Trenów”?",
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
      question: "Wyjaśnij symbolikę chochoła w finale „Wesela” Wyspiańskiego.",
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
      question: "Jak w „Ferdydurke” Gombrowicz przedstawia problem formy?",
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
        "Zinterpretuj tytuł „Wesela” Wyspiańskiego w kontekście problematyki utworu (150-200 słów).",
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

    // =========== POCZĄTEK PYTAŃ STAROŻYTNOŚĆ/ANTYK ==============//
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Która data oznacza koniec epoki starożytności?",
      content: {
        options: [
          "323 r. p.n.e.",
          "44 r. p.n.e.",
          "476 r. n.e.",
          "1453 r. n.e.",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Koniec starożytności to rok 476 n.e., kiedy germański wódz Odoaker obalił ostatniego cesarza rzymskiego Romulusa Augustulusa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Skąd pochodzi nazwa 'antyk'?",
      content: {
        options: [
          "z greckiego słowa 'antikos'",
          "z łacińskiego słowa 'antiquus'",
          "z egipskiego słowa 'antykwa'",
          "z fenickiego słowa 'antik'",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Nazwa antyk pochodzi od łacińskiego słowa 'antiquus', co oznacza 'dawny, zamierzchły, stary'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co oznacza greckie słowo 'philosophia'?",
      content: {
        options: [
          "miłość do piękna",
          "miłość do mądrości",
          "miłość do prawdy",
          "miłość do nauki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Filozofia pochodzi z greckiego: phileo – miłuję, sophia – mądrość. Oznacza 'umiłowanie mądrości'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który filozof wypowiedział słynne zdanie 'Wiem, że nic nie wiem'?",
      content: {
        options: ["Platon", "Arystoteles", "Sokrates", "Heraklit"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Sokrates powtarzał 'Wiem, że nic nie wiem', przyznając się do niewiedzy i ciągłego dążenia do poznania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Kto był uczniem Sokratesa i założycielem Akademii Platońskiej?",
      content: {
        options: ["Arystoteles", "Platon", "Diogenes", "Epikur"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Platon był uczniem Sokratesa i założył Akademię Platońską, tworząc filozofię idealistyczną.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który filozof powiedział 'Wszystko płynie' i 'Nie można wejść dwa razy do tej samej rzeki'?",
      content: {
        options: [
          "Sokrates",
          "Heraklit z Efezu",
          "Tales z Miletu",
          "Pitagoras",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Heraklit z Efezu głosił, że wszystko się zmienia. Jego maksyma to 'Panta rhei' – 'Wszystko płynie'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto założył szkołę filozoficzną stoików?",
      content: {
        options: ["Epikur", "Zenon z Kition", "Diogenes", "Arystyp"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zenon z Kition założył szkołę stoików, która głosiła życie w zgodzie z rozumem i naturą.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który filozof był twórcą epikureizmu?",
      content: {
        options: ["Zenon", "Arystyp", "Epikur z Samos", "Diogenes"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Epikur z Samos był twórcą epikureizmu – filozofii dążenia do szczęścia przez przyjemność rozumianą jako brak cierpienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Co głosili cynicy, czyli przedstawiciele greckiej szkoły filozoficznej?",
      content: {
        options: [
          "że trzeba dążyć do przyjemności",
          "że trzeba żyć w zgodzie z naturą i rozumem, odrzucając normy społeczne",
          "że prawda jest względna",
          "że trzeba zachować wewnętrzny spokój",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Cynicy głosili ideał życia w zgodzie z naturą, kierując się rozumem i odrzucając ogólnie przyjęte normy. Najsławniejszy cynik to Diogenes, zwany 'filozofem z beczki'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co było maksymą epikurejczyków?",
      content: {
        options: [
          "'Wiem, że nic nie wiem'",
          "'Carpe diem' - chwytaj dzień",
          "'Wszystko płynie'",
          "'Poznaj samego siebie'",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Maksyma epikurejczyków to 'Carpe diem' – 'chwytaj dzień'. Epikur kazał powiesić na frontonie szkoły: 'Gościu, tutaj będzie Ci dobrze, tutaj najwyższym dobrem jest przyjemność'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto był uczniem Platona i nauczycielem Aleksandra Wielkiego?",
      content: {
        options: ["Sokrates", "Arystoteles", "Epikur", "Pitagoras"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Arystoteles był uczniem Platona, a później nauczycielem Aleksandra Wielkiego. Jest twórcą podstaw logiki, botaniki, psychologii i retoryki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest stoicyzm jako postawa życiowa?",
      content: {
        options: [
          "dążenie do przyjemności",
          "niewzruszony spokój, panowanie nad sobą, równowaga duchowa",
          "odrzucenie wszelkich norm społecznych",
          "relatywizm w poznaniu prawdy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Stoicyzm to postawa życiowa polegająca na niewzruszonym spokoju, panowaniu nad sobą i równowadze duchowej. Stoicy cenili hart ducha i wewnętrzny spokój.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim byli sofiści?",
      content: {
        options: [
          "żołnierzami spartańskimi",
          "wędrowymi nauczycielami uczącymi retoryki i filozofii",
          "kapłanami świątyń greckich",
          "rzeźbiarzami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sofiści byli wędrowymi nauczycielami, którzy za pieniądze uczyli retoryki, polityki, filozofii i etyki. Ich maksymą było 'człowiek jest miarą rzeczy'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który filozof został nazwany 'ojcem medycyny'?",
      content: {
        options: ["Arystoteles", "Tales", "Hipokrates", "Pitagoras"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Hipokrates został nazwany 'ojcem medycyny'. Uważał, że środowisko ma decydujący wpływ na zdrowie człowieka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który filozof stworzył dualizm świata – teorię o współistnieniu świata idei i świata materialnego?",
      content: {
        options: ["Sokrates", "Platon", "Arystoteles", "Heraklit"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Platon stworzył platonizm – dualizm świata. Według niego istnieje świat idei (niedostępny zmysłom) i świat materialny (niedoskonała kopia idei).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto napisał eposy 'Iliada' i 'Odyseja'?",
      content: {
        options: ["Hezjod", "Wergiliusz", "Homer", "Horacy"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Homer jest autorem dwóch najsławniejszych eposów antycznych: 'Iliady' i 'Odysei'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Iliada",
      question: "Ile dni wojny trojańskiej opisuje 'Iliada'?",
      content: {
        options: ["10 dni", "50 dni", "100 dni", "cały okres 10 lat wojny"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "'Iliada' opisuje ostatnie pięćdziesiąt dni wojny trojańskiej, nie całą wojnę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Odyseja",
      question: "Ile lat trwał powrót Odyseusza do Itaki?",
      content: {
        options: ["5 lat", "10 lat", "15 lat", "20 lat"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Powrót Odyseusza do Itaki po wojnie trojańskiej trwał 10 lat, wypełnionych licznymi przygodami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Odyseja",
      question: "Jak nazywała się żona Odyseusza?",
      content: {
        options: ["Helena", "Penelopa", "Ifigenia", "Andromache"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Penelopa była wierną żoną Odyseusza, która czekała na niego przez 10 lat, odpierając zaloty pretendentów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Odyseja",
      question: "Jak nazywał się syn Odyseusza?",
      content: {
        options: ["Telemach", "Parys", "Hektor", "Patrokles"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Telemach był synem Odyseusza i Penelopy. W 'Odysei' opisane są także jego przygody.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Jakim metrum zostały napisane 'Iliada' i 'Odyseja'?",
      content: {
        options: [
          "heksametrem daktylicznym",
          "pentametrem jambicznym",
          "trochejem",
          "amfibrachem",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Oba eposy Homera zostały napisane heksametrem daktylicznym – rytmem składającym się z sześciu stóp.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest 'kwestia homerycka'?",
      content: {
        options: [
          "pytanie o tematykę dzieł Homera",
          "spór o to, czy Homer rzeczywiście istniał i czy był autorem eposów",
          "problem z tłumaczeniem dzieł Homera",
          "zagadnienie moralności w eposach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kwestia homerycka to spór z XVIII wieku o to, czy Homer istniał. Przypuszczano, że utwory mogły być dziełem wędrownych śpiewaków – aojdów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest epos?",
      content: {
        options: [
          "krótki utwór liryczny",
          "rozbudowany utwór wierszowany opowiadający o legendarnych bohaterach",
          "utwór dramatyczny",
          "krótka forma epicka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Epos to najstarszy gatunek literacki epiki – długi, wierszowany utwór opowiadający o legendarnych i historycznych bohaterach na tle ważnych wydarzeń.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto napisał 'Teogonię' – utwór o pochodzeniu bogów?",
      content: {
        options: ["Homer", "Hezjod", "Horacy", "Safona"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hezjod był autorem 'Teogonii' – eposu religijnego opisującego narodziny bogów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim byli trzej wielcy tragicy greccy?",
      content: {
        options: [
          "Homer, Hezjod, Wergiliusz",
          "Sofokles, Ajschylos, Eurypides",
          "Horacy, Safona, Anakreont",
          "Platon, Arystoteles, Sokrates",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Trzej wielcy tragicy greccy to: Sofokles ('Antygona'), Ajschylos ('Oresteja') i Eurypides ('Medea').",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Skąd wywodzi się teatr grecki?",
      content: {
        options: [
          "z obrzędów ku czci Afrodyty",
          "z obrzędów ku czci Dionizosa – dionizji",
          "z obrzędów ku czci Zeusa",
          "z obrzędów ku czci Apollina",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Teatr grecki wywodzi się z dionizji – obrzędów ku czci boga Dionizosa. Były to święta związane z winem i zabawami ludowymi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest katharsis?",
      content: {
        options: [
          "rodzaj tragedii",
          "oczyszczenie, rozładowanie emocji pod wpływem sztuki",
          "styl w architekturze",
          "część teatru greckiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Katharsis (z greckiego katharos – oczyszczenie) to rozładowanie doznawanych wzruszeń pod wpływem sztuki, zwłaszcza tragedii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Ile aktorów mogło występować jednocześnie na scenie w tragedii greckiej?",
      content: {
        options: ["dwóch", "trzech", "czterech", "pięciu"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W tragedii greckiej liczba aktorów występujących na scenie nie mogła przekraczać trzech.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest mimesis?",
      content: {
        options: [
          "rodzaj tragedii",
          "naśladowanie natury przez sztukę",
          "zasada filozoficzna",
          "styl architektoniczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mimesis to naśladowanie rzeczywistości przez sztukę. Według tej zasady należy odtwarzać świat, a nie go wymyślać.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest fatum?",
      content: {
        options: [
          "rodzaj tragedii",
          "przeznaczenie, los wyznaczony przez bogów",
          "część chóru",
          "styl w rzeźbie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fatum to przeznaczenie, to co przewidziane i zrządzone przez bogów, zły los. W tragedii greckiej losy ludzi są podporządkowane fatum.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Która poetka grecka była nazywana 'dziesiątą Muzą'?",
      content: {
        options: ["Helena", "Ifigenia", "Safona", "Penelopa"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Safona była wybitną poetką z wyspy Lesbos, którą Platon nazywał 'dziesiątą Muzą'. Pisała pieśni miłosne i weselne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest strofa saficka?",
      content: {
        options: [
          "zwrotka składająca się z trzech wierszy jedenastozgłoskowych i czwartego pięciogłoskowego",
          "zwrotka złożona z czterech wersów ośmiozgłoskowych",
          "dwuwers elegijny",
          "czterowiersz rymowany",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Strofa saficka, nazwana od imienia poetki Safony, składa się z trzech wierszy jedenastozgłoskowych i czwartego pięciogłoskowego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to są anakreontyki?",
      content: {
        options: [
          "długie eposy bohaterskie",
          "krótkie utwory o tematyce biesiadnej lub miłosnej",
          "tragedie greckie",
          "hymny ku czci bogów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Anakreontyki to krótkie utwory o lekkiej tematyce biesiadnej lub miłosnej, nazwane od imienia poety Anakronta.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Kto tworzył poezję tyrtejską – patriotyczną, nawołującą do walki?",
      content: {
        options: ["Anakreont", "Tyrtajos", "Safona", "Pindar"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tyrtajos tworzył elegie patriotyczne, zachęcając do walki w obronie ojczyzny. Od jego imienia pochodzi określenie 'poezja tyrtejska'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Ile stylów architektonicznych wyróżniano w starożytnej Grecji?",
      content: {
        options: ["dwa", "trzy", "cztery", "pięć"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W greckiej architekturze wyróżniano trzy style: dorycki, joński i koryncki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który styl architektoniczny charakteryzował się zdobieniami w kształcie ślimaków przypominających baranie rogi?",
      content: {
        options: ["dorycki", "joński", "koryncki", "toskański"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Styl joński charakteryzował się zdobieniami w postaci ślimaczków przypominających baranie rogi oraz wysmuklonym trzonem kolumny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który styl architektoniczny był najpóźniejszy i najbardziej zdobny, z ornamentami w kształcie liści?",
      content: {
        options: ["dorycki", "joński", "koryncki", "rzymski"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Styl koryncki był najpóźniejszym stylem w architekturze greckiej, charakteryzował się zdobieniami w kształcie pionowych liści wygiętych do tyłu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Którzy z wymienionych byli najsłynniejszymi rzeźbiarzami starożytnej Grecji?",
      content: {
        options: [
          "Fidiasz, Praksyteles, Poliklet",
          "Homer, Hezjod, Horacy",
          "Sofokles, Ajschylos, Eurypides",
          "Sokrates, Platon, Arystoteles",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Najsłynniejszymi rzeźbiarzami starożytnej Grecji byli: Fidiasz, Praksyteles i Poliklet.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest politeizm?",
      content: {
        options: [
          "wiara w jednego Boga",
          "wiara w wielu bogów",
          "brak wiary w bogów",
          "wiara w siły natury",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Politeizm to wiara w wielu bogów. Taki charakter miała religia starożytnej Grecji i Rzymu (mitologia).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest monoteizm?",
      content: {
        options: [
          "wiara w wielu bogów",
          "wiara w jednego Boga",
          "brak wiary",
          "wiara w bogów natury",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Monoteizm to wiara w jednego Boga. W starożytności monoteistycznym wyznaniem było chrześcijaństwo.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Co według mitologii greckiej było na początku, przed powstaniem świata?",
      content: {
        options: ["Chaos", "Zeus", "Gaja", "Eros"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Według mitologii greckiej na początku był Chaos – bezkształtna masa, otchłań łącząca ogień, wodę, powietrze i ziemię.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto był ojcem pierwszych bogów greckich?",
      content: {
        options: ["Zeus", "Uranos", "Kronos", "Hades"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Uranos (Niebo) był ojcem pierwszych bogów – tytanów, cyklopów i sturękich olbrzymów. Został zabity przez swojego syna Kronosa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim była Gaja w mitologii greckiej?",
      content: {
        options: [
          "boginią miłości",
          "Ziemią, matką pierwszych bogów",
          "boginią mądrości",
          "boginią polowań",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Gaja to Ziemia, matka pierwszych bogów. Z Uranosem (Niebem) zrodziła tytanów i inne istoty.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto był głównym bogiem w panteonie greckim?",
      content: {
        options: ["Hades", "Posejdon", "Zeus", "Apollo"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zeus był najwyższym bogiem w panteonie greckim, władcą nieba i piorunów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Która bogini rzuciła złote jabłko z napisem 'dla najpiękniejszej', wywołując wojnę trojańską?",
      content: {
        options: ["Afrodyta", "Hera", "Eris - bogini niezgody", "Atena"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Bogini niezgody Eris rzuciła złote jabłko z napisem 'dla najpiękniejszej' między Herę, Atenę i Afrodytę, co stało się przyczyną wojny trojańskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto był królem Sparty, którego żonę Helenę porwał Parys?",
      content: {
        options: ["Agamemnon", "Achilles", "Menelaos", "Odyseusz"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Menelaos był królem Sparty i mężem Heleny. Jej porwanie przez Parysa stało się przyczyną wojny trojańskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto wpadł na pomysł drewnianego konia trojańskiego?",
      content: {
        options: ["Achilles", "Agamemnon", "Odyseusz", "Hektor"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Odyseusz wymyślił podstęp z drewnianym koniem, w którym ukryli się greccy żołnierze. Dzięki temu Grecy zdobyli Troję.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Ile ksiąg zawiera Biblia?",
      content: {
        options: ["46", "66", "73", "80"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Biblia zawiera 73 księgi – 46 w Starym Testamencie i 27 w Nowym Testamencie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Jak nazywa się pierwszych pięć ksiąg Starego Testamentu?",
      content: {
        options: ["Ewangelie", "Tora (Pięcioksiąg)", "Psalmy", "Prorocy"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pierwsze pięć ksiąg Starego Testamentu to Tora, czyli Pięcioksiąg: Księga Rodzaju, Wyjścia, Kapłańska, Liczb i Powtórzonego Prawa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Ile ewangelii znajduje się w Nowym Testamencie?",
      content: {
        options: ["dwie", "trzy", "cztery", "pięć"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W Nowym Testamencie znajdują się cztery ewangelie: św. Mateusza, św. Marka, św. Łukasza i św. Jana.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest konflikt tragiczny w tragedii antycznej?",
      content: {
        options: [
          "walka bohatera z wrogiem",
          "starcie dwóch równorzędnych racji moralnych, między którymi nie można dokonać wyboru",
          "spór między bogami",
          "kłótnia w rodzinie królewskiej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konflikt tragiczny to starcie dwóch równorzędnych racji moralnych. Bohater musi wybierać między wartościami, które są jednakowo ważne, co prowadzi do katastrofy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest wina tragiczna (hamartia)?",
      content: {
        options: [
          "celowe popełnienie zbrodni",
          "złamanie prawa boskiego",
          "błędna ocena własnej sytuacji prowadząca do klęski",
          "zdrada ojczyzny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wina tragiczna (hamartia) to błędna ocena własnej sytuacji przez bohatera. Podejmuje on decyzje, które - mimo dobrych intencji - prowadzą go do klęski.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest hybris w kontekście tragedii greckiej?",
      content: {
        options: [
          "mądrość i rozsądek",
          "pycha i przekroczenie granic wyznaczonych przez bogów",
          "sprawiedliwość królewska",
          "odwaga w walce",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hybris to pycha, zuchwałość i przekroczenie granic wyznaczonych przez bogów i naturę. W tragedii greckiej hybris zawsze prowadzi do nemezis - kary ze strony bogów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Jak nazywa się pierwsza część tragedii greckiej, która wprowadza w akcję?",
      content: {
        options: ["parodos", "prologos", "stasimon", "eksodos"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Prologos (prolog) to pierwsza część tragedii, która pełniła funkcję przedmowy i wprowadzała widzów w akcję.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Jak nazywa się wstępna pieśń chóru wchodzącego na orchestrę?",
      content: {
        options: ["eksodos", "stasimon", "parodos", "kommos"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Parodos to wstępna, wejściowa pieśń chóru wchodzącego na orchestrę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Jak nazywa się punkt kulminacyjny tragedii, w którym bohater wyraża swój lament?",
      content: {
        options: ["stasimon", "parodos", "kommos", "epejsodion"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kommos to punkt kulminacyjny tragedii – lament bohatera wyrażający szczyt rozpaczy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Która zasada tragedii antycznej mówi, że nie wolno przeplatać scen tragicznych z komicznymi?",
      content: {
        options: [
          "zasada trzech jedności",
          "zasada decorum",
          "zasada jedności estetyki",
          "zasada mimesis",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zasada jedności estetyki głosiła, że nie wolno przeplatać scen tragicznych z komicznymi. Tragedia musiała zachować jednolity, podniosły ton.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co oznacza zasada decorum w tragedii antycznej?",
      content: {
        options: [
          "zachowanie jedności miejsca",
          "podniosły język i styl, brak krwawych scen na scenie",
          "występowanie trzech aktorów",
          "obecność chóru",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zasada decorum oznaczała zachowanie stosowności – podniosły język i styl oraz brak przedstawiania krwawych scen na scenie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Jaka była rola chóru w tragedii greckiej?",
      content: {
        options: [
          "grał głównego bohatera",
          "komentował wydarzenia i wyrażał opinie zbiorowe",
          "tworzył scenografię",
          "zastępował narratora epicką opowieścią",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Chór komentował wydarzenia, wyrażał opinie zbiorowe społeczeństwa, dokonywał refleksji moralnych i filozoficznych nad losem bohaterów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest paralelizm fabuły w eposie antycznym?",
      content: {
        options: [
          "powtarzanie tych samych scen",
          "równoczesne występowanie dwóch ciągów wydarzeń w fabule",
          "porównywanie bohaterów",
          "podział na księgi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Paralelizm fabuły to cecha eposu antycznego, w której równocześnie występują dwa ciągi wydarzeń (np. w Odysei: przygody Telemacha i wędrówka Odyseusza).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Jaki typ eposu reprezentuje 'Iliada'?",
      content: {
        options: [
          "epos religijny",
          "epos rycerski",
          "epos fantastyczny",
          "epos dydaktyczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "'Iliada' to epos rycerski, opisujący wojnę trojańską i czyny bohaterów wojennych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Jaki typ eposu reprezentuje 'Odyseja'?",
      content: {
        options: [
          "epos religijny",
          "epos rycerski",
          "epos fantastyczny",
          "epos historyczny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "'Odyseja' to epos fantastyczny, pełen niezwykłych przygód, mitycznych stworzeń i magicznych miejsc.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Która technika narracyjna występuje w 'Odysei', gdy Odyseusz opowiada o swoich przygodach na dworze Alkinoosa?",
      content: {
        options: ["prospekcja", "retrospekcja", "paralelizm", "inwokacja"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W 'Odysei' występuje retrospekcja – Odyseusz na dworze króla Alkinoosa opowiada o swoich wcześniejszych przygodach.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest inwokacja w eposie?",
      content: {
        options: [
          "zakończenie utworu",
          "wezwanie do Muzy na początku utworu",
          "opis bitwy",
          "dialog bohaterów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Inwokacja to wezwanie do Muzy na początku eposu, w którym poeta prosi o natchnienie i pomoc w opowiadaniu historii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Która cecha NIE jest typowa dla eposu antycznego?",
      content: {
        options: [
          "wszechwiedzący narrator",
          "uroczysty, patetyczny styl",
          "intymny ton wypowiedzi",
          "nagromadzenie epitetów",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Intymny ton wypowiedzi jest charakterystyczny dla liryki, nie dla eposu. Epos cechuje się uroczystym, patetycznym stylem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest oda?",
      content: {
        options: [
          "krótki utwór satyryczny",
          "utwór liryczny o patetycznym stylu i pochwalnym charakterze",
          "długi epos bohaterski",
          "tragedia w trzech aktach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oda to utwór liryczny o patetycznym stylu i pochwalnym charakterze, opiewający ważne wydarzenie, osobę lub idee.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Kto był najsławniejszym twórcą poezji chóralnej, sławiącym zwycięzców igrzysk olimpijskich?",
      content: {
        options: ["Anakreont", "Safona", "Pindar", "Tyrtajos"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pindar był najwybitniejszym twórcą poezji chóralnej, sławił zwycięzców igrzysk olimpijskich w uroczystych odach.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Która poetka prowadziła szkołę dla dziewcząt na wyspie Lesbos?",
      content: {
        options: ["Helena", "Penelopa", "Safona", "Andromache"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Safona prowadziła szkołę dla dziewcząt z arystokratycznych domów na wyspie Lesbos, ucząc muzyki, poezji i tańca.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest elegia?",
      content: {
        options: [
          "wesoły utwór biesiadny",
          "utwór liryczny o smutnej tematyce",
          "długi epos",
          "komedia satyryczna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Elegia to gatunek liryczny o zazwyczaj smutnej, melancholijnej tematyce, często związanej ze śmiercią lub stratą.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest tren?",
      content: {
        options: [
          "utwór weselny",
          "pieśń żałobna, lament nad zmarłym",
          "hymn pochwalny",
          "utwór biesiadny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tren to pieśń żałobna, lament nad zmarłym. Gatunek ten powstał w antyku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto był najsławniejszym komiediopisarzem greckim?",
      content: {
        options: ["Sofokles", "Arystofanes", "Menander", "Plautus"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Arystofanes był najsławniejszym komiediopisarzem greckim. Jego komedie miały charakter satyryczny i polityczny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to są mity teogoniczne?",
      content: {
        options: [
          "mity o powstawaniu świata",
          "mity o pochodzeniu bogów",
          "mity o powstawaniu człowieka",
          "mity o pochodzeniu bohaterów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mity teogoniczne to mity mówiące o pochodzeniu i narodzinach bogów (z greckiego theos – bóg).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to są mity kosmogoniczne?",
      content: {
        options: [
          "mity o pochodzeniu bogów",
          "mity o powstawaniu świata i kosmosu",
          "mity o bohaterach",
          "mity o wojnach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mity kosmogoniczne to mity mówiące o powstawaniu świata i kosmosu (z greckiego kosmos – świat, porządek).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to są mity genealogiczne?",
      content: {
        options: [
          "mity o powstawaniu świata",
          "mity o pochodzeniu bogów",
          "mity mówiące o pochodzeniu bohaterów i rodów",
          "mity o końcu świata",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Mity genealogiczne to mity mówiące o pochodzeniu bohaterów i rodów, przedstawiające ich historię rodzinną.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Jaki tytan zabił swojego ojca Uranosa i został później obalony przez własnego syna?",
      content: {
        options: ["Atlas", "Kronos", "Prometeusz", "Epimeteusz"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kronos zabił swojego ojca Uranosa, a później został obalony przez własnego syna Zeusa, co zapoczątkowało erę bogów olimpijskich.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim była Reja w mitologii greckiej?",
      content: {
        options: [
          "żoną Uranosa",
          "żoną Kronosa i matką Zeusa",
          "żoną Zeusa",
          "córką Zeusa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Reja była tytanidą, żoną Kronosa i matką głównych bogów olimpijskich: Zeusa, Hery, Posejdona, Hadesa, Demeter i Hestii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim była Hera w mitologii greckiej?",
      content: {
        options: [
          "boginią mądrości",
          "boginią miłości",
          "żoną Zeusa, boginią małżeństwa",
          "boginią polowań",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Hera była żoną Zeusa i boginią małżeństwa, opiekunką rodziny i wierności małżeńskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Posejdon?",
      content: {
        options: [
          "bogiem wojny",
          "bogiem mórz i oceanów",
          "bogiem podziemi",
          "bogiem słońca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Posejdon był bogiem mórz, oceanów i trzęsień ziemi, bratem Zeusa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Hades?",
      content: {
        options: [
          "bogiem wojny",
          "bogiem mórz",
          "władcą podziemi i królestwa zmarłych",
          "bogiem słońca",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Hades był władcą podziemi i królestwa zmarłych, bratem Zeusa i Posejdona.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim była Atena?",
      content: {
        options: [
          "boginią miłości",
          "boginią mądrości, wojny sprawiedliwej i rzemiosła",
          "boginią polowań",
          "boginią małżeństwa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Atena była boginią mądrości, wojny sprawiedliwej, rzemiosła i strategii. Według mitu narodziła się z głowy Zeusa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim była Afrodyta?",
      content: {
        options: [
          "boginią mądrości",
          "boginią miłości i piękna",
          "boginią polowań",
          "boginią rolnictwa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Afrodyta była boginią miłości, piękna i pożądania. Według mitu narodziła się z piany morskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Apollo?",
      content: {
        options: [
          "bogiem wojny",
          "bogiem słońca, muzyki, poezji i wróżbiarstwa",
          "bogiem morza",
          "bogiem podziemi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Apollo był bogiem słońca, światła, muzyki, poezji, sztuki i wróżbiarstwa. Patron delickiej wyroczni.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim była Artemida?",
      content: {
        options: [
          "boginią miłości",
          "boginią mądrości",
          "boginią polowań i księżyca",
          "boginią wojny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Artemida była boginią polowań, księżyca i dziewictwa, siostrą bliźniaczką Apollina.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Ares?",
      content: {
        options: [
          "bogiem miłości",
          "bogiem wojny i przemocy",
          "bogiem rzemiosła",
          "bogiem handlu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ares był bogiem wojny, przemocy i krwawych bitew, synem Zeusa i Hery.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Hermes?",
      content: {
        options: [
          "bogiem wojny",
          "posłańcem bogów, opiekunem podróżnych i handlarzy",
          "bogiem morza",
          "bogiem rolnictwa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hermes był posłańcem bogów, opiekunem podróżnych, handlarzy i złodziei, przewodnikiem dusz do Hadesu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Hefajstos?",
      content: {
        options: [
          "bogiem wojny",
          "bogiem ognia, kowalstwa i rzemiosła",
          "bogiem morza",
          "bogiem wina",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hefajstos był bogiem ognia, kowalstwa, rzemiosła i metalurgii. Wytwarzał broń i przedmioty dla bogów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Dionizos?",
      content: {
        options: [
          "bogiem wojny",
          "bogiem wina, radości i teatru",
          "bogiem morza",
          "bogiem słońca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dionizos był bogiem wina, radości, płodności i teatru. Na jego cześć odbywały się dionizje, z których wywodzi się teatr grecki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim była Demeter?",
      content: {
        options: [
          "boginią wojny",
          "boginią rolnictwa, żniw i płodności ziemi",
          "boginią polowań",
          "boginią mądrości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Demeter była boginią rolnictwa, żniw, płodności ziemi i pór roku. Matka Persefony.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto był najsłynniejszym dowódcą greckim w wojnie trojańskiej?",
      content: {
        options: ["Achilles", "Agamemnon", "Odyseusz", "Menelaos"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Agamemnon, król Miken i brat Menelaosa, był naczelnym dowódcą wojsk greckich w wojnie trojańskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kto był największym wojownikiem greckim w wojnie trojańskiej?",
      content: {
        options: ["Agamemnon", "Odyseusz", "Achilles", "Patrokles"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Achilles był największym wojownikiem greckim, niemal nieśmiertelnym bohaterem o nadludzkiej sile.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Hektor w wojnie trojańskiej?",
      content: {
        options: [
          "królem Sparty",
          "największym wojownikiem trojańskim, bratem Parysa",
          "królem Itaki",
          "wróżbitą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hektor był największym wojownikiem trojańskim i głównym obrońcą Troi, bratem Parysa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Patrokles?",
      content: {
        options: [
          "królem Itaki",
          "przyjacielem Achillesa zabitym przez Hektora",
          "królem Troi",
          "prorokiem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Patrokles był ukochanym przyjacielem Achillesa. Jego śmierć z rąk Hektora sprowadziła Achillesa z powrotem do walki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Kim był Priam?",
      content: {
        options: [
          "królem Sparty",
          "królem Troi, ojcem Hektora i Parysa",
          "królem Itaki",
          "wodzem greckim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Priam był królem Troi, ojcem Hektora i Parysa. Zginął podczas zdobycia miasta.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Która księga Biblii zawiera historię stworzenia świata?",
      content: {
        options: [
          "Księga Wyjścia",
          "Księga Rodzaju",
          "Księga Psalmów",
          "Księga Mądrości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Księga Rodzaju (Genesis) zawiera historię stworzenia świata w sześć dni oraz dzieje pierwszych ludzi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "W której księdze Biblii opisane jest wyjście Izraelitów z Egiptu?",
      content: {
        options: [
          "Księga Rodzaju",
          "Księga Wyjścia (Exodus)",
          "Księga Liczb",
          "Księga Jozuego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Księga Wyjścia (Exodus) opisuje wyjście Izraelitów z niewoli egipskiej pod wodzą Mojżesza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Którą księgę Biblii stanowią modlitwy i pieśni?",
      content: {
        options: [
          "Księga Przysłów",
          "Księga Psalmów",
          "Księga Mądrości",
          "Pieśń nad Pieśniami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Księga Psalmów zawiera 150 modlitw i pieśni, tradycyjnie przypisywanych królowi Dawidowi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Co to jest Apokalipsa św. Jana?",
      content: {
        options: [
          "ewangelia opisująca życie Jezusa",
          "księga prorocza o końcu świata i Sądzie Ostatecznym",
          "zbiór przypowieści",
          "historia pierwszych chrześcijan",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Apokalipsa (Objawienie) św. Jana to księga prorocza opisująca wizje końca świata i Sądu Ostatecznego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "W jakich językach została napisana Biblia?",
      content: {
        options: [
          "tylko po grecku",
          "tylko po hebrajsku",
          "po aramejsku, hebrajsku i grecku",
          "po łacinie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Biblia została napisana w trzech językach: aramejskim, hebrajskim (Stary Testament) i grecku (Nowy Testament).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który filozof rzymski był nauczycielem cesarza Nerona?",
      content: {
        options: ["Cyceron", "Seneka", "Marek Aureliusz", "Pliniusz"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Seneka był filozofem stoickim, nauczycielem i opiekunem cesarza Nerona. Tworzył pisma etyczne i tragedie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który cesarz rzymski był nazywany 'filozofem na tronie'?",
      content: {
        options: ["Neron", "Marek Aureliusz", "August", "Kaligula"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Marek Aureliusz był cesarzem rzymskim i filozofem stoickim, nazywanym 'filozofem na tronie'. Głosił idee humanitaryzmu i sprawiedliwości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Kto był doskonałym mówcą rzymskim, autorem mów sądowych i politycznych?",
      content: {
        options: ["Seneka", "Cyceron", "Horacy", "Wergiliusz"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Cyceron był doskonałym mówcą, autorem wielu mów sądowych i politycznych oraz dzieł z retoryki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który filozof starożytny uważał, że podstawowym elementem świata jest ogień?",
      content: {
        options: [
          "Tales z Miletu",
          "Heraklit z Efezu",
          "Anaksymenes",
          "Pitagoras",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Heraklit z Efezu uważał, że podstawowym elementem świata jest ogień. Jako pierwszy zainteresował się poznaniem poprzez zgłębianie ludzkiej duszy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który filozof starożytny uważał, że podstawowym elementem świata jest woda?",
      content: {
        options: ["Heraklit", "Tales z Miletu", "Anaksymenes", "Sokrates"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tales z Miletu uważał, że główną przyczyną powstania świata była woda.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Który filozof starożytny uważał, że podstawowym elementem świata jest powietrze?",
      content: {
        options: ["Tales", "Heraklit", "Anaksymenes", "Pitagoras"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Anaksymenes za podstawowy element świata uznawał powietrze. W zależności od jego gęstości powstawał ogień, woda, człowiek czy ziemia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który filozof wysunął teorię kulistości ziemi?",
      content: {
        options: ["Sokrates", "Anaksymander", "Tales", "Heraklit"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Anaksymander wysunął teorię kulistości ziemi i uważał, że pod wpływem ruchu wyłoniło się ciepło i zimno.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który filozof jest twórcą Twierdzenia Pitagorasa?",
      content: {
        options: ["Sokrates", "Platon", "Pitagoras", "Euklides"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pitagoras był znakomitym matematykiem i filozofem, twórcą Twierdzenia Pitagorasa. Uważał, że ziemia ma kształt kuli.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który rzymski poeta był autorem 'Eneidy'?",
      content: {
        options: ["Horacy", "Owidiusz", "Wergiliusz", "Cyceron"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wergiliusz był autorem 'Eneidy' – eposu o Eneasz, trojańskim bohaterze, który stał się przodkiem Rzymian.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: null,
      question: "Który poeta rzymski tworzył pieśni i ody, m.in. 'Carpe diem'?",
      content: {
        options: ["Wergiliusz", "Horacy", "Owidiusz", "Katullus"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Horacy był twórcą pieśni i od. Jego słynne 'Carpe diem' (chwytaj dzień) stało się maksymą epikurejską.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Dopasuj filozofów do ich głównych twierdzeń.",
      content: {
        matchingType: "philosopher_thesis",
        leftColumn: [
          { id: "A", text: "Sokrates" },
          { id: "B", text: "Heraklit" },
          { id: "C", text: "Platon" },
          { id: "D", text: "Arystoteles" },
        ],
        rightColumn: [
          { id: 1, text: "Wszystko płynie, nic nie stoi w miejscu" },
          { id: 2, text: "Świat idei i świat materialny" },
          { id: 3, text: "Do poznania potrzebne są rozum i zmysły" },
          { id: 4, text: "Wiem, że nic nie wiem" },
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
          "Sokrates: 'Wiem, że nic nie wiem', Heraklit: 'Wszystko płynie', Platon: dualizm światów, Arystoteles: poznanie przez rozum i zmysły.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Dopasuj szkoły filozoficzne do ich głównych założeń.",
      content: {
        matchingType: "school_principle",
        leftColumn: [
          { id: "A", text: "Stoicy" },
          { id: "B", text: "Epikurejczycy" },
          { id: "C", text: "Cynicy" },
          { id: "D", text: "Sofiści" },
        ],
        rightColumn: [
          { id: 1, text: "Człowiek jest miarą rzeczy" },
          {
            id: 2,
            text: "Życie w zgodzie z naturą, odrzucenie norm społecznych",
          },
          { id: 3, text: "Carpe diem - chwytaj dzień" },
          { id: 4, text: "Niewzruszony spokój i równowaga duchowa" },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Stoicy głosili spokój i równowagę, epikurejczycy - carpe diem, cynicy - życie zgodne z naturą, sofiści - relatywizm poznania.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Dopasuj bogów greckich do ich rzymskich odpowiedników.",
      content: {
        matchingType: "gods_equivalents",
        leftColumn: [
          { id: "A", text: "Zeus" },
          { id: "B", text: "Hera" },
          { id: "C", text: "Afrodyta" },
          { id: "D", text: "Ares" },
        ],
        rightColumn: [
          { id: 1, text: "Mars" },
          { id: 2, text: "Jowisz (Jupiter)" },
          { id: 3, text: "Juno" },
          { id: 4, text: "Wenus" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Zeus = Jowisz, Hera = Juno, Afrodyta = Wenus, Ares = Mars.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Dopasuj bogów do ich funkcji w mitologii greckiej.",
      content: {
        matchingType: "gods_functions",
        leftColumn: [
          { id: "A", text: "Apollo" },
          { id: "B", text: "Artemida" },
          { id: "C", text: "Hermes" },
          { id: "D", text: "Dionizos" },
        ],
        rightColumn: [
          { id: 1, text: "Bóg wina i teatru" },
          { id: 2, text: "Posłaniec bogów" },
          { id: 3, text: "Bogini polowań" },
          { id: 4, text: "Bóg słońca i muzyki" },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Apollo - słońce i muzyka, Artemida - polowania, Hermes - posłaniec, Dionizos - wino i teatr.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Które cechy charakteryzują sztukę antyczną? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "mimesis - naśladowanie natury",
          "asymetria i chaos",
          "piękno, symetria i harmonia",
          "przedstawianie młodości, zdrowia i siły",
          "unikanie przedstawiania człowieka",
          "pokazywanie brzydoty i starości",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Sztuka antyczna charakteryzowała się mimesis, pięknem, symetrią, harmonią i przedstawianiem młodości oraz zdrowia. Unikano brzydoty i starości.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Które elementy należą do budowy tragedii antycznej? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "prologos",
          "rozwikłanie",
          "parodos",
          "stasimon",
          "monolog wewnętrzny",
          "eksodos",
        ],
      },
      correctAnswer: [0, 2, 3, 5],
      metadata: {
        explanation:
          "Budowa tragedii: prologos, parodos, epejsodion, stasimon, kommos, eksodos. Rozwikłanie i monolog wewnętrzny nie należą do klasycznej struktury.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Które zasady obowiązywały w tragedii antycznej? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "zasada trzech jedności (miejsca, czasu, akcji)",
          "dowolna liczba aktorów",
          "ograniczenie liczby aktorów do trzech",
          "losy ludzi zależne od fatum",
          "obecność scen krwawych na scenie",
          "rola komentatora pełniona przez chór",
        ],
      },
      correctAnswer: [0, 2, 3, 5],
      metadata: {
        explanation:
          "Zasady tragedii: trzech jedności, max. trzech aktorów, fatum, chór jako komentator. Sceny krwawe nie były pokazywane na scenie (zasada decorum).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Dopasuj typy mitów do ich treści.",
      content: {
        matchingType: "myth_types",
        leftColumn: [
          { id: "A", text: "Mity kosmogoniczne" },
          { id: "B", text: "Mity teogoniczne" },
          { id: "C", text: "Mity antropogeniczne" },
          { id: "D", text: "Mity genealogiczne" },
        ],
        rightColumn: [
          { id: 1, text: "O pochodzeniu bohaterów i rodów" },
          { id: 2, text: "O powstawaniu świata" },
          { id: 3, text: "O pochodzeniu bogów" },
          { id: 4, text: "O powstawaniu człowieka" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Kosmogoniczne - powstanie świata, teogoniczne - pochodzenie bogów, antropogeniczne - powstanie człowieka, genealogiczne - dzieje rodów.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Uzupełnij informacje o eposie homeryckim.",
      content: {
        textWithGaps:
          "Homerydy eposy zostały napisane [1], który składa się z sześciu stóp. 'Iliada' opisuje ostatnie [2] dni wojny trojańskiej i jest przykładem eposu [3]. Natomiast 'Odyseja' to epos [4], opisujący powrót Odyseusza do Itaki.",
        gaps: [
          {
            id: 1,
            options: [
              "pentametrem",
              "heksametrem daktylicznym",
              "trochejem",
              "jambem",
            ],
          },
          {
            id: 2,
            options: ["10", "30", "50", "100"],
          },
          {
            id: 3,
            options: [
              "religijnego",
              "rycerskiego",
              "fantastycznego",
              "dydaktycznego",
            ],
          },
          {
            id: 4,
            options: ["religijny", "rycerski", "fantastyczny", "historyczny"],
          },
        ],
      },
      correctAnswer: [1, 2, 1, 2],
      metadata: {
        explanation:
          "Eposy Homera napisane są heksametrem daktylicznym. 'Iliada' opisuje 50 dni wojny i jest eposem rycerskim, 'Odyseja' to epos fantastyczny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Które gatunki literackie powstały w antyku? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "epopeja (epos)",
          "sonet",
          "tragedia",
          "oda",
          "ballada",
          "elegia",
          "hymn",
          "nowela",
        ],
      },
      correctAnswer: [0, 2, 3, 5, 6],
      metadata: {
        explanation:
          "W antyku powstały: epopeja, tragedia, komedia, oda, elegia, hymn, tren, bajka, sielanka. Sonet, ballada i nowela to gatunki późniejsze.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Wyjaśnij, czym jest mimesis w sztuce antycznej i podaj przykład jej zastosowania.",
      content: {
        instruction:
          "Zdefiniuj pojęcie mimesis i wyjaśnij, jak realizowano je w sztuce starożytnej. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja mimesis jako naśladowania natury (1 pkt)",
          "przykład zastosowania w rzeźbie, malarstwie lub literaturze (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Mimesis to zasada naśladowania rzeczywistości przez sztukę. W starożytności artyści nie wymyślali świata, lecz wiernie go odtwarzali. Rzeźbiarze jak Fidiasz czy Praksyteles tworzyli realistyczne posągi bogów i ludzi, przedstawiając harmonię i piękno ciała. W literaturze Homer szczegółowo opisywał przedmioty i sytuacje.",
        keyWords: [
          "naśladowanie",
          "rzeczywistość",
          "realizm",
          "natura",
          "wierność",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Opisz, na czym polegała zasada trzech jedności w tragedii antycznej.",
      content: {
        instruction:
          "Wymień i krótko scharakteryzuj trzy jedności obowiązujące w tragedii greckiej. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wymienienie trzech jedności (1 pkt)",
          "krótkie wyjaśnienie każdej z nich (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Zasada trzech jedności obejmowała: jedność miejsca (akcja toczy się w jednym miejscu), jedność czasu (wydarzenia trwają maksymalnie 24 godziny) oraz jedność akcji (występuje jeden główny wątek fabularny bez wątków pobocznych). Zasady te miały zapewnić spójność i wiarygodność przedstawienia.",
        keyWords: ["miejsce", "czas", "akcja", "24 godziny", "jeden wątek"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Wyjaśnij pojęcie hybris i podaj, jakie skutki wywoływała w tragedii greckiej.",
      content: {
        instruction:
          "Zdefiniuj hybris i opisz jej konsekwencje dla bohatera tragicznego. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja hybris jako pychy i przekroczenia granic (1 pkt)",
          "wskazanie konsekwencji - nemezis, katastrofa (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hybris to pycha, zuchwałość i przekroczenie granic wyznaczonych przez bogów oraz naturę. W tragedii greckiej hybris zawsze prowadziła do nemezis - kary ze strony bogów. Bohater wykazujący hybris nieuchronnie zmierzał ku katastrofie i upadkowi, gdyż bogowie nie tolerowali ludzkiej zarozumiałości.",
        keyWords: [
          "pycha",
          "przekroczenie granic",
          "nemezis",
          "kara bogów",
          "katastrofa",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Scharakteryzuj rolę chóru w tragedii greckiej.",
      content: {
        instruction:
          "Wyjaśnij, jakie funkcje pełnił chór w przedstawieniu tragicznym. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie funkcji komentatora wydarzeń (1 pkt)",
          "wskazanie innych funkcji: głos społeczeństwa, refleksje moralne (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Chór pełnił funkcję komentatora wydarzeń, wyrażał opinie zbiorowe społeczeństwa i dokonywał refleksji moralnych. Śpiewał pieśni w kluczowych momentach tragedii, pomagając widzom zrozumieć działania bohaterów. Reprezentował głos rozsądku i tradycji, często ostrzegając przed konsekwencjami pochopnych decyzji.",
        keyWords: [
          "komentator",
          "opinie zbiorowe",
          "refleksje moralne",
          "pieśni",
          "głos społeczeństwa",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Wyjaśnij, czym różni się konflikt tragiczny od zwykłego konfliktu dramatycznego.",
      content: {
        instruction:
          "Scharakteryzuj specyfikę konfliktu tragicznego w tragedii antycznej. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie równorzędności racji moralnych (1 pkt)",
          "wyjaśnienie niemożności dokonania wyboru bez konsekwencji (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Konflikt tragiczny to starcie dwóch równorzędnych racji moralnych, między którymi bohater nie może dokonać wyboru bez poważnych konsekwencji. Obie strony konfliktu mają słuszne argumenty i wartości. Wybór jednej opcji oznacza naruszenie drugiej równie ważnej wartości, co prowadzi do nieuchronnej katastrofy.",
        keyWords: [
          "równorzędne racje",
          "niemożność wyboru",
          "obie strony słuszne",
          "katastrofa",
          "wartości",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Opisz główne założenia stoicyzmu jako postawy życiowej.",
      content: {
        instruction:
          "Wyjaśnij, w czym według stoików tkwiło szczęście i jak powinien żyć człowiek. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie spokoju, hartu ducha i opanowania (1 pkt)",
          "życie w zgodzie z naturą i rozumem (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Stoicy głosili, że szczęście osiąga się przez życie w zgodzie z naturą i rozumem. Cenili niewzruszony spokój, opanowanie, hart ducha i wewnętrzną równowagę duchową nawet w trudnych chwilach. Człowiek powinien zachować stoicki spokój wobec przeciwności losu i sumiennie wykonywać swoje obowiązki.",
        keyWords: [
          "spokój",
          "hart ducha",
          "natura",
          "rozum",
          "równowaga duchowa",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Wyjaśnij, czym różniła się filozofia epikurejczyków od hedonizmu.",
      content: {
        instruction:
          "Opisz, jak epikurejczycy rozumieli przyjemność i szczęście. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "przyjemność jako brak cierpienia, bólu i strachu (1 pkt)",
          "zachowanie zasad moralnych, umiarkowanie (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Epikurejczycy, w przeciwieństwie do hedonistów, rozumieli przyjemność jako brak bólu, strachu i cierpienia, nie jako doznawanie zmysłowych uciech. Szczęście osiągano przez spokój ducha (ataraksja) i przestrzeganie zasad moralnych. Epikur głosił umiarkowanie i prostotę życia, nie rozpustę.",
        keyWords: [
          "brak cierpienia",
          "spokój ducha",
          "ataraksja",
          "umiarkowanie",
          "zasady moralne",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Scharakteryzuj dualizm platońskiego świata idei i świata materialnego.",
      content: {
        instruction:
          "Wyjaśnij koncepcję dwóch światów według Platona i ich wzajemną relację. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "opisanie świata idei jako doskonałego i niezmiennego (1 pkt)",
          "opisanie świata materialnego jako niedoskonałej kopii idei (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Według Platona istnieją dwa światy: świat idei i świat materialny. Świat idei jest doskonały, niezmienny i wieczny, niedostępny zmysłom, poznawalny tylko rozumem. Świat materialny to jedynie niedoskonała kopia, cień świata idei, dostępny naszym zmysłom. Wszystko co widzimy to tylko odbicie doskonałych pierwowzorów - idei.",
        keyWords: [
          "świat idei",
          "doskonały",
          "niezmienny",
          "kopia",
          "cień",
          "pierwowzór",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question:
        "Opisz mit o wojnie trojańskiej - jej przyczynę i sposób zakończenia.",
      content: {
        instruction:
          "Wyjaśnij, jak doszło do wojny i w jaki sposób Grecy zdobyli Troję. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie przyczyny: porwanie Heleny przez Parysa (1 pkt)",
          "opisanie podstępu z koniem trojańskim (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wojna trojańska wybuchła, gdy Parys porwał Helenę, żonę spartańskiego króla Menelaosa. W odwecie wojska greckie pod wodzą Agamemnona oblegały Troję przez 10 lat. Grecy zdobyli miasto dzięki podstępowi Odyseusza - zbudowali drewnianego konia, w którym ukryli się wojownicy. Trojańczycy wprowadzili konia do miasta, a w nocy Grecy wyszli i zdobyli Troję.",
        keyWords: ["Helena", "Parys", "koń trojański", "podstęp", "Odyseusz"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: null,
      question: "Wyjaśnij koncepcję katharsis w kontekście tragedii greckiej.",
      content: {
        instruction:
          "Opisz, czym jest katharsis i jak działała na widzów tragedii. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja katharsis jako oczyszczenia emocjonalnego (1 pkt)",
          "mechanizm działania - rozładowanie emocji poprzez oglądanie tragedii (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Katharsis (z greckiego katharos – oczyszczenie) to rozładowanie doznawanych wzruszeń pod wpływem sztuki. Widzowie tragedii, obserwując cierpienie bohaterów, przeżywali strach i litość, co pozwalało im na oczyszczenie z własnych negatywnych emocji. Teatr pełnił funkcję terapeutyczną dla społeczeństwa.",
        keyWords: [
          "oczyszczenie",
          "emocje",
          "strach",
          "litość",
          "rozładowanie",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Sztuka",
      question:
        "Który styl greckiej architektury charakteryzował się masywnym trzonem kolumny bez zdobień?",
      content: {
        options: [
          "styl koryncki",
          "styl joński",
          "styl dorycki",
          "styl attycki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Styl dorycki cechował się surowością, masywnym trzonem kolumny i brakiem upiększeń.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Sztuka",
      question:
        "Który styl architektury greckiej miał charakterystyczne 'ślimaczki' przypominające baranie rogi?",
      content: {
        options: [
          "styl joński",
          "styl dorycki",
          "styl koryncki",
          "styl attycki",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Styl joński charakteryzował się zdobieniami w kształcie ślimaczków przypominających baranie rogi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Sztuka",
      question:
        "Który styl był najpóźniejszy w architekturze greckiej i miał zdobienia w kształcie liści?",
      content: {
        options: [
          "styl dorycki",
          "styl attycki",
          "styl joński",
          "styl koryncki",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Styl koryncki był najpóźniejszy i wyróżniał się pionowymi liśćmi pnącymi się ku kapitelowi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Sztuka",
      question: "Jak nazywa się słynna świątynia Ateny na greckim Akropolu?",
      content: {
        options: ["Koloseum", "Panteon", "Partenon", "Forum"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Partenon to świątynia Ateny znajdująca się na ateńskim Akropolu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Sztuka",
      question:
        "Jak nazywa się rzymski amfiteatr, w którym odbywały się walki gladiatorów?",
      content: {
        options: ["Koloseum", "Panteon", "Partenon", "Akropol"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Koloseum to rzymski amfiteatr, w którym odbywały się walki gladiatorów i inne widowiska.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Sztuka",
      question: "Kim był Fidiasz?",
      content: {
        options: ["filozofem", "poetą", "rzeźbiarzem", "wodzem"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Fidiasz był jednym z najbardziej znanych rzeźbiarzy starożytnej Grecji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Pojęcia",
      question: "Co oznacza pojęcie 'fatum'?",
      content: {
        options: [
          "mądrość",
          "odwaga",
          "przeznaczenie zrządzone przez bogów",
          "szczęście",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Fatum to przeznaczenie, to co przewidziane i zrządzone przez bogów, nieuchronny los.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Pojęcia",
      question: "Co to jest epos?",
      content: {
        options: [
          "krótki wiersz liryczny",
          "utwór dramatyczny",
          "długi, wierszowany utwór opowiadający o legendarnych bohaterach",
          "pieśń religijna",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Epos to długi, wierszowany utwór epicki opowiadający o legendarnych i historycznych bohaterach na tle ważnych wydarzeń.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Pojęcia",
      question: "Co to jest oda?",
      content: {
        options: [
          "utwór dramatyczny",
          "utwór liryczny o patetycznym stylu i pochwalnym charakterze",
          "opowieść mitologiczna",
          "krótki wiersz miłosny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oda to utwór liryczny o patetycznym stylu i pochwalnym charakterze, opiewający ważne wydarzenia, osoby lub idee.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Pojęcia",
      question: "Co to jest mit?",
      content: {
        options: [
          "dokument historyczny",
          "bajeczna opowieść wyjaśniająca powstanie świata i bogów",
          "traktat filozoficzny",
          "pieśń religijna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mit to bajeczna opowieść narracyjna wyjaśniająca powstawanie świata, bogów, herosów i ludzi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Pojęcia",
      question: "Jakie mity wyjaśniają pochodzenie bogów?",
      content: {
        options: [
          "kosmogoniczne",
          "antropologiczne",
          "teogoniczne",
          "genealogiczne",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Mity teogoniczne to te, które opowiadają o pochodzeniu i narodzinach bogów.",
      },
    },

    // =========== KONIEC PYTAŃ STAROŻYTNOŚĆ/ANTYK ========= //

    // =========== POCZĄTEK PYTAŃ ŚREDNIOWIECZE =========== //

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question:
        "Jaka data jest umownym początkiem epoki średniowiecza w Europie?",
      content: {
        options: ["1453 r.", "476 r.", "1066 r.", "800 r."],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rok 476 n.e. - upadek Cesarstwa Zachodniorzymskiego - jest umowną datą początku średniowiecza w Europie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Skąd pochodzi nazwa 'średniowiecze'?",
      content: {
        options: [
          "od łacińskiego medium aevum - wieki średnie",
          "od greckiego mesos chronos",
          "od francuskiego moyen age",
          "od niemieckiego Mittelalter",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Nazwa średniowiecze pochodzi od łacińskiego wyrażenia medium aevum, oznaczającego 'wieki średnie' - czas między antykiem a renesansem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza termin 'teocentryzm'?",
      content: {
        options: [
          "podporządkowanie życia królowi",
          "podporządkowanie życia rozumowi",
          "podporządkowanie życia naturze",
          "podporządkowanie życia Bogu",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Teocentryzm (z gr. theos - Bóg) oznacza podporządkowanie wszystkich dziedzin życia Bogu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Która data kończy epokę średniowiecza w Europie?",
      content: {
        options: [
          "1410 r. - bitwa pod Grunwaldem",
          "1492 r. - odkrycie Ameryki",
          "1517 r. - początek reformacji",
          "1453 r. - upadek Konstantynopola",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Rok 1453 (upadek Konstantynopola) jest najpowszechniej przyjmowaną datą końca średniowiecza, choć podaje się też inne daty: 1492 (odkrycie Ameryki) lub 1517 (reformacja).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Kto nadał nazwę 'średniowiecze' tej epoce?",
      content: {
        options: [
          "filozofowie średniowieczni",
          "ludzie renesansu",
          "historycy XIX wieku",
          "uczeni starożytni",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Nazwę 'średniowiecze' nadali humaniści renesansowi, traktując tę epokę z lekceważeniem jako okres między ważnym dla nich antykiem a odrodzeniem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Na ile okresów dzieli się epoka średniowiecza?",
      content: {
        options: ["na 2 okresy", "na 5 okresów", "na 3 okresy", "na 4 okresy"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Średniowiecze dzieli się na trzy okresy: wczesne (V-X w.), dojrzałe/pełne (XI-XIII w.) i późne (XIV-XV w.).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Kto jest twórcą augustynizmu?",
      content: {
        options: [
          "św. Tomasz z Akwinu",
          "św. Franciszek z Asyżu",
          "św. Anzelm",
          "św. Augustyn",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Augustynizm to kierunek filozoficzny stworzony przez świętego Augustyna, nawiązujący do filozofii Platona.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Kto jest twórcą tomizmu?",
      content: {
        options: [
          "św. Tomasz z Akwinu",
          "św. Augustyn",
          "św. Franciszek",
          "św. Anzelm",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Tomizm to kierunek filozoficzny stworzony przez świętego Tomasza z Akwinu, nawiązujący do filozofii Arystotelesa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza łacińskie wyrażenie 'memento mori'?",
      content: {
        options: [
          "żyj chwilą",
          "pamiętaj o śmierci",
          "poznaj samego siebie",
          "carpe diem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Memento mori to łacińskie wyrażenie oznaczające 'pamiętaj o śmierci' - jedno z kluczowych haseł średniowiecza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza francuskie określenie 'danse macabre'?",
      content: {
        options: [
          "taniec życia",
          "taniec dworski",
          "taniec śmierci",
          "taniec weselny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Danse macabre (taniec śmierci) to średniowieczny motyw przedstawiający śmierć tańczącą ze wszystkimi stanami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question:
        "Jaki był dominujący język warstw wykształconych w średniowieczu?",
      content: {
        options: ["greka", "łacina", "język hebrajski", "starofrancuski"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Łacina była uniwersalnym językiem nauki, Kościoła i literatury w średniowiecznej Europie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza termin 'hagiografia'?",
      content: {
        options: [
          "pisanie kronik",
          "sztuka kaznodziejska",
          "żywotopisarstwo świętych",
          "pisanie apokryfów",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Hagiografia to gatunek literacki obejmujący żywoty świętych, legendy i biografie postaci świętych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest misterium?",
      content: {
        options: [
          "utwór satyryczny",
          "kronika historyczna",
          "dramat religijny o tematyce biblijnej",
          "pieśńrycerska",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Misterium to średniowieczny dramat religijny, którego treść czerpana była z Biblii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question:
        "Jak nazywał się średniowieczny dramat religijny ukazujący cuda świętych?",
      content: {
        options: ["misterium", "moralitet", "mirakl", "farsa"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Mirakl (od łac. miraculum - cud) to dramat ukazujący sceny z życia świętych zawierające elementy cudowności.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest moralitet?",
      content: {
        options: [
          "zbiór pouczeń moralnych",
          "dramat o charakterze dydaktyczno-moralizatorskim",
          "traktat filozoficzny",
          "pieśń religijna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Moralitet to średniowieczny dramat o charakterze dydaktycznym, pokazujący walkę cnót i przywary ludzkich.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza francuskie wyrażenie 'chanson de geste'?",
      content: {
        options: [
          "pieśń miłosna",
          "pieśń religijna",
          "pieśń ludowa",
          "pieśń o czynach",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Chanson de geste (pieśń o czynach) to gatunek epicki opiewający bohaterskie czyny rycerzy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest plankt?",
      content: {
        options: [
          "pieśń o czynach rycerskich",
          "utwór wyrażający żal po zmarłym",
          "dramat religijny",
          "kronika dziejów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Plankt (od łac. planktus - płacz) to gatunek wyrażający żal i cierpienie, często po śmierci Chrystusa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question:
        "Jaki styl architektoniczny dominował we wczesnym średniowieczu?",
      content: {
        options: ["gotycki", "barokowy", "renesansowy", "romański"],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Styl romański dominował w X-XIII wieku, charakteryzował się masywnością i prostotą form.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question:
        "Który styl architektoniczny charakteryzuje się strzelistością i witrażami?",
      content: {
        options: ["romański", "barokowy", "gotycki", "renesansowy"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Styl gotycki (XII-XV w.) charakteryzuje się strzelistością, wysokimi oknami i bogato zdobionymi witrażami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co charakteryzowało budowle romańskie?",
      content: {
        options: [
          "wysokie witraże i strzelistość",
          "grube mury i małe okna",
          "bogata ornamentyka",
          "kopuły i kolumnady",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Budowle romańskie miały grube mury, małe okna i charakteryzowały się masywnością oraz funkcją obronną.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question:
        "Który wzorzec osobowy reprezentował całkowite wyrzeczenie się dóbr doczesnych?",
      content: {
        options: ["rycerz", "asceta", "władca", "trubadur"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Asceta to wzorzec osobowy charakteryzujący się całkowitym wyrzeczeniem dóbr doczesnych i życiem w ascezie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co było główną cechą wzorca rycerza chrześcijańskiego?",
      content: {
        options: [
          "dążenie do bogactwa",
          "kontemplacja i modlitwa",
          "honor, odwaga i wiara",
          "życie w ubóstwie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Rycerz chrześcijański charakteryzował się honorem, odwagą, wiernością i głęboką wiarą -walczył w obronie chrześcijaństwa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest scholastyka?",
      content: {
        options: [
          "system edukacji",
          "styl w sztuce",
          "metoda filozoficzna wyjaśniania prawd wiary rozumem",
          "gatunek literacki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Scholastyka to metoda filozoficzna polegająca na racjonalnym wyjaśnianiu prawd wiary.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Kto propagował franciszkanizm?",
      content: {
        options: [
          "św. Franciszek z Asyżu",
          "św. Augustyn",
          "św. Tomasz z Akwinu",
          "św. Anzelm",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Franciszkanizm to nurt zapoczątkowany przez świętego Franciszka z Asyżu, głoszący miłość do wszystkich stworzeń.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza termin 'uniwersalizm średniowieczny'?",
      content: {
        options: [
          "różnorodność kultur w Europie",
          "wspólnota religii, kultury i norm w całej Europie",
          "wolność religijna",
          "podział na narody",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Uniwersalizm średniowieczny oznaczał wspólnotę religii, języka, kultury i norm społecznych w całej Europie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest feudalizm?",
      content: {
        options: [
          "system demokratyczny",
          "system polityczno-gospodarczy oparty na hierarchii lennej",
          "system republikański",
          "monarchia absolutna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Feudalizm to średniowieczny system społeczno-gospodarczy oparty na hierarchii, lenach i zależnościach wasalnych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza motyw 'stabat mater dolorosa'?",
      content: {
        options: [
          "Madonna z Dzieciątkiem",
          "Matka Boska w chwale",
          "stała Matka boleściwa - Maryja pod krzyżem",
          "Zwiastowanie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Stabat Mater Dolorosa (stała Matka boleściwa) to motyw przedstawiający Maryję cierpiącą pod krzyżem Chrystusa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest pieta?",
      content: {
        options: [
          "przedstawienie narodzin Chrystusa",
          "przedstawienie Ostatniej Wieczerzy",
          "przedstawienie Maryi z martwym Chrystusem na kolanach",
          "przedstawienie ukrzyżowania",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pieta (wł. litość) to przedstawienie Matki Boskiej trzymającej na kolanach ciało Chrystusa zdjęte z krzyża.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest deesis?",
      content: {
        options: [
          "przedstawienie Trójcy Świętej",
          "przedstawienie Chrystusa jako sędziego z Maryją i Janem Chrzcicielem",
          "przedstawienie apostołów",
          "scena Zwiastowania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Deesis (gr. prośba) to przedstawienie Chrystusa Sędziego z Maryją po prawej i Janem Chrzcicielem po lewej stronie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Który gatunek literacki zawierał opisy dziejów historycznych?",
      content: {
        options: ["misterium", "moralitet", "kronika", "plankt"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kronika to gatunek historiograficzny zawierający chronologiczny opis wydarzeń historycznych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaki charakter miała literatura średniowieczna?",
      content: {
        options: [
          "rozrywkowy",
          "dydaktyczno-moralizatorski",
          "satyryczny",
          "liryczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Literatura średniowieczna miała przede wszystkim charakter dydaktyczny i moralizatorski - służyła pouczaniu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest pareneza?",
      content: {
        options: [
          "gatunek literacki",
          "styl architektoniczny",
          "tendencja do tworzenia wzorców do naśladowania",
          "nurt filozoficzny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pareneza (gr. zachęcanie) to tendencja w literaturze do tworzenia wzorców postępowania i pouczania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Dlaczego większość dzieł średniowiecznych była anonimowa?",
      content: {
        options: [
          "ze strachu przed prześladowaniami",
          "z powodu analfabetyzmu",
          "tworzono Ad maiorem Dei gloriam - ku większej chwale Boga",
          "nie było systemu praw autorskich",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Dzieła były anonimowe, bo tworzono je na chwałę Bożą, nie dla ziemskiej sławy autora.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to są archaizmy?",
      content: {
        options: [
          "nowe słowa",
          "słowa zapożyczone",
          "słowa, które wyszły z użycia",
          "synonimy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Archaizmy to wyrazy, które wyszły z użycia we współczesnym języku, zachowane w starych tekstach.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Do jakiej filozofii nawiązywał augustynizm?",
      content: {
        options: ["Arystotelesa", "Sokratesa", "Platona", "Heraklita"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Augustynizm nawiązywał do filozofii Platona, przyjmując dualistyczną wizję świata.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Do jakiej filozofii nawiązywał tomizm?",
      content: {
        options: ["Arystotelesa", "Platona", "Sokratesa", "Epikura"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Tomizm przystosował do potrzeb teologii chrześcijańskiej filozofię Arystotelesa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaki był podstawowy element konstrukcyjny budowli romańskich?",
      content: {
        options: [
          "łuk ostrołukowy",
          "kolumna koryncka",
          "łuk półkolisty",
          "kopuła",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Podstawowym elementem konstrukcyjnym architektury romańskiej był łuk półkolisty.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaki typ łuku charakteryzuje budowle gotyckie?",
      content: {
        options: [
          "łuk półkolisty",
          "łuk podkowy",
          "łuk ostrołukowy",
          "łuk pełny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Budowle gotyckie charakteryzuje łuk ostrołukowy, który umożliwiał budowanie wyższych konstrukcji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jak nazywali się wędrowni poeci-śpiewacy średniowiecza?",
      content: {
        options: [
          "bardowie i trubadurzy",
          "menestrelowie",
          "minstrele",
          "wszystkie odpowiedzi są poprawne",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Wędrownych poetów-śpiewaków nazywano różnie: trubadurami, bardami, menestrelami, minstrelami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co głosił franciszkanizm?",
      content: {
        options: [
          "umartwianie ciała",
          "miłość do natury i wszystkich stworzeń",
          "przewagę duszy nad ciałem",
          "ascezę i pustelnictwo",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Franciszkanizm głosił miłość do przyrody, świata i wszystkich zwierząt oraz życie w ubóstwie bez umartwiania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co według augustynizmu było najważniejsze w człowieku?",
      content: {
        options: ["rozum", "dusza", "ciało", "uczucia"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Augustynizm głosił przewagę duszy nad rozumem i ciałem - dusza była najważniejszym elementem ludzkiej natury.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jak tomizm pojmował człowieka?",
      content: {
        options: [
          "jako istotę tylko duchową",
          "jako istotę tylko cielesną",
          "jako połączenie duszy i ciała",
          "jako istotę tragiczną",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tomizm uważał, że człowiek stanowi harmonijne połączenie duszy i ciała - oba pochodzą od Boga.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest apokryf?",
      content: {
        options: [
          "tekst o losach świętych niekanoniczny",
          "kronika historyczna",
          "pieśń religijna",
          "dramat moralizatorski",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Apokryf to tekst o tematyce religijnej lub świętych, który nie został uznany przez Kościół za kanoniczny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza łacińskie wyrażenie 'ars moriendi'?",
      content: {
        options: [
          "sztuka życia",
          "sztuka umierania",
          "sztuka walki",
          "sztuka miłości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ars moriendi to 'sztuka umierania' - zbiór zasad dotyczących właściwego, chrześcijańskiego umierania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaki typ wiersza dominował w średniowieczu?",
      content: {
        options: [
          "sylabiczny",
          "sylabotonicznyintonacyjno-zdaniowy",
          "intonacyjno-zdaniowy",
          "toniczny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W średniowieczu dominował wiersz intonacyjno-zdaniowy (składniowo-rymowy), w którym jedno zdanie = jeden wers.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Kiedy w Polsce rozpoczyna się epoka średniowiecza?",
      content: {
        options: [
          "w X wieku - 966 r.",
          "w V wieku",
          "w XI wieku",
          "w IX wieku",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "W Polsce średniowiecze rozpoczyna się w drugiej połowie X wieku, umownie w 966 roku - chrzest Polski.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest psychomachia?",
      content: {
        options: [
          "teoria psychologiczna",
          "walka dobra ze złem o duszę przed śmiercią",
          "gatunek literacki",
          "nurt filozoficzny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Psychomachia to motyw walki aniołów i demonów o duszę człowieka tuż przed śmiercią.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaki był charakter kronik średniowiecznych?",
      content: {
        options: [
          "obiektywny i naukowy",
          "fikcyjny i rozrywkowy",
          "panegiryczny i dydaktyczny",
          "satyryczny",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kroniki miały charakter panegiryczny (pochwalny) i dydaktyczny, często powstawały na zamówienie władców.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest legenda w średniowieczu?",
      content: {
        options: [
          "mit starożytny",
          "opowiadanie o świętym z elementami cudownymi",
          "kronika historyczna",
          "pieśń ludowa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Legenda to średniowieczny gatunek opowiadający o życiu świętych, zawierający elementy fantastyczne i cudowne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest romans rycerski?",
      content: {
        options: [
          "utwór o tematyce miłosnej z elementami przygodowymi",
          "kronika wojenna",
          "pieśń o czynach",
          "dramat historyczny",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Romans rycerski to utwór o tematyce miłosnej, zawierający elementy przygodowe, magiczne i rycerskie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaką funkcję pełniły budowle romańskie oprócz religijnej?",
      content: {
        options: ["mieszkalną", "handlową", "obronną", "gospodarczą"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Budowle romańskie pełniły podwójną funkcję: religijną i obronną - miały grube mury i małe okna.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizowały katedry gotyckie swoją strzelistością?",
      content: {
        options: [
          "potęgę władcy",
          "dążenie człowieka ku niebu i Bogu",
          "bogactwo miasta",
          "siłę militarną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Strzelistość katedr gotyckich symbolizowała dążenie człowieka ku górze, ku niebu, do Boga.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to jest farsa?",
      content: {
        options: [
          "dramat religijny",
          "komedia o charakterze groteskowym",
          "kronika",
          "pieśń satyryczna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Farsa to komedia oparta na efektach komizmu sytuacyjnego, zawierająca elementy groteskowe i karykaturalne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Z czego wykształciła się farsa?",
      content: {
        options: ["z misterium", "z moralitetu", "z intermedium", "z miraklu"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Farsa wykształciła się z intermedium - krótkiej scenki satyrycznej granej między częściami misterium.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaka była hierarchia społeczna w średniowieczu?",
      content: {
        options: [
          "duchowieństwo - chłopi - szlachta",
          "duchowieństwo - szlachta - mieszczanie - chłopi",
          "szlachta - duchowieństwo - chłopi",
          "wszyscy równi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hierarchia społeczna: na szczycie duchowieństwo, potem szlachta, niżej mieszczanie i rzemieślnicy, na dole chłopi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizowało światło w katedrach gotyckich?",
      content: {
        options: [
          "wiedzę ludzką",
          "Boga, dobro i piękno",
          "władzę króla",
          "bogactwo Kościoła",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Światło w gotyku miało wymiar symboliczny - jasność kojarzono z Bogiem i pięknem, ciemność ze złem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co to są roczniki?",
      content: {
        options: [
          "kroniki historyczne",
          "krótkie zapisy ważnych wydarzeń na marginesach ksiąg",
          "kalendarze liturgiczne",
          "pieśni rocznicowe",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Roczniki to krótkie informacje o ważnych wydarzeniach spisywane na marginesach ksiąg, które przekształciły się w kroniki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaki był stosunek augustynizmu do ciała i duszy?",
      content: {
        options: [
          "ciało i dusza są równie ważne",
          "dusza jest ważniejsza, ciało należy umartwiać",
          "ciało jest ważniejsze od duszy",
          "nie rozróżniano ciała i duszy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Augustynizm głosił wyższość duszy nad ciałem - dusza nieśmiertelna, ciało zniszczalne, więc należy je umartwiać.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Jaki był stosunek tomizmu do ciała i duszy?",
      content: {
        options: [
          "ciało należy umartwiać",
          "tylko dusza jest ważna",
          "ciało i dusza stanowią istotę człowieka - oba są ważne",
          "ciało jest ważniejsze",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tomizm głosił, że zarówno ciało jak i dusza należą do istoty człowieka i są dziełem Boga - oba są ważne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co według tomizmu było wrodzonymi darami boskimi?",
      content: {
        options: [
          "siła i zdrowie",
          "bogactwo i władza",
          "cnota i rozum",
          "wiara i nadzieja",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Według tomizmu cnota i rozum były wrodzonymi darami boskimi, które miały pomóc człowiekowi w życiu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Ile wieków trwało średniowiecze w Europie?",
      content: {
        options: ["5 wieków", "7 wieków", "10 wieków", "15 wieków"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Średniowiecze w Europie trwało około 10 wieków (V-XV wiek).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      question:
        "Jak nazywano okrągłe okna wypełnione witrażami w katedrach gotyckich?",
      content: {
        options: ["rozety", "mandorle", "wimpergi", "fiale"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Rozety to charakterystyczne okrągłe okna wypełnione witrażami w katedrach gotyckich.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      question: "Co stanowiło podstawę edukacji średniowiecznej?",
      content: {
        options: [
          "nauki przyrodnicze",
          "siedem sztuk wyzwolonych",
          "filozofia grecka",
          "prawo rzymskie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Podstawą edukacji było siedem sztuk wyzwolonych: triwium (gramatyka, dialektyka, retoryka) i quadrivium (arytmetyka, muzyka, geometria, astronomia).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj nurty filozoficzne do ich twórców.",
      content: {
        matchingType: "philosophy_authors",
        leftColumn: [
          { id: "A", text: "Augustynizm" },
          { id: "B", text: "Tomizm" },
          { id: "C", text: "Franciszkanizm" },
        ],
        rightColumn: [
          { id: 1, text: "św. Tomasz z Akwinu" },
          { id: 2, text: "św. Augustyn" },
          { id: 3, text: "św. Franciszek z Asyżu" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      metadata: {
        explanation:
          "Augustynizm stworzył św. Augustyn, tomizm św. Tomasz z Akwinu, franciszkanizm św. Franciszek z Asyżu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj gatunki literackie do ich charakterystyki.",
      content: {
        matchingType: "genres_characteristics",
        leftColumn: [
          { id: "A", text: "Hagiografia" },
          { id: "B", text: "Misterium" },
          { id: "C", text: "Kronika" },
          { id: "D", text: "Plankt" },
        ],
        rightColumn: [
          { id: 1, text: "dramat religijny o tematyce biblijnej" },
          { id: 2, text: "dziejopisarstwo historyczne" },
          { id: 3, text: "żywoty świętych" },
          { id: 4, text: "utwór wyrażający żal po zmarłym" },
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
          "Hagiografia to żywoty świętych, misterium to dramat biblijny, kronika to dziejopisarstwo, plankt wyraża żal.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Które cechy charakteryzują styl romański? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "grube mury i małe okna",
          "łuk półkolisty",
          "funkcja obronna",
          "strzelistość i witraże",
          "masywność budowli",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "Styl romański cechują: grube mury, małe okna, łuk półkolisty, funkcja obronna i masywność. Strzelistość i witraże to cechy gotyku.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Które cechy charakteryzują styl gotycki? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "strzelistość",
          "łuk ostrołukowy",
          "małe okna",
          "witraże",
          "grube mury",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Styl gotycki cechują: strzelistość, łuk ostrołukowy i witraże. Małe okna i grube mury to cechy romanizmu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj wzorce osobowe do ich cech.",
      content: {
        matchingType: "models_traits",
        leftColumn: [
          { id: "A", text: "Asceta" },
          { id: "B", text: "Rycerz" },
          { id: "C", text: "Władca doskonały" },
        ],
        rightColumn: [
          { id: 1, text: "wyrzeczenie się dóbr doczesnych" },
          { id: 2, text: "honor, odwaga, wiara" },
          { id: 3, text: "mądrość, sprawiedliwość, troska o poddanych" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      metadata: {
        explanation:
          "Asceta wyrzeka się dóbr, rycerz cechuje się honorem i odwagą, doskonały władca jest mądry i sprawiedliwy.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Uzupełnij informacje o średniowieczu.",
      content: {
        textWithGaps:
          "Nazwa średniowiecze pochodzi od łacińskiego [1]. Epoka ta charakteryzowała się [2], czyli podporządkowaniem życia Bogu. Dominującym językiem był [3], a system społeczny to [4].",
        gaps: [
          {
            id: 1,
            options: [
              "tempus medium",
              "medium aevum",
              "media tempera",
              "aevum medium",
            ],
          },
          {
            id: 2,
            options: [
              "humanizmem",
              "racjonalizmem",
              "teocentryzmem",
              "antropocentryzmem",
            ],
          },
          {
            id: 3,
            options: ["greka", "łacina", "hebrajski", "aramejski"],
          },
          {
            id: 4,
            options: ["kapitalizm", "komunizm", "feudalizm", "republikanizm"],
          },
        ],
      },
      correctAnswer: [1, 2, 1, 2],
      metadata: {
        explanation:
          "Średniowiecze pochodzi od medium aevum, charakteryzował je teocentryzm, język łaciński i feudalizm.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Które motywy występowały w sztuce średniowiecznej? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "danse macabre (taniec śmierci)",
          "memento mori",
          "stabat mater",
          "carpe diem",
          "pieta",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "W sztuce średniowiecznej występowały: danse macabre, memento mori, stabat mater i pieta. Carpe diem to motyw antyczny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj łacińskie wyrażenia do ich znaczenia.",
      content: {
        matchingType: "latin_meanings",
        leftColumn: [
          { id: "A", text: "Memento mori" },
          { id: "B", text: "Ars moriendi" },
          { id: "C", text: "Ad maiorem Dei gloriam" },
          { id: "D", text: "Stabat Mater Dolorosa" },
        ],
        rightColumn: [
          { id: 1, text: "stała Matka boleściwa" },
          { id: 2, text: "sztuka umierania" },
          { id: 3, text: "pamiętaj o śmierci" },
          { id: 4, text: "ku większej chwale Boga" },
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
          "Memento mori - pamiętaj o śmierci, ars moriendi - sztuka umierania, ad maiorem Dei gloriam - ku większej chwale Boga, stabat mater - stała Matka boleściwa.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Które elementy należały do uniwersalizmu średniowiecznego? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "jedna religia - katolicyzm",
          "jeden język - łacina",
          "jeden ustrój - feudalizm",
          "jedna narodowość",
          "jeden władca świecki i duchowy",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "Uniwersalizm obejmował: jedną religię (katolicyzm), język (łacinę), ustrój (feudalizm) i wspólną władzę (papież i cesarz). Nie było jednej narodowości.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Uzupełnij informacje o filozofii średniowiecza.",
      content: {
        textWithGaps:
          "[1] nawiązywał do filozofii Platona i głosił wyższość duszy nad ciałem. [2] nawiązywał do Arystotelesa i uznawał ciało i duszę za równie ważne. [3] propagował miłość do natury i wszystkich stworzeń.",
        gaps: [
          {
            id: 1,
            options: ["Tomizm", "Augustynizm", "Franciszkanizm", "Scholastyka"],
          },
          {
            id: 2,
            options: ["Augustynizm", "Franciszkanizm", "Tomizm", "Realizm"],
          },
          {
            id: 3,
            options: ["Augustynizm", "Tomizm", "Scholastyka", "Franciszkanizm"],
          },
        ],
      },
      correctAnswer: [1, 2, 3],
      metadata: {
        explanation:
          "Augustynizm nawiązywał do Platona, tomizm do Arystotelesa, franciszkanizm propagował miłość do natury.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj gatunki dramatyczne do ich charakterystyki.",
      content: {
        matchingType: "drama_genres",
        leftColumn: [
          { id: "A", text: "Misterium" },
          { id: "B", text: "Moralitet" },
          { id: "C", text: "Mirakl" },
          { id: "D", text: "Farsa" },
        ],
        rightColumn: [
          { id: 1, text: "dramat dydaktyczny o walce dobra ze złem" },
          { id: 2, text: "komedia o charakterze groteskowym" },
          { id: 3, text: "dramat biblijny" },
          { id: 4, text: "dramat o cudach świętych" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Misterium - dramat biblijny, moralitet - o walce dobra ze złem, mirakl - o cudach świętych, farsa - komedia groteskowa.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Wyjaśnij, na czym polegał teocentryzm w epoce średniowiecza.",
      content: {
        instruction:
          "Opisz, jak teocentryzm wpływał na życie i kulturę średniowieczną. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie, że Bóg był w centrum zainteresowań (1 pkt)",
          "wyjaśnienie podporządkowania wszystkich dziedzin życia Bogu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Teocentryzm oznaczał, że Bóg był centrum wszystkich zainteresowań i działań człowieka. Wszystkie dziedziny życia - sztuka, literatura, nauka, polityka - były podporządkowane Bogu i jego chwale. Ludzie tworzyli i działali nie dla ziemskiej sławy, ale Ad maiorem Dei gloriam - ku większej chwale Boga. Życie doczesne traktowano jako przygotowanie do życia wiecznego.",
        keyWords: [
          "Bóg",
          "centrum",
          "podporządkowanie",
          "wszystkie dziedziny",
          "życie wieczne",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Opisz główne różnice między stylem romańskim a gotyckim w architekturze.",
      content: {
        instruction: "Porównaj cechy obu stylów. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie cech stylu romańskiego (1 pkt)",
          "wskazanie cech stylu gotyckiego (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Styl romański charakteryzował się masywnością, grubymi murami, małymi oknami i łukiem półkolistym. Budowle pełniły funkcję obronną. Styl gotycki był przeciwieństwem - budowle strzeliste, smukłe, z wysokimi oknami wypełnionymi witrażami, łukiem ostrołukowym. Gotyk symbolizował dążenie ku niebu, ku Bogu. Romańskie kościoły były ciemne, gotyckie - pełne światła.",
        keyWords: [
          "romański",
          "masywność",
          "gotyk",
          "strzelistość",
          "witraże",
          "łuk",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Wyjaśnij, co oznaczał uniwersalizm średniowieczny.",
      content: {
        instruction:
          "Opisz, na czym polegała jedność średniowiecznej Europy. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie wspólnych elementów (1 pkt)",
          "wyjaśnienie znaczenia uniwersalizmu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Uniwersalizm średniowieczny oznaczał, że cała Europa stanowiła jednolitą wspólnotę. Obowiązywała jedna religia (katolicyzm), jeden język wykształconych warstw (łacina), jeden ustrój (feudalizm), wspólna władza (papież i cesarz). Jednakowe były wzorce osobowe, style w sztuce, symbole i motywy literackie. Europa była jednością kulturową, religijną i społeczną.",
        keyWords: [
          "wspólnota",
          "jedna religia",
          "łacina",
          "feudalizm",
          "jedność",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Scharakteryzuj wzorzec ascety w średniowieczu.",
      content: {
        instruction: "Opisz cechy i styl życia ascety. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie wyrzeczenia się dóbr doczesnych (1 pkt)",
          "opisanie życia w skrajnym ubóstwie i modlitwie (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Asceta to wzorzec osobowy charakteryzujący się całkowitym wyrzeczeniem dóbr doczesnych. Życie ascety podporządkowane było Bogu, praktykowali oni skrajne ubóstwo, pokorę i umartwianie ciała. Oddawali się modlitwie i kontemplacji, często pozostawali anonimowi, nie ujawniając swojego pochodzenia. Celem ich życia było zbawienie duszy i życie wieczne.",
        keyWords: [
          "wyrzeczenie",
          "ubóstwo",
          "modlitwa",
          "umartwianie",
          "zbawienie",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij, czym jest hagiografia i jakie cechy miały te utwory.",
      content: {
        instruction:
          "Opisz gatunek hagiografii i jego charakterystykę. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja hagiografii jako żywotów świętych (1 pkt)",
          "wskazanie cech charakterystycznych (elementy cudowne, schemat) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hagiografia to żywotopisarstwo - gatunek literacki obejmujący żywoty świętych i legendy. Utwory te opisywały życie świętych według schematu: życie w dostatku, wyrzeczenie się dóbr, umartwianie, pokora, życie w anonimowości i śmierć, której towarzyszyły cuda. Zawierały liczne elementy cudowne i fantastyczne. Miały charakter dydaktyczny - propagowały wzorzec ascety.",
        keyWords: [
          "żywoty świętych",
          "legendy",
          "cuda",
          "schemat",
          "dydaktyzm",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz główne założenia augustynizmu.",
      content: {
        instruction:
          "Wyjaśnij, jak augustynizm pojmował człowieka i świat. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie wyższości duszy nad ciałem (1 pkt)",
          "wyjaśnienie tragizmu kondycji ludzkiej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Augustynizm głosił dualistyczną wizję świata podzielonego na dobro (duch) i zło (materia). Człowiek był istotą tragiczną, rozdarty między duszą upodabniającą go do aniołów a ciałem przybliżającym go do zwierząt. Dusza była nieśmiertelna i ważniejsza, ciało zniszczalne - należało je umartwiać. Człowiek wiecznie miotał się między dobrem a złem.",
        keyWords: ["dusza", "ciało", "tragizm", "dualizm", "umartwianie"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz główne założenia tomizmu.",
      content: {
        instruction:
          "Wyjaśnij, jak tomizm pojmował człowieka i poznanie. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie równości ciała i duszy (1 pkt)",
          "wyjaśnienie roli rozumu w poznaniu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Tomizm głosił, że świat jest logiczny i racjonalny, przejawem mądrości Boga. Człowiek to najniższy z duchów, składa się z ciała i duszy - oba pochodzą od Boga i są równie ważne. Poznanie dokonuje się przez rozum i wiarę - nie wykluczają się, lecz uzupełniają. Rozum i cnota to wrodzone dary boże. Bóg ustalił porządek między stworzeniami.",
        keyWords: [
          "ciało i dusza",
          "rozum",
          "wiara",
          "drabina bytów",
          "harmonia",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Wyjaśnij, czym charakteryzował się franciszkanizm.",
      content: {
        instruction: "Opisz główne idee filozofii św. Franciszka. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "miłość do natury i wszystkich stworzeń (1 pkt)",
          "ubóstwo bez umartwiania ciała (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Franciszkanizm propagował wszechogarniającą miłość do świata i wszystkich stworzeń Bożych - ludzi, zwierząt, roślin. Św. Franciszek nawet zwierzęta nazywał braćmi mniejszymi. Filozofia ta głosiła prostą i szczerą wiarę, miłosierdzie, pokórę i ubóstwo. W przeciwieństwie do augustynizmu nie praktykował umartwiania ciała - chodziło o minimalizm i ofiarność wobec innych.",
        keyWords: [
          "miłość do natury",
          "wszystkie stworzenia",
          "ubóstwo",
          "miłosierdzie",
          "brak umartwiania",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz motyw 'danse macabre' i jego znaczenie.",
      content: {
        instruction:
          "Wyjaśnij, co przedstawiał taniec śmierci i jaką niosł wymowę. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "opis przedstawienia śmierci tańczącej ze wszystkimi (1 pkt)",
          "wymowa - równość wobec śmierci (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Danse macabre (taniec śmierci) to średniowieczny motyw przedstawiający śmierć jako rozkładający się trup kobiety lub szkielet z kosą. Śmierć zapraszała do korowodu wszystkich ludzi bez względu na stan społeczny, wykształcenie czy majątek. Motyw ten symbolizował, że wobec śmierci wszyscy są równi - jedyną sprawiedliwość w świecie feudalnym. Przypominał o przemijaniu - memento mori.",
        keyWords: [
          "śmierć",
          "taniec",
          "równość",
          "wszystkie stany",
          "przemijanie",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij, dlaczego większość utworów średniowiecznych była anonimowa.",
      content: {
        instruction:
          "Opisz przyczynę anonimowości dzieł średniowiecznych. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie teocentryzmu jako przyczyny (1 pkt)",
          "wyjaśnienie tworzenia ku chwale Boga (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Utwory były anonimowe, ponieważ tworzono je na chwałę Bożą - Ad maiorem Dei gloriam, a nie dla ziemskiej sławy autora. Zgodnie z teocentryzmem Bóg był w centrum zainteresowań, dlatego twórcy nie podpisywali swoich dzieł, nie chcieli zdobywać sławy wśród ludzi. Liczyło się tylko zbawienie duszy i służba Bogu.",
        keyWords: [
          "teocentryzm",
          "chwała Boża",
          "brak sławy",
          "zbawienie",
          "służba Bogu",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Scharakteryzuj wzorzec rycerza chrześcijańskiego.",
      content: {
        instruction:
          "Opisz cechy idealnego rycerza średniowiecznego. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie cnót rycerskich (honor, odwaga) (1 pkt)",
          "podkreślenie wiary i służby Bogu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Rycerz chrześcijański był wzorem cnót - głęboko wierzący, odważny, honorowy i wierny. Całe życie podporządkowywał Bogu i swojemu władcy, kierując się zasadą: Bóg, Honor, Ojczyzna. Walczył w obronie wiary chrześcijańskiej, bronił słabszych. Charakteryzowały go: męstwo, szlachetność, lojalność wobec króla i Boga, gotowość do poświęcenia za wiarę.",
        keyWords: [
          "odwaga",
          "honor",
          "wiara",
          "lojalność",
          "obrona chrześcijaństwa",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz wzorzec doskonałego władcy w średniowieczu.",
      content: {
        instruction:
          "Wyjaśnij, jakie cechy miał idealny władca średniowieczny. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie cech władcy (mądrość, sprawiedliwość) (1 pkt)",
          "podkreślenie roli Boga i troski o poddanych (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Doskonały władca był następcą Boga na ziemi. Wszystkie jego działania miały na celu dobro ojczyzny i poddanych. Charakteryzowały go: mądrość, roztropność, sprawiedliwość, honor i wierność. Cenił lojalność poddanych. Miał kontakt z Bogiem poprzez sny i widzenia, dzięki czemu podejmował trafne decyzje. Był waleczny, pobożny i opiekuńczy wobec swoich ludzi.",
        keyWords: [
          "następca Boga",
          "sprawiedliwość",
          "mądrość",
          "dobro poddanych",
          "kontakt z Bogiem",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Wyjaśnij, co to jest misterium i jaką pełniło funkcję.",
      content: {
        instruction:
          "Opisz gatunek misterium i jego znaczenie w kulturze średniowiecznej. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja misterium jako dramatu religijnego (1 pkt)",
          "wskazanie funkcji dydaktycznej i religijnej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Misterium to średniowieczny dramat religijny, którego treść czerpana była ze Starego i Nowego Testamentu. Wystawiano je podczas uroczystości religijnych, głównie Wielkiego Tygodnia. Miały charakter dydaktyczny - uczyły prawd wiary i zasad moralnych. Dla analfabetów były sposobem poznania Biblii. Łączyły funkcję religijną z rozrywkową, angażując całą społeczność.",
        keyWords: [
          "dramat religijny",
          "Biblia",
          "dydaktyzm",
          "uroczystości",
          "nauka wiary",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz, czym był moralitet i jaka była jego budowa.",
      content: {
        instruction:
          "Wyjaśnij charakterystykę moralitetu jako gatunku. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja moralitetu jako dramatu dydaktycznego (1 pkt)",
          "wskazanie alegorycznej walki dobra ze złem (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Moralitet to średniowieczny dramat o charakterze dydaktyczno-moralizatorskim. Jego bohaterem był przeciętny człowiek (Każdy/Jedermann). Przedstawiał walkę dobra i zła o ludzką duszę - dobro reprezentował anioł, zło diabeł. Postacie były alegoryczne, symbolizowały cnoty i przywary. Celem było pouczenie widzów o konsekwencjach grzechu i znaczeniu cnót dla zbawienia duszy.",
        keyWords: [
          "dramat dydaktyczny",
          "Każdy",
          "alegoria",
          "dobro i zło",
          "cnoty i przywary",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Wyjaśnij, czym różnił się mirakl od misterium.",
      content: {
        instruction: "Porównaj oba gatunki dramatyczne. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie tematyki misterium (Biblia) (1 pkt)",
          "wskazanie tematyki miraklu (cuda świętych) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Misterium to dramat oparty na motywach biblijnych ze Starego i Nowego Testamentu. Mirakl natomiast przedstawiał życie Matki Boskiej, świętych i męczenników. Charakterystyczną cechą miraklu było ukazywanie licznych cudów i interwencji boskich. Oba gatunki miały charakter religijny i dydaktyczny, ale czerpały z różnych źródeł i prezentowały różne postacie.",
        keyWords: ["misterium", "Biblia", "mirakl", "święci", "cuda"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz charakter średniowiecznych kronik.",
      content: {
        instruction:
          "Wyjaśnij, jakie cechy miały kroniki średniowieczne. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie dydaktyzmu i panegiryzmu (1 pkt)",
          "wskazanie braku krytycyzmu i elementów fikcyjnych (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Kroniki średniowieczne miały charakter panegiryczny - służyły wychwalaniu władców, często powstawały na ich zamówienie. Były dydaktyczne i moralizatorskie. Cechował je brak krytycyzmu - zawierały legendy i podania traktowane jako prawda historyczna, elementy fikcyjne jak listy czy pieśni. Pisane były po łacinie, kunsztownym stylem bogatym w środki artystyczne.",
        keyWords: [
          "panegiryzm",
          "dydaktyzm",
          "brak krytycyzmu",
          "legendy",
          "łacina",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Wyjaśnij, co oznacza pojęcie 'chanson de geste'.",
      content: {
        instruction: "Opisz ten gatunek literacki i jego cechy. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja jako pieśń o czynach (1 pkt)",
          "wskazanie bohaterskich czynów rycerzy (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Chanson de geste to francuskie określenie oznaczające 'pieśń o czynach'. Był to gatunek epicki - dłuższe poematy wierszowane opiewające bohaterskie czyny legendarnych lub historycznych rycerzy. Charakteryzował się patetycznym stylem, idealizacją bohaterów, rozbudowanymi opisami bitew. Propagował ideały rycerskie: honor, odwagę, wierność władcy i wiarę.",
        keyWords: [
          "pieśń o czynach",
          "epos",
          "rycerze",
          "bohaterskie czyny",
          "ideały",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz motyw 'psychomachii' w kulturze średniowiecznej.",
      content: {
        instruction:
          "Wyjaśnij, czym była psychomachia i kiedy się odbywała. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja jako walki o duszę (1 pkt)",
          "wskazanie momentu przed śmiercią (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Psychomachia to motyw walki dobra ze złem o duszę człowieka. Odbywała się tuż przed śmiercią - demony i anioły walczyły o to, gdzie dusza trafi po śmierci. Człowiek był kuszony przez demony i wspierany przez aniołów. Ostateczna decyzja zależała od jego wyborów. Motyw ten podkreślał znaczenie cnót i grzechów dla zbawienia.",
        keyWords: [
          "walka o duszę",
          "przed śmiercią",
          "anioły i demony",
          "dobro i zło",
          "zbawienie",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Wyjaśnij znaczenie łaciny w kulturze średniowiecznej.",
      content: {
        instruction:
          "Opisz rolę języka łacińskiego w średniowieczu. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie łaciny jako języka nauki i Kościoła (1 pkt)",
          "podkreślenie uniwersalnego charakteru łaciny (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Łacina była uniwersalnym językiem średniowiecznej Europy. Stanowiła język nauki, literatury, Kościoła i wykształconych warstw społecznych. Wszystkie ważne dokumenty, kroniki, teksty teologiczne i filozoficzne pisano po łacinie. Dzięki temu uczeni z całej Europy mogli się komunikować i wymieniać wiedzą. Łacina była podstawą edukacji i symbolem uniwersalizmu średniowiecznego.",
        keyWords: [
          "uniwersalny język",
          "nauka",
          "Kościół",
          "komunikacja",
          "edukacja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz system feudalny panujący w średniowieczu.",
      content: {
        instruction:
          "Wyjaśnij, na czym polegał feudalizm i jaka była hierarchia społeczna. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wyjaśnienie systemu lennego (1 pkt)",
          "opisanie hierarchii społecznej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Feudalizm to średniowieczny system społeczno-gospodarczy oparty na hierarchii lennej i zależnościach wasalnych. Ziemia należała do panów feudalnych, chłopi musieli odpracowywać pańszczyznę. Hierarchia: na szczycie duchowieństwo i szlachta, niżej mieszczanie i rzemieślnicy, na dole chłopi. System oparty był na zależnościach osobistych, przysięgach wierności i zobowiązaniach wzajemnych między panem a wasalem.",
        keyWords: ["hierarchia", "lenna", "pańszczyzna", "wasal", "zależności"],
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Który filozof średniowieczny stworzył ontologiczny dowód na istnienie Boga?",
      content: {
        options: [
          "św. Tomasz z Akwinu",
          "św. Augustyn",
          "św. Anzelm z Canterbury",
          "Piotr Abelard",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Św. Anzelm z Canterbury stworzył ontologiczny dowód na istnienie Boga, argumentując, że Bóg jako byt najdoskonalszy musi istnieć, bo istnienie jest doskonałością.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Co oznacza łacińskie wyrażenie 'vanitas vanitatum et omnia vanitas'?",
      content: {
        options: [
          "pamiętaj o śmierci",
          "wszystko przemija",
          "marność nad marnościami i wszystko marność",
          "w zdrowym ciele zdrowy duch",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Vanitas vanitatum et omnia vanitas to cytat z Księgi Koheleta oznaczający 'marność nad marnościami i wszystko marność' - kluczowe hasło średniowiecza o przemijaniu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Jak nazywa się filozoficzny spór w średniowieczu dotyczący natury pojęć ogólnych?",
      content: {
        options: [
          "spór o uniwersalia",
          "spór o inwestyturę",
          "querelle des anciens et des modernes",
          "disputatio",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Spór o uniwersalia to wielki średniowieczny spór filozoficzny między realizmem a nominalizmem dotyczący tego, czy pojęcia ogólne istnieją realnie, czy tylko jako nazwy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest tympanon w architekturze romańskiej?",
      content: {
        options: [
          "wysoki filar",
          "sklepienie krzyżowe",
          "półkoliste pole nad portalem z rzeźbami",
          "okrągłe okno",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tympanon to półkoliste lub trójkątne pole nad portalem wejściowym, bogato zdobione rzeźbami religijnymi, charakterystyczne dla architektury romańskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Co oznaczała koncepcja 'drabiny bytów' w filozofii tomistycznej?",
      content: {
        options: [
          "wszyscy ludzie są równi",
          "każde stworzenie ma swoje miejsce w hierarchii od materii po Boga",
          "człowiek może awansować społecznie",
          "aniołowie są najważniejszymi bytami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Drabina bytów (scala naturae) to koncepcja tomistyczna hierarchii stworzeń od materii nieożywionej przez rośliny, zwierzęta, ludzi, aniołów aż po Boga jako szczyt.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to są łuki przyporowe w architekturze gotyckiej?",
      content: {
        options: [
          "łuki wewnątrz budowli",
          "zewnętrzne konstrukcje wzmacniające mury",
          "elementy dekoracyjne",
          "rodzaj sklepienia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Łuki przyporowe to charakterystyczne dla gotyku zewnętrzne konstrukcje wsporcze, które przejmowały ciężar wysokich ścian i pozwalały na cieńsze mury i większe okna.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Jaki rodzaj sklepienia charakteryzował architekturę gotycką?",
      content: {
        options: [
          "sklepienie kolebkowe",
          "sklepienie krzyżowe",
          "sklepienie krzyżowo-żebrowe",
          "kopuła",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Gotyk charakteryzuje się sklepieniem krzyżowo-żebrowym, które było lżejsze niż romańskie i pozwalało na budowanie wyższych konstrukcji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizowała czerwień w średniowiecznej symbolice barw?",
      content: {
        options: [
          "czystość i niewinność",
          "mądrość i wiedzę",
          "męczeństwo, krew Chrystusa i miłość",
          "nadzieję i życie wieczne",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W symbolice średniowiecznej czerwień oznaczała męczeństwo, krew Chrystusa, miłość bożą oraz ofiarę i poświęcenie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizowała biel w średniowiecznej symbolice kolorów?",
      content: {
        options: [
          "śmierć i żałobę",
          "bogactwo i władzę",
          "czystość, niewinność i świętość",
          "mądrość i prawdę",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Biel w średniowieczu symbolizowała czystość, niewinność, świętość i triumf. Była kolorem Chrystusa Zmartwychwstałego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza pojęcie 'iluminacja' w filozofii augustyńskiej?",
      content: {
        options: [
          "zdobienie ksiąg miniaturami",
          "boże oświecenie umożliwiające poznanie prawdy",
          "światło w katedrach",
          "ceremonię religijną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Iluminacja w augustynizmie to boże oświecenie - poznanie prawdy nie dokonuje się przez rozum, ale przez Boga, który oświeca umysł człowieka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest apsyda w architekturze romańskiej?",
      content: {
        options: [
          "wieża kościelna",
          "portal wejściowy",
          "podwyższona, półkolista absyda za ołtarzem",
          "sklepienie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Apsyda to charakterystyczne dla romańskiej architektury podwyższone, półkoliste zakończenie nawy głównej za ołtarzem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Który doktryna filozoficzna głosiła, że prawda nie sprzeciwia się wierze?",
      content: {
        options: ["augustynizm", "franciszkanizm", "nominalizm", "tomizm"],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Tomizm głosił, że wiara i rozum się uzupełniają - prawda poznana rozumem nie może być sprzeczna z prawdą objawioną przez wiarę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest miniaturaświetokrzyska?",
      content: {
        options: [
          "mała rzeźba",
          "iluminacja - ozdoba rękopiśmienna ze złotem i kolorami",
          "typ architektury",
          "gatunek literacki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Miniatura to kunsztowna iluminacja - ozdoba manuskryptów złotem, srebrem i jaskrawymi kolorami, często przedstawiająca sceny religijne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza termin 'amor courtois' w kulturze średniowiecznej?",
      content: {
        options: [
          "miłość małżeńska",
          "miłość dworska - wyidealizowana, niespełniona",
          "miłość rodzicielska",
          "miłość do Boga",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Amor courtois (miłość dworska) to średniowieczny model miłości rycerza do nieosiągalnej damy, pełnej szacunku, adoracji i cierpienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował złoty kolor w sztuce średniowiecznej?",
      content: {
        options: [
          "bogactwo materialne",
          "doskonałość boską, światło i chwałę niebieską",
          "władze królewską",
          "mądrość ludzką",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Złoto symbolizowało doskonałość istoty boskiej, światło boskie, chwałę niebieską i wieczność - było najcenniejszym kolorem w sztuce średniowiecza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest fiale w architekturze gotyckiej?",
      content: {
        options: [
          "okrągłe okno",
          "ostrosłupowa wieżyczka zdobnicza",
          "portal wejściowy",
          "łuk przporowy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fiale to charakterystyczne dla gotyku smukłe, ostrosłupowe wieżyczki pełniące funkcję dekoracyjną, podkreślające strzelistość budowli.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest wimperga w architekturze gotyckiej?",
      content: {
        options: [
          "ostrosłupowy szczyt nad portalem lub oknem",
          "rodzaj sklepienia",
          "wieża kościelna",
          "witraż",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Wimperga to ostrosłupowy, bogato rzeźbiony szczyt umieszczany nad portalami i oknami w architekturze gotyckiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Jaki był główny przedmiot sporu między nominalizmem a realizmem?",
      content: {
        options: [
          "natura Boga",
          "istnienie duszy",
          "czy pojęcia ogólne (universalia) istnieją realnie",
          "relacja wiary i rozumu",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Spór dotyczył natury pojęć ogólnych: realiści twierdzili, że universalia istnieją realnie, nominaliści - że są tylko nazwami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizowała lilia w ikonografii średniowiecznej?",
      content: {
        options: [
          "mądrość",
          "czystość i dziewictwo Maryi",
          "męczeństwo",
          "zmartwychwstanie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Lilia była atrybutem Matki Boskiej i symbolizowała czystość, dziewictwo, niewinność - często pojawia się w scenie Zwiastowania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza pojęcie 'teodycea' w filozofii średniowiecznej?",
      content: {
        options: [
          "dowód na istnienie Boga",
          "usprawiedliwienie Boga wobec istnienia zła",
          "nauka o Trójcy Świętej",
          "teoria poznania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Teodycea to próba usprawiedliwienia Boga wobec istnienia zła w świecie - problem, z którym borykali się filozofowie średniowieczni.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizowała róża w symbolice średniowiecznej?",
      content: {
        options: [
          "tylko miłość ziemską",
          "grzech i pokusę",
          "miłość boską, tajemnicę i męczeństwo",
          "bogactwo",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Róża symbolizowała miłość boską (czerwona róża), czystość Maryi (biała róża), tajemnicę wiary i męczeństwo (ciernie).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest mandorla w ikonografii średniowiecznej?",
      content: {
        options: [
          "korona świętych",
          "migdałowata aureola wokół całej postaci",
          "krzyż",
          "księga",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mandorla (z wł. migdał) to migdałowata aureola otaczająca całą postać Chrystusa lub świętych, symbolizująca chwałę i świętość.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest kazuistyka w średniowiecznej teologii?",
      content: {
        options: [
          "nauka o świętach",
          "rozstrzyganie przypadków moralnych przez analizę szczegółową",
          "liturgia",
          "teoria poznania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kazuistyka to metoda rozstrzygania konkretnych przypadków moralnych przez szczegółową analizę okoliczności - ważna w średniowiecznej teologii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza termin 'hylomorfizm' w filozofii tomistycznej?",
      content: {
        options: [
          "teoria o duszy",
          "teoria o złożeniu wszystkich bytów z materii i formy",
          "dowód na istnienie Boga",
          "teoria poznania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hylomorfizm (z gr. hyle - materia, morphe - forma) to tomistyczna teoria głosząca, że każdy byt składa się z materii i formy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował pelikan w ikonografii chrześcijańskiej?",
      content: {
        options: [
          "zmartwychwstanie",
          "Chrystusa karmiącego wiernych własną krwią - ofiara eucharystyczna",
          "Ducha Świętego",
          "grzech",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pelikan symbolizował Chrystusa - według legendy pelikan karmi pisklęta własną krwią, co odnosi się do ofiary Chrystusa i Eucharystii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest quodlibet w średniowiecznej scholastyce?",
      content: {
        options: [
          "rodzaj kazania",
          "dysputacja na dowolny temat zadany przez audytorium",
          "gatunek literacki",
          "ceremonia religijna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Quodlibet (łac. 'co się podoba') to specjalna dysputacja uniwersytecka, podczas której mistrz odpowiadał na pytania zadane przez audytorium.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował feniks w średniowiecznej symbolice?",
      content: {
        options: [
          "wieczność Boga",
          "zmartwychwstanie Chrystusa",
          "grzech",
          "mądrość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Feniks - mityczny ptak odradzający się z popiołów - symbolizował zmartwychwstanie Chrystusa i życie wieczne po śmierci.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co oznacza pojęcie 'exemplum' w literaturze średniowiecznej?",
      content: {
        options: [
          "gatunek dramatu",
          "krótkie opowiadanie pouczające w kazaniu",
          "typ kroniki",
          "forma modlitwy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Exemplum to krótkie opowiadanie o charakterze moralizatorskim wplatane w kazania dla zilustrowania nauki i utrwalenia przesłania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest bazylikowy układ kościoła?",
      content: {
        options: [
          "kościół z jedną nawą",
          "kościół z nawą główną wyższą od naw bocznych",
          "kościół okrągły",
          "kościół na planie krzyża greckiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Układ bazylikowy to rozwiązanie, w którym nawa główna jest wyższa i szersza od naw bocznych - charakterystyczne dla architektury romańskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co głosił nominalizm w sporze o uniwersalia?",
      content: {
        options: [
          "pojęcia ogólne istnieją realnie",
          "pojęcia ogólne to tylko nazwy nadane przez umysł",
          "pojęcia ogólne są w Bogu",
          "pojęcia ogólne nie istnieją",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Nominalizm (od łac. nomen - nazwa) głosił, że universalia to tylko nazwy, flatus vocis - twory umysłu, nie mają realnego istnienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował agnus Dei (baranek Boży) w ikonografii?",
      content: {
        options: [
          "niewinność ludzką",
          "Chrystusa jako ofiarę za grzechy świata",
          "pokój",
          "potęgę Kościoła",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Agnus Dei (Baranek Boży) symbolizował Chrystusa jako ofiarę paschalną złożoną za grzechy świata - nawiązanie do ofiar Starego Testamentu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest krucjata dziecięca?",
      content: {
        options: [
          "mit literacki",
          "tragiczne wydarzenie z 1212 roku - dzieci wyruszające do Ziemi Świętej",
          "rodzaj kazania",
          "gatunek dramatu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Krucjata dziecięca (1212) to tragiczne wydarzenie, gdy tysiące dzieci wyruszyło do Ziemi Świętej - większość zginęła lub została sprzedana w niewolę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował winorośl w symbolice chrześcijańskiej?",
      content: {
        options: [
          "bogactwo",
          "Chrystusa i wiernych jako latorośle - jedność Kościoła",
          "grzech",
          "mądrość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Winorośl symbolizowała Chrystusa jako prawdziwą winorośl, a wiernych jako latorośle - jedność mistycznego ciała Kościoła (J 15,1-5).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest krypta w architekturze średniowiecznej?",
      content: {
        options: [
          "wieża kościelna",
          "podziemna kaplica z grobami świętych",
          "zakrystia",
          "chór",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Krypta to podziemna część kościoła, gdzie przechowywano relikwie świętych i grzebano dostojników kościelnych - miejsce pielgrzymek.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest klasztor typu benedyktyńskiego?",
      content: {
        options: [
          "klasztor miejski",
          "samotnia pustelnicza",
          "klasztor-opactwo z życiem wspólnotowym według reguły",
          "klasztor żebraczego zakonu",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Klasztor benedyktyński to opactwo z życiem wspólnotowym według reguły 'ora et labora' - modlitwa i praca, samowystarczalny organizm.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest scriptorium?",
      content: {
        options: [
          "biblioteka klasztorna",
          "pracownia pisarska w klasztorze, gdzie przepisywano księgi",
          "refektarz",
          "kaplica",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scriptorium to klasztorna pracownia pisarska, gdzie mnisi kopiowali i iluminowali manuskrypty - centra zachowania kultury antycznej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował gołąb w ikonografii chrześcijańskiej?",
      content: {
        options: ["pokój ziemski", "Ducha Świętego", "niewinność", "nadzieję"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Gołąb symbolizował Ducha Świętego - nawiązanie do Chrztu Chrystusa w Jordanie i Zesłania Ducha Świętego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest reguła zakonna?",
      content: {
        options: [
          "zbiór praw państwowych",
          "zbiór przepisów regulujących życie zakonne",
          "kodeks rycerski",
          "księga liturgiczna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Reguła zakonna to zbiór przepisów regulujących życie duchowe i codzienne zakonu - np. reguła św. Benedykta, św. Franciszka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował oliwnik w symbolice biblijnej?",
      content: {
        options: ["wojnę", "pokój i pojednanie z Bogiem", "bogactwo", "śmierć"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oliwnik (drzewo oliwne) symbolizował pokój, pojednanie z Bogiem i błogosławieństwo - gałązka oliwna przyniesiona przez gołębia do Noego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest antyfona w liturgii średniowiecznej?",
      content: {
        options: [
          "rodzaj kazania",
          "krótka pieśń liturgiczna śpiewana naprzemiennie",
          "modlitwa",
          "gest liturgiczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antyfona to krótka pieśń liturgiczna śpiewana przed i po psalmie, wykonywana naprzemiennie przez dwa chóry lub solistę i chór.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Co symbolizowały cztery cnoty kardynalne w filozofii średniowiecznej?",
      content: {
        options: [
          "cztery kierunki świata",
          "roztropność, sprawiedliwość, męstwo, umiarkowanie",
          "cztery żywioły",
          "cztery ewangeliści",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Cztery cnoty kardynalne to: roztropność (prudentia), sprawiedliwość (iustitia), męstwo (fortitudo) i umiarkowanie (temperantia) - podstawy życia moralnego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest palimpsest?",
      content: {
        options: [
          "rodzaj pergaminu",
          "rękopis, z którego zeskrobano tekst i zapisano nowy",
          "typ iluminacji",
          "gatunek literacki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Palimpsest to pergamin, z którego zeskrobano starszy tekst i zapisano nowy - praktyka z powodu kosztowności pergaminu, prowadząca do utraty dzieł antycznych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizował wąż w ikonografii średniowiecznej?",
      content: {
        options: [
          "mądrość",
          "Szatana, grzech pierworodny i pokusę",
          "medycynę",
          "życie wieczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wąż symbolizował przede wszystkim Szatana, grzech pierworodny i pokusę - nawiązanie do upadku w raju.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest brewiarz?",
      content: {
        options: [
          "księga do nauki",
          "księga zawierająca oficjum - modlitwy brewiarzowe",
          "kronika",
          "zbiór kazań",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Brewiarz to księga liturgiczna zawierająca oficjum - cykl modlitw odmawianym przez duchownych w ciągu dnia (jutrznia, nieszpory itp.).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest transept w architekturze kościelnej?",
      content: {
        options: [
          "wieża",
          "nawa poprzeczna tworząca ramiona krzyża",
          "apsyda",
          "krypta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Transept to nawa poprzeczna w kościele na planie krzyża łacińskiego, przecinająca nawę główną i tworzącą ramiona krzyża.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co to jest kodeks średniowieczny?",
      content: {
        options: [
          "zbiór praw",
          "książka rękopiśmienna w formie zeszytu",
          "kronika",
          "rodzaj kazania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kodeks to średniowieczna książka rękopiśmienna w formie zszytychi zeszytu kart pergaminowych lub papierowych - zastąpił zwój.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Co symbolizowały siedem grzechów głównych?",
      content: {
        options: [
          "siedem dni tygodnia",
          "pycha, chciwość, zazdrość, gniew, nieczystość, łakomstwo, lenistwo",
          "siedem sakramentów",
          "siedem cnót",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Siedem grzechów głównych to: pycha (superbia), chciwość (avaritia), zazdrość (invidia), gniew (ira), nieczystość (luxuria), łakomstwo (gula), lenistwo (acedia).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj średniowieczne symbole do ich znaczeń.",
      content: {
        matchingType: "symbols_meanings",
        leftColumn: [
          { id: "A", text: "Pelikan" },
          { id: "B", text: "Feniks" },
          { id: "C", text: "Agnus Dei" },
          { id: "D", text: "Winorośl" },
        ],
        rightColumn: [
          { id: 1, text: "Chrystus jako ofiara za grzechy" },
          { id: 2, text: "zmartwychwstanie" },
          { id: 3, text: "ofiara eucharystyczna" },
          { id: 4, text: "jedność Kościoła" },
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
          "Pelikan - ofiara eucharystyczna, feniks - zmartwychwstanie, agnus Dei - ofiara za grzechy, winorośl - jedność Kościoła.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj filozofów do ich głównych koncepcji.",
      content: {
        matchingType: "philosophers_concepts",
        leftColumn: [
          { id: "A", text: "Św. Augustyn" },
          { id: "B", text: "Św. Tomasz" },
          { id: "C", text: "Św. Anzelm" },
          { id: "D", text: "Wilhelm Ockham" },
        ],
        rightColumn: [
          { id: 1, text: "ontologiczny dowód na istnienie Boga" },
          { id: 2, text: "iluminacja i przewaga duszy nad ciałem" },
          { id: 3, text: "nominalizm" },
          { id: 4, text: "hylomorfizm i drabina bytów" },
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
          "Augustyn - iluminacja, Tomasz - hylomorfizm, Anzelm - dowód ontologiczny, Ockham - nominalizm.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      question:
        "Które elementy należały do siedmiu sztuk wyzwolonych - triwium? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "gramatyka",
          "dialektyka (logika)",
          "retoryka",
          "arytmetyka",
          "geometria",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Triwium (niższy poziom) obejmowało: gramatykę, dialektykę i retorykę. Arytmetyka i geometria należały do quadrivium.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      question:
        "Które elementy należały do siedmiu sztuk wyzwolonych - quadrivium? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "arytmetyka",
          "muzyka",
          "geometria",
          "astronomia",
          "retoryka",
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          "Quadrivium (wyższy poziom) obejmowało: arytmetykę, muzykę, geometrię i astronomię. Retoryka należała do triwium.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj kolory do ich symboliki w średniowieczu.",
      content: {
        matchingType: "colors_symbolism",
        leftColumn: [
          { id: "A", text: "Złoto" },
          { id: "B", text: "Biel" },
          { id: "C", text: "Czerwień" },
          { id: "D", text: "Błękit" },
        ],
        rightColumn: [
          { id: 1, text: "czystość i niewinność" },
          { id: 2, text: "niebiański, duchowość, Maryja" },
          { id: 3, text: "doskonałość boska" },
          { id: 4, text: "męczeństwo i miłość" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Złoto - doskonałość boska, biel - czystość, czerwień - męczeństwo, błękit - duchowość i Maryja.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      question:
        "Które cechy charakteryzują scholastykę? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "racjonalne wyjaśnianie prawd wiary",
          "odrzucenie rozumu",
          "precyzyjne wywody logiczne",
          "dystans do Arystotelesa",
          "metoda pytań i odpowiedzi",
        ],
      },
      correctAnswer: [0, 2, 4],
      metadata: {
        explanation:
          "Scholastyka charakteryzowała się: racjonalnym wyjaśnianiem prawd wiary, precyzyjnymi wywodami logicznymi i metodą pytań-odpowiedzi. Korzystała z Arystotelesa.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Uzupełnij informacje o architekturze średniowiecznej.",
      content: {
        textWithGaps:
          "W stylu romańskim dominował łuk [1], budowle miały [2] mury. W gotyku stosowano łuk [3] i charakterystyczne [4] okna.",
        gaps: [
          {
            id: 1,
            options: ["ostrołukowy", "pełny", "półkolisty", "podkowy"],
          },
          {
            id: 2,
            options: ["cienkie", "szklane", "grube", "drewniane"],
          },
          {
            id: 3,
            options: ["półkolisty", "ostrołukowy", "pełny", "płaski"],
          },
          {
            id: 4,
            options: ["małe", "witrażowe", "okrągłe", "kwadratowe"],
          },
        ],
      },
      correctAnswer: [2, 2, 1, 1],
      metadata: {
        explanation:
          "Romanizm: łuk półkolisty i grube mury. Gotyk: łuk ostrołukowy i witrażowe okna.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      question: "Dopasuj zakony do ich charakterystyki.",
      content: {
        matchingType: "orders_characteristics",
        leftColumn: [
          { id: "A", text: "Benedyktyni" },
          { id: "B", text: "Franciszkanie" },
          { id: "C", text: "Dominikanie" },
          { id: "D", text: "Cystersi" },
        ],
        rightColumn: [
          { id: 1, text: "ora et labora - modlitwa i praca" },
          { id: 2, text: "zakon kaznodziejski walczący z herezją" },
          { id: 3, text: "zakon żebraczy, ubóstwo" },
          { id: 4, text: "reforma benedyktyńska, praca fizyczna" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 2],
        [2, 1],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Benedyktyni - ora et labora, franciszkanie - ubóstwo, dominikanie - kaznodzieje, cystersi - reforma benedyktyńska.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij różnicę między realizmem a nominalizmem w średniowiecznym sporze o uniwersalia.",
      content: {
        instruction: "Opisz stanowiska obu stron sporu. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wyjaśnienie stanowiska realizmu (1 pkt)",
          "wyjaśnienie stanowiska nominalizmu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Spór o uniwersalia dotyczył natury pojęć ogólnych. Realiści (np. św. Anzelm) twierdzili, że universalia - pojęcia ogólne jak 'człowiek', 'dobro' - istnieją realnie, niezależnie od jednostkowych przedmiotów, w umyśle Boga lub w rzeczach. Nominaliści (np. Wilhelm Ockham) głosili, że uniwersalia to tylko nazwy (nomina), flatus vocis - dźwięki nadane przez umysł ludzki, nie mają realnego istnienia. Istnieją tylko konkretne, jednostkowe rzeczy.",
        keyWords: [
          "realizm",
          "nominalizm",
          "pojęcia ogólne",
          "istnienie realne",
          "nazwy",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Opisz znaczenie symboliki światła w architekturze i teologii gotyckiej.",
      content: {
        instruction:
          "Wyjaśnij, jaką rolę pełniło światło w kulturze gotyku. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie symboliki światła jako Boga (1 pkt)",
          "wyjaśnienie roli witraży i architektury (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "W gotyku światło miało fundamentalne znaczenie teologiczne i estetyczne. Symbolizowało Boga, prawdę i boską chwałę. Według opata Sugera światło było najdoskonalszym obrazem Boga - to, co jasne, piękne kojarzono z boskością. Stąd gotycka architektura dążyła do maksymalnego wpuszczenia światła przez wysokie okna witrażowe. Kolorowe światło przenikające przez witraże miało oczyszczać i uświęcać, wprowadzać wiernych w atmosferę sacrum.",
        keyWords: ["światło", "Bóg", "witraże", "sacrum", "piękno"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij koncepcję 'drabiny bytów' w filozofii tomistycznej i jej znaczenie.",
      content: {
        instruction: "Opisz hierarchię bytów według św. Tomasza. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "opisanie hierarchii od materii do Boga (1 pkt)",
          "wyjaśnienie miejsca człowieka i sensu tej koncepcji (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Drabina bytów (scala naturae) to tomistyczna koncepcja hierarchicznego uporządkowania wszechświata. Od dołu: materia nieożywiona, rośliny (życie wegetatywne), zwierzęta (życie zmysłowe), człowiek (rozum i duch - najniższy z duchów), aniołowie (duchy czyste), Bóg na szczycie jako byt najdoskonalszy. Człowiek zajmuje środkowe miejsce - łączy świat materialny i duchowy. Każdy byt ma swoje przeznaczenie - człowiek powinien dążyć do doskonalenia się i wznoszeniapo drabinie ku Bogu.",
        keyWords: [
          "hierarchia",
          "materia",
          "duch",
          "Bóg",
          "człowiek",
          "doskonalenie",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Opisz rolę klasztorów w zachowaniu kultury antycznej i średniowiecznej.",
      content: {
        instruction:
          "Wyjaśnij, jak klasztory chroniły dziedzictwo kulturowe. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie scriptoriów i przepisywania ksiąg (1 pkt)",
          "wyjaśnienie roli edukacyjnej i kulturalnej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Klasztory były głównymi ośrodkami kultury w średniowieczu. W scriptoriach mnisi przepisywali starożytne dzieła oraz teksty religijne, zachowując je dla potomności - często były jedynymi posiadaczami antycznych manuskryptów. Klasztory prowadziły szkoły, biblioteki, były centrami nauki. Benedyktyni realizowali zasadę 'ora et labora' - łączyli pracę intelektualną z duchową. Dzięki klasztorom przetrwała literatura antyczna, rozwijała się filozofia, teologia. To główne centra cywilizacji w mrocznych wiekach.",
        keyWords: [
          "scriptorium",
          "przepisywanie",
          "biblioteki",
          "edukacja",
          "kultura antyczna",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij różnicę między życiem zakonów kontemplacyjnych a żebracych.",
      content: {
        instruction: "Porównaj oba typy życia zakonnego. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "charakterystyka zakonów kontemplacyjnych (1 pkt)",
          "charakterystyka zakonów żebracych (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Zakony kontemplacyjne (np. benedyktyni, cystersi) prowadziły życie w odosobnieniu klasztornym, koncentrowały się na modlitwie, kontemplacji i pracy fizycznej. Realizowały zasadę stabilitas loci - stałego miejsca. Posiadały majątki i były samowystarczalne. Zakony żebracze (franciszkanie, dominikanie) powstałe w XIII w. odrzucały majątek, żyły z jałmużny, aktywnie działały wśród ludzi - głosiły kazania, nauczały, pomagali ubogim. Nie były związane z klasztorem, podróżowały głosząc Ewangelię.",
        keyWords: [
          "kontemplacja",
          "odosobnienie",
          "żebractwo",
          "aktywność",
          "ubóstwo",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question: "Opisz funkcję exemplum w średniowiecznym kaznodziejstwie.",
      content: {
        instruction:
          "Wyjaśnij, czym było exemplum i jaki cel pełniło. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja exemplum jako opowiadania (1 pkt)",
          "wskazanie funkcji dydaktycznej i perswazyjnej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Exemplum to krótkie opowiadanie moralizatorskie wplatane w kazania dla zilustrowania nauki religijnej. Miało przykładowy charakter - pokazywało konsekwencje grzechu lub nagrodę za cnotę. Przez konkretne, często sensacyjne historie było łatwiejsze do zapamiętania niż abstrakcyjne pouczenia. Exempla czyniły kazania bardziej przystępnymi dla prostego ludu, wzmacniały perswazję kaznodziei. Czerpano je z żywotów świętych, legend lub życia codziennego.",
        keyWords: [
          "opowiadanie",
          "kazanie",
          "morał",
          "ilustracja",
          "perswazja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij, na czym polegała średniowieczna metoda scholastyczna i jakie były jej główne cechy.",
      content: {
        instruction:
          "Opisz metodę scholastyczną w filozofii i teologii. (60-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wyjaśnienie metody pytań i odpowiedzi (1 pkt)",
          "wskazanie racjonalnego wyjaśniania wiary (1 pkt)",
          "opisanie struktury dysputy scholastycznej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Scholastyka to średniowieczna metoda filozoficzno-teologiczna polegająca na racjonalnym, logicznym wyjaśnianiu prawd wiary. Wykorzystywała aparat pojęciowy Arystotelesa. Charakteryzowała się precyzyjnymi wywodami, metodą quaestio - stawianiem pytań i poszukiwaniem odpowiedzi przez analizę argumentów za i przeciw. Struktura: 1) postawienie problemu, 2) argumenty przeciwne, 3) sed contra - argument własny, 4) rozwiązanie, 5) odpowiedzi na zarzuty. Hasło: 'credo ut intelligam' - wierzę, aby rozumieć. Scholastyka dążyła do harmonii wiary i rozumu.",
        keyWords: [
          "racjonalizm",
          "pytania",
          "argumenty",
          "logika",
          "wiara i rozum",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Opisz symbolikę czterech ewangelistów w ikonografii średniowiecznej.",
      content: {
        instruction:
          "Wymień symbole ewangelistów i wyjaśnij ich pochodzenie. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wymienienie symboli czterech ewangelistów (1 pkt)",
          "wskazanie pochodzenia z wizji Ezechiela (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Czterech ewangelistów symbolizowały tzw. tetramorf - cztery istoty z wizji proroka Ezechiela i Apokalipsy. Mateusz - anioł (człowiek), bo jego Ewangelia zaczyna się od rodowodu Chrystusa jako człowieka. Marek - lew (symbol królewskości). Łukasz - wół (ofiara), bo zaczyna od ofiary Zachariasza. Jan - orzeł (symbol tego, co boskie i wysokie), bo jego Ewangelia najbardziej teologiczna. Symbole te powszechnie występowały w sztuce średniowiecznej.",
        keyWords: ["Mateusz", "Marek", "Łukasz", "Jan", "tetramorf", "symbole"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij problem teodycei w filozofii średniowiecznej - jak filozofowie rozwiązywali problem istnienia zła.",
      content: {
        instruction:
          "Opisz, jak średniowieczni myśliciele tłumaczyli istnienie zła przy wszechmocnym i dobrym Bogu. (60-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wyjaśnienie problemu teodycei (1 pkt)",
          "przedstawienie rozwiązania augustyńskiego (1 pkt)",
          "wskazanie roli wolnej woli (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Teodycea to próba usprawiedliwienia Boga wobec istnienia zła. Problem: jeśli Bóg jest wszechmocny i dobry, dlaczego istnieje zło? Św. Augustyn twierdził, że zło nie istnieje substancjalnie - jest tylko brakiem dobra (privatio boni), niebytem. Wszystko co Bóg stworzył jest dobre. Zło powstało przez wolną wolę aniołów (upadek Lucyfera) i ludzi (grzech pierworodny). Bóg nie stworzył zła, ale pozwolił na nie, dając stworzeniom wolność. Zło ma też funkcję pedagogiczną - przez kontrast uczy dobra.",
        keyWords: [
          "teodycea",
          "zło",
          "privatio boni",
          "wolna wola",
          "Augustyn",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      question:
        "Opisz koncepcję miłości dworskiej (amor courtois) i jej znaczenie w kulturze średniowiecza.",
      content: {
        instruction:
          "Wyjaśnij, czym charakteryzowała się miłość dworska. (50-70 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "charakterystyka miłości dworskiej (niespełniona, wyidealizowana) (1 pkt)",
          "wskazanie roli w kulturze rycerskiej (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Amor courtois (miłość dworska) to średniowieczny model miłości wykształcony w kulturze trubadurów prowansalskich. Rycerz adorował nieosiągalną damę - zazwyczaj zamężną, wyższej pozycji społecznej. Miłość była platoniczna, nieszczęśliwa, pełna cierpienia i tęsknoty. Dama była niedostępna, ale inspirowała rycerza do wielkich czynów. Model ten gloryfikował kobietę, czynił z miłości drogę doskonalenia. Łączył ars amandi z ars bellandi - miłość i waleczność.",
        keyWords: [
          "nieosiągalna",
          "adoracja",
          "cierpienie",
          "doskonalenie",
          "rycerz i dama",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      question:
        "Wyjaśnij, jak średniowieczna koncepcja czasu różniła się od współczesnej i jakie to miało konsekwencje kulturowe.",
      content: {
        instruction:
          "Opisz średniowieczne postrzeganie czasu i jego wpływ na kulturę. (70-90 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wskazanie różnicy: czas liturgiczny vs linearny (1 pkt)",
          "wyjaśnienie rytmu życia według kalendarza kościelnego (1 pkt)",
          "konsekwencje kulturowe (literatura, sztuka) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "W średniowieczu dominowało sakralne, cykliczne pojmowanie czasu - nie linearny postęp, ale powtarzający się rytm roku liturgicznego. Czas mierzono godzinami kanonicznymi (jutrznia, pryma, nieszpory), dzwonami kościelnymi, nie zegarami mechanicznymi. Życie podporządkowane było kalendarzowi kościelnemu - adwent, Boże Narodzenie, Wielki Post, Wielkanoc. To czas jakościowy, nie ilościowy - święta ważniejsze niż dni powszednie. Konsekwencje: literatura i sztuka koncentrowały się na ponadczasowych prawdach wiary, nie na przemianie historycznej. Historia rozumiana jako realizacja boskiego planu zbawienia.",
        keyWords: [
          "czas liturgiczny",
          "cykliczny",
          "rok kościelny",
          "godziny kanoniczne",
          "sakralny",
        ],
      },
    },

    // =========== KONIEC PYTAŃ ŚREDNIOWIECZE =========== //

    // ============ POCZĄTEK PYTAŃ BAROK (NA RAZIE TYLKO POZIOMY 1 i 2!!!!!!!!!!!!)

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Jakie są ramy czasowe baroku w Europie?",
      content: {
        options: [
          "XV-XVI wiek",
          "XVI-XVII wiek",
          "XVII-XVIII wiek",
          "XVIII-XIX wiek",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Barok w Europie trwał od końca XVI wieku do połowy XVIII wieku (ok. 1600-1750).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Skąd pochodzi nazwa 'barok'?",
      content: {
        options: [
          "od łacińskiego słowa oznaczającego piękno",
          "od portugalskiego określenia nieregularnej perły",
          "od nazwiska artysty",
          "od nazwy miasta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Nazwa 'barok' pochodzi z portugalskiego 'barroco' - nieregularna, dziwaczna perła. Początkowo miała charakter pejoratywny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question:
        "Jaka koncepcja filozoficzna głosiła, że źródłem poznania są zmysły?",
      content: {
        options: ["racjonalizm", "idealizm", "realizm", "sensualizm"],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Sensualizm to kierunek filozoficzny głoszący, że źródłem poznania są zmysły i doświadczenie zmysłowe.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question:
        "Kto stworzył filozofię racjonalizmu opartą na haśle 'Cogito ergo sum'?",
      content: {
        options: ["Kartezjusz (Descartes)", "Pascal", "Spinoza", "Leibniz"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "René Descartes (Kartezjusz) stworzył filozofię racjonalizmu z hasłem 'Cogito ergo sum' - myślę, więc jestem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co oznacza łacińskie wyrażenie 'vanitas'?",
      content: {
        options: ["piękno", "mądrość", "marność", "wieczność"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Vanitas oznacza 'marność' - kluczowe pojęcie baroku wyrażające przekonanie o przemijaniu i marności dóbr doczesnych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co oznacza hasło 'carpe diem'?",
      content: {
        options: [
          "pamiętaj o śmierci",
          "chwytaj dzień, korzystaj z chwili",
          "wszystko przemija",
          "poznaj samego siebie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Carpe diem (łac. 'chwytaj dzień') to hasło epikurejskie nakazujące korzystanie z przyjemności chwili obecnej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co oznacza pojęcie 'theatrum mundi'?",
      content: {
        options: [
          "teatr miejski",
          "teatr dworski",
          "świat jako teatr, życie jako gra pozorów",
          "dramat barokowy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Theatrum mundi (teatr świata) to barokowa koncepcja życia jako teatru, gdzie ludzie odgrywają role, a świat jest pełen pozorów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Jak nazywa się polski nurt ideologiczny baroku?",
      content: {
        options: ["humanizm", "sarmatyzm", "oświecenie", "romantyzm"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sarmatyzm to specyficznie polski nurt ideologiczny baroku, gloryfikujący szlachtę jako potomków starożytnych Sarmatów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Która cecha NIE charakteryzuje baroku?",
      content: {
        options: [
          "kontrast i antyteza",
          "umiłowanie przepychu",
          "prostota i harmonia",
          "paradoks",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Prostota i harmonia charakteryzowały klasycyzm i renesans. Barok cechował się kontrastem, przepychem i złożonością.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest koncept w literaturze barokowej?",
      content: {
        options: [
          "rodzaj wiersza",
          "pomysłowa gra słowna, dowcipne skojarzenie",
          "teoria filozoficzna",
          "gatunek dramatyczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Koncept to charakterystyczny dla baroku pomysłowy zwrot, dowcipne skojarzenie, gra słowna oparta na nieoczekiwanym połączeniu pojęć.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Jaki styl architektoniczny dominował w baroku?",
      content: {
        options: [
          "monumentalny, pełen ozdób i złoceń",
          "surowy i minimalistyczny",
          "prosty i funkcjonalny",
          "asymetryczny i chaotyczny",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Architektura barokowa była monumentalna, bogata w zdobienia, złocenia, rzeźby - miała olśniewać przepychem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest antytet(e)za?",
      content: {
        options: [
          "rodzaj wiersza",
          "zestawienie przeciwieństw",
          "powtórzenie słów",
          "pytanie retoryczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antyteza to figura retoryczna polegająca na zestawieniu przeciwstawnych pojęć - bardzo charakterystyczna dla baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest oksymoron?",
      content: {
        options: [
          "połączenie sprzecznych pojęć",
          "powtórzenie słów",
          "pytanie retoryczne",
          "przesada",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Oksymoron to połączenie sprzecznych, wykluczających się pojęć (np. 'głośna cisza', 'żywy trup') - typowe dla baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest kontrreformacja?",
      content: {
        options: [
          "reforma Kościoła katolickiego",
          "ruch przeciw reformacji protestanckiej",
          "nurt filozoficzny",
          "styl w sztuce",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kontrreformacja to ruch w łonie Kościoła katolickiego mający na celu walkę z reformacją protestancką i odnowę katolicyzmu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Który zakon odegrał kluczową rolę w kontrreformacji?",
      content: {
        options: ["benedyktyni", "franciszkanie", "jezuici", "cystersi"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Jezuici (Towarzystwo Jezusowe założone przez św. Ignacego Loyolę) odegrali kluczową rolę w kontrreformacji, prowadząc szkoły i misje.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest marinizm?",
      content: {
        options: [
          "styl w malarstwie",
          "nurt w literaturze barokowej pełen kunsztu i ozdób słownych",
          "teoria filozoficzna",
          "typ architektury",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Marinizm (od włoskiego poety Marina) to nurt w poezji barokowej charakteryzujący się wyszukanym stylem, koncep­tami i ozdobnością.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest emblematyka w baroku?",
      content: {
        options: [
          "rodzaj malarstwa",
          "połączenie obrazu, motta i komentarza niosące przesłanie moralne",
          "typ architektury",
          "gatunek literacki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Emblematy to charakterystyczne dla baroku kompozycje składające się z obrazu (pictura), sentencji (inscriptio) i komentarza (subscriptio).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest fraszka?",
      content: {
        options: [
          "krótki utwór satyryczny o charakterze żartobliwym",
          "długi poemat epickie",
          "dramat",
          "powieść",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Fraszka to krótki utwór poetycki o charakterze satyrycznym, żartobliwym lub moraliza­torskim - gatunek uprawiany w polskim baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest sonet?",
      content: {
        options: [
          "14-wersowy wiersz o określonym układzie rymów",
          "krótkie opowiadanie",
          "utwór dramatyczny",
          "pieśń ludowa",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Sonet to 14-wersowy wiersz składający się z dwóch czterowierszy i dwóch trójwierszy, o określonym układzie rymów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest oda?",
      content: {
        options: [
          "krótki wiersz satyryczny",
          "uroczysty wiersz pochwalny",
          "utwór dramatyczny",
          "powieść",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oda to uroczysty utwór poetycki o charakterze pochwalnym, wzniosłym, często adresowany do ważnej osoby lub idei.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co charakteryzowało sarmatyzm?",
      content: {
        options: [
          "krytykę szlachty",
          "pochwałę mieszczaństwa",
          "gloryfikację szlachty jako potomków Sarmatów",
          "krytykę Kościoła",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Sarmatyzm gloryfikował polską szlachtę jako potomków starożytnych Sarmatów, podkreślał jej wyjątkowość i cnoty rycerskie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co oznacza pojęcie 'vanitas vanitatum'?",
      content: {
        options: [
          "piękno piękności",
          "marność nad marnościami",
          "chwała chwały",
          "wieczność wieków",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Vanitas vanitatum to łacińskie wyrażenie oznaczające 'marność nad marnościami' - kluczowy motyw barokowy o przemijaniu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Jaka funkcja języka dominowała w literaturze barokowej?",
      content: {
        options: [
          "emotywna",
          "fatyczna",
          "perswazyjna (retoryczna)",
          "poetycka",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W baroku dominowała funkcja perswazyjna - literatura miała przekonywać, wpływać na odbiorcę poprzez retorykę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest trompe-l'oeil w sztuce barokowej?",
      content: {
        options: [
          "rodzaj rzeźby",
          "iluzja optyczna - malarstwo oszukujące oko",
          "typ architektury",
          "technika snycerska",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Trompe-l'oeil (fr. 'oszukanie oka') to technika malarska tworząca iluzję trójwymiarowości - typowa dla baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Co symbolizowała czaszka w malarstwie barokowym?",
      content: {
        options: [
          "mądrość",
          "przemijanie i śmierć",
          "życie wieczne",
          "młodość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Czaszka w malarstwie vanitas symbolizowała śmierć, przemijanie i marność dóbr ziemskich - memento mori.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest alegoreza?",
      content: {
        options: [
          "rodzaj wiersza",
          "interpretacja alegoryczna tekstu",
          "figura retoryczna",
          "gatunek dramatu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Alegoreza to interpretacja tekstu w sposób alegoryczny, poszukiwanie ukrytych, symbolicznych znaczeń - typowa dla baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest hiperbola?",
      content: {
        options: [
          "przesada, wyolbrzymienie",
          "niedopowiedzenie",
          "porównanie",
          "powtórzenie",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Hiperbola to figura retoryczna polegająca na przesadzie, wyolbrzymieniu - bardzo charakterystyczna dla baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Jaki typ miłości propagowano w poezji barokowej?",
      content: {
        options: [
          "tylko platoniczną",
          "tylko zmysłową",
          "zarówno duchową jak i zmysłową - kontrast",
          "tylko małżeńską",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Barok pokazywał dwoistość miłości - kontrast między miłością duchową, platoniczną a zmysłową, cielesną.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest koncetyzm?",
      content: {
        options: [
          "teoria filozoficzna",
          "nadużywanie konceptów, dowcipnych skojarzeń",
          "styl w malarstwie",
          "typ budowli",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Koncetyzm (konceptyzm) to tendencja w literaturze barokowej do nadużywania konceptów - pomysłowych, dowcipnych skojarzeń.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co charakteryzowało barokowe malarstwo iluzjonistyczne?",
      content: {
        options: [
          "realizm fotograficzny",
          "abstrakcję",
          "tworzenie złudzeń przestrzennych na płaskich powierzchniach",
          "minimalizm",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Malarstwo iluzjonistyczne baroku tworzyło złudzenia przestrzenne - np. sklepienia wydające się niebiańskimi przestrzeniami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest silva rerum?",
      content: {
        options: [
          "gatunek poetycki",
          "pamiętnik szlachecki - zbiór różnych zapisków",
          "kronika",
          "dramat",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Silva rerum (łac. 'las rzeczy') to szlachecki pamiętnik-album zawierający różnorodne zapiski, wspomnienia, dokumenty.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest diariusz?",
      content: {
        options: [
          "gatunek dramatu",
          "dziennik, opis wydarzeń z życia autora",
          "poemat epickie",
          "traktat filozoficzny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Diariusz to dziennik, relacja z podróży lub wydarzeń politycznych - gatunek popularny w baroku polskim.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest anachronizm?",
      content: {
        options: [
          "figura retoryczna",
          "błąd chronologiczny - umieszczenie czegoś w niewłaściwej epoce",
          "rodzaj wiersza",
          "styl w sztuce",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Anachronizm to błąd chronologiczny, częsty w baroku - np. przedstawianie postaci antycznych w strojach współczesnych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co oznacza pojęcie 'festina lente'?",
      content: {
        options: [
          "chwytaj dzień",
          "spiesz się powoli",
          "pamiętaj o śmierci",
          "wszystko przemija",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Festina lente (łac. 'spiesz się powoli') to paradoksalne hasło barokowe wyrażające potrzebę rozwagi w działaniu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest petrarkizm w poezji barokowej?",
      content: {
        options: [
          "nurt filozoficzny",
          "tradycja liryki miłosnej nawiązująca do Petrarki",
          "typ budowli",
          "teoria polityczna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Petrarkizm to tradycja liryki miłosnej nawiązująca do poezji Petrarki - idealizacja kobiety, cierpienie miłosne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co charakteryzuje epicką twórczość baroku?",
      content: {
        options: [
          "realizm i prostota",
          "mitologizacja, kontrast komizmu i patosu",
          "obiektywizm",
          "minimalizm stylistyczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Epika barokowa cechowała się mitologizacją, kontraste komizmu i patosu, barokowymi ozdobnikami stylistycznymi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest topos?",
      content: {
        options: [
          "rodzaj wiersza",
          "utarty motyw, schemat literacki",
          "figura retoryczna",
          "gatunek dramatu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Topos to utarty motyw, schemat tematyczny często powtarzający się w literaturze - np. topos vanitas, locus amoenus.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest locus amoenus?",
      content: {
        options: [
          "miejsce straszne",
          "miejsce przyjemne - idealizowany pejzaż sielankowy",
          "miasto",
          "pustkowia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Locus amoenus (łac. 'miejsce przyjemne') to topos literacki - idealizowany krajobraz sielankowy, zazwyczaj miejsce miłosnych spotkań.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest inwokacja w poezji barokowej?",
      content: {
        options: [
          "zakończenie utworu",
          "wezwanie do muz, bóstwa lub osoby o pomoc w tworzeniu",
          "figura retoryczna",
          "typ wiersza",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Inwokacja to wezwanie do muz, bóstwa lub patrona na początku utworu o pomoc i natchnienie w tworzeniu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Który motyw NIE jest typowy dla baroku?",
      content: {
        options: [
          "vanitas - marność",
          "carpe diem - korzystaj z chwili",
          "harmonia i równowaga",
          "theatrum mundi - świat jako teatr",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Harmonia i równowaga są typowe dla renesansu i klasycyzmu, nie dla baroku pełnego kontrastów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co symbolizowały klepsydry w sztuce barokowej?",
      content: {
        options: [
          "mądrość",
          "bogactwo",
          "upływający czas i przemijanie",
          "radość życia",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Klepsydra (zegar piaskowy) symbolizowała upływający czas, przemijanie życia - element malarstwa vanitas.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest panegiryzm?",
      content: {
        options: [
          "krytyka władzy",
          "przesadne wychwalanie, pochlebstwo",
          "obiektywny opis",
          "satyra",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Panegiryzm to przesadne wychwalanie, pochlebstwo - cecha literatury barokowej, szczególnie polskiej (magnackie mecenaty).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Jak nazywano wiersze o tematyce żałobnej w baroku?",
      content: {
        options: ["sielanki", "epitafia", "ody", "hymny"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Epitafium to wiersz żałobny napisany na cześć zmarłego - gatunek popularny w baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest sielanka?",
      content: {
        options: [
          "wiersz satyryczny",
          "utwór przedstawiający idealizowane życie pasterskie",
          "dramat",
          "pieśń religijna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sielanka to gatunek literacki przedstawiający idealizowane, spokojne życie pasterzy na łonie natury.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest enargeia?",
      content: {
        options: [
          "figura retoryczna",
          "obrazowość, plastyczność opisu",
          "rodzaj wiersza",
          "teoria filozoficzna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Enargeia to obrazowość, plastyczność opisu - cecha charakterystyczna barokowej retoryki mająca wywołać wrażenie 'widzenia' sceny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest apoftegmat?",
      content: {
        options: [
          "krótkie, trafne powiedzenie, sentencja",
          "długi poemat",
          "dramat",
          "powieść",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Apoftegmat to krótkie, trafne powiedzenie, sentencja zawierająca mądrość życiową - popularne w baroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      question: "Jak zaczyna się typowy barokowy sonet?",
      content: {
        options: [
          "od dwóch tercyn",
          "od jednego ośmiowiersza",
          "od dwóch czterowierszy (kwadryny)",
          "od swobodnej strofy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Klasyczny sonet składa się z dwóch kwadryn (czterowierszy) i dwóch tercyn (trójwierszy).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      question: "Co to jest acumen?",
      content: {
        options: [
          "figura retoryczna",
          "dowcip, pomysłowość, koncept",
          "rodzaj wiersza",
          "gatunek dramatu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Acumen (łac.) to dowcip, pomysłowość, zdolność do tworzenia konceptów - ceniona w baroku cecha poetycka.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "BAROQUE",
      question: "Dopasuj pojęcia do ich znaczeń.",
      content: {
        matchingType: "concepts_meanings",
        leftColumn: [
          { id: "A", text: "Vanitas" },
          { id: "B", text: "Carpe diem" },
          { id: "C", text: "Memento mori" },
          { id: "D", text: "Theatrum mundi" },
        ],
        rightColumn: [
          { id: 1, text: "pamiętaj o śmierci" },
          { id: 2, text: "marność dóbr doczesnych" },
          { id: 3, text: "chwytaj dzień" },
          { id: 4, text: "świat jako teatr" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Vanitas - marność, carpe diem - chwytaj dzień, memento mori - pamiętaj o śmierci, theatrum mundi - świat jako teatr.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "BAROQUE",
      question:
        "Które cechy charakteryzują barok? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "kontrast i antyteza",
          "prostota i harmonia",
          "przepych i ozdobność",
          "paradoks",
          "umiłowanie natury i prostoty",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Barok charakteryzują: kontrast, antyteza, przepych, ozdobność i paradoks. Prostota i harmonia to cechy klasycyzmu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "BAROQUE",
      question: "Dopasuj gatunki literackie do ich charakterystyki.",
      content: {
        matchingType: "genres_characteristics",
        leftColumn: [
          { id: "A", text: "Sonet" },
          { id: "B", text: "Fraszka" },
          { id: "C", text: "Oda" },
          { id: "D", text: "Sielanka" },
        ],
        rightColumn: [
          { id: 1, text: "krótki utwór satyryczny" },
          { id: 2, text: "utwór o życiu pasterskim" },
          { id: 3, text: "14-wersowy wiersz" },
          { id: 4, text: "uroczysty wiersz pochwalny" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Sonet - 14 wersów, fraszka - satyra, oda - pochwalny, sielanka - o życiu pasterskim.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "BAROQUE",
      question:
        "Które symbole występowały w malarstwie vanitas? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "czaszka",
          "klepsydra (zegar piaskowy)",
          "kwiaty",
          "tęcza",
          "instrumenty muzyczne",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "W malarstwie vanitas występowały: czaszki, klepsydry, zwiędłe kwiaty, instrumenty - symbole przemijania. Tęcza nie była typowym symbolem vanitas.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "BAROQUE",
      question: "Uzupełnij informacje o baroku.",
      content: {
        textWithGaps:
          "Barok to epoka trwająca w Europie od [1] do [2] wieku. Nazwa pochodzi od portugalskiego słowa oznaczającego [3]. Główną cechą baroku był [4].",
        gaps: [
          {
            id: 1,
            options: ["XV", "XVI", "XVII", "XVIII"],
          },
          {
            id: 2,
            options: ["XVII", "XVIII", "XIX", "XX"],
          },
          {
            id: 3,
            options: ["piękno", "perłę nieregularną", "złoto", "światło"],
          },
          {
            id: 4,
            options: ["minimalizm", "kontrast", "harmonia", "prostota"],
          },
        ],
      },
      correctAnswer: [2, 1, 1, 1],
      metadata: {
        explanation:
          "Barok trwał od XVII do XVIII wieku, nazwa od perły nieregularnej, główna cecha to kontrast.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "BAROQUE",
      question:
        "Wyjaśnij, na czym polegała koncepcja 'theatrum mundi' w baroku.",
      content: {
        instruction:
          "Opisz barokową koncepcję świata jako teatru. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wyjaśnienie metafory świata jako teatru (1 pkt)",
          "wskazanie na pozory i role społeczne (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Theatrum mundi (teatr świata) to barokowa koncepcja życia jako przedstawienia teatralnego. Świat to scena, ludzie to aktorzy odgrywający przydzielone im role społeczne. Życie pełne jest pozorów, masek, udawania. Ta koncepcja wyrażała barokowe przekonanie o iluzoryczności rzeczywistości, grze pozorów i niemożności poznania prawdy. Człowiek nigdy nie jest sobą, zawsze gra rolę.",
        keyWords: ["teatr", "role", "pozory", "maski", "iluzja"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "BAROQUE",
      question: "Opisz główne cechy sarmatyzmu jako nurtu ideologicznego.",
      content: {
        instruction:
          "Wyjaśnij, czym charakteryzował się sarmatyzm. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie gloryfikacji szlachty (1 pkt)",
          "opisanie cech sarmatyzmu (cnoty, pochodzenie) (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Sarmatyzm to specyficznie polski nurt ideologiczny baroku gloryfikujący szlachtę. Szlachta uważała się za potomków starożytnych Sarmatów - wojowniczego ludu. Sarmatyzm podkreślał: poczucie wyższości szlachty, cnoty rycerskie (męstwo, honor), przywiązanie do tradycji, religijność katolicką, wolność szlachecką, ksenofobię. Wyrażał się w stroju (żupan, kontusz, szabla), obyczajach i literaturze panegirycznej.",
        keyWords: [
          "szlachta",
          "Sarmaci",
          "cnoty rycerskie",
          "wolność",
          "tradycja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "BAROQUE",
      question:
        "Wyjaśnij różnicę między hasłami 'carpe diem' a 'memento mori'.",
      content: {
        instruction: "Porównaj oba hasła i ich przesłanie. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wyjaśnienie carpe diem (1 pkt)",
          "wyjaśnienie memento mori (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Carpe diem ('chwytaj dzień') to hasło epikurejskie nakazujące korzystanie z przyjemności życia, radość z chwili obecnej. Memento mori ('pamiętaj o śmierci') to hasło przypominające o przemijaniu i śmierci, nakazujące przygotowanie na koniec. Oba hasła współistniały w baroku, tworząc charakterystyczny kontrast między radością życia a świadomością śmierci.",
        keyWords: [
          "chwytaj dzień",
          "radość",
          "śmierć",
          "przemijanie",
          "kontrast",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "BAROQUE",
      question: "Opisz, czym charakteryzowała się barokowa architektura.",
      content: {
        instruction: "Wymień główne cechy architektury barokowej. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie przepychu i monumentalności (1 pkt)",
          "opisanie elementów dekoracyjnych (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Architektura barokowa charakteryzowała się monumentalnością, przepychem i bogactwem dekoracji. Budowle miały dynamiczne, faliste formy, obfitowały w złocenia, rzeźby, freski. Fasady były bogate w detale, kolumny, pilastry. Wnętrza kościołów miały olśniewać wiernych - malowidła iluzjonistyczne na sklepieniach, bogate ołtarze. Celem było wywołanie zachwytu, wzruszenia, ukazanie potęgi Kościoła i monarchii.",
        keyWords: [
          "przepych",
          "monumentalność",
          "złocenia",
          "dynamika",
          "iluzjonizm",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "BAROQUE",
      question:
        "Wyjaśnij, czym jest koncept w literaturze barokowej i podaj przykład.",
      content: {
        instruction: "Zdefiniuj koncept i zilustruj przykładem. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja konceptu (1 pkt)",
          "podanie przykładu lub wyjaśnienie mechanizmu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Koncept to pomysłowy, dowcipny zwrot słowny oparty na nieoczekiwanym skojarzeniu, grze słów lub paradoksie. Był oznaką kunsztu poetyckiego w baroku. Przykład: porównanie łez do pereł, oczu do słońc, włosów do złotych nici. Koncept łączył odległe pojęcia tworząc zaskakujące metafory. Celem było wywołanie zadziwienia czytelnika pomysłowością poety, pokazanie jego acumen - dowcipu.",
        keyWords: [
          "pomysłowość",
          "gra słów",
          "nieoczekiwane skojarzenie",
          "metafora",
          "zaskoczenie",
        ],
      },
    },

    // =========== KONIEC PYTAŃ BAROK =========== //

    // =========== POCZĄTEK PYTAŃ ANTYGONA ============== //

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kto jest autorem tragedii Antygona?",
      content: {
        options: ["Ajschylos", "Sofokles", "Eurypides", "Arystofanes"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Autorem Antygony jest Sofokles - jeden z trzech wielkich tragików greckich obok Ajschylosa i Eurypidesa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Gdzie toczy się akcja tragedii Antygona?",
      content: {
        options: ["w Atenach", "w Sparcie", "w Tebach", "w Koryncie"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Akcja tragedii toczy się w Tebach, starożytnym mieście greckim, które było siedzibą rodu Labdakidów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kim jest Antygona?",
      content: {
        options: ["córką Kreona", "córką Edypa", "żoną Hajmona", "królową Teb"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona jest córką Edypa i Jokasty, siostrą Eteoklesa, Polinika i Ismeny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak nazywa się siostra Antygony?",
      content: {
        options: ["Helena", "Ismena", "Eurydyka", "Ifigenia"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ismena jest młodszą siostrą Antygony, córką Edypa i Jokasty.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kim jest Kreon w tragedii?",
      content: {
        options: [
          "ojcem Antygony",
          "bratem Edypa",
          "wujem Antygony i władcą Teb",
          "wróżbitą",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kreon jest bratem Jokasty, a więc wujem Antygony. Po śmierci Eteoklesa i Polinika obejmuje tron Teb.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak nazywają się bracia Antygony?",
      content: {
        options: [
          "Eteokles i Polinik",
          "Kastor i Polluks",
          "Agamemnon i Menelaos",
          "Akwiles i Hektor",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Eteokles i Polinik to bracia Antygony, synowie Edypa, którzy zginęli w bratobójczej walce o władzę w Tebach.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co zakazał Kreon po śmierci Polinika?",
      content: {
        options: [
          "mówienia o nim",
          "noszenia żałoby",
          "pochowania go",
          "modlitwy za jego duszę",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kreon wydał edykt zakazujący pochowania Polinika, uznając go za zdrajcę ojczyzny, który napadł na rodzime Teby.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jakiej karze podlegał ten, kto złamał zakaz Kreona?",
      content: {
        options: [
          "wygnaniu z miasta",
          "więzieniu dożywotniemu",
          "śmierci przez ukamienowanie",
          "utracie majątku",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kreon zagroził karą śmierci przez ukamienowanie każdemu, kto ośmieli się pogrzebać ciało Polinika.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kto pochował ciało Polinika?",
      content: {
        options: ["Ismena", "Antygona", "Hajmon", "strażnicy"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona pogrzebała brata wbrew zakazowi Kreona, posypując jego ciało ziemią i dokonując obrzędów pogrzebowych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kim jest Hajmon?",
      content: {
        options: [
          "bratem Antygony",
          "synem Kreona i narzeczonym Antygony",
          "strażnikiem miejskim",
          "ślepym wieszczem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hajmon jest synem Kreona i narzeczonym Antygony. Kocha ją i próbuje przekonać ojca do zmiany wyroku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Do jakiej kary został zmieniony wyrok na Antygonę?",
      content: {
        options: [
          "spalenia na stosie",
          "zamurowania żywcem w grocie skalnej",
          "utopienia",
          "powieszenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kreon zmienił wyrok z publicznego ukamienowania na zamurowanie Antygony żywcem w grocie skalnej, by formalnie uniknąć odpowiedzialności za przelanie krwi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kim jest Tejrezjasz?",
      content: {
        options: [
          "ślepym wieszczem",
          "strażnikiem",
          "dowódcą wojsk",
          "członkiem chóru",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Tejrezjasz to ślepý wróżbita, szanowany prorok, który ostrzega Kreona przed gniewem bogów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dlaczego Antygona pogrzebała Polinika?",
      content: {
        options: [
          "bo była zakochana w bracie",
          "z obowiązku wobec praw boskich i rodzinnych",
          "z zemsty na Kreonie",
          "aby zostać bohaterką",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona pogrzebała brata kierując się prawami boskimi i niepisanymi prawami rodzinnymi, które dla niej były wyższe od edyktu Kreona.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dlaczego Ismena odmówiła pomocy Antygonie?",
      content: {
        options: [
          "nie kochała Polinika",
          "ze strachu przed karą i poczucia słabości jako kobiety",
          "była lojalna wobec Kreona",
          "nie wierzyła w bogów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ismena odmówiła ze strachu przed śmiercią i z przekonania, że kobiety są zbyt słabe, by sprzeciwiać się władzy mężczyzn.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jakie argumenty przytacza Antygona broniąc swojego czynu?",
      content: {
        options: [
          "mówi, że Polinik był niewinny",
          "odwołuje się do niepisanych praw boskich starszych od dekretów Kreona",
          "twierdzi, że Kreon nie ma prawa do wydawania dekretów",
          "odmawia wyjaśnień",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona powołuje się na niepisane, niezmienne prawa boskie, które są wieczne i wyższe od praw ludzkich. Mówi: 'Nie Zeus ani Dike ogłosili ten zakaz'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak Hajmon próbuje przekonać ojca do zmiany wyroku?",
      content: {
        options: [
          "groźbami i przemocą",
          "odwołując się do opinii ludu i głosu rozumu",
          "oferując pieniądze",
          "planując zamach stanu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hajmon używa argumentów racjonalnych: mówi o opinii ludu, który sympatyzuje z Antygoną, ostrzega przed pycha ojca i radzi elastyczność w rządzeniu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co przepowiada Tejrezjasz Kreonowi?",
      content: {
        options: [
          "zwycięstwo w wojnie",
          "gniew bogów i śmierć kogoś bliskiego",
          "długie panowanie",
          "bogactwo i chwałę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tejrezjasz ostrzega Kreona, że ściągnął na siebie gniew bogów i że zapłaci synem za swoje przewiny wobec zmarłych i żywych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kiedy Kreon zmienia zdanie i postanawia uwolnić Antygonę?",
      content: {
        options: [
          "gdy Hajmon go o to błaga",
          "gdy lud się zbuntuje",
          "po przepowiedni Tejrezjasza",
          "nigdy nie zmienia zdania",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kreon zmienia zdanie dopiero po straszliwej przepowiedni Tejrezjasza, ale jest już za późno - Antygona popełniła samobójstwo.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak ginie Antygona?",
      content: {
        options: [
          "zostaje ukamienowana",
          "popełnia samobójstwo przez powieszenie",
          "umiera z głodu w grocie",
          "zostaje zabita przez Kreona",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona popełnia samobójstwo, wieszając się w grocie, zanim Kreon zdąży ją uwolnić.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak ginie Hajmon?",
      content: {
        options: [
          "w bitwie",
          "zostaje zabity przez Kreona",
          "popełnia samobójstwo przy ciele Antygony",
          "umiera z rozpaczy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Hajmon popełnia samobójstwo przy ciele ukochanej Antygony, przepełniony rozpaczą i gniewem na ojca.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Kim jest Eurydyka?",
      content: {
        options: [
          "matką Antygony",
          "żoną Kreona i matką Hajmona",
          "siostrą Ismeny",
          "służącą w pałacu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Eurydyka jest żoną Kreona i matką Hajmona. Ginie w finale tragedii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak ginie Eurydyka?",
      content: {
        options: [
          "z choroby",
          "popełnia samobójstwo po śmierci syna",
          "zostaje zabita w walce",
          "umiera ze starości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Eurydyka popełnia samobójstwo po usłyszeniu wieści o śmierci syna Hajmona, obwiniając za to Kreona.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaki los spotyka Kreona na końcu tragedii?",
      content: {
        options: [
          "zostaje królem i rządzi mądrze",
          "zostaje wygnany z Teb",
          "traci syna i żonę, pozostaje zrujnowanym człowiekiem",
          "popełnia samobójstwo",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kreon traci wszystko: syna Hajmona i żonę Eurydykę. Pozostaje żywy, ale całkowicie zrujnowany psychicznie, uznając swoją głupotę i pychę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak nazywa się przeklęty ród, z którego pochodzi Antygona?",
      content: {
        options: ["Atryda", "Labdakida", "Pelopida", "Tantalida"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona jest ostatnią przedstawicielką przeklętego rodu Labdakidów, którego protoplastą był Labdakos, dziadek Edypa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Kto w dramacie greckim komentuje wydarzenia i wyraża opinie zbiorowe?",
      content: {
        options: ["narrator", "chór", "prorok", "strażnicy"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Chór w tragedii greckiej składa się z obywateli Teb i pełni funkcję komentatora wydarzeń, wyraża opinie zbiorowe i refleksje moralne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaki główny konflikt stanowi oś tragedii?",
      content: {
        options: [
          "konflikt między Antygoną a Ismeną",
          "konflikt między prawami boskimi a ludzkimi",
          "konflikt między Tebami a wrogami",
          "konflikt między Hajmonem a Kreonem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Główny konflikt tragedii to starcie praw boskich (reprezentowanych przez Antygonę) z prawami ludzkimi, państwowymi (reprezentowanymi przez Kreona).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Która postać mówi: 'Współkochać przyszłam, nie współnienawidzieć'?",
      content: {
        options: ["Ismena", "Antygona", "Eurydyka", "Chór"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To słowa Antygony, która wyjaśnia swoją motywację - przyszła na świat, aby kochać, nie nienawidzić. Wyraża to jej naturę i szlachetność.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co oznacza greckie pojęcie 'hybris' w kontekście tragedii?",
      content: {
        options: [
          "mądrość i rozsądek",
          "pychę i przekroczenie granic wyznaczonych przez bogów",
          "odwagę w walce",
          "sprawiedliwość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hybris to pycha, zuchwałość i przekroczenie granic wyznaczonych przez bogów i naturę. W tragedii greckiej zawsze prowadzi do katastrofy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Który z braci Antygony bronił Teb?",
      content: {
        options: ["Polinik", "Eteokles", "obaj", "żaden"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Eteokles bronił Teb i został pochowany z honorami jako bohater. Polinik natomiast zaatakował rodzinne miasto i został uznany za zdrajcę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Który z braci Antygony został uznany za zdrajcę?",
      content: {
        options: ["Eteokles", "Polinik", "obaj", "żaden"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Polinik został uznany za zdrajcę, ponieważ przyprowadził obce wojska i zaatakował rodzinne Teby.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj postacie do ich ról w tragedii.",
      content: {
        matchingType: "character_role",
        leftColumn: [
          { id: "A", text: "Antygona" },
          { id: "B", text: "Kreon" },
          { id: "C", text: "Tejrezjasz" },
          { id: "D", text: "Hajmon" },
        ],
        rightColumn: [
          { id: 1, text: "ślepý wieszcz ostrzegający przed gniewem bogów" },
          { id: 2, text: "władca Teb wydający edykt" },
          { id: 3, text: "córka Edypa grzebiąca brata" },
          { id: 4, text: "syn Kreona, narzeczony Antygony" },
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
          "Antygona grzebie brata, Kreon jest władcą wydającym edykt, Tejrezjasz to wieszcz, Hajmon to syn Kreona i narzeczony Antygony.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które cechy charakteryzują Antygonę? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "odważna i zdecydowana",
          "podporządkowuje się prawom państwowym",
          "lojalna wobec rodziny",
          "kieruje się prawami boskimi",
          "tchórzliwa i uległa",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Antygona jest odważna, lojalna wobec rodziny i kieruje się prawami boskimi. Nie podporządkowuje się prawom państwowym Kreona i nie jest tchórzliwa.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj postacie do ich końcowego losu.",
      content: {
        matchingType: "character_fate",
        leftColumn: [
          { id: "A", text: "Antygona" },
          { id: "B", text: "Hajmon" },
          { id: "C", text: "Eurydyka" },
          { id: "D", text: "Kreon" },
        ],
        rightColumn: [
          { id: 1, text: "samobójstwo przy ciele ukochanej" },
          { id: 2, text: "przeżywa, ale traci wszystko" },
          { id: 3, text: "samobójstwo przez powieszenie w grocie" },
          { id: 4, text: "samobójstwo po śmierci syna" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Antygona wiesza się w grocie, Hajmon popełnia samobójstwo przy jej ciele, Eurydyka zabija się po śmierci syna, a Kreon przeżywa jako zrujnowany człowiek.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Uzupełnij informacje o fabule tragedii.",
      content: {
        textWithGaps:
          "Po bratobójczej walce [1] i [2], władzę w Tebach obejmuje [3]. Wydaje on edykt zakazujący [4] Polinika.",
        gaps: [
          {
            id: 1,
            options: ["Eteoklesa", "Hajmona", "Kreona", "Edypa"],
          },
          {
            id: 2,
            options: ["Polinika", "Tejrezjasza", "Edypa", "Kreona"],
          },
          {
            id: 3,
            options: ["Eteokles", "Hajmon", "Kreon", "Edyp"],
          },
          {
            id: 4,
            options: ["chwalenia", "oplakiwania", "pochowania", "nazywania"],
          },
        ],
      },
      correctAnswer: [0, 0, 2, 2],
      metadata: {
        explanation:
          "Po bratobójczej walce Eteoklesa i Polinika, władzę obejmuje Kreon, który zakazuje pochowania Polinika.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które zdania dotyczące Kreona są prawdziwe? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "jest władcą Teb",
          "wydaje edykt zakazujący pochówku Polinika",
          "od początku słucha rad Tejrezjasza",
          "traci syna i żonę",
          "jest bratem Edypa",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Prawdziwe: Kreon jest władcą Teb, wydaje edykt i traci rodzinę. Fałszywe: nie słucha od razu Tejrezjasza, jest bratem Jokasty (nie Edypa).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj argumenty do postaci, które je wypowiadają.",
      content: {
        matchingType: "arguments_characters",
        leftColumn: [
          { id: "A", text: "Prawa boskie są wieczne i niezmienne" },
          { id: "B", text: "Porządek państwowy jest najważniejszy" },
          { id: "C", text: "Lud sympatyzuje z Antygoną" },
          { id: "D", text: "Kobiety są zbyt słabe, by sprzeciwiać się władzy" },
        ],
        rightColumn: [
          { id: 1, text: "Ismena" },
          { id: 2, text: "Hajmon" },
          { id: 3, text: "Antygona" },
          { id: 4, text: "Kreon" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 3],
        [2, 1],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Antygona broni praw boskich, Kreon - porządku państwowego, Hajmon mówi o opinii ludu, Ismena o słabości kobiet.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które motywy pojawiają się w tragedii Antygona? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "konflikt praw boskich i ludzkich",
          "lojalność rodzinna",
          "pycha władcy (hybris)",
          "miłość romantyczna (Hajmon i Antygona)",
          "podróż morska",
          "pogrzeb i obrzędy",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 5],
      metadata: {
        explanation:
          "W tragedii występują: konflikt praw, lojalność rodzinna, pycha Kreona, miłość Hajmona i Antygony oraz motyw pogrzebowy. Nie ma motywu podróży morskiej.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Wyjaśnij, dlaczego Antygona zdecydowała się pogrzebać Polinika.",
      content: {
        instruction:
          "Podaj główne powody decyzji Antygony i wyjaśnij, jakimi zasadami się kierowała. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie obowiązku wobec rodziny i brata (1 pkt)",
          "odwołanie się do praw boskich jako wyższych od ludzkich (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Antygona pogrzebała Polinika kierując się obowiązkiem rodzinnym i prawami boskimi. Wierzyła, że niepisane, wieczne prawa bogów są wyższe od edyktów Kreona. Hades wymaga równych praw dla wszystkich zmarłych, niezależnie od ich czynów za życia.",
        keyWords: [
          "prawa boskie",
          "rodzina",
          "obowiązek",
          "Hades",
          "wieczne prawa",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Opisz, jakich argumentów używa Kreon, broniąc swojego edyktu.",
      content: {
        instruction:
          "Wyjaśnij, dlaczego Kreon uważa swój edykt za słuszny. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie na porządek państwowy i dobro Teb (1 pkt)",
          "rozróżnienie na obrońców i zdrajców ojczyzny (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Kreon uważa, że porządek państwowy jest najważniejszy. Twierdzi, że Polinik był zdrajcą, który zaatakował Teby, dlatego nie zasługuje na honorowy pochówek. Eteokles bronił miasta i został pochowany z honorami. Kreon wierzy, że dobro państwa przewyższa prawa rodzinne.",
        keyWords: [
          "porządek państwowy",
          "zdrajca",
          "dobro Teb",
          "Eteokles",
          "obrońca",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Wyjaśnij, dlaczego Ismena odmówiła pomocy Antygonie.",
      content: {
        instruction: "Opisz powody odmowy Ismeny w 2-3 zdaniach. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie strachu przed śmiercią (1 pkt)",
          "poczucie słabości jako kobiety wobec władzy mężczyzn (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Ismena odmówiła ze strachu przed karą śmierci. Czuła się zbyt słaba jako kobieta, by sprzeciwiać się edyktowi męskiego władcy. W przeciwieństwie do siostry, nie miała odwagi przeciwstawić się Kreonowi.",
        keyWords: ["strach", "kara", "słabość", "kobieta", "władza"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Opisz, w jaki sposób Hajmon próbuje przekonać ojca do zmiany wyroku.",
      content: {
        instruction:
          "Wymień główne argumenty Hajmona w rozmowie z Kreonem. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "odwołanie się do opinii ludu (1 pkt)",
          "ostrzeżenie przed pychą i sztywnością w rządzeniu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hajmon mówi ojcu, że lud Teb sympatyzuje z Antygoną i uważa wyrok za niesprawiedliwy. Ostrzega przed pychą i brakiem elastyczności, porównując dobrego władcę do drzewa, które ugina się pod naporem wiatru. Radzi ojcu, by nie był zbyt uparty i wysłuchał głosu rozsądku.",
        keyWords: [
          "opinia ludu",
          "pycha",
          "elastyczność",
          "drzewo",
          "rozsądek",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Wyjaśnij, co przepowiada Tejrezjasz i dlaczego Kreon w końcu zmienia zdanie.",
      content: {
        instruction:
          "Opisz przepowiednię wieszcza i reakcję Kreona. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "przepowiednia gniewu bogów i śmierci bliskiej osoby (1 pkt)",
          "zmiana decyzji Kreona ze strachu przed karą (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Tejrezjasz przepowiada Kreonowi gniew bogów za bezczeszczenie zmarłego i skazanie żywej na śmierć. Ostrzega, że Kreon zapłaci synem za swoje przewiny. Przerażony prorok zmienia zdanie ze strachu przed straszliwą karą, ale jest już za późno - Antygona i Hajmon giną.",
        keyWords: ["gniew bogów", "przepowiednia", "syn", "strach", "za późno"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Opisz końcowy los Kreona i wyjaśnij, czego go nauczyło cierpienie.",
      content: {
        instruction:
          "Wyjaśnij, co traci Kreon i do jakich wniosków dochodzi. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "utrata syna Hajmona i żony Eurydyki (1 pkt)",
          "uznanie własnej głupoty i pychy (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Kreon traci syna Hajmona, który popełnia samobójstwo, oraz żonę Eurydykę, która również się zabija obwiniając męża. Pozostaje żywy, ale całkowicie zrujnowany. Przyznaje się do własnej głupoty i pychy, prosząc o śmierć. Nauczył się, że pycha prowadzi do katastrofy.",
        keyWords: [
          "Hajmon",
          "Eurydyka",
          "samobójstwo",
          "pycha",
          "głupota",
          "katastrofa",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Scharakteryzuj krótko postawę Ismeny wobec Antygony.",
      content: {
        instruction:
          "Opisz różnicę między siostrami i ich wyborami. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "Ismena jest uległa i bojaźliwa (1 pkt)",
          "Antygona jest odważna i bezkompromisowa (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Ismena jest uległa, bojaźliwa i pragmatyczna. Boi się śmierci i uważa, że kobiety nie powinny sprzeciwiać się mężczyznom. Antygona jest odważna, bezkompromisowa i kieruje się wyższymi wartościami. Ismena reprezentuje konformizm, Antygona - heroizm.",
        keyWords: [
          "uległa",
          "bojaźliwa",
          "odważna",
          "bezkompromisowa",
          "konformizm",
          "heroizm",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Wyjaśnij, kim był Edyp i jaki związek miał z Antygoną.",
      content: {
        instruction:
          "Opisz postać Edypa i jego relację rodzinną z Antygoną. (30-50 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: ["Edyp był królem Teb (1 pkt)", "był ojcem Antygony (1 pkt)"],
      },
      metadata: {
        expectedAnswer:
          "Edyp był królem Teb i ojcem Antygony. Nieświadomie zabił swojego ojca Lajosa i poślubił własną matkę Jokastę. Z tego kazirodczego związku urodziły się czworo dzieci: Antygona, Ismena, Eteokles i Polinik. Ród Labdakidów był przeklęty.",
        keyWords: [
          "król Teb",
          "ojciec",
          "Jokasta",
          "przeklęty ród",
          "Labdakidzi",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Wyjaśnij, jaka jest rola chóru w tragedii Antygona.",
      content: {
        instruction:
          "Opisz funkcję chóru w dramacie greckim na przykładzie Antygony. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "komentowanie wydarzeń (1 pkt)",
          "wyrażanie opinii zbiorowej i refleksji moralnych (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Chór w Antygonie składa się z obywateli Teb i pełni funkcję komentatora wydarzeń. Wyraża opinie zbiorowe, filozofuje o kondycji ludzkiej i losie. Chór przestrzega przed pychą, mówi o potędze człowieka, a na końcu podsumowuje tragedię stwierdzając, że bogowie karzą pychę.",
        keyWords: [
          "obywatele Teb",
          "komentarz",
          "opinia zbiorowa",
          "filozofia",
          "pycha",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Wyjaśnij, co oznacza pojęcie 'tragizmu' na przykładzie sytuacji Antygony.",
      content: {
        instruction:
          "Opisz sytuację tragiczną Antygony - dlaczego każdy wybór był zły. (40-60 słów)",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "sytuacja bez wyjścia - każdy wybór jest zły (1 pkt)",
          "konflikt wartości: obowiązek rodzinny vs posłuszeństwo władzy (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Tragizm to sytuacja bez wyjścia, gdzie każdy wybór prowadzi do utraty ważnej wartości. Antygona stoi przed dylematem: jeśli pogrzebie brata, zginie; jeśli nie pogrzebie, obrazi bogów i zdradzi rodzinę. Nie może wybrać dobrze - musi odrzucić coś, co jest dla niej ważne.",
        keyWords: [
          "sytuacja bez wyjścia",
          "dylemat",
          "wartości",
          "konflikt",
          "utrata",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "W jakiej epoce literackiej powstała tragedia Antygona?",
      content: {
        options: [
          "w średniowieczu",
          "w starożytności (antyk)",
          "w renesansie",
          "w oświeceniu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona to dramat antyczny - powstał w starożytnej Grecji w V wieku p.n.e.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaką funkcję pełni postać Tejrezjasza w strukturze tragedii?",
      content: {
        options: [
          "komicznego reliffu",
          "narratora opowiadającego historię",
          "głosu bogów i ostrzeżenia przed katastrofą",
          "sprzymierzeńca Kreona",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tejrezjasz jako ślepý wieszcz reprezentuje wolę bogów, ostrzega Kreona przed katastrofą i przepowiada przyszłość - jest głosem wyższych sił.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Dlaczego Kreon zmienił karę z ukamienowania na zamurowanie w grocie?",
      content: {
        options: [
          "z litości nad Antygoną",
          "na prośbę Hajmona",
          "aby formalnie uniknąć odpowiedzialności za przelanie krwi",
          "z rozkazu bogów",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kreon zmienił wyrok na zamurowanie żywcem w grocie, aby formalnie uniknąć odpowiedzialności za bezpośrednie przelanie krwi - Antygona miała umrzeć 'sama', z głodu lub pragnienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co symbolizuje bratobójcza walka Eteoklesa i Polinika?",
      content: {
        options: [
          "walkę dobra ze złem",
          "konflikt pokoleń",
          "ciągłość klątwy rodu i tragedii rodzinnej",
          "walkę o niepodległość",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Bratobójcza walka to kolejny element klątwy ciążącej na rodzie Labdakidów - synowie Edypa zabijają się nawzajem, kontynuując tragiczne dziedzictwo rodziny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest główna różnica w podejściu do prawa między Antygoną a Kreonem?",
      content: {
        options: [
          "Antygona wierzy w prawo ludzkie, Kreon w boskie",
          "Antygona wierzy w prawa boskie i niepisane, Kreon w prawo stanowione przez władcę",
          "oboje wierzą w te same prawa",
          "Antygona nie wierzy w żadne prawa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona kieruje się prawami boskimi i niepisanymi prawami natury, które są wieczne i niezmienne. Kreon natomiast uważa, że prawo stanowione przez władcę (edykt) jest najważniejsze i nadrzędne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które słowa Antygony najlepiej wyrażają jej pogląd na prawa boskie?",
      content: {
        options: [
          "Muszę słuchać Kreona, bo jest władcą",
          "Nie Zeus ani Dike ogłosili ten zakaz - niepisane prawa bogów są wieczne",
          "Prawo ludzkie jest najważniejsze",
          "Pogrzeb to tylko forma, nie ma znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona mówi: 'Nie Zeus ani Dike ogłosili ten zakaz' - podkreśla, że edykt Kreona nie pochodzi od bogów, a niepisane prawa boskie są wieczne i nadrzędne wobec praw ludzkich.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza stwierdzenie Antygony, że przyszła 'współkochać, nie współnienawidzieć'?",
      content: {
        options: [
          "że jest zakochana w Hajmonie",
          "że jej naturą jest miłość, nie nienawiść - nawet do wroga",
          "że kocha tylko swoją rodzinę",
          "że nienawidzi Kreona",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To kluczowe zdanie charakteryzujące Antygonę - mówi, że przyszła na świat, aby kochać (nawet zdrajcę-brata), nie aby nienawidzić. Wyraża to jej naturę opartą na miłości i lojalności rodzinnej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak Antygona postrzega swoją śmierć?",
      content: {
        options: [
          "jako największe nieszczęście",
          "jako zysk wobec życia pełnego cierpień",
          "jako karę za grzechy",
          "jako niesprawiedliwość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona mówi, że przedwczesna śmierć to dla niej 'zysk wobec życia pełnego cierpień' - jako ostatnia z przeklętego rodu widzi śmierć jako wyzwolenie od tragicznego losu rodziny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaką wizję władzy reprezentuje Kreon?",
      content: {
        options: [
          "demokratyczną - władza pochodzi z woli ludu",
          "teokratyczną - władza pochodzi od bogów",
          "absolutystyczną - władca ma nieograniczoną władzę",
          "anarchistyczną - brak władzy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kreon reprezentuje władzę absolutną - uważa, że dobro państwa jest najważniejsze, a władca ma prawo stanowić prawa bez ograniczeń. Nie uznaje praw wyższych od woli monarchy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co symbolizuje metafora drzewa w mowie Hajmona?",
      content: {
        options: [
          "siłę i potęgę władcy",
          "elastyczność i umiar w rządzeniu - ugięcie zamiast złamania",
          "słabość i tchórzostwo",
          "stałość i niezmienność",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hajmon mówi, że drzewo które się ugina przetrwa burzę, a sztywne - złamie się. Symbolizuje to potrzebę elastyczności, umiaru i mądrości w rządzeniu - władca musi umieć się ugąć, nie być sztywny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaka jest ironia tragiczna w losie Kreona?",
      content: {
        options: [
          "chciał porządku, ale spowodował chaos i tragedię",
          "stał się bogatym władcą",
          "został obalony przez lud",
          "zdobył uznanie bogów",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Ironia tragiczna polega na tym, że Kreon chciał być wzorowym władcą strzegącym porządku państwowego, a skończył jako zrujnowany człowiek, który przez własną pychę stracił syna i żonę - sam sprowadził na siebie katastrofę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dlaczego Kreon oskarża strażników o przekupstwo?",
      content: {
        options: [
          "bo znalazł u nich pieniądze",
          "bo nie może uwierzyć, że ktoś złamał edykt z zasad, więc szuka materialnej motywacji",
          "bo strażnicy się przyznali",
          "bo lud go o tym poinformował",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kreon nie potrafi zrozumieć, że ktoś mógłby złamać jego edykt z wyższych pobudek moralnych, więc szuka materialistycznego wytłumaczenia - oskarża o przekupstwo przez wrogów miasta.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak Kreon postrzega płeć w kontekście władzy?",
      content: {
        options: [
          "uważa kobiety i mężczyzn za równych",
          "silnie rozdziela sfery męską i żeńską, dla niego posłuszeństwo kobiecie to hańba",
          "preferuje kobiety na stanowiskach władzy",
          "nie ma zdania na ten temat",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kreon 'silnie i zdecydowanie oddzielał sferę męską od sfery kobiecej'. Mówi, że jeśli Antygona wygra, to on przestanie być mężczyzną - posłuszeństwo kobiecie to dla niego hańba i zagrożenie męskiego porządku władzy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaki paradoks ujawnia się w postawie Kreona?",
      content: {
        options: [
          "mówi o rozumie, ale zachowuje się emocjonalnie",
          "kocha Antygonę, ale ją skazuje",
          "nienawidzi Polinika, ale go grzebie",
          "wierzy w bogów, ale ich nie słucha",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Paradoks polega na tym, że Kreon przypisuje kobietom emocjonalność a mężczyznom rozum, ale 'okazuje się, że to on zachowuje się emocjonalnie i poddaje się swojej emocjonalnej naturze' - działa impulsywnie, z pychy i gniewu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co oznacza pojęcie 'hamartia' w tragedii greckiej?",
      content: {
        options: [
          "nagrodę bogów",
          "błąd tragiczny bohatera prowadzący do katastrofy",
          "triumf nad wrogami",
          "mądrość życiową",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hamartia to błąd tragiczny - wadliwa decyzja lub cecha charakteru bohatera (np. pycha Kreona), która prowadzi do jego upadku i katastrofy zgodnie z logiką tragedii greckiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Czym jest 'agon' w tragedii Antygona?",
      content: {
        options: [
          "pieśnią chóru",
          "sceną pojedynku słownego między bohaterami (Antygona vs Kreon)",
          "monologiem bohatera",
          "epilogiem tragedii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Agon to formalna debata, pojedynek słowny między antagonistami w tragedii greckiej. W Antygonie główny agon to starcie między Antygoną a Kreonem, gdzie przedstawiają swoje argumenty.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaka jest funkcja postaci Ismeny w strukturze tragedii?",
      content: {
        options: [
          "komiczny relief",
          "kontrast podkreślający heroizm Antygony",
          "główna antagonistka",
          "narratorka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ismena pełni funkcję postaci kontrastowej (foil character) - jej tchórzostwo, uległość i pragmatyzm podkreślają przez kontrast odwagę, bezkompromisowość i heroizm Antygony.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co symbolizuje zakaz pochówku Polinika?",
      content: {
        options: [
          "tylko karę za zdradę",
          "konflikt między prawem państwowym a prawami boskimi i rodzinnymi",
          "lenistwo władcy",
          "obojętność wobec zmarłych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zakaz pochówku symbolizuje główny konflikt tragedii - starcie prawa państwowego (edykt Kreona) z prawami boskimi i niepisanymi prawami rodzinnymi, które nakazują godny pochówek każdego zmarłego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza zdanie Chóru: 'Siła jest dziwy, lecz nad wszystkie sięga / Dziwy człowieka potęga'?",
      content: {
        options: [
          "że człowiek jest słaby",
          "że człowiek ma wielką moc i zdolności, ale też może je użyć źle",
          "że tylko bogowie są potężni",
          "że natura jest potężniejsza od człowieka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To oda o człowieku (stasimon) wyrażająca ambiwalencję: człowiek ma wielką potęgę (umysł, mowę, technikę), ale może użyć jej zarówno na dobre jak i na złe - może być cudem lub straszną siłą niszczącą.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaka jest funkcja sceny z wieszczem Tejrezjaszem?",
      content: {
        options: [
          "tylko przepowiada przyszłość",
          "stanowi punkt zwrotny - perypetia, po którym Kreon zmienia zdanie",
          "wprowadza komizm",
          "oskarża Antygonę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena z Tejrezjaszem to perypetia (punkt zwrotny akcji) - przepowiednia wieszcza powoduje nagłą zmianę w postawie Kreona, który wreszcie decyduje się uwolnić Antygonę, ale jest już za późno.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Dlaczego Ismena próbuje później przyznać się do współudziału w pogrzebie?",
      content: {
        options: [
          "bo naprawdę pomagała",
          "z lojalności wobec siostry i poczucia winy",
          "bo chce być sławna",
          "z nienawiści do Kreona",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ismena, widząc skazanie siostry, czuje poczucie winy za swoją wcześniejszą odmowę i lojalność rodzinną. Próbuje podzielić los siostry, choć Antygona odrzuca jej 'spóźniony heroizm'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "W jaki sposób tragedia kończy się dla wszystkich głównych postaci?",
      content: {
        options: [
          "wszyscy żyją szczęśliwie",
          "wszyscy giną fizycznie",
          "Antygona, Hajmon i Eurydyka giną, Kreon żyje jako 'żywy trup'",
          "tylko Kreon ginie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Antygona, Hajmon i Eurydyka popełniają samobójstwo. Kreon przeżywa, ale Posłaniec nazywa go 'żywym trupem' - jest psychicznie zniszczony, co jest najgorszą karą.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza stwierdzenie, że Kreon 'ponosi klęskę nie przez to, kim był, ale kim nie był'?",
      content: {
        options: [
          "że był złym człowiekiem",
          "że nie był wystarczająco mądry, odważny i sprawiedliwy by być dobrym władcą",
          "że był zbyt dobry",
          "że był zbyt młody",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ta diagnoza oznacza, że Kreon nie był ani wystarczająco inteligentny, ani odważny, by być dobrym i sprawiedliwym władcą - jego ograniczenia i pycha doprowadziły do tragedii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest rola motywu pieniądza w przemowie Kreona do strażników?",
      content: {
        options: [
          "Kreon krytykuje pieniądz jako źródło wszelkiej zbrodni i korupcji",
          "Kreon chwali pieniądz",
          "Kreon jest obojętny na pieniądze",
          "Kreon rozdaje pieniądze strażnikom",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Kreon mówi: 'nie ma gorszej potęgi jak pieniądz który burzy miasta, krzywi prawe dusze i jest mistrzem wszelkiej zbrodni' - oskarża strażników o przekupstwo i krytykuje destrukcyjną moc pieniądza.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj koncepcje do postaci, które je reprezentują.",
      content: {
        matchingType: "concepts_characters",
        leftColumn: [
          { id: "A", text: "Prawa boskie i niepisane" },
          { id: "B", text: "Racja stanu i porządek państwowy" },
          { id: "C", text: "Pragmatyzm i strach" },
          { id: "D", text: "Miłość i próba mediacji" },
        ],
        rightColumn: [
          { id: 1, text: "Hajmon" },
          { id: 2, text: "Kreon" },
          { id: 3, text: "Antygona" },
          { id: 4, text: "Ismena" },
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
          "Antygona reprezentuje prawa boskie, Kreon - rację stanu, Ismena - pragmatyzm i strach, Hajmon - miłość i próbę znalezienia kompromisu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które elementy składają się na tragizm sytuacji Antygony? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "konflikt wartości nie do pogodzenia",
          "każdy wybór prowadzi do utraty czegoś ważnego",
          "ciężar klątwy rodzinnej",
          "możliwość uniknięcia konfliktu",
          "brak odpowiedzialności za czyny",
          "świadomość konsekwencji",
        ],
      },
      correctAnswer: [0, 1, 2, 5],
      metadata: {
        explanation:
          "Tragizm Antygony to: konflikt niekompatybilnych wartości, sytuacja bez wyjścia (każdy wybór to strata), klątwa rodu Labdakidów i pełna świadomość konsekwencji. Nie mogła uniknąć konfliktu i była odpowiedzialna za swój wybór.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj cechy do typu bohatera tragicznego.",
      content: {
        matchingType: "tragic_hero_traits",
        leftColumn: [
          { id: "A", text: "Antygona" },
          { id: "B", text: "Kreon" },
          { id: "C", text: "Hajmon" },
        ],
        rightColumn: [
          {
            id: 1,
            text: "bohater świadomy, heroiczny - wybiera wartości wyższe",
          },
          { id: 2, text: "ofiara miłości i konfliktu pokoleń" },
          {
            id: 3,
            text: "bohater z hamartią (pycha) prowadzącą do katastrofy",
          },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 2],
        [2, 1],
      ],
      metadata: {
        explanation:
          "Antygona to bohaterka heroiczna świadomie wybierająca śmierć dla wartości. Kreon to klasyczny bohater tragiczny z hamartią (pychą). Hajmon to ofiara miłości i konfliktu między ojcem a ukochaną.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Uzupełnij analizę konfliktu w tragedii.",
      content: {
        textWithGaps:
          "Główny konflikt w Antygonie to starcie [1] reprezentowanych przez Antygonę z [2] reprezentowanymi przez Kreona. Antygona odwołuje się do [3], podczas gdy Kreon do [4].",
        gaps: [
          {
            id: 1,
            options: [
              "praw państwowych",
              "praw boskich",
              "praw rodzinnych",
              "praw ludzkich",
            ],
          },
          {
            id: 2,
            options: [
              "praw boskich",
              "praw rodzinnych",
              "praw państwowych",
              "tradycji",
            ],
          },
          {
            id: 3,
            options: [
              "woli ludu",
              "edyktu",
              "niepisanych praw bogów",
              "tradycji",
            ],
          },
          {
            id: 4,
            options: [
              "woli bogów",
              "tradycji",
              "racji stanu i edyktu",
              "opinii ludu",
            ],
          },
        ],
      },
      correctAnswer: [1, 2, 2, 2],
      metadata: {
        explanation:
          "Konflikt to starcie praw boskich (Antygona) z prawami państwowymi (Kreon). Antygona odwołuje się do niepisanych praw bogów, Kreon do racji stanu i swojego edyktu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które elementy struktury tragedii greckiej występują w Antygonie? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "prolog - wprowadzenie w sytuację",
          "agon - pojedynek słowny",
          "stasimon - pieśń chóru",
          "perypetia - punkt zwrotny (scena z Tejrezjaszem)",
          "katastrofa - finalne nieszczęście",
          "happy end",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 4],
      metadata: {
        explanation:
          "Antygona ma wszystkie klasyczne elementy tragedii greckiej: prolog (rozmowa sióstr), agon (Antygona vs Kreon), stasimon (pieśni chóru), perypetia (Tejrezjasz), katastrofa (śmierci i upadek Kreona). Nie ma happy endu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj cytaty do ich znaczenia w tragedii.",
      content: {
        matchingType: "quotes_meaning",
        leftColumn: [
          { id: "A", text: "Współkochać przyszłam, nie współnienawidzieć" },
          { id: "B", text: "Nie Zeus ani Dike ogłosili ten zakaz" },
          { id: "C", text: "Zginie - to śmiercią sprowadzi zgon inny" },
          { id: "D", text: "Zmieniam swe serce, zrobię to" },
        ],
        rightColumn: [
          { id: 1, text: "ostrzeżenie Hajmona o samobójstwie" },
          { id: 2, text: "natura Antygony - miłość, nie nienawiść" },
          { id: 3, text: "odmowa uznania edyktu Kreona za boskie prawo" },
          { id: 4, text: "spóźniona zmiana decyzji Kreona" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Cytaty wyrażają: naturę Antygony (miłość), odrzucenie edyktu jako prawa boskiego, ostrzeżenie o samobójstwie i spóźnioną przemianę Kreona.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które stwierdzenia o Kreonie są prawdziwe? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "jest negatywnym odbiciem Antygony",
          "reprezentuje rozum, ale działa emocjonalnie",
          "od początku jest gotów na kompromis",
          "jego pycha (hybris) prowadzi do katastrofy",
          "uosabia ideał sprawiedliwego władcy",
          "kończy jako 'żywy trup' - zrujnowany psychicznie",
        ],
      },
      correctAnswer: [0, 1, 3, 5],
      metadata: {
        explanation:
          "Prawdziwe: Kreon to negatywne odbicie Antygony, deklaruje rozum ale jest emocjonalny, jego pycha prowadzi do tragedii, kończy zrujnowany. Fałszywe: nie jest gotów na kompromis i nie jest ideałem władcy.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj sceny do ich funkcji dramaturgicznych.",
      content: {
        matchingType: "scenes_functions",
        leftColumn: [
          { id: "A", text: "Rozmowa Antygony i Ismeny na początku" },
          { id: "B", text: "Pojedynek Antygony z Kreonem" },
          { id: "C", text: "Przyjście Tejrezjasza" },
          { id: "D", text: "Doniesienie o śmierci Hajmona i Eurydyki" },
        ],
        rightColumn: [
          { id: 1, text: "agon - główny konflikt ideowy" },
          { id: 2, text: "katastrofa - finalne nieszczęście" },
          { id: 3, text: "perypetia - punkt zwrotny" },
          { id: 4, text: "ekspozycja - przedstawienie sytuacji" },
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
          "Rozmowa sióstr to ekspozycja, pojedynek z Kreonem to agon, przyjście Tejrezjasza to perypetia (punkt zwrotny), doniesienia o śmierciach to katastrofa.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Wyjaśnij, na czym polega konflikt tragiczny w sytuacji Antygony.",
      content: {
        instruction:
          "Opisz dylemat Antygony i zastanów się, dlaczego każdy jej wybór był tragiczny. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wskazanie konfliktu między obowiązkiem rodzinnym a posłuszeństwem władzy (1 pkt)",
          "wyjaśnienie, że każdy wybór prowadzi do utraty wartości (1 pkt)",
          "odniesienie do praw boskich vs ludzkich (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Antygona stoi przed tragicznym dylematem: jeśli pogrzebie brata, złamie edykt i zginie; jeśli nie pogrzebie, obrazi bogów i zdradzi rodzinę. Każdy wybór oznacza utratę fundamentalnej wartości - nie może wybrać dobrze. To klasyczna sytuacja tragiczna: konflikt praw boskich z ludzkimi, gdzie bohaterka musi poświęcić jedno dla drugiego.",
        keyWords: [
          "dylemat",
          "konflikt wartości",
          "prawa boskie",
          "prawa ludzkie",
          "utrata",
          "sytuacja bez wyjścia",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Porównaj postawy Antygony i Ismeny wobec edyktu Kreona.",
      content: {
        instruction:
          "Wskaż różnice w motywacji, argumentach i wyborach obu sióstr. (60-90 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "charakterystyka postawy Antygony (bezkompromisowa, heroiczna) (1 pkt)",
          "charakterystyka postawy Ismeny (pragmatyczna, bojaźliwa) (1 pkt)",
          "wyjaśnienie różnic w wartościach i motywacji (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Antygona jest bezkompromisowa i heroiczna - kieruje się prawami boskimi i lojalnością rodzinną, gotowa umrzeć za zasady. Ismena jest pragmatyczna i bojaźliwa - uznaje słabość kobiet wobec męskiej władzy, wybiera życie nad zasady. Antygona wierzy w wartości wyższe od życia, Ismena w rozsądne przetrwanie. Ich kontrast pokazuje różne odpowiedzi na sytuację tragiczną.",
        keyWords: [
          "Antygona",
          "Ismena",
          "heroizm",
          "pragmatyzm",
          "prawa boskie",
          "strach",
          "kontrast",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Przeanalizuj ewolucję postaci Kreona w tragedii.",
      content: {
        instruction:
          "Opisz przemianę Kreona od pewnego siebie władcy do zrujnowanego człowieka. (80-120 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "opis początkowej postawy - pewność siebie, pycha (1 pkt)",
          "odrzucanie rad Hajmona i Tejrezjasza (1 pkt)",
          "punkt zwrotny - przepowiednia i zmiana decyzji (1 pkt)",
          "finał - upadek, uznanie winy, żywy trup (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Na początku Kreon jest pewnym siebie władcą, który wierzy w swoją rację i porządek państwowy. Odrzuca rady syna i chóru z pychy. Dopiero straszliwa przepowiednia Tejrezjasza przeraża go i powoduje zmianę decyzji, ale jest już za późno. Traci syna i żonę przez własną głupotę i sztywność. Kończy jako 'żywy trup' - zrujnowany psychicznie, błagający o śmierć, przyznający się do winy. Jego ewolucja pokazuje mechanizm tragedii: pycha prowadzi do katastrofy.",
        keyWords: [
          "ewolucja",
          "pycha",
          "pewność siebie",
          "Tejrezjasz",
          "punkt zwrotny",
          "katastrofa",
          "uznanie winy",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Wyjaśnij znaczenie metafory drzewa w przemowie Hajmona do ojca.",
      content: {
        instruction:
          "Zinterpretuj metaforę i wyjaśnij, czego Hajmon próbuje nauczyć ojca. (50-70 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "wyjaśnienie metafory: drzewo ugina się, nie łamie (1 pkt)",
          "odniesienie do elastyczności w rządzeniu (1 pkt)",
          "ostrzeżenie przed sztywnością i pychą (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hajmon porównuje dobrego władcę do drzewa, które ugina się pod naporem wiatru i dzięki temu przetrwa, podczas gdy sztywne drzewo się złamie. Metafora symbolizuje potrzebę elastyczności, umiaru i mądrości w rządzeniu. Hajmon ostrzega ojca, że sztywność i pycha doprowadzą do katastrofy - władca musi umieć się ugąć i słuchać głosu rozsądku.",
        keyWords: [
          "metafora",
          "drzewo",
          "elastyczność",
          "umiar",
          "pycha",
          "sztywność",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Omów funkcję postaci Tejrezjasza w strukturze dramatu.",
      content: {
        instruction:
          "Wyjaśnij rolę wieszcza i znaczenie jego przepowiedni dla rozwoju akcji. (80-100 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "określenie Tejrezjasza jako głosu bogów (1 pkt)",
          "przepowiednia jako punkt zwrotny (perypetia) (1 pkt)",
          "wymuszenie zmiany decyzji Kreona (1 pkt)",
          "ujawnienie prawdy o gniewie bogów (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Tejrezjasz to ślepý wieszcz reprezentujący wolę bogów i głos wyższego porządku. Jego przyjście stanowi perypetię - punkt zwrotny akcji. Przepowiednia gniewu bogów i śmierci syna wreszcie przeraża Kreona i wymusza zmianę decyzji. Tejrezjasz ujawnia prawdę: edykt Kreona obraził bogów, bezczeszcząc zmarłego i skazując żywą na śmierć. Jest głosem transcendencji i sprawiedliwości kosmicznej, która musi zwyciężyć.",
        keyWords: [
          "Tejrezjasz",
          "wieszcz",
          "głos bogów",
          "perypetia",
          "przepowiednia",
          "punkt zwrotny",
          "sprawiedliwość",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Wyjaśnij pojęcie 'hybris' na przykładzie Kreona.",
      content: {
        instruction:
          "Zdefiniuj hybris i wskaż konkretne przejawy pychy Kreona. (50-80 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "definicja hybris jako pychy, przekroczenia granic (1 pkt)",
          "przykłady pychy Kreona (edykt, odrzucanie rad) (1 pkt)",
          "konsekwencja - kara bogów (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hybris to pycha i przekroczenie granic wyznaczonych przez bogów i naturę. Kreon przejawia hybris gdy: wydaje edykt przeciwny prawom boskim, odmawia pochówku zmarłemu, odrzuca rady syna i chóru, uważa się za wyższego od praw boskich. Jego pycha prowadzi do nieuchronnej kary - traci wszystko. W tragedii greckiej hybris zawsze kończy się katastrofą.",
        keyWords: [
          "hybris",
          "pycha",
          "przekroczenie granic",
          "edykt",
          "prawa boskie",
          "kara",
          "katastrofa",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Przeanalizuj rolę chóru w Antygonie.",
      content: {
        instruction:
          "Opisz funkcje chóru: komentującą, filozoficzną i dramaturgiczną. (90-120 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "funkcja komentująca - głos zbiorowy (1 pkt)",
          "funkcja filozoficzna - refleksje o życiu, losie (1 pkt)",
          "stasimon - oda o człowieku (1 pkt)",
          "morał końcowy o pysze i mądrości (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Chór w Antygonie pełni kilka funkcji. Po pierwsze, komentuje wydarzenia jako głos zbiorowy obywateli Teb, wyrażając opinie pośrednie między skrajnymi postawami. Po drugie, filozofuje o kondycji ludzkiej, losie i granicach ludzkiej potęgi - szczególnie w słynnej odzie 'Siła jest dziwy, lecz nad wszystkie sięga dziwy człowieka potęga'. Po trzecie, wyznacza strukturę dramatu przez stasimon (pieśni). Końcowy morał chóru podsumowuje tragedię: bogowie karzą pychę, największym skarbem jest rozum i umiar, a mądrości uczymy się przez cierpienie.",
        keyWords: [
          "chór",
          "komentarz",
          "filozofia",
          "oda",
          "człowiek",
          "potęga",
          "morał",
          "pycha",
          "mądrość",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Wyjaśnij paradoks w postawie Kreona wobec emocji i rozumu.",
      content: {
        instruction:
          "Opisz, jak Kreon postrzega sfery męską i żeńską, a jak faktycznie się zachowuje. (60-90 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "poglądy Kreona: mężczyźni = rozum, kobiety = emocje (1 pkt)",
          "faktyczne zachowanie: Kreon działa emocjonalnie (1 pkt)",
          "ironia - odwrócenie stereotypów (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Kreon silnie rozdziela sferę męską od żeńskiej, przypisując mężczyznom rozum a kobietom emocjonalność. Paradoks polega na tym, że to właśnie Kreon zachowuje się emocjonalnie - działa z pychy, gniewu, urażonej dumy. Antygona natomiast postępuje racjonalnie według swoich zasad. Sofokles odwraca stereotypy płciowe pokazując, że to władca kieruje się emocjami, nie rozumem.",
        keyWords: [
          "paradoks",
          "Kreon",
          "emocje",
          "rozum",
          "stereotypy płciowe",
          "pycha",
          "gniew",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Wyjaśnij znaczenie stwierdzenia Antygony o śmierci jako 'zysku'.",
      content: {
        instruction:
          "Zinterpretuj, dlaczego Antygona postrzega przedwczesną śmierć jako zysk. (50-70 słów)",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "odniesienie do życia pełnego cierpień (1 pkt)",
          "klątwa rodu Labdakidów (1 pkt)",
          "śmierć jako wyzwolenie i zachowanie honoru (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Antygona mówi, że przedwczesna śmierć to dla niej 'zysk wobec życia pełnego cierpień'. Jako ostatnia przedstawicielka przeklętego rodu Labdakidów nosi ciężar tragedii rodzinnej. Śmierć traktuje jako wyzwolenie od dalszych nieszczęść i sposób na zachowanie honoru. Woli umrzeć wierna zasadom niż żyć w hańbie.",
        keyWords: [
          "śmierć",
          "zysk",
          "cierpienie",
          "klątwa",
          "ród Labdakidów",
          "wyzwolenie",
          "honor",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Omów funkcję postaci Hajmona jako mediatora między skrajnościami.",
      content: {
        instruction:
          "Wyjaśnij, w jaki sposób Hajmon próbuje pogodzić konflikt i dlaczego ponosi porażkę. (80-110 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "Hajmon jako postać pośrednia, próba mediacji (1 pkt)",
          "argumenty: głos ludu, rozum, elastyczność (1 pkt)",
          "odrzucenie przez ojca z powodu pychy (1 pkt)",
          "tragiczny los - samobójstwo jako konsekwencja niemożności pogodzenia (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hajmon pełni rolę mediatora - próbuje pogodzić ojca z Antygoną i znaleźć kompromis. Używa argumentów racjonalnych: odwołuje się do opinii ludu, przestrzega przed pychą, radzi elastyczność w rządzeniu. Jest rozdarty między miłością do Antygony a posłuszeństwem ojcu. Jego próba mediacji kończy się porażką - Kreon odrzuca rady syna z pychy. Hajmon popełnia samobójstwo przy ciele ukochanej, stając się ofiarą niemożliwego do pogodzenia konfliktu. Jego śmierć pokazuje, że w tragedii nie ma miejsca na kompromis.",
        keyWords: [
          "Hajmon",
          "mediator",
          "kompromis",
          "miłość",
          "racjonalne argumenty",
          "odrzucenie",
          "samobójstwo",
          "tragedia",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 6,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Napisz notatkę syntetyzującą o konflikcie tragicznym w Antygonie.",
      content: {
        topic:
          "Konflikt tragiczny między prawami boskimi a ludzkimi w Antygonie",
        requirements: [
          "charakterystyka praw boskich reprezentowanych przez Antygonę",
          "charakterystyka praw państwowych reprezentowanych przez Kreona",
          "niemożność pogodzenia obu systemów wartości",
          "konsekwencje konfliktu dla bohaterów",
          "150-200 słów",
        ],
      },
      rubric: {
        maxScore: 6,
        criteria: [
          "omówienie praw boskich i argumentów Antygony (1,5 pkt)",
          "omówienie praw państwowych i argumentów Kreona (1,5 pkt)",
          "wyjaśnienie niemożności kompromisu (1,5 pkt)",
          "przedstawienie konsekwencji dla bohaterów (1,5 pkt)",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 7,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Porównaj dwie główne postacie kobiece w tragedii.",
      content: {
        topic: "Kontrast między Antygoną a Ismeną jako dwa modele kobiecości",
        requirements: [
          "charakterystyka Antygony: heroizm, bezkompromisowość",
          "charakterystyka Ismeny: pragmatyzm, strach",
          "różnice w motywacji i wyborach",
          "funkcja kontrastu w strukturze dramatu",
          "200-250 słów",
        ],
      },
      rubric: {
        maxScore: 7,
        criteria: [
          "charakterystyka Antygony (2 pkt)",
          "charakterystyka Ismeny (2 pkt)",
          "analiza różnic (2 pkt)",
          "funkcja kontrastu (1 pkt)",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaki typ bohatera reprezentuje Antygona w tragedii greckiej?",
      content: {
        options: [
          "bohatera z hamartią prowadzącą do upadku",
          "bohatera komicznego",
          "bohatera heroicznego świadomie wybierającego śmierć dla zasad",
          "bohatera bez wad",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Antygona to bohaterka heroiczna, która świadomie wybiera śmierć dla wyższych wartości. Nie ma hamartii (błędu) jak Kreon - jej wybór jest świadomy i szlachetny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaką funkcję pełni w tragedii motyw klątwy rodu Labdakidów?",
      content: {
        options: [
          "tylko element fabularny",
          "tło zwiększające tragizm - bohaterowie dziedziczą ciężar przeszłości",
          "komiczny relief",
          "rozwiązanie konfliktu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Klątwa rodu Labdakidów stanowi tło zwiększające tragizm sytuacji - Antygona i jej rodzeństwo dziedziczą brzęmię grzechów Edypa, co potęguje fatalność ich losów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co oznacza pojęcie 'katharsis' w kontekście tragedii?",
      content: {
        options: [
          "oczyszczenie emocjonalne widza przez litość i trwogę",
          "zemstę bohaterów",
          "happy end",
          "komizm sytuacyjny",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Katharsis to oczyszczenie emocjonalne widza - przeżywając litość i trwogę wobec losu bohaterów, widz dokonuje wewnętrznej puryfikacji według Arystotelesa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "W jaki sposób tragedia realizuje zasadę jedności akcji?",
      content: {
        options: [
          "ma wiele równoległych wątków",
          "wszystko podporządkowane jednej akcji: pogrzeb Polinika i jego konsekwencje",
          "nie ma spójnej akcji",
          "akcja toczy się w wielu miejscach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona realizuje klasyczną jedność akcji - wszystkie wydarzenia (pogrzeb, konfrontacje, śmierci) wynikają z jednej akcji: decyzji Antygony o pogrzebaniu brata wbrew edyktowi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaka jest relacja między Kreonem a Hajmonem?",
      content: {
        options: [
          "bracia",
          "ojciec i syn, konflikt pokoleń",
          "wrogowie polityczni",
          "przyjaciele",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kreon i Hajmon to ojciec i syn. Ich konflikt reprezentuje także konflikt pokoleń - młody Hajmon reprezentuje nowe wartości (miłość, elastyczność), stary Kreon - sztywność i władzę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co symbolizuje samobójstwo Hajmona przy ciele Antygony?",
      content: {
        options: [
          "zwykłe nieszczęście",
          "triumf miłości nad władzą ojca i niemożność życia bez ukochanej",
          "tchórzostwo",
          "przypadek",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Samobójstwo Hajmona symbolizuje triumf miłości nad władzą tyrańskiego ojca oraz niemożność życia bez ukochanej. Jest też zemstą na ojcu - Kreon traci syna przez swoją pychę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jak interpretować samobójstwo Eurydyki?",
      content: {
        options: [
          "jako przypadkową śmierć",
          "jako akt oskarżenia Kreona i dopełnienie jego kary",
          "jako oznakę tchórzostwa",
          "jako happy end",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Eurydyka popełnia samobójstwo obwiniając męża za śmierć syna. To dopełnienie kary Kreona - traci nie tylko syna ale i żonę, zostaje całkowicie sam ze swoją winą.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dlaczego Kreon nazywany jest 'żywym trupem' na końcu?",
      content: {
        options: [
          "bo faktycznie umarł",
          "bo jest zrujnowany psychicznie - żyje ale cierpi więcej niż gdyby umarł",
          "bo jest chory",
          "bo został wygnany",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Posłaniec nazywa Kreona 'żywym trupem' bo choć żyje fizycznie, jest całkowicie zniszczony psychicznie. Życie w poczuciu winy i bólu jest gorsze niż śmierć.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj terminy z tragedii greckiej do ich znaczeń.",
      content: {
        matchingType: "terms_meanings",
        leftColumn: [
          { id: "A", text: "Hybris" },
          { id: "B", text: "Hamartia" },
          { id: "C", text: "Katharsis" },
          { id: "D", text: "Perypetia" },
        ],
        rightColumn: [
          { id: 1, text: "punkt zwrotny akcji" },
          { id: 2, text: "pycha, przekroczenie granic" },
          { id: 3, text: "oczyszczenie emocjonalne" },
          { id: 4, text: "błąd tragiczny bohatera" },
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
          "Hybris to pycha, hamartia to błąd tragiczny, katharsis to oczyszczenie emocjonalne widza, perypetia to punkt zwrotny akcji.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które cechy charakteryzują tragedię jako gatunek? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "bohater szlachetny, o wysokim statusie",
          "konflikt nie do rozwiązania",
          "komizm i happy end",
          "katastrofa w finale",
          "obecność chóru",
          "wątek miłosny jako główny",
        ],
      },
      correctAnswer: [0, 1, 3, 4],
      metadata: {
        explanation:
          "Tragedia cechuje się: bohaterem szlachetnym, konfliktem tragicznym (bez rozwiązania), katastrofą w finale i obecnością chóru. Nie ma komizmu ani happy endu, wątek miłosny nie jest główny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest fundamentalna różnica między koncepcją sprawiedliwości Antygony a Kreona?",
      content: {
        options: [
          "Antygona wierzy w sprawiedliwość proceduralną, Kreon w naturalną",
          "Antygona wierzy w sprawiedliwość uniwersalną opartą na prawach boskich, Kreon w sprawiedliwość relatywną opartą na racji stanu",
          "oboje wierzą w tę samą sprawiedliwość",
          "żadne z powyższych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fundamentalny konflikt dotyczy natury sprawiedliwości: Antygona reprezentuje sprawiedliwość uniwersalną (prawa boskie niezmienne dla wszystkich), Kreon - relatywną (zależną od kontekstu politycznego i dobra państwa).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "W jaki sposób Sofokles problematyzuje tradycyjny podział ról płciowych?",
      content: {
        options: [
          "nie problematyzuje go wcale",
          "pokazuje, że przypisane kobietom emocje faktycznie cechują Kreona, a przypisany mężczyznom rozum - Antygonę",
          "potwierdza stereotypy płciowe",
          "wprowadza tylko postaci męskie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sofokles subwertuje stereotypy: Kreon, reprezentujący męską sferę władzy, działa emocjonalnie (gniew, pycha), podczas gdy Antygona postępuje konsekwentnie według racjonalnego systemu wartości. To odwrócenie tradycyjnych ról.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaki filozoficzny problem podejmuje Sofokles w konflikcie Antygony i Kreona?",
      content: {
        options: [
          "problem hedonizmu",
          "problem relacji między prawem naturalnym a prawem stanowionym",
          "problem sceptycyzmu",
          "problem istnienia Boga",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sofokles podejmuje fundamentalny problem filozofii prawa: czy istnieje prawo naturalne (boskie, uniwersalne) nadrzędne wobec prawa stanowionego przez władcę? To pytanie aktualne do dziś.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza stwierdzenie, że Kreon jest 'negatywnym odbiciem' Antygony?",
      content: {
        options: [
          "że jest jej wrogiem",
          "że reprezentuje odwróconą hierarchię wartości - państwo nad rodziną, prawo ludzkie nad boskie",
          "że jest jej lustrzanym odbiciem we wszystkim",
          "że nie ma z nią nic wspólnego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kreon to negatywne odbicie Antygony - odwraca jej hierarchię wartości. Gdzie ona stawia prawa boskie, on stawia państwowe; gdzie ona rodzinę, on rację stanu. Są lustrzanymi przeciwieństwami w systemie aksjologicznym.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaką funkcję retoryczną pełni oda o człowieku (stasimon) w strukturze tragedii?",
      content: {
        options: [
          "tylko wypełnia czas między scenami",
          "wyraża ambiwalencję wobec ludzkiej potęgi - może budować lub niszczyć",
          "tylkochwali człowieka",
          "nie ma znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oda 'Siła jest dziwy...' wyraża ambiwalentną wizję człowieka: z jednej strony podziw dla jego mocy (język, myśl, technika), z drugiej ostrzeżenie - ta moc może służyć dobru lub złu. Odnosi się do Kreona i Antygony.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "W jakim sensie Antygona jest tragedią 'bez winnego'?",
      content: {
        options: [
          "wszyscy są winni",
          "konflikt wynika z kolizji dwóch słusznych racji (prawa boskie vs dobro państwa), nie z moralnej winy",
          "nikt nie jest winny",
          "tylko Kreon jest winny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygonę nazywa się tragedią 'bez winnego' bo konflikt wynika z kolizji dwóch legitymnych wartości - prawa boskie Antygony i dobro państwa Kreona mają swoje racje. To nie kwestia winy, ale nie do pogodzenia wartości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jak Sofokles wykorzystuje kategorię 'philia' (przyjaźni/miłości rodzinnej)?",
      content: {
        options: [
          "ignoruje ją",
          "pokazuje ją jako najwyższą wartość dla Antygony, nadrzędną wobec życia",
          "krytykuje ją",
          "przedstawia jako słabość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Philia (miłość/lojalność rodzinna) to dla Antygony wartość nadrzędna - mówi 'współkochać przyszłam'. Sofokles pokazuje, że więzy rodzinne mogą być ważniejsze od życia i prawa państwowego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Jaka jest funkcja motywu 'niepisanych praw' (agraphoi nomoi)?",
      content: {
        options: [
          "tylko ozdoba retoryczna",
          "wprowadzenie koncepcji prawa naturalnego uniwersalnego i wiecznego",
          "krytyka wszelkich praw",
          "pochwała chaosu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Niepisane prawa (agraphoi nomoi) to u Sofoklesa koncepcja prawa naturalnego - uniwersalnego, wiecznego, pochodzącego od bogów, nadrzędnego wobec edyktów władców. To fundamentalna kategoria filozofii prawa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co symbolizuje odmowa Antygony przyjęcia pomocy Ismeny w finale?",
      content: {
        options: [
          "nienawiść do siostry",
          "że heroizm wymaga autentyczności - nie można 'dołączyć' do bohaterstwa post factum",
          "chęć samotności",
          "przypadkową decyzję",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona odrzuca 'spóźniony heroizm' Ismeny pokazując, że bohaterstwo wymaga autentycznego wyboru w momencie próby, nie deklaracji po fakcie. Nie można kupić sobie udziału w heroizmie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest relacja między 'dike' (sprawiedliwością boską) a 'nomos' (prawem ludzkim) w tragedii?",
      content: {
        options: [
          "są identyczne",
          "są w nierozwiązywalnym konflikcie - to esencja tragedii",
          "nomos zawsze przeważa",
          "dike zawsze przeważa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konflikt dike (sprawiedliwość boska, Antygona) i nomos (prawo ludzkie, Kreon) to esencja tragedii. Sofokles pokazuje, że mogą być w nierozwiązywalnym konflikcie - to właśnie tworzy sytuację tragiczną.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza określenie Kreona jako człowieka 'który mocno dystansuje się od tragicznych aspiracji Edypa'?",
      content: {
        options: [
          "że Kreon jest lepszy od Edypa",
          "że Kreon to pragmatyk odrzucający wielkie ideały, co jest jego ograniczeniem",
          "że Kreon jest mądrzejszy",
          "że Edyp był zły",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kreon 'dystansuje się od tragicznych aspiracji Edypa' - jest pragmatykiem, nie poszukiwaczem prawdy. Brakuje mu wielkości Edypa, co paradoksalnie prowadzi do jego upadku - nie rozumie wyższych zasad.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest różnica między tragizmem Antygony a tragizmem Kreona?",
      content: {
        options: [
          "nie ma różnicy",
          "Antygona to tragizm heroiczny (świadomy wybór wartości), Kreon to tragizm hamartii (błąd prowadzący do upadku)",
          "oba są identyczne",
          "żadne nie jest tragiczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To dwa różne typy tragizmu: Antygona reprezentuje tragizm heroiczny (świadomy wybór śmierci dla zasad), Kreon - klasyczny tragizm hamartii (wada charakteru - pycha - prowadzi do katastrofy).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jak interpretować stwierdzenie, że 'bez edyktu Kreona Antygona nie mogłaby dowieść swojego bohaterstwa'?",
      content: {
        options: [
          "że Kreon jest bohaterem",
          "że bohaterstwo wymaga oporu wobec niesprawiedliwości - konflikt jest konieczny",
          "że Antygona nie jest bohaterką",
          "że nie ma znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To paradoks tragedii: bohaterstwo Antygony wymaga niesprawiedliwości Kreona jako 'tła'. Bez konfliktu nie byłoby heroizmu. Zło jest konieczne, by dobro mogło się ujawnić - dialektyka tragiczna.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest funkcja motywu 'żywego grobu' (zamurowanie Antygony)?",
      content: {
        options: [
          "tylko sposób egzekucji",
          "symbolizuje odwrócenie porządku życia i śmierci - żywa w grobie, zmarły bez grobu",
          "przypadkowy wybór",
          "najłagodniejsza kara",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Żywy grób symbolizuje odwrócenie porządku: Antygona żywa trafia do grobu, Polinik martwy zostaje bez grobu. To obrazuje chaos wprowadzony przez edykt Kreona - naruszenie granic między życiem a śmiercią.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza pojęcie 'ananke' (konieczności) w kontekście tragedii?",
      content: {
        options: [
          "wolną wolę",
          "nieuchronność losu i przymus wynikający z charakteru bohaterów i sytuacji",
          "przypadek",
          "szczęście",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ananke to konieczność, nieuchronność - połączenie przeznaczenia i charakteru bohaterów. Kreon mówi 'nie można walczyć przeciw konieczności' - rozumie za późno, że jego natura i sytuacja musiały doprowadzić do tragedii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest funkcja paraleli między Antygoną a Niobe w tragedii?",
      content: {
        options: [
          "nie ma paraleli",
          "obie są matkami skazanymi na cierpienie i przemianę w kamień - symbol застывшего żalu",
          "obie są szczęśliwe",
          "nie mają nic wspólnego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona porównuje się do Niobe - mitycznej matki skazanej przez bogów, która zamieniła się w kamień ciągle ronący łzy. Symbol wiecznego, skamieniałego cierpienia. Antygona również czuje się żywym pomnikiem bólu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza stwierdzenie, że Antygona reprezentuje 'etykę przekonań', a Kreon 'etykę odpowiedzialności'?",
      content: {
        options: [
          "że oba podejścia są identyczne",
          "Antygona działa według absolutnych zasad niezależnie od konsekwencji, Kreon bierze pod uwagę skutki dla państwa",
          "że Kreon jest etyczny a Antygona nie",
          "nie ma różnicy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To rozróżnienie Maxa Webera: etyka przekonań (Antygona) opiera się na absolutnych zasadach moralnych bez względu na konsekwencje; etyka odpowiedzialności (Kreon) bierze pod uwagę skutki działań dla dobra zbiorowego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest relacja między 'pathos' (cierpieniem) a poznaniem w tragedii?",
      content: {
        options: [
          "nie ma żadnej relacji",
          "cierpienie prowadzi do poznania - 'pathei mathos' (przez cierpienie do wiedzy)",
          "tylko cierpienie bez poznania",
          "tylko poznanie bez cierpienia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Starożytna zasada 'pathei mathos' (przez cierpienie do wiedzy) realizuje się w Kreonie - dopiero utrata wszystkiego uczy go prawdy o pysze i sprawiedliwości. To esencja tragedii jako narzędzia poznania.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co symbolizuje fakt, że Antygona grzebie brata dwukrotnie?",
      content: {
        options: [
          "przypadek",
          "demonstrację siły woli i świadomego wyboru pomimo konsekwencji",
          "głupotę",
          "nie ma znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Drugie pogrzebanie (po usunięciu pierwszej warstwy ziemi) to demonstracja: Antygona pokazuje, że to świadomy, powtarzalny wybór, nie impuls. Potwierdza swoją decyzję pomimo świadomości konsekwencji.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Dopasuj typy ironii do ich przykładów w tragedii.",
      content: {
        matchingType: "irony_types",
        leftColumn: [
          { id: "A", text: "Ironia tragiczna" },
          { id: "B", text: "Ironia dramatyczna" },
          { id: "C", text: "Ironia sytuacyjna" },
          { id: "D", text: "Ironia werbalna" },
        ],
        rightColumn: [
          { id: 1, text: "Widz wie o samobójstwie, Kreon nie" },
          { id: 2, text: "Kreon chce porządku, ale tworzy chaos" },
          { id: 3, text: "Racjonalny Kreon działa emocjonalnie" },
          { id: 4, text: "Hajmon udaje posłuszeństwo ojcu" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Różne typy ironii: tragiczna (efekt odwrotny od zamierzonego), dramatyczna (widz wie więcej), sytuacyjna (paradoks racjonalista/emocjonalność), werbalna (pozorna zgoda Hajmona).",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Przeanalizuj funkcję motywu 'niepisanych praw' (agraphoi nomoi) w argumentacji Antygony.",
      content: {
        instruction:
          "Wyjaśnij, czym są niepisane prawa, dlaczego Antygona uważa je za nadrzędne i jakie ma to implikacje filozoficzne. (100-130 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "definicja niepisanych praw jako wiecznych i boskich (1 pkt)",
          "argumentacja Antygony: nie Zeus ani Dike nie ogłosili edyktu (1 pkt)",
          "nadrzędność wobec praw ludzkich (1 pkt)",
          "implikacje: koncepcja prawa naturalnego, uniwersalizm moralny (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Niepisane prawa (agraphoi nomoi) to u Antygony prawa boskie, wieczne i niezmienne, pochodzące od Zeusa i Dike. Antygona argumentuje, że edykt Kreona nie pochodzi od bogów - 'Nie Zeus ani Dike ogłosili ten zakaz'. Te prawa są nadrzędne wobec dekretów władców, bo są uniwersalne i wieczne. Filozoficznie wprowadza to koncepcję prawa naturalnego - istnieją normy moralne niezależne od stanowienia ludzkiego, obowiązujące zawsze i wszędzie. To fundament późniejszej filozofii prawa i teorii praw człowieka - uniwersalizm moralny przeciw relatywizmowi.",
        keyWords: [
          "niepisane prawa",
          "agraphoi nomoi",
          "Zeus",
          "Dike",
          "wieczne",
          "uniwersalne",
          "prawo naturalne",
          "nadrzędność",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Wyjaśnij, w jaki sposób Sofokles problematizuje relację między jednostką a państwem.",
      content: {
        instruction:
          "Przeanalizuj argumenty obu stron i wyjaśnij, dlaczego konflikt pozostaje nierozwiązany. (110-140 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "przedstawienie racji Kreona: dobro państwa, bezpieczeństwo (1 pkt)",
          "przedstawienie racji Antygony: godność jednostki, prawa człowieka (1 pkt)",
          "wyjaśnienie, że obie strony mają legitymację (1 pkt)",
          "brak syntezy - tragiczność konfliktu (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Sofokles nie daje prostej odpowiedzi na pytanie o relację jednostka-państwo. Kreon ma rację argumentując, że porządek państwowy i bezpieczeństwo zbiorowe wymagają posłuszeństwa prawu - bez tego chaos. Antygona ma rację broniąc godności jednostki i praw wyższych od państwa - są granice władzy. Problem w tym, że obie racje są legitymne ale nie do pogodzenia. Sofokles nie wskazuje syntezy - to właśnie czyni sytuację tragiczną. Pokazuje, że pytanie o granice władzy państwa wobec sumienia jednostki nie ma prostej odpowiedzi i pozostaje aktualne przez wieki.",
        keyWords: [
          "jednostka",
          "państwo",
          "Kreon",
          "Antygona",
          "racje",
          "konflikt",
          "brak syntezy",
          "tragizm",
          "legitymacja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Przeanalizuj funkcję kontrastu między 'wiedzieć' a 'być mądrym' w tragedii.",
      content: {
        instruction:
          "Wyjaśnij różnicę między wiedzą a mądrością na przykładzie Kreona i znaczenie zasady 'pathei mathos'. (100-130 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "rozróżnienie wiedzy i mądrości (1 pkt)",
          "Kreon ma wiedzę (władza, prawo), ale brak mu mądrości (1 pkt)",
          "zasada pathei mathos - przez cierpienie do wiedzy (1 pkt)",
          "dopiero utrata uczy go prawdziwej mądrości (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Tragedia rozróżnia wiedzę od mądrości. Kreon ma wiedzę - rozumie politykę, prawo, władzę. Ale brakuje mu mądrości - głębszego zrozumienia ludzkiej natury, granic władzy, wartości. Chór kończy mówiąc, że 'mądrości uczymy się w późnym wieku przez cierpienie' - to zasada 'pathei mathos' (przez cierpienie do wiedzy). Dopiero katastrofa - utrata syna i żony - uczy Kreona prawdziwej mądrości o pysze i sprawiedliwości. Wiedza intelektualna nie zastąpi mądrości nabytej przez doświadczenie egzystencjalne.",
        keyWords: [
          "wiedza",
          "mądrość",
          "Kreon",
          "pathei mathos",
          "cierpienie",
          "doświadczenie",
          "pycha",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Omów paradoks tragiczny: bohaterowie mają rację i popełniają błąd jednocześnie.",
      content: {
        instruction:
          "Wyjaśnij, w jaki sposób zarówno Antygona jak i Kreon są jednocześnie 'w słuszności' i 'w błędzie'. (120-150 słów)",
      },
      rubric: {
        maxScore: 5,
        criteria: [
          "racja Antygony: prawa boskie, lojalność rodzinna (1 pkt)",
          "błąd Antygony: bezkompromisowość, brak elastyczności (1 pkt)",
          "racja Kreona: porządek państwowy, dobro wspólne (1 pkt)",
          "błąd Kreona: pycha, przekroczenie granic (1 pkt)",
          "wyjaśnienie paradoksu: tragizm wynika z konfliktu dwóch słuszności (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "To esencja tragizmu: obie strony mają rację i popełniają błąd. Antygona ma rację broniąc praw boskich i lojalności rodzinnej - są wartości wyższe od edyktu. Ale popełnia błąd przez skrajny ry­goryzm - nie próbuje dialogu, odrzuca Ismenę. Kreon ma rację dbając o porządek państwowy - władca musi zapewnić bezpieczeństwo. Ale popełnia błąd przez pychę - przekracza granice, nie słucha rad, stawia się ponad bogami. Paradoks polega na tym, że tragedia nie wynika z prostego zła - wynika z kolizji dwóch legitymnych racji. Gdyby jedna strona była po prostu zła, nie byłoby tragedii - byłby tylko konflikt dobra ze złem.",
        keyWords: [
          "paradoks",
          "racja",
          "błąd",
          "Antygona",
          "Kreon",
          "tragizm",
          "kolizja wartości",
          "legitymacja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Przeanalizuj funkcję motywu 'zamurowania żywcem' w symbolice tragedii.",
      content: {
        instruction:
          "Wyjaśnij symboliczne znaczenie kary zamurowania i jej związek z odwróceniem porządku życia/śmierci. (100-130 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "zamurowanie jako forma 'żywego grobu' (1 pkt)",
          "odwrócenie porządku: żywa w grobie, zmarły bez grobu (1 pkt)",
          "zakłócenie granic między życiem a śmiercią (1 pkt)",
          "symbolika chaosu wprowadzonego przez edykt (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Zamurowanie Antygony żywcem to 'żywy grób' - paradoksalna kara symbolizująca odwrócenie porządku. Antygona żywa trafia do grobu (królestwo śmierci), podczas gdy Polinik martwy pozostaje bez grobu (w królestwie żywych). To obrazuje chaos wprowadzony przez edykt Kreona - naruszenie granic między życiem a śmiercią, sferą żywych i umarłych. W myśleniu greckim takie zakłócenie kosmicznego porządku musi doprowadzić do katastrofy. Zamurowanie ma też znaczenie praktyczne dla Kreona - formalnie unika przelania krwi, więc odpowiedzialność spada na bogów.",
        keyWords: [
          "zamurowanie",
          "żywy grób",
          "odwrócenie porządku",
          "życie",
          "śmierć",
          "chaos",
          "granice",
          "kosmiczny ład",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Omów relację między 'physis' (naturą) a 'nomos' (prawem/konwencją) w tragedii.",
      content: {
        instruction:
          "Wyjaśnij ten fundamentalny konflikt sofistyczny i jego reprezentację w Antygonie. (130-160 słów)",
      },
      rubric: {
        maxScore: 5,
        criteria: [
          "definicja physis jako natury, porządku naturalnego (1 pkt)",
          "definicja nomos jako prawa stanowionego, konwencji (1 pkt)",
          "Antygona reprezentuje physis (prawa naturalne) (1 pkt)",
          "Kreon reprezentuje nomos (prawo ustanowione) (1 pkt)",
          "kontekst sofistyczny: debata V wieku p.n.e. (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Konflikt physis-nomos to fundamentalna debata V wieku p.n.e. Physis to natura, porządek naturalny, prawa wynikające z natury rzeczy - niezmienne i uniwersalne. Nomos to prawo stanowione, konwencja społeczna, ustalenia ludzi - zmienne i relatywne. Antygona reprezentuje physis - odwołuje się do naturalnego obowiązku pochówku, praw boskich wpisanych w naturę. Kreon reprezentuje nomos - jego edykt to konwencja polityczna, ustalenie władcy. Sofiści pytali: co jeśli nomos (prawo ludzkie) sprzeciwia się physis (naturze)? Sofokles nie daje jednoznacznej odpowiedzi - pokazuje tragiczność sytuacji, gdy oba porządki kolidują. To kluczowa debata o źródłach prawa aktualna do dziś.",
        keyWords: [
          "physis",
          "nomos",
          "natura",
          "prawo",
          "konwencja",
          "Antygona",
          "Kreon",
          "sofiści",
          "konflikt",
          "porządek",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Przeanalizuj znaczenie metafory 'państwo jako statek' w przemowie Kreona.",
      content: {
        instruction:
          "Wyjaśnij tę metaforę i jej implikacje dla koncepcji władzy Kreona. (90-120 słów)",
      },
      rubric: {
        maxScore: 4,
        criteria: [
          "wyjaśnienie metafory: państwo to statek, władca to sternik (1 pkt)",
          "implikacja: potrzeba jednego dowódcy, hierarchii (1 pkt)",
          "usprawiedliwienie autorytaryzmu (1 pkt)",
          "krytyka Sofoklesa: sztywne sterowanie prowadzi do katastrofy (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Kreon używa metafory państwa jako statku: 'nasza ojczyzna to statek, który niesie nas bezpiecznie'. Implikacje: państwo potrzebuje jednego sternika (władcy), hierarchii, dyscypliny. Jak statek w burzy, państwo wymaga silnej ręki. To usprawiedliwienie dla autorytaryzmu Kreona. Jednak Hajmon odwraca tę metaforę: sztywny sternik prowadzi statek na skały, dobry sternik musi być elastyczny. Sofokles pokazuje, że metafora może służyć obu stronom - i uzasadnieniu władzy, i jej krytyce. Kreon kończy jako sternik, który zatopił własny statek przez sztywność.",
        keyWords: [
          "metafora",
          "państwo",
          "statek",
          "sternik",
          "władza",
          "autorytaryzm",
          "elastyczność",
          "Kreon",
          "Hajmon",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 8,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Napisz notatkę syntetyzującą o wielowymiarowości konfliktu tragicznego.",
      content: {
        topic:
          "Wielowymiarowość konfliktu w Antygonie - poziomy i interpretacje",
        requirements: [
          "poziom teologiczny: bogowie vs ludzie",
          "poziom polityczny: jednostka vs państwo",
          "poziom rodzinny: lojalność krwi vs lojalność państwowa",
          "poziom płciowy: kobiece vs męskie",
          "poziom filozoficzny: prawo naturalne vs stanowione",
          "syntetyczne ujęcie: wszystkie wymiary się przenikają",
          "250-300 słów",
        ],
      },
      rubric: {
        maxScore: 8,
        criteria: [
          "omówienie poziomu teologicznego (1,5 pkt)",
          "omówienie poziomu politycznego (1,5 pkt)",
          "omówienie poziomu rodzinnego (1 pkt)",
          "omówienie poziomu płciowego (1 pkt)",
          "omówienie poziomu filozoficznego (1,5 pkt)",
          "synteza: wzajemne przenikanie się wymiarów (1,5 pkt)",
        ],
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 9,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Omów Antygonę jako tragedię 'dialektyczną bez syntezy'.",
      content: {
        topic: "Struktura dialektyczna Antygony: teza, antyteza i brak syntezy",
        requirements: [
          "wyjaśnienie struktury dialektycznej (Hegel)",
          "teza: prawa boskie, rodzina, jednostka (Antygona)",
          "antyteza: prawa państwowe, porządek, władza (Kreon)",
          "brak syntezy: konflikt pozostaje nierozwiązany",
          "dlaczego brak syntezy tworzy tragizm",
          "implikacje filozoficzne: nie wszystkie konflikty mają rozwiązanie",
          "300-350 słów",
        ],
      },
      rubric: {
        maxScore: 9,
        criteria: [
          "wyjaśnienie struktury dialektycznej (1,5 pkt)",
          "charakterystyka tezy - Antygona (2 pkt)",
          "charakterystyka antytezy - Kreon (2 pkt)",
          "wyjaśnienie braku syntezy (2 pkt)",
          "implikacje filozoficzne (1,5 pkt)",
        ],
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 20,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Napisz rozprawkę: Czy w konflikcie Antygony i Kreona można mówić o 'zwycięzcy'? Omów problem na podstawie tragedii Sofoklesa.",
      content: {
        thesis: "Czy w konflikcie Antygony i Kreona można mówić o 'zwycięzcy'?",
        structure: {
          introduction: "Wprowadzenie: natura konfliktu tragicznego",
          arguments: [
            "Racja Antygony: triumf moralny, wierność zasadom, ale śmierć fizyczna",
            "Racja Kreona: przeżywa, ale w rozpaczy - 'żywy trup', moralna klęska",
            "Paradoks: obie strony przegrywają - to esencja tragedii",
            "Interpretacja: w tragedii nie ma zwycięzców, tylko ofiary konfliktu wartości",
          ],
          conclusion: "Wnioski: tragizm polega na niemożności wygranej",
        },
        requirements: [
          "struktura: wstęp - rozwinięcie - zakończenie",
          "argumenty filozoficzne i literackie",
          "odniesienie do tekstu tragedii",
          "kontekst: teoria tragedii, konfliktu tragicznego",
          "język eseistyczny, akademicki",
          "400-500 słów",
        ],
        wordLimit: {
          min: 400,
          max: 500,
        },
      },
      rubric: {
        maxScore: 20,
        formalScore: 2,
        literaryScore: 10,
        compositionScore: 4,
        languageScore: 4,
        criteria: {
          formal: "Zachowanie wymogów formalnych (objętość, struktura, tytuł)",
          literary:
            "Znajomość tragedii, głębokość analizy, argumenty filozoficzne, kontekst teoretyczny",
          composition:
            "Logika wywodu, spójność, teza, argumentacja, kontrargumenty",
          language: "Język akademicki, precyzja, styl eseistyczny, poprawność",
        },
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 20,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Napisz esej interpretacyjny: Antygona Sofoklesa jako traktat o granicach władzy państwowej. Omów aktualność problematyki.",
      content: {
        thesis:
          "Antygona jako traktat o granicach władzy państwowej i jej aktualność",
        structure: {
          introduction:
            "Problem: gdzie kończą się prawa państwa wobec jednostki?",
          main_body: [
            "Pozycja Kreona: władza absolutna, racja stanu",
            "Pozycja Antygony: sumienie jednostki, prawa nadrzędne",
            "Sofokles nie rozstrzyga - pokazuje tragiczność",
            "Aktualność: totalitaryzmy XX w., prawa człowieka, nieposłuszeństwo obywatelskie",
          ],
          conclusion: "Pytanie pozostaje otwarte - to znak wielkości dzieła",
        },
        requirements: [
          "forma eseju interpretacyjnego",
          "analiza filozoficzna i polityczna",
          "przykłady historyczne (XX wiek)",
          "odniesienia do tekstu tragedii",
          "język akademicki, eseistyczny",
          "perspektywa krytyczna",
          "450-550 słów",
        ],
        wordLimit: {
          min: 450,
          max: 550,
        },
      },
      rubric: {
        maxScore: 20,
        formalScore: 2,
        literaryScore: 10,
        compositionScore: 4,
        languageScore: 4,
        criteria: {
          formal: "Forma eseju, objętość, struktura",
          literary:
            "Interpretacja tekstu, kontekst filozoficzny i historyczny, aktualność problemu",
          composition: "Logika argumentacji, spójność, perspektywa krytyczna",
          language:
            "Język akademicki, precyzja terminologiczna, styl eseistyczny",
        },
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co oznacza określenie Antygony jako tragedii 'bez katharsis dla Kreona'?",
      content: {
        options: [
          "że Kreon nie przeżywa oczyszczenia emocjonalnego",
          "że poznanie prawdy nie przynosi mu ulgi, tylko wieczne cierpienie",
          "że Kreon jest szczęśliwy",
          "że nie ma tragedii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kreon poznaje prawdę (anagnorisis), ale zamiast oczyszczenia (katharsis) dostaje wieczne cierpienie - musi żyć ze świadomością winy. To pesymistyczna wersja tragedii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest relacja między 'ethos' (charakterem) a 'daimon' (bóstwem/losem) u Heraklita: 'ethos anthropoi daimon'?",
      content: {
        options: {
          contextLinks: [
            {
              trigger: "ethos anthropoi daimon",
              title: "Heraklitejska sentencja",
              type: "text",
              content:
                "Sentencja Heraklita 'ethos anthropoi daimon' (charakter jest dla człowieka losem/bóstwem) wyraża ideę, że los człowieka nie jest całkowicie zewnętrzny, ale wynika z jego charakteru. To, kim jesteśmy, determinuje to, co nam się przydarzy.",
              moreInfoLink: "",
            },
          ],
          options: [
            "los jest całkowicie zewnętrzny",
            "charakter człowieka jest jego losem - natura determinuje przeznaczenie",
            "los i charakter są niezależne",
            "nie ma żadnej relacji",
          ],
        },
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sentencja Heraklita 'ethos anthropoi daimon' (charakter jest losem) doskonale opisuje Antygonę: pycha Kreona jest jego losem, heroizm Antygony - jej przeznaczeniem. Charakter determinuje los.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question: "Co oznacza pojęcie 'anagnorisis' w kontekście Kreona?",
      content: {
        options: [
          "poznanie prawdy o sobie za późno by zmienić los",
          "szczęśliwe zakończenie",
          "brak świadomości",
          "triumf",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Anagnorisis (rozpoznanie) to moment, gdy bohater poznaje prawdę. Kreon rozpoznaje swoją pychę i błąd, ale za późno - nie może już uratować rodziny. To klasyczny element tragedii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jak interpretować fakt, że Antygona wybiera śmierć 'niezamężna, bez potomstwa'?",
      content: {
        options: [
          "nie ma to znaczenia",
          "podkreśla tragizm - rezygnuje z pełni życia (małżeństwo, macierzyństwo) dla zasad",
          "to przypadek",
          "Antygona tego nie chce",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antygona lamentuje, że umiera 'bez małżeństwa, bez dzieci' - to w kulturze greckiej oznacza niepełne życie. Podkreśla wagę poświęcenia: rezygnuje z podstawowych kobiecych ról dla wyższych wartości.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Co symbolizuje dwukrotne posypanie ciała ziemią przez Antygonę?",
      content: {
        options: [
          "przypadek",
          "demonstrację świadomego, powtarzalnego wyboru - nie impuls, ale przemyślana decyzja",
          "błąd",
          "chęć zemsty",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Drugie pogrzebanie po usunięciu ziemi przez strażników to dowód, że to nie impuls ale świadoma, powtarzalna decyzja. Antygona potwierdza swój wybór pomimo konsekwencji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Jaka jest funkcja motywu 'pustego grobu' i 'pełnego grobu' w finale?",
      content: {
        options: [
          "tylko realistyczny szczegół",
          "Hades/grób Polinika pusty (ptaki), grób Antygony pełny (ciała) - odwrócony porządek",
          "przypadek",
          "nie ma znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Finałowe odkrycie: grób Polinika pusty (ciało rozszarpane), grób Antygony pełny (ona, Hajmon). To symboliczne odwrócenie - chaos wprowadzony przez edykt materializuje się w obrazie.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Dopasuj interpretacje filozoficzne tragedii do ich autorów/szkół.",
      content: {
        matchingType: "interpretations_schools",
        leftColumn: [
          {
            id: "A",
            text: "Tragedia jako konfliktu praw równie usprawiedliwionych",
          },
          {
            id: "B",
            text: "Tragedia jako konflikt jednostki z totalitaryzmem",
          },
          { id: "C", text: "Tragedia jako konflikt kultury i natury" },
          { id: "D", text: "Tragedia jako ilustracja hybris i nemezis" },
        ],
        rightColumn: [
          { id: 1, text: "Interpretacja klasyczna grecka" },
          { id: 2, text: "Hegel - dialektyka ducha" },
          { id: 3, text: "Lektura strukturalistyczna" },
          { id: 4, text: "Lektura polityczna XX wieku" },
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
          "Różne interpretacje: Hegel (równorzędne prawa), XX wiek (jednostka vs totalitaryzm), strukturalizm (kultura vs natura), klasyczna (hybris-nemezis).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Które stwierdzenia o teorii tragedii Arystotelesa są prawdziwe? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "tragedia powinna wywoływać litość (eleos) i trwogę (phobos)",
          "bohater musi być absolutnie doskonały",
          "katharsis to oczyszczenie emocjonalne przez przeżycie tragedii",
          "hamartia to zawsze grzech moralny",
          "perypetia to nagłe odwrócenie fortuny",
          "anagnorisis to moment rozpoznania prawdy",
        ],
      },
      correctAnswer: [0, 2, 4, 5],
      metadata: {
        explanation:
          "Według Arystotelesa: tragedia wywołuje litość i trwogę prowadząc do katharsis, ma perypetię i anagnorisis. Bohater nie jest doskonały (miara), hamartia to nie zawsze grzech (może być cecha charakteru).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Dopasuj modele sprawiedliwości do ich reprezentacji w tragedii.",
      content: {
        matchingType: "justice_models",
        leftColumn: [
          { id: "A", text: "Sprawiedliwość wyrównawcza" },
          { id: "B", text: "Sprawiedliwość dystrybutywna" },
          { id: "C", text: "Sprawiedliwość naprawcza" },
          { id: "D", text: "Sprawiedliwość retrybutywna" },
        ],
        rightColumn: [
          { id: 1, text: "Nemezis - bogowie karzą Kreona za pychę" },
          { id: 2, text: "Hades - równe prawa dla wszystkich zmarłych" },
          { id: 3, text: "próba Kreona naprawienia błędu (za późno)" },
          { id: 4, text: "edykt Kreona - rozdział nagród/kar" },
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
          "Różne modele sprawiedliwości: wyrównawcza (równość - Hades), dystrybutywna (podział - edykt), naprawcza (Kreon próbuje naprawić), retrybutywna (kara - nemezis).",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Omów Heglowską interpretację Antygony jako konfliktu 'dwóch równie usprawiedliwionych racji'.",
      content: {
        instruction:
          "Wyjaśnij interpretację Hegla, przedstaw obie racje jako równorzędne i omów implikacje dla pojmowania tragedii. (140-170 słów)",
      },
      rubric: {
        maxScore: 5,
        criteria: [
          "Hegel: tragedia to konflikt równorzędnych zasad (1 pkt)",
          "Antygona reprezentuje rodzinę, bogów, jednostkę (1 pkt)",
          "Kreon reprezentuje państwo, prawo, wspólnotę (1 pkt)",
          "obie strony mają rację i to tworzy tragizm (1 pkt)",
          "implikacje: tragedia wyższego rzędu niż dobro vs zło (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hegel interpretuje Antygonę jako konflikt 'dwóch równie usprawiedliwionych racji' - to kluczowa teoria tragedii. Antygona reprezentuje prawo rodziny, bogów, sfery prywatnej i jednostkowej - zasady równie ważne i prawdziwe. Kreon reprezentuje prawo państwa, porządku publicznego, dobra wspólnoty - zasady również ważne i prawdziwe. Tragizm wynika właśnie z tego, że obie strony mają rację - nie jest to konflikt dobra ze złem, ale kolizja dwóch dóbr. Dla Hegla to wyższa forma tragedii: nie prostota moralności, ale dialektyka ducha, gdzie teza i antyteza nie mogą się pogodzić. Tragedia ukazuje ograniczenia jednostronnych zasad i konieczność ich przezwyciężenia w syntezie - której w Antygonie brakuje.",
        keyWords: [
          "Hegel",
          "równorzędne racje",
          "rodzina",
          "państwo",
          "dialektyka",
          "tragizm",
          "kolizja dóbr",
          "synteza",
        ],
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 20,
      epoch: "ANTIQUITY",
      work: "Antygona",
      question:
        "Napisz esej krytycznoliteracki: Antygona jako arcydzieło tragedii - analiza wielowymiarowości konfliktu i uniwersalności problematyki.",
      content: {
        thesis:
          "Dlaczego Antygona uznawana jest za jedno z arcydzieł tragedii światowej?",
        structure: {
          introduction:
            "Teza: wielowymiarowość i uniwersalność czynią Antygonę ponadczasową",
          main_body: [
            "Doskonałość konstrukcji dramatycznej (jedności, perypetia, katharsis)",
            "Wielowymiarowość konfliktu (teologiczny, polityczny, rodzinny, płciowy)",
            "Głębia filozoficzna (prawo naturalne, granice władzy)",
            "Uniwersalność: problemy aktualne przez 2500 lat",
            "Postaci wielowymiarowe, nie schematyczne",
            "Język poetycki i retoryka",
          ],
          conclusion:
            "Synteza: arcydzieło bo łączy doskonałość formy z głębią treści",
        },
        requirements: [
          "forma eseju krytycznoliterackiego",
          "analiza formalna i treściowa",
          "kontekst teoretyczny (teoria tragedii)",
          "język akademicki, precyzyjny",
          "perspektywa komparatystyczna (odniesienia do innych dzieł)",
          "500-600 słów",
        ],
        wordLimit: {
          min: 500,
          max: 600,
        },
      },
      rubric: {
        maxScore: 20,
        formalScore: 2,
        literaryScore: 10,
        compositionScore: 4,
        languageScore: 4,
        criteria: {
          formal: "Forma eseju, struktura, objętość",
          literary:
            "Analiza formalna i treściowa, kontekst teoretyczny, głębia interpretacji, perspektywa komparatystyczna",
          composition: "Logika wywodu, spójność argumentacji, synteza",
          language: "Język akademicki, terminologia literacka, precyzja, styl",
        },
      },
    },

    // =========== KONIEC PYTAŃ ANTYGONA ==============//

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
      question: "Dopasuj postać z „Lalki” do jej roli społecznej.",
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
      question: "Dopasuj postaci z „Lalki” do ich głównych cech charakteru.",
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
      question:
        "Kim była Helena Stawska i czym różniła się od Izabeli Łęckiej?",
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
        "Kto w „Lalce” wygłosił przemówienie o małżeństwie jako związku rozumnym, a nie miłosnym?",
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

    // ======================== POCZĄTEK PYTAŃ MAKBET ================= //

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Które zdanie najlepiej opisuje funkcję motywu snu w tragedii?",
      content: {
        options: [
          "Sen jest tylko tłem dla wydarzeń",
          "Sen to metafora śmierci i zapomnienia",
          "Sen symbolizuje niewinność i spokój sumienia, którego Makbet się pozbawia",
          "Sen reprezentuje marzenia o władzy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Sen w Makbecie symbolizuje niewinność, spokój sumienia i naturalny porządek, które bohater niszczy przez zbrodnię.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Dlaczego Shakespeare sprawia, że tylko Makbet widzi ducha Banka?",
      content: {
        options: [
          "To projekcja jego poczucia winy i znak rozpadu psychicznego",
          "Banko rzeczywiście nawiedza tylko Makbeta",
          "Inni udają, że nie widzą ducha",
          "To efekt trucizny w winie",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Selektywna widoczność ducha sugeruje, że to projekcja psychologiczna - manifestacja winy i rozpadu umysłu Makbeta.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak interpretować dwuznaczność przepowiedni wiedźm w kontekście problemu wolnej woli?",
      content: {
        options: [
          "Przepowiednie są jasne - Makbet nie ma wyboru",
          "Wiedźmy kłamią, wszystko zależy od Makbeta",
          "To self-fulfilling prophecy - przepowiednie spełniają się właśnie przez działania Makbeta",
          "Przepowiednie są przypadkowe i nie mają znaczenia",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Shakespeare celowo pozostawia kwestię nierozstrzygniętą - przepowiednie mogą być samospełniającą się przepowiednią.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "W którym momencie następuje perypetia (punkt zwrotny) w tragedii?",
      content: {
        options: [
          "Zabójstwo Duncana",
          "Pierwsze spotkanie z wiedźmami",
          "Zabójstwo Banka",
          "Pojawienie się ducha Banka na uczcie",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Scena z duchem to punkt zwrotny - Makbet traci kontrolę publicznie, ujawnia swój rozpad psychiczny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Co symbolizuje niemożność wypowiedzenia 'Amen' przez Makbeta po morderstwie?",
      content: {
        options: [
          "Utratę łaski Bożej i odcięcie od sacrum",
          "Zmęczenie po walce",
          "Strach przed odkryciem",
          "Brak wiary religijnej",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Niemożność modlitwy symbolizuje duchowe potępienie - Makbet odciął się od Boga przez swoją zbrodnię.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Czym różni się podejście Makbeta i Banka do przepowiedni?",
      content: {
        options: [
          "Obaj natychmiast wierzą",
          "Obaj są sceptyczni",
          "Makbet jest sceptyczny, Banko wierzy",
          "Makbet ulega pokusie, Banko zachowuje ostrożność i moralność",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Banko zachowuje dystans i integralność moralną, podczas gdy Makbet pozwala ambicji zdominować sumienie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak można interpretować halucynacje Makbeta z perspektywy psychologicznej?",
      content: {
        options: [
          "To objawy schizofrenii",
          "Projekcje stłumionych treści psychicznych i manifestacja PTSD",
          "Efekt zatrucia",
          "Zwykłe zmęczenie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Halucynacje to projekcje wypartej winy i traumy - Shakespeare wyprzedza odkrycia psychologii głębi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jak Lady Makbet podważa elżbietańskie normy płciowe?",
      content: {
        options: [
          "Jest posłuszną żoną",
          "Nie interesuje się polityką",
          "Odrzuca 'kobiecą' słabość i przejmuje męską rolę w małżeństwie",
          "Jest typową damą dworu",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Lady Makbet aktywnie odrzuca kobiecość, dominuje nad mężem i przejmuje inicjatywę - łamie wszystkie konwencje epoki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Dlaczego temat królobójstwa był szczególnie aktualny w 1606 roku?",
      content: {
        options: [
          "Trwała wojna domowa",
          "Niedawny Spisek Prochowy (1605) - próba zabicia króla Jakuba I",
          "Śmierć Elżbiety I",
          "Powstanie w Szkocji",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Spisek Prochowy z 1605 roku uczynił temat królobójstwa niezwykle aktualnym i niebezpiecznym.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak Shakespeare przedstawia problem teodycei (sprawiedliwości Bożej) w finale?",
      content: {
        options: [
          "Bóg bezpośrednio karze Makbeta",
          "Zło samo się niszczy, porządek moralny zostaje przywrócony przez ludzkie działania",
          "Nie ma żadnej sprawiedliwości",
          "Wiedźmy wymierzają karę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Shakespeare pokazuje, że zło nosi w sobie zarodek samozniszczenia - porządek przywracają ludzie, ale według wyższego planu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dlaczego Makbet jest najkrótszą tragedią Shakespeare'a?",
      content: {
        options: [
          "Shakespeare się spieszył",
          "Intensyfikacja dramatyczna - brak wątków pobocznych pogłębia koncentrację na psychologii zbrodni",
          "Część tekstu zaginęła",
          "Był to skrót na potrzeby dworu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kondensacja akcji i eliminacja pobocznych wątków intensyfikuje napięcie i skupienie na psychologicznym dramacie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jaki efekt osiąga Shakespeare przez kontrast między językiem Makbeta na początku i końcu dramatu?",
      content: {
        options: [
          "Pokazuje degradację umysłu - od poezji do nihilistycznej prozy",
          "Nie ma różnicy w języku",
          "Język staje się bardziej wyszukany",
          "Makbet przestaje mówić",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Ewolucja od poetyckich metafor do nihilistycznych stwierdzeń pokazuje duchowy i psychiczny rozpad bohatera.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Które stwierdzenie najlepiej opisuje moralną wymowę tragedii?",
      content: {
        options: [
          "Władza absolutna deprawuje absolutnie, ale człowiek zachowuje wolność wyboru",
          "Los jest z góry przesądzony",
          "Zło zawsze zwycięża",
          "Moralność jest względna",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Shakespeare pokazuje destrukcyjną siłę władzy, ale podkreśla odpowiedzialność człowieka za swoje wybory.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Co symbolizuje scena mycia rąk przez Lady Makbet w kontekście całego dramatu?",
      content: {
        options: [
          "Higienę w średniowieczu",
          "Obsesję czystości",
          "Ironiczne odwrócenie jej słów o 'odrobinie wody' - wina jest niezmywalna",
          "Rytuał pogrzebowy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "To tragiczna ironia - kobieta mówiąca, że 'trochę wody' zmyje zbrodnię, nie może zmyć wyimaginowanej krwi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak nihilizm Makbeta ('życie to opowieść idioty') odnosi się do elżbietańskiego światopoglądu?",
      content: {
        options: [
          "Potwierdza chrześcijańską wizję świata",
          "Jest typowy dla epoki",
          "Radykalnie podważa sens istnienia w uporządkowanym kosmosie Great Chain of Being",
          "Nie ma związku z epoką",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Nihilizm Makbeta to radykalne zaprzeczenie elżbietańskiej wizji uporządkowanego, sensownego kosmosu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Które źródło NIE było inspiracją dla Shakespeare'a przy pisaniu Makbeta?",
      content: {
        options: [
          "Kroniki Holinsheda",
          "Historia Szkocji Hectora Boece'a",
          "Daemonologie króla Jakuba I",
          "Boska Komedia Dantego",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Shakespeare czerpał z Holinsheda, Boece'a i traktatu Jakuba I o czarach, ale nie z Dantego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Dlaczego rola Lady Makbet była szczególnie wymagająca w teatrze elżbietańskim?",
      content: {
        options: [
          "Była za długa",
          "Wymagała śpiewu",
          "Grali ją chłopcy, którzy musieli przekonująco wcielić się w dominującą kobietę",
          "Wymagała akrobacji",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W teatrze elżbietańskim role kobiece grali chłopcy - rola dominującej, dojrzałej Lady Makbet była wyzwaniem.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Które interpretacje motywu krwi są uzasadnione w tekście? (wybierz wszystkie)",
      content: {
        options: [
          "Krew jako dziedzictwo i prawo do tronu",
          "Krew jako wina nie do odkupienia",
          "Krew jako ofiara religijna",
          "Krew jako więź rodzinna",
          "Krew jako znak męstwa wojennego",
        ],
      },
      correctAnswer: [0, 1, 3, 4],
      metadata: {
        explanation:
          "Krew funkcjonuje wieloznacznie: dynastia, wina, rodzina i wojenna chwała, ale nie jako ofiara religijna.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dopasuj koncepcje filozoficzne do ich realizacji w dramacie",
      content: {
        matchingType: "philosophy_drama",
        leftColumn: [
          { id: "A", text: "Machiavellizm" },
          { id: "B", text: "Determinizm" },
          { id: "C", text: "Nihilizm" },
          { id: "D", text: "Teodycea" },
        ],
        rightColumn: [
          { id: 1, text: "Monolog 'jutro, i jutro, i jutro'" },
          { id: 2, text: "Cel uświęca środki - morderstwo dla władzy" },
          { id: 3, text: "Przepowiednie jako przeznaczenie" },
          { id: 4, text: "Przywrócenie porządku moralnego w finale" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 2],
        [2, 0],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Makbet realizuje machiavelizm, boryka się z determinizmem, popada w nihilizm, a finał przywraca teodiceę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jak interpretować prośbę Lady Makbet o 'unsex me here'?",
      content: {
        options: [
          "Chce stać się mężczyzną",
          "Performatywne odrzucenie gender jako konstruktu społecznego ograniczającego działanie",
          "To tylko metafora",
          "Chce umrzeć",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Lady Makbet rozumie płeć jako ograniczenie społeczne, które można performatywnie odrzucić dla osiągnięcia celów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Z perspektywy psychoanalitycznej, czym są wiedźmy?",
      content: {
        options: [
          "Realnymi postaciami",
          "Projekcją Super-ego Makbeta",
          "Symbolem ojca",
          "Manifestacją Id - nieświadomych pragnień Makbeta",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Wiedźmy można interpretować jako projekcję Id - wypowiadają stłumione, nieświadome pragnienia Makbeta.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak Makbet odnosi się do jakubińskiej teorii Boskiego Prawa Królów?",
      content: {
        options: [
          "Popiera ją całkowicie",
          "Ignoruje kwestie polityczne",
          "Podważa ją, pokazując uzurpatora na tronie",
          "Ostatecznie potwierdza świętość prawowitej sukcesji",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Dramat ostatecznie potwierdza Boskie Prawo - uzurpator upada, prawowity dziedzic (Malcolm) wraca.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak metafora 'życia jako kiepskiego aktora' komentuje naturę teatru?",
      content: {
        options: [
          "Shakespeare krytykuje aktorów",
          "To autorefleksja o iluzorycznej naturze teatru i rzeczywistości",
          "Nie ma związku z teatrem",
          "To komplement dla aktorów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To metateatralny komentarz - teatr jako metafora życia podważa granicę między iluzją sceniczną a 'rzeczywistością'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jaka jest funkcja obrazowania choroby w dramacie?",
      content: {
        options: [
          "Szkocja pod rządami Makbeta jest 'chora' - tyrania jako rak społeczny",
          "Opisuje prawdziwą epidemię",
          "Nie ma takiego obrazowania",
          "Odnosi się tylko do Lady Makbet",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Choroba to rozbudowana metafora - tyrania Makbeta infekuje całą Szkocję jak zaraza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Która przepowiednia NIE pojawia się w dramacie?",
      content: {
        options: [
          "Makbet będzie królem",
          "Synowie Banka będą królami",
          "Makbet umrze młodo",
          "Las Birnam przyjdzie do Dunsinane",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Nie ma przepowiedni o wieku śmierci Makbeta - tylko o warunkach, w których może zginąć.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "W którym momencie następuje anagnorisis (rozpoznanie) Makbeta?",
      content: {
        options: [
          "Gdy zabija Duncana",
          "Gdy spotyka wiedźmy",
          "Gdy dowiaduje się, że Makduf 'nie został zrodzony z kobiety'",
          "Gdy widzi ducha Banka",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Anagnorisis następuje, gdy Makbet rozumie prawdziwą naturę przepowiedni - został oszukany.",
      },
    },
    {
      type: "ESSAY",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Porównaj sposób przedstawienia zła w 'Makbecie' z inną tragedią Shakespeare'a.",
      content: {
        instruction:
          "Przeanalizuj różnice w koncepcji zła między Makbetem a wybraną tragedią (Hamlet, Otello, Król Lear). Uwzględnij: źródło zła, rozwój, konsekwencje. (150-200 słów)",
      },
      rubric: {
        maxScore: 5,
        criteria: [
          "Identyfikacja źródła zła w obu dramatach (1 pkt)",
          "Analiza rozwoju zła (1 pkt)",
          "Porównanie konsekwencji (1 pkt)",
          "Różnice w odpowiedzialności bohaterów (1 pkt)",
          "Synteza i wnioski (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "W Makbecie zło rodzi się wewnątrz - z ambicji bohatera, choć katalizowane przez wiedźmy. W Otellu zło jest zewnętrzne - Jago manipuluje. Makbet świadomie wybiera zbrodnię, Otello jest oszukany. Rozwój: Makbet stopniowo się dehumanizuje, Otello zachowuje szlachetność do końca. Konsekwencje: Makbet niszczy całą Szkocję, Otello - tylko siebie i Desdemonę.",
        keyWords: [
          "źródło zła",
          "świadomość",
          "wybór",
          "manipulacja",
          "konsekwencje",
          "odpowiedzialność",
        ],
      },
    },
    {
      type: "ESSAY",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Czy Makbet jest ofiarą przeznaczenia czy własnych wyborów? Uzasadnij stanowisko.",
      content: {
        instruction:
          "Przeanalizuj problem determinizmu vs wolnej woli w tragedii. Odwołaj się do przepowiedni, decyzji bohatera i konstrukcji fabuły. (150-200 słów)",
      },
      rubric: {
        maxScore: 5,
        criteria: [
          "Zdefiniowanie problemu (1 pkt)",
          "Argumenty za determinizmem (1 pkt)",
          "Argumenty za wolną wolą (1 pkt)",
          "Analiza ambiwalencji Shakespeare'a (1 pkt)",
          "Własne stanowisko z uzasadnieniem (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Shakespeare celowo pozostawia kwestię nierozstrzygniętą. Za determinizmem: przepowiednie się spełniają dokładnie, Makbet wydaje się prowadzony. Za wolną wolą: przepowiednie nie mówią o morderstwie, Makbet sam decyduje o środkach. To self-fulfilling prophecy - przepowiednie spełniają się właśnie przez wybory Makbeta. Shakespeare sugeruje, że los i wybór są nierozdzielnie splecione.",
        keyWords: [
          "determinizm",
          "wolna wola",
          "przepowiednie",
          "wybór",
          "self-fulfilling prophecy",
          "ambiwalencja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Wyjaśnij symbolikę dziecka w przepowiedniach i obrazach dramatu.",
      content: {
        instruction:
          "Przeanalizuj różne znaczenia motywu dziecka w Makbecie (60-80 słów).",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "Dziecko jako symbol niewinności (1 pkt)",
          "Brak dzieci Makbeta - jałowość zła (1 pkt)",
          "Morderstwo dzieci jako przekroczenie ostatniej granicy (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Dziecko symbolizuje niewinność, przyszłość i ciągłość. Makbetowie są bezdzietni - ich władza jest 'jałowa', bez przyszłości. Zjawa dziecka w koronie to potomkowie Banka. Morderstwo dzieci Makdufa to ostateczne przekroczenie - atak na niewinność. 'Nie zrodzony z kobiety' podważa naturalne narodziny.",
        keyWords: [
          "niewinność",
          "bezdzietność",
          "jałowość",
          "przyszłość",
          "morderstwo dzieci",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jak Shakespeare problematyzuje męskość w tragedii?",
      content: {
        instruction:
          "Omów kryzys męskości u Makbeta i innych postaci (80-100 słów).",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "Męskość jako przemoc (1 pkt)",
          "Manipulacja przez kwestionowanie męskości (1 pkt)",
          "Paradoks - 'prawdziwa' męskość (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Makbet utożsamia męskość z przemocą i bezwzględnością. Lady Makbet manipuluje nim, kwestionując jego męskość. Paradoksalnie, im bardziej stara się udowodnić męskość przez przemoc, tym bardziej ją traci - staje się tchórzem. Prawdziwa męskość to panowanie nad namiętnościami (Banko, Makduf płaczący po rodzinie). Shakespeare krytykuje toksyczną męskość.",
        keyWords: [
          "przemoc",
          "manipulacja",
          "paradoks",
          "toksyczna męskość",
          "prawdziwa męskość",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Przeanalizuj metateatralne elementy w monologu 'życie to opowieść idioty'.",
      content: {
        instruction:
          "Wyjaśnij autorefleksyjność teatralną w nihilistycznym monologu (60-80 słów).",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "Życie jako spektakl teatralny (1 pkt)",
          "Podważenie granicy iluzja/rzeczywistość (1 pkt)",
          "Komentarz do natury teatru (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Makbet porównuje życie do kiepskiego aktora i bezsensownej opowieści - to metateatralny komentarz. Aktor grający Makbeta mówi o aktorstwie, podważając granicę między fikcją a rzeczywistością. Jeśli życie to teatr, to teatr jest życiem. Shakespeare sugeruje, że zarówno życie jak i teatr są iluzją.",
        keyWords: [
          "metateatr",
          "aktor",
          "iluzja",
          "rzeczywistość",
          "autorefleksja",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jak dramat komentuje jakubińską koncepcję monarchii?",
      content: {
        instruction:
          "Omów polityczny wymiar tragedii w kontekście epoki Jakuba I (60-80 słów).",
      },
      rubric: {
        maxScore: 3,
        criteria: [
          "Królobójstwo jako największa zbrodnia (1 pkt)",
          "Pochwała linii Banka (przodek Jakuba) (1 pkt)",
          "Przywrócenie prawowitego porządku (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Dramat potwierdza Boskie Prawo Królów - królobójstwo to zbrodnia przeciw Bogu i naturze. Szkocja cierpi pod uzurpatorem. Gloryfikacja Banka (mitycznego przodka Jakuba I) to pochlebstwo. Finał przywraca prawowitą sukcesję. Shakespeare ostrzega przed buntem, jednocześnie pokazując tyranię.",
        keyWords: [
          "Boskie Prawo",
          "królobójstwo",
          "Banko",
          "Jakub I",
          "prawowita sukcesja",
        ],
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Gdzie występuje dramatyczna ironia w scenie mordowania Duncana?",
      content: {
        options: [
          "Duncan chwali gościnność Makbetów tuż przed śmiercią",
          "Makbet jest zaskoczony",
          "Lady Makbet śpi",
          "Straże są pijane",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Duncan chwali zamek i gospodarzy jako przytulnych - dramatyczna ironia, bo widzowie wiedzą o planowanym morderstwie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Dlaczego wiedźmy mówią tetrametrem trocheicznym zamiast jambem?",
      content: {
        options: [
          "To błąd Shakespeare'a",
          "Rytm zaklęć odróżnia je od świata ludzkiego, tworzy hipnotyczny efekt",
          "Nie ma różnicy w metryce",
          "To wymóg teatralny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Trocheiczny tetrametr (akcent na pierwszej sylabie) brzmi jak zaklęcie, odróżnia nadprzyrodzone od ludzkiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak interpretować fakt, że Banko też widzi wiedźmy, ale tylko Makbet widzi sztyet i ducha?",
      content: {
        options: [
          "Przypadek dramaturgiczny",
          "Wiedźmy są zewnętrzne/obiektywne, halucynacje są wewnętrzne/subiektywne",
          "Banko kłamie",
          "Wszystko jest halucynacją",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Shakespeare rozróżnia: wiedźmy jako katalizator zewnętrzny vs halucynacje jako projekcje winy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Która postać została dodana przez Shakespeare'a, nie występuje w kronikach?",
      content: {
        options: [
          "Banko",
          "Duncan",
          "Lady Makbet jako współsprawczyni",
          "Malcolm",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W kronikach żona Makbeta nie odgrywa aktywnej roli - Shakespeare uczynił ją współsprawczynią.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Co zapowiada uwaga kapitana o Makdonwaldzie 'od pępka do szczęki'?",
      content: {
        options: [
          "Nic szczególnego",
          "Sposób śmierci Duncana",
          "Los samego Makbeta - ścięcie głowy",
          "Śmierć Lady Makbet",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Makbet zabija zdrajcę Makdonwalda przez ścięcie - sam zginie identycznie jako zdrajca.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak zaburzenia w naturze po morderstwie odzwierciedlają elżbietański worldview?",
      content: {
        options: [
          "To tylko efekty specjalne",
          "Makrokosmos reaguje na naruszenie Great Chain of Being",
          "To realistyczny opis pogody",
          "Nie ma zaburzeń w naturze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W elżbietańskiej kosmologii naruszenie hierarchii (królobójstwo) zaburza cały porządek natury.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dlaczego Makbet zabija strażników Duncana?",
      content: {
        options: [
          "Z zemsty",
          "Panicznie improwizuje, by ukryć winę i pokazać 'gniew'",
          "To był plan Lady Makbet",
          "Przypadkiem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To improwizacja - zabija potencjalnych świadków, udając sprawiedliwy gniew. Lady Makbet jest zaskoczona.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak interpretować podwójne znaczenie 'nie zrodzony z kobiety'?",
      content: {
        options: [
          "To tylko zagadka",
          "Gra słów: 'zrodzony' (naturalnie) vs 'wydarty' (cesarskie cięcie)",
          "Makduf jest bogiem",
          "To błąd w tłumaczeniu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dwuznaczność językowa: cesarskie cięcie to nie 'zrodzenie' w naturalnym sensie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co krytykuje Malcolma test lojalności Makdufa (Akt IV)?",
      content: {
        options: [
          "Pokazuje mądrość przyszłego króla",
          "Ujawnia, że nawet 'dobrzy' używają manipulacji i kłamstwa",
          "To niepotrzebna scena",
          "Nic nie krytykuje",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Malcolm kłamie o swojej deprawacji - Shakespeare pokazuje, że polityka zawsze wymaga moralnych kompromisów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jak zmienia się percepcja czasu u Makbeta?",
      content: {
        options: [
          "Nie zmienia się",
          "Od obsesji przyszłością do uwięzienia w teraźniejszości pełnej przeszłości",
          "Zapomina o czasie",
          "Czas przyspiesza",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Początkowo obsesja przyszłością (przepowiednie), potem uwięzienie między winą przeszłości a lękiem o przyszłość.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co oznacza odniesienie do 'Golgoty' w opisie bitwy?",
      content: {
        options: [
          "Zwykłe pole bitwy",
          "Porównanie do męki Chrystusa - zapowiedź ofiary i odkupienia",
          "Nazwę miejscowości",
          "Nic szczególnego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Golgota to miejsce ukrzyżowania - zapowiada motyw ofiary, ale ironicznie Makbet stanie się Judaszem, nie Chrystusem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dlaczego motyw snu jest kluczowy dla zrozumienia tragedii?",
      content: {
        options: [
          "Sen to metafora śmierci, niewinności i naturalnego porządku - Makbet niszczy wszystkie trzy",
          "To tylko dekoracja",
          "Sen nie jest ważny",
          "Wszyscy są zmęczeni",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Sen łączy śmierć ('wieczny sen'), niewinność (spokój sumienia) i naturę (rytm dnia/nocy) - Makbet 'morduje sen'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kto jest autorem tragedii 'Makbet'?",
      content: {
        options: [
          "Christopher Marlowe",
          "William Shakespeare",
          "Ben Jonson",
          "Thomas Kyd",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Autorem 'Makbeta' jest William Shakespeare. Tragedia powstała około 1606 roku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Gdzie toczy się akcja tragedii?",
      content: {
        options: ["w Anglii", "w Irlandii", "w Szkocji", "w Walii"],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Akcja 'Makbeta' toczy się w Szkocji w XI wieku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kim jest Duncan w tragedii?",
      content: {
        options: [
          "bratem Makbeta",
          "synem Makbeta",
          "królem Szkocji",
          "wrogiem Szkocji",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Duncan jest prawowitym królem Szkocji, którego zabija Makbet.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Ile wiedźm spotyka Makbet na pustkowiu?",
      content: {
        options: ["jedną", "dwie", "trzy", "cztery"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Makbet spotyka trzy wiedźmy, zwane także 'dziwacznymi siostrami'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co przepowiadają wiedźmy Makbetowi przy pierwszym spotkaniu?",
      content: {
        options: [
          "że zginie w bitwie",
          "że straci wszystko",
          "że zostanie królem",
          "że będzie miał syna",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wiedźmy przepowiadają, że Makbet zostanie tanem Cawdor, a następnie królem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kim jest Banko?",
      content: {
        options: [
          "wrogiem Makbeta",
          "przyjacielem Makbeta",
          "królem Anglii",
          "synem Duncana",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Banko jest przyjacielem i towarzyszem broni Makbeta.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kto namawia Makbeta do zabójstwa Duncana?",
      content: {
        options: ["Banko", "wiedźmy", "Lady Makbet", "Malcolm"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Lady Makbet przekonuje wahającego się męża do popełnienia królobójstwa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co widzi Makbet tuż przed zabójstwem Duncana?",
      content: {
        options: [
          "ducha ojca",
          "halucynacyjny sztylet",
          "trzech rycerzy",
          "płonący krzew",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Makbet ma halucynację sztyletu prowadzącego go do komnaty Duncana.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jak nazywają się synowie Duncana?",
      content: {
        options: [
          "Malcolm i Donalbain",
          "Fleance i Siward",
          "Ross i Lennox",
          "Angus i Menteith",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Synowie Duncana to Malcolm i Donalbain, którzy uciekają po śmierci ojca.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dlaczego Makbet decyduje się zabić Banka?",
      content: {
        options: [
          "Banko go zdradził",
          "Banko odkrył prawdę o morderstwie",
          "wiedźmy przepowiedziały, że synowie Banka będą królami",
          "Banko zaatakował Makbeta",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Makbet obawia się przepowiedni, że potomkowie Banka będą królami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kto pojawia się jako duch podczas uczty?",
      content: {
        options: ["Duncan", "Banko", "Lady Makbet", "Makduf"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Duch Banka pojawia się podczas uczty, ale widzi go tylko Makbet.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co się dzieje z rodziną Makdufa?",
      content: {
        options: [
          "uciekają do Anglii",
          "zostają zamordowani",
          "ukrywają się w lesie",
          "przechodzą na stronę Makbeta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Makbet rozkazuje zamordować żonę i dzieci Makdufa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co oznacza przepowiednia o lesie Birnam?",
      content: {
        options: [
          "las zostanie wycięty",
          "las spłonie",
          "Makbet będzie bezpieczny, dopóki las nie przyjdzie do Dunsinane",
          "w lesie ukrywa się wróg",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Wiedźmy mówią, że Makbet będzie bezpieczny, dopóki las Birnam nie przyjdzie do Dunsinane.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "W jaki sposób Lady Makbet umiera?",
      content: {
        options: [
          "zostaje zabita",
          "umiera z choroby",
          "popełnia samobójstwo",
          "ginie w bitwie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Lady Makbet popełnia samobójstwo, nie mogąc znieść wyrzutów sumienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dlaczego Makduf może zabić Makbeta?",
      content: {
        options: [
          "ma magiczny miecz",
          "jest silniejszy",
          "nie został urodzony z kobiety w naturalny sposób",
          "wiedźmy mu pomagają",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Makduf został wydarty z łona matki przez cesarskie cięcie, więc nie został 'zrodzony' z kobiety.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kto zostaje królem Szkocji po śmierci Makbeta?",
      content: {
        options: ["Donalbain", "Makduf", "Malcolm", "Fleance"],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Malcolm, syn Duncana, zostaje prawowitym królem Szkocji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co symbolizuje krew w dramacie?",
      content: {
        options: [
          "tylko przemoc",
          "winę i wyrzuty sumienia",
          "odwagę",
          "szlachectwo",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Krew symbolizuje przede wszystkim winę i niezmywalne piętno zbrodni.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kto mówi: 'Makbet sen zabił'?",
      content: {
        options: ["Lady Makbet", "Makbet", "Duncan", "wiedźmy"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Makbet wypowiada te słowa po zabójstwie Duncana, czując, że utracił spokój sumienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Co Lady Makbet próbuje zmyć ze swoich rąk podczas sceny lunatyzmu?",
      content: {
        options: ["truciznę", "niewidzialną krew", "perfumy", "błoto"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W scenie lunatyzmu Lady Makbet obsesyjnie myje ręce, próbując zmyć wyimaginowaną krew.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jaki jest główny temat tragedii „Makbet”?",
      content: {
        options: [
          "miłość romantyczna",
          "destrukcyjna siła ambicji",
          "wojna między krajami",
          "konflikt religijny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Głównym tematem jest niszczycielska siła niepohamowanej ambicji.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Które postacie giną w tragedii? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "Duncan",
          "Banko",
          "Lady Makbet",
          "Malcolm",
          "Makbet",
          "Ross",
        ],
      },
      correctAnswer: [0, 1, 2, 4],
      metadata: {
        explanation:
          "W tragedii giną: Duncan, Banko, Lady Makbet i Makbet. Malcolm i Ross przeżywają.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Które elementy nadprzyrodzone pojawiają się w „Makbecie”? (wybierz wszystkie)",
      content: {
        options: [
          "wiedźmy",
          "halucynacje",
          "duchy",
          "przepowiednie",
          "anioły",
          "demony",
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          "W dramacie występują: wiedźmy, halucynacje (sztylet), duchy (Banko) i przepowiednie.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dopasuj bohaterów „Makbeta” do ich losów",
      content: {
        matchingType: "character_fate",
        leftColumn: [
          { id: "A", text: "Duncan" },
          { id: "B", text: "Banko" },
          { id: "C", text: "Lady Makbet" },
          { id: "D", text: "Makbet" },
        ],
        rightColumn: [
          { id: 1, text: "zabity przez wynajętych morderców" },
          { id: 2, text: "zabity przez Makdufa" },
          { id: 3, text: "zabity we śnie" },
          { id: 4, text: "popełnia samobójstwo" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Duncan zabity we śnie, Banko przez morderców, Lady Makbet popełnia samobójstwo, Makbet ginie z ręki Makdufa.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Które tematy występują w „Makbecie”? (wybierz wszystkie poprawne)",
      content: {
        options: [
          "ambicja i władza",
          "wyrzuty sumienia",
          "męskość i honor",
          "przeznaczenie",
          "komedia i humor",
          "nadprzyrodzone",
        ],
      },
      correctAnswer: [0, 1, 2, 3, 5],
      metadata: {
        explanation:
          "Główne tematy to: ambicja, wyrzuty sumienia, męskość, przeznaczenie i elementy nadprzyrodzone.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dopasuj cytaty do postaci",
      content: {
        matchingType: "quote_character",
        leftColumn: [
          { id: "A", text: "Brzydkie jest piękne, piękne brzydkie" },
          { id: "B", text: "Czy cały ocean wielkiego Neptuna zmyje tę krew?" },
          { id: "C", text: "Precz, przeklęta plamo!" },
          { id: "D", text: "Życie jest tylko cieniem" },
        ],
        rightColumn: [
          { id: 1, text: "Lady Makbet" },
          { id: 2, text: "Makbet" },
          { id: 3, text: "wiedźmy" },
          { id: 4, text: "Banko" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 1],
        [2, 0],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Wiedźmy mówią o względności, Makbet o krwi i cieniu życia, Lady Makbet o plamie.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Uzupełnij lukę w fabule",
      content: {
        textWithGaps:
          "Po spotkaniu z [1], Makbet dowiaduje się, że zostanie [2]. Namówiony przez [3], zabija [4] i obejmuje tron.",
        gaps: [
          {
            id: 1,
            options: ["duchami", "wiedźmami", "rycerzami", "wróżbitami"],
          },
          {
            id: 2,
            options: ["wygnany", "zabity", "królem", "tanem Ross"],
          },
          {
            id: 3,
            options: ["Banka", "Duncana", "Lady Makbet", "Makdufa"],
          },
          {
            id: 4,
            options: ["Banka", "Duncana", "Malcolma", "Makdufa"],
          },
        ],
      },
      correctAnswer: [1, 2, 2, 1],
      metadata: {
        explanation:
          "Po spotkaniu z wiedźmami Makbet dowiaduje się o królestwie, Lady Makbet namawia go do zabicia Duncana.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Które symbole pojawiają się w dramacie? (wybierz wszystkie)",
      content: {
        options: ["krew", "korona", "sztylet", "sen", "róża", "burza"],
      },
      correctAnswer: [0, 1, 2, 3, 5],
      metadata: {
        explanation:
          "Główne symbole to: krew (wina), korona (władza), sztylet (morderstwo), sen (spokój) i burza (chaos).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dopasuj role do postaci",
      content: {
        matchingType: "character_role",
        leftColumn: [
          { id: "A", text: "Malcolm" },
          { id: "B", text: "Makduf" },
          { id: "C", text: "Fleance" },
          { id: "D", text: "Siward" },
        ],
        rightColumn: [
          { id: 1, text: "syn Banka" },
          { id: 2, text: "dowódca wojsk angielskich" },
          { id: 3, text: "syn Duncana" },
          { id: 4, text: "tan Fife" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      metadata: {
        explanation:
          "Malcolm - syn Duncana, Makduf - tan Fife, Fleance - syn Banka, Siward - dowódca Anglików.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jaki zabieg dramaturgiczny stosuje Shakespeare, pokazując las Birnam „idący” do Dunsinane?",
      content: {
        options: [
          "metaforę",
          "ironię dramatyczną",
          "alegorię",
          "personifikację",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To ironia dramatyczna - żołnierze niosą gałęzie, tworząc iluzję poruszającego się lasu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dla którego króla angielskiego Shakespeare napisał 'Makbeta'?",
      content: {
        options: ["Henryka VIII", "Elżbiety I", "Jakuba I", "Karola I"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Makbet został napisany dla Jakuba I, króla pochodzenia szkockiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Ile aktów ma tragedia 'Makbet'?",
      content: {
        options: ["trzy", "cztery", "pięć", "siedem"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Makbet, jak większość tragedii Shakespeare'a, ma pięć aktów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kim jest Hekate w dramacie „Makbet”?",
      content: {
        options: ["żoną Makbeta", "królową wiedźm", "córką Duncana", "służącą"],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Hekate jest boginią czarów i przywódczynią wiedźm.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co oznacza „jutro, i jutro, i jutro” w monologu Makbeta?",
      content: {
        options: [
          "nadzieję na lepszą przyszłość",
          "bezsens i pustkę życia",
          "plany na przyszłość",
          "obietnicę zemsty",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Monolog wyraża nihilizm Makbeta - życie jest puste i pozbawione sensu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Czego Lady Makbet prosi duchy w swojej inwokacji?",
      content: {
        options: [
          "o śmierć",
          "o bogactwo",
          "o „odniewieścenie” - pozbawienie kobiecych uczuć",
          "o piękno",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Lady Makbet prosi duchy o pozbawienie jej kobiecych uczuć litości i współczucia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dokąd uciekają synowie Duncana po śmierci ojca?",
      content: {
        options: [
          "Malcolm do Francji, Donalbain do Hiszpanii",
          "obaj do Irlandii",
          "Malcolm do Anglii, Donalbain do Irlandii",
          "obaj do Norwegii",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation: "Malcolm ucieka do Anglii, a Donalbain do Irlandii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Jaki tytuł otrzymuje Makbet po pierwszej bitwie?",
      content: {
        options: ["tan Ross", "tan Cawdor", "książę Szkocji", "lord Glamis"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Makbet otrzymuje tytuł tana Cawdor po zwycięskiej bitwie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Co symbolizuje bezsenność Makbeta?",
      content: {
        options: [
          "chorobę fizyczną",
          "utratę spokoju sumienia",
          "lenistwo",
          "słabość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Bezsenność symbolizuje utratę spokoju sumienia po zbrodni.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kto odkrywa ciało zabitego Duncana?",
      content: {
        options: ["Lady Makbet", "Banko", "Makduf", "Malcolm"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Makduf odkrywa ciało króla Duncana rankiem po morderstwie.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Wyjaśnij, jaką rolę odgrywają wiedźmy w tragedii.",
      content: {
        instruction:
          "Opisz funkcję wiedźm w rozwoju akcji i ich wpływ na Makbeta (40-60 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "wskazanie roli katalizatora akcji (1 pkt)",
          "dwuznaczność przepowiedni i manipulacja (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Wiedźmy pełnią rolę katalizatora - ich przepowiednie rozbudzają ambicję Makbeta. Nie zmuszają go do zbrodni, ale manipulują dwuznacznymi przepowiedniami. Reprezentują siły chaosu i zła, ale też mogą być projekcją pragnień bohatera.",
        keyWords: [
          "katalizator",
          "przepowiednie",
          "ambicja",
          "manipulacja",
          "dwuznaczność",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Opisz przemianę Lady Makbet w trakcie dramatu.",
      content: {
        instruction:
          "Wyjaśnij, jak zmienia się Lady Makbet od początku do końca sztuki (40-60 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "początkowa siła i determinacja (1 pkt)",
          "załamanie psychiczne i samobójstwo (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Lady Makbet początkowo jest silna, bezwzględna i dominuje nad mężem. Planuje morderstwo i dodaje mu odwagi. Później popada w obłęd, cierpi na lunatyzm, obsesyjnie myje ręce z niewidzialnej krwi. Kończy życie samobójstwem, zniszczona wyrzutami sumienia.",
        keyWords: [
          "siła",
          "determinacja",
          "obłęd",
          "lunatyzm",
          "wyrzuty sumienia",
          "samobójstwo",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Wyjaśnij symbolikę krwi w 'Makbecie'.",
      content: {
        instruction:
          "Opisz, co symbolizuje krew i jak zmienia się jej znaczenie (30-50 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "krew jako symbol winy (1 pkt)",
          "niemożność zmycia/odkupienia (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Krew symbolizuje winę i niezmywalne piętno zbrodni. Początkowo to znak odwagi wojennej, potem staje się obsesją - Makbet widzi krwawe sztylety, Lady Makbet nie może zmyć plam. Reprezentuje wyrzuty sumienia, których nie da się usunąć.",
        keyWords: [
          "wina",
          "piętno",
          "obsesja",
          "wyrzuty sumienia",
          "niezmywalność",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Dlaczego Makbet zabija Banka?",
      content: {
        instruction:
          "Wyjaśnij motywacje Makbeta do zabójstwa przyjaciela (30-50 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "przepowiednia o potomkach Banka (1 pkt)",
          "strach i paranoja Makbeta (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Makbet zabija Banka z dwóch powodów: wiedźmy przepowiedziały, że synowie Banka będą królami, co zagraża jego dynastii. Dodatkowo Banko był świadkiem przepowiedni i mógł domyślić się prawdy o morderstwie Duncana.",
        keyWords: [
          "przepowiednia",
          "potomkowie",
          "królowie",
          "zagrożenie",
          "świadek",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Opisz scenę z duchem Banka podczas uczty.",
      content: {
        instruction:
          "Wyjaśnij znaczenie pojawienia się ducha i reakcję Makbeta (40-60 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "duch jako projekcja winy (1 pkt)",
          "publiczne ujawnienie szaleństwa (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Duch Banka pojawia się podczas uczty, zajmując miejsce Makbeta. Tylko Makbet go widzi, co sugeruje halucynację wywołaną poczuciem winy. Jego paniczna reakcja kompromituje go przed gośćmi, Lady Makbet desperacko próbuje zatuszować sytuację.",
        keyWords: ["duch", "halucynacja", "wina", "panika", "kompromitacja"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Jak rozumiesz słowa wiedźm 'Brzydkie jest piękne, piękne brzydkie'?",
      content: {
        instruction:
          "Wyjaśnij paradoks i jego znaczenie dla całego dramatu (30-50 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "względność dobra i zła (1 pkt)",
          "przewrotność świata w dramacie (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Paradoks wyraża względność wartości i odwrócenie porządku moralnego. W świecie Makbeta zło wydaje się dobre (władza przez zbrodnię), a dobro złe. Zapowiada moralny chaos, gdzie nie można odróżnić prawdy od fałszu.",
        keyWords: [
          "paradoks",
          "względność",
          "odwrócenie",
          "chaos moralny",
          "pozory",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Zinterpretuj metaforę życia jako 'cienia' z monologu Makbeta.",
      content: {
        instruction:
          "Wyjaśnij nihilistyczną wizję życia w słynnym monologu (40-60 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "życie jako iluzja/pustka (1 pkt)",
          "bezsens istnienia (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Życie jako 'cień' to metafora pustki i iluzoryczności istnienia. Makbet widzi życie jako pozbawione substancji, jak teatralną rolę bez znaczenia. To wyraz nihilizmu - po utracie wszystkiego odkrywa, że życie jest 'opowieścią idioty', bez sensu.",
        keyWords: ["cień", "iluzja", "pustka", "nihilizm", "bezsens", "teatr"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Wyjaśnij ironię w spełnieniu przepowiedni o lesie Birnam.",
      content: {
        instruction:
          "Opisz, jak spełnia się przepowiednia i dlaczego to ironia dramatyczna (30-50 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "żołnierze z gałęziami jako 'las' (1 pkt)",
          "dosłowna interpretacja Makbeta (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Makbet interpretuje przepowiednię dosłownie - las nie może chodzić. Ironia polega na tym, że żołnierze niosą gałęzie jako kamuflaż, tworząc iluzję poruszającego się lasu. Przepowiednia spełnia się w nieoczekiwany sposób.",
        keyWords: ["ironia", "dosłowność", "gałęzie", "kamuflaż", "iluzja"],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question: "Kim jest Makduf i dlaczego jest ważny dla fabuły?",
      content: {
        instruction:
          "Opisz postać Makdufa i jego rolę w upadku Makbeta (40-60 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "tan Fife, odkrywa morderstwo (1 pkt)",
          "zabija Makbeta - cesarskie cięcie (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Makduf to tan Fife, który odkrywa zamordowanego Duncana. Gdy Makbet zabija jego rodzinę, Makduf przyłącza się do Malcolma. Jest narzędziem zemsty - może zabić Makbeta, bo urodził się przez cesarskie cięcie, nie był 'zrodzony' z kobiety.",
        keyWords: [
          "tan Fife",
          "odkrycie",
          "rodzina",
          "zemsta",
          "cesarskie cięcie",
        ],
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Makbet",
      question:
        "Wyjaśnij pojęcie 'tragicznej wady' (hamartia) na przykładzie Makbeta.",
      content: {
        instruction:
          "Zdefiniuj hamartię i wskaż, jaka jest tragiczna wada Makbeta (40-60 słów).",
      },
      rubric: {
        maxScore: 2,
        criteria: [
          "definicja hamartii (1 pkt)",
          "ambicja jako wada Makbeta (1 pkt)",
        ],
      },
      metadata: {
        expectedAnswer:
          "Hamartia to tragiczna wada bohatera prowadząca do jego upadku. U Makbeta jest to niepohamowana ambicja - pragnienie władzy silniejsze niż sumienie. Ta wada sprawia, że bohater sam przyczynia się do własnej katastrofy.",
        keyWords: ["hamartia", "tragiczna wada", "ambicja", "upadek", "władza"],
      },
    },

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
      question: "W jakiej porze roku rozpoczyna się akcja „Pana Tadeusza”?",
      content: {
        options: ["Wiosną", "Jesienią", "Zimą", "Latem"],
      },
      correctAnswer: 4,
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
        "Które zwierzęta odgrywają ważną rolę w fabule „Pana Tadeusza”? (wybierz wszystkie poprawne)",
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
        "Dopasuj postać z „Pana Tadeusza” do jej charakterystycznego przedmiotu lub atrybutu.",
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
      question:
        "Dopasuj zdarzenie do księgi „Pana Tadeusza”, w której miało miejsce.",
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
      question: "Kto wypowiada słowa: „Kochajmy się!” w „Panu Tadeuszu”?",
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
          "„Kochajmy się” to tytuł XII (ostatniej) księgi „Pana Tadeusza”, będący zarazem przesłaniem całego utworu.",
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
        "Wymień trzy główne rody szlacheckie występujące w „Panu Tadeuszu”.",
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
        "Krótko wyjaśnij, dlaczego „Pan Tadeusz” nazywany jest „epopeją narodową”.",
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
      question: "Podaj tytuły trzech dowolnych ksiąg „Pana Tadeusza”.",
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
      question:
        "Wyjaśnij symbolikę tytułu ostatniej księgi „Pana Tadeusza” - „Kochajmy się”.",
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
        "Które elementy kultury sarmackiej przedstawione są w „Panu Tadeuszu”? (wybierz wszystkie)",
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
      question: "Jakie cechy epopei zachowuje „Pan Tadeusz”? Wymień 3-4.",
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
