import { useRef, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { motion, useInView } from "motion/react";

import Wrapper from "@/components/layout/Wrapper";

import { cusocietyList } from "../../constants";
import type { CUSocietyItem } from "../../constants";

const MotionImg = motion.create("img" as const);

type CUSocietyImageProps = CUSocietyItem & {
  index: number;
  isInView: boolean;
};

const CUSocietyImage = ({
  image,
  size,
  x,
  y,
  index,
  isInView,
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
        top: y,
        left: x,
        width: size,
        height: size,
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

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper bgcolor="black" alignItems="center" justifyContent="center">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        <Stack
          width={1200}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box ref={containerRef} width={600} height={600} position="relative">
            {cusocietyList.map((item, index) => (
              <CUSocietyImage
                key={index}
                {...item}
                index={index}
                isInView={isInView}
              />
            ))}
          </Box>
          <Stack width={395} spacing={3.75} color="white">
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
                fontSize={32}
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
