// frontend/src/components/ConfirmationModal.tsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Calendar, ArrowRight } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  currentEndDate?: string;
  newEndDate?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "warning" | "info" | "danger";
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  currentEndDate,
  newEndDate,
  confirmText = "Kontynuuj",
  cancelText = "Anuluj",
  type = "warning",
}) => {
  if (!isOpen) return null;

  const colors = {
    warning: {
      bg: "from-orange-500 to-red-500",
      icon: "text-orange-600",
      button: "bg-orange-600 hover:bg-orange-700",
    },
    info: {
      bg: "from-blue-500 to-purple-500",
      icon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    danger: {
      bg: "from-red-500 to-pink-500",
      icon: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
    },
  };

  const color = colors[type];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${color.bg} p-6 text-white`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>

            {/* Timeline visualization */}
            {currentEndDate && newEndDate && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        Obecny koniec dostępu
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {new Date(currentEndDate).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <ArrowRight className="w-6 h-6 text-blue-500 mx-4" />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        Nowy koniec dostępu
                      </p>
                    </div>
                    <p className="font-bold text-green-600 dark:text-green-400">
                      {new Date(newEndDate).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 
                         dark:hover:bg-gray-700 font-semibold transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 px-4 py-3 ${color.button} text-white rounded-lg 
                          font-semibold transition-colors`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
