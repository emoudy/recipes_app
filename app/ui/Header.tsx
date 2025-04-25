"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from '@/lib/variables/links';
import LinkStyled from "./elements/LinkStyled";
// import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
// import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [displayLinks, setDisplayLinks] = useState(links);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredLinks = links.filter((link) => link.href !== pathname);

  // const toggleTheme = () => {
  //   setIsDarkMode((prev) => !prev);
  //   document.documentElement.setAttribute("data-theme", isDarkMode ? "light" : "dark");
  // };

  return (
    <header className="header flex justify-between items-center px-5 py-3 border-b-2 border-[var(--border-light)] bg-[var(--background-light)] text-[var(--foreground-light)] dark:bg-[var(--background-dark)] dark:text-[var(--foreground-dark)] dark:border-[var(--border-dark)]">
      {/* Navigation Button */}
      <nav className="header-nav flex gap-4">
        {filteredLinks.map((link) => {
          return (
            <LinkStyled
              key={link.name}
              type="primary"
              href={link.href}
              title={link.name}
              icon={<link.icon className="w-6 h-6" />}
            />
          );
        })}
      </nav>

      {/* Right Side Icons */}
      <div className="header-icons flex items-center gap-4">
        {/* Theme Toggle */}
        {/* <button onClick={toggleTheme} className="theme-toggle bg-none border-none cursor-pointer">
          {isDarkMode ? <SunIcon className="w-6" /> : <MoonIcon className="w-6" />}
        </button> */}

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="profile-icon bg-transparent border-none cursor-pointer">
            <span className="avatar inline-block w-8 h-8 rounded-full bg-[var(--accent-light)] text-[var(--background-light)] font-bold text-center leading-8 dark:bg-[var(--accent-dark)] dark:text-[var(--background-dark)]">EL</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown absolute right-0 top-10 bg-[var(--background-light)] border border-[var(--border-light)] rounded-lg shadow-md p-2.5 dark:bg-[var(--background-dark)] dark:border-[var(--border-dark)]">
              <button className="dropdown-item bg-none border-none cursor-pointer p-2 w-full text-left text-[var(--foreground-light)] hover:bg-[var(--input-light)] dark:text-[var(--foreground-dark)] dark:hover:bg-[var(--input-dark)]">Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
