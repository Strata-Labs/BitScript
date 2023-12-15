import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";

import { trpc } from "@/utils/trpc";
import { useState } from "react";

import { classNames } from "@/utils";
import { UserTierType } from "./Profile/BuyingOptions";

type CollectPaymentEmail = {
  showCollectPaymentEmail: boolean;
  setShowCollectPaymentEmail: (value: boolean) => void;
  handleUserEnteredEmail: (value: string) => void;
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CollectPaymentEmail = ({
  showCollectPaymentEmail,
  setShowCollectPaymentEmail,
  handleUserEnteredEmail,
}: CollectPaymentEmail) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);

  const checkIfEmailExists = trpc.checkIfEmailAlreadyExists.useMutation();

  const handleInputChange = (value: string) => {
    const inputValue = value;

    setEmail(inputValue.trim());

    // Validate the email format
    if (emailRegex.test(inputValue) || inputValue === "") {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const userEnteredEmail = async () => {
    try {
      if (isValidEmail) {
        const res = await checkIfEmailExists.mutateAsync({ email });
        console.log("userEnteredEmail - res", res);
        if (res === false) {
          handleUserEnteredEmail(email);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <motion.div
      initial={{ x: "0", opacity: 0 }}
      animate={{ x: "0", opacity: 1 }}
      onClick={() => setShowCollectPaymentEmail(false)}
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
            Enter your email for payment updates & account updates:
          </h3>
          {checkIfEmailExists.error && (
            <p className="text-center text-xs text-accent-orange">
              {checkIfEmailExists.error.message}
            </p>
          )}
        </div>
        <div className="mt-5 flex w-full flex-col gap-4">
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
        </div>
        <div
          onClick={() => userEnteredEmail()}
          className={classNames(
            "mt-6 flex w-full  flex-col items-center justify-center rounded-lg transition-all ",
            isValidEmail
              ? "cursor-pointer bg-dark-orange shadow-md hover:shadow-lg"
              : " cursor-not-allowed bg-[#FCE2C5]"
          )}
        >
          <h3 className="  py-4 text-left text-xl  text-white ">Let's Go</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CollectPaymentEmail;
