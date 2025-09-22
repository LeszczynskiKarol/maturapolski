// frontend/src/features/learning/SessionHistory.tsx

import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingUp,
  Trophy,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export const SessionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["session-history", currentPage],
    queryFn: () =>
      api
        .get("/api/learning/sessions/history", {
          params: {
            limit: pageSize,
            offset: currentPage * pageSize,
          },
        })
        .then((r) => r.data),
  });

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

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
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Powrót do nauki
        </button>
        <h1 className="text-3xl font-bold">Historia sesji nauki</h1>
        <p className="text-gray-600 mt-2">
          Przejrzyj wszystkie swoje sesje nauki - łącznie {data?.total || 0}{" "}
          sesji
        </p>
      </div>

      {/* Statystyki podsumowujące */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">Łącznie sesji</span>
          </div>
          <p className="text-2xl font-bold">{data?.total || 0}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Średni wynik</span>
          </div>
          <p className="text-2xl font-bold">
            {data?.sessions?.length > 0
              ? Math.round(
                  data.sessions.reduce(
                    (acc: number, s: any) => acc + s.averageScore,
                    0
                  ) / data.sessions.length
                )
              : 0}
            %
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Zadań rozwiązanych</span>
          </div>
          <p className="text-2xl font-bold">
            {data?.sessions?.reduce(
              (acc: number, s: any) => acc + s.exercisesCount,
              0
            ) || 0}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Czas nauki</span>
          </div>
          <p className="text-2xl font-bold">
            {Math.round(
              (data?.sessions?.reduce(
                (acc: number, s: any) => acc + s.studyTime,
                0
              ) || 0) / 60
            )}
            h
          </p>
        </div>
      </div>

      {/* Lista sesji */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="space-y-0">
          {data?.sessions?.map((session: any, index: number) => (
            <div key={session.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() =>
                  setExpandedSession(
                    expandedSession === session.id ? null : session.id
                  )
                }
              >
                <div className="p-6 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">
                        {new Date(session.date).toLocaleDateString("pl-PL", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      {session.averageScore >= 80 && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Świetny wynik!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
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
                      <p className="text-2xl font-bold text-green-600">
                        +{session.points} pkt
                      </p>
                      <div className="mt-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              session.averageScore >= 80
                                ? "bg-green-500"
                                : session.averageScore >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${session.averageScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
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
                    className="bg-gray-50 border-b"
                  >
                    <div className="p-6">
                      <h4 className="font-semibold mb-4">
                        Szczegóły odpowiedzi:
                      </h4>
                      <div className="space-y-3">
                        {sessionDetails.submissions?.map(
                          (sub: any, idx: number) => (
                            <div
                              key={sub.id}
                              className="bg-white p-4 rounded-lg"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <p className="font-medium mb-1">
                                    {idx + 1}. {sub.question}
                                  </p>
                                  <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="px-2 py-1 bg-gray-100 rounded">
                                      {sub.category}
                                    </span>
                                    <span>Poziom {sub.difficulty}</span>
                                    <span>{sub.type}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {sub.score > 0 ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                  )}
                                  <span
                                    className={`font-semibold ${
                                      sub.score > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {sub.score}/{sub.maxPoints} pkt
                                  </span>
                                </div>
                              </div>

                              {/* Pokaż odpowiedź użytkownika */}
                              <div className="mt-3 text-sm">
                                <p className="text-gray-600 mb-1">
                                  Twoja odpowiedź:
                                </p>
                                <div
                                  className={`p-2 rounded ${
                                    sub.score > 0 ? "bg-green-50" : "bg-red-50"
                                  }`}
                                >
                                  {formatUserAnswer(sub)}
                                </div>

                                {/* Dla zadań zamkniętych pokaż poprawną odpowiedź */}
                                {(sub.type === "CLOSED_SINGLE" ||
                                  sub.type === "CLOSED_MULTIPLE") &&
                                  sub.correctAnswer !== undefined && (
                                    <div className="mt-2">
                                      <p className="text-gray-600 mb-1">
                                        Poprawna odpowiedź:
                                      </p>
                                      <div className="bg-green-50 p-2 rounded">
                                        {formatUserAnswer({
                                          type: sub.type,
                                          userAnswer: sub.correctAnswer,
                                          exerciseContent: sub.exerciseContent,
                                        })}
                                      </div>
                                    </div>
                                  )}
                              </div>

                              {/* Feedback jeśli jest */}
                              {sub.feedback && (
                                <div className="mt-2 text-sm text-gray-600">
                                  <p className="mb-1">Feedback:</p>
                                  <div className="bg-blue-50 p-2 rounded">
                                    {typeof sub.feedback === "object"
                                      ? sub.feedback.feedback ||
                                        sub.feedback.explanation
                                      : sub.feedback}
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

        {/* Paginacja */}
        {totalPages > 1 && (
          <div className="p-4 border-t flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm text-gray-600">
              Strona {currentPage + 1} z {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {data?.sessions?.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Brak zapisanych sesji nauki</p>
            <button
              onClick={() => navigate("/learn")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Rozpocznij pierwszą sesję
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
