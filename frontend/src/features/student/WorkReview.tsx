// frontend/src/features/student/WorkReview.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  Star,
  Lock,
  Crown,
  Search,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const EPOCHS = [
  { value: "ANTIQUITY", label: "Starożytność", emoji: "🏛️" },
  { value: "MIDDLE_AGES", label: "Średniowiecze", emoji: "⚔️" },
  { value: "RENAISSANCE", label: "Renesans", emoji: "🎭" },
  { value: "BAROQUE", label: "Barok", emoji: "👑" },
  { value: "ENLIGHTENMENT", label: "Oświecenie", emoji: "💡" },
  { value: "ROMANTICISM", label: "Romantyzm", emoji: "🌹" },
  { value: "POSITIVISM", label: "Pozytywizm", emoji: "📚" },
  { value: "YOUNG_POLAND", label: "Młoda Polska", emoji: "🎨" },
  { value: "INTERWAR", label: "Dwudziestolecie", emoji: "🕊️" },
  { value: "CONTEMPORARY", label: "Współczesność", emoji: "📖" },
];

export const WorkReview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWork, setSelectedWork] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pobierz status subskrypcji
  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
  });

  // Pobierz statystyki dla lektur
  const { data: worksStats } = useQuery({
    queryKey: ["works-stats"],
    queryFn: async () => {
      const response = await api.get("/api/learning/works-stats");
      return response.data;
    },
  });

  const isFreeUser = subscription?.plan === "FREE";

  const handleStartReview = (workTitle: string) => {
    // Blokada dla FREE users
    if (isFreeUser) {
      toast.error("Powtórki z lektur dostępne tylko w planie Premium!");
      navigate("/subscription");
      return;
    }

    const filters = {
      category: "HISTORICAL_LITERARY",
      work: workTitle,
    };

    console.log("=== WORK REVIEW SELECTED ===");
    console.log("Work:", workTitle);
    console.log("Filters:", filters);

    localStorage.setItem("sessionFilters", JSON.stringify(filters));
    localStorage.setItem("isWorkReview", "true");
    localStorage.setItem("autoStartSession", "true");

    navigate("/learn");
  };

  // Filtruj i sortuj lektury
  const filteredWorks = worksStats
    ? Object.values(worksStats)
        .filter((work: any) => {
          if (!searchQuery) return true;
          const query = searchQuery.toLowerCase();
          return (
            work.title.toLowerCase().includes(query) ||
            (work.author && work.author.toLowerCase().includes(query))
          );
        })
        .sort((a: any, b: any) => a.title.localeCompare(b.title, "pl"))
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
      {/* Ostrzeżenie dla FREE users */}
      {isFreeUser && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-yellow-900 dark:text-yellow-100 text-lg mb-1">
                Powtórki dostępne tylko w Premium
              </p>
              <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
                Aby korzystać z powtórek lektur, potrzebujesz planu Premium z
                pełnym dostępem do AI.
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

      {/* Wyszukiwarka */}
      {!isFreeUser && filteredWorks.length > 0 && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj lektury po tytule lub autorze..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 
                       rounded-xl bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:ring-2 focus:ring-green-500 focus:border-transparent
                       transition-all"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Znaleziono {filteredWorks.length}{" "}
            {filteredWorks.length === 1
              ? "lekturę"
              : filteredWorks.length < 5
              ? "lektury"
              : "lektur"}
          </p>
        </div>
      )}

      {/* Grid z lekturami */}
      {!worksStats || filteredWorks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {isFreeUser
              ? "Powtórki z lektur dostępne w planie Premium"
              : searchQuery
              ? "Nie znaleziono lektur pasujących do wyszukiwania"
              : "Brak dostępnych lektur z minimum 20 pytaniami"}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Wyczyść wyszukiwanie
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorks.map((work: any) => {
            const progress =
              work.total > 0
                ? Math.round((work.completed / work.total) * 100)
                : 0;

            const epochInfo = EPOCHS.find((e) => e.value === work.epoch);

            return (
              <div
                key={work.id}
                className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                  isFreeUser ? "opacity-60" : "cursor-pointer group"
                } ${
                  selectedWork === work.title
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                onClick={() => !isFreeUser && setSelectedWork(work.title)}
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
                  className={`absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 ${
                    !isFreeUser &&
                    "group-hover:from-green-500/10 group-hover:to-emerald-500/10"
                  } transition-opacity`}
                />

                <div className="relative p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {work.title}
                      </h3>
                      {work.author && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {work.author}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {epochInfo && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            <span>{epochInfo.emoji}</span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {epochInfo.label}
                            </span>
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-xs text-blue-700 dark:text-blue-300">
                          <BookOpen className="w-3 h-3" />
                          {work.total} pytań
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  {work.total > 0 && !isFreeUser && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600 dark:text-gray-400">
                          Postęp
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {work.completed}/{work.total} pytań
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      {work.avgScore > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          Średnia: {Math.round(work.avgScore)}%
                        </div>
                      )}
                    </div>
                  )}

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartReview(work.title);
                    }}
                    disabled={isFreeUser}
                    className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                      ${
                        isFreeUser
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : selectedWork === work.title
                          ? "bg-green-600 text-white hover:bg-green-700"
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
      )}

      {/* Quick Info */}
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
              Jak działają powtórki z lektur?
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              System automatycznie dobierze dla Ciebie 20 zadań z wybranej
              lektury. Możesz w każdej chwili zmienić filtry lub zakończyć
              sesję. Zadania będą dostosowane do Twojego poziomu trudności.
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
