import React from "react";
import { Input } from "./UI/input";
import Image from "next/image";

import TaprootGenScriptGenIcon from "@/../public/TaprootGenScriptGenIcon.svg";
import SelectTapLeaf from "./SelectTapLeaf";
import { OUTPUT_TYPE } from "./types";
import { SCRIPT_OUTPUT_TEMPLATES } from "./TEMPLATE_GEN_DATA";
import { useSetAtom } from "jotai";
import { activeTaprootComponent, currentScriptTemplate } from "../atom";
import { TaprootGenComponents } from "./types";

export default function TapLeafSelector() {
  const setCurrentScriptTemplate = useSetAtom(currentScriptTemplate);
  const setTaprootComponent = useSetAtom(activeTaprootComponent);

  const addTapLeaf = (leaf: string, type: OUTPUT_TYPE) => {
    const foundScriptTemplate = SCRIPT_OUTPUT_TEMPLATES.find(
      (template) => template.outputType === type
    );

    if (foundScriptTemplate) {
      setCurrentScriptTemplate(foundScriptTemplate);
      setTaprootComponent(TaprootGenComponents.TapLeafTemplateView);
    }
  };
  return (
    <div>
      <div className="mx-auto grid w-full max-w-3xl items-center gap-1 text-sm">
        <div className="flex items-center justify-between ">
          <label>ScriptPath Tweak</label>
          <p className="text-gray-500">Missing merkel root...</p>
        </div>
        <Input
          type="name"
          id="email"
          size={"padded"}
          placeholder="TagHash(TapTweak) | Internal Public Key | Merkle Root"
          readOnly
        />
      </div>
      <div
        style={{
          width: "100px",
          height: "70px",
          borderRadius: "0 0 25% 25%",
        }}
        className="mx-auto flex h-24 w-24 flex-col items-center justify-center  bg-[#f79327]"
      >
        <Image
          src={TaprootGenScriptGenIcon}
          height={40}
          width={40}
          alt="TaprootGenScriptGenIcon"
        />
      </div>

      {/* The arrow */}

      <div className="flex justify-center">
        <div className="relative h-48 w-1">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 rotate-180 transform">
            <div className="h-0 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-600"></div>
          </div>
          <div className="absolute bottom-1 left-1/3 top-2 w-0 border-l-2 border-dashed border-gray-600"></div>
        </div>
      </div>

      <SelectTapLeaf addTapLeaf={addTapLeaf} />
    </div>
  );
}
