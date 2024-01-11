import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { zodPersonSchema, zodPrismaTypeSchema, zodRoomTypeSchema } from "~/types";

export const listingRouter = createTRPCRouter({
  getMany: publicProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany();
  }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.listing.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
    getOneWithUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.listing.findUnique({
        where: {
          id: input.id,
        },
        include:{
          createdBy: true,
        }
      });
    }),
  filterByLocation: protectedProcedure
    .input(
      z.object({
        longitude: z.number(),
        latitude: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const METERS_PER_MILE = 1609.34;
      return ctx.db.listing.findRaw({
        filter: {
          location: {
            $geoWithin: {
              $centerSphere: [
                [input.longitude, input.latitude],
                20 / METERS_PER_MILE,
              ],
            },
          },
        },
      });
    }),
  createOne: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        price: z.number().min(1),
        bedrooms: z.number().min(1),
        bathrooms: z.number().min(1),
        sharedSpace: z.boolean(),
        occupants: z.array(zodPersonSchema).optional(),
        roomType: zodRoomTypeSchema.optional(),
        longitude: z.number(),
        latitude: z.number(),
        descriptionTags: z.array(zodPrismaTypeSchema),
        addressString: z.string().min(1),
        imageSrcs: z.array(z.string()).min(1),
        listingStart: z.date(),
        listingEnd: z.date(),
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
          sharedSpace: input.sharedSpace,
          occupants: input.occupants,
          roomType: input.roomType,
          location: {
            type: "Point",
            coordinates: [input.longitude, input.latitude],
          },
          descriptionTags: input.descriptionTags,
          addressString: input.addressString,
          imageSrcs: input.imageSrcs,
          createdById: ctx.session.user.id,
          createdAt: new Date(),
          listingStart: input.listingStart,
          listingEnd: input.listingEnd,
        },
      });
    }),
  deleteOne: protectedProcedure.input(
    z.object({
      id: z.string(),
    }),
  )
    .mutation(async ({ ctx, input }) => {

      return ctx.db.listing.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateOne: protectedProcedure.input(
    z.object({
      
    })
  )
});

