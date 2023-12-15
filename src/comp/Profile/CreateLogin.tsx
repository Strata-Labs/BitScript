import { classNames } from "@/utils";
import { trpc } from "@/utils/trpc";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { use, useEffect, useState } from "react";
import {
  userAtom,
  paymentAtom,
  createLoginModal,
  userTokenAtom,
} from "../atom";

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const hasUppercase = /[A-Z]/;

const CreateLogin = () => {
  const [payment, setPayment] = useAtom(paymentAtom);
  const [user, setUser] = useAtom(userAtom);
  const [userToken, setUserToken] = useAtom(userTokenAtom);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passWordBlur, setPassWordBlur] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  const [isValidConfirmPass, setIsValidConfirmPass] = useState(false);
  const [isValidConfirmPassBlur, setIsValidConfirmPassBlur] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const createAccount = trpc.createAccountLogin.useMutation();

  console.log("user", user);

  useEffect(() => {
    if (user) {
      handleInputChange(user.email);
    }
  }, [user]);
  const [isCreateLoginModalOpen, setIsCreateLoginModalOpen] =
    useAtom(createLoginModal);

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

  const hanldeConfirmPassword = (value: string) => {
    const inputValue = value;
    setConfirmPass(inputValue);

    // Validate the password
    if (passWordBlur && inputValue === password) {
      setIsValidConfirmPass(true);
    } else {
      setIsValidConfirmPass(false);
    }
  };

  const isValidSubmit = isValidConfirmPass && isValidEmail && isValidPassword;
  // console.log("isValidSubmit", isValidSubmit);

  const handleCreateAccount = async () => {
    try {
      if (payment) {
        const createAccountRes = await createAccount.mutateAsync({
          email,
          password,
          paymentId: payment.id,
        });

        if (createAccountRes) {
          setUser(createAccountRes.user as any);
          setPayment(createAccountRes.payment as any);
          setUserToken(createAccountRes.user.sessionToken ?? null);
          setIsCreateLoginModalOpen(false);
        }
      } else {
        console.log("payment not found");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClickBeforeValid = () => {
    // turn all forms blur on to show error messages
    setEmailBlur(true);
    setPassWordBlur(true);
    setIsValidConfirmPassBlur(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCreateLoginModalOpen && (
          <motion.div
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            onClick={() => setIsCreateLoginModalOpen(false)}
            className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0, rotate: "0deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="relative m-auto flex h-max max-h-[620px] w-[300px] cursor-default flex-col items-center rounded-[20px]  bg-white p-8 px-10  text-[#0C071D] shadow-xl md:w-[600px]"
            >
              <div className="flex flex-col items-center">
                <h3 className="mb-2  text-left text-lg font-bold md:text-xl">
                  Create Your Account
                </h3>
                {createAccount.error && (
                  <p className="text-center text-xs text-accent-orange">
                    {createAccount.error.message}
                  </p>
                )}
                <p className="text-center">
                  Complete the form below to create your account. You will be
                  all set
                </p>
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
                    defaultValue={user?.email ?? ""}
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
                    onChange={(e) => hanldeConfirmPassword(e.target.value)}
                    onBlur={() => setIsValidConfirmPassBlur(true)}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  if (isValidSubmit) {
                    handleCreateAccount();
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateLogin;
