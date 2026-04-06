import { Box, useMediaQuery } from "@mui/material";

import Wrapper from "@/components/layout/Wrapper";

import WebDesignList from "../WebDesignList";

type WebDesignViewProps = {
  hiddenHeroId: string | null;
};

const WebDesignView = ({ hiddenHeroId }: WebDesignViewProps) => {
  const isShortScreen = useMediaQuery("(max-height:500px)");
  const isMobile = useMediaQuery("(max-width:599px)");
  const isSmallTablet = useMediaQuery("(min-width:600px) and (max-width:899px)");

  // Scale the list to fit smaller screens
  const scale = isShortScreen ? 0.6 : isMobile ? 0.65 : isSmallTablet ? 0.8 : 1;

  return (
    <Wrapper
      height={isShortScreen ? "80vh" : isMobile ? "55vh" : "65vh"}
      minHeight={isShortScreen ? "80vh" : isMobile ? "55vh" : "65vh"}
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          height: scale < 1 ? `${100 / scale}%` : "100%",
          display: "flex",
          alignItems: "center",
          zoom: scale < 1 ? scale : undefined,
        }}
      >
        <WebDesignList hiddenHeroId={hiddenHeroId} />
      </Box>
    </Wrapper>
  );
};

export default WebDesignView;
