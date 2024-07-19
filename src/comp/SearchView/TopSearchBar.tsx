import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  accountTierAtom,
  activeSearchView,
  activeTaprootComponent,
  createLoginModal,
  internalPublicKey,
  isSearchOpen,
  paymentAtom,
  percentageLessons,
  queriesRemainingAtom,
  queryTrackerAtom,
  sandBoxPopUpOpen,
  searchQuery,
  showLoginModalAtom,
  TaprootNodes,
  taprootOutputKey,
  userAtom,
  userLessons,
  userSignedIn,
  userTokenAtom,
} from "../atom";
import Link from "next/link";
import { useRouter } from "next/router";
import { TaprootGenComponents } from "../TaprootGen/TaprootParent";
import { set } from "zod";

const TopSearchBar = () => {
  const [showSearchView, setShowSearchView] = useAtom(activeSearchView);
  const [theSearchQuery, setTheSearchQuery] = useAtom(searchQuery);
  const [isTheSearchOpen, setTheSearchOpen] = useAtom(isSearchOpen);
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);
  const [queriesRemaining, setQueriesRemaining] = useAtom(queriesRemainingAtom);
  const [accountTier, setAccountTier] = useAtom(accountTierAtom);

  const queryTracker = useAtomValue(queryTrackerAtom);

  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);
  const [userToken, setUserToken] = useAtom(userTokenAtom);
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [completionPercentage, setCompletionPercentage] =
    useAtom(percentageLessons);

  const [user, setUser] = useAtom(userAtom);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [taprootComponent, setTaprootComponent] = useAtom(
    activeTaprootComponent
  );

  const [globalTaprootOutputKey, setGlobalTaprootOutputKey] =
    useAtom(taprootOutputKey);
  const [globalInternalPublicKey, setGlobalInternalPublicKey] =
    useAtom(internalPublicKey);
  const [globalTaprootNodes, setGlobalTaprootNodes] = useAtom(TaprootNodes);

  const [showCreateLoginButton, setShowCreateLoginButton] = useState(false);

  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [showFailedPayment, setShowFailedPayment] = useState(false);

  const [isCreateLoginModalOpen, setIsCreateLoginModalOpen] =
    useAtom(createLoginModal);

  const handleInputChange = (value: string) => {
    setTheSearchOpen(value.length > 0);
    setTheSearchQuery(value);
    setShowSearchView(value.length > 0);
  };

  const handleButtonClick = () => {
    console.log("user:", user);
    if (user === null) {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    if (user === null) {
      checkIfUserCreated();
    }
    if (payment) {
      checkIfPaymentPending();
    }
  }, [payment]);

  const checkIfUserCreated = async () => {
    // if the currnet payment is proccessing or paid and does not have a user id show the button
    if (payment) {
      console.log("payment", payment);
      const paymentStatus = payment.status;

      if (paymentStatus === "PAID" || paymentStatus === "PROCESSING") {
        if (payment.userId === null) {
          setShowCreateLoginButton(true);
        }
      }
    }
  };
  const checkIfPaymentPending = () => {
    if (payment) {
      if (
        payment.status === "PROCESSING" ||
        payment.paymentProcessor === "OPEN_NODE"
      ) {
        // ensure that the payment is less than 4 hours old
        const paymentDate = new Date(payment.createdAt);
        const now = new Date();
        const diff = now.getTime() - paymentDate.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        console.log("hours", hours);
        if (hours < 1) {
          setShowPaymentProcessing(true);
        } else {
          //setShowFailedPayment(true);
        }
      }
    }
  };
  const clearDataFromStorage = () => {
    setGlobalTaprootOutputKey("");
    setGlobalInternalPublicKey("");
    setGlobalTaprootNodes([]);
  };

  console.log("this is the taprootComponent: ", taprootComponent);
  console.log("this is the enum: ", TaprootGenComponents.NewTemplateView);
  const router = useRouter();
  return (
    <div className="z-40 -mt-[100px] ml-[230px] hidden  items-center justify-between bg-white p-7 md:flex">
      <div className="mr-10 flex w-screen items-center justify-between">
        {router.pathname.startsWith("/taprootGen/new") &&
        taprootComponent === TaprootGenComponents.NewTemplateView ? (
          <button
            onClick={() => {
              // clears the component
              // TODO: ideally this should clear the nodes and also clear the local storage
              clearDataFromStorage();
              router.push("/taprootGen");
              // setTaprootComponent(TaprootGenComponents.NewTemplateView);
            }}
            className="flex flex-row items-center text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.70711 10.7071C7.31658 10.3166 7.31658 9.68342 7.70711 9.29289L14.364 2.63604C14.7545 2.24552 15.3877 2.24552 15.7782 2.63604C16.1687 3.02657 16.1687 3.6598 15.7782 4.05033L9.82843 10L15.7782 15.9497C16.1687 16.3402 16.1687 16.9734 15.7782 17.3639C15.3877 17.7545 14.7545 17.7545 14.364 17.3639L7.70711 10.7071ZM8 10.5L14 10.5L14 9.5L8 9.5L8 10.5Z"
                fill="#6C5E70"
              />
            </svg>
            <p>Taproot Template(New)</p>
          </button>
        ) : //00 this condition display the cancel button when in a new taproot template component
        router.pathname.startsWith("/taprootGen/new") &&
          taprootComponent === TaprootGenComponents.NewScriptPathView ? (
          <button
            onClick={() => {
              // clears the component
              setTaprootComponent(TaprootGenComponents.NewTemplateView);
            }}
            className="flex flex-row items-center text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.70711 10.7071C7.31658 10.3166 7.31658 9.68342 7.70711 9.29289L14.364 2.63604C14.7545 2.24552 15.3877 2.24552 15.7782 2.63604C16.1687 3.02657 16.1687 3.6598 15.7782 4.05033L9.82843 10L15.7782 15.9497C16.1687 16.3402 16.1687 16.9734 15.7782 17.3639C15.3877 17.7545 14.7545 17.7545 14.364 17.3639L7.70711 10.7071ZM8 10.5L14 10.5L14 9.5L8 9.5L8 10.5Z"
                fill="#6C5E70"
              />
            </svg>
            <p>Taproot Template(New)</p>
          </button>
        ) : router.pathname.startsWith("/taprootGen/new") &&
          Object.values(TaprootGenComponents).includes(taprootComponent!) ? (
          <button
            onClick={() => {
              // clears the component
              setTaprootComponent(TaprootGenComponents.TapLeafSelectionPage);
            }}
            className="flex flex-row items-center text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.70711 10.7071C7.31658 10.3166 7.31658 9.68342 7.70711 9.29289L14.364 2.63604C14.7545 2.24552 15.3877 2.24552 15.7782 2.63604C16.1687 3.02657 16.1687 3.6598 15.7782 4.05033L9.82843 10L15.7782 15.9497C16.1687 16.3402 16.1687 16.9734 15.7782 17.3639C15.3877 17.7545 14.7545 17.7545 14.364 17.3639L7.70711 10.7071ZM8 10.5L14 10.5L14 9.5L8 9.5L8 10.5Z"
                fill="#6C5E70"
              />
            </svg>
            <p>Cancel | Change Tapleaf</p>
          </button>
        ) : // this shows the back button when in the newTemplateView component
        router.pathname.startsWith("/taprootGen/new") ? (
          <button
            onClick={() => {
              router.push("/taprootGen");
            }}
            className="flex flex-row items-center text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.70711 10.7071C7.31658 10.3166 7.31658 9.68342 7.70711 9.29289L14.364 2.63604C14.7545 2.24552 15.3877 2.24552 15.7782 2.63604C16.1687 3.02657 16.1687 3.6598 15.7782 4.05033L9.82843 10L15.7782 15.9497C16.1687 16.3402 16.1687 16.9734 15.7782 17.3639C15.3877 17.7545 14.7545 17.7545 14.364 17.3639L7.70711 10.7071ZM8 10.5L14 10.5L14 9.5L8 9.5L8 10.5Z"
                fill="#6C5E70"
              />
            </svg>
            <p>Taproot Template (new)</p>
          </button>
        ) : router.pathname.startsWith("/taprootGen") ? (
          <p className="text-3xl font-bold text-black">Taproot</p>
        ) : (
          <div className="relative w-[200px] lg:w-[540px] ">
            <input
              type="text"
              className="z-40 w-[180px] rounded-full border border-[#F0F0F0] bg-[#F0F0F0] bg-opacity-50 p-2 text-black focus:outline-none lg:w-[280px]"
              value={theSearchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            {!theSearchQuery && (
              <div className="pointer-events-none absolute left-3 top-3 z-10 flex  flex-row items-center text-[10px] lg:top-2 lg:text-[16px]">
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.53 19.97L16.689 16.129C17.973 14.606 18.75 12.643 18.75 10.5C18.75 5.675 14.825 1.75 10 1.75C5.175 1.75 1.25 5.675 1.25 10.5C1.25 15.325 5.175 19.25 10 19.25C12.143 19.25 14.106 18.473 15.629 17.189L19.47 21.03C19.616 21.176 19.808 21.25 20 21.25C20.192 21.25 20.384 21.177 20.53 21.03C20.823 20.738 20.823 20.263 20.53 19.97ZM2.75 10.5C2.75 6.502 6.002 3.25 10 3.25C13.998 3.25 17.25 6.502 17.25 10.5C17.25 14.498 13.998 17.75 10 17.75C6.002 17.75 2.75 14.498 2.75 10.5Z"
                    fill="#9CA3AF"
                    stroke="#9CA3AF"
                  />
                </svg>

                <span className="ml-1 text-gray-400">
                  Type in a script or op_code
                </span>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-row items-center text-[12px] text-[#6C5E70] lg:text-[16px]">
          {isUserSignedIn ? (
            <>
              {router.pathname.includes("/rpc") &&
                queryTracker &&
                queryTracker?.rpcQueryCount >= 0 &&
                payment?.accountTier === "BEGINNER_BOB" && (
                  <p className="mr-5">
                    <span className="font-bold">
                      {queryTracker?.rpcQueryCount || 3}
                    </span>{" "}
                    RPC queries remain*
                  </p>
                )}
              {router.pathname === "/transactions" && queriesRemaining >= 0 && (
                <p className="mr-5">
                  <span className="font-bold">{queriesRemaining} </span>
                  queries remain*
                </p>
              )}
              {router.pathname === "/sandbox" &&
                payment?.accountTier === "BEGINNER_BOB" &&
                payment?.hasAccess && (
                  <p className="mr-5">missing save/share*</p>
                )}

              <Link
                className="z-40 flex w-[150px] flex-row items-center justify-between rounded-full border bg-[#0C071D] p-3 px-8"
                href={"/profile"}
              >
                {" "}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 1.6665C8.38373 1.66957 6.80324 2.1426 5.45102 3.02795C4.09881 3.91331 3.03325 5.17279 2.38412 6.65298C1.73499 8.13317 1.53031 9.77019 1.79502 11.3646C2.05973 12.9591 2.7824 14.4421 3.875 15.6332C4.65535 16.479 5.60245 17.1541 6.65661 17.6158C7.71078 18.0776 8.84915 18.3159 10 18.3159C11.1508 18.3159 12.2892 18.0776 13.3434 17.6158C14.3975 17.1541 15.3446 16.479 16.125 15.6332C17.2176 14.4421 17.9403 12.9591 18.205 11.3646C18.4697 9.77019 18.265 8.13317 17.6159 6.65298C16.9668 5.17279 15.9012 3.91331 14.549 3.02795C13.1968 2.1426 11.6163 1.66957 10 1.6665ZM10 16.6665C8.27372 16.6639 6.61576 15.9917 5.375 14.7915C5.7517 13.8745 6.39253 13.0901 7.21604 12.5381C8.03956 11.9861 9.00859 11.6913 10 11.6913C10.9914 11.6913 11.9604 11.9861 12.784 12.5381C13.6075 13.0901 14.2483 13.8745 14.625 14.7915C13.3842 15.9917 11.7263 16.6639 10 16.6665ZM8.33333 8.33317C8.33333 8.00354 8.43108 7.6813 8.61422 7.40722C8.79735 7.13314 9.05765 6.91952 9.36219 6.79337C9.66674 6.66723 10.0018 6.63422 10.3252 6.69853C10.6485 6.76284 10.9454 6.92157 11.1785 7.15466C11.4116 7.38775 11.5703 7.68472 11.6346 8.00802C11.699 8.33132 11.6659 8.66643 11.5398 8.97098C11.4137 9.27552 11.2 9.53582 10.926 9.71895C10.6519 9.90209 10.3296 9.99984 10 9.99984C9.55797 9.99984 9.13405 9.82424 8.82149 9.51168C8.50893 9.19912 8.33333 8.7752 8.33333 8.33317ZM15.7583 13.3332C15.0138 12.0596 13.8678 11.069 12.5 10.5165C12.9243 10.0354 13.2008 9.44205 13.2962 8.8077C13.3917 8.17335 13.3021 7.52493 13.0381 6.94025C12.7742 6.35557 12.3472 5.85947 11.8083 5.51148C11.2694 5.16348 10.6415 4.97838 10 4.97838C9.35851 4.97838 8.73064 5.16348 8.19174 5.51148C7.65285 5.85947 7.22581 6.35557 6.96187 6.94025C6.69794 7.52493 6.60832 8.17335 6.70377 8.8077C6.79923 9.44205 7.07569 10.0354 7.5 10.5165C6.13217 11.069 4.98622 12.0596 4.24167 13.3332C3.64829 12.3224 3.33477 11.1719 3.33333 9.99984C3.33333 8.23173 4.03571 6.53604 5.28596 5.28579C6.5362 4.03555 8.23189 3.33317 10 3.33317C11.7681 3.33317 13.4638 4.03555 14.714 5.28579C15.9643 6.53604 16.6667 8.23173 16.6667 9.99984C16.6652 11.1719 16.3517 12.3224 15.7583 13.3332Z"
                    fill="white"
                  />
                </svg>
                <p className="gradient-text">Profile</p>
              </Link>
            </>
          ) : (
            <div className="flex flex-row items-center">
              {router.pathname.includes("/rpc") && (
                <p className="mr-5">
                  <span className="font-bold">
                    {queryTracker?.rpcQueryCount || 0}
                  </span>{" "}
                  RPC queries remain*
                </p>
              )}
              {router.pathname === "/transactions" && (
                <p className="mr-5">
                  <span className="font-bold">{queriesRemaining}</span> demo
                  queries remain*
                </p>
              )}
              {router.pathname === "/sandbox" && (
                <p className="mr-5">missing import & save/share*</p>
              )}
              {router.pathname === "/lessons" && (
                <p className="mr-5">
                  <span className="font-bold">4</span> articles locked*
                </p>
              )}

              {showFailedPayment && (
                <button className="group z-40 mx-2 flex cursor-none flex-row items-center rounded-full border p-3 text-[#6C5E70] hover:bg-[#0C071D] hover:text-white">
                  <div className="mr-2 h-4 w-4 rounded-full bg-red-500" />
                  <p>Payment Failed</p>
                </button>
              )}
              {showCreateLoginButton ? (
                <button
                  onClick={() => {
                    setIsCreateLoginModalOpen(true);
                  }}
                  className="z-40 flex flex-row items-center"
                >
                  <p className="text-[16px] text-[#F79327]">
                    Create Your Account
                  </p>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (user === null) {
                      setShowLogin(true);
                      setIsSandBoxPopUpOpen(false);
                    } else {
                      setPayment(null);
                      setUser(null);
                    }
                  }}
                  className="group z-40 flex flex-row items-center rounded-full border p-3 text-[#6C5E70] hover:bg-[#0C071D] hover:text-white"
                >
                  {" "}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-[4px] fill-[#6C5E70] group-hover:fill-white"
                  >
                    <path d="M10 1.6665C8.38373 1.66957 6.80324 2.1426 5.45102 3.02795C4.09881 3.91331 3.03325 5.17279 2.38412 6.65298C1.73499 8.13317 1.53031 9.77019 1.79502 11.3646C2.05973 12.9591 2.7824 14.4421 3.875 15.6332C4.65535 16.479 5.60245 17.1541 6.65661 17.6158C7.71078 18.0776 8.84915 18.3159 10 18.3159C11.1508 18.3159 12.2892 18.0776 13.3434 17.6158C14.3975 17.1541 15.3446 16.479 16.125 15.6332C17.2176 14.4421 17.9403 12.9591 18.205 11.3646C18.4697 9.77019 18.265 8.13317 17.6159 6.65298C16.9668 5.17279 15.9012 3.91331 14.549 3.02795C13.1968 2.1426 11.6163 1.66957 10 1.6665ZM10 16.6665C8.27372 16.6639 6.61576 15.9917 5.375 14.7915C5.7517 13.8745 6.39253 13.0901 7.21604 12.5381C8.03956 11.9861 9.00859 11.6913 10 11.6913C10.9914 11.6913 11.9604 11.9861 12.784 12.5381C13.6075 13.0901 14.2483 13.8745 14.625 14.7915C13.3842 15.9917 11.7263 16.6639 10 16.6665ZM8.33333 8.33317C8.33333 8.00354 8.43108 7.6813 8.61422 7.40722C8.79735 7.13314 9.05765 6.91952 9.36219 6.79337C9.66674 6.66723 10.0018 6.63422 10.3252 6.69853C10.6485 6.76284 10.9454 6.92157 11.1785 7.15466C11.4116 7.38775 11.5703 7.68472 11.6346 8.00802C11.699 8.33132 11.6659 8.66643 11.5398 8.97098C11.4137 9.27552 11.2 9.53582 10.926 9.71895C10.6519 9.90209 10.3296 9.99984 10 9.99984C9.55797 9.99984 9.13405 9.82424 8.82149 9.51168C8.50893 9.19912 8.33333 8.7752 8.33333 8.33317ZM15.7583 13.3332C15.0138 12.0596 13.8678 11.069 12.5 10.5165C12.9243 10.0354 13.2008 9.44205 13.2962 8.8077C13.3917 8.17335 13.3021 7.52493 13.0381 6.94025C12.7742 6.35557 12.3472 5.85947 11.8083 5.51148C11.2694 5.16348 10.6415 4.97838 10 4.97838C9.35851 4.97838 8.73064 5.16348 8.19174 5.51148C7.65285 5.85947 7.22581 6.35557 6.96187 6.94025C6.69794 7.52493 6.60832 8.17335 6.70377 8.8077C6.79923 9.44205 7.07569 10.0354 7.5 10.5165C6.13217 11.069 4.98622 12.0596 4.24167 13.3332C3.64829 12.3224 3.33477 11.1719 3.33333 9.99984C3.33333 8.23173 4.03571 6.53604 5.28596 5.28579C6.5362 4.03555 8.23189 3.33317 10 3.33317C11.7681 3.33317 13.4638 4.03555 14.714 5.28579C15.9643 6.53604 16.6667 8.23173 16.6667 9.99984C16.6652 11.1719 16.3517 12.3224 15.7583 13.3332Z" />
                  </svg>
                  <p>Login | Signup</p>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSearchBar;
