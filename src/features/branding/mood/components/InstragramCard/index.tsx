import { useId, useState } from "react";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

import ImageCarousel from "@/components/ui/common/ImageCarousel";

type InstragarmCardProps = {
  images: string[];
  size?: number;
};

const InstragramCard = ({ images, size = 220 }: InstragarmCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);
  const gradientId = useId().replace(/:/g, "");

  const showGradient = isLiked || isHovered;
  const showBookmark = isBookmarked || isBookmarkHovered;

  const scale = size / 220;
  const iconSize = Math.round(18 * scale);
  const avatarSize = Math.round(24 * scale);
  const fontSize = Math.round(11 * scale);
  const headerPadding = `${Math.round(8 * scale)}px ${Math.round(12 * scale)}px`;
  const footerPadding = `${Math.round(12 * scale)}px`;

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Box
      width={size}
      bgcolor="white"
      borderRadius={5 * scale}
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
        padding={headerPadding}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={1 * scale} direction="row" alignItems="center">
          <Avatar sx={{ width: avatarSize, height: avatarSize }} src="/images/beautiful-bambii.jpg" />
          <Typography variant="button" fontSize={fontSize}>Pincha Khongngoen</Typography>
        </Stack>
        <Stack spacing={0.5 * scale} direction="row">
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
      <Box width={size} height={size} overflow="hidden">
        <ImageCarousel images={images} scale={scale} />
      </Box>
      <Stack
        padding={footerPadding}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={1 * scale} direction="row">
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsLiked((prev) => !prev)}
            tabIndex={0}
            role="button"
            sx={{
              cursor: "pointer",
              position: "relative",
              width: iconSize,
              height: iconSize,
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
              <Heart size={iconSize} />
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
                size={iconSize}
                stroke={`url(#${gradientId})`}
                fill={`url(#${gradientId})`}
              />
            </Box>
          </Box>
          <MessageCircle size={iconSize} />
          <Send size={iconSize} />
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
          <Bookmark size={iconSize} fill={showBookmark ? "black" : "transparent"} />
        </Box>
      </Stack>
    </Box>
  );
};

export default InstragramCard;
