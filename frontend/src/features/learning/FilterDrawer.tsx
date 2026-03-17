// frontend/src/features/learning/FilterDrawer.tsx

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Crown, Filter, Lock, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

// ==========================================
// TYPES
// ==========================================

interface SessionFilters {
  type?: string;
  category?: string;
  epoch?: string;
  difficulty?: number[];
  points?: { min: number; max: number };
  work?: string;
}

interface FilterBreakdown {
  epochs: Record<string, number>;
  types: Record<string, number>;
  difficulties: Record<number, number>;
  works: Record<string, number>;
  total: number;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: SessionFilters;
  onFiltersChange: (filters: SessionFilters) => void;
  isPremium: boolean;
  isLoading: boolean;
  worksStats?: any;
}

// ==========================================
// CONSTANTS
// ==========================================

const EPOCHS = [
  { value: "ANTIQUITY", label: "Starożytność", emoji: "🏛️" },
  { value: "MIDDLE_AGES", label: "Średniowiecze", emoji: "🏰" },
  { value: "RENAISSANCE", label: "Renesans", emoji: "🎨" },
  { value: "BAROQUE", label: "Barok", emoji: "👑" },
  { value: "ENLIGHTENMENT", label: "Oświecenie", emoji: "💡" },
  { value: "ROMANTICISM", label: "Romantyzm", emoji: "🌹" },
  { value: "POSITIVISM", label: "Pozytywizm", emoji: "📚" },
  { value: "YOUNG_POLAND", label: "Młoda Polska", emoji: "🦋" },
  { value: "INTERWAR", label: "Dwudziestolecie", emoji: "✒️" },
  { value: "CONTEMPORARY", label: "Współczesność", emoji: "🌐" },
];

const EXERCISE_TYPES = [
  {
    value: "CLOSED_SINGLE",
    label: "Jednokrotny wybór",
    icon: "○",
    short: "Jednokrotny",
  },
  {
    value: "CLOSED_MULTIPLE",
    label: "Wielokrotny wybór",
    icon: "☐",
    short: "Wielokrotny",
  },
  {
    value: "SHORT_ANSWER",
    label: "Krótka odpowiedź",
    icon: "✍",
    short: "Krótka odp.",
    premium: true,
  },
  {
    value: "SYNTHESIS_NOTE",
    label: "Notatka syntetyczna",
    icon: "📝",
    short: "Notatka",
    premium: true,
  },
  {
    value: "ESSAY",
    label: "Wypracowanie",
    icon: "📄",
    short: "Wypracowanie",
    premium: true,
  },
];

const DIFFICULTIES = [
  { level: 1, label: "Podstawowy", color: "emerald", emoji: "⭐" },
  { level: 2, label: "Łatwy", color: "blue", emoji: "⭐⭐" },
  { level: 3, label: "Średni", color: "amber", emoji: "⭐⭐⭐" },
  { level: 4, label: "Trudny", color: "orange", emoji: "⭐⭐⭐⭐" },
  { level: 5, label: "Ekspert", color: "red", emoji: "⭐⭐⭐⭐⭐" },
];

// ==========================================
// ACTIVE FILTER CHIPS (do umieszczenia w session header)
// ==========================================

export const ActiveFilterChips: React.FC<{
  filters: SessionFilters;
  onRemove: (key: keyof SessionFilters) => void;
  onOpenDrawer: () => void;
  filterBreakdown?: FilterBreakdown | null;
}> = ({ filters, onRemove, onOpenDrawer, filterBreakdown }) => {
  const activeCount = Object.keys(filters).filter(
    (k) => filters[k as keyof SessionFilters] !== undefined,
  ).length;

  const getEpochLabel = (val: string) =>
    val
      .split(",")
      .map((v) => EPOCHS.find((e) => e.value === v.trim())?.label || v)
      .join(", ");

  const getTypeLabel = (val: string) =>
    val
      .split(",")
      .map((v) => EXERCISE_TYPES.find((t) => t.value === v.trim())?.short || v)
      .join(", ");

  const getDiffLabel = (val: number[]) => val.map((d) => `Lv${d}`).join(", ");

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Przycisk filtrów */}
      <button
        onClick={onOpenDrawer}
        className="group flex items-center gap-2 px-3 py-1.5 
                   bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30
                   border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600
                   rounded-full text-sm font-medium transition-all"
      >
        <Filter className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">
          Filtry
        </span>
        {activeCount > 0 && (
          <span className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full">
            {activeCount}
          </span>
        )}
      </button>

      {/* Aktywne filtry jako chipy */}
      <AnimatePresence>
        {filters.work && (
          <FilterChip
            label={`📚 ${filters.work}`}
            onRemove={() => onRemove("work")}
          />
        )}
        {filters.epoch && (
          <FilterChip
            label={getEpochLabel(filters.epoch)}
            onRemove={() => onRemove("epoch")}
          />
        )}
        {filters.type && (
          <FilterChip
            label={getTypeLabel(filters.type)}
            onRemove={() => onRemove("type")}
          />
        )}
        {filters.difficulty && filters.difficulty.length > 0 && (
          <FilterChip
            label={getDiffLabel(filters.difficulty)}
            onRemove={() => onRemove("difficulty")}
          />
        )}
      </AnimatePresence>

      {/* Liczba dostępnych pytań */}
      {filterBreakdown && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          {filterBreakdown.total} pytań
        </span>
      )}
    </div>
  );
};

