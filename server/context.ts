/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

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

  const prisma = new PrismaClient();

  try {
    const token = opts.req.headers.authorization;

    if (token) {
      console.log("token", token);
      // remove the Bearer from the token
      const tokenClean = token.replace("Bearer ", "");
      // decode the token and fetch the user info
      console.log("clean token", tokenClean);

      const decodedToken = await jwt.verify(tokenClean, "fry");

      console.log("decodedToken", decodedToken);
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
            user: user,
          };
        }
      }
    } else {
      console.log("no token");
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
