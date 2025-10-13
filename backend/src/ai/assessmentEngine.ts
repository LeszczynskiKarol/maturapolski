// backend/src/ai/assessmentEngine.ts

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const DetailedAssessmentSchema = z.object({
  formal: z.object({
    score: z.number().min(0).max(1),
    hasCardinalError: z.boolean(),
    usesRequiredText: z.boolean(),
    isArgumentative: z.boolean(),
    addressesTopic: z.boolean(),
    details: z.string(),
  }),
  literary: z.object({
    score: z.number().min(0).max(16),
    textUsage: z.enum(["full", "partial", "minimal"]),
    argumentation: z.enum(["rich", "satisfactory", "superficial"]),
    contexts: z.array(z.string()),
    errors: z.array(z.string()),
    strengths: z.array(z.string()),
    culturalReferences: z.array(z.string()),
  }),
  composition: z.object({
    structure: z.number().min(0).max(3),
    coherence: z.number().min(0).max(3),
    style: z.number().min(0).max(1),
    paragraphAnalysis: z.array(
      z.object({
        type: z.string(),
        quality: z.enum(["excellent", "good", "fair", "poor"]),
        feedback: z.string(),
      })
    ),
  }),
  language: z.object({
    range: z.number().min(0).max(7),
    orthography: z.number().min(0).max(2),
    punctuation: z.number().min(0).max(2),
    errors: z.array(
      z.object({
        type: z.string(),
        location: z.string(),
        correction: z.string(),
      })
    ),
    styleFigures: z.array(z.string()),
  }),
  feedback: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    improvements: z.array(z.string()),
    nextSteps: z.array(z.string()),
    estimatedGrade: z.string(),
  }),
  statistics: z.object({
    wordCount: z.number(),
    sentenceCount: z.number(),
    paragraphCount: z.number(),
    averageSentenceLength: z.number(),
    readabilityScore: z.number(),
  }),
});

export class EnhancedAssessmentEngine {
  async assessEssay(
    text: string,
    topic: string,
    requirements: any
  ): Promise<z.infer<typeof DetailedAssessmentSchema>> {
    const wordCount = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const paragraphs = text.split(/\n\n+/).filter(Boolean);

    const prompt = this.buildDetailedPrompt(text, topic, requirements);

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 3000,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let textContent = "";
    for (const block of response.content) {
      if (block.type === "text") {
        textContent = block.text;
        break;
      }
    }

    const assessment = this.parseAssessment(textContent);

    // Add statistics
    assessment.statistics = {
      wordCount,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      averageSentenceLength: Math.round(wordCount / sentences.length),
      readabilityScore: this.calculateReadability(text),
    };

    return DetailedAssessmentSchema.parse(assessment);
  }

  private buildDetailedPrompt(
    text: string,
    topic: string,
    requirements: any
  ): string {
    return `
Jesteś ekspertem egzaminatorem maturalnym CKE. Oceń szczegółowo wypracowanie według oficjalnych kryteriów.

TEMAT: ${topic}

WYMAGANIA:
- Minimum 400 słów
- Lektura obowiązkowa: ${requirements.requiredText}
- Forma: wypowiedź argumentacyjna
- Wykorzystanie kontekstów literackich i kulturowych

WYPRACOWANIE UCZNIA:
${text}

KRYTERIA SZCZEGÓŁOWEJ OCENY:

1. SPEŁNIENIE FORMALNYCH WARUNKÓW (0-1 pkt)
- Czy praca liczy min. 400 słów?
- Czy jest wypowiedzią argumentacyjną?
- Czy odnosi się do lektury obowiązkowej?
- Czy realizuje temat?

2. KOMPETENCJE LITERACKIE I KULTUROWE (0-16 pkt)
Oceń:
- Funkcjonalne wykorzystanie lektury obowiązkowej
- Poprawność rzeczową
- Uzasadnienie tezy interpretacyjnej
- Wykorzystanie kontekstów
- Bogactwo treści
- Spójność argumentacji

3. KOMPOZYCJA (0-7 pkt)
- Struktura wypowiedzi (wstęp, rozwinięcie, zakończenie)
- Spójność i logika wywodu
- Styl adekwatny do formy

4. JĘZYK (0-11 pkt)
- Bogactwo językowe
- Poprawność językowa
- Ortografia
- Interpunkcja

Zwróć szczegółową analizę w formacie JSON z wszystkimi elementami oceny, błędami, mocnymi stronami i rekomendacjami.
`;
  }

  private parseAssessment(content: string): any {
    try {
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }
      return JSON.parse(content);
    } catch (error) {
      // Return default assessment if parsing fails
      return this.getDefaultAssessment();
    }
  }

  private calculateReadability(text: string): number {
    // Simplified Flesch Reading Ease for Polish
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const syllables = text.replace(/[^aąeęioóuyAĄEĘIOÓUY]/g, "").length;

    const avgWordsPerSentence = words / sentences;
    const avgSyllablesPerWord = syllables / words;

    return Math.max(
      0,
      Math.min(
        100,
        206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
      )
    );
  }

  private getDefaultAssessment() {
    return {
      formal: {
        score: 0,
        hasCardinalError: true,
        usesRequiredText: false,
        isArgumentative: false,
        addressesTopic: false,
        details: "Nie można przetworzyć wypracowania",
      },
      literary: {
        score: 0,
        textUsage: "minimal",
        argumentation: "superficial",
        contexts: [],
        errors: ["Błąd przetwarzania"],
        strengths: [],
        culturalReferences: [],
      },
      composition: {
        structure: 0,
        coherence: 0,
        style: 0,
        paragraphAnalysis: [],
      },
      language: {
        range: 0,
        orthography: 0,
        punctuation: 0,
        errors: [],
        styleFigures: [],
      },
      feedback: {
        strengths: [],
        weaknesses: ["Nie można ocenić wypracowania"],
        improvements: [],
        nextSteps: [],
        estimatedGrade: "0%",
      },
    };
  }
}
