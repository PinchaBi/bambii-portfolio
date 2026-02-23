import { Suspense, useCallback, useEffect, useState } from "react";

import { colors } from "@/theme/theme";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { useSetAtom } from "jotai";
import { ArrowRight, Copy } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import DotGrid from "@/components/animate-ui/DotGrid";
import GlassButton from "@/components/ui/common/GlassButton";

import { pageAtom } from "../../constants";
import { Experience } from "../Experience";

// ─── Types ───

type Phase = "entering" | "presented";

// ─── WordReveal ───

const wordVariant = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" as const, delay: i * 0.06 },
  }),
};

const WordReveal = ({
  text,
  animate,
  baseDelay = 0,
  style,
}: {
  text: string;
  animate: boolean;
  baseDelay?: number;
  style?: React.CSSProperties;
}) => {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={baseDelay + i}
          variants={wordVariant}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// ─── Component ───

const AboutView = () => {
  const [phase, setPhase] = useState<Phase>("entering");
  const [isInteractive, setIsInteractive] = useState(false);
  const [bookShouldEnter, setBookShouldEnter] = useState(false);
  const setPage = useSetAtom(pageAtom);

  // Top text animates immediately; book enters after text finishes (~850ms)
  useEffect(() => {
    const timer = setTimeout(() => setBookShouldEnter(true), 850);
    return () => clearTimeout(timer);
  }, []);

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

  // Scroll progress: 0 (top of page) → 1 (200vh scrolled, when project enters)
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(
    scrollY,
    [0, window.innerHeight * 2],
    [0, 1],
    { clamp: true },
  );

  // Scroll-driven interactivity — reversible
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (isPresenting) setIsInteractive(v > 0.08);
    });
  }, [scrollYProgress, isPresenting]);

  // Close the book when scrolling back to top
  useEffect(() => {
    if (!isInteractive) setPage(0);
  }, [isInteractive, setPage]);

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

  // Bottom text word count for stagger offset
  const bodyText =
    "I design digital experiences where identity and usability work together";
  const bodyWordCount = bodyText.split(" ").length;

  return (
    <motion.div
      animate={{ backgroundColor: colors.bambiiGray }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
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
            baseColor={isInteractive ? "#D9D9D9" : "#EEEEEE"}
            activeColor={isInteractive ? "#f13a7d" : "#D9D9D9"}
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
              <Experience
                isInteractive={isInteractive}
                onEntered={handleBookEntered}
                shouldEnter={bookShouldEnter}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* ── Interaction blocker — absorbs clicks until interactive ── */}
        {!isInteractive && (
          <div style={{ position: "absolute", inset: 0, zIndex: 6 }} />
        )}

        {/* ── Top text — word-by-word reveal + scroll-driven exit ── */}
        <motion.div
          style={{
            position: "absolute",
            top: 100,
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
              component="div"
            >
              <WordReveal text="Looks good" animate={true} baseDelay={0} />
            </Typography>
            <Typography variant="h1" color="inherit" component="div">
              <WordReveal
                text="BUT DOES IT WORK?"
                animate={true}
                baseDelay={2}
              />
            </Typography>
          </motion.div>
        </motion.div>

        {/* ── Bottom stack — word-by-word + scroll-driven exit ── */}
        {/* Outer: scroll offset */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 75,
            left: "50%",
            x: "-50%",
            zIndex: 10,
            y: bottomScrollY,
            opacity: bottomScrollOpacity,
          }}
        >
          <div
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
              component="div"
              sx={{ maxWidth: 485 }}
            >
              <WordReveal
                text={bodyText}
                animate={isPresenting}
                baseDelay={0}
              />
            </Typography>
            <Stack spacing={1.25} direction="row">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isPresenting ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: isPresenting ? bodyWordCount * 0.06 + 0.1 : 0,
                }}
              >
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
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isPresenting ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: isPresenting ? bodyWordCount * 0.06 + 0.22 : 0,
                }}
              >
                <GlassButton
                  icon={<Copy size={16} />}
                  text="Copy email"
                  sx={{ height: "100%", fontSize: 12 }}
                />
              </motion.div>
            </Stack>
          </div>
        </motion.div>
      </motion.div>
  );
};

export default AboutView;
