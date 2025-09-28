// backend/prisma/seed-all.ts npm run seed:all

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting complete database seed...");

  try {
    // Importuj i uruchom główny seed
    console.log("\n📚 Running main seed...");
    await import("./seed");

    // Poczekaj chwilę między seedami
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Importuj i uruchom seed materiałów
    console.log("\n📖 Running materials seed...");
    await import("./seed-materials");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Importuj i uruchom seed egzaminów
    console.log("\n📝 Running exam seed...");
    await import("./seed-exam");

    console.log("\n✅ All seeds completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
