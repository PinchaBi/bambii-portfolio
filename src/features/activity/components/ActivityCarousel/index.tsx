import { forwardRef, memo, useImperativeHandle, useRef } from "react";

import { ITEM_AMOUNT } from "@/constants/activity";
import { Box, Stack } from "@mui/material";

import ImageCarousel from "@/components/ui/common/ImageCarousel";

import { activityList } from "../../constants";

export type ActivityCarouselHandle = {
  updateProgress: (progress: number) => void;
};

type ActivityCarouselProps = {
  activeIndex: number;
};

const ActivityCarousel = forwardRef<
  ActivityCarouselHandle,
  ActivityCarouselProps
>(({ activeIndex }, ref) => {
  // --------------------------- Refs ---------------------------
  //region Refs

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // --------------------------- Imperative handle ---------------------------
  //region Imperative handle

  useImperativeHandle(ref, () => ({
    updateProgress: (progress: number) => {
      for (let i = 0; i < ITEM_AMOUNT; i++) {
        const card = cardRefs.current[i];
        const overlay = overlayRefs.current[i];
        const shadow = shadowRefs.current[i];
        if (!card) continue;

        const distFromCenter = Math.abs(i - progress);
        const scale = 1 - Math.min(distFromCenter, 1) * 0.2;
        const translateY = (i - progress + 1) * 290 - 75;
        const shadowOpacity = Math.max(0, 1 - distFromCenter * 2);
        const overlayOpacity = Math.min(distFromCenter * 0.3, 0.3);

        card.style.transform = `translate3d(0,${translateY}px,0) scale3d(${scale},${scale},1)`;

        if (shadow) {
          shadow.style.opacity = String(shadowOpacity);
        }

        if (overlay) {
          overlay.style.opacity = String(overlayOpacity);
        }
      }
    },
  }));

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      width={280}
      height={720}
      overflow="hidden"
      position="relative"
      alignItems="center"
      sx={{ contain: "layout style paint" }}
    >
      {Array.from({ length: ITEM_AMOUNT }).map((_, index) => {
        const { title, images } = activityList[ITEM_AMOUNT - index];

        const translateY = (index + 1) * 290 - 75;

        return (
          <Box
            key={`${ITEM_AMOUNT - index}-${title}`}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el;
            }}
            width={240}
            height={290}
            borderRadius={5}
            overflow="hidden"
            position="absolute"
            zIndex={ITEM_AMOUNT - index}
            style={{
              transform: `translate3d(0,${translateY}px,0) scale3d(0.8,0.8,1)`,
            }}
            sx={{
              pointerEvents: "auto",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Static shadow layer — only opacity is animated, no repaint */}
            <Box
              ref={(el: HTMLDivElement | null) => {
                shadowRefs.current[index] = el;
              }}
              style={{ opacity: 0 }}
              sx={{
                inset: 0,
                position: "absolute",
                borderRadius: 5,
                pointerEvents: "none",
                boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.35)",
                willChange: "opacity",
              }}
            />
            {/* White overlay for inactive dimming */}
            <Box
              ref={(el: HTMLDivElement | null) => {
                overlayRefs.current[index] = el;
              }}
              sx={{
                inset: 0,
                zIndex: 1,
                bgcolor: "white",
                position: "absolute",
                pointerEvents: "none",
                willChange: "opacity",
              }}
            />
            <ImageCarousel
              images={images}
              parentIndex={index}
              centerIndex={activeIndex}
            />
          </Box>
        );
      })}
    </Stack>
  );
});

ActivityCarousel.displayName = "ActivityCarousel";

export default memo(ActivityCarousel);
