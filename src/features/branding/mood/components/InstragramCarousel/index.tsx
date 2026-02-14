import { ITEM_AMOUNT_INSTRAGRAM } from "@/constants/branding";
import { Box, Stack } from "@mui/material";
import { keyframes } from "@mui/system";

import { instragramList } from "../../constants";
import InstragramCard from "../InstragramCard";

const CARD_WIDTH = 295;
const GAP = 30; // spacing={3.75} = 3.75 * 8 = 30px
const TOTAL_WIDTH =
  ITEM_AMOUNT_INSTRAGRAM * CARD_WIDTH + ITEM_AMOUNT_INSTRAGRAM * GAP;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-${TOTAL_WIDTH}px); }
`;

const InstragramCarousel = () => {
  // --------------------------- Renders ---------------------------
  //region Renders

  const renderCards = (keyPrefix: string) =>
    Array.from({ length: ITEM_AMOUNT_INSTRAGRAM }).map((_, index) => {
      const images = instragramList[index + 1];
      return (
        <Box key={`${keyPrefix}-${index}`} flexShrink={0}>
          <InstragramCard images={images} />
        </Box>
      );
    });

  return (
    <Box overflow="hidden">
      <Stack
        spacing={3.75}
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
