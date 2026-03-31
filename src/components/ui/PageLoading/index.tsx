import { useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { B_PATHS } from "@/components/ui/BambiiLogo/paths";

const TEXT_DELAY = 0.6; // Title text fades in first
const B_DELAY = TEXT_DELAY + 0.4; // B starts drawing after title appears

// Infinite loop timing for B stroke animation
const B_DRAW_TIME = 1.5; // all B paths finish drawing by this time
const B_HOLD = 0.5; // pause while fully drawn
const B_UNDRAW = 0.5; // erase duration
const B_PAUSE = 0.5; // pause while hidden before next loop
const B_CYCLE = B_DRAW_TIME + B_HOLD + B_UNDRAW + B_PAUSE; // 3.0s per loop

const AnimatedStrokePath = ({
  d,
  tx,
  ty,
  delay,
  duration,
}: {
  d: string;
  tx: number;
  ty: number;
  delay: number;
  duration: number;
}) => {
  const drawStart = delay / B_CYCLE;
  const drawEnd = (delay + duration) / B_CYCLE;
  const holdEnd = (B_DRAW_TIME + B_HOLD) / B_CYCLE;
  const undrawEnd = (B_DRAW_TIME + B_HOLD + B_UNDRAW) / B_CYCLE;

  return (
    <motion.path
      d={d}
      transform={`translate(${tx}, ${ty})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={2}
      initial={{ strokeDashoffset: 2 }}
      animate={{ strokeDashoffset: [2, 2, 0, 0, 2, 2] }}
      transition={{
        duration: B_CYCLE,
        delay: B_DELAY,
        times: [0, drawStart, drawEnd, holdEnd, undrawEnd, 1],
        repeat: Infinity,
        ease: ["linear", "easeInOut", "linear", "easeInOut", "linear"],
      }}
    />
  );
};

type PageLoadingProps = {
  isLoading: boolean;
  title?: string;
};

const PageLoading = ({ isLoading, title = "PORTFOLIO" }: PageLoadingProps) => {
  // Lock page scroll while loading screen is visible
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        bgcolor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
        transition: isLoading ? "none" : "opacity 0.6s ease",
      }}
    >
      <Stack sx={{ alignItems: "center" }} spacing={1}>
        {/* B writing animation */}
        <Box sx={{ position: "relative", width: 120, height: 120 }}>
          {/* Gray ghost B — always visible as background */}
          <Box
            component="svg"
            viewBox="-8 -10 70 70"
            sx={{
              position: "absolute",
              inset: 0,
              width: 120,
              height: 120,
              color: "#444",
            }}
          >
            {B_PATHS.map((sp, i) => (
              <path
                key={i}
                d={sp.d}
                transform={`translate(${sp.tx}, ${sp.ty})`}
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </Box>

          {/* Animated white B — draws over the gray one */}
          <Box
            component="svg"
            viewBox="-8 -10 70 70"
            sx={{
              position: "absolute",
              inset: 0,
              width: 120,
              height: 120,
              color: "white",
            }}
          >
            {B_PATHS.map((sp, i) => (
              <AnimatedStrokePath
                key={i}
                d={sp.d}
                tx={sp.tx}
                ty={sp.ty}
                delay={sp.delay}
                duration={sp.duration}
              />
            ))}
          </Box>
        </Box>

        {/* PORTFOLIO text — appears first */}
        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: TEXT_DELAY,
            ease: "easeOut",
          }}
          fontSize={14}
          color="white"
          letterSpacing={3}
          variant="subtitle2"
        >
          {title}
        </Typography>
      </Stack>
    </Box>
  );
};

export default PageLoading;
