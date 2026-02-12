import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 2;

const useCursorTrail = () => {
  // --------------------------- Refs ---------------------------
  //region Refs

  const activeLayerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGCircleElement[]>([]);
  const historyRef = useRef<{ x: number; y: number }[]>([]);

  // --------------------------- Effects ---------------------------
  //region Effects

  useEffect(() => {
    historyRef.current = Array(TRAIL_LENGTH).fill({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      if (activeLayerRef.current) {
        const rect = activeLayerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (historyRef.current.length > 0) {
          historyRef.current[0] = { x, y };
        }
      }
    };

    const updateTrail = () => {
      if (trailRef.current.length === TRAIL_LENGTH) {
        for (let i = 1; i < TRAIL_LENGTH; i++) {
          const curr = historyRef.current[i];
          const prev = historyRef.current[i - 1];

          const dx = prev.x - curr.x;
          const dy = prev.y - curr.y;

          historyRef.current[i].x += dx * 0.5;
          historyRef.current[i].y += dy * 0.5;
        }

        historyRef.current.forEach((pos, index) => {
          const circle = trailRef.current[index];
          if (circle) {
            circle.setAttribute("cx", `${pos.x}`);
            circle.setAttribute("cy", `${pos.y}`);

            const size = 100 * (1 - index / TRAIL_LENGTH);
            circle.setAttribute("r", `${size}`);
          }
        });
      }
      requestAnimationFrame(updateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const rafId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { activeLayerRef, trailRef };
};

export default useCursorTrail;
