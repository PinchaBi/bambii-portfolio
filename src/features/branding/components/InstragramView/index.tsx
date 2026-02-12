import { Stack, Typography } from "@mui/material";

import Wrapper from "@/components/layout/Wrapper";

import InstragramCarousel from "../InstragramCarousel";

const InstragramView = () => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper>
      <Stack
        spacing={10}
        width="100%"
        height="100%"
        overflow="hidden"
        padding="150px 0px 50px 0px"
      >
        <Typography variant="h1" textAlign="center">
          BRANDING
        </Typography>
        <InstragramCarousel />
      </Stack>
    </Wrapper>
  );
};

export default InstragramView;
