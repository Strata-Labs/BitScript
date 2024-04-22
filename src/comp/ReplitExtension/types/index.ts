export type ConversionResult = {
  Binary: string;
  Decimal: string;
  Hexadecimal: string;
  Bytes: string;
  String: string;
  error?: string;
};

export enum PARAMETER_TYPE {
  string = "string",
  number = "number",
  boolean = "boolean",
  json = "json",
  three = "three",
  enum = "enum",
}

export type MethodInputs = {
  method: string;
  description: string;
  required?: boolean;
  type: PARAMETER_TYPE;
  defaultValue?: string | number | boolean;
  enumValues?: (string | number | boolean)[];
};