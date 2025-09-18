import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
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
import ExerciseManager from "./ExerciseManager";
import { UserManager } from "./UserManager";
import { Analytics } from "./Analytics";
import { ContentEditor } from "./ContentEditor";
import { AdminOverview } from "./AdminOverview";
import { EssayReview } from "./EssayReview";
import { AIAssessmentMonitor } from "./AIAssessmentMonitor";
import { ExamSchedule } from "./ExamSchedule";
import { AchievementEditor } from "./AchievementEditor";
import { SystemSettings } from "./SystemSettings";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Zadania", href: "/admin/exercises", icon: BookOpen },
  { name: "Użytkownicy", href: "/admin/users", icon: Users },
  { name: "Wypracowania", href: "/admin/essays", icon: FileText },
  { name: "Oceny AI", href: "/admin/assessments", icon: MessageSquare },
  { name: "Harmonogram", href: "/admin/schedule", icon: Calendar },
  { name: "Osiągnięcia", href: "/admin/achievements", icon: Award },
  { name: "Ustawienia", href: "/admin/settings", icon: Settings },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Panel Admina</h2>
        </div>
        <nav className="px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                flex items-center px-3 py-2 mb-1 rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/exercises/*" element={<ExerciseManager />} />
          <Route path="/users" element={<UserManager />} />
          <Route path="/essays" element={<EssayReview />} />
          <Route path="/assessments" element={<AIAssessmentMonitor />} />
          <Route path="/schedule" element={<ExamSchedule />} />
          <Route path="/achievements" element={<AchievementEditor />} />
          <Route path="/settings" element={<SystemSettings />} />
        </Routes>
      </div>
    </div>
  );
};
