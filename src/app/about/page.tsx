import Link from "next/link";
import sample from "../../../public/sample-apartment.png";
import aboutHeader from "../../../public/about-header.jpg";
import Image from "next/image";

export default async function About() {
  return (
    <main>
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
          <h1 className="text-3xl sm:text-5xl font-medium">
            About{" "}
            <span className="font-bold leading-normal text-teal-400">
              Lynkpad
            </span>{" "}
            and Team
          </h1>
        </div>
      </div>
    </main>
  );
}


