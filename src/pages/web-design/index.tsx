import { useEffect } from "react";

import { Stack, Typography } from "@mui/material";

import { useLoading } from "@/hooks/useLoading";

import PageLoading from "@/components/ui/PageLoading";

import WebDesignView from "@/features/web-design/components/WebDesignView";

export default function WebDesignPage() {
  const { isLoading, handleLoaded } = useLoading();

  // Signal loaded once the component mounts (no heavy assets to wait for)
  useEffect(() => {
    handleLoaded();
  }, [handleLoaded]);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <PageLoading isLoading={isLoading} title="WEB DESIGN" />
      <Typography
        variant="h2"
        height="25vh"
        paddingX={15}
        display="flex"
        alignItems="flex-end"
      >
        WEB DESIGN
      </Typography>
      <WebDesignView />
    </Stack>
  );
}
