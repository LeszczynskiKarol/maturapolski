// frontend/src/components/RatingWidget.tsx
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { contentService } from "../services/contentService";

interface RatingWidgetProps {
  pageId: string;
  pageTitle: string;
  hubTitle: string;
}

export function RatingWidget({
  pageId,
  pageTitle,
  hubTitle,
}: RatingWidgetProps) {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    // RESET STANU przed załadowaniem nowych danych
    setUserRating(0);
    setHasRated(false);
    setHoveredRating(0);
    setAverageRating(0);
    setRatingsCount(0);

    // Teraz załaduj dane dla nowej strony
    loadRating();
    checkIfUserRated();
  }, [pageId]);

  const loadRating = async () => {
    try {
      const data = await contentService.getPageRating(pageId);
      setAverageRating(data.averageRating || 0);
      setRatingsCount(data.ratingsCount || 0);
    } catch (error) {
      console.error("Error loading rating:", error);
    }
  };

  const checkIfUserRated = () => {
    // Sprawdź localStorage czy użytkownik już ocenił tę stronę
    // Używaj pageId jako klucza (nie będzie to konfliktować między różnymi userami/IP)
    const ratedPages = JSON.parse(localStorage.getItem("ratedPages") || "{}");
    if (ratedPages[pageId]) {
      setHasRated(true);
      setUserRating(ratedPages[pageId]);
    }
  };

  const handleRate = async (rating: number) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await contentService.submitRating(pageId, rating);

      // Zapisz w localStorage
      const ratedPages = JSON.parse(localStorage.getItem("ratedPages") || "{}");
      ratedPages[pageId] = rating;
      localStorage.setItem("ratedPages", JSON.stringify(ratedPages));

      setUserRating(rating);
      setHasRated(true);

      // Odśwież ocenę
      await loadRating();
    } catch (error: any) {
      console.error("Error submitting rating:", error);

      // DODAJ LEPSZĄ OBSŁUGĘ BŁĘDÓW
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Wystąpił błąd podczas oceniania. Spróbuj ponownie.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-sm border border-blue-100">
      {/* Structured Data dla Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          name: pageTitle,
          about: hubTitle,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: averageRating.toFixed(1),
            bestRating: "5",
            worstRating: "1",
            ratingCount: ratingsCount,
          },
        })}
      </script>

      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Oceń to opracowanie
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Pomóż innym uczniom - podziel się swoją opinią
        </p>

        {/* Gwiazdki */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => !hasRated && handleRate(star)}
              onMouseEnter={() => !hasRated && setHoveredRating(star)}
              onMouseLeave={() => !hasRated && setHoveredRating(0)}
              disabled={hasRated || isSubmitting}
              className={`transition-all ${
                hasRated ? "cursor-default" : "cursor-pointer hover:scale-110"
              }`}
            >
              <Star
                className={`w-10 h-10 ${
                  star <= (hoveredRating || userRating || averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="text-center">
          {hasRated ? (
            <p className="text-sm text-green-600 font-medium">
              ✓ Dziękujemy za ocenę!
            </p>
          ) : (
            <p className="text-sm text-gray-500">Kliknij gwiazdki aby ocenić</p>
          )}
        </div>

        {/* Statystyki */}
        {ratingsCount > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-400">/</span>
              <span>5</span>
              <span className="text-gray-400 ml-2">
                ({ratingsCount} {ratingsCount === 1 ? "ocena" : "ocen"})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
