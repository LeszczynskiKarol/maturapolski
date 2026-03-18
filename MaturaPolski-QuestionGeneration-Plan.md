# MaturaPolski.pl — Plan Generowania Pytań do Lektur

## Uniwersalna instrukcja dla AI (Claude) — wersja 1.0

---

## KONTEKST PROJEKTU

MaturaPolski.pl to platforma do nauki do matury z języka polskiego (spaced repetition + AI assessment).
Baza zawiera pytania 5 typów, 5 poziomów trudności, przypisane do epok i lektur.
Format pytań: JS object notation (nie czysty JSON) — identyczny z istniejącymi danymi w bazie.

---

## SEKCJA 1: FORMAT DANYCH WYJŚCIOWYCH

### 1.1 Struktura pojedynczego pytania

```javascript
{
  type: "CLOSED_SINGLE",           // typ pytania (patrz 1.2)
  category: "HISTORICAL_LITERARY", // kategoria (patrz 1.3)
  difficulty: 1,                   // poziom trudności 1-5
  points: 1,                       // punkty (patrz 1.4)
  epoch: "POSITIVISM",             // epoka (patrz 1.5)
  work: "Nad Niemnem",             // DOKŁADNA nazwa lektury — polski tytuł
  question: "Treść pytania?",      // pytanie po polsku
  content: {
    options: [                      // opcje — TYLKO dla CLOSED_SINGLE i CLOSED_MULTIPLE
      "Opcja A",
      "Opcja B",
      "Opcja C",
      "Opcja D",
    ],
  },
  correctAnswer: 1,                // index (0-based) lub tablica indexów lub tekst
  metadata: {
    explanation:
      "Wyjaśnienie poprawnej odpowiedzi — 1-3 zdania, merytoryczne, bez moralizowania.",
  },
},
```

### 1.2 Typy pytań (type)

| Typ               | Opis                            | correctAnswer                 | content              |
| ----------------- | ------------------------------- | ----------------------------- | -------------------- |
| `CLOSED_SINGLE`   | Jednokrotny wybór, 4 opcje      | `number` (index 0-3)          | `{ options: [...] }` |
| `CLOSED_MULTIPLE` | Wielokrotny wybór, 4 opcje      | `number[]` (tablica indexów)  | `{ options: [...] }` |
| `SHORT_ANSWER`    | Krótka odpowiedź tekstowa       | `string` (wzorcowa odpowiedź) | `{}`                 |
| `SYNTHESIS_NOTE`  | Notatka syntetyczna / mini-esej | `string` (wzorcowa odpowiedź) | `{}`                 |
| `ESSAY`           | Wypracowanie maturalne          | `string` (wytyczne do oceny)  | `{}`                 |

### 1.3 Kategorie (category)

| Kategoria             | Kiedy stosować                                                                    |
| --------------------- | --------------------------------------------------------------------------------- |
| `HISTORICAL_LITERARY` | Pytania o fabułę, postacie, motywy, kontekst historyczny, analizę i interpretację |
| `LANGUAGE_USE`        | Pytania o środki językowe, stylistykę, narrację, cechy gatunkowe                  |
| `WRITING`             | Pełne wypracowania maturalne (tylko ESSAY difficulty 4-5)                         |

### 1.4 Punktacja

| Difficulty | CS/CM points | SA points | SN points | ESSAY points |
| ---------- | ------------ | --------- | --------- | ------------ |
| 1          | 1            | 1         | —         | —            |
| 2          | 1            | 1         | —         | —            |
| 3          | 2            | 2         | 3         | —            |
| 4          | 2            | 3         | 4         | 5            |
| 5          | 3            | 4         | 5         | 10           |

### 1.5 Epoki (epoch) — dozwolone wartości enum Prisma

```
ANTIQUITY, MIDDLE_AGES, RENAISSANCE, BAROQUE, ENLIGHTENMENT,
ROMANTICISM, POSITIVISM, YOUNG_POLAND, INTERWAR, CONTEMPORARY
```

**UWAGA:** Nie istnieje wartość `REALISM`. Powieści pozytywistyczne → `POSITIVISM`.

---

## SEKCJA 2: ROZKŁAD 50 PYTAŃ NA LEKTURĘ

### 2.1 Macierz typów × trudności

| Trudność | CS     | CM     | SA     | SN    | ES    | Suma   |
| -------- | ------ | ------ | ------ | ----- | ----- | ------ |
| 1        | 6      | 3      | 1      | 0     | 0     | **10** |
| 2        | 5      | 3      | 3      | 0     | 0     | **11** |
| 3        | 4      | 3      | 3      | 1     | 0     | **11** |
| 4        | 3      | 2      | 3      | 2     | 1     | **11** |
| 5        | 2      | 1      | 2      | 1     | 1     | **7**  |
| **Suma** | **20** | **12** | **12** | **4** | **2** | **50** |

### 2.2 Filozofia rozkładu

- **Poziomy 1-2 (21 pytań):** Prawie same zamknięte — szybki flow, budowanie pewności. Fakty, postacie, fabuła.
- **Poziom 3 (11 pytań):** Mix — zamknięte trudniejsze, krótkie odpowiedzi wymagające syntezy, pierwsza notatka syntetyczna.
- **Poziom 4 (11 pytań):** Analiza i interpretacja — pytania wymagające rozumienia symboliki, kontekstu, relacji między postaciami. Pierwsze wypracowanie.
- **Poziom 5 (7 pytań):** "Boss fight" — pytania maturalne: porównania międzytekstowe, analiza formy, pełne wypracowanie.
- **Wypracowania (2 total):** Tylko od difficulty 4 — nie za dużo, bo niska dynamika.

---

## SEKCJA 3: ZASADY TWORZENIA PYTAŃ

### 3.1 Zasady ogólne

