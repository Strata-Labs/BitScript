import { userSignedIn, UserSandboxScript } from "@/comp/atom";
import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import { savedNames } from "../SandboxPopUp";
import { useState } from "react";

type LoadingProps = {
  onSelectScript: (script: UserSandboxScript) => void;
  setLoadShowing: (loadShowing: boolean) => void;
};

const Loading = ({ onSelectScript, setLoadShowing }: LoadingProps) => {
  const [isUserSignedIn] = useAtom(userSignedIn);
  const [userScripts, setUserScripts] = useState<UserSandboxScript[]>([]);
  const [buttonSelected, setButtonSelected] = useState("YourScripts");

  trpc.fetchScriptEvent.useQuery(undefined, {
    refetchOnMount: true,
    enabled: isUserSignedIn,
    onSuccess: (data) => {
      if (data === undefined) {
        return;
      }

      const filteredData: UserSandboxScript[] = data.map((d) => {
        return {
          id: d.id,
          createdAt: new Date(d.createdAt),
          userId: d.userId,
          content: d.content,
          updatedAt: new Date(d.updatedAt),
          name: d.name,
        } as UserSandboxScript;
      });

      setUserScripts(filteredData);
    },
  });

  const handleScriptClick = (script: UserSandboxScript) => {
    onSelectScript(script);
  };

  return (
    <>
      <button
        className="absolute left-2 top-2 rounded-full bg-[#242034] p-2 "
        onClick={() => setLoadShowing(false)}
      >
        {" "}
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
            fill="#fff"
          />
        </svg>
      </button>

      <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
        Previously Saved
      </h3>
      <p className="font-extralight">select an option to continue</p>
      <div className="mt-5 h-[0.5px] w-full border-b border-[#F79327] "></div>
      <div className="mt-5 flex h-full w-full flex-row items-center justify-between rounded-xl border-[.5px] border-white">
        <button
          className={`w-full rounded-xl   ${
            buttonSelected === "YourScripts"
              ? "bg-[#F79327]"
              : " bg-transparent font-extralight"
          }`}
          onClick={() => setButtonSelected("YourScripts")}
        >
          Your Scripts
        </button>
        <button
          className={`w-full rounded-xl  ${
            buttonSelected === "Bookmarked"
              ? "bg-[#F79327]"
              : "bg-transparent font-extralight"
          }`}
          onClick={() => setButtonSelected("Bookmarked")}
        >
          Bookmarked
        </button>
      </div>
      <div className="mt-10 flex w-full flex-row items-center justify-between ">
        <p className="font-extralight">Name</p>
        <div className="flex flex-row font-extralight">
          <p className="mr-20">Views</p>
          <p>Last Update</p>
        </div>
      </div>

      {userScripts.map((script, index) => (
        <button
          key={`${index}_${script.id}`}
          className="mt-3 flex w-full flex-row items-center justify-between rounded-full bg-[#0C071D] px-3 py-2 font-extralight text-[#EEEEEE] transition-all duration-500 ease-in-out hover:-translate-y-1"
          onClick={() => handleScriptClick(script)}
        >
          <p className="ml-1 font-bold">{script.name}</p>
          <div className="flex flex-row items-center text-[14px]">
            <p className="mr-14 rounded-full bg-[#231C33] px-3 py-1">
              {script.content.split(" ").length}
            </p>
            <p>{script.updatedAt.toDateString()}</p>
          </div>
        </button>
      ))}
    </>
  );
};

export default Loading;
