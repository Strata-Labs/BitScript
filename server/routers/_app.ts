import { router } from "../trpc";
import { PrismaClient } from "@prisma/client";

import { checkUserSession, createAccountLogin, loginUser } from "./user";
import { createCharge, createStripeCharge, fetchChargeInfo } from "./payment";

export const appRouter = router({
  createAccountLogin: createAccountLogin,
  loginUser: loginUser,
  checkUserSession: checkUserSession,
  fetchChargeInfo: fetchChargeInfo,
  createCharge: createCharge,
  createStripeCharge: createStripeCharge,
});

// export type definition of API
export type AppRouter = typeof appRouter;
