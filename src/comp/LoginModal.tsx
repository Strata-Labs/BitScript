import { classNames } from "@/utils";
import { trpc } from "@/utils/trpc";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { use, useEffect, useState } from "react";
import {
  userAtom,
  showLoginModalAtom,
  userTokenAtom,
  paymentAtom,
  forgotPasswordModal,
  userSignedIn,
  UserHistory,
  percentageLessons,
  userHistoryAtom,
  userLessons,
  smallestLessonTitleAtom,
  smallestLessonHrefAtom,
  smallestLessonTypeAtom,
  smallestLessonIdAtom,
  moduleAndChapterAtom,
  totalModulesAtom,
  totalChaptersAtom,
  moduleStructureAtom,
  createLoginModal,
  accountTierAtom,
  tutorialBuyModal,
} from "./atom";
import { BitcoinBasics } from "@/utils/TUTORIALS";
import { ArticleViewProps } from "./Tutorials/ArticleView";
import Link from "next/link";

const LoginModal = () => {
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [showBuyingOptions, setShowBuyingOptions] = useAtom(tutorialBuyModal);
  const [completionPercentage, setCompletionPercentage] =
    useAtom(percentageLessons);
  const [smallestLessonTitle, setSmallestLessonTitle] = useAtom(
    smallestLessonTitleAtom
  );
  const [smallestLessonHref, setSmallestLessonHref] = useAtom(
    smallestLessonHrefAtom
  );
  const [smallestLessonType, setSmallestLessonType] = useAtom(
    smallestLessonTypeAtom
  );
  const [smallestLessonId, setSmallestLessonId] = useAtom(smallestLessonIdAtom);
  const [moduleAndChapter, setModuleAndChapter] = useAtom(moduleAndChapterAtom);
  const [totalModules, setTotalModules] = useAtom(totalModulesAtom);
  const [totalChapters, setTotalChapters] = useAtom(totalChaptersAtom);
  const [moduleStructure, setModuleStructure] = useAtom(moduleStructureAtom);

  const [forgotPassword, setForgotPasswordModal] = useAtom(forgotPasswordModal);
  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);

  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [user, setUser] = useAtom(userAtom);
  const [userTokenm, setUserToken] = useAtom(userTokenAtom);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [accountTier, setAccountTier] = useAtom(accountTierAtom);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passWordBlur, setPassWordBlur] = useState(false);

  const login = trpc.loginUser.useMutation();

  const handleInputChange = (value: string) => {
    const inputValue = value;

    setEmail(inputValue);

    // Validate the email format
    if (inputValue !== "") {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    const inputValue = value;
    setPassword(inputValue);

    // Validate the password
    if (inputValue !== "") {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login.mutateAsync({
        email: email,
        password: password,
      });

      if (res.user) {
        setUser(res.user as any);
        setUserToken(res.user.sessionToken ?? null);
        setIsUserSignedIn(true);
        // fetchUserLessons.refetch();
      }

      if (res.payment) {
        setPayment(res.payment as any);
        setAccountTier(res.payment.accountTier);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClickBeforeValid = () => {
    // turn all forms blur on to show error messages
    setEmailBlur(true);
    setPassWordBlur(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValidSubmit) {
      handleLogin();
    } else {
      handleClickBeforeValid();
    }
  };

  const isValidSubmit = isValidEmail && isValidPassword;

  return (
    <>
      <motion.div
        initial={{ x: "0", opacity: 0 }}
        animate={{ x: "0", opacity: 1 }}
        onClick={() => setShowLogin(false)}
        className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur md:ml-[240px]"
      >
        <motion.div
          initial={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative m-auto flex h-max max-h-[620px] w-[300px]  cursor-default flex-col items-center rounded-[20px] bg-white p-8 px-10 text-[#0C071D] shadow-xl   md:w-[600px]"
        >
          <div className="flex flex-col items-center">
            <h3 className="mb-2  text-left text-lg font-bold md:text-xl">
              Login
            </h3>
            {login.error && (
              <p className="text-center text-xs text-accent-orange">
                {login.error.message}
              </p>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex w-full flex-col gap-4"
            autoComplete="off"
          >
            <div className="mt-3 flex w-full flex-col md:mt-0">
              <p className="font-extralight">Email</p>
              {
                // If the email is not valid, show the error message
                !isValidEmail && emailBlur && (
                  <p className="mt-1 text-[12px] text-[#F79327]">
                    Please enter a valid email address
                  </p>
                )
              }
              <input
                type="text"
                placeholder="Email"
                className="border-gray mt-2 rounded-full border p-4"
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                onBlur={() => setEmailBlur(true)}
              />
              <div className="mt-4 h-[1px] w-full bg-dark-orange" />
            </div>
            <div className="flex w-full flex-col ">
              <p className="font-extralight">Password</p>
              {
                // If the email is not valid, show the error message
                !isValidPassword && passWordBlur && (
                  <p className="mt-1 text-[12px] text-[#F79327]">
                    Please enter a valid password
                  </p>
                )
              }
              <input
                type="password"
                placeholder="Password"
                className="border-gray mt-2 rounded-full border p-4"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={() => setPassWordBlur(true)}
              />
            </div>
            <p
              onClick={() => {
                setForgotPasswordModal(true);
                setShowLogin(false);
              }}
              className="cursor-pointer self-center text-dark-orange underline"
            >
              Forgot Password?{" "}
            </p>

            <button
              type="submit"
              className={classNames(
                "mt-6 flex w-full  flex-col items-center justify-center rounded-lg transition-all ",
                isValidSubmit
                  ? "cursor-pointer bg-dark-orange shadow-md hover:shadow-lg"
                  : "bg-accent-orange"
              )}
            >
              <h3 className="  py-4 text-left text-xl  text-white ">
                Let's Get Started
              </h3>
            </button>
          </form>
          <button
            onClick={() => {
              setShowLogin(false);
              setShowBuyingOptions(true);
            }}
            className="mt-5 cursor-pointer self-center text-dark-orange underline"
          >
            Create Account{" "}
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default LoginModal;
