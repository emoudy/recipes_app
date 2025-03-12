"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.setAttribute("data-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <header className="header">
      {/* Navigation Button */}
      <nav className="header-nav">
        <Link href={"/"} className="nav-button">
          Home
        </Link>
        <Link href={pathname === "/chat" ? "/recipes" : "/chat"} className="nav-button">
          {pathname === "/chat" ? "Recipes" : "Chat"}
        </Link>
      </nav>

      {/* Right Side Icons */}
      <div className="header-icons">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? <SunIcon className="w-6" /> : <MoonIcon className="w-6" />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="profile-icon">
            <span className="avatar">EL</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown">
              <button className="dropdown-item">Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
