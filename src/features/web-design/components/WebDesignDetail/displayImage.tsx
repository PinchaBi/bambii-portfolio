import { Box, Stack } from "@mui/material";

const displayTemplate = (images: string[]) => {
  return (
    <Stack>
      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`image-${index}`}
          width={100}
          height={100}
        ></Box>
      ))}
    </Stack>
  );
};

const DentaSuit = ({ images }: { images: string[] }) => {
  return displayTemplate(images);
};

const VeranaPress = ({ images }: { images: string[] }) => {
  return displayTemplate(images);
};

const CUConnex = ({ images }: { images: string[] }) => {
  return displayTemplate(images);
};

const Horoscope = ({ images }: { images: string[] }) => {
  return displayTemplate(images);
};

const SermKrangKit = ({ images }: { images: string[] }) => {
  return displayTemplate(images);
};

const FlickFinder = ({ images }: { images: string[] }) => {
  return displayTemplate(images);
};

const BlindView = ({ images }: { images: string[] }) => {
  return displayTemplate(images);
};
export {
  DentaSuit,
  VeranaPress,
  CUConnex,
  Horoscope,
  SermKrangKit,
  FlickFinder,
  BlindView,
};
