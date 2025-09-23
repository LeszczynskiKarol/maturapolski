// frontend/src/features/exams/ExamHub.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Trophy,
  Play,
  History,
  TrendingUp,
  Award,
  Calendar,
  ChevronRight,
  AlertCircle,
  Target,
  FileText,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface MockExam {
  id: string;
  title: string;
  year?: number;
  type: "PODSTAWOWY" | "ROZSZERZONY";
  duration: number;
  totalPoints: number;
  attemptCount: number;
  bestScore?: number;
  hasActiveSession: boolean;
  sections: Array<{
    id: string;
    title: string;
    questions: Array<{ points: number }>;
  }>;
}

export const ExamHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"available" | "history">(
    "available"
  );

  const { data: exams, isLoading } = useQuery<MockExam[]>({
    queryKey: ["available-exams"],
    queryFn: () => api.get("/api/exams/available").then((r) => r.data),
  });

  const { data: history } = useQuery({
    queryKey: ["exam-history"],
    queryFn: () => api.get("/api/exams/history").then((r) => r.data),
    enabled: selectedTab === "history",
  });

  const startExam = async (examId: string) => {
    try {
      const response = await api.post(`/api/exams/${examId}/start`);
      const { sessionId } = response.data;
      navigate(`/exam/${sessionId}`);
    } catch (error: any) {
      if (error.response?.data?.sessionId) {
        // Kontynuuj istniejącą sesję
        navigate(`/exam/${error.response.data.sessionId}`);
      } else {
        console.error("Error starting exam:", error);
      }
    }
  };

  if (isLoading) {
    return <ExamHubSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Egzaminy Maturalne Online
            </h1>
            <p className="text-purple-100 mb-6">
              Przygotuj się do matury z realistycznymi symulacjami egzaminów
            </p>

            <div className="flex gap-6">
              <Stat
                icon={<Trophy />}
                label="Ukończone egzaminy"
                value={history?.length || 0}
              />
              <Stat
                icon={<TrendingUp />}
                label="Średni wynik"
                value={`${calculateAverageScore(history)}%`}
              />
              <Stat
                icon={<Target />}
                label="Najlepszy wynik"
                value={`${getBestScore(history)}%`}
              />
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <Clock className="w-8 h-8 mb-2" />
            <p className="text-sm">Następna matura za</p>
            <p className="text-2xl font-bold">127 dni</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <TabButton
          active={selectedTab === "available"}
          onClick={() => setSelectedTab("available")}
          icon={<BookOpen className="w-4 h-4" />}
          label="Dostępne egzaminy"
          count={exams?.length || 0}
        />
        <TabButton
          active={selectedTab === "history"}
          onClick={() => setSelectedTab("history")}
          icon={<History className="w-4 h-4" />}
          label="Historia"
          count={history?.length || 0}
        />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedTab === "available" ? (
          <motion.div
            key="available"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-4"
          >
            {exams?.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onStart={() => startExam(exam.id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {history?.map((session: any) => (
              <HistoryCard key={session.id} session={session} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Komponenty pomocnicze
const ExamCard: React.FC<{
  exam: MockExam;
  onStart: () => void;
}> = ({ exam, onStart }) => {
  const questionCount = exam.sections.reduce(
    (sum, s) => sum + s.questions.length,
    0
  );

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 
                 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {exam.title}
            </h3>
            <TypeBadge type={exam.type} />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {exam.duration} minut
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {questionCount} zadań
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {exam.totalPoints} punktów
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            {exam.sections.map((section, i) => (
              <div key={section.id} className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Część {i + 1}:
                </span>
                <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">
                  {section.title}
                </span>
              </div>
            ))}
          </div>

          {exam.attemptCount > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  Podejść: {exam.attemptCount}
                </span>
                {exam.bestScore && (
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    Najlepszy wynik: {exam.bestScore}%
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="ml-6">
          {exam.hasActiveSession ? (
            <button
              onClick={onStart}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg 
                       hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              Kontynuuj
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onStart}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 
                       text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 
                       transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              Rozpocznij
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const HistoryCard: React.FC<{ session: any }> = ({ session }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-50 
                    dark:hover:bg-gray-750 transition-colors cursor-pointer"
      onClick={() => navigate(`/exam/results/${session.id}`)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">
            {session.exam.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {format(new Date(session.finishedAt), "dd MMMM yyyy, HH:mm", {
              locale: pl,
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreBadge score={session.percentScore} />
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 75)
      return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    if (score >= 50)
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
  };

  return (
    <div className={`px-3 py-1 rounded-full font-semibold ${getColor()}`}>
      {score}%
    </div>
  );
};

const TypeBadge: React.FC<{ type: string }> = ({ type }) => (
  <span
    className={`px-2 py-1 text-xs font-medium rounded-full
    ${
      type === "PODSTAWOWY"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
    }`}
  >
    {type === "PODSTAWOWY" ? "Podstawa" : "Rozszerzenie"}
  </span>
);

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}> = ({ active, onClick, icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-4 py-2 rounded-md transition-all flex items-center 
                justify-center gap-2 ${
                  active
                    ? "bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
    <span
      className={`px-2 py-0.5 rounded-full text-xs ${
        active
          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
      }`}
    >
      {count}
    </span>
  </button>
);

const Stat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
}> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-white/10 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm text-purple-200">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const ExamHubSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto p-6 space-y-6">
    <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-48 animate-pulse" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gray-200 dark:bg-gray-800 rounded-xl h-32 animate-pulse"
        />
      ))}
    </div>
  </div>
);

// Funkcje pomocnicze
function calculateAverageScore(history: any[]): number {
  if (!history || history.length === 0) return 0;
  const sum = history.reduce((acc, s) => acc + (s.percentScore || 0), 0);
  return Math.round(sum / history.length);
}

function getBestScore(history: any[]): number {
  if (!history || history.length === 0) return 0;
  return Math.max(...history.map((s) => s.percentScore || 0));
}
