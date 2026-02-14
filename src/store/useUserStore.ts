import { create } from "zustand";
import { type User } from "@/types/api/auth.type";

interface UseUserStore {
   user: User | null;
   setUser: (data: User | null) => void;
   loading: boolean;
   setLoading: (loading: boolean) => void
}

const useUserStore = create<UseUserStore>((set) => ({
   user: null,
   setUser: (data) => set({ user: data }),
   loading: true,
   setLoading: (loading: boolean) => set({ loading, }),
}));

export default useUserStore;
