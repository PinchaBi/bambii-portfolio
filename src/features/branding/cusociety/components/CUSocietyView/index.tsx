import { Stack } from "@mui/material";

import Wrapper from "@/components/layout/Wrapper";

const CUSocietyView = () => {
  return (
    <Wrapper
      sx={{
        bgcolor: "black",
      }}
    >
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Stack direction="row" alignItems="center"></Stack>
      </Stack>
    </Wrapper>
  );
};

export default CUSocietyView;
