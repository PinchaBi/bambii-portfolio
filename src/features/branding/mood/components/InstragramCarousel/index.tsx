import { ITEM_AMOUNT_INSTRAGRAM } from "@/constants/branding";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { keyframes } from "@mui/system";
import { useMemo } from "react";

import { instragramList } from "../../constants";
import InstragramCard from "../InstragramCard";

const GAP = 20;

const InstragramCarousel = () => {
  const isMobile = useMediaQuery("(max-width:599px)");
  const isSmallMobile = useMediaQuery("(max-width:399px)");

  const cardSize = isSmallMobile ? 150 : isMobile ? 180 : 220;

  const totalWidth =
    ITEM_AMOUNT_INSTRAGRAM * cardSize + ITEM_AMOUNT_INSTRAGRAM * GAP;

  const scroll = useMemo(
    () => keyframes`
      0% { transform: translateX(0); }
      100% { transform: translateX(-${totalWidth}px); }
    `,
    [totalWidth],
  );

  // --------------------------- Renders ---------------------------
  //region Renders

  const renderCards = (keyPrefix: string) =>
    Array.from({ length: ITEM_AMOUNT_INSTRAGRAM }).map((_, index) => {
      const images = instragramList[index + 1];
      return (
        <Box key={`${keyPrefix}-${index}`} flexShrink={0}>
          <InstragramCard images={images} size={cardSize} />
        </Box>
      );
    });

  return (
    <Box overflow="hidden">
      <Stack
        spacing={GAP / 8}
        direction="row"
        paddingX={`${GAP}px`}
        sx={{
          width: "fit-content",
          animation: `${scroll} 40s linear infinite`,
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {renderCards("a")}
        {renderCards("b")}
      </Stack>
    </Box>
  );
};

export default InstragramCarousel;
