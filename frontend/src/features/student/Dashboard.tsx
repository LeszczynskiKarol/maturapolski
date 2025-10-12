// frontend/src/features/student/Dashboard.tsx

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Crown,
  Flame,
  Lock,
  Play,
  RotateCcw,
  Target,
  Zap,
  BarChart3,
  Clock,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiPointsWidget } from "../../components/AiPointsWidget";
import { DifficultyProgress } from "../../components/DifficultyProgress";
import { UserStatsModal } from "../../components/UserStatsModal";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";

const EPOCHS = [
  { value: "ANTIQUITY", label: "Starożytność", emoji: "🏛️" },
  { value: "MIDDLE_AGES", label: "Średniowiecze", emoji: "🏰" },
  { value: "RENAISSANCE", label: "Renesans", emoji: "🎨" },
  { value: "BAROQUE", label: "Barok", emoji: "👑" },
  { value: "ENLIGHTENMENT", label: "Oświecenie", emoji: "💡" },
  { value: "ROMANTICISM", label: "Romantyzm", emoji: "🌹" },
  { value: "POSITIVISM", label: "Pozytywizm", emoji: "📚" },
  { value: "YOUNG_POLAND", label: "Młoda Polska", emoji: "🦋" },
  { value: "INTERWAR", label: "Dwudziestolecie", emoji: "✒️" },
  { value: "CONTEMPORARY", label: "Współczesność", emoji: "🌐" },
];

