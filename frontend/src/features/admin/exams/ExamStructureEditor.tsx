// frontend/src/features/admin/exams/ExamStructureEditor.tsx

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";
import { X, Plus, Trash2, Save, Info, Brain } from "lucide-react";
import { toast } from "react-hot-toast";

interface ExamStructure {
  id?: string;
  title: string;
  year: number;
  type: "PODSTAWOWY" | "ROZSZERZONY";
  duration: number;
  isActive: boolean;
  sections: Array<{
    title: string;
    instruction: string;
    questionRequirements: Array<{
      type: string;
      count: number;
      points: number;
      category?: string;
      difficultyRange?: { min: number; max: number };
    }>;
  }>;
}

export const ExamStructureEditor: React.FC<{
  exam?: any;
  onClose: () => void;
  onSave: () => void;
}> = ({ exam, onClose, onSave }) => {
  const [structure, setStructure] = useState<ExamStructure>({
    title: "",
    year: new Date().getFullYear(),
    type: "PODSTAWOWY",
    duration: 240,
    isActive: true,
    sections: [],
  });

  useEffect(() => {
    if (exam) {
      // Konwersja istniejącego egzaminu na strukturę
      setStructure({
        id: exam.id,
        title: exam.title,
        year: exam.year,
        type: exam.type,
        duration: exam.duration,
        isActive: exam.isActive,
        sections:
          exam.sections?.map((section: any) => ({
            title: section.title,
            instruction: section.instruction,
            questionRequirements: extractRequirementsFromSection(section),
          })) || [],
      });
    } else {
      // Domyślna struktura dla nowego egzaminu
      setDefaultStructure();
    }
  }, [exam]);

  const setDefaultStructure = () => {
    const isBasic = structure.type === "PODSTAWOWY";

    setStructure((prev) => ({
      ...prev,
      sections: isBasic
        ? [
            {
              title: "Arkusz 1 - Część 1: Język polski w użyciu",
              instruction:
                "Przeczytaj uważnie teksty, a następnie wykonaj zadania.",
              questionRequirements: [
                {
                  type: "SHORT_ANSWER",
                  count: 3,
                  points: 1,
                  category: "LANGUAGE_USE",
                  difficultyRange: { min: 1, max: 3 },
                },
                {
                  type: "SYNTHESIS_NOTE",
                  count: 1,
                  points: 4,
                  category: "LANGUAGE_USE",
                  difficultyRange: { min: 2, max: 4 },
                },
                {
                  type: "CLOSED_MULTIPLE",
                  count: 1,
                  points: 1,
                  category: "LANGUAGE_USE",
                  difficultyRange: { min: 2, max: 3 },
                },
              ],
            },
            {
              title: "Arkusz 1 - Część 2: Test historycznoliteracki",
              instruction:
                "Wykonaj zadania. Odpowiadaj tylko własnymi słowami.",
              questionRequirements: [
                {
                  type: "CLOSED_SINGLE",
                  count: 10,
                  points: 1,
                  category: "HISTORICAL_LITERARY",
                  difficultyRange: { min: 1, max: 3 },
                },
                {
                  type: "CLOSED_MULTIPLE",
                  count: 3,
                  points: 1,
                  category: "HISTORICAL_LITERARY",
                  difficultyRange: { min: 2, max: 4 },
                },
                {
                  type: "SHORT_ANSWER",
                  count: 2,
                  points: 1,
                  category: "HISTORICAL_LITERARY",
                  difficultyRange: { min: 2, max: 4 },
                },
              ],
            },
            {
              title: "Arkusz 2 - Wypracowanie",
              instruction: "Wybierz jeden z tematów i napisz wypracowanie.",
              questionRequirements: [
                {
                  type: "ESSAY",
                  count: 1,
                  points: 35,
                  category: "WRITING",
                  difficultyRange: { min: 3, max: 5 },
                },
              ],
            },
          ]
        : [
            {
              title: "Arkusz 1 - Część 1: Język polski w użyciu",
              instruction: "Zaawansowane zadania językowe.",
              questionRequirements: [
                {
                  type: "SHORT_ANSWER",
                  count: 4,
                  points: 2,
                  category: "LANGUAGE_USE",
                  difficultyRange: { min: 3, max: 5 },
                },
                {
                  type: "SYNTHESIS_NOTE",
                  count: 2,
                  points: 5,
                  category: "LANGUAGE_USE",
                  difficultyRange: { min: 4, max: 5 },
                },
              ],
            },
            {
              title: "Arkusz 1 - Część 2: Test historycznoliteracki",
              instruction: "Pogłębiona wiedza o literaturze.",
              questionRequirements: [
                {
                  type: "CLOSED_SINGLE",
                  count: 8,
                  points: 1,
                  category: "HISTORICAL_LITERARY",
                  difficultyRange: { min: 3, max: 5 },
                },
                {
                  type: "CLOSED_MULTIPLE",
                  count: 4,
                  points: 2,
                  category: "HISTORICAL_LITERARY",
                  difficultyRange: { min: 3, max: 5 },
                },
                {
                  type: "SHORT_ANSWER",
                  count: 5,
                  points: 2,
                  category: "HISTORICAL_LITERARY",
                  difficultyRange: { min: 4, max: 5 },
                },
              ],
            },
            {
              title: "Arkusz 2 - Wypracowanie",
              instruction: "Zaawansowany temat wymagający głębokiej analizy.",
              questionRequirements: [
                {
                  type: "ESSAY",
                  count: 1,
                  points: 40,
                  category: "WRITING",
                  difficultyRange: { min: 4, max: 5 },
                },
              ],
            },
          ],
    }));
  };

  const extractRequirementsFromSection = (section: any) => {
    // Grupuj pytania po typie
    const grouped =
      section.questions?.reduce((acc: any, q: any) => {
        const key = `${q.type}_${q.points}`;
        if (!acc[key]) {
          acc[key] = { type: q.type, points: q.points, count: 0 };
        }
        acc[key].count++;
        return acc;
      }, {}) || {};

    return Object.values(grouped);
  };

  const addSection = () => {
    setStructure((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "",
          instruction: "",
          questionRequirements: [],
        },
      ],
    }));
  };

  const removeSection = (index: number) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (
    index: number,
    data: Partial<(typeof structure.sections)[0]>
  ) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === index ? { ...s, ...data } : s
      ),
    }));
  };

  const addRequirement = (sectionIndex: number) => {
    const newRequirement = {
      type: "CLOSED_SINGLE",
      count: 1,
      points: 1,
      category: "HISTORICAL_LITERARY",
      difficultyRange: { min: 1, max: 3 },
    };

    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === sectionIndex
          ? {
              ...s,
              questionRequirements: [...s.questionRequirements, newRequirement],
            }
          : s
      ),
    }));
  };

  const removeRequirement = (sectionIndex: number, reqIndex: number) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === sectionIndex
          ? {
              ...s,
              questionRequirements: s.questionRequirements.filter(
                (_, ri) => ri !== reqIndex
              ),
            }
          : s
      ),
    }));
  };

  const updateRequirement = (
    sectionIndex: number,
    reqIndex: number,
    data: any
  ) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === sectionIndex
          ? {
              ...s,
              questionRequirements: s.questionRequirements.map((r, ri) =>
                ri === reqIndex ? { ...r, ...data } : r
              ),
            }
          : s
      ),
    }));
  };

  const saveMutation = useMutation({
    mutationFn: (data: ExamStructure) => {
      if (data.id) {
        return api.put(`/api/admin/exam-structures/${data.id}`, data);
      } else {
        return api.post("/api/admin/exam-structures", data);
      }
    },
    onSuccess: () => {
      toast.success(exam ? "Struktura zaktualizowana" : "Struktura utworzona");
      onSave();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Błąd zapisu");
    },
  });

  const getTotalPoints = () => {
    return structure.sections.reduce(
      (total, section) =>
        total +
        section.questionRequirements.reduce(
          (sectionTotal, req) => sectionTotal + req.count * req.points,
          0
        ),
      0
    );
  };

  const getTotalQuestions = () => {
    return structure.sections.reduce(
      (total, section) =>
        total +
        section.questionRequirements.reduce(
          (sectionTotal, req) => sectionTotal + req.count,
          0
        ),
      0
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Brain className="w-6 h-6" />
                {exam ? "Edytuj strukturę egzaminu" : "Nowa struktura egzaminu"}
              </h2>
              <p className="text-sm opacity-90 mt-1">
                Definiuj tylko strukturę - pytania będą dobierane dynamicznie
              </p>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">
                System inteligentnego doboru pytań
              </p>
              <p>
                Określasz tylko ile pytań każdego typu ma znaleźć się w
                egzaminie. System automatycznie dobierze odpowiednie pytania dla
                każdego studenta, unikając powtórzeń.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Podstawowe dane */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nazwa struktury
              </label>
              <input
                type="text"
                value={structure.title}
                onChange={(e) =>
                  setStructure({ ...structure, title: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="np. Matura 2025 - Dynamiczny dobór"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rok</label>
              <input
                type="number"
                value={structure.year}
                onChange={(e) =>
                  setStructure({ ...structure, year: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Poziom</label>
              <select
                value={structure.type}
                onChange={(e) => {
                  setStructure({
                    ...structure,
                    type: e.target.value as "PODSTAWOWY" | "ROZSZERZONY",
                  });
                  setDefaultStructure();
                }}
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
                value={structure.duration}
                onChange={(e) =>
                  setStructure({
                    ...structure,
                    duration: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Statystyki */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Łączna liczba pytań</p>
                <p className="text-2xl font-bold text-purple-600">
                  {getTotalQuestions()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Maksymalna liczba punktów
                </p>
                <p className="text-2xl font-bold text-indigo-600">
                  {getTotalPoints()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Liczba sekcji</p>
                <p className="text-2xl font-bold text-blue-600">
                  {structure.sections.length}
                </p>
              </div>
            </div>
          </div>

          {/* Sekcje */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Struktura sekcji</h3>
              <button
                onClick={addSection}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
                Dodaj sekcję
              </button>
            </div>

            <div className="space-y-4">
              {structure.sections.map((section, sIdx) => (
                <div key={sIdx} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) =>
                            updateSection(sIdx, { title: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded font-medium"
                          placeholder="Tytuł sekcji"
                        />
                        <textarea
                          value={section.instruction}
                          onChange={(e) =>
                            updateSection(sIdx, { instruction: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded text-sm"
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

                    {/* Wymagania pytań */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Wymagania pytań</h4>
                        <button
                          onClick={() => addRequirement(sIdx)}
                          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                          + Dodaj typ pytań
                        </button>
                      </div>

                      {section.questionRequirements.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-500">
                          Brak zdefiniowanych pytań. Kliknij "Dodaj typ pytań"
                          aby określić strukturę.
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg p-2 space-y-2">
                          {section.questionRequirements.map((req, rIdx) => (
                            <div
                              key={rIdx}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                            >
                              <select
                                value={req.type}
                                onChange={(e) =>
                                  updateRequirement(sIdx, rIdx, {
                                    type: e.target.value,
                                  })
                                }
                                className="px-2 py-1 border rounded text-sm"
                              >
                                <option value="CLOSED_SINGLE">
                                  Jednokrotny wybór
                                </option>
                                <option value="CLOSED_MULTIPLE">
                                  Wielokrotny wybór
                                </option>
                                <option value="SHORT_ANSWER">
                                  Krótka odpowiedź
                                </option>
                                <option value="SYNTHESIS_NOTE">
                                  Notatka syntetyzująca
                                </option>
                                <option value="ESSAY">Wypracowanie</option>
                              </select>

                              <select
                                value={req.category || ""}
                                onChange={(e) =>
                                  updateRequirement(sIdx, rIdx, {
                                    category: e.target.value,
                                  })
                                }
                                className="px-2 py-1 border rounded text-sm"
                              >
                                <option value="HISTORICAL_LITERARY">
                                  Historycznoliterackie
                                </option>
                                <option value="LANGUAGE_USE">
                                  Język w użyciu
                                </option>
                                <option value="WRITING">Pisanie</option>
                              </select>

                              <input
                                type="number"
                                value={req.count}
                                onChange={(e) =>
                                  updateRequirement(sIdx, rIdx, {
                                    count: parseInt(e.target.value),
                                  })
                                }
                                className="w-16 px-2 py-1 border rounded text-sm"
                                placeholder="Ilość"
                                min="1"
                              />
                              <span className="text-sm">×</span>
                              <input
                                type="number"
                                value={req.points}
                                onChange={(e) =>
                                  updateRequirement(sIdx, rIdx, {
                                    points: parseInt(e.target.value),
                                  })
                                }
                                className="w-16 px-2 py-1 border rounded text-sm"
                                placeholder="Pkt"
                                min="1"
                              />
                              <span className="text-sm font-medium">
                                = {req.count * req.points} pkt
                              </span>

                              <div className="flex items-center gap-1 text-xs">
                                <span>Trudność:</span>
                                <input
                                  type="number"
                                  value={req.difficultyRange?.min || 1}
                                  onChange={(e) =>
                                    updateRequirement(sIdx, rIdx, {
                                      difficultyRange: {
                                        ...req.difficultyRange,
                                        min: parseInt(e.target.value),
                                      },
                                    })
                                  }
                                  className="w-10 px-1 py-0.5 border rounded"
                                  min="1"
                                  max="5"
                                />
                                <span>-</span>
                                <input
                                  type="number"
                                  value={req.difficultyRange?.max || 3}
                                  onChange={(e) =>
                                    updateRequirement(sIdx, rIdx, {
                                      difficultyRange: {
                                        ...req.difficultyRange,
                                        max: parseInt(e.target.value),
                                      },
                                    })
                                  }
                                  className="w-10 px-1 py-0.5 border rounded"
                                  min="1"
                                  max="5"
                                />
                              </div>

                              <button
                                onClick={() => removeRequirement(sIdx, rIdx)}
                                className="ml-auto text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={structure.isActive}
                onChange={(e) =>
                  setStructure({ ...structure, isActive: e.target.checked })
                }
                className="w-4 h-4"
              />
              Struktura aktywna (widoczna dla studentów)
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Anuluj
            </button>
            <button
              onClick={() => saveMutation.mutate(structure)}
              disabled={saveMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Zapisywanie..." : "Zapisz strukturę"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
