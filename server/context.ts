/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import prisma from "./db";

import { User } from "./zod";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export enum ENV_TYPE {
  DEV = "DEV",
  PROD = "PROD",
}
export interface Context {
  // session: Session | null
  prisma: PrismaClient;
  testing: boolean;
  user: null | User;
  env: ENV_TYPE;
  //ip: string;
}

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> => {
  const env =
    process.env.VERCEL_ENV === "production" ? ENV_TYPE.PROD : ENV_TYPE.DEV;

  // get the single string ip from the request
  //const ip: string = opts.req.headers["x-real-ip"] || opts.req.socket.remoteAddress;

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
            //ip,
            prisma,
            env,
            testing: true,
            user: {
              id: user.id,
              email: user.email,
              createdAt: user.createdAt,
              sessionToken: tokenClean,
              teamId: user.teamId,
            },
          };
        }
      }
    }

    return {
      //ip,
      prisma,
      testing: true,
      user: null,
      env,
    };
  } catch (err) {
    return {
      //ip,
      prisma,
      testing: true,
      user: null,
      env,
    };
  }
};
