// frontend/src/features/admin/UserSessionsTable.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  User,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

export const UserSessionsTable: React.FC = () => {
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    new Set()
  );
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-detailed-sessions"],
    queryFn: () =>
      api.get("/api/admin/users/detailed-sessions").then((r) => r.data),
  });

  // Znajdź powtarzające się ID
  const findDuplicateIds = () => {
    const idCounts = new Map<string, number>();
    users?.forEach((user: any) => {
      user.learningSessions.forEach((session: any) => {
        session.exerciseDetails.forEach((ex: any) => {
          idCounts.set(ex.id, (idCounts.get(ex.id) || 0) + 1);
        });
      });
    });

    const duplicates = new Set<string>();
    idCounts.forEach((count, id) => {
      if (count > 1) duplicates.add(id);
    });
    setHighlightedIds(duplicates);
  };

  const toggleUser = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const toggleSession = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  if (isLoading) return <div className="p-6">Ładowanie...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Szczegółowa historia sesji użytkowników
        </h2>
        <button
          onClick={findDuplicateIds}
          className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          Znajdź powtórki ID
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Użytkownik
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Liczba sesji
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Całk. pytań
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user: any) => {
              const totalQuestions = user.learningSessions.reduce(
                (acc: number, s: any) => acc + s.completed,
                0
              );

              return (
                <React.Fragment key={user.id}>
                  {/* Wiersz użytkownika */}
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleUser(user.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {expandedUsers.has(user.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {user.learningSessions.length}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {totalQuestions}
                    </td>
                  </tr>

                  {/* Sesje użytkownika */}
                  {expandedUsers.has(user.id) &&
                    user.learningSessions.map((session: any) => (
                      <React.Fragment key={session.id}>
                        <tr
                          className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSession(session.id);
                          }}
                        >
                          <td className="px-8 py-2" colSpan={2}>
                            <div className="flex items-center gap-2">
                              {expandedSessions.has(session.id) ? (
                                <ChevronDown className="w-3 h-3" />
                              ) : (
                                <ChevronRight className="w-3 h-3" />
                              )}
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">
                                {format(
                                  new Date(session.startedAt),
                                  "dd.MM.yyyy HH:mm:ss"
                                )}
                              </span>
                              <span
                                className={`px-2 py-0.5 text-xs rounded ${
                                  session.status === "COMPLETED"
                                    ? "bg-green-100 text-green-700"
                                    : session.status === "IN_PROGRESS"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {session.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {session.completed} pytań
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {session.correct}/{session.completed} ✓
                          </td>
                        </tr>

                        {/* Pytania w sesji */}
                        {expandedSessions.has(session.id) && (
                          <tr>
                            <td colSpan={4} className="px-8 py-2 bg-white">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b">
                                    <th className="py-1 text-left">#</th>
                                    <th className="py-1 text-left">
                                      ID pytania
                                    </th>
                                    <th className="py-1 text-left">Treść</th>
                                    <th className="py-1 text-left">Typ</th>
                                    <th className="py-1 text-center">Pkt</th>
                                    <th className="py-1 text-center">Wynik</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {session.exerciseDetails.map(
                                    (ex: any, idx: number) => (
                                      <tr
                                        key={`${session.id}-${idx}`}
                                        className={`border-b ${
                                          highlightedIds.has(ex.id)
                                            ? "bg-red-50"
                                            : ""
                                        }`}
                                      >
                                        <td className="py-1 text-gray-500">
                                          {idx + 1}
                                        </td>
                                        <td className="py-1">
                                          <code
                                            className={`font-mono text-xs px-1 py-0.5 rounded ${
                                              highlightedIds.has(ex.id)
                                                ? "bg-red-200 text-red-800"
                                                : "bg-gray-100"
                                            }`}
                                          >
                                            {ex.id}
                                          </code>
                                        </td>
                                        <td className="py-1 max-w-md truncate">
                                          {ex.question}
                                        </td>
                                        <td className="py-1 text-xs text-gray-600">
                                          {ex.type}
                                        </td>
                                        <td className="py-1 text-center">
                                          {ex.points}
                                        </td>
                                        <td className="py-1 text-center">
                                          {ex.score !== null ? (
                                            ex.score > 0 ? (
                                              <CheckCircle className="w-4 h-4 text-green-500 inline" />
                                            ) : (
                                              <XCircle className="w-4 h-4 text-red-500 inline" />
                                            )
                                          ) : (
                                            "—"
                                          )}
                                          {ex.score !== null && ` ${ex.score}`}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
