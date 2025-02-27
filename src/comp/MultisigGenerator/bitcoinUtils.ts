import { sha256 } from "@noble/hashes/sha256";
import { schnorr } from "@noble/curves/secp256k1";
import { BIP32Factory } from "bip32";
import ecc from "@bitcoinerlab/secp256k1";
import { payments, networks, initEccLib } from "bitcoinjs-lib";
import { MuSigFactory } from "@brandonblack/musig";
import * as bitcoin from "bitcoinjs-lib";

initEccLib(ecc);

const asUint8Array = (buf: Buffer): Uint8Array => buf as unknown as Uint8Array;

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
  network: networks.Network = networks.bitcoin
): { address: string; redeemScript: string } => {
  if (m <= 0 || n <= 0 || m > n || n > 16) {
    throw new Error("Invalid m-of-n parameters. Must be: 0 < m ≤ n ≤ 16");
  }

  if (publicKeys.length !== n) {
    throw new Error(`Expected ${n} public keys, but got ${publicKeys.length}`);
  }

  // Convert hex public keys to buffers
  const pubKeyBuffers = publicKeys.map((key) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    return Buffer.from(keyHex, "hex");
  });

  // Create P2SH multisig address
  const p2ms = payments.p2ms({
    m,
    pubkeys: pubKeyBuffers,
    network,
  });

  const p2sh = payments.p2sh({
    redeem: p2ms,
    network,
  });

  return {
    address: p2sh.address!,
    redeemScript: p2ms.output!.toString("hex"),
  };
};

/**
 * Creates a P2WSH (Native SegWit) multisig address
 */
export const createP2WSHMultisig = (
  m: number,
  n: number,
  publicKeys: string[],
  network: networks.Network = networks.bitcoin
): { address: string; witnessScript: string } => {
  if (m <= 0 || n <= 0 || m > n || n > 16) {
    throw new Error("Invalid m-of-n parameters. Must be: 0 < m ≤ n ≤ 16");
  }

  if (publicKeys.length !== n) {
    throw new Error(`Expected ${n} public keys, but got ${publicKeys.length}`);
  }

  // Convert hex public keys to buffers
  const pubKeyBuffers = publicKeys.map((key) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    return Buffer.from(keyHex, "hex");
  });

  // Create P2WSH multisig address
  const p2ms = payments.p2ms({
    m,
    pubkeys: pubKeyBuffers,
    network,
  });

  const p2wsh = payments.p2wsh({
    redeem: p2ms,
    network,
  });

  return {
    address: p2wsh.address!,
    witnessScript: p2ms.output!.toString("hex"),
  };
};

/**
 * Creates a P2SH-P2WSH (Nested SegWit) multisig address
 */
export const createP2SHP2WSHMultisig = (
  m: number,
  n: number,
  publicKeys: string[],
  network: networks.Network = networks.bitcoin
): { address: string; redeemScript: string; witnessScript: string } => {
  if (m <= 0 || n <= 0 || m > n || n > 16) {
    throw new Error("Invalid m-of-n parameters. Must be: 0 < m ≤ n ≤ 16");
  }

  if (publicKeys.length !== n) {
    throw new Error(`Expected ${n} public keys, but got ${publicKeys.length}`);
  }

  // Convert hex public keys to buffers
  const pubKeyBuffers = publicKeys.map((key) => {
    const keyHex = key.startsWith("0x") ? key.slice(2) : key;
    return Buffer.from(keyHex, "hex");
  });

  // Create P2SH-P2WSH multisig address
  const p2ms = payments.p2ms({
    m,
    pubkeys: pubKeyBuffers,
    network,
  });

  const p2wsh = payments.p2wsh({
    redeem: p2ms,
    network,
  });

  const p2sh = payments.p2sh({
    redeem: p2wsh,
    network,
  });

  return {
    address: p2sh.address!,
    redeemScript: p2wsh.output!.toString("hex"),
    witnessScript: p2ms.output!.toString("hex"),
  };
};

/**
 * Creates a P2TR (Taproot) multisig address using MuSig key aggregation
 */
