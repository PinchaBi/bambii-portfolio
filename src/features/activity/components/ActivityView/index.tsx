import ActivityCard from "../ActivityCard";
import useCarousel from "@/hooks/useCarousel";
import { ArrowDown, ArrowUp } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import { Stack, Typography } from "@mui/material";
import ActivityCarousel from "../ActivityCarousel";
import ActivitySelector from "../ActivitySelector";
import { ITEM_AMOUNT } from "@/constants/activity";
import GlassButton from "@/components/ui/common/GlassButton";

const ActivityView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const { index, setIndex, handlePrev, handleNext } = useCarousel<undefined>(
    Array.from({ length: ITEM_AMOUNT }),
  );

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      sx={{
        gap: 7.5,
        zIndex: 1,
        flexDirection: "row",
      }}
    >
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
        width={500}
        spacing={1.25}
        justifyContent="center"
        alignItems="flex-end"
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
    </Wrapper>
  );
};

export default ActivityView;
