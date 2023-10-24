import { router } from "../trpc";
import { PrismaClient } from "@prisma/client";

import { createAccountLogin, loginUser } from "./user";
import { createCharge, createStripeCharge, fetchChargeInfo } from "./payment";

const prisma = new PrismaClient();

export const appRouter = router({
  //handleOpenNodeWebhook: procedure.in
  createAccountLogin: createAccountLogin,
  loginUser: loginUser,
  fetchChargeInfo: fetchChargeInfo,
  createCharge: createCharge,
  createStripeCharge: createStripeCharge,
});

// export type definition of API
export type AppRouter = typeof appRouter;
