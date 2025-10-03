// frontend/src/components/UserStatsModal.tsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  X,
  TrendingUp,
  Award,
  Target,
  Clock,
  Zap,
  BookOpen,
  BarChart3,
  ExternalLink,
  Trophy,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface UserStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserStatsModal: React.FC<UserStatsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const { data: detailedStats, isLoading } = useQuery({
    queryKey: ["detailed-stats"],
    queryFn: () => api.get("/api/student/detailed-stats").then((r) => r.data),
    enabled: isOpen,
  });

  const { data: epochStats } = useQuery({
    queryKey: ["epoch-stats"],
    queryFn: () => api.get("/api/learning/epoch-stats").then((r) => r.data),
    enabled: isOpen,
  });

  if (!isOpen) return null;

  const epochLabels: Record<string, string> = {
    ANTIQUITY: "Starożytność",
    MIDDLE_AGES: "Średniowiecze",
    RENAISSANCE: "Renesans",
    BAROQUE: "Barok",
    ENLIGHTENMENT: "Oświecenie",
    ROMANTICISM: "Romantyzm",
    POSITIVISM: "Pozytywizm",
    YOUNG_POLAND: "Młoda Polska",
    INTERWAR: "Dwudziestolecie",
    CONTEMPORARY: "Współczesność",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Szczegółowe statystyki
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Twój kompletny raport postępów
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Główne metryki */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MetricCard
                    icon={<Award className="w-5 h-5 text-purple-600" />}
                    label="Punkty"
                    value={detailedStats?.profile?.totalPoints || 0}
                    bgColor="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                  />
                  <MetricCard
                    icon={<TrendingUp className="w-5 h-5 text-green-600" />}
                    label="Średni wynik"
                    value={`${detailedStats?.profile?.averageScore || 0}%`}
                    bgColor="from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                  />
                  <MetricCard
                    icon={<Flame className="w-5 h-5 text-orange-600" />}
                    label="Passa"
                    value={`${detailedStats?.profile?.streak || 0} dni`}
                    bgColor="from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
                  />
                </div>

                {/* Sesje i czas */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Aktywność
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ukończone sesje
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {detailedStats?.sessions?.total || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Średnia długość
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {detailedStats?.sessions?.avgLength || 0} min
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Całkowity czas
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {detailedStats?.sessions?.totalTime || 0}h
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Aktywne dni (7d)
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {detailedStats?.activity?.activeDaysLast7 || 0}/7
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wydajność */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Wydajność
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Łącznie submisji
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {detailedStats?.performance?.totalSubmissions || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Unikalne zadania
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {detailedStats?.performance?.uniqueExercises || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Systematyczność
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {detailedStats?.activity?.consistency || 0}%
                        </p>
                      </div>
                    </div>

                    {/* Najlepsza kategoria */}
                    {detailedStats?.performance?.bestCategory && (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Twoja najlepsza kategoria
                            </p>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100">
                              {getCategoryLabel(
                                detailedStats.performance.bestCategory.category
                              )}
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              {detailedStats.performance.bestCategory.count}{" "}
                              zadań
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                              {Math.round(
                                detailedStats.performance.bestCategory.average
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Najlepszy poziom trudności */}
                    {detailedStats?.performance?.bestDifficulty && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Najlepszy poziom trudności
                            </p>
                            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                              Poziom{" "}
                              {detailedStats.performance.bestDifficulty
                                .difficulty || 1}
                            </p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {detailedStats.performance.bestDifficulty.count}{" "}
                              zadań
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                              {Math.round(
                                detailedStats.performance.bestDifficulty.average
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Postęp w epokach */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Postęp w epokach
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(epochStats || {})
                      .sort(([, a]: any, [, b]: any) => b.avgScore - a.avgScore)
                      .slice(0, 5)
                      .map(([epoch, stats]: any) => {
                        const progress =
                          stats.total > 0
                            ? Math.round((stats.completed / stats.total) * 100)
                            : 0;

                        return (
                          <div
                            key={epoch}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {epochLabels[epoch] || epoch}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {stats.completed}/{stats.total}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                  <div
                                    className="bg-purple-500 h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 min-w-[50px] text-right">
                                  {stats.avgScore}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Link do pełnego raportu */}
                <button
                  onClick={() => {
                    navigate("/progress");
                    onClose();
                  }}
                  className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
                           hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2
                           font-semibold"
                >
                  <Zap className="w-5 h-5" />
                  Zobacz pełny raport postępów
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
}> = ({ icon, label, value, bgColor }) => (
  <div
    className={`bg-gradient-to-br ${bgColor} rounded-xl p-4 border border-gray-200 dark:border-gray-700`}
  >
    <div className="flex items-center gap-2 mb-2">{icon}</div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </div>
);

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    LANGUAGE_USE: "Język w użyciu",
    HISTORICAL_LITERARY: "Test historycznoliteracki",
    WRITING: "Pisanie",
  };
  return labels[category] || category;
}
