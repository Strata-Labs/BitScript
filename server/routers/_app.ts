import { router } from "../trpc";
import { PrismaClient } from "@prisma/client";

import { checkUserSession, createAccountLogin, loginUser } from "./user";
import { createCharge, createStripeCharge, fetchChargeInfo } from "./payment";
import { createHistoryEvent, fetchUserHistory } from "./userHistory";

export const appRouter = router({
  // user procedures
  createAccountLogin: createAccountLogin,
  loginUser: loginUser,
  checkUserSession: checkUserSession,

  // payment procedures
  fetchChargeInfo: fetchChargeInfo,
  createCharge: createCharge,
  createStripeCharge: createStripeCharge,

  // user history procedures
  createHistoryEvent: createHistoryEvent,
  fetchUserHistory: fetchUserHistory,
});

// export type definition of API
export type AppRouter = typeof appRouter;
