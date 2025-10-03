// frontend/src/features/admin/BulkUserActions.tsx

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  X,
  Users,
  Award,
  Unlock,
  RefreshCw,
  Send,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Download,
} from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";

interface BulkUserActionsProps {
  selectedUserIds: string[];
  onClose: () => void;
  onSuccess: () => void;
}

type ActionType =
  | "update-level"
  | "update-points"
  | "unlock-difficulty"
  | "reset"
  | "notify"
  | "export";

export const BulkUserActions: React.FC<BulkUserActionsProps> = ({
  selectedUserIds,
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [actionParams, setActionParams] = useState<any>({
    level: 1,
    points: 0,
    difficulty: 3,
    notification: {
      title: "",
      message: "",
      type: "INFO",
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: async (updates: any) => {
      const response = await api.post("/api/admin/users/batch-update", {
        userIds: selectedUserIds,
        updates,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`Zaktualizowano ${data.updated} użytkowników`);
      if (data.failed > 0) {
        toast.error(`Błąd dla ${data.failed} użytkowników`);
      }
      setResults(data.results);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => {
      toast.error("Błąd podczas aktualizacji użytkowników");
    },
  });

  // Bulk notify mutation
  const bulkNotifyMutation = useMutation({
    mutationFn: async (notification: any) => {
      const promises = selectedUserIds.map((userId) =>
        api.post(`/api/admin/users/${userId}/notify`, notification)
      );
      return Promise.all(promises);
    },
    onSuccess: () => {
      toast.success(
        `Wysłano powiadomienia do ${selectedUserIds.length} użytkowników`
      );
      onSuccess();
    },
    onError: () => {
      toast.error("Błąd podczas wysyłania powiadomień");
    },
  });

  // Bulk export
  const handleBulkExport = async () => {
    setIsProcessing(true);
    try {
      const exports = await Promise.all(
        selectedUserIds.map(async (userId) => {
          const response = await api.get(`/api/admin/users/${userId}/export`);
          return { userId, data: response.data };
        })
      );

      // Create combined export file
      const exportData = {
        exportDate: new Date().toISOString(),
        userCount: exports.length,
        users: exports,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bulk-users-export-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success(
        `Wyeksportowano dane ${selectedUserIds.length} użytkowników`
      );
      onSuccess();
    } catch (error) {
      toast.error("Błąd podczas eksportu danych");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExecuteAction = async () => {
    if (!selectedAction) return;

    setIsProcessing(true);

    try {
      switch (selectedAction) {
        case "update-level":
          await bulkUpdateMutation.mutateAsync({ level: actionParams.level });
          break;
        case "update-points":
          await bulkUpdateMutation.mutateAsync({
            totalPoints: actionParams.points,
          });
          break;
        case "unlock-difficulty":
          await bulkUpdateMutation.mutateAsync({
            unlockedDifficulty: actionParams.difficulty,
          });
          break;
        case "reset":
          const resetPromises = selectedUserIds.map((userId) =>
            api.post(`/api/admin/users/${userId}/reset-progress`)
          );
          await Promise.all(resetPromises);
          toast.success(
            `Zresetowano postępy ${selectedUserIds.length} użytkowników`
          );
          onSuccess();
          break;
        case "notify":
          await bulkNotifyMutation.mutateAsync(actionParams.notification);
          break;
        case "export":
          await handleBulkExport();
          break;
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const actions = [
    {
      id: "update-level" as ActionType,
      icon: Award,
      title: "Zmień poziom",
      description:
        "Ustaw ten sam poziom dla wszystkich zaznaczonych użytkowników",
      color: "blue",
    },
    {
      id: "update-points" as ActionType,
      icon: Settings,
      title: "Zmień punkty",
      description: "Ustaw tę samą liczbę punktów dla wszystkich użytkowników",
      color: "green",
    },
    {
      id: "unlock-difficulty" as ActionType,
      icon: Unlock,
      title: "Odblokuj poziom trudności",
      description: "Odblokuj poziom trudności dla wszystkich użytkowników",
      color: "purple",
    },
    {
      id: "reset" as ActionType,
      icon: RefreshCw,
      title: "Resetuj postępy",
      description: "Zresetuj wszystkie postępy zaznaczonych użytkowników",
      color: "red",
    },
    {
      id: "notify" as ActionType,
      icon: Send,
      title: "Wyślij powiadomienie",
      description:
        "Wyślij powiadomienie do wszystkich zaznaczonych użytkowników",
      color: "yellow",
    },
    {
      id: "export" as ActionType,
      icon: Download,
      title: "Eksportuj dane",
      description: "Eksportuj dane wszystkich zaznaczonych użytkowników",
      color: "gray",
    },
  ];

  const getActionColor = (color: string) => {
    const colors = {
      blue: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      green: "bg-green-50 hover:bg-green-100 border-green-200",
      purple: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      red: "bg-red-50 hover:bg-red-100 border-red-200",
      yellow: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
      gray: "bg-gray-50 hover:bg-gray-100 border-gray-200",
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      red: "text-red-600",
      yellow: "text-yellow-600",
      gray: "text-gray-600",
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Akcje grupowe
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Zaznaczono {selectedUserIds.length} użytkowników
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 140px)" }}
        >
          {!selectedAction ? (
            // Action Selection
            <div>
              <h3 className="text-lg font-semibold mb-4">Wybierz akcję</h3>
              <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${getActionColor(
                      action.color
                    )}`}
                  >
                    <div className="flex items-start gap-3">
                      <action.icon
                        className={`w-6 h-6 mt-1 ${getIconColor(action.color)}`}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{action.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Action Configuration
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {actions.find((a) => a.id === selectedAction)?.title}
                </h3>
                <button
                  onClick={() => {
                    setSelectedAction(null);
                    setResults([]);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  ← Zmień akcję
                </button>
              </div>

              {/* Action-specific inputs */}
              {selectedAction === "update-level" && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nowy poziom dla wszystkich użytkowników
                  </label>
                  <input
                    type="number"
                    value={actionParams.level}
                    onChange={(e) =>
                      setActionParams({
                        ...actionParams,
                        level: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={1}
                    max={100}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Poziom zostanie ustawiony na {actionParams.level} dla
                    wszystkich {selectedUserIds.length} użytkowników
                  </p>
                </div>
              )}

              {selectedAction === "update-points" && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nowa liczba punktów
                  </label>
                  <input
                    type="number"
                    value={actionParams.points}
                    onChange={(e) =>
                      setActionParams({
                        ...actionParams,
                        points: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={0}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Punkty zostaną ustawione na {actionParams.points} dla
                    wszystkich użytkowników
                  </p>
                </div>
              )}

              {selectedAction === "unlock-difficulty" && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Odblokuj do poziomu trudności
                  </label>
                  <select
                    value={actionParams.difficulty}
                    onChange={(e) =>
                      setActionParams({
                        ...actionParams,
                        difficulty: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={2}>Poziom 2 (Łatwy)</option>
                    <option value={3}>Poziom 3 (Średni)</option>
                    <option value={4}>Poziom 4 (Trudny)</option>
                    <option value={5}>Poziom 5 (Ekspert)</option>
                  </select>
                  <p className="text-xs text-gray-600 mt-2">
                    Wszyscy użytkownicy otrzymają dostęp do poziomu{" "}
                    {actionParams.difficulty} i niższych
                  </p>
                </div>
              )}

              {selectedAction === "notify" && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Typ powiadomienia
                    </label>
                    <select
                      value={actionParams.notification.type}
                      onChange={(e) =>
                        setActionParams({
                          ...actionParams,
                          notification: {
                            ...actionParams.notification,
                            type: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="INFO">Informacja</option>
                      <option value="SUCCESS">Sukces</option>
                      <option value="WARNING">Ostrzeżenie</option>
                      <option value="UPDATE">Aktualizacja</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tytuł powiadomienia
                    </label>
                    <input
                      type="text"
                      value={actionParams.notification.title}
                      onChange={(e) =>
                        setActionParams({
                          ...actionParams,
                          notification: {
                            ...actionParams.notification,
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="np. Ważna informacja"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treść powiadomienia
                    </label>
                    <textarea
                      value={actionParams.notification.message}
                      onChange={(e) =>
                        setActionParams({
                          ...actionParams,
                          notification: {
                            ...actionParams.notification,
                            message: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Wpisz treść powiadomienia..."
                    />
                  </div>
                </div>
              )}

              {selectedAction === "reset" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">Uwaga!</p>
                      <p className="text-sm text-red-700 mt-1">
                        Ta akcja zresetuje wszystkie postępy{" "}
                        {selectedUserIds.length} użytkowników. Operacja jest
                        nieodwracalna!
                      </p>
                      <ul className="text-sm text-red-700 mt-2 space-y-1">
                        <li>• Poziom zostanie ustawiony na 1</li>
                        <li>• Punkty zostaną wyzerowane</li>
                        <li>• Postępy w epokach zostaną usunięte</li>
                        <li>• Historia zadań pozostanie zachowana</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedAction === "export" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Eksport danych
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Zostanie utworzony plik JSON zawierający pełne dane{" "}
                        {selectedUserIds.length} użytkowników, włączając w to:
                      </p>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Informacje o koncie i profilu</li>
                        <li>• Postępy w nauce i punkty</li>
                        <li>• Historia zadań i sesji</li>
                        <li>• Osiągnięcia i cele</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Wyniki operacji</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {results.map((result, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-sm ${
                          result.success ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.success ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        <span>
                          {result.userId.slice(0, 8)}...{" "}
                          {result.success ? "Sukces" : `Błąd: ${result.error}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Anuluj
          </button>
          {selectedAction && (
            <button
              onClick={handleExecuteAction}
              disabled={
                isProcessing ||
                (selectedAction === "notify" &&
                  !actionParams.notification.title)
              }
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                selectedAction === "reset"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Przetwarzanie...
                </>
              ) : (
                <>Wykonaj akcję</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUserActions;
