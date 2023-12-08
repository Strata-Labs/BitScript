import { ScriptData } from "@/corelibrary/scriptdata";

export const getStringForDataBytes = (dataBytes: Uint8Array): string => {
  //console.log("getStringForDataBytes - dataBytes", dataBytes);
  const dataByteLength = Object.keys(dataBytes);

  const convertedData = [];

  for (const keysBytes of dataByteLength) {
    convertedData.push(dataBytes[keysBytes as any]);
  }

  //console.log("convertedData", convertedData);
  const test = ScriptData.fromBytes(new Uint8Array(convertedData));
  //console.log("test", test);
  //console.log("test.dataNumber", test.dataNumber);
  //test.dataNumber
  if (test.dataHex === undefined) {
    return "To many bytes";
  }
  const hexVal =
    test.dataHex.length > 8
      ? `${test.dataHex.slice(0, 4)}...${test.dataHex.slice(-4)}`
      : test.dataHex;

  //console.log("hexVal", hexVal);
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
  //console.log("numberVal", numberVal);
  let returnValue = "";

  if (test.dataNumber !== undefined) {
    returnValue =
      test.dataHex.length > 8 ? `0x${hexVal}` : `0x${hexVal} | ${numberVal}`;
  } else {
    returnValue = `0x${hexVal}`;
  }

  //console.log("returnValue", returnValue);
  return returnValue;
};
