import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"

import { env } from "~/env.mjs";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety. s
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    // redirect({ url, baseUrl }) {
    //   // If the user is signing in, redirect them to the dashboard
    //   if (url.startsWith(baseUrl + '/api/auth/signin')) {
    //     return baseUrl + '/dashboard';
    //   }
      
    //   // If the user is signing out, redirect them to the base URL
    //   if (url.startsWith(baseUrl + '/api/auth/signout')) {
    //     return baseUrl;
    //   }

    //   // If the URL doesn't match the above, fallback to the requested URL or base URL
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: 'sendgrid',
      type: 'email',
      async sendVerificationRequest({ identifier: email, url }) {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email }] }],
            from: { email: "spacelikehome.contact@gmail.com" }, 
            subject: "Sign in to Your Page",
            content: [
              {
                type: "text/plain",
                value: `Please click here to authenticate - ${url}`,
              },
            ],
          }),
        });
        if (!response.ok) {
          const errorBody = await response.json();
          throw new Error(JSON.stringify(errorBody.errors));
        }
        if(response.ok) {
          console.log("response ok")
        }
      },
    },
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
