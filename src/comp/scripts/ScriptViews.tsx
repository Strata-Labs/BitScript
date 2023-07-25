import React, { useState, useEffect } from "react";
import TopSearchBar from ".././TopSearchBar";
import ViewButtons from ".././ViewButtons";
import ScriptViewGrid from "./ScriptViewGrid";
import ScriptViewList from "./ScriptViewList";
import ScriptBlockListContainer from "./ScriptsBlockList";

const ScriptViews: React.FC = () => {
  const [activeView, setActiveView] = useState("grid");
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
    setActiveView("grid");
  };

  const handleButtonTwoClick = () => {
    setActiveView("list");
  };

  let viewComponent;

  if (isSmallScreen) {
    if (activeView === "grid") {
      viewComponent = <ScriptViewGrid />;
    } else if (activeView === "list") {
      viewComponent = <ScriptViewList />;
    }
  } else {
    if (activeView === "grid") {
      viewComponent = <ScriptViewGrid />;
    } else if (activeView === "list") {
      viewComponent = <ScriptViewList />;
    }
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex h-screen w-screen flex-col">
        <p className="ml-20 mt-10 text-[14px] font-extralight text-[#6C5E70] md:ml-[270px] md:mt-10">
          Scripts
        </p>
        <div className="flex flex-wrap">
          <div className="flex w-screen justify-between">
            <div className="flex">
              <p className="ml-20 mt-6 text-[20px] font-semibold text-[#0C071D] md:ml-[270px] md:mt-6 md:text-[18px] lg:text-[28px]">
                Select A Bitcoin Script <span>Format To Explore</span>
              </p>
            </div>
            <div className="mr-6 flex justify-end md:mr-0">
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
