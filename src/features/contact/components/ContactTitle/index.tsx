import { useState } from "react";

import { Typography } from "@mui/material";

const ContactTitle = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [isTurn, setIsTurn] = useState(false);
  const [isIdea, setIsIdea] = useState(false);
  const [isInto, setIsInto] = useState(false);
  const [isReality, setIsReality] = useState(false);

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const onMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    const text = event.currentTarget.innerText;

    switch (text) {
      case "Turn":
        setIsTurn(true);
        break;
      case "Ideas":
        setIsIdea(true);
        break;
      case "Into":
        setIsInto(true);
        break;
      case "Reality":
        setIsReality(true);
        break;
      default:
        break;
    }
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Typography
      top={200}
      left={270}
      width={320}
      variant="h4"
      fontSize={60}
      color="white"
      position="absolute"
      sx={{
        ".turn-text": {
          color: isTurn ? "white" : "colors.darkGray3",
          transition: "color 0.8s ease",
        },
        ".ideas-text": {
          color: isIdea ? "white" : "colors.darkGray3",
          transition: "color 0.8s ease",
        },
        ".into-text": {
          color: isInto ? "white" : "colors.darkGray3",
          transition: "color 0.8s ease",
        },
        ".reality-text": {
          fontStyle: "italic",
          color: isReality ? "colors.lightPink" : "colors.darkGray3",
          fontFamily: "PlayfairDisplay",
          transition: "color 0.8s ease",
        },
      }}
    >
      <span className="turn-text" onMouseEnter={onMouseEnter}>
        Turn
      </span>{" "}
      <span className="ideas-text" onMouseEnter={onMouseEnter}>
        Ideas
      </span>{" "}
      <span className="into-text" onMouseEnter={onMouseEnter}>
        Into
      </span>{" "}
      <span className="reality-text" onMouseEnter={onMouseEnter}>
        Reality
      </span>
    </Typography>
  );
};

export default ContactTitle;
