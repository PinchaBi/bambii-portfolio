import { useEffect, useLayoutEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";

import { colors } from "@/theme/theme";
import { Stack } from "@mui/material";
import { Toaster } from "sonner";

import HomePage from "@/pages/home";

import RevealCount from "../ui/RevealCount";
import NavBar from "./NavBar";

export default function RootLayout() {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const location = useLocation();
  const isHome = location.pathname === "/";

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
    <Stack sx={{ width: "100vw", bgcolor: colors.bambiiGray }}>
      <Toaster position="top-center" richColors />
      <NavBar />

      {/* Home page — always mounted, hidden when on other pages */}
      <div style={{ display: isHome ? "contents" : "none" }}>
        <HomePage paused={!isHome} />
      </div>

      {/* Other pages — mount/unmount via router */}
      {!isHome && <Outlet />}

      <RevealCount />
    </Stack>
  );
}
