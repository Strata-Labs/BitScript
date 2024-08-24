import React, { useState } from "react";
import TapLeafSelector from "./TapLeafSelector";
import NewTemplateView from "./NewTemplateView";
import { useAtom } from "jotai";
import { activeTaprootComponent } from "../atom";
import TapLeafTemplateView from "./TapLeafTemplateView";
import NewScriptPathView from "./NewScriptPathView";
import { LocalStorageSyncComponent } from "./hooks/LocalStorageSync";
import { TaprootGenComponents } from "./types";
import TaprootToolView from "./TaprootToolView";

export default function TaprootParent() {
  const [currentComponent, setCurrentComponent] = useAtom(
    activeTaprootComponent
  );


  const componentToRender = () => {
    console.log("this is the current component: ", currentComponent);
    switch (currentComponent) {
      case TaprootGenComponents.TaprootToolView:
        return <TaprootToolView />;
      case TaprootGenComponents.NewTemplateView:
        return <NewTemplateView />;
      case TaprootGenComponents.NewScriptPathView:
        return <NewScriptPathView />;
      case TaprootGenComponents.TapLeafTemplateView:
        return <TapLeafTemplateView />;
      case TaprootGenComponents.TapLeafSelectionPage:
        return <TapLeafSelector />;
      // case TaprootGenComponents.TaprootToolView:
      //   return <TaprootToolView />;
      default:
        return <TaprootToolView />;
    }
  };

  return (
    <div
      style={{
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
