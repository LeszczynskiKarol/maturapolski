// frontend/src/features/learning/SessionHistory.tsx

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingUp,
  Trophy,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export const SessionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
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
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
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
              </div>
            </motion.div>
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
