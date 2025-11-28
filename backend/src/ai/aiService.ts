// backend/src/ai/aiService.ts
import { googleSearchService } from "../services/googleSearchService";
import { webScrapperService } from "../services/webScrapperService";
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

/**
 * 🔥 NOWA FUNKCJA - Ocena z web research
 *
 * Flow:
 * 1. Generuj zapytanie Google
 * 2. Pobierz 5 najlepszych źródeł
 * 3. Scrapuj każde źródło
 * 4. Agreguj treść
 * 5. Oceń odpowiedź NA PODSTAWIE ŹRÓDEŁ
 */
export async function assessWithWebResearch(
  userAnswer: string,
  question: string,
  exerciseType: "SHORT_ANSWER" | "SYNTHESIS_NOTE" | "ESSAY",
  maxPoints: number,
  workTitle?: string,
  additionalContext?: {
    requirements?: string[];
    minWords?: number;
  }
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  console.log("\n" + "=".repeat(80));
  console.log("🔍 WEB RESEARCH ASSESSMENT START");
  console.log("=".repeat(80));
  console.log("📋 INPUT PARAMETERS:");
  console.log(`   Question: ${question}`);
  console.log(`   Work: ${workTitle || "unknown"}`);
  console.log(`   Exercise type: ${exerciseType}`);
  console.log(`   Max points: ${maxPoints}`);
  console.log(`   User answer length: ${userAnswer.length} characters`);
  console.log(`   Additional context:`, additionalContext);
  console.log("=".repeat(80) + "\n");

  try {
    // ========================================
    // KROK 1: Generuj zapytanie do Google
    // ========================================
    console.log("\n" + "─".repeat(80));
    console.log("📝 STEP 1: GENERATING SEARCH QUERY");
    console.log("─".repeat(80));

    const searchQuery = await googleSearchService.generateSearchQuery(
      question,
      userAnswer,
      workTitle
    );

    console.log(`✅ Generated query: "${searchQuery}"`);
    console.log("─".repeat(80) + "\n");

    // ========================================
    // KROK 2: Szukaj w Google
    // ========================================
    console.log("\n" + "─".repeat(80));
    console.log("🔍 STEP 2: SEARCHING GOOGLE");
    console.log("─".repeat(80));
    console.log(`Query: "${searchQuery}"`);
    console.log(`Max results: 5`);

    const searchResults = await googleSearchService.searchLiteratureSources(
      searchQuery,
      5
    );

    console.log(`\n📊 SEARCH RESULTS: ${searchResults.length} sources found`);
    searchResults.forEach((result, i) => {
      console.log(`\n   [${i + 1}] ${result.title}`);
      console.log(`       URL: ${result.link}`);
      console.log(`       Snippet: ${result.snippet.substring(0, 100)}...`);
    });

    if (searchResults.length === 0) {
      console.log(
        "\n⚠️  NO SEARCH RESULTS - FALLING BACK TO STANDARD ASSESSMENT"
      );
      console.log("─".repeat(80) + "\n");

      // Fallback
      if (exerciseType === "ESSAY") {
        return assessEssayWithAI(userAnswer, question, {
          minWords: additionalContext?.minWords || 400,
          requiredText: workTitle || "Lektura",
          contexts: [],
        });
      } else {
        return assessShortAnswerWithAI(
          userAnswer,
          question,
          additionalContext?.requirements,
          maxPoints
        );
      }
    }

    console.log("─".repeat(80) + "\n");

    // ========================================
    // KROK 3: Scrapuj źródła
    // ========================================
    console.log("\n" + "─".repeat(80));
    console.log("🕷️  STEP 3: SCRAPING SOURCES");
    console.log("─".repeat(80));

    const urls = searchResults.map((r) => r.link);
    console.log(`URLs to scrape (${urls.length}):`);
    urls.forEach((url, i) => console.log(`   [${i + 1}] ${url}`));

    const scrapedResults = await webScrapperService.scrapeMultipleUrls(urls, 3);

    console.log(`\n📊 SCRAPING RESULTS:`);
    scrapedResults.forEach((result, i) => {
      if (result.success) {
        console.log(
          `   ✅ [${i + 1}] ${result.url} - ${result.text.length} chars`
        );
      } else {
        console.log(`   ❌ [${i + 1}] ${result.url} - ERROR: ${result.error}`);
      }
    });
    console.log("─".repeat(80) + "\n");

    // ========================================
    // KROK 4: Agreguj treść
    // ========================================
    console.log("\n" + "─".repeat(80));
    console.log("📚 STEP 4: AGGREGATING CONTENT");
    console.log("─".repeat(80));

    const sourceContent = webScrapperService.aggregateScrapedContent(
      scrapedResults,
      20000
    );

    console.log(
      `📊 Aggregation result: ${sourceContent.length} total characters`
    );

    if (!sourceContent || sourceContent.length < 100) {
      console.log("⚠️  INSUFFICIENT SOURCE CONTENT - FALLING BACK");
      console.log("─".repeat(80) + "\n");

      // Fallback
      if (exerciseType === "ESSAY") {
        return assessEssayWithAI(userAnswer, question, {
          minWords: additionalContext?.minWords || 400,
          requiredText: workTitle || "Lektura",
          contexts: [],
        });
      } else {
        return assessShortAnswerWithAI(
          userAnswer,
          question,
          additionalContext?.requirements,
          maxPoints
        );
      }
    }

    console.log("✅ Source content ready for AI assessment");
    console.log(
      `   Preview (first 200 chars): ${sourceContent.substring(0, 200)}...`
    );
    console.log("─".repeat(80) + "\n");

    // ========================================
    // KROK 5: Oceń z kontekstem źródeł
    // ========================================
    console.log("\n" + "─".repeat(80));
    console.log("🤖 STEP 5: AI ASSESSMENT WITH SOURCES");
    console.log("─".repeat(80));

    const assessment = await assessWithSourceContext(
      userAnswer,
      question,
      sourceContent,
      exerciseType,
      maxPoints,
      workTitle
    );

    // Dodaj linki źródłowe do wyniku
    assessment.sources = searchResults.map((r) => ({
      title: r.title,
      url: r.link,
      snippet: r.snippet,
    }));

    console.log("\n✅ ASSESSMENT COMPLETE");
    console.log(`   Sources used: ${assessment.sources.length}`);
    console.log(`   Final score: ${assessment.totalScore || assessment.score}`);
    console.log("─".repeat(80) + "\n");

    return assessment;
  } catch (error) {
    console.error("\n" + "=".repeat(80));
    console.error("❌ WEB RESEARCH ASSESSMENT FAILED");
    console.error("=".repeat(80));
    console.error("Error:", error);
    console.error(
      "Stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    console.error("=".repeat(80) + "\n");

    // Fallback
    console.log("⚠️  USING FALLBACK ASSESSMENT WITHOUT WEB RESEARCH\n");

    if (exerciseType === "ESSAY") {
      return assessEssayWithAI(userAnswer, question, {
        minWords: additionalContext?.minWords || 400,
        requiredText: workTitle || "Lektura",
        contexts: [],
      });
    } else {
      return assessShortAnswerWithAI(
        userAnswer,
        question,
        additionalContext?.requirements,
        maxPoints
      );
    }
  }
}

export async function assessShortAnswerWithAI(
  userAnswer: string,
  question: string,
  expectedConcepts?: string[], // ✅ BEZ sourceContent!
  maxPoints: number = 2
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  console.log("\n" + "=".repeat(80));
  console.log("🤖 STANDARD SHORT ANSWER ASSESSMENT (NO WEB RESEARCH)");
  console.log("=".repeat(80));
  console.log(`Question: ${question}`);
  console.log(`Answer length: ${userAnswer.length} chars`);
  console.log(`Max points: ${maxPoints}`);
  console.log("=".repeat(80) + "\n");

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

**KRYTYCZNE - JĘZYK FEEDBACKU:**
- UNIKAJ schematycznych fraz jak "Odpowiedź jest kompletna i merytorycznie poprawna"
- UNIKAJ rozpoczynania od "Uczeń prawidłowo..."
- Pisz RÓŻNORODNIE - czasem krótko, czasem dłużej
- Używaj NATURALNEGO języka, nie akademickiego
- Przykłady dobrych początków:
  * "Świetna robota!"
  * "To dobra odpowiedź."
  * "Prawidłowo!"
  * "Zgadza się!"
  * "Trafna analiza."
  * "Poprawnie zidentyfikowałeś..."

Format JSON:
{"score":0,"maxScore":${maxPoints},"isCorrect":false,"isPartiallyCorrect":false,"overallAssessment":"TUTAJ AI WPISUJE SWOJĄ KRÓTKĄ OCENĘ np. 'Świetna odpowiedź!' lub 'Wymaga poprawy'","feedback":"","correctAnswer":"","missingElements":[],"correctElements":[],"suggestions":[]}

**WAŻNE:** 
- Jeśli score == maxScore: correctAnswer i suggestions MUSZĄ BYĆ PUSTE ("" i [])
- Tylko dla niepełnych odpowiedzi wypełnij correctAnswer i suggestions

KRYTYCZNE: Zwróć TYLKO czysty JSON bez żadnych dodatkowych znaków, komentarzy czy formatowania.
NIE używaj znaków nowej linii wewnątrz wartości string.
`;

  console.log("📤 SENDING TO CLAUDE:");
  console.log("─".repeat(80));
  console.log(`Prompt length: ${prompt.length} chars`);
  console.log(
    `Prompt preview (first 500 chars):\n${prompt.substring(0, 500)}...`
  );
  console.log("─".repeat(80) + "\n");

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    });

    console.log("📥 CLAUDE RESPONSE:");
    console.log("─".repeat(80));
    console.log(`Response ID: ${response.id}`);
    console.log(`Model: ${response.model}`);
    console.log(`Stop reason: ${response.stop_reason}`);
    console.log(`Usage:`, response.usage);

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      let textContent = messageContent.text.trim();

      console.log(
        `\nRaw response (first 1000 chars):\n${textContent.substring(0, 1000)}`
      );
      console.log("─".repeat(80) + "\n");

      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("❌ NO JSON FOUND IN RESPONSE!");
        console.error("Full response:", textContent);
        throw new Error("No JSON found in response");
      }

      let jsonString = jsonMatch[0];

      console.log("📝 Extracted JSON (first 500 chars):");
      console.log(jsonString.substring(0, 500));

      // Normalizacja
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

      console.log("\n✅ PARSED RESULT:");
      console.log(JSON.stringify(result, null, 2));
      console.log("=".repeat(80) + "\n");

      return result;
    }

    throw new Error("Invalid response format from AI");
  } catch (error) {
    console.error("\n❌ SHORT ANSWER ASSESSMENT ERROR:", error);
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

export async function assessEssayWithAI(
  content: string,
  topic: string,
  requirements: any
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  console.log("\n" + "=".repeat(80));
  console.log("🤖 STANDARD ESSAY ASSESSMENT (NO WEB RESEARCH)");
  console.log("=".repeat(80));
  console.log(`Topic: ${topic}`);
  console.log(`Word count: ${wordCount}`);
  console.log(`Min words required: ${requirements.minWords || 400}`);
  console.log(`Content length: ${content.length} characters`);
  console.log("=".repeat(80) + "\n");

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

KRYTERIA OCENY MATURALNEJ (SUMA: 35 PUNKTÓW):
1. **Spełnienie formalnych warunków** (0-1 pkt)
2. **Kompetencje literackie i kulturowe** (0-16 pkt)
3. **Kompozycja wypowiedzi** (0-7 pkt)
4. **Język wypowiedzi** (0-11 pkt)

WAŻNE: Oceniaj SPRAWIEDLIWIE.

KRYTYCZNE: Zwróć TYLKO czysty JSON w JEDNEJ linii bez formatowania.

Format JSON:
{"formalScore":0,"literaryScore":0,"compositionScore":0,"languageScore":0,"totalScore":0,"overallAssessment":"TUTAJ AI WPISUJE SWOJĄ OCENĘ JAKOŚCI np. 'Przeciętne wypracowanie' lub 'Dobra praca!'","detailedFeedback":{"strengths":[],"weaknesses":[],"suggestions":[]},"improvements":[],"wordCount":${wordCount},"percentageScore":0}
`;

  console.log("📤 SENDING TO CLAUDE:");
  console.log("─".repeat(80));
  console.log(`Prompt length: ${prompt.length} chars`);
  console.log(
    `Prompt preview (first 800 chars):\n${prompt.substring(0, 800)}...`
  );
  console.log("─".repeat(80) + "\n");

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    console.log("📥 CLAUDE RESPONSE:");
    console.log("─".repeat(80));
    console.log(`Response ID: ${response.id}`);
    console.log(`Model: ${response.model}`);
    console.log(`Stop reason: ${response.stop_reason}`);
    console.log(`Usage:`, response.usage);

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      let textContent = messageContent.text.trim();

      console.log(
        `\nRaw response (first 1000 chars):\n${textContent.substring(0, 1000)}`
      );
      console.log("─".repeat(80) + "\n");

      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("❌ NO JSON FOUND IN RESPONSE!");
        console.error("Full response:", textContent);
        throw new Error("No JSON found in response");
      }

      let jsonString = jsonMatch[0];

      // Normalizacja
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

      console.log("\n✅ PARSED RESULT:");
      console.log(`   formalScore: ${result.formalScore}`);
      console.log(`   literaryScore: ${result.literaryScore}`);
      console.log(`   compositionScore: ${result.compositionScore}`);
      console.log(`   languageScore: ${result.languageScore}`);
      console.log(`   totalScore: ${result.totalScore}`);
      console.log(`   percentageScore: ${result.percentageScore}`);

      if (!result.percentageScore && result.totalScore) {
        result.percentageScore = Math.round((result.totalScore / 35) * 100);
      }

      // Walidacja
      if (result.totalScore > 35) result.totalScore = 35;
      if (result.totalScore < 0) result.totalScore = 0;

      result.formalScore = Math.max(0, Math.min(1, result.formalScore || 0));
      result.literaryScore = Math.max(
        0,
        Math.min(16, result.literaryScore || 0)
      );
      result.compositionScore = Math.max(
        0,
        Math.min(7, result.compositionScore || 0)
      );
      result.languageScore = Math.max(
        0,
        Math.min(11, result.languageScore || 0)
      );

      console.log("\nFinal validated result:", JSON.stringify(result, null, 2));
      console.log("=".repeat(80) + "\n");

      return result;
    }

    throw new Error("Invalid response format from AI");
  } catch (error) {
    console.error("\n❌ ESSAY ASSESSMENT ERROR:", error);

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

export async function generateSessionSummary(
  sessionData: {
    completed: number;
    correct: number;
    streak: number;
    maxStreak: number;
    points: number;
    timeSpent: number;
    exercises: Array<{ difficulty: number; category: string; score: number }>;
  },
  userHistory: {
    totalSessions: number;
    averageScore: number;
    totalPoints: number;
    level: number;
    recentSessions: Array<{
      completed: number;
      correct: number;
      points: number;
    }>;
    categoryStrengths: Record<string, number>;
    improvementAreas: string[];
  },
  userName: string = "Uczniu"
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  const accuracy =
    sessionData.completed > 0
      ? Math.round((sessionData.correct / sessionData.completed) * 100)
      : 0;

  const avgSessionAccuracy =
    userHistory.totalSessions > 0 ? Math.round(userHistory.averageScore) : 0;

  // ✅✅✅ NAPRAWIONY PROMPT - KOMPLETNY ✅✅✅
  const prompt = `
Jesteś AI coachem edukacyjnym. Przeanalizuj zakończoną sesję nauki ucznia i stwórz SZCZERE, REALISTYCZNE podsumowanie.

IMIĘ UCZNIA: ${userName}

=== OBECNA SESJA ===
- Ukończone zadania: ${sessionData.completed}
- Poprawne odpowiedzi: ${sessionData.correct}
- Dokładność: ${accuracy}%
- Najdłuższa seria: ${sessionData.maxStreak}
- Zdobyte punkty: ${sessionData.points}
- Czas nauki: ${Math.round(sessionData.timeSpent / 60)} minut

Trudność zadań w sesji:
${sessionData.exercises
  .map(
    (e) =>
      `- Poziom ${e.difficulty}, ${e.category}: ${
        e.score > 0 ? "poprawne" : "błędne"
      }`
  )
  .join("\n")}

=== HISTORIA UCZNIA ===
- Całkowita liczba sesji: ${userHistory.totalSessions}
- Średnia dokładność (wszystkie sesje): ${avgSessionAccuracy}%
- Całkowite punkty: ${userHistory.totalPoints}
- Poziom: ${userHistory.level}

Ostatnie 5 sesji:
${userHistory.recentSessions
  .map(
    (s, i) =>
      `Sesja ${i + 1}: ${s.correct}/${s.completed} poprawnych, ${s.points} pkt`
  )
  .join("\n")}

Mocne strony ucznia (kategorie):
${Object.entries(userHistory.categoryStrengths)
  .map(([cat, score]) => `- ${cat}: ${Math.round(score as number)}%`)
  .join("\n")}

Obszary do poprawy:
${userHistory.improvementAreas.join(", ") || "Brak zidentyfikowanych obszarów"}

=== TWOJE ZADANIE ===
Stwórz PERSONALIZOWANE, KONSTRUKTYWNE podsumowanie sesji w formacie JSON.

**WAŻNE ZASADY:**
1. Bądź SZCZERY - jeśli sesja była słaba (accuracy < 50%), powiedz to wprost
2. Bądź KONKRETNY - odwołuj się do faktów z sesji
3. Bądź MOTYWUJĄCY - nawet po słabej sesji daj wskazówki
4. Używaj IMIENIA ucznia: ${userName}
5. PORÓWNAJ z poprzednimi sesjami (obecna: ${accuracy}%, średnia: ${avgSessionAccuracy}%)

**FORMAT JSON (KRYTYCZNE - zwróć DOKŁADNIE taką strukturę):**

{
  "headline": "Krótki, osobisty tytuł (np. '${userName}, dobra robota!' albo '${userName}, ta sesja była wyzwaniem')",
  "celebrationEmoji": "🎉 lub 🤔 lub 💪 (zależnie od wyniku)",
  "overallFeedback": "2-3 zdania o całej sesji - SZCZERE i KONKRETNE",
  "sessionMetrics": {
    "completed": ${sessionData.completed},
    "correct": ${sessionData.correct},
    "accuracy": ${accuracy},
    "points": ${sessionData.points},
    "timeSpent": ${Math.round(sessionData.timeSpent / 60)},
    "streak": ${sessionData.maxStreak}
  },
  "comparison": {
    "accuracyChange": ${accuracy - avgSessionAccuracy},
    "isImprovement": ${accuracy >= avgSessionAccuracy}
  },
  "highlights": [
    "Konkretne osiągnięcie 1 (np. 'Świetnie poradziłeś sobie z zadaniami poziomu 2')",
    "Konkretne osiągnięcie 2 (np. 'Najdłuższa seria: ${
      sessionData.maxStreak
    } poprawnych!')",
    "Konkretne osiągnięcie 3 (albo puste jeśli sesja była słaba)"
  ],
  "improvements": [
    "Widoczny postęp 1 (np. 'Twoja dokładność wzrosła o X% w porównaniu do średniej')",
    "Widoczny postęp 2 (albo puste jeśli brak postępów)"
  ],
  "areasToFocus": [
    "Co wymaga uwagi 1 (np. 'Zadania z kategorii X wymagają więcej pracy')",
    "Co wymaga uwagi 2 (np. 'Zwróć uwagę na zadania poziomu 3')",
    "Co wymaga uwagi 3"
  ],
  "nextSteps": [
    "Konkretna rekomendacja 1 (np. 'Przećwicz zadania z Romantyzmu - tam było najwięcej błędów')",
    "Konkretna rekomendacja 2 (np. 'Powtórz materiał z analizy utworu')",
    "Konkretna rekomendacja 3"
  ],
  "motivationalMessage": "2-3 zdania motywacji - PERSONALIZOWANE z imieniem ${userName}",
  "comparisonToPrevious": "1-2 zdania porównania z poprzednimi sesjami (obecna: ${accuracy}% vs średnia: ${avgSessionAccuracy}%)"
}

**PRZYKŁADY DOBRYCH ODPOWIEDZI:**

DOBRA SESJA (accuracy >= 70%):
{
  "headline": "${userName}, świetna sesja!",
  "celebrationEmoji": "🎉",
  "overallFeedback": "Ukończyłeś ${
    sessionData.completed
  } zadań z ${accuracy}% dokładnością. To był produktywny dzień nauki!",
  "highlights": [
    "Zdobyłeś ${sessionData.points} punktów",
    "Najdłuższa seria poprawnych: ${sessionData.maxStreak}",
    "Doskonale poradziłeś sobie z zadaniami poziomu 2"
  ],
  "improvements": [
    "Twoja dokładność ${accuracy}% jest wyższa niż średnia ${avgSessionAccuracy}%",
    "Widzę postęp w kategorii Test historycznoliteracki"
  ],
  "areasToFocus": [
    "Kontynuuj pracę z zadaniami wyższego poziomu",
    "Spróbuj zadań z epoki, w której miałeś błędy"
  ],
  "nextSteps": [
    "Przećwicz 5 zadań z poziomu 3",
    "Powtórz materiał z obszarów, gdzie pojawiły się błędy"
  ],
  "motivationalMessage": "Świetna robota, ${userName}! Kontynuuj tę formę a szybko osiągniesz mistrzowski poziom.",
  "comparisonToPrevious": "Twoja dzisiejsza dokładność ${accuracy}% jest lepsza od średniej ${avgSessionAccuracy}%. To znaczy, że robisz postępy!"
}

SŁABA SESJA (accuracy < 50%):
{
  "headline": "${userName}, ta sesja była wyzwaniem",
  "celebrationEmoji": "💪",
  "overallFeedback": "Ukończyłeś ${sessionData.completed} zadań, ale tylko ${
    sessionData.correct
  } poprawnie (${accuracy}%). Materiał wymaga dokładniejszej analizy.",
  "highlights": [
    "Poświęciłeś ${Math.round(
      sessionData.timeSpent / 60
    )} minut na naukę - to się liczy!"
  ],
  "improvements": [
    "Nawet w trudnej sesji zdobyłeś cenne doświadczenie"
  ],
  "areasToFocus": [
    "Zadania z kategorii X wymagają więcej uwagi - tam było najwięcej błędów",
    "Wróć do podstaw i powtórz materiał teoretyczny",
    "Spróbuj łatwiejszych zadań żeby odbudować pewność siebie"
  ],
  "nextSteps": [
    "Przeczytaj notatki z tematów, w których pojawiły się błędy",
    "Rozwiąż 10 łatwiejszych zadań na rozgrzewkę",
    "Poproś o pomoc nauczyciela przy trudniejszych zagadnieniach"
  ],
  "motivationalMessage": "Każdy ma trudniejsze dni, ${userName}. Ważne, że nie rezygnujesz! Następna sesja będzie lepsza - teraz wiesz, nad czym popracować.",
  "comparisonToPrevious": "Dzisiejsza sesja (${accuracy}%) była poniżej Twojej średniej (${avgSessionAccuracy}%), ale to normalne - czasem trzeba cofnąć się o krok, żeby lepiej zrozumieć materiał."
}

**KRYTYCZNE:**
- Zwróć TYLKO czysty JSON w JEDNEJ linii
- NIE dodawaj \`\`\`json ani żadnych dodatkowych znaków
- Wszystkie tablice MUSZĄ mieć co najmniej 1-2 elementy
- Użyj DOKŁADNIE tej struktury JSON
`;

  try {
    console.log("🤖 Sending prompt to Claude API...");
    console.log(`Prompt length: ${prompt.length} chars`);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    });

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      let textContent = messageContent.text.trim();

      console.log("📥 RAW RESPONSE FROM CLAUDE:");
      console.log(textContent.substring(0, 500) + "...");

      // Usuń markdown jeśli jest
      textContent = textContent
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("❌ NO JSON IN RESPONSE!");
        console.error("Full response:", textContent);
        throw new Error("No JSON found in AI response");
      }

      const result = JSON.parse(jsonMatch[0]);

      console.log("✅ PARSED AI SUMMARY:");
      console.log("  headline:", result.headline);
      console.log("  highlights:", result.highlights?.length, "items");
      console.log("  improvements:", result.improvements?.length, "items");
      console.log("  areasToFocus:", result.areasToFocus?.length, "items");
      console.log("  nextSteps:", result.nextSteps?.length, "items");

      return {
        ...result,
        sessionMetrics: {
          completed: sessionData.completed,
          correct: sessionData.correct,
          accuracy,
          points: sessionData.points,
          timeSpent: Math.round(sessionData.timeSpent / 60),
          streak: sessionData.maxStreak,
        },
        comparison: {
          accuracyChange: accuracy - avgSessionAccuracy,
          isImprovement: accuracy >= avgSessionAccuracy,
        },
      };
    }

    throw new Error("Invalid AI response format");
  } catch (error) {
    console.error("❌ AI SESSION SUMMARY ERROR:", error);

    // Fallback - lepszy niż nic
    const isGoodSession = accuracy >= 60;
    return {
      headline: isGoodSession
        ? `${userName}, sesja zakończona!`
        : `${userName}, ta sesja była wyzwaniem`,
      celebrationEmoji: isGoodSession ? "🎉" : "💪",
      overallFeedback: isGoodSession
        ? `Ukończyłeś ${sessionData.completed} zadań z ${accuracy}% dokładnością.`
        : `Ukończyłeś ${sessionData.completed} zadań, ale tylko ${sessionData.correct} poprawnie (${accuracy}%).`,
      highlights: isGoodSession
        ? [
            `Zdobyte punkty: ${sessionData.points}`,
            `Najdłuższa seria: ${sessionData.maxStreak}`,
          ]
        : [`Poświęciłeś ${Math.round(sessionData.timeSpent / 60)} minut`],
      improvements: isGoodSession
        ? ["Kontynuuj regularną naukę"]
        : ["Każda sesja to nauka"],
      areasToFocus: isGoodSession
        ? ["Spróbuj trudniejszych zadań"]
        : ["Wróć do materiału", "Przećwicz podstawy"],
      nextSteps: ["Zaplanuj następną sesję"],
      motivationalMessage: isGoodSession
        ? `Świetna robota, ${userName}!`
        : `Każdy ma trudniejsze dni, ${userName}. Następna sesja będzie lepsza!`,
      comparisonToPrevious: `Twoja dokładność: ${accuracy}%, średnia: ${avgSessionAccuracy}%`,
      sessionMetrics: {
        completed: sessionData.completed,
        correct: sessionData.correct,
        accuracy,
        points: sessionData.points,
        timeSpent: Math.round(sessionData.timeSpent / 60),
        streak: sessionData.maxStreak,
      },
      comparison: {
        accuracyChange: accuracy - avgSessionAccuracy,
        isImprovement: accuracy >= avgSessionAccuracy,
      },
    };
  }
}

