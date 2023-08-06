import React, { useState, useEffect } from "react";
import ViewButtons from ".././ViewButtons";
import OpCodesViewGrid from "./OpCodesViewGrid";
import OpCodesViewList from "./OpCodesViewList";
import TopSearchBar from "../TopSearchBar";
import { useAtom } from "jotai";
import { activeViewMenu } from "../atom";

export type OP_CODE_VIEW_DATA = {
  OP_Code: string;
  description: string;
  input: string;
  output: string;
  category: string;
  type: string;
  linkPath: string;
};

const OP_CODES: OP_CODE_VIEW_DATA[] = [
  {
    OP_Code: "OP_Dup",
    description:
      "Duplicates the top item on the stack and pushes the duplicate onto the stack.",
    input: "1 item",
    output: "2 items",
    category: "Stack",
    type: "Push",
    linkPath: "/OPS/OP_DUP",
  },
  {
    OP_Code: "OP_HASH160",
    description:
      "Hashes the top item on the stack using the SHA-256 and RIPEMD-160 algorithms.",
    input: "1 item",
    output: "1 item",
    category: "Constant",
    type: "Pop & Push",
    linkPath: "/OPS/OP_HASH160",
  },
];
const OpCodesViews: React.FC = () => {
  const [activeView, setActiveView] = useAtom(activeViewMenu);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    if (typeof window !== "undefined") {
      setIsSmallScreen(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const handleButtonOneClick = () => {
    setActiveView(1);
  };

  const handleButtonTwoClick = () => {
    setActiveView(2);
  };

  let viewComponent;

  if (activeView === 1) {
    viewComponent = <OpCodesViewGrid OP_CODES={OP_CODES} />;
  } else if (activeView === 2) {
    viewComponent = <OpCodesViewList OP_CODES={OP_CODES} />;
  }

  return (
    <div className="h-screen w-screen overflow-auto">
      <div className="flex h-screen w-screen flex-col">
        <div className="mx-[80px] flex flex-col md:ml-[270px] md:mr-0">
          <p className="mt-10 text-[14px] font-extralight text-[#6C5E70] md:mt-10">
            Op Codes
          </p>
          <div className="mt-6 flex justify-between">
            <p className="mr text-[20px] font-semibold text-[#0C071D] md:ml-0 md:text-[18px]">
              OP Codes Are The Building Blocks Of Script
            </p>
            <div className="mt-7 flex md:hidden">
              <ViewButtons
                buttonOneClick={handleButtonOneClick}
                buttonTwoClick={handleButtonTwoClick}
              />
            </div>
          </div>
          <p className="mt-6 text-[14px] font-light text-[#6C5E70] md:mr-[170px] md:flex md:text-[16px]">
            Short for operation codes, these are the building blocks of Bitcoin
            Script, the scripting language used in the Bitcoin protocol. Each
            op_code represents a specific operation/function/command that
            manipulates or reads data within a Bitcoin Script.{" "}
            <span className="text-[#F79327] md:hidden">
              Explore a few below!
            </span>
          </p>
          <span className="hidden font-light text-[#F79327] md:flex md:text-[16px]">
            Explore a few below!
          </span>
          <div className="hidden justify-end md:flex">
            <ViewButtons
              buttonOneClick={handleButtonOneClick}
              buttonTwoClick={handleButtonTwoClick}
            />
          </div>
        </div>
        {viewComponent}
      </div>
    </div>
  );
};

export default OpCodesViews;
