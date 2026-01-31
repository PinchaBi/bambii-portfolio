import router from "./routes";
import { RouterProvider } from "react-router-dom";
import useDisplayStore from "./stores/themeStore";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const theme = useDisplayStore((state) => state.theme);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
