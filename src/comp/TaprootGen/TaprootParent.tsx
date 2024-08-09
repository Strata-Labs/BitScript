import React, { useState } from "react";
import TapLeafSelector from "./TapLeafSelector";
import TaprootSelector from "./NewTemplateView";
import TaprootScriptView from "./TapLeafTemplateView";
import NewTemplateView from "./NewTemplateView";
import { useAtom } from "jotai";
import { activeTaprootComponent } from "../atom";
import TapLeafTemplateView from "./TapLeafTemplateView";
import NewScriptPathView from "./NewScriptPathView";
import TaprootGenParent from "./TaprootGenParent";
import { useLocalStorage } from "./hooks/useStorage";
import { LocalStorageSyncComponent } from "./hooks/LocalStorageSync";

export enum TaprootGenComponents {
  NewTemplateView,
  NewScriptPathView,
  TapLeafTemplateView,
  TapLeafSelectionPage,
}

const TaprootHomePage = () => <div>Taproot Home Page</div>;
const MerkleTreeNodes = () => <div>Merkle Tree Nodes</div>;
// const TaprootGenParent = () => <div>Taproot Gen Parent</div>;
const ScriptSelectorComponent = () => <div>Script Selector Component</div>;

export default function TaprootParent() {
  const [currentComponent, setCurrentComponent] = useAtom(
    activeTaprootComponent
  );


  const componentToRender = () => {
    switch (currentComponent) {
      case TaprootGenComponents.NewTemplateView:
        return <NewTemplateView />;
      case TaprootGenComponents.NewScriptPathView:
        return <NewScriptPathView />;
      case TaprootGenComponents.TapLeafTemplateView:
        return <TapLeafTemplateView />;
      case TaprootGenComponents.TapLeafSelectionPage:
        return <TapLeafSelector />;
      default:
        return <NewTemplateView />;
      // return <TaprootGenParent />;
    }
  };

  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className=" flex h-full w-full flex-col gap-4 overflow-auto bg-dark-purple pt-8"
    >
      <LocalStorageSyncComponent/>
      {componentToRender()}
    </div>
  );
}
