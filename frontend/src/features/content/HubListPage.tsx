// frontend/src/features/content/HubListPage.tsx
import { PublicLayout } from "../../components/PublicLayout";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { contentService } from "../../services/contentService";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";

interface Hub {
  id: string;
  slug: string;
  title: string;
  type: string;
  description?: string;
  author?: string;
  epoch?: string;
  _count?: { pages: number };
}

const HUB_TYPES = [
  { value: "all", label: "Wszystko", icon: BookOpen },
  { value: "LITERARY_WORK", label: "Lektury", icon: BookOpen },
  { value: "EPOCH", label: "Epoki", icon: Calendar },
  { value: "AUTHOR", label: "Autorzy", icon: User },
];

export default function HubListPage() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHubs();
  }, [selectedType]);

  const loadHubs = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (selectedType !== "all") {
        params.type = selectedType;
      }

      const response = await contentService.getHubs(params);
      // Odfiltruj huby GUIDE - nie należą do bazy wiedzy
      const filteredHubs = (response.hubs || []).filter(
        (hub: Hub) => hub.type !== "GUIDE"
      );
      setHubs(filteredHubs);
    } catch (error) {
      console.error("Error loading hubs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <Helmet>
        <title>Baza wiedzy - MaturaPolski.pl</title>
        <meta
          name="description"
          content="Lektury, epoki, autorzy - wszystko czego potrzebujesz do matury z języka polskiego"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Baza wiedzy</h1>
            <p className="text-gray-600">
              Lektury, epoki, autorzy - wszystko czego potrzebujesz do matury
            </p>
          </div>
        </div>

        {/* Filtry */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {HUB_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                    selectedType === type.value
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* Lista */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">Ładowanie...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hubs.map((hub) => (
                <Link
                  key={hub.id}
                  to={`/baza-wiedzy/${hub.slug}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <h3 className="text-lg font-semibold mb-2">{hub.title}</h3>
                  {hub.author && (
                    <p className="text-sm text-gray-600 mb-2">{hub.author}</p>
                  )}
                  {hub.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {hub.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{hub._count?.pages || 0} stron</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
