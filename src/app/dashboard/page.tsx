"use client"
import { type Listing, type Session } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DefaultListingsInfo from "../_components/DefaultListingsInfo";
import SessionInfo from "../_components/session-info";
import EnterAddress from "../_components/EnterAddress";
import { type Location } from "~/types";
import FilteredListingsInfo from "../_components/FilteredListingsInfo";



const Dashboard = () => {

  const [selected, setSelected] = useState<Location | null>(null)

  return (
    <main>
  <SessionInfo />
  <EnterAddress setSelected={setSelected}/>
  {selected ? <FilteredListingsInfo selected={selected}/> : <DefaultListingsInfo />}
</main>
  );
};


export default Dashboard;
