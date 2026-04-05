import { useRef } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { motion, useInView } from "motion/react";

import useBreakpoint from "@/hooks/useBreakpoint";

import Footer from "@/components/layout/Footer";
import Wrapper from "@/components/layout/Wrapper";

import { kiyoList } from "../../constants";

type ImageBoxProps = {
  image?: string;
  delay?: number;
  isInView?: boolean;
  size?: number;
};

const ImageBox = ({
  image,
  delay = 0,
  isInView = false,
  size = 100,
}: ImageBoxProps) => {
  if (!image) return <Box width={size} height={size} />;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      width={size}
      height={size}
      overflow="hidden"
    >
      <Box
        component="img"
        src={image}
        sx={{ width: size, height: size, objectFit: "cover" }}
      />
    </Box>
  );
};

const IMG_SIZES = { mobile: 70, tablet: 80, desktop: 100 } as const;

const KiyoView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { isMobile, isDesktop, tier } = useBreakpoint();

  const imgSize = IMG_SIZES[tier];

  // ── Shared text content (mobile only) ──
  const textContent = (
    <>
      <Stack>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          viewport={{ amount: 0.3 }}
          variant="subtitle2"
          color="colors.darkGray3"
          fontSize={{ xs: 10, sm: 11, lg: "inherit" }}
        >
          2025 • KIYO • Brand & Visual Lead
        </Typography>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          viewport={{ amount: 0.3 }}
          variant="h2"
          fontSize={{ xs: 24, sm: 28, lg: 32 }}
        >
          From concept to launch execution
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
        Kiyo was developed from the ground up. I was involved in defining the
        brand identity, building the CI system, planning marketing direction,
        and producing launch materials. <br />
        <br />
        From visual storytelling to creating virtual product models, the project
        required aligning strategy and execution into a cohesive launch.
      </Typography>
    </>
  );

  return (
    <Wrapper
      alignItems="center"
      justifyContent={isMobile ? "flex-end" : "center"}
      bgcolor="colors.bambiiGray"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
        style={{ width: isDesktop ? "auto" : "100%" }}
      >
        {isMobile ? (
          <Stack width="100%" spacing={2.5} sx={{ px: 3, pb: 8 }}>
            {textContent}
          </Stack>
        ) : (
          <Stack
            width={{ sm: "100%", lg: 1100 }}
            height={{ lg: "min(600px, 70dvh)" }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: { sm: 3, md: 4, lg: 0 } }}
          >
            <Stack
              width={{ sm: "35%", lg: 340 }}
              height={{ lg: "100%" }}
              spacing={{ sm: 3, md: 5, lg: 7.5 }}
              alignItems={{ lg: "flex-end" }}
              justifyContent="flex-end"
            >
              <Stack width={{ lg: 300, sm: "100%" }}>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  viewport={{ amount: 0.3 }}
                  variant="subtitle2"
                  color="colors.darkGray3"
                  fontSize={{ sm: 11, lg: "inherit" }}
                >
                  2025 • KIYO • Brand & Visual Lead
                </Typography>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  viewport={{ amount: 0.3 }}
                  variant="h2"
                  fontSize={{ sm: 22, lg: 32 }}
                >
                  From concept to launch execution
                </Typography>
              </Stack>
              <Stack ref={containerRef}>
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <Stack key={rowIndex} direction="row" position="relative">
                    {kiyoList[rowIndex + 1].map((kiyo) => (
                      <ImageBox
                        key={kiyo.id}
                        image={kiyo.image}
                        delay={kiyo.id * 0.125}
                        isInView={isInView}
                        size={imgSize}
                      />
                    ))}
                  </Stack>
                ))}
              </Stack>
            </Stack>
            <Stack
              height={{ lg: "100%" }}
              justifyContent="flex-end"
              width={{ sm: "30%", lg: 340 }}
            >
              <Typography
                component={motion.div}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                viewport={{ amount: 0.3 }}
                width="100%"
                variant="caption"
                lineHeight="16px"
                fontSize={{ sm: 12, lg: "inherit" }}
              >
                Kiyo was developed from the ground up. I was involved in
                defining the brand identity, building the CI system, planning
                marketing direction, and producing launch materials. <br />
                <br />
                From visual storytelling to creating virtual product models, the
                project required aligning strategy and execution into a cohesive
                launch.
              </Typography>
            </Stack>
          </Stack>
        )}
      </motion.div>

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

export default KiyoView;
