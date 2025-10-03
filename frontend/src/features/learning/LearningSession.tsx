// frontend/src/features/learning/LearningSession.tsx

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import { QuestionWithContextLinks } from "../../components/QuestionWithContextLinks";
import { AnimatePresence, motion } from "framer-motion";
import { ExerciseBrowser } from "./ExerciseBrowser";

import {
  AlertCircle,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Crown,
  Filter,
  Lock,
  Play,
  SkipForward,
  Target,
  TrendingUp,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { AiPointsCost } from "../../components/AiPointsCost";
import { ConfirmExitDialog } from "../../components/ConfirmExitDialog";
import { UpgradePrompt } from "../../components/UpgradePrompt";
import { useSessionExit } from "../../hooks/useSessionExit";
import { api } from "../../services/api";

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
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );
  const [sequentialMode, setSequentialMode] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isChangingExercise, setIsChangingExercise] = useState(false);
  const lastExerciseId = useRef<string | null>(null);
  const [showExerciseBrowser, setShowExerciseBrowser] = useState(false);
  const navigate = useNavigate();
  const hasAutoStarted = useRef(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const queryClient = useQueryClient();
  const [sessionActive, setSessionActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<any>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [upgradePromptData, setUpgradePromptData] = useState({
    pointsNeeded: 1,
    currentPoints: 0,
    totalPoints: 20,
  });
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [answer, setAnswer] = useState<any>(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<
    Array<{ id: string; score: number }>
  >([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<Array<[number, number]>>([]);
  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
  });

  const [isPlanSession, setIsPlanSession] = useState(false);
  const { data: levelProgress } = useQuery({
    queryKey: ["difficulty-progress"],
    queryFn: () =>
      api.get("/api/learning/difficulty-progress").then((r) => r.data),
    refetchInterval: 10000, // Co 10 sekund
    staleTime: 5000,
  });

  const loadSelectedExercise = (exercise: any) => {
    console.log("Loading selected exercise:", exercise.id);
    setCurrentExercise(exercise);
    setAnswer(null);
    setShowFeedback(false);
    setHasSubmitted(false);
  };

  // Sprawdź czy user ma punkty na dane zadanie
  const getAiPointsCost = (exerciseType: string): number => {
    switch (exerciseType) {
      case "CLOSED_SINGLE":
      case "CLOSED_MULTIPLE":
        return 0;
      case "SHORT_ANSWER":
      case "SYNTHESIS_NOTE":
        return 1;
      case "ESSAY":
        return 3;
      default:
        return 1;
    }
  };

  const hasEnoughPoints = (exerciseType: string): boolean => {
    if (!subscription) return false;
    const cost = getAiPointsCost(exerciseType);
    if (cost === 0) return true; // Zadania zamknięte zawsze dostępne
    return subscription.aiPointsLimit - subscription.aiPointsUsed >= cost;
  };

  // Sprawdź czy user jest adminem (kontakt@ecopywriting.pl)
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await api.get("/api/learning/user/check-admin");
        setIsAdminUser(response.data.isAdmin);

        if (response.data.isAdmin) {
          console.log("✅ Admin user detected - sequential mode available");
        }
      } catch (error) {
        console.error("Failed to check admin status:", error);
      }
    };

    checkAdminStatus();
  }, []);

  const pairColors = [
    {
      border: "border-green-500",
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600",
    },
    {
      border: "border-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600",
    },
    {
      border: "border-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600",
    },
    {
      border: "border-pink-500",
      bg: "bg-pink-50 dark:bg-pink-900/20",
      text: "text-pink-600",
    },
    {
      border: "border-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      text: "text-indigo-600",
    },
    {
      border: "border-teal-500",
      bg: "bg-teal-50 dark:bg-teal-900/20",
      text: "text-teal-600",
    },
    {
      border: "border-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-600",
    },
    {
      border: "border-cyan-500",
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      text: "text-cyan-600",
    },
  ];

  // Funkcja pomocnicza do pobrania koloru pary
  const getPairColor = (leftIndex: number) => {
    const pairIndex = matches.findIndex(([l, _]) => l === leftIndex);
    return pairIndex !== -1 ? pairColors[pairIndex % pairColors.length] : null;
  };

  // Resetuj przy nowym pytaniu
  useEffect(() => {
    if (currentExercise?.content?.matchingType === "quotes_to_works") {
      setMatches(answer || []);
    } else {
      setMatches([]);
    }
    setSelectedLeft(null);
    setSelectedRight(null);
    setHasSubmitted(false);
    setSubmissionResult(null);
    setShowFeedback(false);
  }, [currentExercise?.id]);

  // Funkcja łączenia
  const handleMatch = () => {
    if (selectedLeft !== null && selectedRight !== null) {
      const newMatches = matches.filter(
        ([l, r]) => l !== selectedLeft && r !== selectedRight
      );
      newMatches.push([selectedLeft, selectedRight]);
      setMatches(newMatches);
      setAnswer(newMatches);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const canSubmit = useMemo(() => {
    if (!currentExercise || answer === null || answer === undefined)
      return false;

    switch (currentExercise.type) {
      case "CLOSED_SINGLE":
        return answer !== null && answer !== undefined;

      case "CLOSED_MULTIPLE":
        if (currentExercise.content?.matchingType) {
          // Matching questions - sprawdź czy wszystkie połączone
          return matches.length === currentExercise.content.leftColumn?.length;
        }
        if (currentExercise.content?.textWithGaps) {
          // Gap-fill - sprawdź czy wszystkie luki wypełnione
          return (
            Array.isArray(answer) &&
            answer.length === currentExercise.content.gaps?.length
          );
        }
        // Regular multiple choice
        return Array.isArray(answer) && answer.length > 0;

      case "SHORT_ANSWER":
        if (currentExercise.content?.steps) {
          // Multi-step - sprawdź czy wszystkie kroki wypełnione
          return (
            Array.isArray(answer) &&
            answer.length === currentExercise.content.steps.length &&
            answer.every((a: string) => a && a.trim().length > 0)
          );
        }
        // Regular short answer
        return typeof answer === "string" && answer.trim().length > 0;

      case "SYNTHESIS_NOTE":
        return typeof answer === "string" && answer.trim().length > 10;

      case "ESSAY":
        const wordCount = (answer || "").split(/\s+/).filter(Boolean).length;
        const minWords =
          currentExercise.content?.wordLimit?.min ||
          currentExercise.metadata?.wordLimit?.min ||
          50;
        return wordCount >= minWords;

      default:
        return false;
    }
  }, [currentExercise, answer, matches]);

  // Auto-łącz
  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      handleMatch();
    }
  }, [selectedLeft, selectedRight]);

  // Funkcja zapisywania stanu
  const saveSessionState = async () => {
    if (!sessionId) return;

    try {
      await api.post("/api/learning/session/save-state", {
        sessionId,
        state: {
          ...sessionStats,
          completedExercises,
          filters: sessionFilters,
        },
      });
      setLastSaveTime(Date.now());
    } catch (error) {
      console.error("Failed to save session state:", error);
    }
  };

  // Hook do obsługi wyjścia z sesji
  const sessionExit = useSessionExit({
    isActive: sessionActive && !sessionComplete,
    onExit: async () => {
      console.log("=== SESSION EXIT TRIGGERED ===");
      await endSession();
    },
    shouldBlock: sessionActive && !sessionComplete,
  });

  // Obsługa pokazania dialogu gdy nawigacja zostanie zablokowana
  useEffect(() => {
    if (sessionExit.isBlocked) {
      setShowExitDialog(true);
    }
  }, [sessionExit.isBlocked]);

  // Obsługa blokera nawigacji
  useEffect(() => {
    if (sessionExit.isBlocked) {
      setShowExitDialog(true);
      setPendingNavigation(sessionExit.nextLocation || null);
    }
  }, [sessionExit.isBlocked, sessionExit.nextLocation]);

  // SPRAWDŹ CZY SĄ FILTRY Z PLANU TYGODNIOWEGO
  const [sessionFilters, setSessionFilters] = useState<SessionFilters>(() => {
    const storedFilters = localStorage.getItem("sessionFilters");
    console.log("Reading filters from localStorage:", storedFilters);
    if (storedFilters) {
      try {
        const filters = JSON.parse(storedFilters);
        console.log("Parsed filters:", filters);
        return filters;
      } catch {
        console.log("Failed to parse filters");
        return {};
      }
    }
    return {};
  });

  const [sessionStats, setSessionStats] = useState({
    completed: 0,
    correct: 0,
    streak: 0,
    maxStreak: 0,
    points: 0,
    timeSpent: 0,
  });

  const getEpochLabel = (epochValue: string): string => {
    const epochMap: Record<string, string> = {
      ANTIQUITY: "Starożytność",
      MIDDLE_AGES: "Średniowiecze",
      RENAISSANCE: "Renesans",
      BAROQUE: "Barok",
      ENLIGHTENMENT: "Oświecenie",
      ROMANTICISM: "Romantyzm",
      POSITIVISM: "Pozytywizm",
      YOUNG_POLAND: "Młoda Polska",
      INTERWAR: "Dwudziestolecie międzywojenne",
      CONTEMPORARY: "Współczesność",
    };
    return epochMap[epochValue] || epochValue;
  };

  // Fetch user stats
  const { data: userStats, refetch: refetchStats } = useQuery({
    queryKey: ["learning-stats"],
    queryFn: () => api.get("/api/learning/stats").then((r) => r.data),
  });

  const fetchNextExercise = async (excludeId?: string) => {
    try {
      // Najpierw ustaw filtry na backendzie
      if (Object.keys(sessionFilters).length > 0) {
        await api.post("/api/learning/session/filters", sessionFilters);
      }

      const response = await api.get("/api/learning/next", {
        params: {
          excludeId: excludeId || undefined,
          sequentialMode: sequentialMode ? "true" : "false", // DODANE
        },
      });
      return { data: response.data };
    } catch (error) {
      console.error("Error fetching exercise:", error);
      return { data: null };
    }
  };

  const handleSubmit = async () => {
    if (!currentExercise || answer === null || answer === undefined) return; // ✅ POPRAWIONE

    // SPRAWDŹ PUNKTY PRZED SUBMITEM
    const needsAi =
      currentExercise.type === "SHORT_ANSWER" ||
      currentExercise.type === "SYNTHESIS_NOTE" ||
      currentExercise.type === "ESSAY";

    if (needsAi && !hasEnoughPoints(currentExercise.type)) {
      const cost = getAiPointsCost(currentExercise.type);
      setUpgradePromptData({
        pointsNeeded: cost,
        currentPoints: subscription?.aiPointsUsed || 0,
        totalPoints: subscription?.aiPointsLimit || 0,
      });
      setShowUpgradePrompt(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitMutation.mutateAsync({ answer });
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    setHasSubmitted(false);
    setSubmissionResult(null);
    setShowFeedback(false);
    await goToNextExercise();
  };

  const handleSkip = async () => {
    setHasSubmitted(false);
    setSubmissionResult(null);
    await skipExercise();
  };

  const renderActionButtons = () => {
    if (!currentExercise) {
      return null;
    }

    const needsAi =
      currentExercise.type === "SHORT_ANSWER" ||
      currentExercise.type === "SYNTHESIS_NOTE" ||
      currentExercise.type === "ESSAY";

    const hasPoints = hasEnoughPoints(currentExercise.type);

    // PO SUBMICIE - zawsze tylko "Następne"
    if (hasSubmitted) {
      return (
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 
                 font-semibold flex items-center gap-2"
        >
          Następne
          <ChevronRight className="w-5 h-5" />
        </button>
      );
    }

    // PRZED SUBMITEM

    // Zadania zamknięte (CLOSED_*) - zawsze tylko "Sprawdź"
    if (!needsAi) {
      return (
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 font-semibold flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sprawdzanie...
            </>
          ) : (
            <>
              Sprawdź
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </button>
      );
    }

    // Zadania pisemne (SHORT_ANSWER, SYNTHESIS_NOTE, ESSAY) BEZ punktów
    if (!hasPoints) {
      return (
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 
                   text-gray-700 dark:text-gray-300 rounded-lg 
                   hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold
                   flex items-center gap-2"
          >
            <SkipForward className="w-4 h-4" />
            Pomiń zadanie
          </button>
          <button
            onClick={() => navigate("/subscription")}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 
                   text-white rounded-lg hover:from-green-700 hover:to-emerald-700 
                   font-semibold flex items-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Doładuj konto
          </button>
        </div>
      );
    }

    // Zadania pisemne Z punktami - tylko "Sprawdź"
    return (
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
               text-white rounded-lg hover:from-blue-700 hover:to-purple-700 
               disabled:opacity-50 disabled:cursor-not-allowed 
               font-semibold flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sprawdzanie...
          </>
        ) : (
          <>
            Sprawdź
            <CheckCircle className="w-5 h-5" />
          </>
        )}
      </button>
    );
  };

  const submitMutation = useMutation({
    mutationFn: (data: any) =>
      api.post(`/api/exercises/${currentExercise.id}/submit`, data),
    onSuccess: async (response) => {
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["subscription-status"] });

      const result = response.data;
      setSubmissionResult(result);

      console.log("=== SUBMIT SUCCESS ===");
      console.log("Exercise ID:", currentExercise.id, "Score:", result.score);

      // Sprawdź czy sessionId istnieje
      if (!sessionId) {
        console.error("BRAK sessionId! Nie można zapisać wyniku.");
        toast.error("Błąd sesji. Spróbuj rozpocząć nową sesję.");
        setShowFeedback(true);
        setHasSubmitted(true);
        return;
      }

      // Zapisz do bazy danych
      try {
        console.log("Zapisuję do sesji:", {
          sessionId,
          exerciseId: currentExercise.id,
          score: result.score,
        });

        await api.post("/api/learning/session/update-completed", {
          sessionId: sessionId,
          exerciseId: currentExercise.id,
          score: result.score,
        });

        console.log("Zapisano pomyślnie do sesji");
        setHasSubmitted(true);
      } catch (error: any) {
        console.error("Błąd zapisu do sesji:", error);

        if (error.response?.status === 404) {
          toast.error(
            "Sesja wygasła. Kliknij 'Pomiń' i rozpocznij nową sesję.",
            { duration: 5000 }
          );
        } else {
          toast.error("Błąd zapisu wyniku. Spróbuj ponownie.");
        }

        setShowFeedback(true);
        return;
      }

      // Aktualizuj lokalne state
      const isCorrect = result.score > 0;

      setCompletedExercises((prev) => [
        ...prev,
        { id: currentExercise.id, score: result.score || 0 },
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

      // Aktualizuj poziomy trudności
      if (result.levelProgress) {
        queryClient.setQueryData(["difficulty-progress"], result.levelProgress);

        if (result.unlockedNewLevel) {
          confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.5 },
          });
          toast.success(
            `Odblokowano poziom ${result.levelProgress.currentMaxDifficulty}!`,
            { duration: 5000 }
          );
        }
      }

      // Odśwież poziomy po chwili
      if (isCorrect) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["difficulty-progress"] });
        }, 500);
      }

      // Konfetti dla serii
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

      setShowFeedback(true);
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      const errorMessage = error.response?.data?.error || error.message || "";

      if (errorMessage.includes("INSUFFICIENT_AI_POINTS")) {
        const match = errorMessage.match(/(\d+)\/(\d+) punktów.*(\d+) punkt/);

        if (match && subscription) {
          setUpgradePromptData({
            pointsNeeded: parseInt(match[3]),
            currentPoints: subscription.aiPointsUsed,
            totalPoints: subscription.aiPointsLimit,
          });
          setShowUpgradePrompt(true);
        } else {
          toast.error("Brak punktów AI! Ulepsz plan aby kontynuować.");
        }
      } else {
        toast.error(errorMessage || "Błąd podczas sprawdzania odpowiedzi");
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

  const startSession = async () => {
    try {
      // ZAWSZE sprawdź czy są aktywne sesje
      console.log("=== STARTING NEW SESSION ===");

      try {
        const activeSessions = await api.get("/api/learning/active-sessions");

        if (activeSessions.data && activeSessions.data.length > 0) {
          console.log(
            `Found ${activeSessions.data.length} active sessions to close`
          );

          for (const oldSession of activeSessions.data) {
            // Zamknij każdą aktywną sesję
            if (oldSession.completed > 0) {
              console.log(
                `Closing session ${oldSession.id} with ${oldSession.completed} exercises`
              );
              try {
                await api.post("/api/learning/session/complete", {
                  sessionId: oldSession.id,
                  stats: {
                    completed: oldSession.completed || 0,
                    correct: oldSession.correct || 0,
                    streak: oldSession.maxStreak || 0,
                    maxStreak: oldSession.maxStreak || 0,
                    points: oldSession.points || 0,
                    timeSpent: 0,
                  },
                  completedExercises: oldSession.completedExercises || [],
                });
              } catch (error) {
                console.error(
                  `Failed to close session ${oldSession.id}:`,
                  error
                );
              }
            } else {
              // Pusta sesja - po prostu oznacz jako zakończoną
              try {
                await api.post("/api/learning/session/complete", {
                  sessionId: oldSession.id,
                  stats: {
                    completed: 0,
                    correct: 0,
                    streak: 0,
                    maxStreak: 0,
                    points: 0,
                    timeSpent: 0,
                  },
                  completedExercises: [],
                });
              } catch (error) {
                console.error(
                  `Failed to mark empty session ${oldSession.id}:`,
                  error
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Error closing active sessions:", error);
      }

      // Wyczyść localStorage
      localStorage.removeItem("sessionFilters");
      localStorage.removeItem("isStudyPlanSession");
      localStorage.removeItem("isEpochReview");

      // Wyczyść filtry na backendzie
      await api.post("/api/learning/session/filters", {});

      // Rozpocznij NOWĄ sesję
      const response = await api.post("/api/learning/session/start");
      const { sessionId: newSessionId } = response.data;

      setSessionId(newSessionId);

      // ZAWSZE nowa sesja, NIGDY nie wznawiaj
      console.log("Starting fresh session");
      setSessionStats({
        completed: 0,
        correct: 0,
        streak: 0,
        maxStreak: 0,
        points: 0,
        timeSpent: 0,
      });
      setCompletedExercises([]);

      // Sprawdź czy są filtry z Epoch Review lub StudyPlan
      const hasFilters = Object.keys(sessionFilters).length > 0;

      if (hasFilters) {
        await api.post("/api/learning/session/filters", sessionFilters);
        setIsPlanSession(true);

        // Toast z informacją o typie sesji
        if (sessionFilters.epoch) {
          toast.success(
            `🔄 Rozpoczęto sesję z filtrami: ${getEpochLabel(
              sessionFilters.epoch
            )}`
          );
        } else {
          toast.success(`📚 Rozpoczęto sesję z filtrami`);
        }
      } else {
        setIsPlanSession(false);
      }

      setSessionActive(true);
      setSessionComplete(false);

      // Pobierz pierwsze zadanie
      setIsLoadingNext(true);
      try {
        const { data } = await fetchNextExercise();
        setCurrentExercise(data);
      } catch (error) {
        console.error("Error fetching first exercise:", error);
        toast.error("Nie udało się pobrać pierwszego zadania");
      } finally {
        setIsLoadingNext(false);
      }
    } catch (error) {
      console.error("Failed to start session:", error);
      toast.error("Nie udało się rozpocząć sesji");
    }
  };

  // Zaktualizuj funkcję endSession
  const endSession = async () => {
    if (sessionId && sessionStats.completed > 0) {
      await saveSessionMutation.mutateAsync({
        sessionId,
        stats: sessionStats,
        completedExercises: completedExercises,
      });
    }

    // Resetuj wszystko
    setSessionId(null);
    setSessionComplete(true);
    setSessionActive(false);
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

  const pauseSession = async () => {
    if (!sessionId) return;

    await api.post("/api/learning/session/pause", {
      sessionId,
      state: sessionStats,
    });

    navigate("/dashboard"); // navigate już jest zaimportowany w komponencie
    toast("Sesja została wstrzymana. Możesz ją kontynuować później.");
  };

  // Next exercise with filters
  const goToNextExercise = async () => {
    if (sessionStats.completed >= SESSION_LIMIT) {
      await endSession();
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
        await endSession();
      }
    } catch (error) {
      console.error("Error fetching next exercise:", error);
      await endSession();
    } finally {
      setIsLoadingNext(false);
    }
  };

  const skipExercise = async () => {
    // Prevent double-clicking
    if (isChangingExercise) {
      console.log("Already changing exercise, ignoring skip");
      return;
    }

    const skippedExerciseId = currentExercise?.id;

    // Jeśli to ten sam exercise co ostatnio - ignore
    if (skippedExerciseId === lastExerciseId.current) {
      console.log("Trying to skip same exercise twice!");
      return;
    }

    setIsChangingExercise(true);
    lastExerciseId.current = skippedExerciseId;

    console.log("=== SKIP EXERCISE ===");
    console.log("Skipping exercise:", skippedExerciseId);

    setAnswer(null);
    setShowFeedback(false);

    if (sessionStats.completed >= SESSION_LIMIT) {
      await endSession();
      return;
    }

    try {
      // Dodaj małe opóźnienie żeby backend zdążył zapisać
      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await api.get("/api/learning/next", {
        params: { excludeId: skippedExerciseId },
      });

      const data = response.data;

      // Sprawdź czy nie dostaliśmy tego samego
      if (data && data.id === skippedExerciseId) {
        console.error("GOT SAME EXERCISE BACK!");
        toast.error("Brak więcej dostępnych ćwiczeń w tej kategorii");
        await endSession();
        return;
      }

      if (data) {
        setCurrentExercise(data);
      } else {
        console.log("No more exercises available");
        await endSession();
      }
    } catch (error) {
      console.error("Error fetching next exercise:", error);
      await endSession();
    } finally {
      setIsChangingExercise(false);
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

  useEffect(() => {
    console.log("=== useEffect CHECK ===");
    const storedFilters = localStorage.getItem("sessionFilters");
    const isStudyPlanSession = localStorage.getItem("isStudyPlanSession");
    const isEpochReview = localStorage.getItem("isEpochReview");
    const autoStart = localStorage.getItem("autoStartSession");

    console.log("Raw localStorage filters:", storedFilters);
    console.log("Is StudyPlan session:", isStudyPlanSession);
    console.log("Is Epoch Review:", isEpochReview);

    if (
      storedFilters &&
      !sessionActive &&
      !sessionComplete &&
      !hasAutoStarted.current
    ) {
      hasAutoStarted.current = true;
      try {
        const filters = JSON.parse(storedFilters);
        console.log("Parsed filters:", filters);

        setSessionFilters(filters);
        setIsPlanSession(!!isStudyPlanSession || !!isEpochReview);

        // Opóźnienie dla pewności
        setTimeout(async () => {
          console.log("Auto-starting session with filters:", filters);
          await startSession();
        }, 100);
      } catch (error) {
        console.error("Error parsing session filters:", error);
        localStorage.removeItem("sessionFilters");
        localStorage.removeItem("isStudyPlanSession");
        localStorage.removeItem("isEpochReview");
      }
    } else if (
      autoStart &&
      !sessionActive &&
      !sessionComplete &&
      !hasAutoStarted.current
    ) {
      hasAutoStarted.current = true;
      localStorage.removeItem("autoStartSession");

      setTimeout(async () => {
        await startSession();
      }, 100);
    }
  }, []);

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

  // Auto-save co 30 sekund
  useEffect(() => {
    if (!sessionActive || !sessionId) return;

    const saveInterval = setInterval(async () => {
      await saveSessionState();
    }, 30000); // 30 sekund

    return () => clearInterval(saveInterval);
  }, [sessionActive, sessionId, sessionStats]);

  // Session complete screen
  if (sessionComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30 p-8"
        >
          <div className="text-center">
            <Trophy className="w-20 h-20 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Sesja zakończona!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {sessionStats.completed > 0
                ? "Oto Twoje wyniki:"
                : "Nie ukończyłeś żadnych zadań w tej sesji."}
            </p>
          </div>

          {sessionStats.completed > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ukończone zadania
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {sessionStats.completed}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Poprawne odpowiedzi
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {sessionStats.correct}/{sessionStats.completed}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Najdłuższa seria
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {sessionStats.maxStreak}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Zdobyte punkty
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    +{sessionStats.points}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Skuteczność
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-400 dark:to-green-400 
                         h-4 rounded-full transition-all duration-500"
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
                <p className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {Math.round(
                    (sessionStats.correct / sessionStats.completed) * 100
                  )}
                  %
                </p>
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <p>Rozpocznij nową sesję, aby zacząć naukę.</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={pauseSession}
              className="px-4 py-2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 
           dark:hover:text-yellow-300 transition-colors"
            >
              Wstrzymaj sesję
            </button>
            <button
              onClick={() => {
                setSessionActive(false);
                setSessionComplete(false);
                setSessionFilters({});
                setCompletedExercises([]);
                setSessionStats({
                  completed: 0,
                  correct: 0,
                  streak: 0,
                  maxStreak: 0,
                  points: 0,
                  timeSpent: 0,
                });
                refetchStats();
              }}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 
                   rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                   text-gray-700 dark:text-gray-300 transition-colors"
            >
              Zakończ
            </button>
            <button
              onClick={() => {
                setSessionComplete(false);
                setCompletedExercises([]);
                startSession();
              }}
              className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white 
                   rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 
                   transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Nowa sesja
            </button>
          </div>
        </motion.div>

        <UpgradePrompt
          isOpen={showUpgradePrompt}
          onClose={() => setShowUpgradePrompt(false)}
          pointsNeeded={upgradePromptData.pointsNeeded}
          currentPoints={upgradePromptData.currentPoints}
          totalPoints={upgradePromptData.totalPoints}
        />
      </div>
    );
  }

  if (!sessionActive) {
    return <SessionStart onStart={startSession} stats={userStats} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Session Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Stats Grid - 2 kolumny na mobile, wszystkie w linii na desktop */}
          <div className="grid grid-cols-2 xs:grid-cols-3 lg:flex lg:items-center gap-3 lg:gap-6 w-full sm:w-auto">
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

          {/* End Session Button */}
          <button
            onClick={async () => {
              console.log("=== ZAKOŃCZ SESJĘ BUTTON CLICKED ===");
              await endSession();
            }}
            className="w-full sm:w-auto px-4 py-2 text-gray-600 dark:text-gray-400 
               hover:text-gray-900 dark:hover:text-white transition-colors
               border border-gray-300 dark:border-gray-600 rounded-lg
               hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Zakończ sesję
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 
         dark:from-blue-400 dark:to-purple-400"
            initial={{ width: 0 }}
            animate={{
              width: `${(sessionStats.completed / SESSION_LIMIT) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* ✅ POPRAWIONE - Krótszy tekst na mobile */}
        {levelProgress && (
          <div className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              <span className="sm:hidden">Poziom:</span>
              <span className="hidden sm:inline">
                Maksymalny poziom trudności:
              </span>{" "}
              {levelProgress.currentMaxDifficulty}/5
            </span>
            {levelProgress.pointsNeeded > 0 && (
              <span className="flex items-center gap-1">
                <span className="hidden sm:inline">•</span>
                <span>
                  {levelProgress.pointsNeeded} pkt do lvl{" "}
                  {levelProgress.nextLevel}
                </span>
              </span>
            )}
          </div>
        )}

        {isAdminUser && sessionActive && (
          <div className="mb-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sequentialMode"
                    checked={sequentialMode}
                    onChange={(e) => {
                      const newMode = e.target.checked;
                      setSequentialMode(newMode);

                      toast.success(
                        newMode
                          ? "🔄 Tryb sekwencyjny włączony - pytania od najstarszego do najnowszego"
                          : "🧠 Tryb inteligentny włączony - algorytm adaptacyjny",
                        { duration: 4000 }
                      );
                    }}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <label
                    htmlFor="sequentialMode"
                    className="text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer select-none"
                  >
                    Tryb sekwencyjny (A→Z)
                  </label>
                </div>

                {sequentialMode && (
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full flex items-center gap-1">
                    <span>📋</span>
                    Pytania chronologicznie (od najstarszego)
                  </span>
                )}

                {isAdminUser && sessionActive && (
                  <button
                    onClick={() => setShowExerciseBrowser(true)}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
             text-white rounded-lg hover:from-purple-700 hover:to-pink-700
             font-medium flex items-center justify-center gap-2 transition-all
             shadow-lg hover:shadow-xl"
                  >
                    <span className="text-lg">📚</span>
                    Przeglądaj wszystkie pytania
                    <span className="text-xs opacity-80">(Admin)</span>
                  </button>
                )}
              </div>

              <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                Tylko dla konta admin
              </span>
            </div>
          </div>
        )}

        {/* ✅ POPRAWIONE - Lepsze zawijanie i layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cel sesji: {sessionStats.completed}/{SESSION_LIMIT} zadań
          </p>

          {/* PRZYCISK DO FILTRÓW - responsive */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 
         hover:text-blue-700 dark:hover:text-blue-300 font-medium 
         px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors
         whitespace-nowrap"
          >
            <Filter className="w-4 h-4 flex-shrink-0" />
            <span className="hidden xs:inline">
              {showFilters ? "Ukryj filtry" : "Filtry zadań"}
            </span>
            <span className="xs:hidden">
              {showFilters ? "Ukryj" : "Filtry"}
            </span>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-8"
          >
            {/* Exercise Header */}
            <div className="flex flex-col gap-4 mb-6">
              {/* Top row - Badges + Title */}
              <div className="flex flex-col gap-3">
                {/* Badges - wrap on mobile */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm">
                    {currentExercise.category}
                  </span>
                  {currentExercise.epoch && (
                    <span className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm">
                      {
                        EPOCHS.find((e) => e.value === currentExercise.epoch)
                          ?.label
                      }
                    </span>
                  )}
                  <span className="px-2 sm:px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs sm:text-sm">
                    Poziom {currentExercise.difficulty}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {currentExercise.points} pkt
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  {currentExercise.content?.contextLinks ? (
                    <QuestionWithContextLinks
                      question={currentExercise.question}
                      contextLinks={currentExercise.content.contextLinks}
                    />
                  ) : (
                    currentExercise.question
                  )}
                </h2>
              </div>

              {/* Bottom row - AI Points + Skip button */}
              <div className="flex items-center justify-between gap-3">
                {currentExercise && (
                  <div className="flex-shrink-0">
                    <AiPointsCost
                      exerciseType={currentExercise.type}
                      isPremium={subscription?.plan === "PREMIUM"}
                      hasEnoughPoints={hasEnoughPoints(currentExercise.type)}
                    />
                  </div>
                )}

                <button
                  onClick={skipExercise}
                  disabled={sessionStats.completed >= SESSION_LIMIT - 1}
                  className="flex items-center gap-1 px-1 py-1 text-gray-500 dark:text-gray-400 
             hover:text-gray-700 dark:hover:text-gray-200 
             hover:bg-gray-100 dark:hover:bg-gray-700
             disabled:opacity-50 transition-colors rounded-lg
             whitespace-nowrap"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Pomiń</span>
                </button>
              </div>
            </div>

            {/* Exercise Content */}
            {currentExercise.content?.text && (
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
                <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">
                  {currentExercise.content.text}
                </p>
              </div>
            )}
            {/* Answer Input */}
            {!showFeedback && (
              <div className="space-y-4">
                {/* CLOSED SINGLE */}
                {currentExercise.type === "CLOSED_SINGLE" && (
                  <>
                    {/* Autor */}
                    {currentExercise.content?.author && (
                      <div className="mb-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                          ✍️ Autor: {currentExercise.content.author}
                        </p>
                      </div>
                    )}

                    {/* Dzieło literackie jako kontekst */}
                    {currentExercise.content?.work && (
                      <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                          📚 Dzieło: {currentExercise.content.work}
                        </p>
                      </div>
                    )}

                    {/* Technika/strategia narracyjna */}
                    {currentExercise.content?.technique && (
                      <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                          🎨 Technika narracyjna:
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          {currentExercise.content.technique}
                        </p>
                      </div>
                    )}

                    {/* Wyświetl tekst źródłowy jeśli istnieje */}
                    {currentExercise.content?.sourceText && (
                      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-600">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {currentExercise.content.sourceText.author && (
                              <span className="font-medium">
                                {currentExercise.content.sourceText.author}
                              </span>
                            )}
                            {currentExercise.content.sourceText.title && (
                              <span className="italic">
                                {currentExercise.content.sourceText.author &&
                                  " — "}
                                "{currentExercise.content.sourceText.title}"
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-gray-900 dark:text-gray-100">
                          <p className="whitespace-pre-wrap italic">
                            {currentExercise.content.sourceText.text}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Zdanie do analizy */}
                    {currentExercise.content?.sentence && (
                      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-gray-900 dark:text-gray-100 italic">
                          {currentExercise.content.sentence}
                        </p>
                      </div>
                    )}

                    {/* Kontekst */}
                    {currentExercise.content?.context && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {currentExercise.content.context}
                        </p>
                      </div>
                    )}

                    {/* Dodatkowe pytanie w kontekście */}
                    {currentExercise.content?.question && (
                      <div className="mb-4">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {currentExercise.content.question}
                        </p>
                      </div>
                    )}

                    {/* Opcje odpowiedzi */}
                    <div className="space-y-2">
                      {(currentExercise.content?.options || []).map(
                        (option: string, index: number) => (
                          <label
                            key={index}
                            className="flex items-center p-3 border border-gray-300 dark:border-gray-600 
                     rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 
                     cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name="answer"
                              value={index}
                              checked={answer === index}
                              onChange={() => setAnswer(index)}
                              className="mr-3"
                            />
                            <span className="text-gray-900 dark:text-white">
                              {option}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </>
                )}

                {currentExercise.type === "CLOSED_MULTIPLE" &&
                  currentExercise.content?.textWithGaps && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-gray-900 dark:text-gray-100 mb-4">
                          {currentExercise.content.textWithGaps}
                        </p>
                      </div>

                      {currentExercise.content.gaps?.map((gap: any) => (
                        <div key={gap.id} className="space-y-2">
                          <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
                            Luka {gap.id}:
                          </p>
                          {gap.options.map(
                            (option: string, optionIndex: number) => (
                              <label
                                key={optionIndex}
                                className="flex items-center p-2 border border-gray-300 dark:border-gray-600 
                     rounded hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`gap-${gap.id}`}
                                  value={optionIndex}
                                  checked={answer?.[gap.id - 1] === optionIndex}
                                  onChange={() => {
                                    const newAnswer = [...(answer || [])];
                                    newAnswer[gap.id - 1] = optionIndex;
                                    setAnswer(newAnswer);
                                  }}
                                  className="mr-2"
                                />
                                <span className="text-gray-900 dark:text-white">
                                  {option}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                {/* MATCHING QUESTIONS */}
                {currentExercise.type === "CLOSED_MULTIPLE" &&
                  currentExercise.content?.matchingType &&
                  currentExercise.content?.leftColumn &&
                  currentExercise.content?.rightColumn && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Lewa kolumna */}
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">
                            Kliknij element z lewej:
                          </h3>
                          {currentExercise.content.leftColumn?.map(
                            (item: any, index: number) => {
                              const matchedRight =
                                matches.find(([l, _]) => l === index)?.[1] ??
                                null;
                              const isSelected = selectedLeft === index;
                              const isMatched = matchedRight !== null;
                              const pairColor = getPairColor(index);

                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    if (isMatched) {
                                      const newMatches = matches.filter(
                                        ([l, _]) => l !== index
                                      );
                                      setMatches(newMatches);
                                      setAnswer(newMatches);
                                    } else {
                                      setSelectedLeft(
                                        isSelected ? null : index
                                      );
                                    }
                                  }}
                                  className={`w-full p-3 rounded-lg border-2 text-left transition-all
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : isMatched && pairColor
                        ? `${pairColor.border} ${pairColor.bg}`
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                    }`}
                                >
                                  <span
                                    className={`font-bold mr-2 
                    ${
                      isSelected
                        ? "text-blue-600"
                        : isMatched && pairColor
                        ? pairColor.text
                        : "text-gray-600"
                    }`}
                                  >
                                    {item.id}.
                                  </span>
                                  <span
                                    className={isMatched ? "font-medium" : ""}
                                  >
                                    {item.text}
                                  </span>
                                  {isMatched && (
                                    <span
                                      className={`ml-2 ${
                                        pairColor?.text || "text-green-600"
                                      }`}
                                    >
                                      →{" "}
                                      {
                                        currentExercise.content.rightColumn[
                                          matchedRight
                                        ].id
                                      }
                                    </span>
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>

                        {/* Prawa kolumna */}
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">
                            Kliknij element z prawej:
                          </h3>
                          {currentExercise.content.rightColumn?.map(
                            (item: any, index: number) => {
                              const matchedLeft =
                                matches.find(([_, r]) => r === index)?.[0] ??
                                null;
                              const isSelected = selectedRight === index;
                              const isMatched = matchedLeft !== null;
                              const pairColor =
                                matchedLeft !== null
                                  ? getPairColor(matchedLeft)
                                  : null;

                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    if (isMatched) {
                                      const newMatches = matches.filter(
                                        ([_, r]) => r !== index
                                      );
                                      setMatches(newMatches);
                                      setAnswer(newMatches);
                                    } else {
                                      setSelectedRight(
                                        isSelected ? null : index
                                      );
                                    }
                                  }}
                                  className={`w-full p-3 rounded-lg border-2 text-left transition-all
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : isMatched && pairColor
                        ? `${pairColor.border} ${pairColor.bg}`
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                    }`}
                                >
                                  <span
                                    className={`font-bold mr-2 
                    ${
                      isSelected
                        ? "text-blue-600"
                        : isMatched && pairColor
                        ? pairColor.text
                        : "text-gray-600"
                    }`}
                                  >
                                    {item.id}.
                                  </span>
                                  <span
                                    className={isMatched ? "font-medium" : ""}
                                  >
                                    {item.text}
                                  </span>
                                  {isMatched && (
                                    <span
                                      className={`ml-2 ${
                                        pairColor?.text || "text-green-600"
                                      }`}
                                    >
                                      ←{" "}
                                      {
                                        currentExercise.content.leftColumn[
                                          matchedLeft
                                        ].id
                                      }
                                    </span>
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Podsumowanie z kolorowymi kropkami */}
                      {matches.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Dopasowane pary: {matches.length}/
                            {currentExercise.content.leftColumn.length}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {matches.map(([l, r], idx) => {
                              const color = pairColors[idx % pairColors.length];
                              return (
                                <span
                                  key={`${l}-${r}`}
                                  className={`px-2 py-1 rounded text-xs font-medium ${color.bg} ${color.text} ${color.border} border`}
                                >
                                  {currentExercise.content.leftColumn[l].id} ↔{" "}
                                  {currentExercise.content.rightColumn[r].id}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        💡 Kliknij element z lewej, potem z prawej aby połączyć.
                        Każda para ma swój kolor.
                      </div>
                    </div>
                  )}

                {/* CLOSED MULTIPLE */}
                {currentExercise.type === "CLOSED_MULTIPLE" &&
                  !currentExercise.content?.textWithGaps &&
                  !currentExercise.content?.matchingType && (
                    <div className="space-y-2">
                      {(currentExercise.content?.options || []).map(
                        (option: string, index: number) => (
                          <label
                            key={index}
                            className="flex items-center p-3 border border-gray-300 dark:border-gray-600 
                   rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 
                   cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={(answer || []).includes(index)}
                              onChange={(e) => {
                                const current = answer || [];
                                if (e.target.checked) {
                                  setAnswer([...current, index]);
                                } else {
                                  setAnswer(
                                    current.filter((i: number) => i !== index)
                                  );
                                }
                              }}
                              className="mr-3"
                            />
                            <span className="text-gray-900 dark:text-white">
                              {option}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  )}

                {/* SHORT ANSWER */}
                {currentExercise.type === "SHORT_ANSWER" && (
                  <>
                    {/* Wyświetl dodatkowe informacje jeśli istnieją */}
                    {currentExercise.content?.originalSentence && (
                      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Zdanie wyjściowe:
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">
                          {currentExercise.content.originalSentence}
                        </p>
                      </div>
                    )}

                    {/* Hasło epoki (slogan) */}
                    {currentExercise.content?.slogan && (
                      <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-sm text-purple-700 dark:text-purple-300 mb-1">
                          📚 Hasło epoki:
                        </p>
                        <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                          "{currentExercise.content.slogan}"
                        </p>
                      </div>
                    )}

                    {/* Szczegółowa instrukcja */}
                    {currentExercise.content?.instruction && (
                      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-sm text-blue-700 dark:text-blue-300 mb-1">
                          ✍️ Instrukcja:
                        </p>
                        <p className="text-blue-900 dark:text-blue-100">
                          {currentExercise.content.instruction}
                        </p>
                      </div>
                    )}

                    {currentExercise.content?.transformation && (
                      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-sm text-blue-700 dark:text-blue-300 mb-1">
                          Polecenie:
                        </p>
                        <p className="text-blue-900 dark:text-blue-100">
                          {currentExercise.content.transformation}
                        </p>
                      </div>
                    )}

                    {/*  Obsługa zadań wieloetapowych */}
                    {currentExercise.content?.steps &&
                    currentExercise.content.steps.length > 0 ? (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Odpowiedz na każdy z poniższych kroków:
                        </p>
                        {currentExercise.content.steps.map(
                          (step: any, index: number) => (
                            <div key={step.id || index} className="space-y-2">
                              <label className="block">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Krok {step.id || index + 1}:{" "}
                                  {step.instruction || step.task}
                                </span>
                                <textarea
                                  value={answer?.[index] || ""}
                                  onChange={(e) => {
                                    const newAnswer = [
                                      ...(answer ||
                                        Array(
                                          currentExercise.content.steps.length
                                        ).fill("")),
                                    ];
                                    newAnswer[index] = e.target.value;
                                    setAnswer(newAnswer);
                                  }}
                                  className="mt-2 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                  rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400"
                                  rows={2}
                                  placeholder={`Odpowiedź na krok ${
                                    step.id || index + 1
                                  }...`}
                                />
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      // Standardowe pojedyncze pole tekstowe dla zwykłych SHORT_ANSWER
                      <>
                        {currentExercise.content?.hints &&
                          currentExercise.content.hints.length > 0 && (
                            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <p className="font-medium text-sm text-yellow-700 dark:text-yellow-300 mb-1">
                                💡 Wskazówki:
                              </p>
                              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                                {currentExercise.content.hints.map(
                                  (hint: string, idx: number) => (
                                    <span key={idx} className="mr-3">
                                      • {hint}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        <textarea
                          value={answer || ""}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
            rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400"
                          rows={4}
                          placeholder="Wpisz swoją odpowiedź..."
                        />
                      </>
                    )}
                  </>
                )}

                {/* SYNTHESIS NOTE */}
                {currentExercise.type === "SYNTHESIS_NOTE" && (
                  <div className="space-y-4">
                    {/* Temat notatki */}
                    {currentExercise.content?.topic && (
                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        <p className="font-medium text-sm text-indigo-700 dark:text-indigo-300 mb-1">
                          📝 Temat do omówienia:
                        </p>
                        <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
                          {currentExercise.content.topic}
                        </p>
                      </div>
                    )}

                    {/* Wymagania */}
                    {currentExercise.content?.requirements &&
                      currentExercise.content.requirements.length > 0 && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="font-medium text-sm text-green-700 dark:text-green-300 mb-2">
                            ✅ Wymagania - uwzględnij w notatce:
                          </p>
                          <ul className="space-y-1.5">
                            {currentExercise.content.requirements.map(
                              (req: string, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm text-green-800 dark:text-green-200"
                                >
                                  <span className="text-green-600 dark:text-green-400 mt-0.5">
                                    •
                                  </span>
                                  <span>{req}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Pole tekstowe */}
                    <textarea
                      value={answer || ""}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
               rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
               placeholder-gray-500 dark:placeholder-gray-400"
                      rows={8}
                      placeholder="Napisz notatkę syntetyzującą zgodnie z wymaganiami..."
                    />

                    {/* Licznik słów */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Liczba słów:{" "}
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {(answer || "").split(/\s+/).filter(Boolean).length}
                      </span>
                    </div>
                  </div>
                )}

                {/* ESSAY */}
                {currentExercise.type === "ESSAY" && (
                  <div className="space-y-4">
                    {/* Wyświetl tezę jeśli istnieje */}
                    {currentExercise.content?.thesis && (
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-sm text-purple-700 dark:text-purple-300 mb-1">
                          📝 Temat rozprawki:
                        </p>
                        <p className="text-purple-900 dark:text-purple-100 font-medium">
                          {currentExercise.content.thesis}
                        </p>
                      </div>
                    )}

                    {/* Wyświetl strukturę jeśli istnieje */}
                    {currentExercise.content?.structure && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-sm text-blue-700 dark:text-blue-300 mb-2">
                          📋 Wymagana struktura:
                        </p>
                        <div className="space-y-2 text-sm">
                          {currentExercise.content.structure.introduction && (
                            <div className="flex items-start gap-2">
                              <span className="font-semibold text-blue-900 dark:text-blue-100 min-w-[120px]">
                                Wstęp:
                              </span>
                              <span className="text-blue-800 dark:text-blue-200">
                                {currentExercise.content.structure.introduction}
                              </span>
                            </div>
                          )}
                          {currentExercise.content.structure.arguments_for && (
                            <div className="flex items-start gap-2">
                              <span className="font-semibold text-blue-900 dark:text-blue-100 min-w-[120px]">
                                Argumenty ZA:
                              </span>
                              <span className="text-blue-800 dark:text-blue-200">
                                {
                                  currentExercise.content.structure
                                    .arguments_for
                                }
                              </span>
                            </div>
                          )}
                          {currentExercise.content.structure
                            .arguments_against && (
                            <div className="flex items-start gap-2">
                              <span className="font-semibold text-blue-900 dark:text-blue-100 min-w-[120px]">
                                Argumenty PRZECIW:
                              </span>
                              <span className="text-blue-800 dark:text-blue-200">
                                {
                                  currentExercise.content.structure
                                    .arguments_against
                                }
                              </span>
                            </div>
                          )}
                          {currentExercise.content.structure.conclusion && (
                            <div className="flex items-start gap-2">
                              <span className="font-semibold text-blue-900 dark:text-blue-100 min-w-[120px]">
                                Zakończenie:
                              </span>
                              <span className="text-blue-800 dark:text-blue-200">
                                {currentExercise.content.structure.conclusion}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Wyświetl wymagania jeśli istnieją */}
                    {currentExercise.content?.requirements &&
                      currentExercise.content.requirements.length > 0 && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <p className="font-medium text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                            ✅ Wymagania:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {currentExercise.content.requirements.map(
                              (req: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 
                rounded text-xs font-medium"
                                >
                                  {req}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Główne pole tekstowe */}
                    <textarea
                      value={answer || ""}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
        rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
        placeholder-gray-500 dark:placeholder-gray-400"
                      rows={15}
                      placeholder="Napisz wypracowanie zgodnie z wymaganiami..."
                    />

                    {/* Licznik słów z walidacją */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500 dark:text-gray-400">
                        Liczba słów:{" "}
                        {(() => {
                          const wordCount = (answer || "")
                            .split(/\s+/)
                            .filter(Boolean).length;
                          const minWords =
                            currentExercise.content?.wordLimit?.min ||
                            currentExercise.metadata?.wordLimit?.min;
                          const maxWords =
                            currentExercise.content?.wordLimit?.max ||
                            currentExercise.metadata?.wordLimit?.max;

                          let colorClass = "text-gray-600 dark:text-gray-400";
                          if (minWords && maxWords) {
                            if (wordCount < minWords) {
                              colorClass = "text-red-600 dark:text-red-400";
                            } else if (wordCount > maxWords) {
                              colorClass =
                                "text-orange-600 dark:text-orange-400";
                            } else {
                              colorClass = "text-green-600 dark:text-green-400";
                            }
                          }

                          return (
                            <span className={`font-semibold ${colorClass}`}>
                              {wordCount}
                              {minWords &&
                                maxWords &&
                                ` / ${minWords}-${maxWords}`}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Wskaźnik postępu */}
                      {currentExercise.content?.wordLimit?.min && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {(() => {
                            const wordCount = (answer || "")
                              .split(/\s+/)
                              .filter(Boolean).length;
                            const minWords =
                              currentExercise.content.wordLimit.min;
                            const progress = Math.min(
                              100,
                              (wordCount / minWords) * 100
                            );

                            if (wordCount < minWords) {
                              return `Jeszcze ${
                                minWords - wordCount
                              } słów do minimum`;
                            } else {
                              return "✓ Wymóg spełniony";
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex justify-end mt-6">
                  {renderActionButtons()}
                </div>
              </div>
            )}

            {/* Feedback section */}
            {showFeedback && submitMutation.data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Dla zadań CLOSED */}
                {(currentExercise.type === "CLOSED_SINGLE" ||
                  currentExercise.type === "CLOSED_MULTIPLE") && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMutation.data.data.score > 0
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {submitMutation.data.data.score > 0 ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="font-semibold text-green-700 dark:text-green-300">
                            Świetnie! +{submitMutation.data.data.score} pkt
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <span className="font-semibold text-red-700 dark:text-red-300">
                            Niepoprawna odpowiedź
                          </span>
                        </>
                      )}
                    </div>

                    {/* Wyjaśnienie */}
                    {submitMutation.data.data.feedback && (
                      <>
                        {!submitMutation.data.data.feedback.correct &&
                          submitMutation.data.data.feedback
                            .correctAnswerText && (
                            <div className="mt-3 text-sm">
                              <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Poprawna odpowiedź:
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {
                                  submitMutation.data.data.feedback
                                    .correctAnswerText
                                }
                              </p>
                            </div>
                          )}

                        {submitMutation.data.data.feedback.explanation && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm">
                            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Wyjaśnienie:
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {submitMutation.data.data.feedback.explanation}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* DLA PYTAŃ OTWARTYCH - SHORT_ANSWER, SYNTHESIS_NOTE, ESSAY */}
                {(currentExercise.type === "SHORT_ANSWER" ||
                  currentExercise.type === "SYNTHESIS_NOTE" ||
                  currentExercise.type === "ESSAY") &&
                  (() => {
                    // Pobierz dane AI z odpowiedniej lokalizacji
                    const aiData =
                      submitMutation.data?.data?.feedback ||
                      submitMutation.data?.data?.assessment ||
                      submitMutation.data?.data;

                    // Jeśli nie ma danych AI, nie renderuj nic
                    if (!aiData) return null;

                    return (
                      <div
                        className={`p-4 rounded-lg ${
                          aiData.score > 0
                            ? aiData.isPartiallyCorrect
                              ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                              : "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        }`}
                      >
                        {/* Nagłówek z wynikiem */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {aiData.score > 0 ? (
                              aiData.isPartiallyCorrect ? (
                                <>
                                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                                    Częściowo poprawna odpowiedź
                                  </span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                  <span className="font-semibold text-green-700 dark:text-green-300">
                                    Świetna odpowiedź!
                                  </span>
                                </>
                              )
                            ) : (
                              <>
                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                <span className="font-semibold text-red-700 dark:text-red-300">
                                  Niepoprawna odpowiedź
                                </span>
                              </>
                            )}
                          </div>
                          <span className="text-lg font-bold">
                            {aiData.score ?? 0}/{aiData.maxScore ?? 2} pkt
                          </span>
                        </div>

                        {/* Główny feedback */}
                        {aiData.feedback && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {typeof aiData.feedback === "string"
                                ? aiData.feedback
                                : aiData.feedback.message ||
                                  "Brak szczegółowego feedbacku"}
                            </p>
                          </div>
                        )}

                        {/* Poprawne elementy (jeśli są) */}
                        {aiData.correctElements &&
                          aiData.correctElements.length > 0 && (
                            <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                              <p className="font-medium text-green-700 dark:text-green-300 mb-1 text-sm">
                                ✓ Poprawne elementy:
                              </p>
                              <ul className="space-y-1">
                                {aiData.correctElements.map(
                                  (element: string, idx: number) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-green-600 dark:text-green-400 ml-4"
                                    >
                                      • {element}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* Brakujące elementy (jeśli są) */}
                        {aiData.missingElements &&
                          aiData.missingElements.length > 0 && (
                            <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                              <p className="font-medium text-red-700 dark:text-red-300 mb-1 text-sm">
                                ✗ Brakujące elementy:
                              </p>
                              <ul className="space-y-1">
                                {aiData.missingElements.map(
                                  (element: string, idx: number) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-red-600 dark:text-red-400 ml-4"
                                    >
                                      • {element}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* Przykładowa poprawna odpowiedź */}
                        {aiData.correctAnswer && (
                          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <p className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
                              📚 Przykładowa poprawna odpowiedź:
                            </p>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                {aiData.correctAnswer}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Sugestie poprawy (jeśli są) */}
                        {aiData.suggestions &&
                          aiData.suggestions.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
                                💡 Wskazówki na przyszłość:
                              </p>
                              <ul className="space-y-1">
                                {aiData.suggestions.map(
                                  (suggestion: string, idx: number) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-gray-600 dark:text-gray-400 ml-4"
                                    >
                                      • {suggestion}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* Dla wypracowań - szczegółowe wyniki */}
                        {currentExercise.type === "ESSAY" &&
                          aiData.detailedFeedback && (
                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="grid grid-cols-2 gap-3 mb-3">
                                {aiData.formalScore !== undefined && (
                                  <div className="text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Wymogi formalne:
                                    </span>
                                    <span className="ml-2 font-semibold">
                                      {aiData.formalScore}/1
                                    </span>
                                  </div>
                                )}
                                {aiData.literaryScore !== undefined && (
                                  <div className="text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Kompetencje literackie:
                                    </span>
                                    <span className="ml-2 font-semibold">
                                      {aiData.literaryScore}/16
                                    </span>
                                  </div>
                                )}
                                {aiData.compositionScore !== undefined && (
                                  <div className="text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Kompozycja:
                                    </span>
                                    <span className="ml-2 font-semibold">
                                      {aiData.compositionScore}/7
                                    </span>
                                  </div>
                                )}
                                {aiData.languageScore !== undefined && (
                                  <div className="text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Styl i język:
                                    </span>
                                    <span className="ml-2 font-semibold">
                                      {aiData.languageScore}/11
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })()}

                {/* Przycisk następnego zadania */}
                <div className="flex justify-end">
                  <button
                    onClick={goToNextExercise}
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-700 dark:hover:bg-blue-600 
                         flex items-center gap-2 transition-colors"
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
          <div className="flex justify-between items-center mt-6">
            {renderActionButtons()}
          </div>
        </div>
      )}
      {/* Exit Confirmation Dialog */}
      <ConfirmExitDialog
        isOpen={showExitDialog}
        sessionStats={sessionStats}
        onConfirm={async () => {
          setShowExitDialog(false);
          await sessionExit.confirmAndExit(
            sessionExit.nextLocation || undefined
          );
        }}
        onCancel={() => {
          setShowExitDialog(false);
          sessionExit.cancelExit();
        }}
      />
      {/* Exercise Browser Modal */}
      {showExerciseBrowser && (
        <ExerciseBrowser
          onSelectExercise={loadSelectedExercise}
          onClose={() => setShowExerciseBrowser(false)}
        />
      )}
    </div>
  );
};

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

  const { data: levelProgress } = useQuery({
    queryKey: ["difficulty-progress"],
    queryFn: () =>
      api.get("/api/learning/difficulty-progress").then((r) => r.data),
    refetchInterval: 10000,
    staleTime: 5000,
  });

  useEffect(() => {
    if (levelProgress && selectedDifficulties.length > 0) {
      const validDifficulties = selectedDifficulties.filter(
        (d) => d <= levelProgress.currentMaxDifficulty
      );
      if (validDifficulties.length !== selectedDifficulties.length) {
        setSelectedDifficulties(validDifficulties);
        setLocalFilters({
          ...localFilters,
          difficulty:
            validDifficulties.length > 0 ? validDifficulties : undefined,
        });
      }
    }
  }, [levelProgress]);

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

  useEffect(() => {
    onFiltersChange(localFilters);
    fetchAvailableCount(localFilters);
  }, [localFilters]);

  const handleCategoryChange = (category: string | undefined) => {
    const newFilters = {
      ...localFilters,
      category,
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
    if (levelProgress && level > levelProgress.currentMaxDifficulty) {
      toast.error(`Poziom ${level} jest zablokowany! Zdobądź więcej punktów.`);
      return;
    }

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Filtry zadań
          </h3>

          {isCountLoading || isLoading ? (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              <span className="inline-block animate-pulse">Ładowanie...</span>
            </span>
          ) : availableCount !== null ? (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                availableCount > 0
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
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
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 
                     dark:hover:text-gray-200 flex items-center gap-1"
            disabled={isLoading}
          >
            <X className="w-3 h-3" />
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* ✅ KATEGORIE - pełny dark mode */}
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
                ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-300"
            } disabled:opacity-50`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ✅ EPOKI - pełny dark mode */}
      {localFilters.category === "HISTORICAL_LITERARY" && (
        <div className="mb-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-2">
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
                    ? "bg-purple-600 dark:bg-purple-500 text-white"
                    : "bg-white dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-gray-700 dark:text-gray-300"
                } disabled:opacity-50`}
              >
                {epoch.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✅ TYP ZADANIA - pełny dark mode */}
      <div className="mb-3">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Typ zadania:
        </p>
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
                  ? "bg-blue-600 dark:bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              } disabled:opacity-50`}
            >
              <span>{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ POZIOM TRUDNOŚCI - pełny dark mode */}
      <div>
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Poziom trudności:
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => {
            const isLocked =
              levelProgress && level > levelProgress.currentMaxDifficulty;

            return (
              <button
                key={level}
                onClick={() => handleDifficultyToggle(level)}
                disabled={isLoading || isLocked}
                className={`px-3 py-2 rounded transition-colors relative ${
                  isLocked
                    ? "bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed"
                    : selectedDifficulties.includes(level)
                    ? "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 dark:border-yellow-400"
                    : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                } border`}
                title={
                  isLocked
                    ? `Odblokuj zdobywając ${
                        levelProgress?.levels[level - 1]?.required || "?"
                      } pkt`
                    : undefined
                }
              >
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 dark:bg-black/20 rounded">
                    <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <div className={isLocked ? "opacity-30" : ""}>
                  <span
                    className={
                      selectedDifficulties.includes(level)
                        ? "text-yellow-500 dark:text-yellow-400"
                        : "text-gray-400 dark:text-gray-500"
                    }
                  >
                    {"⭐".repeat(level)}
                  </span>
                  <div className="text-xs mt-1 text-gray-700 dark:text-gray-300">
                    {level === 1 && "Bardzo łatwe"}
                    {level === 2 && "Łatwe"}
                    {level === 3 && "Średnie"}
                    {level === 4 && "Trudne"}
                    {level === 5 && "Bardzo trudne"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ✅ AKTYWNE FILTRY - pełny dark mode */}
      {hasFilters && (
        <div className="mt-3 pt-3 border-t dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Aktywne filtry:
          </p>
          <div className="flex flex-wrap gap-1">
            {localFilters.category && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                {
                  CATEGORIES.find((c) => c.value === localFilters.category)
                    ?.label
                }
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SessionStart: React.FC<{
  onStart: () => void;
  stats: any;
}> = ({ onStart, stats }) => {
  const navigate = useNavigate();
  const [activeSessions, setActiveSessions] = useState<any[]>([]);

  // POBIERZ STATUS SUBSKRYPCJI
  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
  });

  // Pobierz aktywne sesje
  useEffect(() => {
    api.get("/api/learning/active-sessions").then((r) => {
      setActiveSessions(r.data);
    });
  }, []);

  const isFreeUser = subscription?.plan === "FREE";

  return (
    <div className="max-w-6xl mx-auto p-6">
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
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-6">
        <h1 className="text-3xl font-bold mb-4">
          Zaczynajmy dzisiejszą naukę!
        </h1>
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

        {/* BLOKADA DLA FREE USERS */}
        {isFreeUser ? (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-500/20 backdrop-blur-sm border border-yellow-300/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-yellow-200 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-yellow-100 text-lg mb-1">
                    Sesje nauki dostępne tylko w Premium
                  </p>
                  <p className="text-yellow-50 text-sm">
                    Aby rozpocząć sesję nauki, potrzebujesz planu Premium.
                    Odblouj pełny dostęp do AI i wszystkich funkcji
                    edukacyjnych.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/subscription")}
              className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                       text-gray-900 rounded-xl hover:from-yellow-500 hover:to-orange-600 
                       font-bold flex items-center justify-center gap-3 transition-all
                       shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Crown className="w-6 h-6" />
              Ulepsz do Premium - 49 zł/miesiąc
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onStart}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 
                     font-semibold flex items-center gap-2 transition-colors"
          >
            <Play className="w-5 h-5" />
            Rozpocznij sesję nauki ({SESSION_LIMIT} zadań)
          </button>
        )}
      </div>

      {/*!isFreeUser && stats?.activeSessions?.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
            Nieukończone sesje
          </h3>
          <div className="space-y-2">
            {stats.activeSessions.map((session: any) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 
                     rounded-lg border border-yellow-200 dark:border-yellow-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Sesja z{" "}
                    {new Date(session.startedAt).toLocaleDateString("pl-PL")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ukończono {session.completed} z 20 zadań • {session.correct}{" "}
                    poprawnych
                  </p>
                </div>
                <button
                  onClick={onStart}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg 
                     hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  Kontynuuj
                </button>
              </div>
            ))}
          </div>
        </div>
      )}*/}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Twoje ostatnie sesje
          </h2>

          {stats?.recentSessions?.length > 0 && (
            <button
              onClick={() => navigate("/sessions")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                   dark:hover:text-blue-300 font-medium flex items-center gap-1"
            >
              Zobacz wszystkie
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
        <RecentSessions sessions={stats?.recentSessions?.slice(0, 5) || []} />
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
    className={`flex items-center gap-2 ${
      highlight
        ? "text-orange-600 dark:text-orange-400"
        : "text-gray-700 dark:text-gray-300"
    }`}
  >
    <div className={highlight ? "" : "text-gray-500 dark:text-gray-400"}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const RecentSessions: React.FC<{ sessions: any[] }> = ({ sessions }) => (
  <div className="space-y-3">
    {sessions.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
        Brak poprzednich sesji. Rozpocznij pierwszą!
      </p>
    ) : (
      sessions.map((session: any, index: number) => (
        <div
          key={`session-${index}`}
          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {session.date}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {session.completed} zadań, {session.correctRate}% poprawnych
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-green-600 dark:text-green-400">
              +{session.points} pkt
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {session.duration} min
            </p>
          </div>
        </div>
      ))
    )}
  </div>
);

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
