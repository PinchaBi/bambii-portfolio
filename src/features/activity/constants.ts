import type { ActivityType } from "./types";

const BLOB_URL = import.meta.env.VITE_BLOB_URL || "";
const blob = (path: string) => `${BLOB_URL}${path}`;

const fwdImageList: string[] = [
  "/images/activity/1-FWD-The-Futurist-2023/1.jpg",
  "/images/activity/1-FWD-The-Futurist-2023/2.jpeg",
  "/images/activity/1-FWD-The-Futurist-2023/3.jpg",
  blob("/images/activity/1-FWD-The-Futurist-2023/4.MOV"),
  "/images/activity/1-FWD-The-Futurist-2023/5.JPG",
];

const unihackImageList: string[] = [
  "/images/activity/2-Unihack-2023/1.jpeg",
  "/images/activity/2-Unihack-2023/2.jpg",
  "/images/activity/2-Unihack-2023/3.jpg",
];

const lotusImageList: string[] = [
  "/images/activity/3-Lotus’s-HYPER-HACK/1.JPEG",
  "/images/activity/3-Lotus’s-HYPER-HACK/2.JPEG",
  "/images/activity/3-Lotus’s-HYPER-HACK/3.JPEG",
  "/images/activity/3-Lotus’s-HYPER-HACK/4.JPEG",
  "/images/activity/3-Lotus’s-HYPER-HACK/5.JPG",
  "/images/activity/3-Lotus’s-HYPER-HACK/6.JPG",
];
const muangthongImageList: string[] = [
  "/images/activity/4-Muangthong-Hackathon/1.JPG",
  "/images/activity/4-Muangthong-Hackathon/2.JPG",
  "/images/activity/4-Muangthong-Hackathon/3.jpg",
  "/images/activity/4-Muangthong-Hackathon/4.JPG",
  "/images/activity/4-Muangthong-Hackathon/5.JPG",
  "/images/activity/4-Muangthong-Hackathon/6.JPG",
];

const cunexImageList: string[] = [
  "/images/activity/5-CUNEX-Hackathon-2025/1.jpg",
  "/images/activity/5-CUNEX-Hackathon-2025/2.jpg",
  "/images/activity/5-CUNEX-Hackathon-2025/3.jpg",
  "/images/activity/5-CUNEX-Hackathon-2025/4.jpg",
  blob("/images/activity/5-CUNEX-Hackathon-2025/5.MOV"),
  "/images/activity/5-CUNEX-Hackathon-2025/6.jpg",
];

export const activityList: Record<number, ActivityType> = {
  1: {
    title: "Honorable Mention – FWD The Futurist 2023",
    period: "Oct 2023 – Nov 2023",
    images: fwdImageList,
    firstParagraph:
      "I worked on a data-driven business strategy to enhance customer engagement and acquisition for an insurance company.",
    secondParagraph:
      "The project focused on identifying new market opportunities and refining outreach strategies through analytical insights.",
    groupImage: "/images/activity/1-FWD-The-Futurist-2023/group.JPG",
    source: "http://www.thaimlmnews.com/fwd-ประกันชีวิต-มอบรางวัลผ/",
  },
  2: {
    title: "Top 10 Finalist – Unihack 2023",
    period: "Nov 2023 – Dec 2023",
    images: unihackImageList,
    firstParagraph:
      "During an intensive 48-hour hackathon, I helped develop a business model aligned with the Sustainable Development Goals.",
    secondParagraph:
      "This experience highlighted the importance of creating solutions that balance innovation with social responsibility.",
    groupImage: "/images/activity/2-Unihack-2023/group.jpeg",
    source:
      "https://www.instagram.com/p/CynmpUmpK1q/?utm_source=ig_web_copy_link",
  },
  3: {
    title: "Top 10 Finalist – Lotus’s HYPER HACK",
    period: "Jan 2024 – Feb 2024",
    images: lotusImageList,
    firstParagraph:
      "I researched public concerns and collaborated on developing a business and technology solution aimed at transforming hypermarket experiences.",
    secondParagraph:
      "Competing among over 300 teams sharpened my skills in problem framing, ideation, and strategic thinking.",
    groupImage: "/images/activity/3-Lotus’s-HYPER-HACK/group.PNG",
    source:
      "https://corporate.lotuss.com/en/news/corporate/lotuss-hyper-hack-2024-en",
  },
  4: {
    title: "Top 10 Finalist – Muangthong Hackathon",
    period: "Mar 2024 – Apr 2024",
    images: muangthongImageList,
    firstParagraph:
      "I conducted on-site research and gathered real-world data to explore ways to improve public transportation efficiency.",
    secondParagraph:
      "The project resulted in a tech-driven business proposal and meaningful discussions with stakeholders on practical urban solutions.",
    groupImage: "/images/activity/4-Muangthong-Hackathon/group.JPG",
    source:
      "https://insight.impact.co.th/index.php/th/people/167-muangthong-hackathon",
  },
  5: {
    title: "2nd Place – CUNEX Hackathon 2025",
    period: "Feb 2025 – Apr 2025",
    images: cunexImageList,
    firstParagraph:
      "I led UX/UI design and team coordination for CU CONNEX, an all-in-one platform connecting students with mentors, challenges, and campus activities through real CUNEX API integration.",
    secondParagraph:
      "This experience strengthened my ability to translate complex systems into intuitive user experiences while working closely with developers and stakeholders.",
    groupImage: "/images/activity/5-CUNEX-Hackathon-2025/group.JPG",
    source: "https://www.chula.ac.th/news/235668",
  },
};
