import { useId, useState } from "react";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

import ImageCarousel from "@/components/ui/common/ImageCarousel";

type InstragarmCardProps = {
  images: string[];
};

const InstragramCard = ({ images }: InstragarmCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);
  const gradientId = useId().replace(/:/g, "");

  const showGradient = isLiked || isHovered;
  const showBookmark = isBookmarked || isBookmarkHovered;
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box
      width={295}
      bgcolor="white"
      borderRadius={5}
      overflow="hidden"
      position="relative"
    >
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD9E7" />
            <stop offset="50%" stopColor="#F13A7D" />
            <stop offset="100%" stopColor="#8B2148" />
          </linearGradient>
        </defs>
      </svg>
      <Stack
        direction="row"
        padding="8px 12px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={1.25} direction="row" alignItems="center">
          <Avatar sizes="30px" src="/images/beautiful-bambii.jpg" />
          <Typography variant="button">Pincha Khongngoen</Typography>
        </Stack>
        <Stack spacing={0.5} direction="row">
          <Box
            width={3}
            height={3}
            bgcolor="colors.darkGray3"
            borderRadius="50%"
          />
          <Box
            width={3}
            height={3}
            bgcolor="colors.darkGray3"
            borderRadius="50%"
          />
          <Box
            width={3}
            height={3}
            bgcolor="colors.darkGray3"
            borderRadius="50%"
          />
        </Stack>
      </Stack>
      <Box width={295} height={295} overflow="hidden">
        <ImageCarousel images={images} />
      </Box>
      <Stack
        padding="12px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={1.25} direction="row">
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsLiked((prev) => !prev)}
            tabIndex={0}
            role="button"
            sx={{
              cursor: "pointer",
              position: "relative",
              width: 24,
              height: 24,
              transition: "transform 0.2s ease",
              "&:active": { transform: "scale(0.85)" },
            }}
          >
            <Box
              component="span"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                transition: "opacity 0.3s ease",
                opacity: showGradient ? 0 : 1,
              }}
            >
              <Heart size={24} />
            </Box>
            <Box
              component="span"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                transition: "opacity 0.3s ease",
                opacity: showGradient ? 1 : 0,
              }}
            >
              <Heart
                size={24}
                stroke={`url(#${gradientId})`}
                fill={`url(#${gradientId})`}
              />
            </Box>
          </Box>
          <MessageCircle size={24} />
          <Send size={24} />
        </Stack>
        <Box
          onMouseEnter={() => setIsBookmarkHovered(true)}
          onMouseLeave={() => setIsBookmarkHovered(false)}
          onClick={() => setIsBookmarked((prev) => !prev)}
          tabIndex={0}
          role="button"
          sx={{
            cursor: "pointer",
            display: "flex",
            transition: "transform 0.2s ease",
            "&:active": { transform: "scale(0.85)" },
            "& path": { transition: "fill 0.3s ease" },
          }}
        >
          <Bookmark size={24} fill={showBookmark ? "black" : "transparent"} />
        </Box>
      </Stack>
    </Box>
  );
};

export default InstragramCard;
