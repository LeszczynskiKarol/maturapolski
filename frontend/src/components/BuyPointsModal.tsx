// frontend/src/components/BuyPointsModal.tsx

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { X, Zap, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

interface BuyPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Package {
  id: "SMALL" | "MEDIUM" | "LARGE";
  name: string;
  points: number;
  price: number;
  pricePerPoint: number;
  description: string;
  badge?: string;
}

export const BuyPointsModal: React.FC<BuyPointsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Pobierz dostępne pakiety
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["points-packages"],
    queryFn: () =>
      api.get("/api/subscription/points-packages").then((r) => r.data),
    enabled: isOpen,
  });

  // Mutation do zakupu
  const buyMutation = useMutation({
    mutationFn: async (packageId: string) => {
      const { data } = await api.post("/api/subscription/buy-points", {
        pointsPackage: packageId,
      });
      return data;
    },
    onSuccess: async (data) => {
      const stripe = await stripePromise;
      if (stripe && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Błąd podczas zakupu punktów");
    },
  });

  const handleBuy = (packageId: string) => {
    buyMutation.mutate(packageId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Doładuj punkty AI
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Wybierz pakiet punktów i kontynuuj naukę
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {packages?.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative border-2 rounded-xl p-6 transition-all cursor-pointer ${
                    selectedPackage === pkg.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-6 h-6 text-yellow-500" />
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {pkg.points}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      punktów AI
                    </p>
                  </div>

                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {pkg.price} zł
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {pkg.pricePerPoint.toFixed(2)} zł/punkt
                    </p>
                  </div>

                  {selectedPackage === pkg.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Buy Button */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 
                       text-gray-700 dark:text-gray-300 rounded-lg 
                       hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
            >
              Anuluj
            </button>
            <button
              onClick={() => selectedPackage && handleBuy(selectedPackage)}
              disabled={!selectedPackage || buyMutation.isPending}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white rounded-lg hover:from-blue-700 hover:to-purple-700 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       font-semibold flex items-center gap-2"
            >
              {buyMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Przekierowywanie...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Kup punkty
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
