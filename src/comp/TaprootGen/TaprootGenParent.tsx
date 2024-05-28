import { classNames } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import TaprootGenScriptGenIcon from "@/../public/TaprootGenScriptGenIcon.svg";

enum TapLeafState {
  ADDING,
  EDITING,
  NONE,
}

import SelectTapLeaf from "./SelectTapLeaf";

const TaprootGenParent = () => {
  const [userTweakedKey, setUserTweakedKey] = useState("");

  const [showTapLeafSelection, setShowTapLeafSelection] = useState(false);

  const [tapLeafState, setTapLeafState] = useState(TapLeafState.NONE);

  const [validKey, setValidKey] = useState(false);
  /* 
    1) user enters a TagHash(TapTweak) | Internal Public Key | Merkle Root
    2) text pop up appears saying to hit enter when done to move forward
    3) the selection of taproot outputs view is shown
  */

  // we need a useEffect that will listen to the user hitting enter

  // need a event listener for the enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setUserHitsEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // handle the enter key event
  const setUserHitsEnter = () => {
    // the point of this is to handle adding a new tapleaf
    /*
      their will be multi steps to adding a tap leaf and enter is only needed when
      - we are not already adding a tapleaf
      - we are editing a tapleaf
    */
    if (tapLeafState === TapLeafState.NONE) {
      // change to add state
      setTapLeafState(TapLeafState.ADDING);
    } else {
      // do nothing
    }
  };

  useEffect(() => {
    // check if valid
    checkIfValid();
  }, [userTweakedKey]);

  const checkIfValid = () => {
    // if key length is more than 2 charachters then it is valid

    if (userTweakedKey.length > 2) {
      if (!validKey) setValidKey(true);
    } else {
      if (tapLeafState === TapLeafState.ADDING) {
        setTapLeafState(TapLeafState.NONE);
      }
      setValidKey(false);
    }
  };

  console.log("tapLeafState", tapLeafState);
  console.log("validKey", validKey);

  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className=" flex h-full w-full flex-col gap-4 overflow-auto bg-dark-purple"
    >
      <div className="flex flex-col items-center px-12 ">
        <InputHandler
          setUserTweakedKey={setUserTweakedKey}
          userTweakedKey={userTweakedKey}
        />
      </div>
      <AnimatePresence>
        {tapLeafState === TapLeafState.ADDING && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="flex flex-col items-center px-12 "
          >
            <SelectTapLeaf />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaprootGenParent;

type InputHandlerProps = {
  userTweakedKey: string;
  setUserTweakedKey: (value: string) => void;
};
const InputHandler = (props: InputHandlerProps) => {
  const { userTweakedKey, setUserTweakedKey } = props;

  const placeHolder = "Script Path Tweak";
  return (
    <div
      style={{
        maxWidth: "1200px",
      }}
      className="flex w-full  flex-col items-center gap-2 pt-32"
    >
      <div className="flex w-full items-center justify-between">
        <p>
          <label className="text-[20px] font-semibold text-white">
            {placeHolder}
          </label>
        </p>
        <p className="text-[16px] font-thin text-white">...missing</p>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="relative w-full">
          <input
            value={userTweakedKey}
            onChange={(e) => setUserTweakedKey(e.target.value)}
            placeholder={placeHolder}
            className="relative h-16 w-full rounded-full border-2 border-dark-orange bg-dark-purple px-8 text-2xl text-white"
          />

          <div
            style={{
              right: "45px",
              top: "15%",
            }}
            className="absolute flex  flex-col justify-center "
          >
            <CheckCircleIcon
              className={classNames(
                "h-10 w-10 ",
                userTweakedKey ? "text-dark-orange" : "text-gray-300"
              )}
            />
          </div>
        </div>
        <div className="relative flex w-full flex-row items-center justify-center">
          {
            // if user input is not empty then show the text
          }
          <div
            style={{
              width: "100px",
              height: "70px",
              borderRadius: "0 0 25% 25%",
            }}
            className="flex h-24 w-24 flex-col items-center justify-center  bg-[#f79327]"
          >
            <Image
              src={TaprootGenScriptGenIcon}
              height={40}
              width={40}
              alt="TaprootGenScriptGenIcon"
            />
          </div>
          {userTweakedKey && (
            <p
              className="absolute left-0 
            text-[20px] font-normal text-white"
            >
              hit <span className="text-dark-orange">enter</span> to add a new
              tapleaf
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
