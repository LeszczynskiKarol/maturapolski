// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= LUDZIE BEZDOMNI — ZESTAW 2 (50 pytań) ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (5) =====

    // ======================= POCZĄTEK PYTAŃ SKLEPY CYNAMONOWE ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Kto jest autorem zbioru opowiadań „Sklepy cynamonowe”?",
      content: {
        options: [
          "Witold Gombrowicz",
          "Bruno Schulz",
          "Stanisław Ignacy Witkiewicz",
          "Bolesław Leśmian",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Sklepy cynamonowe” to zbiór opowiadań Brunona Schulza, wydany w 1933 roku (postdatowany na 1934) dzięki protekcji Zofii Nałkowskiej. Jest jednym z najważniejszych dzieł polskiego dwudziestolecia międzywojennego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Jak ma na imię ojciec narratora w „Sklepach cynamonowych”?",
      content: {
        options: ["Józef", "Jakub", "Jan", "Jerzy"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ojciec narratora ma na imię Jakub — jak biblijny patriarcha z Księgi Rodzaju. To imię jest jednym z wielu nawiązań do tradycji biblijnej i żydowskiej obecnych w zbiorze.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Jak nazywa się służąca w domu narratora?",
      content: {
        options: ["Maryśka", "Paulina", "Adela", "Polda"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Adela to służąca w domu narratora. Pełni kluczową rolę w zbiorze — symbolizuje zmysłową kobiecość i posiada nad ojcem niemal nieograniczoną władzę, której się bezwzględnie poddaje.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "W jakim mieście rozgrywa się akcja „Sklepów cynamonowych”?",
      content: {
        options: [
          "W Warszawie",
          "We Lwowie",
          "W niewymienionym z nazwy galicyjskim miasteczku wzorowanym na Drohobyczu",
          "W Krakowie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Akcja toczy się w małym galicyjskim miasteczku, nigdy niewymienianym z nazwy. Schulz wzorował je na rodzinnym Drohobyczu, nadając mu cechy mityczne — labiryntową przestrzeń, metamorfozy ulic i domów.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Ile opowiadań zawiera zbiór „Sklepy cynamonowe”?",
      content: {
        options: ["Dziesięć", "Dwanaście", "Piętnaście", "Dwadzieścia"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zbiór „Sklepy cynamonowe” składa się z piętnastu opowiadań, od „Sierpnia” do „Nocy wielkiego sezonu”. Tworzą one luźną kompozycję powieściową, połączoną postaciami i przestrzenią.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Czym z zawodu zajmuje się ojciec narratora?",
      content: {
        options: [
          "Jest nauczycielem",
          "Jest kupcem — prowadzi sklep z suknem",
          "Jest lekarzem",
          "Jest rzemieślnikiem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ojciec narratora jest kupcem — prowadzi sklep z suknem i materiałami na rynku miasteczka. Jednak w oczach syna jest kimś znacznie więcej: demiurgiem, magiem, filozofem i poetą.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które z wymienionych postaci pojawiają się w „Sklepach cynamonowych”?",
      content: {
        options: [
          "Adela — służąca",
          "Ciotka Agata",
          "Doktor Czernisz",
          "Wuj Marek",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Adela, ciotka Agata i wuj Marek to postacie ze „Sklepów cynamonowych”. Doktor Czernisz to postać z „Ludzi bezdomnych” Żeromskiego.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Które opowiadania wchodzą w skład zbioru „Sklepy cynamonowe”?",
      content: {
        options: ["„Sierpień”", "„Ptaki”", "„Emeryt”", "„Karakony”"],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Sierpień”, „Ptaki” i „Karakony” to opowiadania ze „Sklepów cynamonowych”. „Emeryt” to opowiadanie z drugiego zbioru Schulza — „Sanatorium Pod Klepsydrą”.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które stwierdzenia o zbiorze „Sklepy cynamonowe” są prawdziwe?",
      content: {
        options: [
          "Narrator opowiada w pierwszej osobie",
          "Zbiór został wydany w 1933 roku",
          "Schulz napisał go w Warszawie",
          "Zbiór ukazał się dzięki protekcji Zofii Nałkowskiej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Narracja jest pierwszoosobowa (narrator = Józef). Zbiór wydano w 1933 r. dzięki Nałkowskiej. Schulz pisał go w Drohobyczu, nie w Warszawie — nigdy na stałe nie opuścił rodzinnego miasta.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Co ojciec narratora hoduje na strychu w opowiadaniu „Ptaki”?",
      content: {
        options: [
          "Koty i psy",
          "Egzotyczne ptaki wylęgane z zapłodnionych jaj",
          "Rośliny tropikalne",
          "Karakony w celach naukowych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W „Ptakach” ojciec sprowadza zapłodnione jaja ptasie z Hamburga, Holandii i Afryki, daje je do wylęgania kurom belgijskim i urządza na strychu „ptasie królestwo” — prawdziwą arkę Noego, do której zlatują się ptaki z dalekich stron.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Kto kończy „ptasią imprezę” ojca, rozpędzając ptaki ze strychu?",
      content: {
        options: ["Matka", "Adela", "Wuj Marek", "Narrator (Józef)"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Adela, „podobna do szalejącej Menady”, wdziera się na strych z długą szczotką i w wirze piór rozpędza całą ptasią gromadę. Ojciec schodzi ze schodów jak „król-banita, który stracił tron i królowanie”.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Do jakiego biblijnego motywu nawiązuje dach domu narratora, gdy ojciec hoduje na nim ptaki?",
      content: {
        options: ["Wieża Babel", "Arka Noego", "Ogród Eden", "Arka Przymierza"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Schulz wprost pisze, że dach „stał się prawdziwą gospodą ptasią, arką Noego, do której zlatywały się wszelkiego rodzaju skrzydlacze z dalekich stron”. Ojciec jest kreowany na biblijnego patriarchę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Czego narrator poszukuje podczas nocnej wędrówki w tytułowym opowiadaniu „Sklepy cynamonowe”?",
      content: {
        options: [
          "Drogi do domu po nocnym spacerze",
          "Portfelu ojca — ale po drodze chce odwiedzić tajemnicze sklepy cynamonowe",
          "Apteki z lekami dla chorego ojca",
          "Szkoły, w której odbywają się nocne lekcje",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ojciec w teatrze stwierdza, że zapomniał portfelu z pieniędzmi i dokumentami. Narrator zostaje wysłany do domu po niego, ale po drodze próbuje odnaleźć tajemnicze sklepy cynamonowe — i gubi się w labiryncie nocnych ulic.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Co ojciec głosi w „Traktacie o Manekinach”?",
      content: {
        options: [
          "Że manekiny mają duszę i cierpią",
          "Że Demiurgos nie ma monopolu na tworzenie — materia jest żywa i można ją formować, tworząc „wtórego człowieka” na obraz manekina",
          "Że manekiny powinny zastąpić ludzi w fabrykach",
          "Że sztuka jest bezwartościowa wobec natury",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W „Traktacie o Manekinach” ojciec wygłasza heretycką doktrynę o materii: twierdzi, że każdy duch może tworzyć, że materia jest żywa i płodna, i postuluje stworzenie „wtórej demiurgii” — istot prowizorycznych, z tandety, na obraz manekina.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które cechy charakteryzują ojca narratora w „Sklepach cynamonowych”?",
      content: {
        options: [
          "Jest ekscentryczny i pogrąża się w obsesyjnych zainteresowaniach",
          "Wygłasza pseudofilozoficzne prelekcje o materii i tworzeniu",
          "Jest typowym, praktycznym kupcem bez wyobraźni",
          "Stopniowo zanika fizycznie — maleje, chudnie, znika",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Ojciec jest ekscentrykiem, filozofem-demiurgiem, wygłasza prelekcje o materii i manekinach. Stopniowo zanika — maleje jak „orzech zsychający się w łupinie”, aż jego resztki Adela wymata jak kupkę śmieci. Nie jest praktycznym kupcem — tę rolę pełni matka.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Zbiór „Sklepy cynamonowe” to gatunek zwany (1). Narrator opowiada z perspektywy (2). Czas w utworze jest (3), nie linearny.",
        gaps: [
          {
            id: 1,
            options: [
              "powieścią realistyczną",
              "prozą poetycką",
              "dramatem lirycznym",
              "poematem prozą",
            ],
          },
          {
            id: 2,
            options: [
              "wszechwiedzącego narratora",
              "dziecka / dorosłego wspominającego dzieciństwo",
              "ojca narratora",
              "Adeli",
            ],
          },
          {
            id: 3,
            options: [
              "linearny i historyczny",
              "cykliczny i mityczny",
              "ściśle chronologiczny",
              "odwrócony (od końca)",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "„Sklepy cynamonowe” to proza poetycka — łączy cechy prozy i poezji. Narrator opowiada z podwójnej perspektywy dziecka i dorosłego. Czas jest cykliczny i mityczny — wyznaczają go pory roku, nie daty.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które z poniższych zwierząt i istot pojawiają się w „Sklepach cynamonowych”?",
      content: {
        options: [
          "Kondor — ogromny ptak podobny do ojca",
          "Piesek Nemrod",
          "Koń dorożkarski, który mówi ludzkim głosem",
          "Wilk atakujący miasteczko",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Kondor z „Ptaków” przypomina ojca fizycznie. Piesek Nemrod pojawia się w opowiadaniu o tym samym tytule. Koń dorożkarski w „Sklepach cynamonowych” mówi do narratora. Wilk nie występuje w zbiorze.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Które pory roku odgrywają kluczową rolę w strukturze zbioru?",
      content: {
        options: [
          "Lato — upał, dojrzewanie, zmysłowość (opowiadanie „Sierpień”)",
          "Zima — szarość, nuda, metamorfozy ojca (opowiadania „Ptaki”, „Manekiny”)",
          "Wiosna — budzenie się przyrody po powstaniu styczniowym",
          "Jesień — Wielki Sezon, handel, ptasie powroty (opowiadanie „Noc wielkiego sezonu”)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Lato (żar, zmysłowość), zima (szarość, eksperymenty ojca) i jesień (Wielki Sezon handlowy, powrót ptaków) to trzy kluczowe pory w cyklu. Wiosna i powstanie styczniowe nie są motywami tego zbioru.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Kim jest Tłuja i w jakim opowiadaniu się pojawia?",
      content: {
        hints: [
          "opowiadanie „Sierpień”",
          "łóżko na śmietnisku",
          "córka Maryśki",
        ],
      },
      correctAnswer:
        "Tłuja to upośledzona umysłowo dziewczyna, córka starej Maryśki. Pojawia się w opowiadaniu „Sierpień”. Siedzi na łóżku stojącym na śmietnisku za parkanem, wśród łopuchów i chwastów. Schulz opisuje ją jako „bożka pogańskiego” — symbol dzikiej, sierpniowej płodności natury.",
      metadata: {
        explanation:
          "Tłuja to jedna z najbardziej naturalistycznych i jednocześnie mitycznych postaci zbioru. Jej scena na śmietnisku łączy brzydotę z sacrum — jest figurą pogańskiej płodności sierpniowej natury.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Jaką funkcję pełni postać Adeli wobec ojca w zbiorze „Sklepy cynamonowe”?",
      content: {
        options: [
          "Jest mu posłuszna i wykonuje wszystkie jego polecenia",
          "Reprezentuje niszczycielską siłę zmysłowej kobiecości — ma nad ojcem absolutną władzę i niszczy jego twórcze światy",
          "Jest jego intelektualną partnerką i wspiera jego eksperymenty",
          "Nie ma z ojcem żadnych interakcji — zajmuje się wyłącznie domem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Adela symbolizuje zmysłową kobiecość i cielesność, która triumfuje nad duchowymi dążeniami ojca. Rozpędza jego ptaki, grozi mu palcem (łaskotki), a ojciec reaguje paniką i poddańczym lękiem. To relacja masochistyczna — ojciec-demiurg upada przed zmysłową siłą służącej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Co oznacza pojęcie „demiurgia” w kontekście prelekcji ojca z „Traktatu o Manekinach”?",
      content: {
        options: [
          "Naukowe tworzenie sztucznych organizmów w laboratorium",
          "Heretyckie pragnienie tworzenia na wzór Boga — lecz z tandety, prowizoryczne, na jeden raz",
          "Reformę systemu edukacji w miasteczku",
          "Hodowlę egzotycznych zwierząt na strychu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ojciec postuluje „wtórą demiurgię” — tworzenie istot na obraz manekina, z tandety i kłaków, prowizorycznych, „na jeden raz zrobionych”. Jest to herezja wobec doskonałości Demiurgosa (Boga), ale wyraża umiłowanie materii jako takiej — jej „puszystości i porowatości”.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Co symbolizuje Ulica Krokodyli w zbiorze?",
      content: {
        options: [
          "Tradycyjną, szlachetną część miasteczka z bogatą historią",
          "Tandetną, pseudoamerykańską dzielnicę handlową — świat pozorów, imitacji i moralnej degradacji",
          "Dzielnicę artystów i intelektualistów",
          "Tajemnicze sklepy cynamonowe, do których narrator nie może trafić",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ulica Krokodyli to dzielnica tandetnego komercjalizmu — „pseudoamerykanizm zaszczepiony na starym gruncie”. Wszystko tam jest szare, imitacyjne, papierowe. Rzeczywistość „jest cienka jak papier i zdradza swą imitatywność”. To antyświat wobec magicznego miasteczka — krytyka nowoczesnej cywilizacji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Czym jest oniryzm w kontekście „Sklepów cynamonowych”?",
      content: {
        options: [
          "Techniką opisu snów bohaterów w realizmie psychologicznym",
          "Konwencją literacką, w której rzeczywistość kreowana jest na wzór snu — zaburzona logika, metamorfozy, zacieranie granic jawy i marzenia",
          "Metodą naukowej analizy snów, inspirowaną Freudem",
          "Gatunkiem literackim, do którego należy zbiór",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Oniryzm (z gr. oneiros = sen) to konwencja literacka, w której świat przedstawiony ma cechy marzenia sennego: irracjonalność, metamorfozy, płynność czasu i przestrzeni. U Schulza oniryzm nie jest motywem, lecz formą narracji — cała rzeczywistość zbioru ma strukturę snu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Co dzieje się z ojcem w opowiadaniu „Karakony”?",
      content: {
        options: [
          "Ojciec prowadzi wojnę z karakonami, ale stopniowo sam zaczyna się w nie przemieniać",
          "Ojciec wynajduje sposób na pozbycie się karakonów z domu",
          "Ojciec ucieka z domu przed inwazją karakonów",
          "Karakony okazują się ptakami, które ojciec hodował na strychu",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "W „Karakonach” ojciec najpierw wchodzi w szaloną wojnę z inwazją karakonów, ale stopniowo fascynacja wstrętem wciąga go — zaczyna naśladować ich ruchy, na ciele pojawiają się czarne plamy. W końcu „zlewa się z tym czarnym plemieniem” i nie można go odróżnić od owadów. To groteska metamorfozy, nawiązująca do Kafki.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Połącz opowiadania z ich kluczowymi motywami:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "„Sierpień”" },
          { id: "B", text: "„Ptaki”" },
          { id: "C", text: "„Traktat o Manekinach”" },
          { id: "D", text: "„Ulica Krokodyli”" },
        ],
        rightColumn: [
          { id: "1", text: "Filozofia materii, wtóra demiurgia, tandeta" },
          { id: "2", text: "Tandetna dzielnica handlowa, świat pozorów" },
          { id: "3", text: "Upał, dojrzewanie sierpniowe, Tłuja" },
          { id: "4", text: "Hodowla egzotycznych ptaków na strychu" },
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
          "„Sierpień” — żar lata, Tłuja jako symbol płodności. „Ptaki” — ojciec hoduje egzotyczne ptaki, Adela je rozpędza. „Traktat o Manekinach” — ojciec głosi heretycką doktrynę o materii i wtórej demiurgii. „Ulica Krokodyli” — pseudoamerykańska dzielnica tandety i pozorów.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które elementy biblijne i mitologiczne obecne są w „Sklepach cynamonowych”?",
      content: {
        options: [
          "Ojciec jako prorok Starego Testamentu dialogujący z Jehową (opowiadanie „Nawiedzenie”)",
          "Dach domu jako Arka Noego (opowiadanie „Ptaki”)",
          "Motyw Odysa wracającego do domu po wojnie trojańskiej",
          "Adela porównana do Menady — szalejącej kapłanki Dionizosa",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Ojciec dialoguje z Jehową jak prorok (Nawiedzenie), dach staje się Arką Noego (Ptaki), Adela jest porównana do Menady (Ptaki). Motyw Odysa nie pojawia się w zbiorze — choć motyw wędrówki i labiryntu jest obecny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które techniki literackie stosuje Schulz w „Sklepach cynamonowych”?",
      content: {
        options: [
          "Mityzacja — nadawanie codzienności cech mitu",
          "Synestezja — łączenie wrażeń różnych zmysłów",
          "Konsekwentny realizm społeczny w duchu pozytywizmu",
          "Animizacja — ożywianie przedmiotów i materii",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Schulz stosuje mityzację (ojciec jako patriarcha, miasteczko jako mityczna kraina), synestezję (dźwięki mają barwy, barwy — zapachy), animizację (tapety rosną, lampy więdną, meble „oddychają”). Realizm społeczny jest mu całkowicie obcy.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Które z poniższych metamorfoz ojca zachodzą w zbiorze?",
      content: {
        options: [
          "Ojciec maleje, chudnie i stopniowo zanika fizycznie",
          "Ojciec przybiera pozy ptaków — pieje jak kogut, trzepoce rękami",
          "Ojciec zamienia się w karakona",
          "Ojciec przekształca się w drzewo",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Ojciec maleje fizycznie (Nawiedzenie), naśladuje ptaki — pieje, trzepoce rękami (Ptaki), przemienia się w karakona — naśladuje ich ruchy, ciało pokrywają czarne plamy (Karakony). Metamorfoza w drzewo nie występuje.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Co wydarzyło się z koniem dorożkarskim pod koniec opowiadania „Sklepy cynamonowe”?",
      content: {
        instruction: "Opisz scenę i wyjaśnij jej symboliczne znaczenie.",
      },
      correctAnswer:
        "Koń dorożkarski wiezie narratora przez magiczną zimową noc, aż zatrzymuje się wyczerpany w śniegu. Na jego brzuchu widać czarną ranę. Na pytanie narratora odpowiada: „Drogi mój — to dla ciebie” i staje się mały jak konik z drzewa. To scena poświęcenia — koń oddaje życie za podróż chłopca. Symbolizuje ofiarność, ale też oniryczną logikę snu, w którym zwierzę mówi ludzkim głosem.",
      metadata: {
        explanation:
          "Scena z koniem to kulminacja oniryzmu — zwierzę mówi, poświęca się, zmienia rozmiar. Łączy bajkowość (mówiący koń) z tragizmem (ofiara) i symboliką chrześcijańską (poświęcenie za kogoś).",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Metamorfozy ojca w „Sklepach cynamonowych” — od kupca do demiurga, od demiurga do owada",
        requirements: [
          "Wymień co najmniej trzy etapy przemiany ojca",
          "Wskaż opowiadania, w których zachodzą poszczególne metamorfozy",
          "Wyjaśnij, co te metamorfozy symbolizują",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Notatka powinna obejmować: 1) Ojciec jako kupiec i ekscentryk (Sierpień, Nawiedzenie) — choroba, monologi, dialog z Bogiem. 2) Ojciec jako demiurg — hodowla ptaków (Ptaki), prelekcje o materii (Traktat o Manekinach). 3) Ojciec jako istota zanikająca — maleje, naśladuje ptaki, pieje jak kogut (Nawiedzenie, Ptaki). 4) Ojciec jako karakon — fascynacja przeradza się w metamorfozę, zlewa się z owadami (Karakony). Symbolika: degradacja od ducha do materii, od twórcy do stworzenia, od Boga do robaka — jak biblijny Hiob.",
      metadata: {
        explanation:
          "Metamorfozy ojca są osią kompozycyjną zbioru. Schulz kreuje ojca jako figurę archetypową — od patriarchy i demiurga po istotę zanikającą, „kupkę śmieci” wymiecioną przez Adelę.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Dlaczego tytułowe sklepy cynamonowe można interpretować jako symbol utraconej arkadii dzieciństwa?",
      content: {
        options: [
          "Bo narrator odwiedza je regularnie i kupuje tam zabawki",
          "Bo istnieją jako niedościgłe pragnienie — narrator nigdy do nich nie dociera, a ich egzotyczność ucieleśnia magiczny świat dziecięcej wyobraźni, do którego dorosły nie może powrócić",
          "Bo są jedynym miejscem w miasteczku, gdzie ojciec jest szczęśliwy",
          "Bo przechowują w nich pamiątki po dzieciństwie narratora",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sklepy cynamonowe to miejsce mityczne — narrator pamięta ich zapach kadzidła, egzotyczne towary, rzadkie książki, ale podczas nocnej wędrówki nigdy do nich nie dociera. Są metaforą dziecięcego zachwytu światem, który dorosły wspomina z tęsknotą, ale którego nie może odzyskać.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Jak rozumieć zdanie ojca: „Nie ma materii martwej — martwota jest jedynie pozorem, za którym ukrywają się nieznane formy życia”?",
      content: {
        options: [
          "Ojciec jest naukowcem i formułuje hipotezę biologiczną",
          "To centralna teza jego filozofii demiurgicznej — materia jest żywa, płodna, pełna ukrytych form, czeka na impuls twórczy, by się objawić",
          "Ojciec cytuje podręcznik fizyki kwantowej",
          "To żart skierowany do szwaczek Poldy i Pauliny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zdanie to jest kluczem do filozofii ojca-demiurga: materia nie jest bierna — „faluje od nieskończonych możliwości”, „kusi tysiącem słodkich okrąglizn”. To pseudoreligijna doktryna witalistyczna, w której Schulz łączy filozofię, mistykę żydowską i surrealizmem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Co łączy „Karakony” Schulza z „Przemianą” Kafki?",
      content: {
        options: [
          "Obie opowieści rozgrywają się w Pradze",
          "W obu utworach bohater ulega metamorfozie w owada — u Kafki jest to nagła przemiana Gregora Samsy, u Schulza stopniowa degradacja ojca, który „zlewa się” z plemieniem karakonów",
          "Oba utwory są satyrą na życie urzędnicze w Austro-Węgrzech",
          "Kafka i Schulz byli przyjaciółmi i wspólnie wymyślili motyw metamorfozy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Parallela Schulz–Kafka jest klasycznym kontekstem maturalnym. U Kafki metamorfoza jest nagła i dosłowna — Gregor budzi się jako robak. U Schulza jest stopniowa, groteskowa i mityczna — ojciec wchłania karakoni rytuał, aż staje się od nich nieodróżnialny. Obie metamorfozy wyrażają degradację i wyobcowanie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Czym jest mityzacja w prozie Schulza?",
      content: {
        options: [
          "Wiernym odtworzeniem mitów greckich w realiach XX-wiecznej Polski",
          "Zabiegiem nadającym codzienności cechy mitu — czas staje się cykliczny, ojciec archetypem, miasteczko labiryntem, a zwykłe wydarzenia zyskują wymiar sakralny",
          "Techniką polegającą na wymyślaniu nowych mitów dla celów propagandowych",
          "Opisywaniem snów, w których pojawiają się postaci mitologiczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mityzacja u Schulza to kreowanie rzeczywistości na wzór mitu: czas jest cykliczny (pory roku, nie daty), ojciec to archetyp (patriarcha, demiurg, prorok), przestrzeń jest labiryntowa i metamorficzna. Schulz nie opowiada mitów — on mitologizuje codzienność galicyjskiego miasteczka.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które z poniższych interpretacji postaci ojca są uzasadnione tekstem?",
      content: {
        options: [
          "Ojciec jako alter ego samego Schulza — artysta-wizjoner pokonany przez prozę codzienności",
          "Ojciec jako starotestamentowy Bóg — demiurg, prorok, patriarcha z imienia (Jakub)",
          "Ojciec jako krytyk kapitalizmu walczący z wyzyskiem robotników",
          "Ojciec jako figura masochistyczna — poddaje się władzy Adeli i destrukcji swoich światów",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Ojciec jest wieloznaczny: alter ego Schulza (artysta przegrywający z banałem), figura biblijna (Jakub, Noe, prorok, demiurg), postać masochistyczna (poddańcze relacje z Adelą). Nie jest krytykiem kapitalizmu — „Ulica Krokodyli” to Schulzowski komentarz, ale nie wypowiedź ojca.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które cechy „Sklepów cynamonowych” świadczą o przynależności do awangardy literackiej dwudziestolecia?",
      content: {
        options: [
          "Oniryzm — zacieranie granicy między jawą a snem",
          "Surrealistyczne metamorfozy — ludzie zamieniają się w ptaki i owady",
          "Linearna, chronologiczna fabuła z wyraźnym początkiem i końcem",
          "Proza poetycka — liryzacja języka, synestezja, metaforyczność opisu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Schulz to awangardzista: oniryzm (senna logika narracji), surrealizm (metamorfozy, ożywianie materii), proza poetycka (język nasycony metaforą, synestezją, rytmem). Fabuła NIE jest linearna ani chronologiczna — jest luźna, epizodyczna, cykliczna.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które z poniższych opozycji organizują świat „Sklepów cynamonowych”?",
      content: {
        options: [
          "Ojciec (duch, wyobraźnia, kreacja) vs. Adela (ciało, zmysłowość, destrukcja)",
          "Lato (żar, płodność, bujność) vs. zima (szarość, nuda, pustka)",
          "Miasto (harmonia, piękno) vs. wieś (zacofanie, nędza)",
          "Magiczne miasteczko (autentyczność, mit) vs. Ulica Krokodyli (tandeta, imitacja, pozór)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Trzy kluczowe opozycje: ojciec/Adela (duch vs ciało), lato/zima (pełnia vs pustka), miasteczko/Ulica Krokodyli (autentyczność vs tandeta). Opozycja miasto/wieś nie jest obecna — cała akcja toczy się w miasteczku.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Jaką rolę pełni motyw labiryntu w zbiorze? Podaj co najmniej dwa przykłady z różnych opowiadań.",
      content: {},
      correctAnswer:
        "Labirynt jest kluczową metaforą przestrzeni w zbiorze: 1) Miasteczko jako labirynt — w „Sklepach cynamonowych” narrator gubi się w nocnych ulicach, które zmieniają konfigurację, otwierają się „ulice podwójne, ulice sobowtóry”. 2) Dom rodzinny jako labirynt — w „Nawiedzeniu” mieszkanie nie ma „określonej liczby pokojów”, lokatorzy znikają, a pokoje się zapominają. 3) Psychika ojca jako labirynt — „myśl jego zapuszczała się tajnie w labirynty własnych wnętrzności”. Labirynt symbolizuje zagubienie, nieosiągalność celu i nieskończoność wyobraźni.",
      metadata: {
        explanation:
          "Motyw labiryntu to jeden z najważniejszych w zbiorze — łączy przestrzeń, psychikę i narrację. Na maturze często pojawia się w pytaniach o kreację przestrzeni u Schulza.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Ojciec jako demiurg i herezjarcha — analiza „Traktatu o Manekinach” w kontekście filozofii tworzenia",
        requirements: [
          "Wyjaśnij, czym jest „wtóra demiurgia” i czemu ojciec ją postuluje",
          "Odnieś się do stosunku ojca do materii (apologia tandety)",
          "Porównaj demiurgię ojca z twórczością Boga-Demiurgosa",
          "Oceń, czy ojciec jest twórcą, czy szaleńcem",
          "150-200 słów",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna: wyjaśnić, że ojciec chce tworzyć nie w konkurencji z Bogiem, lecz „we własnej, niższej sferze” — z tandety, papier-mâché, kłaków. Jego twory mają być prowizoryczne, „na jeden raz”, z jedną ręką i jedną nogą. Apologia tandety = miłość do materii „jako takiej” — jej puszystości, oporności, niedźwiedziowatości. Kontrast z Demiurgosem: Bóg ukrywa materię pod grą życia, ojciec chce ją odsłonić. Ocena: ojciec jest jednocześnie genialnym wizjonerem (artysta tworzący nowe światy) i tragicznym szaleńcem (jego twory rozsypują się, a sam zostaje pokonany przez Adelę).",
      metadata: {
        explanation:
          "„Traktat o Manekinach” to manifest artystyczny Schulza — wyrażony ustami ojca. Apologia tandety to apologia sztuki nieperfekcyjnej, ludzkiej, skazanej na porażkę, ale przez to autentycznej.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Dzieciństwo jako utracony raj. Rozważ problem, odwołując się do „Sklepów cynamonowych” Brunona Schulza i jednego innego tekstu kultury.",
      content: {
        requirements: [
          "Wyjaśnij, jak Schulz kreuje dzieciństwo narratora — jako czas mityczny, magiczny, nieodzyskiwalny",
          "Odwołaj się do co najmniej dwóch opowiadań ze zbioru",
          "Porównaj z innym tekstem kultury (np. „Pan Tadeusz” — Soplicowo, „Mały Książę” — planeta, „Ferdydurke” — powrót do dzieciństwa)",
          "Sformułuj wniosek: czy tęsknota za dzieciństwem jest uniwersalna?",
          "Minimum 300 słów",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: pokazać dzieciństwo u Schulza jako czas magiczny (Sierpień — zmysłowość lata, Sklepy cynamonowe — ekscytacja nocnej wędrówki, Nemrod — odkrywanie życia), kreowany jako mit (czas cykliczny, przestrzeń labiryntowa, ojciec jako bóstwo). Porównanie: np. z Panem Tadeuszem (Soplicowo = utracony raj szlachecki, epilog = tęsknota emigranta) lub Małym Księciem (planeta = świat prostoty utraconej w dorosłości). Wniosek: tęsknota za dzieciństwem jest uniwersalnym doświadczeniem, ale Schulz pokazuje, że dzieciństwo nie jest wspomnieniem faktów, lecz wspomnieniem sposobu widzenia — intensywności, wrażliwości, magii.",
      metadata: {
        explanation:
          "Motyw utraconego dzieciństwa to jeden z najczęstszych tematów maturalnych w kontekście Schulza. Kluczowe: dzieciństwo u Schulza nie jest realistycznym wspomnieniem, lecz mityczną rekonstrukcją.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Jak można zinterpretować stosunek ojciec–Adela w kontekście masochizmu Schulzowskiego?",
      content: {
        options: [
          "Adela jest po prostu dobrą służącą, a ojciec szanuje jej pracę — relacja jest neutralna",
          "Adela reprezentuje triumf cielesności i zmysłowości nad duchem i wyobraźnią — ojciec poddaje się jej z rozkosznym lękiem, co odzwierciedla Schulzowski masochizm: ekstatyczne uleganie kobiecej sile jako formę quasi-religijnego rytuału",
          "Ojciec kontroluje Adelę i wykorzystuje ją do swoich eksperymentów",
          "Relacja jest wyłącznie komiczna — Schulz parodiuje domowe hierarchie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Relacja ojciec–Adela to centralna oś masochizmu Schulzowskiego, widocznego też w grafice „Xięgi Bałwochwalczej”. Ojciec-demiurg, władca ptasiego królestwa, pada na kolana przed pantofelkiem Adeli. Kobiecość jest siłą niszczycielską, ale zarazem fascynującą — ojciec doświadcza „rozkosznego spazmu” wobec jej władzy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Dlaczego „Ulicę Krokodyli” można czytać jako metapoetycką refleksję Schulza o naturze fikcji?",
      content: {
        options: [
          "Bo Schulz cytuje w niej innych pisarzy, budując intertekstualny dialog",
          "Bo narrator wprost opisuje rzeczywistość tej dzielnicy jako „cienką jak papier”, imitatywną, „fotomontaż z wycinków zeszłorocznych gazet” — dzielnica jest fikcją w fikcji, obnażającą mechanizm literackiej iluzji",
          "Bo opowiadanie jest autobiograficzną relacją z wizyty Schulza w wielkim mieście",
          "Bo ulica nosi imię zwierzęcia, co zawsze oznacza alegorię",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Ulica Krokodyli” to jedyne opowiadanie, w którym narrator odsłania iluzoryczność świata przedstawionego: „rzeczywistość jest cienka jak papier”, „nic nie dochodzi do skutku”, wszystko „zdradza swą imitatywność”. To metafikcja — Schulz komentuje własną technikę tworzenia światów, które nie mają substancji, lecz tylko pozór.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Co oznacza synestezja w kontekście prozy Schulza i który fragment najlepiej ją ilustruje?",
      content: {
        sourceText: {
          author: "Bruno Schulz",
          title: "Sklepy cynamonowe — Sierpień",
          text: "Cisza drgających słojów powietrznych, kwadraty blasku, śniące żarliwy swój sen na podłodze; melodia katarynki, dobyta z najgłębszej złotej żyły dnia.",
        },
        options: [
          "Synestezja to opis przyrody za pomocą metafor — „złota żyła dnia” jest zwykłą metaforą, nie synestezją",
          "Synestezja to łączenie wrażeń różnych zmysłów — w cytacie cisza jest zmysłowa (dotyk, wzrok), blaski „śnią” (personifikacja), melodia wydobywa się z „żyły” dnia (dźwięk = materia)",
          "Synestezja to technika malarstwa abstrakcyjnego, nie literatury",
          "Synestezja oznacza tu, że narrator nie rozróżnia swoich zmysłów z powodu choroby",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Synestezja (z gr. syn + aisthesis = współ-odczuwanie) to łączenie wrażeń z różnych zmysłów. U Schulza jest fundamentem stylu: cisza ma „słoje” (dotyk), blaski „śnią” (personifikacja), melodia wydobywa się z „złotej żyły” (dźwięk = materia, głębia). Proza Schulza jest architekturą zmysłów — nie opisuje, lecz konstruuje doznania.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które porównania międzytekstowe z innymi dziełami są uzasadnione?",
      content: {
        options: [
          "Schulz i Kafka — metamorfoza człowieka w owada (Karakony vs Przemiana)",
          "Schulz i Proust — dzieciństwo jako utracony czas, odzyskiwany przez wspomnienia zmysłowe",
          "Schulz i Sienkiewicz — panorama społeczna XIX-wiecznej Polski",
          "Schulz i Gombrowicz — groteska, deformacja rzeczywistości, podważanie formy (choć innymi środkami)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kafka: metamorfoza w owada. Proust: wspomnienie zmysłowe jako klucz do utraconego czasu (madlenka = owoce Adeli). Gombrowicz: obaj deformują rzeczywistość, stosują groteskę, podważają konwencje — choć Schulz lirycznie, a Gombrowicz intelektualnie. Sienkiewicz i panorama społeczna są Schulzowi zupełnie obcy.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Które aspekty „Sklepów cynamonowych” nawiązują do tradycji i mistyki żydowskiej?",
      content: {
        options: [
          "Imię ojca — Jakub, jak patriarcha z Księgi Rodzaju",
          "Motyw Księgi — kalendarza jako „wielkiej księgi roku” zawierającej wszelką wiedzę",
          "Demiurgia ojca — nawiązanie do kabalistycznego pojęcia tworzenia przez emanację",
          "Monotematyczny opis życia polskiej szlachty w Galicji",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Schulz czerpie z tradycji żydowskiej: Jakub = patriarcha, Księga = Tora/wiedza/kalendarz, demiurgia = kabalistyczne tworzenie przez emanację (sefirot). Ojciec jest jednocześnie prorokiem, Noem i kabalistą. Opis szlachty galicyjskiej jest obcy temu zbiorowi.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Porównaj kreację przestrzeni w „Sklepach cynamonowych” Schulza z kreacją przestrzeni w innym dziele literackim. Wskaż podobieństwa i różnice.",
      content: {
        instruction:
          "Odwołaj się do motywu labiryntu, metamorfozy przestrzeni i funkcji, jaką pełni przestrzeń w obu utworach.",
      },
      correctAnswer:
        "U Schulza przestrzeń jest oniryczna, labiryntowa, płynna — ulice zmieniają konfigurację, dom ma nieokreśloną liczbę pokojów, miasteczko jest zarazem konkretne i mityczne. Porównanie np. z Kafką („Proces” — biurokracja jako labirynt, sąd ukryty na strychach kamienic) lub z „Panem Tadeuszem” (Soplicowo jako arkadyjska przestrzeń zamknięta, stabilna — przeciwieństwo Schulzowskiej metamorfozy). Różnica: u Schulza przestrzeń jest projekcją psychiki narratora (dziecięca wyobraźnia przetwarza realia), u Kafki — projekcją systemu opresji, u Mickiewicza — projekcją tęsknoty emigranta.",
      metadata: {
        explanation:
          "Kreacja przestrzeni to jedno z najczęstszych pytań maturalnych o Schulza (egzamin rozszerzony). Kluczowe: przestrzeń u Schulza nie jest tłem, lecz bohaterem — podlega metamorfozom jak postacie.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Wyjaśnij, dlaczego „Sklepy cynamonowe” nazywane są prozą poetycką. Podaj trzy cechy stylu Schulza, które uzasadniają to określenie.",
      content: {},
      correctAnswer:
        "Proza poetycka to gatunek łączący prozę z poezją: 1) Metaforyczność — Schulz nie opisuje, lecz przetwarza rzeczywistość w łańcuchy metafor (lato to „wielka księga wakacji”, lampy „więdną jak bodiaki”, tapety „rosną” nocą). 2) Synestezja i rytm — łączenie zmysłów (cisza ma „słoje”, melodia katarynki wydobywa się z „złotej żyły dnia”), zdania mają rytm i kadencję poetycką. 3) Dominacja obrazu nad fabułą — fabuła jest pretekstowa, najważniejsza jest wizja, nastrój, barwa, intensywność doznania zmysłowego. Schulz nie opowiada historii — tworzy obrazy poetyckie w formie prozy.",
      metadata: {
        explanation:
          "Pytanie o prozę poetycką Schulza jest klasycznym pytaniem maturalnym z zakresu LANGUAGE_USE. Kluczowe terminy: metaforyzacja, synestezja, liryzacja prozy, dominacja obrazu nad fabułą.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "„Sklepy cynamonowe” wobec tradycji literackiej — jak Schulz dialoguje z Biblią, surrealizmem i ekspresjonizmem",
        requirements: [
          "Wskaż elementy biblijne (imiona, motywy, ojciec jako prorok/demiurg)",
          "Wskaż elementy surrealistyczne (oniryzm, metamorfozy, logika snu)",
          "Wskaż elementy ekspresjonistyczne (deformacja, intensywność doznań, groteska)",
          "Wyjaśnij, co jest specyficznie Schulzowskie — czego nie da się sprowadzić do żadnej z tych tradycji",
          "200-250 słów",
        ],
        wordLimit: { min: 200, max: 250 },
      },
      correctAnswer:
        "Notatka powinna: wskazać Biblię (Jakub, Noe, prorocy, Demiurgos, Księga), surrealizm (metamorfozy, oniryzm, automatyzm snu, irracjonalność), ekspresjonizm (deformacja rzeczywistości, groteska, intensywność, hiperbolizacja doznań zmysłowych). Specyficznie Schulzowskie: mityzacja codzienności galicyjskiego miasteczka — żadna tradycja z osobna nie tłumaczy tego, jak Schulz z prowincjonalnego sklepu z suknem tworzy kosmogonię, z ojca-kupca — Boga-Stwórcę, z pory roku — cykl mityczny. Schulz syntetyzuje tradycje w niepowtarzalny idiom: proza poetycka, która jest jednocześnie filozofią materii, teologią tworzenia i autobiografią wyobraźni.",
      metadata: {
        explanation:
          "Pytanie o tradycje literackie jest typowe dla matury rozszerzonej (poziom 5). Kluczowe: Schulz nie „należy” do surrealizmu czy ekspresjonizmu — czerpie z nich, ale tworzy idiom niepasujący do żadnej szufladki.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Jaką rolę w literaturze pełni groteska? Rozważ problem, odwołując się do „Sklepów cynamonowych” Brunona Schulza i jednego innego tekstu kultury.",
      content: {
        requirements: [
          "Zdefiniuj groteskę jako kategorię estetyczną (łączenie komizmu z tragizmem, deformacja, absurd)",
          "Przeanalizuj groteskę u Schulza: metamorfozy ojca, scena na urynale, relacja z Adelą, Tłuja",
          "Porównaj z innym tekstem kultury stosującym groteskę (np. „Ferdydurke” Gombrowicza, „Proces” Kafki, „Tango” Mrożka)",
          "Sformułuj wniosek: czy groteska odkrywa prawdę o świecie, czy go zaciemnia?",
          "Minimum 300 słów",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: zdefiniować groteskę (deformacja, mieszanie rejestrów, śmiech i groza jednocześnie). U Schulza: ojciec-prorok siedzący na urynale, demiurg uciekający przed palcem Adeli, metamorfoza w karakona — tragiczne i komiczne zarazem. Porównanie: Gombrowicz (groteska jako demaskacja formy społecznej — Ferdydurke), Kafka (groteska jako absurd systemu — Proces), Mrożek (groteska jako krytyka ideologii — Tango). Wniosek: groteska u Schulza nie zaciemnia prawdy — odsłania ją: ludzka egzystencja jest jednocześnie wzniosła i żałosna, sakralna i śmieszna. Groteska jest narzędziem prawdy, nie ucieczką od niej.",
      metadata: {
        explanation:
          "Groteska to jedno z najczęstszych zagadnień maturalnych. Schulz jest wzorcowym przykładem groteski poetyckiej — łączy liryzm z absurdem, patos z komizmem.",
      },
    },

    // ======================= KONIEC PYTAŃ SKLEPY CYNAMONOWE ===================//

    // ======================= POCZATEK PYTAN KONRAD WALLENROD ===================//
    // UWAGA: Polskie cudzyslowy zastapione prostymi "" aby nie psuc JSON

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: 'Kto jest autorem "Konrada Wallenroda"?',
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
          '"Konrad Wallenrod" to powiesc poetycka Adama Mickiewicza, wydana w 1828 roku w Petersburgu. Utwor powstal w czasie zeslania poety w Rosji.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: 'Jaki gatunek literacki reprezentuje "Konrad Wallenrod"?',
      content: {
        options: [
          "Ballada",
          "Powiesc poetycka",
          "Dramat romantyczny",
          "Poemat dygresyjny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Konrad Wallenrod" to powiesc poetycka -- gatunek synkretyczny laczacy elementy epiki (narracja), liryki (wierszowana forma, piesni) i dramatu (dialogi). Tworcami gatunku byli Walter Scott i George Byron.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: 'Jak naprawde nazywa sie glowny bohater "Konrada Wallenroda"?',
      content: {
        options: ["Konrad von Wallenrod", "Walter Alf", "Halban", "Witold"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Prawdziwe imie bohatera to Walter Alf -- Litwin porwany jako dziecko przez Krzyzakow. Przybral tozsamosc rycerza Wallenroda, aby wniknac w struktury Zakonu i zniszczyc go od srodka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: 'Gdzie rozgrywa sie glowna akcja "Konrada Wallenroda"?',
      content: {
        options: [
          "W Krakowie",
          "W Maryjenburgu (Malborku) -- siedzibie Zakonu Krzyzackiego",
          "W Wilnie",
          "W Petersburgu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Glowna akcja toczy sie w Maryjenburgu (Malborku) -- stolicy Zakonu Krzyzackiego. Poboczne watki dzieja sie na Litwie (Kowno, zamek Kiejstuta) i na pograniczu litewsko-pruskim.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Kim jest Aldona w utworze?",
      content: {
        options: [
          "Sluzaca w zamku krzyzackim",
          "Zona Waltera Alfa, corka ksiecia Kiejstuta, pustelnica zamknieta w wiezy",
          "Matka Konrada Wallenroda",
          "Zakonnica z klasztoru w Malborku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Aldona to corka litewskiego ksiecia Kiejstuta i zona Waltera Alfa. Gdy maz odjezdza realizowac plan zemsty, Aldona zamyka sie w wiezy zamkowej jako pustelnica, aby byc blisko niego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Kim jest Halban?",
      content: {
        options: [
          "Wielkim mistrzem Zakonu Krzyzackiego",
          "Starym wajdelota litewskim, opiekunem i powiernikiem Konrada",
          "Bratem Aldony",
          "Szpiegiem Krzyzakow na Litwie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Halban to stary wajdelota (bard litewski), ktory opiekowal sie Walterem Alfem od dziecinstwa, rozbudzal w nim milosc do Litwy i nienawsc do Krzyzakow. Jest zarowno spowiednikiem, jak i powiernikiem Konrada.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Ktore z ponizszych postaci wystepuja w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Halban -- stary wajdelota",
          "Aldona -- zona Waltera Alfa",
          "Jacek Soplica",
          "Kiejstut -- ksiaze litewski",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Halban, Aldona i Kiejstut to postacie z "Konrada Wallenroda". Jacek Soplica to bohater "Pana Tadeusza" Mickiewicza.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Ktore informacje o utworze sa prawdziwe?",
      content: {
        options: [
          "Utwor zostal wydany w 1828 roku",
          "Akcja rozgrywa sie w XIV wieku",
          "Mickiewicz pisal go na zeslaniu w Rosji",
          "Jest to dramat w pieciu aktach",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Konrad Wallenrod" ukazal sie w 1828 r., akcja toczy sie w XIV w. (czasy walk Litwy z Zakonem), Mickiewicz pisal go na zeslaniu w Rosji (1825-1827). Nie jest to dramat -- to powiesc poetycka.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: 'Ktore formy liryczne zawarte sa w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Hymn do Ducha Swietego",
          "Piesn Wajdeloty",
          'Ballada "Alpuhara"',
          "Sonet krymski",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'W utworze znajduja sie: Hymn (spiewany na kapitule), Piesn Wajdeloty (o historii Litwy), ballada "Alpuhara" (o podstepu Almanzora). Sonety krymskie to odrebny cykl Mickiewicza.',
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Z jakiego dziela pochodzi motto "Konrada Wallenroda" i co ono oznacza?',
      content: {
        hints: ["Machiavelli", "lis i lew", "Ksiaze"],
      },
      correctAnswer:
        'Motto pochodzi z "Ksiecia" Niccola Machiavellego. W tlumaczeniu brzmi: trzeba byc lisem i lwem -- czyli laczyc sile z podstepem. Zapowiada ono glowny problem utworu: koniecznosc uzycia zdrady (lis) w walce z poteznym wrogiem (lew).',
      metadata: {
        explanation:
          "Motto z Machiavellego jest kluczem interpretacyjnym do calego utworu. Konrad Wallenrod realizuje strategie lisa -- niszczy Zakon od srodka podstepem, bo w otwartej walce (lew) Litwa nie mogla wygrać.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "W jaki sposob Walter Alf trafil do Krzyzakow?",
      content: {
        options: [
          "Dobrowolnie uciekl z Litwy",
          "Zostal porwany jako dziecko podczas najazdu Krzyzakow na litewskie miasto",
          "Zostal sprzedany przez litewskiego kupca",
          "Przybyl jako ambasador Kiejstuta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Walter Alf zostal porwany jako male dziecko podczas nocnego najazdu Krzyzakow na litewskie miasto. Pamietalegal tylko krzyk matki i pozar. Wychowywal go mistrz krzyzacki Winrych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Co opowiada ballada "Alpuhara" spiewana przez Konrada na uczcie?',
      content: {
        options: [
          "Historie milosci Waltera i Aldony",
          "Historie Almanzora, ktory wraca do Hiszpanow udajac poddanie sie, aby zaraze ich dzuma",
          "Legende o zalozeniu Zakonu Krzyzackiego",
          "Opowiesc o wajdelocie Halbanie i jego piesniach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ballada "Alpuhara" opowiada o mauretanskim krolu Almanzorze, ktory po upadku twierdzy wraca do Hiszpanow, udajac ze chce sie poddac, ale w rzeczywistosci przynosi im zarase. To parabola wlasnego planu Konrada -- niszczenia wroga od srodka.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Czym jest wallenrodyzm?",
      content: {
        options: [
          "Otwarta walka zbrojna z wrogiem w obronie ojczyzny",
          "Postawa polegajaca na niszczeniu wroga od srodka za pomoca podstepu i zdrady, nawet kosztem wlasnego honoru i szczescia",
          "Pokojowe negocjacje z nieprzyjacielem",
          "Emigracja z ojczyzny w celu szukania pomocy za granica",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wallenrodyzm to postawa bohatera, ktory niszczy wroga od srodka -- infiltruje jego struktury, zdobywa wladze, a nastepnie celowo prowadzi do kleski. Wymaga nieetycznego postepowania (zdrada, klamstwo) w imie wyzszego celu (obrona ojczyzny). Cena: utrata honoru, milosci, zycia.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Jak reaguje Witold na piesn Wajdeloty podczas uczty?",
      content: {
        options: [
          "Jest obojetny i nie slucha",
          "Blednie, czerwieni sie, w koncu wybucha placzem -- pieśn porusza jego sumienie zdrajcy",
          "Smieje sie i klaska",
          "Wychodzi z sali protestujac przeciw obecnosci Litwina",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Witold, litewski ksiaze ktory zdrazil ojczyzne i szuka sojuszu z Zakonem, reaguje gwaltownie: blednie, sinieje, czerwieni sie, sciska szable -- a na koncu wybucha placzem, zaslaniaiac twarz plaszczem. Piesn Wajdeloty poruszyła jego sumienie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Jak ginie Konrad Wallenrod?",
      content: {
        options: [
          "Zostaje stracony publicznie przez Krzyzakow",
          "Ginie w bitwie z Litwinami",
          "Wypija trucizne i umiera w swojej strzelnicy, zanim Krzyzacy zdaza go schwytac",
          "Ucieka do Litwy i ginie na granicy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Konrad, wiedzac o wyroku tajnego trybunalu, wypija trucizne w swojej strzelnicy. Przed smiercia ciska lampe z okna -- sygnal dla Aldony, ze juz nie wróci. Aldona wydaje przerazliwy krzyk i rowniez umiera.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Polacz postacie z ich rolami w utworze:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Walter Alf / Konrad" },
          { id: "B", text: "Aldona" },
          { id: "C", text: "Halban" },
          { id: "D", text: "Witold" },
        ],
        rightColumn: [
          { id: "1", text: "Litewski zdrajca szukajacy sojuszu z Zakonem" },
          { id: "2", text: "Wajdelota, stroz pamieci i sumienia bohatera" },
          { id: "3", text: "Pustelnica zamknieta w wiezy z milosci do meza" },
          {
            id: "4",
            text: "Litwin udajacy Krzyzaka, wielki mistrz-sabotazysta",
          },
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
          "Walter Alf/Konrad to Litwin infiltrujacy Zakon. Aldona zamknela sie w wiezy, by byc przy mezu. Halban to straznik pamieci narodowej. Witold to zdrajca, ktory jednak pod wplywem piesni odzyskuje sumienie.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Uzupelnij zdania, wybierajac poprawne opcje:",
      content: {
        textWithGaps:
          "Konrad zostal wybrany wielkim mistrzem dzieki (1). Aby zniszczyc Zakon, ceolwo (2). Plan zniszczenia Zakonu zainspirowal go (3).",
        gaps: [
          {
            id: 1,
            options: [
              "slawie wojennej i pozornej poboznosci",
              "bogactwu i przekupstwu",
              "protekcji papieskiej",
              "pokrewienstwu z poprzednim mistrzem",
            ],
          },
          {
            id: 2,
            options: [
              "otrul zrodla wody w zamku",
              "prowadzil wojny tak, aby je przegrywac",
              "wysylal listy do Litwinow",
              "zabiial Krzyzakow we snie",
            ],
          },
          {
            id: 3,
            options: [
              "Halban od dziecinstwa",
              "Aldona przed slubem",
              "papiez listem",
              "Witold w czasie uczty",
            ],
          },
        ],
      },
      correctAnswer: [0, 1, 0],
      metadata: {
        explanation:
          "Konrad zostal mistrzem dzieki slawie rycerskiej i pozornej poboznosci. Jego plan polegeal na celowym przegrywaniu wojen -- wyniszczyl armie Zakonu na litewskich stepach. Plan zemsty rozbudzal w nim od dziecinstwa wajdelota Halban.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Ktore z ponizszych motywow sa obecne w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Motyw zdrady w imie wyzszego celu",
          "Motyw poety/pieśniarza jako straza pamieci narodowej",
          "Motyw nieszczesliwej milosci -- poswieconej dla ojczyzny",
          "Motyw sielanki wiejskiej i szczesliwego zycia na wsi",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Konrad Wallenrod" zawiera motywy: zdrady patriotycznej (wallenrodyzm), roli poety w narodzie (Piesn Wajdeloty o pieśni gminnej), nieszczesliwej milosci (Alf i Aldona). Nie ma motywu sielanki -- utwor jest peleon tragizmu.',
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Czym jest zabieg "maski historycznej" zastosowany w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Uzyciem kostiumow i masek na balu w Malborku",
          "Osadzeniem akcji w sredniowiecznej Litwie, aby pod pozorem historii opowiadac o wspolczesnej sytuacji Polski pod zaborami",
          "Ukryciem twarzy bohatera pod szyszakiem rycerskim",
          "Zmiana nazwiska bohatera z Alf na Wallenrod",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Maska historyczna to zabieg polegajacy na ukryciu wspolczesnych tresci pod szata historyczna. Mickiewicz, piszac o walce Litwinow z Zakonem Krzyzackim (XIV w.), mowil w istocie o walce Polakow z zaborca rosyjskim (XIX w.). Zabieg pozwolil ominac cenzure caraska.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Jaka jest funkcja Piesni Wajdeloty w kontekscie calego utworu?",
      content: {
        options: [
          "Sluzy wylacznie rozrywce gości na uczcie",
          "Jest manifestem o roli piesni gminnej jako skarbca pamieci narodowej -- zachowujacej tozsamosc narodu nawet po utracie panstwa",
          "Opowiada wylacznie o milosci Waltera i Aldony",
          "Jest modlitwa do Boga o pomoc w walce z Krzyzakami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Piesn Wajdeloty to hymn o roli piesni gminnej (tradycji ustnej) w zyciu narodu: 'O wiesci gminna! Ty arko przymierza / Miedzy dawnymi i mlodszymi laty'. Piesn jest skarbcem pamieci -- przetrwa, gdy plomien rozgryzie malowane dzieje, a skarby mieczowi spustosza zlodzieje.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Na czym polega tragizm Konrada Wallenroda?",
      content: {
        options: [
          "Na tym, ze ponosi porazke wojenna i nie niszczy Zakonu",
          "Na tym, ze musi wybierac miedzy dwoma wartosciami: etyke rycerska (honor) a patriotyzmem (zemsta za ojczyzne) -- kazdy wybor oznacza strate",
          "Na tym, ze Aldona nie chce na niego czekac",
          "Na tym, ze Halban go zdradza",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tragizm Konrada polega na konflikcie dwoch wartosci: honoru rycerskiego (walka twarzą w twarz) i milosci do ojczyzny (jedyny sposob na pokonanie Zakonu to zdrada). Wybierając ojczyzne, traci honor, milosc, szczescie i zycie. To klasyczny konflikt tragiczny romantyzmu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Co oznacza porownanie sokoła w Powiesci Wajdeloty?",
      content: {
        sourceText: {
          author: "Adam Mickiewicz",
          title: "Konrad Wallenrod",
          text: "Jako sokol wydarty z gniazda i w klatce zywiony, / Choc srogimi mekami lowcy odbiora mu rozum / I puszczaja, zeby braci sokolow wojowal; / Skoro wzniesie sie w chmury (...) / Pojdz, mysliwcze, do domu, z klatka nie czekaj sokola.",
        },
        options: [
          "Symbolizuje potege Zakonu Krzyzackiego",
          "Jest alegoria losu Waltera Alfa -- Litwina porwanego przez Krzyzakow, ktory wraca na strone ojczyzny, gdy odzyska wolnosc",
          "Opisuje techniki sokolnictwa w sredniowieczu",
          "Symbolizuje Aldone, ktora chce uciec z wiezy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sokol to alegoria Waltera Alfa: porwany z ojczystego gniazda (Litwa), wyhodowany w niewoli (Zakon), puszczony na polowanie (walka z Litwinami) -- ale gdy poczuje wolnosc, wraca do swoich. 'Pojdz, mysliwcze, do domu, z klatka nie czekaj sokola'.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: 'Ktore cechy powiesc poetyckiej realizuje "Konrad Wallenrod"?',
      content: {
        options: [
          "Synkretyzm rodzajowy -- laczenie epiki, liryki i dramatu",
          "Inwersja czasowa -- zdarzenia nie sa przedstawiane chronologicznie",
          "Bohater to indywidualista rozdmierany miedzy wartosciami",
          "Narracja prowadzona przez wszystkowiedzacego narratora bez emocji",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Konrad Wallenrod" realizuje cechy powieci poetyckiej: synkretyzm (narracja + piesni liryczne + dialogi dramatyczne), inwersje czasowa (fabuła nie jest chronologiczna -- zaczynamy od obioru mistrza, przeszlosc poznajemy z piiesni), bohater-indywidualista (Konrad rozdierany miedzy honorem a ojczyzna). Narracja NIE jest obiektywna -- narrator jest zaangazowany.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Ktore elementy utworu stanowia nawiazania do sytuacji Polski pod zaborami?",
      content: {
        options: [
          "Litwa pod naporem Zakonu = Polska pod naporem Rosji",
          "Wallenrodyzm jako strategia walki spiskowcow (dekabrystow)",
          "Piesn gminna jako straznik tozsamosci = literatura polska w niewoli",
          "Zamek w Malborku = siedziba krola Polski w Krakowie",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Litwa vs Zakon = Polska vs Rosja (maska historyczna). Wallenrodyzm nawiazuje do strategii spiskowcow/dekabrystow (Konrad Rylejew!). Piesn gminna jako straznik pamieci = rola literatury polskiej pod zaborami. Malbork nie symbolizuje Krakowa.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Ktore stwierdzenia o Aldonie sa prawdziwe?",
      content: {
        options: [
          "Jest corka litewskiego ksiecia Kiejstuta",
          "Walter nauczyl ja kochac i opowiedzial jej o Bogu chrzescijan",
          "Zamknela sie w wiezy z wlasnej woli, by byc blisko meza",
          "Na koncu utworu ucieka z wiezy i wraca na Litwe",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Aldona to corka Kiejstuta, ktora zakochala sie w Walterze -- ten nauczyl ja milosci i opowiedzial o chrzescijanstwie. Zamknela sie w wiezy przy zamku w Malborku, by byc blisko meza. NIE ucieka -- umiera w wiezy po smierci Konrada.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          "Plan zemsty Waltera Alfa -- od porwania po smierc. Jak krok po kroku realizowal strategie wallenrodyzmu?",
        requirements: [
          "Wymien kluczowe etapy: porwanie, wychowanie u Krzyzakow, ucieczka na Litwe, malzenstwo, powrot pod falszywym imieniem, obior na mistrza, sabotaz, smierc",
          "Wyjasnij, jaka role w planie odgrywal Halban",
          "Wskazz, co Konrad poswiecil dla realizacji planu",
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Notatka powinna obejmowac: 1) Porwanie Waltera jako dziecka, wychowanie u Krzyzakow, ale z tajnym wplywem wajdeloty Halbana, ktory rozbudzal milosc do Litwy. 2) Ucieczka na Litwe, malzenstwo z Aldona, decyzja o zemcie. 3) Powrot do Zakonu pod imieniem Wallenroda, zdobycie slawy, obior na mistrza. 4) Celowy sabotaz -- zwlekanie z wojna, przegrywanie bitew, wyniszczenie armii Zakonu na litewskich stepach. 5) Zdemaskowanie przez tajny trybunal i smierc. Halban byl 'sumieniem' planu, rozbudwal i podtrzymywal zemste. Konrad poswiecil: milosc (Aldona), honor (zdrada), zycie (samobojstwo).",
      metadata: {
        explanation:
          "Plan Konrada rozciaga sie na kilkadziesiat lat -- od dziecinstwa do smierci. Kluczowa jest rola Halbana jako 'architekta' zemsty i straznika pamieci, ktory przezyje Konrada, by opowiedziec jego historie.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Dlaczego Halban odmawia wypicia trucizny razem z Konradem?",
      content: {
        options: [
          "Jest tchorzem i boi sie smierci",
          "Chce przezyc, aby zachowac slawe czynu Konrada i przekazac ja potomnym -- piesn msciciela wstanie z tej piesni",
          "Nie wierzy, ze Konrad naprawde zamierza umrzec",
          "Chce uciec do Litwy i prowadzic wojne samodzielnie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Halban odmawia smierci, bo ma misje: 'Chce jeszcze zostac, zamknac twe powieki / I zyc -- azebym slawe twego czynu / Zachowal swiatu, rozglosil na wieki'. Jako wajdelota bedzie spiewal o czynie Konrada -- i 'kiedys w przyszlosci / Z tej piesni wstanie msciciel naszych kosci'. Piesn jest wieczna, bohater smiertelny.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Jak mozna zinterpretowac geneze utworu w kontekscie zycia Mickiewicza?",
      content: {
        options: [
          "Mickiewicz opisuje wlasne doswiadczenia wojenne z okresu powstania listopadowego",
          "Mickiewicz, na zeslaniu w Rosji, pracujacy dla wroga (caratu), piszzze o dylemacie czlowieka, ktory musi sluzyc nieprzyjacielowi, by go zniszczyc -- odzwierciedla to sytuacje polskich spiskowcow i dekabrystow",
          "Utwor jest czystą fikcja historyczna bez zwiazku z biografia autora",
          "Mickiewicz pisal utwor jako hommage dla cara Mikolaja I",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Mickiewicz pisal "Konrada Wallenroda" w Rosji (1825-1827), bedac zmuszony do pracy jako urzednik carski. Poznal dekabrystow (Konrad Rylejew!) i zrozumial, ze konfrontacja z Rosja jest beznadiejna -- potrzeba podstepu. Wallenrodyzm to literacki wyraz tego dylematu: jak walczyc, gdy sluzy sie wrogowi.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Dlaczego Aldona odmawia wyjscia z wiezy, gdy Konrad ja o to blaga?",
      content: {
        options: [
          "Bo nie kocha go juz",
          "Bo zlozylla przysiegia na progu wiezy, boi sie, ze zniszczonaa przez lata pustelnictwa nie bedzie juz piekna Aldona z jego wspomnien, i woli zachowac idealny obraz w pamieci obojga",
          "Bo Krzyzacy strzega wejscia i nie mozna wiezy otworzyc",
          "Bo Halban zabronil jej wychodzic",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Aldona odmawia z dwoch powodow: 1) Zlozyla sakralna przysieige, ze nie wyjdzie z wiezy az do smierci. 2) Boi sie, ze zyly upior, ktory z niej pozostal, zniszczy piekny obraz zachowany w pamieci Konrada: 'Tak motyl piekny, gdy w bursztyn utonie / Na wieki cala zachowuje postac... Alfie, nam lepiej takiemi pozostac'. To tragiczne i piekne zarazem -- woli byc wspomnieniem niz rzeczywistoscia.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Ktore z ponizszych interpretacji ballady "Alpuhara" sa uzasadnione?',
      content: {
        options: [
          "Almanzor jest analogia Konrada -- obaj niszcza wroga od srodka, poswiecajac wlasne zycie",
          "Pocalunek Almanzora (zarazenie dzuma) odpowiada zdradzieckim dzialalaniom Konrada jako mistrza Zakonu",
          "Ballada sluzy wylacznie rozrywce gości i nie ma glebszego znaczenia",
          "Konrad, spiewajac ballade, nieswiadomie zdradza swoj plan -- z czego Krzyzacy nie zdaja sobie sprawy",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "\"Alpuhara\" to parabola planu Konrada: Almanzor = Konrad, Hiszpanie = Krzyzacy, pocalunek/zaraza = sabotaz od srodka. Konrad w pijanym szale sam zdradza sens ballady ('Wy chcecie wiedziec o zemstie Litwina?'), ale Krzyzacy tego nie rozumieja. Ballada NIE jest pustą rozrywka -- jest kluczem do fabuły.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Ktore porownannia miedzy Konradem Wallenrodem a innymi bohaterami romantycznymi sa uzasadnione?",
      content: {
        options: [
          "Konrad Wallenrod i Konrad z III cz. Dziadow -- obaj poswiecaja sie dla ojczyzny, ale Wallenrod wybiera zdrade, Konrad z Dziadow -- bunt prometejski",
          "Konrad Wallenrod i Jacek Soplica -- obaj ukrywaja tozsamosc i dzialaja w tajemnicy dla dobra narodu",
          "Konrad Wallenrod i Werter Goethego -- obaj koncza samobojstwem z powodu nieszczesliwej milosci",
          "Konrad Wallenrod i Kordian Slowackiego -- obaj staja przed dylematem dzialania za pomoca zdrady",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Wallenrod-Konrad (Dziady): obaj poswiecaja sie, ale roznymi metodami (zdrada vs bunt). Wallenrod-Soplica: obaj ukrywaja tozsamosc i dzialaja w tajemnicy. Wallenrod-Kordian: obaj stoja przed dylematem dzialania (Kordian nie potrafi zabic cara -- paralizz moralny). Werter ginie z milosci, nie z patriotyzmu -- analogia powierzchowna.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Wyjasnij role piesni gminnej w "Konradzie Wallenrodzie" na podstawie Piesni Wajdeloty. Dlaczego Mickiewicz poswiecil jej tak wiele miejsca?',
      content: {},
      correctAnswer:
        "Piesn gminna pelni role 'arki przymierza miedzy dawnymi i mlodszymi laty' -- jest skarbcem pamieci narodowej. Gdy plomien zniszczy kroniki, a miecz spustoszy skarby, piesn 'ujdzie calo'. Dla narodu bez panstwa (Litwa/Polska) piesn ustna jest jedynym nosnikiem tozsamosci. Mickiewicz poswiecil jej tyle miejsca, bo pisal w sytuacji, gdy polska kultura i literatura byly zagrozone rusyfikacja -- literatura = ostatni bastion narodowej pamieci. Piesn = bron: 'Ty czasem dzierzysz i bron archaniol'.",
      metadata: {
        explanation:
          "Piesn Wajdeloty to manifest romantycznej idei roli poety i literatury w zyciu narodu. Przylozenie do sytuacji Polski pod zaborami jest bezposrednie: skoro nie ma panstwa, literatura staje sie straznikiem tozzsamosci.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Porownaj postaci Konrada Wallenroda i Almanzora z ballady "Alpuhara". Wskazz analogie i roznice.',
      content: {
        instruction:
          "Odwolaj sie do metody walki, motywacji i konsekwencji czynu obu bohaterow.",
      },
      correctAnswer:
        "Analogie: obaj niszcza wroga od srodka (infiltracja), obaj poswiecaja wlasne zycie, obaj uzywaja podstepu (zdrada). Almanzor zaraza dzumma przez pocalunek, Konrad niszczy armie Zakonu przez celowy sabotaz. Roznice: Almanzor dziala impulwnie (wraca tuz po upadku twierdzy), Konrad realizuje plan przez dziesieciolecia. Almanzor umiera z smiechem na ustach (triumf), Konrad umiera w rozpaczy (utracil milosc, honor, szczescie). Almanzor nie ma dylematu moralnego, Konrad jest targany wyrzutami sumienia przez cale zycie.",
      metadata: {
        explanation:
          'Ballada "Alpuhara" to parabola -- klucz do zrozumienia wallenrodyzmu. Na maturze wazne jest dostrzezenie zarowno podobienst, jak i roznic: Almanzor jest prosty i jednowymiaarowy, Konrad -- tragiczny i wielowymiarowy.',
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic: "Czy cel uswieca srodki? Wallenrodyzm jako problem etyczny",
        requirements: [
          "Wyjasnij, na czym polega dylemat moralny Konrada",
          "Przedstaw argumenty za i przeciw wallenrodyzmowi",
          "Odwolaj sie do motta z Machiavellego",
          "Wskazz, jaka cene placi Konrad za realizacje planu",
          "150-200 slow",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna: zdefiniowac dylemat -- Konrad musi wybrac miedzy honorem rycerskim (walka twarzą w twarz, etyczne) a patriotyzmem (jedyny skuteczny sposob to zdrada, nieetyczne). Motto z Machiavellego ('trzeba byc lisem i lwem') mowi, ze w polityce nie wolno ogranniczac sie do etyki rycerskiej. Argumenty za: Zakon jest zbyt potezny na otwarta walke, zdrada to jedyna droga do ocalenia narodu. Argumenty przeciw: zdrada niszczy moralne samego bohatera -- Konrad traci milosc, honor, zycie, staje sie alkoholikiem, ginie samobojstwem. Cena: utrata Aldony, wyrzuty sumienia, samotnosc, smierc. Mickiewicz nie daje jednoznacznej odpowiedzi -- utwor jest tragedia, nie manifestem.",
      metadata: {
        explanation:
          "Problem 'cel uswieca srodki' to centralne zagadnienie etyczne utworu i jedno z najczestszych pytan maturalnych dotyczacych \"Konrada Wallenroda\".",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Tragiczna milosc w literaturze. Omow problem, odwolujac sie do "Konrada Wallenroda" Adama Mickiewicza i jednego innego tekstu kultury.',
      content: {
        requirements: [
          "Wyjasnij, dlaczego milosc Waltera i Aldony jest tragiczna",
          "Przeanalizuj scene rozstania i scene pozegnalaa (cz. VI)",
          "Porownaj z inna tragiczna miloscia (np. Romeo i Julia, Tristan i Izolda, Judym i Joanna)",
          "Odpowiedz na pytanie: czy milosc musi przegrac z obowiazkiem?",
          "Minimum 300 slow",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: pokazac tragizm milosci Alfa i Aldony (milosc poswiecona dla wyzszego celu -- obrony ojczyzny), przeanalizowac scene pozegnania (Aldona odmawia wyjscia z wiezy, woli byc wspomnieniem niz ruina), porownac z inna para (np. Romeo i Julia -- milosc konczy smiercia z powodu konfliktu rodow; Judym i Joasia -- milosc poswiecona dla pracy spolecznej). Wniosek: u Mickiewicza milosc NIE jest slaboscia -- jest najwyzsza ofiara, jaka bohater moze zlozyc na oltarzu ojczyzny.",
      metadata: {
        explanation:
          "Motyw tragicznej milosci to jedno z najczestszych pytan maturalnych o 'Konrada Wallenroda'. Kluczowe: milosc Alfa i Aldony nie jest sentymentalna -- jest heroiczna.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Jak mozna zinterpretowac relacje Konrad--Halban w kontekscie romantycznej koncepcji roli poety?",
      content: {
        options: [
          "Halban jest sluaczem Konrada -- wykonuje jego polecenia bez wlasnej woli",
          "Halban jest 'sumieniem narodu' i architektem zemsty -- to on ksztaltuje Konrada od dziecinstwa, podtrzymuje plan, a po smierci bohatera zachowa jego czyn w piesni. Relacja ilustruje romantyczna idee: poeta (wajdelota) jest duchowym przywodca narodu, wazniejszym od rycerza",
          "Halban i Konrad sa rywalaami o milosc Aldony",
          "Relacja jest czysto fabularana -- nie ma glebszego sensu symbolicznego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Halban to wcielenie romantycznej idei poety-wieszcza: ksztaltuje bohaterow (wychowal Konrada), podtrzymuje paamiec narodu (piesn gminna), przezywa rycerza (odmawia trucizny). Poet jest wazniejszy od wojownika: 'Bard dla rycerzy w bitwach, a niewiasta / Bedzie ja w domu spiewac dla swych dzieci'. Konrad ginie -- pieśń Halbana zyje wiecznie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Dlaczego Mickiewicz przedstawia wallenrodyzm jako strategie tragiczna, a nie heroiczna?",
      content: {
        options: [
          "Poniewaz Mickiewicz byl przeciwny walce zbrojnej w kazdej formie",
          "Poniewaz utwor pokazuje moralne koszty wallenrodyzmu -- bohater traci milosc, honor, tozsamosc, popada w alkoholizm i konczy samobojstwem. Mickiewicz nie gloryfikuje zdrady, lecz ukazuje ja jako desperacki srodek, za ktory placi sie wszystkim",
          "Poniewaz Konrad ponosi kleeske i nie niszczy Zakonu",
          "Poniewaz cenzura carska zmusila Mickiewicza do potepienia bohatera",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mickiewicz NIE gloryfikuje wallenrodyzmu -- ukazuje jego tragiczne konsekwencje: Konrad traci Aldone (pustelnica), honor (zdrajca), tozsamosc (zyje pod falszywym imieniem), popada w alkoholizm, a w koncu popelnia samobojstwo. Wallenrodyzm to nie program ideowy -- to desperacja. Utwor jest tragedia, nie manifestem. Pózniej Mickiewicz odrzucil wallenrodyzm na rzecz mesjanizmu (Dziady cz. III).",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Ktore z ponizszych aspektow utworu swiadcza o jego romantycznym charakterze?",
      content: {
        options: [
          "Bohater-indywidualista rozdierany miedzy wartosciami, samotny w swoim czynie",
          "Historyzm maski -- ukrywanie wspolczesnych tresci pod szata sredniowieczna",
          "Kult piesni gminnej jako straznika pamieci narodowej (romantyczna rola poety)",
          "Obiektywna, racjonalna analiza konfliktu politycznego miedzy Litwa a Zakonem",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Cechy romantyczne: bohater-indywidualista (Konrad sam przeciw calemu Zakonowi), historyzm maski (sredniowiecze = XIX w.), kult piesni gminnej i rola poety (Piesn Wajdeloty = manifest romantyzmu). Obiektywna racjonalana analiza bylaaby cechą pozytywizmu, nie romantyzmu -- utwor jest peloen emocji, tragizmu i subiektywizmu.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Porownaj wallenrodyzm z prometeizmem Konrada z III czesci "Dziadow". Ktora postawa jest bardziej etyczna?',
      content: {
        instruction:
          "Uwzglednij metody walki, motywacje, moralne koszty i skutecznosc obu bohaterow.",
      },
      correctAnswer:
        "Wallenrodyzm: niszczenie wroga od srodka za pomoca zdrady, podstepu, klamstwa. Metoda: infiltracja i sabotaz. Koszt: utrata honoru, milosci, tozsamosci, smierc. Skutecznosc: Zakon zniszczony, ale bohater zniszczony razem z nim. Prometeizm (Konrad z Dziadow III): otwarty bunt przeciw Bogu i tyranowi, cierpienie za miliony. Metoda: Wielka Improwizacja -- slowo jako bron. Koszt: szalenstwo, pycha (grzech). Skutecznosc: bezposrednia -- zerowa (Konrad nie wyzwala narodu), posrednia -- mobilizacja duchowa. Etycznie: prometeizm jest bardziej 'czysty' (otwarty bunt), ale mniej skuteczny. Wallenrodyzm jest skuteczniejszy, ale moralnie niszczacy. Mickiewicz ewoluowal od wallenrodyzmu (1828) do prometeizmu/mesjanizmu (1832).",
      metadata: {
        explanation:
          "Porownanie wallenrodyzmu z prometeizmem to jedno z kluczowych zagadnien romantyzmu na maturze rozszerzonej. Wazne: Mickiewicz sam odrzucil wallenrodyzm na rzecz prometeizmu w Dziadach.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Wyjasnij, jak Mickiewicz buduje napiecie fabularne za pomoca inwersji czasowej i fragmentaryzmu narracji. Podaj przyklady.",
      content: {},
      correctAnswer:
        "Inwersja czasowa: utwor NIE opowiada historii chronologicznie. Zaczyna sie od obioru Konrada na mistrza (terazniejszosc), przeszlosc Waltera Alfa poznajemy dopiero z Powiesci Wajdeloty (cz. IV) -- opowiadanej na uczcie jako piesn. Czytelnik sklada fabuule jak puzzle. Fragmentaryzm: kluczowe wydarzenia sa pominiete lub tylko zasugerowane (np. moment zmiany tozsamosci z Alfa na Wallenroda, lata sluzby w Zakonie). Efekt: tajemniczosc bohatera -- czytelnik dlugo nie wie, kim naprawde jest Konrad. Napiecie rosnie, bo fragmenty ukladaja sie w calosc stopniowo. To cecha powieci poetyckiej zapozyczona od Byrona.",
      metadata: {
        explanation:
          "Pytanie o kompozycje to typowe pytanie LANGUAGE_USE na maturze rozszerzonej. Kluczowe terminy: inwersja czasowa, fragmentaryzm, synkretyzm rodzajowy, powiesc poetycka.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          'Rola poety i piesni w "Konradzie Wallenrodzie" -- od Piesni Wajdeloty do odmowy smierci Halbana',
        requirements: [
          "Przeanalizuj Piesn Wajdeloty jako manifest roli pieśni w zyciu narodu",
          "Wyjasnij, dlaczego Halban odmawia smierci -- co to mowi o hierarchii: poeta > rycerz",
          "Odwolaj sie do romantycznej koncepcji poety-wieszcza",
          'Porownaj z inna realizacja motywu roli poety (np. Wielka Improwizacja, "Do mlodych" Asnyka)',
          "200-250 slow",
        ],
        wordLimit: { min: 200, max: 250 },
      },
      correctAnswer:
        "Notatka powinna: zanalizowac Piesn Wajdeloty jako manifest: piesn gminna to 'arka przymierza', straznik pamieci, bron archanioła -- przetrwa, gdy plomien zniszczy kroniki. Odmowa Halbana = dowod, ze poeta jest wazniejszy od rycerza: Konrad ginie, ale Halban zachowa jego czyn w piesni, z ktorej 'wstanie msciciel'. Hierarchia: poeta > bohater, bo bohater umiera, a pieśn jest wieczna. Romantyczna koncepcja: poeta-wieszcz = duchowy przywodca narodu (jak pozniej Konrad w Dziadach III). Porownanie: w Wielkiej Improwizacji Konrad tez twierdzi, ze 'czuje i jestem' -- ale jego narzedziem jest slowo, nie miecz. U Asnyka poeta juz nie jest wieszczem -- 'Do mlodych' to pozegnanie z romantyzmem. Wniosek: Mickiewicz w Konradzie Wallenrodzie buduje fundament romantycznej hierarchii: slowo jest silniejsze od miecza.",
      metadata: {
        explanation:
          'Rola poety w narodzie to kluczowy temat romantyzmu i czeste pytanie maturalne. "Konrad Wallenrod" jest jednym z pierwszych tekstow, w ktorych Mickiewicz formulluje te ide -- pózniej rozwinięta w Dziadach.',
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Zdrada jako forma patriotyzmu? Rozważ problem, odwolujac sie do "Konrada Wallenroda" Adama Mickiewicza i jednego innego tekstu kultury.',
      content: {
        requirements: [
          "Zdefiniuj wallenrodyzm jako forme dzialania i problem etyczny",
          "Przeanalizuj moralne koszty zdrady Konrada (utrata milosci, honoru, tozsamosci, zycia)",
          "Porownaj z innym bohaterem, ktory poswiecil etykę dla wyzszego celu (np. Jacek Soplica, Judym, Almanzor, agent wywiadu z filmu/literatury)",
          "Sformuluj wlasne stanowisko: czy zdrada moze byc moralnaa, jesli sluzy ojczyznie?",
          "Minimum 300 slow",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: zdefiniowac wallenrodyzm (zdrada w imie wyzszego celu), przeanalizowac moralne koszty (Konrad placi wszystkim -- miloscia, honorem, zyciem, a Mickiewicz pokazuje te cene bez gloryfikacji). Porownanie: Jacek Soplica (tez ukrywa tozsamosc i dziala w tajemnicy, ale Mickiewicz daje mu odkupienie -- Ksiadz Robak); agent wywiadu (wspolczesna realizacja wallenrodyzmu -- np. film 'Zycie za zycie' o Pileckim). Stanowisko: otwarte -- mozna argumentowac za (desperacja usprawiedliwia) i przeciw (zdrada niszczy moraalnie samego zdrajce -- Konrad ginie jako nieszczescliwy alkoholik, nie jako triumfator).",
      metadata: {
        explanation:
          "Problem 'zdrada jako patriotyzm' to jedno z najtrudniejszych i najciekawszych zagadnien maturalnych. Kluczowe: Mickiewicz sam ewoluowal w tej kwestii -- odrzucil wallenrodyzm na rzecz mesjanizmu.",
      },
    },

    // ===== DODATKOWE DIFFICULTY 2-3 — CLOSED (dopelnienie do 50) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Kto wychowywal Waltera Alfa wśrod Krzyzakow?",
      content: {
        options: [
          "Halban",
          "Mistrz krzyzacki Winrych",
          "Arcykomtur Maryjenburga",
          "Aldona",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Waltera Alfa wychowywal mistrz krzyzacki Winrych -- sam trzymal go do chrztu, kochal i piescil jak syna. Jednoczesnie po kryjomu odwiedzal go stary wajdelota (pozniejszy Halban), ktory rozbudzal w nim milosc do Litwy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Kim jest Kiejstut w utworze?",
      content: {
        options: [
          "Wielkim mistrzem Zakonu Krzyzackiego",
          "Litewskim ksieciem, ojcem Aldony, ktory przyjal Waltera i dal mu corke za zone",
          "Wajdelota spiewajacym przy ognisku",
          "Zdrajca Litwy, ktory sprzedal Waltera Krzyzakom",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kiejstut to historyczna postac -- litewski ksiaze, ktory w utworze przyjmuje Waltera Alfa (zbieglego od Krzyzakow), docenia jego walecznosc i daje mu za zone corke Aldone, mowiac: 'Pojdz, Walterze, badz zieciem moim i bij sie za Litwe!'.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Co symbolizuje lampa, ktora Konrad ciska z okna przed smiercia?",
      content: {
        options: [
          "Bunt przeciwko Bogu",
          "Umowiony sygnal dla Aldony -- jesli lampa zgasnie, Konrad juz nie wróci",
          "Probe podpalenia zamku krzyzackiego",
          "Rzucanie wyzwania sedziom tajnego trybunalu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konrad umowil sie z Aldona: 'Jesli lampa przed wieczorem skona -- zamknij twe okno, moze juz nie wróce'. Ciskajac gasnaaca lampe z okna, daje Aldonie ostatni sygnal -- ze umiera. Aldona odpowiada przerazliwym krzykiem i tez umiera. Lampa to symbol ich lacznosci -- gasnacy razem z zyiciem obojga.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Jaka role pelni tajny trybunal, ktory skazuje Konrada?",
      content: {
        options: [
          "Jest sądem koscielnym (inkwizycja)",
          "Jest tajna rada 12 zamaskowanych sedziow w podziemiach Malborka, ktorzy karza zbrodnie wladcow Zakonu -- to oni odkrywaja zdrade Konrada",
          "Jest rada wojenna obradujaca nad strategia bitwy",
          "Jest fikcyjnym sądem wymyslonym przez Halbana, by nastraszyc Konrada",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tajny trybunal to 12 zamaskowanych sedziow w podziemnym lochu Malborka, ktorzy przysiegli karac zbrodnie wladcow Zakonu. Odkrywaja, ze Konrad nie jest prawdziwym Wallenrodem, mowi po litewsku z pustelnica i zdradza Zakon. Wydaja wyrok: 'biada!' -- trzykrotnie powtorzony przez mury.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Ktore z ponizszych ofiar sklada Konrad na oltarzu zemsty za ojczyzne?",
      content: {
        options: [
          "Milosc -- rozstaje sie z Aldona i widuje ja tylko przez krate wiezy",
          "Honor rycerski -- zamiast walczyc twarzą w twarz, stosuje zdrade i podstep",
          "Tozsamosc -- zyje pod falszywym imieniem, udajac Niemca",
          "Wlasne zycie -- konczy samobojstwem, pijac trucizne",
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          "Konrad poswiecil WSZYSTKO: milosc (Aldona w wiezy), honor (zdrajca i spiskowiec zamiast rycerza), tozsamosc (Walter Alf stal sie Konradem Wallenrodem), zycie (samobojstwo truczizna). To wlasnie sprawia, ze jest bohaterem tragicznym, a nie heroicznym -- cena jest calkowita.",
      },
    },

    // ======================= KONIEC PYTAN KONRAD WALLENROD ===================//
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
