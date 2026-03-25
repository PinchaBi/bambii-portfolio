import { useRef } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { motion, useInView } from "motion/react";

import Footer from "@/components/layout/Footer";
import Wrapper from "@/components/layout/Wrapper";

import { kiyoList } from "../../constants";

type ImageBoxProps = {
  image?: string;
  delay?: number;
  isInView?: boolean;
};

const ImageBox = ({ image, delay = 0, isInView = false }: ImageBoxProps) => {
  if (!image) return <Box width={100} height={100} />;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      width={100}
      height={100}
      overflow="hidden"
    >
      <Box
        component="img"
        src={image}
        sx={{ width: 100, height: 100, objectFit: "cover" }}
      />
    </Box>
  );
};

const KiyoView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      alignItems="center"
      justifyContent="center"
      bgcolor="colors.bambiiGray"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        <Stack
          width={1100}
          height={600}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            width={340}
            height="100%"
            spacing={7.5}
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Stack width={300}>
              <Typography
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ amount: 0.3 }}
                variant="subtitle2"
                color="colors.darkGray3"
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
                fontSize={32}
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
                        />
                      );
                    })}
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack height="100%" justifyContent="flex-end">
            <Typography
              component={motion.div}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              viewport={{ amount: 0.3 }}
              width={340}
              variant="caption"
              lineHeight="16px"
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
        </Stack>
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
