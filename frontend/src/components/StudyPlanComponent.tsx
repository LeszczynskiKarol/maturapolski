// frontend/src/components/StudyPlanComponent.tsx
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Clock,
  Target,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { api } from "../services/api";

// TYPY
interface WeekPlan {
  week: number;
  focus: string;
  goals: string[];
  exercises: any[];
  estimatedTime: number;
  completed: boolean;
  completionRate?: number;
}

interface StudyPlan {
  totalWeeks: number;
  currentWeek: number;
  plan: WeekPlan[];
  examDate: string;
  daysUntilExam: number;
  weakPoints?: Array<{
    category: string;
    averageScore: number;
  }>;
}

interface WeeklyTasks {
  week: number;
  phase: string;
  intensity: string;
  focus: string;
  goals: string[];
  estimatedTime: number;
  exercises: Array<{
    id: string;
    question: string;
    type: string;
    points: number;
    difficulty: number;
    completed?: boolean;
    bestScore?: number | null;
  }>;
  statistics: {
    totalExercises: number;
    completedExercises: number;
    completionRate: number;
    averageScore: number;
  };
}

const StudyPlanComponent: React.FC = () => {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [weeklyTasks, setWeeklyTasks] = useState<WeeklyTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudyPlan();
  }, []);

  const fetchStudyPlan = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/study/plan");

      // ZOBACZ CO ZWRACA API!
      console.log("=== STUDY PLAN API RESPONSE ===");
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      console.log("Current week from API:", response.data?.currentWeek);

      const data = response.data as StudyPlan;

      if (!data.currentWeek) {
        console.error("NO CURRENT WEEK IN API RESPONSE!");
      }

      setPlan(data);

      // USTAW selectedWeek NA PEWNO
      const weekToSelect = data.currentWeek || 1;
      console.log("Setting selectedWeek to:", weekToSelect);
      setSelectedWeek(weekToSelect);

      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching study plan:", err);
      setError(
        err.response?.data?.message || "Nie udało się pobrać planu nauki"
      );
      setLoading(false);
    }
  };

  const fetchWeeklyTasks = async (week: number) => {
    try {
      const response = await api.get(
        `/api/study-plan/weekly-tasks?week=${week}`
      );
      setWeeklyTasks(response.data as WeeklyTasks);
    } catch (err) {
      console.error("Error fetching weekly tasks:", err);
    }
  };

  useEffect(() => {
    if (selectedWeek) {
      fetchWeeklyTasks(selectedWeek);
    }
  }, [selectedWeek]);

  const startWeekSession = async (week: number) => {
    console.log("=== START WEEK SESSION CLICKED ===");
    console.log("Week:", week);

    try {
      const url = "/api/study/start-week-session";
      console.log("Calling:", url);

      const response = await api.post(url, { week });

      console.log("Response received:", response);
      console.log("Response data:", response.data);

      if (response.data && response.data.filters) {
        console.log("Filters:", response.data.filters);
        localStorage.setItem(
          "sessionFilters",
          JSON.stringify(response.data.filters)
        );
        console.log("Filters saved to localStorage, redirecting...");
        window.location.href = "/learning";
      } else {
        console.error("No filters in response!");
        alert("Brak filtrów w odpowiedzi serwera");
      }
    } catch (err: any) {
      console.error("=== ERROR IN startWeekSession ===");
      console.error("Full error:", err);
      console.error("Response:", err.response);
      console.error("Response data:", err.response?.data);

      // Pokaż alert z dokładnym błędem
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Nieznany błąd";
      alert(
        `Błąd: ${errorMessage}\n\nStatus: ${
          err.response?.status || "brak"
        }\nURL: /api/study/start-week-session`
      );
    }
  };

  const getIntensityColor = (intensity: string) => {
    const colors: Record<string, string> = {
      LOW: "bg-green-100 text-green-800 border-green-300",
      MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-300",
      HIGH: "bg-orange-100 text-orange-800 border-orange-300",
      CRITICAL: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[intensity] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={fetchStudyPlan}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            Nie masz jeszcze planu nauki. Ustaw datę matury w ustawieniach.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Calendar className="w-5 h-5 mb-2" />
            <div className="text-3xl font-bold">{plan.daysUntilExam} dni</div>
            <div className="text-sm opacity-90">do matury</div>
          </div>
          <div>
            <Target className="w-5 h-5 mb-2" />
            <div className="text-3xl font-bold">
              {plan.currentWeek}/{plan.totalWeeks}
            </div>
            <div className="text-sm opacity-90">obecny tydzień</div>
          </div>
          <div>
            <Clock className="w-5 h-5 mb-2" />
            <div className="text-3xl font-bold">
              {plan.plan[plan.currentWeek - 1]?.estimatedTime || 0}h
            </div>
            <div className="text-sm opacity-90">w tym tygodniu</div>
          </div>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Plan Tygodniowy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {plan.plan.map((week) => (
            <div
              key={week.week}
              onClick={() => setSelectedWeek(week.week)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                ${
                  week.week === plan.currentWeek
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }
                ${week.week === selectedWeek ? "ring-2 ring-purple-500" : ""}
                hover:shadow-md`}
            >
              <div className="font-bold">Tydzień {week.week}</div>
              <div className="text-sm text-gray-600 mt-1">{week.focus}</div>
              <div className="text-xs text-gray-500 mt-2">
                {week.estimatedTime}h • {week.exercises.length} zadań
              </div>
              {week.completed && (
                <CheckCircle className="w-4 h-4 text-green-500 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Week Details */}
      {selectedWeek && weeklyTasks && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tydzień {selectedWeek}</h2>
            <button
              onClick={() => {
                console.log("Starting session for week:", selectedWeek);
                startWeekSession(selectedWeek);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Rozpocznij Naukę
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Cele:</h3>
              <ul className="space-y-1">
                {weeklyTasks.goals.map((goal, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    • {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Postęp:</h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${weeklyTasks.statistics.completionRate}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {weeklyTasks.statistics.completedExercises}/
                {weeklyTasks.statistics.totalExercises} zadań
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanComponent;
