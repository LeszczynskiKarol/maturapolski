// frontend/src/features/exams/ExamList.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  FileText,
  Clock,
  Award,
  X,
  Play,
  RotateCw,
  BookOpen,
  AlertCircle,
  Loader2,
  Brain,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Exam {
  id: string;
  title: string;
  type: string;
  year: number;
  duration: number;
  totalPoints?: number;
  attemptCount: number;
  bestScore: number | null;
  hasActiveSession: boolean;
  sections: any[];
  sessions: any[];
  isDynamic?: boolean; // Nowe pole
}

export const ExamList: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: exams,
    isLoading,
    refetch,
    error,
  } = useQuery<Exam[]>({
    queryKey: ["available-exams"],
    queryFn: async () => {
      console.log("🔍 Fetching exams from API...");
      try {
        const response = await api.get("/api/exams/available");
        console.log("✅ Exams API response:", response.data);
        console.log("Number of exams:", response.data?.length || 0);

        // Debug każdy egzamin
        response.data?.forEach((exam: any) => {
          console.log(`- ${exam.title} (ID: ${exam.id})`);
        });

        return response.data;
      } catch (error) {
        console.error("❌ Error fetching exams:", error);
        throw error;
      }
    },
  });

  console.log("Component state:", {
    exams,
    isLoading,
    error,
    examsCount: exams?.length,
  });

  if (error) {
    console.error("Query error:", error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 p-4 rounded">
          <p className="text-red-600">Błąd pobierania egzaminów:</p>
          <pre className="text-xs mt-2">{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }

  const startExamMutation = useMutation({
    mutationFn: (examId: string) => api.post(`/api/exams/${examId}/start`),
    onSuccess: (response, examId) => {
      const data = response.data;

      // Znajdź egzamin żeby sprawdzić czy to maturalny
      const exam = exams?.find((e) => e.id === examId);
      const isMaturalny = exam?.title.includes("Maturalny");

      if (data.isIntelligent) {
        toast.success("Przygotowano unikalny zestaw pytań!");
      } else {
        toast.success("Rozpoczęto egzamin!");
      }

      // Używaj MatureExamViewer dla egzaminów maturalnych
      if (isMaturalny) {
        navigate(`/exam/mature/${data.sessionId}`);
      } else {
        navigate(`/exam/session/${data.sessionId}`);
      }
    },
    onError: (error: any) => {
      if (error.response?.data?.sessionId) {
        toast.error("Masz już rozpoczętą sesję tego egzaminu");
        navigate(`/exam/session/${error.response.data.sessionId}`);
      } else {
        toast.error("Błąd rozpoczynania egzaminu");
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!exams || exams.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Brak dostępnych egzaminów
          </h2>
          <p className="text-gray-500">
            Egzaminy pojawią się tutaj, gdy zostaną dodane przez nauczyciela
          </p>
        </div>
      </div>
    );
  }

  const dynamicExams = exams;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          Egzaminy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Sprawdź swoją wiedzę w warunkach egzaminacyjnych
        </p>
      </div>

      {/* Sekcja: Egzaminy z inteligentnym doborem pytań */}
      {dynamicExams.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Egzaminy z inteligentnym doborem pytań
            </h2>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
              AI
            </span>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg mb-4 border border-purple-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
              <p className="text-sm text-purple-800">
                Każde podejście generuje unikalny zestaw pytań dostosowany do
                Twojego poziomu. System analizuje historię odpowiedzi i unika
                powtórzeń.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                isDynamic={true} // Wszystkie są dynamiczne
                onStart={() => startExamMutation.mutate(exam.id)}
                isStarting={startExamMutation.isPending}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Komponent karty egzaminu
const ExamCard: React.FC<{
  exam: Exam;
  isDynamic: boolean;
  onStart: () => void;
  isStarting: boolean;
}> = ({ exam, isDynamic, onStart, isStarting }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                 border overflow-hidden hover:shadow-lg transition-all
                 ${
                   isDynamic
                     ? "border-purple-300 bg-gradient-to-br from-white to-purple-50"
                     : "border-gray-200 dark:border-gray-700"
                 }`}
    >
      {/* Header */}
      {isDynamic && (
        <div className="p-1 bg-gradient-to-r from-purple-500 to-indigo-500">
          <div className="flex items-center justify-center gap-2 text-white text-xs font-medium">
            <Brain className="w-3 h-3" />
            Inteligentny dobór pytań
          </div>
        </div>
      )}

      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {exam.title.replace(" (Dynamiczny)", "")}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {exam.duration} min
              </span>
              {!isDynamic && exam.totalPoints && (
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {exam.totalPoints} pkt
                </span>
              )}
              {isDynamic && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Adaptacyjny
                </span>
              )}
            </div>
          </div>

          {exam.type === "PODSTAWOWY" && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              Podstawowy
            </span>
          )}
          {exam.type === "ROZSZERZONY" && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
              Rozszerzony
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      {exam.attemptCount > 0 && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Liczba podejść: {exam.attemptCount}
            </span>
            {exam.bestScore !== null && (
              <span className="font-medium text-green-600">
                Najlepszy: {exam.bestScore}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-6">
        {exam.hasActiveSession ? (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(
                  `/exam/mature/${
                    exam.sessions.find((s) => s.status === "IN_PROGRESS")?.id
                  }`
                )
              }
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
               text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 
               transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 inline mr-2" />
              Kontynuuj egzamin
            </button>
            <button
              onClick={async () => {
                if (
                  confirm("Czy na pewno chcesz zakończyć aktualny egzamin?")
                ) {
                  const sessionId = exam.sessions.find(
                    (s) => s.status === "IN_PROGRESS"
                  )?.id;
                  if (sessionId) {
                    try {
                      // ZMIEŃ Z /abandon NA /finish !!!
                      await api.post(`/api/exams/session/${sessionId}/finish`);
                      toast.success("Egzamin został zakończony");
                      window.location.reload();
                    } catch (error) {
                      toast.error("Błąd podczas kończenia egzaminu");
                    }
                  }
                }
              }}
              className="px-4 py-3 bg-red-600 text-white rounded-lg 
               hover:bg-red-700 transition-all"
              title="Zakończ egzamin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onStart}
            disabled={isStarting}
            className={`w-full flex items-center justify-center gap-2 
                     px-4 py-2 text-white rounded-lg transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${
                       isDynamic
                         ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                         : "bg-blue-600 hover:bg-blue-700"
                     }`}
          >
            {isStarting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isDynamic
                  ? "Przygotowywanie unikalnych pytań..."
                  : "Rozpoczynanie..."}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Rozpocznij egzamin
              </>
            )}
          </button>
        )}

        {/* Sections preview */}
        <div className="mt-4 space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Struktura egzaminu:
          </p>
          {exam.sections.map((section: any, idx: number) => (
            <div
              key={section.id || idx}
              className="text-xs text-gray-600 dark:text-gray-400 flex justify-between"
            >
              <span>{section.title}</span>
              {isDynamic ? (
                <span className="text-purple-600">Dynamiczne</span>
              ) : (
                <span>{section.questions?.length || 0} zadań</span>
              )}
            </div>
          ))}
        </div>

        {isDynamic && (
          <div className="mt-3 p-2 bg-purple-50 rounded text-xs text-purple-700">
            <p>✨ Każde podejście = nowy zestaw pytań</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamList;
