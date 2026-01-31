import { Avatar, Stack, Typography } from "@mui/material";

const BambiiLogo = () => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      width={210}
      spacing={1.25}
      direction="row"
      alignItems="center"
      sx={{
        cursor: "pointer",
        "&:hover .text": {
          paddingLeft: 2,
          transition: "all 0.3s ease-out",
        },
      }}
    >
      <Avatar sizes="40px" src="/images/beautiful-bambii.jpg" />
      <Stack className="text">
        <Typography variant="body1" lineHeight={1.25} color="text.primary">
          Pincha Khongngoen
        </Typography>
        <Typography fontSize={12} lineHeight="14px" color="colors.bambiiPink">
          Open for new roles
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BambiiLogo;
