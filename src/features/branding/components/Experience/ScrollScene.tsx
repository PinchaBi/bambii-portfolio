import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { MathUtils } from "three";
import type * as THREE from "three";

// Linearly interpolate a value between two viewport widths
const lerp = (minVw: number, maxVw: number, minVal: number, maxVal: number, vw: number) => {
  const t = Math.max(0, Math.min(1, (vw - minVw) / (maxVw - minVw)));
  return minVal + t * (maxVal - minVal);
};

const IPHONE_MODELS = [
  "/images/branding/3d/cusociety_Light.glb",
  "/images/branding/3d/elexir_Light.glb",
  "/images/branding/3d/kiyo_Light.glb",
];

// Preload all models
IPHONE_MODELS.forEach((path) => useGLTF.preload(path));

type ScrollSceneProps = {
  scrollProgressRef: RefObject<number>;
};

export const ScrollScene = ({ scrollProgressRef }: ScrollSceneProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  const cusocietyRef = useRef<THREE.Group>(null!);
  const elexirRef = useRef<THREE.Group>(null!);
  const kiyoRef = useRef<THREE.Group>(null!);
  const tl = useRef<gsap.core.Timeline>(null!);

  const smoothProgress = useRef(0);
  // Track viewport width reactively
  const [vw, setVw] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Responsive — fluid interpolation based on viewport width
  const isMobile = vw < 600;
  const isTablet = vw >= 600 && vw < 1200;
  const isSmallScreen = vw < 750;

  // ── CUSociety section (progress 0–0.25) ──
  // Phone centered on the image collage area
  const initialX = isMobile
    ? lerp(320, 599, 0.2, 0.3, vw)
    : isTablet
      ? lerp(600, 1199, 0.3, 0.8, vw)
      : 0;
  const initialY = isMobile
    ? lerp(320, 599, -0.2, -0.3, vw)
    : isTablet
      ? lerp(600, 1199, -0.3, -0.6, vw)
      : -1.2;
  const initialScale = isMobile
    ? lerp(320, 599, 5, 7, vw)
    : isTablet
      ? lerp(600, 1199, 7, 12, vw)
      : 14;

  // ── Elexir section (progress 0.25–0.75) ──
  const elexirX = isMobile
    ? 0
    : isTablet
      ? lerp(600, 1199, -0.8, -1.4, vw)
      : -1.55;
  const elexirY = isMobile
    ? 0.8
    : isTablet
      ? lerp(600, 1199, -0.4, -0.6, vw)
      : -0.6;
  const elexirScale = isMobile
    ? lerp(320, 599, 7, 9, vw)
    : isTablet
      ? lerp(600, 1199, 9, 13, vw)
      : 14;

  const cusocietyModel = useGLTF(IPHONE_MODELS[0]);
  const elexirModel = useGLTF(IPHONE_MODELS[1]);
  const kiyoModel = useGLTF(IPHONE_MODELS[2]);

  useFrame(({ invalidate }, delta) => {
    invalidate();
    const target = scrollProgressRef.current ?? 0;

    // Framerate-independent exponential smoothing — eliminates jitter
    // from variable scroll velocity and event timing mismatches
    smoothProgress.current = MathUtils.damp(
      smoothProgress.current,
      target,
      6, // lambda: higher = snappier, lower = smoother
      delta,
    );

    const progress = smoothProgress.current;

    // Seek GSAP timeline based on smoothed progress
    tl.current.seek(progress * tl.current.duration());

    // Swap model when back faces camera (rotation = 2π at 0.25, 4π at 0.75)
    cusocietyRef.current.visible = progress < 0.25;
    elexirRef.current.visible = progress >= 0.25 && progress < 0.75;
    kiyoRef.current.visible = progress >= 0.75;
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // Pin initial state at position 0
    tl.current.set(
      groupRef.current.scale,
      { x: initialScale, y: initialScale, z: initialScale },
      0,
    );
    tl.current.set(
      groupRef.current.position,
      { x: initialX, y: initialY, z: 0 },
      0,
    );
    tl.current.set(groupRef.current.rotation, { x: 0, y: Math.PI, z: 0 }, 0);

    // ── Continuous tweens over the full 0→1 scroll range ──

    // Gradual spin: 2 full rotations (π → 5π) across entire progress
    tl.current.fromTo(
      groupRef.current.rotation,
      { y: Math.PI },
      { duration: 1, y: Math.PI * 5, ease: "none" },
      0,
    );

    // ── Scale ──
    // CUSociety: hold at initialScale
    // Elexir: transition to elexirScale
    // Kiyo: grow to kiyoScale
    const kiyoScale = isMobile
      ? lerp(320, 599, 9, 11, vw)
      : isTablet
        ? lerp(600, 1199, 13, 17, vw)
        : 20;
    tl.current.fromTo(
      groupRef.current.scale,
      { x: initialScale, y: initialScale, z: initialScale },
      {
        duration: 0.25,
        x: initialScale,
        y: initialScale,
        z: initialScale,
        ease: "none",
      },
      0,
    );
    tl.current.fromTo(
      groupRef.current.scale,
      { x: initialScale, y: initialScale, z: initialScale },
      {
        duration: 0.1,
        x: elexirScale,
        y: elexirScale,
        z: elexirScale,
        ease: "power1.inOut",
      },
      0.25,
    );
    tl.current.fromTo(
      groupRef.current.scale,
      { x: elexirScale, y: elexirScale, z: elexirScale },
      {
        duration: 0.4,
        x: elexirScale,
        y: elexirScale,
        z: elexirScale,
        ease: "none",
      },
      0.35,
    );
    tl.current.fromTo(
      groupRef.current.scale,
      { x: elexirScale, y: elexirScale, z: elexirScale },
      {
        duration: 0.25,
        x: kiyoScale,
        y: kiyoScale,
        z: kiyoScale,
        ease: "power1.inOut",
      },
      0.75,
    );

    // ── Y position ──
    // CUSociety: hold at initialY
    // Elexir: move to elexirY
    // Kiyo: move down
    tl.current.fromTo(
      groupRef.current.position,
      { y: initialY },
      { duration: 0.25, y: initialY, ease: "none" },
      0,
    );
    tl.current.fromTo(
      groupRef.current.position,
      { y: initialY },
      { duration: 0.5, y: elexirY, ease: "power1.inOut" },
      0.25,
    );
    const kiyoY = isMobile ? -0.5 : isSmallScreen ? -0.6 : -2.2;
    const kiyoX = isSmallScreen ? 0 : 0;
    tl.current.fromTo(
      groupRef.current.position,
      { y: elexirY },
      { duration: 0.25, y: kiyoY, ease: "power1.inOut" },
      0.75,
    );

    // ── X position ──
    // CUSociety → Elexir: drift from initialX to elexirX
    // Elexir → Kiyo: drift from elexirX back to center
    tl.current.fromTo(
      groupRef.current.position,
      { x: initialX },
      { duration: 0.5, x: elexirX, ease: "power1.inOut" },
      0,
    );
    tl.current.fromTo(
      groupRef.current.position,
      { x: elexirX },
      { duration: 0.5, x: kiyoX, ease: "power1.inOut" },
      0.5,
    );

    return () => {
      tl.current.kill();
    };
  }, [
    initialX,
    initialY,
    initialScale,
    isMobile,
    isSmallScreen,
    isTablet,
    elexirX,
    elexirY,
    elexirScale,
    vw,
  ]);

  return (
    <group
      ref={groupRef}
      position={[initialX, initialY, 0]}
      rotation={[0, Math.PI, 0]}
      scale={initialScale}
    >
      {/* CU Society iPhone */}
      <group ref={cusocietyRef}>
        <primitive object={cusocietyModel.scene} />
      </group>

      {/* Elexir iPhone */}
      <group ref={elexirRef} visible={false} rotation={[0.15, 0.15, 0]}>
        <primitive object={elexirModel.scene} />
      </group>

      {/* Kiyo iPhone */}
      <group ref={kiyoRef} visible={false} rotation={[0.15, 0, 0]}>
        <primitive object={kiyoModel.scene} />
      </group>
    </group>
  );
};
