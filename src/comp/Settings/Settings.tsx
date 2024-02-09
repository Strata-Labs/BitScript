import Link from "next/link";
import { useAtom } from "jotai";
import {
  accountTierAtom,
  eventAtom,
  paymentAtom,
  percentageLessons,
  resetEmail,
  resetPassword,
  tutorialBuyModal,
  userAtom,
  userHistoryAtom,
  userLessons,
  userSignedIn,
  userTokenAtom,
} from "../atom";
import { classNames } from "@/utils";
import { trpc } from "@/utils/trpc";

const Settings = () => {
  const [isResetPassword, setIsResetPassword] = useAtom(resetPassword);
  const [isResetEmail, setIsResetEmail] = useAtom(resetEmail);
  const [showBuyingOptions, setShowBuyingOptions] = useAtom(tutorialBuyModal);
  const [userHistory, setUserHistory] = useAtom(userHistoryAtom);

  const [user, setUser] = useAtom(userAtom);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);
  const [userToken, setUserToken] = useAtom(userTokenAtom);
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [completionPercentage, setCompletionPercentage] =
    useAtom(percentageLessons);
  const [accountTier, setAccountTier] = useAtom(accountTierAtom);

  const [setEventPrimer, setSetEventPrimer] = useAtom(eventAtom);

  const createStripeCustomerPortal =
    trpc.createStripeCustomerPortal.useMutation();

  if (user === null) {
    return (
      <div
        className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5"
        onClick={() => localStorage.clear()}
      >
        <p className="text-black">Clear State</p>
      </div>
    );
  }

  if (payment === null) {
    return (
      <div
        className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5"
        onClick={() => localStorage.clear()}
      >
        <p className="text-black">Clear State</p>
      </div>
    );
  }

  console.log("user", user);
  console.log("payment", payment);

  const renderAccountTier = () => {
    if (payment && payment.accountTier) {
      const tier = payment.accountTier;
      if (tier === "ADVANCED_ALICE") {
        setAccountTier(payment.accountTier);
        return "Advanced Alice";
      } else if (tier === "BEGINNER_BOB") {
        setAccountTier(payment.accountTier);
        return "Beginner Bob";
      } else {
        setAccountTier(payment.accountTier);
        return "N/A";
      }
    } else {
      setAccountTier(payment.accountTier);
      return "N/A";
    }
  };

  const handleCreateStripeCustomerPortal = async () => {
    try {
      const res = await createStripeCustomerPortal.mutateAsync();
      if (res) {
        window.location.href = res;
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const renderAccountStatusActionButton = () => {
    console.log("renderAccountStatusActionButton - payment", payment);
    if (payment) {
      if (payment.hasAccess) {
        if (payment.paymentProcessor === "STRIPE") {
          return (
            <>
              <p className="font-extralight">Manage subscription</p>
              <button
                onClick={() => handleCreateStripeCustomerPortal()}
                className="border-gray mt-2 h-[48px]  w-[300px] items-start rounded-full border pl-5 text-left font-extralight lg:w-[555px]"
              >
                Manage
              </button>
            </>
          );
        } else {
          <p className="font-extralight">
            Please Contact The BitScript Team to Cancel subscription
          </p>;
        }
      } else {
        return (
          <>
            <p className="font-extralight">Renew subscription</p>
            <button
              onClick={() => setShowBuyingOptions(true)}
              className="border-gray mt-2 h-[48px] w-[300px] items-start rounded-full border bg-accent-orange pl-5 text-left font-extralight text-white lg:w-[555px]"
            >
              Click to renew
            </button>
          </>
        );
      }
    } else {
      return null;
    }
  };

  const handleLogout = () => {
    setPayment(null);
    setUser(null);
    setUserToken(null);
    setIsUserSignedIn(false);
    setUserLessonsArray([]);
    setCompletionPercentage(0);
    setAccountTier("N/A");
    setUserHistory([]);

    setSetEventPrimer({
      loggedIn: false,
      user_id: null,
      team_id: null,
      accountTier: null,
      hasAccess: false,
    });
  };
  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5">
      <div className="flex flex-col text-[#6C5E70]">
        <div className="flex items-center">
          {/* Left pointing icon link */}
          <Link className="cursor-pointer" href={"/profile"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              rotate="180deg"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <g transform="rotate(180 12 12)">
                <path
                  d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                  fill="#F79327"
                />
              </g>
            </svg>
          </Link>
          <p className="ml-3 text-[28px] text-black">All Settings</p>
        </div>
        <p className="mt-10 font-extralight">
          Below you’ll find your profile & payment information. Click into any
          area to edit & save .
        </p>
        <div className="mt-5 flex flex-col rounded-xl bg-white p-5">
          <p className="text-black">Profile Settings</p>
          <div className="mt-10 flex flex-col justify-between md:flex-row">
            <div className="mr-5 flex w-full flex-col md:w-1/4">
              <p className="font-extralight">Email</p>
              <div className="border-gray mt-2 rounded-full border p-2 pl-3">
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className="flex">
            {/* <button
              className="mr-5 mt-5 font-extralight text-[#6C5E70] underline"
              onClick={() => {
                setIsResetEmail(true);
              }}
            >
              reset email
            </button> */}
            <button
              className="mt-5 font-extralight text-[#6C5E70] underline"
              onClick={() => {
                setIsResetPassword(true);
              }}
            >
              reset password
            </button>
          </div>
        </div>
        <div className="mt-5 flex flex-col rounded-xl bg-white p-5">
          <div className="flex flex-col justify-between md:flex-row">
            <p className="text-[#0C071D]">Payment Settings</p>
            <p className="mt-3 font-extralight text-[#0C071D] md:mt-0">
              account status{" "}
              <span
                className={classNames(
                  "font-semibold",
                  payment?.hasAccess ? "text-accent-orange" : "text-red-800"
                )}
              >
                {payment?.hasAccess ? "Active" : "Inactive"}
              </span>{" "}
              | subscription tier{" "}
              <span className="font-semibold">{renderAccountTier()}</span>|
              {"  "}| subscribed since{" "}
              <span className="font-semibold">
                {payment?.paymentDate
                  ? new Date(payment?.paymentDate).toLocaleDateString()
                  : "N/A"}
              </span>{" "}
              | subscribed until{" "}
              <span className="font-semibold">
                {payment?.validUntil
                  ? new Date(payment?.validUntil).toLocaleDateString()
                  : "N/A"}
              </span>{" "}
              {payment.paymentProcessor === "STRIPE" &&
              payment.paymentLength !== "LIFETIME" ? (
                <>
                  | next payment{" "}
                  <span className="font-semibold">
                    {" "}
                    {payment?.validUntil
                      ? new Date(payment?.validUntil).toLocaleDateString()
                      : "N/A"}
                  </span>
                </>
              ) : (
                ""
              )}
            </p>
          </div>

          <div className="mt-10 flex justify-between">
            <div className="mr-5 flex w-full flex-col">
              {renderAccountStatusActionButton()}
            </div>
          </div>
        </div>
        <div className="mr-5 mt-5 flex w-full flex-col">
          <p className="font-semibold">
            Logging somewhere else?{" "}
            <span className="font-extralight">(max of 2 IPs per account)</span>
          </p>
          <button
            className="border-gray mt-2 h-[48px] w-[300px] items-start rounded-full border bg-dark-purple pl-5 text-left font-extralight text-white lg:w-[555px]"
            onClick={() => handleLogout()}
          >
            Click to Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
