import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import type { IllustratorItem } from "../../constants";
import { modelDragState } from "../../modelDragState";
import ItemContent from "../ItemContent";

// ─── Physics constants ───

const PHYSICS = {
  gravity: 2400, // px/s² — fast, weighty drop
  restitution: 0, // energy kept per bounce (0 = dead stop, 1 = perfect bounce)
  angularDamping: 0.97, // rotation slow-down per frame @60 fps
  maxBounces: 4, // stop bouncing after this many impacts
  settleVelocity: 25, // px/s — below this we consider it settled
  staggerMs: 120, // ms delay between each item's drop
  initialY: -900, // px above rest position
};

// ─── Types ───

type FallingItemProps = IllustratorItem & {
  index: number;
  isInView: boolean;
  hoveredId: number | null;
  lift: { x: number; y: number } | null; // displacement when a linked item is hovered
  onHover: (id: number | null) => void;
};

// ─── Component ───

const FallingItem = ({
  id,
  variant,
  image,
  hoverImage,
  hoverScale = 1.08,
  hoverX = 0,
  hoverY = 0,
  hoverRotation,
  hoverRotationX,
  hoverRotationY,
  hoverRotationZ,
  noRotateOnHover,
  companion,
  width,
  height,
  x,
  y,
  rotation,
  modelMargin,
  index,
  isInView,
  hoveredId,
  lift,
  onHover,
}: FallingItemProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const physicsRan = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ensure the item is invisible before the first paint
  useLayoutEffect(() => {
    if (outerRef.current) {
      outerRef.current.style.opacity = "0";
    }
  }, []);

  // ─── Physics drop simulation ───
  useEffect(() => {
    const el = outerRef.current;
    if (!isInView || !el || physicsRan.current) return;
    physicsRan.current = true;

    let yOffset = PHYSICS.initialY;
    let vy = 0;
    let rot = (Math.random() - 0.5) * 40; // random initial angle
    let av = (Math.random() - 0.5) * 350; // random angular velocity (deg/s)
    let impactSquash = 0;
    let bounceCount = 0;
    let startTs = 0;
    let lastTs = 0;
    let started = false;
    let frameId: number;
    const delay = index * PHYSICS.staggerMs;

    el.style.willChange = "transform, opacity";

    // Smooth CSS transition to resting state once bouncing is done
    const settle = () => {
      el.style.transition = "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)";
      el.style.transform = "translateY(0px) rotate(0deg) scaleX(1) scaleY(1)";

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        el.style.transition = "";
        el.style.transform = "";
        el.style.willChange = "";
        setSettled(true);
      };
      el.addEventListener("transitionend", finish, { once: true });
      settleTimer.current = setTimeout(finish, 450);
    };

    const step = (now: number) => {
      if (!startTs) {
        startTs = now;
        lastTs = now;
      }

      // Stagger delay
      if (!started) {
        if (now - startTs >= delay) {
          started = true;
          el.style.opacity = "1";
          lastTs = now;
        } else {
          frameId = requestAnimationFrame(step);
          return;
        }
      }

      const dt = Math.min((now - lastTs) / 1000, 0.033);
      lastTs = now;

      // Gravity
      vy += PHYSICS.gravity * dt;
      yOffset += vy * dt;

      // Rotation
      rot += av * dt;
      av *= Math.pow(PHYSICS.angularDamping, dt * 60);

      // Recover impact squash over several frames
      impactSquash *= 0.75;

      // Velocity-based stretch during free-fall / rise
      const speed = Math.abs(vy);
      const stretch = Math.min(speed / 4000, 0.06);
      let sx = 1 + impactSquash * 0.5 - stretch * 0.3;
      let sy = 1 - impactSquash + stretch * 0.4;

      // Hit the ground (yOffset = 0 = rest position)
      if (yOffset >= 0) {
        yOffset = 0;
        bounceCount++;

        // Impact deformation
        impactSquash = Math.min(Math.abs(vy) / 3000, 0.2);
        sx = 1 + impactSquash * 0.5;
        sy = 1 - impactSquash;

        // Bounce
        vy = -Math.abs(vy) * PHYSICS.restitution;
        av *= 0.4;

        if (
          bounceCount >= PHYSICS.maxBounces ||
          Math.abs(vy) < PHYSICS.settleVelocity
        ) {
          settle();
          return;
        }
      }

      el.style.transform = `translateY(${yOffset.toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scaleX(${sx.toFixed(3)}) scaleY(${sy.toFixed(3)})`;
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frameId);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const isHovered = hoveredId === id;
  const isAnyHovered = hoveredId !== null;
  const isLifted = lift !== null;

  // z-index hierarchy: hovered(50) > overlay(30) > others(≤20)
  const zIndex = isHovered ? 50 : variant === "glass" ? 15 : index;

  return (
    <div
      ref={outerRef}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        pointerEvents: "none",
        zIndex,
      }}
    >
      <motion.div
        animate={
          settled
            ? {
              rotate: isHovered
                ? hoverRotation !== undefined
                  ? hoverRotation
                  : noRotateOnHover
                    ? rotation
                    : rotation + (id % 2 === 0 ? 3 : -3)
                : rotation,
              x: isHovered ? hoverX : isLifted ? (lift?.x ?? 0) : 0,
              y: isHovered ? -hoverY : isLifted ? -(lift?.y ?? 0) : 0,
              filter:
                isAnyHovered && !isHovered
                  ? "grayscale(1) opacity(0.4)"
                  : "grayscale(0) opacity(1)",
              scale: isHovered ? hoverScale : isAnyHovered ? 0.97 : 1,
            }
            : undefined
        }
        transition={
          settled
            ? {
              rotate: isHovered
                ? { duration: 0.25, ease: "easeOut" }
                : { type: "spring", damping: 14, stiffness: 80 },
              x: { type: "spring", damping: 14, stiffness: 120 },
              y: { type: "spring", damping: 14, stiffness: 120 },
              filter: { duration: 0.3, ease: "easeOut" },
              scale: { duration: 0.3, ease: "easeOut" },
            }
            : undefined
        }
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ItemContent
          variant={variant}
          image={image}
          hoverImage={hoverImage}
          isHovered={isHovered}
          hoverRotationX={hoverRotationX}
          hoverRotationY={hoverRotationY}
          hoverRotationZ={hoverRotationZ}
          width={width}
          height={height}
          modelMargin={modelMargin}
          onPointerEnter={() => {
            if (!modelDragState.active && settled) onHover(id);
          }}
          onPointerLeave={() => {
            if (!modelDragState.active && settled) onHover(null);
          }}
        />

        {/* Companion element shown on hover */}
        <AnimatePresence>
          {isHovered && companion && (
            <motion.div
              key="companion"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: width + (companion.offsetX ?? 0),
                top: `calc(50% + ${companion.offsetY ?? 0}px)`,
                translateY: "-50%",
                width: width * companion.widthRatio,
                height: height * companion.heightRatio,
                pointerEvents: "none",
              }}
            >
              <img
                src={companion.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  userSelect: "none",
                  display: "block",
                }}
                draggable={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FallingItem;
