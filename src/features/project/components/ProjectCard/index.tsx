import { MoveRight } from "lucide-react";
import { backgroundAvticeList } from "../../constants";
import { Box, Stack, Typography } from "@mui/material";
import type { ProjectCardType } from "./types";

type ProjectCardProps = ProjectCardType & {
  index: number;
  mode: "default" | "active";
};

const ProjectCard = ({ index, title, image, mode }: ProjectCardProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      width={425}
      height={390}
      borderRadius={5}
      padding="20px 0px"
      position="relative"
      alignItems="center"
      sx={{
        cursor: "pointer",
        transition: "all 0.5s ease",
        backgroundColor:
          mode === "active" ? backgroundAvticeList[index + 1] : "inherit",
      }}
    >
      <Box
        component="img"
        src={image}
        width="100%"
        sx={{
          transition: "transform 0.5s ease",
          transform: mode === "active" ? "scale(1.1)" : "scale(1)",
        }}
      />
      <Stack
        width={300}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        color={mode === "active" ? "text.primary" : "white"}
      >
        <Typography width={200} variant="h4" fontSize={24}>
          {title}
        </Typography>
        <Box
          width={54}
          height={24}
          display="flex"
          borderRadius={5}
          padding="7px 15px"
          border="1px solid"
          alignItems="center"
          justifyContent="center"
        >
          <MoveRight />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ProjectCard;
