import { Fragment } from "react";

import { Box, Divider, Stack, Typography } from "@mui/material";

import Grainient from "@/components/animate-ui/Grainient";
import ShinyText from "@/components/animate-ui/ShinyText";
import Wrapper from "@/components/layout/Wrapper";

import { projectActiveList, projectList } from "../../constants";
import useCursorTrail from "../../hooks/useCursorTrail";
import ProjectCard from "../ProjectCard";

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
        color: "white",
      }}
    >
      {/* SVG Defs for Trail */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <clipPath id="trail-clip">
            {Array.from({ length: 2 }).map((_, i) => (
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

      <Grainient
        color1="#d69fb3"
        color2="#f13a7d"
        color3="#ffadca"
        timeSpeed={0.25}
        colorBalance={-0.01}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />

      {/* Title */}
      <Stack
        width="100%"
        marginTop={20}
        position="relative"
        justifyContent="space-between"
        paddingX={`calc((100vw - ${CONTENT_WIDTH}px) / 2)`}
      >
        <Stack spacing={1.25} textAlign="center">
          <Typography variant="h1">Types of Work</Typography>
          <Typography
            variant="h4"
            fontSize={24}
            sx={{
              "@keyframes blink": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.25 },
              },
              animation: "blink 1.6s ease-in-out infinite",
            }}
          >
            <ShinyText
              text="Choose a category to explore"
              speed={2}
              delay={0}
              color="#ffffff"
              shineColor="#FFD9E7"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
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
                  <Fragment key={`${index}-${item.title}`}>
                    <ProjectCard mode="default" index={index} {...item} />
                    {index !== projectList.length - 1 && (
                      <Divider
                        flexItem
                        orientation="vertical"
                        sx={{ border: "1px solid white" }}
                      />
                    )}
                  </Fragment>
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
                  <Fragment key={`${index}-${item.title}`}>
                    <ProjectCard mode="active" index={index} {...item} />
                    {index !== projectActiveList.length - 1 && (
                      <Divider
                        flexItem
                        orientation="vertical"
                        sx={{ border: "1px solid transparent" }}
                      />
                    )}
                  </Fragment>
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
