import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { timeRemainingAtom } from "../atom";
import Link from "next/link";
import router from "next/router";

const TimerPopUp = () => {
  const [timeRemaining, setTimeRemaining] = useAtom(timeRemainingAtom);
  function formatTime(ms: any) {
    if (ms <= 0) {
      return { hours: "00", minutes: "00", seconds: "00" };
    }

    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // Padding with zero for single digit minutes and seconds
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");

    return {
      hours: paddedHours,
      minutes: paddedMinutes,
      seconds: paddedSeconds,
    };
  }
  const navigateToProfile = () => {
    router.push("/profile"); // Function to navigate to /profile
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
        onClick={navigateToProfile}
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex h-[591px] w-[346px] cursor-default flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-[#0C071D] shadow-xl md:h-[480px] md:w-[560px]"
        >
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="mt-5 flex flex-row items-center">
              {" "}
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.75 6.30396V5C12.75 2.381 10.619 0.25 8 0.25C5.381 0.25 3.25 2.381 3.25 5V6.30396C1.312 6.56096 0.25 7.846 0.25 10V16C0.25 18.418 1.582 19.75 4 19.75H12C14.418 19.75 15.75 18.418 15.75 16V10C15.75 7.847 14.688 6.56195 12.75 6.30396ZM8 1.75C9.792 1.75 11.25 3.208 11.25 5V6.25H4.75V5C4.75 3.208 6.208 1.75 8 1.75ZM14.25 16C14.25 17.577 13.577 18.25 12 18.25H4C2.423 18.25 1.75 17.577 1.75 16V10C1.75 8.423 2.423 7.75 4 7.75H12C13.577 7.75 14.25 8.423 14.25 10V16ZM9.27002 12C9.27002 12.412 9.058 12.7601 8.75 12.9871V15C8.75 15.414 8.414 15.75 8 15.75C7.586 15.75 7.25 15.414 7.25 15V12.9619C6.962 12.7329 6.76489 12.395 6.76489 12C6.76489 11.31 7.32001 10.75 8.01001 10.75H8.02002C8.71002 10.75 9.27002 11.31 9.27002 12Z"
                  fill="black"
                  stroke="black"
                />
              </svg>
              <p className="mx-[30px] text-center text-[18px] font-bold md:mx-[20px] md:text-[28px]">
                Demo Access Locked
              </p>
            </div>
            <p>
              Beginner Bobs [free users] will always have access to our tools.
            </p>
            <p>However, some tools require a daily limit to curve abuse.</p>
            <p className="mt-10 font-bold">
              Come back shortly or sign-up for unlimited access
            </p>

            <div className="mt-10 flex flex-row items-center">
              <div className="mx-2 flex h-[100px] w-[84px] flex-col items-center justify-center rounded-xl bg-[#FAFAFA]">
                {" "}
                <p className="text-[26px] font-bold">
                  {formatTime(timeRemaining).hours}
                </p>{" "}
                <p className="text-[10px]">Hours</p>
              </div>
              <div className="mx-2 flex h-[100px] w-[84px] flex-col items-center justify-center rounded-xl bg-[#FAFAFA]">
                {" "}
                <p className="text-[26px] font-bold">
                  {formatTime(timeRemaining).minutes}
                </p>{" "}
                <p className="text-[10px]">Minutes</p>
              </div>
              <div className="mx-2 flex h-[100px] w-[84px] flex-col items-center justify-center rounded-xl bg-[#FAFAFA]">
                {" "}
                <p className="text-[26px] font-bold">
                  {formatTime(timeRemaining).seconds}
                </p>{" "}
                <p className="text-[10px]">Seconds</p>
              </div>
            </div>
            <Link
              href={"/profile"}
              className="mt-10 rounded-[10px] bg-[#F79327] px-[20px] py-[16px] text-[20px] font-semibold text-white"
            >
              Subscribe Now
            </Link>
            <div className="flex h-[480px] w-[100%] flex-col overflow-y-auto"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TimerPopUp;
