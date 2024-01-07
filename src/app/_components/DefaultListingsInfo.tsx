"use client";

import { api } from "~/trpc/react";
import ListingCard from "./listing-card";



export default function DefaultListingsInfo() {
  const getManyQuery = api.listing.getMany.useQuery();
  const listings=getManyQuery.data

  if (!listings) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-t-4 border-teal-500"></div>
      </div>
    );
  }

  return (
    <main>
      <div className="ml-20 mr-20 mt-4 flex flex-col">
        <div className="align-center mt-2 w-full justify-center"></div>
        <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              price={listing.price}
              bathrooms={listing.bathrooms}
              bedrooms={listing.bedrooms}
              occupants={listing.occupants}
              imgSrcs={listing.imageSrcs}
              createdBy={listing.createdById}
              addressString={listing.addressString}
            ></ListingCard>
          ))}
        </div>
      </div>
    </main>
  );
}
