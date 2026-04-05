import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import type { Item, StackType } from "../../constants";
import { stackList } from "../../constants";
import DraggableContainer from "../DraggableContainer";

// Deterministic pseudo-random rotation from id (-15 to 15 degrees)
const getRotation = (id: number) => {
  const hash = Math.sin(id * 9301 + 49297) * 49297;
  return (hash - Math.floor(hash)) * 30 - 15;
};

type StackCardImageProps = {
  item: Item;
  stack: StackType;
  index: number;
};

const StackCardImage = ({ item, stack, index }: StackCardImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      component="img"
      src={item.image}
      alt={`${stack} ${index + 1}`}
      draggable={false}
      onLoad={() => setLoaded(true)}
      sx={{
        width: { xs: item.width * 0.45, sm: item.width * 0.55, md: item.width * 0.65, lg: item.width * 0.75 },
        height: { xs: item.height * 0.45, sm: item.height * 0.55, md: item.height * 0.65, lg: item.height * 0.75 },
        borderRadius: 5,
        objectFit: "cover",
        userSelect: "none",
        pointerEvents: "none",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s ease-in",
      }}
    />
  );
};

type StackCardProps = {
  stack: StackType;
};

const StackCard = ({ stack }: StackCardProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const [items, setItems] = useState<Item[]>(stackList["social"]);

  useEffect(() => {
    setItems(stackList[stack]);
  }, [stack]);

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const sendToBack = (id: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      const index = newItems.findIndex((item) => item.id === id);
      const [item] = newItems.splice(index, 1);
      newItems.unshift(item);
      return newItems;
    });
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  if (items.length === 0) return <Box width={300} />;

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        cursor: "grab",
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        // perspective: 600,
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={stack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {items.map((item, index) => {
            const { id } = item;

            return (
              <DraggableContainer key={id} onSendToBack={() => sendToBack(id)}>
                <motion.div
                  initial={false}
                  style={{
                    borderRadius: 20,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}
                  animate={{
                    rotateZ:
                      index === items.length - 1 ? 0 : getRotation(id),
                    opacity:
                      index === items.length - 1
                        ? 1
                        : 0.3 + (index / (items.length - 1)) * 0.7,
                  }}
                  //   transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <StackCardImage item={item} stack={stack} index={index} />
                </motion.div>
              </DraggableContainer>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default StackCard;
