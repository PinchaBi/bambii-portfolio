import { Suspense, useRef, useState } from "react";

import { Box } from "@mui/material";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "motion/react";
import type * as THREE from "three";

import { illustratorItems } from "../../constants";
import type { IllustratorItem, ItemVariant } from "../../constants";

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

// ─── 3D Model renderer ───

type ModelViewerProps = {
  modelPath: string;
};

const RotatingModel = ({ modelPath }: ModelViewerProps) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={ref} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
};

const ModelContent = ({
  modelPath,
  width,
  height,
}: ModelViewerProps & { width: number; height: number }) => {
  return (
    <Box sx={{ width, height, borderRadius: 2.5 }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <RotatingModel modelPath={modelPath} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </Box>
  );
};

// ─── Falling Item wrapper ───

type FallingItemProps = IllustratorItem & {
  index: number;
  isInView: boolean;
  hoveredId: number | null;
  onHover: (id: number | null) => void;
};

const ItemContent = ({
  variant,
  image,
  width,
  height,
}: {
  variant: ItemVariant;
  image: string;
  width: number;
  height: number;
}) => {
  switch (variant) {
    case "glass":
      return <GlassContent image={image} width={width} height={height} />;
    case "model":
      return <ModelContent modelPath={image} width={width} height={height} />;
    case "image":
    default:
      return (
        <Box
          component="img"
          src={image}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 2.5,
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      );
  }
};

const FallingItem = ({
  id,
  variant,
  image,
  width,
  height,
  x,
  y,
  rotation,
  index,
  isInView,
  hoveredId,
  onHover,
}: FallingItemProps) => {
  const isHovered = hoveredId === id;
  const isAnyHovered = hoveredId !== null;

  return (
    <motion.div
      initial={{ y: -600, opacity: 0, rotate: 0 }}
      animate={
        isInView
          ? {
              y: 0,
              opacity: 1,
              rotate: rotation,
              filter:
                isAnyHovered && !isHovered ? "grayscale(1)" : "grayscale(0)",
              scale: isAnyHovered && !isHovered ? 0.97 : 1,
            }
          : { y: -600, opacity: 0, rotate: 0 }
      }
      whileHover={{
        scale: 1.08,
        rotate: rotation + (id % 2 === 0 ? 3 : -3),
        zIndex: 20,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      transition={{
        y: {
          type: "spring",
          damping: 14,
          stiffness: 80,
          delay: index * 0.12,
        },
        opacity: { duration: 0.3, delay: index * 0.12 },
        rotate: {
          type: "spring",
          damping: 14,
          stiffness: 80,
          delay: index * 0.12,
        },
        filter: { duration: 0.3, ease: "easeOut" },
        scale: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => onHover(id)}
      onHoverEnd={() => onHover(null)}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width,
        height,
        cursor: "pointer",
        zIndex: isHovered ? 20 : index,
      }}
    >
      <ItemContent
        variant={variant}
        image={image}
        width={width}
        height={height}
      />
    </motion.div>
  );
};

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
      {illustratorItems.map((item, index) => (
        <FallingItem
          key={item.id}
          {...item}
          index={index}
          isInView={canAnimate}
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      ))}
    </Box>
  );
};

export default IllustratorCanvas;
