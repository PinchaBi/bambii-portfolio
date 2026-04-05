import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import useBreakpoint from "@/hooks/useBreakpoint";

import Wrapper from "@/components/layout/Wrapper";

import ElexirCarousel from "../ElexirCarousel";

const ElexirView = () => {
  const { isMobile, isDesktop } = useBreakpoint();

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
          sx={{ px: { xs: 3, sm: 2, md: 3, lg: 0 } }}
        >
          <Stack
            spacing={{ xs: 2.5, sm: 5, lg: 7.5 }}
            width={{
              xs: "100%",
              sm: "65%",
              md: "60%",
              lg: 715,
            }}
            sx={{ pt: { xs: "max(80px, 25dvh)", sm: 0 } }}
          >
            <ElexirCarousel />
            <Stack
              spacing={{ xs: 2.5, lg: 3.75 }}
              direction={{ xs: "column", lg: "row" }}
            >
              <Stack width={{ xs: "100%", lg: 345 }}>
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
                  fontSize={{ xs: 24, lg: 32 }}
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
                width={{ xs: "100%", lg: 345 }}
                variant="caption"
                lineHeight="16px"
                fontSize={{ xs: 12, lg: "inherit" }}
              >
                Elexir is a migraine relief device imported from Korea, requiring
                visuals that felt both trustworthy and informative.
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
