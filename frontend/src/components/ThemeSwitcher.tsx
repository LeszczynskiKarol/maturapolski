// frontend/src/components/ThemeSwitcher.tsx

import React, { useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const ThemeSwitcher: React.FC = () => {
  const { theme, effectiveTheme, setTheme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  const themes = [
    { value: "light", label: "Jasny", icon: Sun },
    { value: "dark", label: "Ciemny", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  const currentIcon =
    theme === "system" ? Monitor : effectiveTheme === "dark" ? Moon : Sun;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <currentIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-1">
            {themes.map((item) => (
              <Menu.Item key={item.value}>
                {({ active }) => (
                  <button
                    onClick={() => setTheme(item.value)}
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    } ${
                      theme === item.value
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-900 dark:text-gray-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                    {theme === item.value && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

// Prostsza wersja - tylko toggle
export const ThemeToggle: React.FC = () => {
  const { effectiveTheme, toggleTheme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
      aria-label="Przełącz motyw"
    >
      {effectiveTheme === "dark" ? (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
      )}
    </button>
  );
};
