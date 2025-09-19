// frontend/src/components/Layout.tsx

import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  TrendingUp,
  FileText,
  Brain,
  LogOut,
  User,
  Trophy,
  Menu,
  X,
  ChevronLeft,
  Bell,
  Settings,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Nauka", href: "/learn", icon: Brain },
    { name: "Zadania", href: "/exercises", icon: BookOpen },
    { name: "Postępy", href: "/progress", icon: TrendingUp },
    { name: "Egzamin", href: "/exam", icon: FileText },
    { name: "Ranking", href: "/leaderboard", icon: Trophy },
  ];

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
          <h1 className="text-xl font-bold text-blue-600">Matura Polski</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed inset-y-0 left-0 bg-white shadow-lg transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1
              className={`text-2xl font-bold text-blue-600 transition-opacity ${
                isSidebarCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Matura Polski
            </h1>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeft
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isSidebarCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                title={isSidebarCollapsed ? item.name : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats - only when expanded */}
        {!isSidebarCollapsed && (
          <div className="px-6 py-4 border-t">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Poziom</span>
                <span className="text-sm font-semibold">12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: "65%" }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Punkty XP</span>
                <span className="text-sm font-semibold">3,250</span>
              </div>
            </div>
          </div>
        )}

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div
            className={`flex items-center gap-3 mb-3 ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
              isSidebarCollapsed ? "justify-center" : "justify-center"
            }`}
            title={isSidebarCollapsed ? "Wyloguj" : undefined}
          >
            <LogOut className="w-4 h-4" />
            {!isSidebarCollapsed && <span>Wyloguj</span>}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
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
                    className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Stats */}
            <div className="px-6 py-4 border-t">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Poziom</span>
                  <span className="text-sm font-semibold">12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Punkty XP</span>
                  <span className="text-sm font-semibold">3,250</span>
                </div>
              </div>
            </div>

            {/* Mobile User Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Wyloguj
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        } pt-16 lg:pt-0`}
      >
        <Outlet />
      </div>
    </div>
  );
};
