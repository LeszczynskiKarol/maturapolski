// frontend/src/components/WordCounter.tsx

import React from "react";

interface WordCounterProps {
  text: string;
  min?: number;
  max?: number;
}

export const WordCounter: React.FC<WordCounterProps> = ({ text, min, max }) => {
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const getColor = () => {
    if (min && wordCount < min) return "text-red-600";
    if (max && wordCount > max) return "text-red-600";
    if (min && wordCount >= min * 0.8) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className={`text-sm font-medium ${getColor()}`}>
      {wordCount} słów
      {min && max && (
        <span className="text-gray-500 ml-1">
          ({min}-{max})
        </span>
      )}
    </div>
  );
};
