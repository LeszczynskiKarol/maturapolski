// frontend/src/components/AiPointsCost.tsx

import { Zap, AlertTriangle, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface AiPointsCostProps {
  exerciseType: string;
  hasEnoughPoints: boolean;
  isPremium?: boolean;
}

export const AiPointsCost: React.FC<AiPointsCostProps> = ({
  exerciseType,
  hasEnoughPoints,
  isPremium = false,
}) => {
  const getCost = () => {
    switch (exerciseType) {
      case "CLOSED_SINGLE":
      case "CLOSED_MULTIPLE":
        return 0;
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

  if (cost === 0) return null;

  // Gdy NIE MA punktów
  if (!hasEnoughPoints) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-start gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-900 dark:text-red-100 mb-1">
              Brak punktów AI!
            </p>
            <p className="text-xs text-red-800 dark:text-red-200">
              Potrzebujesz {cost} {cost === 1 ? "punktu" : "punktów"} aby
              otrzymać ocenę AI dla tego zadania.
            </p>
          </div>
        </div>

        <Link
          to="/subscription"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          {isPremium ? "Dokup punkty AI" : "Wykup subskrypcję Premium"}
        </Link>
      </div>
    );
  }

  // Gdy MA punkty - normalne info
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
      <Zap className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
        Ocena AI: {cost} {cost === 1 ? "punkt" : "punkty"}
      </span>
    </div>
  );
};
