"use client";

import Link from "next/link";
import "./navbar.css";
import { useState, useEffect } from "react";
import { FaHeart, FaPerson } from "react-icons/fa6";
import CardSlider from "./CardSlider";
import { TagLabels, type Tag } from "~/types";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  sharedSpace: boolean;
  imgSrcs: string[];
  addressString: string;
  listingStart: string;
  listingEnd: string;
  descriptionTags: Tag[];
}

function ListingCard({
  id,
  title,
  price,
  bathrooms,
  bedrooms,
  sharedSpace,
  imgSrcs,
  addressString,
  listingStart,
  listingEnd,
  descriptionTags,
}: ListingCardProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const width = document.getElementById(`image-${id}`)?.offsetWidth ?? 0;
    setImageSize({ width, height: width });
  }, [id]);
  return (
    <Link href={"/listing/" + id}>
      <div className="flex w-full rounded-[15px] border border-gray-300 transition duration-300 hover:scale-[1.02]">
        <div className="w-1/2 overflow-hidden rounded-l-2xl">
          <div
            id={`image-${id}`}
            className="aspect-w-1 aspect-h-1 relative h-full w-full overflow-hidden rounded-[20px]"
          >
            <CardSlider imgSrcs={imgSrcs} />
          </div>
        </div>
        <div className="flex w-1/2 flex-col rounded-r-2xl bg-white">
          <div className="flex-1 p-4">
            <p className="text-lg text-gray-900">
              {listingStart} - {listingEnd}
            </p>
            <p className="text-xl font-bold text-gray-900">{title}</p>

            <div
              className="my-4 h-px bg-gray-300"
              style={{ height: "1px", width: "25%" }}
            />
            <div className="mt-2 text-sm text-gray-500">
              {sharedSpace ? "Shared Space" : "Personal Space"} &bull;{" "}
              {bedrooms} Bed &bull; {bathrooms} Bath
            </div>
            <div className="mt-2 flex flex-wrap">
              {descriptionTags.map((tag) => (
                <span
                  key={tag}
                  className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700"
                >
                  {TagLabels[tag]}
                </span>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-500">{addressString}</div>
          </div>
          <div className="flex flex-1 flex-row items-center justify-between p-3">
            <span className="text-black0 text-lg">${price}/month</span>
            <FaHeart className="cursor-pointer text-lg text-gray-400 hover:text-red-500" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
