import { useState } from "react";
import { SCRIPT_OUTPUT_TYPE  } from "./types";
import { SCRIPT_OUTPUT_TEMPLATES } from "./TEMPLATE_GEN_DATA";
import { useAtomValue } from "jotai";
import { currentScriptTemplate } from "../atom";
import { TemplateOutputGen } from "./TemplateOutputGen";

export default function TapLeafTemplateView() {
  const scriptTemplate = useAtomValue(currentScriptTemplate);

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
      />
    </div>
  );
}
