// frontend/src/features/student/Dashboard.tsx - ZAKTUALIZOWANA WERSJA

import React, { useState } from "react";

import { DifficultyProgress } from "../../components/DifficultyProgress";
import { EpochReview } from "./EpochReview";
import { Calendar, BookOpen } from "lucide-react";

export const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"plan" | "review">("plan");

  return (
    <div className="p-6 space-y-6">
      {/* Main Content */}
      <div className="space-y-6"></div>
    </div>
  );
};
