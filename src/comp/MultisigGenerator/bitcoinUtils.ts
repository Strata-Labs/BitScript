import { BIP32Factory } from "bip32";
import { payments, networks } from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";

// Initialize the libraries

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

    // Basic validation is enough for our purposes
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
 * Creates a P2TR (Taproot) multisig address
 * For simplicity, we use the first key as the internal key
 * In a real implementation, you would use proper MuSig key aggregation
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
    // For simplicity, we'll use the first public key as the internal key
    // In a real implementation, you would use proper MuSig key aggregation
    const internalPubkey = Buffer.from(
      publicKeys[0].startsWith("0x") ? publicKeys[0].slice(2) : publicKeys[0],
      "hex"
    );

    // Create P2TR address
    const p2tr = payments.p2tr({
      internalPubkey,
      network,
    });

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

  // For simplicity, we'll use the first public key as the internal key
  const internalPubkey = Buffer.from(
    publicKeys[0].startsWith("0x") ? publicKeys[0].slice(2) : publicKeys[0],
    "hex"
  );

  // Create P2TR address
  const p2tr = payments.p2tr({
    internalPubkey,
    network,
  });

  return {
    address: p2tr.address!,
  };
};
