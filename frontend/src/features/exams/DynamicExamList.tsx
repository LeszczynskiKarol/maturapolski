// frontend/src/features/exams/DynamicExamList.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Brain,
  Clock,
  Target,
  Play,
  RotateCw,
  AlertCircle,
  Loader2,
  BarChart,
  TrendingUp,
  Info,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface ExamType {
  id: string;
  title: string;
  type: "PODSTAWOWY" | "ROZSZERZONY";
  duration: number;
  estimatedPoints: number;
  description: string;
  structure: {
    sections: Array<{
      name: string;
      questionCount: number;
      estimatedPoints: number;
    }>;
  };
  attemptCount?: number;
  bestScore?: number | null;
  hasActiveSession?: boolean;
  lastActiveSessionId?: string;
}

export const DynamicExamList: React.FC = () => {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);

  const { data: examTypes, isLoading } = useQuery<ExamType[]>({
    queryKey: ["exam-types"],
    queryFn: () => api.get("/api/exams/available-types").then((r) => r.data),
  });

  const { data: userStats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: () => api.get("/api/exams/user-stats").then((r) => r.data),
    enabled: showStats,
  });

  const startExam = useMutation({
    mutationFn: (examTypeId: string) =>
      api.post(`/api/exams/start-dynamic/${examTypeId}`),
    onSuccess: (response) => {
      const data = response.data;
      toast.success("Przygotowano unikalny zestaw pytań!");
      navigate(`/exam/session/${data.sessionId}`);
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Egzaminy Maturalne 2025
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            System inteligentnego doboru pytań - każde podejście to unikalny
            zestaw
          </p>
        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 
                   rounded-lg hover:bg-gray-50 transition-colors"
        >
          <BarChart className="w-4 h-4" />
          {showStats ? "Ukryj" : "Pokaż"} statystyki
        </button>
      </div>

      {/* Alert o dynamicznym systemie */}
      <div
        className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 
                    rounded-xl border border-purple-200"
      >
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">
              Inteligentny System Egzaminacyjny
            </h3>
            <p className="text-sm text-purple-700">
              Każde podejście do egzaminu generuje unikalny zestaw pytań,
              dostosowany do Twojego poziomu i unikający powtórzeń z poprzednich
              sesji. System analizuje Twoją historię i dobiera optymalne
              pytania.
            </p>
          </div>
        </div>
      </div>

      {/* Statystyki użytkownika */}
      {showStats && userStats && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rozwiązane pytania
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {userStats.totalUsed}
            </p>
            <p className="text-xs text-gray-500 mt-1">z puli ~500 pytań</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ostatnie 7 dni
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              {userStats.recentlyUsed}
            </p>
            <p className="text-xs text-gray-500 mt-1">niedostępne teraz</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Często używane
            </p>
            <p className="text-2xl font-bold text-orange-600">
              {userStats.frequentlyUsed}
            </p>
            <p className="text-xs text-gray-500 mt-1">niższy priorytet</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Świeże pytania
            </p>
            <p className="text-2xl font-bold text-green-600">
              {Math.max(0, 500 - userStats.totalUsed)}+
            </p>
            <p className="text-xs text-gray-500 mt-1">jeszcze nieużywane</p>
          </div>
        </div>
      )}

      {/* Karty egzaminów */}
      <div className="grid gap-6 md:grid-cols-2">
        {examTypes?.map((examType) => (
          <ExamTypeCard
            key={examType.id}
            examType={examType}
            onStart={() => startExam.mutate(examType.id)}
            isStarting={startExam.isPending}
          />
        ))}
      </div>
    </div>
  );
};

// Karta typu egzaminu
const ExamTypeCard: React.FC<{
  examType: ExamType;
  onStart: () => void;
  isStarting: boolean;
}> = ({ examType, onStart, isStarting }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border 
                   ${
                     examType.type === "ROZSZERZONY"
                       ? "border-purple-300"
                       : "border-blue-300"
                   } 
                   overflow-hidden hover:shadow-lg transition-all`}
    >
      {/* Header z gradientem */}
      <div
        className={`p-1 bg-gradient-to-r 
                     ${
                       examType.type === "ROZSZERZONY"
                         ? "from-purple-500 to-indigo-500"
                         : "from-blue-500 to-cyan-500"
                     }`}
      >
        <div className="flex items-center justify-center gap-2 text-white text-sm font-medium">
          <Brain className="w-4 h-4" />
          Dynamiczny dobór pytań
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {examType.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {examType.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <span className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            {examType.duration} min
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <Target className="w-4 h-4" />~{examType.estimatedPoints} pkt
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          examType.type === "ROZSZERZONY"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
          >
            {examType.type}
          </span>
        </div>

        {/* Struktura egzaminu */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Struktura egzaminu:
          </p>
          {examType.structure.sections.map((section, idx) => (
            <div
              key={idx}
              className="flex justify-between text-xs text-gray-600 
                                     dark:text-gray-400 mb-1"
            >
              <span>{section.name}</span>
              <span>
                {section.questionCount} zad. (~{section.estimatedPoints} pkt)
              </span>
            </div>
          ))}
        </div>

        {/* Statystyki użytkownika */}
        {examType.attemptCount && examType.attemptCount > 0 && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Twoje podejścia: {examType.attemptCount}
              </span>
              {examType.bestScore && (
                <span className="font-medium text-green-600 dark:text-green-400">
                  Najlepszy: {examType.bestScore}%
                </span>
              )}
            </div>
          </div>
        )}

        {/* Akcje */}
        {examType.hasActiveSession ? (
          <button
            onClick={() =>
              navigate(`/exam/session/${examType.lastActiveSessionId}`)
            }
            className="w-full flex items-center justify-center gap-2 px-4 py-3 
                     bg-yellow-500 text-white rounded-lg font-medium
                     hover:bg-yellow-600 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            Kontynuuj rozpoczęty egzamin
          </button>
        ) : (
          <button
            onClick={onStart}
            disabled={isStarting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 
                     bg-gradient-to-r from-purple-600 to-indigo-600 
                     text-white rounded-lg font-medium
                     hover:from-purple-700 hover:to-indigo-700 
                     transition-all disabled:opacity-50"
          >
            {isStarting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Przygotowywanie unikalnych pytań...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Rozpocznij egzamin
              </>
            )}
          </button>
        )}

        {/* Info */}
        <div className="mt-3 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Każde uruchomienie generuje nowy, unikalny zestaw pytań
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicExamList;
