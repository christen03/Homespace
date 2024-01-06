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

export default function About() {
  return (
    <div>
      <div className="relative h-[80rem] sm:h-[30rem]">
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-colorbng">
          <h1 className="font-source-sans-pro mb-8 text-5xl font-bold text-accent">
            Homespace
          </h1>
          <p className="text-md font-source-sans-pro mx-auto mb-8 max-w-screen-lg text-center font-medium leading-tight text-white">
            Homespace is a comprehensive platform dedicated to simplifying the
            subleasing process for students. By cultivating an off-campus
            housing community, connecting students, and helping them discover
            their ideal living space, one that truly feels like home.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-colorbng">
        <h1 className="font-source-sans-pro mb-8 text-5xl font-bold text-accent">
          Our Story
        </h1>
        <div className="flex w-full justify-between px-8 py-14">
          <div className="flex flex-1 flex-col items-center justify-center">
            <Image
              src={
                "https://images.pexels.com/photos/2092450/pexels-photo-2092450.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              width={242.02}
              height={186}
              alt="sample"
            />

            <p className="pt-5 text-center text-2xl text-white">
              {" "}
              4 college students facing inflated housing prices & scammers
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="pb-5 text-center text-2xl text-white">
              Connecting with other college students for leases
            </p>
            <Image
              src={
                "https://images.pexels.com/photos/2092450/pexels-photo-2092450.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              width={242.02}
              height={186}
              alt="sample"
            />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <Image
              src={
                "https://images.pexels.com/photos/2092450/pexels-photo-2092450.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              width={242.02}
              height={186}
              alt="sample"
            />

            <p className="pt-5 text-center text-2xl text-white">
              Why not create a marketplace to help students & unite the
              community?
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-colorbng pt-8">
        <h1 className="font-source-sans-pro mb-8 text-5xl font-bold text-accent">
          Our Values
        </h1>
        <div className="flex flex-col w-full px-20 py-14">
  <div className="flex items-center mb-8 pl-20"> 
    <Image src={icon} width={113} height={113} alt="Icon" />
    <div className="pl-10">
      <h3 className="text-2xl font-bold text-white pb-6">Community</h3>
      <p className="text-white text-lg">Our platform is designed for students to connect, share experiences, and support each other in finding their next home. We hope to make the search for off-campus housing not just easier, but more enjoyable.</p>
    </div>
  </div>
  <div className="flex items-center mb-8 pl-20"> 
    <Image src={icon} width={113} height={113} alt="Icon" />
    <div className="pl-10">
      <h3 className="text-2xl font-bold text-white pb-6">Trust</h3>
      <p className="text-white text-lg">We understand the challenges and uncertainties that come with subleasing, especially for students. Homespace is a transparent and secure environment for students to confidently explore their housing options. All listings are verified and all community guidelines are designed to maintain a trustworthy space.</p>
    </div>
  </div>
  <div className="flex items-center mb-8 pl-20">
    <Image src={icon} width={113} height={113} alt="Icon" />
    <div className="pl-10">
      <h3 className="text-2xl font-bold text-white pb-6">Quality</h3>
      <p className="text-white text-lg">We are committed to ensuring students find a space that meets personalized needs. The Homespace team reviews each listing to meet our standards of comfort, safety, and value. Every students deserves a home that is not only affordable, but also conducive to their well-being and academic success.</p>
    </div>
  </div>
</div>
      </div>
      <div className="flex flex-col items-center justify-center bg-colorbng">
      <h1 className="font-source-sans-pro mb-8 text-5xl font-bold text-accent">
Meet The Team        
</h1>
        
<div className="mb-10 mt-8 grid grid-cols-1 gap-32 px-32 py-5 sm:grid-cols-2 md:grid-cols-4">
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
