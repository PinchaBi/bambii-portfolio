import { Button, Stack, Typography } from "@mui/material";

import EyeFollower from "../EyeFollower";

type ContactButtonProps = {
  hasBorder?: boolean;
};

const ContactButton = ({ hasBorder = false }: ContactButtonProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Button
      sx={{
        gap: 1.25,
        color: "white",
        bgcolor: "black",
        borderRadius: 7.5,
        padding: "10px 15px",
        transition: "all 0.3s ease",
        border: hasBorder ? "1.5px solid white" : "1.5px solid transparent",
      }}
    >
      <Typography variant="button" fontWeight={600}>
        Get in Touch
      </Typography>
      <Stack spacing={0.25} direction="row">
        <EyeFollower />
        <EyeFollower />
      </Stack>
    </Button>
  );
};

export default ContactButton;
