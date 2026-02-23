export type WebDesignItem = {
  name: string;
  title: string;
  subTitle: string;
  socialTitle: string;
  constraints: string[];
  solutions: string[];
  keyThinkings: string[];
  outcome: string;
  images: string[];
};

const firstList: string[] = [];
const secondList: string[] = [];
const thirdList: string[] = [];
const fourthList: string[] = [];
const fifthList: string[] = [];
const sixthList: string[] = [];
const seventhList: string[] = [];

export const webDesignList: Record<number, WebDesignItem> = {
  1: {
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
    images: firstList,
  },
  2: {
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
    images: secondList,
  },
  3: {
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
    images: thirdList,
  },
  4: {
    name: "Serm Krang Kit",
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
    images: fourthList,
  },
  5: {
    name: "Flick Finder",
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
    images: fifthList,
  },
  6: {
    name: "BlindView",
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
    images: sixthList,
  },
  7: {
    name: "DentaSuite",
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
    images: seventhList,
  },
};
