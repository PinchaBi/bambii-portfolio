import { useCallback, useRef, useState } from "react";

import useRevealStore from "@/stores/revealStore";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import DotGrid from "@/components/animate-ui/DotGrid";
import Footer from "@/components/layout/Footer";
import Wrapper from "@/components/layout/Wrapper";

import ContactBox from "../ContactBox";
import ContactTitle from "../ContactTitle";

const CONTACT_BOX_DEFAULT = { x: 770, y: 200 };

const ContactView = () => {
  const isRevealed = useRevealStore((state) => state.isRevealed);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [boxOffset, setBoxOffset] = useState({ x: 0, y: 0 });
  const [isHoveringBox, setIsHoveringBox] = useState(false);
  const [isCursorInView, setIsCursorInView] = useState(false);

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isRevealed || isHoveringBox || !wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      setBoxOffset({
        x: (cursorX - CONTACT_BOX_DEFAULT.x - 250) * 0.15,
        y: (cursorY - CONTACT_BOX_DEFAULT.y - 200) * 0.15,
      });
    },
    [isRevealed, isHoveringBox],
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

      <ContactTitle />
      <ContactBox
        offset={isRevealed && isCursorInView ? boxOffset : { x: 0, y: 0 }}
        onHoverChange={handleBoxHover}
        sx={{
          zIndex: 1,
        }}
      />

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
    </Wrapper>
  );
};

export default ContactView;
