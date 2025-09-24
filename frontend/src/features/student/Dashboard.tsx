// frontend/src/features/student/Dashboard.tsx

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  TrendingUp,
  Target,
  Clock,
  Award,
  Calendar,
  FileText,
} from "lucide-react";
import { api } from "../../services/api";
import { StudyPlan } from "./StudyPlan";
import { WeakPointsAnalysis } from "./WeakPointsAnalysis";
import { ProgressTracker } from "./ProgressTracker";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-hot-toast";

export const StudentDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const { data: stats } = useQuery({
    queryKey: ["student-stats"],
    queryFn: () => api.get("/api/student/stats").then((r) => r.data),
  });

  const { data: progress } = useQuery({
    queryKey: ["student-progress"],
    queryFn: () => api.get("/api/student/progress").then((r) => r.data),
  });

  const { data: studyPlan } = useQuery({
    queryKey: ["study-plan"],
    queryFn: () => api.get("/api/study/plan").then((r) => r.data),
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Calendar}
          label="Dni do matury"
          value={stats?.daysToExam || "—"}
          subtitle={
            studyPlan?.examDate
              ? new Date(studyPlan.examDate).toLocaleDateString("pl-PL")
              : "Ustaw datę"
          }
          color="blue"
        />
        <StatCard
          icon={Target}
          label="Ukończone zadania"
          value={stats?.completedExercises || 0}
          subtitle={`z ${stats?.totalExercises || 0}`}
          color="green"
        />
        <StatCard
          icon={TrendingUp}
          label="Średni wynik"
          value={`${stats?.averageScore?.toFixed(0) || 0}%`}
          subtitle="Postęp"
          color="purple"
        />
        <StatCard
          icon={Award}
          label="Seria dni"
          value={stats?.studyStreak || 0}
          subtitle="dni z rzędu"
          color="orange"
        />
      </div>

      {/* Main Content - Study Plan takes full width */}
      <div className="space-y-6">
        {/* Enhanced Study Plan - Full Width */}
        <StudyPlan />

        {/* Two Column Layout for Analysis */}
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
