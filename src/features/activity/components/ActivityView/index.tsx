import { ITEM_AMOUNT } from "@/constants/activity";
import { Stack, Typography } from "@mui/material";
import { ArrowDown, ArrowUp } from "lucide-react";

import useCarousel from "@/hooks/useCarousel";

import GradualBlur from "@/components/animate-ui/GradualBlur";
import Wrapper from "@/components/layout/Wrapper";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import GlassButton from "@/components/ui/common/GlassButton";

import ActivityCard from "../ActivityCard";
import ActivityCarousel from "../ActivityCarousel";
import ActivitySelector from "../ActivitySelector";

const ActivityView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const { index, setIndex, handlePrev, handleNext } = useCarousel<undefined>(
    Array.from({ length: ITEM_AMOUNT }),
  );

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper zIndex={1} bgcolor="colors.bambiiGray">
      <BackgroundRippleEffect rows={15} />
      <svg
        width={0}
        height={0}
        style={{ position: "absolute", visibility: "hidden" }}
      >
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F13A7D" />
          <stop offset="100%" stopColor="#777777" />
        </linearGradient>
      </svg>
      <Stack
        zIndex={1}
        spacing={7.5}
        height="100%"
        direction="row"
        position="relative"
        sx={{ pointerEvents: "none" }}
      >
        <Stack
          width={500}
          spacing={1.25}
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography variant="h2" width={325} fontFamily="PlayfairDisplay">
            Selected Activities & Competitions
          </Typography>
          <Typography variant="body1" width={325} color="colors.darkGray3">
            2023 - 2025
          </Typography>
        </Stack>
        <Stack width={720} spacing={3.75} direction="row" alignItems="center">
          <ActivityCarousel centerIndex={index} />
          <ActivityCard key={index} centerIndex={index} />
        </Stack>

        <Stack
          width={70}
          spacing={3.75}
          position="relative"
          justifyContent="center"
        >
          <GlassButton
            onClick={handlePrev}
            borderRadius={6.25}
            sx={{
              pointerEvents: "auto",
              "&:hover": {
                "& svg": {
                  stroke: "#F13A7D",
                },
              },
            }}
          >
            <ArrowUp />
          </GlassButton>
          <ActivitySelector centerIndex={index} setCenterIndex={setIndex} />
          <GlassButton
            onClick={handleNext}
            borderRadius={6.25}
            sx={{
              pointerEvents: "auto",
              "&:hover": {
                "& svg": {
                  stroke: "#F13A7D",
                },
              },
            }}
          >
            <ArrowDown />
          </GlassButton>
        </Stack>
      </Stack>
      <GradualBlur
        target="parent"
        position="top"
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={2}
      />
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={2}
      />
    </Wrapper>
  );
};

export default ActivityView;
