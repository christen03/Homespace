import ajHeadshot from "../../../public/AkshatJainHeadshot.jpg";
import christen from "../../../public/christen.jpg";
import nhathan from "../../../public/nhathan.jpg";
import shauna from "../../../public/shauna.jpg"
import def from "../../../public/default.jpg";
import { type StaticImageData } from "next/image";



export interface TeamMember {
  name: string;
  headshot: StaticImageData;
  college: string;
  role: string;
  linkedin: string;
  curPosition: string;
}

const teamMemberData: TeamMember[] = [
  {
    name: "Nhathan Nguyen",
    headshot: nhathan,
    college: "B.S. Cognitive Science",
    role: "Product Manager",
    linkedin: "https://www.linkedin.com/in/nhathan-nguyen/",
    curPosition: "Business Intelligence Intern at Duco",
  },
  {
    name: "Christen Xie",
    headshot: christen,
    college: "B.S. Computer Engineering",
    role: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/christen-xie-473ba61a1/",
    curPosition: "Software Engineer at Roll",
  },
  {
    name: "Akshat Jain",
    headshot: ajHeadshot,
    college: "B.S. Computer Science",
    role: "Software Engineer",
    linkedin: "https://linkedin.com/in/akshatja1n",
    curPosition: "Front End Developer at CAIDA",
  },
  {
    name: "Shauna Huang",
    headshot: shauna,
    college: "B.S. Cognitive Science",
    role: "Public Relations & Marketing",
    linkedin: "https://www.linkedin.com/in/shaunahuang/",
    curPosition: "Incoming Marketing Manager at Atlassian"

  }
];

export default teamMemberData;

