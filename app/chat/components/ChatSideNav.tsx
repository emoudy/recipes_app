"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";

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
    async function fetchSessions() {
      const res = await fetch("/api/chatsessions");
      const data = await res.json();
      setChatSessions(data);
    }
    fetchSessions();
  }, []);

  return (
    <aside className={clsx(
      "chat-sidebar w-[260px] bg-[var(--sidebar-light)] text-[var(--foreground-light)] p-4 transition-width duration-300 ease-in-out dark:bg-[var(--sidebar-dark)] dark:text-[var(--foreground-dark)]",
      { "collapsed w-[60px]": !isOpen }
    )}>

      {/* Chat Sessions */}
      {isOpen && (
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
      )}
    </aside>
  );
}