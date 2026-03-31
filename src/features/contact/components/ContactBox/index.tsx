import { useState } from "react";

import { INSTRAGRAM_LINK, LINE_LINK, LINKEDIN_LINK } from "@/constants/contact";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { verifyEmail } from "@/utils/emailValidation";

import LinkBox from "./LinkBox";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const contactSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const TextFieldSx = {
  width: "100%",
  borderRadius: 2,
  ".MuiInputBase-root": {
    height: 40,
  },
  ".MuiInputBase-input": {
    height: 40,
    paddingY: 0,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "colors.darkGray3",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1.25,
    },
  },
};

type ContactBoxProps = {
  sx?: SxProps<Theme>;
  offset?: { x: number; y: number };
  onHoverChange?: (hovering: boolean) => void;
  stackedContactInfo?: boolean;
  compact?: boolean;
};

const ContactBox = ({
  sx,
  offset = { x: 0, y: 0 },
  onHoverChange,
  stackedContactInfo = false,
  compact = false,
}: ContactBoxProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // --------------------------- Handlers ---------------------------
  //region Handlers

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    try {
      const verification = await verifyEmail(data.email);
      if (!verification.isValid) {
        setError("email", {
          type: "manual",
          message: verification.error || "Invalid email address.",
        });
        setIsLoading(false);
        return;
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        PUBLIC_KEY,
      );
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <>
      <Stack
        component={motion.div}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
        spacing={compact ? 0.5 : { xs: 1, sm: 1.5 }}
        sx={{
          padding: compact ? 1 : { xs: 1.5, sm: 2.5 },
          bgcolor: "white",
          borderRadius: compact ? 3 : 5,
          ...((sx ?? {}) as Record<string, unknown>),
        }}
      >
        <Typography variant="h2" fontSize={compact ? 16 : { xs: 20, sm: 24 }}>
          Let's Talk!
        </Typography>
        <Typography variant="caption" lineHeight={compact ? "12px" : "14px"} fontSize={compact ? 10 : { xs: 11, sm: 12 }}>
          I'm always open to new ideas, collaborations, and opportunities. Feel
          free to drop me a message anytime.
        </Typography>

        <Stack
          padding={compact ? 0.75 : { xs: 1, sm: 2 }}
          width="100%"
          direction={stackedContactInfo ? "column" : "row"}
          borderRadius={2.5}
          bgcolor="colors.lightGray"
          justifyContent={stackedContactInfo ? "flex-start" : "space-between"}
          alignItems={compact ? "center" : undefined}
          spacing={stackedContactInfo ? 0.75 : 0}
        >
          <Stack>
            <Typography variant="h4" fontSize={compact ? 11 : { xs: 12, sm: 16 }}>
              Reach me at
            </Typography>
            <Stack
              component="a"
              href="mailto:bammbi.wws@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              direction="row"
              sx={{
                alignItems: "center",
                color: "colors.bambiiPink",
                textDecoration: "none",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: "1.5px",
                  bgcolor: "colors.bambiiPink",
                  transition: "width 0.3s ease",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              <Typography variant="h4" fontSize={compact ? 11 : { xs: 12, sm: 16 }}>
                bammbi.wws@gmail.com
              </Typography>
              <ArrowUpRight size={compact ? 14 : stackedContactInfo ? 16 : 20} />
            </Stack>
          </Stack>
          <Stack spacing={compact ? 0.5 : 1} direction="row" sx={{ alignItems: "center" }}>
            <LinkBox
              url={INSTRAGRAM_LINK}
              hoverBgColor="colors.lightPink"
              image={"/images/contact/Instragram-logo.png"}
              size={compact ? 24 : stackedContactInfo ? 28 : 34}
            />
            <LinkBox
              url={LINE_LINK}
              hoverBgColor="colors.lightGreen"
              image={"/images/contact/Line-logo.png"}
              size={compact ? 24 : stackedContactInfo ? 28 : 34}
            />
            <LinkBox
              url={LINKEDIN_LINK}
              hoverBgColor="colors.lightBlue"
              image={"/images/contact/Linked-in-logo.png"}
              size={compact ? 24 : stackedContactInfo ? 28 : 34}
            />
          </Stack>
        </Stack>

        <Divider sx={{ fontSize: compact ? 9 : { xs: 10, sm: 12 }, fontWeight: 400 }}>OR</Divider>
        <Stack
          spacing={compact ? 0.5 : { xs: 1, sm: 2.5 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            ...((stackedContactInfo || compact) && {
              "& .MuiInputBase-root:not(.MuiInputBase-multiline)": { height: compact ? 30 : 34 },
              "& .MuiInputBase-input": { fontSize: compact ? 11 : 12 },
            }),
          }}
        >
          <Stack spacing={compact ? 0.5 : { xs: 0.75, sm: 1 }}>
            <Typography variant="h4" fontSize={compact ? 11 : { xs: 13, sm: 16 }}>
              Leave me a message below
            </Typography>
            <Stack spacing={compact ? 0.5 : { xs: 0.75, sm: 1.25 }} direction="row">
              <Stack width="100%">
                <TextField
                  variant="outlined"
                  sx={TextFieldSx}
                  placeholder="Your Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
                />
              </Stack>
              <Stack width="100%">
                <TextField
                  variant="outlined"
                  sx={TextFieldSx}
                  placeholder="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
                />
              </Stack>
            </Stack>
            <TextField
              variant="outlined"
              multiline
              rows={compact ? 1 : stackedContactInfo ? 2 : 4}
              fullWidth
              sx={{
                width: "100%",
                borderRadius: 2,
                ".MuiInputBase-input": {
                  paddingY: 0,
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "colors.darkGray3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: 1.25,
                  },
                },
              }}
              placeholder="Briefly describe your idea..."
              error={!!errors.message}
              helperText={errors.message?.message}
              {...register("message")}
            />
          </Stack>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            type="submit"
            disabled={isLoading}
            sx={{
              gap: 1.25,
              color: "white",
              borderRadius: 2.5,
              padding: compact ? "6px 16px" : "10px 20px",
              fontSize: compact ? 12 : undefined,
              background:
                "linear-gradient(to top right, #CC2C66, #F13A7D, #FFD9E7)",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <Typography variant="button">Send</Typography>
            )}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
ContactBox.displayName = "ContactBox";

export default ContactBox;
