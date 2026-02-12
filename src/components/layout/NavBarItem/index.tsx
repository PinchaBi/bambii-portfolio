import { Stack, Typography } from "@mui/material";

import type { NavBarItemType } from "./types";

type NavBarItemProps = NavBarItemType;

const NavBarItem = ({ name }: NavBarItemProps) => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      padding="5px 10px"
      color="text.primary"
      justifyContent="center"
      sx={{
        cursor: "pointer",
        transition: "color 0.3 ease",
        "&:hover": {
          color: "colors.bambiiPink",
        },
      }}
    >
      <Typography>{name}</Typography>
    </Stack>
  );
};

export default NavBarItem;
