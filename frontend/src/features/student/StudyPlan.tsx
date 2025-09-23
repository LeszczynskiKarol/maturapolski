// frontend/src/features/student/StudyPlan.tsx

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
  Calendar,
  Clock,
  Target,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Award,
  TrendingUp,
  AlertCircle,
  Settings,
  Play,
  Lock,
  CheckSquare,
  Circle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, differenceInDays, addDays } from "date-fns";
import { pl } from "date-fns/locale";

interface WeekPlan {
  week: number;
  focus: string;
  goals: string[];
  exercises: any[];
  estimatedTime: number;
  completed?: boolean;
  completionRate?: number;
}

interface StudyPlanData {
  totalWeeks: number;
  currentWeek: number;
  plan: WeekPlan[];
  examDate?: string;
}

export const StudyPlan: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [examDate, setExamDate] = useState("");
  const queryClient = useQueryClient();

  // Fetch study plan
  const {
    data: plan,
    isLoading,
    error,
  } = useQuery<StudyPlanData>({
    queryKey: ["study-plan"],
    queryFn: async () => {
      try {
        const response = await api.get("/api/study/plan");
        return response.data;
      } catch (error: any) {
        // Jeśli 404, to po prostu zwróć null
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
  });

  const startWeekSession = async (weekNumber: number) => {
    try {
      console.log("=== START WEEK SESSION ===");
      console.log("Week number:", weekNumber);

      const week = plan?.plan.find((w: WeekPlan) => w.week === weekNumber);

      if (!week) {
        console.error("Week not found:", weekNumber);
        alert("Nie znaleziono danych tygodnia");
        return;
      }

      console.log("Found week data:", week);

      // Przygotuj filtry dla sesji
      const filters: any = {
        weekNumber: weekNumber, // Dodaj numer tygodnia do filtrów
      };

      // Rozszerzone mapowanie kategorii
      const focus = week.focus.toLowerCase();

      if (
        focus.includes("język") ||
        focus.includes("gramatyka") ||
        focus.includes("słownictwo")
      ) {
        filters.category = "LANGUAGE_USE";
      } else if (
        focus.includes("histor") ||
        focus.includes("literatur") ||
        focus.includes("epok")
      ) {
        filters.category = "HISTORICAL_LITERARY";
      } else if (
        focus.includes("pisanie") ||
        focus.includes("wypracowań") ||
        focus.includes("essay")
      ) {
        filters.category = "WRITING";
      } else if (
        focus.includes("powtórka") ||
        focus.includes("rewizja") ||
        focus.includes("podsumowanie")
      ) {
        // Dla powtórki - NIE ustawiaj kategorii, żeby były zadania ze wszystkich
        console.log("Powtórka materiału - wszystkie kategorie");
        // Możesz opcjonalnie dodać wszystkie kategorie lub zostawić puste
      } else {
        // Domyślnie dla innych - może rotacja kategorii?
        const categories = ["LANGUAGE_USE", "HISTORICAL_LITERARY", "WRITING"];
        filters.category = categories[weekNumber % 3];
        console.log("Domyślna kategoria:", filters.category);
      }

      // Dodaj epokę dla testów historycznoliterackich
      if (
        filters.category === "HISTORICAL_LITERARY" &&
        week.goals &&
        week.goals.length > 0
      ) {
        const epochMap: Record<string, string> = {
          starożytność: "ANTIQUITY",
          średniowiecze: "MIDDLE_AGES",
          renesans: "RENAISSANCE",
          barok: "BAROQUE",
          oświecenie: "ENLIGHTENMENT",
          romantyzm: "ROMANTICISM",
          pozytywizm: "POSITIVISM",
          "młoda polska": "YOUNG_POLAND",
          dwudziestolecie: "INTERWAR",
          współczesność: "CONTEMPORARY",
        };

        // Sprawdź w celach i fokusie
        const textToCheck = [...week.goals, week.focus].join(" ").toLowerCase();

        for (const [epochName, epochCode] of Object.entries(epochMap)) {
          if (textToCheck.includes(epochName)) {
            filters.epoch = epochCode;
            console.log("Znaleziono epokę:", epochCode);
            break;
          }
        }
      }

      // Ustaw poziomy trudności - dla powtórki wszystkie, dla reszty progresywnie
      if (focus.includes("powtórka")) {
        // Dla powtórki - wszystkie poziomy trudności
        filters.difficulty = [1, 2, 3, 4, 5];
      } else {
        // Progresywny wzrost trudności
        const baseDifficulty = Math.min(5, Math.ceil(weekNumber / 4));
        const maxDifficulty = Math.min(5, baseDifficulty + 1);

        // Zakres trudności np. [2,3] dla tygodnia 5-8
        filters.difficulty = [];
        for (let i = Math.max(1, baseDifficulty - 1); i <= maxDifficulty; i++) {
          filters.difficulty.push(i);
        }
      }

      console.log("Generated filters:", filters);
      console.log("Category:", filters.category || "ALL");
      console.log("Difficulty levels:", filters.difficulty);

      // Zapisz do localStorage
      const filtersJson = JSON.stringify(filters);
      localStorage.setItem("sessionFilters", filtersJson);

      // Weryfikuj zapis
      const saved = localStorage.getItem("sessionFilters");
      console.log("Saved to localStorage:", saved);

      if (!saved) {
        console.error("localStorage save failed!");
        alert("Błąd przy zapisywaniu filtrów sesji");
        return;
      }

      // Nawigacja do /learn
      console.log("Navigating to /learn...");
      setTimeout(() => {
        navigate("/learn");
      }, 50);
    } catch (error) {
      console.error("Error starting week session:", error);
      alert("Nie udało się rozpocząć sesji");
    }
  };

  // Initialize examDate when plan data is loaded
  useEffect(() => {
    if (plan?.examDate) {
      // Format date to YYYY-MM-DD for input field
      const date = new Date(plan.examDate);
      const formattedDate = date.toISOString().split("T")[0];
      setExamDate(formattedDate);
    }
  }, [plan]);

  // Fetch weekly tasks
  const { data: weeklyTasks } = useQuery({
    queryKey: ["weekly-tasks", selectedWeek],
    queryFn: () =>
      api
        .get(`/api/study/weekly-tasks?week=${selectedWeek}`)
        .then((r) => r.data),
    enabled: !!selectedWeek,
  });

  // Update exam date mutation
  const updateExamDate = useMutation({
    mutationFn: async (date: string) => {
      console.log("Sending exam date:", date);
      const response = await api.put("/api/study/exam-date", {
        examDate: date,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-plan"] });
      setShowSettings(false);
    },
    onError: (error: any) => {
      console.error("Error updating exam date:", error);
      alert("Błąd podczas zapisywania daty egzaminu. Spróbuj ponownie.");
    },
  });

  // Mark week as completed
  const completeWeek = useMutation({
    mutationFn: (week: number) =>
      api.post("/api/study/complete-week", { week }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-plan"] });
    },
  });

  // Handle form submission
  const handleSaveExamDate = () => {
    if (!examDate) {
      alert("Proszę wybrać datę egzaminu");
      return;
    }

    // Check if date is in the future
    const selectedDate = new Date(examDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Data egzaminu musi być w przyszłości");
      return;
    }

    updateExamDate.mutate(examDate);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Brak planu nauki</h3>
          <p className="text-gray-500 mb-6">
            Ustaw datę egzaminu, aby wygenerować spersonalizowany plan nauki
          </p>
          <button
            onClick={() => setShowSettings(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Ustaw datę egzaminu
          </button>
        </div>

        {/* Settings Modal for new users */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">
                  Ustawienia planu nauki
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data egzaminu maturalnego
                    </label>
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Po ustawieniu daty egzaminu zostanie wygenerowany
                      spersonalizowany plan nauki dostosowany do Twoich słabych
                      punktów i pozostałego czasu.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Anuluj
                    </button>
                    <button
                      onClick={handleSaveExamDate}
                      disabled={!examDate || updateExamDate.isPending}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updateExamDate.isPending ? "Zapisywanie..." : "Zapisz"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const currentWeekData = plan.plan.find((w) => w.week === plan.currentWeek);
  const daysToExam = plan.examDate
    ? differenceInDays(new Date(plan.examDate), new Date())
    : null;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Plan nauki do matury</h2>
            <p className="text-blue-100 mb-4">
              Spersonalizowany harmonogram przygotowań
            </p>

            <div className="flex gap-6">
              <div>
                <p className="text-sm text-blue-100">Data egzaminu</p>
                <p className="text-lg font-semibold">
                  {plan.examDate
                    ? format(new Date(plan.examDate), "d MMMM yyyy", {
                        locale: pl,
                      })
                    : "Nie ustawiono"}
                </p>
              </div>
              {daysToExam !== null && (
                <div>
                  <p className="text-sm text-blue-100">Pozostało dni</p>
                  <p className="text-2xl font-bold">{daysToExam}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-blue-100">Obecny tydzień</p>
                <p className="text-lg font-semibold">
                  {plan.currentWeek} z {plan.totalWeeks}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Postęp ogólny</span>
            <span>
              {Math.round((plan.currentWeek / plan.totalWeeks) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{
                width: `${(plan.currentWeek / plan.totalWeeks) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Current Week Focus */}
      {currentWeekData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
               rounded-xl border border-blue-200 dark:border-blue-800 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Ten tydzień: {currentWeekData.focus}
            </h3>
            <span
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 
                       rounded-full text-sm font-medium"
            >
              Tydzień {plan.currentWeek}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                Cele tygodnia:
              </h4>
              <ul className="space-y-2">
                {currentWeekData.goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                Statystyki:
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Szacowany czas: {currentWeekData.estimatedTime} godzin
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Zadania do wykonania:{" "}
                    {currentWeekData.exercises?.length || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Ukończono: {currentWeekData.completionRate || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const weekToStart = plan.currentWeek; // UŻYJ CURRENT WEEK!
              console.log("Starting session for current week:", weekToStart);
              startWeekSession(weekToStart);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Rozpocznij naukę
          </button>
        </motion.div>
      )}

      {/* Weekly Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Harmonogram tygodniowy
        </h3>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {plan.plan.map((week, index) => {
            const isCurrentWeek = week.week === plan.currentWeek;
            const isPastWeek = week.week < plan.currentWeek;
            const isFutureWeek = week.week > plan.currentWeek;

            return (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
            flex items-center justify-between p-4 rounded-lg cursor-pointer
            transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-900/30
            ${
              isCurrentWeek
                ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-600"
                : ""
            }
            ${
              isPastWeek
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700"
                : ""
            }
            ${
              isFutureWeek
                ? "bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700"
                : ""
            }
          `}
                onClick={() => setSelectedWeek(week.week)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                w-10 h-10 rounded-full flex items-center justify-center
                text-sm font-bold transition-colors
                ${
                  isCurrentWeek ? "bg-blue-600 dark:bg-blue-500 text-white" : ""
                }
                ${isPastWeek ? "bg-green-600 dark:bg-green-500 text-white" : ""}
                ${
                  isFutureWeek
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                    : ""
                }
              `}
                  >
                    {week.week}
                  </div>

                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {week.focus}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {week.estimatedTime}h nauki •{" "}
                      {week.exercises?.length || 0} zadań
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {week.completed && (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                  {isCurrentWeek && (
                    <span
                      className="px-2 py-1 bg-blue-600 dark:bg-blue-500 text-white 
                             rounded text-xs font-medium"
                    >
                      Obecny
                    </span>
                  )}
                  {isFutureWeek && (
                    <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weekly Tasks Modal */}
      <AnimatePresence>
        {selectedWeek && weeklyTasks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedWeek(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Tydzień {selectedWeek}: {weeklyTasks.focus}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {weeklyTasks.exercises?.length || 0} zadań •{" "}
                      {weeklyTasks.estimatedTime}h
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedWeek(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg 
                         text-gray-700 dark:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                    Cele tygodnia:
                  </h4>
                  <div className="space-y-2">
                    {weeklyTasks.goals?.map((goal: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {goal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                    Zadania do wykonania:
                  </h4>
                  <div className="space-y-2">
                    {weeklyTasks.exercises?.map((exercise: any) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between p-3 border dark:border-gray-700 
                             rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <div className="flex items-center gap-3">
                          {exercise.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {exercise.question}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {exercise.category} • {exercise.difficulty}
                            </p>
                          </div>
                        </div>
                        {exercise.score && (
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {exercise.score}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedWeek === plan.currentWeek && (
                  <button
                    onClick={() => completeWeek.mutate(selectedWeek)}
                    className="mt-6 w-full px-4 py-3 bg-green-600 dark:bg-green-500 text-white 
                         rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Oznacz tydzień jako ukończony
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Ustawienia planu nauki
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data egzaminu maturalnego
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                         rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                         focus:outline-none bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Po ustawieniu daty egzaminu zostanie wygenerowany
                    spersonalizowany plan nauki dostosowany do Twoich słabych
                    punktów i pozostałego czasu.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                         rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                         text-gray-700 dark:text-gray-300"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={handleSaveExamDate}
                    disabled={!examDate || updateExamDate.isPending}
                    className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white 
                         rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateExamDate.isPending ? "Zapisywanie..." : "Zapisz"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
