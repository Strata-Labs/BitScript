import { ScriptData } from "@/corelibrary/scriptdata";

export type Result = {
  dataString: string;
  dataNumber: number;
  dataHex: string;
  dataBytes: Uint8Array;
  dataBinary: string;
};

export const getStringForDataBytes = (dataBytes: Uint8Array): string => {
  const dataByteLength = Object.keys(dataBytes);

  const convertedData = [];

  for (const keysBytes of dataByteLength) {
    convertedData.push(dataBytes[keysBytes as any]);
  }

  const test = ScriptData.fromBytes(new Uint8Array(convertedData));
  //test.dataNumber
  if (test.dataHex === undefined) {
    return "To many bytes";
  }
  const hexVal =
    test.dataHex.length > 8
      ? `${test.dataHex.slice(0, 4)}...${test.dataHex.slice(-4)}`
      : test.dataHex;

  let numberVal = "";
  if (test.dataNumber !== undefined) {
    numberVal =
      test.dataNumber.toString().length > 8
        ? `${test.dataNumber.toString().slice(0, 4)}...${test.dataNumber
            .toString()
            .slice(-4)}`
        : test.dataNumber.toString();
  }

  // check if number val is nan
  if (numberVal === "NaN") {
    numberVal = "0";
  }
  let returnValue = "";
  if (test.dataNumber !== undefined) {
    returnValue =
      test.dataHex.length > 8 ? `0x${hexVal}` : `0x${hexVal} | ${numberVal}`;
  } else {
    returnValue = `0x${hexVal}`;
  }

  return returnValue;
};

export const getDataValues = (dataBytes: Uint8Array): Result => {

  const dataByteLength = Object.keys(dataBytes);

  const convertedData = [];

  for (const keysBytes of dataByteLength) {
    // Check if dataBytes[keysBytes] is undefined
    if (dataBytes[keysBytes as any] === undefined) {
      throw new Error(`Undefined value found at key: ${keysBytes}`);
    }
    convertedData.push(dataBytes[keysBytes as any]);
  }

  const test = ScriptData.fromBytes(new Uint8Array(convertedData));


  // Ensure test is defined and not null
  if (test === undefined || test === null) {
    throw new Error("test is undefined or null");
  }

  const dataNumber = test.dataNumber !== undefined ? test.dataNumber : 0;

  const result = {
    dataString: test.dataString !== undefined ? test.dataString : "",
    dataNumber: dataNumber,
    dataHex: test.dataHex !== undefined ? test.dataHex : "",
    dataBytes: test.dataBytes !== undefined ? test.dataBytes : new Uint8Array(),
    dataBinary: test.dataBinary !== undefined ? test.dataBinary : "",
  };

  return result;
};
