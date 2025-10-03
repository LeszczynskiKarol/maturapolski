// frontend/src/features/admin/exams/ExamEditor.tsx

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";
import { X, Plus, Trash2, Save } from "lucide-react";
import { toast } from "react-hot-toast";

interface ExamEditorProps {
  exam?: any;
  onClose: () => void;
  onSave: () => void;
}

export const ExamEditor: React.FC<ExamEditorProps> = ({
  exam,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    type: "PODSTAWOWY",
    duration: 180,
    isActive: true,
    sections: [] as any[],
  });

  useEffect(() => {
    if (exam) {
      setFormData({
        title: exam.title,
        year: exam.year,
        type: exam.type,
        duration: exam.duration,
        isActive: exam.isActive,
        sections: exam.sections || [],
      });
    }
  }, [exam]);

  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (exam) {
        return api.put(`/api/admin/exams/${exam.id}`, data);
      } else {
        return api.post("/api/admin/exams", data);
      }
    },
    onSuccess: () => {
      toast.success(exam ? "Egzamin zaktualizowany" : "Egzamin utworzony");
      onSave();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Błąd zapisu");
    },
  });

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "",
          instruction: "",
          questions: [],
        },
      ],
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (index: number, data: any) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === index ? { ...s, ...data } : s
      ),
    }));
  };

  const addQuestion = (sectionIndex: number) => {
    const newQuestion = {
      type: "SHORT_ANSWER",
      question: "",
      points: 1,
      content: {},
    };

    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === sectionIndex
          ? { ...s, questions: [...s.questions, newQuestion] }
          : s
      ),
    }));
  };

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s: any, i: number) =>
        i === sectionIndex
          ? {
              ...s,
              questions: s.questions.filter(
                (_: any, qi: number) => qi !== questionIndex
              ),
            }
          : s
      ),
    }));
  };

  const updateQuestion = (
    sectionIndex: number,
    questionIndex: number,
    data: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === sectionIndex
          ? {
              ...s,
              questions: s.questions.map((q: any, qi: number) =>
                qi === questionIndex ? { ...q, ...data } : q
              ),
            }
          : s
      ),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {exam ? "Edytuj egzamin" : "Nowy egzamin"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Podstawowe dane */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tytuł egzaminu
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="np. Egzamin Maturalny 2025"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rok</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    year: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Poziom</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="PODSTAWOWY">Podstawowy</option>
                <option value="ROZSZERZONY">Rozszerzony</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Czas trwania (min)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    duration: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">
                Egzamin aktywny (widoczny dla studentów)
              </span>
            </label>
          </div>

          {/* Sekcje */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Sekcje egzaminu</h3>
              <button
                onClick={addSection}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                <Plus className="w-4 h-4" />
                Dodaj sekcję
              </button>
            </div>

            <div className="space-y-4">
              {formData.sections.map((section, sIdx) => (
                <div key={sIdx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) =>
                          updateSection(sIdx, {
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Tytuł sekcji"
                      />
                      <textarea
                        value={section.instruction}
                        onChange={(e) =>
                          updateSection(sIdx, {
                            instruction: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Instrukcja dla sekcji"
                        rows={2}
                      />
                    </div>
                    <button
                      onClick={() => removeSection(sIdx)}
                      className="ml-4 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Pytania */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Pytania</h4>
                      <button
                        onClick={() => addQuestion(sIdx)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        + Dodaj pytanie
                      </button>
                    </div>

                    <div className="space-y-2">
                      {section.questions.map((question: any, qIdx: number) => (
                        <div key={qIdx} className="bg-gray-50 p-3 rounded">
                          <div className="grid grid-cols-12 gap-2 items-start">
                            <div className="col-span-2">
                              <select
                                value={question.type}
                                onChange={(e) =>
                                  updateQuestion(sIdx, qIdx, {
                                    type: e.target.value,
                                  })
                                }
                                className="w-full text-xs px-2 py-1 border rounded"
                              >
                                <option value="CLOSED_SINGLE">
                                  Jednokrotny
                                </option>
                                <option value="CLOSED_MULTIPLE">
                                  Wielokrotny
                                </option>
                                <option value="SHORT_ANSWER">
                                  Krótka odp.
                                </option>
                                <option value="SYNTHESIS_NOTE">Notatka</option>
                                <option value="ESSAY">Wypracowanie</option>
                              </select>
                            </div>

                            <div className="col-span-7">
                              <input
                                type="text"
                                value={question.question}
                                onChange={(e) =>
                                  updateQuestion(sIdx, qIdx, {
                                    question: e.target.value,
                                  })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Treść pytania"
                              />
                            </div>

                            <div className="col-span-2">
                              <input
                                type="number"
                                value={question.points}
                                onChange={(e) =>
                                  updateQuestion(sIdx, qIdx, {
                                    points: parseInt(e.target.value),
                                  })
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                                placeholder="Pkt"
                              />
                            </div>

                            <div className="col-span-1">
                              <button
                                onClick={() => removeQuestion(sIdx, qIdx)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Anuluj
          </button>
          <button
            onClick={() => saveMutation.mutate(formData)}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? "Zapisywanie..." : "Zapisz egzamin"}
          </button>
        </div>
      </div>
    </div>
  );
};
