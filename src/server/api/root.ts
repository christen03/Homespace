import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { testRouter } from "./routers/test";
import { list } from "postcss";
import { listingRouter } from "./routers/listing";
import { imageRouter } from "./routers/image";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  test: testRouter,
  listing: listingRouter,
  image: imageRouter,
  users: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
