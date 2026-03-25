import { useEffect, useLayoutEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";

import { colors } from "@/theme/theme";
import { Stack } from "@mui/material";
import { Toaster } from "sonner";

import RevealCount from "../ui/RevealCount";
import NavBar from "./NavBar";

export default function RootLayout() {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const location = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "instant" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack width="100vw" bgcolor={colors.bambiiGray}>
      <Toaster position="top-center" richColors />
      <NavBar />
      <Outlet />
      <RevealCount />
    </Stack>
  );
}
