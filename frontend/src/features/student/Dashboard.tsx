// frontend/src/features/student/Dashboard.tsx - ZAKTUALIZOWANA WERSJA

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { StudyPlan } from "./StudyPlan";
import { WeakPointsAnalysis } from "./WeakPointsAnalysis";
import { DifficultyProgress } from "../../components/DifficultyProgress";
import { EpochReview } from "./EpochReview";
import { Calendar, BookOpen } from "lucide-react";

export const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"plan" | "review">("plan");

  const { data: stats } = useQuery({
    queryKey: ["student-stats"],
    queryFn: () => api.get("/api/student/stats").then((r) => r.data),
  });

  const { data: progress } = useQuery({
    queryKey: ["student-progress"],
    queryFn: () => api.get("/api/student/progress").then((r) => r.data),
  });

  return (
    <div className="p-6 space-y-6">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Tabs for Plan vs Review */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === "plan"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Calendar className="w-5 h-5" />
              Plan Tygodniowy
            </button>
            <button
              onClick={() => setActiveTab("review")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === "review"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Powtórki z Epok
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "plan" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StudyPlan />
            </div>
            <div>
              <DifficultyProgress />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EpochReview />
            </div>
            <div>
              <DifficultyProgress />
            </div>
          </div>
        )}

        {/* Two Column Layout for Analysis - pokazujemy zawsze */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeakPointsAnalysis weakPoints={stats?.weakPoints} />

          {/* Quick Progress Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Szybki przegląd postępów
            </h3>
            <div className="space-y-4">
              {progress?.categoryProgress?.map((cat: any) => (
                <div
                  key={cat.category}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {cat.category}
                    </p>
                    <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (cat.completed_exercises / cat.total_exercises) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                    {cat.completed_exercises}/{cat.total_exercises}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => (window.location.href = "/progress")}
              className="mt-4 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Zobacz szczegółowe statystyki →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: any;
  label: string;
  value: string | number;
  subtitle: string;
  color: string;
}> = ({ icon: Icon, label, value, subtitle, color }) => {
  const colors: Record<string, { light: string; dark: string }> = {
    blue: {
      light: "bg-blue-50 text-blue-600",
      dark: "dark:bg-blue-900/20 dark:text-blue-400",
    },
    green: {
      light: "bg-green-50 text-green-600",
      dark: "dark:bg-green-900/20 dark:text-green-400",
    },
    purple: {
      light: "bg-purple-50 text-purple-600",
      dark: "dark:bg-purple-900/20 dark:text-purple-400",
    },
    orange: {
      light: "bg-orange-50 text-orange-600",
      dark: "dark:bg-orange-900/20 dark:text-orange-400",
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20 p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${colors[color].light} ${colors[color].dark}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
        {subtitle}
      </div>
    </div>
  );
};
