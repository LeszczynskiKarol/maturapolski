// backend/src/routes/exam.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { assessShortAnswerWithAI, assessEssayWithAI } from "../ai/aiService";
import { differenceInMinutes } from "date-fns";
import { ExerciseSelectionService } from "../services/exerciseSelectionService"; // DODAJ TEN IMPORT!

// Struktura zgodna z arkuszem maturalnym
const EXAM_STRUCTURE = {
  PODSTAWOWY: {
    duration: 170, // 170 minut
    sections: [
      {
        name: "Test",
        instruction:
          "Test składa się z 9 zadań zamkniętych (1-9) oraz 6 zadań otwartych krótkiej odpowiedzi (10-15).",
        questions: [
          {
            range: [1, 9],
            type: "CLOSED_SINGLE",
            points: 1,
            category: "HISTORICAL_LITERARY",
          },
          {
            range: [10, 15],
            type: "SHORT_ANSWER",
            points: 1,
            category: "LANGUAGE_USE",
          },
        ],
      },
      {
        name: "Wypracowanie",
        instruction: "Napisz wypracowanie na jeden z dwóch tematów.",
        questions: [
          { range: [16, 16], type: "ESSAY", points: 35, category: "WRITING" },
        ],
      },
    ],
  },
  ROZSZERZONY: {
    duration: 180,
    sections: [
      {
        name: "Część I",
        questions: [
          {
            range: [1, 15],
            type: "CLOSED_SINGLE",
            points: 1,
            category: "HISTORICAL_LITERARY",
          },
        ],
      },
      {
        name: "Część II",
        questions: [
          {
            range: [16, 20],
            type: "SHORT_ANSWER",
            points: 2,
            category: "LANGUAGE_USE",
          },
        ],
      },
      {
        name: "Wypracowanie",
        questions: [
          { range: [21, 21], type: "ESSAY", points: 40, category: "WRITING" },
        ],
      },
    ],
  },
};

