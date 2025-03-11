"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import DarkModeToggle from "./DarkModeToggle";

export default function MainMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/chat");

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4">
      {/* Toggle Chat Sidebar */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? "📂" : "📁"}
      </button>

      {/* Page Toggle Button */}
      <Link href={isChatPage ? "/recipes" : "/chat"}>
        <button className="bg-blue-600 px-4 py-2 rounded">
          {isChatPage ? "Recipes" : "Chat"}
        </button>
      </Link>

      {/* Right Section: Dark Mode & Logout */}
      <div className="flex gap-4 items-center">
        <DarkModeToggle />
        <button onClick={() => signOut()} className="bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
