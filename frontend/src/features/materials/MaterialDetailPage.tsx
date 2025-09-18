// frontend/src/features/materials/MaterialDetailPage.tsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Eye,
  Tag,
  BookOpen,
  User,
  Calendar,
} from "lucide-react";

export const MaterialDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [material, setMaterial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tutaj będzie fetch z API
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/materialy"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do materiałów
        </Link>

        <article className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-4">Tytuł materiału</h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              15 min czytania
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              1,234 wyświetleń
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              15.01.2024
            </span>
          </div>

          <div className="prose max-w-none">
            <p>Treść materiału...</p>
          </div>
        </article>
      </div>
    </div>
  );
};
