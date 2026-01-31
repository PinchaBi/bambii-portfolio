import { useEffect } from "react";
import CarouselVideo from "./CarouselVideo";
import useCarousel from "@/hooks/useCarousel";
import { Box, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageCarouselProps = {
  images: string[];
  centerIndex: number;
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

  useEffect(() => {
    setIndex(0);
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
              <CarouselVideo
                key={`${index}-${image}`}
                src={image}
                isActive={index === currentIndex && parentIndex === centerIndex}
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

      {centerIndex === parentIndex && (
        <Stack
          className="image-pagination"
          sx={{
            inset: 0,
            top: 123,
            paddingX: 2,
            display: "flex",
            paddingBottom: 1.25,
            position: "absolute",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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

          <Box
            gap={0.5}
            display="flex"
            padding="5px 8px"
            borderRadius={2.5}
            sx={{
              // Glass Style
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backgroundImage:
                "linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
              backdropFilter: "blur(7px)",
              boxShadow: "0px 2px 10px rgba(30, 30, 30, 0.1)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
              borderTop: "1px solid rgba(255, 255, 255, 0.8)",
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
            }}
          >
            {Array.from({ length: images.length }).map((_, index) => {
              return (
                <Box
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
        </Stack>
      )}
    </Box>
  );
};

export default ImageCarousel;
