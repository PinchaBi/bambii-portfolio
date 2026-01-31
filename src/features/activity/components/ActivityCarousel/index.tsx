import { Box, Stack } from "@mui/material";
import { activityList } from "../../constants";
import { ITEM_AMOUNT } from "@/constants/activity";
import ImageCarousel from "@/components/ui/common/ImageCarousel";

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

      {/* Top Gradient */}
      <Box
        width="100%"
        height={150}
        zIndex={1000}
        position="absolute"
        sx={{
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, #EEEEEE 20%, rgba(255, 255, 255, 0) 100%)",
          backdropFilter: "blur(2px)",
          mask: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMask: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />

      {/* Bottom Gradient */}
      <Box
        bottom={0}
        width="100%"
        height={150}
        zIndex={1000}
        position="absolute"
        sx={{
          pointerEvents: "none",
          background:
            "linear-gradient(to top, #EEEEEE 20%, rgba(255, 255, 255, 0) 100%)",
          backdropFilter: "blur(2px)",
          mask: "linear-gradient(to top, black 50%, transparent 100%)",
          WebkitMask: "linear-gradient(to top, black 50%, transparent 100%)",
        }}
      />
    </Stack>
  );
};

export default ActivityCarousel;
