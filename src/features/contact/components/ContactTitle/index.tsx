import { useState } from "react";

import { Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type ContactTitleProps = {
  sx?: SxProps<Theme>;
  alwaysActive?: boolean;
};

const ContactTitle = ({ sx, alwaysActive = false }: ContactTitleProps) => {
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
      variant="h4"
      color="white"
      sx={{
        ".turn-text": {
          color: alwaysActive || isTurn ? "white" : "colors.darkGray3",
          transition: "color 0.8s ease",
        },
        ".ideas-text": {
          color: alwaysActive || isIdea ? "white" : "colors.darkGray3",
          transition: "color 0.8s ease",
        },
        ".into-text": {
          color: alwaysActive || isInto ? "white" : "colors.darkGray3",
          transition: "color 0.8s ease",
        },
        ".reality-text": {
          fontStyle: "italic",
          color: alwaysActive || isReality ? "colors.lightPink" : "colors.darkGray3",
          fontFamily: "PlayfairDisplay",
          transition: "color 0.8s ease",
        },
        ...((sx ?? {}) as Record<string, unknown>),
      }}
    >
      <span className="turn-text" onMouseEnter={onMouseEnter}>
        Turn
      </span>{" "}
      <span className="ideas-text" onMouseEnter={onMouseEnter}>
        Ideas
      </span>{" "}
      <br />
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
