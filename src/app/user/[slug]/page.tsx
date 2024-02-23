"use client";

import { api } from "~/trpc/react";
import { useEffect } from "react";
import Loading from "~/app/_components/Loading";
import ListingCard from "../../_components/listing-card";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebookSquare,
} from "react-icons/fa";
import Link from "next/link";

export default function User({ params }: { params: { slug: string } }) {
  const getUserData = api.users.getCurrentUser.useQuery();
  const uData = getUserData.data;

  const id = params.slug;
  const {
    data: userData,
    isLoading,
    isError,
  } = api.users.getOne.useQuery({ id });

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  const getUser = () => {
    try {
      api.users.getOne.useQuery({ id });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !userData) {
    return (
      <div className="flex h-screen items-center justify-center bg-colorbng">
        <div className="text-4xl text-white">
          Sorry Pookie. That user does not exist :(
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
            <div className="text-5xl font-bold">{userData.name!}</div>
          </div>
        </div>
        <div className="mt-8">
          {id === uData?.id ? (
            <Link href="/settings">
              <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                Account Settings
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-8 flex flex-row">
          {userData.socials[1] ? (
            <div className="ml-0">
              {" "}
              <a href={userData.socials[1]} target="_blank">
                <FaInstagram className="text-5xl text-secondary" />
              </a>{" "}
            </div>
          ) : (
            <></>
          )}

          {userData.socials[0] ? (
            <div className="ml-12">
              <a href={userData.socials[0]} target="_blank">
                <FaLinkedin className="text-5xl text-secondary" />
              </a>{" "}
            </div>
          ) : (
            <></>
          )}

          {userData.socials[2] ? (
            <div className="ml-12">
              <a href={userData.socials[2]} target="_blank">
                <FaTwitter className="text-5xl text-secondary" />
              </a>
            </div>
          ) : (
            <></>
          )}

          {userData.socials[3] ? (
            <div className="ml-12">
              {" "}
              <a href={userData.socials[3]} target="_blank">
                <FaFacebookSquare className="text-5xl text-secondary" />
              </a>{" "}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-10 text-center text-2xl">{userData.biography!}</div>
        <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {userData.listings ? (
            userData.listings.map((listing) => (
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
