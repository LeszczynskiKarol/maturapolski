// frontend/src/features/admin/ContentEditor.tsx

import React, { useState } from "react";
import { Save, Upload, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export const ContentEditor: React.FC = () => {
  const [preview, setPreview] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm();

  const { mutate: saveContent } = useMutation({
    mutationFn: (data: any) => api.post("/api/admin/content", data),
    onSuccess: () => {
      toast.success("Treść zapisana pomyślnie");
    },
  });

  const onSubmit = (data: any) => {
    saveContent(data);
  };

  const content = watch("content");

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edytor treści</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 border rounded-lg flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {preview ? "Edycja" : "Podgląd"}
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Zapisz
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tytuł</label>
          <input
            {...register("title")}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Wprowadź tytuł..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategoria</label>
          <select
            {...register("category")}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Wybierz kategorię</option>
            <option value="THEORY">Teoria</option>
            <option value="EXERCISES">Ćwiczenia</option>
            <option value="EXAMS">Egzaminy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Treść</label>
          {preview ? (
            <div
              className="prose max-w-none p-4 border rounded-lg min-h-[400px]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <textarea
              {...register("content")}
              className="w-full px-3 py-2 border rounded-lg"
              rows={15}
              placeholder="Wprowadź treść..."
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Załączniki</label>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Przeciągnij pliki tutaj lub kliknij, aby wybrać
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
