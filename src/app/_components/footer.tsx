"use client";

import Link from "next/link";
import Image from "next/image";
import "./footer.css";
import { useSession } from "next-auth/react";
import def from "../../../public/default.jpg";
import { FaCopyright } from "react-icons/fa";

function Footer() {
  // Assuming getServerAuthSession returns an object with user information
  const { data: session, status, update } = useSession();

  return (
    <nav className="footer sm:fixed">
      <div className="">
        <div className="inline-flex w-full items-center justify-center gap-[33px] border-t border-gray-300 bg-white bg-opacity-70 ">
          <div className="flex items-center justify-center">
            <Link href="/dashboard" className="flex items-center justify-center">
              <div className="font-regular ml-4 sm:ml-20 flex flex-row text-md leading-normal text-gray-900">
                <FaCopyright className="mt-1" /> &nbsp; 2024 Homespace &bull;
              </div>
            </Link>
            <Link href="/dashboard" className="flex items-center justify-center">
              <div className="font-regular flex flex-row text-md leading-normal text-gray-900">
                &nbsp; Terms &nbsp;&bull;
              </div>
            </Link>
            <Link href="/dashboard" className="flex items-center justify-center">
              <div className="font-regular flex flex-row text-md leading-normal text-gray-900">
                &nbsp; Sitemap
              </div>
            </Link>
          </div>
          <div className="flex shrink grow  basis-0 items-start justify-end gap-6">
            <div className="flex items-center justify-center gap-1 py-3 mr-4 sm:mr-20">
              <Link href="/dashboard" className="flex items-center justify-center">
                <div className="font-regular flex flex-row text-md leading-normal text-gray-900">
                  About
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Footer;
