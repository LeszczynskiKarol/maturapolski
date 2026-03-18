// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= POCZĄTEK PYTAŃ BOGURODZICA (50 pytań) ===================//
    // UWAGA: Polskie cudzysłowy zamienione na proste "" — bez nich
    // Rozkład: diff1=10, diff2=15, diff3=10, diff4=10, diff5=5

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'Do jakiej epoki literackiej należy "Bogurodzica"?',
      content: {
        options: ["Antyk", "Średniowiecze", "Renesans", "Barok"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Bogurodzica" to najstarsza zachowana polska pieśń religijna, powstała w epoce średniowiecza. Większość badaczy datuje ją na XIII lub początek XIV wieku. Jest uznawana za arcydzieło średniowiecznej liryki polskiej.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'Kto jest autorem "Bogurodzicy"?',
      content: {
        options: [
          "Św. Wojciech",
          "Gall Anonim",
          "Autor jest nieznany (anonimowy)",
          "Jan Długosz",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          'Autor "Bogurodzicy" jest nieznany. Tradycja przypisywała ją św. Wojciechowi — tak podał Jan Łaski w Statutach z 1506 roku — ale współczesna nauka odrzuca tę hipotezę. Autor był prawdopodobnie wykształconym duchownym, biegle znającym teologię i sztukę poetycką.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Do kogo wierni zwracają się w pierwszej zwrotce "Bogurodzicy"?',
      content: {
        options: [
          "Do Jezusa Chrystusa",
          "Do Matki Boskiej (Maryi)",
          "Do św. Jana Chrzciciela",
          "Do Boga Ojca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'W pierwszej zwrotce podmiot liryczny zwraca się bezpośrednio do Maryi — Bogurodzicy, Dziewicy, "Bogiem sławionej", "matko zwolonej" — prosząc ją o pośrednictwo u Syna (Chrystusa). Maryja jest adresatką i pośredniczką.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Jakim refrenem kończy się każda z dwóch pierwszych zwrotek "Bogurodzicy"?',
      content: {
        options: [
          "Amen",
          "Alleluja",
          "Kyrieleison (Kyrie eleison — Panie, zmiłuj się)",
          "Gloria in excelsis Deo",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          'Obie zwrotki kończą się greckim zwrotem "Kyrieleison" ("Kyrie eleison" — "Panie, zmiłuj się"). Refren ten łączy "Bogurodzicę" z tradycją liturgiczną — pieśń stanowi trop do litanijnego Kyrie eleison.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przed którą słynną bitwą rycerstwo polskie śpiewało "Bogurodzicę"?',
      content: {
        options: [
          "Bitwa pod Legnicą (1241)",
          "Bitwa pod Grunwaldem (1410)",
          "Bitwa pod Warną (1444)",
          "Bitwa pod Wiedniem (1683)",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Najsłynniejszym świadectwem śpiewania "Bogurodzicy" jest bitwa pod Grunwaldem w 1410 roku. Kronika konfliktu (ok. 1411) podaje, że "wszyscy jednomyślnie ze łzami Bogurodzicę śpiewać zaczęli". Jan Długosz nazwał ją "carmen patrium" — pieśnią ojczystą.',
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'Które stwierdzenia o "Bogurodzicy" są prawdziwe?',
      content: {
        options: [
          "Jest najstarszą zachowaną polską pieśnią religijną",
          "Najstarszy rękopis pochodzi z początku XV wieku (ok. 1407-1409)",
          "Została wydana drukiem po raz pierwszy w XVIII wieku",
          "Pełniła funkcję hymnu narodowego i pieśni bojowej rycerstwa",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '"Bogurodzica" to najstarsza zachowana pieśń religijna w języku polskim. Najstarszy rękopis (tzw. przekaz kcyński) pochodzi z ok. 1407-1409 r. (Biblioteka Jagiellońska, rkps 1619). Po raz pierwszy wydana drukiem w 1506 r. w Statucie Łaskiego — NIE w XVIII w. Pełniła rolę hymnu dynastycznego Jagiellonów i pieśni bojowej rycerstwa.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Które postacie pojawiają się w dwóch pierwszych zwrotkach "Bogurodzicy"?',
      content: {
        options: [
          "Maryja (Matka Boska)",
          'Jezus Chrystus (Syn Boży, "bożycze")',
          'Św. Jan Chrzciciel ("Krzciciel")',
          "Św. Wojciech",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'W dwóch najstarszych zwrotkach występują: Maryja (adresatka I zwrotki), Jezus Chrystus ("bożycze" — Syn Boga, ostateczny adresat modlitwy) i św. Jan Chrzciciel ("Krzciciel" — pośrednik w II zwrotce). Św. Wojciech NIE pojawia się w tekście — jest jedynie legendarnym rzekomym autorem.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'O co wierni proszą w "Bogurodzicy"?',
      content: {
        options: [
          'O "zbożny pobyt" na świecie (pobożne, dostatnie życie doczesne)',
          'O "rajski przebyt" po żywocie (wieczne przebywanie w niebie po śmierci)',
          "O zwycięstwo w walce z nieprzyjacielem",
          "O wysłuchanie ich modlitw i spełnienie próśb",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Wierni proszą o: 1) wysłuchanie modlitw ("Usłysz głosy, napełń myśli człowiecze"), 2) "zbożny pobyt" na świecie (pobożne życie doczesne), 3) "rajski przebyt" po żywocie (zbawienie). O zwycięstwo w walce NIE proszą — pieśń nie zawiera pierwiastków wojennych.',
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'Co oznacza słowo "Bogurodzica" i z jakiego języka pochodzi?',
      content: {
        hints: ["Matka Boża", "grecki", "Theotokos"],
      },
      correctAnswer:
        '"Bogurodzica" oznacza "rodzicielka Boga", czyli Matka Boża. Słowo to pochodzi od greckiego "Theotokos" (Bogarodzica) za pośrednictwem języka staro-cerkiewno-słowiańskiego ("bogorodzica"), a do polszczyzny trafiło prawdopodobnie przez język czeski. Forma "Bogurodzica" jest archaiczna — użyto celownika ("Bogu") zamiast dzisiejszego dopełniacza ("Boga").',
      metadata: {
        explanation:
          'Słowo "Bogurodzica" to jeden z najstarszych terminów religijnych w języku polskim. Trzeci Sobór Powszechny w Efezie (431 r.) ogłosił, że Maryja jest prawdziwie Matką Bożą — Theotokos. Tytuł ten stał się fundamentem kultu maryjnego.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Jak Jan Długosz nazwał "Bogurodzicę" i co to określenie oznacza?',
      content: {},
      correctAnswer:
        'Jan Długosz nazwał "Bogurodzicę" "carmen patrium" — co znaczy "pieśń ojczysta" lub "pieśń ojców". Określenie to wskazuje, że w XV wieku "Bogurodzica" była już uznawana za pieśń narodową, odziedziczoną po przodkach, śpiewaną "more maiorum" (obyczajem przodków). Długosz używa tego określenia, opisując bitwę pod Grunwaldem (1410).',
      metadata: {
        explanation:
          'Określenie "carmen patrium" pojawia się w XI Księdze Roczników Długosza. Jest to pierwsze użycie pojęcia "pieśń narodowa" w odniesieniu do "Bogurodzicy".',
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (7) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj fragment II zwrotki: "Twego dziela Krzciciela, bożycze". Co oznacza słowo "bożycze"?',
      content: {
        sourceText: {
          author: "Anonim",
          title: "Bogurodzica",
          text: "Twego dziela Krzciciela, bożycze, / Usłysz głosy, napełń myśli człowiecze.",
        },
        options: [
          "Boży człowiek — pobożny wierny",
          'Synu Boga — wołacz od słowa "bożyc" (syn Boga)',
          "Boski książę — władca niebieski",
          "Boże miłosierdzie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Bożycze" to wołacz liczby pojedynczej od rzeczownika "bożyc" — oznaczającego "Syn Boga". Jest to archaizm leksykalny — słowo nie występuje w żadnym innym zabytku języka polskiego, ale potwierdzone jest w piśmiennictwie czeskim XIV w. Zwrot jest skierowany do Jezusa Chrystusa.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Czym jest motyw deesis, centralny dla kompozycji "Bogurodzicy"?',
      content: {
        options: [
          "Motyw literacki przedstawiający konflikt między dobrem a złem",
          "Trzyosobowa kompozycja ikonograficzna: Chrystus w centrum jako Sędzia i Zbawiciel, Maryja i św. Jan Chrzciciel po bokach jako orędownicy w pozach modlitewnych",
          "Schemat budowy hymnu łacińskiego z trzema częściami",
          "Motyw literacki opisujący cierpienie Matki Boskiej pod krzyżem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Deesis (z greckiego: prośba, modlitwa wstawiennicza) to trzyosobowa kompozycja znana ze sztuki bizantyńskiej od VI/VII w. W "Bogurodzicy" motyw ten realizuje się literacko: w I zwrotce wierni zwracają się do Maryi, w II — do Chrystusa przez pośrednictwo Jana Chrzciciela. Najstarsze polskie malowidło z motywem deesis zachowało się w kolegiacie w Tumie pod Łęczycą (sprzed 1161 r.).',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj fragment: "Bogurodzica dziewica, Bogiem sławiena Maryja". Co oznacza wyrażenie "Bogiem sławiena" i jaki to typ archaizmu?',
      content: {
        sourceText: {
          author: "Anonim",
          title: "Bogurodzica",
          text: "Bogurodzica dziewica, Bogiem sławiena Maryja, / U twego syna Gospodzina matko zwolena, Maryja!",
        },
        options: [
          'Archaizm leksykalny — słowo "sławiena" nie istnieje',
          'Archaizm składniowy — dziś powiedzielibyśmy "przez Boga sławiona" (użycie narzędnika zamiast konstrukcji przyimkowej)',
          'Archaizm semantyczny — "sławiena" znaczyło coś innego niż dziś',
          "Archaizm słowotwórczy — nietypowa budowa słowa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Bogiem sławiena" to archaizm składniowy — tzw. składnia bezprzyimkowa. W staropolszczyźnie narzędnik bez przyimka wyrażał sprawcę ("Bogiem" = "przez Boga"). Jednocześnie "sławiena" (zamiast "sławiona") to archaizm fonetyczny — nie zaszedł przegłos polski e > o, co może wskazywać na wpływ czeski.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'Ile zwrotek liczy najstarsza (pierwotna) część "Bogurodzicy"?',
      content: {
        options: ["Jedną", "Dwie", "Trzy", "Pięć"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Najstarsza część "Bogurodzicy" to dwie zwrotki: I — apostrofa do Maryi z prośbą o pośrednictwo, II — zwrot do Chrystusa przez pośrednictwo Jana Chrzciciela z prośbą o zbożne życie doczesne i rajski przebyt po śmierci. Kolejne zwrotki (wielkanocne, pasyjne, o świętych) dołączano w późniejszych wiekach — w XVI w. pieśń liczyła aż 22 zwrotki.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Kto w Statutach Łaskiego (1506) został podany jako autor "Bogurodzicy" i dlaczego współczesna nauka odrzuca tę atrybucję?',
      content: {
        options: [
          "Arcybiskup Jakub Świnka — odrzucono, bo żył za późno",
          "Św. Wojciech — odrzucono, bo żaden żywot świętego nie wspomina o napisaniu przez niego polskiej pieśni, a język i forma utworu odpowiadają XIII-XIV, nie X wiekowi",
          "Wincenty z Kielczy — odrzucono, bo pisał po łacinie",
          "Nie podano autora",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Jan Łaski podał św. Wojciecha jako autora, powołując się na "stary przywilej królewski" ze skarbca koronnego i "podanie kościelne". Nauka odrzuca to: 1) Żaden żywot Wojciecha nie wspomina o polskiej pieśni. 2) W X w. nie było warunków do powstania pieśni w języku ludowym. 3) Język i forma odpowiadają XIII-XIV w. 4) Analogiczna legenda istniała w Czechach (Hospodine pomiluj ny).',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Czym jest "wiersz zdaniowo-rymowy", którym napisana jest "Bogurodzica"?',
      content: {
        options: [
          "Wierszem o stałej liczbie sylab (13-zgłoskowiec)",
          "Wierszem, w którym tok składniowy pokrywa się z tokiem wersyfikacyjnym — wersy tworzą zdania, podział wzmacniają rymy, ale brak stałej liczby sylab",
          "Wierszem wolnym bez rymów i metrum",
          "Wierszem stroficznym o budowie sonetu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Wiersz zdaniowo-rymowy (składniowo-intonacyjny) to typowy typ wiersza średniowiecznego. Cechy: każdy wers stanowi zamkniętą całość składniową (zdanie lub człon zdania), rymy wzmacniają podział na wersy, ale NIE ma stałej liczby sylab (asylabizm). W "Bogurodzicy" występują rymy parzyste: bożycze-człowiecze, nosimy-prosimy, pobyt-przebyt.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj fragment: "A na świecie zbożny pobyt, / Po żywocie rajski przebyt". Co oznaczają te słowa i dlaczego ich zestawienie uważa się za szczególnie udane?',
      content: {
        sourceText: {
          author: "Anonim",
          title: "Bogurodzica",
          text: "A na świecie zbożny pobyt, / Po żywocie rajski przebyt. / Kyrieleison.",
        },
        options: [
          '"Pobyt" = podróż, "przebyt" = powrót — prośba o bezpieczną wyprawę',
          '"Zbożny pobyt" = pobożne życie doczesne, "rajski przebyt" = wieczne przebywanie w raju — zestawienie tych dwóch rzadkich słów streszcza całą chrześcijańską eschatologię: tymczasowość życia ziemskiego vs. wieczność zbawienia',
          '"Pobyt" = bogactwo, "przebyt" = odpoczynek — prośba o dobrobyt',
          '"Pobyt" i "przebyt" to synonimy oznaczające to samo',
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Pobyt" (przebywanie na ziemi) i "przebyt" (przebywanie w niebie) to słowa niezwykle rzadkie — "pobyt" nie pojawia się w żadnym innym tekście średniowiecznym. Ich zestawienie jest arcydziełem językowej inwencji: symetria formy (pobyt-przebyt), rym, a przede wszystkim skondensowanie dualizmu materia-duch, czas-wieczność w dwóch słowach.',
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Które typy archaizmów występują w "Bogurodzicy"? Przyporządkuj podane przykłady:',
      content: {
        options: [
          'Leksykalne (wyrazy wyszłe z użycia) — np. "Gospodzin" (= Pan/Bóg), "bożycze" (= Synu Boga)',
          'Fonetyczne (inna wymowa) — np. "sławiena" (dziś: sławiona), "zwolena" (dziś: zwolona)',
          'Fleksyjne (inne formy odmiany) — np. "Bogurodzica dziewica" (mianownik zamiast wołacza), "zyszczy" (tryb rozkazujący z końcówką -y)',
          'Ortograficzne (inna pisownia) — np. użycie litery "y" zamiast "i" w każdym wyrazie',
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'W "Bogurodzicy" występują: leksykalne ("Gospodzin", "bożycze", "przebyt"), fonetyczne ("sławiena", "zwolena" — brak przegłosu e>o), fleksyjne (mianownik w funkcji wołacza; "zyszczy", "spuści" z końcówką -y/-i), a także składniowe ("Bogiem sławiena" = przez Boga sławiona). "Archaizmy ortograficzne" nie są wyróżnianą kategorią.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'Które funkcje pełniła "Bogurodzica" w średniowiecznej Polsce?',
      content: {
        options: [
          "Pieśń religijna śpiewana podczas nabożeństw kościelnych i przed kazaniami",
          "Pieśń bojowa rycerstwa polskiego przed bitwami (Grunwald, Nakło, Warna)",
          "Hymn koronacyjny dynastii Jagiellonów",
          "Pieśń taneczna wykonywana na dworach królewskich",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Bogurodzica" pełniła wiele funkcji: 1) pieśń religijna — śpiewana w kościołach, przed kazaniami, na procesjach, 2) pieśń bojowa — spiewana przed bitwami, 3) hymn dynastyczny Jagiellonów. W XVI-XVII w. stała się pieśnią katechizmową i ludową. NIE była pieśnią taneczną.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: 'Połącz postacie z ich rolą w "Bogurodzicy":',
      content: {
        matchingType: "roles_to_characters",
        leftColumn: [
          { id: "A", text: "Maryja" },
          { id: "B", text: "Jezus Chrystus" },
          { id: "C", text: "Św. Jan Chrzciciel" },
        ],
        rightColumn: [
          {
            id: "1",
            text: 'Ostateczny adresat modlitwy, Syn Boży ("bożycze")',
          },
          { id: "2", text: "Pośredniczka w I zwrotce, adresatka apostrofy" },
          { id: "3", text: "Pośrednik w II zwrotce, przywołany przez zasługi" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      metadata: {
        explanation:
          'Maryja — pośredniczka, adresatka I zwrotki. Chrystus — "bożycze", ostateczny adresat. Jan Chrzciciel — pośrednik w II zwrotce. Taki układ odpowiada motywowi deesis: Chrystus w centrum, Maryja i Jan jako orędownicy.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Które cechy średniowiecznego światopoglądu wyraża "Bogurodzica"?',
      content: {
        options: [
          "Teocentryzm — Bóg jest centrum i celem wszystkiego, ludzkie życie zmierza ku Niemu",
          "Hierarchizm — układ bytów od ziemskich ku boskim, człowiek nie zwraca się wprost do Boga",
          "Antropocentryzm — człowiek jest miarą wszystkich rzeczy",
          "Idea pośrednictwa — wierni proszą Boga przez pośredników (Maryję, Jana Chrzciciela)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '"Bogurodzica" wyraża teocentryzm, hierarchizm i ideę pośrednictwa. Antropocentryzm to cecha renesansu, NIE średniowiecza. W średniowieczu ludzie bali się zwracać bezpośrednio do Boga-Władcy — tak jak poddany nie mógł wprost prosić króla, lecz potrzebował dworzan-pośredników.',
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (4) =====

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Wymień i objaśnij cztery archaizmy z "Bogurodzicy" — po jednym z każdego typu (leksykalny, fonetyczny, fleksyjny, składniowy).',
      content: {
        hints: ["Gospodzin", "sławiena", "zyszczy", "Bogiem sławiena"],
      },
      correctAnswer:
        '1) Archaizm leksykalny: "Gospodzin" = Pan, Bóg. Słowo wyszło z użytku, zastąpione przez "Pan". 2) Archaizm fonetyczny: "sławiena" = sławiona. Nie zaszedł przegłos polski e > o przed spółgłoską twardą. 3) Archaizm fleksyjny: "zyszczy" = zdobądź/pozyskaj. Tryb rozkazujący z końcówką -y (dziś formy kończą się spółgłoską: "zyszcz"). 4) Archaizm składniowy: "Bogiem sławiena" = przez Boga sławiona. Narzędnik bez przyimka "przez" — tzw. składnia bezprzyimkowa.',
      metadata: {
        explanation:
          '"Bogurodzica" jest skarbnicą archaizmów — zawiera też archaizmy semantyczne (np. "napełń myśli" = spełnij pragnienia, NIE "napełnij umysły") i słowotwórcze ("Bogurodzica" — zrost z celownikiem zamiast dopełniacza).',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przetłumacz pierwszą zwrotkę "Bogurodzicy" na współczesny język polski.',
      content: {
        instruction:
          'Podaj parafrazę całej I zwrotki: "Bogurodzica dziewica, Bogiem sławiena Maryja, / U twego syna Gospodzina matko zwolena, Maryja! / Zyszczy nam, spuści nam. / Kyrieleison."',
      },
      correctAnswer:
        "Matko Boża, Dziewico, przez Boga sławiona (umiłowana) Maryjo! U Twojego Syna, Pana (Boga), Matko wybrana, Maryjo! Pozyskaj dla nas (łaski), ześlij nam (je). Panie, zmiłuj się nad nami. Parafraza: Wierni zwracają się do Maryi — Matki Boga, która jest jednocześnie Dziewicą, sławioną przez Boga i wybraną na Matkę Syna Bożego. Proszą ją, by wstawiła się za nimi u Chrystusa i wyjednała im łaski.",
      metadata: {
        explanation:
          'Tłumaczenie wymaga znajomości archaizmów: "Bogiem sławiena" = przez Boga sławiona, "Gospodzin" = Pan/Bóg, "zwolena" = wybrana, "zyszczy" = zdobądź/pozyskaj, "spuści" = ześlij.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Czym różnią się dwa najstarsze rękopisy "Bogurodzicy" — tzw. przekaz kcyński i krakowski?',
      content: {},
      correctAnswer:
        'Przekaz kcyński (rkps 1619, Biblioteka Jagiellońska) — najstarszy, z ok. 1407-1409 r. Zawiera tylko dwie pierwsze zwrotki z zapisem nutowym. Wklejony do kodeksu kazań księdza Macieja z Grochowa, wikariusza z Kcyni w diecezji gnieźnieńskiej. Przekaz krakowski (rkps 408, BJ) — kodeks z 1408 r., ale tekst "Bogurodzicy" wpisano później (może w I poł. XV w.). Zawiera już 13 zwrotek, bez nut. Różnice: przekaz kcyński zachował poprawniejsze formy językowe i jest bliższy oryginałowi; odnotowanie pieśni w różnych częściach kraju w tym samym czasie świadczy o szerokim rozpowszechnieniu w tradycji ustnej.',
      metadata: {
        explanation:
          'Oba przekazy są kluczowe dla badań nad "Bogurodzicą". Cechy pisma przekazu kcyńskiego łączą się z XIV wiekiem, co sugeruje, że pisarz przepisywał ze starszego oryginału.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj początek pieśni: "Bogurodzica dziewica, Bogiem sławiena Maryja". Jakie dwie prawdy teologiczne zawiera pierwszy wers i jak są ze sobą zestawione?',
      content: {
        sourceText: {
          author: "Anonim",
          title: "Bogurodzica",
          text: "Bogurodzica dziewica, Bogiem sławiena Maryja, / U twego syna Gospodzina matko zwolena, Maryja!",
        },
      },
      correctAnswer:
        'Pierwszy wers zestawia dwa tytuły Maryi: "Bogurodzica" (Matka Boga — dogmat o Bożym macierzyństwie, Sobór Efeski 431 r.) i "dziewica" (wieczne dziewictwo — dogmat Kościoła). Te dwa określenia tworzą antytezę — logicznie się wykluczają (matka i dziewica zarazem), ale teologicznie wyrażają centralny paradoks wiary katolickiej. Zestawienie jest wzmocnione rymem (Bogurodzica-dziewica) i kontrastem. Kolejne określenia ("Bogiem sławiena" = umiłowana przez Boga, "matko zwolena" = matko wybrana) rozwijają portret Maryi jako istoty wyjątkowej — najbliższej Bogu.',
      metadata: {
        explanation:
          'Antyteza "Bogurodzica-dziewica" otwiera pieśń i natychmiast sygnalizuje jej głębię teologiczną. Autor doskonale znał dogmatykę katolicką.',
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Dlaczego w "Bogurodzicy" wierni nie zwracają się bezpośrednio do Boga, lecz proszą o pośrednictwo Maryi i Jana Chrzciciela?',
      content: {
        options: [
          'Bo Bóg nie istnieje w świecie "Bogurodzicy" — jest jedynie abstrakcją',
          "Bo w średniowiecznym społeczeństwie feudalnym ludzie bali się zwracać wprost do Boga-Władcy — jak poddany potrzebował dworzan, by dotrzeć do króla, tak wierni potrzebowali świętych pośredników, by dotrzeć do Boga",
          "Bo autor nie znał teologii i pomylił hierarchię świętych",
          'Bo "Bogurodzica" jest wyłącznie pieśnią maryjną i Bóg nie jest jej tematem',
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Idea pośrednictwa wynika z feudalnego modelu świata: Bóg = najwyższy władca, ludzie = poddani. Maryja i Jan Chrzciciel — jako ludzie bliscy Bogu — pełnią rolę pośredników, jak dworzanie przy dworze. To odzwierciedla średniowieczny hierarchizm i teocentryzm. Św. Tomasz z Akwinu opracował teologicznie ideę pośrednictwa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        '"Bogurodzica" zawiera możliwe zapożyczenia z języka czeskiego (tzw. czechizmy). Która czeska pieśń religijna mogła być wzorcem funkcjonalnym — swoistym "hymnem państwowym" — dla polskiej pieśni?',
      content: {
        options: [
          "Svatý Václave (Święty Wacławie)",
          "Hospodine pomiluj ny (Panie, zmiłuj się nad nami)",
          "Jesu Kriste, štědrý kněže",
          "Buoh všemohúcí",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Hospodine pomiluj ny" to najstarsza czeska pieśń religijna, śpiewana przy najważniejszych uroczystościach kościelnych i państwowych: po stłumieniu powstania (1248-49), przed bitwami (Kressenbrunn, Morawskie Pole), przy koronacjach. Karol IV włączył ją do ceremoniału koronacyjnego. Badacze wskazują, że jej rola "hymnu państwowego" mogła zainspirować polskich twórców "Bogurodzicy". Tekstowe zbieżności: "usłysz głosy" / "uslyšiž, hlasy naše".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj poniższy opis i wskaż, jaki wzorzec ikonograficzny stoi za kompozycją "Bogurodzicy":\n\n"Na romańskim malowidle ściennym w kolegiacie w Tumie pod Łęczycą (sprzed 1161 r.) widnieje Chrystus-Pankrator zasiadający na tronie w mandorli. Po Jego prawej stronie stoi Maryja w postawie modlitewnej, po lewej zaś Jan Chrzciciel."',
      content: {
        options: [
          "Maiestas Domini — przedstawienie Chrystusa jako władcy wszechświata",
          "Deesis — trzyosobowa kompozycja przedstawiająca Chrystusa z Maryją i Janem Chrzcicielem jako orędownikami",
          "Pietà — przedstawienie Maryi trzymającej ciało Chrystusa",
          "Ukrzyżowanie — scena śmierci Chrystusa na krzyżu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Opisane malowidło to klasyczny motyw deesis, wzbogacony o elementy Maiestas Domini. Badacze pieśni wskazali, że to właśnie takie przedstawienie mogło natchnąć polskiego autora tekstu: I zwrotka = prośba do Maryi (po prawej), II zwrotka = prośba przez Jana (po lewej), adresat = Chrystus (w centrum). Kolegiata w Tumie to miejsce, w którym od 1180 r. odbywały się synody prowincjonalne.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Dlaczego "Bogurodzica" NIE jest hymnem w ścisłym sensie średniowiecznym?',
      content: {
        options: [
          "Bo jest za krótka — hymny miały minimum 10 zwrotek",
          'Bo hymn średniowieczny miał równą budowę stroficzną (wszystkie zwrotki identyczne), jedną melodię dla każdej, tekst łaciński i brak refrenów — a "Bogurodzica" ma dwie różne zwrotki, melizmaty, refren Kyrieleison i jest po polsku',
          "Bo jest napisana po polsku, a hymny mogły być wyłącznie łacińskie",
          "Bo nie zawiera motywów religijnych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'W średniowiecznej terminologii "hymn" to utwór o równej budowie stroficznej, jednej melodii dla każdej zwrotki, tekście łacińskim, bez refrenów i melismatów. "Bogurodzica" nie spełnia tych warunków. Muzykolog Adolf Chybiński (1907) określił formę "Bogurodzicy" jako lais — półludową, półuczoną pieśń religijną z refrenem, wywodzącą się z bretańskiej i północnofrancuskiej tradycji kościelnej.',
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Które argumenty przemawiają za powstaniem "Bogurodzicy" na przełomie XIII/XIV wieku?',
      content: {
        options: [
          "Archaizmy językowe i możliwe czechizmy wskazują na kontakty polsko-czeskie tego okresu",
          "Melodia odpowiada tradycji XII-XIII w. (związek z litanią do Wszystkich Świętych z rękopisów z Minden i Grazu, XI-XII w.)",
          'Pieśń śpiewana pod Grunwaldem w 1410 r. jako "pieśń ojców" — musiała być znana od dłuższego czasu (co najmniej pokolenie)',
          "Pieśń zawiera bezpośrednie odniesienie do bitwy pod Grunwaldem",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Argumenty: 1) Czechizmy ("sławiena", "zwolena", "bożycze", "przebyt"). 2) Melodia lokowana w XII-XIII w. 3) Śpiew pod Grunwaldem "more maiorum" wymaga wcześniejszej popularyzacji. 4) Motyw deesis odpowiada ikonografii romańskiej (XII-XIII w.). Pieśń NIE zawiera odniesień do Grunwaldu — nie ma w niej pierwiastków wojennych.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Które stwierdzenia o budowie artystycznej "Bogurodzicy" są prawdziwe?',
      content: {
        options: [
          "Obie zwrotki są zbudowane na zasadzie symetrii — każda kończy się refrenem Kyrieleison",
          "Występują rymy wewnątrzwersowe (świecie-żywocie) i międzywersowe (bożycze-człowiecze, nosimy-prosimy, pobyt-przebyt)",
          "Pieśń jest napisana regularnym trzynastozgłoskowcem",
          "W pierwszej zwrotce Maryja jest przedstawiona za pomocą apostrof — bezpośrednich zwrotów",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Budowa jest niezwykle kunsztowna: symetria zwrotek, rymy parzyste i wewnętrzne, apostrofy do Maryi, paralelizm składniowy, antyteza (Bogurodzica-dziewica). Pieśń NIE jest trzynastozgłoskowcem — jest wierszem zdaniowo-rymowym (asylabicznym).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Które stwierdzenia o kontekście historycznym powstania "Bogurodzicy" są uzasadnione?',
      content: {
        options: [
          "Synod łęczycki (1285) nakazał propagowanie języka polskiego w Kościele — co mogło stworzyć zapotrzebowanie na pieśń religijną po polsku",
          "W 2. poł. XIII w. nasilały się konflikty narodowościowe z napływem niemieckiego duchowieństwa — arcybiskup Jakub Świnka bronił polskości",
          '"Bogurodzica" powstała z rozkazu króla Władysława Jagiełły tuż przed bitwą pod Grunwaldem',
          "Pieśń mogła odpowiadać na potrzebę integracji społeczeństwa ponad dzielnicowymi rywalizacjami kultów (św. Wojciech, św. Stanisław, św. Jadwiga) — przez odwołanie do uniwersalnych kultów Maryi i Jana Chrzciciela",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Synod łęczycki 1285 nakazał: nauczanie po polsku, rektorów znających polski w szkołach. Konflikty narodowościowe (franciszkanie śląscy, napływ duchowieństwa niemieckiego) tworzyły zapotrzebowanie na polskie utwory religijne. Pieśń NIE powstała z rozkazu Jagiełły — istniała co najmniej od pokolenia przed Grunwaldem.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Porównaj obraz Maryi w "Bogurodzicy" z jej obrazem w "Lamencie świętokrzyskim". Wskaż co najmniej trzy różnice.',
      content: {
        instruction:
          "Odwołaj się do: sposobu przedstawienia Maryi, jej relacji z Bogiem/ludźmi, emocji, kontekstu teologicznego.",
      },
      correctAnswer:
        'W "Bogurodzicy" Maryja jest: 1) Wywyższona, majestatyczna — "Bogiem sławiena", "matko zwolena", pośredniczka między Bogiem a ludźmi w motywie deesis. 2) Przedstawiona teologicznie — przez pryzmat dogmatów (Boże macierzyństwo + dziewictwo). 3) Daleka od ludzkiego cierpienia — to "Królowa Niebios". W "Lamencie świętokrzyskim" Maryja jest: 1) Cierpiącą matką pod krzyżem — "Synku miły, rozdziel z matką swoje rany". 2) Przedstawiona emocjonalnie, ludzko — wyraża ból, rozpacz, bezsilność. 3) Bliska ludzkiemu doświadczeniu cierpienia. Kluczowa różnica: w "Bogurodzicy" akcent pada na boskość Maryi, w "Lamencie" — na jej człowieczeństwo. Ta ewolucja odpowiada przemianie pobożności od wczesnego do późnego średniowiecza.',
      metadata: {
        explanation:
          'Porównanie "Bogurodzicy" z "Lamentem świętokrzyskim" to klasyczny temat maturalny. Oba utwory to pieśni maryjne, ale z diametralnie różnym ujęciem: teologicznym vs. emocjonalnym.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj poniższy tekst i odpowiedz na pytanie.\n\nStatuty synodu łęczyckiego z 1285 r. stanowiły: "Postanawiamy dla zachowania i poparcia języka polskiego, by w poszczególnych szkołach katedralnych i klasztornych byli wyznaczani tylko tacy magistrzy, którzy doskonale znają język polski, by mogli chłopcom objaśniać autorów w polskim języku".\n\nJak te postanowienia mogą wiązać się z powstaniem "Bogurodzicy"?',
      content: {},
      correctAnswer:
        'Związek jest wielopłaszczyznowy: 1) Statuty synodu łęczyckiego (pod przewodnictwem abp. Jakuba Świnki) to reakcja na konflikty z napływowym duchowieństwem niemieckim — tworzą klimat obrony języka polskiego. 2) Nakaz nauczania po polsku i wyjaśniania modlitw po polsku budził zapotrzebowanie na polskie utwory religijne — w tym pieśni kościelne. 3) "Bogurodzica" mogła powstać właśnie w odpowiedzi na to zapotrzebowanie — jako pierwsza pieśń religijna w języku polskim, łącząca treść modlitewną z propagowaniem polszczyzny. 4) Synod odbywał się w kolegiacie w Tumie pod Łęczycą — gdzie zachowało się romańskie malowidło z motywem deesis, odpowiadającym kompozycji "Bogurodzicy". 5) Najstarszy rękopis pieśni pochodzi ze środowiska gnieźnieńskiego — tego samego, z którego wyszły statuty.',
      metadata: {
        explanation:
          'Hipoteza o związku "Bogurodzicy" z programem abp. Świnki łączy dane językowe, historyczne i ikonograficzne w spójną wizję okoliczności powstania pieśni.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Na czym polega kunsztowność budowy wersyfikacyjnej "Bogurodzicy"? Podaj co najmniej cztery cechy.',
      content: {},
      correctAnswer:
        'Kunsztowność budowy: 1) Paralelizm — wszystkie półwersy występują w paralelnych parach, jak w łacińskich sekwencjach. Antyteza "Bogurodzica-dziewica" ma odpowiednik w "U Twego syna-Gospodzina", "sławiena" stoi na tym samym miejscu co "zwolena". 2) Rymy — wewnątrzwersowe (świecie-żywocie) i międzywersowe (bożycze-człowiecze, nosimy-prosimy, pobyt-przebyt). Rymy I zwrotki zawierają w ostatniej sylabie samogłoskę "a" (sławiena-Maryja-zwolena-Maryja). 3) Symetria — obie zwrotki zamknięte refrenem Kyrieleison. 4) Wiersz zdaniowo-rymowy — asylabizm, ale tok składniowy pokrywa się z wersyfikacyjnym. 5) Apostrofy — bezpośrednie zwroty do Maryi. 6) Rozbudowany paralelizm treściowy i składniowy. Wniosek: twórca tekstu był znakomitym poetą i znawcą średniowiecznych form poetyckich.',
      metadata: {
        explanation:
          'Analiza budowy wersyfikacyjnej wykazała, że "Bogurodzica" wzoruje się na najkunsztowniejszych tropach o cząsteczkowej budowie sekwencyjnej — jest dziełem mistrza, nie przypadkowego twórcy.',
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Porównaj czeską pieśń "Hospodine pomiluj ny" z "Bogurodzicą" pod względem poziomu artystycznego. Poniżej tekst czeskiej pieśni:\n\n"Hospodine, pomiluj ny! / Jezukriste, pomiluj ny! / Ty spase všeho míra / spasiž ny i uslyšiž, / Hospodine, hlasy naše! / Daj nam všem, Hospodine, / žíz a mír v zemi / Krleš, krleš, krleš!"\n\nKtóre stwierdzenie najlepiej opisuje różnicę?',
      content: {
        options: [
          "Obie pieśni są na tym samym poziomie artystycznym",
          '"Hospodine" jest prymitywna (psalmodyczna, w obrębie 4 tonów, bez zamkniętej struktury), "Bogurodzica" jest znacznie doskonalsza (zamknięta forma, melizmaty, paralelizm, forma laisu) — co wskazuje, że polska pieśń powstała później i na wyższym etapie rozwoju',
          '"Hospodine" jest lepsza artystycznie niż "Bogurodzica"',
          "Nie można ich porównywać, bo powstały w różnych językach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Hospodine" (datowana na XII-XIII w.) jest prymitywna muzycznie — trzyma się 4 tonów, ma charakter psalmodyczny, brak zamkniętej struktury. "Bogurodzica" dysponuje znacznie nowocześniejszymi motywami, zamkniętym pierwszym wierszem, wyrafinowanymi melizmatami. Muzykolog Chybiński (1907) stwierdził, że różnica ta wskazuje na XIV w. jako czas powstania polskiej pieśni.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Na czym polega różnica między teocentrycznym obrazem Maryi w "Bogurodzicy" a jej obrazem w "Lamencie świętokrzyskim" — i jaką zmianę w pobożności odzwierciedla?',
      content: {
        options: [
          "Nie ma różnicy — oba obrazy są identyczne",
          'W "Bogurodzicy" Maryja to Theotokos — Matka Boga, pośredniczka o boskim autorytecie, w układzie deesis; w "Lamencie" to cierpiąca matka (Stabat Mater) — zmiana odzwierciedla przejście od wczesnośredniowiecznej teologii Maryi-Królowej do późnośredniowiecznej pobożności Maryi-Matki Bolesnej (compassio)',
          'W "Bogurodzicy" Maryja jest grzesznicą, a w "Lamencie" jest święta',
          "Różnica wynika wyłącznie z umiejętności autorów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ewolucja obrazu Maryi: "Bogurodzica" (XIII w.) — Maryja jako Theotokos, Królowa Niebios, pośredniczka. "Lament" (XV w.) — Maryja jako Stabat Mater, cierpiąca matka. Zmiana odpowiada przemianie pobożności: od scholastycznej teologii (Maryja-Królowa, deesis) do późnośredniowiecznej emocjonalnej pobożności (compassio — współcierpienie z Chrystusem i Maryją).',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'W 1285 r. synod łęczycki pod przewodnictwem abp. Jakuba Świnki uchwalił statuty nakazujące m.in. propagowanie języka polskiego w Kościele. Jaki związek mogą mieć te postanowienia z powstaniem "Bogurodzicy" jako "carmen patrium"?',
      content: {
        options: [
          "Żadnego — statuty dotyczyły wyłącznie szkół",
          'Statuty tworzyły zapotrzebowanie na polskie utwory religijne, a "Bogurodzica" — łącząc propagowanie polszczyzny z uniwersalnymi kultami Maryi i Jana Chrzciciela (ponad rywalizacjami dzielnicowych patronów) — mogła być odpowiedzią na potrzeby zarówno językowe, jak i integracyjne rozbijającego się państwa',
          "Statuty zakazywały śpiewania po polsku w kościołach",
          "Statuty nakazywały tłumaczenie całej Biblii na polski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Hipoteza łączy: 1) Program Świnki (obrona polskości, język polski w Kościele). 2) Rywalizację kultów dzielnicowych (Wojciech, Stanisław, Jadwiga) — "Bogurodzica" sięga po uniwersalny kult Maryi i Jana. 3) Najstarszy rękopis ze środowiska gnieźnieńskiego. 4) Kontekst czeski (znajomość "Hospodine pomiluj ny" jako wzorca "hymnu państwowego"). Pieśń mogła powstać w pierwszym dziesięcioleciu XIV w.',
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Porównaj tekst "Bogurodzicy" z tekstem czeskiego "Hospodine pomiluj ny" (podanym poniżej). Które zbieżności są rzeczywiście obecne?\n\nHospodine pomiluj ny: "Hospodine, pomiluj ny! Jezukriste, pomiluj ny! Ty spase všeho míra, spasiž ny i uslyšiž, Hospodine, hlasy naše! Daj nam všem, Hospodine, žíz a mír v zemi. Krleš, krleš, krleš!"',
      content: {
        options: [
          "Obie pieśni kończą się liturgicznym refrenem: Kyrieleison / Krleš (spolszczenie i sczeszczenieKyrie eleison)",
          'Zbieżność tekstowa: "Usłysz głosy" (Bogurodzica) / "uslyšiž, hlasy naše" (Hospodine)',
          'Obie zawierają prośbę o łaski/pokój: "zbożny pobyt" / "žíz a mír v zemi"',
          '"Bogurodzica" jest dosłownym tłumaczeniem "Hospodine"',
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Zbieżności: 1) Refren liturgiczny (Kyrieleison / Krleš). 2) "Usłysz głosy" = "uslyšiž, hlasy naše". 3) Prośba o dobre życie doczesne. "Bogurodzica" NIE jest tłumaczeniem — jest utworem oryginalnym, ale autor prawdopodobnie znał pieśni czeskie.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Które cechy wskazują, że autorem "Bogurodzicy" musiał być wykształcony duchowny?',
      content: {
        options: [
          "Doskonała znajomość teologii — antyteza Bogurodzica-dziewica, dogmat o Bożym macierzyństwie, motyw deesis, idea pośrednictwa (św. Tomasz z Akwinu)",
          "Kunsztowna forma naśladująca najwybitniejsze tropy łacińskie o budowie sekwencyjnej",
          "Melodia utrzymana w tonacji doryckiej (pierwsza autentyczna kościelna) — wymagała znajomości muzyki chorałowej",
          "Użycie wyłącznie potocznego języka ludowego bez żadnych odwołań teologicznych",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Autor znał: 1) teologię (dogmaty, motyw deesis, idea pośrednictwa), 2) poetykę łacińską (budowa sekwencyjna, paralelizm, rymy), 3) muzykę chorałową (tonacja dorycka). Muzykolog Chybiński stwierdził: twórcą melodii mogła być tylko osoba stanu duchownego, duchowny świecki (nie zakonnik), dobrze obeznany z zasadami muzyki chorałowej.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (1) + dodatkowe SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        "Dlaczego badacze odrzucili hipotezę o autorstwie św. Wojciecha? Podaj co najmniej cztery argumenty.",
      content: {},
      correctAnswer:
        'Argumenty: 1) Żaden żywot św. Wojciecha (ani żaden tekst do końca XV w.) nie wspomina o napisaniu przez niego polskiej pieśni. 2) Św. Wojciech (zm. 997) był łacińskim mnichem-biskupem — w X w. nie było warunków liturgicznych ani kulturowych do powstania pieśni w języku ludowym. 3) Język "Bogurodzicy" zawiera formy z XIII-XIV w., nie z X w. 4) Kunsztowność budowy wersyfikacyjnej i melodii odpowiada sztuce XIII-XIV w. 5) Tradycję stworzył dopiero Jan Łaski w 1506 r., powołując się na niepokazany nikomu "stary przywilej królewski". 6) W Czechach analogicznie przypisano Wojciechowi autorstwo "Hospodine pomiluj ny" — to był wzór dla polskiej legendy.',
      metadata: {
        explanation:
          "Kwestia autorstwa św. Wojciecha jest zamknięta w nauce od ponad 100 lat. Już w XIX w. ks. Piotr Pękalski (1872) uderzył w tę tradycję, a po nim Nehring, Kalina i Bobowski ją pogrzebali. Tradycja jednak żyła w pamięci zbiorowej.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj poniższe fragmenty dwóch średniowiecznych pieśni i porównaj je pod względem treści, formy i funkcji.\n\nBogurodzica (Polska, XIII-XIV w.): "Bogurodzica dziewica, Bogiem sławiena Maryja, / U twego syna Gospodzina matko zwolena, Maryja! / Zyszczy nam, spuści nam. / Kyrieleison."\n\nHospodine pomiluj ny (Czechy, XII-XIII w.): "Hospodine, pomiluj ny! / Jezukriste, pomiluj ny! / Ty spase všeho míra, / spasiž ny i uslyšiž, / Hospodine, hlasy naše! / Daj nam všem, Hospodine, / žíz a mír v zemi. / Krleš, krleš, krleš!"',
      content: {},
      correctAnswer:
        'TREŚĆ: Obie pieśni to modlitwy błagalne — proszą o łaski i ochronę Bożą. Różnica: "Bogurodzica" zwraca się do Boga przez pośredników (Maryję, Jana Chrzciciela) — motyw deesis; "Hospodine" zwraca się bezpośrednio do Boga/Chrystusa. FORMA: Obie kończą się liturgicznym refrenem (Kyrieleison / Krleš). Ale "Bogurodzica" jest znacznie kunsztowniejsza: paralelizm, rymy, antyteza, melizmaty, forma laisu; "Hospodine" jest prymitywna — psalmodyczna, 4 tony, brak zamkniętej struktury. FUNKCJA: Obie pełniły rolę "hymnu państwowego" — śpiewane przed bitwami, przy koronacjach, w chwilach ważnych dla państwa. ZBIEŻNOŚCI: "usłysz głosy" = "uslyšiž, hlasy naše"; prośba o dobry byt = "žíz a mír v zemi"; refren liturgiczny. WNIOSEK: autor "Bogurodzicy" prawdopodobnie znał pieśń czeską, ale stworzył utwór oryginalny i artystycznie znacznie doskonalszy.',
      metadata: {
        explanation:
          "Porównanie obu pieśni to kluczowy temat badawczy. Praca z tekstem źródłowym pozwala uczniowi samodzielnie dostrzec zbieżności i różnice.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeanalizuj "Bogurodzicę" jako wyraz średniowiecznego teocentryzmu i hierarchizmu. Odwołaj się do struktury utworu.',
      content: {
        instruction:
          "Uwzględnij: kolejność adresatów, ideę pośrednictwa, prośbę końcową, porównanie z feudalizmem.",
      },
      correctAnswer:
        '"Bogurodzica" jest literackim wyrazem teocentryzmu i hierarchizmu: 1) TEOCENTRYZM: Centralnym celem modlitwy jest uzyskanie łask od Boga (Chrystusa) — "bożycze" jest ostatecznym adresatem. Wszystko zmierza ku Niemu: prośba o "zbożny pobyt" i "rajski przebyt" określa sens życia przez relację z Bogiem. 2) HIERARCHIZM: Struktura deesis odzwierciedla feudalną drabinę bytów: człowiek (najniżej) → Maryja → Jan Chrzciciel → Chrystus (najwyżej). Wierni nie śmieją zwracać się wprost do Boga — potrzebują pośredników. 3) PARALELA FEUDALNA: Jak poddany prosił króla przez dworzan, tak wierni proszą Boga przez świętych. "Zyszczy nam, spuści nam" — to formuła proszenia o łaski, odpowiadająca feudalnemu suplikowaniu. 4) STRUKTURA: Dwa etapy zjednywania adresata (pośredni — Maryja, bezpośredni — Chrystus przez Jana) odzwierciedlają stopniowe wznoszenie się po drabinie hierarchii.',
      metadata: {
        explanation:
          'Teocentryzm i hierarchizm to kluczowe pojęcia do analizy "Bogurodzicy" na maturze. Pieśń jest doskonałą ilustracją obu koncepcji — zarówno w treści, jak i w strukturze.',
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Motyw deesis w "Bogurodzicy" — jak średniowieczna ikonografia przełożyła się na literaturę?',
        requirements: [
          "Wyjaśnij, czym jest deesis jako motyw ikonograficzny (pochodzenie, struktura trzypostaciowa)",
          "Wskaż najstarsze polskie przedstawienie deesis (Tum pod Łęczycą, sprzed 1161 r.)",
          'Pokaż, jak "Bogurodzica" realizuje ten motyw literacko (I zwrotka — Maryja, II — Jan Chrzciciel, adresat — Chrystus)',
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Deesis (z gr. prośba) — kompozycja ikonograficzna: Chrystus-Pantokrator w centrum na tronie, po bokach Maryja i św. Jan Chrzciciel w pozach modlitewnych jako orędownicy. Pochodzi z Bizancjum (VI/VII w.), rozprzestrzeniła się na Zachód. W Polsce: malowidło w kolegiacie w Tumie pod Łęczycą (sprzed 1161 r.) — Chrystus w mandorli, Maryja po prawicy, Jan po lewicy. Także: kościół w Siewierzu (poł. XII w.), Czerwińsk i Dobrocin (1. poł. XIII w.), psałterz trzebnicki (ok. 1240). Literacka realizacja w "Bogurodzicy": I zwrotka — wierni proszą Maryję (pośredniczka), II zwrotka — proszą Chrystusa przez zasługi Jana Chrzciciela. Chrystus jest ostatecznym adresatem — jak w centrum deesis. Pieśń spełnia wszystkie warunki "literackiego odpowiednika przedstawienia Deesis".',
      metadata: {
        explanation:
          'Motyw deesis to kluczowy kontekst interpretacyjny "Bogurodzicy" na maturze. Łączy literaturę z historią sztuki i teologią.',
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Ewolucja "Bogurodzicy" — od pieśni liturgicznej do hymnu bojowego i pieśni ludowej',
        requirements: [
          "Opisz etapy: pieśń kościelna (XIII-XIV w.), pieśń bojowa (XV w.), hymn koronacyjny, pieśń ludowa (XVI-XVII w.)",
          "Wskaż przyczyny każdej zmiany funkcji",
          "Omów, dlaczego pieśń ostatecznie wyszła z użytku",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Etapy: 1) XIII-XIV w. — pieśń liturgiczna: śpiewana w kościołach, przed kazaniami, przez chóry szkolne. Przeznaczona dla wyszkolonego chóru (trudna melodia). 2) XV w. — pieśń bojowa: śpiewana przez rycerstwo przed bitwami (Grunwald 1410, Nakło 1431, Warna 1444). Długosz: "carmen patrium". Jednocześnie hymn koronacyjny Jagiellonów. 3) XVI-XVII w. — pieśń katechizmowa i ludowa: bp Szyszkowski (1621) nakazuje śpiewanie w kościołach parafialnych. Śpiewana przez bractwa, szklarzy, "dziady szpitalne". 4) Zanik: litania loretańska (od ok. 1580) i inne formy kultu wyparły "Bogurodzicę". W rozwoju liturgii potrydenckiej nie było już dla niej miejsca. Przetrwała do XVIII w. tylko w katedrze gnieźnieńskiej.',
      metadata: {
        explanation:
          'Ewolucja "Bogurodzicy" ilustruje szerszy proces zmian w kulturze polskiej od średniowiecza do nowożytności.',
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Zestawiono poniżej tekst "Bogurodzicy" i "Hospodine pomiluj ny". Jaki wniosek o wzajemnych relacjach obu pieśni wyciągają badacze na podstawie analizy językowej?\n\nBogurodzica: "...Usłysz głosy, napełń myśli człowiecze..."\nHospodine: "...spasiž ny i uslyšiž, Hospodine, hlasy naše! Daj nam všem..."\n\nBogurodzica: "...A na świecie zbożny pobyt..."\nHospodine: "...žíz a mír v zemi..."\n\nBogurodzica: "Kyrieleison"\nHospodine: "Krleš, krleš, krleš!"',
      content: {
        options: [
          '"Bogurodzica" jest dosłownym tłumaczeniem z czeskiego',
          'Autor "Bogurodzicy" znał twórczość czeską, a rola "Hospodine" jako swoistego "hymnu państwowego" zainspirowała go do stworzenia analogicznej polskiej pieśni — nie jest to tłumaczenie, lecz twórcza inspiracja i adaptacja idei',
          "Obie pieśni powstały niezależnie i nie mają ze sobą żadnego związku",
          '"Hospodine" jest tłumaczeniem z polskiego',
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Badacze (Nehring, Urbańczyk, Matla) konstatują: autor "Bogurodzicy" znał twórczość czeską. Zbieżności tekstowe ("usłysz głosy"/"uslyšiž hlasy", "zbożny pobyt"/"žíz a mír v zemi", Kyrieleison/Krleš) i językowe (czechizmy: sławiena, zwolena, bożycze) wskazują na kontakt z piśmiennictwem czeskim. Ale "Bogurodzica" NIE jest tłumaczeniem — jest utworem oryginalnym, o znacznie wyższym poziomie artystycznym.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj fragment opisu przesłania teologicznego "Bogurodzicy":\n\n"Właściwym adresatem Bogurodzicy jest Jezus Chrystus — Bożyc, do którego skierowana jest prośba zamieszczona w końcowej części utworu. Właściwą prośbę poprzedza proces zjednywania adresata, który odbywa się w dwóch etapach, przyjmując postać pośrednią i bezpośrednią."\n\nCo oznacza "proces zjednywania adresata w dwóch etapach" i jak realizuje się w tekście?',
      content: {
        options: [
          "Wierni najpierw grożą Bogu, a potem proszą — groźba i prośba",
          'Etap I: wierni zjednują Chrystusa pośrednio — przez Maryję (rozbudowana apostrofa, pochwała jej przywilejów) i Jana Chrzciciela (krótka wzmianka). Etap II: kierują prośby bezpośrednio do Chrystusa w imperatywach ("usłysz", "napełń", "słysz", "dać raczy"), aż docierają do właściwej prośby: "zbożny pobyt" i "rajski przebyt"',
          "Wierni modlą się najpierw cicho, potem głośno",
          "Pierwszy etap to pieśń, drugi to taniec liturgiczny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Dwuetapowy proces zjednywania: 1) POŚREDNI — wierni zwracają się do Maryi (I zwrotka: rozbudowana apostrofa z pochwałą przywilejów) i powołują się na Jana Chrzciciela ("Twego dziela Krzciciela"). 2) BEZPOŚREDNI — seria imperatywów skierowanych do Chrystusa ("usłysz głosy, napełń myśli", "słysz modlitwę", "dać raczy"), prowadzących do właściwej prośby ujętej w lapidarnym dwuwersie: "A na świecie zbożny pobyt, / Po żywocie rajski przebyt". Struktura ta odzwierciedla ideę pośrednictwa i hierarchicznego porządku.',
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Omów "Bogurodzicę" jako czynnik kształtowania polskiej świadomości narodowej. Odwołaj się do kontekstu historycznego XIII-XV w. i roli pieśni jako "carmen patrium".',
      content: {},
      correctAnswer:
        '"Bogurodzica" kształtowała świadomość narodową na kilku płaszczyznach: 1) JĘZYK: Jako pierwszy utwór poetycki po polsku — w epoce dominacji łaciny — była aktem afirmacji języka polskiego. Powstała w kontekście walki abp. Świnki o polskość (synody łęczyckie 1285+: nakazy nauczania po polsku). 2) INTEGRACJA: W dobie rozbicia dzielnicowego i rywalizacji kultów (św. Wojciech — Gniezno, św. Stanisław — Kraków, św. Jadwiga — Wrocław) pieśń odwoływała się do uniwersalnych kultów Maryi i Jana Chrzciciela, przekraczających podziały regionalne. 3) HYMN BOJOWY: Pod Grunwaldem (1410) rycerstwo z różnych dzielnic śpiewało wspólną pieśń — Długosz nazywa ją "carmen patrium" (pieśnią ojczystą). 4) HYMN KORONACYJNY: Za Jagiellonów — łączyła wiarę z patriotyzmem. 5) CIĄGŁOŚĆ: Śpiewana "more maiorum" (obyczajem przodków) — łączyła pokolenia. 6) WZORZEC CZESKI: Podobnie jak "Hospodine pomiluj ny" w Czechach — stanowiła swoisty hymn państwowy. Wniosek: "Bogurodzica" to fundament polskiej tożsamości narodowej — pieśń, która współtworzyła polską wspólnotę.',
      metadata: {
        explanation:
          'Temat "Bogurodzicy" jako czynnika świadomości narodowej pojawia się w pytaniach jawnych na maturę ustną. Kluczowe: rola języka polskiego, integracja ponad dzielnicami, funkcja hymniczna, kontekst Grunwaldu.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question:
        'Przeczytaj poniższe fragmenty i odpowiedz na pytanie.\n\nKaznodzieja z XV w. (ok. 1462) wzywa wiernych do śpiewania "Bogurodzicy", dodając: "którą to pieśń dawno ojcowie święci ułożyli".\n\nJan Łaski (Statuty, 1506) pisze, że w skarbcu koronnym znalazł "stary przywilej królewski, a w nim to osobliwe świadectwo, zgodne z podaniem kościelnym, że nie kto inny tylko św. Wojciech, apostoł Polski, pobożny dla narodu zostawił przepis śpiewania Bogurodzicy".\n\nJak i dlaczego powstała tradycja o autorstwie św. Wojciecha? Podaj co najmniej trzy argumenty za jej odrzuceniem.',
      content: {},
      correctAnswer:
        'JAK POWSTAŁA TRADYCJA: 1) Pieśń była śpiewana w kościołach od dawna — kaznodzieja z 1462 r. mówi o "ojcach świętych", co mogło oznaczać polskich duchownych, ale też wielkich teologów. 2) W Gnieźnie, przy grobie św. Wojciecha, "Bogurodzicę" śpiewano regularnie — pielgrzymi skojarzyli ją z patronem. 3) W Czechach analogicznie przypisano Wojciechowi "Hospodine pomiluj ny" — polski zwyczaj naśladował czeski. 4) Łaski w 1506 r. "uświęcił" legendę autorytetem skarbca koronnego i "podania kościelnego" — chodziło o przywrócenie popularności pieśni wśród rycerstwa.\n\nDLACZEGO ODRZUCAMY: 1) Żaden żywot św. Wojciecha (ani żaden tekst do XV w.) nie wspomina o napisaniu polskiej pieśni. 2) Wojciech (zm. 997) był łacińskim mnichem-biskupem — w X w. nie istniały warunki do pieśni w języku ludowym. 3) Język i forma odpowiadają XIII-XIV, nie X wiekowi. 4) Kunsztowność budowy wersyfikacyjnej odpowiada sztuce poetyckiej XIII-XIV w. 5) Przywileju, na który powołuje się Łaski, nikt nigdy nie widział. 6) Gdyby pieśń napisał Wojciech, franciszkanie piszący żywot bł. Kingi czy siostry zakonne nie pominęliby tej informacji.',
      metadata: {
        explanation:
          "Kwestia autorstwa św. Wojciecha jest zamknięta w nauce od ponad 100 lat. Tradycję tę stworzył Jan Łaski w 1506 r. w celach ideologicznych — aby przywrócić pieśni autorytet i popularność wśród rycerstwa.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "MIDDLE_AGES",
      work: "Bogurodzica",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          '"Bogurodzica" jako arcydzieło średniowiecznej liryki — artyzm, przesłanie teologiczne i znaczenie historyczne',
        requirements: [
          "Opisz kunsztowność formy (paralelizm, rymy, wiersz zdaniowo-rymowy, budowa sekwencyjna)",
          "Wyjaśnij przesłanie teologiczne (motyw deesis, Boże macierzyństwo, idea pośrednictwa)",
          "Omów znaczenie historyczne (carmen patrium, hymn bojowy, rola w kształtowaniu świadomości narodowej)",
          "Wskaż, dlaczego utwór uważa się za oryginalny (brak łacińskiego pierwowzoru)",
          "200-250 słów",
        ],
        wordLimit: { min: 200, max: 250 },
      },
      correctAnswer:
        'FORMA: Dwie zwrotki o budowie tropu do Kyrie eleison. Nadzwyczajna kunsztowność: paralelizm półwersów (sekwencyjny), rymy wewnętrzne i zewnętrzne (sławiena-zwolena, bożycze-człowiecze, pobyt-przebyt), antyteza (Bogurodzica-dziewica / Syna-Gospodzina), wiersz zdaniowo-rymowy (asylabizm). Badacze wykazali, że budowa wzoruje się na najkunsztowniejszych tropach łacińskich. Pod względem muzycznym pieśń reprezentuje formę laisu — półludową, półuczoną pieśń religijną z refrenem. TEOLOGIA: Motyw deesis — Chrystus w centrum, Maryja i Jan Chrzciciel jako orędownicy. Antyteza "Bogurodzica dziewica" streszcza paradoks Bożego macierzyństwa i wiecznego dziewictwa. Idea pośrednictwa odzwierciedla teocentryzm i hierarchizm. Prośba o "zbożny pobyt" i "rajski przebyt" streszcza chrześcijańską eschatologię w dwóch słowach. ZNACZENIE: Carmen patrium — pieśń ojczysta (Długosz). Hymn bojowy rycerstwa (Grunwald 1410), hymn koronacyjny Jagiellonów. Czynnik integrujący naród w dobie rozbicia dzielnicowego — odwołanie do uniwersalnych kultów Maryi i Jana ponad rywalizacjami dzielnicowych patronów. Propagowanie języka polskiego w kontekście synodów łęczyckich. ORYGINALNOŚĆ: Nie znaleziono łacińskiego pierwowzoru — pieśń jest samoistnym dziełem polskim, choć autor znał twórczość łacińską i czeską.',
      metadata: {
        explanation:
          '"Bogurodzica" to temat łączący literaturę, teologię, muzykologię i historię. Na maturze pojawia się w kontekstach: średniowieczny światopogląd, motyw deesis, obraz Maryi, pieśń jako czynnik tożsamości narodowej, archaizmy jako zabytek języka.',
      },
    },

    // ======================= KONIEC PYTAŃ BOGURODZICA (50 pytań) ===================//

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Do jakiego gatunku literackiego należy \u201EPieśń o Rolandzie\u201D?",
      content: {
        options: [
          "Chanson de geste (pieśń o czynach)",
          "Kronika średniowieczna",
          "Romans rycerski",
          "Moralitet",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "\u201EPieśń o Rolandzie\u201D to najstarszy i najsłynniejszy przykład chanson de geste — francuskiego gatunku epickiego opowiadającego o bohaterskich czynach rycerzy. Utwór należy do cyklu królewskiego, związanego z postacią Karola Wielkiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Ile lat cesarz Karol Wielki spędził w Hiszpanii, walcząc z Saracenami?",
      content: {
        options: ["Trzy lata", "Siedem lat", "Pięć lat", "Dziesięć lat"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Utwór otwiera informacja, że \u201EKról Karol, cesarz nasz Wielki, siedem pełnych lat zostawał w Hiszpanii\u201D. Zdobył całą ziemię aż po morze, z wyjątkiem Saragossy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Jak nazywa się zdrajca, który wydał Rolanda Saracenom?",
      content: {
        options: ["Blankandryn", "Marsyl", "Ganelon", "Turpin"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Ganelon — ojczym Rolanda — zaprzysiągł zdradę na relikwie swego miecza Murgleja. Umówił się z królem Marsylem, że napadnie na tylną straż Karola, w której znajdzie się Roland.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Jak nazywa się miecz Rolanda?",
      content: {
        options: ["Hauteclaire", "Murglej", "Radosny", "Durendal"],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Durendal to legendarny miecz Rolanda, którego złota gałka pełna jest relikwii: zęba św. Piotra, krwi św. Bazylego, włosów św. Denisa i strzępu szaty Najświętszej Panny. Hauteclaire to miecz Oliwiera, Murglej — Ganelona, a Radosny — Karola Wielkiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Kim jest Oliwier w stosunku do Rolanda?",
      content: {
        options: [
          "Najlepszym przyjacielem i towarzyszem broni",
          "Ojczymem",
          "Bratem",
          "Giermkiem",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Oliwier jest najbliższym przyjacielem i towarzyszem broni Rolanda. Razem stanowią parę: Roland jest mężny, a Oliwier roztropny. Oliwier ma siostrę Odę, narzeczoną Rolanda.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Który rękopis \u201EPieśni o Rolandzie\u201D jest najstarszy?",
      content: {
        options: [
          "Rękopis wenecki",
          "Rękopis oksfordzki",
          "Rękopis berliński",
          "Rękopis paryski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Najstarszy zachowany rękopis to tzw. rękopis oksfordzki, datowany na ok. 1170 rok. Jest kopią poematu powstałego prawdopodobnie między 1066 a 1096 rokiem. Podpisany jest imieniem Turoldus.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Gdzie rozgrywa się bitwa, w której ginie Roland?",
      content: {
        options: [
          "W Akwizgranie",
          "Pod Saragossą",
          "W wąwozach Ronsewal (Roncevaux)",
          "Na równinie pod Kordową",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Bitwa rozgrywa się w przełęczy Ronsewal (Roncevaux) w Pirenejach. Tylna straż Karola, dowodzona przez Rolanda, zostaje zaatakowana przez wojska Marsyla w ciasnych wąwozach górskich.",
      },
    },

    // --- DIFF 1 — CM (3) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które z poniższych postaci należą do dwunastu parów Francji w utworze?",
      content: {
        options: [
          "Roland i Oliwier",
          "Arcybiskup Turpin",
          "Król Marsyl",
          "Geryn i Gerier",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Roland, Oliwier, arcybiskup Turpin, Geryn i Gerier to parowie Francji — elita rycerstwa Karola Wielkiego. Marsyl jest pogańskim królem Saragossy, wrogiem Franków.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Które ze stwierdzeń o królu Marsylu są prawdziwe?",
      content: {
        options: [
          "Jest władcą Saragossy",
          "Służy Mahometowi i modli się do Apollina",
          "Jest wiernym wasalem Karola Wielkiego",
          "Traci prawą rękę w walce z Rolandem",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Marsyl włada Saragossą, jest poganinem czczącym Mahometa i Apollina, a Roland ucina mu prawą rękę w bitwie. NIE jest wasalem Karola — jest jego śmiertelnym wrogiem.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Połącz postacie z przypisanymi im mieczami:",
      content: {
        matchingType: "characters_to_swords",
        leftColumn: [
          { id: "A", text: "Roland" },
          { id: "B", text: "Oliwier" },
          { id: "C", text: "Ganelon" },
          { id: "D", text: "Karol Wielki" },
        ],
        rightColumn: [
          { id: "1", text: "Radosny (Joyeuse)" },
          { id: "2", text: "Durendal" },
          { id: "3", text: "Hauteclaire" },
          { id: "4", text: "Murglej" },
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
          "Roland walczy Durendalem, Oliwier — Hauteclaire, Ganelon nosi miecz Murglej, a Karol Wielki — miecz Radosny (Joyeuse), którego gałka zawiera ostrze włóczni, którą zraniono Chrystusa.",
      },
    },

    // =============================================================================
    // DIFFICULTY 2 — 15 pytań (9 CS + 4 CM + 2 SA)
    // =============================================================================

    // --- DIFF 2 — CS (9) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Dlaczego Ganelon nienawidzi Rolanda?",
      content: {
        options: [
          "Bo Roland odebrał mu ziemie i lenna",
          "Bo Roland odmówił walki u jego boku",
          "Bo Roland publicznie obraził jego żonę",
          "Bo Roland wskazał go jako posła do Marsyla, co Ganelon uznał za skazanie na śmierć",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Podczas narady Roland wskazał Ganelona jako posła do Saragossy. Ganelon uznał to za zamach na swoje życie — poprzedni posłowie (Bazan i Bazyli) zostali zabici przez Marsyla. Od tego momentu Ganelon otwarcie zapowiada zemstę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Co robi Roland, gdy Oliwier po raz pierwszy prosi go o zadęcie w róg?",
      content: {
        options: [
          "Odmawia — uważa, że byłoby to hańbą i utratą sławy w słodkiej Francji",
          "Natychmiast dmucha w róg",
          "Każe Oliwierowi samemu zadąć w róg",
          "Wysyła gońca do Karola",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Roland trzykrotnie odmawia zadęcia w róg, mówiąc: \u201EChybabym oszalał. Postradałbym w słodkiej Francji moje imię\u201D. Uważa, że wezwanie pomocy byłoby hańbą i sprzeczne z rycerskim honorem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Jakie zawołanie bojowe krzyczą Francuzi w bitwie?",
      content: {
        options: ["Deus vult!", "Montjoie!", "Szacowny!", "Saragossa!"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201EMontjoie!\u201D to zawołanie bojowe Franków i cesarza Karola. Z kolei \u201ESzacowny\u201D (Précieuse) to okrzyk bojowy emira Baliganta i pogańskich wojsk.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Co arcybiskup Turpin obiecuje rycerzom przed bitwą?",
      content: {
        options: [
          "Wielkie łupy i bogactwa",
          "Bezpieczny odwrót przez góry",
          "Rozgrzeszenie i miejsca w raju jako święci męczennicy, jeśli zginą",
          "Przybycie posiłków z Francji",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Turpin rozgrzesza rycerzy i obiecuje: \u201EJeśli pomrzecie, będą z was święte męczenniki, będziecie mieli miejsca na najwyższym piętrze raju\u201D. Za pokutę nakazuje im tęgo walić.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Co dzieje się, gdy Roland w końcu dmucha w róg?",
      content: {
        options: [
          "Nic się nie zmienia — Karol nie słyszy",
          "Oliwier wyrywa mu róg z rąk",
          "Róg jest uszkodzony i nie wydaje dźwięku",
          "Z ust tryska mu krew, skroń pęka, ale dźwięk dociera do Karola na trzydzieści mil",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Roland dmucha w róg z taką siłą, że pęka mu skroń i tryska krew z ust. Głos rogu niesie się na trzydzieści mil. Karol słyszy i chce wracać, ale Ganelon próbuje go odwieść od tego zamiaru.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Kto jest Blankandryn?",
      content: {
        options: [
          "Najroztropniejszy doradca Marsyla, który proponuje plan pokojowy i współknuje zdradę z Ganelonem",
          "Bratanek Marsyla i dowódca wojsk saraceńskich",
          "Arcybiskup Saragossy",
          "Poseł Karola Wielkiego",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Blankandryn to mądry doradca króla Marsyla. To on proponuje strategię fałszywego pokoju i rozmawia z Ganelonem w drodze powrotnej, wymieniając z nim obietnice zdrady Rolanda.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Kim jest Oda (Aude) w utworze?",
      content: {
        options: [
          "Żoną Ganelona",
          "Siostrą Oliwiera i narzeczoną Rolanda, która umiera na wieść o jego śmierci",
          "Królową Saragossy",
          "Córką Karola Wielkiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oda jest siostrą Oliwiera i narzeczoną Rolanda. Gdy dowiaduje się o śmierci Rolanda, odmawia innego narzeczonego i natychmiast umiera u stóp Karola Wielkiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Co się dzieje z ciałami Rolanda, Oliwiera i arcybiskupa Turpina?",
      content: {
        options: [
          "Zostają pogrzebani na polu bitwy w Ronsewal",
          "Zostają spaleni na stosie pogrzebowym według tradycji frankijskiej",
          "Karol każe otworzyć ich ciała, złożyć serca w jedwabne całuny, a ciała przewieźć do Blaye i pochować w kościele Saint-Romain",
          "Baligant uprowadza ich ciała do Saragossy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Karol nakazuje wyjąć serca trzech bohaterów i złożyć je w jedwabnych całunach i trumnie z białego marmuru. Ciała, umyte pachnidłami i winem, przewożone są do Blaye i pochowane w kościele Saint-Romain.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Jaki cud Bóg czyni dla Karola Wielkiego podczas pościgu za poganami?",
      content: {
        options: [
          "Zsyła pioruny na Saracenów",
          "Rozmnaża chleb dla armii frankijskiej",
          "Otwiera ziemię pod nogami pogan",
          "Zatrzymuje słońce, by dzień trwał dłużej i Francuzi mogli ścigać wrogów",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Bóg zatrzymuje słońce na prośbę Karola — aby noc się spóźniła, a dzień trwał. Dzięki temu Frankowie dopadają uciekających Saracenów i rozprawiają się z nimi nad Ebro.",
      },
    },

    // --- DIFF 2 — CM (4) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które dary Marsyl obiecuje przesłać Karolowi Wielkiemu jako znak pokoju?",
      content: {
        options: [
          "Niedźwiedzie, lwy, charty i siedemset wielbłądów",
          "Tysiąc wypierzonych sokołów",
          "Flota stu okrętów wojennych",
          "Czterysta mułów objuczonych złotem i srebrem",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Marsyl obiecuje wysłać niedźwiedzie, lwy, charty, 700 wielbłądów, 1000 sokołów, 400 mułów ze złotem i 50 wozów. Nie obiecuje floty — to Baligant ma wielką flotę.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Roland jest (1) Karola Wielkiego. Ganelon jest (2) Rolanda. Po śmierci Rolanda, Oda — siostra (3) — umiera z żałości.",
        gaps: [
          {
            id: 1,
            options: ["synem", "siostrzeńcem", "wnukiem", "kuzynem"],
          },
          {
            id: 2,
            options: ["wujem", "bratem", "ojczymem", "dziadkiem"],
          },
          {
            id: 3,
            options: ["Ganelona", "Oliwiera", "Turpina", "Naima"],
          },
        ],
      },
      correctAnswer: [1, 2, 1],
      metadata: {
        explanation:
          "Roland jest siostrzeńcem Karola Wielkiego. Ganelon jest ojczymem Rolanda (ma za żonę siostrę Karola). Oda jest siostrą Oliwiera.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Które stwierdzenia o arcybiskupie Turpinie są prawdziwe?",
      content: {
        options: [
          "Jest arcybiskupem rejmskim (reimskim)",
          "Walczy na koniu i zabija wielu pogan w bitwie",
          "Odmawia udziału w walce z powodów religijnych",
          "Umiera, próbując przynieść Rolandowi wodę ze strumienia",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Turpin jest arcybiskupem reimskim, ale walczy jak rycerz — zabija wielu pogan. Umiera po tym, jak próbuje przynieść Rolandowi wodę ze strumienia — serce mu osłabło i padł po drodze.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które z poniższych scen poprzedzają bezpośrednio śmierć Rolanda?",
      content: {
        options: [
          "Roland próbuje zniszczyć Durendala, uderzając nim o skałę",
          "Roland składa swoją rękawicę Bogu jako ofiarę",
          "Roland zabija Saracena, który chciał mu zabrać miecz, uderzeniem rogu",
          "Roland wsiada na konia i rusza do nowej bitwy",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Przed śmiercią Roland: zabija rogiem Saracena próbującego ukraść mu miecz, usiłuje zniszczyć Durendala o skałę (bezskutecznie), a następnie wyciąga ku Bogu prawą rękawicę. Św. Gabriel ją przyjmuje. Roland NIE wraca do bitwy — umiera na wzgórku.",
      },
    },

    // --- DIFF 2 — SA (2) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Jak Ganelon broni się podczas sądu w Akwizgranie? Czym argumentuje swoją niewinność?",
      content: {
        hints: ["wyzwanie", "zemsta osobista", "nie zdrada"],
      },
      correctAnswer:
        "Ganelon twierdzi, że nie popełnił zdrady, lecz jedynie dokonał osobistej zemsty na Rolandzie, który go skrzywdził na majątku i skazał na śmierć, wskazując jako posła. Podkreśla, że publicznie wyzwał Rolanda i Oliwiera w obecności Karola i baronów — a więc działał jawnie, nie zdradliwie.",
      metadata: {
        explanation:
          "Obrona Ganelona opiera się na rozróżnieniu między zdradą a legalnym wyzwaniem (vendetta). Próbuje przekonać sędziów, że zemsta na prywatnym wrogu nie jest zdradą króla. To ważny motyw prawny średniowiecza.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Opisz krótko, co się dzieje z Bramimondą — królową Saragossy — po zdobyciu miasta przez Karola.",
      content: {},
      correctAnswer:
        "Bramimonda oddaje Karolowi wieże Saragossy. Zostaje zabrana do Francji jako branka. Karol nie chce jej zmuszać do chrztu — pragnie, aby nawróciła się z miłości. W Akwizgranie zostaje ochrzczona i przyjmuje imię Julianna. Staje się chrześcijanką przez szczere poznanie wiary.",
      metadata: {
        explanation:
          "Los Bramimondy to wyjątek od brutalnego traktowania pogan. Karol okazuje jej szacunek — chrzest z miłości, nie z przymusu — co jest rzadkim elementem humanitarnym w utworze.",
      },
    },

    // =============================================================================
    // DIFFICULTY 3 — 15 pytań (6 CS + 4 CM + 3 SA + 2 SN)
    // =============================================================================

    // --- DIFF 3 — CS (6) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Jaki jest sens sporu Rolanda i Oliwiera o zadęcie w róg?",
      content: {
        options: [
          "Roland odmawia z pychy i nadmiernego poczucia honoru, Oliwier natomiast reprezentuje roztropność — miarę i rozwagę, które mogłyby uratować wojsko",
          "Oliwier chce uciekać, a Roland nie",
          "Obaj zgadzają się, że trzeba trąbić, ale nie mogą znaleźć rogu",
          "Oliwier odmawia trąbienia, a Roland nalega",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Spór o róg to centralny konflikt wartości w utworze. Oliwier mówi: \u201EDzielność a szaleństwo to są dwie różne rzeczy, a miara warta jest więcej niż zarozumienie\u201D. Roland reprezentuje absolutny etos rycerski (honor za cenę życia), Oliwier — chrześcijańską roztropność.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Co symbolizuje gest Rolanda, który wyciąga rękawicę ku Bogu przed śmiercią?",
      content: {
        options: [
          "Kapitulację i prośbę o łaskę wroga",
          "Złożenie hołdu lennego Bogu — Roland oddaje się w ręce najwyższego Suzerena, jak wasal składa rękawicę seniorowi",
          "Prośbę o przebaczenie dla Ganelona",
          "Symbol zwycięstwa nad poganami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wyciągnięcie rękawicy to gest feudalny — wasal składa rękawicę seniorowi jako znak oddania się pod jego władzę. Roland traktuje Boga jak najwyższego Suzerena i składa mu swoje życie. Św. Gabriel przyjmuje rękawicę z jego dłoni.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Dlaczego Roland przed śmiercią zwraca twarz ku Hiszpanii?",
      content: {
        options: [
          "Żeby zobaczyć, czy nadchodzą posiłki z Francji",
          "Żeby zobaczyć Saragossę po raz ostatni",
          "Żeby Karol i jego ludzie wiedzieli, że umarł jako zwycięzca — z głową zwróconą ku ziemi nieprzyjaciół",
          "Nie ma to żadnego symbolicznego znaczenia",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Roland sam wcześniej mówił, że gdyby miał umrzeć w obcym królestwie, \u201Eznaleziono by go z głową zwróconą ku ziemi nieprzyjaciół i w ten sposób skończyłby jako zwycięzca\u201D. Umieranie twarzą do wroga to element rycerskiego ars moriendi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Co oznacza sformułowanie \u201Ears moriendi\u201D w kontekście śmierci Rolanda?",
      content: {
        options: [
          "Sztuka walki — zbiór technik rycerskich",
          "Formuła magiczna chroniąca rycerza w bitwie",
          "Nazwa miecza Rolanda",
          "Sztuka umierania — średniowieczny wzorzec godnej, chrześcijańskiej śmierci: wyznanie grzechów, modlitwa, złożenie się w ręce Boga",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Ars moriendi to średniowieczna \u201Esztuka umierania\u201D. Śmierć Rolanda jest wzorcowa: wyznaje grzechy, bije się w pierś, modli się, oddaje rękawicę Bogu. Zstępują po niego aniołowie — św. Gabriel, św. Michał i Cherubin — i zanoszą jego duszę do raju.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Jaka technika narracyjna jest charakterystyczna dla \u201EPieśni o Rolandzie\u201D?",
      content: {
        options: [
          "Powtórzenia epickie — te same sceny i formuły powtarzane z drobnymi wariacjami, np. trzykrotne odrzucenie rogu",
          "Monolog wewnętrzny i strumień świadomości",
          "Retrospekcje i narracja ramowa",
          "Ironia romantyczna i meta-narracja",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Powtórzenia epickie (laisses similaires) to główna technika artystyczna poematu. Scena odmowy trąbienia powtarza się trzykrotnie, opisy bitew budowane są wedle jednej formuły, a Marsyl pyta o Karola trzykrotnie. Technika ta służy spotęgowaniu dramatyzmu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Jak kończy się utwór — czego żąda anioł Gabriel od Karola Wielkiego?",
      content: {
        options: [
          "Aby Karol abdykował na rzecz syna Ludwika",
          "Aby zwołał wojsko i ruszył na pomoc królowi Wiwianowi w Imfie, oblężonemu przez pogan — Karol nie chce, bo jest zmęczony",
          "Aby Karol wyruszył na krucjatę do Jerozolimy",
          "Aby Karol przebaczył Ganelonowi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Anioł Gabriel każe Karolowi ruszać na nową wojnę — na pomoc chrześcijanom w Imfie. Karol rozpacza: \u201EBoże, ileż męki w mym życiu!\u201D. To otwarte zakończenie sugeruje nieskończoność walki o wiarę — utwór nie daje bohaterowi odpoczynku.",
      },
    },

    // --- DIFF 3 — CM (4) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które motywy literackie są obecne w \u201EPieśni o Rolandzie\u201D?",
      content: {
        options: [
          "Motyw rycerskiego honoru i poświęcenia dla wiary i króla",
          "Motyw zdrady prowadzącej do klęski wspólnoty",
          "Motyw niespełnionej miłości (Roland i Oda)",
          "Motyw buntu przeciw władzy królewskiej",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Kluczowe motywy to: honor rycerski (Roland walczy do śmierci), zdrada (Ganelon niszczy wspólnotę) i niespełniona miłość (Oda umiera na wieść o śmierci Rolanda). Motyw buntu nie występuje — Roland jest wzorem lojalności.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które cechy czynią z Rolanda wzorcowego rycerza średniowiecznego?",
      content: {
        options: [
          "Niezwykła odwaga i gotowość do walki za wiarę i króla",
          "Roztropność i ostrożność w podejmowaniu decyzji",
          "Pobożność — przed śmiercią wyznaje grzechy i modli się do Boga",
          "Troska o sławę i dobre imię, które przetrwa po śmierci",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Roland to wzór odwagi, pobożności i troski o sławę rycerską. NIE jest jednak roztropny — to cecha Oliwiera. Narrator wprost mówi: \u201ERoland jest mężny, a Oliwier roztropny\u201D. Brak roztropności Rolanda jest źródłem tragizmu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Uzupełnij zdania o karze Ganelona:",
      content: {
        textWithGaps:
          "W sądzie na Ganelona broni go krewny (1). Jednak rycerz (2) wyzwał Pinabela na pojedynek i pokonał go. Ganelona skazano na karę (3).",
        gaps: [
          {
            id: 1,
            options: ["Blankandryn", "Pinabel", "Naim", "Ogier"],
          },
          {
            id: 2,
            options: ["Ogier Duński", "Tiery", "Godfryd", "Naim"],
          },
          {
            id: 3,
            options: [
              "ścięcia",
              "rozerwania przez cztery konie",
              "powieszenia",
              "wygnania",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Ganelona broni Pinabel z sorenckiego zamku. Tiery — brat Żofra, drobny, ale odważny rycerz — wyzwał go na pojedynek i wygrał. Ganelona rozerwano czterema końmi — śmierć godna jawnego zdrajcy.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które z poniższych stwierdzeń o kompozycji utworu są prawdziwe?",
      content: {
        options: [
          "Utwór dzieli się na strofy (laisses) o nierównej długości, z asonansem zamiast rymu",
          "Opisy bitew budowane są wedle powtarzalnych formuł (cios, przebicie tarczy i pancerza, śmierć)",
          "Narrator jest obiektywny i nigdy nie komentuje wydarzeń",
          "Zjawiska nadprzyrodzone (sny, cudy, aniołowie) pełnią ważną rolę w fabule",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Utwór zbudowany jest ze strof (laisses) z asonansem, opisy bitew są formuliczne, a elementy nadprzyrodzone kluczowe (sny Karola, zatrzymanie słońca, aniołowie). Narrator NIE jest obiektywny — otwarcie komentuje i ocenia, np. \u201EGanelon przybył, ten który dopuścił się zdrady\u201D.",
      },
    },

    // --- DIFF 3 — SA (3) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Wyjaśnij, dlaczego Roland próbuje zniszczyć miecz Durendal przed śmiercią. Jakie są jego motywacje?",
      content: {
        hints: ["honor miecza", "poganie", "relikwie"],
      },
      correctAnswer:
        "Roland nie chce, aby Durendal dostał się w ręce pogan — byłoby to hańbą. Miecz zawiera święte relikwie (ząb św. Piotra, krew św. Bazylego, włosy św. Denisa, strzęp szaty Najświętszej Panny) i przez niego zdobyto wiele ziem dla Karola. Roland wali nim o skałę dziesięciokrotnie, ale stal jest tak dobra, że nie pęka. Próba zniszczenia miecza to akt rycerskiego honoru i ochrony sacrum.",
      metadata: {
        explanation:
          "Scena zniszczenia miecza to jeden z najbardziej wzruszających momentów utworu. Durendal jest nie tylko bronią, ale relikwiarzem — łącznikiem między światem ludzkim a boskim. Trzykrotna lamentacja nad mieczem to przykład powtórzenia epickiego.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Opisz scenę pojednania i rozstania Rolanda z Oliwierem. Dlaczego jest to szczególnie wzruszający moment?",
      content: {
        steps: [
          {
            id: 1,
            instruction: "Co Oliwier robi Rolandowi w wyniku utraty wzroku?",
          },
          { id: 2, instruction: "Jak reaguje Roland?" },
          { id: 3, instruction: "Jak rozstają się obaj rycerze?" },
        ],
      },
      correctAnswer:
        "1) Oliwier, tracąc wzrok od ran, nie poznaje Rolanda i uderza go mieczem w hełm. 2) Roland pyta łagodnie, z miłością: \u201ECzy ty to robisz umyślnie?\u201D. Przebacza mu natychmiast. 3) Pochylają się ku sobie w geście miłości i żegnają — \u201EI tak, w wielkiej miłości, rozstali się\u201D. To wzruszające, bo pokazuje czułość między rycerzami-braćmi, silniejszą niż gniew i ból.",
      metadata: {
        explanation:
          "Scena ta ukazuje tzw. \u201Emiękkość i tkliwość rycerzy wobec towarzyszów broni\u201D (jak pisze Boy-Żeleński), która jest jednym z najbardziej ludzkich elementów surowego eposu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "W jaki sposób utwór przedstawia Saracenów? Czy obraz wroga jest obiektywny?",
      content: {},
      correctAnswer:
        "Obraz Saracenów jest silnie uproszczony i tendencyjny. Narrator przypisuje im kult Mahometa, Apollina i Terwagana (fikcyjne bóstwa), nie rozumiejąc islamu. Poganie przedstawiani są jako okrutni, demoniczni (np. Szernubel z kraju, gdzie słońce nie świeci), a ich los — jako zasłużona kara. Jednocześnie niektórzy rycerze saraceńscy budzą podziw narratora — np. emir z Balagieru jest nazwany \u201Eprawdziwym baronem, gdyby był chrześcijaninem\u201D.",
      metadata: {
        explanation:
          "Czarno-biały obraz wroga jest typowy dla chanson de geste i służy propagowaniu krucjatowej ideologii. Jednak narrator miejscami przełamuje ten schemat, przyznając poganom rycerską dzielność.",
      },
    },

    // --- DIFF 3 — SN (2) ---

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Roland i Oliwier — dwa modele rycerskości. Porównaj postawy obu bohaterów i wskaż, który z nich jest bliższy ideałowi rycerza.",
        requirements: [
          "Scharakteryzuj postawę Rolanda (odwaga, honor, duma)",
          "Scharakteryzuj postawę Oliwiera (roztropność, miara)",
          "Wskaż moment, w którym postawy się zderzają (spór o róg)",
          "Sformułuj własną ocenę — 100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Notatka powinna zawierać: Roland — odwaga absolutna, honor za cenę życia, duma granicząca z pychą; Oliwier — rozwaga, pragmatyzm, troska o ocalenie wojska. Zderzenie postaw w sporze o róg. Roland odmawia z honoru, Oliwier mówi: \u201Emiara warta jest więcej niż zarozumienie\u201D. Utwór nie daje jednoznacznej odpowiedzi — obaj giną z honorem, ale klęska jest ceną pychy Rolanda. Idealny rycerz łączyłby obie postawy.",
      metadata: {
        explanation:
          "Para Roland/Oliwier to klasyczny topos dwóch komplementarnych cnót rycerskich: fortitudo (męstwo) i sapientia (mądrość). Narrator mówi wprost: \u201ERoland jest mężny, a Oliwier roztropny\u201D.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Rola elementów nadprzyrodzonych w \u201EPieśni o Rolandzie\u201D — sny, cudy i aniołowie",
        requirements: [
          "Wymień co najmniej 3 elementy nadprzyrodzone z utworu",
          "Wyjaśnij ich funkcję w fabule",
          "Odnieś się do teocentrycznego światopoglądu średniowiecza",
          "80-120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Elementy nadprzyrodzone: prorocze sny Karola (niedźwiedź i lampart, złamana włócznia), zatrzymanie słońca przez Boga, zstąpienie aniołów po duszę Rolanda (Gabriel, Michał, Cherubin), pojawienie się anioła na końcu utworu z rozkazem nowej wojny. Funkcja: podkreślają, że historia toczy się pod bożym nadzorem, a Frankowie walczą z boskim mandatem. Teocentryzm — Bóg aktywnie ingeruje w los ludzi, nagradzając wiernych i karząc zdrajców.",
      metadata: {
        explanation:
          "Elementy nadprzyrodzone wpisują utwór w średniowieczny światopogląd teocentryczny — historia jest realizacją boskiego planu, a rycerze chrześcijańscy to narzędzia Opatrzności.",
      },
    },

    // =============================================================================
    // DIFFICULTY 4 — 5 pytań (2 CS + 1 CM + 1 SN + 1 ES)
    // =============================================================================

    // --- DIFF 4 — CS (2) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Jaką funkcję pełni w utworze postać Karola Wielkiego jako idealnego władcy?",
      content: {
        options: [
          "Karol jest wyłącznie tłem fabuły — nie pełni żadnej funkcji symbolicznej",
          "Karol jest ironicznie przedstawiony jako władca słaby i niezdecydowany",
          "Karol jest wzorem władcy-pomazańca: sprawiedliwego, pobożnego, cierpiącego za swoich poddanych — uosabia średniowieczny ideał rex iustus, ale jest bezradny wobec zdrady i cierpienia",
          "Karol jest przede wszystkim wodzem wojskowym — jego duchowa rola jest marginalna",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Karol Wielki to parenetyczny wzorzec władcy: sprawiedliwy, pobożny, łączący się z Bogiem przez sny i aniołów. Jednocześnie jest postacią tragiczną — cierpi, płacze, mdleje z bólu po śmierci Rolanda. Wymierza sprawiedliwość (sąd nad Ganelonem), ale nie może uniknąć cierpienia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Jak rzeczywiste wydarzenie historyczne z 778 roku różni się od wersji przedstawionej w \u201EPieśni o Rolandzie\u201D?",
      content: {
        options: [
          "Nie ma żadnych różnic — utwór wiernie oddaje fakty historyczne",
          "W rzeczywistości Karol Wielki nigdy nie był w Hiszpanii",
          "W rzeczywistości Roland przeżył bitwę i został królem Francji",
          "W rzeczywistości Rolanda zabili baskijscy górale (chrześcijanie) dla łupu, nie Saracenowie — legenda zamieniła ich na muzułmanów, by nadać wydarzeniu charakter wojny o wiarę",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Według kronikarza Eginharda, 15 sierpnia 778 roku tylną straż Karola napadli gaskońscy/baskijscy górale dla łupu — chrześcijanie, nie muzułmanie. Legenda zastąpiła ich Saracenami, czyniąc z Rolanda obrońcę krzyża i antycypując późniejsze krucjaty.",
      },
    },

    // --- DIFF 4 — CM (1) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które wartości feudalnego porządku społecznego ujawnia \u201EPieśń o Rolandzie\u201D?",
      content: {
        options: [
          "Relacja wasal-senior: wierność, oddanie, obowiązek służby",
          "Prawo do zemsty rodowej (vendetta) i pojedynku sądowego jako metody rozstrzygania sporów",
          "Równość wszystkich ludzi wobec prawa niezależnie od stanu",
          "Rytualne gesty feudalne: złożenie rękawicy, otrzymanie laski i sztandaru",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Utwór ukazuje feudalny porządek: Roland jako wasal Karola, Ganelon broniący się prawem do vendetta, rytualne gesty (rękawica, laska). Równość ludzi wobec prawa NIE jest wartością feudalną — hierarchia stanowa jest fundamentem tego świata.",
      },
    },

    // --- DIFF 4 — SN (1) ---

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Motyw zdrady w \u201EPieśni o Rolandzie\u201D — analiza postaci Ganelona. Czy jest jednoznacznie zły?",
        requirements: [
          "Opisz motywację Ganelona (osobista krzywda, lęk przed śmiercią)",
          "Omów argumenty jego obrony na sądzie",
          "Wskaż, dlaczego sąd uznaje go za zdrajcę mimo jego argumentów",
          "Oceń, czy postać Ganelona jest czarno-biała, czy bardziej złożona",
          "120-180 słów",
        ],
        wordLimit: { min: 120, max: 180 },
      },
      correctAnswer:
        "Notatka powinna zawierać: Ganelon ma motywację (Roland skazał go na niebezpieczne poselstwo), jego lęk jest uzasadniony (poprzedni posłowie zginęli). Na sądzie argumentuje: zemsta na wrogu osobistym nie jest zdradą, bo publicznie wyzwał Rolanda. Baronowie chcą go uniewinnić! Dopiero Tiery przesądza: Roland służył Karolowi, więc atak na niego to zdrada króla. Ganelon NIE jest jednoznacznie zły — ma ludzkie motywacje, jest odważny, piękny i szlachetny. Ale zdradził wspólnotę — i to czyni go archetypem zdrajcy.",
      metadata: {
        explanation:
          "Postać Ganelona jest bardziej złożona niż się wydaje — ma uzasadnioną krzywdę, broni się legalnie. Jednak w systemie feudalnym zdrada seniora (przez Rolanda — wasala Karola) jest najcięższą zbrodnią.",
      },
    },

    // --- DIFF 4 — ES (1) ---

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Czy pycha Rolanda jest jego cnotą, czy wadą? Rozważ problem, odwołując się do \u201EPieśni o Rolandzie\u201D.",
      content: {
        thesis: "Pycha Rolanda — cnota rycerska czy tragiczna wada?",
        structure: {
          introduction:
            "Przedstaw problem: Roland odmawia trąbienia w róg — honor czy szaleństwo?",
          arguments_for:
            "Argumenty za pychą jako cnotą: wierność kodeksowi rycerskiemu, gotowość do poświęcenia, sława i pamięć pośmiertna",
          arguments_against:
            "Argumenty za pychą jako wadą: śmierć tysięcy rycerzy, krytyka Oliwiera (\u201Emiara ważniejsza niż zarozumienie\u201D), ból Karola",
          conclusion:
            "Sformułuj wniosek — czy utwór jednoznacznie ocenia postawę Rolanda?",
        },
        requirements: [
          "Minimum 250 słów",
          "Odwołanie do co najmniej 3 scen z utworu",
          "Uwzględnienie perspektywy Oliwiera jako kontrapunktu",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 250, max: 400 },
      },
      correctAnswer:
        "Wypracowanie powinno zawierać: tezę o ambiwalencji pychy Rolanda. Argumenty \u201Eza\u201D: odmowa trąbienia jako akt rycerski, troska o sławę, śmierć jako zwycięstwo moralne. Argumenty \u201Eprzeciw\u201D: Oliwier mówi wprost o szaleństwie, ginący rycerze, ból Karola. Wniosek: utwór nie daje jednoznacznej odpowiedzi — Roland jest wzorem, ale jego pycha ma cenę. Konflikt fortitudo vs sapientia.",
      metadata: {
        explanation:
          "To pytanie wymaga analizy centralnego dylematu etycznego utworu. Roland jest jednocześnie wzorem i przestrogą — takie napięcie czyni go postacią tragiczną.",
      },
    },

    // =============================================================================
    // DIFFICULTY 5 — 5 pytań (2 CS + 2 CM + 1 ES)
    // =============================================================================

    // --- DIFF 5 — CS (2) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Jakie znaczenie ma komentarz tłumacza Boya-Żeleńskiego o \u201Emieście Galne\u201D w kontekście pacyfistycznej lektury eposu?",
      content: {
        sourceText: {
          author: "Tadeusz Boy-Żeleński",
          title: "Od tłumacza — Pieśń o Rolandzie",
          text: "Dzisiejszy człowiek patrzy na czyny chrobrego Rolanda oczami\u2026 miasta Galne.",
        },
        options: [
          "Boy proponuje spojrzenie na epos z perspektywy ofiar — zniszczonego miasta, które stoi \u201Esto lat pustką\u201D — podważając heroiczny mit i antycypując powojenną wrażliwość na cierpienie cywilów",
          "Boy chce podkreślić, że rycerze byli bezlitośni wobec własnych żołnierzy",
          "Boy krytykuje jakość tłumaczenia Pieśni na język polski",
          "Boy uważa, że Galne to najważniejsze miejsce fabuły",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Boy-Żeleński, pisząc w 1931 roku (po I wojnie), proponuje nowoczesną, pacyfistyczną lekturę eposu. Zamiast patrzeć oczami Rolanda-bohatera, patrzy oczami miasta Galne — zniszczonego i zapomnianego. To prekursorska wobec współczesnej humanistyki uwaga o ofiarach wojen.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "W jaki sposób \u201EPieśń o Rolandzie\u201D realizuje parenetyczną funkcję literatury średniowiecznej?",
      content: {
        options: [
          "Utwór parodiuje wzorce rycerskie, ośmieszając etos wojenny",
          "Utwór przedstawia wzorce do naśladowania: idealnego rycerza (Roland), idealnego władcę (Karol), idealnego kapłana-wojownika (Turpin) oraz antywzorzec zdrajcy (Ganelon) — jest to literatura wychowawcza",
          "Utwór jest podręcznikiem taktyki wojennej dla średniowiecznych dowódców",
          "Utwór przedstawia wyłącznie historyczne fakty bez elementu dydaktycznego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Parenetyzm to kluczowa cecha literatury średniowiecznej: utwór kształci przez przykład. Roland = wzorzec rycerza, Karol = wzorzec władcy, Turpin = wzorzec kapłana-wojownika, Ganelon = antywzorzec zdrajcy. Oda = wzorzec wiernej narzeczonej. Każda postać niesie lekcję moralną.",
      },
    },

    // --- DIFF 5 — CM (2) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które z poniższych porównań \u201EPieśni o Rolandzie\u201D z \u201EIliadą\u201D Homera są trafne?",
      content: {
        options: [
          "Oba utwory opisują wojnę i heroiczną śmierć bohaterów",
          "W obu utworach pycha bohatera prowadzi do katastrofy (Achilles/Roland)",
          "Oba utwory mają tę samą koncepcję bogów — politeistycznych, kaprysnych",
          "W obu utworach etos rycerski i sława pośmiertna są nadrzędnymi wartościami",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Oba eposy opisują wojnę, pycha bohatera napędza tragedię, sława jest kluczowa. Różnica: \u201EPieśń\u201D jest monoteistyczna (Bóg chrześcijański), \u201EIliada\u201D — politeistyczna. Koncepcja bóstw jest fundamentalnie odmienna.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Które cechy \u201EPieśni o Rolandzie\u201D świadczą o jej ustnym, przedliterackim pochodzeniu?",
      content: {
        options: [
          "Powtórzenia epickie (laisses similaires) — te same sceny z drobnymi wariacjami, ułatwiające zapamiętywanie",
          "Formuliczne opisy bitew — szablonowe sekwencje ciosów (tarcza, pancerz, ciało, siodło, koń)",
          "Skomplikowana symbolika alegoryczna wymagająca lektury wielopoziomowej",
          "Bezpośrednie zwroty do słuchaczy (\u201EGdybyście mogli widzieć\u201D) — technika żywego opowiadania",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Cechy ustne: powtórzenia epickie (mnemotechnika), formuliczność bitew (gotowe szablony narracyjne), zwroty do słuchaczy (\u201EGdybyście mogli widzieć\u201D). Skomplikowana symbolika alegoryczna jest cechą literatury pisanej, uczonej — nie tradycji ustnej.",
      },
    },

    // --- DIFF 5 — ES (1) ---

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "MIDDLE_AGES",
      work: "Pieśń o Rolandzie",
      question:
        "Scena śmierci Rolanda jako wzorzec ars moriendi. Porównaj ją z innym literackim obrazem śmierci i oceń, jak epoka kształtuje sposób przedstawiania umierania.",
      content: {
        thesis:
          "Śmierć Rolanda jako wzorzec ars moriendi w kontekście porównawczym",
        structure: {
          introduction:
            "Zdefiniuj ars moriendi i zarysuj kontekst — średniowieczny wzorzec dobrej śmierci",
          arguments_for:
            "Analiza sceny śmierci Rolanda: wyznanie grzechów, modlitwa, gest rękawicy, aniołowie. Dlaczego ta śmierć jest \u201Ewzorcowa\u201D?",
          arguments_against:
            "Porównanie z innym literackim obrazem śmierci (np. Hektorowi Iliada, Antygona, Gloria victis Orzeszkowej, Rozdziobią nas kruki Żeromskiego). Jak inna epoka zmienia obraz umierania?",
          conclusion:
            "Wniosek: czy ars moriendi jest uniwersalnym wzorcem, czy produktem konkretnej epoki?",
        },
        requirements: [
          "Minimum 400 słów",
          "Szczegółowa analiza sceny śmierci Rolanda z cytatami/odwołaniami",
          "Porównanie z co najmniej jednym innym utworem",
          "Odwołanie do kontekstu epoki (teocentryzm, ideał rycerski)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno zawierać: definicję ars moriendi, analizę sceny (Roland leży twarzą ku Hiszpanii, bije się w pierś, wyznaje grzechy, wyciąga rękawicę Bogu, aniołowie zanoszą duszę do raju). Porównanie z innym dziełem — np. naturalistyczna śmierć u Żeromskiego (brak podniosłości, brzydota, samotność) lub antyczna śmierć Hektora (honor, ale bez wymiaru religijnego). Wniosek: ars moriendi jest produktem teocentrycznego średniowiecza, ale potrzeba godnej śmierci jest uniwersalna.",
      metadata: {
        explanation:
          "Temat łączy analizę utworu z kontekstem epoki i porównaniem międzytekstowym. Kluczowe: zrozumienie, że sposób przedstawiania śmierci odzwierciedla światopogląd epoki.",
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
