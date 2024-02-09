import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        username: z.string(), // Assuming the ID is a string, change it according to your schema
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
        include: {
          listings: true,
        },
      });
    }),
  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        listings: true,
      },
    });
  }),
  getCurrentUserLikedPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include:{
        likedListings: true
      }
    });
  }),
  updateCurrentUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        username: z.string().optional(),
        phoneNumber: z.string().optional(),
        biography: z.string().optional(),
        location: z.string().optional(),
        socials: z.array(z.string()).optional(), // Add socials field
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, username, phoneNumber, biography, location, socials } =
        input;

      const updatedUserData = {
        name,
        username,
        phoneNumber,
        biography,
        location,
        socials, // Update socials field
      };

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: updatedUserData,
      });
    }),
});
