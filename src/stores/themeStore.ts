import { create } from "zustand";
import type { PaletteMode, Theme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "@/theme/theme";

export type DisplayModeStore = {
  theme: Theme;
  mode: PaletteMode;
  toggleMode: () => void;
};

const useDisplayStore = create<DisplayModeStore>()((set) => ({
  mode: "light",
  theme: lightTheme,
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
      theme: state.mode === "light" ? darkTheme : lightTheme,
    })),
}));

export default useDisplayStore;
