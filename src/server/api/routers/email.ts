import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const emailRouter = createTRPCRouter({
  createOne: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      return ctx.db.email.create({
        data: {
          email: input.email,
        },
      });
    }),
});

export type EmailRouter = typeof emailRouter;
