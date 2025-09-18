// frontend/src/features/student/WeakPointsAnalysis.tsx

import React from "react";
import { AlertTriangle, TrendingDown, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface WeakPoint {
  category: string;
  averageScore: number;
  weakAreas: string[];
  recommendations: string[];
}

interface WeakPointsAnalysisProps {
  weakPoints?: WeakPoint[];
}

export const WeakPointsAnalysis: React.FC<WeakPointsAnalysisProps> = ({
  weakPoints = [],
}) => {
  if (weakPoints.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Analiza słabych punktów</h3>
        <p className="text-gray-500">
          Rozwiąż więcej zadań, aby otrzymać analizę swoich słabych punktów.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Analiza słabych punktów
      </h3>

      <div className="space-y-4">
        {weakPoints.map((point, index) => (
          <motion.div
            key={point.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium">{point.category}</h4>
              <div className="flex items-center gap-1">
                <TrendingDown
                  className={`w-4 h-4 ${
                    point.averageScore < 40
                      ? "text-red-500"
                      : point.averageScore < 60
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    point.averageScore < 40
                      ? "text-red-600"
                      : point.averageScore < 60
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {point.averageScore.toFixed(0)}%
                </span>
              </div>
            </div>

            {point.weakAreas.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">
                  Problematyczne obszary:
                </p>
                <div className="flex flex-wrap gap-1">
                  {point.weakAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {point.recommendations.length > 0 && (
              <div className="bg-blue-50 rounded p-3">
                <p className="text-xs font-medium text-blue-900 mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Rekomendacje:
                </p>
                <ul className="space-y-1">
                  {point.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-xs text-blue-800">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
