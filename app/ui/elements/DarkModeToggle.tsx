"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import clsx from "clsx";

export default function DarkModeToggle() {
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setDarkMode(!isDarkMode)}
      className={clsx(
        "p-2 rounded transition-colors",
        { "bg-gray-800 text-white": isDarkMode },
        { "bg-gray-200 text-black": !isDarkMode }
      )}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
