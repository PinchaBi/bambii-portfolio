import { memo } from "react";

import { ITEM_AMOUNT } from "@/constants/activity";
import { Box, Stack } from "@mui/material";

import { activityList } from "../../constants";

type ActivitySelectorProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  direction?: "vertical" | "horizontal";
  thumbnailSize?: number;
  spacing?: number;
};

const ActivitySelector = ({
  activeIndex,
  onSelect,
  direction = "vertical",
  thumbnailSize,
  spacing: spacingProp,
}: ActivitySelectorProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  const isHorizontal = direction === "horizontal";
  const size = thumbnailSize ?? (isHorizontal ? 80 : 70);
  const vSize = thumbnailSize ?? 80;
  const gap = spacingProp ?? 1.25;

  return (
    <Stack
      width={isHorizontal ? "100%" : size}
      height={isHorizontal ? "auto" : "min(440px, 60dvh)"}
      position="relative"
      overflow="hidden"
      direction={isHorizontal ? "row" : "column"}
      sx={{
        justifyContent: isHorizontal ? "center" : undefined,
      }}
    >
      <Stack
        width={isHorizontal ? "auto" : size}
        spacing={gap}
        direction={isHorizontal ? "row" : "column"}
        position={isHorizontal ? "relative" : "absolute"}
        sx={{
          transition: isHorizontal
            ? undefined
            : `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
          transform: isHorizontal
            ? undefined
            : `translateY(-${Math.floor(activeIndex / 5) * 440}px)`,
        }}
      >
        {Array.from({ length: ITEM_AMOUNT }).map((_, index) => {
          const { title, images } = activityList[ITEM_AMOUNT - index];

          return (
            <Box
              key={`${ITEM_AMOUNT - index}-${title}`}
              width={size}
              height={vSize}
              flexShrink={0}
              padding={0.75}
              borderRadius={2.5}
              position="relative"
              zIndex={ITEM_AMOUNT - index}
              onClick={() => onSelect(index)}
              sx={{
                border: "none",
                cursor: "pointer",
                pointerEvents: "auto",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  opacity: 1,
                  "& img": {
                    opacity: 1,
                    filter: "grayscale(0%)",
                  },
                },
              }}
            >
              <Box
                width="100%"
                height="100%"
                overflow="hidden"
                borderRadius={2.5}
                position="relative"
                sx={{ pointerEvents: "none" }}
              >
                <Box
                  component="img"
                  src={images[0]}
                  width="100%"
                  height="100%"
                  position="absolute"
                  sx={{
                    objectFit: "cover",
                    transition: "all 0.2s ease-in-out",
                    opacity: activeIndex === index ? 1 : 0.7,
                    filter:
                      activeIndex === index
                        ? "grayscale(0%)"
                        : "grayscale(100%)",
                  }}
                />
              </Box>

              {/* Corner Border Overlay */}
              <Box
                position="absolute"
                zIndex={20}
                sx={{
                  inset: 0,
                  pointerEvents: "none",
                  borderRadius: 2.5,
                  border: activeIndex === index ? "2px solid" : "none",
                  borderColor:
                    activeIndex === index ? "colors.bambiiPink" : "transparent",
                  transition: "border-color 0.2s ease-in-out",
                  maskImage: `
                    linear-gradient(white, white),
                    linear-gradient(white, white),
                    linear-gradient(white, white),
                    linear-gradient(white, white)
                  `,
                  maskPosition:
                    "top left, top right, bottom left, bottom right",
                  maskSize: "15px 15px",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: `
                    linear-gradient(white, white),
                    linear-gradient(white, white),
                    linear-gradient(white, white),
                    linear-gradient(white, white)
                  `,
                  WebkitMaskPosition:
                    "top left, top right, bottom left, bottom right",
                  WebkitMaskSize: "15px 15px",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(ActivitySelector);
