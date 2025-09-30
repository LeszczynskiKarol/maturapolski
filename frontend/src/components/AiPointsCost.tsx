// frontend/src/components/AiPointsCost.tsx

import { Zap, AlertTriangle } from "lucide-react";

interface AiPointsCostProps {
  exerciseType: string;
  hasEnoughPoints: boolean;
}

export const AiPointsCost: React.FC<AiPointsCostProps> = ({
  exerciseType,
  hasEnoughPoints,
}) => {
  const getCost = () => {
    switch (exerciseType) {
      case "CLOSED_SINGLE":
      case "CLOSED_MULTIPLE":
        return 0; // Zadania zamknięte nie kosztują punktów
      case "SHORT_ANSWER":
      case "SYNTHESIS_NOTE":
        return 1;
      case "ESSAY":
        return 3;
      default:
        return 1;
    }
  };

  const cost = getCost();

  if (cost === 0) return null; // Nie pokazuj dla zadań zamkniętych

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
        hasEnoughPoints
          ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
      }`}
    >
      {hasEnoughPoints ? (
        <Zap className="w-4 h-4 text-yellow-500" />
      ) : (
        <AlertTriangle className="w-4 h-4 text-red-500" />
      )}
      <span
        className={`text-sm font-medium ${
          hasEnoughPoints
            ? "text-blue-900 dark:text-blue-100"
            : "text-red-900 dark:text-red-100"
        }`}
      >
        {hasEnoughPoints
          ? `Ocena AI: ${cost} ${cost === 1 ? "punkt" : "punkty"}`
          : `Brak punktów! Potrzebujesz ${cost} ${
              cost === 1 ? "punktu" : "punktów"
            }`}
      </span>
    </div>
  );
};
