import { classNames } from "@/utils";
import { trpc } from "@/utils/trpc";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { atom } from "jotai";
import { useEffect, useState } from "react";
import {
  userAtom,
  userTokenAtom,
  userSignedIn,
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
  showLoginModalAtom,
  showSignupModalAtom,
} from "./atom";

const SignupModal = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);
  const [showSignup, setShowSignup] = useAtom(showSignupModalAtom);
  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [user, setUser] = useAtom(userAtom);
  const [userTokenm, setUserToken] = useAtom(userTokenAtom);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [confirmPasswordBlur, setConfirmPasswordBlur] = useState(false);

  const signup = trpc.createUser.useMutation();

  const handleEmailChange = (value: string) => {
    const inputValue = value;
    setEmail(inputValue);

    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputValue !== "" && emailRegex.test(inputValue)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    const inputValue = value;
    setPassword(inputValue);

    // Validate the password (at least 8 characters)
    if (inputValue !== "" && inputValue.length >= 8) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }

    // Check if confirm password is valid when password changes
    if (confirmPassword === inputValue && inputValue.length >= 8) {
      setIsValidConfirmPassword(true);
    } else {
      setIsValidConfirmPassword(false);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    const inputValue = value;
    setConfirmPassword(inputValue);

    // Validate that confirm password matches password
    if (inputValue !== "" && inputValue === password && password.length >= 8) {
      setIsValidConfirmPassword(true);
    } else {
      setIsValidConfirmPassword(false);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await signup.mutateAsync({
        email: email,
        password: password,
      });

      if (res) {
        setUser(res as any);
        setUserToken(res.sessionToken ?? null);
        setIsUserSignedIn(true);
        setShowSignup(false);
        setShowLogin(true);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClickBeforeValid = () => {
    // turn all forms blur on to show error messages
    setEmailBlur(true);
    setPasswordBlur(true);
    setConfirmPasswordBlur(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValidSubmit) {
      handleSignup();
    } else {
      handleClickBeforeValid();
    }
  };

  const isValidSubmit =
    isValidEmail && isValidPassword && isValidConfirmPassword;

  return (
    <>
      <motion.div
        initial={{ x: "0", opacity: 0 }}
        animate={{ x: "0", opacity: 1 }}
        onClick={() => setShowSignup(false)}
        className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur md:ml-[240px]"
      >
        <motion.div
          initial={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative m-auto flex h-max max-h-[720px] w-[300px] cursor-default flex-col items-center rounded-[20px] bg-white p-8 px-10 text-[#0C071D] shadow-xl md:w-[600px]"
        >
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-left text-lg font-bold md:text-xl">
              Create Account
            </h3>
            {signup.error && (
              <p className="text-center text-xs text-accent-orange">
                {signup.error.message}
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
                type="email"
                placeholder="Email"
                className="border-gray mt-2 rounded-full border p-4"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={() => setEmailBlur(true)}
              />
              <div className="mt-4 h-[1px] w-full bg-dark-orange" />
            </div>

            <div className="flex w-full flex-col">
              <p className="font-extralight">Password</p>
              {
                // If the password is not valid, show the error message
                !isValidPassword && passwordBlur && (
                  <p className="mt-1 text-[12px] text-[#F79327]">
                    Password must be at least 8 characters
                  </p>
                )
              }
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                className="border-gray mt-2 rounded-full border p-4"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={() => setPasswordBlur(true)}
              />
              <div className="mt-4 h-[1px] w-full bg-dark-orange" />
            </div>

            <div className="flex w-full flex-col">
              <p className="font-extralight">Confirm Password</p>
              {
                // If the confirm password is not valid, show the error message
                !isValidConfirmPassword && confirmPasswordBlur && (
                  <p className="mt-1 text-[12px] text-[#F79327]">
                    Passwords do not match
                  </p>
                )
              }
              <input
                type="password"
                placeholder="Confirm Password"
                className="border-gray mt-2 rounded-full border p-4"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                onBlur={() => setConfirmPasswordBlur(true)}
              />
            </div>

            <button
              type="submit"
              className={classNames(
                "mt-6 flex w-full flex-col items-center justify-center rounded-lg transition-all",
                isValidSubmit
                  ? "cursor-pointer bg-dark-orange shadow-md hover:shadow-lg"
                  : "bg-accent-orange"
              )}
            >
              <h3 className="py-4 text-left text-xl text-white">
                Create Account
              </h3>
            </button>
          </form>
          <button
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
            className="mt-5 cursor-pointer self-center text-dark-orange underline"
          >
            Already have an account? Login
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SignupModal;
