// frontend/src/features/oral-exam/OralExamSimulator.tsx

import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Play, Pause, RotateCcw, Send } from "lucide-react";
import { useRecorder } from "../../hooks/useRecorder";
import { useAIFeedback } from "../../hooks/useAIFeedback";
import { Timer } from "../../components/Timer";

export const OralExamSimulator: React.FC = () => {
  const [stage, setStage] = useState<
    "setup" | "preparation" | "presentation" | "review"
  >("setup");
  const [selectedSet, setSelectedSet] = useState(null);
  const [transcript, setTranscript] = useState("");

  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  } = useRecorder();

  const { analyze, feedback, isAnalyzing } = useAIFeedback();

  const handleStartExam = () => {
    // Losowanie zestawu
    const randomSet = generateRandomSet();
    setSelectedSet(randomSet);
    setStage("preparation");
  };

  const handleStartPresentation = () => {
    setStage("presentation");
    startRecording();
  };

  const handleStopPresentation = async () => {
    const audio = await stopRecording();
    setStage("review");

    // Transcribe audio (można użyć Whisper API)
    const transcription = await transcribeAudio(audio);
    setTranscript(transcription);

    // Analyze with AI
    await analyze({
      type: "ORAL_PRESENTATION",
      transcript: transcription,
      topic: selectedSet.topic,
      duration: audio.duration,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {stage === "setup" && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Symulacja egzaminu ustnego
          </h2>
          <p className="text-gray-600 mb-6">
            Przygotuj się do egzaminu ustnego z języka polskiego. Otrzymasz
            losowy zestaw zadań i będziesz mieć 15 minut na przygotowanie.
          </p>
          <button
            onClick={handleStartExam}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
          >
            Rozpocznij symulację
          </button>
        </div>
      )}

      {stage === "preparation" && selectedSet && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Czas przygotowania</h3>
              <Timer
                duration={15 * 60}
                onComplete={() => setStage("presentation")}
              />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">
                  Zadanie 1: Lektura obowiązkowa
                </h4>
                <p>{selectedSet.task1}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Zadanie 2: Kultura</h4>
                <p>{selectedSet.task2}</p>
                {selectedSet.material && (
                  <div className="mt-3">
                    <MaterialDisplay material={selectedSet.material} />
                  </div>
                )}
              </div>
            </div>

            <NotePad />

            <button
              onClick={handleStartPresentation}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Przejdź do prezentacji
            </button>
          </div>
        </div>
      )}

      {stage === "presentation" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Prezentacja</h3>
              <Timer duration={10 * 60} />
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center ${
                    isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"
                  }`}
                >
                  {isRecording ? (
                    <Mic className="w-12 h-12 text-red-600" />
                  ) : (
                    <MicOff className="w-12 h-12 text-gray-400" />
                  )}
                </div>
              </div>

              <AudioVisualizer isActive={isRecording} />

              <div className="flex gap-4">
                <button
                  onClick={
                    isRecording
                      ? handleStopPresentation
                      : handleStartPresentation
                  }
                  className={`px-6 py-3 rounded-lg text-white ${
                    isRecording ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {isRecording
                    ? "Zakończ prezentację"
                    : "Rozpocznij prezentację"}
                </button>
              </div>
            </div>

            <PresentationTips />
          </div>
        </div>
      )}

      {stage === "review" && feedback && (
        <div className="space-y-6">
          <OralExamFeedback
            feedback={feedback}
            transcript={transcript}
            audioBlob={audioBlob}
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setStage("setup")}
              className="px-4 py-2 border rounded-lg"
            >
              Nowa symulacja
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Pobierz raport
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
