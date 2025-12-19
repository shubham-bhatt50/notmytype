"use client";

import React, { useEffect, useState } from "react";

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    // Check current theme
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = root.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";
    
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-primary-700">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-neutral-100 dark:bg-primary-700 hover:bg-neutral-200 dark:hover:bg-primary-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg
          className="w-5 h-5 text-primary-900 dark:text-primary-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-primary-900 dark:text-primary-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

