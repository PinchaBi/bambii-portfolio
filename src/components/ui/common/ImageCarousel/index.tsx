import { useEffect, useRef } from "react";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useCarousel from "@/hooks/useCarousel";

import GlassSurface from "@/components/ui/GlassSurface";

import VideoCarousel from "../VideoCarousel";

type ImageCarouselProps = {
  images: string[];
  centerIndex?: number;
  parentIndex?: number;
  scale?: number;
};

const ImageCarousel = ({
  images,
  centerIndex,
  parentIndex,
  scale = 1,
}: ImageCarouselProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const {
    index: currentIndex,
    setIndex,
    handlePrev,
    handleNext,
  } = useCarousel<string>(images);

  const isActive =
    centerIndex === undefined || parentIndex === undefined
      ? true
      : parentIndex === centerIndex;

  // Reset image index only when this carousel goes from inactive to active
  const wasActive = useRef(isActive);
  useEffect(() => {
    if (isActive && !wasActive.current) {
      setIndex(0);
    }
    wasActive.current = isActive;
  }, [isActive, setIndex]);

  // --------------------------- Derived sizes ---------------------------
  //region Derived sizes

  const iconSize = Math.round(24 * scale);
  const btnPadding = 1.25 * scale;
  const counterHeight = Math.round(18 * scale);
  const counterFontSize = Math.round(12 * scale);
  const dotSize = Math.max(3, Math.round(5 * scale));
  const paddingX = 2 * scale;
  const paddingY = 1.25 * scale;

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        ".image-pagination": {
          opacity: scale < 1 ? 1 : { xs: 1, md: 0 },
          transition: "opacity 0.3s ease-in-out",
        },
        "&:hover .image-pagination": {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {images.map((image, index) => {
          const isVideo = ["mov", "mp4", "webm"].some((ext) =>
            image.toLowerCase().endsWith(ext),
          );

          if (isVideo)
            return (
              <VideoCarousel
                key={`${index}-${image}`}
                src={image}
                isActive={index === currentIndex && isActive}
              />
            );

          return (
            <Box
              key={`${index}-${image}`}
              component="img"
              src={image}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                opacity: index === currentIndex ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
              }}
            />
          );
        })}
      </Box>

      <Stack
        className="image-pagination"
        sx={{
          top: 0,
          inset: 0,
          paddingX,
          paddingY,
          display: "flex",
          position: "absolute",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            zIndex: 1,
            width: "100%",
            height: `${counterHeight}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            color="white"
            borderRadius={3.75}
            bgcolor="rgba(0, 0, 0, 0.55)"
            sx={{
              px: 0.75 * scale,
              height: `${counterHeight}px`,
              fontSize: `${counterFontSize}px`,
              lineHeight: `${counterHeight}px`,
            }}
          >
            {currentIndex + 1}/{images.length}
          </Typography>
        </Box>

        <Stack width="100%" direction="row" justifyContent="space-between">
          <IconButton
            onClick={handlePrev}
            sx={{
              padding: btnPadding,
              color: "text.primary",
              transition: "all 0.3s ease",
              bgcolor: "rgba(255,255,255, 0.50)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronLeft size={iconSize} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              padding: btnPadding,
              color: "text.primary",
              transition: "all 0.3s ease",
              bgcolor: "rgba(255,255,255, 0.50)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronRight size={iconSize} />
          </IconButton>
        </Stack>

        <GlassSurface
          width="fit-content"
          height="fit-content"
          borderRadius={20}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={100}
          opacity={0.93}
          mixBlendMode="screen"
          style={{ boxShadow: "0px 4px 24px -1px rgba(0, 0, 0, 0.2)" }}
        >
          <Box gap={0.5 * scale} display="flex">
            {Array.from({ length: images.length }).map((_, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => setIndex(index)}
                  sx={{
                    width: dotSize,
                    height: dotSize,
                    cursor: "pointer",
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                    bgcolor:
                      currentIndex === index
                        ? "colors.bambiiPink"
                        : "colors.mediumGray",
                  }}
                />
              );
            })}
          </Box>
        </GlassSurface>
      </Stack>
    </Box>
  );
};

export default ImageCarousel;
