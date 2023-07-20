import React from "react";
import NavigationMobile from "../NavigationMenu";
import ScriptViews from "./ScriptViews";
import ScriptContent from "./p2pkh";
import TestingCoreLib from "../TestingCoreLib";

const ScriptsPage: React.FC = () => {
  return (
    <div className="overflow-auto">
      <div className="h-screen bg-[#F8F8F8]">
        <ScriptViews />
        {/* <TestingCoreLib /> */}
      </div>
    </div>
  );
};

export default ScriptsPage;
