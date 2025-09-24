// backend/src/routes/exam.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { assessShortAnswerWithAI, assessEssayWithAI } from "../ai/aiService";
import { differenceInMinutes } from "date-fns";
import { IntelligentExamService } from "../services/intelligentExamService";
import { ExerciseSelectionService } from "../services/exerciseSelectionService";

export async function examRoutes(fastify: FastifyInstance) {
  // Auth middleware
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  const intelligentExamService = new IntelligentExamService();
  const exerciseSelectionService = new ExerciseSelectionService();

  // STARA FUNKCJA - dla kompatybilności wstecznej
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

  // NOWY ENDPOINT - typy egzaminów (dynamiczne)
  fastify.get("/available-types", async (request, reply) => {
    const examTypes = [
      {
        id: "matura-podstawowa-2025",
        title: "Matura 2025 - Poziom Podstawowy",
        type: "PODSTAWOWY",
        duration: 240,
        estimatedPoints: 55,
        description:
          "Egzamin na poziomie podstawowym z dynamicznym doborem pytań",
        structure: {
          sections: [
            {
              name: "Język polski w użyciu",
              questionCount: 5,
              estimatedPoints: 8,
            },
            {
              name: "Test historycznoliteracki",
              questionCount: 15,
              estimatedPoints: 15,
            },
            {
              name: "Wypracowanie",
              questionCount: 1,
              estimatedPoints: 35,
            },
          ],
        },
      },
      {
        id: "matura-rozszerzona-2025",
        title: "Matura 2025 - Poziom Rozszerzony",
        type: "ROZSZERZONY",
        duration: 300,
        estimatedPoints: 70,
        description:
          "Egzamin na poziomie rozszerzonym z dynamicznym doborem pytań",
        structure: {
          sections: [
            {
              name: "Język polski w użyciu",
              questionCount: 6,
              estimatedPoints: 14,
            },
            {
              name: "Test historycznoliteracki",
              questionCount: 17,
              estimatedPoints: 21,
            },
            {
              name: "Wypracowanie",
              questionCount: 1,
              estimatedPoints: 40,
            },
          ],
        },
      },
    ];

    // Pobierz historię sesji użytkownika
    const userId = (request.user as any).userId;
    const userSessions = await prisma.examSession.findMany({
      where: { userId },
      select: {
        id: true,
        status: true,
        percentScore: true,
        startedAt: true, // Zmienione z createdAt
        finishedAt: true,
        assessment: true,
      },
      orderBy: { startedAt: "desc" }, // Zmienione z createdAt
    });

    // Dodaj statystyki do każdego typu egzaminu
    const typesWithStats = examTypes.map((examType) => {
      const typeSessions = userSessions.filter((s) => {
        const assessment = s.assessment as any;
        return assessment?.examTypeId === examType.id;
      });

      const completedSessions = typeSessions.filter(
        (s) => s.status === "COMPLETED"
      );
      const bestScore = completedSessions.reduce(
        (max, s) => Math.max(max, s.percentScore || 0),
        0
      );

      return {
        ...examType,
        attemptCount: typeSessions.length,
        bestScore: bestScore > 0 ? bestScore : null,
        hasActiveSession: typeSessions.some((s) => s.status === "IN_PROGRESS"),
        lastActiveSessionId: typeSessions.find(
          (s) => s.status === "IN_PROGRESS"
        )?.id,
      };
    });

    return reply.send(typesWithStats);
  });

  // STARA FUNKCJA start egzaminu - dla kompatybilności
  fastify.post("/:examId/start", async (request, reply) => {
    const { examId } = request.params as { examId: string };
    const userId = (request.user as any).userId;

    // Pobierz egzamin
    const exam = await prisma.mockExam.findUnique({
      where: { id: examId },
      include: {
        sections: {
          include: {
            questions: true,
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!exam) {
      return reply.code(404).send({ error: "Egzamin nie istnieje" });
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

    // Sprawdź czy egzamin ma przypisane pytania
    const hasQuestions = exam.sections.some((s) => s.questions.length > 0);

    if (!hasQuestions) {
      // Egzamin bez pytań - użyj dynamicznego doboru
      const selectedQuestions =
        await intelligentExamService.selectQuestionsForExam(
          userId,
          exam.type as "PODSTAWOWY" | "ROZSZERZONY"
        );

      let maxScore = 0;
      const questionsMetadata: any[] = [];

      // Tworzymy tymczasowe pytania dla sesji
      for (const section of exam.sections) {
        const sectionKey = mapSectionToKey(section.title);
        const questions = selectedQuestions.get(sectionKey) || [];

        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];

          await prisma.examQuestion.create({
            data: {
              sectionId: section.id,
              order: i + 1,
              exerciseId: q.id,
              type: q.type,
              points: q.points,
              question: q.question,
              content: q.content || {},
            },
          });

          maxScore += q.points;
          questionsMetadata.push({
            exerciseId: q.id,
            section: sectionKey,
            points: q.points,
          });
        }
      }

      // Zapisz użycie pytań
      const allQuestionIds = Array.from(selectedQuestions.values())
        .flat()
        .map((q) => q.id);

      await intelligentExamService.recordExamUsage(
        userId,
        examId, // Używamy examId tymczasowo
        allQuestionIds
      );

      // Utwórz sesję
      const session = await prisma.examSession.create({
        data: {
          userId,
          examId,
          status: "IN_PROGRESS",
          maxScore,
          assessment: {
            intelligentSelection: true,
            questionsMetadata,
            selectionDate: new Date().toISOString(),
          },
        },
      });

      return reply.send({
        sessionId: session.id,
        exam: {
          ...exam,
          maxScore,
          startedAt: session.startedAt,
          isIntelligent: true,
        },
      });
    } else {
      // Standardowe pytania
      const maxScore = exam.sections.reduce(
        (sum, section) =>
          sum + section.questions.reduce((sSum, q) => sSum + q.points, 0),
        0
      );

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
          isIntelligent: false,
        },
      });
    }
  });

  // NOWY ENDPOINT - start dynamicznego egzaminu
  fastify.post("/start-dynamic/:examTypeId", async (request, reply) => {
    const { examTypeId } = request.params as { examTypeId: string };
    const userId = (request.user as any).userId;

    // Sprawdź aktywne sesje
    const activeSessions = await prisma.examSession.findMany({
      where: {
        userId,
        status: "IN_PROGRESS",
      },
    });

    const hasActiveOfType = activeSessions.some((s) => {
      const assessment = s.assessment as any;
      return assessment?.examTypeId === examTypeId;
    });

    if (hasActiveOfType) {
      const activeSession = activeSessions.find((s) => {
        const assessment = s.assessment as any;
        return assessment?.examTypeId === examTypeId;
      });

      return reply.code(400).send({
        error: "Masz już aktywną sesję tego typu egzaminu",
        sessionId: activeSession?.id,
      });
    }

    // Określ typ egzaminu
    const examType = examTypeId.includes("rozszerzon")
      ? "ROZSZERZONY"
      : "PODSTAWOWY";

    // Pobierz dynamicznie dobrane pytania
    const selectedQuestions =
      await intelligentExamService.selectQuestionsForExam(
        userId,
        examType as "PODSTAWOWY" | "ROZSZERZONY"
      );

    let maxScore = 0;
    const questionsMetadata: any[] = [];

    selectedQuestions.forEach((questions, sectionKey) => {
      questions.forEach((q) => {
        maxScore += q.points;
        questionsMetadata.push({
          exerciseId: q.id,
          section: sectionKey,
          points: q.points,
          type: q.type,
        });
      });
    });

    // Utwórz fałszywy egzamin lub użyj istniejącego szablonu
    let examId = "DYNAMIC";
    const templateExam = await prisma.mockExam.findFirst({
      where: {
        title: { contains: "Dynamiczny" },
        type: examType as any,
      },
    });

    if (templateExam) {
      examId = templateExam.id;
    }

    // Utwórz sesję
    const session = await prisma.examSession.create({
      data: {
        userId,
        examId,
        status: "IN_PROGRESS",
        maxScore,
        assessment: {
          examTypeId,
          examType,
          isDynamic: true,
          questionsMetadata,
          selectionDate: new Date().toISOString(),
        },
      },
    });

    // Zapisz użycie pytań
    const allQuestionIds = Array.from(selectedQuestions.values())
      .flat()
      .map((q) => q.id);

    await intelligentExamService.recordExamUsage(
      userId,
      session.id,
      allQuestionIds
    );

    return reply.send({
      success: true,
      sessionId: session.id,
      examType,
      examTypeId,
      duration: examType === "PODSTAWOWY" ? 240 : 300,
      maxScore,
      questionsCount: allQuestionIds.length,
      message: "Egzamin przygotowany z unikalnym zestawem pytań",
    });
  });

  // Pobierz sesję egzaminu
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

    // Sprawdź czy to sesja dynamiczna
    const assessment = session.assessment as any;
    const isIntelligent =
      assessment?.intelligentSelection || assessment?.isDynamic || false;

    return reply.send({
      ...session,
      elapsedMinutes,
      remainingMinutes,
      isIntelligent,
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

  // Zakończ egzamin
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
        let correctAnswer: any = null;
        if (question.exercise) {
          correctAnswer = question.exercise.correctAnswer;
        } else if (question.content) {
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

    // Oblicz procent - zabezpieczenie przed null
    const maxScore = session.maxScore || 100; // Domyślnie 100 jeśli null
    const percentScore = Math.round((totalScore / maxScore) * 100);

    // Pobierz obecny assessment i rozszerz go
    const currentAssessment = (session.assessment as any) || {};

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
          ...currentAssessment,
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

  // Pobierz statystyki użytkownika
  fastify.get("/user-stats", async (request, reply) => {
    const userId = (request.user as any).userId;
    const stats = await intelligentExamService.getUserExerciseStats(userId);
    return reply.send(stats);
  });
}

// Funkcje pomocnicze
function mapSectionToKey(sectionTitle: string): string {
  if (sectionTitle.includes("Język polski w użyciu")) return "arkusz1_czesc1";
  if (sectionTitle.includes("Test historycznoliteracki"))
    return "arkusz1_czesc2";
  if (sectionTitle.includes("Wypracowanie")) return "arkusz2";
  return "arkusz1_czesc1";
}

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
