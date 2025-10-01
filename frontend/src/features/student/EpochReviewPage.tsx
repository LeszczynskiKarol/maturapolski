// frontend/src/features/student/EpochReviewPage.tsx

import React from "react";
import { EpochReview } from "./EpochReview";
import { BookOpen } from "lucide-react";

export const EpochReviewPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Powtórki z epok literackich
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Wybierz epokę, którą chcesz powtórzyć. System przygotuje dla
              Ciebie sesję zadań z wybranego okresu.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <EpochReview />
    </div>
  );
};
