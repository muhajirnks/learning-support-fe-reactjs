import { create } from "zustand";

interface UseThemeStore {
   theme: 'light' | 'dark';
   setTheme: (data: 'light' | 'dark') => void;
}

const useThemeStore = create<UseThemeStore>((set) => ({
   theme: (localStorage.getItem("theme") as 'light' | 'dark') || "light",
   setTheme: (data) => set({ theme: data }),
}));

export default useThemeStore;
