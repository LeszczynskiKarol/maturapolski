// frontend/src/features/admin/UserManager.tsx

import React, { useState } from "react";
import { SubscriptionEditor } from "./SubscriptionEditor";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  UserPlus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  Download,
  RefreshCw,
  CreditCard,
  Zap,
  Clock,
  Award,
  BookOpen,
  Target,
  Activity,
  Calendar,
  MoreVertical,
  Shield,
  User,
  Lock,
  Unlock,
  Settings,
} from "lucide-react";
import { api } from "../../services/api";
import { UserDetailsModal } from "./UserDetailsModal";
import { UserProgressEditor } from "./UserProgressEditor";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "react-hot-toast";

interface UserData {
  id: string;
  email: string;
  username: string;
  role: "STUDENT" | "ADMIN";
  createdAt: string;
  lastLogin?: string;
  profile?: {
    studyStreak: number;
    totalPoints: number;
    level: number;
    averageScore: number;
    examDate?: string;
  };
  levelProgress?: {
    unlockedDifficulty: number;
    difficulty1Points: number;
    difficulty2Points: number;
    difficulty3Points: number;
    difficulty4Points: number;
    difficulty5Points: number;
  };
  subscription?: {
    id: string;
    plan: "FREE" | "PREMIUM";
    isRecurring: boolean;
    status: string;
    aiPointsUsed: number;
    aiPointsLimit: number;
    aiPointsReset: string;
    endDate?: string;
  };
  stats: {
    totalSubmissions: number;
    totalSessions: number;
    totalExams: number;
    averageScore: number;
    lastActive?: string;
    weeklyExercises: number;
    weeklyStudyTime: number;
  };
}

