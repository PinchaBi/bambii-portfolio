import { INSTRAGRAM_LINK, LINE_LINK, LINKEDIN_LINK } from "@/constants/contact";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const TextFieldSx = {
  width: "100%",
  borderRadius: 2,
  border: "1.5 solid",
  ".MuiInputBase-root": {
    height: 40,
  },
  ".MuiInputBase-input": {
    paddingY: 0,
  },
  "&:hover .MuiInputBase-root": {
    borderColor: "colors.bambiiPink",
  },
};

type LinkBoxProps = {
  url: string;
  image: string;
  hoverBgColor: string;
};

const LinkBox = ({ url, image, hoverBgColor }: LinkBoxProps) => {
  return (
    <Box
      onClick={() => window.open(url, "_blank")}
      sx={{
        width: 34,
        padding: 1,
        height: 34,
        borderRadius: 2.5,
        cursor: "pointer",
        bgcolor: "colors.mediumGray",
        "&:hover": {
          bgcolor: hoverBgColor,
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{
          width: 18,
          height: 18,
          objectFit: "cover",
          position: "absolute",
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </Box>
  );
};

const ContactBox = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // --------------------------- Renders ---------------------------
  //region Renders

  const handleSend = () => {
    alert(`Name: ${nameRef.current?.value}\nEmail: ${emailRef.current?.value}\nDescription: ${descriptionRef.current?.value}
      `);
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack
      top={270}
      width={500}
      right={170}
      spacing={2.5}
      padding={3.75}
      bgcolor="white"
      borderRadius={5}
      position="absolute"
    >
      <Typography variant="h2" fontSize={24}>
        Let’s Talk!
      </Typography>
      <Typography variant="caption" lineHeight="14px">
        I’m always open to new ideas, collaborations, and opportunities. Feel
        free to drop me a message anytime.
      </Typography>

      <Stack
        padding={2}
        width="100%"
        direction="row"
        borderRadius={2.5}
        bgcolor="colors.lightGray"
        justifyContent="space-between"
      >
        <Stack>
          <Typography variant="h4" fontSize={16}>
            Reach me at
          </Typography>
          <Stack direction="row" color="colors.bambiiPink">
            <Typography variant="h4" fontSize={16}>
              bammbi.wws@gmail.com
            </Typography>
            <ArrowUpRight size={20} />
          </Stack>
        </Stack>
        <Stack spacing={1.25} direction="row" alignItems="center">
          {/* Instragram Logo */}
          <LinkBox
            url={INSTRAGRAM_LINK}
            hoverBgColor="colors.lightPink"
            image={"/images/contact/Instragram-logo.png"}
          />

          {/* Line Logo */}
          <LinkBox
            url={LINE_LINK}
            hoverBgColor="colors.lightGreen"
            image={"/images/contact/Line-logo.png"}
          />

          {/* Linked in Logo */}
          <LinkBox
            url={LINKEDIN_LINK}
            hoverBgColor="colors.lightBlue"
            image={"/images/contact/Linked-in-logo.png"}
          />
        </Stack>
      </Stack>

      <Divider
        sx={{
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        OR
      </Divider>
      <Stack spacing={1.25}>
        <Typography variant="h4" fontSize={16}>
          Leave me a message below
        </Typography>
        <Stack spacing={1.25}>
          <Stack spacing={1.25} direction="row">
            <TextField
              ref={nameRef}
              variant="outlined"
              sx={TextFieldSx}
              placeholder="Your Name"
              onChange={(e) => {
                if (nameRef.current) {
                  nameRef.current.value = e.target.value;
                }
              }}
            />
            <TextField
              ref={emailRef}
              variant="outlined"
              sx={TextFieldSx}
              placeholder="Email"
              onChange={(e) => {
                if (emailRef.current) {
                  emailRef.current.value = e.target.value;
                }
              }}
            />
          </Stack>
          <TextField
            ref={descriptionRef}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{
              width: "100%",
              borderRadius: 2,
              border: "1.5 solid",
              ".MuiInputBase-input": {
                paddingY: 0,
              },
            }}
            placeholder="Briefly describe your idea..."
            onChange={(e) => {
              if (descriptionRef.current) {
                descriptionRef.current.value = e.target.value;
              }
            }}
          />
        </Stack>
        <Button
          onClick={handleSend}
          sx={{
            gap: 1.25,
            color: "white",
            borderRadius: 2.5,
            padding: "10px 20px",
            background:
              "linear-gradient(to top right, #CC2C66, #F13A7D, #FFD9E7)",
            "&:hover": {
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
          }}
        >
          <Typography variant="button">Send</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default ContactBox;
