import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { popUpOpen, userSignedIn } from "../atom";
import Link from "next/link";
import ProfileContainer from "./ProfileContainers";

const BuyingOptions = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);

  if (isUserSignedIn) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0", opacity: 1 }}
        exit={{ x: "100vw", opacity: 0 }}
        className="fixed bottom-0 right-0 top-0 z-50 grid w-[100%] cursor-pointer place-items-end overflow-y-scroll bg-slate-900/10 backdrop-blur md:w-[78%] lg:w-[85%] xl:w-[85%] 2xl:w-[90%]"
      >
        <motion.div
          initial={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="items-right relative flex h-screen w-full cursor-default flex-col overflow-hidden overflow-y-auto bg-white  p-6 text-[#0C071D] shadow-xl md:w-[95%] lg:w-[80%] xl:w-[65%] 2xl:w-[50%]"
        >
          <div className="relative z-10 ml-[20px] mr-[20px] flex flex-col items-start justify-center">
            <h3 className="mb-2  text-left text-[18px] font-bold md:text-[28px]">
              Learn, Practice, Deploy
            </h3>
            <p className="">
              Maybe you’re just starting out & need to get your reps in. Or
              maybe you’re already building on Bitcoin. Either way, we want to
              be your Swiss-Army knife for Bitcoin development.
            </p>
            <div className="mt-5 flex w-full flex-col items-center justify-between md:mt-10 xl:flex-row">
              <p className="font-semibold">Pay Options</p>
              <div className="flex flex-row">
                <button className="mx-1 flex h-[34px] w-[80px] items-center justify-center rounded-xl bg-[#F3F3F3] lg:h-[44px] lg:w-[132px]">
                  <div className="mr-3 h-[14px] w-[14px] rounded-full bg-[#A1A5B0] lg:h-[24px] lg:w-[24px]"></div>
                  <p className=" text-[10px] font-extralight lg:text-[16px]">
                    USD
                  </p>
                </button>
                <button className="mx-1 flex h-[34px] w-[80px] items-center justify-center rounded-xl bg-[#F3F3F3] lg:h-[44px] lg:w-[132px]">
                  <div className="mr-3 h-[14px] w-[14px] rounded-full bg-[#A1A5B0] lg:h-[24px] lg:w-[24px]"></div>
                  <p className="text-[10px] font-extralight lg:text-[16px]">
                    Bitcoin
                  </p>
                </button>
                <button className="mx-1 flex h-[34px] w-[80px] items-center justify-center rounded-xl bg-[#F3F3F3] lg:h-[44px] lg:w-[132px]">
                  <div className="mr-3 h-[14px] w-[14px] rounded-full bg-[#A1A5B0] lg:h-[24px] lg:w-[24px]"></div>
                  <p className="text-[10px] font-extralight lg:text-[16px]">
                    Lightning
                  </p>
                </button>
              </div>
            </div>
            <div className="mt-10 flex w-full flex-col items-center justify-between xl:flex-row">
              <p className="font-semibold">Plan Options</p>
              <div className="flex flex-row rounded-full bg-[#F3F3F3] p-1">
                <button className=" flex h-[34px] w-[80px] items-center justify-center rounded-full bg-[#F3F3F3] lg:h-[44px] lg:w-[132px]">
                  <p className=" text-[10px] font-extralight lg:text-[16px]">
                    Monthly
                  </p>
                </button>
                <button className=" flex h-[34px] w-[80px] items-center justify-center rounded-full bg-[#F3F3F3] lg:h-[44px] lg:w-[132px]">
                  <p className="text-[10px] font-extralight lg:text-[16px]">
                    Anual
                  </p>
                </button>
                <button className=" flex h-[34px] w-[80px] items-center justify-center rounded-full bg-[#F3F3F3] lg:h-[44px] lg:w-[132px]">
                  <p className="text-[10px] font-extralight lg:text-[16px]">
                    Flat Fee
                  </p>
                </button>
              </div>
            </div>
            <div className="mt-10 flex w-full flex-row justify-between">
              <ProfileContainer
                linkPath={""}
                title={"Beginner Bob"}
                prize={"$0"}
                frequency={"/month"}
                features={[
                  "OP Code Documentation",
                  "Script Documentation",
                  "Educational Tutorials",
                  "Utility Tools",
                  "Deserializer* (15 queries/day) ",
                ]}
              />
              <ProfileContainer
                linkPath={""}
                title={"Advanced Alice"}
                prize={"$34"}
                frequency={"/month"}
                features={[
                  "OP Code Documentation",
                  "Script Documentation",
                  "Educational Tutorials",
                  "Utility Tools",
                  "Deserializer* (unlimited)",
                  "User History ",
                  "Offline Support",
                ]}
              />
            </div>
            <div className="mt-3 flex flex-col">
              <p className="font-bold">
                Work for a Bitcoin company | looking to expense?
              </p>
              <p>
                Reach out at jesus@stratalabs.xyz for better pricing as we’re
                always looking to work more closely with teams in the space.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BuyingOptions;
