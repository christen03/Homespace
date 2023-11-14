"use client";
import { type Listing, type Session } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ListingsInfo from "../_components/ListingsInfo";

// function RedirectToCreateListing() {
//   const router = useRouter();
//   const redirectUser = () => {
//     router.push("/create-listing");
//   };

//   return (
//     <div
//       onClick={redirectUser}
//       className="
//         hidden
//         md:block
//         text-sm 
//         font-semibold 
//         py-3 
//         px-4 
//         rounded-full 
//         hover:bg-neutral-100 
//         transition 
//         cursor-pointer
//       "
//     >
//       Airbnb your home
//     </div>
//   );
// }

const Dashboard = () => {
  return (
    <div>
      <ListingsInfo />
    </div>
  );
};


export default Dashboard;
