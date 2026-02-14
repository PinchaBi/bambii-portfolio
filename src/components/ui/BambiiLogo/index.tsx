import { useState } from "react";

import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { B_PATHS } from "./paths";

const AnimatedStrokePath = ({
  d,
  tx,
  ty,
  delay,
  duration,
  shouldAnimate,
}: {
  d: string;
  tx: number;
  ty: number;
  delay: number;
  duration: number;
  shouldAnimate: boolean;
}) => {
  return (
    <motion.path
      d={d}
      transform={`translate(${tx}, ${ty})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={2}
      initial={{ strokeDashoffset: shouldAnimate ? 2 : 0 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

type BambiiLogoProps = {
  isLight?: boolean;
  isInProjectView?: boolean;
};

const BambiiLogo = ({ isLight, isInProjectView }: BambiiLogoProps) => {
  const [playCount, setPlayCount] = useState(0);

  const handleMouseEnter = () => {
    setPlayCount((c) => c + 1);
  };

  return (
    <Stack
      width={210}
      spacing={1}
      direction="row"
      alignItems="center"
      onMouseEnter={handleMouseEnter}
      sx={{ cursor: "pointer" }}
    >
      <svg
        viewBox="-8 -10 70 70"
        width={45}
        height={45}
        style={{
          flexShrink: 0,
          color: isLight ? "white" : "black",
          transition: "color 0.6s ease-in-out",
        }}
      >
        {B_PATHS.map((sp, i) => (
          <AnimatedStrokePath
            key={`${i}-${playCount}`}
            d={sp.d}
            tx={sp.tx}
            ty={sp.ty}
            delay={sp.delay}
            duration={sp.duration}
            shouldAnimate={playCount > 0}
          />
        ))}
      </svg>
      <Stack className="text">
        <Typography
          variant="body1"
          lineHeight={1.25}
          color={isLight ? "white" : "text.primary"}
          sx={{ transition: "color 0.6s ease-in-out" }}
        >
          Pincha Khongngoen
        </Typography>
        <Typography
          fontSize={12}
          lineHeight="14px"
          color={isInProjectView ? "white" : "colors.bambiiPink"}
          sx={{ transition: "color 0.6s ease-in-out" }}
        >
          Open for new roles
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BambiiLogo;
