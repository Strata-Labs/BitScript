import { z } from "zod";

import { procedure, router } from "../trpc";
import { UserHistoryZod } from "@server/zod";

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
