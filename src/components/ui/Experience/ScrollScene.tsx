import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { MathUtils } from "three";
import type * as THREE from "three";

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

  const cusocietyModel = useGLTF(IPHONE_MODELS[0]);
  const elexirModel = useGLTF(IPHONE_MODELS[1]);
  const kiyoModel = useGLTF(IPHONE_MODELS[2]);

  useFrame((_, delta) => {
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
    tl.current.set(groupRef.current.scale, { x: 14, y: 14, z: 14 }, 0);
    tl.current.set(groupRef.current.position, { x: 0, y: -1.2, z: 0 }, 0);
    tl.current.set(groupRef.current.rotation, { x: 0, y: Math.PI, z: 0 }, 0);

    // ── Continuous tweens over the full 0→1 scroll range ──

    // Gradual spin: 2 full rotations (π → 5π) across entire progress
    tl.current.fromTo(
      groupRef.current.rotation,
      { y: Math.PI },
      { duration: 1, y: Math.PI * 5, ease: "none" },
      0,
    );

    // Scale: stay at 14 through CUSociety & Elexir, grow to 20 during Kiyo
    tl.current.fromTo(
      groupRef.current.scale,
      { x: 14, y: 14, z: 14 },
      { duration: 0.25, x: 14, y: 14, z: 14, ease: "none" },
      0,
    );
    tl.current.fromTo(
      groupRef.current.scale,
      { x: 14, y: 14, z: 14 },
      { duration: 0.25, x: 20, y: 20, z: 20, ease: "power1.inOut" },
      0.75,
    );

    // Y position: stay during CUSociety, move up for Elexir, move down for Kiyo
    tl.current.fromTo(
      groupRef.current.position,
      { y: -1.2 },
      { duration: 0.25, y: -1.2, ease: "none" },
      0,
    );
    tl.current.fromTo(
      groupRef.current.position,
      { y: -1.2 },
      { duration: 0.5, y: -0.6, ease: "power1.inOut" },
      0.25,
    );
    tl.current.fromTo(
      groupRef.current.position,
      { y: -0.6 },
      { duration: 0.25, y: -2.2, ease: "power1.inOut" },
      0.75,
    );

    // Horizontal drift: left during first half, back to center during second
    tl.current.fromTo(
      groupRef.current.position,
      { x: 0 },
      { duration: 0.5, x: -1.75, ease: "power1.inOut" },
      0,
    );
    tl.current.fromTo(
      groupRef.current.position,
      { x: -1.75 },
      { duration: 0.5, x: 0, ease: "power1.inOut" },
      0.5,
    );

    return () => {
      tl.current.kill();
    };
  }, []);

  return (
    <group
      ref={groupRef}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI, 0]}
      scale={14}
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
