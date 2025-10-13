// frontend/src/features/admin/SubscriptionEditor.tsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  X,
  Save,
  RefreshCw,
  CreditCard,
  Clock,
  Zap,
  Plus,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface SubscriptionEditorProps {
  userId: string;
  userName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubscriptionEditor: React.FC<SubscriptionEditorProps> = ({
  userId,
  userName,
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");
  const [isRecurring, setIsRecurring] = useState(false);

  // Fetch subscription
  const { data: subscription, isLoading } = useQuery({
    queryKey: ["admin-subscription", userId],
    queryFn: () =>
      api.get(`/api/admin/users/${userId}/subscription`).then((r) => r.data),
  });

  // Fetch AI usage history
  const { data: usageHistory } = useQuery({
    queryKey: ["admin-ai-usage", userId],
    queryFn: () =>
      api.get(`/api/admin/users/${userId}/ai-usage`).then((r) => r.data),
    enabled: activeTab === "history",
  });

  // State for edits
  const [plan, setPlan] = useState<"FREE" | "PREMIUM">("FREE");
  const [status, setStatus] = useState<
    "ACTIVE" | "INACTIVE" | "CANCELED" | "PAST_DUE"
  >("INACTIVE");
  const [aiPointsLimit, setAiPointsLimit] = useState(20);
  const [aiPointsUsed, setAiPointsUsed] = useState(0);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [addPointsReason, setAddPointsReason] = useState("");

  // Update state when subscription loads
  React.useEffect(() => {
    if (subscription) {
      setPlan(subscription.plan);
      setStatus(subscription.status);
      setAiPointsLimit(subscription.aiPointsLimit);
      setAiPointsUsed(subscription.aiPointsUsed);
      setIsRecurring(subscription.isRecurring);
    }
  }, [subscription]);

  // Update subscription mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(
        `/api/admin/users/${userId}/subscription`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Subskrypcja została zaktualizowana");
      queryClient.invalidateQueries({
        queryKey: ["admin-subscription", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onSuccess();
    },
    onError: () => {
      toast.error("Błąd podczas aktualizacji subskrypcji");
    },
  });

  // Add points mutation
  const addPointsMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/api/admin/users/${userId}/add-points`, {
        pointsToAdd,
        reason: addPointsReason,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success(`Dodano ${pointsToAdd} punktów AI`);
      queryClient.invalidateQueries({
        queryKey: ["admin-subscription", userId],
      });
      setPointsToAdd(0);
      setAddPointsReason("");
    },
    onError: () => {
      toast.error("Błąd podczas dodawania punktów");
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      plan,
      status,
      aiPointsLimit,
      aiPointsUsed,
      isRecurring,
    });
  };

  const handleResetPoints = () => {
    if (confirm("Czy na pewno chcesz zresetować punkty AI?")) {
      updateMutation.mutate({
        resetPoints: true,
      });
    }
  };

  const percentUsed = Math.round((aiPointsUsed / aiPointsLimit) * 100);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Zarządzanie subskrypcją
              </h2>
              <p className="text-sm text-gray-600 mt-1">{userName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Szczegóły
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === "history"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Historia użycia
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 180px)" }}
        >
          {activeTab === "details" ? (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Aktualny status</h3>
                <div className="grid grid-cols-4 gap-4">
                  {" "}
                  {/* zmień z 3 na 4 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Plan</p>
                    <p
                      className={`text-xl font-bold ${
                        subscription?.plan === "PREMIUM"
                          ? "text-yellow-600"
                          : "text-gray-900"
                      }`}
                    >
                      {subscription?.plan === "PREMIUM" ? "Premium" : "Free"}
                    </p>
                  </div>
                  {/* ✅ NOWA KARTA */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Typ</p>
                    <p className="text-sm font-medium">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          subscription?.isRecurring
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {subscription?.isRecurring
                          ? "Subskrypcja"
                          : "Jednorazowa"}
                      </span>
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="text-xl font-bold">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          subscription?.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : subscription?.status === "CANCELED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {subscription?.status}
                      </span>
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Wywołań AI</p>
                    <p className="text-xl font-bold text-blue-600">
                      {subscription?.totalAiCalls || 0}
                    </p>
                  </div>
                </div>
              </div>
              {subscription?.endDate && !subscription?.isRecurring && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Clock className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">Dostęp wygasa:</p>
                      <p className="text-sm">
                        {new Date(subscription.endDate).toLocaleDateString(
                          "pl-PL",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Points */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Punkty AI
                </h3>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Wykorzystanie
                      </span>
                      <span className="font-semibold">
                        {aiPointsUsed} / {aiPointsLimit} ({percentUsed}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all ${
                          percentUsed > 90
                            ? "bg-red-500"
                            : percentUsed > 70
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percentUsed, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Edit Points */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Limit punktów
                      </label>
                      <input
                        type="number"
                        value={aiPointsLimit}
                        onChange={(e) =>
                          setAiPointsLimit(parseInt(e.target.value) || 0)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Użyte punkty
                      </label>
                      <input
                        type="number"
                        value={aiPointsUsed}
                        onChange={(e) =>
                          setAiPointsUsed(parseInt(e.target.value) || 0)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min={0}
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetPoints}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset punktów
                    </button>
                  </div>

                  {/* Reset Info */}
                  {subscription?.aiPointsReset && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Ostatni reset:{" "}
                      {format(
                        new Date(subscription.aiPointsReset),
                        "dd MMMM yyyy, HH:mm",
                        {
                          locale: pl,
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Add Points */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  Dodaj punkty AI
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liczba punktów do dodania
                    </label>
                    <input
                      type="number"
                      value={pointsToAdd}
                      onChange={(e) =>
                        setPointsToAdd(parseInt(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={0}
                      placeholder="np. 100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Powód (opcjonalnie)
                    </label>
                    <textarea
                      value={addPointsReason}
                      onChange={(e) => setAddPointsReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="np. Bonus za aktywność"
                    />
                  </div>

                  <button
                    onClick={() => addPointsMutation.mutate()}
                    disabled={pointsToAdd === 0 || addPointsMutation.isPending}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {addPointsMutation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Dodawanie...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Dodaj {pointsToAdd} punktów
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2 text-sm text-blue-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Punkty zostaną dodane do limitu użytkownika. Użytkownik
                      otrzyma powiadomienie o dodanych punktach.
                    </p>
                  </div>
                </div>
              </div>

              {/* Plan and Status */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Plan i status</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan subskrypcji
                    </label>
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="FREE">Free (20 punktów)</option>
                      <option value="PREMIUM">Premium (200 punktów)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status subskrypcji
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ACTIVE">Aktywna</option>
                      <option value="INACTIVE">Nieaktywna</option>
                      <option value="CANCELED">Anulowana</option>
                      <option value="PAST_DUE">Zaległa</option>
                    </select>
                  </div>
                </div>

                {/* ✅ NOWA SEKCJA - Typ subskrypcji */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Typ subskrypcji
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsRecurring(false)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        !isRecurring
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold">Jednorazowa</span>
                      </div>
                      <p className="text-xs text-left">
                        Pakiet na 30 dni, wymaga ręcznego przedłużenia
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRecurring(true)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        isRecurring
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="w-5 h-5" />
                        <span className="font-semibold">Cykliczna</span>
                      </div>
                      <p className="text-xs text-left">
                        Automatyczne odnowienie co miesiąc
                      </p>
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2 text-sm text-yellow-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p>
                        • Zmiana planu automatycznie ustawi odpowiedni limit
                        punktów: Free = 0 pkt, Premium = 200 pkt
                      </p>
                      <p>
                        • Zmiana typu z cyklicznej na jednorazową nie anuluje
                        aktywnej subskrypcji w Stripe
                      </p>
                      <p>
                        • Dla jednorazowych pakietów, ustaw również datę
                        wygaśnięcia (endDate)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // History Tab
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Historia użycia AI</h3>

              {usageHistory && usageHistory.length > 0 ? (
                <div className="space-y-2">
                  {usageHistory.map((usage: any) => (
                    <div
                      key={usage.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {usage.exercise?.question?.substring(0, 80)}...
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                          <span className="px-2 py-0.5 bg-white rounded">
                            {usage.exerciseType}
                          </span>
                          <span>Trudność: {usage.exercise?.difficulty}</span>
                          <span>
                            {format(
                              new Date(usage.createdAt),
                              "dd.MM.yyyy HH:mm"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-600">
                          {usage.pointsCost} pkt
                        </p>
                        <p className="text-xs text-gray-600">
                          {usage.success ? (
                            <CheckCircle className="w-4 h-4 text-green-500 inline" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500 inline" />
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Brak historii użycia AI
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Anuluj
          </button>
          {activeTab === "details" && (
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {updateMutation.isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Zapisz zmiany
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionEditor;
