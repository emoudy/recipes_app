const ChatSession = {
  fetchChatSessions: async () => {
    const res = await fetch(`/api/chatsessions`);
    if (!res.ok) throw new Error("Failed to fetch chat sessions");
    return res.json();
  },
  fetchChatSession: async(chatSessionId: number) => {
    const res = await fetch(`/api/chatsessions?chatSessionId=${chatSessionId}`);
    if (!res.ok) throw new Error("Failed to fetch the chat session");
    return res.json();
  }
  // save: async (userId: number, chatData: object) => { ... },
  // delete: async (chatId: number) => { ... }
};

export default ChatSession;
