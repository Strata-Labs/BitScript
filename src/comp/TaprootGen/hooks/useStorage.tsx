import { useEffect } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import { SCRIPT_OUTPUT_TYPE, SCRIPT_LEAF, TaprootGenComponents } from "../types";

// Define your atoms
export const activeTaprootComponent = atom<TaprootGenComponents | null>(null);
export const internalPublicKey = atom<string>("");
export const taprootOutputKey = atom<string>("");
export const globalMerkelRoot = atom<string>("");
export const currentScriptTemplate = atom<SCRIPT_OUTPUT_TYPE | null>(null);
export const TaprootNodes = atom<SCRIPT_LEAF[]>([]);

interface LocalStorageData {
  activeTaprootComponent: TaprootGenComponents | null;
  internalPublicKey: string;
  taprootOutputKey: string;
  globalMerkelRoot: string;
  currentScriptTemplate: SCRIPT_OUTPUT_TYPE | null;
  TaprootNodes: SCRIPT_LEAF[];
}

const LOCAL_STORAGE_KEY = "taprootToolState";

export function useLocalStorage() {
  const setActiveComponent = useSetAtom(activeTaprootComponent);
  const setPublicKey = useSetAtom(internalPublicKey);
  const setOutputKey = useSetAtom(taprootOutputKey);
  const setMerkelRoot = useSetAtom(globalMerkelRoot);
  const setScriptTemplate = useSetAtom(currentScriptTemplate);
  const setNodes = useSetAtom(TaprootNodes);


  const clearAllAtoms = () => {
    setActiveComponent(null);
    setPublicKey("");
    setOutputKey("");
    setMerkelRoot("");
    setScriptTemplate(null);
    setNodes([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return { clearAllAtoms };
}
