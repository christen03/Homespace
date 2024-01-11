import { createTRPCRouter } from "~/server/api/trpc";
import { testRouter } from "./routers/test";
import { list } from "postcss";
import { listingRouter } from "./routers/listing";
import { imageRouter } from "./routers/image";
import { userRouter } from "./routers/user";
import { emailRouter } from "./routers/email";
import { sendEmailRouter } from "./routers/send-email";
import { likesRouter } from "./routers/likes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  test: testRouter,
  listing: listingRouter,
  image: imageRouter,
  users: userRouter,
  email: emailRouter,
  send: sendEmailRouter,
  likes: likesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
