import { z } from "zod";

import { procedure, router } from "../trpc";
import {
  IPAddressZod,
  QueriesZod,
  UserHistoryZod,
  UserLessonZod,
} from "@server/zod";
import { genericUserId } from "./ipQueryTracker";

export const fetchOrAddIPAddress = procedure
  .input(
    z.object({
      ipAddress: z.string(),
    })
  )
  .output(IPAddressZod)
  .mutation(async ({ input, ctx }) => {
    const { ipAddress } = input;
    //const genericUserId = 3;
    let now = new Date();

    let ipRecord = await ctx.prisma.iPAddress.findUnique({
      where: { address: ipAddress },
      include: { user: true },
    });

    if (!ipRecord) {
      ipRecord = await ctx.prisma.iPAddress.create({
        data: {
          address: ipAddress,
          userId: genericUserId,
          queryCount: 3, // Setting initial queryCount
        },
        include: { user: true },
      });
    } else {
      // Check if cooldown period has ended and reset queryCount if it has
      if (ipRecord.cooldownEnd && ipRecord.cooldownEnd <= now) {
        ipRecord = await ctx.prisma.iPAddress.update({
          where: { address: ipAddress },
          data: { queryCount: 3, cooldownEnd: null }, // Reset queryCount and remove cooldownEnd
          include: { user: true },
        });
      } else if (ipRecord.queryCount === 0 && !ipRecord.cooldownEnd) {
        // If queryCount is 0 and there's no cooldownEnd, set cooldown to 24 hours from now
        let cooldownEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
        ipRecord = await ctx.prisma.iPAddress.update({
          where: { address: ipAddress },
          data: { cooldownEnd: cooldownEnd },
          include: { user: true },
        });
      }
    }

    const responseObject = {
      ...ipRecord,
      cooldownEnd: ipRecord.cooldownEnd ? ipRecord.cooldownEnd : undefined,
      user: {
        ...ipRecord.user,
        sessionToken: "generic_token",
      },
    };

    return responseObject;
  });

export const updateQueryCountForIPAddress = procedure
  .input(
    z.object({
      ipAddress: z.string(),
    })
  )
  .output(IPAddressZod)
  .mutation(async ({ input, ctx }) => {
    const { ipAddress } = input;
    let now = new Date();

    let ipRecord = await ctx.prisma.iPAddress.findUnique({
      where: { address: ipAddress },
      include: { user: true },
    });

    if (!ipRecord) {
      throw new Error("IP Address not found");
    }

    // Check if cooldown period has ended and reset queryCount if it has
    if (ipRecord.cooldownEnd && ipRecord.cooldownEnd <= now) {
      await ctx.prisma.iPAddress.update({
        where: { address: ipAddress },
        data: { queryCount: 3, cooldownEnd: null }, // Reset queryCount and remove cooldownEnd
      });
    }

    // Decrement the queryCount
    let newQueryCount = Math.max(0, ipRecord.queryCount - 1);

    // Check if the queryCount has reached 0 and set cooldownEnd to 24 hours from now
    let cooldownEnd = ipRecord.cooldownEnd;
    if (newQueryCount === 0 && ipRecord.queryCount > 0) {
      // Only set cooldown if it's not already in effect
      cooldownEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
    }

    // Update the IP record
    ipRecord = await ctx.prisma.iPAddress.update({
      where: { address: ipAddress },
      data: { queryCount: newQueryCount, cooldownEnd: cooldownEnd },
      include: { user: true },
    });

    const responseObject = {
      ...ipRecord,
      cooldownEnd: ipRecord.cooldownEnd ? ipRecord.cooldownEnd : undefined,
      user: {
        ...ipRecord.user,
        sessionToken: "generic_token",
      },
    };

    return responseObject;
  });

export const getCooldownTimeForIPAddress = procedure
  .input(
    z.object({
      ipAddress: z.string(),
    })
  )
  .output(
    z.object({
      remainingCooldown: z.union([z.number(), z.null()]), // null if no cooldown
    })
  )
  .query(async ({ input, ctx }) => {
    const { ipAddress } = input;
    let now = new Date();

    // Retrieve the IP record
    const ipRecord = await ctx.prisma.iPAddress.findUnique({
      where: { address: ipAddress },
    });

    if (!ipRecord) {
      throw new Error("IP Address not found");
    }

    // Calculate remaining cooldown
    let remainingCooldown = null;
    if (ipRecord.cooldownEnd && ipRecord.cooldownEnd > now) {
      remainingCooldown = ipRecord.cooldownEnd.getTime() - now.getTime();
    }

    return { remainingCooldown };
  });

