import { useState } from "react";
import TemplateOutputGen, { SCRIPT_OUTPUT_TYPE } from "./TemplateOutputGen";
import { SCRIPT_OUTPUT_TEMPLATES } from "./TEMPLATE_GEN_DATA";
import { useAtomValue } from "jotai";
import { currentScriptTemplate } from "../atom";

export default function TapLeafTemplateView() {
//   const [scriptTemplate, setScriptTemplate] =
//     useState<SCRIPT_OUTPUT_TYPE | null>(null);
  const scriptTemplate = useAtomValue(currentScriptTemplate)

  const showScriptSandbox = true;
  const handleExitScriptTemplate = () => {
    console.log("handling script template");
  };

  return (
    <div>
      <TemplateOutputGen
        scriptTemplate={scriptTemplate}
        showScriptSandbox={showScriptSandbox}
        handleExitScriptTemplate={handleExitScriptTemplate}
      />
    </div>
  );
}
