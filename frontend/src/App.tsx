// frontend/src/App.tsx

import React from "react";
import { LearningSession } from "./features/learning/LearningSession";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

// Layout
import { Layout } from "./components/Layout";

// Public
import { LandingPage } from "./features/public/LandingPage";

// Auth
import { LoginPage } from "./features/auth/LoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";

// Student
import { StudentDashboard } from "./features/student/Dashboard";
import { ExerciseList } from "./features/exercises/ExerciseList";
import { ExerciseSolver } from "./features/exercises/ExerciseSolver";
import { ProgressTracker } from "./features/student/ProgressTracker";
import { ExamSimulator } from "./features/exams/ExamSimulator";
import { LeaderboardPage } from "./features/gamification/LeaderboardPage";

// Admin
import { AdminDashboard } from "./features/admin/AdminDashboard";
import ExerciseManager from "./features/admin/ExerciseManager";
import { UserManager } from "./features/admin/UserManager";
import AdminMaterialsEditor from "./features/admin/AdminMaterialsEditor";

// Materials
import MaterialsPage from "./features/materials/MaterialsPage";
import { MaterialDetailPage } from "./features/materials/MaterialDetailPage";

const queryClient = new QueryClient();

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

          {/* Admin routes - BEZ zagnieżdżania */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/exercises"
            element={
              <AdminRoute>
                <ExerciseManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/materials"
            element={
              <AdminRoute>
                <AdminMaterialsEditor />
              </AdminRoute>
            }
          />

          {/* Dashboard redirect */}
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

          {/* Student routes with layout */}
          <Route element={<Layout />}>
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
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
