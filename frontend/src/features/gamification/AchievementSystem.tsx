// frontend/src/features/gamification/AchievementSystem.tsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Star, Target, Flame, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: Date;
  progress?: number;
}

export const AchievementSystem: React.FC = () => {
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(
    null
  );

  const { data: achievements } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => api.get("/api/student/achievements").then((r) => r.data),
  });

  const { data: stats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: () => api.get("/api/student/stats").then((r) => r.data),
    refetchInterval: 30000,
  });

  const celebrateAchievement = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                     text-white p-6 rounded-xl shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{newAchievement.icon}</div>
              <div>
                <h3 className="font-bold text-lg">Nowe osiągnięcie!</h3>
                <p className="font-semibold">{newAchievement.name}</p>
                <p className="text-sm opacity-90">
                  {newAchievement.description}
                </p>
                <p className="text-xs mt-1">+{newAchievement.points} punktów</p>
              </div>
            </div>
            <button
              onClick={() => setNewAchievement(null)}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            icon={<Trophy />}
            label="Poziom"
            value={stats?.level || 1}
            subtitle={`${stats?.currentLevelProgress || 0}%`}
          />
          <StatCard
            icon={<Star />}
            label="Punkty"
            value={stats?.totalPoints || 0}
            subtitle="łącznie"
          />
          <StatCard
            icon={<Flame />}
            label="Seria"
            value={stats?.studyStreak || 0}
            subtitle="dni"
          />
          <StatCard
            icon={<Award />}
            label="Osiągnięcia"
            value={`${stats?.unlockedAchievements || 0}/${
              stats?.totalAchievements || 0
            }`}
            subtitle="odblokowane"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {achievements?.map((achievement: Achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isUnlocked={!!achievement.unlockedAt}
          />
        ))}
      </div>
    </div>
  );
};

const AchievementCard: React.FC<{
  achievement: Achievement;
  isUnlocked: boolean;
}> = ({ achievement, isUnlocked }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-lg border-2 transition-all ${
        isUnlocked
          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400"
          : "bg-gray-50 border-gray-200 opacity-60"
      }`}
    >
      <div className="text-3xl mb-2 text-center">
        {isUnlocked ? achievement.icon : "🔒"}
      </div>
      <h4 className="font-semibold text-sm text-center">{achievement.name}</h4>
      <p className="text-xs text-gray-600 text-center mt-1">
        {achievement.description}
      </p>
      {achievement.progress !== undefined && !isUnlocked && (
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
          <p className="text-xs text-center mt-1">{achievement.progress}%</p>
        </div>
      )}
    </motion.div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
}> = ({ icon, label, value, subtitle }) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-10 h-10 mb-2 bg-white/20 rounded-lg">
      {icon}
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs opacity-90">{label}</p>
    <p className="text-xs opacity-70">{subtitle}</p>
  </div>
);
