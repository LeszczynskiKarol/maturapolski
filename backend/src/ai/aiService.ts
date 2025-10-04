// backend/src/ai/aiService.ts

import Anthropic from "@anthropic-ai/sdk";

let anthropic: Anthropic;

export function initializeAI() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set");
    return;
  }

  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  console.log("AI service initialized");
}

export async function assessShortAnswerWithAI(
  userAnswer: string,
  question: string,
  expectedConcepts?: string[],
  maxPoints: number = 2
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  const prompt = `
Jesteś ekspertem egzaminatorem maturalnym. Oceń krótką odpowiedź ucznia na pytanie otwarte.

PYTANIE: ${question}

ODPOWIEDŹ UCZNIA: ${userAnswer}

${
  expectedConcepts
    ? `KLUCZOWE POJĘCIA/ELEMENTY ODPOWIEDZI:
${expectedConcepts.map((c) => `- ${c}`).join("\n")}`
    : ""
}

MAKSYMALNA LICZBA PUNKTÓW: ${maxPoints}

Oceń odpowiedź według następujących kryteriów:
1. Poprawność merytoryczna (czy odpowiedź jest prawdziwa)
2. Kompletność (czy zawiera wszystkie wymagane elementy)
3. Precyzja językowa (czy używa właściwej terminologii)
4. Adekwatność do pytania (czy odpowiada na zadane pytanie)

Przyznaj punkty częściowe za częściowo poprawne odpowiedzi.

KRYTYCZNE: Zwróć TYLKO czysty JSON bez żadnych dodatkowych znaków, komentarzy czy formatowania.
NIE używaj znaków nowej linii wewnątrz wartości string.

Zwróć odpowiedź w dokładnie takim formacie:

{"score":0,"maxScore":${maxPoints},"isCorrect":false,"isPartiallyCorrect":false,"feedback":"feedback tutaj","correctAnswer":"poprawna odpowiedź tutaj","missingElements":[],"correctElements":[],"suggestions":[]}

Zastąp wartości właściwymi, ale zachowaj strukturę w JEDNEJ linii.
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      let textContent = messageContent.text.trim();

      // Wyodrębnij JSON z odpowiedzi
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("No JSON found in AI response:", textContent);
        throw new Error("No JSON found in response");
      }

      let jsonString = jsonMatch[0];

      // Prosta normalizacja - usuń znaki kontrolne i wielokrotne spacje
      jsonString = jsonString
        .replace(/[\r\n\t]/g, " ") // Zamień znaki kontrolne na spacje
        .replace(/\s{2,}/g, " ") // Zamień wielokrotne spacje na pojedyncze
        .replace(/"\s+:/g, '":') // Usuń spacje przed dwukropkiem
        .replace(/:\s+"/g, ':"') // Usuń spacje po dwukropku
        .replace(/,\s+"/g, ',"') // Usuń spacje po przecinku
        .replace(/\[\s+/g, "[") // Usuń spacje po [
        .replace(/\s+\]/g, "]") // Usuń spacje przed ]
        .replace(/\{\s+/g, "{") // Usuń spacje po {
        .replace(/\s+\}/g, "}"); // Usuń spacje przed }

      console.log("Cleaned JSON string:", jsonString.substring(0, 200));

      try {
        const result = JSON.parse(jsonString);

        // Normalizacja wyniku
        result.score = Number(result.score) || 0;
        result.maxScore = Number(result.maxScore || maxPoints);
        result.isCorrect = Boolean(result.isCorrect);
        result.isPartiallyCorrect = Boolean(result.isPartiallyCorrect);
        result.feedback = String(
          result.feedback || "Odpowiedź została oceniona."
        );
        result.correctAnswer = String(
          result.correctAnswer || "Brak przykładowej odpowiedzi."
        );
        result.missingElements = Array.isArray(result.missingElements)
          ? result.missingElements
          : [];
        result.correctElements = Array.isArray(result.correctElements)
          ? result.correctElements
          : [];
        result.suggestions = Array.isArray(result.suggestions)
          ? result.suggestions
          : [];

        console.log("Successfully parsed AI response");
        return result;
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Attempted to parse:", jsonString.substring(0, 500));

        // Spróbuj jeszcze raz z uproszczonym promptem
        console.log("Retrying with simplified prompt...");
        return assessShortAnswerWithAISimplified(
          userAnswer,
          question,
          maxPoints
        );
      }
    }

    throw new Error("Invalid response format from AI");
  } catch (error) {
    console.error("AI short answer assessment error:", error);

    // Return minimal assessment
    return {
      score: 0,
      maxScore: maxPoints,
      isCorrect: false,
      isPartiallyCorrect: false,
      feedback:
        "Nie udało się automatycznie ocenić odpowiedzi. Spróbuj ponownie.",
      correctAnswer: "Przykładowa odpowiedź niedostępna",
      missingElements: [],
      correctElements: [],
      suggestions: ["Spróbuj ponownie później"],
    };
  }
}

// Simplified version for retry
async function assessShortAnswerWithAISimplified(
  userAnswer: string,
  question: string,
  maxPoints: number = 2
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  const prompt = `
Oceń odpowiedź ucznia. Odpowiedz TYLKO w formacie JSON bez żadnego dodatkowego tekstu.

Pytanie: ${question}
Odpowiedź: ${userAnswer}
Max punktów: ${maxPoints}

Zwróć dokładnie taki JSON (zastąp wartości właściwymi):
{"score":0,"maxScore":${maxPoints},"isCorrect":false,"isPartiallyCorrect":false,"feedback":"tutaj feedback","correctAnswer":"tutaj poprawna odpowiedź","missingElements":[],"correctElements":[],"suggestions":[]}
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      temperature: 0.1,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      const result = JSON.parse(messageContent.text.trim());
      result.score = Number(result.score);
      return result;
    }
  } catch (error) {
    console.error("Simplified assessment also failed:", error);
  }

  // Final fallback
  return {
    score: 0,
    maxScore: maxPoints,
    isCorrect: false,
    isPartiallyCorrect: false,
    feedback: "Błąd systemu oceniania. Administrator został powiadomiony.",
    correctAnswer: "Przykładowa odpowiedź niedostępna",
    missingElements: [],
    correctElements: [],
    suggestions: ["Spróbuj ponownie później"],
  };
}

