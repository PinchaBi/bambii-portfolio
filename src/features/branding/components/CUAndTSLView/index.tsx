import { useEffect, useRef } from "react";

import { Box } from "@mui/material";
import { Canvas } from "@react-three/fiber";

import { Experience } from "@/features/branding/components/Experience";

import CUSocietyView from "../../cusociety/components/CUSocietyView";
import ElexirView from "../../elexir/components/ElexirView";
import KiyoView from "../../kiyo/components/KiyoView";

type CUAndTSLViewProps = {
  onLoaded?: () => void;
};

const CUAndTSLView = ({ onLoaded }: CUAndTSLViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  // Track native scroll progress through the container.
  // Recomputes document position on every scroll to avoid stale values
  // from sticky-parent offsetTop race conditions at mount time.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getDocTop = () => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const handleScroll = () => {
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = window.scrollY - getDocTop();
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Don't call handleScroll() immediately — on page reload the browser
    // may have restored a stale scrollY before RootLayout's scrollTo(0)
    // fires. The listener will pick up the correct value once scroll settles.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box ref={containerRef} id="cu-tsl-container" sx={{ position: "relative" }}>
      {/* HTML content — 3 views stacked = 300vh */}
      <Box id="cusociety-view">
        <CUSocietyView />
      </Box>
      <ElexirView />
      <KiyoView />

      {/* 3D Canvas overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <Canvas
            gl={{ alpha: true }}
            camera={{
              fov: 50,
              position: [0, 0.2, 4],
            }}
            style={{ pointerEvents: "none" }}
          >
            <Experience
              scrollProgressRef={scrollProgressRef}
              onLoaded={onLoaded}
            />
          </Canvas>
        </Box>
      </Box>
    </Box>
  );
};

export default CUAndTSLView;
