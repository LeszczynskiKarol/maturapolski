// frontend/src/features/exercises/ExerciseList.tsx

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  TrendingUp,
  Target,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 10;

const EPOCHS = [
  { value: "ANTIQUITY", label: "Starożytność" },
  { value: "MIDDLE_AGES", label: "Średniowiecze" },
  { value: "RENAISSANCE", label: "Renesans" },
  { value: "BAROQUE", label: "Barok" },
  { value: "ENLIGHTENMENT", label: "Oświecenie" },
  { value: "ROMANTICISM", label: "Romantyzm" },
  { value: "POSITIVISM", label: "Pozytywizm" },
  { value: "YOUNG_POLAND", label: "Młoda Polska" },
  { value: "INTERWAR", label: "Dwudziestolecie międzywojenne" },
  { value: "CONTEMPORARY", label: "Współczesność" },
];

const EXERCISE_TYPES = [
  { value: "CLOSED_SINGLE", label: "Jednokrotny wybór", icon: "○" },
  { value: "CLOSED_MULTIPLE", label: "Wielokrotny wybór", icon: "☐" },
  { value: "SHORT_ANSWER", label: "Krótka odpowiedź", icon: "✍" },
  { value: "SYNTHESIS_NOTE", label: "Notatka syntetyczna", icon: "📝" },
  { value: "ESSAY", label: "Wypracowanie", icon: "📄" },
];

