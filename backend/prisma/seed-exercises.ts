// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= POCZATEK PYTAN BALLADY I ROMANSE — ZESTAW 1 (50 pytan, diff 1-3) ===================//
    // UWAGA: Polskie cudzyslowy zastapione prostymi "" — bez nich
    // UWAGA: 20 pytan o "Romantycznosci" + 30 o pozostalych balladach
    // Epoka: ROMANTICISM. Utwór: Ballady i romanse (lub konkretna ballada w pytaniu)

    // =================== ROMANTYCZNOSC (20 pytan) ===================

    // ===== DIFF 1 — ROMANTYCZNOSC — CLOSED_SINGLE (4) =====
    // ======================= POCZĄTEK PYTAŃ WESELE ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (12) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Kto jest autorem dramatu \u201eWesele\u201d?",
      content: {
        options: [
          "Stanisław Wyspiański",
          "Kazimierz Przerwa-Tetmajer",
          "Lucjan Rydel",
          "Gabriela Zapolska",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Autorem \u201eWesela\u201d jest Stanisław Wyspiański. Premiera dramatu odbyła się 16 marca 1901 roku w Teatrze Miejskim w Krakowie.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "W jakiej miejscowości rozgrywa się akcja \u201eWesela\u201d?",
      content: {
        options: [
          "Bronowice pod Krakowem",
          "Zakopane",
          "Kraków \u2014 Rynek Główny",
          "Wieliczka",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Akcja \u201eWesela\u201d rozgrywa się w Bronowicach pod Krakowem, w chacie Włodzimierza Tetmajera (Gospodarza). Wesele jest inspirowane ślubem Lucjana Rydla z Jadwigą Mikołajczykówną.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Z ilu aktów składa się dramat \u201eWesele\u201d?",
      content: {
        options: [
          "Z dwóch aktów",
          "Z pięciu aktów",
          "Z czterech aktów",
          "Z trzech aktów",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "\u201eWesele\u201d składa się z trzech aktów. Akt I jest realistyczny, akt II \u2014 realistyczno-fantastyczny (pojawiają się zjawy), akt III \u2014 rozgrywa się o świcie i kończy chocholim tańcem.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Kim z zawodu jest Pan Młody w \u201eWeselu\u201d (jego rzeczywisty pierwowzór)?",
      content: {
        options: [
          "Poetą i dramaturgiem",
          "Malarzem",
          "Dziennikarzem",
          "Lekarzem",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Pierwowzorem Pana Młodego jest Lucjan Rydel \u2014 poeta i dramaturg, przedstawiciel krakowskiej inteligencji, który poślubił chłopkę Jadwigę Mikołajczykówną.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Do jakiej epoki literackiej należy \u201eWesele\u201d Stanisława Wyspiańskiego?",
      content: {
        options: [
          "Pozytywizm",
          "Romantyzm",
          "Młoda Polska",
          "Dwudziestolecie międzywojenne",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "\u201eWesele\u201d to dramat epoki Młodej Polski (modernizmu), napisany w 1901 roku. Łączy realizm z symbolizmem i podejmuje problematykę narodową.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Która postać otwiera dramat \u201eWesele\u201d, pytając: \u201eCóz tam, panie, w polityce?\u201d?",
      content: {
        options: ["Gospodarz", "Pan Młody", "Czepiec", "Poeta"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Słynne pytanie \u201eCóz tam, panie, w polityce?\u201d wypowiada Czepiec w scenie I aktu I, rozpoczynając rozmowę z Dziennikarzem.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Kim jest Gospodarz \u2014 gospodarz weselnej chaty \u2014 w rzeczywistości (jego pierwowzór)?",
      content: {
        options: [
          "Lucjan Rydel",
          "Kazimierz Przerwa-Tetmajer",
          "Włodzimierz Tetmajer",
          "Rudolf Starzewski",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pierwowzorem Gospodarza jest malarz Włodzimierz Tetmajer, brat poety Kazimierza, który ożenił się z chłopką Anną Mikołajczykówną i osiadł w Bronowicach.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Co symbolizuje Chochoł w \u201eWeselu\u201d w sensie dosłownym (przedmiot)?",
      content: {
        options: [
          "Wieniec dożynkowy z kłosów",
          "Kukła ze słomy na polu",
          "Snop zboża postawiony przy drzwiach",
          "Krzak róży owinięty na zimę słomą",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Chochoł to krzak róży owinięty słomą na zimę, stojący w ogrodzie za oknem chaty. W dramacie ożywa o północy i staje się postacią symboliczną.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "W którym roku rozgrywa się akcja \u201eWesela\u201d (rok podany w didaskaliach)?",
      content: {
        options: ["1900", "1890", "1901", "1863"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "W didaskaliach Wyspiański zaznaczył: \u201eRzecz dzieje się w roku tysiąc dziewięćsetnym\u201d, czyli w 1900 roku. Premiera dramatu odbyła się w 1901 roku.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Kto wypowiada słynne słowa: \u201echłop potęgą jest i basta\u201d?",
      content: {
        options: ["Czepiec", "Pan Młody", "Gospodarz", "Poeta"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Słowa \u201echłop potęgą jest i basta\u201d wypowiada Gospodarz w rozmowie z Poetą (akt I, scena XXIV), wyrażając podziw dla godności i siły chłopa polskiego.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Jak kończy się dramat \u201eWesele\u201d?",
      content: {
        options: [
          "Weselnicy ruszają na Kraków do walki",
          "Wernyhora przyjeżdża na siwym koniu po weselników",
          "Gospodarz zadmie w złoty róg i budzi wszystkich",
          "Weselnicy tańczą chocholi taniec w transie",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Dramat kończy się chocholim tańcem \u2014 Chochoł gra na skrzypcach, a weselnicy tańczą w transie, niezdolni do czynu. Symbolizuje to marazm i uśpienie narodu polskiego.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Jakie dwie grupy społeczne spotykają się na tytułowym weselu?",
      content: {
        options: [
          "Inteligencja krakowska i chłopi z Bronowic",
          "Szlachta i mieszczaństwo",
          "Arystokracja i robotnicy",
          "Duchowieństwo i ziemiaństwo",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Na weselu spotykają się krakowska inteligencja (artyści, literaci, dziennikarze) z chłopami z podkrakowskich Bronowic. To zderzenie dwóch światów jest głównym tematem dramatu.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Które z wymienionych postaci należą do realistycznych bohaterów \u201eWesela\u201d (nie są zjawami)?",
      content: {
        options: ["Czepiec", "Stańczyk", "Rachel", "Wernyhora"],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Czepiec i Rachel to postacie realistyczne \u2014 Czepiec jest wiejskim wójtem, Rachel \u2014 córką karczmarza. Stańczyk i Wernyhora to postacie fantastyczne (zjawy).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Które z poniższych postaci to zjawy (postacie fantastyczne) pojawiające się w akcie II?",
      content: {
        options: ["Widmo", "Jasiek", "Rycerz Czarny", "Nos"],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Widmo (duch zmarłego narzeczonego Marysi) i Rycerz Czarny (Zawisza Czarny) to zjawy z aktu II. Jasiek i Nos to postacie realistyczne.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Które przedmioty w \u201eWeselu\u201d mają znaczenie symboliczne?",
      content: {
        options: [
          "Złoty róg",
          "Czapka z pawimi piórami",
          "Kieliszek wódki",
          "Złota podkowa",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Złoty róg (sygnał do walki, nadzieja), czapka z pawimi piórami (przywiązanie do rzeczy materialnych) i złota podkowa (szczęście odłożone na przyszłość) to kluczowe symbole dramatu.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (11) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Komu ukazuje się zjawa Stańczyka w akcie II \u201eWesela\u201d?",
      content: {
        options: ["Poecie", "Panu Młodemu", "Dziennikarzowi", "Gospodarzowi"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Stańczyk \u2014 błazen ostatnich Jagiellonów, symbol mądrej myśli politycznej \u2014 ukazuje się Dziennikarzowi. Zarzuca mu bierność i wręcza kaduceusz polski.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Co Stańczyk wręcza Dziennikarzowi na zakończenie ich rozmowy?",
      content: {
        options: [
          "Złoty róg",
          "Księgę z przepowiedniami",
          "Szablę",
          "Kaduceusz (laskę błazeńską)",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Stańczyk wręcza Dziennikarzowi kaduceusz polski \u2014 laskę posłańców i błaznów \u2014 ze słowami \u201emąć nim wodę, mąć\u201d, ironicznie komentując rolę stronnictwa konserwatywnego.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Komu ukazuje się Rycerz Czarny (Zawisza Czarny)?",
      content: {
        options: ["Gospodarzowi", "Panu Młodemu", "Poecie", "Czepcu"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Rycerz Czarny (Zawisza Czarny) ukazuje się Poecie (Kazimierzowi Przerwie-Tetmajerowi). Przypomina czasy chwały Polski i nawołuje dekadenta do czynu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Co otrzymuje Gospodarz od Wernyhory?",
      content: {
        options: [
          "Złoty róg",
          "Szablę i pistolet",
          "Lirę i siwego konia",
          "Kaduceusz",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Wernyhora wręcza Gospodarzowi złoty róg, którym ten ma zadąć, gdy weselnicy zgromadzą się przed kościołem. Róg ma dać sygnał do narodowego zrywu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Dlaczego Jasiek zgubił złoty róg?",
      content: {
        options: [
          "Ukradziono mu go na drodze",
          "Wrzucił go do studni, bo myślał, że to czary",
          "Oddał go Czepcowi na przechowanie",
          "Schylił się po czapkę z pawimi piórami i róg mu się odwinął",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Jasiek schylił się po czapkę z pawimi piórami, która spadła mu z głowy, i wtedy złoty róg się odwinął ze sznura. Symbolizuje to przywiązanie do dóbr materialnych kosztem wielkich spraw.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Kim jest Widmo, które ukazuje się Marysi w akcie II?",
      content: {
        options: [
          "Duchem jej zmarłego narzeczonego (malarza de Laveaux)",
          "Duchem jej zmarłego ojca",
          "Zjawą Jakuba Szeli",
          "Aniołem stróżem",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Widmo to duch Ludwika de Laveaux \u2014 malarza, który był narzeczonym Marysi i zmarł na gruźlicę podczas pobytu za granicą. Ich spotkanie przywołuje wspomnienia nieszczęśliwej miłości.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Jaki zarzut stawia Hetman Branicki Panu Młodemu?",
      content: {
        options: [
          "Że nie potrafi tańczyć po chłopsku",
          "Że odmawia udziału w powstaniu",
          "Że nie wierzy w Boga",
          "Że zdradził swoją warstwę społeczną, żeniąc się z chłopką",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Hetman (Ksawery Branicki, przywódca Targowicy) zarzuca Panu Młodemu, że \u201eczepiłeś się chamskiej dziewki\u201d \u2014 zdradził swoją warstwę, wiążąc się z chłopką.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Co symbolizuje chocholi taniec kończący dramat?",
      content: {
        options: [
          "Radość z odzyskanej wolności",
          "Ludową tradycję weselną Bronowic",
          "Marazm, uśpienie narodu i niezdolność do czynu",
          "Magiczny rytuał ochronny przed złymi duchami",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Chocholi taniec to symbol narodowego marazmu \u2014 weselnicy tańczą w transie, niezdolni do działania, mimo że mieli podjąć walkę o niepodległość. Nadzieja na zryw została zaprzepaszczona.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Czym jest \u201echłopomania\u201d (ludomania), której krytykę znajdujemy w \u201eWeselu\u201d?",
      content: {
        options: [
          "Lękiem inteligencji przed chłopskim buntem",
          "Powierzchowną fascynacją inteligencji wsią, folklorem i chłopskim życiem",
          "Programem politycznym chłopów dążących do władzy",
          "Religijnym kultem natury popularnym na wsi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Chłopomania to modne wśród młodopolskiej inteligencji zjawisko polegające na powierzchownej fascynacji wsią i folklorem. Wyspiański krytykuje tę postawę jako nieszczerą i nietrwałą.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Co Gospodyni robi ze złotą podkową znalezioną pod progiem?",
      content: {
        options: [
          "Pokazuje ją gościom weselnym",
          "Oddaje ją Czepcu",
          "Chowa ją do skrzyni, bo \u201eSzczęście swoje się szanuje\u201d",
          "Przywiązuje ją nad drzwiami na szczęście",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Gospodyni chowa złotą podkowę (zgubioną przez konia Wernyhory) do skrzyni, twierdząc, że szczęście się szanuje i ukrywa. Symbolizuje to odkładanie szansy na przyszłość zamiast działania.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Kim jest Rachel i jaką rolę pełni w akcie I \u201eWesela\u201d?",
      content: {
        options: [
          "Córką karczmarza, która wchodzi w poetycki dialog z Poetą i inspiruje zaproszenie Chochoła",
          "Służącą w chacie Gospodarza, obsługującą gości",
          "Panną młodą z sąsiedniej wsi",
          "Siostrą Panny Młodej, która zazdrości jej szczęścia",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Rachel to córka karczmarza (Żyda), rozmiłowana w poezji. W rozmowie z Poetą inspiruje pomysł zaproszenia Chochoła na wesele, co uruchamia plan fantastyczny dramatu.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Połącz postacie realistyczne z ich zjawami (duchami), które się im ukazały:",
      content: {
        matchingType: "characters_to_spirits",
        leftColumn: [
          { id: "A", text: "Marysia" },
          { id: "B", text: "Dziennikarz" },
          { id: "C", text: "Poeta" },
          { id: "D", text: "Gospodarz" },
        ],
        rightColumn: [
          { id: "1", text: "Rycerz Czarny (Zawisza)" },
          { id: "2", text: "Wernyhora" },
          { id: "3", text: "Widmo (de Laveaux)" },
          { id: "4", text: "Stańczyk" },
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
          "Marysi ukazuje się Widmo (zmarły narzeczony), Dziennikarzowi \u2014 Stańczyk (błazen-filozof), Poecie \u2014 Rycerz Czarny (Zawisza Czarny), Gospodarzowi \u2014 Wernyhora (wieszcz kozacki).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Pierwszą zjawą, która pojawia się w akcie II, jest (1). Ostatnią zjawą odwiedzającą weselną chatę jest (2). Złoty róg trafia ostatecznie w ręce (3).",
        gaps: [
          {
            id: 1,
            options: ["Stańczyk", "Chochoł", "Wernyhora", "Widmo"],
          },
          {
            id: 2,
            options: ["Rycerz Czarny", "Hetman", "Upiór", "Wernyhora"],
          },
          {
            id: 3,
            options: ["Czepca", "Jaśka", "Poety", "Pana Młodego"],
          },
        ],
      },
      correctAnswer: [1, 3, 1],
      metadata: {
        explanation:
          "Pierwszą zjawą jest Chochoł (wpuszczony przez Isię o północy). Ostatnią zjawą jest Wernyhora, który odwiedza Gospodarza. Złoty róg Gospodarz przekazuje Jaśkowi, by ten objeżdżał wsie.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Które stwierdzenia dotyczące Pana Młodego są prawdziwe?",
      content: {
        options: [
          "Jest poetą z Krakowa zafascynowanym wsią",
          "Chodzi boso i nie nosi bielizny od miesiąca",
          "Jest potomkiem rodu Bohatyrowiczów",
          "Porównuje chłopski strój do lalki z Sukiennic",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Pan Młody jest krakowskim poetą, fascynuje się wsią (chodzi boso, nie nosi bielizny). Porównuje Pannę Młodą w stroju ludowym do \u201elalki z Sukiennic, z gabilotki\u201d. Ród Bohatyrowiczów pochodzi z \u201eNad Niemnem\u201d.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Które elementy scenografii opisane w didaskaliach mają znaczenie symboliczne?",
      content: {
        options: [
          "Reprodukcja Matejkowskiego \u201eWernyhory\u201d na ścianie",
          "Szable złożone w krzyż na ścianie",
          "Stołki kuchenne z białego drzewa",
          "Obraz Matki Boskiej Częstochowskiej nad drzwiami",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Obraz Wernyhory Matejki zapowiada pojawienie się zjawy. Szable symbolizują tradycję walki. Obraz Matki Boskiej Częstochowskiej przywołuje religijną tradycję polską. Stołki to element realistyczny bez symboliki.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Połącz zjawy z ich historycznym pierwowzorem:",
      content: {
        matchingType: "spirits_to_historical_figures",
        leftColumn: [
          { id: "A", text: "Hetman" },
          { id: "B", text: "Upiór" },
          { id: "C", text: "Stańczyk" },
          { id: "D", text: "Rycerz Czarny" },
        ],
        rightColumn: [
          { id: "1", text: "Zawisza Czarny z Garbowa" },
          { id: "2", text: "Jakub Szela, przywódca rabacji 1846" },
          { id: "3", text: "Ksawery Branicki, przywódca Targowicy" },
          { id: "4", text: "Błazen ostatnich Jagiellonów" },
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
          "Hetman to Ksawery Branicki (Targowica), Upiór to Jakub Szela (rabacja chłopska 1846), Stańczyk to błazen królewskiej (Jagiellonów), Rycerz to Zawisza Czarny (symbol rycerskiej chwały).",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Wyjaśnij, jakie autentyczne wydarzenie zainspirowało Wyspiańskiego do napisania \u201eWesela\u201d.",
      content: {
        hints: ["data", "miejsce", "osoby"],
      },
      correctAnswer:
        "Inspiracją było wesele poety Lucjana Rydla z chłopką Jadwigą Mikołajczykówną, które odbyło się 20 listopada 1900 roku w Bronowicach pod Krakowem. Na weselu spotkały się dwa środowiska: krakowska inteligencja i bronowiccy chłopi.",
      metadata: {
        explanation:
          "Wyspiański był gościem tego wesela i obserwował zachowania obu grup społecznych. Na kanwie tych obserwacji stworzył dramat, którego premiera odbyła się 16 marca 1901 roku.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Wyjaśnij znaczenie hasła epoki w kontekście \u201eWesela\u201d:",
      content: {
        slogan: "Sztuka dla sztuki",
      },
      correctAnswer:
        "Hasło \u201esztuka dla sztuki\u201d oznacza tworzenie w oderwaniu od spraw społecznych i politycznych. W \u201eWeselu\u201d Wyspiański krytykuje tę postawę \u2014 Poeta i Dziennikarz, zamiast budzić naród do czynu, pogrążają się w dekadentyzmie i estetyzowaniu.",
      metadata: {
        explanation:
          "Wyspiański polemizuje z młodopolskim hasłem \u201esztuka dla sztuki\u201d, pokazując, że artyści (Poeta, Dziennikarz) zaniedbali swoją misję społeczną na rzecz pustego estetyzmu.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "W kontekście rozmowy Czepca z Dziennikarzem w scenie I, co symbolizuje zdanie Dziennikarza: \u201eNiech na całym świecie wojna, / byle polska wieś zaciszna, / byle polska wieś spokojna\u201d?",
      content: {
        sourceText: {
          author: "Stanisław Wyspiański",
          title: "Wesele",
          text: "Ale tu wieś spokojna. \u2014 / Niech na całym świecie wojna, / byle polska wieś zaciszna, / byle polska wieś spokojna.",
        },
        options: [
          "Lekceważenie chłopów i niechęć do traktowania ich jako partnerów politycznych",
          "Szczerą troskę o bezpieczeństwo wsi polskiej",
          "Przekonanie, że wieś powinna być chroniona przed wojną",
          "Podziw Dziennikarza dla spokojnego życia na wsi",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Słowa Dziennikarza wyrażają protekcjonalny stosunek inteligencji do chłopów. Nie traktuje ich jako partnerów zdolnych do rozmowy o polityce \u2014 spycha wieś do roli pasterskiej idylli.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Dlaczego Wyspiański wprowadza do dramatu postać Upiora (Jakuba Szeli) i komu się on ukazuje?",
      content: {
        options: [
          "Ukazuje się Panu Młodemu i przypomina o zdradzie magnackiej",
          "Ukazuje się Dziadowi i przypomina o rabacji galicyjskiej 1846 roku, która podzieliła chłopów i szlachtę",
          "Ukazuje się Czepcowi i wzywa go do nowej rzezi",
          "Ukazuje się Poecie i inspiruje go do napisania dramatu o chłopskim buncie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Upiór (Jakub Szela) ukazuje się Dziadowi. Przypomina o krwawej rabacji chłopskiej 1846 roku. Przychodzi \u201ebo byłem ich ojcom kat, / a dzisiaj ja jestem swat\u201d \u2014 wskazując, że nierozliczona przeszłość wciąż dzieli społeczeństwo.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Jaką funkcję pełni rozmowa Gospodarza z Poetą w scenie XXIV aktu I, w której pada zdanie \u201echłop potęgą jest i basta\u201d?",
      content: {
        options: [
          "Wyraża bezkrytyczny zachwyt Gospodarza nad chłopami \u2014 jest przejawem chłopomanii",
          "Stanowi realistyczną ocenę siły politycznej chłopów w Galicji",
          "Jest ironicznym komentarzem Wyspiańskiego do fałszywego mitu o chłopie-Piaście",
          "Zarówno A, jak i C \u2014 Gospodarz jest szczery, ale Wyspiański ujawnia naiwność tej postawy",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Gospodarz wyraża szczery podziw dla chłopów, ale Wyspiański ukazuje złożoność tej postawy. Z jednej strony to chłopomania (idealizacja), z drugiej \u2014 Wyspiański ironicznie obnaża mit Piasta, który nie prowadzi do rzeczywistego porozumienia.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Jaki środek stylistyczny dominuje w wypowiedzi Maryny do Poety: \u201eSłowa, słowa, słowa, słowa\u201d (akt I, scena X)?",
      content: {
        sentence: "Słowa, słowa, słowa, słowa.",
        options: [
          "Metafora",
          "Anafora i powtórzenie (z aluzją do \u201eHamleta\u201d Szekspira)",
          "Hiperbola",
          "Oksymoron",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Czterokrotne powtórzenie słowa \u201esłowa\u201d to anafora/powtórzenie, a jednocześnie aluzja do \u201eHamleta\u201d Szekspira (\u201eWords, words, words\u201d). Maryna demaskuje pustosłowie Poety.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Jak Wyspiański ocenia zdolność inteligencji i chłopów do wspólnego działania narodowego?",
      content: {
        options: [
          "Optymistycznie \u2014 wesele dowodzi, że obie grupy mogą się porozumieć",
          "Pesymistycznie \u2014 mimo pozornego zbliżenia, obie grupy nie potrafią się naprawdę zjednoczyć",
          "Neutralnie \u2014 Wyspiański nie ocenia, tylko obserwuje",
          "Z nadzieją \u2014 chocholi taniec jest zapowiedzią przyszłego zrywu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wyspiański pesymistycznie ocenia szanse na porozumienie. Inteligencja traktuje chłopów protekcjonalnie, chłopi nie ufają panom. Chocholi taniec kończy dramat symbolem marazmu \u2014 szansa na wspólny czyn została zaprzepaszczona.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Co oznacza sen Panny Młodej, w którym diabły wiozą ją karetą \u201edo Polski\u201d, a ona pyta: \u201eA kaz tyz ta Polska, a kaz ta?\u201d?",
      content: {
        options: [
          "Naiwność Panny Młodej, która nie zna geografii",
          "Symboliczne wyrażenie pytania o tożsamość narodową \u2014 Polska w niewoli nie istnieje na mapie",
          "Lęk Panny Młodej przed przeprowadzką do miasta",
          "Dosłowny sen bez głębszego znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sen Panny Młodej ma znaczenie symboliczne. Pytanie \u201egdzie jest Polska?\u201d odnosi się do sytuacji narodu pod zaborami \u2014 Polska nie istnieje na mapie. Poeta odpowiada: \u201eA to Polska właśnie\u201d \u2014 wskazując na serce.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Jaką rolę pełni stylizacja gwarowa w języku \u201eWesela\u201d?",
      content: {
        options: [
          "Służy wyłącznie komicznemu efektowi i ośmieszeniu chłopów",
          "Charakteryzuje postacie chłopskie i podkreśla przepaść komunikacyjną między warstwami społecznymi",
          "Jest błędem redakcyjnym \u2014 Wyspiański nie kontrolował języka postaci",
          "Dotyczy wyłącznie postaci fantastycznych (zjaw)",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Gwara (mazurzenie, formy dialektalne) charakteryzuje postacie chłopskie i buduje kontrast z językiem poetyckim inteligencji. Podkreśla barierę komunikacyjną między dwiema grupami społecznymi.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Co mają wspólnego słowa Czepca: \u201eZ takich, jak my, był Głowacki\u201d (akt I, scena I) i postawa chłopów w finale dramatu?",
      content: {
        sourceText: {
          author: "Stanisław Wyspiański",
          title: "Wesele",
          text: "A, jak myślę, ze panowie / duza by juz mogli mieć, / ino oni nie chcom chcieć!",
        },
        options: [
          "Obie sytuacje pokazują gotowość chłopów do czynu \u2014 w finale zryw się udaje",
          "Czepiec odwołuje się do Bartosza Głowackiego (Racławice), ale w finale chłopi ulegają chocholemu tańcowi \u2014 gotowość do czynu nie wystarczy bez przywództwa",
          "Słowa Czepca są ironiczne \u2014 nie wierzy w siłę chłopów",
          "Głowacki to postać z innej lektury, niezwiązana z przesłaniem \u201eWesela\u201d",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Czepiec przywołuje Bartosza Głowackiego, chłopskiego bohatera bitwy pod Racławicami. Chłopi deklarują gotowość do walki, ale w finale ulegają chocholemu tańcowi \u2014 brakuje im przywódcy, który poprowadzi ich do czynu.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Które motywy literackie są obecne w dramacie \u201eWesele\u201d?",
      content: {
        options: [
          "Motyw tańca jako symbolu marazmu narodowego",
          "Motyw bariery komunikacyjnej między warstwami społecznymi",
          "Motyw walki zbrojnej prowadzącej do zwycięstwa",
          "Motyw zaprzepaszczonej szansy na narodowy zryw",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Taniec (chocholi taniec = marazm), bariera komunikacyjna (inteligencja vs chłopi) i zaprzepaszczona szansa (zgubiony złoty róg) to kluczowe motywy. Walka zbrojna NIE dochodzi do skutku \u2014 to właśnie tragedia dramatu.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Uzupełnij luki w opisie struktury \u201eWesela\u201d:",
      content: {
        textWithGaps:
          "Akt I jest nazywany (1) \u2014 prezentuje rozmowy gości weselnych. Akt II jest (2) \u2014 pojawiają się zjawy. Akt III rozgrywa się (3) i kończy chocholim tańcem.",
        gaps: [
          {
            id: 1,
            options: [
              "realistycznym",
              "fantastycznym",
              "symbolicznym",
              "komediowym",
            ],
          },
          {
            id: 2,
            options: [
              "satyryczny",
              "komiczny",
              "realistyczno-fantastyczny",
              "wyłącznie fantastyczny",
            ],
          },
          {
            id: 3,
            options: ["w południe", "o świcie", "w nocy", "wieczorem"],
          },
        ],
      },
      correctAnswer: [0, 2, 1],
      metadata: {
        explanation:
          "Akt I jest realistyczny (reportaż z wesela). Akt II jest realistyczno-fantastyczny (zjawy mieszają się z rzeczywistością). Akt III rozgrywa się o świcie i kończy chocholim tańcem.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Które wady inteligencji Wyspiański demaskuje w \u201eWeselu\u201d?",
      content: {
        options: [
          "Dekadentyzm i niezdolność do przejścia od słów do czynów",
          "Protekcjonalny stosunek do chłopów mimo pozornej fascynacji",
          "Nadmierna pracowitość i poświęcenie się nauce",
          "Skłonność do pustosłowia i estetyzowania rzeczywistości",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Wyspiański demaskuje dekadentyzm (Poeta, Dziennikarz, Nos), protekcjonalizm wobec chłopów (Dziennikarz, Pan Młody) i pustosłowie inteligencji. Pracowitość nie jest cechą krytykowaną w dramacie.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Połącz cytaty z postaciami, które je wypowiadają:",
      content: {
        matchingType: "quotes_to_characters",
        leftColumn: [
          { id: "A", text: "\u201eMiałeś, chamie, złoty róg\u201d" },
          { id: "B", text: "\u201eCóz tam, panie, w polityce?\u201d" },
          { id: "C", text: "\u201eA to Polska właśnie\u201d" },
          { id: "D", text: "\u201eMyśmy wszystko zapomnieli\u201d" },
        ],
        rightColumn: [
          { id: "1", text: "Czepiec" },
          { id: "2", text: "Chochoł" },
          { id: "3", text: "Pan Młody" },
          { id: "4", text: "Poeta" },
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
          "\u201eMiałeś, chamie, złoty róg\u201d \u2014 Chochoł (finał). \u201eCóz tam, panie, w polityce?\u201d \u2014 Czepiec (otwarcie). \u201eA to Polska właśnie\u201d \u2014 Poeta (o sercu). \u201eMyśmy wszystko zapomnieli\u201d \u2014 Pan Młody (o rabacji).",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Stanisław Wyspiański",
          title: "Wesele",
          text: "My jesteśmy jak przeklęci, / że nas mara, dziwo nęci, / wytwór tęsknej wyobraźni / serce bierze, zmysły drażni; / że nam oczy zaszły mgłami; / pieścimy się jeno snami, / a to, co tu nas otacza, / zdolność nasza przeinacza: / w oczach naszych chłop urasta / do potęgi króla Piasta!",
          bookReference: "Akt I, scena XXIV",
        },
        tasks: [
          {
            id: 1,
            instruction: "Kto wypowiada te słowa i do kogo się zwraca?",
            minWords: 10,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Wyjaśnij, jakie zjawisko społeczne Wyspiański krytykuje w tym fragmencie.",
            minWords: 20,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Słowa wypowiada Poeta, zwracając się do Gospodarza. 2) Wyspiański krytykuje chłopomanię \u2014 inteligencja idealizuje chłopów, przypisując im cechy mitycznego króla Piasta. Jednak ta fascynacja jest powierzchowna (\u201epieścimy się jeno snami\u201d) i nie prowadzi do realnego zbliżenia.",
      metadata: {
        explanation:
          "Fragment jest kluczowy dla zrozumienia krytyki chłopomanii \u2014 inteligencja \u201eprzeinacza\u201d rzeczywistość, widząc w chłopie mitycznego Piasta zamiast realnego partnera.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Odpowiedz na pytania dotyczące sceny XXX aktu I (rozmowa Pana Młodego z Gospodarzem o rabacji):",
      content: {
        steps: [
          {
            id: 1,
            instruction:
              "O jakim wydarzeniu historycznym rozmawiają bohaterowie?",
          },
          {
            id: 2,
            instruction:
              "Jakie zdanie powtarzają obaj, i co ono oznacza w kontekście dramatu?",
          },
        ],
      },
      correctAnswer:
        "1) Rozmawiają o rabacji galicyjskiej (rzezi szlachty) z 1846 roku, kiedy chłopi podburzeni przez Austriaków mordowali szlachtę. 2) Powtarzają zdanie \u201eMyśmy wszystko zapomnieli\u201d \u2014 oznacza ono, że zarówno inteligencja, jak i chłopi wyparli z pamięci traumę krwawego konfliktu, ale nierozliczona przeszłość wciąż dzieli oba stany.",
      metadata: {
        explanation:
          "Scena ta jest kluczowa dla problematyki dramatu. \u201eMyśmy wszystko zapomnieli\u201d to jedno z najważniejszych zdań \u201eWesela\u201d \u2014 wyparte zbrodnie uniemożliwiają prawdziwe pojednanie.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Wykonaj polecenie:",
      content: {
        instruction:
          "Wyjaśnij, dlaczego \u201eWesele\u201d Wyspiańskiego nazywane jest dramatem symbolicznym. Podaj trzy przykłady symboli z utworu i wyjaśnij ich znaczenie.",
      },
      correctAnswer:
        "Dramat jest symboliczny, ponieważ oprócz warstwy realistycznej (obraz wesela, rozmowy) zawiera warstwę symboliczną (zjawy, przedmioty). Przykłady: 1) Chochoł \u2014 symbol marazmu i uśpienia narodu; 2) Złoty róg \u2014 symbol szansy na narodowy zryw, wezwania do walki; 3) Czapka z pawimi piórami \u2014 symbol przywiązania do dóbr materialnych kosztem wielkich idei.",
      metadata: {
        explanation:
          "Symbolizm \u201eWesela\u201d obejmuje postacie (zjawy), przedmioty (róg, podkowa, czapka, sznur) i sceny (chocholi taniec). Warstwa symboliczna nadaje dramatowi głębszy wymiar \u2014 od reportażu z wesela do rozrachunku z kondycją narodu.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Porównanie postaw Czepca i Dziennikarza wobec kwestii narodowej w akcie I \u201eWesela\u201d",
        requirements: [
          "Scharakteryzuj postawę każdej z postaci",
          "Wskaż, co utrudnia ich porozumienie",
          "Odwołaj się do sceny I aktu I",
          "80-120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Notatka powinna zawierać: Czepiec \u2014 chłop zainteresowany polityką, gotowy do działania, odwołujący się do Głowackiego, zarzucający panom, że \u201enie chcom chcieć\u201d. Dziennikarz \u2014 zniechęcony, protekcjonalny, uważa, że wieś powinna być \u201espokojna\u201d, zbywa chłopa. Bariera: Dziennikarz nie traktuje Czepca jako partnera, chłop czuje się lekceważony. Porozumienie jest pozorne \u2014 obie strony mówią obok siebie.",
      metadata: {
        explanation:
          "Scena I aktu I to programowa scena \u201eWesela\u201d, która natychmiast ujawnia przepaść między inteligencją a chłopstwem. Czepiec jest aktywny i zainteresowany światem, ale Dziennikarz go zbywa.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Napisz notatkę analityczną na podany temat:",
      content: {
        topic:
          "Rola zjaw (postaci fantastycznych) w akcie II \u201eWesela\u201d \u2014 jaką funkcję pełnią wobec bohaterów realistycznych?",
        requirements: [
          "Wskaż ogólną zasadę: kto komu się ukazuje i dlaczego",
          "Podaj dwa konkretne przykłady z omówieniem",
          "80-120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Zjawy ukazują się tym bohaterom, z których lękami, marzeniami lub wyrzutami sumienia są powiązane \u2014 są projekcjami ich wewnętrznych konfliktów. Np. Stańczyk ukazuje się Dziennikarzowi, bo ten \u2014 jak dawny błazen \u2014 powinien mówić prawdę narodowi, ale usypia go biernością. Rycerz ukazuje się Poecie, bo ten marzy o wielkiej poezji, ale jest dekadentem niezdolnym do czynu. Zjawy konfrontują bohaterów z ich prawdziwą kondycją duchową.",
      metadata: {
        explanation:
          "Chochoł zapowiada: \u201eco się w duszy komu gra, co kto w swoich widzi snach\u201d. Zjawy to lustro duszy bohaterów \u2014 ukazują to, co ukryte: lęki, marzenia, wyrzuty sumienia.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Jak \u201eWesele\u201d nawiązuje do tradycji romantycznej, a jednocześnie z nią polemizuje?",
      content: {
        context:
          "Wyspiański przywołuje w dramacie elementy typowe dla romantyzmu: zjawy, mesjanizm, ideę poety-wieszcza. Jednocześnie ocenia współczesne mu społeczeństwo.",
        options: [
          "Przejmuje bez zmian romantyczny model poety-przewodnika narodu",
          "Nawiązuje do romantycznych motywów (zjawy, patriotyzm), ale pokazuje, że współcześni nie dorośli do romantycznych ideałów \u2014 postacie są dekadentami, niezdolnymi do czynu",
          "Odrzuca romantyzm całkowicie na rzecz pozytywistycznego realizmu",
          "Nawiązuje wyłącznie do \u201eDziadów\u201d Mickiewicza, nie polemizując z romantyzmem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wyspiański korzysta z romantycznego rekwizytu (zjawy jak w \u201eDziadach\u201d, wezwanie do walki jak u Mickiewicza), ale konfrontuje go z młodopolską rzeczywistością. Poeta, Dziennikarz, Gospodarz \u2014 wszyscy ponoszą porażkę tam, gdzie romantycy wierzyli w sukces.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Jakie znaczenie ma fakt, że Gospodarz \u2014 jedyny bohater mogący zjednoczyć chłopów i inteligencję \u2014 zasypia pijany i nie pamięta poleceń Wernyhory?",
      content: {
        options: [
          "Jest to przypadek fabularny bez głębszego znaczenia",
          "Symbolizuje niezdolność polskiej elity do podjęcia odpowiedzialności za losy narodu \u2014 nawet najlepsi zawodzą w kluczowym momencie",
          "Pokazuje, że chłopi są lepszymi przywódcami niż inteligencja",
          "Jest dowodem, że Wernyhora był tylko złudzeniem i nic się tak naprawdę nie wydarzyło",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Gospodarz \u2014 jedyny, kto łączy oba światy (inteligent żonaty z chłopką, od 10 lat na wsi) \u2014 zapada w sen alkoholowy. To diagnoza Wyspiańskiego: nawet ci, którzy mogliby poprowadzić naród, zawodzą w decydującym momencie.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER text_analysis (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Stanisław Wyspiański",
          title: "Wesele",
          text: "Miałeś, chamie, złoty róg, / miałeś, chamie, czapkę z piór: / czapkę wicher niesie, / róg huka po lesie, / ostał ci sie ino sznur, / ostał ci sie ino sznur.",
          bookReference: "Akt III, scena XXXVII",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wyjaśnij symboliczne znaczenie złotego rogu, czapki z piór i sznura w kontekście całego dramatu.",
            minWords: 50,
            maxPoints: 3,
          },
        ],
      },
      correctAnswer:
        "Złoty róg symbolizuje szansę na narodowy zryw i sygnał do walki o niepodległość. Czapka z pawimi piórami symbolizuje próżność, przywiązanie do dóbr materialnych i pozorów. Sznur symbolizuje niewolę \u2014 to, co pozostaje po utraconej szansie. Jasiek zgubił róg, bo schylił się po czapkę \u2014 naród wybrał błyskotki zamiast wolności.",
      metadata: {
        explanation:
          "To kluczowa scena finałowa. Chochoł wypomina Jaśkowi (a symbolicznie \u2014 całemu narodowi) zaprzepaszczenie szansy. Trzy przedmioty tworzą symboliczny trójkąt: nadzieja (róg) \u2014 próżność (czapka) \u2014 niewola (sznur).",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Napisz notatkę analityczną na podany temat:",
      content: {
        topic:
          "Diagnoza polskiego społeczeństwa w \u201eWeselu\u201d \u2014 dlaczego Polacy nie są zdolni do walki o niepodległość?",
        requirements: [
          "Wskaż wady inteligencji i wady chłopów ukazane w dramacie",
          "Omów rolę nierozliczonej przeszłości (rabacja, zdrada magnacka)",
          "Wyjaśnij symboliczne znaczenie chocholego tańca jako podsumowania diagnozy",
          "Odwołaj się do min. 3 postaci",
          "120-180 słów",
        ],
        wordLimit: { min: 120, max: 180 },
      },
      correctAnswer:
        "Notatka powinna zawierać: Wady inteligencji: dekadentyzm (Poeta, Dziennikarz, Nos), pustosłowie, chłopomania jako pozorna fascynacja, niezdolność do czynu (Gospodarz zasypia). Wady chłopów: brak świadomości politycznej, skłonność do bójek (Czepiec bije Żyda), brak wykształcenia. Nierozliczona przeszłość: rabacja (Upiór-Szela) i zdrada magnacka (Hetman-Branicki) uniemożliwiają porozumienie. Chocholi taniec: symbol ostatecznego marazmu \u2014 naród tańczy w transie, niezdolny do czynu. Sznur = niewola, róg = utracona szansa.",
      metadata: {
        explanation:
          "Wyspiański stawia diagnozę obu warstwom: inteligencja jest bierna i fałszywa, chłopi \u2014 prości i porywczy. Nierozliczona przeszłość dzieli naród. Chocholi taniec podsumowuje pesymistyczną wizję: szansa minęła, naród śpi.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Czy inteligencja i chłopstwo w \u201eWeselu\u201d Wyspiańskiego są zdolne do porozumienia? Napisz rozprawkę, odwołując się do wybranych scen dramatu.",
      content: {
        thesis:
          "Porozumienie między inteligencją a chłopstwem w \u201eWeselu\u201d \u2014 szansa czy złudzenie?",
        structure: {
          introduction:
            "Przedstaw kontekst: wesele jako miejsce spotkania dwóch światów",
          arguments_for:
            "Wskaż momenty pozornego zbliżenia (chłopomania Pana Młodego, deklaracje Gospodarza, wspólna zabawa)",
          arguments_against:
            "Pokaż bariery: protekcjonalizm Dziennikarza, powierzchowność fascynacji, nierozliczona przeszłość (rabacja), chocholi taniec jako finał",
          conclusion: "Sformułuj wniosek na temat diagnozy Wyspiańskiego",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do min. 3 scen dramatu",
          "Odwołanie do min. 4 postaci",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Praca powinna zawierać: tezę o pozorności porozumienia + argumenty z odwołaniem do scen (I.1 Czepiec-Dziennikarz, I.24 Gospodarz-Poeta o chłopie Piaście, I.30 o rabacji, akt III chocholi taniec) + analizę postaci (Pan Młody, Dziennikarz, Czepiec, Gospodarz) + wniosek: porozumienie jest złudzeniem, bo obie strony mówią obok siebie, a przeszłość uniemożliwia zaufanie.",
      metadata: {
        explanation:
          "Kluczowe: scena Czepca z Dziennikarzem (przepaść), \u201echłop potęgą jest i basta\u201d (mit), \u201eMyśmy wszystko zapomnieli\u201d (trauma), chocholi taniec (finał). Wyspiański odpowiada pesymistycznie.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (1) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Którą z poniższych interpretacji finału \u201eWesela\u201d (chocholego tańca) można uznać za najbardziej wielowymiarową?",
      content: {
        options: [
          "Chocholi taniec to wyłącznie obraz pijaństwa weselników \u2014 nie ma głębszego znaczenia",
          "Chocholi taniec to pesymistyczna diagnoza bez żadnej nadziei \u2014 naród jest skazany na wieczny marazm",
          "Chocholi taniec to symbol aktualnego uśpienia narodu, ale Chochoł jest też krzakiem róży, który na wiosnę może odżyć \u2014 Wyspiański dopuszcza zarówno pesymistyczną, jak i ostrożnie optymistyczną interpretację",
          "Chocholi taniec to wyłącznie wyraz artystycznej wizji Wyspiańskiego, bez odniesień do sytuacji politycznej",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Najbardziej wielowymiarowa interpretacja uwzględnia oba aspekty Chochoła: pesymistyczny (słoma, marazm, uśpienie) i potencjalnie optymistyczny (pod słomą jest róża, która na wiosnę może odżyć). Wyspiański nie przesądza jednoznacznie \u2014 zostawia iskierkę nadziei.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "Które z poniższych stwierdzeń poprawnie opisują \u201eWesele\u201d jako rozrachunek Wyspiańskiego z mitami narodowymi?",
      content: {
        options: [
          "Wyspiański obala mit solidarności chłopsko-inteligentnej \u2014 zbliżenie jest pozorne i powierzchowne",
          "Wyspiański potwierdza romantyczny mit poety-wieszcza \u2014 Poeta skutecznie budzi naród do czynu",
          "Wyspiański podważa mit chłopa-Piasta \u2014 idealizowany obraz chłopa rozmija się z rzeczywistością",
          "Wyspiański krytykuje mit heroizmu narodowego \u2014 współcześni nie dorośli do wielkich czynów przodków",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Wyspiański obala trzy mity: 1) solidarność chłopsko-inteligencka jest pozorna, 2) chłop-Piast to wyidealizowany obraz (chłopomania), 3) współcześni nie dorośli do heroizmu (dekadenci). MIT poety-wieszcza jest ODRZUCONY, nie potwierdzony \u2014 Poeta ponosi klęskę.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Przeczytaj fragment i napisz analizę:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Stanisław Wyspiański",
          title: "Wesele",
          text: "Wy a wy \u2014 co wy jesteście: / wy się wynudzicie w mieście, / to się wam do wsi zachciało: / tam wam mało, tu wam mało, / a ot, co z nas pozostało: / lalki, szopka, podłe maski, / farbowany fałsz, obrazki; / niegdyś, gdzieś tam, tęgie pyski / i do szabli, i do miski; / kiedyś, gdzieś tam, tęgie dusze, / półwariackie animusze: / kogoś zbawiać, kogoś siekać; / dzisiaj nie ma na co czekać.",
          bookReference: "Akt II, scena XXX",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Kto wypowiada te słowa i w jakim stanie emocjonalnym się znajduje?",
            minWords: 15,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Wyjaśnij, jakie zarzuty Gospodarz stawia inteligencji i co mówi o kondycji narodu. Odwołaj się do min. 2 środków stylistycznych użytych w tym fragmencie.",
            minWords: 50,
            maxPoints: 3,
          },
        ],
      },
      correctAnswer:
        "1) Mówi Gospodarz, w stanie rozgorączkowania po spotkaniu z Wernyhorą, pijany, ale przejęty wizją. 2) Zarzuca inteligencji, że przyjeżdża na wieś z nudów, a fascynacja wsią jest fałszywa (\u201efarbowany fałsz, obrazki\u201d). Porównuje dzisiejszych Polaków z dawnymi (\u201etęgie dusze, półwariackie animusze\u201d vs \u201elalki, szopka, podłe maski\u201d). Używa kontrastu (dawniej-dziś), wyliczenia (\u201elalki, szopka, podłe maski\u201d) i metafory (\u201efarbowany fałsz\u201d). Diagnoza: naród stracił autentyczność i siłę.",
      metadata: {
        explanation:
          "To jedno z najostrzejszych przemówień w dramacie. Gospodarz, sam będąc inteligentem na wsi, demaskuje fałsz swoich krakowskich gości. Fragment podsumowuje krytykę obu aktów.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Porównaj wizję narodu polskiego w \u201eWeselu\u201d Wyspiańskiego z wizją w \u201eDziadach\u201d cz. III Mickiewicza. Jak zmienia się diagnoza między romantyzmem a Młodą Polską?",
        requirements: [
          "Porównaj stosunek obu autorów do narodu polskiego i jego szans na odrodzenie",
          "Wskaż, jak różni się rola artysty/wieszcza w obu dziełach",
          "Odwołaj się do symboliki obu dramatów (np. Wielka Improwizacja vs chocholi taniec)",
          "Sformułuj wniosek: co się zmieniło między epokami?",
          "150-200 słów",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna zawierać: Mickiewicz (romantyzm): naród cierpiący, ale wybrany; Konrad \u2014 poeta-wieszcz walczący o naród (Wielka Improwizacja); wizja mesjanistyczna \u2014 Polska Chrystusem narodów; nadzieja na odrodzenie. Wyspiański (Młoda Polska): naród bierny, niezdolny do czynu; Poeta \u2014 dekadent, pustosłów; wizja pesymistyczna \u2014 chocholi taniec zamiast powstania; Jasiek gubi róg. Zmiana: romantyczna wiara w poety-przewodnika ustąpiła miejsca gorzkiej diagnozie, że ani inteligencja, ani chłopi nie dorośli do ideałów przodków. Wielka Improwizacja to krzyk wiary, chocholi taniec \u2014 symbol bezsiły.",
      metadata: {
        explanation:
          "Porównanie z \u201eDziadami\u201d to klasyczny kontekst maturalny. Wyspiański świadomie polemizuje z romantycznym mesjanizmem \u2014 zjawy nie budzą, lecz obnażają niemoc współczesnych.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "YOUNG_POLAND",
      work: "Wesele",
      question:
        "\u201eWesele\u201d Stanisława Wyspiańskiego \u2014 sen o Polsce czy sąd nad Polską? Uzasadnij swoją interpretację, odwołując się do wybranych scen dramatu oraz kontekstu literackiego lub historycznego.",
      content: {
        thesis: "\u201eWesele\u201d jako sen o Polsce i/lub sąd nad Polską",
        structure: {
          introduction:
            "Przedstaw problem interpretacyjny: czy \u201eWesele\u201d jest marzeniem o wolnej Polsce, czy surową oceną narodu?",
          arguments_for:
            "Argumenty za \u201esnem\u201d: nocna atmosfera, zjawy, wizja Wernyhory, nadzieja na zryw. Argumenty za \u201esądem\u201d: krytyka inteligencji i chłopów, chocholi taniec, zgubiony róg",
          arguments_against:
            "Rozważ, czy obie interpretacje nie uzupełniają się wzajemnie \u2014 Wyspiański jednocześnie marzy i osądza",
          conclusion: "Sformułuj wniosek o wieloznaczności \u201eWesela\u201d",
        },
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do min. 4 scen dramatu",
          "Odwołanie do kontekstu literackiego (np. \u201eDziady\u201d, romantyzm) LUB historycznego (zabory, rabacja)",
          "Odwołanie do symboliki (Chochoł, złoty róg, taniec)",
          "Poprawna struktura rozprawki z wieloznaczną tezą",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Praca powinna zawierać: wieloznaczną tezę (sen I sąd jednocześnie) + analizę scen (zjaw jako marzeń sennych / nocnej atmosfery + krytyki społeczeństwa) + kontekst (romantyzm: \u201eDziady\u201d; historia: rabacja 1846, zabory) + symbolikę (Chochoł = marazm I nadzieja, róg = szansa, sznur = niewola) + wniosek: Wyspiański jednocześnie śni i osądza, dramat jest zarówno poetyckim marzeniem, jak i bezlitosną diagnozą.",
      metadata: {
        explanation:
          "To klasyczny temat maturalny z puli jawnej. Najlepsza odpowiedź łączy obie interpretacje: \u201eWesele\u201d jest JEDNOCZEŚNIE snem (wizja, zjawy, nadzieja) i sądem (krytyka, chocholi taniec, utracona szansa). Wieloznaczność to siła dramatu.",
      },
    },

    // ======================= KONIEC PYTAŃ WESELE ===================//
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Kto jest autorem ballady "Romantycznosc"?',
      content: {
        options: [
          "Juliusz Slowacki",
          "Adam Mickiewicz",
          "Zygmunt Krasinski",
          "Cyprian Kamil Norwid",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Romantycznosc" to ballada Adama Mickiewicza napisana na poczatku 1821 roku i wydana w 1822 roku w tomie "Ballady i romanse". Tom ten uznaje sie za poczatek polskiego romantyzmu.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Jak ma na imie dziewczyna, ktora widzi ducha ukochanego w "Romantycznosci"?',
      content: {
        options: ["Maryla", "Karusia", "Krysia", "Zosia"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Karusia (zdrobnienie od Kasi) to prosta dziewczyna, ktora w bialy dzien, posrod miasteczka, widzi ducha zmarlego ukochanego — Jasienka. Ludzie probuja sie do niej odezwac ("Sluchaj dzieweczko!"), ale "Ona nie slucha".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Jak nazywa sie zmarly ukochany Karusi?",
      content: {
        options: ["Janek (Jasieniek)", "Tomek", "Wojtek", "Piotrek"],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          'Jasienek (Jasio, Janek) to zmarly kochanek Karusi. Umarl dwa lata wczesniej. Karusia widzi jego ducha i mowi do niego: "Tyzes to w nocy? to ty Jasienku! Ach! i po smierci kocha!"',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Jakie jest najslynniejsze zdanie konczace "Romantycznosc"?',
      content: {
        options: [
          '"Czucie i wiara silniej mowi do mnie, niz medrca szkielko i oko"',
          '"Miej serce i patrzaj w serce!"',
          '"Nie znasz prawd zywych, nie obaczysz cudu!"',
          "Wszystkie powyzsze — to trzy ostatnie wersy utworu",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          'Trzy ostatnie wersy "Romantycznosci" stanowia manifest romantyzmu: "Czucie i wiara silniej mowi do mnie, / Niz medrca szkielko i oko. // Martwe znasz prawdy, nieznane dla ludu, / Widzisz swiat w proszku, w kazdej gwiazd iskierce; / Nie znasz prawd zywych, nie obaczysz cudu! / Miej serce i patrzaj w serce!"',
      },
    },

    // ===== DIFF 1 — ROMANTYCZNOSC — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Ktore stwierdzenia o "Romantycznosci" sa prawdziwe?',
      content: {
        options: [
          'Ballada zostala wydana w 1822 roku w tomie "Ballady i romanse"',
          'Motto pochodzi z "Hamleta" Szekspira',
          "Akcja rozgrywa sie w nocy, w ciemnym lesie",
          "W utworze wystepuje Starzec, ktory reprezentuje racjonalizm",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Wydanie 1822 — tak. Motto z "Hamleta": "Methinks, I see... Where? In my mind\'s eyes" — tak. Starzec = racjonalista ("Ufajcie memu oku i szkielku") — tak. Akcja NIE rozgrywa sie w nocy w lesie — rozgrywa sie w bialy dzien, w miasteczku.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Ktore postacie wystepuja w "Romantycznosci"?',
      content: {
        options: [
          "Karusia — dziewczyna widzaca ducha",
          "Starzec — racjonalista ze szkielkiem",
          'Narrator ("ja") — stajacy po stronie dziewczyny',
          "Ksiadz — odprawiajacy egzorcyzmy",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Karusia (widzi ducha Jasienka), Starzec ("Ufajcie memu oku i szkielku, / Nic tu nie widze dokola") i narrator ("I ja to slysze, i ja tak wierze") to trzy glosy w balladzie. Ksiadz NIE wystepuje.',
      },
    },

    // ===== DIFF 1 — ROMANTYCZNOSC — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Opisz krotko, co robi Karusia w "Romantycznosci" — jak sie zachowuje.',
      content: {
        hints: ["duch", "Jasienek", "chwyta", "placzze", "smieje"],
      },
      correctAnswer:
        'Karusia stoi w bialy dzien w miasteczku i zachowuje sie jak szalona: "To jak martwa opoka nie zwroci w strone oka, to strzela wkolo oczyma, to sie lzami zaleje". Chwyta cos niewidzialnego, mowi do ducha Jasienka: "Tyzes to w nocy? Ach! i po smierci kocha!". Prosi go, zeby przyszedl ciszej ("Czasem uslyszy macocha"). Opowiada o jego bialej sukience, zimnych dloniach, prosi o pocałunek. Gdy duch znika o swicie (pieje kur, zorza blyszcze), krzyczy: "Ja nieszczesliwa!" i upada.',
      metadata: {
        explanation:
          'Zachowanie Karusi to kluczowy element ballady: dla Starca — to szalenstwo, dla narratora i ludu — dowod na istnienie swiata duchow. Karusia "czuje" — i to jej czucie jest wazniejsze niz rozum Starca.',
      },
    },

    // ===== DIFF 2 — ROMANTYCZNOSC — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Co mowi Starzec o Karusi i duchach?",
      content: {
        options: [
          "Wspolczuje Karusi i modli sie za nia",
          'Krzyczy, ze duchy to "twor karczemnej gawiedzi", dziewczyna "duby smalone bredzi", a lud "rozumowi bluzni" — zada, by wierzono tylko jego oku i szkielku',
          "Chce pomoc Karusi odnalezc grob Jasienka",
          "Milczy i obserwuje scene z daleka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Starzec reprezentuje racjonalizm oswieceniowy. Mowi: "Ufajcie memu oku i szkielku, / Nic tu nie widze dokola", duchy to "twor karczemnej gawiedzi, / W glupstwa wywarzone kuzni". Dziewczyna "bredzi", a "gmin rozumowi bluzni". To glos nauki przeciw wierze ludu.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Po czyjej stronie staje narrator "Romantycznosci"?',
      content: {
        options: [
          "Po stronie Starca i nauki",
          'Po stronie Karusi, ludu, czucia i wiary — odpowiada Starcowi: "Czucie i wiara silniej mowi do mnie, niz medrca szkielko i oko"',
          "Jest neutralny i nie zajmuje stanowiska",
          "Po stronie macochy Karusi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Narrator ("ja") staje po stronie Karusi i ludu: "I ja to slysze, i ja tak wierze, / Placze i mowie pacierze". Odpowiada Starcowi "skromnie", ale stanowczo: "Dziewczyna czuje — odpowiadam skromnie — A gawiedz wierzy gleboko". To glos Mickiewicza-romantyka.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Jakie znaczenie ma motto z "Hamleta" Szekspira umieszczone przed "Romantycznoscia"?',
      content: {
        options: [
          "Jest ozdoba literacka bez glebszego sensu",
          '"Zdaje mi sie, ze widze... Gdzie? Przed oczyma duszy mojej" — zapowiada temat widzenia oczami duszy, nie ciala; tego co niewidzialne dla rozumu, a widzialne dla uczucia',
          "Odnosi sie do postaci Starca i jego szkielka",
          "Jest ironicznym komentarzem do zachowania Karusi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Motto z "Hamleta" (akt I, scena 2 — Hamlet mowi do Horacja o duchu ojca) ustanawia temat: widzenie "oczyma duszy" — nie fizycznym wzrokiem. Karusia widzi Jasienka wlasnie tak: oczyma duszy. Starzec widzi tylko "szkielkiem i okiem" — i dlatego nic nie widzi.',
      },
    },

    // ===== DIFF 2 — ROMANTYCZNOSC — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Jak reaguje lud ("prostota") na zachowanie Karusi?',
      content: {
        options: [
          'Krzyczy: "Mowcie pacierze! Tu jego dusza byc musi"',
          "Wierzy, ze Jasio musi byc przy Karusi, bo ja kochaal za zywota",
          "Wysmiiewa Karusie i przegania ja z miasteczka",
          'Narrator stwierdza: "I ja to slysze, i ja tak wierze"',
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Lud ("prostota") wierzy Karusi: mowi pacierze, wierzy w obecnosc ducha Jasienka. Narrator dolaacza: "I ja to slysze, i ja tak wierze, / Placze i mowie pacierze". Nikt NIE wysmiiewa Karusi — to robi dopiero Starzec.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Polacz pojecia z postaciami "Romantycznosci":',
      content: {
        matchingType: "concepts_to_characters",
        leftColumn: [
          { id: "A", text: '"Czucie i wiara"' },
          { id: "B", text: '"Szkielko i oko"' },
          { id: "C", text: '"Martwe prawdy"' },
          { id: "D", text: '"Prawdy zywe"' },
        ],
        rightColumn: [
          { id: "1", text: "Swiat Starca — rozum, nauka, empiria" },
          { id: "2", text: "Swiat Karusi i ludu — uczucie, wiara, intuicja" },
          { id: "3", text: "Wiedza naukowa — fakty, ale bez duszy" },
          { id: "4", text: "Wiedza ludowa — niedowodliwa, ale gleboka" },
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
          '"Czucie i wiara" = swiat Karusi i ludu (uczucie, wiara). "Szkielko i oko" = swiat Starca (rozum). "Martwe prawdy" = wiedza naukowa (fakty pozbawione duszy). "Prawdy zywe" = wiedza ludowa, intuicyjna (niedowodliwa, ale autentyczna).',
      },
    },

    // ===== DIFF 2 — ROMANTYCZNOSC — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Co Karusia mowi do ducha Jasienka? Zrelacjonuj jej wypowiedz.",
      content: {},
      correctAnswer:
        'Karusia mowi: rozpoznaje Jasienka ("Tyzes to w nocy?"), cieszy sie ("i po smierci kocha!"), prosi o ostroznosc ("pomaleenku, czasem uslyszy macocha"). Potem pamieta, ze umarl ("Juz po twoim pogrzebie!"), boi sie, ale rozpoznaje jego twarz i oczy. Opisuje go: bialy jak chusta, zimne dlonie. Prosi o pocałunek. Mowi o grobie ("jak tam zimno musi byc"). Prosi, by ja zabral: "Wez mnie, ja umre przy tobie, nie lubie swiata". Skarzy sie na ludzi: "Placze, a oni szydza; Mowie, nikt nie rozumie; Widze, oni nie widza". Gdy duch znika o swicie (kur, zorza), krzyczy: "Ja nieszczesliwa!"',
      metadata: {
        explanation:
          'Wypowiedz Karusi to centralny monolog ballady — pokazuje swiat widziany "oczyma duszy". Karusia doswiadcza milosci silniejszej niz smierc, niedostepnej dla rozumu Starca.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Dlaczego rok 1822 — rok wydania "Ballad i romansow" — uznaje sie za poczatek polskiego romantyzmu?',
      content: {},
      correctAnswer:
        'Tom "Ballady i romanse" Mickiewicza (1822) to pierwszy polski zbior poezji wyraznie zrywajacy z poetyka oswiecenia. Zerwanie dotyczy: 1) Tematyki — ludowosc, swiat duchow, fantastyka zamiast mitologii antycznej. 2) Epistemologii — uczucie i wiara wazniejsze od rozumu ("Romantycznosc" jako manifest). 3) Formy — ballada jako gatunek ludowy, narracja gminnego spiewu. 4) Bohatera — prosty lud (Karusia, zbojcy, chlopcy) zamiast szlachty i arystokracji. "Romantycznosc" z mottem z Szekspira i polemika Starzec vs. narrator to programowy spor oswiecenia z romantyzmem.',
      metadata: {
        explanation:
          '1822 rok to symboliczna data poczatku polskiego romantyzmu. Na mature wazne: "Ballady i romanse" to manifest — nie tylko zbior wierszy, ale deklaracja nowej poetyki.',
      },
    },

    // ===== DIFF 3 — ROMANTYCZNOSC — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Co oznacza przeciwstawienie "martwych prawd" i "prawd zywych" w finale "Romantycznosci"?',
      content: {
        options: [
          '"Martwe prawdy" to klaamstwa, a "zywe prawdy" to fakty naukowe',
          '"Martwe prawdy" to wiedza naukowa (poprawna, ale pozbawiona duszy i tajemnicy), a "prawdy zywe" to doswiadczenia uczuciowe, duchowe, intuicyjne — niewyrazalne jezykiem nauki, ale autentyczne i glebsze',
          '"Martwe prawdy" to przesady, a "zywe prawdy" to filozofia',
          "Oba pojecia oznaczaja to samo — Mickiewicz nie rozroznia ich",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Narrator mowi do Starca: "Martwe znasz prawdy, nieznane dla ludu, / Widzisz swiat w proszku, w kazdej gwiazd iskierce; / Nie znasz prawd zywych, nie obaczysz cudu!" Nauka ("proszek", "iskierka") analizuje swiat na czesci, ale nie widzi calosci — ducha, tajemnicy, milosci. "Prawdy zywe" to te, ktore mozna poznac tylko sercem.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Jaka role pelni pora dnia (dzien/noc) w "Romantycznosci"?',
      content: {
        options: [
          "Akcja toczy sie noca, co buduje atmosfere grozy",
          'Akcja toczy sie w bialy dzien ("To dzien bialy! to miasteczko!") — co poteguje absurd i paradoks: duch zjawia sie nie w ciemnosci, ale w swiatllle dnia, wsrod ludzi; Starzec nie moze powiedziec, ze to "nocne majaki"',
          "Pora dnia nie ma znaczenia dla utworu",
          "Zmienia sie z nocy na dzien w trakcie ballady",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Dzien ("To dzien bialy!") jest kluczowy: gdyby akcja dziala sie noca, Starzec moglby powiedziec, ze Karusia spi lub marzy. Ale duch zjawia sie w dzien, posrod miasteczka — co czyni go "realniejszym" i trudniejszym do wyjasnnienia racjonalnie. Jednoczesnie Karusia mowi o nocy ("Tyzes to w nocy?") — duch przychodzil wczescniej noca, a teraz i za dnia.',
      },
    },

    // ===== DIFF 3 — ROMANTYCZNOSC — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Ktore cechy "Romantycznosci" czynia ja manifestem romantyzmu?',
      content: {
        options: [
          "Programowe przeciwstawienie czucia/wiary (romantyzm) rozumowi/nauce (oswiecenie)",
          "Bohaterka z ludu (prosta dziewczyna) jako postac pozytywna — wyzssza od uczonego Starca",
          "Motyw milosci silniejszej niz smierc — uczucie jako sila metafizyczna",
          "Forma ballady — gatunek ludowy, z elementami fantastyki i grozy",
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          'Wszystkie cztery opcje to cechy manifestu: 1) polemika romantyzm vs. oswiecenie, 2) rehabilitacja ludu, 3) milosc metafizyczna, 4) ballada jako forma. Na maturze kluczowe: "Romantycznosc" to nie tylko wiersz — to deklaracja nowej epistemologii (sposobu poznawania swiata).',
      },
    },

    // ===== DIFF 3 — ROMANTYCZNOSC — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Wyjasnij spor miedzy swiatem ducha a swiatem rozumu w "Romantycznosci". Jakie sa argumenty obu stron?',
      content: {
        instruction: "Odwolaj sie do postaw Starca, Karusi i narratora.",
      },
      correctAnswer:
        'Swiat rozumu (Starzec): poznanie przez zmysly i narzedzia ("szkielko i oko"). Duchy to "twor karczemnej gawiedzi". Co niewidoczne — nie istnieje. Starzec jest autorytetem (stary, uczony), ale ograniczonym — widzi "swiat w proszku", ale nie widzi calosci. Swiat ducha (Karusia + lud + narrator): poznanie przez czucie, wiare, intuicje. Karusia widzi Jasienka — rozum tego nie tlumaczy, ale uczucie jest autentyczne. Lud wierzy: "Mowcie pacierze!". Narrator staje po stronie uczucia: "Czucie i wiara silniej mowi do mnie". Jego argument: nauka zna "martwe prawdy" (fakty), ale nie zna "prawd zywych" (doswiadczen duchowych). Konkluzja: "Miej serce i patrzaj w serce!" — serce to narzedzie poznania wazniejsze niz rozum.',
      metadata: {
        explanation:
          '"Swiat ducha a swiat rozumu" to pytanie jawne nr 19 na mature 2026-2028. Klucz: Mickiewicz nie odrzuca calkowicie rozumu — mowi "skromnie" — ale stawia uczucie wyzej.',
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          '"Romantycznosc" jako manifest epoki — jak Mickiewicz definiuje nowa poetyke i nowy sposob poznawania swiata?',
        requirements: [
          "Opisz spor Starca i narratora (rozum vs. czucie)",
          'Wyjasnij role Karusi i ludu ("prostoty")',
          "Wskazz, dlaczego motto z Szekspira jest wazne",
          "Odwolaj sie do pytania maturalnego: swiat ducha a swiat rozumu",
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: "Romantycznosc" to manifest nowej epoki. Starzec = oswiecenie: rozum, nauka, "szkielko i oko", duchy to "twor gawiedzi". Narrator = romantyzm: "Czucie i wiara silniej mowi do mnie", "Miej serce i patrzaj w serce!". Karusia = bohaterka z ludu, ktora widzi ducha Jasienka oczyma duszy — jej doswiadczenie jest nieweryfikowalne naukowo, ale autentyczne. Lud wierzy jej ("Mowcie pacierze!"). Motto z "Hamleta" ("Widze... Przed oczyma duszy mojej") zapowiada temat: widzenie wewnetrzne, niedostepne dla zmyslow. Nowa epistemologia: nauka zna "martwe prawdy" (fakty), ale nie "prawdy zywe" (milosc, wiara, tajemnica). Serce jest narzedziem poznania wyzszym od rozumu.',
      metadata: {
        explanation:
          '"Romantycznosc" jako manifest = centralny temat maturalny. Klucz: nie chodzi o odrzucenie rozumu, ale o rozszerzenie sposobu poznawania — o dodanie uczucia i wiary do arsenalu epistemologicznego.',
      },
    },

    // =================== POZOSTALE BALLADY (30 pytan) ===================

    // ===== DIFF 1 — INNE BALLADY — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'W balladzie "Switezianka" — kim okazuje sie tajemnicza dziewczyna, ktora spotyka strzelec nad jeziorem?',
      content: {
        options: [
          "Coorka Tuhana",
          "Switezianka — duch/nimfa wodna z jeziora Switez",
          "Krolowa elffow",
          "Dusza zmarłej zakonnicy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tajemnicza dziewczyna spod lasku to Switezianka — istota nadprzyrodzona zwiazana z jeziorem Switez. Testuje wiernosc strzelca: kazze mu przysiac staloosc, a potem kusi go pod postacia innej pieknosci wyplywajaacej z wody.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Co sie dzieje ze strzelcem w "Switeeziance", gdy lamie przysięge?',
      content: {
        options: [
          "Zostaje zamieniony w drzewo",
          "Otchlan podwodna pochllania go razem z dziewica — ginie w jeziorze",
          "Wraca bezpiecznie do domu",
          "Zostaje ocalony przez kapłana",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Strzelec zlamaal przysięge — dal sie skusic pięknosci z jeziora, zapominajac o swojej dziewczynie. Switezianka ogłasza wyrok: "biada jemu, za zycia biada! I biada jego zlej duszy!" Woda burzy sie i wzdyma, otchlan podwodna pochllania oboje.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'W balladzie "Powrot taty" — co ocalilo kupca i jego dzieci przed zbojcami?',
      content: {
        options: [
          "Pieniadze, ktorymi kupiec przekupil zbojcow",
          "Modlitwa dzieci — starszy zbojca slyszal, jak sie modla, i wzruszony zwolnil rodzine",
          "Przejazd wojska droga",
          "Ucieczka przez las",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Dzieci modlily sie pod slupem z obrazem: litanie, Ojcze nasz, Zdrowas. Starszy zbojca slyszal te modlitwy w krzakach: "Slucham, ojczyste przyszly na mysl strony, / Bulawa upadla z reki: / Ach! ja mam zone, i u mojej zony / Jest synek taki malenki". Puscil kupca i prosil dzieci, by zmowily paciorek za jego dusze.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'W "Switezi" — skad wzięlo sie jezioro Switez wedlug legendy?',
      content: {
        options: [
          "Z potopuu biblijnego",
          "Na miejscu jeziora stalo kiedys miasto Switez — Bog zatonil je razem z mieszkankami, by ocalic je od zhanbienia przez wrogów",
          "Jezioro powstalo z łez Maryli",
          "Diabel wykopaal je noca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wedlug legendy na miejscu jeziora stalo miasto Switez, rzadzone przez Tuhanow. Gdy mezczyzni odeszli na wojne, kobiety i dzieci wolaly raczej smierc niz hanbę z rak Rusi. Modlily sie do Boga — i ziemia usalaa sie pod nimi, tworzac jezioro. Kobiety zamienily sie w rosliny wodne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Jak Twardowski w balladzie "Pani Twardowska" pokonaal diabla Mefistofelesa?',
      content: {
        options: [
          "Zabiil go srebrna szpada",
          "Zadal mu trzy trudne zadania, w tym kapiel w wodzie swieconej, a na koncu zagrozil, ze diabeł musi zyc z zona Twardowska przez rok — diabel uciekl",
          "Pokonaal go w grze w karty",
          "Zmusil go do pracy na roli",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Twardowski mial prawo zadac trzy zadania: 1) konn z malowanego godla (diabel dal rade), 2) kapiel w wodzie swieconej (diabel przetrzymal), 3) zycie z zona Twardowska przez rok. Diabel na sam widok Twardowskiej "czmychnaawszy dziurka od klucza, dotad jak czmycha, tak czmycha".',
      },
    },

    // ===== DIFF 1 — INNE BALLADY — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Polacz ballady z ich glownymi tematami:",
      content: {
        matchingType: "ballads_to_themes",
        leftColumn: [
          { id: "A", text: '"Switezianka"' },
          { id: "B", text: '"Powrot taty"' },
          { id: "C", text: '"Lilije"' },
          { id: "D", text: '"Pani Twardowska"' },
        ],
        rightColumn: [
          { id: "1", text: "Wina i kara za mordeerstwo meza — upioor wraca" },
          { id: "2", text: "Kara za zlamanie przysiegi wiernosci" },
          { id: "3", text: "Komiczny pojedynek z diablem" },
          { id: "4", text: "Moc modlitwy dzieci ratuje ojca od zbojcow" },
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
          '"Switezianka" = kara za wiarolomstwo. "Powrot taty" = modlitwa ocalila. "Lilije" = zona zabila meza, upioor wraca po pomste. "Pani Twardowska" = komedia z diablem.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Ktore elementy sa wspolne dla wielu ballad z tomu "Ballady i romanse"?',
      content: {
        options: [
          "Motywy ludowe — duchy, upioory, zjawiska nadprzyrodzone",
          "Akcja przy jeziorach, w lasach, na cmentarzach — tajemnicza przyroda",
          "Motyw winy i kary — za zdrade, niewiernosc, zbrodnie",
          "Narracja naukowa, pozbawiona emocji",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Ballady Mickiewicza lacza: ludowosc (duchy, upioory, legendy), tajemnicza przyroda (jeziora, lasy, noc, ksiezyc), motyw sprawiedliwosci nadprzyrodzonej (wina i kara). Narracja NIE jest naukowa — jest emocjonalna, czesto stylizowana na "spiew gminny".',
      },
    },

    // ===== DIFF 1 — INNE BALLADY — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Wymien co najmniej piec ballad z tomu "Ballady i romanse" Mickiewicza.',
      content: {},
      correctAnswer:
        '1) "Romantycznosc" — manifest: czucie vs. rozum, Karusia i duch Jasienka. 2) "Switezianka" — strzelec lamie przysięge wiernosci i ginie w jeziorze. 3) "Switez" — legenda o zatopionym miescie i kobietach zamienionych w rosliny. 4) "Lilije" — zona zabija meza, ten wraca jako upioor. 5) "Powrot taty" — modlitwa dzieci ocalila kupca od zbojcow. 6) "Pani Twardowska" — Twardowski przechytrza diabla zona. 7) "Rybka" — zdradzona Krysia skacze do wody i zamienia sie w rybke. 8) "Dudarz" — stary grajek opowiada o umarllym pasterzu. 9) "Kurhanek Maryli" — lament nad grobem Maryli. 10) "Rekawiczka" (z Schillera) — rycerz rzuca rekawiczke w twarz damie.',
      metadata: {
        explanation:
          'Tom "Ballady i romanse" zawiera kilkanascie utworow. Na maturze najczesciej pytaja o: Romantycznosc, Switezianka, Switez, Lilije, Powrot taty, Pani Twardowska.',
      },
    },

    // ===== DIFF 2 — INNE BALLADY — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'W balladzie "Rybka" — co stalo sie z Krysia po skoku do wody?',
      content: {
        options: [
          "Utonela na zawsze",
          "Zamienila sie w rybke — co wieczor wyplywa, by karmic pierssia swoje dzieciatko; ma ludzka glow, wlosy i piersi, ale rybii ogon",
          "Zostala uratowana przez rybakow",
          "Stal sie z niej duch strzegacy jeziora",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Krysia — zdradzona przez pana, ktory poslav ja księżne — skoczyla do rzeki. Zamienila sie w rybke-Switeziankee: "Rybia luuske odwinie, / Spojrzy dziewicy oczyma; / Z glowy jasny wlos wyplynie". Co wieczor karmila pierssia dzieciatko.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'W "Lilijach" — jaki wyrok wydaje na zone pustelnik?',
      content: {
        options: [
          "Nakazzuje jej modlic sie przez rok",
          'Mowi, ze jej tajemnica jest bezpieczna, bo "co ty zrobisz skrycie, maz tylko wydac moze, a maz twoj stracil zycie" — i każe jej nie bac sie upioora',
          "Skazuje ja na smierc",
          "Odsyła ja do klasztoru",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Pustelnik ogłasza: "Takie sady Boze, / Iz co ty zrobisz skrycie, / Maz tylko wydac moze, / A maz twoj stracil zycie". Pani uspokaja sie — ale nie zyje z tego spokojem, bo w nocy upioor stuka do drzwi. Gdy chce wyjsc za maz po raz drugi, pustelnik radzi "losowac" meża kwiatami — ale meżznna-upioor wraca po ja.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'W "Kuurhanku Maryli" — kto placzze nad grobem Maryli?',
      content: {
        options: [
          "Tylko matka",
          "Trojka bliskkikh: kochanek (chce isc na wojne i zginac), matka (samotna, dom pusty) i przyjaciolka (nie ma komu powierzyc tajemnic)",
          "Meżz i syn Maryli",
          "Cala wioska",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Nad kurhankiiem (mogilka) Maryli placzza: kochanek Janek (chce "przystac do Moskali, zeby mnie wrazz zabili"), matka ("W domu bylo jak w niebie" — teraz pustka), przyjaciolka ("Ktoz mi zwierzy sie szczerze"). Cudzy czlowiek slucha, placzze i odplywa wicina.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'W "Rekawiczce" (z Schillera) — co robi rycerz Emrod, gdy podnosi rekawiczke Marty z areny z dzikimi zwierzetami?',
      content: {
        options: [
          "Kleka przed Marta i prosi ja o reke",
          'Rzuca jej rekawiczke w oczy i odchodzi na zawsze: "Pani, twych dziekow nie trzeba mi wcale"',
          "Daje rekawiczke krolowi",
          "Czyści ja i oddaje z uklonem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Emrod przeskakuje zapory, bierze rekawiczke posrod lwow, tygrysow i lampartow. Ale wraca i "w oczy rekawiczke rzucil" — odrzucajac Marte, ktora narrazila jego zycie dla kaprysu. Moraal: prawdziwa milosc nie poddaje sie proobie okrucienstwa.',
      },
    },

    // ===== DIFF 2 — INNE BALLADY — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        "Ktore ballady Mickiewicza zawieraja motyw kary za zdrade lub wiarolomstwo?",
      content: {
        options: [
          '"Switezianka" — strzelec ginie za zlamanie przysiegi',
          '"Lilije" — zona-morderczyni ukarana przez upioora-meza',
          '"Rybka" — pan-zdrajca zamiieniony w glaz',
          '"Powrot taty" — zbojca karze kupca za chciwosc',
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Switezianka" (kara za wiarolomstwo), "Lilije" (kara za morderstwo meza), "Rybka" (pan z zona zamienieni w glazy) — to motyw ludowej sprawiedliwosci. "Powrot taty" NIE zawiera kary — zbojca puszcza kupca z litosci, nie karze go.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Uzupelnij zdania, wybierajac poprawne opcje:",
      content: {
        textWithGaps:
          'W "Switeziankce" strzelec spotyka tajemnicza dziewczyne nad (1). Sklada jej (2). Potem daje sie skusic postaci wyplywajaacej z wody, co jest (3).',
        gaps: [
          {
            id: 1,
            options: [
              "rzeeka Niemnem",
              "brzegami sinej Switezi",
              "morzem Baltyckim",
              "stawem w lesie",
            ],
          },
          {
            id: 2,
            options: [
              "dar ze zlota",
              "przysięge wiernosci — klekajac i wzywajac piekielne potegi",
              "list milosny",
              "wieniec z kwiatow",
            ],
          },
          {
            id: 3,
            options: [
              "dowodem jego odwagi",
              "zlamaniem przysiegi — bo zapominal o dziewczynie spod lasku",
              "testem inteligencji",
              "snem",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Strzelec spotyka dziewczyne nad Switeziiaa, sklada jej przysięge (kleka, chwyta piasek, wzywaa piekielne potegi), a potem lamiie ja — biegac za pięknoscia z jeziora. To zlamanie prowadzi do kary smierci.",
      },
    },

    // ===== DIFF 2 — INNE BALLADY — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Opisz krotko fabule ballady "Lilije".',
      content: {},
      correctAnswer:
        'Pani zabija meza (ktory wrocil z wojny krola Boleslawa). Grzebie go w gaju, nad ruczajem, i zasiewa na grobie lilie. Idzie do pustelnnika — ten mowi, ze tajemnica jest bezpieczna, bo "maz tylko wydac moze, a maz twoj stracil zycie". Ale upioor-maz przychodzi noca i stuka. Gdy bracia meza chca ja poślubic, pustelnik radzi losowanie kwiatami. Bracia rwaa kwiaty — jeden z nich rwie lilie z grobu meza. Na slubie w kosciele zjawia sie upioor: "Moj wieniec i ty moja!" Porrywa zone i braci, cerkiew zapada pod ziemie, a na jej miejscu rosna lilie.',
      metadata: {
        explanation:
          '"Lilije" to ballada o ludowej sprawiedliwosci: zbrodnia nie pozostaje bezkarna, nawet jesli pustelnik mowi, ze tajemnica jest bezpieczna. Sily nadprzyrodzone wymierzaja kare. Na maturze: motyw winy i kary.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        "Jaka role pelni przyroda w balladach Mickiewicza? Podaj przyklady z co najmniej dwoch ballad.",
      content: {},
      correctAnswer:
        'Przyroda u Mickiewicza NIE jest tlem — jest aktywna sila, wspolgraa z akcja: 1) "Switezianka": jezioro Switez jest domem nimfy, "burzy sie, wzdyma i wre az do dna" gdy strzelec zlamie przysięge — woda go pochllania. 2) "Switez": jezioro kryje zatopione miasto, kwiaty wodne to dusze kobiet — kto je zerwie, ginie. 3) "Switezianka": las, ksiezyc, wiatr towarzysza spotkaniom; "wiatr zaszumial po gestym lesie, woda sie burzy i wzdyma" — przyroda reaguje na emocje. 4) "Rybka": rzeka przyjmuje Krysie, zamienia ja w istotee wodna. Przyroda jest przestrzenia tajemnicy, sprawiedliwosci i przemiany.',
      metadata: {
        explanation:
          '"Jakie znaczenie dla czlowieka ma przyroda?" to jedno z mozliwych pytan maturalnych dotyczacych ballad Mickiewicza. Klucz: przyroda = sila moralna (karze winnych, chroni niewinnych).',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        "Co oznacza postac Maryli w tworczosci Mickiewicza? Gdzie sie pojawia?",
      content: {},
      correctAnswer:
        'Maryla to postac inspirowana prawdziwa kobieta — Maryla Wereszczakowna, mlodzenncza milosc Mickiewicza (zareczona z innym, potem zamelzdzona). Pojawia sie w wielu utworach: 1) "Pierwiosnek" — kwiatek mowi: "Powiedz, niebieska Marylko!" i zyska "pierwsza lze". 2) "To lubie" — Mickiewicz straszzyl Maryle ballada na dobranoc w Rucie. 3) "Do przyjaciol" — "Chce cos pisac o strachach i o Maryli". 4) "Kurhanek Maryli" — lament trojga bliskkiich nad grobem Maryli. 5) "Dudarz" — pasterz umierajacy z milosci, z galaazka i piosnka. Maryla = symbol niespeelniionej milosci romantycznej.',
      metadata: {
        explanation:
          'Maryla Wereszczakowna (1799-1863) to kluczowa postac w zyciu i tworczosci mlodego Mickiewicza. Wielu badaczy uwaza, ze milosc do niej jest zrodlem emocjonalnosci calych "Ballad i romansow".',
      },
    },

    // ===== DIFF 3 — INNE BALLADY — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Na czym polega ludowa sprawiedliwosc w balladach Mickiewicza?",
      content: {
        options: [
          "Na karze wymierzaanej przez sąd",
          "Na sprawiedliwosci nadprzyrodzonej — sily natury, duchy lub Bog karza winnych (wiarolomcow, morderrzow, zdrajcow), nawet jesli unikneeli kary ludzkiej; nikt nie uniknie odpowiedzialnosci",
          "Na zemsscie rodziny za honor",
          "Na lasce krola dla poddanych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Na czym polega ludowa sprawiedliwosc?" — pytanie jawne nr 20 na mature 2026-2028. Przyklady: Switezianka (kara za przysięge), Lilije (upioor karze zone-morderczynnie), Rybka (zdrajca zamieniony w kamien), Switez (kwiaty zabijaja najeezdzcow). Ludowa sprawiedliwosc = moralna koniecznosc kosmiczna.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        "Jaka funkcje pelnia motywy fantastyczne i grozy w balladach Mickiewicza?",
      content: {
        options: [
          "Sluza wylacznie rozrywce i straszzeniu czytelnika",
          "Sa narzedziem poznania: pokazuja, ze istnieje rzeczywistosc niedostepna rozumowi; jednoczesnie sluzza wymierzaniu sprawiedliwosci moralnej i podkreslaja ludowa wierze w kontakt ze swiatem zmarlych",
          "Sa bledem artystycznym — Mickiewicz powinien byl ich unikac",
          "Sa wyłącznie parodia wierzen ludowych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fantastyka ballad Mickiewicza pelni potrajna funkcje: 1) epistemologiczna — swiat duchow dowodzi, ze rozum nie jest jedynym narzedziem poznania; 2) moralna — sily nadprzyrodzone wymierzaja sprawiedliwosc; 3) kulturowa — rehabilitacja wierzen ludowych jako zrodla madrosci.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Jakie cechy gatunku ballady sa widoczne w "Balladach i romansach" Mickiewicza?',
      content: {
        options: [
          "Forma epiki — dlugie, prozatorskie opisy psychologiczne",
          "Polas enie epiki (narracja, faabula), liryki (uczucia, nastrooj) i dramatu (dialogi, napieecie) — fabuła czerpie z legend ludowych, narracja stylizowana na spiew gminny, atmosfera tajemnicy i grozy",
          "Forma dramatu — pisane wylacznie jako sztuki teatralne",
          "Forma naukowa — opis zjawisk przyrodniczych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ballada to gatunek synkretyczny: epika (fabula — opowiesc, wydarzenie), liryka (uczucia — nastroj tajemnicy, groza, tesknota), dramat (dialog — rozmowy postaci). Zrodlo: legendy ludowe, gminny spiew. Narracja jest subiektywna, emocjonalna, czesto z narratorem zaangazowanym.",
      },
    },

    // ===== DIFF 3 — INNE BALLADY — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        "Ktore stwierdzenia o ludowosci w balladach Mickiewicza sa prawdziwe?",
      content: {
        options: [
          "Ballady czerpane sa z legend, wierzen i piesni ludu litewsko-bialoruskiego",
          'Lud jest depozytariuszem prawdy moralnej — wierzy gleboko, "prostota" ma racje',
          'Mickiewicz uzywa stylizacji na spiew gminny ("ze spiewu gminnego", "mysl z piesni litewskiej")',
          "Ludowosc sluzy wylacznie egzotyce — Mickiewicz nie traktuje ludu powaznie",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Ludowosc u Mickiewicza to nie egzotyka, lecz program: lud zna "prawdy zywe" (Romantycznosc), wierzy w duchy, przestrzega moralnosci. Ballady czerpane z legend litewskich (Switez, Switezianka), z piesni gminnych (Lilije, Rybka). Lud = depozytariusz prawdy vs. uczony = ograniczony rozumem.',
      },
    },

    // ===== DIFF 3 — INNE BALLADY — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Porownaj motyw winy i kary w "Switeziancee" i "Lilijach". Co laczy te dwie ballady?',
      content: {},
      correctAnswer:
        'Lacza je: 1) Zbrodnia moralna — w "Switeziancee" strzelec lamie przysięge wiernosci, w "Lilijach" zona zabija meza. 2) Kara nadprzyrodzona — strzelca pochllania jezioro, zone zabiera upioor-maz ("Moj wieniec i ty moja!"). 3) Nieuchroonnosc kary — strzelec nie moze cofnac przysięgi, zona nie moze ukryc zbrodni (choc pustelnik mowi, ze moze). 4) Kara zbiorowa — w "Lilijach" gina tez bracia meza (rwali kwiaty z grobu). 5) Rola natury — jezioro i lilie sa narzedziem kary. Roznice: w "Switeziancee" kara jest natychmiastowa (jedna noc), w "Lilijach" — odroczzona (lata). W "Switeziancee" strzelec jest naiwny, w "Lilijach" zona jest swiadoma zbrodniarka.',
      metadata: {
        explanation:
          '"Motyw winy i kary" to jedno z mozliwych pytan maturalnych. Klucz: w swiecie ballad Mickiewicza nie ma zbrodni bezkarnej — nawet jesli ludzki wymiar sprawiedliwosci zawiedzie, sily nadprzyrodzone wymierzaja kare.',
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          "Ludowa sprawiedliwosc w balladach Mickiewicza — jak sily nadprzyrodzone wymierzaja kare?",
        requirements: [
          "Podaj przyklady z co najmniej trzech ballad (Switezianka, Lilije, Rybka lub Switez)",
          "Wyjasnij, dlaczego kara jest zawsze nieuchronna",
          "Polacz z ludowa wierze w porzadek moralny swiata",
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Przyklady: 1) "Switezianka" — strzelec lamie przysięge, jezioro go pochllania; Switezianka ogłasza wyrok: "biada jemu, za zycia biada!". 2) "Lilije" — zona zabija meza, ale upioor wraca w dzien slubu i zabiera ja razem z bracmi pod ziemie. 3) "Rybka" — pan zdradza Krysie, pozniej z zona idzie nad rzekee — oboje zamienieni w glazy. 4) "Switez" — najeezdcy rwaa kwiaty-dusze — kto tknie, ten ginie. Nieuchoonnosc kary: pustelnik w "Lilijach" mowi, ze tajemnica jest bezpieczna — ale myli sie. Sily nadprzyrodzone (duchy, jeziora, rosliny) wymierzaja kare, ktorej czlowiek uniknac nie moze. Ludowe przekonanie: swiat ma porzadek moralny, zlo zawsze zostanie ukarane — nawet jesli nie przez ludzi.',
      metadata: {
        explanation:
          '"Na czym polega ludowa sprawiedliwosc?" — pytanie jawne nr 20 na mature 2026-2028. Klucz: sprawiedliwosc ludowa = kosmiczna, nieuchronna, wymierzana przez sily nadprzyrodzone.',
      },
    },

    // ===== DODATKOWE PYTANIA (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'W "Pierwiosnku" — z kim rozmawia podmiot liryczny i o czym jest mowa na koncu wiersza?',
      content: {
        options: [
          "Z drzewem o przejsciu zimy",
          'Z kwiatkiem-pierwiosnkiem — kwiatek chwali sie, ze bedzie wiankiem "nad wianki", a na koncu podmiot pyta, czy kochanka (Marylka) go przyjmie; kwiatek odpowiada, ze zyska "pierwsza... ach! lze tylko"',
          "Z ptakiem o wiosnie",
          "Z matka o dziecinstwie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Pierwiosnek" to wiersz-dialog z kwiatkiem, ktory symbolizuje wczesna, krucha milosc. Kwiatek mowi: "Powiedz, niebieska Marylko! / Za pierwszy mlodosci paczek / Zyskam pierwsza... ach! lze tylko". Lza = odpowiedz Maryli na uczucie poety. Pierwiosnek = milosc mloda, piekna, ale skazana na smutek.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'W "Do przyjaciol" — co Mickiewicz mowi o okolicznosccach pisania ballady "To lubie"?',
      content: {
        options: [
          "Pisal ja w sloneczny dzien, w ogrodzie",
          'Pisal ja o polnocy, sam, w klasztorze, przy gasnaacej swiecy — wspominajac Maryle i chcac napisac cos "o strachach i o Maryli"',
          "Pisal ja na zamowienie wydawcy",
          "Pisal ja wspolnie z przyjaciolmi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Do przyjaciol" to wstep do ballady "To lubie". Mickiewicz pisze: polnoc, cisza, swiieca dogasa, "Straszno!". Wspomina Maryle: "W Rucie, pod polnocna chwile" straszzyl ja ballada na dobranoc. "Chce cos pisac o strachach i o Maryli" — laczy milosc z fantastyka.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'W balladzie "To lubie" — kto jest dusza czysc owa i dlaczego zostala skazana na meki?',
      content: {},
      correctAnswer:
        'Dusza czysc owa to Maryla (postac z ballady, nie historyczna). Za zycia gardzila zalotnikami — "z licznym klaniajacym sie tlumem, tlumem gardzilam bez braku". Szczegolnie okrutna byla wobec Josia — mlodego, cnotliwego, niesmialego kochanka, ktory "umarl z milosci". Kara: dusza Maryli musi strraszyc podroznych w nocnych chwilach. Warunek uwolnienia: jakis mezczyzna musi powiedziec do niej "lubie". Nikt nie mowi — bo wszyscy przeklinaja strachy. Dopiero narrator, gdy woz mu sie zepsuul, mowi: "To lubie" — i dusza zostaje uwolniona. Moraal: okrucienstwo wobec kochanka jest grzechem karanym nawet po smierci.',
      metadata: {
        explanation:
          '"To lubie" laczy motyw winy i kary z humorem i gra z imieniem Maryli. Dusza-Maryla musi prosic o slowo "lubie" — bo za zycia nigdy go nie powiedziala.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Komu dedykowana jest ballada "Switez"?',
      content: {
        options: [
          "Maryli Wereszczaakownie",
          "Michalowi Wereszczace",
          "Jozefowi Jeżowskiemu",
          "Tomaszowi Zanowi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Switez" jest dedykowana "Do Michala Wereszczaki" — brata Maryli Wereszczaakowny, przyjaciela Mickiewicza z okresu wilensko-kowienskiego. Wereszczakowie byli wlascicielami majatku w Pluzzynach, nad samym jeziorem Switez.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Ktore cechy romantyzmu sa widoczne w balladzie "Dudarz"?',
      content: {
        options: [
          "Motyw wedrownego artysty (dudarz-slepiec) — sztuka jako wyraz uczucia, nie rozumu",
          "Tajemnica niespelnionej milosci — pasterz umarl z milosci, zostawil piosnke i listek",
          'Motyw nieokresloonnoosci — "Kto jest dziewczyna? ja nie wiem" — tajemnica niedopowiedziana',
          "Narracja oparta wylacznie na faktach i dokumentach",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Dudarz" laczy cechy romantyzmu: wedrowny artysta (lirnik = poeta), milosc aż do smierci, tajemniczosc ("ja nie wiem"), smutek, piosnka jako wyraz duszy. Narracja NIE jest dokumentarna — jest subiektywna i emocjonalna.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: 'Krotko opowiedz fabule "Pani Twardowskiej".',
      content: {
        hints: ["Twardowski", "diabel", "karczma Rzym", "trzy zadania", "zona"],
      },
      correctAnswer:
        'Twardowski pil w karczmie, gdy zjawil sie diabel Mefistofeles — przypominajac o cyrografie: Twardowski mial jechac do Rzymu, a karczma nazywa sie "Rzym". Twardowski mial prawo zadac trzy zadania: 1) Konn z godla karczmy — diabel dal rade. 2) Kapiel w wodzie swieconej — diabel wytrzymal. 3) Zycie z zona Twardowska przez rok — diabel na sam widok Twardowskiej uciekl "dziuurka od klucza" i "dotad jak czmycha, tak czmycha". Moraal: zon gorsze niz diabeł (humorystycznie).',
      metadata: {
        explanation:
          '"Pani Twardowska" to jedyna komiczna ballada w tomie. Mickiewicz stylizuje ja na gminny spiew karczemny. Humor opiera sie na wyobraazeniu zony-potworaa, ktora przerazaa samego diabla.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question:
        'Jak rozumiec zakonczenie "Switezianki": "Ktoryz jest mlodzieniec? Strzelcem byl w borze. A kto dziewczyna? Ja nie wiem"?',
      content: {
        options: [
          "Narrator zapominal imiona bohaterow",
          'Ramowa kompozycja zamyka ballade: te same slowa co na poczatku, ale teraz bohaterowie sa cieniami; "Ja nie wiem" to wyraz romantycznej tajemnicy — nie wszystko mozna poznac rozumem; swiat duchow pozostaje zagadka',
          "Narrator klamie — wie, kim jest dziewczyna",
          "To blad w rekopisie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Zakonczenie powtarza poczaatek (kompozycja ramowa): "Jakiz to chlopiec piekny i mlody?" i "Kto jest dziewczyna? ja nie wiem". Ale teraz sa duchami: "Snuje sie para znikomych cieni". "Ja nie wiem" = romantyczne niedopowiedzenie — tajemnica swiata duchow nie daje sie zamknac w racjonalnym wytlumaczeniu.',
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Ballady i romanse",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          "Motyw milosci w balladach Mickiewicza — jak milosc laczy swiat zywych ze swiatem umarlych?",
        requirements: [
          "Podaj przyklady z Romantycznosci (Karusia-Jasienek), Switezianki (strzelec), Rybki (Krysia) i Kuurhanka Maryli",
          "Wyjasnij, dlaczego milosc jest silniejsza niz smierc",
          "Polacz z romantycznym ideaalem uczucia",
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Przyklady: 1) Romantycznosc — Karusia widzi ducha Jasienka dwa lata po jego smierci; milosc pozwala jej "widziec oczyma duszy". 2) Switezianka — strzelec kocha dziewczyne z lasu tak mocno, ze sklada przysięge; gdy ja lamiie, ginie — ale ich cienie kraza po jeziorze na wieki. 3) Rybka — Krysia po smierci zamienia sie w rybke, by karmic dziecko; macierzynska milosc silniejsza od smierci. 4) Kurhanek Maryli — kochanek nie moze zyc bez Maryli, chce isc na wojne i zginac. Milosc silniejsza niz smierc = centralny motyw romantyzmu: uczucie przekracza granice miedzy swiatem zywych i umarlych. Dla romantyka smierc nie konczy milosci — ona ja oczyszcza i wzmacnia.',
      metadata: {
        explanation:
          "Motyw milosci przekraczajacej smierc laczy wszystkie ballady Mickiewicza. Na maturze: milosc romantyczna = uczucie absolutne, metafizyczne, wyzsze od rozumu i smierci.",
      },
    },

    // ======================= POCZATEK PYTAN TANGO — ZESTAW 1 (60 pytan, diff 1-3) ===================//
    // UWAGA: Polskie cudzyslowy zastapione prostymi "" — bez nich
    // UWAGA: Wylacznie poziomy trudnosci 1-3. Epoka: CONTEMPORARY. Utwór: Tango.

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (10) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Kto jest autorem dramatu "Tango"?',
      content: {
        options: [
          "Witold Gombrowicz",
          "Slawomir Mrozek",
          "Tadeusz Rozewicz",
          "Stanislaw Ignacy Witkiewicz",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Tango" zostalo napisane przez Slawomira Mrozka w 1964 roku. Prapremiera odbyła sie 21 stycznia 1965 roku w Bydgoszczy. Dramat szybko zyskal miedzynarodowa slawe i jest jednym z najczesciej wystawianych polskich dramatow na swiecie.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Ile aktow liczy dramat "Tango"?',
      content: {
        options: ["Dwa", "Trzy", "Cztery", "Piec"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Tango" sklada sie z trzech aktow. Akt I rozgrywa sie za dnia — Artur wraca z uczelni i zastaje balagan. Akt II — w nocy — Artur przygotowuje zamach stanu. Akt III — rano nastepnego dnia — przygotowania do slubu i tragiczne zakonczenie.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Jak ma na imie glowny bohater "Tanga"?',
      content: {
        options: ["Eugeniusz", "Artur", "Stomil", "Edek"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Artur to mlody czlowiek, najwyzej dwudziestopiecioletni, student trzech fakultetow (w tym medycyny i filozofii). Wraca z wykladow na uniwersytecie i zastaje w domu chaos, rozprzezenie i obecnosc podejrzanego Edka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Kim jest Stomil w relacji do Artura?",
      content: {
        options: [
          "Wujem",
          "Ojcem — artystą-eksperymentatorem w wiecznej pizamie",
          "Dziadkiem",
          "Bratem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Stomil jest ojcem Artura i mezem Eleonory. To tegii, duzy mezczyzna z olbrzymia siwa czupryna (tzw. lwia), ciagle w pizamie. Poswiecil zycie sztuce eksperymentalnej i walce ze starymi formami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Kim jest Edek?",
      content: {
        options: [
          "Kolegą Artura z uniwersytetu",
          "Obcym mezczyzna, podejrzanym osobnikiem mieszkajacym w domu Stomilów — kochankiem Eleonory",
          "Bratem Eugeniusza",
          "Lokajeem rodziny od lat",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edek to "w najwyzszym stopniu metny i podejrzany" osobnik: w koszuli w krate, z tlustymi wlosami, kwadratowym wasikieem i zegarkiem w "zlotej" bransolecie. Spi z Eleonora, oszukuje w karty i rządzi sie jak u siebie. Na koncu przejmuje wladze.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Kim jest Eugeniusz?",
      content: {
        options: [
          "Ojcem Artura",
          "Wujem Artura — bratem babci Eugenii, siwy i niedziisiejszy starszy pan",
          "Mezczyzna z sasiedztwa",
          "Profesorem Artura z uczelni",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Eugeniusz to starszy, siwy, nieśmiały pan w zakiecie-jaskólce i sztywnym kolnierzyku. Jest bratem Eugenii. Nosi szorty khaki i lakierki popekane. Sam mowi o sobie: "Jestem niedzisiejszy". Jako jedyny staje po stronie Artura w buncie.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Jak konczy sie dramat "Tango"?',
      content: {
        options: [
          "Artur wygrywa i wprowadza nowy porzadek",
          "Edek zabija Artura uderzeniem kolby rewolweru i przejmuje wladze — tanczy tango z Eugeniuszem",
          "Rodzina godzi sie i zaczyna zyc wedlug zasad",
          "Stomil przeprowadza udany eksperyment teatralny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edek zakrada sie za plecami Artura, uderza go kolba rewolweru w kark, a potem bije jeszcze raz spleccionymi dlonmi. Artur umiera. Edek zaklada jego marynarke, wlacza magnetofon z tangiem "La Cumparsita" i tanczy z Eugeniuszem. Kurtyna opada.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Jakie tango gra na koncu dramatu?",
      content: {
        options: [
          '"Por una Cabeza"',
          '"La Cumparsita"',
          '"El Choclo"',
          '"Libertango"',
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Na koncu rozlega sie tango "La Cumparsita" — "koniecznie to, a nie inne", jak zaznacza Mrożek w didaskaliach. Muzyka gra nawet po spadnieciu kurtyny i zapaleniu swiatel na widowni. To symbol triumfu brutalnej sily nad intelektem i kultura.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Jaki gatunek literacki reprezentuje "Tango"?',
      content: {
        options: [
          "Komedia romantyczna",
          "Dramat groteskowy (tragifarsa, dramat absurdu)",
          "Tragedia antyczna",
          "Musical",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Tango" to dramat groteskowy, laączacy elementy komedii, farsy, tragedii i dramatu absurdu. Mrozek stosuje groteske (wyolbrzymienie, deformacje, absurd) do ukazania kryzysu wartosci i konfliktu miedzy forma a chaosem.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Co studiuje Artur na uniwersytecie?",
      content: {
        options: [
          "Tylko prawo",
          "Trzy fakultety — w tym medycyne i filozofie",
          "Tylko filozofie",
          "Sztuke i muzyke",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Artur uczeszcza na trzy fakultety, w tym medycyne (jego podrecznik anatomii szczegolowej ogladaja Edek i Eugeniusz) i filozofie. Na pytanie Edka, czy filozofia tez ma "cos w tym rodzaju" (ilustracje), Eugeniusz odpowiada: "Filozofia jest bez ilustracji".',
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Ktore postacie naleza do rodziny Artura?",
      content: {
        options: [
          "Stomil — ojciec, artysta-eksperymentator",
          "Eleonora — matka, zona Stomila",
          "Eugenia — babcia, matka Eleonory",
          "Edek — przyjaciel rodziny od dziecinstwa",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Stomil (ojciec), Eleonora (matka) i Eugenia (babcia — "Osoba Na Razie Zwana Babcia") to rodzina Artura. Eugeniusz to brat Eugenii (wuj). Edek NIE jest czlonkiem rodziny — to obcy osobnik, ktory zadomowil sie w mieszkaniu.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Ktore przedmioty znajduja sie w mieszkaniu Stomilów na poczatku dramatu?",
      content: {
        options: [
          "Staroswiecki czarny wozek dziecinny na wysokich kolach",
          "Zakurzona slubna suknia i melonik",
          "Katafalk nakryty czarnym suknem i gromnice",
          "Fortepian koncertowy i zbroja rycerska",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Wozek dziecinny (Artura — sprzed 25 lat!), slubna suknia ciotki, melonik, katafalk dziadka (zmarlego 10 lat temu) — to rekwizyty balagan. Nie ma fortepianu ani zbroi. Balagan symbolizuje rozklad tradycji i norm.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Ktore stwierdzenia o wygladzie Edka sa prawdziwe?",
      content: {
        options: [
          "Koszula w brzydka krate, rozpięta zbyt gleboko na piersiach",
          "Wlosy dlugie i tluste, przeczesywane grzebykiem z tylnej kieszeni",
          "Maly, kwadratowy wasik, nie ogolony",
          "Elegancki garnitur z krawatem i lsniace buty",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Edek to antyteza elegancji: koszula w krate, tlusste wlosy, wasik, zegarek w "zlotej" bransolecie, jasne spodnie, jaskrawozolte buty. To w kontraście z Arturem — czystym, wyprasowanym, w ciemnym garniturze.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Polacz postacie z ich rolami w dramacie:",
      content: {
        matchingType: "characters_to_roles",
        leftColumn: [
          { id: "A", text: "Artur" },
          { id: "B", text: "Stomil" },
          { id: "C", text: "Ala" },
          { id: "D", text: "Eugeniusz" },
        ],
        rightColumn: [
          { id: "1", text: 'Sojusznik Artura, "niedzisiejszy" wuj' },
          { id: "2", text: "Mlody buntownik pragnaacy przywrocic porzadek" },
          { id: "3", text: "Artysta-eksperymentator, ojciec w pizamie" },
          { id: "4", text: "Osiemnastoletnia kuzynka, narzeczona Artura" },
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
          'Artur = buntownik przeciw chaosowi. Stomil = artysta w pizamie. Ala = kuzynka (dorodna osiemnastoletnia), narzeczona. Eugeniusz = wuj, jedyny sojusznik Artura, mowi o sobie "jestem niedzisiejszy".',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Ktore kary wymierza Artur domownikom w akcie I?",
      content: {
        options: [
          "Naklada Eugeniuszowi na glowe klatke na ptaki bez dna",
          "Nakazuje babci Eugenii polozyc sie na katafalku",
          "Zapala gromnice wokol katafalku",
          "Wyrzuca Stomila z domu na stale",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Artur karze Eugeniusza (klatka na glowe: "Siedziec, dopoki nie zwolnie!") i babcie Eugenie (na katafalk: "Niech pomysli chociaz o wiecznosci"). Zapala gromnice. NIE wyrzuca Stomila — tylko krzyczy "Won!" na wszystkich, ale nie wypedza ojca.',
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Opisz krotko wyglad mieszkania Stomilów na poczatku dramatu.",
      content: {
        hints: ["balagan", "draperie", "katafalk", "wozek"],
      },
      correctAnswer:
        "Mieszkanie to duzy pokoj o wysokim suficie. Sprzety ustawione niesymetrycznie, jakby tuz przed albo tuz po przeprowadzce. Panuje balagan. Draperie polleżace, polzwisajace, polzwiniete, nadaja pomieszczeniu wrażenie rozmazania. Na podlodze tworza rodzaj legowiska. Stoi staroswiecki czarny wozek dziecinny, zakurzona slubna suknia, melonik. Katafalk we wnece. Kazdy talerz na stole pochodzi z innego serwisu, z innej epoki. Wrażenie pomylenia, przypadkowosci, niechlujstwa.",
      metadata: {
        explanation:
          "Wyglad mieszkania symbolizuje stan duchowy rodziny: rozklad norm, mieszanina epok, brak porzadku. Wozek (sprzed 25 lat), suknia slubna, katafalk (sprzed 10 lat) — nic nie jest na swoim miejscu, bo nikt nie dba o forme.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Co robi Artur, gdy wraca z uczelni do domu na poczatku sztuki?",
      content: {},
      correctAnswer:
        'Artur wchodzi z prawej strony, niosac pod pacha ksiazki i skrypty (wraca z wykladow). Zatrzymuje sie i obserwuje scene: babcia Eugenia, wuj Eugeniusz i Edek graja w karty przy stole. Artur jest oburzony — przegania Edka ("Won!"), goni babcie wokol stolu, karze ja polozeniem na katafalku, a Eugeniuszowi naklada na glowe klatke. Potem wyrzuca wszystkich za drzwi, chcac "zapanowac nad sytuacja".',
      metadata: {
        explanation:
          "Poczatek dramatu natychmiast ustanawia glowny konflikt: Artur (porzadek, zasady) vs. reszta rodziny (chaos, swoboda). Artur jest jedynym czlowiekiem w domu, ktory chce jakichkolwiek regul.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Kim jest Ala i jaka jest jej rola w dramacie?",
      content: {},
      correctAnswer:
        'Ala to osiemnastoletnia kuzynka Artura, "dorodna" dziewczyna z dlugimi prostymi wlosami. Spi w mieszkaniu Stomilów (przyszla o szostej rano). Jest bezposrednia, prowokacyjna, znudzona. Artur chce ja poślubic jako element planu przywrocenia norm. Ala sie zgadza, ale pragnie od Artura uczuc, nie tylko zasad. Ostatecznie zdradza Artura z Edkiem — co doprowadza go do zalamania.',
      metadata: {
        explanation:
          "Ala to postac kluczowa: reprezentuje emocje, cialo, spontanicznosc — wszystko, czego Artur nie potrafi wlaczyc do swojego racjonalnego planu. Jej zdrada jest katalizatorem tragedii.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Na czym polega eksperyment teatralny Stomila?",
      content: {
        options: [
          "Wystawia tragedie Szekspira z udzialem calej rodziny",
          'Prezentuje pacynkowa scene Adama i Ewy w raju, a potem strzela z rewolweru i spala stopki (gasnie swiatlo) — chce stworzyc "jednosc momentu akcji i percepcji"',
          "Organizuje koncert muzyki wspolczesnej z udzialem orkiestry",
          "Maluje abstrakcyjny obraz na oczach rodziny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Stomil ustawia katafalk jako scene, odgrywa Adama i Ewe pacynkami, a potem strzela z rewolweru i spala stopki (ciemnosc). Nazywa to "dynamika faktu sensualnego" — chce wstrzasnac widownia. Eksperyment konczy sie fiaskiem: Eugeniusz nie rozumie, Edek woli kino.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Dlaczego Artur chce urzadzic slub z Ala?",
      content: {
        options: [
          "Kocha ja namieetnie i chce ja uszczęsliwic",
          "Potrzebuje slubu jako narzedzia przywrocenia norm — oslzak weselny, ceremonial, organy zmusza domownikow do przyjecia formy i porzadku",
          "Chce uciec z Ala z domu rodzinnego",
          "Zostal zmuszony przez babcie Eugenie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Slub to element planu Artura: "Wciagne ich w slub, a slub bedzie taki, ze nie beda mieli innego wyjscia, jak tylko wziac w nim udzial na moich warunkach". Slub z ceremoniałem ("organy, orszak slubny") ma zaskoczyc domownikow i wciagnac ich w forme. Artur mowi: "Moj ojciec bedzie sie musial nareszcie pozapinac".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Jak reaguje Stomil, gdy Artur mowi mu, ze Eleonora spi z Edkiem?",
      content: {
        options: [
          "Wybucha gniewem i atakuje Edka",
          'Ucinka sie za "swoboda seksualna" i traktuje to jako intelektualna przeslanke — odmawia konfrontacji i w koncu dolacza do gry w karty z Edkiem',
          "Natychmiast wyrzuca Edka z domu",
          "Nie wierzy Arturowi i mowi, ze klaamie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Stomil mowi: "Swoboda seksualna to pierwszy warunek wolnosci czlowieka". Traktuje zdrade jako abstrakcyjne zaloozenie do dyskusji. Choc przyznaje, ze "strasznie tego nie lubi", nie ma "imperatywu logicznego", by dzialac. Ostatecznie zamiast strzelac do Edka — siada z nim do kart.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Co mowi Artur o tangu jako tancu?",
      content: {
        options: [
          "Ze tango jest pieknym tancem, ktorego chce sie nauczyc",
          "Ze kiedys trzeba bylo odwagi, zeby zatanczyc tango — Stomil opowiada o dawnych czasach, gdy tango bylo skandalem i symbolem buntu",
          "Ze tango jest zbyt staroswieckie",
          "Ze tango powinno byc zakazane",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'To Stomil mowi: "Czy wiesz, ile trzeba bylo odwagi, zeby zatanczyc tango?" — w kontekscie wspominania dawnych buntow. Tango bylo kiedys symbolem prowokacji, lamania norm. Na koncu dramatu tango staje sie symbolem odwrotnym: triumfu brutalnej sily (Edek).',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Dlaczego Artur mowi: "Nie mozna sie buntowac"?',
      content: {
        options: [
          "Bo jest tchoorzem i boi sie konsekwencji",
          "Bo starsze pokolenie juz zniszczylo wszystkie normy — brak norm stal sie norma, wiec nie ma przeciw czemu sie buntowac",
          "Bo Edek grozi mu rewolwerem",
          "Bo Ala odradza mu wszelkie dzialanie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Artur mowi: "Tak dlugo byliscie antykonformistami, az wreszczcie upadly ostatnie normy. Dla mnie nie zostawiliscie juz nic. Brak norm stal sie wasza norma. A ja moge sie buntowac tylko przeciw wam, czyli przeciwko waszemu rozpasaniu". To paradoks odwroconego buntu.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Co Eugeniusz mowi Arturowi na osobnosci o Edku?",
      content: {
        options: [
          "Chwali Edka i broni go przed Arturem",
          'Szepcze, ze Edek to "wredna postac" z brudnymi paznokciami, ktory oszukuje w kartach i uzywa szczoteczki Eugeniusza do czyszczenia butow — namawia Artura, zeby zrobil z nim porzadek',
          "Twierdzi, ze Edek jest niewinny i nieslusznie oskarzzany",
          "Proponuje, by Edek zostal sluzacym rodziny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Eugeniusz, gdy tamci nie slysza, szepce: "Wredna postac. I paznokcie ma brudne. Oszukuje w kartach. Siorbie przy jedzeniu, rzadzi sie jak u siebie". Opowiada o szczoteczce do zebow uzytej do czyszczenia butow. Namawia: "Moze by go tak zrzucic ze schodow?" Ale oficjalnie — bo boi sie Eugenii — mowi: "Pan Edek to prosty i bardzo porzadny czlowiek".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Co Eleonora opowiada o swoim zwiazku z Edkiem?",
      content: {
        options: [
          "Ukrywa romans i wszystkiemu zaprzecza",
          'Mowi wprost przy wszystkich: "Ja sypiam z Edkiem od czasu do czasu" — a potem wychodzi po sniadanie, jakby nic sie nie stalo',
          "Mowi, ze kocha Edka i chce z nim odejsc",
          "Twierdzi, ze Edek ja zmuszal",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Eleonora ogłasza to przy calej rodzinie z zaskakujaca swoboda: "Ja sypiam z Edkiem od czasu do czasu. Prawda, Edek?" Edek potwierdza roztargniony. Artur jest w szoku, ale Eleonora mowi: "Zaraz przyniosę ci cos do jedzenia" i wychodzi. Brak jakiejkolwiek formy — nawet zdrada nie jest skandalem.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Jakie sa ostatnie slowa Artura?",
      content: {
        options: [
          '"Nienawidze was wszystkich"',
          '"Ja chcialem! Ja chcialem!"',
          '"Przebaczcie mi"',
          '"Forma zbawi swiat"',
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Artur, uderzony przez Edka, osuwa sie na podloge i mowi dobitnie: "Ja chcialem! Ja chcialem!" — wyrazajac tragizm niespełnionej woli: chcial stworzyc porzadek, ale nie zdolal. Przed smiercia wyznal tez Ali: "Ja ciebie kochalem".',
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Ktore przedmioty Artur wymienia jako dowody balaganu i braku porzadku?",
      content: {
        options: [
          "Wozek dziecinny — stoi tu od 25 lat zamiast na strychu",
          "Slubna suknia ciotki — zamiast w szafie",
          "Bryczesy wuja Eugeniusza — zostaly, choc ostatni kon zdechl 40 lat temu",
          "Fortepian babci — rozstrojony od dziesiecioleci",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Artur wymienia: wozek dziecinny (kopie go), suknie slubna (wyciaga zakurzony welon), bryczesy Eugeniusza. Mowi: "Zadnego porzadku, zadnej zgodnosci z dniem biezacym". Fortepian nie jest wymieniiony w sztuce.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Uzupelnij zdania, wybierajac poprawne opcje:",
      content: {
        textWithGaps:
          "Artur chce urzadzic slub z (1). Eugeniusz pelni role (2). Na koncu dramatu Edek zaklada na siebie (3).",
        gaps: [
          {
            id: 1,
            options: [
              "Eleonora",
              "Ala — kuzynka Artura",
              "Eugenia",
              "sasiadka",
            ],
          },
          {
            id: 2,
            options: [
              "swiadka na slubie",
              "sojusznika Artura — pilnuje domownikow z rewolwerem",
              "celebransa ceremonii",
              "fotografa",
            ],
          },
          {
            id: 3,
            options: [
              "piżame Stomila",
              "garnitur Eugeniusza",
              "marynarke Artura",
              "slubna suknie",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 2],
      metadata: {
        explanation:
          'Artur bierze slub z kuzynka Ala. Eugeniusz pilnuje rodziny z rewolwerem ("Do kuchni! I czekac!"). Na koncu Edek sciaga marynarke z martwego Artura i zaklada ja na siebie — symbol przejecia wladzy.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Ktore hasla wypowiadaja Artur i Eugeniusz w akcie II jako spiskkowcy?",
      content: {
        options: [
          'Haslo: "Odnowa", odzew: "Odrodzenie"',
          'Artur rozkazuje: "Czuwac, milczec, na wszystko miec oczy otwarte"',
          'Artur mowi: "Nadszedl czas dzialania"',
          'Eugeniusz odpowiada: "Niech zyje rewolucja!"',
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'W akcie II Artur i Eugeniusz dzialaja jak spiskowcy: haslo/odzew ("Odnowa"/"Odrodzenie"), rozkazy ("Czuwac, milczec"), atmosfera zamachu stanu. Eugeniusz NIE mowi "Niech zyje rewolucja" — mowi: "Niech cie Bog ma w swojej opiece".',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Ktore zmiany zaszly w mieszkaniu w akcie III?",
      content: {
        options: [
          "Balagan zniknal — klasyczny salon mieszczanski sprzed polwiecza",
          "Draperie znalazly sie na swoim miejscu, katafalk nakryty serwetkami jak kredens",
          "Wszyscy domownicy ubrani w stare, eleganckie stroje (ze strychu)",
          "Mieszkanie zostalo przerobione na galerie sztuki Stomila",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Akt III: balagan zniknal, salon wyglada jak sprzed polwiecza. Katafalk zamieniony na kredens. Stomil w garniturze z kamaszkami i kolnierzykiem "Vatermorder". Eleonora w sukni z kokiem. Eugeniusz robi zdjecie zepsutym aparatem. Galeria NIE powstaje.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Ktore stwierdzenia o smierci babci Eugenii sa prawdziwe?",
      content: {
        options: [
          "Eugenia umiera w akcie III, podczas gdy reszta dyskutuje o ideach",
          "Sama porzdadza katafalk i kladzie sie na nim",
          "Domownicy nie traktuja jej smierci powaznie — pytaja, czy zartuje",
          "Artur ratuje ja i wzywa lekarza",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Eugenia umiera "rzeczowo": sama przygotowuje katafalk, kladzie sie, splata rece. Domownicy reaguja: "Mama zartuje?", "Kto to widzial umierac!", "Przeciez dzisiaj dzien slubu". Artur NIE ratuje jej — mowi: "Smierc... wspaaniala forma" i wykorzystuje pomysl.',
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (7) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        'Dlaczego Artur mowi, ze ojciec i jego pokolenie "zatruliiscie wolnoscia pokolenia w przod i wstecz"?',
      content: {},
      correctAnswer:
        'Artur oskarzza pokolenie rodzicow (Stomil, Eleonora) o to, ze ich bunt przeciw tradycji — lamanie konwencji, odrzucanie norm, "rewolucja i ekspansja" — doprowadzil do calkowitego zniszczenia wartosci. Efekt: chaos, w ktorym "nic nie funkcjonuje, bo wszystko dozwolone". Nie ma zasad, wiec nie ma tez wykroczen. Nawet babcia Eugenia "zestarzala sie w nowoczesnosci". Artur nie moze sie buntowac, bo nie ma przeciw czemu — starszi zniszczyli wszystko przed nim.',
      metadata: {
        explanation:
          "To kluczowy fragment aktu I. Artur formuluje paradoks: rodzice walczyli o wolnosc, ale wolnosc bez granic stala sie wiezieniem (nie mozna wybierac, bo wszystko dozwolone). Odwrocony konflikt pokolen — to mlody chce porzadku.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Na czym polega odwrocony konflikt pokolen w "Tangu"?',
      content: {
        hints: ["mlody = konserwatyzm", "starsi = bunt"],
      },
      correctAnswer:
        'Tradycyjnie to mlodziez buntuje sie przeciw normom starszych. W "Tangu" jest odwrotnie: starsze pokolenie (Stomil, Eleonora, Eugenia) zyje w chaosie, odrzuca wszelkie zasady, bawi sie, prowokuje. To mlody Artur pragnie porzadku, tradycji, ceremonialow, slubu koscielnego. Artur mowi: "Dlaczego akurat ty, najmlodszy, chcesz koniecznie miec jakies zasady?" — na co odpowiada: "Bo ja wchodze w zycie. W jakie zycie mam wejsc?" Mlody jest konserwatywny, starzy sa rewolucyjni.',
      metadata: {
        explanation:
          "Odwrocony konflikt pokolen to centralna konstrukcja dramatu i jedno z pytan jawnych na mature 2026-2028. Kluczzowe: Mrozek pokazuje, ze bunt pozbawiony granic staje sie nowa tyrania.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Jak Stomil i Eleonora wspominaja swoje mlode lata buntu?",
      content: {},
      correctAnswer:
        'Eleonora wspomina: Stomil "posiadl" ja "w oczach mamy i papy, podczas premiery Tannhausera, w pierwszym rzedzie foteli, na znak protestu". Stomil mowi o "czasie buntu i skoku w nowoczesnosc": "Wyzwolenie z wiezow starej sztuki i starego zycia!", "Pekaja skorupy, puszczaja okowy". Hasla: "Rewolucja i ekspansja!", "Niech zyje dynamika!", "Poza forme, poza forme!". Ale nie potrafia ustalic, kiedy dokladnie to bylo — Eleonora liczy lata i gubi sie w rachunkach.',
      metadata: {
        explanation:
          "Wspomnienia Stomila i Eleonory sa komiczne: heroiczna retoryka buntu kontra niezdolnosc do ustalenia daty. Pokazuja, ze bunt stal sie pustym rytuałem — pamietaja hasla, ale nie pamietaja, o co walczyli.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Co mowi Eleonora o Edku i dlaczego go ceni?",
      content: {},
      correctAnswer:
        'Eleonora mowi: "Edek jest taki prosty... Jak samo zycie. Brutalny, ale w tym wlasnie jego wdziek. Nie ma kompleksow. Dziala odswiezajaco. On umie chciec naprawde, chciec pieknie. Kiedy siada, siedzi jak samo siedzenie, zwyczajnie, lecz doglebnie. Kiedy je albo pije, jego zoladek staje sie symfonia natury". Dodaje: "Lubię patrzec, jak on trawi. Prosto i szczerze". Twierdzi tez, ze gest Edka poprawiajacego spodnie "jest po prostu krolewski".',
      metadata: {
        explanation:
          'Slowa Eleonory to parodia kultu "autentycznosci" i prymitywizmu. Zarownno Eleonora, jak i Stomil cenia Edka za "naturalnosc" — ale ta "autentycznosc" okazuje sie prymitywna przemoca.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Jak przebiega nocna rozmowa Artura z Ala w akcie II?",
      content: {
        instruction:
          "Opisz, jak Artur probuje przekonac Ale do slubu i jakie argumenty podaje.",
      },
      correctAnswer:
        'Artur tlumaczy Ali "system wartosci": trzeba stworzyc znaczenia, bo "nic nie jest powazne samo w sobie". Probuje ja przekonac, ze konwencje chronia kobiety — daja im czas, mozliwosc wyboru, wladze. Bez konwencji mezczyzna "wlecze kobiete na lozko" bez slowa. Artur mowi o konwersacji, zareczynach, ceremoniach jako narzędziach wolnosci kobiet. W pewnym momencie rzuca sie na Ale ("praktyczne cwiczenia z pragmatyki plci"), ale twierdzi, ze to lekcja. Ala raz sie rozbiera, raz ubiera — testuje Artura. Ostatecznie mowi "Tak" — ale z zastrzezeniem "Mam nadzieje".',
      metadata: {
        explanation:
          "Rozmowa Artura z Ala to kluczowa scena aktu II. Artur jest racjonalny, ale nie potrafi powiedziec Ali, ze ja kocha. Ala szuka uczuc, Artur oferuje teorie. Ten dysonans doprowadzi do tragedii.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Co robi Edek w czasie akcji dramatu — jak wykorzystuje sytuacje?",
      content: {},
      correctAnswer:
        "Edek: 1) Gra w karty z babcia i wujem — wygrywa (Eugeniusz podejrzewa, ze oszukuje). 2) Pije piwo Artura (podkrada z filizanki). 3) Oglaada podrecznik anatomii Artura z zaciekawieniem. 4) Spi z Eleonora. 5) Przebiega sie po nocy, podsluuchuje. 6) W akcie III poslusznie gra lokaja, ale dalej kradnie jedzenie i pije. 7) Na koncu zabija Artura, zaklada jego marynarke i przejmuje wladze. Edek dziala instynktownie — wykorzystuje sytuacje, nie teoretyzuje.",
      metadata: {
        explanation:
          "Edek to czlowiek czynu — w przeciwienstwie do intelektualisty Artura. Nie buduje teorii, ale skutecznie dziala. Jego droga od ospierajaacego intruza do wladcy jest glowna linia dramatyczna sztuki.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Co oznacza zdanie Eugeniusza: "Jestem niedzisiejszy"?',
      content: {},
      correctAnswer:
        'Eugeniusz mowi o sobie "niedzisiejszy" — czyli nienalezacy do wspolczesnosci, staroswiecki. Powtarza to wielokrotnie z naciskiem. Czuje sie obcy w swiecie chaosu stworzonym przez Stomila i Eleonore. "Cierpialem przez tyle lat. Nienawidzilem was za wasz upadek, za wasza degradolade i milczalem". Eugeniusz ukrywal konserwatywne poglady, bo byl slabszy. Artur jest jego szansa: "Artur spadl mi jak z nieba". "Niedzisiejszy" = wiernny starej epoce, ale zbyt slaby, by dzialac samodzielnie.',
      metadata: {
        explanation:
          'Eugeniusz to postac tragikomiczna: ma dobre intencje, ale jest zbyt slaby i tchorzliwy. Jego "niedzisiejszosc" jest trafna diagnoza, ale nie daje sily dzialania. Na koncu tanczy z Edkiem — calkowicie ulegly.',
      },
    },

    // ===== DIFFICULTY 2 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Napisz krotka notatke syntetyczna na podany temat:",
      content: {
        topic:
          "Balagan w mieszkaniu Stomilów jako metafora — co symbolizuje wyglad sceny na poczatku dramatu?",
        requirements: [
          "Wymien konkretne przedmioty (wozek, suknia, katafalk, bryczesy)",
          "Wyjasnij, dlaczego nikt ich nie uprzatnal przez lata",
          "Polacz z tematem upadku tradycji i norym",
          "100-120 slow",
        ],
        wordLimit: { min: 100, max: 120 },
      },
      correctAnswer:
        'Notatka powinna: Przedmioty: wozek dziecinny Artura (25 lat), slubna suknia ciotki, bryczesy Eugeniusza (kon zdechl 40 lat temu), katafalk dziadka (zmarly 10 lat temu). Nikt nie spratal, bo "nie przywiazujemy zadnej wagi do tych pomnikow przeszlosci" (Stomil). Pokolenie Stomila odrzucilo tradycje, ale nie stworzylo nic w zamian — resztki starego swiata leża obok nowego balaganu. Draperie polzwisajace = brak granic, niekonturowosci. Stol z naczyniami z roznych serwisow = brak jednosci stylu/epoki. Metafora: mieszkanie = stan spoleczeeenstwa po rewolucji obyczajowej — zniszczono forme, ale nie zbudowano nowej.',
      metadata: {
        explanation:
          'Scenografia "Tanga" jest kluczowa — Mrozek szczegolowo opisuje ja w didaskaliach. Balagan to wizualizacja chaosu moralnego: tak jak przedmioty nie sa na swoim miejscu, tak wartosci stracily swoja pozycje.',
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (7) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Jak Stomil demaskuje prawdziwe intencje Artura w akcie II?",
      content: {
        options: [
          "Mowi, ze Artur jest leniwy i nie chce studiowac",
          'Mowi: "Przejrzalem cie. Ty chcesz tragedii" — rozpoznaje, ze Artur chce zmusic go do zabicia Edka, bo tragedia jako forma przywrociłaby porzadek swiata',
          "Mowi, ze Artur jest zazdrosny o Edka",
          "Mowi, ze Artur jest tchorzem i nie zrobi nic",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Stomil rozpoznaje plan Artura: "Chcesz tragedii! Tragedia — od wiekow najpelniejszy wyraz swiata niewruszonych pojec". Artur chce, zeby Stomil zabił Edka — bo morderstwo stworzyloby nieodwracalny fakt, forme tragedii. Stomil odmawia: "Dzisiaj tylko farsa jest mozliwa" — i ma racje, bo konczy sie na grze w karty.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Dlaczego Stomil uwaza, ze tragedia jest juz niemozliwa?",
      content: {
        options: [
          "Bo nie ma dobrych aktorow",
          'Bo "rzeczywistosc przezre kazda forme" — w swiecie bez stalych wartosci nawet morderstwo nie stworzy tragedii, tylko farse; trup "tutaj nic nie pomoze"',
          "Bo publicznosc nie chodzi juz do teatru",
          "Bo tragedia zostala zakazana przez wladze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Stomil mowi: "Czy nie wiesz o tym, ze tragedia jest juz dzisiaj niemozliwa? Rzeczywistosc przezre kazda forme, nawet taka. Trup tutaj nic nie pomoze". W swiecie bez norm nie ma tragedii, bo nie ma wartosci, ktore moglyby byc naruszone. Farsa jest jedyna mozliwa forma — bo wszystko jest juz absurdalne.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Co Artur odkrywa w akcie III po powrocie pijany do domu?",
      content: {
        options: [
          "Ze slub zostal odwolany i wszyscy sa szczesliwi",
          "Ze forma nie zbawi swiata — kamaszki, kolnierzyki i ceremonialy to puste rekwizyty bez idei; potrzeba czegos wiecej",
          "Ze Edek uciekl z domu",
          "Ze babcia Eugenia wyzdrowiala",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Artur wraca pijany i mowi: "Forma nie zbawi swiata", "Ojciec mial racje, jestem tylko zalosnym formalista". Odkrywa, ze przywrocenie zewnetrznych form (stroje, ceremonialy) nie wystarczy bez idei, ktora je napelni trescia. Mowi: "Konwencja zawsze brala sie z idei" — ale idei nie ma.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Co ostatecznie Artur uznaje za jedyne rozwiazanie?",
      content: {
        options: [
          "Ucieczke z domu",
          'Wladze — "Mozliwa jest tylko wladza! Tylko wladza da sie stworzyc z niczego" — staje na stole i ogłasza sie panem zycia i smierci domownikow',
          "Pojednanie z rodzina",
          "Powrot do studiow i porzucenie planu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Artur ogłasza: "Mozliwa jest tylko wladza! Tylko wladza da sie stworzyc z niczego". Stawia krzeslo na stole i mowi: "Moge was zabic". To drroga od intelektualisty do tyrana — Artur sam staje sie tym, przeciw czemu walczyl. Ale jest za slaby, by wladze utrzymac — Edek, ktory ma prawdziwa sile, przejmuje ja.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Jaka funkcje pelni taniec tango na koncu dramatu?",
      content: {
        options: [
          "Jest wyrazem radosci po smierci Artura",
          "Symbolizuje triumf brutalnej sily (Edek) nad intelektem (Artur) i kultura — tango, kiedys symbol elegancji, staje sie znakiem zwyciestwa prymitywizmu i narzucenia rytmu slabszym",
          "Jest hołdem dla Artura",
          "Pokazuje, ze Eugeniusz i Edek sie zaprzyjaznili",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tango na koncu to metafora totalitaryzmu: Edek (sila) prowadzi, Eugeniusz (intelekt) poddaje sie. "La Cumparsita" gra nawet po spadnieciu kurtyny. Tango, kiedys bunt ("trzeba bylo odwagi"), teraz = zniewolenie. Edek narzuca rytm — "posłuch musi byc".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Dlaczego Ala zdradza Artura z Edkiem?",
      content: {
        options: [
          "Bo jest prymitywna i nie rozumie Artura",
          "Bo Artur traktuje ja jako narzedzie planu, a nie jako kobiete — mowi o zasadach i systemach, ale nie mowi o uczuciach; Ala szuka bliskosci, ktorej Artur nie potrafi dac",
          "Bo Edek ja zastraszyl",
          "Bo chce zemscic sie na rodzinie Artura",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ala mowi: "Mówilam, ze ci to nie bedzie przeszkadzac. Przeciez zenisz sie ze mna tylko dla zasady". Wczescniej: "Ja nie chce zasad bez Artura" i "Mam nadzieje" (ze ją pokocha). Artur nie potrafi powiedziec "kocham cie" — mowi dopiero umierajac. Ala szukala uczuc, nie idei.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Jaka role pelni groteska w "Tangu"?',
      content: {
        options: [
          "Sluzy wylacznie rozrywce — dramat ma byc zabawny",
          "Laczy komizm z tragizmem: absurdalne sytuacje (babcia na katafalku, klatka na glowie, eksperyment z pacynkami) odsłaniaja realne problemy — rozklad wartosci, bezsilnosc intelektu wobec sily, niemoznosc odbudowy norm",
          "Jest bledem rezyserskim, nie zamierzonym przez autora",
          "Sluzy wylacznie krytyce teatru",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Groteska u Mrozka to metoda: wyolbrzymienie i absurd sluzą odsłonieniu prawdy. Babcia na katafalku = absurd, ale odsłania brak powagi w rodzinie. Eksperyment Stomila = farsa, ale odsłania fiasco awangardy. Tango na koncu = groteskowy obraz, ale odsłania mechanizm wladzy.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: 'Ktore interpretacje zakonczenia "Tanga" sa uzasadnione?',
      content: {
        options: [
          "Edek symbolizuje totalitaryzm — brutalna sila przejmuje wladze, gdy intelekt jest bezsilny",
          "Tango Edka z Eugeniuszem = wspolpraca sily i inteligencji pod dyktatura sily",
          "Zakonczenie jest optymistyczne — Edek wprowadzi porzadek",
          "Smierc Artura pokazuje, ze sam intelekt bez sily nie moze zbudowac porzadku",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Edek = totalitaryzm (Stomil: "to tylko Edek"). Tango = podporzadkowanie inteligencji sile (Eugeniusz tanczy, Edek prowadzi). Smierc Artura = bezsilnosc intelektu. Zakonczenie NIE jest optymistyczne — Edek mowi: "Tylko posluch musi byc" — to tyrania, nie porzadek.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Polacz postacie z ich symbolicznym znaczeniem:",
      content: {
        matchingType: "characters_to_symbols",
        leftColumn: [
          { id: "A", text: "Artur" },
          { id: "B", text: "Edek" },
          { id: "C", text: "Stomil" },
          { id: "D", text: "Eugeniusz" },
        ],
        rightColumn: [
          { id: "1", text: "Inteligencja bezsilna wobec nowego porzadku" },
          { id: "2", text: "Brutalna sila, prymitywizm triumfujacy" },
          { id: "3", text: "Intelektualista-idealista, formalista" },
          { id: "4", text: "Artysta-awangardzista, niszczyciel form" },
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
          "Artur = intelektualista-formalista (chce form, ale nie ma idei). Edek = prymitywizm, brutalna sila. Stomil = awangardysta, ktory zniszczyl stare formy, ale nie stworzyl nowych. Eugeniusz = inteligencja bezsilna — konczy tancząc z Edkiem.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Ktore elementy dramatu nawiazuja do totalitaryzmu XX wieku?",
      content: {
        options: [
          'Edek przejmuje wladze sila — zabijajac intelektualisste i narzucajac "poslluch"',
          'Artur w akcie III ogłasza: "Wladza nad zyciem i smiercia" — sam staje sie protodyktatoreem',
          'Eugeniusz dolacza do "zamaachu stanu" z haslem i odzewem',
          "Stomil i Eleonora organizuja demokratyczne wybory",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Mrozek pisal "Tango" w 1964 roku — w kontekscie totalitaryzmow XX wieku. Edek = brutalna sila bez idei (faszzyzm/stalinizm). Artur = intelektualista, ktory sam skrecil w strone dyktatury. Eugeniusz = "podroczna inteligencja" sluzaca silniejszemu. Wybory NIE maja miejsca.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        'Ktore stwierdzenia o relacji formy i tresci (idei) w "Tangu" sa prawdziwe?',
      content: {
        options: [
          "Artur probuje przywrocic forme (slub, ceremonialy, stroje), ale odkrywa, ze forma bez idei jest pusta",
          "Stomil niszczyl forme w imie wolnosci, ale wolnosc bez formy prowadzi do chaosu",
          "Edek nie potrzebuje ani formy, ani idei — ma sile fizyczna",
          "Artur z sukcesem odbudowuje forme i idee",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Forma bez idei = puste kamaszki i kolnierzyki (Artur w akcie III). Wolnosc bez formy = chaos (Stomil, akt I). Sila bez formy i idei = tyrania (Edek, finał). Artur NIE odnosi sukcesu — ginie, a jego marynarke zaklada Edek.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (7) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Porownaj postawy Artura i Edka wobec wladzy. Czym sie roznia?",
      content: {},
      correctAnswer:
        'Artur dochodzi do wladzy droga intelektualna: najpierw forma (slub), potem idea, wreszcie wladza jako "jedyna mozliwosc". Jego wladza jest teoretyczna — buduje ja na slowach, argumentach, przemowieniach. Mowi: "Ja jestem waszym odkupicielem". Edek dochodzi do wladzy droga fizyczna: jeden cios w kark. Jego wladza jest praktyczna — nie potrzebuje uzasadnien. Mowi: "Byle cicho siedziec, nie podskakiwac, a bedzie wam ze mna dobrze". Roznica: Artur ma idee, ale nie ma sily. Edek ma sile, ale nie ma idei. W swiecie "Tanga" zwycięza sila — bo idee bez sily sa bezradne.',
      metadata: {
        explanation:
          "Porownanie Artur-Edek to klasyczne pytanie maturalne. Klucz: inteligent vs. cham, idea vs. sila, slowo vs. czyn. Mrozek pokazuje pesymistycznie, ze sila bez idei zwycięza nad idea bez sily.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Jak zmienia sie Artur w ciagu trzech aktow? Opisz jego ewolucje.",
      content: {
        instruction:
          "Opisz postawe Artura w kazdym akcie: czego chce, jakie srodki stosuje, co odkrywa.",
      },
      correctAnswer:
        'Akt I: Artur wraca do domu oburzony chaosem. Chce porzadku, ceremonialow, norm. Srodki: krzyk, kary (katafalk, klatka), perswazja. Odkrywa, ze bunt jest niemozliwy, bo normy juz nie istnieja. Akt II: Artur organizuje "zamach stanu" z Eugeniuszem. Planuje slub jako narzedzie formy. Srodki: spisek, rewolwer, przekonywanie Ali. Odkrywa, ze forma (slub) nie wystarczy bez idei. Proobuje zmusic ojca do tragedii — Stomil odmawia. Akt III: Artur wraca pijany, zlamany. Ogłasza, ze "forma nie zbawi swiata". Szuka idei — nie znajduje. Ogłasza wladze jako jedyne rozwiazanie. Zostaje zabity przez Edka. Ewolucja: od intelektualisty przez formalistee do prototyrana — i ofiare.',
      metadata: {
        explanation:
          "Ewolucja Artura to linia dramatyczna calej sztuki. Klucz: kazdy akt konczy sie porazka — i kazdy prowadzi do bardziej radykalnych srodkow. Artur sam staje sie tym, przeciw czemu walczyl.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        'Dlaczego Stomil mowi: "Dzisiaj tylko farsa jest mozliwa"? Co to oznacza?',
      content: {},
      correctAnswer:
        'Stomil twierdzi, ze w swiecie bez stalych wartosci tragedia jest niemozliwa. Tragedia wymaga norm, ktore mozna zlamac — a norm juz nie ma. Nawet gdyby Stomil zabił Edka, nie bylaby to tragedia, lecz farsa — bo zdrada ("rogi") nie jest juz skandalem, smierc nie jest nieodwracalnym naruszeniem porzadku. "Trup tutaj nic nie pomoze." To pesymistyczna diagnoza: swiat stal sie tak absurdalny, ze nawet przemoc nie stworzy sensu. Stomil ma racje — ale jego rezygmacja prowadzi do tego, ze wladze przejmuje Edek, ktory nie potrzebuje tragedii ani farsy — tylko sily.',
      metadata: {
        explanation:
          "Zdanie Stomila to centralna teza filozoficzna dramatu. Klucz: forma (tragedia) wymaga tresci (wartosci). Bez wartosci forma jest pusta — farsa. Artur probuje sforsowac tragedie, ale Stomil ma racje: wychodzi z tego tylko farsa.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        'Jak Mrozek wykorzystuje groteske w "Tangu"? Podaj trzy przyklady groteskowych scen i wyjasnij ich funkcje.',
      content: {},
      correctAnswer:
        '1) Babcia na katafalku — Artur karze babcie za gre w karty z Edkiem, kazac jej się polozyc na katafalku i zapalajac gromnice. Komizm (babcia jako "zmarla" za kare) + tragizm (babcia naprawde umrze w akcie III). 2) Eksperyment Stomila — pacynki Adama i Ewy, potem strzal z rewolweru i ciemnosc. Nikt nie rozumie. Edek mowi: "Wolę kino". Komizm + satyra na awangarde. 3) Finałowe tango Edka z Eugeniuszem — morderca tanczy z inteligeentem, w zbyt ciasnej marynarce zabitego. Komizm (absurd tanca) + tragizm (triumf brutalnosci). Funkcja groteski: wyolbrzymienie odsłania realne mechanizmy — rozklad wartosci, bezsilnosc sztuki, przemoc jako jedyny skuteczny srodek.',
      metadata: {
        explanation:
          'Groteska to podstawowe narzedzie Mrozka. Na maturze pojawia sie pytanie o dramat absurdu i groteske. Klucz: groteska nie jest zabawna "za darmo" — kazdy absurd ma drugie dno.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Wyjasnij, dlaczego smierc babci Eugenii jest wazna dla dalszego rozwoju akcji.",
      content: {},
      correctAnswer:
        'Eugenia umiera w momencie, gdy mezczyzni dyskutuja o ideach ("Bog? Sport? Eksperyment? Postep?"). Jej smierc jest prawdziwa — jedyna autentyczna rzecz w calej sztuce. Ale domownicy nie potrafia jej przyjac: "Kto to widzial umierac?!", "Chce mama wszystko zepsuc przez jakas smierc?". Artur reaguje: "Smierc — wspaniala forma!" i natychmiast wykorzystuje ja jako inspiracje do idei wladzy: "Jesli cudza smierc...". To punkt zwrotny — Artur przechodzi od szukania formy do szukania wladzy. Smierc Eugenii pokazuje tez ostateczna degradacje rodziny: nawet umierajaca babcia nie jest traktowana powaznie.',
      metadata: {
        explanation:
          'Smierc Eugenii to jedyna autentyczna smierc w dramacie (smierc Artura to morderstwo). Funkcja: obnazona cynizm Artura ("wykorzystam ten pomysl") i oboojetnosc rodziny. Jednoczesnie dostarcza Arturowi idei wladzy.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Co Artur mowi Ali o konwencjach i ich roli w relacjach miedzy kobietami a mezczyznanmi?",
      content: {},
      correctAnswer:
        'Artur tlumaczy Ali, ze konwencje (zasady, ceremonialy) chronia kobiety. Bez nich mezczyzna "wlecze kobiete na lozko" bez slowa. Z konwencjami: mezczyzna musi rozmawiac (konwersacja — kobieta ocenia przeciwnika), zabiegac, czekac. Kobieta ma czas, moze manewrowac, wybierac, stworzyc atmosfere niepewnosci i tajemniczosci. "Kleczalbym wtedy przed toba z bukietem kwiatow". Ale — paradoks — Artur nie moze kleknaac, bo konwencji nie ma. Mowi: "Nie ma tych konwencji, o ktorych mowilem. Teraz widzisz, w jakim jestes polozeniu". Artur uzywa argumentow feministycznych, ale w sluzbie formalizmu.',
      metadata: {
        explanation:
          "Ten fragment to jeden z najbardziej oryginalnych w dramacie. Artur — paradoksalnie — jest obroncą kobiet, ale tylko teoretycznie. Ala chce, zeby kleknal — ale on nie moze, bo nie ma konwencji, ktora by go do tego zobowiazala.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question:
        "Jak Edek przejmuje wladze na koncu dramatu? Opisz scene i jej znaczenie.",
      content: {},
      correctAnswer:
        'Artur szuka rewolweru, chcac zabic Edka (po wyznaniu Ali). Edek zakrada sie od tylu, wyjmuje z zanadrza rewolwer i kolba uderza Artura w kark. Potem spleccionymi dlonmi bije w odsłoniety kark jeszcze raz — Artur pada. Mrozek zaznacza: "Ta scena musi miec charakter bardzo realistyczny". Potem Edek sciaga marynarke z zabitego, zaklada ja na siebie i przeglaada sie w lustrze. Wlacza magnetofon z "La Cumparsita" i mowi do Eugeniusza: "Zatanczymy sobie?". Eugeniusz ulega. Znaczenie: sila (Edek) triumfuje nad intelektem (Artur). Marynarke = symbol wladzy — przechodzi z intelektualisty na prymitywisste. Tango = nowy porzadek pod dyktatem sily.',
      metadata: {
        explanation:
          'Finał "Tanga" to jedna z najslynniejszych scen polskiego dramatu. Klucz: Edek nie buduje zadnej ideologii — po prostu uderza i przejmuje. "Myslal dobrze, tylko byl za nerwowy" — podsumowuje Artura. Na maturze: symbol totalitaryzmu.',
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (3) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          'Bunt przeciwko porzadkowi spolecznemu w "Tangu" — kto sie buntuje, przeciw komu i z jakim skutkiem?',
        requirements: [
          "Opisz bunt starszego pokolenia (Stomil, Eleonora) przeciw tradycji",
          "Opisz bunt Artura przeciw chaosowi",
          "Wyjasnij, dlaczego oba bunty koncza sie porazka",
          "Wspomnij o Edku jako zwyciezcy",
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Pokolenie Stomila buntowalo sie przeciw tradycji, normom, konwencjom: "Rewolucja i ekspansja!", "Poza forme, poza forme!". Skutek: zniszczenie wszystkiego, chaos, "burdel, gdzie nic nie funkcjonuje". Artur buntuje sie przeciw chaosowi — chce przywrocic porzadek przez forme (slub, ceremonialy), potem przez wladze. Skutek: porazka — forma bez idei jest pusta, a wladza bez sily — bezradna. Edek nie buntuje sie — uzywa sily fizycznej i przejmuje wladze. Oba bunty koncza sie porazka: bunt Stomila stworzyl chaos, bunt Artura nie zdolal go naprawic. Zwycięzca jest ten, kto nie bunttuje sie, ale uderza: Edek. Przeslanie: bunt (zarowno destrukcyjny, jak i konstruktywny) przegrywa z brutalna sila.',
      metadata: {
        explanation:
          '"Bunt przeciwko porzadkowi spolecznemu" to pytanie jawne na mature 2026-2028. Klucz: w "Tangu" sa dwa bunty i oba przegrywaja — bo swiat bez wartosci nagradza sile, nie idee.',
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic: 'Konflikt pokolen w "Tangu" — na czym polega jego odwrocenie?',
        requirements: [
          "Wyjasnij tradycyjny model konfliktu pokolen (mlodzi buntuja sie przeciw normom starszych)",
          "Opisz, jak Mrozek go odwraca (starsi = chaos, mlody = porzadek)",
          "Wskazz, jakie sa konsekwencje tego odwrocenia",
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Tradycyjnie: mlodzi lamia normy starszych (Szekspir, romantyzm). W "Tangu" odwrotnie: starsi (Stomil, Eleonora) zyli buntem i zniszczyli normy — teraz "zyja swobodnie" w chaosie. Mlody Artur pragnie porzadku, tradycji, ceremonialow. Mowi: "Bo ja wchodze w zycie. W jakie zycie mam wejsc?". Odwrocenie: Artur jest konserwatywny, a Stomil rewolucyjny. Konsekwencje: Artur nie moze sie buntowac (nie ma przeciw czemu), a starsi nie widza problemu ("Jeszcze nie chcesz byc nowoczesny?"). Brak dialogu miedzypokoleniowego prowadzi do tragdiii. Klucz: odwrocenie nie jest komiczne — pokazuje gleboki kryzys: gdy pokolenie starszych niszczy wartosci, mlodzi nie maja fundamentow do budowania.',
      metadata: {
        explanation:
          '"Konflikt pokolen" to drugie pytanie jawne z "Tanga" na mature 2026-2028. Klucz: odwrocenie konfliktu pokolen to nie tylko zabawny chwyt — to diagnoza spoleczna.',
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Tango",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          "Edek jako symbol upadku wartosci — dlaczego to on przejmuje wladze?",
        requirements: [
          "Opisz Edka: kim jest, jak sie zachowuje, co reprezentuje",
          "Wyjasnij, dlaczego nikt nie potrafi mu sie przeciwstawic",
          "Porownaj go z Arturem jako dwa modele dzialania",
          "Sformuluj wniosek o przeslaniu dramatu",
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Edek: obcy, prymitywny, brutaalny, ale skuteczny. Nie ma idei, zasad, wyksztalcenia. Ma sile fizyczna i instynkt. Dlaczego nikt mu sie nie sprzeciwia: Stomil ceni go za "autentycznosc". Eleonora jest jego kochanka. Eugeniusz boi sie. Artur ma idee, ale nie ma sily. Porownanie z Arturem: Artur = slowo (teorii, przemowy, plany), Edek = czyn (jeden cios). Artur mysli, Edek dziala. Artur szuka uzasadnien, Edek nie potrzebuje ich. Wniosek: w swiecie bez wartosci triumfuje ten, kto ma sile fizyczna — bo nie ma norm, ktore moglyby go zatrzymac. Edek to symbol totalitaryzmu: wladza oparta na przemocy, bez idei. "Tango" ostrzega: chaos moralny otwiera droge brutalnnej sile.',
      metadata: {
        explanation:
          '"Problem upadku wartosci" to trzecie pytanie jawne z "Tanga" na mature 2026-2028. Klucz: Edek nie jest przyczyyna upadku — jest jego konsekwencja. To chaos stworzony przez Stomilów umozliwil Edkowi przejecie wladzy.',
      },
    },
    // ======================= POCZĄTEK PYTAŃ Chłopi ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Kto jest autorem powieści \u201eChłopi\u201d?",
      content: {
        options: [
          "Bolesław Prus",
          "Henryk Sienkiewicz",
          "Władysław Stanisław Reymont",
          "Stefan Żeromski",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Autorem \u201eChłopów\u201d jest Władysław Stanisław Reymont, który za tę powieść otrzymał literacką Nagrodę Nobla w 1924 roku.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Jak nazywa się wieś, w której rozgrywa się akcja powieści \u201eChłopi\u201d?",
      content: {
        options: ["Soplicowo", "Lipce", "Wola", "Rudka"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja powieści rozgrywa się w fikcyjnej wsi Lipce, położonej na Mazowszu. Soplicowo to siedziba z \u201ePana Tadeusza\u201d, natomiast Wola i Rudka to wsie sąsiadujące z Lipcami.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Na ile tomów podzielona jest powieść \u201eChłopi\u201d?",
      content: {
        options: ["Dwa", "Trzy", "Cztery", "Pięć"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Powieść składa się z czterech tomów, których tytuły odpowiadają porom roku: \u201eJesień\u201d, \u201eZima\u201d, \u201eWiosna\u201d i \u201eLato\u201d.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Kim jest Maciej Boryna w powieści \u201eChłopi\u201d?",
      content: {
        options: [
          "Parobkiem we wsi",
          "Wójtem Lipiec",
          "Najbogatszym gospodarzem we wsi",
          "Organistą",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Maciej Boryna to najbogatszy i najbardziej wpływowy gospodarz w Lipcach, posiadacz około trzydziestu morgów ziemi, uważany za pierwszego chłopa we wsi.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Jak umiera parobek Kuba w tomie \u201eJesień\u201d?",
      content: {
        options: [
          "Tonie w stawie podczas wichury",
          "Zostaje zabity przez borowego w lesie",
          "Wykrwawia się po próbie samodzielnej amputacji nogi",
          "Umiera na zapalenie płuc w stodole",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kuba, postrzelony w nogę przez borowego podczas kłusowania, ukrywał ranę. Gdy noga zaczęła gnić, próbował ją sam odciąć siekierą i wykrwawił się podczas wesela Boryny z Jagną.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Jaką nagrodę literacką otrzymał Reymont za powieść \u201eChłopi\u201d?",
      content: {
        options: [
          "Nagrodę Pulitzera",
          "Nagrodę Nobla",
          "Nagrodę Goncourtów",
          "Nagrodę Nike",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Władysław Reymont otrzymał literacką Nagrodę Nobla w 1924 roku za powieść \u201eChłopi\u201d.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Które z poniższych postaci są dziećmi Macieja Boryny?",
      content: {
        options: ["Antek", "Józka", "Mateusz", "Witek"],
      },
      correctAnswer: [0, 1],
      metadata: {
        explanation:
          "Antek i Józka to dzieci Macieja Boryny. Mateusz (Gołąb) to parobek pracujący na tartaku, a Witek to młody pastuszek-sierota, służący u Borynów.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Połącz tytuły tomów powieści z odpowiadającymi im porami roku:",
      content: {
        matchingType: "quotes_to_works",
        leftColumn: [
          { id: "A", text: "Tom I" },
          { id: "B", text: "Tom II" },
          { id: "C", text: "Tom III" },
          { id: "D", text: "Tom IV" },
        ],
        rightColumn: [
          { id: "1", text: "Wiosna" },
          { id: "2", text: "Jesień" },
          { id: "3", text: "Lato" },
          { id: "4", text: "Zima" },
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
          "Kolejność tomów odpowiada porom roku: Tom I \u2013 \u201eJesień\u201d, Tom II \u2013 \u201eZima\u201d, Tom III \u2013 \u201eWiosna\u201d, Tom IV \u2013 \u201eLato\u201d.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które z poniższych wydarzeń mają miejsce w tomie \u201eJesień\u201d?",
      content: {
        options: [
          "Wesele Macieja Boryny z Jagną",
          "Bitwa chłopów z dworem o las",
          "Śmierć parobka Kuby",
          "Wypędzenie Jagny z Lipiec",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "W \u201eJesieni\u201d odbywa się wesele Boryny z Jagną oraz umiera parobek Kuba. Bitwa o las następuje pod koniec \u201eZimy\u201d, a wypędzenie Jagny \u2013 w \u201eLecie\u201d.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Podaj imię i nazwisko młodej kobiety, którą poślubia stary Boryna w tomie \u201eJesień\u201d.",
      content: {},
      correctAnswer:
        "Jagna Dominikówna (Paczesiówna) \u2013 córka Dominikowej, uznawana za najpiękniejszą dziewczynę we wsi Lipce.",
      metadata: {
        explanation:
          "Jagna, zwana też Jagusią, jest córką Dominikowej. Boryna zapisuje jej sześć morgów ziemi przed ślubem, co staje się źródłem konfliktu z synem Antkiem.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Dlaczego Antek Boryna zostaje wygnany z ojcowskiego domu w tomie \u201eJesień\u201d?",
      content: {
        options: [
          "Kradnie zboże ze stodoły ojca",
          "Pobija się z ojcem o podział ziemi i dziedziczenie",
          "Odmawia pracy na gospodarstwie",
          "Publicznie znieważa Jagnę na weselu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konflikt o grunt eskaluje do bójki między Antkiem a Maciejem. Stary Boryna wypędza syna wraz z żoną Hanką i dziećmi z domu, co skazuje ich na biedę.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Na czym polega główne źródło utrzymania Hanki w tomie \u201eZima\u201d, po wygnaniu z ojcowego domu?",
      content: {
        options: [
          "Pracuje w karczmie u Jankiela",
          "Przędzie wełnę na zlecenie organiściny",
          "Handluje mlekiem od jałówki",
          "Szyje ubrania dla kobiet ze wsi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Organiścina daje Hance wełnę do oprzędzenia na kółku, a w zamian oferuje mąkę, kaszę i groch. Przędzenie staje się głównym źródłem utrzymania zubożałej rodziny.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Co Antek robi Mateuszowi we młynie pod koniec tomu \u201eZima\u201d?",
      content: {
        options: [
          "Wyzwa go publicznie na pojedynek na pięści",
          "Chwyta go za orzydle, wynosi z młynicy i wrzuca do rzeki",
          "Łamie mu rękę cepem podczas kłótni o drzewo",
          "Podpala mu budę przy tartaku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Antek, usłyszawszy jak Mateusz chełpi się przed chłopami, że bywał u Jagny w komorze, chwycił go za orzydle, wyniósł z młynicy i rzucił przez płot do rzeki, łamiąc mu żebra.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Kim jest Rocho w powieści \u201eChłopi\u201d?",
      content: {
        options: [
          "Borowym pilnującym dworskiego lasu",
          "Wędrownym pielgrzymem uczącym dzieci i opowiadającym historie",
          "Proboszczem parafii w Lipcach",
          "Bratem dziedzica z Woli",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rocho to wędrowny pielgrzym, który uczy lipeckie dzieci czytania i pisania, opowiada historie biblijne, baśnie ludowe i legendy o królach polskich, pełniąc rolę ludowego nauczyciela i moralisty.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Co jest główną przyczyną konfliktu między chłopami z Lipiec a dworem?",
      content: {
        options: [
          "Dziedzic odmówił płacenia za robotę najemną",
          "Dziedzic sprzedał las, do którego chłopi rościli sobie prawa",
          "Chłopi odmówili płacenia dziesięciny",
          "Dziedzic zabrał staw i zakazał łowienia ryb",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Spór dotyczy dworskiego lasu, do którego chłopi rościli prawa. Dziedzic sprzedał porębę na Wilczych Dołach, a potem zaczął wycinać las uważany przez gromadę za chłopski, co doprowadziło do zbrojnego starcia.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Antek po wygnaniu z domu ojca zamieszkał u (1). W tomie \u201eZima\u201d znalazł pracę na (2), gdzie rywalizował z (3).",
        gaps: [
          {
            id: 1,
            options: ["Kłęba", "Bylicy (ojca Hanki)", "organisty", "wójta"],
          },
          {
            id: 2,
            options: [
              "dworskim folwarku",
              "tartaku przy młynie",
              "plebanii",
              "kuźni kowala",
            ],
          },
          {
            id: 3,
            options: ["Pietrkiem", "Mateuszem", "Szymkiem", "Frankiem"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Antek z rodziną zamieszkał w ruderze u Bylicy, ojca Hanki. Znalazł pracę na tartaku przy młynie, gdzie brygadzistą był Mateusz, z którym nieustannie rywalizował.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Połącz postacie z ich charakterystycznymi cechami lub funkcjami:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Jagustynka" },
          { id: "B", text: "Jambroży" },
          { id: "C", text: "Jankiel" },
          { id: "D", text: "Kowal" },
        ],
        rightColumn: [
          { id: "1", text: "Karczmarz żydowski, pożycza na borg" },
          { id: "2", text: "Kościelny, pijak, opowiada ucieszne historie" },
          { id: "3", text: "Zięć Boryny, knuje i intryguje" },
          { id: "4", text: "Stara kobieta, plotkarka i judzicielka" },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 1],
        [2, 0],
        [3, 2],
      ],
      metadata: {
        explanation:
          "Jagustynka to zgorzkniała staruszka, wygoniona przez dzieci z własnego gospodarstwa, wszędzie roznosi plotki i judzi. Jambroży to zakrystian-pijak. Jankiel prowadzi wiejską karczmę. Kowal to zięć Boryny, który intryguje, by uzyskać jak najwięcej z majątku teścia.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które z poniższych obrzędów i świąt zostały szczegółowo opisane w powieści?",
      content: {
        options: [
          "Wigilia Bożego Narodzenia z dzieleniem opłatka",
          "Pasterka i kolędowanie",
          "Dożynki letnie z wieńcem żniwnym",
          "Zaduszki z odwiedzaniem grobów",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W powieści szczegółowo opisano Wigilię z dzieleniem się opłatkiem i dawaniem go bydlętom, pasterkę, kolędowanie po domach z opłatkami oraz Zaduszki na cmentarzu. Dożynki nie są opisane tak szczegółowo jako obrzęd ceremonialny.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Opisz w 2-3 zdaniach, jak zmienia się sytuacja materialna Hanki po wygnaniu z domu Borynów.",
      content: {
        hints: ["sprzedaż krowy", "praca u organiściny", "bieda i głód"],
      },
      correctAnswer:
        "Hanka z rodziną popada w skrajną biedę. Musi sprzedać krowę Żydom za czterdzieści rubli, żeby mieć pieniądze na przeżycie zimy. Utrzymuje się głównie z przędzenia wełny dla organiściny, jedząc często same ziemniaki z solą.",
      metadata: {
        explanation:
          "Scena sprzedaży krowy jest jedną z najbardziej przejmujących w tomie \u201eZima\u201d \u2013 Hanka płacze, odprowadzając bydlątko, a dzieci lamentują. Bieda zmusza ją do coraz większej zaradności.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Kim jest pan Jacek z Woli i dlaczego odwiedza Borynów?",
      content: {},
      correctAnswer:
        "Pan Jacek to brat dziedzica z Woli, który wrócił z dalekich krajów. Odwiedza Borynów, bo szuka parobka imieniem Kuba (Jakub Socha), który uratował mu życie na wojnie. Dowiaduje się, że Kuba już nie żyje i odwiedza jego grób.",
      metadata: {
        explanation:
          "Postać pana Jacka łączy wątek szlachecki z chłopskim. Jego poszukiwanie Kuby podkreśla ludzką wdzięczność ponad podziałami stanowymi. Boryna podejrzewa go o szpiegowanie na rzecz dworu.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Wyjaśnij, jak poniższe hasło epoki realizowane jest w \u201eChłopach\u201d:",
      content: {
        slogan: "Mitologizacja rzeczywistości",
      },
      correctAnswer:
        "Mitologizacja w \u201eChłopach\u201d polega na nadawaniu życiu wiejskiemu wymiaru ponadczasowego i uniwersalnego. Reymont upodabnia losy bohaterów do mitów (np. Jagna jako Helena Trojańska, Boryna jako Menelaos, Antek jako Parys), a cykliczna kompozycja oparta na porach roku nawiązuje do odwiecznego rytmu natury.",
      metadata: {
        explanation:
          "Zabieg mitologizacji był jednym z kluczowych elementów artyzmu powieści, docenionych przez Komitet Noblowski. Dzięki niemu wiejska historia zyskuje wymiar epicki i archetypowy.",
      },
    },

    // ===== DIFFICULTY 2 — MATCHING (dodatkowe, by urozmaicić) =====

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "W wigilijnej scenie tomu \u201eZima\u201d Rocho czyta głośno historię o narodzeniu Jezusa, a domownicy słuchają w głębokim wzruszeniu. Jaką funkcję pełni ta scena w kontekście kompozycji powieści?",
      content: {
        options: [
          "Służy wyłącznie prezentacji obrzędowości świątecznej",
          "Buduje kontrast między sacrum religijnego misterium a profanum codziennych konfliktów w rodzinie Borynów",
          "Ma na celu wyłącznie charakterystykę Rocha jako postaci",
          "Pełni funkcję retardacyjną, opóźniając kulminację konfliktu Antka z ojcem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena wigilijna zestawia świętą atmosferę narodzin Chrystusa z niedawnym wygnaniem Antka i narastającą tragedią rodzinną. Sacrum obrzędu kontrastuje z ludzkim grzechem, zawistością i konfliktem, co pogłębia wymowę moralno-etyczną powieści.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Przeczytaj fragment opisu nadejścia zimy: \u201eNadchodziła zima\u2026 jeszcze się barowała z jesienią i porykujący tłukła po sinych dalach jako ten zwierz srogi i głodny\u201d. Jaki środek stylistyczny dominuje w tym fragmencie?",
      content: {
        options: [
          "Hiperbola",
          "Animizacja i personifikacja",
          "Synekdocha",
          "Litota",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zima jest przedstawiona jako żywa istota \u2013 zwierz, który się \u201ebaruje\u201d, \u201eporywa\u201d i \u201ewżera się kłami\u201d w świat. To animizacja (nadanie cech zwierzęcych) i personifikacja (nadanie ludzkich zachowań). Ten zabieg jest typowy dla stylu narracyjnego Reymonta.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Na czym polega wewnętrzny dramat Jagny w tomie \u201eZima\u201d, gdy Antek prosi ją o wyjście za bróg?",
      content: {
        options: [
          "Jagna nie odczuwa żadnych rozterek moralnych i chętnie idzie na spotkanie",
          "Jagna kocha Antka, ale jednocześnie boi się grzechu śmiertelnego i odkrycia przez męża",
          "Jagna nie kocha Antka i wychodzi na spotkanie wyłącznie ze strachu przed nim",
          "Jagna jest całkowicie obojętna i wychodzi z nudów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Reymont pokazuje wewnętrzne rozdarcie Jagny: z jednej strony pożąda Antka i tęskni za nim, z drugiej \u2013 pamięta słowa księdza o grzechu śmiertelnym, boi się kary boskiej i odkrycia. Jej wahania trwają przez wiele dni, zanim wreszcie ulega.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Boryna w tomie \u201eZima\u201d początkowo nie przyłącza się do gromady w sprawie obrony lasu. Jaki jest prawdziwy powód jego wstrzemięźliwości?",
      content: {
        options: [
          "Jest całkowicie obojętny na sprawy lasu, bo go nie dotyczy",
          "Kalkuluje politycznie \u2013 chce zachować dystans od obu stron, by później zyskać lepszą pozycję negocjacyjną",
          "Boi się represji ze strony strażników i sądów",
          "Jest zbyt chory, by uczestniczyć w naradach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Boryna jest doświadczonym i przebiegłym politykiem wiejskim. Nie przyłącza się od razu, bo jest obrażony, że radzili bez niego u młynarza, ale też kalkuluje, że warto poczekać i nie wiązać się z żadną stroną zbyt wcześnie. W końcu jednak staje na czele gromady.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które z poniższych cech charakteryzują język narracji w \u201eChłopach\u201d Reymonta?",
      content: {
        options: [
          "Stylizacja na gwarę ludową, łączącą elementy różnych dialektów",
          "Konsekwentne stosowanie języka naukowego i terminologii socjologicznej",
          "Poetyckie, młodopolskie opisy przyrody z personifikacjami i animizacjami",
          "Narracja w pierwszej osobie prowadzona przez Macieja Borynę",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Reymont stworzył oryginalny język literacki łączący stylizację gwarową (elementy gwary łowickiej, piotrowskiej, tomaszowskiej) z poetycką, młodopolską narracją pełną personifikacji, animizacji i porównań homeryckich. Narracja jest trzecioosobowa, prowadzona przez kilka typów narratora.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które z poniższych motywów literackich są obecne w powieści \u201eChłopi\u201d?",
      content: {
        options: [
          "Motyw konfliktu pokoleń (ojciec kontra syn)",
          "Motyw kobiety fatalnej",
          "Motyw podróży inicjacyjnej bohatera w odległe kraje",
          "Motyw cykliczności natury i ludzkiego życia",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kluczowe motywy to: konflikt pokoleń (Boryna kontra Antek o ziemię i Jagnę), kobieta fatalna (Jagna, której uroda powoduje nieszczęście mężczyzn), cykliczność natury (kompozycja oparta na porach roku). Nie ma motywu podróży inicjacyjnej w odległe kraje.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które stwierdzenia o hierarchii społecznej w Lipcach są prawdziwe na podstawie powieści?",
      content: {
        options: [
          "Pozycję we wsi wyznaczał przede wszystkim majątek ziemski",
          "Miejsce w kościele odzwierciedlało pozycję społeczną \u2013 bogaci siedzieli z przodu",
          "Komornicy mieli równe prawa głosu z gospodarzami w sprawach gromady",
          "Kowal, młynarz i wójt tworzyli nieformalną elitę współpracującą z dworem",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Hierarchia w Lipcach opierała się na posiadaniu ziemi. Miejsca w kościele odzwierciedlały status \u2013 bogaci z przodu, biedni z tyłu. Kowal, młynarz i wójt tworzyli grupę współpracującą z dworem. Komornicy byli najniżej w hierarchii i nie mieli realnego wpływu na decyzje gromady.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Władysław Stanisław Reymont",
          title: "Chłopi",
          text: "Czuł się jako to drzewo rodne, obłamane przez wicher i na zagładę skazane, a schnące powoli w samym środku kwitnącego, zdrowego sadu.",
          bookReference: "Tom II, Zima, rozdział III",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wskaż środek stylistyczny zastosowany w tym fragmencie i nazwij go.",
            minWords: 10,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Wyjaśnij, jak to porównanie oddaje sytuację psychiczną Antka w tomie \u201eZima\u201d.",
            minWords: 20,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Porównanie rozbudowane (homeryckie) \u2013 Antek porównany do drzewa obłamanego przez wicher, schnącego w środku zdrowego sadu. 2) Porównanie oddaje jego samotność i wyobcowanie ze wspólnoty wiejskiej \u2013 wieś żyje normalnie wokół niego, ale on czuje się wykluczony, skazany na zagładę, odcięty od korzeni (ziemi, domu, rodziny ojca).",
      metadata: {
        explanation:
          "Reymont często stosuje porównania homeryckie, charakterystyczne dla epopei. To porównanie jest kluczowe dla zrozumienia wewnętrznego dramatu Antka \u2013 jego poczucia wykorzenienia i odrzucenia przez społeczność.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Odpowiedz na pytania dotyczące sceny wigilijnej u Borynów:",
      content: {
        steps: [
          {
            id: 1,
            instruction: "Co robi Jagna z opłatkiem w oborze i dlaczego?",
          },
          {
            id: 2,
            instruction:
              "Dlaczego Witek i Józka idą nocą do obory rozmawiać z krowami?",
          },
          {
            id: 3,
            instruction: "Jak reagują krowy i jaki wniosek wyciągają dzieci?",
          },
        ],
      },
      correctAnswer:
        "1) Jagna łamie opłatek na części i dzieli między krowami, kreśląc krzyż między ich rogami, bo w noc Narodzenia bydlęta rozumieją ludzką mowę. 2) Witek i Józka wierzą, że w Wigilię krowy potrafią mówić po ludzku \u2013 chcą to usłyszeć. 3) Krowy nie odpowiadają, a dzieci dochodzą do wniosku, że to dlatego, iż same są grzeszne \u2013 wyznają przed sobą swoje winy i płaczą.",
      metadata: {
        explanation:
          "Ta scena łączy realizm z ludową religijnością i wiarą w cuda. Pokazuje głębokie przenikanie wiary w codzienność chłopów, a reakcja dzieci jest jednocześnie wzruszająca i humorystyczna.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Wyjaśnij, dlaczego Boryna podpala bróg, w którym ukrywają się Antek i Jagna.",
      content: {
        instruction:
          "W odpowiedzi uwzględnij motywację Boryny, kontekst wydarzeń oraz konsekwencje tego czynu.",
      },
      correctAnswer:
        "Boryna od dawna podejrzewał Jagnę o zdradę z Antkiem. Stróżował nocami, znalazł ślady przy przełazie i zapaskę Jagny pod brogiem. Gdy wreszcie przyłapał ich razem w brogu, podpalił go w akcie zemsty i desperacji. Konsekwencje: Jagna została wygnana do matki, Antek uciekł, a bróg spłonął. Stary nie zezwał jednak na syna przed strażnikami.",
      metadata: {
        explanation:
          "Scena pożaru to kulminacja tomu \u201eZima\u201d. Boryna, mimo wściekłości, nie zeznaje przeciw Antkowi przed pisarzem i strażnikami, co pokazuje, że ojcowska więź jest silniejsza od żądzy zemsty.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Rola przyrody w powieści \u201eChłopi\u201d \u2013 na podstawie tomów \u201eJesień\u201d i \u201eZima\u201d",
        requirements: [
          "Wskaż funkcję opisów przyrody w kompozycji powieści",
          "Podaj przykłady, jak natura odzwierciedla stany emocjonalne bohaterów",
          "Odwołaj się do cech epopei widocznych w opisach natury",
          "80-120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Przyroda w \u201eChłopach\u201d pełni funkcję strukturalną (podział na pory roku), psychologiczną (odzwierciedla nastroje bohaterów) i estetyczną (poetyckie opisy bliskie eposowi). Jesienne opisy nadchodzących mroków towarzyszą narastającemu konfliktowi rodzinnemu, zaś zimowe śnieżyce i wichury odpowiadają wewnętrznej burzy Antka. Rozbudowane personifikacje natury (zima jako \u201ezwierz srogi\u201d) nawiązują do porównań homeryckich, typowych dla epopei. Przyroda jest nie tylko tłem, ale aktywnym uczestnikiem życia wsi.",
      metadata: {
        explanation:
          "Opisy przyrody u Reymonta łączą trzy funkcje: kompozycyjną, psychologiczną i gatunkową. Są kluczowe dla uznania \u201eChłopów\u201d za młodopolską epopeję.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Badacze porównują układ fabularny \u201eChłopów\u201d do mitu o wojnie trojańskiej: Boryna to Menelaos, Jagna to Helena, a Antek to Parys. Które stwierdzenie najlepiej opisuje funkcję tego zabiegu?",
      content: {
        options: [
          "Reymont chciał udowodnić, że chłopi znali mitologię grecką",
          "Mitologizacja nadaje wiejskiemu dramatowi wymiar uniwersalny i ponadczasowy, wpisując go w archetypowe wzorce ludzkich namiętności",
          "Analogia trojańska jest przypadkowa i wynika z ograniczonej liczby możliwych schematów fabularnych",
          "Zabieg ten miał na celu wyłącznie zaimponowanie Komitetowi Noblowskiemu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mitologizacja to kluczowy zabieg artystyczny w \u201eChłopach\u201d. Nadając życiu wsi strukturę mitu, Reymont podnosi je do rangi opowieści o wiecznych, ponadczasowych konfliktach ludzkich: zazdrości, pożądaniu, walce o władzę. Na analogię trojańską zwrócił uwagę m.in. szwedzki krytyk Book przy okazji Nobla.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Hanka w tomie \u201eZima\u201d przechodzi wyraźną przemianę \u2013 z pokornej, lękliwej kobiety staje się osobą twardą i zaradną. Który moment jest punktem zwrotnym tej przemiany?",
      content: {
        options: [
          "Chwila, gdy Antek publicznie tańczy z Jagną w karczmie na Trzy Króle",
          "Scena sprzedaży krowy, w której Hanka bierze pieniądze w swoje ręce",
          "Moment, gdy dowiaduje się od młynarza o romansie Antka z Jagną i postanawia działać samodzielnie",
          "Spotkanie z Boryną przy powrocie z lasu, gdy ojciec proponuje jej pojednanie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Punktem zwrotnym jest wiadomość od młynarza o romansie Antka z Jagną. Hanka spędza noc przy kółku przędąc i rozmyślając, po czym budzi się \u201espokojniejsza\u201d \u2013 postanawia sama zadbać o rodzinę. Jednakże pełna krystalizacja nowej Hanki następuje w finale \u201eZimy\u201d po pożarze.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Dlaczego Reymont celowo nie podaje dokładnej daty rocznej akcji powieści?",
      content: {
        options: [
          "Nie znał realiów historycznych wystarczająco dobrze",
          "Cenzura carska zabraniała podawania dat w powieściach chłopskich",
          "Brak konkretnej daty służy uniwersalizacji i mitologizacji \u2013 nadaje wydarzeniom charakter ponadczasowy i cykliczny",
          "Była to moda literacka epoki Młodej Polski",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Celowe pominięcie dat to zabieg artystyczny. Dzięki niemu życie wsi nabiera wymiaru pozahistorycznego i mitycznego \u2013 nie jest to historia jednego roku, ale wieczny cykl, powtarzający się od pokoleń. Wzmacnia to epicki charakter dzieła.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które cechy epopei można odnaleźć w powieści \u201eChłopi\u201d Reymonta?",
      content: {
        options: [
          "Bohater zbiorowy \u2013 społeczność wiejska jako główny podmiot narracji",
          "Rozbudowane opisy przyrody z porównaniami homeryckimi",
          "Inwokacja do Muzy na początku każdego tomu",
          "Panoramiczny obraz wszystkich warstw społecznych danej wspólnoty",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Cechy epopei w \u201eChłopach\u201d to: bohater zbiorowy (cała społeczność Lipiec), rozbudowane opisy przyrody z porównaniami homeryckimi, panoramiczny obraz społeczności z jej rozwarstwieniem. Nie ma inwokacji do Muzy \u2013 to nie jest epos wierszowany.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które z poniższych interpretacji postaci Jagny są uzasadnione treścią powieści?",
      content: {
        options: [
          "Jagna jako kobieta fatalna \u2013 jej uroda jest źródłem nieszczęść mężczyzn",
          "Jagna jako ofiara patriarchalnego systemu, wydana za mąż wbrew woli",
          "Jagna jako świadoma manipulatorka, celowo prowokująca konflikty",
          "Jagna jako postać tragiczna, której wrażliwość i piękno skazują ją na wykluczenie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Jagna łączy cechy femme fatale (jej uroda pociąga mężczyzn i prowadzi do tragedii), ofiary (wydano ją za starego Borynę bez pytania o zdanie) i postaci tragicznej (jej wrażliwość widoczna w scenie u Kłębów, gdy płacze nad historiami Rocha, kontrastuje z okrucieństwem, jakiego doświadczy). Nie jest natomiast świadomą manipulatorką.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Porównaj postawy Boryny i Antka wobec ziemi i majątku. Co ich łączy, a co dzieli?",
      content: {},
      correctAnswer:
        "Obaj traktują ziemię jako najwyższą wartość i miarę pozycji społecznej \u2013 to ich łączy. Dzieli ich natomiast sposób walki o nią: Boryna działa rozważnie, cierpliwie i politycznie (kalkuluje, zawiera sojusze, manipuluje), natomiast Antek jest impulsywny, kieruje się emocjami i sięga po przemoc. Ich konflikt jest w istocie konfliktem dwóch pokoleń, wyznających te same wartości, ale stosujących różne metody.",
      metadata: {
        explanation:
          "Konflikt Boryny z Antkiem to centralny wątek powieści. Paradoksalnie obaj są do siebie podobni w uporze i dumie, ale ich metody działania są sprzeczne, co czyni pojednanie niemal niemożliwym.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Władysław Stanisław Reymont",
          title: "Chłopi",
          text: "Sprawiedliwie mówił! Sprawiedliwie! \u2014 szeptał z najgłębszą pokorą, pełnią serca skruszonego, strachem śmiertelnym przejęty i tą mocą wsi potężną.",
          bookReference: "Tom II, Zima, rozdział XII",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Określ kontekst tego fragmentu \u2013 do czyjego głosu odnosi się Antek i co się wcześniej wydarzyło.",
            minWords: 30,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Wyjaśnij, co oznacza sformułowanie \u201emocą wsi potężną\u201d i jak to wiąże się z motywem wspólnoty.",
            minWords: 30,
            maxPoints: 2,
          },
        ],
      },
      correctAnswer:
        "1) Antek odnosi się do słów księdza, który na nieszporach publicznie napiętnował go z ambony za romans z macochą i podpalenie brokgu. Po tym kazaniu Antek próbuje wrócić do ludzi, ale wszyscy go unikają i odwracają się od niego. 2) \u201eMoc wsi potężna\u201d to siła opinii publicznej, normy moralnej i wspólnoty, która potrafi wykluczyć jednostkę naruszającą jej zasady. Antek, mimo fizycznej siły, jest bezsilny wobec zbiorowego wyroku społeczności \u2013 wieś jako kolektyw okazuje się silniejsza od najsilniejszego indywiduum.",
      metadata: {
        explanation:
          "Ten fragment ukazuje kluczowy moment w rozwoju Antka \u2013 chwilę skruchy i zrozumienia potęgi wspólnoty. Motyw wsi jako organizmu zbiorowego, mającego moc karania i nagradzania, jest jednym z centralnych tematów powieści.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Jaką rolę pełni scena bitwy chłopów z dworskimi o las na końcu tomu \u201eZima\u201d? Jak wpływa na dalsze losy bohaterów?",
      content: {},
      correctAnswer:
        "Scena bitwy o las jest kulminacją wątku społecznego powieści. Boryna prowadzi gromadę do obrony chłopskiego boru, pokazując siłę wspólnoty wiejskiej. Borowy ciężko rani Borynę kolbą fuzji, zaś Antek zabija borowego, broniąc ojca. Ten akt jednocześnie zbliża ojca z synem (Boryna rozpoznaje Antka i mówi: \u201eTyżeś to, synu?\u201d) i prowadzi do uwięzienia Antka za zabójstwo. Bitwa zmienia układ sił we wsi na całą Wiosnę i Lato.",
      metadata: {
        explanation:
          "Scena bitwy łączy wątek społeczny (walka o las) z rodzinnym (pojednanie ojca z synem). To moment katharsis w ich relacji, choć okupiony straszną ceną.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Obraz kobiety w \u201eChłopach\u201d \u2013 porównaj postawy Hanki i Jagny",
        requirements: [
          "Scharakteryzuj stosunek obu kobiet do pracy, rodziny i wspólnoty",
          "Wskaż, która z nich lepiej wpisuje się w wiejski system wartości i dlaczego",
          "Odwołaj się do konkretnych scen z powieści",
          "120-160 słów",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "Hanka i Jagna reprezentują dwa przeciwstawne wzorce kobiecości. Hanka to typ kobiety pracującej, poświęcającej się rodzinie, zaradnej w biedzie (przędzie, chodzi po drewno, targuje się z Żydami). Jagna to kobieta-natura, piękna, zmysłowa, wrażliwa na sztukę (wzrusza się opowieściami Rocha, wystrzyga cudowne ozdoby), ale nieprzystosowana do ciężkiego życia chłopskiego. Wspólnota nagradza Hankę (odzyskuje szacunek wsi i dom Borynów), a Jagnę karze (zostaje publicznie wygnana). Porównanie ukazuje bezwzględność wiejskiego systemu wartości, w którym użyteczność i podporządkowanie normom liczą się bardziej niż indywidualna wrażliwość.",
      metadata: {
        explanation:
          "Hanka i Jagna to dwie najważniejsze postacie kobiece powieści, reprezentujące archetyp matki-żywicielki i femme fatale. Ich losy pokazują, jak wiejska społeczność nagradza konformizm, a karze indywidualizm.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic: "Ziemia jako wartość najwyższa w świecie \u201eChłopów\u201d",
        requirements: [
          "Wykaż, jak posiadanie ziemi determinuje pozycję społeczną, relacje rodzinne i decyzje bohaterów",
          "Podaj co najmniej trzy przykłady z fabuły",
          "Odnieś się do kontekstu historycznego (uwłaszczenie, stosunki popańszczyźniane)",
          "100-140 słów",
        ],
        wordLimit: { min: 100, max: 140 },
      },
      correctAnswer:
        "Ziemia w \u201eChłopach\u201d jest najwyższą wartością \u2013 wyznacza hierarchię (Boryna jest pierwszy, bo ma najwięcej morgów), decyduje o małżeństwach (Boryna zapisuje 6 morgów Jagnie jako warunek ślubu), powoduje konflikty (Antek walczy z ojcem o grunt). W kontekście popańszczyźnianym ziemia jest symbolem wolności i godności \u2013 chłopi, którzy niedawno ją uzyskali, bronią jej z desperacją (bitwa o las). Brak ziemi oznacza wykluczenie społeczne \u2013 komornicy jak Bylica to ludzie \u201ebez nóg\u201d, skazani na tułaczkę. Hasło Dominikowej: \u201eCzłowiek bez gruntu to jak bez nóg\u201d streszcza tę filozofię.",
      metadata: {
        explanation:
          "Motyw ziemi przenika całą powieść i łączy wątki osobiste z społecznymi. W kontekście historycznym (kilkadziesiąt lat po uwłaszczeniu) ziemia zyskuje dodatkowy wymiar wolnościowy.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Konflikt pokoleń jako siła napędowa fabuły. Omów zagadnienie na podstawie \u201eChłopów\u201d Władysława Stanisława Reymonta. W swojej odpowiedzi uwzględnij również wybrany kontekst.",
      content: {
        thesis:
          "Konflikt pokoleń jako siła napędowa fabuły w \u201eChłopach\u201d",
        structure: {
          introduction:
            "Przedstaw tezę i zarysuj istotę konfliktu Boryna\u2013Antek",
          arguments_for:
            "Omów przyczyny konfliktu (ziemia, Jagna, władza), jego eskalację (bójka, wygnanie, pożar) i rozwiązanie (scena w lesie)",
          arguments_against:
            "Rozważ, czy konflikt ten ma wymiar wyłącznie pokoleniowy, czy też jest sporem o wartości, władzę i tożsamość",
          conclusion:
            "Sformułuj wniosek o uniwersalności tego konfliktu, odwołaj się do wybranego kontekstu",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej trzech scen z powieści",
          "Odwołanie do wybranego kontekstu (np. \u201ePan Tadeusz\u201d, \u201eZbrodnia i kara\u201d, tragedia antyczna)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Wskazać wielowarstwowość konfliktu (nie tylko pokoleniowy, ale też o ziemię, kobietę, władzę). 2) Omówić eskalację: kłótnia o grunt \u2192 bójka \u2192 wygnanie \u2192 romans z Jagną \u2192 pożar \u2192 bitwa o las \u2192 pojednanie. 3) Porównać z innym kontekstem, np. konfliktem pokoleń w \u201ePanu Tadeuszu\u201d (Soplica vs. Horeszko) lub w tragedii antycznej (Edyp). 4) Wyciągnąć wniosek o uniwersalności: walka ojca z synem to archetyp obecny w kulturze od starożytności.",
      metadata: {
        explanation:
          "Temat konfliktu pokoleń jest jednym z najczęściej pojawiających się na maturze w odniesieniu do \u201eChłopów\u201d. Kluczowe jest uchwycenie wielowymiarowości sporu Boryny z Antkiem.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Badacze wyróżniają w \u201eChłopach\u201d kilka typów narratora. Który opis najdokładniej oddaje specyfikę narracji w powieści?",
      content: {
        options: [
          "Jeden wszechwiedzący narrator inteligencki, konsekwentnie opisujący wieś z zewnętrznej perspektywy",
          "Narracja pierwszoosobowa prowadzona na przemian przez Borynę i Antka",
          "Współistnienie co najmniej dwóch typów narratora: chłopskiego gawędziarza (stylizacja gwarowa, punkt widzenia od wewnątrz wsi) i narratora młodopolskiego (poetyckie opisy natury, perspektywa zewnętrzna)",
          "Obiektywny narrator behawiorystyczny, rejestrujący wyłącznie zachowania bez wglądu w psychikę postaci",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Nowsza krytyka literacka (m.in. Krzyżanowski, Rzeuska) wyróżnia w \u201eChłopach\u201d współistnienie narratora chłopskiego (gawędziarskiego, posługującego się gwarą i patrzącego od wewnątrz wsi) oraz narratora inteligencko-młodopolskiego (poetyckie opisy natury, perspektywa zewnętrzna). Niektórzy badacze wyodrębniają jeszcze trzeci typ \u2013 realistycznego obserwatora.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Śmierć Boryny w tomie \u201eWiosna\u201d \u2013 umierający stary wychodzi na pole i wykonuje gest siejby. Jak najgłębiej interpretować tę scenę?",
      content: {
        options: [
          "To realistyczny opis śmierci starca w malignie, nie wymagający głębszej interpretacji",
          "To scena naturalistyczna \u2013 odruch warunkowy wynikający z wieloletniego wykonywania tych samych czynności",
          "To scena łącząca naturalizm z mitem: instynkt biologiczny splata się z sacrum \u2013 śmierć-siewba symbolizuje cykliczność życia, odrodzenie i powrót do ziemi matki",
          "To scena wyłącznie symboliczna, niemożliwa w realistycznym porządku powieści",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Scena śmierci Boryny jest uważana za arcydzieło literackie, bo łączy trzy warstwy: naturalistyczną (instynkt, odruch warunkowy), realistyczną (umierający starzec wychodzi na pole) i mityczną (siejba jako symbol odrodzenia i wiecznego trwania). To kwintesencja zabiegu mitologizacji u Reymonta.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Które z poniższych porównań \u201eChłopów\u201d z \u201ePanem Tadeuszem\u201d Mickiewicza są merytorycznie uzasadnione?",
      content: {
        options: [
          "Oba dzieła ukazują panoramiczny obraz zamkniętej wspólnoty w przełomowym momencie jej dziejów",
          "Oba dzieła idealizują wiejską rzeczywistość, unikając przedstawiania jej ciemnych stron",
          "W obu dziełach rozbudowane opisy przyrody pełnią funkcję nie tylko estetyczną, ale i symboliczną",
          "Oba dzieła łączą wątek prywatny (miłosny) z publicznym (walka o wolność/prawa)",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Oba dzieła to panoramiczne opowieści o zamkniętej wspólnocie, z rozbudowanymi opisami natury i splotem wątku prywatnego z publicznym. Jednak Reymont NIE idealizuje wsi \u2013 pokazuje biedę, przesądy, okrucieństwo i brutalność, co odróżnia go od Mickiewicza. To kluczowa różnica między epopeją romantyczną a młodopolską.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Dlaczego powieść \u201eChłopi\u201d nazywana jest \u201emłodopolską epopeją chłopską\u201d? Wskaż cechy gatunkowe epopei obecne w dziele i wyjaśnij, w czym powieść Reymonta odbiega od klasycznego wzorca eposu.",
      content: {},
      correctAnswer:
        "Cechy epopei: bohater zbiorowy (społeczność Lipiec), panoramiczny obraz życia wspólnoty, rozbudowane opisy przyrody z porównaniami homeryckimi, wielowątkowość, obecność postaci przewodnich (Boryna jako \u201eksiążę achajski\u201d), opowieści w opowieści (historie Rocha). Odstępstwa: proza zamiast wiersza, brak inwokacji, elementy naturalizmu (instynkty, fizjologia), brak heroizacji \u2013 Reymont ukazuje też rubaszność, okrucieństwo i małostkowość chłopów. \u201eChłopi\u201d to epopeja zmodernizowana, łącząca tradycję gatunkową z młodopolskim oczarowaniem naturą i symbolizmem.",
      metadata: {
        explanation:
          "Pytanie wymaga syntezy wiedzy o gatunku epopei i umiejętności analizy strukturalnej. Kluczowe jest uchwycenie napięcia między tradycyjnymi cechami eposu a nowoczesnymi elementami narracji Reymonta.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Scena wieczornicy u Kłębów (tom \u201eZima\u201d, rozdział X) jest jedną z najważniejszych w powieści pod względem artystycznym. Wyjaśnij, jaką funkcję pełnią opowieści Rocha i dlaczego Jagna reaguje na nie ze szczególnym wzruszeniem.",
      content: {},
      correctAnswer:
        "Opowieści Rocha pełnią kilka funkcji: 1) Kulturotwórczą \u2013 przekazują wspólne dziedzictwo (legendy, baśnie, historie o królach), budując tożsamość zbiorową. 2) Dydaktyczną \u2013 uczą moralności (historia o koniu ukaranym za zabicie gospodarza). 3) Estetyczną \u2013 wprowadzają świat cudowności i mitu do szarej codzienności. 4) Psychologiczną \u2013 pozwalają bohaterom przeżyć katharsis. Jagna reaguje ze szczególnym wzruszeniem, bo jest osobą o wyjątkowej wrażliwości estetycznej (wystrzyga ozdoby, płacze nad opowieściami). Paradoksalnie, ta wrażliwość czyni ją nieprzystosowaną do brutalnego życia wsi, co zapowiada jej tragiczny los.",
      metadata: {
        explanation:
          "Scena wieczornicy to moment, w którym Reymont ukazuje duchową stronę życia chłopskiego \u2013 potrzebę piękna, marzenia i sacrum. Reakcja Jagny odsłania jej głęboką wrażliwość, kontrastującą z późniejszym okrucieństwem wsi wobec niej.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Władysław Stanisław Reymont",
          title: "Chłopi",
          text: "Bo juścić materii nie brakowało, jeśli bowiem Antka nie zabrali, to nie on spalił, więc kto? \u2014 Nie Jagna przecież, nikt by temu wiary nie dał, nie stary; taka myśl ani postała komu w głowie! Błądzili przeto kieby po omacku nie mogąc w żaden sposób znaleźć wyjścia z męczącej zagadki\u2026 we wszystkich chałupach gadali o tym, a nikto prawdy się nie dowiedział \u2026 natomiast wzniesła się sroga niechęć ku Jagnie i dochodziła aż do zgrozy strasznego, śmiertelnego grzechu.",
          bookReference: "Tom II, Zima, rozdział XII",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wyjaśnij mechanizm społeczny widoczny w tym fragmencie \u2013 dlaczego wieś kieruje gniew właśnie na Jagnę, mimo że nie ma dowodów jej winy.",
            minWords: 50,
            maxPoints: 3,
          },
          {
            id: 2,
            instruction:
              "Odwołaj się do całości powieści i porównaj ten mechanizm z fenomenem kozła ofiarnego.",
            minWords: 40,
            maxPoints: 2,
          },
        ],
        requirements: [
          "Odwołaj się bezpośrednio do cytowanego fragmentu",
          "Uwzględnij kontekst kulturowy lub antropologiczny",
          "Łącznie 120-170 słów",
        ],
        wordLimit: { min: 120, max: 170 },
      },
      correctAnswer:
        "1) Wieś nie jest w stanie ustalić sprawcy pożaru, ale potrzebuje winnego. Jagna staje się obiektem zbiorowego gniewu nie dlatego, że jest winna podpalenia, lecz dlatego, że od dawna narusza normy moralne wspólnoty (romans z pasierbem, brak szacunku dla męża). Mechanizm ten polega na kanalizowaniu rozproszonych lęków i frustracji na jednostkę już wcześniej naznaczoną. 2) To klasyczny mechanizm kozła ofiarnego (opisany przez René Girarda): wspólnota w kryzysie szuka ofiary, która skupi na sobie zbiorową agresję, przywracając ład. Wypędzenie Jagny w \u201eLecie\u201d jest tego ostatecznym aktem \u2013 wieś dosłownie wyrzuca \u201egrzesznicę\u201d, by oczyścić się z zła.",
      metadata: {
        explanation:
          "Ten fragment zapowiada los Jagny w tomie \u201eLato\u201d \u2013 publiczne wypędzenie ze wsi. Analiza mechanizmu kozła ofiarnego pozwala na głęboką interpretację antropologiczną powieści Reymonta.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "YOUNG_POLAND",
      work: "Chłopi",
      question:
        "Czy \u201eChłopi\u201d Reymonta to apoteoza życia wiejskiego, czy jego krytyka? Napisz rozprawkę, w której rozważysz obie interpretacje.",
      content: {
        thesis:
          "\u201eChłopi\u201d \u2013 apoteoza czy krytyka życia wiejskiego?",
        structure: {
          introduction: "Zarysuj problem dwuznaczności wizji wsi u Reymonta",
          arguments_for:
            "Argumenty za apoteozą: piękno opisów przyrody, siła tradycji i wspólnoty, mitologizacja, sakralizacja pracy na roli",
          arguments_against:
            "Argumenty za krytyką: okrucieństwo wobec Jagny, przemoc domowa, pijaństwo, chciwość, ciemnota, degradacja jednostki",
          conclusion:
            "Sformułuj własne stanowisko \u2013 np. że powieść łączy oba wymiary, tworząc ambiwalentny, pełny obraz",
        },
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do co najmniej czterech scen lub postaci z powieści",
          "Odwołanie do kontekstu literackiego (np. \u201eWesele\u201d Wyspiańskiego, \u201eZiemia\u201d Zoli, \u201ePan Tadeusz\u201d)",
          "Poprawna argumentacja i logiczna struktura",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Przedstawić argumenty za apoteozą (piękno natury, siła tradycji, rytm pór roku, scena wieczornicy u Kłębów, scena śmierci-siejby Boryny). 2) Przedstawić argumenty za krytyką (bicie Jagny, wygnanie jej ze wsi, alkoholizm, chciwość Boryny i kowala, ciemnota). 3) Dojść do wniosku, że Reymont tworzy obraz ambiwalentny \u2013 ani nie idealizuje, ani nie potępia, lecz ukazuje pełnię wiejskiego bytowania z jego pięknem i okrucieństwem. 4) Odwołać się do kontekstu: np. \u201eWesele\u201d Wyspiańskiego (inny obraz chłopów), Zola \u201eZiemia\u201d (polemika Reymonta z naturalizmem Zoli).",
      metadata: {
        explanation:
          "To pytanie wymaga dojrzałej analizy literackiej. Najlepsza odpowiedź uniknie jednoznacznego stanowiska na rzecz uchwycenia ambiwalencji, która jest istotą artyzmu Reymonta.",
      },
    },

    // ======================= POCZĄTEK PYTAŃ Nie-Boska komedia ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Kto jest autorem dramatu \u201eNie-Boska komedia\u201d?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Juliusz Słowacki",
          "Zygmunt Krasiński",
          "Cyprian Kamil Norwid",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "\u201eNie-Boska komedia\u201d to dramat Zygmunta Krasińskiego, napisany w 1833 roku i wydany anonimowo w Paryżu w 1835 roku. Krasiński jest zaliczany do grona Trzech Wieszczów polskiego romantyzmu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Jak nazywa się główny bohater \u201eNie-Boskiej komedii\u201d?",
      content: {
        options: ["Konrad", "Kordian", "Hrabia Henryk", "Pankracy"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Głównym bohaterem jest Hrabia Henryk, w pierwszych dwóch częściach nazywany Mężem lub Panem Młodym. Jest arystokratą, poetą, mężem Marii i ojcem Orcia.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Do jakiego dzieła literackiego nawiązuje tytuł \u201eNie-Boska komedia\u201d?",
      content: {
        options: [
          "Do \u201eIliady\u201d Homera",
          "Do \u201eBoskiej Komedii\u201d Dantego",
          "Do \u201eHamleta\u201d Szekspira",
          "Do \u201eFausta\u201d Goethego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tytuł nawiązuje do \u201eBoskiej Komedii\u201d Dantego Alighieri. Przedrostek \u201enie-\u201d podkreśla, że akcja toczy się nie w zaświatach, lecz na ziemi, w świecie \u201enieboskim\u201d, pełnym ludzkiego grzechu i chaosu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Na ile części podzielony jest dramat \u201eNie-Boska komedia\u201d?",
      content: {
        options: ["Trzy", "Cztery", "Pięć", "Dwa akty z prologiem"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dramat składa się z czterech części. Części I i II stanowią dramat rodzinny (losy Henryka jako męża i ojca), a części III i IV \u2013 dramat społeczno-polityczny (walka arystokracji z rewolucjonistami).",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Co się dzieje z żoną Henryka, Marią, w wyniku jego zachowania?",
      content: {
        options: [
          "Ucieka z domu i wstępuje do klasztoru",
          "Popada w obłęd i umiera",
          "Zostaje porwana przez rewolucjonistów",
          "Odchodzi do rodziny i żyje spokojnie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Maria, porzucona emocjonalnie przez Henryka goniącego za widmem Dziewicy, popada w obłąkanie. Trafia do domu wariatów, gdzie umiera, próbując udowodnić mężowi, że i ona jest poetką.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Jakie są ostatnie słowa Pankracego, kończące dramat?",
      content: {
        options: [
          "\u201eZwycięstwo i życie!\u201d",
          "\u201eGalilaee, vicisti!\u201d",
          "\u201ePrzeklęstwo wam wszystkim!\u201d",
          "\u201eCiemności! Ciemności!\u201d",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ostatnie słowa Pankracego to łacińskie \u201eGalilaee, vicisti!\u201d, czyli \u201eGalilejczyku, zwyciężyłeś!\u201d \u2013 słowa przypisywane cesarzowi Julianowi Apostacie, uznające zwycięstwo Chrystusa. Pankracy wypowiada je, umierając, gdy ukazuje mu się wizja Chrystusa.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Połącz postacie z ich rolami w dramacie:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Hrabia Henryk" },
          { id: "B", text: "Pankracy" },
          { id: "C", text: "Orcio" },
          { id: "D", text: "Maria" },
        ],
        rightColumn: [
          { id: "1", text: "Wódz rewolucjonistów" },
          { id: "2", text: "Niewidomy syn-poeta" },
          { id: "3", text: "Żona, która popada w obłęd" },
          { id: "4", text: "Arystokrata, poeta, wódz obrońców" },
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
          "Henryk to arystokrata-poeta, który staje się wodzem obrońców Okopów Świętej Trójcy. Pankracy dowodzi rewolucjonistami. Orcio traci wzrok i staje się poetą-wizjonerem. Maria traci zmysły z powodu porzucenia przez męża.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Które z poniższych postaci należą do obozu rewolucjonistów?",
      content: {
        options: ["Leonard", "Przechrzta", "Jakub", "Bianchetti"],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Leonard to \u201eprorok\u201d rewolucji i bliski współpracownik Pankracego. Przechrzta to ochrzczony Żyd, prowadzący spisek. Bianchetti to kondotier-generał rewolucjonistów. Jakub natomiast to wierny sługa Henryka.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które stwierdzenia o \u201eNie-Boskiej komedii\u201d są prawdziwe?",
      content: {
        options: [
          "Dramat został wydany anonimowo w Paryżu w 1835 roku",
          "Pierwotny tytuł miał brzmieć \u201eMąż\u201d",
          "Utwór jest napisany wierszem trzynastozgłoskowym",
          "Krasiński napisał go mając dwadzieścia jeden lat",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Dramat wydano anonimowo w 1835 r. w Paryżu. Pierwotnie miał nosić tytuł \u201eMąż\u201d i być częścią trylogii. Krasiński napisał go w 1833 r., mając 21 lat. Utwór jest napisany prozą poetycką, nie wierszem.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Jak nazywa się twierdza, w której arystokraci bronią się przed rewolucjonistami?",
      content: {},
      correctAnswer:
        "Okopy Świętej Trójcy \u2013 twierdza, w której Henryk dowodzi obroną arystokracji przed armią Pankracego. Nazwa nawiązuje do historycznej twierdzy na Podolu.",
      metadata: {
        explanation:
          "Okopy Świętej Trójcy to historyczna twierdza na Podolu, w której konfederaci barscy pod wodzą Kazimierza Pułaskiego bronili się przed Rosjanami. Krasiński wykorzystał tę nazwę symbolicznie.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Kim jest Dziewica (Duch Zły), która nawiedza Henryka?",
      content: {
        options: [
          "Duchem zmarłej dawnej kochanki, który powraca z zaświatów",
          "Widmem wysłanym przez złe duchy, uosabiającym fałszywą poezję i zwodnicze piękno",
          "Aniołem Stróżem, który próbuje naprowadzić Henryka na dobrą drogę",
          "Duchem matki Marii, ostrzegającym przed nieszczęściem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dziewica to duch zły, który na polecenie piekielnych mocy przybiera postać pięknej kobiety. Symbolizuje fałszywą poezję, iluzoryczne piękno, które zwodzi Henryka i odciąga go od realnego życia i prawdziwej miłości.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Co Maria robi podczas chrztu syna Orcia?",
      content: {
        options: [
          "Modli się cicho w ławce, nie uczestnicząc w obrzędzie",
          "Błogosławi syna i przeklina go, jeśli nie będzie poetą",
          "Prosi księdza o specjalne poświęcenie dziecka",
          "Mdleje przed rozpoczęciem ceremonii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Maria, już w stanie szaleństwa, kładzie dłonie na głowie dziecka i wypowiada słowa: \u201eBądź poetą, aby cię ojciec kochał\u201d oraz \u201ePrzeklinam cię, jeśli nie będziesz poetą\u201d. To \u201eprzekleństwo poezji\u201d ciąży nad losem Orcia.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Co spotyka Orcia w części II dramatu?",
      content: {
        options: [
          "Ucieka z domu i przyłącza się do rewolucjonistów",
          "Traci wzrok (ślepnie), ale rozwija niezwykłe zdolności poetycko-wizjonerskie",
          "Zostaje wysłany do szkoły wojskowej przez ojca",
          "Popada w obłęd identyczny z chorobą matki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Orcio cierpi na amaurozę \u2013 ślepotę spowodowaną uszkodzeniem nerwu wzrokowego. Mimo utraty wzroku fizycznego, rozwija \u201eoczy duszy\u201d \u2013 widzi duchy, słyszy głos zmarłej matki i tworzy poezję wizjonerską.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Jaką propozycję składa Pankracy Henrykowi podczas ich nocnego spotkania?",
      content: {
        options: [
          "Proponuje sojusz wojskowy przeciwko obcym mocarstwom",
          "Oferuje ocalenie Henryka i jego majątku w zamian za rozpuszczenie oddziału i niewalczenie z rewolucją",
          "Żąda kapitulacji Okopów Świętej Trójcy bez warunków",
          "Proponuje wspólne rządy nad nowym państwem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pankracy proponuje Henrykowi, by rozpuścił swój oddział, nie szedł na odsiecz Świętej Trójcy, a w zamian zachowa imię, dobra i zostanie \u201eostatnim hrabią na tych równinach\u201d. Henryk odrzuca tę propozycję.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Jak ginie Hrabia Henryk?",
      content: {
        options: [
          "Zostaje zastrzelony przez Leonarda na murach twierdzy",
          "Popełnia samobójstwo, skacząc z baszty w przepaść",
          "Umiera od ran odniesionych w walce wręcz z Pankracym",
          "Zostaje powieszony przez rewolucjonistów po zdobyciu zamku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Henryk, widząc klęskę obrońców, staje na odłamku baszty wiszącym nad przepaścią. Wypowiada słowa: \u201ePoezjo, bądź mi przeklęta\u201d i skacze w przepaść, popełniając samobójstwo. Wcześniej przegania wrogów z murów, ale wie, że obrona jest beznadziejna.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Dramat rozgrywa się na dwóch płaszczyznach: części I i II to dramat (1), a części III i IV to dramat (2). Krasiński przedstawia konflikt między (3) a ludem.",
        gaps: [
          {
            id: 1,
            options: ["społeczny", "rodzinny", "metafizyczny", "historyczny"],
          },
          {
            id: 2,
            options: [
              "rodzinny",
              "społeczno-polityczny",
              "psychologiczny",
              "miłosny",
            ],
          },
          {
            id: 3,
            options: [
              "duchowieństwem",
              "arystokracją",
              "mieszczaństwem",
              "chłopstwem",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Części I-II to dramat rodzinny (rozpad małżeństwa, obłęd Marii, ślepota Orcia). Części III-IV to dramat społeczno-polityczny (walka klas). Centralny konflikt to starcie arystokracji z ludem (rewolucjonistami).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które grupy społeczne tworzą obóz rewolucjonistów w części III?",
      content: {
        options: [
          "Lokaje, rzeźnicy, rzemieślnicy",
          "Chłopi z kosami i cepami",
          "Szlachta drobna niezadowolona z magnaterów",
          "Przechrzci (ochrzczeni Żydzi) knujący spisek",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Obóz rewolucji tworzą: lokaje (klub lokajów chwalących się morderstwami panów), rzeźnicy, rzemieślnicy, chłopi oraz przechrzci, którzy pod pozorem walki o wolność realizują własne cele. Drobna szlachta nie należy do obozu rewolucji.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które cechy dramatu romantycznego są obecne w \u201eNie-Boskiej komedii\u201d?",
      content: {
        options: [
          "Zerwanie z zasadą trzech jedności (czasu, miejsca, akcji)",
          "Synkretyzm rodzajowy \u2013 łączenie liryki, epiki i dramatu",
          "Zachowanie klasycznego podziału na akty i sceny z jednością miejsca",
          "Obecność elementów fantastycznych i metafizycznych (duchy, anioły)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Dramat łamie zasadę trzech jedności, łączy elementy liryczne (wstępy poetyckie), epickie i dramatyczne (synkretyzm), oraz wprowadza postacie nadprzyrodzone (Anioł Stróż, Duch Zły, chóry duchów). Nie zachowuje klasycznego podziału na akty.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Wyjaśnij, co symbolizuje postać Dziewicy w kontekście motywu poezji.",
      content: {},
      correctAnswer:
        "Dziewica symbolizuje fałszywą poezję \u2013 piękno pozorne, zwodnicze, odciągające poetę od prawdziwego życia i realnych obowiązków (rodziny, miłości). Jest wytworem piekielnych mocy, które przybierają kuszącą formę, ale pod powierzchnią kryją rozkład i śmierć (kwiaty zmieniają się w żmije, suknia opada odsłaniając kości).",
      metadata: {
        explanation:
          "Scena odsłonięcia prawdziwej natury Dziewicy na krawędzi przepaści jest kluczowa. Henryk widzi, jak kwiaty stają się jaszczurkami, a pod suknią widać nagie kości \u2013 piękno poetyckie okazuje się iluzją maskującą pustkę i zło.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Kim jest Leonard i jaką rolę pełni w obozie rewolucjonistów?",
      content: {},
      correctAnswer:
        "Leonard to młody, fanatyczny ideowiec, \u201eprorok\u201d rewolucji. Odprawia obrzędy \u201enowej wiary\u201d na ruinach zburzonego kościoła, ogłasza nowego \u201eBoga Wolności\u201d i udziela \u201eświęceń zbójeckich\u201d (namaszcza mordercami olejem, daje sztylet i truciznę). Jest bezgranicznie oddany Pankracemu, choć buntuje się, gdy ten zwleka z atakiem.",
      metadata: {
        explanation:
          "Leonard to typ romantycznego fanatyka ideowego. Krasiński ukazuje w nim niebezpieczeństwo religijnego szału rewolucji \u2013 stare sacrum zostaje zastąpione nowym, równie nietolerancyjnym.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Wyjaśnij, jak poniższe hasło epoki realizowane jest w \u201eNie-Boskiej komedii\u201d:",
      content: {
        slogan: "Prowidencjalizm",
      },
      correctAnswer:
        "Prowidencjalizm to pogląd, że bieg dziejów kierowany jest przez Opatrzność Bożą. W dramacie realizuje się w zakończeniu: gdy Pankracy zwycięża i sięga po absolutną władzę, interweniuje sam Bóg \u2013 ukazuje się wizja Chrystusa, która zabija Pankracego. Ani arystokracja, ani rewolucja nie mogą samodzielnie nadać sensu historii; ostateczna sprawiedliwość należy do Boga.",
      metadata: {
        explanation:
          "Idea prowidencjalizmu to centralna myśl historiozoficzna Krasińskiego. Obu obozom przyznaje racje cząstkowe, ale oba skazuje na klęskę, podporządkowując je wyższemu prawu Stwórcy.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Krasiński przedstawia w dramacie dwa typy poezji. Która interpretacja najdokładniej opisuje tę dwoistość?",
      content: {
        options: [
          "Poezja liryczna przeciwstawiona epice \u2013 Henryk pisze lirykę, Orcio tworzy epos",
          "Poezja fałszywa (Henryka), egoistyczna i destrukcyjna, przeciwstawiona poezji prawdziwej (Orcia i Marii), wynikającej z cierpienia i czystego serca",
          "Poezja rewolucyjna Leonarda przeciwstawiona religijnej poezji kapłanów",
          "Poezja klasycystyczna starszego pokolenia kontra romantyczna młodego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "We wstępie do części I Krasiński rozróżnia poetę, w którym poezja zamieszkała \u201ejak Bóg w świecie\u201d (poeta błogosławiony, jak Orcio i Maria), od tego, który ją \u201ezdradził za wcześnie\u201d na marną rozkosz (poeta przeklęty, jak Henryk). Poezja Henryka jest fałszywa \u2013 niszczy życie; poezja Orcia jest prawdziwa \u2013 rodzi się z cierpienia.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Podczas nocnego spotkania Henryk mówi Pankracemu: \u201eWidziałem ten krzyż, bluźnierco, w starym, starym Rzymie \u2013 u stóp Jego leżały gruzy potężniejszych sił niż twoje\u201d. Do czego odwołuje się Henryk w tym fragmencie?",
      content: {
        options: [
          "Do zniszczenia Jerozolimy przez Rzymian",
          "Do zwycięstwa chrześcijaństwa nad pogańskim Rzymem \u2013 tak jak upadły starożytne bóstwa, tak i rewolucja Pankracego upadnie przed krzyżem",
          "Do konfederacji barskiej i obrony Okopów Świętej Trójcy",
          "Do krucjat i zwycięstw rycerstwa chrześcijańskiego nad islamem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Henryk przywołuje obraz triumfu chrześcijaństwa nad pogaństwem w Rzymie. Argumentuje, że krzyż pokonał potężniejsze siły niż rewolucja Pankracego, i tak samo pokona nową próbę obalenia wiary. To kluczowy argument w ich debacie ideowej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Dlaczego Krasiński krytykuje OBA obozy \u2013 zarówno arystokrację, jak i rewolucjonistów?",
      content: {
        options: [
          "Bo jest nihilistą, który nie wierzy w żadne wartości",
          "Bo obu obozom przyznaje racje cząstkowe, ale oba uważa za niezdolne do stworzenia sprawiedliwego porządku bez Bożej interwencji",
          "Bo sympatyzuje wyłącznie z mieszczaństwem, które nie jest reprezentowane w dramacie",
          "Bo dramat jest satyrą polityczną, wyśmiewającą wszystkie partie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Krasiński zgodnie z ideą prowidencjalizmu ukazuje, że arystokracja jest zepsuta i zasłużyła na karę (Henryk sam wytyka grzechy swoim sojusznikom), ale rewolucja to tylko \u201ezmiana plemienia\u201d, nie prawdziwy postęp. Obie strony padają \u2013 ostateczna sprawiedliwość należy do Boga.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "W dramacie pojawia się tajemniczy \u201eGłos skądsiś\u201d, który dwukrotnie mówi do Henryka: \u201eDramat układasz\u201d. Jaką funkcję pełni ta replika?",
      content: {
        options: [
          "Jest komentarzem Anioła Stróża, zachęcającym Henryka do tworzenia",
          "Jest głosem szatana, wyśmiewającym Henryka za to, że traktuje swoje życie jako materiał literacki, pozując na tragicznego bohatera",
          "Jest głosem narratora, informującym o zmianie gatunku literackiego",
          "Jest głosem sumienia Henryka, przypominającym mu o obowiązkach ojca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Głos ten (prawdopodobnie szatański) demaskuje Henryka jako kogoś, kto estetyzuje własne cierpienie i pozuje na bohatera romantycznego dramatu, zamiast naprawdę czuć i działać. To jeden z kluczowych elementów autokrytyki romantyzmu w utworze.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które z poniższych zarzutów Pankracy stawia arystokracji podczas debaty z Henrykiem?",
      content: {
        options: [
          "Ich przodkowie fałszowali akta, truciznami przyspieszali spadki i cudzołożyli",
          "Arystokraci stworzyli wspaniałą kulturę i cywilizację, ale nie potrafili jej obronić",
          "Żyli z wyzysku poddanych, nie karmiąc ich ani nie broniąc w czasie wojny",
          "Byli pionierami nauki i postępu technicznego, ale zapomnieli o ludzie",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Pankracy demaskuje portrety przodków Henryka: starosta strzelał baby po drzewach i piekł Żydów, kanclerz fałszował akta i trucił spadkodawców, inni cudzołożyli. Zarzuca też, że arystokracja żyła z wyzysku (\u201egłupstwo i niedola kraju całego\u201d). Nie chwali ich za kulturę ani naukę.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które z poniższych motywów literackich występują w \u201eNie-Boskiej komedii\u201d?",
      content: {
        options: [
          "Motyw poety przeklętego, niszczonego przez własny talent",
          "Motyw rewolucji jako siły destrukcyjnej, niezdolnej do stworzenia nowego ładu",
          "Motyw szlachetnego dzikusa żyjącego w harmonii z naturą",
          "Motyw walki Dobra ze Złem, rozgrywającej się równolegle w świecie ziemskim i nadprzyrodzonym",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W dramacie obecne są: poeta przeklęty (Henryk, a nawet Orcio), rewolucja jako destrukcja (hasła \u201echleba i krwi\u201d), walka Dobra i Zła na planie metafizycznym (Anioł Stróż kontra Duchy Złe, Chrystus kontra Pankracy). Motyw szlachetnego dzikusa nie występuje.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które z poniższych interpretacji tytułu \u201eNie-Boska komedia\u201d są uznawane przez badaczy literatury?",
      content: {
        options: [
          "Przeciwieństwo porządku Dantego \u2013 komedia ziemska, nie zaświatowa, pozbawiona boskiego ładu",
          "Tytuł oznacza, że wydarzeniami kieruje szatan, nie Bóg",
          "Ludzie działają wbrew woli Bożej, tworzą nie-boski (ludzki, grzeszny) porządek dziejów",
          "Słowo \u201ekomedia\u201d jest ironią \u2013 tragiczne wydarzenia ludzi są komedią z perspektywy Boga",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Tytuł interpretowany jest wielorako: jako opozycja do Dantego (ziemski chaos vs. boski ład zaświatów), jako ludzkie działania sprzeczne z wolą Bożą, i jako ironia \u2013 z perspektywy wieczności ludzkie rewolucje i walki są jedynie komedią. Szatan nie kieruje całością \u2013 ostatecznie wygrywa Chrystus.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Zygmunt Krasiński",
          title: "Nie-Boska komedia",
          text: "Czuję, że powinienem cię kochać. \u2014",
          bookReference: "Część I, scena salonu z fortepianem",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wyjaśnij, dlaczego Maria reaguje na te słowa słowami: \u201eDobiłeś mnie tym jednym: powinienem\u201d.",
            minWords: 25,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Co ta wypowiedź mówi o stosunku Henryka do żony i o jego postawie jako romantycznego poety?",
            minWords: 25,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Maria rozumie, że słowo \u201epowinienem\u201d oznacza obowiązek, nie uczucie. Henryk nie mówi \u201ekocham cię\u201d, lecz \u201epowinienem cię kochać\u201d \u2013 to wyznanie braku miłości pod pozorem grzeczności. 2) Henryk traktuje życie rodzinne jako ciężar, nie jest zdolny do prawdziwej bliskości. Jako romantyczny poeta żyje w świecie marzeń i ideałów, a realna kobieta (Maria) jest dla niego jedynie \u201ekobietą z gliny i błota\u201d w porównaniu z fantazmatyczną Dziewicą.",
      metadata: {
        explanation:
          "To jeden z najbardziej przejmujących momentów dramatu rodzinnego. Jedno słowo \u201epowinienem\u201d odsłania przepaść między Henrykiem a Marią i staje się wyrokiem na ich małżeństwo.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Odpowiedz na pytania dotyczące obrzędu Leonarda na ruinach kościoła (część III):",
      content: {
        steps: [
          {
            id: 1,
            instruction:
              "Co Leonard ogłasza zgromadzonym i jaką \u201enową wiarę\u201d proponuje?",
          },
          {
            id: 2,
            instruction:
              "Jakie \u201eświęcenia\u201d udziela synowi filozofa Hermanowi?",
          },
          {
            id: 3,
            instruction:
              "Jak Krasiński ocenia ten obrzęd \u2013 jest to prawdziwa wiara czy jej parodia?",
          },
        ],
      },
      correctAnswer:
        "1) Leonard ogłasza \u201eŚwiat nowy\u201d i \u201eBoga Wolności\u201d \u2013 każda ofiara zemsty ma być ołtarzem nowego bóstwa, a kto się sprzeciwi, temu \u201estryczek i przeklęstwo\u201d. 2) Namaszcza Hermana olejem \u201ena zgubę królom\u201d, daje mu sztylet (na morderstwa) i medalion z trucizną. To parodia sakramentu bierzmowania. 3) Krasiński przedstawia to jako parodię i bluźnierstwo \u2013 na ruinach kościoła chrześcijańskiego buduje się nowy kult przemocy, maskowany językiem religijnym.",
      metadata: {
        explanation:
          "Scena ta jest kluczowa dla krytyki rewolucji: Krasiński pokazuje, że rewolucjoniści nie niszczą religii \u2013 zastępują ją nową, równie fanatyczną, ale pozbawioną sacrum.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Wyjaśnij sens sceny w lochach pod zamkiem Świętej Trójcy (część IV), w której Orcio prowadzi ojca na podziemny \u201esąd duchów\u201d.",
      content: {
        instruction:
          "Uwzględnij: kto sądzi kogo, jakie padają wyroki i jak reaguje Henryk.",
      },
      correctAnswer:
        "W lochach odbywa się sąd duchów dawnych ofiar arystokracji \u2013 więźniów, torturowanych, zabitych przez przodków Henryka. Duchy skazują Henryka na potępienie za to, że \u201enic nie kochał prócz siebie i myśli swych\u201d. Orcio widzi te postacie oczami duszy (jest niewidomy fizycznie), a Henryk słyszy jedynie głosy. Scena ta pełni funkcję moralnego rozliczenia arystokracji z jej historycznych win i osobistego rozliczenia Henryka z egoizmu.",
      metadata: {
        explanation:
          "Scena lochów łączy wątek metafizyczny z historycznym. Przeszłość arystokracji \u2013 przemoc, tortury, uwięzienia \u2013 domaga się sprawiedliwości. To jeden z argumentów na rzecz tezy, że arystokracja współponosi winę za rewolucję.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Obraz rewolucji w \u201eNie-Boskiej komedii\u201d \u2013 wizja Krasińskiego",
        requirements: [
          "Opisz skład społeczny obozu rewolucji i motywacje poszczególnych grup",
          "Wskaż, jak Krasiński ocenia rewolucję (pozytywnie czy negatywnie, uzasadnij)",
          "Odwołaj się do konkretnych scen lub cytatów",
          "80-120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Obóz rewolucji tworzą chłopi, lokaje, rzeźnicy, rzemieślnicy \u2013 motywowani głodem, żądzą zemsty i pragnieniem odwetu za wieki ucisku. Przywodzą im Pankracy (intelektualista, strateg) i Leonard (fanatyk religijny). Krasiński ocenia rewolucję negatywnie: widzi w niej jedynie \u201ezmianę plemienia\u201d, nie prawdziwy postęp. Lokaje chwalą się morderstwami panów, rzeźnikom \u201ejedno, czy bydło, czy panów rżnąć\u201d, a przechrzci realizują własne cele pod hasłami wolności. Rewolucja niszczy religię i tradycję, nie oferując nic poza krwią i chaosem.",
      metadata: {
        explanation:
          "Krasiński, jako arystokrata, patrzył na rewolucję z rezerwą. Uznawał krzywdy ludu, ale uważał, że rewolucja jest karą Bożą, nie rozwiązaniem problemów.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Badacze porównują dyskusję Henryka z Pankracym do wielkiej debaty ideowej epoki romantyzmu. Które stwierdzenie najlepiej opisuje istotę tego starcia?",
      content: {
        options: [
          "Jest to spór o osobiste urazy między dwoma rywalami politycznymi",
          "Jest to fundamentalny spór o wizję dziejów: tradycja i religia (Henryk) kontra postęp i rewolucja (Pankracy), w którym obie strony mają racje cząstkowe, a żadna \u2013 pełnej prawdy",
          "Pankracy ma pełną rację, a Henryk jedynie broni przestarzałych przywilejów",
          "Henryk całkowicie wygrywa debatę, udowadniając wyższość arystokracji",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Krasiński konstruuje debatę tak, że obie strony mają silne argumenty. Pankracy słusznie wskazuje na grzechy arystokracji, ale Henryk trafnie demaskuje fałsz rewolucji. Żaden z nich nie ma monopolu na prawdę \u2013 tę ma jedynie Bóg (co pokazuje finał dramatu).",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Henryk w momencie śmierci wołA: \u201ePoezjo, bądź mi przeklęta, jako ja sam będę na wieki!\u201d. Jak najgłębiej interpretować te słowa?",
      content: {
        options: [
          "Henryk przeklina twórczość literacką, bo nie przyniosła mu sławy",
          "Henryk rozumie w chwili śmierci, że fałszywa poezja (gonitwA za ideałem piękna kosztem realnego życia) zniszczyła jego rodzinę i uczyniła go igrzyskiem szatanów",
          "Henryk przeklina Krasińskiego za stworzenie go jako postaci literackiej",
          "Henryk przeklina poezję, bo uniemożliwiła mu skuteczną obronę twierdzy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To kulminacja autokrytyki romantyzmu w dramacie. Henryk w chwili śmierci uświadamia sobie, że poezja \u2013 ta fałszywa, iluzoryczna, odciągająca od życia \u2013 zniszczyła jego i bliskich. To rozliczenie z romantyczną koncepcją poety-wieszcza, który żyje ponad zwykłymi ludźmi.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Jak interpretować fakt, że Pankracy, zwyciężywszy militarnie, ginie od wizji Chrystusa?",
      content: {
        options: [
          "Jest to konwencjonalne deus ex machina, niemające głębszego sensu",
          "Krasiński pokazuje, że rewolucja może zniszczyć stary porządek, ale nie jest w stanie zastąpić Boga \u2013 sens dziejom nadaje jedynie Opatrzność, a ludzka pycha sięgająca po absolutną władzę zostaje skruszona",
          "Pankracy umiera ze strachu, bo nigdy nie widział zjawisk nadprzyrodzonych",
          "Scena jest metaforą choroby psychicznej Pankracego, zbliżonej do obłędu Marii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Finał wyraża kluczową ideę prowidencjalizmu: człowiek nie może zastąpić Boga w nadawaniu sensu historii. Pankracy \u2013 geniusz polityczny, strategiczna potęga \u2013 jest bezsilny wobec Chrystusa. Jego słowa \u201eGalilaee, vicisti\u201d potwierdzają, że zwycięstwo zawsze należy do Boga.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które z poniższych interpretacji postaci Pankracego są uzasadnione treścią dramatu?",
      content: {
        options: [
          "Pankracy to intelektualista o ogromnej sile woli, pogardliwie traktujący tłum, którym się posługuje",
          "Pankracy to bezinteresowny idealista, który szczerze kocha lud i poświęca się dlA niego",
          "Pankracy to typ dyktatora-manipulatora, który \u201eludziom podłym nadał imiona\u201d i \u201eludziom bez czucia wiarę nadał\u201d",
          "Pankracy w swoim monologu przyznaje, że sam nie wie, czym jest i czy jego dzieło jest wielkie, czy zbrodnicze",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Pankracy to postać złożona: pogardza tłumem (\u201eservile imitatorum pecus\u201d), manipuluje ludźmi, ale sam przeżywa wątpliwości (\u201ebłąkasz się i nie wiesz, czym jesteś\u201d). Nie jest bezinteresownym idealistą \u2013 Krasiński wyraźnie pokazuje jego cynizm i żądzę władzy.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które z poniższych stwierdzeń o roli przeszłości i tradycji w \u201eNie-Boskiej komedii\u201d są prawdziwe?",
      content: {
        options: [
          "Henryk czerpie siłę z tradycji przodków, ale Pankracy demaskuje ich grzechy, pokazując, że chwała rodu opiera się na zbrodniach",
          "Krasiński jednoznacznie gloryfikuje przeszłość arystokracji jako wzorzec moralny",
          "Rewolucjoniści niszczą kościoły i pomniki, co symbolizuje odcięcie się od pamięci i sacrum",
          "Przeszłość jest w dramacie siłą ambiwalentną \u2013 daje tożsamość, ale i obciąża winą",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Krasiński NIE gloryfikuje bezwarunkowo przeszłości \u2013 Henryk sam wytyka swoim grzechy przodków. Ale tradycja daje tożsamość, którą rewolucja niszczy (burzenie kościołów). Przeszłość jest ambiwalentna: źródło siły i obciążenia jednocześnie.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Porównaj postacie Henryka i Pankracego jako dwóch typów przywódców. Co ich łączy, a co dzieli?",
      content: {},
      correctAnswer:
        "Łączy ich: intelektualna siła, samotność wodza, pogarda dlA tłumu (Henryk gardzi arystokratami za tchórzostwo, Pankracy gardzi rewolucjonistami za głupotę) i tragiczny los (obaj giną). Dzieli ich: źródło autorytetu (Henryk \u2013 tradycja i ród, Pankracy \u2013 siła woli i idea), stosunek do Boga (Henryk wierzy w Opatrzność, Pankracy jest ateistą), wizja świata (Henryk broni starego ładu, Pankracy buduje nowy). Obaj są \u201eorłami\u201d, jak mówi Pankracy, ale jeden ma \u201egniazdo strzaskane piorunem\u201d.",
      metadata: {
        explanation:
          "Porównanie Henryka i Pankracego to jeden z najważniejszych tematów interpretacyjnych dramatu. Krasiński konstruuje ich jako lustrzane odbicia \u2013 równie silnych, ale skierowanych w przeciwne strony.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Zygmunt Krasiński",
          title: "Nie-Boska komedia",
          text: "Człowiekiem być nie warto \u2014 Aniołem nie warto. \u2014 Pierwszy z Archaniołów po kilku wiekach, tak jak my po kilku latach bytu, uczuł nudę w sercu swoim i zapragnął potężniejszych sił. \u2014 Trza być Bogiem lub nicością.",
          bookReference: "Część IV, monolog Henryka na murach",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Do jakiej postaci biblijnej nawiązuje Henryk, mówiąc o \u201ePierwszym z Archaniołów\u201d? Wyjaśnij sens tego porównania.",
            minWords: 25,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Jak te słowa charakteryzują Henryka jako bohatera romantycznego? Odwołaj się do pojęcia \u201eprometeizmu\u201d lub \u201ebajronizmu\u201d.",
            minWords: 30,
            maxPoints: 2,
          },
        ],
      },
      correctAnswer:
        "1) Henryk nawiązuje do Lucyfera (Szatana), który zbuntował się przeciw Bogu z pychy i pragnienia większej mocy. Porównanie sugeruje, że Henryk rozumie własną pychę \u2013 chce być Bogiem lub nicością, nie godzi się na zwykłość. 2) To kwintesencja bajronizmu: bunt, pycha, nuda egzystencjalna, poczucie wyższości nad ludźmi i dążenie do absolutu. Henryk to typ bohatera romantycznego, który woli samounicestwienie niż przeciętność. Jednocześnie Krasiński pokazuje, że taka postawa prowadzi do katastrofy \u2013 jest autodestrukcyjna i moralnie wątpliwa.",
      metadata: {
        explanation:
          "Fragment ten jest kluczowy dlA interpretacji Henryka jako bohatera romantycznego. Łączy w sobie bajronizm, prometejski bunt i lucyferyczną pychę.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "W jaki sposób \u201eNie-Boska komedia\u201d jest krytyką romantycznej koncepcji poety-wieszcza?",
      content: {},
      correctAnswer:
        "Krasiński pokazuje, że romantyczny kult poety prowadzi do katastrofy: Henryk, traktujący siebie jako wyjątkowego, niszczy rodzinę (porzuca Marię, powoduje jej obłęd i śmierć), skazuje syna Orcia na cierpienie (\u201eprzekleństwo poezji\u201d), a samego siebie na tragiczny koniec. Głos szatana mówi mu: \u201eDramat układasz\u201d \u2013 demaskując go jako kogoś, kto estetyzuje własne cierpienie. Prawdziwa poezja to nie pogoń za fałszywym ideałem (Dziewica), lecz cierpienie i czystość serca (Orcio, Maria).",
      metadata: {
        explanation:
          "Dramat jest jednym z najgłębszych romantycznych samokrytyk. Krasiński, sam będąc poetą, pyta o cenę poetyckiego natchnienia i o granicę między twórczością a egoizmem.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Dramat rodzinny w \u201eNie-Boskiej komedii\u201d \u2013 wina i konsekwencje wyborów Henryka",
        requirements: [
          "Wskaż, jakie wybory Henryka prowadzą do tragedii rodzinnej",
          "Opisz losy Marii i Orcia jako konsekwencje tych wyborów",
          "Wyjaśnij, czym jest \u201eprzekleństwo poezji\u201d",
          "120-160 słów",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "Henryk, zamiast kochać żonę, goni za widmem Dziewicy (fałszywej poezji), porzuca Marię emocjonalnie, a w dniu chrztu syna odchodzi fizycznie. Maria, pragnąc odzyskać miłość męża, próbuje sama stać się poetką \u2013 popada w obłęd i umiera. Orcio dziedziczy \u201eprzekleństwo poezji\u201d \u2013 matczyną klątwę (\u201ePrzeklinam cię, jeśli nie będziesz poetą\u201d) i dar poetycki, ale za cenę fizycznej ślepoty i choroby. Poezja staje się w tej rodzinie przekleństwem, nie darem: niszczy małżeństwo, zabija matkę i kaleczy dziecko. Krasiński pokazuje, że romantyczny kult poety ma swoją cenę, którą płacą najbliżsi.",
      metadata: {
        explanation:
          "Wątek rodzinny jest fundamentem dramatu. Bez niego części III-IV straciłyby wymiar osobisty \u2013 Henryk broni arystokracji, ale sam jest winny zniszczenia najbliższych.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Rola Przechrzty i kwestia antysemityzmu w \u201eNie-Boskiej komedii\u201d",
        requirements: [
          "Opisz, jak Krasiński przedstawia Przechrztę i grupę przechrztów",
          "Wyjaśnij, jaką rolę pełnią w mechanizmie rewolucji",
          "Odnieś się do kontekstu epoki i problemu antysemityzmu w literaturze romantycznej",
          "100-140 słów",
        ],
        wordLimit: { min: 100, max: 140 },
      },
      correctAnswer:
        "Krasiński przedstawia przechrztów jako cyniczną grupę spiskową, która pod pozorem walki o wolność realizuje własne cele \u2013 zemstę na chrześcijanach i zdobycie władzy (\u201eświat nasz, o bracia\u201d). Śpiewają chóry nienawiści do krzyża i \u201eczcicieli Krzyża\u201d. Ich rola w rewolucji to manipulacja od wewnątrz \u2013 podsycają nienawiść, by zniszczyć obie strony. Ten obraz jest uznawany za jeden z najbardziej antysemickich fragmentów polskiej literatury romantycznej. Wynika z rozpowszechnionych w XIX w. stereotypów i lęków arystokracji. Współczesna krytyka jednoznacznie wskazuje ten wątek jako moralnie naganny i niewiarygodny historycznie.",
      metadata: {
        explanation:
          "Kwestia antysemityzmu w \u201eNie-Boskiej komedii\u201d jest ważna i wymaga krytycznego podejścia. Na maturze warto umieć zidentyfikować ten wątek i odnieść się do niego z dystansem krytycznym.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Człowiek w relacjach rodzinnych. Omów zagadnienie na podstawie \u201eNie-Boskiej komedii\u201d Zygmunta Krasińskiego. W swojej odpowiedzi uwzględnij również wybrany kontekst.",
      content: {
        thesis:
          "Dramat rodzinny Henryka \u2013 jak egoizm i fałszywe ideały niszczą więzi",
        structure: {
          introduction:
            "Przedstaw tezę: relacje rodzinne Henryka ukazują destrukcyjny wpływ romantycznego indywidualizmu na życie rodzinne",
          arguments_for:
            "Omów: porzucenie Marii dlA widma Dziewicy, obłęd i śmierć żony, przekleństwo poezji spadające na Orcia, próbę pojednania z synem w IV części",
          arguments_against:
            "Rozważ, czy Henryk jest zdolny do miłości \u2013 momenty czułości wobec Orcia, wyrzuty sumienia",
          conclusion:
            "Wniosek: Krasiński pokazuje, że nawet wielki talent nie usprawiedliwia niszczenia bliskich; odwołaj się do kontekstu",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej trzech scen z dramatu",
          "Kontekst literacki (np. Werter Goethego, Konrad z III cz. Dziadów, współczesna literatura)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Omówić konkretne sceny: słowa \u201epowinienem cię kochać\u201d, porzucenie w noc chrztu, scena w domu wariatów, pożegnanie z Orciem na murach. 2) Ukazać Henryka jako postać ambiwalentną \u2013 nie jest potworem, ale egoistą, który nie potrafi pogodzić natchnienia z obowiązkami. 3) Porównać z innym kontekstem (np. Werter niszczący siebie i otoczenie, Konrad z Dziadów buntujący się przeciw Bogu, ale zapominający o ludziach). 4) Wyciągnąć wniosek o cenie romantycznego indywidualizmu.",
      metadata: {
        explanation:
          "Temat rodziny jest jednym z najpopularniejszych na maturze w odniesieniu do \u201eNie-Boskiej komedii\u201d. Kluczowe jest pokazanie, że Krasiński nie potępia poezji, ale poetę, który stawia ją ponad miłością.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "W kontekście genologii (nauki o gatunkach) \u201eNie-Boska komedia\u201d stanowi realizację dramatu romantycznego. Które zestawienie cech gatunkowych najdokładniej opisuje utwór?",
      content: {
        options: [
          "Klasyczna tragedia z jednością czasu, miejsca i akcji",
          "Synkretyczny dramat romantyczny łączący fragmenty liryczne (wstępy poetyckie), epickie (opisy, narracja) i dramatyczne (dialogi, sceny zbiorowe), z elementami metafizycznymi i luźną strukturą",
          "Komedia obyczajowa z elementami groteski, nawiązująca do tradycji Moliera",
          "Dramat szekspirowski z podziałem na pięć aktów i klasycznym wzorcem tragicznym",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Utwór jest wzorcowym dramatem romantycznym: łamie jedność czasu, miejsca i akcji, łączy lirykę (poetyckie wstępy do każdej części), epikę (fragmenty narracyjne) i dramat (dialogi), wprowadza elementy fantastyczne i metafizyczne. To synkretyzm rodzajowy i gatunkowy typowy dla romantyzmu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Krasiński w \u201eNie-Boskiej komedii\u201d polemizuje z romantyczną koncepcją mesjanizmu. Na czym polega ta polemika?",
      content: {
        options: [
          "Krasiński w pełni akceptuje mesjanizm Mickiewicza i realizuje go w postaci Henryka-Chrystusa narodu",
          "Krasiński odrzuca mesjanizm ludowy (rewolucja ludu nie zbawi świata) i arystokratyczny (arystokracja nie jest \u201eChristus nationum\u201d), wskazując, że jedynym mesjaszem jest sam Chrystus, który interweniuje w finale",
          "Krasiński zastępuje mesjanizm religijny mesjanizmem ateistycznym Pankracego",
          "Krasiński nie odnosi się do mesjanizmu \u2013 dramat dotyczy wyłącznie polityki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To kluczowa różnica między Krasińskim a Mickiewiczem. Mickiewicz widział Polskę jako \u201eChrystusa narodów\u201d, Krasiński \u2013 odrzuca zarówno rewolucyjny (Pankracy), jak i arystokratyczny mesjanizm. Tylko Bóg może zbawić dzieje. To czyni \u201eNie-Boską komedię\u201d głęboko prowidencjalistyczną.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Które z poniższych porównań \u201eNie-Boskiej komedii\u201d z innymi dziełami romantycznymi są merytorycznie uzasadnione?",
      content: {
        options: [
          "Henryk, podobnie jak Konrad z III cz. Dziadów, przeżywa bunt przeciwko Bogu, ale u Krasińskiego bunt ten zostaje jednoznacznie potępiony",
          "Rewolucja w \u201eNie-Boskiej komedii\u201d i wizja szlacheckiego sejmu w \u201eKordianie\u201d Słowackiego pokazują kryzys polskiego społeczeństwa, ale z różnych perspektyw",
          "Orcio jest odpowiednikiem Giaura Byrona \u2013 obaj to wojownicy walczący z niesprawiedliwością",
          "Zarówno \u201eNie-Boska komedia\u201d, jak i \u201eFaust\u201d Goethego podejmują temat pokusy i ceny, jaką płaci się za wiedzę/piękno",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Henryk i Konrad przeżywają bunt, ale Krasiński jednoznaczniej go potępia. Zarówno Krasiński (rewolucja), jak i Słowacki (sejm) diagnozują kryzys społeczny. Motyw pokusy łączy dramat z \u201eFaustem\u201d (Henryk kuszony przez Dziewicę jak Faust przez Mefista). Orcio nie jest wojownikiem \u2013 to poeta-wizjoner, więc porównanie z Giaurem jest nietrafne.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Wyjaśnij historiozoficzną koncepcję Krasińskiego na podstawie \u201eNie-Boskiej komedii\u201d. W jaki sposób dramat realizuje ideę prowidencjalizmu?",
      content: {},
      correctAnswer:
        "Krasiński jest prowidencjalistą \u2013 wierzy, że historią kieruje Opatrzność Boża. W dramacie obie ludzkie siły (arystokracja i rewolucja) mają racje cząstkowe, ale obie ponoszą klęskę. Arystokracja upada, bo jest zepsuta i niezdolna do obrony wartości, które głosi. Rewolucja zwycięża militarnie, ale jej zwycięstwo jest pozorne \u2013 gdy Pankracy sięga po absolutną władzę, interweniuje Chrystus. Krasiński nie wierzy w ludzką zdolność do stworzenia sprawiedliwego porządku \u2013 sens dziejom nadaje tylko Bóg, który interweniuje w sobie tylko znanym momencie. To koncepcja pesymistyczna wobec ludzkości, ale optymistyczna wobec Opatrzności.",
      metadata: {
        explanation:
          "Historiozofia Krasińskiego nawiązuje do myśli św. Augustyna o Państwie Bożym. Jest fundamentem całego dramatu i kluczem do interpretacji finału.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Porównaj obraz rewolucji w \u201eNie-Boskiej komedii\u201d z obrazem rewolucji w innym utworze (np. \u201ePrzedwiośnie\u201d Żeromskiego lub \u201eSzewcach\u201d Witkacego). Wskaż podobieństwa i różnice.",
      content: {},
      correctAnswer:
        "Podobieństwa z \u201ePrzedwiośniem\u201d: obie wizje pokazują rewolucję jako siłę destrukcyjną, chaotyczną, kierowaną raczej głodem i zemstą niż ideologią. Różnice: u Krasińskiego rewolucja ma wymiar metafizyczny (walka z Bogiem), u Żeromskiego \u2013 społeczno-polityczny (bolszewizm). U Krasińskiego interweniuje Opatrzność, u Żeromskiego zakończenie jest otwarte. Z \u201eSzewcami\u201d Witkacego: oba dzieła pokazują cykliczność rewolucji (\u201ezmianę plemienia\u201d), ale Witkacy jest grotesk\u2013absurdalny, Krasiński \u2013 tragiczno-metafizyczny. Krasiński wierzy w Boga jako rozwiązanie, Witkacy \u2013 nie widzi wyjścia.",
      metadata: {
        explanation:
          "Porównanie międzytekstowe rewolucji to częsty temat maturalny. Kluczowe jest uchwycenie specyfiki Krasińskiego: metafizyczny wymiar i prowidencjalistyczne rozwiązanie.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Zygmunt Krasiński",
          title: "Nie-Boska komedia",
          text: "Jak słup śnieżnej jasności, stoi ponad przepaściami \u2014 oburącz wspart na krzyżu, jak na szabli mściciel. \u2014 Ze splecionych piorunów korona cierniowa. [...] Galilaee, vicisti!",
          bookReference: "Część IV, finał dramatu",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Zinterpretuj wizję Chrystusa, którą widzi Pankracy. Zwróć uwagę na obraz krzyża \u201ejak szabli\u201d i korony z piorunów.",
            minWords: 50,
            maxPoints: 3,
          },
          {
            id: 2,
            instruction:
              "Wyjaśnij sens słów \u201eGalilaee, vicisti\u201d w kontekście historiozoficznej koncepcji Krasińskiego.",
            minWords: 40,
            maxPoints: 2,
          },
        ],
        requirements: [
          "Odwołaj się do prowidencjalizmu",
          "Uwzględnij kontekst historyczny słów Juliana Apostaty",
          "Łącznie 120-170 słów",
        ],
        wordLimit: { min: 120, max: 170 },
      },
      correctAnswer:
        "1) Chrystus ukazuje się nie jako łagodny Zbawiciel, lecz jako potężny Sędzia i Mściciel: krzyż porównany do szabli, korona z piorunów zamiast cierni. To obraz Boga-Wojownika, interweniującego w historię, by skruszyć ludzką pychę. Krasiński celowo łączy symbolikę religijną z militarną \u2013 Chrystus jest jedyną siłą zdolną pokonać rewolucję tam, gdzie zawiodła arystokracja. 2) Słowa \u201eGalilaee, vicisti\u201d (\u201eGalilejczyku, zwyciężyłeś\u201d) przypisywane cesarzowi Julianowi Apostacie, który próbował odrodzić pogaństwo. W ustach Pankracego oznaczają uznanie, że rewolucja \u2013 jak pogaństwo Juliana \u2013 przegrała z Chrystusem. Potwierdza to prowidencjalizm Krasińskiego: człowiek nie może zastąpić Boga, historia ostatecznie biegnie ku Bożemu celowi.",
      metadata: {
        explanation:
          "Finał \u201eNie-Boskiej komedii\u201d jest jednym z najsłynniejszych zakończeń w literaturze polskiej. Jego interpretacja wymaga znajomości historii (Julian Apostata), teologii (prowidencjalizm) i umiejętności analizy symboliki.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "ROMANTICISM",
      work: "Nie-Boska komedia",
      question:
        "Czy rewolucja społeczna może przynieść sprawiedliwość? Rozważ problem na podstawie \u201eNie-Boskiej komedii\u201d Zygmunta Krasińskiego i wybranego kontekstu literackiego.",
      content: {
        thesis:
          "Rewolucja jako droga do sprawiedliwości \u2013 nadzieja czy iluzja?",
        structure: {
          introduction:
            "Zarysuj problem: czy przemoc i obalenie starego porządku mogą prowadzić do lepszego świata?",
          arguments_for:
            "Argumenty za: Pankracy ma rację co do win arystokracji; lud ma prawo do chleba i godności; stary porządek jest zepsuty i niereformowalny",
          arguments_against:
            "Argumenty przeciw: rewolucja u Krasińskiego to \u201ezmiana plemienia\u201d, nie postęp; niszczy religię i kulturę; rewolucjoniści sami stają się tyranami; Krasiński proponuje Opatrzność jako jedyne rozwiązanie",
          conclusion:
            "Sformułuj własne stanowisko, odwołując się do kontekstu (np. Przedwiośnie, Szewcy, historia rewolucji francuskiej)",
        },
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do debaty Henryk\u2013Pankracy",
          "Analiza finału dramatu (wizja Chrystusa)",
          "Kontekst literacki lub historyczny",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Przedstawić argumenty obu stron debaty Henryk\u2013Pankracy. 2) Przeanalizować obraz rewolucji w III części (kluby lokajów, rzeźników, obrzędy Leonarda) jako karykaturę sprawiedliwości. 3) Zinterpretować finał \u2013 interwencja Chrystusa jako znak, że ludzka rewolucja nie może zastąpić Bożej sprawiedliwości. 4) Porównać z wybranym kontekstem (np. Żeromski \u2013 Baryka wobec rewolucji, Witkacy \u2013 groteskowa wizja rewolucji, historia rewolucji francuskiej \u2013 od ideałów do terroru).",
      metadata: {
        explanation:
          "Temat rewolucji jest jednym z najważniejszych w dramacie i jednym z najbardziej uniwersalnych. Najlepsza odpowiedź pokaże złożoność problemu, unikając jednoznacznego potępienia lub gloryfikacji.",
      },
    },

    // ======================= POCZĄTEK PYTAŃ FERDYDURKE ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (12) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Kto jest autorem powieści „Ferdydurke”?",
      content: {
        options: [
          "Witold Gombrowicz",
          "Bruno Schulz",
          "Stanisław Ignacy Witkiewicz",
          "Jarosław Iwaszkiewicz",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Autorem „Ferdydurke” jest Witold Gombrowicz. Powieść ukazała się w 1937 roku i jest jednym z najważniejszych dzieł polskiej literatury XX wieku.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "W jakiej epoce literackiej powstała „Ferdydurke”?",
      content: {
        options: [
          "Młoda Polska",
          "Pozytywizm",
          "Dwudziestolecie międzywojenne",
          "Współczesność (po 1945)",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "„Ferdydurke” została opublikowana w 1937 roku, a więc w okresie dwudziestolecia międzywojennego. Powieść jest jednym z najważniejszych dzieł awangardowej prozy tego okresu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Ile lat ma główny bohater „Ferdydurke”, Józio, w momencie rozpoczęcia akcji?",
      content: {
        options: ["Szesnaście", "Dwadzieścia", "Trzydzieści", "Czterdzieści"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Józio ma trzydzieści lat, lecz zostaje cofnięty do szkoły przez profesora Pimkę, który traktuje go jak nastolatka. Ten kontrast między wiekiem a narzuconą rolą jest jednym z kluczowych motywów powieści.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Kim jest profesor Pimko w „Ferdydurke”?",
      content: {
        options: [
          "Nauczycielem, filologiem z Krakowa",
          "Filozofem z uniwersytetu",
          "Dyrektorem szkoły",
          "Krytykiem literackim",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Profesor T. Pimko to „doktor i profesor, a właściwie nauczyciel, kulturalny filolog z Krakowa”. Jest wcieleniem belfra zdawkowego i banalnego, który upupia Józia i zmusza go do powrotu do szkoły.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Do jakiej klasy szkoły dyrektora Piórkowskiego zostaje wpisany Józio?",
      content: {
        options: ["Do czwartej", "Do piątej", "Do szóstej", "Do siódmej"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pimko wpisuje Józia do szóstej klasy szkoły dyrektora Piórkowskiego. Dyrektor Piórkowski z rozkoszą przyjmuje nowego ucznia, gdyż „bez uczniów nie byłoby szkoły, a bez szkoły nie byłoby nauczycieli”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Co oznacza pojęcie „pupa” w „Ferdydurke”",
      content: {
        options: [
          "Symbol dojrzałości i mądrości",
          "Wolność jednostki od konwenansów",
          "Siłę fizyczną i przewagę nad innymi",
          "Infantylizację, sprowadzanie do dziecka",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "„Pupa” to jeden z kluczowych symboli powieści — oznacza infantylizację, zdziecinnienie, sprowadzanie dorosłego człowieka do roli niedojrzałego dziecka. Upupianie to główna metoda działania pedagogów w szkole.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Co oznacza pojęcie „gęba” w „Ferdydurke”?",
      content: {
        options: [
          "Narzuconą maskę społeczną, etykietę",
          "Naturalny wygląd człowieka",
          "Talent artystyczny",
          "Odwagę w mówieniu prawdy",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "„Gęba” to narzucony przez innych wizerunek, społeczna maska, etykieta. „Przyprawianie gęby” to forma przemocy symbolicznej — drugi człowiek lub społeczeństwo narzuca nam sposób, w jaki jesteśmy postrzegani.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "U jakiej rodziny Józio dostaje stancję z polecenia Pimki?",
      content: {
        options: [
          "U Piórkowskich",
          "U Młodziaków",
          "U Hurleckich",
          "U Bladaczków",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pimko umieszcza Józia na stancji u państwa Młodziaków — nowoczesnej rodziny inteligenckiej. Inżynier Młodziak i jego żona mają córkę Żutę, nowoczesną pensjonarkę, która ma „uwięzić” Józia w młodości.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Kim jest Miętus w „Ferdydurke”?",
      content: {
        options: [
          "Wzorowym uczniem idealistą",
          "Zbuntowanym uczniem, przywódcą chłopaków",
          "Nauczycielem łaciny",
          "Dyrektorem szkoły",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Miętus (Miętalski) jest zbuntowanym uczniem, przywódcą frakcji „chłopaków” w szkole. Walczy przeciwko narzucanej niewinności i marzy o autentyczności, o kontakcie z parobkiem — przedstawicielem „prawdziwego” życia.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Który poeta jest tematem lekcji nauczyciela Bladaczki?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Juliusz Słowacki",
          "Cyprian Kamil Norwid",
          "Zygmunt Krasiński",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Bladaczka prowadzi lekcję o Juliuszu Słowackim, powtarzając formułę „Słowacki wielkim poetą był”. Ta scena to satyra na szkolny kult wieszczów i mechaniczne nauczanie literatury.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Jak kończy się „Ferdydurke”?",
      content: {
        options: [
          "Józio wraca do szkoły Piórkowskiego",
          "Józio godzi się z Pimką",
          "Józio zostaje na stancji u Młodziaków",
          "Józio ucieka z Zosią przez pola",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Powieść kończy się ucieczką Józia z Zosią, kuzynką, przez pola. Jednak ucieczka nie jest prawdziwym wyzwoleniem — Józio wpada w kolejną formę (sentymentalny romans), a nad światem dominuje „pupa infantylna”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Jaki gatunek literacki reprezentuje „Ferdydurke”?",
      content: {
        options: [
          "Powieść realistyczną",
          "Powieść groteskową (awangardową)",
          "Powieść historyczną",
          "Powieść sensacyjną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Ferdydurke” to powieść groteskowa i awangardowa. Łączy elementy satyry, parodii, refleksji filozoficznej i absurdu. Groteska jest w niej narzędziem demaskowania mechanizmów Formy narzucanej człowiekowi.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Przyporządkuj trzy kluczowe pojęcia „Ferdydurke” do ich znaczeń.",
      content: {
        instruction: "Połącz pojęcie z jego znaczeniem w powieści.",
        pairs: [
          { left: "Pupa", right: "Infantylizacja, zdziecinnienie" },
          { left: "Gęba", right: "Narzucona maska społeczna" },
          { left: "Łydka", right: "Nowoczesność, erotyzm, biologia" },
        ],
        distractors: ["Pełna dojrzałość duchowa", "Mądrość życiowa"],
        subFormat: "matching",
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Pupa — infantylizacja (szkoła upupia uczniów); Gęba — narzucona maska, etykieta społeczna; Łydka — symbol nowoczesności, erotyzmu, biologii przytłaczającej intelekt (dom Młodziaków, postać Żuty).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Przyporządkuj środowiska społeczne do odpowiednich części powieści.",
      content: {
        instruction: "Połącz środowisko z częścią „Ferdydurke”.",
        pairs: [
          { left: "Szkoła (pedagodzy i uczniowie)", right: "Część I" },
          { left: "Dom nowoczesnych Młodziaków", right: "Część II" },
          { left: "Dwór wiejski Hurleckich", right: "Część III" },
        ],
        distractors: ["Kawiarnia literacka", "Fabryka w mieście"],
        subFormat: "matching",
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Ferdydurke jest zbudowana z trzech głównych części: szkoła (upupianie przez belfrów), dom Młodziaków (nowoczesność pensjonarki i łydka) oraz dwór Hurleckich (ziemiaństwo, pańskość kontra chamstwo/parobek).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Przyporządkuj postacie do ich ról w powieści.",
      content: {
        instruction: "Połącz postać z jej funkcją w „Ferdydurke”.",
        pairs: [
          { left: "Pimko", right: "Belfer, który upupia Józia" },
          {
            left: "Syfon (Pylaszczkiewicz)",
            right: "Idealista broniący niewinności",
          },
          {
            left: "Miętus (Miętalski)",
            right: "Buntownik tęskniący do parobka",
          },
        ],
        distractors: ["Nowoczesna pensjonarka", "Ziemianin-arystokrata"],
        subFormat: "matching",
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Pimko to archetypowy belfer narzucający infantylną formę; Syfon broni ideałów czystości i niewinności; Miętus buntuje się przeciw narzucanemu chłopięctwu i marzy o brataniu się z parobkiem jako symbolem autentyczności.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (10) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Jaką książkę napisał Józio przed porwaniem przez Pimkę?",
      content: {
        options: [
          "„Ferdydurke”",
          "„Pamiętnik z okresu dojrzewania”",
          "„Trans-Atlantyk”",
          "„Kosmos”",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Józio jest autorem „Pamiętnika z okresu dojrzewania” — co stanowi autobiograficzne nawiązanie do debiutanckiego tomu opowiadań samego Gombrowicza (1933). Tytuł ten naraził bohatera na zarzut niedojrzałości.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Na czym polega „pojedynek na miny” między Syfonem a Miętusem?",
      content: {
        options: [
          "Na recytowaniu wierszy na przemian",
          "Na wzajemnym strzelaniu grymasami — jeden budujący, drugi burzący",
          "Na walce na pięści w szkolnym korytarzu",
          "Na pisemnym egzaminie z łaciny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pojedynek na miny to kluczowa scena części szkolnej. Syfon strzela minami wzniosłymi i idealistycznymi, Miętus odpowiada kontrminami ohydnymi i destrukcyjnymi. Jest to groteskowa walka o tożsamość i autentyczność prowadzona za pomocą grymasów twarzy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Co Miętus robi Syfonowi po przegranym pojedynku na miny?",
      content: {
        options: [
          "Gwałci go przez uszy — uświadamia na siłę",
          "Przeprasza go publicznie",
          "Wyzna mu przyjaźń",
          "Donosi na niego dyrektorowi",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Miętus, przegrywając pojedynek na miny, rzuca się na Syfona fizycznie i „uświadamia go przez uszy” — wyszeptuje mu obsceniczne treści, by zniszczyć jego niewinność. Jest to akt groteskowej przemocy symbolicznej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Kim jest Kopyrda w „Ferdydurke”?",
      content: {
        options: [
          "Nauczycielem wychowania fizycznego",
          "Przyjacielem Syfona, idealistą",
          "Starym lokajem we dworze Hurleckich",
          "Nowoczesnym, obojętnym uczniem, amantem Żuty",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Kopyrda to jedyny „prawdziwie nowoczesny” uczeń w szkole — zdystansowany, obojętny wobec sporów, lekceważący. Chodzi za Żutą Młodziakówną. Jego nogi wysuwają się na plan pierwszy, co symbolizuje cielesność i nowoczesność.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Dlaczego Pimko umieszcza Józia na stancji u Młodziaków?",
      content: {
        options: [
          "Aby nowoczesna pensjonarka uwięziła go w młodości",
          "Aby Józio nauczył się łaciny",
          "Aby Józio zaprzyjaźnił się z inżynierem",
          "Aby Józio uciekł z domu",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Pimko kalkuluje, że zakochanie się w nowoczesnej pensjonarce (Żucie) na zawsze uwięzi Józia w młodości. Pensjonarka ma być „ideałem młodości”, który zastąpi mu aspiracje do dojrzałości.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Który uczeń po zgwałceniu przez Miętusa popełnia samobójstwo?",
      content: {
        options: ["Miętus", "Gałkiewicz", "Syfon (Pylaszczkiewicz)", "Kopyrda"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Syfon po „uświadomieniu przez uszy” nie może pozbyć się zaszczepionego mu zła. Czując się skażonym i niegodnym swoich ideałów, wiesza się na wieszaku. Jest to tragiczna konsekwencja groteskowej przemocy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Jaką rolę pełni scena „kompotu” w domu Młodziaków?",
      content: {
        options: [
          "Józio babrze się w kompocie, co wywołuje przełom w relacjach z rodziną",
          "Jest sceną romantycznej kolacji Józia z Żutą",
          "Kompot jest symbolem bogactwa Młodziaków",
          "Żuta wylewa kompot na Józia w akcie zemsty",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Józio zaczyna „babrać się w kompocie” — wrzuca okruszyny, bełta łyżeczką. To moment przełomu: ubóstwo i obojętność Józia naruszają nowoczesny styl Młodziaków, a chichot inżyniera otwiera Józiowi drogę do ataku na pensjonarkę.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Kim jest Wałek w trzeciej części „Ferdydurke”?",
      content: {
        options: [
          "Kuzynem Józia",
          "Nauczycielem na wsi",
          "Chłopem, który atakuje dwór",
          "Lokajczykiem-parobkiem we dworze Hurleckich",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Wałek to młody lokajczyk (parobek) we dworze Hurleckich. Miętus widzi w nim wymarzony ideał „prawdziwego chłopaka” — uosabia niewysztafirowaną, ludową gębę, pozbawioną inteligenckich poz.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Jaki jest tytuł pierwszego opowiadania wtrąconego w „Ferdydurke”?",
      content: {
        options: [
          "„Filibert dzieckiem podszyty”",
          "„Filidor dzieckiem podszyty”",
          "„Pamiętnik z okresu dojrzewania”",
          "„Przedmowa do pupy”",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pierwsze opowiadanie wtrącone to „Filidor dzieckiem podszyty” — groteskowa historia o pojedynku profesora Syntezy (Filidora) z profesorem Analizy (anty-Filidorem). Kończy się konstatacją, że „wszystko podszyte jest dzieckiem”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Który uczeń w szkole protestuje słowami „nie mogę”, kwestionując zachwyt nad Słowackim?",
      content: {
        options: ["Syfon", "Miętus", "Gałkiewicz", "Myzdral"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Gałkiewicz jako jedyny otwarcie buntuje się przeciw przymusowi zachwytu: „Nie mogę zrozumieć, jak zachwyca, jeśli nie zachwyca”. Jego „nie mogę” zagraża powszechną niemożnością, która mogłaby obalić cały system szkolny.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które z poniższych cech charakteryzują nowoczesną pensjonarkę Żutę Młodziakównę? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Wysportowana, gibka i bezczelna",
          "Sentymentalna i wrażliwa na tradycję",
          "Ignoruje Norwida — nie wie, kim jest",
          "Nowoczesna, obojętna, kopie Józia w nogę",
          "Pełna szacunku wobec starszych",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Żuta to kwintesencja nowoczesnej pensjonarki: wysportowana i bezczelna, demonstracyjnie nie zna Norwida (co gorszy Pimkę), kopie Józia ukradkiem w nogę z pogardą. Jej styl opiera się na obojętności i sportowej ignorancji.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które z poniższych stwierdzeń dotyczących Formy w „Ferdydurke” są prawdziwe? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Forma jest nam narzucona z zewnątrz przez innych ludzi",
          "Człowiek może łatwo uwolnić się od Formy dzięki samej woli",
          "Forma przejawia się w gębie, pupie i łydce",
          "Uwolnienie się z jednej Formy prowadzi do popadnięcia w inną",
          "Forma dotyczy wyłącznie sztuki, nie życia codziennego",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Gombrowicz pokazuje, że Forma jest narzucona z zewnątrz, przejawia się w pupie, gębie i łydce, a ucieczka z jednej Formy prowadzi do kolejnej. Człowiek nie może żyć poza Formą — „od gęby nie ma ucieczki”.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które z poniższych środków artystycznych są charakterystyczne dla stylu „Ferdydurke”? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Neologizmy (np. „upupić”, „zbelfrzony”)",
          "Realistyczny, obiektywny opis rzeczywistości",
          "Nasilanie przez powtarzanie słów i motywów",
          "Parodia konwencji literackich (powieść szkolna, dworkowa)",
          "Zachowanie klasycznej trójjedności czasu, miejsca i akcji",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Styl „Ferdydurke” opiera się na neologizmach, nasilaniu przez powtarzanie (np. „siedział i siedział”) oraz parodii konwencji — powieści szkolnej (cz. I), nowoczesnej (cz. II), dworkowej (cz. III). Realizm jest celowo odrzucony na rzecz groteski.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które postacie należą do frakcji „chłopaków” Miętusa w szkole? Wskaż TRZY prawidłowe.",
      content: {
        options: ["Myzdral", "Syfon", "Hopek", "Kopyrda", "Miętus"],
      },
      correctAnswer: [0, 2, 4],
      metadata: {
        explanation:
          "Miętus (przywódca), Myzdral i Hopek tworzą frakcję „chłopaków” — walczą o prawo do bycia „brudnymi” i dorosłymi, przeciw narzucanej przez Pimkę i Syfona niewinności. Syfon jest ich ideologicznym przeciwnikiem, a Kopyrda stoi z boku.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które z poniższych elementów występują w „Przedmowie do Filidora dzieckiem podszytego”? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Krytyka środowiska artystycznego i drugorzędnych pisarzy",
          "Refleksja nad rolą Formy w życiu człowieka",
          "Postulat wyzwolenia się z Formy i dystansu wobec siebie",
          "Pochwała tradycyjnej konstrukcji powieściowej",
          "Opowieść o dzieciństwie Józia",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Przedmowa do Filidora to manifest filozoficzny Gombrowicza: krytyka artystycznego środowiska, refleksja o potędze Formy w życiu człowieka i postulat „Generalnego Odwrotu” — dystansu wobec własnego wyrazu i narzuconych ról.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Wyjaśnij, dlaczego Bladaczka powtarza formułę „Słowacki wielkim poetą był” i jaką funkcję pełni ta scena w powieści.",
      content: {
        instruction: "Odpowiedz w 3–5 zdaniach.",
        hints: [
          "Pomyśl o mechanizmie szkolnego nauczania",
          "Zastanów się nad krytyką kultu wieszcza",
        ],
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Bladaczka powtarza formułę tautologicznie: zachwycamy się, bo wielki poeta, a wielki, bo się zachwycamy. Scena jest satyrą na mechaniczne, bezmyślne nauczanie literatury — zamiast zrozumienia, uczniowie mają powtarzać gotowe formuły. Gombrowicz krytykuje kult wieszcza, który zamiast pobudzać, upupia i odbiera samodzielność myślenia.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 3,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Wyjaśnij, kim jest „sobowtór” Józia, który pojawia się w pierwszym rozdziale, i co symbolizuje ta scena.",
      content: {
        instruction: "Odpowiedz w 3–5 zdaniach.",
        hints: [
          "Pomyśl o konflikcie między ja wewnętrznym a zewnętrznym",
          "Zwróć uwagę na motyw lustra i formy",
        ],
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Sobowtór to zewnętrzna forma Józia — jego ciało i wygląd, które nie są wyrazem prawdziwego ja, lecz „kompromisem pomiędzy światem zewnętrznym a wewnętrznym”. Józio uderza sobowtóra w twarz, odrzucając narzuconą formę. Scena symbolizuje rozbrat między istotą człowieka a jego zewnętrznym kształtem, który jest przypadkowy i obcy.",
      },
    },

    // ===== DIFFICULTY 2 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 4,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Na podstawie znajomości powieści wyjaśnij, w jaki sposób szkoła w „Ferdydurke” upupia uczniów i jakie są tego konsekwencje.",
      content: {
        instruction:
          "Napisz notatkę syntetyczną (8–12 zdań). Uwzględnij rolę belfrów, matki za płotem, spór Syfona z Miętusem.",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Szkoła upupia przez: 1) belfrów, którzy narzucają gotowe formuły i powtarzanie (Bladaczka, łacinnik); 2) matki za płotem, które wzmacniają „pupę” dziecięcą; 3) lekcje oderwane od rzeczywistości (Słowacki, collandus sim). Konsekwencje: uczniowie tracą autentyczność, popadają w sztuczność, nie mogą uciec (palec w bucie). Spór Syfona i Miętusa to dwie reakcje na upupienie — idealizm vs brutalność — obie równie sztuczne i nieautentyczne.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Jakie dzieło literackie kryptocytuje Gombrowicz w zdaniu: „W połowie drogi mojego żywota pośród ciemnego znalazłem się lasu”?",
      content: {
        options: [
          "„Makbet” Szekspira",
          "„Boską Komedię” Dantego",
          "„Don Kichota” Cervantesa",
          "„Odę do młodości” Mickiewicza",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Jest to kryptocytat z „Boskiej Komedii” Dantego (Pieśń I: „Nel mezzo del cammin di nostra vita / mi ritrovai per una selva oscura”). Gombrowicz dodaje ironicznie: „Las ten, co gorsza, był zielony” — zielony jak niedojrzałość.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Czym jest „Przedmowa do Filidora dzieckiem podszytego” w kontekście struktury „Ferdydurke”?",
      content: {
        options: [
          "Typowym wstępem do powieści przygodowej",
          "Recenzją krytyczną innego utworu",
          "Listem do wydawcy z wyjaśnieniem kompozycji",
          "Manifestem filozoficzno-estetycznym autora wplecionym w narrację",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Przedmowy (do Filidora i do Filiberta) to fragmenty eseistyczno-filozoficzne, w których Gombrowicz prezentuje swoją koncepcję Formy, krytykuje środowisko artystyczne i formułuje postulat „wycofania się z Formy”. Są to elementy autotematyczne wplecione w narrację.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Dlaczego wuj Konstanty strzela ze sztucera w noc po przybyciu Józia i Miętusa do dworu?",
      content: {
        options: [
          "Poluje na wilka zagrażającego gospodarstwu",
          "Chce zabić Miętusa za obrażenie rodziny",
          "Odpędza złodziei, którzy włamali się do dworu",
          "Próbuje sterroryzować lud po afroncie Miętusa z parobkiem",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Konstanty strzela „na postrach” — huk ma oznajmić ludowi po najdalszych drogach i wioskach, że pan czuwa w pełnym uzbrojeniu. To akt terroru rasowego pana wobec chamstwa, reakcja na bratanie się Miętusa z Wałkiem i wyśpiewywaną pod oknami przyśpiewkę o „panu biorącym po gębie”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Co symbolizuje „pupa na niebie” w finale „Ferdydurke”?",
      content: {
        options: [
          "Nadzieję na wolność i dojrzałość",
          "Zwycięstwo Józia nad Formą",
          "Wszechobecną, infantylną siłę zniewolenia, od której nie ma ucieczki",
          "Boską opatrzność czuwającą nad bohaterem",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Pupa na niebie zamiast słońca czy księżyca to pesymistyczny symbol finałowy: infantylizacja jest totalna, kosmiczna, nie da się od niej uciec. Józio ucieka z Zosią, ale pupa „niezmiernych rozmiarów” dominuje nad światem — niedojrzałość jest losem człowieka.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Na czym polega „prawo skosu” w relacjach międzyludzkich opisywanych przez Gombrowicza?",
      content: {
        options: [
          "Na tym, że czyny ludzkie bywają skośne — fałszywy chwyt niszczy symetrię sytuacji",
          "Na tym, że ludzie zawsze zachowują się racjonalnie",
          "Na symetrii między panem a sługą",
          "Na równości wszystkich ludzi wobec Formy",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Prawo skosu to jedno z pojęć Gombrowiczowskiej psychologii: ludzkie reakcje bywają „skośne”, nieprzewidywalne, wymykają się logice sytuacji. Kopyrda łapie Młodziaka „pod kolano” zamiast dać w twarz — fałszywy chwyt rozbija porządek i wyzwala chaos.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Co Józio robi z muchą w pokoju pensjonarki i jaką pełni to funkcję?",
      content: {
        options: [
          "Wypuszcza ją przez okno — akt litości",
          "Używa jej do straszenia Żuty",
          "Obrywa jej skrzydła i nogi i wkłada do pantofla tenisowego — by skazić styl pensjonarki",
          "Zamyka ją w szufladzie jako talizman",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Józio okalecza muchę, czyniąc z niej „cierpiącą, metafizyczną kulkę”, i dokłada ją do kwiatu w tenisowym pantoflu pensjonarki. Mucha dyskwalifikuje sportowo-nowoczesną estetykę Żuty, wprowadzając ból i brzydotę w jej sterylny świat.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Jak Gombrowicz tłumaczy genezę tytułu „Ferdydurke” według badaczy?",
      content: {
        options: [
          "To polskie słowo ludowe oznaczające „głupca”",
          "To zniekształcenie imienia i nazwiska bohatera powieści S. Lewisa: „Freddy Durkee”",
          "To anagram nazwiska Gombrowicz",
          "To termin filozoficzny z dzieł Nietzschego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Badacz Bogdan Baran udowodnił, że „Ferdydurke” pochodzi od „Freddy Durkee” — postaci z powieści „Babbitt” Sinclaira Lewisa, która również jest wpędzana w dziecięctwo. Sam Gombrowicz twierdził, że tytuł jest słowem wymyślonym i prowokacyjnym.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Dlaczego chłopi w rozdziale „Parobek” szczekają jak psy, gdy Józio i Miętus przechodzą przez wieś?",
      content: {
        options: [
          "Są opętani przez złe duchy",
          "Są pijani po jarmarku",
          "Bawią się w ludową zabawę karnawałową",
          "Udają psy z mimikry — by uniknąć uczłowieczania przez inteligentów",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Chłopi na widok inteligentów szczekają i warczą — udają psy, by uniknąć kolejnych prób „uczłowieczania” przez delegatki, agitatorów i pedagogów. To groteskowa mimikra: wolą być psami niż poddawać się narzucanym im formom kultury wyższej.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które z poniższych konwencji powieściowych parodiuje Gombrowicz w „Ferdydurke”? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Powieść szkolną / o dojrzewaniu (typ „Syzyfowe prace”)",
          "Powieść detektywistyczną",
          "Powieść nowoczesną / obyczajową o postępie",
          "Powieść dworkową / ziemiańską",
          "Powieść science-fiction",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Gombrowicz parodiuje: 1) powieść szkolną (cz. I — szkoła Piórkowskiego); 2) powieść nowoczesną/obyczajową (cz. II — dom Młodziaków, postępowe poglądy); 3) powieść dworkową (cz. III — dwór Hurleckich, relacje pańsko-chamskie). Każdy schemat zostaje doprowadzony do groteskowego absurdu.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które stwierdzenia trafnie opisują relację państwa-chamstwa w części dworkowej „Ferdydurke”? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Pan i sługa wzajemnie się stwarzają i definiują",
          "Dwór żyje w lęku przed chamską krytyką służby",
          "Mordobicie jest mistyczną klamrą spajającą hierarchię",
          "Służba jest całkowicie obojętna wobec państwa",
          "Państwo i chamstwo żyją w pełnej harmonii",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Pan definiuje się wobec chama i odwrotnie — to wzajemne stwarzanie. Dwór obawia się chamskiej krytyki (Franciszek donosi). Mordobicie to odwieczny rytuał — „klamra mistyczna spajająca części pańskie i chamskie”, na której opiera się hierarchia.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question: "Wskaż TRZY cechy autotematyzmu „Ferdydurke”.",
      content: {
        options: [
          "Narrator jest jednocześnie bohaterem i autorem komentującym pisanie",
          "Powieść zawiera przedmowy o własnej konstrukcji i filozofii formy",
          "Opowiadania wtrącone (Filidor, Filibert) stanowią dygresje komentujące całość",
          "Narrator nigdy nie ujawnia swoich emocji",
          "Fabuła jest linearną opowieścią bez żadnych komentarzy",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Ferdydurke to jedna z pierwszych polskich powieści autotematycznych: narrator-bohater komentuje proces pisania, przedmowy do opowiadań wtrąconych formułują filozofię Formy, a Filidor i Filibert jako dygresje fabularne pokazują mechanizmy symetrii i analogii.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które z poniższych tez Gombrowicza zawiera „Przedmowa do Filidora”? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Forma nas stwarza równie mocno, jak my stwarzamy formę",
          "Pisarz powinien tworzyć wyłącznie arcydzieła",
          "Dojrzałe istoty są nieustannie odmładzane przez młodsze i niższe",
          "Artysta powinien oddalić się od Sztuki z wielkiej litery",
          "Konstrukcja powieści musi ściśle przestrzegać reguł klasycznych",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Przedmowa głosi: 1) Forma nas stwarza — „to, co napisałeś, dyktuje ci sens dalszy”; 2) istoty dojrzalsze są stwarzane przez młodsze — „starszy przez młodszego jest stwarzany”; 3) pisarz powinien oddalić się od Sztuki i wyrazić własną osobowość zamiast naśladować mistrzów.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Porównaj dwie frakcje szkolne — „chłopięta” Syfona i „chłopaków” Miętusa. Na czym polega ich konflikt i dlaczego obie postawy są według Gombrowicza równie sztuczne?",
      content: {
        instruction: "Odpowiedz w 5–8 zdań.",
        hints: [
          "Zwróć uwagę na pojęcie niewinności i cynizmu",
          "Pomyśl o mechanizmie wzajemnego napędzania",
        ],
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Syfon broni ideałów, niewinności i chłopięctwa — Miętus walczy o prawo do bycia dorosłym, brudnym i cynicznym. Paradoks: Syfon jest niewinny w swym pragnieniu bycia niewinnym, Miętus jest sztuczny w swym buncie. Obie frakcje napędzają się wzajemnie — im bardziej jeden broni czystości, tym bardziej drugi musi być ordynarny. Gombrowicz pokazuje, że zarówno idealizm, jak i cynizm są formami narzuconymi, równie dalekim od autentyczności.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Wyjaśnij, na czym polega strategia Józia w walce z nowoczesnym stylem pensjonarki Żuty (scena kompotu, mucha, podglądanie).",
      content: {
        instruction: "Odpowiedz w 5–8 zdań.",
        hints: [
          "Pomyśl o wprowadzaniu elementów heterogenicznych",
          "Zwróć uwagę na ubóstwo i obojętność jako broń",
        ],
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Józio walczy z nowoczesnym stylem Żuty przez wprowadzanie pierwiastków obcych i brzydkich: babrze kompot (ubóstwo i obojętność rozbijają estetykę), podkłada okaleczoną muchę do pantofla (cierpienie niszczy sportową sterylność), podgląda przez dziurkę od klucza (zmusza pensjonarkę do świadomości bycia obserwowaną). Kluczem jest „niemożność” — dopiero gdy Józiowi jest naprawdę wszystko jedno, zyskuje siłę oddziaływania.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Na podstawie opowiadania „Filidor dzieckiem podszyty” wyjaśnij, czym jest pojedynek Syntezy z Analizą i jakie jest jego przesłanie.",
      content: {
        instruction: "Odpowiedz w 5–8 zdań.",
        sourceText:
          "„Wszystko podszyte jest dzieckiem” — mówi zdziecinniały starzec Filidor na końcu opowiadania.",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Filidor (Synteta) i anty-Filidor (Analityk) to dwa przeciwstawne podejścia do rzeczywistości. Ich walka eskaluje od słów, przez policzki, do strzelania w części ciała kobiet — aż kończy się kompletnym bezsensem. Obaj zdziecinnieli i strzelają do ptaków i latarni. Przesłanie: zarówno Synteza, jak Analiza — wielkie systemy intelektualne — są „podszyte dzieckiem”, tj. u ich podstaw leży infantylna, dziecinna potrzeba.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Zanalizuj trzy środowiska ukazane w „Ferdydurke” (szkoła, dom Młodziaków, dwór Hurleckich) pod kątem mechanizmów narzucania Formy. Wskaż podobieństwa i różnice.",
      content: {
        instruction:
          "Napisz notatkę syntetyczną (10–15 zdań). Uwzględnij konkretne sceny i postacie.",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Szkoła: Forma narzucana przez pedagogów (Pimko, Bladaczka) i matki za płotem — upupianie, kult wieszcza. Dom Młodziaków: Forma nowoczesności — kult sportu, swobody obyczajowej, ignorancji (Żuta nie zna Norwida). Dwór: Forma pańskości — delikatność, kinderstuba, mordobicie jako rytuał hierarchii. Podobieństwo: wszędzie Forma jest sztuczna i ogranicza autentyczność. Różnica: szkoła infantylizuje (pupa), dom Młodziaków narzuca łydkę (nowoczesność), dwór — gębę (rasowość pańską). W każdym środowisku Józio jest więźniem cudzego grymasu.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 4,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Omów język „Ferdydurke” jako narzędzie groteski. Wskaż konkretne zabiegi językowe i ich funkcję.",
      content: {
        instruction:
          "Napisz notatkę syntetyczną (10–15 zdań). Uwzględnij neologizmy, tautologię, odwrócony szyk, parodię.",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Język Ferdydurke to kluczowe narzędzie groteski: 1) neologizmy (upupić, zbelfrzony, gębować) — tworzą własny leksykon; 2) tautologia i nasilanie (Pimko „siedział i siedział”) — budują absurd; 3) odwrócony szyk („Słowacki wielkim poetą był”) — parodiują styl belfra; 4) zdrobnienia (rączka, osóbka) — unaoczniają infantylizację; 5) język środowiskowy (mowa uczniów, Młodziaków, chłopów) — jest formą tożsamości społecznej; 6) kalambur (sztandar połyska → sztandar po łydkach). Język stwarzany jest przez sytuację i sam stwarza rzeczywistość.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Gombrowicz pisze: „istota ludzka nie wyraża się w sposób bezpośredni i zgodny ze swoją naturą, ale zawsze w jakiejś określonej formie”. Która filozofia XX wieku jest najbliższa tej myśli?",
      content: {
        options: [
          "Pozytywizm logiczny",
          "Marksizm (determinizm klasowy)",
          "Fenomenologia Husserla",
          "Egzystencjalizm (prymat egzystencji nad esencją)",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Gombrowiczowska koncepcja, że człowiek nie ma stałej natury, lecz jest „stwarzany” przez sytuacje i innych ludzi, zbliża się do egzystencjalizmu Sartre'a (prymat egzystencji nad esencją). Gombrowicza uważa się za jednego z prekursorów tego kierunku.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Jak Gombrowicz rozumie pojęcie „niedojrzałości” w kontekście filozoficznym powieści?",
      content: {
        options: [
          "Jako wadę charakteru, którą należy przezwyciężyć",
          "Jako cechę wyłącznie młodzieży",
          "Jako ostatnią przestrzeń wolności i autentyczności, wolną od skostniałej Formy",
          "Jako syndrom chorobowy wymagający leczenia",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Dla Gombrowicza niedojrzałość nie jest wadą, lecz „jedynym obszarem wolnym od kostiumów kulturowych” — ostatnią przestrzenią autentyczności. Dojrzałość to wybór Formy i utrata świeżości. Bohater „woli bezkształtny chaos” od sztywnych definicji.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Które stwierdzenia trafnie opisują „Generalny Odwrót”, postulowany przez Gombrowicza w przedmowie do Filidora? Wskaż TRZY prawidłowe.",
      content: {
        options: [
          "Człowiek powinien zdystansować się wobec wszystkiego, co go określa",
          "Należy ufać własnym słowom i wierzyć w swoje deklaracje",
          "Zamiast „ja w to wierzę” powiemy „mnie się w to wierzy",
          "Wieszcz powinien wzgardzić swym śpiewem, wódz zadrży przed rozkazem",
          "Forma jest ostateczna i nie da się jej przezwyciężyć",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Generalny Odwrót to postulat dystansu wobec wszelkiej Formy: zamiast utożsamiać się z rolami, lękać się własnego wyrazu. „Mnie się w to wierzy” zamiast „ja w to wierzę”. Wieszcz wzgardzi śpiewem, wódz zadrży — bo zrozumieją, że ich wyrazy nie są w pełni ich własne.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Gombrowicz pisze w przedmowie: „starszy przez młodszego jest stwarzany”. Wyjaśnij tę tezę i wskaż jej realizację w fabule „Ferdydurke”.",
      content: {
        instruction: "Odpowiedz w 6–10 zdań.",
        sourceText:
          "„Czyż pisząc nie musimy przystosowywać się do czytelnika? Mówiąc — nie uzależniamy się od osoby, dla której mówimy?”",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Gombrowicz twierdzi, że istoty dojrzalsze są kształtowane przez młodsze i niższe: pisarz przez czytelnika, dorosły przez dziecko, inteligent przez gmin. W fabule: Pimko udaje starego dziadka pod wpływem nowoczesnej Żuty; Józio jest stwarzany przez pensjonarkę; dwór Hurleckich jest definiowany przez swoich chłopów. Człowiek jest „funkcją innych ludzi” i musi przystosowywać się do wyobrażeń, jakie mają o nim istoty niższe.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Porównaj filozofię Formy Gombrowicza w „Ferdydurke” z romantycznym kultem indywidualności. Czy Gombrowicz jest kontynuatorem, czy krytykiem romantyzmu?",
      content: {
        instruction:
          "Napisz notatkę syntetyczną (10–15 zdań). Uwzględnij kryptocytat z Dantego, scenę lekcji o Słowackim, kult wieszcza.",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Gombrowicz jest zarazem kontynuatorem i krytykiem romantyzmu. Z romantykami dzieli fascynację jednostką i wolnością (jak Konrad walczył z Bogiem, tak Józio walczy z Formą). Ale kwestionuje romantyczny kult wieszcza (parodia lekcji o Słowackim — „wielkim poetą był” to pusta tautologia). Kryptocytat z Dantego sygnalizuje dialog z tradycją, ale „zielony las” ironizuje z wzniosłości. Gombrowicz odrzuca gotowe „dojrzałe” wzorce romantyczne, postulując niedojrzałość jako przestrzeń wolności — to anty-romantyczny gest dokonany romantycznymi środkami.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Gombrowicz pisze: „nie jestże prawdą, że ludzkość tworzy sztukę nie tylko na papierze lub na płótnie, ale w każdym momencie życia codziennego?” Jak ta myśl zmienia tradycyjne rozumienie sztuki?",
      content: {
        options: [
          "Sztuka staje się demokratyczna — każdy jest po trosze artystą",
          "Sztuka traci wszelkie znaczenie",
          "Tylko profesjonalni artyści tworzą prawdziwą sztukę",
          "Życie codzienne jest gorsze od sztuki",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Gombrowicz zrównuje sztukę z codziennym praktykowaniem formy: „gdy dziewczę wpina kwiat we włosy, gdy w rozmowie wypsnie się wam żarcik” — to także tworzenie. Podział na „artystów” i resztę jest sztuczny. To rewolucyjne rozszerzenie pojęcia sztuki na wszelką ludzką formę i styl bycia.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 1,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Jaki jest stosunek Gombrowicza do koncepcji „stałej osobowości” człowieka w świetle „Ferdydurke”?",
      content: {
        options: [
          "Twierdzi, że osobowość jest płynna — stwarzana przez innych i przez okoliczności",
          "Potwierdza, że człowiek ma niezmienną osobowość daną od urodzenia",
          "Uważa, że osobowość kształtuje wyłącznie wychowanie szkolne",
          "Ignoruje problem osobowości na rzecz kwestii społecznych",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Gombrowicz odrzuca stałą osobowość: człowiek „tworzy się wciąż i zmienia na naszych oczach, pod wpływem kontaktów z otoczeniem”. Józio jest inny z Pimką, inny z Żutą, inny z Hurleckimi. Osobowość to dynamiczny proces, nie gotowy produkt — to prekursorska myśl wobec egzystencjalizmu.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Porównaj groteskę w „Ferdydurke” Gombrowicza z groteską w „Tangu” Mrożka lub innym znanym Ci utworze groteskowym. Wskaż podobieństwa i różnice w funkcji groteski.",
      content: {
        instruction: "Odpowiedz w 8–12 zdań.",
        hints: [
          "Zwróć uwagę na cel groteski: demaskacja Formy vs krytyka anarchii",
          "Porównaj finały obu utworów",
        ],
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "U Gombrowicza groteska demaskuje Formę jako mechanizm przemocy symbolicznej — śmiech ujawnia sztuczność masek. W Tangu Mrożka groteska pokazuje świat bez hierarchii, gdzie bunt (Arta) sam staje się nową Formą, a triumfuje brutalna siła (Edek). Podobieństwo: obie groteski pokazują, że gest sprzeciwu wikła się w nowe schematy. Różnica: Gombrowicz szuka wolności w dystansie do Formy, Mrożek ostrzega przed anarchią, która rodzi dyktaturę.",
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "Czy „Ferdydurke” jest powieścią o szkole, czy o kondycji ludzkiej? Napisz rozprawkę, w której uzasadnisz swoją odpowiedź, odwołując się do trzech części powieści.",
      content: {
        instruction:
          "Napisz rozprawkę (min. 250 słów). Sformułuj tezę, podaj argumenty z tekstu, napisz wnioski.",
        slogan:
          "„Forma nasza przenika nas, więzi od wewnątrz równie, jak od zewnątrz” — W. Gombrowicz",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Oczekiwana argumentacja: szkoła jest jednym z trzech środowisk, ale mechanizm upupiania/gębowania jest uniwersalny — występuje też w domu Młodziaków i we dworze. Forma jest ludzkim losem, nie tylko szkolnym problemem. Szkoła jest metonimią kultury, która narzuca niedojrzałość. Uczeń powinien wykazać, że powieść przekracza satyrę na szkołę i staje się filozoficzną parabolą o kondycji człowieka w społeczeństwie.",
      },
    },

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "INTERWAR",
      work: "Ferdydurke",
      question:
        "„Człowiek jest najgłębiej uzależniony od swego odbicia w duszy drugiego człowieka, chociażby ta dusza była kretyniczna”. Odwołując się do „Ferdydurke”, napisz rozprawkę o tym, jak inni ludzie kształtują naszą tożsamość.",
      content: {
        instruction:
          "Napisz rozprawkę (min. 250 słów). Sformułuj tezę, podaj argumenty z tekstu i z własnych przemyśleń, napisz wnioski.",
        slogan:
          "„Zaprawdę, w świecie ducha odbywa się gwałt permanentny, nie jesteśmy samoistni, jesteśmy tylko funkcją innych ludzi” — W. Gombrowicz",
      },
      correctAnswer: null,
      metadata: {
        explanation:
          "Oczekiwana argumentacja: tożsamość w Ferdydurke jest relacyjna — Józio jest inny wobec Pimki, Żuty, Hurleckich. „Przyprawianie gęby” to uniwersalny mechanizm. Nawet sądy głupich i niskich mają na nas wpływ (metafora ciasnego trzewika). Uczeń powinien odnieść się do konkretnych scen (Pimko upupia, pensjonarka narzuca gębę, dwór definiuje się wobec chama) i wyciągnąć wnioski o współczesnych mechanizmach kształtowania tożsamości.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    // ===== DIFFICULTY 5 — ESSAY (2) =====

    // ======================= KONIEC PYTAŃ FERDYDURKE ===================//
  ];

  const exercisesWithTags = exercises.map((exercise) => ({
    ...exercise,
    tags: [
      exercise.category.toLowerCase(),
      exercise.type.toLowerCase(),
      `difficulty-${exercise.difficulty}`,
      exercise.epoch ? exercise.epoch.toLowerCase() : null,
      `batch-2025-01`,
      ...((exercise as any).tags || []),
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
        error,
      );
    }
  }

  console.log(
    `\n✨ Seeding completed! Added ${exercisesWithTags.length} exercises.`,
  );
}

// Uruchom seed
seedExercises()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
