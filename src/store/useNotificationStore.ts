import { type MessagePayload } from "firebase/messaging";
import { create } from "zustand";

interface UseNotificationStore {
   countUnread: number;
   setCountUnread: (data: number) => void;
   incCountUnread: () => void;
   decCountUnread: () => void;
   latestMessage: MessagePayload | null;
   setLatestMessage: (data: MessagePayload | null) => void;
}

const useNotificationStore = create<UseNotificationStore>((set) => ({
   countUnread: 0,
   setCountUnread: (data) => set({ countUnread: data }),
   incCountUnread: () =>
      set((state) => {
         return { countUnread: state.countUnread + 1 };
      }),
   decCountUnread: () =>
      set((state) => {
         return { countUnread: state.countUnread ? state.countUnread - 1 : state.countUnread };
      }),
   latestMessage: null,
   setLatestMessage: (data) => set({ latestMessage: data }),
}));

export default useNotificationStore;
