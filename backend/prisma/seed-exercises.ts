// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  // Usuń w odpowiedniej kolejności (od najbardziej zależnych)
  console.log("🗑️  Usuwanie powiązanych danych...");

  // 1. Assessment (zależy od Submission)
  await prisma.assessment.deleteMany({});
  console.log("✅ Usunięto assessments");

  // 2. Submission (zależy od Exercise)
  await prisma.submission.deleteMany({});
  console.log("✅ Usunięto submissions");

  // 3. SpacedRepetition (zależy od Exercise)
  await prisma.spacedRepetition.deleteMany({});
  console.log("✅ Usunięto spacedRepetitions");

  // 4. ExerciseUsage (zależy od Exercise)
  await prisma.exerciseUsage.deleteMany({});
  console.log("✅ Usunięto exerciseUsage");

  // 5. ExamQuestion (ma opcjonalne exerciseId, ale trzeba wyczyścić)
  await prisma.examQuestion.deleteMany({});
  console.log("✅ Usunięto examQuestions");

  // 6. Teraz możemy bezpiecznie usunąć Exercise
  await prisma.exercise.deleteMany({});
  console.log("✅ Usunięto exercises");

  const exercises = [
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
        explanation: "Poprawnie: Rzeczpospolita (wielka litera)",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      question: "Która postać z 'Lalki' reprezentuje arystokrację?",
      content: {
        options: [
          "Stanisław Wokulski",
          "Ignacy Rzecki",
          "Izabela Łęcka",
          "Julian Ochocki",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question:
        "Jaki typ błędu występuje w zdaniu: 'Przyszedłem po to, żeby się z tobą spotkać'?",
      content: {
        options: [
          "błąd ortograficzny",
          "pleonazm (nadmiarowość)",
          "brak błędu",
          "błąd interpunkcyjny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "'Po to żeby' to pleonazm - wystarczy 'żeby' lub 'po to, by'",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      question: "Co to jest antonim?",
      content: {
        options: [
          "słowo obce",
          "słowo podobne brzmieniem",
          "słowo o przeciwnym znaczeniu",
          "słowo wieloznaczne",
        ],
      },
      correctAnswer: 2,
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      question: "Który utwór NIE jest dramatem?",
      content: {
        options: ["Dziady", "Pan Tadeusz", "Kordian", "Nie-Boska komedia"],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Pan Tadeusz to epopeja, nie dramat",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      question: "Który środek stylistyczny dominuje?",
      content: {
        text: "Życie to podróż bez mapy, gdzie każdy krok to zagadka.",
        options: [
          "personifikacja",
          "metafora rozbudowana",
          "porównanie",
          "epitet",
        ],
      },
      correctAnswer: 1,
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
      question: "Ile samogłosek nosowych ma polski?",
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
      question: "Który symbol pojawia się w 'Weselu' Wyspiańskiego?",
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
      question: "Co oznacza 'mieć węża w kieszeni'?",
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
      question: "Określ funkcję składniową: 'Mama dała *córce* prezent.'",
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
      question: "W którym przypadku jest wyraz 'domem'?",
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
      difficulty: 1,
      points: 1,
      question: "Które słowo jest BŁĘDNE?",
      content: {
        options: ["wziąć", "wziąwszy", "wzięty", "wziął"],
      },
      correctAnswer: 1,
      metadata: {
        explanation: "Poprawnie: wziąwszy nie istnieje, powinno być 'wziąwszy'",
      },
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
        explanation: "Np. 'żywy trup', 'głośna cisza'",
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
      question: "Gdzie rozgrywa się akcja 'Dziadów' cz. III?",
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
          "błędny spójnik - powinno być 'niż'",
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
      question: "Określ typ błędu: 'Mama i tata jest w domu.'",
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
        explanation: "Powinno być: 'są w domu'",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Który wyraz jest w bierniku?",
      content: {
        options: ["dom", "domu", "domowi", "dom (czytam książkę)"],
      },
      correctAnswer: 3,
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
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "POSITIVISM",
      question: "Dopasuj postać z 'Lalki' do jej roli społecznej.",
      content: {
        matchingType: "character_role",
        leftColumn: [
          { id: "A", text: "Wokulski" },
          { id: "B", text: "Szlangbaum" },
          { id: "C", text: "Baronowa" },
        ],
        rightColumn: [
          { id: 1, text: "arystokratka" },
          { id: 2, text: "kupiec-idealist" },
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
      question: "Które znaki to znaki INTERPUNKCYJNE?",
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
      difficulty: 1,
      points: 2,
      question: "Które słowa piszemy wielką literą?",
      content: {
        sentence: "Adam mieszka w warszawie i lubi czytać mickiewicza.",
        question: "Co poprawić?",
        options: ["Adam", "warszawie", "czytać", "mickiewicza", "lubi"],
      },
      correctAnswer: [1, 3],
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
      points: 2,
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
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      question: "Które postaci występują w bajkach?",
      content: {
        options: ["wilk", "komputer", "lis", "telewizor", "zając"],
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
      question: "Interpretacja motywu w kontekście filozofii absurdu.",
      content: {
        work: "Tango - Sławomir Mrożek",
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
      question: "Rozpoznaj koncepcję filozoficzną w utworze renesansowym.",
      content: {
        work: "Odprawa posłów greckich - Jan Kochanowski",
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
      question: "Interpretacja satyry w kontekście programu oświecenia.",
      content: {
        work: "Monachomachia - Ignacy Krasicki",
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
        topic: "Kiedy piszemy 'rz' a kiedy 'ż'?",
        requirements: [
          "zasada podstawowa",
          "5 przykładów z 'rz'",
          "5 przykładów z 'ż'",
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
          "Podaj przykłady wyrazów z 'rz' i wyjaśnij kiedy piszemy 'rz' a kiedy 'ż'.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "Przepisz zdanie poprawiając błędy.",
      content: {
        originalSentence:
          "Wczoraj poszłem z mamą do kina i obejżeliśmy ciekawy film o zwieżętach.",
        instruction: "Przepisz zdanie poprawnie i podkreśl poprawione błędy.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "ROMANTICISM",
      question: "Opisz głównego bohatera.",
      content: {
        work: "Pan Tadeusz",
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
          "Co oznaczało hasło 'praca organiczna' w pozytywizmie? Odpowiedz w 3-4 zdaniach.",
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
        instruction: "Wyjaśnij po co służą przecinki w tym zdaniu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 2,
      question: "Ułóż zdania z wyrazami.",
      content: {
        words: ["książka", "czytać", "ciekawy"],
        instruction:
          "Ułóż jedno poprawne zdanie używając wszystkich tych wyrazów.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "ENLIGHTENMENT",
      question: "Wyjaśnij cel utworu.",
      content: {
        work: "Bajki Ignacego Krasickiego",
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
      question: "Interpretacja symbolu w kontekście całości utworu.",
      content: {
        work: "Wesele - Stanisław Wyspiański",
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
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Ile sylab ma wyraz 'mama'?",
      content: {
        expectedAnswer: "2",
        acceptableAnswers: ["2", "dwie", "dwa"],
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
      question: "Dokończ przysłowie: 'Bez pracy nie ma...'",
      content: {
        expectedAnswer: "kołaczy",
        acceptableAnswers: ["kołaczy"],
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
      points: 2,
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
      question: "Kto napisał 'Pan Tadeusz'?",
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
      question: "Przeczytaj fragment i określ jego charakter.",
      content: {
        text: "Jestem młody, zdrów, łatwo wnoszę w górę ciężary, a ręce mam pełne sił.",
        author: "Adam Mickiewicz",
        work: "Dziady cz. III",
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
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      question: "Które zdanie jest pytaniem?",
      content: {
        options: [
          "Pada deszcz.",
          "Czy pada deszcz?",
          "Pada deszcz!",
          "Niech pada deszcz.",
        ],
      },
      correctAnswer: 1,
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
        options: [
          "vanitas - marność",
          "memento mori - pamiętaj o śmierci",
          "praca u podstaw",
          "theatrum mundi - świat teatr",
        ],
      },
      correctAnswer: 2,
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
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 3,
      question: "W których wyrazach występuje 'rz' (nie 'ż')?",
      content: {
        options: ["morze", "może", "przez", "żaba", "rzecz"],
      },
      correctAnswer: [0, 2, 4],
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
      question: "Które frazeologizmy oznaczają 'być bardzo biednym'?",
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
      question: "Interpretacja postmodernistycznej strategii narracyjnej.",
      content: {
        work: "Bieguni - Olga Tokarczuk",
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
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      question: "Która postać z 'Lalki' reprezentuje typ 'organic pracownika'?",
      content: {
        options: ["Wokulski", "Rzecki", "Ochocki", "Szuman"],
      },
      correctAnswer: 3,
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
