// frontend/src/features/content/PageViewer.tsx

// ==========================================

import { PublicLayout } from "../../components/PublicLayout";
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { contentService } from "../../services/contentService";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface PageData {
  id: string;
  slug: string;
  title: string;
  content: any;
  readingTime?: number;
  views: number;
  hub: {
    title: string;
    slug: string;
    author?: string;
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Podziel treść na "strony" na podstawie page_break
  const contentPages = page?.content?.blocks
    ? splitContentIntoPages(page.content.blocks)
    : [];

  const volumeInfo = isLalkaChapters
    ? contentPages.map((pageBlocks, index) => {
        // Sprawdź czy TA strona zaczyna się od volume_break
        const startsWithVolumeBreak = pageBlocks[0]?.type === "volume_break";
        const volumeTitle = startsWithVolumeBreak
          ? pageBlocks[0].content?.volumeTitle
          : null;

        // Policz którym jesteśmy tomem (licząc volume_break do tej pory)
        let volumeNumber = 1;
        for (let i = 0; i < index; i++) {
          if (contentPages[i][0]?.type === "volume_break") {
            volumeNumber++;
          }
        }

        // Policz numer rozdziału W TYM TOMIE
        let chapterInVolume = 1;
        for (let i = index - 1; i >= 0; i--) {
          if (contentPages[i][0]?.type === "volume_break") {
            break; // Zatrzymaj się na poprzednim volume_break
          }
          chapterInVolume++;
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
    }
  }, [hubSlug, pageSlug]);

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
      // Bold: **text** -> <strong>
      let parsed = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
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
          <h2 key={index} className="text-2xl font-bold mb-4 mt-8 clear-both">
            {block.content}
          </h2>
        );
      case "h3":
        return (
          <h3 key={index} className="text-xl font-bold mb-3 mt-6 clear-both">
            {block.content}
          </h3>
        );
      case "h4":
        return (
          <h4
            key={index}
            className="text-lg font-semibold mb-2 mt-4 clear-both"
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
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
            <h1 className="text-3xl font-bold mb-4">{page.title}</h1>

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
                .filter((block) => block.type !== "volume_break") // Filtruj volume_break z treści
                .map((block, index) => renderBlock(block, index))}

              {/* Clearfix na końcu treści */}
              <div className="clear-both"></div>
            </div>

            {/* Paginacja - tylko jeśli jest więcej niż 1 strona */}
            {totalPages > 1 && (
              <div className="mt-12 pt-6 border-t">
                <div className="flex flex-col items-center gap-4">
                  {/* Przyciski nawigacji */}
                  <div className="flex w-full items-center justify-between gap-4">
                    <button
                      onClick={() => goToPage(currentPageIndex - 1)}
                      disabled={currentPageIndex === 0}
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {isLalkaChapters
                        ? "Poprzedni rozdział"
                        : "Poprzednia strona"}
                    </button>

                    <button
                      onClick={() => goToPage(currentPageIndex + 1)}
                      disabled={currentPageIndex === totalPages - 1}
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isLalkaChapters
                        ? "Następny rozdział"
                        : "Następna strona"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Numeracja stron */}
                  <div className="flex flex-wrap gap-2 justify-center items-center max-w-full">
                    {Array.from({ length: totalPages }, (_, i) => {
                      const info =
                        isLalkaChapters && volumeInfo[i] ? volumeInfo[i] : null;
                      const displayNumber = info ? info.chapterInVolume : i + 1;
                      const showVolumeSeparator = info?.startsWithVolumeBreak;

                      return (
                        <div key={i} className="flex items-center gap-2">
                          {/* Separator tomu */}
                          {showVolumeSeparator && (
                            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-semibold text-sm border-2 border-purple-300">
                              {info!.volumeTitle || `Tom ${info!.volumeNumber}`}
                            </div>
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
    </PublicLayout>
  );
}
