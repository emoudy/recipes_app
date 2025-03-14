"use client";
import { useState, useEffect } from "react";

interface ChatSession {
  chatSessionId: number;
  name: string;
}

export default function ChatSideNav({ userId }: { userId: number | null }) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    if (!userId) return; // ✅ Don't fetch if no user is logged in

    async function fetchSessions() {
      try {
        const res = await fetch(`/api/chatSessions?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch chat sessions");
        const data = await res.json();
        setChatSessions(data);
      } catch (error) {
        console.error("Error fetching chat sessions:", error);
      }
    }

    fetchSessions();
  }, [userId]);

  console.log("HELLO", chatSessions);

  return (
    <aside className="chat-sidebar w-[260px] bg-[var(--sidebar-light)] text-[var(--foreground-light)] p-4 transition-width duration-300 ease-in-out dark:bg-[var(--sidebar-dark)] dark:text-[var(--foreground-dark)]">

      {/* Chat Sessions */}
        <div className="h-screen bg-red">
          <h3 className="text-lg font-semibold">Chat Sessions</h3>
          <ul className="chat-sessions list-none p-0">
            {chatSessions?.map((session) => (
              <li key={session.chatSessionId} className="p-2.5 cursor-pointer rounded-md transition-colors duration-300 hover:bg-[var(--accent-light)] hover:text-[var(--background-light)] dark:hover:bg-[var(--accent-dark)] dark:hover:text-[var(--background-dark)] p-2">
                {session.name}
              </li>
            ))}
          </ul>
        </div>
    </aside>
  );
}