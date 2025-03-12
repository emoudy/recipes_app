"use client";
import { useState } from "react";
import {Message} from "@/lib/types";

export default function ChatDisplay() {
  const messages: Message[] = [];
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
	// TODO: something happens here
    setInput("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-800 text-white">
      {/* Chat Conversation */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-gray-700 rounded">
            <p className="font-bold">User: {msg.userInput}</p>
            <p>AI: {msg.aiInput}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 text-white rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSend} className="bg-blue-500 px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}