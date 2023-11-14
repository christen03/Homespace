"use client"

import { api } from "~/trpc/react"
import ListingCard from "./listing-card";
import sample from "../../../public/sample-apartment.png"
import sample2 from "../../../public/sample-apartment-2.jpeg"
export default function ListingsInfo() {
    const getListings = api.listing.getMany.useQuery();
    const listings = getListings.data;

    if (!listings) {
        return <div>Loading...</div>;
    }
    return (
        <main>
            <div className="ml-20 mr-20 mt-6 flex flex-col">
                <div className="align-center mt-2 w-full justify-center">
                </div>
                <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            id={listing.id}
                            title={listing.title}
                            price={listing.price}
                            bathrooms={listing.bathrooms}
                            bedrooms={listing.bedrooms}
                            schoolDistance={listing.schoolDistance}
                            occupants={listing.occupants}
                            img={sample}
                        ></ListingCard>
                    ))}
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            id={listing.id}
                            title={listing.title}
                            price={listing.price}
                            bathrooms={listing.bathrooms}
                            bedrooms={listing.bedrooms}
                            schoolDistance={listing.schoolDistance}
                            occupants={listing.occupants}
                            img={sample2}
                        ></ListingCard>
                    ))}
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            id={listing.id}
                            title={listing.title}
                            price={listing.price}
                            bathrooms={listing.bathrooms}
                            bedrooms={listing.bedrooms}
                            schoolDistance={listing.schoolDistance}
                            occupants={listing.occupants}
                            img={sample}
                        ></ListingCard>
                    ))}
                </div>
            </div>
        </main>
    );
}