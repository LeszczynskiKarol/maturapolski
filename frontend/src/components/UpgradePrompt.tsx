// frontend/src/components/UpgradePrompt.tsx

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Crown, TrendingUp, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  pointsNeeded?: number;
  currentPoints?: number;
  totalPoints?: number;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  isOpen,
  onClose,
  pointsNeeded = 1,
  currentPoints = 0,
  totalPoints = 20,
}) => {
  const upgradeMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/api/subscription/create-checkout", {
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID_PREMIUM,
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
      toast.error(
        error.response?.data?.error || "Błąd podczas tworzenia płatności"
      );
    },
  });

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Brak punktów AI
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Masz tylko {currentPoints} z {totalPoints} punktów. To zadanie
                  wymaga {pointsNeeded}{" "}
                  {pointsNeeded === 1 ? "punktu" : "punktów"}.
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${(currentPoints / totalPoints) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  Wykorzystano {Math.round((currentPoints / totalPoints) * 100)}
                  % miesięcznego limitu
                </p>
              </div>

              {/* Premium benefits */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">Premium daje Ci:</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>300 punktów AI miesięcznie (15x więcej!)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>~240 krótkich odpowiedzi lub ~100 wypracowań</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Szczegółowy feedback AI dla wszystkich zadań</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Nieograniczone zadania zamknięte (bez kosztów)</span>
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    49 zł
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /miesiąc
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Anuluj w dowolnym momencie
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => upgradeMutation.mutate()}
                  disabled={upgradeMutation.isPending}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                           text-white rounded-lg hover:from-blue-700 hover:to-purple-700 
                           font-semibold flex items-center justify-center gap-2
                           disabled:opacity-50 transition-all"
                >
                  {upgradeMutation.isPending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      Ulepsz do Premium
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 
                           text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 
                           dark:hover:bg-gray-700 font-semibold transition-colors"
                >
                  Może później
                </button>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                💡 Zadania zamknięte (test, wielokrotny wybór) nie kosztują
                punktów AI
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
