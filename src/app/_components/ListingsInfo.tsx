"use client"

import { api } from "~/trpc/react"
import ListingCard from "./ListingCard";
import sample from "../../../public/sample-apartment.webp"
import sample2 from "../../../public/sample-apartment.webp"
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
                    {/* <h1 className="text-center text-2xl font-medium">
                Welcome to{" "}
                <span className="font-bold leading-normal text-teal-600">
                  Lynkpad
                </span>
                {session ? ", " + firstName : ""}! Here are some listings for you to
                find your next home:
              </h1> */}
                </div>
                <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-4 md:grid-cols-2">
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