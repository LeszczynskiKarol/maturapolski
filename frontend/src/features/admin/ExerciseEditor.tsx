// frontend/src/features/admin/ExerciseEditor.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

interface ExerciseEditorProps {
  exercise?: any;
  onClose: () => void;
  onSave: () => void;
}

export const ExerciseEditor: React.FC<ExerciseEditorProps> = ({
  exercise,
  onClose,
  onSave,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: exercise || {},
  });

  const onSubmit = async (data: any) => {
    console.log("Saving:", data);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {exercise ? "Edytuj zadanie" : "Nowe zadanie"}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Pytanie</label>
            <textarea
              {...register("question")}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Typ</label>
              <select
                {...register("type")}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="CLOSED_SINGLE">
                  Zamknięte - jednokrotny wybór
                </option>
                <option value="CLOSED_MULTIPLE">
                  Zamknięte - wielokrotny wybór
                </option>
                <option value="SHORT_ANSWER">Krótka odpowiedź</option>
                <option value="ESSAY">Wypracowanie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Kategoria
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="LANGUAGE_USE">Język w użyciu</option>
                <option value="HISTORICAL_LITERARY">
                  Test historycznoliteracki
                </option>
                <option value="WRITING">Pisanie</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
