import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
    greeting: publicProcedure.query(() => "hello TRPRC v10!")
})