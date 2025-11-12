// backend/src/services/webScrapperService.ts

import axios from "axios";

interface ScrapperResponse {
  text: string;
  url: string;
  success: boolean;
  error?: string;
}

export class WebScrapperService {
  private scrapperUrl: string;
  private timeout: number = 120000; // 120s timeout

  constructor() {
    this.scrapperUrl =
      process.env.SCRAPPER_API_URL ||
      "http://scraper-najnowszy-env.eba-8usajxuv.eu-north-1.elasticbeanstalk.com";

    console.log("\n" + "=".repeat(80));
    console.log("🕷️  WEB SCRAPPER SERVICE INITIALIZATION");
    console.log("=".repeat(80));
    console.log(`Scrapper URL: ${this.scrapperUrl}`);
    console.log(`Timeout: ${this.timeout}ms (${this.timeout / 1000}s)`);
    console.log("=".repeat(80) + "\n");
  }

  /**
   * Scrapuje pojedynczy URL
   */
  async scrapeUrl(url: string): Promise<ScrapperResponse> {
    console.log("\n" + "─".repeat(80));
    console.log(`🕷️  SCRAPING SINGLE URL`);
    console.log("─".repeat(80));
    console.log(`Target URL: ${url}`);
    console.log(`Scrapper endpoint: ${this.scrapperUrl}/scrape`);
    console.log(`Timeout: ${this.timeout}ms`);

    try {
      const requestBody = { url: url };
      console.log(`\n📤 Sending POST request...`);
      console.log(`   Body:`, requestBody);

      const startTime = Date.now();

      const response = await axios.post(
        `${this.scrapperUrl}/scrape`,
        requestBody,
        {
          timeout: this.timeout,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(
        `\n📥 Scrapper response received in ${duration}ms (${(
          duration / 1000
        ).toFixed(1)}s)`
      );
      console.log(`   Status: ${response.status}`);
      console.log(
        `   Response has text: ${
          response.data && response.data.text ? "YES" : "NO"
        }`
      );

      if (response.data && response.data.text) {
        const textLength = response.data.text.length;
        console.log(`   Text length: ${textLength} characters`);
        console.log(`   Preview (first 200 chars):`);
        console.log(`   "${response.data.text.substring(0, 200)}..."`);
        console.log(`\n✅ SCRAPING SUCCESSFUL`);
        console.log("─".repeat(80) + "\n");

        return {
          text: response.data.text,
          url: url,
          success: true,
        };
      } else {
        console.error(`\n❌ NO TEXT IN RESPONSE`);
        console.error(`   Response data:`, response.data);
        console.log("─".repeat(80) + "\n");

        return {
          text: "",
          url: url,
          success: false,
          error: "No text returned",
        };
      }
    } catch (error) {
      console.error("\n" + "─".repeat(80));
      console.error(`❌ SCRAPING FAILED FOR: ${url}`);
      console.error("─".repeat(80));

      if (axios.isAxiosError(error)) {
        console.error(`   HTTP Status: ${error.response?.status || "N/A"}`);
        console.error(`   Error Message: ${error.message}`);
        console.error(`   Error Code: ${error.code}`);

        if (error.code === "ECONNABORTED") {
          console.error(`   Reason: Request timeout (>${this.timeout}ms)`);
        } else if (error.code === "ECONNREFUSED") {
          console.error(`   Reason: Connection refused - scrapper may be down`);
        }

        if (error.response?.data) {
          console.error(`   Response data:`, error.response.data);
        }
      } else {
        console.error(`   Unknown error:`, error);
      }

      console.error("─".repeat(80) + "\n");

      return {
        text: "",
        url: url,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Scrapuje wiele URLi równolegle (z limitem jednocześnie)
   */
  async scrapeMultipleUrls(
    urls: string[],
    concurrentLimit: number = 2
  ): Promise<ScrapperResponse[]> {
    console.log("\n" + "=".repeat(80));
    console.log("🕷️  SCRAPING MULTIPLE URLs");
    console.log("=".repeat(80));
    console.log(`Total URLs to scrape: ${urls.length}`);
    console.log(`Concurrent limit: ${concurrentLimit}`);
    console.log(
      `Estimated total time: ${
        Math.ceil(urls.length / concurrentLimit) * 10
      }s (if each takes ~10s)`
    );
    console.log("\nURLs to scrape:");
    urls.forEach((url, i) => {
      console.log(`   [${i + 1}] ${url}`);
    });
    console.log("=".repeat(80) + "\n");

    const results: ScrapperResponse[] = [];
    const totalChunks = Math.ceil(urls.length / concurrentLimit);

    // Podziel na chunki po concurrentLimit
    for (let i = 0; i < urls.length; i += concurrentLimit) {
      const chunkNumber = Math.floor(i / concurrentLimit) + 1;
      const chunk = urls.slice(i, i + concurrentLimit);

      console.log("\n" + "─".repeat(80));
      console.log(`📦 PROCESSING CHUNK ${chunkNumber}/${totalChunks}`);
      console.log("─".repeat(80));
      console.log(`URLs in this chunk: ${chunk.length}`);
      chunk.forEach((url, idx) => {
        console.log(`   [${idx + 1}] ${url}`);
      });
      console.log(`\n⏳ Scraping ${chunk.length} URLs in parallel...`);

      const chunkStartTime = Date.now();

      const chunkResults = await Promise.all(
        chunk.map((url) => this.scrapeUrl(url))
      );

      const chunkEndTime = Date.now();
      const chunkDuration = chunkEndTime - chunkStartTime;

      console.log(`\n📊 CHUNK ${chunkNumber} RESULTS:`);
      console.log(
        `   Duration: ${chunkDuration}ms (${(chunkDuration / 1000).toFixed(
          1
        )}s)`
      );
      console.log(
        `   Successful: ${chunkResults.filter((r) => r.success).length}/${
          chunk.length
        }`
      );
      console.log(
        `   Failed: ${chunkResults.filter((r) => !r.success).length}/${
          chunk.length
        }`
      );

      chunkResults.forEach((result, idx) => {
        if (result.success) {
          console.log(
            `   ✅ [${idx + 1}] ${result.url} - ${result.text.length} chars`
          );
        } else {
          console.log(
            `   ❌ [${idx + 1}] ${result.url} - ERROR: ${result.error}`
          );
        }
      });

      results.push(...chunkResults);
      console.log("─".repeat(80) + "\n");
    }

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    console.log("\n" + "=".repeat(80));
    console.log("📊 SCRAPING SUMMARY");
    console.log("=".repeat(80));
    console.log(`Total URLs processed: ${urls.length}`);
    console.log(
      `✅ Successful: ${successCount} (${Math.round(
        (successCount / urls.length) * 100
      )}%)`
    );
    console.log(
      `❌ Failed: ${failCount} (${Math.round(
        (failCount / urls.length) * 100
      )}%)`
    );
    console.log(`\nSuccessful scrapes:`);
    results
      .filter((r) => r.success)
      .forEach((result, i) => {
        console.log(
          `   [${i + 1}] ${result.url} - ${result.text.length} chars`
        );
      });

    if (failCount > 0) {
      console.log(`\nFailed scrapes:`);
      results
        .filter((r) => !r.success)
        .forEach((result, i) => {
          console.log(`   [${i + 1}] ${result.url} - ${result.error}`);
        });
    }
    console.log("=".repeat(80) + "\n");

    return results;
  }

  /**
   * Agreguje i czyści zescrapowaną treść
   */
  aggregateScrapedContent(
    results: ScrapperResponse[],
    maxTotalLength: number = 50000
  ): string {
    console.log("\n" + "=".repeat(80));
    console.log("📚 AGGREGATING SCRAPED CONTENT");
    console.log("=".repeat(80));
    console.log(`Total results: ${results.length}`);
    console.log(`Max total length: ${maxTotalLength} chars`);

    const successfulResults = results.filter((r) => r.success && r.text);

    console.log(`Successful results with text: ${successfulResults.length}`);

    if (successfulResults.length === 0) {
      console.log("\n❌ NO SUCCESSFUL RESULTS TO AGGREGATE");
      console.log("=".repeat(80) + "\n");
      return "";
    }

    console.log(`\n📊 Source sizes:`);
    successfulResults.forEach((result, i) => {
      console.log(`   [${i + 1}] ${result.url}: ${result.text.length} chars`);
    });

    let aggregatedContent = "";
    let currentLength = 0;
    let sourcesIncluded = 0;
    let sourcesTruncated = 0;

    console.log(`\n🔨 Building aggregated content...`);

    for (const result of successfulResults) {
      if (currentLength >= maxTotalLength) {
        console.log(`\n⚠️  Reached max length limit (${maxTotalLength})`);
        console.log(`   Stopping aggregation`);
        console.log(
          `   Sources included: ${sourcesIncluded}/${successfulResults.length}`
        );
        break;
      }

      console.log(`\n   Processing source ${sourcesIncluded + 1}:`);
      console.log(`   URL: ${result.url}`);
      console.log(`   Original length: ${result.text.length} chars`);

      // Wyczyść tekst
      const cleanedText = this.cleanScrapedText(result.text);
      console.log(`   After cleaning: ${cleanedText.length} chars`);

      // Dodaj nagłówek źródła
      const sourceBlock = `\n\n=== ŹRÓDŁO: ${result.url} ===\n${cleanedText}\n`;

      const availableSpace = maxTotalLength - currentLength;
      console.log(`   Available space: ${availableSpace} chars`);

      if (sourceBlock.length > availableSpace) {
        console.log(`   ⚠️  Source will be truncated to fit`);
        sourcesTruncated++;
      }

      const textToAdd = sourceBlock.substring(0, availableSpace);
      console.log(`   Adding: ${textToAdd.length} chars`);

      aggregatedContent += textToAdd;
      currentLength += textToAdd.length;
      sourcesIncluded++;

      console.log(`   Current total: ${currentLength} chars`);
    }

    console.log(`\n✅ AGGREGATION COMPLETE`);
    console.log("=".repeat(80));
    console.log(
      `Sources processed: ${sourcesIncluded}/${successfulResults.length}`
    );
    console.log(`Sources truncated: ${sourcesTruncated}`);
    console.log(`Final length: ${currentLength} chars`);
    console.log(
      `Space used: ${Math.round((currentLength / maxTotalLength) * 100)}%`
    );
    console.log(`\nContent preview (first 300 chars):`);
    console.log(aggregatedContent.substring(0, 300) + "...");
    console.log("=".repeat(80) + "\n");

    return aggregatedContent;
  }

  /**
   * Czyści zescrapowany tekst z artefaktów
   */
  private cleanScrapedText(text: string): string {
    console.log(`      🧹 Cleaning text...`);

    const originalLength = text.length;

    const cleaned = text
      .replace(/\s+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\{.*?\}/g, "")
      .replace(/\[.*?\]/g, "")
      .trim()
      .substring(0, 15000);

    console.log(`      Original: ${originalLength} chars`);
    console.log(`      After cleaning: ${cleaned.length} chars`);
    console.log(
      `      Reduction: ${originalLength - cleaned.length} chars (${Math.round(
        ((originalLength - cleaned.length) / originalLength) * 100
      )}%)`
    );

    return cleaned;
  }

  /**
   * Test connection do scrappera
   */
  async testConnection(): Promise<boolean> {
    console.log("\n" + "=".repeat(80));
    console.log("🧪 TESTING SCRAPPER CONNECTION");
    console.log("=".repeat(80));
    console.log(`Target URL: ${this.scrapperUrl}/`);
    console.log(`Timeout: 5000ms`);

    try {
      const startTime = Date.now();

      const response = await axios.get(`${this.scrapperUrl}/`, {
        timeout: 5000,
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`\n📥 Response received in ${duration}ms`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Status Text: ${response.statusText}`);

      if (response.status === 200) {
        console.log(`\n✅ SCRAPPER IS ONLINE AND RESPONDING`);
        console.log("=".repeat(80) + "\n");
        return true;
      } else {
        console.log(`\n⚠️  UNEXPECTED STATUS CODE`);
        console.log("=".repeat(80) + "\n");
        return false;
      }
    } catch (error) {
      console.error(`\n❌ SCRAPPER CONNECTION FAILED`);

      if (axios.isAxiosError(error)) {
        console.error(`   Error: ${error.message}`);
        console.error(`   Code: ${error.code}`);

        if (error.code === "ECONNABORTED") {
          console.error(`   Reason: Timeout (>5s)`);
        } else if (error.code === "ECONNREFUSED") {
          console.error(`   Reason: Connection refused - scrapper is DOWN`);
        }
      } else {
        console.error(`   Unknown error:`, error);
      }

      console.log("=".repeat(80) + "\n");
      return false;
    }
  }
}

// Singleton instance
export const webScrapperService = new WebScrapperService();
