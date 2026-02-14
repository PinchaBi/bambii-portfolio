import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

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
      sx={{
        height: "70vh",
      }}
    >
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        padding="0px 0px 100px 0px"
      >
        <Stack spacing={5} direction="row" alignItems="center">
          <Stack width={395} spacing={3.75}>
            <Stack spacing={0.625}>
              <Typography variant="subtitle2" color="colors.darkGray3">
                2024 • MOOOOD • Freelance Designer
              </Typography>
              <Typography variant="h2" fontSize={32}>
                From first opportunity to building visual consistency
              </Typography>
            </Stack>
            <Typography variant="caption" lineHeight="16px">
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
      </Stack>
    </Wrapper>
  );
};

export default StackView;
