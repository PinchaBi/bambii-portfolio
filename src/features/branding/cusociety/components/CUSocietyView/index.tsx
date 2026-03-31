import { useRef, useState } from "react";

import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { motion, useInView } from "motion/react";

import Wrapper from "@/components/layout/Wrapper";

import { cusocietyList } from "../../constants";
import type { CUSocietyItem } from "../../constants";

const MotionImg = motion.create("img" as const);

type CUSocietyImageProps = CUSocietyItem & {
  index: number;
  isInView: boolean;
  scale: number;
};

const CUSocietyImage = ({
  image,
  size,
  x,
  y,
  index,
  isInView,
  scale,
}: CUSocietyImageProps) => {
  const [hasEntered, setHasEntered] = useState(false);

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
        top: y * scale,
        left: x * scale,
        width: size * scale,
        height: size * scale,
        zIndex: index,
        borderRadius: 2.5,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );
};

const CUSocietyView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:599px)");
  const isSmallTablet = useMediaQuery("(max-width:840px)");

  const imgScale = isMobile ? 0.5 : isSmallTablet ? 0.65 : isDesktop ? 1 : 0.85;
  const containerSize = isMobile
    ? "min(250px, 45dvh)"
    : isSmallTablet
      ? "min(350px, 50dvh)"
      : isDesktop
        ? "min(600px, 65dvh)"
        : "min(480px, 55dvh)";

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      bgcolor="black"
      alignItems="center"
      justifyContent={isMobile || isSmallTablet ? "stretch" : "center"}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
        style={{
          width: "100%",
          flex: isMobile || isSmallTablet ? 1 : undefined,
          display: isMobile || isSmallTablet ? "flex" : undefined,
          flexDirection: isMobile || isSmallTablet ? "column" : undefined,
        }}
      >
        <Stack
          width="100%"
          flex={isDesktop ? undefined : 1}
          direction={isDesktop ? "row" : "column"}
          alignItems={isMobile ? "center" : isDesktop ? "center" : "flex-start"}
          justifyContent={isDesktop ? "center" : "space-between"}
          gap={isDesktop ? 25 : 0}
          sx={{
            px: isMobile ? 3 : isDesktop ? 0 : 6,
            pt: isMobile ? "max(40px, 8dvh)" : isSmallTablet ? "max(30px, 5dvh)" : 0,
          }}
        >
          <Box
            ref={containerRef}
            width={containerSize}
            height={containerSize}
            position="relative"
            flexShrink={0}
            sx={{
              ml: isDesktop ? 0 : isMobile ? -5 : isSmallTablet ? 2 : 8,
            }}
          >
            {cusocietyList.map((item, index) => (
              <CUSocietyImage
                key={index}
                {...item}
                index={index}
                isInView={isInView}
                scale={imgScale}
              />
            ))}
          </Box>
          <Stack
            width={isDesktop ? 395 : "100%"}
            spacing={isMobile ? 1.5 : 3.75}
            color="white"
            sx={{
              mt: isDesktop ? 0 : 0,
              pb: isMobile ? 5 : isDesktop ? 0 : isSmallTablet ? 12 : 1,
            }}
          >
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
                fontSize={isMobile ? 20 : 32}
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
              fontSize={isMobile ? 11 : undefined}
            >
              Cu.society was built from scratch as an apparel brand. I led the
              brand identity, designed the products, planned the marketing
              direction, and created launch content. <br />
              <br />
              Within the first month, the brand generated 130,000 THB in
              revenue. This experience showed me how design, strategy, and
              execution work together to drive real business results.
            </Typography>
          </Stack>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export default CUSocietyView;
