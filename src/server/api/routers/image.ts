import { z } from "zod";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { s3 } from "../../db"; // Import your S3Client instance
import { useListingStore } from "~/stores/listing";

const listingR = useListingStore();

export const imageRouter = createTRPCRouter({
  uploadImage: protectedProcedure
    .input(
      z.object({
        image: z.string().min(1), // Assuming the image is passed as a base64 string
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const myKey = `images/${ctx.session.user.id}-${Date.now()}.jpg`;

        const uploadParams: PutObjectCommandInput = {
          Bucket: "lynkpad-listings",
          Key: myKey, // Replace with your desired key structure
          Body: Buffer.from(input.image, "base64"), // Convert base64 string to buffer
          ContentType: "image/jpeg", // Replace with your image's content type
        };

        // Upload image to Amazon S3
        const uploadResult = await ctx.s3.send(
          new PutObjectCommand(uploadParams),
        );

        // Construct the public URL for the uploaded image
        const publicUrl = `https://lynkpad-listings.s3.amazonaws.com/${encodeURIComponent(
          myKey,
        )}`;

        console.log(publicUrl);

        listingR.setImageSrc(publicUrl);

        return publicUrl; // Return the public URL as a response
      } catch (error) {
        console.error("Error uploading image to S3:", error);
        throw new Error("Failed to upload image to S3");
      }
    }),
});
