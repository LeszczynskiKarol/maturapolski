// frontend/src/components/ImageUpload.tsx
import { useState, useRef } from "react";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import api from "../services/api";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  folder?: string;
  maxSize?: number; // w MB
}

export function ImageUpload({
  onImageUploaded,
  folder = "content",
  maxSize = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Walidacja
    if (!file.type.startsWith("image/")) {
      setError("Plik musi być obrazem");
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`Plik jest za duży. Maksymalny rozmiar: ${maxSize}MB`);
      return;
    }

    setError(null);

    // Podgląd
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        `/api/upload/image?folder=${folder}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onImageUploaded(response.data.url);
      setPreview(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Błąd uploadu");
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          {!uploading && (
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-8 h-8" />
              <span className="font-medium">Kliknij aby dodać obraz</span>
              <span className="text-xs text-gray-500">
                PNG, JPG, WebP (max {maxSize}MB)
              </span>
            </>
          )}
        </button>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
