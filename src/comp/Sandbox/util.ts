import { StackState } from "@/corelibrary/stackstate";
import { ScriptWiz } from "@script-wiz/lib";

// enums
export enum SpeedSettingEnum {
  "SLOW" = "SLOW",
  "NORMAL" = "NORMAL",
  "FAST" = "FAST",
}

export enum ScriptVersion {
  "SEGWIT" = "SEGWIT",
  "TAPSCRIPT" = "TAPSCRIPT",
  "LEGACY" = "LEGACY",
}

// util data types
export type SpeedSettingType = {
  title: string;
};

export type DecoratorTracker = {
  line: number;
  data: string;
};

export type ScriptVersionInfoData = {
  title: string;
};

export type SpeedSettingDataType = {
  [key in SpeedSettingEnum]: SpeedSettingType;
};

export type ScriptVersionInfo = {
  [key in ScriptVersion]: ScriptVersionInfoData;
};

export const SpeedSettingData: SpeedSettingDataType = {
  [SpeedSettingEnum.FAST]: {
    title: "Fast",
  },
  [SpeedSettingEnum.NORMAL]: {
    title: "Normal",
  },
  [SpeedSettingEnum.SLOW]: {
    title: "Slow",
  },
};

export const ScriptVersionInfo: ScriptVersionInfo = {
  [ScriptVersion.LEGACY]: {
    title: "Legacy",
  },
  [ScriptVersion.TAPSCRIPT]: {
    title: "Tapscript",
  },
  [ScriptVersion.SEGWIT]: {
    title: "Segwit",
  },
};

// component types
export type StackVisualizerProps = {
  currentStep: number;
  isPlaying: boolean;
  goToStep: (stepNumber: number) => void;
  goBackStep: () => void;
  handlePausePlayClick: () => void;
  goForwardStep: () => void;
  totalSteps: number;
  scriptRes:
    | StackState[]
    | {
        error: unknown;
        errorIndex: unknown;
      };
};

export type SandboxEditorProps = {
  scriptWiz: ScriptWiz;
  handleUserInput: (input: string) => void;
  currentStep: number;
  isPlaying: boolean;
  totalSteps: number;
};

// helper functions
export const autoConvertToHex = (value: string) => {
  // check if the value is a decimal number
  const number = value.replace(/[^0-9]/g, "");
  const numberTest = Number(number);
  if (numberTest) {
    const hexNumber = numberTest.toString(16).padStart(2, "0");
    return `0x${hexNumber}`;
  }

  // check if the value is a string
  if (value.startsWith("'") && value.endsWith("'")) {
    const string = value.replace(/'/g, "");
    const hexString = Buffer.from(string).toString("hex");
    return `0x${hexString}`;
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    const string = value.replace(/'/g, "");
    const hexString = Buffer.from(string).toString("hex");
    return `0x${hexString}`;
  }

  // check if the value is a binary number
  if (value.startsWith("0b")) {
    const binary = value.replace(/[^0-9]/g, "");
    const hexBinary = Number(binary).toString(16).padStart(2, "0");
    return `0x${hexBinary}`;
  }

  return value;
};

export type LineToStep = {
  line: number;
  step: number;
};

export const isValidBitcoinTxId = (txId: string): boolean => {
  // Bitcoin TXID should be 64 characters long and a valid hexadecimal
  const hexRegExp = /^[a-f0-9]{64}$/i;
  return hexRegExp.test(txId);
};
