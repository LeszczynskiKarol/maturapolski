// backend/src/routes/examStructure.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function examStructureRoutes(fastify: FastifyInstance) {
  // Middleware - tylko admin
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = await prisma.user.findUnique({
        where: { id: (request.user as any).userId },
      });
      if (user?.role !== "ADMIN") {
        reply.code(403).send({ error: "Forbidden" });
      }
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Pobierz wszystkie struktury egzaminów
  fastify.get("/", async (request, reply) => {
    const structures = await prisma.mockExam.findMany({
      where: {
        // Tylko egzaminy bez przypisanych pytań (struktury dynamiczne)
        sections: {
          every: {
            questions: {
              none: {},
            },
          },
        },
      },
      include: {
        sections: true,
        _count: {
          select: { sessions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Przekształć struktury do czytelnego formatu
    const formattedStructures = structures.map((exam) => ({
      id: exam.id,
      title: exam.title,
      year: exam.year,
      type: exam.type,
      duration: exam.duration,
      isActive: exam.isActive,
      sessionCount: exam._count.sessions,
      sections: exam.sections.map((section) => ({
        id: section.id,
        title: section.title,
        instruction: section.instruction,
        order: section.order,
        // Z metadata sekcji wyciągamy wymagania
        requirements: extractRequirementsFromMetadata(section),
      })),
    }));

    return reply.send(formattedStructures);
  });

  // Utwórz nową strukturę egzaminu
  fastify.post("/", async (request, reply) => {
    const data = request.body as any;

    // Tworzymy egzamin BEZ konkretnych pytań
    const structure = await prisma.mockExam.create({
      data: {
        title: data.title + " (Dynamiczny)",
        year: data.year,
        type: data.type,
        duration: data.duration,
        isActive: data.isActive ?? false,
        sections: {
          create: data.sections?.map((section: any, index: number) => ({
            order: index + 1,
            title: section.title,
            instruction: section.instruction,
            // NIE DODAJEMY pytań! Zamiast tego zapisujemy wymagania w metadata
            timeLimit: section.timeLimit,
          })),
        },
      },
    });

    // Zapisz wymagania pytań w osobnej tabeli lub jako metadata
    // Można stworzyć nową tabelę ExamStructureRequirements
    // lub użyć JSON w polu MockExam

    return reply.send({
      success: true,
      id: structure.id,
      message:
        "Struktura egzaminu utworzona. Pytania będą dobierane dynamicznie.",
    });
  });

  // Aktualizuj strukturę egzaminu
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as any;

    // Sprawdź czy to struktura dynamiczna
    const exam = await prisma.mockExam.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!exam) {
      return reply.code(404).send({ error: "Struktura nie znaleziona" });
    }

    // Jeśli egzamin ma przypisane pytania, to nie jest strukturą dynamiczną
    const hasQuestions = exam.sections.some((s) => s.questions.length > 0);
    if (hasQuestions) {
      return reply.code(400).send({
        error:
          "To nie jest dynamiczna struktura egzaminu. Nie można edytować egzaminów z przypisanymi pytaniami.",
      });
    }

    // Usuń stare sekcje
    await prisma.examSection.deleteMany({
      where: { examId: id },
    });

    // Zaktualizuj strukturę
    const updated = await prisma.mockExam.update({
      where: { id },
      data: {
        title: data.title,
        year: data.year,
        type: data.type,
        duration: data.duration,
        isActive: data.isActive,
        sections: {
          create: data.sections?.map((section: any, index: number) => ({
            order: index + 1,
            title: section.title,
            instruction: section.instruction,
            // Zapisz wymagania w metadata sekcji
            timeLimit: section.timeLimit,
          })),
        },
      },
    });

    return reply.send({
      success: true,
      message: "Struktura zaktualizowana",
      structure: updated,
    });
  });

  // Usuń strukturę egzaminu
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    // Sprawdź czy nie ma aktywnych sesji
    const activeSessions = await prisma.examSession.count({
      where: {
        examId: id,
        status: "IN_PROGRESS",
      },
    });

    if (activeSessions > 0) {
      return reply.code(400).send({
        error: "Nie można usunąć struktury z aktywnymi sesjami",
      });
    }

    await prisma.mockExam.delete({
      where: { id },
    });

    return reply.send({
      success: true,
      message: "Struktura egzaminu usunięta",
    });
  });

  // Aktywuj/dezaktywuj strukturę
  fastify.patch("/:id/toggle", async (request, reply) => {
    const { id } = request.params as { id: string };

    const exam = await prisma.mockExam.findUnique({
      where: { id },
    });

    if (!exam) {
      return reply.code(404).send({ error: "Struktura nie znaleziona" });
    }

    const updated = await prisma.mockExam.update({
      where: { id },
      data: {
        isActive: !exam.isActive,
      },
    });

    return reply.send({
      success: true,
      isActive: updated.isActive,
      message: updated.isActive
        ? "Struktura aktywowana"
        : "Struktura dezaktywowana",
    });
  });

  // Pobierz statystyki wykorzystania struktury
  fastify.get("/:id/stats", async (request, reply) => {
    const { id } = request.params as { id: string };

    const sessions = await prisma.examSession.findMany({
      where: { examId: id },
      select: {
        id: true,
        status: true,
        percentScore: true,
        startedAt: true,
        finishedAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { startedAt: "desc" },
    });

    const stats = {
      totalSessions: sessions.length,
      inProgress: sessions.filter((s) => s.status === "IN_PROGRESS").length,
      completed: sessions.filter((s) => s.status === "COMPLETED").length,
      averageScore:
        sessions
          .filter((s) => s.status === "COMPLETED" && s.percentScore)
          .reduce((sum, s) => sum + (s.percentScore || 0), 0) /
          sessions.filter((s) => s.status === "COMPLETED").length || 0,
      recentSessions: sessions.slice(0, 10),
    };

    return reply.send(stats);
  });

  // Duplikuj strukturę
  fastify.post("/:id/duplicate", async (request, reply) => {
    const { id } = request.params as { id: string };

    const original = await prisma.mockExam.findUnique({
      where: { id },
      include: {
        sections: true,
      },
    });

    if (!original) {
      return reply.code(404).send({ error: "Struktura nie znaleziona" });
    }

    const duplicate = await prisma.mockExam.create({
      data: {
        title: `${original.title} (kopia)`,
        year: original.year,
        type: original.type,
        duration: original.duration,
        isActive: false,
        sections: {
          create: original.sections.map((section) => ({
            order: section.order,
            title: section.title,
            instruction: section.instruction,
            timeLimit: section.timeLimit,
            // NIE kopiujemy pytań!
          })),
        },
      },
    });

    return reply.send({
      success: true,
      id: duplicate.id,
      message: "Struktura zduplikowana",
    });
  });
}

// Helper - wyciągnij wymagania z metadanych
function extractRequirementsFromMetadata(section: any) {
  // Tu możesz parsować metadata sekcji jeśli przechowujesz tam wymagania
  // Lub pobierać z dedykowanej tabeli
  return [];
}
