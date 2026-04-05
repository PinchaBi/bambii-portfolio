import { Box, Stack, Typography } from "@mui/material";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useLoading } from "@/hooks/useLoading";

import PageLoading from "@/components/ui/PageLoading";

import CUAndTSLView from "@/features/branding/components/CUAndTSLView";
import MoodView from "@/features/branding/components/MoodView";

export default function BrandingPage() {
  const { isLoading, handleLoaded } = useLoading();
  const { isMobile, isDesktop } = useBreakpoint();

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

      <Box
        sx={{
          position: "sticky",
          top: isMobile ? "-50dvh" : isDesktop ? -300 : "-45dvh",
          zIndex: 1,
        }}
      >
        <MoodView />
      </Box>

      {/* Scroll budget — lets StackView be visible before CUAndTSLView covers it */}
      <Box sx={{ height: { xs: "60dvh", sm: "70dvh" } }} />

      <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
        <CUAndTSLView onLoaded={handleLoaded} />
      </Box>
    </Stack>
  );
}
