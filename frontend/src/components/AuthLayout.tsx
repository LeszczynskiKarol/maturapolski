// frontend/src/components/AuthLayout.tsx

import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Home,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">Matura Polski</span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
              >
                <Home className="w-4 h-4" />
                Strona główna
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600">
                O nas
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600">
                Kontakt
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Matura Polski</h4>
              <p className="text-gray-400 text-sm">
                Najlepsza platforma do nauki do matury z języka polskiego.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Szybkie linki</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/features" className="hover:text-white">
                    Funkcje
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Cennik
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  kontakt@maturapolski.pl
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +48 123 456 789
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Śledź nas</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Matura Polski. Wszystkie prawa zastrzeżone.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to="/terms" className="hover:text-white">
                Regulamin
              </Link>
              <Link to="/privacy" className="hover:text-white">
                Polityka prywatności
              </Link>
              <Link to="/rodo" className="hover:text-white">
                RODO
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
