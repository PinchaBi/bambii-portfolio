import { useEffect, useState } from "react";

import useRevealStore from "@/stores/revealStore";
import { Box, Typography } from "@mui/material";

const RevealCount = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const { isRevealed, setRevealed } = useRevealStore();

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact-view");
      const activitySection = document.getElementById("activity-view");

      if (!contactSection || !activitySection) return;

      const contactRect = contactSection.getBoundingClientRect();
      const activityRect = activitySection.getBoundingClientRect();

      // Only calculate if ActivityView is fully visible (top <= 0)
      // or if ContactView is entering the viewport
      if (activityRect.top <= 0) {
        const percentage = Math.max(
          0,
          Math.min(
            100,
            100 - Math.floor((contactRect.top / window.innerHeight) * 100),
          ),
        );
        setCount(percentage);
        if (percentage === 100) {
          setRevealed(true);
        }
      } else {
        setCount(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box
      bottom={20}
      left={80}
      zIndex={100}
      position="fixed"
      sx={{
        transition: "all 0.3s ease",
        opacity: count && !isRevealed ? "100%" : 0,
      }}
    >
      <Typography variant="h1" fontSize={80} color="white">
        {count}
      </Typography>
    </Box>
  );
};

export default RevealCount;
