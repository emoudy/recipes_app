"use client";
import { useState, useEffect } from "react";

interface ChatSession {
  chatSessionId: number;
  name: string;
}

export default function ChatSideNav() {
  const [isOpen, setIsOpen] = useState(true);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    const savedState = localStorage.getItem("chatMenuOpen");
    if (savedState !== null) setIsOpen(JSON.parse(savedState));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMenuOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    async function fetchSessions() {
      const res = await fetch("/api/chatsessions");
      const data = await res.json();
      setChatSessions(data);
    }
    fetchSessions();
  }, []);

  return (
    <aside className={`h-full bg-gray-900 text-white p-4 transition-all ${isOpen ? "w-64" : "w-16"}`}>
      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4">
        {isOpen ? "➖" : "➕"}
      </button>

      {/* Chat Sessions */}
      {isOpen && (
        <div>
          <h3 className="text-lg font-semibold">Chat Sessions</h3>
          <ul>
            {chatSessions?.map((session) => (
              <li key={session.chatSessionId} className="mt-2 p-2 bg-gray-800 rounded">
                {session.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
