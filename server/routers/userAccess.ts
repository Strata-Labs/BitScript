import { z } from "zod";

import { createClientBasedPayment, procedure, router } from "../trpc";
import {
  IPAddressZod,
  QueriesZod,
  QueryTrackingZod,
  UserHistoryZod,
  UserLessonZod,
  QueryTrackingMethodsZod,
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

export const fetchAddressQueryTracking = procedure

  .output(QueryTrackingZod)
  .query(async ({ ctx }) => {
    // check if the user is logged in
    const user = ctx.user;

    // check if the address has a query tracker model
    const queryTracker = await ctx.prisma.queryTracking.findUnique({
      where: {
        address: ctx.ip,
      },
    });

    if (queryTracker) {
      // if the user is singed in and the query tracker model is not associated with the user

      // we should handle the case where the ip is not identical to the user's ip

      // we should probably check if any of the time limits have been reached and reset them

      let queryLimitForUser = 3;
      const updateData: any = {};

      if (
        user &&
        (queryTracker?.userId === null || queryTracker?.userId === user.id)
      ) {
        // update the query tracker model to be associated with the user
        updateData.userId = user.id;

        const latestPayment = await ctx.prisma.payment.findFirst({
          where: {
            userId: user.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const payment = createClientBasedPayment(latestPayment);
        if (payment.accountTier === "BEGINNER_BOB" && payment.hasAccess) {
          queryLimitForUser = 10;
        }
      }

      const now = new Date();
      const rpcQueryCooldownEnd = queryTracker?.rpcQueryCooldownEnd;
      const transactionQueryCooldownEnd =
        queryTracker?.transactionQueryCooldownEnd;

      if (rpcQueryCooldownEnd && rpcQueryCooldownEnd < now) {
        // remove the cool down
        updateData.rpcQueryCooldownEnd = null;
        updateData.rpcQueryCount = queryLimitForUser;
      }

      if (transactionQueryCooldownEnd && transactionQueryCooldownEnd < now) {
        // remove the cool down
        updateData.transactionQueryCooldownEnd = null;
        updateData.transactionQueryCount = queryLimitForUser;
      }

      if (Object.keys(updateData).length > 0) {
        // update the query tracker model
        const updatedQueryTracker = await ctx.prisma.queryTracking.update({
          where: {
            address: ctx.ip,
          },
          data: updateData,
        });

        return QueryTrackingZod.parse(updatedQueryTracker);
      } else {
        // no updates need to be made
        return QueryTrackingZod.parse(queryTracker);
      }
    } else {
      // create the query tracker model for this ip
      if (user) {
        // check if the user has a payment model that is bb

        const latestPayment = await ctx.prisma.payment.findFirst({
          where: {
            userId: user.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (latestPayment) {
          // we're hedging they don't have an account by running the rest of the query as if they don't have an account
          const payment = createClientBasedPayment(latestPayment);

          if (payment.accountTier === "BEGINNER_BOB" && payment.hasAccess) {
            // check the tier of the account
            // set the proper query count for each of these items
            const newQueryTracker = await ctx.prisma.queryTracking.create({
              data: {
                address: ctx.ip,
                userId: user.id,
                rpcQueryCount: 10,
                transactionQueryCount: 10,
              },
            });

            return QueryTrackingZod.parse(newQueryTracker);
          }
        }
      }

      // if everything else from the above is skipped we pass go
      const newQueryTracker = await ctx.prisma.queryTracking.create({
        data: {
          address: ctx.ip,
          userId: user?.id || null,
        },
      });

      return QueryTrackingZod.parse(newQueryTracker);
    }
  });

export const handleUserQueryTracking = procedure
  .input(
    z.object({
      method: QueryTrackingMethodsZod,
    })
  )
  .output(QueryTrackingZod)
  .mutation(async ({ input, ctx }) => {
    // get the query Model for this ip
    const queryTracker = await ctx.prisma.queryTracking.findUnique({
      where: {
        address: ctx.ip,
      },
    });

    // check if any of the times need to be reset

    if (!queryTracker) {
      throw new Error("Query Tracker not found");
    }

    if (ctx.user) {
      // check the access level of the user
      // get the latest payment of the user
      /* 
      const latestPayment = await ctx.prisma.payment.findFirst({
        where: {
          userId: ctx.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (latestPayment) {
        // we're hedging they don't have an account by running the rest of the query as if they don't have an account
        const payment = createClientBasedPayment(latestPayment);

        if (payment.hasAccess) {

          const tier = payment.accountTier;
        }
      }
      */
    }
    // based on the method return a updated query tracker
    const method = input.method;
    let _params: any = {};

    const now = new Date();
    const rpcQueryCooldownEnd = queryTracker?.rpcQueryCooldownEnd;
    const transactionQueryCooldownEnd =
      queryTracker?.transactionQueryCooldownEnd;

    if (method === "RPC") {
      if (
        queryTracker.rpcQueryCooldownEnd === null ||
        (rpcQueryCooldownEnd && rpcQueryCooldownEnd < now)
      ) {
        // add the cool down to be 24 from now
        _params.rpcQueryCooldownEnd = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        );
      }

      _params.rpcQueryCount = queryTracker.rpcQueryCount - 1;
    } else if (method === "TRANSACTION") {
      if (
        queryTracker.transactionQueryCooldownEnd === null ||
        (transactionQueryCooldownEnd && transactionQueryCooldownEnd < now)
      ) {
        // add the cool down to be 24 from now
        _params.transactionQueryCooldownEnd = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        );
      }

      _params.transactionQueryCount = queryTracker.transactionQueryCount - 1;
    }

    const updatedQueryTracker = await ctx.prisma.queryTracking.update({
      where: {
        address: ctx.ip,
      },
      data: _params,
    });

    return QueryTrackingZod.parse(updatedQueryTracker);
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
