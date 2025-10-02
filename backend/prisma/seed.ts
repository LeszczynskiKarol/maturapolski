// backend/prisma/seed.ts

import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Rozpoczynam seed bazy danych dla matura-polski.pl...");

  // =====================
  // 0. CZYSZCZENIE BAZY
  // =====================
  console.log("🗑️  Czyszczę bazę danych...");

  // Usuń w odpowiedniej kolejności (zależności)
  await prisma.dailyProgress.deleteMany();
  await prisma.studyGoal.deleteMany();
  await prisma.weeklyProgress.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.exerciseUsage.deleteMany();
  await prisma.spacedRepetition.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.learningSession.deleteMany();
  await prisma.examAnswer.deleteMany();
  await prisma.examSession.deleteMany();
  await prisma.userMaterialProgress.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.userLevelProgress.deleteMany();
  await prisma.aiUsage.deleteMany();
  await prisma.pointsPurchase.deleteMany();
  await prisma.subscription.deleteMany();

  // Usuń exercises
  await prisma.examQuestion.deleteMany();
  await prisma.exercise.deleteMany();

  // Usuń users
  await prisma.user.deleteMany();

  console.log("✅ Baza wyczyszczona");

  // =====================
  // 1. UŻYTKOWNICY
  // =====================
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const studentPassword = await bcrypt.hash("Student123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@matura-polski.pl" },
    update: {},
    create: {
      email: "admin@matura-polski.pl",
      password: adminPassword,
      username: "admin",
      emailVerified: true,
      role: "ADMIN",
      profile: {
        create: {
          studyStreak: 0,
          totalPoints: 0,
          averageScore: 0,
        },
      },
    },
  });

  const student1 = await prisma.user.upsert({
    where: { email: "jan.kowalski@example.com" },
    update: {},
    create: {
      email: "jan.kowalski@example.com",
      password: studentPassword,
      username: "jan_kowalski",
      emailVerified: true,
      role: "STUDENT",
      profile: {
        create: {
          examDate: new Date("2025-05-06"),
          preferredTopics: ["romantyzm", "pozytywizm", "składnia"],
          studyStreak: 15,
          totalPoints: 2450,
          averageScore: 82.5,
          level: 5,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "anna.nowak@example.com" },
    update: {},
    create: {
      email: "anna.nowak@example.com",
      password: studentPassword,
      username: "anna_nowak",
      emailVerified: true,

      role: "STUDENT",
      profile: {
        create: {
          examDate: new Date("2025-05-06"),
          preferredTopics: ["młoda polska", "środki stylistyczne"],
          studyStreak: 7,
          totalPoints: 1120,
          averageScore: 75.0,
          level: 3,
        },
      },
    },
  });

  console.log("✅ Utworzono użytkowników");

  const today = new Date();
  await prisma.dailyProgress.create({
    data: {
      userId: student1.id,
      date: today,
      exercisesCount: 15,
      studyTime: 120,
      averageScore: 82.5,
      notes: "Dobry dzień, skupienie na romantyzmie",
    },
  });

  console.log("\n🎉 Seed zakończony pomyślnie!");
  console.log("\n📚 Statystyki:");
  console.log(`   - Użytkownicy: 3`);
  console.log(`   - Zgłoszenia: 2`);
  console.log(`   - Oceny: 1`);

  console.log("\n🔑 Dane logowania:");
  console.log("   Admin: admin@matura-polski.pl / Admin123!");
  console.log("   Student 1: jan.kowalski@example.com / Student123!");
  console.log("   Student 2: anna.nowak@example.com / Student123!");
}

seed()
  .catch((e) => {
    console.error("❌ Błąd podczas seedowania:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
