import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { AppBar, Stack, Toolbar } from "@mui/material";

import GradualBlur from "@/components/animate-ui/GradualBlur";
import BambiiLogo from "@/components/ui/BambiiLogo";

import ContactButton from "../ContactButton";
import NavBarItem from "../NavBarItem";
import { menus } from "./constants";

const NavBar = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const { pathname } = useLocation();

  const [hasBorder, setHasBorder] = useState(true);
  const [isInAboutView, setIsInAboutView] = useState(false);
  const [isInProjectView, setIsInProjectView] = useState(false);
  const [isInContactView, setIsInContactView] = useState(false);
  const [isInCUSocietyView, setIsInCUSocietyView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about-view");
      const projectSection = document.getElementById("project-view");
      const contactSection = document.getElementById("contact-view");
      const cusocietySection = document.getElementById("cusociety-view");

      const aboutRect = aboutSection?.getBoundingClientRect();
      const projectRect = projectSection?.getBoundingClientRect();
      const contactRect = contactSection?.getBoundingClientRect();
      const cusocietyRect = cusocietySection?.getBoundingClientRect();

      const inAboutView = aboutRect
        ? aboutRect.top < 20 && aboutRect.bottom > 20
        : false;
      const inProjectView = projectRect
        ? projectRect.top < 20 && projectRect.bottom > 20
        : false;
      const inContactView = contactRect
        ? contactRect.bottom < window.innerHeight + 65
        : false;
      const inCUSocietyView = cusocietyRect
        ? cusocietyRect.top < 80 &&
          cusocietyRect.bottom > 0 &&
          cusocietyRect.bottom < window.innerHeight + 65
        : false;

      setIsInAboutView(inAboutView);
      setIsInProjectView(inProjectView);
      setIsInContactView(inContactView);
      setIsInCUSocietyView(inCUSocietyView);

      if (inProjectView) {
        setHasBorder(true);
      } else {
        setHasBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // --------------------------- Variables ---------------------------
  //region Variables
  const isBgBlack = isInContactView || isInCUSocietyView;

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
        overflow: "hidden",
      }}
    >
      <Toolbar
        sx={{
          padding: "0px !important",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
        }}
      >
        <BambiiLogo isLight={isBgBlack} isInProjectView={isInProjectView} />
        <Stack spacing={1.25} direction="row" paddingRight={2}>
          {menus.map((menu, index) => (
            <NavBarItem
              key={`${index}-${menu.name}`}
              {...menu}
              isLight={isBgBlack}
              isInProjectView={isInProjectView}
            />
          ))}
        </Stack>

        <ContactButton hasBorder={hasBorder} isBlack={isBgBlack} />
      </Toolbar>

      <GradualBlur
        target="parent"
        position="top"
        height="5rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={1}
      />
    </AppBar>
  );
};

export default NavBar;
