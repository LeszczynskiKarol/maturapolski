// frontend/src/features/guides/GuideDetailPage.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Eye,
  FileText,
  ChevronRight,
  Share2,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";

interface GuidePage {
  id: string;
  slug: string;
  title: string;
  readingTime?: number;
  order: number;
}

interface GuideData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  pages?: GuidePage[];
}

export function GuideDetailPage() {
  const { guideSlug } = useParams<{ guideSlug: string }>();
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guideSlug) {
      loadGuide();
    }
  }, [guideSlug]);

  const loadGuide = async () => {
    try {
      const data = await contentService.getHub(guideSlug!);
      setGuide(data);
    } catch (error) {
      console.error("Error loading guide:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: guide?.title,
          text: guide?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link skopiowany do schowka!");
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    );
  }

  if (!guide) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Poradnik nie znaleziony
            </h2>
            <p className="text-gray-600 mb-4">
              Przepraszamy, ten poradnik nie istnieje.
            </p>
            <Link
              to="/poradnik"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Wróć do poradników
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const sortedPages = [...(guide.pages || [])].sort(
    (a, b) => a.order - b.order
  );
  const totalReadTime = sortedPages.reduce(
    (sum, page) => sum + (page.readingTime || 5),
    0
  );

  return (
    <PublicLayout>
      <Helmet>
        <title>
          {guide.metaTitle || guide.title} | Poradnik MaturaPolski.pl
        </title>
        <meta
          name="description"
          content={
            guide.metaDescription ||
            guide.description ||
            `Poradnik: ${guide.title} - kompleksowy przewodnik po maturze z polskiego.`
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Link
              to="/poradnik"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Wszystkie poradniki
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Content */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-sm mb-4">
                  <BookOpen className="w-4 h-4" />
                  Poradnik maturalny
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {guide.title}
                </h1>

                {guide.description && (
                  <p className="text-lg text-blue-100 mb-6">
                    {guide.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <FileText className="w-4 h-4" />
                    {sortedPages.length} artykułów
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <Clock className="w-4 h-4" />
                    {totalReadTime} min czytania
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <Eye className="w-4 h-4" />
                    {guide.views} wyświetleń
                  </div>
                </div>
              </div>

              {/* Image */}
              {guide.imageUrl && (
                <div className="w-full md:w-64 flex-shrink-0">
                  <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="w-full rounded-xl shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Articles List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    📚 Spis treści
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Kliknij artykuł, aby przeczytać
                  </p>
                </div>

                {sortedPages.length > 0 ? (
                  <div className="divide-y">
                    {sortedPages.map((page, index) => (
                      <Link
                        key={page.id}
                        to={`/poradnik/${guideSlug}/${page.slug}`}
                        className="flex items-center gap-4 p-4 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {page.title}
                          </h3>
                          {page.readingTime && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {page.readingTime} min
                            </p>
                          )}
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600">
                      Artykuły wkrótce. Pracujemy nad treścią!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Akcje</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700"
                  >
                    <Share2 className="w-5 h-5" />
                    Udostępnij
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700">
                    <Bookmark className="w-5 h-5" />
                    Zapisz na później
                  </button>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold">Twój postęp</h3>
                    <p className="text-sm text-green-100">
                      0 / {sortedPages.length} artykułów
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <div
                    className="bg-white rounded-full h-2"
                    style={{ width: "0%" }}
                  ></div>
                </div>

                <Link
                  to={
                    sortedPages.length > 0
                      ? `/poradnik/${guideSlug}/${sortedPages[0].slug}`
                      : "#"
                  }
                  className="block w-full text-center py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                >
                  {sortedPages.length > 0 ? "Rozpocznij czytanie" : "Wkrótce"}
                </Link>
              </div>

              {/* Related */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Przydatne linki
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/baza-wiedzy"
                    className="block text-blue-600 hover:text-blue-700 text-sm"
                  >
                    → Baza wiedzy (lektury)
                  </Link>
                  <Link
                    to="/learn"
                    className="block text-blue-600 hover:text-blue-700 text-sm"
                  >
                    → Ćwicz przed maturą
                  </Link>
                  <Link
                    to="/exams"
                    className="block text-blue-600 hover:text-blue-700 text-sm"
                  >
                    → Matury próbne
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default GuideDetailPage;
