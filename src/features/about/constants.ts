import { atom } from "jotai";

const pictures: string[] = ["bambii", "bambii"];

export const pageAtom = atom(0);
const pages = [
  {
    front: "book-cover-1",
    back: pictures[0],
  },
  {
    front: pictures[pictures.length - 1],
    back: "book-back",
  },
];

export { pages };