1. **Język:** Wszystkie pytania, opcje i wyjaśnienia — po polsku.
2. **Polskie znaki:** Pełna polska diakrytyka (ą, ę, ć, ś, ź, ż, ó, ł, ń).
3. **Cudzysłowy:** Tytuły w „cudzysłowie polskim" (nie "angielskim").
4. **Precyzja:** Każde pytanie ma JEDNĄ jednoznaczną poprawną odpowiedź (lub zestaw w CLOSED_MULTIPLE).
5. **Brak duplikatów:** Żadne dwa pytania nie mogą pytać o to samo innymi słowami.
6. **Brak podchwytliwości:** Pytania testują wiedzę, nie zdolność do rozszyfrowywania pułapek.
7. **BARDZO WAŻNE!!!:** Escapuj poslkie cudzysłowy w treści JSONÓW, tak żeby polskie cudzysłowy NIE PSUŁY pliku json. ale TYLKO cudzysłowy - polskich znaków masz używać NORMALNIE

### 3.2 Zasady per typ

#### CLOSED_SINGLE

- Dokładnie 4 opcje
- Distraktory wiarygodne, ale jednoznacznie błędne
- Opcja poprawna NIE zawsze na tej samej pozycji — randomizuj index 0-3
- Unikaj opcji "wszystkie powyższe" / "żadne z powyższych"

#### CLOSED_MULTIPLE

- Dokładnie 4 opcje, 2-3 poprawne (nigdy 1, nigdy 4)
- correctAnswer to TABLICA indexów: `[0, 1, 3]`
- Opcje poprawne i błędne wymieszane — nie grupuj poprawnych na początku

#### SHORT_ANSWER

- Pytanie wymaga odpowiedzi 1-3 zdań
- correctAnswer to wzorcowa odpowiedź — pełne zdanie lub kilka kluczowych informacji
- Explanation rozszerza wzorcową odpowiedź

#### SYNTHESIS_NOTE

- Pytanie wymaga 3-6 zdań analizy / porównania / argumentacji
- correctAnswer to streszczenie oczekiwanej odpowiedzi
- Testuje zdolność łączenia faktów, porównywania, wnioskowania

#### ESSAY

- Pytanie w formie tematu wypracowania maturalnego
- correctAnswer to wytyczne: co powinno się znaleźć w pracy (nie pełna odpowiedź)
- category: `WRITING` (nie `HISTORICAL_LITERARY`)
- Minimum difficulty 4

### 3.3 Progresja trudności — co testuje każdy poziom

| Difficulty | Testuje                                                           | Przykład                                                                       |
| ---------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1          | Pamięć faktów: kto, co, gdzie, kiedy                              | "Kto jest autorem...?", "Jak nazywa się...?"                                   |
| 2          | Rozumienie fabuły i relacji między postaciami                     | "Co stało się z X?", "Jaki był związek między X i Y?"                          |
| 3          | Interpretacja motywów, symboliki, przyczyn                        | "Dlaczego X postąpił tak, a nie inaczej?", "Jakie motywy obecne są w utworze?" |
| 4          | Analiza struktury, porównania wewnątrztekstowe, ocena postaci     | "Jaką funkcję pełni scena X?", "Porównaj dwie postawy..."                      |
| 5          | Synteza, porównania międzytekstowe, kontekst epoki, analiza formy | "Jak utwór realizuje idee pozytywizmu?", "Porównaj z innym dziełem..."         |

### 3.4 Tematyka pytań — checklist na 50 pytań

Każdy zestaw 50 pytań powinien pokrywać:

- [ ] Autor i epoka
- [ ] Czas i miejsce akcji
- [ ] Gatunek i forma literacka
- [ ] Główni bohaterowie (min. 5-8 postaci z charakterystyką)
- [ ] Fabuła — kluczowe wydarzenia (min. 8-10 pytań fabularnych)
- [ ] Relacje między postaciami
- [ ] Motywy literackie (min. 3-4 motywy)
- [ ] Symbolika (min. 2-3 symbole)
- [ ] Kontekst historyczny
- [ ] Problematyka / przesłanie utworu
- [ ] Środki artystyczne / narracja / kompozycja (min. 2-3 pytania)
- [ ] Porównanie z innym utworem (min. 1 pytanie)
- [ ] Sceny kluczowe / obowiązkowe fragmenty (min. 2-3 pytania)

---

## SEKCJA 4: PROCES PRACY — KROK PO KROKU

### FAZA 1: Przygotowanie materiału źródłowego (UŻYTKOWNIK)

**Co dostarczyć AI:**

1. Ten dokument instrukcji (wklej na początku rozmowy)
2. Pełny tekst lektury LUB szczegółowe streszczenie LUB jedno i drugie
3. (Opcjonalnie) Arkusze CKE z pytaniami do danej lektury — jako wzór stylu
4. (Opcjonalnie) Specyficzne wymagania (np. "skup się na motywie X")

**Jak wklejać długie teksty:**

- Jeśli tekst przekracza limit wiadomości → dziel na tomy/części
- Każdą część wklej osobno, AI potwierdzi gotowość ("OK")
- Po wklejeniu ostatniej części → AI zaczyna generowanie

### FAZA 2: Analiza lektury (AI)

AI po otrzymaniu materiału:

1. **Czyta CAŁOŚĆ uważnie** — nie przeskakuje, nie streszcza
2. **Robi research** (web search) jeśli potrzebuje:
   - Motywy maturalne dla danej lektury
   - Kontekst historyczno-literacki
   - Porównania z innymi utworami
   - Obowiązkowe fragmenty CKE
3. **Potwierdza gotowość** — pisze "OK" i czeka na sygnał do generowania

**AI NIE streszcza lektury użytkownikowi** — streszczenie jest stratą tokenów.
**AI robi research SAM** — użytkownik nie musi dostarczać opracowań.

### FAZA 3: Generowanie pytań (AI)

1. AI generuje PEŁNE 50 pytań w jednym pliku `.js`
2. Format: identyczny z przykładami w Sekcji 1
3. Komentarze w pliku: `// ===== DIFFICULTY X — TYP (ilość) =====`
4. Na początku: `// ======================= POCZĄTEK PYTAŃ [TYTUŁ] ===================//`
5. Na końcu: `// ======================= KONIEC PYTAŃ [TYTUŁ] ===================//`

### FAZA 4: Walidacja (AI)

Po wygenerowaniu AI sprawdza:

- [ ] Łączna liczba pytań = 50
- [ ] Rozkład typów zgodny z macierzą (Sekcja 2.1)
- [ ] Rozkład trudności zgodny z macierzą
- [ ] Epoch — prawidłowa wartość enum
- [ ] Work — spójna nazwa we wszystkich pytaniach
- [ ] correctAnswer — prawidłowy typ dla danego type
- [ ] Brak duplikatów treści
- [ ] Polskie znaki poprawne

