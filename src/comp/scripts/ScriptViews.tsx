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
    <div className="h-screen w-screen">
      <div className="flex h-screen w-screen flex-col">
        <p className="ml-4 mt-10 text-[14px] font-extralight text-[#6C5E70] sm:ml-20 md:ml-[270px] md:mt-10">
          Scripts
        </p>
        <div className="flex flex-wrap">
          <div className="mr-[80px] flex w-screen justify-between md:mr-0">
            <div className="flex">
              <p className="ml-4 mt-6 text-[20px] font-semibold text-[#0C071D] sm:ml-20 md:ml-[270px] md:mt-6 md:text-[18px] lg:text-[28px]">
                Select A Bitcoin Script <span>Format To Explore</span>
              </p>
            </div>
            <div className="flex justify-end">
              <ViewButtons
                buttonOneClick={handleButtonOneClick}
                buttonTwoClick={handleButtonTwoClick}
              />
            </div>
          </div>
        </div>
        {viewComponent}
      </div>
    </div>
  );
};

export default ScriptViews;
