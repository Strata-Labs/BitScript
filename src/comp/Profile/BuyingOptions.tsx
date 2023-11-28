import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import {
  Payment,
  paymentAtom,
  popUpOpen,
  tutorialBuyModal,
  userSignedIn,
} from "../atom";
import Link from "next/link";
import ProfileContainer from "./ProfileContainers";
import { use, useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { PaymentLength, PaymentOption } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const BuyingOptions = () => {
  const router = useRouter();

  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [showBuyingOptions, setShowBuyingOptions] = useAtom(tutorialBuyModal);

  //state
  // poll for payment status
  const [pollForPaymnet, setPollForPayment] = useState(false);

  // payment info state
  const [whichButton, setWhichButton] = useState("1");
  const [whatFrequency, setWhatFrequency] = useState("1");

  // trpc hooks
  const mutation = trpc.createCharge.useMutation();
  const fetchChargeInfo = trpc.fetchChargeInfo.useMutation();
  const stripePayment = trpc.createStripeCharge.useMutation();

  useEffect(() => {
    if (payment?.status === "PROCESSING" || payment?.status === "CREATED") {
      if (pollForPaymnet) {
      } else {
        setPollForPayment(true);
        fetchPayment();
      }
    }
  }, [payment]);

  useEffect(() => {
    console.log("shouldPoll", pollForPaymnet);
    // console.log("paymnet in useEffecct", payment);
    let interval: any;
    if (pollForPaymnet && payment) {
      console.log("should poll");

      interval = setInterval(fetchPayment, 15000);
    }
    //return () => clearInterval(interval);
  }, [pollForPaymnet]);

  const fetchPayment = async () => {
    // console.log("fetching payment");
    if (payment) {
      const paymentRes = await fetchChargeInfo.mutateAsync({
        paymentId: payment.id,
      });

      if (paymentRes) {
        const paymentResData = {
          ...paymentRes,
          createdAt: new Date(paymentRes.createdAt),
          validUntil: paymentRes.validUntil
            ? new Date(paymentRes.validUntil)
            : null,
          startedAt: paymentRes.startedAt
            ? new Date(paymentRes.startedAt)
            : null,
          paymentDate: paymentRes.paymentDate
            ? new Date(paymentRes.paymentDate)
            : null,
        };

        setPayment(paymentResData);
      }
    }
  };

  const handleStripePaymentType = async () => {
    try {
      if (whichButton === "1") {
        let frequency: PaymentLength = PaymentLength.ONE_MONTH;
        if (whatFrequency === "2") {
          frequency = PaymentLength.ONE_YEAR;
        } else if (whatFrequency === "3") {
          frequency = PaymentLength.LIFETIME;
        }
        const paymentRes = await stripePayment.mutateAsync({
          length: frequency,
        });

        console.log("payment", payment);
        const paymentResData = {
          ...paymentRes,
          createdAt: new Date(paymentRes.createdAt),
          validUntil: paymentRes.validUntil
            ? new Date(paymentRes.validUntil)
            : null,
          startedAt: paymentRes.startedAt
            ? new Date(paymentRes.startedAt)
            : null,
          paymentDate: paymentRes.paymentDate
            ? new Date(paymentRes.paymentDate)
            : null,
        };

        setPayment(paymentResData);
        setPollForPayment(true);
        if (paymentRes.hostedCheckoutUrl) {
          window.location.href = paymentRes.hostedCheckoutUrl;
        }
      } else {
        console.log("this should never happen");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleBtcBasedPayment = async () => {
    console.log("does thsi run");
    try {
      if (whichButton === "2" || whichButton === "3") {
        const paymentRes = await mutation.mutateAsync({
          length: PaymentLength.ONE_MONTH,
          paymentOption: PaymentOption.USD,
          amount: 500,
        });

        console.log("payment", payment);
        const paymentResData = {
          ...paymentRes,
          createdAt: new Date(paymentRes.createdAt),
          validUntil: paymentRes.validUntil
            ? new Date(paymentRes.validUntil)
            : null,
          startedAt: paymentRes.startedAt
            ? new Date(paymentRes.startedAt)
            : null,
          paymentDate: paymentRes.paymentDate
            ? new Date(paymentRes.paymentDate)
            : null,
        };

        setPayment(paymentResData);
        setPollForPayment(true);
        //console.log()
        // have the window open a new page to hosted checkout

        let openTabUrl = `https://checkout.opennode.com/${paymentResData.paymentProcessorId}`;
        if (paymentResData.paymentOption === PaymentOption.LIGHTNING) {
          openTabUrl = openTabUrl + "?ln=1";
        }
        // Simulate a mouse click:
        window.location.href = openTabUrl;
      } else {
        console.log("whichButton", whichButton);
        // we need to make a different api route for stripe logic
      }

      // save the
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaymentClick = () => {
    if (whichButton === "1") {
      handleStripePaymentType();
    } else if (whichButton === "2" || whichButton === "3") {
      handleBtcBasedPayment();
    }
  };

  const handleExitClick = () => {
    // check what page we're on
    // if we're on the profile page we should not allow the user to click away
    console.log("router", router);
    setShowBuyingOptions(false);
    if (router.pathname === "/profile") {
      // dissallow closing the modal
      return;
    } else {
      // close the modal
      setShowBuyingOptions(false);
    }
  };

  const showBBPrice = () => {
    // find out what type of currency is selected
    if (whichButton === "1") {
      // usd
      // find out length of membership they want to pay for
      if (whatFrequency === "1") {
        return "$19";
      } else if (whatFrequency === "2") {
        return "$175";
      } else if (whatFrequency === "3") {
        return "$500";
      }
    } else {
      // either btc or lightning
      // can only pay for year or lifelong membership
      if (whatFrequency === "2") {
        return ".0063 BTC";
      } else if (whatFrequency === "3") {
        return ".018 BTC";
      }
    }
    return "N/A";
  };

  const showAAPrice = () => {
    if (whichButton === "1") {
      // usd payment
      if (whatFrequency === "1") {
        return "$79";
      } else if (whatFrequency === "2") {
        return "$800";
      } else if (whatFrequency === "3") {
        return "$1600";
      }
    } else {
      // btc or lightning
      if (whatFrequency === "2") {
        return ".02893 BTC";
      } else if (whatFrequency === "3") {
        return ".0578 BTC";
      }
    }
    return "N/A";
  };
  return (
    <AnimatePresence>
      {showBuyingOptions && router.pathname === "/profile" && (
        <motion.div
          initial={{ x: "0", opacity: 0 }}
          animate={{ x: "0", opacity: 1 }}
          exit={{ x: "0", opacity: 0 }}
          className="fixed bottom-0 right-0 top-0 z-50 grid w-[100%] place-items-end overflow-y-scroll bg-slate-100/10 backdrop-blur md:left-[240px]"
        >
          <motion.div
            initial={{ scale: 0, rotate: "0deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="items-right relative flex h-screen cursor-default flex-col overflow-hidden overflow-y-auto bg-white  p-6 text-[#0C071D] shadow-xl md:mr-[240px] md:w-[700px]"
          >
            <div className="relative z-10 ml-[20px] mr-[20px] flex flex-col items-start justify-center ">
              <h3 className="mb-2  text-left text-[18px] font-bold md:text-[28px]">
                Learn, Practice, Deploy
              </h3>
              <p className="">
                Whether you’re just starting out or you’re an employed
                researcher, we want to be your Swiss-Army knife for Bitcoin
                development.
              </p>
              <div className="relative flex w-full flex-col">
                {(payment && payment.status === "PROCESSING") ||
                  (payment?.status === "CREATED" && (
                    <motion.div
                      initial={{ x: "100vw", opacity: 0 }}
                      animate={{ x: "0", opacity: 1 }}
                      exit={{ x: "100vw", opacity: 0 }}
                      className="absolute bottom-0 right-0 top-0 z-50 mt-4 flex w-full flex-col place-items-end items-center justify-center overflow-y-scroll rounded-md bg-slate-300/50 backdrop-blur"
                    >
                      <div className="loading-spinner">
                        <FontAwesomeIcon size="4x" icon={faSpinner} spin />
                      </div>
                      <h3 className="mb-2  text-left text-[18px] font-bold md:text-[28px]">
                        Processing
                      </h3>
                    </motion.div>
                  ))}

                <div className="mt-5 flex w-full flex-col items-center justify-between md:mt-10 xl:flex-row">
                  <p className="font-semibold">Pay Options</p>
                  <div className="flex flex-row">
                    <button
                      className={`mx-1 flex h-[34px] w-[80px] items-center justify-center rounded-xl ${
                        whichButton === "1"
                          ? "bg-black text-white"
                          : "bg-[#F3F3F3] text-black"
                      } lg:h-[44px] lg:w-[132px]`}
                      onClick={() => setWhichButton("1")}
                    >
                      <div className="mr-3 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#A1A5B0] lg:h-[24px] lg:w-[24px]">
                        <svg
                          width="7"
                          height="12"
                          viewBox="0 0 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-[9px] w-[7px] md:h-[12px] md:w-[7px] ${
                            whichButton === "1" ? "fill-white" : "fill-black"
                          }`}
                        >
                          <path d="M6.47198 8.01697C6.47198 6.81497 5.65699 5.76902 4.48599 5.47302L2.87799 5.07397C2.62999 5.01197 2.41901 4.87304 2.26001 4.67004C2.11001 4.48004 2.02701 4.23599 2.02701 3.98499C2.02701 3.36599 2.52999 2.86304 3.14899 2.86304H3.849C4.421 2.86304 4.9 3.29304 4.965 3.86304C5.011 4.27504 5.37801 4.57302 5.79401 4.52502C6.20601 4.47902 6.50199 4.10804 6.45599 3.69604C6.32099 2.49404 5.39099 1.56695 4.22699 1.39795V1C4.22699 0.586 3.89099 0.25 3.47699 0.25C3.06299 0.25 2.72699 0.586 2.72699 1V1.40405C1.48199 1.60805 0.527008 2.68203 0.527008 3.98303C0.527008 4.57003 0.72401 5.14404 1.07901 5.59204C1.43501 6.05104 1.943 6.38298 2.513 6.52698L4.121 6.92603C4.622 7.05303 4.97198 7.50101 4.97198 8.01501C4.97198 8.31301 4.855 8.59401 4.642 8.80701C4.429 9.02001 4.14801 9.13696 3.85001 9.13696H3.14999C2.57799 9.13696 2.099 8.70696 2.034 8.13696C1.988 7.72496 1.61199 7.42498 1.20499 7.47498C0.792987 7.52098 0.496999 7.89195 0.542999 8.30396C0.675999 9.49096 1.58399 10.412 2.72699 10.597V11C2.72699 11.414 3.06299 11.75 3.47699 11.75C3.89099 11.75 4.22699 11.414 4.22699 11V10.6021C4.78199 10.5211 5.297 10.275 5.702 9.87C6.199 9.373 6.47198 8.71497 6.47198 8.01697Z" />
                        </svg>
                      </div>
                      <p className=" text-[10px] font-extralight lg:text-[16px]">
                        USD
                      </p>
                    </button>
                    <button
                      className={`mx-1 flex h-[34px] w-[80px] items-center justify-center rounded-xl ${
                        whichButton === "2"
                          ? "bg-black text-white"
                          : "bg-[#F3F3F3] text-black"
                      } lg:h-[44px] lg:w-[132px]`}
                      onClick={() => {
                        setWhichButton("2");
                        if (whatFrequency === "1") {
                          setWhatFrequency("2");
                        }
                      }}
                    >
                      <div className="mr-3 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#A1A5B0] lg:h-[24px] lg:w-[24px]">
                        <svg
                          width="9"
                          height="12"
                          viewBox="0 0 9 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-[9px] w-[7px] md:h-[12px] md:w-[9px] ${
                            whichButton === "2" ? "fill-white" : "fill-black"
                          }`}
                        >
                          <path d="M7.422 5.745C7.76 5.308 7.96899 4.76604 7.96899 4.17004C7.96899 2.92004 7.08297 1.87599 5.90997 1.64099V1C5.90997 0.586 5.57397 0.25 5.15997 0.25C4.74597 0.25 4.40997 0.586 4.40997 1V1.58997H3.81897V1C3.81897 0.586 3.48297 0.25 3.06897 0.25C2.65497 0.25 2.31897 0.586 2.31897 1V1.58997H1.26501C0.851015 1.58997 0.515015 1.92597 0.515015 2.33997C0.515015 2.75397 0.851015 3.08997 1.26501 3.08997H1.79602V8.91003H1.26501C0.851015 8.91003 0.515015 9.24603 0.515015 9.66003C0.515015 10.074 0.851015 10.41 1.26501 10.41H2.31897V11C2.31897 11.414 2.65497 11.75 3.06897 11.75C3.48297 11.75 3.81897 11.414 3.81897 11V10.41H4.40997V11C4.40997 11.414 4.74597 11.75 5.15997 11.75C5.57397 11.75 5.90997 11.414 5.90997 11V10.41H5.927C7.338 10.41 8.48499 9.25296 8.48499 7.82996C8.48499 6.97096 8.063 6.21499 7.422 5.745ZM6.46899 4.17004C6.46899 4.76604 5.99401 5.25 5.41101 5.25H3.29602V3.08997H5.41101C5.99401 3.08997 6.46899 3.57404 6.46899 4.17004ZM5.927 8.91003H3.29602V6.75H5.41101H5.92798C6.51098 6.75 6.98602 7.23396 6.98602 7.82996C6.98602 8.42596 6.511 8.91003 5.927 8.91003Z" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-extralight lg:text-[16px]">
                        Bitcoin
                      </p>
                    </button>
                    <button
                      className={`mx-1 flex h-[34px] w-[80px] items-center justify-center rounded-xl ${
                        whichButton === "3"
                          ? "bg-black text-white"
                          : "bg-[#F3F3F3] text-black"
                      } lg:h-[44px] lg:w-[132px]`}
                      onClick={() => {
                        setWhichButton("3");
                        if (whatFrequency === "1") {
                          setWhatFrequency("2");
                        }
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={` h-[10px] w-[10px] md:h-[24px] md:w-[24px] ${
                          whichButton === "3" ? "fill-white" : "fill-black"
                        }`}
                      >
                        <path
                          opacity="0.4"
                          d="M18.384 9.42599C18.147 8.85499 17.616 8.5 16.998 8.5L14.141 8.57001L15.857 4.59399C16.058 4.12899 16.011 3.59799 15.733 3.17599C15.455 2.75299 14.986 2.5 14.48 2.5H9.99999C9.16199 2.5 8.46699 3.024 8.19499 3.843L5.57799 10.525C5.42299 10.988 5.49798 11.48 5.78398 11.876C6.06998 12.272 6.513 12.5 7.002 12.5L9.82597 12.434L6.94096 20.838C6.86596 21.058 6.95197 21.301 7.14897 21.424C7.23097 21.475 7.32199 21.5 7.41399 21.5C7.54299 21.5 7.67099 21.45 7.76799 21.354L18.06 11.061C18.496 10.624 18.62 9.99699 18.384 9.42599Z"
                        />
                      </svg>
                      <p className="text-[10px] font-extralight lg:text-[16px]">
                        Lightning
                      </p>
                    </button>
                  </div>
                </div>
                <div className="mt-10 flex w-full flex-col items-center justify-between xl:flex-row">
                  <p className="font-semibold">Plan Options</p>
                  {whichButton !== "1" ? (
                    <div className="flex flex-row rounded-full bg-[#F3F3F3] p-1">
                      <button
                        className={` flex h-[34px] w-[80px] items-center justify-center rounded-full ${
                          whatFrequency === "2"
                            ? "bg-black text-white"
                            : "bg-[#F3F3F3] text-black"
                        } lg:h-[44px] lg:w-[132px]`}
                        onClick={() => setWhatFrequency("2")}
                      >
                        <p className="text-[10px] font-extralight lg:text-[16px]">
                          Annual
                        </p>
                      </button>
                      <button
                        className={` flex h-[34px] w-[80px] items-center justify-center rounded-full ${
                          whatFrequency === "3"
                            ? "bg-black text-white"
                            : "bg-[#F3F3F3] text-black"
                        } lg:h-[44px] lg:w-[132px]`}
                        onClick={() => setWhatFrequency("3")}
                      >
                        <p className="text-[10px] font-extralight lg:text-[16px]">
                          Flat Fee
                        </p>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-row rounded-full bg-[#F3F3F3] p-1">
                      <button
                        className={` flex h-[34px] w-[80px] items-center justify-center rounded-full ${
                          whatFrequency === "1"
                            ? "bg-black text-white"
                            : "bg-[#F3F3F3] text-black"
                        } lg:h-[44px] lg:w-[132px]`}
                        onClick={() => setWhatFrequency("1")}
                      >
                        <p className=" text-[10px] font-extralight lg:text-[16px]">
                          Monthly
                        </p>
                      </button>
                      <button
                        className={` flex h-[34px] w-[80px] items-center justify-center rounded-full ${
                          whatFrequency === "2"
                            ? "bg-black text-white"
                            : "bg-[#F3F3F3] text-black"
                        } lg:h-[44px] lg:w-[132px]`}
                        onClick={() => setWhatFrequency("2")}
                      >
                        <p className="text-[10px] font-extralight lg:text-[16px]">
                          Annual
                        </p>
                      </button>
                      <button
                        className={` flex h-[34px] w-[80px] items-center justify-center rounded-full ${
                          whatFrequency === "3"
                            ? "bg-black text-white"
                            : "bg-[#F3F3F3] text-black"
                        } lg:h-[44px] lg:w-[132px]`}
                        onClick={() => setWhatFrequency("3")}
                      >
                        <p className="text-[10px] font-extralight lg:text-[16px]">
                          Flat Fee
                        </p>
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-10 flex w-full flex-row justify-center">
                  <ProfileContainer
                    onClick={() => handlePaymentClick()}
                    active={"0"}
                    title={"Beginner Bob"}
                    price={showBBPrice()}
                    frequency={
                      whatFrequency === "1"
                        ? "/month"
                        : whatFrequency === "2"
                        ? "/year"
                        : ""
                    }
                    features={[
                      "Deserializer* (10 queries/day) ",
                      "Script Sandbox* (1 hour/day) ",
                      "All Educational Tutorials",
                      "Utility Tools",
                      "OP Code Documentation",
                      "Script Documentation",
                    ]}
                  />
                  <ProfileContainer
                    onClick={() => handlePaymentClick()}
                    active={"1"}
                    title={"Advanced Alice"}
                    price={showAAPrice()}
                    frequency={
                      whatFrequency === "1"
                        ? "/month"
                        : whatFrequency === "2"
                        ? "/year"
                        : ""
                    }
                    features={[
                      "Deserializer (unlimited) ",
                      "Script Sandbox (unlimited)",
                      "All Educational Tutorials",
                      "Utility Tools",
                      "OP Code Documentation",
                      "Script Documentation",
                      "Offline Support",
                      "AI Transaction Summary ",
                      "Save / Share Instances",
                      "Import UTXOs",
                      "Offline Support",
                    ]}
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-col">
                <p className="font-bold">
                  Work for a Bitcoin company | looking for bulk member
                  discounts?
                </p>
                <p>
                  Reach out at jesus@stratalabs.xyz for better pricing as we’re
                  always looking to work more closely with teams in the space.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BuyingOptions;
