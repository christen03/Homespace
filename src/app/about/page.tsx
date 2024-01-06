import Link from "next/link";
import sample from "../../../public/sample-apartment.png";
import aboutHeader from "../../../public/about-header.jpg";
import Image from "next/image";
import geisel from "../../../public/geisel.jpeg";
import icon from "../../../public/icon.svg";
import collab from "../../../public/collaboration.jpg";
import TeamMemberCard from "../_components/team-member";
import { type TeamMember } from "../_components/team";
import teamMemberData from "../_components/team";
import { AiOutlineRise } from "react-icons/ai";
import { FaPeopleArrows } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import { PiSealCheckLight } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlineGroups2 } from "react-icons/md";

export default function About() {
  return (
    <div>
      <div className="relative">
        <div className="flex flex-col items-center justify-center bg-colorbng pt-20">
          <h1 className="font-source-sans-pro mb-8 text-4xl font-bold text-accent sm:text-6xl">
            About Homespace
          </h1>
          <p className="font-source-sans-pro mx-auto mb-8 max-w-screen-lg px-8 text-center text-xl font-medium leading-tight text-white sm:px-0 sm:text-2xl">
            Homespace is a comprehensive platform dedicated to simplifying the
            subleasing process for students. By cultivating an off-campus
            housing community, connecting students, and helping them discover
            their ideal living space, one that truly feels like home.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-colorbng pt-20">
        <h1 className="font-source-sans-pro mb-4 text-3xl font-bold text-accent sm:mb-8 sm:text-5xl">
          Our Story
        </h1>
        <div className="flex grid w-full grid-cols-1 gap-12 px-8 py-14 sm:grid-cols-3 sm:gap-8">
          <div className="flex flex-1 flex-col items-center justify-center">
            <AiOutlineRise className="text-6xl text-secondary sm:text-8xl" />

            <p className="pt-5 text-center text-lg text-white sm:text-2xl">
              {" "}
              4 college students facing inflated housing prices & scammers
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <FaPeopleArrows className="text-6xl text-secondary sm:text-8xl" />
            <p className="pt-5 text-center  text-lg text-white sm:text-2xl">
              Connecting with other college students for leases
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <IoGlobeOutline className="text-6xl text-secondary sm:text-8xl" />

            <p className="pt-5 text-center  text-lg text-white sm:text-2xl">
              Why not create a platform to help students & unite the community?
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-colorbng pt-8">
        <h1 className="font-source-sans-pro mb-8 text-3xl font-bold text-accent sm:text-5xl">
          Our Values
        </h1>
        <div className="flex grid grid-cols-1 gap-8 px-8 py-14 sm:px-20">
          <div className="mb-8 flex w-full flex-col items-center sm:flex-row">
            <div className="flex w-full flex-col items-center justify-center text-center sm:w-1/5 sm:flex-row">
              <MdOutlineGroups2 className="text-8xl text-accent" />
            </div>
            <div className="w-full text-center sm:w-4/5 sm:text-left">
              <h3 className="mt-4 text-2xl font-bold text-white sm:mt-0">
                Community
              </h3>
              <p className="mt-2 text-lg text-white sm:mt-0">
                Our platform is designed for students to connect, share
                experiences, and support each other in finding their next home.
                We hope to make the search for off-campus housing not just
                easier, but more enjoyable. This sense of community is very
                important to us as the founders.
              </p>
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col items-center sm:flex-row">
            <div className="flex w-full flex-col items-center justify-center text-center sm:w-1/5 sm:flex-row">
              <FaRegHandshake className="text-8xl text-accent" />
            </div>
            <div className="w-full text-center sm:w-4/5 sm:text-left">
              <h3 className="mt-4 text-2xl font-bold text-white sm:mt-0">
                Trust
              </h3>
              <p className="mt-2 text-lg text-white sm:mt-0">
                We understand the challenges and uncertainties that come with
                subleasing, especially for students. Homespace is a transparent
                and secure environment for students to confidently explore their
                housing options. All listings are verified, and all community
                guidelines are designed to maintain a trustworthy space.
              </p>
            </div>
          </div>

          <div className="mb-8 flex w-full flex-col items-center sm:flex-row">
            <div className="flex w-full flex-col items-center justify-center text-center sm:w-1/5 sm:flex-row">
              <PiSealCheckLight className="text-8xl text-accent" />
            </div>
            <div className="w-full text-center sm:w-4/5 sm:text-left">
              <h3 className="mt-4 text-2xl font-bold text-white sm:mt-0">
                Quality
              </h3>
              <p className="mt-2 text-lg text-white sm:mt-0">
                We are committed to ensuring students find a space that meets
                personalized needs. The Homespace team reviews each listing to
                meet our standards of comfort, safety, and value. Every student
                deserves a home that is not only affordable but also conducive
                to their well-being and academic success.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-colorbng">
        <h1 className="font-source-sans-pro mb-8 text-4xl font-bold text-accent sm:text-5xl">
          Meet The Team
        </h1>

        <div className="mb-32 mt-8 grid grid-cols-1 gap-28 px-12 py-5 sm:grid-cols-2 sm:px-32 md:grid-cols-4">
          {teamMemberData.map((member: TeamMember, index: any) => (
            <TeamMemberCard
              key={index} // Ensure to provide a unique key for each component in the array
              name={member.name}
              headshot={member.headshot}
              college={member.college}
              role={member.role}
              curPosition={member.curPosition}
              linkedin={member.linkedin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
