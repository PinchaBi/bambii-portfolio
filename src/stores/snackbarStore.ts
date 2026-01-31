import { create } from "zustand";
import type { AlertColor } from "@mui/material";

type SnackbarState = {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  openSnackbar: (message: string, severity?: AlertColor) => void;
  closeSnackbar: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  isOpen: false,
  message: "",
  severity: "success",
  openSnackbar: (message, severity = "success") =>
    set({ isOpen: true, message, severity }),
  closeSnackbar: () => set({ isOpen: false }),
}));
