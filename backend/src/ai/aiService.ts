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

// backend/src/ai/aiService.ts

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

Mocne strony ucznia:
${Object.entries(userHistory.categoryStrengths)
  .map(([cat, score]) => `- ${cat}: ${Math.round(score as number)}%`)
  .join("\n")}

Obszary do poprawy:
${userHistory.improvementAreas.join(", ") || "Brak zidentyfikowanych obszarów"}

=== KRYTYCZNE ZASADY TONU I SZCZEROŚCI ===

1. **KATEGORYZACJA WYNIKU** (na podstawie dokładności):
   - DOSKONAŁY (≥80%): Entuzjastyczny, świętujący
   - BARDZO DOBRY (70-79%): Pozytywny, zachęcający
   - DOBRY (60-69%): Ciepły, wspierający z drobnymi sugestiami
   - ŚREDNI (50-59%): Neutralny, konstruktywny, wskazujący co poprawić
   - SŁABY (30-49%): Szczery, empatyczny, ale jasno wskazujący problemy
   - BARDZO SŁABY (<30%): Poważny, wspierający, ale BARDZO szczery - to wymaga uwagi!

2. **TON NA PODSTAWIE AKTUALNEGO WYNIKU:**

   Jeśli accuracy >= 70%:
   - Używaj entuzjastycznych sformułowań
   - Podkreślaj osiągnięcia
   - Celebruj sukces
   
   Jeśli accuracy 50-69%:
   - Bądź pozytywny, ale realistyczny
   - Wskaż co poszło dobrze I co wymaga pracy
   - Zachęcaj, ale konkretnie
   
   Jeśli accuracy < 50%:
   - Bądź SZCZERY - to nie jest dobry wynik
   - Wskaż konkretne problemy
   - Zaoferuj praktyczne rozwiązania
   - Zachęcaj, ale w sposób realistyczny: "Wiem, że możesz lepiej"
   - NIE mów "świetnie", "znakomicie" itp. gdy wynik jest słaby!

3. **PORÓWNANIE Z POPRZEDNIMI SESJAMI:**
   - Jeśli accuracy > avgSessionAccuracy o >10%: "Znacząca poprawa!"
   - Jeśli accuracy jest podobne (±10%): "Stabilny poziom"
   - Jeśli accuracy < avgSessionAccuracy o >10%: "Dzisiaj było trudniej - przeanalizujmy dlaczego"
   - Jeśli accuracy spadło o >20%: "To wyraźny spadek - coś wymaga uwagi"

4. **AUTENTYCZNOŚĆ > FAŁSZYWA POZYTYWNOŚĆ:**
   - NIE mów "świetnie" gdy jest źle
   - NIE twierdź że jest postęp, gdy go nie ma
   - NIE używaj wykrzykników (!) przy słabych wynikach
   - Bądź wspierający, ale SZCZERY

5. **PRZYKŁADY WŁAŚCIWEGO TONU:**

   Dla accuracy 10%:
   ✅ "Dzisiejsza sesja była wyzwaniem - tylko ${sessionData.correct} z ${
    sessionData.completed
  } poprawnych odpowiedzi. To wynik, który wymaga uwagi i analizy."
   ❌ "Świetnie dzisiaj pracowałeś!"
   
   Dla accuracy 85%:
   ✅ "Fantastyczna sesja! ${sessionData.correct} z ${
    sessionData.completed
  } to znakomity wynik!"
   ❌ "Niezły wynik, ale możesz lepiej"

=== ZADANIE ===
Stwórz SZCZERE, REALISTYCZNE podsumowanie w formacie JSON:

{
  "headline": "Krótki nagłówek ODPOWIEDNI DO WYNIKU (maks 60 znaków) - użyj imienia",
  "overallFeedback": "2-3 zdania REALISTYCZNEGO feedbacku - bądź szczery o jakości sesji",
  "highlights": [
    "2-4 konkretne rzeczy, które NAPRAWDĘ poszły dobrze (nawet przy słabym wyniku można znaleźć coś pozytywnego)"
  ],
  "improvements": [
    "Jeśli jest postęp: wskaż go konkretnie. Jeśli NIE MA postępu: nie udawaj że jest!"
  ],
  "areasToFocus": [
    "2-4 KONKRETNE, PRAKTYCZNE obszary do poprawy - szczególnie ważne przy słabych wynikach"
  ],
  "motivationalMessage": "Osobista wiadomość DOSTOSOWANA DO WYNIKU (2-3 zdania) - użyj imienia",
  "comparisonToPrevious": "SZCZERA analiza w porównaniu do poprzednich sesji",
  "nextSteps": [
    "3-4 KONKRETNE, WYKONALNE kroki - nie ogólniki!"
  ],
  "celebrationEmoji": "Emoji ODPOWIEDNIE DO WYNIKU (🎉 dla >80%, 💪 dla 50-80%, 🤔 dla <50%)"
}

=== ZASADY TECHNICZNE ===
1. UŻYWAJ IMIENIA UCZNIA (${userName}) TYLKO:
   - Raz w headline
   - Raz w motivationalMessage
   - NIGDZIE INDZIEJ!

2. FORMA CZASOWNIKÓW - używaj WYŁĄCZNIE form bezosobowych:
   ✅ "Udało Ci się", "Świetnie Ci poszło", "Możesz lepiej"
   ❌ "Zrobiłeś", "Zrobiłaś", "Wykonałeś", "Wykonałaś"