export const fetchOrAddUserQuery = procedure
  .input(
    z.object({
      userId: z.number().int(),
    })
  )
  .output(QueriesZod)
  .mutation(async ({ input, ctx }) => {
    const { userId } = input;
    let now = new Date();

    // Fetch the most recent paid payment for the user
    const mostRecentPaidPayment = await ctx.prisma.payment.findFirst({
      where: {
        userId: userId,
        status: "PAID",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Determine the query count and user type based on the account tier
    let queryCountBasedOnTier = 10; // default for BEGINNER_BOB
    let userType = "BEGINNER"; // default user type
    if (
      mostRecentPaidPayment &&
      mostRecentPaidPayment.accountTier === "ADVANCED_ALICE"
    ) {
      queryCountBasedOnTier = -1; // unlimited queries for ADVANCED_ALICE
      userType = "ADVANCED"; // set user type to ADVANCED
    }

    // Update user type if necessary
    if (userType === "ADVANCED") {
      await ctx.prisma.user.update({
        where: { id: userId },
        data: { userType: userType },
      });
    }

    // Fetch the first query record for the user based on userId
    let queryRecord = await ctx.prisma.queries.findFirst({
      where: { userId: userId },
    });

    if (!queryRecord) {
      // If the user doesn't have a query record, create one with initial settings
      queryRecord = await ctx.prisma.queries.create({
        data: {
          userId: userId,
          queryCount: queryCountBasedOnTier,
        },
      });
    } else {
      // Check if cooldown period has ended and reset queryCount if it has
      if (queryRecord.cooldownEnd && queryRecord.cooldownEnd <= now) {
        queryRecord = await ctx.prisma.queries.update({
          where: { id: queryRecord.id },
          data: { queryCount: queryCountBasedOnTier, cooldownEnd: null },
        });
      } else if (queryRecord.queryCount === 0 && !queryRecord.cooldownEnd) {
        // If queryCount is 0 and there's no cooldownEnd, set cooldown to 24 hours from now
        let cooldownEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        queryRecord = await ctx.prisma.queries.update({
          where: { id: queryRecord.id },
          data: { cooldownEnd: cooldownEnd },
        });
      }
    }

    // Return the updated query record
    return queryRecord;
  });

export const updateUserQueryCount = procedure
  .input(
    z.object({
      userId: z.number().int(),
    })
  )
  .output(QueriesZod)
  .mutation(async ({ input, ctx }) => {
    const { userId } = input;
    let now = new Date();

    let queryRecord = await ctx.prisma.queries.findFirst({
      where: { userId: userId },
    });

    if (!queryRecord) {
      throw new Error("User not found");
    }

    // Exit the function early if queryCount is -1 (unlimited queries)
    if (queryRecord.queryCount === -1) {
      return queryRecord;
    }

    // Check if cooldown period has ended and reset queryCount if it has
    if (queryRecord.cooldownEnd && queryRecord.cooldownEnd <= now) {
      await ctx.prisma.queries.update({
        where: { id: queryRecord.id },
        data: { queryCount: 10, cooldownEnd: null },
      });
    }

    // Decrement the queryCount
    let newQueryCount = Math.max(0, queryRecord.queryCount - 1);

    // Check if the queryCount has reached 0 and set cooldownEnd to 24 hours from now
    let cooldownEnd = queryRecord.cooldownEnd;
    if (newQueryCount === 0 && queryRecord.queryCount > 0) {
      cooldownEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }

    // Update the query record
    queryRecord = await ctx.prisma.queries.update({
      where: { id: queryRecord.id },
      data: { queryCount: newQueryCount, cooldownEnd: cooldownEnd },
    });

    return queryRecord;
  });

export const getUserCooldownTime = procedure
  .input(
    z.object({
      userId: z.number().int(),
    })
  )
  .output(
    z.object({
      remainingCooldown: z.union([z.number(), z.null()]),
    })
  )
  .query(async ({ input, ctx }) => {
    const { userId } = input;
    let now = new Date();

    const queryRecord = await ctx.prisma.queries.findFirst({
      where: { userId: userId },
    });

    if (!queryRecord) {
      throw new Error("User not found");
    }

    let remainingCooldown = null;
    if (queryRecord.cooldownEnd && queryRecord.cooldownEnd > now) {
      remainingCooldown = queryRecord.cooldownEnd.getTime() - now.getTime();
    }

    return { remainingCooldown };
  });
