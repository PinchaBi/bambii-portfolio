export const DEVICE = {
  M: "macbook",
  I: "iphone",
} as const;
export type DeviceType = (typeof DEVICE)[keyof typeof DEVICE];

export type Place = {
  x: string | number;
  y: string | number;
  z: string | number;
};

export type DisplayItem = {
  image: string;
  video?: string;
  width: number;
  height: number;
  place: Place;
  device: DeviceType;
  haveVideo: boolean;
  haveFrame: boolean;
};

export type WebDesignItem = {
  width: number;
  height: number;
  name: string;
  title: string;
  subTitle: string;
  socialTitle: string;
  constraints: string[];
  solutions: string[];
  keyThinkings: string[];
  outcome: string;
  items: DisplayItem[];
};

const dentasuitItems: DisplayItem[] = [
  {
    image: "/images/web-design/denta/denta_main.png",
    video: "/videos/web-design/denta/denta_main.mp4",
    width: 332,
    height: 214,
    device: DEVICE.M,
    place: { x: 100, y: 120, z: 2 },
    haveVideo: true,
    haveFrame: true,
  },
  {
    image: "/images/web-design/denta/denta_diagnosis-tx-list-add.png",
    width: 250,
    height: 161,
    device: DEVICE.M,
    place: { x: 20, y: 0, z: 3 },
    haveVideo: false,
    haveFrame: false,
  },
  {
    image: "/images/web-design/denta/denta_addPatient.png",
    video: "/videos/web-design/denta/denta_addPatient.mp4",
    width: 180,
    height: 113,
    device: DEVICE.M,
    place: { x: 385, y: 50, z: 1 },
    haveVideo: true,
    haveFrame: false,
  },
  {
    image: "/images/web-design/denta/denta_dashboard.png",
    width: 270,
    height: 171,
    device: DEVICE.M,
    place: { x: 300, y: 300, z: 4 },
    haveVideo: false,
    haveFrame: false,
  },
];

const veranapressItems: DisplayItem[] = [
  {
    image: "/images/web-design/verana/verana_main.png",
    video: "/videos/web-design/verana/verana_main.mp4",
    width: 459,
    height: 295,
    device: DEVICE.M,
    place: { x: 20, y: 70, z: 1 },
    haveVideo: true,
    haveFrame: true,
  },
  {
    image: "/images/web-design/verana/verana_admin.png",
    video: "/videos/web-design/verana/verana_admin.mp4",
    width: 260,
    height: 171,
    device: DEVICE.M,
    place: { x: -20, y: 280, z: 2 },
    haveVideo: true,
    haveFrame: false,
  },
  {
    image: "/images/web-design/verana/verana_phone.png",
    width: 108,
    height: 234,
    device: DEVICE.I,
    place: { x: 400, y: 220, z: 3 },
    haveVideo: false,
    haveFrame: true,
  },
];

const cuconnexItems: DisplayItem[] = [
  {
    image: "/images/web-design/cuconnex/CUconnex_main.png",
    video: "/videos/web-design/cuconnex/CUconnex_main.mp4",
    width: 153,
    height: 332,
    device: DEVICE.I,
    place: { x: 200, y: 20, z: 3 },
    haveVideo: true,
    haveFrame: true,
  },
  {
    image: "/images/web-design/cuconnex/CUconnex_challenge.png",
    width: 108,
    height: 234,
    device: DEVICE.I,
    place: { x: 70, y: 200, z: 1 },
    haveVideo: false,
    haveFrame: true,
  },
  {
    image: "/images/web-design/cuconnex/CUconnex_mac.png",
    width: 330,
    height: 212,
    device: DEVICE.M,
    place: { x: 240, y: 200, z: 2 },
    haveVideo: false,
    haveFrame: true,
  },
];

