export type ItemVariant = "image" | "glass" | "model";

export type IllustratorCompanion = {
  image: string;
  widthRatio: number; // fraction of the main item's width
  heightRatio: number; // fraction of the main item's height
  offsetX?: number; // extra px gap from the right edge (default 0)
  offsetY?: number; // px shift down from vertical-center (default 0)
  rotation?: number; // rotation in degrees (default 0)
  zIndex?: number; // stacking order relative to other companions (default auto)
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
  companions?: IllustratorCompanion[];
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
    hoverY: 30,
    hoverScale: 1.3,
    noRotateOnHover: true,
    linkedIds: [
      { id: 2, liftY: 60, liftX: 15 },
      { id: 3, liftY: 15, liftX: 15 },
      { id: 4, liftY: 15, liftX: 15 },
      { id: 5, liftY: 15, liftX: 15 },
      { id: 6, liftY: 15, liftX: 15 },
    ],
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
    hoverY: 30,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [
      { id: 3, liftY: 15, liftX: 15 },
      { id: 4, liftY: 15, liftX: 15 },
    ],
    width: 160,
    height: 160,
    x: 3,
    y: 25,
    rotation: -10,
  },
  {
    id: 3,
    name: "BAAC Sticker",
    variant: "image",
    image: "/images/illustrator/BAAC-Sticker/BAAC_1.png",
    hoverY: 30,
    hoverScale: 1.3,
    noRotateOnHover: true,
    linkedIds: [
      { id: 2, liftX: -20 },
      { id: 4, liftY: 10, liftX: 50 },
    ],
    companions: [
      {
        image: "/images/illustrator/BAAC-Sticker/BAAC_2.png",
        widthRatio: 1,
        heightRatio: 1,
        offsetX: -320,
        offsetY: 150,
      },
      {
        image: "/images/illustrator/BAAC-Sticker/BAAC_3.png",
        widthRatio: 1,
        heightRatio: 1,
        offsetX: -120,
        offsetY: 180,
      },
    ],
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
    hoverY: 20,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    width: 110,
    height: 110,
    x: 26,
    y: 10,
    rotation: -10,
  },
  {
    id: 5,
    name: "SD Deetee Sood",
    variant: "glass",
    image: "/images/illustrator/Logo/SD_logo.png",
    hoverY: 30,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [{ id: 4, liftY: 20, liftX: -40 }],
    width: 110,
    height: 110,
    x: 30,
    y: 30,
    rotation: 10,
  },
  {
    id: 6,
    name: "Stat55",
    variant: "glass",
    image: "/images/illustrator/StatShirt/stat55.png",
    hoverY: 30,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [
      { id: 2, liftX: -10 },
      { id: 3, liftY: 55, liftX: -10 },
      { id: 4, liftY: 50 },
      { id: 5, liftY: 50, liftX: 10 },
    ],
    width: 150,
    height: 150,
    x: 23,
    y: 48,
    rotation: 10,
  },
  {
    id: 7,
    name: "Ticket",
    variant: "image",
    image: "/images/illustrator/Ticket.png",
    hoverY: 20,
    hoverScale: 1.3,
    noRotateOnHover: true,
    linkedIds: [
      { id: 1, liftY: 20, liftX: -30 },
      { id: 2, liftY: 10 },
      { id: 3, liftY: 30 },
      { id: 4, liftY: 40, liftX: -10 },
      { id: 5, liftY: 45, liftX: 10 },
      { id: 6, liftY: 40, liftX: 20 },
      { id: 8, liftX: 40 },
    ],
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
    hoverY: 20,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [
      { id: 3, liftY: 10 },
      { id: 4, liftX: 10 },
      { id: 5, liftY: 10, liftX: 30 },
      { id: 6, liftY: 20, liftX: 20 },
      { id: 7, liftX: -20 },
      { id: 9, liftY: 40, liftX: 10 },
    ],
    width: 150,
    height: 150,
    x: 36,
    y: 70,
    rotation: -10,
  },
  {
    id: 9,
    name: "KiyoTube 3D",
    variant: "model",
    image: "/images/illustrator/KiyoTube/kiyoTube.glb",
    hoverRotationX: -15,
    hoverRotationY: 15,
    hoverRotationZ: -5,
    hoverX: 10,
    hoverY: 15,
    linkedIds: [
      { id: 4, liftY: 10, liftX: -30 },
      { id: 5, liftY: 20, liftX: -20 },
      { id: 10, liftX: 20 },
      { id: 11, liftX: 20 },
      { id: 12, liftX: 20 },
      { id: 13, liftX: 20 },
      { id: 14, liftX: 20 },
      { id: 15, liftX: 20 },
      { id: 16, liftX: 20 },
      { id: 17, liftX: 20 },
    ],
    width: 230,
    height: 380,
    x: 35,
    y: 2,
    rotation: 0,
    modelMargin: 0.6,
  },
  {
    id: 10,
    name: "Pink Jersey",
    variant: "image",
    image: "/images/illustrator/Jersey/Pink_front.png",
    linkedIds: [{ id: 9, liftX: -20 }],
    companions: [
      {
        image: "/images/illustrator/Jersey/White_front.png",
        widthRatio: 1,
        heightRatio: 1,
        offsetX: -490,
        offsetY: -50,
        zIndex: -1,
        rotation: -10,
      },
    ],
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
    hoverY: 20,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [
      { id: 10, liftX: -20 },
      { id: 12, liftY: 40 },
      { id: 13, liftX: -50 },
      { id: 14, liftY: -20, liftX: 20 },
      { id: 15, liftY: -10, liftX: 30 },
      { id: 16, liftX: 20 },
      { id: 17, liftX: 20 },
    ],
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
    hoverY: 20,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [
      { id: 10, liftX: -10 },
      { id: 13, liftY: 10, liftX: -50 },
      { id: 14, liftY: -10, liftX: -40 },
      { id: 15, liftY: 30, liftX: 30 },
    ],
    companions: [
      {
        image: "/images/illustrator/Logo/FARM_FAIR_2.png",
        widthRatio: 1,
        heightRatio: 1,
        offsetX: -310,
      },
    ],
    width: 150,
    height: 150,
    x: 68,
    y: 40,
    rotation: -10,
  },
  {
    id: 13,
    name: "TSL Logo",
    variant: "glass",
    image: "/images/illustrator/Logo/Logo_final.png",
    hoverY: 20,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [
      { id: 12, liftY: -10, liftX: 10 },
      { id: 14, liftX: 20 },
      { id: 15, liftX: 10 },
    ],
    width: 110,
    height: 110,
    x: 64,
    y: 22,
    rotation: 10,
  },

  // ─── Right cluster ───
  {
    id: 14,
    name: "TSL Namecard",
    variant: "image",
    image: "/images/illustrator/TSLNamecard/card.JPG",
    hoverScale: 1.3,
    hoverX: 15,
    hoverY: 20,
    width: 160,
    height: 100,
    x: 72,
    y: 6,
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
    hoverRotation: 0,
    linkedIds: [{ id: 14, liftY: 25, liftX: -30 }],
    width: 150,
    height: 150,
    x: 78,
    y: 25,
    rotation: 10,
  },
  {
    id: 16,
    name: "Mascot Cat",
    variant: "image",
    image: "/images/illustrator/MascotCat/1.png",
    hoverImage: "/images/illustrator/MascotCat/Pose/Pose_3-Like.png",
    hoverX: 40,
    hoverY: 30,
    hoverScale: 1.3,
    hoverRotation: 0,
    noRotateOnHover: true,
    linkedIds: [
      { id: 14, liftY: 30 },
      { id: 15, liftY: 40 },
      { id: 17, liftY: 150 },
    ],
    companions: [
      {
        image: "/images/illustrator/MascotCat/3.png",
        widthRatio: 0.62,
        heightRatio: 0.62,
        offsetX: -50,
        offsetY: 30,
      },
    ],
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
    hoverY: 50,
    linkedIds: [
      { id: 15, liftX: -30, liftY: 40 }, // Stat Day → top-left
      { id: 14, liftX: -30, liftY: 30 }, // MascotCat → left
    ],
    width: 165,
    height: 360,
    x: 88,
    y: 35,
    rotation: 0,
    modelMargin: 0.6,
  },
];
