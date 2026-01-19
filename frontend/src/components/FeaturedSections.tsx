// frontend/src/components/FeaturedSections.tsx

import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentService } from "../services/contentService";

interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  metaDescription?: string;
  readingTime?: number;
  hub?: {
    title: string;
    imageUrl?: string;
  };
}

interface ExamSheet {
  id: string;
  slug: string;
  title: string;
  year?: number;
  description?: string;
  pdfCount?: number;
}

interface TestHub {
  id: string;
  slug: string;
  title: string;
  author?: string;
  type: string;
  isRequired?: boolean;
}

interface KnowledgeHub {
  id: string;
  slug: string;
  title: string;
  type: string;
  author?: string;
  description?: string;
  epoch?: string;
  _count?: { pages: number };
}

export const FeaturedSections: React.FC = () => {
  const [guideArticles, setGuideArticles] = useState<GuideArticle[]>([]);
  const [examSheets, setExamSheets] = useState<ExamSheet[]>([]);
  const [testHubs, setTestHubs] = useState<TestHub[]>([]);
  const [knowledgeHubs, setKnowledgeHubs] = useState<KnowledgeHub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [guidesRes, sheetsRes, testsRes, hubsRes] = await Promise.all([
        contentService.getGuideArticles({ limit: 3 }),
        contentService.getExamSheets({ limit: 3 }),
        contentService.getHubsWithTests(6),
        contentService.getHubs({ limit: 6 }),
      ]);

      setGuideArticles(guidesRes.articles || []);
      setExamSheets(sheetsRes.sheets || []);
      setTestHubs(testsRes || []);
      setKnowledgeHubs(
        (hubsRes.hubs || []).filter((h: KnowledgeHub) =>
          ["LITERARY_WORK", "EPOCH", "AUTHOR"].includes(h.type),
        ),
      );
    } catch (error) {
      console.error("Error loading featured sections:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-48 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Sekcja 1: Poradnik maturalny */}
      {guideArticles.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Poradnik maturalny
                  </h2>
                  <p className="text-gray-600">
                    Praktyczne wskazówki do matury z polskiego
                  </p>
                </div>
              </div>
              <Link
                to="/poradnik"
                className="hidden md:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                Zobacz wszystkie
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {guideArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to={`/poradnik/${article.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100 hover:border-amber-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      Poradnik
                    </span>
                    {article.readingTime && (
                      <span className="text-sm text-gray-500">
                        {article.readingTime} min
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.metaDescription && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.metaDescription}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/poradnik"
              className="md:hidden flex items-center justify-center gap-2 mt-6 text-amber-600 hover:text-amber-700 font-semibold"
            >
              Zobacz wszystkie artykuły
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Sekcja 2: Arkusze maturalne */}
      {examSheets.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Arkusze maturalne
                  </h2>
                  <p className="text-gray-600">
                    Oficjalne arkusze CKE z poprzednich lat
                  </p>
                </div>
              </div>
              <Link
                to="/arkusze"
                className="hidden md:flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Zobacz wszystkie
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {examSheets.slice(0, 3).map((sheet) => (
                <Link
                  key={sheet.id}
                  to={`/arkusze/${sheet.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    {sheet.year && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        Matura {sheet.year}
                      </span>
                    )}
                    {sheet.pdfCount && sheet.pdfCount > 0 && (
                      <span className="text-sm text-gray-500">
                        {sheet.pdfCount} PDF
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {sheet.title}
                  </h3>
                  {sheet.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {sheet.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/arkusze"
              className="md:hidden flex items-center justify-center gap-2 mt-6 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Zobacz wszystkie arkusze
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Sekcja 3: Testy z lektur */}
      {testHubs.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-emerald-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Testy z lektur
                  </h2>
                  <p className="text-gray-600">
                    Sprawdź swoją wiedzę z lektur obowiązkowych
                  </p>
                </div>
              </div>
              <Link
                to="/testy"
                className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Zobacz wszystkie
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testHubs.slice(0, 3).map((hub) => (
                <Link
                  key={hub.id}
                  to={`/test/${hub.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        hub.isRequired
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {hub.isRequired ? "Obowiązkowa" : "Uzupełniająca"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {hub.title}
                  </h3>
                  {hub.author && (
                    <p className="text-gray-600 text-sm">{hub.author}</p>
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/testy"
              className="md:hidden flex items-center justify-center gap-2 mt-6 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Zobacz wszystkie testy
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Sekcja 4: Baza wiedzy */}
      {knowledgeHubs.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Baza wiedzy
                  </h2>
                  <p className="text-gray-600">
                    Kompendium wiedzy o lekturach, autorach i epokach
                  </p>
                </div>
              </div>
              <Link
                to="/baza-wiedzy"
                className="hidden md:flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Zobacz wszystko
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {knowledgeHubs.slice(0, 3).map((hub) => (
                <Link
                  key={hub.id}
                  to={`/baza-wiedzy/${hub.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100 hover:border-purple-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {hub.type === "LITERARY_WORK"
                        ? "Lektura"
                        : hub.type === "EPOCH"
                          ? "Epoka"
                          : hub.type === "AUTHOR"
                            ? "Autor"
                            : "Materiał"}
                    </span>
                    {hub._count?.pages && (
                      <span className="text-sm text-gray-500">
                        {hub._count.pages} str.
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {hub.title}
                  </h3>
                  {hub.author && (
                    <p className="text-gray-600 text-sm">{hub.author}</p>
                  )}
                  {hub.description && !hub.author && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {hub.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/baza-wiedzy"
              className="md:hidden flex items-center justify-center gap-2 mt-6 text-purple-600 hover:text-purple-700 font-semibold"
            >
              Zobacz całą bazę wiedzy
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
