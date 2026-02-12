import { useEffect, useState } from "react";

import { AppBar, Stack, Toolbar } from "@mui/material";

import BambiiLogo from "@/components/ui/BambiiLogo";

import ContactButton from "../ContactButton";
import NavBarItem from "../NavBarItem";
import { menus } from "./constants";

const NavBar = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [hasBorder, setHasBorder] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const projectSection = document.getElementById("project-view");
      const contactSection = document.getElementById("contact-view");

      if (!projectSection || !contactSection) return;

      const projectRect = projectSection.getBoundingClientRect();
      const contactRect = contactSection.getBoundingClientRect();

      const inProjectView = projectRect.bottom > 20;
      const inContactView = contactRect.bottom < window.innerHeight + 65;

      if (inProjectView || inContactView) {
        setHasBorder(true);
      } else {
        setHasBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        p: "10px 80px",
        bgcolor: "transparent",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{ padding: "0px !important", justifyContent: "space-between" }}
      >
        <BambiiLogo />
        <Stack spacing={1.25} direction="row" paddingRight={2}>
          {menus.map((menu, index) => (
            <NavBarItem key={`${index}-${menu.name}`} {...menu} />
          ))}
        </Stack>

        <ContactButton hasBorder={hasBorder} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
