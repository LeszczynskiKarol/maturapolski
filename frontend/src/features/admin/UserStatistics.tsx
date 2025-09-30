// frontend/src/features/admin/UserStatistics.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Activity,
  TrendingUp,
  Award,
  Target,
  Clock,
  RefreshCw,
  Download,
  Filter,
  Calendar,
} from "lucide-react";
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
} from "recharts";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6366F1",
];

export const UserStatistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  const {
    data: stats,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-user-statistics", timeRange],
    queryFn: async () => {
      const response = await api.get("/api/admin/users/statistics", {
        params: { timeRange },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  // Prepare chart data
  const activityData = [
    { name: "Dziś", value: stats?.overview?.activeToday || 0 },
    { name: "Ten tydzień", value: stats?.overview?.activeThisWeek || 0 },
    { name: "Ten miesiąc", value: stats?.overview?.activeThisMonth || 0 },
  ];

  const levelDistributionData = Object.entries(
    stats?.levelDistribution || {}
  ).map(([level, count]) => ({
    name: `Poziom ${level}`,
    value: count as number,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Statystyki użytkowników
        </h2>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Ostatni tydzień</option>
            <option value="month">Ostatni miesiąc</option>
            <option value="year">Ostatni rok</option>
          </select>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Odśwież
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Eksportuj raport
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Wszyscy użytkownicy</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.overview?.totalUsers || 0}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Aktywni dziś</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.overview?.activeToday || 0}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {(
                  (stats?.overview?.activeToday / stats?.overview?.totalUsers) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Średni poziom</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.averages?.level?.toFixed(1) || 0}
              </p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Średnie punkty</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {Math.round(stats?.averages?.points || 0)}
              </p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Nieaktywni (30d+)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.overview?.inactiveUsers || 0}
              </p>
              <p className="text-xs text-red-600 mt-1">
                {(
                  (stats?.overview?.inactiveUsers /
                    stats?.overview?.totalUsers) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
            <Clock className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Aktywność użytkowników</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Level Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Rozkład poziomów</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={levelDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {levelDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Top 5 użytkowników</h3>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                <th className="pb-3">Pozycja</th>
                <th className="pb-3">Użytkownik</th>
                <th className="pb-3">Poziom</th>
                <th className="pb-3">Punkty</th>
                <th className="pb-3">Średni wynik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats?.topUsers?.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td className="py-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-600"
                          : index === 1
                          ? "bg-gray-100 text-gray-600"
                          : index === 2
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3">
                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {user.profile?.level || 1}
                    </span>
                  </td>
                  <td className="py-3 font-medium">
                    {user.profile?.totalPoints || 0}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${user.profile?.averageScore || 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm">
                        {user.profile?.averageScore?.toFixed(1) || 0}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
