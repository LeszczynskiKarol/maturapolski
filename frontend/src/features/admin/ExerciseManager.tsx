// frontend/src/features/admin/ExerciseManager.tsx

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit,
  Trash,
  X,
  Search,
  Upload,
  Download,
  Copy,
  Eye,
  AlertCircle,
  Save,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Info,
  Hash,
  BarChart,
  FileText,
  Filter,
  ChevronDown,
  RotateCcw,
  Tag,
  Library,
  Clock,
} from "lucide-react";
import { api } from "../../services/api";

// ─── Type definitions ────────────────────────────────────────

interface Exercise {
  id: string;
  type:
    | "CLOSED_SINGLE"
    | "CLOSED_MULTIPLE"
    | "SHORT_ANSWER"
    | "SYNTHESIS_NOTE"
    | "ESSAY";
  category: "LANGUAGE_USE" | "HISTORICAL_LITERARY" | "WRITING";
  epoch?: string;
  work?: string;
  difficulty: number;
  points: number;
  question: string;
  content: {
    options?: string[];
    text?: string;
    fragments?: Array<{
      author: string;
      title: string;
      content: string;
    }>;
  };
  correctAnswer?: number | number[];
  tags: string[];
  metadata?: {
    wordLimit?: { min?: number; max?: number };
    requiredReadings?: string[];
    expectedConcepts?: string[];
    sampleAnswer?: string;
    explanation?: string;
  };
  createdAt: string;
  submissions: number;
}

interface ExerciseFormData {
  type: Exercise["type"];
  category: Exercise["category"];
  epoch?: string;
  work?: string;
  difficulty: number;
  points: number;
  question: string;
  content: Exercise["content"];
  correctAnswer?: Exercise["correctAnswer"];
  tags: string[];
  metadata: Exercise["metadata"];
}

interface FilterMeta {
  epochs: Array<{ value: string; count: number }>;
  works: Array<{ value: string; epoch: string | null; count: number }>;
  worksByEpoch: Record<string, Array<{ work: string; count: number }>>;
  tags: Array<{ tag: string; count: number }>;
  categories: Array<{ value: string; count: number }>;
  types: Array<{ value: string; count: number }>;
}

interface Filters {
  type: string;
  category: string;
  difficulty: string;
  epoch: string;
  work: string;
  tag: string;
}

// ─── Label maps ──────────────────────────────────────────────

const EPOCH_LABELS: Record<string, string> = {
  ANTIQUITY: "Starożytność",
  MIDDLE_AGES: "Średniowiecze",
  RENAISSANCE: "Renesans",
  BAROQUE: "Barok",
  ENLIGHTENMENT: "Oświecenie",
  ROMANTICISM: "Romantyzm",
  POSITIVISM: "Pozytywizm",
  YOUNG_POLAND: "Młoda Polska",
  INTERWAR: "Dwudziestolecie międzywojenne",
  CONTEMPORARY: "Współczesność",
};

const EPOCH_SHORT: Record<string, string> = {
  ANTIQUITY: "Starożytność",
  MIDDLE_AGES: "Średniow.",
  RENAISSANCE: "Renesans",
  BAROQUE: "Barok",
  ENLIGHTENMENT: "Oświecenie",
  ROMANTICISM: "Romantyzm",
  POSITIVISM: "Pozytywizm",
  YOUNG_POLAND: "Młoda Pol.",
  INTERWAR: "Międzywoj.",
  CONTEMPORARY: "Współczesn.",
};