### FAZA 5: Dostarczenie (AI)

1. AI tworzy plik: `/mnt/user-data/outputs/[nazwa-lektury]-questions.js`
2. AI prezentuje plik użytkownikowi (present_files)
3. AI podaje podsumowanie: tabelę rozkładu + ewentualne uwagi techniczne

---

## SEKCJA 5: MAPOWANIE LEKTUR → EPOK

### Dla uniknięcia błędów — reference table

| Lektura                           | Epoch         |
| --------------------------------- | ------------- |
| Bogurodzica                       | MIDDLE_AGES   |
| Pieśń o Rolandzie                 | MIDDLE_AGES   |
| Legenda o św. Aleksym             | MIDDLE_AGES   |
| Kazania sejmowe (Skarga)          | RENAISSANCE   |
| Pamiętniki (Pasek)                | BAROQUE       |
| Kandyd (Voltaire)                 | ENLIGHTENMENT |
| Powrót posła (Niemcewicz)         | ENLIGHTENMENT |
| Konrad Wallenrod                  | ROMANTICISM   |
| Dziady (Mickiewicz)               | ROMANTICISM   |
| Pan Tadeusz                       | ROMANTICISM   |
| Lalka (Prus)                      | POSITIVISM    |
| Nad Niemnem (Orzeszkowa)          | POSITIVISM    |
| Zbrodnia i kara (Dostojewski)     | POSITIVISM    |
| Ludzie bezdomni (Żeromski)        | YOUNG_POLAND  |
| Sklepy cynamonowe (Schulz)        | INTERWAR      |
| Przedwiośnie (Żeromski)           | INTERWAR      |
| Dżuma (Camus)                     | CONTEMPORARY  |
| Inny świat (Grudziński)           | CONTEMPORARY  |
| Lord Jim (Conrad)                 | CONTEMPORARY  |
| Zdążyć przed Panem Bogiem (Krall) | CONTEMPORARY  |
| Medaliony (Nałkowska)             | CONTEMPORARY  |
| Początek (Szczypiorski)           | CONTEMPORARY  |

**UWAGA:** Ta tabela może wymagać weryfikacji — niektóre przypisania epok zależą od konwencji przyjętej w programie nauczania. W razie wątpliwości AI powinien zweryfikować web searchem.

---

## SEKCJA 6: WZORCOWE PRZYKŁADY PYTAŃ

### Przykład CLOSED_SINGLE (difficulty 1)

```javascript
{
  type: "CLOSED_SINGLE",
  category: "HISTORICAL_LITERARY",
  difficulty: 1,
  points: 1,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Kto jest autorką powieści „Nad Niemnem"?",
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
      "„Nad Niemnem" to powieść Elizy Orzeszkowej, opublikowana w 1888 roku. Jest uważana za jedno z najważniejszych dzieł polskiego pozytywizmu.",
  },
},
```

### Przykład CLOSED_MULTIPLE (difficulty 3)

```javascript
{
  type: "CLOSED_MULTIPLE",
  category: "HISTORICAL_LITERARY",
  difficulty: 3,
  points: 2,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Które motywy literackie są obecne w powieści „Nad Niemnem"?",
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
      "W „Nad Niemnem" kluczowe są: motyw pracy, motyw powstania styczniowego (ukryty pod mową ezopową), motyw natury. Nie ma motywu pojedynku rycerskiego.",
  },
},
```

### Przykład SHORT_ANSWER (difficulty 4)

```javascript
{
  type: "SHORT_ANSWER",
  category: "HISTORICAL_LITERARY",
  difficulty: 4,
  points: 3,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Jaką rolę odgrywa mogiła powstańcza w fabule i symbolice powieści?",
  content: {},
  correctAnswer: "Jest sacrum — ukrytym grobem powstańców styczniowych, miejscem pamięci łączącym dwór z zaściankiem. Symbolizuje wspólną przeszłość i wartości, które powinny jednoczyć podzielone społeczeństwo.",
  metadata: {
    explanation:
      "Mogiła jest zbiorowym grobem czterdziestu poległych powstańców. Ukryta w borze, nieoznaczona — symbolizuje wypartą pamięć o powstaniu. Łączy dwór z zaściankiem wspólną ofiarą krwi.",
  },
},
```

### Przykład ESSAY (difficulty 5)

```javascript
{
  type: "ESSAY",
  category: "WRITING",
  difficulty: 5,
  points: 10,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "„Nad Niemnem" Elizy Orzeszkowej nazywane jest „pozytywistycznym eposem narodowym". Uzasadnij lub podważ tę tezę.",
  content: {},
  correctAnswer: "Wypracowanie powinno zawierać: cechy eposu w powieści, analogie z „Panem Tadeuszem", różnice (krytycyzm wobec szlachty, kult pracy zamiast czynu zbrojnego), wniosek — powieść łączy cechy eposu z powieścią realistyczną.",
  metadata: {
    explanation:
      "Analiza powinna obejmować formę (panorama społeczna, mit, opisy przyrody) i treść (pozytywistyczne idee). Kluczowe: porównanie z Panem Tadeuszem.",
  },
},
```

---

## SEKCJA 7: ANTI-PATTERNS — CZEGO UNIKAĆ

### 7.1 Błędy w pytaniach

❌ **Pytanie z odpowiedzią w treści:**
"Kto jest autorem „Nad Niemnem" — powieści Elizy Orzeszkowej?"

❌ **Opcje absurdalnie łatwe do odrzucenia:**
"Kto napisał „Lalkę"? A) Mickey Mouse, B) Bolesław Prus, C) Batman, D) SpongeBob"

❌ **Pytanie o opinię zamiast o fakt:**
"Czy Emilia Korczyńska jest sympatyczną postacią?"

❌ **CorrectAnswer = zawsze 1:**
Randomizuj pozycję poprawnej odpowiedzi.

❌ **Explanation = powtórzenie pytania:**
"Odpowiedź to B, ponieważ to jest prawidłowa odpowiedź."

### 7.2 Błędy w formacie

