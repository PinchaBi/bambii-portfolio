import { Box, Stack, Typography } from "@mui/material";

import { useLoading } from "@/hooks/useLoading";

import PageLoading from "@/components/ui/PageLoading";

import CUAndTSLView from "@/features/branding/components/CUAndTSLView";
import MoodView from "@/features/branding/components/MoodView";

export default function BrandingPage() {
  const { isLoading, handleLoaded } = useLoading();

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <PageLoading isLoading={isLoading} title="BRANDING" />

      <Typography
        variant="h1"
        height="25vh"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        BRANDING
      </Typography>
      <Box sx={{ position: "sticky", top: -300, zIndex: 1 }}>
        <MoodView />
      </Box>
      <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
        <CUAndTSLView onLoaded={handleLoaded} />
      </Box>
    </Stack>
  );
}
