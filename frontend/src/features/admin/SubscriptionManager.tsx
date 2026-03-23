// frontend/src/features/admin/SubscriptionManager.tsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  RefreshCw,
  CreditCard,
  Crown,
  Zap,
  ChevronDown,
  ChevronUp,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Calendar,
  MoreVertical,
  ArrowUpCircle,
  ArrowDownCircle,
  Download,
  Filter,
  X,
} from "lucide-react";
import { api } from "../../services/api";
import { SubscriptionEditor } from "./SubscriptionEditor";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "react-hot-toast";

interface SubscriptionRow {
  id: string;
  userId: string;
  plan: "FREE" | "PREMIUM";
  status: string;
  isRecurring: boolean;
  aiPointsUsed: number;
  aiPointsLimit: number;
  aiPointsReset: string;
  startDate: string | null;
  endDate: string | null;
  cancelAt: string | null;
  canceledAt: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  // computed
  daysLeft: number | null;
  percentUsed: number;
  hasPendingSubscription: boolean;
  totalAiCalls: number;
  totalPointsPurchases: number;
  // joined
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    createdAt: string;
    lastActiveAt: string | null;
    lastLogin: string | null;
    profile: {
      level: number;
      totalPoints: number;
      studyStreak: number;
    } | null;
  };
}

interface Stats {
  total: number;
  premium: number;
  free: number;
  recurring: number;
  onetime: number;
  active: number;
  canceled: number;
  expiringIn7d: number;
  totalRevenue: number;
  avgPointsUsed: number;
}

