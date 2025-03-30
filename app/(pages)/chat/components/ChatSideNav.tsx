"use client";

import { useChatSessions, useCreateChatSession, useDeleteChatSession } from "@/(pages)/chat/lib/hooks/useChatSessionHooks";
import { useChatSessionStore } from "@/lib/store/useChatSessionStore";
import { ChatSessionInterface } from "@/lib/variables/interfaces";
import { Suspense } from "react";

export default function ChatSideNav() {
  const { data: chatSessions, error, isLoading } = useChatSessions();
  const createChatSession = useCreateChatSession();
  const deleteChatSession = useDeleteChatSession();
  const { chatSessionId, setChatSessionId } = useChatSessionStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSelectSession = (id: number) => {
    setChatSessionId(id);
  };

  return (
    <aside className="chat-sidebar w-[260px] bg-[var(--sidebar-light)] text-[var(--foreground-light)] p-4 transition-width duration-300 ease-in-out dark:bg-[var(--sidebar-dark)] dark:text-[var(--foreground-dark)]">
        <div className="h-screen bg-red">
          <div className="flex flex-row">
            <button onClick={() => createChatSession.mutate("New Chat Session")} className="h-auto self-start toggle-btn cursor-pointer bg-none border-none text-[20px] mb-3">
              {"➕"}
            </button>
            <h3 className="text-lg font-semibold">Chat Sessions</h3>
          </div>
          <Suspense fallback={<div>Loading chat sessions...</div>}>
            <ul className="chat-sessions list-none p-0">
              {chatSessions?.map((chatSession: ChatSessionInterface) => (
                <li
                  key={chatSession.id}
                  className={`p-2.5 cursor-pointer rounded-md transition-colors duration-300 ${
                    chatSession.id === chatSessionId
                      ? 'bg-[var(--accent-light)] text-[var(--background-light)] dark:bg-[var(--accent-dark)] dark:text-[var(--background-dark)]'
                      : 'hover:bg-[var(--accent-light)] hover:text-[var(--background-light)] dark:hover:bg-[var(--accent-dark)] dark:hover:text-[var(--background-dark)]'
                  }`}
                >
                  <button onClick={() => deleteChatSession.mutate(chatSession.id)} className="h-auto self-start  cursor-pointer bg-none border-none text-[20px] mb-3">
                    {"-"}
                  </button>
                  <button onClick={() => handleSelectSession(chatSession.id)}>
                    {chatSession.name}
                  </button>
                </li>
              ))}
            </ul>
          </Suspense>
        </div>
    </aside>
  );
}