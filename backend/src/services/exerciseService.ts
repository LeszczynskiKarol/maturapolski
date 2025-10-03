// backend/src/services/exerciseService.ts

import { assessEssayWithAI, assessShortAnswerWithAI } from "../ai/aiService";
import { prisma } from "../lib/prisma";
import { subscriptionService } from "./subscriptionService";

export class ExerciseService {
  constructor() {}

  async getAdaptiveExercise(userId: string) {
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      await prisma.userProfile.create({
        data: {
          userId,
          studyStreak: 0,
          totalPoints: 0,
          averageScore: 0,
        },
      });
    }

    const exercise = await prisma.exercise.findFirst({
      where: {
        NOT: {
          submissions: {
            some: { userId },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return exercise;
  }

  async getExercisesByCategory(category: string, limit: number = 10) {
    return prisma.exercise.findMany({
      where: { category: category as any },
      take: limit,
    });
  }

  async getExerciseById(id: string) {
    return prisma.exercise.findUnique({
      where: { id },
    });
  }

  async getExercisesWithStatus(userId: string, query: any = {}) {
    console.log(
      "Getting exercises with status for user:",
      userId,
      "query:",
      query
    );

    const where: any = {};

    if (query.type) where.type = query.type;
    if (query.category && query.category !== "all") {
      where.category = query.category;
    }
    if (query.difficulty) where.difficulty = parseInt(query.difficulty);

    try {
      const exercises = await prisma.exercise.findMany({
        where,
        include: {
          submissions: {
            where: { userId },
            select: {
              id: true,
              score: true,
              createdAt: true,
              assessedBy: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      console.log(`Found ${exercises.length} exercises for user ${userId}`);

      return exercises;
    } catch (error) {
      console.error("Error in getExercisesWithStatus:", error);
      throw error;
    }
  }

  async submitAnswer(
    userId: string,
    exerciseId: string,
    answer: any,
    timeSpent?: number
  ) {
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new Error("Exercise not found");
    }

    // ========================================
    // SPRAWDZENIE PUNKTÓW AI
    // ========================================
    const requiresAI = ["SHORT_ANSWER", "SYNTHESIS_NOTE", "ESSAY"].includes(
      exercise.type
    );
    let pointsCost = 0;

    if (requiresAI) {
      // Oblicz koszt w punktach
      pointsCost = exercise.type === "ESSAY" ? 3 : 1;

      // Sprawdź dostępność punktów
      const hasPoints = await subscriptionService.hasAiPoints(
        userId,
        pointsCost
      );

      if (!hasPoints) {
        const subscription = await subscriptionService.getOrCreateSubscription(
          userId
        );
        throw new Error(
          `INSUFFICIENT_AI_POINTS|Brak punktów AI! Masz ${
            subscription.aiPointsLimit - subscription.aiPointsUsed
          }/${
            subscription.aiPointsLimit
          } punktów. To zadanie wymaga ${pointsCost} ${
            pointsCost === 1 ? "punktu" : "punktów"
          }. Ulepsz plan aby kontynuować.`
        );
      }
    }

    const submission = await prisma.submission.create({
      data: {
        userId,
        exerciseId,
        answer,
        timeSpent: timeSpent || 0,
        assessedBy: "SYSTEM",
      },
    });

    // Handle CLOSED questions - immediate scoring
    if (
      exercise.type === "CLOSED_SINGLE" ||
      exercise.type === "CLOSED_MULTIPLE"
    ) {
      const isCorrect =
        JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer);
      const score = isCorrect ? exercise.points : 0;

      // Pobierz wyjaśnienie z metadata
      const metadata = exercise.metadata as any;
      const explanation = metadata?.explanation;

      // Znajdź tekst poprawnej odpowiedzi
      let correctAnswerText = "";
      const content = exercise.content as any;
      const options = content?.options || [];

      if (exercise.type === "CLOSED_SINGLE") {
        const correctIndex = exercise.correctAnswer as number;
        correctAnswerText = options[correctIndex] || "";
      } else {
        const correctIndices = exercise.correctAnswer as number[];
        correctAnswerText = correctIndices
          .map((idx) => options[idx])
          .filter(Boolean)
          .join(", ");
      }

      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          score,
          feedback: {
            correct: isCorrect,
            correctAnswer: exercise.correctAnswer,
            correctAnswerText,
            explanation: explanation || null,
          },
        },
      });

      return {
        ...submission,
        score,
        feedback: {
          correct: isCorrect,
          correctAnswer: exercise.correctAnswer,
          correctAnswerText,
          explanation: explanation || null,
        },
        message: isCorrect
          ? `Świetnie! Zdobyłeś ${score} punktów!`
          : "Niepoprawna odpowiedź",
      };
    }

    // Handle SHORT_ANSWER - AI assessment
    if (exercise.type === "SHORT_ANSWER") {
      try {
        console.log("Starting AI assessment for SHORT_ANSWER:", submission.id);

        // Extract expected concepts from exercise content/rubric
        const content = exercise.content as any;
        const rubric = exercise.rubric as any;
        const metadata = exercise.metadata as any;

        const expectedConcepts = [
          ...(content?.requirements || []),
          ...(rubric?.criteria?.map((c: any) => c.name) || []),
          ...(metadata?.expectedConcepts || []),
        ];

        // Get AI assessment
        const aiAssessment = await assessShortAnswerWithAI(
          answer,
          exercise.question,
          expectedConcepts.length > 0 ? expectedConcepts : undefined,
          exercise.points
        );

        // Oszacuj tokeny (przybliżenie)
        const estimatedTokens = {
          input: Math.ceil((exercise.question.length + answer.length) / 4),
          output: Math.ceil(JSON.stringify(aiAssessment).length / 4),
        };

        console.log("AI Assessment result:", aiAssessment);
        console.log("Estimated tokens:", estimatedTokens);

        // Update submission with AI score
        const finalScore = Math.min(
          Math.max(0, Math.round(aiAssessment.score * 10) / 10),
          exercise.points
        );

        await prisma.submission.update({
          where: { id: submission.id },
          data: {
            score: finalScore,
            assessedBy: "AI",
            feedback: aiAssessment,
          },
        });

        // Create assessment record
        await prisma.assessment.create({
          data: {
            submissionId: submission.id,
            userId,
            totalScore: finalScore,
            detailedFeedback: {
              aiResponse: aiAssessment,
              feedback: aiAssessment.feedback,
              correctAnswer: aiAssessment.correctAnswer,
              missingElements: aiAssessment.missingElements,
              correctElements: aiAssessment.correctElements,
            },
            improvements: aiAssessment.suggestions || [],
          },
        });

        // ========================================
        // ZAPISZ UŻYCIE PUNKTÓW AI
        // ========================================
        await subscriptionService.useAiPoints(
          userId,
          exerciseId,
          exercise.type,
          pointsCost,
          estimatedTokens
        );

        const responseData = {
          ...submission,
          score: finalScore,
          assessment: aiAssessment,
          message: aiAssessment.isCorrect
            ? `Świetnie! Zdobyłeś ${finalScore} z ${exercise.points} punktów!`
            : aiAssessment.isPartiallyCorrect
            ? `Częściowo poprawna odpowiedź. Zdobyłeś ${finalScore} z ${exercise.points} punktów.`
            : "Niepoprawna odpowiedź",
          feedback: {
            isCorrect: aiAssessment.isCorrect,
            isPartiallyCorrect: aiAssessment.isPartiallyCorrect,
            score: finalScore,
            maxScore: exercise.points,
            feedback: aiAssessment.feedback,
            correctAnswer: aiAssessment.correctAnswer,
            missingElements: aiAssessment.missingElements,
            correctElements: aiAssessment.correctElements,
            suggestions: aiAssessment.suggestions,
          },
        };

        console.log(
          "Sending response to frontend:",
          JSON.stringify(responseData.feedback, null, 2)
        );

        return responseData;
      } catch (error) {
        console.error("AI assessment failed for SHORT_ANSWER:", error);

        // Fallback - save without score
        return {
          ...submission,
          score: null,
          message:
            "Nie udało się ocenić odpowiedzi automatycznie. Administrator został powiadomiony.",
          error: "AI assessment failed",
        };
      }
    }

    // Handle ESSAY - AI assessment
    if (exercise.type === "ESSAY") {
      try {
        console.log("Starting AI assessment for ESSAY:", submission.id);

        const metadata = exercise.metadata as any;
        const wordLimit = metadata?.wordLimit as
          | { min?: number; max?: number }
          | undefined;
        const requiredReadings = metadata?.requiredReadings as
          | string[]
          | undefined;
        const contexts = metadata?.contexts as string[] | undefined;

        // Get AI assessment for essay
        const assessment = await assessEssayWithAI(answer, exercise.question, {
          minWords: wordLimit?.min || 400,
          requiredText: requiredReadings?.[0] || "Lektura obowiązkowa",
          contexts: contexts || [],
        });

        // Oszacuj tokeny
        const estimatedTokens = {
          input: Math.ceil(
            (exercise.question.length + answer.length + 1000) / 4
          ),
          output: Math.ceil(JSON.stringify(assessment).length / 4),
        };

        // Calculate total score
        const totalScore = Math.min(
          assessment.totalScore || 0,
          exercise.points
        );

        // Update submission
        await prisma.submission.update({
          where: { id: submission.id },
          data: {
            score: totalScore,
            assessedBy: "AI",
            feedback: assessment,
          },
        });

        // Create assessment record
        await prisma.assessment.create({
          data: {
            submissionId: submission.id,
            userId,
            formalScore: assessment.formalScore,
            literaryScore: assessment.literaryScore,
            compositionScore: assessment.compositionScore,
            languageScore: assessment.languageScore,
            totalScore,
            detailedFeedback: assessment.detailedFeedback,
            improvements: assessment.improvements || [],
          },
        });

        // ========================================
        // ZAPISZ UŻYCIE PUNKTÓW AI (3 punkty!)
        // ========================================
        await subscriptionService.useAiPoints(
          userId,
          exerciseId,
          exercise.type,
          pointsCost,
          estimatedTokens
        );

        return {
          ...submission,
          score: totalScore,
          assessment,
          message: `Twoje wypracowanie zostało ocenione na ${totalScore} z ${exercise.points} punktów (${assessment.percentageScore}%)`,
          feedback: {
            ...assessment.detailedFeedback,
            totalScore,
            percentageScore: assessment.percentageScore,
          },
        };
      } catch (error) {
        console.error("AI assessment failed for ESSAY:", error);

        return {
          ...submission,
          score: null,
          message:
            "Wystąpił błąd podczas oceny wypracowania. Spróbuj ponownie później.",
          error: "AI assessment failed",
        };
      }
    }

    // Handle SYNTHESIS_NOTE - AI assessment (similar to SHORT_ANSWER but more complex)
    if (exercise.type === "SYNTHESIS_NOTE") {
      try {
        console.log(
          "Starting AI assessment for SYNTHESIS_NOTE:",
          submission.id
        );

        const content = exercise.content as any;
        const requirements = content?.requirements || [];

        // Use SHORT_ANSWER assessment with higher expectations
        const aiAssessment = await assessShortAnswerWithAI(
          answer,
          `${exercise.question}\n\nWymagania:\n${requirements.join("\n")}`,
          requirements,
          exercise.points
        );

        // Oszacuj tokeny
        const estimatedTokens = {
          input: Math.ceil(
            (exercise.question.length + answer.length + 500) / 4
          ),
          output: Math.ceil(JSON.stringify(aiAssessment).length / 4),
        };

        const finalScore = Math.min(
          Math.max(0, Math.round(aiAssessment.score * 10) / 10),
          exercise.points
        );

        await prisma.submission.update({
          where: { id: submission.id },
          data: {
            score: finalScore,
            assessedBy: "AI",
            feedback: aiAssessment,
          },
        });

        // ========================================
        // ZAPISZ UŻYCIE PUNKTÓW AI
        // ========================================
        await subscriptionService.useAiPoints(
          userId,
          exerciseId,
          exercise.type,
          pointsCost,
          estimatedTokens
        );

        return {
          ...submission,
          score: finalScore,
          assessment: aiAssessment,
          message: `Zdobyłeś ${finalScore} z ${exercise.points} punktów`,
          feedback: {
            ...aiAssessment,
            score: finalScore,
            maxScore: exercise.points,
          },
        };
      } catch (error) {
        console.error("AI assessment failed for SYNTHESIS_NOTE:", error);

        return {
          ...submission,
          score: null,
          message: "Błąd oceny. Spróbuj ponownie później.",
          error: "AI assessment failed",
        };
      }
    }

    // Default - no automatic scoring
    return {
      ...submission,
      score: null,
      message: "Odpowiedź została zapisana",
    };
  }

  async getUserHistory(userId: string, limit: number, offset: number) {
    return prisma.submission.findMany({
      where: { userId },
      include: {
        exercise: true,
        assessment: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }
}
