// frontend/src/features/student/WorkReviewPage.tsx

import { BookOpen, ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { WorkReview } from "./WorkReview";

export const WorkReviewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
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

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Powtórki z lektur
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Wybierz lekturę, którą chcesz powtórzyć. System przygotuje dla
              Ciebie sesję zadań z wybranego dzieła.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <WorkReview />
    </div>
  );
};
