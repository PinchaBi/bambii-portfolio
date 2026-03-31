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
  scale?: number;
};

const ActivityCard = forwardRef<ActivityCardHandle, ActivityCardProps>(
  ({ activeIndex, scale }, ref) => {
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

    const s = scale ?? 1;
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
        sx={{
          width: "100%",
          maxWidth: Math.round(450 * s),
          aspectRatio: "450 / 290",
          position: "relative",
          pointerEvents: "none",
        }}
      >
        <Stack
          ref={contentRef}
          spacing={Math.max(0.5, 3.75 * s * s)}
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            pointerEvents: "none",
            willChange: "opacity",
          }}
        >
          <Stack sx={{ pointerEvents: "auto" }}>
            <Typography sx={{ fontWeight: 600, fontSize: Math.round(20 * s), lineHeight: 1.3 }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: Math.round(10 * s), lineHeight: "14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {period}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: Math.round(12 * s),
              lineHeight: `${Math.round(16 * s)}px`,
              pointerEvents: "auto",
            }}
          >
            {firstParagraph}
          </Typography>
          <Typography
            sx={{
              fontSize: Math.round(12 * s),
              lineHeight: `${Math.round(16 * s)}px`,
              pointerEvents: "auto",
            }}
          >
            {secondParagraph}
          </Typography>
          <Stack spacing={s < 1 ? 0.75 : 1.25} direction="row" sx={{ pointerEvents: "auto" }}>
            <GlassButton
              onClick={() => setOpen(true)}
              icon={<Users size={s < 1 ? 12 : 16} />}
              text="Group Photo"
              sx={s < 1 ? { fontSize: "10px", padding: "5px 10px", minWidth: 0, "& *": { fontSize: "10px" } } : undefined}
            />

            <GlassButton
              onClick={() => window.open(source, "_blank")}
              icon={<ArrowUpRight size={s < 1 ? 12 : 16} />}
              text="Source"
              sx={s < 1 ? { fontSize: "10px", padding: "5px 10px", minWidth: 0, "& *": { fontSize: "10px" } } : undefined}
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
              <X size={Math.round(20 * s)} />
            </IconButton>
          </Box>
        </Fade>
      </Box>
    );
  },
);

ActivityCard.displayName = "ActivityCard";

export default memo(ActivityCard);
