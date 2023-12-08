import { z } from "zod";

import { procedure, router } from "../trpc";
import {
  IPAddressZod,
  QueriesZod,
  UserHistoryZod,
  UserLessonZod,
} from "@server/zod";
import { genericUserId } from "./ipQueryTracker";

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
