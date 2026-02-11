import { create } from "zustand";

interface SnackbarState {
   snackbar: Snackbar | null;
   setSnackbar: (snackbar: Snackbar | null) => void;
}

interface Snackbar {
   message: string;
   type: "success" | "failure";
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
   snackbar: null,
   setSnackbar: (snackbar) => set({ snackbar }),
}));