export async function assessEssayWithAI(
  content: string,
  topic: string,
  requirements: any
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  const prompt = `
Jesteś ekspertem egzaminatorem maturalnym CKE. Oceń wypracowanie według oficjalnych kryteriów.

TEMAT: ${topic}

WYMAGANIA:
- Minimum ${requirements.minWords || 400} słów (aktualne: ${wordCount})
- Lektura obowiązkowa: ${requirements.requiredText || "brak"}
- Forma: wypowiedź argumentacyjna
${
  requirements.contexts?.length
    ? `- Konteksty: ${requirements.contexts.join(", ")}`
    : ""
}

WYPRACOWANIE:
${content}

KRYTERIA OCENY:
1. Spełnienie formalnych warunków (0-1 pkt)
2. Kompetencje literackie i kulturowe (0-16 pkt)
3. Kompozycja wypowiedzi (0-7 pkt)
4. Język wypowiedzi (0-11 pkt)

KRYTYCZNE: Zwróć TYLKO czysty JSON w JEDNEJ linii bez formatowania.

Format (zastąp wartościami):
{"formalScore":0,"literaryScore":0,"compositionScore":0,"languageScore":0,"totalScore":0,"detailedFeedback":{"strengths":[],"weaknesses":[],"suggestions":[]},"improvements":[],"wordCount":${wordCount},"percentageScore":0}
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      let textContent = messageContent.text.trim();

      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      let jsonString = jsonMatch[0];

      // Prosta normalizacja
      jsonString = jsonString
        .replace(/[\r\n\t]/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/"\s+:/g, '":')
        .replace(/:\s+"/g, ':"')
        .replace(/,\s+"/g, ',"')
        .replace(/\[\s+/g, "[")
        .replace(/\s+\]/g, "]")
        .replace(/\{\s+/g, "{")
        .replace(/\s+\}/g, "}");

      const result = JSON.parse(jsonString);

      // Calculate percentage if not provided
      if (!result.percentageScore && result.totalScore) {
        result.percentageScore = Math.round((result.totalScore / 35) * 100);
      }
      return result;
    }

    throw new Error("Invalid response format from AI");
  } catch (error) {
    console.error("AI essay assessment error:", error);

    // Return fallback assessment
    const fallbackScore = wordCount >= (requirements.minWords || 400) ? 19 : 15;
    return {
      formalScore: wordCount >= (requirements.minWords || 400) ? 1 : 0,
      literaryScore: 8,
      compositionScore: 4,
      languageScore: 6,
      totalScore: fallbackScore,
      detailedFeedback: {
        strengths: ["Wypracowanie zostało napisane"],
        weaknesses: ["Nie udało się przeprowadzić pełnej oceny automatycznej"],
        suggestions: ["Poproś nauczyciela o dokładną ocenę"],
      },
      improvements: ["Spróbuj ponownie później"],
      wordCount,
      percentageScore: Math.round((fallbackScore / 35) * 100),
    };
  }
}

// Helper function to get Anthropic client
export function getAIClient() {
  return anthropic;
}
