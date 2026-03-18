// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= POCZĄTEK PYTAŃ TRENY — ZESTAW 1 (60 pytań, diff 1-3) ===================//
    // UWAGA: Polskie cudzysłowy zamienione na proste "" — ale polskie znaki diakrytyczne (ą, ę, ć, ś, ź, ż, ł, ó, ń) UŻYWANE w treściach!
    // UWAGA: Wyłącznie poziomy trudności 1-3. Epoka: RENAISSANCE. Utwór: Treny.

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (10) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: 'Kto jest autorką reportażu "Zdążyć przed Panem Bogiem"?',
      content: {
        options: [
          "Zofia Nałkowska",
          "Hanna Krall",
          "Wisława Szymborska",
          "Ida Fink",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Autorką jest Hanna Krall (ur. 1935) — polska dziennikarka i pisarka, znana z reportaży poświęconych losowi Żydów polskich. "Zdążyć przed Panem Bogiem" ukazało się w 1977 roku i jest jej najbardziej znanym dziełem.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Kim jest Marek Edelman — główny bohater reportażu?",
      content: {
        options: [
          "Polskim poetą wojennym",
          "Lekarzem kardiologiem i jednym z przywódców powstania w getcie warszawskim",
          "Historykiem piszącym o Holokauście",
          "Niemieckim oficerem stacjonującym w Warszawie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Marek Edelman (1919–2009) był lekarzem kardiologiem i ostatnim żyjącym przywódcą powstania w getcie warszawskim (1943). W reportażu opowiada Hannie Krall o wydarzeniach wojennych i o swojej powojennej pracy lekarza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        'Jaki gatunek literacki reprezentuje "Zdążyć przed Panem Bogiem"?',
      content: {
        options: [
          "Powieść historyczna",
          "Reportaż literacki (literatura faktu)",
          "Dramat sceniczny",
          "Pamiętnik",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Zdążyć przed Panem Bogiem" to reportaż literacki — utwór z pogranicza dziennikarstwa i literatury, oparty na rozmowach autorki z Markiem Edelmanem. Łączy wywiad, relację odautorską i komentarz. Zaliczany do literatury faktu.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Kiedy wybuchło powstanie w getcie warszawskim, o którym opowiada Edelman?",
      content: {
        options: [
          "1 sierpnia 1944 roku",
          "19 kwietnia 1943 roku",
          "22 lipca 1942 roku",
          "1 września 1939 roku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Powstanie w getcie warszawskim wybuchło 19 kwietnia 1943 roku. Nie należy mylić go z Powstaniem Warszawskim (1 sierpnia 1944). 22 lipca 1942 to początek wielkiej akcji likwidacyjnej getta (deportacje na Umschlagplatz).",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Jak nazywała się organizacja bojowa, która prowadziła powstanie w getcie?",
      content: {
        options: [
          "Armia Krajowa (AK)",
          "Żydowska Organizacja Bojowa (ŻOB)",
          "Gwardia Ludowa (GL)",
          "Żydowski Związek Wojskowy (ŻZW)",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "ŻOB — Żydowska Organizacja Bojowa — była główną organizacją prowadzącą powstanie. Jej komendantem był Mordechaj Anielewicz, a zastępcami m.in. Marek Edelman. ŻOB liczyła około 220 bojowców.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Kto był komendantem ŻOB w powstaniu w getcie?",
      content: {
        options: [
          "Marek Edelman",
          "Mordechaj Anielewicz",
          "Adam Czerniaków",
          "Icchak Cukierman (Antek)",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Mordechaj Anielewicz był komendantem ŻOB. Edelman mówi o nim: "Bardzo chciał nim być, więc go wybraliśmy". Miał 21 lat. Zginął 8 maja 1943 roku w bunkrze na Miłej 18, popełniając samobójstwo wraz z Mirą i innymi bojowcami.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Co to był Umschlagplatz?",
      content: {
        options: [
          "Plac targowy w getcie, gdzie handlowano żywnością",
          "Plac przeładunkowy, z którego deportowano Żydów do obozu zagłady w Treblince",
          "Siedziba żydowskiej policji w getcie",
          "Cmentarz żydowski na Okopowej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Umschlagplatz (niem. plac przeładunkowy) znajdował się przy ulicy Stawki. Stąd wywożono Żydów wagonami towarowymi do obozu zagłady w Treblince. Podczas wielkiej akcji likwidacyjnej (lipiec-wrzesień 1942) deportowano tędy około 300 000 osób.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Czym zajmował się Edelman po wojnie?",
      content: {
        options: [
          "Był politykiem i posłem na sejm",
          "Był lekarzem kardiologiem — operował serca i ratował życie pacjentów",
          "Był pisarzem i historykiem Holokaustu",
          "Był nauczycielem w szkole żydowskiej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Po wojnie Edelman został lekarzem kardiologiem w Łodzi. Pracował z profesorem Janem Mollem, operując serca pacjentów. W reportażu praca lekarska jest drugą osią narracji — równoległą do wspomnień wojennych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Ilu bojowców liczyła ŻOB według Edelmana?",
      content: {
        options: ["Pięciuset", "Dwustu dwudziestu", "Tysiąc", "Czterdziestu"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman konsekwentnie podaje liczbę 220 bojowców, odrzucając próby zawyżania tej liczby. Gdy Antek twierdzi, że było ich 500 lub 600, Edelman odpowiada: "Nas było dwustu dwudziestu" i dodaje: "Czy wy wszyscy naprawdę nie możecie zrozumieć, że to już jest bez znaczenia?!"',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Kto popełnił samobójstwo jako prezes Gminy Żydowskiej w getcie?",
      content: {
        options: [
          "Mordechaj Anielewicz",
          "Adam Czerniaków",
          "Szeryński",
          "Lejkin",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Adam Czerniaków popełnił samobójstwo 23 lipca 1942 roku — pierwszego dnia wielkiej akcji likwidacyjnej. Edelman ma do niego pretensje: "należało umrzeć z fajerwerkiem" — to znaczy wezwać ludzi do walki, a nie umierać w milczeniu, prywatnie.',
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Które z poniższych stwierdzeń o reportażu są prawdziwe?",
      content: {
        options: [
          "Reportaż oparty jest na rozmowach Hanny Krall z Markiem Edelmanem",
          "Został wydany w 1977 roku",
          "Opowiada wyłącznie o powstaniu w getcie — bez wątków powojennych",
          "Łączy wspomnienia wojenne z opisem powojennej pracy kardiochirurgicznej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Reportaż oparty jest na rozmowach z Edelmanem, wydany w 1977 roku. NIE opowiada wyłącznie o getcie — drugą osią jest praca kardiochirurgiczna Edelmana (operacje Profesora Molla, pacjenci: Rudny, Bubnerowa, Rzewuski).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Które postacie pojawiają się w reportażu?",
      content: {
        options: [
          "Mordechaj Anielewicz — komendant ŻOB",
          "Michał Klepfisz — zasłonił sobą karabin maszynowy na strychu",
          "Janusz Korczak — lekarz i pedagog, poszedł z dziećmi do wagonów",
          "Władysław Szpilman — pianista ukrywający się w ruinach Warszawy",
        ],
      },
      correctAnswer: [0, 1],
      metadata: {
        explanation:
          'Anielewicz i Klepfisz to postacie z reportażu. Korczak jest wspomniany tylko w jednym zdaniu ("O Korczaku wiedzą wszyscy"). Szpilman (bohater "Pianisty") NIE pojawia się w reportażu Krall.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Połącz postacie z ich funkcjami:",
      content: {
        matchingType: "characters_to_roles",
        leftColumn: [
          { id: "A", text: "Marek Edelman" },
          { id: "B", text: "Mordechaj Anielewicz" },
          { id: "C", text: "Profesor Jan Moll" },
          { id: "D", text: "Hanna Krall" },
        ],
        rightColumn: [
          { id: "1", text: "Autorka reportażu, dziennikarka" },
          { id: "2", text: "Zastępca komendanta ŻOB, później kardiolog" },
          { id: "3", text: "Komendant ŻOB, zginął na Miłej 18" },
          { id: "4", text: "Kardiochirurg operujący serca w Łodzi" },
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
          "Edelman — zastępca komendanta, potem kardiolog. Anielewicz — komendant ŻOB, samobójstwo 8 maja 1943. Profesor Moll — kardiochirurg, z którym Edelman współpracował po wojnie. Hanna Krall — autorka, przeprowadziła wywiad.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Które wydarzenia dotyczą wielkiej akcji likwidacyjnej getta (lipiec-wrzesień 1942)?",
      content: {
        options: [
          "Deportacje z Umschlagplatzu do Treblinki — 10 000 ludzi dziennie",
          "Samobójstwo Adama Czerniakowa — 23 lipca 1942",
          "Podpalenie getta przez Niemców i walki na dachach",
          "Rozdawanie chleba, po który ludzie dobrowolnie szli do wagonów",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Deportacje, samobójstwo Czerniakowa i rozdawanie chleba to akcja likwidacyjna 1942 roku. Podpalenie getta nastąpiło dopiero w kwietniu 1943, podczas powstania.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Które elementy tekstu wskazują, że jest to literatura faktu?",
      content: {
        options: [
          "Bohaterowie to postacie historyczne — Edelman, Anielewicz, Czerniaków",
          "Autorka prowadzi dialog z rozmówcą, cytuje jego wypowiedzi",
          "Podane są konkretne daty, miejsca, nazwiska i liczby",
          "Tekst zawiera fikcyjne sceny batalistyczne wymyślone przez autorkę",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Postacie historyczne, dialog z rozmówcą i konkretne dane to cechy literatury faktu. W reportażu NIE ma fikcyjnych scen batalistycznych — wszystko opiera się na relacjach świadków.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: 'Co oznacza tytuł reportażu "Zdążyć przed Panem Bogiem"?',
      content: {
        hints: ["osłonić płomień", "wyścig ze śmiercią", "lekarz"],
      },
      correctAnswer:
        'Tytuł odnosi się do postawy Edelmana wobec śmierci — zarówno w getcie, jak i w pracy lekarza. "Pan Bóg już chce zgasić świeczkę, a ja muszę szybko osłonić płomień, wykorzystując Jego chwilową nieuwagę" — mówi Edelman. "Zdążyć" oznacza: uratować życie (pacjenta, człowieka w getcie) zanim Bóg (los, śmierć) zdąży je odebrać. To symboliczny wyścig lekarza/powstańca ze śmiercią — próba odroczenia wyroku, choćby o kilka lat czy miesięcy.',
      metadata: {
        explanation:
          "Tytuł jest jednym z najczęściej analizowanych na maturze. Kluczowe: tytuł łączy oba plany narracji — wojenny (ratowanie ludzi w getcie) i powojenny (ratowanie pacjentów kardiologicznych).",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Jak Edelman opisuje cel powstania w getcie?",
      content: {},
      correctAnswer:
        'Edelman mówi, że powstanie nie było walką o zwycięstwo ani o przetrwanie. Chodziło o wybór sposobu umierania: "Chodziło przecież o to, żeby się nie dać zarżnąć, kiedy po nas z kolei przyszli. Chodziło tylko o wybór sposobu umierania." Ludzkość umówiła się, że śmierć z bronią w ręku jest godniejsza niż bez broni — więc się "podporządkowali tej umowie". Edelman kwestionuje też, czy 220 ludzi w ogóle można nazwać powstaniem.',
      metadata: {
        explanation:
          '"Wybór sposobu umierania" to kluczowe sformułowanie reportażu. Na maturze pojawia się w pytaniach o godność, bohaterstwo i sens walki w sytuacji beznadziejnej.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Wymień trzech pacjentów kardiologicznych, których historie opisane są w reportażu.",
      content: {},
      correctAnswer:
        '1) Pan Rudny — majster od maszyn pasmanteryjnych, któremu przeszczepiono żyłę z nogi do serca w stanie ostrym (pierwsza taka operacja). 2) Pani Bubnerowa — producentka długopisów, której odwrócono krwiobieg (innowacyjna metoda Profesora). Jej mąż "miał bardzo dobre stosunki z Panem Bogiem". 3) Pan Rzewuski — prezes Automobilklubu, inteligent z zawałem, którego Profesor długo wahał się operować.',
      metadata: {
        explanation:
          "Historie pacjentów stanowią drugą oś narracji. Każdy z nich pod kroplówką myśli o tym, co najważniejsze: Rudny o maszynach, Bubnerowa o długopisach, Wilczkowski (alpinista) o górach.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Dlaczego Edelman ma pretensje do Czerniakowa o jego samobójstwo?",
      content: {
        options: [
          "Bo Czerniaków był tchórzem i uciekł od odpowiedzialności",
          "Bo uczynił swoją śmierć prywatną sprawą — powinien był umrzeć publicznie, wzywając ludzi do walki, zanim odszedł",
          "Bo Czerniaków zostawił testament, w którym skrytykował ŻOB",
          "Bo Czerniaków mógł jeszcze uciec z getta i ratować się",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman mówi: "Należało umrzeć z fajerwerkiem. Wtedy fajerwerk był bardzo potrzebny." Czerniaków, jako jedyny, mógł powiedzieć prawdę ludziom i zostałby uwierzony. Zamiast tego zrobił ze śmierci "prywatną sprawę", zabijając się w milczeniu. Pretensja nie dotyczy tchórzostwa, lecz zmarnowanej szansy na publiczne wezwanie do oporu.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Co zrobił Michał Klepfisz podczas powstania?",
      content: {
        options: [
          "Wysadził bramę getta, zabijając stu Niemców",
          "Zasłonił sobą karabin maszynowy na strychu, żeby inni mogli się przedrzeć — zginął",
          "Wyprowadził grupę kanałami na stronę aryjską",
          "Strzelił do trzech niemieckich parlamentariuszy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Michał Klepfisz — inżynier, lat dwadzieścia kilka — na strychu fabryki szczotek zasłonił sobą niemiecki karabin maszynowy. Został pośmiertnie odznaczony Krzyżem Virtuti Militari przez gen. Sikorskiego. Uczył się wcześniej posługiwania bronią u "Szyny" z AK.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: 'Co to były "numerki na życie"?',
      content: {
        options: [
          "Numery obozowe tatuowane na przedramionach",
          "Białe kartki z pieczątką Gminy — ich posiadacze mieli zostać w getcie, reszta szła na Umschlagplatz",
          "Numery nadawane pacjentom w szpitalu gettowym",
          "Legitymacje członków ŻOB",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Niemcy dali Gminie 40 000 numerków — białych kartek z pieczątką. Kto miał numerek, zostawał; reszta jechała na Umschlagplatz. Edelman opisuje tragiczne wybory: naczelna lekarka Braude-Hellerowa musiała decydować, komu dać numerek — "Czy jest taka miara, według której można rozstrzygnąć, kto ma prawo żyć?"',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Dlaczego ludzie dobrowolnie szli do wagonów po chleb?",
      content: {
        options: [
          "Bo nie wiedzieli, dokąd jadą — myśleli, że na roboty",
          "Bo w getcie panował taki głód, że chleb był ważniejszy niż życie — trzy kilo chleba i marmoladę dawano każdemu, kto się zgłosił",
          "Bo obiecano im powrót po trzech dniach",
          "Bo policja żydowska zmuszała ich siłą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman mówi: "jak nie wiesz, czym był chleb w getcie, to nigdy nie zrozumiesz". Niemcy ogłosili, że dają trzy kilo chleba i marmoladę każdemu, kto zgłosi się na roboty. Ludzie szli, "porządnie, czwórkami" — chętnych było tylu, że musieli stać w kolejce. Nie chcieli wierzyć, że jadą na śmierć: "Posłano by nas na śmierć z chlebem? Tyle chleba zmarnowaliby?!"',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Dlaczego Edelman milczał przez trzydzieści lat po wojnie?",
      content: {
        options: [
          "Bo był aresztowany i nie mógł się kontaktować z prasą",
          'Bo po pierwszym raporcie uznano, że "nie mówi tak, jak należy mówić" — bez nienawiści, patosu i krzyku — więc "nie nadawał się na bohatera"',
          "Bo zapomniał wydarzenia z getta",
          "Bo Hanna Krall odmówiła mu wywiadu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Po wyjściu z getta Edelman złożył raport przedstawicielom partii. Ci patrzyli na siebie w milczeniu i uznali: "to nie jest normalny człowiek. To jest strzęp człowieka" — bo mówił spokojnie, bez patosu. "Nie nadawał się na bohatera, bo nie było w nim patosu." Zrozumiawszy to, "taktownie zamilkł" na 30 lat.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Jaką funkcję pełnił Edelman na Umschlagplatzu?",
      content: {
        options: [
          "Był lekarzem szpitala na placu",
          "Stał przy bramie jako goniec szpitalny i wyprowadzał chorych — w rzeczywistości ratował wskazane osoby",
          "Liczył deportowanych, jak zastępca komendanta Umschlagplatzu",
          "Organizował ucieczki tunelami pod placem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman, jako goniec szpitala, miał przepustkę. Stał przy bramie na Umschlagplatzu i wyprowadzał "chorych" — w rzeczywistości ratował ludzi wskazanych przez organizację. Robił to codziennie przez sześć tygodni akcji likwidacyjnej. Jak mówi: "Odprowadziłem czterysta tysięcy ludzi na ten plac".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Co Edelman mówi o śmierci w komorze gazowej w porównaniu ze śmiercią w walce?",
      content: {
        options: [
          "Że śmierć w komorze jest godniejsza, bo cichsza",
          "Że śmierć w komorze gazowej nie jest gorsza od śmierci w walce — niegodna śmierć jest tylko wtedy, kiedy się próbowało przeżyć cudzym kosztem",
          "Że śmierć w walce jest jedyną godną śmiercią",
          "Że obie śmierci są bez znaczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman mówi: "Śmierć w komorze gazowej nie jest gorsza od śmierci w walce i niegodna śmierć jest tylko wtedy, kiedy się próbowało przeżyć cudzym kosztem." Broni godności tych, którzy szli spokojnie do wagonów: "ci ludzie szli spokojnie i godnie. To jest straszna rzecz, kiedy się idzie tak spokojnie na śmierć. To jest znacznie trudniejsze od strzelania."',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Kto to był Jurek Wilner?",
      content: {
        options: [
          "Niemiecki oficer prowadzący likwidację getta",
          "Przedstawiciel ŻOB po aryjskiej stronie, blondyn z niebieskimi oczami, torturowany przez gestapo — dał sygnał do samobójstwa w bunkrze na Miłej 18",
          "Lekarz naczelny szpitala w getcie",
          "Przewodnik wyprowadzający ludzi z kanałów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Jurek Wilner (Arie Wilner) był przedstawicielem ŻOB po stronie aryjskiej. Kontaktował się z AK i "Wacławem". Aresztowany przez gestapo, torturowany, nie wydał nikogo. Wrócił do getta mimo możliwości ukrycia się. 8 maja 1943 dał sygnał do samobójstwa w bunkrze na Miłej 18.',
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Które motywy przewijają się przez cały reportaż?",
      content: {
        options: [
          "Wyścig ze śmiercią — zarówno w getcie, jak i w szpitalu kardiologicznym",
          "Piękna śmierć vs. nieestetyczna śmierć — kontrast między bohaterstwem a cierpieniem",
          "Podróże Edelmana po świecie i jego przygody turystyczne",
          "Problem pamięci — jak opowiadać o Zagładzie i jak dobierać słowa",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Trzy główne motywy: 1) wyścig ze śmiercią (getto i szpital), 2) piękna vs. nieestetyczna śmierć (strzelanie vs. komora gazowa, Krahelska vs. ludzie z getta), 3) problem pamięci i opowiadania (ryby Anielewicza, "dobieranie słów", milczenie Edelmana). Podróże turystyczne NIE są motywem.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Które z poniższych scen dotyczą tragicznych wyborów moralnych w getcie?",
      content: {
        options: [
          "Lekarka Braude-Hellerowa musi decydować, komu dać numerek na życie",
          "Pielęgniarka dusi noworodka poduszką, bo na dole już wygarniają ludzi",
          "Edelman odmawia prostytukom wyjścia z getta kanałami",
          "Profesor Moll decyduje się operować Rzewuskiego w stanie zawału",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Hellerowa (numerki), pielęgniarka (noworodek) i odmowa prostytukom — to tragiczne wybory wojenne. Operacja Rzewuskiego to wybór powojenny (choć też dramatyczny), nie dotyczy getta.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Edelman stał przy bramie Umschlagplatzu przez (1). Powstańców w ŻOB było (2). Anielewicz zginął (3).",
        gaps: [
          {
            id: 1,
            options: ["jeden dzień", "sześć tygodni", "cały rok", "trzy dni"],
          },
          {
            id: 2,
            options: ["sto", "dwustu dwudziestu", "pięciuset", "tysiąc"],
          },
          {
            id: 3,
            options: [
              "w walce na barykadzie",
              "popełniając samobójstwo w bunkrze na Miłej 18",
              "podczas ucieczki kanałami",
              "rozstrzelany przez Niemców na Umschlagplatzu",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Edelman stał przy bramie sześć tygodni (22 VII – 8 IX 1942). Powstańców było 220. Anielewicz popełnił samobójstwo 8 maja 1943 w bunkrze na Miłej 18 — zastrzelił najpierw Mirę, potem siebie.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Które stwierdzenia o postawie Edelmana wobec heroizmu są prawdziwe?",
      content: {
        options: [
          "Odmawia gloryfikacji powstania — mówi bez patosu, rzeczowo",
          'Uważa, że samobójstwo 80 bojowców na Miłej 18 było błędem: "Nie poświęca się życia dla symboli"',
          "Broni godności tych, którzy szli do wagonów bez walki",
          "Uważa, że tylko śmierć z bronią w ręku jest godna",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Edelman mówi bez patosu, krytykuje samobójstwo na Miłej i broni godności ofiar. NIE uważa, że tylko śmierć z bronią jest godna — wprost przeciwnie: mówi, że spokojne pójście na śmierć jest "znacznie trudniejsze od strzelania".',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Które elementy łączą plan wojenny i powojenny w reportażu?",
      content: {
        options: [
          "Wyścig ze śmiercią — w getcie i przy stole operacyjnym",
          "Decyzje o życiu i śmierci — numerki na życie i decyzja o operacji",
          "Stanie przy bramie — Umschlagplatz i brama szpitala",
          "Obie narracje dotyczą wydarzeń w Łodzi",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Edelman sam łączy oba plany: "stałem pod palmą — i widziałem sale, na których leżeli moi pacjenci (...) właściwie to jest to samo zadanie, co tam. Na Umschlagplatzu". Obie narracje NIE dotyczą Łodzi — getto było w Warszawie, szpital w Łodzi.',
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (7) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Opisz krótko scenę z trzema niemieckimi parlamentariuszami z białymi kokardami.",
      content: {},
      correctAnswer:
        'Pod wieczór pierwszego dnia powstania Niemcy wysłali trzech oficerów SS z opuszczonymi automatami i białą kokardą — proponowali zawieszenie broni i odesłanie powstańców do obozu. Edelman kazał Zygmuntowi strzelać. Zygmunt strzelił z jedynego karabinu, ale chybił. W raportach Stroopa opisano to jako barbarzyństwo: "bandyci otwierają ogień do parlamentariuszy". Edelman nie odczuwał zakłopotania — trzej Niemcy "to byli dokładnie ci sami, co wywieźli do Treblinki czterysta tysięcy ludzi".',
      metadata: {
        explanation:
          'Scena parlamentariuszy jest jedną z najczęściej analizowanych. Ważne: Edelman odrzuca zasady "fair play" wobec ludzi odpowiedzialnych za Zagładę. Porównaj z opisem w powieści Herseya "The Wall".',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Kim była Pola Lifszyc i dlaczego jej historia jest ważna?",
      content: {},
      correctAnswer:
        'Pola Lifszyc to młoda kobieta, którą Edelman wyprowadził z Umschlagplatzu. Nazajutrz Pola wróciła do domu i odkryła, że jej matkę pędzą na plac. Pobiegła za kolumną (narzeczony podwiózł ją rikszą), dogoniła ją i dobrowolnie weszła do wagonu razem z matką. Edelman porównuje ją z Korczakiem: "O Korczaku wiedzą wszyscy (...) A Pola Lifszyc — która poszła ze swoją matką? Kto wie o Poli Lifszyc!" Historia Poli ilustruje cichą godność ludzi idących na śmierć — bez broni, bez patosu.',
      metadata: {
        explanation:
          "Historia Poli Lifszyc to kluczowy argument Edelmana za godnością ofiar. Na maturze: kontrast między sławnym bohatertwem Korczaka a anonimową odwagą Poli.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: 'Co Edelman mówi o "beczce" i dlaczego to ważny motyw?',
      content: {
        hints: ["Żyd na beczce", "nożyce", "broda", "śmiech"],
      },
      correctAnswer:
        'Edelman opowiada o scenie na ulicy Żelaznej: stary Żyd stał na drewnianej beczce, a dwóch Niemców obcinało mu brodę krawieckimi nożycami, śmiejąc się. Tłum też się śmiał — "bo obiektywnie było to naprawdę śmieszne". Edelman mówi: "Wtedy zrozumiałem, że najważniejsze ze wszystkiego jest nie dać wepchnąć się na beczkę. Nigdy, przez nikogo. Wszystko, co robiłem potem — robiłem dlatego, żeby nie dać się wepchnąć." Beczka to metafora upokorzenia, odebrania godności — i motywacja dla całego życia Edelmana.',
      metadata: {
        explanation:
          '"Beczka" to kluczowa metafora reportażu. Na maturze: nie dać się wepchnąć na beczkę = zachować godność = główne przesłanie postawy Edelmana.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Jak zginął Anielewicz?",
      content: {},
      correctAnswer:
        '8 maja 1943 roku, w bunkrze na Miłej 18, Anielewicz zastrzelił najpierw swoją dziewczynę Mirę, potem siebie. Jurek Wilner krzyknął: "Zgińmy razem". Lutek Rotblat zastrzelił matkę i siostrę. Potem wszyscy zaczęli strzelać — 80 osób popełniło samobójstwo. Edelman nie aprobuje tego: "Tego nie należało robić. Nie poświęca się życia dla symboli." Dzień wcześniej Anielewicz był u Edelmana na Franciszkańskiej, był spokojny, spał.',
      metadata: {
        explanation:
          "Scena na Miłej 18 to jeden z najwstrząśniejszych momentów reportażu. Kluczowe: Edelman jest krytyczny wobec zbiorowego samobójstwa — odróżnia walkę od symbolu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        'Co to znaczy "piękna śmierć" i "nieestetyczna śmierć" w kontekście reportażu?',
      content: {},
      correctAnswer:
        'Edelman przeciwstawia dwa sposoby umierania: "piękna śmierć" — to śmierć Krystyny Krahelskiej (jasne włosy, wiersze, bieg w słońcu wśród słoneczników w powstaniu warszawskim) — heroiczna, efektowna, w przestrzeni i świetle. "Nieestetyczna śmierć" — to śmierć ludzi w getcie: w ciemnościach, z głodu, w piwnicach, brudnych, szarych. Edelman mówi: "Czarni i brzydcy żyją i umierają nieefektownie: w strachu i ciemności". Kontrast ten jest kluczowy: "Wszystko, co nastąpiło dziewiętnastego kwietnia 1943 roku — było przecież tęsknotą za pięknym umieraniem."',
      metadata: {
        explanation:
          'Opozycja piękna/nieestetyczna śmierć to jeden z centralnych motywów. Na maturze: Edelman nie wartościuje — broni godności "nieestetycznej" śmierci.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Jak wyglądało wyjście z getta kanałami?",
      content: {},
      correctAnswer:
        '10 maja 1943 roku, po 20 dniach walk, pozostali bojowcy ŻOB weszli do kanałów. Przewodników dał Jóźwiak ("Witold") z AL. Czekali pod klapą na Prostej noc, dzień i jeszcze noc. Dusili się od metanu i fekaliów. Gdy klapa się otworzyła, Krzaczek krzyknął: "Wychodzić!". Brakowało 8 ludzi — Edelman kazał im odejść do szerszego kanału, a potem wysłał Szlamka Szustera, by ich zawołał. Na górze czekał samochód. Wychodzili "w oślepiające, majowe światło" — czarni, brudni, z bronią. Tłum stał w milczeniu.',
      metadata: {
        explanation:
          'Wyjście kanałami to jedna z najbardziej dramatycznych scen. Ważne: Celina wyciągnęła rewolwer i krzyczała "Czekać!", ale ciężarówka ruszyła bez 8 ludzi. Kazik (19 lat) zorganizował operację.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: 'Kim był "Wacław" i jaką rolę odegrał?',
      content: {},
      correctAnswer:
        '"Wacław" — Henryk Woliński — mecenas, kierownik referatu żydowskiego w Głównej Komendzie AK. Pośredniczył między ŻOB-em a Armią Krajową: przekazał deklarację o utworzeniu ŻOB, rozkazy gen. Grota-Roweckiego, organizował dostawy broni. Pisał meldunki i raporty o Zagładzie, które jako mikrofilmy trafiały przez Londyn do świata. Dzięki niemu świat dowiedział się o Umschlagplatzu, Treblince i komorach gazowych. BBC początkowo nie wierzyło i milczało przez miesiąc.',
      metadata: {
        explanation:
          '"Wacław" to postać kluczowa dla zrozumienia kontekstu historycznego. Na maturze: rola pośredników między gettem a światem, problem niewiary świata w Zagładę.',
      },
    },

    // ===== DIFFICULTY 2 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Napisz krótką notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Dwuplanowość narracji w "Zdążyć przed Panem Bogiem" — jak Krall łączy plan wojenny z powojennym?',
        requirements: [
          "Opisz dwie osie narracji: getto i szpital kardiologiczny",
          "Wskaż elementy łączące oba plany (wyścig ze śmiercią, decyzje, brama)",
          "100-120 słów",
        ],
        wordLimit: { min: 100, max: 120 },
      },
      correctAnswer:
        'Notatka powinna: Plan wojenny: Umschlagplatz, powstanie w getcie, deportacje, samobójstwo na Miłej 18, wyjście kanałami. Plan powojenny: operacje kardiochirurgiczne Profesora Molla — Rudny (bajpas w stanie ostrym), Bubnerowa (odwrócenie krwiobiegu), Rzewuski (zawał). Elementy łączące: 1) Wyścig ze śmiercią — w getcie ratuje ludzi spod wagonu, w szpitalu "osłania świeczkę". 2) Decyzje o życiu i śmierci — numerki (kto żyje?) / operować czy nie? 3) Metafora bramy — stoi przy bramie Umschlagplatzu i pod palmą w klinice, patrząc na skazanych. 4) Odpowiedzialność — "jako lekarz mogę nadal odpowiadać za życie".',
      metadata: {
        explanation:
          "Dwuplanowość to główna cecha kompozycyjna reportażu. Na maturze: pytania o paralelizm wojenno-lekarski i sens tytułu.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (7) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Dlaczego Edelman irytuje się, gdy próbuje się zawyżać liczbę powstańców?",
      content: {
        options: [
          "Bo chce przypisać sobie większe zasługi — im mniej ludzi, tym większe jego bohaterstwo",
          'Bo zawyżanie liczby fałszuje prawdę i mitologizuje wydarzenie — a Edelmanowi zależy na prawdzie, nawet niewygodnej; mówi: "to już jest bez znaczenia"',
          "Bo nie pamięta dokładnej liczby i nie chce zgadywać",
          "Bo Antek jest jego wrogiem i celowo kłamie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman konsekwentnie odmawia mitologizacji. Gdy Antek chce poprawić liczbę na 500-600, Edelman odpowiada ze złością: "Czy wy wszyscy naprawdę nie możecie zrozumieć, że to już jest bez znaczenia?!" To postawa antyheroiczna — ważna jest prawda, nie legenda. To samo dotyczy sztandarów (nie widział żadnych) i czasu tortur Wilnera (tydzień, nie miesiąc).',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: 'Na czym polega problem "dobierania słów" w reportażu?',
      content: {
        options: [
          "Krall nie umie pisać po polsku i potrzebuje korektora",
          'Opowieść o Zagładzie traci autentyczność w przekładzie — np. Anielewicz z "peinture rouge" we francuskim L\'Express przestaje być "tamtym" Anielewiczem, a babcia prosząca o "porkchop" zamiast kotlet przestaje wzruszać',
          "Edelman mówi zbyt szybko i Krall nie nadąża z notowaniem",
          "Cenzura PRL-u wymaga starannego dobierania słów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Krall pokazuje, jak język filtruje doświadczenie: Anielewicz farbujący skrzela ryb to autentyczny człowiek — ale Anielewicz z "peinture rouge" w L\'Express to już ktoś inny. Babcia prosząca o "porkchop" zamiast "kotlet" przestaje być umierającą babcią. Problem: jak opowiadać o Zagładzie, by nie stracić prawdy?',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Dlaczego Edelman porównuje swoją pracę lekarza do stania przy bramie Umschlagplatzu?",
      content: {
        options: [
          "Bo w szpitalu też stoi przy drzwiach i nie wpuszcza ludzi",
          "Bo w obu przypadkach stoi na granicy życia i śmierci — ratuje jednostki z tłumu skazanych, wiedząc, że większości nie uratuje",
          "Bo szpital mieści się w tym samym budynku co dawny Umschlagplatz",
          "Bo jego pacjenci to ocaleni z getta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman mówi: "W klinice (...) stawałem pod palmą — i widziałem sale, na których leżeli moi pacjenci (...) Moje zadanie polegało na tym, żeby możliwie najwięcej spośród nich ocalić — i uprzytomniłem sobie, że właściwie to jest to samo zadanie, co tam. Na Umschlagplatzu. Wtedy też stałem przy bramie i wyciągałem jednostki z tłumu skazanych."',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Jaka jest rola Hanny Krall jako narratorki w reportażu?",
      content: {
        options: [
          "Jest biernym stenografem — zapisuje słowa Edelmana bez ingerencji",
          "Prowokuje rozmówcę pytaniami, komentuje, organizuje narrację — jest aktywną współtwórczynią tekstu, choć stara się nie komentować wprost",
          "Pisze fikcyjne opowiadania inspirowane rozmową z Edelmanem",
          "Występuje wyłącznie w trzeciej osobie, nigdy się nie ujawniając",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Krall nie jest biernym odbiorcą: zadaje prowokacyjne pytania ("Czy nie dlatego decydujesz się łatwo, bo jesteś oswojony ze śmiercią?"), organizuje fragmentaryczną narrację, zestawia plany wojenny i powojenny, wprowadza postacie drugoplanowe. Jednocześnie stara się oddać głos Edelmanowi — dwóch narratorów zwraca się do siebie per "ty".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Jakie znaczenie ma motyw żółtych kwiatów w reportażu?",
      content: {
        options: [
          "Kwiaty symbolizują wiosnę i nadzieję na nowe życie",
          'Co roku w rocznicę powstania anonimowy nadawca przysyła Edelmanowi żółte kwiaty — to gest pamięci, którego Edelman sam nazywa "tandetną literaturą", ale który go wzrusza',
          "Żółte kwiaty to tradycyjny symbol żydowskiej żałoby",
          "Kwiaty rosną na grobach na cmentarzu żydowskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Edelman dostawał anonimowe żółte kwiaty co roku w rocznicę powstania — 32 bukiety (oprócz 1968 roku). Sam nazywa to "tandetną literaturą" i "kiczowatą historią" — co jest typowe dla jego antyheroicznej postawy. Ale kwiaty dalej przychodzą i dalej go wzruszają.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Na czym polega fragmentaryczność kompozycji reportażu?",
      content: {
        options: [
          "Reportaż składa się z niezależnych opowiadań, niemających ze sobą związku",
          "Narracja jest niechronologiczna — przeskakuje między gettem a szpitalem, między rozmową a relacją odautorską, między postaciami, bez linearnego porządku",
          "Tekst jest niedokończony — Krall nie zdążyła go ukończyć",
          "Każdy rozdział opisuje jeden dzień powstania w kolejności chronologicznej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Reportaż ma 15 części, z których tylko 5 to czysty wywiad. Reszta to relacje odautorskie, portrety postaci drugoplanowych, retrospekcje. Narracja skacze: od getta do szpitala, od 1943 do lat 70., od Edelmana do Grabowskiego czy Wolińskiego. Fragmentaryczność oddaje sposób myślenia i pamiętania Edelmana.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Dlaczego Edelman nie chce kręcić filmu z Wajdą?",
      content: {
        options: [
          "Bo nie lubi kina i uważa je za rozrywkę",
          'Bo mówi, że "mógł to wszystko opowiedzieć jeden raz i już opowiedział" — nie chce powtarzać i inscenizować tego, co było prawdą',
          "Bo Wajda chce zmienić fakty i dodać fikcyjnych bohaterów",
          "Bo boi się, że film zaszkodzi jego karierze lekarskiej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wajda chciał, by Edelman opowiadał do kamery w miejscach, gdzie działy się wydarzenia. Edelman odmówił: opowiedział raz (Krall) i nie zamierza powtarzać. To konsekwencja jego postawy: antypatos, niechęć do inscenizacji, przekonanie, że powtarzanie osłabia prawdę.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Które z poniższych stwierdzeń o antyheroicznej postawie Edelmana są prawdziwe?",
      content: {
        options: [
          "Odmawia zawyżania liczby powstańców — trzyma się 220, nie 500",
          "Mówi, że nie widział sztandarów nad gettem — choć wszyscy twierdzą, że były",
          'Opowiada o matce Anielewicza farbującej skrzela ryb — co oburza ludzi pragnących "wielkości"',
          "Gloryfikuje samobójstwo na Miłej 18 jako najpiękniejszą scenę powstania",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Edelman odmawia mitologizacji: 220 (nie 500), nie widział sztandarów, opowiada o rybach Anielewicza. NIE gloryfikuje samobójstwa na Miłej — mówi wprost: "Tego nie należało robić. Nie poświęca się życia dla symboli."',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Które argumenty używa Edelman, broniąc godności ofiar Zagłady?",
      content: {
        options: [
          '"Ci ludzie szli spokojnie i godnie. To jest znacznie trudniejsze od strzelania"',
          '"Śmierć w komorze gazowej nie jest gorsza od śmierci w walce"',
          '"Niegodna śmierć jest tylko wtedy, kiedy się próbowało przeżyć cudzym kosztem"',
          '"Szliście jak barany na śmierć" — zgadza się z amerykańskim profesorem',
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Edelman broni godności ofiar trzema argumentami. NIE zgadza się z profesorem — wprost przeciwnie, jest wściekły na stwierdzenie "szliście jak barany". Krzyczy, że profesor, "który przebiegł plażę", nie ma prawa tak mówić o ludziach idących do komór.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Które sceny z reportażu ilustrują motyw tragicznych wyborów lekarskich po wojnie?",
      content: {
        options: [
          "Profesor siedzi sam w gabinecie przed operacją Rzewuskiego, a za drzwiami czeka Edelman — ucieczka jest niemożliwa",
          "Edelman dzwoni do Profesora kolejny raz: kolejny pacjent z zawałem przedniej ściany umrze bez operacji",
          "Profesor próbuje uciec ze szpitala przed operacją Rudnego — ale wraca tego samego dnia",
          'Doktor Zadrożna pyta "No wiesz? W waszej sytuacji?" — sugerując, że nieudana operacja pogorszyłaby ich sytuację zawodową',
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          'Wszystkie cztery sceny ilustrują dramatyzm wyborów lekarskich. Profesor boi się oskarżenia "ON EKSPERYMENTUJE NA CZŁOWIEKU", ale wie, że bez operacji pacjent umrze. Edelman naciska, Profesor w końcu mówi: "Dobrze. Spróbujemy."',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Edelman mówi, że powstanie nie było walką o zwycięstwo, lecz o (1). Matka Anielewicza sprzedawała (2) na Solcu. Edelman opisuje swoją powojenną pracę jako ciąg dalszy stania przy (3).",
        gaps: [
          {
            id: 1,
            options: [
              "wolność narodu",
              "wybór sposobu umierania",
              "ocalenie getta",
              "zemstę na Niemcach",
            ],
          },
          {
            id: 2,
            options: [
              "chleb i pieczywo",
              "ryby — a gdy zostawały, kazała synowi farbować skrzela na czerwono",
              "kwiaty na targu",
              "ubrania na pchlim targu",
            ],
          },
          {
            id: 3,
            options: [
              "murze getta",
              "bramie Umschlagplatzu — wyciąganie jednostek z tłumu skazanych",
              "oknie szpitala",
              "pomniku bohaterów",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          '"Wybór sposobu umierania" — kluczowa formuła. Ryby ze skrzelami na czerwono — szczegół, który oburzył czytelników. Brama Umschlagplatzu = brama szpitala — Edelman sam łączy te doświadczenia.',
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (7) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        'Dlaczego Edelman mówi: "kiedy się dobrze zna śmierć, ma się większą odpowiedzialność za życie"?',
      content: {},
      correctAnswer:
        'Edelman odpowiada na pytanie Krall, czy jego łatwość w podejmowaniu ryzykownych decyzji lekarskich wynika z "oswojenia ze śmiercią". Odpowiada: "Mam nadzieję, że nie dlatego. Tylko — kiedy się dobrze zna śmierć, ma się większą odpowiedzialność za życie. Każda, najmniejsza nawet szansa życia staje się bardzo ważna." Wiedząc, czym jest masowa śmierć (400 000 deportowanych), traktuje każde pojedyncze życie jako bezcenne. W szpitalu "szansa śmierci była za każdym razem — chodziło o stworzenie szansy życia".',
      metadata: {
        explanation:
          "To zdanie łączy oba plany reportażu. Na maturze: doświadczenie Zagłady jako źródło etyki lekarskiej — nie cynizm, lecz wzmożona odpowiedzialność.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Opisz historię Tenenbaumowej i numerków na życie. Jakie dylematy moralne ujawnia ta scena?",
      content: {},
      correctAnswer:
        'Tenenbaumowa — przełożona pielęgniarek, przyjaciółka adwokata Berensona — dostała numerek na życie, ale jej córka Deda nie dostała. Tenenbaumowa oddała córce swój numerek, mówiąc: "Potrzymaj chwilę, ja zaraz wrócę". Poszła na górę i połknęła luminal. Znaleźli ją nazajutrz jeszcze żywą. Deda przeżyła kilka miesięcy — zakochała się w chłopaku, miała "kilka naprawdę dobrych miesięcy" — ale i ona zginęła. Dylematy: 1) Kto ma prawo decydować, kto żyje? 2) Czy można ratować jednego kosztem drugiego? 3) Czy ratowanie matki, która chce umrzeć, jest etyczne?',
      metadata: {
        explanation:
          'Historia Tenenbaumowej to jeden z najdramatyczniejszych przykładów "wyboru Sofii" w reportażu. Na maturze: pytania o granice etyki w sytuacji ekstremalnej.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Na czym polega kontrast między Krystyną Krahelską a ludźmi z getta?",
      content: {
        instruction:
          'Odwołaj się do pojęć "piękna śmierć" i "nieestetyczna śmierć".',
      },
      correctAnswer:
        'Krahelska: jasne włosy, pozowała do pomnika Syreny, pisała wiersze, zginęła w powstaniu warszawskim wśród słoneczników, w słońcu. To "piękna śmierć" — estetyczna, heroiczna, w przestrzeni otwartej. Ludzie z getta: szarzy, głodni, w ciemnych piwnicach, leżący na podłodze bez ruchu, umierający z głodu lub w komorach. To "nieestetyczna śmierć" — bez światła, bez patosu, bez widowni. Edelman komentuje: "Tylko tak należy umierać. Ale tak żyją i umierają piękni i jaśni ludzie. Czarni i brzydcy żyją i umierają nieefektownie." Powstanie w getcie było "tęsknotą za pięknym umieraniem" — próbą wyrwania się z nieestetyczności.',
      metadata: {
        explanation:
          'Kontrast Krahelska vs. getto to kluczowy mechanizm kompozycyjny. Na maturze: Edelman nie wartościuje — pokazuje, że "nieestetyczna" śmierć jest równie godna.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Jaką rolę pełni historia operacji pani Bubnerowej w strukturze reportażu?",
      content: {},
      correctAnswer:
        'Pani Bubnerowa miała zawał przedniej ściany serca z blokiem prawej gałązki — stan, z którego wcześniej nikt nie przeżył (12-13 pacjentów umarło). Edelman przez rok namawiał Profesora do operacji odwrócenia krwiobiegu (innowacyjna metoda: krew tętnicza płynie żyłami). Profesor za czternastym razem zgodził się. Operacja się udała. Funkcja w strukturze: 1) Ilustruje wyścig ze śmiercią — "zdążyć przed Panem Bogiem". 2) Pokazuje mechanizm podejmowania decyzji — rok namawiania, 13 śmierci, wreszcie "Dobrze. Spróbujemy". 3) Stanowi paralelę do getta: obie historie dotyczą walki o życie wobec pozornie beznadziejnej sytuacji.',
      metadata: {
        explanation:
          "Historia Bubnerowej łączy oba plany: innowacja medyczna (odwrócenie krwiobiegu) jest odpowiednikiem desperackiego działania w getcie.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Dlaczego Edelman odmówił prostytukom wyjścia z getta kanałami?",
      content: {},
      correctAnswer:
        'Gdy Edelman schodził do kanałów jako ostatni, jedna z prostytutek z bunkra na Miłej zapytała, czy mogą wyjść na aryjską stronę. Edelman odpowiedział "nie" — i sam nie chce tłumaczyć dlaczego. Prawdopodobne powody: 1) Ograniczona liczba miejsc w ciężarówce — każdy dodatkowy człowiek narażał resztę. 2) Nie miał dla nich żadnego adresu ani kryjówki po aryjskiej stronie. 3) Musiał chronić swoich ludzi. Ta odmowa jest jednym z najtrudniejszych momentów reportażu — ilustruje tragiczny charakter wyborów: ratując jednych, skazywało się innych.',
      metadata: {
        explanation:
          'Odmowa prostytukom to scena, o której Edelman mówi niechętnie — "nie każ mi dzisiaj tłumaczyć". Na maturze: tragiczny wybór bez dobrego rozwiązania.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Jakie cechy stylu narracyjnego Edelmana oddaje reportaż?",
      content: {},
      correctAnswer:
        'Styl Edelmana: 1) Antypathos — mówi spokojnie, rzeczowo, bez emocji: "zmarnowała nam sześć naboi" (o Ruth strzelającej do siebie 7 razy). 2) Ironia i sarkazm — nazywa anonimowe kwiaty "tandetną literaturą". 3) Lapidarność — krótkie zdania, bez rozwinięć, urywane. 4) Dystans — mówi o śmierci jak o procedurze, o strzelaniu jak o technice. 5) Rzeczowość — szczegóły konkretne ("sweter z angory", "dwa rewolwery na pasach"), bez uogólnień. 6) Odmowa heroizacji — "czy to w ogóle można nazwać powstaniem?". Krall oddaje ten styl, nie komentując i nie poprawiając — co irytowało ludzi oczekujących patosu.',
      metadata: {
        explanation:
          "Styl Edelmana jest jednym z kluczowych elementów analizy na maturze. Ważne: to NIE chłód — to sposób mówienia człowieka, który widział zbyt wiele, by krzyczeć.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question:
        "Opisz historię wizyty córki zastępcy komendanta Umschlagplatzu. Jakie dylematy ujawnia ta rozmowa?",
      content: {},
      correctAnswer:
        'Kobieta z niebieskimi oczami odwiedziła Edelmana — jej ojciec był zastępcą komendanta Umschlagplatzu i został zastrzelony przez ŻOB za odmowę przekazania pieniędzy na broń. Ojciec "nie robił nic złego" — tylko stał i liczył ludzi do transportu: "jeden — dwa — trzy — tysiąc...". Pieniądze przeznaczał na ukrywanie córki po aryjskiej stronie. Kobieta pytała: "Czy w ogóle mieliście prawo wybierania dla niego śmierci?" i rozliczyła: "O dwa rewolwery wam chodziło. Albo o cztery miesiące mojego życia". Edelman wyjaśnił: po tym wyroku nikt nie odmówił pieniędzy na broń. Dylemat: rewolwer vs. życie dziecka — bezkompromisowa kalkulacja wojny.',
      metadata: {
        explanation:
          'Ta scena ilustruje najboleśniejszy dylemat: cena broni vs. cena życia. Edelman mówi: "nie prowadziliśmy takiej kalkulacji", ale kalkulacja istniała obiektywnie.',
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (3) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Antyheroiczna postawa Edelmana — jak odmawia mitologizacji powstania w getcie?",
        requirements: [
          "Podaj co najmniej trzy przykłady demitologizacji (liczba powstańców, sztandary, ryby, samobójstwo na Miłej)",
          "Wyjaśnij, dlaczego ta postawa oburzała ludzi",
          "Wskaż, czemu Edelman mimo to broni godności powstania",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Demitologizacja: 1) Upiera się przy 220 bojowcach (nie 500-600). 2) Twierdzi, że nie widział sztandarów. 3) Opowiada o matce Anielewicza farbującej ryby — szczegół "zdzierający wielkość". 4) Krytykuje samobójstwo na Miłej: "Nie poświęca się życia dla symboli". 5) Pyta: "Czy to w ogóle można nazwać powstaniem?". Oburzenie: ludzie chcieli bohaterskiej legendy — Edelman dał im "strzęp człowieka" mówiącego bez patosu i krzyku. Literat S. napisał trzy artykuły w jego obronie. Dlaczego broni godności: nie odrzuca heroizmu — odrzuca fałszywą wersję. Mówi, że spokojne pójście na śmierć jest trudniejsze od strzelania. Jego antypatos jest formą szacunku wobec prawdy.',
      metadata: {
        explanation:
          "Antyheroiczna postawa to najczęściej analizowany aspekt na maturze. Kluczowe: Edelman nie jest nihilistą — jest realistą odmawiającym kłamstwa, nawet pięknego.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Motyw tragicznych wyborów w "Zdążyć przed Panem Bogiem" — wybory wojenne i powojenne',
        requirements: [
          "Podaj co najmniej trzy przykłady tragicznych wyborów z getta (numerki, pielęgniarka, prostytutki)",
          "Podaj co najmniej jeden przykład z planu lekarskiego (operacja Bubnerowej/Rudnego)",
          "Wyjaśnij, co łączy te wybory",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Getto: 1) Numerki — Hellerowa musi decydować, kto żyje; Tenenbaumowa oddaje numerek córce i łyka luminal. 2) Pielęgniarka (19 lat) dusi noworodka poduszkami — lekarz nie mówi ani słowa, dziewczyna "sama wiedziała". 3) Prostytukom Edelman mówi "nie" przy wejściu do kanałów. 4) Frania musi odepchnąć matkę: "Mamo, no idź już". Plan lekarski: 1) Profesor przez rok odmawia operacji Bubnerowej — 13 pacjentów umiera — za czternastym razem mówi: "Spróbujemy". 2) Edelman naciska na operację Rudnego mimo podręczników zabraniających. Co łączy: w obu planach nie ma dobrych wyborów — jest tylko mniejsze zło. Decyzja o życiu jednych oznacza skazanie innych.',
      metadata: {
        explanation:
          "Motyw tragicznych wyborów to jedno z pytań jawnych na maturę 2026-2028. Kluczowe: paralelizm getto/szpital jako struktura kompozycyjna.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Zdążyć przed Panem Bogiem",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          '"Zdążyć przed Panem Bogiem" jako literatura faktu — jakie cechy gatunkowe posiada reportaż Krall?',
        requirements: [
          "Wskaż cechy literatury faktu (autentyczność, postacie historyczne, dokumenty)",
          "Opisz formę narracji (wywiad, relacja odautorska, fragmentaryczność)",
          "Wyjaśnij rolę dwóch narratorów (Krall i Edelman)",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Cechy literatury faktu: postacie historyczne (Edelman, Anielewicz, Czerniaków, Woliński), konkretne daty i miejsca (19 IV 1943, Umschlagplatz, Miłej 18), dokumenty (raporty Stroopa, depesze, wiersz Szlengela). Forma: reportaż podzielony na 15 części — 5 to wywiad, reszta to relacje odautorskie. Narracja niechronologiczna, fragmentaryczna — przeskakuje między 1942-43 a latami 70. Dwóch narratorów: Edelman (mówi per "ty" do Krall, opowiada subiektywnie, bez patosu) i Krall (zadaje pytania, organizuje materiał, wprowadza postacie drugoplanowe, komentuje reakcje czytelników). Krall stara się nie ingerować — ale sama forma wywiadu jest interpretacją: pytania prowokują, zestawienia sugerują sens.',
      metadata: {
        explanation:
          'Pytanie o gatunek i formę to jedno z pytań jawnych (nr 91). Kluczowe: "literatura faktu" nie oznacza obiektywizmu — Krall aktywnie kształtuje narrację.',
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Ile trenów liczy cykl Jana Kochanowskiego?",
      content: {
        options: [
          "Dziesięć",
          "Dziewiętnaście",
          "Dwadzieścia jeden",
          "Piętnaście",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Cykl "Trenów" Jana Kochanowskiego składa się z 19 utworów, wydanych w Krakowie w 1580 roku. Dodatkowo cykl otwiera dedykacja, a zamyka Epitafium Hannie Kochanowskiej — siostrze Urszulki, która również zmarła niedługo po niej.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: 'Komu poświęcony jest cykl "Trenów"?',
      content: {
        options: [
          "Żonie poety — Dorocie Podlodowskiej",
          "Córce poety — Urszulce Kochanowskiej",
          "Matce poety",
          "Królowi Zygmuntowi Augustowi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Treny" poświęcone są Urszulce (Orszulce) Kochanowskiej — około dwuipółletniej córce poety, która zmarła prawdopodobnie w 1578 lub 1579 roku. W dedykacji Kochanowski opisuje ją jako "wdzięczną, ucieszoną, niepospolitą dziecinę".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: 'W którym roku wydano drukiem "Treny" Kochanowskiego?',
      content: {
        options: ["1560", "1580", "1590", "1584"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Treny" ukazały się drukiem w 1580 roku w Krakowie, w drukarni Łazarzowej (Jana Januszowskiego). Kochanowski zmarł w 1584 roku, więc "Treny" to jedno z jego ostatnich wielkich dzieł.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Do jakiej epoki literackiej należy twórczość Jana Kochanowskiego?",
      content: {
        options: ["Średniowiecze", "Renesans", "Barok", "Oświecenie"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Jan Kochanowski (ok. 1530–1584) to najwybitniejszy polski poeta renesansu, nazywany ojcem poezji polskiej. Tworzył w Czarnolesie, gdzie przeniósł się po opuszczeniu dworu królewskiego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Czym jest tren jako gatunek literacki?",
      content: {
        options: [
          "Pieśnią miłosną poświęconą ukochanej osobie",
          "Utworem poetyckim o charakterze żałobnym, poświęconym wspomnieniu zmarłej osoby",
          "Krótkim utworem satyrycznym",
          "Poematem opisowym o naturze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tren (z gr. threnos — lament) to gatunek liryki funeralnej (żałobnej), ukształtowany w starożytnej Grecji. Poświęcano go tradycyjnie wybitnym osobistościom (persona gravis). Kochanowski złamał tę konwencję, poświęcając cykl dwuipółletniemu dziecku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "W którym trenie podmiot liryczny zwraca się do ubranek i przedmiotów zmarłej córki?",
      content: {
        options: ["Tren I", "Tren VII", "Tren XI", "Tren XIX"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tren VII zaczyna się od słów: "Nieszczęsne ochędóstwo, żałosne ubiory / Mojej namilszej cory!" Podmiot liryczny zwraca się do ubraneczek (letniczka, uploteczek, pasków złoconych) i wyprawki pogrzebowej dziewczynki. To jeden z najbardziej wzruszających trenów.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Kto ukazuje się poecie we śnie w Trenie XIX?",
      content: {
        options: [
          "Urszulka sama, jako anioł",
          "Zmarła matka poety, trzymająca Urszulkę na ręku",
          "Żona poety — Dorota",
          "Bóg w postaci starca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'W Trenie XIX ("albo Sen") poecie ukazuje się we śnie jego zmarła matka, niosąca na ręku małą Urszulkę. Matka przynosi pocieszenie: zapewnia, że Orszulka żyje w niebie wśród aniołów, i napomina syna, by pogodził się z losem.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Ile lat miała Urszulka w chwili śmierci?",
      content: {
        options: [
          "Niecałe dwa lata",
          "Około dwóch i pół roku (trzydzieści miesięcy)",
          "Pięć lat",
          "Siedem lat",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'W Trenie XII Kochanowski pisze: "A to w tak małym wieku sobie poczynała, / Że więcej nad trzydzieści miesięcy nie miała". Urszulka miała więc nieco ponad 30 miesięcy, czyli około dwóch i pół roku.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Która córka Kochanowskiego jest opłakiwana w Epitafium zamykającym cykl?",
      content: {
        options: [
          "Urszulka",
          "Hanna — siostra Urszulki, która zmarła niedługo po niej",
          "Dorota",
          "Katarzyna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Epitafium zamykające cykl poświęcone jest Hannie Kochanowskiej, która "za siostrą prędko pospieszyła". Śmierć dwóch córek w krótkim czasie pogłębiła tragedię poety.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: 'Gdzie mieszkał Kochanowski, gdy pisał "Treny"?',
      content: {
        options: [
          "Na dworze królewskim w Krakowie",
          "W Czarnolesie — swoim majątku ziemskim",
          "W Padwie, we Włoszech",
          "W Lublinie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Treny" powstały w tzw. okresie czarnoleskim (po 1570 roku), gdy Kochanowski osiadł w rodzinnym majątku Czarnolas. Tu pisał swe największe dzieła: Pieśni, Fraszki, Odprawę posłów greckich i Treny.',
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: 'Które z poniższych stwierdzeń o "Trenach" są prawdziwe?',
      content: {
        options: [
          "Cykl składa się z 19 trenów plus dedykacja i Epitafium Hannie",
          "Zostały wydane drukiem w 1580 roku w Krakowie",
          "Poświęcone są żonie poety, która zmarła w Czarnolesie",
          "Są przykładem liryki funeralnej (żałobnej)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '"Treny" to 19 utworów + dedykacja + Epitafium Hannie, wydane w 1580 roku. Są liryką funeralną. NIE są poświęcone żonie — żona poety, Dorota Podlodowska, przeżyła Jana Kochanowskiego.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Które cechy Urszulki opisuje Kochanowski w swoich trenach?",
      content: {
        options: [
          "Talent poetycki — śpiewała i tworzyła nowe piosenki",
          "Posłuszeństwo i pobożność — odmawiała modlitwy przed snem",
          "Umiejętność gry na lutni — koncertowała na dworze króla",
          "Radosne usposobienie — biegała po domu i rozśmieszała rodziców",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Urszulka śpiewała piosenki i tworzyła nowe (Tren VI — "Safo słowieńska"), była posłuszna i pobożna (Tren XII), rozweselała dom (Tren VIII). NIE grała na lutni na dworze — miała zaledwie 2,5 roku.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Połącz treny z ich głównymi tematami:",
      content: {
        matchingType: "trens_to_themes",
        leftColumn: [
          { id: "A", text: "Tren I" },
          { id: "B", text: "Tren VII" },
          { id: "C", text: "Tren VIII" },
          { id: "D", text: "Tren XIX" },
        ],
        rightColumn: [
          { id: "1", text: "Pustka w domu po śmierci Urszulki" },
          { id: "2", text: "Sen — matka z Urszulką przynosi pocieszenie" },
          { id: "3", text: "Wprowadzenie — wezwanie łez i żalu" },
          { id: "4", text: "Ubranka i przedmioty zmarłej córki" },
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
          'Tren I — wezwanie łez Heraklita i skarg Symonidesa. Tren VII — ubranka ("Nieszczęsne ochędóstwo"). Tren VIII — pustka w domu. Tren XIX — sen z matką i Urszulką.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: 'Które z poniższych postaci pojawiają się w "Trenach"?',
      content: {
        options: [
          "Urszulka — zmarła córka poety",
          "Matka poety — pojawia się we śnie w Trenie XIX",
          "Hanna — siostra Urszulki, wspomniana w Epitafium",
          "Mikołaj Rej — przyjaciel poety, który go pociesza",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "W Trenach pojawiają się: Urszulka (bohaterka główna), matka poety (Tren XIX), Hanna (Epitafium). Mikołaj Rej NIE pojawia się w Trenach (zmarł ok. 1569 roku, przed powstaniem cyklu).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Które gatunki należą do liryki funeralnej (żałobnej)?",
      content: {
        options: [
          "Tren (threnos)",
          "Epitafium (napis nagrobny)",
          "Elegia żałobna",
          "Sonet",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Tren, epitafium i elegia żałobna to gatunki liryki funeralnej. Sonet to gatunek liryki, ale nie jest z natury żałobny — jego tematyka jest różnorodna (miłosna, refleksyjna, patriotyczna).",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Wymień pięć części klasycznego trenu (epicedium) według antycznych reguł.",
      content: {
        hints: ["pochwała", "strata", "żal", "pocieszenie", "napomnienie"],
      },
      correctAnswer:
        "Klasyczny tren (epicedium) składał się z pięciu części: 1) laudes — pochwała zalet i cnót zmarłego, 2) iacturae demonstratio — ukazanie ogromu poniesionej straty, 3) luctus — wyrażenie żalu i bólu, 4) consolatio — pocieszenie, próba ukojenia bólu, 5) exhortatio — napomnienie, moralne wnioski. Kochanowski zachował te elementy, ale rozbił je na 19 osobnych trenów i pomieszał ich kolejność.",
      metadata: {
        explanation:
          "Znajomość budowy trenu jest kluczowa na maturze. Ważne: Kochanowski nie trzyma się sztywno kolejności — np. pochwały (laudes) pojawiają się w wielu trenach, a pocieszenie (consolatio) dopiero w Trenie XIX.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        'Na czym polegało nowatorstwo Kochanowskiego w "Trenach" wobec tradycji gatunku?',
      content: {},
      correctAnswer:
        "Nowatorstwo Kochanowskiego polegało przede wszystkim na: 1) Uczynieniu bohaterem dziecka — tradycyjnie tren poświęcano persona gravis, czyli wybitnym osobistościom (królom, bohaterom, mędrcom). Urszulka miała 2,5 roku. 2) Rozbicie jednego trenu na cykl 19 utworów — wcześniej tren był jednym utworem. 3) Uczynienie bohaterem osoby opłakującej — podmiot liryczny (ojciec-filozof) jest równie ważny jak zmarła. 4) Osobisty, autobiograficzny charakter — tren nie był pisany na zamówienie, lecz z autentycznego bólu.",
      metadata: {
        explanation:
          "Na maturze pojawia się pytanie o relację Trenów do konwencji gatunku. Kluczowe: Kochanowski łamie konwencję, poświęcając poważne dzieło dziecku i czyniąc podmiotem nie tylko zmarłą, ale i cierpiącego ojca.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jak Kochanowski nazywa Urszulkę w Trenie VI i dlaczego?",
      content: {
        hints: ["Safo", "śpiewaczka", "słowieńska"],
      },
      correctAnswer:
        'W Trenie VI Kochanowski nazywa Urszulkę "Safo słowieńską" (tj. słowiańską). Safona to starożytna grecka poetka z wyspy Lesbos, uznawana za jedną z najwybitniejszych liryczek świata antycznego. Porównanie dwuipółletniej dziewczynki do Safony jest hiperbolą wyrażającą ojcowską dumę i żal za utraconym talentem poetyckim dziecka. Urszulka tworzyła "nowe piosnki" i cały dzień śpiewała jak "lichy słowiczek w krzaku zielonym".',
      metadata: {
        explanation:
          'Porównanie do Safony to jedno z najczęściej analizowanych na maturze. Ważne: jest to hiperbola, ale też wyraz nadziei ojca, że córka odziedziczy po nim talent poetycki ("lutnia dziedzicznym prawem spaść miała").',
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Do czego porównuje Kochanowski śmierć Urszulki w Trenie V?",
      content: {
        options: [
          "Do śmierci łabędzia, który śpiewa po raz ostatni",
          "Do małej oliwki podciętej przez nieuwagę ogrodnika — upada przed matką, nie zdążywszy wyrosnąć",
          "Do burzy, która łamie najwyższe drzewa",
          "Do płomienia świecy, który gaśnie na wietrze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tren V zawiera rozbudowane porównanie homeryckie: Urszulka to "oliwka mała", która rośnie pod wysokim sadem, ale ogrodnik ją podciął i ona "mdleje zaraz" i "upada przed nogami matki ulubionej". To porównanie podkreśla kruchość, niedojrzałość i bezsilność wobec śmierci.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: 'Co oznaczają słowa "Fraszka cnota!" z Trenu XI?',
      content: {
        options: [
          "Że cnota jest najważniejszą wartością w życiu człowieka",
          "Że cnota jest niczym — bezwartościowa w obliczu cierpienia; to zwątpienie w najwyższą wartość stoicką",
          "Że fraszki literackie Kochanowskiego opisują cnotliwe życie",
          "Że cnota jest tym samym co mądrość stoicka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Fraszka cnota!" — powiedział Brutus porażony — to punkt kulminacyjny kryzysu światopoglądowego Kochanowskiego. "Fraszka" oznacza tu "drobiazg, nic". Poeta, który wcześniej w Pieśniach czcił cnotę jako najwyższą wartość, teraz ją odrzuca: w obliczu śmierci dziecka filozofia stoicka okazuje się bezużyteczna.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Z jaką filozofią Kochanowski polemizuje w Trenie IX?",
      content: {
        options: [
          "Z epikureizmem — filozofią przyjemności",
          "Ze stoicyzmem — filozofią opanowania emocji i mądrości jako drogi do szczęścia",
          "Z platonizmem — filozofią idei",
          "Z sceptycyzmem — filozofią wątpienia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tren IX to polemika ze stoicyzmem. Kochanowski atakuje Mądrość (uosobienie filozofii stoickiej), która miała czynić człowieka odpornym na cierpienie: "Kupić by cię, Mądrości, za drogie pieniądze!". Po stracie córki okazuje się, że stoickie ideały nie działają — poeta czuje się "z stopniów ostatnich zrzucony".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jaki obraz pustki tworzy Kochanowski w Trenie VIII?",
      content: {
        options: [
          "Opisuje opuszczone ulice Czarnolasu po zarazie",
          "Mówi, że dom jest pełen ludzi, ale jakby nikogo nie było — bo zabrakło jednej malucznej duszy, która była duszą domu",
          "Opisuje pusty stół, przy którym nikt nie siada",
          "Porównuje dom do opuszczonego zamku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tren VIII: "Pełno nas, a jakoby nikogo nie było: / Jedną maluczką duszą tak wiele ubyło." Urszulka była duszą domu — mówiła za wszystkich, śpiewała, biegała po kącikach, rozśmieszała rodziców. Teraz "wszytko umilkło, szczere pustki w domu".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "O czym mówi Urszulka w pożegnalnych słowach z Trenu VI?",
      content: {
        options: [
          "Prosi ojca o przebaczenie za swoje grzechy",
          'Żegna się z matką: "Już ja tobie, moja matko, służyć nie będę" — mówi o odejściu z domu i oddaniu kluczy',
          "Prosi Boga o zdrowie dla rodziców",
          "Śpiewa ostatnią piosenkę dla ojca",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ostatnie słowa Urszulki z Trenu VI: "Już ja tobie, moja matko, służyć nie będę / Ani za twym wdzięcznym stołem miejsca zasiędę; / Przyjdzie mi klucze położyć, samej precz jechać, / Domu rodziców swych miłych wiecznie zaniechać." To nawiązanie do formuły panny wychodzącej za mąż — ale tu "wyjście z domu" oznacza śmierć.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "W Trenie I Kochanowski porównuje się do słowika. Jaką rolę pełni to porównanie?",
      content: {
        options: [
          "Słowik symbolizuje radość wiosny i nadzieję na nowe życie",
          "Słowik to matka, której pisklęta porwał smok — jak Kochanowski bezsilnie walczy ze śmiercią, tak matka-słowik próżno miece się na drapieżnika",
          "Słowik to symbol poety, który śpiewa o miłości",
          "Słowik to Urszulka, która lubiła śpiewać",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'W Trenie I smok porywa "słowiczki liche" z gniazdka, a matka-słowik "szczebiece uboga, a na zbójcę coraz się miece" — próżno, bo smok (śmierć) ją samą ściga. To porównanie ilustruje bezsilność ojca wobec śmierci córki.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Co Kochanowski zarzuca Mądrości w Trenie IX?",
      content: {
        options: [
          "Że jest zbyt kosztowna i tylko bogaci mogą ją zdobyć",
          "Że obiecywała opanowanie żądz i lęków, ale w chwili prawdziwej tragedii okazała się bezużyteczna — poeta czuje się zrzucony ze stopni wiedzy",
          "Że jest sprzeczna z wiarą chrześcijańską",
          "Że prowadzi do pychy i pogardy wobec prostych ludzi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Kochanowski wykrzykuje: "Nieszczęśliwy ja człowiek, którym lata swoje / Na tym strawił, żebych był ujźrzał progi twoje!" — spędził życie dążąc do mądrości, ale teraz czuje się "z stopniów ostatnich zrzucony / I między insze, jeden z wiela, policzony" — jest taki sam jak każdy cierpiący człowiek.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Do czego Kochanowski porównuje Urszulkę w Trenie XII?",
      content: {
        options: [
          "Do kwiatu, który rozkwitł za wcześnie",
          "Do kłosa zbożowego, który ojciec musi ponownie zasiać w ziemię, grzebiąc z nim nadzieję",
          "Do gwiazdy, która zgasła na niebie",
          "Do liścia, który spadł z drzewa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tren XII: "Kłosie mój jedyny, / Jeszcześ mi się był nie zstał, a ja, twej godziny / Nie czekając, znowu cię w smutną ziemię sieję! / Ale pospołu z tobą grzebę i nadzieję". Metafora kłosa: Urszulka nie zdążyła dojrzeć, ojciec sieje ją z powrotem w ziemię (chowa w grobie), grzebiąc z nią wszelką nadzieję.',
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (5) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "W Trenie X podmiot liryczny rozważa, gdzie mogła trafić dusza Urszulki. Które miejsca wymienia?",
      content: {
        options: [
          "Niebo — między aniołki małe",
          "Raj lub Wyspy Szczęśliwe",
          "Hades — Charon wiezie ją przez jezioro i poi zdrojem niepamięci",
          "Piekło — za grzechy popełnione na ziemi",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Kochanowski wymienia: niebo ("w liczbę aniołków małych policzona"), raj, Wyspy Szczęśliwe, Hades (Charon, jezioro, cyprysowe lasy). Wymienia też czyściec ("zmazeczka na tobie") i możliwość reinkarnacji w słowika. NIE wymienia piekła — Urszulka jest niewinna.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "W Trenie V Urszulka porównana jest do (1). W Trenie VII podmiot zwraca się do (2). Tren XI zaczyna się od słów (3), które oznaczają zwątpienie w najwyższą wartość stoicką.",
        gaps: [
          {
            id: 1,
            options: [
              "małej oliwki podciętej przez ogrodnika",
              "kwiatu róży ściętego kosą",
              "ptaka, któremu obcięto skrzydła",
              "łodzi porwanej przez burzę",
            ],
          },
          {
            id: 2,
            options: [
              "żony, prosząc o pocieszenie",
              "ubranek i przedmiotów zmarłej córki",
              "matki, prosząc o pomoc",
              "Boga, żądając sprawiedliwości",
            ],
          },
          {
            id: 3,
            options: [
              '"Kupić by cię, Mądrości"',
              '"Fraszka cnota!"',
              '"Gdzieś mi się podziała?"',
              '"Nieszczęsne ochędóstwo"',
            ],
          },
        ],
      },
      correctAnswer: [0, 1, 1],
      metadata: {
        explanation:
          'Tren V: oliwka mała. Tren VII: ochędóstwo (ubranka). Tren XI: "Fraszka cnota!" — zwątpienie w cnotę. "Kupić by cię, Mądrości" to Tren IX. "Gdzieś mi się podziała?" to Tren X. "Nieszczęsne ochędóstwo" to Tren VII.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Które elementy wyprawki pogrzebowej Urszulki wymienia Kochanowski w Trenie VII?",
      content: {
        options: [
          "Giezłeczko (koszulka) i licha tkaneczka",
          "Bryłeczka ziemi, którą ojciec włożył jej w główkę",
          "Złoty medalion z portretem matki",
          "Letniczek pisany (kolorowa sukienka) i uploteczki (ozdoby do włosów)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Tren VII wymienia: letniczek pisany, uploteczki, paski złocone ("matczyne dary płone"), a jako wyprawę pogrzebową: giezłeczko (koszulkę), lichą tkaneczkę i bryłeczkę ziemi ("Ojciec ziemie bryłeczkę / W główki włożył"). Złotego medaliku NIE ma w tekście.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        'Które stwierdzenia o roli podmiotu lirycznego w "Trenach" są prawdziwe?',
      content: {
        options: [
          "Podmiot liryczny jest utożsamiany z autorem — Janem Kochanowskim",
          "Występuje zarówno jako ojciec (rozpaczający rodzic), jak i jako filozof (dokonujący rozrachunku z dotychczasowym światopoglądem)",
          "Jest jedynie obserwatorem — nie wyraża własnych uczuć",
          "W niektórych trenach (np. IX, XI) w ogóle nie mówi o zmarłej córce",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Podmiot liryczny = Kochanowski (liryka wyznania, autobiograficzna). Ma dwie role: ojciec i filozof. W Trenie IX i XI skupia się wyłącznie na problemach filozoficznych (Mądrość, cnota), nie wspominając Urszulki wprost. NIE jest obserwatorem — jego uczucia są centrum cyklu.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Polącz treny z odpowiadającymi im częściami klasycznego epicedium:",
      content: {
        matchingType: "trens_to_epicedium",
        leftColumn: [
          { id: "A", text: "Treny VI, VIII, XII — pochwała zalet Urszulki" },
          { id: "B", text: "Tren I — ogrom żalu i wezwanie do płaczu" },
          { id: "C", text: "Tren IX, XI — kryzys filozoficzny" },
          { id: "D", text: "Tren XIX — sen z matką i pocieszenie" },
        ],
        rightColumn: [
          { id: "1", text: "consolatio (pocieszenie)" },
          { id: "2", text: "laudes (pochwała zmarłego)" },
          { id: "3", text: "luctus (żal, ból)" },
          { id: "4", text: "iacturae demonstratio (ukazanie straty)" },
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
          "Treny VI, VIII, XII = laudes (pochwała). Tren I = luctus (żal). Treny IX, XI = iacturae demonstratio (ukazanie straty — tu: strata światopoglądu). Tren XIX = consolatio (pocieszenie). Uwaga: Kochanowski przemieszał te elementy — nie trzyma się kolejności.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (7) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Opisz krótko treść Trenu VII — do czego zwraca się podmiot liryczny i jaki jest nastrój utworu?",
      content: {},
      correctAnswer:
        'Podmiot liryczny zwraca się do ubranek i przedmiotów zmarłej Urszulki — letniczka pisanego, uploteczek, pasków złoconych. Mówi, że córka już ich nie założy: "Ujął ją sen żelazny, twardy, nieprzespany". Następnie zwraca się do matki ("mać uboga"), która miała poprowadzić córkę do innej łożnicy (ślubnej), a zamiast tego dała jej jedynie giezłeczko i tkaneczkę (pogrzebowe), a ojciec wsypał bryłeczkę ziemi w główkę. Kończy: "i posag, i ona / W jednej skrzynce zamkniona" — trumna stała się skrzynią posagową. Nastrój jest głęboko elegijny, pełen czułości i rozpaczy.',
      metadata: {
        explanation:
          "Tren VII to jeden z najczęściej analizowanych na maturze. Kluczowy motyw: kontrast między wyprawą ślubną (nadzieja) a wyprawą pogrzebową (rzeczywistość). Zdrobnienia (giezłeczko, tkaneczka, bryłeczka) potęgują wzruszenie.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Co podmiot liryczny mówi o Mądrości w Trenie IX?",
      content: {
        hints: ["kupić", "drogie pieniądze", "zrzucony ze stopniów"],
      },
      correctAnswer:
        'Podmiot liryczny zwraca się do Mądrości (uosobienie filozofii stoickiej) z goryczą: "Kupić by cię, Mądrości, za drogie pieniądze!" Mądrość miała: wykorzenić żądze i troski, uczynić człowieka odpornym na ból, śmierć i strach, zapewnić równowagę ducha. Ale poeta czuje się oszukany: spędził lata, by dojść do progów Mądrości, a teraz — po śmierci córki — okazał się "z stopniów ostatnich zrzucony / I między insze, jeden z wiela, policzony". Mądrość nie chroni przed cierpieniem.',
      metadata: {
        explanation:
          "Tren IX to polemika ze stoicyzmem — kluczowy moment kryzysu filozoficznego. Kochanowski, wcześniej wyznawca stoicyzmu (Pieśni), teraz go odrzuca. Na maturze: porównaj z Pieśniami, gdzie poeta chwalił cnotę i mądrość.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Jaką rolę pełni Tren X w cyklu? Jakie pytania zadaje podmiot liryczny?",
      content: {},
      correctAnswer:
        'Tren X to utwór złożony niemal wyłącznie z pytań retorycznych o los duszy Urszulki: Czy jest w niebie wśród aniołków? Czy w raju lub na Wyspach Szczęśliwych? Czy Charon wiezie ją przez Hades? Czy przemieniła się w słowika? Czy czyści się w czyśćcu? Czy wróciła tam, skąd przyszła (nicość)? Kończy dramatycznym: "Gdzieśkolwiek jest, jesliś jest" — podważając samo istnienie życia pozagrobowego. Rola: Tren X ukazuje zagubienie religijne poety, który szuka córki we wszystkich znanych mu tradycjach (chrześcijańskiej i antycznej) i w żadnej nie znajduje pewności.',
      metadata: {
        explanation:
          '"Gdzieśkolwiek jest, jesliś jest" — to jedno z najczęściej cytowanych zdań polskiej literatury. "Jesliś jest" wyraża zwątpienie w nieśmiertelność duszy. Na maturze: synkretyzm religijny — poeta łączy chrześcijaństwo z mitologią grecką.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jak Kochanowski opisuje zachowanie Urszulki w Trenie XII?",
      content: {},
      correctAnswer:
        'Tren XII to portret idealnego dziecka: Urszulka jest "ochędożna, posłuszna, karna, niepieszczona". Umie śpiewać, mówić, rymować, trafić ukłonem, znać obyczaje panieńskie. Jest roztropna, skromna, wstydliwa. Nie jedzie bez modlitwy, nie kładzie się bez pozdrowienia matki. Biegnie naprzeciw ojcu wracającemu z drogi. Uprzedza wszystkie sługi w każdej posłudze. A wszystko to "w tak małym wieku" — nie miała więcej niż trzydzieści miesięcy. Portret jest wyidealizowany — Kochanowski tworzy obraz dziecka doskonałego, by pogłębić rozmiar straty.',
      metadata: {
        explanation:
          "Tren XII to laudes (pochwała) w czystej formie. Ważne na maturze: portret jest idealizowany (hiperbolizacja cnót 2,5-latki), co służy podkreśleniu straty i jest elementem konwencji gatunkowej.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jakie pocieszenie przynosi matka poety w Trenie XIX?",
      content: {
        instruction:
          "Wymień co najmniej trzy argumenty, którymi matka uspokaja syna.",
      },
      correctAnswer:
        'Matka przynosi pocieszenie w kilku argumentach: 1) Urszulka żyje — jest w niebie wśród aniołów, świeci jak jutrzenka i modli się za rodziców. 2) Ziemskie rozkoszy są płone — pełne frasunków i cierpienia; w niebie są rozkosze wieczne i bezpieczne. 3) Urszulka uniknęła cierpień świata — bólu rodzenia, nędznego małżeństwa, sieroctwa. 4) Cierpienie jest powszechne — "Co wszystkich jednako ciśnie, nie wiem czemu / Tobie ma być, synu mój, najciężej jednemu". 5) Czas leczy — ale mądry człowiek uprzedza rozumem to, co czas goi. 6) Trzeba dziękować za to, co zostało, a nie tylko płakać za tym, co utracone.',
      metadata: {
        explanation:
          "Tren XIX to consolatio (pocieszenie) cyklu. Ważne: pocieszenie jest chrześcijańskie (nieśmiertelność duszy), ale też stoickie (powszechność cierpienia, akceptacja losu). Kochanowski odbudowuje swój światopogląd — ale zmieniony.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jak kończy się Tren I i jakie pytanie stawia poeta?",
      content: {},
      correctAnswer:
        'Tren I kończy się refleksją: "Prózno płakać — podobno drudzy rzeczecie. / Cóż, prze Bóg żywy, nie jest prózno na świecie? / Wszytko prózno! Macamy, gdzie miękcej w rzeczy, / A ono wszędy ciśnie! Błąd — wiek człowieczy!" Poeta stwierdza, że płacz jest próżny, ale wszystko na świecie jest próżne. Stawia pytanie końcowe: "Nie wiem, co lżej: czy w smutku jawnie żałować, / Czyli się z przyrodzeniem gwałtem mocować?" — czy lepiej otwarcie płakać, czy silić się na stoicki spokój?',
      metadata: {
        explanation:
          "Pytanie z końca Trenu I zapowiada cały dramat cyklu: konflikt między uczuciem (żalem) a rozumem (filozofią stoicką). Ten konflikt narasta przez kolejne treny aż do kulminacji w Trenie XI.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Co Kochanowski mówi o Niobe w Trenie IV i dlaczego przywołuje ten mit?",
      content: {},
      correctAnswer:
        'Kochanowski pisze: "Nie dziwuję Niobie, że na martwe ciała / Swoich namilszych dziatek patrząc skamieniała." Niobe to postać z mitologii greckiej, królowa, która straciła czternaścioro dzieci zabitych przez Apollona i Artemidę. Z rozpaczy zamieniła się w kamień, z którego wiecznie płyną łzy. Kochanowski przywołuje Niobe, bo teraz — jako ojciec po stracie córki — rozumie jej ból. Wcześniej mit Niobe mógł wydawać się przesadą; teraz poeta sam doświadcza czegoś porównywalnego.',
      metadata: {
        explanation:
          "Niobe pojawia się też w Trenie XV, gdzie Kochanowski rozbudowuje jej historię. Na maturze: Niobe jako topos cierpienia matki/rodzica — porównanie z podmiotem lirycznym.",
      },
    },

    // ===== DIFFICULTY 2 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Napisz krótką notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Portret Urszulki w Trenach — jak Kochanowski buduje obraz zmarłej córki?",
        requirements: [
          "Przywołaj konkretne treny i ich obrazy (VI — śpiewaczka, VII — ubranka, VIII — dusza domu, XII — cnoty)",
          "Wskaż środki stylistyczne: zdrobnienia, hiperbola, porównanie do Safony",
          "100-120 słów",
        ],
        wordLimit: { min: 100, max: 120 },
      },
      correctAnswer:
        'Notatka powinna: Portret Urszulki budowany jest z czułych szczegółów: w Trenie VI to "Safo słowieńska" i "śpiewaczka" (hiperbola — porównanie 2,5-latki do starożytnej poetki), w Trenie VII — ubranka: letniczek pisany, uploteczki, paski złocone (zdrobnienia potęgują wzruszenie), w Trenie VIII — dusza domu: "za wszytki mówiła, za wszytki śpiewała", w Trenie XII — dziecko idealne: posłuszne, karne, pobożne, roztropne. Obraz jest wyidealizowany — Kochanowski hiperbolizuje cnoty dziecka, by podkreślić ogrom straty. Zdrobnienia (giezłeczko, tkaneczka, główki, ręczynkami) nadają portretowi intymny, rodzicielski charakter.',
      metadata: {
        explanation:
          "Portret Urszulki na maturze: kluczowe pojęcia to hiperbolizacja, zdrobnienia, porównanie homeryckie (Tren V — oliwka), kontrast między dziecięcą radością a śmiercią.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (7) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        'Jaki jest sens ostatnich słów Trenu X: "Gdzieśkolwiek jest, jesliś jest"?',
      content: {
        options: [
          "Podmiot liryczny nie wie, do którego kościoła należała Urszulka",
          'Podmiot liryczny podważa samo istnienie duszy po śmierci — "jesliś jest" oznacza wątpliwość, czy Urszulka w ogóle gdzieś istnieje, czy zniknęła w nicości',
          "Podmiot liryczny zapomniał, gdzie pochowano córkę",
          "Podmiot liryczny prosi Boga o wskazanie miejsca pobytu Urszulki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Jesliś jest" to moment dramatycznego zwątpienia w nieśmiertelność duszy. Po wymienieniu wielu możliwości (niebo, raj, Hades, czyściec, reinkarnacja, nicość) poeta dochodzi do najgłębszego pytania: czy Urszulka w ogóle gdzieś istnieje? Jest to apogeum kryzysu religijnego w cyklu.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jaki światopogląd odbudowuje Kochanowski w Trenie XIX?",
      content: {
        options: [
          "Czysty stoicyzm — wraca do ideału cnoty i opanowania emocji",
          "Światopogląd zmieniony — łączy chrześcijańską wiarę w nieśmiertelność duszy z akceptacją ludzkiej kondycji (cierpienie jest powszechne), ale nie wraca do naiwnego optymizmu",
          "Ateizm — odrzuca Boga po doświadczeniu cierpienia",
          "Epikureizm — szuka pocieszenia w radościach zmysłowych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tren XIX przynosi odbudowę światopoglądu, ale zmienionego: poeta łączy chrześcijaństwo (Urszulka w niebie, Bóg jako Pan smutku i nagrody) z akceptacją ludzkiej kondycji ("Człowiek urodziwszy się zasiadł w prawie takim, / Że ma być jako celem przygodom wszelakim"). NIE wraca do naiwnego stoicyzmu — wie już, że "człowiek nie kamień".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Co oznacza kontrast między wyprawą ślubną a pogrzebową w Trenie VII?",
      content: {
        options: [
          "Kochanowski żałuje, że nie wydał córki za mąż",
          "Matka miała doprowadzić Urszulkę do łożnicy ślubnej, ale zamiast posagu i wesela dała jej giezłeczko pogrzebowe — kontrast symbolizuje niespełnione nadzieje i skrócone życie dziecka",
          "Kontrast ten dotyczy różnicy między bogatymi i biednymi pogrzebami",
          "Poeta porównuje dwa wesela — swoje i córki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Nie do takiej łożnice, moja dziewko droga, / Miała cię mać uboga / Doprowadzić!" — matka miała prowadzić córkę na ślub, ale zaprowadziła ją do grobu. Zamiast posagu — bryłeczka ziemi. Zamiast skrzyni posagowej — trumna ("i posag, i ona / W jednej skrzynce zamkniona"). Kontrast nadzieja/rzeczywistość jest głównym mechanizmem emocjonalnym Trenu VII.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Na czym polega kryzys światopoglądowy Kochanowskiego w Trenach IX-XI?",
      content: {
        options: [
          "Poeta traci wiarę w miłość i postanawia żyć samotnie",
          "Poeta kolejno odrzuca: mądrość stoicką (IX), pewność co do życia pozagrobowego (X) i cnotę jako wartość najwyższą (XI) — traci fundament swojego renesansowego światopoglądu",
          "Poeta odrzuca poezję i postanawia przestać pisać",
          "Poeta sprzeciwia się Kościołowi katolickiemu i przechodzi na protestantyzm",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Treny IX-XI to kulminacja kryzysu: IX — "Kupić by cię, Mądrości" (odrzucenie stoickiej mądrości). X — "Gdzieśkolwiek jest, jesliś jest" (zwątpienie w nieśmiertelność duszy). XI — "Fraszka cnota!" (odrzucenie cnoty — najwyższej wartości stoickiej). Poet traci fundament: mądrość, wiarę, cnotę.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jaki środek stylistyczny dominuje w Trenie X?",
      content: {
        options: [
          "Metafora rozbudowana (alegoria)",
          "Pytania retoryczne — cały utwór zbudowany jest z serii pytań bez odpowiedzi",
          "Porównanie homeryckie",
          "Epitety zdobnicze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tren X to ciąg pytań retorycznych: "Czyś ty nad wszytki nieba wysoko wniesiona?", "Czyliś do raju wzięta?", "Czy cię przez teskliwe / Charon jeziora wiezie?", "Czy, człowieka zrzuciwszy (...) Wzięłaś na się postawę i piórka słowicze?" itd. Składnia pytajna buduje napięcie i wyraża bezradność podmiotu lirycznego.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: 'Jaką rolę pełnią zdrobnienia w "Trenach"?',
      content: {
        options: [
          "Są ozdobnikami poetyckimi bez głębszego znaczenia",
          "Wyrażają czułość i miłość ojca do dziecka, podkreślają jej mały wiek i kruchość, potęgują wzruszenie czytelnika",
          "Naśladują mowę dziecięcą Urszulki",
          "Służą do wyrażenia ironii wobec śmierci",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zdrobnienia: giezłeczko, tkaneczka, bryłeczka, główki, ręczynkami, stopeczkami, członeczki, zmazeczka, dziecinki. Wyrażają czułość, podkreślają maleńkość i kruchość Urszulki, budują intymny ton i potęgują kontrast między ciepłem wspomnień a chłodem śmierci.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Dlaczego Kochanowski przywołuje Brutusa w Trenie XI?",
      content: {
        options: [
          "Bo Brutus był bohaterem renesansowym, którego Kochanowski podziwiał",
          'Bo Brutus — stoik, obrońca cnoty — przed śmiercią powiedział "Fraszka cnota!", uznając, że cnota jest bezwartościowa; Kochanowski utożsamia się z nim — sam doświadcza tego samego rozczarowania',
          "Bo Brutus zabił Cezara i Kochanowski porównuje śmierć do zabójstwa",
          "Bo Brutus był poetą żałobnym w starożytnym Rzymie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Marek Juniusz Brutus — stoik, zabójca Cezara w imię cnoty republikańskiej — miał przed samobójstwem (42 r. p.n.e.) wypowiedzieć słowa zwątpienia w cnotę. Kochanowski przywołuje go jako precedens: jeśli nawet Brutus — wzór stoika — zwątpił w cnotę, to i poeta ma do tego prawo.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (4) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Które argumenty matka poety przywołuje w Trenie XIX na pocieszenie syna?",
      content: {
        options: [
          "Urszulka uniknęła cierpień świata: bólu rodzenia, złego małżeństwa, niewoli",
          "Cierpienie jest powszechne — nie powinien cierpieć bardziej niż inni",
          "Urszulka wcale nie umarła — żyje w ukryciu i wkrótce wróci",
          "Rozum i czas leczą rany — mądry człowiek uprzedza to, co czas goi",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Matka argumentuje: 1) Urszulka uniknęła cierpień, 2) cierpienie jest powszechne, 3) czas leczy, ale mądry uprzedza go rozumem. NIE twierdzi, że Urszulka żyje w ukryciu — mówi wyraźnie, że jest w niebie.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Które elementy stoicyzmu Kochanowski odrzuca w Trenach?",
      content: {
        options: [
          "Mądrość jako drogę do szczęścia i opanowania emocji (Tren IX)",
          "Cnotę jako najwyższą wartość, chroniącą przed cierpieniem (Tren XI)",
          "Zasadę złotego środka — skromne życie nie chroni przed nieszczęściem (Tren XVII)",
          "Wiarę w nieśmiertelność duszy (Tren X)",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Kochanowski odrzuca: mądrość (IX), cnotę (XI), złoty środek (XVII: "Wiodłem swój żywot tak skromnie, / Że ledwe kto wiedział o mnie" — a mimo to dotknęło go nieszczęście). Zwątpienie w nieśmiertelność duszy (X) NIE jest elementem stoicyzmu — to zagadnienie religijne/metafizyczne.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        'Które z poniższych stwierdzeń o kompozycji "Trenów" są prawdziwe?',
      content: {
        options: [
          "Treny I-VIII to narastający żal i wspomnienia o Urszulce",
          "Treny IX-XI to kulminacja kryzysu filozoficznego i religijnego",
          "Treny XII-XVIII to stopniowe wyciszanie się i szukanie pocieszenia",
          "Cykl kończy się bez rozwiązania — poeta nie godzi się ze stratą",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Kompozycja cyklu: I-VIII — żal narasta, IX-XI — kulminacja kryzysu, XII-XVIII — wyciszanie, XIX — pocieszenie. Cykl NIE kończy się bez rozwiązania — Tren XIX przynosi consolatio (pocieszenie przez sen z matką i Urszulką).",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "W Trenie XVI Kochanowski polemizuje z (1), wyrzucając mu, że łatwo było mówić o znoszeniu przygód, gdy sam ich doświadczył. W Trenie XVIII podmiot zwraca się do (2) w tonie pokutnym. Pożegnalne słowa Urszulki w Trenie VI nawiązują do formuły (3).",
        gaps: [
          {
            id: 1,
            options: [
              "Sokratesem",
              'Cyceronem ("Arpinie wymowny")',
              "Seneka",
              "Arystotelesem",
            ],
          },
          {
            id: 2,
            options: [
              "Mądrości",
              "Boga — w tonie psalmu pokutnego",
              "zmarłej córki",
              "żony",
            ],
          },
          {
            id: 3,
            options: [
              "modlitwy wieczornej",
              "panny wychodzącej za mąż — oddającej klucze i opuszczającej dom rodziców",
              "pożegnania żołnierza przed bitwą",
              "spowiedzi przed śmiercią",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          'Tren XVI: Cyceron ("Arpinie" — z Arpinum) — Kochanowski wyrzuca mu, że łatwo mówić o filozofii, ale w praktyce sam Cyceron płakał po wygnaniu i śmierci córki Tulii. Tren XVIII: zwrot do Boga w tonie psalmicznym. Tren VI: słowa Urszulki nawiązują do formuły ślubnej — "klucze położyć, samej precz jechać".',
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (7) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        'Opisz etapy żałoby w "Trenach" — jak zmienia się stan emocjonalny podmiotu lirycznego od Trenu I do XIX?',
      content: {
        instruction:
          "Wyróżnij co najmniej cztery etapy i podaj numery odpowiadających im trenów.",
      },
      correctAnswer:
        "Etapy: 1) Rozpacz i wezwanie żalu (Treny I-IV) — poeta płacze, oskarża Śmierć, czuje bezsilność (porównanie do słowika i smoka). 2) Czuła pamięć i pochwała (Treny V-VIII) — wspomnienia o Urszulce: oliwka (V), Safo słowieńska (VI), ubranka (VII), pustka w domu (VIII). 3) Kryzys filozoficzny i religijny (Treny IX-XI) — odrzucenie mądrości (IX), zagubienie religijne (X), odrzucenie cnoty (XI — apogeum kryzysu). 4) Wyciszanie i szukanie sensu (Treny XII-XVIII) — powroty do wspomnień (XII-XIII), nawiązanie do Orfeusza (XIV), polemika z Cyceronem (XVI), psalm pokutny (XVIII). 5) Pocieszenie (Tren XIX) — sen, matka z Urszulką, odbudowa światopoglądu.",
      metadata: {
        explanation:
          "Etapy żałoby w Trenach odpowiadają współczesnym psychologicznym modelom żałoby (szok, gniew, negocjacja, depresja, akceptacja). Na maturze ważne: Kochanowski nie schodzi ze sceny rozpaczy do akceptacji liniowo — nastroje mieszają się.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Wyjaśnij, dlaczego Tren XI jest uważany za kulminację kryzysu w całym cyklu.",
      content: {},
      correctAnswer:
        'Tren XI to apogeum, bo poeta odrzuca cnotę — najwyższą wartość swojego dotychczasowego systemu: "Fraszka cnota! — powiedział Brutus porażony... / Fraszka, kto się przypatrzy, fraszka z każdej strony!" Dalej pisze, że pobożność nikogo nie ratuje, że "nieznajomy wróg jakiś miesza ludzkie rzeczy", nie rozróżniając dobrych od złych. Ludzie "wspinają się do nieba" próbując poznać boskie tajemnice, ale "wzrok śmiertelnej źrzenice / Tępy na to!" Kończy dramatycznym pytaniem: "Żałości! co mi czynisz? Owa już oboje / Mam stracić: i pociechę, i baczenie swoje?" — boi się, że traci i córkę, i rozum. To całkowite załamanie — po odrzuceniu mądrości (IX) i wiary (X) upada ostatni filar: cnota.',
      metadata: {
        explanation:
          "Tren XI = ogniwo centralne cyklu. Kluczowe: poeta traci trzy filary renesansowego humanizmu: mądrość, wiarę, cnotę. Od tego momentu zaczyna się powolna odbudowa.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Porównaj stosunek Kochanowskiego do filozofii stoickiej w Pieśniach i w Trenach.",
      content: {},
      correctAnswer:
        'W Pieśniach Kochanowski jest wyznawcą stoicyzmu: chwali cnotę, mądrość, równowagę ducha, zasadę złotego środka. Pisze np. "Nie porzucaj nadzieje" — zachęca do spokoju wobec zmiennej Fortuny. W Trenach następuje gwałtowna polemika: Tren IX atakuje Mądrość jako nieskuteczną, Tren XI odrzuca cnotę jako bezwartościową ("Fraszka cnota!"), Tren XVII poddaje w wątpliwość zasadę mierności ("Wiodłem swój żywot tak skromnie... a Pan zadał mi raz tym znaczniejszy"). Różnica: w Pieśniach stoicyzm był teorią — wygodną i piękną. W Trenach poeta konfrontuje ją z praktyką cierpienia i stwierdza, że nie działa. Tren XIX odbudowuje światopogląd — ale zmieniony: już nie naiwny stoicyzm, lecz głębsza mądrość uwzględniająca cierpienie.',
      metadata: {
        explanation:
          "Porównanie Pieśni i Trenów to klasyczne pytanie maturalne. Kluczowe: Treny nie odrzucają stoicyzmu całkowicie — odrzucają jego naiwną wersję. Tren XIX odbudowuje mądrość — ale cierpieniem przemienioną.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Dlaczego Kochanowski nawiązuje do Orfeusza w Trenie XIV?",
      content: {},
      correctAnswer:
        'Kochanowski szuka "wrót nieszczęsnych", przez które Orfeusz zstąpił do podziemia, by odzyskać Eurydykę. Chce pójść tą samą ścieżką z lutnia i łzami — jak Orfeusz zmiękczył Plutona pieśnią, tak poeta chce odzyskać córkę. Mówi: "Owa go to łzami, / To tymi żałosnymi zmiękczywa pieśniami, / Że mi moję namilszą dziewkę jeszcze wróci". Nawiązanie pełni funkcję: 1) wyraża desperację — poeta jest gotów zejść do piekieł, 2) stawia poezję jako narzędzie walki ze śmiercią, 3) kończy się rezygnacją: "Więc tamże już za jedną drogą / Zostać, a z duszą za raz zewlec troskę srogą" — skoro nie odzyska córki, wolałby sam tam zostać.',
      metadata: {
        explanation:
          "Tren XIV łączy dwa motywy: Orfeusza (mit o sile sztuki) i katábasis (zstąpienie do podziemia). Na maturze: porównanie z innymi ujęciami mitu orfejskiego.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question:
        "Jakie środki stylistyczne stosuje Kochanowski w Trenie VIII i jaką pełnią funkcję?",
      content: {},
      correctAnswer:
        'Tren VIII — środki: 1) Apostrofa: "Wielkieś mi uczyniła pustki w domu moim, / Moja droga Orszulo" — bezpośredni zwrot do zmarłej. 2) Paradoks: "Pełno nas, a jakoby nikogo nie było" — dom pełen ludzi, ale pusty. 3) Hiperbola: "Jedną maluczką duszą tak wiele ubyło" — jedno dziecko stanowiło więcej niż reszta domowników. 4) Wyliczenie: "Tyś za wszytki mówiła, za wszytki śpiewała, / Wszytkiś w domu kąciki zawżdy pobiegała" — katalog czynności Urszulki. 5) Anafora: "wszytki... wszytki..." — podkreśla wszechobecność dziecka i kontrast z jego nieobecnością. 6) Personifikacja: "Z każdego kąta żałość człowieka ujmuje" — żal staje się bytem. Funkcja: budowanie kontrastu między dawnym życiem (radość, ruch, śmiech) a obecną pustką.',
      metadata: {
        explanation:
          'Analiza środków stylistycznych Trenu VIII to częste pytanie na maturze rozszerzonej. Kluczowe: paradoks "pełno nas, a jakoby nikogo" jest kwintesencją żałoby.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Jakie znaczenie ma napis na kamieniu nagrobnym z Trenu XIII?",
      content: {},
      correctAnswer:
        'W Trenie XIII Kochanowski prosi murarzy o kamień ciosany z napisem: "Orszula Kochanowska tu leży, kochanie / Ojcowe albo raczej płacz i narzekanie. / Opakeś to, niebaczna śmierci, udziałała / Nie jać onej, ale mnie ona płakać miała." Napis ma podwójne znaczenie: 1) Urszulka to nie tylko "kochanie ojcowe", ale przede wszystkim "płacz i narzekanie" — sama stała się synomimem żalu. 2) Odwrócony porządek natury: to córka powinna kiedyś opłakiwać ojca, nie odwrotnie ("opakeś to udziałała"). Motyw inwersji porządku naturalnego — dzieci powinny przeżyć rodziców — jest jednym z głównych tematów cyklu.',
      metadata: {
        explanation:
          "Epitafium z Trenu XIII to miniaturowa forma wewnątrz trenu. Na maturze: odwrócenie naturalnego porządku (rodzice chowają dzieci zamiast odwrotnie) jako źródło buntu wobec losu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Dlaczego Kochanowski polemizuje z Cyceronem w Trenie XVI?",
      content: {},
      correctAnswer:
        'Kochanowski zwraca się do Cycerona ("Arpinie wymowny" — z Arpinum) z wyrzutem: Cyceron uczył, że mądry człowiek powinien spokojnie znosić wygnanie, śmierć bliskich i nieszczęścia. Ale sam Cyceron: płakał idąc na wygnanie z Rzymu, żałował śmierci córki Tulii i nie chciał umrzeć, gdy miał "podać głowę". Poeta konkluduje: "Wywiodłeś wszytkim, nie wywiodłeś sobie" — łatwo uczyć innych, trudniej samemu żyć według swoich nauk. Mówi: "Łacniej rzec, widzę, niż czynić i tobie" — nawet największy filozof nie jest odporny na cierpienie. To argument za tym, że "człowiek nie kamień" — nie da się wyłączyć emocji rozumem.',
      metadata: {
        explanation:
          "Polemika z Cyceronem to ważny element Trenu XVI. Na maturze: Kochanowski nie atakuje Cycerona — raczej współczuje mu i utożsamia się z nim. Obaj są filozofami, którzy nie potrafili zastosować własnych nauk w obliczu cierpienia.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (3) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Kryzys światopoglądowy Kochanowskiego w Trenach IX-XI — co odrzuca i dlaczego?",
        requirements: [
          "Opisz trzy etapy kryzysu: odrzucenie mądrości (IX), zwątpienie religijne (X), odrzucenie cnoty (XI)",
          "Wyjaśnij, dlaczego kryzys jest tak dramatyczny (kontrast z Pieśniami)",
          'Wskaż, co oznacza "Fraszka cnota!" w kontekscie filozofii renesansowej',
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Tren IX — poeta odrzuca Mądrość stoicką: miała chronić przed cierpieniem, ale po śmierci córki okazała się bezużyteczna ("z stopniów ostatnich zrzucony"). Tren X — zagubienie religijne: poeta szuka córki w niebie, Hadesie, czyśćcu, nicości — nie wie, czy dusza istnieje ("jesliś jest"). Tren XI — odrzucenie cnoty ("Fraszka cnota!") — najwyższej wartości stoickiej i renesansowej. Wniosek: cnota nikogo nie ratuje, "nieznajomy wróg" nie rozróżnia dobrych od złych. Dramatyzm: w Pieśniach Kochanowski czcił cnotę, mądrość, równowagę — teraz to wszystko runęło. "Fraszka cnota" w ustach autora fraszek ma ironiczny wydźwięk: fraszka = drobiazg = nic warte.',
      metadata: {
        explanation:
          "Kryzys IX-XI to najczęściej analizowany fragment cyklu. Kluczowe: to nie nihilizm, lecz etap żałoby — po kryzysie nastąpi odbudowa (Tren XIX).",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Tren XIX jako consolatio — jak Kochanowski odbudowuje swój światopogląd?",
        requirements: [
          "Opisz formę trenu (sen, matka z Urszulką na ręku)",
          "Wymień argumenty matki (niebo, marność ziemskich rozkoszy, powszechność cierpienia, czas)",
          "Wyjaśnij, czy poet wraca do dawnego stoicyzmu, czy buduje nowy światopogląd",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Forma: poet zasypia pod ranem, we śnie pojawia się zmarła matka z Urszulką — dziewczynka wygląda jak za życia (giezłeczko białe, włoski pokręcone, twarz rumiana). Argumenty: 1) Urszulka żyje w niebie wśród aniołów, 2) ziemskie rozkoszy to frasunki i łzy — "więcej w nich żałości niż radości", 3) Urszulka uniknęła cierpień, 4) cierpienie jest powszechne, 5) rozum i czas leczą — "jeden jest Pan smutku i nagrody". Nowy światopogląd: NIE wraca do naiwnego stoicyzmu — buduje syntezę: chrześcijańska wiara (dusza nieśmiertelna) + stoicka akceptacja losu ("ludzkie przygody / Ludzkie noś") + pokora wobec Boga ("Skryte są Pańskie sądy"). To mądrość dojrzalsza — przeszła przez ogień cierpienia.',
      metadata: {
        explanation:
          "Tren XIX to zamknięcie cyklu. Na maturze: ważne, by wskazać, że nowy światopogląd jest ZMIENIONY — nie jest powrotem do dawnego optymizmu.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "RENAISSANCE",
      work: "Treny",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Motyw dziecka w literaturze — nowatorstwo Kochanowskiego na tle tradycji gatunku trenu",
        requirements: [
          "Wyjaśnij, komu tradycyjnie poświęcano treny (persona gravis)",
          "Opisz, jak Kochanowski przełamuje konwencję (dziecko jako bohater poważnej liryki)",
          "Wskaż, dlaczego to było rewolucyjne w XVI-wiecznej Polsce",
          "Przywołaj reakcję wydawcy Jana Januszowskiego",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Tradycja: tren poświęcano persona gravis — królom, bohaterom, mędrcom (Pindar, Owidiusz). Dziecko nie mogło być bohaterem poważnej liryki. Nowatorstwo: Kochanowski poświęca 19 trenów dwuipółletniej córce — czyniąc dziecko bohaterem równym królom. Porównuje Urszulkę do Safony (VI), opisuje jej cnoty jak cnoty dorosłego (XII). Rewolucyjność: XVI-wieczne poetyki normatywne nie pozwalały na takie odstępstwo. Już wydawca Jan Januszowski czuł potrzebę obrony poety: pisał, że Kochanowski zostawił "Treny — lekkie, rzeką podobno" — broniąc go przed zarzutem, że poświęcił poważne dzieło "błahemu" tematowi. Kochanowski udowodnił, że ból rodzica jest uniwersalny i zasługuje na najwyższą formę literacką.',
      metadata: {
        explanation:
          "Nowatorstwo Kochanowskiego wobec konwencji to jedno z najczęściej pojawiających się zagadnień maturalnych. Kluczowe: dziecko jako bohater liryki funeralnej to przełom.",
      },
    },

    // ======================= KONIEC PYTAŃ TRENY — ZESTAW 1 (60 pytań, diff 1-3) ===================//
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
