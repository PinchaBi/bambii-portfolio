import { ITEM_AMOUNT } from "@/constants/activity";
import { Box, Stack } from "@mui/material";

import ImageCarousel from "@/components/ui/common/ImageCarousel";

import { activityList } from "../../constants";

type ActivityCarouselProps = {
  centerIndex: number;
};

const ActivityCarousel = ({ centerIndex }: ActivityCarouselProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      width={280}
      height={720}
      overflow="hidden"
      position="relative"
      alignItems="center"
      sx={{ pointerEvents: "none" }}
    >
      {Array.from({ length: ITEM_AMOUNT }).map((_, index) => {
        const { title, images } = activityList[ITEM_AMOUNT - index];

        return (
          <Box
            key={`${ITEM_AMOUNT - index}-${title}`}
            width={240}
            height={290}
            borderRadius={5}
            overflow="hidden"
            position="absolute"
            zIndex={ITEM_AMOUNT - index}
            sx={{
              transition: `all 0.85s cubic-bezier(0.4, 0, 0.2, 1)`,
              pointerEvents: "auto",
              boxShadow:
                index === centerIndex
                  ? "0px 3px 12px rgba(0, 0, 0, 0.35)"
                  : "none",
              transform: `translateY(${(index - centerIndex + 1) * 290 - 75}px) scale(${index === centerIndex ? 1 : 0.8})`,
            }}
          >
            <Box
              sx={{
                inset: 0,
                zIndex: 1,
                bgcolor: "white",
                position: "absolute",
                opacity: index === centerIndex ? 0 : 0.3,
                pointerEvents: index === centerIndex ? "none" : "auto",
              }}
            />
            <ImageCarousel
              images={images}
              parentIndex={index}
              centerIndex={centerIndex}
            />
          </Box>
        );
      })}

    </Stack>
  );
};

export default ActivityCarousel;
