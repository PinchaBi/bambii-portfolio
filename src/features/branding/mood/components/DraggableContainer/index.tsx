import { motion } from "motion/react";

import useCardRotation from "../../hooks/useCardRotation";

type DraggableContainerProps = {
  children: React.ReactNode;
  onSendToBack?: () => void;
};

const DraggableContainer = ({
  children,
  onSendToBack,
}: DraggableContainerProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const { x, y, handleDragEnd } = useCardRotation(onSendToBack);

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <motion.div
      drag
      dragElastic={1}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      style={{
        x,
        y,
        cursor: "grab",
        position: "absolute",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
};

export default DraggableContainer;
