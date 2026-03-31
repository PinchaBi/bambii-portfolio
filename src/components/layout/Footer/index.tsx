import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";

type FooterProps = {
  divider?: boolean;
};

const Footer = ({ divider }: FooterProps) => {
  const isShortScreen = useMediaQuery("(max-height:500px)");
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack spacing={1} width="100%" height="100%" color="colors.mediumGray2">
      {/* Divider */}
      {divider && <Divider sx={{ bgcolor: "colors.mediumGray2" }} />}

      {/* Disclaimer — desktop only */}
      <Typography fontSize={{ xs: 10, sm: 12 }} sx={{ display: { xs: "none", lg: "block" } }}>
        This portfolio is shared for recruitment purposes. Please do not
        distribute without permission.
      </Typography>

      {/* Desktop/Tablet: row layout */}
      <Stack
        spacing={{ xs: 1, sm: 0 }}
        justifyContent="space-between"
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Typography fontSize={isShortScreen ? 9 : 12}>
          © Pincha Khongngoen. All rights reserved.
        </Typography>
        <Typography fontSize={isShortScreen ? 9 : 12}>
          Updated March 2026
        </Typography>
      </Stack>

      {/* Mobile: stacked, centered, divider above, reversed order */}
      <Stack
        spacing={0.5}
        sx={{
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
        }}
      >
        <Divider sx={{ bgcolor: "colors.mediumGray2", width: "100%", mb: 2 }} />
        <Typography fontSize={10}>
          Updated March 2026
        </Typography>
        <Typography fontSize={10}>
          © Pincha Khongngoen. All rights reserved.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
