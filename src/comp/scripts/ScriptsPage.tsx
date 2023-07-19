import React from "react";
import NavigationMobile from ".././NavigationMobile";
import ScriptViews from "./ScriptViews";
import ScriptContent from "./p2pkh";
import TestingCoreLib from "../TestingCoreLib";

const ScriptsPage: React.FC = () => {
  return (
    <div className="h-screen overflow-auto w-screen">
      <div className="w-full bg-[#F8F8F8]">
        {/* <ScriptViews /> */}
        <TestingCoreLib />
      </div>
    </div>
  );
};

export default ScriptsPage;
