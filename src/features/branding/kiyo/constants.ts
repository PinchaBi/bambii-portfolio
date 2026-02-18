type KiyoItem = {
  id: number;
  image: string;
};

const firstRow: KiyoItem[] = [
  { id: 3, image: "/images/branding/5-Kiyo/3.png" },
  { id: 2, image: "/images/branding/5-Kiyo/2.png" },
  { id: 6, image: "" },
];
const secondRow: KiyoItem[] = [
  { id: 1, image: "/images/branding/5-Kiyo/1.png" },
  { id: 7, image: "" },
  { id: 4, image: "/images/branding/5-Kiyo/4.png" },
];
const thridRow: KiyoItem[] = [
  { id: 8, image: "" },
  { id: 5, image: "/images/branding/5-Kiyo/5.png" },
  { id: 9, image: "" },
];

export const kiyoList: Record<number, KiyoItem[]> = {
  1: firstRow,
  2: secondRow,
  3: thridRow,
};
