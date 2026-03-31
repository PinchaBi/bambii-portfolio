import { forwardRef } from "react";

import { Stack, type StackProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const Wrapper = forwardRef<
  HTMLDivElement,
  {
    id?: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
  } & StackProps
>(({ id, children, sx, ...props }, ref) => {
  return (
    <Stack
      ref={ref}
      id={id}
      width="100vw"
      minHeight="100dvh"
      position="relative"
      sx={{ scrollSnapAlign: "start", ...sx }}
      {...props}
    >
      {children}
    </Stack>
  );
});

Wrapper.displayName = "Wrapper";

export default Wrapper;
