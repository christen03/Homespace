"use client";

import { api } from "~/trpc/react";
import ListingCard from "./listing-card";


interface DefaultListingsInfoProps {
  age: number
}

export default function DefaultListingsInfo({ age }: DefaultListingsInfoProps) {
  const getManyQuery = api.listing.getMany.useQuery();
  const getAgeQuery = api.listing.filterByAge.useQuery({age: age}, {
    skip: !age,
  });
 
  const listings = age ? getAgeQuery.data : getManyQuery.data;

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
  <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
    {listings.map((listing) => (
      <ListingCard
        key={listing.id}
        id={listing.id}
        title={listing.title}
        price={listing.price}
        bathrooms={listing.bathrooms}
        bedrooms={listing.bedrooms}
        sharedSpace={listing.sharedSpace}
        imgSrcs={listing.imageSrcs}
        minAge={listing.minAge}
        maxAge={listing.maxAge}
        addressString={listing.addressString}
        listingStart={listing.listingStart.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} 
        listingEnd={listing.listingEnd.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        descriptionTags={listing.descriptionTags} 
     />
    ))}
  </div>
</div>
    </main>
  );
}
