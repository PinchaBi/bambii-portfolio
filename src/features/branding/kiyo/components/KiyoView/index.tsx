import { useRef } from "react";

import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { motion, useInView } from "motion/react";

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

const KiyoView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:599px)");
  const isSmallScreen = useMediaQuery("(max-width:749px)");
  const isSmallTablet = useMediaQuery(
    "(min-width:600px) and (max-width:899px)",
  );

  // --------------------------- Variables ---------------------------
  //region Variables

  const imgSize = isMobile ? 70 : isSmallTablet ? 75 : isDesktop ? 100 : 85;

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      alignItems="center"
      justifyContent={isSmallScreen ? "flex-end" : "center"}
      bgcolor="colors.bambiiGray"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
        style={{ width: isDesktop ? "auto" : "100%" }}
      >
        {isSmallScreen ? (
          /* ── Small screen: vertical stack, no image grid ── */
          <Stack
            width="100%"
            spacing={2.5}
            sx={{ px: isMobile ? 3 : 4, pb: 8 }}
          >
            <Stack>
              <Typography
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ amount: 0.3 }}
                variant="subtitle2"
                color="colors.darkGray3"
                fontSize={isMobile ? 10 : 11}
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
                fontSize={isMobile ? 24 : 28}
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
              fontSize={isMobile ? 11 : 12}
            >
              Kiyo was developed from the ground up. I was involved in defining
              the brand identity, building the CI system, planning marketing
              direction, and producing launch materials. <br />
              <br />
              From visual storytelling to creating virtual product models, the
              project required aligning strategy and execution into a cohesive
              launch.
            </Typography>
          </Stack>
        ) : (
          /* ── Tablet / Desktop: row layout with image grid ── */
          <Stack
            width={isDesktop ? 1100 : "100%"}
            height={isDesktop ? "min(600px, 70dvh)" : "auto"}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: isDesktop ? 0 : isSmallTablet ? 3 : 4 }}
          >
            <Stack
              width={isDesktop ? 340 : "35%"}
              height={isDesktop ? "100%" : "auto"}
              spacing={isDesktop ? 7.5 : isSmallTablet ? 3 : 5}
              alignItems={isDesktop ? "flex-end" : "flex-start"}
              justifyContent="flex-end"
            >
              <Stack width={isDesktop ? 300 : "100%"}>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  viewport={{ amount: 0.3 }}
                  variant="subtitle2"
                  color="colors.darkGray3"
                  fontSize={isSmallTablet ? 11 : undefined}
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
                  fontSize={isSmallTablet ? 22 : 32}
                >
                  From concept to launch execution
                </Typography>
              </Stack>
              <Stack ref={containerRef}>
                {Array.from({ length: 3 }).map((_, rowIndex) => {
                  return (
                    <Stack key={rowIndex} direction="row" position="relative">
                      {kiyoList[rowIndex + 1].map((kiyo) => {
                        const { id, image } = kiyo;

                        return (
                          <ImageBox
                            key={id}
                            image={image}
                            delay={id * 0.125}
                            isInView={isInView}
                            size={imgSize}
                          />
                        );
                      })}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
            <Stack
              height={isDesktop ? "100%" : "auto"}
              justifyContent="flex-end"
              width={isDesktop ? 340 : "30%"}
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
                fontSize={isSmallTablet ? 12 : undefined}
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