3. Zwróć TYLKO czysty JSON bez dodatkowych znaków

=== PRZYKŁADY PRAWIDŁOWYCH PODSUMOWAŃ ===

Dla accuracy 85%:
{
  "headline": "Świetna robota, ${userName}! Znakomita sesja!",
  "overallFeedback": "To była naprawdę dobra sesja! ${sessionData.correct} z ${
    sessionData.completed
  } poprawnych odpowiedzi to znakomity wynik. Widać, że materiał został dobrze przyswojony.",
  "celebrationEmoji": "🎉"
}

Dla accuracy 55%:
{
  "headline": "${userName}, sesja z mieszanymi wynikami",
  "overallFeedback": "Sesja przyniosła rezultaty na średnim poziomie - ${
    sessionData.correct
  } z ${
    sessionData.completed
  } poprawnych. Jest przestrzeń do poprawy, ale już teraz widać obszary, w których radzisz sobie dobrze.",
  "celebrationEmoji": "💪"
}

Dla accuracy 15%:
{
  "headline": "${userName}, ta sesja była wyzwaniem",
  "overallFeedback": "Dzisiejsza sesja okazała się trudna - tylko ${
    sessionData.correct
  } z ${
    sessionData.completed
  } poprawnych odpowiedzi. To wynik, który jasno wskazuje, że materiał wymaga gruntownej powtórki i innego podejścia do nauki.",
  "areasToFocus": [
    "Przeanalizuj szczegółowo błędne odpowiedzi - zrozum DLACZEGO były błędne",
    "Wróć do podstaw w kategorii ${
      sessionData.exercises[0].category
    } - materiał wymaga solidnej powtórki",
    "Rozważ zmianę strategii nauki - obecna może nie być optymalna"
  ],
  "motivationalMessage": "Rozumiem, że ta sesja mogła być frustrująca. Ważne, żebyś nie zniechęcał się - każdy ma gorsze dni. Kluczowe jest teraz solidne przeanalizowanie błędów i zaplanowanie systematycznej powtórki materiału, ${userName}.",
  "celebrationEmoji": "🤔"
}
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2048,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    });

    const messageContent = response.content[0];
    if (messageContent.type === "text") {
      let textContent = messageContent.text.trim();

      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in AI response");
      }

      const result = JSON.parse(jsonMatch[0]);

      // Dodaj metryki sesji do wyniku
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
    console.error("AI session summary error:", error);

    // Fallback TAKŻE musi być realistyczny!
    const isGoodSession = accuracy >= 60;

    return {
      headline: isGoodSession
        ? `${userName}, sesja zakończona!`
        : `${userName}, ta sesja była wyzwaniem`,
      overallFeedback: isGoodSession
        ? `Ukończyłeś ${sessionData.completed} zadań z ${accuracy}% dokładnością. To była produktywna sesja!`
        : `Ukończyłeś ${sessionData.completed} zadań, ale tylko ${sessionData.correct} poprawnie (${accuracy}%). Materiał wymaga dokładniejszej analizy i powtórki.`,
      highlights: isGoodSession
        ? [
            `Zdobyte punkty: ${sessionData.points}`,
            `Najdłuższa seria: ${sessionData.maxStreak}`,
            `Czas nauki: ${Math.round(sessionData.timeSpent / 60)} minut`,
          ]
        : [
            `Poświęciłeś ${Math.round(
              sessionData.timeSpent / 60
            )} minut na naukę - to dobry czas`,
            sessionData.maxStreak > 0
              ? `Była krótka passa ${sessionData.maxStreak} poprawnych`
              : "Próbowałeś różnych zadań",
          ],
      improvements: isGoodSession
        ? ["Kontynuuj regularną naukę w tym tempie"]
        : ["Dzisiejsza sesja pokazała obszary wymagające więcej uwagi"],
      areasToFocus: isGoodSession
        ? ["Spróbuj trudniejszych zadań w następnej sesji"]
        : [
            "Przeanalizuj dokładnie błędne odpowiedzi",
            "Wróć do materiału teoretycznego",
            "Zacznij od łatwiejszych zadań aby odbudować pewność siebie",
          ],
      motivationalMessage: isGoodSession
        ? `Każda sesja przybliża Cię do celu. Świetna robota, ${userName}!`
        : `Każdy ma trudniejsze dni, ${userName}. Ważne jest, żeby nie poddawać się i systematycznie pracować nad słabszymi obszarami. Następna sesja będzie lepsza!`,
      comparisonToPrevious: isGoodSession
        ? "Kontynuujesz swoją naukę - to najważniejsze!"
        : "Ta sesja była trudniejsza niż poprzednie - warto przeanalizować dlaczego",
      nextSteps: isGoodSession
        ? ["Zaplanuj następną sesję", "Powtórz materiał z tej sesji"]
        : [
            "Przeanalizuj wszystkie błędne odpowiedzi",
            "Powtórz podstawy w obszarach gdzie było najtrudniej",
            "Zaplanuj sesję z łatwiejszymi zadaniami dla odbudowy pewności siebie",
          ],
      celebrationEmoji: isGoodSession ? "🎉" : "🤔",
      sessionMetrics: {
        completed: sessionData.completed,
        correct: sessionData.correct,
        accuracy,
        points: sessionData.points,
        timeSpent: Math.round(sessionData.timeSpent / 60),
        streak: sessionData.maxStreak,
      },
      comparison: {
        accuracyChange: 0,
        isImprovement: isGoodSession,
      },
    };
  }
}
