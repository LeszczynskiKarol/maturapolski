// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";
import { TestLandingService } from "../src/services/testLandingService";

const prisma = new PrismaClient();
const testLandingService = new TestLandingService();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= POCZĄTEK PYTAŃ Kordian ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Kto jest autorem dramatu \u201eKordian\u201d?",
      content: {
        options: [
          "Adam Mickiewicz",
          "Juliusz Słowacki",
          "Zygmunt Krasiński",
          "Aleksander Fredro",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201eKordian\u201d to dramat romantyczny Juliusza Słowackiego, napisany w Genewie w 1833 roku i wydany anonimowo w Paryżu w 1834 roku. Pełny tytuł brzmi: \u201eKordian. Część pierwsza trylogii. Spisek koronacyjny\u201d.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Ile lat ma Kordian na początku akcji dramatu (Akt I)?",
      content: {
        options: ["12 lat", "15 lat", "18 lat", "21 lat"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Na początku Aktu I Kordian ma piętnaście lat. Jest wrażliwym, melancholijnym młodzieńcem, czytającym \u201eCierpienia młodego Wertera\u201d Goethego i nieszczęśliwie zakochanym w starszej od siebie Laurze.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Z jakiej struktury składa się dramat \u201eKordian\u201d?",
      content: {
        options: [
          "Prolog i cztery akty",
          "Przygotowanie, Prolog i trzy akty",
          "Pięć aktów z epilogiem",
          "Dwa akty z prologiem i epilogiem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dramat składa się z: Przygotowania (scena na Łysej Górze w noc sylwestrową 1799), Prologu (spór trzech osób o rolę poezji) oraz trzech aktów (Akt I \u2013 młodość Kordiana, Akt II \u2013 podróże po Europie, Akt III \u2013 spisek koronacyjny).",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Co dzieje się w scenie \u201ePrzygotowania\u201d na Łysej Górze?",
      content: {
        options: [
          "Kordian modli się o ratunek dla ojczyzny",
          "Szatan i czarownice tworzą z kotła przyszłych przywódców powstania listopadowego",
          "Spiskowcy planują zamach na cara",
          "Trzy osoby dyskutują o roli poezji narodowej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W noc sylwestrową 1799 roku na Łysej Górze Szatan i czarownice wyciągają z kotła przywódców powstania listopadowego: Chłopickiego, Skrzyneckiego, Krukowieckiego, Czartoryskiego, Lelewela i Niemcewicza. W ten sposób Słowacki negatywnie ocenia przywódców powstania.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Kim jest Grzegorz w dramacie?",
      content: {
        options: [
          "Ojcem Kordiana",
          "Starym wiernym sługą Kordiana, byłym żołnierzem napoleońskim",
          "Generałem dowodzącym spiskowcami",
          "Księdzem spowiadającym Kordiana w więzieniu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Grzegorz to stary sługa rodziny Kordiana, weteran wojen napoleońskich. Opowiada młodemu Kordianowi trzy historie: bajkę o Janku, co psom szył buty, opowieść z wojen napoleońskich i historię żołnierza Kazimierza z niewoli rosyjskiej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Jakie hasło wypowiada Kordian na szczycie Mont Blanc, polemizując z Mickiewiczem?",
      content: {
        options: [
          "\u201ePolska Chrystusem narodów!\u201d",
          "\u201ePolska Winkelriedem narodów!\u201d",
          "\u201ePolska Prometeuszem narodów!\u201d",
          "\u201ePolska orłem wśród narodów!\u201d",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Na szczycie Mont Blanc Kordian wypowiada hasło \u201ePolska Winkelriedem narodów!\u201d, nawiązując do legendy o Arnoldzie Winkelriedzie, który poświęcił życie w bitwie pod Sempach. To polemika z Mickiewiczowskim mesjanizmem (\u201ePolska Chrystusem narodów\u201d).",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Połącz etapy podróży Kordiana z tym, czego się tam dowiaduje:",
      content: {
        matchingType: "events_to_places",
        leftColumn: [
          { id: "A", text: "Londyn" },
          { id: "B", text: "Dover (Anglia)" },
          { id: "C", text: "Włochy" },
          { id: "D", text: "Mont Blanc" },
        ],
        rightColumn: [
          {
            id: "1",
            text: "Przełom \u2013 deklaracja poświęcenia się dla ojczyzny",
          },
          { id: "2", text: "Rozczarowanie kultem pieniądza" },
          { id: "3", text: "Refleksja nad literaturą i rozczarowanie fikcją" },
          { id: "4", text: "Rozczarowanie miłością (Wioletta) i papieżem" },
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
          "W Londynie Kordian poznaje wszechobecny kult pieniądza. Na klifach Dover rozmyśla o literaturze (Szekspirze) i jej fikcyjności. We Włoszech przeżywa rozczarowanie kupioną miłością Wioletty i obojętnością papieża wobec Polski. Na Mont Blanc doznaje przełomu duchowego.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Które z poniższych postaci historycznych pojawiają się w scenie \u201ePrzygotowania\u201d?",
      content: {
        options: [
          "Generał Józef Chłopicki",
          "Książę Adam Czartoryski",
          "Tadeusz Kościuszko",
          "Generał Jan Skrzynecki",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Z kotła czarownic wyłaniają się przywódcy powstania listopadowego: Chłopicki, Skrzynecki, Krukowiecki, Czartoryski, Lelewel i Niemcewicz. Kościuszko nie pojawia się \u2013 jego powstanie miało miejsce w 1794 r., a scena dotyczy powstania 1830/31.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Które stwierdzenia o \u201eKordianie\u201d są prawdziwe?",
      content: {
        options: [
          "Dramat jest polemiką z III częścią \u201eDziadów\u201d Mickiewicza",
          "Imię \u201eKordian\u201d jest anagramem słowa \u201eKonrad\u201d",
          "Pełny tytuł to \u201eKordian. Część pierwsza trylogii. Spisek koronacyjny\u201d",
          "Dramat ma szczęśliwe, jednoznaczne zakończenie",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Dramat polemizuje z Mickiewiczem (winkelriedyzm vs. mesjanizm), imię jest anagramem Konrada, a pełny tytuł wskazuje na planowaną trylogię. Zakończenie jest otwarte \u2013 nie wiadomo, czy adiutant zdąży z ułaskawieniem.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Dlaczego Kordian w Akcie I próbuje popełnić samobójstwo?",
      content: {},
      correctAnswer:
        "Kordian próbuje popełnić samobójstwo, bo przeżywa typową romantyczną \u201echorobę wieku\u201d: jest rozczarowany światem, nie znajduje celu w życiu, jego miłość do Laury została odrzucona, a lektura \u201eCierpień młodego Wertera\u201d pogłębia jego melancholię.",
      metadata: {
        explanation:
          "Próba samobójcza Kordiana to element wzorca bohatera werterycznego. Kula przechodzi przez kapelusz, nie raniąc go \u2013 Kordian przeżywa, co pozwala mu na dalszą drogę dojrzewania.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "O czym dyskutują trzy osoby w Prologu i jaki jest sens tej sceny?",
      content: {
        options: [
          "Dyskutują o strategii militarnej powstania",
          "Przedstawiają trzy koncepcje roli poezji narodowej: pocieszanie narodu (Mickiewicz), realizm polityczny i poezja czynu (Słowacki)",
          "Spierają się o to, który poeta jest najlepszy",
          "Planują ucieczkę z kraju na emigrację",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Prolog to polemika literacko-ideowa. Osoba Pierwsza reprezentuje poezję pocieszającą (bliską Mickiewiczowi), Osoba Druga \u2013 realizm polityczny, Osoba Trzecia \u2013 poezję, która budzi naród do działania. To otwarty spór Słowackiego z Mickiewiczem o misję wieszcza.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Co Kordian odkrywa podczas audiencji u papieża w Rzymie?",
      content: {
        options: [
          "Papież błogosławi powstanie i obiecuje pomoc militarną",
          "Papież jest obojętny na los Polaków i potępia powstanie, nakazując czcić prawosławnego cara",
          "Papież proponuje Kordianowi wstąpienie do seminarium",
          "Papież nie przyjmuje Kordiana na audiencję",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena w Watykanie to protest Słowackiego przeciwko stanowisku papiestwa (Grzegorza XVI) wobec powstania listopadowego. Papież potępił powstańców, co głęboko rozczarowało polskich katolików. Kordian odkrywa, że nawet głowa Kościoła zdradza Polaków.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Dlaczego Kordian nie zabija cara pomimo dotarcia pod drzwi jego sypialni?",
      content: {
        options: [
          "Zostaje schwytany przez straże pałacowe",
          "Pojawiają się alegoryczne postacie Strachu i Imaginacji, które paraliżują go psychicznie, i mdleje u progu",
          "Car budzi się i Kordian ucieka",
          "Doktor podaje mu środek nasenny w drodze do sypialni",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Przed drzwiami sypialni cara Kordiana nawiedzają alegoryczne postacie: Strach (lęk przed konsekwencjami i potępieniem) i Imaginacja (irracjonalne wizje, paraliż psychiczny). Kordian mdleje, nie mogąc pokonać wewnętrznych demonów. Zbrodnia pozostaje niepopełniona.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Kim jest Doktor, którego Kordian spotyka w szpitalu wariatów (Akt III)?",
      content: {
        options: [
          "Zwykłym lekarzem psychiatrą, który leczy Kordiana",
          "Postacią szatańską \u2013 uosobieniem zimnego cynizmu i materializmu, który próbuje złamać Kordiana duchowo",
          "Przyjacielem Kordiana z lat młodzieńczych",
          "Rosyjskim szpiegiem, przebranym za lekarza",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Doktor w szpitalu wariatów to postać diaboliczna \u2013 uosabia racjonalizm, cynizm i materializm, próbuje przekonać Kordiana, że jego patriotyzm jest chorobą psychiczną. Spór Kordiana z Doktorem jest jedną z kluczowych scen dramatu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Jak kończy się dramat \u201eKordian\u201d?",
      content: {
        options: [
          "Kordian triumfalnie zabija cara i wyzwala Polskę",
          "Kordian ginie na szafocie, a naród opłakuje bohatera",
          "Zakończenie jest otwarte \u2013 adiutant pędzi z ułaskawieniem, ale nie wiadomo, czy zdąży",
          "Kordian ucieka z więzienia i emigruje do Francji",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kordian zostaje skazany na śmierć. W ostatniej scenie adiutant Wielkiego Księcia pędzi z rozkazem ułaskawienia, ale dramat się urywa \u2013 nie wiemy, czy zdążył. To celowy zabieg Słowackiego, podkreślający tragiczną nierozstrzygalność losu bohatera.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Grzegorz opowiada Kordianowi trzy historie. Pierwsza, o (1), uczy zaradności życiowej. Druga, z wojen (2), proponuje patriotyczną walkę zbiorową. Trzecia, o żołnierzu (3), przedstawia koncepcję konspiracji i indywidualnej ofiary.",
        gaps: [
          {
            id: 1,
            options: [
              "Kopciuszku",
              "Janku, co psom szył buty",
              "królu Janie",
              "chłopku Roztropku",
            ],
          },
          {
            id: 2,
            options: ["krzyżowych", "napoleońskich", "szwedzkich", "tureckich"],
          },
          {
            id: 3,
            options: [
              "Kazimierzu z niewoli rosyjskiej",
              "Janie Kiliński",
              "Emilii Plater",
              "Tadeuszu Kościuszce",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 0],
      metadata: {
        explanation:
          "Trzy opowieści Grzegorza to trzy propozycje życia: bajka o Janku (praktycyzm), historia z wojen napoleońskich (walka zbiorowa) i opowieść o Kazimierzu z niewoli rosyjskiej (spisek i indywidualna ofiara). Każda z nich proponuje inny model postępowania.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Połącz postacie z ich funkcjami w dramacie:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Laura" },
          { id: "B", text: "Wioletta" },
          { id: "C", text: "Prezes spisku" },
          { id: "D", text: "Doktor" },
        ],
        rightColumn: [
          {
            id: "1",
            text: "Cyniczny materialista, postać szatańska w szpitalu",
          },
          { id: "2", text: "Kurtyzana z Włoch, kocha za pieniądze" },
          { id: "3", text: "Sprzeciwia się carobójstwu z powodów etycznych" },
          { id: "4", text: "Pierwsza miłość Kordiana, odrzuca go" },
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
          "Laura to pierwsza, nieszczęśliwa miłość Kordiana. Wioletta to włoska kurtyzana kochająca za pieniądze. Prezes spisku sprzeciwia się zabójstwu cara jako nieetycznemu. Doktor to diaboliczna postać w szpitalu wariatów.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Które cechy bohatera werterycznego posiada Kordian w Akcie I?",
      content: {
        options: [
          "Nadmierna wrażliwość i melancholia",
          "Nieszczęśliwa miłość prowadząca do myśli samobójczych",
          "Praktyczność i zdolności wojskowe",
          "Fascynacja literaturą romantyczną (czyta Goethego)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kordian w Akcie I to wzorcowy bohater werteryczny: melancholijny, nadwrażliwy, czytający \u201eCierpienia młodego Wertera\u201d, nieszczęśliwie zakochany w Laurze, próbujący odebrać sobie życie. Nie ma praktyczności ani zdolności wojskowych \u2013 to przychodzi później.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Opisz w 2-3 zdaniach, na czym polega przełom Kordiana na szczycie Mont Blanc.",
      content: {
        hints: ["przemiana wewnętrzna", "cel życia", "ojczyzna"],
      },
      correctAnswer:
        "Na szczycie Mont Blanc Kordian przeżywa duchowy przełom: z rozczarowanego, samotnego młodzieńca przemienia się w patriotę gotowego poświęcić życie dla ojczyzny. Wypowiada hasło \u201ePolska Winkelriedem narodów!\u201d, deklarując, że Polska powinna aktywnie walczyć o wolność, a nie biernie cierpieć. To moment, w którym znajduje cel życia.",
      metadata: {
        explanation:
          "Scena na Mont Blanc to punkt zwrotny dramatu. Kordian, w symbolicznym miejscu między niebem a ziemią, podejmuje decyzję o poświęceniu się. Nawiązuje do legendy Winkelrieda \u2013 bohatera, który oddał życie, by otworzyć drogę do zwycięstwa.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Co się dzieje na zebraniu spiskowców w podziemiach katedry św. Jana?",
      content: {},
      correctAnswer:
        "Spiskowcy-podchorążowie zbierają się, by zdecydować o zamachu na cara podczas koronacji. Kordian (pod pseudonimem Podchorąży) proponuje carobójstwo, ale Prezes i Ksiądz sprzeciwiają się, uznając je za nieetyczne i sprzeczne z honorem żołnierskim. Spiskowcy nie popierają planu. Kordian, nie znalazłszy poparcia, postanawia działać samotnie.",
      metadata: {
        explanation:
          "Scena ta ukazuje moralny impas polskiego ruchu niepodległościowego: szlachetne pobudki zderzają się z lękiem i konserwatyzmem. To aluzja do słabości i braku determinacji przywódców powstania listopadowego.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Wyjaśnij, czym jest \u201ewinkelriedyzm\u201d i w jaki sposób jest on polemiczny wobec mesjanizmu Mickiewicza.",
      content: {
        slogan: "Winkelriedyzm",
      },
      correctAnswer:
        "Winkelriedyzm to koncepcja poświęcenia się narodu (jednostki) w czynnej walce o wolność \u2013 w przeciwieństwie do biernego mesjanistycznego cierpienia. Nawiązuje do legendy Arnolda Winkelrieda, który rzucił się na lance wrogów, by umożliwić zwycięstwo. U Słowackiego \u201ePolska Winkelriedem narodów\u201d oznacza: Polska musi walczyć, nie cierpieć. U Mickiewicza \u201ePolska Chrystusem narodów\u201d \u2013 Polska cierpi za inne narody i zmartwychwstanie. Słowacki odrzuca bierność na rzecz czynu.",
      metadata: {
        explanation:
          "Ten spór ideowy jest jednym z kluczowych tematów maturalnych. Winkelriedyzm kontra mesjanizm to dwa różne sposoby rozumienia roli narodu polskiego w dziejach.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Alegoryczne postacie Strachu i Imaginacji pojawiające się przed sypialnią cara symbolizują:",
      content: {
        options: [
          "Nadprzyrodzone siły zsyłane przez Boga, by uratować cara",
          "Wewnętrzne ograniczenia Kordiana \u2013 lęk i paraliż wyobraźni, które uniemożliwiają mu działanie",
          "Duchy zmarłych powstańców, błagające Kordiana o porzucenie planu",
          "Rosyjskich żołnierzy pilnujących sypialni cara",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Strach i Imaginacja to alegoryczne uosobienia wewnętrznych słabości Kordiana. Strach symbolizuje lęk przed śmiercią i potępieniem moralnym, Imaginacja \u2013 chorobliwą wrażliwość artystyczną, która paraliżuje działanie. Słowacki pokazuje, że romantyczny idealista, nawet gotowy do ofiary, może zostać pokonany przez własną psychikę.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Jaką funkcję pełni scena \u201ePrzygotowania\u201d w kontekście wymowy całego dramatu?",
      content: {
        options: [
          "Jest prologiem fabularnym, wprowadzającym głównych bohaterów",
          "To fantastyczna ramowa scena, w której Słowacki tłumaczy przyczyny klęski powstania \u2013 przywódcami byli ludzie stworzeni przez Szatana, z wbudowanymi wadami",
          "Jest sceną realistyczną, opisującą przygotowania do powstania",
          "To sen Kordiana, zapowiadający jego przyszłe rozczarowania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena na Łysej Górze to fantastyczna alegoria: Szatan tworzy wadliwych przywódców powstania. Słowacki tłumaczy klęskę powstania listopadowego nie okolicznościami, lecz jakością ludzi: przywódcy byli od początku skażeni (tchórzostwo Chłopickiego, pyszność Czartoryskiego, naiwność Lelewela). To ostra krytyka polityczna w formie literackiej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Podróże Kordiana po Europie (Akt II) pełnią funkcję:",
      content: {
        options: [
          "Wyłącznie turystyczną \u2013 Słowacki opisuje piękno krajobrazów",
          "Inicjacyjną \u2013 kolejne etapy podróży to etapy dojrzewania i rozczarowania, prowadzące do przemiany z bohatera werterycznego w patriotę czynu",
          "Polityczną \u2013 Kordian szuka sojuszników dla Polski wśród europejskich mocarstw",
          "Religijną \u2013 Kordian odwiedza święte miejsca, by odnaleźć wiarę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Podróże Kordiana to romantyczna \u201epodróż inicjacyjna\u201d: Londyn (pieniądz), Dover (literatura), Włochy (miłość i religia), Mont Blanc (przełom duchowy). Każdy etap przynosi rozczarowanie, ale też dojrzewanie. Z naiwnego werterysty Kordian staje się patriotą gotowym do czynu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "W \u201eKordianie\u201d Słowacki stosuje inspiracje szekspirowskie. Która z poniższych analogii jest najbardziej uzasadniona?",
      content: {
        options: [
          "Scena na Łysej Górze nawiązuje do czarownic z \u201eMakbeta\u201d \u2013 siły nieczyste kształtują losy ludzi i historię",
          "Kordian jest odpowiednikiem Romea, a Laura \u2013 Julii",
          "Doktor w szpitalu wariatów jest wzorowany na Prospero z \u201eBurzy\u201d",
          "Grzegorz jest szekspirowskim błaznem z \u201eKróla Leara\u201d",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Czarownice z \u201ePrzygotowania\u201d to bezpośrednia inspiracja \u201eMakbetem\u201d Szekspira: wiedźmy na pustkowiu tworzą przyszłość przez mroczne rytuały. Kordian sam czyta \u201eKróla Leara\u201d na klifach Dover \u2013 to hołd Słowackiego dla Szekspira.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Które z poniższych stwierdzeń o Kordianie jako bohaterze romantycznym są prawdziwe?",
      content: {
        options: [
          "Przechodzi ewolucję od bohatera werterycznego (biernego) do bajronicznego (aktywnego)",
          "Od początku do końca jest konsekwentnym bojownikiem, którego nic nie powstrzymuje",
          "Jego imię (od łac. cor \u2013 serce) symbolizuje człowieka kierującego się uczuciem",
          "Jego klęska wynika nie z braku odwagi, lecz z wewnętrznego konfliktu między ideałem a rzeczywistością",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Kordian przechodzi ewolucję od werteryzmu do bajronizmu. Jego imię pochodzi od \u201ecor\u201d (serce) \u2013 jest człowiekiem serca. Klęska wynika z wewnętrznego paraliżu (Strach i Imaginacja), nie z braku odwagi fizycznej. Nie jest konsekwentnym bojownikiem \u2013 mdleje u progu sypialni cara.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Które z poniższych motywów literackich są obecne w \u201eKordianie\u201d?",
      content: {
        options: [
          "Motyw podróży inicjacyjnej (dojrzewanie przez poznawanie świata)",
          "Motyw samotnego buntu jednostki przeciwko niesprawiedliwości",
          "Motyw arkadii wiejskiej i szczęśliwego życia na łonie natury",
          "Motyw rozczarowania wartościami (miłość, pieniądz, religia, poezja)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kluczowe motywy to: podróż inicjacyjna (Londyn\u2013Dover\u2013Włochy\u2013Mont Blanc), samotny bunt (Kordian sam decyduje się zabić cara), rozczarowanie wartościami (Laura, Wioletta, papież, pieniądz). Motyw arkadii wiejskiej nie występuje.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Które cechy dramatu romantycznego realizuje \u201eKordian\u201d?",
      content: {
        options: [
          "Synkretyzm rodzajowy \u2013 łączenie liryki, epiki i dramatu",
          "Elementy fantastyczne i alegoryczne obok realistycznych",
          "Ścisłe przestrzeganie klasycznej zasady trzech jedności",
          "Otwarte, nierozstrzygnięte zakończenie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Dramat łączy elementy liryczne (monolog na Mont Blanc), epickie (opowieści Grzegorza) i dramatyczne. Zawiera sceny fantastyczne (Łysa Góra, Strach, Imaginacja) obok realistycznych (spisek). Zakończenie jest otwarte. Nie zachowuje trzech jedności.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Odpowiedz na pytania dotyczące sporu Kordiana z Doktorem w szpitalu wariatów:",
      content: {
        steps: [
          {
            id: 1,
            instruction:
              "Jaką tezę stawia Doktor na temat patriotyzmu Kordiana?",
          },
          { id: 2, instruction: "Jak Kordian odpiera tę tezę?" },
          { id: 3, instruction: "Kto zwycięża w tym sporze i dlaczego?" },
        ],
      },
      correctAnswer:
        "1) Doktor twierdzi, że patriotyzm Kordiana to choroba psychiczna, szaleństwo, a jego plany \u2013 objaw obłędu. Próbuje zredukować szlachetne ideały do patologii. 2) Kordian broni swoich idei, argumentując, że to Doktor jest szalony w swoim cynizmie i materializmie, że brak wartości to prawdziwe szaleństwo. 3) Spór nie ma jednoznacznego zwycięzcy \u2013 Słowacki pokazuje, że obie strony mają racje cząstkowe. Kordian jest szlachetny, ale nieskuteczny; Doktor ma zimną logikę, ale pozbawiony jest duszy.",
      metadata: {
        explanation:
          "Spór z Doktorem to jeden z najgłębszych momentów dramatu. Dotyka pytania: czy idealizm bez skuteczności jest szaleństwem? Czy cynizm bez ideałów jest zdrowiem?",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Wyjaśnij, dlaczego Słowacki w \u201ePrzygotowaniu\u201d przedstawia przywódców powstania jako stworzonych przez Szatana.",
      content: {
        instruction:
          "Uwzględnij polityczną wymowę tej sceny i jej związek z oceną powstania listopadowego.",
      },
      correctAnswer:
        "Słowacki uważa, że powstanie upadło z powodu złego przywództwa. Tworząc przywódców z kotła Szatana, pokazuje, że ich wady były wrodzone i nieusuwalne: Chłopicki był tchórzem, Skrzynecki niezdecydowany, Czartoryski pyszny, Lelewel naiwny, Krukowiecki zdradziecki. To ostra satyra polityczna: Słowacki obwinia elity za klęskę narodową. Fantastyczna forma (sabat na Łysej Górze) pozwala na radykalną krytykę, niemożliwą w formie realistycznej.",
      metadata: {
        explanation:
          "Scena ta jest kluczowa dla rozumienia politycznej wymowy dramatu. Słowacki rozlicza się z pokoleniem przywódców, których uważa za współwinnych klęski.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Juliusz Słowacki",
          title: "Kordian",
          text: "Jam jest posąg człowieka na posągu świata \u2013 / Ze skrzydeł mgły do ramion przyrosłych \u2013 ogromy / Niosę na sobie, myślą mego ducha spięte.",
          bookReference: "Akt II, monolog na Mont Blanc",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Jakie środki stylistyczne zastosował Słowacki w tym fragmencie? Wskaż co najmniej dwa.",
            minWords: 15,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Jak te słowa charakteryzują Kordiana w momencie przełomu na Mont Blanc?",
            minWords: 25,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Metafora (\u201eposąg człowieka na posągu świata\u201d), hiperbola (niesienie ogromów), personifikacja (skrzydła mgły). 2) Kordian czuje się wywyższony nad światem \u2013 stoi na szczycie góry symbolicznie między niebem a ziemią. Widzi siebie jako tytana, zdolnego unieść ciężar świata na ramionach. To moment megalomania romantycznej, ale też autentycznego przełomu: z biernego marzyciela staje się gotowy do czynu.",
      metadata: {
        explanation:
          "Monolog na Mont Blanc to jeden z najsłynniejszych fragmentów polskiego romantyzmu. Łączy patos z głębią psychologiczną \u2013 Kordian czuje się wielki, ale ta wielkość okaże się niewystarczająca wobec realiów.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Przemiany Kordiana od Aktu I do Aktu III \u2013 droga dojrzewania bohatera romantycznego",
        requirements: [
          "Opisz Kordiana na początku (Akt I) i na końcu (Akt III)",
          "Wskaż kluczowe momenty przemiany",
          "Wyjaśnij, dlaczego mimo dojrzewania Kordian ponosi klęskę",
          "80-120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "W Akcie I Kordian to naiwny 15-latek, bohater werteryczny: melancholijny, zakochany w Laurze, próbujący się zabić. Podróże (Akt II) przynoszą rozczarowanie światem, ale też przełom na Mont Blanc \u2013 deklarację poświęcenia dla ojczyzny. W Akcie III Kordian jest już dojrzałym patriotą, zdolnym do decyzji o carobójstwie. Mimo tej przemiany ponosi klęskę, bo dojrzałość intelektualna i moralna nie wystarczą wobec wewnętrznych słabości (Strach i Imaginacja) i braku wsparcia społecznego (spiskowcy odmawiają). Słowacki pokazuje, że samotny bohater, nawet dojrzały, nie zbawi narodu.",
      metadata: {
        explanation:
          "Droga dojrzewania Kordiana to jeden z najważniejszych tematów maturalnych. Kluczowa jest teza, że przemiana jest realna, ale niewystarczająca \u2013 to krytyka romantycznego indywidualizmu.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Badacze interpretują klęskę Kordiana (omdlenie u progu sypialni cara) jako tezę Słowackiego o niepowodzeniu powstania. Która interpretacja jest najgłębsza?",
      content: {
        options: [
          "Kordian jest po prostu tchórzem i nie nadaje się na bohatera",
          "Klęska Kordiana jest alegorią klęski całego pokolenia: ludzi szlachetnych, ale psychicznie nieprzygotowanych do czynu \u2013 zbyt wrażliwych, zbyt samotnych, zbyt rozdarnych wewnętrznie",
          "Kordian mdleje, bo jest chory fizycznie \u2013 to literacki opis epilepsji",
          "Omdlenie jest interwencją Bożą, chroniącą cara",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Słowacki pokazuje, że pokolenie powstania to ludzie szlachetni (Kordian ma wielkie serce), ale psychicznie nieprzygotowani do czynu. Romantyczna wrażliwość, która budzi ideały, jednocześnie paraliżuje w momencie działania. To diagnoza pokoleniowa, nie indywidualna wada Kordiana.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Jak Słowacki ocenia ideę carobójstwa w \u201eKordianie\u201d?",
      content: {
        options: [
          "Jednoznacznie pozytywnie \u2013 zabicie cara jest obowiązkiem patrioty",
          "Jednoznacznie negatywnie \u2013 carobójstwo jest grzechem i zbrodnią",
          "Ambiwalentnie \u2013 pokazuje szlachetność motywacji (wolność), ale też moralną wątpliwość i praktyczną nieskuteczność samotnego czynu",
          "Nie zajmuje stanowiska, pozostawiając ocenę czytelnikowi",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Słowacki nie potępia Kordiana, ale pokazuje granice indywidualnego bohaterstwa: szlachetny cel (wolność) nie usprawiedliwia automatycznie środka (morderstwo), a samotny czyn bez wsparcia narodu jest skazany na klęskę. To głęboka refleksja o etyce walki narodowej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Dlaczego Słowacki celowo pozostawia otwarte zakończenie dramatu (nie wiemy, czy ułaskawienie zdąży)?",
      content: {
        options: [
          "Nie zdążył dokończyć dramatu z powodów osobistych",
          "Chciał napisać kontynuację, ale zmienił plany",
          "Otwarte zakończenie symbolizuje nierozstrzygalność losu Polski i samotnego bohatera \u2013 nie wiadomo, czy naród zdąży się obudzić, zanim będzie za późno",
          "Było to modne rozwiązanie w literaturze romantycznej",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Otwarte zakończenie to celowy zabieg: los Kordiana odzwierciedla los Polski \u2013 nie wiadomo, czy zostanie ocalona. Adiutant pędzący z ułaskawieniem to metafora nadziei, ale niepewnej. Słowacki stawia pytanie: czy jest jeszcze czas na ratunek?",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Które z poniższych porównań Kordiana z Konradem z III części \u201eDziadów\u201d są merytorycznie trafne?",
      content: {
        options: [
          "Obie postacie to romantyczni indywidualiści walczący o Polskę, ale Konrad działa przez słowo (Wielka Improwizacja), a Kordian próbuje czynu (carobójstwo)",
          "Konrad przechodzi gwałtowną metamorfozę (Gustaw\u2192Konrad), Kordian dojrzewa stopniowo przez podróże",
          "Obie postacie ponoszą klęskę, ale przyczyny są inne: Konrad z powodu pychy, Kordian z powodu wewnętrznego rozdarcia",
          "Kordian jest starszą, dojrzalszą wersją Konrada",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Konrad walczy słowem (Improwizacja), Kordian próbuje czynu. Konrad przechodzi nagłą metamorfozę, Kordian dojrzewa stopniowo. Obaj ponoszą klęskę, ale z różnych powodów. Kordian nie jest \u201estarszą wersją\u201d Konrada \u2013 to polemiczna odpowiedź Słowackiego na bohatera Mickiewicza.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Które z poniższych tez o wymowie \u201eKordiana\u201d są uzasadnione?",
      content: {
        options: [
          "Dramat jest gorzkim rozrachunkiem z powstaniem listopadowym i jego przywódcami",
          "Słowacki krytykuje romantyczny indywidualizm: samotny bohater nie zbawi narodu",
          "Dramat jest hymnem pochwalnym na cześć spiskowców i carobójstwa",
          "Słowacki polemizuje z Mickiewiczem, proponując winkelriedyzm zamiast mesjanizmu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Dramat rozlicza się z powstaniem (Przygotowanie), krytykuje samotny heroizm (klęska Kordiana) i polemizuje z mesjanizmem (winkelriedyzm). Nie gloryfikuje carobójstwa \u2013 ukazuje je jako akt szlachetny, ale skazany na klęskę.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Porównaj trzy opowieści Grzegorza z Aktu I jako trzy modele życia. Który z nich wybiera Kordian i dlaczego?",
      content: {},
      correctAnswer:
        "Trzy opowieści to trzy propozycje życia: 1) Bajka o Janku \u2013 praktycyzm, zaradność (ale banał, brak ideałów). 2) Opowieść napoleońska \u2013 walka zbiorowa, patriotyzm (ale podporządkowanie wodzowi). 3) Historia Kazimierza \u2013 indywidualny bunt, konspiracja, gotowość na śmierć (heroizm, ale samotność). Kordian ostatecznie wybiera trzeci model \u2013 samotny czyn na rzecz ojczyzny. To wybór heroiczny, ale tragiczny: bez wsparcia zbiorowości (model 2) indywidualny bunt okazuje się nieskuteczny. Słowacki pokazuje, że prawdziwe wyzwolenie wymaga połączenia modeli 2 i 3.",
      metadata: {
        explanation:
          "Opowieści Grzegorza to nie tylko element fabuły, ale klucz do interpretacji całego dramatu. Kordian wybiera najszlachetniejszy, ale i najryzykowniejszy model \u2013 i ponosi konsekwencje tego wyboru.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Juliusz Słowacki",
          title: "Kordian",
          text: "Polska \u2013 Winkelriedem narodów! Poświęcę się \u2013 choć może przyjdzie mi nieść tych lancę grot przez piersi \u2013 byle w otwartą bramę weszli za mną ludzie.",
          bookReference: "Akt II, monolog na Mont Blanc (parafraza)",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wyjaśnij, kim był Winkelried i dlaczego Kordian przywołuje tę postać.",
            minWords: 25,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Na czym polega polemika z mesjanizmem Mickiewicza w tym fragmencie?",
            minWords: 30,
            maxPoints: 2,
          },
        ],
      },
      correctAnswer:
        "1) Arnold Winkelried to legendarny szwajcarski bohater, który w 1386 r. pod Sempach rzucił się na lance wroga, poświęcając życie, by otworzyć drogę wojsku. Kordian przywołuje go jako wzór aktywnej ofiary \u2013 nie biernego cierpienia. 2) Mickiewicz głosił, że Polska jest \u201eChrystusem narodów\u201d \u2013 cierpi niewinnie za inne narody i zmartwychwstanie. Słowacki odrzuca bierność: Polska nie powinna czekać na cud, lecz walczyć. Winkelriedyzm to hasło czynu \u2013 ofiara ma sens, tylko gdy prowadzi do konkretnego zwycięstwa, nie metafizycznego zbawienia.",
      metadata: {
        explanation:
          "Spór mesjanizm vs. winkelriedyzm to jeden z centralnych sporów polskiego romantyzmu. Na maturze kluczowe jest umiejętne zestawienie obu koncepcji.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Jaką rolę pełni motyw pieniądza w \u201eKordianie\u201d? Przywołaj co najmniej dwa przykłady.",
      content: {},
      correctAnswer:
        "Pieniądz to motyw rozczarowania: 1) W Londynie Kordian odkrywa, że wszystko jest na sprzedaż \u2013 nawet uczucia i wartości podlegają prawom rynku. 2) We Włoszech Wioletta kocha go tylko za pieniądze \u2013 gdy dowiaduje się, że nie jest bogaty, traci zainteresowanie. 3) W kontekście symbolicznym pieniądz reprezentuje materializm cywilizacji zachodniej, z którym Kordian nie potrafi się pogodzić. Rozczarowanie pieniądzem popycha go ku wartościom niematerialnym \u2013 ojczyźnie i poświęceniu.",
      metadata: {
        explanation:
          "Motyw pieniądza jest jednym z elementów krytyki cywilizacji zachodniej w dramacie. Słowacki pokazuje, że Europa Zachodnia, do której Polacy zwracają się o pomoc, jest sama skażona materializmem.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Obraz powstania listopadowego w \u201eKordianie\u201d \u2013 krytyka Słowackiego",
        requirements: [
          "Wskaż, jak Słowacki ocenia przywódców powstania (Przygotowanie)",
          "Jak przedstawia spiskowców i ich gotowość do czynu (Akt III)",
          "Jaka jest ogólna teza Słowackiego o przyczynach klęski",
          "120-160 słów",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "Słowacki w \u201ePrzygotowaniu\u201d tworzy alegorię: Szatan stworzył przywódców powstania z wrodzonymi wadami (Chłopicki \u2013 dyktator-tchórz, Skrzynecki \u2013 niezdecydowany, Czartoryski \u2013 pyszny arystokrata, Krukowiecki \u2013 zdrajca). W Akcie III spiskowcy w katedrze św. Jana odmawiają carobójstwa z powodów etycznych, ale też z lęku. Nawet Kordian, najodważniejszy, mdleje u progu. Teza Słowackiego: powstanie upadło z powodu złego przywództwa, braku determinacji i izolacji bohaterskich jednostek. Naród nie był gotowy do zbiorowego czynu, a samotni bohaterowie nie mogli zastąpić zbiorowości. To gorzka diagnoza pokoleniowa, ale też wezwanie: Polska potrzebuje nie mesjanistycznego cierpienia, lecz winkelriedowskiego czynu \u2013 opartego na solidarności.",
      metadata: {
        explanation:
          "Krytyka powstania to rdzeń politycznej wymowy dramatu. Słowacki nie potępia powstańców moralnie, ale pokazuje strukturalne przyczyny klęski.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Strach i Imaginacja jako alegoryczne postacie \u2013 co mówią o kondycji romantycznego bohatera?",
        requirements: [
          "Opisz, czym jest Strach i czym Imaginacja w kontekście psychiki Kordiana",
          "Wyjaśnij, dlaczego właśnie te dwie siły paraliżują bohatera czynu",
          "Odnieś się do krytyki romantyzmu zawartej w tej scenie",
          "100-140 słów",
        ],
        wordLimit: { min: 100, max: 140 },
      },
      correctAnswer:
        "Strach to lęk przed konsekwencjami \u2013 przed śmiercią, potępieniem moralnym, odpowiedzialnością za zabójstwo. Imaginacja to nadmierna wrażliwość artystyczna, która mnożu wizje, podsyca irracjonalny niepokój i paraliżuje zdolność do działania. Razem tworzą pułapkę romantyka: ten sam dar (wrażliwość, wyobraźnia), który czyni Kordiana poetą i idealistą, jednocześnie uniemożliwia mu skuteczne działanie. Słowacki diagnozuje tu fundamentalną sprzeczność romantyzmu: nadmierna duchowość jest wrogiem czynu. Bohater romantyczny marzy o wielkim czynie, ale jego własna psychika \u2013 ukształtowana przez poezję, wrażliwość i idealizm \u2013 staje mu na drodze w decydującym momencie.",
      metadata: {
        explanation:
          "Scena ze Strachem i Imaginacją to jedno z najgłębszych osiągnięć psychologicznych polskiego romantyzmu. Słowacki antycypuje tu odkrycia psychologii dotyczące konfliktu wewnętrznego i paraliżu decyzyjnego.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Droga do dojrzałości romantycznego indywidualisty. Omów zagadnienie na podstawie \u201eKordiana\u201d Juliusza Słowackiego. W swojej odpowiedzi uwzględnij również wybrany kontekst.",
      content: {
        thesis: "Kordian \u2013 droga od melancholii do czynu i klęski",
        structure: {
          introduction:
            "Przedstaw tezę: dojrzewanie Kordiana to paradoks romantyzmu \u2013 im bardziej dojrzały, tym bardziej tragiczny",
          arguments_for:
            "Omów etapy dojrzewania: werteryzm (Akt I), rozczarowania podróży (Akt II), przełom na Mont Blanc, decyzja o carobójstwie (Akt III)",
          arguments_against:
            "Rozważ, czy Kordian naprawdę dojrzał, skoro mdleje u progu sypialni. Czy to klęska dojrzałości, czy jej brak?",
          conclusion:
            "Wniosek: Słowacki pokazuje, że dojrzałość indywidualisty nie wystarczy bez wsparcia zbiorowości. Odwołaj się do kontekstu",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej trzech scen z dramatu",
          "Kontekst: np. Konrad z Dziadów, bohater bajroniczny, współczesny przykład",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Prześledzić etapy: werteryzm (Laura, samobójstwo) \u2192 podróże (rozczarowania) \u2192 Mont Blanc (przełom) \u2192 spisek (działanie) \u2192 omdlenie (klęska). 2) Postawić pytanie: czy Kordian jest dojrzały, gdy mdleje? Tak \u2013 bo poznał świat i podjął decyzję. Nie \u2013 bo nie pokonał wewnętrznych słabości. 3) Porównać z Konradem (Mickiewicz) \u2013 Konrad przechodzi gwałtowną metamorfozę, ale też ponosi klęskę. 4) Wniosek: romantyczny indywidualizm prowadzi do tragedii \u2013 bez zbiorowości bohater jest skazany na porażkę.",
      metadata: {
        explanation:
          "Temat dojrzewania jest jednym z najpopularniejszych w kontekście \u201eKordiana\u201d. Kluczowe jest uchwycenie paradoksu: dojrzałość Kordiana jest realna, ale niewystarczająca.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Badacze porównują \u201eKordiana\u201d z III częścią \u201eDziadów\u201d jako dwa konkurencyjne modele dramatu romantycznego o losie Polski. Które zestawienie najdokładniej oddaje istotę tej polemiki?",
      content: {
        options: [
          "Mickiewicz proponuje bierny mesjanizm (Polska cierpi za narody), Słowacki \u2013 aktywny winkelriedyzm (Polska walczy i poświęca się). Mickiewicz wierzy w moc słowa-czynu (Improwizacja), Słowacki pokazuje, że samo słowo nie wystarczy \u2013 potrzeba zbiorowego działania",
          "Oba dramaty mają identyczną wymowę, różnią się tylko stylizmem",
          "Słowacki pochwala powstanie, Mickiewicz je potępia",
          "Mickiewicz jest ateistą, Słowacki \u2013 gorliwym katolikiem",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "To kluczowe zestawienie dla matury. Mickiewicz: mesjanizm, moc słowa, Konrad jako poeta-wieszcz. Słowacki: winkelriedyzm, konieczność czynu, krytyka samotnego heroizmu. Oba dramaty diagnozują przyczyny klęski, ale proponują różne rozwiązania.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Słowacki w \u201eKordianie\u201d stworzył \u201eportret psychologiczny\u201d bohatera romantycznego, co było nowością wobec Mickiewicza. Na czym polega ta innowacja?",
      content: {
        options: [
          "Słowacki dodał sceny komediowe, których brakowało u Mickiewicza",
          "Słowacki pokazał pełną ewolucję psychiczną bohatera \u2013 od młodzieńczej naiwności przez rozczarowanie do decyzji i klęski \u2013 z uwzględnieniem mechanizmów wewnętrznych (Strach, Imaginacja), podczas gdy Konrad u Mickiewicza pojawia się już ukształtowany",
          "Słowacki wprowadził postacie kobiece, których brak u Mickiewicza",
          "Słowacki zastosował realistyczny styl narracji zamiast poetyckiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konrad w Dziadach pojawia się jako postać już ukształtowana (metamorfoza z Gustawa jest opisana ex post). Kordian przechodzi pełną ewolucję na oczach czytelnika: od 15-letniego werterysty do dojrzałego patrioty. Dodatkowo Słowacki wprowadza alegoryczne uosobienia stanów psychicznych (Strach, Imaginacja), antycypując psychologię głębi.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Które z poniższych tez o wymowie \u201eKordiana\u201d w kontekście epoki romantyzmu są uzasadnione?",
      content: {
        options: [
          "Dramat jest autokrytyką romantyzmu: pokazuje, że romantyczne ideały (wrażliwość, indywidualizm, imaginacja) mogą paraliżować zamiast wyzwalać",
          "Słowacki polemizuje nie tylko z Mickiewiczem, ale z całą epoką: kwestionuje skuteczność romantycznego heroizmu jednostki",
          "Dramat jest apologią rewolucji i zachęca do indywidualnego terroru politycznego",
          "Otwarte zakończenie jest refleksją egzystencjalną: los człowieka (i narodu) jest niepewny, a nadzieja \u2013 krucha",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Dramat jest autokrytyką romantyzmu (imaginacja paraliżuje bohatera), polemiką z Mickiewiczem i całą epoką (samotny heroizm nie wystarczy), oraz refleksją egzystencjalną (otwarte zakończenie). NIE jest apologią terroru \u2013 Słowacki pokazuje nieskuteczność i moralną dwuznaczność carobójstwa.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Porównaj \u201eKordiana\u201d z III częścią \u201eDziadów\u201d jako dwa modele dramatu o losie Polski. Wskaż różnice w koncepcji bohatera, narodu i zbawienia.",
      content: {},
      correctAnswer:
        "Bohater: Konrad to poeta-wieszcz, buntujący się przeciw Bogu z pozycji siły duchowej; Kordian to człowiek czynu, który próbuje działać, ale jest zbyt wrażliwy. Naród: u Mickiewicza Polska to \u201eChrystus narodów\u201d \u2013 cierpi za innych; u Słowackiego naród jest współwinny klęski (źli przywódcy, brak determinacji). Zbawienie: u Mickiewicza przyjdzie przez cierpienie i Bożą interwencję; u Słowackiego przez czyn i ofiarę (winkelriedyzm), ale samotny czyn nie wystarczy \u2013 potrzeba zbiorowości. Forma: Mickiewicz tworzy dramat mistyczno-profetyczny; Słowacki \u2013 psychologiczno-polityczny. Obie wizje są krytyczne wobec status quo, ale proponują różne drogi wyjścia.",
      metadata: {
        explanation:
          "To jedno z najważniejszych porównań maturalnych. Kluczowe: mesjanizm vs. winkelriedyzm, słowo vs. czyn, metamorfoza gwałtowna vs. stopniowa, mistyka vs. psychologia.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Czy \u201eKordian\u201d jest dramatem o klęsce, czy o nadziei? Uzasadnij swoje stanowisko, odwołując się do struktury i zakończenia dramatu.",
      content: {},
      correctAnswer:
        "Dramat jest jednocześnie o klęsce i nadziei. O klęsce: Kordian mdleje u progu, spisek upada, przywódcy powstania byli wadliwi od początku, bohater trafia do szpitala wariatów i na szafot. O nadziei: otwarte zakończenie (adiutant z ułaskawieniem) nie zamyka drogi ratunku, postawa Kordiana jest szlachetna mimo porażki, a diagnoza klęski (wady przywódców, samotność bohatera, brak solidarności) jest jednocześnie wezwaniem do poprawy \u2013 Słowacki nie mówi \u201enie da się\u201d, lecz \u201enie tak\u201d. Tytuł jako \u201eCzęść pierwsza trylogii\u201d sugerował dalszy ciąg. Klęska Kordiana jest przestrogą, nie wyrokiem.",
      metadata: {
        explanation:
          "To pytanie wymaga syntezy. Najlepsza odpowiedź uniknie jednoznaczności: dramat łączy tragizm z dydaktyzmem \u2013 ukazuje klęskę, by wskazać drogę do sukcesu.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Juliusz Słowacki",
          title: "Kordian",
          text: "STRACH: Stój! \u2013 Widzisz, ile krwi na podłodze? Ona się rusza, rośnie, wzbiera\u2026 IMAGINACJA: A za tymi drzwiami ciemność, a w tej ciemności \u2013 człowiek śpiący \u2013 a ty mu masz nóż wbić w piersi\u2026 Słyszysz bicie jego serca? Patrz \u2013 twoje ręce drżą!",
          bookReference:
            "Akt III, scena przed sypialnią cara (parafraza kluczowych motywów)",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wyjaśnij, jaką funkcję pełnią alegoryczne postacie Strachu i Imaginacji. Dlaczego Słowacki zdecydował się uosobić wewnętrzne konflikty Kordiana jako osobne postaci?",
            minWords: 50,
            maxPoints: 3,
          },
          {
            id: 2,
            instruction:
              "Jak ta scena wpisuje się w krytykę romantycznego indywidualizmu?",
            minWords: 40,
            maxPoints: 2,
          },
        ],
        requirements: [
          "Odwołaj się do psychologii bohatera romantycznego",
          "Uwzględnij kontekst polityczny (klęska powstania)",
          "Łącznie 120-170 słów",
        ],
        wordLimit: { min: 120, max: 170 },
      },
      correctAnswer:
        "1) Strach i Imaginacja to uosobienia wewnętrznego konfliktu Kordiana. Słowacki uczyniał je osobnymi postaciami, by podkreślić, że wróg bohatera romantycznego nie jest zewnętrzny (car, straże), lecz wewnętrzny (własna psychika). To zabieg dramaturgiczny dający widzialność procesom mentalnym \u2013 antycypacja dramaturgii ekspresjonistycznej. Strach reprezentuje racjonalny lęk przed konsekwencjami, Imaginacja \u2013 irracjonalną nadwrażliwość artystyczną. 2) Scena ukazuje fundamentalną sprzeczność romantyzmu: wrażliwość i wyobraźnia, które czynią Kordiana poetą i idealistą, jednocześnie go paraliżują w momencie czynu. Romantyczny indywidualista jest zbyt delikatny na politykę. To diagnoza klęski pokolenia po 1831 roku: ludzie szlachetni, ale niezdolni do brutalności wymaganej przez walkę o wolność.",
      metadata: {
        explanation:
          "Scena ze Strachem i Imaginacją to szczytowe osiągnięcie Słowackiego jako psychologa. Na maturze kluczowe jest powiązanie psychologii z polityką: Kordian mdleje nie dlatego, że jest tchórzem, ale dlatego, że jest poetą.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "ROMANTICISM",
      work: "Kordian",
      question:
        "Czy samotny bohater może zmienić bieg historii? Rozważ problem na podstawie \u201eKordiana\u201d Juliusza Słowackiego i wybranego kontekstu literackiego lub historycznego.",
      content: {
        thesis: "Samotny bohater wobec historii \u2013 heroizm czy iluzja?",
        structure: {
          introduction:
            "Zarysuj problem: czy jednostka bez wsparcia zbiorowości może dokonać przełomu historycznego?",
          arguments_for:
            "Argumenty za: Kordian ma odwagę, ideały i determinację; historia zna przykłady samotnych bohaterów zmieniających bieg wydarzeń; winkelriedyzm zakłada ofiarę jednostki",
          arguments_against:
            "Argumenty przeciw: Kordian mdleje (psychiczne ograniczenia), spiskowcy odmawiają (brak poparcia), przywódcy powstania byli wadliwi \u2013 Słowacki pokazuje, że bez solidarności narodowej bohater jest skazany na klęskę",
          conclusion: "Sformułuj wniosek i odwołaj się do kontekstu",
        },
        requirements: [
          "Minimum 400 słów",
          "Analiza sceny przed sypialnią cara i zebrania spiskowców",
          "Kontekst: np. Konrad z Dziadów, Hrabia Henryk z Nie-Boskiej, postać historyczna",
          "Logiczna argumentacja",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Przeanalizować sceny: zebranie spiskowców (odmowa zbiorowości), próba zamachu (klęska jednostki), Strach i Imaginacja (wewnętrzne ograniczenia). 2) Zestawić z kontekstem: Konrad z Dziadów (też samotny, też przegrywa), Hrabia Henryk (też walczy sam, ginie). 3) Sformułować wniosek: Słowacki uważa, że samotny heroizm jest szlachetny, ale nieskuteczny \u2013 Polska potrzebuje nie jednego Winkelrieda, lecz narodu Winkelriedów. Klęska Kordiana jest przestrogą, nie potępieniem.",
      metadata: {
        explanation:
          "Temat uniwersalny i popularny maturalnie. Wymaga umiejętności zestawienia tekstu z kontekstem i sformułowania niebanalnej tezy.",
      },
    },

    // ======================= KONIEC PYTAŃ Kordian ===================//

    // ======================= POCZĄTEK PYTAŃ Kazania sejmowe ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Kto jest autorem \u201eKazań sejmowych\u201d?",
      content: {
        options: [
          "Jan Kochanowski",
          "Mikołaj Rej",
          "Piotr Skarga",
          "Andrzej Frycz Modrzewski",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "\u201eKazania sejmowe\u201d napisał Piotr Skarga (1536\u20131612), jezuita i nadworny kaznodzieja króla Zygmunta III Wazy. Utwór powstał w 1597 roku.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Ile kazań wchodzi w skład zbioru \u201eKazania sejmowe\u201d?",
      content: {
        options: ["Cztery", "Sześć", "Osiem", "Dwanaście"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zbiór składa się z ośmiu kazań. Pierwsze jest wstępne (o mądrości), drugie traktuje o miłości ojczyzny, a kolejne omawiają sześć \u201echorób Rzeczypospolitej\u201d.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Ile \u201echorób Rzeczypospolitej\u201d wymienia Skarga w swoich kazaniach?",
      content: {
        options: ["Trzy", "Cztery", "Sześć", "Dziesięć"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Skarga wymienia sześć chorób: 1) nieżyczliwość ku ojczyźnie, 2) niezgoda domowa, 3) naruszenie religii katolickiej przez herezje, 4) osłabienie władzy królewskiej, 5) niesprawiedliwe prawa, 6) jawne grzechy i ich bezkarność.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Za panowania którego króla Piotr Skarga pełnił funkcję nadwornego kaznodziei?",
      content: {
        options: [
          "Stefan Batory",
          "Zygmunt III Waza",
          "Władysław IV Waza",
          "Jan III Sobieski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga od 1588 roku był nadwornym kaznodzieją króla Zygmunta III Wazy. To właśnie Zygmunt III liczył, że kazania wpłyną na posłów i pomogą wzmocnić władzę królewską.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Połącz numery kazań z ich głównymi tematami:",
      content: {
        matchingType: "quotes_to_works",
        leftColumn: [
          { id: "A", text: "Kazanie I" },
          { id: "B", text: "Kazanie II" },
          { id: "C", text: "Kazanie III" },
          { id: "D", text: "Kazanie VI" },
        ],
        rightColumn: [
          { id: "1", text: "O niezgodzie domowej" },
          { id: "2", text: "O mądrości potrzebnej do rady" },
          { id: "3", text: "O monarchii i osłabieniu władzy królewskiej" },
          { id: "4", text: "O miłości ku ojczyźnie" },
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
          "Kazanie I to wstęp o mądrości. Kazanie II \u2013 najsłynniejsze \u2013 mówi o miłości ojczyzny. Kazanie III traktuje o niezgodzie jako drugiej chorobie. Kazanie VI dotyczy osłabienia władzy królewskiej (monarchii).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych \u201echorób Rzeczypospolitej\u201d wymienia Skarga?",
      content: {
        options: [
          "Nieżyczliwość ku ojczyźnie i chciwość domowa",
          "Niezgody i roztyrki sąsiedzkie",
          "Brak dostępu do morza i portów handlowych",
          "Naruszenie religii katolickiej przez herezje",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Skarga wymienia: nieżyczliwość ku ojczyźnie, niezgodę domową, naruszenie religii katolickiej, osłabienie władzy królewskiej, niesprawiedliwe prawa i jawne grzechy. Brak dostępu do morza nie jest wymieniony.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Do czego Skarga porównuje ojczyznę w Kazaniu II?",
      content: {
        options: [
          "Do twierdzy oblężonej przez wrogów",
          "Do tonącego okrętu, na którym wszyscy płyną",
          "Do chorego drzewa, którego korzenie gniją",
          "Do pasterza, który stracił owce",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Najsłynniejsza metafora Skargi: ojczyzna to okręt, na którym wszyscy płyną. Gdy okręt tonie, głupi pilnuje swoich skrzynek, zamiast ratować statek. Tak i obywatele, dbając o prywatne interesy, gubią wspólne państwo.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Jakim innym obrazem Skarga opisuje ojczyznę w Kazaniu II?",
      content: {
        options: [
          "Jako króla siedzącego na tronie",
          "Jako namilszą matkę, którą dzieci powinny czcić i chronić",
          "Jako pole bitwy, na którym walczą bracia",
          "Jako klasztor, w którym panuje porządek i modlitwa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga wielokrotnie nazywa ojczyznę \u201enamilszą matką\u201d: \u201eKtóra jest pierwsza i zasłużeńsza matka jako ojczyzna?\u201d. Matka ta urodziła, wychowała, nadała i wyniosła obywateli. Przeklęty, kto ją zasmuca.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Jaką formę władzy Skarga uważa za najlepszą dla Rzeczypospolitej?",
      content: {
        options: [
          "Demokrację szlachecką z silnym sejmem",
          "Monarchię ograniczoną prawami, z silną władzą jednego króla",
          "Republikę oligarchiczną na wzór wenecki",
          "Teokrację z papieżem jako najwyższą władzą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga opowiada się za monarchią \u2013 rządem jednego \u2013 ale nie absolutną tyranią, lecz \u201eprawy sprawiedliwemi i radą mądrą podpartą\u201d. Krytykuje demokrację (rządy pospólstwa) i wzór wenecki jako nieodpowiednie dla tak rozległego państwa jak Polska.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Skarga dzieli mądrość na (1) \u2013 niebieską, pochodzącą od Boga, i (2) \u2013 ziemską, którą nazywa też bydlęcą i (3).",
        gaps: [
          {
            id: 1,
            options: ["boską", "filozoficzną", "praktyczną", "królewską"],
          },
          {
            id: 2,
            options: ["boską", "ludzką", "pogańską", "świecką"],
          },
          {
            id: 3,
            options: ["anielską", "diabelską", "pogańską", "barbarzyńską"],
          },
        ],
      },
      correctAnswer: [0, 1, 1],
      metadata: {
        explanation:
          "W Kazaniu I Skarga rozróżnia mądrość boską (z nieba) i ludzką (ziemską). Tę drugą, gdy służy tylko doczesnym celom, nazywa \u201ebydlęcą\u201d i \u201ediabelską\u201d, bo skupia się na sprawach cielesnych, ignorując wieczne.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych stwierdzeń o \u201eKazaniach sejmowych\u201d są prawdziwe?",
      content: {
        options: [
          "Kazania nigdy nie zostały wygłoszone na sejmie \u2013 sejm w 1597 roku zerwano",
          "Skarga przedstawia siebie jako kaznodzieję-lekarza, który diagnozuje choroby ojczyzny",
          "Kazania powstały w epoce romantyzmu jako wyraz tęsknoty za utraconą ojczyzną",
          "Utwór łączy retorykę antyczną z biblijną stylistyką i prorockim tonem",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kazania nie zostały wygłoszone (sejm zerwano). Skarga stylizuje się na lekarza Rzeczypospolitej. Utwór łączy antyczną retorykę z biblijnym stylem. Kazania powstały w renesansie (1597), nie w romantyzmie.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Wyjaśnij metaforę ojczyzny jako tonącego okrętu z Kazania II. Jak Skarga ją rozwija?",
      content: {},
      correctAnswer:
        "Ojczyzna to okręt, na którym wszyscy obywatele płyną ze swoimi rodzinami, majątkami i skarbami. Gdy okręt tonie, głupi człowiek pilnuje swoich skrzynek i tłomoków, zamiast ratować statek. Mądry porzuca prywatny dobytek i biegnie ratować okręt, bo wie, że gdy okręt zatonie, i on ze wszystkim zginie. Tak samo obywatel powinien poświęcić prywatne interesy dla ratowania Rzeczypospolitej.",
      metadata: {
        explanation:
          "To jedna z najsłynniejszych metafor w polskiej literaturze. Skarga używa jej, by przekonać szlachtę, że prywatne bogacenie się kosztem państwa jest samobójstwem \u2013 gdy państwo upadnie, upadną wszyscy.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Co Skarga krytykuje w szlacheckim pojmowaniu \u201ezłotej wolności\u201d?",
      content: {},
      correctAnswer:
        "Skarga uznaje prawdziwą wolność (od tyranii, od obcych panów, od niesprawiedliwości) za wielką wartość. Krytykuje natomiast \u201ewolność piekielną\u201d \u2013 samowolę, nieposłuszeństwo wobec króla i prawa, bezkarność za zbrodnie. Porównuje takich szlachciców do \u201esynów Beliala bez jarzma\u201d i do dzikich źrebiąt, które nie znają uzdy. Szlachta używa wolności jako płaszcza na swoje zbrodnie.",
      metadata: {
        explanation:
          "Skarga rozróżnia trzy dobre wolności (od grzechu, od obcych panów, od tyranii) i czwartą \u2013 \u201epiekielną\u201d, która jest swowolnością. Ten podział jest kluczowy dla zrozumienia jego krytyki ustroju.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "W Kazaniu III Skarga porównuje Rzeczpospolitą do ciała ludzkiego i do muzyki. Jaki jest cel tych porównań?",
      content: {
        options: [
          "Pokazanie, że wszystkie stany powinny być absolutnie równe",
          "Udowodnienie, że nierówność stanów jest naturalna i potrzebna, ale wymaga zgody, wzajemnego ustępowania i jednej głowy, która rządzi",
          "Przekonanie szlachty, że stan duchowny powinien rządzić państwem",
          "Zilustrowanie piękna polskiej kultury i tradycji muzycznej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga używa analogii ciała (różne członki, ale jedna dusza i głowa) i muzyki (różne głosy, ale jeden kantor daje takt) do uzasadnienia hierarchii stanowej. Nierówność jest naturalna, ale wymaga zgody, wzajemnego ustępowania i jednego króla-dyrygenta. Bez tego \u201eobmierzłe wrzaski\u201d zamiast harmonii.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Skarga w Kazaniu VIII przybiera ton starotestamentowych proroków, mówiąc: \u201eBych był Jeremiaszem, wziąłbych pęta na nogi i okowy\u2026\u201d. Jaką funkcję pełni ta stylizacja?",
      content: {
        options: [
          "Jest ozdobą retoryczną, niemającą głębszego znaczenia",
          "Nadaje kaznodzirei autorytet proroka, który w imieniu Boga ostrzega naród przed karą za grzechy, łącząc los Rzeczypospolitej z losem biblijnego Izraela",
          "Ma na celu przerażenie słuchaczy i wywołanie paniki",
          "Jest żartem literackim, rozluźniającym napięcie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Stylizacja na proroka biblijnego (Izajasza, Jeremiasza, Ezechiela, Jonasza) to kluczowy chwyt retoryczny Skargi. Nadaje mu autorytet Bożego posłańca i łączy los Polski z losem Izraela \u2013 jak Izrael za grzechy stracił ojczyznę, tak Polska może ją stracić.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych środków retorycznych stosuje Skarga w \u201eKazaniach sejmowych\u201d?",
      content: {
        options: [
          "Apostrofy \u2013 bezpośrednie zwroty do senatorów, do Boga, do ojczyzny",
          "Cytaty biblijne i przykłady ze Starego Testamentu jako argumenty z autorytetu",
          "Dialogi filozoficzne w stylu Platona",
          "Pytania retoryczne i wykrzyknienia, budujące emocjonalne napięcie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Styl Skargi łączy: apostrofy (\u201ePrzezacni Panowie!\u201d, \u201eBoże!\u201d), cytaty biblijne (Izajasz, Jeremiasz, Psalmy), pytania retoryczne (\u201eJakoż głowa mocna być ma?\u201d) i wykrzyknienia. Nie stosuje dialogów platońskich \u2013 to kazanie, nie dialog filozoficzny.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych przykładów biblijnych i historycznych przywołuje Skarga w Kazaniu II jako wzory miłości ojczyzny?",
      content: {
        options: [
          "Mojżesz, który chciał dać własne zbawienie za lud Boży",
          "Nehemiasz, który porzucił karierę u króla Artakserksesa, by odbudować Jerozolimę",
          "Juliusz Cezar, który podbił Galię dla chwały Rzymu",
          "Judyta, która zaryzykowała życie, by wybawić oblężone miasto",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Skarga przywołuje: Mojżesza (gotowość do poświęcenia), Nehemiasza (porzucenie kariery dla ojczyzny), Judytę (ryzyko życia i czystości dla ludu), a także Zorobabela, Machabeuszów, Regulusa i inne wzory. Cezar nie jest przywoływany jako wzór patriotyzmu.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Piotr Skarga",
          title: "Kazania sejmowe",
          text: "O piękna wolności, w której wszytki swowolności i niekarności panują, w której mocniejszy słabsze uciskają, w której Boskie i ludzkie prawa gwałcą, karać się nie dadzą ani królowi, ani urzędom! Wszyscy jako synowie Beliala bez jarzma, bez wodze!",
          bookReference: "Kazanie I",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wskaż środek stylistyczny dominujący w tym fragmencie i nazwij go.",
            minWords: 10,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Wyjaśnij, czym jest \u201ewolność\u201d w rozumieniu Skargi w tym fragmencie i komu ją zarzuca.",
            minWords: 20,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Ironia i apostrofa \u2013 Skarga ironicznie woła \u201eO piękna wolności!\u201d, po czym natychmiast demaskuje ją jako swowolność pełną przemocy i bezprawia. 2) \u201eWolność\u201d w tym fragmencie to wolność fałszywa \u2013 swowolność szlachecka, w której mocniejszy uciska słabszych, nikt nie szanuje prawa, a król nie ma władzy karania. Skarga zarzuca to szlachcie, która pod płaszczem \u201ezłotej wolności\u201d dopuszcza się bezprawia.",
      metadata: {
        explanation:
          "Fragment ten jest kwintesencją krytyki wolności szlacheckiej u Skargi. Ironia (\u201epiękna wolność\u201d) w zderzeniu z katalogiem nadużyć tworzy mocny efekt retoryczny.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Wyjaśnij, dlaczego Skarga porównuje pięć stanów Rzeczypospolitej do pięciu palców jednej ręki (Kazanie IV). Co wynika z tego porównania dla kwestii tolerancji religijnej?",
      content: {},
      correctAnswer:
        "Skarga wymienia pięć stanów: duchowny, senatorski, żołnierski, miejski i oracki (kmieci). Są one jak pięć palców jednej ręki \u2013 wyrosły razem i tworzą jedną całość. Ewangelicy (heretycy) chcą być \u201eszóstym palcem\u201d, który nie wyrósł naturalnie z ciała Rzeczypospolitej. Skarga argumentuje, że wprawienie go siłą zniszczy całą rękę. Wynika z tego odrzucenie tolerancji religijnej: nowy stan heretycki niszczy jedność ciała państwa.",
      metadata: {
        explanation:
          "Metafora szóstego palca to jedno z najbardziej obrazowych porównań Skargi. Jest argumentem za jednością wyznaniową (katolicką) jako fundamentem spójności państwa.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Obraz ojczyzny w \u201eKazaniach sejmowych\u201d \u2013 metafory i alegorie",
        requirements: [
          "Wymień co najmniej trzy metafory, którymi Skarga opisuje ojczyznę",
          "Wyjaśnij funkcję perswazyjną tych metafor",
          "Odwołaj się do konkretnych kazań",
          "80-120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Skarga opisuje ojczyznę trzema głównymi metaforami: 1) Matka \u2013 ojczyzna jest \u201enamilszą matką\u201d, która urodziła, wychowała i nadała obywatelom (Kazanie II). Przeklęty, kto ją zasmuca. 2) Okręt \u2013 tonący statek, na którym wszyscy płyną; kto dba o prywatne skrzynki zamiast ratować okręt, gubi siebie i innych (Kazanie II). 3) Ciało \u2013 Rzeczpospolita jako ciało z różnymi członkami (stanami), którymi rządzi jedna głowa (król) i jedno serce (religia) (Kazanie III i VI). Funkcja perswazja: matka budzi poczucie winy i obowiązku, okręt \u2013 strach przed katastrofą, ciało \u2013 argument za jednością i hierarchią.",
      metadata: {
        explanation:
          "Metaforyka Skargi służy perswazji. Każdy obraz odwołuje się do innej emocji: matka \u2013 miłość i wdzięczność, okręt \u2013 lęk, ciało \u2013 rozum i porządek.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Skarga w Kazaniu VIII przywołuje postacie Izajasza, Jeremiasza, Ezechiela i Jonasza, mówiąc: \u201eBych był Izajaszem, chodziłbych boso i na poły nagi\u2026\u201d. Dlaczego kazania Skargi uznano po rozbiorach za prorocze?",
      content: {
        options: [
          "Bo Skarga przepowiedział dokładną datę rozbiorów",
          "Bo jego diagnoza chorób Rzeczypospolitej (niezgoda, swowolność, osłabienie władzy królewskiej) okazała się trafna \u2013 te same problemy doprowadziły do upadku państwa w XVIII wieku",
          "Bo cytował proroctwa Nostradamusa o Polsce",
          "Bo sam ogłosił się prorokiem i uzyskał potwierdzenie od papieża",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kazania uznano za prorocze, bo choroby wskazane przez Skargę w 1597 roku (swowolność szlachecka, liberum veto, osłabienie króla, niezgoda, brak reform) faktycznie doprowadziły do upadku Rzeczypospolitej w XVIII w. Romantycy (Matejko, poeci) uwiecznili Skargę jako proroka narodowej katastrofy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "W Kazaniu VII Skarga mówi: \u201eZłe prawo gorsze jest niżli tyran nasroższy\u201d. Jaką tezę uzasadnia tym porównaniem?",
      content: {
        options: [
          "Że tyran zawsze jest lepszy od prawa pisanego",
          "Że złe prawo trwa wiecznie i nieustannie szkodzi, podczas gdy tyran może się odmienić lub umrzeć, a jego tyraństwo ustaje",
          "Że Polska nie potrzebuje praw, tylko silnego króla",
          "Że prawa powinny być pisane wyłącznie przez duchownych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga porównuje złe prawo do bestii, która \u201enamówić się nie da\u201d \u2013 trzeba ją zabić (znieść prawo). Tyran może się odmienić, dać się przekonać lub umrzeć. Złe prawo trwa i niszczy bez końca. To argument za reformowaniem szkodliwych ustaw.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych zarzutów Skarga stawia szlachcie i sejmowi w Kazaniu VI?",
      content: {
        options: [
          "Posłowie tracą czas na kłótnie o marszałka, a król musi czekać tygodniami",
          "Koło poselskie uzurpuje sobie władzę króla, zmieniając monarchię w \u201edymokrację\u201d",
          "Szlachta jest zbyt wykształcona i zbyt dużo czyta, zaniedbując obronę",
          "Posłowie często kierują się prywatnymi interesami, nie dobrem publicznym",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Skarga krytykuje: marnowanie czasu na wybór marszałka (raz nawet 2,5 tygodnia!), uzurpację władzy przez koło poselskie (zamiana monarchii w demokrację), prywatę posłów. Nie zarzuca szlachcie nadmiernego wykształcenia \u2013 wręcz przeciwnie, krytykuje brak nauki.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Piotr Skarga",
          title: "Kazania sejmowe",
          text: "Wyście ojcowie naszy i opiekunowie, a my sieroty i dzieciny wasze. Wyście jako matki i mamki nasze: jeśli nas odbieżycie a źle o nas radzić będziecie, my poginiem i sami zginiecie. Wyście rozumy i głowy nasze: my jako proste dzieci na wasze się obmyślanie spuszczamy \u2026 Wyście jako góry, z których rzeki i zdroje wytryskają: a my jako pola, które się onemi rzekami polewają i chłodzą.",
          bookReference: "Kazanie II",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wskaż, jakie relacje społeczne Skarga buduje za pomocą tych porównań i kto jest \u201emy\u201d, a kto \u201ewy\u201d.",
            minWords: 25,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Wyjaśnij cel retoryczny tego fragmentu \u2013 co Skarga chce osiągnąć u słuchaczy.",
            minWords: 25,
            maxPoints: 2,
          },
        ],
      },
      correctAnswer:
        "1) \u201eWy\u201d to senatorowie, posłowie, szlachta \u2013 elita rządząca; \u201emy\u201d to prosty lud, poddani, ogół obywateli. Skarga buduje relację rodzic\u2013dziecko, góra\u2013dolina, głowa\u2013ciało, podkreślając odpowiedzialność rządzących za los całego narodu. 2) Cel: wzbudzenie poczucia odpowiedzialności i winy. Skarga mówi głosem ludu, prosząc o opiekę. Chce, by senatorowie poczuli się jak ojcowie i matki, które porzucając dzieci, same giną. Technika \u201egłosu ludu\u201d potęguje emocjonalny nacisk na decydentów.",
      metadata: {
        explanation:
          "Skarga konsekwentnie używa porównań hierarchicznych (góra\u2013pole, ojciec\u2013dziecko), by podkreślić odpowiedzialność elit. To retoryka apelująca do sumienia rządzących.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Porównaj wizję państwa Piotra Skargi z wizją Andrzeja Frycza Modrzewskiego (autora \u201eO poprawie Rzeczypospolitej\u201d). Co ich łączy, a co dzieli?",
      content: {},
      correctAnswer:
        "Łączy ich: troska o Rzeczpospolitą i diagnoza jej chorób (niesprawiedliwość, nierząd, brak reform). Obaj widzą konieczność wzmocnienia władzy i poprawy praw. Dzieli ich: stosunek do tolerancji \u2013 Modrzewski był za wolnością religijną i reformą Kościoła, Skarga za jednością katolicką i zwalczaniem herezji. Stosunek do stanów \u2013 Modrzewski postulował równość stanów wobec prawa (kara za mężobójstwo chłopa = szlachcica), Skarga akceptował hierarchię stanową, choć krytykował ucisk chłopów. Metoda \u2013 Modrzewski pisał traktat polityczny, Skarga \u2013 kazanie perswazyjne.",
      metadata: {
        explanation:
          "Porównanie Skargi z Modrzewskim to klasyczny temat maturalny. Obaj diagnozują choroby Rzeczypospolitej, ale proponują inne recepty \u2013 Modrzewski bardziej świecki i tolerancyjny, Skarga bardziej religijny i kontrreformacyjny.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Sześć chorób Rzeczypospolitej wg Piotra Skargi \u2013 diagnoza i aktualność",
        requirements: [
          "Wymień wszystkie sześć chorób",
          "Wyjaśnij, która z nich jest wg Skargi najgroźniejsza i dlaczego",
          "Oceń, czy diagnoza Skargi okazała się trafna w perspektywie późniejszych dziejów Polski",
          "120-160 słów",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "Sześć chorób: 1) Nieżyczliwość ku ojczyźnie i chciwość, 2) Niezgoda domowa, 3) Naruszenie religii katolickiej przez herezje, 4) Osłabienie władzy królewskiej, 5) Niesprawiedliwe prawa, 6) Jawne grzechy i ich bezkarność. Dla Skargi najgroźniejsza jest choroba trzecia (herezja), bo podkopuje fundament \u2013 jedność religijną, na której zbudowane jest państwo. Diagnoza okazała się proroczo trafna w wielu punktach: swowolność szlachecka (liberum veto), osłabienie króla, niezgoda stanów i brak reform faktycznie doprowadziły do rozbiorów w XVIII w. Mniej trafna była diagnoza religijna \u2013 tolerancja religijna nie była bezpośrednią przyczyną upadku. Kazania po rozbiorach uznano za prorocze, a obraz Matejki \u201eKazanie Skargi\u201d utrwalił tę legendę.",
      metadata: {
        explanation:
          "Ocena trafności diagnozy Skargi wymaga krytycznego dystansu: niektóre choroby trafnie opisują przyczyny upadku Rzeczypospolitej, inne (herezja jako główne zagrożenie) odzwierciedlają raczej kontrreformacyjne poglądy autora.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Obraz Polski i Polaków w \u201eKazaniach sejmowych\u201d Piotra Skargi. Omów zagadnienie, uwzględniając wybrany kontekst literacki.",
      content: {
        thesis:
          "Skarga jako diagnosta chorób Rzeczypospolitej \u2013 krytyk i patriota",
        structure: {
          introduction:
            "Przedstaw kontekst: kim jest Skarga, kiedy pisze, jaki jest cel kazań",
          arguments_for:
            "Omów: metaforę ojczyzny-matki i okrętu, katalog sześciu chorób, krytykę szlacheckiej wolności, obraz zbytków i upadku moralnego",
          arguments_against:
            "Rozważ: czy Skarga jest obiektywnym diagnostą, czy stronniczym kontrreformistą; co pomija w swojej diagnozie",
          conclusion:
            "Oceń trafność diagnozy z perspektywy późniejszych dziejów; odwołaj się do kontekstu",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej trzech kazań",
          "Kontekst literacki (np. Modrzewski, Kochanowski \u201eOdprawa posłów greckich\u201d, romantyczny mesjanizm)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Przedstawić Skargę jako kaznodzieję-lekarza diagnozującego choroby państwa. 2) Omówić metafory (matka, okręt, ciało) i sześć chorób. 3) Pokazać krytykę szlachty (zbytki, prywata, swowolność) i wizję pozytywną (silna monarchia, jedność katolicka). 4) Krytycznie ocenić: Skarga jest stronniczy (kontrreformator, zwolennik silnej władzy królewskiej), ale wiele jego diagnoz okazało się trafnych. 5) Porównać z Kochanowskim (\u201eOdprawa\u201d \u2013 też ostrzega przed upadkiem przez prywatę) lub z romantykami (Skarga jako prefiguracja proroków narodowych).",
      metadata: {
        explanation:
          "Temat wymaga zarówno znajomości treści kazań, jak i umiejętności krytycznej oceny perspektywy autora.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (1) =====

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Kazanie jako gatunek literacki ma swoje specyficzne cechy. Które stwierdzenie najdokładniej opisuje \u201eKazania sejmowe\u201d pod względem genologicznym?",
      content: {
        options: [
          "Są to klasyczne homilie, objaśniające fragmenty Pisma Świętego bez odniesień do polityki",
          "Są to kazania okolicznościowe o charakterze publicystyczno-perswazyjnym, łączące formę religijną (cytaty biblijne, modlitwy, ton prorocki) z treścią polityczną (diagnoza państwa, postulaty reform)",
          "Są to traktaty filozoficzne napisane w formie dialogu sokratycznego",
          "Są to kroniki historyczne opisujące sejm z 1597 roku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kazania sejmowe to szczególny gatunek: kazanie okolicznościowe (przygodne), ale o treści politycznej. Łączą formę religijną (cytaty z Biblii, modlitwy końcowe, ton proroka) z analizą polityczną (diagnoza chorób państwa, postulaty reform). To publicystyka w szacie kaznodziejskiej.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Skarga pisze w Kazaniu VIII: \u201eMury Rzeczypospolitej waszej rysują się, a wy mówicie: Nic, nic, nierządem stoi Polska!\u201d. Zinterpretuj te słowa w kontekście całości \u201eKazań sejmowych\u201d i oceń ich aktualność jako komentarza do polskiej mentalności politycznej.",
      content: {},
      correctAnswer:
        "Skarga polemizuje z populanym powiedzeniem \u201enierządem stoi Polska\u201d \u2013 przekonaniem, że bezład i brak reform jakoś się uda przetrwać. Ostrzega, że mury Rzeczypospolitej się rysują (podziały, swowolność, brak reform, zagrożenie tureckie), a Polacy bagatelizują zagrożenie. To kwintesencja przesłania wszystkich kazań: Polska może upaść, jeśli nie przeprowadzi reform. Z perspektywy historii diagnoza okazała się tragicznie trafna \u2013 mentalność \u201ejakoś to będzie\u201d i opór wobec reform doprowadziły do rozbiorów. Fragment pozostaje aktualny jako komentarz do polskiej skłonności do bagatelizowania systemowych problemów i do wiary, że chaos jest naturalnym stanem rzeczy.",
      metadata: {
        explanation:
          "To jeden z najczęściej cytowanych fragmentów kazań. Powiedzenie \u201enierządem stoi Polska\u201d (Polonia confusione regitur) było popularne w XVI w. Skarga demaskuje je jako groźne samozłudzenie.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Czy \u201eKazania sejmowe\u201d Piotra Skargi to dzieło uniwersalne, czy wyłącznie dokument epoki? Napisz rozprawkę, rozważając obie interpretacje.",
      content: {
        thesis:
          "\u201eKazania sejmowe\u201d \u2013 między diagnozą XVI-wiecznej Rzeczypospolitej a ponadczasowym przesłaniem",
        structure: {
          introduction:
            "Zarysuj problem: czy kazania mówią tylko o Polsce Zygmunta III, czy o uniwersalnych mechanizmach upadku państw?",
          arguments_for:
            "Argumenty za uniwersalnością: metafora okrętu, diagnoza prywaty vs. dobro wspólne, krytyka swowolności i bezkarności, proroczy charakter",
          arguments_against:
            "Argumenty za dokumentem epoki: kontrreformacyjna stronniczość, nietolerancja religijna, obraz Rzeczypospolitej specyficzny dla XVI w., kontekst walki z protestantyzmem",
          conclusion:
            "Sformułuj stanowisko: np. kazania łączą oba wymiary \u2013 diagnoza jest historyczna, ale przesłanie (odpowiedzialność za państwo, niebezpieczeństwo egoizmu) jest uniwersalne",
        },
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do co najmniej trzech kazań z konkretnymi przykładami",
          "Kontekst literacki lub historyczny (np. rozbiory, współczesna publicystyka, inne dzieła o upadku państw)",
          "Poprawna argumentacja",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Za uniwersalnością: metafora okrętu/matki jest ponadczasowa; diagnoza prywaty, niezgody i swowolności dotyczy każdego państwa; proroczy charakter potwierdza trafność. 2) Za dokumentem epoki: Skarga to kontrreformator, jego wrogość wobec protestantów jest stronnicza; wizja monarchii absolutnej jest anachroniczna; kontekst Konfederacji Warszawskiej i walki Zygmunta III z sejmem jest specyficzny. 3) Wniosek: Kazania są jednocześnie głęboko osadzone w epoce i uniwersalne w przesłaniu. Ich siła polega na tym, że przez XVI-wieczne realia mówią o mechanizmach, które powtarzają się w każdym państwie.",
      metadata: {
        explanation:
          "To pytanie wymaga dojrzałej analizy, łączącej wiedzę historyczną z umiejętnością abstrakcyjnego myślenia o ponadczasowości literatury.",
      },
    },

    // ======================= KONIEC PYTAŃ Kazania sejmowe ===================//
    // ======================= DODATKOWE 20 PYTAŃ Kazania sejmowe ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Do jakiego gatunku literackiego należą \u201eKazania sejmowe\u201d?",
      content: {
        options: [
          "Powieść epistolarna",
          "Kazanie \u2013 utwór prozatorski o charakterze dydaktyczno-perswazyjnym",
          "Dramat romantyczny",
          "Epos rycerski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kazanie to gatunek literatury stosowanej, przeznaczony do publicznego wygłoszenia, o charakterze dydaktycznym, religijnym i perswazyjnym. \u201eKazania sejmowe\u201d łączą formę kazania z treścią polityczną \u2013 to publicystyka w szacie kaznodziejskiej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które kazanie jest najsłynniejsze i traktuje o miłości ku ojczyźnie?",
      content: {
        options: ["Kazanie I", "Kazanie II", "Kazanie IV", "Kazanie VIII"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kazanie II (\u201eO miłości ku ojczyźnie i o pierwszej chorobie Rzeczypospolitej\u201d) to najsłynniejsze z kazań Skargi. Zawiera metaforę ojczyzny-matki i ojczyzny-okrętu oraz katalog dobrodziejstw, jakie ojczyzna dała obywatelom.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych dobrodziejstw ojczyzny wymienia Skarga w Kazaniu II?",
      content: {
        options: [
          "Dochowanie wiary katolickiej przez stulecia",
          "Stan i majestat królewski, trwający bez przerwy",
          "Złota wolność \u2013 brak tyranii",
          "Podbój kolonii zamorskich i handel z Indiami",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Skarga wymienia: wiarę katolicką, majestat królewski, złotą wolność, pokój, dostatki, sławę wojenną, szacunek u obcych narodów. Polska XVI w. nie miała kolonii zamorskich \u2013 to nie jest wymienione.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Do kogo Skarga adresuje swoje kazania? Kim są jego słuchacze/czytelnicy?",
      content: {},
      correctAnswer:
        "Skarga adresuje kazania do senatorów, posłów i szlachty \u2013 elit politycznych Rzeczypospolitej, które zjechały na obrady sejmu. Zwraca się do nich jako \u201eprzezacni Panowie\u201d, \u201ewielmożni Panowie\u201d, \u201eobmyślacze dobra pospolitego\u201d.",
      metadata: {
        explanation:
          "Adresatem kazań jest elita rządząca \u2013 to oni mają moc reformowania państwa. Skarga apeluje do nich jako do \u201eojców\u201d i \u201eopiekunów\u201d ludu.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Jakie zagrożenie zewnętrzne Skarga wskazuje jako najpoważniejsze dla Rzeczypospolitej w Kazaniu I?",
      content: {
        options: [
          "Najazd Szwedów od północy",
          "Moc turecka i szabla na głowy wasze następująca",
          "Ekspansja Francji na wschód",
          "Zagrożenie ze strony papiestwa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga ostrzega przed \u201eturecką mocą i szablą\u201d jako najgroźniejszym zagrożeniem zewnętrznym: \u201ebliskie i co rok bliższe tyrana tego sąsiedztwo we wrota już wasze pogląda\u201d. Wymienia też Tatarów jako \u201eprzyrodzonego nieprzyjaciela\u201d.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Co Skarga zarzuca szlachcie w Kazaniu VIII w kwestii zbytków i marnotrawstwa?",
      content: {
        options: [
          "Że za mało wydają na kościoły i obronę, a za dużo na jedwabie, wino, karety i uczty",
          "Że żyją zbyt skromnie i oszczędnie, nie wspierając handlu",
          "Że za dużo inwestują w zamki i fortyfikacje",
          "Że wysyłają pieniądze za granicę na studia synów",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Skarga szczegółowo wylicza zbytki: wino zamiast piwa, jedwabie zamiast samodziałów, złote karety zamiast siodeł, \u201epółmisków kiladziesiąt\u201d zamiast prostych potraw. A tymczasem \u201ezamki puste, wieże próżne\u201d i na obronę nie ma pieniędzy.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych przyczyn niezgody domowej wymienia Skarga w Kazaniu III?",
      content: {
        options: [
          "Herezje \u2013 różność wiar rozbija jedność",
          "Lekceważenie władzy królewskiej",
          "Chciwość, łakomstwo i pożądliwości świeckie",
          "Brak szkół i uniwersytetów",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Skarga wymienia: herezje jako \u201enaprzedniejszą przyczynę niezgód\u201d, lekceważenie króla (\u201egdyby swoję powagę miała, niezgodaby miejsca nie miała\u201d) oraz chciwość i łakomstwo (\u201eskąd wojny i swary, izali nie z pożądliwości waszych?\u201d). Brak szkół nie jest wymieniony.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Wymień trzy \u201edobre wolności\u201d i jedną \u201epiekielną\u201d, które rozróżnia Skarga w Kazaniu VI.",
      content: {
        hints: [
          "wolność od grzechu",
          "wolność od obcych panów",
          "wolność od tyranii",
          "wolność Beliala",
        ],
      },
      correctAnswer:
        "Trzy dobre wolności: 1) Wolność od grzechu i czarta \u2013 duchowa. 2) Wolność od obcych panów i pogańskich królów \u2013 polityczna. 3) Wolność od tyranii własnego króla \u2013 ustrój oparty na prawie. Czwarta, piekielna: wolność \u201esynów Beliala bez jarzma\u201d \u2013 swowolność, życie bez prawa, bez urzędu, z wolnością do grzechu, zabijania i wydzierania. Tej się Skarga \u201ejako szatańskiej zarzeka\u201d.",
      metadata: {
        explanation:
          "Podział na cztery wolności to kluczowy element myśli politycznej Skargi. Pokazuje, że nie jest wrogiem wolności jako takiej, ale jej nadużywania.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "W Kazaniu IV Skarga pisze: \u201eReligia i kapłaństwo fundamentem jest królestw\u201d. Jak uzasadnia tę tezę?",
      content: {
        options: [
          "Powołuje się na konstytucję Rzeczypospolitej, która wymaga katolickości króla",
          "Argumentuje historycznie: od Mojżesza przez Dawida do Konstantyna Wielkiego \u2013 wszystkie udane państwa budowano na fundamencie religii, a upadek wiary powodował upadek królestw",
          "Cytuje wyłącznie filozofów pogańskich, pomijając Biblię",
          "Odwołuje się do doświadczenia Reformacji, która wzmocniła państwa protestanckie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga buduje argument historyczny: Mojżesz łączył urząd kapłana i króla, Dawid i Salomon zaczynali panowanie od służby Bożej, Konstantyn Wielki osadził cesarstwo na chrześcijaństwie. Przykład negatywny: Węgry, które odeszły od katolickości i padły pod Turkami.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Skarga w Kazaniu V argumentuje, że herezje szkodzą obronności państwa. Jaki przykład historyczny podaje?",
      content: {
        options: [
          "Klęskę krzyżowców pod Warną w 1444 roku",
          "Zwycięstwa Węgrów z Kapistranem nad Turkami, gdy byli katolikami, i porażki po przejściu na herezję",
          "Podbój Konstantynopola przez muzułmanów w 1453 roku",
          "Zwycięstwo Hiszpanii nad Armadą angielską",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga przytacza przykład Węgier: \u201ePóki Węgrzy byli katolicy, z Kapistranem jednym wołanim imienia JEZUS samego cesarza tureckiego na głowę porazili\u201d. Po przejściu na herezje \u2013 przegrywają. Argument: herezja odbiera Boże błogosławieństwo wojenne.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych niesprawiedliwych praw Skarga krytykuje w Kazaniu VII?",
      content: {
        options: [
          "Prawo zakazujące egzekucji wyroków sądów duchownych (od 1563 r.)",
          "Konfederację Warszawską (1573 r.) gwarantującą wolność wyznaniową",
          "Prawo zakazujące poddanym opuszczania ziemi pana",
          "Prawo uniemożliwiające pojmanie mężobójcy bez wyroku sejmowego (nawet przez 30-40 lat)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Skarga atakuje: prawo z 1563 r. blokujące egzekucję sądów duchownych, Konfederację Warszawską (1573) jako \u201ejeszcze gorsze prawo\u201d chroniące herezję, oraz bezkarność mężobójców, których nie można pojmać latami. Prawo o pańszczyźnie nie jest wprost krytykowane jako \u201eniesprawiedliwe prawo\u201d \u2013 Skarga krytykuje sam ucisk chłopów.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Wyjaśnij, jak Skarga w Kazaniu VIII stylizuje się na proroków biblijnych. Podaj co najmniej dwóch proroków i ich \u201erekwizyty\u201d, które Skarga chciałby naśladować.",
      content: {},
      correctAnswer:
        "Skarga przywołuje czterech proroków: 1) Izajasz \u2013 chodziłby boso i na poły nagi, wołając o karę Bożą i upadek dostatków. 2) Jeremiasz \u2013 wziąłby pęta na nogi i okowy, ukazując przyszłą niewolę; rozbijał garnek gliniany, symbolizujący zniszczenie Rzeczypospolitej; płakał nad upadkiem narodu. 3) Ezechiel \u2013 ogoliłby głowę i brodę, dzieląc włosy na trzy części (głód, miecz, rozproszenie). 4) Jonasz \u2013 chodził po ulicach wołając: \u201eCzterdzieści dni, a Niniwe upadnie\u201d. Stylizacja ta nadaje Skardze autorytet proroka Bożego.",
      metadata: {
        explanation:
          "Kazanie VIII to kulminacja profetycznego tonu kazań. Skarga nie tylko cytuje proroków, ale utożsamia się z nimi, tworząc wizję zagłady Rzeczypospolitej na wzór zagłady Izraela.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (1) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "W Kazaniu VIII Skarga rozróżnia trzy rodzaje Bożych pogróżek wobec narodów. Które stwierdzenie poprawnie je opisuje?",
      content: {
        options: [
          "Wszystkie pogróżki są nieodwracalne \u2013 Bóg nigdy nie zmienia dekretów",
          "Pierwsze mogą być odwrócone pokutą, drugie spadają na potomstwo, trzecie są nieodwracalne (Bóg wie, że naród się nie nawróci)",
          "Pogróżki dotyczą wyłącznie jednostek, nie narodów",
          "Trzy rodzaje odpowiadają trzem osobom Trójcy Świętej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga wyróżnia: 1) pogróżki odwracalne pokutą (jak Niniwa), 2) pogróżki spadające na potomstwo (jak niewola babilońska \u2013 Ezechiasz prosił, by nie za jego dni), 3) pogróżki nieodwracalne, gdy Bóg wie, że naród się nie nawróci (jak Faraon, którego serce Bóg \u201ezatwardził\u201d). Skarga mówi słuchaczom, że nie wie, z którymi pogróżkami przychodzi do nich.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych argumentów za monarchią Skarga podaje w Kazaniu VI?",
      content: {
        options: [
          "Monarchia naśladuje rządy Boże \u2013 jeden Bóg rządzi światem, więc jeden król powinien rządzić państwem",
          "W ciele jest jedna głowa, w trzodzie jeden pasterz, w muzyce jeden dyrygent \u2013 analogicznie w państwie",
          "Monarchia jest tańsza niż demokracja, bo utrzymanie jednego króla kosztuje mniej niż wielu posłów",
          "Monarchie trwają dłużej niż inne ustroje \u2013 asyryjska 1400 lat, rzymska z cesarzami ponad 1000 lat",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Skarga argumentuje: analogia Boża (jeden Bóg = jeden król), analogia natury (głowa, pasterz, kantor), trwałość historyczna monarchii. Argument o tańszości nie pojawia się \u2013 Skarga argumentuje mądrością i porządkiem, nie ekonomią.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Skarga w Kazaniu VIII wylicza grzechy Rzeczypospolitej, które \u201eo pomstę wołają w niebo\u201d. Wymień co najmniej cztery z nich i wyjaśnij, który uważa za najcięższy.",
      content: {},
      correctAnswer:
        "Grzechy wołające o pomstę: 1) Bluźnierstwo przeciw Bogu w Trójcy (nowochrzczeńcy/arianie), 2) Łupiestwo kościołów i dóbr kościelnych, 3) Bezkarność mężobójców \u2013 niekarana krew niewinna, 4) Ucisk chłopów (\u201eabsolutum dominium\u201d szlachty nad poddanymi), 5) Lichwa, 6) Zbytki i marnotrawstwo, 7) Kradzież dóbr publicznych (peculatus). Za najcięższy Skarga uważa bluźnierstwo \u2013 bo godzi bezpośrednio w Boga i ściąga pomstę na całe królestwo, nie tylko na grzesznika.",
      metadata: {
        explanation:
          "Kazanie VIII to kulminacja moralistyczna dzieła. Skarga łączy grzechy indywidualne z losem państwa: grzechy obywateli sprowadzają Bożą karę na całą Rzeczpospolitą.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Retoryka i perswazja w \u201eKazaniach sejmowych\u201d \u2013 jak Skarga przekonuje słuchaczy?",
        requirements: [
          "Wymień co najmniej cztery chwyty retoryczne stosowane przez Skargę",
          "Podaj przykłady z konkretnych kazań",
          "Wyjaśnij, jakie emocje Skarga chce wzbudzić u odbiorców",
          "120-160 słów",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "Skarga stosuje bogaty arsenał retoryczny: 1) Apostrofy \u2013 bezpośrednie zwroty (\u201ePrzezacni Panowie!\u201d, \u201eBoże!\u201d, \u201eO namilsza matko!\u201d), budujące bliskość i emocjonalny nacisk. 2) Cytaty biblijne jako argumenty z autorytetu \u2013 Izajasz, Jeremiasz, Psalmy nadają kazaniom rangę Bożego posłannictwa. 3) Rozbudowane metafory (okręt, matka, ciało, muzyka) \u2013 obrazowe porównania przemawiają do wyobraźni szlacheckiego słuchacza. 4) Pytania retoryczne (\u201eJakoż głowa mocna być ma?\u201d) i wykrzyknienia wzmacniające dramatyzm. 5) Wyliczenia (sześć chorób, grzechy, zbytki) \u2013 budują wrażenie nagromadzenia zła. 6) Stylizacja na proroka w Kazaniu VIII. Skarga chce wzbudzić: strach przed upadkiem państwa, wstyd za grzechy, poczucie winy wobec ojczyzny-matki i nadzieję na pokutę.",
      metadata: {
        explanation:
          "Analiza retoryki to kluczowy aspekt maturalnej interpretacji kazań. Skarga jest mistrzem perswazji \u2013 łączy racjonalne argumenty z emocjonalnym apelem.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (1) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Skarga w Kazaniu VII pisze o krzywdzie chłopów: \u201eNiemasz państwa, w którymby barziej poddani i oracze uciśnieni byli pod tak absolutum dominium\u201d. Jak ocenić tę wypowiedź w kontekście całości poglądów Skargi?",
      content: {
        options: [
          "Skarga jest konsekwentnym obrońcą równości stanowej i domaga się zniesienia pańszczyzny",
          "Skarga dostrzega ucisk chłopów i wzywa do miłosierdzia, ale nie kwestionuje hierarchii stanowej \u2013 akceptuje nierówność, domagając się jedynie złagodzenia nadużyć",
          "Skarga całkowicie pomija problem chłopów w kazaniach, skupiając się wyłącznie na szlachcie",
          "Skarga uważa ucisk chłopów za sprawiedliwą karę Bożą za ich grzechy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Skarga jest współczujący, ale nie rewolucyjny. Dostrzega \u201eabsolutum dominium\u201d szlachty nad chłopami i wzywa do miłosierdzia (\u201epatrzcie, jako was noszą, żywią i ubogacają\u201d), ale nie postuluje równości stanów. W Kazaniu III mówi: \u201emusi być nierówność w Rzeczypospolitej\u201d. To konserwatywny humanitaryzm, nie egalitaryzm.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Które z poniższych porównań \u201eKazań sejmowych\u201d z innymi dziełami renesansowymi są uzasadnione merytorycznie?",
      content: {
        options: [
          "Zarówno Skarga, jak i Kochanowski w \u201eOdprawie posłów greckich\u201d ostrzegają, że prywata i niezgoda prowadzą do upadku państwa",
          "Skarga i Modrzewski w \u201eO poprawie Rzeczypospolitej\u201d diagnozują choroby państwa, ale Modrzewski jest bardziej tolerancyjny religijnie",
          "Skarga i Rej w \u201eŻywocie człowieka poczciwego\u201d stawiają identyczne postulaty polityczne i religijne",
          "Kazania Skargi i późniejsza literatura mesjanistyczna romantyków łączy ton prorocki i wizja upadku narodu jako kary Bożej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "\u201eOdprawa\u201d Kochanowskiego i Kazania Skargi łączy motyw upadku państwa z powodu prywaty. Modrzewski i Skarga diagnozują choroby, ale różnią się w kwestii tolerancji. Romantyczny mesjanizm (Mickiewicz) czerpie z profetycznego tonu Skargi. Rej w \u201eŻywocie\u201d opisuje idealny żywot szlachcica, nie stawia postulatów politycznych tożsamych ze Skargą.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question:
        "Skarga bywa oceniany jako prorok, patriota, ale też jako stronniczy kontrreformator i wróg wolności. Przedstaw obie interpretacje i sformułuj własną ocenę.",
      content: {},
      correctAnswer:
        "Za prorokiem i patriotą: Skarga trafnie zdiagnozował choroby, które doprowadziły do rozbiorów (prywata, swowolność, osłabienie króla, niezgoda). Jego miłość do ojczyzny-matki jest szczera i poruszająca. Bronił chłopów przed uciskiem. Matejko uwiecznił go jako proroka. Przeciw: Skarga był stronniczym kontrreformatorem \u2013 jego atak na tolerancję religijną (Konfederację Warszawską) jest sprzeczny z osiągnięciami polskiego renesansu. Postulował ograniczenie demokracji szlacheckiej na rzecz silnej monarchii wspieranej przez Kościół \u2013 co było programem politycznym Zygmunta III, nie obiektywną diagnozą. Moja ocena: Skarga był jednocześnie przenikliwym diagnostą i stronniczym ideologiem. Jego diagnozy polityczne okazały się trafne, ale recepty religijne (jedność katolicka jako panaceum) \u2013 uproszczone.",
      metadata: {
        explanation:
          "Pytanie wymaga krytycznej oceny postaci autora. Najlepsza odpowiedź unika zarówno hagiografii, jak i potępienia, dostrzegając złożoność.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "RENAISSANCE",
      work: "Kazania sejmowe",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Piotr Skarga",
          title: "Kazania sejmowe",
          text: "Ustawicznie się mury Rzeczypospolitej waszej rysują, a wy mówicie: Nic, nic, nierządem stoi Polska! Lecz gdy się nie spodziejecie, upadnie i was wszytkich potłucze!",
          bookReference: "Kazanie VIII",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Zinterpretuj metaforę \u201erysujących się murów\u201d i powiedzenie \u201enierządem stoi Polska\u201d. Jak Skarga polemizuje z tą postawą?",
            minWords: 50,
            maxPoints: 3,
          },
          {
            id: 2,
            instruction:
              "Oceń, czy ta polemika Skargi jest aktualna jako komentarz do polskiej mentalności politycznej. Odwołaj się do historii lub współczesności.",
            minWords: 40,
            maxPoints: 2,
          },
        ],
        requirements: [
          "Odwołaj się do kontekstu rozbiorów",
          "Uwzględnij proroczy charakter kazań",
          "Łącznie 120-170 słów",
        ],
        wordLimit: { min: 120, max: 170 },
      },
      correctAnswer:
        "1) \u201eRysujące się mury\u201d to metafora narastających pęknięć w strukturze państwa \u2013 niezgoda, swowolność, brak reform, zagrożenie tureckie. Powiedzenie \u201enierządem stoi Polska\u201d (Polonia confusione regitur) wyrażało przekonanie, że bezład jest naturalnym stanem Rzeczypospolitej i jakoś się uda przetrwać. Skarga demaskuje to jako groźne samozłudzenie: mury się rysują, a ludzie udają, że nic się nie dzieje. Gdy się nie spodzieją \u2013 mur runie na nich. 2) Historia potwierdziła Skargę: mentalność \u201ejakoś to będzie\u201d i opór wobec reform doprowadziły do rozbiorów w XVIII w. Powiedzenie to pozostaje aktualne jako komentarz do polskiej skłonności do bagatelizowania systemowych problemów \u2013 od zarządzania państwem po infrastrukturę. Skarga proroczo zdemaskował mechanizm, który powtarza się w każdej epoce.",
      metadata: {
        explanation:
          "To jeden z najczęściej cytowanych fragmentów polskiej literatury politycznej. Jego analiza wymaga umiejętności łączenia kontekstu historycznego z refleksją nad ponadczasowością przesłania.",
      },
    },

    // ======================= POCZĄTEK PYTAŃ Świętoszek ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Kto jest autorem komedii \u201e\u015awi\u0119toszek\u201d?",
      content: {
        options: [
          "William Szekspir",
          "Moli\u00e8r",
          "Pierre Corneille",
          "Jean Racine",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201e\u015awi\u0119toszek\u201d (Tartuffe) to komedia Moli\u00e8ra (w\u0142a\u015bciwie Jean-Baptiste Poquelin), wystawiona po raz pierwszy w 1664 roku w Pary\u017cu. Jest jednym z najwa\u017cniejszych dzie\u0142 francuskiego klasycyzmu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Jak nazywa si\u0119 g\u0142\u00f3wny bohater tytu\u0142owy komedii?",
      content: {
        options: ["Orgon", "Kleant", "Tartuffe", "Damis"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tytu\u0142owym \u015awi\u0119toszkiem jest Tartuffe \u2013 ob\u0142udnik udaj\u0105cy pobo\u017cnego cz\u0142owieka, kt\u00f3ry wkrada si\u0119 w zaufanie Orgona, w\u0142a\u015bciciela domu, i stopniowo przejmuje w\u0142adz\u0119 nad jego rodzin\u0105 i maj\u0105tkiem.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Gdzie rozgrywa si\u0119 akcja \u201e\u015awi\u0119toszka\u201d?",
      content: {
        options: [
          "W Londynie, w pa\u0142acu kr\u00f3lewskim",
          "W Pary\u017cu, w domu Orgona",
          "W Rzymie, w klasztorze",
          "Na prowincji francuskiej, w zamku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja rozgrywa si\u0119 w Pary\u017cu, w domu bogatego mieszczanina Orgona, w 1667 roku. Ca\u0142a komedia toczy si\u0119 w jednym miejscu (jedno\u015b\u0107 miejsca, zgodnie z zasad\u0105 trzech jedno\u015bci).",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Na ile akt\u00f3w podzielona jest komedia \u201e\u015awi\u0119toszek\u201d?",
      content: {
        options: ["Trzy", "Cztery", "Pi\u0119\u0107", "Sze\u015b\u0107"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Komedia sk\u0142ada si\u0119 z pi\u0119ciu akt\u00f3w, co jest zgodne z klasyczn\u0105 zasad\u0105 budowy dramatu. Ca\u0142o\u015b\u0107 napisana jest wierszem.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Kim jest Orgon w komedii?",
      content: {
        options: [
          "S\u0142ug\u0105 Tartuffe\u2019a",
          "Bogatym mieszczaninem, kt\u00f3ry za\u015blepiony jest Tartuffem",
          "Bratem Tartuffe\u2019a",
          "S\u0119dzi\u0105 kr\u00f3lewskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Orgon to bogaty mieszczanin paryski, m\u0105\u017c Elmiry, ojciec Damisa i Marianny. Jest za\u015blepiony Tartuffem, kt\u00f3rego uwa\u017ca za \u015bwi\u0119tego cz\u0142owieka i kt\u00f3remu oddaje maj\u0105tek, a nawet chce da\u0107 za \u017con\u0119 w\u0142asn\u0105 c\u00f3rk\u0119.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Jak ko\u0144czy si\u0119 komedia?",
      content: {
        options: [
          "Tartuffe zostaje zastrzelony przez Damisa",
          "Orgon traci maj\u0105tek i ucieka z rodzin\u0105",
          "Urz\u0119dnik kr\u00f3lewski aresztuje Tartuffe\u2019a, kt\u00f3ry okazuje si\u0119 poszukiwanym przest\u0119pc\u0105",
          "Tartuffe \u017ceni si\u0119 z Mariann\u0105 i przejmuje dom",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Komedia ko\u0144czy si\u0119 interwencj\u0105 kr\u00f3la (deus ex machina): urz\u0119dnik kr\u00f3lewski aresztuje Tartuffe\u2019a, kt\u00f3ry okazuje si\u0119 znanym \u0142otrem i przest\u0119pc\u0105. Kr\u00f3l uniewa\u017cnia darowizn\u0119 i przebacza Orgonowi.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Po\u0142\u0105cz postacie z ich rolami w komedii:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Tartuffe" },
          { id: "B", text: "Doryna" },
          { id: "C", text: "Elmira" },
          { id: "D", text: "Kleant" },
        ],
        rightColumn: [
          { id: "1", text: "\u017bona Orgona, sprytna i odwa\u017cna" },
          { id: "2", text: "Ob\u0142udnik udaj\u0105cy pobo\u017cnego" },
          { id: "3", text: "Szwagier Orgona, g\u0142os rozs\u0105dku" },
          { id: "4", text: "Garderobiana Marianny, rezolutna i dowcipna" },
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
          "Tartuffe to ob\u0142udnik i tytu\u0142owy \u015bwi\u0119toszek. Doryna to garderobiana Marianny \u2013 sprytna, dowcipna, przejrza\u0142a Tartuffe\u2019a od pocz\u0105tku. Elmira to \u017cona Orgona, kt\u00f3ra zastawia pu\u0142apk\u0119 na Tartuffe\u2019a. Kleant to szwagier Orgona, rezonator \u2013 g\u0142os zdrowego rozs\u0105dku.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re z poni\u017cszych postaci s\u0105 dzie\u0107mi Orgona?",
      content: {
        options: ["Damis", "Marianna", "Walery", "Flipote"],
      },
      correctAnswer: [0, 1],
      metadata: {
        explanation:
          "Damis (syn) i Marianna (c\u00f3rka) to dzieci Orgona. Walery to narzeczony Marianny, a Flipote to s\u0142u\u017c\u0105ca pani Pernelle.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re z poni\u017cszych stwiedze\u0144 o \u201e\u015awi\u0119toszku\u201d s\u0105 prawdziwe?",
      content: {
        options: [
          "Jest to komedia charakter\u00f3w, napisana wierszem",
          "Premiera wywo\u0142a\u0142a skandal i sztuka zosta\u0142a zakazana przez Ko\u015bci\u00f3\u0142",
          "Akcja rozgrywa si\u0119 w jednym dniu, w jednym miejscu (zasada trzech jedno\u015bci)",
          "Tartuffe pojawia si\u0119 na scenie ju\u017c w pierwszej scenie I aktu",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Komedia jest napisana wierszem, zachowuje zasad\u0119 trzech jedno\u015bci i wywo\u0142a\u0142a skandal \u2013 Ko\u015bci\u00f3\u0142 wymusi\u0142 zakaz wystawiania. Tartuffe NIE pojawia si\u0119 w I akcie \u2013 wchodzi na scen\u0119 dopiero w III akcie (scena II), co jest \u015bwiadomym zabiegiem Moli\u00e8ra.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Za kogo Orgon chce wyda\u0107 swoj\u0105 c\u00f3rk\u0119 Mariann\u0119 i kto jest jej prawdziwym narzeczonym?",
      content: {},
      correctAnswer:
        "Orgon chce wyda\u0107 Mariann\u0119 za Tartuffe\u2019a, \u0142ami\u0105c wcze\u015bniejsz\u0105 obietnic\u0119. Prawdziwym narzeczonym Marianny jest Walery, z kt\u00f3rym by\u0142a ju\u017c zar\u0119czona. Ten konflikt jest jednym z g\u0142\u00f3wnych w\u0105tk\u00f3w fabularnych komedii.",
      metadata: {
        explanation:
          "Zmuszanie c\u00f3rki do ma\u0142\u017ce\u0144stwa z cz\u0142owiekiem, kt\u00f3rego nie kocha, to typowy motyw komedii klasycznej. Moli\u00e8r u\u017cywa go, by pokaza\u0107, jak daleko si\u0119ga za\u015blepienie Orgona.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "S\u0142ynna scena dialogu Orgona z Doryn\u0105 po powrocie z podr\u00f3\u017cy (akt I, scena V) opiera si\u0119 na powtarzanym pytaniu \u201eA Tartuffe?\u201d i reakcji \u201eBiedny cz\u0142owiek!\u201d. Jaka jest funkcja tej sceny?",
      content: {
        options: [
          "Pokazuje trosk\u0119 Orgona o zdrowie \u017cony",
          "Demaskuje za\u015blepienie Orgona \u2013 bardziej martwi si\u0119 o Tartuffe\u2019a ni\u017c o chor\u0105 \u017con\u0119, kt\u00f3ra naprawd\u0119 potrzebuje pomocy",
          "Udowadnia, \u017ce Tartuffe jest naprawd\u0119 chory i potrzebuje opieki",
          "Pokazuje, \u017ce Doryna k\u0142amie o stanie zdrowia Elmiry",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena \u201eA Tartuffe? \u2013 Biedny cz\u0142owiek!\u201d jest arcydzie\u0142em komizmu sytuacyjnego. Doryna opisuje chorob\u0119 Elmiry, a Orgon za ka\u017cdym razem pyta tylko o Tartuffe\u2019a, kt\u00f3ry tymczasem objada si\u0119 i \u015bpi w najlepsze. Kontrast mi\u0119dzy cierpieniem \u017cony a \u017car\u0142oczno\u015bci\u0105 ob\u0142udnika, kt\u00f3rego Orgon nazywa \u201ebiednym cz\u0142owiekiem\u201d, jest komiczny i demaskuj\u0105cy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "W jaki spos\u00f3b Tartuffe zachowuje si\u0119 wobec Elmiry, gdy s\u0105 sam na sam (akt III, scena III)?",
      content: {
        options: [
          "Prosi j\u0105 o pieni\u0105dze na jemu\u017cn\u0119 dla ubogich",
          "Sk\u0142ada jej mi\u0142osne o\u015bwiadczenie, dotykaj\u0105c jej kolana i macaj\u0105c sukni\u0119",
          "Grozi jej, \u017ce powie Orgonowi o jej zdradzie",
          "Ignoruje j\u0105 i modli si\u0119 g\u0142o\u015bno",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tartuffe, zostawszy sam na sam z Elmir\u0105, sk\u0142ada jej mi\u0142osne o\u015bwiadczenie, macaj\u0105c jej sukni\u0119 i kolano. To kluczowa scena demaskuj\u0105ca hipokryzj\u0119 \u201epobo\u017cnego\u201d cz\u0142owieka, kt\u00f3ry po\u017c\u0105da \u017cony swojego dobroczy\u0144cy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Co robi Orgon, gdy Damis donosi mu o zalotach Tartuffe\u2019a do Elmiry?",
      content: {
        options: [
          "Wyp\u0119dza Tartuffe\u2019a z domu",
          "Wierzy synowi i \u017c\u0105da wyja\u015bnie\u0144 od Tartuffe\u2019a",
          "Nie wierzy synowi, wydziedzicza go i wyp\u0119dza z domu, a Tartuffowi zapisuje ca\u0142y maj\u0105tek",
          "Ka\u017ce \u017conie z\u0142o\u017cy\u0107 zeznania przed s\u0105dem",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Orgon, za\u015blepiony Tartuffem, nie wierzy w\u0142asnemu synowi. Wydziedzicza Damisa i wyp\u0119dza go z domu, a jednocze\u015bnie zapisuje ca\u0142y maj\u0105tek Tartuffowi \u2013 co jest kulminacj\u0105 jego naiwno\u015bci i jednocze\u015bnie punktem zwrotnym komedii.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Jak Elmira udowadnia Orgonowi ob\u0142ud\u0119 Tartuffe\u2019a w akcie IV?",
      content: {
        options: [
          "Prosi Tartuffe\u2019a o spowied\u017a przy kap\u0142anie",
          "Chowa Orgona pod sto\u0142em, a sama prowokuje Tartuffe\u2019a do mi\u0142osnych awans\u00f3w, kt\u00f3re m\u0105\u017c s\u0142yszy na w\u0142asne uszy",
          "Wynajmuje prywatnego detektywa, kt\u00f3ry \u015bledzi Tartuffe\u2019a",
          "Znajduje ukryte listy mi\u0142osne Tartuffe\u2019a",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To s\u0142ynna scena \u201epod sto\u0142em\u201d (akt IV, sceny IV\u2013VII). Elmira chowa Orgona pod sto\u0142em przykrytym dywanem i udaje, \u017ce ulega Tartuffowi. Tartuffe, nie wiedz\u0105c o obecno\u015bci Orgona, powtarza awanse. Orgon wreszcie widzi prawd\u0119 na w\u0142asne oczy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Czym Tartuffe grozi Orgonowi, gdy ten go wyp\u0119dza z domu?",
      content: {
        options: [
          "Grozi, \u017ce ode\u015ble rodzin\u0119 Orgona do wi\u0119zienia",
          "Oznajmia, \u017ce dom nale\u017cy do niego na mocy darowizny Orgona, i grozi szkatulk\u0105 z kompromituj\u0105cymi dokumentami",
          "Grozi kl\u0105tw\u0105 ko\u015bcieln\u0105",
          "Ucieka z pieni\u0119dzmi Orgona za granic\u0119",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tartuffe u\u017cywa broni, kt\u00f3r\u0105 sam Orgon mu da\u0142: darowizny ca\u0142ego maj\u0105tku (dom prawnie nale\u017cy do Tartuffe\u2019a) oraz szkatulki z kompromituj\u0105cymi dokumentami przyjaciela Orgona (Argasa). To pokazuje, jak niebezpieczna jest naiwno\u015b\u0107.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Uzupe\u0142nij zdania, wybieraj\u0105c poprawne opcje:",
      content: {
        textWithGaps:
          "Orgon pozna\u0142 Tartuffe\u2019a w (1). Tartuffe zyska\u0142 jego zaufanie, udaj\u0105c (2). Orgon nazywa Tartuffe\u2019a swoim (3) i kocha go bardziej ni\u017c rodzin\u0119.",
        gaps: [
          {
            id: 1,
            options: ["karczmie", "ko\u015bciele", "s\u0105dzie", "teatrze"],
          },
          {
            id: 2,
            options: [
              "lekarza",
              "pokornego, pobo\u017cnego \u017cebraka",
              "kupca",
              "so\u0142tysa",
            ],
          },
          {
            id: 3,
            options: ["panem", "bratem", "s\u0142ug\u0105", "nauczycielem"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Orgon pozna\u0142 Tartuffe\u2019a w ko\u015bciele, gdzie ten pad\u0142 na kolana obok niego i robi\u0142 wra\u017cenie g\u0142\u0119boko pobo\u017cnego \u017cebraka (bi\u0142 si\u0119 w piersi, ca\u0142owa\u0142 pod\u0142og\u0119). Orgon nazywa go \u201emoim bratem\u201d i kocha bardziej ni\u017c \u017con\u0119 i dzieci.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re postacie od pocz\u0105tku widz\u0105 ob\u0142ud\u0119 Tartuffe\u2019a i pr\u00f3buj\u0105 otworzy\u0107 oczy Orgonowi?",
      content: {
        options: [
          "Doryna \u2013 garderobiana, kt\u00f3ra otwarcie drwi z Tartuffe\u2019a",
          "Kleant \u2013 szwagier, kt\u00f3ry spokojnie argumentuje",
          "Pani Pernelle \u2013 matka Orgona",
          "Damis \u2013 syn Orgona, kt\u00f3ry chce zdemaskowa\u0107 ob\u0142udnika",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Doryna, Kleant i Damis od pocz\u0105tku widz\u0105 prawd\u0119 o Tartuffie. Pani Pernelle natomiast jest (obok Orgona) drug\u0105 osob\u0105 za\u015blepion\u0105 \u2013 broni Tartuffe\u2019a nawet wtedy, gdy Orgon ju\u017c przejrza\u0142 na oczy.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re cechy Tartuffe\u2019a wymieniaj\u0105 domownicy Orgona?",
      content: {
        options: [
          "\u017bar\u0142ok \u2013 zjada za dziesi\u0119ciu, pije wino na \u015bniadanie",
          "Hipokryta \u2013 udaje pobo\u017cno\u015b\u0107, a po\u017c\u0105da \u017cony Orgona",
          "Tyran \u2013 r\u0105dzi domem jak pan, chocia\u017c przyszed\u0142 jako \u017cebrak",
          "Uczony \u2013 cytuje z pami\u0119ci ca\u0142\u0105 Bibli\u0119",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Doryna opisuje Tartuffe\u2019a jako \u017car\u0142oka (potrawka ciel\u0119ca i dwie kuropatwy, cztery kieliszki wina na \u015bniadanie), hipokryt\u0119 i tyrana, kt\u00f3ry \u201epana udawa\u0107 zaczyna\u201d. Tartuffe nie jest uczonym \u2013 jego \u201enabożno\u015b\u0107\u201d to puste gesty, nie wiedza.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Jak Kleant w akcie I rozr\u00f3\u017cnia prawdziw\u0105 pobo\u017cno\u015b\u0107 od ob\u0142udy?",
      content: {},
      correctAnswer:
        "Kleant m\u00f3wi, \u017ce prawdziwie pobo\u017cni ludzie nie pysz\u0105 si\u0119 modlitw\u0105, nie szczycz\u0105 si\u0119 skruch\u0105, nawracaj\u0105 przyk\u0142adem, nie plotkami i intygami. Ob\u0142udnicy natomiast modl\u0105 si\u0119 na pokaz, by doj\u015b\u0107 do maj\u0105tku i god\u015bci, a pod pozorem pokory morduj\u0105 \u201epo\u015bwi\u0119canym \u017celazem\u201d. Kleant podaje przyk\u0142ady ludzi naprawd\u0119 uczciwych (Aryston, Peryander, Klitander) jako kontrast do Tartuffe\u2019a.",
      metadata: {
        explanation:
          "Monolog Kleanta w akcie I to kluczowy fragment \u2013 wyra\u017ca stanowisko Moli\u00e8ra: autor nie atakuje religii, lecz jej fa\u0142szowanie. Kleant pe\u0142ni rol\u0119 rezonatora \u2013 g\u0142osu autora na scenie.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Opisz, jak Tartuffe reaguje na oskar\u017cenia Damisa w akcie III, scena VI.",
      content: {},
      correctAnswer:
        "Tartuffe nie zaprzecza! Zamiast tego pokornieje, m\u00f3wi\u0105c: \u201eJam winny, jam jest grzesznik najni\u0107zemniejszy\u201d, \u201eKa\u017cda chwila w mym \u017cyciu to jest zbrodnia nowa\u201d. Prosi, by Orgon go ukara\u0142 i wyp\u0119dzi\u0142. Ta pozorna pokora jest mistrzowsk\u0105 manipulacj\u0105: Orgon, widz\u0105c t\u0119 \u201eskruch\u0119\u201d, utwierdza si\u0119 w przekonaniu, \u017ce Tartuffe jest \u015bwi\u0119ty, a Damis k\u0142amie.",
      metadata: {
        explanation:
          "To jedna z najbardziej diabolicznych scen komedii. Tartuffe u\u017cywa pozornej pokory jako broni \u2013 im bardziej si\u0119 samooskar\u017ca, tym bardziej Orgon go broni. Moli\u00e8r pokazuje, jak ob\u0142uda mo\u017ce obr\u00f3ci\u0107 prawd\u0119 w k\u0142amstwo.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Kim jest Doryna i jak\u0105 rol\u0119 pe\u0142ni w komedii?",
      content: {},
      correctAnswer:
        "Doryna to garderobiana (pok\u00f3j\u00f3wka) Marianny \u2013 s\u0142u\u017c\u0105ca, kt\u00f3ra jest najsprytniejsz\u0105 i najodwa\u017cniejsz\u0105 postaci\u0105 w domu. Od pocz\u0105tku przejrza\u0142a Tartuffe\u2019a, otwarcie z niego drwi, broni Marianny przed wymuszonym ma\u0142\u017ce\u0144stwem i godzi zak\u0142\u00f3conych Walerego z Mariann\u0105. Reprezentuje zdrowy rozs\u0105dek ludzi prostych, kt\u00f3rzy widz\u0105 prawd\u0119 szybciej ni\u017c ich panowie.",
      metadata: {
        explanation:
          "Doryna to typ sprytnej s\u0142u\u017c\u0105cej z tradycji komedii dell\u2019arte i antycznej. U Moli\u00e8ra s\u0142u\u017c\u0105cy cz\u0119sto s\u0105 m\u0105drzejsi od swoich pan\u00f3w \u2013 to krytyka klasowego przes\u0105du.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Moli\u00e8r celowo op\u00f3\u017cnia wej\u015bcie Tartuffe\u2019a na scen\u0119 a\u017c do III aktu. Jaka jest funkcja tego zabiegu?",
      content: {
        options: [
          "Moli\u00e8r nie potrafi\u0142 wcze\u015bniej umie\u015bci\u0107 tej postaci w fabule",
          "Przez dwa akty buduje oczekiwanie i portret Tartuffe\u2019a z cudzych relacji, dzi\u0119ki czemu widz wie, jak\u0105 mask\u0119 nosi ob\u0142udnik, zanim go zobaczy \u2013 a potem kontrast mi\u0119dzy opini\u0105 Orgona a prawd\u0105 jest komiczny",
          "Tartuffe jest postaci\u0105 drugoplanow\u0105 i nie potrzebuje du\u017co czasu scenicznego",
          "To b\u0142\u0105d kompozycyjny, kt\u00f3ry krytycy zarzucali Moli\u00e8rowi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To \u015bwiadomy zabieg dramaturgiczny. Przez dwa akty poznajemy Tartuffe\u2019a z dw\u00f3ch perspektyw: pochwa\u0142 Orgona i pani Pernelle oraz krytyki Doryny, Kleanta i Damisa. Gdy wreszcie pojawia si\u0119 na scenie (z chustk\u0105 do zakrycia piersi Doryny!), widz natychmiast widzi hipokryt\u0119.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Tartuffe, sk\u0142adaj\u0105c o\u015bwiadczenie Elmirze, m\u00f3wi: \u201eUczucie, co nam ka\u017ce wzdycha\u0107 do wieczno\u015bci, nie zabija w nas wcale docze\u015bnej mi\u0142o\u015bci\u201d. Jak\u0105 technik\u0119 manipulacji tu stosuje?",
      content: {
        options: [
          "Przest\u0119puje wprost do gwa\u0142townych zalot\u00f3w",
          "U\u017cywa j\u0119zyka teologicznego do uzasadnienia po\u017c\u0105dania \u2013 t\u0142umaczy, \u017ce mi\u0142o\u015b\u0107 do pi\u0119kna kobiety jest form\u0105 uwielbienia dzie\u0142a Bo\u017cego",
          "Grozi Elmirze kl\u0105tw\u0105 ko\u015bcieln\u0105, je\u015bli mu odm\u00f3wi",
          "Obiecuje jej pieni\u0105dze i bi\u017cuteri\u0119",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tartuffe mistrzowsko miesza j\u0119zyk religijny z erotycznym: pi\u0119kno Elmiry to \u201edzie\u0142o Stw\u00f3rcy\u201d, a kocha\u0107 j\u0105 to wielbi\u0107 Boga przez Jego stworzenie. To kwintesencja ob\u0142udy \u2013 u\u017cycie sacrum do przykrycia grzechu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "W akcie IV Tartuffe m\u00f3wi Elmirze: \u201eJest nauka, co w miar\u0119 potrzeb si\u0119 przemienia, by rozluzowa\u0107 w\u0119z\u0142y naszego sumienia\u201d. Do czego nawi\u0105zuje ta wypowied\u017a?",
      content: {
        options: [
          "Do filozofii Kartezjusza o wrodzonej moralno\u015bci",
          "Do kazuistyki \u2013 jezuickiej metody moralnej, kt\u00f3ra pozwala\u0142a \u201edopasowa\u0107\u201d zasady do sytuacji, krytykowanej przez przeciwnik\u00f3w jako ob\u0142uda",
          "Do protestanckiej nauki o \u0142asce",
          "Do antycznego epikureizmu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tartuffe nawi\u0105zuje do kazuistyki (nauki o przypadkach sumienia), kojarzonej z jezuitami i krytykowanej m.in. przez Pascala w \u201eProwincja\u0142kach\u201d. Moli\u00e8r u\u017cywa tego nawi\u0105zania, by pokaza\u0107, jak ob\u0142udnicy wykorzystuj\u0105 teologi\u0119 moraln\u0105 do usprawiedliwiania grzechu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Jakie rodzaje komizmu wyst\u0119puj\u0105 w \u201e\u015awi\u0119toszku\u201d? Kt\u00f3re zestawienie jest najprecyzyjniejsze?",
      content: {
        options: [
          "Tylko komizm sytuacyjny (farsa)",
          "Komizm sytuacyjny (np. Orgon pod sto\u0142em), komizm charakteru (za\u015blepienie Orgona, ob\u0142uda Tartuffe\u2019a) i komizm s\u0142owny (dialogi Doryny, scena \u201eA Tartuffe? \u2013 Biedny cz\u0142owiek!\u201d)",
          "Tylko komizm s\u0142owny i gry j\u0119zykowe",
          "Komizm tragiczny i groteska absurdalna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Moli\u00e8r \u0142\u0105czy trzy typy komizmu: sytuacyjny (Orgon pod sto\u0142em, Tartuffe z chustk\u0105), charakteru (przejaskrawione cechy Orgona i Tartuffe\u2019a) i s\u0142owny (powt\u00f3rzenia \u201eBiedny cz\u0142owiek!\u201d, riposty Doryny). To czyni \u201e\u015awi\u0119toszka\u201d jednocze\u015bnie fars\u0105 i g\u0142\u0119bok\u0105 satyr\u0105 obyczajow\u0105.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re cechy komedii klasycznej (zasada trzech jedno\u015bci) s\u0105 zachowane w \u201e\u015awi\u0119toszku\u201d?",
      content: {
        options: [
          "Jedno\u015b\u0107 miejsca \u2013 akcja toczy si\u0119 w domu Orgona",
          "Jedno\u015b\u0107 czasu \u2013 ca\u0142a akcja mie\u015bci si\u0119 w jednym dniu",
          "Jedno\u015b\u0107 akcji \u2013 g\u0142\u00f3wny w\u0105tek to demaskacja Tartuffe\u2019a",
          "Podzia\u0142 na pi\u0119\u0107 akt\u00f3w zgodny z klasyczn\u0105 poetyk\u0105",
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          "Moli\u00e8r skrupulatnie przestrzega zasad klasycyzmu: jedno\u015b\u0107 miejsca (dom Orgona), czasu (jeden dzie\u0144), akcji (demaskacja ob\u0142udnika) oraz pi\u0119\u0107 akt\u00f3w. \u201e\u015awi\u0119toszek\u201d jest wzorcow\u0105 komedi\u0105 klasyczn\u0105.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re z poni\u017cszych motyw\u00f3w literackich s\u0105 obecne w \u201e\u015awi\u0119toszku\u201d?",
      content: {
        options: [
          "Motyw ob\u0142udy religijnej i fa\u0142szywej pobo\u017cno\u015bci",
          "Motyw za\u015blepienia i \u0142atwierno\u015bci",
          "Motyw w\u0119dr\u00f3wki i poszukiwania sensu \u017cycia",
          "Motyw konfliktu mi\u0119dzy autorytetem ojca a pragnieniami dzieci",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "G\u0142\u00f3wne motywy to: ob\u0142uda religijna (Tartuffe), za\u015blepienie (Orgon, pani Pernelle) i konflikt rodzinny (Orgon zmusza c\u00f3rk\u0119 do ma\u0142\u017ce\u0144stwa z cz\u0142owiekiem, kt\u00f3rego nie kocha). Motyw w\u0119dr\u00f3wki nie wyst\u0119puje \u2013 akcja toczy si\u0119 w jednym domu.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re z poni\u017cszych stwierdze\u0144 o roli Kleanta s\u0105 prawdziwe?",
      content: {
        options: [
          "Pe\u0142ni funkcj\u0119 rezonatora \u2013 wyra\u017ca pogl\u0105dy autora na scenie",
          "Rozr\u00f3\u017cnia prawd\u0105 pobo\u017cno\u015b\u0107 od ob\u0142udy, podaj\u0105c przyk\u0142ady ludzi naprawd\u0119 zacnych",
          "Jest jedynym, kt\u00f3ry potrafi przekona\u0107 Orgona do wyp\u0119dzenia Tartuffe\u2019a",
          "Na ko\u0144cu radzi Orgonowi, by nie wpada\u0142 z jednej skrajno\u015bci w drug\u0105",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kleant to rezonator (g\u0142os autora): rozr\u00f3\u017cnia prawdziw\u0105 pobo\u017cno\u015b\u0107 od hipokryzji i na ko\u0144cu ostrzega Orgona przed wpadaniem ze skrajno\u015bci w skrajno\u015b\u0107 (\u201elepiej wierzy\u0107 w ludzi, ni\u017c nie wierzy\u0107 wcale\u201d). Nie jest natomiast tym, kt\u00f3ry przekonuje Orgona \u2013 to czyni Elmira scen\u0105 pod sto\u0142em.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Moli\u00e8r",
          title: "\u015awi\u0119toszek",
          text: "To jest cz\u0142owiek\u2026 kt\u00f3ry\u2026 ach\u2026 cz\u0142owiek\u2026 to jest cz\u0142owiek! Trzyma si\u0119 zasad, w kt\u00f3rych spok\u00f3j si\u0119 zamyka, I na \u015bwiat ca\u0142y patrzy jak gdyby z dymnika.",
          bookReference:
            "Akt I, scena VI \u2013 Orgon opisuje Tartuffe\u2019a Kleantowi",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Jak ten fragment charakteryzuje Orgona jako osob\u0119 opisuj\u0105c\u0105 Tartuffe\u2019a?",
            minWords: 15,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Jaki efekt komiczny tworzy to j\u0105kanie si\u0119 Orgona?",
            minWords: 15,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Orgon nie potrafi opisa\u0107 Tartuffe\u2019a \u2013 j\u0105ka si\u0119, powtarza \u201eto jest cz\u0142owiek\u201d, bo nie ma \u017cadnych konkret\u00f3w. Jego zachwyt jest irracjonalny, oparty na uczuciu, nie na faktach. 2) Efekt komiczny polega na kontra\u015bcie mi\u0119dzy gor\u0105cym entuzjazmem Orgona a pustk\u0105 jego argument\u00f3w. Widz wie ju\u017c z relacji Doryny, kim naprawd\u0119 jest Tartuffe (\u017car\u0142ok, hipokryta), wi\u0119c j\u0105kanie Orgona wywo\u0142uje \u015bmiech i lito\u015b\u0107.",
      metadata: {
        explanation:
          "Ten fragment to komizm s\u0142owny i charakteru jednocze\u015bnie. Orgon jest tak za\u015blepiony, \u017ce nie potrafi nawet sformu\u0142owa\u0107, co w Tartuffie go zachwyca \u2013 bo w rzeczywisto\u015bci nie ma czym.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Wyja\u015bnij, jak Tartuffe uzasadnia Elmirze, \u017ce ich romans nie b\u0119dzie grzechem (akt IV).",
      content: {},
      correctAnswer:
        "Tartuffe przedstawia dwa argumenty: 1) Kazuistyczny: istnieje \u201enauka, co w miar\u0119 potrzeb si\u0119 przemienia, by rozluzowa\u0107 w\u0119z\u0142y sumienia\u201d \u2013 czyli mo\u017cna dopasowa\u0107 moralno\u015b\u0107 do sytuacji. 2) Argument tajemnicy: \u201ez\u0142e jest wtedy tylko, kiedy \u015bwiat wie o nim; tylko zgorszenie za b\u0142\u0105d trzeba liczy\u0107 w \u017cyciu, a ten wcale nie grzeszy, kto grzeszy w ukryciu\u201d. To demaskuje ca\u0142\u0105 \u201emoralnost\u201d Tartuffe\u2019a: nie chodzi mu o dobro, lecz o pozory.",
      metadata: {
        explanation:
          "Te argumenty s\u0105 kluczowe dla zrozumienia krytyki Moli\u00e8ra: Tartuffe nie tylko \u0142amie zasady moralne, ale buduje ca\u0142\u0105 pseudo-teologi\u0119, kt\u00f3ra pozwala mu grzeszy\u0107 z czystym sumieniem.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Dlaczego premiera \u201e\u015awi\u0119toszka\u201d wywo\u0142a\u0142a skandal i sztuka zosta\u0142a zakazana?",
      content: {},
      correctAnswer:
        "Dostojnicy Ko\u015bcio\u0142a odczytali komedi\u0119 jako atak na religi\u0119 i pobo\u017cno\u015b\u0107 jako tak\u0105, nie tylko na ob\u0142ud\u0119. Oskar\u017cano Moli\u00e8ra o sprzyjanie libertynom i bezbo\u017cno\u015b\u0107. Kr\u00f3l Ludwik XIV zosta\u0142 zmuszony do wydania zakazu publicznego wystawiania sztuki, kt\u00f3ry cofni\u0119to dopiero pod koniec \u017cycia Moli\u00e8ra. W rzeczywisto\u015bci Moli\u00e8r atakowa\u0142 fa\u0142szyw\u0105 pobo\u017cno\u015b\u0107, nie religi\u0119 \u2013 co Kleant m\u00f3wi wprost.",
      metadata: {
        explanation:
          "Historia cenzury \u201e\u015awi\u0119toszka\u201d to wa\u017cny kontekst \u2013 pokazuje, jak niebezpieczna by\u0142a krytyka ob\u0142udy religijnej w XVII-wiecznej Francji.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "Mechanizm ob\u0142udy Tartuffe\u2019a \u2013 jak udaje pobo\u017cno\u015b\u0107 i jak j\u0105 wykorzystuje",
        requirements: [
          "Opisz metody, jakimi Tartuffe buduje wizerunek \u015bwi\u0119tego cz\u0142owieka",
          "Wska\u017c, jakie korzy\u015bci dzi\u0119ki temu osi\u0105ga",
          "Podaj przyk\u0142ady z komedii",
          "80-120 s\u0142\u00f3w",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Tartuffe buduje wizerunek pobo\u017cnego: modli si\u0119 ostentacyjnie w ko\u015bciele (bije si\u0119 w piersi, ca\u0142uje pod\u0142og\u0119), okazuje pozorn\u0105 pokor\u0119 (chce oddawa\u0107 po\u0142ow\u0119 jemu\u017cny), nosi dyscyplin\u0119 i w\u0142osiannic\u0119, \u017c\u0105da od Doryny zakrycia piersi chustk\u0105. Dzi\u0119ki temu: zdobywa zaufanie Orgona, kt\u00f3ry nazywa go \u201ebratem\u201d i \u201emistrza mi jego serce, g\u0142owa\u201d; otrzymuje maj\u0105tek (darowizna), szkatulk\u0119 z tajnymi dokumentami; r\u0105dzi domem jak tyran. Gdy zostaje przyparty, u\u017cywa pozornej pokory jako broni (scena z Damisem: \u201ejam winny, jam grzesznik\u201d).",
      metadata: {
        explanation:
          "Analiza mechanizmu ob\u0142udy to klucz do zrozumienia komedii. Moli\u00e8r pokazuje, \u017ce ob\u0142uda dzia\u0142a, bo ludzie chc\u0105 wierzy\u0107 \u2013 Orgon potrzebuje Tartuffe\u2019a jako duchowego przewodnika.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Moli\u00e8r m\u00f3wi przez usta Kleanta: \u201eR\u00f3\u017cnicy osoby od widma nie czujesz, a fa\u0142szywe pieni\u0105dze za dobre przyjmujesz?\u201d. Jakie uniwersalne przes\u0142anie zawiera ta metafora?",
      content: {
        options: [
          "Krytyk\u0119 systemu monetarnego XVII-wiecznej Francji",
          "Ludzie nie potrafi\u0105 rozr\u00f3\u017cni\u0107 prawdy od pozoru, autentyczno\u015bci od udawania \u2013 i ta niezdolno\u015b\u0107 jest g\u0142\u00f3wnym \u017ar\u00f3d\u0142em z\u0142a w \u015bwiecie",
          "Ka\u017cdy cz\u0142owiek jest hipokryt\u0105 i nie ma r\u00f3\u017cnicy mi\u0119dzy pozorem a prawd\u0105",
          "Tylko filozofowie potrafi\u0105 dostrzec r\u00f3\u017cnic\u0119 mi\u0119dzy prawd\u0105 a fa\u0142szem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Metafora fa\u0142szywych pieni\u0119dzy to klucz do komedii: Orgon nie potrafi odr\u00f3\u017cni\u0107 fa\u0142szywej pobo\u017cno\u015bci od prawdziwej, pozoru od rzeczywisto\u015bci. Moli\u00e8r czyni z tego uniwersalny problem: ludzie \u201enigdy s\u0142usznie oceni\u0107 nie mog\u0105\u201d, przekraczaj\u0105 granic\u0119 rozs\u0105dku i daj\u0105 si\u0119 \u0142owi\u0107 ob\u0142udnikom.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Zako\u0144czenie komedii (interwencja kr\u00f3la) jest przyk\u0142adem zabiegu \u201edeus ex machina\u201d. Jak oceni\u0107 ten zabieg w kontek\u015bcie ca\u0142o\u015bci dzie\u0142a?",
      content: {
        options: [
          "Jest to s\u0142aby punkt sztuki \u2013 Moli\u00e8r nie potrafi\u0142 rozwi\u0105za\u0107 w\u0119z\u0142a fabularnego w spos\u00f3b naturalny",
          "Jest to jednocze\u015bnie ho\u0142d dla Ludwika XIV (kt\u00f3ry chroni\u0142 Moli\u00e8ra) i pesymistyczny wniosek, \u017ce wobec ob\u0142udy dysponuj\u0105cej prawem i maj\u0105tkiem zwyk\u0142y cz\u0142owiek jest bezsilny \u2013 potrzeba interwencji wy\u017cszej w\u0142adzy",
          "Zako\u0144czenie to \u017cart \u2013 Moli\u00e8r celowo robi je absurdalnym",
          "Interwencja kr\u00f3la symbolizuje interwencj\u0119 Bo\u017c\u0105, jak w dramatach \u015bredniowiecznych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zako\u0144czenie pe\u0142ni podw\u00f3jn\u0105 funkcj\u0119: polityczn\u0105 (dzi\u0119kczynienie Ludwikowi XIV, kt\u00f3ry broni\u0142 Moli\u00e8ra przed Ko\u015bcio\u0142em) i artystyczn\u0105 (pokazanie, \u017ce ob\u0142uda uzbrojona w prawo i maj\u0105tek jest nie do pokonania zwyk\u0142ymi \u015brodkami \u2013 potrzeba interwencji w\u0142adzy).",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kleant na ko\u0144cu komedii m\u00f3wi Orgonowi: \u201eZ jednej ostateczno\u015bci zaraz wpadasz w drug\u0105\u201d. Co to zdanie m\u00f3wi o g\u0142\u00f3wnej wadzie Orgona?",
      content: {
        options: [
          "Orgon jest chory psychicznie i potrzebuje leczenia",
          "Orgon nie potrafi my\u015ble\u0107 umiarkowanie \u2013 przerzuca si\u0119 ze \u015blepego uwielbienia na \u015blep\u0105 nienawi\u015b\u0107, nie ucz\u0105c si\u0119 rozr\u00f3\u017cnia\u0107 pozor\u00f3w od prawdy",
          "Orgon jest po prostu g\u0142upi i nic si\u0119 na to nie poradzi",
          "Orgon potrzebuje silnego lidera, kt\u00f3ry powie mu, co my\u015ble\u0107",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kleant diagnozuje g\u0142\u00f3wn\u0105 wad\u0119 Orgona: brak umiaru i rozs\u0105dku. Wpierw \u015blepo wierzy\u0142 Tartuffowi, teraz chce nienawid\u0119\u0107 wszystkich pobo\u017cnych. Kleant radzi \u015bredni\u0105 drog\u0119 \u2013 \u201eumiej rozr\u00f3\u017cni\u0107 poz\u00f3r od prawdziwej cnoty\u201d. To klasycystyczny idea\u0142 \u201ez\u0142otego \u015brodka\u201d.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re z poni\u017cszych interpretacji postaci Orgona s\u0105 uzasadnione tre\u015bci\u0105 komedii?",
      content: {
        options: [
          "Orgon to ofiara ob\u0142udy \u2013 ale jednocze\u015bnie wsp\u00f3\u0142tw\u00f3rca w\u0142asnego nieszcz\u0119\u015bcia przez naiwno\u015b\u0107 i upor",
          "Orgon szuka w Tartuffie duchowego przewodnika, kt\u00f3ry da mu poczucie wy\u017cszo\u015bci moralnej nad otoczeniem",
          "Orgon jest niewinnym cz\u0142owiekiem, kt\u00f3rego Tartuffe zahipnotyzowa\u0142 nadprzyrodzon\u0105 moc\u0105",
          "Orgon jest tyranem rodzinnym \u2013 narzuca swoj\u0105 wol\u0119 dzieciom i \u017conie, nie licz\u0105c si\u0119 z ich uczuciami",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Orgon jest z\u0142o\u017con\u0105 postaci\u0105: ofiara ob\u0142udy (ale przez w\u0142asn\u0105 naiwno\u015b\u0107), cz\u0142owiek szukaj\u0105cy autorytetu duchowego (m\u00f3wi: \u201eon mnie uczy sk\u0142onno\u015bci nie mie\u0107 do niczego\u201d \u2013 chce by\u0107 jak Tartuffe oboj\u0119tny na \u015bwiat) i tyran rodzinny (wydziedzicza syna, zmusza c\u00f3rk\u0119 do ma\u0142\u017ce\u0144stwa). Nie jest zahipnotyzowany \u2013 jego za\u015blepienie jest dobrowolne.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re z poni\u017cszych funkcji pe\u0142ni w komedii posta\u0107 Doryny?",
      content: {
        options: [
          "G\u0142os zdrowego rozs\u0105dku ludzi prostych \u2013 widzi prawd\u0119, kt\u00f3rej nie widz\u0105 panowie",
          "Narz\u0119dzie komizmu s\u0142ownego \u2013 jej riposty i komentarze s\u0105 \u017ar\u00f3d\u0142em humoru",
          "Aktywna uczestniczka intrygi \u2013 godzi Walerego z Mariann\u0105, planuje strategi\u0119 oporu",
          "Postac tragiczna, kt\u00f3ra ginie za swoich pan\u00f3w",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Doryna pe\u0142ni trzy funkcje: zdroworozs\u0105dkowy komentator (widzi prawd\u0119 o Tartuffie od pocz\u0105tku), \u017ar\u00f3d\u0142o humoru (dialog z Orgonem o ma\u0142\u017ce\u0144stwie Marianny) i aktywna uczestniczka intrygi (godzi zak\u0142\u00f3conych, planuje strategi\u0119). Nie jest postaci\u0105 tragiczn\u0105 \u2013 to komedia.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Por\u00f3wnaj postawy Orgona i pani Pernelle wobec Tartuffe\u2019a. Co ich \u0142\u0105czy, a co dzieli?",
      content: {},
      correctAnswer:
        "\u0141\u0105czy ich: \u015blepe zaufanie do Tartuffe\u2019a i g\u0142uchota na argumenty rodziny. Oboje wierz\u0105, \u017ce Tartuffe jest \u015bwi\u0119tym cz\u0142owiekiem, a domownicy go prze\u015bladuj\u0105 z zazdro\u015bci. Dzieli ich: tempo przejrzenia na oczy. Orgon przejrza\u0142 po scenie pod sto\u0142em (akt IV), ale pani Pernelle nie wierzy nawet WTEDY \u2013 m\u00f3wi \u201ecz\u0119sto poz\u00f3r w\u0142a\u015bnie nas omami\u201d i potrzebuje dopiero wizyty wo\u017anego Loyala z nakazem eksmisji. Moli\u00e8r pokazuje, \u017ce za\u015blepienie jest \u201edziedziczne\u201d \u2013 matka jeszcze bardziej uparta ni\u017c syn.",
      metadata: {
        explanation:
          "Lustrzane odbicie Orgona w pani Pernelle to \u015bwiadomy zabieg Moli\u00e8ra: widz \u015bmieje si\u0119, gdy Orgon do\u015bwiadcza tego samego, co sam robi\u0142 rodzinie. \u201eJak\u0105 miar\u0105 kto mierzy\u0142, tak\u0105 mu odmierz\u0105\u201d \u2013 jak m\u00f3wi Doryna.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Przeczytaj fragment i napisz notatk\u0119 analityczn\u0105:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Moli\u00e8r",
          title: "\u015awi\u0119toszek",
          text: "Wszystko jedno, pobo\u017cno\u015b\u0107 szczera, czy ob\u0142uda, Jednakow\u0105 w poj\u0119ciu twym znajduj\u0105 \u0142ask\u0119, I jednakowo cenisz twarz cz\u0142eka i mask\u0119? Sztuka i szczero\u015b\u0107, jedno uczucie wyrodzi, A poz\u00f3r czy\u017c dla ciebie za prawd\u0119 uchodzi?",
          bookReference: "Akt I, scena V \u2013 Kleant do Orgona",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wyja\u015bnij, jaki zarzut Kleant stawia Orgonowi w tym fragmencie.",
            minWords: 25,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Jak ten fragment oddaje g\u0142\u00f3wne przes\u0142anie ca\u0142ej komedii?",
            minWords: 30,
            maxPoints: 2,
          },
        ],
      },
      correctAnswer:
        "1) Kleant zarzuca Orgonowi niezdolno\u015b\u0107 rozr\u00f3\u017cnienia prawdy od pozoru: traktuje jednakowo szczer\u0105 pobo\u017cno\u015b\u0107 i ob\u0142ud\u0119, twarz i mask\u0119, fa\u0142szywe pieni\u0105dze i prawdziwe. Orgon nie potrafi krytycznie oceni\u0107 tego, co widzi. 2) To przes\u0142anie ca\u0142ej komedii: Moli\u00e8r nie atakuje pobo\u017cno\u015bci, lecz niezdolno\u015b\u0107 ludzi do odr\u00f3\u017cnienia prawdy od fa\u0142szu. Problem nie w tym, \u017ce religia istnieje, lecz \u017ce ludzie \u2013 jak Orgon \u2013 przyjmuj\u0105 mask\u0119 za twarz, pozory za rzeczywisto\u015b\u0107, i daj\u0105 si\u0119 manipulowa\u0107 ob\u0142udnikom.",
      metadata: {
        explanation:
          "Ten fragment to serce przes\u0142ania Moli\u00e8ra. Metafora maski i twarzy, fa\u0142szywych i prawdziwych pieni\u0119dzy \u2013 to klucz interpretacyjny ca\u0142ego dzie\u0142a.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Dlaczego \u201e\u015awi\u0119toszek\u201d jest jednocze\u015bnie komedi\u0105 charakter\u00f3w i komedi\u0105 intrygi? Podaj argumenty za obiema klasyfikacjami.",
      content: {},
      correctAnswer:
        "Komedia charakter\u00f3w: g\u0142\u00f3wny komizm wynika z przejaskrawionych cech postaci \u2013 ob\u0142udy Tartuffe\u2019a i za\u015blepienia Orgona. Akcja wynika ze zderzenia charakter\u00f3w, nie z zewn\u0119trznej intrygi. Ka\u017cda posta\u0107 to \u201etyp\u201d (ob\u0142udnik, naiwny, rezonator, sprytna s\u0142u\u017c\u0105ca). Komedia intrygi: jest plan dzia\u0142ania \u2013 Doryna organizuje opor, Elmira zastawia pu\u0142apk\u0119 pod sto\u0142em, Walery przynosi wie\u015b\u0107 o aresztowaniu. Jest tak\u017ce w\u0105tek mi\u0142osny (Marianna\u2013Walery) typowy dla komedii intrygi. Moli\u00e8r \u0142\u0105czy oba typy, co czyni \u201e\u015awi\u0119toszka\u201d dzie\u0142em wyj\u0105tkowym.",
      metadata: {
        explanation:
          "Po\u0142\u0105czenie komedii charakter\u00f3w z intryg\u0105 to innowacja Moli\u00e8ra \u2013 czyni to \u201e\u015awi\u0119toszka\u201d jednocze\u015bnie satyr\u0105 moraln\u0105 i dobrze skonstruowan\u0105 sztuk\u0105 sceniczn\u0105.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "Obraz rodziny w \u201e\u015awi\u0119toszku\u201d \u2013 jak ob\u0142uda niszczy wi\u0119zi rodzinne",
        requirements: [
          "Opisz, jak zmienia si\u0119 dom Orgona po pojawieniu si\u0119 Tartuffe\u2019a",
          "Wska\u017c konsekwencje za\u015blepienia Orgona dla poszczeg\u00f3lnych cz\u0142onk\u00f3w rodziny",
          "Odwo\u0142aj si\u0119 do konkretnych scen",
          "120-160 s\u0142\u00f3w",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "Dom Orgona przed Tartuffem by\u0142 szcz\u0119\u015bliwym domem zamo\u017cnego mieszczanina. Po przyj\u0119ciu ob\u0142udnika: Orgon zaniedba\u0142 \u017con\u0119 (nie pyta o jej chorob\u0119, tylko o Tartuffe\u2019a), wydziedziczy\u0142 i wyp\u0119dzi\u0142 syna Damisa, zmusza c\u00f3rk\u0119 Mariann\u0119 do ma\u0142\u017ce\u0144stwa z cz\u0142owiekiem, kt\u00f3rego nienawidzi, oddaje ca\u0142y maj\u0105tek obcemu, powierza tajne dokumenty przest\u0119pcy. Tartuffe dzieli rodzin\u0119: jedni widz\u0105 prawd\u0119 (Elmira, Damis, Kleant, Doryna), inni s\u0105 za\u015blepieni (Orgon, pani Pernelle). Ob\u0142uda niszczy zaufanie, mi\u0142o\u015b\u0107 i solidarno\u015b\u0107 rodzinn\u0105 \u2013 Orgon traktuje w\u0142asne dzieci gorzej ni\u017c obcego cz\u0142owieka.",
      metadata: {
        explanation:
          "Motyw rodziny jest kluczowy \u2013 Moli\u00e8r pokazuje, \u017ce ob\u0142uda niszczy nie tylko jednostk\u0119, ale ca\u0142\u0105 struktur\u0119 spo\u0142eczn\u0105, poczynaj\u0105c od rodziny.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "Rola kobiet w \u201e\u015awi\u0119toszku\u201d \u2013 Elmira i Doryna wobec ob\u0142udy",
        requirements: [
          "Scharakteryzuj postawy Elmiry i Doryny wobec Tartuffe\u2019a",
          "Por\u00f3wnaj ich metody walki z ob\u0142ud\u0105",
          "Oce\u0144, kt\u00f3ra z nich odgrywa wi\u0119ksz\u0105 rol\u0119 w demaskacji",
          "100-140 s\u0142\u00f3w",
        ],
        wordLimit: { min: 100, max: 140 },
      },
      correctAnswer:
        "Elmira i Doryna to najsilniejsze postacie kobiece komedii. Doryna od pocz\u0105tku drwi z Tartuffe\u2019a otwarcie, u\u017cywa dowcipu i ironii (\u201ebiedny cz\u0142owiek!\u201d), broni Marianny przed wymuszonym \u015blubem, organizuje strategi\u0119 oporu. Elmira dzia\u0142a subtelniej: wykorzystuje afekt Tartuffe\u2019a do siebie, zastawiaj\u0105c pu\u0142apk\u0119 pod sto\u0142em \u2013 ryzykuje w\u0142asnym honorem, by otworzy\u0107 oczy m\u0119\u017cowi. Doryna walczy s\u0142owem (komizm s\u0142owny), Elmira \u2013 dzia\u0142aniem (komizm sytuacyjny). Wi\u0119ksz\u0105 rol\u0119 w ostatecznej demaskacji odgrywa Elmira (scena pod sto\u0142em jest prze\u0142omowa), ale Doryna jest motorem codziennego oporu i organizatork\u0105 intrygi.",
      metadata: {
        explanation:
          "Kobiety w \u201e\u015awi\u0119toszku\u201d s\u0105 m\u0105drzejsze i odwa\u017cniejsze od m\u0119\u017cczyzn \u2013 to wa\u017cny element krytyki spo\u0142ecznej Moli\u00e8ra.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Ob\u0142uda jako zagro\u017cenie spo\u0142eczne. Om\u00f3w zagadnienie na podstawie \u201e\u015awi\u0119toszka\u201d Moli\u00e8ra. W swojej odpowiedzi uwzgl\u0119dnij r\u00f3wnie\u017c wybrany kontekst.",
      content: {
        thesis:
          "Ob\u0142uda Tartuffe\u2019a \u2013 zagro\u017cenie dla rodziny i spo\u0142ecze\u0144stwa",
        structure: {
          introduction:
            "Przedstaw tez\u0119: Moli\u00e8r pokazuje, \u017ce ob\u0142uda religijna jest niebezpieczna nie tylko moralnie, ale spo\u0142ecznie",
          arguments_for:
            "Om\u00f3w: mechanizm ob\u0142udy (jak Tartuffe buduje wizerunek), konsekwencje (rozpad rodziny, utrata maj\u0105tku), uniwersalno\u015b\u0107 (ob\u0142uda w ka\u017cdej epoce)",
          arguments_against:
            "Rozwa\u017c: czy Moli\u00e8r nie przesadza z naiwno\u015bci\u0105 Orgona? Czy problem le\u017cy w ob\u0142udniku, czy w \u0142atwowiernym?",
          conclusion:
            "Wniosek: ob\u0142uda jest skuteczna, bo ludzie chc\u0105 wierzy\u0107; odwo\u0142aj si\u0119 do kontekstu",
        },
        requirements: [
          "Minimum 300 s\u0142\u00f3w",
          "Odwo\u0142anie do co najmniej trzech scen z komedii",
          "Kontekst literacki (np. \u201eDziady\u201d III cz., \u201eKazania sejmowe\u201d Skargi, wsp\u00f3\u0142czesno\u015b\u0107)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Om\u00f3wi\u0107 mechanizm ob\u0142udy Tartuffe\u2019a (modlitwa na pokaz, pozorna pokora, u\u017cycie j\u0119zyka religijnego). 2) Pokaza\u0107 konsekwencje: rozpad rodziny, utrata maj\u0105tku, wyp\u0119dzenie syna, gro\u017aba wi\u0119zienia. 3) Rozwa\u017cy\u0107 rol\u0119 ofiary: Orgon jest wsp\u00f3\u0142tw\u00f3rc\u0105 w\u0142asnego nieszcz\u0119\u015bcia. 4) Por\u00f3wna\u0107 z kontekstem (np. faryzeizm w Biblii, ob\u0142uda polityczna we wsp\u00f3\u0142czesno\u015bci, dewocja krytykowana przez Skarg\u0119).",
      metadata: {
        explanation:
          "Temat ob\u0142udy jest uniwersalny i pozwala na bogate odwo\u0142ania mi\u0119dzytekstowe. Kluczowe jest pokazanie, \u017ce Moli\u00e8r krytykuje nie religi\u0119, lecz jej fa\u0142szowanie.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "\u201e\u015awi\u0119toszek\u201d to komedia klasyczna. Kt\u00f3re zestawienie cech gatunkowych najdok\u0142adniej opisuje utw\u00f3r?",
      content: {
        options: [
          "Komedia dell\u2019arte oparta na improwizacji, z typowymi maskami",
          "Komedia charakter\u00f3w (przejaskrawione cechy Tartuffe\u2019a i Orgona) po\u0142\u0105czona z komedi\u0105 intrygi (plan Elmiry), z elementami farsy i satyry spo\u0142ecznej, zachowuj\u0105ca zasad\u0119 trzech jedno\u015bci i podzia\u0142 na pi\u0119\u0107 akt\u00f3w",
          "Tragedia klasyczna z elementami komicznymi, w stylu Racine\u2019a",
          "Dramat romantyczny, \u0142ami\u0105cy zasady klasyczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201e\u015awi\u0119toszek\u201d \u0142\u0105czy komedi\u0119 charakter\u00f3w (typy: ob\u0142udnik, naiwny, rezonator) z komedi\u0105 intrygi (pu\u0142apka Elmiry) i elementami farsy (Orgon pod sto\u0142em). Zachowuje zasad\u0119 trzech jedno\u015bci (czas, miejsce, akcja) i 5 akt\u00f3w. Jest te\u017c satyr\u0105 spo\u0142eczn\u0105 na ob\u0142ud\u0119 religijn\u0105.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Moli\u00e8r przez usta Kleanta wyra\u017ca stanowisko: \u201eMiej wstr\u0119t do grzechu, lecz nie do grzesznika\u201d. Jak to stanowisko wpisuje si\u0119 w sp\u00f3r o religi\u0119 we Francji XVII wieku?",
      content: {
        options: [
          "Moli\u00e8r by\u0142 ateist\u0105 i chcia\u0142 zniszczy\u0107 Ko\u015bci\u00f3\u0142",
          "Moli\u00e8r broni\u0142 religii przed ob\u0142udnikami, kt\u00f3rzy j\u0105 kompromituj\u0105, wpisuj\u0105c si\u0119 w nurt krytyki fa\u0142szywej pobo\u017cno\u015bci (obok Pascala), ale nie kwestionuj\u0105c wiary jako takiej",
          "Moli\u00e8r popiera\u0142 protestantyzm przeciwko katolickiej Francji",
          "Moli\u00e8r by\u0142 oboj\u0119tny wobec religii i pisa\u0142 wy\u0142\u0105cznie dla rozrywki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Moli\u00e8r, podobnie jak Pascal (\u201eProwincja\u0142ki\u201d), krytykuje fa\u0142szyw\u0105 pobo\u017cno\u015b\u0107, nie religi\u0119. Kleant podaje przyk\u0142ady ludzi naprawd\u0119 pobo\u017cnych, odr\u00f3\u017cniaj\u0105c ich od ob\u0142udnik\u00f3w. Stanowisko Moli\u00e8ra: religia jest dobra, ale ludzie j\u0105 fa\u0142szuj\u0105 \u2013 i to nale\u017cy pi\u0119tnowa\u0107.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Kt\u00f3re z poni\u017cszych por\u00f3wna\u0144 \u201e\u015awi\u0119toszka\u201d z innymi dzie\u0142ami s\u0105 uzasadnione merytorycznie?",
      content: {
        options: [
          "Tartuffe i Przechrzta z \u201eNie-Boskiej komedii\u201d Krasi\u0144skiego \u2013 obaj pos\u0142uguj\u0105 si\u0119 mask\u0105 ideologii do realizacji w\u0142asnych cel\u00f3w",
          "Orgon i Makbet Szekspira \u2013 obaj s\u0105 manipulowani przez innych, chocia\u017c w r\u00f3\u017cnych gatunkach (komedia vs. tragedia)",
          "Krytyka ob\u0142udy u Moli\u00e8ra i krytyka dewocji u Skargi w \u201eKazaniach sejmowych\u201d \u2013 obaj atakuj\u0105 fa\u0142szyw\u0105 pobo\u017cno\u015b\u0107, cho\u0107 z r\u00f3\u017cnych pozycji",
          "\u201e\u015awi\u0119toszek\u201d i \u201eOdprawa pos\u0142\u00f3w greckich\u201d Kochanowskiego \u2013 oba utwory s\u0105 komediami charakter\u00f3w",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Tartuffe i Przechrzta \u2013 obaj manipulanci u\u017cywaj\u0105cy ideologii. Orgon i Makbet \u2013 obaj manipulowani (Tartuffe / Lady Makbet), cho\u0107 w r\u00f3\u017cnych gatunkach. Moli\u00e8r i Skarga \u2013 obaj krytykuj\u0105 fa\u0142szyw\u0105 pobo\u017cno\u015b\u0107 (cho\u0107 Skarga z pozycji kontrreformacji, Moli\u00e8r \u2013 rozumu). \u201eOdprawa\u201d to tragedia, nie komedia charakter\u00f3w.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Czy \u201e\u015awi\u0119toszek\u201d jest krytyk\u0105 religii, czy krytyk\u0105 ob\u0142udy? Przedstaw argumenty obu stron i sformu\u0142uj w\u0142asn\u0105 ocen\u0119.",
      content: {},
      correctAnswer:
        "Za krytyk\u0105 religii: Ko\u015bci\u00f3\u0142 odczyta\u0142 sztuk\u0119 jako atak na pobo\u017cno\u015b\u0107; Tartuffe u\u017cywa j\u0119zyka teologicznego do uzasadnienia grzechu; kazuistyka (jezuicka metoda moralna) jest o\u015bmieszona; widzowie \u015bmiej\u0105 si\u0119 z modlitwy i skruchy. Za krytyk\u0105 ob\u0142udy: Kleant wprost rozr\u00f3\u017cnia prawdziw\u0105 pobo\u017cno\u015b\u0107 od fa\u0142szywej; podaje przyk\u0142ady ludzi naprawd\u0119 zacnych; m\u00f3wi \u201emiej wstr\u0119t do grzechu, lecz nie do grzesznika\u201d; Moli\u00e8r atakuje masker, nie twarz. Moja ocena: Moli\u00e8r krytykuje ob\u0142ud\u0119, nie religi\u0119. Ale pokazuje, \u017ce ob\u0142uda jest szczeg\u00f3lnie niebezpieczna W\u0141A\u015aNIE dlatego, \u017ce u\u017cywa religii jako broni \u2013 a ludzie nie potrafi\u0105 odr\u00f3\u017cni\u0107 maski od twarzy.",
      metadata: {
        explanation:
          "To pytanie wymaga krytycznej analizy i umiej\u0119tno\u015bci obrony w\u0142asnego stanowiska. Najlepsza odpowied\u017a unika jednoznaczno\u015bci i widzi z\u0142o\u017cono\u015b\u0107 problemu.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Dlaczego \u201e\u015awi\u0119toszek\u201d pozostaje aktualny? Wska\u017c, jakie wsp\u00f3\u0142czesne zjawiska odpowiadaj\u0105 ob\u0142udzie Tartuffe\u2019a.",
      content: {},
      correctAnswer:
        "\u201e\u015awi\u0119toszek\u201d pozostaje aktualny, bo mechanizm ob\u0142udy jest ponadczasowy: 1) Ob\u0142uda polityczna \u2013 politycy u\u017cywaj\u0105cy patriotyzmu, religii lub ideologii jako maski dla prywatnych interes\u00f3w. 2) Manipulacja medialna \u2013 kreowanie wizerunku \u201ezacnego cz\u0142owieka\u201d w mediach spo\u0142eczno\u015bciowych, za kt\u00f3rym kryje si\u0119 chciwo\u015b\u0107 lub przemoc. 3) Sekty i guru \u2013 duchowi przewodnicy, kt\u00f3rzy jak Tartuffe zyskuj\u0105 w\u0142adz\u0119 nad \u0142atwowiernymi. 4) \u0141atwierno\u015b\u0107 spo\u0142eczna \u2013 ludzie nadal, jak Orgon, wol\u0105 wierzy\u0107 w proste odpowiedzi ni\u017c krytycznie my\u015ble\u0107. Uniwersalno\u015b\u0107 komedii polega na tym, \u017ce nie zestarzej\u0105 si\u0119 ani ob\u0142udnicy, ani naiwni.",
      metadata: {
        explanation:
          "Pytanie o aktualno\u015b\u0107 wymaga umiej\u0119tno\u015bci przeniesienia problematyki XVII-wiecznej komedii na wsp\u00f3\u0142czesne realia.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question: "Przeczytaj fragment i napisz notatk\u0119 analityczn\u0105:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Moli\u00e8r",
          title: "\u015awi\u0119toszek",
          text: "Z jednej ostateczno\u015bci zaraz wpadasz w drug\u0105. \u2026 Za to, \u017ce jeden oszust nikczemnie ci\u0119 zmami, To ju\u017c wszyscy pobo\u017cni maj\u0105 by\u0107 \u0142otrami? \u2026 Umiej rozr\u00f3\u017cni\u0107 poz\u00f3r od prawdziwej cnoty \u2026 A je\u015bli w ostateczno\u015b\u0107 masz ju\u017c wpada\u0107 stale, To lepiej wierzy\u0107 w ludzi, ni\u017c nie wierzy\u0107 wcale.",
          bookReference: "Akt V, scena I \u2013 Kleant do Orgona",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wyja\u015bnij, jaki b\u0142\u0105d my\u015blenia Orgona Kleant tu diagnozuje i jak to si\u0119 wi\u0105\u017ce z ca\u0142\u0105 sztuk\u0105.",
            minWords: 50,
            maxPoints: 3,
          },
          {
            id: 2,
            instruction:
              "Jak zdanie \u201elepiej wierzy\u0107 w ludzi, ni\u017c nie wierzy\u0107 wcale\u201d wyra\u017ca klasycystyczny idea\u0142 umiaru?",
            minWords: 40,
            maxPoints: 2,
          },
        ],
        requirements: [
          "Odwo\u0142aj si\u0119 do zasady \u201ez\u0142otego \u015brodka\u201d",
          "Uwzgl\u0119dnij kontekst klasycyzmu francuskiego",
          "\u0141\u0105cznie 120-170 s\u0142\u00f3w",
        ],
        wordLimit: { min: 120, max: 170 },
      },
      correctAnswer:
        "1) Kleant diagnozuje brak umiaru: Orgon przerzuca si\u0119 ze \u015blepego zaufania (\u201ewszystkich czcze\u201d) na \u015blep\u0105 nieufno\u015b\u0107 (\u201ewszyscy pobo\u017cni to \u0142otry\u201d). Ten b\u0142\u0105d towarzyszy\u0142 mu przez ca\u0142\u0105 sztuk\u0119: nie potrafi\u0142 odr\u00f3\u017cni\u0107 maski od twarzy, pozoru od prawdy. Zamiast nauczy\u0107 si\u0119 krytycznego my\u015blenia, po prostu zmienia obiekt skrajno\u015bci. 2) Zdanie \u201elepiej wierzy\u0107 w ludzi, ni\u017c nie wierzy\u0107 wcale\u201d wyra\u017ca klasycystyczny idea\u0142 \u201ez\u0142otego \u015brodka\u201d (juste milieu): rozum, umiar, r\u00f3wnowaga mi\u0119dzy skrajno\u015bciami. Klasycyzm francuski (Moli\u00e8r, Racine, La Fontaine) ceni\u0142 harmoni\u0119, rozs\u0105dek i zdrowy os\u0105d. Kleant jest wcieleniem tego idea\u0142u \u2013 dlatego pe\u0142ni rol\u0119 rezonatora.",
      metadata: {
        explanation:
          "Ten fragment to serce filozofii moralnej \u201e\u015awi\u0119toszka\u201d i klasycyzmu francuskiego: rozum jako \u015brodek mi\u0119dzy skrajno\u015bciami.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "BAROQUE",
      work: "\u015awi\u0119toszek",
      question:
        "Czy Orgon jest ofiar\u0105 Tartuffe\u2019a, czy wsp\u00f3\u0142tw\u00f3rc\u0105 w\u0142asnego nieszcz\u0119\u015bcia? Napisz rozprawk\u0119, rozwa\u017caj\u0105c obie interpretacje.",
      content: {
        thesis:
          "Orgon \u2013 ofiara ob\u0142udy czy naiwny wsp\u00f3\u0142sprawca?",
        structure: {
          introduction:
            "Zarysuj problem: Orgon jest jednocze\u015bnie oszukany i oszukuj\u0105cy si\u0119 sam",
          arguments_for:
            "Argumenty za ofiar\u0105: Tartuffe jest mistrzem manipulacji, u\u017cywa wyrafinowanych technik (pozorna pokora, j\u0119zyk religijny), \u017cadna posta\u0107 poza Elmir\u0105 nie potrafi go zdemaskowa\u0107",
          arguments_against:
            "Argumenty za wsp\u00f3\u0142sprawstwem: Orgon ignoruje ostrzeenia ca\u0142ej rodziny, wydziedzia syna, oddaje maj\u0105tek, sam szuka kogokolwiek, kto da mu poczucie wy\u017cszo\u015bci moralnej",
          conclusion:
            "Sformu\u0142uj stanowisko: np. Orgon jest ofiar\u0105, ale tak\u017ce wsp\u00f3\u0142tw\u00f3rc\u0105 \u2013 bo ob\u0142uda dzia\u0142a tylko tam, gdzie jest gotowo\u015b\u0107 do bycia oszukanym. Odwo\u0142aj si\u0119 do kontekstu",
        },
        requirements: [
          "Minimum 400 s\u0142\u00f3w",
          "Odwo\u0142anie do co najmniej czterech scen z komedii",
          "Kontekst literacki (np. Makbet, \u201eLalka\u201d, wsp\u00f3\u0142czesno\u015b\u0107)",
          "Poprawna argumentacja",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Pokaza\u0107 Tartuffe\u2019a jako mistrza manipulacji (scena w ko\u015bciele, pozorna pokora przy Damisie, j\u0119zyk teologiczny w o\u015bwiadczeniu). 2) Pokaza\u0107 Orgona jako aktywnego wsp\u00f3\u0142tw\u00f3rc\u0119 (ignoruje rodzin\u0119, wydziedzicza syna, sam oddaje maj\u0105tek i szkatulk\u0119). 3) Doj\u015b\u0107 do wniosku: ob\u0142uda jest relacj\u0105 dw\u00f3jki \u2013 potrzebuje i manipulatora, i ch\u0119tnej ofiary. 4) Por\u00f3wna\u0107 z kontekstem (np. Lady Makbet manipuluje Makbetem, ale on sam ma ambicj\u0119; Wokulski daje si\u0119 wykorzysta\u0107 z w\u0142asnej nadziei).",
      metadata: {
        explanation:
          "To pytanie wymaga dojrza\u0142ej analizy z\u0142o\u017conego zwi\u0105zku mi\u0119dzy manipulatorem a ofiar\u0105. Najlepsza odpowied\u017a unika prostej dychotomii.",
      },
    },

    // ======================= KONIEC PYTA\u0143 \u015awi\u0119toszek ===================//

    // ======================= POCZĄTEK PYTAŃ Skąpiec ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Kto jest autorem komedii \u201eSk\u0105piec\u201d?",
      content: {
        options: [
          "William Szekspir",
          "Moli\u00e8r",
          "Pierre Corneille",
          "Carlo Goldoni",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201eSk\u0105piec\u201d (L\u2019Avare) to komedia Moli\u00e8ra (Jean-Baptiste Poquelin), wystawiona po raz pierwszy 9 wrze\u015bnia 1668 roku w Palais-Royal w Pary\u017cu. Sam Moli\u00e8r zagra\u0142 w premierze rol\u0119 Harpagona.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Jak nazywa si\u0119 tytu\u0142owy sk\u0105piec?",
      content: {
        options: ["Tartuffe", "Kleant", "Harpagon", "Anzelm"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Tytu\u0142owym sk\u0105pcem jest Harpagon \u2013 oko\u0142o sze\u015b\u0107dziesi\u0119cioletni, zamo\u017cny mieszczanin paryski, wdowiec, ojciec Elizy i Kleanta. Jego imi\u0119 pochodzi od \u0142aci\u0144skiego \u201eharpago\u201d \u2013 hak do chwytania, co symbolizuje chciwo\u015b\u0107.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Gdzie rozgrywa si\u0119 akcja \u201eSk\u0105pca\u201d?",
      content: {
        options: [
          "W Londynie, w banku",
          "W Pary\u017cu, w domu Harpagona",
          "W Neapolu, na statku",
          "Na prowincji francuskiej, w oberżyj",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja rozgrywa si\u0119 w Pary\u017cu, w domu Harpagona, w drugiej po\u0142owie XVII wieku. Ca\u0142a komedia zachowuje zasad\u0119 trzech jedno\u015bci \u2013 jedno\u015b\u0107 miejsca, czasu (jeden dzie\u0144) i akcji.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Co Harpagon ukry\u0142 w ogrodzie w szkatulce?",
      content: {
        options: [
          "Bi\u017cuteri\u0119 po zmar\u0142ej \u017conie",
          "Dziesi\u0119\u0107 tysi\u0119cy talar\u00f3w w z\u0142ocie",
          "Tajne listy mi\u0142osne",
          "Testament, kt\u00f3ry wydziedzicza dzieci",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Harpagon zakopa\u0142 w ogrodzie szkatulk\u0119 z dziesi\u0119cioma tysi\u0105cami talar\u00f3w. \u017byje w ci\u0105g\u0142ym strachu przed ich utrat\u0105. Szkatulka jest symbolem jego obsesji \u2013 kocha j\u0105 bardziej ni\u017c w\u0142asne dzieci.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Jak ko\u0144czy si\u0119 komedia?",
      content: {
        options: [
          "Harpagon traci maj\u0105tek i umiera z rozpaczy",
          "Anzelm okazuje si\u0119 ojcem Walerego i Marianny; Harpagon odzyskuje szkatulk\u0119 i zgadza si\u0119 na \u015bluby dzieci, bo nie musi za nie p\u0142aci\u0107",
          "Harpagon ucieka z pieni\u0119dzmi za granic\u0119",
          "Kleant wykupuje dom ojca na licytacji",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zako\u0144czenie to deus ex machina: Anzelm okazuje si\u0119 don Tomaszem d\u2019Alburci, ojcem Walerego i Marianny. Kleant oddaje szkatulk\u0119 w zamian za zgod\u0119 na \u015blub z Mariann\u0105. Anzelm pokrywa wszystkie koszty \u2013 Harpagon zgadza si\u0119, bo nic nie musi p\u0142aci\u0107.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Jakim gatunkiem literackim jest \u201eSk\u0105piec\u201d?",
      content: {
        options: [
          "Tragedia klasyczna",
          "Komedia charakter\u00f3w napisana proz\u0105",
          "Epos rycerski",
          "Komedia romantyczna napisana wierszem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201eSk\u0105piec\u201d to prozatorska komedia charakter\u00f3w \u2013 w odr\u00f3\u017cnieniu od \u201e\u015awi\u0119toszka\u201d, kt\u00f3ry jest pisany wierszem. G\u0142\u00f3wny bohater jest podporz\u0105dkowany jednej cesze (sk\u0105pstwu), przedstawionej w spos\u00f3b przejaskrawiony i karykaturalny.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Po\u0142\u0105cz postacie z ich rolami w komedii:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Harpagon" },
          { id: "B", text: "Kleant" },
          { id: "C", text: "Eliza" },
          { id: "D", text: "Frozyna" },
        ],
        rightColumn: [
          { id: "1", text: "C\u00f3rka Harpagona, zakochana w Walerym" },
          {
            id: "2",
            text: "Tytu\u0142owy sk\u0105piec, ojciec dw\u00f3jki dzieci",
          },
          { id: "3", text: "Swatka i manipulatorka" },
          { id: "4", text: "Syn Harpagona, zakochany w Mariannie" },
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
          "Harpagon to tytu\u0142owy sk\u0105piec. Kleant (syn) kocha Mariann\u0119 \u2013 t\u0119 sam\u0105 dziewczyn\u0119, kt\u00f3r\u0105 ojciec chce po\u015blubi\u0107. Eliza (c\u00f3rka) potajemnie zakocha\u0142a si\u0119 w Walerym, kt\u00f3ry uratowa\u0142 j\u0105 z wody. Frozyna to sprytna swatka, kt\u00f3ra manipuluje Harpagonem.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re z poni\u017cszych stwierdze\u0144 o Harpagonie s\u0105 prawdziwe?",
      content: {
        options: [
          "Jest bogatym mieszczaninem paryskim i wdowcem",
          "Ma dw\u00f3jk\u0119 doros\u0142ych dzieci: Eliz\u0119 i Kleanta",
          "Para si\u0119 lichw\u0105 \u2013 po\u017cycza pieni\u0105dze na wysoki procent",
          "Jest hojny dla s\u0142u\u017cby i cz\u0119sto wydaje uczty",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Harpagon jest wdowcem, ma dw\u00f3jk\u0119 dzieci i para si\u0119 lichw\u0105. Zdecydowanie nie jest hojny \u2013 racjonuje jedzenie, kontroluje ka\u017cdy wydatek, a s\u0142u\u017cba g\u0142oduje.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Kt\u00f3re pary zakochanych wyst\u0119puj\u0105 w komedii?",
      content: {
        options: [
          "Kleant i Marianna",
          "Eliza i Walery",
          "Harpagon i Frozyna",
          "Harpagon i Marianna (jednostronnie \u2013 Harpagon chce j\u0105 po\u015blubi\u0107)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kleant kocha Mariann\u0119, Eliza kocha Walerego, a Harpagon r\u00f3wnie\u017c chce po\u015blubi\u0107 Mariann\u0119 \u2013 co jest \u017ar\u00f3d\u0142em konfliktu ojca z synem. Frozyna jest swatk\u0105, nie kochank\u0105 Harpagona.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Jakie ma\u0142\u017ce\u0144stwa planuje Harpagon dla swoich dzieci i dlaczego?",
      content: {},
      correctAnswer:
        "Harpagon chce wyda\u0107 c\u00f3rk\u0119 Eliz\u0119 za starszego od niej Anzelma \u2013 bo Anzelm nie \u017c\u0105da posagu. Syna Kleanta chce o\u017ceni\u0107 z bogatą wdow\u0105. Sam za\u015b planuje po\u015blubi\u0107 m\u0142od\u0105 Mariann\u0119 (t\u0119 sam\u0105, kt\u00f3r\u0105 kocha Kleant). Ka\u017cda decyzja Harpagona jest podyktowana wy\u0142\u0105cznie kalkulacj\u0105 finansow\u0105, nie uczuciami dzieci.",
      metadata: {
        explanation:
          "Plany ma\u0142\u017ce\u0144skie Harpagona to motor akcji komedii. Ka\u017cdy zwi\u0105zek ma by\u0107 korzystny finansowo dla sk\u0105pca \u2013 uczucia dzieci si\u0119 nie licz\u0105.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kim naprawd\u0119 jest Walery i dlaczego s\u0142u\u017cy w domu Harpagona?",
      content: {
        options: [
          "Jest profesjonalnym z\u0142odziejem, kt\u00f3ry chce ukrasc szkatulk\u0119",
          "Jest m\u0142odym szlachcicem, kt\u00f3ry uratowa\u0142 Eliz\u0119 z wody; zatrudni\u0142 si\u0119 jako rz\u0105dca, by by\u0107 blisko ukochanej i zdoby\u0107 zaufanie jej ojca",
          "Jest szpiegiem wys\u0142anym przez kr\u00f3la, by zbada\u0107 lichw\u0119 Harpagona",
          "Jest bratem Kleanta, ukrywaj\u0105cym si\u0119 przed d\u0142ugami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Walery to m\u0142ody szlachcic, kt\u00f3ry uratowa\u0142 Eliz\u0119 z tonięcia. Zakochani potajemnie, Walery zatrudni\u0142 si\u0119 jako rz\u0105dca u Harpagona, by by\u0107 blisko niej. Przypochlebia si\u0119 sk\u0105pcowi, co potem wykorzysta Moli\u00e8r komicznie.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Jak Frozyna pr\u00f3buje przekona\u0107 Harpagona do ma\u0142\u017ce\u0144stwa z Mariann\u0105?",
      content: {
        options: [
          "M\u00f3wi mu prawd\u0119, \u017ce Marianna jest bogata i przyniesie wielki posag",
          "Schlebia mu \u2013 zapewnia, \u017ce Marianna woli starszych m\u0119\u017cczyzn, \u017ce Harpagon wygl\u0105da m\u0142odo, a \u201eoszcz\u0119dno\u015b\u0107 dziewczyny\u201d jest warta wi\u0119cej ni\u017c posag",
          "Grozi mu, \u017ce Kleant o\u017ceni si\u0119 z Mariann\u0105 pierwszy",
          "Proponuje mu wsp\u00f3ln\u0105 inwestycj\u0119 handlow\u0105",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Frozyna to mistrzyni pochlebstwa: m\u00f3wi Harpagonowi, \u017ce wygl\u0105da na 25 lat, \u017ce Marianna woli starszych od m\u0142odych i \u017ce jej oszcz\u0119dno\u015b\u0107 (brak posagu!) to warto\u015b\u0107, bo nie b\u0119dzie rozrzutna. Ka\u017cdy argument jest skrojony pod sk\u0105pstwo Harpagona.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Kto kradnie szkatulk\u0119 Harpagona?",
      content: {
        options: [
          "Walery",
          "Kleant",
          "Strza\u0142ka \u2013 s\u0142uga Kleanta",
          "Frozyna",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Szkatulk\u0119 kradnie Strza\u0142ka (La Fl\u00e8che), s\u0142u\u017c\u0105cy Kleanta. P\u00f3\u017aniej Kleant u\u017cywa jej jako karty przetargowej: odda szkatulk\u0119, je\u015bli ojciec zgodzi si\u0119 na jego \u015blub z Mariann\u0105.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Jak reaguje Harpagon na kradzie\u017c szkatulki?",
      content: {
        options: [
          "Spokojnie zg\u0142asza kradzie\u017c na policji",
          "Wpada w sza\u0142, lamentuje, podejrzewa wszystkich, chce powiesi\u0107 \u015bwiat \u2013 wyg\u0142asza s\u0142ynny monolog rozpaczy",
          "Udaje, \u017ce nic si\u0119 nie sta\u0142o, by nie zdradzi\u0107, \u017ce mia\u0142 tyle pieni\u0119dzy",
          "Zwalnia ca\u0142\u0105 s\u0142u\u017cb\u0119 i zamyka dom",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Monolog Harpagona po kradzie\u017cy szkatulki to kulminacja komedii: \u201eZ\u0142odzieje! Mordercy! Ratunku! Sprawiedliwo\u015bci!\u201d \u2013 podejrzewa wszystkich, \u0142apie sam siebie za r\u0119k\u0119, chce powiesi\u0107 \u015bwiat i siebie razem z nim. To arcydzie\u0142o komizmu postaci i sytuacji.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Kim okazuje si\u0119 Anzelm na ko\u0144cu komedii?",
      content: {
        options: [
          "Tajnym agentem kr\u00f3la",
          "Don Tomaszem d\u2019Alburci \u2013 ojcem Walerego i Marianny, kt\u00f3ry utraci\u0142 dzieci podczas katastrofy statku",
          "Bratem Harpagona, kt\u00f3ry wr\u00f3ci\u0142 z wygnania",
          "Oszustem, kt\u00f3ry udawa\u0142 szlachcica",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Anzelm to don Tomasz d\u2019Alburci z Neapolu, kt\u00f3ry utraci\u0142 rodzin\u0119 podczas katastrofy morskiej. Walery i Marianna okazuj\u0105 si\u0119 jego dzie\u0107mi. To typowy zabieg deus ex machina \u2013 cudowne odkrycie to\u017csamo\u015bci rozwi\u0105zuje wszystkie konflikty.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re z poni\u017cszych przejaw\u00f3w sk\u0105pstwa Harpagona wyst\u0119puj\u0105 w komedii?",
      content: {
        options: [
          "Racjonuje jedzenie s\u0142u\u017cbie i ka\u017ce podawa\u0107 potrawy \u201ena zapychanie\u201d",
          "Kontroluje zu\u017cycie \u015bwiec i ka\u017ce je gasi\u0107",
          "Chce wyda\u0107 c\u00f3rk\u0119 za Anzelma, bo ten nie \u017c\u0105da posagu",
          "Kupuje dzieciom drogie ubrania, by zrobi\u0107 na ludziach wra\u017cenie",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Harpagon racjonuje jedzenie (kazuje podawa\u0107 t\u0142uste mi\u0119so i ciasto z kasztanami \u201ena zapychanie\u201d), kontroluje \u015bwiece, wybiera zi\u0119cia bez posagu. Na pewno nie kupuje dzieciom drogich ubra\u0144 \u2013 wr\u0119cz przeciwnie, sk\u0105pi im na wszystko.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re postacie stosuj\u0105 podst\u0119p lub manipulacj\u0119 w komedii?",
      content: {
        options: [
          "Walery \u2013 udaje lojalnego s\u0142ug\u0119, by by\u0107 blisko Elizy",
          "Frozyna \u2013 schlebia Harpagonowi, by zarobi\u0107 na swataniu",
          "Kleant \u2013 u\u017cywa skradzionej szkatulki jako karty przetargowej",
          "Anzelm \u2013 udaje biednego, by nie p\u0142aci\u0107 posagu",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Walery, Frozyna i Kleant stosuj\u0105 r\u00f3\u017cne formy podst\u0119pu. Anzelm nie udaje biednego \u2013 jest naprawd\u0119 bogaty i gotowy pokry\u0107 wszystkie koszty.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Uzupe\u0142nij zdania, wybieraj\u0105c poprawne opcje:",
      content: {
        textWithGaps:
          "Inspiracj\u0105 dla \u201eSk\u0105pca\u201d by\u0142a (1) Plauta. \u201eSk\u0105piec\u201d jest napisany (2). G\u0142\u00f3wn\u0105 cech\u0105 Harpagona, kt\u00f3ra napędza ca\u0142\u0105 akcj\u0119, jest (3).",
        gaps: [
          {
            id: 1,
            options: [
              "\u201eAntyona\u201d",
              "\u201eAulularia\u201d",
              "\u201eMiles Gloriosus\u201d",
              "\u201eAmphitruo\u201d",
            ],
          },
          {
            id: 2,
            options: [
              "wierszem",
              "proz\u0105",
              "rymowanym aleksandrynem",
              "bia\u0142ym wierszem",
            ],
          },
          {
            id: 3,
            options: [
              "ambicja",
              "zazdro\u015b\u0107",
              "sk\u0105pstwo i chciwo\u015b\u0107",
              "ob\u0142uda",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 2],
      metadata: {
        explanation:
          "Inspiracj\u0105 by\u0142a \u201eAulularia\u201d (Komedia o garncu) Plauta, gdzie g\u0142\u00f3wny bohater r\u00f3wnie\u017c obsesyjnie chroni sw\u00f3j skarb. \u201eSk\u0105piec\u201d jest pisany proz\u0105 (nie wierszem jak \u201e\u015awi\u0119toszek\u201d). G\u0142\u00f3wna cecha Harpagona to sk\u0105pstwo/chciwo\u015b\u0107.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Dlaczego Harpagon i Kleant s\u0105 rywalami mi\u0142osnymi? Opisz ten konflikt.",
      content: {},
      correctAnswer:
        "Obaj chc\u0105 po\u015blubi\u0107 t\u0119 sam\u0105 kobiet\u0119 \u2013 Mariann\u0119. Kleant jest m\u0142odym cz\u0142owiekiem szczerze zakochanym. Harpagon, sze\u015b\u0107dziesi\u0119cioletni sk\u0105piec, r\u00f3wnie\u017c chce j\u0105 po\u015blubi\u0107 \u2013 co jest groteskowe i komiczne. Konflikt ojca z synem o t\u0119 sam\u0105 kobiet\u0119 to g\u0142\u00f3wna o\u015b fabularna komedii i \u017ar\u00f3d\u0142o silnego komizmu sytuacyjnego.",
      metadata: {
        explanation:
          "Rywalizacja ojca z synem o t\u0119 sam\u0105 kobiet\u0119 to motyw zaczerpni\u0119ty z komedii antycznej. U Moli\u00e8ra nabiera wymiaru satyry na w\u0142adz\u0119 patriarchaln\u0105 i obsesj\u0119 posiadania.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Jak Harpagon traktuje s\u0142u\u017cb\u0119? Podaj co najmniej dwa przyk\u0142ady.",
      content: {},
      correctAnswer:
        "Harpagon traktuje s\u0142u\u017cb\u0119 skandalicznie: 1) Racjonuje jedzenie \u2013 ka\u017ce podawa\u0107 t\u0142uste, zapychaj\u0105ce potrawy, by go\u015bcie mniej zjedli. 2) Kontroluje \u015bwiece \u2013 ka\u017ce je gasi\u0107 i oszcz\u0119dza\u0107 na o\u015bwietleniu. 3) Podejrzewa s\u0142ug\u00f3w o kradzie\u017c \u2013 rewiduje ich ubrania (Strza\u0142ka). 4) Ka\u017ce kucharzowi Jakubowi pe\u0142ni\u0107 te\u017c funkcj\u0119 stajennnego, by nie p\u0142aci\u0107 dwom osobom.",
      metadata: {
        explanation:
          "Traktowanie s\u0142u\u017cby to komiczne, ale i okrutne przejawy sk\u0105pstwa Harpagona. Moli\u00e8r wykorzystuje te sceny do budowania komizmu sytuacyjnego i s\u0142ownego.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Na czym polega zabieg deus ex machina w zako\u0144czeniu \u201eSk\u0105pca\u201d?",
      content: {},
      correctAnswer:
        "Deus ex machina (\u201eb\u00f3g z maszyny\u201d) to niespodziewane, cudowne rozwi\u0105zanie konfliktu: Anzelm, kt\u00f3rego Harpagon wybra\u0142 na m\u0119\u017ca Elizy, okazuje si\u0119 don Tomaszem d\u2019Alburci \u2013 ojcem Walerego i Marianny, zaginionym po katastrofie morskiej. Dzi\u0119ki temu: Walery mo\u017ce po\u015blubi\u0107 Eliz\u0119, Kleant \u2013 Mariann\u0119, a Harpagon odzyskuje szkatulk\u0119 i nie musi nic p\u0142aci\u0107. Rozwi\u0105zanie jest sztuczne, ale typowe dla komedii klasycznej.",
      metadata: {
        explanation:
          "Deus ex machina wyst\u0119puje zar\u00f3wno w \u201eSk\u0105pcu\u201d (odkrycie to\u017csamo\u015bci), jak i w \u201e\u015awi\u0119toszku\u201d (interwencja kr\u00f3la). To sta\u0142y zabieg Moli\u00e8ra.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "S\u0142ynny monolog Harpagona po kradzie\u017cy szkatulki, w kt\u00f3rym podejrzewa wszystkich i \u0142apie sam siebie za r\u0119k\u0119, uchodzi za jedno z arcydzie\u0142 komedii. Jaki rodzaj komizmu dominuje w tej scenie?",
      content: {
        options: [
          "Wy\u0142\u0105cznie komizm s\u0142owny (gra j\u0119zykowa)",
          "Komizm postaci (obsesja Harpagona doprowadzona do absurdu) i komizm sytuacyjny (traktuje szkatulk\u0119 jak \u017cyj\u0105c\u0105 istot\u0119, chce aresztowa\u0107 \u015bwiat)",
          "Komizm opiera si\u0119 wy\u0142\u0105cznie na slapstickowym humorze fizycznym",
          "Scena jest tragiczna, nie komiczna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Monolog Harpagona \u0142\u0105czy komizm postaci (obsesja doprowadzona do granic absurdu: \u0142apie sam siebie za r\u0119k\u0119 jako \u201ez\u0142odzieja\u201d, podejrzewa widowni\u0119) z komizmem sytuacyjnym (pieni\u0105dze s\u0105 wa\u017cniejsze ni\u017c \u017cycie, chce powiesi\u0107 \u015bwiat). Scena balansuje mi\u0119dzy \u015bmiechem a groz\u0105.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Walery, by zdoby\u0107 zaufanie Harpagona, stosuje strategi\u0119 przypochlebiania si\u0119 \u2013 potakuje mu we wszystkim. Co m\u00f3wi to o relacjach w\u0142adzy w domu Harpagona?",
      content: {
        options: [
          "Walery jest s\u0142abym cz\u0142owiekiem bez zasad",
          "Harpagon jako tyran domowy wymusza pochlebstwo \u2013 jedynym sposobem przetrwania w jego domu jest udawanie zgody z jego kaprysami, co demaskuje destrukcyjny wp\u0142yw w\u0142adzy opartej na pieni\u0105dzach",
          "Walery chce ukrasc maj\u0105tek Harpagona",
          "Scena pokazuje, \u017ce s\u0142u\u017cba zawsze kocha swoich pan\u00f3w",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Strategia Walerego to satyra na relacje w\u0142adzy: w domu tyrana \u017cyje si\u0119 tylko przez podst\u0119p i pochlebstwo. Moli\u00e8r pokazuje, \u017ce sk\u0105pstwo Harpagona niszczy nie tylko rodzin\u0119, ale te\u017c moralno\u015b\u0107 otoczenia \u2013 zmusza ludzi do k\u0142amstwa.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "W ostatniej scenie Harpagon odchodzi \u015bciskaj\u0105c szkatulk\u0119, nie uczestnicz\u0105c w radosnym pojednaniu rodziny. Co m\u00f3wi to o jego postaci?",
      content: {
        options: [
          "Harpagon nauczy\u0142 si\u0119 lekcji i odchodzi zawstydzony",
          "Harpagon si\u0119 nie zmienia \u2013 odchodzi z szkatulk\u0105, bo pieni\u0105dze s\u0105 wa\u017cniejsze ni\u017c rodzina; komedia ko\u0144czy si\u0119 szcz\u0119\u015bliwie DLA WSZYSTKICH POZA NIM \u2013 on pozostaje wi\u0119\u017aniem swojej obsesji",
          "Harpagon planuje zemst\u0119 na dzieciach",
          "To oznacza, \u017ce szkatulka by\u0142a pusta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To klucz do interpretacji: Harpagon jest jedyn\u0105 postaci\u0105, kt\u00f3ra NIE ma szcz\u0119\u015bliwego zako\u0144czenia. M\u0142odzi si\u0119 \u017ceni\u0105, Anzelm odnajduje dzieci \u2013 ale Harpagon odchodzi sam ze szkatulk\u0105. Jego obsesja jest nieuleczalna.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Harpagon para si\u0119 lichw\u0105 \u2013 po\u017cycza pieni\u0105dze na wysoki procent. Oka\u017ce si\u0119, \u017ce jego w\u0142asny syn Kleant jest jednym z d\u0142u\u017cnik\u00f3w. Jak\u0105 funkcj\u0119 dramaturgiczn\u0105 pe\u0142ni ta scena?",
      content: {
        options: [
          "To jedynie komiczny epizod bez g\u0142\u0119bszego znaczenia",
          "Pokazuje skrajno\u015b\u0107 sk\u0105pstwa Harpagona: nie tylko nie daje synowi pieni\u0119dzy, ale jeszcze, nie wiedz\u0105c o tym, zarabia na jego d\u0142ugach. Ojciec i syn s\u0105 po dwoch stronach transakcji lichwiarskiej \u2013 co jest groteskowe",
          "Kleant celowo zaci\u0105ga d\u0142ugi u ojca, by go oszuka\u0107",
          "Scena s\u0142u\u017cy wy\u0142\u0105cznie pokazaniu, \u017ce Kleant jest rozrzutny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena, w kt\u00f3rej ojciec-lichwiarz i syn-d\u0142u\u017cnik odkrywaj\u0105 nawzajem swoj\u0105 to\u017csamo\u015b\u0107, to jeden z najbardziej groteskowych moment\u00f3w komedii. Pokazuje, \u017ce sk\u0105pstwo Harpagona przekroczy\u0142o wszelkie granice \u2013 zarabia na w\u0142asnym dziecku.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re z poni\u017cszych cech komedii klasycznej s\u0105 zachowane w \u201eSk\u0105pcu\u201d?",
      content: {
        options: [
          "Jedno\u015b\u0107 miejsca (dom Harpagona), czasu (jeden dzie\u0144) i akcji (sk\u0105pstwo i jego konsekwencje)",
          "Podzia\u0142 na pi\u0119\u0107 akt\u00f3w",
          "Posta\u0107 g\u0142\u00f3wna jako \u201etyp\u201d \u2013 podporz\u0105dkowana jednej cesze (chciwo\u015b\u0107)",
          "Wszystkie postacie gin\u0105 na ko\u0144cu (jak w tragedii)",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "\u201eSk\u0105piec\u201d zachowuje zasad\u0119 trzech jedno\u015bci, ma pi\u0119\u0107 akt\u00f3w i Harpagon to klasyczny \u201etyp\u201d komediowy \u2013 posta\u0107 zdominowana jedn\u0105 cech\u0105 (sk\u0105pstwem). Nikt nie ginie \u2013 to komedia ze szcz\u0119\u015bliwym zako\u0144czeniem.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re z poni\u017cszych motyw\u00f3w literackich wyst\u0119puj\u0105 w \u201eSk\u0105pcu\u201d?",
      content: {
        options: [
          "Motyw pieni\u0105dza jako destrukcyjnej si\u0142y niszcz\u0105cej rodzin\u0119",
          "Motyw konfliktu pokole\u0144 (ojciec kontra dzieci)",
          "Motyw cudownie odnalezionej rodziny (anagnorisis)",
          "Motyw w\u0119dr\u00f3wki i poszukiwania to\u017csamo\u015bci",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "G\u0142\u00f3wne motywy to: pieni\u0105dze jako si\u0142a destrukcyjna, konflikt ojca z dzie\u0107mi i anagnorisis (cudowne odkrycie to\u017csamo\u015bci Anzelma/Walerego/Marianny). Nie ma motywu w\u0119dr\u00f3wki \u2013 akcja toczy si\u0119 w jednym domu.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re rodzaje komizmu s\u0105 obecne w \u201eSk\u0105pcu\u201d? Wybierz wszystkie poprawne.",
      content: {
        options: [
          "Komizm postaci \u2013 karykaturalne sk\u0105pstwo Harpagona",
          "Komizm sytuacyjny \u2013 ojciec i syn jako rywale mi\u0142o\u015bni, ojciec-lichwiarz i syn-d\u0142u\u017cnik",
          "Komizm s\u0142owny \u2013 pochlebstwa Frozyny, monolog Harpagona po kradzie\u017cy",
          "Komizm tragiczny \u2013 Harpagon umiera z rozpaczy po utracie pieni\u0119dzy",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Moli\u00e8r \u0142\u0105czy trzy typy komizmu. Harpagon nie umiera \u2013 to komedia, nie tragedia. Cho\u0107 jego obsesja ma rysy tragiczne, Moli\u00e8r utrzymuje j\u0105 w konwencji satyry.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Czym r\u00f3\u017cni si\u0119 \u201eSk\u0105piec\u201d od \u201e\u015awi\u0119toszka\u201d pod wzgl\u0119dem formy? Podaj co najmniej trzy r\u00f3\u017cnice.",
      content: {},
      correctAnswer:
        "1) \u201eSk\u0105piec\u201d jest napisany proz\u0105, \u201e\u015awi\u0119toszek\u201d \u2013 wierszem (aleksandrynem). 2) W \u201eSk\u0105pcu\u201d bohater tytu\u0142owy pojawia si\u0119 od pocz\u0105tku, w \u201e\u015awi\u0119toszku\u201d Tartuffe wchodzi dopiero w III akcie. 3) \u201eSk\u0105piec\u201d ko\u0144czy si\u0119 odkryciem to\u017csamo\u015bci (anagnorisis), \u201e\u015awi\u0119toszek\u201d \u2013 interwencj\u0105 kr\u00f3la. 4) \u201eSk\u0105piec\u201d krytykuje chciwo\u015b\u0107, \u201e\u015awi\u0119toszek\u201d \u2013 ob\u0142ud\u0119 religijn\u0105.",
      metadata: {
        explanation:
          "Por\u00f3wnanie dw\u00f3ch wielkich komedii Moli\u00e8ra to cz\u0119sty temat maturalny. Kluczowa r\u00f3\u017cnica formalna to proza vs. wiersz.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Opisz rol\u0119 szkatulki jako symbolu w komedii.",
      content: {},
      correctAnswer:
        "Szkatulka z 10 tysi\u0105cami talar\u00f3w to symbol obsesji Harpagona: kocha j\u0105 bardziej ni\u017c rodzin\u0119, traktuje jak \u017cyj\u0105c\u0105 istot\u0119, \u017cyje w ci\u0105g\u0142ym strachu o ni\u0105. Jej kradzie\u017c wywo\u0142uje sza\u0142 godny utraty ukochanej osoby. Na ko\u0144cu odzyskanie szkatulki jest wa\u017cniejsze ni\u017c szcz\u0119\u015bcie dzieci \u2013 Harpagon zgadza si\u0119 na ich \u015bluby dopiero, gdy Kleant oddaje mu pieni\u0105dze. Szkatulka to fetysz \u2013 przedmiot, kt\u00f3ry zast\u0119puje ludzkie uczucia.",
      metadata: {
        explanation:
          "Szkatulka to centralny rekwizyt komedii, pe\u0142ni\u0105cy funkcj\u0119 symboliczn\u0105 \u2013 uosabia mi\u0142o\u015b\u0107 Harpagona do pieni\u0119dzy, kt\u00f3ra wygra\u0142a z mi\u0142o\u015bci\u0105 do ludzi.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Jak Frozyna manipuluje Harpagonem? Podaj przyk\u0142ady jej argument\u00f3w.",
      content: {},
      correctAnswer:
        "Frozyna doskonale zna s\u0142abo\u015bci Harpagona i ka\u017cdy argument dostosowuje do jego sk\u0105pstwa: 1) M\u00f3wi, \u017ce Marianna woli starszych m\u0119\u017cczyzn od m\u0142odych (schlebia pr\u00f3\u017cno\u015bci). 2) Zapewnia, \u017ce Harpagon wygl\u0105da na najwy\u017cej 25 lat. 3) Przekonuje, \u017ce brak posagu to ZALETA \u2013 oszcz\u0119dna dziewczyna nie b\u0119dzie rozrzutna. 4) Wylicza \u201eoszcz\u0119dno\u015bci\u201d Marianny jako jej \u201eposag\u201d. Ka\u017cdy argument jest absurdalny, ale Harpagon \u0142yka je, bo potwierdzaj\u0105 to, co chce s\u0142ysze\u0107.",
      metadata: {
        explanation:
          "Frozyna to lustro Harpagona: pokazuje, \u017ce sk\u0105piec jest r\u00f3wnie \u0142atwowierny jak Orgon w \u201e\u015awi\u0119toszku\u201d \u2013 o ile pochlebstwo trafia w jego obsesj\u0119.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "Sk\u0105pstwo Harpagona \u2013 mechanizm obsesji i jej przejawy",
        requirements: [
          "Wymie\u0144 co najmniej cztery przejawy sk\u0105pstwa Harpagona",
          "Wska\u017c, jak sk\u0105pstwo wp\u0142ywa na jego relacje z rodzin\u0105",
          "Podaj przyk\u0142ady z komedii",
          "80-120 s\u0142\u00f3w",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Sk\u0105pstwo Harpagona przenika ka\u017cdy aspekt jego \u017cycia: racjonuje jedzenie s\u0142u\u017cbie, kontroluje \u015bwiece, para si\u0119 lichw\u0105, zakopuje szkatulk\u0119 w ogrodzie, wybiera zi\u0119cia bez posagu (Anzelm), chce po\u015blubi\u0107 Mariann\u0119 mimo sze\u015b\u0107dziesi\u0119ciu lat, rewiduje ubrania s\u0142ug\u00f3w. Relacje z rodzin\u0105 s\u0105 zniszczone: Kleant nienawidzi ojca i obiecuje lichwiarzowi jego \u015bmier\u0107, Eliza cierpi, bo jest traktowana jak \u201ezb\u0119dny przedmiot\u201d. Harpagon stawia pieni\u0105dze ponad dzieci \u2013 zgadza si\u0119 na ich \u015bluby dopiero, gdy odzyskuje szkatulk\u0119 i nic nie musi p\u0142aci\u0107.",
      metadata: {
        explanation:
          "Mechanizm obsesji to klucz do zrozumienia Harpagona. Moli\u00e8r pokazuje sk\u0105pstwo nie jako wad\u0119, ale jako chorob\u0119, kt\u00f3ra niszczy cz\u0142owieka i jego otoczenie.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Boy-\u017bele\u0144ski pisa\u0142, \u017ce Moli\u00e8r pokaza\u0142 Harpagona \u201ew chwili, gdy ten, powstrzymywany jeszcze resztkami wzgl\u0119d\u00f3w wobec \u015bwiata, pr\u00f3buje okie\u0142zna\u0107 swe wady, ale to tylko kwestia czasu\u201d. Co ta interpretacja m\u00f3wi o Harpagonie?",
      content: {
        options: [
          "Harpagon jest z natury dobrym cz\u0142owiekiem, kt\u00f3ry walczy z pokus\u0105",
          "Harpagon jest na granicy \u2013 jeszcze udaje normalnego cz\u0142owieka, ale obsesja pieni\u0119dzy stopniowo zwycięży ka\u017cd\u0105 ludzk\u0105 wi\u0119\u017a; jest postaci\u0105 na kraw\u0119dzi mi\u0119dzy komedi\u0105 a patologi\u0105",
          "Harpagon zostanie wyleczony z chciwo\u015bci na ko\u0144cu komedii",
          "Boy-\u017bele\u0144ski uwa\u017ca\u0142, \u017ce Harpagon nie jest prawdziwym sk\u0105pcem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Boy-\u017bele\u0144ski widzi w Harpagonie posta\u0107 na kraw\u0119dzi: jeszcze pr\u00f3buje zachowa\u0107 pozory (chce si\u0119 \u017ceni\u0107, wydaje uczt\u0119), ale obsesja ju\u017c dominuje. To czyni go postaci\u0105 nie tylko komiczn\u0105, ale i tragicznie \u017ca\u0142osn\u0105.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Jakub (kucharz/stajenny) fa\u0142szywie oskar\u017ca Walerego o kradzie\u017c szkatulki. Jakub chce si\u0119 zem\u015bci\u0107 na Walerym za wcze\u015bniejsze upokorzenie. Co ta scena m\u00f3wi o \u015bwiecie komedii?",
      content: {
        options: [
          "Pokazuje, \u017ce s\u0142u\u017cba jest uczciwa i sprawiedliwa",
          "W \u015bwiecie zdominowanym przez sk\u0105pstwo i podst\u0119p nawet s\u0142u\u017cba ucieka si\u0119 do fa\u0142szywych oskar\u017ce\u0144 \u2013 sk\u0105pstwo Harpagona niszczy moralno\u015b\u0107 ca\u0142ego otoczenia",
          "Jakub jest g\u0142\u00f3wnym antagonist\u0105 komedii",
          "Scena s\u0142u\u017cy tylko przed\u0142u\u017ceniu akcji bez g\u0142\u0119bszego sensu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Fa\u0142szywe oskar\u017cenie Jakuba pokazuje, \u017ce atmosfera podejrzliwo\u015bci i chciwo\u015bci rozlewa si\u0119 z Harpagona na ca\u0142y dom. Nikt nie jest uczciwy \u2013 bo uczciwo\u015b\u0107 w domu sk\u0105pca nie op\u0142aca si\u0119.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Harpagon mawia: \u201eTrzeba \u017cy\u0107, \u017ceby je\u015b\u0107, a nie je\u015b\u0107, \u017ceby \u017cy\u0107\u201d (odwracaj\u0105c powiedzenie). Jaka jest funkcja tego odwr\u00f3cenia?",
      content: {
        options: [
          "To b\u0142\u0105d logiczny Harpagona, kt\u00f3ry nie umie m\u00f3wi\u0107 poprawnie",
          "Odwr\u00f3cenie przys\u0142owia demaskuje odwr\u00f3cony system warto\u015bci Harpagona: nie \u017cycie jest celem, lecz oszcz\u0119dzanie; jedzenie to koszt, nie przyjemno\u015b\u0107 \u2013 ca\u0142a hierarchia warto\u015bci zosta\u0142a podporz\u0105dkowana pieni\u0105dzom",
          "Harpagon cytuje filozofi\u0119 stoick\u0105 o umiarkowaniu",
          "To komplement, kt\u00f3rym Harpagon chwali oszcz\u0119dno\u015b\u0107 s\u0142u\u017cby",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Odwr\u00f3cenie przys\u0142owia to komizm s\u0142owny z g\u0142\u0119bi\u0105: pokazuje, \u017ce u Harpagona WSZYSTKO jest odwr\u00f3cone \u2013 \u017cycie s\u0142u\u017cy oszcz\u0119dzaniu, a nie odwrotnie. To kwintesencja jego obsesji.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re z poni\u017cszych interpretacji postaci Harpagona s\u0105 uzasadnione tre\u015bci\u0105 komedii?",
      content: {
        options: [
          "Sk\u0105pstwo Harpagona to choroba \u2013 obsesja, kt\u00f3ra zniszczy\u0142a wszystkie ludzkie uczucia",
          "Harpagon jest ofiar\u0105 spo\u0142ecze\u0144stwa, kt\u00f3re ceni tylko pieni\u0105dze",
          "Harpagon jest jednocze\u015bnie komiczny i \u017ca\u0142osny \u2013 budzi \u015bmiech, ale te\u017c lito\u015b\u0107, bo jest wi\u0119\u017aniem w\u0142asnej obsesji",
          "Harpagon jest postaci\u0105 ca\u0142kowicie pozbawion\u0105 uczu\u0107 \u2013 nie kocha niczego",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Harpagon to chorob\u0142iwy sk\u0105piec (obsesja) i posta\u0107 tragikomiczna (\u015bmieszna i \u017ca\u0142osna). Nie jest jednak \u201ecałkowicie pozbawiony uczu\u0107\u201d \u2013 kocha szkatulk\u0119, chce po\u015blubi\u0107 Mariann\u0119; problem w tym, \u017ce pieni\u0105dze s\u0105 silniejsze. Nie jest te\u017c \u201eofiar\u0105 spo\u0142ecze\u0144stwa\u201d \u2013 Moli\u00e8r pokazuje, \u017ce sk\u0105pstwo to wada indywidualna.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re analogie mi\u0119dzy \u201eSk\u0105pcem\u201d a \u201e\u015awi\u0119toszkiem\u201d s\u0105 uzasadnione?",
      content: {
        options: [
          "Obaj g\u0142\u00f3wni bohaterowie (Harpagon i Orgon) s\u0105 ojcami, kt\u00f3rzy narzucaj\u0105 dzieciom ma\u0142\u017ce\u0144stwa wbrew ich woli",
          "Obie komedie ko\u0144cz\u0105 si\u0119 zabiegiem deus ex machina",
          "W obu komediach s\u0142u\u017cba jest m\u0105drzejsza od pan\u00f3w (Doryna / Strza\u0142ka, Jakub, Frozyna)",
          "Obie komedie s\u0105 napisane wierszem",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Ojciec-tyran, deus ex machina i m\u0105dra s\u0142u\u017cba to wsp\u00f3lne cechy obu komedii. Ale \u201e\u015awi\u0119toszek\u201d jest napisany wierszem, a \u201eSk\u0105piec\u201d \u2013 proz\u0105.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Dlaczego Harpagon zgadza si\u0119 na \u015bluby swoich dzieci dopiero na ko\u0144cu? Co to m\u00f3wi o hierarchii jego warto\u015bci?",
      content: {},
      correctAnswer:
        "Harpagon zgadza si\u0119, bo spe\u0142nione s\u0105 TRZY warunki: 1) Kleant oddaje szkatulk\u0119 (pieni\u0105dze wr\u00f3ci\u0142y). 2) Anzelm zobowi\u0105zuje si\u0119 pokry\u0107 WSZYSTKIE koszty \u015blub\u00f3w (Harpagon nie wyda ani grosza). 3) Nie musi p\u0142aci\u0107 posagu. To demaskuje hierarchi\u0119 warto\u015bci: pieni\u0105dze > dzieci > mi\u0142o\u015b\u0107 > moralno\u015b\u0107. Harpagon nie daje \u201ezgody ojcowskiej\u201d z mi\u0142o\u015bci, lecz z kalkulacji: zgadza si\u0119, bo to go nic nie kosztuje.",
      metadata: {
        explanation:
          "Zako\u0144czenie jest ironiczne: wygl\u0105da na szcz\u0119\u015bliwe, ale motywacja Harpagona jest czysto finansowa. Moli\u00e8r nie pozwala widzowi zapomnie\u0107, \u017ce sk\u0105piec pozostaje sk\u0105pcem.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Por\u00f3wnaj Harpagona i Orgona ze \u201e\u015awi\u0119toszka\u201d. Co ich \u0142\u0105czy, a co dzieli?",
      content: {},
      correctAnswer:
        "\u0141\u0105czy ich: 1) Obaj s\u0105 ojcami-tyranami, kt\u00f3rzy narzucaj\u0105 dzieciom ma\u0142\u017ce\u0144stwa. 2) Obaj s\u0105 za\u015blepieni obsesj\u0105 (Harpagon \u2013 pieni\u0119dzmi, Orgon \u2013 Tartuffem). 3) Obaj ignoruj\u0105 g\u0142os rozs\u0105dku (rodziny, s\u0142u\u017cby). 4) Obaj s\u0105 \u201etypami\u201d komediowymi. Dzieli ich: Orgon jest ofiar\u0105 manipulatora (Tartuffe\u2019a), Harpagon jest sam swoim w\u0142asnym wrogiem \u2013 nikt go nie manipuluje, to on sam niszczy swoje \u017cycie. Orgon przejrzewa na oczy, Harpagon \u2013 NIGDY. Orgon jest naiwny, Harpagon \u2013 podejrzliwy wobec wszystkich.",
      metadata: {
        explanation:
          "Por\u00f3wnanie dw\u00f3ch wielkich \u201etyp\u00f3w\u201d Moli\u00e8ra to doskona\u0142y temat maturalny. Klucz: Orgon ma szans\u0119 si\u0119 zmieni\u0107, Harpagon \u2013 nie.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Jak \u201eSk\u0105piec\u201d krytykuje patriarchat i w\u0142adz\u0119 ojcowsk\u0105 w XVII-wiecznej Francji?",
      content: {},
      correctAnswer:
        "Moli\u00e8r pokazuje, \u017ce nieograniczona w\u0142adza ojca prowadzi do tyranii: Harpagon decyduje o ma\u0142\u017ce\u0144stwach dzieci wy\u0142\u0105cznie na podstawie kalkulacji finansowej (Anzelm nie \u017c\u0105da posagu, wdowa jest bogata). Eliza cierpi, bo jest \u201ezb\u0119dnym przedmiotem\u201d. Kleant nienawidzi ojca tak mocno, \u017ce obiecuje lichwiarzowi jego \u015bmier\u0107. Dzieci musz\u0105 ucieka\u0107 si\u0119 do podst\u0119pu (Walery udaje s\u0142ug\u0119, Kleant szanta\u017cuje szkatulk\u0105), bo nie maj\u0105 g\u0142osu. Moli\u00e8r krytykuje system, w kt\u00f3rym ma\u0142\u017ce\u0144stwo jest transakcj\u0105 handlow\u0105, a uczucia dzieci si\u0119 nie licz\u0105.",
      metadata: {
        explanation:
          "Krytyka patriarchatu to wa\u017cny aspekt obu komedii Moli\u00e8ra. \u201eSk\u0105piec\u201d pokazuje skrajno\u015b\u0107: w\u0142adza ojca + chciwo\u015b\u0107 = pe\u0142na destrukcja rodziny.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "Pieni\u0105dze kontra mi\u0142o\u015b\u0107 w \u201eSk\u0105pcu\u201d \u2013 dwa systemy warto\u015bci",
        requirements: [
          "Przeciwstaw system warto\u015bci Harpagona systemowi m\u0142odych bohater\u00f3w",
          "Wska\u017c, kt\u00f3ry system zwycięży i dlaczego",
          "Podaj przyk\u0142ady z komedii",
          "120-160 s\u0142\u00f3w",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "W \u201eSk\u0105pcu\u201d \u015bcieraj\u0105 si\u0119 dwa systemy warto\u015bci. Harpagon: pieni\u0105dze s\u0105 najwa\u017cniejsze \u2013 ma\u0142\u017ce\u0144stwo to transakcja (Anzelm bez posagu), mi\u0142o\u015b\u0107 to koszt, dzieci to obci\u0105\u017cenie. M\u0142odzi (Kleant, Eliza, Walery, Marianna): mi\u0142o\u015b\u0107 jest wa\u017cniejsza ni\u017c maj\u0105tek \u2013 Walery rezygnuje z pozycji, by by\u0107 blisko Elizy; Kleant walczy o Mariann\u0119 wbrew ojcu. Formalnie zwycięża mi\u0142o\u015b\u0107 \u2013 m\u0142odzi si\u0119 \u017ceni\u0105. Ale Moli\u00e8r jest ironiczny: Harpagon zgadza si\u0119 na \u015bluby NIE z mi\u0142o\u015bci, lecz bo Anzelm p\u0142aci. Pieni\u0105dze wygra\u0142y w jego duszy \u2013 odchodzi \u015bciskaj\u0105c szkatulk\u0119, sam, podczas gdy reszta \u015bwi\u0119tuje.",
      metadata: {
        explanation:
          "Opozycja pieni\u0105dze/mi\u0142o\u015b\u0107 to o\u015b tematyczna komedii. Moli\u00e8r daje szcz\u0119\u015bliwe zako\u0144czenie m\u0142odym, ale nie Harpagonowi \u2013 bo sk\u0105pstwo jest nieuleczalne.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "Komizm w \u201eSk\u0105pcu\u201d \u2013 rodzaje i przyk\u0142ady",
        requirements: [
          "Wymie\u0144 i opisz trzy rodzaje komizmu obecne w komedii",
          "Podaj po jednym przyk\u0142adzie ka\u017cdego rodzaju",
          "Wska\u017c, kt\u00f3ry rodzaj komizmu dominuje",
          "100-140 s\u0142\u00f3w",
        ],
        wordLimit: { min: 100, max: 140 },
      },
      correctAnswer:
        "W \u201eSk\u0105pcu\u201d wyst\u0119puj\u0105 trzy rodzaje komizmu: 1) Komizm postaci (dominuj\u0105cy): Harpagon to karykatura sk\u0105pca \u2013 ka\u017cdy gest i s\u0142owo s\u0142u\u017c\u0105 oszcz\u0119dzaniu. Jego mi\u0142o\u015b\u0107 do szkatulki jest groteskowo przesadzona. 2) Komizm sytuacyjny: ojciec i syn rywalizuj\u0105 o t\u0119 sam\u0105 kobiet\u0119; ojciec-lichwiarz udziela po\u017cyczki w\u0142asnemu synowi, nie wiedz\u0105c o tym; Harpagon \u0142apie sam siebie za r\u0119k\u0119 po kradzie\u017cy. 3) Komizm s\u0142owny: odwr\u00f3cone przys\u0142owie (\u201e\u017cy\u0107, \u017ceby je\u015b\u0107\u201d), pochlebstwa Frozyny, monolog rozpaczy. Dominuje komizm postaci, bo ca\u0142a akcja wynika z jednej cechy Harpagona.",
      metadata: {
        explanation:
          "Analiza komizmu to obowi\u0105zkowy element opracowania komedii. Dominacja komizmu postaci jest cech\u0105 komedii charakter\u00f3w.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Czy dobra materialne czyni\u0105 cz\u0142owieka szcz\u0119\u015bliwym? Om\u00f3w zagadnienie na podstawie \u201eSk\u0105pca\u201d Moli\u00e8ra. W swojej odpowiedzi uwzgl\u0119dnij r\u00f3wnie\u017c wybrany kontekst.",
      content: {
        thesis:
          "Pieni\u0105dze a szcz\u0119\u015bcie \u2013 lekcja z \u201eSk\u0105pca\u201d",
        structure: {
          introduction:
            "Postaw tez\u0119: Moli\u00e8r pokazuje, \u017ce obsesja pieni\u0119\u017cna prowadzi do samotno\u015bci i nieszcz\u0119\u015bcia",
          arguments_for:
            "Harpagon ma maj\u0105tek, ale: nie ma relacji z dzie\u0107mi, jest sam, \u017cyje w strachu. Szkatulka zast\u0119puje mu ludzi",
          arguments_against:
            "Pieni\u0105dze daj\u0105 wolno\u015b\u0107 i bezpiecze\u0144stwo \u2013 ale tylko gdy nie s\u0105 celem samym w sobie",
          conclusion:
            "Wniosek: pieni\u0105dze s\u0105 narz\u0119dziem, nie celem; odwo\u0142aj si\u0119 do kontekstu",
        },
        requirements: [
          "Minimum 300 s\u0142\u00f3w",
          "Odwo\u0142anie do co najmniej trzech scen z komedii",
          "Kontekst literacki (np. \u201eLalka\u201d, \u201eOpowie\u015b\u0107 wigilijna\u201d Dickensa, wsp\u00f3\u0142czesno\u015b\u0107)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Pokaza\u0107 Harpagona jako cz\u0142owieka bogatego, ale nieszcz\u0119\u015bliwego (strat samotny ze szkatulk\u0105, dzieci go nienawidz\u0105). 2) Om\u00f3wi\u0107 scen\u0119 monologu po kradzie\u017cy (szkatulka > \u017cycie), zako\u0144czenie (zgadza si\u0119 na \u015bluby, bo nic nie p\u0142aci), rywalizacj\u0119 z synem. 3) Rozwa\u017cy\u0107: pieni\u0105dze s\u0105 potrzebne, ale gdy staj\u0105 si\u0119 obsesj\u0105, niszcz\u0105 cz\u0142owieka. 4) Kontekst: Scrooge z \u201eOpowie\u015bci wigilijnej\u201d, Wokulski z \u201eLalki\u201d, wsp\u00f3\u0142czesny konsumpcjonizm.",
      metadata: {
        explanation:
          "To jedno z najcz\u0119stszych pyta\u0144 maturalnych do \u201eSk\u0105pca\u201d. Wymaga zar\u00f3wno analizy tekstu, jak i refleksji nad uniwersalno\u015bci\u0105 przes\u0142ania.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Harpagon jest archetypem sk\u0105pca w literaturze europejskiej. Kt\u00f3re zestawienie najpe\u0142niej pokazuje jego miejsce w tradycji literackiej?",
      content: {
        options: [
          "Harpagon pochodzi wy\u0142\u0105cznie z wyobra\u017ani Moli\u00e8ra, nie ma \u017cadnych poprzednik\u00f3w",
          "Tradycja si\u0119ga Eukaliona z \u201eAulularii\u201d Plauta (antyk), przez Harpagona (klasycyzm), po Scrooge\u2019a Dickensa (XIX w.) i Sknerusa McKwacza (kultura pop) \u2013 motyw chciwego starca chroni\u0105cego skarb jest uniwersalny",
          "Harpagon jest postaci\u0105 stricte realistyczn\u0105, nie ma nic wsp\u00f3lnego z tradycj\u0105 literack\u0105",
          "Tradycja sk\u0105pca w literaturze ko\u0144czy si\u0119 na Moli\u00e8rze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Harpagon wpisuje si\u0119 w d\u0142ug\u0105 tradycj\u0119: Eukalion (Plaut), Shylock (Szekspir), Scrooge (Dickens), Gobi\u0144ski (Balzac), Sknerus McKwacz (Disney). Motyw chciwego starca to archetyp literacki, kt\u00f3ry Moli\u00e8r dopi\u0142owa\u0142 do perfekcji.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Dlaczego \u201eSk\u0105piec\u201d, mimo konwencji komediowej, bywa interpretowany jako utw\u00f3r o tragicznym wymiarze?",
      content: {
        options: [
          "Bo Harpagon umiera na ko\u0144cu",
          "Bo Harpagon, mimo szcz\u0119\u015bliwego zako\u0144czenia dla m\u0142odych, pozostaje wi\u0119\u017aniem obsesji \u2013 odchodzi sam ze szkatulk\u0105, niezdolny do mi\u0142o\u015bci, a jego nieuleczalna choroba czyni go postaci\u0105 \u017ca\u0142osn\u0105, nie tylko \u015bmieszen\u0105",
          "Bo m\u0142odzi bohaterowie nie s\u0105 naprawd\u0119 szcz\u0119\u015bliwi",
          "Bo Ko\u015bci\u00f3\u0142 zakaza\u0142 wystawiania tej komedii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tragizm Harpagona polega na nieodwracalno\u015bci: w odr\u00f3\u017cnieniu od Orgona (\u015awi\u0119toszek), kt\u00f3ry przejrza\u0142 na oczy, Harpagon NIE zmienia si\u0119. Odchodzi sam z szkatulk\u0105, podczas gdy wszyscy inni \u015bwi\u0119tuj\u0105. To czyni komedi\u0119 gorzk\u0105 \u2013 \u015bmiech znika, zostaje lito\u015b\u0107.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Kt\u00f3re z poni\u017cszych por\u00f3wna\u0144 \u201eSk\u0105pca\u201d z innymi dzie\u0142ami s\u0105 merytorycznie uzasadnione?",
      content: {
        options: [
          "Harpagon i Scrooge Dickensa \u2013 obaj s\u0105 archetypami sk\u0105pc\u00f3w, ale Scrooge si\u0119 nawraca, Harpagon \u2013 nigdy",
          "Harpagon i Sokolniki (\u201eSok\u00f3\u0142 Federiga\u201d Boccaccia) \u2013 obaj traktuj\u0105 przedmiot materialny jako najcenniejsz\u0105 w\u0142asno\u015b\u0107",
          "\u201eSk\u0105piec\u201d i \u201eLalka\u201d Prusa \u2013 obie komedie krytykuj\u0105 materializm spo\u0142ecze\u0144stwa",
          "Harpagon i Orgon (\u201e\u015awi\u0119toszek\u201d) \u2013 obaj ojcowie-tyrani, ale Orgon jest manipulowany przez innych, Harpagon sam jest \u017ar\u00f3d\u0142em z\u0142a",
        ],
      },
      correctAnswer: [0, 3],
      metadata: {
        explanation:
          "Harpagon vs. Scrooge \u2013 trafne: obaj sk\u0105pcy, ale Dickens daje nadzieję na nawrócenie. Harpagon vs. Orgon \u2013 trafne: obaj tyrani, ale r\u00f3\u017cne \u017ar\u00f3d\u0142a za\u015blepienia. \u201eLalka\u201d nie jest komedi\u0105 (gatunek nie pasuje). Federigo w \u201eSokole\u201d oddaje soko\u0142a z mi\u0142o\u015bci \u2013 to odwrotno\u015b\u0107 Harpagona.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Czy Harpagon jest postaci\u0105 wy\u0142\u0105cznie komiczn\u0105, czy te\u017c budzi wsp\u00f3\u0142czucie? Przedstaw argumenty obu stron.",
      content: {},
      correctAnswer:
        "Za postaci\u0105 wy\u0142\u0105cznie komiczn\u0105: Harpagon jest karykatur\u0105 \u2013 przejaskrawione sk\u0105pstwo, \u0142apanie siebie za r\u0119k\u0119, groteskowa rywalizacja z synem. Ca\u0142a komedia jest fars\u0105, a Harpagon \u2013 jej motorem. Za wsp\u00f3\u0142czuciem: Harpagon jest wi\u0119\u017aniem obsesji, kt\u00f3rej nie potrafi pokona\u0107. Jest samotny \u2013 \u017cona nie \u017cyje, dzieci go nienawidz\u0105, s\u0142u\u017cba nim gardzi. Ko\u0144czy sam ze szkatulk\u0105, gdy wszyscy \u015bwi\u0119tuj\u0105. Boy-\u017bele\u0144ski widzi w nim cz\u0142owieka na kraw\u0119dzi \u2013 \u201epowstrzymywanego resztkami wzgl\u0119d\u00f3w\u201d. Moja ocena: Moli\u00e8r \u015bwiadomie balansuje mi\u0119dzy fars\u0105 a goryczk\u0105 \u2013 Harpagon jest \u015bmieszny i \u017ca\u0142osny jednocze\u015bnie. To tragikomedia w obr\u0119bie komedii.",
      metadata: {
        explanation:
          "Pytanie wymaga dojrza\u0142ej interpretacji. Najlepsza odpowied\u017a unika prostej dychotomii \u201ekomiczny vs. tragiczny\u201d i dostrzega z\u0142o\u017cono\u015b\u0107.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Dlaczego \u201eSk\u0105piec\u201d Moli\u00e8ra pozostaje aktualny? Wska\u017c wsp\u00f3\u0142czesne zjawiska odpowiadaj\u0105ce obsesji Harpagona.",
      content: {},
      correctAnswer:
        "\u201eSk\u0105piec\u201d jest aktualny, bo mechanizm obsesji materialnej jest ponadczasowy: 1) Konsumpcjonizm \u2013 gromadzenie rzeczy jako substytut szcz\u0119\u015bcia. 2) Uzale\u017cnienie od pieni\u0119dzy \u2013 ludzie po\u015bwi\u0119caj\u0105cy rodzin\u0119 i zdrowie dla kariery i bogactwa. 3) Sp\u00f3\u0142ki rodzinne \u2013 konflikty o maj\u0105tek niszcz\u0105ce wi\u0119zi. 4) \u201eSk\u0105pstwo cyfrowe\u201d \u2013 obsesja optymalizowania wydatk\u00f3w, kolekcjonowania punkt\u00f3w i kupon\u00f3w. 5) \u0141atwierno\u015b\u0107 wobec pochlebstwa (Frozyna) \u2013 marketing i reklama manipuluj\u0105 ludzkimi pragnieniami dok\u0142adnie tak jak swatka manipuluje Harpagonem. Uniwersalno\u015b\u0107: pytanie \u201eczy pieni\u0105dze daj\u0105 szcz\u0119\u015bcie?\u201d nie traci aktualno\u015bci.",
      metadata: {
        explanation:
          "Pytanie o aktualno\u015b\u0107 wymaga przeniesienia motyw\u00f3w XVII-wiecznych na wsp\u00f3\u0142czesno\u015b\u0107. Harpagon jest archetypem \u2013 jego cechy rozpoznajemy w ka\u017cdej epoce.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question: "Napisz notatk\u0119 analityczn\u0105 na podany temat:",
      content: {
        topic:
          "Harpagon i Orgon \u2013 dwa portrety za\u015blepienia u Moli\u00e8ra",
        requirements: [
          "Por\u00f3wnaj \u017ar\u00f3d\u0142a za\u015blepienia obu bohater\u00f3w",
          "Wska\u017c r\u00f3\u017cnice w ich zdolno\u015bci do przemiany",
          "Oce\u0144, kt\u00f3ra obsesja jest bardziej destrukcyjna",
          "Odwo\u0142aj si\u0119 do konkretnych scen z obu komedii",
          "140-180 s\u0142\u00f3w",
        ],
        wordLimit: { min: 140, max: 180 },
      },
      correctAnswer:
        "Orgon (\u201e\u015awi\u0119toszek\u201d) jest za\u015blepiony cz\u0142owiekiem (Tartuffem) \u2013 szuka duchowego przewodnika i daje si\u0119 manipulowa\u0107. Harpagon (\u201eSk\u0105piec\u201d) jest za\u015blepiony rzecz\u0105 (pieni\u0105dzmi) \u2013 nie potrzebuje manipulatora, sam jest \u017ar\u00f3d\u0142em zniszczenia. R\u00f3\u017cnica kluczowa: Orgon potrafi si\u0119 zmieni\u0107 \u2013 scena pod sto\u0142em otwiera mu oczy, przejrza\u0142 i \u017ca\u0142uje. Harpagon NIE zmienia si\u0119 \u2013 odchodzi z szkatulk\u0105, nie uczestnicz\u0105c w rado\u015bci rodziny. Za\u015blepienie Orgona mo\u017cna wyleczy\u0107 (bo dotyczy relacji z cz\u0142owiekiem), za\u015blepienie Harpagona jest nieuleczalne (bo dotyczy rzeczy, kt\u00f3ra nie mo\u017ce zdradzi\u0107). Dlatego obsesja Harpagona jest bardziej destrukcyjna \u2013 jest samotno\u015bci\u0105 bez ratunku, podczas gdy Orgon wraca do rodziny.",
      metadata: {
        explanation:
          "Por\u00f3wnanie dw\u00f3ch wielkich komedii Moli\u00e8ra to doskona\u0142y temat syntetyczny \u2013 wymaga g\u0142\u0119bokiego zrozumienia obu dzie\u0142.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "BAROQUE",
      work: "Sk\u0105piec",
      question:
        "Relacje rodzinne w krzywym zwierciadle komedii. Om\u00f3w zagadnienie na podstawie \u201eSk\u0105pca\u201d Moli\u00e8ra. W swojej odpowiedzi uwzgl\u0119dnij r\u00f3wnie\u017c wybrany kontekst.",
      content: {
        thesis: "Rodzina Harpagona \u2013 obraz zniszczonych wi\u0119zi",
        structure: {
          introduction:
            "Postaw tez\u0119: Moli\u00e8r u\u017cywa krzywego zwierciad\u0142a komedii, by pokaza\u0107 prawdziwe konsekwencje tyranii rodzinnej",
          arguments_for:
            "Om\u00f3w: relacja ojciec-syn (rywalizacja, nienawiść, lichwa), relacja ojciec-c\u00f3rka (przymuszone ma\u0142\u017ce\u0144stwo), relacja z s\u0142u\u017cb\u0105 (g\u0142\u00f3d, podejrzliwo\u015b\u0107), zako\u0144czenie (Harpagon sam ze szkatulk\u0105)",
          arguments_against:
            "Rozwa\u017c: czy Moli\u00e8r przesadza? Czy komedia zniekszta\u0142ca prawd\u0119 o rodzinach XVII-wiecznych?",
          conclusion:
            "Wniosek: krzywe zwierciad\u0142o komedii nie zniekszta\u0142ca \u2013 ono wyr\u00f3\u017cnia. Odwo\u0142aj si\u0119 do kontekstu",
        },
        requirements: [
          "Minimum 400 s\u0142\u00f3w",
          "Odwo\u0142anie do co najmniej czterech scen z komedii",
          "Kontekst literacki (np. \u201e\u015awi\u0119toszek\u201d, \u201eAntygona\u201d, \u201eLalka\u201d, wsp\u00f3\u0142czesno\u015b\u0107)",
          "Poprawna argumentacja",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Om\u00f3wi\u0107 zniszczone relacje: ojciec-syn (rywalizacja o Mariann\u0119, lichwa, nienawiść), ojciec-c\u00f3rka (Eliza = \u201ezbędny przedmiot\u201d), ojciec-s\u0142u\u017cba (g\u0142\u00f3d, podejrzliwo\u015b\u0107). 2) Pokaza\u0107 ironiczne zako\u0144czenie (Harpagon sam ze szkatulk\u0105). 3) Rozwa\u017cy\u0107 rol\u0119 konwencji komediowej (wyolbrzymienie, ale celne). 4) Odwo\u0142a\u0107 si\u0119 do kontekstu: Orgon w \u201e\u015awi\u0119toszku\u201d, Kreon w \u201eAntygonie\u201d, wsp\u00f3\u0142czesne konflikty pokoleniowe.",
      metadata: {
        explanation:
          "To jedno z najcz\u0119stszych pyta\u0144 maturalnych do \u201eSk\u0105pca\u201d. Wymaga analizy relacji rodzinnych i refleksji nad gatunkiem komedii.",
      },
    },

    // ======================= KONIEC PYTA\u0143 Sk\u0105piec ===================//

    // ======================= POCZĄTEK PYTAŃ Powrót posła ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Kto jest autorem komedii \u201ePowr\u00f3t pos\u0142a\u201d?",
      content: {
        options: [
          "Ignacy Krasicki",
          "Julian Ursyn Niemcewicz",
          "Wojciech Bogus\u0142awski",
          "Stanis\u0142aw Trembecki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201ePowr\u00f3t pos\u0142a\u201d to komedia polityczna Juliana Ursyna Niemcewicza, napisana w 1790 roku i wystawiona w 1791. Powsta\u0142a w dobie Sejmu Czteroletniego (Wielkiego) jako g\u0142os w debacie o reformach.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "W jakim kontek\u015bcie historycznym powsta\u0142a komedia?",
      content: {
        options: [
          "Podczas insurekcji ko\u015bciuszkowskiej (1794)",
          "W dobie Sejmu Czteroletniego (1788\u20131792), jako propaganda na rzecz reform ustrojowych",
          "Podczas rozbioru Polski (1795)",
          "W okresie Ksi\u0119stwa Warszawskiego (1807)",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Komedia powsta\u0142a w 1790 r. podczas Sejmu Czteroletniego (Wielkiego). Niemcewicz, sam pose\u0142 inflancki, napisa\u0142 j\u0105 jako narz\u0119dzie propagandy stronnictwa patriotycznego, wspieraj\u0105c reformy: zniesienie liberum veto, dziedziczno\u015b\u0107 tronu, wzmocnienie w\u0142adzy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Gdzie rozgrywa si\u0119 akcja komedii?",
      content: {
        options: [
          "W Warszawie, w sejmie",
          "Na wsi, w dworku Podkomorzych",
          "W Krakowie, na zamku kr\u00f3lewskim",
          "W Pary\u017cu, na emigracji",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja rozgrywa si\u0119 na wsi, w dworku Podkomorzych, podczas przerwy w obradach Sejmu (limity). Zasada trzech jedno\u015bci: jedno miejsce, jeden dzie\u0144, jedna g\u0142\u00f3wna akcja.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kim jest tytu\u0142owy \u201epose\u0142\u201d, kt\u00f3ry wraca do domu?",
      content: {
        options: [
          "Starosta Gadulski",
          "Walery \u2013 syn Podkomorzego, pose\u0142 na Sejm Czteroletni",
          "Szarmancki",
          "Podkomorzy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tytu\u0142owym pos\u0142em jest Walery \u2013 syn Podkomorzych, m\u0142ody pose\u0142 na Sejm Czteroletni, zwolennik reform, zakochany w Teresie. Jego powr\u00f3t do domu rodzinnego jest punktem wyj\u015bcia akcji.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Jak ko\u0144czy si\u0119 komedia?",
      content: {
        options: [
          "Teresa wychodzi za Szarmanckiego",
          "Starosta nie zgadza si\u0119 na \u017caden \u015blub",
          "Szarmancki zostaje zdemaskowany jako \u0142owca posag\u00f3w, Starosta zgadza si\u0119 na \u015blub Teresy z Walerym, a Podkomorzy uwalnia ch\u0142op\u00f3w",
          "Walery wraca do Warszawy sam",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Szcz\u0119\u015bliwe zako\u0144czenie: Szarmancki \u017c\u0105da posagu i zostaje zdemaskowany. Starosta oddaje c\u00f3rk\u0119 Waleremu. Podkomorzy uwalnia ch\u0142op\u00f3w z podda\u0144stwa \u2013 akt symboliczny, zgodny z ide\u0105 reform o\u015bwieceniowych.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Jakim gatunkiem literackim jest \u201ePowr\u00f3t pos\u0142a\u201d?",
      content: {
        options: [
          "Tragedia klasyczna",
          "Komedia polityczna (i obyczajowa) w trzech aktach, pisana wierszem",
          "Powie\u015b\u0107 epistolarna",
          "Powiastka filozoficzna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To komedia polityczna i obyczajowa \u2013 pierwsza polska komedia tego typu. Napisana wierszem (trzynastozg\u0142oskowcem), w trzech aktach, z zachowaniem zasady trzech jedno\u015bci. \u0141\u0105czy intryg\u0119 mi\u0142osn\u0105 z debat\u0105 polityczn\u0105.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Po\u0142\u0105cz postacie z ich rolami:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Podkomorzy" },
          { id: "B", text: "Starosta Gadulski" },
          { id: "C", text: "Szarmancki" },
          { id: "D", text: "Staro\u015bcina" },
        ],
        rightColumn: [
          {
            id: "1",
            text: "Fircyk, \u0142owca posag\u00f3w, bywaj\u0105cy za granic\u0105",
          },
          { id: "2", text: "O\u015bwiecony patriota, zwolennik reform" },
          {
            id: "3",
            text: "\u201eDama modna\u201d, m\u00f3wi\u0105ca po francusku",
          },
          { id: "4", text: "Konserwatysta, gaduła, obro\u0144ca liberum veto" },
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
          "Podkomorzy to o\u015bwiecony patriota. Starosta Gadulski to konserwatysta broni\u0105cy starego porz\u0105dku. Szarmancki to fircyk-kosmopolita. Staro\u015bcina to \u201edama modna\u201d wychowana na wzorcach francuskich. Postacie tworz\u0105 kontrastowe pary.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re postacie nale\u017c\u0105 do obozu postępowego (patriotycznego)?",
      content: {
        options: [
          "Podkomorzy \u2013 o\u015bwiecony ojciec",
          "Walery \u2013 m\u0142ody pose\u0142 reformator",
          "Podkomorzyna \u2013 dobra matka i \u017cona",
          "Szarmancki \u2013 fircyk podró\u017cuj\u0105cy po Europie",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Ob\u00f3z postępowy: Podkomorzy (patriota), Walery (pose\u0142), Podkomorzyna (dobra matka), Teresa (cnotliwa c\u00f3rka). Szarmancki nale\u017cy do obozu negatywnego \u2013 jest fircykiem, kt\u00f3ry nie interesuje si\u0119 ojczyzn\u0105.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re z poni\u017cszych stwierdze\u0144 o \u201ePowrocie pos\u0142a\u201d s\u0105 prawdziwe?",
      content: {
        options: [
          "To pierwsza polska komedia polityczna",
          "Powsta\u0142a w dobie Sejmu Czteroletniego (1790)",
          "Postacie tworz\u0105 kontrastowe pary: patrioci vs. konserwaty\u015bci",
          "Akcja rozgrywa si\u0119 w Pary\u017cu na dworze kr\u00f3lewskim",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Komedia z 1790 r. to pierwsza polska komedia polityczna. Postacie tworz\u0105 pary kontrastowe (Podkomorzy vs. Gadulski, Walery vs. Szarmancki, Podkomorzyna vs. Staro\u015bcina). Akcja toczy si\u0119 na wsi u Podkomorzych, NIE w Pary\u017cu.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "O kogo rywalizuj\u0105 Walery i Szarmancki? Co ich r\u00f3\u017cni?",
      content: {},
      correctAnswer:
        "Walery i Szarmancki rywalizuj\u0105 o r\u0119k\u0119 Teresy, c\u00f3rki Starosty Gadulskiego. Walery to m\u0142ody pose\u0142, patriota, zwolennik reform, szczerze zakochany \u2013 rezygnuje z posagu. Szarmancki to fircyk, podró\u017cnik po Europie (Pary\u017c, Anglia), \u0142owca posag\u00f3w, kt\u00f3ry interesuje si\u0119 tylko pieni\u0119dzmi Teresy. Kontrast mi\u0119dzy nimi to kontrast mi\u0119dzy obywatelem a pr\u00f3\u017cniakiem.",
      metadata: {
        explanation:
          "Rywalizacja o Teres\u0119 to g\u0142\u00f3wna intryga komedii, ale s\u0142u\u017cy ona demaskacji charakter\u00f3w: patriota vs. fircyk, cnota vs. pr\u00f3\u017cno\u015b\u0107.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Starosta Gadulski p\u0142acze nad zniesieniem liberum veto, nazywaj\u0105c je \u201ewolno\u015bci \u017arenic\u0105\u201d. Jak\u0105 postaw\u0119 polityczn\u0105 reprezentuje?",
      content: {
        options: [
          "Postępow\u0105 \u2013 chce modernizowa\u0107 Polsk\u0119",
          "Konserwatywn\u0105 \u2013 broni starego porz\u0105dku (liberum veto, wolna elekcja, nieograniczonych przywilej\u00f3w szlacheckich) i idealizuje przesz\u0142o\u015b\u0107",
          "Rewolucyjn\u0105 \u2013 chce obali\u0107 monarchi\u0119",
          "Obojetn\u0105 \u2013 nie interesuje si\u0119 polityk\u0105",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Gadulski to karykatura konserwatywnego sarmaty: broni liberum veto (\u201ewolno\u015bci \u017arenicy\u201d), wolnej elekcji (bo przynosi\u0142a korzy\u015bci szlachcie), idealizuje czasy August\u00f3w. Niemcewicz o\u015bmiesza t\u0119 postaw\u0119 jako przyczyn\u0119 upadku Polski.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Podkomorzy m\u00f3wi: \u201eDom zawsze ust\u0119powa\u0107 powinien krajowi\u201d. Co to zdanie oznacza?",
      content: {
        options: [
          "Trzeba sprzeda\u0107 dom i wyjecha\u0107 za granic\u0119",
          "Interes prywatny (dom, rodzina) powinien ust\u0105pi\u0107 interesowi publicznemu (ojczyzna, kraj) \u2013 to dewiza patriotyczna",
          "Dom jest mniej wart ni\u017c ziemia",
          "Krajobraz jest wa\u017cniejszy ni\u017c architektura",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201eDom zawsze ust\u0119powa\u0107 powinien krajowi\u201d to kluczowa dewiza Podkomorzego i ca\u0142ego obozu patriotycznego: interes prywatny musi ust\u0105pi\u0107 dobru wsp\u00f3lnemu. To o\u015bwieceniowy idea\u0142 obywatelski.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Jak Szarmancki sp\u0119dzi\u0142 czas za granic\u0105?",
      content: {
        options: [
          "Studiowa\u0142 prawo i nauki polityczne",
          "Kupowa\u0142 sprz\u0105czki, guziki, ogl\u0105da\u0142 wy\u015bcigi koni, bawi\u0142 si\u0119 \u2013 nie interesowa\u0142 si\u0119 ani rewolucj\u0105 francusk\u0105, ani parlamentem angielskim",
          "Walczy\u0142 w wojnach jako \u017co\u0142nierz",
          "Prowadzi\u0142 misj\u0119 dyplomatyczn\u0105 w imieniu kr\u00f3la",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Szarmancki by\u0142 we Francji i Anglii, ale rewolucja francuska go nudzi\u0142a (\u201ew Pary\u017cu jakie teraz nudy!\u201d), a z Anglii przywiózł tylko sprz\u0105czki i szpad\u0119 stalow\u0105. Nie interesowa\u0142 si\u0119 ustrojami ani filozofi\u0105 \u2013 typowy fircyk-kosmopolita.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Dlaczego Podkomorzy krytykuje \u201emodne wychowanie\u201d?",
      content: {
        options: [
          "Bo nie lubi Francuz\u00f3w z osobistych powod\u00f3w",
          "Bo wychowywanie polskich dzieci na wz\u00f3r francuski sprawia, \u017ce nie znaj\u0105 w\u0142asnego j\u0119zyka, historii i obowi\u0105zk\u00f3w obywatelskich \u2013 \u201ewidz\u0105 cudzoziemki we w\u0142asnym kraju\u201d",
          "Bo uwa\u017ca, \u017ce dzieci nie powinny si\u0119 uczy\u0107",
          "Bo chce, \u017ceby dzieci uczy\u0142y si\u0119 wy\u0142\u0105cznie \u0142aciny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Podkomorzy krytykuje wychowanie \u201emodne\u201d (francuskie): mamki z zagranicy, guwernantki-Francuzki, brak znajomo\u015bci w\u0142asnego j\u0119zyka i historii. M\u0142odzie\u017c \u201ewie dobrze kto jest Vestris, nie wie kto Batory\u201d. Staro\u015bcina jest \u017cywym przyk\u0142adem takiego wychowania.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Dlaczego Szarmancki ostatecznie traci szans\u0119 na po\u015blubienie Teresy?",
      content: {
        options: [
          "Teresa ucieka z domu",
          "Szarmancki \u017c\u0105da posagu na pi\u015bmie, czym demaskuje si\u0119 jako \u0142owca posag\u00f3w \u2013 Starosta, kt\u00f3ry nie chce da\u0107 posagu, cofa zgod\u0119",
          "Walery zabija Szarmanckiego w pojedynku",
          "Kr\u00f3l zabrania \u015blubu dekretem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kluczowy zwrot akcji: Szarmancki \u017c\u0105da intercyzy z posagiem. Staro\u015bcina zapewnia\u0142a wcze\u015bniej, \u017ce \u201enie my\u015bli o posagu, gdy kto kocha szczerze\u201d. Gadulski, sk\u0105py na pieni\u0105dze, cofa zgod\u0119. Komizm: sk\u0105pstwo ojca ratuje c\u00f3rk\u0119 przed z\u0142ym ma\u0142\u017ce\u0144stwem.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re z poni\u017cszych reform popiera Podkomorzy (ob\u00f3z patriotyczny)?",
      content: {
        options: [
          "Zniesienie liberum veto i sejm gotowy (sta\u0142y)",
          "Sojusz z mocarstwem s\u0105siednim (Prusy) zamiast izolacji",
          "Wzmocnienie armii i podatki na obronno\u015b\u0107",
          "Utrzymanie wolnej elekcji i starych przywilej\u00f3w szlacheckich",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Podkomorzy popiera: zniesienie liberum veto, sejm sta\u0142y, sojusz z Prusami, wzmocnienie armii, podatki. Jest PRZECIWNY wolnej elekcji i starym przywilejom \u2013 to stanowisko Gadulskiego.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re wady szlachty XVIII-wiecznej o\u015bmiesza Niemcewicz?",
      content: {
        options: [
          "Konserwatyzm i idealizacj\u0119 przesz\u0142o\u015bci (Gadulski)",
          "Kosmopolityzm i pogard\u0119 dla w\u0142asnego kraju (Szarmancki, Staro\u015bcina)",
          "\u0141owienie posag\u00f3w i fa\u0142szywa mi\u0142o\u015b\u0107 (Szarmancki)",
          "Mi\u0142o\u015b\u0107 do ojczyzny i ch\u0119\u0107 reform (Podkomorzy)",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Niemcewicz o\u015bmiesza: konserwatyzm Gadulskiego, kosmopolityzm Staro\u015bciny i Szarmanckiego, \u0142owienie posag\u00f3w. Mi\u0142o\u015b\u0107 do ojczyzny (Podkomorzy) NIE jest o\u015bmieszana \u2013 to idea\u0142 pozytywny.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re z poni\u017cszych cech Staro\u015bciny wyst\u0119puj\u0105 w komedii?",
      content: {
        options: [
          "M\u00f3wi mieszanin\u0105 polskiego i francuskiego (\u201ela t\u00eate m\u2019a fait mal\u201d)",
          "Czyta \u201eNoce\u201d Younga i sentymentalne romanse",
          "Chce, \u017ceby m\u0105\u017c zburzy\u0142 karczmę i postawi\u0142 kaskad\u0119",
          "Jest dobr\u0105 gospodyn\u0105 i matk\u0105",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Staro\u015bcina to \u201edama modna\u201d: mówi po francusku, czyta sentymentalne romanse (Young), chce kaskad\u0119 zamiast karczmy. NIE jest dobr\u0105 gospodyni\u0105 \u2013 to Podkomorzyna pe\u0142ni t\u0119 rol\u0119.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Jak\u0105 funkcj\u0119 pe\u0142ni\u0105 kontrastowe pary postaci w komedii?",
      content: {},
      correctAnswer:
        "Postacie tworz\u0105 kontrastowe pary: Podkomorzy (patriota, o\u015bwiecony) vs. Gadulski (konserwatysta, gaduła); Walery (uczciwy pose\u0142) vs. Szarmancki (fircyk, \u0142owca posag\u00f3w); Podkomorzyna (dobra \u017cona i matka) vs. Staro\u015bcina (dama modna). Kontrast s\u0142u\u017cy dydaktyce: widz ma jasno widzie\u0107, kt\u00f3ra postawa jest w\u0142a\u015bciwa (patriotyczna), a kt\u00f3ra z\u0142a (konserwatywna/kosmopolityczna). To typowa metoda komedii o\u015bwieceniowej.",
      metadata: {
        explanation:
          "Kontrastowe pary to kluczowy zabieg Niemcewicza \u2013 nawiązuje do tradycji Moli\u00e8ra i Bohomolca. Sam autor pisa\u0142: \u201etrzeba zebraćbłędy i umie\u015bci\u0107 je w jednej osobie\u201d.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Dlaczego Starosta Gadulski broni wolnej elekcji? Podaj jego argumenty.",
      content: {},
      correctAnswer:
        "Gadulski broni wolnej elekcji, bo przynosi\u0142a szlachcie OSOBISTE korzy\u015bci: \u201ekandydaci tworz\u0105 partie\u201d, jeden m\u00f3wi \u201ekochany panie Piotrze, b\u0105d\u017a ze mn\u0105, t\u0119 wiosk\u0119 we\u017a w dzier\u017caw\u0119\u201d, drugi \u201epuszcza zastaw\u0119\u201d, trzeci \u201edaje sum\u0119, i tak cz\u0142ek si\u0119 zapomoże\u201d. Przyznaje nawet, \u017ce \u201emo\u017ce z tego przyjść do czub\u00f3w\u201d \u2013 ale \u201eobce wojsko jak wkroczy, to wszystko pogodzi\u201d. Niemcewicz o\u015bmiesza Gadulskiego: jego \u201epatriotyzm\u201d to egoizm, a \u201ewolno\u015b\u0107\u201d to przywilej korupcji.",
      metadata: {
        explanation:
          "Argumenty Gadulskiego za woln\u0105 elekcj\u0105 s\u0105 absurdalne i samodemaskuj\u0105ce \u2013 to komizm s\u0142owny: bohater nie zdaje sobie sprawy, \u017ce sam siebie o\u015bmiesza.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Kim jest Teresa i jaka jest jej rola w komedii?",
      content: {},
      correctAnswer:
        "Teresa to c\u00f3rka Starosty Gadulskiego z pierwszego ma\u0142\u017ce\u0144stwa, wychowana u Podkomorzych. Jest skromna, cnotliwa, kocha Walerego. Reprezentuje idea\u0142 o\u015bwieceniowy: \u201espokojne \u017cycie nad przepych przek\u0142adam\u201d. W komedii pe\u0142ni rol\u0119 biernej ofiary konfliktu ojca z dobrodziej\u0105cami \u2013 musi s\u0142ucha\u0107 ojca, kt\u00f3ry chce j\u0105 wyda\u0107 za Szarmanckiego. Jej \u015blub z Walerym jest nagrod\u0105 za cnot\u0119.",
      metadata: {
        explanation:
          "Teresa to \u201epanna cnoty\u201d \u2013 pozytywna bohaterka, przeciwie\u0144stwo Staro\u015bciny. Jej wychowanie u Podkomorzych (nie u macochy!) jest kluczowe.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Niemcewicz celowo czyni postacie pozytywne (Podkomorzy, Walery) schematycznymi i bezbarwnymi, a negatywne (Gadulski, Szarmancki, Staro\u015bcina) \u2013 \u017cywymi i komicznymi. Dlaczego?",
      content: {
        options: [
          "Niemcewicz nie umia\u0142 pisa\u0107 postaci pozytywnych",
          "To celowy zabieg dydaktyczny: postacie negatywne musz\u0105 by\u0107 \u015bmieszne, by odbiorca nabra\u0142 do nich wstr\u0119tu; pozytywne s\u0105 \u201ewzorcami\u201d, nie musz\u0105 bawi\u0107 \u2013 maj\u0105 przekonywa\u0107",
          "Komedia mia\u0142a by\u0107 wystawiana tylko dla dzieci",
          "Cenzura nie pozwoli\u0142a na \u017cywe postacie pozytywne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To s\u0142abo\u015b\u0107 i jednocze\u015bnie \u015bwiadomy zabieg: Niemcewicz pisa\u0142, \u017ce \u201etrzeba zebra\u0107 b\u0142\u0119dy i umie\u015bci\u0107 je w jednej osobie, by wady by\u0142y tym wydatniejsze\u201d. Postacie negatywne to karykatury \u2013 maj\u0105 o\u015bmiesza\u0107. Pozytywne to wskaz\u00f3wki \u2013 maj\u0105 uczy\u0107.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Staro\u015bcina pisze bilet: \u201eG\u0142owa \u017ale mi robi\u0142a\u201d. Podkomorzy pyta: \u201eco za wyraz nowy?\u201d. Jaka jest funkcja tej sceny?",
      content: {
        options: [
          "Pokazuje, \u017ce Podkomorzy jest niewykszta\u0142cony",
          "O\u015bmiesza modne wychowanie francuskie: Staro\u015bcina nie umie napisa\u0107 poprawnego zdania po polsku, bo \u201et\u0142umaczy z francuskiego\u201d (la tête m\u2019a fait mal) \u2013 to karykatura kosmopolityzmu",
          "Pokazuje, \u017ce Staro\u015bcina jest chora",
          "To b\u0142\u0105d drukarza w tek\u015bcie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena z biletem to komizm s\u0142owny: Staro\u015bcina nie mówi po polsku, tylko t\u0142umaczy z francuskiego. Niemcewicz o\u015bmiesza kosmopolityzm \u2013 \u201ecudzoziemki we w\u0142asnym kraju\u201d.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "W ostatniej scenie Podkomorzy uwalnia ch\u0142op\u00f3w z podda\u0144stwa. Jaka jest funkcja tego aktu w kontek\u015bcie reformatorskiego przes\u0142ania komedii?",
      content: {
        options: [
          "To jedynie gest grzeczno\u015bci wobec s\u0142u\u017cby",
          "To symbol reformatorskich ide\u0105\u0142\u00f3w o\u015bwiecenia: prawa cz\u0142owieka, zniesienie podda\u0144stwa, patriotyzm \u0142\u0105cz\u0105cy si\u0119 z humanitaryzmem; Podkomorzy woli by\u0107 \u201eojcem\u201d ni\u017c \u201epanem\u201d",
          "To kara za z\u0142e zachowanie ch\u0142op\u00f3w",
          "To element farsy bez g\u0142\u0119bszego znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Uwolnienie ch\u0142op\u00f3w to kulminacja przes\u0142ania: o\u015bwiecony patriota nie tylko reformuje pa\u0144stwo, ale te\u017c traktuje ludzi po ludzku. Podkomorzy mówi: \u201eby\u0107 raczej ojcem, ani\u017celi panem\u201d. To idea\u0142 Rousseau i encyklopedyst\u00f3w.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Niemcewicz nawi\u0105zuje w budowie komedii do tradycji Moli\u00e8ra i Bohomolca. Kt\u00f3re elementy s\u0105 typowe dla tej tradycji?",
      content: {
        options: [
          "Postacie jako \u201etypy\u201d (jedna cecha), kontrastowe pary, intryga mi\u0142osna, szcz\u0119\u015bliwe zako\u0144czenie, zasada trzech jedno\u015bci",
          "Realistyczne, g\u0142\u0119bokie postacie psychologiczne i tragiczne zako\u0144czenie",
          "Forma powiastki filozoficznej z narrator-komentarzem",
          "Akcja rozci\u0105gni\u0119ta na kilka lat w r\u00f3\u017cnych krajach",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Niemcewicz czerpie z Moli\u00e8ra (postacie-typy, kontrasty) i Bohomolca (uparty szlachcic, fircyk, sprytna s\u0142u\u017c\u0105ca, intryga mi\u0142osna na wsi). Nowos\u0107: dodaje w\u0105tek polityczny \u2013 st\u0105d \u201ekomedia polityczna\u201d.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re rodzaje komizmu wyst\u0119puj\u0105 w \u201ePowrocie pos\u0142a\u201d?",
      content: {
        options: [
          "Komizm postaci: Gadulski \u2013 gaduła, Staro\u015bcina \u2013 dama modna, Szarmancki \u2013 fircyk",
          "Komizm s\u0142owny: Staro\u015bcina m\u00f3wi mieszanin\u0105 polsko-francusk\u0105, Gadulski sam siebie o\u015bmiesza argumentami",
          "Komizm sytuacyjny: Szarmancki zdemaskowany jako \u0142owca posag\u00f3w, sk\u0105pstwo Gadulskiego ratuje c\u00f3rk\u0119",
          "Komizm tragiczny: bohaterowie gin\u0105 w finale",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Trzy typy komizmu: postaci (karykatury), s\u0142owny (francuszczyzna Staro\u015bciny, gadanie Gadulskiego) i sytuacyjny (ironia: sk\u0105pstwo ojca ratuje c\u00f3rk\u0119). Nikt nie ginie \u2013 to komedia.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re problemy polityczne dyskutowane na Sejmie Czteroletnim pojawiaj\u0105 si\u0119 w komedii?",
      content: {
        options: [
          "Liberum veto vs. g\u0142osowanie wi\u0119kszo\u015bci\u0105",
          "Wolna elekcja vs. sukcesja tronu",
          "Sojusze zagraniczne (Prusy vs. izolacja)",
          "Budowa kolei \u017celaznej i fabrykzydzeń",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Komedia porusza: liberum veto (Gadulski broni, Podkomorzy atakuje), sukcesj\u0119 tronu (Gadulski: \u201ego\u015bci\u0142o\u017c si\u0119 o sukcesji gada\u0107?\u201d), sojusze (Podkomorzy za Prusami, Gadulski za izolacj\u0105). Kolej \u017celazna nie istnia\u0142a w XVIII w.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re cechy zasady trzech jedno\u015bci s\u0105 zachowane w komedii?",
      content: {
        options: [
          "Jedno\u015b\u0107 miejsca \u2013 dworek Podkomorzych",
          "Jedno\u015b\u0107 czasu \u2013 jeden dzie\u0144",
          "Jedno\u015b\u0107 akcji \u2013 rywalizacja o r\u0119k\u0119 Teresy + debata polityczna",
          "Podzia\u0142 na trzy akty",
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          "Komedia zachowuje klasyczn\u0105 zasad\u0119 trzech jedno\u015bci i ma trzy akty (nie pi\u0119\u0107 jak u Moli\u00e8ra). To zgodne z poetyk\u0105 o\u015bwieceniow\u0105.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Por\u00f3wnaj Podkomorzyn\u0119 i Staro\u015bcin\u0119. Co reprezentuj\u0105?",
      content: {},
      correctAnswer:
        "Podkomorzyna: dobra \u017cona i matka, kocha Polsk\u0119, m\u00f3wi po polsku, wspiera m\u0119\u017ca w patriotyzmie, wychowa\u0142a Teres\u0119 na cnotliw\u0105 dziewczyn\u0119, wspiera reformy. Staro\u015bcina: \u201edama modna\u201d \u2013 mówi mieszanin\u0105 polsko-francusk\u0105, czyta sentymentalne romanse (Young), chce kaskad\u0119 zamiast karczmy, op\u0142akuje zmar\u0142ego Szambelana (elegia!), nie jest ani dobr\u0105 \u017con\u0105, ani matk\u0105. Kontrast: Podkomorzyna = idea\u0142 o\u015bwieceniowy, Staro\u015bcina = karykatura kosmopolityzmu i sentymentalizmu.",
      metadata: {
        explanation:
          "Para Podkomorzyna/Staro\u015bcina to lustrzane odbicie: cnota vs. pr\u00f3\u017cno\u015b\u0107, patriotyzm vs. kosmopolityzm, rozum vs. romanse.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Czym r\u00f3\u017cni si\u0119 \u201ePowr\u00f3t pos\u0142a\u201d od komedii Moli\u00e8ra (np. \u201eSk\u0105pca\u201d)?",
      content: {},
      correctAnswer:
        "Podobie\u0144stwa: kontrastowe pary postaci (typ\u00f3w), komizm charakter\u00f3w, intryga mi\u0142osna, zasada trzech jedno\u015bci. R\u00f3\u017cnice: 1) U Niemcewicza polityka jest wa\u017cniejsza od fabu\u0142y \u2013 dialogi polityczne zdominuj\u0105 intryg\u0119 mi\u0142osn\u0105. 2) Pisana wierszem (trzynastozg\u0142oskowiec), nie proz\u0105. 3) Cel propagandowy \u2013 komedia ma przekonywa\u0107 do reform, nie tylko bawi\u0107. 4) Postacie pozytywne s\u0105 schematyczne (s\u0142abo\u015b\u0107 vs. Moli\u00e8r, u kt\u00f3rego r\u00f3wnie\u017c bohaterowie negatywni s\u0105 \u017cywsi).",
      metadata: {
        explanation:
          "Niemcewicz czerpie z Moli\u00e8ra, ale dodaje wymiar polityczny \u2013 co czyni z \u201ePowrotu pos\u0142a\u201d coś nowego: polsk\u0105 komedi\u0119 polityczn\u0105.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Jaka jest funkcja elegii na \u015bmier\u0107 Szambelana czytanej przez Szarmanckiego?",
      content: {},
      correctAnswer:
        "Elegia na \u015bmier\u0107 Szambelana, kt\u00f3ry zgin\u0105\u0142 wypadaj\u0105c z kariolki, to parodia sentymentalnej poezji. Szambelan umiera za sprzączki, fraki i kariolki \u2013 a elegia op\u0142akuje go jak bohatera (\u201eP\u0142aczcie, amorkil\u201d). Staro\u015bcina p\u0142acze, Szarmancki wzrusza si\u0119 \u2013 oboje traktuj\u0105 absurdaln\u0105 \u015bmier\u0107 fircyka jak tragedi\u0119. Funkcja: o\u015bmieszenie pustej wrażliwości, sentymentalizmu i \u015bmierci za nic \u2013 kontrast ze \u015bmierci\u0105 za ojczyzn\u0119 (idea\u0142 patriotyczny).",
      metadata: {
        explanation:
          "Elegia to arcydzie\u0142o komizmu s\u0142ownego: patos zastosowany do absurdalnej \u015bmierci fircyka. Niemcewicz parodiuje sentymentalizm i pr\u00f3\u017cno\u015b\u0107.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "Dwa modele sarmaty w \u201ePowrocie pos\u0142a\u201d: Podkomorzy vs. Gadulski",
        requirements: [
          "Scharakteryzuj oba modele",
          "Wska\u017c r\u00f3\u017cnice w pogl\u0105dach politycznych",
          "Oce\u0144, kt\u00f3ry model Niemcewicz propaguje",
          "80-120 s\u0142\u00f3w",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Podkomorzy to \u201esarmata idealny\u201d (o\u015bwiecony): patriota, zwolennik reform (zniesienie liberum veto, sejm sta\u0142y, sojusz z Prusami, wzmocnienie armii), szanuje prawa cz\u0142owieka, uwalnia ch\u0142op\u00f3w. Dewiza: \u201eDom zawsze ust\u0119powa\u0107 powinien krajowi\u201d. Gadulski to \u201esarmata realny\u201d (zacofany): broni liberum veto (\u201ewolno\u015bci \u017arenicy\u201d), wolnej elekcji (bo przynosi \u0142ap\u00f3wki), idealizuje przesz\u0142o\u015b\u0107 (\u201eza August\u00f3w\u201d), gardzi reformami. Niemcewicz propaguje model Podkomorzego: komedia o\u015bmiesza Gadulskiego, a chwali Podkomorzego.",
      metadata: {
        explanation:
          "Dwa modele sarmaty to centralny konflikt komedii. Niemcewicz pokazuje, \u017ce sarmatyzm mo\u017ce by\u0107 patriotyczny (Podkomorzy) lub szkodliwy (Gadulski).",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "\u201ePowr\u00f3t pos\u0142a\u201d bywa nazywany \u201esztuk\u0105 propagandow\u0105\u201d. Jak to wp\u0142ywa na ocen\u0119 artystyczn\u0105 komedii?",
      content: {
        options: [
          "Propaganda wyklucza warto\u015b\u0107 artystyczn\u0105",
          "Funkcja propagandowa os\u0142abia walory literackie (postacie schematyczne, dialogi polityczne dominuj\u0105 nad fabu\u0142\u0105), ale w kontek\u015bcie historycznym komedia spe\u0142ni\u0142a swoj\u0105 rol\u0119: wp\u0142yn\u0119\u0142a na opini\u0119 publiczn\u0105 i wspiera\u0142a dzie\u0142o reform",
          "Propaganda nie ma \u017cadnego wp\u0142ywu na walory artystyczne",
          "Komedia nie ma \u017cadnego zwi\u0105zku z propagand\u0105",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Klimowicz pisa\u0142: \u201ebohaterowie pozytywni s\u0105 schematyczni i bezbarwni, prawdziwie udane s\u0105 postacie negatywne\u201d. To cena propagandy. Ale komedia spe\u0142ni\u0142a swoj\u0105 funkcj\u0119: zdoby\u0142a popularno\u015b\u0107 i wspiera\u0142a reformy.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Gadulski m\u00f3wi: \u201eJa co nigdy nie czytam, lub przynajmniej ma\u0142o, wiem, \u017ce tak jest najlepiej, jak przedtem bywa\u0142o\u201d. Co to zdanie m\u00f3wi o jego metodzie my\u015blenia?",
      content: {
        options: [
          "Jest m\u0105drym pragmatykiem, kt\u00f3ry uczy si\u0119 z do\u015bwiadczenia",
          "Jest ignorantem, kt\u00f3ry nie czyta, nie my\u015bli, ale twierdzi \u017ce \u201ewie\u201d \u2013 i dlatego broni starego porz\u0105dku nie z wiedzy, lecz z lenistwa intelektualnego i egoizmu",
          "Jest uczniem filozofii Leibniza",
          "Cytuje Podkomorzego z aprobat\u0105",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To samodemaskacja: Gadulski nie czyta, nie my\u015bli, ale \u201ewie\u201d. Niemcewicz pokazuje, \u017ce konserwatyzm Gadulskiego wynika nie z przemy\u015blenia, lecz z ignorancji i wygody. To krytyka antyintelektualizmu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Walery m\u00f3wi do Szarmanckiego: \u201ePami\u0119taj, \u017ce\u015b Polakiem, \u017ce\u015b obywatelem, \u017ce\u015b najpierwsze twe winien ojczy\u017anie us\u0142ugi\u201d. Jak to zdanie wyra\u017ca o\u015bwieceniowy idea\u0142 obywatelski?",
      content: {
        options: [
          "Walery chce, \u017ceby Szarmancki zosta\u0142 \u017co\u0142nierzem",
          "Idea\u0142 o\u015bwieceniowy: obywatel powinien s\u0142u\u017cy\u0107 ojczy\u017anie prac\u0105 i cnot\u0105, nie pr\u00f3\u017cnowa\u0107 za granic\u0105; to\u017csamo\u015b\u0107 polskiego szlachcica = obowi\u0105zki wobec kraju",
          "Walery zabrania Szarmanckiemu wyje\u017cd\u017ca\u0107 za granic\u0119",
          "To cytat z Konstytucji 3 Maja",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To kwintesencja o\u015bwieceniowego patriotyzmu: by\u0107 Polakiem to obowi\u0105zek, nie przywilej. Szarmancki podró\u017cuje, ale nie s\u0142u\u017cy \u2013 dlatego jest pot\u0119piony. Walery s\u0142u\u017cy \u2013 dlatego jest wzorem.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re por\u00f3wnania \u201ePowrotu pos\u0142a\u201d z innymi dzie\u0142ami s\u0105 uzasadnione?",
      content: {
        options: [
          "Gadulski i Harpagon (\u201eSk\u0105piec\u201d) \u2013 obaj ojcowie sk\u0105pi, kt\u00f3rzy decyduj\u0105 o ma\u0142\u017ce\u0144stwie c\u00f3rki na podstawie pieni\u0119dzy",
          "Szarmancki i Tartuffe (\u201e\u015awi\u0119toszek\u201d) \u2013 obaj wkradaj\u0105 si\u0119 do domu, by zyska\u0107 korzy\u015bci",
          "Podkomorzy i Starodum (\u201eNiedoro\u015bl\u201d Fonwizina) \u2013 obaj s\u0105 \u201eg\u0142osem rozs\u0105dku\u201d w komediach o\u015bwieceniowych",
          "\u201ePowr\u00f3t pos\u0142a\u201d i \u201eKandyd\u201d Woltera \u2013 oba s\u0105 komediami politycznymi",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Gadulski/Harpagon \u2013 obaj sk\u0105pi ojcowie. Szarmancki/Tartuffe \u2013 obaj intruzi z ukrytym celem. Podkomorzy/Starodum \u2013 obaj rezonatorzy o\u015bwieceniowi. \u201eKandyd\u201d to powiastka filozoficzna, nie komedia polityczna.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re interpretacje postaci Gadulskiego s\u0105 uzasadnione tre\u015bci\u0105 komedii?",
      content: {
        options: [
          "To karykatura konserwatywnego sarmaty \u2013 gaduła, kt\u00f3ry nie s\u0142ucha innych",
          "Jego konserwatyzm wynika z ignorancji i egoizmu, nie z przemy\u015blenia",
          "Jest postaci\u0105 tragiczn\u0105, kt\u00f3ra szczerze martwi si\u0119 o ojczyzn\u0119",
          "Jego imi\u0119 \u201eGadulski\u201d zdradza g\u0142\u00f3wn\u0105 cech\u0119: gada bez sensu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Gadulski to karykatura: gaduła (imi\u0119!), ignorant (\u201enigdy nie czytam\u201d), egoista (broni liberum veto, bo mu si\u0119 op\u0142aca). NIE jest tragiczny \u2013 jest komiczny. Nie martwi si\u0119 o ojczyzn\u0119 \u2013 martwi si\u0119 o w\u0142asne interesy.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Jak Niemcewicz \u0142\u0105czy w\u0105tek mi\u0142osny z politycznym? Dlaczego to wa\u017cne dla gatunku komedii politycznej?",
      content: {},
      correctAnswer:
        "Rywalizacja o Teres\u0119 jest pretekstem dla debaty politycznej: Walery (patriota, reformator) vs. Szarmancki (fircyk, kosmopolita). Wyb\u00f3r m\u0119\u017ca = wyb\u00f3r postaw: cnota/patriotyzm vs. próżno\u015b\u0107/egoizm. Gadulski wybiera Szarmanckiego z powod\u00f3w finansowych (nie chce dawa\u0107 posagu), co demaskuje go jako sk\u0105pca. Szcz\u0119\u015bliwe zako\u0144czenie (Walery wygrywa) = zwyci\u0119stwo reform. \u0141\u0105czenie mi\u0142o\u015bci z polityk\u0105 jest kluczowe: czyni komedi\u0119 dost\u0119pn\u0105 (mi\u0142o\u015b\u0107) i jednocze\u015bnie propagandow\u0105 (polityka).",
      metadata: {
        explanation:
          "Sp\u0142ecenie w\u0105tk\u00f3w to innowacja Niemcewicza: u Moli\u00e8ra i Bohomolca polityka nie gra roli. Tutaj mi\u0142o\u015b\u0107 i polityka s\u0105 nierozerwalnie po\u0142\u0105czone.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Podkomorzy krytykuje \u201emodne wychowanie\u201d i chwali obywatelskie cnoty kobiet. Jak to si\u0119 wi\u0105\u017ce z ide\u0105 reform o\u015bwieceniowych?",
      content: {},
      correctAnswer:
        "Podkomorzy krytykuje wychowanie francuskie (mamki z zagranicy, guwernantki-Francuzki, brak znajomo\u015bci j\u0119zyka i historii) i chwali kobiety-patriotki: \u201eidąc Rzymianek przyk\u0142ady, dzieli\u0142y z nami publiczne nak\u0142ady, z skro\u0144 pozdejmowa\u0142y przepyszne ozdoby, odda\u0142y je ojczy\u017anie\u201d. Dla reform wa\u017cne s\u0105 nie tylko prawa, ale te\u017c wychowanie: o\u015bwiecony obywatel potrzebuje o\u015bwieconej matki i \u017cony. Staro\u015bcina to antywz\u00f3r, Podkomorzyna to idea\u0142: dobra matka, patriotka, wspieraj\u0105ca m\u0119\u017ca.",
      metadata: {
        explanation:
          "Krytyka wychowania to wa\u017cny temat o\u015bwieceniowy (Komisja Edukacji Narodowej 1773). Niemcewicz wpisuje si\u0119 w program KEN: edukacja = fundament reform.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Przeczytaj fragment i wykonaj polecenie:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "J.U. Niemcewicz",
          title: "Powr\u00f3t pos\u0142a",
          text: "Wskrzeszaj\u0105 m\u0105dr\u0105 wolno\u015b\u0107, skracaj\u0105 swywole. Ten to nieszcz\u0119sny nierz\u0105d, to sejm\u00f3w zrywanie, Kraj zgubi\u0142o, \u015bci\u0105gn\u0119\u0142o obce panowanie.",
          bookReference: "Akt I \u2013 Podkomorzy do Gadulskiego",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Co Podkomorzy rozumie przez \u201em\u0105dr\u0105 wolno\u015b\u0107\u201d i \u201eswywol\u0119\u201d? Jak te poj\u0119cia si\u0119 r\u00f3\u017cni\u0105?",
            minWords: 25,
            maxPoints: 2,
          },
          {
            id: 2,
            instruction:
              "Do jakich wydarze\u0144 historycznych nawi\u0105zuje Podkomorzy, m\u00f3wi\u0105c o \u201eobcym panowaniu\u201d?",
            minWords: 15,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) \u201eM\u0105dra wolno\u015b\u0107\u201d to wolno\u015b\u0107 obywatelska oparta na prawie, porz\u0105dku i odpowiedzialno\u015bci \u2013 to idea\u0142 reformator\u00f3w. \u201eSzywola\u201d to samowola szlachecka: liberum veto, zrywanie sejm\u00f3w, anarchia \u2013 pozorna \u201ewolno\u015b\u0107\u201d, kt\u00f3ra w rzeczywisto\u015bci niszczy pa\u0144stwo. Podkomorzy przeciwstawia jeporz\u0105dek chaosowi. 2) \u201eObce panowanie\u201d to nawi\u0105zanie do rozbior\u00f3w (pierwszy rozbi\u00f3r 1772) i dominacji Rosji nad Polsk\u0105. Podkomorzy m\u00f3wi: to w\u0142a\u015bnie szywola i nierz\u0105d doprowadzi\u0142y do utraty suwerenno\u015bci.",
      metadata: {
        explanation:
          "Opozycja \u201ewolno\u015b\u0107 vs. swywola\u201d to klucz do zrozumienia debaty Sejmu Czteroletniego. Podkomorzy reprezentuje stanowisko stronnictwa patriotycznego.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic:
          "\u201ePowr\u00f3t pos\u0142a\u201d jako narz\u0119dzie propagandy politycznej",
        requirements: [
          "Wyja\u015bnij, jakie cele polityczne realizowa\u0142a komedia",
          "Wska\u017c \u015brodki, jakimi Niemcewicz przekonuje widowni\u0119",
          "Oce\u0144, czy propaganda os\u0142abia walory artystyczne",
          "120-160 s\u0142\u00f3w",
        ],
        wordLimit: { min: 120, max: 160 },
      },
      correctAnswer:
        "Komedia realizowa\u0142a cele stronnictwa patriotycznego na Sejmie Czteroletnim: propagowa\u0142a zniesienie liberum veto, sejm sta\u0142y, sojusz z Prusami, wzmocnienie armii. \u015arodki: 1) Kontrastowe pary postaci \u2013 patrioci (pozytywni) vs. konserwaty\u015bci (o\u015bmieszeni). 2) Postacie negatywne s\u0105 karykaturalne (Gadulski gaduła, Staro\u015bcina \u201edama modna\u201d, Szarmancki fircyk). 3) Szcz\u0119\u015bliwe zako\u0144czenie = zwyci\u0119stwo reform. 4) Uwolnienie ch\u0142op\u00f3w = symbol post\u0119pu. Propaganda os\u0142abia walory artystyczne: postacie pozytywne s\u0105 schematyczne, dialogi polityczne dominuj\u0105 nad fabu\u0142\u0105. Ale w kontek\u015bcie historycznym komedia spe\u0142ni\u0142a swoj\u0105 misj\u0119 \u2013 zdoby\u0142a popularno\u015b\u0107 i kszta\u0142towa\u0142a opini\u0119.",
      metadata: {
        explanation:
          "Komedia jako propaganda to wa\u017cny temat \u2013 pokazuje rol\u0119 literatury w o\u015bwieceniu: sztuka mia\u0142a zmienia\u0107 \u015bwiat, nie tylko go opisywa\u0107.",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Napisz notatk\u0119 syntetyczn\u0105 na podany temat:",
      content: {
        topic: "Krytyka sarmatyzmu w \u201ePowrocie pos\u0142a\u201d",
        requirements: [
          "Wyja\u015bnij, czym jest sarmatyzm pozytywny i negatywny w komedii",
          "Podaj przyk\u0142ady postaci reprezentuj\u0105cych oba modele",
          "Wska\u017c, co Niemcewicz uwa\u017ca za g\u0142\u00f3wne wady szlachty",
          "100-140 s\u0142\u00f3w",
        ],
        wordLimit: { min: 100, max: 140 },
      },
      correctAnswer:
        "Niemcewicz rozr\u00f3\u017cnia dwa modele sarmatyzmu: pozytywny (Podkomorzy) \u2013 patriotyzm, s\u0142u\u017cba krajowi, szacunek dla reform, cnota obywatelska, \u201eDom zawsze ust\u0119powa\u0107 powinien krajowi\u201d; i negatywny (Gadulski) \u2013 ignorancja (\u201enigdy nie czytam\u201d), egoizm (broni liberum veto dla korzy\u015bci), idealizacja przesz\u0142o\u015bci (\u201eza August\u00f3w\u201d), gadulstwo, niech\u0119\u0107 do reform. G\u0142\u00f3wne wady szlachty: 1) antyintelektualizm, 2) egoizm maskowany \u201epatriotyzmem\u201d, 3) kosmopolityzm (Staro\u015bcina, Szarmancki), 4) sk\u0105pstwo (Gadulski). Krytyka nie jest totalna \u2013 Niemcewicz pokazuje, \u017ce sarmatyzm MOZE by\u0107 pozytywny, je\u015bli po\u0142\u0105czy si\u0119 z o\u015bwieceniem.",
      metadata: {
        explanation:
          "Rozr\u00f3\u017cnienie sarmatyzmu pozytywnego i negatywnego to kluczowy wk\u0142ad Niemcewicza. Nie odrzuca tradycji \u2013 chce j\u0105 zreformowa\u0107.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Jakim cz\u0142owiekiem powinien by\u0107 dobry obywatel? Om\u00f3w zagadnienie na podstawie \u201ePowrotu pos\u0142a\u201d Niemcewicza. W odpowiedzi uwzgl\u0119dnij r\u00f3wnie\u017c wybrany kontekst.",
      content: {
        thesis: "Idea\u0142 obywatela w \u201ePowrocie pos\u0142a\u201d",
        structure: {
          introduction:
            "Postaw tez\u0119: Niemcewicz tworzy wz\u00f3r obywatela-patrioty i demaskuje jego przeciwie\u0144stwo",
          arguments_for:
            "Podkomorzy i Walery jako wzory: s\u0142u\u017cba, cnota, reformy, \u201eDom ust\u0119powa\u0107 powinien krajowi\u201d, uwolnienie ch\u0142op\u00f3w",
          arguments_against:
            "Gadulski, Szarmancki jako antywzory: egoizm, ignorancja, pr\u00f3\u017cno\u015b\u0107, kosmopolityzm",
          conclusion:
            "Wniosek: obywatel = cz\u0142owiek, kt\u00f3ry \u0142\u0105czy mi\u0142o\u015b\u0107 ojczyzny z dzia\u0142aniem; odwo\u0142aj si\u0119 do kontekstu",
        },
        requirements: [
          "Minimum 300 s\u0142\u00f3w",
          "Odwo\u0142anie do co najmniej trzech postaci",
          "Kontekst literacki (np. \u201eKandyd\u201d Woltera, \u201eDo obywatela\u201d Krasickiego, wsp\u00f3\u0142czesno\u015b\u0107)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Scharakteryzowa\u0107 Podkomorzego i Walerego jako wzory obywatela. 2) Pokaza\u0107 antywzory (Gadulski, Szarmancki, Staro\u015bcina). 3) Zidentyfikowa\u0107 cechy idealnego obywatela: patriotyzm, praca, edukacja, cnota, odpowiedzialno\u015b\u0107. 4) Odwo\u0142a\u0107 si\u0119 do kontekstu (np. \u201euprawianie ogr\u00f3dka\u201d Woltera, satyry Krasickiego, wsp\u00f3\u0142czesna debata o zaanga\u017cowaniu obywatelskim).",
      metadata: {
        explanation:
          "Idea\u0142 obywatela to jeden z najwa\u017cniejszych temat\u00f3w o\u015bwieceniowych i cz\u0119sty temat maturalny do \u201ePowrotu pos\u0142a\u201d.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Klimowicz pisa\u0142, \u017ce \u201ebohaterowie pozytywni s\u0105 schematyczni i bezbarwni, prawdziwie udane s\u0105 postacie negatywne\u201d. Jak oceni\u0107 t\u0119 obserwacj\u0119?",
      content: {
        options: [
          "Klimowicz si\u0119 myli \u2013 postacie pozytywne s\u0105 równie \u017cywe",
          "To paradoks komedii dydaktycznej: postacie negatywne s\u0105 \u017cywsze, bo karykatura jest atrakcyjniejsza ni\u017c wz\u00f3r; Gadulski bawi, Podkomorzy naucza \u2013 a widownia lubi si\u0119 \u015bmia\u0107 bardziej ni\u017c s\u0142ucha\u0107 morału\u00f3w",
          "To dowodzi, \u017ce Niemcewicz by\u0142 z\u0142ym pisarzem",
          "Tylko postacie negatywne s\u0105 wa\u017cne dla przes\u0142ania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To paradoks nie tylko Niemcewicza, ale ca\u0142ej komedii dydaktycznej: Tartuffe jest \u017cywszy od Kleanta, Harpagon od Elizy, Gadulski od Podkomorzego. Karykatura jest bardziej teatralna ni\u017c cnota.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Czy \u201ePowr\u00f3t pos\u0142a\u201d zachowuje aktualno\u015b\u0107 poza kontekstem Sejmu Czteroletniego?",
      content: {
        options: [
          "Nie \u2013 komedia jest czysto historyczna i nie ma nic wsp\u00f3lnego ze wsp\u00f3\u0142czesno\u015bci\u0105",
          "Tak, cz\u0119\u015bciowo: uniwersalne s\u0105 konflikty postawa obywatelska vs. egoizm, patriotyzm vs. kosmopolityzm, cnota vs. pr\u00f3\u017cno\u015b\u0107; natomiast konkretne debaty polityczne (liberum veto, sukcesja) s\u0105 historyczne",
          "Tak, ca\u0142kowicie \u2013 liberum veto wci\u0105\u017c istnieje",
          "Aktualno\u015b\u0107 komedii polega wy\u0142\u0105cznie na humorie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Komedia jest cz\u0119\u015bciowo aktualna: uniwersalne s\u0105 konflikty obywatel vs. egoista, patriota vs. kosmopolita, cnota vs. pr\u00f3\u017cno\u015b\u0107. Konkretne debaty (veto, elekcja) s\u0105 historyczne, ale mechanizmy \u2013 egoizm vs. dobro wspólne \u2013 ponadczasowe.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Kt\u00f3re z poni\u017cszych stwierdze\u0144 o miejscu \u201ePowrotu pos\u0142a\u201d w literaturze o\u015bwieceniowej s\u0105 uzasadnione?",
      content: {
        options: [
          "To pierwsza polska komedia polityczna, \u0142\u0105cz\u0105ca intryg\u0119 mi\u0142osn\u0105 z debat\u0105 ustrojow\u0105",
          "Czerpie z tradycji Moli\u00e8ra (typy, kontrasty) i Bohomolca (schemat obyczajowy)",
          "Realizuje o\u015bwieceniowy postulat: literatura powinna kszta\u0142ci\u0107 spo\u0142ecze\u0144stwo",
          "To dzie\u0142o romantyczne, \u0142ami\u0105ce zasady klasycyzmu",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Komedia jest o\u015bwieceniowa: polityczna (pierwsza taka w Polsce), czerpie z Moli\u00e8ra/Bohomolca, realizuje postulat dydaktyczny. NIE jest romantyczna \u2013 zachowuje zasad\u0119 trzech jedno\u015bci i kontrastowe typy.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Dlaczego \u201ePowr\u00f3t pos\u0142a\u201d by\u0142 tak popularny w czasie Sejmu Czteroletniego, a dzi\u015b jest grywany g\u0142\u00f3wnie \u201edla szk\u00f3\u0142\u201d?",
      content: {},
      correctAnswer:
        "Popularno\u015b\u0107 w 1790-91: komedia odpowiada\u0142a na \u017cywe potrzeby chwili \u2013 debata o reformach by\u0142a aktualna, postacie rozpoznawalne (Gadulski = Suchorzewski?), propaganda skuteczna. Widzowie rozpoznawali siebie i s\u0105siad\u00f3w. Dzi\u015b: konkretne debaty (liberum veto, elekcja) s\u0105 martwe. Postacie s\u0105 schematyczne, dialogi polityczne d\u0142ugie i nieciekawe dla wsp\u00f3\u0142czesnego widza. Brakuje g\u0142\u0119bi psychologicznej, kt\u00f3ra uczyni\u0142aby bohater\u00f3w ponadczasowymi (jak u Moli\u00e8ra). Komedia jest wa\u017cna historycznie, ale artystycznie odchodzi w przesz\u0142o\u015b\u0107.",
      metadata: {
        explanation:
          "To pytanie wymaga krytycznej oceny: warto\u015b\u0107 historyczna vs. artystyczna. Najlepsza odpowied\u017a docenia rol\u0119 komedii w 1790 r., ale widzi jej ograniczenia.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Por\u00f3wnaj \u201ePowr\u00f3t pos\u0142a\u201d i \u201eKandyda\u201d Woltera jako dzie\u0142a o\u015bwieceniowe. Co je \u0142\u0105czy, a co dzieli?",
      content: {},
      correctAnswer:
        "\u0141\u0105czy: 1) Oba s\u0105 dzie\u0142ami o\u015bwieceniowymi z celem dydaktycznym. 2) Oba krytykuj\u0105 wady spo\u0142ecze\u0144stwa: konserwatyzm, fanatyzm, ignorancj\u0119. 3) Oba u\u017cywaj\u0105 postaci-typ\u00f3w (Pangloss = Gadulski?). 4) Oba propaguj\u0105 rozum i dzia\u0142anie. Dzieli: 1) Gatunek: komedia (Niemcewicz) vs. powiastka filozoficzna (Wolter). 2) Zasi\u0119g krytyki: Niemcewicz krytykuje polsk\u0105 szlacht\u0119, Wolter \u2013 ca\u0142\u0105 ludzko\u015b\u0107. 3) Ton: Niemcewicz jest optymist\u0105 (zwyci\u0119stwo reform), Wolter jest ironist\u0105 (\u201euprawiaj ogr\u00f3dek\u201d). 4) \u201ePowr\u00f3t pos\u0142a\u201d jest lokalny i doraźny, \u201eKandyd\u201d \u2013 uniwersalny i ponadczasowy.",
      metadata: {
        explanation:
          "To ambitne por\u00f3wnanie dw\u00f3ch dzie\u0142 o\u015bwieceniowych o r\u00f3\u017cnym zasi\u0119gu i trwa\u0142o\u015bci. \u201eKandyd\u201d przetrwa\u0142 wieki, \u201ePowr\u00f3t pos\u0142a\u201d \u2013 g\u0142\u00f3wnie jako dokument historyczny.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question: "Napisz notatk\u0119 analityczn\u0105 na podany temat:",
      content: {
        topic:
          "Obraz polski szlacheckiej w \u201ePowrocie pos\u0142a\u201d: dwa \u015bwiaty, dwie Polski",
        requirements: [
          "Opisz \u201ePolsk\u0119 postępow\u0105\u201d (Podkomorzy, Walery) i \u201ePolsk\u0119 zacofan\u0105\u201d (Gadulski, Szarmancki, Staro\u015bcina)",
          "Wska\u017c, jak obie \u201ePolski\u201d widz\u0105 przysz\u0142o\u015b\u0107 kraju",
          "Oce\u0144, kt\u00f3ry obraz jest bardziej przekonuj\u0105cy artystycznie",
          "140-180 s\u0142\u00f3w",
        ],
        wordLimit: { min: 140, max: 180 },
      },
      correctAnswer:
        "\u201ePolska postępowa\u201d (Podkomorzy, Walery, Podkomorzyna): patriotyzm \u0142\u0105czony z rozumem, reformy (zniesienie liberum veto, sejm sta\u0142y, armia), s\u0142u\u017cba krajowi, szacunek dla praw cz\u0142owieka, uwolnienie ch\u0142op\u00f3w. Przysz\u0142o\u015b\u0107: \u201eb\u0119d\u0105 jeszcze dla Polski dni \u015bwietne wr\u00f3cone\u201d. \u201ePolska zacofana\u201d (Gadulski, Szarmancki, Staro\u015bcina): egoizm, ignorancja, idealizacja przesz\u0142o\u015bci, kosmopolityzm, pr\u00f3\u017cno\u015b\u0107. Przysz\u0142o\u015b\u0107: \u201eniech cicho siedzi\u201d (Gadulski). Artystycznie bardziej przekonuj\u0105ca jest \u201ePolska zacofana\u201d: Gadulski, Staro\u015bcina i Szarmancki s\u0105 \u017cywi, komiczni, zapami\u0119tywani. Podkomorzy i Walery s\u0105 szlachetni, ale schematyczni. Paradoks: karykatura jest skuteczniejsza od idea\u0142u \u2013 co jest jednocze\u015bnie si\u0142\u0105 i s\u0142abo\u015bci\u0105 komedii.",
      metadata: {
        explanation:
          "Ten temat \u0142\u0105czy analiz\u0119 historyczn\u0105 z ocen\u0105 artystyczn\u0105 \u2013 wymaga dojrza\u0142ego spojrzenia na komedi\u0119 jako dzie\u0142o jednocze\u015bnie propagandowe i literackie.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "ENLIGHTENMENT",
      work: "Powr\u00f3t pos\u0142a",
      question:
        "Czy literatura mo\u017ce zmienia\u0107 spo\u0142ecze\u0144stwo? Napisz rozprawk\u0119, rozwa\u017caj\u0105c problem na podstawie \u201ePowrotu pos\u0142a\u201d Niemcewicza. W odpowiedzi uwzgl\u0119dnij r\u00f3wnie\u017c wybrany kontekst.",
      content: {
        thesis: "Literatura jako narz\u0119dzie zmiany spo\u0142ecznej",
        structure: {
          introduction:
            "Zarysuj problem: \u201ePowr\u00f3t pos\u0142a\u201d jako dzie\u0142o propagandowe stronnictwa patriotycznego",
          arguments_for:
            "Komedia kszta\u0142towa\u0142a opini\u0119 publiczn\u0105, wspiera\u0142a reformy, o\u015bmiesza\u0142a konserwatyst\u00f3w; zdoby\u0142a popularno\u015b\u0107 i wp\u0142yn\u0119\u0142a na debat\u0119 polityczn\u0105",
          arguments_against:
            "Ograniczenia: postacie schematyczne, przes\u0142anie doraźne, komedia nie prze\u017cy\u0142a epoki; reformy Sejmu Czteroletniego ostatecznie nie uratowa\u0142y Polski",
          conclusion:
            "Wniosek: literatura mo\u017ce wp\u0142ywa\u0107 na \u015bwiadomo\u015b\u0107, ale nie zast\u0105pi dzia\u0142ania politycznego; odwo\u0142aj si\u0119 do kontekstu",
        },
        requirements: [
          "Minimum 400 s\u0142\u00f3w",
          "Odwo\u0142anie do co najmniej trzech postaci z komedii",
          "Kontekst literacki (np. \u201eKandyd\u201d Woltera, \u201eDziady\u201d III cz. Mickiewicza, literatura zaanga\u017cowana XX w.)",
          "Poprawna argumentacja",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Pokaza\u0107 \u201ePowr\u00f3t pos\u0142a\u201d jako narz\u0119dzie propagandy. 2) Omówi\u0107 skuteczno\u015b\u0107: popularno\u015b\u0107, wp\u0142yw na opini\u0119. 3) Wskaza\u0107 ograniczenia: schematyzm, doraźno\u015b\u0107. 4) Por\u00f3wna\u0107 z kontekstem (Wolter: powiastki jako \u201edynamit\u201d, Mickiewicz: \u201eDziady\u201d jako bunt, literatura zaanga\u017cowana XX w.). 5) Sformu\u0142owa\u0107 wniosek: literatura kszta\u0142tuje \u015bwiadomo\u015b\u0107, ale nie zast\u0119puje dzia\u0142ania.",
      metadata: {
        explanation:
          "To pytanie o rol\u0119 literatury w spo\u0142ecze\u0144stwie \u2013 temat uniwersalny, z \u201ePowrotem pos\u0142a\u201d jako przyk\u0142adem dzie\u0142a zaanga\u017cowanego.",
      },
    },

    // ======================= KONIEC PYTA\u0143 Powr\u00f3t pos\u0142a ===================//
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
  const uniqueWorks = [
    ...new Set(exercises.map((e) => e.work).filter(Boolean)),
  ];
  for (const work of uniqueWorks) {
    await testLandingService.ensureLandingExists(work as string);
  }
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
