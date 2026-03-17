// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= POCZĄTEK PYTAŃ DŻUMA ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kto jest autorem powieści „Dżuma”?",
      content: {
        options: [
          "Jean-Paul Sartre",
          "Albert Camus",
          "Gustaw Herling-Grudziński",
          "Franz Kafka",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Dżuma” (fr. „La Peste”) to powieść Alberta Camusa wydana w 1947 roku. Polskie tłumaczenie Joanny Guze ukazało się w 1957 roku. Camus otrzymał Nagrodę Nobla w dziedzinie literatury w 1957 roku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "W jakim mieście rozgrywa się akcja „Dżumy”?",
      content: {
        options: [
          "W Paryżu",
          "W Algierze",
          "W Oranie — mieście na wybrzeżu algierskim",
          "W Marsylii",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Akcja „Dżumy” toczy się w Oranie — mieście portowym na wybrzeżu algierskim, będącym wówczas prefekturą francuską. Camus opisuje je jako miasto brzydkie, bez drzew i gołębi, żyjące handlem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Jaki zawód wykonuje główny bohater, Bernard Rieux?",
      content: {
        options: [
          "Jest dziennikarzem",
          "Jest lekarzem",
          "Jest sędzią",
          "Jest księdzem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Bernard Rieux jest lekarzem — to on jako pierwszy rozpoznaje objawy dżumy u pacjentów i walczy z epidemią przez cały czas jej trwania. Na końcu powieści okazuje się również narratorem kroniki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Co jest pierwszym zwiastunem epidemii w Oranie?",
      content: {
        options: [
          "Nagła fala upałów",
          "Masowe pojawianie się martwych szczurów na ulicach",
          "Trzęsienie ziemi",
          "Skażenie wody pitnej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Epidemię zwiastują martwe szczury, które zaczynają pojawiać się na ulicach, schodach i w domach. 25 kwietnia agencja Infdok ogłosiła, że zebrano i spalono 6231 szczurów. Wkrótce potem zaczynają chorować ludzie.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kto okazuje się narratorem kroniki na końcu powieści?",
      content: {
        options: [
          "Jean Tarrou",
          "Raymond Rambert",
          "Doktor Bernard Rieux",
          "Joseph Grand",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Na końcu powieści doktor Rieux ujawnia, że to on jest autorem kroniki. Przez cały utwór mówi o sobie w trzeciej osobie, by zachować obiektywizm świadka.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Ile części (rozdziałów głównych) liczy powieść „Dżuma”?",
      content: {
        options: ["Trzy", "Cztery", "Pięć", "Siedem"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "„Dżuma” składa się z pięciu części. Część I — pojawienie się szczurów i rozpoznanie epidemii, II — zamknięcie miasta i rozłąka, III — szczyt epidemii, IV — walka z dżumą, V — cofanie się choroby i otwarcie bram.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Które z wymienionych postaci są bohaterami „Dżumy”?",
      content: {
        options: [
          "Jean Tarrou — tajemniczy przybysz organizujący oddziały sanitarne",
          "Joseph Grand — skromny urzędnik merostwa piszący książkę",
          "Rodion Raskolnikow — student prawa z Petersburga",
          "Ojciec Paneloux — uczony jezuita wygłaszający kazania",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Tarrou, Grand i ojciec Paneloux to postacie z „Dżumy”. Raskolnikow to bohater „Zbrodni i kary” Dostojewskiego.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Które stwierdzenia o powieści „Dżuma” są prawdziwe?",
      content: {
        options: [
          "Powieść została wydana w 1947 roku",
          "Jest powieścią-parabolą o uniwersalnym przesłaniu",
          "Akcja rozgrywa się w dokładnie określonym roku — 1942",
          "Motto pochodzi z „Dziennika roku zarazy” Daniela Defoe",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Dżuma” ukazała się w 1947 r., jest parabolą, a motto pochodzi od Defoe. Rok akcji NIE jest dokładnie podany — tekst mówi „194.” z celowo opuszczoną ostatnią cyfrą, co podkreśla uniwersalność.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Które wydarzenia następują w części I powieści?",
      content: {
        options: [
          "Pojawiają się martwe szczury na ulicach Oranu",
          "Dozorca Michel umiera jako jedna z pierwszych ofiar",
          "Bramy miasta zostają zamknięte",
          "Doktor Rieux rozpoznaje objawy dżumy u pacjentów",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W części I pojawiają się szczury, umiera dozorca Michel, Rieux rozpoznaje dżumę. Zamknięcie bram następuje dopiero na KOŃCU części I — oficjalną depeszą: „Ogłoście stan dżumy. Zamknijcie miasto”.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Skąd pochodzi motto „Dżumy” i co ono oznacza?",
      content: {
        hints: ["Daniel Defoe", "uwięzienie", "ukazywanie przez coś innego"],
      },
      correctAnswer:
        "Motto pochodzi z „Dziennika roku zarazy” Daniela Defoe i brzmi: „Jest rzeczą równie rozsądną ukazać jakiś rodzaj uwięzienia przez inny, jak ukazać coś, co istnieje rzeczywiście, przez coś innego, co nie istnieje”. Oznacza, że historii o epidemii nie należy czytać dosłownie — dżuma jest metaforą innego rodzaju zniewolenia (np. wojny, totalitaryzmu, zła).",
      metadata: {
        explanation:
          "Motto od razu sygnalizuje paraboliczny charakter powieści. Defoe — autor „Robinsona Crusoe” — napisał również kronikę londyńskiej zarazy z 1665 roku, co tworzy intertekstualny dialog między obiema kronikami.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kim jest Raymond Rambert i dlaczego chce opuścić Oran?",
      content: {
        options: [
          "Jest lekarzem i chce uciec przed epidemią",
          "Jest dziennikarzem paryskim, który przyjechał pisać reportaż o Arabach i został zaskoczony zamknięciem miasta — chce wrócić do żony w Paryżu",
          "Jest żołnierzem, który dezerteruje z garnizonu",
          "Jest kupcem, który chce ratować swoje towary przed konfiskatą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rambert to dziennikarz z Paryża, który przyjechał do Oranu, by przeprowadzić ankietę o warunkach życia Arabów. Zamknięcie bram odcięło go od kobiety, którą kocha. Przez długi czas próbuje legalnie i nielegalnie wydostać się z miasta.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Nad czym pracuje Joseph Grand przez całą powieść?",
      content: {
        options: [
          "Nad raportem dla prefektury o stanie epidemii",
          "Nad pierwszym zdaniem powieści o amazonce jadącej alejami Lasku Bulońskiego — nigdy nie jest z niego zadowolony",
          "Nad tłumaczeniem „Dżumy” na język arabski",
          "Nad planem ucieczki z Oranu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Grand przez lata dopracowuje jedno zdanie: „W piękny poranek majowy smukła amazonka, siedząc na wspaniałej kasztance, jechała kwitnącymi alejami Lasku Bulońskiego”. Zmienia przymiotniki, szlifuje rytm, ale nigdy nie przechodzi do dalszej części książki.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Czym zajmuje się Cottard w czasie epidemii?",
      content: {
        options: [
          "Organizuje oddziały sanitarne i walczy z dżumą",
          "Bogaci się na czarnym rynku i kontrabandzie — dżuma mu odpowiada, bo chroni go przed aresztowaniem",
          "Pracuje jako lekarz ochotnik w szpitalu",
          "Pisze kronikę wydarzeń dla prasy paryskiej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Cottard to rentier, który przed epidemią próbował popełnić samobójstwo, prawdopodobnie w obawie przed aresztowaniem. Dżuma mu odpowiada — w chaosie epidemii nikt nie prowadzi dochodzeń. Bogaci się na kontrabandzie i spekulacji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kto jako pierwszy wypowiada słowo „dżuma” w powieści?",
      content: {
        options: [
          "Doktor Rieux",
          "Prefekt Oranu",
          "Stary doktor Castel",
          "Ojciec Paneloux",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Stary doktor Castel, który widział przypadki dżumy w Chinach i w Paryżu, jako pierwszy mówi wprost: „Pan wie oczywiście, co to jest?” i potwierdza, że to dżuma. Rieux się z nim zgadza, ale inni lekarze i władze początkowo unikają tego słowa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Jak umiera dozorca Michel — pierwsza ofiara dżumy?",
      content: {
        options: [
          "Nagle, bez objawów, podczas snu",
          "Po kilku dniach gorączki z dymienicami, wymiotami, majaczeniem i plamami na ciele — w karetce, w drodze do szpitala",
          "W wyniku samobójstwa z rozpaczy",
          "Na dżumę płucną, kaszląc krwią",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Michel umiera po kilku dniach ciężkiej choroby: gorączka do 40 stopni, obrzmiałe gruczoły (dymienice), majaczenia, plamy na ciele. Umiera w karetce, a Rieux stwierdza zgon. Śmierć Michela zamyka „okres pełen mylących oznak” i rozpoczyna panikę.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Połącz postacie z ich charakterystycznymi cechami:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Doktor Rieux" },
          { id: "B", text: "Jean Tarrou" },
          { id: "C", text: "Joseph Grand" },
          { id: "D", text: "Cottard" },
        ],
        rightColumn: [
          {
            id: "1",
            text: "Bogaci się na kontrabandzie, boi się aresztowania",
          },
          {
            id: "2",
            text: "Organizuje oddziały sanitarne, pragnie świętości bez Boga",
          },
          { id: "3", text: "Lekarz walczący z epidemią, narrator kroniki" },
          {
            id: "4",
            text: "Skromny urzędnik szlifujący jedno zdanie powieści",
          },
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
          "Rieux to lekarz i narrator. Tarrou organizuje formacje sanitarne i pragnie „być świętym bez Boga”. Grand szlifuje zdanie o amazonce. Cottard korzysta na epidemii, bo chroni go przed wymiarem sprawiedliwości.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Ojciec Paneloux w pierwszym kazaniu twierdzi, że dżuma jest (1). Po śmierci dziecka sędziego Othona wygłasza drugie kazanie, w którym mówi, że trzeba (2). Rieux twierdzi natomiast, że jedynym sposobem walki z dżumą jest (3).",
        gaps: [
          {
            id: 1,
            options: [
              "przypadkowym zjawiskiem przyrodniczym",
              "karą Bożą za grzechy mieszkańców",
              "wynikiem złej higieny miasta",
              "spiskiem władz kolonialnych",
            ],
          },
          {
            id: 2,
            options: [
              "uciec z miasta za wszelką cenę",
              "uwierzyć we wszystko albo wszystkiemu zaprzeczyć",
              "przestać wierzyć w Boga",
              "zorganizować modlitwy publiczne",
            ],
          },
          {
            id: 3,
            options: [
              "modlitwa i pokuta",
              "uczciwość — wykonywanie swego zawodu",
              "ucieczka z zamkniętego miasta",
              "pogodzenie się z losem",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Paneloux w I kazaniu mówi o karze Bożej. W II kazaniu (po śmierci dziecka) zmienia stanowisko — mówi o konieczności wiary totalnej: wszystko albo nic. Rieux uważa, że walka z dżumą to kwestia uczciwości: „wykonywanie zawodu”.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Które motywy literackie są obecne w „Dżumie”?",
      content: {
        options: [
          "Motyw oblężonego miasta i izolacji",
          "Motyw rozłąki z bliskimi",
          "Motyw pojedynku rycerskiego",
          "Motyw walki ze złem i solidarności ludzkiej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kluczowe motywy „Dżumy” to: oblężone miasto (zamknięte bramy), rozłąka (Rieux z żoną, Rambert z partnerką), walka ze złem i solidarność (formacje sanitarne). Motyw pojedynku rycerskiego nie występuje w utworze.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kim jest stary astmatyk i jaką postawę reprezentuje?",
      content: {
        hints: [
          "kramarz",
          "groch w garnkach",
          "bierność",
          "nie wstaje z łóżka",
        ],
      },
      correctAnswer:
        "Stary astmatyk to emerytowany kramarz, który mając 50 lat uznał, że dosyć pracował, położył się do łóżka i już nie wstał. Mierzy czas przesypywaniem grochu z garnka do garnka zamiast zegarkiem. Reprezentuje postawę biernej akceptacji świata — nie obchodzi go dżuma, nie walczy z nią. Jego bierna filozofia kontrastuje z aktywną postawą Rieux i Tarrou.",
      metadata: {
        explanation:
          "Stary astmatyk jest postacią komiczną i filozoficzną zarazem. Jego zdanie „Co to jednak znaczy — dżuma? To życie, ot i wszystko” wyraża postawę fatalistyczną. Tarrou pyta, czy jest „świętym”, i odpowiada: „Tak, jeśli świętość jest zespołem przyzwyczajeń”.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Co dzieje się z żoną doktora Rieux w trakcie epidemii?",
      content: {},
      correctAnswer:
        "Żona Rieux jest chora (prawdopodobnie na gruźlicę) i wyjeżdża do sanatorium w górach dzień przed zamknięciem bram. Przez całą epidemię Rieux jest od niej oddzielony — komunikują się tylko depeszami. Na końcu powieści Rieux dowiaduje się o jej śmierci z telegramu.",
      metadata: {
        explanation:
          "Rozłąka Rieux z żoną jest jednym z najważniejszych osobistych wymiarów dżumy. Rieux przeżywa tę stratę w milczeniu — co pokazuje, że walka z abstrakcją (epidemią) kosztuje utratę tego, co najbardziej osobiste.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jakie zdarzenie otwiera fabułę powieści (scena z 16 kwietnia)?",
      content: {
        words: ["szczur", "podest", "dozorca"],
      },
      correctAnswer:
        "Rankiem 16 kwietnia doktor Rieux wychodzi ze swojego gabinetu i na podeście zawadza nogą o martwego szczura. Dozorca Michel twierdzi stanowczo, że „nie ma szczurów w domu” i uważa to za czyjś kawał. Tego samego wieczoru Rieux widzi kolejnego szczura — umierającego, wyrzucającego krew z pyska. To początek serii wydarzeń zwiastujących epidemię.",
      metadata: {
        explanation:
          "Scena z martwym szczurem na podeście to klasyczny incipit powieści. Reakcja dozorcy (zaprzeczanie oczywistości) zapowiada postawę całego społeczeństwa wobec nadciągającej katastrofy.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Dlaczego Rambert ostatecznie rezygnuje z ucieczki z Oranu?",
      content: {
        options: [
          "Nie udaje mu się zorganizować przerzutu przez bramy",
          "Uświadamia sobie, że „może być wstyd, że człowiek jest sam tylko szczęśliwy” — po wizycie w szpitalu decyduje się zostać i walczyć z dżumą",
          "Zostaje aresztowany przez policję przy próbie ucieczki",
          "Jego żona przyjeżdża do Oranu i nie ma powodu uciekać",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rambert, który przez tygodnie organizował ucieczkę, zmienia zdanie po zobaczeniu pracy w szpitalu i po informacji, że żona Rieux jest w sanatorium. Mówi: „Może być wstyd, że człowiek jest sam tylko szczęśliwy”. Zostaje i dołącza do formacji sanitarnych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Co zmienia się w postawie ojca Paneloux między pierwszym a drugim kazaniem?",
      content: {
        options: [
          "W pierwszym kazaniu nawołuje do ucieczki, w drugim — do walki z epidemią",
          "W pierwszym kazaniu mówi „wy” i interpretuje dżumę jako karę Bożą; w drugim mówi „my”, rezygnuje z prostych wyjaśnień i stwierdza, że trzeba uwierzyć we wszystko albo wszystkiemu zaprzeczyć",
          "W pierwszym kazaniu jest ateistą, w drugim — staje się gorliwym wierzącym",
          "Oba kazania są identyczne — Paneloux nie zmienia stanowiska",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ewolucja Paneloux to jeden z najważniejszych wątków powieści. I kazanie: pewność, oskarżenie, „wy zasłużyliście”. II kazanie (po śmierci dziecka Othona): niepewność, pokora, „my”, wiara totalna jako jedyna alternatywa wobec nihilizmu. Zmiana z „wy” na „my” pokazuje, że Paneloux sam stał się ofiarą dżumy.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jaką scenę Camus wykorzystuje jako punkt kulminacyjny sporu o sens cierpienia?",
      content: {
        options: [
          "Śmierć dozorcy Michela w karetce",
          "Długą agonię syna sędziego Othona — dziecko umiera mimo zastosowania nowego serum, a Rieux mówi do Paneloux: „Ten przynajmniej był niewinny”",
          "Samobójstwo Cottarda w finale powieści",
          "Śmierć Tarrou na dżumę płucną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Scena śmierci synka Othona to najważniejszy moment konfrontacji z problemem teodycei. Dziecko cierpi straszliwie, a serum Castela nie działa. Po śmierci dziecka Rieux krzyczy na Paneloux: „Nigdy nie będę kochał tego świata, gdzie dzieci są torturowane”. To zdanie jest kluczem do etyki Camusa.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Dlaczego „Dżumę” nazywamy powieścią-parabolą?",
      content: {
        options: [
          "Ponieważ opisuje wyłącznie realne wydarzenia historyczne z II wojny światowej",
          "Ponieważ pod dosłowną warstwą opowieści o epidemii kryje się głębszy, uniwersalny sens — dżuma jest metaforą zła, wojny, totalitaryzmu i zła tkwiącego w człowieku",
          "Ponieważ zawiera przypowieści biblijne w każdym rozdziale",
          "Ponieważ jest napisana wierszem, jak parabola matematyczna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Parabola (przypowieść) to utwór, w którym warstwa dosłowna jest nośnikiem głębszego sensu. Cechy paraboli w „Dżumie”: zatarta data (194.), zamknięta przestrzeń, uniwersalne postawy bohaterów, motto z Defoe sygnalizujące alegoryczność. Dżuma = zło, wojna, totalitaryzm, ale też zło wewnętrzne człowieka.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Które interpretacje tytułu „Dżuma” są uzasadnione tekstem powieści?",
      content: {
        options: [
          "Dżuma jako dosłowna epidemia — choroba dziesiątkująca Oran",
          "Dżuma jako metafora II wojny światowej i okupacji",
          "Dżuma jako zło tkwiące wewnątrz każdego człowieka — „każdy nosi w sobie dżumę”",
          "Dżuma jako kara Boża za grzechy — jedyna interpretacja wspierana przez narratora",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Tytuł jest wieloznaczny: dosłowna epidemia, metafora wojny/totalitaryzmu, zło w człowieku (słowa Tarrou: „każdy nosi w sobie dżumę”). Interpretacja kary Bożej jest ODRZUCONA — głosi ją Paneloux w I kazaniu, ale sam wycofuje się z niej po śmierci dziecka.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Które cytaty pochodzą z „Dżumy” i kto je wypowiada?",
      content: {
        matchingType: "quotes_to_works",
        leftColumn: [
          { id: "A", text: "„Jedyny sposób walki z dżumą to uczciwość”" },
          { id: "B", text: "„Każdy nosi w sobie dżumę”" },
          { id: "C", text: "„Kapelusze z głów, panowie!”" },
          {
            id: "D",
            text: "„W ludziach więcej rzeczy zasługuje na podziw niż na pogardę”",
          },
        ],
        rightColumn: [
          { id: "1", text: "Tarrou — o złu tkwiącym w każdym człowieku" },
          { id: "2", text: "Grand — o swoim zdaniu o amazonce" },
          { id: "3", text: "Rieux — o postawie wobec epidemii" },
          { id: "4", text: "Rieux-narrator — końcowe przesłanie kroniki" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 1],
        [3, 3],
      ],
      metadata: {
        explanation:
          "Rieux mówi o uczciwości jako jedynym sposobie walki. Tarrou stwierdza, że „każdy nosi w sobie dżumę”. Grand marzy, by wydawca zdjął kapelusz. Końcowe zdanie kroniki — „w ludziach więcej rzeczy zasługuje na podziw niż na pogardę” — należy do Rieux-narratora.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Które postawy wobec dżumy (zła) reprezentują poszczególni bohaterowie?",
      content: {
        options: [
          "Rieux — aktywna walka ze złem wynikająca z obowiązku zawodowego i ludzkiej uczciwości",
          "Tarrou — bunt przeciw śmierci i pragnienie „świętości bez Boga”",
          "Cottard — bierny opór i odmowa współpracy z władzami z pobudek patriotycznych",
          "Paneloux — ewolucja od religijnego wyjaśnienia cierpienia do wiary totalnej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Rieux = uczciwość i obowiązek. Tarrou = bunt i poszukiwanie świętości. Paneloux = ewolucja od pewności do pokory. Cottard NIE jest biernym opornikiem patriotycznym — jest oportunistą, który korzysta na epidemii i boi się powrotu porządku prawnego.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Opisz scenę w operze (Orfeusz i Eurydyka) z notatek Tarrou. Co symbolizuje?",
      content: {
        instruction:
          "Odwołaj się do tego, co dzieje się na scenie i na widowni, oraz wyjaśnij symbolikę.",
      },
      correctAnswer:
        "Podczas spektaklu „Orfeusza i Eurydyki” śpiewak grający Orfeusza dodaje do arii przesadne tremola, a w scenie utraty Eurydyki nagle pada na scenę. Orkiestra milknie. Publiczność, początkowo zdumiona, zaczyna w panice opuszczać salę — cicho, potem coraz szybciej, „jak po skończonym nabożeństwie wychodzi się z kościoła”. Scena symbolizuje wtargnięcie dżumy (śmierci) w przestrzeń sztuki i pozorów — eleganckie fraki nie chronią przed zarazą. Upadek Orfeusza to upadek iluzji normalności.",
      metadata: {
        explanation:
          "Scena w operze to jedna z najbardziej sugestywnych scen powieści. Metateatralność: Orfeusz traci Eurydykę na scenie, jak Oran traci swoich obywateli. Publiczność ucieka, zostawiając „zapomniane wachlarze i koronki na czerwieni foteli” — symboliczny obraz porzucenia pozorów.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Co oznacza zdanie Rieux: „Jedyny sposób walki z dżumą to uczciwość”? Jak je rozumie?",
      content: {},
      correctAnswer:
        "Rieux wyjaśnia, że uczciwość „w moim przypadku polega na wykonywaniu zawodu”. Nie chodzi mu o abstrakcyjną cnotę, ale o codzienną, konsekwentną pracę — leczenie chorych, diagnozowanie, izolowanie, nawet gdy nie ma nadziei na wyleczenie. Uczciwość to przeciwieństwo bohaterstwa: nie wielkie czyny, lecz wytrwałe robienie tego, co należy. To postawa Syzyfa u Camusa — świadome działanie mimo absurdu.",
      metadata: {
        explanation:
          "To jedno z najważniejszych zdań powieści. Rieux odrzuca heroizm i świętość jako kategorie — zostaje uczciwość, rozumiana jako solidna, codzienna praca. To fundament etyki Camusa: sens nadaje się życiu przez działanie, nie przez wiarę.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Dlaczego narrator uważa Josepha Granda za „bohatera” kroniki? Co jest w tym paradoksalne?",
      content: {
        hints: ["skromność", "dwa plus dwa", "dobra wola"],
      },
      correctAnswer:
        "Narrator proponuje Granda jako bohatera, bo „miał tylko dobre serce i pozornie śmieszny ideał”. Grand nie jest spektakularny — jest skromnym urzędnikiem, który po godzinach szlifuje jedno zdanie, a jednocześnie cierpliwie prowadzi statystyki formacji sanitarnych. Paradoks polega na tym, że bohaterem zostaje człowiek najzwyklejszy: to jego szarość jest heroiczna. Camus odwraca tradycyjny wzorzec — prawdziwy bohater to ktoś, kto mówi „dwa i dwa to cztery” i robi to, co należy.",
      metadata: {
        explanation:
          "Narrator pisze: „dwa i dwa to cztery, a bohaterstwo — miejsce drugorzędne”. Grand ucieleśnia etykę Camusa: wielkość w zwyczajności, dobroć bez ostentacji.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Postawy bohaterów „Dżumy” wobec epidemii — od buntu po oportunizm",
        requirements: [
          "Scharakteryzuj postawę co najmniej czterech bohaterów (Rieux, Tarrou, Rambert, Cottard)",
          "Wskaż, która postawa jest według narratora właściwa i dlaczego",
          "Wyjaśnij, dlaczego narrator twierdzi, że „nie jest rzeczą konieczną być bohaterem”",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Notatka powinna: 1) Rieux — aktywna walka, uczciwość, obowiązek zawodowy; nie szuka chwały, po prostu leczy. 2) Tarrou — bunt egzystencjalny, organizacja formacji sanitarnych, pragnienie „świętości bez Boga”. 3) Rambert — ewolucja od egoizmu (ucieczka) do solidarności (zostaje i walczy). 4) Cottard — oportunizm, dżuma mu sprzyja, korzysta na nieszczęściu. Narratorowi najbliższa jest postawa Granda i Rieux: zwykła uczciwość, nie bohaterstwo. „Piękne czyny mają tak wysoką cenę dlatego, że są rzadkie” — Camus odrzuca heroizm na rzecz codziennej przyzwoitości.",
      metadata: {
        explanation:
          "Spektrum postaw bohaterów to jedno z najczęstszych pytań maturalnych o „Dżumę”. Kluczowe: Camus nie dzieli bohaterów na dobrych i złych — pokazuje różne możliwe reakcje na zło.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Co Tarrou rozumie przez zdanie „każdy nosi w sobie dżumę”?",
      content: {
        options: [
          "Że wszyscy mieszkańcy Oranu są fizycznie zarażeni bakcylem",
          "Że w każdym człowieku tkwi potencjał zła — skłonność do zabijania, zgody na zabójstwo, obojętności; i trzeba nieustannie czuwać, by „nie tchnąć dżumy w twarz drugiego człowieka”",
          "Że dżuma jest chorobą dziedziczną przenoszoną genetycznie",
          "Że każdy powinien się bać epidemii i uciekać z miasta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To najważniejsze zdanie filozoficzne powieści. Tarrou mówi o „zadżumieniu” moralnym: mikrob dżumy to potencjał zła w człowieku — zgoda na wyroki śmierci, obojętność na cierpienie, „roztargnienie” pozwalające krzywdzić innych. „Uczciwy człowiek, który nie zaraża niemal nikogo, to człowiek możliwie najmniej roztargniony.”",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jak Camus buduje postać Tarrou jako bohatera egzystencjalnego? Jakie doświadczenie go ukształtowało?",
      content: {
        options: [
          "Tarrou był żołnierzem i widział śmierć na polu bitwy",
          "Jako nastolatek widział, jak ojciec — zastępca prokuratora — żąda kary śmierci dla oskarżonego; odtąd walczy z wszelką formą „zadżumienia” — zgodą na zabijanie",
          "Tarrou stracił rodziców podczas epidemii w Chinach",
          "Tarrou był księdzem, który utracił wiarę po śmierci parafianina",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tarrou opowiada Rieux o przełomowym doświadczeniu: jako siedemnastolatek widział ojca w sądzie, żądającego „tej głowy”. Zrozumiał, że ojciec „wstawał wcześniej” by być obecny przy egzekucjach. Odtąd walczy ze „skazywaniem” — każdą formą zgody na zabijanie. Pragnie „świętości bez Boga” i „spokoju wewnętrznego”.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Jaką rolę pełni w powieści motyw „abstrakcji”?",
      content: {
        sourceText: {
          author: "Albert Camus",
          title: "Dżuma",
          text: "Kiedy abstrakcja zaczyna nas zabijać, trzeba się zająć abstrakcją.",
        },
        options: [
          "„Abstrakcja” oznacza naukę i teorię medyczną — Rieux woli praktykę",
          "Rieux nazywa „abstrakcją” dżumę jako system: statystyki, procedury, izolację — to, co odczłowiecza cierpienie, ale z czym trzeba walczyć, używając tych samych narzędzi",
          "„Abstrakcja” to metafora malarstwa abstrakcyjnego, które jest modne w Oranie",
          "To określenie filozofii Paneloux, z którą Rieux polemizuje",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dla Rieux „abstrakcja” to dżuma jako system: formularze, karetki, statystyki, izolacja, pogrzeby — cały aparat, który sprowadza cierpienie do liczb. Rambert zarzuca Rieux „mówienie językiem abstrakcji”. Ale Rieux wie, że „kiedy abstrakcja zaczyna zabijać, trzeba się zająć abstrakcją” — walczyć z systemem przy użyciu systemu. To paradoks etyczny powieści.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Które elementy „Dżumy” świadczą o jej parabolicznym (alegorycznym) charakterze?",
      content: {
        options: [
          "Celowo zatarta data — „194.” bez ostatniej cyfry",
          "Motto z Defoe sygnalizujące, że „jeden rodzaj uwięzienia ukazuje inny”",
          "Szczegółowe opisy architektoniczne Oranu z podaniem nazw ulic i numerów domów",
          "Uniwersalne postawy bohaterów — nie indywidualne psychologie, lecz modele reakcji na zło",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Cechy paraboli: zatarta data (uniwersalność), motto Defoe (klucz alegoryczny), bohaterowie jako modele postaw (nie głębokie psychologie). Opisy Oranu istnieją, ale nie są „szczegółowe” — Camus celowo kreuje miasto jako przestrzeń uniwersalną: brzydką, banalną, reprezentatywną.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Które porównania międzytekstowe z innymi dziełami są uzasadnione?",
      content: {
        options: [
          "„Dżuma” i „Inny świat” Herlinga-Grudzińskiego — obie ukazują ludzi w sytuacji ekstremalnej, testując ich moralność",
          "„Dżuma” i „Mit Syzyfa” Camusa — Rieux jak Syzyf: działa wiedząc, że walka może być daremna”",
          "„Dżuma” i „Pan Tadeusz”— obie są epopejami narodowymi",
          "„Dżuma” i „Proces” Kafki — absurd systemu, który przenika życie jednostki bez wyjaśnienia",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Inny świat” — obie powieści testują moralność w ekstremalnych warunkach. „Mit Syzyfa” — Rieux to Syzyf walczący z absurdem. „Proces” Kafki — absurdalny system pochłania jednostkę. „Pan Tadeusz” to epopeja szlachecka — nie ma żadnego związku z „Dżumą”.",
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jaką rolę pełni scena nocnej kąpieli Rieux i Tarrou w morzu? Dlaczego jest ważna kompozycyjnie?",
      content: {
        instruction:
          "Odwołaj się do kontekstu (kiedy następuje), symboliki i relacji między bohaterami.",
      },
      correctAnswer:
        "Scena kąpieli następuje po zwierzeniach Tarrou o swoim życiu — jest momentem kulminacji ich przyjaźni. Rieux i Tarrou wymykają się z miasta na molo i pływają razem w morzu: „Przez kilka minut płynęli jednako, z tą samą mocą, samotni, daleko od świata, wolni nareszcie od miasta i dżumy”. To jedyna scena w powieści, gdzie bohaterowie doświadczają wolności i szczęścia. Symbolika: morze = wolność, natura, życie poza dżumą. Kompozycyjnie: scena jest „pauzą” przed finałem — wkrótce Tarrou zachoruje i umrze. Jest pożegnaniem, choć bohaterowie jeszcze o tym nie wiedzą.",
      metadata: {
        explanation:
          "Scena kąpieli jest jednym z najczęściej analizowanych fragmentów powieści. Na maturze pojawia się w kontekstach: przyjaźń w sytuacji ekstremalnej, motyw morza, chwila wolności wobec zniewolenia.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Wyjaśnij sens ostatniego zdania powieści o „bakcylu dżumy, który nigdy nie umiera”. Jakie ma przesłanie?",
      content: {},
      correctAnswer:
        "Rieux pisze, że „bakcyl dżumy nigdy nie umiera i nie znika, że może przez dziesiątki lat pozostać uśpiony w meblach i bieliźnie (...) i że nadejdzie być może dzień, kiedy na nieszczęście ludzi oraz dla ich nauki dżuma obudzi swe szczury i pośle je, by umierały w szczęśliwym mieście”. Przesłanie: zło nigdy nie znika na zawsze — może powrócić w każdej chwili pod nową postacią (wojna, totalitaryzm, nienawiść). Radość z wyzwolenia „jest zawsze zagrożona”. To ostrzeżenie przed łatwym optymizmem i wezwanie do wiecznej czujności moralnej.",
      metadata: {
        explanation:
          "To zdanie zamykające powieść jest jednym z najczęściej cytowanych fragmentów Camusa. Na maturze kluczowe: nie jest to pesymizm, lecz realizm moralny — Camus nie zapowiada nieuchronnej klęski, ale mówi, że czujność i gotowość do walki muszą być stałe.",
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Spór Rieux z Paneloux — dwa sposoby reagowania na cierpienie niewinnych",
        requirements: [
          "Wyjaśnij stanowisko Rieux (bunt, odmowa akceptacji cierpienia)",
          "Wyjaśnij stanowisko Paneloux (wiara totalna, przyjęcie tajemnicy)",
          "Odwołaj się do sceny śmierci dziecka jako punktu zwrotnego",
          "Oceń, która postawa jest bliższa przesłaniu Camusa",
          "150-200 słów",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna: Rieux — odmawia akceptacji świata, „gdzie dzieci są torturowane”. Jego postawa to bunt bez metafizyki: leczy, bo tak trzeba, nie szuka wyjaśnień, nie wierzy w wyższy sens cierpienia. Paneloux — po śmierci dziecka porzuca łatwe odpowiedzi (kara Boża), ale zamiast buntu wybiera wiarę totalną: „trzeba we wszystko uwierzyć albo wszystkiemu zaprzeczyć”. Punkt zwrotny: agonia syna Othona — Paneloux klęka i modli się, Rieux mówi: „ten przynajmniej był niewinny”. Po scenie Rieux przeprasza, ale stwierdza: „nie chcę spierać się z księdzem. Pracujemy razem.” Bliższa Camusowi postawa Rieux — bunt i działanie, nie wiara. Ale Camus nie deprecjonuje Paneloux: daje mu godność i pokornę śmierć.",
      metadata: {
        explanation:
          "Spór Rieux–Paneloux to centralna oś filozoficzna powieści: egzystencjalizm vs. wiara. Na maturze pojawia się jako pytanie o teodycję, postawy wobec cierpienia i sens nadziei.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Rozłąka jako centralne doświadczenie bohaterów „Dżumy” — formy, skutki i sens",
        requirements: [
          "Wskaż co najmniej trzy przykłady rozłąki w powieści",
          "Opisz psychologiczne skutki rozłąki, jakie obserwuje narrator",
          "Wyjaśnij, dlaczego narrator nazywa rozłąkę „wygnaniem we własnym domu”",
          "150-200 słów",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        "Notatka powinna: Przykłady rozłąki: 1) Rieux — żona w sanatorium, umiera bez niego. 2) Rambert — partnerka w Paryżu, nie może wyjechać. 3) Castel — żona w sąsiednim mieście, wraca mimo ryzyka. 4) Wszyscy mieszkańcy Oranu — odcięci od świata, kontakt tylko przez 10-słowowe depesze. Skutki: utrata pamięci o bliskich (twarze stają się „bezcielesne”), rezygnacja z przyszłości, monotonia cierpienia, stępienie emocji — „przyzwyczajenie się do rozpaczy gorsze niż sama rozpacz”. „Wygnanie we własnym domu” — bo ludzie są we własnym mieście, ale odcięci od tego, co stanowiło ich życie (bliscy, przyzwyczajenia, wolność). Sens: rozłąka to forma śmierci za życia — pozbawia ludzi tego, co ludzkie: czułości, miłości, nadziei.",
      metadata: {
        explanation:
          "Motyw rozłąki to jeden z najczęstszych tematów maturalnych. Camus poświęca mu obszerne fragmenty w części II i III, analizując psychologię ludzi oddzielonych od bliskich.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Czy uczciwość wystarczy, by walczyć ze złem? Rozważ problem, odwołując się do „Dżumy” Alberta Camusa i jednego innego tekstu kultury.",
      content: {
        requirements: [
          "Wyjaśnij, jak Rieux rozumie uczciwość w kontekście walki z epidemią",
          "Przeanalizuj postawy innych bohaterów — Tarrou, Granda, Ramberta — jako warianty uczciwości",
          "Porównaj z innym tekstem kultury (np. „Inny świat” — postawa Herlinga wobec zła w łagrze, „Lord Jim” — poczucie obowiązku)",
          "Sformułuj wniosek: czy codzienna przyzwoitość to odpowiedź na wielkie zło?",
          "Minimum 300 słów",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        "Rozprawka powinna: zdefiniować uczciwość u Camusa (wykonywanie zawodu, brak zgody na zło, brak heroicznej retoryki), pokazać warianty: Tarrou (bunt + pragnienie świętości), Grand (skromna praca), Rambert (ewolucja od egoizmu do solidarności). Porównanie: „Inny świat” — w łagrze uczciwość to odmowa kolaboracji z systemem; Herling podobnie jak Camus stawia na indywidualną moralność w obliczu absurdu. Wniosek: uczciwość NIE gwarantuje zwycięstwa nad złem, ale jest jedyną postawą zachowującą godność — „w ludziach więcej rzeczy zasługuje na podziw niż na pogardę”.",
      metadata: {
        explanation:
          "Problem uczciwości wobec zła to centralny temat maturalny. Kluczowe: Camus nie obiecuje, że uczciwość wygra — mówi, że jest jedynym godnym wyborem.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jak „Dżuma” realizuje filozofię absurdu Camusa z eseju „Mit Syzyfa”?",
      content: {
        options: [
          "Bohaterowie rezygnują z walki i godzą się z absurdem istnienia",
          "Rieux jest współczesnym Syzyfem: wie, że walka z dżumą (śmiercią) jest skazana na porażkę, ale nadaje jej sens poprzez sam akt buntu — „nie kończącą się klęskę” przyjmuje z godnością i kontynuuje pracę",
          "Powieść odrzuca filozofię absurdu i proponuje wiarę religijną jako rozwiązanie",
          "Absurd polega na tym, że epidemia jest losowa — Camus krytykuje medycynę za bezradność",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W „Micie Syzyfa” Camus pisze, że „trzeba wyobrażać sobie Syzyfa szczęśliwego” — sens tkwi w samym buntowniczym działaniu, nie w jego wyniku. Rieux jest Syzyfem: leczy, choć wie, że większość chorych umrze. Jego zwycięstwa „zawsze będą tymczasowe”, ale to nie powód, by zaprzestać walki. Tarrou pyta: „czym ta dżuma jest dla pana?” Rieux odpowiada: „Nie kończącą się klęską”.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Dlaczego Tarrou pragnie „świętości bez Boga” i dlaczego tej świętości nie osiąga?",
      content: {
        options: [
          "Bo Tarrou jest zbyt leniwy, by konsekwentnie walczyć ze złem",
          "Bo jest ateistą i nie akceptuje kary śmierci w żadnej formie — chce być „niewinnym mordercą”, żyć „po stronie ofiar”; nie osiąga świętości, bo umiera na dżumę tuż przed końcem epidemii — jego bunt prometeuszowy kończy się klęską fizyczną, choć moralnym zwycięstwem",
          "Bo Paneloux odmawia udzielenia mu rozgrzeszenia",
          "Bo Tarrou jest w istocie nihilistą i nie wierzy w żadne wartości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tarrou jest postacią tragiczną: syn prokuratora, który zobaczył „brudne usta” wymiaru sprawiedliwości, odtąd odmawia zgody na jakąkolwiek formę zabijania. Pragnie „świętości bez Boga” — czystej etyki bez transcendencji. Nie osiąga świętości, bo dżuma zabiera go tuż przed wyzwoleniem. Rieux mówi: „Tarrou przegrał partię” — ale jego bunt nadał sens życiu.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Które aspekty „Dżumy” świadczą o jej związku z egzystencjalizmem?",
      content: {
        options: [
          "Absurd istnienia: cierpienie jest bezprzyczynowe i nie ma wyższego sensu (odrzucenie teodycei)",
          "Wolność i odpowiedzialność: bohaterowie definiują się przez swoje wybory (Rambert: zostać czy uciec?)",
          "Bunt jako nadanie sensu: Rieux i Tarrou walczą, wiedząc, że zwycięstwo jest tymczasowe",
          "Deterministyczna wizja: bohaterowie nie mają wpływu na swój los i biernie poddają się epidemii",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Egzystencjalizm w „Dżumie”: absurd (dżuma bez przyczyny, cierpienie bez sensu), wolność (każdy bohater dokonuje wyboru — Rambert, Paneloux, Cottard), bunt (Rieux/Tarrou walczą bez nadziei na ostateczne zwycięstwo). Wizja NIE jest deterministyczna — bohaterowie MAJĄ wpływ na swoje postawy, co jest fundamentem egzystencjalizmu: „człowiek jest tym, co z siebie uczyni”.",
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Porównaj „Dżumę” Camusa z „Innym światem” Herlinga-Grudzińskiego. Co łączy obie powieści w ujęciu problemu zła i reakcji człowieka na nie?",
      content: {
        instruction:
          "Uwzględnij sytuację graniczną, postawy bohaterów, problem solidarności i samotności oraz przesłanie.",
      },
      correctAnswer:
        "Oba utwory: 1) Ukazują człowieka w sytuacji granicznej — zamknięte miasto (Camus) i łagier (Herling) jako laboratoria ludzkiej natury. 2) Testują moralność: czy człowiek zachowa godność, gdy system (dżuma/Gułag) dąży do jego zniszczenia? 3) Pokazują spektrum postaw — od heroizmu (Rieux/Tarrou — Kostylew) po oportunizm (Cottard — donosiciele). 4) Akcentują solidarność i samotność jednocześnie: bohaterowie walczą razem, ale cierpią samotnie. Różnice: u Camusa zło jest abstrakcyjne (bakcyl, absurd), u Herlinga — ma twarz systemu sowieckiego. Camus mówi: „w ludziach więcej rzeczy zasługuje na podziw niż na pogardę”. Herling jest mniej optymistyczny — łagier odsłania ciemne strony natury ludzkiej brutalniej.",
      metadata: {
        explanation:
          "Porównanie „Dżumy” z „Innym światem” to klasyczne zestawienie maturalne: obie powieści z epoki CONTEMPORARY, obie o sytuacji granicznej, obie o etyce w obliczu absurdu.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Wyjaśnij, dlaczego Rieux ujawnia się jako narrator dopiero na końcu powieści. Jaką funkcję pełni ten zabieg narracyjny?",
      content: {},
      correctAnswer:
        "Rieux prowadzi narrację w trzeciej osobie przez całą powieść, by zachować „ton obiektywnego świadka”. Ujawnia się dopiero w ostatniej części: „Czas więc, żeby doktor Bernard Rieux wyznał, że jest jej autorem”. Funkcje zabiegu: 1) Obiektywizm — Rieux chce „świadczyć na korzyść zadżumionych”, nie na własną korzyść; mówienie o sobie w trzeciej osobie eliminuje subiektywizm. 2) Wiarygodność kroniki — narrator-lekarz ma dokumenty, świadectwa, doświadczenie. 3) Pokora — nie czyni z siebie bohatera; przez cały utwór mówi „doktor”, nie „ja”. 4) Efekt zaskoczenia — ujawnienie dodaje emocjonalny wymiar: czytelnik retrospektywnie rozumie, ile kosztowała ta „obiektywność” człowieka, który stracił żonę i przyjaciela.",
      metadata: {
        explanation:
          "Pytanie o narrację to typowe pytanie LANGUAGE_USE na maturze rozszerzonej. Kluczowe: opóźnione ujawnienie narratora to zabieg przemyślany — Camus buduje efekt dokumentalności i pokory.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "„Dżuma” jako powieść o kondycji ludzkiej — jak Camus diagnozuje człowieczeństwo w sytuacji granicznej?",
        requirements: [
          "Wyjaśnij, czym jest „sytuacja graniczna” w filozofii egzystencjalnej i jak realizuje się w powieści",
          "Wskaż, jakie postawy ujawnia dżuma: od solidarności po oportunizm",
          "Odwołaj się do końcowego przesłania: „w ludziach więcej rzeczy zasługuje na podziw niż na pogardę”",
          "Porównaj z jednym innym tekstem o sytuacji granicznej (np. „Inny świat”, „Lord Jim”)",
          "200-250 słów",
        ],
        wordLimit: { min: 200, max: 250 },
      },
      correctAnswer:
        "Notatka powinna: Sytuacja graniczna (Jaspers) = moment, w którym człowiek staje wobec śmierci, cierpienia, walki — i musi się określić. W „Dżumie” granica = zamknięte miasto, epidemia, groźba śmierci. Postawy: solidarność (Rieux, Tarrou, Grand — formacje sanitarne), bunt (Tarrou — „nie zgadzam się na zabijanie”), ewolucja (Rambert — od egoizmu do wspólnoty, Paneloux — od pewności do pokory), oportunizm (Cottard — korzysta na chaosie). Przesłanie: Camus nie idealizuje — pokazuje słabości (Rambert chce uciec, ludzie piją, kradną), ale bilans jest pozytywny: „więcej rzeczy zasługuje na podziw”. Porównanie: „Inny świat” — łagier odsłania te same postawy, ale Herling jest surowszy: system sowiecki niszczy solidarność skuteczniej niż dżuma. „Lord Jim” — jedna chwila tchórzostwa definiuje całe życie; u Camusa nie ma jednorazowego testu — jest codzienna praca. Wniosek: Camus proponuje humanizm bez iluzji — człowiek nie jest z natury dobry ani zły, jest zdolny do obu, a sytuacja graniczna wymusza wybór.",
      metadata: {
        explanation:
          "Pytanie o kondycję ludzką to jeden z najważniejszych tematów maturalnych. „Dżuma” jest do niego idealnym tekstem — Camus celowo projektuje powieść jako laboratorium postaw.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Czy bunt wobec zła może nadać sens ludzkiemu życiu? Rozważ problem, odwołując się do „Dżumy” Alberta Camusa i jednego innego tekstu kultury.",
      content: {
        thesis: "Bunt wobec zła jako sposób na nadanie sensu egzystencji",
        structure: {
          introduction:
            "Przedstaw problem: absurd istnienia, brak wyższego sensu cierpienia, potrzeba buntu",
          arguments_for:
            "Rieux i Tarrou jako modele buntu — walczą wiedząc, że zwycięstwo jest tymczasowe; Syzyf „szczęśliwy” mimo bezsensu",
          arguments_against:
            "Paneloux — wiara jako alternatywa buntu; Cottard — rezygnacja z buntu; czy bunt nie jest kolejnym złudzeniem?",
          conclusion:
            "Sformułuj wniosek: bunt u Camusa to nie nadzieja na wygraną, lecz odmowa zgody na zło — i w tej odmowie tkwi godność człowieka",
        },
        requirements: [
          "Odwołaj się do filozofii absurdu (Camus, „Mit Syzyfa”)",
          "Przeanalizuj postawy Rieux i Tarrou jako formy buntu",
          "Porównaj z innym tekstem kultury (np. „Antygona” — bunt wobec prawa, „Dziady” III — bunt prometejski, „Inny świat” — bunt wobec systemu)",
          "Sformułuj własne stanowisko wobec tezy",
          "Minimum 400 słów",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Rozprawka powinna: przedstawić filozofię absurdu (świat bez sensu, cierpienie bez przyczyny) i bunt jako odpowiedź (nie nadzieja, lecz odmowa rezygnacji). Rieux: buntuje się lekcząc, choć wie, że „zwycięstwa zawsze będą tymczasowe”. Tarrou: buntuje się odmawiając zgody na zabijanie, pragnie „niewinności”. Porównanie: Antygona — buntuje się przeciw prawu Kreona w imię prawa boskiego (bunt moralny vs. bunt egzystencjalny); Konrad z Dziadów — bunt prometejski wobec Boga (u Camusa Boga nie ma — bunt jest wobec absurdu, nie wobec Stwórcy). Stanowisko: bunt u Camusa nie obiecuje zwycięstwa, ale nadaje sens działaniu — „bakcyl dżumy nigdy nie umiera”, więc walka nigdy się nie kończy. To pesymizm metafizyczny, ale optymizm etyczny.",
      metadata: {
        explanation:
          "Bunt wobec zła to centralny temat egzystencjalizmu i jeden z najczęstszych tematów maturalnych. „Dżuma” jest wzorcowym tekstem do tego zagadnienia — łączy filozofię (absurd, bunt) z konkretnymi postawami bohaterów.",
      },
    },
    // ======================= POCZATEK PYTAN DZUMA — ZESTAW 2 (50 pytan) ===================//
    // UWAGA: Polskie cudzyslowy zastapione prostymi "" aby nie psuc JSON

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (6) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: 'W ktorym roku zostala wydana powiessc "Dzuma" Alberta Camusa?',
      content: {
        options: ["1942", "1947", "1957", "1951"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Dzuma" ukazala sie w 1947 roku nakladem Editions Gallimard w Paryzu. Polskie tlumaczenie Joanny Guze wydano w 1957 roku. Camus otrzymal Nagrode Nobla w 1957 roku.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jak nazywa sie dozorca, ktory jest jedna z pierwszych ofiar dzumy?",
      content: {
        options: ["Joseph", "Michel", "Jean", "Raymond"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Michel to stary dozorca w kamienicy doktora Rieux. Stanowczo zaprzeczal, ze w domu sa szczury. Zachorowal na dzume z wysokimi goraczkami, dymienicami i majakami, i zmarl w karetce w drodze do szpitala.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kim jest Jean Tarrou?",
      content: {
        options: [
          "Lekarze ze szpitala miejskiego",
          "Tajemniczy przybysz zamieszkaly w hotelu, ktory organizuje ochotnicze oddzialy sanitarne",
          "Prefekt miasta Oran",
          "Ksiadz wygłaszajacy kazania o karze Bozej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Jean Tarrou to zamozny przybysz, ktory zamieszkal w Oranie na kilka tygodni przed epidemia. Prowadzi notatnik, w ktorym opisuje zycie miasta. Gdy wybucha dzuma, organizuje oddzialy sanitarne i walczy u boku Rieux az do smierci.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Co robi prefekt po oficjalnym stwierdzeniu epidemii?",
      content: {
        options: [
          "Ewakuuje ludnosc drogami morskimi",
          "Nakazuje zamkniecie bram miasta i izolacje Oranu od swiata",
          "Prosi o pomoc militarna z Paryza",
          "Rozkazuje spalic zarazone dzielnice",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Prefekt, po otrzymaniu depeszy z Urzedu Generalnego Gubernatora: "Ogloscie stan dzumy. Zamknijcie miasto", nakazuje zamkniecie bram. Od tej chwili Oran jest odciete od swiata — nie kursuja pociagi, statki omijaja port, korespondencje ograniczono do dziesiecioslowowych telegramow.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Co stalo sie z Cottardem na poczatku powiesci, przed wybuchem epidemii?",
      content: {
        options: [
          "Wyjechał z Oranu do Paryza",
          "Probowal popelnic samobojstwo przez powieszenie",
          "Zachorowal na dzume jako pierwszy",
          "Zostal aresztowany za przemyt",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Cottard probowal sie powiesic w swoim mieszkaniu. Uratowal go sasiad Grand, ktory odcial go w pore. Na drzwiach wisiala kartka: "Wejdzcie, powiesilem sie". Prawdopodobnie powodem byly obawy przed aresztowaniem za jakas dawna sprawe.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Ile slow mogl liczyc telegram wysylany z zamknietego Oranu?",
      content: {
        options: ["Piec", "Dziesiec", "Dwadziescia", "Nie bylo ograniczen"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Telegramy z Oranu mogly liczyc tylko dziesiec slow. Formuly takie jak "Mam sie dobrze. Mysle o tobie. Serdecznosci" zastepowaly calą komunikacje miedzy rozlaczonymi. Listy byly zabronione, telefony miedzynarodowe przerwane.',
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Ktore z ponizszych postaci sa bohaterami drugoplanowymi "Dzumy"?',
      content: {
        options: [
          "Stary astmatyk — pacjent Rieux, ktory liczy czas grochem",
          "Pan Othon — sedzia sledczy z rodzina",
          "Doktor Castel — stary lekarz, ktory przygotowuje surowice",
          "Meursault — urzednik zabijajacy Araba na plazy",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Stary astmatyk, sedzia Othon i doktor Castel to postacie z "Dzumy". Meursault to bohater innej powiesci Camusa — "Obcego" (1942).',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Ktore skutki epidemii dotknely mieszkancow Oranu?",
      content: {
        options: [
          "Zamkniecie bram miasta i zakaz opuszczania go",
          "Ograniczenie korespondencji do dziesiecioslowowych telegramow",
          "Calkowite zniszczenie miasta przez pozar",
          "Racjonowanie zywnosci i wzrost cen na czarnym rynku",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Oran zostal zamkniety, korespondencje ograniczono, ceny zywnosci rosly, rozwijaI sie czarny rynek. Miasto NIE zostalo zniszczone pozarem — pojedyncze pożary wybuchaly w domach osob wracajacych z kwarantanny, ale nie zniszczyly miasta.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: 'Ktore zdania poprawnie opisuja narracje w "Dzumie"?',
      content: {
        options: [
          "Narrator mowi o sobie w trzeciej osobie przez cala powieść",
          "Na koncu okazuje sie, ze narratorem jest doktor Rieux",
          "Narracja jest prowadzona przez Tarrou od poczatku do konca",
          "Narrator korzysta z notatek Tarrou, zeznań i dokumentow",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Rieux prowadzi narracje w trzeciej osobie dla zachowania obiektywnosci. Ujawnia sie dopiero w czesci V. Korzysta ze zrodel: wlasne doswiadczenie, notatki Tarrou, zeznania swiadkow, dokumenty urzedowe. Tarrou NIE jest narratorem — prowadzi tylko swoje prywatne notatki.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (1) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jak Camus opisuje Oran na poczatku powiesci? Wymien trzy cechy miasta.",
      content: {
        hints: ["brzydkie", "bez drzew", "handel"],
      },
      correctAnswer:
        "Oran jest opisany jako miasto brzydkie, bez golebii, bez drzew i ogrodow, pozbawione malowniczosci i duszy. Jego mieszkancy zajmuja sie przede wszystkim handlem i robieniem interesow. Zycie toczy sie wedlug stalych przyzwyczajen — praca, kawiarnie, kino, kapiele morskie w weekendy. Miasto jest zbudowane tylem do zatoki, wiec nie widac morza.",
      metadata: {
        explanation:
          "Opis Oranu na poczatku pelni wazna funkcje: pokazuje banalnosc, ktora zostanie rozbita przez dzume. Brak drzew, piekna i glębi duchowej symbolizuje spoleczenstwo zyjace bez refleksji — az do momentu, gdy epidemia zmusi je do zastanowienia.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (5) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kto uratowal Cottarda po probie samobojczej?",
      content: {
        options: [
          "Doktor Rieux",
          "Joseph Grand — sasiad, ktory uschlyszal halas i odcial go od sznura",
          "Jean Tarrou",
          "Ojciec Paneloux",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Grand wychodzil z domu, uslyszal halas i zobaczyl napis na drzwiach. Odcial Cottarda w pore i wezwal doktora Rieux. Od tego momentu Grand czuje sie odpowiedzialny za Cottarda i czuwa nad nim.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Co robi maly staruszek obserwowany przez Tarrou z balkonu hotelu?",
      content: {
        options: [
          "Karmi golębie na placu miejskim",
          "Wychodzi na balkon, wola koty, drze papier i pluje na nie z sila i precyzja",
          "Gra na akordeonie dla przechodniow",
          "Liczy przejeżdżajace tramwaje i notuje wyniki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Maly staruszek to jedna z ulubionych postaci Tarrou. Codziennie o tej samej porze wychodzi na balkon, wabi koty, drze papier na kawałki, a gdy koty sie zbliżają — pluje na nie z duzą precyzja i smieje sie, gdy trafia. Gdy dżuma zabiera koty (zastrzelone przez patrole), staruszek popada w smutek.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Co doktor Richard, sekretarz syndykatu lekarzy, sadzil o epidemii?",
      content: {
        options: [
          "Od poczatku twierdzil, ze to dzuma, i zadal natychmiastowych srodkow",
          'Wahal sie, uwazal, ze nie nalezy panikować, unikal slowa "dzuma" i proponowal ostrozne formy: "goraczka z komplikacjami pachwinowymi"',
          "Natychmiast opuscil Oran, zostawiajac pacjentow",
          "Twierdzil, ze to zatrucie pokarmowe, nie choroba zakazna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Richard reprezentuje postawe biurokratycznej ostroznosci — odmawia nazwania choroby po imieniu, bo oficjalne orzeczenie "zmuszaloby do zastosowania bezlitosnych srodkow". Rieux ripostuje: "Nie chodzi o to, by malowac w czarnych kolorach. Chodzi o to, by przedsięwziac srodki ostroznosci."',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Jak zmienil sie sedzia Othon po smierci syna?",
      content: {
        options: [
          "Opuscil Oran i wrocil do Francji",
          "Po zakonczeniu kwarantanny poprosil o powrot do obozu jako ochotnik — chcial byc blizej syna",
          "Zaczal glosic kazania religijne w zastepstwie Paneloux",
          "Nie zmienil sie wcale — pozostal sztywny i oficjalny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Othon, dotychczas sztywny i oficjalny sedzia-"sowa", po smierci synka calkowicie sie zmienia. Po zakonczeniu kwarantanny prosi o powrot do obozu internowanych jako ochotnik: "Czulbym sie blizej mego chlopca". Rieux dostrzega w jego oczach nowa lagodnosc. Ostatecznie Othon takze umiera na dzume.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Kto pomagal Rambertowi w organizacji ucieczki z Oranu?",
      content: {
        options: [
          "Doktor Rieux i prefekt",
          "Cottard, ktory znal siec przemytnikow — oraz Garcia, Raoul, Gonzales, Marcel i Louis",
          "Tarrou i oddzialy sanitarne",
          "Ojciec Paneloux i parafie koscielne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rambert probowal ucieczki kanałami nielegalnym. Cottard skontaktowal go z Garcią, ten z Raoulem, a Raoul z dwoma mlodymi straznikami — Marcelem i Louisem. Plan wielokrotnie sie komplikowal: spotkania nie dochodziły do skutku, dzielnice byly zamykane, straznikow zmieniano. Ostatecznie Rambert zrezygnowal z ucieczki.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Ktore z ponizszych scen wystepuja w powiesci?",
      content: {
        options: [
          'Spektakl operowy "Orfeusza i Eurydyki", podczas ktorego spiewak pada na scene',
          "Nocna kapiel Rieux i Tarrou w morzu",
          "Bunt wiezniow i ich ucieczka z obozu internowania",
          "Grand mdleje na ulicy w Wigilie i ledwo przetrywa dzume",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Opera (spiewak pada, publicznosc ucieka), kapiel w morzu (Rieux i Tarrou po nocnej rozmowie) oraz choroba Granda (mdleje pod Boze Narodzenie, cudownie wraca do zdrowia) — to sceny z powiesci. Bunt wiezniow nie wystepuje — sa rozruchy przy bramach miasta, ale nie ucieczka wiezniow.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Uzupelnij zdania, wybierajac poprawne opcje:",
      content: {
        textWithGaps:
          "Tarrou prowadzi (1), w ktorym opisuje zycie miasta. Stary astmatyk mierzy czas za pomoca (2). Grand pracuje nad jednym (3) przez cala powiessc.",
        gaps: [
          {
            id: 1,
            options: [
              "oficjalna kronikę dla prefektury",
              "prywatny notatnik",
              "dziennik religijny",
              "pamietnik dla syna",
            ],
          },
          {
            id: 2,
            options: [
              "zegara slonecznego",
              "dwoch garnkow z grochem",
              "klepsydry",
              "kalendarza",
            ],
          },
          {
            id: 3,
            options: [
              "raportem statystycznym",
              "listem do zony",
              "zdaniem o amazonce jadacej alejami Lasku Bulonskiego",
              "przemowieniem dla prefekta",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 2],
      metadata: {
        explanation:
          'Tarrou prowadzi prywatny notatnik (kronikę pisze Rieux). Stary astmatyk odmierza czas przesypujac groch z garnka do garnka. Grand szlifuje zdanie: "W piekny poranek majowy smukla amazonka, siedzac na wspanialej kasztance, jechala kwitnacymi alejami Lasku Bulonskiego".',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Ktore formy ograniczenia wolnosci dotknely mieszkancow Oranu?",
      content: {
        options: [
          "Zakaz opuszczania miasta — zamkniete bramy strzeżone przez żandarmów",
          "Ograniczenie korespondencji — listy zabronione, tylko telegramy",
          "Calkowity zakaz wychodzenia z domow przez caly dzien",
          "Zaciemnienie i godzina policyjna od jedenastej wieczor",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Bramy zamknieto, korespondencje ograniczono do telegramow, wprowadzono zaciemnienie i godzine policyjną. Nie bylo calkowitego zakazu wychodzenia — ludzie mogli chodzic po miescie w ciagu dnia, chodzili do kawiarni, kin i restauracji. Ograniczano natomiast poruszanie sie noca.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Opisz krotko rodzine pana Othona wedlug notatek Tarrou.",
      content: {
        hints: ["sowa", "czarna mysz", "tresowane psy"],
      },
      correctAnswer:
        'Tarrou opisuje rodzine Othona z ironia: ojciec-sedzia to "dobrze wychowana sowa" — wysoki, chudy, w sztywnym kolnierzyku, z lysym srodkiem czaszki. Zona to "czarna mysz" — drobna i cicha. Dwojka dzieci (chlopiec i dziewczynka) wygladaja jak "tresowane pudle" — ubrane elegancko, karnie siedzace przy stole. Othon recytuje "uprzejme zlosliwosci" pod adresem zony i "zdania o charakterze ostatecznym" do dzieci: "Nicole jest w najwyzszym stopniu antypatyczna!"',
      metadata: {
        explanation:
          "Opis rodziny Othona to jeden z najzabawniejszych fragmentow notatek Tarrou. Sluzy jako kontrast: sztywny, bezduszny sedzia po smierci syna stanie sie postacia wzruszajaca i ludzka.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Kim jest Gonzales i jaka role pelni w watku ucieczki Ramberta?",
      content: {},
      correctAnswer:
        "Gonzales to gracz w pilke nozna (srodkowy napastnik), z ktorym Rambert umawia sie przez posrednikow (Garcię i Raoula). Gonzales zna dwoch mlodych straznikow — Marcela i Louisa — ktorzy moga otworzyc droge przez bramy. Kontakty z Gonzalesem sa wielokrotnie przerywane, bo zamykane sa calye dzielnice. Gonzales kopie kamyki na ulicy, celujac w otwory scieków, i mowi o pilce noznej — to jedyny temat, ktory naprawde go ozywia.",
      metadata: {
        explanation:
          "Gonzales jest postacia epizodyczna, ale wazna fabularnie — to ostatnie ogniwo lancucha kontaktow prowadzacych do ucieczki. Jego pasja do pilki noznej humanizuje swiaty przemytu i kontrabandy.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Dlaczego Rieux odmawia wydania Rambertowi zaswiadczenia o zdrowiu?",
      content: {},
      correctAnswer:
        "Rieux tllumaczy, ze nie moze zaswiadczyc, iz Rambert nie ma dzumy, poniewaz miedzy wizyta w gabinecie a wizyta w prefekturze dziennikarz moze zostac zarazony. Poza tym nawet gdyby wydal zaswiadczenie, nie przydaloby sie ono na nic — w miescie tysiace ludzi jest w tym samym polozeniu, a mimo to nie mozna im pozwolic wyjechac. Rieux nie odmawia ze zlosliwosci, lecz z uczciwosci: nie chce dawac falszywyych gwarancji.",
      metadata: {
        explanation:
          'Scena ta ustanawia postawe Rieux wobec Ramberta: szacunek, ale odmowa robienia wyjatkow. Rieux mowi: "Tu chodzi o dobra wole" — ale system (dzuma) nie uznaje dobrych woli. To zapowiada temat abstrakcji.',
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (4) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Jaka ewolucje przechodzi Rambert w ciagu powiesci?",
      content: {
        options: [
          "Zaczyna jako bohater i konczy jako tchorz",
          "Zaczyna jako indywidualista walczacy o prywatne szczescie, a konczy jako czlonek wspolnoty — rezygnuje z ucieczki i dolacza do formacji sanitarnych",
          "Zaczyna jako ateista i konczy jako wierzacy pod wplywem Paneloux",
          "Nie przechodzi zadnej ewolucji — od poczatku walczy z dzuma",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Rambert przechodzi od indywidualizmu do solidarnosci. Na poczatku mowi: "Nie jestem stad" i walczy o prywatne szczescie (powrot do zony). Ale po wizycie w szpitalu i rozmowach z Rieux i Tarrou zrozumial: "Moze byc wstyd, ze czlowiek jest sam tylko szczesliwy". Jego ewolucja ilustruje teze Camusa, ze dzuma jest "sprawa nas wszystkich".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Co Tarrou notuje o zachowaniu mieszkancow Oranu w szczycie epidemii?",
      content: {
        options: [
          "Ze ludzie stali sie bardziej pobozni i spedzaja czas w kosciolach",
          "Ze ludzie pija duzo, trafia sie im w jedzeniu i rozrywkach, zyja na pelnych obrotach — jakby probowali przezywac intensywnie każdy dzien, bo moze byc ostatni",
          "Ze ludzie z calkowitym spokojem akceptuja swoj los",
          "Ze ludzie organizuja strajki i demonstracje przeciwko prefekturze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tarrou opisuje goraczke zycia: "Alkohol zdrowiu sprzyja, zabija bakcyla" — glosi wywieszcka w kawiarni. Ludzie trwonia pieniadze, jedza w drogich restauracjach, pija bez umiaru. Wieczorami tlum wypelnia ulice w poszukiwaniu ciepla ludzkiego. To reakcja na bliskosc smierci — intensywnosc zycia jako bunt wobec zagłady.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Dlaczego narrator uwaza, ze "dwa i dwa to cztery" jest wazna prawda w kontekscie walki z dzuma?',
      content: {
        options: [
          "Bo lekarze potrzebuja dokladnych obliczen statystycznych",
          'Bo walka z dzuma to kwestia prostej logiki i uczciwosci — trzeba stwierdzac oczywiste fakty ("to jest dzuma", "trzeba izolowac chorych") nawet gdy inni nie chca ich przyjac do wiadomosci',
          "Bo Grand jest matematykiem i uczy dzieci w szkole",
          "Bo prefekt wymaga raportow liczbowych co tydzien",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Narrator pisze: "Nie gratuluje sie nauczycielowi, jesli uczy, ze dwa i dwa to cztery". Sens: walka z dzuma to nie heroizm, lecz prosta uczciwosc — stwierdzanie faktow, robienie tego, co oczywiste. Ludzie z formacji sanitarnych "wiedzieli, ze byla to jedyna rzecz do zrobienia: nie wejsc do nich to dopiero byloby niewiarygodne".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Jaki zabieg kompozycyjny stosuje Camus, umieszczajac akcje w roku "194." bez ostatniej cyfry?',
      content: {
        options: [
          "Jest to blad w rekopisie, ktory wydawca nie poprawil",
          "Jest to celowe zatarcie daty — sygnal parabolicznosci: historia Oranu mogla wydarzyc sie w kazdym roku i kazdym miejscu, jest uniwersalna",
          "Oznacza, ze akcja rozgrywa sie w przyszlosci",
          "Wskazuje na tajnosc dokumentow, z ktorych korzysta narrator",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Zatarcie daty to jeden z kluczowych sygnalow parabolicznosci. Razem z mottem z Defoe i uniwersalnoscia postaw bohaterow mówi czytelnikowi: nie chodzi o konkretna epidemie, lecz o kazda forme zła, ktora moze dotknac ludzkość. Podobne zabiegi stosuja inne parabole — np. "Proces" Kafki (nieokreslone miasto i czas).',
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (3) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Polacz bohaterow z ich kluczowymi wypowiedziami:",
      content: {
        matchingType: "quotes_to_works",
        leftColumn: [
          { id: "A", text: '"Chcialbym nauczyc sie wypowiadac"' },
          { id: "B", text: '"Mam wstret do wyrokow smierci"' },
          {
            id: "C",
            text: '"Co to jednak znaczy — dzuma? To zycie, ot i wszystko"',
          },
          { id: "D", text: '"Nie jestem stad"' },
        ],
        rightColumn: [
          { id: "1", text: "Tarrou — o zrodle swojego buntu" },
          { id: "2", text: "Rambert — prosze o prawo wyjazdu" },
          { id: "3", text: "Grand — o trudnosci ze slowami" },
          { id: "4", text: "Stary astmatyk — filozofia zyciowa" },
        ],
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      metadata: {
        explanation:
          'Grand chce "nauczyc sie wypowiadac" — cale jego zycie to walka ze slowami. Tarrou ma "wstret do wyrokow smierci" — to fundament jego postawy. Stary astmatyk rownowazy dzume z zyciem — filozofia biernej akceptacji. Rambert powtarza "nie jestem stad" — argumentujac za prawem do wyjazdu.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Ktore elementy "Dzumy" nawiazuja do doswiadczen II wojny swiatowej?',
      content: {
        options: [
          "Zamkniecie miasta = okupacja, izolacja ludnosci pod terrorem",
          "Obozy kwarantanny i internowania = obozy koncentracyjne",
          "Formacje sanitarne = ruch oporu, walka podziemna ze zlem",
          "Bitwa morska pod Oranem miedzy flotami francuskaa i brytyjska",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Camus pisal "Dzume" w latach 1941-1947, w kontekscie okupacji Francji. Zamkniete miasto = okupacja, izolacja = utrata wolnosci, obozy = obozy jenieckie/koncentracyjne, formacje sanitarne = ruch oporu. Bitwa morska pod Oranem (1940, operacja Catapult) nie jest tematem powiesci.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Ktore z ponizszych stwierdzen o smierci Tarrou sa prawdziwe?",
      content: {
        options: [
          "Tarrou zachorowal na dzume tuz przed koncem epidemii",
          "Rieux pielegnował go w swoim domu zamiast w szpitalu",
          "Tarrou wyzdrowiał dzieki surowicy Castela",
          "Przy lozku Tarrou czuwala matka Rieux",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Tarrou zachorowal pod koniec epidemii, Rieux zatrymał go w domu (zamiast szpitalnej izolacji — akt przyjaźni). Matka Rieux czuwala przy łóżku. Tarrou NIE wyzdrowiał — umarl po calej nocy walki z choroba. Rieux pisze: "Tarrou przegral partie".',
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jak ewoluowaly pogrzeby w miare trwania epidemii? Opisz co najmniej trzy etapy.",
      content: {
        instruction:
          "Odwolaj sie do zmian w ceremoniale, transporcie i miejscach pochowku.",
      },
      correctAnswer:
        "Etapy: 1) Poczatek — przyspieszony pogrzeb: cialo umyte, trumna zamknieta, rodzina podpisuje dokumenty, auto wiezie na cmentarz, ksiadz odprawia krotki obrzad. 2) Srodek — trumny wielorazowe: ciala ladowane grupowo, wozzone w ambulansach, opróżniane do dolow, dezynfekcja trumien, krewni usuwani z ceremonii. 3) Szczyt — kremacja: doly przepelnione, wywłaszczono stare groby, uzyto pieca krematoryjnego za miastem. Tramwaje bez pasazerow wozily trupy skalna droga nadmorska. Mieszkancy rzucali kwiaty do srodka przejezdzajacych tramwajow. Dym z pieca unosil sie nad dzielnicami wschodnimi.",
      metadata: {
        explanation:
          "Ewolucja pogrzebow to jeden z najwazniejszych motywow czesci IV. Camus pokazuje, jak system (administracja, skuteczność) stopniowo odbiera smierci ludzkii wymiar — az trupy wozi sie tramwajami jak towary.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Co sie stalo z Josephem Grandem pod Boze Narodzenie?",
      content: {},
      correctAnswer:
        'Grand placze pod sklepem przybranym na swieta — wspomina Jeanne, swoja dawna zone. Rieux znajduje go na ulicy, placzacego i trzesacego sie. Grand mdleje z goraczka — ma objawy dzumy plucnej. Przed utrata przytomnosci blaga, by spalono jego rekopis (szlifowane zdanie). Rieux wrzuca kartki do ognia. Ale wbrew wszelkim regułom Grand wraca do zdrowia nastepnego dnia — co jest jednym z pierwszych znakow cofania sie epidemii. Po wyzdrowieniu mowi: "Nie mialem racji. Ale zaczne na nowo".',
      metadata: {
        explanation:
          'Choroba i cudowne wyzdrowienie Granda to punkt zwrotny powiesci — pierwszy sygnał, ze dzuma slabnie. Spalenie rekopisu jest symboliczne: Grand poswiecił to, co najcenniejsze, ale przeżył i "zaczyna na nowo" — co streszcza przeslanie calej powiesci.',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Jaka role pelnia notatki Tarrou w kompozycji powiesci?",
      content: {},
      correctAnswer:
        'Notatki Tarrou stanowia drugie zrodlo narracji obok kroniki Rieux. Pelnia kilka funkcji: 1) Dostarczaja innej perspektywy — Tarrou obserwuje detale, ktore Rieux pomija (mały staruszek z kotami, rodzina Othona, kasjer hotelu). 2) Wprowadzaja ton osobisty — notatki sa subiektywne, ironiczne, czasem poetyckie, podczas gdy Rieux dazy do obiektywnosci. 3) Buduja portret Tarrou jako postaci — pozwalaja poznac jego filozofie zanim sam ja wyjawi. 4) Uzupelniaja fabuły o "historię tego, co nie ma historii" — codzienność podczas epidemii, drobne gesty, absurdy.',
      metadata: {
        explanation:
          'Notatki Tarrou to wazny element kompozycji — tworzą polifonię narracyjna. Na maturze pojawia się pytanie o konstrukcje narracji w "Dzumie" i role roznych zrodel (kronika Rieux, notatki Tarrou, dokumenty, zeznania).',
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          'Motyw rozlaki i wygnania w "Dzumie" — jak epidemia zmienia psychike rozlaczonych?',
        requirements: [
          "Wymien co najmniej trzy przyklady rozlaki (Rieux, Rambert, ogol mieszkancow)",
          "Opisz etapy psychologiczne: od bolu, przez otepienie, do zobojętnienia",
          'Wyjasnij, dlaczego narrator mowi o "wygnaniu we wlasnym domu"',
          "100-150 slow",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        'Notatka powinna: Rieux — zona w sanatorium, komunikacja przez depesze, na koncu smierć. Rambert — partnerka w Paryzu, desperacka proba ucieczki, ostatecznie rezygnacja. Ogol — rodziny rozdzielone zamknieciem bram, kontakt przez 10 slow telegramu. Etapy: 1) Ostry bol rozlaki, zylwe wspomnienia. 2) Stopniowe blakniecie pamieci — twarze bliskich staja sie "bezcielesne". 3) Otepienie — ludzie przestaja cierpiec indywidualnie, wchodza w "rytm dzumy". "Wygnanie we wlasnym domu" — bo ludzie sa w swoim miescie, ale odcięci od tego, co stanowilo ich zycie: bliskich, wolnosci, przyszlosci.',
      metadata: {
        explanation:
          "Motyw rozlaki zajmuje znaczna czesc II czesci powiesci. Camus analizuje psychologie rozlaczonych z precyzja kliniczna — od bolu, przez nadzieje, po zobojętnienie.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (3) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Dlaczego Cottard jest jedynym bohaterem, ktoremu dzuma "dogadza"?',
      content: {
        options: [
          "Poniewaz jest lekarzem i zarabia na epidemii",
          'Poniewaz przed dzuma grozilo mu aresztowanie — w chaosie epidemii policja nie prowadzi dochodzen, a Cottard czuje sie bezpieczny i rowny innym: "wreszcie wszyscy sa w jednym worku"',
          "Poniewaz jest immiigrantem i chce, by Francuzi cierpieli",
          "Poniewaz wierzy, ze dzuma jest kara Boza za grzechy innych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Cottard to czlowiek "z ciezarem na sumieniu" — ciazy nad nim stare sledztwo. Dzuma go wyzwala: w zarazonym miescie nikt nie prowadzi dochodzen, a wszyscy boja sie tak jak on bał sie wczescniej. Tarrou pisze: "to czlowiek, ktory rosnie" — Cottard odzywa w chorobie. Gdy epidemia sie konczy, wpada w panike i strzela do ludzi.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Jakie znaczenie ma scena finalowa z Cottardem?",
      content: {
        options: [
          "Cottard ucieka z Oranu i nigdy nie zostaje zlappany",
          'W dniu otwarcia bram Cottard strzela z okna do przechodniow, zostaje pobity i aresztowany — symbolizuje powrot porzadku prawnego i koniec "wolnosci" dawaanej przez dzume',
          "Cottard przeprasza za swoje czyny i dolacza do formacji sanitarnych",
          "Cottard popelnia samobojstwo, powtarzajac swoją probe z poczatku powiesci",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Cottard, wiedzac ze koniec dzumy oznacza powrot policji i dochodzen, szaleje — zamyka sie w mieszkaniu i strzela do ludzi na ulicy. Policja go aresztuje, bijac go piescciami. Rieux odwraca wzrok. Scena to kontrast z powszechna radoscia — przypomina, ze nie dla wszystkich wyzwolenie jest szczesliwe.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Jaka funkcje pelni zdanie Granda o amazonce w strukturze powiesci?",
      content: {
        options: [
          "Jest komicznym przerywnikiem bez glebszego sensu",
          'Symbolizuje dazenie do doskonalosci i poszukiwanie wlasciwego slowa — Grand robi to samo co Camus jako pisarz i co Rieux jako lekarz: probuje "dokladnie oddac obraz" rzeczywistosci, wiedzac, ze nigdy nie bedzie doskonały',
          "Jest cytatem z innej powiesci, do ktorej Camus nawiazuje",
          "Sluzy wylacznie charakterystyce Granda jako czlowieka umyslowo chorego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Zdanie o amazonce to metafora pisarstwa samego Camusa i kazdej twórczosci: szlifowanie, poprawianie, poszukiwanie doskonalosci — ktora jest nieosiagalna. Grand pisze tak, jak Rieux leczy: ze swiadomoscia porażki, ale z uporem. Spalenie rekopisu i "zaczynamy na nowo" to najkrótsza formuła egzystencjalizmu.',
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Ktore z ponizszych stwierdzeen o roli narratora-Rieux sa prawdziwe?",
      content: {
        options: [
          "Rieux mowi o sobie w trzeciej osobie, by zachowac obiektywnosc swiadka",
          "Korzysta z wielu zrodel: wlasne doswiadczenie, notatki Tarrou, zeznania, dokumenty",
          "Celowo ukrywa wlasne cierpienia (smierć zony, zmeczenie), by nie przeslonic cierpienia zbiorowego",
          "Napisal kronike, zeby slaawic wlasne bohaterstwo i domagac sie uznania",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Rieux-narrator: mowi w 3. osobie (obiektywnosc), zbiera zrodla (wieloglos), ukrywa osobiste cierpienia (pokora). Nie pisze dla slawy — pisze "zeby swiadczyc na korzysc zadzumionych" i "zeby nie nalezec do tych, co milczą". Jego kronika jest aktem solidarnosci, nie promocji osobistej.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Ktore konteksty historyczne i filozoficzne sa kluczowe dla interpretacji "Dzumy"?',
      content: {
        options: [
          "Doswiadczenie II wojny swiatowej i okupacji Francji (1940-1944)",
          "Filozofia egzystencjalna Camusa — absurd, bunt, solidarnosc",
          "Wojna trzydziestoletnia w Europie (1618-1648)",
          'Filozofia Camusa z "Mitu Syzyfa" — sens zycia wobec absurdu',
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Kluczowe konteksty: II wojna swiatowa (Camus pisal powiessc w 1941-1947, dzuma = metafora okupacji), egzystencjalizm (absurd, wolnosc, odpowiedzialnosc, bunt), "Mit Syzyfa" (Rieux = Syzyf: dziala bez nadziei na ostateczne zwyciestwo). Wojna trzydziestoletnia nie ma zwiazku z "Dzuma".',
      },
    },

    // ===== DIFFICULTY 4 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Porownaj Rieux i Tarrou jako dwa modele walki ze zlem. Czym sie roznia, a co ich laczy?",
      content: {},
      correctAnswer:
        'Lacza ich: obaj walczaa z dzuma czynnie, obaj sa ateistami, obaj odrzucaja heroiczna retoryke, obaj poswiecaja sie bezinteresownie. Roznice: Rieux walczy z obowiazku zawodowego i uczciwosci — "to sprawa, ktora czlowiek taki jak pan potrafi zrozumiec"; to pragmatyk, lekarz. Tarrou walczy z glebokich przekonan filozoficznych — pragnie "swietosci bez Boga", szuka "spokoju wewnetrznego", chce byc "niewinnym morderca". Rieux mowi o "nie konczacej sie klesce"; Tarrou szuka odkupienia za to, ze sam byl kiedys "zadzumiony" (zgadzal sie na kare smierci). Rieux przetrywa, Tarrou ginie — co podkresla tragizm idealizmmu wobec pragmatyzmu.',
      metadata: {
        explanation:
          "Porownanie Rieux-Tarrou to klasyczne pytanie maturalne. Kluczowe: Rieux = uczciwość zawodowa, Tarrou = bunt metafizyczny. Obaj dochodzą do tego samego punktu (solidarność), ale rozna droga.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Wyjasnij, dlaczego smierc dziecka sedziego Othona jest punktem kulminacyjnym powiesci. Jak reaguja na nia rozni bohaterowie?",
      content: {
        instruction:
          "Odwolaj sie do reakcji Rieux, Paneloux, Castela i Tarrou.",
      },
      correctAnswer:
        'Dziecko umiera mimo zastosowania nowego serum Castela — w dlugiej, męczarniowej agonii: konwulsje, krzyk, pot, goraczka. Reakcje: Castel zamknal ksiazke i patrzyl bezradnie. Tarrou otarl dziecku twarz. Paneloux kleczal i modlil sie: "Boze moj, uratuj to dziecko". Rieux wyszedl z sali — nie mogl tego zniesc — i powiedzial do Paneloux: "Ten przynajmniej byl niewinny". Scena jest kulminacyjna, bo konfrontuje wszystkich z problemem cierpienia niewinnych — centralnym pytaniem teodycei. Paneloux nie ma odpowiedzi. Rieux odmawia kochania swiata, ktory torturuje dzieci. To zderzenie stanowi rdzen filozoficzny powiesci.',
      metadata: {
        explanation:
          'Scena smierci dziecka jest jednym z najczesciej analizowanych fragmentow "Dzumy" na maturze. Kluczowe: cierpienie niewinnego podwaza zarowno religijne wyjaśnienie (Paneloux), jak i optymizm medycyny (Castel).',
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Co Tarrou opowiada Rieux o swoim ojcu i jak to doswiadczenie uformowalo jego postawe zyciowa?",
      content: {},
      correctAnswer:
        'Ojciec Tarrou byl zastepca prokuratora generalnego — "poczciwy czlowiek" z mania rozkladu jazdy Chaixa. Gdy Tarrou mial 17 lat, ojciec zabral go do sadu przysieglych. Tarrou zobaczyl oskarzonego — "rudego czlowieczka" — i zrozumial, ze ojciec zada jego smierci: "ta glowa powinna spasc". Odtad nie mogl patrzec na ojca tak samo. Uciekl z domu. Angażowal sie w politykę po stronie walczacych z systemem, ale odkryl, ze i oni skazuja na smierć. Zrozumial, ze "przez te wszystkie dlugie lata bylm zadzumionym" — ze zgadzal sie posrednio na zabijanie. Odtad postanowil "odrzucic wszystko, co z bliska czy z daleka powoduje smierć lub usprawiedliwia zabojstwo".',
      metadata: {
        explanation:
          'Spowiedz Tarrou (czesc IV, scena na tarasie) to jeden z najdluzszych monologow w powiesci. Wyjasnnia, dlaczego Tarrou pragnie "swietosci bez Boga" — chce zyc "po stronie ofiar", nigdy "po stronie zaraz".',
      },
    },

    // ===== DIFFICULTY 4 — SYNTHESIS_NOTE (2) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          'Cottard jako anty-bohater "Dzumy" — dlaczego dzuma jest dla niego wyzwoleniem?',
        requirements: [
          "Opisz sytuacje Cottarda przed epidemia (proba samobojcza, lęk przed aresztowaniem)",
          'Wyjasnij, dlaczego w czasie dzumy Cottard "rosnie" i czuje sie dobrze',
          "Zanalizuj jego zalamanie po koncu epidemii (strzaly z okna, aresztowanie)",
          "Porownaj postawe Cottarda z postawa Rieux lub Tarrou",
          "150-200 slow",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        'Notatka powinna: Przed dzuma — prooba samobojcza, ciazy nad nim sledztwo, zyje w strachu i izolacji. W czasie dzumy — odzywa: "wreszcie wszyscy sa w jednym sosie". Nie prowadzi sie dochodzen, policja zajeta epidemia, Cottard moze zyc swobodnie. Bogaci sie na kontrabandzie, bywa w restauracjach, jest towarzyski. Mowi: "Dobrze mi z dzuma". Po koncu — zalamanie: powrot porzadku = powrot sledztwa. Strzela z okna do ludzi, zostaje pobity i aresztowany. Porownanie: Rieux i Tarrou walcza Z dzuma, Cottard KORZYSTA na dzumie. Oni definiuja sie przez bunt wobec zla — on przez zgode na zło, ktore chroni go przed innym zlłem (wymiarem sprawiedliwosci). Cottard to "wspolwinowajca" — uosabia postawe ludzi, ktorym chaos sluzy.',
      metadata: {
        explanation:
          'Cottard to fascynujaca postac moralna: jedyny czlowiek, dla ktorego epidemia jest korzystna. Tarrou mowi o nim: "To czlowiek, ktory rosnie". Na maturze pojawia sie w kontekscie postaw wobec zla.',
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          'Motyw miasta w "Dzumie" — Oran jako przestrzen zamknieta, wiezienie i laboratorium postaw',
        requirements: [
          "Opisz, jak Camus kreuje Oran na poczatku (banalnosc, brzydota, brak duszy)",
          "Wyjasnij, jak zamkniecie bram zmienia przestrzen — miasto jako wiezienie",
          'Wskazz, dlaczego zamknieta przestrzen sluzy jako "laboratorium" postaw ludzkich',
          "Porownaj z motywem zamknietej przestrzeni w innym utworze",
          "150-200 slow",
        ],
        wordLimit: { min: 150, max: 200 },
      },
      correctAnswer:
        'Notatka powinna: Oran na poczatku — brzydki, banalny, "bez golębi, bez drzew", zyje handlem, jest "miastem bez podejrzen". Zamkniecie — bramy strzezone, port pusty, tramwaje jako jedyny transport, zaciemnienie noca. Miasto staje sie wiezieniem: "nawet niebo pełne gwiazd stalo sie sufitem celi". Laboratorium — zamknieta przestrzen wymusza konfrontacje z dzumą (złem): nie mozna uciec, trzeba wybrac postawe (walka, rezygnacja, oportunizm). Kazdy bohater definiuje sie wobec zamkniecia: Rambert chce uciec, Rieux walczy, Cottard kwitnie. Porownanie: "Proces" Kafki — Josef K. tez jest "zamkniety" w systemie, ktory nie daje sie zrozumiec; ale u Kafki nie ma solidarnosci (K. jest sam), u Camusa ludzie laczą sie we wspolnocie.',
      metadata: {
        explanation:
          "Motyw zamknietego miasta to topos oblezzonego miasta — czesty temat maturalny (pytania jawne 2026-2028). Kluczowe: Oran = mikrokosmos ludzkosci.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Solidarnosc ludzi w obliczu zagrozenia. Omow zagadnienie, odwolujac sie do "Dzumy" Alberta Camusa i jednego innego tekstu kultury.',
      content: {
        requirements: [
          "Zdefiniuj solidarnosc w kontekscie powiesci (formacje sanitarne, wspolna walka, rezygnacja z egoizmu)",
          "Przeanalizuj ewolucje Ramberta jako przykład drogi od indywidualizmu do solidarnosci",
          "Odwolaj sie do roli Tarrou i Granda w budowaniu wspolnoty",
          'Porownaj z innym tekstem kultury (np. "Kamienie na szaniec", "Inny swiat", "Medaliony")',
          "Minimum 300 slow",
        ],
        wordLimit: { min: 300 },
      },
      correctAnswer:
        'Rozprawka powinna: zdefiniowac solidarnosc u Camusa (nie heroizm, lecz codzienna praca — "dwa i dwa to cztery"), pokazac Ramberta (od "nie jestem stad" do "ta sprawa dotyczy nas wszystkich"), Tarrou (organizator formacji, solidarny z ofiarami), Granda (cichhy bohater, ktory "mial tylko dobre serce"). Porownanie: "Kamienie na szaniec" — solidarnosc mlodziezy w AK (bohaterstwo spektakularne vs. codzienne u Camusa); "Inny swiat" — w łagrze solidarnosc jest rzadsza, ale istnieje (Kostylew); "Medaliony" — brak solidarnosci jako forma zla. Wniosek: solidarnosc u Camusa nie jest sentymentalna — to jedyna etyczna odpowiedz na absurd.',
      metadata: {
        explanation:
          'Solidarnosc w obliczu zagrozenia to jedno z pytan jawnych na mature ustna 2026-2028 dotyczących "Dzumy".',
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Jak "Dzuma" odpowiada na pytanie: czy mozna byc swietym bez Boga?',
      content: {
        options: [
          "Powiessc potwierdza, ze mozna — Tarrou osiaga swietosc i umiera w pokoju",
          'Powiessc nie daje jednoznacznej odpowiedzi: Tarrou pragnie swietosci, ale umiera na dzume, nie osiagajac "spokoju"; Rieux mowi, ze woli "byc czlowiekiem" niz swietym — Camus sugeruje, ze swietosc bez Boga moze byc nieosiagalna, ale dazenie do niej nadaje sens zyciu',
          "Powiessc odrzuca swietosc jako pojecie bez sensu i zastepuje ja hedonizmem",
          "Powiessc pokazuje, ze tylko wiara religijna (Paneloux) moze dac czlowiekowi swietosc",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Pytanie "czy mozna byc swietym bez Boga" to centralne zagadnienie powiesci. Tarrou pragnie swietosci, ale nie dzyje dostatecznie dlugo, by ja osiagnac — umiera na dzume. Rieux mowi: "Nie ide tak daleko. Interesuje mnie zdrowie czlowieka". Camus nie odpowiada "tak" ani "nie" — pokazuje, ze samo dazenie jest wartosce, nawet jesli cel jest nieosiagalny. To logika Syzyfa: szczescliwy mimo absurdu.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        "Dlaczego Camus wybral Oran — brzydkie, banalne miasto handlowe — jako miejsce akcji?",
      content: {
        options: [
          "Poniewaz sam mieszkal w Oranie i chcial napisac autobiografie",
          'Poniewaz banalnosc Oranu podkresla uniwersalnosc paraboli: dzuma (zlo) nie spada na wyjatkowe miasta, lecz na zwyczajne — Oran "bez podejrzen" reprezentuje kazde spoleczenstwo, ktore zyje bez refleksji, az katastrofa zmusi je do zastanowienia',
          "Poniewaz Oran byl jedynym miastem w Algierii, w ktorym wybuuchla prawdziwa epidemia dzumy w XX wieku",
          "Poniewaz wydawca zakazal umieszczania akcji w Paryzu ze wzgledow cenzuralnych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Banalnosc Oranu to swiadomy wybor: "miasto bez podejrzen, to znaczy miasto calkowicie nowoczesne". Zwyczajnosc podkresla, ze zlo moze spasc na kazdego — nie potrzeba do tego miejsca wyjatkowego. Camus pisze: "Nasi wspolobywatele nie mysleli nigdy, ze nasze male miasto moze byc miejscem szczegolnie wybranym" — co czyni z Oranu symbol ludzkosci zaskoczonej katastrofa.',
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: 'Ktore stwierdzenia o przeslaniu "Dzumy" sa uzasadnione?',
      content: {
        options: [
          '"W ludziach wiecej rzeczy zasługuje na podziw niz na pogarde" — Camus jest ostatecznie humanista wierzacym w ludzi',
          '"Bakcyl dzumy nigdy nie umiera" — zlo jest stale obecne, a czujnosc moralna musi byc permanentna',
          "Powiessc naucza, ze czlowiek powinien pogodzic sie ze zlem, bo walka jest bezsensowna",
          "Sens zycia nadaje sie przez dzialanie i solidarnosc, nie przez wiare w wyzszy porzadek",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Camus jest humanista ("wiecej podziwu niz pogardy"), ostrzega przed zlym optymizmem ("bakcyl nie umiera"), proponuje sens przez dzialanie (Rieux, Tarrou, Grand). Powiessc NIE naucza pogodzenia ze zlem — wprost przeciwnie: cala jej etyka opiera sie na buncie i odmowie akceptacji cierpienia.',
      },
    },

    // ===== DIFFICULTY 5 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Porownaj "Dzume" Camusa z "Antygona" Sofoklesa w kontekscie buntu wobec porzadku swiata. Czym sie rozni bunt Rieux od buntu Antygony?',
      content: {
        instruction:
          "Uwzglednij zrodlo buntu, motywacje, stosunek do transcendencji i konsekwencje.",
      },
      correctAnswer:
        'Antygona buntuje sie wobec prawa ludzkiego (Kreona) w imie prawa boskiego — jej bunt ma oparcie w transcendencji (bogowie, prawo natury). Rieux buntuje sie wobec cierpienia i smierci BEZ oparcia w transcendencji — nie wierzy w Boga, a mimo to walczy. Motywacja Antygony: milosc do brata + obowiazek religijny. Motywacja Rieux: uczciwosc + odmowa akceptacji swiata, gdzie dzieci sa torturowane. Konsekwencje: Antygona ginie, ale wie, ze bogowie sa po jej stronie. Rieux przetrywa, ale nie ma pewnosci co do sensu walki — "zwyciestwa zawsze beda tymczasowe". Roznica fundamentalna: Antygona ma pewnosc metafizyczna (prawo boskie), Rieux nie ma żadnej — jego bunt jest samotny i "absurdalny" w sensie Camusa. Ale wlasnie ta samotnosc nadaje mu wielkosc.',
      metadata: {
        explanation:
          "Porownanie z Antygona to klasyczne zestawienie maturalne: bunt z oparciem metafizycznym (Antygona) vs. bunt bez oparcia (Rieux). Obie postacie sa szlachetne, ale ich bunty maja rozne fundamenty.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Wyjasnij, na czym polega styl narracyjny "Dzumy" i dlaczego Camus wybral forme kroniki. Jak wplywa to na odbiór powiesci?',
      content: {},
      correctAnswer:
        'Styl: 1) Kronikarski ton — narracja pozornie obiektywna, sprawozdawcza, bez patosu. Rieux celowo unika emocjonalnych opisow na rzecz faktow, statystyk, relacji. 2) Trzecia osoba — dystans narratora do samego siebie. 3) Wieloglososc — obok kroniki Rieux sa notatki Tarrou (subiektywne, ironiczne), zeznania swiadkow, dokumenty. 4) Brak psychologizmu — bohaterowie sa raczej modelami postaw niz glebokimi postaciami psychologicznymi (cecha paraboli). Forma kroniki: Camus wybral ja, bo kronika udaje dokument — wzmacnia wiarygodnosc paraboli. Czytelnik czyta "relacje", nie "powiessc", co sprawia, ze traktuje historia serio. Efekt: styl suchy, pozornie chlodny — ale wlasnie dlatego momenty emocjonalne (smierc dziecka, smierc Tarrou, Grand placzacy pod sklepem) uderzaja z ogromna sila na tle kroniczarskiej powsciagliwosci.',
      metadata: {
        explanation:
          "Pytanie o styl narracyjny to typowe pytanie LANGUAGE_USE na maturze rozszerzonej. Kluczowe: forma kroniki to swiadomy wybor stylistyczny — pozorna obiektywnosc poteguje emocjonalny efekt.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question: "Napisz notatke syntetyczna na podany temat:",
      content: {
        topic:
          '"Dzuma" jako manifest nowego humanizmu — jak Camus definiuje czlowieczenstwo po doswiadczeniu II wojny swiatowej?',
        requirements: [
          'Wyjasnij, dlaczego "Dzume" okrzyknięto "manifestem nowego humanizmu" po publikacji',
          "Wskazz, na czym polega humanizm Camusa: solidarnosc, uczciwosc, bunt, odrzucenie heroicznej retoryki",
          "Porownaj z tradycyjnym humanizmem (wiara w postep, rozum, doskonalenie) — co Camus odrzuca?",
          "Odwolaj sie do kontkstu II wojny i pytania: czy po Auschwitz mozna byc humanista?",
          "200-250 slow",
        ],
        wordLimit: { min: 200, max: 250 },
      },
      correctAnswer:
        'Notatka powinna: "Dzuma" jako nowy humanizm — nie opiera sie na wierze w postep ani doskonalosc czlowieka, lecz na "prostej ludzkiej solidarnosci i moralnosci, bez patosu i wielkich slow" (jak piszą krytycy). Humanizm Camusa: solidarnosc (formacje sanitarne), uczciwosc ("robic, co nalezy"), bunt (odmowa akceptacji cierpienia), pokora ("nie chodzi o heroizm, chodzi o dwa i dwa to cztery"). Co Camus odrzuca z tradycyjnego humanizmu: optymizm co do natury ludzkiej ("kazdy nosi w sobie dzume"), wiare w postep (epidemia wroci), ideologie ("cale nieszcze ludzi plynie stad, ze nie mowia jasnym jezykiem"). Kontekst II wojny: po Auschwitz wiara w rozum i doskonalosc czlowieka jest nie do utrzymania. Camus proponuje humanizm bez iluzji: "w ludziach wiecej rzeczy zasługuje na podziw niz na pogarde" — ale nie dlatego, ze czlowiek jest z natury dobry, lecz dlatego, ze MOZE dokonywac dobrych wyborow mimo absurdu. To humanizm syzyfowy — szlachetny i tragiczny zarazem.',
      metadata: {
        explanation:
          'Pytanie o "nowy humanizm" to wazny kontekst maturalny. Kluczowe: Camus po Auschwitz nie moze byc naiwnym humanista — proponuje humanizm oparty na buncie i solidarnosci, nie na optymizmie.',
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "CONTEMPORARY",
      work: "Dżuma",
      question:
        'Czlowiek wobec cierpienia i smierci. Rozważ problem, odwolujac sie do "Dzumy" Alberta Camusa i jednego innego tekstu kultury.',
      content: {
        thesis: "Cierpienie i smierc jako probierz czlowieczenstwa",
        structure: {
          introduction:
            "Przedstaw problem: jak cierpienie odsłania prawde o czlowieku — jego slabosci i wielkosc?",
          arguments_for:
            'Podaj przyklady postaw wobec cierpienia w "Dzumie": Rieux (walka), Tarrou (bunt), Paneloux (wiara), Cottard (oportunizm)',
          arguments_against:
            'Rozważ, czy cierpienie moze nie miec zadnego sensu — ani ksztalcacego, ani oczyszczajacego (Rieux: "nigdy nie bede kochał tego swiata, gdzie dzieci sa torturowane")',
          conclusion:
            "Sformuluj wniosek: czy cierpienie uczy, niszczy, czy obydwa — i jak Camus proponuje reagowac?",
        },
        requirements: [
          "Przeanalizuj scene smierci dziecka Othona jako kulminacje problemu cierpienia",
          "Odwolaj sie do filozofii absurdu i buntu Camusa",
          'Porownaj z innym tekstem kultury (np. Ksiega Hioba, "Inny swiat", "Antygona", "Medaliony")',
          'Sformuluj wlasne stanowisko wobec tezy, ze cierpienie "uszlachetnia"',
          "Minimum 400 slow",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        'Rozprawka powinna: Postawy wobec cierpienia: Rieux — odmowa akceptacji, walka mimo beznadziejnosci; Tarrou — bunt i pragnienie niewinnosci; Paneloux — ewolucja od wyjasnnia (kara Boza) do wiary totalnej; Cottard — ucieczka w oportunizm. Scena smierci dziecka: kulminacja — cierpienie niewinnego podwaza wszelkie racjonalizacje. Rieux krzyczy: "ten przynajmniej byl niewinny". Camus odrzuca ide, ze cierpienie "uszlachetnia" — to zdanie Paneloux z I kazania, ktore sam potem porzuca. Porownanie: Ksiega Hioba — Hiob cierpi niewinnie, Bog odpowiada tajemnicza; u Camusa nie ma Boga, ktory odpowiada. "Inny swiat" — Herling pokazuje, ze cierpienie w łagrze degraduje, ale jednoczesnie wyostrza moralnosc. "Antygona" — cierpienie wynika z konfliktu wartosci, ma sens tragiczny. Stanowisko: cierpienie nie uszlachetnia automatycznie — u Camusa moze zniszczyc (Paneloux umiera) lub obudzic (Rambert zmienia sie). Jedyną wlasciwa odpowiedzia jest bunt i solidarnosc — nie akceptacja.',
      metadata: {
        explanation:
          '"Czlowiek wobec cierpienia i smierci" to jedno z pytan jawnych na mature ustna 2026-2028 dotyczacych "Dzumy". Kluczowe: Camus NIE gloryfikuje cierpienia — odrzuca ide "uszlachetniajacego bolu" na rzecz buntu.',
      },
    },

    // ======================= KONIEC PYTAN DZUMA — ZESTAW 2 ===================//

    // ======================= KONIEC PYTAŃ DŻUMA ===================//
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
