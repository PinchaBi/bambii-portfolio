import { Suspense, useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { modelDragState } from "../../modelDragState";

// ─── Animated GLTF model (lerps to hover rotation) ───

type AnimatedModelProps = {
  modelPath: string;
  isActive: boolean;
  targetX: number; // degrees
  targetY: number;
  targetZ: number;
};

const DEG = Math.PI / 180;
const LERP = 0.07;

const AnimatedModel = ({
  modelPath,
  isActive,
  targetX,
  targetY,
  targetZ,
}: AnimatedModelProps) => {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ invalidate }) => {
    invalidate();
    const g = groupRef.current;
    if (!g) return;
    const tx = isActive ? targetX * DEG : 0;
    const ty = isActive ? targetY * DEG : 0;
    const tz = isActive ? targetZ * DEG : 0;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, tx, LERP);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, ty, LERP);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, tz, LERP);
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
};

// ─── Orbit controls that auto-reset when not hovered ───

const LERP_SPEED = 0.07;

const AutoResetControls = ({ hovered }: { hovered: boolean }) => {
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const defaultPos = useRef(new THREE.Vector3());
  const defaultTarget = useRef(new THREE.Vector3());
  const ready = useRef(false);

  // Capture the camera position after Bounds has finished fitting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (controlsRef.current) {
        defaultPos.current.copy(camera.position);
        defaultTarget.current.copy(controlsRef.current.target);
        ready.current = true;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [camera]);

  useFrame(({ invalidate }) => {
    invalidate();
    if (!ready.current || hovered || !controlsRef.current) return;
    camera.position.lerp(defaultPos.current, LERP_SPEED);
    controlsRef.current.target.lerp(defaultTarget.current, LERP_SPEED);
    controlsRef.current.update();
  });

  return (
    <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} />
  );
};

// ─── 3D model card with interactive orbit controls ───

type ModelContentProps = {
  modelPath: string;
  width: number;
  height: number;
  margin?: number;
  isActive?: boolean;
  hoverRotationX?: number;
  hoverRotationY?: number;
  hoverRotationZ?: number;
};

const ModelContent = ({
  modelPath,
  width,
  height,
  margin = 0.8,
  isActive = false,
  hoverRotationX = 0,
  hoverRotationY = 0,
  hoverRotationZ = 0,
}: ModelContentProps) => {
  const [hovered, setHovered] = useState(false);
  const dragging = useRef(false);
  const insideBox = useRef(false);

  useEffect(() => {
    const handlePointerUp = () => {
      if (dragging.current) {
        dragging.current = false;
        modelDragState.active = false;
        // Always clear hover & pending leave so the UI fully resets.
        // If the cursor is still inside, onPointerMove will re-establish hover.
        setHovered(false);
        modelDragState.pendingLeave?.();
        modelDragState.pendingLeave = null;
      }
    };
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  return (
    <Box
      sx={{ width, height, borderRadius: 2.5 }}
      onPointerEnter={() => {
        insideBox.current = true;
        setHovered(true);
      }}
      onPointerLeave={() => {
        insideBox.current = false;
        if (!dragging.current) setHovered(false);
      }}
      onPointerDown={() => {
        dragging.current = true;
        modelDragState.active = true;
      }}
      onPointerMove={() => {
        // Re-establish hover after drag ends if cursor is still inside
        if (!dragging.current && !hovered) {
          insideBox.current = true;
          setHovered(true);
        }
      }}
    >
      <Canvas frameloop="demand" camera={{ position: [0, 0, -4], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <Bounds fit clip margin={margin}>
            <AnimatedModel
              modelPath={modelPath}
              isActive={isActive}
              targetX={hoverRotationX}
              targetY={hoverRotationY}
              targetZ={hoverRotationZ}
            />
          </Bounds>
        </Suspense>
        <AutoResetControls hovered={hovered} />
      </Canvas>
    </Box>
  );
};

export default ModelContent;
