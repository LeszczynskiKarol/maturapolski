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
  Trophy,
  Zap,
} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiPointsWidget } from "../../components/AiPointsWidget";
import { DifficultyProgress } from "../../components/DifficultyProgress";
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
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  // ✅ POPRAWIONE ŚCIEŻKI API
  const { data: stats } = useQuery({
    queryKey: ["learning-stats"],
    queryFn: () => api.get("/api/learning/stats").then((r) => r.data), // ✅ /api/learning/
  });

  const { data: subscription } = useQuery({
    queryKey: ["subscription-status"],
    queryFn: () => api.get("/api/subscription/status").then((r) => r.data),
  });

  const { data: levelProgress } = useQuery({
    queryKey: ["difficulty-progress"],
    queryFn: () =>
      api.get("/api/learning/difficulty-progress").then((r) => r.data), // ✅ /api/learning/
  });

  const { data: epochStats } = useQuery({
    queryKey: ["epoch-stats"],
    queryFn: () => api.get("/api/learning/epoch-stats").then((r) => r.data), // ✅ /api/learning/
  });

  const isPremium = subscription?.plan === "PREMIUM";
  const isFree = !isPremium;

  // ✅ POPRAWIONA funkcja - autostart
  const startLearningSession = () => {
    if (isFree) {
      toast.error("Sesje nauki dostępne tylko w planie Premium!");
      navigate("/subscription");
      return;
    }

    localStorage.removeItem("sessionFilters");
    localStorage.removeItem("isStudyPlanSession");
    localStorage.removeItem("isEpochReview");

    // ✅ DODAJ FLAG autostart
    localStorage.setItem("autoStartSession", "true");

    navigate("/learn");
  };

  // ✅ POPRAWIONA funkcja - autostart dla epok
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

    // ✅ DODAJ FLAG autostart
    localStorage.setItem("autoStartSession", "true");

    navigate("/learn");
  };

  // frontend/src/features/student/Dashboard.tsx

  const greeting = () => {
    const hour = new Date().getHours();
    const username = user?.username
      ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
      : "";

    if (hour < 12) return `Dzień dobry, ${username}`;
    if (hour < 18) return `Witaj, ${username}`;
    return `Dobry wieczór, ${username}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {greeting()} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Zaczynajmy dzisiejszą naukę!
          </p>
        </div>

        <div className="flex items-center gap-3">
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Odblokuj sesje nauki</h3>
                  </div>
                  <p className="text-blue-100 mb-4">
                    Plan FREE nie obejmuje sesji nauki. Wykup Premium aby
                    otrzymywać szczegółowe oceny AI, 300 punktów miesięcznie i
                    nielimitowany dostęp.
                  </p>
                  <div className="flex items-center gap-6 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>300 punktów AI/mies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Nielimitowane sesje</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>49 zł/miesiąc</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/subscription")}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 
                             font-semibold transition-colors"
                  >
                    Wykup Premium
                  </button>
                </div>
                <Lock className="w-12 h-12 opacity-20" />
              </div>
            </motion.div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Flame className="w-6 h-6 text-orange-500" />}
              label="Dni z rzędu"
              value={stats?.streak || 0}
              bgColor="from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
            />
            <StatCard
              icon={<Trophy className="w-6 h-6 text-yellow-500" />}
              label="Poziom"
              value={levelProgress?.currentMaxDifficulty || 1}
              bgColor="from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
            />
            <StatCard
              icon={<Target className="w-6 h-6 text-blue-500" />}
              label="Dzisiaj"
              value={`${stats?.todayExercises || 0}/20`}
              bgColor="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
            />
            <StatCard
              icon={<Award className="w-6 h-6 text-purple-500" />}
              label="Punkty"
              value={stats?.totalPoints || 0}
              bgColor="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
            />
          </div>

          {/* Główny CTA */}
          <motion.div
            whileHover={!isFree ? { scale: 1.02 } : {}}
            className={`rounded-2xl p-8 text-white ${
              isFree
                ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-60"
                : "bg-gradient-to-br from-blue-600 to-purple-600 cursor-pointer"
            }`}
            onClick={!isFree ? startLearningSession : undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  {isFree && <Lock className="w-6 h-6" />}
                  Rozpocznij naukę
                </h2>
                <p
                  className={`mb-4 ${
                    isFree ? "text-gray-200" : "text-blue-100"
                  }`}
                >
                  {isFree
                    ? "Sesje dostępne tylko w planie Premium"
                    : "Sesja adaptacyjna dostosowana do Twojego poziomu"}
                </p>
                {!isFree && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>20 zadań</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Inteligentny dobór</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        Poziomy 1-{levelProgress?.currentMaxDifficulty || 2}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`p-6 rounded-full ${
                  isFree ? "bg-gray-500/30" : "bg-white/20"
                }`}
              >
                {isFree ? (
                  <Lock className="w-12 h-12" />
                ) : (
                  <Play className="w-12 h-12" />
                )}
              </div>
            </div>
          </motion.div>

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
              {EPOCHS.slice(0, 6).map((epoch) => {
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

          {/* Quick Tip */}
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
              {stats?.streak > 0
                ? `Świetna passa! Wróć jutro, aby kontynuować serię ${stats.streak} dni.`
                : "Zacznij dziś i rozpocznij swoją passę nauki!"}
            </p>
          </div>

          {/* Performance */}
          {stats?.averageScore !== undefined && (
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
                      {stats.averageScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${stats.averageScore}%` }}
                    />
                  </div>
                </div>

                {stats.averageScore >= 80 && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      🎉 Świetnie Ci idzie! Kontynuuj dobrą pracę.
                    </p>
                  </div>
                )}

                {stats.averageScore < 60 && (
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      💪 Nie poddawaj się! Każda sesja to postęp.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
}> = ({ icon, label, value, bgColor }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${bgColor} rounded-xl p-4 border border-gray-200 dark:border-gray-700`}
  >
    <div className="flex items-center gap-3 mb-2">{icon}</div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </motion.div>
);
