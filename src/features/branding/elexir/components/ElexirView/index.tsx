import { Stack, Typography, useMediaQuery } from "@mui/material";
import { motion } from "motion/react";

import Wrapper from "@/components/layout/Wrapper";

import ElexirCarousel from "../ElexirCarousel";

const ElexirView = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:599px)");
  const isTablet = !isDesktop && !isMobile;
  const isSmallTablet = useMediaQuery(
    "(min-width:600px) and (max-width:899px)",
  );

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      alignItems="center"
      justifyContent={isMobile ? "flex-start" : "center"}
      bgcolor="colors.bambiiGray"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
        style={{ width: isDesktop ? "auto" : "100%" }}
      >
        <Stack
          width={isDesktop ? 1200 : "100%"}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ px: isDesktop ? 0 : isMobile ? 3 : isSmallTablet ? 2 : 3 }}
        >
          <Stack
            spacing={isDesktop ? 7.5 : isMobile ? 2.5 : 5}
            width={
              isDesktop
                ? 715
                : isSmallTablet
                  ? "65%"
                  : isTablet
                    ? "60%"
                    : "100%"
            }
            sx={{ pt: isMobile ? "max(80px, 25dvh)" : 0 }}
          >
            <ElexirCarousel />
            <Stack
              spacing={isDesktop ? 3.75 : 2.5}
              direction={isDesktop ? "row" : "column"}
            >
              <Stack width={isDesktop ? 345 : "100%"}>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  viewport={{ amount: 0.3 }}
                  variant="subtitle2"
                  color="colors.darkGray3"
                >
                  2025 • ELEXIR • Visual & Content Designer
                </Typography>
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  viewport={{ amount: 0.3 }}
                  variant="h2"
                  fontSize={isMobile ? 24 : 32}
                >
                  Designing clarity for a trust-based product
                </Typography>
              </Stack>
              <Typography
                component={motion.div}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                viewport={{ amount: 0.3 }}
                width={isDesktop ? 345 : "100%"}
                variant="caption"
                lineHeight="16px"
                fontSize={isMobile ? 12 : undefined}
              >
                Elexir is a migraine relief device imported from Korea,
                requiring visuals that felt both trustworthy and informative.
                <br />
                <br />
                The focus shifted from expressive branding to clear
                communication, highlighting product benefits while maintaining
                credibility. This project strengthened my ability to design
                responsibly in health-related contexts.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export default ElexirView;
