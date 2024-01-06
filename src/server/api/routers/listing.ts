import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  getMany: publicProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany();
  }),
  
  filterByLocation: protectedProcedure
  .input(z.object({
    longitude: z.number(),
    latitude: z.number(),
  }))
  .query(({ ctx, input }) => {
    const METERS_PER_MILE = 1609.34;
    return ctx.db.listing.findRaw({
      filter: {
        location: {
          $geoWithin: {
            $centerSphere: [[input.longitude, input.latitude], 20 / METERS_PER_MILE],
          }
        }
      }
    });
  }),
  createOne: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        price: z.number().min(1),
        bedrooms: z.number().min(1),
        bathrooms: z.number().min(1),
        occupants: z.number(),
        longitude: z.number(),
        latitude: z.number(),
        addressString: z.string().min(1),
        imageSrcs: z.array(z.string()).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      return ctx.db.listing.create({
        data: {
          title: input.title,
          price: input.price,
          bedrooms: input.bedrooms,
          bathrooms: input.bathrooms,
          occupants: input.occupants,
          location:{
            type: "Point",
            coordinates: [input.longitude, input.latitude]
          },
          addressString: input.addressString,
          imageSrcs: input.imageSrcs,
          createdById: ctx.session.user.id,
        },
      });
    }),
});
