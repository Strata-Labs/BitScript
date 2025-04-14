import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { schnorr } from "@noble/curves/secp256k1";
import { secp256k1 } from "@noble/curves/secp256k1";
import ecc from "@bitcoinerlab/secp256k1";
import { MuSigFactory } from "@brandonblack/musig";
import { concatBytes, hexToBytes, bytesToHex } from "@noble/hashes/utils";
import bs58 from "bs58";
import { bech32, bech32m } from "bech32";

// Define network types
export interface Network {
  messagePrefix: string;
  bech32: string;
  bip32: {
    public: number;
    private: number;
  };
  pubKeyHash: number;
  scriptHash: number;
  wif: number;
}

// Define Bitcoin networks
export const networks = {
  bitcoin: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  } as Network,
  testnet: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "tb",
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  } as Network,
  regtest: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bcrt",
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  } as Network,
};

const asUint8Array = (buf: Buffer): Uint8Array => new Uint8Array(buf);

// Define the base crypto functions from the shared code, this is required for musig
const baseCrypto = {
  isPoint: (p: Uint8Array): boolean => {
    try {
      return ecc.isPoint(p);
    } catch {
      return false;
    }
  },
  isXOnlyPoint: (p: Uint8Array): boolean => {
    if (p.length !== 32) return false;
    try {
      const prefix = new Uint8Array([0x02]);
      const compressedPoint = new Uint8Array([...prefix, ...p]);
      return ecc.isPoint(compressedPoint);
    } catch {
      return false;
    }
  },
  pointX: (p: Uint8Array): Uint8Array => {
    if (p.length === 32) return p;
    // If it's a compressed point (33 bytes), return bytes 1-33
    if (p.length === 33) return p.slice(1, 33);
    // If it's an uncompressed point (65 bytes), return bytes 1-33
    if (p.length === 65) return p.slice(1, 33);
    throw new Error("Invalid point length");
  },
  hasEvenY: (p: Uint8Array): boolean => {
    if (p.length === 33) {
      return p[0] === 0x02;
    }
    if (p.length === 65) {
      return p[64] % 2 === 0;
    }
    throw new Error("Invalid point length");
  },
  isScalar: (s: Uint8Array): boolean => {
    try {
      // Check if it's a valid private key
      return ecc.isPrivate(s);
    } catch {
      return false;
    }
  },
  isSecret: (s: Uint8Array): boolean => {
    try {
      // Check if it's a valid private key and not zero
      return ecc.isPrivate(s);
    } catch {
      return false;
    }
  },
  scalarAdd: (a: Uint8Array, b: Uint8Array): Uint8Array => {
    return ecc.privateAdd(a, b) || new Uint8Array(32);
  },
  scalarMultiply: (a: Uint8Array, b: Uint8Array): Uint8Array => {
    // tiny-secp256k1 doesn't have direct scalar multiplication
    // This is a simplified implementation
    const aBigInt = BigInt("0x" + Buffer.from(a).toString("hex"));
    const bBigInt = BigInt("0x" + Buffer.from(b).toString("hex"));
    const n = BigInt(
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"
    );
    const result = (aBigInt * bBigInt) % n;

    // Convert back to Uint8Array
    const hex = result.toString(16).padStart(64, "0");
    return asUint8Array(Buffer.from(hex, "hex"));
  },
  scalarNegate: (a: Uint8Array): Uint8Array => {
    return ecc.privateNegate(a);
  },
  scalarMod: (a: Uint8Array): Uint8Array => {
    // Ensure the scalar is within the curve order
    const n = BigInt(
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"
    );
    const aBigInt = BigInt("0x" + Buffer.from(a).toString("hex"));
    const result = aBigInt % n;

    // Convert back to Uint8Array
    const hex = result.toString(16).padStart(64, "0");
    return asUint8Array(Buffer.from(hex, "hex"));
  },
};