❌ **epoch: "REALISM"** → Nie istnieje. Użyj `POSITIVISM`.
❌ **correctAnswer: "B"** → Użyj indexu `1`, nie litery.
❌ **content: { options: [...] }** dla SHORT_ANSWER → Powinno być `content: {}`.
❌ **category: "WRITING"** dla CLOSED_SINGLE → WRITING tylko dla ESSAY.
❌ **Trailing comma** po ostatniej opcji → JS toleruje, ale bądź spójny.

### 7.3 Błędy merytoryczne

❌ **Pomylenie postaci** — np. przypisanie słów Anzelma Janowi.
❌ **Anachronizmy** — np. "Justyna używała telefonu".
❌ **Nadinterpretacja** — tworzenie pytań o rzeczy, których tekst nie potwierdza.
❌ **Streszczenia z internetu zamiast z tekstu źródłowego** — internet pełen błędów.

---

## SEKCJA 8: SZABLON PIERWSZEJ WIADOMOŚCI DO AI

Użytkownik może skopiować i wkleić to na początku nowej rozmowy:

```
Cześć! Pracujemy nad generowaniem pytań do lektur maturalnych dla MaturaPolski.pl.

INSTRUKCJE: [wklej całą Sekcję 1-7 tego dokumentu]

LEKTURA: [nazwa]
EPOKA: [epoch enum value]

MATERIAŁ ŹRÓDŁOWY:
[wklej tekst / streszczenie / oba]

Przeanalizuj materiał, zrób research jeśli potrzebujesz, i napisz "OK" gdy będziesz gotowy do generowania 50 pytań.
```

---

## SEKCJA 9: KOLEJNOŚĆ PRIORYTETOWA LEKTUR

### Na podstawie audytu bazy (2039 pytań, marzec 2026)

**PRIORYTET 1 — Lektury z 0 pytań (16 pozycji):**

| Lektura                   | Epoch         | Uwagi                                   |
| ------------------------- | ------------- | --------------------------------------- |
| Bogurodzica               | MIDDLE_AGES   | Krótki tekst — może 30 pytań zamiast 50 |
| Pieśń o Rolandzie         | MIDDLE_AGES   |                                         |
| Kazania sejmowe           | RENAISSANCE   | Skarga                                  |
| Pamiętniki (Pasek)        | BAROQUE       |                                         |
| Kandyd                    | ENLIGHTENMENT | Voltaire                                |
| Powrót posła              | ENLIGHTENMENT | Niemcewicz                              |
| Konrad Wallenrod          | ROMANTICISM   | Mickiewicz                              |
| Nad Niemnem               | POSITIVISM    | ✅ DONE                                 |
| Ludzie bezdomni           | YOUNG_POLAND  | Żeromski                                |
| Sklepy cynamonowe         | INTERWAR      | Schulz                                  |
| Dżuma                     | CONTEMPORARY  | Camus                                   |
| Inny świat                | CONTEMPORARY  | Grudziński                              |
| Medaliony                 | CONTEMPORARY  | Nałkowska                               |
| Początek                  | CONTEMPORARY  | Szczypiorski                            |
| Lord Jim                  | CONTEMPORARY  | Conrad                                  |
| Zdążyć przed Panem Bogiem | CONTEMPORARY  | Krall                                   |

**PRIORYTET 2 — Słabe epoki (< 25 pytań):**

- ENLIGHTENMENT: 17 pytań
- YOUNG_POLAND: 19 pytań
- CONTEMPORARY: 21 pytań

**PRIORYTET 3 — Słaba kategoria WRITING:**

- Tylko 47 pytań (2.3%) — a wypracowanie = 50% punktów na maturze
- Dodać wypracowania do istniejących lektur

**PRIORYTET 4 — Cleanup istniejących danych:**

- 500 pytań bez epoki/lektury (25% bazy)
- 397 pytań zamkniętych bez explanation
- 110 duplikatów
- 339 pytań bez tagów

---

## SEKCJA 10: NOTATKI TECHNICZNE DLA IMPORTU

### 10.1 Import do bazy

Wygenerowane pliki `.js` NIE są gotowym importem do Prisma/PostgreSQL.
Wymagają konwersji na format akceptowany przez seed script lub API endpoint `/api/admin/exercises/bulk`.

Typowy pipeline:

1. AI generuje → `lektura-questions.js`
2. Dev konwertuje na JSON → `lektura-questions.json`
3. Seed script lub API wrzuca do bazy z walidacją

### 10.2 Walidacja przed importem

Sprawdź:

- `epoch` — wartość z enum Prisma
- `type` — wartość z enum Prisma
- `category` — wartość z enum Prisma
- `correctAnswer` — prawidłowy typ (number / number[] / string)
- `content.options` — dokładnie 4 elementy dla CLOSED\_\*
- `work` — spójna nazwa (case-sensitive matching w filtrach)

---

## SEKCJA 11: SUB-FORMATY PYTAŃ (na podstawie LearningSession.tsx)

W Prisma istnieje 5 wartości enum `type`: CLOSED_SINGLE, CLOSED_MULTIPLE, SHORT_ANSWER, SYNTHESIS_NOTE, ESSAY.
**NIE MA nowych typów** — ale wewnątrz pola `content` frontend rozpoznaje **sub-formaty**, które zmieniają rendering pytania. Poniżej pełna specyfikacja na podstawie kodu `LearningSession.tsx`.

---

### 11.1 CLOSED_MULTIPLE — sub-format: MATCHING (łączenie w pary)

Frontend wykrywa matching po: `content.matchingType` + `content.leftColumn` + `content.rightColumn`.
UI: dwie kolumny, user klika lewy→prawy, pary dostają kolory. Prisma type = `CLOSED_MULTIPLE`.

