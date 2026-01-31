import ContactBox from "../ContactBox";
import { Typography } from "@mui/material";
import Wrapper from "@/components/layout/Wrapper";

export default function ContactView() {
  return (
    <Wrapper
      sx={{
        height: "100vh",
        bgcolor: "colors.bambiiBlack",
      }}
    >
      <Typography
        top={270}
        left={170}
        width={420}
        variant="h4"
        fontSize={80}
        color="white"
        position="absolute"
        sx={{
          ".reality-text": {
            fontStyle: "italic",
            color: "colors.lightPink",
            fontFamily: "PlayfairDisply",
          },
        }}
      >
        Turn Ideas Into <span className="reality-text">Reality</span>
      </Typography>
      <ContactBox />
    </Wrapper>
  );
}
