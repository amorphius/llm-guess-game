import { create } from "zustand";

type Messages = Array<["user" | "assistant", string]>;

interface MessagesStore {
  messages: Messages;
  addMessage: (message: Messages[number]) => void;
  clearMessages: () => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  addMessage: (message: Messages[number]) =>
    set((state: any) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
