import { Outlet } from "react-router-dom";

import { colors } from "@/theme/theme";
import { Stack } from "@mui/material";

import RevealCount from "../ui/RevealCount";
import NavBar from "./NavBar";

export default function RootLayout() {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack width="100vw" bgcolor={colors.bambiiGray}>
      <NavBar />
      <Outlet />
      <RevealCount />
    </Stack>
  );
}
