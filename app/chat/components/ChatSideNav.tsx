"use client";

import { useChatSessions, useCreateChatSession, useDeleteChatSession } from "@/chat/hooks/useChatSessions";
import { ChatSessionInterface } from "@/lib/variables/interfaces";

export default function ChatSideNav() {
  const { data: chatSessions, error, isLoading } = useChatSessions();
  const createChatSession = useCreateChatSession();
  const deleteChatSession = useDeleteChatSession();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <aside className="chat-sidebar w-[260px] bg-[var(--sidebar-light)] text-[var(--foreground-light)] p-4 transition-width duration-300 ease-in-out dark:bg-[var(--sidebar-dark)] dark:text-[var(--foreground-dark)]">
        <div className="h-screen bg-red">
          <div className="flex flex-row">
            <h3 className="text-lg font-semibold">Chat Sessions</h3>
            <button onClick={() => createChatSession.mutate("New Chat Session")} className="h-auto self-start toggle-btn cursor-pointer bg-none border-none text-[20px] mb-3">
              {"➕"}
            </button>
          </div>
          <ul className="chat-sessions list-none p-0">
            {chatSessions?.map((session: ChatSessionInterface) => (
              <li key={session.id} className="p-2.5 cursor-pointer rounded-md transition-colors duration-300 hover:bg-[var(--accent-light)] hover:text-[var(--background-light)] dark:hover:bg-[var(--accent-dark)] dark:hover:text-[var(--background-dark)] p-2">
                <button onClick={() => deleteChatSession.mutate(session.id)} className="h-auto self-start toggle-btn cursor-pointer bg-none border-none text-[20px] mb-3">
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