import Wrapper from "@/components/layout/Wrapper";

import InstragramCarousel from "../InstragramCarousel";

const InstragramView = () => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper height="65vh" overflow="hidden" padding="80px 0px 50px 0px">
      <InstragramCarousel />
    </Wrapper>
  );
};

export default InstragramView;
