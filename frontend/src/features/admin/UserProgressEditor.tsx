// frontend/src/features/admin/UserProgressEditor.tsx

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  X,
  Save,
  RefreshCw,
  Award,
  Target,
  Unlock,
  Lock,
  AlertTriangle,
  Info,
  Plus,
  Minus,
} from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";

interface UserProgressEditorProps {
  user: {
    id: string;
    username: string;
    email: string;
    profile?: {
      level: number;
      totalPoints: number;
    };
    levelProgress?: {
      unlockedDifficulty: number;
      difficulty1Points: number;
      difficulty2Points: number;
      difficulty3Points: number;
      difficulty4Points: number;
      difficulty5Points: number;
    };
  };
  onClose: () => void;
  onSuccess: () => void;
}

export const UserProgressEditor: React.FC<UserProgressEditorProps> = ({
  user,
  onClose,
  onSuccess,
}) => {
  // State for form values
  const [level, setLevel] = useState(user.profile?.level || 1);
  const [totalPoints, setTotalPoints] = useState(
    user.profile?.totalPoints || 0
  );
  const [unlockedDifficulty, setUnlockedDifficulty] = useState(
    user.levelProgress?.unlockedDifficulty || 2
  );
  const [difficultyPoints, setDifficultyPoints] = useState({
    difficulty1Points: user.levelProgress?.difficulty1Points || 0,
    difficulty2Points: user.levelProgress?.difficulty2Points || 0,
    difficulty3Points: user.levelProgress?.difficulty3Points || 0,
    difficulty4Points: user.levelProgress?.difficulty4Points || 0,
    difficulty5Points: user.levelProgress?.difficulty5Points || 0,
  });

  const [showWarning, setShowWarning] = useState(false);

  // Update mutation
  const updateProgressMutation = useMutation({
    mutationFn: async () => {
      const response = await api.put(`/api/admin/users/${user.id}/progress`, {
        level,
        totalPoints,
        unlockedDifficulty,
        difficultyPoints,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Postępy użytkownika zostały zaktualizowane");
      onSuccess();
    },
    onError: () => {
      toast.error("Błąd podczas aktualizacji postępów");
    },
  });

  // Helper functions
  const handlePointsChange = (
    difficulty: keyof typeof difficultyPoints,
    delta: number
  ) => {
    setDifficultyPoints((prev) => ({
      ...prev,
      [difficulty]: Math.max(0, prev[difficulty] + delta),
    }));
  };

  const handleLevelChange = (delta: number) => {
    setLevel((prev) => Math.max(1, Math.min(100, prev + delta)));
  };

  const handleTotalPointsChange = (delta: number) => {
    setTotalPoints((prev) => Math.max(0, prev + delta));
  };

  // Calculate if requirements are met for unlocked difficulties
  const checkUnlockRequirements = () => {
    const level1and2 =
      difficultyPoints.difficulty1Points + difficultyPoints.difficulty2Points;
    const warnings = [];

    if (unlockedDifficulty >= 3 && level1and2 < 100) {
      warnings.push("Poziom 3 wymaga 100 pkt z poziomów 1-2");
    }
    if (unlockedDifficulty >= 4 && difficultyPoints.difficulty3Points < 200) {
      warnings.push("Poziom 4 wymaga 200 pkt z poziomu 3");
    }
    if (unlockedDifficulty >= 5 && difficultyPoints.difficulty4Points < 300) {
      warnings.push("Poziom 5 wymaga 300 pkt z poziomu 4");
    }

    return warnings;
  };

  const warnings = checkUnlockRequirements();
  const hasChanges =
    level !== user.profile?.level ||
    totalPoints !== user.profile?.totalPoints ||
    unlockedDifficulty !== user.levelProgress?.unlockedDifficulty ||
    JSON.stringify(difficultyPoints) !==
      JSON.stringify({
        difficulty1Points: user.levelProgress?.difficulty1Points || 0,
        difficulty2Points: user.levelProgress?.difficulty2Points || 0,
        difficulty3Points: user.levelProgress?.difficulty3Points || 0,
        difficulty4Points: user.levelProgress?.difficulty4Points || 0,
        difficulty5Points: user.levelProgress?.difficulty5Points || 0,
      });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Edytuj postępy użytkownika
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {user.username} ({user.email})
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 140px)" }}
        >
          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">Uwaga!</p>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    {warnings.map((warning, idx) => (
                      <li key={idx}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Level and Total Points */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Poziom i punkty ogólne
              </h3>

              <div className="grid grid-cols-2 gap-6">
                {/* Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poziom użytkownika
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLevelChange(-1)}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={level}
                      onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                      min={1}
                      max={100}
                    />
                    <button
                      onClick={() => handleLevelChange(1)}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {level !== user.profile?.level && (
                    <p className="text-xs text-blue-600 mt-1">
                      Zmieniono z: {user.profile?.level || 1}
                    </p>
                  )}
                </div>

                {/* Total Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Łączna liczba punktów
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTotalPointsChange(-100)}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                    >
                      -100
                    </button>
                    <input
                      type="number"
                      value={totalPoints}
                      onChange={(e) =>
                        setTotalPoints(parseInt(e.target.value) || 0)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                      min={0}
                    />
                    <button
                      onClick={() => handleTotalPointsChange(100)}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                    >
                      +100
                    </button>
                  </div>
                  {totalPoints !== user.profile?.totalPoints && (
                    <p className="text-xs text-blue-600 mt-1">
                      Zmieniono z: {user.profile?.totalPoints || 0}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Unlocked Difficulty */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Unlock className="w-5 h-5 text-green-600" />
                Odblokowane poziomy trudności
              </h3>

              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <label
                    key={level}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      unlockedDifficulty >= level
                        ? "bg-green-50 border border-green-300"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="unlockedDifficulty"
                      value={level}
                      checked={unlockedDifficulty === level}
                      onChange={() => setUnlockedDifficulty(level)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    {unlockedDifficulty >= level ? (
                      <Unlock className="w-4 h-4 text-green-600" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="font-medium">
                      Poziom {level}
                      {level === 1 && " (Podstawowy)"}
                      {level === 2 && " (Łatwy)"}
                      {level === 3 && " (Średni)"}
                      {level === 4 && " (Trudny)"}
                      {level === 5 && " (Ekspert)"}
                    </span>
                    <span className="ml-auto text-sm text-gray-600">
                      {level <= 2 && "Domyślnie odblokowany"}
                      {level === 3 && "Wymaga 100 pkt z poz. 1-2"}
                      {level === 4 && "Wymaga 200 pkt z poz. 3"}
                      {level === 5 && "Wymaga 300 pkt z poz. 4"}
                    </span>
                  </label>
                ))}
              </div>

              {unlockedDifficulty !==
                user.levelProgress?.unlockedDifficulty && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <Info className="inline w-4 h-4 mr-1" />
                    Odblokowane poziomy zostaną zmienione z{" "}
                    {user.levelProgress?.unlockedDifficulty || 2} na{" "}
                    {unlockedDifficulty}
                  </p>
                </div>
              )}
            </div>

            {/* Points per Difficulty */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Punkty na poszczególnych poziomach
              </h3>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((level) => {
                  const key =
                    `difficulty${level}Points` as keyof typeof difficultyPoints;
                  const maxPoints = level <= 2 ? 100 : level === 3 ? 200 : 300;
                  const percentage = (difficultyPoints[key] / maxPoints) * 100;

                  return (
                    <div key={level}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Poziom {level}
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePointsChange(key, -10)}
                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            value={difficultyPoints[key]}
                            onChange={(e) =>
                              setDifficultyPoints((prev) => ({
                                ...prev,
                                [key]: parseInt(e.target.value) || 0,
                              }))
                            }
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                            min={0}
                          />
                          <button
                            onClick={() => handlePointsChange(key, 10)}
                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="text-sm text-gray-600 w-20 text-right">
                            / {maxPoints} pkt
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        {percentage > 100 && (
                          <p className="text-xs text-orange-600 mt-1">
                            ⚠️ Przekroczono maksymalną liczbę punktów!
                          </p>
                        )}
                      </div>
                      {difficultyPoints[key] !==
                        (user.levelProgress?.[key] || 0) && (
                        <p className="text-xs text-blue-600 mt-1">
                          Zmieniono z: {user.levelProgress?.[key] || 0}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  Podsumowanie punktów
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Poziomy 1-2:</p>
                    <p className="font-semibold">
                      {difficultyPoints.difficulty1Points +
                        difficultyPoints.difficulty2Points}{" "}
                      / 100 pkt
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Poziom 3:</p>
                    <p className="font-semibold">
                      {difficultyPoints.difficulty3Points} / 200 pkt
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Poziom 4-5:</p>
                    <p className="font-semibold">
                      {difficultyPoints.difficulty4Points +
                        difficultyPoints.difficulty5Points}{" "}
                      / 600 pkt
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {showWarning && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Potwierdź zmiany</p>
                    <p className="text-sm text-red-700 mt-1">
                      Czy na pewno chcesz zapisać wprowadzone zmiany? Może to
                      wpłynąć na dostęp użytkownika do zadań.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          updateProgressMutation.mutate();
                          setShowWarning(false);
                        }}
                        className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                      >
                        Tak, zapisz zmiany
                      </button>
                      <button
                        onClick={() => setShowWarning(false)}
                        className="px-3 py-1.5 bg-white border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                      >
                        Anuluj
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Szybkie akcje</h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setLevel(1);
                    setTotalPoints(0);
                    setUnlockedDifficulty(2);
                    setDifficultyPoints({
                      difficulty1Points: 0,
                      difficulty2Points: 0,
                      difficulty3Points: 0,
                      difficulty4Points: 0,
                      difficulty5Points: 0,
                    });
                  }}
                  className="px-3 py-2 bg-white text-gray-700 text-sm rounded-lg hover:bg-gray-50 border border-gray-300"
                >
                  Reset do początkowych
                </button>
                <button
                  onClick={() => {
                    setUnlockedDifficulty(5);
                    setDifficultyPoints({
                      difficulty1Points: 100,
                      difficulty2Points: 100,
                      difficulty3Points: 200,
                      difficulty4Points: 300,
                      difficulty5Points: 300,
                    });
                  }}
                  className="px-3 py-2 bg-white text-gray-700 text-sm rounded-lg hover:bg-gray-50 border border-gray-300"
                >
                  Odblokuj wszystkie
                </button>
                <button
                  onClick={() => {
                    setLevel(user.profile?.level || 1);
                    setTotalPoints(user.profile?.totalPoints || 0);
                    setUnlockedDifficulty(
                      user.levelProgress?.unlockedDifficulty || 2
                    );
                    setDifficultyPoints({
                      difficulty1Points:
                        user.levelProgress?.difficulty1Points || 0,
                      difficulty2Points:
                        user.levelProgress?.difficulty2Points || 0,
                      difficulty3Points:
                        user.levelProgress?.difficulty3Points || 0,
                      difficulty4Points:
                        user.levelProgress?.difficulty4Points || 0,
                      difficulty5Points:
                        user.levelProgress?.difficulty5Points || 0,
                    });
                  }}
                  className="px-3 py-2 bg-white text-gray-700 text-sm rounded-lg hover:bg-gray-50 border border-gray-300"
                  disabled={!hasChanges}
                >
                  Przywróć oryginalne
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {hasChanges && (
              <>
                <Info className="w-4 h-4" />
                <span>Masz niezapisane zmiany</span>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={() => {
                if (warnings.length > 0) {
                  setShowWarning(true);
                } else {
                  updateProgressMutation.mutate();
                }
              }}
              disabled={!hasChanges || updateProgressMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {updateProgressMutation.isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Zapisz zmiany
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProgressEditor;
