import { useMediaQuery } from "@mui/material";

import Wrapper from "@/components/layout/Wrapper";

import InstragramCarousel from "../InstragramCarousel";

const InstragramView = () => {
  const isMobile = useMediaQuery("(max-width:599px)");

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      height={isMobile ? "50vh" : "65vh"}
      minHeight={isMobile ? "auto" : undefined}
      overflow="hidden"
      padding={isMobile ? "40px 0px 30px 0px" : "80px 0px 50px 0px"}
    >
      <InstragramCarousel />
    </Wrapper>
  );
};

export default InstragramView;
