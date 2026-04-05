import useBreakpoint from "@/hooks/useBreakpoint";

import Wrapper from "@/components/layout/Wrapper";

import InstragramCarousel from "../InstragramCarousel";

const InstragramView = () => {
  const { isMobile } = useBreakpoint();

  return (
    <Wrapper
      height={isMobile ? "50vh" : "65vh"}
      minHeight={isMobile ? "auto" : undefined}
      overflow="hidden"
      sx={{
        pt: { xs: 5, sm: 10 },
        pb: { xs: 4, sm: 6 },
      }}
    >
      <InstragramCarousel />
    </Wrapper>
  );
};

export default InstragramView;
