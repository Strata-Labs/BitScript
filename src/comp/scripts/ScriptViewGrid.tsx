import React from "react";
import ScriptContainer from "./ScriptContainer";
import { useAtomValue } from "jotai";
import { menuOpen } from "../atom";

const ScriptViewGrid = () => {
  const isMenuOpen = useAtomValue(menuOpen);

  if (isMenuOpen) {
    // Menu is open, hide the component
    return null;
  }

  return (
    <div className="flex flex-col md:ml-[230px] md:flex-row md:flex-wrap">
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName="(pay to public key hash)"
          scriptDescription="P2PKH"
          summary="The most basic script for a direct transfer. Rarely used, but a good starting point"
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath="/p2pkh"
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName="(pay to public key)"
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath="/p2pkh"
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName="(pay to public key)"
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath="/p2pkh"
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName="(pay to public key)"
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath="/p2pkh"
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName="(pay to public key)"
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath="/p2pkh"
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName="(pay to public key)"
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath="/p2pkh"
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName="(pay to public key)"
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath="/p2pkh"
        />
      </div>
    </div>
  );
};

export default ScriptViewGrid;
