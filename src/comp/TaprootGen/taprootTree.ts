import { MerkleTree } from "./BinaryTree";
import { Address, Script, Signer, Tap, Tx } from "@cmdcode/tapscript";
import * as secp256k1 from "@noble/secp256k1";

// data form the script leaf we will be dealing with

export type SCRIPT_LEAF = {
  outputType: string;
  title: string;
  script: string[];
  scriptSize: number;
  scriptHash: string;
  description: string; 
};

export class Taproot {
  script: SCRIPT_LEAF[];
  internalPublicKey: string;
  taprootOutputkey: string;
  //   merkleTree: MerkleTree;

  constructor(script: SCRIPT_LEAF[], internalPublicKey: string) {
    this.script = script;
    this.internalPublicKey = internalPublicKey;
    this.taprootOutputkey = "";
    // this.merkleTree = new MerkleTree(script);
  }

  getMerkelRoot(): string {
    const pubkey = this.internalPublicKey;
    const scriptData = this.script;
    const pubkeyHex = Buffer.from(pubkey).toString("hex");
    // Generate the x-only public key by removing the first byte
    const xOnlyPubKey = pubkey.slice(1); // Slice off the first byte

    // Convert the x-only public key to a hexadecimal string
    const xOnlyPubKeyHex = Buffer.from(xOnlyPubKey).toString("hex");
    // const scripts = [
    //   [1, 7, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [2, 6, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [3, 5, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [4, 4, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [5, 3, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [6, 2, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [7, 1, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    // ];
    // const tree = scripts.map((s) => Tap.encodeScript(s));
    const tree = scriptData.map((s) => Tap.encodeScript(s.script));
    // const target = Tap.encodeScript(scripts[2]);
    // const script = scripts[2];

    const root = Tap.tree.getRoot(tree);
    const rootHex = Buffer.from(root).toString("hex");

    return rootHex;
   
  }

  // getTaprootData (): SCRIPT_LEAF[] {

  // }

  getTaprootTweakedPubKey(): string {
    const pubkey = this.internalPublicKey;
    const scriptData = this.script;
    // const pubkeyHex = Buffer.from(pubkey).toString("hex");
    // // Generate the x-only public key by removing the first byte
    // const xOnlyPubKey = pubkey.slice(1); // Slice off the first byte

    // Convert the x-only public key to a hexadecimal string
    const xOnlyPubKeyHex = Buffer.from(pubkey).toString("hex");
    // const scripts = [
    //   [1, 7, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [2, 6, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [3, 5, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [4, 4, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [5, 3, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [6, 2, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [7, 1, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    // ];
    // const tree = scripts.map((s) => Tap.encodeScript(s));
    const tree = scriptData.map((s) => Tap.encodeScript(s.script));

    const [tpubkey] = Tap.getPubKey(pubkey, { tree });

    return tpubkey;
  }

  getTaprootAddress(): string {
    const pubkey = this.internalPublicKey;
    const scriptData = this.script;
    const pubkeyHex = Buffer.from(pubkey).toString("hex");
    // Generate the x-only public key by removing the first byte
    const xOnlyPubKey = pubkey.slice(1); // Slice off the first byte

    // Convert the x-only public key to a hexadecimal string
    const xOnlyPubKeyHex = Buffer.from(xOnlyPubKey).toString("hex");
    // const scripts = [
    //   [1, 7, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [2, 6, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [3, 5, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [4, 4, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [5, 3, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [6, 2, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    //   [7, 1, "OP_ADD", 8, "OP_EQUALVERIFY", xOnlyPubKey, "OP_CHECKSIG"],
    // ];
    // const tree = scripts.map((s) => Tap.encodeScript(s));
    const tree = scriptData.map((s) => Tap.encodeScript(s.script));

    const [tpubkey] = Tap.getPubKey(xOnlyPubKey, { tree });

    const address = Address.p2tr.fromPubKey(tpubkey, "testnet");
    return address;
  }

  getKeyPathAddress(): string {
    return "KeyPathAddress";
  }


  
}
