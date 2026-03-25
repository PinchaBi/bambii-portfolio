import { useCallback, useEffect, useRef, useState } from "react";

import { ITEM_AMOUNT } from "@/constants/activity";
import { Stack, Typography } from "@mui/material";
import { ArrowDown, ArrowUp } from "lucide-react";

import GradualBlur from "@/components/animate-ui/GradualBlur";
import Wrapper from "@/components/layout/Wrapper";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import GlassButton from "@/components/ui/common/GlassButton";

import ActivityCard, { type ActivityCardHandle } from "../ActivityCard";
import ActivityCarousel, {
  type ActivityCarouselHandle,
} from "../ActivityCarousel";
import ActivitySelector from "../ActivitySelector";

const SNAP_DELAY = 500;

const ActivityView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const isSnappingRef = useRef(false);
  const lastScrollValRef = useRef(0);
  const spacerRef = useRef<HTMLElement | null>(null);

  const carouselRef = useRef<ActivityCarouselHandle>(null);
  const cardRef = useRef<ActivityCardHandle>(null);

  // --------------------------- Scroll-driven sync ---------------------------
  //region Scroll-driven sync

  const scrollToIndex = useCallback((targetIndex: number) => {
    const spacer = spacerRef.current;
    if (!spacer) return;
    isSnappingRef.current = true;
    const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
    const targetScroll =
      spacerTop + (targetIndex / ITEM_AMOUNT) * spacer.offsetHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  useEffect(() => {
    spacerRef.current = document.getElementById("activity-spacer");

    const tick = () => {
      const spacer = spacerRef.current;
      if (!spacer) return;

      const rect = spacer.getBoundingClientRect();
      const rawProgress = Math.max(0, -rect.top / rect.height);
      const scrollVal = Math.min(rawProgress * ITEM_AMOUNT, ITEM_AMOUNT - 1);

      lastScrollValRef.current = scrollVal;

      // Direct DOM updates — no React re-render
      carouselRef.current?.updateProgress(scrollVal);
      cardRef.current?.updateProgress(scrollVal);

      // Only trigger React re-render when crossing an integer boundary
      const newActive = Math.round(scrollVal);
      if (newActive !== activeIndexRef.current) {
        activeIndexRef.current = newActive;
        setActiveIndex(newActive);
      }
    };

    const handleScroll = () => {
      // Direct call — no rAF delay. Scroll events already fire once per
      // frame in modern browsers, so rAF only adds a 1-frame lag.
      tick();

      // Snap to nearest item when user stops scrolling
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      const scrollVal = lastScrollValRef.current;

      if (scrollVal > 0 && scrollVal < ITEM_AMOUNT - 1) {
        snapTimerRef.current = setTimeout(() => {
          if (!isSnappingRef.current) {
            const nearest = Math.round(scrollVal);
            if (Math.abs(scrollVal - nearest) > 0.02) {
              const spacer = spacerRef.current;
              if (!spacer) return;
              isSnappingRef.current = true;
              const spacerTop =
                spacer.getBoundingClientRect().top + window.scrollY;
              const targetScroll =
                spacerTop +
                (nearest / ITEM_AMOUNT) * spacer.offsetHeight;
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
            }
          }
          isSnappingRef.current = false;
        }, SNAP_DELAY);
      } else {
        isSnappingRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, []);

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const handlePrev = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (activeIndex > 0) scrollToIndex(activeIndex - 1);
    },
    [activeIndex, scrollToIndex],
  );

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (activeIndex < ITEM_AMOUNT - 1) scrollToIndex(activeIndex + 1);
    },
    [activeIndex, scrollToIndex],
  );

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper zIndex={1} bgcolor="colors.bambiiGray">
      <BackgroundRippleEffect rows={15} />
      <svg
        width={0}
        height={0}
        style={{ position: "absolute", visibility: "hidden" }}
      >
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F13A7D" />
          <stop offset="100%" stopColor="#777777" />
        </linearGradient>
      </svg>
      <Stack
        zIndex={1}
        spacing={7.5}
        height="100%"
        direction="row"
        position="relative"
        sx={{ pointerEvents: "none" }}
      >
        <Stack
          width={500}
          spacing={1.25}
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography variant="h2" width={325} fontFamily="PlayfairDisplay">
            Selected Activities & Competitions
          </Typography>
          <Typography variant="body1" width={325} color="colors.darkGray3">
            2023 - 2025
          </Typography>
        </Stack>
        <Stack width={720} spacing={3.75} direction="row" alignItems="center">
          <ActivityCarousel ref={carouselRef} activeIndex={activeIndex} />
          <ActivityCard ref={cardRef} activeIndex={activeIndex} />
        </Stack>

        <Stack
          width={70}
          spacing={3.75}
          position="relative"
          justifyContent="center"
        >
          <GlassButton
            onClick={handlePrev}
            borderRadius={6.25}
            sx={{
              pointerEvents: "auto",
              "&:hover": {
                "& svg": {
                  stroke: "#F13A7D",
                },
              },
            }}
          >
            <ArrowUp />
          </GlassButton>
          <ActivitySelector
            activeIndex={activeIndex}
            onSelect={scrollToIndex}
          />
          <GlassButton
            onClick={handleNext}
            borderRadius={6.25}
            sx={{
              pointerEvents: "auto",
              "&:hover": {
                "& svg": {
                  stroke: "#F13A7D",
                },
              },
            }}
          >
            <ArrowDown />
          </GlassButton>
        </Stack>
      </Stack>
      <GradualBlur
        target="parent"
        position="top"
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={2}
      />
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={2}
      />
    </Wrapper>
  );
};

export default ActivityView;
