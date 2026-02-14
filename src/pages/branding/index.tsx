import { Box, Stack } from "@mui/material";

import CUAndTSLView from "@/features/branding/components/CUAndTSLView";
import MoodView from "@/features/branding/components/MoodView";

export default function BrandingPage() {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <Box sx={{ position: "sticky", top: -600, zIndex: 1 }}>
        <MoodView />
      </Box>
      <Box sx={{ position: "sticky", top: 0, zIndex: 2 }}>
        <CUAndTSLView />
      </Box>
    </Stack>
  );
}
