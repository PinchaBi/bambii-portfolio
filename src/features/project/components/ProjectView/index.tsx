import { Fragment } from "react";

import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery("(max-width:799px)");
  const isShortScreen = useMediaQuery("(max-height:500px)");

  const { activeLayerRef, trailRef } = useCursorTrail();

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      sx={{
        gap: isShortScreen ? 1 : { xs: 2, sm: 3 },
        zIndex: 1,
        color: "white",
        height: "100dvh",
      }}
    >
      {/* SVG Defs for Trail (desktop only) */}
      {isDesktop && (
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
      )}

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
        marginTop={isShortScreen ? "max(40px, 8dvh)" : { xs: "max(80px, 12dvh)", sm: "max(80px, 10dvh)", lg: "max(80px, 12dvh)" }}
        position="relative"
        justifyContent="space-between"
        paddingX={
          isDesktop
            ? `calc((100vw - ${CONTENT_WIDTH}px) / 2)`
            : { xs: 3, sm: 6 }
        }
      >
        <Stack spacing={1.25} textAlign="center">
          <Typography variant="h1" fontSize={isShortScreen ? "1.5rem" : { xs: "2rem", sm: "2.5rem", lg: "3rem" }}>
            Types of Work
          </Typography>
          <Typography
            variant="h4"
            fontSize={isShortScreen ? 12 : { xs: 16, sm: 20, lg: 24 }}
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
      {isDesktop ? (
        <DesktopContent
          activeLayerRef={activeLayerRef}
          trailRef={trailRef}
        />
      ) : isMobile && !isShortScreen ? (
        <MobileContent />
      ) : (
        <TabletContent />
      )}
    </Wrapper>
  );
};

// ─── Desktop Layout (lg+): Full card containers + cursor trail ───

type DesktopContentProps = {
  activeLayerRef: React.RefObject<HTMLDivElement | null>;
  trailRef: React.RefObject<SVGCircleElement[]>;
};

const DesktopContent = ({ activeLayerRef }: DesktopContentProps) => {
  return (
    <Stack flexGrow={1} position="relative">
      {/* Default */}
      <Stack
        zIndex={1}
        flexGrow={1}
        width="100%"
        height="100%"
        position="absolute"
        justifyContent="center"
        paddingX={`max(48px, calc((100vw - ${CONTENT_WIDTH}px) / 2))`}
      >
        <Box width="100%" height="min(390px, 50dvh)" position="relative">
          <Stack direction="row">
            <Divider
              flexItem
              orientation="vertical"
              sx={{ border: "1px solid white" }}
            />
            {projectList.map((item, index) => (
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
            ))}
            <Divider
              flexItem
              orientation="vertical"
              sx={{ border: "1px solid white" }}
            />
          </Stack>
          <Divider
            sx={{
              bottom: 40,
              width: "105%",
              position: "absolute",
              border: "1px solid white",
              transform: "translateX(-2.5%)",
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
        paddingX={`max(48px, calc((100vw - ${CONTENT_WIDTH}px) / 2))`}
        sx={{
          pointerEvents: "none",
          clipPath: "url(#trail-clip)",
          transition: "clip-path 0.1s ease",
        }}
      >
        <Box width="100%" zIndex={2} height="min(390px, 50dvh)" position="relative">
          <Stack direction="row">
            <Divider
              flexItem
              orientation="vertical"
              sx={{ border: "1px solid transparent" }}
            />
            {projectActiveList.map((item, index) => (
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
            ))}
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
              width: "105%",
              position: "absolute",
              borderColor: "transparent",
              transform: "translateX(-2.5%)",
              border: "1px solid transparent",
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

// ─── Tablet Layout (sm–lg): Simplified 3-item row ───

const TabletContent = () => {
  const navigate = useNavigate();
  const isShort = useMediaQuery("(max-height:500px)");

  return (
    <Stack
      flexGrow={1}
      position="relative"
      justifyContent="center"
      paddingX={isShort ? 3 : { sm: 6, md: 10 }}
    >
      <Box width="100%" position="relative">
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {projectList.map((item, index) => (
            <Fragment key={`${index}-${item.title}`}>
              {index !== 0 && (
                <Divider
                  flexItem
                  orientation="vertical"
                  sx={{ border: "1px solid rgba(255,255,255,0.5)" }}
                />
              )}
              <Stack
                flex={1}
                spacing={isShort ? 0.5 : 2}
                alignItems="center"
                overflow="visible"
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: "pointer",
                  paddingY: isShort ? 1 : 3,
                  paddingX: isShort ? 1 : 2,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  sx={{ overflow: "visible" }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    sx={{
                      width: isShort ? "150%" : "130%",
                      maxWidth: isShort ? 300 : 380,
                      maxHeight: isShort ? "35dvh" : undefined,
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography
                  variant="h4"
                  fontSize={isShort ? 12 : { sm: 18, md: 22 }}
                  textAlign="center"
                  fontWeight={600}
                >
                  {item.title}
                </Typography>
              </Stack>
            </Fragment>
          ))}
        </Stack>
        <Divider
          sx={{
            bottom: 0,
            width: "100%",
            position: "absolute",
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        />
      </Box>
    </Stack>
  );
};

// ─── Mobile Layout (xs–sm): Featured hero + 2-col grid ───

const MobileContent = () => {
  const navigate = useNavigate();

  // Web design is the featured item (index 1)
  const featured = projectList[1];
  // Branding (index 0) and Illustration (index 2) go in the grid
  const gridItems = [projectList[0], projectList[2]];

  return (
    <Stack
      flexGrow={1}
      position="relative"
      justifyContent="center"
      paddingX={3}
      spacing={0}
    >
      {/* Featured: Web design */}
      <Stack
        spacing={1.5}
        alignItems="center"
        onClick={() => navigate(featured.path)}
        sx={{
          cursor: "pointer",
          paddingBottom: 2,
        }}
      >
        <Box
          component="img"
          src={featured.image}
          sx={{
            width: "85%",
            maxWidth: 400,
            objectFit: "contain",
          }}
        />
        <Typography
          variant="h4"
          fontSize={20}
          textAlign="center"
          fontWeight={600}
        >
          {featured.title}
        </Typography>
      </Stack>

      {/* Horizontal divider */}
      <Divider sx={{ border: "1px solid rgba(255,255,255,0.5)" }} />

      {/* 2-column grid: Branding + Illustration */}
      <Stack
        direction="row"
        divider={
          <Divider
            flexItem
            orientation="vertical"
            sx={{ border: "1px solid rgba(255,255,255,0.5)" }}
          />
        }
      >
        {gridItems.map((item, index) => (
          <Stack
            key={`${index}-${item.title}`}
            flex={1}
            spacing={1}
            alignItems="center"
            onClick={() => navigate(item.path)}
            sx={{
              cursor: "pointer",
              paddingY: 2.5,
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              sx={{ overflow: "visible" }}
            >
              <Box
                component="img"
                src={item.image}
                sx={{
                  width: "120%",
                  maxWidth: 280,
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography
              variant="h4"
              fontSize={16}
              textAlign="center"
              fontWeight={600}
            >
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* Bottom horizontal divider */}
      <Divider sx={{ border: "1px solid rgba(255,255,255,0.5)" }} />
    </Stack>
  );
};

export default ProjectView;
