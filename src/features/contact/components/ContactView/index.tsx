import { useCallback, useRef, useState } from "react";

import useRevealStore from "@/stores/revealStore";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import DotGrid from "@/components/animate-ui/DotGrid";
import Footer from "@/components/layout/Footer";
import Wrapper from "@/components/layout/Wrapper";

import ContactBox from "../ContactBox";
import ContactTitle from "../ContactTitle";

const CONTACT_BOX_DEFAULT = { x: 770, y: 200 };

const ContactView = () => {
  const isRevealed = useRevealStore((state) => state.isRevealed);
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:599px)");
  const isShortScreen = useMediaQuery("(max-height:500px)");
  const isMediumShort = useMediaQuery("(max-height:700px)");
  const isCompactLayout = isShortScreen || (isMediumShort && !isMobile);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [boxOffset, setBoxOffset] = useState({ x: 0, y: 0 });
  const [isHoveringBox, setIsHoveringBox] = useState(false);
  const [isCursorInView, setIsCursorInView] = useState(false);

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !isRevealed || isHoveringBox || !wrapperRef.current)
        return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      setBoxOffset({
        x: (cursorX - CONTACT_BOX_DEFAULT.x - 250) * 0.15,
        y: (cursorY - CONTACT_BOX_DEFAULT.y - 200) * 0.15,
      });
    },
    [isDesktop, isRevealed, isHoveringBox],
  );

  const handleMouseEnter = useCallback(() => {
    if (isRevealed) setIsCursorInView(true);
  }, [isRevealed]);

  const handleMouseLeave = useCallback(() => {
    setIsCursorInView(false);
    setBoxOffset({ x: 0, y: 0 });
  }, []);

  const handleBoxHover = useCallback((hovering: boolean) => {
    setIsHoveringBox(hovering);
  }, []);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        bgcolor: "colors.bambiiBlack",
        height: isDesktop ? "100dvh" : "auto",
        minHeight: "100dvh",
      }}
    >
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <DotGrid
              dotSize={5}
              gap={15}
              baseColor="#381f23"
              activeColor="#f13a7d"
              proximity={120}
              shockRadius={250}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isDesktop ? (
        /* ─── Desktop (lg+): flexbox title + form with parallax ─── */
        <Stack
          direction="row"
          sx={{
            zIndex: 1,
            width: "100%",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            px: "max(80px, calc((100vw - 1280px) / 2 + 80px))",
            gap: "8%",
          }}
        >
          <ContactTitle
            sx={{
              width: "30%",
              maxWidth: 400,
              fontSize: "clamp(40px, 4vw, 60px)",
              flexShrink: 0,
            }}
          />
          <ContactBox
            offset={isRevealed && isCursorInView ? boxOffset : { x: 0, y: 0 }}
            onHoverChange={handleBoxHover}
            sx={{
              width: "50%",
              maxWidth: 550,
              flexShrink: 0,
            }}
          />
        </Stack>
      ) : (
        /* ─── Tablet & Mobile: vertically stacked, centered ─── */
        <Stack
          direction={isCompactLayout ? "row" : "column"}
          sx={{
            zIndex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            pt: isCompactLayout ? "max(50px, 12dvh)" : { xs: 8, sm: 6 },
            pb: isCompactLayout ? 1 : { xs: 1, sm: 6 },
            px: isCompactLayout ? 3 : { xs: 2, sm: 4, md: 6 },
            gap: isCompactLayout ? 3 : 0,
            flexGrow: 1,
          }}
        >
          <ContactTitle
            alwaysActive={!isDesktop}
            sx={{
              fontSize: isCompactLayout
                ? isShortScreen
                  ? "clamp(18px, 3vw, 28px)"
                  : "clamp(24px, 4vw, 36px)"
                : isMobile
                  ? "clamp(20px, 6vw, 32px)"
                  : 48,
              textAlign: isCompactLayout ? "left" : "center",
              alignSelf: "center",
              width: isCompactLayout ? "30%" : "100%",
              mb: isCompactLayout ? 0 : { xs: 1.5, sm: 4 },
              flexShrink: 0,
            }}
          />
          <ContactBox
            onHoverChange={handleBoxHover}
            stackedContactInfo={isMobile}
            compact={isShortScreen}
            sx={{
              width: "100%",
              maxWidth: isCompactLayout ? "65%" : isMobile ? "100%" : 600,
            }}
          />
        </Stack>
      )}

      <Box
        sx={{
          display: "block",
          pb: isCompactLayout ? 1 : { xs: 1.5, sm: 3 },
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          position: isDesktop ? "absolute" : "relative",
          px: isCompactLayout ? 2 : { xs: 3, sm: 6 },
          mt: isDesktop ? 0 : isCompactLayout ? 0.5 : { xs: 1, sm: 4 },
        }}
      >
        <Footer />
      </Box>
    </Wrapper>
  );
};

export default ContactView;
