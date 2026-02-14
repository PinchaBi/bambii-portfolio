import { Box } from "@mui/material";

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

export default LinkBox;