export const SubscriptionManager: React.FC = () => {
  const queryClient = useQueryClient();

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [expiringDays, setExpiringDays] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination & sort
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modals
  const [editorUser, setEditorUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [extendModal, setExtendModal] = useState<{
    userId: string;
    username: string;
  } | null>(null);
  const [extendDays, setExtendDays] = useState(30);

  // ---- QUERY ----
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "admin-subscriptions",
      searchTerm,
      filterPlan,
      filterStatus,
      filterType,
      expiringDays,
      currentPage,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: String(currentPage),
        limit: "20",
        sortBy,
        sortOrder,
      };
      if (searchTerm) params.search = searchTerm;
      if (filterPlan !== "all") params.plan = filterPlan;
      if (filterStatus !== "all") params.status = filterStatus;
      if (filterType !== "all") params.type = filterType;
      if (expiringDays) params.expiringDays = expiringDays;

      const res = await api.get("/api/admin/subscriptions", { params });
      return res.data as {
        subscriptions: SubscriptionRow[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
        stats: Stats;
      };
    },
  });

  const subscriptions = data?.subscriptions || [];
  const pagination = data?.pagination;
  const stats = data?.stats;

  // ---- MUTATIONS ----
  const extendMutation = useMutation({
    mutationFn: async ({ userId, days }: { userId: string; days: number }) => {
      const res = await api.post(`/api/admin/subscriptions/${userId}/extend`, {
        days,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        `Przedłużono do ${new Date(data.newEndDate).toLocaleDateString("pl-PL")}`,
      );
      queryClient.invalidateQueries({ queryKey: ["admin-subscriptions"] });
      setExtendModal(null);
    },
    onError: () => toast.error("Błąd przedłużania"),
  });

  const activateMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await api.post(
        `/api/admin/subscriptions/${userId}/activate`,
        { days: 30, isRecurring: false },
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Aktywowano Premium");
      queryClient.invalidateQueries({ queryKey: ["admin-subscriptions"] });
    },
    onError: () => toast.error("Błąd aktywacji"),
  });

  const deactivateMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await api.post(
        `/api/admin/subscriptions/${userId}/deactivate`,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Zdegradowano do FREE");
      queryClient.invalidateQueries({ queryKey: ["admin-subscriptions"] });
    },
    onError: () => toast.error("Błąd deaktywacji"),
  });

  // ---- HELPERS ----
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: string }) =>
    sortBy === field ? (
      sortOrder === "asc" ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )
    ) : null;

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      ACTIVE: "bg-green-100 text-green-700",
      INACTIVE: "bg-gray-100 text-gray-600",
      CANCELED: "bg-red-100 text-red-700",
      PAST_DUE: "bg-orange-100 text-orange-700",
      TRIALING: "bg-blue-100 text-blue-700",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}
      >
        {status}
      </span>
    );
  };

  const planBadge = (plan: string, isRecurring: boolean) => (
    <div className="flex items-center gap-1.5">
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          plan === "PREMIUM"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {plan}
      </span>
      {plan === "PREMIUM" && (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
            isRecurring
              ? "bg-blue-50 text-blue-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {isRecurring ? "Cykliczna" : "30 dni"}
        </span>
      )}
    </div>
  );

  const pointsBar = (used: number, limit: number, percent: number) => {
    const color =
      percent > 90
        ? "bg-red-500"
        : percent > 70
          ? "bg-orange-500"
          : "bg-green-500";
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span>
            {used}/{limit}
          </span>
          <span className={percent > 90 ? "text-red-600 font-semibold" : ""}>
            {percent}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${color}`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterPlan("all");
    setFilterStatus("all");
    setFilterType("all");
    setExpiringDays("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filterPlan !== "all" ||
    filterStatus !== "all" ||
    filterType !== "all" ||
    expiringDays !== "";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-blue-600" />
          Zarządzanie subskrypcjami
        </h1>
        <p className="text-gray-600 mt-1">
          Przeglądaj wszystkie subskrypcje, filtruj i zarządzaj dostępem
          użytkowników
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <StatCard
            label="Łącznie"
            value={stats.total}
            icon={<Users className="w-4 h-4 text-gray-500" />}
          />
          <StatCard
            label="Premium"
            value={stats.premium}
            icon={<Crown className="w-4 h-4 text-yellow-500" />}
          />
          <StatCard
            label="Cykliczne"
            value={stats.recurring}
            icon={<RefreshCw className="w-4 h-4 text-blue-500" />}
          />
          <StatCard
            label="Jednorazowe"
            value={stats.onetime}
            icon={<Calendar className="w-4 h-4 text-green-500" />}
          />
          <StatCard
            label="Aktywne"
            value={stats.active}
            icon={<CheckCircle className="w-4 h-4 text-green-500" />}
          />
          <StatCard
            label="Anulowane"
            value={stats.canceled}
            icon={<XCircle className="w-4 h-4 text-red-500" />}
          />
          <StatCard
            label="Wygasa ≤7d"
            value={stats.expiringIn7d}
            icon={<AlertTriangle className="w-4 h-4 text-orange-500" />}
            alert={stats.expiringIn7d > 0}
          />
          <StatCard
            label="Śr. AI użyte"
            value={stats.avgPointsUsed}
            icon={<Zap className="w-4 h-4 text-purple-500" />}
          />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj po emailu lub nazwie użytkownika..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Quick filter buttons */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 border rounded-lg flex items-center gap-2 text-sm transition-colors ${
              hasActiveFilters
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filtry
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
                {
                  [filterPlan, filterStatus, filterType, expiringDays].filter(
                    (f) => f && f !== "all",
                  ).length
                }
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Wyczyść
            </button>
          )}

          <button
            onClick={() => refetch()}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Odśwież"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Eksportuj
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Plan
              </label>
              <select
                value={filterPlan}
                onChange={(e) => {
                  setFilterPlan(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="all">Wszystkie plany</option>
                <option value="FREE">Free</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="all">Wszystkie statusy</option>
                <option value="ACTIVE">Aktywna</option>
                <option value="INACTIVE">Nieaktywna</option>
                <option value="CANCELED">Anulowana</option>
                <option value="PAST_DUE">Zaległa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Typ
              </label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="all">Wszystkie typy</option>
                <option value="recurring">Cykliczna</option>
                <option value="onetime">Jednorazowa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Wygasa w ciągu (dni)
              </label>
              <select
                value={expiringDays}
                onChange={(e) => {
                  setExpiringDays(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="">Bez filtra</option>
                <option value="1">Jutro</option>
                <option value="3">3 dni</option>
                <option value="7">7 dni</option>
                <option value="14">14 dni</option>
                <option value="30">30 dni</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  onClick={() => handleSort("username")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Użytkownik <SortIcon field="username" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("plan")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Plan <SortIcon field="plan" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Status <SortIcon field="status" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("aiPointsUsed")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Punkty AI <SortIcon field="aiPointsUsed" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wywołania AI
                </th>
                <th
                  onClick={() => handleSort("endDate")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Ważność <SortIcon field="endDate" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stripe
                </th>
                <th
                  onClick={() => handleSort("updatedAt")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Aktualizacja <SortIcon field="updatedAt" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Ładowanie subskrypcji...
                    </div>
                  </td>
                </tr>
              ) : subscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    Brak subskrypcji pasujących do filtrów
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {sub.user.username[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate text-sm">
                            {sub.user.username}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {sub.user.email}
                          </p>
                          {sub.user.profile && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              Lv.{sub.user.profile.level} •{" "}
                              {sub.user.profile.totalPoints} pkt
                              {sub.user.profile.studyStreak > 0 &&
                                ` • 🔥${sub.user.profile.studyStreak}`}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-4 py-3">
                      {planBadge(sub.plan, sub.isRecurring)}
                      {sub.hasPendingSubscription && (
                        <div className="mt-1">
                          <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] font-medium">
                            Zaplanowana sub.
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        {statusBadge(sub.status)}
                        {sub.cancelAt && (
                          <p className="text-[10px] text-red-500">
                            Anulowanie:{" "}
                            {new Date(sub.cancelAt).toLocaleDateString("pl-PL")}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* AI Points */}
                    <td className="px-4 py-3 min-w-[140px]">
                      {sub.plan === "PREMIUM" ? (
                        pointsBar(
                          sub.aiPointsUsed,
                          sub.aiPointsLimit,
                          sub.percentUsed,
                        )
                      ) : (
                        <span className="text-xs text-gray-400">
                          {sub.aiPointsUsed}/{sub.aiPointsLimit}
                        </span>
                      )}
                    </td>

                    {/* AI Calls */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-gray-700">
                        {sub.totalAiCalls}
                      </span>
                      {sub.totalPointsPurchases > 0 && (
                        <p className="text-[10px] text-green-600">
                          +{sub.totalPointsPurchases} zakupów
                        </p>
                      )}
                    </td>

                    {/* Validity */}
                    <td className="px-4 py-3">
                      {sub.plan === "PREMIUM" ? (
                        sub.isRecurring ? (
                          <div className="text-xs text-blue-600">
                            <RefreshCw className="w-3 h-3 inline mr-1" />
                            Automatyczne odnowienie
                          </div>
                        ) : sub.endDate ? (
                          <div>
                            <p className="text-xs font-medium">
                              {new Date(sub.endDate).toLocaleDateString(
                                "pl-PL",
                              )}
                            </p>
                            {sub.daysLeft !== null && (
                              <p
                                className={`text-[10px] font-medium ${
                                  sub.daysLeft <= 3
                                    ? "text-red-600"
                                    : sub.daysLeft <= 7
                                      ? "text-orange-600"
                                      : "text-green-600"
                                }`}
                              >
                                {sub.daysLeft === 0
                                  ? "Wygasa dziś!"
                                  : `${sub.daysLeft} dni`}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>

                    {/* Stripe */}
                    <td className="px-4 py-3">
                      {sub.stripeSubscriptionId ? (
                        <div className="space-y-0.5">
                          <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-medium">
                            Stripe ✓
                          </span>
                          <p className="text-[10px] text-gray-400 truncate max-w-[100px]">
                            {sub.stripeSubscriptionId}
                          </p>
                        </div>
                      ) : sub.stripeCustomerId ? (
                        <span className="px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded text-[10px]">
                          Customer ✓
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-300">Brak</span>
                      )}
                    </td>

                    {/* Updated */}
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {formatDistanceToNow(new Date(sub.updatedAt), {
                        addSuffix: true,
                        locale: pl,
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            setEditorUser({
                              id: sub.userId,
                              name: sub.user.username,
                            })
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edytuj subskrypcję"
                        >
                          <Settings className="w-4 h-4 text-blue-600" />
                        </button>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setActionMenu(
                                actionMenu === sub.id ? null : sub.id,
                              )
                            }
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>

                          {actionMenu === sub.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActionMenu(null)}
                              />
                              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                {sub.plan === "PREMIUM" && !sub.isRecurring && (
                                  <button
                                    onClick={() => {
                                      setExtendModal({
                                        userId: sub.userId,
                                        username: sub.user.username,
                                      });
                                      setActionMenu(null);
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                  >
                                    <Calendar className="w-4 h-4 text-green-600" />
                                    Przedłuż dostęp
                                  </button>
                                )}

                                {sub.plan === "FREE" && (
                                  <button
                                    onClick={() => {
                                      if (
                                        confirm(
                                          `Aktywować Premium dla ${sub.user.username}?`,
                                        )
                                      ) {
                                        activateMutation.mutate(sub.userId);
                                        setActionMenu(null);
                                      }
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                  >
                                    <ArrowUpCircle className="w-4 h-4 text-yellow-600" />
                                    Aktywuj Premium (30d)
                                  </button>
                                )}

                                {sub.plan === "PREMIUM" && (
                                  <button
                                    onClick={() => {
                                      if (
                                        confirm(
                                          `Zdegradować ${sub.user.username} do FREE? Anuluje też Stripe.`,
                                        )
                                      ) {
                                        deactivateMutation.mutate(sub.userId);
                                        setActionMenu(null);
                                      }
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
                                  >
                                    <ArrowDownCircle className="w-4 h-4" />
                                    Zdegraduj do FREE
                                  </button>
                                )}
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
            <div className="text-sm text-gray-600">
              {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)} z{" "}
              {pagination.total}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              {Array.from({ length: Math.min(7, pagination.pages) }, (_, i) => {
                let page: number;
                if (pagination.pages <= 7) {
                  page = i + 1;
                } else if (currentPage <= 4) {
                  page = i + 1;
                } else if (currentPage >= pagination.pages - 3) {
                  page = pagination.pages - 6 + i;
                } else {
                  page = currentPage - 3 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(pagination.pages, currentPage + 1))
                }
                disabled={currentPage === pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Extend Modal */}
      {extendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              Przedłuż dostęp: {extendModal.username}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Liczba dni
                </label>
                <div className="flex gap-2">
                  {[7, 14, 30, 60, 90].map((d) => (
                    <button
                      key={d}
                      onClick={() => setExtendDays(d)}
                      className={`px-3 py-1.5 rounded-lg text-sm border ${
                        extendDays === d
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={extendDays}
                  onChange={(e) => setExtendDays(parseInt(e.target.value) || 0)}
                  min={1}
                  max={365}
                  className="mt-2 w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Własna wartość..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setExtendModal(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                >
                  Anuluj
                </button>
                <button
                  onClick={() =>
                    extendMutation.mutate({
                      userId: extendModal.userId,
                      days: extendDays,
                    })
                  }
                  disabled={extendMutation.isPending || extendDays < 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {extendMutation.isPending && (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  )}
                  Przedłuż o {extendDays} dni
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Editor Modal (reuse existing) */}
      {editorUser && (
        <SubscriptionEditor
          userId={editorUser.id}
          userName={editorUser.name}
          onClose={() => setEditorUser(null)}
          onSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: ["admin-subscriptions"],
            });
            setEditorUser(null);
          }}
        />
      )}
    </div>
  );
};

// ---- Sub-components ----

const StatCard: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
  alert?: boolean;
}> = ({ label, value, icon, alert }) => (
  <div
    className={`bg-white rounded-xl p-3 border shadow-sm ${
      alert ? "border-orange-200" : "border-gray-100"
    }`}
  >
    <div className="flex items-center gap-2 mb-1">{icon}</div>
    <p
      className={`text-xl font-bold ${alert ? "text-orange-600" : "text-gray-900"}`}
    >
      {value}
    </p>
    <p className="text-[10px] text-gray-500 uppercase font-medium">{label}</p>
  </div>
);

export default SubscriptionManager;
