// frontend/src/features/exams/MatureExamViewer.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  Send,
  FileText,
  Home,
  Brain,
  AlertCircle,
  Loader2,
  BookOpen,
} from "lucide-react";
import { toast } from "react-hot-toast";

export const MatureExamViewer: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Pobierz sesję egzaminu
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["mature-session", sessionId],
    queryFn: () =>
      api.get(`/api/exams/session/${sessionId}`).then((r) => r.data),
    refetchInterval: 60000,
  });

  // Pobierz pytania dla dynamicznego egzaminu
  const { data: dynamicQuestions, isLoading: questionsLoading } = useQuery({
    queryKey: ["exam-questions-dynamic", sessionId],
    queryFn: async () => {
      if (!session?.assessment?.questionsMetadata) return [];

      const questionIds = session.assessment.questionsMetadata
        .map((m: any) => m.exerciseId)
        .filter(Boolean); // Filtruj null/undefined

      if (questionIds.length === 0) return [];

      try {
        const response = await api.post("/api/exams/get-questions", {
          questionIds,
        });
        return response.data;
      } catch (error) {
        console.error("Failed to load questions:", error);
        return [];
      }
    },
    enabled: !!session?.assessment?.questionsMetadata,
  });

  // Timer
  useEffect(() => {
    if (session?.remainingMinutes) {
      setTimeLeft(session.remainingMinutes * 60);
    }
  }, [session?.remainingMinutes]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev <= 1) {
          handleFinish();
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const saveAnswerMutation = useMutation({
    mutationFn: (data: { questionId: string; answer: any }) =>
      api.post(`/api/exams/session/${sessionId}/answer`, data),
    onSuccess: () => {
      // Cichy zapis
    },
  });

  const finishMutation = useMutation({
    mutationFn: () => api.post(`/api/exams/session/${sessionId}/finish`),
    onSuccess: () => {
      toast.success("Egzamin zakończony! Trwa ocenianie przez AI...");
      navigate(`/exam/results/${sessionId}`);
    },
    onError: () => {
      toast.error("Błąd podczas kończenia egzaminu");
    },
  });

  const isLoading = sessionLoading || questionsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Ładowanie egzaminu maturalnego...
          </p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Sprawdź czy to egzamin dynamiczny
  const isDynamic =
    session.isIntelligent ||
    session.assessment?.isDynamic ||
    session.exam?.title?.includes("Dynamiczny") ||
    false;

  // Pobierz wszystkie zadania
  // Pobierz wszystkie zadania
  let allTasks: any[] = [];

  if (isDynamic && dynamicQuestions && dynamicQuestions.length > 0) {
    // DYNAMICZNE PYTANIA - używamy pobranych z bazy
    const metadata = session.assessment.questionsMetadata;

    allTasks = metadata.map((meta: any, idx: number) => {
      const fullQuestion = dynamicQuestions.find(
        (q: any) => q.id === meta.exerciseId
      );

      return {
        id: meta.exerciseId,
        exerciseId: meta.exerciseId,
        type: fullQuestion?.type || meta.type,
        points: meta.points,
        section: getSectionTitle(meta.section),
        order: idx + 1,
        question: fullQuestion?.question || `Zadanie ${idx + 1}`,
        content: fullQuestion?.content || {},
        difficulty: fullQuestion?.difficulty,
        correctAnswer: fullQuestion?.correctAnswer,
      };
    });
  } else if (!isDynamic) {
    // STATYCZNE PYTANIA
    allTasks = session.exam.sections
      .sort((a: any, b: any) => a.order - b.order)
      .flatMap((s: any) =>
        s.questions
          .sort((a: any, b: any) => a.order - b.order)
          .map((q: any) => ({
            ...q,
            section: s.title,
            question:
              q.exercise?.question || q.question || `Zadanie ${q.order}`,
            content: q.exercise?.content || q.content || {},
          }))
      );
  }

  // PRZENIEŚ TEN WARUNEK TUTAJ - PO ZAŁADOWANIU ZADAŃ!
  if (allTasks.length === 0) {
    // Jeśli to egzamin dynamiczny ale pytania się jeszcze nie załadowały
    if (isDynamic && !dynamicQuestions) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Przygotowywanie pytań egzaminacyjnych...
            </p>
          </div>
        </div>
      );
    }

    // Jeśli naprawdę brak zadań
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Brak dostępnych zadań w tym egzaminie
          </p>
          <button
            onClick={() => navigate("/exams")}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Wróć do listy egzaminów
          </button>
        </div>
      </div>
    );
  }

  const currentTask = allTasks[currentTaskIndex];
  const progressPercent = ((currentTaskIndex + 1) / allTasks.length) * 100;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (answer: any) => {
    const questionId = currentTask.exerciseId || currentTask.id;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    // Auto-save
    saveAnswerMutation.mutate({
      questionId,
      answer,
    });
  };

  const handleFinish = () => {
    if (confirm("Czy na pewno chcesz zakończyć egzamin maturalny?")) {
      finishMutation.mutate();
    }
  };

  const renderTask = () => {
    if (!currentTask) {
      return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 dark:text-gray-400">
            Ładowanie zadania...
          </p>
        </div>
      );
    }

    const taskType = currentTask.type;
    const content = currentTask.content || {};
    const currentAnswer = answers[currentTask.exerciseId || currentTask.id];

    switch (taskType) {
      case "SHORT_ANSWER":
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                  Krótka odpowiedź
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {currentTask.points} pkt
                </span>
                {currentTask.difficulty && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {"⭐".repeat(currentTask.difficulty)}
                  </span>
                )}
              </div>

              <p className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
                {currentTask.question}
              </p>

              <textarea
                value={currentAnswer || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg resize-none"
                placeholder="Twoja odpowiedź..."
              />
            </div>
          </div>
        );

      case "SYNTHESIS_NOTE":
        const text = currentAnswer || "";
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const minWords = content.wymagania?.minSlow || 60;
        const maxWords = content.wymagania?.maxSlow || 90;

        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs font-medium">
                  Notatka syntetyzująca
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {currentTask.points} pkt
                </span>
              </div>

              <p className="font-medium text-lg mb-2 text-gray-900 dark:text-white">
                {currentTask.question}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Wymagania: {minWords}-{maxWords} słów
              </p>

              <textarea
                value={text}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg resize-none"
                placeholder="Napisz notatkę syntetyzującą..."
              />

              <div
                className={`text-sm mt-2 ${
                  wordCount < minWords
                    ? "text-red-500"
                    : wordCount > maxWords
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                Liczba słów: {wordCount}/{minWords}-{maxWords}
              </div>
            </div>
          </div>
        );

      case "CLOSED_SINGLE":
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                  Jednokrotny wybór
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {currentTask.points} pkt
                </span>
              </div>

              <p className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
                {currentTask.question}
              </p>

              <div className="space-y-2">
                {(
                  content.options || [
                    "Opcja A",
                    "Opcja B",
                    "Opcja C",
                    "Opcja D",
                  ]
                ).map((option: string, idx: number) => (
                  <label
                    key={idx}
                    className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={idx}
                      checked={currentAnswer === idx}
                      onChange={() => handleAnswer(idx)}
                      className="mr-3"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "CLOSED_MULTIPLE":
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium">
                  Wielokrotny wybór
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {currentTask.points} pkt
                </span>
              </div>

              <p className="font-medium text-lg mb-2 text-gray-900 dark:text-white">
                {currentTask.question}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Zaznacz wszystkie poprawne odpowiedzi
              </p>

              <div className="space-y-2">
                {(content.options || []).map((option: string, idx: number) => (
                  <label
                    key={idx}
                    className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={(currentAnswer || []).includes(idx)}
                      onChange={(e) => {
                        const current = currentAnswer || [];
                        if (e.target.checked) {
                          handleAnswer([...current, idx]);
                        } else {
                          handleAnswer(
                            current.filter((i: number) => i !== idx)
                          );
                        }
                      }}
                      className="mr-3"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "ESSAY":
        const essayText = currentAnswer || "";
        const essayWordCount = essayText.split(/\s+/).filter(Boolean).length;
        const minEssayWords = content.wymagania?.minSlow || 400;

        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                  Wypracowanie
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {currentTask.points} pkt
                </span>
              </div>

              <p className="font-medium text-lg mb-2 text-gray-900 dark:text-white">
                {currentTask.question}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Minimalna liczba słów: {minEssayWords}
              </p>

              <textarea
                value={essayText}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg resize-none"
                placeholder="Napisz wypracowanie..."
              />

              <div
                className={`text-sm mt-2 ${
                  essayWordCount < minEssayWords
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                Liczba słów: {essayWordCount}/{minEssayWords}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
              {currentTask.question}
            </p>
            <textarea
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg resize-none"
              placeholder="Twoja odpowiedź..."
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                {session.exam.title.replace(" (Dynamiczny)", "")}
                {isDynamic && (
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs">
                    <Brain className="w-3 h-3 inline mr-1" />
                    AI
                  </span>
                )}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentTask?.section}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded ${
                    timeLeft < 600
                      ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              )}

              <button
                onClick={() => {
                  if (confirm("Czy na pewno chcesz opuścić egzamin?")) {
                    navigate("/exams");
                  }
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Home className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 dark:text-gray-300">
              Zadanie {currentTaskIndex + 1} z {allTasks.length}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {currentTask?.points} pkt
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Alert dla dynamicznego egzaminu */}
      {isDynamic && currentTaskIndex === 0 && (
        <div className="max-w-4xl mx-auto mt-4 px-4">
          <div className="p-3 bg-gradient-to-r from-purple-50 dark:from-purple-900/20 to-indigo-50 dark:to-indigo-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div className="text-sm text-purple-800 dark:text-purple-300">
                <p className="font-semibold mb-1">
                  Egzamin z inteligentnym doborem pytań!
                </p>
                <p>
                  Twój zestaw zadań został spersonalizowany na podstawie Twojej
                  historii nauki. Każdy student otrzymuje unikalny zestaw
                  dostosowany do swojego poziomu.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Zadanie {currentTaskIndex + 1}
          </h2>
        </div>

        {renderTask()}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() =>
              setCurrentTaskIndex(Math.max(0, currentTaskIndex - 1))
            }
            disabled={currentTaskIndex === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
                     text-gray-700 dark:text-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Poprzednie
          </button>

          {currentTaskIndex === allTasks.length - 1 ? (
            <button
              onClick={handleFinish}
              disabled={finishMutation.isPending}
              className="flex items-center gap-2 px-6 py-2 
                       bg-gradient-to-r from-green-600 to-emerald-600 
                       text-white rounded-lg hover:from-green-700 hover:to-emerald-700
                       disabled:opacity-50"
            >
              {finishMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI ocenia odpowiedzi...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Zakończ egzamin
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentTaskIndex(currentTaskIndex + 1)}
              className="flex items-center gap-2 px-4 py-2 
                       bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Następne
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Question navigator */}
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Nawigacja po zadaniach:
          </p>
          <div className="grid grid-cols-10 gap-2">
            {allTasks.map((task, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTaskIndex(idx)}
                className={`p-2 text-sm rounded transition-colors ${
                  idx === currentTaskIndex
                    ? "bg-purple-600 text-white"
                    : answers[task.exerciseId || task.id]
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                title={`Zadanie ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs">
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <span className="w-3 h-3 bg-purple-600 rounded"></span>
              Aktualne
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <span className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded"></span>
              Odpowiedziane
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <span className="w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded"></span>
              Bez odpowiedzi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function getSectionTitle(sectionKey: string): string {
  switch (sectionKey) {
    case "arkusz1_czesc1":
      return "Arkusz 1 - Część 1: Język polski w użyciu";
    case "arkusz1_czesc2":
      return "Arkusz 1 - Część 2: Test historycznoliteracki";
    case "arkusz2":
      return "Arkusz 2 - Wypracowanie";
    default:
      return "Arkusz egzaminacyjny";
  }
}
