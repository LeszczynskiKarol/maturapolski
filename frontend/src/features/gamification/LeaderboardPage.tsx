// frontend/src/features/gamification/LeaderboardPage.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";

export const LeaderboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<
    "daily" | "weekly" | "monthly" | "all"
  >("weekly");
  const [category, setCategory] = useState<string>("all");

  const { data: leaderboard } = useQuery({
    queryKey: ["leaderboard", timeRange, category],
    queryFn: () =>
      api
        .get("/api/leaderboard", {
          params: { timeRange, category },
        })
        .then((r) => r.data),
  });

  const { data: userRank } = useQuery({
    queryKey: ["user-rank"],
    queryFn: () => api.get("/api/student/rank").then((r) => r.data),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Ranking najlepszych</h1>
          <p className="text-gray-600">Rywalizuj z innymi maturzystami</p>
        </div>

        {/* User's Position */}
        {userRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 mb-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 mb-1">Twoja pozycja</p>
                <p className="text-4xl font-bold">#{userRank.position}</p>
                <p className="text-blue-100 mt-1">z {userRank.total} uczniów</p>
              </div>

              <div className="text-right">
                <p className="text-blue-100 mb-1">Punkty</p>
                <p className="text-3xl font-bold">{userRank.points}</p>
                <p className="text-blue-100 mt-1">
                  {userRank.change > 0 ? "↑" : "↓"} {Math.abs(userRank.change)}{" "}
                  pozycji
                </p>
              </div>

              <div className="hidden md:block">
                <Trophy className="w-24 h-24 text-yellow-300 opacity-50" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              {(["daily", "weekly", "monthly", "all"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg ${
                    timeRange === range
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {range === "daily" && "Dziś"}
                  {range === "weekly" && "Tydzień"}
                  {range === "monthly" && "Miesiąc"}
                  {range === "all" && "Wszyscy"}
                </button>
              ))}
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Wszystkie kategorie</option>
              <option value="LANGUAGE_USE">Język w użyciu</option>
              <option value="HISTORICAL_LITERARY">
                Test historycznoliteracki
              </option>
              <option value="WRITING">Pisanie</option>
            </select>
          </div>
        </div>

        {/* Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {leaderboard?.top3.map((user: any, index: number) => (
            <TopPlayerCard key={user.id} user={user} position={index + 1} />
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Pozycja
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Uczeń
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Poziom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Punkty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Zadania
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Średnia
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leaderboard?.users.map((user: any, index: number) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index + 4 <= 3 && (
                        <Medal className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className="font-semibold">#{index + 4}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user.school}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-500" />
                      <span>Poziom {user.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-blue-600">
                      {user.points}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.exercisesCompleted}</td>
                  <td className="px-6 py-4">{user.averageScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TopPlayerCard: React.FC<{ user: any; position: number }> = ({
  user,
  position,
}) => {
  const medals = {
    1: { icon: "🥇", bg: "from-yellow-400 to-yellow-600", text: "Złoty medal" },
    2: { icon: "🥈", bg: "from-gray-300 to-gray-500", text: "Srebrny medal" },
    3: {
      icon: "🥉",
      bg: "from-orange-400 to-orange-600",
      text: "Brązowy medal",
    },
  };

  const medal = medals[position as keyof typeof medals];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: position * 0.1 }}
      className={`bg-gradient-to-br ${medal.bg} p-6 rounded-2xl text-white`}
    >
      <div className="text-center">
        <div className="text-5xl mb-2">{medal.icon}</div>
        <p className="text-sm opacity-90 mb-2">{medal.text}</p>
        <h3 className="text-xl font-bold mb-1">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-3xl font-bold mb-2">{user.points} pkt</p>
        <div className="flex justify-around text-sm mt-4 pt-4 border-t border-white/30">
          <div>
            <p className="opacity-75">Poziom</p>
            <p className="font-bold">{user.level}</p>
          </div>
          <div>
            <p className="opacity-75">Średnia</p>
            <p className="font-bold">{user.averageScore}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
