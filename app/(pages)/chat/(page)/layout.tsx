"use client";
import { useState } from "react";
import ChatSideNav from '../components/ChatSideNav';
import Header from "@/app/ui/Header";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(true);

  return (
    <div>
      <Header />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        {isSideNavOpen && (
          <div className="chat-side-nav w-full bg-gray-100 flex-none md:w-64">
            <ChatSideNav />
          </div>
        )}
        {/* Toggle ChatSideNav */}
        <button onClick={() => setIsSideNavOpen(!isSideNavOpen)} className="h-auto self-start toggle-btn cursor-pointer bg-none border-none text-[20px] mb-3">
          {isSideNavOpen ? "➖" : "➕"}
        </button>
        <div className="chat-layout flex-grow md:overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}