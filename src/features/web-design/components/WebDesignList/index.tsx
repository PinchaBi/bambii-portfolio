import { useState } from "react";

import { useSearchParams } from "react-router-dom";

import { ITEM_AMOUNT } from "@/constants/web-design";
import { Box, Stack, Typography } from "@mui/material";

import { captureHeroRect, DEVICE, webDesignList } from "../../constants";
import Display from "../Display";

type WebDesignListProps = {
  hiddenHeroId: string | null;
};

const WebDesignList = ({ hiddenHeroId }: WebDesignListProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const [, setSearchParams] = useSearchParams();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const enterItem = (id: number) => {
    const el = document.querySelector(`[data-hero-id="${id}"]`);
    if (el) {
      const r = el.getBoundingClientRect();
      captureHeroRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    setSearchParams({ project: String(id) });
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      pl={5}
      pr={10}
      height="100%"
      direction="row"
      width="max-content"
      alignItems="flex-end"
    >
      {Array.from({ length: ITEM_AMOUNT }).map((_, index) => {
        const {
          width: mainWidth,
          height: mainHeight,
          name,
          socialTitle,
          items,
        } = webDesignList[index + 1];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { width, height, ...mainItem } = items[0];

        const isIphone = mainItem.device === DEVICE.I;
        const isHidden = hiddenHeroId === String(index + 1);

        const stackWidth = isIphone ? 240 : 500;
        const boxWidth = isIphone ? 165 : 468;

        const shift = 20;
        const isHovered = hoverIndex === index;

        let transformStyle = "";
        let itemZ = 0;
        if (isHovered) {
          itemZ = 10;
        } else if (hoverIndex !== null) {
          if (index < hoverIndex) transformStyle = `translateX(-${shift}px)`;
          else if (index > hoverIndex)
            transformStyle = `translateX(${shift}px)`;
        }

        return (
          <Stack
            key={index}
            onClick={() => enterItem(index + 1)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            padding={2}
            width={stackWidth}
            textAlign="center"
            alignItems="center"
            justifyContent="flex-end"
            spacing={isHovered ? 4 : 2}
            height={isIphone ? 450 : 420}
            sx={{
              cursor: "pointer",
              position: "relative",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform, width",
              zIndex: itemZ,
              transform: transformStyle,
            }}
          >
            <Stack
              className="header"
              alignItems="center"
              sx={{
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered ? "translateY(-60px)" : "none",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: isHovered ? 28 : 24,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: isHovered ? 1 : 0.5,
                  transform: isHovered ? "scale(1.1)" : "",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {socialTitle}
              </Typography>
            </Stack>
            <Box
              className="display"
              height={290}
              width={boxWidth}
              sx={{
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered ? "translateY(-30px) scale(1.3)" : "none",
              }}
            >
              <Box
                data-hero-id={index + 1}
                sx={{
                  width: "100%",
                  height: "100%",
                  visibility: isHidden ? "hidden" : "visible",
                }}
              >
                <Display
                  {...mainItem}
                  isHovered={isHovered}
                  width={mainWidth}
                  height={mainHeight}
                  display="flex"
                  position="relative"
                  justifyContent="center"
                />
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default WebDesignList;
