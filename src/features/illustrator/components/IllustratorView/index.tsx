import Wrapper from "@/components/layout/Wrapper";

import IllustratorCanvas from "../IllustratorCanvas";

type IllustratorViewProps = {
  isLoading?: boolean;
};

const IllustratorView = ({ isLoading }: IllustratorViewProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper height="75vh" padding="40px 80px" alignItems="flex-end">
      <IllustratorCanvas isLoading={isLoading} />
    </Wrapper>
  );
};

export default IllustratorView;
