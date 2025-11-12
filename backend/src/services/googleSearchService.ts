// backend/src/services/googleSearchService.ts
import { getAIClient } from "../ai/aiService";
import axios from "axios";

interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
}

class GoogleSearchService {
  private apiKey: string = "";
  private searchEngineId: string = "";
  private initialized: boolean = false;

  // ✅ INICJALIZACJA DOPIERO PRZY PIERWSZYM UŻYCIU
  private initialize() {
    if (this.initialized) return;

    this.apiKey = process.env.GOOGLE_SEARCH_API_KEY || "";
    this.searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID || "";
    this.initialized = true;

    console.log("\n" + "=".repeat(80));
    console.log("🔧 GOOGLE SEARCH SERVICE INITIALIZATION");
    console.log("=".repeat(80));
    console.log(`API Key configured: ${this.apiKey ? "✅ YES" : "❌ NO"}`);
    console.log(
      `Search Engine ID configured: ${this.searchEngineId ? "✅ YES" : "❌ NO"}`
    );

    if (!this.apiKey || !this.searchEngineId) {
      console.warn("⚠️  GOOGLE SEARCH API NOT CONFIGURED!");
      console.warn("    Assessments will use fallback without web research");
    } else {
      console.log("✅ Google Search API ready");
      console.log(
        `   API Key (first 10 chars): ${this.apiKey.substring(0, 10)}...`
      );
      console.log(`   Search Engine ID: ${this.searchEngineId}`);
    }
    console.log("=".repeat(80) + "\n");
  }

  async searchLiteratureSources(
    query: string,
    maxResults: number = 5
  ): Promise<GoogleSearchResult[]> {
    this.initialize();

    console.log("\n" + "─".repeat(80));
    console.log("🔍 GOOGLE SEARCH REQUEST");
    console.log("─".repeat(80));
    console.log(`Query: "${query}"`);
    console.log(`Max results: ${maxResults}`);

    if (!this.apiKey || !this.searchEngineId) {
      console.error("\n❌ CANNOT SEARCH - API NOT CONFIGURED!");
      return [];
    }

    try {
      // ✅ POPRAWNE PARAMETRY - BEZ siteSearch i sort!
      const searchParams = {
        key: this.apiKey,
        cx: this.searchEngineId,
        q: query,
        num: Math.min(maxResults, 10), // Max 10 per request
        hl: "pl", // ✅ ZAMIAST lr: "lang_pl"
        start: 1,
      };

      console.log("\n📤 Sending request to Google Custom Search API...");
      console.log(`   Query: "${searchParams.q}"`);
      console.log(`   Num: ${searchParams.num}`);
      console.log(`   Language: ${searchParams.hl}`);

      const startTime = Date.now();

      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: searchParams,
          timeout: 10000,
        }
      );

      const duration = Date.now() - startTime;

      console.log(`\n📥 Google API Response received in ${duration}ms`);
      console.log(`   Status: ${response.status}`);

      const items = response.data.items || [];

      if (items.length === 0) {
        console.warn("\n⚠️  NO RESULTS FOUND");
        console.warn(`   Query: "${query}"`);
        return [];
      }

      const results: GoogleSearchResult[] = items.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      }));

      console.log(`\n✅ SEARCH SUCCESSFUL: ${results.length} sources found`);
      results.forEach((r, i) => {
        console.log(`   [${i + 1}] ${r.title}`);
        console.log(`       ${r.link}`);
      });

      return results;
    } catch (error) {
      console.error("\n❌ GOOGLE SEARCH API ERROR");
      if (axios.isAxiosError(error)) {
        console.error(`   Status: ${error.response?.status}`);
        console.error(`   Message: ${error.message}`);
        if (error.response?.data) {
          console.error(
            `   Details:`,
            JSON.stringify(error.response.data, null, 2)
          );
        }
      }
      return [];
    }
  }

  async generateSearchQuery(
    question: string,
    userAnswer?: string,
    workTitle?: string
  ): Promise<string> {
    // ✅ INICJALIZUJ PRZY PIERWSZYM UŻYCIU
    this.initialize();

    console.log("\n📝 GENERATING SEARCH QUERY WITH CLAUDE");

    const prompt = `Na podstawie pytania i odpowiedzi ucznia, wygeneruj OPTYMALNE zapytanie Google (max 100 znaków) do wyszukania polskich źródeł literackich.

PYTANIE: ${question}
${workTitle ? `DZIEŁO: ${workTitle}` : ""}
${
  userAnswer
    ? `ODPOWIEDŹ UCZNIA (fragment): ${userAnswer.substring(0, 300)}...`
    : ""
}

Zwróć TYLKO zapytanie, bez dodatkowych wyjaśnień. Zapytanie powinno zawierać kluczowe słowa po polsku.`;

    try {
      const anthropic = getAIClient();
      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 100,
        temperature: 0.3,
        messages: [{ role: "user", content: prompt }],
      });

      const messageContent = response.content[0];
      if (messageContent.type !== "text") {
        throw new Error("Unexpected response type");
      }

      const query = messageContent.text.trim();
      console.log(`✅ Generated query: "${query}"`);

      return query;
    } catch (error) {
      console.error("❌ Query generation failed, using fallback");
      const parts = [workTitle, question.split(" ").slice(0, 5).join(" ")];
      return parts.filter(Boolean).join(" ");
    }
  }
}

// ✅ SINGLETON BEZ WYWOŁANIA KONSTRUKTORA
export const googleSearchService = new GoogleSearchService();
