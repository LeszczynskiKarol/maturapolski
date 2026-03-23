// frontend/src/features/admin/EmailDashboard.tsx

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Mail,
  Send,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MousePointer,
  TrendingUp,
  Shield,
  RefreshCw,
  Play,
  Trash2,
  Search,
  Users,
  Ban,
  MailOpen,
} from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";
import { formatDistanceToNow, format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CAMPAIGN_LABELS: Record<string, string> = {
  STREAK_REMINDER: "Przypomnienie o passie",
  STREAK_MILESTONE_3: "Milestone: 3 dni",
  STREAK_MILESTONE_7: "Milestone: 7 dni",
  STREAK_MILESTONE_14: "Milestone: 14 dni",
  STREAK_MILESTONE_30: "Milestone: 30 dni",
  WEEKLY_SUMMARY: "Tygodniowe podsumowanie",
  REENGAGEMENT_7D: "Re-engagement: 7 dni",
  REENGAGEMENT_14D: "Re-engagement: 14 dni",
  REENGAGEMENT_30D: "Re-engagement: 30 dni",
  REENGAGEMENT_60D: "Re-engagement: 60 dni",
  REENGAGEMENT_90D: "Re-engagement: 90 dni",
  REENGAGEMENT_FAREWELL: "Pożegnanie",
  FIRST_DAY_ACTIVATION: "Aktywacja (D+1)",
  FREE_LIMIT_HIT: "Limit wyczerpany",
  LEVEL_UNLOCK: "Nowy poziom",
  EXAM_COUNTDOWN_90: "Matura: 90 dni",
  EXAM_COUNTDOWN_60: "Matura: 60 dni",
  EXAM_COUNTDOWN_30: "Matura: 30 dni",
  EXAM_COUNTDOWN_14: "Matura: 14 dni",
  EXAM_COUNTDOWN_7: "Matura: 7 dni",
  EXAM_COUNTDOWN_3: "Matura: 3 dni",
  EXAM_COUNTDOWN_1: "Matura: 1 dzień",
  MATURA_GLOBAL_30D: "Matura globalna: miesiąc",
  MATURA_GLOBAL_14D: "Matura globalna: 2 tyg",
  MATURA_GLOBAL_FINAL: "Matura globalna: tuż tuż",
  ESSAY_REMINDER: "Wypracowanie",
  MONTHLY_REPORT: "Raport miesięczny",
};

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#F97316",
  "#06B6D4",
];

type TabType = "overview" | "campaigns" | "suppression" | "events" | "triggers";

