import { nanoid } from "nanoid";

export function analyzeScriptHex(scriptHex: string): number {
  const cleanHex = scriptHex.replace(/\s/g, "").replace(/^0x/, "");
  const sizeInBytes = cleanHex.length / 2;
  return sizeInBytes;
}

export function checkDecimalToHex(value: number | string): string {
  if (!isNaN(Number(value)) && typeof value !== "boolean") {
    const number = parseInt(String(value), 10);
    let hex = number.toString(16);
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    return "0x" + hex;
  } else {
    return String(value);
  }
}

export function cutAtFirstFullStop(text: string) {
  const fullStopIndex = text.indexOf(".");

  if (fullStopIndex !== -1) {
    return text.substring(0, fullStopIndex + 1);
  }
  return text;
}

export function isValidPublicKey(key: string): boolean {
  // Check if the key is a valid hex string of the correct length for a Taproot key (32 bytes)
  const taprootKeyRegex = /^[0-9A-Fa-f]{64}$/;

  return taprootKeyRegex.test(key);
}

export function generateUUID(): string {
  return nanoid();
}