const EPOCH_COLORS: Record<string, string> = {
  ANTIQUITY: "bg-amber-50 text-amber-700 border-amber-200",
  MIDDLE_AGES: "bg-stone-50 text-stone-700 border-stone-200",
  RENAISSANCE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  BAROQUE: "bg-purple-50 text-purple-700 border-purple-200",
  ENLIGHTENMENT: "bg-sky-50 text-sky-700 border-sky-200",
  ROMANTICISM: "bg-rose-50 text-rose-700 border-rose-200",
  POSITIVISM: "bg-teal-50 text-teal-700 border-teal-200",
  YOUNG_POLAND: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  INTERWAR: "bg-orange-50 text-orange-700 border-orange-200",
  CONTEMPORARY: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const TYPE_LABELS: Record<string, string> = {
  CLOSED_SINGLE: "Jednokrotny wybór",
  CLOSED_MULTIPLE: "Wielokrotny wybór",
  SHORT_ANSWER: "Krótka odpowiedź",
  SYNTHESIS_NOTE: "Notatka syntetyczna",
  ESSAY: "Wypracowanie",
};

const CATEGORY_LABELS: Record<string, string> = {
  LANGUAGE_USE: "Język w użyciu",
  HISTORICAL_LITERARY: "Test historycznoliteracki",
  WRITING: "Pisanie",
};

const EPOCH_ORDER = [
  "ANTIQUITY",
  "MIDDLE_AGES",
  "RENAISSANCE",
  "BAROQUE",
  "ENLIGHTENMENT",
  "ROMANTICISM",
  "POSITIVISM",
  "YOUNG_POLAND",
  "INTERWAR",
  "CONTEMPORARY",
];

// ─── Main Component ──────────────────────────────────────────

const ExerciseManager: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [filterMeta, setFilterMeta] = useState<FilterMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    type: "",
    category: "",
    difficulty: "",
    epoch: "",
    work: "",
    tag: "",
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState<Exercise | null>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const itemsPerPage = 10;

  // ─── Data loading ────────────────────────────────────

  useEffect(() => {
    loadExercises();
    loadFilterMeta();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchTerm, filters]);

  const loadExercises = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/admin/exercises?limit=10000000000");
      if (response.data.exercises) {
        setExercises(response.data.exercises);
      } else if (Array.isArray(response.data)) {
        setExercises(response.data);
      } else {
        setExercises([]);
      }
    } catch (error) {
      console.error("Error loading exercises:", error);
      setExercises([]);
    }
    setIsLoading(false);
  };

  const loadFilterMeta = async () => {
    try {
      const response = await api.get("/api/admin/exercises/filters");
      setFilterMeta(response.data);
    } catch (error) {
      console.error("Error loading filter meta:", error);
    }
  };

  // ─── Filtering logic ────────────────────────────────

  const filterExercises = () => {
    let filtered = [...exercises];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (ex) =>
          ex.question.toLowerCase().includes(term) ||
          ex.tags.some((tag) => tag.toLowerCase().includes(term)) ||
          (ex.work && ex.work.toLowerCase().includes(term)),
      );
    }

    if (filters.type)
      filtered = filtered.filter((ex) => ex.type === filters.type);
    if (filters.category)
      filtered = filtered.filter((ex) => ex.category === filters.category);
    if (filters.difficulty)
      filtered = filtered.filter(
        (ex) => ex.difficulty === parseInt(filters.difficulty),
      );
    if (filters.epoch)
      filtered = filtered.filter((ex) => ex.epoch === filters.epoch);
    if (filters.work)
      filtered = filtered.filter((ex) => ex.work === filters.work);
    if (filters.tag)
      filtered = filtered.filter((ex) => ex.tags.includes(filters.tag));

    setFilteredExercises(filtered);
    setCurrentPage(1);
  };

  // ─── Available works based on selected epoch ───────

  const availableWorks = useMemo(() => {
    if (!filterMeta) return [];
    if (filters.epoch && filterMeta.worksByEpoch[filters.epoch]) {
      return filterMeta.worksByEpoch[filters.epoch];
    }
    // All works
    return filterMeta.works.map((w) => ({ work: w.value!, count: w.count }));
  }, [filterMeta, filters.epoch]);

  // ─── Active filter count ──────────────────────────

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter((v) => v !== "").length;
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      type: "",
      category: "",
      difficulty: "",
      epoch: "",
      work: "",
      tag: "",
    });
    setSearchTerm("");
  };

  // ─── Handlers ────────────────────────────────────────

  const handleDelete = async (id: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć to zadanie?")) {
      try {
        await api.delete(`/api/admin/exercises/${id}`);
        setExercises(exercises.filter((ex) => ex.id !== id));
      } catch (error) {
        console.error("Error deleting exercise:", error);
      }
    }
  };

  const handleDuplicate = (exercise: Exercise) => {
    const duplicate: Exercise = {
      ...exercise,
      id: "",
      question: `${exercise.question} (kopia)`,
    };
    setEditingExercise(duplicate);
    setShowForm(true);
  };

  const exportExercises = () => {
    const dataStr = JSON.stringify(filteredExercises, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute(
      "download",
      `exercises_${new Date().toISOString()}.json`,
    );
    linkElement.click();
  };

  // ─── Pagination ──────────────────────────────────────

  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const paginatedExercises = filteredExercises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ─── Render ──────────────────────────────────────────

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Zarządzanie Ćwiczeniami
            </h1>
            <p className="text-gray-600 mt-2">
              Łącznie: {exercises.length} zadań | Wyświetlane:{" "}
              {filteredExercises.length}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBulkImport(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Import
            </button>
            <button
              onClick={exportExercises}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Eksport
            </button>
            <button
              onClick={() => {
                setEditingExercise(null);
                setShowForm(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nowe Zadanie
            </button>
          </div>
        </div>

        {/* Search + basic filters row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Szukaj po pytaniu, tagach, dziele..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Wszystkie typy</option>
            {(filterMeta?.types || []).map((t) => (
              <option key={t.value} value={t.value}>
                {TYPE_LABELS[t.value] || t.value} ({t.count})
              </option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Wszystkie kategorie</option>
            {(filterMeta?.categories || []).map((c) => (
              <option key={c.value} value={c.value}>
                {CATEGORY_LABELS[c.value] || c.value} ({c.count})
              </option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Każda trudność</option>
            <option value="1">⭐ Bardzo łatwe</option>
            <option value="2">⭐⭐ Łatwe</option>
            <option value="3">⭐⭐⭐ Średnie</option>
            <option value="4">⭐⭐⭐⭐ Trudne</option>
            <option value="5">⭐⭐⭐⭐⭐ Bardzo trudne</option>
          </select>

          {/* Advanced filters toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
              showAdvancedFilters || activeFilterCount > 0
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : "hover:bg-gray-50"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filtry
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* ─── Advanced Filters Panel ──────────────────── */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t space-y-4">
            {/* Epoch pills */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Epoka literacka
                </span>
                {filters.epoch && (
                  <button
                    onClick={() =>
                      setFilters({ ...filters, epoch: "", work: "" })
                    }
                    className="text-xs text-gray-400 hover:text-gray-600 ml-auto flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Wyczyść
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {EPOCH_ORDER.map((epochKey) => {
                  const meta = filterMeta?.epochs.find(
                    (e) => e.value === epochKey,
                  );
                  const count = meta?.count || 0;
                  const isActive = filters.epoch === epochKey;
                  const colorClass =
                    EPOCH_COLORS[epochKey] ||
                    "bg-gray-50 text-gray-700 border-gray-200";

                  return (
                    <button
                      key={epochKey}
                      onClick={() => {
                        if (isActive) {
                          setFilters({ ...filters, epoch: "", work: "" });
                        } else {
                          setFilters({ ...filters, epoch: epochKey, work: "" });
                        }
                      }}
                      disabled={count === 0}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                        isActive
                          ? `${colorClass} ring-2 ring-offset-1 ring-blue-400 font-medium`
                          : count > 0
                            ? `${colorClass} hover:shadow-sm cursor-pointer`
                            : "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                      }`}
                    >
                      {EPOCH_SHORT[epochKey] || epochKey}
                      {count > 0 && (
                        <span className="ml-1.5 text-xs opacity-60">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Work selector (cascading from epoch) */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Library className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Dzieło literackie
                  {filters.epoch && (
                    <span className="ml-1 text-xs text-gray-400 font-normal">
                      ({EPOCH_LABELS[filters.epoch]})
                    </span>
                  )}
                </span>
                {filters.work && (
                  <button
                    onClick={() => setFilters({ ...filters, work: "" })}
                    className="text-xs text-gray-400 hover:text-gray-600 ml-auto flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Wyczyść
                  </button>
                )}
              </div>

              {availableWorks.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {availableWorks
                    .sort((a, b) => b.count - a.count)
                    .map((w) => {
                      const isActive = filters.work === w.work;
                      return (
                        <button
                          key={w.work}
                          onClick={() =>
                            setFilters({
                              ...filters,
                              work: isActive ? "" : w.work,
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                            isActive
                              ? "bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-offset-1 ring-blue-400 font-medium"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                          }`}
                        >
                          <span className="mr-1">📖</span>
                          {w.work}
                          <span className="ml-1.5 text-xs opacity-50">
                            {w.count}
                          </span>
                        </button>
                      );
                    })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  {filters.epoch
                    ? "Brak zadań z tą epoką przypisanych do dzieła"
                    : "Wybierz epokę lub wyszukaj po nazwie dzieła"}
                </p>
              )}
            </div>

            {/* Tags */}
            {filterMeta && filterMeta.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Tagi
                  </span>
                  {filters.tag && (
                    <button
                      onClick={() => setFilters({ ...filters, tag: "" })}
                      className="text-xs text-gray-400 hover:text-gray-600 ml-auto flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Wyczyść
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {filterMeta.tags.slice(0, 40).map((t) => {
                    const isActive = filters.tag === t.tag;
                    return (
                      <button
                        key={t.tag}
                        onClick={() =>
                          setFilters({ ...filters, tag: isActive ? "" : t.tag })
                        }
                        className={`px-2.5 py-1 rounded text-xs transition-all ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-medium ring-1 ring-blue-300"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {t.tag}
                        <span className="ml-1 opacity-50">{t.count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reset all */}
            {activeFilterCount > 0 && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Wyczyść wszystkie filtry ({activeFilterCount})
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Statistics Cards ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={BookOpen}
          title="Zadania zamknięte"
          value={exercises.filter((ex) => ex.type.startsWith("CLOSED")).length}
          color="blue"
        />
        <StatCard
          icon={FileText}
          title="Zadania otwarte"
          value={
            exercises.filter(
              (ex) =>
                ex.type === "SHORT_ANSWER" || ex.type === "SYNTHESIS_NOTE",
            ).length
          }
          color="green"
        />
        <StatCard
          icon={Hash}
          title="Wypracowania"
          value={exercises.filter((ex) => ex.type === "ESSAY").length}
          color="purple"
        />
        <StatCard
          icon={BarChart}
          title="Średnia trudność"
          value={(
            exercises.reduce((acc, ex) => acc + ex.difficulty, 0) /
              exercises.length || 0
          ).toFixed(1)}
          color="orange"
        />
      </div>

      {/* ─── Active filters summary ───────────────────── */}
      {activeFilterCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-3 flex-wrap">
          <span className="text-sm text-blue-700 font-medium">
            Aktywne filtry:
          </span>
          {filters.type && (
            <FilterChip
              label={TYPE_LABELS[filters.type]}
              onRemove={() => setFilters({ ...filters, type: "" })}
            />
          )}
          {filters.category && (
            <FilterChip
              label={CATEGORY_LABELS[filters.category]}
              onRemove={() => setFilters({ ...filters, category: "" })}
            />
          )}
          {filters.difficulty && (
            <FilterChip
              label={`Trudność: ${filters.difficulty}`}
              onRemove={() => setFilters({ ...filters, difficulty: "" })}
            />
          )}
          {filters.epoch && (
            <FilterChip
              label={EPOCH_LABELS[filters.epoch]}
              onRemove={() => setFilters({ ...filters, epoch: "", work: "" })}
              color="amber"
            />
          )}
          {filters.work && (
            <FilterChip
              label={`📖 ${filters.work}`}
              onRemove={() => setFilters({ ...filters, work: "" })}
              color="emerald"
            />
          )}
          {filters.tag && (
            <FilterChip
              label={`# ${filters.tag}`}
              onRemove={() => setFilters({ ...filters, tag: "" })}
              color="violet"
            />
          )}
          <span className="text-sm text-blue-600 ml-auto">
            {filteredExercises.length} wyników
          </span>
        </div>
      )}

      {/* ─── Exercises Table ──────────────────────────── */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pytanie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Epoka / Dzieło
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trudność
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pkt
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedExercises.map((exercise) => (
                  <tr key={exercise.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {exercise.question.substring(0, 80)}
                        {exercise.question.length > 80 && "..."}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {exercise.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded cursor-pointer hover:bg-gray-200"
                            onClick={() => setFilters({ ...filters, tag })}
                          >
                            {tag}
                          </span>
                        ))}
                        {exercise.tags.length > 4 && (
                          <span className="text-xs text-gray-400">
                            +{exercise.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TypeBadge type={exercise.type} />
                    </td>
                    <td className="px-6 py-4">
                      <CategoryBadge category={exercise.category} />
                    </td>
                    <td className="px-6 py-4">
                      {exercise.epoch && (
                        <span
                          className={`inline-block px-2 py-0.5 text-xs rounded border cursor-pointer ${
                            EPOCH_COLORS[exercise.epoch] ||
                            "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                          onClick={() =>
                            setFilters({ ...filters, epoch: exercise.epoch! })
                          }
                        >
                          {EPOCH_SHORT[exercise.epoch] || exercise.epoch}
                        </span>
                      )}
                      {exercise.work && (
                        <div
                          className="text-xs text-gray-500 mt-1 truncate max-w-[140px] cursor-pointer hover:text-blue-600"
                          title={exercise.work}
                          onClick={() =>
                            setFilters({ ...filters, work: exercise.work! })
                          }
                        >
                          📖 {exercise.work}
                        </div>
                      )}
                      {!exercise.epoch && !exercise.work && (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < exercise.difficulty
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {exercise.points}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowPreview(exercise)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                          title="Podgląd"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(exercise)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                          title="Duplikuj"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingExercise(exercise);
                            setShowForm(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(exercise.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Usuń"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedExercises.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      {activeFilterCount > 0
                        ? "Brak zadań spełniających kryteria filtrowania"
                        : "Brak zadań w bazie"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Strona {currentPage} z {totalPages} (
                  {filteredExercises.length} wyników)
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {generatePageNumbers(currentPage, totalPages).map(
                    (pageNum, i) =>
                      pageNum === -1 ? (
                        <span
                          key={`ellipsis-${i}`}
                          className="px-2 py-1 text-gray-400"
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white border-blue-600"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ),
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ─── Modals ──────────────────────────────────── */}
      {showForm && (
        <ExerciseForm
          exercise={editingExercise}
          filterMeta={filterMeta}
          onClose={() => {
            setShowForm(false);
            setEditingExercise(null);
          }}
          onSave={(savedExercise: Exercise) => {
            if (editingExercise?.id) {
              setExercises(
                exercises.map((ex) =>
                  ex.id === editingExercise.id ? savedExercise : ex,
                ),
              );
            } else {
              setExercises([savedExercise, ...exercises]);
            }
            setShowForm(false);
            setEditingExercise(null);
            loadFilterMeta(); // Odśwież metadane filtrów
          }}
        />
      )}

      {showPreview && (
        <ExercisePreview
          exercise={showPreview}
          onClose={() => setShowPreview(null)}
        />
      )}

      {showBulkImport && (
        <BulkImportModal
          onClose={() => setShowBulkImport(false)}
          onImport={(importedExercises: Exercise[]) => {
            setExercises([...exercises, ...importedExercises]);
            setShowBulkImport(false);
            loadFilterMeta();
          }}
        />
      )}
    </div>
  );
};

// ─── Pagination helper ──────────────────────────────────────

function generatePageNumbers(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: number[] = [1];

  if (current > 3) pages.push(-1); // ellipsis

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push(-1); // ellipsis

  if (!pages.includes(total)) pages.push(total);

  return pages;
}

// ─── Filter Chip ────────────────────────────────────────────

interface FilterChipProps {
  label: string;
  onRemove: () => void;
  color?: "blue" | "amber" | "emerald" | "violet";
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onRemove,
  color = "blue",
}) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    emerald: "bg-emerald-100 text-emerald-700",
    violet: "bg-violet-100 text-violet-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colorMap[color]}`}
    >
      {label}
      <button onClick={onRemove} className="hover:opacity-70">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
};

// ─── Exercise Form Component ────────────────────────────────

interface ExerciseFormProps {
  exercise: Exercise | null;
  filterMeta: FilterMeta | null;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  exercise,
  filterMeta,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ExerciseFormData>({
    type: exercise?.type || "CLOSED_SINGLE",
    category: exercise?.category || "LANGUAGE_USE",
    epoch: exercise?.epoch || "",
    work: exercise?.work || "",
    difficulty: exercise?.difficulty || 3,
    points: exercise?.points || 1,
    question: exercise?.question || "",
    content: exercise?.content || {},
    correctAnswer: exercise?.correctAnswer,
    tags: exercise?.tags || [],
    metadata: exercise?.metadata || {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState("");

  // Dzieła dostępne dla wybranej epoki
  const worksForEpoch = useMemo(() => {
    if (!filterMeta) return [];
    if (formData.epoch && filterMeta.worksByEpoch[formData.epoch]) {
      return filterMeta.worksByEpoch[formData.epoch].map((w) => w.work);
    }
    return filterMeta.works.map((w) => w.value).filter(Boolean) as string[];
  }, [filterMeta, formData.epoch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.question.trim()) newErrors.question = "Pytanie jest wymagane";
    if (formData.points < 1) newErrors.points = "Punkty muszą być większe od 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        epoch: formData.epoch || undefined,
        work: formData.work || undefined,
        content: formData.content || {},
        metadata: formData.metadata || {},
      };

      if (!dataToSend.epoch) delete dataToSend.epoch;
      if (!dataToSend.work) delete dataToSend.work;
      if (!dataToSend.correctAnswer) delete dataToSend.correctAnswer;

      const response = exercise?.id
        ? await api.put(`/api/admin/exercises/${exercise.id}`, dataToSend)
        : await api.post("/api/admin/exercises", dataToSend);

      onSave(response.data);
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">
            {exercise?.id ? "Edytuj zadanie" : "Nowe zadanie"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Pytanie/Polecenie *
            </label>
            <textarea
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg ${errors.question ? "border-red-500" : ""}`}
              rows={4}
              placeholder="Wprowadź treść pytania..."
            />
            {errors.question && (
              <p className="text-red-500 text-sm mt-1">{errors.question}</p>
            )}
          </div>

          {/* Grid: type, category, difficulty, points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Typ zadania
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as Exercise["type"],
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                {Object.entries(TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Kategoria
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Exercise["category"],
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Trudność</label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficulty: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="1">⭐ Bardzo łatwe</option>
                <option value="2">⭐⭐ Łatwe</option>
                <option value="3">⭐⭐⭐ Średnie</option>
                <option value="4">⭐⭐⭐⭐ Trudne</option>
                <option value="5">⭐⭐⭐⭐⭐ Bardzo trudne</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Punkty *</label>
              <input
                type="number"
                min="1"
                max="35"
                value={formData.points}
                onChange={(e) =>
                  setFormData({ ...formData, points: parseInt(e.target.value) })
                }
                className={`w-full px-3 py-2 border rounded-lg ${errors.points ? "border-red-500" : ""}`}
              />
            </div>
          </div>

          {/* Epoch + Work selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Epoka literacka
              </label>
              <select
                value={formData.epoch || ""}
                onChange={(e) =>
                  setFormData({ ...formData, epoch: e.target.value, work: "" })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">— Brak —</option>
                {EPOCH_ORDER.map((key) => (
                  <option key={key} value={key}>
                    {EPOCH_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Dzieło literackie
                {formData.epoch && (
                  <span className="text-xs text-gray-400 font-normal ml-1">
                    ({EPOCH_LABELS[formData.epoch]})
                  </span>
                )}
              </label>
              <input
                type="text"
                list="work-suggestions"
                value={formData.work || ""}
                onChange={(e) =>
                  setFormData({ ...formData, work: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Wpisz lub wybierz dzieło..."
              />
              <datalist id="work-suggestions">
                {worksForEpoch.map((w) => (
                  <option key={w} value={w} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Options editor for closed questions */}
          {(formData.type === "CLOSED_SINGLE" ||
            formData.type === "CLOSED_MULTIPLE") && (
            <OptionsEditor
              options={formData.content.options || ["", "", "", ""]}
              correctAnswer={formData.correctAnswer}
              multiple={formData.type === "CLOSED_MULTIPLE"}
              onChange={(options, correct) => {
                setFormData({
                  ...formData,
                  content: { ...formData.content, options },
                  correctAnswer: correct,
                });
              }}
            />
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tagi</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                list="tag-suggestions"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Dodaj tag..."
              />
              <datalist id="tag-suggestions">
                {(filterMeta?.tags || []).slice(0, 20).map((t) => (
                  <option key={t.tag} value={t.tag} />
                ))}
              </datalist>
              <button
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Dodaj
              </button>
            </div>
          </div>

          {/* Explanation */}
          {(formData.type === "CLOSED_SINGLE" ||
            formData.type === "CLOSED_MULTIPLE") && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Wyjaśnienie prawidłowej odpowiedzi
              </label>
              <textarea
                value={formData.metadata?.explanation || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    metadata: {
                      ...formData.metadata,
                      explanation: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Dlaczego ta odpowiedź jest prawidłowa?"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {exercise?.id ? "Zapisz zmiany" : "Dodaj zadanie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Options Editor ─────────────────────────────────────────

interface OptionsEditorProps {
  options: string[];
  correctAnswer?: number | number[];
  multiple: boolean;
  onChange: (options: string[], correct?: number | number[]) => void;
}

const OptionsEditor: React.FC<OptionsEditorProps> = ({
  options,
  correctAnswer,
  multiple,
  onChange,
}) => {
  const [localOptions, setLocalOptions] = useState<string[]>(options);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...localOptions];
    newOptions[index] = value;
    setLocalOptions(newOptions);
    onChange(newOptions, correctAnswer);
  };

  const setCorrect = (index: number) => {
    if (multiple) {
      const current = Array.isArray(correctAnswer) ? correctAnswer : [];
      const newCorrect = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      onChange(localOptions, newCorrect);
    } else {
      onChange(localOptions, index);
    }
  };

  const addOption = () => {
    const newOptions = [...localOptions, ""];
    setLocalOptions(newOptions);
    onChange(newOptions, correctAnswer);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Opcje odpowiedzi {multiple && "(możliwy wielokrotny wybór)"}
      </label>
      <div className="space-y-2">
        {localOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type={multiple ? "checkbox" : "radio"}
              checked={
                multiple
                  ? Array.isArray(correctAnswer) &&
                    correctAnswer.includes(index)
                  : correctAnswer === index
              }
              onChange={() => setCorrect(index)}
              className="w-4 h-4"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Opcja ${index + 1}`}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>
        ))}
      </div>
      <button
        onClick={addOption}
        className="mt-3 text-sm text-blue-600 hover:underline"
      >
        + Dodaj opcję
      </button>
    </div>
  );
};

// ─── Preview Modal ──────────────────────────────────────────

interface ExercisePreviewProps {
  exercise: Exercise;
  onClose: () => void;
}

const ExercisePreview: React.FC<ExercisePreviewProps> = ({
  exercise,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Podgląd zadania</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Meta info */}
          <div className="flex flex-wrap gap-2 items-center">
            <TypeBadge type={exercise.type} />
            <CategoryBadge category={exercise.category} />
            {exercise.epoch && (
              <span
                className={`px-2 py-0.5 text-xs rounded border ${EPOCH_COLORS[exercise.epoch] || ""}`}
              >
                {EPOCH_LABELS[exercise.epoch]}
              </span>
            )}
            {exercise.work && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                📖 {exercise.work}
              </span>
            )}
            <span className="text-sm font-medium text-gray-600 ml-auto">
              {exercise.points} pkt
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">{exercise.question}</h3>

            {exercise.content?.options && (
              <div className="space-y-2">
                {exercise.content.options.map((option, idx) => {
                  const isCorrect = Array.isArray(exercise.correctAnswer)
                    ? exercise.correctAnswer.includes(idx)
                    : exercise.correctAnswer === idx;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                          isCorrect
                            ? "bg-green-100 border-green-600 text-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span
                        className={
                          isCorrect ? "font-medium text-green-700" : ""
                        }
                      >
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {exercise.metadata?.explanation && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-blue-700">
                Wyjaśnienie:{" "}
              </span>
              <span className="text-sm text-blue-800">
                {exercise.metadata.explanation}
              </span>
            </div>
          )}

          {exercise.tags.length > 0 && (
            <div>
              <span className="text-sm text-gray-600">Tagi:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {exercise.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Bulk Import Modal ──────────────────────────────────────

interface BulkImportModalProps {
  onClose: () => void;
  onImport: (exercises: Exercise[]) => void;
}

const BulkImportModal: React.FC<BulkImportModalProps> = ({
  onClose,
  onImport,
}) => {
  const [importData, setImportData] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [showExample, setShowExample] = useState(false);

  const exampleData = `[
  {
    "type": "CLOSED_SINGLE",
    "category": "HISTORICAL_LITERARY",
    "difficulty": 1,
    "points": 1,
    "epoch": "REALISM",
    "work": "Zbrodnia i kara",
    "question": "Kto jest autorem powieści „Zbrodnia i kara"?",
    "content": {
      "options": [
        "Lew Tołstoj",
        "Fiodor Dostojewski",
        "Anton Czechow",
        "Iwan Turgieniew"
      ]
    },
    "correctAnswer": 1,
    "tags": ["Dostojewski", "Realizm"],
    "metadata": {
      "explanation": "„Zbrodnia i kara" to najsłynniejsza powieść Fiodora Dostojewskiego."
    }
  }
]`;

  const handleImport = async () => {
    const newErrors: string[] = [];

    try {
      if (!importData.trim()) {
        setErrors(["Proszę wkleić dane JSON"]);
        return;
      }

      let dataToP = importData.trim();
      if (dataToP.startsWith("{") && !dataToP.startsWith("[")) {
        dataToP = "[" + dataToP + "]";
      }

      let exercises: any;
      try {
        exercises = JSON.parse(dataToP);
      } catch (parseError: any) {
        setErrors(["❌ Błąd parsowania JSON:", parseError.message]);
        return;
      }

      if (!Array.isArray(exercises) || exercises.length === 0) {
        setErrors(["Dane muszą być niepustą tablicą zadań"]);
        return;
      }

      const validExercises: any[] = [];
      exercises.forEach((ex: any, index: number) => {
        const exerciseErrors: string[] = [];
        if (!ex.question) exerciseErrors.push("brak 'question'");
        if (!ex.type) exerciseErrors.push("brak 'type'");
        if (!ex.category) exerciseErrors.push("brak 'category'");
        if (ex.points === undefined) exerciseErrors.push("brak 'points'");
        if (!ex.content) exerciseErrors.push("brak 'content'");
        if (!ex.tags) ex.tags = [];

        if (exerciseErrors.length > 0) {
          newErrors.push(`Zadanie ${index + 1}: ${exerciseErrors.join(", ")}`);
        } else {
          validExercises.push(ex);
        }
      });

      if (validExercises.length === 0) {
        setErrors(["❌ Brak poprawnych zadań", ...newErrors]);
        return;
      }

      const response = await api.post(
        "/api/admin/exercises/bulk",
        validExercises,
      );

      if (response.data.exercises) {
        onImport(response.data.exercises);
        if (newErrors.length > 0) {
          alert(
            `⚠️ Zaimportowano ${validExercises.length} z ${exercises.length} zadań.`,
          );
        }
      }
    } catch (error: any) {
      setErrors([
        "❌ Błąd importu:",
        error.response?.data?.message || error.message,
      ]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Import zadań (JSON)</h2>
            <p className="text-sm text-gray-600 mt-1">
              Wklej tablicę JSON z zadaniami
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowExample(!showExample)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              {showExample ? "Ukryj" : "Pokaż"} przykład
            </button>
            {showExample && (
              <button
                onClick={() => setImportData(exampleData)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Użyj przykładu
              </button>
            )}
          </div>

          {showExample && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="text-xs text-gray-700 overflow-x-auto">
                {exampleData}
              </pre>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">
                  Pola wymagane: type, category, question, content, points
                </p>
                <p className="text-blue-800">
                  Opcjonalne: epoch, work, tags, metadata, correctAnswer
                </p>
              </div>
            </div>
          </div>

          <textarea
            value={importData}
            onChange={(e) => {
              setImportData(e.target.value);
              setErrors([]);
            }}
            className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
            rows={12}
            placeholder='[{"type": "CLOSED_SINGLE", "question": "...", ...}]'
          />

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  {errors.map((error, idx) => (
                    <div key={idx} className="text-sm text-red-700">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              onClick={handleImport}
              disabled={!importData.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Importuj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Badge Components ───────────────────────────────────────

const TypeBadge: React.FC<{ type: Exercise["type"] }> = ({ type }) => {
  const config: Record<string, { label: string; color: string }> = {
    CLOSED_SINGLE: { label: "Jednokrotny", color: "bg-blue-100 text-blue-700" },
    CLOSED_MULTIPLE: {
      label: "Wielokrotny",
      color: "bg-indigo-100 text-indigo-700",
    },
    SHORT_ANSWER: {
      label: "Krótka odp.",
      color: "bg-green-100 text-green-700",
    },
    SYNTHESIS_NOTE: {
      label: "Notatka",
      color: "bg-purple-100 text-purple-700",
    },
    ESSAY: { label: "Wypracowanie", color: "bg-pink-100 text-pink-700" },
  };
  const { label, color } = config[type];
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${color}`}>
      {label}
    </span>
  );
};

const CategoryBadge: React.FC<{ category: Exercise["category"] }> = ({
  category,
}) => {
  const config: Record<string, { label: string; color: string }> = {
    LANGUAGE_USE: { label: "Język", color: "bg-blue-100 text-blue-700" },
    HISTORICAL_LITERARY: {
      label: "Historia lit.",
      color: "bg-purple-100 text-purple-700",
    },
    WRITING: { label: "Pisanie", color: "bg-green-100 text-green-700" },
  };
  const { label, color } = config[category];
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${color}`}>
      {label}
    </span>
  );
};

// ─── Stat Card ──────────────────────────────────────────────

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  color: "blue" | "green" | "purple" | "orange";
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;
