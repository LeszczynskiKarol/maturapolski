// frontend/src/components/AdminLayout.tsx

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Eye,
  BarChart3,
  FileText,
  Menu,
  X,
  BrainCircuit,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Zadania", href: "/admin/exercises", icon: BookOpen },
  { name: "Egzaminy", href: "/admin/exams", icon: FileText },
  { name: "Użytkownicy", href: "/admin/users", icon: Users },
  { name: "Baza wiedzy", href: "/admin/content", icon: BrainCircuit },
  { name: "Sesje użytkowników", href: "/admin/user-sessions", icon: Eye },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("Wylogowano pomyślnie");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-bold text-red-600">Panel Admina</h1>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Panel Admina</h2>
        </div>
        <nav className="px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 mb-1 rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors justify-center"
          title="Wyloguj"
        >
          <LogOut className="w-4 h-4" />
          <span>Wyloguj</span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 pt-16">
            <nav className="px-3 py-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 mb-1 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
};
