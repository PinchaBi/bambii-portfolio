import { useRef } from "react";

import { Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { easing } from "maath";
import { Group } from "three";

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
};

// ─── Camera controller ───

const CameraController = ({ isInteractive }: { isInteractive: boolean }) => {
  const page = useAtomValue(pageAtom);

  useFrame(({ camera }, delta) => {
    // Only shift camera sideways once pages are actually open
    const hasOpenPages = isInteractive && page > 0;
    const targetPos: [number, number, number] = hasOpenPages
      ? [-0.5, 1, 4]
      : [0.64, 0, 4];
    const lookAt: [number, number, number] = hasOpenPages
      ? [0, BOOK_REST_Y, 0]
      : [0.64, BOOK_REST_Y, 0];
    easing.damp3(camera.position, targetPos, 0.6, delta);
    camera.lookAt(...lookAt);
    camera.updateProjectionMatrix();
  });
  return null;
};

// ─── Book entrance + manual float ───

type BookEntranceProps = {
  isInteractive: boolean;
  onEntered?: () => void;
  shouldEnter: boolean;
};

const BookEntrance = ({
  isInteractive,
  onEntered,
  shouldEnter,
}: BookEntranceProps) => {
  const groupRef = useRef<Group>(null!);
  const floatGroupRef = useRef<Group>(null!);
  const initialized = useRef(false);
  const landed = useRef(false);

  const page = useAtomValue(pageAtom);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // ── Entrance: set start position on first frame ──
    if (!initialized.current) {
      groupRef.current.position.y = -5;
      initialized.current = true;
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

    // ── Scale: larger when interactive ──
    const targetScale = isInteractive ? 1.3 : 1;
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
  });

  return (
    <group ref={groupRef}>
      <group ref={floatGroupRef}>
        <Book />
      </group>
    </group>
  );
};

// ─── Experience ───

export const Experience = ({
  isInteractive,
  onEntered,
  shouldEnter,
}: ExperienceProps) => {
  return (
    <>
      <CameraController isInteractive={isInteractive} />

      <BookEntrance
        isInteractive={isInteractive}
        onEntered={onEntered}
        shouldEnter={shouldEnter}
      />

      <OrbitControls enabled={isInteractive} enableZoom={false} />

      <Environment preset="studio" />

      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
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
