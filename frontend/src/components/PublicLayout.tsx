// frontend/src/components/PublicLayout.tsx

import { useState, useEffect } from "react";
import { contentService } from "../services/contentService";
import { Link } from "react-router-dom";
import { BookOpen, ChevronDown, ArrowLeft, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface PublicLayoutProps {
  children: React.ReactNode;
}

interface TestHub {
  id: string;
  slug: string;
  title: string;
  author?: string;
  type: string;
  isRequired?: boolean;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredHubs, setFeaturedHubs] = useState<any[]>([]);
  const [testHubs, setTestHubs] = useState<TestHub[]>([]);

  useEffect(() => {
    loadFeaturedHubs();
  }, []);

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    try {
      // Pobierz huby z testami
      const tests = await contentService.getHubsWithTests(5);
      setTestHubs(tests);

      // Pobierz featured huby dla bazy wiedzy (jak masz obecnie)
      const hubs = await contentService.getHubs({ limit: 5 });
      setFeaturedHubs(hubs.hubs || []);
    } catch (error) {
      console.error("Error loading footer data:", error);
    }
  };

  const loadFeaturedHubs = async () => {
    try {
      const response = await contentService.getHubs({
        type: "LITERARY_WORK",
        limit: 5,
      });
      setFeaturedHubs(response.hubs || []);
    } catch (error) {
      console.error("Error loading featured hubs:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MaturaPolski.pl
                </span>
                <span className="text-xs font-semibold text-gray-600 tracking-wide">
                  Zdaj na 100%
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {!isLoggedIn ? (
                <>
                  <a
                    href="/#jak-dziala"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Jak działa
                  </a>

                  <a
                    href="/#funkcje"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Funkcje
                  </a>

                  <a
                    href="/#cennik"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Cennik
                  </a>

                  <a
                    href="/#opinie"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Opinie
                  </a>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Zaloguj się
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Załóż konto
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Wróć do panelu
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-3">
                  <a
                    href="/#jak-dziala"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jak działa
                  </a>

                  <a
                    href="/#funkcje"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Funkcje
                  </a>

                  <a
                    href="/#cennik"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cennik
                  </a>

                  <a
                    href="/#opinie"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Opinie
                  </a>

                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Zaloguj się
                  </Link>

                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Załóż konto
                  </Link>
                </div>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2 justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Wróć do panelu
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">MaturaPolski.pl</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-sm">
                Inteligentna platforma do nauki języka polskiego, która pomaga
                tysiącom maturzystów osiągnąć wymarzone wyniki.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  FB
                </a>

                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  IG
                </a>

                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">TikTok</span>
                  TT
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Produkt</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="/#funkcje"
                    className="hover:text-white transition-colors"
                  >
                    Funkcje
                  </a>
                </li>
                <li>
                  <a
                    href="/#cennik"
                    className="hover:text-white transition-colors"
                  >
                    Cennik
                  </a>
                </li>
                <li>
                  <a
                    href="/#opinie"
                    className="hover:text-white transition-colors"
                  >
                    Opinie
                  </a>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Załóż konto
                  </Link>
                </li>
              </ul>
            </div>

            {/* ZAKTUALIZOWANA SEKCJA - Baza wiedzy */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Baza wiedzy</h4>
              <ul className="space-y-3 text-gray-400">
                {featuredHubs.slice(0, 4).map((hub) => (
                  <li key={hub.id}>
                    <a
                      href={`/baza-wiedzy/${hub.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {hub.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/baza-wiedzy"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Zobacz wszystkie →
                  </a>
                </li>
              </ul>
            </div>

            {/* NOWA SEKCJA - Testy */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Popularne testy</h4>
              <ul className="space-y-3 text-gray-400">
                {testHubs.slice(0, 4).map((hub) => (
                  <li key={hub.id}>
                    <a
                      href={`/test/${hub.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {hub.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 MaturaPolski.pl. Wszystkie prawa zastrzeżone.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Regulamin
                </Link>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Polityka prywatności
                </Link>
                <Link to="/rodo" className="hover:text-white transition-colors">
                  RODO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
