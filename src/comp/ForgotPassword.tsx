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
} from "./atom";
import { emailRegex } from "./Profile/CreateLogin";

const ForgotPassword = () => {
  const [forgotPassword, setForgotPasswordModal] = useAtom(forgotPasswordModal);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);

  const forgotPasswordMutation = trpc.forgotPassword.useMutation();

  const handleInputChange = (value: string) => {
    const inputValue = value;

    setEmail(inputValue);

    // Validate the email format
    if (emailRegex.test(inputValue) || inputValue === "") {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const sendResetLink = async () => {
    try {
      const res = await forgotPasswordMutation.mutateAsync({
        email: email,
      });

      forgotPasswordMutation.reset();
      handleInputChange("");
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClickBeforeValid = () => {
    // turn all forms blur on to show error messages
    setEmailBlur(true);
  };

  const isValidSubmit = isValidEmail;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValidSubmit) {
      sendResetLink();
    } else {
      handleClickBeforeValid();
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0", opacity: 1 }}
        onClick={() => setForgotPasswordModal(false)}
        className="fixed bottom-0 right-0 top-0 z-50 ml-[250px] mt-24 grid w-[100%] place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur md:w-[77%] lg:w-[81%] xl:w-[84.5%] 2xl:w-[85.5%]"
      >
        <motion.div
          initial={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className=" relative flex h-max max-h-[620px] cursor-default flex-col items-center rounded-[20px]  bg-white p-8 px-10  text-[#0C071D] shadow-xl md:w-[95%]  lg:w-[80%] xl:w-[65%] 2xl:w-[570px]"
        >
          <div className="flex flex-col items-center">
            <h3 className="mb-2  text-left text-lg font-bold md:text-xl">
              Forgot Password?
            </h3>
            {forgotPasswordMutation.error && (
              <p className="text-center text-xs text-accent-orange">
                {forgotPasswordMutation.error.message}
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
            {!forgotPasswordMutation.isSuccess &&
              !forgotPasswordMutation.isLoading && (
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
                    Send Reset Link
                  </h3>
                </button>
              )}
            {forgotPasswordMutation.isSuccess && (
              <h3 className="  py-4 text-center text-xl  text-dark-orange ">
                Email Sent!
              </h3>
            )}
            {forgotPasswordMutation.isLoading && (
              <h3 className="  py-4 text-center text-xl  text-dark-orange ">
                Loading
              </h3>
            )}
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};
export default ForgotPassword;
