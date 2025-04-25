"use client";

import { useState } from "react";
import { MessageInterface } from "@/lib/variables/interfaces";
import ChatInput from "./ChatInput";
import ButtonStyled from "@/app/ui/elements/ButtonStyled";
import { useClaudeRecipe } from "../lib/hooks/useClaudeRecipe";
import { useCreateChatSession } from "../lib/hooks/useChatSessionHooks";
import { useChatSessionStore } from "@/lib/store/useChatSessionStore";

export default function ChatDisplay() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const { generateRecipe, loading } = useClaudeRecipe();
  const { mutateAsync: createChatSession } = useCreateChatSession();
  const { chatSessionId, setChatSessionId } = useChatSessionStore(); 

  const handleSend = async () => {
    if (!input.trim()) return;
    let activeSessionId = chatSessionId;

    // clear the input after sending
    const userPrompt = input;
    setInput('');
    
    // Show temporary user message while waiting for response
    const tempMsg: MessageInterface = {
      userQuery: userPrompt,
      aiResponse: '...',
    };
    setMessages((prev) => [...prev, tempMsg]);

    // if there is no chat session id, create a new one
    if (!chatSessionId) {
      const newChatSession = await createChatSession('New Chat Session');
      activeSessionId = newChatSession.id;
      setChatSessionId(newChatSession.id);
    }

    if (!activeSessionId) return;
    const recipe = await generateRecipe(userPrompt, activeSessionId);

    if (recipe) {
      // Replace '...' with real response
      setMessages((prev) => [
        ...prev.slice(0, -1), // remove placeholder
        { userQuery: userPrompt, aiResponse: recipe },
      ]);
    }
  };

  const displayMessages = 
    messages.map((msg, index) => (
      <div
        key={index}
        className={`message bg-[var(--input-light)] text-[var(--foreground-light)] p-3 rounded-lg mb-2.5 max-w-[75%] dark:bg-[var(--input-dark)] dark:text-[var(--foreground-dark)] ${msg.userQuery ? "user-message" : ""}`}
      >
        <p className="font-bold">User: {msg.userQuery}</p>
        <p>AI: {msg.aiResponse}</p>
      </div>
    ));

  const displayNoMessage =
    <div>
      <p className="font-bold">No messages</p>
      <p>Make a Query</p>
    </div>

  return (
    <div className="chat-main flex flex-col flex-grow bg-[var(--background-light)] text-[var(--foreground-light)] dark:bg-[var(--background-dark)] dark:text-[var(--foreground-dark)]">

      {/* Chat Messages */}
      <div className="chat-messages flex-grow overflow-y-auto p-4">
        {messages.length > 0 ? displayMessages : displayNoMessage}
      </div>

      {/* Chat Input */}
      <div className="chat-input flex border-[var(--border-light)] p-2.5 dark:border-[var(--border-dark)]">
        <ChatInput value={input} onChange={(e) => setInput(e.target.value)} />
        <ButtonStyled type="primary" onClick={handleSend} title="Send" role="submit" disabled={loading} />
      </div>
    </div>
  );
}
