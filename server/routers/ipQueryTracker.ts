import { z } from "zod";
import { procedure } from "../trpc";

export const trackIPQuery = procedure
  .input(
    z.object({
      ipAddress: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const ipAddress = input.ipAddress;

    const existingIP = await ctx.prisma.iPAddress.findUnique({
      where: { address: ipAddress },
    });

    if (existingIP) {
      // Check if the user is in cooldown
      if (
        existingIP.cooldownEnd &&
        new Date(existingIP.cooldownEnd) > new Date()
      ) {
        throw new Error(
          "Query limit reached. Please wait for the cooldown period to end."
        );
      }

      // Decrement query count or reset if the count is 0
      if (existingIP.queryCount > 0) {
        await ctx.prisma.iPAddress.update({
          where: { address: ipAddress },
          data: { queryCount: existingIP.queryCount - 1 },
        });
      } else {
        // Reset query count and set cooldown
        await ctx.prisma.iPAddress.update({
          where: { address: ipAddress },
          data: {
            queryCount: 3,
            cooldownEnd: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });
      }
    } else {
      // Create new IP address entry
      await ctx.prisma.iPAddress.create({
        data: { address: ipAddress, queryCount: 2, userId: 0 }, // First query made, so count is set to 2
      });
    }

    return { message: "Query tracked successfully" };
  });
