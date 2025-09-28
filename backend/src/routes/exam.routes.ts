// backend/src/routes/exam.routes.ts

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { assessShortAnswerWithAI, assessEssayWithAI } from "../ai/aiService";
import { differenceInMinutes } from "date-fns";

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
    const userId = (request.user as any).userId;

    console.log("=== FETCHING EXAMS ===");
    console.log("User ID:", userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    console.log("User role:", user?.role);

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
          where: { userId },
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

    console.log("Found exams:", exams.length);
    exams.forEach((e) => console.log(" -", e.title, e.id));

    // Formatuj dla frontendu
    const examsWithStats = exams.map((exam) => {
      const totalPoints = exam.sections.reduce(
        (sum, section) =>
          sum + section.questions.reduce((sSum, q) => sSum + q.points, 0),
        0
      );

      // Dla dynamicznych egzaminów bez pytań - ustaw domyślne punkty
      const finalTotalPoints = totalPoints > 0 ? totalPoints : 60;

      return {
        ...exam,
        totalPoints: finalTotalPoints,
        isDynamic: true, // Zawsze true dla Twoich egzaminów
        attemptCount: exam.sessions.length,
        bestScore:
          exam.sessions
            .filter((s) => s.status === "COMPLETED")
            .reduce((max, s) => Math.max(max, s.percentScore || 0), 0) || null,
        hasActiveSession: exam.sessions.some((s) => s.status === "IN_PROGRESS"),
      };
    });

    console.log("Returning exams:", examsWithStats);
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

    // Sprawdź aktywną sesję
    const activeSession = await prisma.examSession.findFirst({
      where: {
        userId,
        examId,
        status: "IN_PROGRESS",
      },
    });

    if (activeSession) {
      return reply.send({
        sessionId: activeSession.id,
        redirectTo: `/exam/mature/${activeSession.id}`,
      });
    }

    const exam = await prisma.mockExam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      return reply.code(404).send({ error: "Egzamin nie istnieje" });
    }

    // ZAWSZE GENERUJ DYNAMICZNIE!
    const { IntelligentExamService } = await import(
      "../services/intelligentExamService"
    );
    const intelligentService = new IntelligentExamService();

    // Dobierz pytania z tabeli Exercise
    const selectedQuestions = await intelligentService.selectQuestionsForExam(
      userId,
      exam.type as "PODSTAWOWY" | "ROZSZERZONY"
    );

    // Przygotuj metadane
    const questionsMetadata: any[] = [];
    for (const [sectionKey, questions] of selectedQuestions.entries()) {
      questions.forEach((q) => {
        questionsMetadata.push({
          exerciseId: q.id,
          section: sectionKey,
          type: q.type,
          points: q.points,
          order: questionsMetadata.length + 1,
        });
      });
    }

    // Utwórz sesję
    const session = await prisma.examSession.create({
      data: {
        userId,
        examId,
        status: "IN_PROGRESS",
        isIntelligent: true,
        maxScore: questionsMetadata.reduce((sum, q) => sum + q.points, 0),
        assessment: {
          isDynamic: true,
          questionsMetadata, // Tu są pytania, ale NIE w ExerciseUsage!
          generatedAt: new Date(),
        },
      },
    });

    return reply.send({
      sessionId: session.id,
      redirectTo: `/exam/mature/${session.id}`,
      isDynamic: true,
    });
  });

  // Porzuć/przerwij egzamin
  fastify.post("/session/:sessionId/abandon", async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const userId = (request.user as any).userId;

    const session = await prisma.examSession.findFirst({
      where: {
        id: sessionId,
        userId,
        status: "IN_PROGRESS",
      },
    });

    if (!session) {
      return reply.code(404).send({ error: "Sesja nie istnieje" });
    }

    await prisma.examSession.update({
      where: { id: sessionId },
      data: {
        status: "ABANDONED",
        finishedAt: new Date(),
      },
    });

    return reply.send({ success: true });
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

    if (session.assessment) {
      const assessmentData = session.assessment as any;
      if (assessmentData.questionsMetadata) {
        const metadata = assessmentData.questionsMetadata as any[];
        for (const q of metadata) {
          await prisma.exerciseUsage.upsert({
            where: {
              userId_exerciseId: { userId, exerciseId: q.exerciseId },
            },
            create: {
              userId,
              exerciseId: q.exerciseId,
              context: "EXAM",
              lastUsedAt: new Date(),
              usageCount: 1,
            },
            update: {
              lastUsedAt: new Date(),
              usageCount: { increment: 1 },
              context: "EXAM",
            },
          });
        }
        console.log(
          `Marked ${metadata.length} exam questions as USED after completion`
        );
      }
    }

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

  fastify.post("/get-questions", async (request, reply) => {
    const { questionIds } = request.body as { questionIds: string[] };

    if (
      !questionIds ||
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      return reply.code(400).send({ error: "Invalid question IDs" });
    }

    // Pobierz ćwiczenia
    const exercises = await prisma.exercise.findMany({
      where: {
        id: { in: questionIds },
      },
    });

    // Jeśli brak ćwiczeń, zwróć pustą tablicę
    if (exercises.length === 0) {
      console.log("No exercises found for IDs:", questionIds);
      return reply.send([]);
    }

    return reply.send(exercises);
  });

  // ENDPOINT DO UTWORZENIA EGZAMINU MATURALNEGO
  fastify.post("/create-mature-exam", async (request, reply) => {
    const userId = (request.user as any).userId;

    // Sprawdź czy admin
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.role !== "ADMIN") {
      return reply
        .code(403)
        .send({ error: "Tylko admin może tworzyć egzaminy" });
    }

    // Sprawdź czy już istnieje
    const existing = await prisma.mockExam.findFirst({
      where: { title: { contains: "Egzamin Maturalny 2025" } },
    });

    if (existing) {
      return reply.send({
        message: "Egzamin już istnieje",
        examId: existing.id,
      });
    }

    // UTWÓRZ EGZAMIN MATURALNY
    const exam = await prisma.mockExam.create({
      data: {
        title: "Egzamin Maturalny 2025 - Język Polski (poziom podstawowy)",
        year: 2025,
        type: "PODSTAWOWY",
        duration: 240,
        isActive: true,
        sections: {
          create: [
            {
              order: 1,
              title: "Arkusz 1 - Część 1: Język polski w użyciu",
              instruction:
                "Przeczytaj uważnie teksty, a następnie wykonaj zadania.",
              questions: {
                create: [
                  {
                    order: 1,
                    type: "SHORT_ANSWER",
                    question:
                      "Na podstawie tekstu Carla Sagana wyjaśnij sens zdania: „Rozpoczęliśmy wędrówkę pośród «wędrowców",
                    points: 1,
                    content: {
                      taskType: "WYJASNIENIE_SENSU",
                      tekstZrodlowy: {
                        autor: "Carl Sagan",
                        tytul: "Błękitna kropka",
                        fragment: `Nasi dalecy przodkowie, gdy obserwowali „gwiazdy", zauważyli, że pięć z nich
zachowuje się odmiennie niż pozostałe. W odróżnieniu od tak zwanych gwiazd stałych,
wschodzących i zachodzących w niewzruszonym porządku, ruch tamtej piątki był dziwnie
skomplikowany. Z upływem miesięcy „gwiazdy" wędrowały powoli wśród innych, niekiedy
nawet zataczały pętle. Dzisiaj te ciała nazywamy planetami, od greckiego słowa planetes,
które oznacza „wędrujący". Rozpoczęliśmy wędrówkę pośród „wędrowców".`,
                      },
                    },
                  },
                  {
                    order: 2,
                    type: "SHORT_ANSWER",
                    question:
                      "Rozstrzygnij, czy w obu tekstach jest mowa o tej samej przyczynie zainteresowania kosmosem.",
                    points: 2,
                    content: {
                      taskType: "ROZSTRZYGNIECIE",
                      tekstyZrodlowe: [
                        {
                          autor: "Carl Sagan",
                          fragment:
                            "Życie szuka innego życia. Nikogo na Ziemi nie stać na podróż na Marsa.",
                        },
                        {
                          autor: "Marta Trepczyńska",
                          fragment:
                            "Czy ludzie mogą żyć na innej planecie? NASA bada możliwość kolonizacji.",
                        },
                      ],
                    },
                  },
                  {
                    order: 3,
                    type: "CLOSED_MULTIPLE",
                    question:
                      "Oceń prawdziwość stwierdzeń odnoszących się do tekstów.",
                    points: 1,
                    content: {
                      taskType: "PRAWDA_FALSZ",
                      stwierdzenia: [
                        {
                          tekst:
                            "Czasowniki w 1. os. lm. zmniejszają dystans między autorem a czytelnikami.",
                          poprawna: true,
                        },
                        {
                          tekst:
                            "Przymiotnik 'ziemskie' w 'dwa ziemskie tygodnie' jest wartościujący.",
                          poprawna: false,
                        },
                      ],
                    },
                  },
                  {
                    order: 4,
                    type: "SYNTHESIS_NOTE",
                    question:
                      "Napisz notatkę syntetyzującą: odkrywanie kosmosu jako potrzeba człowieka (60-90 wyrazów).",
                    points: 4,
                    content: {
                      taskType: "NOTATKA_SYNTETYZUJACA",
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
              title: "Arkusz 1 - Część 2: Test historycznoliteracki",
              instruction: "Wykonaj zadania. Odpowiadaj własnymi słowami.",
              questions: {
                create: [
                  {
                    order: 5,
                    type: "CLOSED_MULTIPLE",
                    question:
                      "Do których postaci mitologicznych nawiązują fragmenty?",
                    points: 1,
                    content: {
                      taskType: "PRZYPORZADKOWANIE",
                      opcje: ["Herakles", "Charon", "Syzyf", "Ikar"],
                      fragmenty: [
                        {
                          id: "A",
                          tekst:
                            "Jest pracowity, silny i wytrwały,\nLwia skóra nagie barki mu pokrywa",
                          autor: "Adam Asnyk",
                          poprawna: "Herakles",
                        },
                        {
                          id: "B",
                          tekst:
                            "Był taki młody nie rozumiał że skrzydła są tylko przenośnią",
                          autor: "Zbigniew Herbert",
                          poprawna: "Ikar",
                        },
                      ],
                    },
                  },
                  {
                    order: 6,
                    type: "SHORT_ANSWER",
                    question:
                      "Czym różni się postawa życiowa w 'Rozmowie Mistrza Polikarpa' od 'Wiosny' Morsztyna?",
                    points: 1,
                    content: {
                      taskType: "ANALIZA_FRAGMENTU",
                      fragmenty: [
                        {
                          tytul: "Rozmowa Mistrza Polikarpa ze Śmiercią",
                          tekst:
                            "Chowali tu żywot swoj ciasno,\nAlić jich sirca nad słońce jasno",
                        },
                        {
                          tytul: "Wiosna",
                          autor: "Jan Andrzej Morsztyn",
                          tekst: "Spieszmy się, spieszmy, niż nas czas nadgoni",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              order: 3,
              title: "Arkusz 2 - Wypracowanie",
              instruction:
                "Wybierz jeden temat i napisz wypracowanie (min. 400 słów).",
              questions: {
                create: [
                  {
                    order: 7,
                    type: "ESSAY",
                    question: "Wybierz temat wypracowania",
                    points: 35,
                    content: {
                      tematy: [
                        {
                          numer: 1,
                          tytul:
                            "Źródło nadziei w czasach trudnych dla człowieka",
                          polecenie:
                            "Odwołaj się do lektury obowiązkowej i innego utworu.",
                        },
                        {
                          numer: 2,
                          tytul:
                            "Jak błędna ocena sytuacji wpływa na życie człowieka?",
                          polecenie:
                            "Odwołaj się do lektury obowiązkowej i innego utworu.",
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

    return reply.send({
      success: true,
      examId: exam.id,
      message: "Egzamin maturalny utworzony!",
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
