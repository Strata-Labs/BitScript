import { router } from "../trpc";
import { PrismaClient } from "@prisma/client";

import {
  checkUserSession,
  createAccountLogin,
  forgotPassword,
  loginUser,
  updateUserPassword,
} from "./user";
import { createCharge, createStripeCharge, fetchChargeInfo } from "./payment";
import { createHistoryEvent, fetchUserHistory } from "./userHistory";
import { sendEmailText } from "./email";

export const appRouter = router({
  // user procedures
  createAccountLogin: createAccountLogin,
  loginUser: loginUser,
  checkUserSession: checkUserSession,
  updateUserPassword: updateUserPassword,
  forgotPassword: forgotPassword,

  // payment procedures
  fetchChargeInfo: fetchChargeInfo,
  createCharge: createCharge,
  createStripeCharge: createStripeCharge,

  // user history procedures
  createHistoryEvent: createHistoryEvent,
  fetchUserHistory: fetchUserHistory,

  // email procedures
  sendEmailText: sendEmailText,
});

// export type definition of API
export type AppRouter = typeof appRouter;
