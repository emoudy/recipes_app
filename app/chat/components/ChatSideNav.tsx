"use client";
import { useState, useEffect } from "react";
import ChatService from "@/chat/lib/chatService";
import { ChatSessionInterface } from "@/lib/variables/types";

export default function ChatSideNav() {
  const [chatSessions, setChatSessions] = useState<ChatSessionInterface[]>([]);
  const [trigger, setTrigger] = useState(0);

  const handleNewChatSession = async () => {
    try {
      await ChatService.createChatSession("New Chat Session");
      setTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to create chat session:", error);
    }
  };

  const handleDeleteChatSession = async (id: number) => {
    try {
      await ChatService.deleteChatSession(id);
      setTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to delete chat session:", error);
    }
  };

  useEffect(() => {
    ChatService.fetchChatSessions()
      .then(setChatSessions)
      .catch(console.error);
  }, [trigger]);

  return (
    <aside className="chat-sidebar w-[260px] bg-[var(--sidebar-light)] text-[var(--foreground-light)] p-4 transition-width duration-300 ease-in-out dark:bg-[var(--sidebar-dark)] dark:text-[var(--foreground-dark)]">
        <div className="h-screen bg-red">
          <div className="flex flex-row">
            <h3 className="text-lg font-semibold">Chat Sessions</h3>
            <button onClick={handleNewChatSession} className="h-auto self-start toggle-btn cursor-pointer bg-none border-none text-[20px] mb-3">
              {"➕"}
            </button>
          </div>
          <ul className="chat-sessions list-none p-0">
            {chatSessions?.map((session) => (
              <li key={session.id} className="p-2.5 cursor-pointer rounded-md transition-colors duration-300 hover:bg-[var(--accent-light)] hover:text-[var(--background-light)] dark:hover:bg-[var(--accent-dark)] dark:hover:text-[var(--background-dark)] p-2">
                <button onClick={() => handleDeleteChatSession(session.id)} className="h-auto self-start toggle-btn cursor-pointer bg-none border-none text-[20px] mb-3">
                  {"➕"}
                </button>
                {session.name}
              </li>
            ))}
          </ul>
        </div>
    </aside>
  );
}