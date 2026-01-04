// frontend/src/features/guides/GuideArticlePage.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Share2,
  ThumbsUp,
  Printer,
  Home,
} from "lucide-react";
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
    title: string;
    slug: string;
    type: string;
  };
}

interface SiblingPage {
  slug: string;
  title: string;
}

export function GuideArticlePage() {
  const { guideSlug, articleSlug } = useParams<{
    guideSlug: string;
    articleSlug: string;
  }>();

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [allPages, setAllPages] = useState<SiblingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    if (guideSlug && articleSlug) {
      loadArticle();
      loadAllPages();
    }
  }, [guideSlug, articleSlug]);

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
      const data = await contentService.getPage(guideSlug!, articleSlug!);
      setArticle(data);
    } catch (error) {
      console.error("Error loading article:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllPages = async () => {
    try {
      const pages = await contentService.getHubPages(guideSlug!);
      setAllPages(
        pages
          .sort((a: any, b: any) => a.order - b.order)
          .map((p: any) => ({
            slug: p.slug,
            title: p.title,
          }))
      );
    } catch (error) {
      console.error("Error loading pages:", error);
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
                {item}
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
            className="my-4"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      default:
        return null;
    }
  };

  // Find prev/next articles
  const currentIndex = allPages.findIndex((p) => p.slug === articleSlug);
  const prevArticle = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

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
              to={`/poradnik/${guideSlug}`}
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

  return (
    <PublicLayout>
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
                <Link
                  to={`/poradnik/${guideSlug}`}
                  className="hover:text-blue-600"
                >
                  {article.hub.title}
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">
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
                    <span>•</span>
                    <span>
                      Artykuł {currentIndex + 1} z {allPages.length}
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

                {/* Navigation */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex justify-between gap-4">
                    {prevArticle ? (
                      <Link
                        to={`/poradnik/${guideSlug}/${prevArticle.slug}`}
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
                        to={`/poradnik/${guideSlug}/${nextArticle.slug}`}
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

                {/* All articles in guide */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    Wszystkie artykuły
                  </h3>
                  <nav className="space-y-1 max-h-64 overflow-y-auto">
                    {allPages.map((page, i) => (
                      <Link
                        key={page.slug}
                        to={`/poradnik/${guideSlug}/${page.slug}`}
                        className={`block text-sm py-2 px-3 rounded transition-colors ${
                          page.slug === articleSlug
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-gray-400 mr-2">{i + 1}.</span>
                        {page.title}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Back to guide */}
                <Link
                  to={`/poradnik/${guideSlug}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Wróć do spisu treści
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
