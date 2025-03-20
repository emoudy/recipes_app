"use client";
import { useState } from "react";
import { MessageInterface } from "@/lib/variables/interfaces";
import ChatInput from "./ChatInput";
import ButtonStyled from "@/components/elements/ButtonStyled";


export default function ChatDisplay() {
  const messages: MessageInterface[] = [];
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setInput("");
  };

  return (
    <div className="chat-main flex flex-col flex-grow bg-[var(--background-light)] text-[var(--foreground-light)] p-5 dark:bg-[var(--background-dark)] dark:text-[var(--foreground-dark)]">

      {/* Chat Messages */}
      <div className="chat-messages flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message bg-[var(--input-light)] text-[var(--foreground-light)] p-3 rounded-lg mb-2.5 max-w-[75%] dark:bg-[var(--input-dark)] dark:text-[var(--foreground-dark)] ${msg.userQuery ? "user-message" : ""}`}
          >
            <p className="font-bold">User: {msg.userQuery}</p>
            <p>AI: {msg.aiResponse}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="chat-input flex border-t-2 border-[var(--border-light)] p-2.5 dark:border-[var(--border-dark)]">
        <ChatInput value={input} onChange={(e) => setInput(e.target.value)} />
        <ButtonStyled type="primary" onClick={handleSend} title="Send" role="submit" />
      </div>
    </div>
  );
}
