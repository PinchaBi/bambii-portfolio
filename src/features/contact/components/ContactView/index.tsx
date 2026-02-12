import useRevealStore from "@/stores/revealStore";
import { AnimatePresence, motion } from "framer-motion";

import DotGrid from "@/components/animate-ui/DotGrid";
import Wrapper from "@/components/layout/Wrapper";

import ContactBox from "../ContactBox";
import ContactTitle from "../ContactTitle";

const ContactView = () => {
  const isRevealed = useRevealStore((state) => state.isRevealed);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Wrapper
      sx={{
        bgcolor: "colors.bambiiBlack",
      }}
    >
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <DotGrid
              dotSize={5}
              gap={15}
              baseColor="#381f23"
              activeColor="#f13a7d"
              proximity={120}
              shockRadius={250}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactTitle />
      <ContactBox />
    </Wrapper>
  );
};

export default ContactView;
