import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";

import { ITEM_AMOUNT } from "@/constants/activity";
import { Box, Fade, IconButton, Stack, Typography } from "@mui/material";
import { ArrowUpRight, Users, X } from "lucide-react";

import GlassButton from "@/components/ui/common/GlassButton";

import { activityList } from "../../constants";

export type ActivityCardHandle = {
  updateProgress: (progress: number) => void;
};

type ActivityCardProps = {
  activeIndex: number;
};

const ActivityCard = forwardRef<ActivityCardHandle, ActivityCardProps>(
  ({ activeIndex }, ref) => {
    // --------------------------- Hooks ---------------------------
    //region Hooks

    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Close group photo overlay when active item changes
    useEffect(() => {
      setOpen(false);
    }, [activeIndex]);

    // --------------------------- Imperative handle ---------------------------
    //region Imperative handle

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        if (!contentRef.current) return;
        const nearest = Math.round(progress);
        const opacity = Math.max(0, 1 - Math.abs(progress - nearest) * 3);
        contentRef.current.style.opacity = String(opacity);
      },
    }));

    // --------------------------- Variables ---------------------------
    //region Variables

    const {
      title,
      period,
      firstParagraph,
      secondParagraph,
      groupImage,
      source,
    } = activityList[ITEM_AMOUNT - activeIndex];

    // --------------------------- Renders ---------------------------
    //region Renders

    return (
      <Box
        width={450}
        height={290}
        position="relative"
        sx={{ pointerEvents: "none" }}
      >
        <Stack
          ref={contentRef}
          width="100%"
          height="100%"
          spacing={3.75}
          justifyContent="center"
          sx={{
            pointerEvents: "none",
            willChange: "opacity",
          }}
        >
          <Stack sx={{ pointerEvents: "auto" }}>
            <Typography fontWeight={600} fontSize={20}>
              {title}
            </Typography>
            <Typography variant="overline" lineHeight="14px">
              {period}
            </Typography>
          </Stack>
          <Typography
            variant="caption"
            lineHeight="16px"
            sx={{ pointerEvents: "auto" }}
          >
            {firstParagraph}
          </Typography>
          <Typography
            variant="caption"
            lineHeight="16px"
            sx={{ pointerEvents: "auto" }}
          >
            {secondParagraph}
          </Typography>
          <Stack spacing={1.25} direction="row" sx={{ pointerEvents: "auto" }}>
            <GlassButton
              onClick={() => setOpen(true)}
              icon={<Users size={16} />}
              text="Group Photo"
            />

            <GlassButton
              onClick={() => window.open(source, "_blank")}
              icon={<ArrowUpRight size={16} />}
              text="Source"
            />
          </Stack>
        </Stack>

        <Fade in={open}>
          <Box
            sx={{
              inset: 0,
              zIndex: 10,
              width: "100%",
              height: "100%",
              borderRadius: 2.5,
              position: "absolute",
              bgcolor: "background.paper",
              boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.35)",
              pointerEvents: "auto",
            }}
          >
            <Box
              component="img"
              src={groupImage}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2.5,
                objectFit: "cover",
              }}
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              sx={{
                top: 8,
                right: 8,
                padding: 0.5,
                position: "absolute",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>
        </Fade>
      </Box>
    );
  },
);

ActivityCard.displayName = "ActivityCard";

export default memo(ActivityCard);
