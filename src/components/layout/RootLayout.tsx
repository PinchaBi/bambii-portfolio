import { useEffect, useLayoutEffect, useRef } from "react";

import { Outlet, useLocation } from "react-router-dom";

import { colors } from "@/theme/theme";
import { Stack } from "@mui/material";
import { ReactLenis, useLenis } from "lenis/react";
import { Toaster } from "sonner";

import RevealCount from "../ui/RevealCount";
import NavBar from "./NavBar";

function ScrollReset() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    if (!lenis) {
      window.scrollTo(0, 0);
      return;
    }

    lenis.stop();
    lenis.scrollTo(0, { immediate: true, force: true });
    requestAnimationFrame(() => lenis.start());
  }, [pathname, lenis]);

  return null;
}

export default function RootLayout() {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <Stack sx={{ width: "100vw", bgcolor: colors.bambiiGray }}>
        <Toaster position="top-center" richColors />
        <ScrollReset />
        <NavBar />
        <Outlet />
        <RevealCount />
      </Stack>
    </ReactLenis>
  );
}
