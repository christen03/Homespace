"use client";

import Link from "next/link";
import "./Navbar.css";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

interface TeamMemberProps {
  name: string;
  headshot: StaticImageData;
  role: string;
  college: string;
  curPosition: string;
  linkedin: string;
}

function TeamMember({
  name,
  headshot,
  role,
  college,
  curPosition,
  linkedin,
}: TeamMemberProps) {
  return (
    <Link href={linkedin}>
      <div className="flex w-full flex-col transition duration-300 hover:scale-[1.02]">
        <div className="mb-10 w-full px-4">
          <div className="aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-t-2xl">
            <div className="aspect-1x1">
              <Image
                alt={name}
                src={headshot}
              />
            </div>
          </div>
          <div className="rounded-b-xl bg-white px-6">
            <p className="ml-4 pt-4 text-lg sm:text-xl font-bold text-teal-600">{name}</p>
            <p className="font-regular ml-4 text-xs sm:text-sm text-gray-900">{role}</p>
            <p className="font-regular ml-4 text-xs sm:text-sm text-gray-900">{college}</p>
            <p className="align-center text-sm sm:text-lg mb-6 mt-4 flex flex-row justify-center gap-3 font-semibold text-gray-800">
              {curPosition}
            </p>
            <div className="align-center mt flex flex-row justify-center gap-3"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TeamMember;
