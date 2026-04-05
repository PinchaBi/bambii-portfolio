export type CUSocietyItem = {
  image: string;
  /** percentage of container width (0–100) */
  size: number;
  /** percentage of container width (0–100) */
  x: number;
  /** percentage of container height (0–100) */
  y: number;
};

// Reference design: 600×600 container → all values as percentages
export const cusocietyList: CUSocietyItem[] = [
  {
    image: "/images/branding/3-Cu-society/1.jpg",
    size: 20, // 120/600
    x: 1.67, // 10/600
    y: 8.33, // 50/600
  },
  {
    image: "/images/branding/3-Cu-society/2.jpg",
    size: 20, // 120/600
    x: 15, // 90/600
    y: 73.33, // 440/600
  },
  {
    image: "/images/branding/3-Cu-society/3.jpg",
    size: 26.67, // 160/600
    x: 18.33, // 110/600
    y: 33.33, // 200/600
  },
  {
    image: "/images/branding/3-Cu-society/4.jpg",
    size: 12.67, // 76/600
    x: 0, // 0/600
    y: 55.83, // 335/600
  },
  {
    image: "/images/branding/3-Cu-society/5.jpg",
    size: 20, // 120/600
    x: 50, // 300/600
    y: 25, // 150/600
  },
];
