import Link from "next/link";
import sample from "../../../public/sample-apartment.png";
import aboutHeader from "../../../public/about-header.jpg";
import Image from "next/image";
import geisel from "../../../public/geisel.jpeg";
import collab from "../../../public/collaboration.jpg";
import TeamMember from "../_components/team-member";
import teamMemberData  from "../_components/team";

export default async function About() {
  return (
    <div>
      <div className="relative h-[10rem] sm:h-[20rem]">
        {/* Dark overlay */}
        <div className="absolute inset-0 z-10 bg-black opacity-60"></div>

        {/* Image */}
        <div className="relative z-0 h-full">
          <Image
            src={aboutHeader}
            alt={"header"}
            className="h-full w-full object-cover"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        {/* Text */}
        <div className="absolute left-1/2 top-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-white">
          <h1 className="text-3xl font-medium sm:text-5xl">
            About{" "}
            <span className="font-bold leading-normal text-teal-400">
              Homespace
            </span>{" "}
            and Team
          </h1>
        </div>
      </div>
      <div className="mx-10 mt-8 flex flex-col">
        <h1 className="text-3xl font-medium text-gray-600 sm:text-4xl">
          The Story Behind{" "}
          <span className="font-bold leading-normal text-teal-400">
            Homespace
          </span>{" "}
        </h1>
        <div className="mt-4 flex flex-col sm:flex-row">
          <div className="w-full sm:w-3/5">
            <div>
              At Homespace, our story is rooted in a shared experience—facing the
              housing challenges that many college students encounter. We
              observed the struggles faced by students seeking housing solutions
              at UC San Diego, recognizing a pervasive lack of dedicated
              resources in this realm. Driven by our collective passion to
              address this pressing need, we set out to create Homespace-a
              platform dedicated to reshaping the student housing landscape. Our
              mission centers on providing an innovative, user-friendly solution
              that redefines how students discover and secure subleasing
              options, regardless of their college or university.
            </div>
            <div className="mt-4">
              Inspired by the housing challenges prevalent in academic
              communities, Homespace aims to be the cornerstone for students
              embarking on their educational journey. We aspire to be the
              trusted link between students and their housing needs, offering a
              seamless, empowering experience that eases the stress associated
              with finding suitable accommodations.
            </div>
            <div className="mt-4">
              Our commitment to revolutionizing the student housing experience
              stems from our desire to make a genuine impact. Homespace strives
              not only to solve the immediate housing concerns but also to
              become an indispensable companion throughout a student's academic
              pursuit.
            </div>
            <div className="mt-4">
              Join us as we embark on this transformative journey, driven by our
              shared experiences and fueled by the determination to create a
              housing solution that empowers and supports students, transcending
              the barriers of traditional housing searches and fostering a sense
              of security and belonging within the academic community.
            </div>
          </div>
          <div className="flex w-full sm:w-2/5 flex-col flex-wrap items-center justify-center mt-4 sm:mt-0">
            {/* Inserted images */}
            <div className="mb-4 mr-20 w-64 rounded-2xl border-4 border-teal-600">
              <Image
                src={geisel}
                alt="Geisel Library"
                className="rounded-lg"
                layout="responsive"
                width={500}
                height={350}
              />
            </div>
            <div className="mb-4 ml-20 w-64 rounded-2xl border-4 border-teal-600">
              <Image
                src={collab}
                alt="Collaboration"
                className="rounded-lg"
                layout="responsive"
                width={500}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col bg-gray-100">
        <div className="mx-10 mt-12 items-center justify-center text-center">
          <h1 className="text-3xl font-medium text-gray-600 sm:text-4xl">
            Meet the Team
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-16 mb-10">
          {teamMemberData.map((member : any, index : any) => (
            <TeamMember
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
