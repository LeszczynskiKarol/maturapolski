// frontend/src/features/exams/ExamList.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  FileText,
  Clock,
  Award,
  Play,
  RotateCw,
  BookOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Exam {
  id: string;
  title: string;
  type: string;
  year: number;
  duration: number;
  totalPoints: number;
  attemptCount: number;
  bestScore: number | null;
  hasActiveSession: boolean;
  sections: any[];
  sessions: any[];
}

export const ExamList: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: exams,
    isLoading,
    refetch,
  } = useQuery<Exam[]>({
    queryKey: ["available-exams"],
    queryFn: () => api.get("/api/exams/available").then((r) => r.data),
  });

  const startExamMutation = useMutation({
    mutationFn: (examId: string) => api.post(`/api/exams/${examId}/start`),
    onSuccess: (response) => {
      const data = response.data;

      // Sprawdź czy to egzamin maturalny
      if (data.redirectTo) {
        navigate(data.redirectTo);
      } else {
        navigate(`/exam/session/${data.sessionId}`);
      }

      toast.success("Rozpoczęto egzamin!");
    },
    onError: (error: any) => {
      if (error.response?.data?.sessionId) {
        // Jest aktywna sesja
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Egzaminy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Sprawdź swoją wiedzę w warunkach egzaminacyjnych
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                     border border-gray-200 dark:border-gray-700 overflow-hidden
                     hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {exam.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exam.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {exam.totalPoints} pkt
                    </span>
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
                  {exam.bestScore && (
                    <span className="font-medium text-green-600">
                      Najlepszy wynik: {exam.bestScore}%
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6">
              {exam.hasActiveSession ? (
                <button
                  onClick={() => {
                    const activeSession = exam.sessions.find(
                      (s) => s.status === "IN_PROGRESS"
                    );
                    if (activeSession) {
                      // Sprawdź czy to maturalny
                      if (exam.title.includes("Maturalny")) {
                        navigate(`/exam/mature/${activeSession.id}`);
                      } else {
                        navigate(`/exam/session/${activeSession.id}`);
                      }
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 
                           px-4 py-2 bg-yellow-500 text-white rounded-lg
                           hover:bg-yellow-600 transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  Kontynuuj egzamin
                </button>
              ) : (
                <button
                  onClick={() => startExamMutation.mutate(exam.id)}
                  disabled={startExamMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 
                           px-4 py-2 bg-purple-600 text-white rounded-lg
                           hover:bg-purple-700 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {startExamMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Rozpoczynanie...
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
                {exam.sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className="text-xs text-gray-600 dark:text-gray-400 flex justify-between"
                  >
                    <span>{section.title}</span>
                    <span>{section.questions.length} zadań</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
