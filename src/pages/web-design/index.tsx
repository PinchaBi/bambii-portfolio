import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { Box, keyframes, Stack, Typography } from "@mui/material";
import { ArrowRight } from "lucide-react";

import { useLoading } from "@/hooks/useLoading";

import Footer from "@/components/layout/Footer";
import PageLoading from "@/components/ui/PageLoading";

import WebDesignDetail from "@/features/web-design/components/WebDesignDetail";
import WebDesignView from "@/features/web-design/components/WebDesignView";

const blinkEffect = keyframes`
  0% { opacity: 1}
  50% { opacity: 0.2}
  100% { opacity: 1}
`;

const moveLeftRightEffect = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

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
          <Stack
            spacing={2}
            width="100%"
            height="15vh"
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
            color="colors.bambiiPink"
          >
            {/* scroll title */}
            <Typography
              fontSize={20}
              sx={{
                height: 24,
                alignItems: "center",
                display: { xs: "none", sm: "flex" },
                animation: `${blinkEffect} 2s infinite ease-in-out`,
              }}
            >
              Scroll to explore selected web experiences
            </Typography>
            <Typography
              fontSize={20}
              sx={{
                height: 20,
                alignItems: "center",
                display: { xs: "flex", sm: "none" },
                animation: `${blinkEffect} 2s infinite ease-in-out`,
              }}
            >
              Scroll to explore
            </Typography>

            {/* web design list */}
            <Box
              sx={{
                width: { xs: 20, sm: 24 },
                height: { xs: 20, sm: 24 },
                animation: `${moveLeftRightEffect} 2s infinite ease-in-out`,
              }}
            >
              <ArrowRight
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Stack>
          <WebDesignView />
          <Box height="10vh" display="flex" position="relative">
            <Typography
              bottom={0}
              variant="h2"
              width="100vw"
              position="absolute"
              px={{ xs: 3, sm: 6 }}
              fontSize={{ xs: 36, sm: 64 }}
            >
              WEB DESIGN
            </Typography>
          </Box>
          <Box
            pb={3}
            left={0}
            right={0}
            bottom={0}
            zIndex={0}
            position="absolute"
            px={{ xs: 3, sm: 6 }}
          >
            <Footer divider />
          </Box>
        </>
      )}
    </Stack>
  );
}
