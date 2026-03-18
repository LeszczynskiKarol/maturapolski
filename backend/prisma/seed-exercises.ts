// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Kto jest autorką \u201EMedalionów\u201D?",
      content: {
        options: [
          "Zofia Nałkowska",
          "Hanna Krall",
          "Maria Dąbrowska",
          "Wisława Szymborska",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "\u201EMedaliony\u201D to zbiór opowiadań Zofii Nałkowskiej, wydany w 1946 roku. Autorka napisała je na podstawie pracy w Głównej Komisji Badania Zbrodni Hitlerowskich w Polsce.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Jakie motto poprzedza zbiór \u201EMedalionów\u201D?",
      content: {
        options: [
          "\u201ENie zabijaj\u201D",
          "\u201ELudzie ludziom zgotowali ten los\u201D",
          "\u201ECzłowiek jest mocny\u201D",
          "\u201ERzeczywistość jest do zniesienia\u201D",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Motto \u201ELudzie ludziom zgotowali ten los\u201D pochodzi z \u201EDzienników czasów wojny\u201D Nałkowskiej. Podkreśla, że zbrodnie wojenne są dziełem ludzi — nie sił nadprzyrodzonych, nie żywiołów, lecz świadomych ludzkich decyzji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Ile opowiadań zawiera zbiór \u201EMedaliony\u201D?",
      content: {
        options: ["Pięć", "Sześć", "Osiem", "Dwanaście"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zbiór zawiera osiem opowiadań: \u201EProfesor Spanner\u201D, \u201EDno\u201D, \u201EKobieta cmentarna\u201D, \u201EPrzy torze kolejowym\u201D, \u201EDwojra Zielona\u201D, \u201EWiza\u201D, \u201ECzłowiek jest mocny\u201D oraz \u201EDorośli i dzieci w Oświęcimiu\u201D.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Czym zajmował się profesor Spanner w Instytucie Anatomicznym?",
      content: {
        options: [
          "Prowadził eksperymenty z odżywianiem więźniów",
          "Preparował kwiaty i rośliny lecznicze",
          "Leczył rannych żołnierzy niemieckich",
          "Produkował mydło z ludzkiego tłuszczu i gromadził ludzkie ciała",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Profesor Spanner kierował Instytutem Anatomicznym we Wrzeszczu pod Gdańskiem. Gromadził setki ludzkich ciał i kierował produkcją mydła z ludzkiego tłuszczu w tzw. Palarni — czerwonym domku na terenie Instytutu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "W jakim obozie koncentracyjnym przebywała Dwojra Zielona?",
      content: {
        options: [
          "W Oświęcimiu",
          "W Ravensbrück",
          "Na Majdanku",
          "W Treblince",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Dwojra Zielona trafiła na Majdanek, a następnie do fabryki amunicji w Skarżysku-Kamiennej, później do Częstochowy. Straciła oko podczas \u201Ezabawy\u201D Niemców w Sylwestra 1943 roku w Międzyrzecu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jak nazywa się bohater opowiadania \u201ECzłowiek jest mocny\u201D?",
      content: {
        options: [
          "Jakub Zielony",
          "Michał P.",
          "Von Bergen",
          "Doktor Mansfeld",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Michał P. to młody Żyd atletycznej budowy, który pracował przy kopaniu masowych grobów w Lesie Rzuchowskim koło Chełmna. Rozpoznał tam zwłoki swojej żony i dzieci.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Do jakiego gatunku literackiego należą \u201EMedaliony\u201D?",
      content: {
        options: [
          "Literatura faktu — opowiadania o charakterze reportażu",
          "Dramat wojenny",
          "Powieść historyczna",
          "Pamiętnik autobiograficzny",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "\u201EMedaliony\u201D to literatura faktu — opowiadania bliskie reportażowi i sprawozdaniu sądowemu. Oparte są na autentycznych relacjach świadków, zeznaniach przed komisją i osobistych obserwacjach autorki.",
      },
    },

    // --- DIFF 1 — CM (3) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Które opowiadania wchodzą w skład \u201EMedalionów\u201D?",
      content: {
        options: [
          "\u201EProfesor Spanner\u201D",
          "\u201EPrzy torze kolejowym\u201D",
          "\u201EProszę państwa do gazu\u201D",
          "\u201EWiza\u201D",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "\u201EProfesor Spanner\u201D, \u201EPrzy torze kolejowym\u201D i \u201EWiza\u201D to opowiadania Nałkowskiej. \u201EProszę państwa do gazu\u201D to opowiadanie Tadeusza Borowskiego — nie należy do \u201EMedalionów\u201D.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Połącz opowiadania z ich bohaterkami/bohaterami:",
      content: {
        matchingType: "stories_to_characters",
        leftColumn: [
          { id: "A", text: "\u201EDno\u201D" },
          { id: "B", text: "\u201EDwojra Zielona\u201D" },
          { id: "C", text: "\u201ECzłowiek jest mocny\u201D" },
          { id: "D", text: "\u201EWiza\u201D" },
        ],
        rightColumn: [
          { id: "1", text: "Młoda kobieta na kulach, chrześcijanka" },
          { id: "2", text: "Michał P., Żyd atletycznej budowy" },
          { id: "3", text: "Kobieta z Ravensbrück, matka dwojga dzieci" },
          { id: "4", text: "Kobieta z czarną przepaską na oku" },
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
          "\u201EDno\u201D — siwa kobieta, matka szukająca dzieci, więźniarka Ravensbrück. \u201EDwojra Zielona\u201D — kobieta z przepaską na oku, straciła je od strzału. \u201ECzłowiek jest mocny\u201D — Michał P. \u201EWiza\u201D — młoda kobieta na kulach, chrześcijanka z obozu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Które miejsca pojawiają się w \u201EMedalionach\u201D jako miejsca zbrodni?",
      content: {
        options: [
          "Instytut Anatomiczny we Wrzeszczu pod Gdańskiem",
          "Las Rzuchowski koło Chełmna",
          "Obóz w Oświęcimiu-Brzezince",
          "Berlin — siedziba Gestapo",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Instytut Anatomiczny (mydło z ludzi), Las Rzuchowski (masowe groby), Oświęcim (komory gazowe) to miejsca zbrodni opisane w zbiorze. Berlin jako siedziba Gestapo nie jest miejscem akcji żadnego opowiadania.",
      },
    },

    // =============================================================================
    // DIFFICULTY 2 — 15 pytań (9 CS + 4 CM + 2 SA)
    // =============================================================================

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W opowiadaniu \u201EProfesor Spanner\u201D preparator zeznaje przed Komisją. Co mówi, zapytany, czy ktoś powiedział mu, że produkcja mydła z ludzkiego tłuszczu jest przestępstwem?",
      content: {
        context:
          "Preparator zeznaje przed Komisją Badania Zbrodni. Na pytanie o świadomość przestępstwa odpowiada z \u201Ezupełną szczerością\u201D.",
        options: [
          "\u201ETak, Spanner nas ostrzegał, ale kazał kontynuować\u201D",
          "\u201ENie mieliśmy z tym nic wspólnego, to robili tylko studenci\u201D",
          "\u201EWiedzieliśmy, ale baliśmy się sprzeciwić\u201D",
          "\u201ETego nikt nie powiedział\u201D",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Preparator odpowiada: \u201ETego nikt nie powiedział\u201D — z zupełną szczerością, bez poczucia winy. To kluczowy moment opowiadania: zbrodnia stała się \u201Enormalną\u201D czynnością, nikt nie wskazał jej jako przestępstwa. Świadczy to o całkowitym zatarciu granic moralnych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jak jeden z profesorów-kolegów Spannera tłumaczy, dlaczego mógł przypuścić, że Spanner produkuje mydło z ciał ludzkich?",
      content: {
        context:
          "Po wizycie w Instytucie dwóch starszych profesorów-lekarzy zeznaje oddzielnie przed Komisją. Jeden z nich — tęgi i dobroduszny — po namyśle odpowiada na pytanie, czy mógł przypuścić, że Spanner wytwarza mydło z ciał.",
        options: [
          "\u201EBo Spanner był znany z okrucieństwa\u201D",
          "\u201EBo Niemcy przeżywały wielki brak tłuszczów, więc wzgląd na dobro państwa mógł go do tego skłonić\u201D",
          "\u201EBo Spanner już wcześniej łamał prawo medyczne\u201D",
          "\u201ENie, nigdy bym tego nie przypuścił\u201D",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Profesor tłumaczy zbrodnię pragmatycznie — brakiem tłuszczów w Rzeszy i \u201Edobrem państwa\u201D. To przerażający przykład racjonalizacji zła: masowe morderstwo sprowadzone do ekonomicznej kalkulacji. Drugi profesor podaje inny powód — posłuszeństwo partyjne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Co robi kobieta cmentarna, gdy opowiada o zagładzie getta?",
      content: {
        options: [
          "Uśmiecha się z ulgą, bo Żydzi jej nie lubili",
          "Odmawia mówienia o tym temacie",
          "Płacze, mówi przyciszonym głosem, wyciera łzy drżącymi rękami — ale powtarza antysemicką propagandę, że Żydzi chcą wszystkich wymordować",
          "Opowiada spokojnie, bez emocji",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kobieta cmentarna jest rozdarta: autentycznie współczuje (płacze, mówi \u201Eto także przecież ludzie\u201D), ale jednocześnie powtarza antysemicką propagandę (\u201EŻydzi wezmą i nas wszystkich wymordują\u201D). To przykład, jak propaganda przenika nawet do ludzi współczujących.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Co się dzieje z ranną kobietą w opowiadaniu \u201EPrzy torze kolejowym\u201D?",
      content: {
        options: [
          "Leży cały dzień przy torze, nikt jej nie pomaga; wieczorem nieznajomy młody mężczyzna strzela do niej z rewolweru policjanta",
          "Zostaje zabrana do szpitala przez okolicznych mieszkańców",
          "Umiera sama z wykrwawienia w nocy",
          "Policjanci zabierają ją na posterunek i udzielają pomocy",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Ranna kobieta leży cały dzień przy torze. Ludzie podchodzą, patrzą, odchodzą — nikt nie zabiera jej do domu ani do szpitala. Tylko stara kobieta przynosi mleko i chleb. Wieczorem policjant oddaje rewolwer młodemu mężczyźnie, który do niej strzela. Opowiadający mówi: \u201EDlaczego on do niej strzelił, to nie jest jasne\u201D.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Dlaczego Dwojra Zielona chciała przeżyć wojnę?",
      content: {
        context:
          "Dwojra mówi poufnie narratorce o swojej motywacji do życia, mimo utraty oka, rodziny i wolności.",
        options: [
          "Żeby odnaleźć męża",
          "Żeby się zemścić na Niemcach",
          "Żeby wyemigrować do Ameryki",
          "Żeby opowiedzieć światu prawdę o zbrodniach: \u201ENiech świat o tym wie, co oni robili\u201D",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Dwojra mówi: \u201Eja chciałam żyć [...] po to, żeby powiedzieć wszystko tak, jak pani teraz mówię. Niech świat o tym wie, co oni robili\u201D. Chciała być świadkiem — przeżyć, by dać świadectwo. To nadaje jej cierpieniu sens i cel.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W jaki sposób Dwojra Zielona zdobywała jedzenie w Skarżysku-Kamiennej?",
      content: {
        options: [
          "Kradła z magazynu obozowego",
          "Dostawała paczki od rodziny",
          "Wyrywała sobie złote zęby i sprzedawała je za chleb",
          "Handlowała ubraniami",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Dwojra opowiada: \u201ESama wyrwałam sobie złote zęby\u201D — ruszała je kilka dni, aż dawały się wyciągnąć. Za jeden ząb dostawała 80-85 złotych i kupowała sobie chleb. To drastyczny obraz desperacji i woli przeżycia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Co Michał P. zrobił, gdy rozpoznał w masowym grobie zwłoki swojej żony i dzieci?",
      content: {
        context:
          "Michał P. pracował przy kopaniu masowych grobów w Lesie Rzuchowskim. Pewnego dnia z trzeciego samochodu wyrzucono zwłoki jego rodziny.",
        options: [
          "Położył się na zwłokach żony i prosił, żeby go zastrzelili — Niemiec odmówił, mówiąc, że \u201Eczłowiek jest mocny, może jeszcze dobrze popracować\u201D",
          "Uciekł natychmiast z obozu",
          "Zemdlał i odwieziono go do szpitala",
          "Potajemnie pochował ich osobno w lesie",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Michał P. zeznaje: \u201EWtedy położyłem się na zwłokach mojej żony i powiedziałem, żeby mnie zastrzelili. [...] Niemiec powiedział: Człowiek jest mocny, może jeszcze dobrze popracować\u201D. Tytuł opowiadania pochodzi od tych słów kata — cyniczne uznanie siły ofiary jako narzędzia pracy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Co to jest \u201Ewiza\u201D w opowiadaniu o tym tytule?",
      content: {
        options: [
          "Dokument pozwalający na wyjazd z obozu",
          "Łąka pod lasem, na którą wyganiano kobiety z bloków na cały dzień, bez jedzenia, na zimnie",
          "Specjalny barak szpitalny",
          "Kara polegająca na staniu w lodowatej wodzie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Bohaterka wyjaśnia: \u201EA wiza to jest łąka pod samym lasem, pod drzewami. Stały tam na zimnie przez cały dzień bez jedzenia i bez żadnej roboty\u201D. Wyganiano tam kobiety z bloków na czas sprzątania, aż do selekcji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Co zrobiły dzieci w Oświęcimiu, przeznaczone do komory gazowej, gdy dowiedziały się o swoim losie?",
      content: {
        options: [
          "Spokojnie szły do komory",
          "Nic nie wiedziały do ostatniej chwili",
          "Próbowały uciekać przez druty",
          "Rozbiegały się po obozie i chowały, płakały i wołały: \u201EMy nie chcemy do gazu! My chcemy żyć!\u201D",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Nałkowska pisze w \u201EDorośli i dzieci w Oświęcimiu\u201D: \u201EOkoło 600 dzieci, przeznaczonych do uduszenia, trzymano w zamknięciu [...] Rozbiegały się po obozie i chowały [...] Słychać było z daleka, jak płakały i wołały o ratunek\u201D.",
      },
    },

    // --- DIFF 2 — CM (4) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Uzupełnij zdania dotyczące opowiadania \u201EProfesor Spanner\u201D:",
      content: {
        textWithGaps:
          "W piwnicy Instytutu Anatomicznego leżało (1) trupów zamiast wystarczających czternastu. Produkcja mydła odbywała się w budynku zwanym (2). Profesor Spanner zabronił mówić o mydle nawet (3).",
        gaps: [
          {
            id: 1,
            options: [
              "pięćdziesiąt",
              "sto pięćdziesiąt",
              "trzysta pięćdziesiąt",
              "tysiąc",
            ],
          },
          {
            id: 2,
            options: ["Laboratorium", "Palarnia", "Krematorium", "Szklarnia"],
          },
          { id: 3, options: ["żonie", "studentom", "policji", "rektorowi"] },
        ],
      },
      correctAnswer: [2, 1, 1],
      metadata: {
        explanation:
          "W piwnicy było 350 trupów (zamiast potrzebnych 14), produkcja odbywała się w Palarni (czerwony domek), a Spanner zabronił mówić o mydle nawet studentom.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Które stwierdzenia o opowiadaniu \u201EDno\u201D są prawdziwe?",
      content: {
        options: [
          "Narratorka to kobieta, która straciła męża i dwoje dzieci",
          "Opisuje transport bydlęcymi wagonami, w których kobiety jechały siedem dni na stojąco",
          "Kobiety w fabryce amunicji pracowały po 6 godzin dziennie",
          "Więźniarki zamykane w bunkrach jadły mięso z trupów współwięźniarek",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Narratorka straciła rodzinę, jechała 7 dni w zaplombowanym wagonie na stojąco, a więźniarki w bunkrach jadły mięso z trupów (choć surowo za to karano). Praca trwała 12 godzin — nie 6.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Które stwierdzenia o Michale P. z opowiadania \u201ECzłowiek jest mocny\u201D są prawdziwe?",
      content: {
        options: [
          "Sam zaprowadził swoich rodziców, siostrę z dziećmi i brata z rodziną do samochodu jadącego do Chełmna",
          "Pracował przy kopaniu masowych grobów w Lesie Rzuchowskim",
          "Udało mu się uciec, rozcinając nożem płachtę samochodu",
          "Był starszym człowiekiem, drobnej budowy",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Michał P. sam zaprowadził rodzinę do samochodu, pracował przy grobach i uciekł, rozcinając płachtę. NIE był drobny — był \u201Emłody, wielki Żyd atletycznej budowy, o małej głowie\u201D.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Które cechy stylu narracyjnego \u201EMedalionów\u201D są prawdziwe?",
      content: {
        options: [
          "Styl jest zwięzły, surowy, reportażowy — pozbawiony emocjonalnego komentarza autorki",
          "Opowiadania oparte są na autentycznych relacjach świadków i zeznaniach przed Komisją",
          "Nałkowska obszernie komentuje i ocenia zachowania bohaterów",
          "Celowe przemilczenia i niedopowiedzenia są ważnym elementem narracji",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Narracja jest zwięzła, reportażowa, oparta na autentycznych zeznaniach, z celowymi przemilczeniami. Nałkowska NIE komentuje obszernie — jej komentarz jest ograniczony do minimum, a czytelnik sam wyciąga wnioski.",
      },
    },

    // --- DIFF 2 — SA (2) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Wyjaśnij znaczenie tytułu zbioru \u201EMedaliony\u201D. Skąd pochodzi to słowo w kontekście utworu?",
      content: {
        hints: ["architektura nagrobna", "portret zmarłego", "pamięć"],
      },
      correctAnswer:
        "Medalion w architekturze to owalny element z wizerunkiem zmarłej osoby, umieszczany na nagrobkach i fasadach. Nałkowska używa tego słowa jako metafory: każde opowiadanie jest literackim \u201Emedalikiem\u201D — portretem ofiary ocalonym od zapomnienia. Słowo \u201Emedalion\u201D pojawia się wprost w opowiadaniu \u201EKobieta cmentarna\u201D, gdy mowa o potłuczonych posągach i medalionach nagrobnych.",
      metadata: {
        explanation:
          "Tytuł łączy pamięć o zmarłych (medalion nagrobny) z literackim upamiętnieniem. Każde opowiadanie to \u201Emedalion\u201D — wizerunek konkretnego człowieka, ocalonego od całkowitego zapomnienia.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Opisz, jak wyglądała ucieczka z pociągu w opowiadaniu \u201EPrzy torze kolejowym\u201D.",
      content: {},
      correctAnswer:
        "Więźniowie w ciasnocie wyrywali deski z podłogi wagonu. Trzeba było wypełznąć przez wąską szczelinę ponad łomotem i zgrzytem żelastwa, dopaść osi i przepełznąć do miejsca, skąd skok dawałby szansę ratunku. Ludzie ginęli pod kołami, od uderzeń w słupy i kamienie. Kobieta z opowiadania była trzecią, która zstąpiła w otwór — po niej strzelano z dachu wagonu.",
      metadata: {
        explanation:
          "Opis ucieczki jest jednym z najbardziej dramatycznych fragmentów zbioru. Podkreśla desperację ludzi jadących na pewną śmierć i fizyczne ryzyko ucieczki.",
      },
    },

    // =============================================================================
    // DIFFICULTY 3 — 15 pytań (6 CS + 4 CM + 3 SA + 2 SN)
    // =============================================================================

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W opowiadaniu \u201EKobieta cmentarna\u201D Nałkowska dwukrotnie powtarza pewne zdanie. Jaką funkcję ono pełni?",
      content: {
        sourceText: {
          author: "Zofia Nałkowska",
          title: "Kobieta cmentarna",
          text: "Rzeczywistość jest do wytrzymania, gdyż niecała dana jest w doświadczeniu. Albo dana niejednocześnie. Dociera do nas w ułamkach zdarzeń, w strzępach relacji.",
        },
        options: [
          "Wyraża mechanizm obronny ludzkiej psychiki — ludzie mogą znieść rzeczywistość tylko dlatego, że nigdy nie poznają jej w pełni, a tylko we fragmentach",
          "Jest ironicznym komentarzem do zachowania Niemców",
          "Opisuje techniczne trudności pracy Komisji Badawczej",
          "Jest cytatem z dziennika Nałkowskiej, niezwiązanym z treścią opowiadania",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "To kluczowe zdanie całego zbioru. Nałkowska formułuje tu mechanizm psychologiczny: ludzie przetrwali, bo nie wiedzieli wszystkiego naraz. Rzeczywistość Holocaustu jest \u201Edo zniesienia\u201D, bo dociera we fragmentach — \u201Ew ułamkach zdarzeń, w strzępach relacji\u201D. Powtórzenie podkreśla jego wagę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W opowiadaniu \u201EWiza\u201D bohaterka opowiada o myszach znalezionych w ziemniaku. Co ta historia mówi o jej stanie psychicznym?",
      content: {
        context:
          "Bohaterka — chrześcijanka, więźniarka obozu — opowiada, że nie pozwoliła dać myszy kotowi, bo \u201Epowstała we mnie taka myśl: A jak on będzie, ten kot, jadł te myszy?\u201D. Dodaje: \u201EByła we mnie taka ciekawość jak w gestapowcu\u201D.",
        options: [
          "Pokazuje, że obóz zniszczył jej zdolność empatii wobec zwierząt",
          "To zwykła anegdota, nieistotna dla opowiadania",
          "Ujawnia, że obóz zaszczepił w niej sadystyczną ciekawość (\u201Ejak w gestapowcu\u201D), ale jednocześnie zachowała współczucie — schowała myszy. Wojna zniekształciła jej psychikę, nie niszcząc jej do końca",
          "Symbolizuje pragnienie zemsty na Niemcach",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Bohaterka rozpoznaje w sobie sadystyczną ciekawość (\u201Ejak w gestapowcu\u201D), ale jednocześnie zachowuje ludzki odruch — ratuje myszy. To poruszający obraz wewnętrznej walki: obóz zaszczepił w niej impuls agresji, ale jej moralność przetrwała. Schowała myszy \u201Emoże matka je znajdzie i jakoś się uratują\u201D.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jaką funkcję pełni opis przyrody w opowiadaniu \u201EKobieta cmentarna\u201D?",
      content: {
        options: [
          "Jest neutralnym tłem, bez znaczenia symbolicznego",
          "Tworzy kontrast między pięknem natury a okrucieństwem zagłady — kwitną konwalie, woła wilga, a tymczasem nad gettem wznoszą się kłęby dymu i płomienie",
          "Symbolizuje nadzieję na rychły koniec wojny",
          "Służy wyłącznie oddaniu nastroju spokojnego cmentarza",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Piękno przyrody (konwalie, bratki, wilga, myszka polna) zestawione jest z dymami pożarów getta i odgłosami upadających ciał (\u201Eplask, plask\u201D). Ten kontrast podkreśla absurd zagłady — natura trwa obojętnie wobec ludzkiego cierpienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Co oznacza zdanie Nałkowskiej z \u201EDorośli i dzieci w Oświęcimiu\u201D: \u201ETa stała dywidenda płynęła z ludzkiej męczarni\u201D?",
      content: {
        context:
          "Nałkowska w eseistycznym opowiadaniu \u201EDorośli i dzieci w Oświęcimiu\u201D analizuje ekonomiczną stronę systemu obozów: utylizacja kości, tłuszczu, skóry, włosów, a także konfiskata mienia ofiar.",
        options: [
          "Opisuje dobroczynność Czerwonego Krzyża wobec więźniów",
          "Więźniowie płacili za pobyt w obozie",
          "Żołnierze niemieccy nie dostawali żołdu",
          "Obóz zagłady był przedsięwzięciem ekonomicznym — Rzesza czerpała ciągłe zyski z pracy niewolniczej i mienia zamordowanych, co stanowiło \u201Eekonomiczną rację całej imprezy\u201D",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Nałkowska odsłania ekonomiczny wymiar zagłady: obozy przynosiły zyski z pracy niewolniczej, konfiskaty mienia, utylizacji ciał (mydło, nawóz, materace). Ideologia rasowa służyła jako \u201Eusprawiedliwienie\u201D tego ekonomicznego celu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jaki efekt osiąga Nałkowska przez \u201Ecelowe przemilczenia\u201D w narracji?",
      content: {
        options: [
          "Zmusza czytelnika do samodzielnego wyciągania wniosków i domyślania się tego, co bohater nie potrafi lub nie chce powiedzieć — niewypowiedziane jest często straszniejsze niż to, co zostało powiedziane",
          "Oszczędza miejsce — opowiadania są krótkie z powodów wydawniczych",
          "Ukrywa tożsamość bohaterów ze względów prawnych",
          "Pomija mniej ważne wątki fabularne",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Przemilczenia są celowe i artystycznie znaczące. Np. w \u201EDnie\u201D narratorka mówi: \u201EMnie tak nie męczyli, tyle tylko, że mnie bardzo bili\u201D — to \u201Etyle tylko\u201D kryje w sobie dramat. To, czego nie mówi, jest gorsze od tego, co mówi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jakie zachowanie ludzi wobec rannej kobiety w \u201EPrzy torze kolejowym\u201D ujawnia o kondycji moralnej społeczeństwa?",
      content: {
        options: [
          "Ludzie byli odważni i natychmiast pomagali uciekinierom",
          "Ludzie współczuli, ale nikt nie podjął ryzyka pomocy — strach przed karą śmierci sparaliżował odruch solidarności, ranna została \u201Eodgrodzona od nich pierścieniem przerażenia\u201D",
          "Ludzie byli obojętni, ponieważ nie widzieli, co się stało",
          "Wszyscy zostali siłą odciągnięci przez policję",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Nałkowska pisze: \u201ENieprzeparta była ta siła, która odgradzała ją od nich wszystkich pierścieniem przerażenia\u201D. Ludzie podchodzili, patrzyli, odchodzili — współczuli, ale bali się kary śmierci za pomoc. Tylko stara kobieta przyniosła mleko. Terror zniszczył tkankę solidarności.",
      },
    },

    // --- DIFF 3 — CM (4) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Które motywy literackie są obecne w \u201EMedalionach\u201D?",
      content: {
        options: [
          "Motyw dehumanizacji — sprowadzenia człowieka do surowca (mydło, nawóz, materace)",
          "Motyw obojętności świadków wobec cierpienia ofiar",
          "Motyw romantycznego buntu jednostki przeciw systemowi",
          "Motyw woli przetrwania — pragnienia życia nawet w ekstremalnych warunkach (Dwojra, Michał P.)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W \u201EMedalionach\u201D obecne są motywy: dehumanizacji (ciała ludzkie jako surowiec), obojętności świadków (\u201EPrzy torze kolejowym\u201D) i woli przetrwania (Dwojra: \u201Eja chciałam żyć\u201D). Bunt romantyczny NIE jest motywem tego zbioru — to literatura faktu, nie romantyzm.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Które stwierdzenia o opowiadaniu \u201EDorośli i dzieci w Oświęcimiu\u201D są prawdziwe?",
      content: {
        options: [
          "Jest jedynym opowiadaniem o charakterze eseistycznym, z szeroką analizą systemu obozów",
          "Zawiera historię dwóch chłopców, którzy uciekli z samochodu jadącego do komory gazowej i zostali ukryci przez lekarza",
          "Opisuje scenę, w której dzieci prostowały się na palcach, by przejść pod prętem i uniknąć selekcji do gazu",
          "Jest najkrótszym opowiadaniem zbioru, składającym się z dwóch akapitów",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "\u201EDorośli i dzieci\u201D to najdłuższe i najbardziej analityczne opowiadanie — esej, nie reportaż. Zawiera historię chłopców ukrytych przez lekarza i scenę selekcji pod prętem (120 cm). NIE jest najkrótsze.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Uzupełnij zdania o opowiadaniu \u201ECzłowiek jest mocny\u201D:",
      content: {
        textWithGaps:
          "Michał P. pracował w obozie zagłady w (1). Ludzi duszono w samochodach (2). Ciała układano w rowie na przemian, (3).",
        gaps: [
          {
            id: 1,
            options: ["Oświęcimiu", "Chełmnie", "Treblince", "Majdanku"],
          },
          {
            id: 2,
            options: ["ciężarowych", "gazowych", "osobowych", "kolejowych"],
          },
          {
            id: 3,
            options: [
              "jednego obok drugiego",
              "głową przy nogach drugiego, twarzą do dołu",
              "w pozycji stojącej",
              "w trumnach",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Michał P. pracował w Chełmnie (nie Oświęcimiu). Ludzi duszono w samochodach gazowych. Ciała układano \u201Ena przemian, jednego głową przy nogach drugiego, bardzo ciasno\u201D, twarzą do dołu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W jakim sensie \u201EMedaliony\u201D łączą perspektywę \u201Ewidzenia bliskiego\u201D i \u201Ewidzenia dalekiego\u201D?",
      content: {
        options: [
          "\u201EWidzenie bliskie\u201D to perspektywa indywidualnych bohaterów — fragmentaryczna, ograniczona do własnego doświadczenia",
          "\u201EWidzenie dalekie\u201D to scalona panorama zbrodni w \u201EDorośli i dzieci w Oświęcimiu\u201D — analityczna, eseistyczna",
          "Oba opowiadania kończą się optymistyczną refleksją",
          "Dopiero zestawienie obu perspektyw daje pełny obraz rzeczywistości — fragmenty składają się w przerażającą całość",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Pierwsze siedem opowiadań to \u201Ewidzenie bliskie\u201D — prywatne perspektywy ofiar i świadków. Ostatnie opowiadanie to \u201Ewidzenie dalekie\u201D — synteza. Razem tworzą pełny, straszny obraz. Optymistycznej refleksji NIE ma.",
      },
    },

    // --- DIFF 3 — SA (3) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W opowiadaniu \u201EWiza\u201D bohaterka opisuje, jak Greczynki na łące (wizie) śpiewały hymn. Zacytuj kontekst i wyjaśnij, dlaczego ta scena jest tak poruszająca.",
      content: {
        context:
          "Bohaterka opowiada: \u201ETego dnia właśnie Greczynki śpiewały hymn narodowy. Nie po grecku. One śpiewały po hebrajsku żydowski hymn\u2026 Śpiewały w tym słońcu bardzo pięknie, głośno i mocno, jakby były zdrowe\u201D. Dodaje: \u201ETo nie była fizyczna siła, proszę pani, bo przecież one właśnie były najsłabsze. To była siła tęsknoty i pragnienia\u201D.",
      },
      correctAnswer:
        "Scena jest poruszająca, bo najsłabsze fizycznie kobiety — Greczynki w najgorszym stanie — śpiewają żydowski hymn (Hatikvę) głośno i mocno, jakby zdrowe. Bohaterka podkreśla, że to nie siła fizyczna, ale \u201Esiła tęsknoty i pragnienia\u201D — duch ludzki wykraczający ponad zniszczone ciało. To akt oporu i godności w obliczu zagłady.",
      metadata: {
        explanation:
          "Śpiew Greczyniek to moment transcendencji — duch ludzki zwycięża nad fizyczną degradacją. Następnego dnia była selekcja i \u201Ewiza była pusta\u201D — wszystkie zginęły. Piękno śpiewu i śmierć następnego dnia tworzą wstrząsający kontrast.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jaką rolę pełni \u201Efioletowa zasłona\u201D w opowiadaniu \u201EProfesor Spanner\u201D?",
      content: {
        context:
          "Preparator opisuje uroczystość poświęcenia gilotyny w więzieniu. Mówi o fioletowej zasłonie oddzielającej katownię od widowni. Narratorka następnie pisze: \u201EMogło się zdawać, że i tu rozwieszona jest między nami a nim jakaś fioletowa zasłona. Nie było na niego sposobu\u201D.",
        hints: ["symbol", "bariera moralna", "dwie warstwy znaczenia"],
      },
      correctAnswer:
        "\u201EFioletowa zasłona\u201D ma dwa znaczenia: dosłowne (oddzielała salę egzekucji od widzów w więzieniu) i metaforyczne (oddziela Komisję od preparatora — jest barierą moralną między nimi). Preparator nie rozumie, że robienie mydła z ciał ludzkich jest zbrodnią. \u201ENie było na niego sposobu\u201D — zasłona symbolizuje niemożność przebicia się do sumienia człowieka, który zatracił poczucie zła.",
      metadata: {
        explanation:
          "To jeden z najsubtelniejszych symboli zbioru. Fioletowa zasłona w więzieniu odgradza od widoku śmierci; metaforyczna zasłona odgradza preparatora od rozumienia zbrodni. Obie mają tę samą funkcję: ukrywają rzeczywistość.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W ostatnim opowiadaniu profesor Epstein spotyka dwoje małych dzieci w Oświęcimiu. Przytocz tę scenę i wyjaśnij, dlaczego jest tak wstrząsająca.",
      content: {
        context:
          "Nałkowska pisze: \u201EDoktor Epstein, profesor z Pragi, przechodząc ulicą między blokami oświęcimskiego obozu w pogodny poranek letni, zobaczył dwoje małych dzieci — jeszcze żywych. Siedziały w piasku drogi i przesuwały po nim jakieś patyczki. Zatrzymał się przy nich i zapytał: Co tu robicie, dzieci? I otrzymał odpowiedź: My się bawimy w palenie Żydów\u201D.",
      },
      correctAnswer:
        "Scena jest wstrząsająca, bo dzieci przejęły zbrodniczą rzeczywistość jako normę — włączyły ją do zabawy. \u201EBawimy się w palenie Żydów\u201D — to nie okrucieństwo, lecz adaptacja: dla tych dzieci krematorium jest tak naturalne jak plac zabaw. Zbrodnia zniszczyła nie tylko dorosłych, ale i niewinność dzieci. To celowa puenta całego zbioru.",
      metadata: {
        explanation:
          "Ta scena zamyka \u201EMedaliony\u201D i jest ich najsilniejszym akcentem. Dzieci odtwarzają w zabawie to, co widzą — zabijanie stało się \u201Enormalne\u201D. To skrajny przejaw dehumanizacji: zbrodnia zatruwa nawet dziecięcą zabawę.",
      },
    },

    // --- DIFF 3 — SN (2) ---

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Portrety oprawców w \u201EMedalionach\u201D — jak Nałkowska przedstawia ludzi odpowiedzialnych za zbrodnie?",
        requirements: [
          "Omów co najmniej 3 postacie oprawców lub współsprawców (Spanner, preparator, profesorowie, August Glass, esmanki)",
          "Wskaż, jakie mechanizmy umożliwiły im uczestnictwo w zbrodniach",
          "Odnieś się do motta \u201ELudzie ludziom zgotowali ten los\u201D",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Notatka powinna zawierać: Spanner — naukowiec, członek SS, traktujący zbrodnię jako projekt naukowy; preparator — wykonawca bez refleksji moralnej (\u201ETego nikt nie powiedział\u201D); profesorowie — racjonalizujący zło brakiem tłuszczów lub posłuszeństwem partyjnym; August Glass — sadysta bijący w nerki bez śladów; esmanki — śmiejące się z umierających kobiet. Mechanizmy: posłuszeństwo, racjonalizacja, ideologia, sadyzm rozbudzony systemem wychowawczym. Motto potwierdza: to nie demony, lecz ludzie.",
      metadata: {
        explanation:
          "Nałkowska nie demonizuje oprawców — pokazuje ich jako ludzi, co jest straszniejsze. Jeden tłumaczy zbrodnię ekonomią, drugi lojalnością, trzeci po prostu nie rozumie. To \u201Ebanalność zła\u201D avant la lettre.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Wola przeżycia w \u201EMedalionach\u201D — porównaj postawy Dwojry Zielonej i Michała P.",
        requirements: [
          "Omów motywacje obu bohaterów do przeżycia",
          "Wskaż podobieństwa i różnice",
          "Odnieś się do tytułu opowiadania \u201ECzłowiek jest mocny\u201D",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Dwojra chce żyć, \u201Eby powiedzieć światu prawdę\u201D — jej motywacją jest dawanie świadectwa. Michał P. chce umrzeć (kładzie się na zwłokach żony), ale zostaje zmuszony do życia przez oprawcę: \u201ECzłowiek jest mocny\u201D. Podobieństwo: oboje tracą rodzinę i wszystko. Różnica: Dwojra odnajduje sens w przetrwaniu, Michał — nie. Tytuł \u201ECzłowiek jest mocny\u201D jest tragicznie ironiczny: to kat mówi do ofiary, że jej siła fizyczna jest jeszcze przydatna do pracy.",
      metadata: {
        explanation:
          "Zestawienie tych dwóch postaw ukazuje spektrum ludzkiego doświadczenia w obliczu Zagłady: od aktywnej woli przeżycia (Dwojra) do pragnienia śmierci (Michał), któremu odmówiono nawet prawa do umierania.",
      },
    },

    // =============================================================================
    // DIFFICULTY 4 — 5 pytań (2 CS + 1 SA + 1 SN + 1 ES)
    // =============================================================================

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Dlaczego Nałkowska minimalizuje komentarz autorski w \u201EMedalionach\u201D, pozwalając mówić samym bohaterom?",
      content: {
        options: [
          "Bo nie miała własnego zdania na temat opisywanych zbrodni",
          "Bo pisała na zlecenie Komisji i nie wolno jej było komentować",
          "Bo behawiorystyczna, zewnętrzna narracja jest straszniejsza niż emocjonalny komentarz — brak komentarza zmusza czytelnika do samodzielnej konfrontacji z faktami, a suche zeznania odsłaniają grozę skuteczniej niż patetyczny lament",
          "Bo chciała napisać czysto historyczny dokument, bez literackich ambicji",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Nałkowska świadomie rezygnuje z emocjonalnego komentarza — to strategia artystyczna. Behawiorystyczna narracja (opis z zewnątrz, bez psychologizowania) sprawia, że fakty działają mocniej. Preparator Spannera mówi o mydle spokojnie — i to jest przerażające. Gdyby narratorka krzyczała ze zgrozą, efekt byłby słabszy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jak \u201EMedaliony\u201D realizują postulat Hannah Arendt o \u201Ebanalności zła\u201D (choć powstały wcześniej niż jej koncepcja)?",
      content: {
        context:
          "Hannah Arendt w książce \u201EEichmann w Jerozolimie\u201D (1963) sformułowała pojęcie \u201Ebanalności zła\u201D — zło nie wymaga demonicznych natury, lecz bywa dziełem zwykłych, przeciętnych ludzi, działających bez refleksji moralnej.",
        options: [
          "Nałkowska pokazuje oprawców jako potwory i demony, co zaprzecza banalności zła",
          "Nałkowska prezentuje wyłącznie ofiary jako banalne, a oprawców jako wyjątkowych",
          "Nałkowska nie zajmuje się oprawcami, tylko ofiarami",
          "Nałkowska ukazuje oprawców i współsprawców jako ludzi \u201Enormalnych\u201D — preparator spokojnie zeznaje o mydle, profesor tłumaczy zbrodnię brakiem tłuszczów, esmanki śmieją się z umierających. Zło jest tu biurokratyczne, codzienne i pozbawione poczucia winy",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "\u201EMedaliony\u201D (1946) antycypują Arendt (1963). Preparator Spannera mówi o mydle bez winy, profesor tłumaczy zbrodnię ekonomią, esmanki traktują śmierć więźniarek jako codzienność. Zło jest tu \u201Ebanalne\u201D — nie wymaga demonów, wystarczy brak refleksji i posłuszna rutyna.",
      },
    },

    // --- DIFF 4 — SA (1) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Porównaj sposób, w jaki Nałkowska opisuje kobieta cmentarną z \u201EKobiety cmentarnej\u201D i preparatora z \u201EProfesora Spannera\u201D. Co mają ze sobą wspólnego jako świadkowie?",
      content: {},
      correctAnswer:
        "Oboje są świadkami zbrodni, ale nie sprawcami. Preparator uczestniczy w zbrodni fizycznie (robi mydło), nie rozumiejąc jej moralnego wymiaru — \u201ETego nikt nie powiedział\u201D. Kobieta cmentarna obserwuje zagładę getta z drugiej strony muru — współczuje (\u201Eto też ludzie\u201D), ale propagandowe kłamstwa zatruwają jej współczucie. Wspólne: oboje widzieli zbrodnie z bliska, oboje mają zniekształcone postrzeganie rzeczywistości (on przez brak moralnej refleksji, ona przez propagandę). Żadne z nich nie jest w pełni świadome prawdy.",
      metadata: {
        explanation:
          "Zestawienie tych postaci ukazuje różne formy \u201Ewidzenia i niewidzenia\u201D — centralny temat zbioru. Preparator nie widzi zła w tym, co robi; kobieta cmentarna widzi cierpienie, ale interpretuje je przez pryzmat propagandy.",
      },
    },

    // --- DIFF 4 — SN (1) ---

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Ciało ludzkie jako surowiec w \u201EMedalionach\u201D — jak Nałkowska pokazuje skrajną dehumanizację?",
        requirements: [
          "Omów przykłady z co najmniej 2 opowiadań (np. \u201EProfesor Spanner\u201D, \u201ECzłowiek jest mocny\u201D, \u201EDorośli i dzieci\u201D)",
          "Wyjaśnij, na czym polega proces dehumanizacji — sprowadzenia człowieka do rzeczy",
          "Odnieś się do ekonomicznego wymiaru zbrodni",
          "Sformułuj wniosek — 120-180 słów",
        ],
        wordLimit: { min: 120, max: 180 },
      },
      correctAnswer:
        "Notatka powinna zawierać: \u201EProfesor Spanner\u201D — ciała przerabiane na mydło, skóra garbowana, kości na kościotrupy; \u201ECzłowiek jest mocny\u201D — trupy rewidowane (złote zęby, zegarki, pieniądze), układane w masowych grobach; \u201EDorośli i dzieci\u201D — utylizacja kości na nawóz, włosów na materace, tłuszczu na mydło. Dehumanizacja: człowiek zredukowany do surowca, z którego można wyciągnąć wartość ekonomiczną. Ekonomiczny wymiar zbrodni to \u201Edywidenda płynąca z ludzkiej męczarni\u201D. Wniosek: system obozów przekształcił ludzi w towar — proces zaplanowany, zracjonalizowany i dochodowy.",
      metadata: {
        explanation:
          "Nałkowska wielokrotnie pokazuje ciało ludzkie jako przedmiot przetwarzania — to najbardziej przerażający wymiar Zagłady. Człowiek nie jest tu nawet ofiarą — jest surowcem.",
      },
    },

    // --- DIFF 4 — ES (1) ---

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "\u201ELudzie ludziom zgotowali ten los\u201D — jak Nałkowska w \u201EMedalionach\u201D ukazuje wizerunek ofiary i kata? Rozważ na podstawie wybranych opowiadań.",
      content: {
        thesis:
          "Wizerunek ofiary i kata w \u201EMedalionach\u201D w świetle motta zbioru",
        structure: {
          introduction:
            "Przedstaw motto i wyjaśnij jego znaczenie — podkreślenie ludzkiego sprawstwa zbrodni",
          arguments_for:
            "Analiza postaci katów: Spanner, preparator, profesorowie, August Glass — jakie mechanizmy nimi kierują (posłuszeństwo, brak refleksji, sadyzm, racjonalizacja)?",
          arguments_against:
            "Analiza postaci ofiar: Dwojra, Michał P., ranna kobieta, dzieci — jak zachowują człowieczeństwo lub je tracą? Czy istnieje granica między katem a ofiarą (kobieta cmentarna)?",
          conclusion:
            "Wniosek: jak motto \u201Eludzie ludziom\u201D podkreśla, że zarówno kat, jak i ofiara są ludźmi — i to jest najbardziej przerażające",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej 3 opowiadań",
          "Analiza motta jako klucza interpretacyjnego",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno zawierać: analizę motta (nie siły nadprzyrodzone, lecz ludzie). Kaci: Spanner — naukowiec; preparator — bez refleksji; profesor — racjonalizacja; Glass — sadyzm. Ofiary: Dwojra — wola życia; Michał — zmuszony do życia; ranna kobieta — porzucona przez społeczeństwo. Granica: kobieta cmentarna — współczucie i propaganda. Wniosek: przerażające jest nie to, że to demony, lecz że to ludzie.",
      metadata: {
        explanation:
          "Temat wymaga połączenia analizy postaci z refleksją nad mottem. Kluczowe: zrozumienie, że Nałkowska nie demonizuje katów ani nie heroizuje ofiar — pokazuje ich jako ludzi, co jest najgłębszym przesłaniem zbioru.",
      },
    },

    // =============================================================================
    // DIFFICULTY 5 — 5 pytań (2 CS + 1 CM + 1 SA + 1 ES)
    // =============================================================================

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Jak \u201EMedaliony\u201D wpisują się w problem \u201Ereprezentacji Holocaustu\u201D — pytania, czy i jak można literacko opisać Zagładę?",
      content: {
        options: [
          "Nałkowska odpowiada na ten problem formą: rezygnuje z tradycyjnej literackości (metafor, psychologizacji, emocji) na rzecz surowego reportażu, w którym mówią sami świadkowie — uznaje, że Holocaust przekracza możliwości tradycyjnej narracji i wymaga nowej formy",
          "Nałkowska uważa, że literatura nie powinna zajmować się Holocaustem",
          "Nałkowska stosuje typowe techniki powieści realistycznej z XIX wieku",
          "Nałkowska pisze wyłącznie poetycko, unikając realiów",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Nałkowska rozwiązuje dylemat Theodora Adorna (czy po Auschwitz można pisać wiersze?) przez stworzenie nowej formy literackiej: surowej, reportażowej, bez komentarza. Daje głos ofiarom, a nie autorce. Forma jest odpowiedzią na bezprecedensowy charakter Zagłady.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Porównaj \u201EMedaliony\u201D z \u201EOpowiadaniami\u201D Tadeusza Borowskiego. Co je łączy, a co różni?",
      content: {
        context:
          "Tadeusz Borowski (1922-1951) w \u201EOpowiadaniach\u201D (\u201EProszę państwa do gazu\u201D, \u201EU nas w Auschwitzu\u201D) opisuje obóz koncentracyjny z perspektywy więźnia-narratora Tadka, który jest częścią obozowego systemu i sam uczestniczy w funkcjonowaniu machiny zagłady.",
        options: [
          "Oba dzieła łączy ten sam narrator i ten sam styl",
          "Łączy je temat (zbrodnie hitlerowskie) i przynależność do literatury obozowej. Różni perspektywa: Nałkowska patrzy z zewnątrz (Komisja), Borowski — z wewnątrz (więzień-współuczestnik). Nałkowska zachowuje dystans reporterski, Borowski buduje obraz totalnej degradacji moralnej",
          "Borowski pisze wyłącznie o Oświęcimiu, Nałkowska — wyłącznie o Ravensbrück",
          "Różnią się epoką literacką — Borowski to romantyk, Nałkowska to pozytywistka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oba dzieła to literatura obozowa, ale z różnych perspektyw. Nałkowska jest \u201Ena zewnątrz\u201D — zbiera zeznania, obserwuje. Borowski jest \u201Ew środku\u201D — narrator Tadek jest częścią systemu, co daje bardziej wstrząsający, ale i bardziej moralnie ambiwalentny obraz.",
      },
    },

    // --- DIFF 5 — CM (1) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Które stwierdzenia o \u201EMedalionach\u201D jako dziele literackim są trafne?",
      content: {
        options: [
          "Zbiór łączy cechy reportażu, zeznania sądowego i prozy literackiej — jest gatunkiem pogranicznym",
          "Behawiorystyczna narracja (obserwacja z zewnątrz, bez wglądu w psychikę) służy ukazaniu zbrodni bez patosu i sentymentalizmu",
          "Celowe przemilczenia, powtórzenia i symbolika (fioletowa zasłona, medalion, wiza) nadają zbiorowi walor artystyczny, mimo pozornej surowej dokumentalności",
          "Zbiór jest pozbawiony jakichkolwiek wartości artystycznych — to wyłącznie suchy dokument",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "\u201EMedaliony\u201D to dzieło pogranicza: reportaż, zeznanie i literatura zarazem. Behawioryzm narracyjny, przemilczenia i symbolika (fioletowa zasłona, wiza) to świadome zabiegi artystyczne. Zbiór NIE jest suchym dokumentem — jego pozorna prostota jest wyrafinowaną strategią literacką.",
      },
    },

    // --- DIFF 5 — SA (1) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "Nałkowska pisze w \u201EDorośli i dzieci w Oświęcimiu\u201D: \u201EZawczasu jednak uczyniono wszystko, by wydobyć z nich i uruchomić te siły, które drzemią w podświadomości człowieka i które — niezbudzone — mogłyby nigdy nie dojść do głosu\u201D. Zinterpretuj to zdanie w kontekście całego zbioru.",
      content: {
        context:
          "Zdanie pochodzi z fragmentu, w którym Nałkowska analizuje, jak system wychowawczy partii hitlerowskiej szkolił oprawców — werbując przestępców, organizując kursy sadyzmu i chroniąc ich ustawą zabraniającą ujawniania przeszłości.",
      },
      correctAnswer:
        "Nałkowska stwierdza, że sadystyczne instynkty \u201Edrzemią w podświadomości człowieka\u201D — każdy je potencjalnie ma, ale nie u każdego \u201Edochodzą do głosu\u201D. System nazistowski celowo je rozbudził: werbował przestępców, szkolił młodzież w okrucieństwie, otaczał instynkty \u201Eszczególną pieczą\u201D. To odnosi się do motta \u201Eludzie ludziom\u201D: zło nie wymaga demonów — wymaga systemu, który uwalnia to, co w człowieku najgorsze. \u201EMedaliony\u201D jako całość pokazują efekty tego procesu: preparator bez sumienia, esmanki śmiejące się ze śmierci, dzieci bawiące się w palenie Żydów.",
      metadata: {
        explanation:
          "To zdanie jest filozoficznym kluczem do \u201EMedalionów\u201D: Nałkowska nie demonizuje zła, lecz je humanizuje — co jest straszniejsze. Zło to ludzki potencjał, który system może uruchomić.",
      },
    },

    // --- DIFF 5 — ES (1) ---

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "CONTEMPORARY",
      work: "Medaliony",
      question:
        "W \u201EKobiecie cmentarnej\u201D Nałkowska pisze: \u201ERzeczywistość jest do wytrzymania, gdyż niecała dana jest w doświadczeniu\u201D. Rozważ, jak literatura świadectwa (Nałkowska, Borowski, Krall lub inni autorzy) próbuje przełamać tę fragmentaryczność i oddać pełnię doświadczenia Zagłady.",
      content: {
        thesis:
          "Fragmentaryczność doświadczenia a zadanie literatury świadectwa",
        structure: {
          introduction:
            "Wyjaśnij zdanie Nałkowskiej i zarysuj problem: czy literatura może dać pełny obraz Zagłady?",
          arguments_for:
            "Analiza \u201EMedalionów\u201D: mozaika głosów, dwie perspektywy (bliskie i dalekie widzenie), celowe przemilczenia — jak Nałkowska \u201Eskłada\u201D fragmenty w całość?",
          arguments_against:
            "Porównanie z innym utworem (np. Borowski, Krall \u201EZdążyć przed Panem Bogiem\u201D, Szymborska wiersze) — jak inni autorzy mierzą się z tym samym problemem?",
          conclusion:
            "Wniosek: czy literatura może oddać pełnię doświadczenia Zagłady, czy z natury skazana jest na fragmentaryczność?",
        },
        requirements: [
          "Minimum 400 słów",
          "Szczegółowa analiza cytatu z \u201EKobiety cmentarnej\u201D",
          "Porównanie z co najmniej jednym innym dziełem",
          "Refleksja nad możliwościami i granicami literatury świadectwa",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno zawierać: interpretację cytatu (ludzie przetrwali, bo wiedzieli nie wszystko), analizę struktury \u201EMedalionów\u201D jako próby złożenia fragmentów (7 opowiadań = widzenie bliskie + 1 esej = widzenie dalekie), porównanie z Borowskim (radykalny narrator-uczestnik) lub Krall (jeden głos ocalałego). Wniosek: literatura z natury jest fragmentaryczna — ale właśnie dlatego jest wierna doświadczeniu Zagłady, które też było fragmentaryczne. Nałkowska nie udaje, że daje pełny obraz — i ta uczciwość jest jej siłą.",
      metadata: {
        explanation:
          "Temat łączy analizę konkretnego cytatu, interpretację struktury zbioru i porównanie międzytekstowe z refleksją nad naturą literatury świadectwa. Wymaga samodzielnego myślenia i dojrzałości intelektualnej.",
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
