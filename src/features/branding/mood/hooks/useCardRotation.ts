import { useMotionValue, useTransform } from "motion/react";
import type { PanInfo } from "motion/react";

const useCardRotation = (onThresholdExceed?: () => void) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(x, [-100, 100], [60, -60]);
  const rotateY = useTransform(y, [-100, 100], [-60, 60]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 180 || Math.abs(info.offset.y) > 180) {
      onThresholdExceed?.();
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return { x, y, rotateX, rotateY, handleDragEnd };
};

export default useCardRotation;
