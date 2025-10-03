// frontend/src/components/SessionFilters.tsx

import React, { useState } from "react";
import { Filter, X, ChevronDown, ChevronRight, Award } from "lucide-react";

export interface SessionFilters {
  type?: string;
  category?: string;
  epoch?: string;
  difficulty?: number[];
  points?: { min: number; max: number };
}

interface SessionFiltersProps {
  onFiltersChange: (filters: SessionFilters) => void;
  onStart: () => void;
}

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

const CATEGORIES = [
  { value: "LANGUAGE_USE", label: "Język w użyciu", color: "blue" },
  {
    value: "HISTORICAL_LITERARY",
    label: "Test historycznoliteracki",
    color: "purple",
  },
  { value: "WRITING", label: "Pisanie", color: "green" },
];

export const SessionFiltersComponent: React.FC<SessionFiltersProps> = ({
  onFiltersChange,
  onStart,
}) => {
  const [filters, setFilters] = useState<SessionFilters>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>(
    []
  );
  const [pointsRange, setPointsRange] = useState({ min: 1, max: 35 });

  const handleFilterChange = (newFilters: Partial<SessionFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const handleDifficultyToggle = (level: number) => {
    const newDifficulties = selectedDifficulties.includes(level)
      ? selectedDifficulties.filter((d) => d !== level)
      : [...selectedDifficulties, level];

    setSelectedDifficulties(newDifficulties);
    handleFilterChange({
      difficulty: newDifficulties.length > 0 ? newDifficulties : undefined,
    });
  };

  const handlePointsChange = (type: "min" | "max", value: number) => {
    const newRange = { ...pointsRange, [type]: value };
    setPointsRange(newRange);
    handleFilterChange({ points: newRange });
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedDifficulties([]);
    setPointsRange({ min: 1, max: 35 });
    onFiltersChange({});
  };

  const hasFilters =
    Object.keys(filters).length > 0 || selectedDifficulties.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Dostosuj sesję nauki</h3>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">
          Kategoria zadań
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() =>
                handleFilterChange({
                  category:
                    filters.category === category.value
                      ? undefined
                      : category.value,
                  // Reset epoch if changing from HISTORICAL_LITERARY
                  epoch:
                    filters.category === category.value
                      ? undefined
                      : filters.epoch,
                })
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                filters.category === category.value
                  ? `border-${category.color}-500 bg-${category.color}-50`
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-left">
                <p className="font-medium">{category.label}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {category.value === "LANGUAGE_USE" && "Gramatyka, stylistyka"}
                  {category.value === "HISTORICAL_LITERARY" && "Epoki, lektury"}
                  {category.value === "WRITING" && "Wypracowania, rozprawki"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Epoch Selection - only for HISTORICAL_LITERARY */}
      {filters.category === "HISTORICAL_LITERARY" && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <label className="block text-sm font-medium mb-3">
            Wybierz epokę literacką
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {EPOCHS.map((epoch) => (
              <button
                key={epoch.value}
                onClick={() =>
                  handleFilterChange({
                    epoch:
                      filters.epoch === epoch.value ? undefined : epoch.value,
                  })
                }
                className={`px-3 py-2 rounded text-sm transition-all ${
                  filters.epoch === epoch.value
                    ? "bg-purple-600 text-white"
                    : "bg-white hover:bg-purple-100"
                }`}
              >
                {epoch.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exercise Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Typ zadań</label>
        <div className="flex flex-wrap gap-2">
          {EXERCISE_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                handleFilterChange({
                  type: filters.type === type.value ? undefined : type.value,
                })
              }
              className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                filters.type === type.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-lg">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        {showAdvanced ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        Zaawansowane filtry
      </button>

      {showAdvanced && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Poziom trudności
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyToggle(level)}
                  className={`px-3 py-2 rounded border transition-all ${
                    selectedDifficulties.includes(level)
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex">
                      {[...Array(level)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            selectedDifficulties.includes(level)
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-xs mt-1">
                      {level === 1 && "Bardzo łatwe"}
                      {level === 2 && "Łatwe"}
                      {level === 3 && "Średnie"}
                      {level === 4 && "Trudne"}
                      {level === 5 && "Bardzo trudne"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Points Range */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Zakres punktów
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Od:</span>
                <input
                  type="number"
                  min="1"
                  max="35"
                  value={pointsRange.min}
                  onChange={(e) =>
                    handlePointsChange("min", parseInt(e.target.value) || 1)
                  }
                  className="w-16 px-2 py-1 border rounded"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Do:</span>
                <input
                  type="number"
                  min="1"
                  max="35"
                  value={pointsRange.max}
                  onChange={(e) =>
                    handlePointsChange("max", parseInt(e.target.value) || 35)
                  }
                  className="w-16 px-2 py-1 border rounded"
                />
              </div>
              <span className="text-sm text-gray-500">pkt</span>
            </div>
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full relative">
                <div
                  className="absolute h-2 bg-blue-500 rounded-full"
                  style={{
                    left: `${(pointsRange.min / 35) * 100}%`,
                    width: `${
                      ((pointsRange.max - pointsRange.min) / 35) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary and Start Button */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between">
          <div>
            {hasFilters && (
              <div className="text-sm text-gray-600">
                <p>Wybrane filtry:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {filters.category && (
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {
                        CATEGORIES.find((c) => c.value === filters.category)
                          ?.label
                      }
                    </span>
                  )}
                  {filters.epoch && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {EPOCHS.find((e) => e.value === filters.epoch)?.label}
                    </span>
                  )}
                  {filters.type && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {
                        EXERCISE_TYPES.find((t) => t.value === filters.type)
                          ?.label
                      }
                    </span>
                  )}
                  {selectedDifficulties.length > 0 && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                      Trudność: {selectedDifficulties.join(", ")}⭐
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onStart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Award className="w-5 h-5" />
            Rozpocznij sesję
          </button>
        </div>
      </div>
    </div>
  );
};
