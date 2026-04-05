import { Box, useMediaQuery } from "@mui/material";

import Wrapper from "@/components/layout/Wrapper";

import WebDesignList from "../WebDesignList";

type WebDesignViewProps = {
  hiddenHeroId: string | null;
};

const WebDesignView = ({ hiddenHeroId }: WebDesignViewProps) => {
  const isShortScreen = useMediaQuery("(max-height:500px)");

  // On short/landscape screens, scale the entire list uniformly
  const scale = isShortScreen ? 0.6 : 1;

  return (
    <Wrapper
      height={isShortScreen ? "80vh" : "65vh"}
      minHeight={isShortScreen ? "80vh" : "65vh"}
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "bottom left",
        }}
      >
        <WebDesignList hiddenHeroId={hiddenHeroId} />
      </Box>
    </Wrapper>
  );
};

export default WebDesignView;