/**
 * Ocenia odpowiedź NA PODSTAWIE zescrapowanych źródeł
 */
async function assessWithSourceContext(
  userAnswer: string,
  question: string,
  sourceContent: string,
  exerciseType: string,
  maxPoints: number,
  workTitle?: string
): Promise<any> {
  if (!anthropic) {
    throw new Error("AI service not initialized");
  }

  console.log("\n" + "─".repeat(80));
  console.log("🎯 ASSESSMENT WITH SOURCE CONTEXT");
  console.log("─".repeat(80));
  console.log(`Exercise type: ${exerciseType}`);
  console.log(`Max points: ${maxPoints}`);
  console.log(`Work title: ${workTitle || "none"}`);
  console.log(`User answer length: ${userAnswer.length} chars`);
  console.log(`Source content length: ${sourceContent.length} chars`);
  console.log("─".repeat(80) + "\n");

  const prompt = `
Jesteś ekspertem egzaminatorem maturalnym. Oceń odpowiedź ucznia NA PODSTAWIE dostarczonych źródeł literackich.

PYTANIE: ${question}
${workTitle ? `DZIEŁO LITERACKIE: ${workTitle}` : ""}

ODPOWIEDŹ UCZNIA:
${userAnswer}

=== MATERIAŁY ŹRÓDŁOWE ===
${sourceContent}
=== KONIEC MATERIAŁÓW ===

INSTRUKCJE OCENY:
1. **SPRAWDŹ CZY ODPOWIEDŹ DOTYCZY PYTANIA** - to NAJWAŻNIEJSZE! Jeśli uczeń pisze o czymś innym, odejmij punkty!
2. **BAZUJ WYŁĄCZNIE NA ŹRÓDŁACH** - nie używaj swojej pamięci treningowej
3. Sprawdź czy odpowiedź ucznia jest ZGODNA z faktami ze źródeł
4. Oceń MERYTORYCZNIE - czy odpowiedź zawiera informacje ze źródeł
5. Bądź SPRAWIEDLIWY - jeśli odpowiedź jest zgodna ze źródłami I ODPOWIADA NA PYTANIE, przyznaj punkty

PRZYKŁAD BŁĘDU:
Pytanie: "Jak bohater reaguje na główną bohaterkę?"
Zła odpowiedź: "Bohater jest odważny i waleczny" ← NIE ODPOWIADA NA PYTANIE!
Dobra odpowiedź: "Bohater reaguje na bohaterkę z szacunkiem i miłością"

MAKSYMALNA LICZBA PUNKTÓW: ${maxPoints}

${
  exerciseType === "ESSAY"
    ? `
KRYTERIA DLA WYPRACOWANIA (35 punktów):
- Formalne warunki (0-1 pkt)
- Kompetencje literackie (0-16 pkt) - zgodność ze źródłami I ODPOWIEDŹ NA TEMAT!
- Kompozycja (0-7 pkt)
- Język (0-11 pkt)

Format JSON:
{"formalScore":0,"literaryScore":0,"compositionScore":0,"languageScore":0,"totalScore":0,"detailedFeedback":{"strengths":[],"weaknesses":[],"suggestions":[]},"improvements":[],"percentageScore":0}
`
    : `
KRYTERIA DLA KRÓTKIEJ ODPOWIEDZI (${maxPoints} punktów):
1. CZY ODPOWIEDŹ DOTYCZY PYTANIA? (najważniejsze!)
2. Poprawność faktyczna (ZGODNOŚĆ ZE ŹRÓDŁAMI!)
3. Kompletność odpowiedzi
4. Precyzja językowa

Format JSON:
{"score":0,"maxScore":${maxPoints},"isCorrect":false,"isPartiallyCorrect":false,"feedback":"","correctAnswer":"","missingElements":[],"correctElements":[],"suggestions":[]}

W feedback MUSISZ NAPISAĆ czy odpowiedź dotyczy pytania!
`
}

KRYTYCZNE: Zwróć TYLKO czysty JSON w jednej linii, bez żadnych dodatkowych znaków.
`;

  console.log("📤 SENDING TO CLAUDE:");
  console.log(`   Total prompt length: ${prompt.length} chars`);
  console.log(
    `   Prompt preview (first 1000 chars):\n${prompt.substring(0, 1000)}...`
  );
  console.log("─".repeat(80) + "\n");

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    });

    console.log("📥 CLAUDE RESPONSE:");
    console.log("─".repeat(80));
    console.log(`Response ID: ${response.id}`);
    console.log(`Stop reason: ${response.stop_reason}`);
    console.log(`Usage:`, response.usage);

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      let textContent = messageContent.text.trim();

      console.log(
        `\nRaw response (first 1500 chars):\n${textContent.substring(0, 1500)}`
      );
      console.log("─".repeat(80) + "\n");

      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("❌ NO JSON IN AI RESPONSE");
        console.error("Full response:", textContent);
        throw new Error("No JSON found in response");
      }

      let jsonString = jsonMatch[0];

      // Normalizacja
      jsonString = jsonString
        .replace(/[\r\n\t]/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/"\s+:/g, '":')
        .replace(/:\s+"/g, ':"')
        .replace(/,\s+"/g, ',"');

      const result = JSON.parse(jsonString);

      console.log("\n✅ PARSED ASSESSMENT RESULT:");
      console.log(JSON.stringify(result, null, 2));

      // Walidacja
      if (exerciseType !== "ESSAY") {
        result.score = Number(result.score) || 0;
        result.maxScore = Number(result.maxScore || maxPoints);
        result.isCorrect = Boolean(result.isCorrect);
        result.isPartiallyCorrect = Boolean(result.isPartiallyCorrect);
      } else {
        result.totalScore = Math.min(Number(result.totalScore) || 0, maxPoints);
        if (!result.percentageScore) {
          result.percentageScore = Math.round((result.totalScore / 35) * 100);
        }
      }

      console.log("\nFinal validated result:", JSON.stringify(result, null, 2));
      console.log("─".repeat(80) + "\n");

      return result;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("\n❌ ASSESSMENT WITH SOURCE CONTEXT FAILED:", error);
    throw error;
  }
}
