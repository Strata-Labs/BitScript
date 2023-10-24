import { classNames } from "@/utils";
import { trpc } from "@/utils/trpc";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { use, useEffect, useState } from "react";
import { userAtom, showLoginModalAtom } from "./atom";

const LoginModal = () => {
  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [user, setUser] = useAtom(userAtom);

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

      setUser(res);
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClickBeforeValid = () => {
    // turn all forms blur on to show error messages
    setEmailBlur(true);
    setPassWordBlur(true);
  };

  const isValidSubmit = isValidEmail && isValidPassword;

  return (
    <>
      <AnimatePresence>
        {showLogin && user === null && (
          <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            onClick={() => setShowLogin(false)}
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
                  Login
                </h3>
                {login.error && (
                  <p className="text-center text-xs text-accent-orange">
                    {login.error.message}
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
                <div
                  onClick={() => {
                    if (isValidSubmit) {
                      handleLogin();
                    } else {
                      handleClickBeforeValid();
                    }
                  }}
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginModal;
