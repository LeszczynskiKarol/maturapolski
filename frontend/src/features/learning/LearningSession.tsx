// frontend/src/features/learning/LearningSession.tsx

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Play,
  ChevronRight,
  Clock,
  Target,
  Brain,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  SkipForward,
  Trophy,
  AlertCircle,
  Filter,
  ChevronDown,
  X,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const SESSION_LIMIT = 20;

// Definicje typów dla filtrów
interface SessionFilters {
  type?: string;
  category?: string;
  epoch?: string;
  difficulty?: number[];
  points?: { min: number; max: number };
}

const EPOCHS = [
  { value: "ANTIQUITY", label: "Starożytność" },
  { value: "MIDDLE_AGES", label: "Średniowiecze" },
  { value: "RENAISSANCE", label: "Renesans" },
  { value: "BAROQUE", label: "Barok" },
  { value: "ENLIGHTENMENT", label: "Oświecenie" },
  { value: "ROMANTICISM", label: "Romantyzm" },
  { value: "POSITIVISM", label: "Pozytywizm" },
  { value: "YOUNG_POLAND", label: "Młoda Polska" },
  { value: "INTERWAR", label: "Dwudziestolecie międzywojenne" },
  { value: "CONTEMPORARY", label: "Współczesność" },
];

const EXERCISE_TYPES = [
  { value: "CLOSED_SINGLE", label: "Jednokrotny wybór", icon: "○" },
  { value: "CLOSED_MULTIPLE", label: "Wielokrotny wybór", icon: "☐" },
  { value: "SHORT_ANSWER", label: "Krótka odpowiedź", icon: "✍" },
  { value: "SYNTHESIS_NOTE", label: "Notatka syntetyczna", icon: "📝" },
  { value: "ESSAY", label: "Wypracowanie", icon: "📄" },
];

const CATEGORIES = [
  { value: "LANGUAGE_USE", label: "Język w użyciu", color: "blue" },
  {
    value: "HISTORICAL_LITERARY",
    label: "Test historycznoliteracki",
    color: "purple",
  },
  { value: "WRITING", label: "Pisanie", color: "green" },
];

