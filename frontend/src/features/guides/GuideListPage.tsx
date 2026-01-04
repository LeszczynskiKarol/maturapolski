// frontend/src/features/guides/GuideListPage.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  BookOpen,
  Clock,
  ChevronRight,
  GraduationCap,
  Target,
  FileText,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Search,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";

interface Guide {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  pages?: { id: string }[];
  views: number;
}

// Kategorie poradników z ikonami
const GUIDE_CATEGORIES = [
  {
    id: "basics",
    label: "Podstawy matury",
    icon: GraduationCap,
    color: "blue",
    description: "Wszystko co musisz wiedzieć o egzaminie",
  },
  {
    id: "writing",
    label: "Pisanie wypracowań",
    icon: FileText,
    color: "green",
    description: "Rozprawki, interpretacje, analizy",
  },
  {
    id: "tips",
    label: "Porady i strategie",
    icon: Lightbulb,
    color: "yellow",
    description: "Sprawdzone metody nauki",
  },
  {
    id: "exam-day",
    label: "Dzień egzaminu",
    icon: Target,
    color: "red",
    description: "Jak zachować się na maturze",
  },
];

// Wyróżnione artykuły (można dynamicznie pobierać)
const FEATURED_ARTICLES = [
  {
    title: "Jak wygląda matura z polskiego?",
    description: "Kompletny przewodnik po strukturze egzaminu",
    slug: "jak-wyglada-matura-z-polskiego",
    icon: GraduationCap,
    readTime: 8,
  },
  {
    title: "Jak napisać rozprawkę na 100%?",
    description: "Krok po kroku do idealnej rozprawki",
    slug: "jak-napisac-rozprawke",
    icon: FileText,
    readTime: 12,
  },
  {
    title: "Lista lektur obowiązkowych",
    description: "Co musisz przeczytać przed maturą",
    slug: "lista-lektur-obowiazkowych",
    icon: BookOpen,
    readTime: 5,
  },
];

export function GuideListPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      const response = await contentService.getHubs({ type: "GUIDE" });
      setGuides(response.hubs || []);
    } catch (error) {
      console.error("Error loading guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      !searchQuery ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

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
                  Poradnik maturalny 2025
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
            {[
              {
                label: "Artykułów",
                value: guides.length || "10+",
                icon: FileText,
              },
              { label: "Porad", value: "50+", icon: Lightbulb },
              { label: "Przykładów", value: "100+", icon: CheckCircle },
              { label: "Czytelników", value: "10k+", icon: TrendingUp },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Featured Articles */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                🔥 Najpopularniejsze artykuły
              </h2>
              <Link
                to="/poradnik"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                Zobacz wszystkie
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURED_ARTICLES.map((article, index) => (
                <Link
                  key={index}
                  to={`/poradnik/${article.slug}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <article.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {article.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime} min czytania
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📚 Kategorie poradników
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {GUIDE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <category.icon
                    className={`w-10 h-10 mb-3 ${
                      selectedCategory === category.id
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* All Guides */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📖 Wszystkie poradniki
            </h2>

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
            ) : filteredGuides.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    to={`/poradnik/${guide.slug}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {guide.imageUrl && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={guide.imageUrl}
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </h3>

                      {guide.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {guide.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {guide.pages?.length || 0} artykułów
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {guide.views} wyświetleń
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery
                    ? "Nie znaleziono poradników"
                    : "Poradniki wkrótce"}
                </h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? "Spróbuj innych słów kluczowych"
                    : "Pracujemy nad nowymi materiałami. Wróć wkrótce!"}
                </p>
              </div>
            )}
          </section>

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

export default GuideListPage;
