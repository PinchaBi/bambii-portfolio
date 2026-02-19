import { useEffect } from "react";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useCarousel from "@/hooks/useCarousel";

import GlassSurface from "@/components/ui/GlassSurface";

import VideoCarousel from "../VideoCarousel";

type ImageCarouselProps = {
  images: string[];
  centerIndex?: number;
  parentIndex?: number;
};

const ImageCarousel = ({
  images,
  centerIndex,
  parentIndex,
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

  useEffect(() => {
    if (centerIndex !== undefined) setIndex(0);
  }, [centerIndex, setIndex]);

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
          opacity: 0,
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
          paddingX: 2,
          paddingY: 1.25,
          display: "flex",
          position: "absolute",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          zIndex={1}
          width="100%"
          height="18px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography
            color="white"
            height="18px"
            variant="subtitle2"
            borderRadius={3.75}
            bgcolor="rgba(0, 0, 0, 0.55)"
            sx={{
              px: 1,
            }}
          >
            {currentIndex + 1}/{images.length}
          </Typography>
        </Box>

        <Stack width="100%" direction="row" justifyContent="space-between">
          <IconButton
            onClick={handlePrev}
            sx={{
              padding: 1.25,
              color: "text.primary",
              transition: "all 0.3s ease",
              bgcolor: "rgba(255,255,255, 0.50)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronLeft size={24} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              padding: 1.25,
              color: "text.primary",
              transition: "all 0.3s ease",
              bgcolor: "rgba(255,255,255, 0.50)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronRight size={24} />
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
          <Box gap={0.5} display="flex">
            {Array.from({ length: images.length }).map((_, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => setIndex(index)}
                  sx={{
                    width: 5,
                    height: 5,
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
