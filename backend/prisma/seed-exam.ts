// backend/prisma/seed-exam.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting exam seed...");

  try {
    // Usuń stare egzaminy
    await prisma.mockExam.deleteMany({});
    console.log("✅ Cleared old exams");

    // PODSTAWOWY - tylko struktura
    const podstawowy = await prisma.mockExam.create({
      data: {
        title: "Egzamin Maturalny - Poziom Podstawowy",
        year: 2025,
        type: "PODSTAWOWY",
        duration: 240,
        isActive: true,
      },
    });
    console.log("✅ Created:", podstawowy.title);

    // ROZSZERZONY - tylko struktura
    const rozszerzony = await prisma.mockExam.create({
      data: {
        title: "Egzamin Maturalny - Poziom Rozszerzony",
        year: 2025,
        type: "ROZSZERZONY",
        duration: 300,
        isActive: true,
      },
    });
    console.log("✅ Created:", rozszerzony.title);

    // Sprawdź czy są w bazie
    const count = await prisma.mockExam.count();
    console.log(`📊 Total exams in database: ${count}`);
  } catch (error) {
    console.error("❌ ERROR:", error);
  }
}

main()
  .then(() => {
    console.log("✅ Seed completed");
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  });
