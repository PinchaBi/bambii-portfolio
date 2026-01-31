import ProjectCard from "../ProjectCard";
import Wrapper from "@/components/layout/Wrapper";
import useCursorTrail from "../../hooks/useCursorTrail";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { projectActiveList, projectList } from "../../constants";

const CONTENT_WIDTH = 1280;

const ProjectView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const { activeLayerRef, trailRef } = useCursorTrail();

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      sx={{
        gap: 5,
        zIndex: 1,
        paddingTop: 5,
        color: "white",
        bgcolor: "colors.bambiiPink",
      }}
    >
      {/* SVG Defs for Trail */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <clipPath id="trail-clip">
            {Array.from({ length: 20 }).map((_, i) => (
              <circle
                key={i}
                ref={(el) => {
                  if (el) trailRef.current[i] = el;
                }}
                cx="0"
                cy="0"
                r="0"
              />
            ))}
          </clipPath>
        </defs>
      </svg>

      {/* Title */}
      <Stack
        width="100%"
        position="relative"
        justifyContent="space-between"
        paddingX={`calc((100vw - ${CONTENT_WIDTH}px) / 2)`}
      >
        <Stack spacing={1.25} textAlign="center">
          <Typography variant="h1" fontFamily="PlayfairDisplay">
            My type of work
          </Typography>
          <Typography variant="subtitle1">
            select what you want to explore
          </Typography>
        </Stack>
      </Stack>

      {/* Content */}
      <Stack flexGrow={1} position="relative">
        {/* Default */}
        <Stack
          zIndex={1}
          flexGrow={1}
          width="100%"
          height="100%"
          position="absolute"
          justifyContent="center"
          bgcolor="colors.bambiiPink"
          paddingX={`calc((100vw - ${CONTENT_WIDTH}px) / 2)`}
        >
          <Box width="100%" height={390} position="relative">
            {/* Default */}
            <Stack direction="row">
              <Divider
                flexItem
                orientation="vertical"
                sx={{ border: "1px solid white" }}
              />
              {projectList.map((item, index) => {
                return (
                  <>
                    <ProjectCard
                      key={`${index}-${item.title}-${item.image}`}
                      mode="default"
                      index={index}
                      {...item}
                    />
                    {index !== projectList.length - 1 && (
                      <Divider
                        flexItem
                        orientation="vertical"
                        sx={{ border: "1px solid white" }}
                      />
                    )}
                  </>
                );
              })}
              <Divider
                flexItem
                orientation="vertical"
                sx={{ border: "1px solid white" }}
              />
            </Stack>
            <Divider
              sx={{
                bottom: 40,
                width: "110%",
                position: "absolute",
                border: "1px solid white",
                transform: "translateX(-5%)",
              }}
            />
          </Box>
        </Stack>

        {/* Active */}
        <Stack
          ref={activeLayerRef}
          zIndex={2}
          flexGrow={1}
          width="100%"
          height="100%"
          position="absolute"
          justifyContent="center"
          bgcolor="colors.darkGray2"
          paddingX={`calc((100vw - ${CONTENT_WIDTH}px) / 2)`}
          sx={{
            pointerEvents: "none",
            clipPath: "url(#trail-clip)",
            transition: "clip-path 0.1s ease",
          }}
        >
          <Box width="100%" zIndex={2} height={390} position="relative">
            {/* Active */}
            <Stack direction="row">
              <Divider
                flexItem
                orientation="vertical"
                sx={{ border: "1px solid transparent" }}
              />
              {projectActiveList.map((item, index) => {
                return (
                  <>
                    <ProjectCard
                      key={`${index}-${item.title}-${item.image}`}
                      mode="active"
                      index={index}
                      {...item}
                    />
                    {index !== projectActiveList.length - 1 && (
                      <Divider
                        flexItem
                        orientation="vertical"
                        sx={{ border: "1px solid transparent" }}
                      />
                    )}
                  </>
                );
              })}
              <Divider
                flexItem
                orientation="vertical"
                sx={{ border: "1px solid transparent" }}
              />
            </Stack>
            <Divider
              sx={{
                zIndex: 1,
                bottom: 40,
                width: "110%",
                position: "absolute",
                borderColor: "transparent",
                transform: "translateX(-5%)",
                border: "1px solid transparent",
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default ProjectView;
