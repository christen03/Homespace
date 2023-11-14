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
        <div className="inline-flex w-full items-center justify-center gap-[33px] rounded-[66px] border border-gray-500 bg-opacity-70 bg-white py-4 pl-8 pr-6">
          <div className="flex items-center justify-center gap-12">
            <Link href="/" className="flex items-center justify-center">
              <div className="relative h-[35px] w-[40px]"></div>
              <div className="text-3xl font-bold leading-normal text-teal-600">
                Lynkpad
              </div>
            </Link>
          </div>
          <div className="flex shrink grow  basis-0 items-start justify-end gap-6">
            <div className="flex items-center justify-center gap-1 px-4 py-3">
              <Link
                href="/dashboard"
                className="text-center text-base font-semibold leading-snug tracking-tight text-black"
              >
                About Lynkpad
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-[100px] bg-teal-300 px-6 py-3 hover:bg-teal-400">
              <Link
                href="/dashboard"
                className="text-center text-base font-semibold leading-snug tracking-tight text-black"
              >
                Lynk Your Apartment
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div>
                <div className="text-center">
                  {session && session.user && session.user.image ? (
                    <div className="gap-1 rounded-full border border-gray-500 bg-white p-1">
                      <Link href={"/api/auth/signout"}>
                        <Image
                          src={session.user.image}
                          width={38}
                          height={38}
                          alt="Profile Image"
                          className="rounded-full" // Apply Tailwind's rounded-full class
                        />
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-[100px] bg-teal-300 px-6 py-3 hover:bg-teal-400">
                      <Link
                        href={"/api/auth/signin"}
                        className="text-center text-base font-semibold leading-snug tracking-tight text-black"
                      >
                        Sign in
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
