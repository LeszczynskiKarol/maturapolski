// backend/src/services/exerciseService.ts

import {
  assessWithWebResearch,
  assessShortAnswerWithAI,
  assessEssayWithAI,
} from "../ai/aiService";
import { prisma } from "../lib/prisma";
import { subscriptionService } from "./subscriptionService";

export class ExerciseService {
  constructor() {}

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
      pointsCost = exercise.type === "ESSAY" ? 3 : 1;
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
          }/${subscription.aiPointsLimit} punktów.`
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

    // ========================================
    // 🔥 NOWY FLOW - WEB RESEARCH ASSESSMENT
    // ========================================
    if (
      exercise.type === "SHORT_ANSWER" ||
      exercise.type === "SYNTHESIS_NOTE" ||
      exercise.type === "ESSAY"
    ) {
      try {
        // ✅ TYLKO dla SYNTHESIS_NOTE i ESSAY używaj web research
        if (exercise.type === "SYNTHESIS_NOTE" || exercise.type === "ESSAY") {
          console.log(
            `\n=== 🔍 WEB RESEARCH ASSESSMENT - ${exercise.type} ===`
          );
          console.log("Exercise ID:", exerciseId);

          const content = exercise.content as any;
          const metadata = exercise.metadata as any;

          const workTitle =
            exercise.work ||
            content?.work ||
            metadata?.work ||
            content?.requiredReadings?.[0] ||
            undefined;

          const additionalContext: any = {};

          if (exercise.type === "ESSAY") {
            const wordLimit = metadata?.wordLimit || content?.wordLimit;
            additionalContext.minWords = wordLimit?.min || 400;
          } else {
            const requirements = [
              ...(content?.requirements || []),
              ...(metadata?.requirements || []),
            ];
            if (requirements.length > 0) {
              additionalContext.requirements = requirements;
            }
          }

          // 🚀 WEB RESEARCH ASSESSMENT
          const aiAssessment = await assessWithWebResearch(
            answer,
            exercise.question,
            exercise.type as "SYNTHESIS_NOTE" | "ESSAY",
            exercise.points,
            workTitle,
            additionalContext
          );

          console.log("✅ Web research assessment completed");
          console.log("Sources used:", aiAssessment.sources?.length || 0);

          const estimatedTokens = {
            input: Math.ceil(
              (exercise.question.length + answer.length + 30000) / 4
            ),
            output: Math.ceil(JSON.stringify(aiAssessment).length / 4),
          };

          const finalScore =
            exercise.type === "ESSAY"
              ? Math.min(aiAssessment.totalScore || 0, exercise.points)
              : Math.min(
                  Math.max(0, Math.round((aiAssessment.score || 0) * 10) / 10),
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

          if (exercise.type === "ESSAY") {
            await prisma.assessment.create({
              data: {
                submissionId: submission.id,
                userId,
                formalScore: aiAssessment.formalScore,
                literaryScore: aiAssessment.literaryScore,
                compositionScore: aiAssessment.compositionScore,
                languageScore: aiAssessment.languageScore,
                totalScore: finalScore,
                detailedFeedback: {
                  ...aiAssessment.detailedFeedback,
                  sources: aiAssessment.sources,
                },
                improvements: aiAssessment.improvements || [],
              },
            });
          } else {
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
                  sources: aiAssessment.sources,
                },
                improvements: aiAssessment.suggestions || [],
              },
            });
          }

          await subscriptionService.useAiPoints(
            userId,
            exerciseId,
            exercise.type,
            pointsCost,
            estimatedTokens
          );

          if (exercise.type === "ESSAY") {
            return {
              ...submission,
              score: finalScore,
              assessment: aiAssessment,
              message: `Twoje wypracowanie zostało ocenione na ${finalScore} z ${exercise.points} punktów (${aiAssessment.percentageScore}%)`,
              feedback: {
                ...aiAssessment.detailedFeedback,
                score: finalScore,
                maxScore: exercise.points,
                totalScore: finalScore,
                percentageScore: aiAssessment.percentageScore,
                formalScore: aiAssessment.formalScore,
                literaryScore: aiAssessment.literaryScore,
                compositionScore: aiAssessment.compositionScore,
                languageScore: aiAssessment.languageScore,
                sources: aiAssessment.sources,
              },
            };
          } else {
            const isCorrect =
              aiAssessment.isCorrect ||
              (aiAssessment.score || 0) >= exercise.points * 0.6;
            const isPartiallyCorrect =
              !isCorrect &&
              (aiAssessment.score || 0) > 0 &&
              (aiAssessment.score || 0) < exercise.points * 0.6;

            return {
              ...submission,
              score: finalScore,
              assessment: aiAssessment,
              message: isCorrect
                ? `Świetnie! Zdobyłeś ${finalScore} z ${exercise.points} punktów!`
                : isPartiallyCorrect
                ? `Częściowo poprawna odpowiedź. Zdobyłeś ${finalScore} z ${exercise.points} punktów.`
                : "Odpowiedź wymaga poprawy",
              feedback: {
                isCorrect,
                isPartiallyCorrect,
                score: finalScore,
                maxScore: exercise.points,
                feedback: aiAssessment.feedback,
                correctAnswer: aiAssessment.correctAnswer,
                missingElements: aiAssessment.missingElements,
                correctElements: aiAssessment.correctElements,
                suggestions: aiAssessment.suggestions,
                sources: aiAssessment.sources,
              },
            };
          }
        }
        // ✅ DLA SHORT_ANSWER - STANDARD ASSESSMENT (BEZ WEB RESEARCH)
        else if (exercise.type === "SHORT_ANSWER") {
          console.log(`\n=== 🤖 STANDARD SHORT ANSWER ASSESSMENT (NO WEB) ===`);
          console.log("Exercise ID:", exerciseId);

          const content = exercise.content as any;
          const aiAssessment = await assessShortAnswerWithAI(
            answer,
            exercise.question,
            content?.requirements,
            exercise.points
          );

          const finalScore = Math.min(aiAssessment.score || 0, exercise.points);

          await prisma.submission.update({
            where: { id: submission.id },
            data: {
              score: finalScore,
              assessedBy: "AI",
              feedback: aiAssessment,
            },
          });

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

          const estimatedTokens = {
            input: Math.ceil((exercise.question.length + answer.length) / 4),
            output: Math.ceil(JSON.stringify(aiAssessment).length / 4),
          };

          await subscriptionService.useAiPoints(
            userId,
            exerciseId,
            exercise.type,
            pointsCost,
            estimatedTokens
          );

          const isCorrect = finalScore >= exercise.points * 0.6;
          const isPartiallyCorrect =
            !isCorrect && finalScore > 0 && finalScore < exercise.points * 0.6;

          return {
            ...submission,
            score: finalScore,
            assessment: aiAssessment,
            message: isCorrect
              ? `Świetnie! Zdobyłeś ${finalScore} z ${exercise.points} punktów!`
              : isPartiallyCorrect
              ? `Częściowo poprawna odpowiedź. Zdobyłeś ${finalScore} z ${exercise.points} punktów.`
              : "Odpowiedź wymaga poprawy",
            feedback: {
              isCorrect,
              isPartiallyCorrect,
              score: finalScore,
              maxScore: exercise.points,
              feedback: aiAssessment.feedback,
              correctAnswer: aiAssessment.correctAnswer,
              missingElements: aiAssessment.missingElements,
              correctElements: aiAssessment.correctElements,
              suggestions: aiAssessment.suggestions,
            },
          };
        }
      } catch (error) {
        console.error(`❌ Web research assessment failed:`, error);

        // Fallback do starej metody
        console.warn("⚠️ Using fallback assessment without web research");

        if (exercise.type === "ESSAY") {
          const metadata = exercise.metadata as any;
          const assessment = await assessEssayWithAI(
            answer,
            exercise.question,
            {
              minWords: metadata?.wordLimit?.min || 400,
              requiredText: metadata?.requiredReadings?.[0] || "Lektura",
              contexts: [],
            }
          );

          const totalScore = Math.min(
            assessment.totalScore || 0,
            exercise.points
          );

          await prisma.submission.update({
            where: { id: submission.id },
            data: {
              score: totalScore,
              assessedBy: "AI",
              feedback: assessment,
            },
          });

          return {
            ...submission,
            score: totalScore,
            assessment,
            message: `Twoje wypracowanie zostało ocenione na ${totalScore} z ${exercise.points} punktów`,
            feedback: {
              ...assessment.detailedFeedback,
              score: totalScore,
              maxScore: exercise.points,
            },
          };
        } else {
          const content = exercise.content as any;
          const assessment = await assessShortAnswerWithAI(
            answer,
            exercise.question,
            content?.requirements,
            exercise.points
          );

          const finalScore = Math.min(assessment.score || 0, exercise.points);

          await prisma.submission.update({
            where: { id: submission.id },
            data: {
              score: finalScore,
              assessedBy: "AI",
              feedback: assessment,
            },
          });

          return {
            ...submission,
            score: finalScore,
            assessment,
            message: "Odpowiedź została oceniona",
            feedback: {
              ...assessment,
              score: finalScore,
              maxScore: exercise.points,
            },
          };
        }
      }
    }

    // CLOSED questions - bez zmian
    if (
      exercise.type === "CLOSED_SINGLE" ||
      exercise.type === "CLOSED_MULTIPLE"
    ) {
      let isCorrect = false;

      if (exercise.type === "CLOSED_SINGLE") {
        isCorrect = answer === exercise.correctAnswer;
      }

      if (exercise.type === "CLOSED_MULTIPLE") {
        const userAnswer = Array.isArray(answer)
          ? [...answer].sort((a: number, b: number) => a - b)
          : [];
        const correctAnswer = Array.isArray(exercise.correctAnswer)
          ? ([...exercise.correctAnswer] as number[]).sort((a, b) => a - b)
          : [];
        isCorrect =
          JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
      }

      const score = isCorrect ? exercise.points : 0;
      const metadata = exercise.metadata as any;
      const explanation = metadata?.explanation;

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

    // Default
    return {
      ...submission,
      score: null,
      message: "Odpowiedź została zapisana",
    };
  }

  // Pozostałe metody bez zmian...
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

      return exercises;
    } catch (error) {
      console.error("Error in getExercisesWithStatus:", error);
      throw error;
    }
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