export const UserManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const [subscriptionEditorUser, setSubscriptionEditorUser] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Modals
  const [detailsModalUser, setDetailsModalUser] = useState<string | null>(null);
  const [editProgressUser, setEditProgressUser] = useState<UserData | null>(
    null
  );
  const [bulkActionMenu, setBulkActionMenu] = useState(false);

  // Fetch users
  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-users",
      searchTerm,
      filterRole,
      currentPage,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await api.get("/api/admin/users", {
        params: {
          search: searchTerm,
          role: filterRole,
          page: currentPage,
          limit: 20,
          sortBy,
          sortOrder,
        },
      });
      return response.data;
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.delete(`/api/admin/users/${userId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Użytkownik został usunięty");
    },
    onError: () => {
      toast.error("Błąd podczas usuwania użytkownika");
    },
  });

  // Reset progress mutation
  const resetProgressMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.post(
        `/api/admin/users/${userId}/reset-progress`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Postępy użytkownika zostały zresetowane");
    },
    onError: () => {
      toast.error("Błąd podczas resetowania postępów");
    },
  });

  const users = data?.users || [];
  const pagination = data?.pagination;

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Handle selection
  const toggleUserSelection = (userId: string) => {
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedUsers(newSelection);
  };

  const toggleAllSelection = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u: UserData) => u.id)));
    }
  };

  // Get difficulty badge
  const getDifficultyBadge = (difficulty: number) => {
    const colors = [
      "bg-green-100 text-green-700",
      "bg-blue-100 text-blue-700",
      "bg-yellow-100 text-yellow-700",
      "bg-orange-100 text-orange-700",
      "bg-red-100 text-red-700",
    ];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          colors[difficulty - 1]
        }`}
      >
        Poziom {difficulty}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Zarządzanie użytkownikami
        </h1>
        <p className="text-gray-600 mt-1">
          Przeglądaj i zarządzaj kontami użytkowników, ich postępami i
          uprawnieniami
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Wszyscy użytkownicy</p>
              <p className="text-2xl font-bold text-gray-900">
                {pagination?.total || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Aktywni dziś</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  users.filter((u: UserData) => {
                    const lastActive = u.stats.lastActive;
                    if (!lastActive) return false;
                    const diff = Date.now() - new Date(lastActive).getTime();
                    return diff < 24 * 60 * 60 * 1000;
                  }).length
                }
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Średni poziom</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.length > 0
                  ? (
                      users.reduce(
                        (acc: number, u: UserData) =>
                          acc + (u.profile?.level || 1),
                        0
                      ) / users.length
                    ).toFixed(1)
                  : 0}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Średni wynik</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.length > 0
                  ? (
                      users.reduce(
                        (acc: number, u: UserData) =>
                          acc + u.stats.averageScore,
                        0
                      ) / users.length
                    ).toFixed(1)
                  : 0}
                %
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj po imieniu, nazwisku lub emailu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Wszystkie role</option>
            <option value="STUDENT">Uczeń</option>
            <option value="ADMIN">Administrator</option>
          </select>

          {/* Bulk Actions */}
          {selectedUsers.size > 0 && (
            <div className="relative">
              <button
                onClick={() => setBulkActionMenu(!bulkActionMenu)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
              >
                Akcje ({selectedUsers.size})
                <ChevronDown className="w-4 h-4" />
              </button>

              {bulkActionMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      selectedUsers.forEach((id) =>
                        resetProgressMutation.mutate(id)
                      );
                      setSelectedUsers(new Set());
                      setBulkActionMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resetuj postępy
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Czy na pewno chcesz usunąć ${selectedUsers.size} użytkowników?`
                        )
                      ) {
                        selectedUsers.forEach((id) =>
                          deleteUserMutation.mutate(id)
                        );
                        setSelectedUsers(new Set());
                        setBulkActionMenu(false);
                      }
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Usuń zaznaczonych
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Export */}
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Eksportuj
          </button>

          {/* Add User */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            Dodaj użytkownika
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.size === users.length && users.length > 0
                    }
                    onChange={toggleAllSelection}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th
                  onClick={() => handleSort("userName")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Użytkownik
                    {sortBy === "userName" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Poziom i Punkty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Odblokowane poziomy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subskrypcja i AI
                </th>
                <th
                  onClick={() => handleSort("createdAt")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Aktywność
                    {sortBy === "createdAt" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statystyki
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Ładowanie...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Brak użytkowników do wyświetlenia
                  </td>
                </tr>
              ) : (
                users.map((user: UserData) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.username[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {user.role === "ADMIN" ? (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Admin
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium flex items-center gap-1">
                                <User className="w-3 h-3" />
                                Uczeń
                              </span>
                            )}
                            {user.profile && user.profile.studyStreak > 7 && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                                🔥 {user.profile.studyStreak} dni
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">
                            Poziom {user.profile?.level || 1}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {user.profile?.totalPoints || 0} pkt
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                ((user.profile?.totalPoints || 0) % 1000) / 10,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div key={level} className="flex items-center gap-2">
                            {(user.levelProgress?.unlockedDifficulty || 2) >=
                            level ? (
                              <>
                                <Unlock className="w-4 h-4 text-green-500" />
                                {getDifficultyBadge(level)}
                                <span className="text-xs text-gray-600">
                                  (
                                  {user.levelProgress?.[
                                    `difficulty${level}Points` as keyof typeof user.levelProgress
                                  ] || 0}{" "}
                                  pkt)
                                </span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  Poziom {level} (zablokowany)
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                user.subscription?.plan === "PREMIUM"
                                  ? "text-yellow-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {user.subscription?.plan || "FREE"}
                            </span>
                            {/* ✅ NOWY BADGE */}
                            {user.subscription?.plan === "PREMIUM" && (
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full ${
                                  user.subscription?.isRecurring
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {user.subscription?.isRecurring
                                  ? "Subskrypcja"
                                  : "30 dni"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* ✅ DODAJ INFORMACJĘ O DACIE WYGAŚNIĘCIA */}
                        {user.subscription?.plan === "PREMIUM" &&
                          !user.subscription?.isRecurring &&
                          user.subscription?.endDate && (
                            <div className="flex items-center gap-2 text-xs text-orange-600">
                              <Clock className="w-3 h-3" />
                              Wygasa:{" "}
                              {new Date(
                                user.subscription.endDate
                              ).toLocaleDateString("pl-PL")}
                            </div>
                          )}

                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">
                            {user.subscription?.aiPointsUsed || 0} /{" "}
                            {user.subscription?.aiPointsLimit || 20}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            setSubscriptionEditorUser({
                              id: user.id,
                              name: `${user.username}`,
                            })
                          }
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Settings className="w-3 h-3" />
                          Zarządzaj
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Ostatnia aktywność:{" "}
                            {user.stats.lastActive
                              ? formatDistanceToNow(
                                  new Date(user.stats.lastActive),
                                  {
                                    addSuffix: true,
                                    locale: pl,
                                  }
                                )
                              : "Brak"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Dołączył:{" "}
                            {formatDistanceToNow(new Date(user.createdAt), {
                              addSuffix: true,
                              locale: pl,
                            })}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <span>{user.stats.totalSubmissions} zadań</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="w-4 h-4 text-gray-400" />
                            <span>{user.stats.totalSessions} sesji</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4 text-gray-400" />
                            <span>
                              {user.stats.averageScore.toFixed(1)}% śr.
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{user.stats.weeklyStudyTime} min/tydz.</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setDetailsModalUser(user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Zobacz szczegóły"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setEditProgressUser(user)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edytuj postępy"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() =>
                              setUserMenuOpen(
                                userMenuOpen === user.id ? null : user.id
                              )
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Więcej opcji"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>

                          {userMenuOpen === user.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setUserMenuOpen(null)}
                              />
                              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                <button
                                  onClick={() => {
                                    resetProgressMutation.mutate(user.id);
                                    setUserMenuOpen(null);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  Resetuj postępy
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      confirm(
                                        `Czy na pewno chcesz usunąć użytkownika ${user.username}?`
                                      )
                                    ) {
                                      deleteUserMutation.mutate(user.id);
                                      setUserMenuOpen(null);
                                    }
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600 border-t border-gray-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Usuń użytkownika
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Wyświetlanie{" "}
              <span className="font-medium">
                {(pagination.page - 1) * pagination.limit + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              z <span className="font-medium">{pagination.total}</span> wyników
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Poprzednia
              </button>
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {pagination.pages > 5 && <span className="px-2 py-1">...</span>}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(pagination.pages, currentPage + 1))
                }
                disabled={currentPage === pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Następna
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {detailsModalUser && (
        <UserDetailsModal
          userId={detailsModalUser}
          onClose={() => setDetailsModalUser(null)}
        />
      )}

      {editProgressUser && (
        <UserProgressEditor
          user={editProgressUser}
          onClose={() => setEditProgressUser(null)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            setEditProgressUser(null);
          }}
        />
      )}
      {subscriptionEditorUser && (
        <SubscriptionEditor
          userId={subscriptionEditorUser.id}
          userName={subscriptionEditorUser.name}
          onClose={() => setSubscriptionEditorUser(null)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            setSubscriptionEditorUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManager;
