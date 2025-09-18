// frontend/src/features/admin/UserManager.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, UserPlus, Edit, Trash } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { api } from "../../services/api";

export const UserManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users", searchTerm, filterRole],
    queryFn: () =>
      api
        .get("/api/admin/users", {
          params: { search: searchTerm, role: filterRole },
        })
        .then((r) => r.data),
  });

  const columns = [
    {
      key: "name",
      label: "Imię i nazwisko",
      sortable: true,
      render: (_, row: any) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Rola",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value === "ADMIN"
              ? "bg-purple-100 text-purple-800"
              : value === "TEACHER"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Data rejestracji",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString("pl-PL"),
    },
    {
      key: "actions",
      label: "Akcje",
      render: (_, row: any) => (
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Edit className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Trash className="w-4 h-4 text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Zarządzanie użytkownikami</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Dodaj użytkownika
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj użytkowników..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">Wszystkie role</option>
          <option value="STUDENT">Uczeń</option>
          <option value="TEACHER">Nauczyciel</option>
          <option value="ADMIN">Administrator</option>
        </select>
      </div>

      <DataTable columns={columns} data={users || []} loading={isLoading} />
    </div>
  );
};
