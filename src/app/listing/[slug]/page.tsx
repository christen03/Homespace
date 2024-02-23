"use client";

import { api } from "~/trpc/react";
import { useEffect } from "react";
import Loading from "~/app/_components/Loading";

export default function Listing({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const {
    data: listingData,
    isLoading,
    isError,
  } = api.listing.getOne.useQuery({ id });

  useEffect(() => {
    if (id) {
      getListing();
    }
  }, [id]);

  const getListing = () => {
    try {
      api.listing.getOne.useQuery({ id });
    } catch (error) {
      console.error("Error fetching listing:", error);
    }
  };

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

  return <ListingDetails listing={listingData} />;
}

const ListingDetails = ({ listing }: { listing: any }) => {
  const renderImages = () => {
    return listing.imageSrcs.map((imgSrc: string, index: number) => (
      <img
        key={index}
        src={imgSrc}
        alt={`Image ${index + 1}`}
        className="mb-4 h-auto w-full rounded-md shadow-md"
      />
    ));
  };

  return (
    <div className="rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-2 text-3xl font-semibold">{listing.title}</h1>
      <p className="text-gray-600">Price: ${listing.price}</p>
      <p className="text-gray-600">Bedrooms: {listing.bedrooms}</p>
      <p className="text-gray-600">Bathrooms: {listing.bathrooms}</p>
      <p className="text-gray-600">Occupants: {listing.occupants}</p>
      <p className="mb-4 text-gray-600">Address: {listing.addressString}</p>

      <div className="grid grid-cols-2 gap-4">{renderImages()}</div>
    </div>
  );
};
