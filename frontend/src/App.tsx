// frontend/src/App.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LearningSession } from "./features/learning/LearningSession";
import { SessionHistory } from "./features/learning/SessionHistory";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

// Layouts
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";

// Public
import { LandingPage } from "./features/public/LandingPage";

// Auth
import { LoginPage } from "./features/auth/LoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";

// Student
import { ExamSimulator } from "./features/exams/ExamSimulator";
import { ExerciseList } from "./features/exercises/ExerciseList";
import { ExerciseSolver } from "./features/exercises/ExerciseSolver";
import { LeaderboardPage } from "./features/gamification/LeaderboardPage";
import { StudentDashboard } from "./features/student/Dashboard";
import { ProgressTracker } from "./features/student/ProgressTracker";

// Admin
import { AdminDashboard } from "./features/admin/AdminDashboard";
import AdminMaterialsEditor from "./features/admin/AdminMaterialsEditor";
import ExerciseManager from "./features/admin/ExerciseManager";
import { UserManager } from "./features/admin/UserManager";

// Materials
import { MaterialDetailPage } from "./features/materials/MaterialDetailPage";
import MaterialsPage from "./features/materials/MaterialsPage";

const queryClient = new QueryClient();

// Component to initialize theme
const ThemeInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return <>{children}</>;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <ThemeInitializer>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Public Materials routes */}
            <Route path="/materialy" element={<MaterialsPage />} />
            <Route path="/materialy/:slug" element={<MaterialDetailPage />} />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="exercises" element={<ExerciseManager />} />
              <Route path="users" element={<UserManager />} />
              <Route path="materials" element={<AdminMaterialsEditor />} />
            </Route>

            {/* Student routes with layout */}
            <Route element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    {user?.role === "ADMIN" ? (
                      <Navigate to="/admin" replace />
                    ) : (
                      <StudentDashboard />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exercises"
                element={
                  <ProtectedRoute>
                    <ExerciseList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exercises/:id"
                element={
                  <ProtectedRoute>
                    <ExerciseSolver />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/progress"
                element={
                  <ProtectedRoute>
                    <ProgressTracker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam"
                element={
                  <ProtectedRoute>
                    <ExamSimulator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/learn"
                element={
                  <ProtectedRoute>
                    <LearningSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute>
                    <SessionHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <LeaderboardPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              className: "",
              style: {
                background: "var(--toast-bg)",
                color: "var(--toast-color)",
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeInitializer>
  );
};
