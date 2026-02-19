export type ItemVariant = "image" | "glass" | "model";

export type IllustratorCompanion = {
  image: string;
  widthRatio: number; // fraction of the main item's width
  heightRatio: number; // fraction of the main item's height
  offsetX?: number; // extra px gap from the right edge (default 0)
  offsetY?: number; // px shift down from vertical-center (default 0)
};

export type IllustratorItem = {
  id: number;
  name: string;
  variant: ItemVariant;
  image: string;
  hoverImage?: string;
  hoverScale?: number; // override default scale on hover (default 1.08)
  hoverX?: number; // px to shift right on hover (+right / -left)
  hoverY?: number; // px to shift up on hover   (+up   / -down)
  hoverRotation?: number; // exact 2D rotation (deg) on hover; omit = default tilt
  hoverRotationX?: number; // 3D model: target X rotation (deg) on hover
  hoverRotationY?: number; // 3D model: target Y rotation (deg) on hover
  hoverRotationZ?: number; // 3D model: target Z rotation (deg) on hover
  noRotateOnHover?: boolean;
  companion?: IllustratorCompanion;
  linkedIds?: { id: number; liftX?: number; liftY?: number }[]; // liftX: +right/-left, liftY: +up/-down
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  modelMargin?: number;
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
    x: -1,
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
    x: 3,
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
    x: 13,
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
    x: 26,
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
    x: 30,
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
    x: 23,
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
    x: 18,
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
    x: 36,
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
    x: 35,
    y: 2,
    rotation: 15,
    modelMargin: 0.6,
  },
  {
    id: 10,
    name: "Pink Jersey",
    variant: "image",
    image: "/images/illustrator/Jersey/Pink_front.png",
    width: 390,
    height: 390,
    x: 43,
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
    x: 65,
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
    x: 68,
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
    x: 64,
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
    x: 71,
    y: 4,
    rotation: -8,
  },
  {
    id: 15,
    name: "Stat Day",
    variant: "glass",
    image: "/images/illustrator/Logo/statDay.png",
    hoverScale: 1.2,
    hoverX: 10,
    hoverY: 20,
    linkedIds: [{ id: 14, liftY: 10, liftX: -10 }],
    width: 150,
    height: 150,
    x: 78,
    y: 25,
    rotation: 5,
  },
  {
    id: 16,
    name: "Mascot Cat",
    variant: "image",
    image: "/images/illustrator/MascotCat/1.png",
    hoverImage: "/images/illustrator/MascotCat/Pose/Pose_3-Like.png",
    hoverX: 30,
    hoverScale: 1.3,
    noRotateOnHover: true,
    linkedIds: [{ id: 17, liftY: 150 }],
    companion: {
      image: "/images/illustrator/MascotCat/3.png",
      widthRatio: 0.62,
      heightRatio: 0.62,
      offsetX: -30,
      offsetY: 30,
    },
    width: 165,
    height: 240,
    x: 77,
    y: 55,
    rotation: 5,
  },
  {
    id: 17,
    name: "KiyoBox 3D",
    variant: "model",
    image: "/images/illustrator/KiyoBox/kiyoBox.glb",
    hoverRotationX: -15,
    hoverRotationY: 15,
    hoverScale: 1.5,
    hoverX: 15,
    hoverY: 25,
    linkedIds: [
      { id: 15, liftX: -30, liftY: 40 }, // Stat Day → top-left
      { id: 14, liftX: -30, liftY: 20 }, // MascotCat → left
    ],
    width: 165,
    height: 360,
    x: 88,
    y: 35,
    rotation: 0,
    modelMargin: 0.6,
  },
];
