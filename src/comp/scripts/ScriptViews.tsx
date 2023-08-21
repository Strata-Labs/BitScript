import React, { useState, useEffect } from "react";
import TopSearchBar from "../SearchView/TopSearchBar";
import ViewButtons from ".././ViewButtons";
import ScriptViewGrid from "./ScriptViewGrid";
import ScriptViewList from "./ScriptViewList";
import ScriptBlockListContainer from "./ScriptsBlockList";
import { activeViewMenu } from "../atom";
import { useAtom } from "jotai";

const ScriptViews: React.FC = () => {
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
    viewComponent = <ScriptViewGrid />;
  } else if (activeView === 2) {
    viewComponent = <ScriptViewList />;
  }

  return (
    <div className="h-screen w-screen overflow-auto">
      <div className="flex h-screen w-screen flex-col">
        <div className="mx-[80px] flex flex-col md:ml-[270px] md:mr-0">
          <p className="mt-10 text-[14px] font-extralight text-[#6C5E70] md:mt-10">
            Scripts
          </p>
          <div className="mt-6 flex justify-between">
            <p className="mr text-[20px] font-semibold text-[#0C071D] md:ml-0 md:text-[18px] lg:text-[28px]">
              Scripts Describe The Locking Mechanism For UTXOs
            </p>
            <div className="mt-7 flex md:hidden">
              <ViewButtons
                buttonOneClick={handleButtonOneClick}
                buttonTwoClick={handleButtonTwoClick}
              />
            </div>
          </div>
          <p className="mt-6 text-[14px] font-light text-[#6C5E70] md:mr-[170px] md:flex md:text-[16px]">
            Scripts are the programmatic instructions that, along with other
            transaction data, describes the locking & unlocking of Bitcoin. Each
            script is made up of op_codes & additional data such as public keys,
            signatures, hashes etc...
          </p>
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

export default ScriptViews;
