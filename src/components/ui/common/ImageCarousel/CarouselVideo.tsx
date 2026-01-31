import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const CarouselVideo = ({ src, isActive }: { src: string; isActive: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(() => {
            });
        } else {
            videoRef.current?.pause();
            if (videoRef.current) videoRef.current.currentTime = 0;
        }
    }, [isActive]);

    return (
        <Box
            component="video"
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
            }}
        />
    );
};

export default CarouselVideo;