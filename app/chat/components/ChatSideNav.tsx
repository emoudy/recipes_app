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
    <aside className={clsx(
      "chat-sidebar",
      { "collapsed": !isOpen }
    )}>
      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
        {isOpen ? "➖" : "➕"}
      </button>

      {/* Chat Sessions */}
      {isOpen && (
        <div>
          <h3 className="text-lg font-semibold">Chat Sessions</h3>
          <ul className="chat-sessions">
            {chatSessions?.map((session) => (
              <li key={session.chatSessionId} className="p-2">
                {session.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}