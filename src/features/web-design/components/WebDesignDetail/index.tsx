import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";
import { X } from "lucide-react";

import Wrapper from "@/components/layout/Wrapper";

import { DEVICE, webDesignList } from "../../constants";
import Display from "../Display";

type WebDesignDetailProps = {
  id: string;
};

const WebDesignDetail = ({ id }: WebDesignDetailProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // --------------------------- Variables ---------------------------
  //region Variables

  const webDesignId = Number(id ?? 1);
  const {
    title,
    subTitle,
    constraints,
    solutions,
    keyThinkings,
    outcome,
    items,
  } = webDesignList[webDesignId];

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper alignItems="center" justifyContent="center">
      <Stack width={1200} direction="row" justifyContent="space-between">
        <Stack width={450} spacing={2.5}>
          <Stack spacing={1.25}>
            <Typography variant="h2" fontSize={24}>
              {title}
            </Typography>
            <Typography variant="subtitle2" color="colors.darkGray3">
              {subTitle}
            </Typography>
          </Stack>
          {constraints.length != 0 && (
            <Stack spacing={0.625}>
              <Typography variant="h4" fontSize={14} color="colors.darkGray3">
                Constaints
              </Typography>
              <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
                {constraints.map((item, index) => (
                  <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                    <Typography variant="caption">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}
          {solutions.length != 0 && (
            <Stack spacing={0.625}>
              <Typography variant="h4" fontSize={14} color="colors.darkGray3">
                Solution
              </Typography>
              <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
                {solutions.map((item, index) => (
                  <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                    <Typography variant="caption">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}
          {keyThinkings.length != 0 && (
            <Stack spacing={0.625}>
              <Typography variant="h4" fontSize={14} color="colors.darkGray3">
                Key Thinking
              </Typography>
              <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
                {keyThinkings.map((item, index) => (
                  <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                    <Typography variant="caption">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}
          <Stack spacing={0.625}>
            <Typography variant="h4" fontSize={14} color="colors.darkGray3">
              Outcome
            </Typography>
            <Typography variant="caption" lineHeight="17px">
              {outcome}
            </Typography>
          </Stack>
        </Stack>
        <Box width={600} height="100%" position="relative">
          {items.map((item, index) => {
            const { width, height, place, device, haveFrame } = item;
            const isIphone = device === DEVICE.I;

            const isHovered = hoverIndex === index;

            const isAnyHovered = hoverIndex !== null;
            const isBlurred = isAnyHovered && !isHovered;

            return (
              <Box
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                top={place.y}
                left={place.x}
                position="absolute"
                borderRadius={isIphone ? 4 : 1}
                zIndex={isHovered ? 999 : isBlurred ? 0 : place.z}
                width={haveFrame ? width * (isIphone ? 1.37 : 1.33) : width}
                height={haveFrame ? height * (isIphone ? 1.15 : 1.27) : height}
                sx={{
                  opacity: isBlurred ? 0.45 : 1,
                  boxShadow: haveFrame
                    ? "none"
                    : "12px 8px 16px rgba(0,0,0,0.3)",
                  transition:
                    "filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  filter: isBlurred
                    ? "blur(4px) brightness(0.8)"
                    : "blur(0px) brightness(1)",
                  transform: isHovered
                    ? "scale(1.1)"
                    : isBlurred
                      ? "scale(0.97)"
                      : "scale(1)",
                }}
              >
                <Display
                  {...item}
                  display="flex"
                  position="relative"
                  isHovered={isHovered}
                  justifyContent="center"
                />
              </Box>
            );
          })}
        </Box>
      </Stack>
      <Box
        left={0}
        right={0}
        bottom={0}
        height={180}
        width="100%"
        display="flex"
        position="absolute"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width={45}
          height={45}
          display="flex"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate("/web-design")}
          sx={{
            color: "colors.bambiiBlack",
            bgcolor: "white",
            cursor: "pointer",
            transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            "&:hover": {
              color: "white",
              transform: "scale(1.1)",
              bgcolor: "colors.bambiiBlack",
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            },
          }}
        >
          <X size={18} />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default WebDesignDetail;
