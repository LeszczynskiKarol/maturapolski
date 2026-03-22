// frontend/src/features/admin/LiveActivityPanel.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clock, Crown, RefreshCw, Users, Zap } from "lucide-react";
import { api } from "../../services/api";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

interface ActivityUser {
  id: string;
  email: string;
  username: string;
  role: string;
  lastActiveAt: string;
  isOnline?: boolean;
  todaySubmissions?: number;
  profile?: { level: number; totalPoints: number };
  subscription?: { plan: string };
}

interface ActivityData {
  online: ActivityUser[];
  onlineCount: number;
  activeToday: ActivityUser[];
  activeTodayCount: number;
  timestamp: string;
}

export const LiveActivityPanel: React.FC = () => {
  const [tab, setTab] = useState<"online" | "today">("online");

  const { data, isLoading, dataUpdatedAt } = useQuery<ActivityData>({
    queryKey: ["admin-activity-status"],
    queryFn: () =>
      api.get("/api/admin/users/activity-status").then((r) => r.data),
    refetchInterval: 30_000, // Co 30 sekund
    staleTime: 15_000,
  });

  const onlineUsers = data?.online || [];
  const todayUsers = data?.activeToday || [];
  const displayUsers = tab === "online" ? onlineUsers : todayUsers;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header z licznikami */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Aktywność użytkowników
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {isLoading && <RefreshCw className="w-3 h-3 animate-spin" />}
            <span>
              Odświeżono{" "}
              {dataUpdatedAt
                ? formatDistanceToNow(new Date(dataUpdatedAt), {
                    addSuffix: true,
                    locale: pl,
                  })
                : "..."}
            </span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>

        {/* Liczniki */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTab("online")}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              tab === "online"
                ? "bg-green-100 border-2 border-green-400"
                : "bg-white border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="relative">
              <Users className="w-6 h-6 text-green-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-green-700">
                {data?.onlineCount ?? "—"}
              </p>
              <p className="text-xs text-green-600">Online teraz</p>
            </div>
          </button>

          <button
            onClick={() => setTab("today")}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              tab === "today"
                ? "bg-blue-100 border-2 border-blue-400"
                : "bg-white border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Clock className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="text-2xl font-bold text-blue-700">
                {data?.activeTodayCount ?? "—"}
              </p>
              <p className="text-xs text-blue-600">Aktywni dziś</p>
            </div>
          </button>
        </div>
      </div>

      {/* Lista userów */}
      <div className="max-h-[28rem] overflow-y-auto p-4">
        {displayUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>
              {tab === "online"
                ? "Brak użytkowników online"
                : "Brak aktywnych użytkowników dziś"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {displayUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.username?.[0]?.toUpperCase() || "?"}
                  </div>
                  {(tab === "online" || user.isOnline) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm text-gray-900 truncate">
                      {user.username}
                    </span>
                    {user.subscription?.plan === "PREMIUM" && (
                      <Crown className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    )}
                    {user.role === "ADMIN" && (
                      <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] rounded font-medium flex-shrink-0">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-gray-400">
                      {user.lastActiveAt
                        ? formatDistanceToNow(new Date(user.lastActiveAt), {
                            addSuffix: true,
                            locale: pl,
                          })
                        : "—"}
                    </span>
                    {tab === "today" &&
                      user.todaySubmissions !== undefined &&
                      user.todaySubmissions > 0 && (
                        <span className="text-[11px] text-blue-600 flex items-center gap-0.5">
                          <Zap className="w-3 h-3" />
                          {user.todaySubmissions}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
