// backend/src/data/examTasks.ts

export const PRZYKLADOWE_ZADANIA_JEZYKOWE = [
  {
    typ: "WYJASNIENIE_SENSU",
    polecenie: "Na podstawie tekstu wyjaśnij sens zdania: [cytat]",
    punkty: 1,
    ocena: {
      kryteria: [
        "Zrozumienie metafory/przenośni",
        "Odniesienie do kontekstu",
        "Poprawność językowa",
      ],
    },
  },
  {
    typ: "ROZSTRZYGNIECIE",
    polecenie:
      "Rozstrzygnij, czy [teza]. W uzasadnieniu odwołaj się do obu tekstów.",
    punkty: 2,
    ocena: {
      kryteria: [
        "Poprawne rozstrzygnięcie (0-1)",
        "Uzasadnienie z odwołaniem do tekstów (0-1)",
      ],
    },
  },
  {
    typ: "NOTATKA_SYNTETYZUJACA",
    polecenie:
      "Na podstawie obu tekstów napisz notatkę syntetyzującą na temat: [temat]. 60-90 wyrazów.",
    punkty: 4,
    ocena: {
      kryteria: [
        "Synteza informacji z obu tekstów (0-2)",
        "Zachowanie limitu słów (0-1)",
        "Poprawność językowa (0-1)",
      ],
    },
  },
];

export const PRZYKLADOWE_ZADANIA_HISTORYCZNOLITERACKIE = [
  {
    typ: "PRZYPORZADKOWANIE",
    polecenie: "Przyporządkuj fragmenty do postaci mitologicznych",
    opcje: ["Herakles", "Charon", "Syzyf", "Ikar"],
    fragmenty: [
      /* fragmenty wierszy */
    ],
  },
  {
    typ: "ANALIZA_FRAGMENTU",
    fragment: "fragment",
    zadania: [
      "Wyjaśnij symbolikę [element]",
      "Wskaż środki stylistyczne",
      "Określ epokę i uzasadnij",
    ],
  },
];
