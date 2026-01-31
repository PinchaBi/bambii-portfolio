import NavBar from "./NavBar";
import { Stack } from "@mui/material";
import { colors } from "@/theme/theme";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack width="100vw" bgcolor={colors.bambiiGray}>
      <NavBar />
      <Outlet />
    </Stack>
  );
}