```javascript
{
  type: "CLOSED_MULTIPLE",
  category: "HISTORICAL_LITERARY",
  difficulty: 2,
  points: 2,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Połącz postacie z ich cechami charakterystycznymi:",
  content: {
    matchingType: "quotes_to_works",  // WYMAGANE — aktywuje rendering matching
    leftColumn: [
      { id: "A", text: "Marta Korczyńska" },
      { id: "B", text: "Emilia Korczyńska" },
      { id: "C", text: "Justyna Orzelska" },
      { id: "D", text: "Kirłowa" },
    ],
    rightColumn: [
      { id: "1", text: "Hipochondria i globus histericus" },
      { id: "2", text: "Szorstki głos i kwieciste pantofle" },
      { id: "3", text: "Porównanie do Antygony" },
      { id: "4", text: "Pięcioro dzieci i samodzielne prowadzenie gospodarstwa" },
    ],
  },
  correctAnswer: [[0, 1], [1, 0], [2, 2], [3, 3]],
  // Format: tablica par [leftIndex, rightIndex]
  // Marta(0)→Szorstki głos(1), Emilia(1)→Hipochondria(0), Justyna(2)→Antygona(2), Kirłowa(3)→Pięcioro dzieci(3)
  metadata: {
    explanation:
      "Marta ma ochrypły głos i nosi kwieciste pantofle. Emilia cierpi na hipochondrię. Justynę narrator porównuje do Antygony. Kirłowa samodzielnie prowadzi Olszynkę z pięciorgiem dzieci.",
  },
},
```

**Zasady MATCHING:**

- `matchingType` — wymagane pole string (np. `"quotes_to_works"`, `"characters_to_traits"`, `"events_to_dates"`)
- leftColumn i rightColumn — tablice obiektów z `id` (string) i `text` (string)
- Obie kolumny MUSZĄ mieć tę samą długość (4-6 par, optimum 4)
- correctAnswer — tablica par `[leftIndex, rightIndex]`
- Elementy prawej kolumny WYMIESZANE
- Difficulty 1-3
- **NIE dodawaj `options`** — to pole jest dla zwykłego CLOSED_MULTIPLE

---

### 11.2 CLOSED_MULTIPLE — sub-format: GAP-FILL (uzupełnianie luk z wyborem)

Frontend wykrywa po: `content.textWithGaps` + `content.gaps`.
UI: tekst z lukami, każda luka ma radio buttons z opcjami. Prisma type = `CLOSED_MULTIPLE`.

```javascript
{
  type: "CLOSED_MULTIPLE",
  category: "HISTORICAL_LITERARY",
  difficulty: 2,
  points: 2,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Uzupełnij zdania, wybierając poprawne opcje:",
  content: {
    textWithGaps: "Justyna Orzelska jest (1) Benedykta Korczyńskiego i mieszka w (2) jako uboga krewna. Legendę o Janie i Cecylii opowiada (3) Bohatyrowicz.",
    gaps: [
      {
        id: 1,
        options: ["żoną", "cioteczną siostrzenicą", "córką", "służącą"],
      },
      {
        id: 2,
        options: ["Bohatyrowiczach", "Olszynce", "Korczynie", "Wołowszczyźnie"],
      },
      {
        id: 3,
        options: ["Jan", "Anzelm", "Fabian", "Jakub"],
      },
    ],
  },
  correctAnswer: [1, 2, 1],
  // correctAnswer[i] = index wybranej opcji w gaps[i].options
  // gap 1: "cioteczną siostrzenicą"(1), gap 2: "Korczynie"(2), gap 3: "Anzelm"(1)
  metadata: {
    explanation:
      "Justyna jest cioteczną siostrzenicą Benedykta. Mieszka w Korczynie. Legendę opowiada Anzelm Bohatyrowicz.",
  },
},
```

**Zasady GAP-FILL:**

- `textWithGaps` — tekst z numerami luk w nawiasach: `(1)`, `(2)`, `(3)`
- `gaps` — tablica obiektów: `{ id: number, options: string[] }`
- Każdy gap ma 3-4 opcje
- correctAnswer — tablica indexów (0-based) dla każdego gap
- correctAnswer.length === gaps.length
- Difficulty 1-3
- **NIE dodawaj `options` na poziomie content** — opcje są wewnątrz `gaps`

---

### 11.3 CLOSED_SINGLE — opcjonalne pola rozszerzające

Frontend obsługuje dodatkowe pola w `content` dla CLOSED_SINGLE, które wzbogacają pytanie:

```javascript
{
  type: "CLOSED_SINGLE",
  category: "LANGUAGE_USE",
  difficulty: 3,
  points: 2,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Jaki środek stylistyczny zastosowała autorka w poniższym fragmencie?",
  content: {
    // Tekst źródłowy z metadanymi
    sourceText: {
      author: "Eliza Orzeszkowa",
      title: "Nad Niemnem",
      text: "Niemen płynął cicho, jakby uśpiony, a nad nim wisiała mgła biała jak całun.",
    },
    // LUB zdanie do analizy (bez metadanych)
    sentence: "Niemen płynął cicho, jakby uśpiony",
    // LUB kontekst
    context: "Fragment pochodzi z opisu wyprawy Justyny i Jana do Mogiły.",
    // LUB technika narracyjna
    technique: "Mowa ezopowa — niedopowiedzenia i aluzje zamiast wprost nazwanego powstania",
    // LUB autor
    author: "Eliza Orzeszkowa",
    // LUB dzieło (dodatkowe, oprócz work na level pytania)
    work: "Nad Niemnem",
    // Standardowe opcje
    options: [
      "Personifikacja",
      "Porównanie",
      "Metafora",
      "Hiperbola",
    ],
  },
  correctAnswer: 0,
  metadata: {
    explanation: "„Jakby uśpiony" to porównanie, ale „Niemen płynął" to personifikacja — rzeka wykonuje ludzką czynność.",
  },
},
```

**Dostępne pola rozszerzające dla CLOSED_SINGLE:**

- `sourceText: { author, title, text }` — fragment literacki z metadanymi
- `sentence: string` — zdanie do analizy
- `context: string` — kontekst / opis sytuacji
- `technique: string` — technika narracyjna do wyjaśnienia
- `author: string` — autor (jako badge)
- `work: string` — dzieło (jako badge, oprócz `work` na poziomie pytania)
- `question: string` — dodatkowe pytanie w kontekście (wewnątrz content)
- `contextLinks: [...]` — linki kontekstowe (do QuestionWithContextLinks)

---

### 11.4 SHORT_ANSWER — sub-formaty

Frontend obsługuje kilka wariantów SHORT_ANSWER. Wszystkie mają `type: "SHORT_ANSWER"` w Prisma.

#### 11.4a SHORT_ANSWER z wyrazami do użycia (`words`)

