//remove this when you try moving it to the extension
import {
  OP_RIPEMD160,
  OP_SHA1,
  OP_SHA256,
  OP_HASH160,
  OP_HASH256,
} from "@/comp/HashingCalculator/HashingLogic";
// this already exists in the replit library
import { ScriptData } from "@/corelibrary/scriptdata";

type HexString = "Hex" | "String";

interface CalculateHashOptions {
  algorithm: string;
  input: string;
  hexString: HexString;
}

export const calculateHash = (options: CalculateHashOptions) => {
  const { algorithm, input, hexString } = options;

  console.log("calculateHash values:  ", options);
  const processedInput = convertInputData(input, hexString);

  if (!processedInput) {
    return "";
  }

  const op = getHashOperator(algorithm);
  if (!op) {
    console.error("Unsupported algorithm:", algorithm);
    return;
  }
  console.log("this is the processed input : ", processedInput);

  const result = executeHashOperation(op, processedInput);

  return result;
};

const convertInputData = (
  inputData: string,
  hexString: HexString
): string | undefined => {
  if (hexString === "Hex") {
    try {
      return Buffer.from(inputData, "hex").toString("utf8");
    } catch (err) {
      console.error("Invalid Hex:", err);
      return;
    }
  }
  return inputData;
};

const getHashOperator = (algorithm: string) => {
  switch (algorithm) {
    case "RIPEMD160":
      return new OP_RIPEMD160();
    case "SHA1":
      return new OP_SHA1();
    case "SHA256":
      return new OP_SHA256();
    case "HASH160":
      return new OP_HASH160();
    case "HASH256":
      return new OP_HASH256();
    default:
      return null;
  }
};

const executeHashOperation = (op: any, input: string) => {
  const stack = [ScriptData.fromString(input)];
  console.log("input :", input);
  try {
    const [_, resultStack] = op.execute(stack);
    return resultStack[0].dataString!;
  } catch (error) {
    handleHashError(error);
    return "Error calculating hash!";
  }
};

const handleHashError = (error: any) => {
  if (error instanceof Error) {
    console.error("Error calculating hash:", error.message);
  } else {
    console.error("An unexpected error occurred:", error);
  }
};
