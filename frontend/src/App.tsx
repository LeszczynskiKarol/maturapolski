// frontend/src/App.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HubListPage from "./features/content/HubListPage";
import { HubDetailPage } from "./features/content/HubDetailPage";
import { PageViewer } from "./features/content/PageViewer";
import ContentManager from "./features/admin/ContentManager";
import { CookieBanner } from "./components/CookieBanner";
import { PrivacyPolicyPage } from "./features/legal/PrivacyPolicyPage";
import { TermsOfServicePage } from "./features/legal/TermsOfServicePage";
import { CookiePolicyPage } from "./features/legal/CookiePolicyPage";
import { RodoPage } from "./features/legal/RodoPage";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { ResendVerificationPage } from "./features/auth/ResendVerificationPage";
import { ForgotPasswordPage } from "./features/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./features/auth/ResetPasswordPage";
import { VerifyEmailCodePage } from "./features/auth/VerifyEmailCodePage";
import { CheckEmailPage } from "./features/auth/CheckEmailPage";
import { UserSessionsTable } from "./features/admin/UserSessionsTable";
import { SubscriptionDashboard } from "./features/subscription/SubscriptionDashboard";
import React, { useEffect } from "react";
import { MatureExamViewer } from "./features/exams/MatureExamViewer";
import { ExamStructureManager } from "./features/admin/exams/ExamStructureManager";
import { ExamList } from "./features/exams/ExamList";
import { ExamResults } from "./features/exams/ExamResults";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LearningSession } from "./features/learning/LearningSession";
import { SessionHistory } from "./features/learning/SessionHistory";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import { CookieConsentProvider } from "./hooks/useCookieConsent";
import { ScrollToTop } from "./components/ScrollToTop";

// Layouts
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";

// Public
import { LandingPage } from "./features/public/LandingPage";

// Auth
import { LoginPage } from "./features/auth/LoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";

// Student
import { ExerciseList } from "./features/exercises/ExerciseList";
import { ExerciseSolver } from "./features/exercises/ExerciseSolver";
import { LeaderboardPage } from "./features/gamification/LeaderboardPage";
import { StudentDashboard } from "./features/student/Dashboard";
import { ProgressTracker } from "./features/student/ProgressTracker";
import { EpochReviewPage } from "./features/student/EpochReviewPage";

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
      <CookieConsentProvider>
        <GoogleTagManager />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              <Route path="/rodo" element={<RodoPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />

              <Route path="/privacy" element={<PrivacyPolicyPage />} />

              <Route path="/verify-email" element={<VerifyEmailCodePage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/check-email" element={<CheckEmailPage />} />
              <Route
                path="/resend-verification"
                element={<ResendVerificationPage />}
              />
              {/* NOWA BAZA WIEDZY */}
              <Route path="/baza-wiedzy" element={<HubListPage />} />
              <Route path="/baza-wiedzy/:hubSlug" element={<HubDetailPage />} />
              <Route
                path="/baza-wiedzy/:hubSlug/:pageSlug"
                element={<PageViewer />}
              />

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
                <Route path="content" element={<ContentManager />} />
                <Route path="materials" element={<AdminMaterialsEditor />} />
                <Route path="exams" element={<ExamStructureManager />} />
                <Route path="user-sessions" element={<UserSessionsTable />} />
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

                {/* Subscription */}
                <Route
                  path="/subscription"
                  element={
                    <ProtectedRoute>
                      <SubscriptionDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Epoch Review - NOWA STRONA */}
                <Route
                  path="/epoch-review"
                  element={
                    <ProtectedRoute>
                      <EpochReviewPage />
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
                  path="/exams"
                  element={
                    <ProtectedRoute>
                      <ExamList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exam/mature/:sessionId"
                  element={
                    <ProtectedRoute>
                      <MatureExamViewer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exam/results/:sessionId"
                  element={
                    <ProtectedRoute>
                      <ExamResults />
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
            <CookieBanner />
          </BrowserRouter>
        </QueryClientProvider>
      </CookieConsentProvider>
    </ThemeInitializer>
  );
};