export const StudentDashboard: React.FC = () => {
  const [showStatsModal, setShowStatsModal] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [workSearchQuery, setWorkSearchQuery] = useState("");

  const { data: stats } = useQuery({
    queryKey: ["learning-stats"],
    queryFn: () => api.get("/api/learning/stats").then((r) => r.data),
  });

  const { data: worksStats } = useQuery({
    queryKey: ["works-stats"],
    queryFn: () => api.get("/api/learning/works-stats").then((r) => r.data),
  });

  // ✅ Dodaj funkcję startWorkReview obok startEpochReview
  const startWorkReview = (workTitle: string) => {
    if (isFree) {
      toast.error("Powtórki z lektur dostępne tylko w planie Premium!");
      navigate("/subscription");
      return;
    }

    const filters = {
      category: "HISTORICAL_LITERARY",
      work: workTitle, // ✅ Filtrujemy po tytule dzieła
    };

    localStorage.setItem("sessionFilters", JSON.stringify(filters));
    localStorage.setItem("isWorkReview", "true");
    localStorage.setItem("autoStartSession", "true");

    navigate("/learn");
  };

  const { data: detailedStats } = useQuery({
    queryKey: ["detailed-stats"],
    queryFn: () => api.get("/api/student/detailed-stats").then((r) => r.data),
  });

  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
  });

  const { data: levelProgress } = useQuery({
    queryKey: ["difficulty-progress"],
    queryFn: () =>
      api.get("/api/learning/difficulty-progress").then((r) => r.data),
  });

  const { data: epochStats } = useQuery({
    queryKey: ["epoch-stats"],
    queryFn: () => api.get("/api/learning/epoch-stats").then((r) => r.data),
  });

  const isPremium = subscription?.plan === "PREMIUM";
  const isFree = !isPremium;

  const startLearningSession = () => {
    if (isFree) {
      toast.error("Sesje nauki dostępne tylko w planie Premium!");
      navigate("/subscription");
      return;
    }

    localStorage.removeItem("sessionFilters");
    localStorage.removeItem("isStudyPlanSession");
    localStorage.removeItem("isEpochReview");
    localStorage.setItem("autoStartSession", "true");

    navigate("/learn");
  };

  const startEpochReview = (epoch: string) => {
    if (isFree) {
      toast.error("Powtórki z epok dostępne tylko w planie Premium!");
      navigate("/subscription");
      return;
    }

    const filters = {
      category: "HISTORICAL_LITERARY",
      epoch: epoch,
    };

    localStorage.setItem("sessionFilters", JSON.stringify(filters));
    localStorage.setItem("isEpochReview", "true");
    localStorage.setItem("autoStartSession", "true");

    navigate("/learn");
  };

  const greeting = () => {
    const hour = new Date().getHours();
    const username = user?.username
      ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
      : "";

    if (hour < 12) return `Dzień dobry, ${username}`;
    if (hour < 18) return `Witaj, ${username}`;
    return `Dobry wieczór, ${username}`;
  };

  // Oblicz poprawną wskazówkę dnia
  const getTipOfTheDay = () => {
    const streak = stats?.streak || 0;
    const avgScore = detailedStats?.profile?.averageScore || 0;
    const todayExercises = stats?.todayExercises || 0;

    if (streak >= 7) {
      return `Niesamowite! Masz ${streak}-dniową passę. Wróć jutro, aby ją kontynuować!`;
    }
    if (streak > 0) {
      return `Świetna passa! Wróć jutro, aby kontynuować serię ${streak} dni.`;
    }
    if (todayExercises >= 10) {
      return `Dziś już ${todayExercises} zadań! Trzymaj tempo!`;
    }
    if (avgScore >= 80) {
      return `Twój średni wynik to ${avgScore}%! Świetna robota!`;
    }
    if (avgScore >= 60) {
      return `Średnia ${avgScore}% - konsekwentna praca przynosi rezultaty!`;
    }
    return "Zacznij dziś i rozpocznij swoją passę nauki!";
  };

  // Oblicz informację o skuteczności
  const getPerformanceMessage = () => {
    const avgScore = detailedStats?.profile?.averageScore || 0;

    if (avgScore >= 80) {
      return {
        text: "Świetnie Ci idzie! Kontynuuj dobrą pracę.",
        color: "text-green-700 dark:text-green-300",
        bgColor: "bg-green-50 dark:bg-green-900/20",
      };
    }
    if (avgScore >= 60) {
      return {
        text: "Dobra robota! Jesteś na dobrej drodze.",
        color: "text-blue-700 dark:text-blue-300",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
      };
    }
    if (avgScore >= 40) {
      return {
        text: "Nie poddawaj się! Każda sesja to postęp.",
        color: "text-orange-700 dark:text-orange-300",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
      };
    }
    return {
      text: "Skup się na podstawach - rezultaty przyjdą!",
      color: "text-purple-700 dark:text-purple-300",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    };
  };

  const performanceMsg = getPerformanceMessage();

  // Oblicz ile punktów brakuje do następnego poziomu trudności
  const pointsToNextDifficulty = levelProgress?.pointsToUnlock3
    ? Math.max(
        0,
        levelProgress.pointsToUnlock3 -
          (levelProgress.difficulty1Points + levelProgress.difficulty2Points)
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 pb-32 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {greeting()}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Zaczynajmy dzisiejszą naukę!
          </p>
        </div>

        {/* Przyciski ukryte na mobile */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setShowStatsModal(true)}
            className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 
                 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 
                 rounded-lg transition-colors flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Szczegółowe statystyki
          </button>

          <button
            onClick={() => navigate("/sessions")}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Historia sesji
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Premium Banner dla FREE */}
          {isFree && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 sm:p-6 text-white"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h3 className="text-lg sm:text-xl font-bold">
                      Odblokuj sesje nauki
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-blue-100 mb-3 sm:mb-4">
                    Plan FREE nie obejmuje sesji nauki. Wykup Premium aby
                    otrzymywać szczegółowe oceny AI, 200 punktów miesięcznie i
                    nielimitowany dostęp.
                  </p>
                  <div className="flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-2 xs:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>200 punktów AI/mies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>Nielimitowane sesje</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>39 zł/miesiąc</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/subscription")} // ✅ ZMIEŃ onClick
                    disabled={false} // ✅ Usuń isUpgrading
                    className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50
            font-semibold transition-colors flex items-center justify-center gap-2
            text-sm sm:text-base"
                  >
                    Wykup Premium
                  </button>
                </div>
                <Lock className="hidden sm:block w-12 h-12 opacity-20 flex-shrink-0" />
              </div>
            </motion.div>
          )}

          {/* Główny CTA */}
          <motion.div
            whileHover={!isFree ? { scale: 1.02 } : {}}
            className={`rounded-2xl p-4 sm:p-6 md:p-8 text-white ${
              isFree
                ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-60"
                : "bg-gradient-to-br from-blue-600 to-purple-600 cursor-pointer"
            }`}
            onClick={!isFree ? startLearningSession : undefined}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                  {isFree && <Lock className="w-5 h-5 sm:w-6 sm:h-6" />}
                  Rozpocznij naukę
                </h2>
                <p
                  className={`mb-3 sm:mb-4 text-sm sm:text-base ${
                    isFree ? "text-gray-200" : "text-blue-100"
                  }`}
                >
                  {isFree
                    ? "Sesje dostępne tylko w planie Premium"
                    : "Sesja adaptacyjna dostosowana do Twojego poziomu"}
                </p>
                {!isFree && (
                  <div className="flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-2 xs:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>20 zadań</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>Inteligentny dobór</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>
                        Poziomy 1-{levelProgress?.currentMaxDifficulty || 2}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`p-4 sm:p-6 rounded-full flex-shrink-0 ${
                  isFree ? "bg-gray-500/30" : "bg-white/20"
                }`}
              >
                {isFree ? (
                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                ) : (
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Stats - POPRAWIONE Z WŁAŚCIWYMI DANYMI */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard
              icon={<Flame className="w-6 h-6 text-orange-500" />}
              label="Twoja passa"
              value={`${stats?.streak || 0} dni`}
              subtitle={stats?.streak > 0 ? "Trzymaj tempo!" : "Zacznij dziś!"}
              bgColor="from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
            />

            <StatCard
              icon={<Target className="w-6 h-6 text-blue-500" />}
              label="Rozwiązanych dzisiaj zadań"
              value={`${stats?.todayExercises || 0}`}
              subtitle={
                (stats?.todayExercises || 0) >= 10 ? "Świetnie!" : "Kontynuuj!"
              }
              bgColor="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
            />
            <StatCard
              icon={<Award className="w-6 h-6 text-purple-500" />}
              label="Max trudność pytań"
              value={`Poziom ${levelProgress?.currentMaxDifficulty || 1}`}
              subtitle={
                pointsToNextDifficulty > 0
                  ? `${pointsToNextDifficulty} pkt do lv3`
                  : "Odblokowane"
              }
              bgColor="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
            />
          </div>
          {/* Epoch Review */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Powtórka z epok
                </h3>
              </div>
            </div>

            {isFree && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Powtórki dostępne tylko w Premium
                </p>
              </div>
            )}

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Wybierz epokę do powtórki - system dopasuje zadania
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EPOCHS.slice(0, 20).map((epoch) => {
                const stats = epochStats?.[epoch.value];
                const progress = stats
                  ? Math.round((stats.completed / stats.total) * 100)
                  : 0;

                return (
                  <button
                    key={epoch.value}
                    onClick={() => startEpochReview(epoch.value)}
                    disabled={isFree}
                    className={`p-4 rounded-lg transition-colors text-left group ${
                      isFree
                        ? "bg-gray-100 dark:bg-gray-700/30 opacity-50 cursor-not-allowed"
                        : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{epoch.emoji}</span>
                      {isFree ? (
                        <Lock className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      )}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                      {epoch.label}
                    </p>
                    {stats && !isFree && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {progress}%
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Powtórka z lektur */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Powtórka z lektur
                </h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {worksStats ? Object.keys(worksStats).length : 0} dostępnych
              </span>
            </div>

            {isFree && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Powtórki dostępne tylko w Premium
                </p>
              </div>
            )}

            {/* Wyszukiwarka */}
            {!isFree && worksStats && Object.keys(worksStats).length > 0 && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Szukaj lektury..."
                  value={workSearchQuery}
                  onChange={(e) => setWorkSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                 rounded-lg bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-white
                 placeholder-gray-500 dark:placeholder-gray-400
                 focus:ring-2 focus:ring-green-500 focus:border-transparent
                 transition-all"
                />
              </div>
            )}

            {!worksStats || Object.keys(worksStats).length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  {isFree
                    ? "Powtórki z lektur dostępne w planie Premium"
                    : "Brak dostępnych lektur z minimum 20 pytaniami"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                {Object.values(worksStats)
                  .filter((work: any) => {
                    if (!workSearchQuery) return true;
                    const query = workSearchQuery.toLowerCase();
                    return work.title.toLowerCase().includes(query);
                  })
                  .sort((a: any, b: any) => {
                    // Sortuj alfabetycznie po tytule
                    return a.title.localeCompare(b.title, "pl");
                  })
                  .map((work: any) => {
                    const progress =
                      work.total > 0
                        ? Math.round((work.completed / work.total) * 100)
                        : 0;

                    return (
                      <button
                        key={work.id}
                        onClick={() => startWorkReview(work.title)}
                        disabled={isFree}
                        className={`p-4 rounded-lg transition-all text-left group border-2 ${
                          isFree
                            ? "bg-gray-100 dark:bg-gray-700/30 opacity-50 cursor-not-allowed border-transparent"
                            : "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                              {work.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {work.total} pytań
                              </span>
                              {work.epoch && (
                                <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                                  {EPOCHS.find((e) => e.value === work.epoch)
                                    ?.label || work.epoch}
                                </span>
                              )}
                            </div>
                          </div>
                          {isFree ? (
                            <Lock className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform ml-2 flex-shrink-0" />
                          )}
                        </div>

                        {work.total > 0 && !isFree && (
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600 dark:text-gray-400">
                                Postęp
                              </span>
                              <span className="font-semibold text-green-700 dark:text-green-300">
                                {progress}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                            {work.completed > 0 && (
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Ukończono {work.completed}/{work.total} pytań •
                                Średnia: {work.avgScore}%
                              </p>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Recent Sessions */}
          {stats?.recentSessions && stats.recentSessions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ostatnie sesje
                </h3>
                <button
                  onClick={() => navigate("/sessions")}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Zobacz więcej
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {stats.recentSessions
                  .slice(0, 3)
                  .map((session: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 
                             rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {session.date}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {session.completed} zadań • {session.correctRate}%
                            poprawnych
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          +{session.points} pkt
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {session.duration} min
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AiPointsWidget />
          <DifficultyProgress />

          {/* Quick Tip - POPRAWIONE */}
          <div
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 
                        rounded-xl p-6 border border-green-200 dark:border-green-800"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="font-bold text-gray-900 dark:text-white">
                Wskazówka dnia
              </h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {getTipOfTheDay()}
            </p>
          </div>

          {/* Performance - POPRAWIONE */}
          {detailedStats?.profile?.averageScore !== undefined && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Twoja skuteczność
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Średni wynik
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {detailedStats.profile.averageScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${detailedStats.profile.averageScore}%`,
                      }}
                    />
                  </div>
                </div>

                <div
                  className={`p-3 ${performanceMsg.bgColor} rounded-lg border border-gray-200 dark:border-gray-700`}
                >
                  <p className={`text-sm ${performanceMsg.color}`}>
                    {performanceMsg.text}
                  </p>
                </div>

                {/* Czas nauki */}
                {detailedStats.sessions?.totalTime > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Łącznie nauki
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {detailedStats.sessions.totalTime}h
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal ze statystykami */}
      <UserStatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
      />
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  bgColor: string;
}> = ({ icon, label, value, subtitle, bgColor }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${bgColor} rounded-xl p-4 border border-gray-200 dark:border-gray-700`}
  >
    <div className="flex items-center gap-3 mb-2">{icon}</div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    {subtitle && (
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
        {subtitle}
      </p>
    )}
  </motion.div>
);
