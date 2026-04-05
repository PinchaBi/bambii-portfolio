import { useEffect, useRef, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import type { BoxProps } from "@mui/material";

import { DEVICE } from "../../constants";
import type { DisplayItem } from "../../constants";

type DisplayProps = Omit<DisplayItem, "place"> &
  BoxProps & {
    isHovered?: boolean;
  };

const Display = ({
  image,
  video,
  device,
  haveVideo,
  haveFrame,
  width,
  height,
  isHovered,
  ...props
}: DisplayProps) => {
  const isTouch = useMediaQuery("(max-width:1199px)");

  // On touch devices, always show video if available
  const effectiveHovered = isTouch ? (haveVideo && !!video) : !!isHovered;

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isTouch && haveVideo && video) {
      setShowVideo(true);
      return;
    }

    if (!effectiveHovered) {
      const hideTimer = setTimeout(() => setShowVideo(false), 0);
      return () => clearTimeout(hideTimer);
    }

    if (haveVideo && video) {
      const startTimer = setTimeout(() => setShowVideo(true), 0);
      const stopTimer = setTimeout(() => setShowVideo(false), 5000);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
      };
    }
  }, [effectiveHovered, haveVideo, video, isTouch]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (showVideo) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [showVideo]);

  const isIphone = device === DEVICE.I;

  const frameSrc = isIphone
    ? "/assets/2d/iPhone-17-Pro.png"
    : "/assets/2d/M4-MacBook-Pro-Max.png";

  return (
    <Box width="100%" height="100%" {...props}>
      {/* Screen */}
      <Box
        width={width}
        height={height}
        overflow="hidden"
        position="absolute"
        borderRadius={isIphone ? 4 : 1}
      >
        <Box
          src={image}
          component="img"
          alt="Screen Image"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            opacity: showVideo ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
        {haveVideo && video && (
          <Box
            ref={videoRef}
            src={video}
            component="video"
            muted
            loop
            playsInline
            preload="auto"
            width="100%"
            height="100%"
            sx={{
              objectFit: "fill",
              position: "absolute",
              opacity: showVideo ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </Box>

      {/* Frame */}
      {haveFrame && (
        <Box
          src={frameSrc}
          component="img"
          alt="Frame Image"
          width={width * (isIphone ? 1.37 : 1.33)}
          height={height * (isIphone ? 1.15 : 1.27)}
          position="absolute"
          sx={{
            transform: `translateX(${width * (isIphone ? 0.047 : 0.027)}px) translateY(-${height * (isIphone ? 0.054 : 0.07)}px)`,
          }}
        />
      )}
    </Box>
  );
};

export default Display;
