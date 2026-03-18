// backend/prisma/seed-exercises.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExercises() {
  console.log("🌱 Seeding exercises...");

  const exercises = [
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Wyjaśnij, dlaczego Aldona zamknęła się w wieży przy zamku w Malborku. Jakie były jej motywacje?",
      content: {
        hints: ["bliskość męża", "oczekiwanie na powrót", "miłość"],
      },
      correctAnswer:
        'Aldona zamknęła się w wieży z miłości do męża. Wiedziała, że Walter Alf planuje zemstę na Krzyżakach i wróci kiedyś do Malborka. Chciała być blisko niego — słyszeć chociaż głos rycerza przechodzącego obok wieży, może rozpoznać ukochanego. Mówiła: "niech twarz odmieni... jeszcze serce moje z daleka nawet kochanka odgadnie". Zamurowanie w wieży było aktem desperackiej miłości i poświęcenia — żywcem pogrzebała się, by czekać na jednego człowieka.',
      metadata: {
        explanation:
          "Motywacja Aldony to czysta, poświęcona miłość — zamknęła się w grobie za życia, by być blisko męża. Jest jednocześnie tragiczna i heroiczna — jej ofiara dorównuje ofierze Konrada.",
      },
    },

    // ===== 2 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        'Które z poniższych stwierdzeń o kompozycji "Konrada Wallenroda" są prawdziwe?',
      content: {
        options: [
          "Fabuła jest przedstawiona chronologicznie od dzieciństwa do śmierci bohatera",
          "Przeszłość bohatera poznajemy dopiero z Powieści Wajdeloty w części IV (na uczcie)",
          "Utwór zawiera formy liryczne wplecione w narrację: hymn, pieśni, balladę",
          "Utwór łączy cechy epiki, liryki i dramatu — jest gatunkiem synkretycznym",
        ],
      },
      correctAnswer: [1, 2, 3],
      metadata: {
        explanation:
          "Fabuła NIE jest chronologiczna — zaczyna się od obioru mistrza, przeszłość Waltera poznajemy dopiero z pieśni Wajdeloty (cz. IV). Utwór zawiera formy liryczne (hymn, pieśni, ballada Alpuhara) i jest synkretyczny (epika + liryka + dramat). To cechy powieści poetyckiej.",
      },
    },

    // ===== 3 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Jaki zarzut stawia tajny trybunał Konradowi Wallenrodowi?",
      content: {
        options: [
          "Że nie jest prawdziwym Wallenrodem, że zabił prawdziwego rycerza, że jest heretykiem i zdrajcą Zakonu",
          "Że za mało się modli i nie uczęszcza do kaplicy",
          "Że jest alkoholikiem i nie nadaje się na mistrza",
          "Że ma żonę ukrytą w wieży zamkowej",
        ],
      },
      correctAnswer: 0,
      metadata: {
        explanation:
          'Tajny trybunał stawia cztery zarzuty: fałsz (nie jest Wallenrodem), zabójstwo (zabił prawdziwego Wallenroda), herezja i zdrada Zakonu. Oskarżyciel przysięga na krucyfiks, a dwunastu zamaskowanych sędziów wydaje wyrok: "biada!" — trzykrotnie powtórzony echem.',
      },
    },

    // ===== 4 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Jak Konrad sabotuje wojnę z Litwą będąc wielkim mistrzem?",
      content: {
        options: [
          "Otwarcie odmawia prowadzenia wojny i rezygnuje ze stanowiska",
          "Celowo zwleka, narzuca posty i pokuty, a w czasie wyprawy na Litwę prowadzi wojsko w zasadzkę — długo oblęga Wilno, pozwala na głód i choroby, aż armia ginie na litewskich stepach",
          "Przechodzi na stronę Litwinów i walczy otwarcie z Krzyżakami",
          "Wysyła tajne listy do Litwinów z planami wojennymi Zakonu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konrad sabotuje Zakon od środka: narzuca posty i pokuty zamiast wojować, a gdy Krzyżacy wymuszają wojnę — prowadzi ją celowo źle: długo oblęga Wilno, pozwala na głód i choroby w obozie, odcina dowozy. Armia ginie od mrozu i głodu na litewskich stepach. Sam wraca z garstką żywych.",
      },
    },

    // ===== 5 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Dlaczego Witold zrywa sojusz z Zakonem po uczcie?",
      content: {
        options: [
          "Bo Krzyżacy nie zapłacili mu obiecanej nagrody",
          "Bo Pieśń Wajdeloty poruszyła jego sumienie — przypomniała mu o zdradzie ojczyzny i hańbie zdrajcy",
          "Bo Konrad go publicznie obraził",
          "Bo dowiedział się o tajnym trybunale w zamku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pieśń Wajdeloty, mówiąca o zdrajcach Litwy i o tym, że na tamtym świecie ich przodkowie ich nie uznają, głęboko poruszyła Witolda. Zbladł, zsiniał, płakał — a potem zerwał sojusz z Zakonem i wrócił bronić Litwy. Pieśń okazała się skuteczniejsza od miecza.",
      },
    },

    // ===== 6 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        "Co wpłynęło na Waltera Alfa w dzieciństwie u Krzyżaków i podtrzymało jego litewską tożsamość?",
      content: {
        options: [
          "Stary wajdelota (Halban) uczył go litewskiego języka i pieśni",
          "Halban prowadził go nad Niemen, skąd patrzyli na litewskie góry",
          "Walter czytał litewskie książki w bibliotece zakonnej",
          "Halban rozbudzał w nim nienawiść do Krzyżaków i chęć zemsty",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Halban uczył Waltera litewskiego, prowadził nad Niemen i rozbudzał nienawiść do Krzyżaków. Walter NIE czytał litewskich książek — tradycja litewska była ustna (pieśni, opowieści), nie pisana. To właśnie rola wajdeloty — straż pamięci ustnej.",
      },
    },

    // ===== 7 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Które elementy służą budowaniu tajemniczości bohatera?",
      content: {
        options: [
          "Konrad nosi przyłbicę i unika okazywania emocji publicznie",
          "Jedynym przyjacielem Konrada jest tajemniczy mnich Halban",
          "Nocami klęczy pod wieżą pustelnicy i rozmawia z nią po litewsku",
          "Konrad otwarcie opowiada wszystkim o swoim planie zemsty",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Konrad jest postacią tajemniczą: nosi przyłbicę, ukrywa emocje, jego jedynym przyjacielem jest Halban, a nocami potajemnie odwiedza wieżę Aldony. NIE opowiada nikomu o planie — to tajna misja.",
      },
    },

    // ===== 8 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "O czym opowiada Powieść Wajdeloty (historia Waltera Alfa)?",
      content: {
        options: [
          "O budowie zamku krzyżackiego w Malborku",
          "O dzieciństwie Waltera Alfa — porwanie przez Krzyżaków, wychowanie u Winrycha, nauki wajdeloty, ucieczka na Litwę, małżeństwo z Aldoną i decyzja o zemście",
          "O walkach Kiejstuta z Tatarami",
          "O historii Zakonu Krzyżackiego od założenia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Powieść Wajdeloty to kluczowy fragment — opowiada całą przeszłość bohatera: porwanie z Litwy, wychowanie u mistrza Winrycha, tajne nauki wajdeloty, ucieczkę na Litwę, małżeństwo z Aldoną (córką Kiejstuta) i decyzję o zemście na Krzyżakach.",
      },
    },

    // ===== 9 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Jaką wadę ma Konrad Wallenrod według Krzyżaków?",
      content: {
        options: [
          "Jest tchórzem na polu bitwy",
          "Zamknięty w samotnym pokoju, pije alkohol, śpiewa smutne pieśni i wpada w szał",
          "Kradnie pieniądze Zakonu",
          "Odmawia modlitwy i uczestnictwa w nabożeństwach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Jedyną znaną Krzyżakom wadą Konrada to alkoholizm — zamknięty w pokoju pije i śpiewa posępne pieśni w obcym języku (litewskim). W szale krzyczy rozkazy, grozi komuś nieznanemu. Halban uspokaja go jednym spojrzeniem.",
      },
    },

    // ===== 10 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        "W jakim celu Walter Alf pojechał z żoną Aldoną do klasztoru zakonnic?",
      content: {
        options: [
          "Żeby się pomodlić przed wyruszeniem na wojnę",
          "Żeby ukryć Aldonę bezpiecznie, zanim sam wrócił do Zakonu pod fałszywym imieniem realizować plan zemsty",
          "Żeby Aldona została zakonnicą z przekonania religijnego",
          "Żeby spotkać się z Halbanem w tajemnicy",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Walter Alf odwozi Aldonę do klasztoru zakonnic za Niemnem, zanim sam wraca do Zakonu pod imieniem Wallenroda. Aldona później opuszcza klasztor i zamyka się w wieży przy zamku w Malborku, by być blisko męża.",
      },
    },

    // ===== 11 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Czego dotyczy pieśń Halbana o Wilii?",
      content: {
        options: [
          "O historii walk Litwinów z Krzyżakami",
          "O pięknej Litwince, która pokochała cudzoziemca i płacze w pustelniczej wieży — alegoria losu Aldony",
          "O zwycięstwach litewskiego księcia Kiejstuta",
          "O budowie zamku w Malborku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Pieśń o Wilii to alegoria losu Aldony: rzeka Wilia płynie do Niemna (oblubieńca) i ginie w morzu, tak jak Litwinka pokochała przybysza i płacze w pustelniczej wieży. Halban śpiewa ją po wyborze Konrada na mistrza.",
      },
    },

    // ===== 12 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Które z poniższych stwierdzeń o genezie utworu są prawdziwe?",
      content: {
        options: [
          "Mickiewicz pisał go na zesłaniu w Rosji",
          "Utwór został wydany w 1828 roku",
          "Mickiewicz dedykował go Bonawendurze i Joannie Zaleskim",
          "Utwór powstał po powstaniu listopadowym",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Utwór pisany w Rosji (1825-1827), wydany w 1828, dedykowany Zaleskim. NIE powstał po powstaniu listopadowym (1830) — powstanie wybuchło DWA LATA PO wydaniu. To ważna różnica — Wallenrod wpisuje się w kontekst spisków dekabrysstów, nie powstania.",
      },
    },

    // ===== 13 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        'Które rzeki i miejsca pojawiają się w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Niemen — granica między Litwą a Prusami",
          "Maryjensburg (Malbork) — siedziba Zakonu",
          "Wisła — stołeczna rzeka Krakowa",
          "Kowno — miasto litewskie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Niemen to granica między światami (Litwa/Prusy), Maryjensburg/Malbork to siedziba Zakonu, Kowno to miasto litewskie (zamek Kiejstuta, błonia Peruna). Wisła i Kraków nie pojawiają się w utworze.",
      },
    },

    // ===== 14 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Co to jest wajdelota?",
      content: {
        options: [
          "Litewski rycerz konny",
          "Litewski bard/pieśniarz — strażnik tradycji ustnej i pamięci narodowej",
          "Niemiecki zakonnik",
          "Litewski kapłan ognia",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wajdelota to litewski bard — śpiewak i strażnik tradycji ustnej narodu. W utworze tę rolę pełni Halban, który śpiewa pieśni o Litwie i przechowuje pamięć narodową. Wajdelota jest odpowiednikiem romantycznego poety-wieszcza.",
      },
    },

    // ===== 15 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Z którym narodem walczy Zakon Krzyżacki w utworze?",
      content: {
        options: ["Z Francuzami", "Z Litwinami", "Z Turkami", "Z Anglikami"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Zakon Krzyżacki walczy z Litwinami — pogańskim ludem nad Niemnem. W utworze Litwa to ojczyzna Waltera Alfa, której broni on podstępem od wewnątrz struktur wroga.",
      },
    },

    // ===== 16 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        "Jakie stanowisko obejmuje Konrad Wallenrod w Zakonie Krzyżackim?",
      content: {
        options: [
          "Kapelan zakonny",
          "Wielki mistrz Zakonu Krzyżackiego",
          "Komtur twierdzy Malbork",
          "Giermek arcykomtura",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Konrad Wallenrod zostaje wybrany wielkim mistrzem Zakonu Krzyżackiego — najwyższym dowódcą. To kluczowe dla jego planu: jako mistrz może celowo prowadzić Zakon do klęski.",
      },
    },

    // ===== 17 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: 'W jakim wieku rozgrywa się akcja "Konrada Wallenroda"?',
      content: {
        options: ["W XII wieku", "W XIV wieku", "W XVI wieku", "W XIX wieku"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Akcja rozgrywa się w XIV wieku, w czasach walk Litwy z Zakonem Krzyżackim. To historyczne tło zostało celowo wybrane przez Mickiewicza jako maska historyczna — średniowiecze ukrywa treści o współczesnej Polsce pod zaborami.",
      },
    },

    // ===== 18 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 3,
      points: 2,
      work: "Sklepy cynamonowe",
      question:
        'Opisz krótko, co dzieje się z ojcem w opowiadaniu "Nawiedzenie". Jakie dziwne zachowania przejawia?',
      content: {
        hints: ["choroba", "monologi", "dialog z Bogiem", "zanikanie fizyczne"],
      },
      correctAnswer:
        'W "Nawiedzeniu" ojciec zapada na zdrowiu, leży w łóżku otoczony flaszkami i księgami handlowymi. Prowadzi samotne monologi, kłóci się z sobą, jakby jego osobowość rozpadła się na wiele jaźni. Nocami dialoguje z Bogiem jak starotestamentowy prorok. Stopniowo maleje — "jak orzech zsychający się w łupinie" — wspina się na szafy, pieje jak kogut, znika na wiele dni w zakamarkach mieszkania. Na końcu jego resztki Adela wymiata jak kupkę śmieci.',
      metadata: {
        explanation:
          '"Nawiedzenie" to kluczowe opowiadanie dla motywu degradacji ojca — od kupca przez proroka do nicości. Zanikanie jest zarówno komiczne (pieje jak kogut), jak i tragiczne ("zniknął nie zauważony").',
      },
    },

    // ===== 19 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 3,
      points: 2,
      work: "Sklepy cynamonowe",
      question: "Które z poniższych metamorfoz ojca występują w zbiorze?",
      content: {
        options: [
          "Ojciec naśladuje ptaki — pieje jak kogut, trzepocze rękami",
          "Ojciec stopniowo zamienia się w karakona",
          'Ojciec maleje fizycznie aż staje się "kupką śmieci"',
          "Ojciec przemienia się w drzewo",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "W zbiorze ojciec: naśladuje ptaki i pieje (Ptaki), przemienia się w karakona (Karakony), maleje fizycznie aż zanika (Nawiedzenie). Metamorfoza w drzewo nie występuje.",
      },
    },

    // ===== 20 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 3,
      points: 2,
      work: "Sklepy cynamonowe",
      question: "Jaka jest relacja między Ulicą Krokodyli a resztą miasteczka?",
      content: {
        options: [
          "Ulica Krokodyli jest centrum handlowym i dumą miasta",
          "Jest tandetną, pseudonowoczesną dzielnicą — kontrastem wobec magicznego miasteczka: świat pozorów, imitacji, szarości, moralnej degradacji",
          "Jest najstarszą, najbardziej szacowną dzielnicą miasta",
          "Jest dzielnicą artystów i intelektualistów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ulica Krokodyli to antyświat wobec magicznego miasteczka: tandetna, bezbarwna, pełna pozoru. Rzeczywistość jest tam "cienka jak papier" i "zdradza swą imitatywność". To krytyka pseudonowoczesnej komercjalizacji, która niszczy autentyczność.',
      },
    },

    // ===== 21 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 3,
      points: 2,
      work: "Sklepy cynamonowe",
      question: 'Jakim terminem określa się czas w "Sklepach cynamonowych"?',
      content: {
        options: [
          "Czas historyczny — konkretne daty i wydarzenia",
          "Czas mityczny i cykliczny — wyznaczony porami roku, nie datami, krążący w koło jak w micie",
          "Czas linearny — od narodzin do śmierci narratora",
          "Czas realny — bieżący, odpowiadający dacie pisania",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "U Schulza czas jest mityczny i cykliczny — wyznaczony porami roku (lato/sierpień, zima, jesień), nie konkretnymi datami. Czas krąży jak w micie: lato wraca, zima wraca, pory roku powtarzają się jak rytuały. To czas mitu, nie historii.",
      },
    },

    // ===== 22 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 3,
      points: 2,
      work: "Sklepy cynamonowe",
      question: "Co spotkało Brunona Schulza podczas wojny?",
      content: {
        options: [
          "Emigrował do Stanów Zjednoczonych",
          "Został zastrzelony na ulicy przez gestapowca w 1942 roku w Drohobyczu",
          "Przetrwał wojnę w ukryciu i umarł po wojnie",
          "Został deportowany do obozu i tam zmarł",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Bruno Schulz został zastrzelony na ulicy Drohobycza 19 listopada 1942 roku przez gestapowca Günthera. Zofia Nałkowska próbowała zorganizować jego przerzut do Warszawy, ale nie zdążyła. Jego śmierć jest jedną z największych strat polskiej literatury.",
      },
    },

    // ===== 23 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 2,
      points: 1,
      work: "Sklepy cynamonowe",
      question:
        'Co ojciec robi na uczcie w opowiadaniu "Noc wielkiego sezonu"?',
      content: {
        options: [
          "Wspina się na półki i trąbi na puzonie na alarm",
          'Woła: "Jakubie, handlować!" i zaczyna sprzedawać sukno',
          "Rozrzuca bele sukna, tworząc górski krajobraz z materii",
          "Spokojnie handluje z klientami za ladą",
        ],
      },
      correctAnswer: [0, 2],
      metadata: {
        explanation:
          'W "Nocy wielkiego sezonu" ojciec w szale wspina się na półki, trąbi na puzonie i rozrzuca bele sukna, tworząc fantastyczny górski krajobraz. "Jakubie, handlować!" wołają do niego ludzie — to nie on. Nie handluje spokojnie — jest jak szalony prorok na górze Synaj.',
      },
    },

    // ===== 24 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 2,
      points: 1,
      work: "Sklepy cynamonowe",
      question:
        "Które stwierdzenia o tytułowych sklepach cynamonowych są prawdziwe?",
      content: {
        options: [
          "Ich nazwa pochodzi od koloru ciemnych boazerii",
          "Sprzedają egzotyczne towary: ognie bengalskie, salamandry, rzadkie książki",
          "Narrator regularnie robi w nich zakupy",
          "Narrator szuka ich nocą, ale nigdy do nich nie dociera",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Sklepy cynamonowe mają ciemne boazerie (stąd nazwa), sprzedają towary egzotyczne i fantastyczne. Narrator pamięta je z przeszłości, ale podczas nocnej wędrówki nigdy do nich nie dociera — są nieosiągalne, symbolizują utraconą arkadię.",
      },
    },

    // ===== 25 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 2,
      points: 1,
      work: "Sklepy cynamonowe",
      question: 'Co stało się z ciotką Perazją w opowiadaniu "Wichura"?',
      content: {
        options: [
          "Uciekła z domu przed wichurą",
          "W paroksyzmie złości malała, biegała na szczudłach i ostatecznie zetlała się w proch jak spalony papier",
          "Usnęła spokojnie przy piecu",
          "Poszła po pomoc do sąsiadów",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ciotka Perazja w gniewie zaczyna maleć, wskakuje na szczudła z drzazg, biega po półkach i wreszcie sczerniała, zwinęła się jak zwiędły papier i zetlała w proch. To jedna z najbardziej groteskowych scen zbioru — człowiek dosłownie znika w paroksyzmie emocji.",
      },
    },

    // ===== 26 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 2,
      points: 1,
      work: "Sklepy cynamonowe",
      question:
        'Co ojciec postuluje stworzyć "na obraz i podobieństwo" w Traktacie o Manekinach?',
      content: {
        options: [
          "Boga",
          "Człowieka — na obraz i podobieństwo manekina",
          "Zwierzę doskonalsze od ptaków",
          "Nowy rodzaj tkaniny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ojciec konkluduje: chce stworzyć po raz wtóry człowieka, na obraz i podobieństwo manekina — z tandety, kłaków i trocin. To parodia biblijnego aktu stworzenia — "wtóra demiurgia" zamiast doskonałych tworów Boga.',
      },
    },

    // ===== 27 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 2,
      points: 1,
      work: "Sklepy cynamonowe",
      question: "Kim są Polda i Paulina w zbiorze?",
      content: {
        options: [
          "Córkami ciotki Agaty",
          "Dziewczętami do szycia, które przychodzą wieczorami do domu narratora",
          "Nauczycielkami w szkole",
          "Sąsiadkami z sąsiedniego domu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Polda i Paulina to szwaczki — dziewczęta do szycia, które przychodzą wieczorami. W ich obecności ojciec wygłasza prelekcje o manekinach. Są jednocześnie jego audytorium i — w pewnym sensie — obiektem badań anatomicznych.",
      },
    },

    // ===== 28 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 2,
      points: 1,
      work: "Sklepy cynamonowe",
      question:
        'Do jakiego ptaka jest porównywany ojciec w opowiadaniu "Ptaki"?',
      content: {
        options: ["Do orła", "Do kondora", "Do pawia", "Do słowika"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ojciec jest porównywany do kondora — ogromnego ptaka o nagiej szyi, pomarszczonej twarzy i kamiennym profilu. Narrator widzi w nim "starszego brata ojca" i mumię. Kondor używa nawet wspólnego naczynia nocnego z ojcem.',
      },
    },

    // ===== 29 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 1,
      points: 1,
      work: "Sklepy cynamonowe",
      question: "Które cechy opisują ojca narratora w zbiorze?",
      content: {
        options: [
          "Jest kupcem prowadzącym sklep z suknem",
          "Jest ekscentrykiem fascynującym się ptakami i materią",
          "Jest typowym, spokojnym ojcem rodziny",
          "Stopniowo maleje i zanika fizycznie",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Ojciec (Jakub) formalnie jest kupcem, ale w oczach syna to ekscentryk — hoduje egzotyczne ptaki, wykłada o materii, maleje i zanika. NIE jest typowym spokojnym ojcem — to postać niezwykła, groteskowa i tragiczna.",
      },
    },

    // ===== 30 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 1,
      points: 1,
      work: "Sklepy cynamonowe",
      question:
        'Które z poniższych opowiadań należą do zbioru "Sklepy cynamonowe"?',
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
          '"Manekiny", "Traktat o Manekinach" i "Wichura" należą do zbioru. "Emeryt" to opowiadanie z drugiego tomu Schulza — "Sanatorium Pod Klepsydrą".',
      },
    },

    // ===== 31 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 1,
      points: 1,
      work: "Sklepy cynamonowe",
      question:
        "Jakie rodzinne miasto Schulza było wzorem dla miasteczka w zbiorze?",
      content: {
        options: ["Kraków", "Lwów", "Drohobycz", "Warszawa"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Miasteczko ze zbioru jest wzorowane na Drohobyczu — rodzinnym mieście Schulza na Kresach (dzisiejsza Ukraina). Schulz nigdy na stałe nie opuścił Drohobycza.",
      },
    },

    // ===== 32 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 1,
      points: 1,
      work: "Sklepy cynamonowe",
      question: 'Jak nazywa się narrator zbioru "Sklepy cynamonowe"?',
      content: {
        options: ["Bruno", "Jakub", "Józef", "Narrator nie ma imienia"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Narrator zbioru ma na imię Józef — opowiada z perspektywy dziecka/dorosłego wspominającego dzieciństwo. W postaci narratora odbijają się cechy samego Schulza.",
      },
    },

    // ===== 33 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 1,
      points: 1,
      work: "Sklepy cynamonowe",
      question: 'Kto pomógł Schulzowi wydać "Sklepy cynamonowe"?',
      content: {
        options: [
          "Witold Gombrowicz",
          "Zofia Nałkowska",
          "Julian Tuwim",
          "Jarosław Iwaszkiewicz",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Zbiór ukazał się dzięki protekcji Zofii Nałkowskiej, która rozpropagowała twórczość Schulza i pomogła mu w wydaniu debiutanckiej książki w warszawskim wydawnictwie "Rój".',
      },
    },

    // ===== 34 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "INTERWAR",
      difficulty: 1,
      points: 1,
      work: "Sklepy cynamonowe",
      question: 'W jakiej epoce literackiej powstały "Sklepy cynamonowe"?',
      content: {
        options: [
          "Pozytywizm",
          "Młoda Polska",
          "Dwudziestolecie międzywojenne",
          "Współczesność",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          '"Sklepy cynamonowe" to zbiór opowiadań Brunona Schulza wydany w 1933 roku — należą do epoki dwudziestolecia międzywojennego. Proza Schulza reprezentuje nurt awangardowy i surrealistyczny.',
      },
    },

    // ===== 35 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 3,
      points: 2,
      work: "Ludzie bezdomni",
      question:
        "Kim jest Karbowski i dlaczego Judym porównuje go do kwiatu tuberozy?",
      content: {},
      correctAnswer:
        "Karbowski to przystojny, lekkomyślny utracjusz i karciarz, w którym zakochuje się Natalia Orszeńska. Judym porównuje go do kwiatu tuberozy — pięknego, ale bezużytecznego. Symbol podkreśla kontrast między powierzchownym pięknem a brakiem społecznej wartości.",
      metadata: {
        explanation:
          "Porównanie do tuberozy jest jednym z kluczowych symboli powieści — ilustruje Judymowski pogląd, że piękno bez użyteczności społecznej jest puste.",
      },
    },

    // ===== 36 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 3,
      points: 2,
      work: "Ludzie bezdomni",
      question: 'Które motywy literackie są obecne w "Ludziach bezdomnych"?',
      content: {
        options: [
          "Motyw poświęcenia osobistego szczęścia dla dobra ogółu",
          "Motyw bezdomności w sensie dosłownym i metaforycznym",
          "Motyw walki zbrojnej o niepodległość",
          "Motyw niespełnionej miłości",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "W powieści obecne są motywy: poświęcenia (Judym rezygnuje ze szczęścia), bezdomności (dosłowna — nędzarze; metaforyczna — Judym, Joasia), niespełnionej miłości (Judym i Joanna). Walka zbrojna o niepodległość nie jest motywem tej powieści.",
      },
    },

    // ===== 37 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 3,
      points: 2,
      work: "Ludzie bezdomni",
      question: 'Czym jest "żeromeszczyzna" jako styl literacki?',
      content: {
        options: [
          "Stylem polegającym na używaniu wyłącznie krótkich, prostych zdań",
          "Stylem łączącym realizm z symbolizmem, impresjonizmem i liryzacją prozy — opisy przyrody odzwierciedlają stany psychiczne bohaterów",
          "Techniką dialogu opartego wyłącznie na slangu ulicznym",
          "Metodą pisania pamiętników w pierwszej osobie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Żeromeszczyzna" to styl łączący różne techniki: realizm (opisy nędzy), symbolizm (Wenus, sosna), impresjonizm (migotliwość opisu przyrody), liryzację prozy (poetycki język narracji). Charakterystyczna jest psychizacja pejzażu — przyroda odzwierciedla emocje bohatera.',
      },
    },

    // ===== 38 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 3,
      points: 2,
      work: "Ludzie bezdomni",
      question: "Dlaczego Judym w zakończeniu rezygnuje z miłości do Joanny?",
      content: {
        options: [
          "Bo Joanna go odrzuciła",
          "Bo uważa, że nie może mieć domu i rodziny, dopóki trwa nędza najuboższych — czuje dług wobec klasy, z której się wywodzi",
          "Bo zakończył się mu kontrakt w Zagłębiu i musi wyjechać",
          "Bo Halban zabronił mu się żenić",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Judym mówi Joasi, że nie może mieć "ani ojca, ani matki, ani żony", dopóki trwa nędza. Jako człowiek który sam wyszedł z biedy, czuje moralny dług wobec tych, którzy zostali na dole. Rezygnacja z miłości jest ceną za wierność ideałom.',
      },
    },

    // ===== 39 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 3,
      points: 2,
      work: "Ludzie bezdomni",
      question: "Co symbolizuje rozdarta sosna w zakończeniu powieści?",
      content: {
        options: [
          "Siłę przyrody i odporność natury",
          "Wewnętrzne rozdarcie Judyma między miłością a obowiązkiem wobec biedoty",
          "Zniszczenie lasów przez przemysł w Zagłębiu",
          "Nadzieję na lepsze jutro",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Rozdarta sosna to centralny symbol powieści. Jej pień rozszarpany odzwierciedla rozdarcie duszy Judyma po rozstaniu z Joasią. Krople żywicy odpowiadają jego łzom. Pytanie "Kto płacze?" wskazuje na uniwersalność cierpienia.',
      },
    },

    // ===== 40 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      work: "Ludzie bezdomni",
      question:
        "Które miejsca w powieści służą jako ilustracja nędzy społecznej?",
      content: {
        options: [
          "Sutereny ulicy Ciepłej i Krochmalnej w Warszawie",
          "Salon doktorostwa Czerniszów",
          "Fabryka cygar, w której pracuje bratowa Judyma",
          '"Budy" robotnicze przy cynkowni w Zagłębiu',
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Sutereny warszawskie, fabryka cygar i budy robotnicze w Zagłębiu to trzy kluczowe miejsca ilustrujące nędzę. Salon Czerniszów to przestrzeń zamożnej inteligencji — kontrastowa wobec nędzy.",
      },
    },

    // ===== 41 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      work: "Ludzie bezdomni",
      question: 'Które stwierdzenia o rozdziale "Zwierzenia" są prawdziwe?',
      content: {
        options: [
          "Narratorką jest Joanna Podborska",
          "Rozdział ma formę dziennika",
          "Jest napisany w trzeciej osobie jak reszta powieści",
          "Joanna porusza tematy samotności, śmierci brata i roli kobiet",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '"Zwierzenia" to dziennik Joanny Podborskiej — jedyny fragment powieści pisany w pierwszej osobie. Joanna porusza tematy samotności guwernantki, śmierci brata Wacława i refleksji o roli kobiet. NIE jest w trzeciej osobie.',
      },
    },

    // ===== 42 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      work: "Ludzie bezdomni",
      question:
        "Kto jedyny okazuje Judymowi współczucie po nieudanym odczycie?",
      content: {
        options: [
          "Doktor Płowicz",
          "Doktor Kalecki",
          "Doktor Chmielnicki",
          "Pani Czerniszowa",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Doktor Chmielnicki — lekarz żydowskiego pochodzenia — jako jedyny okazuje Judymowi szczere współczucie. To on pośredniczy w znalezieniu mu posady w Cisach u doktora Węglichowskiego.",
      },
    },

    // ===== 43 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      work: "Ludzie bezdomni",
      question:
        'Czego dotyczy słynne zdanie Judyma: "Lekarz dzisiejszy — to lekarz ludzi bogatych"?',
      content: {
        options: [
          "Pochwalenia lekarzy za ich poświęcenie",
          "Zarzutu, że lekarze koncentrują się na zamożnych pacjentach i zaniedbują biedotę",
          "Reklamy prywatnego gabinetu Judyma",
          "Opisu systemu opieki zdrowotnej w Paryżu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "To centralna teza odczytu Judyma u Czerniszów. Zarzuca lekarzom, że leczą tylko bogatych, ignorując przyczyny chorób biedoty — sutereny, fabryki, brud. Odczyt kończy się porażką — środowisko lekarskie odrzuca jego postulaty.",
      },
    },

    // ===== 44 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      work: "Ludzie bezdomni",
      question: "Co Judym robi po utracie posady w Cisach?",
      content: {
        options: [
          "Wraca do Paryża",
          "Otwiera prywatny gabinet w Warszawie",
          "Jedzie do Zagłębia Dąbrowskiego i pracuje jako lekarz w kopalni",
          "Emigruje do Ameryki",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Po wyrzuceniu z Cisów (za pobicie Krzywosąda) Judym jedzie do Zagłębia Dąbrowskiego, gdzie pracuje jako lekarz przy kopalni. Tam styka się z najcięższą nędzą robotniczą.",
      },
    },

    // ===== 45 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      work: "Ludzie bezdomni",
      question:
        "Jaki obraz w Luwrze głęboko porusza Judyma i staje się symbolem nędzy?",
      content: {
        options: [
          '"Mona Lisa" Leonarda da Vinci',
          '"Ubogi rybak" Puvis de Chavannes\'a',
          '"Wolność wiodąca lud na barykady" Delacroix',
          '"Przysięga Horacjuszy" Davida',
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Ubogi rybak" Puvis de Chavannes\'a symbolizuje w powieści nędzę i krzywdę społeczną. Stanowi kontrast wobec Wenus z Milo, symbolizującej piękno i harmonię. Oba dzieła zapowiadają centralny konflikt powieści.',
      },
    },

    // ===== 46 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 2,
      points: 1,
      work: "Ludzie bezdomni",
      question: "Kto jest dyrektorem zakładu leczniczego w Cisach?",
      content: {
        options: [
          "Doktor Chmielnicki",
          "Doktor Węglichowski",
          "Doktor Kalecki",
          "Doktor Płowicz",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Doktor Węglichowski to dyrektor zakładu w Cisach — ceniony lekarz, ale konserwatywny, niechętny reformom Judyma dotyczącym osuszenia stawów.",
      },
    },

    // ===== 47 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 1,
      points: 1,
      work: "Ludzie bezdomni",
      question: 'Które postacie są lekarzami w powieści "Ludzie bezdomni"?',
      content: {
        options: [
          "Tomasz Judym",
          "Doktor Węglichowski",
          "Korzecki",
          "Doktor Chmielnicki",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Judym, Węglichowski (dyrektor Cisów) i Chmielnicki (lekarz żydowskiego pochodzenia) są lekarzami. Korzecki jest inżynierem, nie lekarzem.",
      },
    },

    // ===== 48 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 1,
      points: 1,
      work: "Ludzie bezdomni",
      question: "Które z poniższych zdań o Tomaszu Judymie są prawdziwe?",
      content: {
        options: [
          "Jest lekarzem z wykształcenia",
          "Pochodzi z rodziny arystokratycznej",
          "Jego ojciec był szewcem",
          "Ukończył studia medyczne w Warszawie",
        ],
      },
      correctAnswer: [0, 2, 3],
      metadata: {
        explanation:
          "Judym jest lekarzem, synem szewca z ulicy Ciepłej, ukończył medycynę w Warszawie. NIE pochodzi z arystokracji — jego niskie pochodzenie jest źródłem kompleksów i poczucia długu wobec biedoty.",
      },
    },

    // ===== 49 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 1,
      points: 1,
      work: "Ludzie bezdomni",
      question:
        "Gdzie Judym odbywał praktyki chirurgiczne przed powrotem do Warszawy?",
      content: {
        options: ["W Berlinie", "W Wiedniu", "W Paryżu", "W Londynie"],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Judym odbywał praktyki chirurgiczne w klinikach paryskich. Właśnie w Paryżu, w Luwrze, spotyka po raz pierwszy Joannę Podborską i panny Orszeńskie.",
      },
    },

    // ===== 50 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 1,
      points: 1,
      work: "Ludzie bezdomni",
      question: "Na jakiej ulicy w Warszawie mieszkał ojciec Tomasza Judyma?",
      content: {
        options: [
          "Na ulicy Marszałkowskiej",
          "Na ulicy Ciepłej",
          "Na ulicy Krochmalnej",
          "Na ulicy Nowy Świat",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Ojciec Judyma, szewc, mieszkał na ulicy Ciepłej w Warszawie. Sam Judym wyznaje to otwarcie przy spotkaniu z panią Niewadzką w Luwrze.",
      },
    },

    // ===== 51 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 1,
      points: 1,
      work: "Ludzie bezdomni",
      question: "Jak nazywa się główna bohaterka kobieca powieści?",
      content: {
        options: [
          "Helena Kalinowicz",
          "Joanna Podborska",
          "Natalia Orszeńska",
          "Wanda Orszeńska",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Główna bohaterka kobieca to Joanna Podborska — nauczycielka i guwernantka, opiekująca się wnuczkami pani Niewadzkiej. Jest również autorką dziennika z rozdziału "Zwierzenia".',
      },
    },

    // ===== 52 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "YOUNG_POLAND",
      difficulty: 1,
      points: 1,
      work: "Ludzie bezdomni",
      question: 'W jakim roku została napisana powieść "Ludzie bezdomni"?',
      content: {
        options: ["1885", "1899", "1905", "1912"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Ludzie bezdomni" zostali napisani w 1899 roku w Zakopanem. Powieść należy do epoki Młodej Polski i jest jednym z najważniejszych dzieł Stefana Żeromskiego.',
      },
    },

    // ===== 53 =====
    {
      type: "ESSAY",
      category: "WRITING",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 10,
      work: "Dżuma",
      question:
        'Człowiek wobec cierpienia i śmierci. Rozważ problem, odwołując się do "Dżumy" Alberta Camusa i jednego innego tekstu kultury.',
      content: {
        thesis: "Cierpienie i śmierć jako probierz człowieczeństwa",
        structure: {
          conclusion:
            "Sformułuj wniosek: czy cierpienie uczy, niszczy, czy obydwa — i jak Camus proponuje reagować?",
          introduction:
            "Przedstaw problem: jak cierpienie odsłania prawdę o człowieku — jego słabości i wielkość?",
          arguments_for:
            'Podaj przykłady postaw wobec cierpienia w "Dżumie": Rieux (walka), Tarrou (bunt), Paneloux (wiara), Cottard (oportunizm)',
          arguments_against:
            'Rozważ, czy cierpienie może nie mieć żadnego sensu — ani kształcącego, ani oczyszczającego (Rieux: "nigdy nie będę kochał tego świata, gdzie dzieci są torturowane")',
        },
        wordLimit: { max: 600, min: 400 },
        requirements: [
          "Przeanalizuj scenę śmierci dziecka Othona jako kulminację problemu cierpienia",
          "Odwołaj się do filozofii absurdu i buntu Camusa",
          'Porównaj z innym tekstem kultury (np. Księga Hioba, "Inny świat", "Antygona", "Medaliony")',
          'Sformułuj własne stanowisko wobec tezy, że cierpienie "uszlachetnia"',
          "Minimum 400 słów",
        ],
      },
      correctAnswer:
        'Rozprawka powinna: Postawy wobec cierpienia: Rieux — odmowa akceptacji, walka mimo beznadziejności; Tarrou — bunt i pragnienie niewinności; Paneloux — ewolucja od wyjaśnienia (kara Boża) do wiary totalnej; Cottard — ucieczka w oportunizm. Scena śmierci dziecka: kulminacja — cierpienie niewinnego podważa wszelkie racjonalizacje. Rieux krzyczy: "ten przynajmniej był niewinny". Camus odrzuca ideę, że cierpienie "uszlachetnia" — to zdanie Paneloux z I kazania, które sam potem porzuca. Porównanie: Księga Hioba — Hiob cierpi niewinnie, Bóg odpowiada tajemnicą; u Camusa nie ma Boga, który odpowiada. "Inny świat" — Herling pokazuje, że cierpienie w łagrze degraduje, ale jednocześnie wyostrza moralność. "Antygona" — cierpienie wynika z konfliktu wartości, ma sens tragiczny. Stanowisko: cierpienie nie uszlachetnia automatycznie — u Camusa może zniszczyć (Paneloux umiera) lub obudzić (Rambert zmienia się). Jedyną właściwą odpowiedzią jest bunt i solidarność — nie akceptacja.',
      metadata: {
        explanation:
          '"Człowiek wobec cierpienia i śmierci" to jedno z pytań jawnych na maturę ustną 2026-2028 dotyczących "Dżumy". Kluczowe: Camus NIE gloryfikuje cierpienia — odrzuca ideę "uszlachetniającego bólu" na rzecz buntu.',
      },
    },

    // ===== 54 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 5,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          '"Dżuma" jako manifest nowego humanizmu — jak Camus definiuje człowieczeństwo po doświadczeniu II wojny światowej?',
        wordLimit: { max: 250, min: 200 },
        requirements: [
          'Wyjaśnij, dlaczego "Dżumę" okrzyknięto "manifestem nowego humanizmu" po publikacji',
          "Wskaż, na czym polega humanizm Camusa: solidarność, uczciwość, bunt, odrzucenie heroicznej retoryki",
          "Porównaj z tradycyjnym humanizmem (wiara w postęp, rozum, doskonalenie) — co Camus odrzuca?",
          "Odwołaj się do kontekstu II wojny i pytania: czy po Auschwitz można być humanistą?",
          "200-250 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: "Dżuma" jako nowy humanizm — nie opiera się na wierze w postęp ani doskonałość człowieka, lecz na "prostej ludzkiej solidarności i moralności, bez patosu i wielkich słów" (jak piszą krytycy). Humanizm Camusa: solidarność (formacje sanitarne), uczciwość ("robić, co należy"), bunt (odmowa akceptacji cierpienia), pokora ("nie chodzi o heroizm, chodzi o dwa i dwa to cztery"). Co Camus odrzuca z tradycyjnego humanizmu: optymizm co do natury ludzkiej ("każdy nosi w sobie dżumę"), wiarę w postęp (epidemia wróci), ideologie ("całe nieszczęście ludzi płynie stąd, że nie mówią jasnym językiem"). Kontekst II wojny: po Auschwitz wiara w rozum i doskonałość człowieka jest nie do utrzymania. Camus proponuje humanizm bez iluzji: "w ludziach więcej rzeczy zasługuje na podziw niż na pogardę" — ale nie dlatego, że człowiek jest z natury dobry, lecz dlatego, że MOŻE dokonywać dobrych wyborów mimo absurdu. To humanizm syzyfowy — szlachetny i tragiczny zarazem.',
      metadata: {
        explanation:
          'Pytanie o "nowy humanizm" to ważny kontekst maturalny. Kluczowe: Camus po Auschwitz nie może być naiwnym humanistą — proponuje humanizm oparty na buncie i solidarności, nie na optymizmie.',
      },
    },

    // ===== 55 =====
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 4,
      work: "Dżuma",
      question:
        'Wyjaśnij, na czym polega styl narracyjny "Dżumy" i dlaczego Camus wybrał formę kroniki. Jak wpływa to na odbiór powieści?',
      content: {},
      correctAnswer:
        'Styl: 1) Kronikarski ton — narracja pozornie obiektywna, sprawozdawcza, bez patosu. Rieux celowo unika emocjonalnych opisów na rzecz faktów, statystyk, relacji. 2) Trzecia osoba — dystans narratora do samego siebie. 3) Wielogłosowość — obok kroniki Rieux są notatki Tarrou (subiektywne, ironiczne), zeznania świadków, dokumenty. 4) Brak psychologizmu — bohaterowie są raczej modelami postaw niż głębokimi postaciami psychologicznymi (cecha paraboli). Forma kroniki: Camus wybrał ją, bo kronika udaje dokument — wzmacnia wiarygodność paraboli. Czytelnik czyta "relację", nie "powieść", co sprawia, że traktuje historię serio. Efekt: styl suchy, pozornie chłodny — ale właśnie dlatego momenty emocjonalne (śmierć dziecka, śmierć Tarrou, Grand płaczący pod sklepem) uderzają z ogromną siłą na tle kronikarskiej powściągliwości.',
      metadata: {
        explanation:
          "Pytanie o styl narracyjny to typowe pytanie LANGUAGE_USE na maturze rozszerzonej. Kluczowe: forma kroniki to świadomy wybór stylistyczny — pozorna obiektywność potęguje emocjonalny efekt.",
      },
    },

    // ===== 56 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 4,
      work: "Dżuma",
      question:
        'Porównaj "Dżumę" Camusa z "Antygoną" Sofoklesa w kontekście buntu wobec porządku świata. Czym się różni bunt Rieux od buntu Antygony?',
      content: {
        instruction:
          "Uwzględnij źródło buntu, motywacje, stosunek do transcendencji i konsekwencje.",
      },
      correctAnswer:
        'Antygona buntuje się wobec prawa ludzkiego (Kreona) w imię prawa boskiego — jej bunt ma oparcie w transcendencji (bogowie, prawo natury). Rieux buntuje się wobec cierpienia i śmierci BEZ oparcia w transcendencji — nie wierzy w Boga, a mimo to walczy. Motywacja Antygony: miłość do brata + obowiązek religijny. Motywacja Rieux: uczciwość + odmowa akceptacji świata, gdzie dzieci są torturowane. Konsekwencje: Antygona ginie, ale wie, że bogowie są po jej stronie. Rieux przetrwa, ale nie ma pewności co do sensu walki — "zwycięstwa zawsze będą tymczasowe". Różnica fundamentalna: Antygona ma pewność metafizyczną (prawo boskie), Rieux nie ma żadnej — jego bunt jest samotny i "absurdalny" w sensie Camusa. Ale właśnie ta samotność nadaje mu wielkość.',
      metadata: {
        explanation:
          "Porównanie z Antygoną to klasyczne zestawienie maturalne: bunt z oparciem metafizycznym (Antygona) vs. bunt bez oparcia (Rieux). Obie postacie są szlachetne, ale ich bunty mają różne fundamenty.",
      },
    },

    // ===== 57 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 3,
      work: "Dżuma",
      question: 'Które stwierdzenia o przesłaniu "Dżumy" są uzasadnione?',
      content: {
        options: [
          '"W ludziach więcej rzeczy zasługuje na podziw niż na pogardę" — Camus jest ostatecznie humanistą wierzącym w ludzi',
          '"Bakcyl dżumy nigdy nie umiera" — zło jest stale obecne, a czujność moralna musi być permanentna',
          "Powieść naucza, że człowiek powinien pogodzić się ze złem, bo walka jest bezsensowna",
          "Sens życia nadaje się przez działanie i solidarność, nie przez wiarę w wyższy porządek",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Camus jest humanistą ("więcej podziwu niż pogardy"), ostrzega przed złym optymizmem ("bakcyl nie umiera"), proponuje sens przez działanie (Rieux, Tarrou, Grand). Powieść NIE naucza pogodzenia ze złem — wprost przeciwnie: cała jej etyka opiera się na buncie i odmowie akceptacji cierpienia.',
      },
    },

    // ===== 58 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 3,
      work: "Dżuma",
      question:
        "Dlaczego Camus wybrał Oran — brzydkie, banalne miasto handlowe — jako miejsce akcji?",
      content: {
        options: [
          "Ponieważ sam mieszkał w Oranie i chciał napisać autobiografię",
          'Ponieważ banalność Oranu podkreśla uniwersalność paraboli: dżuma (zło) nie spada na wyjątkowe miasta, lecz na zwyczajne — Oran "bez podejrzeń" reprezentuje każde społeczeństwo, które żyje bez refleksji, aż katastrofa zmusi je do zastanowienia',
          "Ponieważ Oran był jedynym miastem w Algierii, w którym wybuchła prawdziwa epidemia dżumy w XX wieku",
          "Ponieważ wydawca zakazał umieszczania akcji w Paryżu ze względów cenzuralnych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Banalność Oranu to świadomy wybór: "miasto bez podejrzeń, to znaczy miasto całkowicie nowoczesne". Zwyczajność podkreśla, że zło może spaść na każdego — nie potrzeba do tego miejsca wyjątkowego. Camus pisze: "Nasi współobywatele nie myśleli nigdy, że nasze małe miasto może być miejscem szczególnie wybranym" — co czyni z Oranu symbol ludzkości zaskoczonej katastrofą.',
      },
    },

    // ===== 59 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 3,
      work: "Dżuma",
      question:
        'Jak "Dżuma" odpowiada na pytanie: czy można być świętym bez Boga?',
      content: {
        options: [
          "Powieść potwierdza, że można — Tarrou osiąga świętość i umiera w pokoju",
          'Powieść nie daje jednoznacznej odpowiedzi: Tarrou pragnie świętości, ale umiera na dżumę, nie osiągając "spokoju"; Rieux mówi, że woli "być człowiekiem" niż świętym — Camus sugeruje, że świętość bez Boga może być nieosiągalna, ale dążenie do niej nadaje sens życiu',
          "Powieść odrzuca świętość jako pojęcie bez sensu i zastępuje ją hedonizmem",
          "Powieść pokazuje, że tylko wiara religijna (Paneloux) może dać człowiekowi świętość",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Pytanie "czy można być świętym bez Boga" to centralne zagadnienie powieści. Tarrou pragnie świętości, ale nie żyje dostatecznie długo, by ją osiągnąć — umiera na dżumę. Rieux mówi: "Nie idę tak daleko. Interesuje mnie zdrowie człowieka". Camus nie odpowiada "tak" ani "nie" — pokazuje, że samo dążenie jest wartością, nawet jeśli cel jest nieosiągalny. To logika Syzyfa: szczęśliwy mimo absurdu.',
      },
    },

    // ===== 60 =====
    {
      type: "ESSAY",
      category: "WRITING",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 5,
      work: "Dżuma",
      question:
        'Solidarność ludzi w obliczu zagrożenia. Omów zagadnienie, odwołując się do "Dżumy" Alberta Camusa i jednego innego tekstu kultury.',
      content: {
        wordLimit: { min: 300 },
        requirements: [
          "Zdefiniuj solidarność w kontekście powieści (formacje sanitarne, wspólna walka, rezygnacja z egoizmu)",
          "Przeanalizuj ewolucję Ramberta jako przykład drogi od indywidualizmu do solidarności",
          "Odwołaj się do roli Tarrou i Granda w budowaniu wspólnoty",
          'Porównaj z innym tekstem kultury (np. "Kamienie na szaniec", "Inny świat", "Medaliony")',
          "Minimum 300 słów",
        ],
      },
      correctAnswer:
        'Rozprawka powinna: zdefiniować solidarność u Camusa (nie heroizm, lecz codzienna praca — "dwa i dwa to cztery"), pokazać Ramberta (od "nie jestem stąd" do "ta sprawa dotyczy nas wszystkich"), Tarrou (organizator formacji, solidarny z ofiarami), Granda (cichy bohater, który "miał tylko dobre serce"). Porównanie: "Kamienie na szaniec" — solidarność młodzieży w AK (bohaterstwo spektakularne vs. codzienne u Camusa); "Inny świat" — w łagrze solidarność jest rzadsza, ale istnieje (Kostyłew); "Medaliony" — brak solidarności jako forma zła. Wniosek: solidarność u Camusa nie jest sentymentalna — to jedyna etyczna odpowiedź na absurd.',
      metadata: {
        explanation:
          'Solidarność w obliczu zagrożenia to jedno z pytań jawnych na maturę ustną 2026-2028 dotyczących "Dżumy".',
      },
    },

    // ===== 61 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 4,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Motyw miasta w "Dżumie" — Oran jako przestrzeń zamknięta, więzienie i laboratorium postaw',
        wordLimit: { max: 200, min: 150 },
        requirements: [
          "Opisz, jak Camus kreuje Oran na początku (banalność, brzydota, brak duszy)",
          "Wyjaśnij, jak zamknięcie bram zmienia przestrzeń — miasto jako więzienie",
          'Wskaż, dlaczego zamknięta przestrzeń służy jako "laboratorium" postaw ludzkich',
          "Porównaj z motywem zamkniętej przestrzeni w innym utworze",
          "150-200 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: Oran na początku — brzydki, banalny, "bez gołębi, bez drzew", żyje handlem, jest "miastem bez podejrzeń". Zamknięcie — bramy strzeżone, port pusty, tramwaje jako jedyny transport, zaciemnienie nocą. Miasto staje się więzieniem: "nawet niebo pełne gwiazd stało się sufitem celi". Laboratorium — zamknięta przestrzeń wymusza konfrontację z dżumą (złem): nie można uciec, trzeba wybrać postawę (walka, rezygnacja, oportunizm). Każdy bohater definiuje się wobec zamknięcia: Rambert chce uciec, Rieux walczy, Cottard kwitnie. Porównanie: "Proces" Kafki — Josef K. też jest "zamknięty" w systemie, który nie daje się zrozumieć; ale u Kafki nie ma solidarności (K. jest sam), u Camusa ludzie łączą się we wspólnocie.',
      metadata: {
        explanation:
          "Motyw zamkniętego miasta to topos oblężonego miasta — częsty temat maturalny (pytania jawne 2026-2028). Kluczowe: Oran = mikrokosmos ludzkości.",
      },
    },

    // ===== 62 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 4,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Cottard jako anty-bohater "Dżumy" — dlaczego dżuma jest dla niego wyzwoleniem?',
        wordLimit: { max: 200, min: 150 },
        requirements: [
          "Opisz sytuację Cottarda przed epidemią (próba samobójcza, lęk przed aresztowaniem)",
          'Wyjaśnij, dlaczego w czasie dżumy Cottard "rośnie" i czuje się dobrze',
          "Zanalizuj jego załamanie po końcu epidemii (strzały z okna, aresztowanie)",
          "Porównaj postawę Cottarda z postawą Rieux lub Tarrou",
          "150-200 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: Przed dżumą — próba samobójcza, ciąży nad nim śledztwo, żyje w strachu i izolacji. W czasie dżumy — odżywa: "wreszcie wszyscy są w jednym sosie". Nie prowadzi się dochodzeń, policja zajęta epidemią, Cottard może żyć swobodnie. Bogaci się na kontrabandzie, bywa w restauracjach, jest towarzyski. Mówi: "Dobrze mi z dżumą". Po końcu — załamanie: powrót porządku = powrót śledztwa. Strzela z okna do ludzi, zostaje pobity i aresztowany. Porównanie: Rieux i Tarrou walczą Z dżumą, Cottard KORZYSTA na dżumie. Oni definiują się przez bunt wobec zła — on przez zgodę na zło, które chroni go przed innym złem (wymiarem sprawiedliwości). Cottard to "współwinowajca" — uosabia postawę ludzi, którym chaos służy.',
      metadata: {
        explanation:
          'Cottard to fascynująca postać moralna: jedyny człowiek, dla którego epidemia jest korzystna. Tarrou mówi o nim: "To człowiek, który rośnie". Na maturze pojawia się w kontekście postaw wobec zła.',
      },
    },

    // ===== 63 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 3,
      work: "Dżuma",
      question:
        "Co Tarrou opowiada Rieux o swoim ojcu i jak to doświadczenie uformowało jego postawę życiową?",
      content: {},
      correctAnswer:
        'Ojciec Tarrou był zastępcą prokuratora generalnego — "poczciwy człowiek" z manią rozkładu jazdy Chaixa. Gdy Tarrou miał 17 lat, ojciec zabrał go do sądu przysięgłych. Tarrou zobaczył oskarżonego — "rudego człowieczka" — i zrozumiał, że ojciec żąda jego śmierci: "ta głowa powinna spaść". Odtąd nie mógł patrzeć na ojca tak samo. Uciekł z domu. Angażował się w politykę po stronie walczących z systemem, ale odkrył, że i oni skazują na śmierć. Zrozumiał, że "przez te wszystkie długie lata byłem zadżumionym" — że zgadzał się pośrednio na zabijanie. Odtąd postanowił "odrzucić wszystko, co z bliska czy z daleka powoduje śmierć lub usprawiedliwia zabójstwo".',
      metadata: {
        explanation:
          'Spowiedź Tarrou (część IV, scena na tarasie) to jeden z najdłuższych monologów w powieści. Wyjaśnia, dlaczego Tarrou pragnie "świętości bez Boga" — chce żyć "po stronie ofiar", nigdy "po stronie zaraz".',
      },
    },

    // ===== 64 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 3,
      work: "Dżuma",
      question:
        "Wyjaśnij, dlaczego śmierć dziecka sędziego Othona jest punktem kulminacyjnym powieści. Jak reagują na nią różni bohaterowie?",
      content: {
        instruction:
          "Odwołaj się do reakcji Rieux, Paneloux, Castela i Tarrou.",
      },
      correctAnswer:
        'Dziecko umiera mimo zastosowania nowego serum Castela — w długiej, męczarniowej agonii: konwulsje, krzyk, pot, gorączka. Reakcje: Castel zamknął książkę i patrzył bezradnie. Tarrou otarł dziecku twarz. Paneloux klęczał i modlił się: "Boże mój, uratuj to dziecko". Rieux wyszedł z sali — nie mógł tego znieść — i powiedział do Paneloux: "Ten przynajmniej był niewinny". Scena jest kulminacyjna, bo konfrontuje wszystkich z problemem cierpienia niewinnych — centralnym pytaniem teodycei. Paneloux nie ma odpowiedzi. Rieux odmawia kochania świata, który torturuje dzieci. To zderzenie stanowi rdzeń filozoficzny powieści.',
      metadata: {
        explanation:
          'Scena śmierci dziecka jest jednym z najczęściej analizowanych fragmentów "Dżumy" na maturze. Kluczowe: cierpienie niewinnego podważa zarówno religijne wyjaśnienie (Paneloux), jak i optymizm medycyny (Castel).',
      },
    },

    // ===== 65 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 3,
      work: "Dżuma",
      question:
        "Porównaj Rieux i Tarrou jako dwa modele walki ze złem. Czym się różnią, a co ich łączy?",
      content: {},
      correctAnswer:
        'Łączą ich: obaj walczą z dżumą czynnie, obaj są ateistami, obaj odrzucają heroiczną retorykę, obaj poświęcają się bezinteresownie. Różnice: Rieux walczy z obowiązku zawodowego i uczciwości — "to sprawa, którą człowiek taki jak pan potrafi zrozumieć"; to pragmatyk, lekarz. Tarrou walczy z głębokich przekonań filozoficznych — pragnie "świętości bez Boga", szuka "spokoju wewnętrznego", chce być "niewinnym mordercą". Rieux mówi o "nie kończącej się klęsce"; Tarrou szuka odkupienia za to, że sam był kiedyś "zadżumiony" (zgadzał się na karę śmierci). Rieux przetrwa, Tarrou ginie — co podkreśla tragizm idealizmu wobec pragmatyzmu.',
      metadata: {
        explanation:
          "Porównanie Rieux-Tarrou to klasyczne pytanie maturalne. Kluczowe: Rieux = uczciwość zawodowa, Tarrou = bunt metafizyczny. Obaj dochodzą do tego samego punktu (solidarność), ale różną drogą.",
      },
    },

    // ===== 66 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question:
        'Które konteksty historyczne i filozoficzne są kluczowe dla interpretacji "Dżumy"?',
      content: {
        options: [
          "Doświadczenie II wojny światowej i okupacji Francji (1940-1944)",
          "Filozofia egzystencjalna Camusa — absurd, bunt, solidarność",
          "Wojna trzydziestoletnia w Europie (1618-1648)",
          'Filozofia Camusa z "Mitu Syzyfa" — sens życia wobec absurdu',
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Kluczowe konteksty: II wojna światowa (Camus pisał powieść w 1941-1947, dżuma = metafora okupacji), egzystencjalizm (absurd, wolność, odpowiedzialność, bunt), "Mit Syzyfa" (Rieux = Syzyf: działa bez nadziei na ostateczne zwycięstwo). Wojna trzydziestoletnia nie ma związku z "Dżumą".',
      },
    },

    // ===== 67 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question:
        "Które z poniższych stwierdzeń o roli narratora-Rieux są prawdziwe?",
      content: {
        options: [
          "Rieux mówi o sobie w trzeciej osobie, by zachować obiektywność świadka",
          "Korzysta z wielu źródeł: własne doświadczenie, notatki Tarrou, zeznania, dokumenty",
          "Celowo ukrywa własne cierpienia (śmierć żony, zmęczenie), by nie przesłonić cierpienia zbiorowego",
          "Napisał kronikę, żeby sławić własne bohaterstwo i domagać się uznania",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Rieux-narrator: mówi w 3. osobie (obiektywność), zbiera źródła (wielogłos), ukrywa osobiste cierpienia (pokora). Nie pisze dla sławy — pisze "żeby świadczyć na korzyść zadżumionych" i "żeby nie należeć do tych, co milczą". Jego kronika jest aktem solidarności, nie promocji osobistej.',
      },
    },

    // ===== 68 =====
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question:
        "Jaką funkcję pełni zdanie Granda o amazonce w strukturze powieści?",
      content: {
        options: [
          "Jest komicznym przerywnikiem bez głębszego sensu",
          'Symbolizuje dążenie do doskonałości i poszukiwanie właściwego słowa — Grand robi to samo co Camus jako pisarz i co Rieux jako lekarz: próbuje "dokładnie oddać obraz" rzeczywistości, wiedząc, że nigdy nie będzie doskonały',
          "Jest cytatem z innej powieści, do której Camus nawiązuje",
          "Służy wyłącznie charakterystyce Granda jako człowieka umysłowo chorego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Zdanie o amazonce to metafora pisarstwa samego Camusa i każdej twórczości: szlifowanie, poprawianie, poszukiwanie doskonałości — która jest nieosiągalna. Grand pisze tak, jak Rieux leczy: ze świadomością porażki, ale z uporem. Spalenie rękopisu i "zaczynamy na nowo" to najkrótsza formuła egzystencjalizmu.',
      },
    },

    // ===== 69 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question: "Jakie znaczenie ma scena finałowa z Cottardem?",
      content: {
        options: [
          "Cottard ucieka z Oranu i nigdy nie zostaje złapany",
          'W dniu otwarcia bram Cottard strzela z okna do przechodniów, zostaje pobity i aresztowany — symbolizuje powrót porządku prawnego i koniec "wolności" dawanej przez dżumę',
          "Cottard przeprasza za swoje czyny i dołącza do formacji sanitarnych",
          "Cottard popełnia samobójstwo, powtarzając swoją próbę z początku powieści",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Cottard, wiedząc że koniec dżumy oznacza powrót policji i dochodzeń, szaleje — zamyka się w mieszkaniu i strzela do ludzi na ulicy. Policja go aresztuje, bijąc go pięściami. Rieux odwraca wzrok. Scena to kontrast z powszechną radością — przypomina, że nie dla wszystkich wyzwolenie jest szczęśliwe.",
      },
    },

    // ===== 70 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question:
        'Dlaczego Cottard jest jedynym bohaterem, któremu dżuma "dogadza"?',
      content: {
        options: [
          "Ponieważ jest lekarzem i zarabia na epidemii",
          'Ponieważ przed dżumą groziło mu aresztowanie — w chaosie epidemii policja nie prowadzi dochodzeń, a Cottard czuje się bezpieczny i równy innym: "wreszcie wszyscy są w jednym worku"',
          "Ponieważ jest imigrantem i chce, by Francuzi cierpieli",
          "Ponieważ wierzy, że dżuma jest karą Bożą za grzechy innych",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Cottard to człowiek "z ciężarem na sumieniu" — ciąży nad nim stare śledztwo. Dżuma go wyzwala: w zarażonym mieście nikt nie prowadzi dochodzeń, a wszyscy boją się tak jak on bał się wcześniej. Tarrou pisze: "to człowiek, który rośnie" — Cottard odżywa w chorobie. Gdy epidemia się kończy, wpada w panikę i strzela do ludzi.',
      },
    },

    // ===== 71 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 3,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Motyw rozłąki i wygnania w "Dżumie" — jak epidemia zmienia psychikę rozłączonych?',
        wordLimit: { max: 150, min: 100 },
        requirements: [
          "Wymień co najmniej trzy przykłady rozłąki (Rieux, Rambert, ogół mieszkańców)",
          "Opisz etapy psychologiczne: od bólu, przez otępienie, do zobojętnienia",
          'Wyjaśnij, dlaczego narrator mówi o "wygnaniu we własnym domu"',
          "100-150 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: Rieux — żona w sanatorium, komunikacja przez depesze, na końcu śmierć. Rambert — partnerka w Paryżu, desperacka próba ucieczki, ostatecznie rezygnacja. Ogół — rodziny rozdzielone zamknięciem bram, kontakt przez 10 słów telegramu. Etapy: 1) Ostry ból rozłąki, żywe wspomnienia. 2) Stopniowe blaknięcie pamięci — twarze bliskich stają się "bezcielesne". 3) Otępienie — ludzie przestają cierpieć indywidualnie, wchodzą w "rytm dżumy". "Wygnanie we własnym domu" — bo ludzie są w swoim mieście, ale odcięci od tego, co stanowiło ich życie: bliskich, wolności, przyszłości.',
      metadata: {
        explanation:
          "Motyw rozłąki zajmuje znaczną część II części powieści. Camus analizuje psychologię rozłączonych z precyzją kliniczną — od bólu, przez nadzieję, po zobojętnienie.",
      },
    },

    // ===== 72 =====
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question: "Jaką rolę pełnią notatki Tarrou w kompozycji powieści?",
      content: {},
      correctAnswer:
        'Notatki Tarrou stanowią drugie źródło narracji obok kroniki Rieux. Pełnią kilka funkcji: 1) Dostarczają innej perspektywy — Tarrou obserwuje detale, które Rieux pomija (mały staruszek z kotami, rodzina Othona, kasjer hotelu). 2) Wprowadzają ton osobisty — notatki są subiektywne, ironiczne, czasem poetyckie, podczas gdy Rieux dąży do obiektywności. 3) Budują portret Tarrou jako postaci — pozwalają poznać jego filozofię zanim sam ją wyjawi. 4) Uzupełniają fabułę o "historię tego, co nie ma historii" — codzienność podczas epidemii, drobne gesty, absurdy.',
      metadata: {
        explanation:
          'Notatki Tarrou to ważny element kompozycji — tworzą polifonię narracyjną. Na maturze pojawia się pytanie o konstrukcję narracji w "Dżumie" i rolę różnych źródeł (kronika Rieux, notatki Tarrou, dokumenty, zeznania).',
      },
    },

    // ===== 73 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question: "Co się stało z Josephem Grandem pod Boże Narodzenie?",
      content: {},
      correctAnswer:
        'Grand płacze pod sklepem przybranym na święta — wspomina Jeanne, swoją dawną żonę. Rieux znajduje go na ulicy, płaczącego i trzęsącego się. Grand mdleje z gorączką — ma objawy dżumy płucnej. Przed utratą przytomności błaga, by spalono jego rękopis (szlifowane zdanie). Rieux wrzuca kartki do ognia. Ale wbrew wszelkim regułom Grand wraca do zdrowia następnego dnia — co jest jednym z pierwszych znaków cofania się epidemii. Po wyzdrowieniu mówi: "Nie miałem racji. Ale zacznę na nowo".',
      metadata: {
        explanation:
          'Choroba i cudowne wyzdrowienie Granda to punkt zwrotny powieści — pierwszy sygnał, że dżuma słabnie. Spalenie rękopisu jest symboliczne: Grand poświęcił to, co najcenniejsze, ale przeżył i "zaczyna na nowo" — co streszcza przesłanie całej powieści.',
      },
    },

    // ===== 74 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        "Jak ewoluowały pogrzeby w miarę trwania epidemii? Opisz co najmniej trzy etapy.",
      content: {
        instruction:
          "Odwołaj się do zmian w ceremoniale, transporcie i miejscach pochówku.",
      },
      correctAnswer:
        "Etapy: 1) Początek — przyspieszony pogrzeb: ciało umyte, trumna zamknięta, rodzina podpisuje dokumenty, auto wiezie na cmentarz, ksiądz odprawia krótki obrzęd. 2) Środek — trumny wielorazowe: ciała ładowane grupowo, wożone w ambulansach, opróżniane do dołów, dezynfekcja trumien, krewni usuwani z ceremonii. 3) Szczyt — kremacja: doły przepełnione, wywłaszczono stare groby, użyto pieca krematoryjnego za miastem. Tramwaje bez pasażerów woziły trupy skalną drogą nadmorską. Mieszkańcy rzucali kwiaty do środka przejeżdżających tramwajów. Dym z pieca unosił się nad dzielnicami wschodnimi.",
      metadata: {
        explanation:
          "Ewolucja pogrzebów to jeden z najważniejszych motywów części IV. Camus pokazuje, jak system (administracja, skuteczność) stopniowo odbiera śmierci ludzki wymiar — aż trupy wozi się tramwajami jak towary.",
      },
    },

    // ===== 75 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question: "Które z poniższych stwierdzeń o śmierci Tarrou są prawdziwe?",
      content: {
        options: [
          "Tarrou zachorował na dżumę tuż przed końcem epidemii",
          "Rieux pielęgnował go w swoim domu zamiast w szpitalu",
          "Tarrou wyzdrowił dzięki surowicy Castela",
          "Przy łóżku Tarrou czuwała matka Rieux",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Tarrou zachorował pod koniec epidemii, Rieux zatrzymał go w domu (zamiast szpitalnej izolacji — akt przyjaźni). Matka Rieux czuwała przy łóżku. Tarrou NIE wyzdrowił — umarł po całej nocy walki z chorobą. Rieux pisze: "Tarrou przegrał partię".',
      },
    },

    // ===== 76 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        'Które elementy "Dżumy" nawiązują do doświadczeń II wojny światowej?',
      content: {
        options: [
          "Zamknięcie miasta = okupacja, izolacja ludności pod terrorem",
          "Obozy kwarantanny i internowania = obozy koncentracyjne",
          "Formacje sanitarne = ruch oporu, walka podziemna ze złem",
          "Bitwa morska pod Oranem między flotami francuską i brytyjską",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Camus pisał "Dżumę" w latach 1941-1947, w kontekście okupacji Francji. Zamknięte miasto = okupacja, izolacja = utrata wolności, obozy = obozy jenieckie/koncentracyjne, formacje sanitarne = ruch oporu. Bitwa morska pod Oranem (1940, operacja Catapult) nie jest tematem powieści.',
      },
    },

    // ===== 77 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question: "Połącz bohaterów z ich kluczowymi wypowiedziami:",
      content: {
        leftColumn: [
          { id: "A", text: '"Chciałbym nauczyć się wypowiadać"' },
          { id: "B", text: '"Mam wstręt do wyroków śmierci"' },
          {
            id: "C",
            text: '"Co to jednak znaczy — dżuma? To życie, ot i wszystko"',
          },
          { id: "D", text: '"Nie jestem stąd"' },
        ],
        rightColumn: [
          { id: "1", text: "Tarrou — o źródle swojego buntu" },
          { id: "2", text: "Rambert — proszę o prawo wyjazdu" },
          { id: "3", text: "Grand — o trudności ze słowami" },
          { id: "4", text: "Stary astmatyk — filozofia życiowa" },
        ],
        matchingType: "quotes_to_works",
      },
      correctAnswer: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      metadata: {
        explanation:
          'Grand chce "nauczyć się wypowiadać" — całe jego życie to walka ze słowami. Tarrou ma "wstręt do wyroków śmierci" — to fundament jego postawy. Stary astmatyk równoważy dżumę z życiem — filozofia biernej akceptacji. Rambert powtarza "nie jestem stąd" — argumentując za prawem do wyjazdu.',
      },
    },

    // ===== 78 =====
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        'Jaki zabieg kompozycyjny stosuje Camus, umieszczając akcję w roku "194." bez ostatniej cyfry?',
      content: {
        options: [
          "Jest to błąd w rękopisie, który wydawca nie poprawił",
          "Jest to celowe zatarcie daty — sygnał paraboliczności: historia Oranu mogła wydarzyć się w każdym roku i każdym miejscu, jest uniwersalna",
          "Oznacza, że akcja rozgrywa się w przyszłości",
          "Wskazuje na tajność dokumentów, z których korzysta narrator",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Zatarcie daty to jeden z kluczowych sygnałów paraboliczności. Razem z mottem z Defoe i uniwersalnością postaw bohaterów mówi czytelnikowi: nie chodzi o konkretną epidemię, lecz o każdą formę zła, która może dotknąć ludzkość. Podobne zabiegi stosują inne parabole — np. "Proces" Kafki (nieokreślone miasto i czas).',
      },
    },

    // ===== 79 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        'Dlaczego narrator uważa, że "dwa i dwa to cztery" jest ważną prawdą w kontekście walki z dżumą?',
      content: {
        options: [
          "Bo lekarze potrzebują dokładnych obliczeń statystycznych",
          'Bo walka z dżumą to kwestia prostej logiki i uczciwości — trzeba stwierdzać oczywiste fakty ("to jest dżuma", "trzeba izolować chorych") nawet gdy inni nie chcą ich przyjąć do wiadomości',
          "Bo Grand jest matematykiem i uczy dzieci w szkole",
          "Bo prefekt wymaga raportów liczbowych co tydzień",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Narrator pisze: "Nie gratuluje się nauczycielowi, jeśli uczy, że dwa i dwa to cztery". Sens: walka z dżumą to nie heroizm, lecz prosta uczciwość — stwierdzanie faktów, robienie tego, co oczywiste. Ludzie z formacji sanitarnych "wiedzieli, że była to jedyna rzecz do zrobienia: nie wejść do nich to dopiero byłoby niewiarygodne".',
      },
    },

    // ===== 80 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        "Co Tarrou notuje o zachowaniu mieszkańców Oranu w szczycie epidemii?",
      content: {
        options: [
          "Że ludzie stali się bardziej pobożni i spędzają czas w kościołach",
          "Że ludzie piją dużo, trafią się im w jedzeniu i rozrywkach, żyją na pełnych obrotach — jakby próbowali przeżywać intensywnie każdy dzień, bo może być ostatni",
          "Że ludzie z całkowitym spokojem akceptują swój los",
          "Że ludzie organizują strajki i demonstracje przeciwko prefekturze",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tarrou opisuje gorączkę życia: "Alkohol zdrowiu sprzyja, zabija bakcyla" — głosi wywieszkę w kawiarni. Ludzie trwonią pieniądze, jedzą w drogich restauracjach, piją bez umiaru. Wieczorami tłum wypełnia ulice w poszukiwaniu ciepła ludzkiego. To reakcja na bliskość śmierci — intensywność życia jako bunt wobec zagłady.',
      },
    },

    // ===== 81 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question: "Jaką ewolucję przechodzi Rambert w ciągu powieści?",
      content: {
        options: [
          "Zaczyna jako bohater i kończy jako tchórz",
          "Zaczyna jako indywidualista walczący o prywatne szczęście, a kończy jako członek wspólnoty — rezygnuje z ucieczki i dołącza do formacji sanitarnych",
          "Zaczyna jako ateista i kończy jako wierzący pod wpływem Paneloux",
          "Nie przechodzi żadnej ewolucji — od początku walczy z dżumą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Rambert przechodzi od indywidualizmu do solidarności. Na początku mówi: "Nie jestem stąd" i walczy o prywatne szczęście (powrót do żony). Ale po wizycie w szpitalu i rozmowach z Rieux i Tarrou zrozumiał: "Może być wstyd, że człowiek jest sam tylko szczęśliwy". Jego ewolucja ilustruje tezę Camusa, że dżuma jest "sprawą nas wszystkich".',
      },
    },

    // ===== 82 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question:
        "Dlaczego Rieux odmawia wydania Rambertowi zaświadczenia o zdrowiu?",
      content: {},
      correctAnswer:
        "Rieux tłumaczy, że nie może zaświadczyć, iż Rambert nie ma dżumy, ponieważ między wizytą w gabinecie a wizytą w prefekturze dziennikarz może zostać zarażony. Poza tym nawet gdyby wydał zaświadczenie, nie przydałoby się ono na nic — w mieście tysiące ludzi jest w tym samym położeniu, a mimo to nie można im pozwolić wyjechać. Rieux nie odmawia ze złośliwości, lecz z uczciwości: nie chce dawać fałszywych gwarancji.",
      metadata: {
        explanation:
          'Scena ta ustanawia postawę Rieux wobec Ramberta: szacunek, ale odmowa robienia wyjątków. Rieux mówi: "Tu chodzi o dobrą wolę" — ale system (dżuma) nie uznaje dobrych woli. To zapowiada temat abstrakcji.',
      },
    },

    // ===== 83 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question:
        "Kim jest Gonzales i jaką rolę pełni w wątku ucieczki Ramberta?",
      content: {},
      correctAnswer:
        "Gonzales to gracz w piłkę nożną (środkowy napastnik), z którym Rambert umawia się przez pośredników (Garcię i Raoula). Gonzales zna dwóch młodych strażników — Marcela i Louisa — którzy mogą otworzyć drogę przez bramy. Kontakty z Gonzalesem są wielokrotnie przerywane, bo zamykane są całe dzielnice. Gonzales kopie kamyki na ulicy, celując w otwory ścieków, i mówi o piłce nożnej — to jedyny temat, który naprawdę go ożywia.",
      metadata: {
        explanation:
          "Gonzales jest postacią epizodyczną, ale ważną fabularnie — to ostatnie ogniwo łańcucha kontaktów prowadzących do ucieczki. Jego pasja do piłki nożnej humanizuje światy przemytu i kontrabandy.",
      },
    },

    // ===== 84 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Opisz krótko rodzinę pana Othona według notatek Tarrou.",
      content: {
        hints: ["sowa", "czarna mysz", "tresowane psy"],
      },
      correctAnswer:
        'Tarrou opisuje rodzinę Othona z ironią: ojciec-sędzia to "dobrze wychowana sowa" — wysoki, chudy, w sztywnym kołnierzyku, z łysym środkiem czaszki. Żona to "czarna mysz" — drobna i cicha. Dwójka dzieci (chłopiec i dziewczynka) wygladają jak "tresowane pude" — ubrane elegancko, karnie siedzące przy stole. Othon recytuje "uprzejme złośliwości" pod adresem żony i "zdania o charakterze ostatecznym" do dzieci: "Nicole jest w najwyższym stopniu antypatyczna!"',
      metadata: {
        explanation:
          "Opis rodziny Othona to jeden z najzabawniejszych fragmentów notatek Tarrou. Służy jako kontrast: sztywny, bezduszny sędzia po śmierci syna stanie się postacią wzruszającą i ludzką.",
      },
    },

    // ===== 85 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Które formy ograniczenia wolności dotknęły mieszkańców Oranu?",
      content: {
        options: [
          "Zakaz opuszczania miasta — zamknięte bramy strzeżone przez żandarmów",
          "Ograniczenie korespondencji — listy zabronione, tylko telegramy",
          "Całkowity zakaz wychodzenia z domów przez cały dzień",
          "Zaciemnienie i godzina policyjna od jedenastej wieczór",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Bramy zamknięto, korespondencję ograniczono do telegramów, wprowadzono zaciemnienie i godzinę policyjną. Nie było całkowitego zakazu wychodzenia — ludzie mogli chodzić po mieście w ciągu dnia, chodzili do kawiarni, kin i restauracji. Ograniczano natomiast poruszanie się nocą.",
      },
    },

    // ===== 86 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Tarrou prowadzi (1), w którym opisuje życie miasta. Stary astmatyk mierzy czas za pomocą (2). Grand pracuje nad jednym (3) przez całą powieść.",
        gaps: [
          {
            id: 1,
            options: [
              "oficjalną kronikę dla prefektury",
              "prywatny notatnik",
              "dziennik religijny",
              "pamiętnik dla syna",
            ],
          },
          {
            id: 2,
            options: [
              "zegara słonecznego",
              "dwóch garnków z grochem",
              "klepsydry",
              "kalendarza",
            ],
          },
          {
            id: 3,
            options: [
              "raportem statystycznym",
              "listem do żony",
              "zdaniem o amazonce jadącej alejami Lasku Bulońskiego",
              "przemówieniem dla prefekta",
            ],
          },
        ],
      },
      correctAnswer: [1, 1, 2],
      metadata: {
        explanation:
          'Tarrou prowadzi prywatny notatnik (kronikę pisze Rieux). Stary astmatyk odmierza czas przesypując groch z garnka do garnka. Grand szlifuje zdanie: "W piękny poranek majowy smukła amazonka, siedząc na wspanialej kasztance, jechała kwitnącymi alejami Lasku Bulońskiego".',
      },
    },

    // ===== 87 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Które z poniższych scen występują w powieści?",
      content: {
        options: [
          'Spektakl operowy "Orfeusza i Eurydyki", podczas którego śpiewak pada na scenę',
          "Nocna kąpiel Rieux i Tarrou w morzu",
          "Bunt więźniów i ich ucieczka z obozu internowania",
          "Grand mdleje na ulicy w Wigilię i ledwo przetrwa dżumę",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Opera (śpiewak pada, publiczność ucieka), kąpiel w morzu (Rieux i Tarrou po nocnej rozmowie) oraz choroba Granda (mdleje pod Boże Narodzenie, cudownie wraca do zdrowia) — to sceny z powieści. Bunt więźniów nie występuje — są rozruchy przy bramach miasta, ale nie ucieczka więźniów.",
      },
    },

    // ===== 88 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Kto pomagał Rambertowi w organizacji ucieczki z Oranu?",
      content: {
        options: [
          "Doktor Rieux i prefekt",
          "Cottard, który znał sieć przemytników — oraz Garcia, Raoul, Gonzales, Marcel i Louis",
          "Tarrou i oddziały sanitarne",
          "Ojciec Paneloux i parafie kościelne",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Rambert próbował ucieczki kanałami nielegalnymi. Cottard skontaktował go z Garcią, ten z Raoulem, a Raoul z dwoma młodymi strażnikami — Marcelem i Louisem. Plan wielokrotnie się komplikował: spotkania nie dochodziły do skutku, dzielnice były zamykane, strażników zmieniano. Ostatecznie Rambert zrezygnował z ucieczki.",
      },
    },

    // ===== 89 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Jak zmienił się sędzia Othon po śmierci syna?",
      content: {
        options: [
          "Opuścił Oran i wrócił do Francji",
          "Po zakończeniu kwarantanny poprosił o powrót do obozu jako ochotnik — chciał być bliżej syna",
          "Zaczął głosić kazania religijne w zastępstwie Paneloux",
          "Nie zmienił się wcale — pozostał sztywny i oficjalny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Othon, dotychczas sztywny i oficjalny sędzia-"sowa", po śmierci synka całkowicie się zmienia. Po zakończeniu kwarantanny prosi o powrót do obozu internowanych jako ochotnik: "Czułbym się bliżej mego chłopca". Rieux dostrzega w jego oczach nową łagodność. Ostatecznie Othon także umiera na dżumę.',
      },
    },

    // ===== 90 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question:
        "Co doktor Richard, sekretarz syndykatu lekarzy, sądził o epidemii?",
      content: {
        options: [
          "Od początku twierdził, że to dżuma, i żądał natychmiastowych środków",
          'Wahał się, uważał, że nie należy panikować, unikał słowa "dżuma" i proponował ostrożne formy: "gorączka z komplikacjami pachwinowymi"',
          "Natychmiast opuścił Oran, zostawiając pacjentów",
          "Twierdził, że to zatrucie pokarmowe, nie choroba zakaźna",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Richard reprezentuje postawę biurokratycznej ostrożności — odmawia nazwania choroby po imieniu, bo oficjalne orzeczenie "zmuszałoby do zastosowania bezlitosnych środków". Rieux ripostuje: "Nie chodzi o to, by malować w czarnych kolorach. Chodzi o to, by przedsięwziąć środki ostrożności."',
      },
    },

    // ===== 91 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question:
        "Co robi mały staruszek obserwowany przez Tarrou z balkonu hotelu?",
      content: {
        options: [
          "Karmi gołębie na placu miejskim",
          "Wychodzi na balkon, woła koty, drze papier i pluje na nie z siłą i precyzją",
          "Gra na akordeonie dla przechodniów",
          "Liczy przejeżdżające tramwaje i notuje wyniki",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mały staruszek to jedna z ulubionych postaci Tarrou. Codziennie o tej samej porze wychodzi na balkon, wabi koty, drze papier na kawałki, a gdy koty się zbliżają — pluje na nie z dużą precyzją i śmieje się, gdy trafi. Gdy dżuma zabiera koty (zastrzelone przez patrole), staruszek popada w smutek.",
      },
    },

    // ===== 92 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Kto uratował Cottarda po próbie samobójczej?",
      content: {
        options: [
          "Doktor Rieux",
          "Joseph Grand — sąsiad, który usłyszał hałas i odciął go od sznura",
          "Jean Tarrou",
          "Ojciec Paneloux",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Grand wychodził z domu, usłyszał hałas i zobaczył napis na drzwiach. Odciął Cottarda w porę i wezwał doktora Rieux. Od tego momentu Grand czuje się odpowiedzialny za Cottarda i czuwa nad nim.",
      },
    },

    // ===== 93 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question:
        "Jak Camus opisuje Oran na początku powieści? Wymień trzy cechy miasta.",
      content: {
        hints: ["brzydkie", "bez drzew", "handel"],
      },
      correctAnswer:
        "Oran jest opisany jako miasto brzydkie, bez gołębi, bez drzew i ogrodów, pozbawione malowniczości i duszy. Jego mieszkańcy zajmują się przede wszystkim handlem i robieniem interesów. Życie toczy się według stałych przyzwyczajeń — praca, kawiarnie, kino, kąpiele morskie w weekendy. Miasto jest zbudowane tyłem do zatoki, więc nie widać morza.",
      metadata: {
        explanation:
          "Opis Oranu na początku pełni ważną funkcję: pokazuje banalność, która zostanie rozbita przez dżumę. Brak drzew, piękna i głębi duchowej symbolizuje społeczeństwo żyjące bez refleksji — aż do momentu, gdy epidemia zmusi je do zastanowienia.",
      },
    },

    // ===== 94 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'Które zdania poprawnie opisują narrację w "Dżumie"?',
      content: {
        options: [
          "Narrator mówi o sobie w trzeciej osobie przez całą powieść",
          "Na końcu okazuje się, że narratorem jest doktor Rieux",
          "Narracja jest prowadzona przez Tarrou od początku do końca",
          "Narrator korzysta z notatek Tarrou, zeznań i dokumentów",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Rieux prowadzi narrację w trzeciej osobie dla zachowania obiektywności. Ujawnia się dopiero w części V. Korzysta ze źródeł: własne doświadczenie, notatki Tarrou, zeznania świadków, dokumenty urzędowe. Tarrou NIE jest narratorem — prowadzi tylko swoje prywatne notatki.",
      },
    },

    // ===== 95 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: "Które skutki epidemii dotknęły mieszkańców Oranu?",
      content: {
        options: [
          "Zamknięcie bram miasta i zakaz opuszczania go",
          "Ograniczenie korespondencji do dziesięciosłowowych telegramów",
          "Całkowite zniszczenie miasta przez pożar",
          "Racjonowanie żywności i wzrost cen na czarnym rynku",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Oran został zamknięty, korespondencję ograniczono, ceny żywności rosły, rozwijał się czarny rynek. Miasto NIE zostało zniszczone pożarem — pojedyncze pożary wybuchały w domach osób wracających z kwarantanny, ale nie zniszczyły miasta.",
      },
    },

    // ===== 96 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question:
        'Które z poniższych postaci są bohaterami drugoplanowymi "Dżumy"?',
      content: {
        options: [
          "Stary astmatyk — pacjent Rieux, który liczy czas grochem",
          "Pan Othon — sędzia śledczy z rodziną",
          "Doktor Castel — stary lekarz, który przygotowuje surowicę",
          "Meursault — urzędnik zabijający Araba na plaży",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'Stary astmatyk, sędzia Othon i doktor Castel to postacie z "Dżumy". Meursault to bohater innej powieści Camusa — "Obcego" (1942).',
      },
    },

    // ===== 97 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: "Ile słów mógł liczyć telegram wysyłany z zamkniętego Oranu?",
      content: {
        options: ["Pięć", "Dziesięć", "Dwadzieścia", "Nie było ograniczeń"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Telegramy z Oranu mogły liczyć tylko dziesięć słów. Formuły takie jak "Mam się dobrze. Myślę o tobie. Serdeczności" zastępowały całą komunikację między rozłączonymi. Listy były zabronione, telefony międzynarodowe przerwane.',
      },
    },

    // ===== 98 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question:
        "Co stało się z Cottardem na początku powieści, przed wybuchem epidemii?",
      content: {
        options: [
          "Wyjechał z Oranu do Paryża",
          "Próbował popełnić samobójstwo przez powieszenie",
          "Zachorował na dżumę jako pierwszy",
          "Został aresztowany za przemyt",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Cottard próbował się powiesić w swoim mieszkaniu. Uratował go sąsiad Grand, który odciął go w porę. Na drzwiach wisiała kartka: "Wejdźcie, powiesiłem się". Prawdopodobnie powodem były obawy przed aresztowaniem za jakąś dawną sprawę.',
      },
    },

    // ===== 99 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: "Co robi prefekt po oficjalnym stwierdzeniu epidemii?",
      content: {
        options: [
          "Ewakuuje ludność drogami morskimi",
          "Nakazuje zamknięcie bram miasta i izolację Oranu od świata",
          "Prosi o pomoc militarną z Paryża",
          "Rozkazuje spalić zarażone dzielnice",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Prefekt, po otrzymaniu depeszy z Urzędu Generalnego Gubernatora: "Ogłoście stan dżumy. Zamknijcie miasto", nakazuje zamknięcie bram. Od tej chwili Oran jest odcięte od świata — nie kursują pociągi, statki omijają port, korespondencję ograniczono do dziesięciosłowowych telegramów.',
      },
    },

    // ===== 100 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: "Kim jest Jean Tarrou?",
      content: {
        options: [
          "Lekarzem ze szpitala miejskiego",
          "Tajemniczym przybyszem zamieszkałym w hotelu, który organizuje ochotnicze oddziały sanitarne",
          "Prefektem miasta Oran",
          "Księdzem wygłaszającym kazania o karze Bożej",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Jean Tarrou to zamożny przybysz, który zamieszkał w Oranie na kilka tygodni przed epidemią. Prowadzi notatnik, w którym opisuje życie miasta. Gdy wybucha dżuma, organizuje oddziały sanitarne i walczy u boku Rieux aż do śmierci.",
      },
    },

    // ===== 101 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question:
        "Jak nazywa się dozorca, który jest jedną z pierwszych ofiar dżumy?",
      content: { options: ["Joseph", "Michel", "Jean", "Raymond"] },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Michel to stary dozorca w kamienicy doktora Rieux. Stanowczo zaprzeczał, że w domu są szczury. Zachorował na dżumę z wysokimi gorączkami, dymienicami i majakami, i zmarł w karetce w drodze do szpitala.",
      },
    },

    // ===== 102 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'W którym roku została wydana powieść "Dżuma" Alberta Camusa?',
      content: { options: ["1942", "1947", "1957", "1951"] },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Dżuma" ukazała się w 1947 roku nakładem Éditions Gallimard w Paryżu. Polskie tłumaczenie Joanny Guze wydano w 1957 roku. Camus otrzymał Nagrodę Nobla w 1957 roku.',
      },
    },

    // ===== 103 =====
    {
      type: "ESSAY",
      category: "WRITING",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 10,
      work: "Dżuma",
      question:
        'Czy bunt wobec zła może nadać sens ludzkiemu życiu? Rozważ problem, odwołując się do „Dżumy" Alberta Camusa i jednego innego tekstu kultury.',
      content: {
        thesis: "Bunt wobec zła jako sposób na nadanie sensu egzystencji",
        structure: {
          conclusion:
            "Sformułuj wniosek: bunt u Camusa to nie nadzieja na wygraną, lecz odmowa zgody na zło — i w tej odmowie tkwi godność człowieka",
          introduction:
            "Przedstaw problem: absurd istnienia, brak wyższego sensu cierpienia, potrzeba buntu",
          arguments_for:
            'Rieux i Tarrou jako modele buntu — walczą wiedząc, że zwycięstwo jest tymczasowe; Syzyf „szczęśliwy" mimo bezsensu',
          arguments_against:
            "Paneloux — wiara jako alternatywa buntu; Cottard — rezygnacja z buntu; czy bunt nie jest kolejnym złudzeniem?",
        },
        wordLimit: { max: 600, min: 400 },
        requirements: [
          'Odwołaj się do filozofii absurdu (Camus, „Mit Syzyfa")',
          "Przeanalizuj postawy Rieux i Tarrou jako formy buntu",
          'Porównaj z innym tekstem kultury (np. „Antygona" — bunt wobec prawa, „Dziady" III — bunt prometejski, „Inny świat" — bunt wobec systemu)',
          "Sformułuj własne stanowisko wobec tezy",
          "Minimum 400 słów",
        ],
      },
      correctAnswer:
        'Rozprawka powinna: przedstawić filozofię absurdu (świat bez sensu, cierpienie bez przyczyny) i bunt jako odpowiedź (nie nadzieja, lecz odmowa rezygnacji). Rieux: buntuje się lecząc, choć wie, że „zwycięstwa zawsze będą tymczasowe". Tarrou: buntuje się odmawiając zgody na zabijanie, pragnie „niewinności". Porównanie: Antygona — buntuje się przeciw prawu Kreona w imię prawa boskiego (bunt moralny vs. bunt egzystencjalny); Konrad z Dziadów — bunt prometejski wobec Boga (u Camusa Boga nie ma — bunt jest wobec absurdu, nie wobec Stwórcy). Stanowisko: bunt u Camusa nie obiecuje zwycięstwa, ale nadaje sens działaniu — „bakcyl dżumy nigdy nie umiera", więc walka nigdy się nie kończy. To pesymizm metafizyczny, ale optymizm etyczny.',
      metadata: {
        explanation:
          'Bunt wobec zła to centralny temat egzystencjalizmu i jeden z najczęstszych tematów maturalnych. „Dżuma" jest wzorcowym tekstem do tego zagadnienia — łączy filozofię (absurd, bunt) z konkretnymi postawami bohaterów.',
      },
    },

    // ===== 104 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 5,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          '„Dżuma" jako powieść o kondycji ludzkiej — jak Camus diagnozuje człowieczeństwo w sytuacji granicznej?',
        wordLimit: { max: 250, min: 200 },
        requirements: [
          "Wyjaśnij, czym jest „sytuacja graniczna” w filozofii egzystencjalnej i jak realizuje się w powieści",
          "Wskaż, jakie postawy ujawnia dżuma: od solidarności po oportunizm",
          'Odwołaj się do końcowego przesłania: „w ludziach więcej rzeczy zasługuje na podziw niż na pogardę"',
          'Porównaj z jednym innym tekstem o sytuacji granicznej (np. „Inny świat", „Lord Jim")',
          "200-250 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: Sytuacja graniczna (Jaspers) = moment, w którym człowiek staje wobec śmierci, cierpienia, walki — i musi się określić. W „Dżumie" granica = zamknięte miasto, epidemia, groźba śmierci. Postawy: solidarność (Rieux, Tarrou, Grand — formacje sanitarne), bunt (Tarrou — „nie zgadzam się na zabijanie"), ewolucja (Rambert — od egoizmu do wspólnoty, Paneloux — od pewności do pokory), oportunizm (Cottard — korzysta na chaosie). Przesłanie: Camus nie idealizuje — pokazuje słabości (Rambert chce uciec, ludzie piją, kradną), ale bilans jest pozytywny: „więcej rzeczy zasługuje na podziw". Porównanie: „Inny świat" — łagier odsłania te same postawy, ale Herling jest surowszy: system sowiecki niszczy solidarność skuteczniej niż dżuma. „Lord Jim" — jedna chwila tchórzostwa definiuje całe życie; u Camusa nie ma jednorazowego testu — jest codzienna praca. Wniosek: Camus proponuje humanizm bez iluzji — człowiek nie jest z natury dobry ani zły, jest zdolny do obu, a sytuacja graniczna wymusza wybór.',
      metadata: {
        explanation:
          'Pytanie o kondycję ludzką to jeden z najważniejszych tematów maturalnych. „Dżuma" jest do niego idealnym tekstem — Camus celowo projektuje powieść jako laboratorium postaw.',
      },
    },

    // ===== 105 =====
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 4,
      work: "Dżuma",
      question:
        "Wyjaśnij, dlaczego Rieux ujawnia się jako narrator dopiero na końcu powieści. Jaką funkcję pełni ten zabieg narracyjny?",
      content: {},
      correctAnswer:
        'Rieux prowadzi narrację w trzeciej osobie przez całą powieść, by zachować „ton obiektywnego świadka". Ujawnia się dopiero w ostatniej części: „Czas więc, żeby doktor Bernard Rieux wyznał, że jest jej autorem". Funkcje zabiegu: 1) Obiektywizm — Rieux chce „świadczyć na korzyść zadżumionych", nie na własną korzyść; mówienie o sobie w trzeciej osobie eliminuje subiektywizm. 2) Wiarygodność kroniki — narrator-lekarz ma dokumenty, świadectwa, doświadczenie. 3) Pokora — nie czyni z siebie bohatera; przez cały utwór mówi „doktor", nie „ja". 4) Efekt zaskoczenia — ujawnienie dodaje emocjonalny wymiar: czytelnik retrospektywnie rozumie, ile kosztowała ta „obiektywność" człowieka, który stracił żonę i przyjaciela.',
      metadata: {
        explanation:
          "Pytanie o narrację to typowe pytanie LANGUAGE_USE na maturze rozszerzonej. Kluczowe: opóźnione ujawnienie narratora to zabieg przemyślany — Camus buduje efekt dokumentalności i pokory.",
      },
    },

    // ===== 106 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 4,
      work: "Dżuma",
      question:
        'Porównaj „Dżumę" Camusa z „Innym światem" Herlinga-Grudzińskiego. Co łączy obie powieści w ujęciu problemu zła i reakcji człowieka na nie?',
      content: {
        instruction:
          "Uwzględnij sytuację graniczną, postawy bohaterów, problem solidarności i samotności oraz przesłanie.",
      },
      correctAnswer:
        'Oba utwory: 1) Ukazują człowieka w sytuacji granicznej — zamknięte miasto (Camus) i łagier (Herling) jako laboratoria ludzkiej natury. 2) Testują moralność: czy człowiek zachowa godność, gdy system (dżuma/Gułag) dąży do jego zniszczenia? 3) Pokazują spektrum postaw — od heroizmu (Rieux/Tarrou — Kostyłew) po oportunizm (Cottard — donosiciele). 4) Akcentują solidarność i samotność jednocześnie: bohaterowie walczą razem, ale cierpią samotnie. Różnice: u Camusa zło jest abstrakcyjne (bakcyl, absurd), u Herlinga — ma twarz systemu sowieckiego. Camus mówi: „w ludziach więcej rzeczy zasługuje na podziw niż na pogardę". Herling jest mniej optymistyczny — łagier odsłania ciemne strony natury ludzkiej brutalniej.',
      metadata: {
        explanation:
          'Porównanie „Dżumy" z „Innym światem" to klasyczne zestawienie maturalne: obie powieści z epoki CONTEMPORARY, obie o sytuacji granicznej, obie o etyce w obliczu absurdu.',
      },
    },

    // ===== 107 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 3,
      work: "Dżuma",
      question:
        'Które aspekty „Dżumy" świadczą o jej związku z egzystencjalizmem?',
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
          'Egzystencjalizm w „Dżumie": absurd (dżuma bez przyczyny, cierpienie bez sensu), wolność (każdy bohater dokonuje wyboru — Rambert, Paneloux, Cottard), bunt (Rieux/Tarrou walczą bez nadziei na ostateczne zwycięstwo). Wizja NIE jest deterministyczna — bohaterowie MAJĄ wpływ na swoje postawy, co jest fundamentem egzystencjalizmu: „człowiek jest tym, co z siebie uczyni".',
      },
    },

    // ===== 108 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 3,
      work: "Dżuma",
      question:
        'Dlaczego Tarrou pragnie „świętości bez Boga" i dlaczego tej świętości nie osiąga?',
      content: {
        options: [
          "Bo Tarrou jest zbyt leniwy, by konsekwentnie walczyć ze złem",
          'Bo jest ateistą i nie akceptuje kary śmierci w żadnej formie — chce być „niewinnym mordercą", żyć „po stronie ofiar"; nie osiąga świętości, bo umiera na dżumę tuż przed końcem epidemii — jego bunt prometejski kończy się klęską fizyczną, choć moralnym zwycięstwem',
          "Bo Paneloux odmawia udzielenia mu rozgrzeszenia",
          "Bo Tarrou jest w istocie nihilistą i nie wierzy w żadne wartości",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tarrou jest postacią tragiczną: syn prokuratora, który zobaczył „brudne usta" wymiaru sprawiedliwości, odtąd odmawia zgody na jakąkolwiek formę zabijania. Pragnie „świętości bez Boga" — czystej etyki bez transcendencji. Nie osiąga świętości, bo dżuma zabiera go tuż przed wyzwoleniem. Rieux mówi: „Tarrou przegrał partię" — ale jego bunt nadał sens życiu.',
      },
    },

    // ===== 109 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 5,
      points: 3,
      work: "Dżuma",
      question:
        'Jak „Dżuma" realizuje filozofię absurdu Camusa z eseju „Mit Syzyfa"?',
      content: {
        options: [
          "Bohaterowie rezygnują z walki i godzą się z absurdem istnienia",
          'Rieux jest współczesnym Syzyfem: wie, że walka z dżumą (śmiercią) jest skazana na porażkę, ale nadaje jej sens poprzez sam akt buntu — „nie kończącą się klęskę" przyjmuje z godnością i kontynuuje pracę',
          "Powieść odrzuca filozofię absurdu i proponuje wiarę religijną jako rozwiązanie",
          "Absurd polega na tym, że epidemia jest losowa — Camus krytykuje medycynę za bezradność",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'W „Micie Syzyfa" Camus pisze, że „trzeba wyobrażać sobie Syzyfa szczęśliwego" — sens tkwi w samym buntowniczym działaniu, nie w jego wyniku. Rieux jest Syzyfem: leczy, choć wie, że większość chorych umrze. Jego zwycięstwa „zawsze będą tymczasowe", ale to nie powód, by zaprzestać walki.',
      },
    },

    // ===== 110 =====
    {
      type: "ESSAY",
      category: "WRITING",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 5,
      work: "Dżuma",
      question:
        'Czy uczciwość wystarczy, by walczyć ze złem? Rozważ problem, odwołując się do „Dżumy" Alberta Camusa i jednego innego tekstu kultury.',
      content: {
        wordLimit: { min: 300 },
        requirements: [
          "Wyjaśnij, jak Rieux rozumie uczciwość w kontekście walki z epidemią",
          "Przeanalizuj postawy innych bohaterów — Tarrou, Granda, Ramberta — jako warianty uczciwości",
          'Porównaj z innym tekstem kultury (np. „Inny świat" — postawa Herlinga wobec zła w łagrze, „Lord Jim" — poczucie obowiązku)',
          "Sformułuj wniosek: czy codzienna przyzwoitość to odpowiedź na wielkie zło?",
          "Minimum 300 słów",
        ],
      },
      correctAnswer:
        'Rozprawka powinna: zdefiniować uczciwość u Camusa (wykonywanie zawodu, brak zgody na zło, brak heroicznej retoryki), pokazać warianty: Tarrou (bunt + pragnienie świętości), Grand (skromna praca), Rambert (ewolucja od egoizmu do solidarności). Porównanie: „Inny świat" — w łagrze uczciwość to odmowa kolaboracji z systemem; Herling podobnie jak Camus stawia na indywidualną moralność w obliczu absurdu. Wniosek: uczciwość NIE gwarantuje zwycięstwa nad złem, ale jest jedyną postawą zachowującą godność — „w ludziach więcej rzeczy zasługuje na podziw niż na pogardę".',
      metadata: {
        explanation:
          "Problem uczciwości wobec zła to centralny temat maturalny. Kluczowe: Camus nie obiecuje, że uczciwość wygra — mówi, że jest jedynym godnym wyborem.",
      },
    },

    // ===== 111 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 4,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Rozłąka jako centralne doświadczenie bohaterów „Dżumy" — formy, skutki i sens',
        wordLimit: { max: 200, min: 150 },
        requirements: [
          "Wskaż co najmniej trzy przykłady rozłąki w powieści",
          "Opisz psychologiczne skutki rozłąki, jakie obserwuje narrator",
          'Wyjaśnij, dlaczego narrator nazywa rozłąkę „wygnaniem we własnym domu"',
          "150-200 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: Przykłady rozłąki: 1) Rieux — żona w sanatorium, umiera bez niego. 2) Rambert — partnerka w Paryżu, nie może wyjechać. 3) Castel — żona w sąsiednim mieście, wraca mimo ryzyka. 4) Wszyscy mieszkańcy Oranu — odcięci od świata, kontakt tylko przez 10-słowowe depesze. Skutki: utrata pamięci o bliskich (twarze stają się „bezcielesne"), rezygnacja z przyszłości, monotonia cierpienia, stępienie emocji — „przyzwyczajenie się do rozpaczy gorsze niż sama rozpacz". „Wygnanie we własnym domu" — bo ludzie są we własnym mieście, ale odcięci od tego, co stanowiło ich życie (bliscy, przyzwyczajenia, wolność).',
      metadata: {
        explanation:
          "Motyw rozłąki to jeden z najczęstszych tematów maturalnych. Camus poświęca mu obszerne fragmenty w części II i III, analizując psychologię ludzi oddzielonych od bliskich.",
      },
    },

    // ===== 112 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 4,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Spór Rieux z Paneloux — dwa sposoby reagowania na cierpienie niewinnych",
        wordLimit: { max: 200, min: 150 },
        requirements: [
          "Wyjaśnij stanowisko Rieux (bunt, odmowa akceptacji cierpienia)",
          "Wyjaśnij stanowisko Paneloux (wiara totalna, przyjęcie tajemnicy)",
          "Odwołaj się do sceny śmierci dziecka jako punktu zwrotnego",
          "Oceń, która postawa jest bliższa przesłaniu Camusa",
          "150-200 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: Rieux — odmawia akceptacji świata, „gdzie dzieci są torturowane". Jego postawa to bunt bez metafizyki: leczy, bo tak trzeba, nie szuka wyjaśnień, nie wierzy w wyższy sens cierpienia. Paneloux — po śmierci dziecka porzuca łatwe odpowiedzi (kara Boża), ale zamiast buntu wybiera wiarę totalną: „trzeba we wszystko uwierzyć albo wszystkiemu zaprzeczyć". Punkt zwrotny: agonia syna Othona — Paneloux klęka i modli się, Rieux mówi: „ten przynajmniej był niewinny". Bliższa Camusowi postawa Rieux — bunt i działanie, nie wiara. Ale Camus nie deprecjonuje Paneloux: daje mu godność i pokorną śmierć.',
      metadata: {
        explanation:
          "Spór Rieux–Paneloux to centralna oś filozoficzna powieści: egzystencjalizm vs. wiara. Na maturze pojawia się jako pytanie o teodycję, postawy wobec cierpienia i sens nadziei.",
      },
    },

    // ===== 113 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 3,
      work: "Dżuma",
      question:
        'Wyjaśnij sens ostatniego zdania powieści o „bakcylu dżumy, który nigdy nie umiera". Jakie ma przesłanie?',
      content: {},
      correctAnswer:
        'Rieux pisze, że „bakcyl dżumy nigdy nie umiera i nie znika, że może przez dziesiątki lat pozostać uśpiony w meblach i bieliźnie (...) i że nadejdzie być może dzień, kiedy na nieszczęście ludzi oraz dla ich nauki dżuma obudzi swe szczury i pośle je, by umierały w szczęśliwym mieście". Przesłanie: zło nigdy nie znika na zawsze — może powrócić w każdej chwili pod nową postacią (wojna, totalitaryzm, nienawiść). Radość z wyzwolenia „jest zawsze zagrożona". To ostrzeżenie przed łatwym optymizmem i wezwanie do wiecznej czujności moralnej.',
      metadata: {
        explanation:
          "To zdanie zamykające powieść jest jednym z najczęściej cytowanych fragmentów Camusa. Na maturze kluczowe: nie jest to pesymizm, lecz realizm moralny — Camus nie zapowiada nieuchronnej klęski, ale mówi, że czujność i gotowość do walki muszą być stałe.",
      },
    },

    // ===== 114 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 3,
      work: "Dżuma",
      question:
        "Jaką rolę pełni scena nocnej kąpieli Rieux i Tarrou w morzu? Dlaczego jest ważna kompozycyjnie?",
      content: {
        instruction:
          "Odwołaj się do kontekstu (kiedy następuje), symboliki i relacji między bohaterami.",
      },
      correctAnswer:
        'Scena kąpieli następuje po zwierzeniach Tarrou o swoim życiu — jest momentem kulminacji ich przyjaźni. Rieux i Tarrou wymykają się z miasta na molo i pływają razem w morzu: „Przez kilka minut płynęli jednako, z tą samą mocą, samotni, daleko od świata, wolni nareszcie od miasta i dżumy". To jedyna scena w powieści, gdzie bohaterowie doświadczają wolności i szczęścia. Symbolika: morze = wolność, natura, życie poza dżumą. Kompozycyjnie: scena jest „pauzą" przed finałem — wkrótce Tarrou zachoruje i umrze. Jest pożegnaniem, choć bohaterowie jeszcze o tym nie wiedzą.',
      metadata: {
        explanation:
          "Scena kąpieli jest jednym z najczęściej analizowanych fragmentów powieści. Na maturze pojawia się w kontekstach: przyjaźń w sytuacji ekstremalnej, motyw morza, chwila wolności wobec zniewolenia.",
      },
    },

    // ===== 115 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question:
        "Które porównania międzytekstowe z innymi dziełami są uzasadnione?",
      content: {
        options: [
          '„Dżuma" i „Inny świat" Herlinga-Grudzińskiego — obie ukazują ludzi w sytuacji ekstremalnej, testując ich moralność',
          '„Dżuma" i „Mit Syzyfa" Camusa — Rieux jak Syzyf: działa wiedząc, że walka może być daremna',
          '„Dżuma" i „Pan Tadeusz" — obie są epopejami narodowymi',
          '„Dżuma" i „Proces" Kafki — absurd systemu, który przenika życie jednostki bez wyjaśnienia',
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '„Inny świat" — obie powieści testują moralność w ekstremalnych warunkach. „Mit Syzyfa" — Rieux to Syzyf walczący z absurdem. „Proces" Kafki — absurdalny system pochłania jednostkę. „Pan Tadeusz" to epopeja szlachecka — nie ma żadnego związku z „Dżumą".',
      },
    },

    // ===== 116 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question:
        'Które elementy „Dżumy" świadczą o jej parabolicznym (alegorycznym) charakterze?',
      content: {
        options: [
          'Celowo zatarta data — „194." bez ostatniej cyfry',
          'Motto z Defoe sygnalizujące, że „jeden rodzaj uwięzienia ukazuje inny"',
          "Szczegółowe opisy architektoniczne Oranu z podaniem nazw ulic i numerów domów",
          "Uniwersalne postawy bohaterów — nie indywidualne psychologie, lecz modele reakcji na zło",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Cechy paraboli: zatarta data (uniwersalność), motto Defoe (klucz alegoryczny), bohaterowie jako modele postaw (nie głębokie psychologie). Opisy Oranu istnieją, ale nie są „szczegółowe" — Camus celowo kreuje miasto jako przestrzeń uniwersalną.',
      },
    },

    // ===== 117 =====
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question: 'Jaką rolę pełni w powieści motyw „abstrakcji"?',
      content: {
        options: [
          '„Abstrakcja" oznacza naukę i teorię medyczną — Rieux woli praktykę',
          'Rieux nazywa „abstrakcją" dżumę jako system: statystyki, procedury, izolację — to, co odczłowiecza cierpienie, ale z czym trzeba walczyć, używając tych samych narzędzi',
          '„Abstrakcja" to metafora malarstwa abstrakcyjnego, które jest modne w Oranie',
          "To określenie filozofii Paneloux, z którą Rieux polemizuje",
        ],
        sourceText: {
          text: "Kiedy abstrakcja zaczyna nas zabijać, trzeba się zająć abstrakcją.",
          title: "Dżuma",
          author: "Albert Camus",
        },
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Dla Rieux „abstrakcja" to dżuma jako system: formularze, karetki, statystyki, izolacja, pogrzeby — cały aparat, który sprowadza cierpienie do liczb. Rambert zarzuca Rieux „mówienie językiem abstrakcji". Ale Rieux wie, że „kiedy abstrakcja zaczyna zabijać, trzeba się zająć abstrakcją" — walczyć z systemem przy użyciu systemu.',
      },
    },

    // ===== 118 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question:
        "Jak Camus buduje postać Tarrou jako bohatera egzystencjalnego? Jakie doświadczenie go ukształtowało?",
      content: {
        options: [
          "Tarrou był żołnierzem i widział śmierć na polu bitwy",
          'Jako nastolatek widział, jak ojciec — zastępca prokuratora — żąda kary śmierci dla oskarżonego; odtąd walczy z wszelką formą „zadżumienia" — zgodą na zabijanie',
          "Tarrou stracił rodziców podczas epidemii w Chinach",
          "Tarrou był księdzem, który utracił wiarę po śmierci parafianina",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tarrou opowiada Rieux o przełomowym doświadczeniu: jako siedemnastolatek widział ojca w sądzie, żądającego „tej głowy". Zrozumiał, że ojciec „wstawał wcześniej" by być obecnym przy egzekucjach. Odtąd walczy ze „skazywaniem" — każdą formą zgody na zabijanie.',
      },
    },

    // ===== 119 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 4,
      points: 2,
      work: "Dżuma",
      question: 'Co Tarrou rozumie przez zdanie „każdy nosi w sobie dżumę"?',
      content: {
        options: [
          "Że wszyscy mieszkańcy Oranu są fizycznie zarażeni bakcylem",
          'Że w każdym człowieku tkwi potencjał zła — skłonność do zabijania, zgody na zabójstwo, obojętności; i trzeba nieustannie czuwać, by „nie tchnąć dżumy w twarz drugiego człowieka"',
          "Że dżuma jest chorobą dziedziczną przenoszoną genetycznie",
          "Że każdy powinien się bać epidemii i uciekać z miasta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'To najważniejsze zdanie filozoficzne powieści. Tarrou mówi o „zadżumieniu" moralnym: mikrob dżumy to potencjał zła w człowieku — zgoda na wyroki śmierci, obojętność na cierpienie, „roztargnienie" pozwalające krzywdzić innych.',
      },
    },

    // ===== 120 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 3,
      work: "Dżuma",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Postawy bohaterów „Dżumy" wobec epidemii — od buntu po oportunizm',
        wordLimit: { max: 150, min: 100 },
        requirements: [
          "Scharakteryzuj postawę co najmniej czterech bohaterów (Rieux, Tarrou, Rambert, Cottard)",
          "Wskaż, która postawa jest według narratora właściwa i dlaczego",
          'Wyjaśnij, dlaczego narrator twierdzi, że „nie jest rzeczą konieczną być bohaterem"',
          "100-150 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: 1) Rieux — aktywna walka, uczciwość, obowiązek zawodowy; nie szuka chwały, po prostu leczy. 2) Tarrou — bunt egzystencjalny, organizacja formacji sanitarnych, pragnienie „świętości bez Boga". 3) Rambert — ewolucja od egoizmu (ucieczka) do solidarności (zostaje i walczy). 4) Cottard — oportunizm, dżuma mu sprzyja, korzysta na nieszczęściu. Narratorowi najbliższa jest postawa Granda i Rieux: zwykła uczciwość, nie bohaterstwo.',
      metadata: {
        explanation:
          'Spektrum postaw bohaterów to jedno z najczęstszych pytań maturalnych o „Dżumę". Kluczowe: Camus nie dzieli bohaterów na dobrych i złych — pokazuje różne możliwe reakcje na zło.',
      },
    },

    // ===== 121 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        'Dlaczego narrator uważa Josepha Granda za „bohatera" kroniki? Co jest w tym paradoksalne?',
      content: { hints: ["skromność", "dwa plus dwa", "dobra wola"] },
      correctAnswer:
        'Narrator proponuje Granda jako bohatera, bo „miał tylko dobre serce i pozornie śmieszny ideał". Grand nie jest spektakularny — jest skromnym urzędnikiem, który po godzinach szlifuje jedno zdanie, a jednocześnie cierpliwie prowadzi statystyki formacji sanitarnych. Paradoks polega na tym, że bohaterem zostaje człowiek najzwyklejszy: to jego szarość jest heroiczna. Camus odwraca tradycyjny wzorzec — prawdziwy bohater to ktoś, kto mówi „dwa i dwa to cztery" i robi to, co należy.',
      metadata: {
        explanation:
          'Narrator pisze: „dwa i dwa to cztery, a bohaterstwo — miejsce drugorzędne". Grand ucieleśnia etykę Camusa: wielkość w zwyczajności, dobroć bez ostentacji.',
      },
    },

    // ===== 122 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        'Co oznacza zdanie Rieux: „Jedyny sposób walki z dżumą to uczciwość"? Jak je rozumie?',
      content: {},
      correctAnswer:
        'Rieux wyjaśnia, że uczciwość „w moim przypadku polega na wykonywaniu zawodu". Nie chodzi mu o abstrakcyjną cnotę, ale o codzienną, konsekwentną pracę — leczenie chorych, diagnozowanie, izolowanie, nawet gdy nie ma nadziei na wyleczenie. Uczciwość to przeciwieństwo bohaterstwa: nie wielkie czyny, lecz wytrwałe robienie tego, co należy. To postawa Syzyfa u Camusa — świadome działanie mimo absurdu.',
      metadata: {
        explanation:
          "To jedno z najważniejszych zdań powieści. Rieux odrzuca heroizm i świętość jako kategorie — zostaje uczciwość, rozumiana jako solidna, codzienna praca.",
      },
    },

    // ===== 123-150: Remaining Dżuma questions =====
    // (kontynuacja w następnym batchu — tutaj kończy się 150. pytanie z listy)

    // ===== 123 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        "Opisz scenę w operze (Orfeusz i Eurydyka) z notatek Tarrou. Co symbolizuje?",
      content: {
        instruction:
          "Odwołaj się do tego, co dzieje się na scenie i na widowni, oraz wyjaśnij symbolikę.",
      },
      correctAnswer:
        'Podczas spektaklu „Orfeusza i Eurydyki" śpiewak grający Orfeusza dodaje do arii przesadne tremola, a w scenie utraty Eurydyki nagle pada na scenę. Orkiestra milknie. Publiczność, początkowo zdumiona, zaczyna w panice opuszczać salę — cicho, potem coraz szybciej, „jak po skończonym nabożeństwie wychodzi się z kościoła". Scena symbolizuje wtargnięcie dżumy (śmierci) w przestrzeń sztuki i pozorów — eleganckie fraki nie chronią przed zarazą. Upadek Orfeusza to upadek iluzji normalności.',
      metadata: {
        explanation:
          "Scena w operze to jedna z najbardziej sugestywnych scen powieści. Metateatralność: Orfeusz traci Eurydykę na scenie, jak Oran traci swoich obywateli.",
      },
    },

    // ===== 124 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        "Które postawy wobec dżumy (zła) reprezentują poszczególni bohaterowie?",
      content: {
        options: [
          "Rieux — aktywna walka ze złem wynikająca z obowiązku zawodowego i ludzkiej uczciwości",
          'Tarrou — bunt przeciw śmierci i pragnienie „świętości bez Boga"',
          "Cottard — bierny opór i odmowa współpracy z władzami z pobudek patriotycznych",
          "Paneloux — ewolucja od religijnego wyjaśnienia cierpienia do wiary totalnej",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Rieux = uczciwość i obowiązek. Tarrou = bunt i poszukiwanie świętości. Paneloux = ewolucja od pewności do pokory. Cottard NIE jest biernym opornikiem patriotycznym — jest oportunistą, który korzysta na epidemii.",
      },
    },

    // ===== 125 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        'Które interpretacje tytułu „Dżuma" są uzasadnione tekstem powieści?',
      content: {
        options: [
          "Dżuma jako dosłowna epidemia — choroba dziesiątkująca Oran",
          "Dżuma jako metafora II wojny światowej i okupacji",
          'Dżuma jako zło tkwiące wewnątrz każdego człowieka — „każdy nosi w sobie dżumę"',
          "Dżuma jako kara Boża za grzechy — jedyna interpretacja wspierana przez narratora",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Tytuł jest wieloznaczny: dosłowna epidemia, metafora wojny/totalitaryzmu, zło w człowieku. Interpretacja kary Bożej jest ODRZUCONA — głosi ją Paneloux w I kazaniu, ale sam wycofuje się z niej po śmierci dziecka.",
      },
    },

    // ===== 126 =====
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question: 'Dlaczego „Dżumę" nazywamy powieścią-parabolą?',
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
          'Parabola (przypowieść) to utwór, w którym warstwa dosłowna jest nośnikiem głębszego sensu. Cechy paraboli w „Dżumie": zatarta data (194.), zamknięta przestrzeń, uniwersalne postawy bohaterów, motto z Defoe sygnalizujące alegoryczność.',
      },
    },

    // ===== 127 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        "Jaką scenę Camus wykorzystuje jako punkt kulminacyjny sporu o sens cierpienia?",
      content: {
        options: [
          "Śmierć dozorcy Michela w karetce",
          'Długą agonię syna sędziego Othona — dziecko umiera mimo zastosowania nowego serum, a Rieux mówi do Paneloux: „Ten przynajmniej był niewinny"',
          "Samobójstwo Cottarda w finale powieści",
          "Śmierć Tarrou na dżumę płucną",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Scena śmierci synka Othona to najważniejszy moment konfrontacji z problemem teodycei. Po śmierci dziecka Rieux krzyczy na Paneloux: „Nigdy nie będę kochał tego świata, gdzie dzieci są torturowane". To zdanie jest kluczem do etyki Camusa.',
      },
    },

    // ===== 128 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question:
        "Co zmienia się w postawie ojca Paneloux między pierwszym a drugim kazaniem?",
      content: {
        options: [
          "W pierwszym kazaniu nawołuje do ucieczki, w drugim — do walki z epidemią",
          'W pierwszym kazaniu mówi „wy" i interpretuje dżumę jako karę Bożą; w drugim mówi „my", rezygnuje z prostych wyjaśnień i stwierdza, że trzeba uwierzyć we wszystko albo wszystkiemu zaprzeczyć',
          "W pierwszym kazaniu jest ateistą, w drugim — staje się gorliwym wierzącym",
          "Oba kazania są identyczne — Paneloux nie zmienia stanowiska",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ewolucja Paneloux to jeden z najważniejszych wątków powieści. I kazanie: pewność, oskarżenie, „wy zasłużyliście". II kazanie (po śmierci dziecka): niepewność, pokora, „my", wiara totalna.',
      },
    },

    // ===== 129 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 3,
      points: 2,
      work: "Dżuma",
      question: "Dlaczego Rambert ostatecznie rezygnuje z ucieczki z Oranu?",
      content: {
        options: [
          "Nie udaje mu się zorganizować przerzutu przez bramy",
          'Uświadamia sobie, że „może być wstyd, że człowiek jest sam tylko szczęśliwy" — po wizycie w szpitalu decyduje się zostać i walczyć z dżumą',
          "Zostaje aresztowany przez policję przy próbie ucieczki",
          "Jego żona przyjeżdża do Oranu i nie ma powodu uciekać",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Rambert, który przez tygodnie organizował ucieczkę, zmienia zdanie po zobaczeniu pracy w szpitalu. Mówi: „Może być wstyd, że człowiek jest sam tylko szczęśliwy". Zostaje i dołącza do formacji sanitarnych.',
      },
    },

    // ===== 130 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'Kto jest autorem powieści „Dżuma"?',
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
          '„Dżuma" (fr. „La Peste") to powieść Alberta Camusa wydana w 1947 roku. Polskie tłumaczenie Joanny Guze ukazało się w 1957 roku. Camus otrzymał Nagrodę Nobla w dziedzinie literatury w 1957 roku.',
      },
    },

    // ===== 131-150: Konrad Wallenrod (druga porcja) =====

    // ===== 131 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Które z poniższych ofiar składa Konrad na ołtarzu zemsty za ojczyznę?",
      content: {
        options: [
          "Miłość — rozstaje się z Aldoną i widuje ją tylko przez kratę wieży",
          "Honor rycerski — zamiast walczyć twarzą w twarz, stosuje zdradę i podstęp",
          "Tożsamość — żyje pod fałszywym imieniem, udając Niemca",
          "Własne życie — kończy samobójstwem, pijąc truciznę",
        ],
      },
      correctAnswer: [0, 1, 2, 3],
      metadata: {
        explanation:
          "Konrad poświęcił WSZYSTKO: miłość (Aldona w wieży), honor (zdrajca i spiskowiec zamiast rycerza), tożsamość (Walter Alf stał się Konradem Wallenrodem), życie (samobójstwo trucizną). To właśnie sprawia, że jest bohaterem tragicznym, a nie heroicznym — cena jest całkowita.",
      },
    },

    // ===== 132 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Jaką rolę pełni tajny trybunał, który skazuje Konrada?",
      content: {
        options: [
          "Jest sądem kościelnym (inkwizycja)",
          "Jest tajną radą 12 zamaskowanych sędziów w podziemiach Malborka, którzy karzą zbrodnie władców Zakonu — to oni odkrywają zdradę Konrada",
          "Jest radą wojenną obradującą nad strategią bitwy",
          "Jest fikcyjnym sądem wymyślonym przez Halbana, by nastraszyć Konrada",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Tajny trybunał to 12 zamaskowanych sędziów w podziemnym lochu Malborka, którzy przysięgli karać zbrodnie władców Zakonu. Odkrywają, że Konrad nie jest prawdziwym Wallenrodem, mówi po litewsku z pustelnicą i zdradza Zakon. Wydają wyrok: "biada!" — trzykrotnie powtórzony przez mury.',
      },
    },

    // ===== 133 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Co symbolizuje lampa, którą Konrad ciska z okna przed śmiercią?",
      content: {
        options: [
          "Bunt przeciwko Bogu",
          "Umówiony sygnał dla Aldony — jeśli lampa zgaśnie, Konrad już nie wróci",
          "Próbę podpalenia zamku krzyżackiego",
          "Rzucanie wyzwania sędziom tajnego trybunału",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Konrad umówił się z Aldoną: "Jeśli lampa przed wieczorem skona — zamknij twe okno, może już nie wrócę". Ciskając gasnącą lampę z okna, daje Aldonie ostatni sygnał — że umiera. Aldona odpowiada przeraźliwym krzykiem i też umiera. Lampa to symbol ich łączności — gasnący razem z życiem obojga.',
      },
    },

    // ===== 134 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Kim jest Kiejstut w utworze?",
      content: {
        options: [
          "Wielkim mistrzem Zakonu Krzyżackiego",
          "Litewskim księciem, ojcem Aldony, który przyjął Waltera i dał mu córkę za żonę",
          "Wajdelotą śpiewającym przy ognisku",
          "Zdrajcą Litwy, który sprzedał Waltera Krzyżakom",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Kiejstut to historyczna postać — litewski książę, który w utworze przyjmuje Waltera Alfa (zbiegłego od Krzyżaków), docenia jego waleczność i daje mu za żonę córkę Aldonę, mówiąc: "Pojdź, Walterze, bądź zięciem moim i bij się za Litwę!".',
      },
    },

    // ===== 135 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Kto wychowywał Waltera Alfa wśród Krzyżaków?",
      content: {
        options: [
          "Halban",
          "Mistrz krzyżacki Winrych",
          "Arcykomtur Maryjenburga",
          "Aldona",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Waltera Alfa wychowywał mistrz krzyżacki Winrych — sam trzymał go do chrztu, kochał i pieścił jak syna. Jednocześnie po kryjomu odwiedzał go stary wajdelota (późniejszy Halban), który rozbudzał w nim miłość do Litwy.",
      },
    },

    // ===== 136 =====
    {
      type: "ESSAY",
      category: "WRITING",
      epoch: "ROMANTICISM",
      difficulty: 5,
      points: 10,
      work: "Konrad Wallenrod",
      question:
        'Zdrada jako forma patriotyzmu? Rozważ problem, odwołując się do "Konrada Wallenroda" Adama Mickiewicza i jednego innego tekstu kultury.',
      content: {
        wordLimit: { min: 300 },
        requirements: [
          "Zdefiniuj wallenrodyzm jako formę działania i problem etyczny",
          "Przeanalizuj moralne koszty zdrady Konrada (utrata miłości, honoru, tożsamości, życia)",
          "Porównaj z innym bohaterem, który poświęcił etykę dla wyższego celu (np. Jacek Soplica, Judym, Almanzor, agent wywiadu z filmu/literatury)",
          "Sformułuj własne stanowisko: czy zdrada może być moralna, jeśli służy ojczyźnie?",
          "Minimum 300 słów",
        ],
      },
      correctAnswer:
        "Rozprawka powinna: zdefiniować wallenrodyzm (zdrada w imię wyższego celu), przeanalizować moralne koszty (Konrad płaci wszystkim — miłością, honorem, życiem, a Mickiewicz pokazuje tę cenę bez gloryfikacji). Porównanie: Jacek Soplica (też ukrywa tożsamość i działa w tajemnicy, ale Mickiewicz daje mu odkupienie — Ksiądz Robak). Stanowisko: otwarte — można argumentować za (desperacja usprawiedliwia) i przeciw (zdrada niszczy moralnie samego zdrajcę — Konrad ginie jako nieszczęśliwy alkoholik, nie jako triumfator).",
      metadata: {
        explanation:
          'Problem "zdrada jako patriotyzm" to jedno z najtrudniejszych i najciekawszych zagadnień maturalnych. Kluczowe: Mickiewicz sam ewoluował w tej kwestii — odrzucił wallenrodyzm na rzecz mesjanizmu.',
      },
    },

    // ===== 137 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 5,
      points: 5,
      work: "Konrad Wallenrod",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          'Rola poety i pieśni w "Konradzie Wallenrodzie" — od Pieśni Wajdeloty do odmowy śmierci Halbana',
        wordLimit: { max: 250, min: 200 },
        requirements: [
          "Przeanalizuj Pieśń Wajdeloty jako manifest roli pieśni w życiu narodu",
          "Wyjaśnij, dlaczego Halban odmawia śmierci — co to mówi o hierarchii: poeta > rycerz",
          "Odwołaj się do romantycznej koncepcji poety-wieszcza",
          'Porównaj z inną realizacją motywu roli poety (np. Wielka Improwizacja, "Do młodych" Asnyka)',
          "200-250 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: zanalizować Pieśń Wajdeloty jako manifest: pieśń gminna to "arka przymierza", strażnik pamięci, broń archanioła — przetrwa, gdy płomień zniszczy kroniki. Odmowa Halbana = dowód, że poeta jest ważniejszy od rycerza: Konrad ginie, ale Halban zachowa jego czyn w pieśni, z której "wstanie mściciel". Hierarchia: poeta > bohater, bo bohater umiera, a pieśń jest wieczna. Romantyczna koncepcja: poeta-wieszcz = duchowy przywódca narodu (jak później Konrad w Dziadach III). Porównanie: w Wielkiej Improwizacji Konrad też twierdzi, że "czuję i jestem" — ale jego narzędziem jest słowo, nie miecz.',
      metadata: {
        explanation:
          'Rola poety w narodzie to kluczowy temat romantyzmu i częste pytanie maturalne. "Konrad Wallenrod" jest jednym z pierwszych tekstów, w których Mickiewicz formułuje tę ideę — później rozwiniętą w Dziadach.',
      },
    },

    // ===== 138 =====
    {
      type: "SHORT_ANSWER",
      category: "LANGUAGE_USE",
      epoch: "ROMANTICISM",
      difficulty: 5,
      points: 4,
      work: "Konrad Wallenrod",
      question:
        "Wyjaśnij, jak Mickiewicz buduje napięcie fabularne za pomocą inwersji czasowej i fragmentaryzmu narracji. Podaj przykłady.",
      content: {},
      correctAnswer:
        "Inwersja czasowa: utwór NIE opowiada historii chronologicznie. Zaczyna się od obioru Konrada na mistrza (teraźniejszość), przeszłość Waltera Alfa poznajemy dopiero z Powieści Wajdeloty (cz. IV) — opowiadanej na uczcie jako pieśń. Czytelnik składa fabułę jak puzzle. Fragmentaryzm: kluczowe wydarzenia są pominięte lub tylko zasugerowane (np. moment zmiany tożsamości z Alfa na Wallenroda, lata służby w Zakonie). Efekt: tajemniczość bohatera — czytelnik długo nie wie, kim naprawdę jest Konrad. Napięcie rośnie, bo fragmenty układają się w całość stopniowo. To cecha powieści poetyckiej zapożyczona od Byrona.",
      metadata: {
        explanation:
          "Pytanie o kompozycję to typowe pytanie LANGUAGE_USE na maturze rozszerzonej. Kluczowe terminy: inwersja czasowa, fragmentaryzm, synkretyzm rodzajowy, powieść poetycka.",
      },
    },

    // ===== 139 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 5,
      points: 4,
      work: "Konrad Wallenrod",
      question:
        'Porównaj wallenrodyzm z prometeizmem Konrada z III części "Dziadów". Która postawa jest bardziej etyczna?',
      content: {
        instruction:
          "Uwzględnij metody walki, motywacje, moralne koszty i skuteczność obu bohaterów.",
      },
      correctAnswer:
        'Wallenrodyzm: niszczenie wroga od środka za pomocą zdrady, podstępu, kłamstwa. Metoda: infiltracja i sabotaż. Koszt: utrata honoru, miłości, tożsamości, śmierć. Skuteczność: Zakon zniszczony, ale bohater zniszczony razem z nim. Prometeizm (Konrad z Dziadów III): otwarty bunt przeciw Bogu i tyranowi, cierpienie za miliony. Metoda: Wielka Improwizacja — słowo jako broń. Koszt: szaleństwo, pycha (grzech). Skuteczność: bezpośrednia — zerowa (Konrad nie wyzwala narodu), pośrednia — mobilizacja duchowa. Etycznie: prometeizm jest bardziej "czysty" (otwarty bunt), ale mniej skuteczny. Wallenrodyzm jest skuteczniejszy, ale moralnie niszczący. Mickiewicz ewoluował od wallenrodyzmu (1828) do prometeizmu/mesjanizmu (1832).',
      metadata: {
        explanation:
          "Porównanie wallenrodyzmu z prometeizmem to jedno z kluczowych zagadnień romantyzmu na maturze rozszerzonej. Ważne: Mickiewicz sam odrzucił wallenrodyzm na rzecz prometeizmu w Dziadach.",
      },
    },

    // ===== 140 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 5,
      points: 3,
      work: "Konrad Wallenrod",
      question:
        "Które z poniższych aspektów utworu świadczą o jego romantycznym charakterze?",
      content: {
        options: [
          "Bohater-indywidualista rozdzierany między wartościami, samotny w swoim czynie",
          "Historyzm maski — ukrywanie współczesnych treści pod szatą średniowieczną",
          "Kult pieśni gminnej jako strażnika pamięci narodowej (romantyczna rola poety)",
          "Obiektywna, racjonalna analiza konfliktu politycznego między Litwą a Zakonem",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Cechy romantyczne: bohater-indywidualista (Konrad sam przeciw całemu Zakonowi), historyzm maski (średniowiecze = XIX w.), kult pieśni gminnej i rola poety (Pieśń Wajdeloty = manifest romantyzmu). Obiektywna racjonalna analiza byłaby cechą pozytywizmu, nie romantyzmu — utwór jest pełen emocji, tragizmu i subiektywizmu.",
      },
    },

    // ===== 141 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 5,
      points: 3,
      work: "Konrad Wallenrod",
      question:
        "Dlaczego Mickiewicz przedstawia wallenrodyzm jako strategię tragiczną, a nie heroiczną?",
      content: {
        options: [
          "Ponieważ Mickiewicz był przeciwny walce zbrojnej w każdej formie",
          "Ponieważ utwór pokazuje moralne koszty wallenrodyzmu — bohater traci miłość, honor, tożsamość, popada w alkoholizm i kończy samobójstwem. Mickiewicz nie gloryfikuje zdrady, lecz ukazuje ją jako desperacki środek, za który płaci się wszystkim",
          "Ponieważ Konrad ponosi klęskę i nie niszczy Zakonu",
          "Ponieważ cenzura carska zmusiła Mickiewicza do potępienia bohatera",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Mickiewicz NIE gloryfikuje wallenrodyzmu — ukazuje jego tragiczne konsekwencje: Konrad traci Aldonę (pustelnica), honor (zdrajca), tożsamość (żyje pod fałszywym imieniem), popada w alkoholizm, a w końcu popełnia samobójstwo. Wallenrodyzm to nie program ideowy — to desperacja. Utwór jest tragedią, nie manifestem. Później Mickiewicz odrzucił wallenrodyzm na rzecz mesjanizmu (Dziady cz. III).",
      },
    },

    // ===== 142 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 5,
      points: 3,
      work: "Konrad Wallenrod",
      question:
        "Jak można zinterpretować relację Konrad–Halban w kontekście romantycznej koncepcji roli poety?",
      content: {
        options: [
          "Halban jest sługą Konrada — wykonuje jego polecenia bez własnej woli",
          'Halban jest "sumieniem narodu" i architektem zemsty — to on kształtuje Konrada od dzieciństwa, podtrzymuje plan, a po śmierci bohatera zachowa jego czyn w pieśni. Relacja ilustruje romantyczną ideę: poeta (wajdelota) jest duchowym przywódcą narodu, ważniejszym od rycerza',
          "Halban i Konrad są rywalami o miłość Aldony",
          "Relacja jest czysto fabularna — nie ma głębszego sensu symbolicznego",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Halban to wcielenie romantycznej idei poety-wieszcza: kształtuje bohaterów (wychował Konrada), podtrzymuje pamięć narodu (pieśń gminna), przeżywa rycerza (odmawia trucizny). Poeta jest ważniejszy od wojownika: "Bard dla rycerzy w bitwach, a niewiasta / Będzie ją w domu śpiewać dla swych dzieci". Konrad ginie — pieśń Halbana żyje wiecznie.',
      },
    },

    // ===== 143 =====
    {
      type: "ESSAY",
      category: "WRITING",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 5,
      work: "Konrad Wallenrod",
      question:
        'Tragiczna miłość w literaturze. Omów problem, odwołując się do "Konrada Wallenroda" Adama Mickiewicza i jednego innego tekstu kultury.',
      content: {
        wordLimit: { min: 300 },
        requirements: [
          "Wyjaśnij, dlaczego miłość Waltera i Aldony jest tragiczna",
          "Przeanalizuj scenę rozstania i scenę pożegnalną (cz. VI)",
          "Porównaj z inną tragiczną miłością (np. Romeo i Julia, Tristan i Izolda, Judym i Joanna)",
          "Odpowiedz na pytanie: czy miłość musi przegrać z obowiązkiem?",
          "Minimum 300 słów",
        ],
      },
      correctAnswer:
        "Rozprawka powinna: pokazać tragizm miłości Alfa i Aldony (miłość poświęcona dla wyższego celu — obrony ojczyzny), przeanalizować scenę pożegnania (Aldona odmawia wyjścia z wieży, woli być wspomnieniem niż ruiną), porównać z inną parą (np. Romeo i Julia — miłość kończy śmiercią z powodu konfliktu rodów; Judym i Joasia — miłość poświęcona dla pracy społecznej). Wniosek: u Mickiewicza miłość NIE jest słabością — jest najwyższą ofiarą, jaką bohater może złożyć na ołtarzu ojczyzny.",
      metadata: {
        explanation:
          'Motyw tragicznej miłości to jedno z najczęstszych pytań maturalnych o "Konrada Wallenroda". Kluczowe: miłość Alfa i Aldony nie jest sentymentalna — jest heroiczna.',
      },
    },

    // ===== 144 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 4,
      work: "Konrad Wallenrod",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic: "Czy cel uświęca środki? Wallenrodyzm jako problem etyczny",
        wordLimit: { max: 200, min: 150 },
        requirements: [
          "Wyjaśnij, na czym polega dylemat moralny Konrada",
          "Przedstaw argumenty za i przeciw wallenrodyzmowi",
          "Odwołaj się do motta z Machiavellego",
          "Wskaż, jaką cenę płaci Konrad za realizację planu",
          "150-200 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna: zdefiniować dylemat — Konrad musi wybrać między honorem rycerskim (walka twarzą w twarz, etyczne) a patriotyzmem (jedyny skuteczny sposób to zdrada, nieetyczne). Motto z Machiavellego ("trzeba być lisem i lwem") mówi, że w polityce nie wolno ograniczać się do etyki rycerskiej. Argumenty za: Zakon jest zbyt potężny na otwartą walkę, zdrada to jedyna droga do ocalenia narodu. Argumenty przeciw: zdrada niszczy moralnie samego bohatera — Konrad traci miłość, honor, życie, staje się alkoholikiem, ginie samobójstwem. Mickiewicz nie daje jednoznacznej odpowiedzi — utwór jest tragedią, nie manifestem.',
      metadata: {
        explanation:
          'Problem "cel uświęca środki" to centralne zagadnienie etyczne utworu i jedno z najczęstszych pytań maturalnych dotyczących "Konrada Wallenroda".',
      },
    },

    // ===== 145 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 3,
      work: "Konrad Wallenrod",
      question:
        'Porównaj postacie Konrada Wallenroda i Almanzora z ballady "Alpuhara". Wskaż analogie i różnice.',
      content: {
        instruction:
          "Odwołaj się do metody walki, motywacji i konsekwencji czynu obu bohaterów.",
      },
      correctAnswer:
        "Analogie: obaj niszczą wroga od środka (infiltracja), obaj poświęcają własne życie, obaj używają podstępu (zdrada). Almanzor zaraża dżumą przez pocałunek, Konrad niszczy armię Zakonu przez celowy sabotaż. Różnice: Almanzor działa impulsywnie (wraca tuż po upadku twierdzy), Konrad realizuje plan przez dziesięciolecia. Almanzor umiera ze śmiechem na ustach (triumf), Konrad umiera w rozpaczy (utracił miłość, honor, szczęście). Almanzor nie ma dylematu moralnego, Konrad jest targany wyrzutami sumienia przez całe życie.",
      metadata: {
        explanation:
          'Ballada "Alpuhara" to parabola — klucz do zrozumienia wallenrodyzmu. Na maturze ważne jest dostrzeżenie zarówno podobieństw, jak i różnic: Almanzor jest prosty i jednowymiarowy, Konrad — tragiczny i wielowymiarowy.',
      },
    },

    // ===== 146 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 3,
      work: "Konrad Wallenrod",
      question:
        'Wyjaśnij rolę pieśni gminnej w "Konradzie Wallenrodzie" na podstawie Pieśni Wajdeloty. Dlaczego Mickiewicz poświęcił jej tak wiele miejsca?',
      content: {},
      correctAnswer:
        'Pieśń gminna pełni rolę "arki przymierza między dawnymi i młodszymi laty" — jest skarbcem pamięci narodowej. Gdy płomień zniszczy kroniki, a miecz spustoszy skarby, pieśń "ujdzie cało". Dla narodu bez państwa (Litwa/Polska) pieśń ustna jest jedynym nośnikiem tożsamości. Mickiewicz poświęcił jej tyle miejsca, bo pisał w sytuacji, gdy polska kultura i literatura były zagrożone rusyfikacją — literatura = ostatni bastion narodowej pamięci. Pieśń = broń: "Ty czasem dzierżysz i broń archanioła".',
      metadata: {
        explanation:
          "Pieśń Wajdeloty to manifest romantycznej idei roli poety i literatury w życiu narodu. Przełożenie do sytuacji Polski pod zaborami jest bezpośrednie: skoro nie ma państwa, literatura staje się strażnikiem tożsamości.",
      },
    },

    // ===== 147 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Które porównania między Konradem Wallenrodem a innymi bohaterami romantycznymi są uzasadnione?",
      content: {
        options: [
          "Konrad Wallenrod i Konrad z III cz. Dziadów — obaj poświęcają się dla ojczyzny, ale Wallenrod wybiera zdradę, Konrad z Dziadów — bunt prometejski",
          "Konrad Wallenrod i Jacek Soplica — obaj ukrywają tożsamość i działają w tajemnicy dla dobra narodu",
          "Konrad Wallenrod i Werter Goethego — obaj kończą samobójstwem z powodu nieszczęśliwej miłości",
          "Konrad Wallenrod i Kordian Słowackiego — obaj stają przed dylematem działania za pomocą zdrady",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          "Wallenrod-Konrad (Dziady): obaj poświęcają się, ale różnymi metodami (zdrada vs bunt). Wallenrod-Soplica: obaj ukrywają tożsamość i działają w tajemnicy. Wallenrod-Kordian: obaj stoją przed dylematem działania (Kordian nie potrafi zabić cara — paraliż moralny). Werter ginie z miłości, nie z patriotyzmu — analogia powierzchowna.",
      },
    },

    // ===== 148 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        'Które z poniższych interpretacji ballady "Alpuhara" są uzasadnione?',
      content: {
        options: [
          "Almanzor jest analogią Konrada — obaj niszczą wroga od środka, poświęcając własne życie",
          "Pocałunek Almanzora (zarażenie dżumą) odpowiada zdradzieckim działaniom Konrada jako mistrza Zakonu",
          "Ballada służy wyłącznie rozrywce gości i nie ma głębszego znaczenia",
          "Konrad, śpiewając balladę, nieświadomie zdradza swój plan — z czego Krzyżacy nie zdają sobie sprawy",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '"Alpuhara" to parabola planu Konrada: Almanzor = Konrad, Hiszpanie = Krzyżacy, pocałunek/zaraza = sabotaż od środka. Konrad w pijanym szale sam zdradza sens ballady ("Wy chcecie wiedzieć o zemście Litwina?"), ale Krzyżacy tego nie rozumieją. Ballada NIE jest pustą rozrywką — jest kluczem do fabuły.',
      },
    },

    // ===== 149 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Dlaczego Aldona odmawia wyjścia z wieży, gdy Konrad ją o to błaga?",
      content: {
        options: [
          "Bo nie kocha go już",
          "Bo złożyła przysięgę na progu wieży, boi się, że zniszczoną przez lata pustelnictwa nie będzie już piękną Aldoną z jego wspomnień, i woli zachować idealny obraz w pamięci obojga",
          "Bo Krzyżacy strzegą wejścia i nie można wieży otworzyć",
          "Bo Halban zabronił jej wychodzić",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Aldona odmawia z dwóch powodów: 1) Złożyła sakralną przysięgę, że nie wyjdzie z wieży aż do śmierci. 2) Boi się, że żywy upiór, który z niej pozostał, zniszczy piękny obraz zachowany w pamięci Konrada: "Tak motyl piękny, gdy w bursztyn utonie / Na wieki całą zachowuje postać... Alfie, nam lepiej takiemi pozostać". To tragiczne i piękne zarazem — woli być wspomnieniem niż rzeczywistością.',
      },
    },

    // ===== 150 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Jak można zinterpretować genezę utworu w kontekście życia Mickiewicza?",
      content: {
        options: [
          "Mickiewicz opisuje własne doświadczenia wojenne z okresu powstania listopadowego",
          "Mickiewicz, na zesłaniu w Rosji, pracujący dla wroga (caratu), pisze o dylemacie człowieka, który musi służyć nieprzyjacielowi, by go zniszczyć — odzwierciedla to sytuację polskich spiskowców i dekabrysstów",
          "Utwór jest czystą fikcją historyczną bez związku z biografią autora",
          "Mickiewicz pisał utwór jako hommage dla cara Mikołaja I",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Mickiewicz pisał "Konrada Wallenroda" w Rosji (1825-1827), będąc zmuszony do pracy jako urzędnik carski. Poznał dekabrysstów (Konrad Rylejew!) i zrozumiał, że konfrontacja z Rosją jest beznadziejna — potrzeba podstępu. Wallenrodyzm to literacki wyraz tego dylematu: jak walczyć, gdy służy się wrogowi.',
      },
    },

    // ===== 151 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 4,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Dlaczego Halban odmawia wypicia trucizny razem z Konradem?",
      content: {
        options: [
          "Jest tchórzem i boi się śmierci",
          "Chce przeżyć, aby zachować sławę czynu Konrada i przekazać ją potomnym — pieśń mściciela wstanie z tej pieśni",
          "Nie wierzy, że Konrad naprawdę zamierza umrzeć",
          "Chce uciec do Litwy i prowadzić wojnę samodzielnie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Halban odmawia śmierci, bo ma misję: "Chcę jeszcze zostać, zamknąć twe powieki / I żyć — ażebym sławę twego czynu / Zachował światu, rozgłosił na wieki". Jako wajdelota będzie śpiewał o czynie Konrada — i "kiedyś w przyszłości / Z tej pieśni wstanie mściciel naszych kości". Pieśń jest wieczna, bohater śmiertelny.',
      },
    },

    // ===== 152 =====
    {
      type: "SYNTHESIS_NOTE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 3,
      work: "Konrad Wallenrod",
      question: "Napisz notatkę syntetyczną na podany temat:",
      content: {
        topic:
          "Plan zemsty Waltera Alfa — od porwania po śmierć. Jak krok po kroku realizował strategię wallenrodyzmu?",
        wordLimit: { max: 150, min: 100 },
        requirements: [
          "Wymień kluczowe etapy: porwanie, wychowanie u Krzyżaków, ucieczka na Litwę, małżeństwo, powrót pod fałszywym imieniem, obór na mistrza, sabotaż, śmierć",
          "Wyjaśnij, jaką rolę w planie odgrywał Halban",
          "Wskaż, co Konrad poświęcił dla realizacji planu",
          "100-150 słów",
        ],
      },
      correctAnswer:
        'Notatka powinna obejmować: 1) Porwanie Waltera jako dziecka, wychowanie u Krzyżaków, ale z tajnym wpływem wajdeloty Halbana, który rozbudzał miłość do Litwy. 2) Ucieczka na Litwę, małżeństwo z Aldoną, decyzja o zemście. 3) Powrót do Zakonu pod imieniem Wallenroda, zdobycie sławy, obór na mistrza. 4) Celowy sabotaż — zwlekanie z wojną, przegrywanie bitew, wyniszczenie armii Zakonu na litewskich stepach. 5) Zdemaskowanie przez tajny trybunał i śmierć. Halban był "sumieniem" planu, rozbudził i podtrzymywał zemstę. Konrad poświęcił: miłość (Aldona), honor (zdrada), życie (samobójstwo).',
      metadata: {
        explanation:
          'Plan Konrada rozciąga się na kilkadziesiąt lat — od dzieciństwa do śmierci. Kluczowa jest rola Halbana jako "architekta" zemsty i strażnika pamięci, który przeżyje Konrada, by opowiedzieć jego historię.',
      },
    },

    // ===== 153 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Które stwierdzenia o Aldonie są prawdziwe?",
      content: {
        options: [
          "Jest córką litewskiego księcia Kiejstuta",
          "Walter nauczył ją kochać i opowiedział jej o Bogu chrześcijan",
          "Zamknęła się w wieży z własnej woli, by być blisko męża",
          "Na końcu utworu ucieka z wieży i wraca na Litwę",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Aldona to córka Kiejstuta, która zakochała się w Walterze — ten nauczył ją miłości i opowiedział o chrześcijaństwie. Zamknęła się w wieży przy zamku w Malborku, by być blisko męża. NIE ucieka — umiera w wieży po śmierci Konrada.",
      },
    },

    // ===== 154 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Które elementy utworu stanowią nawiązania do sytuacji Polski pod zaborami?",
      content: {
        options: [
          "Litwa pod naporem Zakonu = Polska pod naporem Rosji",
          "Wallenrodyzm jako strategia walki spiskowców (dekabrysstów)",
          "Pieśń gminna jako strażnik tożsamości = literatura polska w niewoli",
          "Zamek w Malborku = siedziba króla Polski w Krakowie",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          "Litwa vs Zakon = Polska vs Rosja (maska historyczna). Wallenrodyzm nawiązuje do strategii spiskowców/dekabrysstów (Konrad Rylejew!). Pieśń gminna jako strażnik pamięci = rola literatury polskiej pod zaborami. Malbork nie symbolizuje Krakowa.",
      },
    },

    // ===== 155 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: 'Które cechy powieści poetyckiej realizuje "Konrad Wallenrod"?',
      content: {
        options: [
          "Synkretyzm rodzajowy — łączenie epiki, liryki i dramatu",
          "Inwersja czasowa — zdarzenia nie są przedstawiane chronologicznie",
          "Bohater to indywidualista rozdzierany między wartościami",
          "Narracja prowadzona przez wszystkowiedzącego narratora bez emocji",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Konrad Wallenrod" realizuje cechy powieści poetyckiej: synkretyzm (narracja + pieśni liryczne + dialogi dramatyczne), inwersję czasową (fabuła nie jest chronologiczna — zaczynamy od obioru mistrza, przeszłość poznajemy z pieśni), bohater-indywidualista (Konrad rozdzierany między honorem a ojczyzną). Narracja NIE jest obiektywna — narrator jest zaangażowany.',
      },
    },

    // ===== 156 =====
    {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Co oznacza porównanie sokoła w Powieści Wajdeloty?",
      content: {
        sourceText: {
          author: "Adam Mickiewicz",
          title: "Konrad Wallenrod",
          text: "Jako sokół wydarty z gniazda i w klatce żywiony, / Choć srogimi mękami łowcy odbiorą mu rozum / I puszczają, żeby braci sokołów wojował; / Skoro wzniesie się w chmury (...) / Pojdź, myśliwcze, do domu, z klatką nie czekaj sokoła.",
        },
        options: [
          "Symbolizuje potęgę Zakonu Krzyżackiego",
          "Jest alegorią losu Waltera Alfa — Litwina porwanego przez Krzyżaków, który wraca na stronę ojczyzny, gdy odzyska wolność",
          "Opisuje techniki sokolnictwa w średniowieczu",
          "Symbolizuje Aldonę, która chce uciec z wieży",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Sokół to alegoria Waltera Alfa: porwany z ojczystego gniazda (Litwa), wyhodowany w niewoli (Zakon), puszczony na polowanie (walka z Litwinami) — ale gdy poczuje wolność, wraca do swoich. "Pojdź, myśliwcze, do domu, z klatką nie czekaj sokoła".',
      },
    },

    // ===== 157 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question: "Na czym polega tragizm Konrada Wallenroda?",
      content: {
        options: [
          "Na tym, że ponosi porażkę wojenną i nie niszczy Zakonu",
          "Na tym, że musi wybierać między dwoma wartościami: etyką rycerską (honor) a patriotyzmem (zemsta za ojczyznę) — każdy wybór oznacza stratę",
          "Na tym, że Aldona nie chce na niego czekać",
          "Na tym, że Halban go zdradza",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Tragizm Konrada polega na konflikcie dwóch wartości: honoru rycerskiego (walka twarzą w twarz) i miłości do ojczyzny (jedyny sposób na pokonanie Zakonu to zdrada). Wybierając ojczyznę, traci honor, miłość, szczęście i życie. To klasyczny konflikt tragiczny romantyzmu.",
      },
    },

    // ===== 158 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        "Jaka jest funkcja Pieśni Wajdeloty w kontekście całego utworu?",
      content: {
        options: [
          "Służy wyłącznie rozrywce gości na uczcie",
          "Jest manifestem o roli pieśni gminnej jako skarbca pamięci narodowej — zachowującej tożsamość narodu nawet po utracie państwa",
          "Opowiada wyłącznie o miłości Waltera i Aldony",
          "Jest modlitwą do Boga o pomoc w walce z Krzyżakami",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Pieśń Wajdeloty to hymn o roli pieśni gminnej (tradycji ustnej) w życiu narodu: "O wieści gminna! Ty arko przymierza / Między dawnymi i młodszymi laty". Pieśń jest skarbcem pamięci — przetrwa, gdy płomień rozgryzie malowane dzieje, a skarby mieczowi spustoszą złodzieje.',
      },
    },

    // ===== 159 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 3,
      points: 2,
      work: "Konrad Wallenrod",
      question:
        'Czym jest zabieg "maski historycznej" zastosowany w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Użyciem kostiumów i masek na balu w Malborku",
          "Osadzeniem akcji w średniowiecznej Litwie, aby pod pozorem historii opowiadać o współczesnej sytuacji Polski pod zaborami",
          "Ukryciem twarzy bohatera pod szyszakiem rycerskim",
          "Zmianą nazwiska bohatera z Alf na Wallenrod",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Maska historyczna to zabieg polegający na ukryciu współczesnych treści pod szatą historyczną. Mickiewicz, pisząc o walce Litwinów z Zakonem Krzyżackim (XIV w.), mówił w istocie o walce Polaków z zaborcą rosyjskim (XIX w.). Zabieg pozwolił ominąć cenzurę carską.",
      },
    },

    // ===== 160 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        'Które z poniższych motywów są obecne w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Motyw zdrady w imię wyższego celu",
          "Motyw poety/pieśniarza jako straży pamięci narodowej",
          "Motyw nieszczęśliwej miłości — poświęconej dla ojczyzny",
          "Motyw sielanki wiejskiej i szczęśliwego życia na wsi",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Konrad Wallenrod" zawiera motywy: zdrady patriotycznej (wallenrodyzm), roli poety w narodzie (Pieśń Wajdeloty o pieśni gminnej), nieszczęśliwej miłości (Alf i Aldona). Nie ma motywu sielanki — utwór jest pełen tragizmu.',
      },
    },

    // ===== 161 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Uzupełnij zdania, wybierając poprawne opcje:",
      content: {
        textWithGaps:
          "Konrad został wybrany wielkim mistrzem dzięki (1). Aby zniszczyć Zakon, celowo (2). Plan zniszczenia Zakonu zainspirował go (3).",
        gaps: [
          {
            id: 1,
            options: [
              "sławie wojennej i pozornej pobożności",
              "bogactwu i przekupstwu",
              "protekcji papieskiej",
              "pokrewieństwu z poprzednim mistrzem",
            ],
          },
          {
            id: 2,
            options: [
              "otruł źródła wody w zamku",
              "prowadził wojny tak, aby je przegrywać",
              "wysyłał listy do Litwinów",
              "zabijał Krzyżaków we śnie",
            ],
          },
          {
            id: 3,
            options: [
              "Halban od dzieciństwa",
              "Aldona przed ślubem",
              "papież listem",
              "Witold w czasie uczty",
            ],
          },
        ],
      },
      correctAnswer: [0, 1, 0],
      metadata: {
        explanation:
          "Konrad został mistrzem dzięki sławie rycerskiej i pozornej pobożności. Jego plan polegał na celowym przegrywaniu wojen — wyniszczył armię Zakonu na litewskich stepach. Plan zemsty rozbudzał w nim od dzieciństwa wajdelota Halban.",
      },
    },

    // ===== 162 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Połącz postacie z ich rolami w utworze:",
      content: {
        matchingType: "characters_to_traits",
        leftColumn: [
          { id: "A", text: "Walter Alf / Konrad" },
          { id: "B", text: "Aldona" },
          { id: "C", text: "Halban" },
          { id: "D", text: "Witold" },
        ],
        rightColumn: [
          { id: "1", text: "Litewski zdrajca szukający sojuszu z Zakonem" },
          { id: "2", text: "Wajdelota, stróż pamięci i sumienia bohatera" },
          { id: "3", text: "Pustelnica zamknięta w wieży z miłości do męża" },
          {
            id: "4",
            text: "Litwin udający Krzyżaka, wielki mistrz-sabotażysta",
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
          "Walter Alf/Konrad to Litwin infiltrujący Zakon. Aldona zamknęła się w wieży, by być przy mężu. Halban to strażnik pamięci narodowej. Witold to zdrajca, który jednak pod wpływem pieśni odzyskuje sumienie.",
      },
    },

    // ===== 163 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Jak ginie Konrad Wallenrod?",
      content: {
        options: [
          "Zostaje stracony publicznie przez Krzyżaków",
          "Ginie w bitwie z Litwinami",
          "Wypija truciznę i umiera w swojej strzelnicy, zanim Krzyżacy zdążą go schwytać",
          "Ucieka do Litwy i ginie na granicy",
        ],
      },
      correctAnswer: 2,
      metadata: {
        explanation:
          "Konrad, wiedząc o wyroku tajnego trybunału, wypija truciznę w swojej strzelnicy. Przed śmiercią ciska lampę z okna — sygnał dla Aldony, że już nie wróci. Aldona wydaje przeraźliwy krzyk i również umiera.",
      },
    },

    // ===== 164 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Jak reaguje Witold na pieśń Wajdeloty podczas uczty?",
      content: {
        options: [
          "Jest obojętny i nie słucha",
          "Blednie, czerwieni się, w końcu wybucha płaczem — pieśń porusza jego sumienie zdrajcy",
          "Śmieje się i klaszcze",
          "Wychodzi z sali protestując przeciw obecności Litwina",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Witold, litewski książę który zdradził ojczyznę i szuka sojuszu z Zakonem, reaguje gwałtownie: blednie, sinieje, czerwieni się, ściska szablę — a na końcu wybucha płaczem, zasłaniając twarz płaszczem. Pieśń Wajdeloty poruszyła jego sumienie.",
      },
    },

    // ===== 165 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Czym jest wallenrodyzm?",
      content: {
        options: [
          "Otwartą walką zbrojną z wrogiem w obronie ojczyzny",
          "Postawą polegającą na niszczeniu wroga od środka za pomocą podstępu i zdrady, nawet kosztem własnego honoru i szczęścia",
          "Pokojowymi negocjacjami z nieprzyjacielem",
          "Emigracją z ojczyzny w celu szukania pomocy za granicą",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Wallenrodyzm to postawa bohatera, który niszczy wroga od środka — infiltruje jego struktury, zdobywa władzę, a następnie celowo prowadzi do klęski. Wymaga nieetycznego postępowania (zdrada, kłamstwo) w imię wyższego celu (obrona ojczyzny). Cena: utrata honoru, miłości, życia.",
      },
    },

    // ===== 166 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        'Co opowiada ballada "Alpuhara" śpiewana przez Konrada na uczcie?',
      content: {
        options: [
          "Historię miłości Waltera i Aldony",
          "Historię Almanzora, który wraca do Hiszpanów udając poddanie się, aby zarazić ich dżumą",
          "Legendę o założeniu Zakonu Krzyżackiego",
          "Opowieść o wajdelocie Halbanie i jego pieśniach",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Ballada "Alpuhara" opowiada o mauretańskim królu Almanzorze, który po upadku twierdzy wraca do Hiszpanów, udając że chce się poddać, ale w rzeczywistości przynosi im zarazę. To parabola własnego planu Konrada — niszczenia wroga od środka.',
      },
    },

    // ===== 167 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 2,
      points: 1,
      work: "Konrad Wallenrod",
      question: "W jaki sposób Walter Alf trafił do Krzyżaków?",
      content: {
        options: [
          "Dobrowolnie uciekł z Litwy",
          "Został porwany jako dziecko podczas najazdu Krzyżaków na litewskie miasto",
          "Został sprzedany przez litewskiego kupca",
          "Przybył jako ambasador Kiejstuta",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Walter Alf został porwany jako małe dziecko podczas nocnego najazdu Krzyżaków na litewskie miasto. Pamiętał tylko krzyk matki i pożar. Wychowywał go mistrz krzyżacki Winrych.",
      },
    },

    // ===== 168 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        'Z jakiego dzieła pochodzi motto "Konrada Wallenroda" i co ono oznacza?',
      content: { hints: ["Machiavelli", "lis i lew", "Książę"] },
      correctAnswer:
        'Motto pochodzi z "Księcia" Niccolò Machiavellego. W tłumaczeniu brzmi: trzeba być lisem i lwem — czyli łączyć siłę z podstępem. Zapowiada ono główny problem utworu: konieczność użycia zdrady (lis) w walce z potężnym wrogiem (lew).',
      metadata: {
        explanation:
          "Motto z Machiavellego jest kluczem interpretacyjnym do całego utworu. Konrad Wallenrod realizuje strategię lisa — niszczy Zakon od środka podstępem, bo w otwartej walce (lew) Litwa nie mogła wygrać.",
      },
    },

    // ===== 169 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: 'Które formy liryczne zawarte są w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Hymn do Ducha Świętego",
          "Pieśń Wajdeloty",
          'Ballada "Alpuhara"',
          "Sonet krymski",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          'W utworze znajdują się: Hymn (śpiewany na kapitule), Pieśń Wajdeloty (o historii Litwy), ballada "Alpuhara" (o podstępie Almanzora). Sonety krymskie to odrębny cykl Mickiewicza.',
      },
    },

    // ===== 170 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Które informacje o utworze są prawdziwe?",
      content: {
        options: [
          "Utwór został wydany w 1828 roku",
          "Akcja rozgrywa się w XIV wieku",
          "Mickiewicz pisał go na zesłaniu w Rosji",
          "Jest to dramat w pięciu aktach",
        ],
      },
      correctAnswer: [0, 1, 2],
      metadata: {
        explanation:
          '"Konrad Wallenrod" ukazał się w 1828 r., akcja toczy się w XIV w. (czasy walk Litwy z Zakonem), Mickiewicz pisał go na zesłaniu w Rosji (1825-1827). Nie jest to dramat — to powieść poetycka.',
      },
    },

    // ===== 171 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question:
        'Które z poniższych postaci występują w "Konradzie Wallenrodzie"?',
      content: {
        options: [
          "Halban — stary wajdelota",
          "Aldona — żona Waltera Alfa",
          "Jacek Soplica",
          "Kiejstut — książę litewski",
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          'Halban, Aldona i Kiejstut to postacie z "Konrada Wallenroda". Jacek Soplica to bohater "Pana Tadeusza" Mickiewicza.',
      },
    },

    // ===== 172 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Kim jest Halban?",
      content: {
        options: [
          "Wielkim mistrzem Zakonu Krzyżackiego",
          "Starym wajdelotą litewskim, opiekunem i powiernikiem Konrada",
          "Bratem Aldony",
          "Szpiegiem Krzyżaków na Litwie",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Halban to stary wajdelota (bard litewski), który opiekował się Walterem Alfem od dzieciństwa, rozbudzał w nim miłość do Litwy i nienawiść do Krzyżaków. Jest zarówno spowiednikiem, jak i powiernikiem Konrada.",
      },
    },

    // ===== 173 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: "Kim jest Aldona w utworze?",
      content: {
        options: [
          "Służącą w zamku krzyżackim",
          "Żoną Waltera Alfa, córką księcia Kiejstuta, pustelnicą zamkniętą w wieży",
          "Matką Konrada Wallenroda",
          "Zakonnicą z klasztoru w Malborku",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Aldona to córka litewskiego księcia Kiejstuta i żona Waltera Alfa. Gdy mąż odjeżdża realizować plan zemsty, Aldona zamyka się w wieży zamkowej jako pustelnica, aby być blisko niego.",
      },
    },

    // ===== 174 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: 'Gdzie rozgrywa się główna akcja "Konrada Wallenroda"?',
      content: {
        options: [
          "W Krakowie",
          "W Maryjenburgu (Malborku) — siedzibie Zakonu Krzyżackiego",
          "W Wilnie",
          "W Petersburgu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Główna akcja toczy się w Maryjenburgu (Malborku) — stolicy Zakonu Krzyżackiego. Poboczne wątki dzieją się na Litwie (Kowno, zamek Kiejstuta) i na pograniczu litewsko-pruskim.",
      },
    },

    // ===== 175 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: 'Jak naprawdę nazywa się główny bohater "Konrada Wallenroda"?',
      content: {
        options: ["Konrad von Wallenrod", "Walter Alf", "Halban", "Witold"],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          "Prawdziwe imię bohatera to Walter Alf — Litwin porwany jako dziecko przez Krzyżaków. Przybrał tożsamość rycerza Wallenroda, aby wniknąć w struktury Zakonu i zniszczyć go od środka.",
      },
    },

    // ===== 176 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: 'Jaki gatunek literacki reprezentuje "Konrad Wallenrod"?',
      content: {
        options: [
          "Ballada",
          "Powieść poetycka",
          "Dramat romantyczny",
          "Poemat dygresyjny",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Konrad Wallenrod" to powieść poetycka — gatunek synkretyczny łączący elementy epiki (narracja), liryki (wierszowana forma, pieśni) i dramatu (dialogi). Twórcami gatunku byli Walter Scott i George Byron.',
      },
    },

    // ===== 177 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "ROMANTICISM",
      difficulty: 1,
      points: 1,
      work: "Konrad Wallenrod",
      question: 'Kto jest autorem "Konrada Wallenroda"?',
      content: {
        options: [
          "Juliusz Słowacki",
          "Adam Mickiewicz",
          "Zygmunt Krasiński",
          "Cyprian Kamil Norwid",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          '"Konrad Wallenrod" to powieść poetycka Adama Mickiewicza, wydana w 1828 roku w Petersburgu. Utwór powstał w czasie zesłania poety w Rosji.',
      },
    },

    // ===== 178–197: Remaining Dżuma diff2/diff1 questions =====

    // ===== 178 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question:
        "Jakie zdarzenie otwiera fabułę powieści (scena z 16 kwietnia)?",
      content: { words: ["szczur", "podest", "dozorca"] },
      correctAnswer:
        'Rankiem 16 kwietnia doktor Rieux wychodzi ze swojego gabinetu i na podeście zawadza nogą o martwego szczura. Dozorca Michel twierdzi stanowczo, że „nie ma szczurów w domu" i uważa to za czyjś kawał. Tego samego wieczoru Rieux widzi kolejnego szczura — umierającego, wyrzucającego krew z pyska. To początek serii wydarzeń zwiastujących epidemię.',
      metadata: {
        explanation:
          "Scena z martwym szczurem na podeście to klasyczny incipit powieści. Reakcja dozorcy (zaprzeczanie oczywistości) zapowiada postawę całego społeczeństwa wobec nadciągającej katastrofy.",
      },
    },

    // ===== 179 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
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

    // ===== 180 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
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
        'Stary astmatyk to emerytowany kramarz, który mając 50 lat uznał, że dosyć pracował, położył się do łóżka i już nie wstał. Mierzy czas przesypywaniem grochu z garnka do garnka zamiast zegarkiem. Reprezentuje postawę biernej akceptacji świata — nie obchodzi go dżuma, nie walczy z nią. Jego zdanie „Co to jednak znaczy — dżuma? To życie, ot i wszystko" wyraża postawę fatalistyczną.',
      metadata: {
        explanation:
          'Stary astmatyk jest postacią komiczną i filozoficzną zarazem. Tarrou pyta, czy jest „świętym", i odpowiada: „Tak, jeśli świętość jest zespołem przyzwyczajeń".',
      },
    },

    // ===== 181 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: 'Które motywy literackie są obecne w „Dżumie"?',
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
          'Kluczowe motywy „Dżumy" to: oblężone miasto (zamknięte bramy), rozłąka (Rieux z żoną, Rambert z partnerką), walka ze złem i solidarność (formacje sanitarne). Motyw pojedynku rycerskiego nie występuje w utworze.',
      },
    },

    // ===== 182 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
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
          'Paneloux w I kazaniu mówi o karze Bożej. W II kazaniu zmienia stanowisko — mówi o konieczności wiary totalnej: wszystko albo nic. Rieux uważa, że walka z dżumą to kwestia uczciwości: „wykonywanie zawodu".',
      },
    },

    // ===== 183 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
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
          'Rieux to lekarz i narrator. Tarrou organizuje formacje sanitarne i pragnie „być świętym bez Boga". Grand szlifuje zdanie o amazonce. Cottard korzysta na epidemii, bo chroni go przed wymiarem sprawiedliwości.',
      },
    },

    // ===== 184 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
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
          'Michel umiera po kilku dniach ciężkiej choroby: gorączka do 40 stopni, obrzmiałe gruczoły (dymienice), majaczenia, plamy na ciele. Umiera w karetce, a Rieux stwierdza zgon. Śmierć Michela zamyka „okres pełen mylących oznak" i rozpoczyna panikę.',
      },
    },

    // ===== 185 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: 'Kto jako pierwszy wypowiada słowo „dżuma" w powieści?',
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
          'Stary doktor Castel, który widział przypadki dżumy w Chinach i w Paryżu, jako pierwszy mówi wprost: „Pan wie oczywiście, co to jest?" i potwierdza, że to dżuma. Rieux się z nim zgadza, ale inni lekarze i władze początkowo unikają tego słowa.',
      },
    },

    // ===== 186 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
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

    // ===== 187 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
      work: "Dżuma",
      question: "Nad czym pracuje Joseph Grand przez całą powieść?",
      content: {
        options: [
          "Nad raportem dla prefektury o stanie epidemii",
          "Nad pierwszym zdaniem powieści o amazonce jadącej alejami Lasku Bulońskiego — nigdy nie jest z niego zadowolony",
          'Nad tłumaczeniem „Dżumy" na język arabski',
          "Nad planem ucieczki z Oranu",
        ],
      },
      correctAnswer: 1,
      metadata: {
        explanation:
          'Grand przez lata dopracowuje jedno zdanie: „W piękny poranek majowy smukła amazonka, siedząc na wspaniałej kasztance, jechała kwitnącymi alejami Lasku Bulońskiego". Zmienia przymiotniki, szlifuje rytm, ale nigdy nie przechodzi do dalszej części książki.',
      },
    },

    // ===== 188 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 2,
      points: 1,
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

    // ===== 189 =====
    {
      type: "SHORT_ANSWER",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'Skąd pochodzi motto „Dżumy" i co ono oznacza?',
      content: {
        hints: ["Daniel Defoe", "uwięzienie", "ukazywanie przez coś innego"],
      },
      correctAnswer:
        'Motto pochodzi z „Dziennika roku zarazy" Daniela Defoe i brzmi: „Jest rzeczą równie rozsądną ukazać jakiś rodzaj uwięzienia przez inny, jak ukazać coś, co istnieje rzeczywiście, przez coś innego, co nie istnieje". Oznacza, że historii o epidemii nie należy czytać dosłownie — dżuma jest metaforą innego rodzaju zniewolenia (np. wojny, totalitaryzmu, zła).',
      metadata: {
        explanation:
          'Motto od razu sygnalizuje paraboliczny charakter powieści. Defoe — autor „Robinsona Crusoe" — napisał również kronikę londyńskiej zarazy z 1665 roku, co tworzy intertekstualny dialog między obiema kronikami.',
      },
    },

    // ===== 190 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
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
          'W części I pojawiają się szczury, umiera dozorca Michel, Rieux rozpoznaje dżumę. Zamknięcie bram następuje dopiero na KOŃCU części I — oficjalną depeszą: „Ogłoście stan dżumy. Zamknijcie miasto".',
      },
    },

    // ===== 191 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'Które stwierdzenia o powieści „Dżuma" są prawdziwe?',
      content: {
        options: [
          "Powieść została wydana w 1947 roku",
          "Jest powieścią-parabolą o uniwersalnym przesłaniu",
          "Akcja rozgrywa się w dokładnie określonym roku — 1942",
          'Motto pochodzi z „Dziennika roku zarazy" Daniela Defoe',
        ],
      },
      correctAnswer: [0, 1, 3],
      metadata: {
        explanation:
          '„Dżuma" ukazała się w 1947 r., jest parabolą, a motto pochodzi od Defoe. Rok akcji NIE jest dokładnie podany — tekst mówi „194." z celowo opuszczoną ostatnią cyfrą, co podkreśla uniwersalność.',
      },
    },

    // ===== 192 =====
    {
      type: "CLOSED_MULTIPLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'Które z wymienionych postaci są bohaterami „Dżumy"?',
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
          'Tarrou, Grand i ojciec Paneloux to postacie z „Dżumy". Raskolnikow to bohater „Zbrodni i kary" Dostojewskiego.',
      },
    },

    // ===== 193 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'Ile części (rozdziałów głównych) liczy powieść „Dżuma"?',
      content: { options: ["Trzy", "Cztery", "Pięć", "Siedem"] },
      correctAnswer: 2,
      metadata: {
        explanation:
          '„Dżuma" składa się z pięciu części. Część I — pojawienie się szczurów i rozpoznanie epidemii, II — zamknięcie miasta i rozłąka, III — szczyt epidemii, IV — walka z dżumą, V — cofanie się choroby i otwarcie bram.',
      },
    },

    // ===== 194 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
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

    // ===== 195 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
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

    // ===== 196 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
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

    // ===== 197 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'W jakim mieście rozgrywa się akcja „Dżumy"?',
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
          'Akcja „Dżumy" toczy się w Oranie — mieście portowym na wybrzeżu algierskim, będącym wówczas prefekturą francuską. Camus opisuje je jako miasto brzydkie, bez drzew i gołębi, żyjące handlem.',
      },
    },

    // ===== 198 =====
    {
      type: "CLOSED_SINGLE",
      category: "HISTORICAL_LITERARY",
      epoch: "CONTEMPORARY",
      difficulty: 1,
      points: 1,
      work: "Dżuma",
      question: 'Kto jest autorem powieści „Dżuma"?',
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
          '„Dżuma" (fr. „La Peste") to powieść Alberta Camusa wydana w 1947 roku. Polskie tłumaczenie Joanny Guze ukazało się w 1957 roku. Camus otrzymał Nagrodę Nobla w dziedzinie literatury w 1957 roku.',
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
