/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  // session: Session | null
  prisma: PrismaClient;
  testing: boolean;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

// export async function createContext(
//   opts: trpcNext.CreateNextContextOptions
// ): Promise<Context> {
//   // for API-response caching see https://trpc.io/docs/caching

//   console.log("createContext");

//   return await createContextInner({
//     prisma: prisma,
//   });
// }

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  //opts.
  return {
    prisma,
    testing: true,
  };
}
