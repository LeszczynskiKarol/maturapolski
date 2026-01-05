// frontend/src/features/exam-sheets/ExamSheetsListPage.tsx

import {
  Calendar,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";

interface ExamSheet {
  id: string;
  slug: string;
  title: string;
  year: number;
  description?: string;
  imageUrl?: string;
  metadata: {
    level?: string;
    month?: string;
    formula?: string;
  };
  pdfCount: number;
  views: number;
}

export function ExamSheetsListPage() {
  const [sheets, setSheets] = useState<ExamSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  useEffect(() => {
    loadSheets();
  }, []);

  const loadSheets = async () => {
    try {
      const response = await contentService.getExamSheets({ limit: 100 });
      setSheets(response.sheets || []);
    } catch (error) {
      console.error("Error loading exam sheets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrowanie
  const filteredSheets = sheets.filter((sheet) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!sheet.title.toLowerCase().includes(query)) return false;
    }
    if (selectedYear && sheet.year !== selectedYear) return false;
    if (selectedLevel && sheet.metadata.level !== selectedLevel) return false;
    return true;
  });

  // Unikalne lata i poziomy do filtrów
  const years = [...new Set(sheets.map((s) => s.year))].sort((a, b) => b - a);
  const levels = [
    ...new Set(sheets.map((s) => s.metadata.level).filter(Boolean)),
  ];

  // Grupowanie po latach
  const groupedByYear = filteredSheets.reduce((acc, sheet) => {
    const year = sheet.year || "Inne";
    if (!acc[year]) acc[year] = [];
    acc[year].push(sheet);
    return acc;
  }, {} as Record<string | number, ExamSheet[]>);

  return (
    <PublicLayout>
      <Helmet>
        <title>
          Arkusze maturalne CKE z języka polskiego - matura z Polaka
        </title>
        <meta
          name="description"
          content="Pobierz arkusze maturalne z języka polskiego z lat 2015-2024. Poziom podstawowy i rozszerzony, odpowiedzi i klucze."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Archiwum CKE</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Arkusze maturalne z polskiego
              </h1>

              <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8">
                Pobierz oryginalne arkusze maturalne CKE z języka polskiego.
                Poziom podstawowy i rozszerzony z odpowiedziami.
              </p>

              {/* Search */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Szukaj arkusza..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-orange-300 focus:outline-none shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 -mt-6">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filtry:</span>
            </div>

            <select
              value={selectedYear || ""}
              onChange={(e) =>
                setSelectedYear(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Wszystkie lata</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel || ""}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Wszystkie poziomy</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            {(selectedYear || selectedLevel || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedYear(null);
                  setSelectedLevel(null);
                  setSearchQuery("");
                }}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                Wyczyść filtry
              </button>
            )}
          </div>
        </div>

        {/* Content */}
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
          ) : filteredSheets.length > 0 ? (
            Object.entries(groupedByYear)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([year, yearSheets]) => (
                <section key={year} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Matura {year}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {yearSheets.length} arkuszy
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yearSheets.map((sheet) => (
                      <ExamSheetCard key={sheet.id} sheet={sheet} />
                    ))}
                  </div>
                </section>
              ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nie znaleziono arkuszy
              </h3>
              <p className="text-gray-600">Spróbuj innych filtrów</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}

function ExamSheetCard({ sheet }: { sheet: ExamSheet }) {
  const levelColors: Record<string, string> = {
    PODSTAWOWY: "bg-blue-100 text-blue-700",
    ROZSZERZONY: "bg-purple-100 text-purple-700",
  };

  return (
    <Link
      to={`/arkusze/${sheet.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
            <FileText className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {sheet.title}
        </h3>

        {sheet.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {sheet.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {sheet.metadata.level && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                levelColors[sheet.metadata.level] || "bg-gray-100 text-gray-700"
              }`}
            >
              {sheet.metadata.level}
            </span>
          )}
          {sheet.metadata.month && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              {sheet.metadata.month}
            </span>
          )}
          {sheet.metadata.formula && (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
              Formuła {sheet.metadata.formula}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {sheet.pdfCount} plików
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {sheet.views}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ExamSheetsListPage;
