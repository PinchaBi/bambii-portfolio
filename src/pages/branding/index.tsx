import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import { useLoading } from "@/hooks/useLoading";

import PageLoading from "@/components/ui/PageLoading";

import CUAndTSLView from "@/features/branding/components/CUAndTSLView";
import MoodView from "@/features/branding/components/MoodView";

export default function BrandingPage() {
  const { isLoading, handleLoaded } = useLoading();
  const isMobile = useMediaQuery("(max-width:599px)");
  const isSmallTablet = useMediaQuery("(min-width:600px) and (max-width:899px)");

  const stickyTop = isMobile ? "-50dvh" : isSmallTablet ? "-45dvh" : -300;

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <PageLoading isLoading={isLoading} title="BRANDING" />

      <Typography
        variant="h2"
        height="25dvh"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        BRANDING
      </Typography>
      <Box sx={{ position: "sticky", top: stickyTop, zIndex: 1 }}>
        <MoodView />
      </Box>
      {/* Scroll budget so StackView is visible before CUAndTSLView covers it */}
      <Box sx={{ height: isMobile ? "60dvh" : "70dvh" }} />
      <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
        <CUAndTSLView onLoaded={handleLoaded} />
      </Box>
    </Stack>
  );
}
