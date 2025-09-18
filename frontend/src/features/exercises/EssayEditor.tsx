// frontend/src/features/exercises/EssayEditor.tsx

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAssessment } from "../../hooks/useAssessment";
import { WordCounter } from "../../components/WordCounter";
import { RubricDisplay } from "../../components/RubricDisplay";
import { AIFeedback } from "../../components/AIFeedback";

interface EssayEditorProps {
  topic: string;
  requirements: {
    minWords: number;
    requiredText: string;
    contexts: string[];
  };
}

export const EssayEditor: React.FC<EssayEditorProps> = ({
  topic,
  requirements,
}) => {
  const [text, setText] = useState("");
  const [showRubric, setShowRubric] = useState(false);
  const { assess, assessment, isLoading } = useAssessment();

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const isMinWordsMet = wordCount >= requirements.minWords;

  const handleSubmit = useCallback(async () => {
    await assess({
      content: text,
      topic,
      requirements,
    });
  }, [text, topic, requirements, assess]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">{topic}</h2>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-96 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rozpocznij pisanie wypracowania..."
            />

            <div className="absolute bottom-4 right-4">
              <WordCounter text={text} min={requirements.minWords} />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setShowRubric(!showRubric)}
              className="text-blue-600 hover:text-blue-700"
            >
              {showRubric ? "Ukryj" : "Pokaż"} kryteria oceny
            </button>

            <button
              onClick={handleSubmit}
              disabled={!isMinWordsMet || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Oceniam..." : "Oceń wypracowanie"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showRubric && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <RubricDisplay />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <RequirementsCard requirements={requirements} />

        {assessment && (
          <AIFeedback
            assessment={assessment}
            onImprove={(suggestion) => {
              console.log("Improving:", suggestion);
            }}
          />
        )}
      </div>
    </div>
  );
};

const RequirementsCard: React.FC<{ requirements: any }> = ({
  requirements,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-3">Wymagania</h3>
      <ul className="space-y-2 text-sm">
        <li>• Minimum {requirements.minWords} słów</li>
        <li>• Odwołanie do: {requirements.requiredText}</li>
        {requirements.contexts.map((context: string, i: number) => (
          <li key={i}>• {context}</li>
        ))}
      </ul>
    </div>
  );
};
