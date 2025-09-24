// frontend/src/features/admin/AdminDashboard.tsx

import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, FileText, Award } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";

export const AdminDashboard: React.FC = () => {
  // Mutation do tworzenia egzaminu maturalnego (tylko dla admina)
  const createMatureExamMutation = useMutation({
    mutationFn: () => api.post("/api/exams/create-mature-exam"),
    onSuccess: (response) => {
      toast.success(response.data.message || "Egzamin maturalny utworzony!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Błąd tworzenia egzaminu");
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Panel Administracyjny
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Użytkownicy</p>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Zadania</p>
              <p className="text-2xl font-semibold">456</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Wypracowania</p>
              <p className="text-2xl font-semibold">789</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Osiągnięcia</p>
              <p className="text-2xl font-semibold">32</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/exercises"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold">Zarządzaj zadaniami</h3>
          <p className="text-sm text-gray-600 mt-2">
            Dodawaj i edytuj zadania maturalne
          </p>
        </Link>

        <Link
          to="/admin/materials"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <FileText className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold">Materiały edukacyjne</h3>
          <p className="text-sm text-gray-600 mt-2">
            Zarządzaj materiałami i lekturami
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold">Użytkownicy</h3>
          <p className="text-sm text-gray-600 mt-2">
            Zarządzaj kontami użytkowników
          </p>
        </Link>
      </div>
    </div>
  );
};
