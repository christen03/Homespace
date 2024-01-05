"use client";

import Link from "next/link";
import WaitlistForm from "./waitlist-form";
import Sparkles from "./_components/sparkles";
import house from "./houseicon.svg";

export default function Launch() {
  const handleFormSubmit = (email: string) => {
    // Handle form submission logic here (e.g., API calls)
    console.log("Form submitted with email:", email);
    // Additional logic as needed
  };

  return (
    <div className="bg-colorbng">
      <div className="bg-colorbng">
        <div className="pt-20">
          <div className="text-center text-white">
            <h1 className="text-3xl font-medium sm:text-5xl">
              <span className="text-accent font-medium leading-normal">
                Homespace
              </span>
              : a space like home
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-colorbng flex items-center justify-center">
        {" "}
        <div className="animate-fade-in-down bg-colorbng w-full rounded-lg p-8">
          <div className="text-center">
            <h2 className="font-regular mb-4 text-3xl text-white">
              We make subletting easier for students.{" "}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-colorbng flex items-center justify-center">
        <div className="animate-fade-in-down bg-colorbng w-full max-w-lg rounded-lg p-8">
          <div className="flex flex-col items-center justify-center">
            <Sparkles>
              <div className="text-center">
                <h2 className="text-accent mb-4 mt-8 text-3xl font-bold">
                  We're cooking
                </h2>
                <p className="font-regular mb-4 ml-8 mr-8 text-xl text-gray-200">
                  Join our wait list to stay updated!
                </p>
              </div>
              <WaitlistForm onSubmit={handleFormSubmit} />
            </Sparkles>
          </div>
        </div>
      </div>
      <div className="mt-20 px-20">
        <div className="mx-10 mt-8 flex flex-row rounded-3xl bg-gray-100 px-16 py-12">
          <div className="w-3/5">
            <h1 className="text-colorbng text-3xl font-medium sm:text-4xl">
              List & Find with{" "}
              <span className="text-colorbng font-bold leading-normal">
                Homespace
              </span>
            </h1>
            <div className="min mt-4 flex flex-col">
              <div className="w-full text-2xl text-gray-600">
                <div>
                  <p className="mt-4">
                    We are a platform that helps students list their apartments
                    and find subleases <b>ahead of time.</b>
                  </p>
                  <p className="mt-4">
                    Our goal is to provide students with an ideal living space -
                    a home away from home.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-2/5 items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              className="h-64 "
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="2.4"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M14 21.0001V15.0001H10V21.0001M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001"
                  stroke="#F5D769"
                  stroke-width="1.44"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-colorbng h-[30rem]"></div>
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
