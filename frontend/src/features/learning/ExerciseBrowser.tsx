// frontend/src/features/learning/ExerciseBrowser.tsx

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Play,
  Search,
  Star,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { api } from "../../services/api";

const EXERCISE_TYPES = [
  { value: "CLOSED_SINGLE", label: "Jednokrotny wybór", icon: "○" },
  { value: "CLOSED_MULTIPLE", label: "Wielokrotny wybór", icon: "☐" },
  { value: "SHORT_ANSWER", label: "Krótka odpowiedź", icon: "✍" },
  { value: "SYNTHESIS_NOTE", label: "Notatka syntetyczna", icon: "📝" },
  { value: "ESSAY", label: "Wypracowanie", icon: "📄" },
];

const CATEGORIES = [
  { value: "LANGUAGE_USE", label: "Język w użyciu" },
  { value: "HISTORICAL_LITERARY", label: "Test historycznoliteracki" },
  { value: "WRITING", label: "Pisanie" },
];

const EPOCHS = [
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

interface ExercisesResponse {
  exercises: any[];
  total: number;
  page: number;
  totalPages: number;
}

interface ExerciseBrowserProps {
  onSelectExercise: (exercise: any) => void;
  onClose: () => void;
}

export const ExerciseBrowser: React.FC<ExerciseBrowserProps> = ({
  onSelectExercise,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    "question" | "createdAt" | "difficulty" | "type"
  >("question");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    epoch: "",
    difficulty: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useQuery<ExercisesResponse>({
    queryKey: ["admin-exercises", page, sortBy, sortOrder, filters, search],
    queryFn: () =>
      api
        .get("/api/learning/exercises/browse", {
          params: {
            page,
            limit: 50,
            sortBy,
            sortOrder,
            search: search || undefined,
            ...filters,
          },
        })
        .then((r) => r.data),
    placeholderData: (previousData) => previousData, // ZMIENIONE z keepPreviousData
  });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: typeof sortBy) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const getTypeIcon = (type: string) => {
    return EXERCISE_TYPES.find((t) => t.value === type)?.icon || "•";
  };

  const getCategoryLabel = (cat: string) => {
    return CATEGORIES.find((c) => c.value === cat)?.label || cat;
  };

  const getEpochLabel = (epoch: string) => {
    return EPOCHS.find((e) => e.value === epoch)?.label || epoch;
  };

  const hasActiveFilters = Object.values(filters).some((v) => v) || search;

  const clearFilters = () => {
    setFilters({ type: "", category: "", epoch: "", difficulty: "" });
    setSearch("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                📚 Przeglądarka Pytań
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Panel admina - wszystkie pytania z bazy
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Szukaj po treści pytania..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors
                ${
                  showFilters
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              <Filter className="w-5 h-5" />
              Filtry
              {hasActiveFilters && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  {Object.values(filters).filter((v) => v).length +
                    (search ? 1 : 0)}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Wyczyść
              </button>
            )}
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Typ
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) =>
                        setFilters({ ...filters, type: e.target.value })
                      }
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    >
                      <option value="">Wszystkie</option>
                      {EXERCISE_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.icon} {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Kategoria
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    >
                      <option value="">Wszystkie</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Epoka
                    </label>
                    <select
                      value={filters.epoch}
                      onChange={(e) =>
                        setFilters({ ...filters, epoch: e.target.value })
                      }
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    >
                      <option value="">Wszystkie</option>
                      {EPOCHS.map((e) => (
                        <option key={e.value} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Poziom
                    </label>
                    <select
                      value={filters.difficulty}
                      onChange={(e) =>
                        setFilters({ ...filters, difficulty: e.target.value })
                      }
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    >
                      <option value="">Wszystkie</option>
                      {[1, 2, 3, 4, 5].map((d) => (
                        <option key={d} value={d}>
                          Poziom {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                <tr>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => toggleSort("question")}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Pytanie {getSortIcon("question")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => toggleSort("type")}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Typ {getSortIcon("type")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => toggleSort("difficulty")}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Poziom {getSortIcon("difficulty")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => toggleSort("createdAt")}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      Utworzono {getSortIcon("createdAt")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {data?.exercises.map((exercise: any) => (
                  <React.Fragment key={exercise.id}>
                    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <button
                            onClick={() =>
                              setExpandedId(
                                expandedId === exercise.id ? null : exercise.id
                              )
                            }
                            className="mt-1 text-gray-400 hover:text-gray-600"
                          >
                            {expandedId === exercise.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white line-clamp-2">
                              {exercise.question}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                {getCategoryLabel(exercise.category)}
                              </span>
                              {exercise.epoch && (
                                <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                                  {getEpochLabel(exercise.epoch)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          {getTypeIcon(exercise.type)}{" "}
                          {
                            EXERCISE_TYPES.find(
                              (t) => t.value === exercise.type
                            )?.label
                          }
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star
                            className={`w-4 h-4 ${
                              exercise.difficulty >= 1
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {exercise.difficulty}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(exercise.createdAt).toLocaleDateString(
                            "pl-PL"
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            onSelectExercise(exercise);
                            onClose();
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                                   flex items-center gap-1 text-sm font-medium ml-auto transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          Otwórz
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedId === exercise.id && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td
                            colSpan={5}
                            className="px-4 py-3 bg-gray-50 dark:bg-gray-700/30"
                          >
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">ID:</span>{" "}
                                <code className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                                  {exercise.id}
                                </code>
                              </div>
                              <div>
                                <span className="font-medium">Punkty:</span>{" "}
                                {exercise.points}
                              </div>
                              {exercise.tags && exercise.tags.length > 0 && (
                                <div>
                                  <span className="font-medium">Tagi:</span>{" "}
                                  {exercise.tags.join(", ")}
                                </div>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer - Pagination */}
        <div className="p-4 border-t dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Pokazano {(page - 1) * 50 + 1}-
            {Math.min(page * 50, data?.total || 0)} z {data?.total || 0} pytań
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border dark:border-gray-600 rounded-lg disabled:opacity-50
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Poprzednia
            </button>
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium">
              {page} / {data?.totalPages || 1}
            </div>
            <button
              onClick={() =>
                setPage((p) => Math.min(data?.totalPages || 1, p + 1))
              }
              disabled={page >= (data?.totalPages || 1)}
              className="px-4 py-2 border dark:border-gray-600 rounded-lg disabled:opacity-50
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Następna
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
