import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ListingCard from "../_components/listing-card";
import sample from "../../../public/sample-apartment.png";
import sample2 from "../../../public/sample-apartment-2.jpeg";

export default async function Dashboard() {
  const listings = await api.listing.getMany.query();
  const session = await getServerAuthSession();

  let firstName = "";
  if (session && session.user && session.user.name) {
    const fullName = session.user.name;
    const spaceIndex = fullName.indexOf(" ");

    if (spaceIndex !== -1) {
      // Extract the substring before the first space
      firstName = fullName.substring(0, spaceIndex);
    } else {
      // If no space is found, use the full name
      firstName = fullName;
    }
  }

  return (
    <main>
      <div className="ml-20 mr-20 mt-6 flex flex-col">
        <div className="align-center mt-2 w-full justify-center">
          <h1 className="text-center text-2xl font-medium">
            Welcome to{" "}
            <span className="font-bold leading-normal text-teal-600">
              Lynkpad
            </span>
            {session ? ", " + firstName : ""}! Here are some listings for you to find your next home:
          </h1>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-4 mb-20">
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