// Create the tinyCrypto object with additional functions
export const tinyCrypto = {
  ...baseCrypto,
  pointMultiplyUnsafe: ecc.pointMultiply,
  pointMultiplyAndAddUnsafe: (
    p1: Uint8Array,
    a: Uint8Array,
    p2: Uint8Array,
    compress: boolean
  ): Uint8Array | null => {
    const p1a = ecc.pointMultiply(p1, a, false);
    if (p1a === null) return null;
    return ecc.pointAdd(p1a, p2, compress);
  },
  pointAdd: ecc.pointAdd,
  pointAddTweak: ecc.pointAddScalar,
  liftX: (p: Uint8Array): Uint8Array | null => {
    const pC = new Uint8Array(33);
    pC[0] = 2;
    pC.set(p, 1);
    return ecc.pointCompress(pC, false);
  },
  pointCompress: (p: Uint8Array, compress = true): Uint8Array =>
    ecc.pointCompress(p, compress),
  getPublicKey: (s: Uint8Array, compress: boolean): Uint8Array | null => {
    try {
      return ecc.pointFromScalar(s, compress);
    } catch {
      return null;
    }
  },
  taggedHash: schnorr.utils.taggedHash,
  sha256: (...messages: Uint8Array[]): Uint8Array => {
    const h = sha256.create();
    for (const message of messages) h.update(message);
    return h.digest();
  },
  pointNegate: (p: Uint8Array): Uint8Array => {
    // This is a simplified implementation
    // For compressed points (33 bytes), toggle the first byte between 0x02 and 0x03
    if (p.length === 33) {
      const result = new Uint8Array(p);
      result[0] = result[0] === 0x02 ? 0x03 : 0x02;
      return result;
    }
    // For uncompressed points, we'd need to negate the y-coordinate
    // This is a placeholder implementation
    return p;
  },
};

// Create the MuSig instance with tinyCrypto
const musig = MuSigFactory(tinyCrypto);

// Helper functions for Bitcoin address creation
function hash160(buffer: Uint8Array): Uint8Array {
  return ripemd160(sha256(buffer));
}

function encodeBase58Check(payload: Uint8Array): string {
  const checksum = sha256(sha256(payload)).slice(0, 4);
  const combined = concatBytes(payload, checksum);
  return bs58.encode(combined);
}


// Script operations
const OP_0 = 0x00;
const OP_PUSHDATA1 = 0x4c;
const OP_PUSHDATA2 = 0x4d;
const OP_PUSHDATA4 = 0x4e;
const OP_1 = 0x51;
const OP_16 = 0x60;
const OP_CHECKSIG = 0xac;
const OP_CHECKSIGADD = 0xba;
const OP_CHECKMULTISIG = 0xae;
const OP_EQUAL = 0x87;
const OP_EQUALVERIFY = 0x88;
const OP_HASH160 = 0xa9;
const OP_DUP = 0x76;
const OP_NUMEQUAL = 0x9c;

// Script compilation
function compileScript(chunks: (number | Uint8Array)[]): Uint8Array {
  const buffers: Uint8Array[] = [];

  for (const chunk of chunks) {
    if (typeof chunk === "number") {
      buffers.push(new Uint8Array([chunk]));
    } else {
      const length = chunk.length;

      if (length < OP_PUSHDATA1) {
        buffers.push(new Uint8Array([length]));
      } else if (length <= 0xff) {
        buffers.push(new Uint8Array([OP_PUSHDATA1, length]));
      } else if (length <= 0xffff) {
        const lengthBuffer = new Uint8Array(2);
        lengthBuffer[0] = length & 0xff;
        lengthBuffer[1] = (length >> 8) & 0xff;
        buffers.push(new Uint8Array([OP_PUSHDATA2]));
        buffers.push(lengthBuffer);
      } else {
        const lengthBuffer = new Uint8Array(4);
        lengthBuffer[0] = length & 0xff;
        lengthBuffer[1] = (length >> 8) & 0xff;
        lengthBuffer[2] = (length >> 16) & 0xff;
        lengthBuffer[3] = (length >> 24) & 0xff;
        buffers.push(new Uint8Array([OP_PUSHDATA4]));
        buffers.push(lengthBuffer);
      }

      buffers.push(chunk);
    }
  }

  return concatBytes(...buffers);
}

// Create P2PKH address
function createP2PKH(pubKeyHash: Uint8Array, network: Network): string {
  const prefix = new Uint8Array([network.pubKeyHash]);
  const payload = concatBytes(prefix, pubKeyHash);
  return encodeBase58Check(payload);
}

