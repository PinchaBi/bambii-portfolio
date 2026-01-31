import { Button, type ButtonProps, Typography, Box } from "@mui/material";
import { motion, type Variants } from "framer-motion";

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
      sx={{
        gap: 0.5,
        borderRadius: borderRadius,
        padding: "6px 12px",
        color: "text.primary",
        position: "relative",
        transition: "all 0.3s ease",
        minWidth: "fit-content", // Ensure it can shrink/grow
        // Glass Style
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backgroundImage:
          "linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
        backdropFilter: "blur(7px)",
        boxShadow: "0px 2px 10px rgba(30, 30, 30, 0.1)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
        borderTop: "1px solid rgba(255, 255, 255, 0.8)",
        borderRight: "1px solid transparent",
        borderBottom: "1px solid transparent",
        ...sx,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0px 2px 10px rgba(30, 30, 30, 0.15)",
          border: "1px solid transparent",
          // Target both Typography and our custom animated text wrapper
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
          //   ...(sx as any)?.["&:hover"],
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -1,
          opacity: 0,
          borderRadius: "inherit",
          padding: "1.5px",
          background: "linear-gradient(to bottom, #F13A7D, #777777)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        },
      }}
      {...props}
    >
      {text ? (
        <Box display="flex" alignItems="center" gap={0.5}>
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
        </Box>
      ) : (
        children
      )}
    </Button>
  );
};

export default GlassButton;
