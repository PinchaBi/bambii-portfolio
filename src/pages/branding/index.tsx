import { Box, Stack } from "@mui/material";

import InstragramView from "@/features/branding/components/InstragramView";

export default function BrandingPage() {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <Box sx={{ position: "relative", top: 0, zIndex: 1 }}>
        <InstragramView />
      </Box>
      <Box sx={{ position: "relative", top: 0, zIndex: 2 }}></Box>
    </Stack>
  );
}
