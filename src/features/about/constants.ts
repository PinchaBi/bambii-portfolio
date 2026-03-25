import { atom } from "jotai";

const pictures: string[] = ["p1", "p2"];

export const pageAtom = atom(0);
const pages = [
  {
    front: "cover",
    back: pictures[0],
  },
  {
    front: pictures[pictures.length - 1],
    back: "pattern-back-cover",
  },
];

export { pages };
