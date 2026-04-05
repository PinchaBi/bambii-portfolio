import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import useBreakpoint from "@/hooks/useBreakpoint";

import Wrapper from "@/components/layout/Wrapper";

import { stackTitleList } from "../../constants";
import type { StackType } from "../../constants";
import StackCard from "../StackCard";

const StackView = () => {
  const [selectedStack, setSelectedStack] = useState<StackType>("social");
  const { isMobile, isDesktop } = useBreakpoint();

  // ── Category selector ──
  const categorySelector = (
    <Stack
      direction={isDesktop ? "column" : "row"}
      spacing={{ xs: 2.5, sm: 3, lg: 1.25 }}
      width={isDesktop ? 130 : isMobile ? "100%" : "auto"}
      justifyContent="center"
      alignSelf="center"
    >
      {stackTitleList.map((cardTitle, index) => (
        <Typography
          key={index}
          variant="h4"
          fontSize={16}
          onClick={() => setSelectedStack(cardTitle.value)}
          sx={{
            color:
              selectedStack === cardTitle.value ? "black" : "colors.darkGray3",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {cardTitle.name}
        </Typography>
      ))}
    </Stack>
  );

  return (
    <Wrapper
      alignItems="center"
      justifyContent="center"
      sx={{
        px: { xs: 3, sm: "60px", lg: 0 },
        py: { xs: 3, sm: "60px", lg: 0 },
        pb: { lg: "100px" },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <Stack
          spacing={{ xs: 1, lg: 5, sm: 7 }}
          alignItems={isMobile ? "flex-start" : "center"}
        >
          {/* Main content: text + cards */}
          <Stack
            spacing={{ xs: 1.5, sm: 5 }}
            direction={isMobile ? "column" : "row"}
            alignItems="center"
          >
            {/* Text */}
            <Stack
              width={isMobile ? "100%" : isDesktop ? 395 : "40%"}
              spacing={{ xs: 1, sm: 3.75 }}
              flexShrink={0}
            >
              <Stack spacing={0.625}>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                  variant="subtitle2"
                  color="colors.darkGray3"
                  fontSize={{ xs: 11, sm: "inherit" }}
                >
                  2024 • MOOOOD • Freelance Designer
                </Typography>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                  variant="h2"
                  fontSize={{ xs: 20, sm: 26, lg: 32 }}
                >
                  From first opportunity to building visual consistency
                </Typography>
              </Stack>
              <Typography
                component={motion.div}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                variant="caption"
                lineHeight={{ xs: "13px", sm: "16px" }}
                fontSize={{ xs: 10, sm: 12, lg: "inherit" }}
              >
                What began as a small freelance referral became my first real
                step into branding. At the time, I was still in university and
                learning what a cohesive brand identity truly meant. <br />
                <br />
                Through refining artwork, aligning visuals, and iterating
                repeatedly, I learned how to create a connected visual system
                rather than isolated designs. MOOOOD shaped my foundation in
                branding and visual consistency.
              </Typography>
            </Stack>

            {/* Card stack */}
            <Box
              width={isMobile ? "100%" : isDesktop ? 460 : "50%"}
              height={{
                xs: "min(230px, 32dvh)",
                sm: "min(350px, 40dvh)",
                lg: "min(430px, 50dvh)",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StackCard stack={selectedStack} />
            </Box>

            {isDesktop && categorySelector}
          </Stack>

          {/* Mobile/Tablet: category selector below */}
          {!isDesktop && (
            <Stack
              direction="row"
              width="100%"
              justifyContent="center"
              sx={{ pl: isMobile ? 0 : "40%" }}
            >
              {categorySelector}
            </Stack>
          )}
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export default StackView;
