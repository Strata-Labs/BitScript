import { ScriptNodeData } from "./TemplateOutputGen";

// enums
export enum OUTPUT_TYPE {
  P2PKH = "P2PKH",
  P2SH_TL = "P2SH-TL",
  P2SH_HL = "P2SH-HL",
  P2SH_MULTISIG = "P2SH-MULTISIG",
  ORDINAL_TEMPLATE = "ORDINAL_TEMPLATE",
}

export enum SCRIPT_SANDBOX_TYPE {
  COMMENT = "COMMENT",
  CODE = "CODE",
  INPUT_CODE = "INPUT_CODE",
  DYNAMIC = "DYNAMIC",
  DYNAMIC_TEXT = "DYNAMIC_TEXT",
}
export enum TAG_TYPE {
  TEXT = "TEXT",
  LINK = "LINK",
}

export enum SCRIPT_INPUT_VALIDATOR {
  HEX = "HEX",
  DECIMAL = "DECIMAL",
  STRING = "STRING",
}

export enum TaprootGenComponents {
  TaprootToolView,
  NewTemplateView,
  NewScriptPathView,
  TapLeafTemplateView,
  TapLeafSelectionPage,
}

// Types
type SCRIPT_OUTPUT_TAG_TYPE = {
  text: string;
  type: TAG_TYPE;
  link: string | null;
};

type SIGNATURE_OUTPUT_TAG_TYPE = {
  text: string;
  type: TAG_TYPE;
  link: string | null;
};

type SCRIPT_SANDBOX = {
  type: SCRIPT_SANDBOX_TYPE;
  id: number;
  content: string;
  label?: string;
  scriptSandBoxInputName?: string;
  dynamic?: boolean;
  dependsOn?: string;
  defaultValue?: string | number;
  renderFunction?: (value: any) => string;
  calculateFunction?: (value: any) => string;
  showHover?: boolean;
};

export enum SCRIPT_INPUT_TYPE {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  SELECT = "SELECT",
  DYNAMIC = "DYNAMIC",
  THRESHOLD = "THRESHOLD",
}

export type SCRIPT_INPUT = {
  label: string;
  placeholder: string;
  scriptSandBoxInputName: string;
  required: boolean;
  validator?: SCRIPT_INPUT_VALIDATOR;
  dynamic?: boolean;
  dependsOn?: string;
  defaultValue?: string | number | string[];
  type?: SCRIPT_INPUT_TYPE;
} & (
  | { type: SCRIPT_INPUT_TYPE.SELECT; options: string[] }
  | { type?: Exclude<SCRIPT_INPUT_TYPE, SCRIPT_INPUT_TYPE.SELECT> }
);


export type SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE;
  title: string;
  tags: SCRIPT_OUTPUT_TAG_TYPE[];
  signature?: SIGNATURE_OUTPUT_TAG_TYPE[];
  description: string[];
  scriptSandbox: SCRIPT_SANDBOX[];
  scriptInput: SCRIPT_INPUT[];
};

export type TemplateOutputGenParentProps = {
  scriptTemplate: SCRIPT_OUTPUT_TYPE | null;
  showScriptSandbox: boolean;
  handleExitScriptTemplate: () => void;
};

export type ScriptInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder: string;
  valid: ValidatorOutput;
  touched?: boolean;
  scriptSandBoxInputName: string;
  width?: string;
};

export type TemplateOutputGenProps = {
  scriptTemplate: SCRIPT_OUTPUT_TYPE;
};

export type OutputScriptSandboxProps = {
  output: SCRIPT_OUTPUT_TYPE;
  formData: any;
};

export type ValidatorOutput = {
  valid: boolean;
  message: string;
};

export type SCRIPT_LEAF = {
  id: string;
  outputType: string;
  title: string;
  script: string[];
  scriptSize: number;
  scriptHash: string;
  description: string;
  inputs: {
    [key: string]: string;
  };
  scriptType: OUTPUT_TYPE;
};
