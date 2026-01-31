export {};

declare module "@mui/material/styles" {
  interface Palette {
    colors: typeof import("./theme").colors;
  }

  interface PaletteOptions {
    colors?: typeof import("./theme").colors;
  }
}
