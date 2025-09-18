// frontend/src/features/admin/AdminDashboard.tsx

import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  BarChart3,
  Settings,
  FileText,
  MessageSquare,
  Calendar,
  Award,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Zadania", href: "/admin/exercises", icon: BookOpen },
  { name: "Użytkownicy", href: "/admin/users", icon: Users },
  { name: "Materiały edukacyjne", href: "/admin/materials", icon: FileText },
  { name: "Wypracowania", href: "/admin/essays", icon: FileText },
  { name: "Oceny AI", href: "/admin/assessments", icon: MessageSquare },
  { name: "Harmonogram", href: "/admin/schedule", icon: Calendar },
  { name: "Osiągnięcia", href: "/admin/achievements", icon: Award },
  { name: "Ustawienia", href: "/admin/settings", icon: Settings },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Panel Admina</h2>
          </div>
          <nav className="px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center px-3 py-2 mb-1 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
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
      </div>
    </div>
  );
};
