import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";


export default async function Dashboard(){ 


    const secretMessage = await api.post.getSecretMessage.query();
    const session = await getServerAuthSession();

    return (
        <main>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Now you&apos;re logged in and in the dashboard, you can see the secret message: {secretMessage}
    </h1>
    <Link
    href={session ? "/api/auth/signout" : "/api/auth/signin"}
    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
  >
    {session ? "Sign out" : "Sign in"}
  </Link>
  </main>
    )
}