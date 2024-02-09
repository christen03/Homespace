import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { LikeError } from "~/app/errors/FormError";

export const likesRouter = createTRPCRouter({
    toggleLikeListing: protectedProcedure
        .input(
            z.object({
                listingId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            //check if user is logged in
            if (!ctx.session.user) {
                throw LikeError.NOT_LOGGED_IN();
            }

            const user = await ctx.db.user.findUnique({
                where: { id: ctx.session.user.id },
                select: { likedListingIds: true }
            });
            const alreadyLiked = user?.likedListingIds.includes(input.listingId); //check if the user has already liked the listing
            if (alreadyLiked) {
                const updatedUserLikedListings = user?.likedListingIds.filter(id => id !== input.listingId);
                //remove the listing from the user's liked listings
                await ctx.db.user.update({
                    where: { id: ctx.session.user.id },
                    data: {
                        likedListingIds: {
                            set: updatedUserLikedListings,
                        },
                    },
                });

                // fetch current likedByIds from the Listing
                const listing = await ctx.db.listing.findUnique({
                    where: { id: input.listingId },
                    select: { likedByIds: true }
                });

                // remove user from the likedByIds array in the Listing model
                const updatedListingLikedByIds = listing?.likedByIds.filter(id => id !== ctx.session.user.id);

                // remove the user from the listing's likedByIds
                await ctx.db.listing.update({
                    where: { id: input.listingId },
                    data: {
                        likedByIds: {
                            set: updatedListingLikedByIds, // This line seems to be incorrect. You should update it to remove the user's ID from the Listing's likedByIds.
                        },
                    },
                });
            } else {
                // add the listing to the user's liked listings
                await ctx.db.user.update({
                    where: { id: ctx.session.user.id },
                    data: {
                        likedListingIds: {
                            push: input.listingId,
                        },
                    },
                });

                // add user to the likedByIds array in the listing model
                await ctx.db.listing.update({
                    where: { id: input.listingId },
                    data: {
                        likedByIds: {
                            push: ctx.session.user.id,
                        },
                    },
                });
            }
        }),
});
