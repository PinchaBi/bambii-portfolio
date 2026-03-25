import { Divider, Stack, Typography } from "@mui/material";

type FooterProps = {
  divider?: boolean;
};

const Footer = ({ divider }: FooterProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack spacing={1} width="100%" height="100%" color="colors.mediumGray2">
      {/* Divider */}
      {divider && <Divider sx={{ bgcolor: "colors.mediumGray2" }} />}

      {/* Top */}
      <Typography fontSize={{ xs: 10, sm: 12 }}>
        This portfolio is shared for recruitment purposes. Please do not
        distribute without permission.
      </Typography>

      {/* Bottom */}
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 0 }}
        justifyContent="space-between"
        alignItems={{ xs: "center", sm: "flex-start" }}
      >
        <Typography fontSize={{ xs: 10, sm: 12 }}>
          © Pincha Khongngoen. All rights reserved.
        </Typography>
        <Typography fontSize={{ xs: 10, sm: 12 }}>
          Updated March 2026
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
