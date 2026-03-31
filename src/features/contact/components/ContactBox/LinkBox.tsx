import { Box } from "@mui/material";

type LinkBoxProps = {
  url: string;
  image: string;
  hoverBgColor: string;
  size?: number;
};

const LinkBox = ({ url, image, hoverBgColor, size = 34 }: LinkBoxProps) => {
  const iconSize = Math.round(size * 0.53);

  return (
    <Box
      onClick={() => window.open(url, "_blank")}
      sx={{
        width: size,
        height: size,
        borderRadius: 2.5,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          width: iconSize,
          height: iconSize,
          objectFit: "cover",
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </Box>
  );
};

export default LinkBox;
