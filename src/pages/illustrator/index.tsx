import { useEffect } from "react";

import { Stack, Typography } from "@mui/material";

import { useLoading } from "@/hooks/useLoading";

import PageLoading from "@/components/ui/PageLoading";

import IllustratorView from "@/features/illustrator/components/IllustratorView";

export default function IllustratorPage() {
  const { isLoading, handleLoaded } = useLoading();

  // Signal loaded once the component mounts (no heavy assets to wait for)
  useEffect(() => {
    handleLoaded();
  }, [handleLoaded]);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <PageLoading isLoading={isLoading} title="ILLUSTRATOR" />
      <Typography
        variant="h2"
        height="25vh"
        paddingX={15}
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        ILLUSTRATION & PRODUCT DESIGN
      </Typography>
      <IllustratorView isLoading={isLoading} />
    </Stack>
  );
}
