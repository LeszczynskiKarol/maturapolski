// backend/src/services/examAssessmentService.ts

import { Anthropic } from "@anthropic-ai/sdk";
import {
  TaskType,
  ExamTask,
  TextSource,
  TaskAssessment,
} from "../types/exam.types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export class ExamAssessmentService {
  async assessTask(
    taskType: TaskType,
    answer: any,
    task: ExamTask,
    textSources?: TextSource[]
  ): Promise<TaskAssessment> {
    switch (taskType) {
      case TaskType.NOTATKA_SYNTETYZUJACA:
        return this.assessNotatkaSyntetyzujaca(answer, task, textSources || []);

      case TaskType.ROZSTRZYGNIECIE:
        return this.assessRozstrzygniecie(answer, task, textSources || []);

      case TaskType.WYJASNIENIE_SENSU:
        return this.assessWyjasnienieSensu(answer, task, textSources || []);

      case TaskType.PRAWDA_FALSZ:
        return this.assessPrawdaFalsz(answer, task);

      case TaskType.PRZYPORZADKOWANIE:
        return this.assessPrzyporzadkowanie(answer, task);

      default:
        return {
          points: 0,
          maxPoints: task.maxPunkty,
          feedback: { error: "Nieobsługiwany typ zadania" },
        };
    }
  }

  private async assessNotatkaSyntetyzujaca(
    text: string,
    task: ExamTask,
    sources: TextSource[]
  ): Promise<TaskAssessment> {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const { minSlow = 60, maxSlow = 90 } = task.wymagania || {};

    // Przygotuj prompt dla AI
    const prompt = `Oceń notatkę syntetyzującą ucznia.
    
TEKSTY ŹRÓDŁOWE:
${sources
  .map(
    (s, i) => `
Tekst ${i + 1}: ${s.autor} - "${s.tytul}"
${s.fragment}
`
  )
  .join("\n")}

ODPOWIEDŹ UCZNIA:
${text}

KRYTERIA OCENY:
1. Synteza informacji z obu tekstów (0-2 pkt)
2. Zachowanie limitu słów ${minSlow}-${maxSlow} (0-1 pkt)
3. Poprawność językowa (0-1 pkt)

Oceń według kryteriów i zwróć w formacie JSON:
{
  "synthesisScore": 0-2,
  "synthesisFeedback": "komentarz",
  "languageScore": 0-1,
  "languageFeedback": "komentarz"
}`;

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content =
        response.content[0].type === "text" ? response.content[0].text : "";
      const aiAssessment = JSON.parse(content);

      // Punktacja
      let points = 0;

      // Synteza (0-2 pkt)
      points += aiAssessment.synthesisScore || 0;

      // Limit słów (0-1 pkt)
      if (wordCount >= minSlow && wordCount <= maxSlow) points += 1;

      // Poprawność (0-1 pkt)
      points += aiAssessment.languageScore || 0;

      return {
        points,
        maxPoints: 4,
        feedback: {
          synthesis: aiAssessment.synthesisFeedback,
          wordCount: `${wordCount} słów (wymagane: ${minSlow}-${maxSlow})`,
          language: aiAssessment.languageFeedback,
        },
      };
    } catch (error) {
      console.error("AI Assessment Error:", error);

      // Fallback - prosta ocena
      let points = 0;
      if (wordCount >= minSlow && wordCount <= maxSlow) points += 1;
      if (text.length > 100) points += 1;

      return {
        points,
        maxPoints: 4,
        feedback: {
          error: "Automatyczna ocena niedostępna",
          wordCount: `${wordCount} słów`,
        },
      };
    }
  }

  private async assessRozstrzygniecie(
    answer: { rozstrzygniecie: string; uzasadnienie: string },
    task: ExamTask,
    sources: TextSource[]
  ): Promise<TaskAssessment> {
    const prompt = `Oceń zadanie typu "rozstrzygnięcie z uzasadnieniem".

POLECENIE: ${task.polecenie}

TEKSTY ŹRÓDŁOWE:
${sources.map((s, i) => `Tekst ${i + 1}: ${s.fragment}`).join("\n")}

ODPOWIEDŹ UCZNIA:
Rozstrzygnięcie: ${answer.rozstrzygniecie}
Uzasadnienie: ${answer.uzasadnienie}

Oceń:
1. Poprawność rozstrzygnięcia (0-1 pkt)
2. Uzasadnienie z odwołaniem do tekstów (0-1 pkt)

Zwróć JSON: { "decisionScore": 0-1, "justificationScore": 0-1, "feedback": "..." }`;

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content =
        response.content[0].type === "text" ? response.content[0].text : "";
      const result = JSON.parse(content);

      return {
        points: result.decisionScore + result.justificationScore,
        maxPoints: 2,
        feedback: {
          decision: result.decisionScore === 1 ? "Poprawne" : "Niepoprawne",
          justification: result.feedback,
        },
      };
    } catch {
      return {
        points: 0,
        maxPoints: 2,
        feedback: { error: "Błąd oceny" },
      };
    }
  }

  private async assessWyjasnienieSensu(
    answer: string,
    task: ExamTask,
    sources: TextSource[]
  ): Promise<TaskAssessment> {
    // Prosta ocena - sprawdzenie długości i słów kluczowych
    const hasContent = answer.length > 20;
    const points = hasContent ? 1 : 0;

    return {
      points,
      maxPoints: 1,
      feedback: {
        content: hasContent
          ? "Odpowiedź zawiera wyjaśnienie"
          : "Zbyt krótka odpowiedź",
      },
    };
  }

  private assessPrawdaFalsz(
    answers: boolean[],
    task: ExamTask
  ): Promise<TaskAssessment> {
    // Tu normalnie byłyby poprawne odpowiedzi z bazy
    const correctAnswers = [true, false]; // przykład

    let points = 0;
    answers.forEach((ans, idx) => {
      if (ans === correctAnswers[idx]) points += 0.5;
    });

    return Promise.resolve({
      points,
      maxPoints: 1,
      feedback: {
        correct: points === 1,
      },
    });
  }

  private assessPrzyporzadkowanie(
    answers: Record<string, string>,
    task: ExamTask
  ): Promise<TaskAssessment> {
    // Sprawdzenie przyporządkowań
    const correctMappings = {
      A: "Syzyf",
      B: "Ikar",
    };

    let points = 0;
    Object.keys(answers).forEach((key) => {
      if (
        answers[key] === correctMappings[key as keyof typeof correctMappings]
      ) {
        points += 0.5;
      }
    });

    return Promise.resolve({
      points,
      maxPoints: 1,
      feedback: {
        score: points,
      },
    });
  }
}
