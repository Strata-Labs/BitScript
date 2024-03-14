import { classNames } from "@/utils";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const TapLeafScript = () => {
  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        height: "100%",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-1 flex-col gap-10 p-8">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <ChevronLeftIcon className="h-10 w-10 text-[#0C071D]  " />
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
              TapLeaf (0) Script
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-[##EEEEEE]"></div>
        <button
          className={classNames(
            "flex h-[72px] w-full items-center justify-between rounded-full px-6 shadow-md  ",
            "cursor-pointer bg-[#cacad9]  "
          )}
        >
          <p className="mr-5 text-[20px]  font-thin tracking-wider text-white  md:mr-10">
            Generating Transaction Command...Create at least{" "}
            <span className="font-bold"> one input </span> &{" "}
            <span className="font-bold">one output</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default TapLeafScript;
