import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import HDNode from "bip32";
import { hmac } from "@noble/hashes/hmac";
import { sha512 } from "@noble/hashes/sha512";
import { base58 } from "@scure/base";
import ecc from "@bitcoinerlab/secp256k1";
import { BIP32Factory } from "bip32";
import * as crypto from "crypto";
// import { ECPairFactory } from "ecpair";
const BIP32 = BIP32Factory(ecc);

interface RootKeyData {
  mnemonic: string;
  seed: string;
  rootKey: string;
}

export interface DerivedAddress {
  path: string;
  address: string;
  privateKey: string;
  publicKey: string;
}

function deriveMasterKey(seed: Buffer): {
  privateKey: Buffer;
  chainCode: Buffer;
} {
  const hmacResult = hmac(sha512, "Bitcoin seed", new Uint8Array(seed));
  return {
    privateKey: Buffer.from(hmacResult.slice(0, 32)),
    chainCode: Buffer.from(hmacResult.slice(32)),
  };
}

export function generateRootKey(
  // mnemonicLength: number = 160,
  wordCount: number = 15,
  passphrase: string = "",
  network: bitcoin.Network = bitcoin.networks.bitcoin
): RootKeyData {
  // Generate a random mnemonic
  if (wordCount < 1) {
    throw new Error("Word count must be at least 1.");
  }

  const entropyBits = (wordCount / 3) * 32;
  const entropyBytes = entropyBits / 8;

  // Generate the entropy
  const entropy = crypto.randomBytes(entropyBytes);

  // Generate the mnemonic from the entropy
  const mnemonic = bip39.entropyToMnemonic(entropy);

  // const mnemonic = bip39.generateMnemonic(mnemonicLength);

  // Generate seed
  const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);

  // Derive the master key
  // const testingSeed =
  //   "30ecfe71ba71f9c4fba8d1d0480a41160ae2792e6ba418ce2d6f3e7273cc637c0e0768fc9f8bc60f69ec0a3d712a3afdc1197307bbd073268de5f6cbbcb899d2";

  // const seedTest = Buffer.from(testingSeed, "hex");

  // const testnetNetwork = {
  //   wif: 0xef,
  //   bip32: {
  //     public: 0x043587cf,
  //     private: 0x04358394,
  //   },
  // };
  const rootKey = BIP32.fromSeed(
    Uint8Array.from(seed),
    network
  );


  console.log("rootKey", rootKey.toBase58());
  console.log("mnemonic: ", mnemonic);
  console.log("seed", seed.toString("hex"));
  return {
    mnemonic,
    seed : seed.toString("hex"),
    rootKey: rootKey.toBase58(),
  };
}

export const generateRootKeyFromMnemonic = (mnemonic: string, passphrase : string = "", network: bitcoin.Network = bitcoin.networks.bitcoin) => {
  // validate the mnemonic
  const isValid = validateMnemonic(mnemonic);
  if (!isValid) {
    throw new Error("Invalid mnemonic");
  }
  const seed =  bip39.mnemonicToSeedSync(mnemonic, passphrase);
  const rootKey = BIP32.fromSeed(
    Uint8Array.from(seed),
    network
  );

  return rootKey.toBase58();
}
export const generateSeed = (mnemonic: string, passphrase : string = "") => {
  // validate the mnemonic
  const isValid = validateMnemonic(mnemonic);
  if (!isValid) {
    throw new Error("Invalid mnemonic");
  }
  const seed =  bip39.mnemonicToSeedSync(mnemonic, passphrase);
  const seedHex = seed.toString("hex");
  return seedHex;
}

export const getDerivationPath = (
  coin: number,
  purpose: number,
  account: number,
): string => {
  return `m/${purpose}'/${coin}'/${account}'`;
};

export const generateAddresses = (seed: string, derivationPath: string, addressCount: number) => {
  console.log("this is the seed: ", seed);
    const seedHex = Buffer.from(seed, "hex");
  const root = BIP32.fromSeed(
    Uint8Array.from(seedHex),
    bitcoin.networks.bitcoin
  );
  const account = root.derivePath(derivationPath);

  const accountExtendedPrivateKey = account.toBase58();

  const accountExtendedPublicKey = account.neutered().toBase58();

  const derivedExtendedPath = `${derivationPath}/0`;

  const bip32ExtendedPrivateKey = root
    .derivePath(derivedExtendedPath)
    .toBase58();
  const bip32ExtendedPublicKey = root
    .derivePath(derivedExtendedPath)
    .neutered()
    .toBase58();
 const receivingAddresses: DerivedAddress[] = [];

  for (let i = 0; i < addressCount; i++) {
    // Derive receiving address we are adding 0 to show it is a receiving address
    const receivingPath = `${derivationPath}/0/${i}`;
    const receivingKey = root.derivePath(receivingPath);
    const publicKey = receivingKey.publicKey;
    const receivingAddress = bitcoin.payments.p2pkh({ pubkey: Buffer.from(publicKey) }).address!;

    receivingAddresses.push({
      path: receivingPath,
      address: receivingAddress,
      privateKey: receivingKey.toWIF(),
      publicKey: Buffer.from(publicKey).toString("hex"),
    });
  }

  console.log("receivingAddresses", JSON.stringify(receivingAddresses, null, 2));
  console.log("accountExtendedPrivateKey", accountExtendedPrivateKey);
  console.log("accountExtendedPublicKey", accountExtendedPublicKey);
  console.log("bip32ExtendedPrivateKey", bip32ExtendedPrivateKey);
  console.log("bip32ExtendedPublicKey", bip32ExtendedPublicKey);

  return {
    receivingAddresses,
    accountExtendedPrivateKey,
    accountExtendedPublicKey,
    bip32ExtendedPrivateKey,
    bip32ExtendedPublicKey,
  };
};

export const validateMnemonic = (mnemonic: string): boolean => {
  console.log("this is the mnemonic: ", mnemonic);
  return bip39.validateMnemonic(mnemonic);
};



