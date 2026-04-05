import { useRef, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { motion, useInView } from "motion/react";

import useBreakpoint from "@/hooks/useBreakpoint";

import Wrapper from "@/components/layout/Wrapper";

import { cusocietyList } from "../../constants";
import type { CUSocietyItem } from "../../constants";

const MotionImg = motion.create("img" as const);

type CUSocietyImageProps = CUSocietyItem & {
  index: number;
  isInView: boolean;
  containerWidth: number;
};

const CUSocietyImage = ({
  image,
  size,
  x,
  y,
  index,
  isInView,
  containerWidth,
}: CUSocietyImageProps) => {
  const [hasEntered, setHasEntered] = useState(false);
  const px = (pct: number) => (pct / 100) * containerWidth;

  return (
    <Box
      component={MotionImg}
      src={image}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: hasEntered
                ? undefined
                : {
                    duration: 0.6,
                    ease: [0.25, 1, 0.5, 1],
                    delay: index * 0.3,
                  },
            }
          : { opacity: 0, y: 30 }
      }
      onAnimationComplete={() => {
        if (isInView && !hasEntered) setHasEntered(true);
      }}
      whileHover={{ y: -8, scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      sx={{
        top: px(y),
        left: px(x),
        width: px(size),
        height: px(size),
        zIndex: index,
        borderRadius: 2.5,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );
};

// Container sizes per tier
const CONTAINER_SIZES = { mobile: 220, tablet: 350, desktop: 600 } as const;

const CUSocietyView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { isMobile, isTablet, isDesktop, tier } = useBreakpoint();

  const containerSize = CONTAINER_SIZES[tier];

  // ── Shared text content ──
  const textContent = (
    <>
      <Stack spacing={0.625}>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          viewport={{ amount: 0.3 }}
          variant="subtitle2"
          color="colors.darkGray3"
        >
          2024• Cu.society • Co-founder & Brand Designer
        </Typography>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          viewport={{ amount: 0.3 }}
          variant="h2"
          fontSize={{ xs: 20, sm: 26, lg: 32 }}
        >
          Turning design into a revenue-driving brand
        </Typography>
      </Stack>
      <Typography
        component={motion.div}
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        viewport={{ amount: 0.3 }}
        variant="caption"
        lineHeight="16px"
        fontSize={{ xs: 11, sm: 12, lg: "inherit" }}
      >
        Cu.society was built from scratch as an apparel brand. I led the brand
        identity, designed the products, planned the marketing direction, and
        created launch content. <br />
        <br />
        Within the first month, the brand generated 130,000 THB in revenue. This
        experience showed me how design, strategy, and execution work together
        to drive real business results.
      </Typography>
    </>
  );

  // ── Image collage ──
  const imageCollage = (
    <Box
      ref={containerRef}
      width={containerSize}
      height={containerSize}
      position="relative"
      flexShrink={0}
    >
      {cusocietyList.map((item, index) => (
        <CUSocietyImage
          key={index}
          {...item}
          index={index}
          isInView={isInView}
          containerWidth={containerSize}
        />
      ))}
    </Box>
  );

  return (
    <Wrapper bgcolor="black" alignItems="center">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
        style={{
          width: "100%",
          ...(isMobile || isTablet
            ? { flex: 1, display: "flex", flexDirection: "column" as const }
            : {}),
        }}
      >
        {isDesktop ? (
          /* ── Desktop: row layout, images left, text right ── */
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={25}
          >
            {imageCollage}
            <Stack width={395} spacing={3.75} color="white">
              {textContent}
            </Stack>
          </Stack>
        ) : (
          /* ── Mobile & Tablet: column layout with space-between ── */
          <Stack
            width="100%"
            flex={1}
            direction="column"
            justifyContent="space-between"
            sx={{
              px: { xs: 3, sm: 6 },
              pt: { xs: "max(40px, 8dvh)", sm: "max(30px, 5dvh)" },
              pb: { xs: 5, sm: 8 },
            }}
          >
            {/* Images at top */}
            <Box
              sx={{
                ml: { xs: -5, sm: 2 },
              }}
            >
              {imageCollage}
            </Box>

            {/* Text at bottom */}
            <Stack
              width="100%"
              spacing={1.5}
              color="white"
            >
              {textContent}
            </Stack>
          </Stack>
        )}
      </motion.div>
    </Wrapper>
  );
};

export default CUSocietyView;
