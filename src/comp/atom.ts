import { PaymentZod, UserHistoryZod, UserZod } from "@server/zod";
import { atom } from "jotai";
import { z } from "zod";

export type Payment = z.infer<typeof PaymentZod>;
export type User = z.infer<typeof UserZod>;
export type UserHistory = z.infer<typeof UserHistoryZod>;

export const menuOpen = atom(false);
export const menuSelected = atom("home");

export const activeViewMenu = atom(1);
export const activeSearchView = atom(false);

export const searchQuery = atom("");
export const isSearchOpen = atom(false);

export const isClickedModularPopUpOpen = atom(false);

export const TxTextSectionHoverScriptAtom = atom<number[]>([]);
export const TxTextSectionClickScript = atom<number[]>([]);

// user state
export const userSignedIn = atom(false);

// user history depends on API
export const userHistoryAtom = atom<UserHistory[]>([]);

// algorithm for hash calculation
export const hashingAlgorithm = atom("HASH256");

/***
* Custom atoms that are saved to local storage on change
- User 
- Payment
- UserToken
****/

// user token
export const coreUserTokenAtom = atom<string | null>(null);
export const userTokenAtom = atom(
  (get) => get(coreUserTokenAtom),
  (get, set, update: string | null) => {
    localStorage.setItem("token", update || "");
    set(coreUserTokenAtom, update);
  }
);
userTokenAtom.onMount = (setAtom) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAtom(token);
  }
};

// payment atom\

export const corePaymentAton = atom<Payment | null>(null);
export const paymentAtom = atom(
  (get) => get(corePaymentAton),
  (get, set, update: Payment | null) => {
    localStorage.setItem("payment", JSON.stringify(update));
    set(corePaymentAton, update);
  }
);
paymentAtom.onMount = (setAtom) => {
  const payment = localStorage.getItem("payment");
  if (payment) {
    setAtom(JSON.parse(payment));
  }
};
// core user atom
export const coreUserAton = atom<User | null>(null);
export const userAtom = atom(
  (get) => get(coreUserAton),
  (get, set, update: User | null) => {
    localStorage.setItem("user", JSON.stringify(update));
    set(coreUserAton, update);
  }
);
userAtom.onMount = (setAtom) => {
  const user = localStorage.getItem("user");
  if (user) {
    setAtom(JSON.parse(user));
  }
};

/****
 * Modal States
 *****/
// reset password view
export const resetPassword = atom(false);
// reset email view (not completed yet)
// todo: add reset email view api
export const resetEmail = atom(false);
// forgot password view
export const forgotPasswordModal = atom(false);
// example modal for tx
export const popUpExampleOpen = atom(false);

export const modularPopUp = atom(false);
// tutorial modal purchase
export const tutorialBuyModal = atom(false);
export const popUpOpen = atom(false);
export const showLoginModalAtom = atom(false);

type Lesson = {
  id: number;
  createdAt: Date;
  userId: number;
  completed: boolean;
  lessonId: number;
};

export const userLessons = atom<Lesson[]>([]);
export const percentageLessons = atom(0);
export const smallestLessonTitleAtom = atom("");
export const smallestLessonHrefAtom = atom("");
export const smallestLessonTypeAtom = atom("");
export const smallestLessonIdAtom = atom(0);
export const moduleAndChapterAtom = atom({
  module: 0,
  chapter: 0,
});
export const totalModulesAtom = atom(0);
export const totalChaptersAtom = atom(0);

type ModuleStructureType = {
  module: string;
  section: string;
  lessons: number;
};

export const moduleStructureAtom = atom<ModuleStructureType[]>([]);
