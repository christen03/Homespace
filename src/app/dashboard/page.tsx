"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import DefaultListingsInfo from "../_components/DefaultListingsInfo";
import SessionInfo from "../_components/session-info";
import EnterAddress from "../_components/EnterAddress";
import { type Location } from "~/types";
import FilteredListingsInfo from "../_components/FilteredListingsInfo";
import { FaBed, FaDollarSign } from "react-icons/fa";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";

type CustomButtonProps = {
  children: ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children }) => {
  return (
    <button className="mt-4 flex w-full flex-row rounded-3xl bg-white px-6 py-2 text-center text-sm text-gray-600 ring ring-gray-200 ring-opacity-50 transition duration-300 hover:scale-[1.02]">
      {children}
    </button>
  );
};

const Dashboard = () => {
  const [selected, setSelected] = useState<Location | null>(null);

  return (
    <main>
      <div className="flex w-full flex-row">
        <div className="w-1/4 bg-white border-r">
          {/* <EnterAddress setSelected={setSelected} /> */}
          <div className="ml-16 mr-16 mt-12">
            <h3>Type of Room</h3>
            <CustomButton>
              <FaBed className="mr-4  text-lg text-secondary" />
              Single Room
            </CustomButton>
            <CustomButton>
              <FaBed className="mr-4  text-lg text-secondary" />
              <FaBed className="mr-4  text-lg text-secondary" />
              Double Room
            </CustomButton>
          </div>
          <div className="ml-16 mr-16 mt-12">
            <h3>Price</h3>
            <CustomButton>
              <FaDollarSign className="mr-4  text-lg text-secondary" />
              Min Price
            </CustomButton>
            <CustomButton>
              <FaDollarSign className="mr-4  text-lg text-secondary" />
              Max Price
            </CustomButton>
          </div>
          <div className="ml-16 mr-16 mt-12">
            <h3>Date</h3>
            <CustomButton>
              <FaCalendarCheck className="mr-4  text-lg text-secondary" />
              Start Date
            </CustomButton>
            <CustomButton>
              <FaCalendarTimes className="mr-4  text-lg text-secondary" />
              End Date
            </CustomButton>
          </div>
          <div className="ml-8 mr-8 mt-12 flex grid grid-cols-2 gap-4">
            <button className="mt-4 flex flex-row items-center justify-center rounded-3xl border-2 border-secondary px-6 py-2 text-center text-sm text-gray-600 transition duration-300 hover:scale-[1.02]">
              Clear Filters
            </button>
            <button className="mt-4 flex flex-row items-center justify-center rounded-3xl bg-secondary px-6 py-2 text-center text-sm text-white transition duration-300 hover:scale-[1.02]">
              Show Results
            </button>
          </div>
        </div>
        <div className="w-3/4">
          {selected ? (
            <FilteredListingsInfo selected={selected} />
          ) : (
            <DefaultListingsInfo />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
