"use client";

import Link from "next/link";
import Image from "next/image";
import "./Navbar.css";
import { useSession } from "next-auth/react";
import def from "../../../public/default.jpg";
import { FaM, FaMarsAndVenus } from "react-icons/fa6";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {useRouter} from "next/navigation";

function Navbar() {
  // Assuming getServerAuthSession returns an object with user information
  const { data: session, status, update } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <nav className="navbar">
      <div className="mx-10 mt-2">
        <div className="flex w-full items-center justify-between gap-6 rounded-[66px] border border-gray-500 bg-white bg-opacity-70 py-4 pl-8 pr-6 sm:hidden">
          <div>
            <Link href="/" className="flex items-center justify-center">
              <div className="text-3xl font-bold leading-normal text-teal-600">
                Homespace
              </div>
            </Link>
          </div>

          {/* Small screen hamburger menu */}
          <div className="flex items-center justify-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none"
              aria-label="Hamburger Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="text-secondary-dark dark:text-ternary-light h-7 w-7 fill-current"
              >
                {showMenu ? (
                  <FiX className="text-3xl" />
                ) : (
                  <FiMenu className="text-3xl" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Header links small screen */}
        <div
          className={
            showMenu
              ? "m-0 mt-2 block items-center justify-center p-5 shadow-lg transition duration-300 sm:ml-4 sm:mt-3 sm:flex sm:p-0 sm:shadow-none"
              : "hidden"
          }
        >
          <div className="flex items-center justify-center gap-1 px-4 py-3">
            <Link
              href="/about"
              className="text-center text-base font-semibold leading-snug tracking-tight text-black"
            >
              About Homspace
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-[100px] bg-red-300 px-6 py-3 hover:bg-red-400">
            <Link
              href="/waitlist"
              className="text-center text-base font-semibold leading-snug tracking-tight text-black"
            >
              Join the waitlist!
            </Link>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1 rounded-[100px] bg-teal-300 px-6 py-3 hover:bg-teal-400">
            <Link
              href="/create-listing"
              className="text-center text-base font-semibold leading-snug tracking-tight text-black"
            >
              Lynk Your Apartment
            </Link>
          </div>

          <div className="mt-2 text-center">
            {session && session.user && session.user.image ? (
              <div className="flex items-center justify-center gap-1 bg-white p-1">
                <Link href={"/api/auth/signout"}>
                  <Image
                    src={session.user.image}
                    width={38}
                    height={38}
                    alt="Profile Image"
                    className="rounded-full rounded-full border border-gray-500 p-1" // Apply Tailwind's rounded-full class
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

        <div className="inline-flex hidden w-full items-center justify-center gap-[33px] rounded-[66px] border border-gray-500 bg-white bg-opacity-70 py-4 pl-8 pr-6 sm:flex">
          <div className="flex items-center justify-center gap-12">
            <Link href="/" className="flex items-center justify-center">
              <div className="relative h-[35px] w-[40px]"></div>
              <div className="text-3xl font-bold leading-normal text-teal-600">
                Homespace
              </div>
            </Link>
          </div>
          <div className="flex shrink grow  basis-0 items-start justify-end gap-6">
            <div className="flex items-center justify-center gap-1 px-4 py-3">
              <Link
                href="/about"
                className="text-center text-base font-semibold leading-snug tracking-tight text-black"
              >
                About Homespace
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-[100px] bg-red-300 px-6 py-3 hover:bg-red-400">
              <Link
                href="/waitlist"
                className="text-center text-base font-semibold leading-snug tracking-tight text-black"
              >
                Join the waitlist!
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-[100px] bg-teal-300 px-6 py-3 hover:bg-teal-400">
              <Link
                href="/create-listing"
                className="text-center text-base font-semibold leading-snug tracking-tight text-black"
              >
                Add Your Apartment
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
