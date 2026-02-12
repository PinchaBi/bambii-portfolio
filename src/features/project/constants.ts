import type { ProjectCardType } from "./components/ProjectCard/types";

// --------------------------- Lists ---------------------------
//region Lists

export const projectList: ProjectCardType[] = [
  {
    title: "Branding",
    path: "branding",
    image: "/images/project/branding-default.png",
  },
  {
    title: "Web design",
    path: "web-design",
    image: "/images/project/web-design-default.png",
  },
  {
    title: "Illustration & Product design",
    path: "/illustration",
    image: "/images/project/illustration-and-product-design-default.png",
  },
];

export const projectActiveList: ProjectCardType[] = [
  {
    title: "Branding",
    path: "branding",
    image: "/images/project/branding-active.png",
  },
  {
    title: "Web design",
    path: "web-design",
    image: "/images/project/web-design-active.png",
  },
  {
    title: "Illustration & Product design",
    path: "/illustration",
    image: "/images/project/illustration-and-product-design-active.png",
  },
];

// --------------------------- Color Mappings ---------------------------
//region Color Mapping

export const backgroundAvticeList: Record<number, string> = {
  1: "#FFD2AE",
  2: "#FBFFCC",
  3: "#BFEAFF",
};
