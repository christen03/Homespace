import { z } from "zod";
import { PutObjectCommand, type PutObjectCommandInput } from "@aws-sdk/client-s3";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { s3 } from "../../db"; // Import your S3Client instance
import { useListingStore } from "~/stores/listing";

// const listingR = useListingStore();

export const imageRouter = createTRPCRouter({
  uploadImages: protectedProcedure
    .input(
      z.object({
        images: z.array(z.string().min(1)), // Expect an array of base64 strings
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const publicUrls = await Promise.all(input.images.map(async (image, index) => {
          const myKey = `images/${ctx.session.user.id}-${Date.now()}-${index}.jpg`;

          const uploadParams: PutObjectCommandInput = {
            Bucket: "lynkpad-listings",
            Key: myKey, // Replace with your desired key structure
            Body: Buffer.from(image, "base64"), // Convert base64 string to buffer
            ContentType: "image/jpeg", // Replace with your image's content type
          };

          // Upload image to Amazon S3
          await s3.send(
            new PutObjectCommand(uploadParams),
          );

          // Construct the public URL for the uploaded image
          return `https://lynkpad-listings.s3.amazonaws.com/${encodeURIComponent(
            myKey,
          )}`;
        }));

        console.log(publicUrls);

        return publicUrls; // Return the array of public URLs as a response
      } catch (error) {
        console.error("Error uploading images to S3:", error);
        throw new Error("Failed to upload images to S3");
      }
    }),
});
