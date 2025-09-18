// frontend/src/components/RubricDisplay.tsx

import React from "react";
import { CheckCircle, Circle } from "lucide-react";

interface RubricCriterion {
  name: string;
  maxPoints: number;
  description: string;
  levels: {
    points: number;
    description: string;
  }[];
}

interface RubricDisplayProps {
  rubric?: {
    criteria: RubricCriterion[];
  };
  scores?: Record<string, number>;
}

export const RubricDisplay: React.FC<RubricDisplayProps> = ({
  rubric,
  scores,
}) => {
  if (!rubric) return null;

  return (
    <div className="space-y-4">
      {rubric.criteria.map((criterion, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{criterion.name}</h4>
            <span className="text-sm text-gray-500">
              Max: {criterion.maxPoints} pkt
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{criterion.description}</p>

          {criterion.levels && (
            <div className="space-y-1">
              {criterion.levels.map((level, levelIndex) => {
                const isAchieved =
                  scores && scores[criterion.name] >= level.points;

                return (
                  <div
                    key={levelIndex}
                    className={`flex items-start gap-2 text-sm p-2 rounded ${
                      isAchieved ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    {isAchieved ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400 mt-0.5" />
                    )}
                    <div>
                      <span className="font-medium">{level.points} pkt:</span>
                      <span className="ml-1">{level.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
