import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Tag,
  Search,
  Filter,
  ChevronRight,
  User,
  Calendar,
  Lock,
  Eye,
  TrendingUp,
  Star,
} from "lucide-react";

// Types
interface Material {
  id: string;
  title: string;
  slug: string;
  type: string;
  category: string;
  summary: string;
  epoch?: string;
  tags: string[];
  readingTime?: number;
  isPremium: boolean;
  views: number;
  work?: {
    title: string;
    author: string;
  };
  createdAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const CATEGORIES = [
  { value: "all", label: "Wszystkie", icon: BookOpen },
  { value: "EPOCHS", label: "Epoki literackie", icon: Calendar },
  { value: "LITERATURE", label: "Lektury", icon: BookOpen },
  { value: "THEORY", label: "Teoria literatury", icon: Tag },
  { value: "WRITING", label: "Pisanie", icon: ChevronRight },
  { value: "EXAM_PREP", label: "Przygotowanie do matury", icon: Clock },
];

const EPOCHS = [
  { value: "all", label: "Wszystkie epoki" },
  { value: "ANTIQUITY", label: "Starożytność" },
  { value: "MIDDLE_AGES", label: "Średniowiecze" },
  { value: "RENAISSANCE", label: "Renesans" },
  { value: "BAROQUE", label: "Barok" },
  { value: "ENLIGHTENMENT", label: "Oświecenie" },
  { value: "ROMANTICISM", label: "Romantyzm" },
  { value: "POSITIVISM", label: "Pozytywizm" },
  { value: "YOUNG_POLAND", label: "Młoda Polska" },
  { value: "INTERWAR", label: "Dwudziestolecie" },
  { value: "CONTEMPORARY", label: "Współczesność" },
];

// Mock data - zastąp prawdziwym API
const mockMaterials: Material[] = [
  {
    id: "1",
    title: "Pan Tadeusz - Kompleksowe opracowanie",
    slug: "pan-tadeusz-opracowanie",
    type: "WORK_ANALYSIS",
    category: "LITERATURE",
    summary:
      "Szczegółowa analiza epopei narodowej Adama Mickiewicza z uwzględnieniem wszystkich wątków, postaci i środków stylistycznych.",
    epoch: "ROMANTICISM",
    tags: ["Mickiewicz", "epopeja", "lektura obowiązkowa"],
    readingTime: 45,
    isPremium: false,
    views: 15234,
    work: {
      title: "Pan Tadeusz",
      author: "Adam Mickiewicz",
    },
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Romantyzm - Charakterystyka epoki",
    slug: "romantyzm-charakterystyka",
    type: "EPOCH_OVERVIEW",
    category: "EPOCHS",
    summary:
      "Pełne opracowanie epoki romantyzmu: filozofia, główne cechy, przedstawiciele, kontekst historyczny.",
    epoch: "ROMANTICISM",
    tags: ["romantyzm", "epoka", "mesjanizm"],
    readingTime: 30,
    isPremium: false,
    views: 8921,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Jak napisać rozprawkę maturalną - Poradnik",
    slug: "rozprawka-maturalna-poradnik",
    type: "WRITING_GUIDE",
    category: "WRITING",
    summary:
      "Kompletny przewodnik po pisaniu rozprawki: struktura, argumentacja, przykłady, najczęstsze błędy.",
    tags: ["rozprawka", "matura", "pisanie"],
    readingTime: 20,
    isPremium: true,
    views: 23456,
    createdAt: "2024-02-01",
  },
];

export default function MaterialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEpoch, setSelectedEpoch] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 60,
    pages: 3,
  });

  // Fetch materials - w prawdziwej aplikacji wywołaj API
  useEffect(() => {
    // Symulacja ładowania
    setLoading(true);
    setTimeout(() => {
      let filtered = [...mockMaterials];

      if (selectedCategory !== "all") {
        filtered = filtered.filter((m) => m.category === selectedCategory);
      }

      if (selectedEpoch !== "all") {
        filtered = filtered.filter((m) => m.epoch === selectedEpoch);
      }

      if (searchQuery) {
        filtered = filtered.filter(
          (m) =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.summary.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setMaterials(filtered);
      setLoading(false);
    }, 500);
  }, [selectedCategory, selectedEpoch, searchQuery]);

  const MaterialCard = ({ material }: { material: Material }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {material.isPremium && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs rounded-full font-medium">
                <Lock className="w-3 h-3" />
                Premium
              </span>
            )}
            {material.epoch && (
              <span className="text-xs text-gray-500 font-medium">
                {EPOCHS.find((e) => e.value === material.epoch)?.label}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {material.title}
          </h3>
        </div>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {material.summary}
      </p>

      {material.work && (
        <div className="text-sm text-gray-500 mb-3">
          <span className="font-medium">{material.work.author}</span> -{" "}
          {material.work.title}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {material.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {material.readingTime} min
            </span>
          )}
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {material.views.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {material.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Materiały edukacyjne
          </h1>
          <p className="text-gray-600">
            Kompleksowa baza wiedzy do matury z języka polskiego
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Szukaj materiałów..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtry
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Epoka
                </label>
                <select
                  value={selectedEpoch}
                  onChange={(e) => setSelectedEpoch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {EPOCHS.map((epoch) => (
                    <option key={epoch.value} value={epoch.value}>
                      {epoch.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                  selectedCategory === cat.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">Ładowanie materiałów...</div>
          </div>
        ) : materials.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Brak materiałów
            </h3>
            <p className="text-gray-600">
              Nie znaleziono materiałów spełniających wybrane kryteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <button
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Poprzednia
                  </button>

                  {Array.from({ length: pagination.pages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`px-4 py-2 rounded-lg ${
                        pagination.page === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Następna
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Premium CTA */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Odblokuj pełny dostęp do wszystkich materiałów
            </h2>
            <p className="text-blue-100 mb-6">
              Uzyskaj dostęp do ekskluzywnych opracowań, szczegółowych analiz i
              zaawansowanych narzędzi przygotowujących do matury.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>500+ materiałów premium</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
                <span>Spersonalizowane ścieżki nauki</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-300" />
                <span>Konsultacje z ekspertami</span>
              </div>
            </div>
            <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Rozpocznij bezpłatny okres próbny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
