// frontend/src/components/AIFeedback.tsx

import React from "react";
import { AlertCircle, CheckCircle, Info, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface AIFeedbackProps {
  assessment: {
    totalScore: number;
    formalScore?: number;
    literaryScore?: number;
    compositionScore?: number;
    languageScore?: number;
    detailedFeedback: {
      strengths: string[];
      weaknesses: string[];
      suggestions: string[];
    };
    improvements: string[];
  };
  onImprove?: (suggestion: string) => void;
}

export const AIFeedback: React.FC<AIFeedbackProps> = ({
  assessment,
  onImprove,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 space-y-6"
    >
      {/* Overall Score */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Wynik ogólny</h3>
        <div
          className={`text-4xl font-bold ${getScoreColor(
            assessment.totalScore
          )}`}
        >
          {assessment.totalScore}%
        </div>
      </div>

      {/* Detailed Scores */}
      {(assessment.formalScore !== undefined ||
        assessment.literaryScore !== undefined ||
        assessment.compositionScore !== undefined ||
        assessment.languageScore !== undefined) && (
        <div className="grid grid-cols-2 gap-4">
          {assessment.formalScore !== undefined && (
            <ScoreCard
              label="Wymogi formalne"
              score={assessment.formalScore}
              max={3}
            />
          )}
          {assessment.literaryScore !== undefined && (
            <ScoreCard
              label="Kompetencje literackie"
              score={assessment.literaryScore}
              max={16}
            />
          )}
          {assessment.compositionScore !== undefined && (
            <ScoreCard
              label="Kompozycja"
              score={assessment.compositionScore}
              max={7}
            />
          )}
          {assessment.languageScore !== undefined && (
            <ScoreCard
              label="Styl i język"
              score={assessment.languageScore}
              max={11}
            />
          )}
        </div>
      )}

      {/* Detailed Feedback */}
      {assessment.detailedFeedback && (
        <div className="space-y-4">
          {/* Strengths */}
          {assessment.detailedFeedback.strengths.length > 0 && (
            <FeedbackSection
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              title="Mocne strony"
              items={assessment.detailedFeedback.strengths}
              color="green"
            />
          )}

          {/* Weaknesses */}
          {assessment.detailedFeedback.weaknesses.length > 0 && (
            <FeedbackSection
              icon={<AlertCircle className="w-5 h-5 text-yellow-600" />}
              title="Do poprawy"
              items={assessment.detailedFeedback.weaknesses}
              color="yellow"
            />
          )}

          {/* Suggestions */}
          {assessment.detailedFeedback.suggestions.length > 0 && (
            <FeedbackSection
              icon={<Lightbulb className="w-5 h-5 text-blue-600" />}
              title="Sugestie"
              items={assessment.detailedFeedback.suggestions}
              color="blue"
              onItemClick={onImprove}
            />
          )}
        </div>
      )}

      {/* Improvements */}
      {assessment.improvements.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-gray-600" />
            Kluczowe obszary do pracy
          </h4>
          <ul className="space-y-1">
            {assessment.improvements.map((improvement, index) => (
              <li key={index} className="text-sm text-gray-700 ml-7">
                • {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

const ScoreCard: React.FC<{
  label: string;
  score: number;
  max: number;
}> = ({ label, score, max }) => {
  const percentage = (score / max) * 100;

  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">{score}</span>
        <span className="text-sm text-gray-500">/ {max}</span>
      </div>
      <div className="mt-2 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            percentage >= 80
              ? "bg-green-500"
              : percentage >= 60
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const FeedbackSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: "green" | "yellow" | "blue";
  onItemClick?: (item: string) => void;
}> = ({ icon, title, items, color, onItemClick }) => {
  const bgColor = {
    green: "bg-green-50",
    yellow: "bg-yellow-50",
    blue: "bg-blue-50",
  }[color];

  return (
    <div className={`${bgColor} rounded-lg p-4`}>
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            className={`text-sm text-gray-700 ml-7 ${
              onItemClick ? "cursor-pointer hover:underline" : ""
            }`}
            onClick={() => onItemClick?.(item)}
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
