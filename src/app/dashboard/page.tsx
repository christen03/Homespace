import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";


export default async function Dashboard(){ 


    const listings = await api.listing.getMany.query();
    const session = await getServerAuthSession();

    return (
        <main>
        <h1 className="text-2xl font-medium">
        Welcome to Lynkpad! Here are some listings for you to find your next home.
    </h1>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
  {listings.map((listing) => (
    <div key={listing.id} className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
      <h3 className="text-2xl font-bold">{listing.title}</h3>
      <div className="text-lg">{listing.bathrooms}-bathroom, {listing.bedrooms}-bedroom, {listing.schoolDistance} from campus.</div>
    </div>
  ))}
  </div>

  <Link
    href={session ? "/api/auth/signout" : "/api/auth/signin"}
    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
  >
    {session ? "Sign out" : "Sign in"}
  </Link>

  </main>
    )
}