import { ScriptData } from "@/corelibrary/scriptdata";

export const getStringForDataBytes = (dataBytes: Uint8Array): string => {
  const dataByteLength = Object.keys(dataBytes);

  const convertedData = [];

  for (const keysBytes of dataByteLength) {
    convertedData.push(dataBytes[keysBytes as any]);
  }

  const test = ScriptData.fromBytes(new Uint8Array(convertedData));
  if (test.dataNumber === undefined) {
    return '';
  }
  const hexVal =
    test.dataHex.length > 8
      ? `${test.dataHex.slice(0, 4)}...${test.dataHex.slice(-4)}`
      : test.dataHex;

  const numberVal =
    test.dataNumber.toString().length > 8
      ? `${test.dataNumber.toString().slice(0, 4)}...${test.dataNumber
          .toString()
          .slice(-4)}`
      : test.dataNumber.toString();

  return test.dataHex.length > 8
    ? `0x${hexVal}`
    : `0x${hexVal} | ${numberVal}`;
}
