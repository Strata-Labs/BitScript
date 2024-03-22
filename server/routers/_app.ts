import { router } from "../trpc";

import {
  checkUserSession,
  createAccountLogin,
  createTeamUserLink,
  forgotPassword,
  loginUser,
  updateUserPassword,
} from "./user";
import {
  checkIfEmailAlreadyExists,
  createCharge,
  createStripeCharge,
  createStripeCustomerPortal,
  fetchPayment,
} from "./payment";
import { createHistoryEvent, fetchUserHistory } from "./userHistory";
import { contactTeamEmail, sendEmailText } from "./email";
import {
  bookmarkSandboxScript,
  createSandboxScriptEvent,
  deleteScript,
  fetchOneSandboxScript,
  fetchUserBookmarkedScripts,
  fetchUserSandboxScripts,
  removeBookmark,
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
  fetchAddressQueryTracking,
  handleUserQueryTracking,
} from "./userAccess";
import { createTeam } from "./teamPayment";
import { fetchBTCRPC } from "./btcRPC";
import { getBitSimTip, mineSomeBlocks } from "@server/bitSimActions";

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
  checkIfEmailAlreadyExists: checkIfEmailAlreadyExists,
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
  bookmarkSandboxScript: bookmarkSandboxScript,
  fetchUserBookmarkedScripts: fetchUserBookmarkedScripts,
  deleteScript: deleteScript,
  removeBookmark: removeBookmark,

  // team
  createTeam: createTeam,
  createTeamUserLink: createTeamUserLink,

  // customer support
  contactTeamEmail: contactTeamEmail,

  // btc rpc
  fetchBTCRPC: fetchBTCRPC,

  fetchAddressQueryTracking: fetchAddressQueryTracking,

  handleUserQueryTracking: handleUserQueryTracking,

  // BitSim Actions
  mineSomeBlocks: mineSomeBlocks,
  getBitSimTip: getBitSimTip,
});

// export type definition of API
export type AppRouter = typeof appRouter;