const horoscopeItems: DisplayItem[] = [
  {
    image: "/images/web-design/horo/horo_main.png",
    video: "/videos/web-design/horo/horo_main.mp4",
    width: 153,
    height: 332,
    device: DEVICE.I,
    place: { x: 130, y: 0, z: 3 },
    haveVideo: true,
    haveFrame: true,
  },
  {
    image: "/images/web-design/horo/horo_fortune.png",
    video: "/videos/web-design/horo/horo_fortune.mp4",
    width: 153,
    height: 332,
    device: DEVICE.I,
    place: { x: 330, y: 0, z: 4 },
    haveVideo: true,
    haveFrame: true,
  },
  {
    image: "/images/web-design/horo/horo_home.png",
    width: 113,
    height: 246,
    device: DEVICE.I,
    place: { x: 110, y: 150, z: 1 },
    haveVideo: false,
    haveFrame: false,
  },
  {
    image: "/images/web-design/horo/horo_weekly.png",
    width: 113,
    height: 246,
    device: DEVICE.I,
    place: { x: 450, y: -50, z: 2 },
    haveVideo: false,
    haveFrame: false,
  },
];

const sermkrangkitItems: DisplayItem[] = [
  {
    image: "/images/web-design/skk/SKK_main.png",
    video: "/videos/web-design/skk/SKK_main.mp4",
    width: 420,
    height: 262,
    device: DEVICE.M,
    place: { x: 50, y: 50, z: 1 },
    haveVideo: true,
    haveFrame: true,
  },
];

const flickfinderItems: DisplayItem[] = [
  {
    image: "/images/web-design/flickfinder/flickFD_main.png",
    video: "/videos/web-design/flickfinder/flickFD_main.mp4",
    width: 335,
    height: 215,
    device: DEVICE.M,
    place: { x: 90, y: 65, z: 2 },
    haveVideo: true,
    haveFrame: true,
  },
  {
    image: "/images/web-design/flickfinder/flickFD_top.png",
    width: 168,
    height: 113,
    device: DEVICE.M,
    place: { x: 60, y: 0, z: 1 },
    haveVideo: false,
    haveFrame: false,
  },
  {
    image: "/images/web-design/flickfinder/flickFD_bottom.png",
    video: "/videos/web-design/flickfinder/flickFD_bottom.mp4",
    width: 231,
    height: 155,
    device: DEVICE.M,
    place: { x: 350, y: 215, z: 3 },
    haveVideo: true,
    haveFrame: false,
  },
];

const blindviewItems: DisplayItem[] = [
  {
    image: "/images/web-design/blind-view/Blind_main.png",
    video: "/videos/web-design/blind-view/blind_main.mp4",
    width: 153,
    height: 332,
    device: DEVICE.I,
    place: { x: 50, y: 0, z: 1 },
    haveVideo: true,
    haveFrame: true,
  },
  {
    image: "/images/web-design/blind-view/Blind_1.png",
    width: 143,
    height: 310,
    device: DEVICE.I,
    place: { x: 270, y: 10, z: 2 },
    haveVideo: true,
    haveFrame: false,
  },
  {
    image: "/images/web-design/blind-view/Blind_2.png",
    width: 143,
    height: 310,
    device: DEVICE.I,
    place: { x: 450, y: 10, z: 3 },
    haveVideo: true,
    haveFrame: false,
  },
];

