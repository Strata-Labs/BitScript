import React from "react";
import ScriptViews from "./ScriptViews";

const ScriptsPage: React.FC = () => {
  return (
    <div className="overflow-auto">
      <div className="h-screen bg-[#F8F8F8]">
        <ScriptViews />
      </div>
    </div>
  );
};

export default ScriptsPage;
