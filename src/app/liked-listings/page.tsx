"use client";

import { api } from "~/trpc/react";
import { useEffect } from "react";
import Loading from "~/app/_components/Loading";
import ListingCard from "../_components/listing-card";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebookSquare,
} from "react-icons/fa";
import Link from "next/link";

export default function User({ params }: { params: { slug: string } }) {
  const getUserData = api.users.getCurrentUser.useQuery();
  const userData = getUserData.data;

  if (getUserData.isLoading) {
    return <Loading />; // Replace with your loading component or UI
  }

  if (getUserData.isError || !userData) {
    return (
      <div className="flex h-screen items-center justify-center bg-colorbng">
        <div className="text-4xl text-white">
          Sorry, that user does not exist :(
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-36 py-2">
      <div className="mt-24 flex w-full flex-col items-center">
        {" "}
        <div className="h-[full]">
          <img
            src={userData.image!}
            alt="Profile Image"
            className="h-[10rem] rounded-full border-4 border-secondary"
          ></img>
        </div>
        <div className="mt-8">
          <div className="text-left">
            <div className="text-5xl font-bold">
              {userData.name!}&apos;s liked listings
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-row">
        </div>
        <div className="mt-10 text-center text-2xl">{userData.biography!}</div>
        <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {userData.liked ? (
            userData.liked.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                price={listing.price}
                bathrooms={listing.bathrooms}
                bedrooms={listing.bedrooms}
                occupants={listing.occupants}
                imgSrcs={listing.imageSrcs}
                addressString={listing.addressString}
                createdBy={listing.createdById}
              ></ListingCard>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div> </div>
    </div>
  );
}
