import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatSessionState {
  chatSessionId: number | null;
  setChatSessionId: (id: number) => void;
  clearChatSessionId: () => void;
}

export const useChatSessionStore = create<ChatSessionState>()(
	devtools((set) => ({
		chatSessionId: null,
		setChatSessionId: (id) => set({ chatSessionId: id }),
		clearChatSessionId: () => set({ chatSessionId: null }),
	}))
);
