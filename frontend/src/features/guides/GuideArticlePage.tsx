// frontend/src/features/guides/GuideArticlePage.tsx

import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Home,
  Printer,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PublicLayout } from "../../components/PublicLayout";
import { RatingWidget } from "../../components/RatingWidget";
import { contentService } from "../../services/contentService";

interface ArticleData {
  id: string;
  slug: string;
  title: string;
  content: { blocks: any[] };
  readingTime?: number;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  hub: {
    id: string;
    title: string;
    slug: string;
    type: string;
    description?: string;
    imageUrl?: string;
  };
  siblingArticles: SiblingArticle[];
  allGuideArticles: AllGuideArticle[];
}

interface SiblingArticle {
  id: string;
  slug: string;
  title: string;
  order: number;
  readingTime?: number;
}

interface AllGuideArticle {
  id: string;
  slug: string;
  title: string;
  readingTime?: number;
  hub: {
    title: string;
  };
}

export function GuideArticlePage() {
  const { articleSlug } = useParams<{ articleSlug: string }>();

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    if (articleSlug) {
      loadArticle();
    }
  }, [articleSlug]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const data = await contentService.getGuideArticle(articleSlug!);
      setArticle(data);
    } catch (error) {
      console.error("Error loading article:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link skopiowany do schowka!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Parse markdown helper
  const parseMarkdown = (text: string) => {
    let parsed = text;
    parsed = parsed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
    );
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    parsed = parsed.replace(/\*(.*?)\*/g, "<em>$1</em>");
    return parsed;
  };

  const renderWithMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: parseMarkdown(line) }} />
        {i < lines.length - 1 && <br />}
      </span>
    ));
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "h2":
      case "heading":
        return (
          <h2
            key={index}
            id={`section-${index}`}
            className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-20"
          >
            {block.content}
          </h2>
        );
      case "h3":
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-3">
            {block.content}
          </h3>
        );
      case "h4":
        return (
          <h4
            key={index}
            className="text-lg font-semibold text-gray-900 mt-6 mb-2"
          >
            {block.content}
          </h4>
        );
      case "paragraph":
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {renderWithMarkdown(block.content)}
          </p>
        );
      case "list":
        const items = block.content.split("\n").filter((i: string) => i.trim());
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-2 pl-4">
            {items.map((item: string, i: number) => (
              <li key={i} className="text-gray-700">
                <span
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
                />
              </li>
            ))}
          </ul>
        );
      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 bg-blue-50 rounded-r-lg"
          >
            {renderWithMarkdown(block.content)}
          </blockquote>
        );
      case "image":
        return (
          <figure key={index} className="my-8">
            <img
              src={block.content.url}
              alt={block.content.alt || ""}
              className="w-full rounded-lg shadow-md"
            />
            {block.content.caption && (
              <figcaption className="mt-2 text-sm text-center text-gray-600 italic">
                {block.content.caption}
              </figcaption>
            )}
          </figure>
        );
      case "html":
        return (
          <div
            key={index}
            className="my-6 html-content-block"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      default:
        return null;
    }
  };

  // Find prev/next articles (w ramach tego samego huba)
  const currentIndex =
    article?.siblingArticles.findIndex((a) => a.slug === articleSlug) ?? -1;
  const prevArticle =
    currentIndex > 0 ? article?.siblingArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 &&
    currentIndex < (article?.siblingArticles.length || 0) - 1
      ? article?.siblingArticles[currentIndex + 1]
      : null;

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    );
  }

  if (!article) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Artykuł nie znaleziony
            </h2>
            <Link
              to="/poradnik"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Wróć do poradnika
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const blocks = article.content?.blocks || [];

  // Extract headings for TOC
  const headings = blocks
    .map((block, index) => ({
      ...block,
      index,
    }))
    .filter((block) => block.type === "h2" || block.type === "heading");

  const htmlBlockStyles = `
  .html-content-block {
    line-height: 1.75;
    color: #374151;
  }
  .html-content-block h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .html-content-block h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .html-content-block h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .html-content-block p {
    margin-bottom: 1rem;
  }
  .html-content-block ul, .html-content-block ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  .html-content-block ul {
    list-style-type: disc;
  }
  .html-content-block ol {
    list-style-type: decimal;
  }
  .html-content-block li {
    margin-bottom: 0.5rem;
    padding-left: 0.25rem;
  }
  .html-content-block a {
    color: #2563eb;
    text-decoration: underline;
  }
  .html-content-block a:hover {
    color: #1d4ed8;
  }
  .html-content-block blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin: 1.5rem 0;
    background-color: #eff6ff;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    color: #4b5563;
  }
  .html-content-block table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  .html-content-block th, .html-content-block td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem 1rem;
    text-align: left;
  }
  .html-content-block th {
    background-color: #f3f4f6;
    font-weight: 600;
  }
  .html-content-block tr:hover {
    background-color: #f9fafb;
  }
  .html-content-block strong, .html-content-block b {
    font-weight: 600;
    color: #111827;
  }
  .html-content-block em, .html-content-block i {
    font-style: italic;
  }
  .html-content-block code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: monospace;
  }
  .html-content-block pre {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  .html-content-block pre code {
    background: none;
    padding: 0;
    color: inherit;
  }
  .html-content-block hr {
    border: none;
    border-top: 2px solid #e5e7eb;
    margin: 2rem 0;
  }
  .html-content-block img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }
  .html-content-block .alert, .html-content-block .info-box {
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }
  .html-content-block .alert-warning {
    background-color: #fef3c7;
    border-left: 4px solid #f59e0b;
    color: #92400e;
  }
  .html-content-block .alert-info {
    background-color: #dbeafe;
    border-left: 4px solid #3b82f6;
    color: #1e40af;
  }
  .html-content-block .alert-success {
    background-color: #d1fae5;
    border-left: 4px solid #10b981;
    color: #065f46;
  }
`;

  return (
    <PublicLayout>
      <style>{htmlBlockStyles}</style>
      <Helmet>
        <title>{article.metaTitle || article.title} | MaturaPolski.pl</title>
        <meta
          name="description"
          content={
            article.metaDescription ||
            `${article.title} - poradnik maturalny na MaturaPolski.pl`
          }
        />
      </Helmet>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-sm text-gray-600">
                <Link
                  to="/poradnik"
                  className="hover:text-blue-600 flex items-center gap-1"
                >
                  <Home className="w-4 h-4" />
                  Poradnik
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate max-w-[300px]">
                  {article.title}
                </span>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Udostępnij"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Drukuj"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main content */}
            <article className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-8">
                {/* Header */}
                <header className="mb-8 pb-6 border-b">
                  <div className="inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-50 rounded-full px-3 py-1 mb-4">
                    <BookOpen className="w-4 h-4" />
                    {article.hub.title}
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {article.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {article.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readingTime} min czytania
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views} wyświetleń
                    </span>
                  </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {blocks.map((block, index) => renderBlock(block, index))}
                </div>

                {/* Article feedback */}
                <div className="mt-12 pt-8 border-t">
                  <div className="text-center mb-8">
                    <p className="text-gray-600 mb-4">
                      Czy ten artykuł był pomocny?
                    </p>
                    <div className="flex justify-center gap-4">
                      <button className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        <ThumbsUp className="w-5 h-5" />
                        Tak, pomógł!
                      </button>
                    </div>
                  </div>

                  <RatingWidget
                    pageId={article.id}
                    pageTitle={article.title}
                    hubTitle={article.hub.title}
                  />
                </div>

                {/* Navigation - prev/next w ramach tej samej kategorii */}
                {(prevArticle || nextArticle) && (
                  <div className="mt-8 pt-8 border-t">
                    <p className="text-sm text-gray-500 mb-4">
                      Więcej z kategorii: {article.hub.title}
                    </p>
                    <div className="flex justify-between gap-4">
                      {prevArticle ? (
                        <Link
                          to={`/poradnik/${prevArticle.slug}`}
                          className="flex-1 group p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <ChevronLeft className="w-4 h-4" />
                            Poprzedni artykuł
                          </div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {prevArticle.title}
                          </div>
                        </Link>
                      ) : (
                        <div className="flex-1" />
                      )}

                      {nextArticle && (
                        <Link
                          to={`/poradnik/${nextArticle.slug}`}
                          className="flex-1 group p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-right"
                        >
                          <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-1">
                            Następny artykuł
                            <ChevronRight className="w-4 h-4" />
                          </div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {nextArticle.title}
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-6">
                {/* TOC */}
                {headings.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                      W tym artykule
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading, i) => (
                        <a
                          key={i}
                          href={`#section-${heading.index}`}
                          className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1 border-l-2 border-transparent hover:border-blue-600 pl-3"
                        >
                          {heading.content}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* All guide articles */}
                {article.allGuideArticles.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                      Wszystkie artykuły
                    </h3>
                    <nav className="space-y-1 max-h-64 overflow-y-auto">
                      {article.allGuideArticles.map((guideArticle) => (
                        <Link
                          key={guideArticle.id}
                          to={`/poradnik/${guideArticle.slug}`}
                          className={`block text-sm py-2 px-3 rounded transition-colors ${
                            guideArticle.slug === articleSlug
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {guideArticle.title}
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Back to guide */}
                <Link
                  to="/poradnik"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Wróć do wszystkich artykułów
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default GuideArticlePage;
