import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

export function useCreateChatSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch("/api/chat-sessions", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to create chat session");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-sessions"] });
    },
  });
}

export function useDeleteChatSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/chat-sessions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete chat session");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-sessions"] });
    },
  });
}