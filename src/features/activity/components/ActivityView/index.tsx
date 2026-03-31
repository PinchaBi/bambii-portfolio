import { useCallback, useEffect, useRef, useState } from "react";

import { ITEM_AMOUNT } from "@/constants/activity";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { ArrowDown, ArrowUp } from "lucide-react";

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

  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:599px)");
  const isMediumTablet = useMediaQuery("(min-width:825px)");
  const isShortScreen = useMediaQuery("(max-height:500px)");
  const isMediumShort = useMediaQuery("(max-height:700px)");

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
      if (rect.height === 0) return;
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
                spacerTop + (nearest / ITEM_AMOUNT) * spacer.offsetHeight;
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
    <Wrapper
      zIndex={1}
      bgcolor="colors.bambiiGray"
      sx={{
        height: "100dvh",
      }}
    >
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

      {isDesktop ? (
        /* ─── Desktop (lg+): original 3-column layout ─── */
        <Stack
          spacing={3.75}
          direction="row"
          sx={{
            zIndex: 1,
            height: "100%",
            position: "relative",
            pointerEvents: "none",
            px: `max(48px, calc((100vw - 1280px) / 2))`,
          }}
        >
          <Stack
            spacing={1.25}
            sx={{
              flexShrink: 1,
              minWidth: 200,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              width={325}
              maxWidth="100%"
              fontFamily="PlayfairDisplay"
            >
              Selected Activities & Competitions
            </Typography>
            <Typography
              variant="body1"
              width={325}
              maxWidth="100%"
              color="colors.darkGray3"
            >
              2023 - 2025
            </Typography>
          </Stack>
          <Stack spacing={3.75} direction="row" sx={{ alignItems: "center" }}>
            <ActivityCarousel ref={carouselRef} activeIndex={activeIndex} />
            <ActivityCard ref={cardRef} activeIndex={activeIndex} />
          </Stack>

          <Stack
            spacing={3.75}
            sx={{
              width: 70,
              flexShrink: 0,
              position: "relative",
              justifyContent: "center",
            }}
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
      ) : isMobile ? (
        /* ─── Mobile (xs-sm): vertical stack — title, carousel, card, selector ─── */
        <Stack
          sx={{
            zIndex: 1,
            height: "100%",
            position: "relative",
            pointerEvents: "none",
            px: 3,
            pt: "max(70px, 10dvh)",
            pb: 4,
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Stack spacing={0.5} sx={{ alignItems: "center" }}>
            <Typography
              variant="h2"
              fontFamily="PlayfairDisplay"
              textAlign="center"
              fontSize="1.5rem"
            >
              Selected Activities & Competitions
            </Typography>
            <Typography variant="body2" color="colors.darkGray3">
              2023 - 2025
            </Typography>
          </Stack>

          {/* Carousel */}
          <ActivityCarousel
            ref={carouselRef}
            activeIndex={activeIndex}
            containerWidth={220}
            containerHeight={200}
            cardWidth={150}
            cardHeight={150}
            cardSpacing={150}
            cardOffset={130}
          />

          {/* Card — full width, readable text */}
          <ActivityCard ref={cardRef} activeIndex={activeIndex} scale={0.75} />

          {/* Horizontal selector at bottom */}
          <Stack
            sx={{
              alignItems: "center",
              pointerEvents: "auto",
              maxWidth: "100%",
            }}
          >
            <ActivitySelector
              activeIndex={activeIndex}
              onSelect={scrollToIndex}
              direction="horizontal"
              thumbnailSize={45}
              spacing={0.75}
            />
          </Stack>
        </Stack>
      ) : (
        /* ─── Tablet (sm-lg): title top, 3-col carousel | card | selector ─── */
        <Stack
          sx={{
            zIndex: 1,
            height: "100%",
            position: "relative",
            pointerEvents: "none",
            px: { sm: 4, md: 6 },
            pt: isShortScreen
              ? "max(60px, 15dvh)"
              : isMediumShort
                ? "max(60px, 12dvh)"
                : { sm: 8, md: 10 },
            pb: isShortScreen ? 1 : isMediumShort ? 2 : { sm: 8, md: 10 },
            gap: isShortScreen ? 0.5 : isMediumShort ? 2 : { sm: 6, md: 8 },
            justifyContent: isShortScreen ? "flex-start" : "center",
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Stack
            spacing={isShortScreen ? 0.25 : isMediumShort ? 0.5 : 1}
            sx={{ alignItems: "center" }}
          >
            <Typography
              variant="h2"
              fontFamily="PlayfairDisplay"
              textAlign="center"
              fontSize={
                isShortScreen
                  ? "1.25rem"
                  : isMediumShort
                    ? "1.5rem"
                    : { sm: "2rem", md: "2.25rem" }
              }
            >
              Selected Activities & Competitions
            </Typography>
            <Typography
              variant={isShortScreen || isMediumShort ? "body2" : "body1"}
              color="colors.darkGray3"
            >
              2023 - 2025
            </Typography>
          </Stack>

          {/* Content row: carousel | card | selector */}
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              overflow: "visible",
              flexGrow: isShortScreen || isMediumShort ? 1 : 0,
              gap: isShortScreen ? 1 : isMediumShort ? 1.5 : { sm: 1.5, md: 3 },
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <ActivityCarousel
                ref={carouselRef}
                activeIndex={activeIndex}
                containerWidth={
                  isShortScreen
                    ? 140
                    : isMediumShort
                      ? 160
                      : isMediumTablet
                        ? 200
                        : 160
                }
                containerHeight={
                  isShortScreen
                    ? 200
                    : isMediumShort
                      ? 260
                      : isMediumTablet
                        ? 560
                        : 440
                }
                cardWidth={
                  isShortScreen
                    ? 120
                    : isMediumShort
                      ? 140
                      : isMediumTablet
                        ? 180
                        : 140
                }
                cardHeight={
                  isShortScreen
                    ? 140
                    : isMediumShort
                      ? 170
                      : isMediumTablet
                        ? 220
                        : 170
                }
                cardSpacing={
                  isShortScreen
                    ? 140
                    : isMediumShort
                      ? 170
                      : isMediumTablet
                        ? 220
                        : 170
                }
                cardOffset={
                  isShortScreen
                    ? 110
                    : isMediumShort
                      ? 115
                      : isMediumTablet
                        ? 55
                        : 42
                }
              />
            </Box>
            <Box sx={{ flexShrink: 0, alignSelf: "center" }}>
              <ActivityCard
                ref={cardRef}
                activeIndex={activeIndex}
                scale={
                  isShortScreen
                    ? 0.5
                    : isMediumShort
                      ? 0.6
                      : isMediumTablet
                        ? 0.75
                        : 0.65
                }
              />
            </Box>
            <Stack
              sx={{
                pointerEvents: "auto",
                flexShrink: 0,
                alignSelf: isShortScreen ? "flex-start" : "center",
              }}
            >
              <ActivitySelector
                activeIndex={activeIndex}
                onSelect={scrollToIndex}
                direction="vertical"
                thumbnailSize={
                  isShortScreen ? 45 : isMediumShort ? 55 : undefined
                }
                spacing={isShortScreen ? 0.5 : isMediumShort ? 0.5 : undefined}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Wrapper>
  );
};

export default ActivityView;
