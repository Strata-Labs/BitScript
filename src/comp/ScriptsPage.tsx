import React from "react";
import Layout from "./Layout";
import NavigationMobile from "./NavigationMobile";
import Navigation from "./Navigation";
import ScriptViews from "./ScriptViews";
import ScriptContent from "./ScriptContent";
import TestingCoreLib from "./TestingCoreLib";

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
