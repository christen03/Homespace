import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar";
import { NextAuthProvider } from "./_components/provider";
import Footer from "./_components/footer";
import ListingModal from "./_components/modals/create-listing";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lynkpad",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NextAuthProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Navbar />
            {children}
            <Footer />
          </TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
