import { Stack, type StackProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const Wrapper = ({
  id,
  children,
  sx,
  ...props
}: {
  id?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
} & StackProps) => {
  return (
    <Stack
      id={id}
      width="100vw"
      height="100vh"
      position="relative"
      sx={{ ...sx }}
      {...props}
    >
      {children}
    </Stack>
  );
};

export default Wrapper;
