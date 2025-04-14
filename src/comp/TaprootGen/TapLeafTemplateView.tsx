import { useState } from "react";
import { SCRIPT_OUTPUT_TYPE, TemplateOutputGen } from "./TemplateOutputGen";
import { SCRIPT_OUTPUT_TEMPLATES } from "./TEMPLATE_GEN_DATA";
import { useAtomValue } from "jotai";
import { currentScriptTemplate } from "../atom";

export default function TapLeafTemplateView() {
  const scriptTemplate = useAtomValue(currentScriptTemplate);

  const showScriptSandbox = true;
  const handleExitScriptTemplate = () => {
    // do nothing
  };

  return (
    <div
      style={{
        minHeight: "92vh",
        paddingLeft: "0",
      }}
      className=" min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <TemplateOutputGen
        scriptTemplate={scriptTemplate!}
        handleExitScriptTemplate={handleExitScriptTemplate}
      />
    </div>
  );
}
