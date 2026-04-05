import { useRef } from "react";

import { Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { easing } from "maath";
import { Group, Vector3 } from "three";

import { pageAtom, pages } from "../../constants";
import { Book } from "../Book";

// ─── Constants ───

const BOOK_REST_Y = 0.5;
const PAGE_WIDTH = 1.28;

// ─── Types ───

type ExperienceProps = {
  isInteractive: boolean;
  onEntered?: () => void;
  shouldEnter: boolean;
  paused?: boolean;
  baseScale?: number;
  cameraX?: number;
  mobileSide?: "none" | "left" | "right" | "center";
};

// ─── Camera controller ───

const CameraController = ({
  isInteractive,
  paused,
  cameraX = 0.64,
  mobileSide = "none",
}: {
  isInteractive: boolean;
  paused?: boolean;
  cameraX?: number;
  mobileSide?: "none" | "left" | "right" | "center";
}) => {
  const page = useAtomValue(pageAtom);
  const lookAtTarget = useRef(new Vector3(cameraX, BOOK_REST_Y, 0));

  useFrame(({ camera, invalidate }, delta) => {
    if (paused) return;
    const hasOpenPages = isInteractive && page > 0;

    let targetPos: [number, number, number];
    let targetLookAt: [number, number, number];

    if (mobileSide === "left" && hasOpenPages) {
      targetPos = [-0.75, 0, 4];
      targetLookAt = [-0.75, BOOK_REST_Y, 0];
    } else if (mobileSide === "right" && hasOpenPages) {
      targetPos = [0.75, 0, 4];
      targetLookAt = [0.75, BOOK_REST_Y, 0];
    } else if (mobileSide === "center") {
      // Mobile back cover — centered
      targetPos = [-0.5, 0, 4];
      targetLookAt = [-0.25, BOOK_REST_Y, 0];
    } else if (hasOpenPages) {
      // Desktop/tablet open book — camera moves up to look down at spread
      targetPos = [-0.5, 1, 4];
      targetLookAt = [0, BOOK_REST_Y, 0];
    } else {
      // Closed book — centered
      targetPos = [cameraX, 0, 4];
      targetLookAt = [cameraX, BOOK_REST_Y, 0];
    }

    easing.damp3(camera.position, targetPos, 0.6, delta);
    easing.damp3(lookAtTarget.current, targetLookAt, 0.6, delta);
    camera.lookAt(lookAtTarget.current);
    camera.updateProjectionMatrix();
    invalidate();
  });
  return null;
};

// ─── Book entrance + manual float ───

type BookEntranceProps = {
  isInteractive: boolean;
  onEntered?: () => void;
  shouldEnter: boolean;
  paused?: boolean;
  baseScale?: number;
};

const BookEntrance = ({
  isInteractive,
  onEntered,
  shouldEnter,
  paused,
  baseScale = 1,
}: BookEntranceProps) => {
  const groupRef = useRef<Group>(null!);
  const floatGroupRef = useRef<Group>(null!);
  const initialized = useRef(false);
  const landed = useRef(false);

  const page = useAtomValue(pageAtom);

  useFrame((state, delta) => {
    if (paused || !groupRef.current) return;

    const { invalidate } = state;

    // ── Entrance: set start position on first frame ──
    if (!initialized.current) {
      groupRef.current.position.y = -5;
      initialized.current = true;
      invalidate();
      return;
    }

    // ── Hold below viewport until text has finished revealing ──
    if (!shouldEnter) return;

    // ── Page-driven X centering — only offset once pages are actually open ──
    const targetX =
      isInteractive && page > 0 ? (page / pages.length - 0.5) * PAGE_WIDTH : 0;

    easing.damp3(
      groupRef.current.position,
      [targetX, BOOK_REST_Y, 0],
      0.5,
      delta,
    );

    // ── Notify parent once landed ──
    if (
      !landed.current &&
      Math.abs(groupRef.current.position.y - BOOK_REST_Y) < 0.1
    ) {
      landed.current = true;
      onEntered?.();
    }

    // ── Scale: larger when interactive, responsive via baseScale ──
    const targetScale = isInteractive ? 1.3 * baseScale : baseScale;
    easing.damp3(
      groupRef.current.scale,
      [targetScale, targetScale, targetScale],
      0.3,
      delta,
    );

    // ── Float animation: manual so we can always return to rest ──
    if (!floatGroupRef.current) return;

    if (isInteractive) {
      const t = state.clock.elapsedTime;
      floatGroupRef.current.rotation.x = Math.cos(t * 0.4) * 0.08;
      floatGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
      floatGroupRef.current.rotation.z = Math.sin(t * 0.6) * 0.04;
      floatGroupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    } else {
      // Smoothly return to the exact same resting rotation every time
      easing.dampAngle(floatGroupRef.current.rotation, "x", 0, 0.3, delta);
      easing.dampAngle(floatGroupRef.current.rotation, "y", 0, 0.3, delta);
      easing.dampAngle(floatGroupRef.current.rotation, "z", 0, 0.3, delta);
      easing.damp3(floatGroupRef.current.position, [0, 0, 0], 0.3, delta);
    }

    invalidate();
  });

  return (
    <group ref={groupRef}>
      <group ref={floatGroupRef}>
        <Book paused={paused} />
      </group>
    </group>
  );
};

// ─── Experience ───

export const Experience = ({
  isInteractive,
  onEntered,
  shouldEnter,
  paused,
  baseScale,
  cameraX,
  mobileSide = "none",
}: ExperienceProps) => {
  return (
    <>
      <CameraController
        isInteractive={isInteractive}
        paused={paused}
        cameraX={cameraX}
        mobileSide={mobileSide}
      />

      <BookEntrance
        isInteractive={isInteractive}
        onEntered={onEntered}
        shouldEnter={shouldEnter}
        paused={paused}
        baseScale={baseScale}
      />

      <OrbitControls
        enabled={isInteractive && mobileSide === "none"}
        enableZoom={false}
      />

      <Environment preset="studio" environmentIntensity={0.5} />

      <directionalLight
        position={[0, 5, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
