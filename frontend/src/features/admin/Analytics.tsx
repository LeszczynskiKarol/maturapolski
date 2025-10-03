// frontend/src/features/admin/Analytics.tsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, FileText, TrendingUp, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { api } from "../../services/api";

export const Analytics: React.FC = () => {
  const { data: analytics } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => api.get("/api/admin/analytics").then((r) => r.data),
  });

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Statystyki platformy</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          title="Użytkownicy"
          value={analytics?.users.total || 0}
          subtitle={`${analytics?.users.active || 0} aktywnych`}
          color="blue"
        />
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          title="Zadania"
          value={analytics?.exercises.total || 0}
          subtitle={`${analytics?.exercises.submissions || 0} rozwiązań`}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Średni wynik"
          value={`${analytics?.performance.averageScore?.toFixed(1) || 0}%`}
          color="purple"
        />
        <StatCard
          icon={<Activity className="w-5 h-5" />}
          title="Aktywność dzienna"
          value={analytics?.dailyActive || 0}
          subtitle="użytkowników"
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Aktywność w czasie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics?.activityOverTime || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3B82F6"
                name="Użytkownicy"
              />
              <Line
                type="monotone"
                dataKey="submissions"
                stroke="#10B981"
                name="Rozwiązania"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Zadania wg kategorii</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics?.exercisesByCategory || []}
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
                {(analytics?.exercisesByCategory || []).map((index: number) => (
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
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}> = ({ icon, title, value, subtitle, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div
          className={`p-2 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );
};