// Create P2SH address
function createP2SH(scriptHash: Uint8Array, network: Network): string {
  const prefix = new Uint8Array([network.scriptHash]);
  const payload = concatBytes(prefix, scriptHash);
  return encodeBase58Check(payload);
}

// Create P2WPKH address
function createP2WPKH(pubKeyHash: Uint8Array, network: Network): string {
  return bech32.encode(network.bech32, [0, ...bech32.toWords(pubKeyHash)]);
}

// Create P2WSH address
function createP2WSH(scriptHash: Uint8Array, network: Network): string {
  return bech32.encode(network.bech32, [0, ...bech32.toWords(scriptHash)]);
}

// Create P2TR address
function createP2TR(pubKey: Uint8Array, network: Network): string {
  return bech32m.encode(network.bech32, [1, ...bech32m.toWords(pubKey)]);
}

/**
 * Validates if a string is a valid public key
 */
export const validatePublicKey = (publicKey: string): boolean => {
  try {
    const key = publicKey.startsWith("0x") ? publicKey.slice(2) : publicKey;
    const hexRegex = /^[0-9a-fA-F]+$/;

    if (!hexRegex.test(key)) {
      return false;
    }

    // Valid sizes for compressed (33 bytes) or uncompressed (65 bytes) public keys
    const validLength = key.length === 66 || key.length === 130;
    if (!validLength) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Creates a P2SH multisig address
 */
export const createP2SHMultisig = (
  m: number,
  n: number,
  publicKeys: string[],
  network: Network = networks.bitcoin
): { address: string; redeemScript: string } => {
  if (m <= 0 || n <= 0 || m > n || n > 16) {
    throw new Error("Invalid m-of-n parameters. Must be: 0 < m ≤ n ≤ 16");
  }

  if (publicKeys.length !== n) {
    throw new Error(`Expected ${n} public keys, but got ${publicKeys.length}`);
  }

  // Convert hex public keys to Uint8Arrays
  const pubKeyBuffers = publicKeys.map((key) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    return hexToBytes(keyHex);
  });

  // Create multisig redeem script
  const scriptChunks: (number | Uint8Array)[] = [];

  // Add m (OP_1 to OP_16)
  scriptChunks.push(OP_1 + (m - 1));

  // Add public keys
  for (const pubKey of pubKeyBuffers) {
    scriptChunks.push(pubKey);
  }

  // Add n (OP_1 to OP_16)
  scriptChunks.push(OP_1 + (n - 1));

  // Add OP_CHECKMULTISIG
  scriptChunks.push(OP_CHECKMULTISIG);

  // Compile the script
  const redeemScript = compileScript(scriptChunks);

  // Hash the redeem script
  const scriptHash = hash160(redeemScript);

  // Create P2SH address
  const address = createP2SH(scriptHash, network);

  return {
    address,
    redeemScript: bytesToHex(redeemScript),
  };
};

/**
 * Creates a P2WSH (Native SegWit) multisig address
 */
export const createP2WSHMultisig = (
  m: number,
  n: number,
  publicKeys: string[],
  network: Network = networks.bitcoin
): { address: string; witnessScript: string } => {
  if (m <= 0 || n <= 0 || m > n || n > 16) {
    throw new Error("Invalid m-of-n parameters. Must be: 0 < m ≤ n ≤ 16");
  }

  if (publicKeys.length !== n) {
    throw new Error(`Expected ${n} public keys, but got ${publicKeys.length}`);
  }

  // Convert hex public keys to Uint8Arrays
  const pubKeyBuffers = publicKeys.map((key) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    return hexToBytes(keyHex);
  });

  // Create multisig witness script
  const scriptChunks: (number | Uint8Array)[] = [];

  // Add m (OP_1 to OP_16)
  scriptChunks.push(OP_1 + (m - 1));

  // Add public keys
  for (const pubKey of pubKeyBuffers) {
    scriptChunks.push(pubKey);
  }

  // Add n (OP_1 to OP_16)
  scriptChunks.push(OP_1 + (n - 1));

  // Add OP_CHECKMULTISIG
  scriptChunks.push(OP_CHECKMULTISIG);

  // Compile the script
  const witnessScript = compileScript(scriptChunks);

  // Hash the witness script with SHA256 (not hash160)
  const scriptHash = sha256(witnessScript);

  // Create P2WSH address
  const address = createP2WSH(scriptHash, network);

  return {
    address,
    witnessScript: bytesToHex(witnessScript),
  };
};

