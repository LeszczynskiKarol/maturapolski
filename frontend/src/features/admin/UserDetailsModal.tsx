// frontend/src/features/admin/UserDetailsModal.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  X,
  User,
  Mail,
  Calendar,
  Award,
  Target,
  BookOpen,
  Clock,
  TrendingUp,
  Activity,
  ChevronRight,
  Download,
  RefreshCw,
} from "lucide-react";
import { api } from "../../services/api";
import { format, formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart,
} from "recharts";

interface UserDetailsModalProps {
  userId: string;
  onClose: () => void;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
const EPOCH_NAMES = {
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

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  userId,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "progress" | "activity" | "submissions" | "materials"
  >("overview");

  const { data: user, isLoading } = useQuery({
    queryKey: ["admin-user-details", userId],
    queryFn: async () => {
      const response = await api.get(`/api/admin/users/${userId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin" />
          Ładowanie danych użytkownika...
        </div>
      </div>
    );
  }

  // Prepare chart data
  const dailyProgressData =
    user?.dailyProgress
      ?.map((day: any) => ({
        date: format(new Date(day.date), "dd.MM"),
        exercises: day.exercisesCount,
        time: day.studyTime,
        score: day.averageScore || 0,
      }))
      .reverse() || [];

  const epochProgressData = Object.entries(
    user?.analytics?.epochProgress || {}
  ).map(([epoch, data]: [string, any]) => ({
    name: EPOCH_NAMES[epoch as keyof typeof EPOCH_NAMES],
    completed: data.completed,
    points: data.totalPoints,
    average: Math.round(data.averageScore * 10) / 10,
  }));

  const categoryData = [
    { name: "Użycie języka", value: 0, total: 0 },
    { name: "Hist.-literackie", value: 0, total: 0 },
    { name: "Tworzenie", value: 0, total: 0 },
  ];

  user?.submissions?.forEach((sub: any) => {
    const category = sub.exercise.category;
    const idx =
      category === "LANGUAGE_USE"
        ? 0
        : category === "HISTORICAL_LITERARY"
        ? 1
        : 2;
    categoryData[idx].total++;
    if (sub.score >= 60) categoryData[idx].value++;
  });

  const difficultyRadarData = [1, 2, 3, 4, 5].map((level) => ({
    difficulty: `Poziom ${level}`,
    points: user?.levelProgress?.[`difficulty${level}Points`] || 0,
    maxPoints: level === 1 || level === 2 ? 100 : level === 3 ? 200 : 300,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">ID: {user?.id}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user?.role === "ADMIN" ? "Administrator" : "Uczeń"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            {[
              { id: "overview", label: "Przegląd", icon: User },
              { id: "progress", label: "Postępy", icon: TrendingUp },
              { id: "activity", label: "Aktywność", icon: Activity },
              { id: "submissions", label: "Zadania", icon: BookOpen },
              { id: "materials", label: "Materiały", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-1 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 180px)" }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Key Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Award className="w-8 h-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-900">
                      {user?.profile?.level || 1}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">Poziom</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Target className="w-8 h-8 text-green-600" />
                    <span className="text-2xl font-bold text-green-900">
                      {user?.profile?.totalPoints || 0}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">Punkty</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Activity className="w-8 h-8 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-900">
                      {user?.profile?.studyStreak || 0}
                    </span>
                  </div>
                  <p className="text-sm text-purple-700 mt-2">Dni z rzędu</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-900">
                      {user?.profile?.averageScore?.toFixed(1) || 0}%
                    </span>
                  </div>
                  <p className="text-sm text-orange-700 mt-2">Średni wynik</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Informacje o koncie
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Data rejestracji</p>
                    <p className="font-medium">
                      {format(new Date(user?.createdAt), "dd MMMM yyyy", {
                        locale: pl,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ostatnie logowanie</p>
                    <p className="font-medium">
                      {user?.lastLogin
                        ? formatDistanceToNow(new Date(user.lastLogin), {
                            addSuffix: true,
                            locale: pl,
                          })
                        : "Brak danych"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data matury</p>
                    <p className="font-medium">
                      {user?.profile?.examDate
                        ? format(
                            new Date(user.profile.examDate),
                            "dd MMMM yyyy",
                            { locale: pl }
                          )
                        : "Nie ustawiono"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Odblokowany poziom</p>
                    <p className="font-medium">
                      Poziom {user?.levelProgress?.unlockedDifficulty || 2}
                    </p>
                  </div>
                </div>
              </div>

              {/* Level Progress Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Punkty na poziomach
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((level) => {
                    const points =
                      user?.levelProgress?.[`difficulty${level}Points`] || 0;
                    const maxPoints =
                      level <= 2 ? 100 : level === 3 ? 200 : 300;
                    const isUnlocked =
                      (user?.levelProgress?.unlockedDifficulty || 2) >= level;

                    return (
                      <div key={level} className="flex items-center gap-4">
                        <div className="w-24 font-medium text-sm">
                          Poziom {level}
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isUnlocked
                                ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                : "bg-gray-400"
                            }`}
                            style={{ width: `${(points / maxPoints) * 100}%` }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {points} / {maxPoints} pkt
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            isUnlocked ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          {isUnlocked ? "✓ Odblokowany" : "🔒 Zablokowany"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-6">
              {/* Progress Charts */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Postępy w czasie</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="exercises"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      name="Liczba zadań"
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stackId="2"
                      stroke="#10B981"
                      fill="#10B981"
                      name="Średni wynik"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Epoch Progress */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Postępy w epokach
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={epochProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="completed"
                      fill="#3B82F6"
                      name="Ukończone zadania"
                    />
                    <Bar
                      dataKey="average"
                      fill="#10B981"
                      name="Średni wynik %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Difficulty Radar Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Profil trudności</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={difficultyRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="difficulty" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Zdobyte punkty"
                      dataKey="points"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Maksimum"
                      dataKey="maxPoints"
                      stroke="#E5E7EB"
                      fill="#E5E7EB"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-6">
              {/* Recent Sessions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Ostatnie sesje nauki
                </h3>
                <div className="space-y-2">
                  {user?.learningSessions?.map((session: any) => (
                    <div
                      key={session.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            session.status === "COMPLETED"
                              ? "bg-green-500"
                              : session.status === "IN_PROGRESS"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <div>
                          <p className="font-medium">
                            Sesja #{session.id.slice(-6)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {format(
                              new Date(session.startedAt),
                              "dd MMMM yyyy, HH:mm",
                              { locale: pl }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {session.completed} zadań • {session.points} pkt
                        </p>
                        <p className="text-sm text-gray-600">
                          Czas: {Math.floor(session.timeSpent / 60)} min
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Progress */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Postępy tygodniowe
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {user?.weeklyProgress?.map((week: any) => (
                    <div
                      key={week.id}
                      className={`p-3 rounded-lg text-center ${
                        week.completed
                          ? "bg-green-100 border border-green-300"
                          : "bg-gray-100 border border-gray-300"
                      }`}
                    >
                      <p className="text-sm font-medium">Tydzień {week.week}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {week.completed ? "✓ Ukończony" : "W trakcie"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Historia zadań</h3>
              <div className="space-y-2">
                {user?.submissions?.map((submission: any) => (
                  <div
                    key={submission.id}
                    className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {submission.exercise.question.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                        <span className="px-2 py-0.5 bg-white rounded">
                          {submission.exercise.type.replace(/_/g, " ")}
                        </span>
                        <span>Trudność: {submission.exercise.difficulty}</span>
                        <span>
                          {format(
                            new Date(submission.createdAt),
                            "dd.MM.yyyy HH:mm"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          (submission.score || 0) >= 80
                            ? "text-green-600"
                            : (submission.score || 0) >= 60
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {submission.score?.toFixed(0) || 0}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {submission.exercise.points} pkt
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "materials" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Przeczytane materiały
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {user?.materialProgress?.map((progress: any) => (
                  <div key={progress.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{progress.material.title}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {progress.material.category.replace(/_/g, " ")}
                        </p>
                      </div>
                      {progress.completed ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Ukończone
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          {progress.progress}%
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${progress.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Ostatni dostęp:{" "}
                        {formatDistanceToNow(new Date(progress.lastAccessed), {
                          addSuffix: true,
                          locale: pl,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={() => {
              // Export user data
              const dataStr = JSON.stringify(user, null, 2);
              const dataUri =
                "data:application/json;charset=utf-8," +
                encodeURIComponent(dataStr);
              const exportFileDefaultName = `user-${user?.id}-data.json`;
              const linkElement = document.createElement("a");
              linkElement.setAttribute("href", dataUri);
              linkElement.setAttribute("download", exportFileDefaultName);
              linkElement.click();
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Eksportuj dane
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
