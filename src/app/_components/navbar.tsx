"use client";

import Link from "next/link";
import Image from "next/image";
import "./navbar.css";
import { useSession } from "next-auth/react";
import def from "../../../public/default.jpg";
import { api } from "~/trpc/react";
import { FaM, FaMarsAndVenus } from "react-icons/fa6";
import logo from "../../../public/logo.png";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

function Navbar() {
  // Assuming getServerAuthSession returns an object with user information
  const { data: session, status, update } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const getUserData = api.users.getCurrentUser.useQuery();
  const uData = getUserData.data;

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="">
        <div className="flex w-full items-center justify-between gap-6 bg-colorbng py-4 pl-8 pr-6 sm:hidden">
          <div>
            <Link href="/" className="flex items-center justify-center">
              <div className="pt-2 text-3xl font-bold leading-normal text-accent">
                Homespace
              </div>
            </Link>
          </div>

          {/* Small screen hamburger menu */}
          <div className="flex items-center justify-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white focus:outline-none"
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
              ? "m-0 block items-center justify-center bg-colorbng p-5 shadow-xl transition duration-300 sm:ml-4 sm:mt-3 sm:flex sm:p-0 sm:shadow-none"
              : "hidden"
          }
        >
          <div className="flex items-center justify-center gap-1 px-4 py-3">
            <Link
              href="/dashboard"
              className="text-center text-base font-semibold leading-snug tracking-tight text-white"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1 px-4 py-3">
            <Link
              href="/about"
              className="text-center text-base font-semibold leading-snug tracking-tight text-white"
            >
              About
            </Link>
          </div>
          <div className="px-16">
            <div className="flex items-center justify-center gap-1 rounded-[100px] border-2 border-secondary bg-secondary py-3 hover:bg-secondary">
              <Link
                href="/create-listing"
                className="text-center text-base font-semibold leading-snug tracking-tight text-white"
              >
                Add Your Apartment
              </Link>
            </div>
          </div>

          <div className="mt-2 text-center">
            {session && session.user ? (
              <div className="flex items-center justify-center gap-1 p-1">
                <Link href={"/settings"}>
                  {session.user.image ?  (<Image
                    src={session.user.image}
                    width={38}
                    height={38}
                    alt="Profile Image"
                    className="rounded-full rounded-full border border-gray-200 p-1" // Apply Tailwind's rounded-full class
                  /> ) : ( <Image
                    src={def}
                    width={38}
                    height={38}
                    alt="Profile Image"
                    className="rounded-full rounded-full border border-gray-200 p-1" // Apply Tailwind's rounded-full class
                  />) }
                  
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-[100px] bg-secondary px-6 py-3 hover:bg-secondaryDark">
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

        <div className="inline-flex hidden w-full items-center justify-center gap-[33px] bg-colorbng px-12 py-4 sm:flex">
          <div className="flex items-center justify-center gap-12">
            <Link href="/" className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="relative mr-2 h-8 w-8">
                  <Image
                    src={logo}
                    alt="logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="text-3xl font-bold leading-normal text-accent">
                  Homespace
                </div>
              </div>
            </Link>
          </div>
          <div className="flex shrink grow  basis-0 items-start justify-end gap-6">
            <div className="flex items-center justify-center gap-1 px-4 py-3">
              <Link
                href="/dashboard"
                className="text-center text-base font-semibold leading-snug tracking-tight text-white"
              >
                Dashboard
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 px-4 py-3">
              <Link
                href="/about"
                className="text-center text-base font-semibold leading-snug tracking-tight text-white"
              >
                About
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-[100px] border-2 border-secondary bg-secondary px-6 py-2 hover:bg-secondary">
              <Link
                href="/create-listing"
                className="text-center text-base font-semibold leading-snug tracking-tight text-white"
              >
                Add Your Apartment
              </Link>
            </div>
            <div className="relative flex items-center justify-center">
              {session && session.user && session.user.image ? (
                <div
                  onClick={toggleDropdown}
                  className="cursor-pointer gap-1 rounded-full border-2 border-secondary bg-colorbng p-[1px]"
                >
                  <div className="flex items-center">
                    {/* Three lines next to the profile image */}
                    <div className="ml-3 mr-2">
                      <div className="h-0.5 w-4 rounded-full bg-white"></div>
                      <div className="my-0.5 h-0.5 w-4 rounded-full bg-white"></div>
                      <div className="h-0.5 w-4 rounded-full bg-white"></div>
                    </div>
                    <Image
                      src={session.user.image}
                      width={38}
                      height={38}
                      alt="Profile Image"
                      className="rounded-full"
                    />
                  </div>
                  {/* Dropdown Menu */}
                  {isDropdownVisible && (
                    <div className="absolute right-0 top-full mt-2 w-[11rem] rounded-md bg-white shadow-lg">
                      <Link
                        href={"/user/" + uData?.username}
                        className="text-md block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="text-md block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        Account Settings
                      </Link>
                      <Link
                        href="/liked-listings"
                        className="text-md block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        Liked Listings
                      </Link>
                      <div className="px-2">
                        <Link
                          href="/api/auth/signout"
                          className="text-md block border-t border-gray-300 px-2 py-2 text-left text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-[100px] bg-secondary px-6 py-3 hover:bg-secondaryDark">
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
    </nav>
  );
}

export default Navbar;