/**
 * Creates a P2SH-P2WSH (Nested SegWit) multisig address
 */
export const createP2SHP2WSHMultisig = (
  m: number,
  n: number,
  publicKeys: string[],
  network: Network = networks.bitcoin
): { address: string; redeemScript: string; witnessScript: string } => {
  if (m <= 0 || n <= 0 || m > n || n > 16) {
    throw new Error("Invalid m-of-n parameters. Must be: 0 < m ≤ n ≤ 16");
  }

  if (publicKeys.length !== n) {
    throw new Error(`Expected ${n} public keys, but got ${publicKeys.length}`);
  }

  // Convert hex public keys to Uint8Arrays
  const pubKeyBuffers = publicKeys.map((key) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    return hexToBytes(keyHex);
  });

  // Create multisig witness script
  const scriptChunks: (number | Uint8Array)[] = [];

  // Add m (OP_1 to OP_16)
  scriptChunks.push(OP_1 + (m - 1));

  // Add public keys
  for (const pubKey of pubKeyBuffers) {
    scriptChunks.push(pubKey);
  }

  // Add n (OP_1 to OP_16)
  scriptChunks.push(OP_1 + (n - 1));

  // Add OP_CHECKMULTISIG
  scriptChunks.push(OP_CHECKMULTISIG);

  // Compile the witness script
  const witnessScript = compileScript(scriptChunks);

  // Hash the witness script with SHA256
  const witnessScriptHash = sha256(witnessScript);

  // Create P2WSH redeem script (0x00 + 0x20 + sha256(witnessScript))
  const redeemScriptChunks: (number | Uint8Array)[] = [];
  redeemScriptChunks.push(0x00); // Version 0 witness program
  redeemScriptChunks.push(witnessScriptHash);

  const redeemScript = compileScript(redeemScriptChunks);

  // Hash the redeem script
  const scriptHash = hash160(redeemScript);

  // Create P2SH address
  const address = createP2SH(scriptHash, network);

  return {
    address,
    redeemScript: bytesToHex(redeemScript),
    witnessScript: bytesToHex(witnessScript),
  };
};

/**
 * Creates a P2TR (Taproot) multisig address using MuSig key aggregation
 */
export const createTaprootMultisig = (
  publicKeys: string[],
  network: Network = networks.bitcoin
): { address: string } => {
  if (publicKeys.length === 0) {
    throw new Error("At least one public key is required");
  }

  // For Taproot, all public keys must be in compressed format
  publicKeys.forEach((key, i) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    if (keyHex.length !== 66) {
      throw new Error(
        `Public key ${
          i + 1
        } must be compressed (33 bytes/66 hex chars) for Taproot`
      );
    }
  });

  try {
    const pubKeyBuffers = publicKeys.map((key, i) => {
      const keyHex = key.startsWith("0x") ? key.slice(2) : key;
      const buf = Buffer.from(keyHex, "hex");
      return buf;
    });

    // Create a custom validation function
    const validatePoint = (pubKey: Buffer): boolean => {
      try {
        // Check if the first byte is 0x02 or 0x03 (compressed format)
        if (
          pubKey.length !== 33 ||
          (pubKey[0] !== 0x02 && pubKey[0] !== 0x03)
        ) {
          return false;
        }

        // Try to decompress the key to validate it
        const pubKeyUint8 = new Uint8Array(pubKey);
        secp256k1.ProjectivePoint.fromHex(pubKeyUint8).assertValidity();
        return true; // If no exception is thrown, the key is valid
      } catch (e) {
        console.error(`Validation error for key:`, pubKey.toString("hex"), e);
        return false;
      }
    };

    // Validate all public keys before proceeding
    const validKeys = pubKeyBuffers.filter((key, i) => {
      const isValid = validatePoint(key);
      if (!isValid) {
        console.warn(
          `Public key ${i + 1} is not a valid point, skipping:`,
          key.toString("hex")
        );
      }
      return isValid;
    });

    if (validKeys.length === 0) {
      throw new Error("No valid public keys provided");
    }


    // Convert to Uint8Array for MuSig
    const pubKeyUint8Arrays = validKeys.map((buf) => new Uint8Array(buf));

    // Skip MuSig if we only have one valid key
    if (pubKeyUint8Arrays.length === 1) {
      const xOnlyPubkey = pubKeyUint8Arrays[0].slice(1); // Remove the first byte

      // Create P2TR address
      const address = createP2TR(xOnlyPubkey, network);

      return { address };
    }

    // Perform MuSig key aggregation
    const keyAggResult = musig.keyAgg(pubKeyUint8Arrays);

    // Use type assertion to access the property
    const publicKey =
      (keyAggResult as any).aggPublicKey ||
      (keyAggResult as any).pubKey ||
      keyAggResult;

    // Handle different public key formats
    let xOnlyPubkey: Uint8Array;

    if (publicKey.length === 65) {
      // Uncompressed format (65 bytes): 04 + x (32 bytes) + y (32 bytes)
      xOnlyPubkey = publicKey.slice(1, 33); // Extract x coordinate only
    } else if (publicKey.length === 33) {
      // Compressed format (33 bytes): 02/03 + x (32 bytes)
      xOnlyPubkey = publicKey.slice(1); // Remove the first byte
    } else if (publicKey.length === 32) {
      // Already x-only format (32 bytes)
      xOnlyPubkey = publicKey;
    } else {
      throw new Error(`Unexpected public key length: ${publicKey.length}`);
    }


    // Create P2TR address
    const address = createP2TR(xOnlyPubkey, network);

    return { address };
  } catch (error) {
    console.error("Error in createTaprootMultisig:", error);
    throw new Error(`Failed to create Taproot address: ${error}`);
  }
};

