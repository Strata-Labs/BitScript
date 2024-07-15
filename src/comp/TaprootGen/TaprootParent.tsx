import React, { useState } from "react";
import TapLeafSelector from "./TapLeafSelector";
import TaprootSelector from "./TaprootSelector";
import TaprootScriptView from "./TaprootScriptView";

export enum TaprootGenComponents {
  TaprootHomePage,
  MerkleTreeNodes,
  TaprootGenParent,
  ScriptSelectorComponent, 
}

const TaprootHomePage = () => <div>Taproot Home Page</div>;
const MerkleTreeNodes = () => <div>Merkle Tree Nodes</div>;
const TaprootGenParent = () => <div>Taproot Gen Parent</div>;
const ScriptSelectorComponent = () => <div>Script Selector Component</div>;

export default function TaprootParent() {
  const [currentComponent, setCurrentComponent] =
    useState<TaprootGenComponents>(TaprootGenComponents.TaprootHomePage);

  const componentToRender = () => {
    switch (currentComponent) {
      case TaprootGenComponents.TaprootHomePage:
        return <TaprootScriptView />;
      case TaprootGenComponents.MerkleTreeNodes:
        return <MerkleTreeNodes />;
      case TaprootGenComponents.TaprootGenParent:
        return <TaprootGenParent />;
      case TaprootGenComponents.ScriptSelectorComponent:
        return <ScriptSelectorComponent />;
      default:
        return <TapLeafSelector/>;
    }
  };

  return (
    <div 
      style={{
        //minHeight: "calc(100vh - 110px)",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className=" flex h-full w-full pt-8 flex-col gap-4 overflow-auto bg-dark-purple"
    >
      {componentToRender()}
    </div>
  );
}
