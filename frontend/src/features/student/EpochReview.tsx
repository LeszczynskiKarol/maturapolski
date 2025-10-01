// frontend/src/features/student/EpochReview.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, ChevronRight, Star, Lock, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const EPOCHS = [
  {
    value: "ANTIQUITY",
    label: "Starożytność",
    period: "VIII w. p.n.e. - V w. n.e.",
    color: "from-amber-500 to-orange-500",
    icon: "🏛️",
    description: "Homer, mitologia grecka, literatura rzymska",
  },
  {
    value: "MIDDLE_AGES",
    label: "Średniowiecze",
    period: "V-XV w.",
    color: "from-stone-500 to-gray-600",
    icon: "⚔️",
    description: "Literatura religijna, kroniki, pieśni rycerskie",
  },
  {
    value: "RENAISSANCE",
    label: "Renesans",
    period: "XV-XVI w.",
    color: "from-emerald-500 to-teal-500",
    icon: "🎭",
    description: "Kochanowski, humanizm, odrodzenie antyku",
  },
  {
    value: "BAROQUE",
    label: "Barok",
    period: "XVII w.",
    color: "from-purple-500 to-pink-500",
    icon: "👑",
    description: "Sarmatyzm, liryka metafizyczna, Potop",
  },
  {
    value: "ENLIGHTENMENT",
    label: "Oświecenie",
    period: "XVIII w.",
    color: "from-yellow-500 to-amber-500",
    icon: "💡",
    description: "Rozum, reforma edukacji, Krasicki",
  },
  {
    value: "ROMANTICISM",
    label: "Romantyzm",
    period: "1822-1863",
    color: "from-rose-500 to-red-500",
    icon: "🌹",
    description: "Mickiewicz, Słowacki, powstania narodowe",
  },
  {
    value: "POSITIVISM",
    label: "Pozytywizm",
    period: "1863-1890",
    color: "from-blue-500 to-indigo-500",
    icon: "📚",
    description: "Praca organiczna, realizm, Prus, Sienkiewicz",
  },
  {
    value: "YOUNG_POLAND",
    label: "Młoda Polska",
    period: "1890-1918",
    color: "from-violet-500 to-purple-500",
    icon: "🎨",
    description: "Symbolizm, modernizm, Wyspiański, Żeromski",
  },
  {
    value: "INTERWAR",
    label: "Dwudziestolecie międzywojenne",
    period: "1918-1939",
    color: "from-cyan-500 to-blue-500",
    icon: "🕊️",
    description: "Niepodległość, awangarda, Gombrowicz, Witkacy",
  },
  {
    value: "CONTEMPORARY",
    label: "Współczesność",
    period: "1939-dziś",
    color: "from-green-500 to-emerald-500",
    icon: "📖",
    description: "Literatura wojenna i powojenna, postmodernizm",
  },
];

export const EpochReview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEpoch, setSelectedEpoch] = useState<string | null>(null);

  // POBIERZ STATUS SUBSKRYPCJI
  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
  });

  // Pobierz statystyki dla każdej epoki
  const { data: stats } = useQuery({
    queryKey: ["epoch-stats"],
    queryFn: async () => {
      const response = await api.get("/api/learning/epoch-stats");
      return response.data;
    },
  });

  const isFreeUser = subscription?.plan === "FREE";

  const handleStartReview = (epochValue: string) => {
    // BLOKADA DLA FREE USERS
    if (isFreeUser) {
      toast.error("Powtórki z epok dostępne tylko w planie Premium!");
      navigate("/subscription");
      return;
    }

    const filters = {
      category: "HISTORICAL_LITERARY",
      epoch: epochValue,
    };

    console.log("=== EPOCH REVIEW SELECTED ===");
    console.log("Epoch:", epochValue);
    console.log("Filters:", filters);

    localStorage.setItem("sessionFilters", JSON.stringify(filters));
    localStorage.setItem("isEpochReview", "true");

    navigate("/learn");
  };

  const getEpochStats = (epochValue: string) => {
    if (!stats) return null;
    return stats[epochValue] || { total: 0, completed: 0, avgScore: 0 };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Powtórki z epok literackich
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Wybierz epokę, którą chcesz powtórzyć. System przygotuje dla Ciebie
          sesję zadań z wybranego okresu.
        </p>
      </div>

      {/* OSTRZEŻENIE DLA FREE USERS */}
      {isFreeUser && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-yellow-900 dark:text-yellow-100 text-lg mb-1">
                Powtórki dostępne tylko w Premium
              </p>
              <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
                Aby korzystać z powtórek epok literackich, potrzebujesz planu
                Premium z pełnym dostępem do AI.
              </p>
              <button
                onClick={() => navigate("/subscription")}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 
                         text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 
                         font-semibold flex items-center gap-2 transition-all"
              >
                <Crown className="w-4 h-4" />
                Ulepsz do Premium
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EPOCHS.map((epoch) => {
          const epochStats = getEpochStats(epoch.value);
          const progress = epochStats
            ? (epochStats.completed / epochStats.total) * 100
            : 0;

          return (
            <div
              key={epoch.value}
              className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                isFreeUser ? "opacity-60" : "cursor-pointer group"
              } ${
                selectedEpoch === epoch.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => !isFreeUser && setSelectedEpoch(epoch.value)}
            >
              {/* Lock Overlay dla FREE users */}
              {isFreeUser && (
                <div className="absolute inset-0 bg-gray-900/10 dark:bg-gray-900/30 z-10 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                    <Lock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              )}

              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  epoch.color
                } opacity-5 ${
                  !isFreeUser && "group-hover:opacity-10"
                } transition-opacity`}
              />

              <div className="relative p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{epoch.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {epoch.label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {epoch.period}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {epoch.description}
                </p>

                {/* Stats */}
                {epochStats && !isFreeUser && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 dark:text-gray-400">
                        Postęp
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {epochStats.completed}/{epochStats.total} zadań
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${epoch.color} transition-all duration-500`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    {epochStats.avgScore > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        Średnia: {Math.round(epochStats.avgScore)}%
                      </div>
                    )}
                  </div>
                )}

                {/* Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartReview(epoch.value);
                  }}
                  disabled={isFreeUser}
                  className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                    ${
                      isFreeUser
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : selectedEpoch === epoch.value
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {isFreeUser ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Wymaga Premium
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Rozpocznij powtórkę
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Info */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Jak działają powtórki?
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              System automatycznie dobierze dla Ciebie 20 zadań z wybranej
              epoki. Możesz w każdej chwili zmienić filtry lub zakończyć sesję.
              Zadania będą dostosowane do Twojego poziomu trudności.
              {isFreeUser && (
                <span className="block mt-2 font-semibold">
                  ⚠️ Ta funkcja wymaga planu Premium.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