```javascript
{
  type: "SHORT_ANSWER",
  category: "LANGUAGE_USE",
  difficulty: 2,
  points: 1,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Napisz zdanie złożone, używając wszystkich podanych wyrazów:",
  content: {
    words: ["mogiła", "powstańcy", "pamięć"],
  },
  correctAnswer: "Mogiła powstańców jest miejscem pamięci o tych, którzy walczyli o wolność.",
  metadata: {
    explanation: "Zdanie powinno poprawnie użyć wszystkich trzech wyrazów w kontekście powieści.",
  },
},
```

#### 11.4b SHORT_ANSWER z frazeologizmem (`phrase`)

```javascript
{
  type: "SHORT_ANSWER",
  category: "LANGUAGE_USE",
  difficulty: 2,
  points: 1,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Wyjaśnij znaczenie poniższego frazeologizmu i podaj przykład użycia w kontekście powieści:",
  content: {
    phrase: "praca u podstaw",
  },
  correctAnswer: "Praca u podstaw to pozytywistyczne hasło postulujące edukację i podnoszenie poziomu życia najuboższych warstw społecznych. W powieści realizuje je Witold Korczyński.",
  metadata: {
    explanation: "Frazeologizm pochodzi z programu pozytywistów. W „Nad Niemnem" Witold doradza chłopom budowę studni i młyna.",
  },
},
```

#### 11.4c SHORT_ANSWER z transformacją (`transformation` + `originalSentence`)

```javascript
{
  type: "SHORT_ANSWER",
  category: "LANGUAGE_USE",
  difficulty: 3,
  points: 2,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Przekształć zdanie zgodnie z poleceniem:",
  content: {
    originalSentence: "Benedykt ciężko pracował, żeby utrzymać majątek.",
    transformation: "Zamień na stronę bierną.",
  },
  correctAnswer: "Majątek był utrzymywany dzięki ciężkiej pracy Benedykta.",
  metadata: {
    explanation: "Strona bierna: podmiot staje się dopełnieniem, a orzeczenie przybiera formę bierną z czasownikiem 'być'.",
  },
},
```

#### 11.4d SHORT_ANSWER z hasłem epoki (`slogan`)

```javascript
{
  type: "SHORT_ANSWER",
  category: "HISTORICAL_LITERARY",
  difficulty: 2,
  points: 1,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Wyjaśnij, jak poniższe hasło epoki realizowane jest w „Nad Niemnem":",
  content: {
    slogan: "Praca organiczna",
  },
  correctAnswer: "Praca organiczna to postulat współdziałania wszystkich warstw społecznych. W powieści realizuje się przez małżeństwo Justyny z Janem, łączące dwór z zaściankiem.",
  metadata: {
    explanation: "Hasło pozytywistyczne. Orzeszkowa pokazuje, że solidarność między stanami jest warunkiem przetrwania narodu.",
  },
},
```

#### 11.4e SHORT_ANSWER z instrukcją (`instruction`)

```javascript
{
  type: "SHORT_ANSWER",
  category: "LANGUAGE_USE",
  difficulty: 3,
  points: 2,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Wykonaj polecenie:",
  content: {
    instruction: "Na podstawie wiedzy o powieści „Nad Niemnem" wyjaśnij, dlaczego Orzeszkowa nigdy nie używa słowa „powstanie" w tekście. Odwołaj się do warunków historycznych.",
  },
  correctAnswer: "Ze względu na cenzurę carską Orzeszkowa stosowała mowę ezopową — aluzje, niedopowiedzenia i symbole zamiast wprost nazwanego powstania styczniowego.",
  metadata: {
    explanation: "Cenzura carska zabraniała wspominania o powstaniu. Orzeszkowa obchodziła zakaz techniką mowy ezopowej.",
  },
},
```

#### 11.4f SHORT_ANSWER wieloetapowy (`steps`)

```javascript
{
  type: "SHORT_ANSWER",
  category: "HISTORICAL_LITERARY",
  difficulty: 3,
  points: 2,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Odpowiedz na pytania dotyczące legendy o Janie i Cecylii:",
  content: {
    steps: [
      { id: 1, instruction: "Kim byli Jan i Cecylia?" },
      { id: 2, instruction: "Co wykarczowali i co stworzyli?" },
      { id: 3, instruction: "Kto nadał im szlachectwo i dlaczego?" },
    ],
  },
  correctAnswer: "1) Protoplasci rodu Bohatyrowiczów. 2) Wykarczowali puszczę nad Niemnem i stworzyli prosperującą osadę. 3) Król Zygmunt August — od bohaterstwa w pracy.",
  metadata: {
    explanation: "Legenda opowiedziana przez Anzelma jest mitem założycielskim rodu i ideowym programem autorki — praca jako źródło godności.",
  },
},
```

#### 11.4g SHORT_ANSWER z wskazówkami (`hints`)

```javascript
{
  type: "SHORT_ANSWER",
  category: "HISTORICAL_LITERARY",
  difficulty: 2,
  points: 1,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Jakie były przyczyny nieszczęśliwego małżeństwa Benedykta i Emilii?",
  content: {
    hints: ["różnica wartości", "izolacja Emilii", "praca Benedykta"],
  },
  correctAnswer: "Benedykt poświęcał się pracy i obowiązkom, Emilia żyła zamknięta w marzeniach o pięknie i wrażeniach. Nie rozumieli się — mieli różne wartości i cele.",
  metadata: {
    explanation: "Orzeszkowa pokazuje kontrast: Benedykt = praca, obowiązek; Emilia = poezja, piękno, wrażenia. Brak wspólnego celu = nieszczęście.",
  },
},
```

---

### 11.5 SYNTHESIS_NOTE — pola rozszerzające

