// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Kto jest autorką powieści „Nad Niemnem”?",
      content: {
        options: [
          "Maria Konopnicka",
          "Eliza Orzeszkowa",
          "Bolesław Prus",
          "Henryk Sienkiewicz",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Nad Niemnem” to powieść Elizy Orzeszkowej, opublikowana w 1888 roku. Jest uważana za jedno z najważniejszych dzieł polskiego pozytywizmu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Nad jaką rzeką rozgrywa się akcja powieści „Nad Niemnem”?",
      content: {
        options: ["Nad Wisłą", "Nad Bugiem", "Nad Niemnem", "Nad Dnieprem"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Akcja powieści rozgrywa się nad rzeką Niemen, na terenach dawnej Litwy (dzisiejsza Białoruś, okolice Grodna). Niemen jest nie tylko tłem, ale i ważnym symbolem w utworze.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Kim jest Justyna Orzelska w powieści „Nad Niemnem”?",
      content: {
        options: [
          "Żoną Benedykta Korczyńskiego",
          "Ubogą krewną Korczyńskich, mieszkającą w Korczynie",
          "Córką Andrzeja Korczyńskiego",
          "Służącą w dworze korczyńskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Justyna Orzelska jest cioteczną siostrzenicą Benedykta Korczyńskiego. Po śmierci matki i utracie majątku przez ojca zamieszkała w Korczynie jako uboga krewna.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Kto jest właścicielem dworu w Korczynie?",
      content: {
        options: [
          "Andrzej Korczyński",
          "Teofil Różyc",
          "Benedykt Korczyński",
          "Ignacy Orzelski",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Korczyn jest odziedziczonym po ojcu majątkiem Benedykta Korczyńskiego, najmłodszego z trzech braci. Benedykt ciężko pracuje, by utrzymać majątek w dobie popowstaniowych trudności.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Kto opowiada legendę o Janie i Cecylii?",
      content: {
        options: [
          "Benedykt Korczyński",
          "Stary Jakub Bohatyrowicz",
          "Anzelm Bohatyrowicz",
          "Jan Bohatyrowicz",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Legendę o Janie i Cecylii, protoplastach rodu Bohatyrowiczów, opowiada Anzelm Bohatyrowicz — stryj Jana, przy grobowcu przodków w parowie nadniemeńskim.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Jaką funkcję pełni Marta Korczyńska w dworze korczyńskim?",
      content: {
        options: [
          "Jest żoną Benedykta",
          "Jest nauczycielką dzieci",
          "Prowadzi dom i gospodarstwo domowe",
          "Jest guwernantką Leoni",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Marta Korczyńska, kuzynka Benedykta, prowadzi cały dom — nadzoruje kuchnię, przygotowuje posiłki, dba o porządek i zapasy. Jest niezastąpiona w codziennym funkcjonowaniu Korczyna.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Które z poniższych postaci mieszkają w dworze korczyńskim?",
      content: {
        options: [
          "Benedykt Korczyński",
          "Marta Korczyńska",
          "Teofil Różyc",
          "Ignacy Orzelski",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W Korczynie mieszkają: Benedykt (właściciel), jego żona Emilia, Marta (kuzynka prowadząca dom), Justyna i jej ojciec Ignacy Orzelski (ubodzy krewni) oraz Teresa Plińska (towarzyszka Emilii). Różyc jest sąsiadem z Wołowszczyzny.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Które cechy charakteryzują Martę Korczyńską?",
      content: {
        options: [
          "Pracowitość i zaradność",
          "Szorstki, basowy głos i częsty kaszel",
          "Delikatność i słabe zdrowie",
          "Noszenie kwiecistych pantofli",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Marta jest pracowita, zaradna, ma gruby, ochrypły głos i dręczy ją kaszel. Nosi charakterystyczne kwieciste pantofle. To Emilia Korczyńska, nie Marta, cechuje się delikatnością i słabym zdrowiem.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Które stwierdzenia o Emilii Korczyńskiej są prawdziwe?",
      content: {
        options: [
          "Cierpi na liczne dolegliwości nerwowe",
          "Spędza większość czasu w swoich dwóch ulubionych pokojach",
          "Aktywnie prowadzi gospodarstwo domowe",
          "Teresa Plińska jest jej towarzyszką i lektorką",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Emilia jest hipochondryczką cierpiącą na globus histericus, migreny i inne dolegliwości. Żyje zamknięta w swoich pokojach, czytając książki i robiąc robótki ręczne. Teresa jest jej wierną towarzyszką. Gospodarstwem zajmuje się Marta, nie Emilia.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jak nazywa się zaścianek szlachecki sąsiadujący z Korczynem, zamieszkały przez drobną szlachtę?",
      content: {},
      correctAnswer: "Bohatyrowicze",
      metadata: {
        explanation:
          "Bohatyrowicze to okolica (zaścianek) szlachecki nad Niemnem, sąsiadujący z dworem korczyńskim. Mieszka tam kilkadziesiąt rodzin drobnej szlachty, w tym rodzina Jana i Anzelma Bohatyrowiczów.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Kim jest Teofil Różyc?",
      content: {
        options: [
          "Ubogim szlachcicem z okolicy",
          "Zamożnym arystokratą, kuzynem Kirłowej, nowym sąsiadem Korczyńskich",
          "Bratem Benedykta Korczyńskiego",
          "Ekonomem w majątku korczyńskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Teofil Różyc to zamożny arystokrata, krewny żony Kirły, który niedawno osiadł w pobliskiej Wołowszczyźnie. Jest człowiekiem światowym, zrujnowanym przez rozrzutne życie i uzależnionym od morfiny.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Co stało się z Andrzejem Korczyńskim, najstarszym bratem Benedykta?",
      content: {
        options: [
          "Wyjechał za granicę i nie wrócił",
          "Zginął w powstaniu styczniowym wraz z Jerzym Bohatyrowiczem",
          "Zmarł na chorobę w Korczynie",
          "Został zesłany na Syberię",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Andrzej Korczyński zginął w powstaniu styczniowym 1863 roku razem ze swoim przyjacielem Jerzym Bohatyrowiczem (ojcem Jana). Miejsce ich śmierci — las za Niemnem — nazwano potem Mogiłą.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Czym zajmuje się Jan Bohatyrowicz?",
      content: {
        options: [
          "Jest urzędnikiem w miasteczku",
          "Pracuje jako ekonom u Korczyńskich",
          "Jest rolnikiem — sam orze, zbiera plony i prowadzi gospodarstwo",
          "Handluje drewnem na Niemnie",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Jan Bohatyrowicz jest rolnikiem, który sam uprawia ziemię — orze, zbiera plony, prowadzi pasiekę i sad. Mówi, że wyoranie morga ziemi to dla niego „tak jak prawie na spacer pójść”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Na jakim instrumencie gra Ignacy Orzelski?",
      content: {
        options: ["Na fortepianie", "Na skrzypcach", "Na gitarze", "Na flecie"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ignacy Orzelski jest utalentowanym skrzypkiem, który graniu poświęca prawie cały swój czas. Podczas gry przemienia się — z dobrodusznego starca staje się natchnionym artystą. Justyna akompaniuje mu na fortepianie.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Jaki był wcześniejszy związek uczuciowy Justyny Orzelskiej?",
      content: {
        options: [
          "Była zakochana w Różycu, który ją porzucił",
          "Była zakochana w Janie Bohatyrowiczu od dzieciństwa",
          "Kochała Zygmunta Korczyńskiego, ale rodzina nie dopuściła do małżeństwa",
          "Nigdy wcześniej nikogo nie kochała",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Justyna od młodości kochała swojego kuzyna Zygmunta Korczyńskiego. Ich związek trwał lata, ale rodzina (szczególnie matka Zygmunta, pani Andrzejowa, i ciotka Darzecka) nie dopuściła do małżeństwa, uważając Justynę za niegodną partię.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Które pary przedstawiają motyw miłości w powieści?",
      content: {
        options: [
          "Jan Bohatyrowicz i Justyna Orzelska",
          "Anzelm Bohatyrowicz i Marta Korczyńska",
          "Benedykt Korczyński i Teresa Plińska",
          "Witold Korczyński i Marynia Kirlanka",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Orzeszkowa przedstawia kilka modeli miłości: dojrzałą miłość Jana i Justyny, niespełnioną — Anzelma i Marty, młodzieńczą przyjaźń/miłość — Witolda i Maryni. Benedykt i Teresa nie łączy żaden wątek uczuciowy.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Z jakimi problemami zmaga się Benedykt Korczyński?",
      content: {
        options: [
          "Długi bankowe i hipoteczne obciążające Korczyn",
          "Ciągłe procesy sądowe z sąsiadami o ziemię",
          "Brak porozumienia z żoną Emilią",
          "Alkoholizm i hazard",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Benedykt boryka się z długami (bankowe raty, posag siostry, posag żony), procesami o ziemię z Bohatyrowiczami i innymi sąsiadami oraz nieszczęśliwym małżeństwem z Emilią, która nie rozumie jego trosk i zarzuca mu prozaiczność.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Które fakty dotyczące rodu Bohatyrowiczów są prawdziwe?",
      content: {
        options: [
          "Nazwa rodu pochodzi od bohaterskiej pracy ich przodków",
          "Szlachectwo nadał im król Zygmunt August",
          "Protoplastami rodu byli Jan i Cecylia",
          "Rod ten zawsze był bardzo bogaty",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Według legendy opowiedzianej przez Anzelma, Jan i Cecylia wykarczowali puszczę nad Niemnem. Król Zygmunt August nadał ich potomkom szlachectwo i nazwisko Bohatyrowiczów (od bohaterstwa w pracy). Rod nigdy nie był bogaty — żyli jako drobna szlachta.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jakie nazwisko nadał król Zygmunt August potomkom Jana i Cecylii i od czego je wywodził?",
      content: {},
      correctAnswer: "Bohatyrowicze — od bohaterstwa w pracy",
      metadata: {
        explanation:
          "Król Zygmunt August, ujrzawszy dokonania Jana i Cecylii, nobilitował ich ród i nadał mu nazwisko Bohatyrowiczów — wywiedzione od bohaterstwa (bohatyrstwa), jakim było wykarczowanie puszczy i stworzenie kwitnącej osady.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jak nazywa się miejsce w lesie za Niemnem, które po śmierci Andrzeja Korczyńskiego zmieniło swoją dotychczasową nazwę?",
      content: {},
      correctAnswer: "Mogiła (wcześniej zwane Świerkowym)",
      metadata: {
        explanation:
          "Uroczysko leśne za Niemnem, wcześniej zwane Świerkowym (od sosen i jodeł), po śmierci Andrzeja Korczyńskiego i Jerzego Bohatyrowicza zaczęto powszechnie nazywać Mogiłą. Nowa nazwa stała się jedynym „grobowcem” najstarszego z braci Korczyńskich.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Co co roku Orzeszkowa mówi o Justynie, przyrównując ją do postaci antycznej, kiedy ta prowadzi ojca przez salon?",
      content: {},
      correctAnswer: "Antygonę",
      metadata: {
        explanation:
          "Gdy Justyna z podniesioną głową prowadzi przez salon swojego siwowłosego, przygarbionego ojca (upokorzonego przez Kirłę), narrator porównuje ją do Antygony — symbolu godności i miłości do ojca.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Dlaczego Marta Korczyńska odrzuciła Anzelma Bohatyrowicza?",
      content: {
        options: [
          "Nie kochała go i wolała innego mężczyznę",
          "Rodzina zabroniła jej tego małżeństwa pod groźbą wydziedziczenia",
          "Bała się ludzkiego śmiechu i ciężkiej pracy fizycznej",
          "Anzelm był już wówczas ciężko chory i niezdolny do pracy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Marta wyznaje Justynie, że dwie przyczyny sprawiły, że odrzuciła Anzelma: strach przed wyśmianiem przez rodzinę i znajomych oraz lęk przed ciężką fizyczną pracą, jaką musiałaby wykonywać jako żona drobnego szlachcica. Przyznaje, że było to jej „wieczne głupstwo”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Co studiuje Witold Korczyński?",
      content: {
        options: [
          "Prawo na uniwersytecie",
          "Sztuki piękne w Monachium",
          "Agronomię (gospodarstwo rolne)",
          "Medycynę w Petersburgu",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Witold jest uczniem szkoły agronomicznej. Odziedziczył po ojcu zamiłowanie do ziemi i gospodarstwa wiejskiego. Reprezentuje ideały młodego pokolenia pozytywistów — chce modernizować rolnictwo i podnosić poziom życia ludu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Jaka jest główna przyczyna nieszczęścia Emilii Korczyńskiej?",
      content: {
        options: [
          "Bieda i niedostatek materialny w Korczynie",
          "Zdrada męża z inną kobietą",
          "Poczucie osamotnienia, brak wrażeń i niezrozumienie ze strony męża",
          "Tęsknota za zmarłymi bliskimi",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Emilia cierpi na pustkę egzystencjalną — brak wrażeń, piękna, poezji w życiu. Nie rozumie się z mężem, który poświęca się pracy gospodarskiej. Skarży się na „pustynię” życia w Korczynie. Benedykt zarzuca jej, że jej skargi to „przestarzała i złej wody romansowość”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Co robi Justyna Orzelska z listem i tomem wierszy Musseta, które przesłał jej Zygmunt Korczyński?",
      content: {
        options: [
          "Przeczytała list, wzruszyła się i napisała odpowiedź",
          "Schowała list i książkę jako pamiątkę dawnej miłości",
          "Przeczytała list, ale rozdarła go na drobne kawałki",
          "Oddała list Marcie, prosząc ją o radę",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Justyna przeczytała list Zygmunta i wzruszyła się wspomnieniami, ale ostatecznie rozdarła kartkę na drobne płatki i rozrzuciła za oknem. Symbolizuje to jej definitywne odcięcie się od przeszłości i dawnej miłości.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Które motywy literackie są obecne w powieści „Nad Niemnem”?",
      content: {
        options: [
          "Motyw pracy jako wartości nadającej sens życiu",
          "Motyw powstania styczniowego ukryty przed cenzurą",
          "Motyw natury jako tła i zwierciadła uczuć bohaterów",
          "Motyw pojedynku rycerskiego",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "W „Nad Niemnem” kluczowe są: motyw pracy (wzorcowa praca Jana, Marty, Benedykta), motyw powstania styczniowego (ukryty pod mową ezopową — nigdy nie nazwanego wprost), motyw natury (rozbudowane opisy przyrody nadniemeńskiej). Nie ma motywu pojedynku rycerskiego.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question: "Które stwierdzenia o legendzie Jana i Cecylii są prawdziwe?",
      content: {
        options: [
          "Pełni funkcję mitu założycielskiego rodu Bohatyrowiczów",
          "Gloryfikuje pracę jako źródło szlachectwa i godności",
          "Jest historią spisaną w kronikach i drukowaną w książkach",
          "Przekazywana była ustnie z pokolenia na pokolenie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Legenda o Janie i Cecylii jest mitem założycielskim Bohatyrowiczów. Gloryfikuje pracę — to bohaterstwo pracy (nie miecza) dało im szlachectwo. Jak zaznacza Anzelm, „nikt jej nie opisywał i w książkach nie drukował” — przekazywano ją ustnie.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Które postacie reprezentują pozytywne wartości według Orzeszkowej?",
      content: {
        options: [
          "Jan Bohatyrowicz — pracowity rolnik",
          "Marta Korczyńska — oddana pracy gospodyni",
          "Zygmunt Korczyński — utalentowany artysta",
          "Witold Korczyński — student z ideałami społecznymi",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Orzeszkowa wartościuje postacie według stosunku do pracy, narodu i ludzi. Jan, Marta i Witold realizują pozytywne ideały. Zygmunt jest postacią negatywną — rozpieszczony, nie pracuje, nie umie kochać, okazuje pogardę wobec otoczenia.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jakie znaczenie symboliczne ma legenda o Janie i Cecylii w strukturze powieści?",
      content: {},
      correctAnswer:
        "Jest mitem założycielskim rodu Bohatyrowiczów i wzorcem etycznym — gloryfikuje pracę, miłość i równość jako źródła szlachectwa",
      metadata: {
        explanation:
          "Legenda pełni kilka funkcji: jest mitem fundacyjnym rodu Bohatyrowiczów, wzorcem idealnej miłości opartej na wspólnej pracy, ideowym programem autorki (praca, nie urodzenie, jest źródłem godności) oraz zapowiedzią losów Justyny i Jana, którzy powielą model Jana i Cecylii.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jak lekarze nazywają chorobę Anzelma Bohatyrowicza i ile lat trwała?",
      content: {},
      correctAnswer:
        "Hipokondria (choroba bardziej duszna niż cielesna); trwała dziewięć lat",
      metadata: {
        explanation:
          "Lekarze nazwali chorobę Anzelma „hipokondrią” — chorobą „więcej duszną niżeli cielesną”. Przez dziewięć lat był bezwładny i pogrążony w bólach. Źródłem były traumatyczne przeżycia — śmierć brata w powstaniu i odrzucenie przez Martę.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Dlaczego Kirłowa odmawia propozycji Różyca, by jej mąż zarządzał Wołowszczyzną?",
      content: {},
      correctAnswer:
        "Bo wie, że mąż nie nadaje się do takiej pracy — nie lubi pracować i nie podołałby zarządzaniu, co zaszkodziłoby majątkom Różyca",
      metadata: {
        explanation:
          "Kirłowa, mimo że propozycja byłaby dla jej rodziny wielkim szczęściem, odmawia z uczciwości — wie, że Bolesław Kirło nie lubi pracować, nie ma doświadczenia w zarządzaniu i nie podołałby. Nie chce szkodzić krewnemu. Ta scena pokazuje jej szlachetność i prawdomówność.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Porównaj małżeństwo Benedykta i Emilii Korczyńskich z legendą o Janie i Cecylii. Wskaż najważniejsze różnice i wnioski, jakie płyną z tego zestawienia.",
      content: {},
      correctAnswer:
        "Małżeństwo Korczyńskich to antymodel wobec legendy: Jan i Cecylia łączyła wspólna praca i wzajemne wsparcie, Benedykt i Emilia żyją w dwóch osobnych światach — on pogrążony w pracy, ona w marzeniach o pięknie i wrażeniach. Legenda pokazuje, że szczęście wymaga wspólnego celu i równego udziału w trudach życia.",
      metadata: {
        explanation:
          "Jan i Cecylia stanowią idealny model miłości opartej na wspólnej pracy, wzajemnym wsparciu i poświęceniu. Benedykt i Emilia to model przeciwny — nie rozumieją się, mają różne wartości (on: praca i obowiązek; ona: piękno, wrażenia, poezja), żyją obok siebie, nie razem. Orzeszkowa sugeruje, że przyczyną ich nieszczęścia jest brak wspólnego celu i wzajemnego zrozumienia.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Dlaczego Benedykt nie chce sprzedać zaniemeńskiego lasu, mimo że to rozwiązałoby jego problemy finansowe?",
      content: {
        options: [
          "Las przynosi mu ogromne dochody z drewna",
          "W lesie tym znajduje się mogiła jego brata Andrzeja",
          "Prawo zabrania mu sprzedaży lasu",
          "Las jest własnością wspólną z Bohatyrowiczami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Benedykt mówi Darzeckiemu szeptem, że w lesie jest „to… tamto… mogiła” — grób Andrzeja i powstańców. Dodaje, że patrząc na nią „zdaje mu się, że to kościół”. Sentyment ten Darzecki nazywa „sentymentalnością” — Benedykt się z nim zgadza ustami, ale sercem zachowuje to jako świętość.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jaką funkcję pełni w powieści scena, w której Justyna bierze do ręki sierp i zaczyna żąć?",
      content: {
        options: [
          "Jest komicznym przerywnikiem fabularnym",
          "Symbolizuje jej przełom duchowy — odnalezienie sensu życia w pracy",
          "Pokazuje, że Justyna chce zaimponować Janowi swoją siłą",
          "Jest wyrazem jej buntu przeciwko Korczyńskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Moment, w którym Jan podaje Justynie sierp, a ona go przyjmuje, jest kluczowym punktem zwrotnym powieści. Symbolizuje jej przełom duchowy — odrzucenie bezczyności i odnalezienie sensu w pracy fizycznej. To realizacja pozytywistycznej idei pracy jako wartości nadającej sens życiu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Co oznacza charakterystyczny zwrot Benedykta Korczyńskiego „to… tamto… tego…”?",
      content: {
        options: [
          "Jest to przejaw jego niskiego wykształcenia",
          "Służy do zastępowania treści, o których nie może lub nie chce mówić wprost — szczególnie o powstaniu",
          "Jest to regionalizm gwarowy litewski",
          "Wyraża jego znudzenie rozmówcami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zwrot „to… tamto… tego…” to mowa ezopowa Benedykta — służy do omijania tematów niebezpiecznych lub bolesnych, szczególnie związanych z powstaniem styczniowym. W warunkach cenzury carskiej nie można było mówić wprost o powstaniu, a ten nawyk przeszedł u Benedykta także na inne drażliwe tematy.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jakie kryteria stosuje Orzeszkowa do moralnej oceny swoich bohaterów?",
      content: {
        options: [
          "Stosunek do pracy i ziemi",
          "Bogactwo materialne i pozycja społeczna",
          "Stosunek do tradycji narodowej i pamięci o powstaniu",
          "Sposób traktowania innych ludzi, niezależnie od ich statusu",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Orzeszkowa ocenia postacie według trzech kryteriów: stosunku do pracy (Jan, Marta — pozytywne; Zygmunt, Emilia — negatywne), stosunku do tradycji narodowej i pamięci o powstaniu (Benedykt, Anzelm — szanują; Darzecki — odrzuca jako „sentymentalność”) oraz traktowania ludzi (Jan szanuje każdego; Darzecki pogardza uboższymi).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jakie analogie łączą „Nad Niemnem” z „Panem Tadeuszem” Mickiewicza?",
      content: {
        options: [
          "Rozbudowane opisy przyrody jako tło dla akcji",
          "Wątek miłosny kończący waśń dwóch rodów",
          "Akcja rozgrywająca się na Litwie",
          "Główny bohater jest poetą romantycznym",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Analogie z „Panem Tadeuszem”: rozbudowane opisy przyrody litewskiej, wątek miłosny kończący waśń rodów (Justyna-Jan = Zosia-Tadeusz), litewska sceneria. Różnicą jest krytyczne spojrzenie Orzeszkowej na szlachtę, podczas gdy Mickiewicz ją idealizował.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jaką rolę odgrywa mogiła powstańcza w fabule i symbolice powieści?",
      content: {},
      correctAnswer:
        "Jest sacrum — ukrytym grobem powstańców styczniowych, miejscem pamięci łączącym dwór z zaściankiem. Symbolizuje wspólną przeszłość i wartości, które powinny jednoczyć podzielone społeczeństwo.",
      metadata: {
        explanation:
          "Mogiła jest zbiorowym grobem czterdziestu poległych powstańców, w tym Andrzeja Korczyńskiego i Jerzego Bohatyrowicza. Ukryta w borze, nieoznaczona, zapominana przez świat — symbolizuje wypartą pamięć o powstaniu. Łączy dwór (Korczyńscy) z zaściankiem (Bohatyrowicze) wspólną ofiarą krwi. Scena wizyty Justyny na Mogile jest momentem jej duchowego przebudzenia.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "W jaki sposób Orzeszkowa nawiązuje do powstania styczniowego, mimo że nigdy nie nazywa go wprost?",
      content: {},
      correctAnswer:
        'Stosuje mowę ezopową: niedokończone zdania Benedykta ("to… tamto…"), nieoznaczoną mogiłę w lesie, wspomnienia Anzelma o "stukach i grzmotach" zza rzeki, zmianę nazwy lasu na „Mogiłę”, żałobę Andrzejowej, sieroctwo Zygmunta.',
      metadata: {
        explanation:
          "Ze względu na cenzurę carską Orzeszkowa nigdy nie używa słowa „powstanie”. Stosuje technikę mowy ezopowej: Benedykt mówi „to… tamto…”, Anzelm opowiada o odgłosach bitwy jako „stukach i grzmotach”, las zmienia nazwę na „Mogiłę”, Andrzejowa nosi wieczną żałobę, a Korczyńscy mówią o przeżyciach niedomówieniami i gestami.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Kim jest Witold Korczyński jako postać ideowa i jaką rolę pełni w powieści?",
      content: {},
      correctAnswer:
        "Jest porte-parole (głosem) autorki — przedstawicielem młodego pokolenia pozytywistów. Krytykuje próżniactwo wyższych sfer, domaga się pracy u podstaw, oświaty i solidarności z ludem. Łączy ideały narodowe z programem społecznym.",
      metadata: {
        explanation:
          "Witold jest studentem agronomii, który chce modernizować wieś i pomagać chłopom. Krytykuje Darzeckiego za snobizm, Zygmunta za bezczyność, nawet ojca za nadskakiwanie bogatemu szwagrowi. Doradza chłopom kopanie studni, budowę młyna. Anzelm widzi w nim „latorośl” — nadzieję na odrodzenie ideałów, które zginęły z powstańcami.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Przeanalizuj konflikt między Benedyktem a Witoldem Korczyńskim. Jakie są jego przyczyny, przebieg i znaczenie dla wymowy powieści?",
      content: {},
      correctAnswer:
        "Konflikt wynika z różnicy pokoleń i doświadczeń: Benedykt, złamany przez życie, stał się pragmatyczny i pokorny wobec bogatszych; Witold, idealistyczny student, krytykuje ojca za nadskakiwanie Darzeckiemu i zaniedbanie siostry. Obaj są porywczy i dumni — kłócą się gwałtownie, ale łączy ich miłość do ziemi. Konflikt symbolizuje napięcie między rezygnacją starego pokolenia a ideałami młodego. Benedykt nazywa syna „powracającą falą” — rozpoznaje w nim dawne ideały, z których sam zrezygnował.",
      metadata: {
        explanation:
          "Kłótnia ojca z synem po wizycie Darzeckiego to kluczowa scena ukazująca napięcie pokoleniowe. Witold zarzuca ojcu pokorę wobec snobistycznego szwagra i wychowywanie Leoni na „salonową lalkę”. Benedykt czuje się urażony, ale w głębi dostrzega prawdę w słowach syna. Ich konflikt ma znaczenie ogólniejsze — symbolizuje pytanie o to, jak żyć godnie w trudnych czasach: przez pragmatyczny kompromis (Benedykt) czy bezkompromisowy idealizm (Witold).",
      },
    },

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Porównaj dwie miłości Justyny Orzelskiej — do Zygmunta Korczyńskiego i do Jana Bohatyrowicza. Czym się różnią i co mówią o ewolucji bohaterki?",
      content: {},
      correctAnswer:
        "Miłość do Zygmunta była romantyczna, oparta na poezji i marzeniach, ale zakończyła się rozczarowaniem i upokorzeniem — ujawniła przepaść stanową. Miłość do Jana rodzi się ze wspólnoty wartości: szacunku dla pracy, natury i tradycji. Ewolucja od Zygmunta do Jana to przemiana Justyny z biernej, cierpiącej „królewny” w kobietę świadomie wybierającą własną drogę opartą na pracy i prawdziwym partnerstwie.",
      metadata: {
        explanation:
          "Związek z Zygmuntem — to model miłości romantycznej: czytanie Musseta, poetyczne wyznania, ale też egoizm i fałsz (Zygmunt chce jej „duszy”, nie oferując nic poza słowami). Związek z Janem — to model pozytywistyczny: rodzi się z wspólnych przeżyć (spacery, praca, legenda o przodkach), opiera się na wzajemnym szacunku i wspólnym celu. Rozdarcie listu Zygmunta i przyjęcie sierpa od Jana to symboliczne momenty tej przemiany.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 5,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Czy praca jest wartością, która nadaje sens życiu bohaterów „Nad Niemnem”? Odpowiedz, odwołując się do losów wybranych postaci.",
      content: {},
      correctAnswer:
        "W pracy należy odwołać się do: legendy Jana i Cecylii (praca = źródło szlachectwa), Jana Bohatyrowicza (praca jako naturalny sposób życia), Marty (praca mimo osobistych nieszczęść), Benedykta (praca jako obowiązek wobec rodziny), Justyny (odnalezienie sensu w żniwach), Emilii (bezczyność = choroba i nieszczęście). Praca w powieści jest wartością naczelną — ci, którzy pracują, są szczęśliwsi i moralniejsi.",
      metadata: {
        explanation:
          "Praca jest centralną wartością powieści. Orzeszkowa pokazuje ją przez kontrast: pracowici (Jan, Marta, Benedykt, Kirłowa) żyją godnie i mają cel, bezczynni (Emilia, Zygmunt, Różyc) cierpią na nudę i pustkę. Legenda Jana i Cecylii ustanawia pracę jako fundament szlachectwa. Scena żniw, w której Justyna bierze sierp, jest momentem jej duchowego odrodzenia. Praca w „Nad Niemnem” to nie tylko zarabianie na chleb — to sposób na zachowanie godności i więzi z ziemią ojczystą.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jaką technikę literacką stosuje Orzeszkowa, przedstawiając powstanie styczniowe w warunkach cenzury carskiej?",
      content: {
        options: [
          "Alegorię — powstanie przedstawione jest jako bajka o zwierzętach",
          "Mowę ezopową — powstanie jest obecne, ale nigdy nie nazwane wprost, sugerowane niedopowiedzeniami i symbolami",
          "Parabola — powstanie jest opisane jako przypowieść biblijna",
          "Groteska — powstanie jest wyśmiane i zdegradowane",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Orzeszkowa stosuje mowę ezopową (język aluzji i niedomówień). Powstanie nie jest nigdy nazwane — obecne jest poprzez: zmianę nazwy lasu na „Mogiłę”, żałobę Andrzejowej, opowieść Anzelma o „stukach i grzmotach”, frazę Benedykta „to… tamto…”, ukrytą zbiorową mogiłę w borze. Ta technika pozwoliła obejść cenzurę i jednocześnie uczynić powstanie centralnym doświadczeniem bohaterów.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Z jakim gatunkiem literackim badacze porównują „Nad Niemnem” i dlaczego?",
      content: {
        options: [
          "Z powieścią gotycką — z powodu mrocznej atmosfery i tajemnic",
          "Z eposem szlacheckim — ze względu na panoramę społeczną, rozbudowane opisy przyrody i mitologizację przeszłości",
          "Z dramatem naturalistycznym — z powodu biologicznego determinizmu postaci",
          "Z powieścią epistolarną — z powodu licznych listów wymienianych przez bohaterów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Nad Niemnem” porównywane jest z eposem szlacheckim (jak „Pan Tadeusz”): ma szeroką panoramę społeczną, rozbudowane opisy przyrody, mitologizację przeszłości (legenda Jana i Cecylii), wątek miłosny kończący waśń rodów i podniosły ton w scenach kluczowych (mogiła, parów). Orzeszkowa jednak, w odróżnieniu od Mickiewicza, krytycznie ocenia szlachtę.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Które stwierdzenia o ideowym przesłaniu powieści „Nad Niemnem” są trafne?",
      content: {
        options: [
          "Praca na ziemi jest formą patriotyzmu i zachowania polskości",
          "Podziały stanowe są sztuczne — szlachectwo ducha ważniejsze od herbu",
          "Pamięć o powstaniu powinna motywować do walki zbrojnej",
          "Solidarność społeczna między stanami jest warunkiem przetrwania narodu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Orzeszkowa głosi: praca na roli to forma patriotyzmu (utrzymanie ziemi w polskich rękach), podziały stanowe należy przezwyciężać (małżeństwo Justyny z Janem), solidarność społeczna jest konieczna (Witold jako głos autorki). Nie wzywa jednak do walki zbrojnej — po klęsce powstania proponuje pracę organiczną jako drogę do odrodzenia.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Jaki typ narracji stosuje Orzeszkowa w „Nad Niemnem” i jaką funkcję pełni narrator?",
      content: {},
      correctAnswer:
        "Narracja trzecioosobowa z ograniczoną wszechwiedzą — narrator relacjonuje wydarzenia z dystansu, ale wnika w myśli i uczucia wybranych postaci (głównie Justyny i Benedykta). Zachowuje pozorny obiektywizm, ale poprzez dobór szczegółów i porównań wyraźnie wartościuje postawy bohaterów.",
      metadata: {
        explanation:
          "Narrator „Nad Niemnem” jest trzecioosobowy, wszechwiedzący, ale selektywny — wnika w psychikę niektórych postaci (Justyna, Benedykt, Marta), inne pokazuje z zewnątrz (Kirło, Darzecki). Stosuje technikę kontrastu: zestawia pracujących z próżniakami, prawdziwą miłość z pozorną. Nie komentuje wprost, ale poprzez ironiczne opisy (np. Darzeckiego, Emilii) wyraźnie ocenia postawy bohaterów. Charakterystyczna jest też technika panoramiczna — szerokie opisy przyrody i społeczności.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "W jaki sposób „Nad Niemnem” realizuje idee pozytywizmu i jednocześnie wykracza poza nie?",
      content: {},
      correctAnswer:
        "Realizuje idee pozytywizmu poprzez kult pracy organicznej, solidaryzm społeczny, emancypację (Justyna wybiera niezależność), edukację ludu (Witold). Wykracza poza nie poprzez: romantyczną wrażliwość na przyrodę, mitologizację przeszłości (legenda), liryzm scen miłosnych, ukrytą apoteozę czynu powstańczego — łączy pozytywistyczny pragmatyzm z romantycznym idealizmem.",
      metadata: {
        explanation:
          "„Nad Niemnem” łączy pozytywizm z romantyzmem. Pozytywistyczne są: kult pracy (Jan, Marta, Kirłowa), hasło solidaryzmu między stanami (małżeństwo Justyny i Jana), postulat edukacji (Witold), krytyka próżniactwa (Zygmunt, Emilia). Romantyczne natomiast: rozbudowane opisy przyrody, poetyzacja przeszłości (legenda, mogiła), liryzm uczuć, ukryty kult bohaterstwa powstańczego. Orzeszkowa nie odrzuca romantyzmu — przenosi go z polityki do pracy i codziennego bohaterstwa.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "Przeanalizuj symbolikę przestrzeni w „Nad Niemnem”. Jaką rolę odgrywają: dwór korczyński, zaścianek Bohatyrowiczów, parów z grobowcem Jana i Cecylii, mogiła powstańcza oraz piaski nadniemeńskie?",
      content: {},
      correctAnswer:
        "Dwór = zamknięcie, stagnacja, pozory (duszny pokój Emilii vs. przestrzeń salonu). Zaścianek = autentyczność, praca, życie (otwarte ogrody, sad Anzelma). Parów z grobowcem = sacrum tradycji, mit założycielski, wieczność. Mogiła powstańcza = sacrum patriotyczne, samotna i zapomniana ofiara. Piaski = przestrzeń przejścia, liminalność — tu Jan widział ojca po raz ostatni, tu przebiega granica między życiem a śmiercią, historią a teraźniejszością. Justyna, przemieszczając się między tymi przestrzeniami, dokonuje duchowej transformacji.",
      metadata: {
        explanation:
          "Przestrzeń w „Nad Niemnem” jest ściśle symboliczna. Dwór Korczyńskich z dusznym buduarem Emilii symbolizuje zamknięcie i stagnację; zaścianek z sadami i ogrodami — naturalność i pracę. Dwa grobowce — legendowy i powstańczy — tworzą sacrum powieści: łączą mityczną przeszłość z historyczną ofiarą. Piaski nadniemeńskie to przestrzeń progowa — miejsce ostatniego pożegnania Jana z ojcem, ale i droga do mogiły. Ruch Justyny z dworu do zaścianka, przez parów do mogiły, jest wędrówką inicjacyjną: od pustki do sensu, od izolacji do wspólnoty.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "POSITIVISM",
      work: "Nad Niemnem",
      question:
        "„Nad Niemnem” Elizy Orzeszkowej nazywane jest „pozytywistycznym eposem narodowym”. Uzasadnij lub podważ tę tezę, odwołując się do treści i formy powieści oraz porównując ją z „Panem Tadeuszem”Adama Mickiewicza.",
      content: {},
      correctAnswer:
        "Wypracowanie powinno zawierać: cechy eposu w powieści (panorama społeczna, mit założycielski — legenda, podniosły ton kluczowych scen, opisy przyrody, wątek miłosny kończący waśń rodów), analogie z „Panem Tadeuszem” (Litwa, przyroda, dwa zwaśnione rody, miłość jako pojednanie), różnice (krytycyzm Orzeszkowej wobec szlachty, pozytywistyczny kult pracy zamiast romantycznego czynu zbrojnego, ukryty wątek powstania), wniosek — powieść łączy cechy eposu z powieścią realistyczną, co czyni ją unikalnym gatunkowo dziełem.",
      metadata: {
        explanation:
          "„Nad Niemnem” łączy cechy eposu (szerokie ujęcie społeczne, legenda pełniąca funkcję mitu, podniosłość tonu, opisy przyrody, wątek waśni rodów rozwiązanej przez miłość) z powieścią realistyczną (psychologia postaci, krytyka społeczna, problemy ekonomiczne). Analogie z „Panem Tadeuszem”: Litwa, przyroda, dwa rody, miłość młodych = pojednanie. Różnice: Orzeszkowa krytykuje szlachtę (Darzecki, Zygmunt), gloryfikuje pracę zamiast czynu zbrojnego, powstanie jest tematem ukrytym (mowa ezopowa). Teza o „eposie” jest uzasadniona formą, ale treść jest wyraźnie pozytywistyczna — stąd oxymoron „pozytywistyczny epos”.",
      },
    },

    // ======================= KONIEC PYTAŃ NAD NIEMNEM ===================//

    // =====================================================================
    // KONTYNUACJA — wklej ZAMIAST uciętego fragmentu od ostatniego obiektu
    // (ostatni SYNTHESIS_NOTE difficulty 4, temat o Judymie jako bohaterze tragicznym)
    // =====================================================================

    // POPRAWIONY OSTATNI OBIEKT (ucięty metadata.explanation):
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
          "Tomasz Judym jako bohater tragiczny — analiza konfliktu między szczęściem osobistym a imperatywem moralnym",
        requirements: [
          "Wyjaśnij, na czym polega tragizm Judyma",
          "Odwołaj się do sceny rozstania z Joasią",
          "Porównaj Judyma z innym bohaterem tragicznym (np. Antygona, Konrad)",
          "Oceń decyzję Judyma — czy była słuszna?",
          "150-200 słów",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna: zdefiniować tragizm jako konflikt między dwoma pozytywnymi wartościami; pokazać, że Judym rezygnuje z miłości nie z pogardy dla niej, lecz z przekonania, że dom i rodzina „zabiją” w nim zapał do walki z nędzą; porównać go z Antygona (obie postacie kierują się imperatywem moralnym kosztem osobistego szczęścia); przedstawić otwartość interpretacji — czy Judym postąpił słusznie, czy był nazbyt radykalny.",
      metadata: {
        explanation:
          "Tragizm Judyma jest centralnym problemem interpretacyjnym powieści. Podobnie jak Antygona staje przed wyborem między prawem boskim a ludzkim, Judym musi wybrać między miłością a obowiązkiem wobec biedoty. Kluczowe jest, że żaden z tych wyborów nie jest zły — to właśnie czyni sytuację tragiczną. Scena z rozdartą sosną symbolizuje cenę, jaką Judym płaci za swoją decyzję.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Jak można interpretować postać Tomasza Judyma w kontekście Nietzscheańskiej koncepcji nadczłowieka?",
      content: {
        options: [
          "Judym jest klasycznym nadczłowiekiem — gardzi moralnością stada i narzuca światu własną wolę",
          "Judym łączy cechy nadczłowieka (samotność, odrzucenie konwencji, wola mocy) z chrześcijańskim imperatywem służby — jest „nadczłowiekiem na opak”",
          "Judym całkowicie odrzuca filozofię Nietzschego i realizuje wyłącznie etykę chrześcijańską",
          "Judym nie ma nic wspólnego z nadczłowiekiem — jest po prostu idealistycznym lekarzem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judym wykazuje cechy nadczłowieka: samotność, odrzucenie opinii tłumu, heroiczną wolę. Jednak zamiast dążyć do władzy — poświęca się dla najsłabszych. Żeromski tworzy syntezę nietzscheanizmu i etyki społecznej, co badacze nazywają „nadczłowiekiem na opak” lub „prometeizmem społecznym”.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Która z interpretacji epizodycznej postaci Korzeckiego najlepiej oddaje jej funkcję w strukturze powieści?",
      content: {
        options: [
          "Korzecki to komiczna postać, wprowadzona dla odprężenia fabularnego",
          "Korzecki to sobowtór Judyma — ucieleśnia wariant losu, w którym wrażliwość bez czynu prowadzi do autodestrukcji",
          "Korzecki reprezentuje pokolenie pozytywistów rozczarowanych niepowodzeniem pracy organicznej",
          "Korzecki symbolizuje wyłącznie kryzys wiary religijnej w epoce modernizmu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Korzecki jest lustrzanym odbiciem Judyma: obaj są wrażliwi, samotni i cierpią na widok niesprawiedliwości. Różnica polega na tym, że Judym sublimuje cierpienie w czyn społeczny, a Korzecki — pozbawiony tej drogi — popada w nihilizm i samobójstwo. Jego śmierć jest ostrzeżeniem dla Judyma i czytelnika.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Który fragment najlepiej ilustruje technikę mowy pozornie zależnej (erlebte Rede) w powieści?",
      content: {
        options: [
          "— Ojciec mój był szewcem, a w dodatku lichym szewcem na Ciepłej ulicy — powiedział Judym.",
          "Szedł przed siebie ciemną ulicą. Cóż to za miasto! Wszędzie błoto, ciemność, zapach gnijących odpadków. Precz stąd!",
          "Doktor Czernisz uśmiechnął się i powiedział: — To bardzo ciekawe, panie kolego.",
          "Joanna napisała w dzienniku: „Jestem sama na świecie”.",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mowa pozornie zależna łączy perspektywę narratora z głosem bohatera bez cudzysłowu i czasownika mówienia. Fragment B: narrator relacjonuje („Szedł”), ale wykrzyknienia „Cóż to za miasto!” i „Precz stąd!” to myśli Judyma przełożone na narrację trzecioosobową. A — dialog, C — mowa zależna, D — cytat z dziennika.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które z poniższych kontekstów interpretacyjnych są uzasadnione przy analizie „Ludzi bezdomnych”?",
      content: {
        options: [
          "Kontekst marksistowski — walka klas, wyzysk robotników, krytyka kapitalizmu",
          "Kontekst egzystencjalny — samotność jednostki, absurd cierpienia, wolność wyboru",
          "Kontekst postkolonialny — Polska jako kraj skolonizowany, emigracja jako wygnanie",
          "Kontekst feministyczny — dziennik Joanny jako głos kobiecy, krytyka patriarchalnych ograniczeń",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kontekst marksistowski: Żeromski opisuje wyzysk robotników, nędzę proletariatu, konflikt między klasami. Egzystencjalny: samotność Judyma, Korzeckiego, pytanie o sens cierpienia. Feministyczny: dziennik Joanny porusza kwestie niezależności kobiet, pracy, samotności guwernantki. Kontekst postkolonialny jest możliwy, ale najmniej uzasadniony — Żeromski nie tematyzuje bezpośrednio relacji kolonialnych.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które elementy świadczą o tym, że „Ludzie bezdomni” są powieścią modernistyczną, a nie pozytywistyczną?",
      content: {
        options: [
          "Luźna, epizodyczna kompozycja zamiast linearnej fabuły",
          "Obecność narratora wszechwiedzącego z wyraźną tezą ideową",
          "Psychizacja pejzażu i liryzacja prozy",
          "Subiektywizm narracji — wewnętrzny monolog, mowa pozornie zależna, dziennik",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Cechy modernistyczne: luźna kompozycja (brak ciągłej akcji, epizodyczność), psychizacja pejzażu (przyroda odzwierciedla psychikę), subiektywizm (mowa pozornie zależna, dziennik Joanny). Narrator wszechwiedzący z tezą to cecha pozytywistyczna — Żeromski odchodzi od niej na rzecz wielogłosowości.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Czy Tomasz Judym ponosi winę tragiczną? Uzasadnij odpowiedź, odwołując się do koncepcji hamartii Arystotelesa.",
      content: {
        instruction:
          "Odwołaj się do definicji hamartii (błędu tragicznego) i przeanalizuj, czy decyzja Judyma o rozstaniu z Joasią jest błędem, wyborem, czy koniecznością.",
      },
      correctAnswer:
        "Hamartia to błąd tragiczny — nie grzech moralny, lecz pomyłka w ocenie sytuacji. Judym nie popełnia klasycznej hamartii, bo jego decyzja jest świadoma i przemyślana. Można jednak argumentować, że jego hamartia to hybris — pycha społecznika, który uważa, że sam musi zbawić świat. Alternatywna interpretacja: Judym nie ma winy — jest ofiarą systemu, który stawia go przed niemożliwym wyborem. Tragizm polega na tym, że nawet słuszna decyzja niesie cierpienie.",
      metadata: {
        explanation:
          "To pytanie wymaga znajomości poetyki Arystotelesa i umiejętności zastosowania jej do powieści XIX-wiecznej. Kluczowe jest rozróżnienie między winą moralną a błędem tragicznym oraz argumentacja, czy Judym jest sprawcą, czy ofiarą swojego losu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Porównaj obraz nędzy w „Ludziach bezdomnych” Żeromskiego z obrazem nędzy na Powiślu w „Lalce” Prusa. Wskaż podobieństwa i różnice.",
      content: {
        instruction:
          "Uwzględnij techniki literackie, intencję autorską i wymowę ideową obu opisów.",
      },
      correctAnswer:
        "Podobieństwa: obaj autorzy stosują naturalistyczny opis warunków życia biedoty — sutereny, brud, choroby, wyzysk. Obaj krytykują obojętność wyższych warstw. Różnice: Prus opisuje nędzę z perspektywy zewnętrznego obserwatora (Wokulski na Powiślu), zachowując dystans realisty. Żeromski angażuje się emocjonalnie — stosuje liryzację, psychizację pejzażu, mowę pozornie zależną, by czytelnik przeżył nędzę „od wewnątrz”. U Prusa nędza jest argumentem w dyskusji o pracy organicznej; u Żeromskiego — wezwaniem do radykalnego czynu.",
      metadata: {
        explanation:
          "To typowe pytanie maturalne na poziomie rozszerzonym — wymaga porównania dwóch lektur, znajomości technik literackich i umiejętności syntezy.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Przeanalizuj funkcję zmiany narratora w powieści „Ludzie bezdomni”. Dlaczego Żeromski wprowadza rozdział „Zwierzenia” w formie dziennika?",
      content: {},
      correctAnswer:
        "Zmiana z narracji trzecioosobowej na dziennik pierwszoosobowy pełni kilka funkcji: 1) Polifoniczność — wprowadza drugi głos, równoważąc perspektywę Judyma. 2) Intymność — dziennik ujawnia myśli i uczucia, do których narrator trzecioosobowy nie ma pełnego dostępu. 3) Emancypacja Joanny — daje jej podmiotowość, czyni z niej pełnoprawną bohaterkę, nie tylko obiekt uczuć Judyma. 4) Kontrast narracyjny — zmiana formy odświeża percepcję czytelnika i podkreśla wielogłosowość powieści modernistycznej.",
      metadata: {
        explanation:
          "Pytanie wymaga rozumienia narratologii i umiejętności analizy struktury powieści. Kluczowe jest dostrzeżenie, że zmiana narratora nie jest przypadkowa, lecz służy celom ideowym i artystycznym.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "„Ludzie bezdomni” jako powieść o klęsce idealizmu — czy Judym przegrywa?",
        requirements: [
          "Rozważ, czy Judym ponosi klęskę (utrata miłości, posady, samotność) czy odnosi zwycięstwo moralne",
          "Porównaj jego los z losem Korzeckiego — który wariant jest gorszy?",
          "Odwołaj się do symboliki rozdartej sosny",
          "Sformułuj własną ocenę — optymistyczną lub pesymistyczną interpretację zakończenia",
          "200-250 słów",
        ],
        wordLimit: { min: 200, max: 250 },
      },
      correctAnswer:
        "Notatka powinna rozważyć dwie interpretacje: pesymistyczną (Judym traci wszystko — miłość, dom, pozycję; jego walka jest syzyfowa, system się nie zmieni) i optymistyczną (Judym zachowuje integralność moralną, nie zdradza swoich ideałów, jego samotność jest ceną za autentyczność). Porównanie z Korzeckim: ten, kto nie działa, ginie; Judym przynajmniej żyje i walczy. Sosna: rozdarcie jest bolesne, ale drzewo żyje — jak Judym.",
      metadata: {
        explanation:
          "Otwartość zakończenia „Ludzi bezdomnych” to celowy zabieg Żeromskiego. Powieść nie daje jednoznacznej odpowiedzi — zmusza czytelnika do samodzielnej oceny. Na maturze ceniona jest umiejętność sformułowania własnego stanowiska z argumentacją.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Rola kobiet w „Ludziach bezdomnych” — Joanna Podborska jako bohaterka (nie)zależna",
        requirements: [
          "Przedstaw sytuację życiową Joanny — pochodzenie, praca, samotność",
          "Przeanalizuj jej dziennik jako wyraz podmiotowości i niezależności intelektualnej",
          "Oceń, czy Joanna jest postacią emancypacyjną, czy wciąż zależną od mężczyzn",
          "Odwołaj się do kontekstu epoki — sytuacja kobiet pod koniec XIX wieku",
          "200-250 słów",
        ],
        wordLimit: { min: 200, max: 250 },
      },
      correctAnswer:
        "Notatka powinna: przedstawić Joannę jako sierotkę-guwernantkę zależną materialnie od pracodawców, ale niezależną intelektualnie (dziennik, refleksje o feminizmie, teatrze, literaturze). Wskazać napięcie: Joanna jest wykształcona i wrażliwa, ale system społeczny skazuje ją na rolę służebną. Jej dziennik to akt emancypacji — daje jej głos w powieści zdominowanej przez perspektywę Judyma. Jednak zakończenie (Joanna płacze po odejściu Judyma) pokazuje, że jej los zależy od decyzji mężczyzny. Kontekst: pod koniec XIX w. kobieta bez majątku miała ograniczone możliwości samodzielnego życia.",
      metadata: {
        explanation:
          "Analiza feministyczna „Ludzi bezdomnych” to współczesny kontekst interpretacyjny, ceniony na maturze rozszerzonej. Joanna jest jedną z najbardziej złożonych postaci kobiecych w literaturze Młodej Polski.",
      },
    },

    // ===== DIFFICULTY 4-5 — ESSAY (4) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 35,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Czy poświęcenie osobistego szczęścia dla dobra ogółu jest heroizmem, czy egoizmem? Rozważ problem, odwołując się do „Ludzi bezdomnych” Stefana Żeromskiego i innego tekstu kultury.",
      content: {
        requirements: [
          "Sformułuj tezę — czy Judym jest bohaterem, czy egoistą (narzuca swój idealizm kosztem Joasi)?",
          "Odwołaj się do co najmniej dwóch scen z powieści",
          "Przywołaj inny tekst kultury (np. Antygona, Mały Książę, film)",
          "Zachowaj strukturę rozprawki: wstęp — argumenty — kontrargumenty — podsumowanie",
          "Minimum 300 słów",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna rozważyć dwa stanowiska: 1) Heroizm — Judym rezygnuje z własnego szczęścia, by pomagać najsłabszym; działa z imperatywu moralnego, nie z egoizmu. 2) Egoizm — Judym nie pyta Joasi o zdanie, narzuca jej swoją wizję świata; jego „poświęcenie” jest formą pychy. Oba stanowiska powinny być poparte argumentami z tekstu. Dodatkowy tekst kultury — np. Antygona (poświęcenie dla wyższych wartości kosztem życia), Mały Książę (odpowiedzialność za tych, których się oswoiło).",
      metadata: {
        explanation:
          "To typowy temat rozprawki maturalnej na poziomie rozszerzonym. Kluczowa jest umiejętność dostrzeżenia ambiwalencji postawy Judyma i sformułowania własnego stanowiska z argumentacją.",
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Lekarz wobec systemu — od Judyma do współczesności. Czy postulaty Tomasza Judyma są aktualne? Rozważ, odwołując się do powieści i wybranego kontekstu współczesnego.",
      content: {
        requirements: [
          "Przedstaw postulaty Judyma z odczytu u Czerniszów",
          "Odnieś je do współczesnych dyskusji o dostępie do służby zdrowia",
          "Rozważ, czy lekarz powinien być „aktywistą społecznym” czy wyłącznie specjalistą",
          "Sformułuj własną ocenę z argumentami",
          "Minimum 300 słów",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: zrekonstruować postulaty Judyma (lekarze powinni walczyć z przyczynami chorób biedoty, nie tylko je leczyć), odnieść je do współczesności (nierówności w dostępie do opieki zdrowotnej, komercjalizacja medycyny, ruch lekarzy-aktywistów), rozważyć dwa stanowiska: 1) medycyna jako misja społeczna, 2) medycyna jako zawód wymagający profesjonalnego dystansu.",
      metadata: {
        explanation:
          "Temat łączy analizę literacką z refleksją o współczesności — ceniony na maturze rozszerzonej. Wymaga umiejętności aktualizacji problematyki XIX-wiecznej powieści.",
      },
    },
    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Samotność jako cena za wierność ideałom. Rozważ problem, odwołując się do losów Tomasza Judyma i jednej innej postaci literackiej.",
      content: {
        requirements: [
          "Zdefiniuj, czym jest samotność w kontekście powieści — wybraną czy narzuconą?",
          "Przeanalizuj scenę rozstania z Joasią i scenę z rozdartą sosną",
          "Porównaj Judyma z inną samotną postacią (np. Konrad z „Dziadów”, Raskolnikow, Antygona, Werter)",
          "Sformułuj wniosek — czy wierność ideałom skazuje na samotność?",
          "Minimum 300 słów",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: rozróżnić samotność wybraną (Judym — świadomie odrzuca dom) i narzuconą (Joanna — sierota bez wyboru); przeanalizować motywacje Judyma (dług wobec biedoty, przekonanie, że dom „zabije” zapał); porównać z Konradem z Dziadów III (samotność prometejska, poświęcenie dla narodu) lub Raskolnikowem (samotność po przekroczeniu normy moralnej); sformułować wniosek — np. że samotność jest kosztem integralności, ale niekoniecznie jedyną drogą (kontrargument: czy nie można walczyć o sprawiedliwość i kochać jednocześnie?).",
      metadata: {
        explanation:
          "Motyw samotności to jeden z najczęstszych tematów maturalnych. Kluczowe jest pokazanie, że samotność Judyma nie jest prostym poświęceniem, lecz złożonym wyborem z konsekwencjami dla obu stron.",
      },
    },

    // ======================= KONIEC PYTAŃ LUDZIE BEZDOMNI ===================//
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
