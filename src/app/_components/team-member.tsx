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
      <div className="flex w-full flex-col items-center transition duration-300 hover:scale-[1.2]">
        <div className="mb-4 w-full h-auto overflow-hidden rounded-full">
          <Image
            alt={name}
            src={headshot}
            width={60} // Slightly decreased width
            height={60} // Slightly decreased height
            layout="responsive"
          />
        </div>
        <p className="text-lg font-bold text-white">{name}</p>
        <p className="text-sm text-white">{role}</p>
      </div>
    </Link>
  );
}

export default TeamMemberCard;
