"use client";
import { type Listing, type Session } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ListingsInfo from "../_components/ListingsInfo";
import SessionInfo from "../_components/session-info";



const Dashboard = () => {
  return (
    <main>
      <SessionInfo />
      <ListingsInfo />
    </main>
  );
};


export default Dashboard;
