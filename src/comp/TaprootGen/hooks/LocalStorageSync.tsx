// LocalStorageSyncComponent.tsx
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { activeTaprootComponent, currentScriptTemplate, globalMerkelRoot, internalPublicKey, TaprootNodes, taprootOutputKey } from "@/comp/atom";

const LOCAL_STORAGE_KEY = "taprootToolState";

export function LocalStorageSyncComponent() {
    
     const [activeComponent, setActiveComponent] = useAtom(activeTaprootComponent);
  const [publicKey, setPublicKey] = useAtom(internalPublicKey);
  const [outputKey, setOutputKey] = useAtom(taprootOutputKey);
  const [merkelRoot, setMerkelRoot] = useAtom(globalMerkelRoot);
  const [scriptTemplate, setScriptTemplate] = useAtom(currentScriptTemplate);
  const [nodes, setNodes] = useAtom(TaprootNodes);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setActiveComponent(parsedData.activeTaprootComponent);
      setPublicKey(parsedData.internalPublicKey);
      setOutputKey(parsedData.taprootOutputKey);
      setMerkelRoot(parsedData.globalMerkelRoot);
      setScriptTemplate(parsedData.currentScriptTemplate);
      setNodes(parsedData.TaprootNodes);
    }
  }, []);

  useEffect(() => {
    const dataToStore = {
      activeTaprootComponent: activeComponent,
      internalPublicKey: publicKey,
      taprootOutputKey: outputKey,
      globalMerkelRoot: merkelRoot,
      currentScriptTemplate: scriptTemplate,
      TaprootNodes: nodes,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
    console.log("LocalStorage updated:", dataToStore);
  }, [
    activeComponent,
    publicKey,
    outputKey,
    merkelRoot,
    scriptTemplate,
    nodes,
  ]);

  return null; // This component doesn't render anything
}
