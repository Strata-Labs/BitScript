/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import prisma from "./db";

import { User } from "./zod";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Context {
  // session: Session | null
  prisma: PrismaClient;
  testing: boolean;
  user: null | User;
}

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> => {
  //opts.

  try {
    const token = opts.req.headers.authorization;

    if (token) {
      // remove the Bearer from the token
      const tokenClean = token.replace("Bearer ", "");
      // decode the token and fetch the user info

      const salt = process.env.TOKEN_SALT || "fry";
      const decodedToken = jwt.verify(tokenClean, salt);

      if (typeof decodedToken !== "string") {
        const user = await prisma.user.findUnique({
          where: {
            id: decodedToken.id,
          },
        });

        if (user) {
          return {
            prisma,
            testing: true,
            user: {
              id: user.id,
              email: user.email,
              createdAt: user.createdAt,
              sessionToken: tokenClean,
            },
          };
        }
      }
    }

    return {
      prisma,
      testing: true,
      user: null,
    };
  } catch (err) {
    return {
      prisma,
      testing: true,
      user: null,
    };
  }
};
