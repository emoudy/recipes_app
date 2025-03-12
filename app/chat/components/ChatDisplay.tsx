"use client";
import { useState } from "react";
import { MessageInterface } from "@/lib/types";


export default function ChatDisplay() {
  const messages: MessageInterface[] = [];
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // TODO: Handle sending logic
    setInput("");
  };

  return (
    <div className="chat-main">
      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.userInput ? "user-message" : ""}`}
          >
            <p className="font-bold">User: {msg.userInput}</p>
            <p>AI: {msg.aiInput}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="button-primary" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
