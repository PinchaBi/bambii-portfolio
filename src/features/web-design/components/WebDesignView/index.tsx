import Wrapper from "@/components/layout/Wrapper";

import WebDesignList from "../WebDesignList";

const WebDesignView = () => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      height="65vh"
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <WebDesignList />
    </Wrapper>
  );
};

export default WebDesignView;
