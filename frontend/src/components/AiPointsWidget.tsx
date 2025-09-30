// frontend/src/components/AiPointsWidget.tsx

import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Zap, Crown } from "lucide-react";
import { useNavigate } from "react-router";

export const AiPointsWidget: React.FC = () => {
  const navigate = useNavigate();

  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
    refetchInterval: 30000, // Co 30 sekund
  });

  if (!subscription) return null;

  const isPremium = subscription.plan === "PREMIUM";
  const pointsLeft = subscription.aiPointsLimit - subscription.aiPointsUsed;
  const percentUsed = subscription.percentUsed;

  // Kolor w zależności od zużycia
  const getColor = () => {
    if (percentUsed >= 90) return "text-red-500 bg-red-50 dark:bg-red-900/20";
    if (percentUsed >= 70)
      return "text-orange-500 bg-orange-50 dark:bg-orange-900/20";
    return "text-green-500 bg-green-50 dark:bg-green-900/20";
  };

  return (
    <button
      onClick={() => navigate("/subscription")}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 ${getColor()}`}
      title="Kliknij aby zarządzać subskrypcją"
    >
      <Zap className="w-4 h-4" />
      <div className="text-left">
        <p className="text-xs font-medium leading-none">
          {pointsLeft} / {subscription.aiPointsLimit}
        </p>
        <p className="text-[10px] opacity-70">punktów AI</p>
      </div>
      {isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
    </button>
  );
};
