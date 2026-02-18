import { useEffect } from "react";
import type { RefObject } from "react";

import { Environment, useProgress } from "@react-three/drei";

import { ScrollScene } from "./ScrollScene";

type ExperienceProps = {
  scrollProgressRef: RefObject<number>;
  onLoaded?: () => void;
};

const LoadingTracker = ({ onLoaded }: { onLoaded?: () => void }) => {
  const { active, progress } = useProgress();

  useEffect(() => {
    if (!active && progress === 100 && onLoaded) {
      onLoaded();
    }
  }, [active, progress, onLoaded]);

  return null;
};

export const Experience = ({
  scrollProgressRef,
  onLoaded,
}: ExperienceProps) => {
  return (
    <>
      <LoadingTracker onLoaded={onLoaded} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Environment preset="city" />
      <ScrollScene scrollProgressRef={scrollProgressRef} />
    </>
  );
};
