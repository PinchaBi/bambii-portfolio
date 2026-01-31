import { Box, Stack } from "@mui/material";
import { activityList } from "../../constants";
import { ITEM_AMOUNT } from "@/constants/activity";

type ActivitySelectorProps = {
  centerIndex: number;
  setCenterIndex: (index: number) => void;
};

const ActivitySelector = ({
  centerIndex,
  setCenterIndex,
}: ActivitySelectorProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack width={70} height={440} position="relative" overflow="hidden">
      <Stack
        width={70}
        spacing={1.25}
        position="absolute"
        sx={{
          transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
          transform: `translateY(-${Math.floor(centerIndex / 5) * 440}px)`,
        }}
      >
        {Array.from({ length: ITEM_AMOUNT }).map((_, index) => {
          const { title, images } = activityList[ITEM_AMOUNT - index];

          return (
            <Box
              key={`${ITEM_AMOUNT - index}-${title}`}
              width={70}
              height={80}
              flexShrink={0}
              padding={0.75}
              borderRadius={2.5}
              position="relative"
              zIndex={ITEM_AMOUNT - index}
              onClick={() => setCenterIndex(index)}
              sx={{
                border: "none",
                cursor: "pointer",
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
                    opacity: centerIndex === index ? 1 : 0.7,
                    filter:
                      centerIndex === index
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
                  border: centerIndex === index ? "2px solid" : "none",
                  borderColor:
                    centerIndex === index ? "colors.bambiiPink" : "transparent",
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

export default ActivitySelector;
