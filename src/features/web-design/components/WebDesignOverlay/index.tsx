import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";
import { X } from "lucide-react";
import { motion } from "motion/react";

import { consumeHeroRect, DEVICE, webDesignList } from "../../constants";
import Display from "../Display";

type WebDesignOverlayProps = {
  id: number;
};

type Rect = { top: number; left: number; width: number; height: number };

const OVERLAY_DURATION = 0.7;
const HERO_DURATION = 0.75;
const HERO_SETTLE_DELAY = 0.5;
const STAGGER_DELAY = 0.1;
const CONTENT_DELAY = 0.25;
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const WebDesignOverlay = ({ id }: WebDesignOverlayProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const [, setSearchParams] = useSearchParams();
  const [heroLanded, setHeroLanded] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const displayAreaRef = useRef<HTMLDivElement>(null);

  // Enter source: captured at click time in WebDesignList, consumed here
  // as initial state — no effect needed, no cascading render.
  const [enterSource] = useState<Rect | null>(() => consumeHeroRect());

  // Hero target + display area origin: measured after mount via rAF
  const [heroTarget, setHeroTarget] = useState<Rect | null>(null);
  const [displayAreaOrigin, setDisplayAreaOrigin] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Exit source: measured after hover CSS transition settles
  const [exitSource, setExitSource] = useState<Rect | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── Hero target: measure display area position ──
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (displayAreaRef.current) {
        const areaRect = displayAreaRef.current.getBoundingClientRect();
        const hero = webDesignList[id].items[0];
        const isIphone = hero.device === DEVICE.I;
        const tw = hero.haveFrame
          ? hero.width * (isIphone ? 1.37 : 1.33)
          : hero.width;
        const th = hero.haveFrame
          ? hero.height * (isIphone ? 1.15 : 1.27)
          : hero.height;
        setDisplayAreaOrigin({
          top: areaRect.top,
          left: areaRect.left,
        });
        setHeroTarget({
          top: areaRect.top + (hero.place.y as number),
          left: areaRect.left + (hero.place.x as number),
          width: tw,
          height: th,
        });
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, [id]);

  // ── Exit source: measured AFTER the hover CSS transition completes ──
  useEffect(() => {
    const hero = webDesignList[id].items[0];
    const { width: mw, height: mh } = webDesignList[id];
    const isIp = hero.device === DEVICE.I;
    const exitW = hero.haveFrame ? mw * (isIp ? 1.37 : 1.33) : mw;
    const exitH = hero.haveFrame ? mh * (isIp ? 1.15 : 1.27) : mh;

    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-hero-id="${id}"]`);
      if (el) {
        const r = el.getBoundingClientRect();
        setExitSource({
          top: r.top,
          left: r.left,
          width: exitW,
          height: exitH,
        });
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  // --------------------------- Variables ---------------------------
  //region Variables
  const {
    title,
    subTitle,
    constraints,
    solutions,
    keyThinkings,
    outcome,
    items,
  } = webDesignList[id];

  const heroItem = items[0];
  const secondaryItems = items.slice(1);

  // FLIP deltas (GPU-composited transforms only)
  const ready = enterSource && heroTarget;
  const exitRect = exitSource ?? enterSource;

  const dxEnter = ready ? enterSource.left - heroTarget.left : 0;
  const dyEnter = ready ? enterSource.top - heroTarget.top : 0;
  const sxEnter = ready ? enterSource.width / heroTarget.width : 1;
  const syEnter = ready ? enterSource.height / heroTarget.height : 1;

  const dxExit = ready && exitRect ? exitRect.left - heroTarget.left : dxEnter;
  const dyExit = ready && exitRect ? exitRect.top - heroTarget.top : dyEnter;
  const sxExit =
    ready && exitRect ? exitRect.width / heroTarget.width : sxEnter;
  const syExit =
    ready && exitRect ? exitRect.height / heroTarget.height : syEnter;

  // --------------------------- Handlers ---------------------------
  //region Handlers
  const handleClose = () => {
    setHeroLanded(false);
    setSearchParams({});
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  const textSections = [
    <Stack key="title" spacing={1.25}>
      <Typography variant="h2" fontSize={24}>
        {title}
      </Typography>
      <Typography variant="subtitle2" color="colors.darkGray3">
        {subTitle}
      </Typography>
    </Stack>,
    ...(constraints.length !== 0
      ? [
          <Stack key="constraints" spacing={0.625}>
            <Typography variant="h4" fontSize={14} color="colors.darkGray3">
              Constaints
            </Typography>
            <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
              {constraints.map((item, index) => (
                <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                  <Typography variant="caption">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Stack>,
        ]
      : []),
    ...(solutions.length !== 0
      ? [
          <Stack key="solutions" spacing={0.625}>
            <Typography variant="h4" fontSize={14} color="colors.darkGray3">
              Solution
            </Typography>
            <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
              {solutions.map((item, index) => (
                <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                  <Typography variant="caption">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Stack>,
        ]
      : []),
    ...(keyThinkings.length !== 0
      ? [
          <Stack key="keyThinkings" spacing={0.625}>
            <Typography variant="h4" fontSize={14} color="colors.darkGray3">
              Key Thinking
            </Typography>
            <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
              {keyThinkings.map((item, index) => (
                <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                  <Typography variant="caption">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Stack>,
        ]
      : []),
    <Stack key="outcome" spacing={0.625}>
      <Typography variant="h4" fontSize={14} color="colors.darkGray3">
        Outcome
      </Typography>
      <Typography variant="caption" lineHeight="17px">
        {outcome}
      </Typography>
    </Stack>,
  ];

  return (
    <>
      {/* ── Layer 1: Backdrop ── */}
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        exit={{ clipPath: "inset(100% 0 0 0)" }}
        transition={{
          duration: OVERLAY_DURATION,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack width={1200} direction="row" justifyContent="space-between">
          <Stack width={450} spacing={2.5}>
            {textSections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={
                  heroLanded
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          delay: CONTENT_DELAY + i * 0.12,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }
                    : { opacity: 0, y: 25 }
                }
                exit={{
                  opacity: 0,
                  y: 15,
                  transition: { duration: 0.15, ease: "easeIn" },
                }}
              >
                {section}
              </motion.div>
            ))}
          </Stack>

          {/* Empty ref box for measuring display area position */}
          <Box
            ref={displayAreaRef}
            width={600}
            height="100%"
            position="relative"
          />
        </Stack>

        {/* Close button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            heroLanded
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.3 },
                }
              : { opacity: 0, scale: 0.8 }
          }
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.25 },
          }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            width={45}
            height={45}
            display="flex"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            onClick={handleClose}
            sx={{
              color: "colors.bambiiBlack",
              bgcolor: "white",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              "&:hover": {
                color: "white",
                transform: "scale(1.1)",
                bgcolor: "colors.bambiiBlack",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              },
            }}
          >
            <X size={18} />
          </Box>
        </motion.div>
      </motion.div>

      {/* ── Layer 2: Hero — transform FLIP ── */}
      {ready &&
        (() => {
          const isHeroHovered = hoverIndex === 0;
          const isAnyHovered = hoverIndex !== null;
          const isHeroBlurred = isAnyHovered && !isHeroHovered;

          return (
            <motion.div
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}
              initial={{
                x: dxEnter,
                y: dyEnter,
                scaleX: sxEnter,
                scaleY: syEnter,
              }}
              animate={{
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
              }}
              exit={{
                x: dxExit,
                y: dyExit,
                scaleX: sxExit,
                scaleY: syExit,
              }}
              transition={{ duration: HERO_DURATION, ease: EASE }}
              onAnimationComplete={() => {
                if (!heroLanded) setHeroLanded(true);
              }}
              style={{
                position: "fixed",
                zIndex: isHeroHovered
                  ? 1010
                  : 1000 + (heroItem.place.z as number),
                top: heroTarget.top,
                left: heroTarget.left,
                width: heroTarget.width,
                height: heroTarget.height,
                transformOrigin: "0 0",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: isHeroBlurred ? 0.45 : 1,
                  filter: isHeroBlurred
                    ? "blur(4px) brightness(0.8)"
                    : "blur(0px) brightness(1)",
                  transform: isHeroHovered
                    ? "scale(1.15)"
                    : isHeroBlurred
                      ? "scale(0.97)"
                      : "scale(1)",
                  transition:
                    "filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <Display
                  {...heroItem}
                  display="flex"
                  position="relative"
                  isHovered={isHeroHovered}
                  justifyContent="center"
                />
              </div>
            </motion.div>
          );
        })()}

      {/* ── Layer 3: Secondary items (fixed, same stacking context as hero) ── */}
      {displayAreaOrigin &&
        secondaryItems.map((item, index) => {
          const { width, height, place, device, haveFrame } = item;
          const isIphone = device === DEVICE.I;
          const itemIdx = index + 1; // hero is 0
          const isItemHovered = hoverIndex === itemIdx;
          const isAnyHovered = hoverIndex !== null;
          const isBlurred = isAnyHovered && !isItemHovered;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHoverIndex(itemIdx)}
              onMouseLeave={() => setHoverIndex(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                heroLanded
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: HERO_SETTLE_DELAY + (index + 1) * STAGGER_DELAY,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }
                  : { opacity: 0, scale: 0.8 }
              }
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.1, ease: "easeIn" },
              }}
              style={{
                position: "fixed",
                top: displayAreaOrigin.top + (place.y as number),
                left: displayAreaOrigin.left + (place.x as number),
                zIndex: isItemHovered ? 1010 : 1000 + (place.z as number),
                width: haveFrame ? width * (isIphone ? 1.37 : 1.33) : width,
                height: haveFrame ? height * (isIphone ? 1.15 : 1.27) : height,
                borderRadius: isIphone ? 16 : 4,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: isBlurred ? 0.45 : 1,
                  filter: isBlurred
                    ? "blur(4px) brightness(0.8)"
                    : "blur(0px) brightness(1)",
                  transform: isItemHovered
                    ? "scale(1.15)"
                    : isBlurred
                      ? "scale(0.97)"
                      : "scale(1)",
                  boxShadow: haveFrame
                    ? "none"
                    : "12px 8px 16px rgba(0,0,0,0.3)",
                  transition:
                    "filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <Display
                  {...item}
                  display="flex"
                  position="relative"
                  isHovered={isItemHovered}
                  justifyContent="center"
                />
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

export default WebDesignOverlay;
