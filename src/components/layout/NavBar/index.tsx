import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChevronUp, Menu, X } from "lucide-react";

import GradualBlur from "@/components/animate-ui/GradualBlur";
import BambiiLogo from "@/components/ui/BambiiLogo";

import ContactButton from "../ContactButton";
import NavBarItem from "../NavBarItem";
import { menus, sidebarMenus } from "./constants";

const NavBar = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isShortScreen = useMediaQuery("(max-height:500px)");

  const [hasBorder, setHasBorder] = useState(true);
  const [isInProjectView, setIsInProjectView] = useState(false);
  const [isInContactView, setIsInContactView] = useState(false);
  const [isInCUSocietyView, setIsInCUSocietyView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // HomePage is always mounted (display:none on other pages), so its
    // elements (#project-view, #contact-view) persist in the DOM. Use
    // pathname to decide which detections are relevant for the current page.
    const isHome = pathname === "/";
    const isBranding = pathname === "/branding";

    const handleScroll = () => {
      let inProjectView = false;
      let inContactView = false;
      let inCUSocietyView = false;

      if (isHome) {
        const projectRect =
          document.getElementById("project-view")?.getBoundingClientRect();
        const contactRect =
          document.getElementById("contact-view")?.getBoundingClientRect();

        inProjectView = projectRect
          ? projectRect.top < 20 && projectRect.bottom > 20
          : false;
        inContactView = contactRect
          ? contactRect.bottom < window.innerHeight + 65
          : false;
      }

      if (isBranding) {
        const cusocietyRect =
          document.getElementById("cusociety-view")?.getBoundingClientRect();

        inCUSocietyView = cusocietyRect
          ? cusocietyRect.top < 80 &&
            cusocietyRect.bottom > 0 &&
            cusocietyRect.bottom < window.innerHeight + 65
          : false;
      }

      setIsInProjectView(inProjectView);
      setIsInContactView(inContactView);
      setIsInCUSocietyView(inCUSocietyView);
      setHasBorder(inProjectView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close drawer when switching to desktop
  if (isDesktop && drawerOpen) {
    setDrawerOpen(false);
  }

  // --------------------------- Variables ---------------------------
  //region Variables
  const isBgBlack = isInContactView || isInCUSocietyView;

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const handleSidebarNavigate = (hash?: string) => {
    setDrawerOpen(false);
    if (hash) {
      navigate("/" + hash);
    } else {
      navigate("/");
    }
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          p: isShortScreen ? "2px 12px" : { xs: "10px 20px", sm: "10px 40px", lg: "10px 80px" },
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

          {isDesktop ? (
            <>
              <Stack spacing={1.25} direction="row" sx={{ pr: 2 }}>
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
            </>
          ) : (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: isBgBlack ? "white" : "text.primary",
                transition: "color 0.6s ease-in-out",
              }}
            >
              <Menu size={isShortScreen ? 20 : 28} />
            </IconButton>
          )}
        </Toolbar>

        <GradualBlur
          target="parent"
          position="top"
          height={isShortScreen ? "2.5rem" : "5rem"}
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          zIndex={1}
        />
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "75vw", sm: "50vw" },
            maxWidth: 400,
            bgcolor: "colors.bambiiGray",
            padding: "20px 24px",
          },
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{
            alignSelf: "flex-start",
            color: "text.primary",
            marginBottom: 2,
          }}
        >
          <X size={24} />
        </IconButton>

        {/* Menu items */}
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          {sidebarMenus.map((menu, index) => (
            <Box
              key={`${index}-${menu.name}`}
              onClick={() => handleSidebarNavigate(menu.hash)}
              sx={{
                cursor: "pointer",
                padding: "8px 0",
                "&:hover": {
                  color: "colors.bambiiPink",
                },
              }}
            >
              <Typography fontSize={16} fontWeight={500}>
                {menu.name}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Get in Touch button */}
        <Button
          onClick={() => handleSidebarNavigate("#contact-view")}
          sx={{
            alignSelf: "flex-start",
            color: "white",
            borderRadius: 7.5,
            padding: "10px 24px",
            bgcolor: "colors.bambiiPink",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 3,
            "&:hover": {
              bgcolor: "colors.bambiiPink",
              opacity: 0.9,
            },
          }}
        >
          Get in Touch
        </Button>

        {/* Language selector */}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Typography fontSize={14} fontWeight={600}>
            EN
          </Typography>
          <ChevronUp size={16} />
        </Stack>
      </Drawer>
    </>
  );
};

export default NavBar;
