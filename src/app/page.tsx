"use client";

import Link from "next/link";
import WaitlistForm from "./_components/ListingForms/waitlist-form";
import Sparkles from "./_components/sparkles";
import demo from "../../public/launchDemo.png";
import Image from "next/image";
import house from "./houseicon.svg";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { TbHomeCheck } from "react-icons/tb";
import { FaArrowsToCircle } from "react-icons/fa6";

export default function Launch() {
  return (
    <div className="bg-colorbng">
      <div className="bg-colorbng">
        <div className="pt-20">
          <div className="text-center text-white">
            <h1 className="text-3xl font-medium sm:text-5xl">
              <span className="font-medium leading-normal text-accent">
                Homespace
              </span>
              :<div className="sm:hidden"></div> a space like home
            </h1>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-colorbng">
        {" "}
        <div className="animate-fade-in-down w-full rounded-lg bg-colorbng p-8">
          <div className="text-center">
            <h2 className="font-regular mb-4 text-3xl text-white">
              We make subletting easier for students.{" "}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-colorbng">
        <div className="animate-fade-in-down w-full max-w-lg rounded-lg bg-colorbng p-8">
          <div className="flex flex-col items-center justify-center">
            <Sparkles>
              <div className="text-center">
                <h2 className="mb-4 mt-8 text-3xl font-bold text-accent">
                  We&apos;re cooking
                </h2>
                <p className="font-regular mb-4 ml-8 mr-8 text-xl text-gray-200">
                  Join our wait list to stay updated!
                </p>
              </div>
              <WaitlistForm />
            </Sparkles>
          </div>
        </div>
      </div>
      <div className="mt-20 sm:px-20">
        <div className="mx-10 mt-8 flex flex-col text-center rounded-3xl px-6 py-6 sm:px-16 sm:py-12">

            <h1 className="text-xl font-medium text-white sm:text-3xl">
              List & Find with{" "}
              <span className="font-bold leading-normal text-white">
                Homespace
              </span>
            </h1>
            <div className="min mt-4 flex flex-col">
              <div className="w-full text-white">
                <div>
                  <p className="mt-4 text-lg sm:text-xl">
                    We are a platform that helps students list their apartments
                    and find subleases <b>ahead of time.</b>
                  </p>
                  <p className="mt-4 text-lg sm:text-xl">
                    Our goal is to provide students with an ideal living space:
                    a home away from home.
                  </p>
                </div>
              </div>
            
          </div>
        </div>
      </div>
      
      <div className="mx-10 mt-4 sm:mx-20">
        <Image alt="demo" src={demo} className="rounded-2xl shadow-lg border-4 border-gray-600"/>
      </div>

      
      <div className="mx-10 mt-24 sm:mx-40">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          <div className="flex flex-col items-center justify-center text-center">
            <HiOutlineInformationCircle className="text-6xl text-secondary sm:text-8xl" />
            <h2 className="mt-4 text-xl font-medium text-white sm:text-2xl">
              Comprehensive Information
            </h2>
            <p className="font-regular text-lg text-gray-300 sm:text-xl">
              Find accurate and relevant information
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <TbHomeCheck className="text-6xl text-secondary sm:text-8xl" />
            <h2 className="mt-4 text-xl font-medium text-white sm:text-2xl">
              <i>Real</i> &nbsp;Listings
            </h2>
            <p className="font-regular text-lg text-gray-300 sm:text-xl">
              Find accurate and relevant information
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <FaArrowsToCircle className="text-6xl text-secondary sm:text-8xl" />
            <h2 className="mt-4 text-xl font-medium text-white sm:text-2xl">
              All in One Place
            </h2>
            <p className="font-regular text-lg text-gray-300 sm:text-xl">
              Sublease information is consolidated in one place
            </p>
          </div>
        </div>
      </div>
      <div className="h-[10rem] bg-colorbng"></div>
    </div>
  );
}

// import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
// import { redirect } from "next/navigation"

// export default async function Home() {
//   const hello = await api.post.hello.query({ text: "from tRPC" });
//   const hello2 = await api.test.greeting.query();
//   const session = await getServerAuthSession();

//   if(session){
//     redirect("/dashboard")
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
//         <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//           Welcome to <span className="text-[hsl(280,100%,70%)]">Homespace</span>
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">First Steps →</h3>
//             <div className="text-lg">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">Documentation →</h3>
//             <div className="text-lg">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-2xl text-white">
//             {hello ? hello.greeting : "Loading tRPC query..."}
//           </p>
//           <p className="text-2xl text-white">
//             {hello2 ? hello2 : "Loading tRPC query..."}
//           </p>

//           <div className="flex flex-col items-center justify-center gap-4">
//             {/* <p className="text-center text-2xl text-white">
//               {session && <span>Logged in as {session.user?.name}</span>}
//             </p> */}
//             <Link
//               href={session ? "/api/auth/signout" : "/api/auth/signin"}
//               className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
//             >
//               {session ? "Sign out" : "Sign in"}
//             </Link>
//           </div>
//         </div>

//         <CrudShowcase />
//       </div>
//     </main>
//   );
// }

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
