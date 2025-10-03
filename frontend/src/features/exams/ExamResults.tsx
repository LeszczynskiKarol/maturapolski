// frontend/src/features/exams/ExamResults.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Trophy, Target, AlertCircle, Home, RefreshCw } from "lucide-react";

export const ExamResults: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const { data: results, isLoading } = useQuery({
    queryKey: ["exam-results", sessionId],
    queryFn: () =>
      api.get(`/api/exams/session/${sessionId}/results`).then((r) => r.data),
  });

  if (isLoading) {
    return <div>Ładowanie wyników...</div>;
  }

  if (!results) {
    return <div>Brak wyników</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-6">
          <div className="text-center">
            <div className="mb-4">
              {results.percentScore >= 60 ? (
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
              ) : results.percentScore >= 30 ? (
                <Target className="w-20 h-20 text-blue-500 mx-auto" />
              ) : (
                <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">
              Twój wynik: {results.percentScore}%
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {results.grade}
            </p>

            <div className="flex justify-center gap-8 text-sm">
              <div>
                <p className="text-gray-500">Zdobyte punkty</p>
                <p className="text-2xl font-bold">
                  {results.totalScore}/{results.maxScore}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {results.summary && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Podsumowanie</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {results.summary.message}
            </p>

            {results.summary.strengths &&
              results.summary.strengths.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-green-600 mb-2">
                    Mocne strony:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {results.summary.strengths.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

            {results.summary.improvements &&
              results.summary.improvements.length > 0 && (
                <div>
                  <h3 className="font-medium text-orange-600 mb-2">
                    Do poprawy:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {results.summary.improvements.map(
                      (s: string, i: number) => (
                        <li key={i}>{s}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/exams")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                     bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Home className="w-5 h-5" />
            Powrót do listy
          </button>

          <button
            onClick={() => navigate("/exams")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                     bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <RefreshCw className="w-5 h-5" />
            Spróbuj ponownie
          </button>
        </div>
      </div>
    </div>
  );
};
