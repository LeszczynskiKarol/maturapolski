// backend/src/services/matureExamService.ts

import { prisma } from "../lib/prisma";
import { TaskType } from "../types/exam.types";

export class MatureExamService {
  async createMatureExam2025() {
    // TEKSTY ŹRÓDŁOWE dla części językowej
    const teksty = [
      {
        id: "text-sagan",
        autor: "Carl Sagan",
        tytul: "Błękitna kropka",
        fragment: `Nasi dalecy przodkowie, gdy obserwowali „gwiazdy", zauważyli, że pięć z nich
zachowuje się odmiennie niż pozostałe. W odróżnieniu od tak zwanych gwiazd stałych,
wschodzących i zachodzących w niewzruszonym porządku, ruch tamtej piątki był dziwnie
skomplikowany. Z upływem miesięcy „gwiazdy" wędrowały powoli wśród innych, niekiedy
nawet zataczały pętle. Dzisiaj te ciała nazywamy planetami, od greckiego słowa planetes,
które oznacza „wędrujący". Wyobrażam sobie, że naszym przodkom taka cecha musiała się
wydać bardzo bliska.

Dziś wiemy, że planety są nie gwiazdami, lecz ciałami niebieskimi, które – tak jak
Ziemia – krążą wokół Słońca, utrzymywane siłą jego grawitacji.

Nikogo na Ziemi, nawet najbogatszych ludzi, nie stać na razie na taką podróż. Nie
możemy po prostu spakować się i wyruszyć na Marsa lub na Tytana.`,
      },
      {
        id: "text-trepczynska",
        autor: "Marta Trepczyńska",
        tytul: "Ziemia 2.0 – poszukiwania nadal trwają",
        fragment: `Czy ludzie mogą żyć na innej planecie niż Ziemia? W NASA od kilkudziesięciu lat trwają
intensywne badania, mające na celu coraz głębszą eksplorację kosmosu i znalezienie
odpowiedzi na pytanie, czy na jakiejkolwiek innej planecie mogły w przeszłości bądź mogą
w przyszłości istnieć warunki dla przetrwania roślin i ludzi.

Planetą najlepiej zbadaną przez człowieka jest oczywiście Mars, a o planach jego
kolonizacji poważnie wypowiadali się wybitni naukowcy, np. Stephen Hawking. Badania
potwierdzają istnienie na Marsie wody oraz prawdopodobnie innych substancji chemicznych
niezbędnych do życia.`,
      },
    ];

    // STRUKTURA EGZAMINU MATURALNEGO 2025
    const exam = await prisma.mockExam.create({
      data: {
        title: "Egzamin Maturalny 2025 - Język Polski (poziom podstawowy)",
        year: 2025,
        type: "PODSTAWOWY",
        duration: 240, // 4 godziny
        isActive: true,
        sections: {
          create: [
            {
              order: 1,
              title: "ARKUSZ 1. Test - Część 1: Język polski w użyciu",
              instruction:
                "Przeczytaj uważnie teksty, a następnie wykonaj zadania. Odpowiadaj tylko na podstawie tekstów.",
              timeLimit: 45,
              questions: {
                create: [
                  {
                    order: 1,
                    type: "SHORT_ANSWER",
                    question:
                      "Na podstawie tekstu Carla Sagana wyjaśnij sens zdania: „Rozpoczęliśmy wędrówkę pośród «wędrowców»",
                    points: 1,
                    content: {
                      taskType: TaskType.WYJASNIENIE_SENSU,
                      tekstZrodlowy: "text-sagan",
                      polecenie:
                        "Wyjaśnij sens zdania w kontekście całego fragmentu",
                      wymagania: {
                        minSlow: 30,
                        maxSlow: 100,
                      },
                    },
                  },
                  {
                    order: 2,
                    type: "SHORT_ANSWER",
                    question:
                      "Rozstrzygnij, czy w tekście Carla Sagana i w tekście Marty Trepczyńskiej jest mowa o takiej samej przyczynie zainteresowania kosmosem.",
                    points: 2,
                    content: {
                      taskType: TaskType.ROZSTRZYGNIECIE,
                      tekstZrodlowy: ["text-sagan", "text-trepczynska"],
                      polecenie:
                        "Rozstrzygnij i uzasadnij swoją odpowiedź odwołując się do obu tekstów",
                      wymagania: {
                        wymagaUzasadnienia: true,
                        liczbaArgumentow: 2,
                      },
                    },
                  },
                  {
                    order: 3,
                    type: "SHORT_ANSWER",
                    question:
                      "Wyjaśnij, dlaczego zgodnie z tekstem Carla Sagana nie możemy po prostu spakować się i wyruszyć na Marsa.",
                    points: 2,
                    content: {
                      taskType: TaskType.POROWNANIE_TEKSTOW,
                      tekstZrodlowy: ["text-sagan", "text-trepczynska"],
                      polecenie:
                        "Porównaj ograniczenia przedstawione w obu tekstach",
                    },
                  },
                  {
                    order: 4,
                    type: "SYNTHESIS_NOTE",
                    question: "Oceń prawdziwość podanych stwierdzeń.",
                    points: 1,
                    content: {
                      taskType: TaskType.NOTATKA_SYNTETYZUJACA,
                      statements: [
                        {
                          text: "Czasowniki w pierwszej osobie liczby mnogiej w tekście Sagana służą zmniejszeniu dystansu między autorem a czytelnikami.",
                          correct: true,
                        },
                        {
                          text: "W sformułowaniu 'dzień na Księżycu trwa dwa ziemskie tygodnie' zastosowano przymiotnik wartościujący.",
                          correct: false,
                        },
                      ],
                    },
                  },
                  {
                    order: 5,
                    type: "CLOSED_MULTIPLE",
                    question:
                      "Na podstawie obu tekstów napisz notatkę syntetyzującą na temat: odkrywanie kosmosu jako potrzeba człowieka.",
                    points: 4,
                    content: {
                      taskType: TaskType.PRZYPORZADKOWANIE,
                      tekstZrodlowy: ["text-sagan", "text-trepczynska"],
                      polecenie:
                        "Twoja wypowiedź powinna liczyć 60-90 wyrazów.",
                      wymagania: {
                        minSlow: 60,
                        maxSlow: 90,
                      },
                    },
                  },
                ],
              },
            },
            {
              order: 2,
              title: "ARKUSZ 1. Test - Część 2: Test historycznoliteracki",
              instruction:
                "Wykonaj zadania. Odpowiadaj tylko własnymi słowami.",
              timeLimit: 45,
              questions: {
                create: [
                  {
                    order: 6,
                    type: "SHORT_ANSWER",
                    question:
                      "Do których postaci mitologicznych nawiązują fragmenty wierszy?",
                    points: 1,
                    content: {
                      taskType: TaskType.ANALIZA_FRAGMENTU,
                      opcje: ["Herakles", "Charon", "Syzyf", "Ikar"],
                      fragmenty: [
                        {
                          id: "A",
                          tekst:
                            "Jest pracowity, silny i wytrwały,\nLwia skóra nagie barki mu pokrywa",
                          autor: "Adam Asnyk",
                        },
                        {
                          id: "B",
                          tekst:
                            "Był taki młody nie rozumiał że skrzydła są tylko przenośnią",
                          autor: "Zbigniew Herbert",
                        },
                      ],
                    },
                  },
                  {
                    order: 7,
                    type: "ESSAY",
                    question:
                      "Wyjaśnij, czym się różni postawa życiowa zalecana w Rozmowie Mistrza Polikarpa ze Śmiercią od postawy w Wiośnie Morsztyna.",
                    points: 1,
                    content: {
                      taskType: TaskType.ANALIZA_FRAGMENTU,
                      fragmenty: [
                        {
                          tytul: "Rozmowa Mistrza Polikarpa ze Śmiercią",
                          tekst:
                            "Chowali tu żywot swoj ciasno,\nAlić jich sirca nad słońce jasno",
                        },
                        {
                          tytul: "Wiosna",
                          autor: "Jan Andrzej Morsztyn",
                          tekst:
                            "Spieszmy się, spieszmy, niż nas czas nadgoni\nI śmierć, której się dobra myśl nie schroni",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              order: 3,
              title: "ARKUSZ 2. Wypracowanie",
              instruction:
                "Wybierz jeden z dwóch tematów i napisz wypracowanie.",
              timeLimit: 150,
              questions: {
                create: [
                  {
                    order: 15,
                    type: "ESSAY",
                    question: "Wybierz temat",
                    points: 35,
                    content: {
                      tematy: [
                        {
                          numer: 1,
                          tytul:
                            "Źródło nadziei w czasach trudnych dla człowieka",
                          polecenie:
                            "W pracy odwołaj się do lektury obowiązkowej, innego utworu literackiego oraz wybranych kontekstów.",
                          wymagania: {
                            minSlow: 400,
                            lekturaObowiazkowa: true,
                            innyUtworLiteracki: true,
                          },
                        },
                        {
                          numer: 2,
                          tytul:
                            "Jak błędna ocena sytuacji wpływa na życie człowieka?",
                          polecenie:
                            "W pracy odwołaj się do lektury obowiązkowej, innego utworu literackiego oraz wybranych kontekstów.",
                          wymagania: {
                            minSlow: 400,
                            lekturaObowiazkowa: true,
                            innyUtworLiteracki: true,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });

    // Dodaj teksty źródłowe do bazy
    for (const tekst of teksty) {
      await prisma.textSource.create({
        data: {
          id: tekst.id,
          autor: tekst.autor,
          tytul: tekst.tytul,
          fragment: tekst.fragment,
          examId: exam.id,
        },
      });
    }

    return exam;
  }
}