export const webDesignList: Record<number, WebDesignItem> = {
  1: {
    width: 348,
    height: 224,
    name: "DentaSuite",
    title:
      "Overlapping clinic operations across doctors, administrators, and front-desk staff led to duplicated data entry and coordination errors",
    subTitle: "2025 • DentaSuite • UX/UI Designer",
    socialTitle: "Built to streamline clinic operations efficiently",
    constraints: [],
    solutions: [
      "Designed role-specific dashboards aligned with task priorities",
      "Structured patient records, billing systems, and scheduling tables",
      "Implemented validation-driven forms and filterable data tables",
      "Built reusable UI components in Figma for scalability",
    ],
    keyThinkings: [
      "Mapped real clinic workflows into clear task hierarchies",
      "Separated dashboards to reduce cognitive overlap",
      "Prioritized operational clarity and daily efficiency",
    ],
    outcome:
      "Delivered a centralized, production-ready system that improved cross-role coordination and reduced workflow friction",
    items: dentasuitItems,
  },
  2: {
    width: 348,
    height: 224,
    name: "VeranaPress",
    title:
      "High product customization complexity with dynamic pricing and dual-side (customer + admin) operational requirements",
    subTitle: "2025 • VeranaPress • Product & Web Designer",
    socialTitle: "Built to support scalable e-commerce and custom workflows",
    constraints: [],
    solutions: [
      "Designed guided multi-step customization flow",
      "Structured pricing logic into controlled interaction steps",
      "Built admin dashboards for orders, payments, and product management",
      "Established reusable component system for long-term scalability",
    ],
    keyThinkings: [
      "Balanced flexibility with usability",
      "Simplified complex logic into manageable interactions",
      "Designed for operational efficiency across both sides",
    ],
    outcome:
      "Delivered scalable commerce ecosystem supporting revenue operations and internal workflows",
    items: veranapressItems,
  },
  3: {
    width: 108,
    height: 234,
    name: "CU CONNEX",
    title:
      "No structured mentorship, challenge participation, or intelligent student matching within existing application",
    subTitle: "2025 • CU CONNEX • UX/UI Designer",
    socialTitle: "Built to bridge students, alumni, and campus communities",
    constraints: [],
    solutions: [
      "Designed mentorship booking and challenge participation flows",
      "Structured AI-assisted matching for mentors and competition pairing",
      "Integrated features seamlessly into existing system",
    ],
    keyThinkings: [
      "Prioritized feasibility within hackathon constraint",
      "Reduced matching complexity for faster implementation",
      "Maintained UI consistency and system compatibility",
    ],
    outcome:
      "Successfully implemented feature inside live application environment",
    items: cuconnexItems,
  },
  4: {
    width: 108,
    height: 234,
    name: "Horoscope",
    title: "User confusion in overlapping dual-role journeys",
    subTitle: "2025 • Horoscope • UX/UI Designer",
    socialTitle: "Built to connect clients and fortune tellers seamlessly",
    constraints: [],
    solutions: [
      "Structured separated role-based flows",
      "Designed booking, scheduling, and communication interactions",
      "Optimized mobile-first usability",
    ],
    keyThinkings: [
      "Maintained clear role boundaries to reduce friction and build user trust",
    ],
    outcome:
      "Delivered intuitive, separated experiences within a shared ecosystem",
    items: horoscopeItems,
  },
  5: {
    width: 348,
    height: 224,
    name: "Serm Krang Kit",
    title:
      "Complex MDR cybersecurity services difficult to understand for clients",
    subTitle: "2024 • Serm Krang Kit • UX/UI Designer & Developer",
    socialTitle:
      "Built to communicate complex cybersecurity services with clarity",
    constraints: [
      "Content-heavy",
      "Non-technical target audience",
      "Professional credibility required",
    ],
    solutions: [
      "Clear service explanation flow",
      "Trust-focused visual layout",
    ],
    keyThinkings: [],
    outcome: "Improved information clarity and professional positioning",
    items: sermkrangkitItems,
  },
  6: {
    width: 348,
    height: 224,
    name: "Flick Finder",
    title:
      "Unstructured content reduces discoverability and browsing efficiency",
    subTitle: "2023 • Flick Finder • UX/UI Designer & Developer",
    socialTitle: "Built to simplify movie discovery and user reviews",
    constraints: ["Large content categories", "Need for scalable structure"],
    solutions: [
      "Designed structured categorization system",
      "Built filtering and browsing logic",
      "Developed responsive front-end interface",
    ],
    keyThinkings: [],
    outcome:
      "Designed structured content categorization and scalable browsing system to support growing content library",
    items: flickfinderItems,
  },
  7: {
    width: 108,
    height: 234,
    name: "BlindView",
    title: "Traditional awareness materials lack experiential engagement",
    subTitle: "2025 • BlindView • UX/UI Designer & Developer",
    socialTitle: "Built to foster empathy through interactive design",
    constraints: [
      "SwiftUI performance limitations",
      "Accessibility clarity required",
    ],
    solutions: [
      "Designed real-time visual simulation interactions",
      "Balanced realism with performance feasibility",
    ],
    keyThinkings: [],
    outcome:
      "Created an interactive tool that promotes empathy through simulation",
    items: blindviewItems,
  },
};
