// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Kto jest autorem powieści „Ludzie bezdomni”?",
      content: {
        options: [
          "Bolesław Prus",
          "Stefan Żeromski",
          "Władysław Reymont",
          "Henryk Sienkiewicz",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Ludzie bezdomni” to powieść Stefana Żeromskiego, napisana w 1899 roku w Zakopanem. Jest jednym z najważniejszych dzieł polskiej literatury młodopolskiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Jaki zawód wykonuje Tomasz Judym?",
      content: {
        options: ["Adwokat", "Inżynier", "Lekarz", "Nauczyciel"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tomasz Judym jest lekarzem-chirurgiem. Ukończył medycynę w Warszawie, a następnie odbywał praktykę w klinikach paryskich w dziedzinie chirurgii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Czym z zawodu zajmował się ojciec Tomasza Judyma?",
      content: {
        options: [
          "Był krawcem",
          "Był stolarzem",
          "Był szewcem",
          "Był rzeźnikiem",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Ojciec Tomasza Judyma był szewcem na ulicy Ciepłej w Warszawie. Sam Judym wyznaje to otwarcie przy pierwszym spotkaniu z panią Niewadzką w Luwrze: „Ojciec mój był szewcem, a w dodatku lichym szewcem na Ciepłej ulicy”.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "W którym muzeum Tomasz Judym ogląda posąg Wenus z Milo?",
      content: {
        options: [
          "W Muzeum Orsay",
          "W Luwrze",
          "W Galerii Luksemburskiej",
          "W British Museum",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judym ogląda posąg Wenus z Milo w Luwrze (Louvre) w Paryżu. Właśnie tam po raz pierwszy spotyka pannę Joannę Podborską i wnuczki pani Niewadzkiej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Jak nazywa się zakład leczniczy, w którym Judym pracuje jako asystent dyrektora?",
      content: {
        options: ["Nałęczów", "Cisy", "Busko-Zdrój", "Ciechocinek"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Cisy to fikcyjny zakład leczniczy (kurort), wzorowany na Nałęczowie. Judym trafia tam jako asystent dyrektora, doktora Węglichowskiego, na zaproszenie tego ostatniego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Jaki zawód wykonuje Joanna Podborska?",
      content: {
        options: [
          "Jest lekarką",
          "Jest nauczycielką i guwernantką",
          "Jest malarką",
          "Jest aktorką",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Joanna Podborska jest nauczycielką i guwernantką. Opiekuje się wnuczkami pani Niewadzkiej — pannami Natalią i Wandą Orszeńskimi. Sama utrzymuje się z dawania lekcji prywatnych.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "W których miastach i miejscowościach rozgrywa się akcja powieści „Ludzie bezdomni”?",
      content: {
        options: [
          "Paryż",
          "Warszawa",
          "Kraków",
          "Cisy (fikcyjny zakład leczniczy)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Akcja „Ludzi bezdomnych” rozgrywa się w Paryżu (tom I), Warszawie (tom I), Cisach — fikcyjnym zakładzie leczniczym wzorowanym na Nałęczowie (tom I i II) oraz w Zagłębiu Dąbrowskim (tom II). Kraków nie jest miejscem akcji powieści.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które z wymienionych postaci są wnuczkami pani Niewadzkiej?",
      content: {
        options: [
          "Joanna Podborska",
          "Natalia Orszeńska",
          "Wanda Orszeńska",
          "Helena Kalinowicz",
        ],
      },
      correctAnswer: [1, 2],
      metadata: {
        explanation:
          "Wnuczkami pani Niewadzkiej są panny Natalia i Wanda Orszeńskie — sieroty, które wychowuje babka. Joanna Podborska jest ich nauczycielką i przyjaciółką, a Helena Kalinowicz to córka dyrektora kopalni.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które z podanych informacji o Tomaszu Judymie są prawdziwe?",
      content: {
        options: [
          "Pochodzi z ubogiej rodziny rzemieślniczej",
          "Studiował medycynę w Paryżu od początku",
          "Ukończył medycynę w Warszawie",
          "Odbywał praktykę chirurgiczną w Paryżu",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Judym pochodzi z rodziny szewca z ulicy Ciepłej w Warszawie, ukończył medycynę w Warszawie, a następnie wyjechał na praktykę chirurgiczną do Paryża. Nie studiował medycyny w Paryżu — tam jedynie pracował w klinikach.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Przy okazji jakiego zdarzenia Tomasz Judym po raz pierwszy spotyka pannę Joannę Podborską i panny Orszeńskie?",
      content: {},
      correctAnswer:
        "Judym spotyka je po raz pierwszy w Luwrze w Paryżu, podczas oglądania posągu Wenus z Milo. Ustąpił im miejsca na ławeczce, a następnie zaoferował pomoc w znalezieniu drogi do rzeźby Amora i Psyche Canovy.",
      metadata: {
        explanation:
          "Spotkanie w Luwrze jest sceną otwierającą powieść i kluczowym momentem fabularnym. Judym rozpoznaje w przybyszkach Polki po zasłyszanej rozmowie po polsku.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Co jest głównym tematem odczytu, który Tomasz Judym wygłasza w salonie doktora Czernisza?",
      content: {
        options: [
          "Nowe odkrycia w chirurgii",
          "Higiena życia najuboższych warstw i obowiązki lekarzy wobec nich",
          "Porównanie systemów szpitalnych Francji i Polski",
          "Przyczyny rozprzestrzeniania się gruźlicy w miastach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W swoim odczycie Judym omawia warunki higieniczne życia najuboższych, opisuje nędzę paryskich noclegowni i warszawskich suteren, a przede wszystkim zarzuca lekarzom, że są „lekarzami ludzi bogatych” i zaniedbują swoje obowiązki wobec biedoty.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Kim jest doktor Chmielnicki i jaką rolę odgrywa w życiu Judyma?",
      content: {
        options: [
          "Jest profesorem medycyny, który recenzuje odczyt Judyma",
          "Jest żydowskim lekarzem, który współczuje Judymowi i pośredniczy w znalezieniu mu posady w Cisach",
          "Jest rywalem Judyma w staraniach o pannę Podborską",
          "Jest dyrektorem szpitala, w którym Judym pracuje w Warszawie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Doktor Chmielnicki to lekarz żydowskiego pochodzenia, który po nieudanym odczycie Judyma jako jedyny okazuje mu szczere współczucie. To on pośredniczy w znalezieniu Judymowi posady asystenta w Cisach u doktora Węglichowskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Co Judym postanawia zrobić w zakończeniu powieści?",
      content: {
        options: [
          "Wyjechać z Joasią za granicę",
          "Poślubić Joasię i założyć szpital w Zagłębiu",
          "Zerwać z Joasią i poświęcić się pracy dla biednych",
          "Wrócić do Cisów i pogodzić się z dyrektorem",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W ostatnim rozdziale Judym rozstaje się z Joasią, uznając, że nie może mieć „ani ojca, ani matki, ani żony”, dopóki trwa nędza najuboższych. Zrywa z osobistym szczęściem, by poświęcić się pracy społecznej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Kto wychował Tomasza Judyma i umożliwił mu zdobycie wykształcenia?",
      content: {
        options: [
          "Brat Wiktor i jego żona",
          "Ciotka, dawna kurtyzana",
          "Doktor Czernisz i jego żona",
          "Proboszcz z rodzinnej parafii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judyma wychowała ciotka, która — jak sam przyznaje — „niegdyś była cudną dziewczyną” i prowadziła wystawne życie. Zebrała pieniądze, wynajęła mieszkanie i wzięła małego Tomasza od rodziny, opłacając mu edukację, choć traktowała go surowo.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "W jaki sposób Judym traci posadę w Cisach?",
      content: {
        options: [
          "Zostaje zwolniony za romans z panną Natalią",
          "Pobija administratora Krzywosąda podczas kłótni o szlam w rzece i dyrektor rozwiązuje z nim umowę",
          "Sam składa rezygnację, nie mogąc znieść braku reform",
          "Pani Niewadzka nakazuje jego zwolnienie za naruszenie regulaminu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judym, wściekły na zanieczyszczanie rzeki szlamem ze stawu, nazywa Krzywosąda „starym osłem”, a gdy ten podnosi pięść, chwyta go za gardziel i wrzuca do bagna. Dyrektor Węglichowski natychmiast rozwiązuje z nim umowę listem.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które dzieła sztuki pełnią funkcję symboli w powieści „Ludzie bezdomni”?",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Wenus z Milo" },
          { id: "B", text: "„Ubogi rybak” Puvis de Chavannes'a" },
          { id: "C", text: "Kwiat tuberozy" },
          { id: "D", text: "Rozdarta sosna" },
        ],
        rightColumn: [
          { id: "1", text: "Piękno, miłość, harmonia" },
          { id: "2", text: "Nędza, krzywda społeczna" },
          { id: "3", text: "Wewnętrzne rozdarcie Judyma" },
          { id: "4", text: "Bezużyteczne piękno (Karbowski)" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 3],
        [3, 2],
      ],
      metadata: {
        explanation:
          "Wenus z Milo symbolizuje piękno i urodę życia. Obraz „Ubogi rybak” — nędzę i krzywdę społeczną. Kwiat tuberozy — bezużyteczne piękno, do którego Judym porównuje utracjusza Karbowskiego. Rozdarta sosna — wewnętrzne rozdarcie bohatera po rozstaniu z Joasią.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Brat Tomasza Judyma nazywa się (1) i pracuje w (2). Żona brata Tomasza pracuje w fabryce (3).",
        gaps: [
          {
            id: 1,
            options: ["Wiktor", "Henryk", "Wacław", "Oleś"],
          },
          {
            id: 2,
            options: ["kopalni węgla", "stalowni", "hucie szkła", "drukarni"],
          },
          {
            id: 3,
            options: ["czekolady", "cygar", "tkanin", "zapałek"],
          },
        ],
      },
      correctAnswer: [0, 1, 1],
      metadata: {
        explanation:
          "Brat Tomasza to Wiktor Judym, robotnik pracujący przy stalowni (gruszce Bessemera). Jego żona (Judymowa) pracuje w fabryce cygar, w okropnych warunkach — w dusznym powietrzu pełnym pyłu tytoniowego.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które stwierdzenia dotyczące Joanny Podborskiej są prawdziwe?",
      content: {
        options: [
          "Pochodzi ze zubożałej rodziny ziemiańskiej",
          "Prowadzi dziennik, w którym opisuje swoje przemyślenia",
          "Wychowała się w zamożnym domu w Warszawie",
          "Straciła brata Wacława, który zmarł na dalekim zesłaniu",
        ],
      },
      correctAnswer: [0, 1],
      metadata: {
        explanation:
          "Joanna pochodzi ze zubożałej rodziny — straciła rodziców, wychowywała się w Kielcach u ciotki Ludwiki. Prowadzi dziennik (rozdział „Zwierzenia”). Nie wychowała się w zamożnym domu. Brat Wacław zmarł, ale na zesłaniu na Syberii, a nie „dalekim” — umarł prawdopodobnie podczas podróży naukowej.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Opisz, w jakich warunkach pracowała bratowa Judyma w fabryce cygar.",
      content: {
        hints: ["duszące powietrze", "pył tytoniu", "tempo pracy"],
      },
      correctAnswer:
        "Judymowa pracowała w fabryce cygar w okropnych warunkach. Duszące powietrze było pełne pyłu tytoniowego, który żarł gardziel i oczy. Praca odbywała się w szalonym tempie — czteroosobowe zespoły pakowały tysiąc funtów tytoniu dziennie, poświęcając na jedną paczkę zaledwie dziesięć sekund.",
      metadata: {
        explanation:
          "Opis fabryki cygar to jeden z naturalistycznych fragmentów powieści. Żeromski szczegółowo pokazuje wyniszczającą pracę fizyczną kobiet, eksponując biologiczne skutki takich warunków.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Kim jest M. Les (Leszczykowski) i jaką rolę odgrywa w historii zakładu w Cisach?",
      content: {},
      correctAnswer:
        "M. Les to bogaty kupiec polskiego pochodzenia, mieszkający w Konstantynopolu. Jest największym udziałowcem zakładu w Cisach, dawnym przyjacielem Niewadzkiego. Finansuje z „cichej kasy” reformy Judyma, choć sam nigdy do Cisów nie przyjechał. Jest idealistą, który marzy o ucywilizowaniu rodzinnej okolicy.",
      metadata: {
        explanation:
          "Leszczykowski to postać łącząca twardą praktykę kupiecką z marzycielskim idealizmem. Jego pseudonim M. Les (skrót od Leszczykowski) to jedyne, co z polskiego nazwiska mogło przetrwać w handlu turecko-angielsko-francuskim.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Wyjaśnij znaczenie poniższego hasła w kontekście powieści „Ludzie bezdomni”:",
      content: {
        slogan: "Lekarz dzisiejszy — to lekarz ludzi bogatych",
      },
      correctAnswer:
        "To centralna teza odczytu Judyma. Oznacza, że lekarze jego epoki koncentrują się na leczeniu warstw zamożnych, zaniedbując higienę i zdrowie biedoty. Judym uważa, że stan lekarski powinien wziąć odpowiedzialność za warunki życia najuboższych.",
      metadata: {
        explanation:
          "Zdanie to pada podczas odczytu u Czerniszów i wywołuje skandal wśród warszawskich lekarzy. Jest to klucz do zrozumienia ideowej postawy Judyma w całej powieści.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Dlaczego odczyt Judyma u doktorostwa Czerniszów kończy się porażką?",
      content: {
        options: [
          "Judym nie przygotował się merytorycznie i popełnia błędy naukowe",
          "Odczyt jest zbyt radykalny — zarzuca lekarzom zaniedbywanie biedoty, a zgromadzeni nie uznają takich obowiązków za lekarskie",
          "Żona doktora Czernisza przerywa wystąpienie, uznając je za nudne",
          "Judym plagiatuje pracę innego lekarza i zostaje publicznie zdemaskowany",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Odczyt Judyma jest odrzucony, ponieważ jego postulaty — żeby lekarze walczyli z przyczynami chorób biedoty, a nie tylko je leczyli — uznano za utopijne i niestosowne. Doktor Kalecki łagodnie, a doktor Płowicz ostro krytykują jego idee jako „mrzonki”.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Co symbolizuje obraz „Ubogi rybak” Puvis de Chavannes'a przywołany w powieści?",
      content: {
        sourceText: {
          author: "Stefan Żeromski",
          title: "Ludzie bezdomni",
          text: "Chudy człowiek, a właściwie nie człowiek, lecz antropoid z przedmieścia wielkiej stolicy, obrosły kłakami (...) stał znowu przed nim ze swą podrywką zanurzoną w wodę.",
        },
        options: [
          "Piękno i harmonię życia",
          "Nędzę, krzywdę społeczną i cierpienie najuboższych",
          "Bezużyteczne piękno arystokracji",
          "Tęsknotę za utraconą ojczyzną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Ubogi rybak” jest symbolem nędzy i krzywdy społecznej — stanowi kontrast wobec Wenus z Milo, symbolizującej piękno i harmonię. Obraz ten głęboko porusza Judyma i zapowiada główny konflikt powieści.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Z jakim problemem zdrowotnym walczy Judym w Cisach i jaką napotyka przeszkodę?",
      content: {
        options: [
          "Walczy z epidemią tyfusu, ale brakuje mu leków",
          "Walczy z malarią wywołaną wilgocią ze stawów i sadzawek, ale dyrektor i administrator nie zgadzają się na osuszenie terenu",
          "Walczy z gruźlicą wśród kuracjuszów, ale zakład nie ma pieniędzy na leczenie",
          "Walczy z ospą wśród dzieci, ale rodzice odmawiają szczepień",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judym odkrywa, że malaria w Cisach spowodowana jest stojącą wodą w stawach i sadzawkach parkowych. Proponuje osuszenie terenu i podniesienie dna rzeki, ale napotyka opór dyrektora Węglichowskiego i administratora Krzywosąda, którzy bronią istniejących urządzeń wodnych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Który z poniższych zabiegów stylistycznych jest charakterystyczny dla tzw. „żeromszczyzny”?",
      content: {
        options: [
          "Stosowanie wyłącznie krótkich, prostych zdań",
          "Łączenie realizmu z symbolizmem, impresjonizmem i liryzacją prozy",
          "Konsekwentne stosowanie narracji pierwszoosobowej",
          "Unikanie opisów przyrody na rzecz dialogów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Żeromszczyzna” to styl łączący różne techniki pisarskie: realizm, naturalizm, impresjonizm, symbolizm. Charakteryzuje się liryzacją prozy, psychizacją pejzażu (opisy przyrody odzwierciedlające stany ducha bohaterów) oraz emocjonalnym zaangażowaniem narratora.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które z poniższych motywów literackich obecne są w powieści „Ludzie bezdomni”?",
      content: {
        options: [
          "Motyw poświęcenia osobistego szczęścia dla dobra ogółu",
          "Motyw bezdomności w sensie dosłownym i metaforycznym",
          "Motyw zemsty za doznane krzywdy",
          "Motyw niespełnionej miłości",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Ludzie bezdomni” poruszają motywy: poświęcenia (rezygnacja Judyma ze szczęścia), bezdomności (dosłownej — nędzarze; metaforycznej — Judym, Joasia, emigranci), niespełnionej miłości (Judym i Joasia). Motyw zemsty nie jest obecny w powieści.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które stwierdzenia o tytule powieści „Ludzie bezdomni” są trafne?",
      content: {
        options: [
          "Tytuł odnosi się wyłącznie do paryskich nędzarzy z noclegowni Château-Rouge",
          "Tytuł ma znaczenie metaforyczne — bezdomny jest też Judym, wyrzekający się domu dla idei",
          "Bezdomna jest Joanna Podborska — guwernantka bez własnego kąta",
          "Tytuł nawiązuje do biblijnego motywu wygnania z raju",
        ],
      },
      correctAnswer: [1, 2],
      metadata: {
        explanation:
          "Tytuł ma wiele warstw znaczeniowych: bezdomni dosłownie to paryska i warszawska biedota, ale metaforycznie bezdomny jest sam Judym (świadomie wyrzekający się domu), Joasia (guwernantka bez stałego miejsca), emigranci. Tytuł nie nawiązuje bezpośrednio do biblijnego wygnania z raju.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Połącz postacie z ich cechami lub rolami w powieści:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Krzywosąd Chobrzański" },
          { id: "B", text: "Doktor Węglichowski" },
          { id: "C", text: "Karbowski" },
          { id: "D", text: "Korzecki" },
        ],
        rightColumn: [
          {
            id: "1",
            text: "Inżynier-filozofem z nerwicą, który popełnia samobójstwo",
          },
          {
            id: "2",
            text: "Dyrektor zakładu, ceniony lekarz, ale konserwatywny",
          },
          {
            id: "3",
            text: "Przystojny lekkoduch i karciarz, ukochany panny Natalii",
          },
          {
            id: "4",
            text: "Administrator Cisów, antykwariusz-samouk, majsterkowicz",
          },
        ],
      },
      correctAnswer: [
        [0, 3],
        [1, 1],
        [2, 2],
        [3, 0],
      ],
      metadata: {
        explanation:
          "Krzywosąd to administrator Cisów, dawny antykwariusz z Monachium, który sam naprawia wszystko w zakładzie. Węglichowski to dyrektor i lekarz, szanowany, ale niechętny reformom. Karbowski — przystojny karciarz, w którym zakochuje się Natalia Orszeńska. Korzecki — inżynier-filozof, cierpiący na pavor nocturnus, który popełnia samobójstwo.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Odpowiedz na pytania dotyczące rozdziału „Zwierzenia”:",
      content: {
        steps: [
          { id: 1, instruction: "Kto jest narratorką tego rozdziału?" },
          {
            id: 2,
            instruction: "Jaką formę literacką przybiera ten rozdział?",
          },
          {
            id: 3,
            instruction:
              "Jakie problemy i tematy porusza narratorka w swoich zapisach?",
          },
        ],
      },
      correctAnswer:
        "1) Narratorką jest Joanna Podborska. 2) Rozdział ma formę dziennika (pamiętnika) prowadzonego od października do czerwca. 3) Joanna porusza tematy: samotności guwernantki, śmierci brata Wacława, trudów pracy nauczycielskiej, feminizmu i roli kobiet, wrażeń estetycznych (teatr, literatura), tęsknoty za domem rodzinnym.",
      metadata: {
        explanation:
          "Rozdział „Zwierzenia” to jedyny fragment powieści pisany w pierwszej osobie (forma dziennika). Ujawnia wewnętrzny świat Joanny — jej wrażliwość, inteligencję, samotność i społeczne zaangażowanie.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Jaką funkcję pełni scena w Château-Rouge w kontekście odczytu Judyma?",
      content: {
        instruction:
          "Wyjaśnij, czym jest Château-Rouge, co tam widział Judym i jak to doświadczenie wpłynęło na jego poglądy.",
      },
      correctAnswer:
        "Château-Rouge to paryska noclegownia dla nędzarzy, w której Judym spędził jedną dobę. Widział tam setki biedaków śpiących na podłodze, prostytutki, zbieraczy niedopałków — najniższą warstwę społeczeństwa. To doświadczenie bezpośredniego kontaktu z nędzą stało się fundamentem jego przekonań o obowiązku lekarzy wobec biedoty i materiałem do odczytu u Czerniszów.",
      metadata: {
        explanation:
          "Opis Château-Rouge to naturalistyczny fragment powieści, wzorowany na autentycznych materiałach, które Żeromski zbierał o paryskich noclegowniach. Stanowi argumentacyjny rdzeń odczytu Judyma.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Wyjaśnij, czym jest psychizacja pejzażu i podaj przykład z powieści „Ludzie bezdomni”.",
      content: {},
      correctAnswer:
        "Psychizacja pejzażu to technika narracyjna, w której opisy przyrody odzwierciedlają stan psychiczny bohatera. Przykładem jest rozdział „Smutek” — jesienny park ze spadającymi liśćmi, chłodem i ciszą oddaje wewnętrzny smutek Judyma po nieudanym odczycie. Kolejny przykład to rozdział „Przyjdź” — wiosenna przyroda z kwitnącymi krzewami wyraża radość i tęsknotę miłosną.",
      metadata: {
        explanation:
          "Psychizacja pejzażu to jeden z najcharakterystyczniejszych elementów „żeromszczyzny”. Żeromski nie tyle opisuje przyrodę, ile każe jej „mówić” uczuciami bohatera.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Znaczenie kontrastowych dzieł sztuki w „Ludziach bezdomnych” — Wenus z Milo i „Ubogi rybak”",
        requirements: [
          "Opisz symbolikę obu dzieł",
          "Wyjaśnij funkcję kontrastu między nimi",
          "Odnieś się do postaci Tomasza Judyma",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Notatka powinna zawierać: Wenus z Milo — symbol piękna, harmonii, miłości, świata ludzi bogatych; „Ubogi rybak” — symbol nędzy, krzywdy społecznej, cierpienia. Kontrast między nimi zapowiada główny dylemat powieści i rozdarcie Judyma między pragnieniem pięknego życia a poczuciem obowiązku wobec biedoty. Oba dzieła definiują wrażliwość bohatera — zdolnego do odczuwania zarówno zachwytu pięknem, jak i bólu na widok ludzkiego cierpienia.",
      metadata: {
        explanation:
          "Żeromski celowo umieścił oba symbole w pierwszym rozdziale, by zapowiedzieć problematykę powieści. Wrażliwość Judyma na oba bieguny rzeczywistości — piękno i nędzę — jest kluczem do zrozumienia jego tragicznego wyboru.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Jaką funkcję w strukturze powieści pełni rozdział „Zwierzenia”, będący dziennikiem Joanny Podborskiej?",
      content: {
        options: [
          "Służy wyłącznie jako przerywnik fabularny oddzielający dwa tomy powieści",
          "Ujawnia wewnętrzny świat Joanny, równoważy perspektywę Judyma i wprowadza problematykę kobiecą oraz egzystencjalną",
          "Jest zapisem historycznym dokumentującym realia Warszawy końca XIX wieku",
          "Stanowi krytykę systemu edukacji w zaborze rosyjskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rozdział „Zwierzenia” zmienia perspektywę narracyjną — z trzeciej osoby na dziennik pisany przez Joannę. Ujawnia jej głębię intelektualną i emocjonalną, porusza kwestie feminizmu, samotności, śmierci, sensu pracy. Równoważy obraz Judyma, pokazując, że Joanna jest równie głębokim i złożonym bohaterem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Dlaczego decyzję Judyma o rozstaniu z Joasią można uznać za tragiczną?",
      content: {
        options: [
          "Ponieważ Joasia nie kocha go naprawdę i odrzuca jego oświadczyny",
          "Ponieważ zmusza go do niej zewnętrzna siła — dyrektor Węglichowski",
          "Ponieważ Judym wybiera między dwoma wartościami — miłością i powołaniem do pracy dla biednych — i każdy wybór oznacza stratę",
          "Ponieważ Joasia jest już zaręczona z kimś innym",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tragizm Judyma polega na konieczności wyboru między dwoma pozytywnymi wartościami: osobistym szczęściem (miłość do Joasi) a imperatywem moralnym (praca dla najuboższych). Oba dążenia są szlachetne, ale nie dają się pogodzić w jego sumieniu. To klasyczny model konfliktu tragicznego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Co łączy, a co różni Tomasza Judyma i Joannę Podborską jako „ludzi bezdomnych”?",
      content: {
        options: [
          "Oboje są bezdomni w sensie materialnym — nie mają mieszkań ani pieniędzy",
          "Oboje są bezdomni duchowo — pozbawieni przynależności klasowej i rodzinnego ciepła — ale Judym świadomie wybiera bezdomność, a Joasia jest nią dotknięta przez los",
          "Oboje świadomie odrzucają możliwość posiadania domu dla kariery zawodowej",
          "Joasia jest bezdomna tylko materialnie, podczas gdy Judym tylko duchowo",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oboje są „bezdomni” — pozbawieni rodzin, korzeni, stabilności. Joasia straciła rodzinny dom jako sierota i guwernantka, tęskni za nim (Głogi, Mękarzyce). Judym natomiast świadomie odrzuca możliwość założenia domu, uznając, że dług wobec biedoty uniemożliwia mu posiadanie rodziny.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które cechy powieści młodopolskiej realizuje utwór „Ludzie bezdomni”?",
      content: {
        options: [
          "Luźna kompozycja i wielowątkowość",
          "Obecność symbolizmu, impresjonizmu i naturalizmu w jednym dziele",
          "Konsekwentna narracja pierwszoosobowa przez całą powieść",
          "Liryzacja prozy i subiektywizacja świata przedstawionego",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Ludzie bezdomni” realizują cechy powieści młodopolskiej: luźną kompozycję (epizodyczność, brak ciągłej akcji), współistnienie różnych estetyk (symbolizm, naturalizm, impresjonizm), liryzację prozy (poetyckie opisy przyrody, psychizacja pejzażu). Narracja jest trzecioosobowa, z wyjątkiem rozdziału „Zwierzenia” (dziennik Joanny).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które z poniższych interpretacji końcowej sceny z rozdartą sosną są uzasadnione?",
      content: {
        options: [
          "Sosna symbolizuje wewnętrzne rozdarcie Judyma — między miłością a obowiązkiem",
          "Sosna symbolizuje triumf Judyma nad egoizmem",
          "Krwawe krople żywicy nawiązują do cierpienia Judyma po utracie Joasi",
          "Płacz, którego Judym nie potrafi zidentyfikować, wyraża uniwersalność ludzkiego cierpienia",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Rozdarta sosna to centralny symbol powieści. Jej pień rozszarpany odzwierciedla rozdarcie duszy Judyma. Krople żywicy odpowiadają jego łzom i cierpieniu. Pytanie „Kto płacze?” — Joasia, kopalnia czy sosna — wskazuje na uniwersalność bólu. Nie ma tu jednak triumfu — scena wyraża czystą agonię, nie zwycięstwo.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Porównaj postawę Tomasza Judyma wobec społeczeństwa z postawą środowiska lekarskiego Warszawy. Dlaczego doszło do konfliktu?",
      content: {},
      correctAnswer:
        "Judym uważa, że lekarze mają obowiązek walczyć z przyczynami chorób biedoty — likwidować sutereny, wymuszać higienę w fabrykach, zakazywać powrotu chorych do szkodliwych warunków. Środowisko lekarskie (Kalecki, Płowicz) traktuje medycynę jako fach — leczy się chorobę, nie naprawia świata. Konflikt wynika z fundamentalnej różnicy: Judym widzi w medycynie posłannictwo społeczne, inni — zawód jak każdy inny.",
      metadata: {
        explanation:
          "Ten konflikt jest osią ideową powieści. Odpowiedź doktora Chmielnickiego: „Medycyna — to fach” podsumowuje stanowisko oponentów. Judym stoi sam przeciwko całemu środowisku, co prefiguruje jego późniejszą samotność.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Scharakteryzuj postać inżyniera Korzeckiego i wyjaśnij, jaką funkcję pełni jego samobójstwo w powieści.",
      content: {},
      correctAnswer:
        "Korzecki to inżynier pracujący w Zagłębiu — człowiek wykształcony, wrażliwy, cierpiący na głęboką nerwicę egzystencjalną (pavor nocturnus). Próbuje zwalczyć strach przed śmiercią, filozofuje o wolności ducha. Jego samobójstwo jest aktem ostatecznego wyzwolenia — cytatem z Platona zapowiada, że Dajmonion nie stawia mu oporu. Dla Judyma śmierć Korzeckiego jest szokiem i ostrzeżeniem — pokazuje, dokąd może prowadzić absolutna samotność wrażliwego intelektualisty.",
      metadata: {
        explanation:
          "Korzecki to alter ego Judyma — obaj są wrażliwi na cierpienie, ale Korzecki nie znajduje drogi do czynu i ginie. Jego postać służy jako przestroga i kontrapunkt dla Judyma.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Jak Żeromski kreśli obraz nędzy polskich miast i wsi? Podaj przynajmniej trzy przykłady z powieści.",
      content: {},
      correctAnswer:
        "1) Ulica Ciepła i Krochmalna w Warszawie — ciemne sutereny, brudne podwórza, nędza żydowskiej dzielnicy, choroba psychiczna sąsiadki trzymanej w kajdanach. 2) Fabryka cygar — kobiety pracujące w dusznym powietrzu pełnym pyłu tytoniowego, rytm pracy jak maszyny. 3) Zagłębie Dąbrowskie — „budy” robotnicze obok cynkowni, chore, wynaturzone dzieci, woda zatruta odpadami przemysłowymi. 4) Czworaki w Cisach — dzieci chore na malarię z powodu bagnistych sadzawek.",
      metadata: {
        explanation:
          "Żeromski stosuje technikę naturalistyczną — szczegółowe, fizjologiczne opisy warunków życia. Każde miejsce akcji staje się ilustracją tej samej tezy: nędza jest wszechobecna i systematycznie ignorowana.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Bezdomność dosłowna i metaforyczna w powieści „Ludzie bezdomni” — porównaj różne wymiary bezdomności na przykładzie wybranych postaci",
        requirements: [
          "Wyjaśnij dosłowny wymiar bezdomności (nędzarze, robotnicy)",
          "Wyjaśnij metaforyczny wymiar bezdomności (Judym, Joanna, emigranci)",
          "Porównaj bezdomność wybraną i narzuconą przez los",
          "Odwołaj się do co najmniej trzech postaci",
          "150-200 słów",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna zawierać: bezdomność dosłowna — nędzarze z Château-Rouge, robotnicy z Zagłębia, lokatorzy warszawskich suteren; bezdomność metaforyczna — Judym (świadomie wybiera samotność), Joanna (sierota, guwernantka bez stałego domu, tęskni za Głogami), Wiktor (emigrant za chlebem), Korzecki (bezdomność egzystencjalna). Kluczowy kontrast: Judym wybiera bezdomność z imperatywu moralnego, Joanna jest bezdomna z przymusu losu, nędzarze — z systemu ekonomicznego.",
      metadata: {
        explanation:
          "Wielowymiarowość tytułowego pojęcia jest kluczem do interpretacji powieści. Żeromski pokazuje, że bezdomność to nie tylko brak dachu nad głową, ale też brak przynależności, sensu, bliskości.",
      },
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
