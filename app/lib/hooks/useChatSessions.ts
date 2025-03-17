import { useQuery } from "@tanstack/react-query";

const fetchChatSessions = async () => {
  const res = await fetch("/api/chat-sessions", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch chat sessions");
  return res.json();
};

export function useChatSessions() {
  return useQuery({
    queryKey: ["chat-sessions"], // Unique key for caching
    queryFn: fetchChatSessions,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
