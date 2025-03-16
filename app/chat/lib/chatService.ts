const ChatService = {
  /** Fetches all chat sessions for a user without details */
  fetchChatSessions: async () => {
    const res = await fetch(`/api/chatsessions`);
    if (!res.ok) throw new Error("Failed to fetch chat sessions");
    return res.json();
  },
  /** Fetches a chat sessions with all details */
  fetchChatSession: async(chatSessionId: number) => {
    const res = await fetch(`/api/chatsessions?id=${chatSessionId}`);
    if (!res.ok) throw new Error("Failed to fetch the chat session");
    return res.json();
  },
  createChatSession: async (sessionName: string) => {
    const res = await fetch(`/api/chatsessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: sessionName }),
    });

    if (!res.ok) throw new Error("Failed to create chat session");
    return res.json();
  },
  updateChatSession: async (id: number, newName: string) => {
    const res = await fetch(`/api/chatsessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) throw new Error("Failed to update chat session");
    return res.json();
  },
  deleteChatSession: async (id: number) => {
    const res = await fetch(`/api/chatsessions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete chat session");
    return res.json();
  },

};

export default ChatService;
