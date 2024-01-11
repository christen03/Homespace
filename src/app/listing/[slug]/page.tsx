"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "~/app/_components/Loading";
import Image from "next/image";
import {useSession} from "next-auth/react"
import { TagLabels, type Person, type Tag } from "~/types";

export default function Listing({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const {data: session} = useSession();
  const router = useRouter();

  const {
    data: listingData,
    isLoading,
    isError,
  } = api.listing.getOneWithUser.useQuery({ id });

  const deleteListingData = api.listing.deleteOne.useMutation({
    onSuccess: () => {
      console.log("successfully deleted");
      router.push("/dashboard");
    }
  });

  // useEffect(() => {
  //   if (id) {
  //     getListing();
  //   }
  // }, [id]);

  // const getListing = () => {
  //   try {
  //     api.listing.getOne.useQuery({ id });
  //   } catch (error) {
  //     console.error("Error fetching listing:", error);
  //   }
  // };

  const deleteListing = () => {
    try {
      deleteListingData.mutate({ id });
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }

  const editListing = () => {
    return
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !listingData) {
    return (
      <div className="flex h-screen items-center justify-center bg-colorbng">
        <div className="text-4xl text-white">
          Sorry Pookie. That listing does not exist :(
        </div>
      </div>
    );
  }

  
  

  return (
    <div>
      {session?.user.id === listingData.createdById && (
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this post?")) {
              deleteListing();
            }
          }}
        >
          Delete Post
        </button>
      )}
  
      <div>
          <div className="border-b-4 border-green-500">
    <ListingDetails listing={listingData} />
        </div>
        {session?.user.id === listingData.createdById ? (
        <button 
          className="bg-green-700 hover:bg-red-700 text-white font-bold pb-12 px-4 rounded"
          onClick={() => {
              editListing();
          }}
        >
          Edit Post
        </button>
      ) : (
<UserCard userData={listingData.createdBy}/>
      )}
  
      </div>
       <div className="bg-white h-64"></div>
    </div>
  );
}

const ListingDetails = ({ listing }: { listing: any }) => {
  const renderImages = () => {
    return listing.imageSrcs.map((imgSrc: string, index: number) => (
      <img 
        key={index}
        src={imgSrc}
        alt={`Image ${index + 1}`}
        className="mb-4 h-64 w-auto object-cover rounded-md shadow-md" // Adjust the height here
      />
    ));
  };

  const renderOccupants = () => {
    return listing.occupants.map((occupant: Person, index: number) => (
      <div key={index} className="border p-2 rounded-md mb-2">
        <p>Age: {occupant.age}</p>
        <p>Gender: {occupant.gender}</p>
        <p>Description: {occupant.description}</p>
      </div>
    ));
  };

  const renderTags = () => {
    return listing.descriptionTags.map((tag: Tag, index: number) => (
      <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {TagLabels[tag]}
      </span>
    ));
  };

  return (
    <div className="rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-2 text-3xl font-semibold">{listing.title}</h1>
      <p className="text-gray-600">Price: ${listing.price}</p>
      <p className="text-gray-600">Bedrooms: {listing.bedrooms}</p>
      <p className="text-gray-600">Bathrooms: {listing.bathrooms}</p>
      {listing.sharedSpace ? (
        <div className="mb-4">
          <h2 className="text-gray-600 font-semibold">Shared Space:</h2>
          <p>Room Type: {listing.roomType}</p>
          {renderOccupants()}
        </div>
      ) : (
        <p className="mb-4 text-gray-600">Personal Space</p>
      )}
      <p className="mb-4 text-gray-600">Address: {listing.addressString}</p>
      <div className="mb-4">
        <h2 className="text-gray-600 font-semibold">Tags:</h2>
        {renderTags()}
      </div>
      <div className="grid grid-cols-2 gap-4">{renderImages()}</div>
    </div>
  );
};

const UserCard = ({ userData }: { userData: any }) => {
  return (
    <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
      <div className="w-24 h-24 relative mr-6">
        <Image
          src={userData.image}
          alt={userData.name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div>
        <p className="mb-2 text-xl font-semibold text-gray-700">
          {userData.name}
        </p>
        <p className="text-sm font-medium text-gray-600">
          Email: {userData.email}
        </p>
        {userData.phoneNumber && (
          <p className="text-sm font-medium text-gray-600">
            Phone: {userData.phoneNumber}
          </p>
        )}
      </div>
    </div>
  );
};