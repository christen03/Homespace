"use client";

import Link from "next/link";
import Image from "next/image";
import "./Navbar.css";
import { useSession } from "next-auth/react";
import def from "../../../public/default.jpg";

function Navbar() {
  // Assuming getServerAuthSession returns an object with user information
  const { data: session, status, update } = useSession();

  return (
    <nav className="navbar">
      <div className="mx-10 mt-2">
        <div className="inline-flex w-full items-center justify-center gap-[33px] rounded-[66px] border-2 border-black bg-white py-4 pl-8 pr-6">
          <div className="flex items-center justify-center gap-12">
            <Link href="/" className="flex items-center justify-center">
              <div className="relative h-[35px] w-[40px]"></div>
              <div className="text-3xl font-bold leading-normal text-teal-600">
                Lynkpad
              </div>
            </Link>
            <div className="flex items-center justify-center gap-6">
              <div className="relative h-[35px] w-[20rem]"></div>
              <Link
                href="/dashboard"
                className="text-base font-medium leading-normal text-neutral-900 opacity-90"
              >
                Anywhere{" "}
              </Link>
              <Link
                href="/dashboard"
                className="text-base font-medium leading-normal text-neutral-900 opacity-90"
              >
                Duration
              </Link>
            </div>
          </div>
          <div className="flex shrink grow  basis-0 items-start justify-end gap-6">
            <div className="flex items-center justify-center gap-1 rounded-[100px] bg-teal-300 px-6 py-3 hover:bg-teal-400">
              <Link
                href="/dashboard"
                className="text-center text-base font-semibold leading-snug tracking-tight text-black"
              >
                Lynk Your Apartment
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-[100px] bg-teal-300 px-1 py-1">
              <Link href="/dashboard">
                <div className="text-center">
                  {session && session.user && session.user.image ? (
                    <Image
                      src={session.user.image}
                      width={38}
                      height={38}
                      alt="Profile Image"
                      className="rounded-full" // Apply Tailwind's rounded-full class
                    />
                  ) : (
                    <Image
                      src={def}
                      width={38}
                      height={38}
                      alt="Default Profile Image"
                      className="rounded-full" // Apply Tailwind's rounded-full class
                    />
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
