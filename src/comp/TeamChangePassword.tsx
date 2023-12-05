import { use, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { teamChangePasswordModal, coreUserAton } from "./atom";
import { useAtom } from "jotai";
import { trpc } from "@/utils/trpc";
import { classNames } from "@/utils";
import { useRouter } from "next/router";

const TeamChangePassword = () => {
  const [showTeamPasswordUpdate, setShowTeamPasswordUpdate] = useAtom(
    teamChangePasswordModal
  );

  const [user, setUser] = useAtom(coreUserAton);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passWordBlur, setPassWordBlur] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  const [isValidConfirmPass, setIsValidConfirmPass] = useState(false);
  const [isValidConfirmPassBlur, setIsValidConfirmPassBlur] = useState(false);
  const router = useRouter();

  const changePwMutation = trpc.updateUserPassword.useMutation();

  const handlePasswordChange = (value: string) => {
    const inputValue = value;
    setPassword(inputValue);

    // Validate the password
    if (inputValue.length >= 6) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handleConfirmPassword = (value: string) => {
    const inputValue = value;
    setConfirmPass(inputValue);

    // Validate the password
    if (passWordBlur && inputValue === password) {
      setIsValidConfirmPass(true);
    } else {
      setIsValidConfirmPass(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await changePwMutation.mutateAsync({
        password: password,
      });

      if (res) {
        router.replace("/", undefined, { shallow: true });
        setUser(res as any);
        setShowTeamPasswordUpdate(false);
        handlePasswordChange("");
        handleConfirmPassword("");
        // remove all query params from url after password reset

        changePwMutation.reset();
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValidSubmit) {
      handleResetPassword();
    } else {
      handleClickBeforeValid();
    }
  };

  const handleClickBeforeValid = () => {
    // turn all forms blur on to show error messages

    setPassWordBlur(true);
    setIsValidConfirmPassBlur(true);
  };

  const isValidSubmit = isValidConfirmPass && isValidPassword;
  // console.log("isValidSubmit", isValidSubmit);

  return (
    <AnimatePresence>
      {showTeamPasswordUpdate && (
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: "0", opacity: 1 }}
          className="fixed bottom-0 right-0 top-0 z-50 grid h-full w-[100%] place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur "
        >
          <motion.div
            initial={{ scale: 0, rotate: "0deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className=" relative flex h-max max-h-[620px] cursor-default flex-col items-center rounded-[20px]  bg-white p-8 px-10  text-[#0C071D] shadow-xl md:w-[95%]  lg:w-[80%] xl:w-[65%] 2xl:w-[570px]"
          >
            <div className="flex flex-col items-center">
              <h3 className="mb-2 mt-3 text-[18px] font-bold md:text-[28px]">
                Welcome To BitScript
              </h3>
              <p className="mb-6 flex items-center justify-center rounded-xl text-center text-[16px] text-black">
                Lets get started by setting a password for your account
              </p>
              {changePwMutation.error && (
                <p className="text-center text-xs text-accent-orange">
                  {changePwMutation.error.message}
                </p>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex w-full flex-col gap-4"
            >
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
                <p className="mt-2 pl-2 text-xs font-extralight text-black">
                  Password must be at least 6 characters long
                </p>
              </div>
              <div className="flex w-full flex-col ">
                <p className="font-extralight">Confirm Password</p>
                {
                  // If the email is not valid, show the error message
                  !isValidConfirmPass && isValidConfirmPassBlur && (
                    <p className="mt-1 text-[12px] text-[#F79327]">
                      Please enter a valid password
                    </p>
                  )
                }
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border-gray mt-2 rounded-full border p-4"
                  value={confirmPass}
                  onChange={(e) => handleConfirmPassword(e.target.value)}
                  onBlur={() => setIsValidConfirmPassBlur(true)}
                />
              </div>

              {!changePwMutation.isSuccess && !changePwMutation.isLoading && (
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
                    Update Password
                  </h3>
                </button>
              )}

              {changePwMutation.isSuccess && (
                <h3 className="  py-4 text-center text-xl  text-dark-orange ">
                  Password Updated!
                </h3>
              )}
              {changePwMutation.isLoading && (
                <h3 className="  py-4 text-center text-xl  text-dark-orange ">
                  Loading
                </h3>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamChangePassword;
