import Image from "next/image";
import christen from "../../../public/christenTerms.jpg";

export default function Terms() {
  return (
    <div className="bg-colorbng">
      <div className="relative">
        <div className="flex flex-col items-center justify-center bg-colorbng pt-20">
          <h1 className="font-source-sans-pro mb-8 text-4xl font-bold text-accent sm:text-6xl">
            Terms of Service
          </h1>
          <p className="font-source-sans-pro mx-auto mb-8 max-w-screen-lg px-8 text-center text-xl font-medium leading-tight text-white sm:px-0 sm:text-2xl">
            Don&apos;t worry about the terms of service pookie, we are still in
            development. Here&apos;s a photo of one of our engineers Christen
            taking a break from working so hard on Homespace :{")"}.
          </p>
        </div>
      </div>
      <div className="mx-10 mt-4 flex items-center justify-center pb-10 sm:mx-20">
        <div className="rounded-2xl border-4 border-gray-600 shadow-lg">
          <Image alt="demo" src={christen} />
        </div>
      </div>
    </div>
  );
}
