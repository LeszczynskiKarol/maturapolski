// frontend/src/features/materials/MaterialDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { materialsService } from "../../services/materialsService";
import {
  ArrowLeft,
  Clock,
  Eye,
  Tag,
  BookOpen,
  User,
  Calendar,
  Lock,
} from "lucide-react";

export const MaterialDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [material, setMaterial] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadMaterial();
    }
  }, [slug]);

  const loadMaterial = async () => {
    try {
      setLoading(true);
      const data = await materialsService.getMaterial(slug!);
      setMaterial(data);
    } catch (err) {
      console.error("Error loading material:", err);
      setError("Nie udało się załadować materiału");
    } finally {
      setLoading(false);
    }
  };

  // Renderowanie bloków treści
  const renderContent = (content: any) => {
    if (!content?.blocks) return null;

    return content.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case "heading":
          return (
            <h2 key={index} className="text-2xl font-bold mb-4 mt-6">
              {block.content}
            </h2>
          );
        case "paragraph":
          return (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {block.content}
            </p>
          );
        case "list":
          const items = block.content
            .split("\n")
            .filter((item: string) => item.trim());
          return (
            <ul key={index} className="list-disc list-inside mb-4 space-y-2">
              {items.map((item: string, i: number) => (
                <li key={i} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          );
        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600"
            >
              {block.content}
            </blockquote>
          );
        default:
          return null;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Ładowanie...</div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Materiał nie znaleziony"}
          </p>
          <Link to="/materialy" className="text-blue-600 hover:underline">
            Wróć do listy materiałów
          </Link>
        </div>
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
          {/* Nagłówek */}
          <div className="mb-6">
            {material.isPremium && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm rounded-full font-medium mb-4">
                <Lock className="w-4 h-4" />
                Premium
              </span>
            )}

            <h1 className="text-3xl font-bold mb-4">{material.title}</h1>

            {material.summary && (
              <p className="text-lg text-gray-600 mb-4">{material.summary}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600 border-b pb-4">
              {material.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {material.readingTime} min czytania
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {material.views} wyświetleń
              </span>
              {material.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(material.createdAt).toLocaleDateString("pl-PL")}
                </span>
              )}
            </div>
          </div>

          {/* Treść */}
          <div className="prose max-w-none">
            {renderContent(material.content)}
          </div>

          {/* Tagi */}
          {material.tags && material.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-500" />
                {material.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Info o dziele */}
          {material.work && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Powiązane dzieło:</strong> {material.work.author} -{" "}
                {material.work.title}
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};
