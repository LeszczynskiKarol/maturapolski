// frontend/src/features/exercises/ExerciseList.tsx

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

export const ExerciseList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // ZMIENIONY QUERY - teraz pobiera zadania wraz ze statusem
  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises-with-status", selectedCategory],
    queryFn: () =>
      api
        .get("/api/exercises/with-status", {
          params: {
            category: selectedCategory !== "all" ? selectedCategory : undefined,
          },
        })
        .then((r) => r.data),
  });

  const categories = [
    { value: "all", label: "Wszystkie" },
    { value: "LANGUAGE_USE", label: "Język w użyciu" },
    { value: "HISTORICAL_LITERARY", label: "Test historycznoliteracki" },
    { value: "WRITING", label: "Pisanie" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Zadania maturalne
      </h1>

      {/* Filtry */}
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === cat.value
                ? "bg-blue-600 dark:bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista zadań */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {exercises?.map((exercise: any) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ExerciseCard: React.FC<{ exercise: any; navigate: any }> = ({
  exercise,
  navigate,
}) => {
  // Oblicz status zadania na podstawie submissions
  const getExerciseStatus = () => {
    if (!exercise.submissions || exercise.submissions.length === 0) {
      return { type: "not_attempted", message: null };
    }

    const bestSubmission = exercise.submissions.reduce(
      (best: any, current: any) => {
        return (current.score || 0) > (best.score || 0) ? current : best;
      }
    );

    const maxPoints = exercise.points;
    const score = bestSubmission.score || 0;
    const scorePercentage = (score / maxPoints) * 100;

    if (scorePercentage >= 90) {
      return {
        type: "excellent",
        message: `Świetnie! Zdobyłeś ${score}/${maxPoints} pkt`,
        score,
        maxPoints,
      };
    } else if (scorePercentage >= 60) {
      return {
        type: "good",
        message: `Dobry wynik: ${score}/${maxPoints} pkt`,
        score,
        maxPoints,
      };
    } else {
      return {
        type: "poor",
        message: `Słaby wynik: ${score}/${maxPoints} pkt`,
        score,
        maxPoints,
      };
    }
  };

  const status = getExerciseStatus();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20 
                    p-6 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
            {exercise.question}
          </h3>

          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {exercise.category}
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {exercise.points} pkt
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Poziom {exercise.difficulty}/5
            </span>
          </div>

          {/* STATUS ZADANIA */}
          {status.message && (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                status.type === "excellent"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : status.type === "good"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              }`}
            >
              {status.type === "excellent" && (
                <CheckCircle className="w-4 h-4" />
              )}
              {status.type === "good" && <CheckCircle className="w-4 h-4" />}
              {status.type === "poor" && <XCircle className="w-4 h-4" />}
              {status.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate(`/exercises/${exercise.id}`)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              status.type === "not_attempted"
                ? "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {status.type === "not_attempted" ? "Rozwiąż" : "Rozwiąż ponownie"}
          </button>

          {/* Dodatkowy przycisk dla zadań z słabym wynikiem */}
          {status.type === "poor" && (
            <button
              onClick={() => navigate(`/exercises/${exercise.id}`)}
              className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 
                       dark:text-orange-300 rounded-lg hover:bg-orange-200 
                       dark:hover:bg-orange-800/30 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Popraw wynik
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
