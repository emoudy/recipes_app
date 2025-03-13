"use client";
import { useState } from "react";
import Header from '@/components/Header';
import ChatSideNav from './components/ChatSideNav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(true);

  return (
    <div>
      <Header />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        {isSideNavOpen && (
          <div className="w-full bg-gray-100 flex-none md:w-64">
            <ChatSideNav />
          </div>
        )}
        {/* Toggle Button */}
        <button onClick={() => setIsSideNavOpen(!isSideNavOpen)} className="h-auto self-start toggle-btn cursor-pointer bg-none border-none text-[20px] mb-3">
          {isSideNavOpen ? "➖" : "➕"}
        </button>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </div>
  );
}