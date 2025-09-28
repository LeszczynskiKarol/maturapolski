// frontend/src/features/learning/SessionHistory.tsx

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  Clock,
  TrendingUp,
  Trophy,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export const SessionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["all-sessions", currentPage],
    queryFn: () => api.get("/api/learning/sessions/all").then((r) => r.data),
  });

  const formatUserAnswer = (submission: any) => {
    const { type, userAnswer, exerciseContent } = submission;

    // Dla zadań CLOSED_SINGLE
    if (type === "CLOSED_SINGLE") {
      const options = exerciseContent?.options || [];

      // userAnswer może być liczbą (indeks) lub obiektem
      if (typeof userAnswer === "number" && options[userAnswer]) {
        return options[userAnswer];
      }

      // Jeśli userAnswer to obiekt z indeksem
      if (userAnswer && typeof userAnswer === "object") {
        const index = userAnswer.index ?? userAnswer.value ?? userAnswer.answer;
        if (typeof index === "number" && options[index]) {
          return options[index];
        }
      }

      return "Brak odpowiedzi";
    }

    // Dla zadań CLOSED_MULTIPLE
    if (type === "CLOSED_MULTIPLE") {
      const options = exerciseContent?.options || [];

      if (Array.isArray(userAnswer)) {
        const selectedOptions = userAnswer
          .map((idx) => {
            if (typeof idx === "number") {
              return options[idx];
            }
            return null;
          })
          .filter(Boolean);

        return selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Brak odpowiedzi";
      }

      return "Brak odpowiedzi";
    }

    // Dla zadań tekstowych (SHORT_ANSWER, ESSAY)
    if (typeof userAnswer === "string") {
      return userAnswer || "Brak odpowiedzi";
    }

    // Jeśli to obiekt z tekstem
    if (userAnswer && typeof userAnswer === "object") {
      if (userAnswer.text) return String(userAnswer.text);
      if (userAnswer.answer) return String(userAnswer.answer);
      return "Brak odpowiedzi";
    }

    return "Brak odpowiedzi";
  };

  // Hook do pobierania szczegółów rozwiniętej sesji
  const { data: sessionDetails } = useQuery({
    queryKey: ["session-details", expandedSession],
    queryFn: () =>
      expandedSession
        ? api
            .get(`/api/learning/session/${expandedSession}/details`)
            .then((r) => r.data)
        : null,
    enabled: !!expandedSession,
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/learn")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 
                     hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Powrót do nauki
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Historia sesji nauki
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Przejrzyj wszystkie swoje sesje nauki - łącznie {data?.total || 0}{" "}
          sesji
        </p>
      </div>

      {/* Statystyki podsumowujące */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">Łącznie sesji</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {(data?.active?.length || 0) + (data?.completed?.length || 0)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Średni wynik</span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {data?.completed?.length > 0
              ? Math.round(
                  data.completed.reduce(
                    (acc: number, s: any) => acc + s.averageScore,
                    0
                  ) / data.completed.length
                )
              : 0}
            %
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Zadań rozwiązanych</span>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {data?.completed?.reduce(
              (acc: number, s: any) => acc + s.exercisesCount,
              0
            ) || 0}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Czas nauki</span>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {Math.round(
              (data?.completed?.reduce(
                (acc: number, s: any) => acc + s.studyTime,
                0
              ) || 0) / 60
            )}
            h
          </p>
        </div>
      </div>

      {/* Nieukończone sesje */}
      {data?.active?.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-lg text-yellow-900 dark:text-yellow-100 mb-3">
            Nieukończone sesje ({data.active.length})
          </h3>
          <div className="space-y-2">
            {data.active.map((session: any) => (
              <div
                key={session.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 
               border border-yellow-200 dark:border-yellow-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          session.sessionType === "STUDY_PLAN"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {session.sessionType === "STUDY_PLAN"
                          ? `📚 Plan - Tydzień ${session.weekNumber}`
                          : "🎯 Swobodna"}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Rozpoczęta{" "}
                      {new Date(session.date).toLocaleString("pl-PL")}
                    </p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>📝 {session.completed}/20 zadań</span>
                      <span>✅ {session.correct} poprawnych</span>
                      <span>⏱️ {session.timeSpent} min</span>
                      <span>🏆 +{session.points} pkt</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/learn")}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg 
                 hover:bg-yellow-700 transition-colors font-medium"
                  >
                    Kontynuuj
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 overflow-hidden">
        <div className="space-y-0">
          {data?.completed?.map((session: any, index: number) => (
            <div key={session.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b dark:border-gray-700 last:border-b-0 
                    hover:bg-gray-50 dark:hover:bg-gray-700/50 
                    transition-colors cursor-pointer"
                onClick={() =>
                  setExpandedSession(
                    expandedSession === session.id ? null : session.id
                  )
                }
              >
                <div className="p-6 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      {/* IKONA TYPU SESJI */}
                      <div
                        className={`p-2 rounded-lg ${
                          session.sessionType === "STUDY_PLAN"
                            ? "bg-purple-100 dark:bg-purple-900/30"
                            : "bg-blue-100 dark:bg-blue-900/30"
                        }`}
                      >
                        {session.sessionType === "STUDY_PLAN" ? (
                          <CalendarCheck
                            className={`w-5 h-5 text-purple-600 dark:text-purple-400`}
                          />
                        ) : (
                          <BookOpen
                            className={`w-5 h-5 text-blue-600 dark:text-blue-400`}
                          />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {new Date(session.date).toLocaleDateString("pl-PL", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h3>
                        {/* BADGE TYPU SESJI */}
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              session.sessionType === "STUDY_PLAN"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            }`}
                          >
                            {session.sessionType === "STUDY_PLAN"
                              ? `📚 Plan nauki - Tydzień ${session.weekNumber}`
                              : "🎯 Nauka swobodna"}
                          </span>
                          {session.averageScore >= 80 && (
                            <span
                              className="px-2 py-1 bg-green-100 dark:bg-green-900/30 
                                     text-green-700 dark:text-green-300 text-xs rounded-full"
                            >
                              Świetny wynik!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{session.exercisesCount} zadań</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{session.averageScore}% poprawnych</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.studyTime} minut</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        +{session.points} pkt
                      </p>
                      <div className="mt-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              session.averageScore >= 80
                                ? "bg-green-500 dark:bg-green-400"
                                : session.averageScore >= 60
                                ? "bg-yellow-500 dark:bg-yellow-400"
                                : "bg-red-500 dark:bg-red-400"
                            }`}
                            style={{ width: `${session.averageScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${
                        expandedSession === session.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Szczegóły sesji */}
              <AnimatePresence>
                {expandedSession === session.id && sessionDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gray-50 dark:bg-gray-900/50 border-b dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Szczegóły odpowiedzi:
                        </h4>
                        {sessionDetails.sessionType === "STUDY_PLAN" && (
                          <span
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 
                                   text-purple-700 dark:text-purple-300 rounded-full text-sm"
                          >
                            Plan nauki - Tydzień {sessionDetails.weekNumber}
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        {sessionDetails.submissions?.map(
                          (sub: any, idx: number) => (
                            <div
                              key={sub.id}
                              className="bg-white dark:bg-gray-800 p-4 rounded-lg"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <p className="font-medium mb-1 text-gray-900 dark:text-white">
                                    {idx + 1}. {sub.question}
                                  </p>
                                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                      {sub.category}
                                    </span>
                                    <span>Poziom {sub.difficulty}</span>
                                    <span>{sub.type}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {sub.score > 0 ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                                  )}
                                  <span
                                    className={`font-semibold ${
                                      sub.score > 0
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {sub.score}/{sub.maxPoints} pkt
                                  </span>
                                </div>
                              </div>

                              {/* Pokaż odpowiedź użytkownika */}
                              <div className="mt-3 text-sm">
                                <p className="text-gray-600 dark:text-gray-400 mb-1">
                                  Twoja odpowiedź:
                                </p>
                                <div
                                  className={`p-2 rounded ${
                                    sub.score > 0
                                      ? "bg-green-50 dark:bg-green-900/20"
                                      : "bg-red-50 dark:bg-red-900/20"
                                  }`}
                                >
                                  <span className="text-gray-900 dark:text-gray-100">
                                    {formatUserAnswer(sub)}
                                  </span>
                                </div>

                                {/* Dla zadań zamkniętych pokaż poprawną odpowiedź */}
                                {(sub.type === "CLOSED_SINGLE" ||
                                  sub.type === "CLOSED_MULTIPLE") &&
                                  sub.correctAnswer !== undefined && (
                                    <div className="mt-2">
                                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                                        Poprawna odpowiedź:
                                      </p>
                                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                        <span className="text-gray-900 dark:text-gray-100">
                                          {formatUserAnswer({
                                            type: sub.type,
                                            userAnswer: sub.correctAnswer,
                                            exerciseContent:
                                              sub.exerciseContent,
                                          })}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                              </div>

                              {/* Feedback jeśli jest */}
                              {sub.feedback && (
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  <p className="mb-1">Feedback:</p>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                    <span className="text-gray-900 dark:text-gray-100">
                                      {typeof sub.feedback === "object"
                                        ? sub.feedback.feedback ||
                                          sub.feedback.explanation
                                        : sub.feedback}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {data?.completed?.length === 0 && !data?.active?.length && (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p>Brak zapisanych sesji nauki</p>
            <button
              onClick={() => navigate("/learn")}
              className="mt-4 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white 
               rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Rozpocznij pierwszą sesję
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
