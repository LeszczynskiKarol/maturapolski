// frontend/src/features/admin/AdminDashboard.tsx

import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";
import { LiveActivityPanel } from "./LiveActivityPanel";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Panel Administracyjny
      </h1>

      <div className="mb-8">
        <LiveActivityPanel />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
