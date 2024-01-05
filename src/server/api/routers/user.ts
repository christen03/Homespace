import { z } from "zod"
import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc"

export const userRouter = createTRPCRouter({
    getCurrentUser: protectedProcedure.query(({ ctx }) => {
        return ctx.db.user.findUnique({
            where: {
                id: ctx.session.user.id
            },
            include: {
                listings: true,
            }
        });
    }),
    updateCurrentUser: protectedProcedure.input(
        z.object({
            name: z.string().optional(),
            phoneNumber: z.string().optional(),
            biography: z.string().optional(),
            location: z.string().optional(),
        }),
    )
    .mutation(async ({ ctx, input }) => {
        return ctx.db.user.update({
            where: {
                id: ctx.session.user.id
            },
            data: {
                name: input.name,
                phoneNumber: input.phoneNumber,
                biography: input.biography,
                location: input.location,
            },
        });
    }),
    
});