```javascript
{
  type: "SYNTHESIS_NOTE",
  category: "HISTORICAL_LITERARY",
  difficulty: 4,
  points: 4,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Napisz notatkę syntetyczną na podany temat:",
  content: {
    topic: "Motyw pracy w „Nad Niemnem" — porównaj podejście do pracy Jana Bohatyrowicza, Marty Korczyńskiej i Emilii Korczyńskiej",
    requirements: [
      "Scharakteryzuj stosunek do pracy każdej z trzech postaci",
      "Wskaż kontrasty i podobieństwa",
      "Odwołaj się do ideałów pozytywizmu",
      "100-150 słów",
    ],
    wordLimit: { min: 100, max: 150 },
  },
  correctAnswer: "Notatka powinna zawierać: Jan — praca naturalna, radosna, tożsamość; Marta — praca jako obowiązek i sens życia mimo osobistego nieszczęścia; Emilia — bezczyność prowadząca do hipochondrii. Kontrast: pracujący są spełnieni, bezczynni cierpią. Pozytywistyczny kult pracy jako wartości naczelnej.",
  metadata: {
    explanation: "Orzeszkowa wartościuje postacie przez pryzmat stosunku do pracy. Praca = zdrowie i godność; bezczyność = choroba i pustka.",
  },
},
```

**Pola rozszerzające SYNTHESIS_NOTE:**

- `topic: string` — temat do omówienia (wyświetlany jako indigo badge)
- `requirements: string[]` — lista wymagań (zielone checklisty)
- `wordLimit: { min, max }` — limit słów (front liczy słowa live i pokazuje progress)

---

### 11.6 ESSAY — pola rozszerzające

```javascript
{
  type: "ESSAY",
  category: "WRITING",
  difficulty: 5,
  points: 10,
  epoch: "POSITIVISM",
  work: "Nad Niemnem",
  question: "Czy praca jest wartością, która nadaje sens życiu bohaterów „Nad Niemnem"? Napisz rozprawkę.",
  content: {
    thesis: "Praca jako wartość nadająca sens życiu w „Nad Niemnem"",
    structure: {
      introduction: "Przedstaw tezę i kontekst historyczny (pozytywizm)",
      arguments_for: "Podaj min. 3 argumenty z odwołaniem do postaci (Jan, Marta, Benedykt, legenda)",
      arguments_against: "Rozważ kontrprzykłady (Emilia, Różyc — czy ich bezczyność jest zawsze wyborem?)",
      conclusion: "Sformułuj jednoznaczny wniosek",
    },
    requirements: [
      "Minimum 400 słów",
      "Odwołanie do min. 3 postaci",
      "Odwołanie do legendy Jana i Cecylii",
      "Poprawna struktura rozprawki",
    ],
    wordLimit: { min: 400, max: 600 },
  },
  correctAnswer: "Praca powinna zawierać: tezę + argumenty z odwołaniem do postaci (Jan, Marta, Benedykt, legenda, kontrast z Emilią/Różycem) + wniosek. Ocena wg CKE: wymogi formalne (1pkt), kompetencje literackie (16pkt), kompozycja (7pkt), język (11pkt).",
  metadata: {
    explanation: "Kluczowe: legenda Jana i Cecylii jako mit pracy, Jan jako wzorzec, Emilia jako antymodel. Praca w pozytywizmie = patriotyzm.",
  },
},
```

**Pola rozszerzające ESSAY:**

- `thesis: string` — temat rozprawki (fioletowy badge)
- `structure: { introduction, arguments_for, arguments_against, conclusion }` — wymagana struktura (niebieski panel)
- `requirements: string[]` — wymagania (żółte badge)
- `wordLimit: { min, max }` — limit słów (front liczy live, ESSAY wymaga min do submitu)

**Ocena ESSAY przez AI backend** zwraca:

- `formalScore` (0-1), `literaryScore` (0-16), `compositionScore` (0-7), `languageScore` (0-11)
- `strengths: string[]`, `weaknesses: string[]`, `suggestions: string[]`

---

### 11.7 Podsumowanie — które pola content aktywują które sub-formaty

| type            | Pole w content                                      | Sub-format         | UI                                           |
| --------------- | --------------------------------------------------- | ------------------ | -------------------------------------------- |
| CLOSED_MULTIPLE | `matchingType` + `leftColumn` + `rightColumn`       | **Matching**       | Dwie kolumny, klik-łączenie, kolorowe pary   |
| CLOSED_MULTIPLE | `textWithGaps` + `gaps`                             | **Gap-fill**       | Tekst z lukami, radio per luka               |
| CLOSED_MULTIPLE | `options` (bez powyższych)                          | **Standard**       | Checkboxy                                    |
| CLOSED_SINGLE   | `sourceText` / `sentence` / `context` / `technique` | **Rozszerzony**    | Dodatkowe panele + standardowe radio         |
| SHORT_ANSWER    | `steps`                                             | **Multi-step**     | Oddzielne textarea per krok                  |
| SHORT_ANSWER    | `words`                                             | **Words-to-use**   | Zielone badge z wyrazami + textarea          |
| SHORT_ANSWER    | `phrase`                                            | **Frazeologizm**   | Amber badge z frazeologizmem + textarea      |
| SHORT_ANSWER    | `transformation` + `originalSentence`               | **Transformacja**  | Blue panel z poleceniem + textarea           |
| SHORT_ANSWER    | `slogan`                                            | **Hasło epoki**    | Purple badge z hasłem + textarea             |
| SHORT_ANSWER    | `instruction`                                       | **Instrukcja**     | Blue panel z instrukcją + textarea           |
| SHORT_ANSWER    | `hints`                                             | **Ze wskazówkami** | Yellow panel z hintami + textarea            |
| SYNTHESIS_NOTE  | `topic` + `requirements`                            | **Standard**       | Topic badge + checklist + textarea           |
| ESSAY           | `thesis` + `structure` + `requirements`             | **Standard**       | Thesis + structure + requirements + textarea |

---

## SEKCJA 12: SKALOWANIE — KRÓTSZE LEKTURY

Nie każda lektura zasługuje na 50 pytań.

### 12.1 Kiedy skalować

| Typ lektury            | Przykłady                                    | Pytań     |
| ---------------------- | -------------------------------------------- | --------- |
| Powieść wielotomowa    | Lalka, Nad Niemnem, Pan Tadeusz              | **50**    |
| Powieść / dramat pełny | Zbrodnia i kara, Dżuma, Lord Jim, Dziady III | **50**    |
| Krótka powieść / zbiór | Sklepy cynamonowe, Medaliony, Zdążyć...      | **40**    |
| Dramat krótki          | Powrót posła, Antygona                       | **35**    |
| Epos / poemat          | Konrad Wallenrod, Pieśń o Rolandzie          | **35**    |
| Kazania / pamiętniki   | Kazania sejmowe, Pamiętniki Paska            | **30**    |
| Bardzo krótki tekst    | Bogurodzica, Legenda o św. Aleksym           | **20-25** |