export async function examRoutes(fastify: FastifyInstance) {
  // Auth middleware
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Pobierz dostępne egzaminy
  fastify.get("/available", async (request, reply) => {
    const exams = await prisma.mockExam.findMany({
      where: { isActive: true },
      include: {
        sections: {
          select: {
            id: true,
            title: true,
            questions: {
              select: { points: true },
            },
          },
        },
        sessions: {
          where: { userId: (request.user as any).userId },
          select: {
            id: true,
            status: true,
            percentScore: true,
            finishedAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Oblicz max punktów dla każdego egzaminu
    const examsWithStats = exams.map((exam) => {
      const totalPoints = exam.sections.reduce(
        (sum, section) =>
          sum + section.questions.reduce((sSum, q) => sSum + q.points, 0),
        0
      );

      const userSessions = exam.sessions;
      const bestScore = userSessions
        .filter((s) => s.status === "COMPLETED")
        .reduce((max, s) => Math.max(max, s.percentScore || 0), 0);

      return {
        ...exam,
        totalPoints,
        attemptCount: userSessions.length,
        bestScore: bestScore > 0 ? bestScore : null,
        hasActiveSession: userSessions.some((s) => s.status === "IN_PROGRESS"),
      };
    });

    return reply.send(examsWithStats);
  });

  fastify.get("/session/:sessionId/results", async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const userId = (request.user as any).userId;

    const session = await prisma.examSession.findFirst({
      where: {
        id: sessionId,
        userId,
        status: "COMPLETED",
      },
    });

    if (!session) {
      return reply.code(404).send({ error: "Wyniki niedostępne" });
    }

    return reply.send({
      sessionId: session.id,
      totalScore: session.totalScore,
      maxScore: session.maxScore,
      percentScore: session.percentScore,
      grade: getGrade(session.percentScore || 0),
      assessment: session.assessment,
      summary: generateExamSummary(session.percentScore || 0),
    });
  });

  // Rozpocznij egzamin
  fastify.post("/:examId/start", async (request, reply) => {
    const { examId } = request.params as { examId: string };
    const userId = (request.user as any).userId;

    const selectionService = new ExerciseSelectionService();

    // Pobierz egzamin
    const exam = await prisma.mockExam.findUnique({
      where: { id: examId },
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!exam) {
      return reply.code(404).send({ error: "Egzamin nie istnieje" });
    }

    // Jeśli egzamin nie ma przypisanych ćwiczeń, dobierz je dynamicznie
    for (const section of exam.sections) {
      for (const question of section.questions) {
        if (!question.exerciseId) {
          // Dobierz ćwiczenie dla tego pytania
          const exercises = await selectionService.getExercisesForExam(
            userId,
            question.type === "ESSAY"
              ? "WRITING"
              : question.type === "SHORT_ANSWER"
              ? "LANGUAGE_USE"
              : "HISTORICAL_LITERARY",
            question.type!,
            1,
            { min: 2, max: 5 } // Dostosuj trudność
          );

          if (exercises[0]) {
            // Zaktualizuj pytanie z wybranym ćwiczeniem
            await prisma.examQuestion.update({
              where: { id: question.id },
              data: { exerciseId: exercises[0].id },
            });

            // Zapisz użycie
            await selectionService.recordExerciseUsage(
              userId,
              exercises[0].id,
              "EXAM"
            );
          }
        }
      }
    }

    // Sprawdź czy nie ma aktywnej sesji
    const activeSession = await prisma.examSession.findFirst({
      where: {
        userId,
        examId,
        status: "IN_PROGRESS",
      },
    });

    if (activeSession) {
      return reply.code(400).send({
        error: "Masz już rozpoczętą sesję tego egzaminu",
        sessionId: activeSession.id,
      });
    }

    if (!exam) {
      return reply.code(404).send({ error: "Egzamin nie istnieje" });
    }

    // Oblicz max punktów
    const maxScore = exam.sections.reduce(
      (sum, section) =>
        sum + section.questions.reduce((sSum, q) => sSum + q.points, 0),
      0
    );

    // Utwórz nową sesję
    const session = await prisma.examSession.create({
      data: {
        userId,
        examId,
        status: "IN_PROGRESS",
        maxScore,
      },
    });

    return reply.send({
      sessionId: session.id,
      exam: {
        ...exam,
        maxScore,
        startedAt: session.startedAt,
      },
    });
  });

  // Pobierz aktywną sesję
  fastify.get("/session/:sessionId", async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const userId = (request.user as any).userId;

    const session = await prisma.examSession.findFirst({
      where: {
        id: sessionId,
        userId,
      },
      include: {
        exam: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    exercise: true,
                  },
                  orderBy: { order: "asc" },
                },
              },
              orderBy: { order: "asc" },
            },
          },
        },
        answers: true,
      },
    });

    if (!session) {
      return reply.code(404).send({ error: "Sesja nie istnieje" });
    }

    // Oblicz pozostały czas
    const elapsedMinutes = differenceInMinutes(new Date(), session.startedAt);
    const remainingMinutes = Math.max(
      0,
      session.exam.duration - elapsedMinutes
    );

    // Sprawdź timeout
    if (remainingMinutes === 0 && session.status === "IN_PROGRESS") {
      await prisma.examSession.update({
        where: { id: sessionId },
        data: { status: "TIMEOUT" },
      });
    }

    return reply.send({
      ...session,
      elapsedMinutes,
      remainingMinutes,
    });
  });

  // Zapisz odpowiedź
  fastify.post("/session/:sessionId/answer", async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const { questionId, answer } = request.body as {
      questionId: string;
      answer: any;
    };
    const userId = (request.user as any).userId;

    const session = await prisma.examSession.findFirst({
      where: {
        id: sessionId,
        userId,
        status: "IN_PROGRESS",
      },
    });

    if (!session) {
      return reply.code(400).send({ error: "Sesja nieaktywna" });
    }

    // Pobierz pytanie
    const question = await prisma.examQuestion.findUnique({
      where: { id: questionId },
      include: { exercise: true },
    });

    if (!question) {
      return reply.code(404).send({ error: "Pytanie nie istnieje" });
    }

    // Zapisz lub zaktualizuj odpowiedź
    const examAnswer = await prisma.examAnswer.upsert({
      where: {
        sessionId_questionId: {
          sessionId,
          questionId,
        },
      },
      create: {
        sessionId,
        questionId,
        answer,
        maxScore: question.points,
      },
      update: {
        answer,
        submittedAt: new Date(),
      },
    });

    return reply.send({ success: true, answerId: examAnswer.id });
  });

  // Zakończ egzamin i oceń
  fastify.post("/session/:sessionId/finish", async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const userId = (request.user as any).userId;

    const session = await prisma.examSession.findFirst({
      where: {
        id: sessionId,
        userId,
        status: "IN_PROGRESS",
      },
      include: {
        exam: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    exercise: true,
                  },
                },
              },
            },
          },
        },
        answers: true,
      },
    });

    if (!session) {
      return reply.code(400).send({ error: "Sesja nieaktywna" });
    }

    // Oceń wszystkie odpowiedzi
    let totalScore = 0;
    const assessmentDetails: any[] = [];

    for (const answer of session.answers) {
      const question = session.exam.sections
        .flatMap((s) => s.questions)
        .find((q) => q.id === answer.questionId);

      if (!question) continue;

      const exercise = question.exercise || question;
      let score = 0;
      let feedback: any = {};

      // Ocenianie w zależności od typu
      if (
        exercise.type === "CLOSED_SINGLE" ||
        exercise.type === "CLOSED_MULTIPLE"
      ) {
        // Pobierz poprawną odpowiedź z właściwego miejsca
        let correctAnswer: any = null;

        if (question.exercise) {
          // Jeśli jest powiązane ćwiczenie
          correctAnswer = question.exercise.correctAnswer;
        } else if (question.content) {
          // Jeśli jest własna treść pytania
          const content = question.content as any;
          correctAnswer = content.correctAnswer;
        }

        if (correctAnswer !== null) {
          const isCorrect =
            JSON.stringify(answer.answer) === JSON.stringify(correctAnswer);
          score = isCorrect ? question.points : 0;
          feedback = { correct: isCorrect };
        }
      } else if (exercise.type === "SHORT_ANSWER") {
        // Ocena AI - konwertuj answer na string jeśli trzeba
        const answerText =
          typeof answer.answer === "string"
            ? answer.answer
            : JSON.stringify(answer.answer);

        const questionText =
          question.exercise?.question ||
          question.question ||
          "Brak treści pytania";

        const aiResult = await assessShortAnswerWithAI(
          answerText,
          questionText,
          undefined,
          question.points
        );
        score = aiResult.score;
        feedback = aiResult;
      } else if (exercise.type === "ESSAY") {
        // Ocena wypracowania przez AI
        const answerText =
          typeof answer.answer === "string"
            ? answer.answer
            : JSON.stringify(answer.answer);

        const questionText =
          question.exercise?.question ||
          question.question ||
          "Napisz wypracowanie";

        const essayResult = await assessEssayWithAI(answerText, questionText, {
          minWords: 400,
        });
        score = Math.min(essayResult.totalScore, question.points);
        feedback = essayResult;
      }

      // Zapisz ocenę
      await prisma.examAnswer.update({
        where: { id: answer.id },
        data: { score },
      });

      totalScore += score;
      assessmentDetails.push({
        questionId: question.id,
        questionOrder: question.order,
        score,
        maxScore: question.points,
        feedback,
      });
    }

    // Oblicz procent
    const maxScore = session.exam.sections.reduce(
      (sum, section) =>
        sum + section.questions.reduce((sSum, q) => sSum + q.points, 0),
      0
    );
    const percentScore = Math.round((totalScore / maxScore) * 100);

    // Zaktualizuj sesję
    const finishedSession = await prisma.examSession.update({
      where: { id: sessionId },
      data: {
        status: "COMPLETED",
        finishedAt: new Date(),
        timeSpent: differenceInMinutes(new Date(), session.startedAt) * 60,
        totalScore,
        percentScore,
        assessment: {
          details: assessmentDetails,
          summary: generateExamSummary(percentScore),
        },
      },
    });

    // Dodaj punkty do profilu użytkownika
    await prisma.userProfile.update({
      where: { userId },
      data: {
        totalPoints: { increment: Math.round(totalScore) },
      },
    });

    return reply.send({
      sessionId: finishedSession.id,
      totalScore,
      maxScore,
      percentScore,
      grade: getGrade(percentScore),
      assessment: assessmentDetails,
      summary: generateExamSummary(percentScore),
    });
  });

  // Historia egzaminów
  fastify.get("/history", async (request, reply) => {
    const userId = (request.user as any).userId;

    const sessions = await prisma.examSession.findMany({
      where: {
        userId,
        status: "COMPLETED",
      },
      include: {
        exam: {
          select: {
            title: true,
            type: true,
            year: true,
          },
        },
      },
      orderBy: { finishedAt: "desc" },
      take: 20,
    });

    return reply.send(sessions);
  });
}

// Funkcje pomocnicze
function getGrade(percentScore: number): string {
  if (percentScore >= 90) return "Celujący (6)";
  if (percentScore >= 75) return "Bardzo dobry (5)";
  if (percentScore >= 60) return "Dobry (4)";
  if (percentScore >= 45) return "Dostateczny (3)";
  if (percentScore >= 30) return "Dopuszczający (2)";
  return "Niedostateczny (1)";
}

function generateExamSummary(percentScore: number): any {
  const level =
    percentScore >= 75 ? "wysoki" : percentScore >= 50 ? "średni" : "niski";

  return {
    level,
    message:
      percentScore >= 30
        ? `Gratulacje! Zdałeś egzamin z wynikiem ${percentScore}%`
        : `Niestety nie udało się zdać egzaminu. Twój wynik to ${percentScore}%`,
    strengths:
      percentScore >= 60
        ? ["Dobra znajomość lektur", "Poprawna argumentacja"]
        : [],
    improvements:
      percentScore < 75
        ? [
            "Więcej pracy nad analizą tekstów",
            "Rozszerzenie słownictwa literackiego",
          ]
        : [],
  };
}
