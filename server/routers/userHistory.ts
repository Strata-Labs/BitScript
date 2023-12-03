import { z } from "zod";

import { procedure, router } from "../trpc";
import {
  IPAddressZod,
  QueriesZod,
  UserHistoryZod,
  UserLessonZod,
} from "@server/zod";
import { genericUserId } from "./ipQueryTracker";

type UserHistoryCopOut = {
  action: string;
  entry: string;
  uri: string;
};

export const fetchUserHistory = procedure
  .output(z.array(UserHistoryZod))
  .query(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }
      // get all the user history events from newest to oldest
      const userHistoryEvents = await opts.ctx.prisma.userHistory.findMany({
        where: {
          userId: opts.ctx.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // loop through res to get in zod format
      const userHistoryEventsZod: any = [];

      userHistoryEvents.forEach((event) => {
        let metaDataThing = {
          action: "",
          entry: "",
          uri: "",
        };

        // such a cop out
        if (event.metadata) {
          metaDataThing = event.metadata as UserHistoryCopOut;
        }

        if (metaDataThing.uri === undefined || metaDataThing.uri === null) {
          metaDataThing.uri = "";
        }

        const historyEvent = {
          id: event.id,
          createdAt: event.createdAt,
          userId: event.userId,
          metadata: metaDataThing,
        };
        userHistoryEventsZod.push(historyEvent);
      });

      return userHistoryEventsZod;
    } catch (err: any) {
      throw new Error(err);
    }
  });
export const createHistoryEvent = procedure
  .input(
    z.object({
      action: z.string(),
      entry: z.string(),
      uri: z.string().nullable(),
    })
  )
  .output(UserHistoryZod)
  .mutation(async (opts) => {
    try {
      // ensure the user is logged in
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      // create the user history event tied to user
      const userHistoryEvent = await opts.ctx.prisma.userHistory.create({
        data: {
          metadata: {
            action: opts.input.action,
            entry: opts.input.entry,
            uri: opts.input.uri,
          },
          User: {
            connect: {
              id: opts.ctx.user.id,
            },
          },
        },
      });

      let metaDataThing = {
        action: " ",
        entry: "",
        uri: "",
      };

      // such a cop out
      if (userHistoryEvent.metadata) {
        metaDataThing = userHistoryEvent.metadata as UserHistoryCopOut;
      }

      if (metaDataThing.uri === undefined || metaDataThing.uri === null) {
        metaDataThing.uri = "";
      }

      const historyEvent = {
        id: userHistoryEvent.id,
        createdAt: userHistoryEvent.createdAt,
        userId: userHistoryEvent.userId,
        metadata: metaDataThing,
      };
      console.log("historyEvent", historyEvent);
      return historyEvent;
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const createLessonEvent = procedure
  .input(
    z.object({
      lessonId: z.number(),
    })
  )
  .output(
    z.object({
      lessonId: z.number(),
      userId: z.number(),
      completed: z.boolean(),
    })
  )
  .mutation(async (opts) => {
    // ensure the user is logged in
    if (!opts.ctx.user) {
      throw new Error("You must be logged in to perform this action");
    }

    const existingEvent = await opts.ctx.prisma.lesson.findFirst({
      where: {
        lessonId: opts.input.lessonId,
        userId: opts.ctx.user.id,
      },
    });

    if (existingEvent) {
      throw new Error("Lesson event already exists for this user");
    }

    const lessonEvent = await opts.ctx.prisma.lesson.create({
      data: {
        lessonId: opts.input.lessonId,
        completed: false,
        userId: opts.ctx.user.id,
      },
    });

    console.log("lessonEvent", lessonEvent);

    return {
      userId: lessonEvent.userId,
      completed: lessonEvent.completed,
      lessonId: lessonEvent.lessonId,
    };
  });

export const completeLessonEvent = procedure
  .input(
    z.object({
      lessonId: z.number(),
    })
  )
  .output(
    z.object({
      lessonId: z.number(),
      userId: z.number(),
      completed: z.boolean(),
    })
  )
  .mutation(async (opts) => {
    // ensure the user is logged in
    if (!opts.ctx.user) {
      throw new Error("You must be logged in to perform this action");
    }

    // Update the lesson event for the logged-in user to mark as completed
    const lessonEvent = await opts.ctx.prisma.lesson.updateMany({
      where: {
        lessonId: opts.input.lessonId,
        userId: opts.ctx.user.id,
        completed: false,
      },
      data: {
        completed: true,
      },
    });

    // Check if any records were updated
    if (lessonEvent.count === 0) {
      throw new Error("Lesson event not found or already completed");
    }

    console.log("lessonEvent completed", lessonEvent);

    const updatedLessonEvent = await opts.ctx.prisma.lesson.findFirst({
      where: {
        lessonId: opts.input.lessonId,
        userId: opts.ctx.user.id,
      },
    });

    if (!updatedLessonEvent) {
      throw new Error("Updated lesson event not found");
    }

    // Return the updated lesson event
    return {
      id: updatedLessonEvent.id,
      userId: updatedLessonEvent.userId,
      completed: updatedLessonEvent.completed,
      lessonId: updatedLessonEvent.lessonId,
      createdAt: updatedLessonEvent.createdAt,
    };
  });

export const checkLessonCompletionStatus = procedure
  .input(
    z.object({
      lessonId: z.number(),
    })
  )
  .output(
    z.object({
      lessonId: z.number(),
      userId: z.number(),
      completed: z.boolean(),
    })
  )
  .query(async (opts) => {
    // Ensure the user is logged in
    if (!opts.ctx.user) {
      throw new Error("You must be logged in to perform this action");
    }

    // Retrieve the lesson event for the logged-in user
    const lessonEvent = await opts.ctx.prisma.lesson.findFirst({
      where: {
        lessonId: opts.input.lessonId,
        userId: opts.ctx.user.id,
      },
    });

    // If no lesson event is found, throw an error
    if (!lessonEvent) {
      throw new Error("Lesson event not found for the user");
    }

    // Return the lesson event completion status
    return {
      lessonId: lessonEvent.lessonId,
      userId: lessonEvent.userId,
      completed: lessonEvent.completed,
    };
  });

export const fetchUserLessons = procedure
  .output(z.array(UserLessonZod))
  .query(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      // Get all the lessons for the logged-in user from newest to oldest
      const userLessons = await opts.ctx.prisma.lesson.findMany({
        where: {
          userId: opts.ctx.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const userLessonsZod = userLessons.map((lesson) => {
        return {
          id: lesson.id,
          userId: lesson.userId,
          completed: lesson.completed,
          createdAt: lesson.createdAt,
          lessonId: lesson.lessonId,
        };
      });

      return userLessonsZod;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  });

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
