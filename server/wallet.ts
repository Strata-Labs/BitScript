import { crypto, networks, payments } from "bitcoinjs-lib";
import { HDKey } from "@scure/bip32";

// so basically i need to be able to manage the wallets of the users from a point the seed?
// but what i don't follow is how am i going to manage creating multi addresses

// okay so yeah we do know and we'll have to find a way to be able to track and know what is snet where

const createWallet = (seed: string) => {
  // when we create/manage

  // convert string seed to buffer
  const seedBuffer = crypto.sha256(Buffer.from(seed));

  // create HD wallet from seed buffer
  const root = HDKey.fromMasterSeed(seedBuffer);

  return root;
};

const getAddressInfo = (masterWallet: HDKey, path: string) => {};

export const getP2pkh = (seed: string) => {
  const root = createWallet(seed);

  const path = "m/44/1/0/0/1";
  const derived = root.derive(path);
  if (!derived.publicKey) throw new Error("no private key");

  const buffer = Buffer.from(derived.publicKey);

  const p2pkh = payments.p2pkh({
    pubkey: buffer,
    network: networks.regtest,
  });

  return p2pkh.address;
};
