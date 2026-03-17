// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= LUDZIE BEZDOMNI — ZESTAW 2 (50 pytań) ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "W jakiej epoce literackiej powstała powieść „Ludzie bezdomni”?",
      content: {
        options: [
          "Romantyzm",
          "Pozytywizm",
          "Młoda Polska",
          "Dwudziestolecie międzywojenne",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "„Ludzie bezdomni” (1899) to powieść epoki Młodej Polski (modernizmu). Łączy elementy naturalizmu, symbolizmu i impresjonizmu — typowe dla estetyki przełomu XIX i XX wieku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Ile tomów liczy powieść „Ludzie bezdomni”?",
      content: {
        options: ["Jeden", "Dwa", "Trzy", "Cztery"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Powieść składa się z dwóch tomów. Tom I obejmuje pobyt Judyma w Paryżu, powrót do Warszawy i przyjazd do Cisów. Tom II rozgrywa się w Cisach i Zagłębiu Dąbrowskim.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Jak ma na imię brat Tomasza Judyma?",
      content: {
        options: ["Wacław", "Wiktor", "Władysław", "Wojciech"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Brat Tomasza Judyma ma na imię Wiktor. Pracuje przy stalowni (gruszce Bessemera), żyje w nędzy z żoną i dziećmi w robotniczej dzielnicy Warszawy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Na jakim instrumencie gra Joanna Podborska?",
      content: {
        options: ["Na skrzypcach", "Na fortepianie", "Na gitarze", "Na flecie"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Joanna gra na fortepianie — muzyka jest jedną z jej pasji i sposobów wyrażania emocji. W Cisach grywa wieczorami, co zbliża ją do Judyma.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Gdzie Judym pracuje po opuszczeniu Cisów?",
      content: {
        options: [
          "Wraca do Paryża",
          "Jedzie do Zagłębia Dąbrowskiego",
          "Otwiera gabinet w Warszawie",
          "Wyjeżdża do Lwowa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Po utracie posady w Cisach Judym jedzie do Zagłębia Dąbrowskiego, gdzie pracuje jako lekarz w kopalni. Tam styka się z najcięższą nędzą robotniczą.",
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
        "Które z poniższych postaci pojawiają się w powieści „Ludzie bezdomni”?",
      content: {
        options: [
          "Tomasz Judym",
          "Stanisław Wokulski",
          "Joanna Podborska",
          "Doktor Węglichowski",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Judym, Podborska i Węglichowski to postacie z „Ludzi bezdomnych”. Stanisław Wokulski jest bohaterem „Lalki” Bolesława Prusa.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które stwierdzenia o fabryce cygar są prawdziwe?",
      content: {
        options: [
          "Pracuje w niej bratowa Judyma",
          "Panuje tam duszne, pełne pyłu tytoniowego powietrze",
          "Fabryka jest nowoczesna i bezpieczna",
          "Pracownice pakują tysiąc funtów tytoniu dziennie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Judymowa (żona Wiktora) pracuje w fabryce cygar w fatalnych warunkach — duszącym powietrzu pełnym pyłu. Zespoły czteroosobowe pakują tysiąc funtów dziennie w zabójczym tempie. Fabryka jest przeciwieństwem „nowoczesnej i bezpiecznej”.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które cechy opisują Tomasza Judyma na początku powieści?",
      content: {
        options: [
          "Jest młodym lekarzem po studiach",
          "Pochodzi z rodziny szlacheckiej",
          "Przebywa w Paryżu na praktyce chirurgicznej",
          "Jest bogaty i niezależny finansowo",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Na początku powieści Judym jest młodym lekarzem po studiach w Warszawie, przebywającym na praktyce w klinikach paryskich. Pochodzi z ubogiej rodziny szewca (nie szlacheckiej) i nie jest zamożny.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Jak reaguje środowisko lekarskie na odczyt Judyma u Czerniszów?",
      content: {
        options: [
          "Z entuzjazmem — natychmiast popierają jego postulaty",
          "Z obojętnością — nikt nie słucha",
          "Z krytyką — uznają jego postulaty za utopijne i niestosowne",
          "Z agresją — Judym zostaje fizycznie zaatakowany",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Lekarze krytykują odczyt Judyma. Doktor Kalecki grzecznie, doktor Płowicz ostro — nazywają jego postulaty „mrzonkami”. Jedynym, który okazuje współczucie, jest doktor Chmielnicki.",
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
        "Dlaczego Judym odwiedza ulicę Ciepłą i Krochmalną po powrocie z Paryża?",
      content: {
        options: [
          "Szuka tam nowego mieszkania",
          "Chce zobaczyć miejsca swojego dzieciństwa i odwiedzić brata Wiktora",
          "Został tam skierowany przez szpital",
          "Spotyka się z doktorem Czerniszem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judym odwiedza rodzinne strony — ulicę Ciepłą, gdzie mieszkał jego ojciec szewc, i okolicę Krochmalnej, gdzie żyje brat Wiktor z rodziną. Ta wizyta konfrontuje go z nędzą, której sam doświadczał w dzieciństwie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Co robi Judym w Château-Rouge?",
      content: {
        options: [
          "Wynajmuje pokój na czas pobytu w Paryżu",
          "Spędza jedną dobę w noclegowni dla nędzarzy, obserwując warunki życia biedoty",
          "Uczęszcza na wykłady medyczne",
          "Spotyka się z polską emigracją",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Château-Rouge to paryska noclegownia dla nędzarzy. Judym spędza tam dobę, widząc na własne oczy skrajną biedę — setki ludzi śpiących na podłodze, prostytutki, zbieraczy niedopałków. To doświadczenie fundamentalnie kształtuje jego poglądy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Kim z zawodu jest Korzecki?",
      content: {
        options: ["Lekarzem", "Inżynierem", "Prawnikiem", "Pisarzem"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Korzecki jest inżynierem pracującym w Zagłębiu Dąbrowskim. Jest człowiekiem wykształconym i wrażliwym, ale cierpiącym na głęboką nerwicę egzystencjalną (pavor nocturnus — lęk nocny).",
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
        "Jaki tytuł nosi rozdział powieści napisany w formie dziennika?",
      content: {
        options: ["„Smutek”", "„Zwierzenia”", "„Przyjdź”", "„Ludzie”"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rozdział „Zwierzenia” to dziennik Joanny Podborskiej — jedyny fragment powieści napisany w pierwszej osobie. Joanna prowadzi zapisy od października do czerwca, ujawniając swoje myśli, uczucia i refleksje.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "W kogo zakochuje się panna Natalia Orszeńska?",
      content: {
        options: [
          "W Tomasza Judyma",
          "W inżyniera Korzeckiego",
          "W Karbowskiego",
          "W doktora Węglichowskiego",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Natalia Orszeńska zakochuje się w Karbowskim — przystojnym, ale lekkomyślnym utracjuszu i karciarzu. Judym porównuje go do kwiatu tuberozy — pięknego, ale bezużytecznego.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które elementy naturalizmu są obecne w „Ludziach bezdomnych”?",
      content: {
        options: [
          "Szczegółowe opisy warunków fizycznych w fabryce cygar",
          "Opis noclegowni Château-Rouge z fizjologicznymi detalami",
          "Idealizacja życia wiejskiego",
          "Sceny pokazujące choroby i brud w suterenach warszawskich",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Naturalizm w powieści objawia się w szczegółowych, fizjologicznych opisach nędzy: fabryka cygar (pył, tempo pracy), Château-Rouge (ciała, smród, choroby), sutereny Warszawy (brud, ciemnota). Żeromski nie idealizuje życia wiejskiego.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które z podanych miejsc akcji należą do tomu II powieści?",
      content: {
        options: ["Paryż", "Cisy", "Zagłębie Dąbrowskie", "Luwr"],
      },
      correctAnswer: [1, 2],
      metadata: {
        explanation:
          "Tom II rozgrywa się w Cisach (zakład leczniczy) i w Zagłębiu Dąbrowskim (kopalnie, cynkownie). Paryż i Luwr pojawiają się na początku tomu I.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które stwierdzenia o ciotce Tomasza Judyma są prawdziwe?",
      content: {
        options: [
          "Wychowała Tomasza i opłaciła mu edukację",
          "Była w młodości „cudną dziewczyną” — prowadziła wystawne życie",
          "Traktowała Tomasza z wielką czułością i troską",
          "Zabrała go z domu rodzinnego na ulicy Ciepłej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Ciotka Judyma była dawną kurtyzaną, która zebrała pieniądze i zabrała małego Tomasza od rodziny, opłacając mu edukację. Nie traktowała go jednak z czułością — była surowa i wymagająca.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Co Judym zarzuca lekarzom w swoim odczycie?",
      content: {
        options: [
          "Że leczą wyłącznie ludzi bogatych",
          "Że nie walczą z przyczynami chorób biedoty",
          "Że stosują przestarzałe metody chirurgiczne",
          "Że ignorują warunki życia w suterenach i fabrykach",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Judym zarzuca środowisku lekarskiemu trzy rzeczy: koncentrację na zamożnych pacjentach, ignorowanie systemowych przyczyn chorób (nędza, brud, fabryki) oraz bierność wobec warunków życia najuboższych. Nie krytykuje metod chirurgicznych.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Jakie znaczenie ma kwiat tuberozy w powieści?",
      content: {
        options: [
          "Symbolizuje miłość Judyma do Joanny",
          "Symbolizuje bezużyteczne piękno — Judym porównuje do niego utracjusza Karbowskiego",
          "Jest motywem przewodnim rozdziału „Zwierzenia”",
          "Symbolizuje nadzieję na lepsze życie robotników",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tuberoza to kwiat piękny, ale bezużyteczny — Judym przyrównuje do niego Karbowskiego, przystojnego karciarza kochanego przez Natalię Orszeńską. Symbol podkreśla kontrast między pięknem a społeczną użytecznością.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Co powoduje malarię wśród mieszkańców okolic Cisów?",
      content: {
        options: [
          "Brudna woda pitna z miejskich studni",
          "Stojąca woda w stawach, sadzawkach i bagnistych terenach parkowych",
          "Kontakt z chorymi kuracjuszami przyjezdnymi",
          "Praca w okolicznych kopalniach siarki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judym odkrywa, że malaria w Cisach pochodzi od stojącej wody w stawach i sadzawkach parkowych. Proponuje osuszenie terenu, ale napotyka opór dyrektora Węglichowskiego i administratora Krzywosąda, którzy nie chcą niszczyć „urządzeń wodnych” zakładu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Jak ginie inżynier Korzecki?",
      content: {
        options: [
          "Ginie w wypadku w kopalni",
          "Umiera na gruźlicę",
          "Popełnia samobójstwo, strzelając do siebie",
          "Zostaje zamordowany przez robotników",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Korzecki popełnia samobójstwo — strzela do siebie. Przed śmiercią zostawia kartkę z cytatem z Platona o Dajmonionie, który „nie stawia mu oporu”. Jego śmierć jest aktem ostatecznego wyzwolenia od lęku egzystencjalnego (pavor nocturnus).",
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
        "Który rozdział powieści najtrafniej ilustruje technikę psychizacji pejzażu?",
      content: {
        options: [
          "Rozdział opisujący Château-Rouge w Paryżu",
          "Rozdział „Smutek” — jesienny park po nieudanym odczycie",
          "Rozdział z odczytem u Czerniszów",
          "Rozdział „Zwierzenia” — dziennik Joanny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W rozdziale „Smutek” jesienny pejzaż — opadające liście, szarość, chłód — odpowiada stanowi psychicznemu Judyma po porażce jego odczytu. Przyroda „mówi” emocjami bohatera, co jest esencją psychizacji pejzażu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Co Judym mówi Joasi w scenie rozstania?",
      content: {
        options: [
          "Że ją kocha, ale musi wyjechać za granicę na stypendium",
          "Że nie może mieć ani ojca, ani matki, ani żony, dopóki trwa nędza najuboższych",
          "Że Joasia nie jest mu równa społecznie i nigdy nie będzie",
          "Że odnalazł inną kobietę w Zagłębiu Dąbrowskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W ostatnim rozdziale Judym wyznaje Joasi, że nie może mieć „ani ojca, ani matki, ani żony”, bo czuje dług wobec biedoty — jako człowiek, który sam wyszedł z nędzy, nie ma prawa budować osobistego szczęścia, dopóki inni cierpią.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Jaka jest reakcja Joanny na rozstanie z Judymem?",
      content: {
        options: [
          "Akceptuje decyzję Judyma ze spokojem i wraca do pracy",
          "Wybucha gniewem i odchodzi, zrywając kontakt",
          "Płacze — jej płacz rozlega się w zakończeniu powieści obok szumu kopalni i rozdartej sosny",
          "Prosi Judyma, by zmienił zdanie i wyjechali razem za granicę",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Zakończenie powieści to jedna z najbardziej poruszających scen w polskiej literaturze. Joanna płacze, a Judym słyszy w ciemności płacz, którego nie potrafi zidentyfikować — „Kto płacze? Czy to Joasia? Kopalnia? A może ta sosna rozdarta?”",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które miejsca w powieści służą jako ilustracja nędzy społecznej?",
      content: {
        options: [
          "Sutereny na ulicy Ciepłej i Krochmalnej w Warszawie",
          "Noclegownia Château-Rouge w Paryżu",
          "Salon doktorostwa Czerniszów",
          "„Budy” robotnicze przy cynkowni w Zagłębiu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Żeromski buduje panoramę nędzy: warszawskie sutereny (Ciepła, Krochmalna), paryska noclegownia (Château-Rouge), „budy” robotnicze w Zagłębiu przy cynkowniach. Salon Czerniszów to przestrzeń zamożnej inteligencji — kontrastowa wobec nędzy.",
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
        "Które postacie okazują Judymowi współczucie lub wsparcie po nieudanym odczycie?",
      content: {
        options: [
          "Doktor Kalecki",
          "Doktor Chmielnicki",
          "Doktor Płowicz",
          "Joanna Podborska",
        ],
      },
      correctAnswer: [1, 3],
      metadata: {
        explanation:
          "Po odczycie Judym jest odrzucony przez środowisko — Kalecki krytykuje łagodnie, Płowicz ostro. Jedynym lekarzem, który okazuje szczere współczucie, jest Chmielnicki. Joanna, choć nie jest obecna na odczycie, stanowi moralne oparcie dla Judyma.",
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
        "Które tematy porusza Joanna Podborska w swoim dzienniku („Zwierzenia”)?",
      content: {
        options: [
          "Samotność guwernantki i tęsknotę za domem rodzinnym",
          "Plany podróży do Paryża",
          "Śmierć brata Wacława",
          "Refleksje o roli kobiet i feminizmie",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Dziennik Joanny porusza: samotność guwernantki bez własnego domu, żałobę po bracie Wacławie (zmarł na zesłaniu/podróży naukowej), refleksje o roli kobiet w społeczeństwie. Joanna nie planuje podróży do Paryża — tam był Judym.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Które informacje o Krzywosądzie Chobrzańskim są prawdziwe?",
      content: {
        options: [
          "Jest administratorem zakładu w Cisach",
          "Był wcześniej antykwariuszem w Monachium",
          "Sam naprawia urządzenia w zakładzie — jest majsterkowiczem-samoukiem",
          "Popiera reformy Judyma dotyczące osuszenia stawów",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Krzywosąd to administrator Cisów, dawny antykwariusz z Monachium, samouk-majsterkowicz. Nie popiera reform Judyma — wręcz przeciwnie, broni istniejących urządzeń wodnych i dochodzi do fizycznej konfrontacji z Judymem.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Dlaczego Judym czuje „dług” wobec biedoty, choć sam nie wyrządził jej krzywdy?",
      content: {
        options: [
          "Ponieważ wzbogacił się kosztem robotników",
          "Ponieważ sam pochodząc z nędzy i z niej się wydostawszy, czuje, że jego wykształcenie jest przywilejem opłaconym cierpieniem klasy, z której się wywodzi",
          "Ponieważ obiecał to swojemu ojcu na łożu śmierci",
          "Ponieważ tak nakazuje mu kodeks lekarski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Judym uważa, że jako syn szewca, który dzięki ciotce zdobył wykształcenie, jest „zdrajcą” swojej klasy — każdy awans społeczny odbywa się kosztem tych, którzy zostali na dole. Jego dług nie jest osobisty, lecz klasowy i moralny.",
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
        "Jak można zinterpretować pytanie „Kto płacze?” z ostatniej sceny powieści?",
      content: {
        options: [
          "Judym po prostu nie rozpoznaje głosu Joanny w ciemności",
          "Pytanie rozmywa granicę między cierpieniem jednostki (Joasia) a cierpieniem zbiorowym (kopalnia, przyroda) — to wyraz uniwersalizacji bólu",
          "Judym halucynuje z powodu wyczerpania fizycznego",
          "To retoryczne pytanie skierowane do czytelnika, kto jest winny rozstania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pytanie „Kto płacze?” jest kulminacją symbolizmu powieści. Żeromski celowo zaciera granicę między płaczem Joasi, „płaczem” kopalni i „płaczem” rozdartej sosny — cierpienie jest wszechobecne i uniwersalne, obejmuje ludzi, przyrodę i cywilizację przemysłową.",
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
        "Jaką rolę ideową pełni postać M. Lesa (Leszczykowskiego) wobec Judyma?",
      content: {
        options: [
          "Jest antagonistą Judyma — bogaczem, który blokuje reformy",
          "Jest wzorem „idealnego pozytywisty” — łączy sukces finansowy z filantropią i marzycielskim idealizmem, ale działa z dystansu",
          "Jest mentorem Judyma — uczy go technik chirurgicznych",
          "Jest komicznym kontrapunktem — ekscentryczny kupiec bez wpływu na fabułę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "M. Les to bogaty kupiec z Konstantynopola, największy udziałowiec Cisów, który finansuje reformy z „cichej kasy”. Łączy praktykę kupiecką z idealizmem — marzy o ucywilizowaniu rodzinnej okolicy, ale nigdy tam nie przyjeżdża. Jest pozytywnym wzorem, z którym Judym nie potrafi jednak w pełni się utożsamić — Les działa pieniędzmi, Judym — czynem.",
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
        "Co oznacza „pavor nocturnus” Korzeckiego i jaką ma funkcję w powieści?",
      content: {
        options: [
          "To choroba serca, która zmusza go do rezygnacji z pracy — funkcja fabularna",
          "To lęk nocny — nawracający strach przed śmiercią, który symbolizuje egzystencjalną samotność wrażliwego intelektualisty bez celu życia",
          "To alergia na pyły kopalniane — ilustracja warunków pracy w Zagłębiu",
          "To metafora artystyczna oznaczająca tęsknotę za ojczyzną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pavor nocturnus (lęk nocny) Korzeckiego to nawracający, paraliżujący strach przed śmiercią. Symbolizuje los wrażliwego intelektualisty, który nie znalazł drogi do czynu — w przeciwieństwie do Judyma, który sublimuje cierpienie w działanie społeczne. Korzecki to ostrzeżenie: co stanie się z Judymem, jeśli straci cel.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Co oznacza określenie „powieść o luźnej kompozycji” w odniesieniu do „Ludzi bezdomnych”?",
      content: {
        options: [
          "Powieść nie ma żadnej struktury — jest chaotyczna",
          "Fabuła jest epizodyczna, brak ciągłej linii akcji — poszczególne rozdziały funkcjonują jako względnie samodzielne obrazy",
          "Powieść składa się z niezwiązanych opowiadań różnych autorów",
          "Kolejność rozdziałów można dowolnie przestawiać bez utraty sensu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Luźna kompozycja” to cecha powieści młodopolskiej: zamiast ciągłej, linearnej fabuły mamy serię obrazów (Paryż, Warszawa, Cisy, Zagłębie), połączonych postacią Judyma, ale o dużej autonomii. Każdy rozdział-obraz ma własną dramaturgię i nastrój. To nie chaos, lecz świadomy zamysł artystyczny.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Które z poniższych par postaci tworzą kontrasty ideowe w powieści?",
      content: {
        options: [
          "Judym i Karbowski — idealizm społeczny vs. hedonistyczna bezcelowość",
          "Judym i Korzecki — czyn vs. bierność (obaj wrażliwi, ale różne drogi)",
          "Joanna i Natalia — samodzielność intelektualna vs. romantyczne uniesienie",
          "Węglichowski i Krzywosąd — obaj jednoznacznie wspierają reformy Judyma",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Żeromski buduje system kontrastów: Judym (czyn) vs Karbowski (bezcelowość), Judym (działanie) vs Korzecki (bierność prowadząca do samobójstwa), Joanna (intelektualna niezależność) vs Natalia (romantyczny poryw). Węglichowski i Krzywosąd obaj PRZECIWSTAWIAJĄ się reformom Judyma.",
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
        "Które cechy wyróżniają Joannę Podborską jako postać nowatorską na tle epoki?",
      content: {
        options: [
          "Prowadzi dziennik — ma własny głos narracyjny w powieści zdominowanej przez męską perspektywę",
          "Utrzymuje się samodzielnie z pracy nauczycielskiej",
          "Jest bogatą arystokratką, która z wyboru pracuje jako guwernantka",
          "Reflektuje o roli kobiet, edukacji i niezależności — porusza tematy feministyczne",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Joanna jest postacią nowatorską: ma własny głos narracyjny (dziennik), utrzymuje się z pracy (nauczycielka, guwernantka), porusza kwestie feministyczne. Nie jest arystokratką — pochodzi ze zubożałej rodziny ziemiańskiej, pracuje z konieczności, nie z wyboru.",
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
        "Które z poniższych tez o powieści „Ludzie bezdomni” są uzasadnione?",
      content: {
        options: [
          "Żeromski łączy w powieści postulaty pozytywistycznej pracy u podstaw z modernistyczną wrażliwością artystyczną",
          "Powieść jest manifestem rewolucji robotniczej wzywającym do walki zbrojnej",
          "Kompozycja powieści opiera się na ruchu przestrzennym bohatera — Paryż, Warszawa, Cisy, Zagłębie",
          "Narracja jest wyłącznie obiektywna i zdystansowana, jak u Prusa",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Żeromski łączy pozytywistyczny postulat pomocy biednym z modernistyczną formą (symbolizm, impresjonizm, liryzacja). Kompozycja oparta jest na trasie bohatera: Paryż → Warszawa → Cisy → Zagłębie. Powieść NIE jest manifestem rewolucji ani narracją obiektywną — narrator jest emocjonalnie zaangażowany.",
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
        "Jak można zinterpretować scenę w Luwrze — zestawienie Wenus z Milo i „Ubogiego rybaka” — w kontekście całej powieści?",
      content: {
        options: [
          "To przypadkowe tło fabularne — Żeromski umieszcza bohaterów w muzeum dla kolorytu",
          "To ekspozycja dwóch biegunów świata Judyma — piękna i nędzy — które definiują jego wewnętrzny konflikt i zapowiadają tragiczny wybór w finale",
          "To krytyka sztuki muzealnej jako oderwany od życia luksus",
          "To wyłącznie pretekst do wprowadzenia postaci Joanny — sam kontrast dzieł nie ma znaczenia symbolicznego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena w Luwrze to programowy prolog powieści: Wenus z Milo (piękno, miłość, szczęście) i „Ubogi rybak” (nędza, cierpienie) to dwa bieguny, między którymi rozgrywa się cała fabuła. Judym jest wrażliwy na oba — potrafi cieszyć się pięknem i cierpieć na widok nędzy. Ta podwójna wrażliwość skazuje go na tragizm.",
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
        "Co odróżnia stosunek Żeromskiego do nędzy od pozytywistycznego ujęcia tego tematu u Prusa?",
      content: {
        options: [
          "Prus opisuje nędzę szczegółowiej niż Żeromski",
          "Żeromski łączy opis nędzy z emocjonalnym zaangażowaniem narratora i technikami lirycznymi, podczas gdy Prus zachowuje obiektywny dystans realisty",
          "Żeromski unika tematu nędzy — koncentruje się na psychice bohaterów",
          "Obaj autorzy traktują nędzę identycznie — różnią się wyłącznie fabularnie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kluczowa różnica: Prus jako realista opisuje nędzę z dystansem, pozwalając faktom mówić za siebie (np. spacer Wokulskiego po Powiślu). Żeromski jako modernista angażuje narratora emocjonalnie — stosuje liryzację, psychizację pejzażu, mowę pozornie zależną, zmuszając czytelnika do przeżycia nędzy „od wewnątrz”.",
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
        "Dlaczego powieść „Ludzie bezdomni” bywa klasyfikowana jednocześnie jako powieść społeczna, psychologiczna i symboliczna?",
      content: {
        options: [
          "Ponieważ krytycy literaccy nie potrafią uzgodnić jednej klasyfikacji",
          "Ponieważ opisuje nędzę społeczną (społeczna), analizuje wewnętrzne rozterki i motywacje bohaterów (psychologiczna) i posługuje się obrazami-symbolami: Wenus, rybak, sosna (symboliczna)",
          "Ponieważ Żeromski pisał ją z myślą o trzech różnych grupach czytelników",
          "Ponieważ każdy z dwóch tomów reprezentuje inny gatunek",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wielogatunkowość „Ludzi bezdomnych” wynika z bogactwa tekstu: warstwa społeczna (krytyka nędzy, wyzysku, systemu klasowego), psychologiczna (analiza motywacji Judyma, dziennik Joanny, pavor nocturnus Korzeckiego) i symboliczna (Wenus = piękno, Rybak = nędza, sosna = rozdarcie) współistnieją, tworząc syntezę typową dla modernizmu.",
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
        "Które z poniższych analogii między „Ludźmi bezdomnymi” a innymi tekstami kultury są uzasadnione?",
      content: {
        options: [
          "Judym i Antygona — oboje stawiają imperatyw moralny ponad osobiste szczęście, za co płacą samotność/śmiercią",
          "Judym i Raskolnikow — obaj popełniają zbrodnię motywowaną ideologicznie",
          "Joanna i Jane Eyre — obie są guwernatkami walczącymi o godność i niezależność",
          "Korzecki i Werter — obaj popełniają samobójstwo z powodu niespełnionej miłości",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          "Analogia Judym–Antygona: oboje wybierają wyższy imperatyw moralny kosztem osobistego szczęścia. Joanna–Jane Eyre: obie są guwernatkami, sierotami, walczącymi o podmiotowość. Raskolnikow popełnia zbrodnię — Judym nie. Korzecki nie ginie z powodu niespełnionej miłości, lecz z egzystencjalnego lęku.",
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
        "Które aspekty powieści świadczą o wpływie filozofii schyłku XIX wieku na Żeromskiego?",
      content: {
        options: [
          "Nietzscheański motyw samotnego jednostki przekraczającej normy społeczne (Judym)",
          "Schopenhauerowski pesymizm — cierpienie jako fundament egzystencji (Korzecki, nędzarze)",
          "Bergsona intuicjonizm — Judym działa instynktownie, poza rozumem",
          "Dekadencki motyw bezsensu i rozpadu — samobójstwo Korzeckiego, bezsilność Judyma wobec systemu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Żeromski czerpie z Nietzschego (Judym jako samotny „nadczłowiek na opak”), Schopenhauera (świat jako cierpienie — nędzarze, Korzecki) i dekadentyzmu (bezsilność wobec systemu, samobójstwo jako ostateczność). Bergsonowski intuicjonizm nie jest wyrazistym kontekstem powieści — Judym działa raczej z imperatywu moralnego niż z intuicji.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Wyjaśnij, dlaczego Żeromski umieścił scenę w Luwrze na początku powieści. Jaką funkcję kompozycyjną i symboliczną pełni ten fragment?",
      content: {
        instruction:
          "Odwołaj się do Wenus z Milo, „Ubogiego rybaka” i pierwszego spotkania Judyma z Joasią.",
      },
      correctAnswer:
        "Scena w Luwrze pełni funkcję ekspozycji — zapowiada kluczowe wątki powieści. Wenus z Milo symbolizuje piękno, harmonię i miłość (zapowiedź wątku Judym–Joasia). „Ubogi rybak” symbolizuje nędzę i krzywdę (zapowiedź wątku społecznego). Kontrast między nimi prefiguruje centralny konflikt powieści — rozdarcie Judyma między pragnieniem pięknego życia a obowiązkiem wobec biedoty. Spotkanie z Joasią w tym samym miejscu łączy oba bieguny: miłość i idea spotykają się w muzeum, ale okaże się, że nie mogą współistnieć w życiu bohatera.",
      metadata: {
        explanation:
          "Kompozycyjna rola prologu muzealnego jest typowym pytaniem maturalnym. Wymaga rozpoznania techniki zapowiedzi (foreshadowing) i umiejętności łączenia symboli z fabułą.",
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
        "Porównaj postawę doktora Węglichowskiego i Tomasza Judyma wobec problemów sanitarnych w Cisach. Kto ma rację?",
      content: {},
      correctAnswer:
        "Węglichowski to doświadczony lekarz, ceniony dyrektor — podchodzi do problemów pragmatycznie, chroni stabilność zakładu i interesy kuracjuszów. Judym to młody idealiasta — widzi malarię, odkrywa jej przyczynę (stojąca woda), domaga się radykalnych zmian (osuszenie stawów). Węglichowski ma rację z perspektywy zarządzania (nie można zniszczyć infrastruktury bez planu), Judym — z perspektywy medycznej (stojąca woda zabija ludzi). Konflikt ilustruje szerszy problem: czy reformy powinny być ostrożne i stopniowe, czy radykalne i natychmiastowe.",
      metadata: {
        explanation:
          "Pytanie wymaga umiejętności analizy konfliktu bez jednoznacznego opowiedzenia się po jednej stronie — na maturze ceniona jest umiejętność dostrzegania racji obu stron.",
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
        "Czy Judym jest postacią prometeuszowską? Uzasadnij, odwołując się do mitu o Prometeuszu i do tekstu powieści.",
      content: {
        instruction:
          "Wskaż cechy łączące Judyma z Prometeuszem i cechy różniące ich losy.",
      },
      correctAnswer:
        "Cechy prometeuszowskie Judyma: bunt przeciw istniejącemu porządkowi, poświęcenie osobistego szczęścia dla dobra ludzkości, samotność jako cena heroizmu, sprzeciw wobec „bogów” (klasa rządząca, lekarze-konserwatyści). Różnice: Prometeusz daje ogień — konkretny dar; Judym próbuje, ale niewiele osiąga — jego walka jest syzyfowa. Prometeusz cierpi z winy Zeusa (kara); Judym cierpi z własnego wyboru. Judym jest zatem „Prometeuszem bez ognia” — niesie w sobie zapał, ale system uniemożliwia mu skuteczne działanie.",
      metadata: {
        explanation:
          "Porównanie z Prometeuszem to klasyczny kontekst interpretacyjny na maturze rozszerzonej. Kluczowe jest dostrzeżenie zarówno podobieństw, jak i różnic — Judym nie jest prostym powtórzeniem mitu.",
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
        "Jakie funkcje pełnią w powieści opisy przyrody? Podaj trzy przykłady i określ, jaką techniką narracyjną posługuje się Żeromski.",
      content: {},
      correctAnswer:
        "Opisy przyrody pełnią funkcje: 1) Psychizacja pejzażu — jesienny park w „Smutku” odzwierciedla przygnębienie Judyma po nieudanym odczycie. 2) Kontrapunkt emocjonalny — wiosenna przyroda w „Przyjdź” (kwitnące krzewy, ciepło) wyraża tęsknotę miłosną i nadzieję. 3) Symbolika — rozdarta sosna na końcu powieści symbolizuje rozdarcie duszy Judyma, krople żywicy = łzy/cierpienie. Technika to „żeromszczyzna” — łączenie impresjonizmu (migotliwość wrażeń), symbolizmu (przyroda jako znak) i liryzacji prozy (poetycki, emocjonalny język opisu).",
      metadata: {
        explanation:
          "Pytanie łączy analizę literacką z wiedzą o technikach narracyjnych. Kluczowe terminy: psychizacja pejzażu, liryzacja prozy, impresjonizm, symbolizm.",
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
        "Oceń decyzję Judyma z perspektywy etyki utylitarystycznej. Czy jego rozstanie z Joasią maksymalizuje „sumę szczęścia”?",
      content: {
        instruction:
          "Odwołaj się do pojęcia utylitaryzmu (działanie słuszne = przynoszące najwięcej dobra dla największej liczby osób).",
      },
      correctAnswer:
        "Z perspektywy utylitarystycznej: Judym poświęca szczęście dwóch osób (swoje i Joasi), by pracować dla tysięcy biednych. Matematycznie — decyzja jest słuszna, bo suma szczęścia rośnie. ALE: Judym nie wie, czy jego praca przyniesie realne efekty — może być Syzyfem, który cierpi na darmo. Utylitarysta zapytałby: czy Judym z Joasią u boku nie byłby skuteczniejszym lekarzem? Czy szczęśliwy człowiek nie pomaga lepiej niż nieszczęśliwy samotnik? Powieść nie rozstrzyga — ale pokazuje, że Judym kieruje się etyką kantowską (obowiązek moralny), nie utylitarystyczną (efekt).",
      metadata: {
        explanation:
          "Pytanie wymaga zastosowania filozofii etycznej do tekstu literackiego — to wymaganie typowe dla matury rozszerzonej na najwyższym poziomie.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (1) =====

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
          "System kontrastów w „Ludziach bezdomnych” — jak Żeromski zestawia postacie, miejsca i symbole, by budować wymowę ideową powieści",
        requirements: [
          "Wskaż co najmniej dwie pary kontrastujących postaci (np. Judym–Karbowski, Judym–Korzecki)",
          "Wskaż kontrast przestrzenny (np. salon Czerniszów–sutereny, Luwr–Château-Rouge)",
          "Wskaż kontrast symboliczny (Wenus–Rybak)",
          "Wyjaśnij, jak te kontrasty budują przesłanie powieści",
          "150-200 słów",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna obejmować: kontrasty postaci — Judym (czyn, idealizm) vs Karbowski (bezcelowość, hedonizm); Judym (działanie) vs Korzecki (bierność → samobójstwo); Joanna (samodzielność) vs Natalia (romantyczne uniesienie). Kontrasty przestrzenne — Luwr (piękno) vs Château-Rouge (nędza); salon Czerniszów (elegancja) vs sutereny Ciepłej (brud); park w Cisach (przyroda) vs cynkownia w Zagłębiu (przemysł). Kontrast symboliczny — Wenus z Milo (piękno, harmonia) vs „Ubogi rybak” (cierpienie). Przesłanie: piękno i nędza współistnieją w świecie, a wrażliwy człowiek (Judym) musi wybrać, któremu biegunowi poświęci życie.",
      metadata: {
        explanation:
          "Analiza kontrastów to jedna z najskuteczniejszych metod interpretacji powieści Żeromskiego. Na maturze ceniona jest umiejętność dostrzegania opozycji binarnych i ich funkcji w tekście.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 35,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Czy literatura powinna budzić sumienie społeczne? Rozważ problem, odwołując się do „Ludzi bezdomnych” Żeromskiego i jednego innego tekstu kultury.",
      content: {
        requirements: [
          "Sformułuj tezę — czy funkcją literatury jest wpływanie na postawy społeczne czytelników?",
          "Przeanalizuj, jak Żeromski próbuje wstrząsnąć sumieniem czytelnika (opisy nędzy, los Judyma)",
          "Porównaj z innym tekstem kultury zaangażowanym społecznie (np. „Przedwiośnie”, „Granica”, „Dżuma” Camusa)",
          "Rozważ kontrargument — literatura jako sztuka czysta, bez misji społecznej (l'art pour l'art)",
          "Sformułuj wniosek z argumentacją",
          "Minimum 300 słów",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: zdefiniować pojęcie literatury zaangażowanej; pokazać, jak Żeromski budzi sumienie czytelnika (naturalistyczne opisy nędzy, dramatyczny los Judyma, symbol rozdartej sosny); porównać z innym tekstem (np. „Przedwiośnie” — krytyka odrodzonej Polski, „Dżuma” — solidarność wobec cierpienia); rozważyć stanowisko przeciwne (modernistyczny postulat sztuki czystej — Przybyszewski, „Confiteor”); sformułować wniosek — np. że najlepsza literatura łączy wartość artystyczną z zaangażowaniem (jak właśnie u Żeromskiego).",
      metadata: {
        explanation:
          "Temat łączy refleksję o literaturze z refleksją o etyce — typowy dla matury rozszerzonej. Kluczowe jest umieszczenie powieści w kontekście dyskusji o funkcjach literatury.",
      },
    },

    // ======================= KONIEC ZESTAWU 2 — LUDZIE BEZDOMNI ===================//
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
