import { router } from "../trpc";

import {
  checkUserSession,
  createAccountLogin,
  forgotPassword,
  loginUser,
  updateUserPassword,
} from "./user";
import {
  createCharge,
  createStripeCharge,
  createStripeCustomerPortal,
  fetchPayment,
} from "./payment";
import { createHistoryEvent, fetchUserHistory } from "./userHistory";
import { sendEmailText } from "./email";
import {
  createSandboxScriptEvent,
  fetchOneSandboxScript,
  fetchUserSandboxScripts,
  updateSandboxScriptEvent,
} from "./userSandboxScripts";
import {
  checkLessonCompletionStatus,
  completeLessonEvent,
  createLessonEvent,
  fetchUserLessons,
} from "./lessons";
import {
  fetchOrAddIPAddress,
  fetchOrAddUserQuery,
  updateQueryCountForIPAddress,
  updateUserQueryCount,
} from "./userAccess";
import { createTeam } from "./teamPayment";

export const appRouter = router({
  // user procedures
  createAccountLogin: createAccountLogin,
  loginUser: loginUser,
  checkUserSession: checkUserSession,
  updateUserPassword: updateUserPassword,
  forgotPassword: forgotPassword,

  // payment procedures

  createCharge: createCharge,
  createStripeCharge: createStripeCharge,
  createStripeCustomerPortal: createStripeCustomerPortal,
  fetchPayment: fetchPayment,
  // user history procedures
  createHistoryEvent: createHistoryEvent,
  fetchUserHistory: fetchUserHistory,

  // email procedures
  sendEmailText: sendEmailText,

  // User Lessons
  createLessonEvent: createLessonEvent,
  completeLessonEvent: completeLessonEvent,
  checkLessonCompletionStatus: checkLessonCompletionStatus,
  fetchUserLessons: fetchUserLessons,

  // Queries
  fetchOrAddIPAddress: fetchOrAddIPAddress,
  updateQueryCountForIPAddress: updateQueryCountForIPAddress,
  fetchOrAddUserQuery: fetchOrAddUserQuery,
  updateUserQueryCount: updateUserQueryCount,

  // sandbox scripts
  fetchOneScriptEvent: fetchOneSandboxScript,
  fetchScriptEvent: fetchUserSandboxScripts,
  createScriptEvent: createSandboxScriptEvent,
  updateScriptEvent: updateSandboxScriptEvent,

  // team
  createTeam: createTeam,
});

// export type definition of API
export type AppRouter = typeof appRouter;