export const ExerciseList: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedEpoch, setSelectedEpoch] = useState<string | undefined>(
    undefined
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>(
    []
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Fetch exercises with filters
  const { data: allExercises, isLoading } = useQuery({
    queryKey: ["exercises-with-status", selectedCategory],
    queryFn: () =>
      api
        .get("/api/exercises/with-status", {
          params: {
            category: selectedCategory,
          },
        })
        .then((r) => r.data),
  });

  // Stats

  // Filter and paginate locally
  const exercises = React.useMemo(() => {
    if (!allExercises) return [];
    let filtered = [...allExercises];

    // Apply filters
    if (searchQuery) {
      filtered = filtered.filter((ex) =>
        ex.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedEpoch) {
      filtered = filtered.filter((ex) => ex.epoch === selectedEpoch);
    }
    if (selectedType) {
      filtered = filtered.filter((ex) => ex.type === selectedType);
    }
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((ex) =>
        selectedDifficulties.includes(ex.difficulty)
      );
    }
    if (selectedStatus !== "all") {
      filtered = filtered.filter((ex) => {
        const hasSubmissions = ex.submissions && ex.submissions.length > 0;
        if (selectedStatus === "not_attempted") return !hasSubmissions;
        if (selectedStatus === "solved") return hasSubmissions;
        if (selectedStatus === "to_improve") {
          if (!hasSubmissions) return false;
          const best = Math.max(...ex.submissions.map((s) => s.score || 0));
          return (best / ex.points) * 100 < 60;
        }
        return true;
      });
    }

    // Paginate
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [
    allExercises,
    searchQuery,
    selectedEpoch,
    selectedType,
    selectedDifficulties,
    selectedStatus,
    currentPage,
  ]);

  const totalExercises = React.useMemo(() => {
    if (!allExercises) return 0;
    let filtered = [...allExercises];
    // Same filters as above but just for count
    if (searchQuery) {
      filtered = filtered.filter((ex) =>
        ex.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // ... rest of filters ...
    return filtered.length;
  }, [
    allExercises,
    searchQuery,
    selectedEpoch,
    selectedType,
    selectedDifficulties,
    selectedStatus,
  ]);

  const totalPages = Math.ceil(totalExercises / ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedEpoch(undefined);
    setSelectedType(undefined);
    setSelectedDifficulties([]);
    setSelectedStatus("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedEpoch ||
    selectedType ||
    selectedDifficulties.length > 0 ||
    selectedStatus !== "all" ||
    searchQuery;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with stats */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Zadania maturalne
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Przeglądaj i rozwiązuj zadania z poprzednich lat
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 
                     dark:to-blue-800/20 p-4 rounded-xl"
        >
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Wszystkich zadań</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalExercises}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 
                     dark:to-green-800/20 p-4 rounded-xl"
        >
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Rozwiązanych</span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {exercises.filter((ex) => ex.submissions?.length > 0).length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 
                     dark:to-yellow-800/20 p-4 rounded-xl"
        >
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Średni wynik</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {0}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 
                     dark:to-purple-800/20 p-4 rounded-xl"
        >
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Do powtórki</span>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {0}
          </p>
        </motion.div>
      </div>

      {/* Search and filter bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-4 mb-6">
        <div className="flex gap-4 items-center">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Szukaj zadania..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              hasActiveFilters
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            } hover:bg-gray-200 dark:hover:bg-gray-600`}
          >
            <Filter className="w-5 h-5" />
            Filtry
            {hasActiveFilters && (
              <span
                className="px-2 py-0.5 bg-blue-600 dark:bg-blue-500 text-white 
                             rounded-full text-xs"
              >
                {[
                  selectedCategory ? 1 : 0,
                  selectedEpoch ? 1 : 0,
                  selectedType ? 1 : 0,
                  selectedDifficulties.length > 0 ? 1 : 0,
                  selectedStatus !== "all" ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 
                       dark:hover:bg-red-900/20 rounded-lg flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Wyczyść
            </button>
          )}
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t dark:border-gray-700 space-y-4">
                {/* Status filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status zadania
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "all", label: "Wszystkie" },
                      { value: "not_attempted", label: "Nierozwiązane" },
                      { value: "solved", label: "Rozwiązane" },
                      { value: "to_improve", label: "Do poprawy" },
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          setSelectedStatus(status.value);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          selectedStatus === status.value
                            ? "bg-blue-600 dark:bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategoria
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: undefined, label: "Wszystkie" },
                      { value: "LANGUAGE_USE", label: "Język w użyciu" },
                      {
                        value: "HISTORICAL_LITERARY",
                        label: "Test historycznoliteracki",
                      },
                      { value: "WRITING", label: "Pisanie" },
                    ].map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          if (cat.value !== "HISTORICAL_LITERARY") {
                            setSelectedEpoch(undefined);
                          }
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          selectedCategory === cat.value
                            ? "bg-blue-600 dark:bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Epochs - only for HISTORICAL_LITERARY */}
                {selectedCategory === "HISTORICAL_LITERARY" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Epoka literacka
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EPOCHS.map((epoch) => (
                        <button
                          key={epoch.value}
                          onClick={() => {
                            setSelectedEpoch(
                              selectedEpoch === epoch.value
                                ? undefined
                                : epoch.value
                            );
                            setCurrentPage(1);
                          }}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            selectedEpoch === epoch.value
                              ? "bg-purple-600 dark:bg-purple-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {epoch.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exercise types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Typ zadania
                  </label>
                  <div className="flex gap-2">
                    {EXERCISE_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          setSelectedType(
                            selectedType === type.value ? undefined : type.value
                          );
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 transition-colors ${
                          selectedType === type.value
                            ? "bg-blue-600 dark:bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <span>{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Poziom trudności
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setSelectedDifficulties((prev) =>
                            prev.includes(level)
                              ? prev.filter((d) => d !== level)
                              : [...prev, level]
                          );
                          setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedDifficulties.includes(level)
                            ? "bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 dark:border-yellow-400"
                            : "bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <div className="text-center">
                          <span
                            className={
                              selectedDifficulties.includes(level)
                                ? "text-yellow-500 dark:text-yellow-400"
                                : "text-gray-400 dark:text-gray-500"
                            }
                          >
                            {"⭐".repeat(level)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results info */}
      {hasActiveFilters && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Znaleziono <span className="font-semibold">{totalExercises}</span>{" "}
          zadań spełniających kryteria
        </div>
      )}

      {/* Exercises list */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : exercises.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Nie znaleziono zadań spełniających wybrane kryteria
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white 
                       rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Wyczyść filtry
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise: any, index: number) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ExerciseCard exercise={exercise} navigate={navigate} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Page numbers */}
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (!showPage && page === currentPage - 2) {
                return (
                  <span
                    key={page}
                    className="px-2 text-gray-400 dark:text-gray-500"
                  >
                    ...
                  </span>
                );
              }

              if (!showPage && page === currentPage + 2) {
                return (
                  <span
                    key={page}
                    className="px-2 text-gray-400 dark:text-gray-500"
                  >
                    ...
                  </span>
                );
              }

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
};

// Exercise Card Component
const ExerciseCard: React.FC<{ exercise: any; navigate: any }> = ({
  exercise,
  navigate,
}) => {
  const getExerciseStatus = () => {
    if (!exercise.submissions || exercise.submissions.length === 0) {
      return { type: "not_attempted", message: null };
    }

    const bestSubmission = exercise.submissions.reduce(
      (best: any, current: any) => {
        return (current.score || 0) > (best.score || 0) ? current : best;
      }
    );

    const maxPoints = exercise.points;
    const score = bestSubmission.score || 0;
    const scorePercentage = (score / maxPoints) * 100;

    if (scorePercentage >= 90) {
      return {
        type: "excellent",
        message: `Świetnie! Zdobyłeś ${score}/${maxPoints} pkt`,
        score,
        maxPoints,
      };
    } else if (scorePercentage >= 60) {
      return {
        type: "good",
        message: `Dobry wynik: ${score}/${maxPoints} pkt`,
        score,
        maxPoints,
      };
    } else {
      return {
        type: "poor",
        message: `Słaby wynik: ${score}/${maxPoints} pkt`,
        score,
        maxPoints,
      };
    }
  };

  const status = getExerciseStatus();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20 
                 p-6 hover:shadow-md dark:hover:shadow-gray-900/30 transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
            {exercise.question}
          </h3>

          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {exercise.category}
            </span>
            {exercise.epoch && (
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                {EPOCHS.find((e) => e.value === exercise.epoch)?.label}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {exercise.points} pkt
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Poziom {exercise.difficulty}/5
            </span>
          </div>

          {/* Status badge */}
          {status.message && (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                status.type === "excellent"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : status.type === "good"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              }`}
            >
              {status.type === "excellent" && (
                <CheckCircle className="w-4 h-4" />
              )}
              {status.type === "good" && <CheckCircle className="w-4 h-4" />}
              {status.type === "poor" && <XCircle className="w-4 h-4" />}
              {status.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate(`/exercises/${exercise.id}`)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              status.type === "not_attempted"
                ? "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {status.type === "not_attempted" ? "Rozwiąż" : "Rozwiąż ponownie"}
          </button>

          {status.type === "poor" && (
            <button
              onClick={() => navigate(`/exercises/${exercise.id}`)}
              className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 
                       dark:text-orange-300 rounded-lg hover:bg-orange-200 
                       dark:hover:bg-orange-800/30 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Popraw wynik
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