/**
 * Creates a script-path Taproot multisig address
 * This is a simplified implementation for demonstration purposes
 */
export const createTaprootScriptPathMultisig = (
  m: number,
  n: number,
  publicKeys: string[],
  network: Network = networks.bitcoin
): { address: string } => {
  if (m <= 0 || n <= 0 || m > n) {
    throw new Error("Invalid m-of-n parameters. Must be: 0 < m ≤ n");
  }

  if (publicKeys.length !== n) {
    throw new Error(`Expected ${n} public keys, but got ${publicKeys.length}`);
  }

  // For Taproot, all public keys must be in compressed format
  publicKeys.forEach((key, i) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    if (keyHex.length !== 66) {
      throw new Error(
        `Public key ${
          i + 1
        } must be compressed (33 bytes/66 hex chars) for Taproot`
      );
    }
  });

  try {
    // Convert hex public keys to Uint8Arrays
    const pubKeyBuffers = publicKeys.map((key) => {
      const keyHex = key.startsWith("0x") ? key.slice(2) : key;
      return hexToBytes(keyHex);
    });

    // Create a Taproot script path spending condition
    const scriptChunks: (number | Uint8Array)[] = [];

    // First public key with CHECKSIG
    scriptChunks.push(pubKeyBuffers[0]);
    scriptChunks.push(OP_CHECKSIG);

    // Add additional pubkeys with CHECKSIGADD
    for (let i = 1; i < pubKeyBuffers.length; i++) {
      scriptChunks.push(pubKeyBuffers[i]);
      scriptChunks.push(OP_CHECKSIGADD);
    }

    // Add the threshold check
    scriptChunks.push(OP_1 + (m - 1)); // m as an OP_m
    scriptChunks.push(OP_NUMEQUAL);

    // Compile the script
    const leafScript = compileScript(scriptChunks);

    // Create an unspendable internal key by hashing all public keys
    const hasher = sha256.create();
    publicKeys.forEach((pubkey) => {
      hasher.update(pubkey);
    });

    const internalPubkeyBytes = hasher.digest().slice(0, 32);

    // For simplicity, we're not implementing the full Taproot script tree
    // In a real implementation, we would create a Merkle tree of scripts
    // and commit to it in the Taproot output

    // For now, we'll just create a P2TR address with the internal key
    const address = createP2TR(internalPubkeyBytes, network);

    return { address };
  } catch (error) {
    console.error("Error in createTaprootScriptPathMultisig:", error);
    throw new Error(`Failed to create Taproot script path address: ${error}`);
  }
};
