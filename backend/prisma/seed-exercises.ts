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
      work: "Inny świat",
      question: "Kto jest autorem \u201EInnego świata\u201D?",
      content: {
        options: [
          "Gustaw Herling-Grudziński",
          "Tadeusz Borowski",
          "Aleksander Sołżenicyn",
          "Primo Levi",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "\u201EInny świat\u201D to dzieło Gustawa Herlinga-Grudzińskiego, oparte na jego osobistych doświadczeniach z sowieckiego łagru w Jercewie. Książka powstała w latach 1949\u20131950.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "W jakim obozie przebywał narrator \u201EInnego świata\u201D?",
      content: {
        options: [
          "W Oświęcimiu",
          "Na Kołymie",
          "W łagrze w Jercewie pod Archangielskiem",
          "W Dachau",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Narrator trafił do sowieckiego łagru (obozu pracy przymusowej) w Jercewie, w obwodzie archangielskim, na północy Rosji. To tam rozgrywa się większość akcji utworu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Skąd pochodzi motto \u201EInnego świata\u201D, zaczynające się od słów: \u201ETu otwierał się inny, odrębny świat, do niczego niepodobny\u2026\u201D?",
      content: {
        options: [
          "Z \u201EArchipelagu Gułag\u201D Aleksandra Sołżenicyna",
          "Z \u201EZapisków z martwego domu\u201D Fiodora Dostojewskiego",
          "Z \u201EBraci Karamazow\u201D Fiodora Dostojewskiego",
          "Z \u201EZbrodni i kary\u201D Fiodora Dostojewskiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Motto pochodzi z \u201EZapisków z martwego domu\u201D Dostojewskiego, który opisywał pobyt na carskiej katordze. Grudziński świadomie nawiązuje do tradycji rosyjskiej literatury więziennej, ukazując ciągłość systemu represji.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Za co narrator został aresztowany przez NKWD?",
      content: {
        options: [
          "Za udział w powstaniu warszawskim",
          "Za działalność w Armii Krajowej",
          "Za kradzież dokumentów wojskowych",
          "Za próbę przekroczenia granicy sowiecko-litewskiej — oskarżono go o szpiegostwo",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Herling-Grudziński został aresztowany w marcu 1940 roku przy próbie przekroczenia granicy sowiecko-litewskiej. Postawiono mu absurdalny zarzut szpiegostwa — m.in. dlatego, że miał wysokie buty, które skojarzono z obuwiem oficerskim.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Jak nazywał się więzień, który celowo przypalał sobie rękę w ogniu, by nie pracować dla systemu sowieckiego?",
      content: {
        options: [
          "Gorcew",
          "Kowal",
          "Michaił Aleksiejewicz Kostylew",
          "Rusto Karinen",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kostylew to młody Rosjanin, wychowany w kulcie komunizmu, który po rozczarowaniu systemem buntował się przez samookaleczenie — przypalał rękę, by uniknąć pracy. Jego historii poświęcony jest rozdział \u201ERęka w ogniu\u201D.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Do jakiego gatunku literackiego należy \u201EInny świat\u201D?",
      content: {
        options: [
          "Literatura faktu — powieść autobiograficzna łącząca cechy pamiętnika, reportażu i eseju",
          "Dramat psychologiczny",
          "Powieść przygodowa",
          "Powieść fantasy",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "\u201EInny świat\u201D to wypowiedź wielogatunkowa: łączy elementy pamiętnika (osobiste doświadczenia), reportażu (dokumentalność), autobiografii i eseju historyczno-filozoficznego. Należy do literatury łagrowej/obozowej.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Dzięki jakiemu wydarzeniu historycznemu narrator odzyskał wolność?",
      content: {
        options: [
          "Dzięki ucieczce z obozu",
          "Dzięki amnestii dla Polaków po pakcie Sikorski-Majski",
          "Dzięki zakończeniu II wojny światowej",
          "Dzięki interwencji Czerwonego Krzyża",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Po podpisaniu paktu Sikorski-Majski (lipiec 1941) ogłoszono amnestię dla polskich więźniów w ZSRR. Narrator został zwolniony 20 stycznia 1942 roku i dołączył do armii gen. Andersa.",
      },
    },

    // --- DIFF 1 — CM (3) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Które postacie pojawiają się w \u201EInnym świecie\u201D?",
      content: {
        options: [
          "Michaił Kostylew — więzień, który przypalał sobie rękę",
          "Marusia — ofiara zbiorowego gwałtu urków",
          "Tadek — narrator-kapo z Oświęcimia",
          "Natalia Lwowna — kobieta, która pożyczyła narratorowi \u201EZapiski z martwego domu\u201D",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kostylew, Marusia i Natalia Lwowna to postacie z \u201EInnego świata\u201D. Tadek to narrator \u201EOpowiadań\u201D Tadeusza Borowskiego — nie występuje u Grudzińskiego.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Połącz postacie z ich historiami:",
      content: {
        matchingType: "characters_to_stories",
        leftColumn: [
          { id: "A", text: "Kostylew" },
          { id: "B", text: "Gorcew" },
          { id: "C", text: "Dimka" },
          { id: "D", text: "Pamfiłow" },
        ],
        rightColumn: [
          { id: "1", text: "Były pop, odrąbał sobie stopę" },
          {
            id: "2",
            text: "Stracił wolę życia, gdy syn się od niego odwrócił",
          },
          {
            id: "3",
            text: "Przypalał rękę w ogniu, popełnił samobójstwo wrzątkiem",
          },
          {
            id: "4",
            text: "Były enkawudzista, \u201Ezabity pracą\u201D przez współwięźniów",
          },
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
          "Kostylew — przypalał rękę, oblał się wrzątkiem. Gorcew — rozpoznany jako były NKWD, \u201Ezabity pracą\u201D (zamarznięty). Dimka — były pop, odrąbał sobie stopę. Pamfiłow — Kozak, stracił wolę życia po odcięciu się syna Saszy.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Które miejsca w łagrze Jercew pełniły szczególną rolę w życiu więźniów?",
      content: {
        options: [
          "Trupiarnia — barak dla nieuleczalnie chorych, skazanych na śmierć z głodu",
          "Dom Swidanij — barak, w którym więźniowie mogli spotkać się z rodziną",
          "Szpital — jedyne miejsce z czystym łóżkiem i większą racją jedzenia",
          "Biblioteka uniwersytecka — z bogatym księgozbiorem europejskim",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Trupiarnia, Dom Swidanij i szpital to kluczowe miejsca łagru. Trupiarnia = \u201Eemerytura\u201D (śmierć). Dom Swidanij = rzadkie widzenia z rodziną. Szpital = jedyna \u201Eoaza\u201D. Biblioteki uniwersyteckiej w łagrze nie było.",
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
      work: "Inny świat",
      question: "Co to były \u201Enocne łowy\u201D w łagrze?",
      content: {
        options: [
          "Nocne polowania na zwierzynę w lesie przez więźniów",
          "Potajemne handlowanie żywnością",
          "Nocne ucieczki z obozu",
          "Zbiorowy gwałt urków (więźniów kryminalnych) na kobietach wychodzących po zmroku z baraku",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "\u201ENocne łowy\u201D to eufemizm na zbiorowy gwałt. W rozdziale o tym tytule urkowie pod wodzą Kowala napadli na Marusię, młodą więźniarkę, która po zmroku wyszła z baraku. To jeden z najbardziej drastycznych epizodów ukazujących degenerację moralną w łagrze.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Kim był Gorcew i jaki był jego los w obozie?",
      content: {
        options: [
          "Byłym funkcjonariuszem NKWD, który został rozpoznany przez współwięźniów — dokonali na nim samosądu, \u201Ezabijając go pracą\u201D, aż zamarł w zaspie",
          "Nauczycielem, który uczył więźniów czytać — zginął przy próbie ucieczki",
          "Lekarzem obozowym, który pomagał więźniom — zmarł na tyfus",
          "Polskim oficerem, który zorganizował bunt — rozstrzelany",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Gorcew to były enkawudzista o \u201Etępej twarzy fanatyka\u201D. Został rozpoznany w obozie jako dawny kat. Więźniowie \u201Ezabili go pracą\u201D — przydzielano mu najcięższą robotę, najgorszy kocioł, aż osłabiony zamarł w lesie. Grudziński komentuje: \u201Erzucono lwa na pożarcie niewolnikom\u201D.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Dlaczego Kostylew rozczarował się komunizmem?",
      content: {
        context:
          "Kostylew wychowywał się w ślepej wierze w system sowiecki, wpojonej przez ojca. Na studiach w Akademii Morskiej we Władywostoku przypadkiem trafił do prywatnej wypożyczalni książek.",
        options: [
          "Bo zobaczył bogactwo zachodnich dyplomatów",
          "Bo jego ojciec zdradził ideały partii",
          "Bo dzięki lekturze literatury francuskiej (Balzac, Stendhal, Flaubert) odkrył istnienie innego świata — zrozumiał, że partia ukrywała przed nim prawdę o Zachodzie",
          "Bo został pobity przez strażników obozowych",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Kostylew przez lekturę literatury francuskiej poznał świat, o którym nie wiedział. Zrozumiał, że \u201Eukrywano przed nim całą prawdę\u201D. W dyskusji z kolegami wykrzyknął hasło \u201EWyzwolić Zachód!\u201D — za co został aresztowany i skazany na 10 lat łagru.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "W jaki sposób Kostylew popełnił samobójstwo?",
      content: {
        options: [
          "Powiesił się w baraku",
          "Oblał się wrzątkiem w łaźni, gdy dowiedział się o przeniesieniu na Kołymę",
          "Uciekł z obozu i zamarzł w lesie",
          "Odmówił jedzenia i umarł z głodu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kostylew dowiedział się, że ma zostać przeniesiony na Kołymę — co oznaczało pewną śmierć. Nie mógł się też spotkać z ukochaną matką, która właśnie jechała na widzenie. Oblał się wrzątkiem i zmarł w ogromnym cierpieniu. Narrator chciał go zastąpić, ale mu odmówiono.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Czym była \u201ETrupiarnia\u201D w łagrze?",
      content: {
        options: [
          "Kostnicą dla zmarłych więźniów",
          "Miejscem, gdzie palono ciała zmarłych",
          "Izbą karną, w której katowano za przewinienia",
          "Barakiem dla więźniów zbyt słabych do pracy — teoretycznie mieli odpocząć, ale z powodu obciętych racji żywnościowych najczęściej umierali",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Trupiarnia to barak dla niepracujących więźniów — chorych, wycieńczonych. Ironicznie nazywana \u201Eemeryturą\u201D. Obcinano im racje żywnościowe, więc zamiast wyzdrowieć — umierali. Sam narrator trafił tam po proteście głodowym.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Kim była Natalia Lwowna i jaką rolę odegrała w życiu narratora?",
      content: {
        options: [
          "Kobietą pracującą w biurze rachmistrzów, o niezwykłej wrażliwości na sztukę — pożyczyła narratorowi \u201EZapiski z martwego domu\u201D Dostojewskiego",
          "Strażniczką obozową, która pomagała więźniom potajemnie",
          "Żoną komendanta obozu",
          "Lekarką, która leczyła narratora w szpitalu",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Natalia Lwowna to postać o przeciętnej urodzie, ale niezwykłej wrażliwości. Pożyczyła narratorowi \u201EZapiski z martwego domu\u201D — lektura ta wstrząsnęła Grudzińskim. Natalia czerpała siłę z przekonania, że może wybrać własną śmierć. Próbowała popełnić samobójstwo podczas koncertu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Dlaczego narrator podjął protest głodowy pod koniec pobytu w łagrze?",
      content: {
        options: [
          "Bo chciał lepsze jedzenie",
          "Bo ukarał go komendant za nieposłuszeństwo",
          "Bo po ogłoszeniu amnestii dla Polaków (pakt Sikorski-Majski) kilku Polaków, w tym narratora, pominięto przy zwalnianiu — głodówka była desperackim protestem",
          "Bo inni więźniowie go do tego namówili",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Po pakcie Sikorski-Majski zwolniono większość Polaków, ale kilku pominięto. Narrator wraz z pozostałymi podjął protest głodowy. Opuchnięty z głodu trafił do szpitala, a potem do Trupiarni. Ostatecznie został zwolniony 20 stycznia 1942 roku.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Co stało się z Ponomarenką w dniu zakończenia jego wyroku?",
      content: {
        options: [
          "Został zwolniony i wrócił do rodziny",
          "Uciekł z obozu przed świtem",
          "Przeniesiono go do innego łagru",
          "Otrzymał wiadomość o bezterminowym przedłużeniu pobytu — położył się na pryczy i zmarł na zawał serca",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Ponomarenko to jeden z najbardziej wstrząsających epizodów. W dniu, gdy miał wyjść na wolność, poinformowano go o przedłużeniu wyroku bezterminowo. Położył się na pryczy i zmarł na zawał. To obraz totalnego bezprawia systemu.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Kim byli \u201Eurkowie\u201D w łagrze?",
      content: {
        options: [
          "Więźniami politycznymi, którzy organizowali opór",
          "Więźniami kryminalnymi — złodziejami, mordercami — którzy tworzyli obozową mafię i terroryzowali pozostałych",
          "Strażnikami obozowymi niskiego szczebla",
          "Lekarzami obozowymi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Urkowie to więźniowie kryminalni, którzy w hierarchii łagrowej stali wyżej od więźniów politycznych. Tworzyli mafijne struktury, kradli, dokonywali gwałtów (\u201Enocne łowy\u201D), grali w karty o cudzą odzież (np. płaszcz Szkłowskiego). System celowo wykorzystywał ich do terroryzowania politycznych.",
      },
    },

    // --- DIFF 2 — CM (4) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Uzupełnij zdania o kompozycji \u201EInnego świata\u201D:",
      content: {
        textWithGaps:
          "Narracja jest prowadzona w (1) osobie. Kompozycja utworu jest (2) — rozpoczyna się i kończy sceną poza obozem. Styl łączy (3) obozowy ze stylem wysokim, eseistycznym.",
        gaps: [
          { id: 1, options: ["pierwszej", "trzeciej", "drugiej", "mieszanej"] },
          {
            id: 2,
            options: ["linearna", "klamrowa", "szkatułkowa", "retrospektywna"],
          },
          { id: 3, options: ["żargon", "humor", "slang", "dialekt"] },
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Narracja pierwszoosobowa (narrator = autor). Kompozycja klamrowa — więzienie w Witebsku na początku, spotkanie z byłym więźniem w Rzymie na końcu. Styl łączy slang obozowy (zona, lesopował, łagpunkt) z poetyckim językiem refleksji.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Które stwierdzenia o systemie pracy w łagrze są prawdziwe?",
      content: {
        options: [
          "Wielkość racji żywnościowej zależała od wykonanej normy pracy — im mniej pracowałeś, tym mniej jadłeś",
          "Więźniowie pracowali głównie przy wyrębie lasu (lesopowale)",
          "Praca trwała zwykle 4 godziny dziennie",
          "System \u201Ekotłów\u201D (I, II, III kocioł) dzielił więźniów na kategorie według wydajności",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Racja żywności zależała od normy (system \u201Ekotłów\u201D — I najgorszy, III najlepszy). Główna praca to wyrąb lasu. Praca trwała cały dzień (pobudka 5:30, powrót po zmroku), NIE 4 godziny.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Które formy buntu lub oporu wobec systemu opisuje Grudziński?",
      content: {
        options: [
          "Samookaleczenie — Kostylew przypalał rękę, Dimka odrąbał sobie stopę",
          "Decyzja o własnej śmierci — Natalia Lwowna, która czerpała siłę z przekonania, że może wybrać samobójstwo",
          "Zbrojna rewolta więźniów, która zakończyła się sukcesem",
          "Protest głodowy — narrator i inni Polacy po amnestii",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Grudziński opisuje różne formy buntu: samookaleczenie (Kostylew, Dimka), decyzja o samobójstwie jako akt wolności (Natalia), protest głodowy (narrator). Zbrojnej rewolty NIE było — ucieczki kończyły się złapaniem lub śmiercią.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Które stwierdzenia o losach Marusi są prawdziwe?",
      content: {
        options: [
          "Została zgwałcona zbiorowo przez urków pod wodzą Kowala",
          "Po gwałcie wróciła do baraku urków i została \u201Edziewczyną\u201D Kowala",
          "Kowal ostatecznie ją ocalił i pomógł uciec z łagru",
          "Po ponownym oddaniu przez Kowala całej ósemce urków, poprosiła o przeniesienie do innego obozu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Marusia wróciła do Kowala z własnej woli po gwałcie, co chroniło ją przed innymi urkami. Gdy jednak Kowal, pod presją towarzyszy, ponownie ją im oddał — Marusia po trzech dniach poprosiła o przeniesienie. Kowal jej NIE ocalił.",
      },
    },

    // --- DIFF 2 — SA (2) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Wyjaśnij znaczenie tytułu \u201EInny świat\u201D. Dlaczego łagier to \u201Einny świat\u201D?",
      content: {
        hints: ["motto z Dostojewskiego", "odwrócony dekalog", "inne prawa"],
      },
      correctAnswer:
        "Tytuł nawiązuje do motta z Dostojewskiego: \u201ETu otwierał się inny, odrębny świat, do niczego niepodobny\u201D. Łagier to \u201Einny świat\u201D, bo obowiązują w nim inne zasady moralne — \u201Eodwrócony dekalog\u201D: kradzież, donos, przemoc są normą, a litość i solidarność — słabością. To rzeczywistość, w której normalne ludzkie odruchy ulegają degeneracji pod wpływem głodu, strachu i terroru.",
      metadata: {
        explanation:
          "Tytuł ma wymiar filozoficzny — łagier to osobny mikrokosmos z własnymi prawami, które zaprzeczają cywilizowanym normom. Grudziński pisze: \u201ENas chcieli przyzwyczaić do innego świata\u201D.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Opisz historię \u201Ezabójcy Stalina\u201D z obozu w Jercewie.",
      content: {},
      correctAnswer:
        "Więzień trafił do łagru, bo przyjaciel doniósł na niego, że strzelał do obrazu/portretu Stalina. W obozie zachorował na kurzą ślepotę, a potem zwariował — zaczął wierzyć, że naprawdę zabił Stalina. Przed śmiercią krzyczał: \u201EJa zabiłem Stalina!\u201D. Grudziński interpretuje to jako wzięcie na siebie winy, za którą został skazany — system zdołał go złamać do tego stopnia, że zaakceptował absurdalny zarzut.",
      metadata: {
        explanation:
          "Ta historia to przykład, jak system sowiecki niszczył psychikę: torturami i izolacją doprowadzano ludzi do uwierzenia w własną \u201Ewinę\u201D, nawet gdy zarzut był absurdalny.",
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
      work: "Inny świat",
      question:
        "Grudziński formułuje w rozdziale \u201EGłód\u201D zdanie uważane za kluczowe przesłanie książki. Jak ono brzmi i co oznacza?",
      content: {
        context:
          "W rozdziale \u201EGłód\u201D narrator analizuje wpływ ekstremalnych warunków na naturę ludzką. Formułuje zdanie: \u201ECzłowiek jest ludzki w ludzkich warunkach\u201D (w innym wariancie: \u201ENie wolno człowiekowi tworzyć nieludzkich warunków, bo człowiek jest ludzki tylko w ludzkich warunkach\u201D).",
        options: [
          "Oznacza, że w nieludzkich warunkach (głód, terror, przemoc) człowiek traci zdolność do zachowań moralnych — nie dlatego, że jest z natury zły, lecz dlatego, że system celowo niszczy w nim człowieczeństwo",
          "Oznacza, że ludzie z natury są dobrzy i nic nie może ich zmienić",
          "Oznacza, że tylko silni mogą zachować moralność",
          "Jest pochwałą systemu obozowego jako szkoły przetrwania",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "To centralne przesłanie \u201EInnego świata\u201D: system łagrowy celowo tworzył warunki, w których moralność była \u201Eluksusem\u201D. Grudziński nie potępia ofiar za ich upadki — potępia system, który te upadki wymuszał. Odpowiedzialność spoczywa na twórcach \u201Enieludzkich warunków\u201D.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Jaką funkcję pełni \u201EZapiski z martwego domu\u201D Dostojewskiego w strukturze \u201EInnego świata\u201D?",
      content: {
        options: [
          "Jest luźnym nawiązaniem, bez znaczenia dla fabuły",
          "Jest ironicznym kontrapunktem — pokazuje, że w carskiej Rosji było lepiej",
          "Stanowi lustro, w którym narrator widzi ciągłość rosyjskiego systemu represji — od carskiej katorgi po sowiecki łagier. Lektura Dostojewskiego wstrząsnęła narratorem, ukazując mu, że cierpienie się powtarza przez pokolenia",
          "Służy wyłącznie jako źródło motta",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Dostojewski to nie tylko motto, ale klucz interpretacyjny. Narrator, czytając \u201EZapiski\u201D pożyczone od Natalii Lwownej, widzi z przerażającą jasnością ciągłość represji: od cara do Stalina te same mechanizmy. Natalia Lwowna komentuje: \u201Enie było przerwy między upodleniem Dostojewskiego a Rosjan żyjących w komunizmie\u201D.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Czym jest \u201Eodwrócony dekalog\u201D w \u201EInnym świecie\u201D?",
      content: {
        options: [
          "Modlitwą więźniów odmawianą nocą w baraku",
          "Metaforą opisującą system wartości łagru, w którym tradycyjne zasady moralne zostały odwrócone — kradzież, donos, egoizm stały się normą przetrwania, a litość i solidarność — niebezpieczną słabością",
          "Spisem reguł obozowych zawieszonym w baraku",
          "Tytułem rozdziału o religii w obozie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201EOdwrócony dekalog\u201D to metafora opisująca moralność łagru: nie kradnij → kradnij, by przeżyć; nie składaj fałszywego świadectwa → donoś, by zyskać lepszy kocioł; kochaj bliźniego → myśl tylko o sobie. System celowo wytwarzał warunki, w których jedynym priorytetem było przetrwanie za wszelką cenę.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Jaki ekonomiczny cel spełniały łagry sowieckie według Grudzińskiego?",
      content: {
        options: [
          "Były miejscem reedukacji ideologicznej, bez celu ekonomicznego",
          "Produkowały towary eksportowe dla zachodnich rynków",
          "Służyły wyłącznie karaniu wrogów politycznych",
          "Były kluczowym elementem ekonomicznym ZSRR — więźniowie jako niewolnicy budowali infrastrukturę Północy, wycinali lasy, pracowali w kopalniach. Oficjalna propaganda o \u201Ereedukacji\u201D była kłamstwem",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Grudziński demaskuje kłamstwo o \u201Ereedukacji\u201D: łagry to ekonomiczny filar ZSRR. Więźniowie byli darmową siłą roboczą — wycinali lasy, budowali drogi, pracowali w kopalniach. Celem nie było nawrócenie, lecz eksploatacja do śmierci i zastąpienie następnymi.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Grudziński opisuje sposób, w jaki system \u201Epreparował\u201D więźniów. Na czym to polegało?",
      content: {
        context:
          "Narrator opisuje, jak łagier metodycznie łamał psychikę więźniów: \u201EUczucia i myśli obluzowują się\u201D, \u201Epomiędzy skojarzeniami powstają luki\u201D — człowiek popadał w stan tępoty i posłuszeństwa.",
        options: [
          "Na celowym niszczeniu woli, tożsamości i uczuć więźnia przez głód, wycieńczenie i terror — aż do stanu tępej uległości, w którym człowiek przestawał myśleć i czuć",
          "Na fizycznym wzmacnianiu więźniów do ciężkiej pracy",
          "Na szkoleniu więźniów w nowych zawodach",
          "Na izolowaniu więźniów od siebie, by nie mogli rozmawiać",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "\u201EPreparowanie\u201D to systematyczne łamanie woli: głód, brak snu, praca ponad siły, terror — aż człowiek tracił zdolność do myślenia i czucia. Stawał się posłusznym narzędziem. To nie efekt uboczny, lecz celowy mechanizm systemu łagrowego.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Jaki styl narracji stosuje Grudziński w \u201EInnym świecie\u201D i dlaczego?",
      content: {
        options: [
          "Sentymentalny i emocjonalny — by wzbudzić litość czytelnika",
          "Powściągliwy, rzeczowy, łączący dokumentalną precyzję ze stylem eseistycznym i poetyckim — surowość opisu podkreśla grozę faktów, a refleksja nadaje im wymiar filozoficzny",
          "Humorystyczny — by złagodzić ciężar tematu",
          "Chaotyczny i urywany — bo pisał z pamięci, bez notatek",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Styl Grudzińskiego łączy trzy płaszczyzny: biograficzną (fakty), psychologiczną (analiza zachowań) i filozoficzną (refleksja o człowieczeństwie). Powściągliwość jest świadomym wyborem — Grudziński \u201Eopisuje nieludzkie cierpienia tak, jak gdyby stanowiły tylko naturalną część ludzkiego losu\u201D (to jego komentarz o Dostojewskim, ale dotyczy też jego samego).",
      },
    },

    // --- DIFF 3 — CM (4) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Które motywy literackie są kluczowe w \u201EInnym świecie\u201D?",
      content: {
        options: [
          "Motyw dehumanizacji — sprowadzania człowieka do narzędzia pracy",
          "Motyw buntu jako obrony godności — nawet gdy bunt jest daremny (Kostylew, Dimka, protest głodowy)",
          "Motyw miłości romantycznej jako drogi do szczęścia",
          "Motyw \u201Eodwróconego dekalogu\u201D — załamania moralności w ekstremalnych warunkach",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kluczowe motywy: dehumanizacja (praca niewolnicza), bunt (Kostylew, Dimka, głodówka), odwrócony dekalog. Miłość romantyczna NIE jest motywem — relacje w łagrze (Marusia, Fiodorowna) pokazują raczej degradację uczuć niż romantyzm.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Uzupełnij zdania dotyczące Domu Swidanij (domu widzeń):",
      content: {
        textWithGaps:
          "Widzenia z rodziną były możliwe (1). Warunkiem dostępu było (2). Przed spotkaniem więzień musiał podpisać (3).",
        gaps: [
          {
            id: 1,
            options: [
              "co tydzień",
              "raz na rok lub rzadziej",
              "codziennie",
              "co miesiąc",
            ],
          },
          {
            id: 2,
            options: [
              "dobre zachowanie i 100% normy",
              "opłacenie strażnika",
              "przynależność do partii",
              "znajomość z komendantem",
            ],
          },
          {
            id: 3,
            options: [
              "akt oskarżenia",
              "deklarację milczenia o warunkach w obozie",
              "prośbę o amnestię",
              "list do rodziny",
            ],
          },
        ],
      },
      correctAnswer: [1, 0, 1],
      metadata: {
        explanation:
          "Widzenia bardzo rzadkie (raz na rok lub rzadziej). Wymagały nienagannej normy (100%), czystej kartoteki politycznej. Przed spotkaniem podpisywano deklarację milczenia — nie wolno było mówić o warunkach w obozie. Niektóre rodziny odcinały się od \u201Ewroga ludu\u201D.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Które stwierdzenia o absurdalności zarzutów w systemie sowieckim są zgodne z \u201EInnym światem\u201D?",
      content: {
        options: [
          "Narratora oskarżono o szpiegostwo, bo miał wysokie buty — skojarzono je z obuwiem oficerskim",
          "Żydowski szewc z Witebska trafił do więzienia za odmowę użycia skrawków skóry do zelowania butów",
          "Kostylewa skazano za wykrzyknięcie \u201EWyzwolić Zachód!\u201D i czytanie literatury francuskiej",
          "Wszyscy więźniowie mieli rzetelne procesy z obrońcami",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Absurdalność zarzutów to stały motyw: buty = szpiegostwo, odmowa zelowania = sabotaż, czytanie Balzaca = zdrada. System NIE zapewniał rzetelnych procesów — wyroki wydawano masowo, na podstawie sfabrykowanych dowodów i wymuszonych zeznań.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Które trzy płaszczyzny narracyjne wyróżnia się w \u201EInnym świecie\u201D?",
      content: {
        options: [
          "Biograficzna — opis autentycznych wydarzeń z życia autora",
          "Psychologiczna — analiza zachowań i motywacji więźniów",
          "Komediowa — humorystyczne anegdoty z życia obozowego",
          "Filozoficzna — refleksja nad kondycją człowieka i naturą totalitaryzmu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Trzy płaszczyzny: biograficzna (fakty, wydarzenia), psychologiczna (analiza zachowań — dlaczego Kostylew się okalecza? dlaczego Marusia wraca do Kowala?), filozoficzna (\u201ECzłowiek jest ludzki w ludzkich warunkach\u201D). Płaszczyzny komediowej NIE ma.",
      },
    },

    // --- DIFF 3 — SA (3) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Na czym polega symbolika tytułu rozdziału \u201ERęka w ogniu\u201D? Jak Kostylew przez samookaleczenie wyraża bunt?",
      content: {
        context:
          "Kostylew co wieczór wsuwał prawą rękę do ognia, by nie pracować dla systemu, który go oszukał. Grudziński odkrył ten sekret przypadkiem i obiecał go nie zdradzać.",
      },
      correctAnswer:
        "Ręka w ogniu to dosłowny gest i zarazem symbol: Kostylew niszczy narzędzie pracy (rękę), by odmówić udziału w systemie. Nie chce swoją pracą wspierać łagru, który go zniewolił. To desperacki akt wolności — jedyne, co mu pozostało, to decyzja o własnym ciele. Samookaleczenie jest buntem bardziej radykalnym niż ucieczka, bo odrzuca samą zasadę systemu: \u201Epracuj albo umrzyj\u201D. Kostylew wybiera trzecią drogę: \u201Enie pracuję, nawet za cenę cierpienia\u201D.",
      metadata: {
        explanation:
          "Kostylew to postać symbolizująca wewnętrzne wyzwolenie. Jego bunt jest daremny (zostaje przeniesiony na Kołymę i ginie), ale ważny — udowadnia, że nawet w totalnym zniewoleniu istnieje wolna wola.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Opisz los Gorcewa. Dlaczego Grudziński nazywa jego śmierć \u201Ezabiciem pracą\u201D?",
      content: {},
      correctAnswer:
        "Gorcew to były enkawudzista, który trafił do łagru i początkowo zachowywał się wyniośle. Został rozpoznany przez współwięźnia jako dawny kat NKWD. Od tej chwili więźniowie dokonali na nim samosądu: przydzielali najcięższą pracę, najgorszy kocioł, nikt mu nie pomagał. Osłabiony zamarł w zaspie. Grudziński nazywa to \u201Ezabiciem pracą\u201D, bo śmierć Gorcewa nie była bezpośrednim mordem — wykorzystano mechanizm obozowy (pracę i głód) jako narzędzie zemsty. Komentuje: \u201Erzucono lwa na pożarcie niewolnikom\u201D — ci, którzy byli jego ofiarami, stali się jego katami.",
      metadata: {
        explanation:
          "Historia Gorcewa pokazuje odwrócenie ról kat-ofiara oraz moralne ambiwalencje łagru: czy zemsta na byłym oprawcy jest sprawiedliwością czy kolejną zbrodnią?",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Jaką rolę pełni szpital w łagrze Jercew? Dlaczego więźniowie się do niego celowo okaleczali?",
      content: {},
      correctAnswer:
        "Szpital był jedynym miejscem w łagrze, gdzie więźniowie mogli odpocząć: czyste łóżko, większa racja żywności, zwolnienie z pracy. Dlatego więźniowie celowo się okaleczali, by tam trafić — sam narrator wystawił się nago na wielki mróz, żeby go przyjęto. Szpital był \u201Eoazą normalności\u201D, ale zarazem tragedią: fakt, że jedyną ucieczką od łagru było samookaleczenie, ujawniał destrukcyjność systemu. Ci, którym szpital nie pomógł, trafiali do Trupiarni — z obciętymi racjami, co oznaczało śmierć.",
      metadata: {
        explanation:
          "Szpital symbolizuje paradoks łagru: jedyne miejsce \u201Eludzkie\u201D jest dostępne za cenę destrukcji własnego ciała. Leczenie jest złudzeniem — system nie chce wyleczyć więźnia, lecz wycisnąć z niego ostatni wysiłek.",
      },
    },

    // --- DIFF 3 — SN (2) ---

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Formy buntu w \u201EInnym świecie\u201D — jak więźniowie próbują bronić godności?",
        requirements: [
          "Omów co najmniej 4 formy buntu/oporu (samookaleczenie, decyzja o samobójstwie, protest głodowy, ucieczka, wiara)",
          "Podaj konkretne przykłady postaci",
          "Ocena: czy te formy buntu były skuteczne?",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Samookaleczenie: Kostylew (ręka w ogniu), Dimka (odrąbana stopa) — odmowa pracy jako akt wolności. Decyzja o śmierci: Natalia Lwowna czerpała siłę z przekonania, że może wybrać samobójstwo; Kostylew oblał się wrzątkiem. Protest głodowy: narrator i Polacy po amnestii. Ucieczka: Rusto Karinen — nieudana, złapany. Wiara: Dimka (początkowo), siostry zakonne. Żadna z form nie daje wolności — ale Grudziński podkreśla, że są ważne, bo dowodzą, że człowiek nie poddał się do końca: \u201ELepiej umrzeć stojąc niż na kolanach\u201D.",
      metadata: {
        explanation:
          "Grudziński nie heroizuje buntu — pokazuje, że jest daremny, ale etycznie konieczny. Każda próba obrony godności jest ważna sama w sobie, nawet gdy kończy się śmiercią.",
      },
    },
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Kobiety w \u201EInnym świecie\u201D — jak Grudziński ukazuje sytuację kobiet w łagrze?",
        requirements: [
          "Omów losy co najmniej 3 postaci kobiecych (Marusia, Natalia Lwowna, Jewgienija Fiodorowna, \u201Egeneralska doczka\u201D)",
          "Wskaż mechanizmy opresji specyficzne dla kobiet",
          "Odnieś się do motywu \u201Enocnych łowów\u201D",
          "100-150 słów",
        ],
        wordLimit: { min: 100, max: 150 },
      },
      correctAnswer:
        "Marusia — ofiara \u201Enocnych łowów\u201D (zbiorowy gwałt urków), potem \u201Ewłasność\u201D Kowala; Natalia Lwowna — intelektualistka, wrażliwa na sztukę, szukała godności w decyzji o samobójstwie; Jewgienija Fiodorowna — pielęgniarka, kochała więźnia, zmarła przy porodzie; \u201Egeneralska doczka\u201D — córka polskiego oficera, zmuszona do prostytucji. Kobiety były szczególnie narażone: gwałty, prostytucja, traktowanie jako \u201Emateriał\u201D. \u201ENocne łowy\u201D to eufemizm — język kamufluje zbrodnię.",
      metadata: {
        explanation:
          "Grudziński nie unika tematów tabu — opisuje gwałty, prostytucję i degradację kobiet bez sentymentalizmu, ale z wyraźnym moralnym sprzeciwem.",
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
      work: "Inny świat",
      question:
        "Dlaczego Grudziński opisuje historię Gorcewa jako \u201Esprzęgnięcie katów i ofiar\u201D? Co to mówi o naturze systemu?",
      content: {
        context:
          "Gorcew, były enkawudzista, zostaje rozpoznany w łagrze i \u201Ezabity pracą\u201D przez współwięźniów. Grudziński komentuje: \u201Erzucono lwa na pożarcie niewolnikom\u201D.",
        options: [
          "System chronił byłych funkcjonariuszy NKWD",
          "Gorcew zasłużył na karę i więźniowie wymierzyli sprawiedliwość",
          "System celowo mieszał katów i ofiary w jednym łagrze, tworząc sytuację, w której ofiary stawały się katami — co zacierało granicę moralną i niszczyło solidarność więźniów",
          "Grudziński wyraża czyste współczucie wobec Gorcewa",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "System celowo umieszczał byłych katów wśród ofiar — nie by ich karać, lecz by zdestabilizować relacje między więźniami. Zemsta na Gorcewie, choć \u201Ezrozumiała\u201D, czyniła z ofiar katów. Grudziński ukazuje tu perwersyjny mechanizm: system zmusza ofiary do moralnego upadku, co jeszcze bardziej je degeneruje.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Czym różni się spojrzenie Grudzińskiego na obóz od perspektywy Borowskiego w \u201EOpowiadaniach\u201D?",
      content: {
        context:
          "Tadeusz Borowski (1922-1951) opisuje obóz w Oświęcimiu z perspektywy narratora Tadka — więźnia uprzywilejowanego, który jest częścią systemu obozowego. Borowski pisze o \u201Eczłowieku złagrowanym\u201D — zdemoralizowanym przez obóz na zawsze.",
        options: [
          "Obaj mają identyczną perspektywę — nihilizm i brak nadziei",
          "Grudziński pisze satyrę, a Borowski — tragedię",
          "Borowski opisuje łagier sowiecki, a Grudziński — obóz niemiecki",
          "Grudziński zachowuje wiarę w możliwość obrony godności, mimo że bunt jest daremny; Borowski ukazuje totalną degradację moralną bez nadziei. Grudziński to \u201Eczłowiek zlagrowany\u201D (zraniony, ale walczący), Borowski — \u201Eczłowiek złagrowany\u201D (zniszczony wewnętrznie)",
        ],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Kluczowa różnica: Grudziński wierzy, że godność można bronić (Kostylew, narrator, protest głodowy), choć bunt jest daremny. Borowski jest radykalniejszy: obóz niszczy nieodwracalnie, nawet ocalali są \u201Eskażeni\u201D. Grudziński = zlagrowany (zraniony); Borowski = złagrowany (zniszczony).",
      },
    },

    // --- DIFF 4 — SA (1) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Dlaczego Grudziński poświęca tak dużo miejsca historii Kostylewa? Jakie uniwersalne przesłanie niesie ta postać?",
      content: {},
      correctAnswer:
        "Kostylew jest centralną postacią symboliczną, bo jego historia ilustruje pełny cykl: od ślepej wiary (wychowany w kulcie komunizmu) → przez wyzwolenie umysłu (literatura francuska) → rozczarowanie i bunt (ręka w ogniu) → tragiczną śmierć (wrzątek). Kostylew uosabia \u201Edorastanie do wewnętrznej wolności\u201D — nawet w systemie, który go zniewolił, odnalazł w sobie siłę do odmowy. Jego bunt jest daremny (ginie), ale ważny — udowadnia, że człowiek może powiedzieć \u201Enie\u201D nawet w totalnym zniewoleniu. To uniwersalne przesłanie: wolność wewnętrzna jest ostatnią twierdzą, którą system może zniszczyć tylko zabijając człowieka.",
      metadata: {
        explanation:
          "Kostylew to najbardziej rozbudowana historia w książce. Grudziński widzi w nim odzwierciedlenie własnych pytań: czy można zachować wolność w niewoli? Odpowiedź brzmi: tak, za cenę życia.",
      },
    },

    // --- DIFF 4 — SN (1) ---

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "\u201EInny świat\u201D jako dzieło wielogatunkowe — jak forma służy treści?",
        requirements: [
          "Omów elementy pamiętnika, reportażu, eseju i autobiografii w utworze",
          "Wyjaśnij, dlaczego Grudziński nie poprzestał na jednym gatunku",
          "Podaj przykłady każdego z elementów",
          "Odnieś się do stylu narracji (powściągliwość + poetyckość + slang obozowy)",
          "120-180 słów",
        ],
        wordLimit: { min: 120, max: 180 },
      },
      correctAnswer:
        "Pamiętnik: chronologiczna relacja z osobistych doświadczeń (aresztowanie → więzienie → łagier → wolność). Reportaż: dokumentalna precyzja, opisy mechanizmów obozowych (system kotłów, normy, trupiarnia). Autobiografia: narrator = autor, pierwszoosobowa narracja. Esej: filozoficzne refleksje (\u201ECzłowiek jest ludzki w ludzkich warunkach\u201D, analiza totalitaryzmu). Grudziński łączy gatunki, bo żaden pojedynczy nie wystarczy — pamiętnik daje fakty, reportaż daje precyzję, esej daje sens, autobiografia daje wiarygodność. Styl łączy slang obozowy (zona, łagpunkt, lesopował) z poetyckimi obrazami i chłodną analizą — ta wielopoziomowość oddaje złożoność doświadczenia.",
      metadata: {
        explanation:
          "Wielogatunkowość jest świadomym wyborem — doświadczenie łagru wymaga nowej formy, tak jak Zagłada wymagała nowej formy od Nałkowskiej.",
      },
    },

    // --- DIFF 4 — ES (1) ---

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "\u201ECzłowiek jest ludzki w ludzkich warunkach\u201D — jak Grudziński w \u201EInnym świecie\u201D ukazuje wpływ systemu totalitarnego na moralność człowieka? Rozważ na podstawie losów wybranych bohaterów.",
      content: {
        thesis:
          "Wpływ totalitaryzmu na moralność w świetle przesłania Grudzińskiego",
        structure: {
          introduction:
            "Przedstaw kluczowe zdanie i jego znaczenie — odpowiedzialność za degenerację moralną spada na system, nie na ofiary",
          arguments_for:
            "Przykłady upadku moralnego: urkowie, Marusia, kradzieże, donosy, \u201Eodwrócony dekalog\u201D. Jak system wytwarzał te zachowania?",
          arguments_against:
            "Przykłady obrony godności: Kostylew, Dimka, narrator, Natalia Lwowna. Czy ich bunt dowodzi, że człowiek MOŻE być ludzki nawet w nieludzkich warunkach?",
          conclusion:
            "Wniosek: co przesłanie Grudzińskiego mówi o naturze człowieka — pesymizm czy ostrożna nadzieja?",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej 3 postaci",
          "Analiza mechanizmów łagrowych",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Upadek: system kotłów (głód jako narzędzie kontroli), donosicielstwo (Machapetian), nocne łowy (degradacja urków), Gorcew (ofiary stają się katami). Obrona: Kostylew (ręka w ogniu — odmowa pracy), Dimka (odrąbana stopa — akt woli), narrator (głodówka), Natalia (wybór śmierci jako wolność). Wniosek: Grudziński nie jest ani optymistą, ani pesymistą — stwierdza fakt: system niszczył ludzi, ale nie wszystkich do końca. Ci, którzy się bronili, ginęli — ale ich bunt ma wartość sam w sobie.",
      metadata: {
        explanation:
          "Temat wymaga zrozumienia, że Grudziński NIE potępia ofiar za ich upadki. Potępia system. Ale zarazem pokazuje, że nawet w tym systemie byli ludzie, którzy się nie poddali.",
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
      work: "Inny świat",
      question:
        "Jak \u201EInny świat\u201D wpisuje się w tradycję \u201Eliteratury świadectwa\u201D i czym różni się od \u201EArchipelagu Gułag\u201D Sołżenicyna?",
      content: {
        context:
          "Aleksander Sołżenicyn (1918-2008) w \u201EArchipelagu Gułag\u201D (1973) stworzył monumentalny opis systemu łagrów na podstawie relacji setek świadków i własnych doświadczeń. Dzieło ma charakter historyczno-dokumentalny i obejmuje cały system.",
        options: [
          "Nie ma między nimi żadnych różnic — oba dzieła są identyczne w formie i treści",
          "Grudziński pisze z perspektywy jednego człowieka (osobiste świadectwo), koncentrując się na kondycji ludzkiej i psychologii. Sołżenicyn tworzy panoramę systemu — historię, geografię, statystykę. Grudziński to \u201Emedalion\u201D, Sołżenicyn to \u201Eencyklopedia\u201D",
          "Sołżenicyn był więźniem, a Grudziński — obserwatorem z zewnątrz",
          "Grudziński pisze fikcję, Sołżenicyn — dokument",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Grudziński (1951) wyprzedził Sołżenicyna (1973) o dwie dekady. Różnica w skali: Grudziński daje intymne świadectwo jednego więźnia, filozoficzną refleksję o człowieku. Sołżenicyn — panoramę systemu z setkami świadectw, statystykami, mapami. Oba dzieła uzupełniają się.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Jak klamrowa kompozycja \u201EInnego świata\u201D (epilog w Rzymie) zmienia perspektywę na całe dzieło?",
      content: {
        context:
          "W epilogu narrator spotyka w Rzymie byłego współwięźnia z łagru. Spotkanie to zamyka kompozycję klamrową — narrator wraca myślami do doświadczenia obozowego, już z perspektywy wolnego człowieka.",
        options: [
          "Epilog ukazuje, że doświadczenie łagru NIE kończy się z wyjściem na wolność — rany pozostają, a pamięć jest zarówno ciężarem, jak i obowiązkiem moralnym. Rzym (symbol cywilizacji zachodniej) kontrastuje z Jercewem — ale oba światy współistnieją w psychice ocalałego",
          "Epilog jest nieistotny — to tylko geograficzny dodatek",
          "Epilog ma charakter humorystyczny — narrator żartuje z byłym więźniem",
          "Epilog jest pochwałą Zachodu i krytyką Wschodu",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Klamra Rzym-Jercew podkreśla, że łagier nie jest zamkniętym epizodem, lecz trwałą raną. Spotkanie z byłym więźniem w \u201Enormalnym\u201D świecie ukazuje przepaść między doświadczeniem a codziennością wolnych ludzi. Narrator niesie w sobie \u201Einny świat\u201D na zawsze.",
      },
    },

    // --- DIFF 5 — CM (1) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Które stwierdzenia o \u201EInnym świecie\u201D jako dziele literackim i historycznym są trafne?",
      content: {
        options: [
          "Pierwsze wydanie ukazało się po angielsku (1951) z przedmową Bertranda Russella — w Polsce było zakazane do 1988 roku, co świadczy o sile politycznej tego świadectwa",
          "Grudziński wyprzedził Sołżenicyna o ponad 20 lat jako świadek systemu łagrowego w literaturze światowej",
          "Utwór łączy dokumentalność z uniwersalną refleksją o kondycji człowieka — nie jest tylko świadectwem historycznym, ale filozoficznym pytaniem o granice ludzkiej natury",
          "Dzieło zostało entuzjastycznie przyjęte w PRL i wydane masowym nakładem w latach 50.",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Wydanie angielskie 1951, polskie (Londyn) 1953, w PRL zakazane do 1988. Russell napisał przedmowę. Grudziński wyprzedził Sołżenicyna. Dzieło łączy dokument z filozofią. W PRL NIE było entuzjastycznie przyjęte — było zakazane.",
      },
    },

    // --- DIFF 5 — SA (1) ---

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 4,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Grudziński przytacza w \u201EInnym świecie\u201D zdanie Dostojewskiego o tym, że ten \u201Epotrafił opisać nieludzkie cierpienia tak, jak gdyby stanowiły tylko naturalną część ludzkiego losu\u201D. Jak to zdanie odnosi się do stylu samego Grudzińskiego?",
      content: {
        context:
          "Narrator czyta \u201EZapiski z martwego domu\u201D pożyczone od Natalii Lwownej. Komentuje styl Dostojewskiego, widząc w nim pokrewieństwo z własnym sposobem pisania o łagrze.",
      },
      correctAnswer:
        "Zdanie o Dostojewskim jest autokomentarzem: Grudziński sam opisuje nieludzkie cierpienia \u201Ejak naturalną część losu\u201D — powściągliwie, bez sentymentalizmu, z chłodną precyzją. Ta strategia sprawia, że groza przebija nie przez emocjonalne wzmocnienia, lecz przez sam opis faktów. Narrator nie krzyczy — i właśnie dlatego jest bardziej wstrząsający. To świadomy wybór estetyczny i etyczny: patos byłby fałszywy wobec doświadczenia, które przekracza wszelkie konwencje opisu. Grudziński kontynuuje tradycję Dostojewskiego — pisze o \u201Einnym świecie\u201D tych samych Rosji, 100 lat później, tym samym stylem powściągliwej precyzji.",
      metadata: {
        explanation:
          "To kluczowy metaliteracki moment: Grudziński, komentując Dostojewskiego, definiuje własną poetykę. Obu łączy powściągliwość jako wyraz szacunku dla cierpienia — krzyk byłby banalizacją.",
      },
    },

    // --- DIFF 5 — ES (1) ---

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "CONTEMPORARY",
      work: "Inny świat",
      question:
        "Porównaj obraz obozu w \u201EInnym świecie\u201D Herlinga-Grudzińskiego i w \u201EOpowiadaniach\u201D Tadeusza Borowskiego. Jak różne perspektywy narracyjne kształtują różne wizje człowieczeństwa w ekstremalnych warunkach?",
      content: {
        thesis: "Dwie perspektywy na obóz — dwie wizje człowieka",
        structure: {
          introduction:
            "Zarysuj kontekst: oba dzieła to literatura obozowa, ale dotyczą różnych systemów (sowiecki łagier vs. nazistowski KZ) i stosują różne strategie narracyjne",
          arguments_for:
            "Grudziński: narrator-obserwator, dystans, refleksja filozoficzna. Zachowuje wiarę w możliwość obrony godności (\u201Eczłowiek zlagrowany\u201D — zraniony, ale walczący). Przykłady: Kostylew, Dimka, protest głodowy",
          arguments_against:
            "Borowski: narrator-uczestnik (Tadek), cynizm, behawioryzm. Ukazuje totalną degradację moralną (\u201Eczłowiek złagrowany\u201D — zniszczony wewnętrznie). Przykłady: kapo Tadek, \u201EProszę państwa do gazu\u201D",
          conclusion:
            "Wniosek: czy te dwie wizje się wykluczają, czy uzupełniają? Co mówią o granicach ludzkiego doświadczenia?",
        },
        requirements: [
          "Minimum 400 słów",
          "Analiza narracji i perspektywy w obu dziełach",
          "Porównanie wizji człowieka: Grudziński vs. Borowski",
          "Kontekst historyczny (łagier sowiecki vs. KZ nazistowski)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Grudziński: narrator z dystansem, analizuje, refleksyjny, powściągliwy — zachowuje wiarę w godność (Kostylew buntuje się, narrator głoduje). Borowski: narrator bez dystansu, cyniczny, behawiorystyczny — ukazuje totalną degradację (Tadek jest częścią systemu). Grudziński potępia system i broni ofiar; Borowski potępia system I pokazuje, że ofiary same stają się współwinne. Oba uzupełniają się: Grudziński daje nadzieję, Borowski ostrzega, że nadzieja może być iluzją. Razem dają pełniejszy obraz: człowiek MOŻE się bronić (Grudziński), ale system MOŻE go zniszczyć całkowicie (Borowski).",
      metadata: {
        explanation:
          "To klasyczne porównanie maturalne. Kluczowe: nie wartościować, które dzieło jest \u201Elepsze\u201D, lecz pokazać, jak różne doświadczenia (łagier vs. KZ) generują różne perspektywy na tę samą kwestię ludzkiej natury.",
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
