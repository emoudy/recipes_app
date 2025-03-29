import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ChatService from "../actions/chatService";

export function useChatSessions() {
  return useQuery({
    queryKey: ["chat-sessions"], // Unique key for caching
    queryFn: ChatService.fetchChatSessions,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useCreateChatSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const res = await ChatService.createChatSession(name);
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
      ChatService.deleteChatSession(id);
      return "ok"
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-sessions"] });
    },
  });
}