import { api } from "~/trpc/react";
import ListingCard from "./listing-card";
import { type Location } from "~/types";

type FilteredListingInfoProps = {
  selected: Location;
};

export default function FilteredListingsInfo({
  selected,
}: FilteredListingInfoProps) {
  const filteredQuery = api.listing.filterByLocation.useQuery({
    longitude: selected.lng,
    latitude: selected.lat,
  });

  const listings = filteredQuery.data;

  if (!listings || !Array.isArray(listings)) {
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
        <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {listings.map((listing: any) => (
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
