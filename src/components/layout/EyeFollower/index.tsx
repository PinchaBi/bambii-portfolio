import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const EyeFollower = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const eyeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);

      // Max radius the pupil can move
      const maxRadius = 5;

      const x = Math.cos(angle) * maxRadius;
      const y = Math.sin(angle) * maxRadius;

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box
      ref={eyeRef}
      sx={{
        width: 18,
        height: 18,
        display: "flex",
        bgcolor: "white",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          bgcolor: "colors.bambiiBlack",
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s linear",
        }}
      />
    </Box>
  );
};

export default EyeFollower;