### 12.2 Macierz 40 pytań (5 typów)

| Trudność | CS     | CM     | SA     | SN    | ES    | Suma   |
| -------- | ------ | ------ | ------ | ----- | ----- | ------ |
| 1        | 5      | 2      | 1      | 0     | 0     | **8**  |
| 2        | 4      | 3      | 2      | 0     | 0     | **9**  |
| 3        | 3      | 2      | 3      | 1     | 0     | **9**  |
| 4        | 2      | 2      | 2      | 2     | 1     | **9**  |
| 5        | 1      | 1      | 2      | 1     | 0     | **5**  |
| **Suma** | **15** | **10** | **10** | **4** | **1** | **40** |

### 12.3 Macierz 30 pytań (5 typów)

| Trudność | CS     | CM    | SA    | SN    | ES    | Suma   |
| -------- | ------ | ----- | ----- | ----- | ----- | ------ |
| 1        | 4      | 2     | 0     | 0     | 0     | **6**  |
| 2        | 3      | 2     | 2     | 0     | 0     | **7**  |
| 3        | 2      | 2     | 2     | 1     | 0     | **7**  |
| 4        | 2      | 1     | 2     | 1     | 1     | **7**  |
| 5        | 1      | 0     | 1     | 0     | 1     | **3**  |
| **Suma** | **12** | **7** | **7** | **2** | **2** | **30** |

---

## SEKCJA 13: ZALECANA PROPORCJA SUB-FORMATÓW W 50 PYTANIACH

Dla urozmaicenia sesji nauki, zalecany mix sub-formatów wewnątrz 50 pytań:

| Sub-format                                        | Ile   | W ramach którego type |
| ------------------------------------------------- | ----- | --------------------- |
| CLOSED_SINGLE standard                            | 14-16 | CS (20 total)         |
| CLOSED_SINGLE z sourceText/sentence               | 4-6   | CS                    |
| CLOSED_MULTIPLE standard (checkboxy)              | 6-8   | CM (12 total)         |
| CLOSED_MULTIPLE matching                          | 2-3   | CM                    |
| CLOSED_MULTIPLE gap-fill                          | 2-3   | CM                    |
| SHORT_ANSWER standard                             | 6-8   | SA (12 total)         |
| SHORT_ANSWER z words/phrase/slogan/transformation | 3-4   | SA                    |
| SHORT_ANSWER multi-step                           | 1-2   | SA                    |
| SYNTHESIS_NOTE z topic+requirements               | 4     | SN (4 total)          |
| ESSAY z thesis+structure                          | 2     | ES (2 total)          |

**WAŻNE:** Sub-formaty NIE zmieniają enum type w Prisma. Matching to nadal CLOSED_MULTIPLE. Gap-fill to nadal CLOSED_MULTIPLE. AI musi ustawić prawidłowy `type` + odpowiednie pola w `content`.

---

## SEKCJA 14: JAKOŚĆ DYSTRAKTORÓW — KLUCZOWE ZASADY

### 14.1 Hierarchia dystraktorów

| Poziom | Typ                                         | Przykład (pytanie: "Dlaczego Marta odrzuciła Anzelma?")       |
| ------ | ------------------------------------------- | ------------------------------------------------------------- |
| A+     | Prawdziwy fakt o postaci, ale nie odpowiedź | "Bo rodzina zabroniła jej tego małżeństwa"                    |
| A      | Częsty błąd uczniów / popularny mit         | "Bo nie kochała go" (Anzelm tak myślał, ale Marta kochała)    |
| B      | Logicznie możliwe, ale nieprawdziwe         | "Bo Anzelm był wtedy ciężko chory" (choroba przyszła później) |
| C      | Zbyt oczywiste                              | "Bo wolała wyjść za Benedykta"                                |
| F      | Absurdalne                                  | "Bo nie lubiła jego kota"                                     |

**Zasada:** Min. 2 dystraktory na poziomie A+ lub A.

### 14.2 Techniki tworzenia dobrych dystraktorów

1. **Popularny błąd:** To, co uczniowie najczęściej mylą
2. **Częściowa prawda:** Stwierdzenie prawdziwe w innym kontekście
3. **Odwrócenie przyczyny:** Zamiana przyczyny i skutku
4. **Inny bohater:** Przypisanie cechy postaci X postaci Y

---

## SEKCJA 15: CHECKLIST KOŃCOWY DLA AI

### Walidacja formalna

- [ ] Łączna liczba pytań = target (50/40/30)
- [ ] Rozkład typów zgodny z macierzą
- [ ] Rozkład trudności zgodny z macierzą
- [ ] `epoch` — wartość z enum Prisma (nie "REALISM")
- [ ] `work` — identyczna nazwa we WSZYSTKICH pytaniach
- [ ] `correctAnswer` — prawidłowy typ dla danego `type` i sub-formatu
- [ ] CLOSED_SINGLE: `content.options` = dokładnie 4, correctAnswer = number 0-3
- [ ] CLOSED_MULTIPLE standard: `content.options` = dokładnie 4, correctAnswer = number[] (2-3 elementów)
- [ ] CLOSED_MULTIPLE matching: `content.matchingType` + `leftColumn` + `rightColumn` (obiekty z id+text), correctAnswer = tablica par
- [ ] CLOSED_MULTIPLE gap-fill: `content.textWithGaps` + `content.gaps`, correctAnswer = tablica indexów
- [ ] ESSAY: category === "WRITING", difficulty >= 4

### Walidacja merytoryczna

- [ ] Brak pytań z odpowiedzią w treści
- [ ] Brak duplikatów treści
- [ ] Polskie znaki poprawne
- [ ] Każdy explanation uzasadnia odpowiedź (nie powtarza pytania)
- [ ] Dystraktory wiarygodne (min. poziom B)
- [ ] Pozycja correctAnswer zrandomizowana
- [ ] Pytania pokrywają checklist tematyczny (Sekcja 3.4)
- [ ] Mix sub-formatów obecny (Sekcja 13)
