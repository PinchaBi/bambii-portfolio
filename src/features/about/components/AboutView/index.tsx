import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import { colors } from "@/theme/theme";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { ArrowRight, Copy } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import DotGrid from "@/components/animate-ui/DotGrid";
import GlassButton from "@/components/ui/common/GlassButton";

import { Experience } from "../Experience";

// ─── Types ───

type Phase = "entering" | "presented";

// ─── Component ───

const AboutView = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("entering");
  const [isInteractive, setIsInteractive] = useState(false);

  // entering → presented: triggered by the 3D scene once the book has landed
  const handleBookEntered = useCallback(() => setPhase("presented"), []);

  const isPresenting = phase === "presented";

  // Lock page scroll only during the initial entry animation
  useEffect(() => {
    document.body.style.overflow = phase === "entering" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Scroll progress: 0 (top) → 1 (scrolled 100vh into the 200vh container)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven interactivity — reversible
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (isPresenting) setIsInteractive(v > 0.08);
    });
  }, [scrollYProgress, isPresenting]);

  // Play flip sound when book becomes interactive
  useEffect(() => {
    if (!isInteractive) return;
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play().catch(() => {});
  }, [isInteractive]);

  // Motion values for scroll-driven exit
  const topY = useTransform(scrollYProgress, [0, 0.5], [0, -180]);
  const topOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const bottomScrollY = useTransform(scrollYProgress, [0, 0.5], [0, 180]);
  const bottomScrollOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    // Outer: provides 200vh of scroll space
    <div ref={outerRef} style={{ height: "300vh", scrollSnapAlign: "start" }}>
      {/* Sticky viewport — stays fixed while user scrolls through the 200vh */}

      <motion.div
        animate={{ backgroundColor: colors.bambiiGray }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          position="absolute"
          sx={{
            inset: 0,
          }}
        >
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#D9D9D9"
            activeColor="#f13a7d"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </Box>
        {/* ── Marquee text — behind canvas ── */}
        <AnimatePresence>
          {isInteractive && (
            <motion.div
              key="marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "100%",
                transform: "translateY(-50%)",
                overflow: "hidden",
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              <Box
                component={motion.div}
                animate={{ x: "-50%" }}
                transition={{
                  duration: 14,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 0,
                }}
                sx={{
                  display: "inline-flex",
                  width: "max-content",
                  fontSize: 96,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                  ".your-brand": { color: "colors.bambiiPink" },
                }}
              >
                {[0, 1].map((i) => (
                  <Box
                    key={i}
                    component="span"
                    sx={{ whiteSpace: "nowrap", pr: "6rem" }}
                  >
                    Your brand
                    <span className="your-brand"> deserves </span> more than a
                    template
                  </Box>
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── R3F Canvas — book flies in via 3D y-animation ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
          <Canvas
            shadows
            gl={{ alpha: true }}
            camera={{ position: [0.64, 0, 4], fov: 45 }}
          >
            <Suspense fallback={null}>
              <Experience isInteractive={isInteractive} onEntered={handleBookEntered} />
            </Suspense>
          </Canvas>
        </div>

        {/* ── Interaction blocker — absorbs clicks until interactive ── */}
        {!isInteractive && (
          <div style={{ position: "absolute", inset: 0, zIndex: 6 }} />
        )}

        {/* ── Top text — scroll-driven exit (reversible) ── */}
        <motion.div
          style={{
            position: "absolute",
            top: 85,
            left: "50%",
            x: "-50%",
            zIndex: 10,
            textAlign: "center",
            pointerEvents: "none",
            y: topY,
            opacity: topOpacity,
          }}
        >
          <motion.div
            animate={{ color: colors.bambiiBlack }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              fontSize={42}
              fontStyle="italic"
              fontFamily="PlayfairDisplay"
              color="inherit"
            >
              Looks good
            </Typography>
            <Typography variant="h1" color="inherit">
              BUT DOES IT WORK?
            </Typography>
          </motion.div>
        </motion.div>

        {/* ── Bottom stack — fly-in on present, scroll-driven exit ── */}
        {/* Outer: scroll offset */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            x: "-50%",
            zIndex: 10,
            y: bottomScrollY,
            opacity: bottomScrollOpacity,
          }}
        >
          {/* Inner: timer-based fly-in */}
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{
              y: isPresenting ? 0 : 200,
              opacity: isPresenting ? 1 : 0,
            }}
            transition={
              isPresenting
                ? { duration: 0.8, ease: "easeOut", delay: 0.4 }
                : { duration: 0.4, ease: "easeIn" }
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Typography
              variant="body1"
              fontSize={20}
              textAlign="center"
              sx={{ maxWidth: 485 }}
            >
              I design digital experiences where identity and usability work
              together
            </Typography>
            <Stack spacing={1.25} direction="row">
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                type="submit"
                sx={{
                  gap: 1.25,
                  color: "white",
                  borderRadius: 7.5,
                  padding: "10px 20px",
                  background:
                    "linear-gradient(to top right, #CC2C66, #F13A7D, #FFD9E7)",
                }}
              >
                Explore my work
                <ArrowRight />
              </Button>
              <GlassButton
                icon={<Copy size={16} />}
                text="Copy email"
                sx={{ fontSize: 12 }}
              />
            </Stack>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutView;
