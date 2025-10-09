// frontend/src/components/AiPointsWidget.tsx

import { useQuery } from "@tanstack/react-query";
import {
  Zap,
  Crown,
  TrendingUp,
  Lock,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

export const AiPointsWidget = () => {
  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
  });

  if (!subscription) return null;

  const isPremium = subscription.plan === "PREMIUM";

  // ========== DLA FREE - ZACHĘTA DO PREMIUM ==========
  if (!isPremium) {
    return (
      <Link
        to="/subscription"
        className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700 hover:shadow-lg transition-all"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
            <Lock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                Brak subskrypcji
              </span>
              <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs rounded-full text-gray-700 dark:text-gray-300">
                FREE
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Odblokuj pełną moc AI
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
            <Crown className="w-3 h-3 text-yellow-500" />
            <span>200 punktów AI miesięcznie</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Szczegółowy feedback AI</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
            <TrendingUp className="w-3 h-3 text-yellow-500" />
            <span>Zaawansowane analizy</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            39 zł/miesiąc
          </span>
        </div>
      </Link>
    );
  }

  // ========== DLA PREMIUM - STATUS PUNKTÓW ==========
  const percentUsed = Math.round(
    (subscription.aiPointsUsed / subscription.aiPointsLimit) * 100
  );
  const remaining = subscription.aiPointsLimit - subscription.aiPointsUsed;
  const isLow = percentUsed >= 90; // Niskie punkty = 90%+ wykorzystane

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
      className={`block p-3 rounded-lg border transition-all ${
        isLow
          ? "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-700 hover:shadow-lg"
          : "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isLow ? (
            <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
          ) : (
            <Zap className="w-4 h-4 text-yellow-500" />
          )}
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Punkty AI
          </span>
        </div>
        <Crown className="w-4 h-4 text-yellow-500" />
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

      {isLow && (
        <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/40 border-2 border-red-300 dark:border-red-600 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <p className="text-xs font-bold text-red-900 dark:text-red-100">
              Doładuj punkty AI
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <ShoppingCart className="w-3 h-3" />
              <span>Zamów teraz</span>
            </div>
          </div>
        </div>
      )}

      {!isLow && percentUsed >= 70 && (
        <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded text-xs">
          <p className="text-orange-800 dark:text-orange-200">
            Zostało {remaining} pkt
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Reset:{" "}
            {new Date(subscription.resetDate).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
      )}
    </Link>
  );
};
