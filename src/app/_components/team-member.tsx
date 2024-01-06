"use client";

import Link from "next/link";
import "./navbar.css";
import Image, { type StaticImageData } from "next/image";
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

function TeamMemberCard({
  name,
  headshot,
  role,
  college,
  curPosition,
  linkedin,
}: TeamMemberProps) {
  return (
    <Link href={linkedin}>
      <div className="flex w-full flex-col items-center transition duration-300 hover:scale-[1.05]">
        <div className="mb-4 w-full h-auto overflow-hidden rounded-full">
          <Image
            alt={name}
            src={headshot}
            width={60} // Slightly decreased width
            height={60} // Slightly decreased height
            layout="responsive"
          />
        </div>
        <p className="mt-1 text-2xl font-bold text-white">{name}</p>
        <p className="text-lg mt-1 text-gray-300">{role}</p>
      </div>
    </Link>
  );
}

export default TeamMemberCard;