export const LearningSession: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<any>(null);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [answer, setAnswer] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<
    Array<{ id: string; score: number }>
  >([]);

  // NOWY STAN DLA FILTRÓW
  const [sessionFilters, setSessionFilters] = useState<SessionFilters>({});

  const [sessionStats, setSessionStats] = useState({
    completed: 0,
    correct: 0,
    streak: 0,
    maxStreak: 0,
    points: 0,
    timeSpent: 0,
  });

  // Fetch user stats
  const { data: userStats, refetch: refetchStats } = useQuery({
    queryKey: ["learning-stats"],
    queryFn: () => api.get("/api/learning/stats").then((r) => r.data),
  });

  // Funkcja do ustawiania filtrów na backendzie
  const updateFilters = async (newFilters: SessionFilters) => {
    try {
      await api.post("/api/learning/session/filters", newFilters);
      setSessionFilters(newFilters);
    } catch (error) {
      console.error("Error updating filters:", error);
    }
  };

  const fetchNextExercise = async (excludeId?: string) => {
    try {
      // Najpierw ustaw filtry na backendzie
      if (Object.keys(sessionFilters).length > 0) {
        await api.post("/api/learning/session/filters", sessionFilters);
      }

      const response = await api.get("/api/learning/next", {
        params: excludeId ? { excludeId } : {},
      });
      return { data: response.data };
    } catch (error) {
      console.error("Error fetching exercise:", error);
      return { data: null };
    }
  };

  // Submit answer
  const submitMutation = useMutation({
    mutationFn: (data: any) =>
      api.post(`/api/exercises/${currentExercise.id}/submit`, data),
    onSuccess: (response) => {
      const result = response.data;
      const isCorrect = result.score > 0;

      // Dodaj zadanie do listy ukończonych
      setCompletedExercises((prev) => [
        ...prev,
        {
          id: currentExercise.id,
          score: result.score || 0,
        },
      ]);

      setSessionStats((prev) => ({
        ...prev,
        completed: prev.completed + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        streak: isCorrect ? prev.streak + 1 : 0,
        maxStreak: isCorrect
          ? Math.max(prev.maxStreak, prev.streak + 1)
          : prev.maxStreak,
        points: prev.points + (result.score || 0),
      }));

      setShowFeedback(true);

      if (
        isCorrect &&
        sessionStats.streak > 0 &&
        sessionStats.streak % 5 === 0
      ) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    },
  });

  // Save session results
  const saveSessionMutation = useMutation({
    mutationFn: (data: any) => api.post("/api/learning/session/complete", data),
    onSuccess: () => {
      refetchStats();
      // Pokazuj konfetti tylko dla udanych sesji
      if (sessionStats.completed > 0 && sessionStats.correct > 0) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
        });
      }
    },
    onError: (error) => {
      console.error("Error saving session:", error);
    },
  });

  // Start session
  const startSession = async () => {
    setSessionActive(true);
    setSessionComplete(false);
    setCompletedExercises([]); // Reset ukończonych zadań
    setSessionStats({
      completed: 0,
      correct: 0,
      streak: 0,
      maxStreak: 0,
      points: 0,
      timeSpent: 0,
    });

    // Ustaw filtry jeśli są wybrane
    if (Object.keys(sessionFilters).length > 0) {
      await api.post("/api/learning/session/filters", sessionFilters);
    }

    setIsLoadingNext(true);
    const { data } = await fetchNextExercise();
    setCurrentExercise(data);
    setIsLoadingNext(false);

    await api.post("/api/learning/session/clear-skipped");
  };

  // End session
  const endSession = async () => {
    // Zapisz statystyki tylko jeśli coś zostało zrobione
    if (sessionStats.completed > 0) {
      await saveSessionMutation.mutateAsync({
        ...sessionStats,
        completedExercises: [], // Możesz tu dodać tablicę ukończonych zadań jeśli potrzeba
      });
    }

    // Wyczyść filtry na backendzie
    await api.post("/api/learning/session/filters", {});

    // Resetuj stan sesji
    setSessionComplete(true);
    setSessionActive(false);
    setSessionFilters({});
    setCurrentExercise(null);
    setAnswer(null);
    setShowFeedback(false);

    // Resetuj statystyki
    setSessionStats({
      completed: 0,
      correct: 0,
      streak: 0,
      maxStreak: 0,
      points: 0,
      timeSpent: 0,
    });
  };

  // Next exercise with filters
  const goToNextExercise = async () => {
    if (sessionStats.completed >= SESSION_LIMIT) {
      endSession();
      return;
    }

    setAnswer(null);
    setShowFeedback(false);
    setIsLoadingNext(true);

    try {
      const { data } = await fetchNextExercise();
      if (data) {
        setCurrentExercise(data);
      } else {
        endSession();
      }
    } catch (error) {
      console.error("Error fetching next exercise:", error);
      endSession();
    } finally {
      setIsLoadingNext(false);
    }
  };

  const skipExercise = async () => {
    const skippedExerciseId = currentExercise?.id;
    setAnswer(null);
    setShowFeedback(false);

    const newStats = {
      ...sessionStats,
      completed: sessionStats.completed + 1,
      streak: 0,
    };
    setSessionStats(newStats);

    if (newStats.completed >= SESSION_LIMIT) {
      endSession();
      return;
    }

    try {
      const response = await api.get("/api/learning/next", {
        params: { excludeId: skippedExerciseId },
      });

      const data = response.data;
      if (data && data.id !== skippedExerciseId) {
        setCurrentExercise(data);
      } else {
        console.log("Got same exercise or no more exercises available");
        endSession();
      }
    } catch (error) {
      console.error("Error fetching next exercise:", error);
      endSession();
    }
  };

  // Funkcja do aplikowania filtrów i pobierania nowego zadania
  const applyFiltersAndRefresh = async (newFilters: SessionFilters) => {
    setSessionFilters(newFilters);
    setIsLoadingNext(true);

    try {
      // Ustaw filtry na backendzie
      await api.post("/api/learning/session/filters", newFilters);

      // Pobierz nowe zadanie z filtrami
      const response = await api.get("/api/learning/next");
      const data = response.data;

      if (data) {
        setCurrentExercise(data);
        setAnswer(null);
        setShowFeedback(false);
      } else {
        console.log("No exercises matching current filters");
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoadingNext(false);
    }
  };

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (sessionActive && !sessionComplete) {
      interval = setInterval(() => {
        setSessionStats((prev) => ({
          ...prev,
          timeSpent: prev.timeSpent + 1,
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sessionActive, sessionComplete]);

  // Session complete screen
  if (sessionComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Sesja zakończona!</h2>
            <p className="text-gray-600 mb-6">
              {sessionStats.completed > 0
                ? "Oto Twoje wyniki:"
                : "Nie ukończyłeś żadnych zadań w tej sesji."}
            </p>
          </div>

          {sessionStats.completed > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Ukończone zadania</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {sessionStats.completed}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Poprawne odpowiedzi</p>
                  <p className="text-2xl font-bold text-green-600">
                    {sessionStats.correct}/{sessionStats.completed}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Najdłuższa seria</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {sessionStats.maxStreak}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Zdobyte punkty</p>
                  <p className="text-2xl font-bold text-purple-600">
                    +{sessionStats.points}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Skuteczność</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        sessionStats.completed > 0
                          ? (sessionStats.correct / sessionStats.completed) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <p className="text-right text-sm text-gray-600 mt-1">
                  {Math.round(
                    (sessionStats.correct / sessionStats.completed) * 100
                  )}
                  %
                </p>
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>Rozpocznij nową sesję, aby zacząć naukę.</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => {
                setSessionActive(false);
                setSessionComplete(false);
                setSessionFilters({});
                setCompletedExercises([]); // Wyczyść też ukończone zadania
                setSessionStats({
                  completed: 0,
                  correct: 0,
                  streak: 0,
                  maxStreak: 0,
                  points: 0,
                  timeSpent: 0,
                });
                refetchStats(); // Odśwież statystyki
              }}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Zakończ
            </button>
            <button
              onClick={() => {
                setSessionComplete(false);
                setCompletedExercises([]); // Wyczyść ukończone zadania
                startSession();
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Nowa sesja
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!sessionActive) {
    return <SessionStart onStart={startSession} stats={userStats} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Session Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <SessionStat
              icon={<Target className="w-5 h-5" />}
              label="Ukończone"
              value={`${sessionStats.completed}/${SESSION_LIMIT}`}
            />
            <SessionStat
              icon={<CheckCircle className="w-5 h-5" />}
              label="Poprawne"
              value={`${sessionStats.correct}/${sessionStats.completed}`}
            />
            <SessionStat
              icon={<TrendingUp className="w-5 h-5" />}
              label="Seria"
              value={`${sessionStats.streak}`}
              highlight={sessionStats.streak >= 5}
            />
            <SessionStat
              icon={<Award className="w-5 h-5" />}
              label="Punkty"
              value={`+${sessionStats.points}`}
            />
            <SessionStat
              icon={<Clock className="w-5 h-5" />}
              label="Czas"
              value={formatTime(sessionStats.timeSpent)}
            />
          </div>

          <button
            onClick={endSession}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Zakończ sesję
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{
              width: `${(sessionStats.completed / SESSION_LIMIT) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600">
            Cel sesji: {sessionStats.completed}/{SESSION_LIMIT} zadań
          </p>

          {/* PRZYCISK DO FILTRÓW */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Ukryj filtry" : "Filtry zadań"}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* SEKCJA FILTRÓW - POKAZYWANA POD NAGŁÓWKIEM */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <InSessionFilters
              currentFilters={sessionFilters}
              onFiltersChange={applyFiltersAndRefresh}
              isLoading={isLoadingNext}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercise Content */}
      {currentExercise && !isLoadingNext && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            {/* Exercise Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {currentExercise.category}
                  </span>
                  {currentExercise.epoch && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {
                        EPOCHS.find((e) => e.value === currentExercise.epoch)
                          ?.label
                      }
                    </span>
                  )}
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    Poziom {currentExercise.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">
                    {currentExercise.points} pkt
                  </span>
                </div>
                <h2 className="text-xl font-semibold">
                  {currentExercise.question}
                </h2>
              </div>

              <button
                onClick={skipExercise}
                disabled={sessionStats.completed >= SESSION_LIMIT - 1}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <SkipForward className="w-4 h-4" />
                Pomiń
              </button>
            </div>

            {/* Exercise Content */}
            {currentExercise.content?.text && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="whitespace-pre-wrap">
                  {currentExercise.content.text}
                </p>
              </div>
            )}

            {/* Answer Input */}
            {!showFeedback && (
              <div className="space-y-4">
                {currentExercise.type === "CLOSED_SINGLE" && (
                  <RadioOptions
                    options={currentExercise.content.options || []}
                    value={answer}
                    onChange={setAnswer}
                  />
                )}

                {currentExercise.type === "CLOSED_MULTIPLE" && (
                  <CheckboxOptions
                    options={currentExercise.content.options || []}
                    value={answer || []}
                    onChange={setAnswer}
                  />
                )}

                {currentExercise.type === "SHORT_ANSWER" && (
                  <textarea
                    value={answer || ""}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Wpisz swoją odpowiedź..."
                  />
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => submitMutation.mutate({ answer })}
                    disabled={
                      answer === null ||
                      answer === undefined ||
                      answer === "" ||
                      (Array.isArray(answer) && answer.length === 0) ||
                      submitMutation.isPending
                    }
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitMutation.isPending
                      ? "Sprawdzanie..."
                      : "Sprawdź odpowiedź"}
                  </button>
                </div>
              </div>
            )}

            {/* Feedback section - pozostaje bez zmian */}
            {showFeedback && submitMutation.data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Feedback content - bez zmian */}
                {(currentExercise.type === "SHORT_ANSWER" ||
                  currentExercise.type === "SYNTHESIS_NOTE") &&
                submitMutation.data.data.feedback ? (
                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-lg ${
                        submitMutation.data.data.feedback.isCorrect
                          ? "bg-green-50 border border-green-200"
                          : submitMutation.data.data.feedback.isPartiallyCorrect
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {submitMutation.data.data.feedback.isCorrect ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-green-700">
                              Świetnie! +{submitMutation.data.data.score} pkt
                            </span>
                          </>
                        ) : submitMutation.data.data.feedback
                            .isPartiallyCorrect ? (
                          <>
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <span className="font-semibold text-yellow-700">
                              Częściowo poprawne:{" "}
                              {submitMutation.data.data.score}/
                              {submitMutation.data.data.feedback.maxScore} pkt
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="font-semibold text-red-700">
                              Niepoprawna odpowiedź
                            </span>
                          </>
                        )}
                      </div>

                      {submitMutation.data.data.feedback.feedback && (
                        <div className="mt-3 text-sm text-gray-700">
                          <p className="font-medium mb-1">Ocena AI:</p>
                          <p>{submitMutation.data.data.feedback.feedback}</p>
                        </div>
                      )}

                      {submitMutation.data.data.feedback.correctAnswer && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm font-medium mb-1 text-gray-700">
                            Przykładowa poprawna odpowiedź:
                          </p>
                          <div className="text-sm text-gray-600 bg-white p-3 rounded">
                            {submitMutation.data.data.feedback.correctAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMutation.data.data.score > 0
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {submitMutation.data.data.score > 0 ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-700">
                            Świetnie! +{submitMutation.data.data.score} pkt
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-700">
                            Niepoprawna odpowiedź
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={goToNextExercise}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                             flex items-center gap-2"
                  >
                    {sessionStats.completed >= SESSION_LIMIT - 1 ? (
                      <>
                        Zakończ sesję
                        <Trophy className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Następne zadanie
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Loading state */}
      {isLoadingNext && (
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// NOWY KOMPONENT - FILTRY W SESJI
const InSessionFilters: React.FC<{
  currentFilters: SessionFilters;
  onFiltersChange: (filters: SessionFilters) => void;
  isLoading: boolean;
}> = ({ currentFilters, onFiltersChange, isLoading }) => {
  const [localFilters, setLocalFilters] =
    useState<SessionFilters>(currentFilters);
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>(
    currentFilters.difficulty || []
  );
  const [availableCount, setAvailableCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(false);

  const hasFilters = Object.keys(localFilters).length > 0;

  // Funkcja do pobierania liczby dostępnych ćwiczeń
  const fetchAvailableCount = async (filters: SessionFilters) => {
    setIsCountLoading(true);
    try {
      const response = await api.post("/api/learning/count-available", filters);
      setAvailableCount(response.data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
      setAvailableCount(null);
    } finally {
      setIsCountLoading(false);
    }
  };

  // Automatycznie aplikuj filtry i policz dostępne ćwiczenia przy każdej zmianie
  useEffect(() => {
    onFiltersChange(localFilters);
    fetchAvailableCount(localFilters);
  }, [localFilters]);

  const handleCategoryChange = (category: string | undefined) => {
    const newFilters = {
      ...localFilters,
      category,
      // Reset epoch if changing from HISTORICAL_LITERARY
      epoch:
        category === "HISTORICAL_LITERARY" ? localFilters.epoch : undefined,
    };
    setLocalFilters(newFilters);
  };

  const handleEpochChange = (epoch: string | undefined) => {
    const newFilters = { ...localFilters, epoch };
    setLocalFilters(newFilters);
  };

  const handleTypeChange = (type: string | undefined) => {
    const newFilters = { ...localFilters, type };
    setLocalFilters(newFilters);
  };

  const handleDifficultyToggle = (level: number) => {
    const newDifficulties = selectedDifficulties.includes(level)
      ? selectedDifficulties.filter((d) => d !== level)
      : [...selectedDifficulties, level];

    setSelectedDifficulties(newDifficulties);
    const newFilters = {
      ...localFilters,
      difficulty: newDifficulties.length > 0 ? newDifficulties : undefined,
    };
    setLocalFilters(newFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    setSelectedDifficulties([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-700">Filtry zadań</h3>
          {/* Licznik dostępnych ćwiczeń */}
          {isCountLoading || isLoading ? (
            <span className="text-xs text-gray-500">
              <span className="inline-block animate-pulse">Ładowanie...</span>
            </span>
          ) : availableCount !== null ? (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                availableCount > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {availableCount > 0
                ? `${availableCount} dostępnych ćwiczeń`
                : "Brak ćwiczeń spełniających kryteria"}
            </span>
          ) : null}
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            disabled={isLoading}
          >
            <X className="w-3 h-3" />
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* Kategorie - kompaktowy układ */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              handleCategoryChange(
                localFilters.category === cat.value ? undefined : cat.value
              )
            }
            disabled={isLoading}
            className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
              localFilters.category === cat.value
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            } disabled:opacity-50`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Epoki - tylko dla HISTORICAL_LITERARY */}
      {localFilters.category === "HISTORICAL_LITERARY" && (
        <div className="mb-3 p-3 bg-purple-50 rounded-lg">
          <p className="text-xs font-medium text-purple-700 mb-2">
            Epoka literacka:
          </p>
          <div className="flex flex-wrap gap-1">
            {EPOCHS.map((epoch) => (
              <button
                key={epoch.value}
                onClick={() =>
                  handleEpochChange(
                    localFilters.epoch === epoch.value ? undefined : epoch.value
                  )
                }
                disabled={isLoading}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  localFilters.epoch === epoch.value
                    ? "bg-purple-600 text-white"
                    : "bg-white hover:bg-purple-100"
                } disabled:opacity-50`}
              >
                {epoch.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Typ zadania */}
      <div className="mb-3">
        <p className="text-xs font-medium text-gray-700 mb-2">Typ zadania:</p>
        <div className="flex flex-wrap gap-1">
          {EXERCISE_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                handleTypeChange(
                  localFilters.type === type.value ? undefined : type.value
                )
              }
              disabled={isLoading}
              className={`px-2 py-1 text-xs rounded flex items-center gap-1 transition-colors ${
                localFilters.type === type.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              } disabled:opacity-50`}
            >
              <span>{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Poziom trudności */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">
          Poziom trudności:
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultyToggle(level)}
              disabled={isLoading}
              className={`px-3 py-2 rounded transition-colors ${
                selectedDifficulties.includes(level)
                  ? "bg-yellow-100 border-yellow-500"
                  : "bg-gray-50 border-gray-200"
              } border disabled:opacity-50`}
            >
              <div className="text-center">
                <span
                  className={
                    selectedDifficulties.includes(level)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }
                >
                  {"⭐".repeat(level)}
                </span>
                <div className="text-xs mt-1">
                  {level === 1 && "Bardzo łatwe"}
                  {level === 2 && "Łatwe"}
                  {level === 3 && "Średnie"}
                  {level === 4 && "Trudne"}
                  {level === 5 && "Bardzo trudne"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Aktualne filtry - podsumowanie */}
      {hasFilters && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-gray-600 mb-1">Aktywne filtry:</p>
          <div className="flex flex-wrap gap-1">
            {localFilters.category && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                {
                  CATEGORIES.find((c) => c.value === localFilters.category)
                    ?.label
                }
              </span>
            )}
            {localFilters.epoch && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                {EPOCHS.find((e) => e.value === localFilters.epoch)?.label}
              </span>
            )}
            {localFilters.type && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                {
                  EXERCISE_TYPES.find((t) => t.value === localFilters.type)
                    ?.label
                }
              </span>
            )}
            {selectedDifficulties.length > 0 && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                Trudność: {selectedDifficulties.join(", ")}⭐
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Session Start Component - bez zmian
const SessionStart: React.FC<{
  onStart: () => void;
  stats: any;
}> = ({ onStart, stats }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-6">
        <h1 className="text-3xl font-bold mb-4">Gotowy na dzisiejszą naukę?</h1>
        <p className="text-blue-100 mb-6">
          System dopasuje zadania do Twojego poziomu i postępów. Sesja zawiera{" "}
          {SESSION_LIMIT} zadań. Możesz zmieniać filtry w trakcie sesji!
        </p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-3xl font-bold">{stats?.todayExercises || 0}</p>
            <p className="text-sm text-blue-100">Zadań dzisiaj</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-3xl font-bold">{stats?.streak || 0}</p>
            <p className="text-sm text-blue-100">Dni z rzędu</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-3xl font-bold">{stats?.averageScore || 0}%</p>
            <p className="text-sm text-blue-100">Średni wynik</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-3xl font-bold">{stats?.level || 1}</p>
            <p className="text-sm text-blue-100">Twój poziom</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 
                   font-semibold flex items-center gap-2 transition-colors"
        >
          <Play className="w-5 h-5" />
          Rozpocznij sesję nauki ({SESSION_LIMIT} zadań)
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Twoje ostatnie sesje</h2>
        <RecentSessions sessions={stats?.recentSessions || []} />
      </div>
    </div>
  );
};

// Helper Components - bez zmian
const SessionStat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ icon, label, value, highlight }) => (
  <div
    className={`flex items-center gap-2 ${highlight ? "text-orange-600" : ""}`}
  >
    {icon}
    <div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const RecentSessions: React.FC<{ sessions: any[] }> = ({ sessions }) => (
  <div className="space-y-3">
    {sessions.length === 0 ? (
      <p className="text-gray-500 text-center py-4">
        Brak poprzednich sesji. Rozpocznij pierwszą!
      </p>
    ) : (
      sessions.map((session: any, index: number) => (
        <div
          key={`session-${index}`}
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium">{session.date}</p>
            <p className="text-sm text-gray-600">
              {session.completed} zadań, {session.correctRate}% poprawnych
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-green-600">
              +{session.points} pkt
            </p>
            <p className="text-sm text-gray-600">{session.duration} min</p>
          </div>
        </div>
      ))
    )}
  </div>
);

const RadioOptions: React.FC<{
  options: string[];
  value: number | null;
  onChange: (value: number) => void;
}> = ({ options, value, onChange }) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
          ${
            value === index ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
          }`}
      >
        <input
          type="radio"
          name="answer"
          checked={value === index}
          onChange={() => onChange(index)}
          className="w-4 h-4 text-blue-600"
        />
        <span className="ml-3">{option}</span>
      </label>
    ))}
  </div>
);

const CheckboxOptions: React.FC<{
  options: string[];
  value: number[];
  onChange: (value: number[]) => void;
}> = ({ options, value, onChange }) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
          ${
            value.includes(index)
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          }`}
      >
        <input
          type="checkbox"
          checked={value.includes(index)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...value, index]);
            } else {
              onChange(value.filter((v) => v !== index));
            }
          }}
          className="w-4 h-4 text-blue-600"
        />
        <span className="ml-3">{option}</span>
      </label>
    ))}
  </div>
);

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
