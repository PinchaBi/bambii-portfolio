import { useNavigate } from "react-router-dom";

import { Stack, Typography } from "@mui/material";

import type { NavBarItemType } from "./types";

type NavBarItemProps = NavBarItemType;

const NavBarItem = ({ name, hash, isLight }: NavBarItemProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const navigate = useNavigate();

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const handleClick = () => {
    if (hash) {
      navigate("/" + hash);
    } else {
      navigate("/");
    }
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      padding="5px 10px"
      color={isLight ? "white" : "text.primary"}
      justifyContent="center"
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        transition: "color 0.3s ease",
        "&:hover": {
          color: isLight ? "colors.bambiiPink" : "white",
        },
      }}
    >
      <Typography>{name}</Typography>
    </Stack>
  );
};

export default NavBarItem;
