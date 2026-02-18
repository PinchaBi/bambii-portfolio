import { useState } from "react";

import { Box, Stack } from "@mui/material";

import { elexirList } from "../../constants";
import type { ElexirItem } from "../../constants";

const ElexirCarousel = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const [items, setItems] = useState<ElexirItem[]>(elexirList);

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const handleSelect = (id: number) => {
    setItems((prev) => {
      const newList = [...prev];
      const selectIndex = newList.findIndex((item) => item.id === id);
      const [selectItem] = newList.splice(selectIndex, 1);
      newList.unshift(selectItem);
      return newList;
    });
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  const getCardStyles = (index: number) => {
    const isSelected = index === 0;

    const translateXValues = [0, 260, 410, 560];

    return {
      borderRadius: 2.5,
      objectFit: "cover",
      position: "absolute",
      zIndex: items.length - index,
      width: isSelected ? 285 : 135,
      height: isSelected ? 355 : 170,
      cursor: isSelected ? "default" : "pointer",
      boxShadow: isSelected
        ? "0px 8px 30px rgba(0, 0, 0, 0.25)"
        : `0px ${4 - index}px ${12 - index * 2}px rgba(0, 0, 0, 0.15)`,
      transition: `
        transform 1s cubic-bezier(0.34, 1.56, 0.64, 1),
        width 0.6s cubic-bezier(0.25, 1, 0.5, 1),
        height 0.6s cubic-bezier(0.25, 1, 0.5, 1),
        opacity 0.5s ease,
        filter 0.5s ease,
        box-shadow 0.5s ease
      `,
      transform: isSelected
        ? "translateX(0px) translateY(0px) scale(1)"
        : `translateX(${translateXValues[index]}px) translateY(0px) scale(1)`,
      "&:hover": isSelected
        ? {}
        : {
            opacity: 1,
            filter: "brightness(1)",
            transform: `translateX(${translateXValues[index]}px) translateY(-8px) scale(1.05)`,
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
          },
    };
  };

  return (
    <Stack width="100%" height={360} direction="row" alignItems="center">
      {items.map((elexir, index) => {
        const { id, image } = elexir;

        return (
          <Box
            key={id}
            onClick={() => handleSelect(id)}
            component="img"
            src={image}
            sx={getCardStyles(index)}
          />
        );
      })}
    </Stack>
  );
};

export default ElexirCarousel;
