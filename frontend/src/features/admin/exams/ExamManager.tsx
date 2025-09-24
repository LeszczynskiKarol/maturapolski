// frontend/src/features/admin/exams/ExamManager.tsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Power,
  Users,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ExamEditor } from "./ExamEditor";

interface Exam {
  id: string;
  title: string;
  year: number;
  type: string;
  duration: number;
  isActive: boolean;
  sections: any[];
  _count: { sessions: number };
}

export const ExamManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [showEditor, setShowEditor] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [expandedExams, setExpandedExams] = useState<Set<string>>(new Set());

  const { data: exams, isLoading } = useQuery<Exam[]>({
    queryKey: ["admin-exams"],
    queryFn: () => api.get("/api/admin/exams").then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/exams/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
      toast.success("Egzamin usunięty");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Błąd usuwania");
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: (id: string) => api.post(`/api/admin/exams/${id}/duplicate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
      toast.success("Egzamin zduplikowany");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/api/admin/exams/${id}/toggle`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
      toast.success("Status zmieniony");
    },
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedExams);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedExams(newExpanded);
  };

  if (showEditor) {
    return (
      <ExamEditor
        exam={editingExam}
        onClose={() => {
          setShowEditor(false);
          setEditingExam(null);
        }}
        onSave={() => {
          queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
          setShowEditor(false);
          setEditingExam(null);
        }}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Zarządzanie egzaminami</h1>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Nowy egzamin
        </button>
      </div>

      {isLoading ? (
        <div>Ładowanie...</div>
      ) : (
        <div className="space-y-4">
          {exams?.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleExpanded(exam.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedExams.has(exam.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>

                    <div>
                      <h3 className="font-semibold text-lg">{exam.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exam.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {exam._count.sessions} sesji
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            exam.type === "PODSTAWOWY"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {exam.type}
                        </span>
                        {exam.isActive ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            Aktywny
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            Nieaktywny
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMutation.mutate(exam.id)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title={exam.isActive ? "Dezaktywuj" : "Aktywuj"}
                    >
                      <Power
                        className={`w-4 h-4 ${
                          exam.isActive ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => duplicateMutation.mutate(exam.id)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Duplikuj"
                    >
                      <Copy className="w-4 h-4 text-blue-600" />
                    </button>

                    <button
                      onClick={() => {
                        setEditingExam(exam);
                        setShowEditor(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Edytuj"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Czy na pewno usunąć egzamin?")) {
                          deleteMutation.mutate(exam.id);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Usuń"
                      disabled={exam._count.sessions > 0}
                    >
                      <Trash2
                        className={`w-4 h-4 ${
                          exam._count.sessions > 0
                            ? "text-gray-300"
                            : "text-red-600"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {expandedExams.has(exam.id) && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Struktura egzaminu:</h4>
                    {exam.sections.map((section, idx) => (
                      <div key={section.id} className="ml-4 mb-2">
                        <div className="font-medium text-sm">
                          {idx + 1}. {section.title}
                        </div>
                        <div className="ml-4 text-sm text-gray-600">
                          {section.questions.length} zadań,{" "}
                          {section.questions.reduce(
                            (sum: number, q: any) => sum + q.points,
                            0
                          )}{" "}
                          pkt
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
