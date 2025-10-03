// frontend/src/features/subscription/SubscriptionDashboard.tsx

import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  CreditCard,
  Crown,
  ExternalLink,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";

interface SubscriptionStatus {
  plan: "FREE" | "PREMIUM";
  status: string;
  aiPointsUsed: number;
  aiPointsLimit: number;
  percentUsed: number;
  resetDate: string;
  cancelAt?: string;
  endDate?: string;
}

interface PointsPackage {
  id: string;
  name: string;
  points: number;
  price: number;
  pricePerPoint: number;
  description: string;
  badge?: string;
}

export const SubscriptionDashboard: React.FC = () => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sprawdź czy wróciliśmy z Stripe
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const pointsAdded = searchParams.get("points_added");

    if (sessionId) {
      api
        .get(`/api/subscription/verify-session/${sessionId}`)
        .then(() => {
          toast.success("Płatność zakończona pomyślnie!");
          refetch();
          refetchAiUsage();
          navigate("/subscription", { replace: true });
        })
        .catch((error) => {
          toast.error("Błąd weryfikacji płatności");
          console.error(error);
        });
    } else if (pointsAdded) {
      toast.success("Punkty AI zostały doładowane!");
      refetch();
      navigate("/subscription", { replace: true });
    }
  }, [searchParams]);

  const { data: subscription, refetch } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () =>
      api
        .get("/api/subscription/status")
        .then((r) => r.data as SubscriptionStatus),
  });

  const { data: aiUsage, refetch: refetchAiUsage } = useQuery({
    queryKey: ["ai-usage"],
    queryFn: () => api.get("/api/subscription/ai-usage").then((r) => r.data),
  });

  const { data: pointsPackages } = useQuery<PointsPackage[]>({
    queryKey: ["points-packages"],
    queryFn: () =>
      api.get("/api/subscription/points-packages").then((r) => r.data),
  });

  const upgradeMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/api/subscription/create-checkout", {
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID_PREMIUM,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "Błąd podczas tworzenia płatności"
      );
    },
  });

  const buyPointsMutation = useMutation({
    mutationFn: async (packageId: string) => {
      const { data } = await api.post("/api/subscription/buy-points", {
        pointsPackage: packageId,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Błąd podczas zakupu punktów");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => api.post("/api/subscription/cancel"),
    onSuccess: () => {
      toast.success(
        "Subskrypcja zostanie anulowana na koniec okresu rozliczeniowego"
      );
      refetch();
    },
  });

  const resumeMutation = useMutation({
    mutationFn: () => api.post("/api/subscription/resume"),
    onSuccess: () => {
      toast.success("Subskrypcja została wznowiona");
      refetch();
    },
  });

  const hasManyPoints =
    subscription &&
    subscription.aiPointsLimit - subscription.aiPointsUsed > 100;

  const openPortalMutation = useMutation({
    mutationFn: () => api.post("/api/subscription/create-portal-session"),
    onSuccess: (response: any) => {
      window.location.href = response.data.url;
    },
  });

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      await upgradeMutation.mutateAsync();
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleBuyPoints = async (packageId: string) => {
    try {
      await buyPointsMutation.mutateAsync(packageId);
    } catch (error) {
      console.error("Error buying points:", error);
    }
  };

  if (!subscription) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const isPremium = subscription.plan === "PREMIUM";
  const isCanceled =
    subscription.status === "CANCELED" || subscription.cancelAt;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 
                             hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Powrót
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Subskrypcja
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Zarządzaj swoim planem i punktami AI
          </p>
        </div>

        {isPremium && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Premium</span>
          </div>
        )}
      </div>
      {/* ALERT dla niskich punktów - NOWY */}
      {isPremium && subscription.percentUsed >= 90 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                Punkty AI prawie wyczerpane!
              </h3>
              <p className="text-white/90 mb-4">
                Zostało tylko{" "}
                {subscription.aiPointsLimit - subscription.aiPointsUsed}{" "}
                punktów. Dokup pakiet aby kontynuować korzystanie z oceny AI dla
                zadań pisemnych.
              </p>
              <button
                onClick={() => {
                  document
                    .getElementById("buy-points-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Dokup punkty teraz
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Current Plan Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 ${
          isPremium
            ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        }`}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {isPremium ? "Plan Premium" : "Plan Free"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isPremium
                ? "Pełen dostęp do wszystkich funkcji AI"
                : "Ograniczony dostęp do funkcji AI"}
            </p>
          </div>

          {isPremium ? (
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                49 zł
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                /miesiąc
              </p>
            </div>
          ) : (
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                0 zł
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">zawsze</p>
            </div>
          )}
        </div>

        {/* AI Points Progress */}
        {isPremium && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Punkty AI
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {subscription.aiPointsUsed} / {subscription.aiPointsLimit} (
                {subscription.percentUsed}%)
              </span>
            </div>

            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  subscription.percentUsed > 90
                    ? "bg-red-500"
                    : subscription.percentUsed > 70
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${subscription.percentUsed}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
              <span>
                Pozostało:{" "}
                {subscription.aiPointsLimit - subscription.aiPointsUsed} punktów
              </span>
              <span>
                Reset:{" "}
                {new Date(subscription.resetDate).toLocaleDateString("pl-PL")}
              </span>
            </div>
          </div>
        )}
        {/* Co dają punkty */}
        {isPremium && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Krótkie odpowiedzi
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                1 pkt
              </p>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Notatki
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                1 pkt
              </p>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Wypracowania
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                3 pkt
              </p>
            </div>
          </div>
        )}

        {/* Warnings */}
        {subscription.percentUsed > 80 && !isPremium && (
          <div className="p-4 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                  Wkrótce wyczerpiesz punkty AI
                </p>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Pozostało tylko{" "}
                  {subscription.aiPointsLimit - subscription.aiPointsUsed}{" "}
                  punktów. Rozważ upgrade do Premium lub kup dodatkowe punkty.
                </p>
              </div>
            </div>
          </div>
        )}

        {isCanceled && (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Subskrypcja zostanie anulowana
                </p>
                <p className="text-sm text-red-800 dark:text-red-200">
                  Dostęp do Premium wygaśnie{" "}
                  {new Date(subscription.cancelAt!).toLocaleDateString("pl-PL")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!isPremium ? (
            <button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white rounded-lg hover:from-blue-700 hover:to-purple-700 
                       font-semibold flex items-center justify-center gap-2
                       disabled:opacity-50 transition-all"
            >
              {isUpgrading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Ulepsz do Premium
                </>
              )}
            </button>
          ) : (
            <>
              {isCanceled ? (
                <button
                  onClick={() => resumeMutation.mutate()}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg 
                           hover:bg-green-700 font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Wznów subskrypcję
                </button>
              ) : (
                <button
                  onClick={() => cancelMutation.mutate()}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 
                           text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 
                           dark:hover:bg-gray-700 font-semibold"
                >
                  Anuluj subskrypcję
                </button>
              )}

              <button
                onClick={() => openPortalMutation.mutate()}
                className="flex-1 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white 
                         rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 font-semibold 
                         flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Zarządzaj płatnościami
                <ExternalLink className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Pakiety punktów - TYLKO DLA PREMIUM */}
      {isPremium && (
        <div
          id="buy-points-section"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Kup dodatkowe punkty AI
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Potrzebujesz więcej punktów? Kup jednorazowy pakiet bez zobowiązań.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {pointsPackages?.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ scale: 1.02 }}
                className={`relative p-6 rounded-xl border-2 ${
                  pkg.badge
                    ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {pkg.badge}
                  </div>
                )}

                <div className="text-center mb-4">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {pkg.description}
                  </p>
                </div>

                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {pkg.points}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    punktów AI
                  </p>
                </div>

                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {pkg.price} zł
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    ({pkg.pricePerPoint.toFixed(2)} zł/punkt)
                  </p>
                </div>

                <button
                  onClick={() => handleBuyPoints(pkg.id)}
                  disabled={buyPointsMutation.isPending}
                  className={`w-full px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    pkg.badge
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
                  } disabled:opacity-50 transition-colors`}
                >
                  {buyPointsMutation.isPending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Kup teraz
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/*<div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-semibold mb-1">Masz już Plan Premium!</p>
                <p>
                  Te pakiety są opcjonalne - możesz je kupić jeśli potrzebujesz
                  dodatkowych punktów ponad miesięczny limit 300 pkt.
                </p>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          {aiUsage && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Statystyki użycia AI
              </h3>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {aiUsage.usage.totalCalls}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Wywołań AI
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {aiUsage.usage.totalPoints}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Punktów użytych
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {aiUsage.usage.byType.SHORT_ANSWER}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Krótkie odp.
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {aiUsage.usage.byType.ESSAY}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Wypracowania
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  Ostatnie użycia AI
                </h4>
                <div className="space-y-2">
                  {aiUsage.recentUsage.slice(0, 5).map((usage: any) => (
                    <div
                      key={usage.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {usage.exerciseType}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>{usage.pointsCost} pkt</span>
                        <span>
                          {new Date(usage.createdAt).toLocaleString("pl-PL")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Benefits comparison */}
      {!isPremium && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Dlaczego Premium?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  300 punktów AI miesięcznie
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  15x więcej niż w planie Free
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Nieograniczone zadania zamknięte
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bez kosztów punktów
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Szczegółowy feedback AI
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dla wszystkich typów zadań
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Priorytetowe wsparcie
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Szybsza pomoc techniczna
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
