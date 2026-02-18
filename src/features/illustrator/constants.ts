export type ItemVariant = "image" | "glass" | "model";

export type IllustratorItem = {
  id: number;
  name: string;
  variant: ItemVariant;
  image: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
};

// Positions mapped from reference image (item-position.png)
// x/y are percentages relative to the container
// width/height are placeholder — user will adjust later
export const illustratorItems: IllustratorItem[] = [
  // ─── Left cluster ───
  {
    id: 1,
    name: "Black T-shirt",
    variant: "image",
    image: "/images/illustrator/StatShirt/tshirt.png",
    width: 290,
    height: 290,
    x: 1,
    y: 52,
    rotation: 8,
  },
  {
    id: 2,
    name: "KEN BKK",
    variant: "glass",
    image: "/images/illustrator/Logo/KenBkk_Black.png",
    width: 160,
    height: 160,
    x: 5,
    y: 25,
    rotation: 0,
  },
  {
    id: 3,
    name: "BAAC Sticker",
    variant: "image",
    image: "/images/illustrator/BAAC-Sticker/BAAC_1.png",
    width: 220,
    height: 220,
    x: 15,
    y: 20,
    rotation: 0,
  },
  {
    id: 4,
    name: "SERI",
    variant: "glass",
    image: "/images/illustrator/Logo/Seri.png",
    width: 110,
    height: 110,
    x: 28,
    y: 10,
    rotation: 0,
  },
  {
    id: 5,
    name: "SD Deetee Sood",
    variant: "glass",
    image: "/images/illustrator/Logo/SD_logo.png",
    width: 110,
    height: 110,
    x: 32,
    y: 30,
    rotation: 0,
  },
  {
    id: 6,
    name: "Stat55",
    variant: "glass",
    image: "/images/illustrator/StatShirt/stat55.png",
    width: 150,
    height: 150,
    x: 25,
    y: 48,
    rotation: 0,
  },
  {
    id: 7,
    name: "Ticket",
    variant: "image",
    image: "/images/illustrator/Ticket.png",
    width: 225,
    height: 105,
    x: 20,
    y: 78,
    rotation: -12,
  },

  // ─── Center cluster ───
  {
    id: 8,
    name: "KIYO Logo",
    variant: "glass",
    image: "/images/illustrator/Logo/logo.png",
    width: 150,
    height: 150,
    x: 38,
    y: 70,
    rotation: -5,
  },
  {
    id: 9,
    name: "KiyoTube 3D",
    variant: "model",
    image: "/images/illustrator/KiyoTube/kiyoTube.glb",
    width: 230,
    height: 380,
    x: 33,
    y: 5,
    rotation: 5,
  },
  {
    id: 10,
    name: "Pink Jersey",
    variant: "image",
    image: "/images/illustrator/Jersey/Pink_front.png",
    width: 390,
    height: 390,
    x: 45,
    y: 32,
    rotation: -5,
  },

  // ─── Right-center cluster ───
  {
    id: 11,
    name: "Chula Society",
    variant: "glass",
    image: "/images/illustrator/Logo/Profile_logo.png",
    width: 150,
    height: 150,
    x: 67,
    y: 70,
    rotation: 10,
  },
  {
    id: 12,
    name: "Farm Fair",
    variant: "glass",
    image: "/images/illustrator/Logo/FARM_FAIR.png",
    width: 150,
    height: 150,
    x: 70,
    y: 40,
    rotation: -5,
  },
  {
    id: 13,
    name: "TSL Logo",
    variant: "glass",
    image: "/images/illustrator/Logo/Logo_final.png",
    width: 110,
    height: 110,
    x: 66,
    y: 22,
    rotation: 0,
  },

  // ─── Right cluster ───
  {
    id: 14,
    name: "TSL Namecard",
    variant: "image",
    image: "/images/illustrator/TSLNamecard/card.JPG",
    width: 160,
    height: 100,
    x: 72,
    y: 2,
    rotation: -8,
  },
  {
    id: 15,
    name: "Stat Day",
    variant: "glass",
    image: "/images/illustrator/Logo/statDay.png",
    width: 150,
    height: 150,
    x: 80,
    y: 25,
    rotation: 5,
  },
  {
    id: 16,
    name: "Mascot Cat",
    variant: "image",
    image: "/images/illustrator/MascotCat/1.png",
    width: 165,
    height: 240,
    x: 79,
    y: 55,
    rotation: 5,
  },
  {
    id: 17,
    name: "KiyoBox 3D",
    variant: "model",
    image: "/images/illustrator/KiyoBox/kiyoBox.glb",
    width: 165,
    height: 360,
    x: 90,
    y: 40,
    rotation: 0,
  },
];