export const EmailDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [days, setDays] = useState(30);
  const [eventFilter, setEventFilter] = useState<string>("");
  const [emailSearch, setEmailSearch] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const {
    data: analytics,
    isLoading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useQuery({
    queryKey: ["email-analytics", days],
    queryFn: async () => {
      const res = await api.get(
        `/api/admin/email-analytics/analytics/overview?days=${days}`,
      );
      return res.data;
    },
  });

  const { data: previewData } = useQuery({
    queryKey: ["email-preview", previewId],
    queryFn: async () => {
      const res = await api.get(`/api/admin/email/preview/${previewId}`);
      return res.data;
    },
    enabled: !!previewId,
  });

  const { data: emailStats, refetch: refetchStats } = useQuery({
    queryKey: ["email-stats"],
    queryFn: async () => {
      const res = await api.get("/api/admin/email/stats");
      return res.data;
    },
  });

  const { data: recentLogs } = useQuery({
    queryKey: ["email-recent"],
    queryFn: async () => {
      const res = await api.get("/api/admin/email/recent?limit=30");
      return res.data;
    },
  });

  const { data: suppression, refetch: refetchSuppression } = useQuery({
    queryKey: ["email-suppression"],
    queryFn: async () => {
      const res = await api.get(
        "/api/admin/email-analytics/analytics/suppression",
      );
      return res.data;
    },
    enabled: activeTab === "suppression",
  });

  const { data: events, refetch: refetchEvents } = useQuery({
    queryKey: ["email-events", eventFilter, emailSearch],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "50" });
      if (eventFilter) params.set("type", eventFilter);
      if (emailSearch) params.set("email", emailSearch);
      const res = await api.get(
        `/api/admin/email-analytics/analytics/events?${params}`,
      );
      return res.data;
    },
    enabled: activeTab === "events",
  });

  // ---- MUTATIONS ----

  const triggerMutation = useMutation({
    mutationFn: async (job: string) => {
      const res = await api.post(`/api/admin/email/trigger/${job}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Job uruchomiony");
      refetchAnalytics();
      refetchStats();
    },
    onError: () => toast.error("Błąd uruchamiania joba"),
  });

  const removeSuppression = useMutation({
    mutationFn: async (email: string) => {
      const res = await api.delete(
        `/api/admin/email-analytics/analytics/suppression/${encodeURIComponent(email)}`,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Usunięto z suppression list");
      refetchSuppression();
    },
    onError: () => toast.error("Błąd usuwania"),
  });

  // ---- HELPERS ----

  const healthColor = (status: string) =>
    status === "OK"
      ? "text-green-600 bg-green-50"
      : status === "WARNING"
        ? "text-yellow-600 bg-yellow-50"
        : "text-red-600 bg-red-50";

  const healthIcon = (status: string) =>
    status === "OK" ? (
      <CheckCircle className="w-5 h-5" />
    ) : status === "WARNING" ? (
      <AlertTriangle className="w-5 h-5" />
    ) : (
      <XCircle className="w-5 h-5" />
    );

  const eventIcon = (type: string) => {
    switch (type) {
      case "DELIVERY":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "BOUNCE":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "COMPLAINT":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "OPEN":
        return <Eye className="w-4 h-4 text-blue-500" />;
      case "CLICK":
        return <MousePointer className="w-4 h-4 text-purple-500" />;
      default:
        return <Mail className="w-4 h-4 text-gray-400" />;
    }
  };

  if (analyticsLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-3" />
        <span>Ładowanie analityki email...</span>
      </div>
    );
  }

  const a = analytics;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Email &amp; Mailing
          </h1>
          <p className="text-gray-500 mt-1">
            Analityka, kampanie, bounce handling
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value={7}>7 dni</option>
            <option value={14}>14 dni</option>
            <option value={30}>30 dni</option>
            <option value={90}>90 dni</option>
          </select>
          <button
            onClick={() => {
              refetchAnalytics();
              refetchStats();
            }}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SES Health Banner */}
      {a?.health && (
        <div
          className={`rounded-xl p-4 flex items-center gap-3 ${healthColor(a.health.bounceStatus === "DANGER" || a.health.complaintStatus === "DANGER" ? "DANGER" : a.health.bounceStatus === "WARNING" || a.health.complaintStatus === "WARNING" ? "WARNING" : "OK")}`}
        >
          {healthIcon(
            a.health.bounceStatus === "DANGER" ||
              a.health.complaintStatus === "DANGER"
              ? "DANGER"
              : a.health.bounceStatus,
          )}
          <span className="font-medium">{a.health.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1">
          {[
            { id: "overview" as TabType, label: "Przegląd", icon: TrendingUp },
            { id: "campaigns" as TabType, label: "Kampanie", icon: Send },
            { id: "suppression" as TabType, label: "Suppression", icon: Ban },
            { id: "events" as TabType, label: "Eventy", icon: Mail },
            { id: "triggers" as TabType, label: "Triggery", icon: Play },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
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

      {/* ============ TAB: OVERVIEW ============ */}
      {activeTab === "overview" && a && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KpiCard
              icon={<Send className="w-5 h-5 text-blue-500" />}
              label="Wysłane"
              value={a.overview.totalSent}
            />
            <KpiCard
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              label="Dostarczono"
              value={a.overview.totalDelivered}
              sub={`${a.rates.deliveryRate}%`}
            />
            <KpiCard
              icon={<XCircle className="w-5 h-5 text-red-500" />}
              label="Bounce"
              value={a.overview.totalBounced}
              sub={`${a.rates.bounceRate}%`}
              alert={a.rates.bounceRate > 2}
            />
            <KpiCard
              icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
              label="Complaint"
              value={a.overview.totalComplaints}
              sub={`${a.rates.complaintRate}%`}
              alert={a.rates.complaintRate > 0.05}
            />
            <KpiCard
              icon={<MailOpen className="w-5 h-5 text-indigo-500" />}
              label="Otwarte"
              value={a.overview.totalOpened}
              sub={`${a.rates.openRate}%`}
            />
            <KpiCard
              icon={<MousePointer className="w-5 h-5 text-purple-500" />}
              label="Kliknięte"
              value={a.overview.totalClicked}
              sub={`${a.rates.clickRate}%`}
            />
          </div>

          {/* Daily Trend Chart */}
          {a.dailyTrend?.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Trend dzienny</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={a.dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sent"
                    name="Wysłane"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="delivered"
                    name="Dostarczono"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="opened"
                    name="Otwarte"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="bounced"
                    name="Bounce"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Bottom row: Preferences + Bounce breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preferencje */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                Preferencje email
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Opt-in rate</span>
                  <span className="text-lg font-bold text-green-600">
                    {a.preferences.optInRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    Łącznie userów z preferencjami
                  </span>
                  <span>{a.preferences.totalUsers}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Wypisani z wszystkiego</span>
                  <span className="text-red-600 font-medium">
                    {a.preferences.optedOutAll}
                  </span>
                </div>
                <hr />
                <p className="text-xs text-gray-400 font-medium uppercase">
                  Opt-out per kategoria:
                </p>
                {a.preferences.categoryOptOuts &&
                  Object.entries(a.preferences.categoryOptOuts).map(
                    ([cat, count]) => (
                      <div
                        key={cat}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-gray-500">{cat}</span>
                        <span>{String(count)}</span>
                      </div>
                    ),
                  )}
              </div>
            </div>

            {/* Bounce breakdown */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                Bounce &amp; Suppression
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">
                      {a.bounces.hard}
                    </p>
                    <p className="text-xs text-red-500">Hard bounce</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {a.bounces.soft}
                    </p>
                    <p className="text-xs text-yellow-500">Soft bounce</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-600">
                      {a.suppression.total}
                    </p>
                    <p className="text-xs text-gray-500">Suppressed</p>
                  </div>
                </div>
                {a.suppression.byReason?.length > 0 && (
                  <div className="text-sm space-y-1">
                    {a.suppression.byReason.map((r: any) => (
                      <div key={r.reason} className="flex justify-between">
                        <span className="text-gray-500">{r.reason}</span>
                        <span className="font-medium">{r.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ TAB: CAMPAIGNS ============ */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          {/* Campaign breakdown chart */}
          {a?.campaignBreakdown?.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Wysyłki wg kampanii
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={a.campaignBreakdown.map((c: any) => ({
                      name: CAMPAIGN_LABELS[c.type] || c.type,
                      count: c.count,
                    }))}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={180}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Udział kampanii</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={a.campaignBreakdown.slice(0, 8).map((c: any) => ({
                        name: CAMPAIGN_LABELS[c.type] || c.type,
                        value: c.count,
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {a.campaignBreakdown
                        .slice(0, 8)
                        .map((_: any, i: number) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recent sends table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Ostatnie wysyłki</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Typ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Odbiorca
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Temat
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Kiedy
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Podgląd
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentLogs?.map((log: any) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                          {CAMPAIGN_LABELS[log.type] || log.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 text-xs">
                            {log.userEmail}
                          </p>
                          <p className="text-xs text-gray-400">
                            {log.userName}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">
                        {log.subject || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {formatDistanceToNow(new Date(log.sentAt), {
                          addSuffix: true,
                          locale: pl,
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setPreviewId(log.id)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"
                          title="Podgląd treści"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============ TAB: SUPPRESSION ============ */}
      {activeTab === "suppression" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Suppression List ({suppression?.total || 0})
            </h3>
            <button
              onClick={() => refetchSuppression()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          {suppression?.list?.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-300" />
              <p>
                Suppression list jest pusta — żadnych bounce'ów ani complaint'ów
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Powód
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Wystąpienia
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ostatni event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Akcja
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {suppression?.list?.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.reason === "COMPLAINT"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.reason}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.occurrences}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDistanceToNow(new Date(item.lastEventAt), {
                        addSuffix: true,
                        locale: pl,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          if (
                            confirm(`Usunąć ${item.email} z suppression list?`)
                          ) {
                            removeSuppression.mutate(item.email);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                        title="Usuń z listy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ============ TAB: EVENTS ============ */}
      {activeTab === "events" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj po adresie email..."
                value={emailSearch}
                onChange={(e) => setEmailSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">Wszystkie typy</option>
              <option value="DELIVERY">Delivery</option>
              <option value="BOUNCE">Bounce</option>
              <option value="COMPLAINT">Complaint</option>
              <option value="OPEN">Open</option>
              <option value="CLICK">Click</option>
            </select>
            <button
              onClick={() => refetchEvents()}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Events table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Typ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Szczegóły
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Kiedy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events?.events?.map((event: any) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {eventIcon(event.eventType)}
                        <span className="font-medium">{event.eventType}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {event.recipientEmail}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {event.bounceType && (
                        <span>
                          Bounce: {event.bounceType}/{event.bounceSubType}
                        </span>
                      )}
                      {event.complaintType && (
                        <span>Complaint: {event.complaintType}</span>
                      )}
                      {!event.bounceType && !event.complaintType && "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {format(new Date(event.createdAt), "dd.MM.yyyy HH:mm")}
                    </td>
                  </tr>
                ))}
                {events?.events?.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-gray-400"
                    >
                      Brak eventów dla wybranych filtrów
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {events?.total > 50 && (
              <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-500">
                Wyświetlono 50 z {events.total} eventów
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ TAB: TRIGGERS ============ */}
      {activeTab === "triggers" && (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Ręczne triggery wysyłają PRAWDZIWE emaile do PRAWDZIWYCH userów.
            Używaj ostrożnie.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: "morning",
                label: "Morning jobs",
                desc: "Aktywacje, re-engagement, milestony, countdown, essay",
                icon: "☀️",
              },
              {
                id: "evening",
                label: "Evening jobs",
                desc: "Streak reminders (passa zagrożona)",
                icon: "🌙",
              },
              {
                id: "weekly",
                label: "Weekly summary",
                desc: "Poniedziałkowe podsumowania",
                icon: "📊",
              },
              {
                id: "monthly",
                label: "Monthly report",
                desc: "Miesięczne raporty",
                icon: "📅",
              },
            ].map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <span>{job.icon}</span> {job.label}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{job.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Uruchomić ${job.label}? Wyśle prawdziwe maile!`,
                        )
                      ) {
                        triggerMutation.mutate(job.id);
                      }
                    }}
                    disabled={triggerMutation.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Uruchom
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          {emailStats && (
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Podsumowanie wysyłek
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {emailStats.emails.today}
                  </p>
                  <p className="text-xs text-blue-500">Dziś</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {emailStats.emails.thisWeek}
                  </p>
                  <p className="text-xs text-green-500">Ten tydzień</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {emailStats.emails.total}
                  </p>
                  <p className="text-xs text-purple-500">Łącznie</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Email Preview Modal */}
      {previewId && previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="font-semibold text-gray-900">Podgląd emaila</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span>{previewData.userEmail}</span>
                  <span>•</span>
                  <span>
                    {CAMPAIGN_LABELS[previewData.type] || previewData.type}
                  </span>
                  <span>•</span>
                  <span>
                    {format(new Date(previewData.sentAt), "dd.MM.yyyy HH:mm")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewId(null)}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {/* Subject */}
            {previewData.subject && (
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm">
                  <span className="text-gray-500">Temat:</span>{" "}
                  <span className="font-medium">{previewData.subject}</span>
                </p>
              </div>
            )}
            {/* HTML Preview */}
            <div className="flex-1 overflow-auto">
              {previewData.html ? (
                <iframe
                  srcDoc={previewData.html}
                  className="w-full h-full min-h-[500px] border-0"
                  title="Email preview"
                  sandbox=""
                />
              ) : (
                <div className="p-12 text-center text-gray-400">
                  Brak treści HTML (stary mail sprzed wdrożenia)
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---- SUB-COMPONENTS ----

const KpiCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  alert?: boolean;
}> = ({ icon, label, value, sub, alert }) => (
  <div
    className={`bg-white rounded-xl p-4 border shadow-sm ${alert ? "border-red-200" : "border-gray-100"}`}
  >
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs text-gray-500 uppercase font-medium">
        {label}
      </span>
    </div>
    <p
      className={`text-2xl font-bold ${alert ? "text-red-600" : "text-gray-900"}`}
    >
      {value}
    </p>
    {sub && (
      <p className={`text-xs mt-1 ${alert ? "text-red-500" : "text-gray-400"}`}>
        {sub}
      </p>
    )}
  </div>
);

export default EmailDashboard;
