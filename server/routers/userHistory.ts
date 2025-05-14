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
        } as {
          action: string;
          entry: string;
          uri: string;
        };

        // such a cop-out
        if (event.metadata) {
          metaDataThing = event.metadata as {
            action: string;
            entry: string;
            uri: string;
          };
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
      return historyEvent;
    } catch (err: any) {
      throw new Error(err);
    }
  });
