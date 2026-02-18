import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import Wrapper from "@/components/layout/Wrapper";

import { stackTitleList } from "../../constants";
import type { StackType } from "../../constants";
import StackCard from "../StackCard";

const StackView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [selectedStack, setSelectedStack] = useState<StackType>("social");

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      height="70vh"
      alignItems="center"
      justifyContent="center"
      padding="0px 0px 100px 0px"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        <Stack spacing={5} direction="row" alignItems="center">
          <Stack width={395} spacing={3.75}>
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
                2024 • MOOOOD • Freelance Designer
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
                From first opportunity to building visual consistency
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
              What began as a small freelance referral became my first real step
              into branding. At the time, I was still in university and learning
              what a cohesive brand identity truly meant. <br />
              <br />
              Through refining artwork, aligning visuals, and iterating
              repeatedly, I learned how to create a connected visual system
              rather than isolated designs. MOOOOD shaped my foundation in
              branding and visual consistency.
            </Typography>
          </Stack>

          <Box
            width={460}
            height={430}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StackCard stack={selectedStack} />
          </Box>

          <Stack width={130} spacing={1.25}>
            {stackTitleList.map((cardTitle, index) => {
              const { name, value } = cardTitle;

              return (
                <Typography
                  key={index}
                  variant="h4"
                  fontSize={16}
                  onClick={() => setSelectedStack(value)}
                  sx={{
                    color:
                      selectedStack === value ? "black" : "colors.darkGray3",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {name}
                </Typography>
              );
            })}
          </Stack>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export default StackView;