export const createTaprootMultisig = (
  publicKeys: string[],
  network: networks.Network = networks.bitcoin
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
    console.log("Creating Taproot address with public keys:", publicKeys);

    // Convert hex public keys to Uint8Arrays for the MuSig library
    const pubKeyBuffers = publicKeys.map((key, i) => {
      const keyHex = key.startsWith("0x") ? key.slice(2) : key;
      const buf = Buffer.from(keyHex, "hex");
      console.log(`Public key ${i + 1} buffer:`, buf.toString("hex"));
      return buf;
    });

    // Create a custom validation function that doesn't rely on ecc.isPoint
    const validatePoint = (pubKey: Buffer): boolean => {
      try {
        // Check if the first byte is 0x02 or 0x03 (compressed format)
        if (
          pubKey.length !== 33 ||
          (pubKey[0] !== 0x02 && pubKey[0] !== 0x03)
        ) {
          return false;
        }

        // Extract x-only pubkey
        const xOnly = pubKey.slice(1);

        // Create a dummy P2TR address to validate the key
        // This will throw if the key is invalid
        const dummyP2tr = payments.p2tr({
          internalPubkey: xOnly,
          network: networks.regtest, // Use regtest to avoid mainnet checks
        });

        return !!dummyP2tr.address;
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

    console.log(`Using ${validKeys.length} valid public keys for MuSig`);

    // Convert to Uint8Array for MuSig
    const pubKeyUint8Arrays = validKeys.map((buf) => new Uint8Array(buf));

    // Skip MuSig if we only have one valid key
    if (pubKeyUint8Arrays.length === 1) {
      console.log("Only one valid key, using it directly");
      const xOnlyPubkey = pubKeyUint8Arrays[0].slice(1); // Remove the first byte
      const internalPubkey = Buffer.from(xOnlyPubkey);

      const p2tr = payments.p2tr({
        internalPubkey,
        network,
      });

      return {
        address: p2tr.address!,
      };
    }

    console.log("Performing MuSig key aggregation");
    // Perform MuSig key aggregation
    const keyAggResult = musig.keyAgg(pubKeyUint8Arrays);
    console.log("keyAggResult:", keyAggResult);

    // Use type assertion to access the property
    const publicKey =
      (keyAggResult as any).aggPublicKey ||
      (keyAggResult as any).pubKey ||
      keyAggResult;

    console.log(
      "Raw aggregated public key:",
      Buffer.from(publicKey).toString("hex")
    );
    console.log("Public key length:", publicKey.length);

    // Handle different public key formats
    let xOnlyPubkey: Uint8Array;

    if (publicKey.length === 65) {
      // Uncompressed format (65 bytes): 04 + x (32 bytes) + y (32 bytes)
      console.log("Converting uncompressed public key to x-only");
      xOnlyPubkey = publicKey.slice(1, 33); // Extract x coordinate only
    } else if (publicKey.length === 33) {
      // Compressed format (33 bytes): 02/03 + x (32 bytes)
      console.log("Converting compressed public key to x-only");
      xOnlyPubkey = publicKey.slice(1); // Remove the first byte
    } else if (publicKey.length === 32) {
      // Already x-only format (32 bytes)
      console.log("Public key is already in x-only format");
      xOnlyPubkey = publicKey;
    } else {
      throw new Error(`Unexpected public key length: ${publicKey.length}`);
    }

    console.log("X-only pubkey:", Buffer.from(xOnlyPubkey).toString("hex"));
    console.log("X-only pubkey length:", xOnlyPubkey.length);

    const internalPubkey = Buffer.from(xOnlyPubkey);
    console.log("Internal pubkey for P2TR:", internalPubkey.toString("hex"));
    console.log("Internal pubkey length:", internalPubkey.length);

    // Create P2TR address with the aggregated key
    console.log("Creating P2TR payment with internal pubkey");
    const p2tr = payments.p2tr({
      internalPubkey,
      network,
    });

    console.log("Generated Taproot address:", p2tr.address);
    return {
      address: p2tr.address!,
    };
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
  network: networks.Network = networks.bitcoin
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
    // Start with first public key and CHECKSIG
    let scriptAsm = `${publicKeys[0]} OP_CHECKSIG`;

    // Add additional pubkeys with CHECKSIGADD
    for (let i = 1; i < publicKeys.length; i++) {
      scriptAsm += ` ${publicKeys[i]} OP_CHECKSIGADD`;
    }

    // Add the threshold check
    scriptAsm += ` OP_${m} OP_NUMEQUAL`;

    console.log(" final scriptAsm:", scriptAsm);
    // const leafScript = bitcoin.script.fromASM(scriptAsm);
    const leafScript = bitcoin.script.fromASM(scriptAsm);

    // Create a redeem script object
    const redeem = {
      output: leafScript,
      redeemVersion: 0xc0,
    };

    // Create an unspendable internal key
    // The key is unspendable because no one has the private key
    // ideally this is to prevent so me eone in the multisig from spending the funds via the keypath

    const hasher = sha256.create();
    publicKeys.forEach((pubkey) => {
      hasher.update(pubkey);
    });

    const internalPubkeyBytes = Buffer.from(hasher.digest().slice(0, 32));
    console.log("Internal pubkey:", internalPubkeyBytes.toString("hex"));

    // Create the Taproot payment with our script
    const p2tr = bitcoin.payments.p2tr({
      internalPubkey: internalPubkeyBytes,
      scriptTree: { output: leafScript },
      redeem,
      network,
    });

    return {
      address: p2tr.address!,
    };
  } catch (error) {
    console.error("Error in createTaprootScriptPathMultisig:", error);
    throw new Error(`Failed to create Taproot script path address: ${error}`);
  }
};
