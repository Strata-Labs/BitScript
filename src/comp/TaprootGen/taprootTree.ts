import { MerkleTree } from "./BinaryTree";
import { Address, Script, Signer, Tap, Tx } from "@cmdcode/tapscript";
import { SCRIPT_LEAF } from "./types";

export class Taproot {
  script: SCRIPT_LEAF[];
  internalPublicKey: string;
  taprootOutputkey: string;

  constructor(script: SCRIPT_LEAF[], internalPublicKey: string) {
    this.script = script;
    this.internalPublicKey = internalPublicKey;
    this.taprootOutputkey = "";
  }

  getMerkelRoot(): string {
    const pubkey = this.internalPublicKey;
    const scriptData = this.script;
    const pubkeyHex = Buffer.from(pubkey).toString("hex");
    // Generate the x-only public key by removing the first byte
    const xOnlyPubKey = pubkey.slice(1); // Slice off the first byte
    // Convert the x-only public key to a hexadecimal string
    const xOnlyPubKeyHex = Buffer.from(xOnlyPubKey).toString("hex");
    console.log("X-only public key hex: ", xOnlyPubKeyHex);
    console.log("this is the pubkey hex: ", pubkeyHex);
    const tree = scriptData.map((s) => Tap.encodeScript(s.script));
    const root = Tap.tree.getRoot(tree);
    const rootHex = Buffer.from(root).toString("hex");

    return rootHex;
  }

  getTaprootTweakedPubKey(): string {
    const pubkey = this.internalPublicKey;
    console.log("this is the public key: ", pubkey);
    const scriptData = this.script;
    const pubkeyHex = Buffer.from(pubkey).toString("hex");
    // Generate the x-only public key by removing the first byte
    const xOnlyPubKey = pubkey.slice(1); // Slice off the first byte

    // Convert the x-only public key to a hexadecimal string
    const xOnlyPubKeyHex = Buffer.from(xOnlyPubKey).toString("hex");
    console.log("X-only public key hex: ", xOnlyPubKeyHex);
    console.log("this is the pubkey hex: ", pubkeyHex);
    const tree = scriptData.map((s) => Tap.encodeScript(s.script));

    const [tpubkey] = Tap.getPubKey(pubkey, { tree });

    return tpubkey;
  }

  getTaprootAddress(): string {
    const pubkey = this.internalPublicKey;
    const scriptData = this.script;
    const pubkeyHex = Buffer.from(pubkey).toString("hex");
    // Generate the x-only public key by removing the first byte of the public key, without doing this, it wouldn't work
    const xOnlyPubKey = pubkey.slice(1); // Slice off the first byte

    // Convert the x-only public key to a hexadecimal string
    const xOnlyPubKeyHex = Buffer.from(xOnlyPubKey).toString("hex");
    console.log("X-only public key hex: ", xOnlyPubKeyHex);
    console.log("this is the pubkey hex: ", pubkeyHex);
    const tree = scriptData.map((s) => Tap.encodeScript(s.script));

    const [tpubkey] = Tap.getPubKey(xOnlyPubKey, { tree });

    const address = Address.p2tr.fromPubKey(tpubkey, "main");
    return address;
  }

  getKeyPathAddress(): string {
    return "KeyPathAddress";
  }
}
