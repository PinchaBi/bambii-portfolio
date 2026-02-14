import { Button, type ButtonProps, Typography, Box } from "@mui/material";
import { motion, type Variants } from "motion/react";
import GlassSurface from "@/components/ui/GlassSurface";

interface GlassButtonProps extends ButtonProps {
  borderRadius?: number | string;
  text?: string;
  icon?: React.ReactNode;
}

const GlassButton = ({
  children,
  borderRadius = 7.5,
  text,
  icon,
  sx,
  ...props
}: GlassButtonProps) => {
  // Animation variants for specific characters
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      width: "auto",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      width: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Button
      component={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      sx={{
        gap: 0.5,
        borderRadius: borderRadius,
        padding: "6px 12px",
        color: "text.primary",
        position: "relative",
        overflow: "hidden", // Ensure glass doesn't overflow
        minWidth: "fit-content",
        backgroundColor: "transparent",
        boxShadow: "0px 4px 24px -1px rgba(0, 0, 0, 0.2)",
        border: "none",
        ...sx,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0px 8px 32px -1px rgba(0, 0, 0, 0.3)",
          "& .MuiTypography-root, & .glass-text": {
            fontWeight: 500,
            background: "linear-gradient(to bottom, #F13A7D, #777777)",
            backgroundClip: "text",
            color: "transparent",
          },
          "& svg": {
            stroke: "url(#icon-gradient)",
          },
          "&::before": {
            opacity: 1,
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0,
          borderRadius: "inherit",
          padding: "1.5px", // Border width
          background: "linear-gradient(to bottom, #F13A7D, #777777)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          zIndex: 2, // Above glass surface
        },
      }}
      {...props}
    >
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={typeof borderRadius === "number" ? borderRadius : 20}
        displace={0.5}
        distortionScale={0}
        redOffset={0}
        greenOffset={0}
        blueOffset={0}
        brightness={100}
        opacity={0.9}
        backgroundOpacity={0.3}
        mixBlendMode="screen"
        className="absolute inset-0 pointer-events-none"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />

      {/* Content wrapper to stay above glass */}
      <Box position="relative" zIndex={1} display="flex" alignItems="center" gap={0.5}>
        {text ? (
          <>
            {icon}
            <motion.div
              className="glass-text"
              style={{ display: "flex", overflow: "hidden" }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  <Typography
                    variant="overline"
                    lineHeight="14px"
                    component="span"
                  >
                    {char}
                  </Typography>
                </motion.span>
              ))}
            </motion.div>
          </>
        ) : (
          children
        )}
      </Box>
    </Button>
  );
};

export default GlassButton;
