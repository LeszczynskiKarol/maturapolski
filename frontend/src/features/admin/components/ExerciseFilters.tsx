// frontend/src/features/admin/components/ExerciseFilters.tsx

import React from "react";
import { Search, Filter } from "lucide-react";

interface ExerciseFiltersProps {
  filters: {
    search: string;
    type: string;
    category: string;
    difficulty: string;
    epoch: string;
  };
  onFilterChange: (filters: any) => void;
}

export const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Szukaj po pytaniu lub tagach..."
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <select
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Wszystkie typy</option>
          <option value="CLOSED_SINGLE">Jednokrotny wybór</option>
          <option value="CLOSED_MULTIPLE">Wielokrotny wybór</option>
          <option value="SHORT_ANSWER">Krótka odpowiedź</option>
          <option value="SYNTHESIS_NOTE">Notatka syntetyczna</option>
          <option value="ESSAY">Wypracowanie</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Wszystkie kategorie</option>
          <option value="LANGUAGE_USE">Język w użyciu</option>
          <option value="HISTORICAL_LITERARY">Test historycznoliteracki</option>
          <option value="WRITING">Pisanie</option>
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) =>
            onFilterChange({ ...filters, difficulty: e.target.value })
          }
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Każda trudność</option>
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {"⭐".repeat(level)} {getDifficultyLabel(level)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const getDifficultyLabel = (level: number): string => {
  const labels: Record<number, string> = {
    1: "Bardzo łatwe",
    2: "Łatwe",
    3: "Średnie",
    4: "Trudne",
    5: "Bardzo trudne",
  };
  return labels[level] || "";
};
