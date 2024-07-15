import { useState } from "react";
import TemplateOutputGen, { SCRIPT_OUTPUT_TYPE } from "./TemplateOutputGen";
import { SCRIPT_OUTPUT_TEMPLATES } from "./TEMPLATE_GEN_DATA";

export default function TaprootScriptView() {
//   const [scriptTemplate, setScriptTemplate] =
//     useState<SCRIPT_OUTPUT_TYPE | null>(null);

  const showScriptSandbox = true;
  const handleExitScriptTemplate = () => {
    console.log("handling script template");
  };
  const scriptTemplate = SCRIPT_OUTPUT_TEMPLATES[0]

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
