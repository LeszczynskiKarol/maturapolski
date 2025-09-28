// frontend/src/components/DifficultyProgress.tsx

import React, { useState, useEffect } from "react";
import { Lock, Star, Trophy } from "lucide-react";
import { api } from "../services/api";

// Definiuj interfejs dla progress
interface LevelInfo {
  level: number;
  name: string;
  unlocked: boolean;
  points: number;
  required?: number;
  color: string;
}

interface DifficultyProgressData {
  currentMaxDifficulty: number;
  nextLevel: number | null;
  nextLevelProgress: number;
  pointsNeeded: number;
  levels: LevelInfo[];
}

export const DifficultyProgress: React.FC = () => {
  const [progress, setProgress] = useState<DifficultyProgressData | null>(null);

  useEffect(() => {
    api
      .get("/api/learning/difficulty-progress")
      .then((res) => setProgress(res.data))
      .catch((err) => console.error("Failed to load progress:", err));
  }, []);

  if (!progress) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Poziomy trudności
      </h3>

      {progress.nextLevel && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 dark:text-gray-300">
              Postęp do poziomu {progress.nextLevel}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {progress.pointsNeeded} pkt do odblokowania
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.nextLevelProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        {progress.levels.map((level: LevelInfo) => (
          <div
            key={level.level}
            className={`
              flex items-center justify-between p-3 rounded-lg transition-all
              ${
                level.unlocked
                  ? "bg-gray-50 dark:bg-gray-700/50"
                  : "bg-gray-100 dark:bg-gray-800 opacity-60"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {level.unlocked ? (
                <Star
                  className={`w-5 h-5 ${
                    level.color === "green"
                      ? "text-green-500"
                      : level.color === "blue"
                      ? "text-blue-500"
                      : level.color === "yellow"
                      ? "text-yellow-500"
                      : level.color === "orange"
                      ? "text-orange-500"
                      : level.color === "red"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
              ) : (
                <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              )}
              <span
                className={
                  level.unlocked
                    ? "font-medium text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {level.name}
              </span>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {level.points} pkt
              </div>
              {!level.unlocked && level.required && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Wymaga {level.required} pkt
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {progress.currentMaxDifficulty === 5 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="font-medium text-yellow-900 dark:text-yellow-100">
              Mistrzowski poziom odblokowany!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
