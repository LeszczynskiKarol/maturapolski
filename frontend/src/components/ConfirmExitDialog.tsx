// frontend/src/components/ConfirmExitDialog.tsx

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmExitDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  sessionStats: {
    completed: number;
    correct: number;
    points: number;
  };
  isSessionComplete?: boolean;
}

export const ConfirmExitDialog: React.FC<ConfirmExitDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  sessionStats,
  isSessionComplete = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onCancel}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                {isSessionComplete
                  ? "Gratulacje! Sesja ukończona!"
                  : "Zakończyć sesję nauki?"}
              </h3>

              {/* Description */}
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                {isSessionComplete
                  ? `Świetna robota! Ukończyłeś wszystkie ${sessionStats.completed} zadań w tej sesji.`
                  : "Masz niezakończoną sesję. Jeśli wyjdziesz teraz, Twoje postępy zostaną zapisane, ale sesja zostanie automatycznie zakończona."}
              </p>

              {/* Stats Summary */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Obecny postęp sesji:
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {sessionStats.completed}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      zadań
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {sessionStats.correct}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      poprawnych
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {sessionStats.points}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      punktów
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
           rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
                >
                  {isSessionComplete ? "Nowa sesja" : "Kontynuuj sesję"}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 
           font-medium transition-colors"
                >
                  {isSessionComplete
                    ? "Zakończ i zobacz wyniki"
                    : "Zakończ i wyjdź"}
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                         transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
