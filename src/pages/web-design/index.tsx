import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";

import { useLoading } from "@/hooks/useLoading";

import PageLoading from "@/components/ui/PageLoading";

import WebDesignDetail from "@/features/web-design/components/WebDesignDetail";
import WebDesignView from "@/features/web-design/components/WebDesignView";

export default function WebDesignPage() {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const { webDesignId } = useParams();

  const { isLoading, handleLoaded, startLoading } = useLoading();

  useEffect(() => {
    startLoading();
    handleLoaded();
  }, [webDesignId, startLoading, handleLoaded]);

  useEffect(() => {
    handleLoaded();
  }, [handleLoaded]);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <PageLoading isLoading={isLoading} title="WEB DESIGN" />
      {webDesignId ? (
        <WebDesignDetail id={webDesignId} />
      ) : (
        <>
          <WebDesignView />
          <Box height="25vh" display="flex" position="relative">
            <Typography
              bottom={50}
              variant="h2"
              width="100vw"
              paddingX={12.5}
              position="absolute"
            >
              WEB DESIGN
            </Typography>
          </Box>
        </>
      )}
    </Stack>
  );
}
