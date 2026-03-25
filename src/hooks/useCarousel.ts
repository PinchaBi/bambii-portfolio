import { useCallback, useState } from "react";

const useCarousel = <T>(items: T[]) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [index, setIndex] = useState<number>(0);

  // --------------------------- Navigation ---------------------------
  //region Navigation

  const goNext = useCallback(() => {
    setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goPrev();
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goNext();
  };

  return { index, setIndex, handlePrev, handleNext, goNext, goPrev };
};

export default useCarousel;
