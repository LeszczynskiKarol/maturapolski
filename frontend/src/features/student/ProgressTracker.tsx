// frontend/src/features/student/ProgressTracker.tsx - POPRAWIONA WERSJA

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
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
} from "recharts";
import {
  TrendingUp,
  ChevronLeft,
  Award,
  Target,
  Clock,
  BookOpen,
} from "lucide-react";

export const ProgressTracker: React.FC = () => {
  const navigate = useNavigate();
  const { data: stats } = useQuery({
    queryKey: ["user-progress"],
    queryFn: () => api.get("/api/student/progress").then((r) => r.data),
  });

  const { data: history } = useQuery({
    queryKey: ["exercise-history"],
    queryFn: () => api.get("/api/student/history").then((r) => r.data),
  });

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  // ✅ Filtruj dane dla wykresów - usuń puste wartości
  const filteredTimeDistribution =
    stats?.timeDistribution?.filter((item: any) => item.value > 0) || [];

  const hasTimeData = filteredTimeDistribution.length > 0;

  // ✅ Przygotuj dane dla epok
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

  const epochStatsFormatted = stats?.epochStats
    ?.map((epoch: any) => ({
      epoch: epochLabels[epoch.epoch] || epoch.epoch,
      progress: epoch.progress,
      avgScore: epoch.avgScore,
      completed: epoch.completed,
      total: epoch.total,
    }))
    .sort((a: any, b: any) => b.progress - a.progress);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 
                     hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Powrót
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Twoje postępy
          </h1>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Średni wynik"
          value={`${stats?.averageScore || 0}%`}
          color="blue"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          title="Zdobyte punkty"
          value={stats?.totalPoints || 0}
          subtitle={`Poziom ${stats?.level || 1}`}
          color="green"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Ukończone zadania"
          value={stats?.completedExercises || 0}
          subtitle={`z ${stats?.totalExercises || 0}`}
          color="yellow"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          title="Czas nauki"
          value={`${Math.floor((stats?.totalTime || 0) / 60)}h`}
          subtitle="Ten miesiąc"
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Postęp w czasie
          </h3>
          {stats?.progressData && stats.progressData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Wynik %"
                />
                <Line
                  type="monotone"
                  dataKey="exercises"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Liczba zadań"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-gray-500 dark:text-gray-400">
                Brak danych do wyświetlenia
              </p>
            </div>
          )}
        </div>

        {/* Category Performance */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Wyniki według kategorii
          </h3>
          {stats?.categoryPerformance &&
          stats.categoryPerformance.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={stats.categoryPerformance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Twoje wyniki"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Średnia"
                  dataKey="average"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-gray-500 dark:text-gray-400">
                Brak danych do wyświetlenia
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Rozkład trudności
          </h3>
          {stats?.difficultyStats && stats.difficultyStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.difficultyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="difficulty" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="completed"
                  fill="#3B82F6"
                  name="Ukończone"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="failed"
                  fill="#EF4444"
                  name="Nieudane"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-gray-500 dark:text-gray-400">
                Brak danych do wyświetlenia
              </p>
            </div>
          )}
        </div>

        {/* Time Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Czas poświęcony na kategorie
          </h3>
          {hasTimeData ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredTimeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}min`}
                >
                  {filteredTimeDistribution.map((index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center space-y-2">
                <Clock className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-gray-500 dark:text-gray-400">
                  Rozpocznij sesje nauki, aby zobaczyć statystyki czasu
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ NOWA SEKCJA: Postęp w epokach */}
      {epochStatsFormatted && epochStatsFormatted.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Postęp w epokach literackich
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {epochStatsFormatted.map((epoch: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {epoch.epoch}
                  </h4>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {epoch.avgScore}% poprawnych odp.
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Postęp
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {epoch.completed}/{epoch.total} ({epoch.progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${epoch.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Ostatnia aktywność
        </h3>
        <div className="space-y-3">
          {history?.exercises && history.exercises.length > 0 ? (
            history.exercises
              .slice(0, 10)
              .map((item: any) => (
                <ActivityItem key={item.id} activity={item} />
              ))
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-2">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-gray-500 dark:text-gray-400">
                  Brak aktywności do wyświetlenia
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Rozpocznij naukę, aby zobaczyć swoją historię
                </p>
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
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  color: "blue" | "green" | "yellow" | "purple";
}> = ({ icon, title, value, change, subtitle, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    green:
      "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    yellow:
      "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
        {change !== undefined && (
          <span
            className={`text-sm font-medium ${
              change > 0
                ? "text-green-600"
                : change < 0
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
        {value}
      </p>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

const ActivityItem: React.FC<{ activity: any }> = ({ activity }) => {
  const percentage = activity.percentage || 0;
  const timeAgo =
    activity.timeAgo || new Date(activity.date).toLocaleDateString("pl-PL");

  const categoryLabels: Record<string, string> = {
    LANGUAGE_USE: "Język w użyciu",
    HISTORICAL_LITERARY: "Test historycznoliteracki",
    WRITING: "Pisanie",
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            percentage >= 80
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : percentage >= 60
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {activity.question?.substring(0, 50)}...
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {categoryLabels[activity.category] || activity.category}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900 dark:text-white">
          {percentage.toFixed(0)}%
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
      </div>
    </div>
  );
};
