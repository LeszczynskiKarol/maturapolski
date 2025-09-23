// frontend/src/features/admin/AdminUsers.tsx

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  UserPlus,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  joinDate: string;
  lastActive: string;
  progress: number;
}

export const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Przykładowe dane
  const users: User[] = [
    {
      id: "1",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "jan.kowalski@example.com",
      role: "STUDENT",
      status: "ACTIVE",
      joinDate: "2024-01-15",
      lastActive: "2024-03-20",
      progress: 75,
    },
    {
      id: "2",
      firstName: "Anna",
      lastName: "Nowak",
      email: "anna.nowak@example.com",
      role: "STUDENT",
      status: "ACTIVE",
      joinDate: "2024-02-10",
      lastActive: "2024-03-19",
      progress: 60,
    },
    {
      id: "3",
      firstName: "Piotr",
      lastName: "Wiśniewski",
      email: "piotr.wisniewski@example.com",
      role: "TEACHER",
      status: "ACTIVE",
      joinDate: "2023-09-01",
      lastActive: "2024-03-20",
      progress: 0,
    },
  ];

  const getRoleBadge = (role: string) => {
    const badges = {
      STUDENT: "bg-blue-100 text-blue-800",
      TEACHER: "bg-purple-100 text-purple-800",
      ADMIN: "bg-red-100 text-red-800",
    };
    return badges[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      ACTIVE: "bg-green-100 text-green-800",
      INACTIVE: "bg-gray-100 text-gray-800",
      SUSPENDED: "bg-red-100 text-red-800",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      STUDENT: "Uczeń",
      TEACHER: "Nauczyciel",
      ADMIN: "Administrator",
    };
    return labels[role] || role;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      ACTIVE: "Aktywny",
      INACTIVE: "Nieaktywny",
      SUSPENDED: "Zawieszony",
    };
    return labels[status] || status;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Użytkownicy</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <UserPlus className="w-4 h-4" />
          Dodaj użytkownika
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Wszyscy użytkownicy</p>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-xs text-green-600">+12% w tym miesiącu</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Aktywni</p>
          <p className="text-2xl font-bold">987</p>
          <p className="text-xs text-gray-600">80% wszystkich</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Nauczyciele</p>
          <p className="text-2xl font-bold">45</p>
          <p className="text-xs text-blue-600">+2 nowych</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Administratorzy</p>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-gray-600">Bez zmian</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Szukaj po imieniu, nazwisku lub email..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="ALL">Wszystkie role</option>
                <option value="STUDENT">Uczniowie</option>
                <option value="TEACHER">Nauczyciele</option>
                <option value="ADMIN">Administratorzy</option>
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="ALL">Wszystkie statusy</option>
                <option value="ACTIVE">Aktywni</option>
                <option value="INACTIVE">Nieaktywni</option>
                <option value="SUSPENDED">Zawieszeni</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Eksportuj
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Użytkownik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rola
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data dołączenia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ostatnia aktywność
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Postęp
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                        user.status
                      )}`}
                    >
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString("pl-PL")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleDateString("pl-PL")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "STUDENT" ? (
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {user.progress}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Pokazuje <span className="font-medium">1-10</span> z{" "}
            <span className="font-medium">1,234</span> użytkowników
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              Poprzednia
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              3
            </button>
            <span className="px-3 py-1">...</span>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              10
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              Następna
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
