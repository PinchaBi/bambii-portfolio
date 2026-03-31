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
  containerWidth?: number;
  containerHeight?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardSpacing?: number;
  cardOffset?: number;
};

const ActivityCarousel = forwardRef<
  ActivityCarouselHandle,
  ActivityCarouselProps
>(
  (
    {
      activeIndex,
      containerWidth = 280,
      containerHeight = 720,
      cardWidth = 240,
      cardHeight = 290,
      cardSpacing = 290,
      cardOffset = 75,
    },
    ref,
  ) => {
    // --------------------------- Refs ---------------------------
    //region Refs

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
    const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Store layout values for imperative updates
    const layoutRef = useRef({ cardSpacing, cardOffset });
    layoutRef.current = { cardSpacing, cardOffset };

    // --------------------------- Imperative handle ---------------------------
    //region Imperative handle

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        const { cardSpacing: sp, cardOffset: off } = layoutRef.current;
        for (let i = 0; i < ITEM_AMOUNT; i++) {
          const card = cardRefs.current[i];
          const overlay = overlayRefs.current[i];
          const shadow = shadowRefs.current[i];
          if (!card) continue;

          const distFromCenter = Math.abs(i - progress);
          const scale = 1 - Math.min(distFromCenter, 1) * 0.2;
          const translateY = (i - progress + 1) * sp - off;
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
      <Box
        sx={{
          width: containerWidth,
          height: containerHeight,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cards container — mask fades edges to transparent */}
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            alignItems: "center",
            contain: "layout style paint",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {Array.from({ length: ITEM_AMOUNT }).map((_, index) => {
            const { title, images } = activityList[ITEM_AMOUNT - index];

            const translateY = (index + 1) * cardSpacing - cardOffset;

            return (
              <Box
                key={`${ITEM_AMOUNT - index}-${title}`}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[index] = el;
                }}
                width={cardWidth}
                height={cardHeight}
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
                  scale={cardWidth / 240}
                />
              </Box>
            );
          })}
        </Stack>

      </Box>
    );
  },
);

ActivityCarousel.displayName = "ActivityCarousel";

export default memo(ActivityCarousel);
