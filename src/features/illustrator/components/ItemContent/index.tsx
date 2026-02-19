import { Box } from "@mui/material";

import type { ItemVariant } from "../../constants";
import { modelDragState } from "../../modelDragState";
import ModelContent from "../ModelContent";

// ─── Glass Surface wrapper for logo items ───

type GlassContentProps = {
  image: string;
  width: number;
  height: number;
};

const GlassContent = ({ image, width, height }: GlassContentProps) => {
  const size = Math.min(width, height);

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.6), rgba(255,255,255,0.15))",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4)",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{
          width: "65%",
          height: "65%",
          objectFit: "contain",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

// ─── Variant switcher ───

type ItemContentProps = {
  variant: ItemVariant;
  image: string;
  hoverImage?: string;
  isHovered?: boolean;
  hoverRotationX?: number;
  hoverRotationY?: number;
  hoverRotationZ?: number;
  width: number;
  height: number;
  modelMargin?: number;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

const ItemContent = ({
  variant,
  image,
  hoverImage,
  isHovered,
  hoverRotationX,
  hoverRotationY,
  hoverRotationZ,
  width,
  height,
  modelMargin,
  onPointerEnter,
  onPointerLeave,
}: ItemContentProps) => {
  const hoverProps = { onPointerEnter, onPointerLeave };

  switch (variant) {
    case "glass":
      return (
        <Box
          {...hoverProps}
          sx={{ pointerEvents: "auto", width: "fit-content" }}
        >
          <GlassContent image={image} width={width} height={height} />
        </Box>
      );
    case "model":
      return (
        <Box
          onPointerEnter={onPointerEnter}
          onPointerMove={() => {
            // Re-establish FallingItem hover after drag ends
            if (!modelDragState.active) onPointerEnter();
          }}
          onPointerLeave={() => {
            if (modelDragState.active) {
              modelDragState.pendingLeave = onPointerLeave;
            } else {
              onPointerLeave();
            }
          }}
          sx={{ pointerEvents: "auto", width: "fit-content" }}
        >
          <ModelContent
            modelPath={image}
            width={width}
            height={height}
            margin={modelMargin}
            isActive={isHovered}
            hoverRotationX={hoverRotationX}
            hoverRotationY={hoverRotationY}
            hoverRotationZ={hoverRotationZ}
          />
        </Box>
      );
    case "image":
    default:
      return (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Visual layer — no pointer events */}
          <Box
            component="img"
            src={isHovered && hoverImage ? hoverImage : image}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2.5,
              objectFit: "contain",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
          {/* Hit area — smaller than bounding box */}
          <Box
            {...hoverProps}
            sx={{
              position: "absolute",
              inset: "15%",
              pointerEvents: "auto",
            }}
          />
        </Box>
      );
  }
};

export default ItemContent;
