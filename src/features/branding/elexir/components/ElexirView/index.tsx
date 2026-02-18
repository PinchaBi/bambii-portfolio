import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import Wrapper from "@/components/layout/Wrapper";

import ElexirCarousel from "../ElexirCarousel";

const ElexirView = () => {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      alignItems="center"
      justifyContent="center"
      bgcolor="colors.bambiiGray"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        <Stack
          width={1200}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Stack spacing={7.5} width={715}>
            <ElexirCarousel />
            <Stack spacing={3.75} direction="row">
              <Stack width={345}>
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
                  fontSize={32}
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
                width={345}
                variant="caption"
                lineHeight="16px"
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
