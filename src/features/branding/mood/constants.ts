// --------------------------- Instagram List ---------------------------
//region Instagram List

const firstList: string[] = [
  "/images/branding/1-Ig-carousel/post-1/1-1.jpg",
  "/images/branding/1-Ig-carousel/post-1/1-2.jpg",
  "/images/branding/1-Ig-carousel/post-1/1-3.jpg",
];
const secondList: string[] = [
  "/images/branding/1-Ig-carousel/post-2/2-1.png",
  "/images/branding/1-Ig-carousel/post-2/2-2.png",
];
const thridList: string[] = [
  "/images/branding/1-Ig-carousel/post-3/3-1.jpg",
  "/images/branding/1-Ig-carousel/post-3/3-2.jpg",
  "/images/branding/1-Ig-carousel/post-3/3-3.jpg",
  "/images/branding/1-Ig-carousel/post-3/3-4.jpg",
  "/images/branding/1-Ig-carousel/post-3/3-5.jpg",
];
const fourthList: string[] = [
  "/images/branding/1-Ig-carousel/post-4/4-1.jpg",
  "/images/branding/1-Ig-carousel/post-4/4-2.jpg",
  "/images/branding/1-Ig-carousel/post-4/4-3.jpg",
  "/images/branding/1-Ig-carousel/post-4/4-4.jpg",
];
const fifthList: string[] = [
  "/images/branding/1-Ig-carousel/post-5/5-1.png",
  "/images/branding/1-Ig-carousel/post-5/5-2.png",
  "/images/branding/1-Ig-carousel/post-5/5-3.png",
];
const sixthList: string[] = ["/images/branding/1-Ig-carousel/post-6/6-1.jpg"];
const seventhList: string[] = [
  "/images/branding/1-Ig-carousel/post-7/7-1.png",
  "/images/branding/1-Ig-carousel/post-7/7-2.png",
  "/images/branding/1-Ig-carousel/post-7/7-3.png",
  "/images/branding/1-Ig-carousel/post-7/7-4.png",
  "/images/branding/1-Ig-carousel/post-7/7-5.png",
  "/images/branding/1-Ig-carousel/post-7/7-6.png",
];
const eightList: string[] = [
  "/images/branding/1-Ig-carousel/post-8/8-1.jpg",
  "/images/branding/1-Ig-carousel/post-8/8-2.jpg",
  "/images/branding/1-Ig-carousel/post-8/8-3.jpg",
  "/images/branding/1-Ig-carousel/post-8/8-4.jpg",
];

export const instragramList: Record<number, string[]> = {
  1: firstList,
  2: secondList,
  3: thridList,
  4: fourthList,
  5: fifthList,
  6: sixthList,
  7: seventhList,
  8: eightList,
};

// --------------------------- Card Stack ---------------------------
//region Card Stack

export const STACKVALUE = {
  SOCIAL: "social",
  CAMPAIGN: "campaign",
  DIGITAL: "digital",
  PRINT: "print",
} as const;
export type StackType = (typeof STACKVALUE)[keyof typeof STACKVALUE];

type StackTitle = {
  name: string;
  value: StackType;
};

export const stackTitleList: StackTitle[] = [
  {
    name: "Social",
    value: "social",
  },
  {
    name: "Campaign",
    value: "campaign",
  },
  {
    name: "Digital",
    value: "digital",
  },
  {
    name: "Print",
    value: "print",
  },
];

export type Item = {
  id: number;
  image: string;
  width: number;
  height: number;
};

const socialList: Item[] = [
  {
    id: 6,
    image: "/images/branding/2-Mooood/Social/6.png",
    width: 300,
    height: 375,
  },
  {
    id: 5,
    image: "/images/branding/2-Mooood/Social/5.png",
    width: 300,
    height: 375,
  },
  {
    id: 4,
    image: "/images/branding/2-Mooood/Social/4.jpg",
    width: 300,
    height: 375,
  },
  {
    id: 3,
    image: "/images/branding/2-Mooood/Social/3.jpg",
    width: 300,
    height: 375,
  },
  {
    id: 2,
    image: "/images/branding/2-Mooood/Social/2.png",
    width: 300,
    height: 375,
  },
  {
    id: 1,
    image: "/images/branding/2-Mooood/Social/1.jpg",
    width: 300,
    height: 375,
  },
];
const campaignList: Item[] = [
  {
    id: 5,
    image: "/images/branding/2-Mooood/Campaign/5.png",
    width: 300,
    height: 425,
  },
  {
    id: 4,
    image: "/images/branding/2-Mooood/Campaign/4.png",
    width: 300,
    height: 425,
  },
  {
    id: 3,
    image: "/images/branding/2-Mooood/Campaign/3.png",
    width: 300,
    height: 300,
  },
  {
    id: 2,
    image: "/images/branding/2-Mooood/Campaign/2.png",
    width: 300,
    height: 425,
  },
  {
    id: 1,
    image: "/images/branding/2-Mooood/Campaign/1.png",
    width: 300,
    height: 425,
  },
];
const digitalList: Item[] = [
  {
    id: 5,
    image: "/images/branding/2-Mooood/Digital/5.png",
    width: 400,
    height: 285,
  },
  {
    id: 4,
    image: "/images/branding/2-Mooood/Digital/4.png",
    width: 400,
    height: 285,
  },
  {
    id: 3,
    image: "/images/branding/2-Mooood/Digital/3.jpg",
    width: 400,
    height: 265,
  },
  {
    id: 2,
    image: "/images/branding/2-Mooood/Digital/2.jpg",
    width: 400,
    height: 285,
  },
  {
    id: 1,
    image: "/images/branding/2-Mooood/Digital/1.jpg",
    width: 400,
    height: 285,
  },
];
const printList: Item[] = [
  {
    id: 5,
    image: "/images/branding/2-Mooood/Print/5.png",
    width: 400,
    height: 230,
  },
  {
    id: 4,
    image: "/images/branding/2-Mooood/Print/4.png",
    width: 400,
    height: 285,
  },
  {
    id: 3,
    image: "/images/branding/2-Mooood/Print/3.png",
    width: 400,
    height: 285,
  },
  {
    id: 2,
    image: "/images/branding/2-Mooood/Print/2.jpg",
    width: 400,
    height: 285,
  },
  {
    id: 1,
    image: "/images/branding/2-Mooood/Print/1.jpg",
    width: 400,
    height: 225,
  },
];

export const stackList: Record<string, Item[]> = {
  social: socialList,
  campaign: campaignList,
  digital: digitalList,
  print: printList,
};
