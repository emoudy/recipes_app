const ChatService = {
  /** Fetches all chat sessions for a user */
  fetchChatSessions: async () => {
    console.log("ChatService");
  
    return fetch(`/api/chat-sessions`, { method: "GET", credentials: "include" })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Chat Sessions:", Array.isArray(data) ? data : []);
        return Array.isArray(data) ? data : []; // ✅ Ensure an array is returned
      })
      .catch(error => {
        console.error("❌ Fetch error:", error);
        return []; // ✅ Always return an array, never `undefined`
      });
  },
  /** Fetches a chat sessions with all details */
  fetchChatSession: async(chatSessionId: number) => {
    const res = await fetch(`/api/chat-sessions?id=${chatSessionId}`);
    if (!res.ok) throw new Error("Failed to fetch the chat session");
    return res.json();
  },
  createChatSession: async (sessionName: string) => {
    const res = await fetch(`/api/chat-sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: sessionName }),
    });

    if (!res.ok) throw new Error("Failed to create chat session");
    return res.json();
  },
  updateChatSession: async (id: number, newName: string) => {
    const res = await fetch(`/api/chat-sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) throw new Error("Failed to update chat session");
    return res.json();
  },
  deleteChatSession: async (id: number) => {
    const res = await fetch(`/api/chat-sessions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete chat session");
    return res.json();
  },
};

export default ChatService;
