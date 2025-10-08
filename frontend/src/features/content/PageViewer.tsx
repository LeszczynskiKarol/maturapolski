// frontend/src/features/content/PageViewer.tsx
// Wyświetlanie konkretnej strony
// ==========================================

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { contentService } from "../../services/contentService";
import { ArrowLeft, Clock, Eye } from "lucide-react";

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
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hubSlug && pageSlug) {
      loadPage();
    }
  }, [hubSlug, pageSlug]);

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

  const renderContent = (content: any) => {
    if (!content?.blocks) return null;

    return content.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case "heading":
          return (
            <h2 key={index} className="text-2xl font-bold mb-4 mt-6">
              {block.content}
            </h2>
          );
        case "paragraph":
          return (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {block.content}
            </p>
          );
        case "list":
          const items = block.content
            .split("\n")
            .filter((i: string) => i.trim());
          return (
            <ul key={index} className="list-disc list-inside mb-4 space-y-2">
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
              className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600"
            >
              {block.content}
            </blockquote>
          );
        default:
          return null;
      }
    });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to={`/baza/${hubSlug}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do {page.hub.title}
        </Link>

        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <Link to="/baza" className="hover:text-gray-700">
              Baza wiedzy
            </Link>
            {" / "}
            <Link to={`/baza/${hubSlug}`} className="hover:text-gray-700">
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
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {page.views} wyświetleń
            </span>
          </div>

          {/* Treść */}
          <div className="prose max-w-none">{renderContent(page.content)}</div>
        </article>
      </div>
    </div>
  );
}
