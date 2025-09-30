// frontend/src/components/AiPointsWidget.tsx

import { useQuery } from "@tanstack/react-query";
import { Zap, AlertCircle, Crown } from "lucide-react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

export const AiPointsWidget = () => {
  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
    // USUNIĘTE: refetchInterval: 30000
    // Punkty będą się aktualizować natychmiast po mutacjach (invalidateQueries)
  });

  if (!subscription) return null;

  const percentUsed = Math.round(
    (subscription.aiPointsUsed / subscription.aiPointsLimit) * 100
  );

  const remaining = subscription.aiPointsLimit - subscription.aiPointsUsed;
  const isPremium = subscription.plan === "PREMIUM";

  // Kolory w zależności od wykorzystania
  const getColor = () => {
    if (percentUsed >= 90) return "text-red-600 dark:text-red-400";
    if (percentUsed >= 70) return "text-orange-600 dark:text-orange-400";
    return "text-green-600 dark:text-green-400";
  };

  const getBarColor = () => {
    if (percentUsed >= 90) return "bg-red-500";
    if (percentUsed >= 70) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <Link
      to="/subscription"
      className="block p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Punkty AI
          </span>
        </div>
        {isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-2xl font-bold ${getColor()}`}>{remaining}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          / {subscription.aiPointsLimit}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
        <div
          className={`h-full rounded-full transition-all ${getBarColor()}`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>

      {percentUsed >= 80 && !isPremium && (
        <div className="flex items-start gap-1 mt-2 text-xs text-orange-800 dark:text-orange-200">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>Wkrótce wyczerpiesz punkty</span>
        </div>
      )}

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
        Kliknij aby zarządzać
      </p>
    </Link>
  );
};
