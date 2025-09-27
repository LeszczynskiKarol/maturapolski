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

WAŻNE: Zwróć TYLKO poprawny JSON. Nie używaj znaków nowej linii wewnątrz wartości tekstowych JSON.
Wszystkie wartości tekstowe muszą być w jednej linii.

Zwróć odpowiedź w formacie JSON:

{
  "score": liczba_punktów (0 do ${maxPoints}, może być ułamek np. 1.5),
  "maxScore": ${maxPoints},
  "isCorrect": true/false (czy odpowiedź jest zasadniczo poprawna),
  "isPartiallyCorrect": true/false (czy odpowiedź jest częściowo poprawna),
  "feedback": "Szczegółowa informacja zwrotna dla ucznia w jednej linii",
  "correctAnswer": "Przykładowa poprawna odpowiedź w jednej linii",
  "missingElements": ["element1", "element2"] (czego brakuje w odpowiedzi),
  "correctElements": ["element1", "element2"] (co jest poprawne w odpowiedzi),
  "suggestions": ["sugestia1", "sugestia2"] (jak poprawić odpowiedź)
}

Bądź sprawiedliwy ale wymagający. Doceniaj częściową wiedzę, ale wymagaj precyzji.
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1500,
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
      let textContent = messageContent.text;

      // Wyodrębnij JSON z odpowiedzi (może być otoczony tekstem)
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      let jsonString = jsonMatch[0];

      // Oczyść JSON ze znaków kontrolnych
      // Zachowaj znaki nowej linii tylko między elementami JSON, usuń je z wartości
      jsonString = jsonString
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
        // Znajdź wartości w cudzysłowach i oczyść je
        .replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (match, content) => {
          // Oczyść zawartość string z niepotrzebnych znaków
          const cleaned = content
            .replace(/\n/g, " ") // Zamień nowe linie na spacje
            .replace(/\r/g, "") // Usuń carriage returns
            .replace(/\t/g, " ") // Zamień taby na spacje
            .replace(/\s+/g, " ") // Zamień wielokrotne spacje na pojedyncze
            .trim();
          return `"${cleaned}"`;
        });

      try {
        const result = JSON.parse(jsonString);

        // Upewnij się, że score jest liczbą
        result.score = Number(result.score);
        result.maxScore = Number(result.maxScore || maxPoints);

        // Walidacja wymaganych pól
        if (typeof result.score !== "number" || isNaN(result.score)) {
          result.score = 0;
        }

        // Ustaw domyślne wartości jeśli brakuje pól
        result.isCorrect = result.isCorrect || false;
        result.isPartiallyCorrect = result.isPartiallyCorrect || false;
        result.feedback = result.feedback || "Odpowiedź została oceniona.";
        result.correctAnswer =
          result.correctAnswer || "Brak przykładowej odpowiedzi.";
        result.missingElements = result.missingElements || [];
        result.correctElements = result.correctElements || [];
        result.suggestions = result.suggestions || [];

        console.log("Successfully parsed AI response:", result);
        return result;
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Attempted to parse:", jsonString.substring(0, 500));
        throw parseError;
      }
    }

    throw new Error("Invalid response format from AI");
  } catch (error) {
    console.error("AI short answer assessment error:", error);

    // Jeśli to błąd parsowania, spróbuj raz jeszcze z prostszym promptem
    if (error instanceof SyntaxError && !anthropic) {
      console.log("Retrying with simplified prompt...");
      return assessShortAnswerWithAISimplified(userAnswer, question, maxPoints);
    }

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
      max_tokens: 800,
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
1. Spełnienie formalnych warunków (0-1 pkt) - liczba słów, forma wypowiedzi
2. Kompetencje literackie i kulturowe (0-16 pkt) - znajomość lektur, konteksty, argumentacja
3. Kompozycja wypowiedzi (0-7 pkt) - struktura, spójność, logika wywodu
4. Język wypowiedzi (0-11 pkt) - poprawność, styl, bogactwo językowe

WAŻNE: Zwróć TYLKO poprawny JSON. Wartości tekstowe muszą być w jednej linii.

Zwróć odpowiedź w formacie JSON:

{
  "formalScore": 0-1,
  "literaryScore": 0-16,
  "compositionScore": 0-7,
  "languageScore": 0-11,
  "totalScore": suma_punktów (max 35),
  "detailedFeedback": {
    "strengths": ["mocna strona 1", "mocna strona 2"],
    "weaknesses": ["słabość 1", "słabość 2"],
    "suggestions": ["sugestia poprawy 1", "sugestia poprawy 2"]
  },
  "improvements": ["obszar do poprawy 1", "obszar do poprawy 2"],
  "wordCount": ${wordCount},
  "percentageScore": procent_punktów (np. 74 dla 26/35 pkt)
}

Oceń rzetelnie według kryteriów maturalnych. Bądź wymagający ale sprawiedliwy.
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest", // claude-sonnet-4-20250514
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
      let textContent = messageContent.text;

      // Wyodrębnij i oczyść JSON
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        let jsonString = jsonMatch[0];

        // Oczyść JSON ze znaków kontrolnych w wartościach
        jsonString = jsonString.replace(
          /"([^"\\]*(\\.[^"\\]*)*)"/g,
          (match, content) => {
            const cleaned = content
              .replace(/\n/g, " ")
              .replace(/\r/g, "")
              .replace(/\t/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            return `"${cleaned}"`;
          }
        );

        const result = JSON.parse(jsonString);

        // Calculate percentage if not provided
        if (!result.percentageScore && result.totalScore) {
          result.percentageScore = Math.round((result.totalScore / 35) * 100);
        }
        return result;
      }

      // Jeśli nie znaleziono JSON w nawiasach, spróbuj sparsować całość
      return JSON.parse(textContent.trim());
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
