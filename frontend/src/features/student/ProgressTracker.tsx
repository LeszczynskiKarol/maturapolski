// frontend/src/features/student/ProgressTracker.tsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  Award,
  Target,
  Brain,
  Clock,
  BookOpen,
} from "lucide-react";

export const ProgressTracker: React.FC = () => {
  const { data: stats } = useQuery({
    queryKey: ["user-progress"],
    queryFn: () => api.get("/api/student/progress").then((r) => r.data),
  });

  const { data: history } = useQuery({
    queryKey: ["exercise-history"],
    queryFn: () => api.get("/api/student/history").then((r) => r.data),
  });

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Twoje postępy</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Średni wynik"
          value={`${stats?.averageScore || 0}%`}
          change={stats?.scoreChange || 0}
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
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Postęp w czasie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.progressData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="exercises"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Wyniki według kategorii
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={stats?.categoryPerformance || []}>
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
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Rozkład trudności</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.difficultyStats || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="difficulty" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#3B82F6" />
              <Bar dataKey="failed" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Czas poświęcony na kategorie
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.timeDistribution || []}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {(stats?.timeDistribution || []).map(
                  (entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Ostatnia aktywność</h3>
        <div className="space-y-3">
          {history?.slice(0, 10).map((item: any) => (
            <ActivityItem key={item.id} activity={item} />
          ))}
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
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
        {change !== undefined && (
          <span
            className={`text-sm font-medium ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
};

const ActivityItem: React.FC<{ activity: any }> = ({ activity }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-lg ${
          activity.score >= 80
            ? "bg-green-100 text-green-600"
            : activity.score >= 60
            ? "bg-yellow-100 text-yellow-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        <BookOpen className="w-4 h-4" />
      </div>
      <div>
        <p className="font-medium">{activity.exerciseName}</p>
        <p className="text-sm text-gray-600">{activity.category}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">{activity.score}%</p>
      <p className="text-xs text-gray-500">{activity.timeAgo}</p>
    </div>
  </div>
);
