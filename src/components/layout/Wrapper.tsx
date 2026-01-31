import { Stack } from "@mui/material";
import { NAVBAR_HEIGHT } from "@/constants/layout";
import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";

const Wrapper = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Stack width="100vw" paddingTop={10.5} position="relative">
      <Stack
        width="100%"
        height={`calc(100vh - ${NAVBAR_HEIGHT}px)`}
        sx={{ ...sx }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default Wrapper;
