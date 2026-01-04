// frontend/src/features/guides/GuideListPage.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  BookOpen,
  Clock,
  ChevronRight,
  GraduationCap,
  FileText,
  Lightbulb,
  TrendingUp,
  Search,
  Eye,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";

interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  metaDescription?: string;
  readingTime?: number;
  views: number;
  hub: {
    id: string;
    title: string;
    slug: string;
    imageUrl?: string;
  };
}

export function GuideListPage() {
  const [articles, setArticles] = useState<GuideArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await contentService.getGuideArticles({ limit: 100 });
      setArticles(response.articles || []);
    } catch (error) {
      console.error("Error loading guide articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrowanie po search
  const filteredArticles = articles.filter((article) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.metaDescription?.toLowerCase().includes(query) ||
      article.hub.title.toLowerCase().includes(query)
    );
  });

  // Grupowanie artykułów po hubach (kategoriach)
  const groupedByHub = filteredArticles.reduce((acc, article) => {
    const hubTitle = article.hub.title;
    if (!acc[hubTitle]) {
      acc[hubTitle] = [];
    }
    acc[hubTitle].push(article);
    return acc;
  }, {} as Record<string, GuideArticle[]>);

  // Statystyki
  const totalArticles = articles.length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const totalReadingTime = articles.reduce(
    (sum, a) => sum + (a.readingTime || 5),
    0
  );

  return (
    <PublicLayout>
      <Helmet>
        <title>Poradnik maturalny | MaturaPolski.pl</title>
        <meta
          name="description"
          content="Kompleksowy poradnik do matury z polskiego. Dowiedz się jak wygląda egzamin, jak się przygotować i jak zdać maturę na 100%."
        />
        <meta
          name="keywords"
          content="matura polski, poradnik maturalny, jak zdać maturę, rozprawka maturalna, egzamin maturalny"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Poradnik maturalny 2025/2026
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Wszystko o maturze z polskiego
              </h1>

              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                Kompletny przewodnik po egzaminie maturalnym. Dowiedz się jak
                wygląda matura, jak się przygotować i jak zdobyć maksymalną
                liczbę punktów.
              </p>

              {/* Search */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Szukaj w poradniku..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="max-w-7xl mx-auto px-4 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">
                {totalArticles}
              </div>
              <div className="text-sm text-gray-600">Artykułów</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">
                {totalReadingTime} min
              </div>
              <div className="text-sm text-gray-600">Łącznie czytania</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold text-gray-900">
                {Object.keys(groupedByHub).length}
              </div>
              <div className="text-sm text-gray-600">Kategorii</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">
                {totalViews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Wyświetleń</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md p-6 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <>
              {/* Jeśli nie ma wyszukiwania - pokaż pogrupowane po kategoriach */}
              {!searchQuery ? (
                Object.entries(groupedByHub).map(([hubTitle, hubArticles]) => (
                  <section key={hubTitle} className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {hubTitle}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {hubArticles.length} artykułów
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hubArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                /* Wyniki wyszukiwania - płaska lista */
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Wyniki wyszukiwania ({filteredArticles.length})
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? "Nie znaleziono artykułów" : "Poradniki wkrótce"}
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "Spróbuj innych słów kluczowych"
                  : "Pracujemy nad nowymi materiałami. Wróć wkrótce!"}
              </p>
            </div>
          )}

          {/* CTA Section */}
          <section className="mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Gotowy do nauki?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Zacznij ćwiczyć z naszymi zadaniami i sprawdź swoją wiedzę przed
                maturą. Tysiące pytań czeka na Ciebie!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Załóż konto za darmo
                </Link>
                <Link
                  to="/baza-wiedzy"
                  className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Przeglądaj lektury
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}

// Komponent karty artykułu
function ArticleCard({ article }: { article: GuideArticle }) {
  return (
    <Link
      to={`/poradnik/${article.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <FileText className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.metaDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {article.metaDescription}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readingTime || 5} min
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {article.views}
          </span>
        </div>

        {/* Kategoria */}
        <div className="mt-3 pt-3 border-t">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {article.hub.title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default GuideListPage;
