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

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
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

          {/* Admin routes - BEZ Layout */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Dashboard redirect based on role */}
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

          {/* Protected routes with layout */}
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
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
