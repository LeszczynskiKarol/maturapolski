// backend/prisma/seed-exam.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedMockExam() {
  console.log("🎓 Creating Mock Exam 2024...");

  try {
    // Sprawdź czy są zadania w bazie
    const exercises = await prisma.exercise.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    });

    console.log(`Found ${exercises.length} exercises in database`);

    if (exercises.length < 20) {
      console.warn("⚠️ Not enough exercises in database! Need at least 20.");
      console.log("Please run the main seed first: npm run seed");
      return;
    }

    // Sprawdź czy egzamin już istnieje
    const existingExam = await prisma.mockExam.findFirst({
      where: {
        title: "Próbna Matura 2024 - Język Polski (poziom podstawowy)",
      },
    });

    if (existingExam) {
      console.log("✅ Mock exam already exists, skipping...");
      return;
    }

    // Filtruj zadania po typach
    const closedSingleExercises = exercises.filter(
      (e) => e.type === "CLOSED_SINGLE" && e.category === "HISTORICAL_LITERARY"
    );
    const shortAnswerExercises = exercises.filter(
      (e) => e.type === "SHORT_ANSWER" && e.category === "LANGUAGE_USE"
    );
    const essayExercises = exercises.filter((e) => e.type === "ESSAY");

    console.log(
      `Found ${closedSingleExercises.length} CLOSED_SINGLE exercises`
    );
    console.log(`Found ${shortAnswerExercises.length} SHORT_ANSWER exercises`);
    console.log(`Found ${essayExercises.length} ESSAY exercises`);

    const mockExam = await prisma.mockExam.create({
      data: {
        title: "Próbna Matura 2024 - Język Polski (poziom podstawowy)",
        year: 2024,
        type: "PODSTAWOWY",
        duration: 170, // 170 minut
        isActive: true,
        sections: {
          create: [
            {
              order: 1,
              title: "Test historycznoliteracki",
              instruction: `W zadaniach od 1. do 15. wybierz poprawną odpowiedź i zaznacz ją.
              
UWAGA: Za każde poprawnie rozwiązane zadanie otrzymasz 1 punkt.`,
              timeLimit: 45,
              questions: {
                create: Array.from({ length: 15 }, (_, i) => {
                  const exercise =
                    closedSingleExercises[i % closedSingleExercises.length];

                  return {
                    order: i + 1,
                    exerciseId: exercise?.id || null,
                    points: 1,
                    type: "CLOSED_SINGLE" as const,
                    question: exercise
                      ? undefined
                      : `Zadanie ${i + 1} - test historycznoliteracki`,
                  };
                }),
              },
            },
            {
              order: 2,
              title: "Język polski w użyciu",
              instruction: `Przeczytaj uważnie podany tekst, a następnie wykonaj zadania.

Zadania 16-20 odnoszą się do podanego tekstu.`,
              timeLimit: 25,
              questions: {
                create: Array.from({ length: 5 }, (_, i) => {
                  const exercise =
                    shortAnswerExercises[
                      i % Math.max(1, shortAnswerExercises.length)
                    ];

                  return {
                    order: 16 + i,
                    exerciseId: exercise?.id || null,
                    points: i < 3 ? 1 : 2,
                    type: "SHORT_ANSWER" as const,
                    question: exercise
                      ? undefined
                      : `Zadanie ${16 + i} - język w użyciu`,
                  };
                }),
              },
            },
            {
              order: 3,
              title: "Wypracowanie",
              instruction: `Wybierz jeden z dwóch tematów i napisz wypracowanie.

Temat 1: Rozprawka
Temat 2: Interpretacja utworu poetyckiego

Twoja praca powinna liczyć co najmniej 400 słów.`,
              timeLimit: 100,
              questions: {
                create: [
                  {
                    order: 21,
                    exerciseId: essayExercises[0]?.id || null,
                    type: "ESSAY" as const,
                    question: essayExercises[0]
                      ? undefined
                      : `Wybierz jeden temat:

TEMAT 1: 
Czy warto poświęcać własne szczęście dla dobra innych? 
Rozważ problem i uzasadnij swoje stanowisko, odwołując się do lektury obowiązkowej 
oraz innych tekstów kultury. Twoja praca powinna liczyć co najmniej 400 słów.

TEMAT 2:
Dokonaj interpretacji wiersza Wisławy Szymborskiej "Nic dwa razy". 
W swojej pracy uwzględnij analizę środków stylistycznych oraz 
przedstaw własne rozumienie przesłania utworu.`,
                    content: {
                      topics: [
                        {
                          id: 1,
                          text: "Czy warto poświęcać własne szczęście dla dobra innych?",
                          requiredText: "Lalka",
                          contexts: ["filozoficzny", "społeczny"],
                        },
                        {
                          id: 2,
                          text: "Interpretacja wiersza Wisławy Szymborskiej",
                          requiredText: null,
                          contexts: ["literacki"],
                        },
                      ],
                    },
                    points: 35,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    console.log("✅ Mock Exam created:", mockExam.title);

    // Dodaj więcej przykładowych egzaminów
    const additionalExams = [
      {
        title: "Próbna Matura - Termin Zimowy 2025",
        year: 2025,
        type: "PODSTAWOWY" as const,
      },
      {
        title: "Egzamin Diagnostyczny - Poziom Rozszerzony",
        year: 2024,
        type: "ROZSZERZONY" as const,
        duration: 180,
      },
    ];

    for (const examData of additionalExams) {
      const existing = await prisma.mockExam.findFirst({
        where: { title: examData.title },
      });

      if (!existing) {
        await prisma.mockExam.create({
          data: {
            ...examData,
            duration: examData.duration || 170,
            isActive: true,
            sections: {
              create: [],
            },
          },
        });
        console.log(`✅ Created: ${examData.title}`);
      }
    }

    console.log("✅ All mock exams seeded successfully");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

async function main() {
  try {
    await seedMockExam();
  } catch (error) {
    console.error("Error seeding mock exams:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
