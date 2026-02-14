import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import EyeFollower from "../EyeFollower";

type ContactButtonProps = {
  hasBorder?: boolean;
};

const ContactButton = ({ hasBorder = false }: ContactButtonProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const navigate = useNavigate();

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const handleClick = () => {
    navigate("/#contact-view");
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Button
      component={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={handleClick}
      sx={{
        gap: 1.25,
        color: "white",
        bgcolor: "black",
        borderRadius: 7.5,
        padding: "10px 15px",
        transition: "border 0.3s ease",
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
