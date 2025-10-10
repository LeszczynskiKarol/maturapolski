// frontend/src/features/admin/RatingsManager.tsx
import { useState, useEffect } from "react";
import { Star, Trash2, X, User, Globe } from "lucide-react";
import { contentService } from "../../services/contentService";

interface Rating {
  id: string;
  rating: number;
  userId: string | null;
  ipAddress: string | null;
  createdAt: string;
  user?: {
    id: string;
    username: string;
    email: string;
  } | null;
}

interface RatingsManagerProps {
  pageId: string;
  pageTitle: string;
  onClose: () => void;
}

export function RatingsManager({
  pageId,
  pageTitle,
  onClose,
}: RatingsManagerProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRatings();
  }, [pageId]);

  const loadRatings = async () => {
    try {
      const result = await contentService.getPageRatingsDetailed(pageId);
      setData(result);
    } catch (error) {
      console.error("Error loading ratings:", error);
      alert("Błąd ładowania ocen");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRating = async (ratingId: string) => {
    if (!confirm("Usunąć tę ocenę?")) return;

    try {
      await contentService.deleteRating(ratingId);
      loadRatings(); // Odśwież listę
    } catch (error) {
      alert("Błąd usuwania oceny");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pl-PL");
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6">Ładowanie...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b">
          <div>
            <h2 className="text-2xl font-bold mb-2">Zarządzanie ocenami</h2>
            <p className="text-gray-600 text-sm">{pageTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Statystyki */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data.page.averageRating?.toFixed(2) || "0.00"}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (data.page.averageRating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">Średnia ocena</div>
            </div>

            <div className="w-px h-16 bg-gray-300" />

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data.page.ratingsCount || 0}
              </div>
              <div className="text-sm text-gray-600">Łączna liczba ocen</div>
            </div>
          </div>
        </div>

        {/* Lista ocen */}
        {data.ratings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Brak ocen dla tej strony</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.ratings.map((rating: Rating) => (
              <div
                key={rating.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Gwiazdki */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= rating.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="w-px h-8 bg-gray-300" />

                  {/* User info */}
                  <div className="flex-1">
                    {rating.user ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium text-sm">
                            {rating.user.username}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rating.user.email}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-600">
                            Użytkownik anonimowy
                          </div>
                          <div className="text-xs text-gray-400">
                            IP: {rating.ipAddress || "nieznany"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Data */}
                  <div className="text-sm text-gray-500">
                    {formatDate(rating.createdAt)}
                  </div>
                </div>

                {/* Przycisk usuń */}
                <button
                  onClick={() => handleDeleteRating(rating.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg ml-4"
                  title="Usuń ocenę"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
