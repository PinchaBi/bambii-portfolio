import { useMemo, useRef, useState } from "react";

import { Box } from "@mui/material";
import { AnimatePresence, motion, useInView } from "motion/react";

import { illustratorItems } from "../../constants";
import FallingItem from "../FallingItem";

// ─── Main Canvas ───

type IllustratorCanvasProps = {
  isLoading?: boolean;
};

const IllustratorCanvas = ({ isLoading }: IllustratorCanvasProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const canAnimate = isInView && !isLoading;

  // Map of id → { x, y } offset for items that move when something is hovered
  const liftMap = useMemo(() => {
    if (hoveredId === null) return new Map<number, { x: number; y: number }>();
    const hovered = illustratorItems.find((i) => i.id === hoveredId);
    return new Map(
      (hovered?.linkedIds ?? []).map(({ id, liftX = 0, liftY = 0 }) => [
        id,
        { x: liftX, y: liftY },
      ]),
    );
  }, [hoveredId]);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Dark overlay between items and hovered item */}
      <AnimatePresence>
        {hoveredId !== null && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.25)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {illustratorItems.map((item, index) => (
        <FallingItem
          key={item.id}
          {...item}
          index={index}
          isInView={canAnimate}
          hoveredId={hoveredId}
          lift={liftMap.get(item.id) ?? null}
          onHover={setHoveredId}
        />
      ))}
    </Box>
  );
};

export default IllustratorCanvas;
