const ChatService = {
  /** Fetches ALL chat sessions */
  fetchChatSessions: async () => {  
    const res = await fetch(`/api/chat-sessions`, { 
      method: "GET", 
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Chat Sessions BEFORE:", res);

    if (!res.ok) throw new Error("Failed to fetch chat session");
    console.log("Chat Sessions:", res);
    return res.json();
  },

  /** Fetches ONE chat session */
  fetchChatSession: async(chatSessionId: number) => {
    const res = await fetch(`/api/chat-sessions?id=${chatSessionId}`);
    if (!res.ok) throw new Error("Failed to fetch the chat session");
    return res.json();
  },
  createChatSession: async (sessionName: string) => {
    console.log("Creating chat session with name:", sessionName);
    const res = await fetch(`/api/chat-sessions`, {
      method: "POST",
      credentials: "include",
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
