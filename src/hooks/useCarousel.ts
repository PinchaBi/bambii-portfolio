import { useState } from "react";

const useCarousel = <T>(items: T[]) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [index, setIndex] = useState<number>(0);

  // --------------------------- Hooks ---------------------------
  //region Hooks

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? items.length - 1 : index - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIndex((prev) => (prev === items.length - 1 ? 0 : index + 1));
  };

  return { index, setIndex, handlePrev, handleNext };
};

export default useCarousel;
