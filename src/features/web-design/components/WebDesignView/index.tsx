import Wrapper from "@/components/layout/Wrapper";

import WebDesignList from "../WebDesignList";

type WebDesignViewProps = {
  hiddenHeroId: string | null;
};

const WebDesignView = ({ hiddenHeroId }: WebDesignViewProps) => {
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
      <WebDesignList hiddenHeroId={hiddenHeroId} />
    </Wrapper>
  );
};

export default WebDesignView;
