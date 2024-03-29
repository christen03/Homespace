"use client";

import Link from "next/link";
import "./navbar.css";
import Image, { type StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { FaBath, FaBed} from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import CardSlider from "./CardSlider";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  occupants: number;
  imgSrcs: string[];
  createdBy: string
  addressString: string;
}

function ListingCard({
  id,
  title,
  price,
  bathrooms,
  bedrooms,
  occupants,
  imgSrcs,
  createdBy,
  addressString
}: ListingCardProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {    const width = document.getElementById(`image-${id}`)?.offsetWidth ?? 0;
    setImageSize({ width, height: width });
  }, [id]);
  return (
    <Link href={"/listing/" + id}>
      <div className="flex w-full flex-col hover:scale-[1.02] duration-300 transition">
        <div className="w-full">
          <div
            id={`image-${id}`}
            className="aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-2xl"
            style={{ width: "100%", height: imageSize.height }}
          >
           <CardSlider imgSrcs={imgSrcs} />
          </div>
          <div className="rounded-b-xl bg-white">
            <p className="ml-4 pt-2 text-xl font-bold text-gray-900">{title}</p>
            <p className="font-regular ml-4 text-sm text-gray-900">
              ${price} per month 
            </p>
            <div className="align-center flex flex-row justify-center gap-3 mt-2">
            <div className="font-regular ml-4 mt-1 flex text-center text-md text-gray-500">
              Created by: {createdBy}
            </div>
            <div className="font-regular ml-4 mt-1 flex text-center text-md text-gray-500">
              Address: {addressString}
            </div>
              <div className="font-regular ml-4 mt-1 flex text-center text-md text-gray-500">
                {bedrooms} <FaBed className="mt-1 ml-1" />
              </div>
              <div className="font-regular ml-4 mt-1 flex text-center text-md text-gray-500">
                {bathrooms} <FaBath className="mt-1 ml-1" />
              </div>

              <div className="font-regular ml-4 mt-1 flex text-center text-md text-gray-500">
                {occupants} <FaPerson className="mt-1 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
