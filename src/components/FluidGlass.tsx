/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/immutability */
import { memo, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  MeshTransmissionMaterial,
  Preload,
  Scroll,
  ScrollControls,
  Text,
  useFBO,
  useGLTF,
} from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

type Mode = "lens" | "bar" | "cube";

interface NavItem {
  label: string;
  link: string;
}

type ModeProps = Record<string, unknown>;

interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
}

export default function FluidGlass({
  mode = "lens",
  lensProps = {},
  barProps = {},
  cubeProps = {},
}: FluidGlassProps) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const rawOverrides =
    mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;

  const {
    navItems = [
      { label: "Home", link: "" },
      { label: "About", link: "" },
      { label: "Contact", link: "" },
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
      <ScrollControls damping={0.2} pages={3} distance={0.4}>
        {mode === "bar" && <NavItems items={navItems as NavItem[]} />}
        <Wrapper modeProps={modeProps}>
          <Scroll>
            <SceneBackground />
          </Scroll>
          <Scroll html />
          <Preload />
        </Wrapper>
      </ScrollControls>
    </Canvas>
  );
}

type MeshProps = ThreeElements["mesh"];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  // Track mouse via window so canvas can run with pointer-events: none
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    state.invalidate();
    const { gl, viewport, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (mouseRef.current.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (mouseRef.current.y * v.height) / 2
        : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0xeeeeee, 0);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...(typeof extraMat === "object" && extraMat !== null
            ? extraMat
            : {})}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}

function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}

function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 },
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max
      ? "mobile"
      : w <= DEVICE.tablet.max
        ? "tablet"
        : "desktop";
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(({ invalidate }) => {
    invalidate();
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    link.startsWith("#")
      ? (window.location.hash = link)
      : (window.location.href = link);
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function SceneBackground() {
  const { width, height } = useThree((s) => s.viewport);
  const W = width * 4;
  const H = height * 4;
  return (
    <>
      {/* Base — matches page bg */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial color="#EEEEEE" />
      </mesh>
      {/* Large soft pink blob — top-left */}
      <mesh position={[-width * 0.6, height * 0.4, 0]}>
        <circleGeometry args={[width * 0.55, 64]} />
        <meshBasicMaterial color="#FFD9E7" transparent opacity={0.55} />
      </mesh>
      {/* Smaller vivid pink — bottom-right */}
      <mesh position={[width * 0.5, -height * 0.35, 0]}>
        <circleGeometry args={[width * 0.35, 64]} />
        <meshBasicMaterial color="#F13A7D" transparent opacity={0.18} />
      </mesh>
      {/* Mid gray circle — center-right */}
      <mesh position={[width * 0.3, height * 0.1, 0]}>
        <circleGeometry args={[width * 0.25, 64]} />
        <meshBasicMaterial color="#D9D9D9" transparent opacity={0.5} />
      </mesh>
    </>
  );
}
