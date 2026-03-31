import { useState } from "react";

import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { motion } from "motion/react";

import Wrapper from "@/components/layout/Wrapper";

import { stackTitleList } from "../../constants";
import type { StackType } from "../../constants";
import StackCard from "../StackCard";

const StackView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [selectedStack, setSelectedStack] = useState<StackType>("social");
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:599px)");

  // --------------------------- Renders ---------------------------
  //region Renders

  // Category selector
  const categorySelector = (
    <Stack
      direction={isDesktop ? "column" : "row"}
      spacing={isMobile ? 2.5 : isDesktop ? 1.25 : 3}
      width={isMobile ? "100%" : isDesktop ? 130 : "auto"}
      justifyContent="center"
      alignSelf="center"
    >
      {stackTitleList.map((cardTitle, index) => {
        const { name, value } = cardTitle;

        return (
          <Typography
            key={index}
            variant="h4"
            fontSize={16}
            onClick={() => setSelectedStack(value)}
            sx={{
              color: selectedStack === value ? "black" : "colors.darkGray3",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {name}
          </Typography>
        );
      })}
    </Stack>
  );

  return (
    <Wrapper
      alignItems="center"
      justifyContent="center"
      padding={
        isMobile
          ? "24px 24px"
          : isDesktop
            ? "0px 0px 100px 0px"
            : "0px 60px 60px 60px"
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <Stack
          spacing={isMobile ? 1 : isDesktop ? 5 : 7}
          alignItems={isMobile ? "flex-start" : "center"}
        >
          {/* Main content: text + cards */}
          <Stack
            spacing={isMobile ? 1.5 : isDesktop ? 5 : 5}
            direction={isMobile ? "column" : "row"}
            alignItems="center"
          >
            <Stack
              width={isMobile ? "100%" : isDesktop ? 395 : "40%"}
              spacing={isMobile ? 1 : 3.75}
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
                  fontSize={isMobile ? 11 : undefined}
                >
                  2024 • MOOOOD • Freelance Designer
                </Typography>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                  variant="h2"
                  fontSize={isMobile ? 20 : isDesktop ? 32 : 26}
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
                lineHeight={isMobile ? "13px" : "16px"}
                fontSize={isMobile ? 10 : isDesktop ? undefined : 12}
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

            <Box
              width={isMobile ? "100%" : isDesktop ? 460 : "50%"}
              height={isMobile ? "min(230px, 32dvh)" : isDesktop ? "min(430px, 50dvh)" : "min(350px, 40dvh)"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StackCard stack={selectedStack} />
            </Box>

            {/* Desktop: category selector on the right */}
            {isDesktop && categorySelector}
          </Stack>

          {/* Tablet/Mobile: category selector below, aligned under the card area */}
          {!isDesktop && (
            <Stack
              direction="row"
              width="100%"
              justifyContent={isMobile ? "center" : "center"}
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
