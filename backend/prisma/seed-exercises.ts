// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    // ======================= 60 NOWYCH PYTAN — DIFFICULTY 1-3 ===================//
    // Rozklad: 20x Ludzie bezdomni, 20x Sklepy cynamonowe, 20x Konrad Wallenrod
    // Polskie cudzyslowy: zastapione \" lub pominietee
    // Typy: ~90% zamkniete (CS + CM), ~10% SA

    // =====================================================================
    // LUDZIE BEZDOMNI — 20 pytan (diff 1-3)
    // =====================================================================

    // --- DIFF 1 — CS (4) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: 'W jakim roku zostala napisana powiesc "Ludzie bezdomni"?',
      content: {
        options: ["1885", "1899", "1905", "1912"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Ludzie bezdomni" zostali napisani w 1899 roku w Zakopanem. Powiesc naleezy do epoki Mlodej Polski i jest jednym z najwazniejszych dziel Stefana Zeromskiego.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Jak nazywa sie glowna bohaterka kobieca powiesci?",
      content: {
        options: [
          "Helena Kalinowicz",
          "Joanna Podborska",
          "Natalia Orszenska",
          "Wanda Orszenska",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Glowna bohaterka kobieca to Joanna Podborska -- nauczycielka i guwernantka, opiekujaca sie wnuczkami pani Niewadzkiej. Jest rowniez autorka dziennika z rozdzialu "Zwierzenia".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Na jakiej ulicy w Warszawie mieszkal ojciec Tomasza Judyma?",
      content: {
        options: [
          "Na ulicy Marszalkowskiej",
          "Na ulicy Cieplej",
          "Na ulicy Krochmalnej",
          "Na ulicy Nowy Swiat",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ojciec Judyma, szewc, mieszkal na ulicy Cieplej w Warszawie. Sam Judym wyznaje to otwarcie przy spotkaniu z pania Niewadzka w Luwrze.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Gdzie Judym odbywal praktyki chirurgiczne przed powrotem do Warszawy?",
      content: {
        options: ["W Berlinie", "W Wiedniu", "W Paryzu", "W Londynie"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Judym odbywal praktyki chirurgiczne w klinikach paryskich. Wlasnie w Paryzu, w Luwrze, spotyka po raz pierwszy Joanne Podborska i panny Orszenskie.",
      },
    },

    // --- DIFF 1 — CM (2) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Ktore z ponizszych zdan o Tomaszu Judymie sa prawdziwe?",
      content: {
        options: [
          "Jest lekarzem z wyksztalcenia",
          "Pochodzi z rodziny arystokratycznej",
          "Jego ojciec byl szewcem",
          "Ukonczyl studia medyczne w Warszawie",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Judym jest lekarzem, synem szewca z ulicy Cieplej, ukonczyl medycyne w Warszawie. NIE pochodzi z arystokracji -- jego niskie pochodzenie jest zrodlem kompleksow i poczucia dlugu wobec biedoty.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: 'Ktore postacie sa lekarzami w powiesci "Ludzie bezdomni"?',
      content: {
        options: [
          "Tomasz Judym",
          "Doktor Weglichowski",
          "Korzecki",
          "Doktor Chmielnicki",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Judym, Weglichowski (dyrektor Cisow) i Chmielnicki (lekarz zydowskiego pochodzenia) sa lekarzami. Korzecki jest inzynierem, nie lekarzem.",
      },
    },

    // --- DIFF 2 — CS (5) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Kto jest dyrektorem zakladu leczniczego w Cisach?",
      content: {
        options: [
          "Doktor Chmielnicki",
          "Doktor Weglichowski",
          "Doktor Kalecki",
          "Doktor Plowicz",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Doktor Weglichowski to dyrektor zakladu w Cisach -- ceniony lekarz, ale konserwatywny, niecheetny reformom Judyma dotyczacym osuszenia stawow.",
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
        "Jaki obraz w Luwrze gleboko porusza Judyma i staje sie symbolem nedzy?",
      content: {
        options: [
          '"Mona Lisa" Leonarda da Vinci',
          '"Ubogi rybak" Puvis de Chavannes\'a',
          '"Wolnosc wiodaca lud na barykady" Delacroix',
          '"Przysieega Horacjuszy" Davida',
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Ubogi rybak" Puvis de Chavannes\'a symbolizuje w powiesci nedze i krzywde spoleczna. Stanowi kontrast wobec Wenus z Milo, symbolizujacej piekno i harmonie. Oba dziela zapowiadaja centralny konflikt powiesci.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Co Judym robi po utracie posady w Cisach?",
      content: {
        options: [
          "Wraca do Paryza",
          "Otwiera prywatny gabinet w Warszawie",
          "Jedzie do Zaglebia Dabrowskiego i pracuje jako lekarz w kopalni",
          "Emigruje do Ameryki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Po wyrzuceniu z Cisow (za pobicie Krzywosada) Judym jedzie do Zaglebia Dabrowskiego, gdzie pracuje jako lekarz przy kopalni. Tam styka sie z najciezsza nedza robotnicza.",
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
        'Czego dotyczy slynne zdanie Judyma: "Lekarz dzisiejszy -- to lekarz ludzi bogatych"?',
      content: {
        options: [
          "Pochwalenia lekarzy za ich poswiecenie",
          "Zarzutu, ze lekarze koncentruja sie na zamoznych pacjentach i zaniedbuja biedote",
          "Reklamy prywatnego gabinetu Judyma",
          "Opisu systemu opieki zdrowotnej w Paryzu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To centralna teza odczytu Judyma u Czerniszow. Zarzuca lekarzom, ze lecza tylko bogatych, ignorujac przyczyny chorob biedoty -- sutereny, fabryki, brud. Odczyt konczy sie porazka -- srodowisko lekarskie odrzuca jego postulaty.",
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
        "Kto jedyny okazuje Judymowi wspolczucie po nieudanym odczycie?",
      content: {
        options: [
          "Doktor Plowicz",
          "Doktor Kalecki",
          "Doktor Chmielnicki",
          "Pani Czerniszowa",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Doktor Chmielnicki -- lekarz zydowskiego pochodzenia -- jako jedyny okazuje Judymowi szczere wspolczucie. To on posredniczy w znalezieniu mu posady w Cisach u doktora Weglichowskiego.",
      },
    },

    // --- DIFF 2 — CM (2) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: 'Ktore stwierdzenia o rozdziale "Zwierzenia" sa prawdziwe?',
      content: {
        options: [
          "Narratorka jest Joanna Podborska",
          "Rozdzial ma forme dziennika",
          "Jest napisany w trzeciej osobie jak reszta powiesci",
          "Joanna porusza tematy samotnosci, smierci brata i roli kobiet",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '"Zwierzenia" to dziennik Joanny Podborskiej -- jedyny fragment powiesci pisany w pierwszej osobie. Joanna porusza tematy samotnosci guwernantki, smierci brata Waclawa i refleksji o roli kobiet. NIE jest w trzeciej osobie.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Ktore miejsca w powiesci sluza jako ilustracja nedzy spolecznej?",
      content: {
        options: [
          "Sutereny ulicy Cieplej i Krochmalnej w Warszawie",
          "Salon doktorostwa Czerniszow",
          "Fabryka cygar, w ktorej pracuje bratowa Judyma",
          '"Budy" robotnicze przy cynkowni w Zaglebiu',
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Sutereny warszawskie, fabryka cygar i budy robotnicze w Zaglebiu to trzy kluczowe miejsca ilustrujace nedze. Salon Czerniszow to przestrzen zamoznej inteligencji -- kontrastowa wobec nedzy.",
      },
    },

    // --- DIFF 3 — CS (3) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Co symbolizuje rozdarta sosna w zakonczeniu powiesci?",
      content: {
        options: [
          "Sile przyrody i odpornosc natury",
          "Wewnetrzne rozdarcie Judyma miedzy miloscia a obowiazkiem wobec biedoty",
          "Zniszczenie lasow przez przemysl w Zaglebiu",
          "Nadzieje na lepsze jutro",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Rozdarta sosna to centralny symbol powiesci. Jej pien rozszarpany odzwierciedla rozdarcie duszy Judyma po rozstaniu z Joasia. Krople zywicy odpowiadaja jego lzom. Pytanie "Kto placze?" wskazuje na uniwersalnosc cierpienia.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: "Dlaczego Judym w zakonczeniu rezygnuje z milosci do Joanny?",
      content: {
        options: [
          "Bo Joanna go odrzucila",
          "Bo uwaza, ze nie moze miec domu i rodziny, dopoki trwa nedza najubozszych -- czuje dlug wobec klasy, z ktorej sie wywodzi",
          "Bo zakonczyl sie mu kontrakt w Zaglebiu i musi wyjechac",
          "Bo Halban zabronil mu sie zenic",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Judym mowi Joasi, ze nie moze miec "ani ojca, ani matki, ani zony", dopoki trwa nedza. Jako czlowiek ktory sam wyszedl z biedy, czuje moralny dlug wobec tych, ktorzy zostali na dole. Rezygnacja z milosci jest cena za wiernosc idealom.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: 'Czym jest "zeromeszczyzna" jako styl literacki?',
      content: {
        options: [
          "Stylem polegajacym na uzywaniu wylacznie krotkich, prostych zdan",
          "Stylem laczacym realizm z symbolizmem, impresjonizmem i liryzacja prozy -- opisy przyrody odzwierciedlaja stany psychiczne bohaterow",
          "Technika dialogu opartego wylacznie na slanggu ulicznym",
          "Metoda pisania pamietnikow w pierwszej osobie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Zeromeszczyzna" to styl laczacy rozne techniki: realizm (opisy nedzy), symbolizm (Wenus, sosna), impresjonizm (migotliwosc opisu przyrody), liryzacje prozy (poetycki jezyk narracji). Charakterystyczna jest psychizacja pejzazu -- przyroda odzwierciedla emocje bohatera.',
      },
    },

    // --- DIFF 3 — CM (1), SA (1) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question: 'Ktore motywy literackie sa obecne w "Ludziach bezdomnych"?',
      content: {
        options: [
          "Motyw poswiecenia osobistego szczescia dla dobra ogolu",
          "Motyw bezdomnosci w sensie doslownym i metaforycznym",
          "Motyw walki zbrojnej o niepodleglosc",
          "Motyw niespelnionej milosci",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W powiesci obecne sa motywy: poswiecenia (Judym rezygnuje ze szczescia), bezdomnosci (doslowna -- nedzarze; metaforyczna -- Judym, Joasia), niespelnionej milosci (Judym i Joanna). Walka zbrojna o niepodleglosc nie jest motywem tej powiesci.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "YOUNG_POLAND",
      work: "Ludzie bezdomni",
      question:
        "Kim jest Karbowski i dlaczego Judym porownuje go do kwiatu tuberozy?",
      content: {},
      correctAnswer:
        "Karbowski to przystojny, lekkomyslny utracjusz i karciarz, w ktorym zakochuje sie Natalia Orszenska. Judym porownuje go do kwiatu tuberozy -- pieknego, ale bezuzytecznego. Symbol podkresla kontrast miedzy powierzchownym pieknem a brakiem spolecznej wartosci.",
      metadata: {
        explanation:
          "Porownanie do tuberozy jest jednym z kluczowych symboli powiesci -- ilustruje Judymowski poglad, ze piekno bez uzytecznosci spolecznej jest puste.",
      },
    },

    // =====================================================================
    // SKLEPY CYNAMONOWE — 20 pytan (diff 1-3)
    // =====================================================================

    // --- DIFF 1 — CS (4) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: 'W jakiej epoce literackiej powstaly "Sklepy cynamonowe"?',
      content: {
        options: [
          "Pozytywizm",
          "Mloda Polska",
          "Dwudziestolecie miedzywoojenne",
          "Wspolczesnosc",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          '"Sklepy cynamonowe" to zbior opowiadan Brunona Schulza wydany w 1933 roku -- naleza do epoki dwudziestolecia miedzywojennego. Proza Schulza reprezentuje nurt awangardowy i surrealistyczny.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: 'Kto pomog Schulzowi wydac "Sklepy cynamonowe"?',
      content: {
        options: [
          "Witold Gombrowicz",
          "Zofia Nalkowska",
          "Julian Tuwim",
          "Jaroslaw Iwaszkiewicz",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Zbior ukazal sie dzieki protekcji Zofii Nalkowskiej, ktora rozpropagowala tworczosc Schulza i pomogla mu w wydaniu debiutanckiej ksiazki w warszawskim wydawnictwie "Roj".',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: 'Jak nazywa sie narrator zbioru "Sklepy cynamonowe"?',
      content: {
        options: ["Bruno", "Jakub", "Jozef", "Narrator nie ma imienia"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Narrator zbioru ma na imie Jozef -- opowiada z perspektywy dziecka/doroslego wspominajacego dziecinstwo. W postaci narratora odbijaja sie cechy samego Schulza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Jakie rodzinne miasto Schulza bylo wzorem dla miasteczka w zbiorze?",
      content: {
        options: ["Krakow", "Lwow", "Drohobycz", "Warszawa"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Miasteczko ze zbioru jest wzorowane na Drohobyczu -- rodzinnym miescie Schulza na Kresach (dzisiejsza Ukraina). Schulz nigdy na stale nie opuscil Drohobycza.",
      },
    },

    // --- DIFF 1 — CM (2) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        'Ktore z podnizszych opowiadan naleza do zbioru "Sklepy cynamonowe"?',
      content: {
        options: [
          '"Manekiny"',
          '"Traktat o Manekinach"',
          '"Emeryt"',
          '"Wichura"',
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '"Manekiny", "Traktat o Manekinach" i "Wichura" naleza do zbioru. "Emeryt" to opowiadanie z drugiego tomu Schulza -- "Sanatorium Pod Klepsydra".',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Ktore cechy opisuja ojca narratora w zbiorze?",
      content: {
        options: [
          "Jest kupcem prowadzacym sklep z suknem",
          "Jest ekscentrykiem fascynujacym sie ptakami i materia",
          "Jest typowym, spokojnym ojcem rodziny",
          "Stopniowo maleje i zanika fizycznie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Ojciec (Jakub) formalnie jest kupcem, ale w oczach syna to ekscentryk -- hoduje egzotyczne ptaki, wyklada o materii, maleje i zanika. NIE jest typowym spokojnym ojcem -- to postac niezwykla, groteskowa i tragiczna.",
      },
    },

    // --- DIFF 2 — CS (4) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        'Do jakiego ptaka jest porownywany ojciec w opowiadaniu "Ptaki"?',
      content: {
        options: ["Do orla", "Do kondora", "Do pawia", "Do slowika"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ojciec jest porownywany do kondora -- ogromnego ptaka o nagiej szyi, pomarszczonej twarzy i kamiennym profilu. Narrator widzi w nim "starszego brata ojca" i mumie. Kondor uzywa nawet wspólnego naczynia nocnego z ojcem.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Kim sa Polda i Paulina w zbiorze?",
      content: {
        options: [
          "Corkami ciotki Agaty",
          "Dziewczetami do szycia, ktore przychodzaa wieczorami do domu narratora",
          "Nauczycielkami w szkole",
          "Sasiadkami z sassiedniego domu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Polda i Paulina to szwaczki -- dziewczeta do szycia, ktore przychodzą wieczorami. W ich obecnosci ojciec wyglasza prelekcje o manekinach. Sa jednoczesnie jego audytorium i -- w pewnym sensie -- obiektem badan anatomicznych.",
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
        'Co ojciec postuluje stworzyc "na obraz i podobienstwo" w Traktacie o Manekinach?',
      content: {
        options: [
          "Boga",
          "Czlowieka -- na obraz i podobienstwo manekina",
          "Zwierze doskonalsze od ptakow",
          "Nowy rodzaj tkaniny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ojciec konkluduje: chce stworzyc po raz wtory czlowieka, na obraz i podobienstwo manekina -- z tandety, klakow i trocin. To parodia biblijnego aktu stworzenia -- "wtora demiurgia" zamiast doskonalych tworow Boga.',
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: 'Co stalo sie z ciotka Perazja w opowiadaniu "Wichura"?',
      content: {
        options: [
          "Uciekla z domu przed wichura",
          "W paroksyzmie zlosci malala, biegala na szczudlach i ostatecznie zetlala sie w proch jak spalony papier",
          "Usnela spokojnie przy piecu",
          "Poszla po pomoc do sasiadow",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ciotka Perazja w gniewie zaczyna maleec, wskakuje na szczudla z drzazg, biega po pólkach i wreszcie sczerniala, zwineela sie jak zwiedely papier i zetlala w proch. To jedna z najbardziej groteskowych scen zbioru -- czlowiek dosownie znika w paroksyzmie emocji.",
      },
    },

    // --- DIFF 2 — CM (2) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        "Ktore stwierdzenia o tytulowych sklepach cynamonowych sa prawdziwe?",
      content: {
        options: [
          "Ich nazwa pochodzi od koloru ciemnych boazerii",
          "Sprzedaja egzotyczne towary: ognie bengalskie, salamandry, rzadkie ksiazki",
          "Narrator regularnie robi w nich zakupy",
          "Narrator szuka ich nocą, ale nigdy do nich nie dociera",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Sklepy cynamonowe maja ciemne boazerie (stad nazwa), sprzedaja towary egzotyczne i fantastyczne. Narrator pamieta je z przeszlosci, ale podczas nocnej wedrowki nigdy do nich nie dociera -- sa nieosiagalne, symbolizuja utracona arkadie.",
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
        'Co ojciec robi na uczcie w opowiadaniu "Noc wielkiego sezonu"?',
      content: {
        options: [
          "Wspina sie na polki i trabi na puzonie na alarm",
          'Wola: "Jakubie, handlowac!" i zaczyna sprzedawac sukno',
          "Rozrzuca bele sukna, tworzac gorski krajobraz z materii",
          "Spokojnie handluje z klientami za lada",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          'W "Nocy wielkiego sezonu" ojciec w szale wspina sie na polki, trabi na puzonie i rozrzuca bele sukna, tworzac fantastyczny gorski krajobraz. "Jakubie, handlowac!" wolaja do niego ludzie -- to nie on. Nie handluje spokojnie -- jest jak szalony prorok na gorze Synaj.',
      },
    },

    // --- DIFF 3 — CS (3), CM (1), SA (1) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Co spotkalo Brunona Schulza podczas wojny?",
      content: {
        options: [
          "Emigrowal do Stanow Zjednoczonych",
          "Zostal zastrzelony na ulicy przez gestapowca w 1942 roku w Drohobyczu",
          "Przetrwal wojne w ukryciu i umarl po wojnie",
          "Zostal deportowany do obozu i tam zmarl",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Bruno Schulz zostal zastrzelony na ulicy Drohobycza 19 listopada 1942 roku przez gestapowca Gunthera. Zofia Nalkowska probowala zorganizowac jego przerzut do Warszawy, ale nie zdazyla. Jego smierc jest jedną z najwiekszych strat polskiej literatury.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: 'Jakim terminem okresla sie czas w "Sklepach cynamonowych"?',
      content: {
        options: [
          "Czas historyczny -- konkretne daty i wydarzenia",
          "Czas mityczny i cykliczny -- wyznaczony porami roku, nie datami, krazacy w kolo jak w micie",
          "Czas linearny -- od narodzin do smierci narratora",
          "Czas realny -- biezacy, odpowiadajacy dacie pisania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "U Schulza czas jest mityczny i cykliczny -- wyznaczony porami roku (lato/sierpien, zima, jesien), nie konkretnymi datami. Czas krazy jak w micie: lato wraca, zima wraca, pory roku powtarzaja sie jak rytualy. To czas mitu, nie historii.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Jaka jest relacja miedzy Ulica Krokodyli a reszta miasteczka?",
      content: {
        options: [
          "Ulica Krokodyli jest centrum handlowym i duma miasta",
          "Jest tandetna, pseudonowoczesna dzielnica -- kontrastem wobec magicznego miasteczka: swiaat pozorow, imitacji, szarosci, moralnej degradacji",
          "Jest najstarsza, najbardziej szacowna dzielnica miasta",
          "Jest dzielnica artystow i intelektualistow",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ulica Krokodyli to antysswiat wobec magicznego miasteczka: tandetna, bezbarwna, peln pozoru. Rzeczywistosc jest tam "cienka jak papier" i "zdradza swa imitatywnosc". To krytyka pseudonowoczesnej komercjalizacji, ktora niszczy autentycznosc.',
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question: "Ktore z ponizszych metamorfoz ojca wystepuja w zbiorze?",
      content: {
        options: [
          "Ojciec naśladuje ptaki -- pieje jak kogut, trzepoce rekami",
          "Ojciec stopniowo zamienia sie w karakona",
          'Ojciec maleje fizycznie az staje sie "kupka smieci"',
          "Ojciec przemienia sie w drzewo",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "W zbiorze ojciec: nasladuje ptaki i pieje (Ptaki), przemienia sie w karakona (Karakony), maleje fizycznie az zanika (Nawiedzenie). Metamorfoza w drzewo nie wystepuje.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "INTERWAR",
      work: "Sklepy cynamonowe",
      question:
        'Opisz krotko, co dzieje sie z ojcem w opowiadaniu "Nawiedzenie". Jakie dziwne zachowania przejawia?',
      content: {
        hints: ["choroba", "monologi", "dialog z Bogiem", "zanikanie fizyczne"],
      },
      correctAnswer:
        'W "Nawiedzeniu" ojciec zapada na zdrowiu, lezy w lozku otoczony flaszkami i ksiegami handlowymi. Prowadzi samotne monologi, kloci sie z soba, jakby jego osobowosc rozpadla sie na wiele jazni. Nocami dialoguje z Bogiem jak starotestamentowy prorok. Stopniowo maleje -- "jak orzech zsychajacy sie w lupinie" -- wspina sie na szafy, pieje jak kogut, znika na wiele dni w zakamarkach mieszkania. Na koncu jego resztki Adela wymiata jak kupke smieci.',
      metadata: {
        explanation:
          '"Nawiedzenie" to kluczowe opowiadanie dla motywu degradacji ojca -- od kupca przez proroka do nicosci. Zanikanie jest zarowno komiczne (pieje jak kogut), jak i tragiczne ("zniknal nie zauwaiony").',
      },
    },

    // =====================================================================
    // KONRAD WALLENROD — 20 pytan (diff 1-3)
    // =====================================================================

    // --- DIFF 1 — CS (4) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: 'W jakim wieku rozgrywa sie akcja "Konrada Wallenroda"?',
      content: {
        options: ["W XII wieku", "W XIV wieku", "W XVI wieku", "W XIX wieku"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja rozgrywa sie w XIV wieku, w czasach walk Litwy z Zakonem Krzyzackim. To historyczne tlo zostalo celowo wybrane przez Mickiewicza jako maska historyczna -- sredniowiecze ukrywa treści o wspolczesnej Polsce pod zaborami.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Jakie stanowisko obejmuje Konrad Wallenrod w Zakonie Krzyzackim?",
      content: {
        options: [
          "Kapelan zakonny",
          "Wielki mistrz Zakonu Krzyzackiego",
          "Komtur twierdzy Malbork",
          "Giermek arcykomtura",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konrad Wallenrod zostaje wybrany wielkim mistrzem Zakonu Krzyzackiego -- najwyzszym dowodca. To kluczowe dla jego planu: jako mistrz moze celowo prowadzic Zakon do kleski.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Z ktorym narodem walczy Zakon Krzyzacki w utworze?",
      content: {
        options: ["Z Francuzami", "Z Litwinami", "Z Turkami", "Z Anglikami"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zakon Krzyzacki walczy z Litwinami -- pogańskim ludem nad Niemnem. W utworze Litwa to ojczyzna Waltera Alfa, ktorej broni on podstepem od wewnatrz struktur wroga.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Co to jest wajdelota?",
      content: {
        options: [
          "Litewski rycerz konny",
          "Litewski bard/pieśniarz -- straznik tradycji ustnej i pamieci narodowej",
          "Niemiecki zakonnik",
          "Litewski kapłan ognia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wajdelota to litewski bard -- spiiewak i straznik tradycji ustnej narodu. W utworze te role pelni Halban, ktory spieewa piesni o Litwie i przechowuje pamiec narodowa. Wajdelota jest odpowiednikiem romantycznego poety-wieszcza.",
      },
    },

    // --- DIFF 1 — CM (2) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        'Ktore rzeki i miejsca pojawiaja sie w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Niemen -- granica miedzy Litwa a Prusami",
          "Maryjensburg (Malbork) -- siedziba Zakonu",
          "Wisla -- stoleczna rzeka Krakowa",
          "Kowno -- miasto litewskie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Niemen to granica miedzy swiatami (Litwa/Prusy), Maryjensburg/Malbork to siedziba Zakonu, Kowno to miasto litewskie (zamek Kiejstuta, blonia Peruna). Wisla i Krakow nie pojawiaja sie w utworze.",
      },
    },
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 1,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Ktore z ponizszych stwierdzen o genezie utworu sa prawdziwe?",
      content: {
        options: [
          "Mickiewicz pisal go na zesslaniu w Rosji",
          "Utwor zostal wydany w 1828 roku",
          "Mickiewicz dedykowal go Bonawendurze i Joannie Zaleskim",
          "Utwor powstal po powstaniu listopadowym",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Utwor piisany w Rosji (1825-1827), wydany w 1828, dedykowany Zaleskim. NIE powstal po powstaniu listopadowym (1830) -- powstanie wybuchlo DWA LATA PO wydaniu. To wazna roznica -- Wallenrod wpisuje sie w kontekst spiskow dekabrystow, nie powstania.",
      },
    },

    // --- DIFF 2 — CS (4) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Czego dotyczy piesn Halbana o Wiliji?",
      content: {
        options: [
          "O historii walk Litwinow z Krzyzakami",
          "O pieknej Litwince, ktora pokochala cudzoziemca i placzze w pustelniczej wiezy -- alegoria losu Aldony",
          "O zwyciestwach litewskiego ksiecia Kiejstuta",
          "O budowie zamku w Malborku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Piesn o Wiliji to alegoria losu Aldony: rzeka Wilija plynie do Niemna (oblubieńca) i ginie w morzu, tak jak Litwinka pokochala przybysza i placzze w pustelniczej wiezy. Halban spieewa ja po wyborze Konrada na mistrza.",
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
        "W jakim celu Walter Alf pojechal z zona Aldona do klasztoru zakonnic?",
      content: {
        options: [
          "Zeby sie pomodlic przed wyruszeniem na wojne",
          "Zeby ukryc Aldone bezpiecznie, zanim sam wrocil do Zakonu pod falszywym imieniem realizowac plan zemsty",
          "Zeby Aldona zostala zakonnica z przekonania religijnego",
          "Zeby spotkac sie z Halbanem w tajemnicy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Walter Alf odwozi Aldone do klasztoru zakonnic za Niemnem, zanim sam wraca do Zakonu pod imieniem Wallenroda. Aldona pozniej opuszcza klasztor i zamyka sie w wiezy przy zamku w Malborku, by byc blisko meza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Jaka wade ma Konrad Wallenrod wedlug Krzyzakow?",
      content: {
        options: [
          "Jest tchorzem na polu bitwy",
          "Zamkniety w samotnym pokoju, pije alkohol, spiewa smutne piesni i wpada w szal",
          "Kradnie pieniadze Zakonu",
          "Odmawia modlitwy i uczestnictwa w nabozenstwach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Jedyna znana Krzyzakom wada Konrada to alkoholizm -- zamkniety w pokoju pije i spiewa posepne piesni w obcym jezyku (litewskim). W szale krzyczy rozkazy, grozi komus nieznanemu. Halban uspokaja go jednym spojrzeniem.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "O czym opowiada Powieść Wajdeloty (historia Waltera Alfa)?",
      content: {
        options: [
          "O budowie zamku krzyzackiego w Malborku",
          "O dziecinstwie Waltera Alfa -- porwanie przez Krzyzakow, wychowanie u Winrycha, nauki wajdeloty, ucieczka na Litwe, malzeenstwo z Aldona i decyzja o zemsce",
          "O walkach Kiejstuta z Tatarami",
          "O historii Zakonu Krzyzackiego od zalozenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Powiesc Wajdeloty to kluczowy fragment -- opowiada cala przeszlosc bohatera: porwanie z Litwy, wychowanie u mistrza Winrycha, tajne nauki wajdeloty, ucieczke na Litwe, malzenstwo z Aldona (corka Kiejstuta) i decyzje o zemście na Krzyzakach.",
      },
    },

    // --- DIFF 2 — CM (2) ---

    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 2,
      points: 1,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Ktore elementy sluza budowaniu tajemniczosci bohatera?",
      content: {
        options: [
          "Konrad nosi przylbice i unika okazywania emocji publicznie",
          "Jedynym przyjacielem Konrada jest tajemniczy mnich Halban",
          "Nocami kleeczy pod wieza pustelnicy i rozmawia z nia po litewsku",
          "Konrad otwarcie opowiada wszystkim o swoim planie zemsty",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Konrad jest postacia tajemnicza: nosi przylbice, ukrywa emocje, jego jedynym przyjacielem jest Halban, a nocami potajemnie odwiedza wieze Aldony. NIE opowiada nikomu o planie -- to tajna misja.",
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
        "Co wpllynelo na Waltera Alfa w dzieciństwie u Krzyzakow i podtrzymalo jego litewska tozsamosc?",
      content: {
        options: [
          "Stary wajdelota (Halban) uczyl go litewskiego jezyka i piesni",
          "Halban prowadzil go nad Niemen, skad patrzyli na litewskie gory",
          "Walter czytal litewskie ksiazki w bibliotece zakonnej",
          "Halban rozbudzal w nim nienawissc do Krzyzakow i chec zemsty",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Halban uczyl Waltera litewskiego, prowadzil nad Niemen i rozbudzal nienawissc do Krzyzakow. Walter NIE czytal litewskich ksiazek -- tradycja litewska byla ustna (piesni, opowiesci), nie pisana. To wlasnie rola wajdeloty -- straz pamieci ustnej.",
      },
    },

    // --- DIFF 3 — CS (3), CM (1), SA (1) ---

    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Dlaczego Witold zrywa sojusz z Zakonem po uczcie?",
      content: {
        options: [
          "Bo Krzyzacy nie zaplacili mu obiecanej nagrody",
          "Bo Piesn Wajdeloty poruszyła jego sumienie -- przypomniala mu o zdradzie ojczyzny i hanbie zdrajcy",
          "Bo Konrad go publicznie obrazil",
          "Bo dowiedzial sie o tajnym trybunale w zamku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Piesn Wajdeloty, mowiaca o zdrajcach Litwy i o tym, ze na tamtym swiecie ich przodkowie ich nie uznaja, gleboko poruszyla Witolda. Zbledl, zsinial, plakal -- a potem zerwaal sojusz z Zakonem i wrocil bronic Litwy. Piesn okazala sie skuteczniejsza od miecza.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Jak Konrad sabotuje wojne z Litwa bedac wielkim mistrzem?",
      content: {
        options: [
          "Otwarcie odmawia prowadzenia wojny i rezzygnuje ze stanowiska",
          "Celowo zwleka, narzuca posty i pokuty, a w czasie wyprawy na Litwe prowadzi wojsko w zasadzke -- dlugu oblega Wilno, pozwala na gld i choroby, az armia ginie na litewskich stepach",
          "Przechodzi na strone Litwinow i walczy otwarcie z Krzyzakami",
          "Wysyla tajne listy do Litwinow z planami wojennymi Zakonu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konrad sabotuje Zakon od srodka: narzuca posty i pokuty zamiast wojowac, a gdy Krzyzacy wymuszajaa wojne -- prowadzi ja celowo zle: dlugo oblega Wilno, pozwala na glod i choroby w obozie, odcina dowozy. Armia ginie od mroozu i glodu na litewskich stepach. Sam wraca z garstka zywych.",
      },
    },
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question: "Jaki zarzut stawia tajny trybunal Konradowi Wallenrodowi?",
      content: {
        options: [
          "Ze nie jest prawdziwym Wallenrodem, ze zabill prawdziwego rycerza, ze jest heretykiem i zdrajca Zakonu",
          "Ze za malo sie modli i nie uchodzi do kaplicy",
          "Ze jest alkoholikiem i nie nadaje sie na mistrza",
          "Ze ma zone ukryta w wiezy zamkowej",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          'Tajny trybunal stawia cztery zarzuty: falsz (nie jest Wallenrodem), zabojstwo (zabil prawdziwego Wallenroda), herezja i zdrada Zakonu. Oskarrzyciel przysieega na krucyfiks, a dwunastu zamaskowanych sedziow wydaje wyrok: "biada!" -- trzykrotnie powtorzony echem.',
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
        'Ktore z ponizszych stwierdzen o kompozycji "Konrada Wallenroda" sa prawdziwe?',
      content: {
        options: [
          "Fabuła jest przedstawiona chronologicznie od dziecinstwa do smierci bohatera",
          "Przeszlosc bohatera poznajemy dopiero z Powiesi Wajdeloty w czesci IV (na uczcie)",
          "Utwor zawiera formy liryczne wplecione w narracje: hymn, piesni, ballade",
          "Utwor laaczy cechy epiki, liryki i dramatu -- jest gatunkiem synkretycznym",
        ],
      },
      correctAnswer: [1, 2, 3],
      metadata: {
        explanation:
          "Fabuła NIE jest chronologiczna -- zaczyna sie od obioru mistrza, przeszlosc Waltera poznajemy dopiero z piesni Wajdeloty (cz. IV). Utwor zawiera formy liryczne (hymn, piesni, ballada Alpuhara) i jest synkretyczny (epika + liryka + dramat). To cechy powiesci poetyckiej.",
      },
    },
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      difficulty: 3,
      points: 2,
      epoch: "ROMANTICISM",
      work: "Konrad Wallenrod",
      question:
        "Wyjasnij, dlaczego Aldona zamknela sie w wiezy przy zamku w Malborku. Jakie byly jej motywacje?",
      content: {
        hints: ["bliskosc meza", "oczekiwanie na powrot", "milosc"],
      },
      correctAnswer:
        'Aldona zamknela sie w wiezy z milosci do meza. Wiedzala, ze Walter Alf planuje zemste na Krzyzakach i wroci kiedys do Malborka. Chciala byc blisko niego -- slyszec chociaz glos rycerza przechodzaccego obok wiezy, moze rozpoznac ukochanego. Mowiila: "niech twarz odmieni... jeszcze serce moje z daleka nawet kochanka odgadnie". Zamurowanie w wiezy bylo aktem desperackiej milosci i poswiecenia -- zywcem pogrzebala sie, by czekac na jednoego czlowieka.',
      metadata: {
        explanation:
          "Motywacja Aldony to czysta, poswiecona milosc -- zamknela sie w grobie za zycia, by byc blisko meza. Jest jednoczesnie tragiczna i heroiczna -- jej ofiara dorownuje ofierze Konrada.",
      },
    },

    // ======================= KONIEC 60 PYTAN DIFF 1-3 ===================//
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
