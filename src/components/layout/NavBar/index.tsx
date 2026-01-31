import { menus } from "./constants";
import NavBarItem from "../NavBarItem";
import ContactButton from "../ContactButton";
import BambiiLogo from "@/components/ui/BambiiLogo";
import { AppBar, Stack, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

const NavBar = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [hasBorder, setHasBorder] = useState(true); // Default to true since we start at ProjectView

  useEffect(() => {
    const handleScroll = () => {
      const projectSection = document.getElementById("project-view");
      const contactSection = document.getElementById("contact-view");

      if (!projectSection || !contactSection) return;

      const projectRect = projectSection.getBoundingClientRect();
      const contactRect = contactSection.getBoundingClientRect();

      // Check if sections are in viewport (rough check: top < windowHeight/2 and bottom > 0)
      // Or simply: if we are overlapping with them.
      // Since they occupy full viewport height mostly, if their top is <= half screen and bottom >= half screen?
      // "Pass ProjectView" -> In ActivityView.

      console.log(projectRect.top, projectRect.bottom, contactRect.bottom, window.innerHeight);

      const inProjectView = projectRect.bottom > 20 && projectRect.top < -20; // Still visible or mostly visible
      const inContactView = contactRect.bottom < window.innerHeight + 65; // Entering/Visible

      // Logic interpretation: "When it pass ProjectView and ContactView"
      // Likely means: When in ProjectView OR ContactView -> White Border.
      // When in ActivityView (between them) -> No Border.

      if (inProjectView || inContactView) {
        setHasBorder(true);
      } else {
        setHasBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
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