const FilterChip: React.FC<{ label: string; onRemove: () => void }> = ({
  label,
  onRemove,
}) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="inline-flex items-center gap-1 px-2.5 py-1 
               bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
               border border-blue-200 dark:border-blue-700
               rounded-full text-xs font-medium"
  >
    <span className="max-w-[140px] truncate">{label}</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="w-4 h-4 flex items-center justify-center rounded-full
                 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
    >
      <X className="w-3 h-3" />
    </button>
  </motion.span>
);

// ==========================================
// MAIN FILTER DRAWER
// ==========================================

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  currentFilters,
  onFiltersChange,
  isPremium,
  isLoading,
  worksStats,
}) => {
  const navigate = useNavigate();
  const [localFilters, setLocalFilters] =
    useState<SessionFilters>(currentFilters);
  const [workSearch, setWorkSearch] = useState("");

  // Sync z external filters
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  // Pobierz breakdown dostępnych pytań
  const { data: breakdown, isLoading: breakdownLoading } =
    useQuery<FilterBreakdown>({
      queryKey: ["filter-breakdown", localFilters],
      queryFn: async () => {
        const res = await api.post(
          "/api/learning/filter-breakdown",
          localFilters,
        );
        return res.data;
      },
      refetchInterval: 10000,
      staleTime: 5000,
      enabled: isOpen,
    });

  // Level progress
  const { data: levelProgress } = useQuery({
    queryKey: ["difficulty-progress"],
    queryFn: () =>
      api.get("/api/learning/difficulty-progress").then((r) => r.data),
    staleTime: 5000,
  });

  // Derived state
  const selectedEpochs = useMemo(
    () => (localFilters.epoch ? localFilters.epoch.split(",") : []),
    [localFilters.epoch],
  );
  const selectedTypes = useMemo(
    () => (localFilters.type ? localFilters.type.split(",") : []),
    [localFilters.type],
  );
  const selectedDifficulties = useMemo(
    () => localFilters.difficulty || [],
    [localFilters.difficulty],
  );

  const activeCount = [
    localFilters.work,
    localFilters.epoch,
    localFilters.type,
    localFilters.difficulty?.length,
  ].filter(Boolean).length;

  // ==========================================
  // HANDLERS
  // ==========================================

  const applyFilter = (newFilters: SessionFilters) => {
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleEpoch = (value: string) => {
    if (!isPremium) {
      toast.error("Filtrowanie po epokach dostępne tylko w Premium!");
      return;
    }
    const next = selectedEpochs.includes(value)
      ? selectedEpochs.filter((e) => e !== value)
      : [...selectedEpochs, value];
    applyFilter({
      ...localFilters,
      epoch: next.length > 0 ? next.join(",") : undefined,
      category: next.length > 0 ? "HISTORICAL_LITERARY" : localFilters.category,
    });
  };

  const toggleType = (value: string) => {
    const next = selectedTypes.includes(value)
      ? selectedTypes.filter((t) => t !== value)
      : [...selectedTypes, value];
    applyFilter({
      ...localFilters,
      type: next.length > 0 ? next.join(",") : undefined,
    });
  };

  const toggleDifficulty = (level: number) => {
    if (levelProgress && level > levelProgress.currentMaxDifficulty) {
      toast.error(`Poziom ${level} jest zablokowany!`);
      return;
    }
    const next = selectedDifficulties.includes(level)
      ? selectedDifficulties.filter((d) => d !== level)
      : [...selectedDifficulties, level];
    applyFilter({
      ...localFilters,
      difficulty: next.length > 0 ? next : undefined,
    });
  };

  const selectWork = (workTitle: string) => {
    if (!isPremium && workTitle) {
      toast.error("Filtrowanie po lekturach dostępne tylko w Premium!");
      return;
    }
    applyFilter({
      ...localFilters,
      work: workTitle || undefined,
    });
  };

  const clearAll = () => {
    applyFilter({});
    setWorkSearch("");
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md 
                       bg-white dark:bg-gray-900 shadow-2xl z-50
                       flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-5 py-4 border-b border-gray-200 dark:border-gray-700
                            bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Filtry zadań
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {breakdown ? (
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {breakdown.total}
                        </span>
                      ) : (
                        <span className="animate-pulse">…</span>
                      )}{" "}
                      pytań spełnia kryteria
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                             hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Active count + clear */}
              {activeCount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Aktywne filtry:{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {activeCount}
                    </span>
                  </span>
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 
                               dark:hover:text-red-300 font-medium flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Wyczyść wszystko
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* ==========================================
                  LEKTURA
                  ========================================== */}
              <FilterSection
                title="Lektura"
                icon="📚"
                locked={!isPremium}
                onUpgrade={() => navigate("/subscription")}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Szukaj lektury..."
                    value={workSearch}
                    onChange={(e) => setWorkSearch(e.target.value)}
                    disabled={!isPremium}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 
                               rounded-lg bg-white dark:bg-gray-800 
                               text-gray-900 dark:text-white
                               placeholder-gray-400 dark:placeholder-gray-500
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {localFilters.work && (
                  <div
                    className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/30 
                                  rounded-lg border border-blue-200 dark:border-blue-700 mt-2"
                  >
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {localFilters.work}
                    </span>
                    <button
                      onClick={() => selectWork("")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {worksStats && !localFilters.work && (
                  <div className="max-h-48 overflow-y-auto mt-2 space-y-1">
                    {Object.values(worksStats)
                      .filter(
                        (w: any) =>
                          !workSearch ||
                          w.title
                            .toLowerCase()
                            .includes(workSearch.toLowerCase()),
                      )
                      .filter(
                        (w: any) =>
                          selectedEpochs.length === 0 ||
                          selectedEpochs.includes(w.epoch),
                      )
                      .sort((a: any, b: any) =>
                        a.title.localeCompare(b.title, "pl"),
                      )
                      .map((work: any) => {
                        const count =
                          breakdown?.works?.[work.title] ?? work.total;
                        return (
                          <button
                            key={work.id}
                            onClick={() => selectWork(work.title)}
                            disabled={!isPremium}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                                       text-sm text-left transition-all
                                       hover:bg-gray-50 dark:hover:bg-gray-800
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="text-gray-800 dark:text-gray-200 truncate mr-2">
                              {work.title}
                            </span>
                            <span
                              className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 
                                             bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 
                                             rounded-full tabular-nums"
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                )}
              </FilterSection>

              {/* ==========================================
                  EPOKA LITERACKA
                  ========================================== */}
              {!localFilters.work && (
                <FilterSection
                  title="Epoka literacka"
                  icon="🏛️"
                  locked={!isPremium}
                  onUpgrade={() => navigate("/subscription")}
                  count={selectedEpochs.length}
                >
                  <div className="grid grid-cols-2 gap-1.5">
                    {EPOCHS.map((epoch) => {
                      const isSelected = selectedEpochs.includes(epoch.value);
                      const count = breakdown?.epochs?.[epoch.value] ?? 0;

                      return (
                        <button
                          key={epoch.value}
                          onClick={() => toggleEpoch(epoch.value)}
                          disabled={!isPremium || isLoading}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg 
                                      text-sm font-medium transition-all text-left
                                      disabled:opacity-40 disabled:cursor-not-allowed
                                      ${
                                        isSelected
                                          ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-400 dark:ring-purple-600"
                                          : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <span className="text-base">{epoch.emoji}</span>
                            <span className="truncate">{epoch.label}</span>
                          </span>
                          <span
                            className={`flex-shrink-0 text-xs font-bold tabular-nums ml-1 px-1.5 py-0.5 rounded
                              ${
                                isSelected
                                  ? "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
                                  : "text-gray-400 dark:text-gray-500"
                              }
                              ${count === 0 && !isSelected ? "opacity-40" : ""}`}
                          >
                            {breakdownLoading ? "…" : count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </FilterSection>
              )}

              {/* ==========================================
                  TYP ZADANIA
                  ========================================== */}
              <FilterSection
                title="Typ zadania"
                icon="✍"
                count={selectedTypes.length}
              >
                <div className="space-y-1.5">
                  {EXERCISE_TYPES.map((type) => {
                    const isSelected = selectedTypes.includes(type.value);
                    const count = breakdown?.types?.[type.value] ?? 0;
                    const locked = type.premium && !isPremium;

                    return (
                      <button
                        key={type.value}
                        onClick={() => {
                          if (locked) {
                            toast.error(
                              "Pytania otwarte dostępne tylko w Premium!",
                            );
                            return;
                          }
                          toggleType(type.value);
                        }}
                        disabled={isLoading}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                                    text-sm font-medium transition-all
                                    ${
                                      isSelected
                                        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-400 dark:ring-blue-600"
                                        : locked
                                          ? "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                                          : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base w-6 text-center">
                            {type.icon}
                          </span>
                          <span>{type.label}</span>
                          {locked && (
                            <Lock className="w-3.5 h-3.5 text-amber-500" />
                          )}
                        </span>
                        <span
                          className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-full
                            ${
                              isSelected
                                ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                            }
                            ${count === 0 && !isSelected ? "opacity-40" : ""}`}
                        >
                          {breakdownLoading ? "…" : count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              {/* ==========================================
                  POZIOM TRUDNOŚCI
                  ========================================== */}
              <FilterSection
                title="Poziom trudności"
                icon="⭐"
                count={selectedDifficulties.length}
              >
                <div className="space-y-1.5">
                  {DIFFICULTIES.map((diff) => {
                    const isSelected = selectedDifficulties.includes(
                      diff.level,
                    );
                    const count = breakdown?.difficulties?.[diff.level] ?? 0;
                    const locked =
                      levelProgress &&
                      diff.level > levelProgress.currentMaxDifficulty;

                    return (
                      <button
                        key={diff.level}
                        onClick={() => toggleDifficulty(diff.level)}
                        disabled={isLoading || !!locked}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                                    text-sm font-medium transition-all
                                    disabled:cursor-not-allowed
                                    ${
                                      locked
                                        ? "bg-gray-100 dark:bg-gray-800 opacity-40"
                                        : isSelected
                                          ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 ring-2 ring-amber-400 dark:ring-amber-600"
                                          : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{diff.emoji}</span>
                          <span>{diff.label}</span>
                          {locked && (
                            <Lock className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </span>
                        <span
                          className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-full
                            ${
                              isSelected
                                ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                            }
                            ${(count === 0 || locked) && !isSelected ? "opacity-40" : ""}`}
                        >
                          {locked ? "🔒" : breakdownLoading ? "…" : count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {levelProgress && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Odblokowany poziom: {levelProgress.currentMaxDifficulty}/5
                    {levelProgress.pointsNeeded > 0 && (
                      <span>
                        {" "}
                        · {levelProgress.pointsNeeded} pkt do następnego
                      </span>
                    )}
                  </p>
                )}
              </FilterSection>
            </div>

            {/* Footer */}
            <div
              className="flex-shrink-0 px-5 py-4 border-t border-gray-200 dark:border-gray-700
                            bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center justify-between gap-3">
                {activeCount > 0 ? (
                  <button
                    onClick={clearAll}
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300
                               hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Wyczyść filtry
                  </button>
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Brak aktywnych filtrów
                  </span>
                )}

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                             text-white text-sm font-semibold rounded-lg transition-colors
                             flex items-center gap-2"
                >
                  Zastosuj
                  {breakdown && (
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {breakdown.total}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// FILTER SECTION WRAPPER
// ==========================================

const FilterSection: React.FC<{
  title: string;
  icon: string;
  children: React.ReactNode;
  locked?: boolean;
  onUpgrade?: () => void;
  count?: number;
}> = ({ title, icon, children, locked, onUpgrade, count }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative">
      {/* Lock overlay */}
      {locked && (
        <div
          className="absolute inset-0 z-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-[1px] 
                        rounded-xl flex items-center justify-center"
        >
          <div className="text-center px-4">
            <Crown className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Tylko w Premium
            </p>
            {onUpgrade && (
              <button
                onClick={onUpgrade}
                className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500
                           text-white rounded-lg text-xs font-semibold
                           hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                Odblokuj
              </button>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 group"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
          <span className="text-base">{icon}</span>
          {title}
          {count !== undefined && count > 0 && (
            <span
              className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 
                             px-2 py-0.5 rounded-full font-semibold"
            >
              {count}
            </span>
          )}
        </span>
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// HOOK do pobierania breakdown
// ==========================================

export function useFilterBreakdown(filters: SessionFilters, enabled: boolean) {
  return useQuery<FilterBreakdown>({
    queryKey: ["filter-breakdown", filters],
    queryFn: async () => {
      const res = await api.post("/api/learning/filter-breakdown", filters);
      return res.data;
    },
    refetchInterval: 15000,
    staleTime: 5000,
    enabled,
  });
}
