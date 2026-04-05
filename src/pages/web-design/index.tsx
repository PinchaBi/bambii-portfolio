import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Box, keyframes, Stack, Typography, useMediaQuery } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { useLoading } from "@/hooks/useLoading";

import Footer from "@/components/layout/Footer";
import PageLoading from "@/components/ui/PageLoading";

import WebDesignOverlay from "@/features/web-design/components/WebDesignOverlay";
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
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("project");
  const isShortScreen = useMediaQuery("(max-height:500px)");

  // Tracks which hero to hide — persists through exit animation
  const [hiddenHeroId, setHiddenHeroId] = useState<string | null>(null);

  const { isLoading, handleLoaded, startLoading } = useLoading();

  useEffect(() => {
    startLoading();
    handleLoaded();
  }, [startLoading, handleLoaded]);

  // When a project is selected, mark its hero as hidden
  useEffect(() => {
    if (selectedId) setHiddenHeroId(selectedId);
  }, [selectedId]);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <>
      <Stack>
        <PageLoading isLoading={isLoading} title="WEB DESIGN" />
        <Stack
          spacing={isShortScreen ? 1 : 2}
          width="100%"
          height={isShortScreen ? "10vh" : "15vh"}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          color="colors.bambiiPink"
        >
          {/* scroll title */}
          <Typography
            fontSize={isShortScreen ? 12 : 20}
            sx={{
              height: isShortScreen ? 16 : 24,
              alignItems: "center",
              display: { xs: "none", sm: "flex" },
              animation: `${blinkEffect} 2s infinite ease-in-out`,
            }}
          >
            Scroll to explore selected web experiences
          </Typography>
          <Typography
            fontSize={isShortScreen ? 12 : 20}
            sx={{
              height: isShortScreen ? 16 : 20,
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
        <WebDesignView hiddenHeroId={hiddenHeroId} />
        <Box height={isShortScreen ? "5vh" : "10vh"} display="flex" position="relative">
          <Typography
            bottom={0}
            variant="h2"
            width="100vw"
            position="absolute"
            px={{ xs: 3, sm: 6 }}
            fontSize={isShortScreen ? 24 : { xs: 36, sm: 64 }}
          >
            WEB DESIGN
          </Typography>
        </Box>
        {!isShortScreen && (
          <Box
            pb={3}
            left={0}
            right={0}
            bottom={0}
            zIndex={0}
            position="absolute"
            px={{ xs: 3, sm: 6 }}
          >
            <Footer />
          </Box>
        )}
      </Stack>

      {/* Overlay */}
      <AnimatePresence onExitComplete={() => setHiddenHeroId(null)}>
        {selectedId && (
          <WebDesignOverlay key={selectedId} id={Number(selectedId)} />
        )}
      </AnimatePresence>
    </>
  );
}
