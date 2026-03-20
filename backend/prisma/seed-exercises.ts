// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";
import { TestLandingService } from "../src/services/testLandingService";

const prisma = new PrismaClient();
const testLandingService = new TestLandingService();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Pan Tadeusz",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Adam Mickiewicz",
          title: "Pan Tadeusz",
          text: "S\u0142o\u0144ce ostatnich kres\u00f3w nieba dochodzi\u0142o,\nMniej silnie, ale szerzej ni\u017c we dnie \u015bwieci\u0142o,\nCa\u0142e zaczerwienione, jak zdrowe oblicze\nGospodarza, gdy prace sko\u0144czywszy rolnicze\nNa spoczynek powraca. Ju\u017c kr\u0105g promienisty\nSpuszcza si\u0119 na wierzch boru i ju\u017c pomrok mglisty,\nNape\u0142niaj\u0105c wierzcho\u0142ki i ga\u0142\u0119zie drzewa,\nCa\u0142y las wi\u0105\u017ce w jedno i jakoby zlewa;\nI b\u00f3r czernia\u0142 si\u0119 na kszta\u0142t ogromnego gmachu,\nS\u0142o\u0144ce nad nim czerwone jak po\u017car na dachu.\nWtem zapad\u0142o do g\u0142\u0119bi; jeszcze przez konary\nB\u0142ysn\u0119\u0142o, jako \u015bwieca przez okiennic szpary,\nI zgas\u0142o.",
          bookReference: "Ksi\u0119ga pierwsza, Gospodarstwo",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Wska\u017c trzy r\u00f3\u017cne \u015brodki stylistyczne obecne w tym fragmencie, nazwij je i podaj przyk\u0142ad ka\u017cdego z tekstu.",
            minWords: 25,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Wyja\u015bnij, jak\u0105 funkcj\u0119 pe\u0142ni por\u00f3wnanie zachodz\u0105cego s\u0142o\u0144ca do oblicza gospodarza. Co m\u00f3wi ono o \u015bwiecie przedstawionym w \u201ePanu Tadeuszu\u201d?",
            minWords: 30,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Por\u00f3wnanie homeryckie (\u201ejak zdrowe oblicze / Gospodarza, gdy prace sko\u0144czywszy rolnicze / Na spoczynek powraca\u201d), personifikacja (\u201eS\u0142o\u0144ce zapad\u0142o do g\u0142\u0119bi\u201d, \u201eb\u0142ysn\u0119\u0142o\u201d, \u201ezgas\u0142o\u201d \u2014 s\u0142o\u0144ce dzia\u0142a jak istota \u017cywa), por\u00f3wnanie (\u201eb\u00f3r czernia\u0142 si\u0119 na kszta\u0142t ogromnego gmachu\u201d, \u201ejako \u015bwieca przez okiennic szpary\u201d). 2) Por\u00f3wnanie s\u0142o\u0144ca do twarzy gospodarza wpisuje przyrod\u0119 w porz\u0105dek \u017cycia wiejskiego \u2014 rytm natury jest to\u017csamy z rytmem pracy cz\u0142owieka. Buduje to obraz \u015bwiata harmonijnego, w kt\u00f3rym przyroda i ludzie stanowi\u0105 jedno\u015b\u0107. Jest to charakterystyczne dla idealizacji Litwy w \u201ePanu Tadeuszu\u201d.",
      metadata: {
        explanation:
          "Fragment \u0142\u0105czy rozbudowane por\u00f3wnanie homeryckie z personifikacj\u0105 i kolejnymi por\u00f3wnaniami. Kluczowe jest uto\u017csamienie zachodu s\u0142o\u0144ca z powrotem gospodarza z pola \u2014 Mickiewicz konsekwentnie buduje wizj\u0119 Litwy jako krainy, gdzie natura i cz\u0142owiek \u017cyj\u0105 w harmonii, a cykl przyrody odpowiada cyklowi pracy rolniczej.",
      },
    },

    // ======================= POCZĄTEK PYTAŃ PAMIĘTNIKI PASKA ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (10) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Kto jest autorem „Pamiętników”?",
      content: {
        options: [
          "Mikołaj Rej",
          "Jan Chryzostom Pasek",
          "Wacław Potocki",
          "Piotr Skarga",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Autorem „Pamiętników” jest Jan Chryzostom Pasek (ok. 1636–1701), polski szlachcic i żołnierz. Utwór spisywał prawdopodobnie pod koniec życia, w latach 90. XVII wieku, na podstawie wspomnień z lat 1656–1688.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Jakie lata obejmują „Pamiętniki” Jana Chryzostoma Paska?",
      content: {
        options: ["1600–1650", "1656–1688", "1700–1750", "1550–1600"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” obejmują lata 1656–1688. Pierwsza część (1656–1666) dotyczy przygód wojennych autora, druga (1667–1688) opisuje jego życie ziemiańskie po osiedleniu się na wsi.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Na ile głównych części dzielą się „Pamiętniki” Paska?",
      content: {
        options: [
          "Na trzy: wojenna, polityczna i religijna",
          "Na dwie: wojenna (1656–1666) i ziemiańska (1667–1688)",
          "Na cztery, odpowiadające czterem porom roku",
          "Na pięć, po jednej na każdą dekadę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” dzielą się na dwie wyraźne części: pierwsza opisuje przygody wojenne Paska (służba u Czarnieckiego, wyprawy do Danii, na Moskwę), druga – życie ziemiańskie po ślubie z Anną Łącką w 1667 roku.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Pod czyim dowództwem Pasek brał udział w wyprawach wojennych?",
      content: {
        options: [
          "Jana III Sobieskiego",
          "Stefana Czarnieckiego",
          "Stanisława Żółkiewskiego",
          "Tadeusza Kościuszki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek służył pod dowództwem hetmana Stefana Czarnieckiego, z którym uczestniczył m.in. w wyprawie do Danii (1658–1659) i w wojnach z Moskwą. Czarniecki jest jedną z najważniejszych postaci pierwszej części „Pamiętników”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Kim jest narrator i główny bohater „Pamiętników”?",
      content: {
        options: [
          "Fikcyjna postać szlachcica",
          "Sam autor – Jan Chryzostom Pasek",
          "Stefan Czarniecki",
          "Jan III Sobieski",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek jest jednocześnie autorem, narratorem i głównym bohaterem swoich „Pamiętników”. Utwór ma charakter autobiograficzny – Pasek opowiada o wydarzeniach, w których sam uczestniczył, często wyolbrzymiając własną rolę.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jakie zwierzę Pasek wytresował i musiał podarować królowi Janowi III Sobieskiemu?",
      content: {
        options: ["Sokoła", "Wydrę", "Niedźwiedzia", "Wilka"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek wytresował wydrę, którą nazwał Robak. Nauczył ją łowić ryby, reagować na komendy i pilnować domu. Gdy Jan III Sobieski zainteresował się zwierzęciem, Pasek musiał je niechętnie oddać królowi. Wydra później uciekła i zginęła.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Do jakiej epoki literackiej należą „Pamiętniki” Paska?",
      content: {
        options: ["Renesans", "Barok", "Oświecenie", "Romantyzm"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” należą do epoki baroku (XVII wiek). Są jednym z najwybitniejszych zabytków pamiętnikarstwa staropolskiego i najważniejszym dokumentem życia szlacheckiego w epoce sarmackiej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Jakim gatunkiem literackim są „Pamiętniki” Paska?",
      content: {
        options: [
          "Powieścią historyczną",
          "Pamiętnikiem z elementami gawędy",
          "Kroniką urzędową",
          "Eposem rycerskim",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” to utwór pamiętnikarski z silnymi elementami gawędy szlacheckiej. Pasek swobodnie dobiera tematy, wplata anegdoty, przysłowia, zwroty do czytelnika i humorystyczne dygresje, co nadaje tekstowi charakter żywej opowieści.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Co Pasek opisuje w drugiej części „Pamiętników” (po 1667 roku)?",
      content: {
        options: [
          "Dalsze wyprawy wojenne w Europie",
          "Życie ziemiańskie: gospodarstwo, polowania, hodowlę zwierząt, sejmiki",
          "Podróże dyplomatyczne do Francji i Włoch",
          "Działalność w zakonie jezuitów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Po ślubie z Anną Łącką (1667) Pasek osiadł na wsi. Druga część „Pamiętników” opisuje życie ziemiańskie: gospodarowanie, polowania, hodowlę ptaków, tresowanie wydry, udział w sejmikach, procesy sądowe i biesiady.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "W jakiej wyprawie zagranicznej Pasek opisuje szczegółowo obyczaje obcego kraju?",
      content: {
        options: [
          "Wyprawie do Francji",
          "Wyprawie do Danii (1658–1659)",
          "Wyprawie do Turcji",
          "Wyprawie do Włoch",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wyprawa do Danii (1658–1659) pod dowództwem Czarnieckiego jest jednym z najobszerniej opisanych epizodów „Pamiętników”. Pasek opisuje nie tylko działania wojenne, ale też duńskie obyczaje, kuchnię, kobiety, kościoły i zwyczaje.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3: 1 standard, 1 matching, 1 gap-fill) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Połącz części „Pamiętników” z ich główną tematyką:",
      content: {
        matchingType: "events_to_dates",
        leftColumn: [
          { id: "A", text: "Część I (1656–1666)" },
          { id: "B", text: "Część II (1667–1688)" },
        ],
        rightColumn: [
          { id: "1", text: "Życie ziemiańskie, gospodarstwo, polowania" },
          { id: "2", text: "Przygody wojenne, wyprawy zagraniczne, bitwy" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
      ],
      metadata: {
        explanation:
          "Część I opisuje wojenne losy Paska: wyprawę na Węgry, do Danii, wojny z Moskwą, rokosz Lubomirskiego. Część II – po ślubie – skupia się na życiu ziemiańskim: polowaniach, hodowli zwierząt, sejmikach i sprawach majątkowych.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Które stwierdzenia o „Pamiętnikach” Paska są prawdziwe?",
      content: {
        options: [
          "Pasek jest jednocześnie autorem, narratorem i głównym bohaterem",
          "Utwór obejmuje lata 1656–1688",
          "Utwór został wydany za życia autora",
          "Pasek często wyolbrzymia swoją rolę w opisywanych wydarzeniach",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Pasek jest autorem, narratorem i bohaterem. Utwór obejmuje lata 1656–1688. Nie został wydany za życia autora – opublikowano go dopiero w 1836 roku. Pasek rzeczywiście wyolbrzymia swoją rolę, co jest typowe dla gawędziarskiego stylu narracji.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "„Pamiętniki” Paska zostały wydane dopiero w roku (1). Pasek brał udział w wyprawie do Danii pod dowództwem (2). Ulubioną wytresowaną przez Paska wydrę nazywał (3).",
        gaps: [
          {
            id: 1,
            options: ["1701", "1836", "1756", "1900"],
          },
          {
            id: 2,
            options: [
              "Jana III Sobieskiego",
              "Stefana Czarnieckiego",
              "Jerzego Lubomirskiego",
              "Augusta II Mocnego",
            ],
          },
          {
            id: 3,
            options: ["Burek", "Robak", "Azor", "Rybka"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "„Pamiętniki” wydano w 1836 roku – szybko stały się popularne wśród romantyków. Wyprawa do Danii odbywała się pod dowództwem Czarnieckiego. Wydra nosiła przezwisko Robak – Pasek nauczył ją łowić ryby i reagować na komendy.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Kim był Jan Chryzostom Pasek i czym zajmował się w życiu?",
      content: {},
      correctAnswer:
        "Jan Chryzostom Pasek (ok. 1636–1701) był polskim szlachcicem i żołnierzem. Służył pod dowództwem Stefana Czarnieckiego, brał udział w wojnach ze Szwecją, wyprawie do Danii i wojnach z Moskwą. Po zakończeniu kariery wojskowej osiadł na wsi, ożenił się z Anną Łącką i prowadził życie ziemianina. Pod koniec życia spisał „Pamiętniki” obejmujące lata 1656–1688.",
      metadata: {
        explanation:
          "Pasek jest typowym przedstawicielem sarmackiej szlachty XVII wieku – łączy w sobie cechy żołnierza i ziemianina. Jego „Pamiętniki” są najważniejszym dokumentem mentalności szlacheckiej epoki baroku.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Opisz krótko historię wydry w „Pamiętnikach” Paska.",
      content: {
        hints: ["tresowanie", "Robak", "Jan III Sobieski"],
      },
      correctAnswer:
        "Pasek wytresował wydrę, której nadał przezwisko Robak. Nauczył ją łowić ryby na rozkaz, reagować na komendy i pilnować domu. Wydra zyskała taką sławę, że zainteresował się nią sam król Jan III Sobieski. Pasek musiał niechętnie oddać zwierzę władcy. Wydra później uciekła z królewskich komnat i została zabita przez żołnierza, co bardzo zasmuciło króla.",
      metadata: {
        explanation:
          "Epizod z wydrą jest jednym z najbardziej znanych fragmentów „Pamiętników”. Ukazuje nieoczekiwaną wrażliwość i czułość Paska wobec zwierząt, a jednocześnie relacje między szlachcicem a królem – Pasek nie mógł odmówić władcy.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (10) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Czym jest sarmatyzm, którego wyrazem są „Pamiętniki” Paska?",
      content: {
        options: [
          "Nurtem filozoficznym głoszącym wyższość rozumu nad wiarą",
          "Ideologią polskiej szlachty, wywodzącej swoje pochodzenie od starożytnych Sarmatów, obejmującą kult tradycji, religijności i waleczności",
          "Ruchem artystycznym nawiązującym do antyku greckiego",
          "Nurtem politycznym dążącym do zjednoczenia Europy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sarmatyzm to ideologia i formacja kulturowa polskiej szlachty XVI–XVIII w. Szlachta wywodziła swe pochodzenie od starożytnych Sarmatów. Cechy: kult tradycji, waleczność, religijność (katolicka), ksenofobia, przywiązanie do wolności szlacheckich, przepych. Pasek jest typowym Sarmatą.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Czym są makaronizmy, charakterystyczne dla języka „Pamiętników”?",
      content: {
        options: [
          "Wtrętami z języka łacińskiego w tekście polskim",
          "Archaizmami z języka staropolskiego",
          "Zapożyczeniami z języka tureckiego",
          "Neologizmami wymyślonymi przez autora",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Makaronizmy to wtrącenia łacińskie w polskim tekście, typowe dla stylu szlacheckiego XVII wieku. Pasek nagminnie wplata łacińskie słowa i zwroty, co było oznaką wykształcenia szlachcica, ale też prowadziło do zepsucia języka polskiego.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Kiedy „Pamiętniki” Paska zostały po raz pierwszy wydane drukiem?",
      content: {
        options: [
          "Za życia autora, w 1695 roku",
          "W 1836 roku – szybko stały się popularne wśród romantyków",
          "W 1750 roku, w epoce oświecenia",
          "W 1918 roku, po odzyskaniu niepodległości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” wydano dopiero w 1836 roku, ponad 130 lat po śmierci autora. Stały się natychmiast popularne, zwłaszcza wśród romantyków zainteresowanych XVII-wieczną Polską. Henryk Sienkiewicz czerpał z nich inspirację do „Trylogii”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Co opisuje Pasek podczas wyprawy do Danii, oprócz działań wojennych?",
      content: {
        options: [
          "Jedynie strategie bitewne i plany oblężeń",
          "Obyczaje Duńczyków: kuchnię, kobiety, kościoły, zwyczaje, stroje",
          "Wyłącznie swoje uczucia religijne",
          "Dyplomatyczne negocjacje pokojowe",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Opis wyprawy do Danii to jeden z najbarwniejszych fragmentów „Pamiętników”. Pasek opisuje duńską kuchnię (potrawy na zimno), śmiałe kobiety, piękne kościoły, luterańskie nabożeństwa, a także porównuje obyczaje duńskie z polskimi, wyżej ceniąc rodzime.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Z kim ożenił się Pasek, co wyznacza początek drugiej części „Pamiętników”?",
      content: {
        options: [
          "Z Eleonorą, poznaną w Danii",
          "Z Anną Łącką, zamożną szlachcianką",
          "Z córką Stefana Czarnieckiego",
          "Z panną Radoszowską",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "W 1667 roku Pasek ożenił się z Anną Łącką, co stanowi moment przełomowy w „Pamiętnikach” – zmienia tryb życia z wojskowego na ziemiański. Wcześniej rozważał kilka kandydatek, a jego rozterki matrymonlane opisane są z humorem i samoironią.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "W jakich wojnach uczestniczył Pasek?",
      content: {
        options: [
          "W wojnach napoleońskich i powstaniu kościuszkowskim",
          "W wojnach ze Szwedami, wyprawie na Węgry, wyprawie do Danii i wojnach z Moskwą",
          "W wojnach krzyżowych i obronie Wiednia",
          "Wyłącznie w rokoszu Lubomirskiego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek brał udział w wielu konfliktach zbrojnych: wojnie z Rakoczym (wyprawa na Węgry, 1657), wyprawie do Danii (1658–1659), wojnach z Moskwą (od 1660), a także opowiedział się po stronie króla podczas rokoszu Lubomirskiego (1665–1666).",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jaki jest stosunek Paska do religii, widoczny w „Pamiętnikach”?",
      content: {
        options: [
          "Jest głęboko duchowym mistykiem",
          "Jest gorliwym katolikiem, ale jego religijność jest zewnętrzna – przestrzega obrzędów, nie zmieniając postępowania",
          "Jest ateistą krytykującym Kościół",
          "Jest wyznawcą arianizmu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek jest typowym Sarmatą-katolikiem: przestrzega postów, jałmużn i odpustów, ale jego religijność jest powierzchowna i nie wpływa na brutalne zachowanie. Słynny jest epizod, gdy służy do mszy z rękami zbroczonymi krwią wrogów, a ksiądz uświęca to słowami: „nie brzydzi się Bóg krwią rozlaną dla imienia swego”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Kogo Pasek pojmał do niewoli podczas walk z Moskwą?",
      content: {
        options: [
          "Cara Aleksego Michajłowicza",
          "Hetmana moskiewskiego Iwana Chowańskiego",
          "Kozackiego atamana Bohdana Chmielnickiego",
          "Generała szwedzkiego Karola Gustawa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Podczas walk z Moskwą Pasek chwalił się pojmaniem do niewoli dowódcy wojsk moskiewskich, hetmana Iwana Chowańskiego. Jest to typowy przykład wyolbrzymiania własnych zasług przez narratora „Pamiętników”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Czym jest rokosz Lubomirskiego, o którym pisze Pasek?",
      content: {
        options: [
          "Powstaniem chłopskim przeciw szlachcie",
          "Zbrojnym buntem marszałka Jerzego Lubomirskiego przeciw królowi Janowi Kazimierzowi w obronie wolności szlacheckich (1665–1666)",
          "Wyprawą krzyżową na Turcję",
          "Konfederacją barską",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rokosz Lubomirskiego (1665–1666) to zbrojny bunt marszałka Jerzego Lubomirskiego przeciw reformom króla Jana Kazimierza. Pasek opowiedział się po stronie króla i opisuje te wydarzenia z głębokim przygnębieniem, widząc w nich tragedię bratobójczej walki.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Czym charakteryzuje się styl narracji „Pamiętników” Paska?",
      content: {
        options: [
          "Suchym, urzędowym stylem kroniki",
          "Barwnym, potocznym językiem z elementami gawędy, anegdotami i makaronizmami",
          "Wysokim stylem poetyckim z rozbudowanymi metaforami",
          "Stylem naukowym z przypisami i cytatami źródłowymi",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Styl „Pamiętników” to gawęda szlachecka: język barwny i potoczny, makaronizmy (wtrącenia łacińskie), anegdoty, przysłowia, zwroty do czytelnika, humor, ironia i dygresje. Pasek to utalentowany opowiadacz, który nadaje wspomnieniom formę żywej, wciągającej opowieści.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (5: 2 standard, 1 matching, 1 gap-fill, 1 standard) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Które cechy sarmackie ujawniają się w postaci Paska?",
      content: {
        options: [
          "Waleczność i odwaga na polu bitwy",
          "Skłonność do pijaństwa i awanturnictwa",
          "Głęboka pokora i ascetyczny tryb życia",
          "Przywiązanie do tradycji i religijności katolickiej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Pasek jest typowym Sarmatą: waleczny (liczne bitwy), ale też skłonny do pijatyk i awantur. Jest przywiązany do katolicyzmu i tradycji szlacheckich, ale daleki od pokory i ascezy – jego religijność jest zewnętrzna, a tryb życia pełen przepychu i biesiad.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Połącz wyprawy wojenne Paska z ich celami:",
      content: {
        matchingType: "events_to_dates",
        leftColumn: [
          { id: "A", text: "Wyprawa na Węgry (1657)" },
          { id: "B", text: "Wyprawa do Danii (1658–1659)" },
          { id: "C", text: "Wojna z Moskwą (od 1660)" },
        ],
        rightColumn: [
          { id: "1", text: "Wsparcie Danii przeciw Szwecji" },
          { id: "2", text: "Walki z Rakoczym" },
          { id: "3", text: "Walki o ziemie wschodnie Rzeczypospolitej" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      metadata: {
        explanation:
          "Wyprawa na Węgry (1657) skierowana była przeciw Rakoczemu; wyprawa do Danii (1658–1659) miała wspierać Danię w wojnie ze Szwecją; wojna z Moskwą (od 1660) dotyczyła obrony wschodnich ziem Rzeczypospolitej.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "W drugiej części „Pamiętników” Pasek opisuje (1) na wsi. Jego ulubionymi zajęciami były (2) i hodowla ptaków. „Pamiętniki” są cennym źródłem wiedzy o ideologii (3).",
        gaps: [
          {
            id: 1,
            options: [
              "życie żołnierza",
              "życie ziemianina",
              "życie mnicha",
              "życie kupca",
            ],
          },
          {
            id: 2,
            options: [
              "podróże zagraniczne",
              "pisanie wierszy",
              "polowania",
              "handel zbożem",
            ],
          },
          {
            id: 3,
            options: [
              "oświeceniowej",
              "sarmackiej",
              "pozytywistycznej",
              "romantycznej",
            ],
          },
        ],
      },
      correctAnswer: [1, 2, 1],
      metadata: {
        explanation:
          "Druga część „Pamiętników” to obraz życia ziemianina na wsi. Pasek organizował słynne w okolicy polowania i hodował ptaki. Utwór jest najcenniejszym literackim źródłem wiedzy o sarmackiej ideologii i mentalności polskiej szlachty XVII wieku.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Które stwierdzenia o warstwie literackiej „Pamiętników” są prawdziwe?",
      content: {
        options: [
          "Utwór łączy elementy pamiętnika, gawędy i anegdoty",
          "Pasek miesza wydarzenia prawdziwe ze zmyśleniem i wyolbrzymieniem",
          "Tekst jest napisany wyłącznie w języku łacińskim",
          "Narracja zawiera liczne zwroty do czytelnika/słuchacza",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Pamiętniki” są gatunkowo niejednorodne: łączą pamiętnik, gawędę i anegdotę. Pasek koloryzuje, wyolbrzymia i mieszą fakty z fikcją. Tekst pisany jest po polsku z makaronizmami łacińskimi (nie w całości po łacinie). Liczne zwroty do odbiorcy to cecha gawędy.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Które wydarzenia historyczne opisuje Pasek w „Pamiętnikach”?",
      content: {
        options: [
          "Potop szwedzki i walki Czarnieckiego ze Szwedami",
          "Odsiecz wiedeńską (1683) – na podstawie relacji z drugiej ręki",
          "Powstanie Kościuszki (1794)",
          "Rokosz Lubomirskiego (1665–1666)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Pasek opisuje potop szwedzki, walki Czarnieckiego, wyprawę do Danii, wojny z Moskwą i rokosz Lubomirskiego. Odsiecz wiedeńską (1683) relacjonuje z drugiej ręki, bo sam w niej nie uczestniczył. Powstanie Kościuszki (1794) wykracza daleko poza ramy czasowe „Pamiętników”.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Opisz, jakie cechy sarmackiego szlachcica ukazuje Pasek na własnym przykładzie.",
      content: {
        hints: ["waleczność", "religijność", "awanturnictwo", "ksenofobia"],
      },
      correctAnswer:
        "Pasek ukazuje na swoim przykładzie typowe cechy sarmackie: waleczność (udział w licznych bitwach), gorliwą, choć powierzchowną religijność (przestrzega obrzędów, ale nie zmienia brutalnego zachowania), skłonność do pijaństwa i awantur (pijatyki kończące się bójkami), poczucie wyższości nad innymi narodami (wyśmiewanie duńskich obyczajów, luterańskich nabożeństw), przywiązanie do tradycji szlacheckich i wolności. Jest też próżny – wyolbrzymia swoje zasługi wojenne.",
      metadata: {
        explanation:
          "Pasek jest jednocześnie ilustracją i krytyką sarmatyzmu. Jego autoportret, choć zamierzony jako pozytywny, ujawnia również ciemne strony mentalności sarmackiej: ksenofobię, brutalizm, powierzchowną religijność i brak samokrytycyzmu.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jakie obyczaje duńskie opisuje Pasek i jak je ocenia w porównaniu z polskimi?",
      content: {},
      correctAnswer:
        "Pasek opisuje duńską kuchnię (potrawy na zimno, brak pieców w domach z powodu podatków), śmiałe i „kochliwe” kobiety, które „rozbierały się do naga przed obcymi”, piękne kościoły i luterańskie nabożeństwa (wierni zasłaniali oczy kapeluszami i chustkami). Pasek podziwia niektóre elementy (kościoły, porządek), ale wyżej ceni obyczaje polskie. Jest typowym Sarmatą – otwarty na obserwację, ale ksenofobiczny w ocenie.",
      metadata: {
        explanation:
          "Opis wyprawy duńskiej ukazuje Paska jako wnikliwego, choć stronniczego obserwatora obcych kultur. Porównanie z polskimi zwyczajami służy waloryzacji rodzimej tradycji – cecha charakterystyczna dla sarmackiej mentalności.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Wyjaśnij, jak poniższe hasło epoki realizowane jest w „Pamiętnikach” Paska:",
      content: {
        slogan: "Sarmatyzm",
      },
      correctAnswer:
        "Sarmatyzm – ideologia polskiej szlachty wywodzącej się od starożytnych Sarmatów – przenika „Pamiętniki” na każdym poziomie. Pasek jest typowym Sarmatą: waleczny żołnierz i dumny ziemianin, gorliwy katolik (choć powierzchownie), przywiązany do tradycji, ksenofobiczny wobec obcych kultur, skłonny do przepychu i biesiad. Język utworu (makaronizmy), forma (gawęda szlachecka) i treść (wyolbrzymianie zasług, podkreślanie swojego honoru) są wyrazem sarmackiej mentalności.",
      metadata: {
        explanation:
          "„Pamiętniki” Paska to najważniejszy literacki dokument sarmatyzmu. Utwór pozwala zrozumieć zarówno pozytywne (waleczność, patriotyzm, gościnność), jak i negatywne (pijaństwo, awanturnictwo, ksenofobia, powierzchowna religijność) cechy sarmackiej szlachty.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Dlaczego „Pamiętniki” Paska nie można traktować jako w pełni obiektywne źródło historyczne?",
      content: {
        options: [
          "Bo zostały napisane w języku łacińskim, który zniekształca fakty",
          "Bo Pasek spisywał je z pamięci po wielu latach, wyolbrzymiał swoją rolę i mieszał fakty z fikcją literacką",
          "Bo zostały zniszczone i zachowały się tylko fragmenty",
          "Bo autor celowo fałszował historię na zlecenie króla",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek spisywał „Pamiętniki” pod koniec życia, z perspektywy kilkudziesięciu lat. Poddawał materiał selekcji i obróbce literackiej, wyolbrzymiał własne zasługi, koloryzował i nadawał faktom formę barwnych anegdot. Pominął też niewygodne wydarzenia, np. liczne procesy sądowe znane z ksiąg sądowych.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jaki epizod ukazuje sprzeczność między religijnością Paska a jego zachowaniem?",
      content: {
        options: [
          "Budowa kościoła na własny koszt",
          "Służenie do mszy z rękami zbroczonymi krwią wrogów, co ksiądz uświęcił słowami o Bożej chwale",
          "Odmowa udziału w nabożeństwie luterańskim w Danii",
          "Modlitwa przed każdą bitwą o zwycięstwo",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Słynny epizod mszy wojennej ukazuje paradoks sarmackiej religijności: Pasek służy do mszy ze zbroczonymi krwią rękami, a ksiądz uspokaja go: „nie brzydzi się Bóg krwią rozlaną dla imienia swego”. To obraz religijności zewnętrznej, obrzędowej, która nie wpływa na moralność postępowania.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jaki jest stosunek Paska do chłopów widoczny w „Pamiętnikach”?",
      content: {
        options: [
          "Współczuje im i dąży do poprawy ich losu",
          "Traktuje ucisk i niewolę chłopów jako naturalny porządek rzeczy",
          "Zachęca do zniesienia pańszczyzny",
          "Nie wspomina o chłopach w ogóle",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek myśli kategoriami przeciętnego szlachcica XVII wieku – ucisk i niewolę chłopów uważa za naturalny stan rzeczy. Nie dostrzega w tym problemu moralnego, co jest typowe dla sarmackiej mentalności, w której chłop stanowił jedynie narzędzie w rękach szlachcica-gospodarza.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Który pisarz czerpał inspirację z „Pamiętników” Paska przy tworzeniu swoich powieści historycznych?",
      content: {
        options: [
          "Adam Mickiewicz w „Panu Tadeuszu”",
          "Henryk Sienkiewicz w „Trylogii”",
          "Bolesław Prus w „Lalce”",
          "Stefan Żeromski w „Przedwiośniu”",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Henryk Sienkiewicz czerpał z „Pamiętników” Paska inspirację do „Trylogii” (zwłaszcza „Potopu”), wykorzystując zarówno fakty historyczne, jak i sarmacki koloryt obyczajowy. Postać Kmicica ma cechy wspólne z Paskiem – jest waleczny, porywczy i nieobliczalny.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jaką funkcję pełnią anegdoty i dygresje w „Pamiętnikach” Paska?",
      content: {
        options: [
          "Są wadą tekstu – świadczą o braku umiejętności narracyjnych autora",
          "Ożywiają narrację, budują portret autora i oddają charakter szlacheckiej gawędy",
          "Służą wyłącznie celom dydaktycznym",
          "Zastępują brakujące dane historyczne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Anegdoty i dygresje to świadomy zabieg stylistyczny – nadają tekstowi charakter gawędy szlacheckiej. Ożywiają narrację, budują autoportret Paska (jako dowcipnego i towarzyskiego szlachcica), oddają atmosferę epoki i sprawiają, że „Pamiętniki” są żywą, wciągającą lekturą.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Czego Pasek celowo nie opisał w „Pamiętnikach”, choć znamy te fakty z innych źródeł?",
      content: {
        options: [
          "Swoich podróży zagranicznych",
          "Swoich licznych procesów sądowych, awantur i wyroków – znanych z ksiąg sądowych",
          "Swojego udziału w wojnach",
          "Swojego małżeństwa",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek celowo pominął niewygodne fakty – liczne procesy sądowe, awantury i wyroki, które znamy z ksiąg sądowych. Tworzył pozytywny obraz siebie dla rodziny i potomnych, dokonując selekcji materiału. To dowód na literacki i kreacyjny charakter „Pamiętników”.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jak Pasek przedstawia ideał życia ziemiańskiego w drugiej części „Pamiętników”?",
      content: {
        options: [
          "Jako monotonne i nudne – tęskni za wojną",
          "Jako harmonijne życie w zgodzie z naturą: polowania, hodowla zwierząt, gościnność, udział w sejmikach",
          "Jako życie wyłącznie poświęcone modlitwie i ascezie",
          "Jako ciężką pracę fizyczną na roli",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pasek kreśli sarmacki ideał życia ziemiańskiego: życie w rytmie natury, polowania, hodowla ptaków i zwierząt, gościnność, biesiady, udział w życiu publicznym (sejmiki, elekcje). Jest to obraz typowego szlachcica-Sarmaty, który po wojnach cieszy się spokojem wsi.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jakie znaczenie ma deklaracja Paska: „opisać sprawy życia mego, a nie sprawy RP”?",
      content: {
        options: [
          "Wyraża brak patriotyzmu autora",
          "Podkreśla subiektywny, autobiograficzny charakter dzieła – historia jest tłem dla osobistych przeżyć",
          "Oznacza, że „Pamiętniki” nie zawierają żadnych informacji historycznych",
          "Jest wyrazem krytyki polityki Rzeczypospolitej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Deklaracja ta wyraźnie określa charakter „Pamiętników” – to utwór autobiograficzny, w którym wydarzenia historyczne stanowią tło dla osobistych przeżyć autora. Pasek nie pretenduje do roli historyka, lecz opowiadacza własnych losów – co jest fundamentalną cechą gatunku pamiętnika.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (5: 1 matching, 4 standard) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Które motywy literackie występują w „Pamiętnikach” Paska?",
      content: {
        options: [
          "Motyw wędrówki i podróży (wyprawy wojenne, poznawanie obcych kultur)",
          "Motyw ziemiańskiego arkadii (idealizacja życia na wsi)",
          "Motyw zstąpienia do piekła (katabaza)",
          "Motyw przemiany i dojrzewania bohatera (od żołnierza do ziemianina)",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W „Pamiętnikach” obecne są: motyw podróży (Dania, Węgry, Moskwa), motyw ziemiańskiej arkadii (idealizacja życia na wsi w II części), motyw przemiany bohatera (od żołnierza do osiadłego ziemianina). Motyw katabazy (zstąpienia do piekła) nie występuje w tym utworze.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Połącz cechy „Pamiętników” z ich przynależnością do tradycji literackiej:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Gawęda szlachecka" },
          { id: "B", text: "Pamiętnik" },
          { id: "C", text: "Anegdota" },
        ],
        rightColumn: [
          { id: "1", text: "Zwroty do słuchacza, swoboda narracji, dygresje" },
          { id: "2", text: "Wspomnienia autora z dystansu czasowego" },
          {
            id: "3",
            text: "Krótkie, humorystyczne opowiastki ilustrujące tezę",
          },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      metadata: {
        explanation:
          "„Pamiętniki” łączą trzy tradycje: gawędę szlachecką (swoboda, dygresje, zwroty do odbiorcy), pamiętnik (wspomnienia z dystansu czasowego) i anegdotę (krótkie humorystyczne opowiastki). Ta mieszanka gatunkowa czyni utwór niejednorodnym, ale niezwykle barwnym.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Które stwierdzenia o autoportrecie Paska w „Pamiętnikach” są uzasadnione?",
      content: {
        options: [
          "Pasek kreuje pozytywny obraz siebie – walecznego, dowcipnego i bogobojnego szlachcica",
          "Mimo intencji autora, portret ujawnia też negatywne cechy: próżność, brutalność i ksenofobię",
          "Pasek jest w pełni samokrytyczny i dostrzega swoje wady",
          "Autoportret Paska jest cennym dokumentem mentalności sarmackiej szlachty",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Pasek świadomie buduje pozytywny autoportret, ale mimowolnie ujawnia cechy negatywne: pychę, brutalność, ksenofobię, powierzchowną religijność. Nie jest samokrytyczny – jego wady widoczne są mimo intencji autora. Właśnie dlatego „Pamiętniki” są cennym dokumentem mentalności sarmackiej.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Które środki stylistyczne i cechy językowe są charakterystyczne dla „Pamiętników”?",
      content: {
        options: [
          "Makaronizmy – wtrącenia łacińskie w polskim tekście",
          "Styl gawędziarski – swoboda narracji, anegdoty, humor",
          "Precyzyjny, naukowy styl analityczny",
          "Język potoczny, barwny, pełen przysłów i porównań",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Język „Pamiętników” jest barwny i potoczny, pełen makaronizmów (łacina), przysłów, porównań i zwrotów gawędziarskich. Styl jest daleki od naukowej precyzji – Pasek opowiada jak doświadczony gawędziarz, nie jak kronikarz.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Które wady sarmackie ujawniają się w „Pamiętnikach” Paska?",
      content: {
        options: [
          "Ksenofobia – poczucie wyższości nad innymi narodami",
          "Powierzchowna religijność – obrzędowość bez głębi moralnej",
          "Głębokie zaangażowanie w reformy ustrojowe państwa",
          "Skłonność do pijaństwa i awanturnictwa",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Pamiętniki” ujawniają typowe wady sarmackie: ksenofobię (wyśmiewanie obcych kultur), powierzchowną religijność (msza z krwawymi rękami), pijaństwo (Pasek sam chorował ciężko z powodu „przepicia”), awanturnictwo (bójki, procesy sądowe). Pasek nie angażował się w reformy – był konserwatywnym szlachcicem.",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Przeczytaj opis i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Jan Chryzostom Pasek",
          title: "Pamiętniki",
          text: "Opisać sprawy życia mego, a nie sprawy RP.",
          bookReference: "Pamiętniki, fragment programowy",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Jak ta deklaracja określa charakter „Pamiętników”? Co z niej wynika dla sposobu przedstawiania historii?",
            minWords: 20,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Jakie konsekwencje ma taki sposób pisania dla wiarygodności tekstu jako źródła historycznego?",
            minWords: 20,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Deklaracja określa „Pamiętniki” jako utwór autobiograficzny, nie historyczny. Historia jest tłem dla osobistych przeżyć autora – Pasek nie pretenduje do obiektywizmu, lecz opowiada o sobie. Wynika z tego subiektywna perspektywa narracji. 2) Konsekwencją jest ograniczona wiarygodność historyczna: Pasek selekcjonuje fakty, wyolbrzymia swoją rolę, pomija niewygodne wydarzenia. Nie jest bezstronnym kronikarzem, lecz zaangażowanym gawędziarzem tworzącym pozytywny obraz siebie. Tekst ma wartość raczej jako dokument mentalności szlacheckiej niż jako źródło faktograficzne.",
      metadata: {
        explanation:
          "Ta deklaracja jest kluczem do interpretacji „Pamiętników” – wyznacza perspektywę autobiograficzną i wyjaśnia, dlaczego Pasek opowiada o historii przez pryzmat własnych przeżyć, nie dążąc do obiektywizmu.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Wyjaśnij, na czym polega sprzeczność między religijnością Paska a jego zachowaniem. Podaj przykład z tekstu.",
      content: {
        steps: [
          {
            id: 1,
            instruction: "Opisz, jak Pasek manifestuje swoją religijność.",
          },
          {
            id: 2,
            instruction:
              "Wskaż, w jaki sposób jego postępowanie zaprzecza deklarowanym wartościom religijnym.",
          },
        ],
      },
      correctAnswer:
        "1) Pasek manifestuje religijność przez przestrzeganie obrzędów katolickich: postów, jałmużn, odpustów, uczestnictwo w nabożeństwach. Uważa się za gorliwego katolika i obrońcę wiary. Wyśmiewa luterańskie nabożeństwa w Danii. 2) Jego postępowanie zaprzecza wartościom chrześcijańskim: służy do mszy ze zbroczonymi krwią rękami, a ksiądz to akceptuje; jest brutalny wobec wrogów i poddanych; chciwie rabuje łupy; pije i awanturuje się. Jego religijność jest zewnętrzna – sprowadza się do obrzędów bez głębszej refleksji moralnej. To paradoks typowy dla sarmackiego katolicyzmu.",
      metadata: {
        explanation:
          "Sprzeczność między deklarowaną pobożnością a brutalnym zachowaniem jest jednym z najważniejszych problemów interpretacyjnych „Pamiętników”. Ukazuje powierzchowność sarmackiej religijności i brak wewnętrznej przemiany moralnej.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Porównaj Paska jako żołnierza (część I) i jako ziemianina (część II). Co się zmienia, a co pozostaje takie samo?",
      content: {},
      correctAnswer:
        "Zmienia się tryb życia: z wojskowego na osiadły, z bitew na polowania, z obozów na dworek. Zmienia się też tematyka narracji: z batalistycznych opisów na codzienność ziemiańską, majątki, sejmiki, hodowlę zwierząt. Natomiast nie zmienia się charakter Paska: pozostaje próżny (chwalenie się polowaniami zamiast bitwami), skłonny do awantur (procesy sądowe), powierzchownie pobożny i przekonany o własnej wyjątkowości. Nie zmienia się też styl narracji – gawędziarski, barwny, pełen anegdot. Pasek po prostu przenosi sarmackie cechy z pola bitwy na wiejskie podwórko.",
      metadata: {
        explanation:
          "Porównanie obu części ujawnia ciągłość sarmackiego charakteru Paska – zmienia się otoczenie, ale nie mentalność. To ważny argument za interpretacją „Pamiętników” jako portretu sarmackiej szlachty, nie tylko jednej osoby.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Sarmacki portret szlachcica w „Pamiętnikach” Jana Chryzostoma Paska",
        requirements: [
          "Wymień cechy pozytywne i negatywne Paska jako Sarmaty",
          "Wskaż, jak Pasek nieświadomie ujawnia swoje wady",
          "Odnieś się do ideologii sarmatyzmu",
          "80–120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Pasek w „Pamiętnikach” kreśli autoportret typowego Sarmaty – szlachcica łączącego cechy pozytywne z negatywnymi. Z jednej strony jest waleczny, patriotyczny, gościnny i przywiązany do tradycji. Z drugiej – próżny, brutalny, ksenofobiczny, skłonny do pijaństwa i awantur. Jego religijność jest powierzchowna: przestrzega obrzędów, ale nie zmienia postępowania (msza ze zbroczonymi krwią rękami). Pasek buduje pozytywny obraz siebie, lecz mimowolnie ujawnia ciemne strony sarmatyzmu: pychę, brak samokrytycyzmu i pogardę dla niższych stanów. „Pamiętniki” są jednocześnie apoteozą i krytyką sarmackiej mentalności – choć Pasek nie zamierzał być krytykiem.",
      metadata: {
        explanation:
          "Portret Sarmaty w „Pamiętnikach” jest jednym z najczęstszych zagadnień maturalnych. Kluczowe jest dostrzeżenie nieintencjonalności krytyki – Pasek chce się chwalić, ale mimowolnie ujawnia wady. To czyni „Pamiętniki” cenniejszym dokumentem niż świadoma krytyka.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Badacze wskazują, że Pasek tworzy w „Pamiętnikach” literacką kreację siebie. Która interpretacja najlepiej opisuje ten mechanizm?",
      content: {
        options: [
          "Pasek pisze wyłącznie prawdę, bez żadnej kreacji literackiej",
          "Pasek świadomie selekcjonuje fakty, pomija kompromitujące wydarzenia i nadaje wspomnieniom formę barwnych anegdot, tworząc pozytywny autoportret szlachcica-Sarmaty dla potomnych – ale nieświadomie ujawnia też wady swojego środowiska",
          "Pasek celowo pisze satyrę na szlachtę sarmacką, demaskując jej wady",
          "Pasek pisze kronikę urzędową, nie tworząc żadnej kreacji artystycznej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” to dzieło o podwójnym wymiarze: Pasek świadomie kreuje pozytywny wizerunek siebie (pomija procesy, wyolbrzymia zasługi), ale nieświadomie ujawnia wady – brutalność, pijaństwo, ksenofobię, powierzchowną religijność. Nie jest satyrykiem – jego krytyczny portret sarmatyzmu powstaje wbrew intencjom autora.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jak interpretować fakt, że „Pamiętniki” Paska stały się niezwykle popularne wśród romantyków po wydaniu w 1836 roku?",
      content: {
        options: [
          "Romantycy cenili jedynie walory historyczne tekstu",
          "Romantycy szukali w „Pamiętnikach” wzorców „dawnej Polski” – sarmackiej waleczności i barwności – jako źródła tożsamości narodowej w czasach zaborów, a utwór dostarczał kolorytowego obrazu szlacheckiego życia",
          "Popularność wynikała wyłącznie z humoru i anegdot",
          "Romantycy potrzebowali tekstu do krytyki szlachty",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Romantycy (Mickiewicz, Słowacki) szukali w XVII-wiecznej Polsce źródeł tożsamości narodowej w czasach zaborów. „Pamiętniki” Paska dostarczały barwnego obrazu „dawnej Polski” – walecznej, wolnej, kolorytowej. Sienkiewicz później wykorzystał ten materiał w „Trylogii”, mitologizując sarmacką przeszłość. Popularność miała wymiar zarówno literacki, jak i patriotyczny.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Które porównania „Pamiętników” Paska z innymi dziełami literackimi są merytorycznie uzasadnione?",
      content: {
        options: [
          "Postać Kmicica z „Potopu” Sienkiewicza wykazuje podobieństwa do Paska – waleczny, porywczy szlachcic, który się przemienia",
          "Sarmacki autoportret Paska można zestawić z portretem szlachcica w „Panu Tadeuszu” Mickiewicza – oba ukazują mentalność szlachecką, choć z różnych perspektyw",
          "„Pamiętniki” Paska są bezpośrednim wzorem dla „Zbrodni i kary” Dostojewskiego",
          "Gawędziarski styl Paska kontynuują późniejsi pisarze, np. Sienkiewicz w narracji „Trylogii”",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Kmicic z „Potopu” ma cechy Paska (waleczny awanturnik); „Pan Tadeusz” ukazuje szlachtę z romantycznej perspektywy, ale sarmackie korzenie są wspólne; Sienkiewicz nawiązuje do gawędziarskiego stylu Paska. „Zbrodnia i kara” Dostojewskiego nie ma związku z „Pamiętnikami”.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Które z poniższych stwierdzeń o „Pamiętnikach” jako dokumencie epoki baroku są uzasadnione?",
      content: {
        options: [
          "Utwór odzwierciedla barokowe napięcie między sacrum a profanum (religijność vs. brutalność)",
          "Barwny, rozbudowany styl z makaronizmami jest typowy dla barokowej estetyki przepychu",
          "Subiektywizm narracji odpowiada barokowemu zainteresowaniu jednostką i jej przeżyciami",
          "„Pamiętniki” są wyrazem oświeceniowego racjonalizmu i krytycyzmu",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "„Pamiętniki” są typowym dziełem baroku: napięcie sacrum–profanum (religijność i brutalność), przepych stylistyczny (makaronizmy, anegdoty), subiektywizm (autobiografia). Oświeceniowy racjonalizm jest obcy Paskowi – jest on człowiekiem baroku, nie oświecenia.",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Sarmacki portret polskiego szlachcica. Omów zagadnienie na podstawie znanych Ci fragmentów „Pamiętników” Jana Chryzostoma Paska. W swojej odpowiedzi uwzględnij również wybrany kontekst.",
      content: {
        thesis:
          "Pasek jako typowy Sarmata – portret szlachcica z jego zaletami i wadami",
        structure: {
          introduction:
            "Przedstaw tezę: Pasek kreśli w „Pamiętnikach” autoportret typowego Sarmaty, ujawniając zarówno zalety, jak i wady sarmackiej mentalności",
          arguments_for:
            "Cechy pozytywne: waleczność, patriotyzm, gościnność, miłość do natury (wydra). Cechy negatywne: próżność, pijaństwo, ksenofobia, brutalność, powierzchowna religijność. Nieintencjonalność krytyki – Pasek chce się chwalić, ale ujawnia wady",
          arguments_against:
            "Rozważ: czy Pasek jest typowym Sarmatą, czy wyjątkiem? Czy jego autoportret jest wiarygodny, skoro jest wyidealizowany?",
          conclusion:
            "„Pamiętniki” to jednocześnie apoteoza i mimowolna krytyka sarmatyzmu. Odwołaj się do kontekstu",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej trzech epizodów z „Pamiętników”",
          "Kontekst literacki (np. Sienkiewicz „Potop”, Mickiewicz „Pan Tadeusz”, Krasicki „Satyry”)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Przedstawić cechy sarmackie Paska na konkretnych przykładach: waleczność (bitwy pod Czarnieckim), próżność (wyolbrzymianie zasług), religijność powierzchowna (msza z krwawymi rękami), ksenofobia (opis Danii), miłość do zwierząt (wydra Robak). 2) Wykazać, że krytyczny obraz sarmatyzmu powstaje wbrew intencjom autora – Pasek buduje pozytywny autoportret, ale mimowolnie ujawnia wady. 3) Porównać z kontekstem: Kmicic z „Potopu” (Sienkiewicz mitologizuje Sarmatę), szlachta w „Panu Tadeuszu” (nostalgia romantyczna), krytyka w „Satyrach” Krasickiego (oświeceniowa demaskacja). 4) Wyciągnąć wniosek o złożoności portretu sarmackiego.",
      metadata: {
        explanation:
          "Sarmacki portret szlachcica to jedno z najważniejszych zagadnień maturalnych związanych z „Pamiętnikami”. Kluczowe jest ukazanie ambiwalencji – Pasek jest i chwalcą, i mimowolnym krytykiem sarmatyzmu.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "„Pamiętniki” Paska sytuują się na pograniczu kilku tradycji literackich. Które zestawienie najdokładniej opisuje ich charakter?",
      content: {
        options: [
          "Utwór czysto kronikarski, pozbawiony walorów literackich",
          "Dzieło na pograniczu prozy autobiograficznej, gawędy szlacheckiej i historiografii – łączące subiektywizm pamiętnika z barwnością anegdoty i wartością dokumentu epoki, w którym kreacja literacka splata się z intencją kronikarską",
          "Powieść historyczna w pełnym tego słowa znaczeniu",
          "Utwór publicystyczny o charakterze politycznym",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” to dzieło gatunkowo niejednorodne: łączy pamiętnik (subiektywne wspomnienia), gawędę szlachecką (anegdoty, humor, zwroty do słuchacza), elementy romansu (historia z Eleonorą w Danii) i historiografii (relacje z bitew). Kreacja literacka współistnieje z intencją kronikarską – Pasek jest jednocześnie opowiadaczem i kronikarzem.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Jak interpretować rolę „Pamiętników” Paska w kształtowaniu polskiej pamięci zbiorowej o epoce sarmackiej?",
      content: {
        options: [
          "„Pamiętniki” nie miały żadnego wpływu na polską kulturę",
          "Utwór ukształtował romantyczny mit „dawnej Polski” (walecznej, barwnej, wolnej), który następnie zmitologizował Sienkiewicz w „Trylogii” – tworząc obraz sarmatyzmu oscylujący między nostalgią a krytyką, stanowiący fundament polskiej tożsamości narodowej w czasach zaborów",
          "„Pamiętniki” są źródłem wyłącznie negatywnego obrazu szlachty",
          "Utwór miał znaczenie tylko w XVII wieku, później o nim zapomniano",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "„Pamiętniki” Paska, wydane w 1836 roku, stały się fundamentem romantycznego mitu „dawnej Polski”. Sienkiewicz czerpał z nich inspirację do „Trylogii”, mitologizując sarmacką przeszłość. Obraz sarmatyzmu ukształtowany przez Paska (i przetransmitowany przez Sienkiewicza) stał się częścią polskiej tożsamości narodowej – oscylując między nostalgią za waleczną szlachtą a świadomością jej wad.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Które z poniższych tez o relacji „Pamiętników” Paska z tradycją literacką są merytorycznie uzasadnione?",
      content: {
        options: [
          "„Pamiętniki” kontynuują tradycję silva rerum (szlacheckich ksiąg domowych), ale nadają jej wyraźną formę literacką dzięki gawędziarskiemu talentowi autora",
          "Utwór stanowi ogniwo łączące staropolskie pamiętnikarstwo z XIX-wieczną powieścią historyczną (Sienkiewicz), dostarczając jej materiału fabularnego i kolorytowego",
          "Pasek świadomie tworzy krytykę oświeceniową szlachty sarmackiej, wyprzedzając Krasickiego",
          "Gawędziarski styl Paska wpisuje się w tradycję ustnej narracji szlacheckiej, przenosząc ją na papier i utrwalając dla potomnych",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "„Pamiętniki” wyrastają z tradycji silva rerum, ale Pasek nadaje im formę literacką. Stanowią ogniwo między staropolskim pamiętnikarstwem a powieścią historyczną XIX w. (Sienkiewicz). Gawędziarski styl przenosi tradycję ustną na papier. Pasek NIE jest świadomym krytykiem – nie wyprzedza oświeceniowej krytyki Krasickiego, gdyż jego obraz wad sarmatyzmu jest nieintencjonalny.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Jan Chryzostom Pasek",
          title: "Pamiętniki",
          text: "Nie wadzi to nic, nie brzydzi się Bóg krwią rozlaną dla imienia swego.",
          bookReference: "Pamiętniki, epizod mszy wojennej",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Zinterpretuj te słowa w kontekście sarmackiej religijności. Co mówią o relacji między wiarą a wojną w mentalności szlacheckiej?",
            minWords: 50,
            maxPoints: 3,
          },
          {
            id: 2,
            instruction:
              "Odnieś ten epizod do problematyki całego utworu: jak się ma do portretu Paska jako Sarmaty? Czy Pasek dostrzega sprzeczność?",
            minWords: 50,
            maxPoints: 2,
          },
        ],
        requirements: [
          "Odwołaj się do kontekstu sarmackiego katolicyzmu",
          "Uwzględnij napięcie między obrzędowością a moralnością",
          "Łącznie 120–170 słów",
        ],
        wordLimit: { min: 120, max: 170 },
      },
      correctAnswer:
        "1) Słowa księdza uświęcają brutalność wojny, łącząc religię z przemocą. W sarmackiej mentalności walka za wiarę (miles Christi) była szlachetna – Polska jako „przedmurze chrześcijaństwa” uzasadniała religijnie każdą wojnę. Krew przelana „dla imienia Bożego” nie splamiała, lecz uszlachetniała. To obraz religijności instrumentalnej: wiara służy legitymizacji przemocy, nie przemianie moralnej. 2) Epizod jest kwintesencją sarmackiego paradoksu Paska: gorliwy katolik, który nie widzi sprzeczności między obrzędowością a brutalnością. Pasek relacjonuje tę scenę z aprobatą – nie dostrzega absurdu sytuacji. Właśnie ta nieświadomość czyni „Pamiętniki” tak cennym dokumentem: Pasek mimowolnie demaskuje powierzchowność sarmackiego katolicyzmu, choć sam jest przekonany o swojej pobożności.",
      metadata: {
        explanation:
          "Epizod mszy wojennej to jeden z najczęściej interpretowanych fragmentów „Pamiętników”. Ukazuje fundamentalną sprzeczność sarmackiej religijności: obrzędowość bez głębi moralnej. Jest też przykładem nieintencjonalnej demaskacji – Pasek nie widzi problemu, co czyni jego świadectwo bardziej wiarygodnym.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "BAROQUE",
      work: "Pamiętniki",
      question:
        "Ideał życia ziemiańskiego i rodzinnego ładu. Omów zagadnienie na podstawie znanych Ci fragmentów „Pamiętników” Jana Chryzostoma Paska. W swojej odpowiedzi uwzględnij również wybrany kontekst literacki.",
      content: {
        thesis:
          "Pasek kreśli w „Pamiętnikach” sarmacki ideał życia ziemiańskiego, jednocześnie ujawniając jego ograniczenia i ciemne strony",
        structure: {
          introduction:
            "Zarysuj problem: czym jest ideał życia ziemiańskiego w kulturze sarmackiej i jak realizuje go Pasek?",
          arguments_for:
            "Argumenty: życie w rytmie natury, polowania, hodowla zwierząt (wydra), gościnność, troska o majątek, udział w życiu publicznym (sejmiki). Pasek jako archetyp szlachcica-ziemianina. Sarmackie wartości: tradycja, rodzina, wiara",
          arguments_against:
            "Rozważ: czy obraz jest pełny? Pasek pomija wady (procesy, pijaństwo w 1685). Czy ideał ziemiański nie opiera się na wyzysku chłopów? Czy gościnność nie przechodzi w rozpustę?",
          conclusion:
            "Sarmacki ideał ziemiański jest jednocześnie piękny (harmonia z naturą) i iluzoryczny (oparty na wyzysku, pomijający ciemne strony). Porównaj z kontekstem",
        },
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do co najmniej trzech epizodów z „Pamiętników” (wydra, polowania, ślub, gospodarstwo)",
          "Kontekst literacki (np. „Pan Tadeusz” Mickiewicza, „Żywot człowieka poczciwego” Reja, „Pijaństwo” Krasickiego)",
          "Analiza zarówno pozytywnych, jak i negatywnych aspektów ideału",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Przedstawić sarmacki ideał życia ziemiańskiego w „Pamiętnikach”: życie na wsi po ślubie z Anną Łącką, polowania, hodowla ptaków i wydry, gościnność, sejmiki. 2) Wskazać pozytywne aspekty: harmonia z naturą (czułość wobec zwierząt), rodzinność (ślub, troska o majątek), patriotyzm (udział w życiu publicznym). 3) Wykazać ciemne strony: wyzysk chłopów traktowany jako naturalny porządek, pominięcie w „Pamiętnikach” procesów sądowych i awantur, ciężka choroba z przepicia w 1685 r. 4) Porównać z kontekstem: „Żywot człowieka poczciwego” Reja (renesansowy ideał ziemiański), „Pan Tadeusz” Mickiewicza (romantyczna nostalgia za dworkiem), „Pijaństwo” Krasickiego (oświeceniowa krytyka szlacheckich wad). 5) Wyciągnąć wniosek: ideał ziemiański w „Pamiętnikach” jest jednocześnie autentyczny i wykreowany, piękny i iluzoryczny.",
      metadata: {
        explanation:
          "Ideał życia ziemiańskiego to kluczowy motyw drugiej części „Pamiętników” i ważne zagadnienie maturalne. Kluczowe jest ukazanie złożoności: Pasek kreuje pozytywny obraz, ale uważny czytelnik dostrzeże jego ograniczenia i ciemne strony.",
      },
    },

    // ======================= POCZĄTEK PYTAŃ BOSKA KOMEDIA ===================//

    // ===== DIFFICULTY 1 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Kto jest autorem \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "Francesco Petrarka",
          "Giovanni Boccaccio",
          "Dante Alighieri",
          "Wergiliusz",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Autorem \u201eBoskiej komedii\u201d jest Dante Alighieri (1265\u20131321), florencki poeta, uznawany za jednego z najwybitniejszych twórców literatury europejskiej. Utwór powstawał w latach ok. 1307\u20131321.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Z ilu części składa się \u201eBoska komedia\u201d?",
      content: {
        options: [
          "Z dwóch: Piekło i Raj",
          "Z trzech: Piekło, Czyściec i Raj",
          "Z czterech: Piekło, Czyściec, Raj i Empireum",
          "Z pięciu części odpowiadających pięciu zmysłom",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201eBoska komedia\u201d składa się z trzech części (kantyków): Piekło (Inferno), Czyściec (Purgatorio) i Raj (Paradiso). Każda z nich liczy 33 pieśni, a Piekło dodatkowo posiada pieśń wstępną, co daje łącznie 100 pieśni.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Kto jest głównym bohaterem i narratorem \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "Wergiliusz",
          "Beatrycze",
          "Dante (sam autor)",
          "Św. Bernard",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Głównym bohaterem i narratorem jest sam Dante, który opowiada w pierwszej osobie o swojej wędrówce przez zaświaty. Utwór ma charakter autobiograficzny \u2013 poeta jest jednocześnie autorem, narratorem i bohaterem.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Kto prowadzi Dantego przez Piekło i Czyściec?",
      content: {
        options: [
          "Beatrycze",
          "Wergiliusz",
          "Św. Bernard z Clairvaux",
          "Charon",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wergiliusz, starożytny poeta rzymski, autor \u201eEneidy\u201d, jest przewodnikiem Dantego przez Piekło i Czyściec. Symbolizuje rozum ludzki i mądrość starożytną. Nie może wejść do Raju, bo nie znał wiary chrześcijańskiej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Kto jest przewodniczką Dantego w Raju?",
      content: {
        options: ["Maryja Panna", "Łucja", "Beatrycze", "Rachela"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Beatrycze, ukochana Dantego (wzorowana na Beatrycze Portinari), prowadzi go przez sfery Raju. Symbolizuje wiarę, teologię i miłość boską, która wynosi duszę ku Bogu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Jaki napis widnieje nad bramą Piekła w \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "\u201eTu kara wieczna czeka grzeszników\u201d",
          "\u201eWchodzący we mnie, zostawcie nadzieję!\u201d",
          "\u201eOdwagi, wędrowcze, tu sprawiedliwość mieszka\u201d",
          "\u201ePrzez cierpienie do chwały\u201d",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Nad bramą Piekła widnieje słynny napis kończący się słowami: \u201eWchodzący we mnie, zostawcie nadzieję!\u201d (Lasciate ogne speranza, voi ch\u2019intrate). Jest to jeden z najbardziej rozpoznawalnych cytatów w literaturze światowej.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Ile kręgów liczy Piekło w \u201eBoskiej komedii\u201d?",
      content: {
        options: ["Siedem", "Dziewięć", "Dziesięć", "Dwanaście"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Piekło Dantego składa się z dziewięciu kręgów, w których grzesznicy cierpią kary proporcjonalne do popełnionych grzechów. Kręgi zwężają się ku dołowi, aż do samego środka ziemi, gdzie uwięziony jest Lucyfer.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "W jakim języku Dante napisał \u201eBoską komedię\u201d?",
      content: {
        options: [
          "Po łacinie",
          "Po włosku (w dialekcie toskańskim)",
          "Po prowansalsku",
          "Po grecku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dante napisał \u201eBoską komedię\u201d po włosku, w dialekcie toskańskim (florentynskim), co było rewolucyjne, gdyż większość średniowiecznych dzieł powstawała po łacinie. Dzięki temu Dante jest uznawany za ojca języka włoskiego.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_SINGLE z sourceText (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Gdzie w zaświatach znajduje się Dante na początku utworu?",
      content: {
        sourceText: {
          author: "Dante Alighieri",
          title: "Boska komedia",
          text: "Z prostego toru w naszych dni połowie / Wszedłem w las ciemny; jaka gęstwa dzika, / Jakie w tym lesie okropne pustkowie",
          bookReference: "Piekło, Pieśń I",
        },
        options: [
          "W ciemnym lesie, symbol zagubienia duchowego",
          "W ogrodzie rajskim",
          "Na brzegu rzeki Styks",
          "Przed bramą piekielną",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Utwór zaczyna się od sceny, w której Dante w \u201epołowie drogi życia\u201d (w wieku ok. 35 lat) gubi się w ciemnym lesie, będącym alegorią zagubienia duchowego i grzechu. Stąd rozpoczyna się jego wędrówka przez zaświaty.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Jakim gatunkiem literackim jest \u201eBoska komedia\u201d?",
      content: {
        options: [
          "Powieścią rycerską",
          "Poematem epickim (eposem)",
          "Dramatem liturgicznym",
          "Kroniką historyczną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201eBoska komedia\u201d to poemat epicki (epos) o charakterze alegoryczno-wizyjnym. Dante nadał dziełu tytuł \u201eKomedia\u201d, gdyż zaczyna się smutno (Piekło), a kończy szczęśliwie (Raj). Przydomek \u201eboska\u201d dodano w XVI wieku na znak uznania dla artystycznej doskonałości dzieła.",
      },
    },

    // ===== DIFFICULTY 1 — CLOSED_MULTIPLE (3: 1 standard, 1 matching, 1 gap-fill) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Połącz przewodników Dantego z odpowiednimi częściami zaświatów:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Wergiliusz" },
          { id: "B", text: "Beatrycze" },
          { id: "C", text: "Św. Bernard z Clairvaux" },
        ],
        rightColumn: [
          { id: "1", text: "Raj \u2013 sfery niebieskie" },
          { id: "2", text: "Piekło i Czyściec" },
          { id: "3", text: "Ostatnia wizja Boga w Empireum" },
        ],
      },
      correctAnswer: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      metadata: {
        explanation:
          "Dante ma trzech przewodników: Wergiliusz (rozum) prowadzi go przez Piekło i Czyściec; Beatrycze (wiara/teologia) prowadzi przez Raj; św. Bernard (kontemplacja mistyczna) towarzyszy mu w ostatniej wizji Boga w Empireum.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które stwierdzenia o \u201eBoskiej komedii\u201d są prawdziwe?",
      content: {
        options: [
          "Utwór składa się ze 100 pieśni",
          "Każda z trzech części liczy 33 pieśni (Piekło ma dodatkowo pieśń wstępną)",
          "Utwór został napisany po łacinie",
          "Symbolika liczby 3 nawiązuje do Trójcy Świętej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Utwór liczy 100 pieśni: 34 w Piekle (w tym wstępna) i po 33 w Czyśćcu i Raju. Został napisany po włosku, nie po łacinie. Symbolika trójki (3 części, 33 pieśni, tercyna) nawiązuje do Trójcy Świętej.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Akcja \u201eBoskiej komedii\u201d rozgrywa się w ciągu kilku dni, między (1) roku 1300. Trzy zwierzęta napotkane przez Dantego w ciemnym lesie to pantera, lew i (2). Piekło ma kształt (3) zwężającego się ku środkowi ziemi.",
        gaps: [
          {
            id: 1,
            options: [
              "Bożym Narodzeniem a Trzech Króli",
              "Wielkim Czwartkiem a Wielkanocą",
              "letnim a jesiennym przesileniem",
              "karnawałem a Wielkim Postem",
            ],
          },
          {
            id: 2,
            options: ["niedźwiedź", "wilczyca", "smok", "orzeł"],
          },
          {
            id: 3,
            options: ["kuli", "lejka (stożka)", "piramidy", "sześcianu"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Akcja rozgrywa się między Wielkim Czwartkiem a Wielkanocą 1300 r. Trzy zwierzęta (alegorie grzechów) to pantera (rozpusta), lew (pycha) i wilczyca (chciwość). Piekło ma kształt lejka/stożka zwężającego się w dół, z Lucyferem na samym dnie.",
      },
    },

    // ===== DIFFICULTY 1 — SHORT_ANSWER (2) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Kim była Beatrycze i jaką rolę pełni w \u201eBoskiej komedii\u201d?",
      content: {},
      correctAnswer:
        "Beatrycze Portinari była ukochaną Dantego, którą poznał w dzieciństwie we Florencji. Zmarła przedwcześnie w 1290 roku. W \u201eBoskiej komedii\u201d jest postacią idealną \u2013 pełni rolę przewodniczki Dantego po Raju i symbolizuje wiarę, teologię oraz boską miłość, która prowadzi duszę ku zbawieniu.",
      metadata: {
        explanation:
          "Beatrycze to postać historyczna i zarazem symbol. Dante opisał swoją miłość do niej już w młodzieńczym dziele \u201eVita nuova\u201d. W \u201eBoskiej komedii\u201d Beatrycze jest inicjatorką całej wędrówki \u2013 to ona posyła Wergiliusza na pomoc Dantemu.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Co symbolizują trzy zwierzęta, które Dante napotyka w ciemnym lesie na początku utworu?",
      content: {
        hints: ["pantera", "lew", "wilczyca"],
      },
      correctAnswer:
        "Pantera symbolizuje rozpustę (zmysłowość), lew \u2013 pychę, a wilczyca \u2013 chciwość. Są to alegorie trzech głównych grzechów, które zagradzają człowiekowi drogę do cnoty i zbawienia. Wilczyca jest najgroźniejsza \u2013 to ona ostatecznie spycha Dantego z drogi na górę.",
      metadata: {
        explanation:
          "Trzy zwierzęta symbolizują trzy główne kategorie grzechów, odpowiadające podziałowi Piekła: niepowściągliwość (pantera), gwałt (lew) i fałsz/chciwość (wilczyca). Interpretacja nawiązuje do tradycji biblijnej i teologicznej.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_SINGLE (10) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Kto znajduje się w pierwszym kręgu Piekła (Limbie)?",
      content: {
        options: [
          "Mordercy i tyrani",
          "Zdrajcy ojczyzny",
          "Dusze niechrzczonych i cnotliwych pogan, np. filozofowie i poeci starożytni",
          "Dusze samobójców",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "W pierwszym kręgu (Limbie) przebywają dusze niechrzczonych i cnotliwych pogan \u2013 m.in. Homer, Sokrates, Platon, Arystoteles, a także sam Wergiliusz. Nie cierpią fizycznie, ale nie mają nadziei na oglądanie Boga. Ich jedyną karą jest wieczne pragnienie bez spełnienia.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Jaką historię opowiada Francesca da Rimini w V pieśni Piekła?",
      content: {
        options: [
          "Historię kradzieży świętych relikwii",
          "Historię swojej zakazanej miłości do brata męża, Paola",
          "Historię zdrady politycznej wobec Florencji",
          "Historię swojego nawrócenia religijnego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Francesca opowiada, jak podczas wspólnej lektury opowieści o Lancelocie zakochała się w Paolu, bracie swego męża. Ich mąż, odkrywszy romans, zabił oboje. Jest to jeden z najbardziej przejmujących epizodów Piekła \u2013 Dante mdleje ze współczucia, słuchając jej opowieści.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Kto strzeże samego dna Piekła?",
      content: {
        options: ["Cerber", "Minos", "Charon", "Lucyfer (Dis)"],
      },
      correctAnswer: 3,
      metadata: {
        explanation:
          "Na samym dnie Piekła, w dziewiątym kręgu, uwięziony jest Lucyfer (zwany też Dis). Ma trzy twarze i w każdej z trzech paszczy przeżuwa jednego z największych zdrajców: Judasza, Brutusa i Kasjusza. Jego skrzydła wywołują lodowaty wiatr, który zamraża jezioro Kocyt.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Jaką funkcję pełni Minos w Piekle Dantego?",
      content: {
        options: [
          "Jest przewoźnikiem dusz przez rzekę Acheron",
          "Jest sędzią, który ogonem wyznacza grzesznikom krąg kary",
          "Strzeże bramy Piekła",
          "Pilnuje zdrajców na dnie Piekła",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Minos stoi u wejścia do właściwego Piekła (krąg II) i pełni rolę sędziego. Kiedy dusza staje przed nim i wyznaje swe grzechy, Minos owija się ogonem tyle razy, ile kręgów w dół ma ona zstąpić. Jest to postać z mitologii greckiej, przeobrażona przez Dantego w strażnika piekielnego.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Co spotyka hrabiego Ugolina w Piekle i jakie jest jego cierpienie?",
      content: {
        options: [
          "Toczy się w kamiennym kole jak Syzyf",
          "Wiecznie pożera głowę swego wroga, arcybiskupa Ruggieriego",
          "Płonie w ogniu za grzechy polityczne",
          "Stoi zamrożony w lodzie po szyję",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Hrabia Ugolino della Gherardesca, w dziewiątym kręgu Piekła (zdrajcy), wiecznie pożera czaszkę arcybiskupa Ruggieriego, który go zdradził i uwięził wraz z synami i wnukami w wieży, gdzie wszyscy zmarli z głodu. Jest to jeden z najstraszniejszych epizodów Piekła.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Kogo Lucyfer przeżuwa w swoich trzech paszczach na dnie Piekła?",
      content: {
        options: [
          "Adama, Ewę i Węża",
          "Heroda, Piłata i Kaifasza",
          "Judasza, Brutusa i Kasjusza",
          "Nerona, Kaliguę i Domicjana",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Lucyfer w trzech paszczach przeżuwa trzech największych zdrajców: Judasza Iskariota (zdrajcę Chrystusa) w środkowej, oraz Brutusa i Kasjusza (zdrajców Juliusza Cezara, a więc władzy cesarskiej) w bocznych. Odzwierciedla to dantejską koncepcję dwóch najwyższych autorytetów: boskiego i cesarskiego.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Jaki kształt ma Czyściec w \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "Lejka schodzącego w głąb ziemi",
          "Góry z siedmioma kręgami, na szczycie której jest Raj Ziemski",
          "Labiryntu podziemnego",
          "Równiny otoczonej murami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Czyściec ma kształt góry wznoszącej się na antypodach Jerozolimy, pośrodku oceanu. Dzieli się na siedem kręgów odpowiadających siedmiu grzechom głównym, a na szczycie znajduje się Raj Ziemski (Eden). Góra powstała z ziemi, która cofnęła się przed upadającym Lucyferem.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Dlaczego Wergiliusz nie może wejść do Raju?",
      content: {
        options: [
          "Popełnił za życia ciężki grzech",
          "Żył przed Chrystusem i nie był ochrzczony \u2013 brak mu wiary",
          "Nie został zaproszony przez Beatrycze",
          "Był zbyt dumny, by prosić o łaskę",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wergiliusz, jako poeta pogański żyjący w I w. p.n.e., nie znał wiary chrześcijańskiej i nie był ochrzczony. Symbolizuje rozum ludzki, który jest niezbędny na drodze do poznania, ale sam nie wystarczy do zbawienia \u2013 potrzebna jest wiara (Beatrycze) i łaska boska.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Co się dzieje z Dantem, gdy słucha opowieści Franceski da Rimini?",
      content: {
        options: [
          "Wybucha gniewem na niesprawiedliwość kary",
          "Mdleje z litości i współczucia",
          "Modli się za duszę Franceski",
          "Odwraca się od niej z obrzydzeniem",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dante, poruszony historią nieszczęśliwej miłości Franceski i Paola, mdleje ze współczucia. Jest to ważny moment, gdyż pokazuje ludzką stronę bohatera \u2013 poeta-pielgrzym musi nauczyć się godzić ludzkie współczucie z akceptacją boskiej sprawiedliwości.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Czym jest tercyna \u2013 forma wersyfikacyjna, w której napisana jest \u201eBoska komedia\u201d?",
      content: {
        options: [
          "Strofą trzywersową z rymami aba, bcb, cdc...",
          "Strofą czterowersową z rymami abab",
          "Strofą pięciowersową z rymem okalającym",
          "Strofą sześciowersową w stylu pieśni rycerskiej",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "Tercyna (terza rima) to strofa składająca się z trzech wersów (jedenastozgłoskowców) o schemacie rymów aba, bcb, cdc itd. \u2013 rymy przeplatają się łańcuchowo. Formę tę wynalazł sam Dante na potrzeby \u201eBoskiej komedii\u201d. Symbolika trójki nawiązuje do Trójcy Świętej.",
      },
    },

    // ===== DIFFICULTY 2 — CLOSED_MULTIPLE (5: 2 standard, 1 matching, 1 gap-fill, 1 standard) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które postacie z mitologii i starożytności pełnią rolę strażników w Piekle Dantego?",
      content: {
        options: [
          "Charon \u2013 przewoźnik dusz przez Acheron",
          "Cerber \u2013 strażnik kręgu żarłoków",
          "Odyseusz \u2013 strażnik bramy Piekła",
          "Minos \u2013 sędzia piekielny",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Dante przeobraził postacie z mitologii greckiej w strażników piekielnych: Charon przewozi dusze, Cerber pilnuje żarłoków (krąg III), Minos sądzi grzeszników. Odyseusz nie jest strażnikiem \u2013 jest jednym z potępionych (krąg VIII, złych doradców), karany za podstęp z koniem trojańskim.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Połącz kręgi Piekła z grzechami, które są w nich karane:",
      content: {
        matchingType: "events_to_dates",
        leftColumn: [
          { id: "A", text: "Krąg II" },
          { id: "B", text: "Krąg III" },
          { id: "C", text: "Krąg VII" },
          { id: "D", text: "Krąg IX" },
        ],
        rightColumn: [
          { id: "1", text: "Zdrada" },
          { id: "2", text: "Grzech zmysłowości (rozwiązłość)" },
          { id: "3", text: "Obżarstwo (żarłoctwo)" },
          { id: "4", text: "Gwałt (przemoc)" },
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
          "Krąg II \u2013 rozwiązłość (m.in. Francesca i Paolo); Krąg III \u2013 obżarstwo (żarłocy w deszczu); Krąg VII \u2013 gwałt/przemoc (tyrani, samobójcy, bluźniercy); Krąg IX \u2013 zdrada (Judasz, Brutus, Kasjusz, hrabia Ugolino).",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które cechy \u201eBoskiej komedii\u201d są typowe dla literatury średniowiecznej?",
      content: {
        options: [
          "Alegoryczność \u2013 postacie i miejsca mają znaczenie symboliczne",
          "Teocentryzm \u2013 Bóg jest najwyższą wartością i celem wędrówki",
          "Indywidualizm narratora, który opowiada o własnych przeżyciach",
          "Symbolika liczb, zwłaszcza liczby 3 i 9",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Cechy średniowieczne to: alegoryczność (Wergiliusz = rozum, Beatrycze = wiara), teocentryzm (celem jest oglądanie Boga) i symbolika liczb (3, 9, 33, 100). Indywidualizm narratora jest natomiast cechą prekursorską, zapowiadającą renesans.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Wergiliusz symbolizuje w utworze (1). Beatrycze symbolizuje (2). Lucyfer w Piekle Dantego ma (3) twarze.",
        gaps: [
          {
            id: 1,
            options: [
              "wiarę chrześcijańską",
              "rozum ludzki i mądrość starożytną",
              "miłość romantyczną",
              "wolną wolę",
            ],
          },
          {
            id: 2,
            options: [
              "cielesną piękność",
              "wiarę, teologię i boską miłość",
              "zemstę sprawiedliwą",
              "mądrość filozoficzną",
            ],
          },
          {
            id: 3,
            options: ["dwie", "trzy", "siedem", "jedną"],
          },
        ],
      },
      correctAnswer: [1, 1, 1],
      metadata: {
        explanation:
          "Wergiliusz symbolizuje rozum i mądrość starożytną, Beatrycze \u2013 wiarę, teologię i boską miłość. Lucyfer ma trzy twarze (parodia Trójcy Świętej), w każdej przeżuwa jednego ze zdrajców.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które stwierdzenia o Raju w \u201eBoskiej komedii\u201d są prawdziwe?",
      content: {
        options: [
          "Raj składa się z dziewięciu sfer niebieskich i Empireum",
          "Dusze w Raju są nieszczęśliwe, bo tęsknią za ziemią",
          "Beatrycze jest przewodniczką Dantego w Raju",
          "Na samym szczycie Dantemu ukazuje się wizja Boga jako Trójcy Świętej",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Raj ma 9 sfer planetarnych + Empireum (siedziba Boga). Beatrycze prowadzi Dantego przez sfery. Na końcu Dante ogląda Boga jako trzy kręgi światła (Trójcę). Dusze w Raju są szczęśliwe \u2013 każda na swoim stopniu, w pełnej zgodzie z wolą bożą.",
      },
    },

    // ===== DIFFICULTY 2 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Wyjaśnij zasadę kontrapasu (contrapasso) w Piekle Dantego i podaj jeden przykład.",
      content: {
        hints: ["symetria grzechu i kary", "kara lustrzanym odbiciem grzechu"],
      },
      correctAnswer:
        "Kontrapas (contrapasso) to zasada, według której kara odpowiada naturze popełnionego grzechu \u2013 jest jego lustrzanym odbiciem lub karykaturą. Np. rozwiąźli (krąg II) są wiecznie miotani wichurą, tak jak za życia dali się ponieść namiętnościom. Żarłocy (krąg III) leżą w błocie pod lodowatym deszczem, a wróżbici (krąg VIII) mają głowy odwrócone do tyłu, bo za życia chcieli widzieć przyszłość.",
      metadata: {
        explanation:
          "Kontrapas to fundamentalna zasada organizująca kary w Piekle Dantego. Grzesznicy cierpią w sposób, który symbolicznie powtarza lub odwraca ich grzech. Jest to wyraz boskiej sprawiedliwości, w której kara jest integralną konsekwencją grzechu.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Opisz, w jaki sposób Dante i Wergiliusz wydostają się z Piekła.",
      content: {},
      correctAnswer:
        "Dante i Wergiliusz wydostają się z Piekła, schodząc po ciele Lucyfera uwięzionego w lodzie na dnie Piekła. Wergiliusz chwyta się kudłatego ciała potwora i schodzi w dół, a gdy mija punkt środkowy ziemi, obraca się \u2013 odtąd idą w górę. Przez wąski tunel skalny wychodzą na powierzchnię drugiej półkuli, gdzie wznosi się góra Czyśćca. Ostatni wers Piekła brzmi: \u201ew końcu wychodząc, witaliśmy gwiazdy\u201d.",
      metadata: {
        explanation:
          "Przejście przez ciało Lucyfera to symboliczny punkt zwrotny: Dante przechodzi przez centrum zła (środek ziemi), aby rozpocząć drogę ku zbawieniu. Każda z trzech części kończy się słowem \u201egwiazdy\u201d (stelle), co symbolizuje nadzieję i dążenie ku Bogu.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Wyjaśnij, jak poniższe hasło epoki realizowane jest w \u201eBoskiej komedii\u201d:",
      content: {
        slogan: "Teocentryzm",
      },
      correctAnswer:
        "Teocentryzm \u2013 pogląd, że Bóg jest centrum wszechświata i najwyższą wartością \u2013 realizuje się w \u201eBoskiej komedii\u201d przez cały zamysł dzieła: celem wędrówki Dantego jest oglądanie Boga (visio beatifica). Cały porządek zaświatów odzwierciedla boski plan \u2013 od oddalenia od Boga (Piekło), przez oczyszczenie (Czyściec), po zjednoczenie z Nim (Raj). Bóg jest źródłem sprawiedliwości, miłości i światła, które przenika wszystkie sfery.",
      metadata: {
        explanation:
          "Teocentryzm jest fundamentalną cechą średniowieczną \u201eBoskiej komedii\u201d. Cała struktura zaświatów jest uporządkowana wobec Boga: im bliżej Niego, tym więcej światła, radości i doskonałości; im dalej \u2013 tym więcej ciemności i cierpienia.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_SINGLE (8) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Dante spotyka w Piekle Ulissesa (Odyseusza). Jaka jest przyczyna jego potępienia?",
      content: {
        options: [
          "Długoletnia rozłąka z żoną Penelopą",
          "Podstęp z koniem trojańskim i fałszywe rady prowadzące do zguby innych",
          "Zabójstwo cyklopa Polifema",
          "Odmowa powrotu do Itaki po wojnie trojańskiej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ulisses (Odyseusz) przebywa w ósmym kręgu Piekła (Złe Tłumoki), w tłumoku złych doradców, zamknięty wraz z Diomedesem w jednym płomieniu. Karany jest za podstęp z koniem trojańskim, kradzież Palladium i inne chytre rady, które prowadziły do zguby innych. Dante nadaje mu też mowę o zuchwałej żegludze poza Słupy Heraklesa.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Dlaczego Dante umieszcza w Piekle wielu współczesnych sobie papieży i duchownych?",
      content: {
        options: [
          "Z powodu osobistej niechęci do religii katolickiej",
          "Krytykuje ich symonię, chciwość i zepsucie moralne, zachowując szacunek dla samego urzędu papieskiego",
          "Odrzuca autorytet Kościoła jako instytucji",
          "Jest zwolennikiem reformacji religijnej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dante ostro krytykuje zepsucie moralne duchowieństwa, zwłaszcza symonię (handel godnościami kościelnymi) i chciwość papieży, umieszczając ich w Piekle (np. Mikołaj III, Bonifacy VIII). Nie odrzuca jednak samej instytucji Kościoła \u2013 potępia jedynie niegodnych pasterzy, którzy sprzeniewierzyli się swojemu powołaniu.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Co oznacza fakt, że Czyściec ma kształt góry, a Piekło \u2013 lejka?",
      content: {
        options: [
          "Czyściec jest trudniejszy do przejścia niż Piekło",
          "Droga w dół (Piekło) symbolizuje upadek w grzech, droga w górę (Czyściec) \u2013 oczyszczenie i wznoszenie się ku Bogu",
          "Piekło jest większe, a Czyściec mniejszy",
          "Kształt nie ma znaczenia symbolicznego \u2013 wynika z tradycji kosmologicznej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Kierunek ruchu ma kluczowe znaczenie symboliczne: schodzenie w dół (Piekło) = oddalanie się od Boga, coraz głębsze pogrążanie w grzechu; wchodzenie w górę (Czyściec) = oczyszczenie duszy, zbliżanie się do Boga. Szczytem Czyśćca jest Raj Ziemski, skąd dusza wznosi się do niebios.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Jaką rolę pełni alegoria w \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "Służy wyłącznie ozdobie stylistycznej, nie ma głębszego znaczenia",
          "Nadaje postaciom i miejscom podwójne znaczenie: dosłowne (historyczne) i symboliczne (moralno-teologiczne)",
          "Zastępuje realistyczny opis, bo Dante nie znał rzeczywistych zaświatów",
          "Jest wyrazem sceptycyzmu autora wobec religii",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Alegoria jest fundamentalną zasadą organizującą \u201eBoską komedię\u201d. Sam Dante pisał, że jego dzieło ma podwójny sens: dosłowny (literalny) i alegoryczny (moralny). Np. ciemny las = zagubienie duchowe, Wergiliusz = rozum, Beatrycze = teologia/wiara, trzy zwierzęta = grzechy główne. Każda postać jest jednocześnie historyczna i symboliczna.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Co symbolizuje spotkanie Dantego z Beatrycze na szczycie Góry Czyśćcowej (pieśni XXIX\u2013XXXI Czyśćca)?",
      content: {
        options: [
          "Powrót utraconej miłości romantycznej",
          "Przejście od przewodnictwa rozumu (Wergiliusz) do przewodnictwa wiary i łaski (Beatrycze), które jest warunkiem zbawienia",
          "Zemstę Beatrycze za zdradę Dantego",
          "Koniec pielgrzymki \u2013 Dante nie idzie już dalej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Spotkanie z Beatrycze na szczycie Czyśćca to kulminacja drugiej części i zarazem centralna scena całego poematu. Beatrycze wyrzuca Dantemu, że po jej śmierci zbłądził duchowo, goniąc za fałszywymi dobrami. Oczyszczony skruchą, Dante przechodzi pod opiekę Beatrycze (wiary), bo rozum (Wergiliusz) nie wystarczy do wejścia w sfery boskie.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Jaką funkcję pełnią postacie historyczne spotykane przez Dantego w zaświatach?",
      content: {
        options: [
          "Służą wyłącznie jako tło fabularne",
          "Są exemplami (przykładami) \u2013 ukazują konsekwencje grzechów lub nagrodę za cnotliwe życie",
          "Są fikcyjnymi postaciami stworzonymi przez Dantego",
          "Pełnią rolę strażników poszczególnych kręgów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Postacie historyczne, mitologiczne i biblijne pełnią rolę exemplów (przykładów) \u2013 ilustrują konsekwencje wyborów moralnych. Potępieni w Piekle pokazują skutki grzechów, pokutujący w Czyśćcu \u2013 drogę oczyszczenia, a błogosławieni w Raju \u2013 nagrodę za cnotliwe życie. Dante łączy postacie starożytne (Cezar, Ulisses) z biblijnymi (Judasz) i współczesnymi (Francesca, Ugolino).",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które cechy \u201eBoskiej komedii\u201d wykraczają poza średniowiecze i zapowiadają renesans?",
      content: {
        options: [
          "Odwołania do tradycji antycznej, indywidualizm narratora i krytyka społeczna",
          "Użycie łaciny jako języka literackiego",
          "Całkowite odrzucenie wiary chrześcijańskiej na rzecz rozumu",
          "Brak jakichkolwiek odwołań do Pisma Świętego",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          "\u201eBoska komedia\u201d zapowiada renesans przez: odwołania do starożytności (Wergiliusz jako mistrz i przewodnik, postacie mitologiczne), indywidualizm (narrator-bohater opowiada o własnych przeżyciach), krytykę społeczną (potępienie papieży, polityków), użycie języka narodowego zamiast łaciny. Jednocześnie zachowuje cechy średniowieczne: teocentryzm, alegoryczność, symbolikę liczb.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Jaką funkcję pełni motyw światła i ciemności w \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "Służy wyłącznie tworzeniu nastroju, nie ma głębszego sensu",
          "Światło symbolizuje Boga, prawdę i zbawienie; ciemność \u2013 grzech, niewiedzę i oddalenie od Boga",
          "Ciemność symbolizuje mądrość, a światło \u2013 naiwność",
          "Światło i ciemność występują tylko w części poświęconej Piekłu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Symbolika światła i ciemności przenika cały poemat. Piekło jest ciemne (brak Boga), Czyściec jest coraz jaśniejszy w miarę wchodzenia w górę, Raj jest królestwem czystego światła. Bóg na końcu ukazuje się jako punkt najjaśniejszego światła. Każda z trzech części kończy się słowem \u201egwiazdy\u201d (stelle) \u2013 symbolem nadziei i boskości.",
      },
    },

    // ===== DIFFICULTY 3 — CLOSED_MULTIPLE (5: 3 standard, 1 matching, 1 standard) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które motywy literackie występują w \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "Motyw wędrówki jako alegorii życia duchowego",
          "Motyw winy i kary \u2013 sprawiedliwość boża wobec grzeszników",
          "Motyw buntu przeciw Bogu zakończonego zwycięstwem człowieka",
          "Motyw miłości jako siły prowadzącej ku zbawieniu",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W \u201eBoskiej komedii\u201d obecne są: motyw wędrówki (pielgrzymka duszy od grzechu do zbawienia), motyw winy i kary (kontrapas w Piekle), motyw miłości (Beatrycze jako siła prowadząca do Boga). Bunt przeciw Bogu nie kończy się zwycięstwem \u2013 wręcz przeciwnie, Lucyfer jest pokonany i uwięziony na dnie Piekła.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Połącz części \u201eBoskiej komedii\u201d z ich dominującym motywem i atmosferą:",
      content: {
        matchingType: "events_to_dates",
        leftColumn: [
          { id: "A", text: "Piekło" },
          { id: "B", text: "Czyściec" },
          { id: "C", text: "Raj" },
        ],
        rightColumn: [
          { id: "1", text: "Wieczna boleść, ciemność, beznadziejność" },
          { id: "2", text: "Cierpienie oczyszczające, nadzieja, pokuta" },
          { id: "3", text: "Wieczna radość, światło, miłość" },
        ],
      },
      correctAnswer: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      metadata: {
        explanation:
          "Piekło to miejsce wiecznej boleści bez nadziei (napis na bramie: \u201eZostawcie nadzieję\u201d). Czyściec to miejsce czasowego cierpienia oczyszczającego \u2013 dusze mają nadzieję na zbawienie. Raj to królestwo wiecznej radości, światła i miłości, gdzie dusze kontemplują Boga.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które z poniższych interpretacji wizji Boga na końcu Raju są uzasadnione?",
      content: {
        options: [
          "Bóg ukazuje się jako trzy kręgi światła o różnych barwach \u2013 symbol Trójcy Świętej",
          "W drugim kręgu Dante dostrzega zarys ludzkiej postaci \u2013 symbol Wcielenia",
          "Bóg przedstawiony jest jako starzec na tronie, wzorowany na mitologicznym Zeusie",
          "Wizja kończy się stwierdzeniem, że \u201emiłość wprawia w ruch słońce i gwiazdy\u201d",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W ostatniej pieśni Raju Dante ogląda Boga jako trzy kręgi światła (Trójca), w drugim dostrzega wizerunek człowieka (Wcielenie Syna Bożego). Poemat kończy się słowami o miłości, która \u201ewprawia w ruch słońce i gwiazdy\u201d (l\u2019amor che move il sole e l\u2019altre stelle) \u2013 to jedno z najsłynniejszych zakończeń w literaturze.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które stwierdzenia o budowie Raju w \u201eBoskiej komedii\u201d są prawdziwe?",
      content: {
        options: [
          "Raj składa się z dziewięciu sfer planetarnych i Empireum",
          "Dusze w Raju różnią się stopniem szczęśliwości, ale żadna nie zazdrości innym",
          "W Raju nie ma żadnej hierarchii \u2013 wszystkie dusze są równe",
          "Model nieba oparty jest na astronomii Ptolemeusza",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Raj ma 9 sfer planetarnych (Księżyc, Merkury, Wenus, Słońce, Mars, Jowisz, Saturn, gwiazdy stałe, Primum Mobile) + Empireum. Dusze są na różnych stopniach, ale wszystkie szczęśliwe, bo ich wola jest zgodna z wolą Boga. Model kosmologiczny oparty jest na geocentrycznym systemie Ptolemeusza, powszechnym w średniowieczu.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "LANGUAGE_USE",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które środki artystyczne i cechy kompozycyjne są charakterystyczne dla \u201eBoskiej komedii\u201d?",
      content: {
        options: [
          "Tercyna (terza rima) \u2013 wynaleziona przez Dantego forma wersyfikacyjna",
          "Dominacja symboliki liczby 3 i jej wielokrotności (9, 33, 100)",
          "Rezygnacja z jakichkolwiek odwołań do mitologii antycznej",
          "Synkretyzm gatunkowy \u2013 łączenie epiki, liryki i elementów dramatycznych",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Tercyna to oryginalna forma Dantego; symbolika trójki przenika cały utwór (3 części, 33 pieśni, 9 kręgów, 3 zwierzęta, 3 przewodników). Utwór łączy epikę (narracja), lirykę (osobiste przeżycia, uczucia) i elementy dramatyczne (dialogi z duszami). Mitologia antyczna jest w utworze bardzo obecna (Charon, Minos, Cerber, Ulisses itp.).",
      },
    },

    // ===== DIFFICULTY 3 — SHORT_ANSWER (3) =====

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Przeczytaj fragment i wykonaj polecenia:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Dante Alighieri",
          title: "Boska komedia",
          text: "Przeze mnie droga w gród łez niezliczonych. / Przeze mnie droga w boleść wiekuistą, / Przeze mnie droga w naród zatraconych. / Mój budowniczy był wzniosłym artystą, / Sprawiedliwości dna grunt mój dosięga. / Mnie zbudowała wszechmocna potęga, / Mądrość najwyższa, miłość samodzielna. / Przede mną rzeczy nie było stworzonych / Prócz nieśmiertelnych \u2013 i jam nieśmiertelna! / Wchodzący we mnie, zostawcie nadzieję!",
          bookReference: "Piekło, Pieśń III",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Co to za napis i gdzie się znajduje? Jakie ma znaczenie dla potępionych?",
            minWords: 20,
            maxPoints: 1,
          },
          {
            id: 2,
            instruction:
              "Zinterpretuj słowa: \u201eMnie zbudowała wszechmocna potęga, mądrość najwyższa, miłość samodzielna\u201d. Do kogo się odnoszą?",
            minWords: 20,
            maxPoints: 1,
          },
        ],
      },
      correctAnswer:
        "1) Jest to napis na bramie Piekła. Informuje wchodzących, że Piekło jest miejscem wiecznego cierpienia bez nadziei na wyzwolenie. Kluczowe jest ostatnie zdanie: \u201eWchodzący we mnie, zostawcie nadzieję\u201d \u2013 dla potępionych nie ma już szansy na zbawienie. 2) Słowa te odnoszą się do Trójcy Świętej: \u201ewszechmocna potęga\u201d = Bóg Ojciec, \u201emądrość najwyższa\u201d = Syn Boży, \u201emiłość samodzielna\u201d = Duch Święty. Piekło zostało stworzone przez Boga jako wyraz Jego sprawiedliwości \u2013 co podkreśla, że nawet kara wieczna jest aktem boskiej miłości i mądrości.",
      metadata: {
        explanation:
          "Fragment ten jest jednym z najsłynniejszych w literaturze światowej. Napis na bramie Piekła ustanawia fundamentalną różnicę między Piekłem (brak nadziei) a Czyśćcem (nadzieja na zbawienie). Odwołanie do Trójcy Świętej podkreśla, że Piekło jest częścią boskiego porządku, nie chaosem.",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Wyjaśnij, dlaczego Dante wybrał Wergiliusza na swojego przewodnika. Jakie znaczenie ma ten wybór w kontekście relacji średniowiecza ze starożytnością?",
      content: {},
      correctAnswer:
        "Dante wybrał Wergiliusza z kilku powodów: 1) był autorem \u201eEneidy\u201d, epopei o Eneaszu, który również zstąpił do podziemnego świata \u2013 stanowi więc literacki precedens; 2) Wergiliusz był w średniowieczu uważany za największego poetę i wzór doskonałości stylu; 3) w IV Eklodze Wergiliusza widziano proroctwo o narodzinach Chrystusa, co czyniło go \u201enajbliższym chrześcijaństwu\u201d z pogan. Wybór ten pokazuje, że średniowiecze nie odrzucało starożytności, lecz widziało w niej \u201eprzedchrześcijańską mądrość\u201d \u2013 rozum ludzki jako etap na drodze do wiary.",
      metadata: {
        explanation:
          "Relacja Dantego z Wergiliuszem to model relacji średniowiecza ze starożytnością: szacunek, podziw, ale i świadomość granic mądrości pogańskiej. Wergiliusz może prowadzić przez Piekło i Czyściec (rozum poznaje grzech i pokutę), ale nie może wejść do Raju (wiara wykracza poza rozum).",
      },
    },

    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Odpowiedz na pytania dotyczące epizodu z Francescą da Rimini (Pieśń V Piekła):",
      content: {
        steps: [
          {
            id: 1,
            instruction:
              "Jaką rolę w historii Franceski i Paola odegrała lektura opowieści o Lancelocie?",
          },
          {
            id: 2,
            instruction:
              "Dlaczego Dante, choć współczuje Francesce, umieszcza ją w Piekle? Co to mówi o relacji miłosierdzia i sprawiedliwości?",
          },
        ],
      },
      correctAnswer:
        "1) Lektura opowieści o Lancelocie i Ginewrze była katalizatorem miłości Franceski i Paola: \u201ePisarz tej księgi był nam Galeotą\u201d \u2013 książka stała się pośrednikiem, jak Galehaut (Galeot) pośredniczył między Lancelotem i Ginewrą. Podczas czytania Francesca i Paolo nie oparli się namiętności i pocałowali się. 2) Dante-bohater współczuje (mdleje), ale Dante-autor umieszcza Franceskę w Piekle, bo sprawiedliwość boska jest nadrzędna wobec ludzkiego współczucia. Epizod ten pokazuje napięcie między ludzkim miłosierdziem a boską sprawiedliwością \u2013 Dante musi nauczyć się akceptować boski porządek, nawet gdy serce mu się sprzeciwia.",
      metadata: {
        explanation:
          "Epizod z Francescą to jeden z najważniejszych fragmentów Piekła. Pokazuje dojrzewanie Dantego-pielgrzyma: na początku wędrówki współczuje grzesznikom (mdleje), ale w miarę schodzenia w głąb Piekła uczy się godzić ludzkie uczucia z akceptacją boskiego wyroku.",
      },
    },

    // ===== DIFFICULTY 3 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Obraz Piekła w \u201eBoskiej komedii\u201d \u2013 struktura, symbolika i zasada kar",
        requirements: [
          "Opisz strukturę Piekła (kształt, kręgi, lokalizacja)",
          "Wyjaśnij zasadę kontrapasu na 2\u20133 przykładach",
          "Wskaż, jaką rolę pełnią postacie mitologiczne jako strażnicy",
          "80\u2013120 słów",
        ],
        wordLimit: { min: 80, max: 120 },
      },
      correctAnswer:
        "Piekło Dantego ma kształt lejka zwężającego się w głąb ziemi, pod Jerozolimą. Dzieli się na 9 kręgów, w których kary odpowiadają grzechom (zasada kontrapasu): rozwiąźli miotani wichurą jak za życia namiętnościami, żarłocy leżą w błocie pod deszczem, a wróżbici mają głowy obrócone do tyłu. Na dnie, w lodowym jeziorze Kocyt, tkwi Lucyfer przeżuwający Judasza, Brutusa i Kasjusza. Strażnikami kręgów są przetworzone postacie mitologiczne: Charon (przewoźnik), Minos (sędzia), Cerber (strażnik żarłoków). Symbolizują one degradację pogańskich bóstw do roli sług boskiej sprawiedliwości.",
      metadata: {
        explanation:
          "Piekło jest najbardziej rozbudowaną częścią poematu i stanowi wzorzec literackiego obrazu zaświatów. Jego struktura łączy kosmologię średniowieczną z mitologią antyczną, a zasada kontrapasu wyraża przekonanie, że grzech niesie w sobie własną karę.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Badacze interpretują wędrówkę Dantego jako alegorię drogi duszy ludzkiej do Boga. Która interpretacja najlepiej opisuje ten wielopoziomowy sens?",
      content: {
        options: [
          "Wędrówka dotyczy wyłącznie osobistych przeżyć Dantego-wygnańca i nie ma sensu uniwersalnego",
          "Na poziomie dosłownym to podróż przez zaświaty, na alegorycznym \u2013 droga duszy od grzechu (ciemny las) przez poznanie zła (Piekło), oczyszczenie (Czyściec) do zjednoczenia z Bogiem (Raj), z rozumem (Wergiliusz), wiarą (Beatrycze) i kontemplacją (Bernard) jako przewodnikami",
          "Poemat jest wyłącznie satyrą polityczną wymierzoną we Florencję i papiestwo",
          "Dzieło ma sens wyłącznie teologiczny i nie dotyczy ludzkiego doświadczenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Sam Dante w liście do Can Grande della Scala wyjaśnił, że jego dzieło ma sens literalny (stan dusz po śmierci) i alegoryczny (człowiek przez wolną wolę zasługuje na karę lub nagrodę). Wędrówka ma charakter uniwersalny: każdy człowiek przechodzi drogę od zagubienia do poznania, od grzechu do łaski. Trzej przewodnicy symbolizują trzy drogi poznania: rozum naturalny, wiarę i mistyczną kontemplację.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Mowa Ulissesa w XXVI pieśni Piekła (\u201eMyślcie, skąd człowiek swój początek bierze: / On nie stworzony, aby żył jak zwierze, / Cel jego trudów nauka i cnota\u201d) bywa interpretowana jako wyraz renesansowego humanizmu. Dlaczego mimo to Dante umieszcza Ulissesa w Piekle?",
      content: {
        options: [
          "Dante gardzi wiedzą i nauką, uważając je za grzeszne",
          "Ulisses symbolizuje poznanie oderwane od Boga \u2013 zuchwałą pychę rozumu, który przekracza granice wyznaczone przez Stwórcę",
          "Ulisses został potępiony za zabójstwo w wojnie trojańskiej",
          "Dante potępia Greków jako wrogów Trojańczyków (przodków Rzymian)",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Dante podziwia żądzę wiedzy Ulissesa, ale potępia go za pychę rozumu, który nie uznaje boskich granic. Ulisses wypłynął poza Słupy Heraklesa (granicę wyznaczoną przez bogów), co symbolizuje zuchwałe przekraczanie ludzkich możliwości bez pokory wobec Boga. W średniowiecznej hierarchii wartości rozum (virtus) bez wiary prowadzi do zguby. Mowa Ulissesa jest jednocześnie piękna i tragiczna \u2013 to jeden z najbardziej ambiwalentnych epizodów poematu.",
      },
    },

    // ===== DIFFICULTY 4 — CLOSED_MULTIPLE (2) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które z poniższych stwierdzeń o roli \u201eBoskiej komedii\u201d w literaturze i kulturze europejskiej są uzasadnione?",
      content: {
        options: [
          "Utwór wpłynął na ukształtowanie literackiego języka włoskiego",
          "Tytuł \u201eNie-Boska komedia\u201d Krasińskiego jest bezpośrednim nawiązaniem do dzieła Dantego",
          "Dante zapoczątkował tradycję literackich podróży po zaświatach, kontynuowaną m.in. przez Miltona",
          "Utwór nie miał żadnego wpływu na literaturę polską",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Dante jest \u201eojcem języka włoskiego\u201d \u2013 napisał po włosku dzieło dotąd nieosiągalnej rangi. Krasiński w tytule \u201eNie-Boska komedia\u201d nawiązuje wprost do Dantego (komedia nie-boska, bo ziemska i ludzka). Milton w \u201eRaju utraconym\u201d kontynuuje tradycję dantejską. W Polsce fragmenty tłumaczyli Mickiewicz i Norwid, a do motywów dantejskich nawiązywali Słowacki, Krasiński i inni.",
      },
    },

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 4,
      points: 2,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które z poniższych porównań \u201eBoskiej komedii\u201d z innymi dziełami literackimi są merytorycznie uzasadnione?",
      content: {
        options: [
          "Zstąpienie Dantego do Piekła nawiązuje do katabazy Eneasza w \u201eEneidzie\u201d Wergiliusza",
          "Motyw wędrówki duchowej Dantego ma odpowiednik w \u201ePanu Tadeuszu\u201d Mickiewicza",
          "Historia Franceski i Paola jest literackim odpowiednikiem historii Tristana i Izoldy \u2013 obie mówią o zakazanej miłości",
          "Koncepcja kar piekielnych (kontrapas) inspirowała Dostojewskiego w \u201eZbrodni i karze\u201d \u2013 idea, że grzech niesie w sobie własną karę",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Katabaza (zstąpienie do świata podziemnego) z \u201eEneidy\u201d jest bezpośrednim wzorem Dantego \u2013 sam to przyznaje. Historia Franceski i Paola nawiązuje do tradycji zakazanej miłości (Tristan, Lancelot). Idea kontrapasu \u2013 grzech jako własna kara \u2013 wpłynęła na literaturę XIX w. \u201ePan Tadeusz\u201d nie jest porównywalny tematycznie (to epos szlachecki, nie wędrówka duchowa).",
      },
    },

    // ===== DIFFICULTY 4 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 4,
      points: 5,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Motyw wędrówki i jego literackie realizacje. Omów zagadnienie na podstawie znanych Ci fragmentów \u201eBoskiej komedii\u201d Dantego Alighieri. W swojej odpowiedzi uwzględnij również wybrany kontekst.",
      content: {
        thesis:
          "Wędrówka Dantego jako alegoria drogi duszy od grzechu do zbawienia",
        structure: {
          introduction:
            "Przedstaw tezę: wędrówka Dantego przez Piekło, Czyściec i Raj jest alegorią duchowej pielgrzymki człowieka ku doskonałości",
          arguments_for:
            "Omów: ciemny las (zagubienie), zstąpienie do Piekła (poznanie grzechu), wchodzenie na Górę Czyśćcową (oczyszczenie), wzlot do Raju (zjednoczenie z Bogiem). Rola przewodników: Wergiliusz (rozum), Beatrycze (wiara)",
          arguments_against:
            "Rozważ, czy wędrówka Dantego to tylko alegoria, czy też ma wymiar osobisty (wygnanie z Florencji, tęsknota za ojczyzną, rozliczenie z wrogami politycznymi)",
          conclusion:
            "Wniosek: wędrówka Dantego łączy wymiar uniwersalny (każdy człowiek) z indywidualnym (poeta-wygnaniec). Odwołaj się do kontekstu literackiego",
        },
        requirements: [
          "Minimum 300 słów",
          "Odwołanie do co najmniej trzech epizodów z \u201eBoskiej komedii\u201d",
          "Kontekst literacki (np. Odyseja Homera, Eneida Wergiliusza, Nie-Boska komedia Krasińskiego)",
          "Poprawna struktura rozprawki",
        ],
        wordLimit: { min: 300, max: 500 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Omówić poszczególne etapy wędrówki jako alegorie (ciemny las = grzech, Piekło = poznanie zła, Czyściec = pokuta, Raj = zbawienie). 2) Przeanalizować rolę przewodników jako symboli etapów poznania. 3) Wskazać epizody ilustrujące przeobrażenie bohatera (np. mdlenie przy Francesce vs. obojętność wobec grzeszników w głębszych kręgach). 4) Porównać z innym kontekstem: Odyseusz \u2013 wędrówka fizyczna, Eneasz \u2013 katabaza, Krasiński \u2013 zstąpienie do piekła ziemskiego. 5) Wyciągnąć wniosek o uniwersalności motywu.",
      metadata: {
        explanation:
          "Motyw wędrówki to jedno z najczęstszych zagadnień maturalnych związanych z \u201eBoską komedią\u201d. Kluczowe jest pokazanie wielopoziomowości dzieła: dosłownej (podróż przez zaświaty), alegorycznej (droga duszy) i osobistej (los wygnańca).",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_SINGLE (2) =====

    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "W kontekście historii literatury \u201eBoska komedia\u201d jest dziełem na pograniczu dwóch epok. Które zestawienie najdokładniej opisuje ten dwoisty charakter?",
      content: {
        options: [
          "Dzieło czysto średniowieczne, bez żadnych cech zapowiadających nowe epoki",
          "Dzieło teocentryczne, alegoryczne, z symboliką liczb (średniowiecze), ale zarazem indywidualistyczne, odwołujące się do antyku, krytyczne wobec Kościoła i napisane w języku narodowym (zapowiedź renesansu)",
          "Dzieło czysto renesansowe, odrzucające religijne pojmowanie świata",
          "Dzieło barokowe, pełne ornamentyki i konceptów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "\u201eBoska komedia\u201d jest arcydziełem przełomu epok. Cechy średniowieczne: teocentryzm, alegoryczność, wizja zaświatów, symbolika liczb, hierarchiczny porządek świata. Cechy renesansowe: indywidualizm narratora, odwołania do antyku (Wergiliusz, mitologia), krytyka społeczna i polityczna, język narodowy zamiast łaciny. Dlatego Dantego nazywa się zarówno \u201eojcem języka włoskiego\u201d, jak i \u201ekoroną średniowiecza\u201d.",
      },
    },

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Jak interpretować fakt, że \u201eBoska komedia\u201d kończy się wizją Trójcy Świętej i słowem \u201emiłość\u201d (l\u2019amor che move il sole e l\u2019altre stelle)?",
      content: {
        options: [
          "Jest to konwencjonalne zakończenie religijne, niemające głębszego znaczenia filozoficznego",
          "Dante przedstawia miłość (amor) jako najwyższą siłę kosmiczną \u2013 jednocześnie metafizyczną zasadę poruszającą wszechświat, teologiczną więź Trójcy Świętej i cel ludzkiej drogi duchowej \u2013 łącząc kosmologię, teologię i poetykę w jednym zdaniu",
          "Miłość odnosi się wyłącznie do uczucia Dantego wobec Beatrycze",
          "Zakończenie oznacza rezygnację Dantego z dalszego pisania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ostatni wers \u201eBoskiej komedii\u201d to kwintesencja dantejskiej wizji: miłość (amor) jest siłą, która porusza sfery niebieskie (kosmologia), jest istotą Trójcy Świętej (teologia) i celem ludzkiej pielgrzymki duchowej (etyka). Dante łączy w jednym zdaniu trzy wielkie porządki: fizyczny, metafizyczny i moralny \u2013 to jedno z najdoskonalszych zakończeń w historii literatury.",
      },
    },

    // ===== DIFFICULTY 5 — CLOSED_MULTIPLE (1) =====

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 3,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Które z poniższych tez o relacji \u201eBoskiej komedii\u201d z tradycją literacką są merytorycznie uzasadnione?",
      content: {
        options: [
          "Dante tworzy syntezę tradycji antycznej (mitologia, Wergiliusz, Arystoteles) z teologią chrześcijańską (św. Tomasz z Akwinu, Pismo Święte), budując obraz świata, w którym rozum i wiara się uzupełniają",
          "Zstąpienie Dantego do Piekła nawiązuje do tradycji katabazy (Eneasz, Odyseusz, Orfeusz), ale ma nowy sens: poznanie grzechu jako warunek zbawienia",
          "Postać Beatrycze wyłącznie powtarza wzorzec damy serca z poezji trubadurów, bez żadnego pogłębienia teologicznego",
          "Utwór ustanawia wzorzec \u201ekomedii\u201d (dzieło kończące się dobrze) i \u201ewizji zaświatów\u201d, kontynuowany w literaturze europejskiej przez wieki",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Dante dokonuje syntezy antyku i chrześcijaństwa (np. Arystoteles jest \u201emistrzem uczonych\u201d, Wergiliusz \u2013 przewodnikiem). Katabaza jest przemieniona: nie jest ciekawością, lecz warunkiem zbawienia. Beatrycze wykracza DALEKO poza wzorzec damy trubadurów \u2013 jest symbolem teologii, łaski i boskiej miłości. \u201eKomedia\u201d (od smutku do radości) i wizja zaświatów stały się wzorcem dla Miltona, Krasińskiego i wielu innych.",
      },
    },

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      difficulty: 5,
      points: 5,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question: "Przeczytaj fragment i napisz notatkę analityczną:",
      content: {
        variant: "text_analysis",
        sourceText: {
          author: "Dante Alighieri",
          title: "Boska komedia",
          text: "Myślcie, skąd człowiek swój początek bierze: / On nie stworzony, aby żył jak zwierze, / Cel jego trudów nauka i cnota.",
          bookReference: "Piekło, Pieśń XXVI (mowa Ulissesa)",
        },
        tasks: [
          {
            id: 1,
            instruction:
              "Zinterpretuj te słowa w kontekście postaci Ulissesa. Dlaczego Dante umieszcza tak wzniosłe słowa w ustach potępionego grzesznika?",
            minWords: 50,
            maxPoints: 3,
          },
          {
            id: 2,
            instruction:
              "Odnieś te słowa do problematyki całego poematu: jak się mają do wizji człowieka w \u201eBoskiej komedii\u201d? Czy Dante zgadza się z Ulissesem?",
            minWords: 50,
            maxPoints: 2,
          },
        ],
        requirements: [
          "Odwołaj się do kontekstu potępienia Ulissesa",
          "Uwzględnij napięcie między podziwem a potępieniem",
          "Łącznie 120\u2013170 słów",
        ],
        wordLimit: { min: 120, max: 170 },
      },
      correctAnswer:
        "1) Ulisses wypowiada słowa prawdziwe i piękne \u2013 człowiek nie powinien żyć jak zwierzę, lecz dążyć do wiedzy i cnoty. Dante podziwia tę postawę. Jednak umieszcza Ulissesa w Piekle (krąg VIII, złych doradców), bo jego żądza poznania była oderwana od pokory wobec Boga i od wiary. Ulisses przekroczył granicę Słupów Heraklesa \u2013 symbolicznie: granicę wyznaczoną człowiekowi przez Stwórcę. Piękno jego słów czyni potępienie bardziej tragicznym i ambiwalentnym. 2) Dante częściowo zgadza się z Ulissesem: sam podejmuje zuchwałą podróż poznawczą. Różnica polega na tym, że Dante wędruje z boską sankcją (posłany przez Beatrycze), a Ulisses \u2013 wbrew niej. Poemat pokazuje, że dążenie do wiedzy i cnoty jest godne człowieka, ale musi być prowadzone przez wiarę, nie samą pychę rozumu.",
      metadata: {
        explanation:
          "Mowa Ulissesa to jeden z najbardziej interpretowanych fragmentów \u201eBoskiej komedii\u201d. Stanowi klucz do rozumienia dantejskiej koncepcji poznania: szlachetnego, ale wymagającego pokory i boskiego kierownictwa. Jest też wyrazem napięcia między podziwem Dantego-humanisty a surowym sądem Dantego-teologa.",
      },
    },

    // ===== DIFFICULTY 5 — ESSAY (1) =====

    {
      type: "ESSAY",
      category: "WRITING",
      difficulty: 5,
      points: 10,
      epoch: "MIDDLE_AGES",
      work: "Boska komedia",
      question:
        "Literacki obraz piekła. Omów zagadnienie na podstawie znanych Ci fragmentów \u201eBoskiej komedii\u201d Dantego Alighieri oraz wybranego kontekstu literackiego.",
      content: {
        thesis:
          "Piekło Dantego jako obraz sprawiedliwości bożej, ludzkiego grzechu i konsekwencji moralnych wyborów",
        structure: {
          introduction:
            "Zarysuj problem: jak literatura przedstawia piekło i jakie funkcje pełni literacki obraz zaświatów?",
          arguments_for:
            "Argumenty: struktura Piekła (9 kręgów), zasada kontrapasu, postacie historyczne jako exempla, krytyka społeczna i polityczna (papieże, politycy). Piekło jako porządek \u2013 wyraz sprawiedliwości, nie chaosu",
          arguments_against:
            "Rozważ: czy Piekło Dantego budzi w czytelniku grozę czy podziw? Czy Dante jest bezstronnym obserwatorem, czy stronniczym sędzią (umieszcza osobistych wrogów w Piekle)?",
          conclusion:
            "Sformułuj własne stanowisko: Piekło Dantego jako synteza teologii, etyki i poezji. Porównaj z innym literackim obrazem piekła/zaświatów",
        },
        requirements: [
          "Minimum 400 słów",
          "Odwołanie do co najmniej trzech epizodów piekielnych (np. Francesca, Ugolino, Ulisses, symoniacy)",
          "Kontekst literacki (np. Apokalipsa św. Jana, \u201eRaj utracony\u201d Miltona, \u201eNie-Boska komedia\u201d Krasińskiego, \u201eMit o Syzyfie\u201d Camusa, mitologiczne zaświaty)",
          "Analiza zasady kontrapasu i jej funkcji",
        ],
        wordLimit: { min: 400, max: 600 },
      },
      correctAnswer:
        "Wypracowanie powinno: 1) Przedstawić strukturę Piekła i wyjaśnić zasadę kontrapasu (kara = lustro grzechu). 2) Omówić konkretne epizody: Francesca (krąg II \u2013 namiętność), Ugolino (krąg IX \u2013 zdrada), Ulisses (krąg VIII \u2013 fałsz), symoniacy (krąg VIII \u2013 handel świętościami). 3) Przeanalizować funkcje obrazu Piekła: dydaktyczną (przestroga), polityczną (krytyka papieży), filozoficzną (porządek karny odzwierciedla boski porządek moralny). 4) Porównać z wybranym kontekstem (np. zaświaty w mitologii greckiej, piekło w \u201eRaju utraconym\u201d, \u201eNie-Boska komedia\u201d). 5) Wyciągnąć wniosek o funkcji literackiego obrazu piekła.",
      metadata: {
        explanation:
          "Literacki obraz piekła to jeden z najważniejszych motywów maturalnych związanych z \u201eBoską komedią\u201d. Kluczowe jest uchwycenie wielowarstwowości: Piekło nie jest chaosem, lecz porządkiem \u2013 wyrazem boskiej sprawiedliwości. Dante łączy grozę z pięknem, współczucie z bezwzględnością sądu.",
      },
    },

    // ======================= KONIEC PYTAŃ BOSKA KOMEDIA ===================//
    // ======================= KONIEC PYTAŃ PAMIĘTNIKI PASKA ===================//

    // ===== DIFFICULTY 5 — SYNTHESIS_NOTE (1) =====

    // ===== DIFFICULTY 5 — ESSAY (2) =====

    // ======================= KONIEC PYTAŃ FERDYDURKE ===================//
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
