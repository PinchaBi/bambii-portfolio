import { useState } from "react";

import { Box, Fade, IconButton, Stack, Typography } from "@mui/material";
import { ArrowUpRight, Users, X } from "lucide-react";

import GlassButton from "@/components/ui/common/GlassButton";

import { activityList } from "../../constants";

type ActivityCardProps = {
  centerIndex: number;
};

const ActivityCard = ({ centerIndex }: ActivityCardProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const [open, setOpen] = useState(false);

  // --------------------------- Variables ---------------------------
  //region Variabless

  const { title, period, firstParagraph, secondParagraph, groupImage, source } =
    activityList[5 - centerIndex];

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box
      position="relative"
      width={450}
      height={290}
      sx={{ pointerEvents: "none" }}
    >
      <Stack
        width="100%"
        height="100%"
        spacing={3.75}
        justifyContent="center"
        sx={{ pointerEvents: "none" }}
      >
        <Stack sx={{ pointerEvents: "auto" }}>
          <Fade in={true} timeout={1000} style={{ transitionDelay: "100ms" }}>
            <Typography fontWeight={600} fontSize={20}>
              {title}
            </Typography>
          </Fade>
          <Fade in={true} timeout={1000} style={{ transitionDelay: "200ms" }}>
            <Typography variant="overline" lineHeight="14px">
              {period}
            </Typography>
          </Fade>
        </Stack>
        <Fade in={true} timeout={1000} style={{ transitionDelay: "300ms" }}>
          <Typography
            variant="caption"
            lineHeight="16px"
            sx={{ pointerEvents: "auto" }}
          >
            {firstParagraph}
          </Typography>
        </Fade>
        <Fade in={true} timeout={1000} style={{ transitionDelay: "400ms" }}>
          <Typography
            variant="caption"
            lineHeight="16px"
            sx={{ pointerEvents: "auto" }}
          >
            {secondParagraph}
          </Typography>
        </Fade>
        <Fade in={true} timeout={1000} style={{ transitionDelay: "500ms" }}>
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
        </Fade>
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
};

export default ActivityCard;
