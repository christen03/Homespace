import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  getMany: publicProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany();
  }), // createOne: protectedProcedure.input(z.object({
  //   title: z.string().min(1),
  //   price: z.number().min(1),
  //   bedrooms: z.number().min(1),
  //   bathrooms: z.number().min(1),
  //   occupants: z.number().min(1),
  //   schoolDistance: z.string().min(1),
  //   imageURI: z.string().min(1),
  // })).mutation(async ({ ctx, input }) => {
  //   await new Promise((resolve) => setTimeout(resolve, 100));
  //   return ctx.db.listing.create({
  //     data: {
  //       title: input.title,
  //       price: input.price,
  //       bedrooms: input.bedrooms,
  //       bathrooms: input.bathrooms,
  //       occupants: input.occupants,
  //       schoolDistance: input.schoolDistance,
  //       imageURI: input.imageURI,
  //       createdBy: { connect: { id: ctx.session.user.id } },
  //     },
  //   });
  // }),
});
