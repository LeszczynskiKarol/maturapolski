// frontend/src/components/PaymentHistory.tsx

import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  CreditCard,
  Download,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface Payment {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: number;
  currency: string;
  status: string;
  receiptUrl?: string | null;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  const [showAll, setShowAll] = useState(false);
  // ✅ Pokaż tylko 3 pierwsze jeśli showAll = false
  const displayedPayments = showAll ? payments : payments.slice(0, 3);
  const hasMore = payments.length > 3;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SUBSCRIPTION":
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "MONTHLY_ACCESS":
        return <Calendar className="w-5 h-5 text-green-600" />;
      case "POINTS_PURCHASE":
        return <Sparkles className="w-5 h-5 text-yellow-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      SUBSCRIPTION: {
        label: "Subskrypcja",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      MONTHLY_ACCESS: {
        label: "30 dni",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      POINTS_PURCHASE: {
        label: "Punkty",
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
    };

    const badge = badges[type as keyof typeof badges] || {
      label: type,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${badge.color}`}
      >
        {badge.label}
      </span>
    );
  };

  if (payments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
        <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">
          Brak historii płatności
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Historia płatności
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Data
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Typ
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Opis
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Kwota
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              {/*<th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Akcje
              </th>*/}
            </tr>
          </thead>
          <tbody>
            {displayedPayments.map((payment, index) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(payment.date).toLocaleDateString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(payment.type)}
                    {getTypeBadge(payment.type)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {payment.description}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {payment.amount.toFixed(2)} {payment.currency}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Opłacone
                    </span>
                  </div>
                </td>
                {/*<td className="py-4 px-4">
                  <div className="flex items-center justify-center">
                    {payment.receiptUrl ? (
                      <a
                        href={payment.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Paragon
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </div>
                </td>*/}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {displayedPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getTypeIcon(payment.type)}
                {getTypeBadge(payment.type)}
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {payment.amount.toFixed(2)} {payment.currency}
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {payment.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                {new Date(payment.date).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Opłacone
                </span>
              </div>
              {payment.receiptUrl && (
                <a
                  href={payment.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Paragon
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ PRZYCISK "Pokaż więcej" */}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
                     hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg 
                     transition-colors flex items-center gap-2"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Pokaż mniej
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Pokaż więcej ({payments.length - 3} pozostałych)
              </>
            )}
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Łącznie płatności: {payments.length}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Suma: {payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}{" "}
            PLN
          </span>
        </div>
      </div>
    </div>
  );
};
