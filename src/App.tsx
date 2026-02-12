import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import useDisplayStore from "./stores/themeStore";

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
