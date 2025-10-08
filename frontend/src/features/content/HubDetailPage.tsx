// frontend/src/features/content/HubDetailPage.tsx
// Szczegóły HUB-a + menu stron
// ==========================================

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { contentService } from "../../services/contentService";
import { ArrowLeft, FileText } from "lucide-react";

interface HubDetail {
  id: string;
  slug: string;
  title: string;
  type: string;
  description?: string;
  author?: string;
  imageUrl?: string;
  imageAlignment?: string;
  imageWidth?: string;
  pages: Array<{
    id: string;
    slug: string;
    title: string;
    order: number;
  }>;
}

export function HubDetailPage() {
  const { hubSlug } = useParams<{ hubSlug: string }>();
  const [hub, setHub] = useState<HubDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hubSlug) {
      loadHub();
    }
  }, [hubSlug]);

  const loadHub = async () => {
    try {
      const data = await contentService.getHub(hubSlug!);
      setHub(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Ładowanie...
      </div>
    );
  }

  if (!hub) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Nie znaleziono
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/baza-wiedzy"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do bazy wiedzy
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          {hub.imageUrl && (
            <figure
              className={`mb-6 ${
                hub.imageAlignment === "left" ? "float-left mr-6" : ""
              }${hub.imageAlignment === "right" ? "float-right ml-6" : ""}${
                hub.imageAlignment === "center" ? "mx-auto" : ""
              }`}
              style={{
                width:
                  hub.imageAlignment === "center" ||
                  hub.imageAlignment === "left" ||
                  hub.imageAlignment === "right"
                    ? hub.imageWidth || "100%"
                    : "100%",
                maxWidth: "100%",
              }}
            >
              <img
                src={hub.imageUrl}
                alt={hub.title}
                className="w-full rounded-lg shadow-lg"
              />
            </figure>
          )}

          <h1 className="text-3xl font-bold mb-2">{hub.title}</h1>
          {hub.author && (
            <p className="text-lg text-gray-600 mb-4">{hub.author}</p>
          )}
          {hub.description && (
            <p className="text-gray-600">{hub.description}</p>
          )}

          {/* Clearfix dla float */}
          {(hub.imageAlignment === "left" ||
            hub.imageAlignment === "right") && (
            <div className="clear-both"></div>
          )}
        </div>

        {/* Menu stron */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Spis treści</h2>

          {hub.pages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Brak stron</p>
          ) : (
            <div className="space-y-2">
              {hub.pages.map((page) => (
                <Link
                  key={page.id}
                  to={`/baza-wiedzy/${hub.slug}/${page.slug}`}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{page.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
