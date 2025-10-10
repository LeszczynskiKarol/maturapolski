// frontend/src/features/content/PageViewer.tsx

// ==========================================
import html2pdf from "html2pdf.js";
import { ChevronLeft, ChevronRight, Clock, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PublicLayout } from "../../components/PublicLayout";
import { RatingWidget } from "../../components/RatingWidget";
import { RelatedPages } from "../../components/RelatedPages";
import { contentService } from "../../services/contentService";

interface PageData {
  id: string;
  slug: string;
  title: string;
  content: any;
  readingTime?: number;
  views: number;
  metaTitle: string;
  metaDescription: string;
  hub: {
    title: string;
    slug: string;
    author?: string;
    description: string;
  };
}

export function PageViewer() {
  const { hubSlug, pageSlug } = useParams<{
    hubSlug: string;
    pageSlug: string;
  }>();
  const isLalkaChapters =
    hubSlug === "lalka" &&
    pageSlug === "lalka-streszczenie-szczegolowe-dokladne-lektury";
  const [hubPages, setHubPages] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Podziel treść na "strony" na podstawie page_break
  const contentPages = page?.content?.blocks
    ? splitContentIntoPages(page.content.blocks)
    : [];

  const downloadAsPDF = () => {
    if (!page) return;

    // Stwórz kontener
    const tempContainer = document.createElement("div");
    tempContainer.style.cssText = `
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 14px;
    line-height: 1.6;
    color: #2d2d2d;
    padding: 20px;
  `;

    // Nagłówek
    const header = document.createElement("div");
    header.style.cssText =
      "margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;";
    header.innerHTML = `
    <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0; color: #1a1a1a;">
      ${page.title}
    </h1>
    <p style="font-size: 12px; color: #666; margin: 0;">
      ${page.hub.title}
    </p>
  `;
    tempContainer.appendChild(header);

    // WSZYSTKIE bloki jako HTML string (najszybsze)
    const allBlocks = page.content?.blocks || [];

    allBlocks.forEach((block: any) => {
      if (block.type === "page_break") return;

      if (block.type === "volume_break" && isLalkaChapters) {
        const volumeDiv = document.createElement("div");
        volumeDiv.style.cssText =
          "margin: 30px 0; padding: 15px; border-top: 3px solid #9333ea; border-bottom: 3px solid #9333ea; background: #faf5ff; text-align: center;";
        volumeDiv.innerHTML = `<h2 style="font-size: 20px; font-weight: bold; color: #7e22ce; margin: 0;">${
          block.content?.volumeTitle || "Tom"
        }</h2>`;
        tempContainer.appendChild(volumeDiv);
        return;
      }

      if (block.type === "volume_break") return;

      const element = renderBlockForPDF(block);
      if (element) {
        tempContainer.appendChild(element);
      }
    });

    // KLUCZOWA ZMIANA: Użyj jsPDF bezpośrednio z opcją splitTextToSize
    const opt = {
      margin: 10,
      filename: `${page.title.replace(
        /[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/g,
        "_"
      )}.pdf`,
      image: { type: "jpeg" as const, quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        windowWidth: 800,
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
      pagebreak: { mode: [] }, // PUSTA TABLICA = BEZ AUTOMATYCZNYCH PODZIAŁÓW
    };

    html2pdf().set(opt).from(tempContainer).save();
  };

  const volumeInfo = isLalkaChapters
    ? contentPages.map((pageBlocks, index) => {
        const startsWithVolumeBreak = pageBlocks[0]?.type === "volume_break";
        const volumeTitle = startsWithVolumeBreak
          ? pageBlocks[0].content?.volumeTitle
          : null;

        // Policz którym jesteśmy tomem
        let volumeNumber = 1;
        for (let i = 0; i <= index; i++) {
          if (contentPages[i][0]?.type === "volume_break") {
            volumeNumber =
              contentPages[i][0].content?.volumeTitle?.match(/\d+/)?.[0] ||
              volumeNumber;
          }
        }

        // POPRAWIONA LOGIKA: Policz numer rozdziału W TYM TOMIE
        let chapterInVolume = 1;

        if (startsWithVolumeBreak) {
          chapterInVolume = 1;
        } else {
          // Znajdź indeks ostatniego volume_break przed tą stroną
          let lastVolumeBreakIndex = -1;
          for (let i = index - 1; i >= 0; i--) {
            if (contentPages[i][0]?.type === "volume_break") {
              lastVolumeBreakIndex = i;
              break;
            }
          }

          // Policz odległość od ostatniego volume_break
          if (lastVolumeBreakIndex >= 0) {
            chapterInVolume = index - lastVolumeBreakIndex + 1;
          } else {
            // Jeśli nie ma wcześniejszego volume_break, jesteśmy w tomie 1
            chapterInVolume = index + 1;
          }
        }

        return {
          volumeNumber,
          chapterInVolume,
          volumeTitle,
          startsWithVolumeBreak,
        };
      })
    : [];

  const currentVolumeInfo = isLalkaChapters
    ? volumeInfo[currentPageIndex]
    : null;

  useEffect(() => {
    if (hubSlug && pageSlug) {
      loadPage();
      loadHubPages();
    }
  }, [hubSlug, pageSlug]);

  const loadHubPages = async () => {
    try {
      const pages = await contentService.getHubPages(hubSlug!);
      // SORTOWANIE ALFABETYCZNE - zawsze ta sama kolejność
      const sortedPages = [...pages].sort((a, b) =>
        a.title.localeCompare(b.title, "pl", { sensitivity: "base" })
      );
      setHubPages(sortedPages);
    } catch (error) {
      console.error("Error loading hub pages:", error);
    }
  };

  // Obsługa query params dla paginacji
  useEffect(() => {
    const pageParam = searchParams.get("p");
    if (pageParam) {
      const pageNum = parseInt(pageParam);
      if (pageNum > 0 && pageNum <= contentPages.length) {
        setCurrentPageIndex(pageNum - 1);
      }
    } else {
      setCurrentPageIndex(0);
    }
  }, [searchParams, contentPages.length]);

  const loadPage = async () => {
    try {
      const data = await contentService.getPage(hubSlug!, pageSlug!);
      setPage(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Podziel bloki na "strony" używając page_break
  function splitContentIntoPages(blocks: any[]) {
    const pages: any[][] = [];
    let currentPage: any[] = [];

    blocks.forEach((block) => {
      if (block.type === "page_break") {
        if (currentPage.length > 0) {
          pages.push(currentPage);
          currentPage = [];
        }
      } else {
        // WAŻNE: volume_break też dodajemy do strony
        currentPage.push(block);
      }
    });

    // Dodaj ostatnią stronę jeśli jest niepusta
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages.length > 0 ? pages : [blocks];
  }

  // Renderuj pojedynczy blok z obsługą enterów!
  const renderBlock = (block: any, index: number) => {
    // Helper: markdown do HTML
    const parseMarkdown = (text: string) => {
      let parsed = text;

      // Links: [tekst](url) -> <a>
      parsed = parsed.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
      );

      // Bold: **text** -> <strong>
      parsed = parsed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Italic: *text* -> <em>
      parsed = parsed.replace(/\*(.*?)\*/g, "<em>$1</em>");

      return parsed;
    };

    // Helper: podziel na linie + markdown
    const renderWithMarkdown = (text: string) => {
      const lines = text.split("\n");
      return lines.map((line, i) => (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: parseMarkdown(line) }} />
          {i < lines.length - 1 && <br />}
        </span>
      ));
    };

    switch (block.type) {
      case "volume_break":
        return null; // Nie renderuj inline
      case "h2":
        return (
          <h2
            key={index}
            className="text-2xl font-bold mb-4 mt-8"
            style={{ overflow: "auto" }}
          >
            {block.content}
          </h2>
        );
      case "h3":
        return (
          <h3
            key={index}
            className="text-xl font-bold mb-3 mt-6"
            style={{ overflow: "auto" }}
          >
            {block.content}
          </h3>
        );
      case "h4":
        return (
          <h4
            key={index}
            className="text-lg font-semibold mb-2 mt-4"
            style={{ overflow: "auto" }}
          >
            {block.content}
          </h4>
        );

      case "paragraph":
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {renderWithMarkdown(block.content)}
          </p>
        );
      case "list":
        const items = block.content.split("\n").filter((i: string) => i.trim());
        return (
          <ul
            key={index}
            className="list-disc list-inside mb-4 space-y-2 clear-both"
          >
            {items.map((item: string, i: number) => (
              <li key={i} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        );
      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 bg-blue-50 clear-both"
          >
            {renderWithMarkdown(block.content)}
          </blockquote>
        );

      case "html":
        return (
          <div
            key={index}
            className="html-content my-4"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );

      case "image":
        const alignment = block.content.alignment || "full";
        const width = block.content.width || "100%";

        // Style dla różnych wyrównań
        const getImageWrapperClass = () => {
          switch (alignment) {
            case "left":
              return "float-left mr-6 mb-4";
            case "right":
              return "float-right ml-6 mb-4";
            case "center":
              return "mx-auto";
            default: // 'full'
              return "w-full";
          }
        };

        // Dla float dodaj wrapper, który wymusi clearfix
        if (alignment === "left" || alignment === "right") {
          return (
            <figure
              key={index}
              className={getImageWrapperClass()}
              style={{
                width: width,
                maxWidth: "100%",
              }}
            >
              <img
                src={block.content.url}
                alt={block.content.alt || ""}
                className="w-full rounded-lg shadow-lg"
              />
              {block.content.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 italic">
                  {block.content.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // Dla center i full
        return (
          <figure
            key={index}
            className={`my-8 ${getImageWrapperClass()}`}
            style={{
              width: alignment === "center" ? width : "100%",
              maxWidth: "100%",
            }}
          >
            <img
              src={block.content.url}
              alt={block.content.alt || ""}
              className="w-full rounded-lg shadow-lg"
            />
            {block.content.caption && (
              <figcaption className="mt-2 text-sm text-center text-gray-600 italic">
                {block.content.caption}
              </figcaption>
            )}
          </figure>
        );
      // Backward compatibility
      case "heading":
        return (
          <h2 key={index} className="text-2xl font-bold mb-4 mt-6">
            {block.content}
          </h2>
        );
      default:
        return null;
    }
  };

  // Renderuj blok do PDF (zwraca HTMLElement zamiast React)
  const renderBlockForPDF = (block: any): HTMLElement | null => {
    const parseMarkdown = (text: string) => {
      let parsed = text;
      parsed = parsed.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" style="color: #2563eb; text-decoration: underline;">$1</a>'
      );
      parsed = parsed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      parsed = parsed.replace(/\*(.*?)\*/g, "<em>$1</em>");
      return parsed;
    };

    const renderWithMarkdown = (text: string) => {
      return text
        .split("\n")
        .map((line) => parseMarkdown(line))
        .join("<br>");
    };

    let element: HTMLElement | null = null;

    switch (block.type) {
      case "h2":
        element = document.createElement("h2");
        element.style.cssText =
          "font-size: 20px; font-weight: bold; margin-top: 16px; margin-bottom: 10px;";
        element.textContent = block.content;
        break;

      case "h3":
        element = document.createElement("h3");
        element.style.cssText =
          "font-size: 18px; font-weight: bold; margin-top: 14px; margin-bottom: 8px;";
        element.textContent = block.content;
        break;

      case "h4":
        element = document.createElement("h4");
        element.style.cssText =
          "font-size: 16px; font-weight: 600; margin-top: 12px; margin-bottom: 6px;";
        element.textContent = block.content;
        break;

      case "paragraph":
        element = document.createElement("p");
        element.style.cssText =
          "margin-bottom: 10px; text-align: justify; line-height: 1.8;";
        element.innerHTML = renderWithMarkdown(block.content);
        break;

      case "list":
        element = document.createElement("ul");
        element.style.cssText =
          "margin-bottom: 10px; padding-left: 20px; list-style-type: disc;";
        const items = block.content.split("\n").filter((i: string) => i.trim());
        items.forEach((item: string) => {
          const li = document.createElement("li");
          li.style.marginBottom = "4px";
          li.textContent = item;
          element!.appendChild(li);
        });
        break;

      case "quote":
        element = document.createElement("blockquote");
        element.style.cssText =
          "border-left: 4px solid #3b82f6; padding-left: 16px; padding-top: 8px; padding-bottom: 8px; margin: 10px 0; font-style: italic; color: #4b5563; background-color: #eff6ff;";
        element.innerHTML = renderWithMarkdown(block.content);
        break;

      case "image":
        const figure = document.createElement("figure");
        figure.style.cssText = "margin: 15px 0; text-align: center;";

        const img = document.createElement("img");
        img.src = block.content.url;
        img.alt = block.content.alt || "";
        img.style.cssText =
          "max-width: 100%; height: auto; border-radius: 8px;";
        figure.appendChild(img);

        if (block.content.caption) {
          const caption = document.createElement("figcaption");
          caption.style.cssText =
            "margin-top: 6px; font-size: 12px; color: #6b7280; font-style: italic;";
          caption.textContent = block.content.caption;
          figure.appendChild(caption);
        }

        element = figure;
        break;

      case "html":
        element = document.createElement("div");
        element.innerHTML = block.content;
        element.style.margin = "10px 0";
        break;
    }

    return element;
  };

  // Nawigacja między stronami
  const goToPage = (pageNum: number) => {
    if (pageNum >= 0 && pageNum < contentPages.length) {
      setCurrentPageIndex(pageNum);
      setSearchParams({ p: (pageNum + 1).toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Ładowanie...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Nie znaleziono
      </div>
    );
  }

  const currentBlocks = contentPages[currentPageIndex] || [];
  const totalPages = contentPages.length;

  return (
    <PublicLayout>
      <Helmet>
        <title>{page?.metaTitle || page?.title || "MaturaPolski.pl"}</title>
        <meta
          name="description"
          content={
            page?.metaDescription ||
            page?.hub?.description ||
            "Przygotuj się do matury z Polski"
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar - Lista stron Hub-a */}
            {hubPages.length > 0 && (
              <aside className="hidden lg:block lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">
                    {page?.hub.title}
                  </h3>
                  <nav className="space-y-1">
                    {hubPages.map((hubPage) => (
                      <Link
                        key={hubPage.id}
                        to={`/baza-wiedzy/${hubSlug}/${hubPage.slug}`}
                        className={`block px-3 py-2 rounded text-sm transition-colors ${
                          hubPage.slug === pageSlug
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {hubPage.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Główna treść */}
            <article
              className={`${
                hubPages.length > 0 ? "lg:col-span-9" : "lg:col-span-12"
              } order-1 lg:order-2 space-y-6`}
            >
              {/* Artykuł */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-4">
                  <Link to="/baza-wiedzy" className="hover:text-gray-700">
                    Baza wiedzy
                  </Link>
                  {" / "}
                  <Link
                    to={`/baza-wiedzy/${hubSlug}`}
                    className="hover:text-gray-700"
                  >
                    {page.hub.title}
                  </Link>
                  {" / "}
                  <span className="text-gray-900">{page.title}</span>
                </div>

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-3xl font-bold flex-1">{page.title}</h1>
                  <button
                    onClick={downloadAsPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
               text-white rounded-lg transition-colors shadow-sm hover:shadow-md
               flex-shrink-0"
                    title="Pobierz jako PDF"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Pobierz PDF</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 border-b pb-4 mb-6">
                  {page.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {page.readingTime} min
                    </span>
                  )}

                  {totalPages > 1 && (
                    <span className="ml-auto font-medium text-blue-600">
                      {isLalkaChapters ? (
                        <>
                          Rozdział {currentVolumeInfo!.chapterInVolume}
                          {currentVolumeInfo!.volumeNumber > 1 && (
                            <span className="text-sm text-gray-500 ml-2">
                              (Tom {currentVolumeInfo!.volumeNumber})
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          Strona {currentPageIndex + 1} z {totalPages}
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Treść aktualnej strony */}
                <div className="prose max-w-none">
                  {isLalkaChapters && currentVolumeInfo?.volumeTitle && (
                    <div className="mb-8 pb-4 border-b-2 border-purple-200 bg-purple-50 rounded-lg px-8 py-6">
                      <h2 className="text-3xl font-bold text-purple-900 text-center">
                        {currentVolumeInfo.volumeTitle}
                      </h2>
                    </div>
                  )}

                  {currentBlocks

                    .filter((block) => block.type !== "volume_break")
                    .map((block, index) => renderBlock(block, index))}

                  {/* Clearfix na końcu treści */}
                  <div className="clear-both"></div>
                </div>

                {isLalkaChapters && (
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Book",
                      name: page.title,
                      author: {
                        "@type": "Person",
                        name: page.hub.author,
                      },
                      numberOfPages: totalPages,
                      inLanguage: "pl",
                      hasPart: contentPages.map((blocks, i) => {
                        const chapterTitle = blocks.find(
                          (b) => b.type === "h3"
                        )?.content;
                        return {
                          "@type": "Chapter",
                          name: chapterTitle || `Rozdział ${i + 1}`,
                          position: i + 1,
                        };
                      }),
                    })}
                  </script>
                )}

                {/* Paginacja - tylko jeśli jest więcej niż 1 strona */}
                {totalPages > 1 && (
                  <div className="mt-12 pt-6 border-t">
                    <div className="flex flex-col items-left gap-4">
                      {/* Przyciski nawigacji */}
                      <div className="flex w-full items-left justify-between gap-4">
                        <button
                          onClick={() => goToPage(currentPageIndex - 1)}
                          disabled={currentPageIndex === 0}
                          className="flex items-left gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            {isLalkaChapters
                              ? "Poprzedni rozdział"
                              : "Poprzednia strona"}
                          </span>
                        </button>

                        <button
                          onClick={() => goToPage(currentPageIndex + 1)}
                          disabled={currentPageIndex === totalPages - 1}
                          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="hidden sm:inline">
                            {isLalkaChapters
                              ? "Następny rozdział"
                              : "Następna strona"}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Numeracja stron */}
                      <div className="flex flex-wrap gap-2 justify-center items-start max-w-full">
                        {Array.from({ length: totalPages }, (_, i) => {
                          const info =
                            isLalkaChapters && volumeInfo[i]
                              ? volumeInfo[i]
                              : null;
                          const displayNumber = info
                            ? info.chapterInVolume
                            : i + 1;
                          const showVolumeSeparator =
                            info?.startsWithVolumeBreak;

                          return (
                            <div
                              key={i}
                              className={`flex items-center gap-2 ${
                                showVolumeSeparator && i !== 0
                                  ? "w-full justify-center mt-2"
                                  : ""
                              }`}
                            >
                              {/* Separator tomu - KLIKALNE */}
                              {showVolumeSeparator && (
                                <button
                                  onClick={() => goToPage(i)}
                                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-semibold text-sm border-2 border-purple-300 hover:bg-purple-200 transition-colors cursor-pointer"
                                  title={`Przejdź do ${info!.volumeTitle}`}
                                >
                                  {info!.volumeTitle ||
                                    `Tom ${info!.volumeNumber}`}
                                </button>
                              )}

                              {/* Przycisk rozdziału/strony */}
                              <button
                                onClick={() => goToPage(i)}
                                className={`min-w-[2.5rem] h-10 px-2 rounded-lg text-sm font-medium transition-colors ${
                                  i === currentPageIndex
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                }`}
                                title={
                                  info
                                    ? `Rozdział ${displayNumber}`
                                    : `Strona ${displayNumber}`
                                }
                              >
                                {displayNumber}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Widget */}
              <RatingWidget
                pageId={page.id}
                key={page.id}
                pageTitle={page.title}
                hubTitle={page.hub.title}
              />

              {/* Related Pages */}
              <RelatedPages
                hubSlug={hubSlug!}
                currentPageSlug={pageSlug!}
                maxPages={3}
              />
            </article>

            {/* SEO - ukryte strony dla crawlerów */}
            {totalPages > 1 && (
              <div className="hidden">
                {contentPages.map((pageBlocks, pageIndex) => (
                  <div key={pageIndex} data-page={pageIndex + 1}>
                    {pageBlocks.map((block, blockIndex) =>
                      renderBlock(block, blockIndex)
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
